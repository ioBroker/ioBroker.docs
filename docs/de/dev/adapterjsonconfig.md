---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterjsonconfig.md
title: ioBroker JSON-Konfiguration
hash: uppBMIkpHsW8y+VZZeSZLFYEih0k4weQsKoeKGqWJHE=
---
# IoBroker JSON-Konfiguration
Admin (ab Version 6) unterstützt die JSON-Konfiguration für Adapter.
Es ist möglich, die Konfiguration in einer JSON-Datei zu definieren und sie dann in Admin zu verwenden.

Ein Beispiel für eine `jsonConfig.json`-Datei mit mehreren Registerkarten finden Sie hier: https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5 und ein Beispiel mit nur einem Panel hier: https:/ /github.com/ioBroker/ioBroker.dwd/blob/master/admin/jsonConfig.json

Sie können die Einstellungen im JSON- oder im JSON5-Format definieren. JSON5 ist besser lesbar und unterstützt Kommentare.

Zusätzlich zur JSON-Datei müssen Sie im Abschnitt `io-package.json` in `common` Folgendes definieren:

```json
...
"adminUI": {
  "config": "json"
}
...
```

Dies bedeutet, dass der Adapter die JSON-Konfiguration unterstützt.

Sie können fast alle Komponenten in Aktion sehen, wenn Sie diesen Adapter testen: https://github.com/mcm1957/ioBroker.jsonconfig-demo.
Sie können es über das GitHub-Symbol im Admin installieren, indem Sie `iobroker.jsonconfig-demo` auf der Registerkarte „npm“ eingeben.

Alle Beschriftungen, Texte und Hilfetexte können mehrsprachig oder nur Zeichenfolgen sein.

*Wenn der Attributname mit „_“ beginnt, wird er nicht im Objekt gespeichert.*

## Mögliche Kontrolltypen
Mögliche Typen:

- „Tabs“ – Tabs mit Elementen
  - `items` – Objekt mit Panels `{"tab1": {}, "tab2": {}...}`
  - „iconPosition“ – „bottom“, „end“, „start“ oder „top“. Nur für Panels mit dem Attribut „icon“. Standard: `start`

- „Panel“ – Registerkarte mit Elementen
  - „Symbol“ – die Registerkarte kann ein Symbol (base64 wie „data:image/svg+xml;base64,...“) oder „jpg/png“-Bilder (endet mit „.png“) enthalten.
  - `label` – Beschriftung der Registerkarte
  - `items` – Objekt `{"attr1": {}, "attr2": {}}...`
  - `collapsable` – nur möglich, wenn nicht Teil von tabs[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json)
  - „Farbe“ – Farbe des reduzierbaren Headers „primär“ oder „sekundär“ oder nichts

- `text` – Textkomponente
  - „maxLength“ – maximale Länge des Texts im Feld
  - „readOnly“ – schreibgeschütztes Feld
  - `trim` – Standard ist true. Setzen Sie dieses Attribut auf „false“, wenn eine Beschneidung nicht gewünscht ist.
  - „minRows“ – Standardwert ist 1. Setzen Sie dieses Attribut auf „2“ oder mehr, wenn Sie einen Textbereich mit mehr als einer Zeile haben möchten.
  - „maxRows“ – maximale Anzahl an Textzeilen. Wird nur verwendet, wenn „minRows“ > 1.

- „Nummer“.
  - „min“ – minimaler Wert
  - „max“ – Maximalwert
  - `Schritt` - Schritt

- „Farbe“ – Farbauswahl

- „Kontrollkästchen“ – Kontrollkästchen anzeigen

- „Slider“ – Slider anzeigen (nur Admin6)
  - `min` – (Standard 0)
  - „max“ – (Standard 100)
  - „Schritt“ – (Standard „(max – min) / 100“)
  - „Einheit“ – Einheit des Schiebereglers

- `ip` – Bindungsadresse
  - „listenOnAllPorts“ – 0.0.0.0 zur Option hinzufügen
  - „onlyIp4“ – zeigt nur IP4-Adressen an
  - „onlyIp6“ – zeigt nur IP6-Adressen an
  - „noInternal“ – interne IP-Adressen nicht anzeigen

- „Benutzer“ – Wählen Sie den Benutzer aus system.user aus. (Mit Farbe und Symbol)
  - „kurz“ – kein system.user.

- „Raum“ – Raum aus „enum.room“ auswählen (mit Farbe und Symbol) – (nur Admin6)
  - „kurz“ – kein „enum.rooms.“
  - „allowDeactivate“ – Ermöglicht das Leeren des Raums

- „func“ – Funktion aus „enum.func“ auswählen (mit Farbe und Symbol) – (nur Admin6)
  - „short“ – kein „enum.func.“
  - „allowDeactivate“ – erlaubt, dass die Funktionalität leer bleibt

