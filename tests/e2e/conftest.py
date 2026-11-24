"""End-to-end tests: Home Assistant core with the integration loaded.

pytest-homeassistant-custom-component is a pytest plugin (loaded by its entry point), pinned
in requirements_test.txt to the Home Assistant version we test against.
"""

import pytest

# Bind `custom_components` to this repo's before Home Assistant adds its test config
# folder (which has a custom_components of its own) to the path.
import custom_components.hive_local  # noqa: F401


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield
