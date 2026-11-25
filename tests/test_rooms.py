import importlib.util, pathlib, pytest

spec = importlib.util.spec_from_file_location(
    "rooms", pathlib.Path(__file__).parents[1] / "custom_components/hive_local/rooms.py")
r = importlib.util.module_from_spec(spec); spec.loader.exec_module(r)

def valve(eid, temp=None, target=None, action="idle", battery=None, available=True):
    return {"entity_id": eid, "name": eid, "available": available, "current_temperature": temp,
            "target": target, "hvac_action": action, "battery": battery}

def test_sensor_wins_over_valves():
    s = r.summarise([valve("a", 23.0, 20)], "19.6")
    assert s["current_temperature"] == 19.6 and s["temperature_source"] == "sensor"

def test_valve_average_when_no_sensor():
    s = r.summarise([valve("a", 20.0, 20), valve("b", 21.3, 20)], None)
    assert s["current_temperature"] == 20.6 and s["temperature_source"] == "valves"
    assert r.summarise([valve("a")], "unavailable")["current_temperature"] is None

def test_targets_agree_or_spread():
    assert r.summarise([valve("a", target=20), valve("b", target=20)])["target"] == 20
    s = r.summarise([valve("a", target=18), valve("b", target=21)])
    assert s["target"] is None and s["target_range"] == [18, 21]

def test_heating_batteries_and_unavailable():
    s = r.summarise([valve("a", action="heating", battery=80), valve("b", battery=15),
                     valve("c", action="heating", available=False, battery=None)])
    assert s["heating"] and s["heating_valves"] == ["a"]  # an unavailable valve doesn't count
    assert s["lowest_battery"] == 15 and s["battery_low"]
    assert s["unavailable"] == ["c"]
    assert r.summarise([valve("a", battery=90)])["battery_low"] is False

def test_clean_room():
    known = {"climate.a", "climate.b"}
    room = r.clean_room({"name": "  Front   room ", "valves": ["climate.a", "climate.a", "climate.b"], "sensor": ""},
                        known_valves=known, known_sensors=set(), receivers=["e1"])
    # One receiver: the room is heated by it without asking.
    assert room == {"name": "Front room", "valves": ["climate.a", "climate.b"], "sensor": None, "receiver": "e1",
                    "sensor_on_valves": True}
    assert r.clean_room({"name": "X", "valves": ["climate.a"], "sensor_on_valves": False}, known_valves=known,
                        known_sensors=set(), receivers=["e1"])["sensor_on_valves"] is False
    for bad in ({"name": "", "valves": ["climate.a"]}, {"name": "X", "valves": []},
                {"name": "X", "valves": ["climate.nope"]}, {"name": "X", "valves": ["climate.a"], "sensor": "sensor.nope"}):
        with pytest.raises(r.RoomError):
            r.clean_room(bad, known_valves=known, known_sensors={"sensor.ok"}, receivers=["e1"])

def test_clean_room_receivers():
    base = {"name": "Landing", "valves": ["climate.a"]}
    kw = dict(known_valves={"climate.a"}, known_sensors=set())
    with pytest.raises(r.RoomError, match="Choose which receiver"):
        r.clean_room(base, receivers=["up", "down"], **kw)
    assert r.clean_room(base | {"receiver": "down"}, receivers=["up", "down"], **kw)["receiver"] == "down"
    with pytest.raises(r.RoomError, match="isn't set up"):
        r.clean_room(base | {"receiver": "gone"}, receivers=["up", "down"], **kw)

@pytest.mark.parametrize("model, model_id, expected", [
    ("TRV001", None, True),                          # ZHA (manufacturer reads "Danfoss")
    ("TRV003", None, True),
    ("Radiator valve (UK7004240)", None, True),      # Zigbee2MQTT
    ("Radiator valve", "UK7004240", True),
    ("eTRV0100", None, False),                       # a Danfoss-branded Ally
    ("TRVZB", None, False),                          # Sonoff
    ("SLR2b", None, False), (None, None, False),
])
def test_is_hive_valve(model, model_id, expected):
    assert r.is_hive_valve(model, model_id) is expected

def test_new_room_id_is_unique():
    ids = set()
    for _ in range(50):
        ids.add(r.new_room_id(ids))
    assert len(ids) == 50


def test_suggest_rooms():
    valves = [
        {"entity_id": "climate.bay", "area": "Lounge"},
        {"entity_id": "climate.door", "area": "Lounge"},
        {"entity_id": "climate.bed", "area": "bedroom"},
        {"entity_id": "climate.kit", "area": "Kitchen"},
        {"entity_id": "climate.loose", "area": None},
    ]
    sensors = [{"entity_id": "sensor.hall", "area": "Hall"}, {"entity_id": "sensor.lounge", "area": "Lounge"}]
    out = r.suggest_rooms(valves, sensors, taken={"climate.kit"})
    # Sorted by area, ignoring case; taken valves and valves with no area are left out.
    assert out == [
        {"name": "bedroom", "valves": ["climate.bed"], "sensor": None},
        {"name": "Lounge", "valves": ["climate.bay", "climate.door"], "sensor": "sensor.lounge"},
    ]
    assert r.suggest_rooms(valves, sensors, taken={v["entity_id"] for v in valves}) == []
