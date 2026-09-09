---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ai-assistant/README.md
title: ioBroker.ai-Assistent
hash: FBgeiW9FDYSHVhHVcIqS+cbmnMAHrzMoCxD5MoLT77w=
---
![Logo](../../../en/adapterref/iobroker.ai-assistant/admin/ai-assistant.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-assistant.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ai-assistant.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ai-assistant-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ai-assistant-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ai-assistant.png?downloads=true)
![Test und Freigabe](https://github.com/ToGe3688/ioBroker.ai-assistant/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ai-Assistent

## Überblick

Der ioBroker AI Assistant Adapter führt einen intelligenten Assistenten in Ihrem ioBroker-System aus. Mit diesem Assistenten können Sie mit Ihrem ioBroker-System interagieren, zeit- und ereignisbasierte Anweisungen festlegen sowie benutzerdefinierte Funktionen aufrufen. Der Assistent lässt sich mit verschiedenen Sprachmodellen unterschiedlicher Anbieter (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) oder mit benutzerdefinierten/selbst gehosteten Modellen konfigurieren. Er kann zur Automatisierung von Aufgaben, zur Steuerung Ihres Smart Homes oder zur Bereitstellung von Informationen verwendet werden.

## Merkmale

- Personalisieren Sie den Namen und die Persönlichkeit Ihres Assistenten
- ioBroker-Zustände auflisten, lesen und schreiben
- Legen Sie Timeouts und Cronjobs fest, um zeitbasierte Anweisungen auszuführen.
- Legen Sie Trigger für ioBroker-Zustände mit Bedingungen fest, die Anweisungen ausführen, wenn die Bedingungen erfüllt sind.
- Definieren Sie benutzerdefinierte Funktionen mit Ihren eigenen Daten und Ihrer eigenen Logik.
- Über den Admin-Tab können Sie mit Ihrem persönlichen Assistenten chatten.

## Unterstützte Anbieter

- **Anthropic** : [anthropic.com](https://anthropic.com)
- **OpenAI** : [openai.com](https://openai.com)
- **Verwirrung** : [perplexity.ai](https://perplexity.ai)
- **OpenRouter** : [openrouter.ai](https://openrouter.ai)
- **Deepseek** : [deepseek.com](http://deepseek.com/)
- **Benutzerdefinierte/selbstgehostete Modelle** (z. B. LM Studio, LocalAI)

---

## Schnellstart

1. Installieren Sie den Adapter.
2. Richten Sie einen Provider ein (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) und besorgen Sie sich ein API-Token.
3. Konfigurieren Sie den Adapter mit dem API-Token.
4. Wählen Sie das Modell aus, das Sie für den Assistenten verwenden möchten.
5. Fügen Sie einige ioBroker-Zustände unter dem`Objects` Registerkarte, die dem Assistenten zur Verfügung stehen wird.
6. Beginnen Sie die Kommunikation mit Ihrem Assistenten, indem Sie Textanfragen an den Assistenten senden.`text_request` den Staat und Antworten von ihm erhalten`text_response` Alternativ können Sie den benutzerdefinierten Admin-Tab mit der Bezeichnung „Assistent“ verwenden.

---

## Getestete Modelle

Folgende Modelle wurden mit dem Adapter getestet und funktionieren bekanntermaßen einwandfrei:

- Claude 3.5 Sonett (Anthropisch)
- gpt-4o-mini (OpenAI)
- meta-llama/llama-3.3-70b-instruct (OpenRouter)
- deepseek/deepseek-chat (OpenRouter)
- x-ai/grok-beta (OpenRouter)
- perplexity/llama-3.1-sonar-huge-128k-online (Perplexity)
- perplexity/llama-3.1-sonar-large-128k-online (Perplexity)

---

## Konfiguration

### Assistent

Richten Sie Ihren Assistenten mit den folgenden Einstellungen ein:

| **Einstellung**                    | **Beschreibung**                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                           | Der Name Ihres Assistenten.                                                                                                                                        |
| **Modell**                         | Wählen Sie das LLM-Modell aus, das Ihr Assistent verwenden soll (konfigurierbar unter Anbieter).                                                                   |
| **Persönlichkeit**                 | Beschreiben Sie die Persönlichkeit Ihres Assistenten.                                                                                                              |
| **Sprache**                        | Wählen Sie die Sprache aus, die Ihr Assistent verwenden soll (derzeit werden nur Englisch/Deutsch unterstützt).                                                    |
| **Debug-/CoT-Ausgabe**             | Wenn der Assistent aktiv ist, werden seine internen Gedanken und Prozesse in den Status text\_response geschrieben.                                                |
| **Nachrichtenverlauf**             | Vorherige Nachrichten einbeziehen (für chatbotähnliches Verhalten). Für Tools, die nur einmal verwendet werden, auf 0 setzen, um den Tokenverbrauch zu minimieren. |
| **Temperatur**                     | Kontrolliert die Kreativität/Konsistenz der Reaktionen.                                                                                                            |
| **Max. Token**                     | Begrenzt die Anzahl der Antworttoken.                                                                                                                              |
| **Wiederholungsverzögerung**       | Verzögerung zwischen Wiederholungsversuchen, falls die Anfrage fehlschlägt                                                                                         |
| **Maximale Wiederholungsversuche** | Maximale Anzahl an Wiederholungsversuchen pro Anfrage.                                                                                                             |

---

### Objekte

### WARNUNG: Seien Sie vorsichtig mit den Zuständen, auf die Sie dem Assistenten Zugriff gewähren, da er alle Zustände lesen und beschreiben kann, auf die er Zugriff hat.

Richten Sie die ioBrokers-Objekte und -Zustände ein, auf die der Assistent Zugriff haben soll.

**HINWEIS: Beim Importieren oder Hinzufügen von Objekten achten Sie bitte darauf, nur Datenpunkte vom Typ "state" hinzuzufügen, die direkt gesteuert werden können oder einen auszulesenden Wert enthalten!**

| **Einstellung**           | **Beschreibung**                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Import aus Enum.Rooms** | Importiert alle Ihre Zustände aus der enum.rooms-Sortierung in ioBroker. (Überschreibt alle zuvor festgelegten Objekte!) |
| **Sortieren**             | Alle Objekte mit demselben Sortierfeld werden dem Assistenten in einer Gruppe (z. B. einem Raum) angezeigt.              |
| **Name**                  | Verwenden Sie einen beschreibenden Namen, damit der Assistent die Funktion der Objekte versteht.                         |
| **Objekt**                | Die ID des ioBroker-Zustands                                                                                             |

---

### Funktionen

Richten Sie benutzerdefinierte Funktionen ein, die dem Assistenten zur Verfügung stehen sollen. Ihre benutzerdefinierten Funktionen müssen die Antwort in den von Ihnen definierten Zustand schreiben.`State (Response)` Feld nach dem`State (Request)` Das Ergebnis kann in jedem beliebigen Format vorliegen (z. B. JSON, Klartext), solange der Assistent es verarbeiten kann. Tipp: Mit dem [AI-Toolbox-Adapter](https://github.com/ToGe3688/ioBroker.ai-toolbox) können Sie Ihren Assistenten in benutzerdefinierte KI-Tools integrieren.

**HINWEIS: Wenn Sie keine Antwort auf die`State (Response)` Wird das Feld in 60 Sekunden nicht erreicht, schlägt der Funktionsaufruf fehl!**

| **Einstellung**       | **Beschreibung**                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Sortieren**         | Alle Objekte mit demselben Sortierfeld werden dem Assistenten in einer Gruppe (z. B. einem Raum) angezeigt. |
| **Name**              | Verwenden Sie einen aussagekräftigen Namen für die benutzerdefinierte Funktion.                             |
| **Beschreibung**      | Beschreiben Sie die Funktion so, dass der Assistent versteht, wann er sie aufrufen soll.                    |
| **Status (Anfrage)**  | Dieser Zustand wird vom Assistenten beim Aufruf der Funktion als Zeichenkette geschrieben.                  |
| **Zustand (Antwort)** | Dieser Zustand wird vom Assistenten gelesen, um die Antwort der Funktion zu erhalten.                       |

---

### LLM-Anbieter

Konfigurieren Sie jeden KI-Anbieter einzeln:

#### Anthropisch

| **Einstellung** | **Beschreibung**                          |
| --------------- | ----------------------------------------- |
| **API-Token**   | Geben Sie Ihr Anthropic-API-Token ein.    |
| **Modelle**     | Geben Sie die zu verwendenden Modelle an. |

#### OpenAI

| **Einstellung** | **Beschreibung**                          |
| --------------- | ----------------------------------------- |
| **API-Token**   | Geben Sie Ihr OpenAI-API-Token ein.       |
| **Modelle**     | Geben Sie die zu verwendenden Modelle an. |

#### Verwirrung

| **Einstellung** | **Beschreibung**                          |
| --------------- | ----------------------------------------- |
| **API-Token**   | Geben Sie Ihr Perplexity-API-Token ein.   |
| **Modelle**     | Geben Sie die zu verwendenden Modelle an. |

#### OpenRouter

| **Einstellung** | **Beschreibung**                          |
| --------------- | ----------------------------------------- |
| **API-Token**   | Geben Sie Ihr OpenRouter-API-Token ein.   |
| **Modelle**     | Geben Sie die zu verwendenden Modelle an. |

#### Brauch

| **Einstellung**                      | **Beschreibung**                                                                  |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| **URL des Inferenzservers**          | URL des benutzerdefinierten/selbstgehosteten Inferenzservers.                     |
| **API-Token für den Inferenzserver** | API-Token für Ihren Inferenzserver.                                               |
| **Modelle**                          | Geben Sie die zu verwendenden Modelle an.                                         |
| **Notiz**                            | Sicherstellen der Einhaltung gängiger AI LLM API-Standards (z. B. LM Studio API). |

---

## Verwendung

### Einfaches Gespräch

Sie können mit Ihrem Assistenten interagieren, indem Sie Textanfragen an die`text_request` Zustand und Empfang von Antworten von der`text_response` Zustand.

#### Funktionsaufruf

Der Assistent kann alle verfügbaren Funktionen aufrufen. Er ermittelt dazu die aufzurufende Funktion anhand der Textanfrage. Wenn Sie die Debug-/CoT-Ausgabe aktiviert haben, können Sie den internen Prozess des Assistenten im Debugger einsehen.`text_response` Zustand.

#### Zustandsinteraktion

Der Assistent kann mehrere ioBroker-Zustände gleichzeitig auflisten, lesen und schreiben. Sie können den`Objects` Mit dieser Registerkarte können Sie festlegen, auf welche Bundesstaaten der Assistent Zugriff haben soll.

#### Zeitbasierte Anweisungen

Der Assistent kann Timeouts für relative Zeitanweisungen und Cronjobs für bestimmte Zeiten festlegen. Cronjobs werden in der Objektstruktur des Assistenten unter \[Pfad einfügen] aufgelistet.`Cronjobs` Timeouts sind nur temporär und werden nach Ablauf des Timeouts oder nach einem Neustart des Adapters aufgehoben. Bei Auslösung eines Timeouts oder Cronjobs wird der Assistent aktiviert und die entsprechende Anweisung ausgeführt.

#### Triggerbasierte Anweisungen

Der Assistent kann Trigger für ioBroker-Zustände mit optionalen Bedingungen festlegen, die Anweisungen ausführen, sobald die Bedingungen erfüllt sind. Die Trigger werden in der Objektstruktur des Assistenten unter „…“ aufgelistet.`Triggers` Wird der Befehl ausgelöst, wird der Assistent aktiviert und die Anweisung ausgeführt.

#### Benutzerdefinierte Funktionen

Der Assistent kann benutzerdefinierte Funktionen aufrufen, die Sie in der`Functions` Der Assistent wird die Anfrage an die Registerkarte schreiben.`State (Request)` Feld und erwartet die Antwort im`State (Response)` Feld.

#### Funktionsverkettung

Der Assistent ermöglicht die Verkettung mehrerer Funktionen. Beispielsweise lässt sich ein Cronjob einrichten, der nach seiner Ausführung die Zustände von ioBroker überprüft und anschließend eine benutzerdefinierte Funktion mit den Ergebnissen aufruft.

#### Chatverlauf löschen

Manchmal kann es hilfreich sein, den Chatverlauf zurückzusetzen. Dies können Sie tun, indem Sie den Assistenten bitten, seinen Verlauf zu löschen. Dadurch werden alle vorherigen Nachrichten aus dem Speicher des Assistenten entfernt. (z. B.`Clear history` oder`Forget the previous messages` )

## Weitere Informationen

### Statistiken

Für Ihren Assistenten werden Statistiken protokolliert, die Sie in der folgenden Ansicht einsehen können:`Statistics` Objektbaum.

| **Datenpunkt**                    | **Beschreibung**                                                    |
| --------------------------------- | ------------------------------------------------------------------- |
| **.statistics.lastRequest**       | Zeitstempel der letzten Anfrage.                                    |
| **.statistics.requestCount**      | Anzahl der an den Assistenten gesendeten Anfragen                   |
| **.statistics.messages\***        | JSON-Array der Nachrichtenhistorie (falls Nachrichtenhistorie > 0). |
| **.statistics.clear\_messages\*** | Schaltfläche zum Löschen des Nachrichtenverlaufs.                   |
| **.statistics.tokens\_input**     | Gesamtzahl der verwendeten Eingabe-Tokens.                          |
| **.statistics.tokens\_output**    | Insgesamt verwendete Output-Token.                                  |

## Entwicklung

Dieser Adapter befindet sich noch in der Entwicklung und kann Fehler enthalten. Bitte melden Sie alle auftretenden Probleme.

### Debugging

Stellen Sie den Protokollierungsgrad auf ein`debug` Detaillierte Protokolle finden Sie in der ioBroker-Admin-Oberfläche.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.4 (2025-06-05)
* (@ToGe3688) Added tab to interact with the assitant in the admin adapter
* (@ToGe3688) Added a custom timeout parameter
* (@GermanBluefox) Corrected using of the states with the multi-language names

### 0.1.3 (2025-29-01)
* (@ToGe3688) Added support for Deepseek as api provider
* (@ToGe3688) Better display of providers in model selection for admin config
* (@ToGe3688) Fixed object hirarchy 
* (@ToGe3688) Fixed state roles
* (@ToGe3688) Fixed onStateChange handler

### 0.1.2 (2025-12-01)
- (@ToGe3688) Better error handling for Provider APIs
- (@ToGe3688) Anthropic API Versioning

### 0.1.1 (2025-12-01)

- (@ToGe3688) Better error handling for Provider APIs

### 0.1.0 (2025-04-01)

- (@ToGe3688) Beta Release

### 0.0.3 (2024-31-12)

- (@ToGe3688) Improved handling of malformed model responses
- (@ToGe3688) Fixed a bug where the names of the states were not provided to the assistant

### 0.0.2 (2024-30-12)

- (@ToGe3688) Fixed Bug in OpenAI Provider

### 0.0.1 (2024-30-12)

- (@ToGe3688) initial release

## License

The MIT License (MIT)

Copyright (c) 2024-2025 ToGe3688 <toge3688@gmail.com>

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