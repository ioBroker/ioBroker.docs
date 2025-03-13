---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterjsonconfig.md
title: ioBroker JSON-Konfiguration: Ein Leitfaden für Anfänger
hash: xL7q6XcyWeDcHMJ0bSGlZNdYikKq3qweBUMNycFZWQA=
---
# IoBroker JSON-Konfiguration: Ein Leitfaden für Anfänger
Diese Anleitung erklärt, wie Sie Konfigurationsoptionen für Ihren ioBroker-Adapter mithilfe von JSON definieren. Dieser Ansatz bietet eine benutzerfreundlichere und flexiblere Möglichkeit, Adaptereinstellungen innerhalb der ioBroker-Admin-Oberfläche zu verwalten.

## Was Sie brauchen
- ioBroker Admin Version 6 (oder neuer)
- Grundlegendes Verständnis der JSON-Syntax

## Vorteile der JSON-Konfiguration
- Verbesserte Benutzererfahrung beim Konfigurieren von Adaptern
- Einfachere Integration komplexer Konfigurationsoptionen
- Klare Trennung zwischen Adaptercode und Konfiguration

## Erste Schritte
1. **Definieren Sie die Konfigurationsdatei:**

- Erstellen Sie eine Datei mit dem Namen „jsonConfig.json“ oder „jsonConfig.json5“ im Administratorverzeichnis Ihres Adapters.
- JSON5 ist eine Obermenge von JSON, die Kommentare zulässt, wodurch die Konfigurationsdatei lesbarer wird.

2. **JSON-Konfiguration aktivieren:**

– Fügen Sie in der Datei „io-package.json“ Ihres Adapters unter dem Abschnitt „common“ die folgende Zeile hinzu:

```json
"common": {
    "adminUI": {
        "config": "json"
    }
}
```

3. **Struktur der Konfigurationsdatei:**

Die Konfigurationsdatei definiert eine hierarchische Struktur aus Registerkarten, Bedienfeldern und Steuerelementen. \ Jedes Element verfügt über bestimmte Attribute, die sein Verhalten und seine Darstellung in der Administratoroberfläche bestimmen.

jsonConfig sorgt automatisch dafür, dass die gesammelten Daten als Konfigurationsdaten für den Adapter erfasst und intern gespeichert werden, um sie dort abrufen und weiterverarbeiten zu können.

Das folgende Beispiel würde das folgende Konfigurationsobjekt erstellen:

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

_Wenn der Attributname mit "\_" beginnt, wird er nicht im Objekt gespeichert._

## Beispiel einer jsonConfig mit mehreren Registerkarten
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

Weitere Beispiele finden sich in vielen weiteren Adaptern auf GitHub im jeweiligen Admin-Verzeichnis.

## Unterstützung bei der Entwicklung von Tools
### VS Code
Um die Validierung der jsonConfig in VS Code zu ermöglichen, muss der Datei „.vscode/settings.json“ folgender Abschnitt hinzugefügt werden.

```json5
    "json.schemas": [
        {
            "fileMatch": ["admin/jsonConfig.json", "admin/jsonCustom.json", "admin/jsonTab.json"],
            "url": "https://raw.githubusercontent.com/ioBroker/adapter-react-v5/main/schemas/jsonConfig.json"
        }
    ]
```

## Gemeinsame Bedienelemente
Eine jsonConfig besteht aus mehreren Elementen, die hierarchisch strukturiert sind. \ Jedes der Elemente kann einem der folgenden Typen angehören.\ Einige Elemente können zusätzliche untergeordnete Elemente enthalten.

