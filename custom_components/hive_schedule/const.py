"""Constants for Hive Schedule."""

DOMAIN = "hive_schedule"

CONF_DEVICE = "device"
CONF_MODEL = "model"
CONF_BASE_TOPIC = "base_topic"

DEFAULT_BASE_TOPIC = "zigbee2mqtt"

MODEL_SLR1 = "slr1"  # SLR1 / SLR1b/c/d / OTR1 — single endpoint, heating only
MODEL_SLR2 = "slr2"  # SLR2 / SLR2b/c/d — heat + water endpoints

CHANNEL_HEAT = "heat"
CHANNEL_WATER = "water"

PANEL_URL = "hive-schedule"
PANEL_COMPONENT = "hive-schedule-panel"
STATIC_URL = "/hive_schedule_static"

# Hive app allows ~6 events per day; Zigbee spec allows 10 per command.
MAX_TRANSITIONS = 6

HEAT_MIN = 1.0  # Hive uses 1°C for "off" periods
HEAT_MAX = 32.0

# UNVERIFIED: values the receiver uses for hot water on/off in a schedule.
# Read your existing water schedule first and adjust these to match.
WATER_ON = 22.0
WATER_OFF = 1.0

# How long to collect getWeeklySchedule replies (one per day group).
READ_TIMEOUT = 4.0