- „auswählen“.
  - „Optionen“ – „[{label: {de: „option 1“}, Wert: 1}, ...]“ oder

                `[{"items": [{"label": "Val1", "value": 1}, {"label": "Val2", value: "2}], "name": "group1"}, {"items": [{"label": "Val3", "value": 3}, {"label": "Val4", value: "4}], "name": "group2"}, {"label": "Val5", "value": 5}]`

- „Autovervollständigung“.
  - `Optionen` - `["Wert1", "Wert2", ...]` oder `[{"Wert": "Wert", "Label": "Wert1"}, "Wert2", ...]`
  - „freeSolo“ – Setzen Sie „freeSolo“ auf „true“, damit das Textfeld jeden beliebigen Wert enthalten kann.

- „image“ – speichert das Bild als Datei des „adapter.X“-Objekts oder als base64 im Attribut
  - „Dateiname“ – Name der Datei ist Strukturname. Im folgenden Beispiel ist „login-bg.png“ der Dateiname für „writeFile("myAdapter.INSTANCE", "login-bg.png")`
  - „accept“ – HTML-Accept-Attribut, wie „image/*,.pdf“.
  - „maxSize“ – maximale Größe der hochzuladenden Datei
  - „base64“ – wenn true, wird das Bild als Daten-URL im Attribut gespeichert, andernfalls als Binärdatei im Dateispeicher
  - `!maxWidth`
  - `!maxHeight`
  - `!crop` – wenn wahr, erlaubt es dem Benutzer, das Bild zuzuschneiden
  - „!Quadrat“ – Breite muss gleich Höhe sein, sonst darf der Zuschnitt nur ein Quadrat als Form zulassen

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

- „objectId“ – Objekt-ID: mit Name, Farbe und Symbol anzeigen
    - „Typen“ – Gewünschter Typ: „Kanal“, „Gerät“, ... (hat standardmäßig nur „Status“). Es ist singulär, da „type“ bereits belegt ist.
    - „root“ – [optional] Zeigt nur dieses Root-Objekt und seine untergeordneten Objekte an
    - „customFilter“ – [optional] Kann nicht zusammen mit „Type“-Einstellungen verwendet werden. Beispiele

`{common: {custom: true}}` – nur Objekte mit einigen benutzerdefinierten Einstellungen anzeigen `{common: {custom: 'sql.0'}}` – nur Objekte mit benutzerdefinierten SQL.0-Einstellungen anzeigen (nur der spezifischen Instanz) `{common: {custom: '_dataSources'}}` – nur Objekte von Adaptern anzeigen §§SSSSS_5§ § oder `sql` oder `history` `{common: {custom: 'adapterName.'}}` – nur Objekte der benutzerdefinierten Einstellungen eines bestimmten Adapters anzeigen (alle Instanzen) `{type: 'channel'}` – nur Kanäle anzeigen `{type: ['channel', 'device']}` – nur Kanäle anzeigen und Geräte `{common: {type: 'number'}` - nur Zustände vom Typ 'Nummer' anzeigen `{common: {type: ['number', 'string']}` - nur Zustände vom Typ 'Nummer und Zeichenkette' anzeigen `{common: {role: 'switch']}` - nur Zustände mit Rollen ab Schalter anzeigen `{common: {role: ['switch', 'button]}` - Zeige nur Staaten mit Rollen beginnend mit `switch` und `button`

- „Passwort“ – Passwortfeld

Dieser Feldtyp hat lediglich Auswirkungen auf die Benutzeroberfläche.
Passwörter und andere sensible Daten sollten verschlüsselt gespeichert werden! Dazu muss der Schlüssel in der io-package.json unter [nativeEncrypted](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) bereitgestellt werden.
Darüber hinaus können Sie verhindern, dass diese Eigenschaft an andere Adapter als `admin` und `cloud` bereitgestellt wird, indem Sie sie zu `protectedNative` in der Datei `io-package.json` hinzufügen.

    - „Wiederholen“ – Wiederholungspasswort muss mit Passwort verglichen werden
    - „sichtbar“ – wahr, wenn die Anzeige des Passworts durch Umschalten der Ansichtsschaltfläche zulässig ist
    - „maxLength“ – maximale Länge des Texts im Feld

- „Instanz“.
    - „Adapter“ – Name des Adapters. Mit dem speziellen Namen „_dataSources“ können Sie alle Adapter mit dem Flag „common.getHistory“ abrufen.
    - „Adapter“ – optionale Liste der Adapter, die angezeigt werden sollen. Wenn nicht definiert, werden alle Adapter angezeigt. Nur aktiv, wenn das Attribut „Adapter“ nicht definiert ist.
    - „allowDeactivate“ – wenn wahr. Zusätzliche Option „Deaktivieren“ wird angezeigt
    - „onlyEnabled“ – wenn wahr. Es werden nur aktivierte Instanzen angezeigt
    - „long“ – der Wert sieht wie „system.adapter.ADAPTER.0“ und nicht wie „ADAPTER.0“ aus
    - „kurz“ – der Wert sieht wie „0“ und nicht wie „ADAPTER.0“ aus
    - „all“ – Zu den Optionen die Option „alle“ mit dem Wert „*“ hinzufügen

- „Chips“ – der Benutzer kann das Wort eingeben und es wird hinzugefügt (siehe Cloud => Dienste => Weiße Liste). Die Ausgabe ist ein Array, wenn kein „Trennzeichen“ definiert ist.
    - „Trennzeichen“ – wenn es definiert ist, wird die Option als String mit Trennzeichen statt als Array gespeichert. Beispielsweise erhalten Sie durch „delimiter=;“ „a;b;c“ anstelle von „['a', 'b', 'c']“.

- „lebendig“ – zeigt nur an, ob die Instanz aktiv ist und kann in „versteckt“ und „deaktiviert“ verwendet werden (wird nicht in der Konfiguration gespeichert)

  Nur Text: Instanz wird ausgeführt, Instanz wird nicht ausgeführt

    - „Instanz“ – prüfen Sie, ob die Instanz aktiv ist. Wenn nicht definiert, wird die aktuelle Instanz verwendet. Sie können im Text das Muster „${data.number}“ verwenden.
    - „textAlive“ – Standardtext ist „Instance %s is alive“, wobei %s durch „ADAPTER.0“ ersetzt wird.
    - „textNotAlive“ – Standardtext ist „Instanz %s ist nicht lebendig“, wobei %s durch „ADAPTER.0“ ersetzt wird.

- „Muster“ – schreibgeschütztes Feld mit Muster wie „https://${data.ip}:${data.port}“ (wird nicht in der Konfiguration gespeichert)

  Texteingabe mit der Nur-Lese-Flagge, die ein Muster zeigt.

    - „copyToClipboard“ – wenn wahr – Schaltfläche anzeigen
    - „Muster“ – mein Muster

- „sendto“ – Schaltfläche, die eine Anfrage an die Instanz sendet (https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128)
    - „Befehl“ – (Standard: „Senden“)
    - `jsonData` - string - `"{\"subject1\": \"${data.subject}\", \"options1\": {\"host\": \"${data.host}\" }}"`. Sie können die speziellen Variablen „data._origin“ und „data._originIp“ verwenden, um die Aufrufer-URL an die Instanz zu senden, z. B. „http://127.0.0.1:8081/admin“.
    - `data` – Objekt – `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides.
    - `result` - `{result1: {en: 'A'}, result2: {en: 'B'}}`
    - `error` - `{error1: {en: 'E'}, error2: {en: 'E2'}}`
    - „Variante“ – „enthalten“, „umrissen“ oder nichts
    - „openUrl“ – wenn wahr – URL in neuem Tab öffnen, wenn die Antwort das Attribut „openUrl“ enthält, wie „{“openUrl“: „http://1.2.3.4:80/aaa“, „window“: „_blank“ , „saveConfig“: true}`. Wenn „saveConfig“ wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern.
    - „reloadBrowser“ – wenn wahr – lädt das aktuelle Browserfenster neu, wenn die Antwort das Attribut „reloadBrowser“ enthält, wie „{“reloadBrowser“: true}“.
    - „Fenster“ – wenn „openUrl“ wahr ist, ist dies der Name des neuen Fensters. Könnte überschrieben werden, wenn die Antwort aus dem Attribut „Fenster“ besteht.

      `this.props.socket.sendTo(adapterName.instance, command || 'send', data, result => {});`

    - „Symbol“ – wenn das Symbol angezeigt werden soll: „Authentifizierung“, „Senden“, „Web“, „Warnung“, „Fehler“, „Info“, „Suche“. Sie können „base64“-Symbole (wie „data:image/svg+xml;base64,...“) oder „jpg/png“-Bilder (endet mit „.png“) verwenden. (Anfrage per Ausgabe, wenn Sie weitere Symbole benötigen)
    - „useNative“ – wenn der Adapter ein Ergebnis mit dem Attribut „native“ zurückgibt, wird es für die Konfiguration verwendet. Wenn „saveConfig“ wahr ist, wird der Benutzer aufgefordert, die Konfiguration zu speichern.
    - „showProcess“ – Spinner anzeigen, während die Anfrage ausgeführt wird
    - „timeout“ – Zeitüberschreitung für die Anfrage in ms. Standard: keine.
    - „onLoaded“ – führt die Schaltflächenlogik zunächst einmal aus

- „setState“ – Schaltfläche, die den Status der Instanz festlegt
    - `id` - `system.adapter.myAdapter.%INSTANCE%.test`, Sie können den Platzhalter `%INSTANCE%` verwenden, um ihn durch den aktuellen Instanznamen zu ersetzen
    - `ack` – false (Standard false)
    - `val` – '${data.myText}_test' oder Zahl. Der Typ wird automatisch anhand des Statustyps erkannt und die Konvertierung erfolgt ebenfalls
    - „okText“ – Warnung, die durch Drücken der Taste angezeigt wird
    - „Variante“ – „enthalten“, „umrissen“, „

- „staticText“ – statischer Text wie eine Beschreibung
    - „Label“ – mehrsprachiger Text
    - „Text“ – dasselbe wie Etikett

- „staticLink“ – statischer Link
    - „Label“ – mehrsprachiger Text
    - `href` – Link. Der Link könnte dynamisch sein wie „#tab-objects/customs/${data.parentId}“.
    - „Schaltfläche“ – zeigt einen Link als Schaltfläche an
    - „Variante“ – Art der Schaltfläche („umrissen“, „enthalten“, „Text“)
    - „Farbe“ – Farbe der Schaltfläche (z. B. „primär“)
    - „Symbol“ – wenn das Symbol angezeigt werden soll: „Authentifizierung“, „Senden“, „Web“, „Warnung“, „Fehler“, „Info“, „Suche“, „Buch“, „Hilfe“, „Hochladen“. . Sie können „base64“-Symbole (es beginnt mit „data:image/svg+xml;base64,...“) oder „jpg/png“-Bilder (endet mit „.png“) verwenden. (Anfrage per Ausgabe, wenn Sie weitere Symbole benötigen)

- „staticImage“ – statisches Bild
    - „href“ – optionaler HTTP-Link
    - `src` – Name des Bildes (aus dem Admin-Verzeichnis)

- „Tabelle“ – Tabelle mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können
    - `items` - `[{"type": siehe oben, "width": px oder %, "title": {"en": "header"}, "attr": "name", "filter": false , „sort“: true, „default“: „“}]`
    - „noDelete“ – boolescher Wert, wenn Löschen oder Hinzufügen deaktiviert ist. Wenn „noDelete“ falsch ist, sollten Hinzufügen, Löschen und Verschieben nach oben/unten funktionieren
    - `objKeyName` – (ältere Einstellung, nicht verwenden!) – Name des Schlüssels in `{"192.168.1.1": {delay: 1000, aktiviert: true}, "192.168.1.2": {delay: 2000, aktiviert: false}}`
    - `objValueName` – (ältere Einstellung, nicht verwenden!) – Name des Werts in `{"192.168.1.1": "value1", "192.168.1.2": "value2"}`
    - „allowAddByFilter“ – wenn das Hinzufügen erlaubt ist, auch wenn der Filter gesetzt ist
    - „showSecondAddAt“ – Anzahl der Zeilen, ab denen die zweite Schaltfläche zum Hinzufügen am Ende der Tabelle angezeigt wird. Standard 5
    - „showFirstAddOnTop“ – Zeigt die erste Plus-Schaltfläche oben in der ersten Spalte und nicht links an.
    - „Klonen“ – [optional] – wenn die Schaltfläche „Klonen“ angezeigt werden soll. Wenn „true“, wird die Schaltfläche „Klonen“ angezeigt. Bei einem Attributnamen ist dieser Name eindeutig.
    - „export“ – [optional] – wenn die Schaltfläche „Exportieren“ angezeigt werden soll. Als CSV-Datei exportieren.
    - „importieren“ – [optional] – wenn die Schaltfläche „Importieren“ angezeigt werden soll. Aus CSV-Datei importieren.
    - „uniqueColumns“ – [optional] – Geben Sie ein Array von Spalten an, die eindeutige Einträge haben müssen

- „Akkordeon“ – Akkordeon mit Elementen, die gelöscht, hinzugefügt, nach oben oder nach unten verschoben werden können (Admin 6.6.0 und neuer)
    - `items` - `[{"type": siehe oben, "attr": "name", "default": ""}]` - Elemente können wie auf einem `Panel` platziert werden (xs, sm, md, lg und newLine)
    - `titleAttr` – Schlüssel der Elementliste, der als Name verwendet werden soll
    - „noDelete“ – boolescher Wert, wenn Löschen oder Hinzufügen deaktiviert ist. Wenn „noDelete“ falsch ist, sollten Hinzufügen, Löschen und Verschieben nach oben/unten funktionieren
    - „Klonen“ – [optional] – wenn die Schaltfläche „Klonen“ angezeigt werden soll. Wenn „true“, wird die Schaltfläche „Klonen“ angezeigt. Bei einem Attributnamen ist dieser Name eindeutig.

- „jsonEditor“ – JSON-Editor

- „Sprache“ – Sprache auswählen
    - „system“ – Ermöglicht standardmäßig die Verwendung der Systemsprache aus „system.config“.

- „Zertifikat“.
    - „certType“ – einer von: „public“, „private“, „chained“. Aber ab 6.4.0 können Sie den Typ „Zertifikate“ verwenden.

- „Zertifikate“ – es handelt sich um einen universellen Typ, der die Attribute „certPublic“, „certPrivate“, „certChained“ und „leCollection“ für Sie verwaltet.

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

- „certCollection“ – Zertifikatssammlung auswählen oder einfach alle Sammlungen verwenden oder Let's Encrypt überhaupt nicht verwenden.

- „Benutzerdefiniert“ (nur Admin6)
    - „Name“ – Komponentenname, der über Requisiten bereitgestellt wird, wie ComponentInstancesEditor
    - „URL“ – Speicherort der Komponente
        - „custom/customComponents.js“: In diesem Fall werden die Dateien von „/adapter/ADAPTER_NAME/custom/customComponents.js“ geladen
        - „https://URL/myComponent“: direkt von der URL
        - „./adapter/ADAPTER_NAME/custom/customComponent.js“: In diesem Fall werden die Dateien von „/adapter/ADAPTER_NAME/custom/customComponents.js“ geladen
    - „i18n“ – wahr, wenn sich die Dateien „i18n/xx.json“ im selben Verzeichnis wie die Komponente oder das Übersetzungsobjekt „{"text1": {"en": Text1"}}` befinden

- „Teiler“ – horizontale Linie
    - „Höhe“ – optionale Höhe
    - „Farbe“ – optionale Trennfarbe oder „primär“, „sekundär“.

- „Kopfzeile“.
    - `Text`
    - `Größe` - 1-5 => h1-h5

- `cron`
    - „komplex“ – CRON mit „Minuten“, „Sekunden“ usw. anzeigen
    - „einfach“ – einfache CRON-Einstellungen anzeigen

- „fileSelector“ (nur Admin6)
    - „Muster“ – Dateierweiterungsmuster. Erlaubt ist, dass „**/*.ext“ auch alle Dateien aus Unterordnern anzeigt, „*.ext“ aus dem Stammordner oder „Ordnername/*.ext“, um alle Dateien im Unterordner „Ordnername“ anzuzeigen. Standardmäßig „**/*.*“.
    - „fileTypes“ – [optional] Dateityp: „Audio“, „Bild“, „Text“.
    - „objectID“ – Objekt-ID vom Typ „meta“. Sie können den speziellen Platzhalter „%INSTANCE%“ verwenden: wie „myAdapter.%INSTANCE%.files“.
    - „Upload“ – Pfad, in dem die hochgeladenen Dateien gespeichert werden. Wie „Ordnername“. Wenn nicht definiert, wird kein Upload-Feld angezeigt. Um im Stammverzeichnis hochzuladen, setzen Sie dieses Feld auf „/“.
    - „Aktualisieren“ – Schaltfläche „Aktualisieren“ neben der Auswahl anzeigen.
    - „maxSize“ – maximale Dateigröße (Standard 2 MB)
    - „withFolder“ – Ordnernamen anzeigen, auch wenn sich alle Dateien im selben Ordner befinden
    - „Löschen“ – Löschen von Dateien zulassen
    - „noNone“ – Option „none“ nicht anzeigen
    - „noSize“ – Größe der Dateien nicht anzeigen

- „Datei“ (nur Admin6)

  Eingabefeld mit Dateiauswahl

    - „disableEdit“ – wenn der Benutzer den Dateinamen manuell eingeben kann und nicht nur über den Auswahldialog
    - „limitPath“ – Auswahl auf ein bestimmtes Objekt vom Typ „Meta“ und folgenden Pfad beschränken (nicht obligatorisch)
    - „filterFiles“ – wie „[‘png‘, ‚svg‘, ‚bmp‘, ‚jpg‘, ‚jpeg‘, ‚gif‘]“.
    - „filterByType“ – „Bilder, Code, TXT, Audio, Video“.
    - „allowUpload“ – erlaubtes Hochladen von Dateien
    - „allowDownload“ – erlaubtes Herunterladen von Dateien (Standard: true)
    - „allowCreateFolder“ – erlaubt die Erstellung von Ordnern
    - „allowView“ – erlaubte Kachelansicht (Standard: true)
    - `showToolbar` – Symbolleiste anzeigen (Standard: true)
    - „selectOnlyFolders“ – Benutzer kann nur Ordner auswählen (z. B. für den Upload-Pfad)

- „imageSendTo“ – zeigt das Bild an, das vom Backend als Base64-String empfangen wurde
    - „Breite“ – Breite des QR-Codes in Pixel
    - „Höhe“ – Höhe des QR-Codes in Pixel
    - „Befehl“ – sendTo-Befehl
    - `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet
    - `data` – Objekt – `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.

  Beispielcode im Backend:

```
adapter.on('message', obj => {
    if (obj.command === 'send') {
        const QRCode = require('qrcode');
        QRCode.toDataURL('3ca4234a-fd81-fdb8-5584-08c732f70e4d', (err, url) =>
            obj.callback && adapter.sendTo(obj.from, obj.command, url, obj.callback));
    }
});
```

- `selectSendTo`

  Zeigt das Dropdown-Menü mit den von der Instanz angegebenen Werten an.

    - „Befehl“ – sendTo-Befehl
    - `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet
    - `data` – Objekt – `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.
    - „manuell“ – manuelle Bearbeitung zulassen. Ohne Dropdown-Menü (wenn die Instanz offline ist). Standardwert „true“.
    - „multiple“ – Multiple-Choice-Auswahl
    - „showAllValues“ – Element anzeigen, auch wenn keine Bezeichnung dafür gefunden wurde (bei mehreren), Standard = „true“.
    - „noTranslation“ – Beschriftung von Auswahlen nicht übersetzen

Um diese Option nutzen zu können, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss ein Array in der Form `[{"value": 1, "label": "one"}, ...]` sein.

    - „alsoDependsOn“ – bei Änderung der Attribute muss der Befehl erneut gesendet werden

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

  Zeigt die Autovervollständigungssteuerung mit den aus den Instanzwerten angegebenen Werten an.

  - „Befehl“ – sendTo-Befehl
  - `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet
  - `data` – Objekt – `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.
  - „freeSolo“ – Setzen Sie „freeSolo“ auf „true“, damit das Textfeld jeden beliebigen Wert enthalten kann.
  - „alsoDependsOn“ – bei Änderung der Attribute muss der Befehl erneut gesendet werden
  - „maxLength“ – maximale Länge des Texts im Feld

Um diese Option nutzen zu können, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss ein Array in der Form `["value1", {"value": "value2", "label": "Value2"}, ...]` sein. Siehe `selectSendTo` für ein Beispiel für einen Handler

- `textSendTo`

  Zeigt die schreibgeschützte Steuerung mit den von der Instanz angegebenen Werten an.

  - „Container“ – div, Text
  - „copyToClipboard“ – wenn wahr – Schaltfläche anzeigen
  - „alsoDependsOn“ – bei Änderung der Attribute muss der Befehl erneut gesendet werden
  - „Befehl“ – sendTo-Befehl
  - `jsonData` - string - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. Diese Daten werden an das Backend gesendet
  - `data` – Objekt – `{"subject1": 1, "data": "static"}`. Sie können jsonData oder data angeben, aber nicht beides. Diese Daten werden an das Backend gesendet, wenn jsonData nicht definiert ist.

Um diese Option nutzen zu können, muss Ihr Adapter einen Nachrichtenhandler implementieren: Das Ergebnis des Befehls muss eine Zeichenfolge sein.

```
adapter.on('message', obj => {
    if (obj) {
      switch (obj.command) {
        case 'command':
          obj.callback && adapter.sendTo(obj.from, obj.command, 'Received ' + JSON.stringify(obj.message), obj.callback);
          break;
      }
    }
});
```

- „Koordinaten“.

  Ermittelt den aktuellen Standort und die verwendeten `system.config`-Koordinaten, falls nicht möglich in der Form „Breitengrad, Längengrad“

  - „Teiler“ – Teiler zwischen Breiten- und Längengrad. Standard "," (Wird verwendet, wenn „longitudeName“ und „latitudeName“ nicht definiert sind)
  - „autoInit“ – Init-Feld mit aktuellen Koordinaten, falls leer
  - „longitudeName“ – falls definiert, wird der Längengrad in diesem Attribut gespeichert, der Teiler wird ignoriert
  - `latitudeName` – falls definiert, wird der Breitengrad in diesem Attribut gespeichert, der Teiler wird ignoriert
  - `useSystemName` – falls definiert, wird das Kontrollkästchen mit „Systemeinstellungen verwenden“ angezeigt und Breiten- und Längengrad werden aus system.config gelesen, ein boolescher Wert wird unter dem angegebenen Namen gespeichert

- „Schnittstelle“.

  Wählt die Schnittstelle des Hosts aus, auf dem die Instanz ausgeführt wird

  - „ignoreLoopback“ – Loopback-Schnittstelle nicht anzeigen (127.0.0.1)
  - „ignoreInternal“ – interne Schnittstellen nicht anzeigen (normalerweise ist es auch 127.0.0.1)

- „Lizenz“ – zeigt die Lizenzinformationen an, sofern diese nicht bereits akzeptiert wurden. Eines der Attribute „texts“ oder „licenseUrl“ muss definiert sein. Wenn die Lizenz akzeptiert wird, wird das definierte Konfigurationsattribut auf „true“ gesetzt.
  - „Texte“ – Array von Absätzen mit Texten, die jeweils als separater Absatz angezeigt werden
  - „licenseUrl“ – URL zur Lizenzdatei (z. B. https://raw.githubusercontent.com/ioBroker/ioBroker.docs/master/LICENSE)
  - `title` – Titel des Lizenzdialogs
  - „agreeText“ – Text der vereinbarten Schaltfläche
  - „checkBox“ – Falls definiert, wird das Kontrollkästchen mit dem angegebenen Namen angezeigt. Wenn diese Option aktiviert ist, wird die vereinbarte Schaltfläche aktiviert.

- „checkLicense“ – Ganz spezielle Komponente zur Online-Überprüfung der Lizenz. Es sind genau die Eigenschaften „license“ und „useLicenseManager“ in nativer Ausführung erforderlich.
  - `uuid` – UUID prüfen
  - „Version“ – Version prüfen

- `uuid` – Iobroker-UUID anzeigen
- „Port“ – Spezielle Eingabe für Ports. Es prüft automatisch, ob der Port von anderen Instanzen verwendet wird, und zeigt eine Warnung an

**Hinweis: Mit „!“ gekennzeichnete Attribute oder Steuerelemente sind noch nicht implementiert.**

## Gemeinsame Attribute von Steuerelementen
Alle Typen könnten Folgendes haben:

- „sm“ – Breite in 1/12 des Bildschirms auf kleinem Bildschirm
- „md“ – Breite in 1/12 des Bildschirms auf mittleren Bildschirmen
- „lg“ – Breite in 1/12 des Bildschirms auf großen Bildschirmen
- „xs“ – Breite in 1/12 des Bildschirms auf sehr kleinen Bildschirmen
- „newLine“ – sollte ab der neuen Zeile angezeigt werden
- `label` – String oder Objekt wie {en: 'Name', ru: 'Имя'}
- „versteckt“ – JS-Funktion, die „native.attribute“ zur Berechnung verwenden könnte
- `hideOnlyControl` – wenn ausgeblendet, wird der Ort angezeigt, aber keine Kontrolle
- „deaktiviert“ – JS-Funktion, die „native.attribute“ zur Berechnung verwenden könnte
- „Hilfe“ – Hilfetext (mehrsprachig)
- „helpLink“ – href zur Hilfe (konnte nur zusammen mit „help“ verwendet werden)
- „style“ – CSS-Stil in ReactJS-Notation: „radiusBorder“ und nicht „radius-border“.
- „darkStyle“ – CSS-Stil für den Dunkelmodus
- „Validator“ – JS-Funktion: wahr, kein Fehler, falsch – Fehler
- „validatorErrorText“ – Text, der angezeigt wird, wenn der Validator fehlschlägt
- „validatorNoSaveOnError“ – Deaktivieren Sie die Schaltfläche „Speichern“, wenn ein Fehler auftritt
- „Tooltip“ – optionaler Tooltip
- „default“ – Standardwert
- „defaultFunc“ – JS-Funktion zur Berechnung des Standardwerts
- „defaultSendTo“ – Befehl zum Anfordern des Anfangswerts von der laufenden Instanz, Beispiel: „myInstance“: {“type“: „text“, „defaultSendTo“: „fill“}`
  - „Daten“ – statische Daten
  - „jsonData“ – statische Daten
  - Wenn keine „Daten“ und „jsonData“ definiert sind, werden die folgenden Informationen gesendet: „{“attr“: „<Attributname>“, „Wert“: „<aktueller Wert>“}“.
  - „Schaltfläche“ – Schaltflächenbezeichnung zum erneuten Auslösen einer Anfrage von der Instanz
  - „buttonTooltip“ – Schaltflächen-Tooltip (Standard: „Daten nach Instanz anfordern“)
  - `buttonTooltipNoTranslation` – Schaltflächen-Tooltip nicht übersetzen
- „Platzhalter“ – Platzhalter (zur Textsteuerung)
- „noTranslation“ – Auswahlen oder andere Optionen nicht übersetzen (nicht für Hilfe, Beschriftung oder Platzhalter)
- `onChange` – Struktur in Form `{"alsoDependsOn": ["attr1", "attr2], "calculateFunc": "attr1 + attr2", "ignoreOwnChanges": true}`
- „doNotSave“ – Dieses Attribut nicht speichern, da es nur für interne Berechnungen verwendet wird
- „noMultiEdit“ – wenn dieses Flag auf „true“ gesetzt ist, wird dieses Feld nicht angezeigt, wenn der Benutzer mehr als ein Objekt zum Bearbeiten ausgewählt hat.
- „Bestätigen“.
  - „Bedingung“ – JS-Funktion: True, Bestätigungsdialog anzeigen
  - `text` – Text des Bestätigungsdialogs
  - `title` – Titel des Bestätigungsdialogs
  - „ok“ – Text für die Schaltfläche „OK“.
  - „Abbrechen“ – Text für die Schaltfläche „Abbrechen“.
  - „Typ“ – Einer von: „Info“, „Warnung“, „Fehler“, „Keine“.
  - „alsoDependsOn“ – Array mit Attributen, um den Zustand auch anhand dieser Attribute zu überprüfen

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

In diesem Fall muss die Eingabe Text sein, sofern angezeigt `__different__`, mit der Option zur automatischen Vervollständigung von 3 möglichen Werten.
Benutzer können aus der Dropdown-Liste 1000, 2000 oder 3000 auswählen oder ihren eigenen neuen Wert eingeben, z. B. 500.

Boolescher Wert muss unbestimmt unterstützen, wenn der Wert [falsch, wahr] ist.

Für nicht geänderte `__different__` muss der Wert different zurückgegeben werden:

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

Das Bauteil muss so aussehen

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
- Name `bind` => ip
- Name „Port“ => Nummer, min=1, max=0xFFFF
- Name `timeout` => Zahl, help="ms"

Wenn das Element kein Attribut `type` hat, wird davon ausgegangen, dass es den Standardtyp „Panel“ hat.

## Panel-Stil
Sie können auch Paneelen Stil verleihen. Hier ist ein Beispiel mit Panel-Hintergrund:

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
Nur das erste ist mit unserem Community-Übersetzungstool Weblate kompatibel und sollte daher den anderen vorgezogen werden!

1. Benutzer können Texte aus Dateien bereitstellen.

Legen Sie auf der obersten Strukturebene `i18n: true` fest und stellen Sie Dateien im Admin bereit:

- `admin/i18n/de/translations.json`
- `admin/i18n/en/translations.json`
- ...

oder

- `admin/i18n/de.json`
- `admin/i18n/en.json`
- ...

Darüber hinaus kann der Benutzer den Pfad zu i18n-Dateien angeben, `i18n: "customI18n"`und Dateien im Administrator angeben:

- `admin/customI18n/de/translations.json`
- `admin/customI18n/en/translations.json`
- ...

oder

- `admin/customI18n/de.json`
- `admin/customI18n/en.json`
- ...

2. Der Benutzer kann Übersetzungen direkt im Etikett bereitstellen, wie zum Beispiel:

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

Wir empfehlen Variante 2 zu verwenden, da eine Bearbeitung der Texte mit Weblate möglich sein wird.

## JS-Funktionen
### Konfigurationsdialog
JS-Funktion ist:

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

Ändert sich der `alive` Status, so müssen alle Felder neu aktualisiert, validiert, deaktiviert, ausgeblendet werden.

Die folgenden Variablen sind in der JS-Funktion in den Adaptereinstellungen verfügbar:

- „Daten“ – native Einstellungen für diese Instanz oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `_system` – Systemkonfiguration
- „_alive“ – ist die lebendige Instanz
- „_common“ – allgemeine Einstellungen für diese Instanz
- `_socket` – Sockel
- `_instance` – Instanznummer
- „arrayIndex“ – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- „globalData“ – wird nur in der Tabelle für alle Einstellungen und nicht nur in einer Tabellenzeile verwendet

### Dialogfeld „Benutzerdefinierte Einstellungen“.
JS-Funktion ist:

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

- „Daten“ – aktuelle benutzerdefinierte Einstellungen oder aktuelle Zeile in der Tabelle (um auf alle Einstellungen zuzugreifen, verwenden Sie globalData)
- `originalData` – Unveränderte Daten
- `_system` – Systemkonfiguration
- „instanceObj“ – Adapterinstanzobjekt
- „customObj“ – aktuelles Objekt selbst
- `_socket` – Sockel
- „arrayIndex“ – wird nur in Tabellen verwendet und stellt die aktuelle Zeile in einem Array dar
- „globalData“ – wird nur in der Tabelle für alle Einstellungen und nicht nur in einer Tabellenzeile verwendet

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

Beispiele finden Sie im [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) oder in [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) Adapter.

## Schema
Schema ist [Hier](https://github.com/ioBroker/adapter-react-v5/tree/master/schemas)