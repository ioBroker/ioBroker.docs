---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md
title: Elgato-lokale API-Nachweise
hash: Y/4BlHoHGYwvxYNLRtznUTip8X0rR9oisNL/Aek3vvw=
---
# Elgato-lokale API-Nachweise

Der Adapter verwendet das lokale, nicht authentifizierte HTTP-Protokoll von Elgato und ermittelt den Diensttyp.`_elg._tcp.local.` Der Endpoint-Support ist bewusst evidenzbasiert und reaktionsorientiert.

| Endpunkt                  | Verfahren | Adapter verwenden                                           | Vertrauen                                                                   |
| ------------------------- | --------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| `/elgato/accessory-info`  | ERHALTEN  | Identität, Produkt, Firmware, Funktionen und WLAN-Metadaten | Verifiziert durch bestehende Adapter und öffentliche Clients                |
| `/elgato/accessory-info`  | SETZEN    | Anzeigename                                                 | Implementiert; Hardwareverifizierung ausstehend                             |
| `/elgato/lights`          | GET/PUT   | Leistung, Helligkeit, Farbtemperatur, Farbton und Sättigung | Verifiziert durch bestehende Adapter und öffentliche Clients                |
| `/elgato/lights/settings` | GET/PUT   | Start-/Übergangseinstellungen und Mini-Batterie-Bypass      | Form öffentlich verifiziert; Mutation erfordert vollständige Hardwarematrix |
| `/elgato/battery-info`    | ERHALTEN  | Mini-Batterie, Laden und Spannung/Stromstärke               | Bestätigt anhand der Mini-Antwortunterlagen/öffentlichen Klienten           |
| `/elgato/identify`        | POST      | Maßnahmen identifizieren                                    | Von öffentlichen Kunden bestätigt                                           |

Der Parser akzeptiert optionale Felder und behält sie bei.`hardwareRevision` als Zeichenkette. Die Funktionen werden aus den tatsächlichen Licht-/Einstellungs-/Akku-Antwortfeldern abgeleitet. Die Temperatur wird in Mired übertragen und in Kelvin angezeigt; RGB-Werte werden für die native API über HSV konvertiert.

## Bewusste Ausschlüsse

- Die Option „Neustart“ wird vom Adapter-UI/Statusvertrag nicht bereitgestellt.
- Die Szenen und Effekte von Light Strip sind weiterhin undokumentiert/experimentell und werden nicht verändert.
- Es werden weder Cloud-API noch Anmeldeinformationen oder Telemetriedaten verwendet.

## Arbeitsablauf zur Hardware-Nachweisführung

Laufen`npm run elgato:probe -- <private-host> [port]` Für jedes verfügbare Modell. Fügen Sie die bereinigte JSON-Datei und die Firmware-Version einem Testdatensatz hinzu. Testen Sie vor der Übertragung optionaler Änderungen GET, eine begrenzte Änderung, das Auslesen, gegebenenfalls den Neustart der Persistenz, ein Rollback und das Herunterfahren des Adapters. Die vorgesehene Matrix besteht aus einer Key Light, einem Light Strip und zwei Key Light Mini-Einheiten. Hardwaretests bleiben optional und dürfen niemals in der CI-Umgebung ausgeführt werden.

## Quellen

- Elgato-Kommunikationsprotokoll: <https://help.elgato.com/hc/en-us/articles/360060048331-What-Communication-Protocol-Is-Used-by-Elgato-Wi-Fi-Products>
- Übersicht der Elgato Key Light API: <https://help.elgato.com/hc/en-us/articles/4413403384845>
- Home Assistant-Integration: <https://www.home-assistant.io/integrations/elgato>
- Python-Elgato-Client: <https://github.com/frenck/python-elgato>
- NickParks API-Client: <https://github.com/NickParks/elgato-light-api>
- Homebridge-Implementierung: <https://github.com/derjayjay/homebridge-keylights>