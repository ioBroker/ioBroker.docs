---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterjsonconfig.md
title: ioBroker JSON-Konfiguration: Ein Leitfaden für Anfänger
hash: kKg40oC5RGL3q1x4nI7qTNIqlhwAp7kKd1FtjRBdkT8=
---
# IoBroker JSON-Konfiguration: Ein Leitfaden für Anfänger
Diese Anleitung erklärt, wie Sie Konfigurationsoptionen für Ihren ioBroker-Adapter mithilfe von JSON definieren. Dieser Ansatz bietet eine benutzerfreundlichere und flexiblere Möglichkeit, die Adaptereinstellungen innerhalb der ioBroker-Administrationsoberfläche zu verwalten.

## Was Sie benötigen
- ioBroker Admin Version 6 (oder neuer)
- Grundlegendes Verständnis der JSON-Syntax

## Vorteile der JSON-Konfiguration
- Verbesserte Benutzerfreundlichkeit bei der Konfiguration von Adaptern
- Einfachere Integration komplexer Konfigurationsoptionen
- Klare Trennung zwischen Adaptercode und Konfiguration

## Erste Schritte
1. **Konfigurationsdatei definieren:**

- Erstellen Sie eine Datei namens `jsonConfig.json` oder `jsonConfig.json5` im Admin-Verzeichnis Ihres Adapters.
- JSON5 ist eine Erweiterung von JSON, die Kommentare ermöglicht und dadurch die Lesbarkeit der Konfigurationsdatei verbessert.

2. **JSON-Konfiguration aktivieren:**

- Fügen Sie in der `io-package.json`-Datei Ihres Adapters die folgende Zeile unter dem Abschnitt `common` hinzu:

```json
"common": {
    "adminUI": {
        "config": "json"
    }
}
```

3. **Struktur der Konfigurationsdatei:**

Die Konfigurationsdatei definiert eine hierarchische Struktur von Registerkarten, Bereichen und Steuerelementen. Jedes Element verfügt über spezifische Attribute, die sein Verhalten und sein Erscheinungsbild in der Admin-Oberfläche bestimmen.

jsonConfig stellt automatisch sicher, dass die gesammelten Daten als Konfigurationsdaten für den Adapter aufgezeichnet und intern gespeichert werden, sodass sie im Adapter abgerufen und weiterverarbeitet werden können.

Das folgende Beispiel würde das folgende Konfigurationsobjekt erzeugen:

```json5
{
  options1: {
    myPort: 1234,
    options: {
      myType: 1,
    },
    myBool: false,
  },
}
```

Attributnamen, die mit "\_" beginnen, werden nicht im Objekt gespeichert.

## Beispiel einer jsonConfig mit mehreren Tabs
```json5
{
    "type": "tabs",
    "items": {
        "options1": {
            "type": "panel",
            "label": "Tab1",
            "icon": "base64 svg", // optional
            "items": {
                myPort: {
                    "type": "number",
                    "min": 1,
                    "max": 65565,
                    "label": "Number",
                    "sm": 6, // 1 - 12
                    "validator": "!!data.name", // else error
                    "hidden": "data.myType === 1", // hidden if myType is 1
                    "disabled": "data.myType === 2" // disabled if myType is 2
                },
                "options.myType": { // name could support more than one level
                    "newLine": true, // must start from new row
                    "type": "select",
                    "label": "Type",
                    "sm": 6, // 1 - 12
                    "options": [
                        {"label": "option 1", "value": 1},
                        {"label": "option 2", "value": 2}
                    ]
                },
                "myBool": {
                    "type": "checkbox",
                    "label": "My checkbox",
                },
                "_notSaved":"abc"
            }
        },
        "tab2": {
            "label": "Tab2",
            "type": "panel",
            "disabled": "data.myType === 1",
            "hidden": "data.myType === 2",
        }
    },
}
```

Weitere Beispiele finden sich in vielen anderen Adaptern auf GitHub im jeweiligen Admin-Verzeichnis.

## Unterstützung für die Entwicklung von Tools
### VS Code
Um die Validierung der jsonConfig in VS Code zu aktivieren, muss der folgende Abschnitt zur Datei ".vscode/settings.json" hinzugefügt werden.

```json5
    "json.schemas": [
        {
            "fileMatch": ["admin/jsonConfig.json", "admin/jsonCustom.json", "admin/jsonTab.json"],
            "url": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/packages/jsonConfig/schemas/jsonConfig.json"
        }
    ]
```

## Gemeinsame Steuerelemente
Eine jsonConfig besteht aus mehreren hierarchisch strukturierten Elementen. Jedes Element kann einem der folgenden Typen angehören. Einige Elemente können weitere untergeordnete Elemente enthalten.

