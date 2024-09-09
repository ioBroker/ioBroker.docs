---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterjsonconfig.md
title: ioBroker JSON-Konfiguration
hash: uvQuLv+B2UrVMpWA3t0/bd9VxY4hTapAX8U0J3lRgV0=
---
# IoBroker JSON-Konfiguration
Admin (ab Version 6) unterstützt JSON-Konfiguration für Adapter.
Es ist möglich, die Konfiguration in einer JSON-Datei zu definieren und sie dann in Admin zu verwenden.

Ein Beispiel für eine Datei `jsonConfig.json` mit mehreren Registerkarten finden Sie hier: https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5 und ein Beispiel mit nur einem Bedienfeld hier: https://github.com/ioBroker/ioBroker.dwd/blob/master/admin/jsonConfig.json

Sie können die Einstellungen im JSON- oder im JSON5-Format definieren. JSON5 ist für Menschen besser lesbar und unterstützt Kommentare.

Zusätzlich zur JSON-Datei müssen Sie im Teil `io-package.json` im `common` Folgendes definieren:

```json
{
  "common": {
    "adminUI": {
      "config": "json"
    }
  }
}
```

um zu sagen, dass der Adapter die JSON-Konfiguration unterstützt.

Sie können fast alle Komponenten in Aktion sehen, wenn Sie diesen Adapter testen: https://github.com/mcm4iob/ioBroker.jsonconfig-demo.
Sie können ihn über das GitHub-Symbol im Adminbereich installieren, indem Sie auf der Registerkarte „npm“ `iobroker.jsonconfig-demo` eingeben.

Das Schema für die JSON-Konfigurationsdatei ist hier definiert: https://github.com/ioBroker/adapter-react-v5/blob/main/schemas/jsonConfig.json

Alle Beschriftungen, Texte und Hilfetexte können mehrsprachig oder nur aus Zeichenfolgen bestehen.

*Wenn der Attributname mit "_" beginnt, wird er nicht im Objekt gespeichert.*

## Beinhaltet
Erfordert Admin 6.17.1 oder neuer.

Um komplexe JSON-Dateien zu schreiben, können Sie andere JSON-Dateien einbinden.
Die eingebundene Datei muss sich im selben Verzeichnis wie die Hauptdatei befinden.

```json5
{
    "tabs": {
        "tab1": {
            "type": "panel", // data will be combined with the content of "tab1.json". If the same attribute is defined in both files, the value from the included file will be used.
            "#include": "tab1.json"
        }
    }
}
```

## Mögliche Steuerungstypen
Mögliche Typen:

- `tabs` - Registerkarten mit Elementen
- `items` – Objekt mit Feldern `{"tab1": {}, "tab2": {}...}`
- `iconPosition` – `bottom`, `end`, `start` oder `top`. Nur für Panels mit `icon`-Attribut. Standard: `start`
- `tabsStyle` – CSS-Stile im React-Format („marginLeft“ und nicht „margin-left“) für die Mui-Tabs-Komponente

- „Panel“ – Registerkarte mit Elementen
- „Symbol“ – Registerkarte kann Symbole (Base64 wie „data:image/svg+xml;base64,...“) oder „jpg/png“-Bilder (endet mit „.png“) haben
- „label“ – Bezeichnung der Registerkarte
- `Elemente` - Objekt `{"attr1": {}, "attr2": {}}...`
- `collapsable` – nur möglich, da es sich nicht um einen Teil von tabs[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json) handelt.
- `color` - Farbe der einklappbaren Kopfzeile `primary` oder `sekundary` oder nichts
- `innerStyle` – CSS-Stile für innere Divs im React-Format („marginLeft“ und nicht „margin-left“) für die Panel-Komponente. Wird nicht für einklappbare Panels verwendet.

- `text` – Textkomponente
- `maxLength` – maximale Länge des Textes im Feld
- `readOnly` - schreibgeschütztes Feld
- „trim“ – Standard ist „true“. Setzen Sie dieses Attribut auf „false“, wenn kein Trimmen gewünscht ist.
- „minRows“ – Standard ist 1. Setzen Sie dieses Attribut auf „2“ oder höher, wenn Sie einen Textbereich mit mehr als einer Zeile haben möchten.
- `maxRows` – maximale Anzahl an Zeilen im Textbereich. Wird nur verwendet, wenn `minRows` > 1.
- „noClearButton“ – wenn wahr, wird die Schaltfläche „Löschen“ nicht angezeigt (Admin >= 6.17.13)
- `validateJson` – wenn wahr, wird der Text als JSON validiert
- „allowEmpty“ – wenn wahr, wird das JSON nur validiert, wenn der Wert nicht leer ist
- „Zeit“ – der Wert ist die Zeit in ms oder eine Zeichenfolge. Wird nur mit dem Flag „readOnly“ verwendet.

- `Nummer`
- `min` - Minimalwert
- `max` - Maximalwert
- `Schritt` - Schritt

- „Farbe“ – Farbwähler
- „noClearButton“ – wenn wahr, wird die Schaltfläche „Löschen“ nicht angezeigt (Admin >= 6.17.13)

- `checkbox` – Kontrollkästchen anzeigen

- `slider` - Slider anzeigen (nur Admin6)
- `min` - (Standard 0)
- `max` - (Standard 100)
- „Schritt“ – (Standard: „(max – min) / 100“)
- `unit` - Einheit des Schiebereglers

- „qrCode“ – Daten in einem QR-Code anzeigen (ab Admin 7)
- `data` - die im QR-Code zu kodierenden Daten
- „Größe“ – Größe des QR-Codes
- `fgColor` – Vordergrundfarbe
- `bgColor` – Hintergrundfarbe
- „Ebene“ – Ebene des QR-Codes (`L` `M` `Q` `H`)

