"""The pure tests need only pytest; tests/e2e needs Home Assistant (requirements_test.txt)."""

import importlib.util

collect_ignore = []
if importlib.util.find_spec("pytest_homeassistant_custom_component") is None:
    collect_ignore.append("e2e")
