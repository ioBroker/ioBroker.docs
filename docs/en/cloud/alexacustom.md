---
title: Alexa Custom Skill
lastChanged: 01.02.2025
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/alexacustom.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: Su81nXGmYCs4yOuH029J6Lxpnj6QFGKD/M2LpGR2DoI=
---
# The Alexa Custom Skill
## What is the ioBroker Alexa Custom Skill?
The ioBroker Alexa Custom Skill enables **extended voice control** for your smart home with individual commands.
In contrast to the ioBroker.iot Skill, which uses standard smart home commands, the Custom Skill allows **complex interactions** such as status queries, individual routines or starting automations.

Using the invocation name `i o Broker` you can instruct Alexa to perform certain tasks or retrieve information from your ioBroker system.

### Functions and possibilities
The `ioBroker Custom` Alexa Skill enables individual voice commands for the smart home, status queries for sensor values such as temperature or window status, the control of complex scenes and routines, and the integration with external services via ioBroker scripts. It can be used in parallel with the `ioBroker.iot` Skill.

### Setting up the ioBroker Custom Alexa Skill
Install ioBroker.iot adapter: The custom skill only works with the ioBroker.iot adapter. If this is not yet installed, it can be installed via the ioBroker admin area under Adapter → ioBroker.iot adapter.

### Enable Alexa Custom Skill
Open the Amazon Alexa app or go to the Alexa Skills page.

Search for `ioBroker Custom` Skill.

Activate the skill and link your Amazon Alexa account to ioBroker.

## Custom Skill - Use your own voice commands
The answers for the custom skill can be processed in two ways:

- with text2command
- with JavaScript

### Text2command
If a `text2command` instance is defined in the configuration interface, the request is sent to this instance.

`text2command` must be configured to recognize the expected phrase and generate an appropriate response.

### JavaScript
It is possible to process the request directly with a script. This is the default option if no `text2command` instance is selected.

If a `text2command` instance has been defined, this instance must provide the response and the response from the script is ignored.

The adapter provides the details in two states with different levels of detail:

- `smart.lastCommand` contains the received text including information about the request type (intent). Example: askDevice Status lawn mower
- `smart.lastCommandObj` contains a JSON string that can be parsed into an object containing the following information:
- `words`: Contains the received words as an array
- `intent`: Contains the request type. Possible values are:
    - v1 Skill: `askDevice`, `controlDevice`, `actionStart`, `actionEnd`, `askWhen`, `askWhere`, `askWho`
- v2 Skill: `queryIntent` (if all spoken text has been captured), `controlDevice` (for a fallback with only partial text)
- `deviceId`: Contains a device ID that identifies the device from which the request was sent (if provided by Amazon, otherwise empty)
- `deviceRoom`: Contains an associated room identifier that can be configured in the ioBroker IoT admin UI for collected device IDs
- `sessionId`: Contains a session ID of the skill session, should be the same if several commands are spoken in succession (if provided by Amazon, otherwise empty)
- `userId`: Contains a user ID of the device owner or interacting user (if provided by Amazon, otherwise empty)
- `userName`: Contains an associated username that can be configured in the IoT admin UI for collected user IDs

Further details on word recognition and the different request types of the Alexa Custom Skill are available at the following link: [ioBroker Forum](https://forum.iobroker.net/viewtopic.php?f=37&t=17452)

### Return response via smart.lastResponse State
The response must be written to the smart.lastResponse state within 200ms. It can be either a simple text string or a JSON object.

- If it is a text string, it will be sent back to the skill as a response.
- If the response is a JSON object, the following keys can be used:
- `responseText`: Contains the text that is returned to Amazon
- `shouldEndSession`: A boolean value that controls whether the session ends after the response or remains open for further input
- `sessionId`: Contains the session ID the response is intended for. If not specified, the first expected session is used.

### Send response via message to the iot instance
The ioBroker iot instance also accepts a message named `alexaCustomResponse` containing the key response. This object can contain the keys `responseText`,` shouldEndSession` and `sessionId`.

The iot instance does not send a response to the message.

### Example of a script for processing texts
```js
// Wichtig: ack=true setzen
on({ id: 'iot.0.smart.lastCommand', ack: true, change: 'any' }, obj => {
    // Die Antwort muss innerhalb von 200ms vorbereitet und in iot.X.smart.lastResponse geschrieben werden
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // Wichtig: ack=false (Standard)
});
```

### Example of a script for processing JSON objects
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

## Examples of voice commands
**Status queries:**

- “Alexa, ask ioBroker about the temperature in the living room.”
- “Alexa, ask ioBroker if the garage door is open.”

**Control commands:**

- “Alexa, tell ioBroker that I’m coming home.”
- “Alexa, ask ioBroker to start my coffee machine.”

**Scenes and routines:**

- “Alexa, tell ioBroker that I’m going to sleep.”

## Advantages of the ioBroker Alexa Custom Skills
The ioBroker Custom Skill offers a high level of flexibility through individual voice commands.
It complements the IoT skill with more comprehensive voice control, enables status queries for sensor values and system information, and allows the integration of automation and scripts. The Custom Skill offers a customizable and powerful way to control the smart home via Alexa.