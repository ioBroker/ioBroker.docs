---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsungtv/README.md
title: iobroker.samsungtv
hash: bq1hEQ5784mHAuEAQAZKwSMfLyMbpZUatvmOb0fiZEs=
---
<img src="admin/samsung.svg" alt="Samsung TV logo" width="180">

# iobroker.samsungtv

Moderner Samsung TV-Adapter mit automatischer Erkennung und Multi-Geräte-Management in einer Instanz (Unterstützung mehrerer Fernseher in derselben Instanz).

Dies ist ein unabhängiger Community-Adapter für Fernsehgeräte der Firma [Samsung Electronics](https://www.samsung.com/) .

Deutsche Dokumentation ist verfügbar unter`doc/de/README.md` Die

## Merkmale

- Automatische Erkennung über SSDP/UPnP und optionales mDNS
- Mehrere Fernseher in einem Gerät:`samsungtv.0.<tvname>.*`
- Tizen WebSocket API (8001/8002) + Pairing/Token
- PIN-Paarung der H/J-Serie (nach bestem Wissen und Gewissen)
- Wake-on-LAN (optional)
- Absolute Lautstärke und Stummschaltung über UPnP RenderingControl
- Stabile Gerätezuordnung über ID/UUID/MAC, auch bei Umbenennungen
- Es werden keine Token in den Protokollen oder der Benutzeroberfläche ausgegeben (Token werden verschlüsselt gespeichert).

## Konfiguration

Der Adapter nutzt die nativen JSONConfig- und Device-Manager-Komponenten von ioBroker. Diese passen sich automatisch dem aktiven Admin-Theme an und werden sowohl für Desktop- als auch für mobile Endgeräte optimiert.

Die Registerkarte **„Konfiguration“** enthält:

- **Automatischer Scan** und **automatisches Scanintervall** für die periodische Erkennung
- **Abfrageintervall** für Aktualisierungen von Strom, Lautstärke und Stummschaltung
- **Entdeckungs-Timeout**
- **SSDP aktivieren** / **mDNS-Erkennungsquellen aktivieren**
- **Wake-on-LAN aktivieren**
- **mDNS-Dienste** im Expertenmodus (kommagetrennt, bestmöglicher Aufwand)

### Geräte hinzufügen

1. Öffnen Sie den **TV-Verwaltungs-** Tab.
2. Starten Sie **den Scan** oder verwenden Sie alternativ **die manuelle Hinzufügung** .
3. Fügen Sie einen gefundenen Fernseher hinzu und wählen Sie seinen lesbaren Objektbaumnamen.

Die Aktionen des Geräte-Managers werden sofort angewendet und gespeichert. Die reguläre Speichern-Schaltfläche von ioBroker wendet die Einstellungen vom **Konfigurations-** Tab an.

### Paarung

- **Tizen** : Wenn Sie auf **„Koppeln“** klicken, erscheint auf dem Fernseher eine Meldung (normalerweise **„Zulassen“/„Abbrechen** “, keine PIN). Bestätigen Sie diese auf dem Fernseher.
- **H/J-Serien** : Klicken Sie auf **Koppeln** → TV-Sendungen PIN → geben Sie die PIN im nativen Dialogfeld ein.

Die dynamische Geräteregistrierung wird im persistenten Instanzdatenverzeichnis von ioBroker gespeichert, sodass Aktionen des Geräte-Managers nicht durch ein bereits geöffnetes Einstellungsformular überschrieben werden können. Tokens/Identitäten in dieser Registrierung werden mit dem ioBroker-Systemgeheimnis verschlüsselt, und die Datei wird nur mit Eigentümerberechtigungen geschrieben.`native.devices` und verschlüsselt`native.tokens` Die Werte werden beim ersten Start automatisch importiert.

Wenn während des Kopplungsvorgangs **keine Eingabeaufforderung** erscheint:

- TV: **Geräteverbindungsmanager** → **Zugriffsbenachrichtigung** aktivieren.
- TV: Überprüfen Sie **die Geräteliste** und entfernen Sie alte Einträge.
- Stellen Sie sicher, dass sich ioBroker und der Fernseher im **selben Subnetz** befinden.

## Objektmodell

Laut TV:

- `samsungtv.0.<tvname>.info.*`
  - `id` ,`ip` ,`mac` ,`model` ,`uuid` ,`api` ,`lastSeen` ,`paired` , `online`
  - `tokenAuthSupport`
- `samsungtv.0.<tvname>.state.*`
  - `power` ,`volume` , `muted`
- `samsungtv.0.<tvname>.control.*`
  - `power` ,`wol` ,`key` ,`volumeUp` ,`volumeDown` ,`mute` ,`channelUp` ,`channelDown` ,`launchApp` ,`source`
  - `volume` ,`muted`

### Steuerung (kurz)

- `control.key` : beliebiger Fernbedienungsschlüssel (z. B.`KEY_POWER` ,`KEY_VOLUP` )
- `control.launchApp` : App-ID (Tizen) aus der TV-App-Liste
- `control.source` : Quelle als Schlüssel (`KEY_HDMI` ,`KEY_SOURCE` ) oder Kurzform (`HDMI` )
- `control.volume` Absoluter Volumenwert von 0 bis 100
- `control.muted` Stummschaltung ein- oder ausschalten, im Gegensatz zu`control.mute` , was umschaltet

### Volumen

`control.volume` Und`control.muted` Sie nutzen den UPnP-RenderingControl-Dienst des Fernsehers, um einen exakten Pegel anstatt einer schrittweisen Einstellung festzulegen. Drei Dinge sind über diesen Dienst wissenswert:

- Es antwortet nur, solange der Fernseher eingeschaltet ist, und zwar einige Sekunden, nachdem der Fernseher sich als eingeschaltet meldet. Der Port kann eine TCP-Verbindung akzeptieren, ohne dass der dahinterliegende Dienst antwortet; die Erreichbarkeit wird also durch einen tatsächlichen`GetVolume` Anruf.
- UPnP definiert`upnp:401` als`Invalid Action` Und`upnp:402` als`Invalid Args` Einige Samsung-Fernseher werden ebenfalls zurückgegeben`upnp:401` Wenn Netzwerk- oder Hospitality-Modus-Beschränkungen die Steuerung blockieren, meldet der Adapter diese Beschränkungen als mögliche Ursachen und nicht als Gewissheit.

### Tastencodes (control.key)

`control.key` akzeptiert entweder **Samsung-Schlüsselcodes** (`KEY_*` ) oder **freundliche Kurzformen** :

- Navigation:`up` ,`down` ,`left` ,`right` ,`enter` ,`back`
- System:`home` ,`source` ,`menu` ,`info` ,`guide` ,`exit`
- Lautstärke/Kanal:`volup` ,`voldown` ,`mute` ,`chup` ,`chdown`
- Medien:`play` ,`pause` ,`stop` ,`rewind` ,`ff` ,`record`
- Farben:`red` ,`green` ,`yellow` ,`blue`
- Zahlen:`0` Zu`9`

Direkte Tastencodes funktionieren auch:

- Beispiele:`KEY_UP` ,`KEY_DOWN` ,`KEY_ENTER` ,`KEY_RETURN` ,`KEY_HOME` ,`KEY_SOURCE`

Hinweis: Nicht jeder Fernseher unterstützt alle Tasten. Einige Tasten funktionieren nur, wenn ein Menü/Fokus aktiv ist.

## Anmerkungen

- Die Erkennung erfolgt nach bestem Bemühen. SSDP ist primär, mDNS optional.
- Ältere Geräte werden nach Möglichkeit erkannt (HJ/Legacy); der Funktionsumfang kann variieren.
- Bei H/J/JU-Geräten wird HJ bevorzugt, sofern verfügbar. Andernfalls wird die Tizen-Fernbedienung verwendet und schaltet automatisch auf HJ um, wenn der Fernseher „Unbekannte Methode“ meldet.
- Falls Legacy-Objekte vorhanden sind, werden Warnungen protokolliert.
- Der Adapter wurde umbenannt in`samsungtv` um Konflikte mit den Alten zu vermeiden`samsung` Adapter.

## Wie man testet (kurz)

1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Öffnen Sie **die TV-Verwaltung** und starten Sie **den Scan** .
3. Füge einen Fernseher hinzu und vergebe einen Namen (z. B.`tv-livingroom` ).
4. Objektbaum überprüfen`samsungtv.0.tv-livingroom.*` Die
5. Führen Sie **„Pair“** aus und bestätigen Sie die Anzeige auf dem Fernseher.
6. Prüfen`control.*` Objekte (z. B.`control.mute` ).
7. Benennen Sie den Fernseher im Geräte-Manager um: Die Objektstruktur sollte dann reibungslos migriert werden.

## Changelog

### **WORK IN PROGRESS**
- Add absolute volume and mute (`control.volume`, `control.muted`) over UPnP RenderingControl.
- Fall back to the well-known RenderingControl endpoint when SSDP returns nothing.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.28
- Replace the custom React configuration page with native ioBroker JSONConfig and Device Manager components.
- Add responsive discovery, manual-add, details, pairing, rename, and remove workflows.
- Move the dynamic registry to persistent instance data with system-secret encryption and automatic migration.
- Remove obsolete custom admin message handlers and frontend dependencies.

### 0.0.27
- Fix TCP reachability checks and prevent overlapping polling/discovery cycles.
- Add bounded timer settings and cross-platform ping/ARP handling.
- Align generated objects and state roles with the current ioBroker catalogue.
- Complete metadata translations and singleton/compact-mode support.

### 0.0.26
- Replace the legacy configuration page with a responsive React admin UI.
- Add complete ioBroker admin translations and automatic light/dark theme support.
- Add typed configuration foundations and migration tests.
- Store Tizen tokens and H/J pairing identities reliably through ioBroker `encryptedNative` handling.
- Migrate pairing data written by older adapter versions without exposing secrets.

Older changes are documented in CHANGELOG_OLD.md.

## License
MIT

Copyright (c) 2026 softwarecrash