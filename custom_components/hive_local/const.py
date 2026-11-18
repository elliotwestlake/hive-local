"""Constants for Hive Local."""

from datetime import timedelta

from .schedule import HEAT_MAX, HEAT_MIN  # 1 °C = "off" in a schedule

DOMAIN = "hive_local"

CONF_TRANSPORT = "transport"
CONF_DEVICE = "device"
CONF_DEVICE_ID = "device_id"  # ZHA: the HA device registry id
CONF_MODEL = "model"
CONF_Z2M_MODEL = "z2m_model"  # the receiver's own model string (from Z2M or ZHA), e.g. SLR1c
CONF_BASE_TOPIC = "base_topic"

# Entries from before ZHA support have no CONF_TRANSPORT and are Z2M.
TRANSPORT_Z2M = "z2m"
TRANSPORT_ZHA = "zha"

DEFAULT_BASE_TOPIC = "zigbee2mqtt"

MODEL_SLR1 = "slr1"  # SLR1 / SLR1b/c/d / OTR1 — single endpoint, heating only
MODEL_SLR2 = "slr2"  # SLR2 / SLR2b/c/d — heat + water endpoints

CHANNEL_HEAT = "heat"
CHANNEL_WATER = "water"

PANEL_URL = "hive"
PANEL_COMPONENT = "hive-local-panel"
STATIC_URL = "/hive_local_static"

# Fired (with no args) whenever any receiver's status changes; the per-entry
# signal is f"{SIGNAL_STATUS}_{entry_id}".
SIGNAL_STATUS = f"{DOMAIN}_status"

# Hive app allows ~6 events per day; Zigbee spec allows 10 per command.
MAX_TRANSITIONS = 6

BOOST_MIN_TEMP = 5.0  # Z2M docs: boost/manual setpoint is 5-32°C
MANUAL_DEFAULT_TEMP = 20.0

DEFAULT_BOOST_MINUTES = 30
DEFAULT_BOOST_TEMP = 21.0

# The receiver reports 1°C during a schedule "off" period and doesn't expose its
# frost-protection temperature, so the user sets it in HA to match the thermostat.
# Display only: it's never sent to the receiver. Same default as Hive Local Thermostat.
FROST_MIN = 5.0
FROST_MAX = 16.0
DEFAULT_FROST_TEMP = 12.0

# UNVERIFIED: values the receiver uses for hot water on/off in a schedule.
# Z2M reports occupied_heating_setpoint_water as always 22.
# Read your existing water schedule first and adjust these to match.
WATER_ON = 22.0
WATER_OFF = 1.0

# How long to collect getWeeklySchedule replies (one per day).
READ_TIMEOUT = 4.0

# How long the config flow waits for Z2M's retained bridge/devices list.
DEVICES_TIMEOUT = 5.0

# SLR2 Thermostat endpoints. SLR1 has one; we use whichever endpoint has the cluster.
ZHA_EP_HEAT = 5
ZHA_EP_WATER = 6

# ZHA doesn't set up reporting for the hold attributes, so re-read them this often.
ZHA_REFRESH_INTERVAL = timedelta(minutes=5)
# After a write or a reported mode/setpoint change, re-read the state this many seconds later.
ZHA_REFRESH_DELAY = 3.0

# How often to re-apply the Hive thermostat's temperature reporting (see zcl.py),
# in case ZHA reconfigured it.
THERMOSTAT_REPORTING_REFRESH = timedelta(hours=24)

# While boosting, re-read the hold duration so the remaining time stays current.
BOOST_POLL_INTERVAL = timedelta(seconds=60)

# If a boost is still running this long after it should have ended, end it ourselves
# (the receiver can lose the hold duration and boost indefinitely).
BOOST_DEADLINE_GRACE = timedelta(minutes=2)
