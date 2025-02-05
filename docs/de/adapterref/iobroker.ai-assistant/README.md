---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ai-assistant/README.md
title: ioBroker.ai-Assistent
hash: 1WwgYlBlYiCCGclngXJYE3dBxwGnkfzPrlENgsR30RQ=
---
![Logo](../../../en/adapterref/iobroker.ai-assistant/admin/ai-assistant.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-assistant.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ai-assistant.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ai-assistant-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ai-assistant-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ai-assistant.png?downloads=true)

# IoBroker.ai-Assistent
**Tests:** ![Testen und Freigeben](https://github.com/ToGe3688/ioBroker.ai-assistant/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Der ioBroker AI Assistant Adapter führt einen intelligenten Assistenten in Ihrem ioBroker-System aus. Der Assistent kann verwendet werden, um mit Ihrem ioBroker-System zu interagieren, zeitbasierte Anweisungen und triggerbasierte Anweisungen festzulegen und benutzerdefinierte Funktionen aufzurufen. Der Assistent kann mit verschiedenen Sprachmodellen verschiedener Anbieter (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) oder benutzerdefinierten/selbstgehosteten Modellen konfiguriert werden. Der Assistent kann verwendet werden, um Aufgaben zu automatisieren, Ihr Smart Home zu steuern oder Informationen bereitzustellen.

## Merkmale
- Personalisieren Sie den Namen und die Persönlichkeit Ihres Assistenten
- Auflisten, Lesen und Schreiben von ioBroker-Zuständen
- Legen Sie Timeouts und Cronjobs fest, um zeitbasierte Anweisungen auszuführen
- Setzen Sie Trigger für ioBroker-Zustände mit Bedingungen, die Anweisungen ausführen, wenn die Bedingungen erfüllt sind
- Definieren Sie benutzerdefinierte Funktionen mit Ihren eigenen Daten und Ihrer eigenen Logik

## Unterstützte Anbieter
- **Anthropisch**: [anthropic.com](https://anthropic.com)
- **OpenAI**: [openai.com](https://openai.com)
- **Perplexity**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Benutzerdefinierte/selbstgehostete Modelle** (z. B. LM Studio, LocalAI)

---

## Schnellstart
1. Installieren Sie den Adapter.
2. Richten Sie einen Anbieter ein (z. B. OpenAI, Anthropic, Perplexity, OpenRouter) und erhalten Sie ein API-Token.
3. Konfigurieren Sie den Adapter mit dem API-Token.
4. Wählen Sie das Modell aus, das Sie für den Assistenten verwenden möchten.
5. Fügen Sie unter der Registerkarte „Objekte“ einige ioBroker-Zustände hinzu, die dem Assistenten zur Verfügung stehen.
6. Beginnen Sie mit der Kommunikation mit Ihrem Assistenten, indem Sie Textanfragen an den Status „text_request“ des Assistenten senden und Antworten vom Status „text_response“ erhalten.

---

## Getestete Modelle
Die folgenden Modelle wurden mit dem Adapter getestet und funktionieren nachweislich gut:

- Claude 3.5 Sonett (Anthropisch)
- gpt-4o-mini (OpenAI)
- meta-llama/llama-3.3-70b-instruct (OpenRouter)
- Deepseek/Deepseek-Chat (OpenRouter)
- x-ai/grok-beta (OpenRouter)
- Ratlosigkeit/Llama-3.1-Sonar-Huge-128k-Online (Ratlosigkeit)
- Perplexität/Llama-3.1-Sonar-large-128k-online (Perplexität)

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
| **Nachrichtenverlauf** | Vorherige Nachrichten einschließen (für chatbot-ähnliches Verhalten). Für Tools zur einmaligen Verwendung auf 0 setzen, um die Token-Nutzung zu minimieren. |
| **Temperatur** | Steuert die Kreativität/Konsistenz der Reaktion. |
| **Max. Tokens** | Begrenzt die Anzahl der Antworttoken. |
| **Wiederholungsverzögerung** | Verzögerung zwischen Wiederholungsversuchen, wenn die Anforderung fehlschlägt |
| **Maximale Wiederholungsversuche** | Maximale Anzahl an Wiederholungsversuchen pro Anfrage. |

---

### Objekte
### WARNUNG: Seien Sie vorsichtig mit den Zuständen, zu denen Sie dem Assistenten Zugriff gewähren, da er alle Zustände, zu denen er Zugriff hat, lesen und schreiben kann.
Richten Sie die ioBrokers-Objekte und -Status ein, auf die der Assistent Zugriff haben soll.

**HINWEIS: Achten Sie beim Importieren oder Hinzufügen von Objekten darauf, nur Datenpunkte vom Typ „Zustand“ hinzuzufügen, die direkt gesteuert werden können oder einen auszulesenden Wert enthalten!**

| **Einstellung** | **Beschreibung** |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Import aus Enum.Rooms** | Importiert alle Deine Zustände aus der enum.rooms-Sortierung in ioBroker. (Überschreibt alle vorher gesetzten Objekte!) |
| **Sortieren** | Alle Objekte mit gleichem Sortierfeld werden dem Assistenten in einer Gruppe (z.B. einem Raum) präsentiert |
| **Name** | Verwenden Sie einen beschreibenden Namen, damit der Assistent die Funktion der Objekte versteht |
| **Objekt** | Die ID des ioBroker-Status |

---

### Funktionen
Richten Sie benutzerdefinierte Funktionen ein, die dem Assistenten zur Verfügung stehen sollen.
Ihre benutzerdefinierten Funktionen müssen die Antwort auf den Status schreiben, den Sie im Feld `State (Response)` definiert haben, nachdem `State (Request)` geschrieben wurde.
Das Ergebnis kann in jedem beliebigen Format vorliegen (z. B. JSON, einfacher Text), stellen Sie nur sicher, dass der Assistent es verstehen kann.
Tipp: Sie können [AI-Toolbox Adapter](https://github.com/ToGe3688/ioBroker.ai-toolbox) verwenden, um Ihren Assistenten in benutzerdefinierte KI-Tools zu integrieren.

**HINWEIS: Wenn Sie innerhalb von 60 Sekunden keine Antwort in das Feld `State (Response)` schreiben, schlägt der Funktionsaufruf fehl!**

| **Einstellung** | **Beschreibung** |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Sortieren** | Alle Objekte mit gleichem Sortierfeld werden dem Assistenten in einer Gruppe (z.B. einem Raum) präsentiert |
| **Name** | Verwenden Sie einen beschreibenden Namen für die benutzerdefinierte Funktion |
| **Beschreibung** | Beschreiben Sie, was Ihre Funktion macht, damit der Assistent weiß, wann er sie aufrufen muss |
| **Status (Anfrage)** | Dieser Status wird vom Assistenten beim Aufruf der Funktion als String geschrieben |
| **Status (Antwort)** | Dieser Status wird vom Assistenten gelesen, um die Antwort der Funktion zu erhalten |

---

### LLM-Anbieter
Konfigurieren Sie jeden KI-Anbieter einzeln:

#### Anthropisch
| **Einstellung** | **Beschreibung** |
| ------------- | ------------------------------- |
| **API-Token** | Geben Sie Ihr Anthropic API-Token ein. |
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
| **Hinweis** | Stellen Sie die Einhaltung gängiger AI LLM API-Standards sicher (z. B. LM Studio API). |

---

## Verwendung
### Einfache Konversation
Sie können mit Ihrem Assistenten interagieren, indem Sie Textanfragen an den Status `text_request` senden und Antworten vom Status `text_response` erhalten.

#### Funktionsaufruf
Der Assistent kann alle verfügbaren Funktionen aufrufen. Dies geschieht, indem er anhand der Textanforderung die aufzurufende Funktion ermittelt. Wenn Sie Debug/CoT-Ausgabe aktiviert haben, können Sie den internen Prozess des Assistenten im Status `text_response` sehen.

#### Staatliche Interaktion
Der Assistent kann mehrere ioBroker-Zustände gleichzeitig auflisten, lesen und schreiben. Über die Registerkarte `Objects` können Sie festlegen, auf welche Zustände der Assistent Zugriff haben soll.

#### Zeitbasierte Anweisungen
Der Assistent kann Timeouts für relative Zeitanweisungen und Cronjobs für bestimmte Zeiten festlegen. Cronjobs werden im Objektbaum des Assistenten unter `Cronjobs` aufgelistet.
Timeouts sind nur temporär und werden entfernt, nachdem das Timeout ausgeführt oder der Adapter neu gestartet wurde.
Wenn ein Timeout oder Cronjob ausgelöst wird, wird der Assistent aufgeweckt und die Anweisung ausgeführt.

#### Triggerbasierte Anweisungen
Der Assistent kann Trigger für ioBroker-Zustände mit optionalen Bedingungen setzen, die Anweisungen ausführen, wenn die Bedingungen erfüllt sind. Trigger werden im Objektbaum des Assistenten unter `Triggers` aufgelistet.
Bei Triggerung wird der Assistent aufgeweckt und die Anweisung ausgeführt.

#### Benutzerdefinierte Funktionen
Der Assistent kann benutzerdefinierte Funktionen aufrufen, die Sie im Reiter `Functions` definiert haben. Der Assistent schreibt die Anfrage in das Feld `State (Request)` und erwartet die Antwort im Feld `State (Response)`.

#### Funktionsverkettung
Mit dem Assistenten können mehrere Funktionen miteinander verkettet werden. Sie können beispielsweise einen Cronjob einrichten, der bei Ausführung eine Überprüfung der ioBroker-Zustände startet und dann eine benutzerdefinierte Funktion mit den Ergebnissen aufruft.

#### Chatverlauf löschen
Manchmal kann es sinnvoll sein, den Chatverlauf zurückzusetzen. Dies können Sie tun, indem Sie den Assistenten auffordern, seinen Verlauf zu löschen. Dadurch werden alle vorherigen Nachrichten aus dem Speicher des Assistenten gelöscht. (z. B. `Clear history` oder `Forget the previous messages`)

## Weitere Informationen
### Statistiken
Für Ihren Assistenten werden Statistiken protokolliert und können im Objektbaum `Statistics` eingesehen werden.

| **Datenpunkt** | **Beschreibung** |
| -------------------------------- | ------------------------------------------------------- |
| **.statistics.lastRequest** | Zeitstempel der letzten Anfrage. |
| **.statistics.requestCount** | Anzahl der gesendeten Anfragen an den Assistenten |
| **.statistics.messages\*** | JSON-Array des Nachrichtenverlaufs (wenn Nachrichtenverlauf > 0). |
| **.statistics.clear_messages\*** | Schaltfläche „Nachrichtenverlauf löschen“. |
| **.statistics.tokens_input** | Gesamtzahl der verwendeten Eingabetoken. |
| **.statistics.tokens_output** | Insgesamt verwendete Ausgabetoken. |

## Entwicklung
Dieser Adapter befindet sich noch in der Entwicklung und kann Fehler enthalten. Bitte melden Sie alle Probleme, auf die Sie stoßen.

### Debuggen
Stellen Sie die Protokollebene in der ioBroker-Administratoroberfläche auf `debug` ein, um detaillierte Protokolle zu erhalten.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2025 ToGe3688 <toge3688@gmail.com>

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