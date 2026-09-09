---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
---
# Templates mit KI erstellen

Der Adapter _ioBroker.vis-jsontemplate_ stellt JSON-Daten in VIS oder VIS-2
mithilfe eines Templates dar. Ein Template kann HTML, CSS, JavaScript
und EJS-Ausdrücke kombinieren.

Eine KI kann beim Erstellen solcher Templates helfen. Entscheidend ist,
dass die Anforderungen möglichst konkret beschrieben werden.

## Welche Informationen benötigt die KI?

Ergänze im Prompt möglichst diese Bestandteile:

### 1. Aufgabe

Beschreibe kurz, was dargestellt werden soll.

Beispiele:

- Wetterdaten als Karten
- eine Geräteliste als Tabelle
- Termine als Liste
- Sensordaten als Dashboard

### 2. Beispieldaten

Füge ein möglichst realistisches Beispiel des JSON-Datenpunkts ein.

```json
{
    "devices": [
        {
            "name": "Wohnzimmer",
            "temperature": 22.4,
            "online": true
        }
    ]
}
```

Ohne Beispieldaten muss die KI die Datenstruktur erraten.

### 3. Gewünschte Darstellung

Beschreibe das Layout und die wichtigsten Inhalte.

Beispiele:

- responsive Karten
- Tabelle mit drei Spalten
- große Temperaturanzeige
- Online-Geräte grün, Offline-Geräte grau
- für Smartphone und Tablet geeignet

### 4. Funktionen

Beschreibe, ob das Template nur Daten anzeigen oder auch Aktionen ermöglichen soll.

Beispiele:

- Liste filtern
- Einträge sortieren
- Schaltfläche anzeigen
- Datenpunkt über vis.setValue() ändern
- Daten über einen Adapter abrufen

### 5. Technische Vorgaben

Die KI sollte folgende Regeln beachten:

- Das Template verwendet EJS.
- Der JSON-Inhalt steht in der Variable `data`.
- Zusätzliche Datenpunkte stehen in `dp`.
- JavaScript-Ausgaben erfolgen beispielsweise mit `<%- data.value %>`.
- Schleifen und Bedingungen stehen in `<% ... %>`.
- Prüfe vor dem Zugriff, ob optionale Werte oder Arrays vorhanden sind.
- VIS interpretiert `{...}` innerhalb einer Zeile als Datenpunkt-Binding.
  Deshalb dürfen öffnende und schließende geschweifte Klammern mit beliebigem
  Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer in
  getrennte Zeilen. Leere Klammern (`{}`) sind erlaubt.
- Verwende keine Regex-Quantifizierer wie `{2}`, `{1,2}` oder `{4}`.
  Schreibe sie stattdessen ohne geschweifte Klammern, z. B.
  `\d{2}` → `\d\d`,
  `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- `setInterval()` darf nicht verwendet werden.
- Bei wiederholten Abläufen soll stattdessen `setTimeout()` eingesetzt werden.
- Das Ergebnis soll direkt in das Feld `json_template` kopierbar sein.
- Wenn Daten von einem EJS-Template an das clientseitige JavaScript übergeben
  werden sollen, sollten die Daten nicht serialisiert werden.
  Verwende stattdessen eine globale Variable im `window`-Namensraum und wähle
  einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten
  zu vermeiden.

## Vorlage für einen KI-Prompt

Kopiere den folgenden Prompt und ersetze die Texte in eckigen Klammern.

```text
Erstelle ein vollständiges Template für das ioBroker-Widget
„JSON Template“ aus dem Adapter vis-jsontemplate.

AUFGABE
[Beschreibe, was angezeigt werden soll.]

JSON-BEISPIEL

[Hier die vollständigen Beispieldaten einfügen.]


DARSTELLUNG
[Beschreibe Layout, Farben, Größen und gewünschte Elemente.]

FUNKTIONEN
[Beschreibe Filter, Sortierung, Schaltflächen oder andere Funktionen.
Falls keine Interaktion erforderlich ist, schreibe: Nur Anzeige.]

### TECHNISCHE VORGABEN

- Verwende HTML, CSS, JavaScript und EJS nur soweit erforderlich.
- Die JSON-Daten befinden sich in der Variable `data`.
- Verwende `<%- ... %>` für die Ausgabe von Werten.
- Verwende `<% ... %>` für Schleifen und Bedingungen.
- Prüfe vor dem Zugriff, ob optionale Werte oder Arrays vorhanden sind.
- Verwende keine externen Bibliotheken.
- Verwende kein `setInterval()`.
- VIS interpretiert `{...}` innerhalb einer Zeile als Datenpunkt-Binding.
  Deshalb dürfen öffnende und schließende geschweifte Klammern mit beliebigem
  Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer in
  getrennte Zeilen. Leere Klammern (`{}`) sind erlaubt.
- Verwende keine Regex-Quantifizierer wie `{2}`, `{1,2}` oder `{4}`.
  Schreibe sie stattdessen ohne geschweifte Klammern, z. B.
  `\d{2}` → `\d\d`,
  `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Begrenze CSS und JavaScript auf dieses Widget. Nutze dazu die Widget-ID
  `#<%- widgetid %>`.
