"""Constants for Hive Local."""

from datetime import timedelta

DOMAIN = "hive_local"

CONF_DEVICE = "device"
CONF_MODEL = "model"
CONF_Z2M_MODEL = "z2m_model"
CONF_BASE_TOPIC = "base_topic"

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

HEAT_MIN = 1.0  # Hive uses 1°C for "off" periods
HEAT_MAX = 32.0
BOOST_MIN_TEMP = 5.0  # Z2M docs: boost/manual setpoint is 5-32°C
MANUAL_DEFAULT_TEMP = 20.0

DEFAULT_BOOST_MINUTES = 30
DEFAULT_BOOST_TEMP = 21.0

# UNVERIFIED: values the receiver uses for hot water on/off in a schedule.
# Z2M reports occupied_heating_setpoint_water as always 22.
# Read your existing water schedule first and adjust these to match.
WATER_ON = 22.0
WATER_OFF = 1.0

# How long to collect getWeeklySchedule replies (one per day).
READ_TIMEOUT = 4.0

# How long the config flow waits for Z2M's retained bridge/devices list.
DEVICES_TIMEOUT = 5.0

# While boosting, ask Z2M to re-read the hold duration so the remaining time stays current.
BOOST_POLL_INTERVAL = timedelta(seconds=60)
