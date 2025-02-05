---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ai-toolbox/README.md
title: ioBroker.ai-Toolbox
hash: vOxR/4rmRRntCesgYd30u23JYfx6PH6vqQBJ27eopnk=
---
![Logo](../../../en/adapterref/iobroker.ai-toolbox/admin/ai-toolbox.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ai-toolbox-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ai-toolbox-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)

# IoBroker.ai-Toolbox
**Tests:** ![Testen und Freigeben](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Der ioBroker AI Toolbox Adapter integriert anpassbare KI-Tools in Ihr Smart Home. Er unterstützt mehrere Large Language Model (LLM)-Anbieter und bietet ein flexibles Framework für Automatisierung und Interaktion. Durch die Kombination von Daten von Smart-Home-Geräten mit KI-Funktionen kann der ioBroker AI Toolbox Adapter hochgradig personalisierte und nützliche Tools für Ihre Haushaltsautomatisierungsaufgaben und die Interaktion mit LLM-Modellen erstellen.

## Merkmale
- Unterstützung mehrerer KI-Anbieter und -Modelle.
- Erstellen Sie benutzerdefinierte KI-Tools für bestimmte Aufgaben
- Chatverlaufsverwaltung zur Kontextbeibehaltung.
- Statistiken zur Token-Nutzung und zum Anforderungsverlauf.
- Vision-Funktionen zur Bildanalyse.

## Unterstützte Anbieter
- **Anthropisch**: [anthropic.com](https://anthropic.com)
- **OpenAI**: [openai.com](https://openai.com)
- **Perplexity**: [perplexity.ai](https://perplexity.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai) (Kostenlose Nutzungsmodelle für Einsteiger)
- **Deepseek**: [deepseek.com](http://deepseek.com/)
- **Benutzerdefinierte/selbstgehostete Modelle** (z. B. LM Studio, LocalAI)

---

## Schnellstart
1. Installieren Sie den Adapter.
2. Konto erstellen und API-Token von openrouter.ai erhalten
3. Konfigurieren Sie den Adapter mit dem API-Token.
4. Die bei der Installation erstellten Beispieltools verwenden das freie Modell meta-llama/llama-3.2-3b-instruct:free für OpenRouter.
5. Senden Sie eine Nachricht mit dem Datenpunkt .text_request an das Tool und überprüfen Sie .text_response auf die Antwort.

Bitte beachten Sie, dass bei den kostenlosen Modellen manchmal lange auf die erste Antwort gewartet werden muss, sie überlastet sein können oder andere Einschränkungen haben. Die Modelle unterscheiden sich auch in Qualität und Funktionen. Achten Sie darauf, das richtige Modell für Ihren Anwendungsfall auszuwählen.

**Auch wenn diese Readme-Datei auf Englisch verfasst ist, sind die meisten Modelle mehrsprachig. Versuchen Sie einfach, Ihre Tools in Ihrer Muttersprache zu schreiben, um das gewünschte Ergebnis zu erhalten!**

---

## Konfiguration
### Werkzeuge
Definieren Sie benutzerdefinierte KI-Tools, die auf bestimmte Aufgaben zugeschnitten sind:

| **Einstellung** | **Beschreibung** |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name** | Der Name des Werkzeugs. |
| **Modell** | Wählen Sie das LLM-Modell aus (unter Anbietern konfiguriert). |
| **Systemaufforderung** | Geben Sie detaillierte Informationen zur Beschreibung des Tools an. |
| **Beispielanfrage** | (Optional) Eine Beispielanfrage. |
| **Beispielantwort** | (Erforderlich, wenn eine Beispielanfrage bereitgestellt wird) Die ideale Antwort. |
| **Nachrichtenverlauf** | Vorherige Nachrichten einschließen (für chatbot-ähnliches Verhalten). Für Tools zur einmaligen Verwendung auf 0 setzen, um die Token-Nutzung zu minimieren. |
| **Temperatur** | Steuert die Kreativität/Konsistenz der Reaktion. |
| **Max. Tokens** | Begrenzt die Anzahl der Antworttoken. |
| **Wiederholungsverzögerung** | Verzögerung zwischen Wiederholungsversuchen, wenn die Anforderung fehlschlägt |
| **Maximale Wiederholungsversuche** | Maximale Anzahl an Wiederholungsversuchen pro Anfrage. |
| **Vision-/Bildanforderungen aktivieren** | Vision-/Bildeingabe aktivieren. |
| **Vision-Anfragen in Chatverlauf einschließen** | Vision-/Bilddaten in Chatverlauf einschließen |

---

### LLM-Anbieter
Konfigurieren Sie jeden KI-Anbieter einzeln:

#### Anthropisch
| **Einstellung** | **Beschreibung** |
|-----------------|----------------------------------------------|
| **API-Token** | Geben Sie Ihr Anthropic API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### OpenAI
| **Einstellung** | **Beschreibung** |
|-----------------|----------------------------------------------|
| **API-Token** | Geben Sie Ihr OpenAI-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### Ratlosigkeit
| **Einstellung** | **Beschreibung** |
|-----------------|----------------------------------------------|
| **API-Token** | Geben Sie Ihr Perplexity-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### OpenRouter
| **Einstellung** | **Beschreibung** |
|-----------------|----------------------------------------------|
| **API-Token** | Geben Sie Ihr OpenRouter-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### Tiefensuche
| **Einstellung** | **Beschreibung** |
|-----------------|----------------------------------------------|
| **API-Token** | Geben Sie Ihr Deepseek-API-Token ein. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |

#### Brauch
| **Einstellung** | **Beschreibung** |
|------------------------------------|----------------------------------------------------------------------------------|
| **URL des Inferenzservers** | URL des benutzerdefinierten/selbst gehosteten Inferenzservers. |
| **API-Token für Inferenzserver** | API-Token für Ihren Inferenzserver. |
| **Modelle** | Geben Sie die zu verwendenden Modelle an. |
| **Hinweis** | Stellen Sie die Einhaltung gängiger AI LLM API-Standards sicher (z. B. LM Studio API). |

---

## Verwenden Sie Ihre Werkzeuge
### Objektinteraktion
Jedes Tool wird im ioBroker-Objektbaum angezeigt. Verwenden Sie `Tools.$YourToolName.text_request`, um Anfragen zu senden, und `Tools.$YourToolName.text_response`, um Antworten abzurufen.

#### Vision-/Bildanfragen
Wenn Sie Bild-/Bildanfragen aktiviert haben, können Sie mit `Tools.$YourToolName.image_url` eine Bild-URL oder einen lokalen Dateipfad für die Analyse durch das Tool festlegen. Das Bild wird in die Anfrage aufgenommen, wenn Sie den Status des Datenpunkts `Tools.$YourToolName.text_request` festlegen.

Hinweis: Sie können eine lokale URL (z. B. in Ihrem lokalen Netzwerk http://192.168.178.1/image.jpg) oder einen Dateipfad (wo ioBroker die Berechtigung zum Lesen der Dateien hat, z. B. /opt/iobroker/iobroker-data/telegram_0/photo/image.jpg) verwenden. Der Adapter konvertiert das Bild in eine Base64-Zeichenfolge und fügt es in die Anforderung ein.

## Skriptintegration (`sendTo`)
Sie können programmgesteuert mit der Funktion `sendTo` interagieren:

#### Textanfragen
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Vision/Bildanfragen mit URL
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Vision/Image-Anfragen mit lokaler Datei
```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

### Modelle ohne Werkzeuge verwenden
### Objektinteraktion
Jedes definierte Modell erscheint auch im ioBroker-Objektbaum. Verwenden Sie `Models.$ModelName.text_request`, um Anfragen zu senden, und `Models.$ModelName.text_response`, um Antworten abzurufen. Mit der Skriptintegration können Sie noch kreativere Integrationen erstellen, zum Beispiel eine dynamische Systemabfrage.

## Skriptintegration (`sendTo`)
Sie können programmgesteuert mit der Funktion `sendTo` interagieren:

#### Textanfragen
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to'
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

#### Vision/Bildanfragen mit URL
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

#### Vision/Image-Anfragen mit lokaler Datei
```javascript
sendTo('ai-toolbox.0', 'model_request', {
    'model': 'MODEL-NAME',
    'system_prompt': 'System prompt for your request'
    'temperature': 'Temperature setting for your request (Optional: Default 0.6)'
    'max_tokens': 'Max number of tokens to generate (Optional: Default 2000)'
    'text': 'The message for the tool to respond to',
    'image_url': '/opt/iobroker/iobroker-data/telegram_0/photo/image.jpg',
}, async (result) => {
    console.info(result.text); // Text response of the model
    console.info(result.model); // Used model for request
    console.info(result.tokens_input); // Used input tokens
    console.info(result.tokens_output); // Used output tokens
    console.info(result.error); // Error, populated if request fails
    console.info(result.request_data); // JSON object with request data
    console.info(result.response_data); // JSON object with raw response of the API call
});
```

---

## Weitere Informationen
### Statistiken
Für Ihre erstellten Tools und auch für die Modelle werden Statistiken erstellt, sodass Sie die Token-Nutzung und andere Daten verfolgen können.

| **Datenpunkt** | **Beschreibung** |
|-----------------------------|-----------------------------------------------------------------------------|
| **.statistics.lastRequest** | Zeitstempel der letzten Anfrage. |

| **.statistics.messages*** | JSON-Array des Nachrichtenverlaufs (wenn Nachrichtenverlauf > 0).
| **.statistics.clear_messages***| Schaltfläche „Nachrichtenverlauf löschen“.

| **.statistics.tokens_input**| Gesamtzahl der verwendeten Eingabetoken. |
| **.statistics.tokens_output**| Insgesamt verwendete Ausgabetoken. |

 `* only available for tools, models don't have a message history`

### Anfrage
| **Datenpunkt** | **Beschreibung** |
|---------------------|-----------------------------------------------|
| **.request.body** | Anforderungstext an die API gesendet. |
| **.request.state** | Aktueller Status der Anfrage. (Start, Erfolg, Wiederholung, Fehler, Fehlgeschlagen) |

### Antwort
| **Datenpunkt** | **Beschreibung** |
|--------------------|--------------------------------------------------|
| **.request.error** | Wird ausgefüllt, wenn ein Fehler auftritt. |
| **.request.raw** | Rohe JSON-Antwort vom Modell. |

---

## Beispiele
Die folgenden Beispiele zeigen, wie Sie benutzerdefinierte KI-Tools im ioBroker AI Toolbox Adapter konfigurieren und verwenden. Diese Beispiele zeigen, wie der Adapter Daten nutzen kann, um intelligente Antworten und Empfehlungen bereitzustellen.

---

### Beispiel 1: Einfacher Chatbot
**Beschreibung:** Ein einfacher Chatbot, der auf Benutzernachrichten in einer gesprächigen und freundlichen Art und Weise antwortet. Dies kann für ein zwangloses Chat-Erlebnis verwendet werden.

- **Name:** `simple-chatbot`

- **Systemeingabeaufforderung:**

`"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`

- **Beispielanfrage:**

`"Hi there! How are you today?"`

- **Beispielantwort:**

`"I'm doing great, thanks for asking! How about you?"`

- **Nachrichtenverlauf:** „10“ (Ermöglicht dem Chatbot, sich den Kontext der Konversation für bis zu 10 Nachrichten zu merken, für einen natürlicheren Ablauf.)

- **Temperatur:** „0,8“ (Fördert Kreativität und sorgt dafür, dass die Antworten relevant und freundlich bleiben.)

----------

### Beispielanfragen und -antworten
| **Anfrage** | **Antwort** |
|--------------------|--------------------------------------------------|
| `What's your favorite color?` | `I love blue! It reminds me of the sky.` |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?` |
| „Erzähl mir etwas Interessantes.“ | „Wussten Sie, dass Kraken drei Herzen haben? Cool, oder?“ |

----------

### Beispiel für eine Skriptintegration
Um dieses Tool programmgesteuert in ioBroker zu verwenden, können Sie es über die Funktion `sendTo` integrieren:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Beispiel 2: Vision / Bildanalysator
**Beschreibung:** Ein multimodales Tool, das Bilder analysiert und detaillierte Beschreibungen oder Erkenntnisse basierend auf dem visuellen Inhalt liefert. Das Tool kann Objekte, Szenen und andere visuelle Elemente im Bild identifizieren.

- **Name:** `Vision-Analyzer`

- **Systemeingabeaufforderung:**

`"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`

- **Beispielanfrage:**

`"What do you see in this image?"`

- **Beispielantwort:**

`"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`

- **Nachrichtenverlauf:** `6` (Behält den Kontext für verwandte Fragen zur Bildanalyse bei.)

- **Temperatur:** „0,6“ (Gleichgewichtet Kreativität und Relevanz für abwechslungsreiche Antworten.)

- **Vision-/Bildanforderungen aktivieren** „true“ (Aktiviert das Tool, Bild-URLs zur Analyse zu akzeptieren.)

- **Vision-Anfragen in den Chatverlauf einschließen** „true“ (Fügt Bild-URLs in den Chatverlauf ein, damit der Kontext erhalten bleibt.)

----------

### Beispiel für eine Skriptintegration
Um dieses Tool programmgesteuert in ioBroker zu verwenden, können Sie es über die Funktion `sendTo` integrieren:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'vision-analyzer',
  text: 'What do you see in this image?',
  image_url: 'https://url-of-the-image-to-analyze.com/image.jpg'
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Beispiel 3: Benutzerdefinierter Wetterreporter
**Beschreibung:** Ein Chatbot, der personalisierte Wetterberichte basierend auf den bereitgestellten Eingabedaten wie Standort, Temperatur und Wetterbedingungen generiert. Die Antworten sind ansprechend und auf den Benutzer zugeschnitten.

- **Name:** `Wetterreporter`

- **Systemeingabeaufforderung:**

`"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`

- **Beispielanfrage:**

`"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`

- **Beispielantwort:**

`Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`

- **Nachrichtenverlauf:** `5` (Ermöglicht die kurzfristige Beibehaltung des Kontexts für zugehörige Folgefragen.)

- **Temperatur:** „0,7“ (Sorgt für eine Mischung aus Kreativität und Relevanz für abwechslungsreiche Berichte.)

----------

### Beispiel für eine Skriptintegration
Um dieses Tool programmgesteuert in ioBroker zu verwenden, können Sie es über die Funktion `sendTo` integrieren:

```javascript
var day =  new  Date().toLocaleString();
var cloudCover = getState('daswetter.0.NextHours.Location_1.Day_1.current.clouds_value').val;
var rlf = getState('daswetter.0.NextHours.Location_1.Day_1.current.humidity_value').val;
var pressure = getState('daswetter.0.NextHours.Location_1.Day_1.current.pressure_value').val;
var rain = getState('daswetter.0.NextHours.Location_1.Day_1.current.rain_value').val;
var temp = getState('daswetter.0.NextHours.Location_1.Day_1.current.temp_value').val;
var wind = getState('daswetter.0.NextHours.Location_1.Day_1.current.wind_value').val;

var message =  'Current datetime '  + day +  '. Weatherdata: Temperature '  + temp +  '°C, '  +  'Humidity '  + rlf +  '%, '  +  'Cloudcover '  + cloudCover +  '%, '  +  'Airpressure '  + pressure +  'mbar, '  +  'Wind '  + wind +  'kmh, '  +  'Rain '  + rain +  'mm. ';

sendTo('ai-toolbox.0',  'tool_request',  {
	'tool':  'weather-reporter',
	'text': message,
},  async  (result)  =>  {
	log(result);
});

```

### Beispiel 4: Musikvorschlags-Assistent
**Beschreibung:** Empfiehlt Musikwiedergabelisten basierend auf dem aktuellen Wetter und der Tageszeit. Kann mit einem intelligenten Lautsprecher wie Alexa oder Google Home verwendet werden.

- **Name:** `Musik-Empfehlung`
- **Systemeingabeaufforderung:**

`"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`

- **Beispielanfrage:**

`"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`

- **Beispielantwort:**

`"Christmas Music"`

- **Nachrichtenverlauf:** `7` (Wir verwenden den Wert 7, da wir dieses Beispieltool einmal am Tag auslösen und nicht möchten, dass es seine Antworten wiederholt. Mit dieser Einstellung sieht es, was es in den letzten 7 Antworten auf unsere Anfragen vorgeschlagen hat.)
- **Temperatur:** „0,7“ (gleicht Kreativität und Relevanz aus)

**Beispiele für eine Anfrage und Antwort an dieses Tool könnten so aussehen:**

| **Anfrage** | **Antwort** |
|--------------------|--------------------------------------------------|
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C` | `Latin Summer Music` |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music` |
| `Aktuelle Zeit 11. November 2024 12:00. Außentemperatur: 15°C` | `Akustische Gitarrenmusik` |

---

### Beispiel 5: Lichteinstellungsempfehlung
**Beschreibung:** Empfiehlt RGB-Lichteinstellungen basierend auf der Stimmung und dem Genre der aktuell gespielten Musik. Das Tool analysiert die Eigenschaften der Musik (z. B. Tempo, Stimmung) und schlägt geeignete Lichtfarben für fünf RGB-Lichter vor. Gibt JSON mit RGB-Hex-Werten für jedes Licht aus.

- **Name:** `Lichtsetzer`

- **Systemeingabeaufforderung:**

`"You are a smart home assistant. Based on the characteristics of the currently playing music, recommend RGB hex color values for five different lights to create an immersive atmosphere. Respond only with a JSON object containing the RGB hex values for each light."`

- **Beispielanfrage:**

```
Faithless - Insomnia
```

- **Beispielantwort:**

```json
{
  "light1": "#FF4500",
  "light2": "#FFA500",
  "light3": "#FFFF00",
  "light4": "#ADFF2F",
  "light5": "#00FF00"
}
```

- **Nachrichtenverlauf:** `0` (Einmalverwendungstool zur Minimierung der Token-Nutzung.)

- **Temperatur:** „0,6“ (Gleichgewicht zwischen Kreativität und Beständigkeit.)

---

### Beispielanfragen und -antworten
| **Anfrage** | **Antwort** |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `The Beatles - Here Comes The Sun` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Mozart - Eine kleine Nachtmusik` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| „Mozart – Eine kleine Nachtmusik“ | `{ „light1“: „#FFD700“, „light2“: „#FFA500“, „light3“: „#FF8C00“, „light4“: „#FF4500“, „light5“: „#FF0000“ }` |

---

### Beispiel für eine Skriptintegration
Um dieses Tool programmgesteuert in ioBroker zu verwenden, können Sie es über die Funktion `sendTo` integrieren:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```

---

## Best Practices: Maximieren Sie das Potenzial Ihrer KI-Tools
Damit Sie den ioBroker AI Toolbox Adapter und seine Tools optimal nutzen können, finden Sie hier einige Best Practices, Tipps und Tricks:

#### **1. Wichtige Konzepte verstehen**
- **Systemeingabeaufforderung**:

Die Systemaufforderung definiert das Verhalten und den Stil Ihres KI-Tools. Betrachten Sie sie als die „Persönlichkeit“ oder „Richtlinien“ für das Tool. Eine Systemaufforderung für einen Wetterbot könnte beispielsweise lauten: `"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`

- **Temperatur**:

Mit dieser Einstellung können Sie festlegen, wie „kreativ“ die Antworten sind. Niedrigere Werte (z. B. 0,2) machen das Tool sachlicher und deterministischer, während höhere Werte (z. B. 0,8) abwechslungsreichere und kreativere Ergebnisse ermöglichen.

- **Maximale Anzahl Token**:

Steuert die Länge der Antworten. Stellen Sie den Wert hoch für ausführliche Antworten und niedrig für präzise Ergebnisse ein.

- **Nachrichtenverlauf**:

Auf diese Weise können Tools den Kontext beibehalten, um die Konversationskontinuität zu gewährleisten. Verwenden Sie einen höheren Wert (z. B. 10) für Chatbots und einen niedrigeren Wert (z. B. 0) für einmalige Antworten, um Token zu sparen.

----------

#### **2. Erstellen Sie klare und spezifische Tools**
- Verwenden Sie **spezifische Systemaufforderungen**, die auf den Zweck des Tools zugeschnitten sind. Eine gut gestaltete Systemaufforderung gewährleistet fokussierte und relevante Ergebnisse.
- Geben Sie **Beispielanfragen und -antworten** an, um klare Erwartungen an das Modell zu setzen. Dies trägt zu konsistentem Verhalten und besserem Verständnis bei.

----------

#### **3. Konfigurieren Sie KI-Anbieter sorgfältig**
Jeder Anbieter bietet einzigartige Stärken. Wählen Sie das Modell, das zu Ihrem Anwendungsfall passt, und experimentieren Sie mit verschiedenen Optionen, um die optimale Lösung zu finden.

----------

#### **4. Leistung und Kosten ins Gleichgewicht bringen**
- Beginnen Sie mit **kostenlosen Modellen** wie „meta-llama“ über OpenRouter, um Ideen zu testen, bevor Sie auf leistungsstärkere kostenpflichtige Optionen umsteigen.
- Verwenden Sie **Token-Statistiken** (verfügbar in „.statistics.tokens_input“ und „.statistics.tokens_output“), um die Nutzung zu überwachen und Toolkonfigurationen zu optimieren.

----------

#### **5. Nutzen Sie dynamische und wiederverwendbare Komponenten**
- **Dynamische Systemaufforderungen**: Passen Sie die Eingabeaufforderungen anhand von Echtzeitdaten an. Rufen Sie beispielsweise Live-Wetterdaten ab, um personalisierte Prognosen zu erstellen.

```javascript
sendTo('ai-toolbox.0', 'model_request', {
    model: 'MODEL-NAME',
    system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
    text: 'What should I do today?',
}, (result) => console.info(result.text));

```

- **Skriptintegration**: Verwenden Sie JavaScript, um Parameter wie Temperatur oder Systemaufforderungen basierend auf externen Eingaben dynamisch anzupassen.

----------

#### **6. Testen, optimieren und weiterentwickeln**
- Verwenden Sie Debugprotokolle, um Probleme bei der Toolleistung zu identifizieren.

Stellen Sie die Protokollebene in der ioBroker-Administratoroberfläche auf `debug` ein.

- Experimentieren Sie mit **verschiedenen Systemaufforderungen, Temperatureinstellungen und Token-Limits**, um das Verhalten zu optimieren.

----------

#### **7. Bauen Sie modulare Lösungen**
- Teilen Sie komplexe Aufgaben in kleinere, wiederverwendbare Tools auf. Verwenden Sie beispielsweise ein Tool zum Analysieren von Daten und ein anderes zum Erstellen von Berichten. Kombinieren Sie diese in Ihren Skripten für leistungsstarke Workflows.

----------

#### **8. Nachrichtenverlauf verwalten**
- Behalten Sie bei chatbasierten Tools eine überschaubare Verlaufslänge bei, um Kontext ohne übermäßige Token-Nutzung bereitzustellen.

----------

#### **9. Verwenden Sie JSON-Ausgaben zur Automatisierung**
Konfigurieren Sie für in Smart Homes oder Skripte integrierte Tools das Antwortformat in JSON, indem Sie die Beispielantwort in dem Format angeben, das Sie erhalten möchten.

----------

Diese bewährten Methoden, kombiniert mit Experimenten und iterativer Verbesserung, stellen sicher, dass Ihre KI-Tools aussagekräftige und zuverlässige Ergebnisse liefern, die auf Ihre Smart-Home-Umgebung zugeschnitten sind.

## Entwicklung
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
* (@ToGe3688) Better error handling for Provider APIs
* (@ToGe3688) Added Anthropic API Versioning

### 0.1.1 (2025-05-01)
* (@ToGe3688) Added timeouts for api providers

### 0.1.0 (2025-04-01)
* (@ToGe3688) Beta Release

### 0.0.7 (2024-27-12)
* (@ToGe3688) Added translations, updated Readme, changed image fetch method to axios

### 0.0.6 (2024-26-12)
* (@ToGe3688) Added support for local files for image analysis

### 0.0.4 (2024-26-12)
* (@ToGe3688) Added vision capabilities for tools

### 0.0.3 (2024-25-12)
* (@ToGe3688) Fixed a bug with the OpenAI API Provider

### 0.0.2 (2024-07-12)
* (@ToGe3688) Added direct model requests, moved tools to separate objects, added statistics and request history

### 0.0.1 (2024-05-12)
* (@ToGe3688) initial release

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