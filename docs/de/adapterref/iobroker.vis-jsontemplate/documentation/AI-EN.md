---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md
title: KI-gestützte Vorlagenerstellung
hash: pvDjgC9ngKq1lMCG/GmAswpzxrhMWtvfPNc0X60RQCM=
---
# KI-gestützte Vorlagenerstellung

Der _ioBroker.vis-jsontemplate-_ Adapter zeigt JSON-Daten in VIS oder VIS-2 mithilfe einer Vorlage an. Eine Vorlage kann HTML-, CSS-, JavaScript- und EJS-Ausdrücke kombinieren.

KI kann bei der Erstellung solcher Vorlagen helfen. Es ist entscheidend, die Anforderungen so genau wie möglich zu beschreiben.

## Welche Informationen benötigt die KI?

Fügen Sie nach Möglichkeit die folgenden Elemente in Ihre Aufgabenstellung ein:

### 1. Aufgabe

Beschreiben Sie kurz, was angezeigt werden soll.

Beispiele:

- Wetterdaten als Karten
- Eine Geräteliste als Tabelle
- Termine als Liste
- Sensordaten als Dashboard

### 2. Beispieldaten

Fügen Sie ein realistisches Beispiel für den JSON-Datenpunkt hinzu.

```json
{
    "devices": [
        {
            "name": "Living Room",
            "temperature": 22.4,
            "online": true
        }
    ]
}
```

Ohne Beispieldaten muss die KI die Datenstruktur erraten.

### 3. Gewünschte Darstellung

Beschreiben Sie das Layout und die wichtigsten Inhalte.

Beispiele:

- Responsive Karten
- Tabelle mit drei Spalten
- Große Temperaturanzeige
- Online-Geräte grün, Offline-Geräte grau
- Geeignet für Smartphones und Tablets

### 4. Funktionen

Beschreiben Sie, ob die Vorlage nur Daten anzeigen oder auch Aktionen ermöglichen soll.

Beispiele:

- Filterliste
- Einträge sortieren
- Eine Schaltfläche anzeigen
- Datenpunkt ändern über`vis.setValue()`
- Daten über einen Adapter abrufen

### 5. Technische Spezifikationen

Die KI sollte folgende Regeln beachten:

- Die Vorlage verwendet EJS.
- Der JSON-Inhalt wird gespeichert in`data` Variable.
- Weitere Datenpunkte sind verfügbar in`dp` Die
- Die JavaScript-Ausgabe wird beispielsweise mit folgendem Verfahren generiert:`<%- data.value %>` Die
- Schleifen und bedingte Anweisungen werden platziert innerhalb`<% ... %>` Die
- Prüfen Sie vor dem Zugriff auf optionale Werte oder Arrays, ob diese vorhanden sind.
- VIS interpretiert`{...}` Datenpunktbindung in einer einzigen Zeile. Daher sollten öffnende und schließende geschweifte Klammern, die Zeichen enthalten, niemals in derselben Zeile stehen. Setzen Sie sie immer in separate Zeilen. Leere Klammern (`{}` ) sind erlaubt.
- Vermeiden Sie Quantifizierer in regulären Ausdrücken (`{2}` ,`{1,2}` ,`{4}` , ...). Schreiben Sie sie ohne geschweifte Klammern um, z. B.`\d{2}` →`\d\d` ,`\d{1,2}` →`\d\d?` ,`\d{4}` →`\d\d\d\d` Die
- Nicht verwenden`setInterval()` Die
- Verwenden`setTimeout()` stattdessen für sich wiederholende Prozesse.
- Das Ergebnis muss direkt kopierbar sein in die`json_template` Feld.
- Wenn Sie Daten von einer EJS-Vorlage an browserseitiges JavaScript übergeben müssen, serialisieren Sie die Daten nicht. Verwenden Sie stattdessen eine globale Variable innerhalb der Vorlage.`window` Wählen Sie einen Namensraum und einen eindeutigen Variablennamen, um Interferenzen mit anderen Skripten zu vermeiden.

## Vorlage für eine KI-Aufforderung

Kopieren Sie die folgende Eingabeaufforderung und ersetzen Sie den Text in den eckigen Klammern.

```text
Create a complete template for the ioBroker widget
"JSON Template" from the vis-jsontemplate adapter.

TASK
[Describe what should be displayed.]

JSON EXAMPLE

[Insert the complete example data here.]

VISUALS
[Describe layout, colors, sizes, and desired elements.]

FUNCTIONS
[Describe filters, sorting, buttons, or other functions.
If no interaction is required, write: Display only.]

### TECHNICAL SPECIFICATIONS

- Use HTML, CSS, JavaScript, and EJS only as necessary.
- The JSON data is located in the `data` variable.
- Use `<%- ... %>` to output values.
- Use `<% ... %>` for loops and conditions.
- Check for the existence of optional values or arrays before accessing them.
- Do not use external libraries.
- Do not use `setInterval()`.
- VIS interprets `{...}` on a single line as a data point binding. Therefore,
  never place opening and closing curly braces containing any characters on
  the same line. Always put them on separate lines. Empty braces (`{}`) are
  allowed.
- Avoid regular expression quantifiers (`{2}`, `{1,2}`, `{4}`, ...). Rewrite
  them without curly braces, e.g. `\d{2}` → `\d\d`, `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Limit CSS and JavaScript to this widget. Use the widget ID
  `#<%- widgetid %>` for this purpose.
