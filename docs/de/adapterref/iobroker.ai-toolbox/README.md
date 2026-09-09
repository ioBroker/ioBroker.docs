---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ai-toolbox/README.md
title: ioBroker.ai-Toolbox
hash: OexmI9Ufijx9oNRIpRepIEwJCrSbdvt/nd8vhLnJP10=
---
![Logo](../../../en/adapterref/iobroker.ai-toolbox/admin/ai-toolbox.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-toolbox.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ai-toolbox.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ai-toolbox-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ai-toolbox-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ai-toolbox.png?downloads=true)
![Test und Freigabe](https://github.com/ToGe3688/ioBroker.ai-toolbox/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ai-Toolbox

## Überblick

Der ioBroker AI Toolbox Adapter integriert anpassbare KI-Tools in Ihr Smart Home. Er unterstützt mehrere Anbieter von Large Language Models (LLM) und bietet ein flexibles Framework für Automatisierung und Interaktion. Durch die Kombination von Daten aus Smart-Home-Geräten mit KI-Funktionen kann der ioBroker AI Toolbox Adapter hochgradig personalisierte und nützliche Tools für Ihre Haushaltsautomatisierungsaufgaben und die Interaktion mit LLM-Modellen erstellen.

## Merkmale

- Unterstützung durch mehrere KI-Anbieter und -Modelle.
- Erstellen Sie maßgeschneiderte KI-Tools für spezifische Aufgaben
- Chatverlaufsverwaltung zur Kontextbeibehaltung.
- Statistiken zur Token-Nutzung und zum Anfrageverlauf.
- Bildverarbeitungsfunktionen zur Bildanalyse.

## Unterstützte Anbieter

- **Anthropic** : [anthropic.com](https://anthropic.com)
- **OpenAI** : [openai.com](https://openai.com)
- **Perplexity** : [perplexity.ai](https://perplexity.ai)
- **OpenRouter** : [openrouter.ai](https://openrouter.ai) (Kostenlose Nutzungsmodelle für Einsteiger)
- **Deepseek** : [deepseek.com](http://deepseek.com/)
- **Benutzerdefinierte/selbstgehostete Modelle** (z. B. LM Studio, LocalAI)

---

## Schnellstart

1. Installieren Sie den Adapter.
2. Erstellen Sie ein Konto und erhalten Sie ein API-Token von openrouter.ai
3. Konfigurieren Sie den Adapter mit dem API-Token.
4. Die bei der Installation erstellten Beispieltools verwenden das kostenlose Modell meta-llama/llama-3.2-3b-instruct:free für OpenRouter.
5. Sende eine Nachricht mit dem Datenpunkt .text\_request an das Tool und prüfe .text\_response auf die Antwort.

Bitte beachten Sie, dass es bei den kostenlosen Modellen mitunter zu längeren Wartezeiten bis zur ersten Antwort kommen kann, sie möglicherweise überlastet sind oder andere Einschränkungen aufweisen. Die Modelle unterscheiden sich zudem in Qualität und Leistungsfähigkeit. Wählen Sie daher das passende Modell für Ihren Anwendungsfall.

**Auch wenn diese Readme-Datei auf Englisch verfasst ist, sind die meisten Modelle mehrsprachig. Versuchen Sie einfach, Ihre Tools in Ihrer Muttersprache zu schreiben, um das gewünschte Ergebnis zu erzielen!**

---

## Konfiguration

### Werkzeuge

Benutzerdefinierte KI-Tools definieren, die auf spezifische Aufgaben zugeschnitten sind:

| **Einstellung**                              | **Beschreibung**                                                                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                                     | Der Name des Werkzeugs.                                                                                                                                            |
| **Modell**                                   | Wählen Sie das LLM-Modell (konfiguriert unter Anbieter).                                                                                                           |
| **Systemaufforderung**                       | Geben Sie detaillierte Informationen zur Beschreibung des Tools an.                                                                                                |
| **Beispielanfrage**                          | (Optional) Eine Beispielanfrage.                                                                                                                                   |
| **Beispielantwort**                          | (Erforderlich, wenn eine Beispielanfrage bereitgestellt wird) Die ideale Antwort.                                                                                  |
| **Nachrichtenverlauf**                       | Vorherige Nachrichten einbeziehen (für chatbotähnliches Verhalten). Für Tools, die nur einmal verwendet werden, auf 0 setzen, um den Tokenverbrauch zu minimieren. |
| **Temperatur**                               | Kontrolliert die Kreativität/Konsistenz der Reaktionen.                                                                                                            |
| **Max. Token**                               | Begrenzt die Anzahl der Antworttoken.                                                                                                                              |
| **Wiederholungsverzögerung**                 | Verzögerung zwischen Wiederholungsversuchen, falls die Anfrage fehlschlägt                                                                                         |
| **Maximale Wiederholungsversuche**           | Maximale Anzahl an Wiederholungsversuchen pro Anfrage.                                                                                                             |
| **Bild-/Vision-Anfragen aktivieren**         | Bild-/Vision-Eingabe aktivieren.                                                                                                                                   |
| **Sehanfragen in den Chatverlauf aufnehmen** | Bilddaten in den Chatverlauf einbeziehen                                                                                                                           |

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

#### Deepseek

| **Einstellung** | **Beschreibung**                          |
| --------------- | ----------------------------------------- |
| **API-Token**   | Geben Sie Ihr Deepseek-API-Token ein.     |
| **Modelle**     | Geben Sie die zu verwendenden Modelle an. |

#### Brauch

| **Einstellung**                      | **Beschreibung**                                                                  |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| **URL des Inferenzservers**          | URL des benutzerdefinierten/selbstgehosteten Inferenzservers.                     |
| **API-Token für den Inferenzserver** | API-Token für Ihren Inferenzserver.                                               |
| **Modelle**                          | Geben Sie die zu verwendenden Modelle an.                                         |
| **Notiz**                            | Sicherstellen der Einhaltung gängiger AI LLM API-Standards (z. B. LM Studio API). |

---

## Ihre Werkzeuge nutzen

### Objektinteraktion

Jedes Tool erscheint im ioBroker-Objektbaum. Verwenden Sie`Tools.$YourToolName.text_request` um Anfragen zu senden und`Tools.$YourToolName.text_response` um Antworten zu erhalten.

#### Anfragen zu Bildmaterial

Wenn Sie Bild-/Vision-Anfragen aktiviert haben, können Sie Folgendes verwenden:`Tools.$YourToolName.image_url` Um eine Bild-URL oder einen lokalen Dateipfad für die Analyse durch das Tool festzulegen, wird das Bild in die Anfrage aufgenommen, sobald Sie den Status des Tools festlegen.`Tools.$YourToolName.text_request` Datenpunkt.

Hinweis: Sie können eine lokale URL (z. B. in Ihrem lokalen Netzwerk <http://192.168.178.1/image.jpg> ) oder einen Dateipfad (wo ioBroker Leseberechtigung hat, z. B. /opt/iobroker/iobroker-data/telegram\_0/photo/image.jpg) verwenden. Der Adapter wandelt das Bild in einen Base64-String um und fügt ihn der Anfrage hinzu.

## Skriptintegration (`sendTo` )

Sie können programmatisch über die`sendTo` Funktion:

#### Textanfragen

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Bild-/Vision-Anfragen mit URL

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
    'tool': 'YOUR-TOOL-NAME',
    'text': 'The message for the tool to respond to',
    'image_url': 'https://url-of-the-image-to-analyze.com/image.jpg',
}, async (result) => {
    console.info(result); // Outputs the tool's response as text string
});
```

#### Bild-/Vision-Anfragen mit lokaler Datei

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

Jedes definierte Modell erscheint auch im ioBroker-Objektbaum. Verwenden Sie`Models.$ModelName.text_request` um Anfragen zu senden und`Models.$ModelName.text_response` Um Antworten zu erhalten. Mit der Skriptintegration können Sie noch kreativere Integrationen erstellen, beispielsweise eine dynamische Systemabfrage.

## Skriptintegration (`sendTo` )

Sie können programmatisch über die`sendTo` Funktion:

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

#### Bild-/Vision-Anfragen mit URL

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

#### Bild-/Vision-Anfragen mit lokaler Datei

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

Es werden Statistiken sowohl für Ihre erstellten Tools als auch für die Modelle erstellt, damit Sie die Token-Nutzung und andere Daten verfolgen können.

| **Datenpunkt**                     | **Beschreibung**                                                    |
| ---------------------------------- | ------------------------------------------------------------------- |
| **.statistics.lastRequest**        | Zeitstempel der letzten Anfrage.                                    |
| **.statistics.messages** \*        | JSON-Array der Nachrichtenhistorie (falls Nachrichtenhistorie > 0). |
| **.statistics.clear\_messages** \* | Schaltfläche zum Löschen des Nachrichtenverlaufs.                   |
| **.statistics.tokens\_input**      | Gesamtzahl der verwendeten Eingabe-Tokens.                          |
| **.statistics.tokens\_output**     | Insgesamt verwendete Output-Tokens.                                 |

`* only available for tools, models don't have a message history`

### Anfrage

| **Datenpunkt**     | **Beschreibung**                                                                    |
| ------------------ | ----------------------------------------------------------------------------------- |
| **.request.body**  | Anfragetext, der an die API gesendet wird.                                          |
| **.request.state** | Aktueller Status der Anfrage. (Start, Erfolg, Wiederholung, Fehler, Fehlgeschlagen) |

### Antwort

| **Datenpunkt**     | **Beschreibung**               |
| ------------------ | ------------------------------ |
| **.request.error** | Wird im Fehlerfall ausgefüllt. |
| **.request.raw**   | Rohe JSON-Antwort vom Modell.  |

---

## Beispiele

Die folgenden Beispiele veranschaulichen die Konfiguration und Verwendung benutzerdefinierter KI-Tools innerhalb des ioBroker AI Toolbox Adapters. Sie zeigen, wie der Adapter Daten nutzen kann, um intelligente Antworten und Empfehlungen zu liefern.

---

### Beispiel 1: Einfacher Chatbot

**Beschreibung:** Ein einfacher Chatbot, der auf Nutzernachrichten in einem lockeren und freundlichen Ton antwortet. Er eignet sich für ungezwungene Gespräche.

- **Name:**`simple-chatbot`

- **Systemaufforderung:**\
  `"You are a friendly and conversational chatbot. Respond to user messages in an engaging and cheerful way. Keep your answers brief and focus on maintaining a pleasant tone."`

- **Beispielanfrage:**\
  `"Hi there! How are you today?"`

- **Beispielantwort:**\
  `"I'm doing great, thanks for asking! How about you?"`

- **Nachrichtenverlauf:**`10` (Ermöglicht es dem Chatbot, sich den Kontext der letzten 10 Gesprächsrunden zu merken, um einen natürlicheren Gesprächsverlauf zu gewährleisten.)

- **Temperatur:**`0.8` (Fördert die Kreativität und sorgt gleichzeitig für relevante und freundliche Antworten.)

---

### Beispielanfragen und -antworten

| **Anfrage**                      | **Antwort**                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `What's your favorite color?`    | `I love blue! It reminds me of the sky.`                          |
| `Do you know any jokes?`         | `Why don’t skeletons fight each other? They don’t have the guts!` |
| `Tell me something interesting.` | `Did you know that octopuses have three hearts? Cool, right?`     |

---

### Beispiel für die Skriptintegration

Um dieses Tool programmatisch in ioBroker zu verwenden, können Sie es über die folgende Schnittstelle integrieren:`sendTo` Funktion:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'simple-chatbot',
  text: 'Hi, chatbot! How’s it going?',
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Beispiel 2: Bildanalyse

**Beschreibung:** Ein multimodales Werkzeug zur Bildanalyse, das detaillierte Beschreibungen und Erkenntnisse auf Basis des visuellen Inhalts liefert. Es kann Objekte, Szenen und andere visuelle Elemente im Bild identifizieren.

- **Name:**`vision-analyzer`

- **Systemaufforderung:**\
  `"You are a vision assistant. Analyze the provided image and generate a detailed description or insights based on the visual content. Your responses should be informative and engaging, focusing on key elements and context in the image."`

- **Beispielanfrage:**\
  `"What do you see in this image?"`

- **Beispielantwort:**\
  `"This image shows a tall, columnar evergreen tree growing in a black nursery pot or container. It appears to be a cypress or juniper variety, with dense, dark green foliage that grows in a narrow, upright pyramidal shape. These types of trees are popular for landscaping, especially in formal gardens or as accent plants, and they can also be used to create natural privacy screens when planted in rows."`

- **Nachrichtenverlauf:**`6` (Behält den Kontext für verwandte Bildanalysefragen bei.)

- **Temperatur:**`0.6` (Bietet ein ausgewogenes Verhältnis zwischen Kreativität und Relevanz für unterschiedliche Reaktionen.)

- **Bild-/Vision-Anfragen aktivieren**`true` (Ermöglicht es dem Tool, Bild-URLs zur Analyse zu akzeptieren.)

- **Sehanfragen in den Chatverlauf aufnehmen**`true` (Beinhaltet Bild-URLs im Chatverlauf, um den Kontext zu erhalten.)

---

### Beispiel für die Skriptintegration

Um dieses Tool programmatisch in ioBroker zu verwenden, können Sie es über die folgende Schnittstelle integrieren:`sendTo` Funktion:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'vision-analyzer',
  text: 'What do you see in this image?',
  image_url: 'https://url-of-the-image-to-analyze.com/image.jpg'
}, async (result) => {
  console.info(result); // Outputs the chatbot's response
});

```

### Beispiel 3: Benutzerdefinierter Wetterbericht

**Beschreibung:** Ein Chatbot, der personalisierte Wetterberichte auf Basis der eingegebenen Daten wie Standort, Temperatur und Wetterbedingungen erstellt. Die Antworten sind ansprechend und auf den Nutzer zugeschnitten.

- **Name:**`weather-reporter`

- **Systemaufforderung:**\
  `"You are a weather reporter chatbot. Based on the input data, generate a detailed and engaging weather report. Your response should include a friendly greeting, a brief overview of the current conditions, and a suggestion for the day. Keep your tone cheerful and informative."`

- **Beispielanfrage:**\
  `"Current datetime 12/7/2024, 12:00:01 PM. Weatherdata: Temperature 7°C, Humidity 87%, Cloudcover 93%, Airpressure 997mbar, Wind 23kmh, Rain 0mm."`

- **Beispielantwort:**\
  `Hello there! 🌤️ Happy December 7th! As we step into the afternoon, the weather is quite cool at a temperature of 7°C. With a humidity level of 87%, it feels a bit damp out there, so don’t forget to grab your favorite cozy sweater if you’re heading outside! Cloud cover is fairly high today, sitting at 93%, which gives the sky a soft, overcast appearance. The air pressure is at 997 mbar, and while there’s a moderate wind blowing at 23 km/h, it might feel a tad brisk, so a light jacket would be a good call. The good news is that we haven’t seen any rain today, so if you’re planning to venture out, it’s a great time for a stroll or perhaps a warm drink at your favorite café! Stay warm and enjoy your day! ☕🌧️`

- **Nachrichtenverlauf:**`5` (Ermöglicht die kurzfristige Beibehaltung des Kontextes für damit zusammenhängende Folgefragen.)

- **Temperatur:**`0.7` (Gewährleistet eine Mischung aus Kreativität und Relevanz für abwechslungsreiche Berichte.)

---

### Beispiel für die Skriptintegration

Um dieses Tool programmatisch in ioBroker zu verwenden, können Sie es über die folgende Schnittstelle integrieren:`sendTo` Funktion:

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

### Beispiel 4: Musikvorschlagsassistent

**Beschreibung:** Empfiehlt Musik-Playlists basierend auf dem aktuellen Wetter und der Tageszeit. Kann mit Smart Speakern wie Alexa oder Google Home verwendet werden.

- **Name:**`music-recommender`
- **Systemaufforderung:**\
  `"You are a music assistant. Based on the current weather and time of day, suggest a playlist or genre that matches the mood. Use concise and creative recommendations. You answer only with your suggestion and nothing else."`
- **Beispielanfrage:**\
  `"Current Time 24th December 2024 17:30. Outside Temperature: 10°C."`
- **Beispielantwort:**\
  `"Christmas Music"`
- **Nachrichtenverlauf:**`7` (Wir verwenden den Wert 7, da wir dieses Beispieltool einmal täglich ausführen und nicht möchten, dass es seine Antworten wiederholt. Mit dieser Einstellung berücksichtigt es die Vorschläge der letzten 7 Antworten auf unsere Anfragen.)
- **Temperatur:**`0.7` (Gleicht Kreativität und Relevanz aus)

**Beispiele für eine Anfrage und Antwort an dieses Tool könnten wie folgt aussehen:**

| **Anfrage**                                                        | **Antwort**             |
| ------------------------------------------------------------------ | ----------------------- |
| `Current time 3rd June 2024 16:00. Outside Temperature: 31°C`      | `Latin Summer Music`    |
| `Current time 4th February 2024 20:00. Outside Temperature: 5°C`   | `Jazz Music`            |
| `Current time 11th November 2024 12:00. Outside Temperature: 15°C` | `Acoustic Guitar Music` |

---

### Beispiel 5: Empfehlung für Lichteinstellungen

**Beschreibung:** Empfiehlt RGB-Lichteinstellungen basierend auf Stimmung und Genre der aktuell abgespielten Musik. Das Tool analysiert die Merkmale der Musik (z. B. Tempo, Stimmung) und schlägt passende Lichtfarben für fünf RGB-Lampen vor. Die Ausgabe erfolgt im JSON-Format mit den RGB-Hexadezimalwerten für jede Lampe.

- **Name:**`light-setter`

- **Systemaufforderung:**

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

- **Nachrichtenverlauf:**`0` (Einmalverwendungstool zur Minimierung des Tokenverbrauchs.)

- **Temperatur:**`0.6` (Gleicht Kreativität und Beständigkeit aus.)

---

### Beispielanfragen und -antworten

| **Anfrage**                        | **Antwort**                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `The Beatles - Here Comes The Sun` | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |
| `Beethoven - Symphony No. 9`       | `{ "light1": "#FF0000", "light2": "#FF4500", "light3": "#FFA500", "light4": "#FFD700", "light5": "#FFFF00" }` |
| `Mozart - Eine kleine Nachtmusik`  | `{ "light1": "#FFD700", "light2": "#FFA500", "light3": "#FF8C00", "light4": "#FF4500", "light5": "#FF0000" }` |

---

### Beispiel für die Skriptintegration

Um dieses Tool programmatisch in ioBroker zu verwenden, können Sie es über die folgende Schnittstelle integrieren:`sendTo` Funktion:

```javascript
sendTo('ai-toolbox.0', 'tool_request', {
  tool: 'light-setter',
  text: 'Faithless - Insomnia',
}, async (result) => {
  console.info(result); // Outputs the recommended RGB hex values for the lights
});
```

---

## Bewährte Verfahren: Das Potenzial Ihrer KI-Tools optimal nutzen

Damit Sie den ioBroker AI Toolbox Adapter und seine Tools optimal nutzen können, finden Sie hier einige bewährte Methoden, Tipps und Tricks:

#### **1. Schlüsselkonzepte verstehen**

- **Systemaufforderung** :\
  &#x20;Die Systemanweisung definiert das Verhalten und den Stil Ihres KI-Tools. Betrachten Sie sie als die „Persönlichkeit“ oder die „Richtlinien“ des Tools. Eine Systemanweisung für einen Wetter-Bot könnte beispielsweise lauten:\
  `"You are a cheerful weather assistant. Provide detailed weather forecasts in a friendly tone."`

- **Temperatur** :\
  &#x20;Diese Einstellung bestimmt, wie „kreativ“ die Antworten ausfallen. Niedrigere Werte (z. B. 0,2) machen das Tool faktenbasierter und deterministischer, während höhere Werte (z. B. 0,8) vielfältigere und kreativere Ergebnisse ermöglichen.

- **Maximale Tokenanzahl** :\
  &#x20;Steuert die Länge der Antworten. Stellen Sie den Wert hoch ein für ausführliche Antworten und niedrig für kurze Ausgaben.

- **Nachrichtenverlauf** :\
  &#x20;Dadurch können Tools den Kontext für eine kontinuierliche Konversation beibehalten. Verwenden Sie einen höheren Wert (z. B. 10) für Chatbots und einen niedrigeren Wert (z. B. 0) für einmalige Antworten, um Tokens zu sparen.

---

#### **2. Erstellen Sie klare und spezifische Werkzeuge**

- Verwenden Sie **spezifische Systemabfragen,** die auf den Zweck des Tools zugeschnitten sind. Eine gut formulierte Systemabfrage gewährleistet zielgerichtete und relevante Ergebnisse.
- Geben Sie **Beispielanfragen und -antworten** an, um klare Erwartungen an das Modell zu formulieren. Dies fördert einheitliches Verhalten und ein besseres Verständnis.

---

#### **3. KI-Anbieter sorgfältig konfigurieren**

Jeder Anbieter hat seine Stärken. Wählen Sie das Modell, das am besten zu Ihrem Anwendungsfall passt, und probieren Sie verschiedene Optionen aus, um die optimale Lösung zu finden.

---

#### **4. Leistung und Kosten in Einklang bringen**

- Beginnen Sie mit **kostenlosen Modellen** wie`meta-llama` Wir verwenden OpenRouter, um Ideen zu testen, bevor wir auf leistungsfähigere, kostenpflichtige Optionen umsteigen.
- Verwenden Sie **Token-Statistiken** (verfügbar in`.statistics.tokens_input` Und`.statistics.tokens_output` ) um die Nutzung zu überwachen und die Werkzeugkonfigurationen zu optimieren.

---

#### **5. Dynamische und wiederverwendbare Komponenten nutzen**

- **Dynamische Systemaufforderungen** : Passen Sie die Aufforderungen anhand von Echtzeitdaten an. Beispielsweise können Sie Live-Wetterdaten abrufen, um personalisierte Vorhersagen zu erstellen.

  ```javascript
  sendTo('ai-toolbox.0', 'model_request', {
      model: 'MODEL-NAME',
      system_prompt: 'Current weather in {location} is {temperature}°C. Advise suitable outdoor activities.',
      text: 'What should I do today?',
  }, (result) => console.info(result.text));

  ```

- **Skriptintegration** : Verwenden Sie JavaScript, um Parameter wie Temperatur oder Systemmeldungen dynamisch auf Basis externer Eingaben anzupassen.

---

#### **6. Testen, Optimieren und Weiterentwickeln**

- Verwenden Sie Debugging-Protokolle, um Probleme mit der Tool-Performance zu identifizieren.\
  &#x20;Protokollierungsstufe festlegen auf`debug` in der ioBroker-Administrationsoberfläche.
- Experimentieren Sie mit **verschiedenen Systemaufforderungen, Temperatureinstellungen und Token-Limits,** um das Verhalten zu optimieren.

---

#### **7. Modulare Lösungen entwickeln**

- Teilen Sie komplexe Aufgaben in kleinere, wiederverwendbare Werkzeuge auf. Verwenden Sie beispielsweise ein Werkzeug zur Datenanalyse und ein anderes zur Berichtserstellung. Kombinieren Sie diese in Ihren Skripten für leistungsstarke Arbeitsabläufe.

---

#### **8. Nachrichtenverlauf verwalten**

- Bei chatbasierten Tools sollte die Verlaufsdauer überschaubar gehalten werden, um Kontext ohne übermäßigen Tokenverbrauch zu gewährleisten.

---

#### **9. JSON-Ausgaben für die Automatisierung verwenden**

Bei Tools, die in Smart Homes oder Skripte integriert sind, konfigurieren Sie das Antwortformat in JSON, indem Sie die Beispielantwort in dem Format angeben, das Sie erhalten möchten.

---

Diese bewährten Verfahren, kombiniert mit Experimenten und iterativer Verbesserung, gewährleisten, dass Ihre KI-Tools aussagekräftige und zuverlässige Ergebnisse liefern, die auf Ihre Smart-Home-Umgebung zugeschnitten sind.

## Entwicklung

### Debugging

Stellen Sie den Protokollierungsgrad auf ein`debug` Detaillierte Protokolle finden Sie in der ioBroker-Admin-Oberfläche.

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