- `ip` - Bind-Adresse
- `listenOnAllPorts` - 0.0.0.0 zur Option hinzufügen
- `onlyIp4` - nur IP4-Adressen anzeigen
- `onlyIp6` - nur IP6-Adressen anzeigen
- „noInternal“ – interne IP-Adressen nicht anzeigen

- `user` - Benutzer aus system.user auswählen. (Mit Farbe und Symbol)
- „kurz“ – kein Systembenutzer.

- „room“ – Raum aus „enum.room“ auswählen (mit Farbe und Symbol) – (nur Admin6)
- „kurz“ – kein „enum.rooms“.
- `allowDeactivate` - erlaubt das Leeren des Raumes

- `func` – Funktion aus `enum.func` auswählen (Mit Farbe und Symbol) – (nur Admin6)
- „kurz“ – kein „enum.func“.
- `allowDeactivate` - ermöglicht das Leeren der Funktionalität

- `auswählen`
- `Optionen` - `[{label: {en: "option 1"}, value: 1}, ...]` oder

                `[{"items": [{"label": "Val1", "value": 1}, {"label": "Val2", value: "2}], "name": "group1"}, {"items": [{"label": "Val3", "value": 3}, {"label": "Val4", value: "4}], "name": "group2"}, {"label": "Val5", "value": 5}]`

- `Autovervollständigung`
- `Optionen` - `["Wert1", "Wert2", ...]` oder `[{"Wert": "Wert", "Bezeichnung": "Wert1"}, "Wert2", ...]` (Schlüssel müssen eindeutig sein)
- „freeSolo“ – Setzen Sie „freeSolo“ auf „true“, damit das Textfeld einen beliebigen Wert enthalten kann.

