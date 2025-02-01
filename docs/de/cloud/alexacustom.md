---
title:       "Alexa Custom-Skill"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/cloud/alexacustom.md"
template:    true
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

## Eigene Sprachbefehle definieren ##

Öffne den ioBroker-Adminbereich und gehe zum iot-Adapter unter IoT Services.

Erstelle eine neue Aktion oder Statusabfrage und lege fest, welche Geräte oder Skripte angesprochen werden sollen.

Speichere die Konfiguration und teste die neuen Befehle in Alexa.

Beispielhafte Sprachbefehle

**Statusabfragen:**

- „Alexa, frage ioBroker nach der Temperatur im Wohnzimmer.“
- „Alexa, frage ioBroker, ob das Garagentor offen ist.“

**Steuerbefehle:**

- „Alexa, sage ioBroker, dass ich nach Hause komme.“
- „Alexa, bitte ioBroker, meine Kaffeemaschine zu starten.“

**Szenen und Routinen:**

„Alexa, sage ioBroker, dass ich schlafen gehe.“

## Vorteile des ioBroker Alexa Custom Skills ##

Der ioBroker Custom Skill bietet eine hohe Flexibilität durch individuelle Sprachbefehle. 
Er ergänzt den IoT-Skill um eine umfassendere Sprachsteuerung, ermöglicht Statusabfragen für Sensorwerte und Systeminformationen und erlaubt die Integration von Automatisierungen und Skripten. Der Custom Skill bietet eine anpassbare und leistungsstarke Möglichkeit, das Smart Home über Alexa zu steuern.
