---
title:       "Alexa Custom-Skill"
lastChanged: "01.02.2025"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/cloud/alexacustom.md"
---

# Der Alexa Custom-Skill

## Was ist der ioBroker Alexa Custom Skill? ##

Der ioBroker Alexa Custom Skill ermöglicht eine **erweiterte Sprachsteuerung** für dein Smart Home mit individuellen Befehlen. 
Im Gegensatz zum ioBroker.iot Skill, der Standard-Smart-Home-Befehle nutzt, erlaubt der Custom Skill **komplexe Interaktionen** wie Statusabfragen, 
individuelle Routinen oder das Starten von Automationen.

Durch den Invocation Name `i o Broker` kannst du Alexa anweisen, bestimmte Aufgaben auszuführen oder Informationen aus deinem ioBroker-System abzurufen.

### Funktionen und Möglichkeiten ###
Der `ioBroker Custom` Alexa Skill ermöglicht individuelle Sprachbefehle für das Smart Home, Statusabfragen für Sensorwerte wie Temperatur oder Fensterstatus, die Steuerung von komplexen Szenen und Routinen sowie die Integration mit externen Diensten über ioBroker-Skripte. Er kann parallel mit dem `ioBroker.iot` Skill verwendet werden.

### Einrichtung des ioBroker Custom Alexa Skills ###
ioBroker.iot Adapter installieren: Der Custom Skill funktioniert nur mit dem ioBroker.iot Adapter. Falls dieser noch nicht installiert ist, kann er über den ioBroker-Adminbereich unter Adapter → ioBroker.iot Adapter installiert werden.

### Alexa Custom Skill aktivieren ###

Öffne die Amazon Alexa App oder rufe die Alexa-Skills-Seite auf.

Suche nach `ioBroker Custom` Skill.

Aktiviere den Skill und verknüpfe dein Amazon Alexa-Konto mit ioBroker.

## Custom Skill - Eigene Sprachbefehle benutzen

Die Antworten für den Custom Skill können auf zwei Arten verarbeitet werden:

- mit text2command
- mit JavaScript

### text2command

Falls eine `text2command`-Instanz in der Konfigurationsoberfläche definiert ist, wird die Anfrage an diese Instanz gesendet.

`text2command` muss so konfiguriert sein, dass die erwartete Phrase erkannt und eine entsprechende Antwort generiert wird.

### JavaScript

Es besteht die Möglichkeit, die Anfrage direkt mit einem Skript zu verarbeiten. Dies ist die Standardoption, falls keine `text2command`-Instanz ausgewählt ist.

Falls eine `text2command`-Instanz definiert wurde, muss diese Instanz die Antwort liefern, und die Antwort aus dem Skript wird ignoriert.

Der Adapter stellt die Details in zwei States mit unterschiedlichem Detaillierungsgrad zur Verfügung:

- `smart.lastCommand` enthält den empfangenen Text einschließlich Informationen über den Anfrage-Typ (Intent). Beispiel: askDevice Status Rasenmäher
- `smart.lastCommandObj` enthält einen JSON-String, der zu einem Objekt geparst werden kann, welches die folgenden Informationen enthält:
  - `words`: Enthält die empfangenen Wörter als Array
  - `intent`: Enthält den Anfrage-Typ. Mögliche Werte sind:
    - v1 Skill: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
    - v2 Skill: `queryIntent` (wenn der gesamte gesprochene Text erfasst wurde), `controlDevice` (für ein Fallback mit nur teilweisem Text)
  - `deviceId`: Enthält eine Geräte-ID, die das Gerät identifiziert, von dem die Anfrage gesendet wurde (falls von Amazon bereitgestellt, sonst leer)
  - `deviceRoom`: Enthält eine zugeordnete Raumkennung, die in der ioBroker IoT-Admin-UI für gesammelte Geräte-IDs konfiguriert werden kann
  - `sessionId`: Enthält eine Sitzungs-ID der Skill-Sitzung, sollte gleich sein, wenn mehrere Befehle hintereinander gesprochen werden (falls von Amazon bereitgestellt, sonst leer)
  - `userId`: Enthält eine Benutzer-ID des Gerätebesitzers oder des interagierenden Benutzers (falls von Amazon bereitgestellt, sonst leer)
  - `userName`: Enthält einen zugeordneten Benutzernamen, der in der IoT-Admin-UI für gesammelte Benutzer-IDs konfiguriert werden kann

