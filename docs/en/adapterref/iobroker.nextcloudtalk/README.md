# ioBroker Nextcloud Talk Adapter

This adapter allows sending notifications to Nextcloud Talk rooms.

## Configuration

This adapter now uses the ioBroker JSON configuration system. Enter the
following settings in the instance dialog:

1. **Server URL** – for example `https://nextcloud.example.com`
2. **Username** for basic authentication
3. **App Token** generated for the user

## States

 - `roomID` (string): Talk room token to send messages to.
- `text` (string): When this state is changed, the adapter posts the new value as a message to the configured room.

## Usage

Update the `text` state from scripts or other adapters to send a message.
Messages are sent via the Nextcloud Talk API endpoint `/ocs/v2.php/apps/spreed/api/v1/chat/{token}`.

## Changelog

### **WORK IN PROGRESS**

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025 Rello

MIT

