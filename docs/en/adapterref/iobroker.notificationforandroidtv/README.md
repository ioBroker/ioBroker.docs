![Logo](admin/notificationforandroidtv.png)
# ioBroker.notificationforandroidtv - Benachrichtigungsintegration für Android TV/Fire TV

[![NPM](https://nodei.co/npm/iobroker.notificationforandroidtv.png?downloads=true)](https://nodei.co/npm/iobroker.notificationforandroidtv/)

Notification integration for IoBroker includes support for Notifications for [Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) and Notifications for [Fire TV](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK). With this integration, you can send notifications to your Android TV device. It enables an overlay displaying the message content for a customizable duration before disappearing. Additionally, it supports sending images, such as those from security cameras, and custom icons. Icons function similarly to images, appearing smaller and to the left of the notification, while images display larger and above the notification.

These notifications operate within the global scope of your Android TV device, appearing regardless of the active application.

During setup, note that there are two distinct apps: one for your smartphone (which isn't necessary for this platform) and another for your Android TV device to receive notifications. The app required for displaying notifications sent from IoBroker is available in the store of your Android TV device. Any in-app purchases are exclusive to the client for Android smartphones and do not restrict pushing notifications from IoBroker.

From version 3.0.0, our notification integration also supports [PiPup](https://github.com/rogro82/PiPup). PiPup can be utilized to transmit video streams, for example, from cameras, or to overlay websites onto your Android TV screen. It provides a versatile solution for integrating various content seamlessly into your Android TV experience.

## Description
The notification integration for IoBroker supports sending notifications to Android TV and Fire TV devices. This integration allows customizable message overlays to be displayed on the TV screen for a specified duration. Additionally, it can display images, such as those from security cameras, and custom icons. Furthermore, it introduces a new feature to stream videos and web content seamlessly to your Android TV or Fire TV device. This means you can use PiPup to broadcast video streams, such as those from cameras, or overlay websites directly onto your TV screen.

## Setup Steps:

### 1. Adapter Settings:
- Go to the adapter settings in the IoBroker interface.
- Add the IP addresses of the target devices and give them names for identification.

### 2. Download the App on Your Android TV / Fire TV:
- Download the "Notifications for Android TV" app for Android TV devices from [Google Play](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google).
- Download the "Notifications for Fire TV" app for Fire TV devices from [Amazon](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK).
- **Only PiPup** check install guide at 5 

### 3. Creation of Objects with the Following Settings for Notifications for Android TV & Notifications for Fire TV

| Setting        | Description                                 | Example Value            |
| -------------- | ------------------------------------------- | ------------------------- |
| duration       | Display duration in seconds                  | 10 s                      |
| ip             | IP address of the TV device                  | 192.168.0.100             |
| message        | Message to be sent                           | "Test message"            |
| position       | Position on the TV screen                    | 0 = "BOTTOM_RIGHT"            |
| title          | Title of the message                         | "Important Notification"  |
| transparency   | Transparency of the overlay                  | 25                        |
| type           | Display type of the overlay                  | Standard, ONLY_TITLE, ONLY_ICON         |
| color          | Color                   | blue, green,...           |
| width          | Overlay size                   | small, xxl,...            |
| icon           | Icon selection                   | ! ? :-)                  |
| iconurl        | Icon URL                   | http://192.168.20.111/myIcon.png |
| delete_icon    | Clear icon URL after sending                | true / false              |
| imageurl       | Image URL                   | http://192.168.20.111/myImage.png |
| delete_image   | Clear image URL after sending               | true / false              |
| payload           | json object                   |{"msg":"my Message","bkgcolor": "7","title": "my Title"} ,... duration,position,width,transparency,type,icon,iconurl,imageurl |

### 3.1 Creation of Objects with the Following Settings for PiPup
#### subfolder PiPup per device

| Setting        | Description                                 | Example Value            |
| -------------- | ------------------------------------------- | ------------------------- |
| duration       | Display duration in seconds                  | 10 s                      |
| message        | Message to be sent                           | "Test message"            |
| position       | Position on the TV screen                    | 0 = "TopRight"            |
| title          | Title of the message                         | "Important Notification"  |
| messageColor   | ColorCode message                  | #E11AE7           |
| titleColor   | ColorCode title                 | #1AE730           |
| messageColor   | ColorCode background               | #711AE7           |
| titleSize   | size from title                  | 20                        |
| messageSize   | size from message                  | 18                        |
| transparency   | Transparency of the overlay                  | 25                        |
| width          | image/web/video width  | 640 px    |
| height          | web height  | 480 px    |
| url       | stream URL                   | http://192.168.20.111/myImage.png |
| type           | stream type                  | image/web/video        |
| payload           | json object                   |{"duration": 30,"position": 0,"title": "Your awesome title","titleColor": "#0066cc","titleSize": 20,"message": "What ever you want to say... do it here...","messageColor": "#000000","messageSize": 14,"backgroundColor": "#ffffff","media": { "image": {"uri": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cfcc3137009463.5731d08bd66a1.png", "width": 480}}} |

### 4. Sending Messages:
- Once a message is entered in the "message" object or under "payload," it will be sent to the TV device. Payload only uses the IP address from the objects; the rest must be passed through the payload object.
- The same applies to PiPup; here the URL is also transmitted when a message is entered.

### 5. PiPup Installation Guide

## For Android TV Users

Please follow the instructions at [PiPup GitHub](https://github.com/rogro82/PiPup) for Android TV.

## For Fire TV or other Android TV without Google Play Store

1. Install an app like [atvTools](https://apps.apple.com/us/app/atvtools/id1661419573) on your smartphone.
2. Download the [PiPup apk files](https://github.com/desertblade/PiPup/releases) on your smartphone.
3. Transfer the apk files to your Android TV.

### Using adb Commands

4. Open the command console on your smartphone.

5. Execute the following command to allow SYSTEM_ALERT_WINDOW permission:

   ```bash
   adb shell appops set nl.rogro82.pipup SYSTEM_ALERT_WINDOW allow
	```
Ensure that your Android TV is connected to the same network as your smartphone, and your Android TV has [developer options](https://www.firesticktricks.com/developer-options-firestick.html) enabled.

Now, you should be able to use PiPup on your Fire TV or other Android TV without the Google Play Store.


## Changelog
### 3.0.4 (2024-04-24)
* (DNAngel/mcm1957) Release merges

### 3.0.3 (2024-02-16)
* (DNAngel) audit fixes

### 3.0.1 (2024-01-27)
* (DNAngel) typo fix

### 3.0.0 (2024-01-27)
* (DNAngel) added support for [PiPup](https://github.com/rogro82/PiPup) video and web stream

### 2.4.0 (2024-01-25)
* (DNAngel) change requests for official release by @mcm1957 & @Apollon77

### 2.3.1 (2024-01-12)
* (DNAngel) payload bugfix

### 2.3.0 (2024-01-08)
* (DNAngel) extended payload possibility as message object

### 2.2.2 (2024-01-01)
* (DNAngel) Stable release

### 2.2.0 (2023-12-22)
* (DNAngel) translations for official release

### 2.1.2 (2023-12-21)
* (DNAngel) small small translation issues

### 2.1.1 (2023-12-21)
* (DNAngel) device name added

### 2.1.0 (2023-12-21)
* (DNAngel) color added
* (DNAngel) icon & icon_url added
* (DNAngel) image & image_url added

### 2.0.3 (2023-12-18)
* (ldittmar81) Typo fix

### 2.0.2 (2023-12-18)
* (DNAngel) Ui Button fixed

### 2.0.1 (2023-12-18)
* (DNAngel) Design changes & description

### 2.0.0 (2023-12-18)
* (DNAngel) initial release

## License
MIT License

Copyright (c) 2024 DNAngel

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