- The result must be directly insertable into the `json_template` field.
- If you need to pass data from an EJS template to browser-side JavaScript,
  do not serialize the data. Instead, use a global variable within the
  `window` namespace and choose a highly unique variable name to avoid
  interference from other scripts.

OUTPUT FORMAT

1. First, output only the complete template within a code block.
2. Then, briefly explain the key sections.
3. Next, list the required widget settings and additional
   data points.
4. Do not invent fields that are not included in the JSON example.
```

## Beispielaufforderung

Beispiele verschiedener KI-Anbieter:

![KI-Beispiele](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/ai-examples.png)

```text

Create a complete template for the ioBroker widget
"JSON Template" from the vis-jsontemplate adapter. TASK
Display a list of rooms with their temperature and online status.

JSON EXAMPLE

{
  "devices": [
    {
      "name": "Living Room",
      "temperature": 22.4,
      "online": true
    },
    {
      "name": "Bedroom",
      "temperature": 19.8,
      "online": false
    }
  ]
}

### VISUALIZATION

Each room should be displayed as a compact card. The room name appears
at the top, with the temperature displayed in a large font below it. Online devices
get a green status dot; offline devices get a gray status dot. The cards
should automatically adjust to the available width.

### FUNCTIONS

Display only.

### TECHNICAL REQUIREMENTS

- Use HTML, CSS, JavaScript, and EJS only as necessary.
- The JSON data is contained in the variable `data`.
- Use `<%- ... %>` to output values.
- Use `<% ... %>` for loops and conditional statements.
- Check if `data.devices` exists and is an array.
- If data is missing, display the text "No device data available".
- Do not use external libraries.
- Do not use `setInterval()`.
- VIS interprets `{...}` on a single line as a data point binding. Therefore,
  never place opening and closing curly braces containing any characters on
  the same line. Always put them on separate lines. Empty braces (`{}`) are
  allowed.
- Avoid regular expression quantifiers (`{2}`, `{1,2}`, `{4}`, ...). Rewrite
  them without curly braces, e.g. `\d{2}` → `\d\d`, `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Scope the CSS to `#<%- widgetid %>`.
- The result must be suitable for direct insertion into the `json_template` field.
- If you need to pass data from an EJS template to browser-side JavaScript,
  do not serialize the data. Instead, use a global variable within the
  `window` namespace and choose a highly unique variable name to avoid
  interference from other scripts.

### OUTPUT FORMAT

1. Complete template in a code block
2. Brief explanation
3. Required widget settings
```

## Erläuterung der Beispielaufgabe

### Aufgabe

Dieser Abschnitt definiert das funktionale Ziel der KI, damit diese erkennen kann, welche Informationen relevant sind.

### JSON-Beispiel

Das Beispiel definiert die tatsächliche Datenstruktur. Dadurch kann die KI erkennen, dass sie iterieren muss über`data.devices` und Zugriffseigenschaften wie`device.name` Die

### Präsentation

Dieser Abschnitt beschreibt das Layout und die visuellen Regeln. Je genauer dieser Abschnitt ist, desto weniger Designannahmen muss die KI treffen.

### Funktionen

Dieser Abschnitt unterscheidet zwischen einer einfachen Anzeige und einer interaktiven Vorlage. Interaktive Funktionen erfordern in der Regel zusätzliches JavaScript und gegebenenfalls weitere Datenpunkte.

### Technische Spezifikationen

Diese Regeln verhindern häufige Fehler in VIS und dem Adapter. Zu den wichtigsten Anforderungen gehören die korrekte Verwendung von EJS-Tags, korrekt definiertes CSS und die Vermeidung der Verwendung von`setInterval()` Die

### Ausgabeformat

Dies legt fest, dass die KI zunächst einen sofort einsatzbereiten Codeblock bereitstellen und alle ergänzenden Erklärungen davon trennen soll.

## Richtlinien zur Überprüfung

KI-generierter Code sollte vor dem Einsatz in einer Produktionsumgebung überprüft werden:

- Stimmen alle Feldnamen mit den JSON-Datenpunkten überein?
- Werden fehlende oder leere Werte korrekt behandelt?
- Ist das CSS auf das aktuelle Widget beschränkt?
- Vermeidet der Code die Annahme, dass nicht existierende Datenpunkte oder Funktionen vorhanden sind?
- Vermeidet der Code die Verwendung von`setInterval()` ?
- Funktioniert die Vorlage mit den bereitgestellten Beispieldaten?

Im Fehlerfall reicht es nicht aus, der KI lediglich mitzuteilen, dass die Vorlage nicht funktioniert. Hilfreicher ist es, die genaue Fehlermeldung, die tatsächlichen JSON-Daten und die bisher generierte Vorlage anzugeben.