- `image` - speichert das Bild als Datei des `adapter.X`-Objekts oder als Base64 im Attribut
- `filename` - Name der Datei ist Strukturname. Im folgenden Beispiel ist `login-bg.png` der Dateiname für `writeFile("myAdapter.INSTANCE", "login-bg.png")`
- „accept“ – HTML-Akzeptanzattribut, wie „{ „image/**“: [], „application/pdf“: [„.pdf“] }“, Standard „{ „image/*“: [] }“
- `maxSize` – maximale Größe der hochzuladenden Datei
- `base64` - wenn wahr, wird das Bild als Daten-URL im Attribut gespeichert, andernfalls als Binärdatei im Dateispeicher
- „crop“ – wenn wahr, erlaubt dem Benutzer, das Bild zuzuschneiden
- `!maxBreite`
- `!maxHöhe`
- „!square“ – die Breite muss gleich der Höhe sein, oder der Zuschnitt darf nur Quadrate als Form zulassen

```
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

- `objectId` – Objekt-ID: mit Name, Farbe und Symbol anzeigen
- `types` - Gewünschter Typ: `channel`, `device`, ... (hat standardmäßig nur `state`). Es ist Plural, weil `type` bereits vergeben ist.
- `root` – [optional] Nur dieses Stammobjekt und seine untergeordneten Objekte anzeigen
- `customFilter` - [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es handelt sich um ein Objekt und nicht um eine JSON-Zeichenfolge. Beispiele
- `{common: {custom: true}}` – zeige nur Objekte mit einigen benutzerdefinierten Einstellungen
- `{common: {custom: 'sql.0'}}` – zeige nur Objekte mit benutzerdefinierten SQL.0-Einstellungen (nur der spezifischen Instanz)
- `{common: {custom: '_dataSources'}}` – zeige nur Objekte der Adapter `influxdb` oder `sql` oder `history`
- `{common: {custom: 'adapterName.'}}` – zeigt nur Objekte mit benutzerdefinierten Einstellungen eines bestimmten Adapters an (alle Instanzen)
- `{type: 'channel'}` – nur Kanäle anzeigen
- `{type: ['channel', 'device']}` - nur Kanäle und Geräte anzeigen
- `{common: {type: 'number'}` - zeigt nur Zustände vom Typ 'number
- `{common: {type: ['number', 'string']}` - zeigt nur Zustände vom Typ 'number' und 'string' an.
- `{common: {role: 'switch'}` - zeige nur Zustände mit Rollen, beginnend mit switch
- `{common: {role: ['switch', 'button']}` - zeige nur Zustände mit Rollen, die mit `switch` und `button` beginnen
- `filterFunc` – [optional] Kann nicht zusammen mit `type`-Einstellungen verwendet werden. Es ist eine Funktion, die für jedes Objekt aufgerufen wird und true oder false zurückgeben muss. Beispiel: `obj.common.type === 'number'`

- „Passwort“ – Passwortfeld

Dieser Feldtyp hat nur Auswirkungen auf die Benutzeroberfläche.
Passwörter und andere sensible Daten sollten verschlüsselt gespeichert werden! Dazu muss der Schlüssel im io-package.json unter [nativeVerschlüsselung](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) bereitgestellt werden.
Zusätzlich können Sie diese Eigenschaft vor der Bereitstellung an andere Adapter als `admin` und `cloud` schützen, indem Sie sie in der Datei `io-package.json` zu `protectedNative` hinzufügen.

- `repeat` - Wiederholungspasswort muss mit Passwort verglichen werden
- „sichtbar“ – Wahr, wenn das Anzeigen des Passworts durch Umschalten der Schaltfläche „Anzeigen“ erlaubt ist (nur für ein neues Passwort während der Eingabe)
- `readOnly` - das Nur-Lese-Flag. Visible ist automatisch wahr, wenn readOnly wahr ist
- `maxLength` – maximale Länge des Textes im Feld

- `Instanz`
- `adapter` – Name des Adapters. Mit dem speziellen Namen `_dataSources` können Sie alle Adapter mit dem Flag `common.getHistory` abrufen.
- „Adapter“ – optionale Liste der Adapter, die angezeigt werden sollen. Wenn nicht definiert, werden alle Adapter angezeigt. Nur aktiv, wenn das Attribut „Adapter“ nicht definiert ist.
- `allowDeactivate` - wenn wahr. Zusätzliche Option "Deaktivieren" wird angezeigt
- `onlyEnabled` - wenn wahr. Nur aktivierte Instanzen werden angezeigt
- „lang“ – der Wert sieht wie „system.adapter.ADAPTER.0“ aus und nicht wie „ADAPTER.0“.
- „short“ – der Wert sieht wie „0“ aus und nicht wie „ADAPTER.0“.
- „alle“ – Fügen Sie den Optionen „alle“ die Option mit dem Wert „*“ hinzu

- „Chips“ – der Benutzer kann das Wort eingeben und es wird hinzugefügt (siehe Cloud => Dienste => Whitelist). Die Ausgabe ist ein Array, wenn kein „Trennzeichen“ definiert ist.
- `delimiter` - wenn es definiert ist, wird die Option als Zeichenfolge mit Trennzeichen statt als Array gespeichert. Beispielsweise erhalten Sie mit `delimiter=;` `a;b;c` statt `['a', 'b', 'c']`

- „alive“ – nur ein Hinweis darauf, ob die Instanz aktiv ist und in den Modi „versteckt“ und „deaktiviert“ verwendet werden kann (wird nicht in der Konfiguration gespeichert)

Nur Text: Instanz läuft, Instanz läuft nicht

- `Instanz` – prüft, ob die Instanz aktiv ist. Wenn nicht definiert, wird die aktuelle Instanz verwendet. Sie können im Text das Muster `${data.number}` verwenden.
- `textAlive` - Standardtext ist `Instance %s is alive`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in i18n-Dateien vorhanden sein
- `textNotAlive` - der Standardtext lautet `Instanz %s ist nicht aktiv`, wobei %s durch `ADAPTER.0` ersetzt wird. Die Übersetzung muss in i18n-Dateien vorhanden sein

- „Muster“ – schreibgeschütztes Feld mit Muster wie „https://${data.ip}:${data.port}“ (wird nicht in der Konfiguration gespeichert)

Texteingabe mit dem Nur-Lese-Flag, die ein Muster zeigt.

- `copyToClipboard` - wenn wahr - Schaltfläche anzeigen
- `Muster` - mein Muster

- „sendto“ – Schaltfläche, die eine Anfrage an die Instanz sendet (https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128)
- „Befehl“ – (Standard: „Senden“)
- `jsonData` - Zeichenfolge - `"{\"subject1\": \"${data.subject}\", \"options1\": {\"host\": \"${data.host}\"}}"`. Sie können die speziellen Variablen `data._origin` und `data._originIp` verwenden, um der Instanz die Anrufer-URL zu senden, z. B. `http://127.0.0.1:8081/admin`.
- `data` - object - `{"subject1": 1, "data": "static"}`. Sie können „jsonData“ oder „data“ angeben, aber nicht beides.
    - `result` - `{result1: {en: 'A'}, result2: {en: 'B'}}`
    - `error` - `{error1: {en: 'E'}, error2: {en: 'E2'}}`
- `Variante` - `enthalten`, `umrissen` oder nichts
- `openUrl` - wenn wahr - URL in neuem Tab öffnen, wenn die Antwort das Attribut `openUrl` enthält, wie `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank", "saveConfig": true}`. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern.
- „reloadBrowser“ – wenn wahr – lädt das aktuelle Browserfenster neu, wenn die Antwort das Attribut „reloadBrowser“ enthält, wie „{„reloadBrowser“: true}“.
- „window“ – wenn „openUrl“ wahr ist, ist dies der Name des neuen Fensters. Kann überschrieben werden, wenn die Antwort aus dem Attribut „window“ besteht.

`this.props.socket.sendTo(adapterName.instance, command || 'send', data, result => {});`

- `icon` – wenn Icons angezeigt werden sollen: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`. Sie können `base64`-Icons (wie `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Wenn Sie weitere Icons benötigen, wenden Sie sich bitte per Issue an uns.)
- `useNative` – wenn der Adapter ein Ergebnis mit dem Attribut `native` zurückgibt, wird es für die Konfiguration verwendet. Wenn `saveConfig` wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern.
- „showProcess“ – Spinner anzeigen, während die Anfrage ausgeführt wird
- „timeout“ – Timeout für Anforderung in ms. Standard: keine.
- `onLoaded` - führt die Schaltflächenlogik zunächst einmal aus

- `setState` - Schaltfläche zum Festlegen des Status der Instanz
- `id` - `system.adapter.myAdapter.%INSTANCE%.test`, Sie können den Platzhalter `%INSTANCE%` verwenden, um ihn durch den aktuellen Instanznamen zu ersetzen
- „ack“ – false (Standard: false)
- `val` - '${data.myText}_test' oder Zahl. Der Typ wird automatisch anhand des Statustyps erkannt und die Konvertierung wird ebenfalls durchgeführt.
- `okText` - Warnung, die durch Drücken der Taste angezeigt wird
- `Variante` - `enthalten`, `umrissen`, ''

- `staticText` – statischer Text wie Beschreibung
- `label` - mehrsprachiger Text
- „Text“ – dasselbe wie Etikett

- `staticLink` – statischer Link
- `label` - mehrsprachiger Text
- `href` – Link. Der Link könnte dynamisch sein, wie `#tab-objects/customs/${data.parentId}`
- `target` - `_blank` oder `_self` oder Fenstername
- „close“ – wenn wahr, wird die GUI geschlossen (wird nicht für JsonConfig im Admin verwendet, sondern für die dynamische GUI)
- „Button“ – einen Link als Schaltfläche anzeigen
- „Variante“ – Art der Schaltfläche („umrissen“, „enthalten“, „Text“)
- „Farbe“ – Farbe der Schaltfläche (z. B. „primär“)
- `icon` - wenn Icon angezeigt werden soll: `auth`, `send`, `web`, `warning`, `error`, `info`, `search`, `book`, `help`, `upload`. Sie können `base64`-Icons (beginnt mit `data:image/svg+xml;base64,...`) oder `jpg/png`-Bilder (endet mit `.png`) verwenden. (Wenn Sie mehr Icons benötigen, wenden Sie sich bitte per Issue an)

- `staticImage` – statisches Bild
- `href` – optionaler HTTP-Link
- `src` - Name des Bildes (aus dem Admin-Verzeichnis)

- `table` - Tabelle mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können
- `items` - `[{"type": siehe oben, "width": px oder %, "title": {"en": "header"}, "attr": "name", "filter": false, "sort": true, "default": ""}]`
- `noDelete` - Boolesch, wenn Löschen oder Hinzufügen deaktiviert ist. Wenn `noDelete` falsch ist, sollten Hinzufügen, Löschen und Hoch-/Runterschieben funktionieren.
- `objKeyName` – (alte Einstellung, nicht verwenden!) – Name des Schlüssels in `{"192.168.1.1": {delay: 1000, enabled: true}, "192.168.1.2": {delay: 2000, enabled: false}}`
- `objValueName` – (alte Einstellung, nicht verwenden!) – Name des Wertes in `{"192.168.1.1": "value1", "192.168.1.2": "value2"}`
- `allowAddByFilter` - wenn Hinzufügen erlaubt ist, auch wenn Filter gesetzt ist
- `showSecondAddAt` - Anzahl der Zeilen, ab denen der zweite Hinzufügen-Button am Ende der Tabelle angezeigt wird. Standardmäßig 5
- „showFirstAddOnTop“ – Zeigt den ersten Plus-Button oben in der ersten Spalte und nicht links.
- `clone` – [optional] – wenn die Schaltfläche „Klonen“ angezeigt werden soll. Wenn wahr, wird die Schaltfläche „Klonen“ angezeigt. Wenn Attributname, ist dieser Name eindeutig.
- „Exportieren“ – [optional] – ob die Schaltfläche „Exportieren“ angezeigt werden soll. Als CSV-Datei exportieren.
- „importieren“ – [optional] – ob die Schaltfläche „Importieren“ angezeigt werden soll. Importieren aus CSV-Datei.
- `uniqueColumns` - [optional] - Geben Sie ein Array von Spalten an, die eindeutige Einträge haben müssen
- `encryptedAttributes` – [optional] – Geben Sie ein Array von Spalten an, die verschlüsselt werden sollen
- `compact` – [optional] – wenn wahr, wird die Tabelle im kompakten Modus angezeigt

- „Akkordeon“ – Akkordeon mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können (Admin 6.6.0 und neuer)
- `items` - `[{"type": siehe oben, "attr": "name", "default": ""}]` - Elemente können wie auf einem `Panel` platziert werden (xs, sm, md, lg und newLine)
- `titleAttr` - Schlüssel der Artikelliste, der als Name verwendet werden soll
- `noDelete` - Boolesch, wenn Löschen oder Hinzufügen deaktiviert ist. Wenn `noDelete` falsch ist, sollten Hinzufügen, Löschen und Hoch-/Runterschieben funktionieren.
- `clone` – [optional] – wenn die Schaltfläche „Klonen“ angezeigt werden soll. Wenn wahr, wird die Schaltfläche „Klonen“ angezeigt. Wenn Attributname, ist dieser Name eindeutig.

- `jsonEditor` - JSON-Editor
- „validateJson“ – wenn falsch, wird der Text nicht als JSON validiert
- „allowEmpty“ – wenn wahr, wird das JSON nur validiert, wenn der Wert nicht leer ist

- „Sprache“ – Sprache auswählen
- „system“ – erlaubt die Verwendung der Systemsprache aus „system.config“ als Standard (hat einen leeren String-Wert, wenn ausgewählt)

- `Zertifikat`
- `certType` - von: `public`, `private`, `chained`. Aber ab 6.4.0 können Sie den Typ `certificates` verwenden.

- „Zertifikate“ – dies ist ein universeller Typ, der die Attribute „certPublic“, „certPrivate“, „certChained“ und „leCollection“ für Sie verwaltet.

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

- „certCollection“ – Zertifikatssammlung auswählen oder einfach alle Sammlungen verwenden oder Let’s Encrypt überhaupt nicht verwenden.
- `leCollectionName` – Name der Zertifikatssammlung

- `benutzerdefiniert` (nur Admin6)
- „Name“ – Komponentenname, der über Props bereitgestellt wird, z. B. ComponentInstancesEditor
- `url` - Speicherort der Komponente
- „custom/customComponents.js“: In diesem Fall werden die Dateien von „/adapter/ADAPTER_NAME/custom/customComponents.js“ geladen.
- `https://URL/myComponent`: direkt von der URL
- `./adapter/ADAPTER_NAME/custom/customComponent.js`: in diesem Fall werden die Dateien von `/adapter/ADAPTER_NAME/custom/customComponents.js` geladen.
- `i18n` – wahr, wenn sich `i18n/xx.json`-Dateien im selben Verzeichnis wie die Komponente oder das Übersetzungsobjekt `{"text1": {"en": Text1"}}` befinden.

- `datePicker` - ermöglicht dem Benutzer, eine Datumseingabe auszuwählen. Das UI-Format stammt aus dem konfigurierten `dateFormat` in der Installation des Benutzers.

Die Komponente gibt eine analysierbare Datumszeichenfolge zurück.

- „timePicker“ – ermöglicht dem Benutzer die Auswahl einer Datumseingabe. Die zurückgegebene Zeichenfolge ist eine analysierbare Datumszeichenfolge oder hat das Format „HH:mm:ss“.
- „Format“ – das an die Datumsauswahl übergebene Format ist standardmäßig „HH:mm:ss“.
- `views` - Konfigurieren Sie, welche Ansichten den Benutzern angezeigt werden sollen. Standardmäßig `['hours', 'minutes', 'seconds']`
- `timeSteps` - Stellt die verfügbaren Zeitschritte für jede Ansicht dar. Standardmäßig `{ Stunden: 1, Minuten: 5, Sekunden: 5 }`
- `returnFormat` - `fullDate` oder `HH:mm:ss`. Aus Gründen der Abwärtskompatibilität wird standardmäßig das vollständige Datum verwendet.

- `Teiler` - horizontale Linie
- `height` – optionale Höhe
- „Farbe“ – optionale Trennfarbe oder „primär“, „sekundär“

- `Kopfzeile`
- `Text`
- `Größe` - 1-5 => h1-h5

- `cron`
- `complex` - CRON mit "Minuten", "Sekunden" usw. anzeigen
- `simple` - einfache CRON-Einstellungen anzeigen

- `fileSelector` (nur Admin6)
- `pattern` – Dateierweiterungsmuster. Erlaubt `**/*.ext`, um auch alle Dateien aus Unterordnern anzuzeigen, `*.ext`, um sie aus dem Stammordner anzuzeigen oder `folderName/*.ext`, um alle Dateien im Unterordner `folderName` anzuzeigen. Standard `**/*.*`.
- `fileTypes` – [optional] Dateityp: `Audio`, `Bild`, `Text`
- `objectID` – Objekt-ID vom Typ `meta`. Sie können den speziellen Platzhalter `%INSTANCE%` verwenden: wie `myAdapter.%INSTANCE%.files`
- `upload` - Pfad, in dem die hochgeladenen Dateien gespeichert werden. Wie `folderName`. Wenn nicht definiert, wird kein Upload-Feld angezeigt. Um in das Stammverzeichnis hochzuladen, setzen Sie dieses Feld auf `/`.
- „Aktualisieren“ – Schaltfläche „Aktualisieren“ neben der Auswahl anzeigen.
- „maxSize“ – maximale Dateigröße (Standard: 2 MB)
- „withFolder“ – Ordnernamen anzeigen, auch wenn sich alle Dateien im selben Ordner befinden
- `delete` - Löschen von Dateien erlauben
- `noNone` - Option `none` nicht anzeigen
- `noSize` - Größe der Dateien nicht anzeigen

- `file` (nur Admin6)

Eingabefeld mit Dateiauswahl

- „disableEdit“ – wenn der Benutzer den Dateinamen manuell eingeben kann und nicht nur über den Auswahldialog
- „limitPath“ – beschränkt die Auswahl auf ein bestimmtes Objekt vom Typ „Meta“ und den folgenden Pfad (nicht obligatorisch)
- `filterFiles` - wie `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']`
- `allowUpload` - erlaubtes Hochladen von Dateien
- `allowDownload` – erlaubter Download von Dateien (Standard: true)
- `allowCreateFolder` – erlaubte Erstellung von Ordnern
- `allowView` – Kachel-Ansicht erlaubt (Standard: true)
- `showToolbar` – Symbolleiste anzeigen (Standard: true)
- „selectOnlyFolders“ – Benutzer kann nur Ordner auswählen (z. B. für den Upload-Pfad)
- `trim` - kürzt den Dateinamen

- `imageSendTo` - zeigt das Bild, das vom Backend als Base64-String empfangen wurde
- „Breite“ – Breite des QR-Codes in px
- „height“ – Höhe des QR-Codes in px
- `Befehl` - sendTo-Befehl
- `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet.
- `data` - object - `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.

Beispiel für Code im Backend:

```
adapter.on('message', obj => {
    if (obj.command === 'send') {
        const QRCode = require('qrcode');
        QRCode.toDataURL('3ca4234a-fd81-fdb8-5584-08c732f70e4d', (err, url) =>
            obj.callback && adapter.sendTo(obj.from, obj.command, url, obj.callback));
    }
});
```

- `wählenSendenAn`

Zeigt das Dropdown-Menü mit den von der Instanz angegebenen Werten an.

- `Befehl` - sendTo-Befehl
- `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet.
- `data` - object - `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.
- „manual“ – manuelle Bearbeitung zulassen. Ohne Dropdown-Menü (wenn die Instanz offline ist). Standardmäßig „true“.
- `multiple` - Mehrfachauswahl
- `showAllValues` – Element anzeigen, auch wenn kein Label dafür gefunden wurde (mehrfach), Standard=`true`
- `noTranslation` - Beschriftung der Auswahl nicht übersetzen

Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss ein Array in der Form `[{"value": 1, "label": "one"}, ...]` sein.

- `alsoDependsOn` - bei Änderung welcher Attribute muss der Befehl erneut gesendet werden

```
adapter.on('message', obj => {
   if (obj) {
       switch (obj.command) {
           case 'command':
               if (obj.callback) {
                   try {
                       const { SerialPort } = require('serialport');
                       if (SerialPort) {
                           // read all found serial ports
                           SerialPort.list()
                               .then(ports => {
                                   adapter.log.info(`List of port: ${JSON.stringify(ports)}`);
                                   adapter.sendTo(obj.from, obj.command, ports.map(item => ({label: item.path, value: item.path})), obj.callback);
                               })
                               .catch(e => {
                                   adapter.sendTo(obj.from, obj.command, [], obj.callback);
                                   adapter.log.error(e)
                               });
                       } else {
                           adapter.log.warn('Module serialport is not available');
                           adapter.sendTo(obj.from, obj.command, [{label: 'Not available', value: ''}], obj.callback);
                       }
                   } catch (e) {
                       adapter.sendTo(obj.from, obj.command, [{label: 'Not available', value: ''}], obj.callback);
                   }
               }

               break;
       }
   }
});
```

- `autocompleteSendTo`

Zeigt die Autovervollständigungssteuerung mit den von der Instanz angegebenen Werten an.

- `Befehl` - sendTo-Befehl
- `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet.
- `data` - object - `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.
- „freeSolo“ – Setzen Sie „freeSolo“ auf „true“, damit das Textfeld einen beliebigen Wert enthalten kann.
- `alsoDependsOn` - bei Änderung welcher Attribute muss der Befehl erneut gesendet werden
- `maxLength` – maximale Länge des Textes im Feld

Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss ein Array in der Form `["value1", {"value": "value2", "label": "Value2"}, ...]` sein (Schlüssel müssen eindeutig sein). Siehe `selectSendTo` für ein Handlerbeispiel.

- `textSendTo`

Zeigt die schreibgeschützte Steuerung mit den von der Instanz angegebenen Werten an.

- „Container“ – Div, Text, HTML
- `copyToClipboard` - wenn wahr - Schaltfläche anzeigen
- `alsoDependsOn` - bei Änderung welcher Attribute muss der Befehl erneut gesendet werden
- `Befehl` - sendTo-Befehl
- `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet.
- `data` - object - `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.

Um diese Option zu verwenden, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss eine Zeichenfolge oder ein Objekt mit den folgenden Parametern sein:

```
{
    text: 'text to show',  // mandatory
    style: {color: 'red'}, // optional
    icon: 'search',        // optional. It could be base64 or link to image in the same folder as jsonConfig.json file
                           // possible predefined names: edit, rename, delete, refresh, add, search, unpair, pair, identify, play, stop, puase, forward, backward, next, previous, lamp, backlight, dimmer, socket, settings, group, user, qrcode, connection, no-connection, visible
    iconStyle: {width: 30} // optional
}
```

Beispiel:

```
adapter.on('message', obj => {
    if (obj) {
      switch (obj.command) {
        case 'command':
          obj.callback && adapter.sendTo(obj.from, obj.command, 'Received ' + JSON.stringify(obj.message), obj.callback);
          // or with style
          obj.callback && adapter.sendTo(obj.from, obj.command, { text: 'Received ' + JSON.stringify(obj.message), style: { color: 'red' }, icon: 'search', iconStyle: { width: 30 }}, obj.callback);
          // or as html
          obj.callback && adapter.sendTo(obj.from, obj.command, `<div style="color: green">${JSON.stringify(obj.message)}</div>`, obj.callback);
          break;
      }
    }
});
```

- `Koordinaten`

Ermittelt den aktuellen Standort und verwendet `system.config`-Koordinaten, falls dies nicht in der Form "Breitengrad,Längengrad" möglich ist

- `divider` - Trennzeichen zwischen Breitengrad und Längengrad. Standard "," (Wird verwendet, wenn longitudeName und latitudeName nicht definiert sind)
- `autoInit` - Feld mit aktuellen Koordinaten initialisieren, wenn leer
- `longitudeName` - wenn definiert, wird der Längengrad in diesem Attribut gespeichert, Teiler werden ignoriert
- `latitudeName` - wenn definiert, wird der Breitengrad in diesem Attribut gespeichert, Teiler werden ignoriert
- `useSystemName` - wenn definiert, wird das Kontrollkästchen "Systemeinstellungen verwenden" angezeigt und Breiten- und Längengrad werden aus `system.config` gelesen, ein Boolean wird unter dem angegebenen Namen gespeichert

- `Schnittstelle`

Wählt die Schnittstelle des Hosts aus, auf dem die Instanz läuft

- `ignoreLoopback` – Loopback-Schnittstelle nicht anzeigen (127.0.0.1)
- `ignoreInternal` - interne Schnittstellen nicht anzeigen (normalerweise ist es auch 127.0.0.1)

- `license` - zeigt die Lizenzinformationen an, wenn sie noch nicht akzeptiert wurden. Eines der Attribute `texts` oder `licenseUrl` muss definiert werden. Wenn die Lizenz akzeptiert wird, wird das definierte Konfigurationsattribut auf `true` gesetzt.
- `texts` - Array von Absätzen mit Texten, die jeweils als separater Absatz angezeigt werden
- `licenseUrl` – URL zur Lizenzdatei (z. B. https://raw.githubusercontent.com/ioBroker/ioBroker.docs/master/LICENSE)
- `title` - Titel des Lizenzdialogs
- `agreeText` - Text der vereinbarten Schaltfläche
- `checkBox` - Wenn definiert, wird das Kontrollkästchen mit dem angegebenen Namen angezeigt. Wenn aktiviert, wird die vereinbarte Schaltfläche aktiviert.

- `checkLicense` – Sehr spezielle Komponente zur Online-Überprüfung der Lizenz. Es werden genau die nativen Eigenschaften `license` und `useLicenseManager` benötigt.
- `uuid` – UUID prüfen
- `version` – Version prüfen

- `uuid` – Iobroker-UUID anzeigen

- `port` - Spezieller Eintrag für Ports. Es wird automatisch geprüft, ob der Port von anderen Instanzen verwendet wird und es wird eine Warnung angezeigt
- `min` - minimal zulässige Portnummer. Sie könnte 0 sein. Und wenn der Wert dann Null ist, wird die Prüfung, ob der Port belegt ist, nicht durchgeführt.

-

- „state“ – Kontrolle oder Informationen vom Staat anzeigen
- `oid` - Welche Objekt-ID soll zur Steuerung verwendet werden. Die ID ist ohne "adapter.X."-Präfix
- `system` - Wenn wahr, wird der Status von system.adapter.XX.I. und nicht von XX.I übernommen.
- „Steuerung“ – Wie der Wert des Status angezeigt werden soll: „Text“, „HTML“, „Eingabe“, „Schieberegler“, „Auswählen“, „Schaltfläche“, „Schalter“, „Zahl“
- `gesteuert` - Wenn wahr, wird der Status als Schalter, Auswahl, Schaltfläche, Schieberegler oder Texteingabe angezeigt. Wird nur verwendet, wenn keine Steuerungseigenschaft definiert ist
- „Einheit“ – Fügt dem Wert eine Einheit hinzu
- `trueText` - dieser Text wird angezeigt, wenn der Wert true ist
- `trueTextStyle` – Stil des Textes, wenn der Wert true ist
- `falseText` - dieser Text wird angezeigt, wenn der Wert false ist oder das Steuerelement eine „Schaltfläche“ ist.
- `falseTextStyle` - Stil des Textes, wenn der Wert false ist oder das Steuerelement eine „Schaltfläche“ ist
- `trueImage` - Dieses Bild wird angezeigt, wenn der Wert true ist
- `falseImage` - Dieses Bild wird angezeigt, wenn der Wert false ist oder das Steuerelement eine „Schaltfläche“ ist.
- „min“ – Mindestwert für Steuerelementtyp „Schieberegler“ oder „Zahl“
- „max“ – Maximalwert für Steuerelementtyp „Schieberegler“ oder „Zahl“
- „Schritt“ – Schrittwert für Steuerelementtyp „Schieberegler“ oder „Zahl“
- `controlDelay` - Verzögerung in ms für Schieberegler oder Zahl
- „Variante“ – Variante der Schaltfläche: „enthalten“, „umrandet“, „Text“

- `deviceManager` - Gerätemanager anzeigen. Dafür muss der Adapter das Gerätemanagerprotokoll unterstützen. Siehe iobroker/dm-utils.

Hier ist ein Beispiel, wie der Geräte-Manager in einer Registerkarte angezeigt wird:

```
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
Alle Typen könnten haben:

- „sm“ – Breite in 1/12 des Bildschirms auf kleinen Bildschirmen
- `md` - Breite in 1/12 des Bildschirms auf mittleren Bildschirmen
- `lg` - Breite in 1/12 des Bildschirms auf großen Bildschirmen
- `xs` - Breite in 1/12 des Bildschirms auf kleinen Bildschirmen
- `newLine` – sollte ab einer neuen Zeile angezeigt werden
- `label` – Zeichenfolge oder Objekt wie {en: 'Name', ru: 'Имя'}
- `hidden` - JS-Funktion, die `native.attribute` zur Berechnung verwenden könnte
- `hideOnlyControl` - wenn ausgeblendet, wird der Ort angezeigt, aber kein Steuerelement
- `disabled` - JS-Funktion, die `native.attribute` zur Berechnung verwenden könnte
- „Hilfe“ – Hilfetext (mehrsprachig)
- `helpLink` – href zur Hilfe (kann nur zusammen mit `help` verwendet werden)
- „style“ – CSS-Stil in ReactJS-Notation: „radiusBorder“ und nicht „radius-border“.
- `darkStyle` – CSS-Stil für den Dunkelmodus
- „validator“ – JS-Funktion: true, kein Fehler, false, Fehler
- `validatorErrorText` - Text, der angezeigt wird, wenn der Validator fehlschlägt
- `validatorNoSaveOnError` - Deaktivieren der Schaltfläche „Speichern“, wenn ein Fehler auftritt
- `tooltip` – optionaler Tooltip
- `default` - Standardwert
- `defaultFunc` – JS-Funktion zum Berechnen des Standardwerts
- `defaultSendTo` – Befehl zum Anfordern des Anfangswerts von der laufenden Instanz, Beispiel: `"myInstance": {"type": "text", "defaultSendTo": "fill"}`
- `data` – statische Daten
- `jsonData` – statische Daten
- wenn weder `data` noch `jsonData` definiert sind, werden die folgenden Informationen gesendet `{"attr": "<attribute name>", "value": "<current value>"}`
- „button“ – Schaltflächenbezeichnung zum erneuten Auslösen einer Anfrage von der Instanz
- „buttonTooltip“ – Button-Tooltip (Standard: „Daten nach Instanz anfordern“)
- `buttonTooltipNoTranslation` – Button-Tooltip nicht übersetzen
- `allowSaveWithError` – Ermöglicht das Speichern der Konfiguration, auch wenn die Instanz offline ist
- `placeholder` - Platzhalter (zur Textsteuerung)
- `noTranslation` - übersetzt keine Auswahlen oder andere Optionen (nicht für Hilfe, Beschriftung oder Platzhalter)
- `onChange` - Struktur in der Form `{"alsoDependsOn": ["attr1", "attr2"], "calculateFunc": "data.attr1 + data.attr2", "ignoreOwnChanges": true}`
- `doNotSave` - Dieses Attribut nicht speichern, da es nur für interne Berechnungen verwendet wird
- „noMultiEdit“ – wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nicht angezeigt, wenn der Benutzer mehr als ein Objekt zum Bearbeiten ausgewählt hat.
- `bestätigen`
- `Bedingung` - JS-Funktion: true Bestätigungsdialog anzeigen
- „Text“ – Text des Bestätigungsdialogs
- „Titel“ – Titel des Bestätigungsdialogs
- `ok` - Text für die OK-Schaltfläche
- `cancel` - Text für die Schaltfläche „Abbrechen“
- „Typ“ – Einer von: „Info“, „Warnung“, „Fehler“, „Keiner“
- `alsoDependsOn` – Array mit Attributen, um den Zustand auch anhand dieser Attribute zu prüfen

```
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
                    "validator": "'"!!data.name"'", // else error
                    "hidden": "data.myType === 1", // hidden if myType is 1
                    "disabled": "data.myType === 2" // disabled if myType is 2
                },
                "options.myType": { // name could support more than one levelhelperText
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
                }
            }
        },
        "tab2": {
            "label": "Tab2",
            "disabled": "data.myType === 1",
            "hidden": "data.myType === 2",
        }
    },
}
```

`Number`, `text`, `checkbox`, `select` unterstützen die automatische Vervollständigung, um die Auswahl von Optionen zu ermöglichen, wenn sie als benutzerdefinierte Einstellungen verwendet werden.
In diesem Fall wird der Wert als Array aller möglichen Werte bereitgestellt.

Beispiel:

```
...
   "timeout": {
      "type": "number",
      "label": "Timeout"
   }