Sie können fast alle Komponenten in Aktion sehen, wenn Sie diesen Adapter testen: [jsonconfig-demo](https://github.com/mcm4iob/ioBroker.jsonconfig-demo).\ Sie können ihn über das GitHub-Symbol im Adminbereich installieren, indem Sie `iobroker.jsonconfig-demo` auf der Registerkarte npm eingeben.

- [**`accordion`:**](#accordion) Akkordeon-Element für ausklappbare Inhalte (Admin 6.6.0 oder neuer)
- [**`alive`:**](#alive) Zeigt an, ob eine Instanz ausgeführt wird (schreibgeschützt)
- [**`autocomplete`:**](#autocomplete) Eingabefeld mit Autovervollständigungsvorschlägen
- [**`autocompleteSendTo`:**](#autocompletesendto) Autocomplete-Steuerelement mit Instanzwerten zum Senden von Daten
- [**`certificate`:**](#certificate) Verwaltet Zertifikate für sichere Verbindungen
- [**`certificateCollection`:**](#certificatecollection) Wählt eine Sammlung für Let's Encrypt-Zertifikate aus
- [**`certificates`:**](#certificates) Universeller Typ zur Verwaltung verschiedener Zertifikatstypen (ab Admin 6.4.0)
- [**`checkbox`:**](#checkbox) Kontrollkästchen für boolesche Werte
- [**`checkDocker`:**](#checkdocker) Spezielle Komponente zur Überprüfung der Docker-Verfügbarkeit. Falls ja, kann eine Checkbox aktiviert werden (ab Admin 7.8.0).
- [**`checkLicense`:**](#checklicense) Eine spezielle Komponente zur Online-Lizenzprüfung
- [**`chips`:**](#chips) Der Benutzer kann Wörter eingeben, die einem Array hinzugefügt werden.
- [**`color`:**](#color) Farbauswahl
- [**`cron`:**](#cron) Konfiguriert Cron-Ausdrücke für die Planung von Aufgaben
- [**`custom`:**](#custom) Integriert benutzerdefinierte Komponenten für spezifische Funktionalitäten (nur Admin 6)
- [**`datePicker`:**](#datepicker) Ermöglicht Benutzern die Auswahl eines Datums
- [**`deviceManager`:**](#devicemanager) Gerätemanager anzeigen
- [**`divider`:**](#divider) Erzeugt eine horizontale Trennlinie
- [**`file`:**](#file) Eingabefeld mit Dateiauswahl und optionaler Upload-/Download-Funktion (nur Admin 6)
- [**`fileSelector`:**](#fileselector) Ermöglicht Benutzern die Auswahl von Dateien aus dem System (nur Admin6)
- [**`func`:**](#func) Wählt eine Funktion aus der enum.func-Liste aus (nur Admin 6)
- [**`header`:**](#header) Erstellt eine Überschrift mit verschiedenen Größen (h1-h5)
- [**`image`:**](#image) Lädt ein Bild hoch oder zeigt es an
- [**`imageSendTo`:**](#imagesendto) Zeigt ein vom Backend empfangenes Bild an und sendet Daten basierend auf einem Befehl
- [**`instance`:**](#instance) Wählt eine Adapterinstanz aus.
- [**`interface`:**](#interface) Wählt die Schnittstelle des Hosts aus, auf der die Instanz ausgeführt wird.
- [**`ip`:**](#ip) Eingabefeld für IP-Adressen mit erweiterten Optionen
- [**`jsonEditor`:**](#jsoneditor) JSON-Editor für komplexe Konfigurationsdaten
- [**`language`:**](#language) Wählt die Sprache der Benutzeroberfläche aus
- [**`license`:**](#license) zeigt die Lizenzinformationen an, falls diese noch nicht akzeptiert wurden.
- [**`number`:**](#number) Numerisches Eingabefeld mit Minimal-/Maximalwerten und Schrittweite
- [**`oauth2`:**](#oauth2) OAuth2-Authentifizierung für den Adapter aktivieren (Admin 7.6.18 oder neuer)
- [**`objectId`:**](#objectid) Wählt eine Objekt-ID mit Name, Farbe und Symbol aus.
- [**`panel`:**](#panel) Registerkarte mit Elementen
- [**`password`:**](#password) Passwort-Eingabefeld
- [**`pattern`:**](#pattern) Schreibgeschütztes Feld, das ein Muster (z. B. eine URL) anzeigt
- [**`port`:**](#port) Spezieller Eingang für Ports
- [**`qrCode`:**](#qrcode) Zeigt Daten als QR-Code an (Admin 7.0.18 oder neuer)
- [**`room`:**](#room) Wählt einen Raum aus der Liste `enum.room` aus (nur Admin 6)
- [**`select`:**](#select) Dropdown-Menü mit vordefinierten Optionen
- [**`selectSendTo`:**](#selectsendto) Dropdown-Menü mit Instanzwerten zum Senden von Daten
- [**`sendTo`:**](#sendto) Schaltfläche, die eine Anfrage an eine Instanz sendet
- [**`setState`:**](#setstate) Schaltfläche, die den Zustand einer Instanz festlegt
- [**`slider`:**](#slider) Schieberegler zur Auswahl eines Wertes innerhalb eines Bereichs (nur Admin 6)
- [**`state`:**](#state) Zeigt Steuerungselemente oder Informationen aus dem Status an (admin >= 7.1.0)
- [**`staticImage`:**](#staticimage) Zeigt ein statisches Bild an
- [**`staticInfo`:**](#staticinfo) Zeigt statische Informationen in vorformatierter Form an, z. B. "Titel: Werteinheit" (admin >= 7.3.3)
- [**`staticLink`:**](#staticlink) Erstellt einen statischen Link
- [**`staticText`:**](#statictext) Zeigt statischen Text an (z. B. eine Beschreibung)
- [**`coordinates`:**](#coordinates) Bestimmt den aktuellen Standort und verwendet die `system.config`-Koordinaten, falls diese nicht im Format "latitude,longitude" verfügbar sind.
- [**`table`:**](#table) Tabelle mit Zeilen, die hinzugefügt, gelöscht oder neu angeordnet werden können
- [**`tabs`:**](#tabs) Tabs mit Elementen
- [**`text`:**](#text) Ein- oder mehrzeiliges Texteingabefeld
- [**`textSendTo`:**](#textsendto) Zeigt ein schreibgeschütztes Steuerelement mit den angegebenen Instanzwerten an.
- [**`timePicker`:**](#timepicker) Ermöglicht Benutzern die Auswahl einer Uhrzeit
- [**`user`:**](#user) Wählt einen Benutzer aus der Liste `system.user` aus
- [**`uuid`:**](#uuid) iobroker-UUID anzeigen

Durch die Verwendung von JSON-Konfiguration können Sie eine benutzerfreundliche und anpassungsfähige Konfigurationsumgebung für Ihren ioBroker-Adapter schaffen.

## Beispielprojekte
| Typ | Link |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mehrere Tabs: | [`ioBroker.admin`](https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5) |
| Benutzerdefinierte Komponente: | [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| Benutzerdefinierte Komponente: | [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| Validierung: | |

## Trennung der großen Konfigurationen
## Enthält
Erfordert Administratorversion 6.17.1 oder neuer.

Um komplexe JSON-Dateien zu erstellen, können Sie andere JSON-Dateien einbinden.
Die eingebundene Datei muss sich im selben Verzeichnis wie die Hauptdatei befinden.

```json5
{
  tabs: {
    tab1: {
      type: "panel", // data will be combined with the content of "tab1.json". If the same attribute is defined in both files, the value from the included file will be used.
      "#include": "tab1.json",
    },
  },
}
```

## I18n - Internationalisierung
Es gibt mehrere Möglichkeiten, die Übersetzungen bereitzustellen. Nur die erste ist mit unserem Community-Übersetzungstool Weblate kompatibel und sollte daher den anderen vorgezogen werden!

Um die Übersetzungsfunktion zu aktivieren, müssen Sie die i18n-Eigenschaft auf oberster Ebene des JSON-Konfigurationsobjekts bereitstellen und aktivieren.

```json5
{
  i18n: true,
}
```

### Übersetzung in separaten Dateien: kompatibel mit weblate
Standardmäßig müssen sich die Dateien in den folgenden Verzeichnissen befinden:

```text
admin/i18n/de/translations.json
admin/i18n/en/translations.json
```

oder

```text
admin/i18n/de.json
admin/i18n/en.json
```

Zusätzlich kann der Benutzer den Pfad zu den Dateien `i18n`, `i18n`: `customI18n` angeben und Dateien im Adminbereich bereitstellen:

```json5
  "i18n": "customI18n",
```

```text
admin/customI18n/de/translations.json
admin/customI18n/en/translations.json
```

oder

```text
admin/customI18n/de.json
admin/customI18n/en.json
```

Die Struktur einer Datei entspricht der folgenden Struktur

**en.json:**

```json5
{
  i18nText1: "Open",
  i18nText2: "Close",
  "This is a Text": "This is a Text",
}
```

**de.json:**

```json5
{
  i18nText1: "Öffnen",
  i18nText2: "Schließen",
  "This is a Text": "Dies ist ein Text",
}
```

Bei der Suche nach einer Übersetzung werden die Informationen im entsprechenden Feld verwendet, um die Datei mit dem gewünschten Text zu finden. Wird die Datei nicht gefunden, bleiben die Informationen aus dem Feld erhalten. Es wird empfohlen, den Text auf Englisch einzugeben.

### Übersetzung direkt in den Feldern bereitstellen
Übersetzungen können in allen Feldern angegeben werden, die Text enthalten können. Beispiele für Felder sind Beschriftung, Titel, Tooltip, Text usw.

```json5
   "type": "text",
   "label: {
        "en": "house",
        "de": "Haus"
    }
}
```

### Übersetzung direkt im i18n bereitstellen
Die Übersetzungen können auch direkt als Objekt im Attribut `i18n` auf der obersten Ebene des Objekts `jsonConfig` bereitgestellt werden.

Bei der Suche nach einer Übersetzung werden die Informationen im entsprechenden Feld verwendet, um die Eigenschaft mit dem Text im i18n-Objekt zu finden.
Wird die Eigenschaft nicht gefunden, bleiben die Informationen aus dem Feld erhalten.
Es wird empfohlen, den Text auf Englisch einzugeben.

## Elementtypen
Jedes Element kann [gemeinsame Merkmale](#common-attributes-of-controls) und die dem jeweiligen Typ zugeordneten speziellen Attribute wie folgt haben:

### `tabs`
Registerkarten mit Elementen

| Objekt | Beschreibung |
|-----------------|------------------------------------------------------------------------------------------------|
| `items` | Objekt mit Paneelen `{"tab1": {}, "tab2": {}...}` |
| `tabsStyle` | CSS-Stile im React-Format (`marginLeft` und nicht `margin-left`) für die Mui-Tabs-Komponente |
| `tabsStyle` | CSS-Stile im React-Format (`marginLeft` und nicht `margin-left`) für die Mui-Tabs-Komponente |

### `panel`
Registerkarte mit Elementen

| Objekt | Beschreibung |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `icon` | Der Tab kann ein Symbol (base64 wie `data:image/svg+xml;base64,...`) oder `jpg/png` Bilder (endet mit `.png`) haben |
| `items` | Objekt `{"attr1": {}, "attr2": {}}...` |
| `collapsable` | nur möglich, da nicht Teil von Tabs[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json) |
| `color` | Farbe der ausklappbaren Kopfzeile `primary` oder `secondary` oder nichts |
| `innerStyle` | CSS-Stile für innere Div-Elemente im React-Format (`marginLeft` und nicht `margin-left`) für die Panel-Komponente. Wird nicht für ausklappbare Panels verwendet. |
| `innerStyle` | CSS-Stile für innere Div-Elemente im React-Format (`marginLeft` und nicht `margin-left`) für die Panel-Komponente. Wird nicht für ausklappbare Panels verwendet. |

### `text`
Textkomponente

| Objekt | Beschreibung |
|-------------------|--------------------------------------------------------------------------------------------------------|
| `maxLength` | Maximale Textlänge im Feld |
| `copyToClipboard` | Schaltfläche „In die Zwischenablage kopieren“ anzeigen, aber nur, wenn deaktiviert oder schreibgeschützt auf „true“ gesetzt ist |
| `trim` | Standardwert ist „true“. Setzen Sie dieses Attribut auf `false`, wenn das Kürzen nicht gewünscht ist. |
| `minRows` | Standardwert ist 1. Setzen Sie dieses Attribut auf `2` oder höher, wenn Sie ein Textfeld mit mehr als einer Zeile wünschen. |
| `maxRows` | Maximale Zeilenanzahl des Textbereichs. Wird nur verwendet, wenn `minRows` > 1. |
| `noClearButton` | Wenn wahr, wird die Schaltfläche "Löschen" nicht angezeigt (Admin >= 6.17.13) |
| `validateJson` | Wenn wahr, wird der Text als JSON validiert |
| `allowEmpty` | Wenn wahr, wird das JSON nur validiert, wenn der Wert nicht leer ist. |
| `time` | Der Wert ist eine Zeitangabe in Millisekunden oder eine Zeichenkette. Wird nur mit dem Flag "readOnly" verwendet. |
| `time` | Der Wert ist die Zeit in Millisekunden oder eine Zeichenkette. Wird nur mit dem Flag readOnly verwendet. |

### `number`
| Objekt | Beschreibung | Bemerkung |
|----------|---------------|----------------|
| `min` | Minimalwert | |
| `step` | Schritt | |
| `unit` | Einheit | Admin >= 7.4.9 |
| `unit` | unit | admin >= 7.4.9 |

### `color`
Farbauswahl

| Objekt | Beschreibung |
|-----------------|----------------------------------------------------------------|
| `noClearButton` | Wenn wahr, wird die Schaltfläche "Löschen" nicht angezeigt (Admin >= 6.17.13) |

### `checkbox`
Kontrollkästchen anzeigen

### `slider`
Schieberegler anzeigen (nur Admin6)

| Objekt | Beschreibung |
| -------- | ----------------------------- |
| `min` | (Standardwert 0) |
| `step` | (Standard `(max - min) / 100`) |
| `unit` | Einheit des Schiebereglers |
| `unit` | Einheit des Schiebereglers |

### `qrCode`
Daten in einem QR-Code anzeigen (Admin >= 7.0.18)

| Objekt | Beschreibung |
| --------- | ------------------------------------- |
| `data` | die im QR-Code zu kodierenden Daten |
| `fgColor` | Vordergrundfarbe |
| `bgColor` | Hintergrundfarbe |
| `level` | QR-Code-Ebene (`L` `M` `Q` `H`) |
| `level` | QR-Code-Level (`L` `M` `Q` `H`) |

### `ip`
Bindungsadresse

| Objekt | Beschreibung |
|--------------------|-----------------------------------|
| `listenOnAllPorts` | Füge 0.0.0.0 zur Option hinzu |
| `onlyIp6` | Nur IP6-Adressen anzeigen |
| `noInternal` | Interne IP-Adressen nicht anzeigen |
| `noInternal` | Interne IP-Adressen nicht anzeigen |

### `user`
Wählen Sie einen Benutzer aus der Systembenutzerliste aus. (Mit Farbe und Symbol)

| Objekt | Beschreibung |
|----------|-----------------|
| `short` | kein Systembenutzer. |

### `room`
Raum aus `enum.room` auswählen (mit Farbe und Symbol) - (nur Admin6)

| Objekt | Beschreibung |
|-------------------|--------------------------|
| `short` | kein `enum.rooms.` |
| `allowDeactivate` | Zimmer leer lassen |

### `func`
Funktion aus `enum.func` auswählen (mit Farbe und Symbol) - (nur Admin6)

| Objekt | Beschreibung |
|-------------------|-----------------------------------|
| `short` | kein `enum.func.` |
| `allowDeactivate` | Funktionalität in den Leerlauf versetzen |

### `select`
| Objekt | Beschreibung |
|-----------------|---------------------------------------------------------------------------|
| `options` | Objekt mit Beschriftungen, optionalen Übersetzungen, optionaler Gruppierung und Werten |
| `showAllValues` | Element auch dann anzeigen, wenn keine Bezeichnung dafür gefunden wurde (bei mehreren Elementen), Standardwert=`true` |
| `showAllValues` | Element auch dann anzeigen, wenn keine Bezeichnung dafür gefunden wurde (bei mehreren Elementen), Standardwert=`true` |

#### Beispiel für `select options`
```json5
[
  {"label": {"en": "option 1"}, "value": 1}, //...
]
```

oder

```json
[
   {
      "items": [
         {"label": "Val1", "value": 1},
         {"label": "Val2", "value": 2}
         ],
      "name": "group1"
   },
   {
      "items": [
         {"label": "Val3", "value": 3},
         {"label": "Val4", "value": 4}
      ],
      "name": "group2"
   },
   {"label": "Val5", "value": 5}
]
```

### `autocomplete`
| Objekt | Beschreibung |
|------------|---------------------------------------------------------------------------------------------------------------|
| `options` | `["value1", "value2", ...]` oder `[{"value": "value", "label": "Value1"}, "value2", ...]` (Schlüssel müssen eindeutig sein) |
| `freeSolo` | Setzen Sie `freeSolo` auf `true`, damit das Textfeld einen beliebigen Wert enthalten kann. |

### `image`
Speichert das Bild als Datei des Objekts `adapter.X` oder als Base64 im Attribut

| Objekt | Beschreibung |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `filename` | Der Dateiname ist der Strukturname. Im folgenden Beispiel ist `login-bg.png` der Dateiname für `writeFile("myAdapter.INSTANCE", "login-bg.png")` |
| `maxSize` | Maximale Größe der hochzuladenden Datei |
| `base64` | Wenn wahr, wird das Bild als Daten-URL im Attribut gespeichert, andernfalls als Binärdatei im Dateispeicher. |
| `crop` | Wenn wahr, dem Benutzer das Zuschneiden des Bildes erlauben |
| `!maxWidth` | |
| `!maxHeight` | |
| `!square` | Die Breite muss gleich der Höhe sein, oder der Zuschnitt darf nur quadratische Formen zulassen |
| `!square` | Die Breite muss gleich der Höhe sein, oder der Zuschnitt darf nur quadratische Formen zulassen. |

#### Beispiel für `image`
```json
  "login-bg.png": {
       "type": "image",
       "accept": "image/png",
       "label": {
         "en": "Upload image"
       },
       "crop": true
     },
     "picture": {
       "type": "image",
       "base64": true,
       "accept": "image/*",
       "label": {
         "en": "Upload image"
       },
       "crop": true
     }
  }
```

### `oauth2`
(admin >= 17.06.2018)

Zeigt die Schaltfläche „OAuth2-Authentifizierung“ an, um die Aktualisierungs- und Zugriffstoken für den Adapter zu erhalten.

Um dies nutzen zu können, müssen Sie zunächst die OAuth2-Daten (Client-ID, Geheimnis usw.) an das ioBroker-Wartungsteam übermitteln, damit dieses sie in die Cloud einbinden kann.

| Objekt | Beschreibung |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `identifier` | OAuth2-Kennung, wie z. B. `spotify`, `google`, `dropbox`, `microsoft` |
| `scope` | Optionale Bereiche, durch Leerzeichen getrennt, z. B. `user-read-private user-read-email` |
| `refreshLabel` | Optionale Schaltflächenbeschriftung zum Aktualisieren des Tokens |
| `refreshLabel` | Optionale Schaltflächenbeschriftung zum Aktualisieren des Tokens |

#### Beispiel für `oauth2`
```json
  "_oauth2": {
       "type": "oauth2",
       "identifier": "spotify",
       "label": "Get Spotify OAuth2 Token",
       "refreshLabel": "Refresh Spotify OAuth2 Token",
       "icon": "data:image/svg+xml;base64,...",
  }
```

Siehe auch [OAUTH2.md](OAUTH2.md) für weitere Informationen.

### `objectId`
Objekt-ID: Anzeige mit Name, Farbe und Symbol

| Objekt | Beschreibung |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `types` | Gewünschter Typ: `channel`, `device`, ... (standardmäßig nur `state`). Es handelt sich um einen Plural, da `type` bereits belegt ist. |
| `customFilter` | [optional] Kann nicht zusammen mit den `type`-Einstellungen verwendet werden. Es handelt sich um ein Objekt und nicht um eine JSON-Zeichenfolge. |
| `filterFunc` | [optional] Kann nicht zusammen mit den Einstellungen `type` verwendet werden. Es handelt sich um eine Funktion, die für jedes Objekt aufgerufen wird und true oder false zurückgeben muss. Beispiel: `obj.common.type === 'number'` |
| `filterFunc` | [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es handelt sich um eine Funktion, die für jedes Objekt aufgerufen wird und true oder false zurückgeben muss. Beispiel: `obj.common.type === 'number'` |

#### Beispiele für `customFilter`
##### Nur Objekte mit bestimmten benutzerdefinierten Einstellungen anzeigen
`{common: {custom: true}}`

##### Nur Objekte mit benutzerdefinierten SQL.0-Einstellungen anzeigen (nur die jeweilige Instanz)
`{common: {custom: 'sql.0'}}`

##### Nur Objekte der Adapter `influxdb` oder `sql` oder `history` anzeigen
`{common: {custom: '_dataSources'}}`

##### Nur Objekte mit benutzerdefinierten Einstellungen für einen bestimmten Adapter anzeigen (alle Instanzen)
`{common: {custom: 'adapterName.'}}`

##### Nur Kanäle anzeigen
`{type: 'channel'}`

##### Nur Kanäle und Geräte anzeigen
`{type: ['channel', 'device']}`

##### Nur Zustände vom Typ 'Zahl' anzeigen
`{common: {type: 'number'}`

##### Nur Zustände vom Typ 'Zahl' und 'Zeichenkette' anzeigen
`{common: {type: ['number', 'string']}`

##### Nur Zustände mit Rollen anzeigen, die mit „switch“ beginnen
`{common: {role: 'switch'}`

##### Nur Zustände mit Rollen anzeigen, die mit `switch` und `button` beginnen
`{common: {role: ['switch', 'button']}`

### `password`
Dieser Feldtyp wirkt sich nur auf die Benutzeroberfläche aus.
Passwörter und andere sensible Daten müssen verschlüsselt gespeichert werden! Dazu muss der Schlüssel in der io-package.json unter [nativeEncrypted](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) hinterlegt werden.
Zusätzlich können Sie verhindern, dass diese Eigenschaft an andere Adapter als `admin` und `cloud` ausgeliefert wird, indem Sie sie in der Datei `io-package.json` unter `protectedNative` hinzufügen.

| Objekt | Beschreibung |
|-------------|---------------------------------------------------------------------------------------------------------|
| `repeat` | Das Wiederholungspasswort muss mit dem Passwort verglichen werden |
| `readOnly` | Das Schreibschutzflag. Sichtbar ist automatisch wahr, wenn Schreibschutz wahr ist. |
| `maxLength` | Maximale Textlänge im Feld |
| `maxLength` | Maximale Textlänge im Feld |

### `instance`
| Objekt | Beschreibung |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `adapter` | Name des Adapters. Mit dem speziellen Namen `_dataSources` erhalten Sie alle Adapter mit dem Flag `common.getHistory`. |
| `allowDeactivate` | falls wahr. Die zusätzliche Option "Deaktivieren" wird angezeigt. |
| `onlyEnabled` | falls wahr. Nur aktivierte Instanzen werden angezeigt. |
| `long` | Der Wert sieht eher aus wie `system.adapter.ADAPTER.0` und nicht wie `ADAPTER.0` |
| `short` | Der Wert sieht aus wie `0` und nicht wie `ADAPTER.0` |
| `all` | Füge der Option "all" den Wert `*` hinzu |
| `all` | Füge der Optionsliste die Option "all" mit dem Wert `*` hinzu. |

### `chips`
Der Benutzer kann das Wort eingeben, und es wird hinzugefügt (siehe Cloud => Dienste => Whitelist). Die Ausgabe ist ein Array, falls kein `delimiter` definiert ist.

| Objekt | Beschreibung |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `delimiter` | Wenn diese Option definiert ist, wird sie als Zeichenkette mit Trennzeichen anstelle eines Arrays gespeichert. Beispiel: Aus `delimiter=;` wird `a;b;c` anstelle von `['a', 'b', 'c']` |

### `alive`
Dient lediglich als Indikator dafür, ob die Instanz aktiv ist, und kann im "ausgeblendeten" und "deaktivierten" Zustand verwendet werden (wird nicht in der Konfiguration gespeichert).

Nur Text: Instanz läuft, Instanz läuft nicht

| Objekt | Beschreibung |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `instance` | Prüfen, ob die Instanz aktiv ist. Falls nicht definiert, wird die aktuelle Instanz verwendet. Sie können das Muster `${data.number}` im Text verwenden. |
| `textNotAlive` | Der Standardtext ist `Instance %s is not alive`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in den i18n-Dateien vorhanden sein. |
| `textNotAlive` | Der Standardtext lautet `Instanz %s ist nicht aktiv`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in den i18n-Dateien vorhanden sein. |

### `pattern`
Schreibgeschütztes Feld mit einem Muster wie 'https://${data.ip}:${data.port}' (wird nicht in der Konfiguration gespeichert). Texteingabefeld mit dem schreibgeschützten Flag, das ein Muster anzeigt.

| Objekt | Beschreibung |
|-------------------|-----------------------|
| `copyToClipboard` | wenn wahr - Schaltfläche anzeigen |
| `Muster` | mein Muster |

### `sendTo`
Schaltfläche, die eine Anfrage an die Instanz sendet (<https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128>)

| Objekt | Beschreibung |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | (Standard `send`) |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. |
| `result` | `{result1: {en: 'A'}, result2: {en: 'B'}}` |
| `error` | `{error1: {en: 'E'}, error2: {en: 'E2'}}` |
| `variant` | `contained`, `outlined` oder nichts. Variante der Schaltfläche. |
| `openUrl` | Wenn wahr - URL in neuem Tab öffnen, falls die Antwort das Attribut `openUrl` enthält, wie z. B. `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank", "saveConfig": true}`. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern. |
| `reloadBrowser` | Falls wahr - lade das aktuelle Browserfenster neu, falls die Antwort das Attribut `reloadBrowser` enthält, z. B. `{"reloadBrowser": true}`. |
| `window` | Wenn `openUrl` wahr ist, ist dies der Name des neuen Fensters. Kann überschrieben werden, wenn die Antwort das Attribut `window` enthält. `this.props.socket.sendTo(adapterName.instance, command \|\| 'send', data, result => {});` |
| `icon` | Falls ein Symbol angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`. Sie können Symbole der Kategorie `base64` (wie `data:image/svg+xml;base64,...`) oder Bilder der Kategorie `jpg/png` (endet mit `.png`) verwenden. (Bitte melden Sie weitere Symbole über ein Issue an.) |
| `useNative` | Wenn der Adapter ein Ergebnis mit dem Attribut `native` zurückgibt, wird dieses für die Konfiguration verwendet. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern. |
| `showProcess` | Ladekreis anzeigen, solange die Anfrage bearbeitet wird |
| `timeout` | Timeout für die Anfrage in ms. Standard: keiner. |
| `onLoaded` | Die Schaltflächenlogik einmalig initial ausführen |
| `controlStyle` | Stile für die Schaltfläche. |
| `controlStyle` | Stile für die Schaltfläche. |

### `setState`
Schaltfläche zum Festlegen des Instanzstatus

| Objekt | Beschreibung |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `id` | `system.adapter.myAdapter.%INSTANCE%.test`, Sie können den Platzhalter `%INSTANCE%` verwenden, um ihn durch den aktuellen Instanznamen zu ersetzen |
| `val` | `${data.myText}\_test` oder Zahl. Der Typ wird automatisch anhand des Zustandstyps erkannt und die Konvertierung ebenfalls durchgeführt. |
| `okText` | Warnmeldung, die durch Drücken der Schaltfläche angezeigt wird |
| `variant` | `contained`, `outlined`, '' |
| `Variante` | `enthalten`, `umrandet`, '' |

### `staticText`
statischer Text wie Beschreibung

| Objekt | Beschreibung |
|----------|---------------------|
| `label` | mehrsprachiger Text |
| `text` | entspricht der Beschriftung |

Es muss genau eines von `label` oder `text` angegeben werden – nicht beide.

### `staticLink`
| Objekt | Beschreibung |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `label` | mehrsprachiger Text |
| `target` | `_blank` oder `_self` oder Fenstername |
| `close` | Wenn wahr, wird die GUI geschlossen (wird nicht für JsonConfig im Adminbereich verwendet, sondern für die dynamische GUI) |
| `button` | Link als Schaltfläche anzeigen |
| `variant` | Typ der Schaltfläche (`outlined`, `contained`, `text`) |
| `color` | Farbe der Schaltfläche (z. B. `primary`) |
| `icon` | wenn Symbol angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`, `book`, `help`, `upload`. Sie können die Icons `base64` (beginnt mit `data:image/svg+xml;base64,...`) oder die Bilder `jpg/png` (endet mit `.png`) verwenden. (Bitte fordern Sie weitere Icons über das Issue an.) |
| `icon` | Wenn ein Symbol angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`, `book`, `help`, `upload`. Sie können `base64`-Symbole (beginnt mit `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Bitte fordern Sie weitere Symbole über ein Issue an.) |

### `staticImage`
| Objekt | Beschreibung |
|----------|----------------------------------------|
| `href` | optionaler HTTP-Link |
| `src` | Name des Bildes (aus dem Admin-Verzeichnis) |

### `table`
Tabelle mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können.

| Objekt | Beschreibung |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "width": px or %, "title": {"en": "header"}, "attr": "name", "filter": false, "sort": true, "default": ""}]` |
| `objKeyName` | (Veraltete Einstellung, nicht verwenden!) - Name des Schlüssels in `{"192.168.1.1": {delay: 1000, enabled: true}, "192.168.1.2": {delay: 2000, enabled: false}}` |
| `objValueName` | (Veraltete Einstellung, nicht verwenden!) - Name des Werts in `{"192.168.1.1": "value1", "192.168.1.2": "value2"}` |
| `allowAddByFilter` | Hinzufügen erlaubt, auch wenn ein Filter gesetzt ist |
| `showSecondAddAt` | Anzahl der Zeilen, ab denen die zweite Schaltfläche „Hinzufügen“ am unteren Rand der Tabelle angezeigt wird. Standardwert: 5 |
| `showFirstAddOnTop` | Erste Plus-Schaltfläche oben in der ersten Spalte und nicht links anzeigen. |
| `clone` | [optional] - Gibt an, ob die Schaltfläche „Klonen“ angezeigt werden soll. Ist dies der Fall, wird die Schaltfläche „Klonen“ angezeigt. Falls es sich um einen Attributnamen handelt, muss dieser eindeutig sein. |
| `export` | [optional] - wenn die Export-Schaltfläche angezeigt werden soll. Als CSV-Datei exportieren. |
| `import` | [optional] - falls die Import-Schaltfläche angezeigt werden soll. Import aus einer CSV-Datei. |
| `uniqueColumns` | [optional] - Geben Sie ein Array von Spalten an, die eindeutige Einträge enthalten müssen |
| `encryptedAttributes` | [optional] - Geben Sie ein Array von Spalten an, die verschlüsselt werden sollen |
| `compact` | [optional] - Falls wahr, wird die Tabelle im Kompaktmodus angezeigt |
| `compact` | [optional] - Wenn true, wird die Tabelle im Kompaktmodus angezeigt |

### `accordion`
Akkordeonmenü mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können (Admin 6.6.0 und neuer)

| Objekt | Beschreibung |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "attr": "name", "default": ""}]` Elemente können wie auf einem `panel` (xs, sm, md, lg und newLine) platziert werden |
| `noDelete` | Boolescher Wert, der angibt, ob das Löschen oder Hinzufügen deaktiviert ist. Wenn `noDelete` auf „false“ gesetzt ist, sollten Hinzufügen, Löschen und Verschieben nach oben/unten funktionieren. |
| `clone` | [optional] - Gibt an, ob die Schaltfläche „Klonen“ angezeigt werden soll. Ist dies der Fall, wird die Schaltfläche „Klonen“ angezeigt. Falls es sich um einen Attributnamen handelt, muss dieser eindeutig sein. |
| `clone` | [optional] - Gibt an, ob die Schaltfläche „Klonen“ angezeigt werden soll. Ist dies der Fall, wird die Schaltfläche „Klonen“ angezeigt. Falls es sich um einen Attributnamen handelt, muss dieser eindeutig sein. |

### `jsonEditor`
Schaltfläche zum Öffnen eines JSON(5)-Editors. JSON5 wird ab Admin-Version 5.7.3 unterstützt.

| Objekt | Beschreibung |
|------------------------|-----------------------------------------------------------------------|
| `validateJson` | Wenn false, wird der Text nicht als JSON validiert |
| `json5` | falls JSON5-Format zulässig ist (ab Version 7.5.3) |
| `doNotApplyWithError` | Speichern des Werts bei Fehlern in JSON oder JSON5 nicht zulassen (ab Version 7.5.3) |
| `readOnly` | Editor im Nur-Lese-Modus öffnen – Editor kann geöffnet, aber Inhalt kann nicht geändert werden |
| `readOnly` | Öffnet den Editor im Nur-Lese-Modus – der Editor kann geöffnet, aber der Inhalt nicht geändert werden |

### `language`
Sprache auswählen

| Objekt | Beschreibung |
|----------|----------------------------------------------------------------------------------------------------------------------|
| `system` | Erlaubt die Verwendung der Systemsprache aus `system.config` als Standard (hat einen leeren String-Wert, wenn ausgewählt) |

### `certificate`
| Objekt | Beschreibung |
|------------|----------------------------------------------------------------------------------------|
| `certType` | einer von: `public`, `private`, `chained`. Ab Version 6.4.0 kann jedoch der Typ `certificates` verwendet werden. |

### `certificates`
Es handelt sich um einen universellen Typ, der die Attribute `certPublic`, `certPrivate`, `certChained` und `leCollection` für Sie verwaltet.

Beispiel:

```json
{
  "_certs": {
    "type": "certificates",
    "newLine": true,
    "hidden": "!data.secure",
    "sm": 12
  }
}
```

### `certificateCollection`
Wählen Sie eine Zertifikatssammlung aus, verwenden Sie einfach alle Sammlungen oder verzichten Sie ganz auf Let's Encrypt.

| Objekt | Beschreibung |
|--------------------|------------------------------------|
| `leCollectionName` | Name der Zertifikatssammlung |

### `custom`
nur Admin6

| Objekt | Beschreibung |
|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| `name` | Komponentenname, der über Props bereitgestellt wird, z. B. `ComponentInstancesEditor` |
| `i18n` | wahr, wenn sich die `i18n/xx.json`-Dateien im selben Verzeichnis wie die Komponente oder das Übersetzungsobjekt `{"text1": {"en": Text1"}}` befinden |
| `bundlerType` | Wenn das Modul mit TypeScript geschrieben wurde, setzen Sie es auf `module`. Ab Admin 7.5.x |
| `bundlerType` | Wenn das Modul mit TypeScript geschrieben wurde, setzen Sie es auf `module`. Ab Admin 7.5.x |

#### Beispiel für eine URL
- `custom/customComponents.js`: In diesem Fall werden die Dateien von `/adapter/ADAPTER_NAME/custom/customComponents.js` geladen.
- `https://URL/myComponent`: direkt von der URL
- `./adapter/ADAPTER_NAME/custom/customComponent.js`: In diesem Fall werden die Dateien von `/adapter/ADAPTER_NAME/custom/customComponents.js` geladen.

### `datePicker`
Dem Benutzer ermöglichen, ein Datum auszuwählen; das UI-Format stammt aus der konfigurierten Konfiguration.

### `timePicker`
Dem Benutzer die Auswahl eines Datums ermöglichen; die zurückgegebene Zeichenkette ist eine auswertbare Datumszeichenkette oder hat das Format `HH:mm:ss`

| Objekt | Beschreibung |
|----------------|------------------------------------------------------------------------------------------------------|
| `format` | Das an den Datumswähler übergebene Format ist standardmäßig `HH:mm:ss` |
| `timeSteps` | Stellt die verfügbaren Zeitschritte für jede Ansicht dar. Standardwert ist `{ hours: 1, minutes: 5, seconds: 5 }` |
| `returnFormat` | `fullDate` oder `HH:mm:ss`. Standardmäßig wird aus Gründen der Abwärtskompatibilität das vollständige Datum verwendet. |
| `returnFormat` | `fullDate` oder `HH:mm:ss`. Standardmäßig wird aus Gründen der Abwärtskompatibilität das vollständige Datum verwendet. |

### `divider`
horizontale Linie

| Objekt | Beschreibung |
|----------|--------------------------------------------------|
| `height` | optionale Höhe |
| `Farbe` | optionale Trennlinienfarbe oder `primär`, `sekundär` |

### `header`
| Objekt | Beschreibung |
|----------|--------------|
| `text` | |
| `size` | 1-5 => h1-h5 |

### `cron`
Zeigt die CRON-Einstellungen an. Sie haben 3 Optionen:

- `simple` - zeigt einfache CRON-Einstellungen an
- `complex` - zeigt CRON mit "Minuten", "Sekunden" usw. an
- Weder „einfach“ noch „komplex“ - Der Benutzer kann im Dialog zwischen einfach und komplex wechseln.

| Objekt | Beschreibung |
|-----------|-----------------------------------------------|
| `complex` | CRON mit "Minuten", "Sekunden" usw. anzeigen |
| `simple` | einfache CRON-Einstellungen anzeigen |

### `fileSelector`
Wählen Sie eine Datei aus einem Ordner über das Dropdown-Menü aus. Sie können bei Bedarf auch eine neue Datei in diesen Ordner hochladen.

nur Admin6

| Objekt | Beschreibung |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pattern` | Dateierweiterungsmuster. Zulässig sind `**/*.ext`, um auch alle Dateien aus Unterordnern anzuzeigen, `*.ext`, um alle Dateien aus dem Stammverzeichnis anzuzeigen, oder `folderName/*.ext`, um alle Dateien im Unterordner `folderName` anzuzeigen. Standardwert: `**/*.*`. |
| `objectID` | Objekt-ID vom Typ `meta`. Sie können den speziellen Platzhalter `%INSTANCE%` verwenden: wie z. B. `myAdapter.%INSTANCE%.files` |
| `upload` | Pfad, unter dem die hochgeladenen Dateien gespeichert werden. Ähnlich wie `folderName`. Wenn nicht definiert, wird kein Upload-Feld angezeigt. Um im Stammverzeichnis hochzuladen, setzen Sie dieses Feld auf `/`. |
| `refresh` | Aktualisierungsschaltfläche neben dem Auswahlfeld anzeigen. |
| `maxSize` | Maximale Dateigröße (Standard 2 MB) |
| `withFolder` | Ordnernamen auch dann anzeigen, wenn sich alle Dateien im selben Ordner befinden |
| `delete` | Löschen von Dateien zulassen |
| `noNone` | Option `none` nicht anzeigen |
| `noSize` | Dateigröße nicht anzeigen |
| `noSize` | Dateigröße nicht anzeigen |

### `file`
Eingabefeld mit Dateiauswahl. Es wird als Textfeld mit einer Schaltfläche zum Öffnen des Dialogs angezeigt.
Nur Admin6.

| Objekt | Beschreibung |
|---------------------|------------------------------------------------------------------------------------------|
| `disableEdit` | wenn der Benutzer den Dateinamen manuell eingeben kann und nicht nur über einen Auswahldialog |
| `filterFiles` | wie `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']` |
| `allowUpload` | Zulässiges Hochladen von Dateien |
| `allowDownload` | Download von Dateien erlaubt (Standard: true) |
| `allowCreateFolder` | Erstellung von Ordnern erlaubt |
| `allowView` | Kachelansicht erlaubt (Standard: true) |
| `showToolbar` | Symbolleiste anzeigen (Standardeinstellung: true) |
| `selectOnlyFolders` | Der Benutzer kann nur Ordner auswählen (z. B. für den Upload-Pfad) |
| `trim` | Dateinamen kürzen |
| `trim` | Dateinamen kürzen |

### `imageSendTo`
zeigt ein Bild, das vom Backend als Base64-String empfangen wurde.

| Objekt | Beschreibung |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `width` | Breite des QR-Codes in Pixeln |
| `command` | sendTo-Befehl |
| `jsonData` | Zeichenkette - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |

#### Beispielcode im Backend für `imageSendTo`
```js
adapter.on("message", (obj) => {
  if (obj.command === "send") {
    const QRCode = require("qrcode");
    QRCode.toDataURL(
      "3ca4234a-fd81-fdb8-5584-08c732f70e4d",
      (err, url) =>
        obj.callback && adapter.sendTo(obj.from, obj.command, url, obj.callback)
    );
  }
});
```

### `selectSendTo`
Zeigt das Dropdown-Menü mit den angegebenen Instanzwerten an.

| Objekt | Beschreibung |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo-Befehl |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |
| `manual` | Manuelle Bearbeitung zulassen. Ohne Dropdown-Menü (wenn die Instanz offline ist). Standardmäßig `true`. |
| `multiple` | Mehrfachauswahl |
| `showAllValues` | Element auch dann anzeigen, wenn keine Bezeichnung dafür gefunden wurde (bei mehreren Elementen), Standardwert=`true` |
| `noTranslation` | Die Beschriftung der Auswahllisten wird nicht übersetzt. Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren. Das Ergebnis des Befehls muss ein Array der Form `[{"value": 1, "label": "one"}, ...]` | sein. |
| `alsoDependsOn` | Durch welche Änderung der Attribute muss der Befehl erneut gesendet werden? |
| `alsoDependsOn` | Durch die Änderung welcher Attribute muss der Befehl erneut gesendet werden |

#### Beispielcode im Backend für `selectSendTo`
```js
adapter.on("message", (obj) => {
  if (obj) {
    switch (obj.command) {
      case "command":
        if (obj.callback) {
          try {
            const { SerialPort } = require("serialport");
            if (SerialPort) {
              // read all found serial ports
              SerialPort.list()
                .then((ports) => {
                  adapter.log.info(`List of port: ${JSON.stringify(ports)}`);
                  adapter.sendTo(
                    obj.from,
                    obj.command,
                    ports.map((item) => ({
                      label: item.path,
                      value: item.path,
                    })),
                    obj.callback
                  );
                })
                .catch((e) => {
                  adapter.sendTo(obj.from, obj.command, [], obj.callback);
                  adapter.log.error(e);
                });
            } else {
              adapter.log.warn("Module serialport is not available");
              adapter.sendTo(
                obj.from,
                obj.command,
                [{ label: "Not available", value: "" }],
                obj.callback
              );
            }
          } catch (e) {
            adapter.sendTo(
              obj.from,
              obj.command,
              [{ label: "Not available", value: "" }],
              obj.callback
            );
          }
        }

        break;
    }
  }
});
```

### `autocompleteSendTo`
Zeigt ein Autovervollständigungssteuerelement mit den angegebenen Instanzwerten an.

| Objekt | Beschreibung |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo-Befehl |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |
| `freeSolo` | Setze `freeSolo` auf `true`, damit das Textfeld einen beliebigen Wert enthalten kann. |
| `alsoDependsOn` | Durch welche Änderung der Attribute muss der Befehl erneut gesendet werden? |
| `maxLength` | Maximale Textlänge im Feld |
| `maxLength` | Maximale Textlänge im Feld |

Um diese Option nutzen zu können, muss Ihr Adapter einen Nachrichtenhandler implementieren:

Das Ergebnis des Befehls muss ein Array der Form `["value1", {"value": "value2", "label": "Value2"}, ...]` sein (die Schlüssel müssen eindeutig sein). Siehe `selectSendTo` für ein Handler-Beispiel.

### `textSendTo`
Zeigt ein schreibgeschütztes Steuerelement mit den angegebenen Instanzwerten.

| Objekt | Beschreibung |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `container` | `div`, `text`, `html` |
| `alsoDependsOn` | Durch welche Änderung der Attribute muss der Befehl erneut gesendet werden? |
| `command` | sendTo-Befehl |
| `jsonData` | Zeichenkette - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können entweder jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist. |

Um diese Option zu nutzen, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss eine Zeichenkette oder ein Objekt mit den folgenden Parametern sein:

```json5
{
  text: "text to show", // mandatory
  style: { color: "red" }, // optional
  icon: "search", // optional. It could be base64 or link to image in the same folder as jsonConfig.json file
  // possible predefined names: edit, rename, delete, refresh, add, search, unpair, pair, identify, play, stop, pause, forward, backward, next, previous, lamp, backlight, dimmer, socket, settings, group, user, qrcode, connection, no-connection, visible
  iconStyle: { width: 30 }, // optional
}
```

#### Beispiel für `textSendTo`
```js
adapter.on("message", (obj) => {
  if (obj) {
    switch (obj.command) {
      case "command":
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            "Received " + JSON.stringify(obj.message),
            obj.callback
          );
        // or with style
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            {
              text: "Received " + JSON.stringify(obj.message),
              style: { color: "red" },
              icon: "search",
              iconStyle: { width: 30 },
            },
            obj.callback
          );
        // or as html
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            `<div style="color: green">${JSON.stringify(obj.message)}</div>`,
            obj.callback
          );
        break;
    }
  }
});
```

### `coordinates`
Ermittelt den aktuellen Standort und verwendet die Koordinaten `system.config`, falls diese nicht im Format „Breitengrad,Längengrad“ angegeben werden können.

| Objekt | Beschreibung |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `divider` | Trennzeichen zwischen Breitengrad und Längengrad. Standardwert: "," (Wird verwendet, wenn longitudeName und latitudeName nicht definiert sind) |
| `longitudeName` | Falls definiert, wird der Längengrad in diesem Attribut gespeichert, das Trennzeichen wird ignoriert. |
| `latitudeName` | Falls definiert, wird der Breitengrad in diesem Attribut gespeichert, das Trennzeichen wird ignoriert. |
| `useSystemName` | Falls definiert, wird das Kontrollkästchen mit der Aufschrift "Systemeinstellungen verwenden" angezeigt und Breitengrad und Längengrad werden aus `system.config` gelesen. Ein boolescher Wert wird unter dem angegebenen Namen gespeichert. |
| `useSystemName` | Falls definiert, wird das Kontrollkästchen mit der Aufschrift "Systemeinstellungen verwenden" angezeigt und die Breiten- und Längengrade werden aus `system.config` gelesen. Ein boolescher Wert wird unter dem angegebenen Namen gespeichert. |

### `interface`
Wählen Sie die Schnittstelle des Hosts aus, auf dem die Instanz ausgeführt wird.

| Objekt | Beschreibung |
|------------------|----------------------------------------------------------------|
| `ignoreLoopback` | Loopback-Schnittstelle (127.0.0.1) nicht anzeigen |
| `ignoreInternal` | Interne Schnittstellen nicht anzeigen (normalerweise auch 127.0.0.1) |

### `license`
Zeigt die Lizenzinformationen an, falls diese noch nicht akzeptiert wurden. Eines der Attribute `texts` oder `licenseUrl` muss definiert sein. Nach der Lizenzakzeptanz wird das definierte Konfigurationsattribut auf `true` gesetzt.

| Objekt | Beschreibung |
|--------------|------------------------------------------------------------------------------------------------------------|
| `texts` | Array von Absätzen mit Texten, die jeweils als separater Absatz angezeigt werden |
| `title` | Titel des Lizenzdialogs |
| `agreeText` | Text der vereinbarten Schaltfläche |
| `checkBox` | Falls definiert, wird das Kontrollkästchen mit dem angegebenen Namen angezeigt. Wenn es aktiviert ist, wird die entsprechende Schaltfläche aktiviert. |
| `checkBox` | Falls definiert, wird die Checkbox mit dem angegebenen Namen angezeigt. Wenn sie aktiviert ist, wird die entsprechende Schaltfläche aktiviert. |

### `checkDocker`
- (admin >= 7.7.2) erste Implementierung

Eine spezielle Komponente prüft, ob Docker installiert ist und ausgeführt wird.
Wenn Docker installiert ist, wird ein Kontrollkästchen angezeigt, um die Nutzung von Docker zu erlauben.

| Objekt | Beschreibung |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hideVersion` | Wenn die Informationen über die Docker-Version oder einen Fehler ausgeblendet werden sollen (z. B. wenn mehr als ein solches Element auf der Seite verwendet wird, wird der Fehler oder die Version nur einmal angezeigt). |

### `checkLicense`
Eine ganz spezielle Komponente zur Online-Lizenzprüfung. Sie benötigt exakt die Eigenschaften `license` und `useLicenseManager` im nativen Format.

| Objekt | Beschreibung |
|-----------|---------------|
| `uuid` | UUID prüfen |
| `version` | Version prüfen |

### `uuid`
iobroker-UUID anzeigen

### `port`
Spezielle Eingabe für Ports. Es prüft automatisch, ob ein Port von anderen Instanzen verwendet wird, und zeigt eine Warnung an.

| Objekt | Beschreibung |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `min` | Minimal zulässige Portnummer. Sie kann 0 sein. Wenn der Wert dann null ist, wird nicht geprüft, ob der Port belegt ist. |

### `state`
- (Admin >= 7.1.0) Steuerung oder Informationen aus dem Status anzeigen
- (admin >= 7.6.4) Attribute „showEnterButton“ und „setOnEnterKey“.

| Objekt | Beschreibung |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `oid` | Welche Objekt-ID soll für die Steuerung verwendet werden? Die ID hat kein Präfix `adapter.X.`. |
| `foreign` | Der Wert `oid` ist absolut und es ist nicht nötig, `adapter.X` oder `system.adapter.X.` zur oid hinzuzufügen. |
| `control` | Wie der Wert des Zustands angezeigt werden soll: `text`, `html`, `input`, `slider`, `select`, `button`, `switch`, `number` |
| `controlled` | Wenn wahr, wird der Zustand als Schalter, Auswahlfeld, Schaltfläche, Schieberegler oder Texteingabefeld angezeigt. Wird nur verwendet, wenn keine Steuerelement-Eigenschaft definiert ist. |
| `unit` | Einheit zum Wert hinzufügen |
| `trueText` | Dieser Text wird angezeigt, wenn der Wert wahr ist |
| `trueTextStyle` | Textstil, wenn der Wert wahr ist |
| `falseText` | Dieser Text wird angezeigt, wenn der Wert falsch ist oder wenn es sich bei dem Steuerelement um eine Schaltfläche handelt. |
| `falseTextStyle` | Textstil, wenn der Wert falsch ist oder wenn das Steuerelement eine "Schaltfläche" ist |
| `trueImage` | Dieses Bild wird angezeigt, wenn der Wert wahr ist |
| `falseImage` | Dieses Bild wird angezeigt, wenn der Wert falsch ist oder wenn es sich bei dem Steuerelement um eine Schaltfläche handelt. |
| `min` | Minimalwert für Schieberegler oder Zahl |
| `max` | Maximalwert für Schieberegler oder Zahl |
| `step` | Schrittwert für Steuerelementtyp Schieberegler oder Zahl |
| `controlDelay` | Verzögerung in ms für Schieberegler oder Zahl |
| `variant` | Varianten der Schaltfläche: `contained`, `outlined`, `text` |
| `readOnly` | Legt fest, ob das Steuerelement schreibgeschützt ist |
| `narrow` | Normalerweise werden Titel und Wert links und rechts in der Zeile angezeigt. Mit diesem Flag erscheint der Wert direkt nach der Beschriftung. |
| `blinkOnUpdate` | Der Wert soll bei Aktualisierung blinken (wahr oder Farbe) |
| `size` | Schriftgröße: klein, normal, groß oder Zahl |
| `addColon` | Füge dem Label am Ende einen Doppelpunkt hinzu, falls dieser im Label noch nicht vorhanden ist. |
| `labelIcon` | Base64-Symbol für Beschriftung |
| `buttonValue` | Optionaler Wert, der für die Schaltfläche gesendet wird |
| `showEnterButton` | Schaltfläche „SET“ anzeigen. Der Wert wird in diesem Fall nur beim Drücken der Schaltfläche gesendet. Sie können den Text der Schaltfläche festlegen. Standardtext ist „Set“ (nur für „input“, „number“ oder „slider“). |
| `setOnEnterKey` | Der Wert wird in diesem Fall nur gesendet, wenn die "Enter"-Taste gedrückt wird. Er kann mit `showEnterButton` kombiniert werden. |
| `options` | Optionen für `select` in Form von `["value1", "value2", ...]` oder `[{"value": "value", "label": "Value1", "color": "red"}, "value2", ...]`. Falls nicht verfälscht, muss `common.states` im Objekt vorhanden sein. |
| `options` | Optionen für `select` in der Form `["value1", "value2", ...]` oder `[{"value": "value", "label": "Value1", "color": "red"}, "value2", ...]`. Falls nicht verfälscht, muss `common.states` im Objekt vorhanden sein. |

### `staticInfo`
Zeigt statische Informationen in vorformatierter Form an, z. B. „Titel: Werteinheit“ (Admin >= 7.3.3). Dieses Steuerelement wird hauptsächlich in dynamischen Formularen verwendet.

| Objekt | Beschreibung |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `data` | Anzuzeigender Wert |
| `unit` | (optionale) Einheit (kann mehrsprachig sein) |
| `narrow` | (optional) Normalerweise werden Titel und Wert links und rechts in der Zeile angezeigt. Mit diesem Flag erscheint der Wert direkt nach der Beschriftung |
| `addColon` | (optional) Füge dem Label am Ende einen Doppelpunkt hinzu, falls dieser im Label noch nicht vorhanden ist. |
| `blinkOnUpdate` | (optional) Der Wert soll bei Aktualisierung blinken (wahr oder Farbe) |
| `blink` | (optional) Wert sollte kontinuierlich blinken (wahr oder Farbe) |
| `styleLabel` | (optional) React CSS Styles |
| `styleValue` | (optional) React CSS Styles |
| `styleUnit` | (optional) React CSS Styles |
| `copyToClipboard` | (optional) Schaltfläche zum Kopieren des Wertes in die Zwischenablage anzeigen |
| `labelIcon` | (optional) Base64-Symbol für die Beschriftung |
| `size` | (optional) Schriftgröße: klein, normal, groß oder Zahl |
| `highlight` | (optional) Zeile beim Überfahren mit der Maus hervorheben |
| `booleanAsCheckbox` | (optional) Boolesche Werte als Kontrollkästchen anzeigen |
| `booleanAsCheckbox` | (optional) Boolesche Werte als Kontrollkästchen anzeigen |

### `infoBox`
Zeigt einen ausschließbaren statischen Text mit optionalem Titel und Symbol an. (Ab Admin-Version 7.6.19)

| Objekt | Beschreibung |
|----------------|---------------------------------------------------------------|
| `text` | Anzuzeigender Text |
| `boxType` | (optional) `warning`, `info`, `error`, `ok`. (Standard `info`) |
| `closeable` | (optional) Wenn die Box schließbar ist (Standard `true`) |
| `iconPosition` | (optional) `top`, `middle` (Standard `middle`) |
| `closed` | (optional) Wird zu Beginn als geschlossen angezeigt |
| `geschlossen` | (optional) Wird zu Beginn als geschlossen angezeigt |

### `deviceManager`
Zeigen Sie den Geräte-Manager an. Dazu muss der Adapter das Geräte-Manager-Protokoll unterstützen. Siehe iobroker/dm-utils.

Hier ist ein Beispiel dafür, wie der Geräte-Manager in einem Tab angezeigt wird:

```json5
{
    //...
    "_deviceManager": {
        "type": "panel",
        "label": "Device manager",
        "items": {
            "_dm": {
                "type": "deviceManager",
                "sm": 12,
                "style": {
                    "width": "100%",
                    "height": "100%",
                    "overflow": "hidden"
                }
            }
        },
        "style": {
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
        },
        "innerStyle": {
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
        }
    }
}
```

## Gemeinsame Eigenschaften von Steuerelementen
### Layoutoptionen `xl`,`lg`,`md`,`sm`,`xs`
Mithilfe dieser Optionen lässt sich die Breite von Elementen auf verschiedenen Bildschirmgrößen festlegen, um ein responsives und anpassungsfähiges Layout auf verschiedenen Geräten zu gewährleisten.

Gültige Zahlen sind 1 bis 12.

Wenn Sie eine Zahl angeben, beispielsweise 6, beträgt die Breite des Elements 6/12 (50 %) der Bildschirmbreite. Geben Sie beispielsweise 3 an, beträgt die Breite des Elements 3/12 (25 %) der Bildschirmbreite.
Weisen Sie den verschiedenen Layoutoptionen Zahlen zu, um die Breite des Elements für die unterschiedlichen Bildschirmgrößen festzulegen.

| Option | Beschreibung |
|--------|------------------------------------------|
| `xl` | extra große Bildschirme (1536px >= Breite) |
| `md` | mittlere Bildschirme (900px <= Breite < 1200px) |
| `sm` | kleiner Bildschirm (600px <= Breite < 900px) |
| `xs` | winzige Bildschirme (Breite < 600px) |
| `xs` | winzige Bildschirme (Breite < 600px) |

Die folgenden Optionen sind die empfohlenen Voreinstellungen, die für die meisten Fälle geeignet sind.

```json
"xs": 12,
"sm": 12,
"md": 6,
"lg": 4,
"xl": 4,
```

#### Es wird empfohlen, das Layout zu überprüfen.
Das jeweilige Layout sollte für jeden Adapter überprüft werden, um festzustellen, ob das Layout in allen Auflösungen angezeigt und verwendet werden kann.

Dies kann beispielsweise mit den Web Developer Tools getestet werden, die in jeden Chromium-basierten Browser integriert sind.

Schritt 1: Öffnen Sie die Webentwicklertools mit F12

Schritt 2: Öffnen Sie die Geräte-Symbolleiste (1)

Schritt 3: Verschiedene Geräte auswählen (2)

![Bild](../../en/dev/img/webdevtools.png)

In den Einstellungen der Webentwicklertools können Sie bei Bedarf eigene Geräte mit exakten Breiten erstellen.

### Weitere Optionen
| Option | Beschreibung |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | Wenn ein Element kein Attribut `type` besitzt, wird der Standardtyp „Panel“ angenommen. Typ eines Elements. Die aktuell verfügbaren Optionen finden Sie unter [Gemeinsame Steuerelemente:](#common-control-elements) |
| `label` | Zeichenkette oder Objekt wie {en: 'Name', ru: 'Имя'} |
| `hidden` | JS-Funktion, die `native.attribute` für Berechnungen verwenden könnte |
| `hideOnlyControl` | Wenn der Ort ausgeblendet ist, wird er angezeigt, aber es gibt keine Steuerungsmöglichkeiten. |
| `disabled` | JS-Funktion, die `native.attribute` für Berechnungen verwenden könnte |
| `help` | Hilfetext (mehrsprachig) |
| `helpLink` | href to help (could be used only together with `help`) |
| `style` | CSS-Stil in ReactJS-Notation: `radiusBorder` und nicht `radius-border`. |
| `darkStyle` | CSS-Stil für den Dunkelmodus |
| `validator` | JS-Funktion: true - kein Fehler, false - Fehler |
| `validatorErrorText` | Text, der angezeigt wird, wenn die Validierung fehlschlägt |
| `validatorNoSaveOnError` | Speichern-Schaltfläche bei Fehler deaktivieren |
| `tooltip` | optionaler Tooltip |
| `default` | Standardwert |
| `defaultFunc` | JS-Funktion zur Berechnung des Standardwerts |
| `placeholder` | Platzhalter (für Textsteuerung) |
| `noTranslation` | Auswahllisten und andere Optionen nicht übersetzen (nicht für Hilfe, Beschriftung oder Platzhalter) |
| `onChange` | Struktur in Form `{"alsoDependsOn": ["attr1", "attr2"], "calculateFunc": "data.attr1 + data.attr2", "ignoreOwnChanges": true}` |
| `doNotSave` | Dieses Attribut nicht speichern, da es nur für interne Berechnungen verwendet wird |
| `noMultiEdit` | Wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nicht angezeigt, wenn der Benutzer mehr als ein Objekt zur Bearbeitung ausgewählt hat. |
| `expertMode` | Wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nur angezeigt, wenn der Expertenmodus aktiviert ist (ab Admin 7.4.3) |
| `expertMode` | Wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nur angezeigt, wenn der Expertenmodus aktiviert ist (ab Admin 7.4.3) |

### Optionen mit detaillierter Konfiguration
#### `defaultSendTo`
Befehl zum Anfordern eines Anfangswerts von der laufenden Instanz, Beispiel: `"myInstance": {"type": "text", "defaultSendTo": "fill"}`

- `data` - statische Daten
- `jsonData` - statische Daten
- Falls weder `data` noch `jsonData` definiert sind, werden die folgenden Informationen gesendet: `{"attr": "<Attributname>", "value": "<aktueller Wert>"}`
- `button` - Schaltflächenbeschriftung zum erneuten Auslösen der Anfrage von der Instanz
- `buttonTooltip` - Tooltip für Schaltflächen (Standard: `Daten pro Instanz anfordern`)
- `buttonTooltipNoTranslation` - Schaltflächen-Tooltip nicht übersetzen
- `allowSaveWithError` - Ermöglicht das Speichern der Konfiguration auch dann, wenn die Instanz offline ist.

#### `confirm`
- `Bedingung` - JS-Funktion: true Bestätigungsdialog anzeigen
- `text` - Text des Bestätigungsdialogs
- `title` - Titel des Bestätigungsdialogs
- `ok` - Text für die OK-Schaltfläche
- `cancel` - Text für die Schaltfläche "Abbrechen"
- `type` - Einer der folgenden Werte: `info`, `warning`, `error`, `none`
- `alsoDependsOn` - Array mit Attributen, um die Bedingung auch anhand dieser Attribute zu prüfen.

## Autovervollständigung
`Number`, `text`, `checkbox` und `select` unterstützen die automatische Vervollständigung, um die Auswahl von Optionen zu ermöglichen, wenn diese als benutzerdefinierte Einstellungen verwendet werden.
In diesem Fall wird der Wert als Array aller möglichen Werte bereitgestellt.

Beispiel:

```json5
// ...
   "timeout": {
      "type": "number",
      "label": "Timeout"
   }
// ...

"data": {
   "timeout": [1000, 2000, 3000]
}
```

In diesem Fall muss die Eingabe als Text erfolgen, wie im Beispiel `__different__` dargestellt. Zur Vervollständigung stehen drei mögliche Werte zur Verfügung.
Benutzer können aus den Dropdown-Menüs 1000, 2000 oder 3000 auswählen oder einen eigenen Wert eingeben, z. B. 500.

Boolesche Werte müssen den Zustand „unbestimmt“ unterstützen, wenn der Wert [false, true] ist.

Für nicht geänderte `__different__` muss der abweichende Wert zurückgegeben werden:

Eingang:

```json
"data": {
   "timeout": [1000, 2000, 3000]
}
```

Ausgabe, wenn das Timeout nicht geändert wurde:

```json
"newData": {
   "timeout": "__different__"
}
```

Der Wert `__different__` ist reserviert und darf von keinem Texteingabefeld vom Benutzer akzeptiert werden.

Die Komponente muss wie folgt aussehen

```jsx
<SchemaEditor
    style={customStyle}
    className={classes.myClass}
    schema={schema}
    customInstancesEditor={CustomInstancesEditor}
    data={common.native}
    onError={(error, attribute) => {/* error can be true/false or text. Attribute is optional */}}
    onChanged={(newData, isChanged) => console.log('Changed ' + isChanged)}
/>
```

Wird kein Schema angegeben, muss das Schema automatisch aus den Daten erstellt werden.

- `boolean` => Kontrollkästchen
- `text` => Texteingabe
- `number` => number
- name `bind` => ip
- Name `Port` => Nummer, min=1, max=0xFFFF
- name `timeout` => number, help="ms"

## Todo
Die folgenden Kapitel stammen aus der Originaldatei SCHEMA.MD.
Ich habe den Inhalt nicht im Detail verstanden und er musste von Bluefox überarbeitet werden.

## JS-Funktionen
### Konfigurationsdialog
Die JS-Funktion lautet:

```js
const myValidator = "_alive === true && data.options.myType == 2";

const func = new Function(
  'data',          // actual obj.native or obj.common.custom['adapter.X'] object
                   // If table, so data is current line in the table
  'originalData',  // data before changes
  '_system',       // system config => 'system.config'=>common
  '_alive',        // If instance is alive
  '_common',       // common part of instance = 'system.config.ADAPTER.X' => common
  '_socket',       // socket connection
  '_instance',     // instance number
  'arrayIndex',    // filled only by table and represents the row index
  'globalData',    // filled only by table and represents the obj.native or obj.common.custom['adapter.X'] object
  '_changed',      // indicator if some data was changed and must be saved
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data, systemConfig.common, instanceAlive, adapter.common, this.props.socket);
```

Ändert sich der Status `alive`, müssen alle Felder erneut aktualisiert, validiert, deaktiviert oder ausgeblendet werden.

Folgende Variablen stehen in der JS-Funktion in den Adaptereinstellungen zur Verfügung:

- `data` - native Einstellungen für diese Instanz oder die aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `_system` - Systemkonfiguration
- `_alive` - bedeutet, dass die Instanz lebt
- `_common` - Allgemeine Einstellungen für diese Instanz
- `_socket` - Socket
- `_instance` - Instanznummer
- `arrayIndex` - wird nur in Tabellen verwendet und repräsentiert die aktuelle Zeile in einem Array
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur in einer einzelnen Tabellenzeile

### Dialog für benutzerdefinierte Einstellungen
Die JS-Funktion lautet:

```js
const myValidator =
  "customObj.common.type === 'boolean' && data.options.myType == 2";

const func = new Function(
  "data",
  "originalData",
  "_system",
  "instanceObj",
  "customObj",
  "_socket",
  arrayIndex,
  myValidator.includes("return") ? myValidator : "return " + myValidator
); // e.g. "_alive === true"

const isValid = func(
  data || this.props.data,
  this.props.originalData,
  this.props.systemConfig,
  instanceObj,
  customObj,
  this.props.socket
);
```

Folgende Variablen stehen in der JS-Funktion in den benutzerdefinierten Einstellungen zur Verfügung:

- `data` - aktuelle benutzerdefinierte Einstellungen oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `originalData` - Unveränderte Daten
- `_system` - Systemkonfiguration
- `instanceObj` - Adapterinstanzobjekt
- `customObj` - das aktuelle Objekt selbst
- `_socket` - Socket
- `arrayIndex` - wird nur in Tabellen verwendet und repräsentiert die aktuelle Zeile in einem Array
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur in einer einzelnen Tabellenzeile

## Benutzerdefinierte Komponente
```jsx
<CustomInstancesEditor
    common={common.data}
    alive={isInstanceAlive}
    data={data}
    socket={this.props.socket}
    themeName={this.props.themeName}
    themeType={this.props.themeType}
    theme={this.props.theme}
    name="accessAllowedConfigs"
    onChange={(newData, isChanged) => {}}
    onError={error => /* error can be true/false or text */ {}}
/>
```

Beispiele finden Sie im [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) Adapter.

## JSON-Registerkarte im Adminbereich
Ab der Admin-Version 7.6.x können Sie die Registerkarte (z. B. `backitup` oder `matter`) über die JSON-Konfiguration definieren.

Dazu müssen Sie in `io-package.json` im folgenden Teil von `common` definieren:

```json5
{
   "common": {
      // ....
      "adminTab": {
         "link": "jsonTab.json", // the name could be any, but only ends with `.json` or `.json5`
         // all following parameters are optional
         "icon": "AABBCC", // base64 icon. If not provided, the adapter icon will be taken
         "name": "TabName", // String or multi-language object for menu label
         "singleton": true, // Tab will not have an instance number and for all instances will exist only one menu item.
         "order": 10, // Order in admin tab (0 is disabled, 1 - first after static menu items, 200 is last)
      },
      // ....
   }
}
```

Die Datei `jsonTab.json5` könnte beispielsweise so aussehen:

```json5 
{
   "i18n": "tabI18n", // folder name in admin, where the translations are stored (relative to "admin" folder)
   "command": "tab", // If defined, the tab will send a message by initializing to backend with command "tab" (string contained in "sendTo")
   "items": {
      "memHeapTotal": {
         // This will show "system.adapter.admin.0.memHeapTotal" value
         "type": "state",
         "label": "Memory",
         "sm": 12,
         "system": true,
         "oid": "memHeapTotal"
      },
      "infoConnected": {
         // This will show "admin.0.info.connected" value
         "newLine": true,
         "type": "state",
         "label": "Info about connected socket clients",
         "sm": 12,
         "oid": "info.connected"
      },
      "dayTime": {
         // This will show "javascript.0.variables.dayTime" value
         "newLine": true,
         "type": "state",
         "label": "Aktuelle Zeit",
         "sm": 12,
         "foreign": true,
         "oid": "javascript.0.variables.dayTime"
      },
      "value": {
         // This will show "data.value" value from "sendTo" answer
         "newLine": true,
         "type": "text",
         "readOnly": "true",
         "label": "Value from sendTo answer",
         "sm": 12,
      }
   }
}
```

Wird `sendTo` angegeben, empfängt die Instanz eine Nachricht (`common.messagebox` muss in `io-package.json` wahr sein) mit dem Befehl `tab` oder, falls es sich um einen String handelt, mit einem in `sendTo` gespeicherten Wert.

Die Instanz muss mit folgender Struktur antworten:

```typescript
onMessage = (obj: ioBroker.Message): void => {
    if (obj?.command === 'tab' && obj.callback) {
        // if not instance message
        this.sendTo(obj.from, obj.command, { data: { value: 5 } }, obj.callback);
    }
};
```

## Schemafehler melden
Erstellen Sie hier ein Problem: https://github.com/ioBroker/ioBroker.admin/issues

## Für den Maintainer
Um den Speicherort des JsonConfig-Schemas zu aktualisieren, erstellen Sie einen Pull Request für diese Datei: https://github.com/ioBroker/ioBroker.admin/blob/master/packages/jsonConfig/schemas/jsonConfig.json

## Für Entwickler
Das Schema wird hier verwendet: https://github.com/SchemaStore/schemastore/blob/6da29cd9d7cc240fb4980625f0de6cf7bd8dfd06/src/api/json/catalog.json#L3214

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 8.0.6 (2025-11-10)
- (@GermanBluefox) Added width to many table elements

### 8.0.5 (2025-10-25)
- (@GermanBluefox) Do not translate certificates names
- (@GermanBluefox) Update packages

### 8.0.3 (2025-10-23)
- (@GermanBluefox) Do not translate certificates names

### 8.0.2 (2025-10-23)
- (@GermanBluefox) Renamed gui-components to adapter-react-v5

### 8.0.1 (2025-10-23)
- (@GermanBluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2019-2025 @GermanBluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.