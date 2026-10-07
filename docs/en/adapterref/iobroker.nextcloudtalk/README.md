# ioBroker Nextcloud Talk Adapter

This adapter sends messages to Nextcloud Talk rooms and can optionally receive messages from one room.

## Configuration

This adapter now uses the ioBroker JSON configuration system. Enter the
following settings in the instance dialog:

1. **Server URL** – for example `https://nextcloud.example.com`
2. **Username** for basic authentication
3. **App Token** generated for the user

## Sending how-to

Write a JSON string to `nextcloudtalk.0.send` to choose the room and text together:

```js
setState('nextcloudtalk.0.send', JSON.stringify({ roomId: 'abc123', text: 'Hello from ioBroker' }));
```

Both fields must be non-empty strings. The write must use `ack=false`, which is the default for `setState`. The `send` state does not change `roomID`.

Existing scripts and Blockly rules can continue using the legacy states: set `roomID` to the Talk room token, then write the message to `text` with `ack=false`. `roomID` selects the room; writing `text` sends the message. Both sending methods use Talk's `/ocs/v2.php/apps/spreed/api/v1/chat/{token}` endpoint.

## Receiving how-to

1. In the adapter instance settings, enable **Receive messages** and enter one **Receive room token**. The configured Nextcloud account must belong to that conversation. Receiving is off by default and monitors only this room.
2. Send a *new* message to that room from another Talk account. The first poll establishes the current position and does not replay older messages.
3. Watch `nextcloudtalk.0.received`. Each incoming user message writes an acknowledged JSON string such as:

   ```json
   {"roomId":"abc123","id":42,"text":"Light on","actorId":"alice","actorDisplayName":"Alice","timestamp":1780000000,"messageType":"comment"}
   ```

### Use the message in JavaScript

Subscribe to every update, parse the JSON, and decide which senders and texts your script accepts:

```js
on({ id: 'nextcloudtalk.0.received', change: 'any', ack: true }, obj => {
    const message = JSON.parse(obj.state.val);
    if (message.actorId === 'alice' && message.text === 'Light on') {
        // Perform your chosen ioBroker action here.
    }
});
```

### Use the message in Blockly

Create a state-change trigger for `nextcloudtalk.0.received` and choose **any update**. Inside it, pass the trigger's current value to **Convert JSON to object** and store the result in a variable such as `message`. Use **Attribute … of object …** with that variable to read `text`, `actorId`, or another field. For example, compare `actorId` with `alice` and `text` with `Light on` in an **if** block before running an action.

The adapter ignores its own and Talk system messages. It does not mark messages or notifications as read, and it does not execute chat commands. `nextcloudtalk.0.receiveCursor` stores the room token and last processed message ID across restarts. A restart between publishing `received` and saving the cursor can repeat a message; scripts that require duplicate protection should track `roomId` and `id`. Successful polls are silent in the adapter log; request failures produce warnings.

## Changelog

### 2.0.0
* Add atomic per-message sending through `send` while keeping `roomID` and `text` compatible.
* Add optional single-room Talk message receiving through the `received` state.
* Add separate sending and receiving how-to guides.

### 1.0.3
* Adapter requires node.js >= 22 now

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025-2026 Rello <github@scherello.de>

[GNU Affero General Public License v3.0](https://github.com/Rello/ioBroker.nextcloudtalk/blob/master/LICENSE)