Sie können fast alle Komponenten in Aktion sehen, wenn Sie diesen Adapter testen: [jsonconfig-demo](https://github.com/mcm4iob/ioBroker.jsonconfig-demo).\ Sie können ihn über das GitHub-Symbol im Admin installieren, indem Sie `iobroker.jsonconfig-demo` auf der Registerkarte „npm“ eingeben.

- [**`accordion`:**](#accordion) Akkordeon-Element für zusammenklappbare Inhalte (Admin 6.6.0 oder neuer)
- [**`alive`:**](#alive) Zeigt an, ob eine Instanz läuft (schreibgeschützt)
- [**`autocomplete`:**](#autocomplete) Eingabefeld mit Autocomplete-Vorschlägen
- [**`autocompleteSendTo`:**](#autocompletesendto) Autocomplete-Steuerelement mit Instanzwerten zum Senden von Daten
- [**`certificate`:**](#certificate) Verwaltet Zertifikate für sichere Verbindungen
- [**`certificateCollection`:**](#certificatecollection) Wählt eine Sammlung für Let’s Encrypt-Zertifikate aus
- [**`certificates`:**](#certificates) Universeller Typ zur Verwaltung unterschiedlicher Zertifikatstypen (ab Admin 6.4.0)
- [**`checkbox`:**](#checkbox) Kontrollkästchen für boolesche Werte
- [**`checkLicense`:**](#checklicense) Ganz spezielle Komponente zur Online-Überprüfung der Lizenz
- [**`chips`:**](#chips) Der Benutzer kann Wörter eingeben, die zu einem Array hinzugefügt werden
- [**`color`:**](#color) Farbauswahl
- [**`cron`:**](#cron) Konfiguriert Cron-Ausdrücke für die Planung von Aufgaben
- [**`custom`:**](#custom) Integriert benutzerdefinierte Komponenten für bestimmte Funktionen (nur Admin 6)
- [**`datePicker`:**](#datepicker) Ermöglicht Benutzern die Auswahl eines Datums
- [**`deviceManager`:**](#devicemanager) Gerätemanager anzeigen
- [**`divider`:**](#divider) Erstellt einen horizontalen Zeilentrenner
- [**`file`:**](#file) Eingabefeld mit Dateiauswahl und optionalen Upload-/Download-Funktionen (nur Admin 6)
- [**`fileSelector`:**](#fileselector) Ermöglicht Benutzern, Dateien aus dem System auszuwählen (nur Admin6)
- [**`func`:**](#func) Wählt eine Funktion aus der Liste enum.func aus (nur Admin 6)
- [**`header`:**](#header) Erstellt eine Überschrift mit unterschiedlichen Größen (h1-h5)
- [**`image`:**](#image) Lädt ein Bild hoch oder zeigt es an
- [**`imageSendTo`:**](#imagesendto) Zeigt ein vom Backend empfangenes Bild an und sendet Daten basierend auf einem Befehl
- [**`instance`:**](#instance) Wählt eine Adapterinstanz aus
- [**`interface`:**](#interface) Wählt die Schnittstelle des Hosts aus, auf dem die Instanz ausgeführt wird
- [**`ip`:**](#ip) Eingabefeld für IP-Adressen mit erweiterten Optionen
- [**`jsonEditor`:**](#jsoneditor) JSON-Editor für komplexe Konfigurationsdaten
- [**`language`:**](#language) Wählt die Sprache der Benutzeroberfläche
- [**`license`:**](#license) zeigt die Lizenzinformationen an, sofern sie nicht bereits akzeptiert wurden.
- [**`number`:**](#number) Numerisches Eingabefeld mit Min-/Max-Werten und Schrittweite
- [**`objectId`:**](#objectid) Wählt eine Objekt-ID mit Name, Farbe und Symbol aus
- [**`panel`:**](#panel) Registerkarte mit Elementen
- [**`password`:**](#password) Passwort-Eingabefeld
- [**`Muster`:**](#Muster) Schreibgeschütztes Feld, das ein Muster anzeigt (z. B. URL)
- [**`port`:**](#port) Spezielle Eingabe für Ports
- [**`qrCode`:**](#qrcode) Zeigt Daten als QR-Code an (Admin 7.0.18 oder neuer)
- [**`room`:**](#room) Wählt einen Raum aus der Liste `enum.room` aus (nur Admin 6)
- [**`select`:**](#select) Dropdown-Menü mit vordefinierten Optionen
- [**`selectSendTo`:**](#selectsendto) Dropdown-Menü mit Instanzwerten zum Senden von Daten
- [**`sendTo`:**](#sendto) Schaltfläche, die eine Anfrage an eine Instanz sendet
- [**`setState`:**](#setstate) Schaltfläche, die den Status einer Instanz festlegt
- [**`slider`:**](#slider) Schieberegler zum Auswählen eines Wertes innerhalb eines Bereichs (nur Admin 6)
- [**`state`:**](#state) Steuerung oder Informationen vom Status anzeigen (Admin >= 7.1.0)
- [**`staticImage`:**](#staticimage) Zeigt ein statisches Bild an
- [**`staticInfo`:**](#staticinfo) Zeigt statische Informationen in vorformatierter Form an, wie z. B. „Titel: Werteinheit“ (Admin >= 7.3.3)
- [**`staticLink`:**](#staticlink) Erstellt einen statischen Link
- [**`staticText`:**](#statictext) Zeigt statischen Text an (z. B. Beschreibung)
- [**`Koordinaten`:**](#Koordinaten) Ermittelt den aktuellen Standort und verwendet die `system.config`-Koordinaten, falls dies nicht in der Form "Breitengrad,Längengrad" möglich ist.
- [**`table`:**](#table) Tabelle mit Zeilen, die hinzugefügt, gelöscht oder neu angeordnet werden können
- [**`tabs`:**](#tabs) Registerkarten mit Elementen
- [**`text`:**](#text) Ein- oder mehrzeiliges Texteingabefeld
- [**`textSendTo`:**](#textsendto) Zeigt das schreibgeschützte Steuerelement mit den von der Instanz angegebenen Werten an.
- [**`timePicker`:**](#timepicker) Ermöglicht Benutzern die Auswahl einer Zeit
- [**`user`:**](#user) Wählt einen Benutzer aus der Liste `system.user` aus
- [**`uuid`:**](#uuid) Iobroker-UUID anzeigen

Durch die Nutzung der JSON-Konfiguration können Sie eine benutzerfreundliche und anpassbare Konfigurationserfahrung für Ihren ioBroker-Adapter erstellen.

## Beispielprojekte
| Typ | Link |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mehrere Registerkarten: | [`ioBroker.admin`](https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5) |
| Benutzerdefinierte Komponente: | [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| Benutzerdefinierte Komponente: | [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| Validierung: | |

## Trennung der großen Konfigurationen
## Enthält
Erfordert Admin 6.17.1 oder neuer.

Um komplexe JSON-Dateien zu schreiben, können Sie andere JSON-Dateien einbinden.
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

Um die Übersetzungsfunktion zu aktivieren, müssen Sie die i18n-Eigenschaft auf der obersten Ebene des JSON-Konfigurationsobjekts angeben und aktivieren.

```json5
{
  i18n: true,
}
```

### Übersetzung in getrennten Dateien: kompatibel mit Weblate
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

Darüber hinaus kann der Benutzer den Pfad zu `i18n`-Dateien, `i18n`: `customI18n` angeben und Dateien im Admin bereitstellen:

```json5
  i18n: "customI18n",
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

Der Aufbau einer Datei entspricht folgender Struktur

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

Bei der Suche nach einer Übersetzung werden die Informationen im entsprechenden Feld verwendet, um die Eigenschaft mit dem Text in den Dateien zu finden. Wird die Eigenschaft nicht gefunden, bleiben die Informationen aus dem Feld erhalten. Es wird empfohlen, den Text auf Englisch einzugeben.

### Geben Sie die Übersetzung direkt in die Felder ein
Übersetzungen können in allen Feldern angegeben werden, die Text enthalten können. Beispiele für Felder sind Beschriftung, Titel, Tooltip, Text usw.

```json5
   "type": "text",
   "label: {
        "en": "house",
        "de": "Haus"
    }
}
```

### Stellen Sie die Übersetzung direkt in der i18n bereit
Die Übersetzungen können auch direkt als Objekt im Attribut `i18n` auf der obersten Ebene des Objekts `jsonConfig` bereitgestellt werden.

Bei der Suche nach einer Übersetzung werden die Informationen im entsprechenden Feld verwendet, um die Eigenschaft mit dem Text im i18n-Objekt zu finden.

Wird die Eigenschaft nicht gefunden, bleiben die Informationen aus dem Feld erhalten.

Es wird empfohlen, den Text auf Englisch einzugeben.

## Elementtypen
Jedes Element kann [gemeinsame Attribute](#common-attributes-of-controls) und die zum jeweiligen Typ gehörenden speziellen Attribute wie folgt haben

### `tabs`
Registerkarten mit Elementen

| Immobilie | Beschreibung |
|-----------------|------------------------------------------------------------------------------------------------|
| `items` | Objekt mit Paneelen `{"tab1": {}, "tab2": {}...}` |
| `tabsStyle` | CSS-Stile im React-Format (`marginLeft` und nicht `margin-left`) für die Mui-Tabs-Komponente |
| `tabsStyle` | CSS-Stile im React-Format („marginLeft“ und nicht „margin-left“) für die Mui-Tabs-Komponente |

### `panel`
Registerkarte mit Elementen

| Immobilie | Beschreibung |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `icon` | Registerkarte kann Symbole (Base64 wie `data:image/svg+xml;base64,...`) oder `jpg/png` Bilder enthalten (endet mit `.png`) |
| `items` | Objekt `{"attr1": {}, "attr2": {}}...` |
| `collapsable` | nur möglich, da nicht Teil von Tabs[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json) |
| `color` | Farbe der einklappbaren Kopfzeile `primary` oder `secondary` oder nichts |
| `innerStyle` | CSS-Stile für das innere Div im React-Format (`marginLeft` und nicht `margin-left`) für die Panel-Komponente. Wird nicht für einklappbare Panels verwendet. |
| `innerStyle` | CSS-Stile für das innere Div im React-Format („marginLeft“ und nicht „margin-left“) für die Panel-Komponente. Wird nicht für einklappbare Panels verwendet. |

### `text`
Textkomponente

| Immobilie | Beschreibung |
|-------------------|--------------------------------------------------------------------------------------------------------|
| `maxLength` | maximale Länge des Textes im Feld |
| `copyToClipboard` | Schaltfläche „In die Zwischenablage kopieren“ anzeigen, aber nur, wenn deaktiviert oder schreibgeschützt ist |
| `trim` | Standard ist „true“. Setzen Sie dieses Attribut auf `false`, wenn kein Trimmen gewünscht ist. |
| `minRows` | Standard ist 1. Setzen Sie dieses Attribut auf `2` oder höher, wenn Sie einen Textbereich mit mehr als einer Zeile haben möchten. |
| `maxRows` | Maximale Zeilenanzahl im Textbereich. Wird nur verwendet, wenn `minRows` > 1. |
| `noClearButton` | wenn wahr, wird die Schaltfläche „Löschen“ nicht angezeigt (Admin >= 6.17.13) |
| `validateJson` | wenn wahr, wird der Text als JSON validiert |
| `allowEmpty` | wenn wahr, wird das JSON nur validiert, wenn der Wert nicht leer ist |
| `time` | der Wert ist die Zeit in ms oder eine Zeichenfolge. Wird nur mit dem Flag „readOnly“ verwendet |
| `Zeit` | der Wert ist die Zeit in ms oder eine Zeichenfolge. Wird nur mit dem Flag readOnly verwendet |

### `number`
| Eigenschaft | Beschreibung | Bemerkung |
|----------|---------------|----------------|
| `min` | Minimalwert | |
| `step` | Schritt | |
| `unit` | Einheit | Admin >= 7.4.9 |
| `Einheit` | Einheit | Admin >= 7.4.9 |

### `color`
Farbwähler

| Immobilie | Beschreibung |
|-----------------|----------------------------------------------------------------|
| `noClearButton` | wenn wahr, wird die Schaltfläche „Löschen“ nicht angezeigt (Admin >= 6.17.13) |

### `checkbox`
Kontrollkästchen anzeigen

### `slider`
Slider anzeigen (nur Admin6)

| Immobilie | Beschreibung |
| -------- | ----------------------------- |
| `min` | (Standard 0) |
| `step` | (Standard `(max - min) / 100`) |
| `unit` | Einheit des Schiebereglers |
| `Einheit` | Einheit des Schiebereglers |

### `qrCode`
Daten in einem QR-Code anzeigen (Admin >= 7.0.18)

| Immobilie | Beschreibung |
| --------- | ------------------------------------- |
| `data` | die im QR-Code zu kodierenden Daten |
| `fgColor` | Vordergrundfarbe |
| `bgColor` | Hintergrundfarbe |
| `level` | QR-Code-Ebene (`L` `M` `Q` `H`) |
| `Ebene` | QR-Code-Ebene (`L` `M` `Q` `H`) |

### `ip`
Bind-Adresse

| Immobilie | Beschreibung |
|--------------------|-----------------------------------|
| `listenOnAllPorts` | 0.0.0.0 zur Option hinzufügen |
| `onlyIp6` | nur IP6-Adressen anzeigen |
| `noInternal` | interne IP-Adressen nicht anzeigen |
| `noInternal` | interne IP-Adressen nicht anzeigen |

### `user`
Benutzer aus system.user auswählen. (Mit Farbe und Symbol)

| Immobilie | Beschreibung |
|----------|-----------------|
| `short` | kein Systembenutzer. |

### `room`
Raum auswählen aus `enum.room` (Mit Farbe und Symbol) - (nur Admin6)

| Immobilie | Beschreibung |
|-------------------|--------------------------|
| `short` | nein `enum.rooms.` |
| `allowDeactivate` | erlaubt das Leerlassen von Räumen |

### `func`
Funktion auswählen aus `enum.func` (Mit Farbe und Symbol) - (nur Admin6)

| Immobilie | Beschreibung |
|-------------------|-----------------------------------|
| `short` | nein `enum.func.` |
| `allowDeactivate` | erlaubt das Leeren der Funktionalität |

### `select`
| Immobilie | Beschreibung |
|-----------|-------------------------------------------------------------------------|
| `options` | Objekt mit Beschriftungen, optionalen Übersetzungen, optionaler Gruppierung und Werten |

#### Beispiel für `select options`
```json
[
  {"label": {"en": "option 1"}, "value": 1}, ...
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
| Immobilie | Beschreibung |
|------------|---------------------------------------------------------------------------------------------------------------|
| `options` | `["value1", "value2", ...]` oder `[{"value": "value", "label": "Value1"}, "value2", ...]` (Schlüssel müssen eindeutig sein) |
| `freeSolo` | Setzen Sie `freeSolo` auf `true`, damit das Textfeld einen beliebigen Wert enthalten kann. |

### `image`
speichert das Bild als Datei des `adapter.X` Objekts oder als Base64 im Attribut

| Immobilie | Beschreibung |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `filename` | Der Dateiname ist der Strukturname. Im folgenden Beispiel ist `login-bg.png` der Dateiname für `writeFile("myAdapter.INSTANCE", "login-bg.png")` |
| `maxSize` | maximale Größe der hochzuladenden Datei |
| `base64` | wenn wahr, wird das Bild als Daten-URL im Attribut gespeichert, andernfalls als Binärdatei im Dateispeicher |
| `crop` | wenn wahr, Benutzer darf das Bild zuschneiden |
| `!maxWidth` |                                                                                                                                        |
| `!maxHeight` |                                                                                                                                        |
| `!square` | Breite muss gleich Höhe sein, oder beim Zuschneiden darf nur ein Quadrat als Form zulässig sein |
| `!square` | Breite muss gleich Höhe sein, oder der Zuschnitt darf nur Quadrate als Form zulassen |

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

### `objectId`
Objekt-ID: mit Name, Farbe und Symbol anzeigen

| Immobilie | Beschreibung |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `types` | Gewünschter Typ: `channel`, `device`, ... (hat standardmäßig nur `state`). Es ist Plural, da `type` bereits belegt ist. |
| `customFilter` | [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es handelt sich um ein Objekt und nicht um einen JSON-String. |
| `filterFunc` | [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es handelt sich um eine Funktion, die für jedes Objekt aufgerufen wird und „true“ oder „false“ zurückgeben muss. Beispiel: `obj.common.type === 'number'` |
| `filterFunc` | [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es handelt sich um eine Funktion, die für jedes Objekt aufgerufen wird und true oder false zurückgeben muss. Beispiel: `obj.common.type === 'number'` |

#### Beispiele für `customFilter`
##### Zeige nur Objekte mit einigen benutzerdefinierten Einstellungen
`{common: {custom: true}}`

##### Zeige nur Objekte mit benutzerdefinierten SQL.0-Einstellungen (nur der spezifischen Instanz)
`{common: {custom: 'sql.0'}}`

##### Zeige nur Objekte der Adapter `influxdb` oder `sql` oder `history`
`{common: {custom: '_dataSources'}}`

##### Zeige nur Objekte mit benutzerdefinierten Einstellungen für einen bestimmten Adapter (alle Instanzen)
`{common: {custom: 'adapterName.'}}`

##### Nur Kanäle anzeigen
`{type: 'channel'}`

##### Nur Kanäle und Geräte anzeigen
`{type: ['channel', 'device']}`

##### Zeige nur Zustände vom Typ „Zahl“
`{common: {type: 'number'}`

##### Zeige nur Zustände vom Typ „Zahl“ und „Zeichenfolge“
`{common: {type: ['number', 'string']}`

##### Zeige nur Zustände mit Rollen ab Switch
`{common: {role: 'switch'}`

##### Zeige nur Staaten mit Rollen ab `switch` und `button`
`{common: {role: ['switch', 'button']}`

### `password`
Dieser Feldtyp wirkt sich nur auf die Benutzeroberfläche aus.
Passwörter und andere sensible Daten sollten verschlüsselt gespeichert werden! Dazu muss der Schlüssel in der io-package.json unter [nativeEncrypted](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) angegeben werden.
Zusätzlich können Sie verhindern, dass diese Eigenschaft an andere Adapter als `admin` und `cloud` übermittelt wird, indem Sie sie in der Datei `io-package.json` zu `protectedNative` hinzufügen.

| Immobilie | Beschreibung |
|-------------|---------------------------------------------------------------------------------------------------------|
| `repeat` | Passwortwiederholung muss mit Passwort verglichen werden |
| `readOnly` | das Nur-Lese-Flag. Visible ist automatisch wahr, wenn readOnly wahr ist |
| `maxLength` | maximale Länge des Textes im Feld |
| `maxLength` | maximale Länge des Textes im Feld |

### `instance`
| Immobilie | Beschreibung |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `adapter` | Name des Adapters. Mit dem speziellen Namen `_dataSources` können Sie alle Adapter mit dem Flag `common.getHistory` abrufen. |
| `allowDeactivate` | wenn wahr. Zusätzliche Option "Deaktivieren" wird angezeigt |
| `onlyEnabled` | wenn wahr. Es werden nur aktivierte Instanzen angezeigt |
| `long` | Wert sieht aus wie `system.adapter.ADAPTER.0` und nicht wie `ADAPTER.0` |
| `short` | Wert sieht aus wie `0` und nicht wie `ADAPTER.0` |
| `all` | Zu den Optionen die Option „alle“ mit dem Wert `*` hinzufügen |
| `alle` | Fügen Sie den Optionen die Option „alle“ mit dem Wert `*` hinzu |

### `chips`
Der Benutzer kann das Wort eingeben und es wird hinzugefügt (siehe Cloud => Dienste => Whitelist). Die Ausgabe ist ein Array, wenn kein `delimiter` definiert ist.

| Immobilie | Beschreibung |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `delimiter` | wenn definiert, wird die Option als String mit Trennzeichen statt als Array gespeichert. Beispielsweise erhalten Sie durch `delimiter=;` `a;b;c` statt `['a', 'b', 'c']` |

### `alive`
nur eine Anzeige, ob die Instanz aktiv ist und in den Modi „versteckt“ und „deaktiviert“ verwendet werden kann (wird nicht in der Konfiguration gespeichert)

Nur Text: Instanz läuft, Instanz läuft nicht

| Immobilie | Beschreibung |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `instance` | Prüft, ob die Instanz aktiv ist. Falls nicht definiert, wird die aktuelle Instanz verwendet. Sie können das Muster `${data.number}` im Text verwenden. |
| `textNotAlive` | Der Standardtext ist `Instance %s is not alive`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in i18n-Dateien vorhanden sein |
| `textNotAlive` | Der Standardtext lautet `Instanz %s ist nicht aktiv`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in i18n-Dateien vorhanden sein |

### `pattern`
schreibgeschütztes Feld mit Muster wie „https://${data.ip}:${data.port}“ (wird nicht in der Konfiguration gespeichert) Texteingabe mit der schreibgeschützten Flagge, die ein Muster anzeigt.

| Immobilie | Beschreibung |
|-------------------|-----------------------|
| `copyToClipboard` | wenn wahr - Schaltfläche anzeigen |
| `Muster` | mein Muster |

### `sendTo`
Schaltfläche, die eine Anfrage an die Instanz sendet (<https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128>)

| Immobilie | Beschreibung |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | (Standard `send`) |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. |
| `result` | `{result1: {en: 'A'}, result2: {en: 'B'}}` |
| `error` | `{error1: {en: 'E'}, error2: {en: 'E2'}}` |
| `variant` | `contained`, `outlined` oder nichts |
| `openUrl` | wenn wahr – URL in neuem Tab öffnen, wenn die Antwort das Attribut `openUrl` enthält, wie `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank", "saveConfig": true}`. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern. |
| `reloadBrowser` | wenn wahr – aktuelles Browserfenster neu laden, wenn die Antwort das Attribut `reloadBrowser` enthält, wie `{"reloadBrowser": true}`. |
| `window` | wenn `openUrl` wahr ist, ist dies der Name des neuen Fensters. Kann überschrieben werden, wenn die Antwort aus dem Attribut `window` besteht. `this.props.socket.sendTo(adapterName.instance, command \|\| 'send', data, result => {});` |
| `icon` | wenn Symbol angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`. Sie können `base64`-Symbole (wie `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Bei Bedarf weitere Symbole per Problem anfordern.) |
| `useNative` | Wenn der Adapter ein Ergebnis mit dem Attribut `native` zurückgibt, wird dieses für die Konfiguration verwendet. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern. |
| `showProcess` | Spinner anzeigen, während die Anfrage läuft |
| `timeout` | Timeout für Anfrage in ms. Standard: keine. |
| `onLoaded` | führe die Schaltflächenlogik zunächst einmal aus |
| `onLoaded` | führe die Schaltflächenlogik zunächst einmal aus |

### `setState`
Schaltfläche zum Festlegen des Instanzstatus

| Immobilie | Beschreibung |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `id` | `system.adapter.myAdapter.%INSTANCE%.test`, Sie können den Platzhalter `%INSTANCE%` verwenden, um ihn durch den aktuellen Instanznamen zu ersetzen |
| `val` | `${data.myText}\_test` oder Nummer. Der Typ wird automatisch anhand des Statustyps erkannt und die Konvertierung wird ebenfalls durchgeführt. |
| `okText` | Alarm, der durch Drücken der Taste angezeigt wird |
| `variant` | `contained`, `outlined`, '' |
| `Variante` | `enthalten`, `umrissen`, '' |

### `staticText`
statischer Text wie Beschreibung

| Immobilie | Beschreibung |
|----------|---------------------|
| `label` | mehrsprachiger Text |
| `Text` | dasselbe wie Bezeichnung |

### `staticLink`
| Immobilie | Beschreibung |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `label` | mehrsprachiger Text |
| `target` | `_blank` oder `_self` oder Fenstername |
| `close` | wenn wahr, wird die GUI geschlossen (wird nicht für JsonConfig im Admin verwendet, sondern für die dynamische GUI) |
| `button` | Link als Schaltfläche anzeigen |
| `variant` | Art der Schaltfläche (`outlined`, `contained`, `text`) |
| `color` | Farbe der Schaltfläche (z. B. `primary`) |
| `icon` | wenn Symbol angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`, `book`, `help`, `upload`. Sie können `base64`-Symbole (beginnt mit `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Wenn Sie weitere Symbole benötigen, fordern Sie diese per Problem an.) |
| `icon` | Wenn Icons angezeigt werden sollen: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`, `book`, `help`, `upload`. Sie können `base64`-Icons (beginnend mit `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Bei Bedarf weitere Icons per Issue anfordern.) |

### `staticImage`
| Immobilie | Beschreibung |
|----------|----------------------------------------|
| `href` | optionaler HTTP-Link |
| `src` | Name des Bildes (aus dem Admin-Verzeichnis) |

### `table`
Tabelle mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können

| Immobilie | Beschreibung |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "width": px or %, "title": {"en": "header"}, "attr": "name", "filter": false, "sort": true, "default": ""}]` |
| `objKeyName` | (alte Einstellung, nicht verwenden!) – Name des Schlüssels in `{"192.168.1.1": {delay: 1000, enabled: true}, "192.168.1.2": {delay: 2000, enabled: false}}` |
| `objValueName` | (alte Einstellung, nicht verwenden!) – Name des Werts in `{"192.168.1.1": "value1", "192.168.1.2": "value2"}` |
| `allowAddByFilter` | wenn Hinzufügen erlaubt ist, auch wenn Filter gesetzt ist |
| `showSecondAddAt` | Anzahl der Zeilen, ab denen der zweite Hinzufügen-Button am unteren Tabellenende angezeigt wird. Standard 5 |
| `showFirstAddOnTop` | Erste Plus-Schaltfläche oben in der ersten Spalte anzeigen und nicht links. |
| `clone` | [optional] – ob die Schaltfläche „Klonen“ angezeigt werden soll. Wenn „true“, wird die Schaltfläche „Klonen“ angezeigt. Wenn der Attributname angegeben ist, ist dieser Name eindeutig. |
| `export` | [optional] – ob die Schaltfläche „Exportieren“ angezeigt werden soll. Als CSV-Datei exportieren. |
| `import` | [optional] – ob die Schaltfläche „Importieren“ angezeigt werden soll. Importieren aus einer CSV-Datei. |
| `uniqueColumns` | [optional] – Geben Sie ein Array von Spalten an, die eindeutige Einträge haben müssen |
| `encryptedAttributes` | [optional] – Geben Sie ein Array von Spalten an, die verschlüsselt werden sollen |
| `compact` | [optional] – wenn wahr, wird die Tabelle im kompakten Modus angezeigt |
| `compact` | [optional] – wenn wahr, wird die Tabelle im kompakten Modus angezeigt |

### `accordion`
Akkordeon mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können (Admin 6.6.0 und neuer)

| Immobilie | Beschreibung |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "attr": "name", "default": ""}]` Elemente können wie auf einem `panel` (xs, sm, md, lg und newLine) platziert werden |
| `noDelete` | Boolescher Wert, wenn Löschen oder Hinzufügen deaktiviert ist. Wenn `noDelete` falsch ist, sollten Hinzufügen, Löschen und Hoch-/Runterverschieben funktionieren. |
| `clone` | [optional] – ob die Schaltfläche „Klonen“ angezeigt werden soll. Wenn „true“, wird die Schaltfläche „Klonen“ angezeigt. Wenn der Attributname angegeben ist, ist dieser Name eindeutig. |
| `clone` | [optional] – ob die Schaltfläche „Klonen“ angezeigt werden soll. Wenn „true“, wird die Schaltfläche „Klonen“ angezeigt. Wenn der Attributname angegeben ist, ist dieser Name eindeutig. |

### `jsonEditor`
Schaltfläche zum Öffnen eines JSON(5)-Editors. JSON5 wird ab Admin-Version 5.7.3 unterstützt.

| Immobilie | Beschreibung |
|------------------------|-----------------------------------------------------------------------|
| `validateJson` | Wenn falsch, wird der Text nicht als JSON validiert |
| `json5` | wenn JSON5-Format zulässig (ab 7.5.3) |
| `doNotApplyWithError` | Speichern des Werts nicht zulassen, wenn ein Fehler in JSON oder JSON5 auftritt (ab 7.5.3) |
| `doNotApplyWithError` | Speichern des Werts bei Fehler in JSON oder JSON5 nicht zulassen (ab 7.5.3) |

### `language`
Sprache auswählen

| Immobilie | Beschreibung |
|----------|----------------------------------------------------------------------------------------------------------------------|
| `system` | erlaubt die Verwendung der Systemsprache aus `system.config` als Standard (hat einen leeren String-Wert, wenn ausgewählt) |

### `certificate`
| Immobilie | Beschreibung |
|------------|----------------------------------------------------------------------------------------|
| `certType` | von: `public`, `private`, `chained`. Ab 6.4.0 können Sie jedoch den Typ `certificates` verwenden. |

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
Wählen Sie eine Zertifikatssammlung aus, verwenden Sie einfach alle Sammlungen oder verwenden Sie Let’s Encrypt überhaupt nicht.

| Immobilie | Beschreibung |
|--------------------|------------------------------------|
| `leCollectionName` | Name der Zertifikatssammlung |

### `custom`
nur Admin6

| Immobilie | Beschreibung |
|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| `name` | Komponentenname, der über Props bereitgestellt wird, wie `ComponentInstancesEditor` |
| `i18n` | true, wenn sich `i18n/xx.json`-Dateien im selben Verzeichnis wie die Komponente oder das Übersetzungsobjekt `{"text1": {"en": Text1"}}` befinden |
| `bundlerType` | Wenn das Modul mit TypeScript geschrieben wurde, setzen Sie es auf `module`. Ab Admin 7.5.x |
| `bundlerType` | Wenn das Modul mit TypeScript geschrieben wurde, setzen Sie es auf `module`. Ab Admin 7.5.x |

#### Beispiel für URL
- `custom/customComponents.js`: in diesem Fall werden die Dateien von `/adapter/ADAPTER_NAME/custom/customComponents.js` geladen
- `https://URL/myComponent`: direkt von der URL
- `./adapter/ADAPTER_NAME/custom/customComponent.js`: in diesem Fall werden die Dateien von `/adapter/ADAPTER_NAME/custom/customComponents.js` geladen

### `datePicker`
ermöglichen dem Benutzer die Auswahl einer Datumseingabe das UI-Format kommt aus der konfigurierten

### `timePicker`
Ermöglichen Sie dem Benutzer, eine Datumseingabe auszuwählen. Die zurückgegebene Zeichenfolge ist eine analysierbare Datumszeichenfolge oder hat das Format `HH:mm:ss`

| Immobilie | Beschreibung |
|----------------|------------------------------------------------------------------------------------------------------|
| `format` | Das an die Datumsauswahl übergebene Format ist standardmäßig `HH:mm:ss` |
| `timeSteps` | Stellt die verfügbaren Zeitschritte für jede Ansicht dar. Standardmäßig `{ hours: 1, minutes: 5, seconds: 5 }` |
| `returnFormat` | `fullDate` oder `HH:mm:ss`. Aus Gründen der Abwärtskompatibilität wird standardmäßig das vollständige Datum verwendet. |
| `returnFormat` | `fullDate` oder `HH:mm:ss`. Aus Gründen der Abwärtskompatibilität wird standardmäßig das vollständige Datum verwendet. |

### `divider`
horizontale Linie

| Immobilie | Beschreibung |
|----------|--------------------------------------------------|
| `height` | optionale Höhe |
| `Farbe` | optionale Trennfarbe oder `primär`, `sekundär` |

### `header`
| Immobilie | Beschreibung |
|----------|--------------|
| `text` |              |
| `Größe` | 1-5 => h1-h5 |

### `cron`
| Immobilie | Beschreibung |
|-----------|-----------------------------------------------|
| `complex` | CRON mit „Minuten“, „Sekunden“ usw. anzeigen |
| `simple` | einfache CRON-Einstellungen anzeigen |

### `fileSelector`
Wählen Sie eine Datei aus einem Ordner im Dropdown-Menü aus. Wenn Sie möchten, können Sie eine neue Datei in diesen Ordner hochladen.

nur Admin6

| Immobilie | Beschreibung |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pattern` | Dateierweiterungsmuster. Erlaubt `**/*.ext`, um auch alle Dateien aus Unterordnern anzuzeigen, `*.ext`, um aus dem Stammordner anzuzeigen, oder `folderName/*.ext`, um alle Dateien im Unterordner `folderName` anzuzeigen. Standard `**/*.*`. |
| `objectID` | Objekt-ID vom Typ `meta`. Sie können den speziellen Platzhalter `%INSTANCE%` verwenden: wie `myAdapter.%INSTANCE%.files` |
| `upload` | Pfad, in dem die hochgeladenen Dateien gespeichert werden. Wie `folderName`. Falls nicht definiert, wird kein Upload-Feld angezeigt. Um in das Stammverzeichnis hochzuladen, setzen Sie dieses Feld auf `/`. |
| `refresh` | Schaltfläche „Aktualisieren“ neben der Auswahl anzeigen. |
| `maxSize` | maximale Dateigröße (Standard 2 MB) |
| `withFolder` | Ordnernamen anzeigen, auch wenn sich alle Dateien im selben Ordner befinden |
| `delete` | Löschen von Dateien zulassen |
| `noNone` | Option `none` nicht anzeigen |
| `noSize` | Dateigröße nicht anzeigen |
| `noSize` | Dateigröße nicht anzeigen |

### `file`
Eingabefeld mit Dateiauswahl. Es wird als Textfeld mit einer Schaltfläche zum Öffnen des Dialogs angezeigt.
Nur Admin6.

| Immobilie | Beschreibung |
|---------------------|------------------------------------------------------------------------------------------|
| `disableEdit` | wenn der Benutzer den Dateinamen manuell eingeben kann und nicht nur über den Auswahldialog |
| `filterFiles` | wie `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']` |
| `allowUpload` | Erlaubtes Hochladen von Dateien |
| `allowDownload` | Erlaubter Download von Dateien (Standard: „true“) |
| `allowCreateFolder` | erlaubte Erstellung von Ordnern |
| `allowView` | erlaubte Kachel-Ansicht (Standard: true) |
| `showToolbar` | Symbolleiste anzeigen (Standard: „true“) |
| `selectOnlyFolders` | Benutzer kann nur Ordner auswählen (z. B. für den Upload-Pfad) |
| `trim` | Dateinamen kürzen |
| `trim` | Dateinamen kürzen |

### `imageSendTo`
zeigt das vom Backend empfangene Bild als Base64-String an

| Immobilie | Beschreibung |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `width` | Breite des QR-Codes in px |
| `command` | sendTo-Befehl |
| `jsonData` | Zeichenfolge - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |
| `data` | object - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |

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
Zeigt das Dropdown-Menü mit den von der Instanz angegebenen Werten an.

| Immobilie | Beschreibung |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo-Befehl |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |
| `manual` | manuelle Bearbeitung zulassen. Ohne Dropdown-Menü (wenn Instanz offline ist). Standard `true`. |
| `multiple` | Multiple-Choice-Auswahl |
| `showAllValues` | Element anzeigen, auch wenn kein Label dafür gefunden wurde (bei mehreren), Standard=`true` |
| `noTranslation` | Bezeichnung der Auswahl nicht übersetzen. Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren. Das Ergebnis des Befehls muss ein Array in der Form `[{"value": 1, "label": "one"}, ...]` | sein. |
| `alsoDependsOn` | bei Änderung welcher Attribute der Befehl erneut gesendet werden muss |
| `alsoDependsOn` | bei Änderung welcher Attribute muss der Befehl erneut gesendet werden |

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
Zeigt die Autovervollständigungssteuerung mit den von der Instanz angegebenen Werten an.

| Immobilie | Beschreibung |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo-Befehl |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |
| `freeSolo` | Setzen Sie `freeSolo` auf `true`, damit das Textfeld einen beliebigen Wert enthalten kann. |
| `alsoDependsOn` | bei Änderung welcher Attribute der Befehl erneut gesendet werden muss |
| `maxLength` | maximale Länge des Textes im Feld |
| `maxLength` | maximale Länge des Textes im Feld |

Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren:

Das Ergebnis des Befehls muss ein Array in der Form `["value1", {"value": "value2", "label": "Value2"}, ...]` sein (Schlüssel müssen eindeutig sein). Siehe `selectSendTo` für ein Handler-Beispiel.

### `textSendTo`
Zeigt das schreibgeschützte Steuerelement mit den von der Instanz angegebenen Werten an.

| Immobilie | Beschreibung |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `container` | div, Text, HTML |
| `alsoDependsOn` | bei Änderung welcher Attribute der Befehl erneut gesendet werden muss |
| `command` | sendTo-Befehl |
| `jsonData` | Zeichenfolge - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet |
| `data` | Objekt - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |
| `data` | object - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn „jsonData“ nicht definiert ist. |

Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss eine Zeichenfolge oder ein Objekt mit den folgenden Parametern sein:

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
Ermittelt den aktuellen Standort und verwendet `system.config` Koordinaten, falls dies nicht in der Form "Breitengrad,Längengrad" möglich ist

| Immobilie | Beschreibung |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `divider` | Trennzeichen zwischen Breiten- und Längengrad. Standard "," (Wird verwendet, wenn longitudeName und latitudeName nicht definiert sind) |
| `longitudeName` | falls definiert, wird der Längengrad in diesem Attribut gespeichert, der Teiler wird ignoriert |
| `latitudeName` | falls definiert, wird der Breitengrad in diesem Attribut gespeichert, der Teiler wird ignoriert |
| `useSystemName` | falls definiert, wird das Kontrollkästchen „Systemeinstellungen verwenden“ angezeigt und Breiten- und Längengrad werden aus `system.config` gelesen, ein Boolescher Wert wird unter dem angegebenen Namen gespeichert |
| `useSystemName` | wenn definiert, wird das Kontrollkästchen „Systemeinstellungen verwenden“ angezeigt und Breiten- und Längengrad werden aus `system.config` gelesen, ein Boolescher Wert wird unter dem angegebenen Namen gespeichert |

### `interface`
Wählt die Schnittstelle des Hosts aus, auf dem die Instanz läuft

| Immobilie | Beschreibung |
|------------------|----------------------------------------------------------------|
| `ignoreLoopback` | Loopback-Schnittstelle nicht anzeigen (127.0.0.1) |
| `ignoreInternal` | interne Schnittstellen nicht anzeigen (normalerweise ist es auch 127.0.0.1) |

### `license`
Zeigt die Lizenzinformationen an, sofern diese noch nicht akzeptiert wurden. Eines der Attribute `texts` oder `licenseUrl` muss definiert sein. Bei Akzeptanz der Lizenz wird das definierte Konfigurationsattribut auf `true` gesetzt.

| Immobilie | Beschreibung |
|--------------|------------------------------------------------------------------------------------------------------------|
| `texts` | Array von Absätzen mit Texten, die jeweils als separater Absatz angezeigt werden |
| `title` | Titel des Lizenzdialogs |
| `agreeText` | Text der vereinbarten Schaltfläche |
| `checkBox` | Falls definiert, wird das Kontrollkästchen mit dem angegebenen Namen angezeigt. Wenn aktiviert, wird die vereinbarte Schaltfläche aktiviert. |
| `checkBox` | Wenn definiert, wird das Kontrollkästchen mit dem angegebenen Namen angezeigt. Wenn aktiviert, wird die vereinbarte Schaltfläche aktiviert. |

### `checkLicense`
Eine ganz spezielle Komponente zur Online-Überprüfung der Lizenz. Es werden genau die Eigenschaften `license` und `useLicenseManager` im nativen Zustand benötigt.

| Immobilie | Beschreibung |
|-----------|---------------|
| `uuid` | UUID prüfen |
| `Version` | Version prüfen |

### `uuid`
Iobroker-UUID anzeigen

### `port`
Spezielle Eingabe für Ports. Es prüft automatisch, ob der Port von anderen Instanzen verwendet wird und zeigt eine Warnung an

| Immobilie | Beschreibung |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `min` | minimal zulässige Portnummer. Sie könnte 0 sein. Wenn der Wert dann Null ist, wird die Prüfung, ob der Port belegt ist, nicht durchgeführt. |

### `state`
(admin >= 7.1.0) Kontrolle oder Informationen vom Staat anzeigen

| Immobilie | Beschreibung |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `oid` | Welche Objekt-ID soll zur Steuerung verwendet werden? Die ID ist ohne Präfix `adapter.X.` |
| `foreign` | `oid` ist absolut und es ist nicht erforderlich, `adapter.X` oder `system.adapter.X.` zu oid hinzuzufügen |
| `control` | Wie der Wert des Status angezeigt werden soll: `text`, `html`, `input`, `slider`, `select`, `button`, `switch`, `number` |
| `controlled` | Wenn „true“, wird der Status als Schalter, Auswahl, Schaltfläche, Schieberegler oder Texteingabe angezeigt. Wird nur verwendet, wenn keine Steuerungseigenschaft definiert ist. |
| `unit` | Einheit zum Wert hinzufügen |
| `trueText` | dieser Text wird angezeigt, wenn der Wert wahr ist |
| `trueTextStyle` | Stil des Textes, wenn der Wert wahr ist |
| `falseText` | dieser Text wird angezeigt, wenn der Wert falsch ist oder wenn das Steuerelement eine „Schaltfläche“ ist |
| `falseTextStyle` | Stil des Textes, wenn der Wert falsch ist oder das Steuerelement eine „Schaltfläche“ ist |
| `trueImage` | Dieses Bild wird angezeigt, wenn der Wert wahr ist |
| `falseImage` | Dieses Bild wird angezeigt, wenn der Wert „false“ ist oder wenn es sich bei dem Steuerelement um eine „Schaltfläche“ handelt. |
| `min` | Mindestwert für Steuerelementtyp „Schieberegler“ oder „Zahl“ |
| `max` | Maximalwert für Steuerelementtyp „Schieberegler“ oder „Zahl“ |
| `step` | Schrittwert für Steuerelementtyp Schieberegler oder Zahl |
| `controlDelay` | Verzögerung in ms für Schieberegler oder Zahl |
| `variant` | Schaltflächenvariante: `contained`, `outlined`, `text` |
| `readOnly` | Definiert, ob das Steuerelement schreibgeschützt ist |
| `narrow` | Normalerweise werden Titel und Wert links und rechts in der Zeile angezeigt. Mit diesem Flag erscheint der Wert direkt nach der Bezeichnung |
| `blinkOnUpdate` | Wert sollte beim Aktualisieren blinken (true oder Farbe) |
| `size` | Schriftgröße: klein, normal, groß oder Zahl |
| `addColon` | Fügen Sie der Bezeichnung am Ende den Doppelpunkt hinzu, wenn dieser in der Bezeichnung nicht vorhanden ist |
| `labelIcon` | Base64-Symbol für Etikett |
| `buttonValue` | Optionaler Wert, der für die Schaltfläche gesendet wird |
| `buttonValue` | Optionaler Wert, der für die Schaltfläche gesendet wird |

### `staticInfo`
Zeigt statische Informationen in vorformatierter Form an, z. B. "Titel: Werteinheit" (Admin >= 7.3.3). Dieses Steuerelement wird hauptsächlich in dynamischen Formularen verwendet.

| Immobilie | Beschreibung |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `data` | Anzuzeigender Wert |
| `unit` | (optional) Einheit (kann mehrsprachig sein) |
| `narrow` | (optional) Normalerweise werden Titel und Wert links und rechts in der Zeile angezeigt. Mit diesem Flag erscheint der Wert direkt nach der Bezeichnung |
| `addColon` | (optional) Fügen Sie der Bezeichnung am Ende den Doppelpunkt hinzu, wenn dieser in der Bezeichnung nicht vorhanden ist |
| `blinkOnUpdate` | (optional) Wert sollte beim Aktualisieren blinken (true oder Farbe) |
| `blink` | (optional) Wert sollte kontinuierlich blinken (true oder Farbe) |
| `styleLabel` | (optional) React CSS-Stile |
| `styleValue` | (optional) React CSS-Stile |
| `styleUnit` | (optional) React CSS-Stile |
| `copyToClipboard` | (optional) Schaltfläche „In die Zwischenablage kopieren“ für Wert anzeigen |
| `labelIcon` | (optional) Base64-Symbol für Beschriftung |
| `size` | (optional) Schriftgröße: klein, normal, groß oder Zahl |
| `highlight` | (optional) Zeile beim Mouseover hervorheben |
| `booleanAsCheckbox` | (optional) Boolesche Werte als Kontrollkästchen anzeigen |
| `booleanAsCheckbox` | (optional) Boolesche Werte als Kontrollkästchen anzeigen |

### `deviceManager`
Gerätemanager anzeigen. Dazu muss der Adapter das Gerätemanagerprotokoll unterstützen. Siehe iobroker/dm-utils.

Hier ist ein Beispiel, wie der Geräte-Manager in einer Registerkarte angezeigt wird:

```json
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
```

## Gemeinsame Attribute von Steuerelementen
### Layoutoptionen `xl`,`lg`,`md`,`sm`,`xs`
Diese Optionen werden verwendet, um die Breite von Elementen auf verschiedenen Bildschirmgrößen zu definieren und so ein ansprechendes und anpassbares Layout auf verschiedenen Geräten sicherzustellen.

Gültige Zahlen sind 1 bis 12.

Wenn Sie eine Zahl angeben, z. B. 6, beträgt die Breite des Elements 6/12 (50 %) der Bildschirmbreite. Wenn Sie beispielsweise 3 angeben, beträgt die Breite des Elements 3/12 (25 %) der Bildschirmbreite.
Weisen Sie den verschiedenen Layoutoptionen Zahlen zu, um die Breite des Elements für die verschiedenen Bildschirmgrößen festzulegen.

| Option | Beschreibung |
|--------|------------------------------------------|
| `xl` | extra große Bildschirme (1536px >= Breite) |
| `md` | mittlere Bildschirme (900px <= Breite < 1200px) |
| `sm` | kleiner Bildschirm (600px <= Breite < 900px) |
| `xs` | winzige Bildschirme (Breite < 600 px) |
| `xs` | kleine Bildschirme (Breite < 600 px) |

Die folgenden Optionen sind die empfohlenen Voreinstellungen, die in den meisten Fällen passen

```json
"xs": 12,
"sm": 12,
"md": 6,
"lg": 4,
"xl": 4,
```

#### Es wird empfohlen, das Layout zu überprüfen
Das jeweilige Layout sollte bei jedem Adapter geprüft werden, ob das Layout in allen Auflösungen dargestellt und genutzt werden kann.

Dies kann beispielsweise mithilfe der Web Developer Tools getestet werden, die in jedem Chromium-basierten Browser integriert sind.

Schritt 1: Öffnen Sie die Web Developer Tools mit F12

Schritt 2: Öffnen Sie die Geräte-Symbolleiste (1)

Schritt 3: Verschiedene Geräte auswählen (2)

![Bild](../../en/dev/img/webdevtools.png)

In den Einstellungen der Webentwicklertools können Sie bei Bedarf eigene Geräte mit den exakten Breiten erstellen.

### Weitere Optionen
| Option | Beschreibung |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | Wenn das Element kein Attribut `type` hat, wird davon ausgegangen, dass es den Standardtyp „Panel“ hat. Typ eines Elements. Die aktuell verfügbaren Optionen finden Sie unter [Gemeinsame Bedienelemente:](#common-control-elements) |
| `label` | Zeichenfolge oder Objekt wie {en: 'Name', ru: 'Имя'} |
| `hidden` | JS-Funktion, die `native.attribute` zur Berechnung verwenden könnte |
| `hideOnlyControl` | wenn ausgeblendet, wird der Ort angezeigt, aber keine Kontrolle |
| `disabled` | JS-Funktion, die `native.attribute` zur Berechnung verwenden könnte |
| `help` | Hilfetext (mehrsprachig) |
| `helpLink` | href zur Hilfe (kann nur zusammen mit `help` verwendet werden) |
| `style` | CSS-Stil in ReactJS-Notation: `radiusBorder` und nicht `radius-border`. |
| `darkStyle` | CSS-Stil für den Dunkelmodus |
| `validator` | JS-Funktion: true, kein Fehler, false, Fehler |
| `validatorErrorText` | Text, der angezeigt wird, wenn der Validator fehlschlägt |
| `validatorNoSaveOnError` | Schaltfläche „Speichern“ bei Fehler deaktivieren |
| `tooltip` | optionaler Tooltip |
| `default` | Standardwert |
| `defaultFunc` | JS-Funktion zum Berechnen des Standardwerts |
| `placeholder` | Platzhalter (zur Textsteuerung) |
| `noTranslation` | Selects oder andere Optionen nicht übersetzen (nicht für Hilfe, Beschriftung oder Platzhalter) |
| `onChange` | Struktur in Form `{"alsoDependsOn": ["attr1", "attr2"], "calculateFunc": "data.attr1 + data.attr2", "ignoreOwnChanges": true}` |
| `doNotSave` | Dieses Attribut nicht speichern, da es nur für interne Berechnungen verwendet wird |
| `noMultiEdit` | Wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nicht angezeigt, wenn der Benutzer mehr als ein Objekt zur Bearbeitung ausgewählt hat. |
| `expertMode` | wenn dieses Flag auf true gesetzt ist, wird dieses Feld nur angezeigt, wenn der Expertenmodus true ist (ab Admin 7.4.3) |
| `expertMode` | wenn dieses Flag auf true gesetzt ist, wird dieses Feld nur angezeigt, wenn der Expertenmodus true ist (ab Admin 7.4.3) |

### Optionen mit detaillierter Konfiguration
#### `defaultSendTo`
Befehl zum Anfordern des Anfangswerts von der laufenden Instanz, Beispiel: `"myInstance": {"type": "text", "defaultSendTo": "fill"}`

- `data` – statische Daten
- `jsonData` – statische Daten
- wenn keine `data` und `jsonData` definiert sind, werden die folgenden Informationen gesendet `{"attr": "<attribute name>", "value": "<current value>"}`
- `button` - Schaltflächenbezeichnung zum erneuten Auslösen der Anfrage von der Instanz
- `buttonTooltip` – Button-Tooltip (Standard: `Daten nach Instanz anfordern`)
- `buttonTooltipNoTranslation` – Button-Tooltip nicht übersetzen
- `allowSaveWithError` - Ermöglicht das Speichern der Konfiguration, auch wenn die Instanz offline ist

#### `confirm`
- `Bedingung` - JS-Funktion: true Bestätigungsdialog anzeigen
- `text` – Text des Bestätigungsdialogs
- `title` – Titel des Bestätigungsdialogs
- `ok` - Text für die OK-Schaltfläche
- `cancel` - Text für die Schaltfläche „Abbrechen“
- `Typ` – Einer von: `Info`, `Warnung`, `Fehler`, `Keiner`
- `alsoDependsOn` – Array mit Attributen, um den Zustand auch anhand dieser Attribute zu prüfen

## Autovervollständigung
`Number`, `text`, `checkbox`, `select` unterstützen die automatische Vervollständigung, um die Auswahl von Optionen zu ermöglichen, wenn sie als benutzerdefinierte Einstellungen verwendet werden.
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

In diesem Fall muss die Eingabe Text sein (wo angezeigt: `__different__`), mit der Autovervollständigungsoption von drei möglichen Werten.
Benutzer können aus der Dropdown-Liste 1000, 2000 oder 3000 auswählen oder einen eigenen neuen Wert eingeben, z. B. 500.

Boolean muss unbestimmt unterstützen, wenn der Wert [falsch, wahr] ist

Für unveränderte `__different__` muss der Wert different zurückgegeben werden:

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

Der Wert `__different__` ist reserviert und kann von keiner Texteingabe vom Benutzer akzeptiert werden.

Komponente muss aussehen wie

```jsx
<SchemaEditor
    style={customStyle}
    className={classes.myClass}
    schema={schema}
    customInstancesEditor={CustomInstancesEditor}
    data={common.native}
    onError={(error, attribute) => error can be true/false or text. Attribute is optional}
    onChanged={(newData, isChanged) => console.log('Changed ' + isChanged)}
/>
```

Wenn kein Schema bereitgestellt wird, muss das Schema automatisch aus Daten erstellt werden.

- `boolean` => Kontrollkästchen
- `text` => Texteingabe
- `number` => Nummer
- Name `bind` => IP
- Name „Port“ => Nummer, min=1, max=0xFFFF
- Name `timeout` => Zahl, Hilfe="ms"

## Aufgaben
Die folgenden Kapitel stammen aus der ursprünglichen SCHEMA.MD.
Ich habe den Inhalt nicht im Detail verstanden und musste ihn von Bluefox verbessern lassen.

## JS-Funktionen
### Konfigurationsdialog
JS-Funktion ist:

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

Ändert sich der Status `alive`, so müssen alle Felder erneut aktualisiert, validiert, deaktiviert, ausgeblendet werden.

Die folgenden Variablen sind in der JS-Funktion in den Adaptereinstellungen verfügbar:

- `data` – native Einstellungen für diese Instanz oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `_system` - Systemkonfiguration
- `_alive` – ist die Instanz aktiv
- `_common` – allgemeine Einstellungen für diese Instanz
- `_socket` - Sockel
- `_instance` - Instanznummer
- `arrayIndex` – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur für eine Tabellenzeile

### Dialogfeld „Benutzerdefinierte Einstellungen“
JS-Funktion ist:

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

Die folgenden Variablen sind in der JS-Funktion in benutzerdefinierten Einstellungen verfügbar:

- `data` – aktuelle benutzerdefinierte Einstellungen oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `originalData` - Unveränderte Daten
- `_system` - Systemkonfiguration
- `instanceObj` – Adapterinstanzobjekt
- `customObj` – aktuelles Objekt selbst
- `_socket` - Sockel
- `arrayIndex` – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur für eine Tabellenzeile

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
    onError={error => error can be true/false or text}
/>
```

Beispiele finden Sie im Adapter [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin).

## JSON-Registerkarte im Admin
Ab der Admin-Version 7.6.x können Sie die Registerkarte (wie `backitup` oder `matter`) über die JSON-Konfiguration definieren.

Hierzu müssen Sie im Abschnitt `io-package.json` im Abschnitt `common` Folgendes definieren:

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

Die Datei `jsonTab.json5` könnte folgendermaßen aussehen:

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

Wenn `sendTo` angegeben ist, erhält die Instanz eine Nachricht (`common.messagebox` muss in `io-package.json` wahr sein) mit dem Befehl `tab` oder mit einem in `sendTo` gespeicherten Wert, wenn es sich um eine Zeichenfolge handelt.
Die Instanz muss mit folgender Struktur antworten:

```typescript
onMessage = (obj: ioBroker.Message): void => {
    if (obj?.command === 'tab' && obj.callback) {
        // if not instance message
        this.sendTo(obj.from, obj.command, { data: { value: 5 } }, obj.callback);
    }
};
```

## Einen Schemafehler melden
Erstellen Sie hier ein Problem: https://github.com/ioBroker/adapter-react-v5/issues

## Für Betreuer
Um den Speicherort des JsonConfig-Schemas zu aktualisieren, erstellen Sie eine Pull-Anfrage für diese Datei: https://github.com/SchemaStore/schemastore/blob/master/src/api/json/catalog.json