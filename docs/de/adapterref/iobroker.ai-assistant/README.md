---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ai-assistant/README.md
title: ioBroker.ai-Assistent
hash: eLCRLymT6+1j/OAxF3jn8OqXnUitr9qaI0KB/YSlvXM=
---
![Logo](../../../en/adapterref/iobroker.ai-assistant/admin/ai-assistant.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-assistant.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ai-assistant.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ai-assistant-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ai-assistant-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ai-assistant.png?downloads=true)

# IoBroker.ai-assistant
**Tests:** ![Testen und Freigeben](https://github.com/ToGe3688/ioBroker.ai-assistant/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Der ioBroker AI Assistant Adapter führt einen intelligenten Assistenten in Ihrem ioBroker-System aus.
Der Assistent kann zur Interaktion mit Ihrem ioBroker-System, zum Festlegen zeitbasierter und triggerbasierter Anweisungen sowie zum Aufrufen benutzerdefinierter Funktionen verwendet werden.
Der Assistent kann mit verschiedenen Sprachmodellen verschiedener Anbieter (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) oder benutzerdefinierten/selbstgehosteten Modellen konfiguriert werden.
Der Assistent kann zur Automatisierung von Aufgaben, zur Steuerung Ihres Smart Homes oder zur Bereitstellung von Informationen verwendet werden.

## Merkmale
- Personalisieren Sie den Namen und die Persönlichkeit Ihres Assistenten
- Auflisten, Lesen und Schreiben von ioBroker-Zuständen
- Legen Sie Timeouts und Cronjobs fest, um zeitbasierte Anweisungen auszuführen
- Setzen Sie Trigger für ioBroker-Zustände mit Bedingungen, die Anweisungen ausführen, wenn die Bedingungen erfüllt sind
- Definieren Sie benutzerdefinierte Funktionen mit Ihren eigenen Daten und Ihrer eigenen Logik
- Verwenden Sie die Registerkarte „Admin“, um mit Ihrem persönlichen Assistenten zu chatten

## Unterstützte Anbieter
- **Anthropisch**: [anthropic.com](https://anthropic.com)
- **OpenAI**: [openai.com](https://openai.com)
- **Perplexity**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Benutzerdefinierte/selbst gehostete Modelle** (z. B. LM Studio, LocalAI)

---

## Schnellstart
1. Installieren Sie den Adapter.
2. Richten Sie einen Anbieter ein (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) und erhalten Sie ein API-Token.
3. Konfigurieren Sie den Adapter mit dem API-Token.
4. Wählen Sie das Modell aus, das Sie für den Assistenten verwenden möchten.
5. Fügen Sie unter der Registerkarte „Objekte“ einige ioBroker-Status hinzu, die dem Assistenten zur Verfügung stehen.
6. Beginnen Sie mit der Kommunikation mit Ihrem Assistenten, indem Sie Textanfragen an den Status „text_request“ des Assistenten senden und Antworten vom Status „text_response“ erhalten oder die benutzerdefinierte Administratorregisterkarte mit der Bezeichnung „Assistent“ verwenden.

---

## Getestete Modelle
Die folgenden Modelle wurden mit dem Adapter getestet und funktionieren nachweislich gut:

- Claude 3.5 Sonett (Anthropisch)
gpt-4o-mini (OpenAI)
- meta-llama/llama-3.3-70b-instruct (OpenRouter)
- deepseek/deepseek-chat (OpenRouter)
- x-ai/grok-beta (OpenRouter)
- Perplexität/Llama-3.1-Sonar-huge-128k-online (Perplexität)
- Perplexität/Llama-3.1-Sonar-groß-128k-online (Perplexität)

---

## Konfiguration
### Assistent
Richten Sie Ihren Assistenten mit den folgenden Einstellungen ein:

| **Einstellung** | **Beschreibung** |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Name** | Der Name Ihres Assistenten. |
| **Modell** | Wählen Sie das LLM-Modell aus, das Ihr Assistent verwenden soll (konfiguriert unter Anbieter). |
| **Persönlichkeit** | Beschreiben Sie die Persönlichkeit Ihres Assistenten. |
| **Sprache** | Wählen Sie die Sprache aus, die Ihr Assistent verwenden soll (derzeit werden nur Englisch/Deutsch unterstützt) |
| **Debug-/CoT-Ausgabe** | Wenn aktiv, werden die internen Gedanken und Prozesse, die der Assistent verwendet, in den Status „text_response“ geschrieben. |
| **Nachrichtenverlauf** | Vorherige Nachrichten einschließen (für chatbot-ähnliches Verhalten). Für Einwegtools auf 0 setzen, um die Token-Nutzung zu minimieren. |
| **Temperatur** | Steuert die Kreativität/Konsistenz der Reaktion. |
| **Max. Tokens** | Begrenzt die Anzahl der Antworttoken. |
| **Wiederholungsverzögerung** | Verzögerung zwischen Wiederholungsversuchen, wenn die Anforderung fehlschlägt |
| **Maximale Wiederholungsversuche** | Maximale Anzahl an Wiederholungsversuchen pro Anfrage. |

---

### Objekte
### WARNUNG: Seien Sie vorsichtig mit den Zuständen, auf die Sie dem Assistenten Zugriff gewähren, da er alle Zustände, auf die er Zugriff hat, lesen und schreiben kann.
Richten Sie die ioBrokers-Objekte und -Status ein, auf die der Assistent Zugriff haben soll.

**HINWEIS: Achten Sie beim Importieren oder Hinzufügen von Objekten darauf, nur Datenpunkte vom Typ „Zustand“ hinzuzufügen, die direkt gesteuert werden können oder einen auszulesenden Wert enthalten!**

| **Einstellung** | **Beschreibung** |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Import aus Enum.Rooms** | Importiert alle deine Zustände aus der enum.rooms-Sortierung in ioBroker. (Überschreibt alle zuvor gesetzten Objekte!) |
| **Sortieren** | Alle Objekte mit gleichem Sortierfeld werden dem Assistenten in einer Gruppe (z.B. einem Raum) präsentiert |
| **Name** | Verwenden Sie einen beschreibenden Namen, damit der Assistent die Funktion der Objekte versteht |
| **Objekt** | Die ID des ioBroker-Status |

---

### Funktionen
Richten Sie benutzerdefinierte Funktionen ein, die dem Assistenten zur Verfügung stehen sollen.
Ihre benutzerdefinierten Funktionen müssen die Antwort auf den im Feld `State (Response)` definierten Status schreiben, nachdem `State (Request)` eingegeben wurde.
Das Ergebnis kann in einem beliebigen Format vorliegen (z. B. JSON oder einfacher Text). Stellen Sie lediglich sicher, dass der Assistent es verstehen kann.
Tipp: Sie können [AI-Toolbox Adapter](https://github.com/ToGe3688/ioBroker.ai-toolbox) verwenden, um Ihren Assistenten mit benutzerdefinierten KI-Tools zu integrieren.

**HINWEIS: Wenn Sie innerhalb von 60 Sekunden keine Antwort in das Feld `State (Response)` schreiben, schlägt der Funktionsaufruf fehl!**

| **Einstellung** | **Beschreibung** |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Sortieren** | Alle Objekte mit gleichem Sortierfeld werden dem Assistenten in einer Gruppe (z.B. einem Raum) präsentiert |
| **Name** | Verwenden Sie einen beschreibenden Namen für die benutzerdefinierte Funktion |
| **Beschreibung** | Beschreiben Sie, was Ihre Funktion macht, damit der Assistent weiß, wann er sie aufrufen muss |
| **Status (Anforderung)** | Dieser Status wird vom Assistenten beim Aufruf der Funktion mit einem String geschrieben |
| **Status (Antwort)** | Dieser Status wird vom Assistenten gelesen, um die Antwort der Funktion zu erhalten |

---

### LLM-Anbieter
Konfigurieren Sie jeden KI-Anbieter einzeln:

#### Anthropisch
| **Einstellung** | **Beschreibung** |
| ------------- | ------------------------------- |
| **API-Token** | Geben Sie Ihr Anthropic-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### OpenAI
| **Einstellung** | **Beschreibung** |
| ------------- | ---------------------------- |
| **API-Token** | Geben Sie Ihr OpenAI-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### Ratlosigkeit
| **Einstellung** | **Beschreibung** |
| ------------- | -------------------------------- |
| **API-Token** | Geben Sie Ihr Perplexity-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### OpenRouter
| **Einstellung** | **Beschreibung** |
| ------------- | -------------------------------- |
| **API-Token** | Geben Sie Ihr OpenRouter-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### Brauch
| **Einstellung** | **Beschreibung** |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **URL des Inferenzservers** | URL des benutzerdefinierten/selbst gehosteten Inferenzservers. |
| **API-Token für Inferenzserver** | API-Token für Ihren Inferenzserver. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |
| **Hinweis** | Stellen Sie die Einhaltung gängiger AI LLM-API-Standards sicher (z. B. LM Studio API). |

---

## Verwendung
### Einfache Konversation
Sie können mit Ihrem Assistenten interagieren, indem Sie Textanfragen an den Status `text_request` senden und Antworten vom Status `text_response` empfangen.

#### Funktionsaufruf
Der Assistent kann alle verfügbaren Funktionen aufrufen. Dazu ermittelt er die aufzurufende Funktion anhand der Textanfrage. Wenn Sie die Debug-/CoT-Ausgabe aktiviert haben, sehen Sie den internen Prozess des Assistenten im Status `text_response`.

#### Zustandsinteraktion
Der Assistent kann mehrere ioBroker-Zustände gleichzeitig anzeigen, lesen und schreiben. Über den Reiter `Objects` können Sie festlegen, auf welche Zustände der Assistent Zugriff haben soll.

#### Zeitbasierte Anweisungen
Der Assistent kann Timeouts für relative Zeitanweisungen und Cronjobs für bestimmte Zeiten festlegen. Cronjobs werden im Objektbaum des Assistenten unter `Cronjobs` aufgelistet.
Timeouts sind nur temporär und werden nach der Ausführung des Timeouts oder einem Neustart des Adapters aufgehoben.
Wenn ein Timeout oder Cronjob ausgelöst wird, wird der Assistent aktiviert und die Anweisung ausgeführt.

#### Triggerbasierte Anweisungen
Der Assistent kann Trigger für ioBroker-Zustände mit optionalen Bedingungen setzen, die Anweisungen ausführen, wenn die Bedingungen erfüllt sind. Trigger werden im Objektbaum des Assistenten unter `Triggers` aufgelistet.
Bei Auslösung wird der Assistent aktiviert und die Anweisung ausgeführt.

#### Benutzerdefinierte Funktionen
Der Assistent kann benutzerdefinierte Funktionen aufrufen, die Sie im Reiter `Functions` definiert haben. Der Assistent schreibt die Anfrage in das Feld `State (Request)` und erwartet die Antwort im Feld `State (Response)`.

#### Funktionsverkettung
Der Assistent kann verwendet werden, um mehrere Funktionen miteinander zu verknüpfen. Beispielsweise können Sie einen Cronjob einrichten, der bei Ausführung eine Überprüfung der ioBroker-Zustände startet und anschließend eine benutzerdefinierte Funktion mit den Ergebnissen aufruft.

#### Chatverlauf löschen
Manchmal ist es sinnvoll, den Chatverlauf zurückzusetzen. Dazu fordert man den Assistenten auf, seinen Verlauf zu löschen. Dadurch werden alle vorherigen Nachrichten aus dem Speicher des Assistenten gelöscht. (z. B. `Clear history` oder `Forget the previous messages`)

## Weitere Informationen
### Statistik
Für Ihren Assistenten werden Statistiken protokolliert und können im Objektbaum `Statistics` eingesehen werden.

| **Datenpunkt** | **Beschreibung** |
| -------------------------------- | ------------------------------------------------------- |
| **.statistics.lastRequest** | Zeitstempel der letzten Anfrage. |
| **.statistics.requestCount** | Anzahl der gesendeten Anfragen an den Assistenten |
| **.statistics.messages\*** | JSON-Array des Nachrichtenverlaufs (wenn Nachrichtenverlauf > 0). |
| **.statistics.clear_messages\*** | Schaltfläche „Nachrichtenverlauf löschen“. |
| **.statistics.tokens_input** | Gesamtzahl der verwendeten Eingabetoken. |
| **.statistics.tokens_output** | Gesamtzahl der verwendeten Ausgabetoken. |

## Entwicklung
Dieser Adapter befindet sich noch in der Entwicklung und kann Fehler enthalten. Bitte melden Sie alle auftretenden Probleme.

### Debuggen
Setzen Sie die Protokollebene in der ioBroker-Admin-Oberfläche auf `debug`, um detaillierte Protokolle zu erhalten.

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