Weitere Details zur Erkennung von Wörtern und den verschiedenen Anfrage-Typen des Alexa Custom Skills sind unter folgendem Link verfügbar:
[ioBroker Forum](https://forum.iobroker.net/viewtopic.php?f=37&t=17452)

### Antwort über `smart.lastResponse` State zurückgeben
Die Antwort muss innerhalb von 200ms in den State smart.lastResponse geschrieben werden. Sie kann entweder ein einfacher Textstring oder ein JSON-Objekt sein.

- Falls es sich um einen Textstring handelt, wird dieser als Antwort an den Skill zurückgesendet.
- Falls die Antwort ein JSON-Objekt ist, können folgende Schlüssel verwendet werden:
  - `responseText`: Enthält den Text, der an Amazon zurückgegeben wird
  - `shouldEndSession`: Ein boolescher Wert, der steuert, ob die Sitzung nach der Antwort beendet wird oder für weitere Eingaben offen bleibt
  - `sessionId`: Enthält die Sitzungs-ID, für die die Antwort bestimmt ist. Falls nicht angegeben, wird die erste erwartete Sitzung verwendet.

### Antwort über eine Nachricht an die iot-Instanz senden

Die ioBroker iot-Instanz akzeptiert auch eine Nachricht mit dem Namen `alexaCustomResponse`, die den Schlüssel response enthält. Dieses Objekt kann die Schlüssel `responseText`,` shouldEndSession` und `sessionId` enthalten.

Die iot-Instanz sendet keine Antwort auf die Nachricht zurück.

### Beispiel eines Skripts zur Verarbeitung von Texten

```js
// Wichtig: ack=true setzen
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // Die Antwort muss innerhalb von 200ms vorbereitet und in iot.X.smart.lastResponse geschrieben werden
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // Wichtig: ack=false (Standard)
});
```

### Beispiel eines Skripts zur Verarbeitung von JSON-Objekten

```js
// Wichtig: ack=true setzen
on({ id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any' }, obj => {
    // Die Antwort muss innerhalb von 200ms vorbereitet und in iot.X.smart.lastResponse geschrieben werden
    const request = JSON.parse(obj.state.val);
    const response = {
        responseText: 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        shouldEndSession: true,
        sessionId: request.sessionId,
    };

    // Antwort über State zurückgeben
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // Wichtig: ack=false (Standard)

    // Oder alternativ als Nachricht zurückgeben
    sendTo('iot.0', 'alexaCustomResponse', response);
});
```

## Beispile für Sprachbefehle

**Statusabfragen:**

- „Alexa, frage ioBroker nach der Temperatur im Wohnzimmer.“
- „Alexa, frage ioBroker, ob das Garagentor offen ist.“

**Steuerbefehle:**

- „Alexa, sage ioBroker, dass ich nach Hause komme.“
- „Alexa, bitte ioBroker, meine Kaffeemaschine zu starten.“

**Szenen und Routinen:**

- „Alexa, sage ioBroker, dass ich schlafen gehe.“

## Vorteile des ioBroker Alexa Custom Skills ##

Der ioBroker Custom Skill bietet eine hohe Flexibilität durch individuelle Sprachbefehle. 
Er ergänzt den IoT-Skill um eine umfassendere Sprachsteuerung, ermöglicht Statusabfragen für Sensorwerte und Systeminformationen und erlaubt die Integration von Automatisierungen und Skripten. Der Custom Skill bietet eine anpassbare und leistungsstarke Möglichkeit, das Smart Home über Alexa zu steuern.