...

data: {
   timeout: [1000, 2000, 3000]
}
```

In diesem Fall muss die Eingabe Text sein, wobei `__different__` angezeigt wird, mit der Autovervollständigungsoption von drei möglichen Werten.
Benutzer können aus der Dropdown-Liste 1000, 2000 oder 3000 auswählen oder einen eigenen neuen Wert eingeben, z. B. 500.

Boolesche Werte müssen unbestimmt sein, wenn der Wert [false, true] ist.

Für unveränderte `__different__` muss der Wert different zurückgegeben werden:

```
Input:
data: {
   timeout: [1000, 2000, 3000]
}

Output if timeout was not changed:
newData: {
   timeout: "__different__"
}
```

Der Wert `__different__` ist reserviert und kann von keiner Texteingabe vom Benutzer akzeptiert werden.

Komponente muss aussehen wie

```
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
- `Nummer` => Nummer
- Name „Bind“ => IP
- Name „Port“ => Nummer, min=1, max=0xFFFF
- Name „Timeout“ => Zahl, Hilfe „ms“

Wenn das Element kein Attribut `type` hat, wird davon ausgegangen, dass es den Standardtyp „Panel“ hat.

## Panel-Stil
Sie können auch Stile für Bedienfelder festlegen. Hier ist ein Beispiel mit Bedienfeldhintergrund:

