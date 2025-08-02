---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.notificationforandroidtv/README.md
title: ioBroker.notificationforandroidtv – Benachrichtigungsintegration für Android TV/Fire TV
hash: YI6BFufhPQmA6Z0Uq+gCBtF2K4JJ1ZLP1TLPqIHvfZA=
---
![Logo](../../../en/adapterref/iobroker.notificationforandroidtv/admin/notificationforandroidtv.png)

![NPM](https://nodei.co/npm/iobroker.notificationforandroidtv.png?downloads=true)

# IoBroker.notificationforandroidtv – Benachrichtigungsintegration für Android TV/Fire TV
Die Benachrichtigungsintegration für ioBroker umfasst Unterstützung für Benachrichtigungen für [Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) und Benachrichtigungen für [Fire TV](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK). Mit dieser Integration können Sie Benachrichtigungen an Ihr Android TV-Gerät senden. Sie ermöglicht eine Überlagerung, die den Nachrichteninhalt für eine anpassbare Dauer anzeigt, bevor sie verschwindet. Darüber hinaus unterstützt sie das Senden von Bildern, z. B. von Überwachungskameras, und benutzerdefinierten Symbolen. Symbole funktionieren ähnlich wie Bilder und erscheinen kleiner und links von der Benachrichtigung, während Bilder größer und über der Benachrichtigung angezeigt werden.

Diese Benachrichtigungen gelten global auf Ihrem Android TV-Gerät und werden unabhängig von der aktiven Anwendung angezeigt.

Beachten Sie während der Einrichtung, dass es zwei verschiedene Apps gibt: eine für Ihr Smartphone (die für diese Plattform nicht erforderlich ist) und eine andere für Ihr Android TV-Gerät zum Empfangen von Benachrichtigungen. Die zum Anzeigen von von ioBroker gesendeten Benachrichtigungen erforderliche App ist im Store Ihres Android TV-Geräts verfügbar. Alle In-App-Käufe sind exklusiv für den Client für Android-Smartphones und schränken das Senden von Benachrichtigungen von ioBroker nicht ein.

Ab Version 3.0.0 unterstützt unsere Benachrichtigungsintegration auch [PiWelpe](https://github.com/rogro82/PiPup). PiPup kann verwendet werden, um beispielsweise Videostreams von Kameras zu übertragen oder Websites auf Ihren Android TV-Bildschirm zu überlagern. Es bietet eine vielseitige Lösung, um verschiedene Inhalte nahtlos in Ihr Android TV-Erlebnis zu integrieren.

## Beschreibung
Die Benachrichtigungsintegration für ioBroker unterstützt das Senden von Benachrichtigungen an Android TV- und Fire TV-Geräte. Diese Integration ermöglicht die Anzeige anpassbarer Nachrichten-Overlays auf dem Fernsehbildschirm für eine bestimmte Dauer. Darüber hinaus können Bilder, beispielsweise von Überwachungskameras, und benutzerdefinierte Symbole angezeigt werden. Darüber hinaus führt sie eine neue Funktion ein, mit der Videos und Webinhalte nahtlos auf Ihr Android TV- oder Fire TV-Gerät gestreamt werden können. Das bedeutet, dass Sie PiPup verwenden können, um Videostreams, beispielsweise von Kameras, zu übertragen oder Websites direkt auf Ihren Fernsehbildschirm zu überlagern.

## Einrichtungsschritte:
### 1. Adaptereinstellungen:
- Gehen Sie zu den Adaptereinstellungen in der ioBroker-Schnittstelle.
- Fügen Sie die IP-Adressen der Zielgeräte hinzu und geben Sie ihnen Namen zur Identifizierung.

### 2. Laden Sie die App auf Ihr Android TV / Fire TV herunter:
- Laden Sie die App „Notifications for Android TV“ für Android TV-Geräte von [Google Play](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) herunter.
- Laden Sie die App „Notifications for Fire TV“ für Fire TV-Geräte von [Amazon](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK) herunter.
- **Nur PiPup** siehe Installationsanleitung unter 5

### 3. Erstellen von Objekten mit den folgenden Einstellungen für Benachrichtigungen für Android TV und Benachrichtigungen für Fire TV
| Einstellung | Beschreibung | Beispielwert |
| -------------- | ------------------------------------------- | ------------------------- |
| Dauer | Anzeigedauer in Sekunden | 10 s |
| ip | IP-Adresse des TV-Geräts | 192.168.0.100 |
| Nachricht | Zu sendende Nachricht | "Testnachricht" |
| Position | Position auf dem Fernsehbildschirm | 0 = „UNTEN_RECHTS“ |
| Titel | Titel der Nachricht | „Wichtige Mitteilung“ |
| Transparenz | Transparenz des Overlays | 25 |
| Typ | Anzeigetyp des Overlays | Standard, ONLY_TITLE, ONLY_ICON |
| Farbe | Farbe | blau, grün,... |
| Breite | Overlay-Größe | klein, xxl,... |
| Symbol | Symbolauswahl | ! ? :-) |
| Icon-URL | Symbol-URL | http://192.168.20.111/myIcon.png |
| delete_icon | Symbol-URL nach dem Senden löschen | true / false |
| Bild-URL | Bild-URL | http://192.168.20.111/myImage.png |
| delete_image | Bild-URL nach dem Senden löschen | true / false |
| Nutzlast | JSON-Objekt | {"msg": "meine Nachricht", "bkgcolor": "7", "title": "mein Titel"}, ... Dauer, Position, Breite, Transparenz, Typ, Symbol, Symbol-URL, Bild-URL |

### 3.1 Erstellen von Objekten mit den folgenden Einstellungen für PiPup
#### Unterordner PiPup pro Gerät
| Einstellung | Beschreibung | Beispielwert |
| -------------- | ------------------------------------------- | ------------------------- |
| Dauer | Anzeigedauer in Sekunden | 10 s |
| Nachricht | Zu sendende Nachricht | "Testnachricht" |
| Position | Position auf dem Fernsehbildschirm | 0 = „ObenRechts“ |
| Titel | Titel der Nachricht | „Wichtige Mitteilung“ |
| Nachrichtenfarbe | Farbcode-Nachricht | #E11AE7 |
| Titelfarbe | Farbcode Titel | #1AE730 |
| Nachrichtenfarbe | ColorCode-Hintergrund | #711AE7 |
| Titelgröße | Größe ab Titel | 20 |
| messageSize | Größe ab Nachricht | 18 |
| Transparenz | Transparenz des Overlays | 25 |
| Breite | Bild-/Web-/Videobreite | 640 px |
| Höhe | Webhöhe | 480 px |
| URL | Stream-URL | http://192.168.20.111/myImage.png |
| Typ | Streamtyp | Bild/Web/Video |
| Nutzlast | JSON-Objekt | {"Dauer": 30,"Position": 0,"Titel": "Ihr toller Titel","Titelfarbe": "#0066cc","Titelgröße": 20,"Nachricht": "Was auch immer Sie sagen möchten ... tun Sie es hier ...","MessageColor": "#000000","MessageSize": 14,"Hintergrundfarbe": "#ffffff","Medien": { "Bild": {"URI": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cfcc3137009463.5731d08bd66a1.png", "Breite": 480}}} |

### 4. Nachrichten senden:
- Sobald eine Nachricht im Objekt „Nachricht“ oder unter „Nutzlast“ eingegeben wird, wird sie an das TV-Gerät gesendet. Die Nutzlast verwendet nur die IP-Adresse der Objekte; der Rest muss über das Nutzlastobjekt weitergeleitet werden.
- Gleiches gilt für PiPup, hier wird bei der Eingabe einer Nachricht ebenfalls die URL übermittelt.

### 5. PiPup-Installationshandbuch
## Für Android TV-Benutzer
Bitte folgen Sie den Anweisungen unter [PiPup GitHub](https://github.com/rogro82/PiPup) für Android TV.

## Für Fire TV oder andere Android TV ohne Google Play Store
1. Installieren Sie eine App wie [atvTools](https://apps.apple.com/us/app/atvtools/id1661419573) auf Ihrem Smartphone.
2. Laden Sie die [PiPup-APK-Dateien](https://github.com/desertblade/PiPup/releases) auf Ihr Smartphone herunter.
3. Übertragen Sie die APK-Dateien auf Ihr Android TV.

### Verwenden von ADB-Befehlen
4. Öffnen Sie die Befehlskonsole auf Ihrem Smartphone.

5. Führen Sie den folgenden Befehl aus, um die Berechtigung SYSTEM_ALERT_WINDOW zu erteilen:

```bash
adb shell appops set nl.rogro82.pipup SYSTEM_ALERT_WINDOW allow
`

Stellen Sie sicher, dass Ihr Android TV mit demselben Netzwerk verbunden ist wie Ihr Smartphone und dass auf Ihrem Android TV [Entwickleroptionen](https://www.firesticktricks.com/developer-options-firestick.html) aktiviert ist.

Jetzt sollten Sie PiPup auf Ihrem Fire TV oder einem anderen Android TV ohne den Google Play Store verwenden können.

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