- Das Ergebnis muss direkt in das Feld `json_template` eingefügt werden können.
- Wenn Daten von einem EJS-Template an das clientseitige JavaScript übergeben
  werden sollen, sollten die Daten nicht serialisiert werden.
  Verwende stattdessen eine globale Variable im `window`-Namensraum und wähle
  einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten
  zu vermeiden.

AUSGABEFORMAT

1. Gib zuerst ausschließlich das vollständige Template in einem Codeblock aus.
2. Erkläre danach kurz die wichtigsten Bereiche.
3. Nenne anschließend die erforderlichen Widget-Einstellungen und zusätzlichen
   Datenpunkte.
4. Erfinde keine Felder, die nicht im JSON-Beispiel enthalten sind.
```

## Beispielprompt

Beispiele verschiedener KI-Anbieter:

![KI Beispiele](ai-examples.png)

```text
Erstelle ein vollständiges Template für das ioBroker-Widget
„JSON Template“ aus dem Adapter vis-jsontemplate.

### AUFGABE
Zeige eine Liste von Räumen mit Temperatur und Onlinestatus an.

### JSON-BEISPIEL

{
  "devices": [
    {
      "name": "Wohnzimmer",
      "temperature": 22.4,
      "online": true
    },
    {
      "name": "Schlafzimmer",
      "temperature": 19.8,
      "online": false
    }
  ]
}

### DARSTELLUNG

Jeder Raum soll als kompakte Karte dargestellt werden. Der Raumname steht
oben, die Temperatur groß darunter. Online-Geräte erhalten einen grünen
Statuspunkt, Offline-Geräte einen grauen Statuspunkt. Die Karten sollen sich
automatisch an die verfügbare Breite anpassen.

### FUNKTIONEN

Nur Anzeige.

### TECHNISCHE VORGABEN

- Verwende HTML, CSS, JavaScript und EJS nur soweit erforderlich.
- Die JSON-Daten befinden sich in der Variable `data`.
- Verwende `<%- ... %>` für die Ausgabe von Werten.
- Verwende `<% ... %>` für Schleifen und Bedingungen.
- Prüfe, ob `data.devices` vorhanden und ein Array ist.
- Zeige bei fehlenden Daten den Text „Keine Gerätedaten vorhanden“.
- Verwende keine externen Bibliotheken.
- Verwende kein `setInterval()`.
- VIS interpretiert `{...}` innerhalb einer Zeile als Datenpunkt-Binding.
  Deshalb dürfen öffnende und schließende geschweifte Klammern mit beliebigem
  Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer in
  getrennte Zeilen. Leere Klammern (`{}`) sind erlaubt.
- Verwende keine Regex-Quantifizierer wie `{2}`, `{1,2}` oder `{4}`.
  Schreibe sie stattdessen ohne geschweifte Klammern, z. B.
  `\d{2}` → `\d\d`,
  `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Begrenze das CSS auf `#<%- widgetid %>`.
- Das Ergebnis muss direkt in das Feld `json_template` eingefügt werden können.
- Wenn Daten von einem EJS-Template an das clientseitige JavaScript übergeben
  werden sollen, sollten die Daten nicht serialisiert werden.
  Verwende stattdessen eine globale Variable im `window`-Namensraum und wähle
  einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten
  zu vermeiden.

### AUSGABEFORMAT

1. Vollständiges Template in einem Codeblock
2. Kurze Erklärung
3. Erforderliche Widget-Einstellungen
```

## Erklärung des Beispielprompts

### Aufgabe

Dieser Abschnitt gibt der KI das fachliche Ziel vor. Dadurch weiß sie,
welche Informationen relevant sind.

### JSON-Beispiel

Das Beispiel definiert die tatsächliche Datenstruktur. Die KI erkennt dadurch,
dass sie über data.devices iterieren und beispielsweise
auf device.name zugreifen muss.

### Darstellung

Hier werden Layout und visuelle Regeln beschrieben.
Je konkreter dieser Abschnitt ist, desto weniger muss die KI
gestalterische Annahmen treffen.

### Funktionen

Dieser Abschnitt trennt eine reine Anzeige von einem interaktiven Template.
Interaktive Funktionen benötigen meist zusätzliches JavaScript
und gegebenenfalls weitere Datenpunkte.

### Technische Vorgaben

Diese Regeln verhindern typische Fehler in VIS und im Adapter.
Besonders wichtig sind die korrekte Verwendung der EJS-Tags,
getrennte CSS-Klammern und der Verzicht auf setInterval().

### Ausgabeformat

Damit wird festgelegt, dass die KI zuerst einen direkt einsetzbaren Codeblock
liefert und ergänzende Erklärungen davon trennt.

## Hinweise zur Prüfung

KI-generierter Code sollte vor dem produktiven Einsatz geprüft werden:

- Stimmen alle verwendeten Feldnamen mit dem JSON-Datenpunkt überein?
- Werden fehlende oder leere Werte abgefangen?
- Ist das CSS auf das aktuelle Widget begrenzt?
- Werden keine nicht vorhandenen Datenpunkte oder Funktionen vorausgesetzt?
- Enthält der Code kein setInterval()?
- Funktioniert das Template zunächst mit den angegebenen Beispieldaten?

Bei Fehlern sollte der KI nicht nur mitgeteilt werden,
dass das Template nicht funktioniert. Hilfreicher sind die konkrete
Fehlermeldung, die tatsächlichen JSON-Daten und das bisher erzeugte Template.