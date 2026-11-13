---
chapters: {"pages":{"en/adapterref/iobroker.easee/README.md":{"title":{"en":"ioBroker.easee"},"content":"en/adapterref/iobroker.easee/README.md"},"en/adapterref/iobroker.easee/docs/bluetooth.md":{"title":{"en":"Bluetooth connection"},"content":"en/adapterref/iobroker.easee/docs/bluetooth.md"}}}
---
# Bluetooth connection

Bluetooth mode connects the adapter directly to configured Easee chargers. It
is separate from Easee Cloud: it does not use Cloud login, discover chargers
from your account, or switch to Cloud automatically. Use Cloud mode for site
information and charging-session history.

Bluetooth compatibility depends on the charger, firmware, and ioBroker host.
Easee's published requirements list firmware 316 or newer for three-phase
chargers and firmware 60 or newer for Easee One. These are Easee's prerequisites
and do not guarantee compatibility with every setup. Firmware updates may also
affect Bluetooth support.

## Before you start

- Have the charger's serial number and Bluetooth PIN ready. The PIN is not your
  Easee account password. You can find or recover the PIN using the
  [Easee support guide](https://support.easee.com/hc/en-gb/articles/4856383404177-Easee-charger-PIN-code-find-or-recover-the-PIN).
- Keep the charger close to the computer or device running ioBroker. The host
  must have Bluetooth enabled and allow ioBroker to use it.
- Make the charger available for Bluetooth. Easee says holding the charger
  button for at least five seconds opens a ten-minute window; Bluetooth can
  also be enabled in its app. See
  [Easee: Using Bluetooth](https://support.easee.com/hc/en-gb/articles/19270172294161-Using-Bluetooth)
  and [Bluetooth in the Installer App](https://support.easee.com/hc/en-gb/articles/19160690698513-Bluetooth-in-the-Installer-App)
  for model-specific instructions.
- A charger may allow only one local connection at a time. Close the Easee app
  or other Bluetooth connections while setting up the adapter.

## Setup

Use the Device Manager on the **Connection** tab to add, edit, and remove local
chargers.

1. Select **Bluetooth (local)** in the adapter settings.
2. On the **Connection** tab, add each charger in the Device Manager with its ID
   or serial number and Bluetooth PIN. An optional name is only an ioBroker
   label; it does not rename the charger.
3. Save the settings and restart the adapter to apply the charger list. The PIN
   is stored encrypted in the adapter configuration. Do not include it in logs
   or support requests.
4. Keep the ioBroker host within range while the adapter connects.

To add or remove chargers later, use the Device Manager on the **Connection**
tab, then save the settings and restart the adapter. Existing Bluetooth
configuration remains usable; you do not need to re-enter stored PINs.

## Bluetooth status and search

The **Advanced Bluetooth functions** tab shows whether Bluetooth is available
and whether a search can start. Manual search is optional; use **Search for nearby Easee
chargers** to look for nearby devices. A search runs for up to 30 seconds.
Results show detected names, identifiers and diagnostic details, but are only
suggestions: they are not added automatically and do not replace the charger ID
or PIN entered on the **Connection** tab.

If a charger is not found, check that it is powered, in range, and available for
Bluetooth. A missing search result does not necessarily mean Bluetooth is
disabled. If the adapter cannot connect, check the serial number and PIN, make
sure another phone or adapter is not using the charger, and verify that the
ioBroker host can use Bluetooth.

On Linux, **Automatic** is the recommended connection setting. It uses
BlueZ D-Bus and falls back to **Raw HCI** if Noble cannot resolve `dbus-next`
and its HCI backend is available. The adapter also offers **BlueZ D-Bus** and
**Raw HCI** explicitly for troubleshooting in the **Advanced Bluetooth
functions** tab. Raw HCI may require
extra host permissions and can conflict with other Bluetooth apps or scanners;
leave it on Automatic unless you need to troubleshoot a specific setup. Linux
and Docker installations may need access to the host Bluetooth adapter. If an
explicit BlueZ D-Bus selection reports that Noble cannot resolve `dbus-next`,
reinstall the adapter with its runtime dependencies. Adapter-state, binding,
scanning, and intermediate connection-failure details are logged at debug
level. Each configured charger gets at most three scan/connect attempts (the
initial attempt plus two retries). The adapter logs one info-level `connecting`
state and, on success, `connected`; a successful connection resets the retry
count. If all three attempts fail, one error is logged and automatic retries
for that charger stop until the adapter is restarted. A disconnect after a
successful connection starts a new three-attempt cycle.

## What is available in Bluetooth mode

Bluetooth mode provides charger status, power, energy, and electrical
readings. The Device Manager card for each charger also shows its current
charging power (kW) and Bluetooth signal strength (dBm). It can change the
charger and circuit current limits, phase mode, permanent cable lock, and LED
brightness. Pause, resume, and reboot controls are also available. Changing
the phase mode takes effect only after the charger is turned off and on again.

When changing `config.dynamicCircuitCurrentP1`–`P3`, provide all three phase
values together. The adapter does not send the change if it cannot determine
the other phase values.

Bluetooth mode does not provide Cloud-only information such as site prices,
charging-session history, or authorization-token owner names. Smart-charging
and smart-button settings, charger renaming, Wi-Fi password changes, and
Cloud-only start/stop controls are also unavailable. Bluetooth datapoints use the
configured charger serial number; if that differs from the Cloud charger ID,
their datapoint paths will differ.

Only datapoints supported by the selected connection mode are exposed. When the
mode changes, stale adapter-created datapoints that are unsupported in the new
mode are removed; supported datapoints and unrelated custom objects are left
untouched.

## If you contact support

Enable adapter debug logging and include only the log lines for one connection
attempt. Remove charger serial numbers, Bluetooth addresses, PINs, account
credentials, and other private values before sharing logs. Never send a
Bluetooth PIN or account password.

## Attribution

Bluetooth support is based on publicly available information from the
independent [easee-ble project](https://github.com/parrel/easee-ble/tree/bec7b061fc8199cd150dbb8bbce5ed5112145ede)
and [Home Assistant Easee integration](https://github.com/parrel/ha-easee-ble/tree/9973cec92660ecd791a9809eb06361bd5b535f1b). They are not affiliated with Easee; their MIT license texts are available in the respective projects ([easee-ble license](https://github.com/parrel/easee-ble/blob/bec7b061fc8199cd150dbb8bbce5ed5112145ede/LICENSE)).