```json
{
  "i18n": true,
  "type": "panel",
  "style": {
    "backgroundImage": "url(adapter/mpd/background.png)",
    "backgroundPosition": "top",
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "cover"
  },
  "items": {
    "...": {}
  }
}
```

## I18n
Es gibt mehrere Möglichkeiten, die Übersetzungen bereitzustellen.
Nur die erste ist mit unserem Community-Übersetzungstool Weblate kompatibel und sollte daher den anderen vorgezogen werden!

1. Benutzer können Texte aus Dateien bereitstellen.

Auf der obersten Ebene der Struktur `i18n: true` setzen und Dateien im Admin bereitstellen:

- `admin/i18n/de/translations.json`
- `admin/i18n/en/translations.json`
- ...

oder

- `admin/i18n/de.json`
- `admin/i18n/en.json`
- ...

Darüber hinaus kann der Benutzer den Pfad zu i18n-Dateien angeben, `i18n: "customI18n"`, und Dateien im Adminbereich bereitstellen:

- `admin/customI18n/de/translations.json`
- `admin/customI18n/en/translations.json`
- ...

oder

- `admin/customI18n/de.json`
- `admin/customI18n/en.json`
- ...

2. Der Benutzer kann Übersetzungen direkt im Etikett bereitstellen, wie:

```
{
   "type": "text",
   "label: {
        "en": "Label",
        "de": "Taxt"
    }
}
```

3. Der Benutzer kann Übersetzungen im i18n-Attribut bereitstellen:

```
{
    "18n": {
        "My Text: {
            "en": "My Text",
            "de": "Mein Text"
        },
        "My Text2: {
            "en": "My Text2",
            "de": "Mein Text2"
        },
    },
    "type": "panel",
    ...
}
```

Wir empfehlen, wenn möglich die Variante 1 zu verwenden, da die Texte dann mit Weblate bearbeitet werden können.

## JS-Funktionen
### Konfigurationsdialog
Die JS-Funktion ist:

```
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
  '_changed'       // indicator if some data was changed and must be saved
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data, systemConfig.common, instanceAlive, adapter.common, this.props.socket);

```

Ändert sich der Status `alive`, so müssen sämtliche Felder erneut aktualisiert, validiert, deaktiviert, ausgeblendet werden.

Die folgenden Variablen sind in der JS-Funktion in den Adaptereinstellungen verfügbar:

- „data“ – native Einstellungen für diese Instanz oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie „globalData“)
- `_system` – Systemkonfiguration
- `_alive` – ist die Instanz aktiv
- `_common` – allgemeine Einstellungen für diese Instanz
- `_socket` - Buchse
- `_instance` – Instanznummer
- „arrayIndex“ – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur in einer Tabellenzeile

### Dialogfeld „Benutzerdefinierte Einstellungen“
Die JS-Funktion ist:

```
const myValidator = "customObj.common.type === 'boolean' && data.options.myType == 2";

const func = new Function(
  'data',
  'originalData',
  '_system',
  'instanceObj',
  'customObj',
  '_socket',
  arrayIndex,
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data || this.props.data, this.props.originalData, this.props.systemConfig, instanceObj, customObj, this.props.socket);
```

Die folgenden Variablen sind in der JS-Funktion in benutzerdefinierten Einstellungen verfügbar:

- „data“ – aktuelle benutzerdefinierte Einstellungen oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie „globalData“)
- `originalData` - Unveränderte Daten
- `_system` – Systemkonfiguration
- `instanceObj` – Adapterinstanzobjekt
- `customObj` – aktuelles Objekt selbst
- `_socket` - Buchse
- „arrayIndex“ – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- `globalData` - wird nur in der Tabelle für alle Einstellungen verwendet und nicht nur in einer Tabellenzeile

## Benutzerdefinierte Komponente
```
<CustomInstancesEditor
    common={common data}
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

## Schema
Schema ist [Hier](https://github.com/ioBroker/adapter-react-v5/tree/master/schemas)