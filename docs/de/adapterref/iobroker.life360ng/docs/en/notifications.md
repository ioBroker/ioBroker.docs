---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.life360ng/docs/en/notifications.md
title: Registerkarte: Benachrichtigungen
hash: EdaO7pxGlkqjbBzP57ExiMz5XR6bYZ2sMZ0i7cI8v64=
---
![Logo](../../../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

### Die nächste Generation

[Zurück zum Anfang](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

# Registerkarte: Benachrichtigungen

Im Reiter **„Benachrichtigungen“** können Sie Telegram-Nachrichten und Alexa-Ankündigungen konfigurieren, die automatisch versendet werden, wenn eine Life360-Person an einem bekannten Ort eintrifft.

---

## Telegramm

Mit dem Schalter **„Telegram-Benachrichtigungen aktivieren“** können Sie Telegram-Benachrichtigungen aktivieren oder deaktivieren.

> **Voraussetzung:** Der [ioBroker Telegram-Adapter](https://github.com/iobroker-community-adapters/ioBroker.telegram) muss installiert sein und ausgeführt werden.

---

## Empfängertabelle

Definiere alle Telegram-Empfänger, die Benachrichtigungen erhalten können.

| Spalte          | Beschreibung                                                                  |
| --------------- | ----------------------------------------------------------------------------- |
| **Beispiel**    | Telegram-Adapter-Instanznummer (Standard:`0` )                                |
| **Anzeigename** | Optionale Bezeichnung zur Identifizierung dieses Empfängers im Personenfilter |
| **Chat-ID**     | Telegram-Chat-ID des Empfängers                                               |

**So finden Sie die Chat-ID:**\
&#x20;Öffnen Sie den Telegram-Adapter in ioBroker Admin → Registerkarte **„Nachrichten“** . Nachdem der Nutzer eine Nachricht an Ihren Telegram-Bot gesendet hat, erscheint seine Chat-ID in der Liste der authentifizierten Nutzer.

> **Hinweis:** Der Anzeigename ist optional und dient lediglich als praktische Bezeichnung für den Filter in der Personentabelle. Sie können ihn leer lassen und stattdessen direkt die Chat-ID als Filterwert verwenden.

---

## Alexa

Mit dem Schalter **„Alexa-Ankündigungen aktivieren“** können Sie Alexa-Ansagen aktivieren oder deaktivieren.

> **Voraussetzung:** Der [ioBroker Alexa2-Adapter](https://github.com/Apollon77/ioBroker.alexa2) muss installiert sein und laufen.

---

## Alexa-Gerätetabelle

Definieren Sie die Echo-Geräte, die Standortänderungen ankündigen sollen.

| Spalte                             | Beschreibung                                                                                                                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anzeigename**                    | Optionale Kennzeichnung dieses Geräts (z. B.`Office Echo` )                                                                                                                                     |
| **Sprechen Sie die staatliche ID** | Vollständige ioBroker-Status-ID des Datenpunkts (z. B.`alexa2.0.Echo-Devices.G090LF11806218AC.Commands.speak` )                                                                                 |
| **Volumen (0–100)**                | Temporäre Ansagelautstärke. life360ng sendet den konfigurierten Wert direkt im Befehl speak (`volume;text` ) und stellt den zuvor gelesenen Text wieder her.`Player.volume` Wert im Nachhinein. |

**So finden Sie die Sprachstatus-ID:**\
&#x20;Öffnen Sie den ioBroker-Objektbaum →`alexa2.0` →`Echo-Devices` → Geräteordner finden →`Commands` →`speak` Kopieren Sie die vollständige Objekt-ID.

> **Hinweis:** Wenn ein Volume konfiguriert ist, verwendet life360ng die Inline-Funktion.`volume;text` Format für gesprochene Sprache. Außerdem liest es das aktuelle`Player.volume` vor dem Sprechen und stellt es anschließend wieder her.

---

## Personentisch

Diese Tabelle wird **automatisch mit Life360 synchronisiert** – Personen erscheinen hier, sobald sie aus der Life360-Cloud geladen werden. Eine manuelle Eingabe ist nicht erforderlich.

| Spalte                                 | Beschreibung                                                                                                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Life360-Name**                       | Name der Person aus Life360 (schreibgeschützt, automatisch synchronisiert)                                                                                                                            |
| **Präfixtext (eigene Orte)**           | Text, der dem Ortsnamen für Benachrichtigungen über eigene Orte vorangestellt wird (z. B.`Nicole is at` )                                                                                             |
| **Präfixtext (App-Orte)**              | Text, der dem Ortsnamen für Ortsbenachrichtigungen der Life360-App vorangestellt wird                                                                                                                 |
| **Empfänger (nur Telegramm)**          | Kommagetrennte Liste der Anzeigenamen oder Chat-IDs aus der Empfängertabelle. Leer = an alle Telegram-Empfänger senden. Alexa-Benachrichtigungen werden immer an alle konfigurierten Geräte gesendet. |
| **Eigene Orte**                        | Benachrichtigungen aktivieren, wenn diese Person an ihrem eigenen Ort ankommt (Meine Orte).                                                                                                           |
| **App-Platzierungen**                  | Aktivieren Sie Benachrichtigungen, wenn diese Person an einem Ort der Life360-App ankommt.                                                                                                            |
| **Unbekannte Orte**                    | Aktivieren Sie Benachrichtigungen, wenn der Standort dieser Person unbekannt wird.                                                                                                                    |
| **Nachricht für unbekannten Standort** | Benutzerdefinierter Nachrichtentext, der gesendet wird, wenn der Standort der Person unbekannt ist                                                                                                    |

### Empfängerfilter (nur Telegram)

Die Spalte **„Empfänger“** gilt nur für Telegram-Benachrichtigungen und hat keine Auswirkung auf Alexa-Ankündigungen. Sie ermöglicht es Ihnen, die Telegram-Empfänger für eine bestimmte Person einzuschränken. Alexa-Ankündigungen werden immer an alle konfigurierten Geräte gesendet.

- **Leer:** Die Benachrichtigung wird an **alle** Empfänger in der Empfängertabelle gesendet.
- **Ausgefüllt:** Nur die aufgeführten Empfänger erhalten die Nachricht.

---

## Ortsbezogene Benachrichtigungsüberschreibungen

Unterhalb der Personentabelle können Sie orts- und personenbezogenen Benachrichtigungsüberschreibungen konfigurieren. Damit können Sie dem Standardtext einen benutzerdefinierten Text hinzufügen (`prefix text + place name` Oder, wenn die Priorisierung aktiviert ist, ersetzen Sie die Standardnachricht durch den benutzerdefinierten Text. Sie können auch eine Nachricht senden, wenn eine Person einen Ort **verlässt** .

| Spalte                               | Beschreibung                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **+ Ort**                            | Ortsname – Auswahl aus einer Dropdown-Liste mit eigenen Orten (⚑) und Orten der Life360-App (📍). Manuelle Eingabe ist ebenfalls möglich.                                                         |
| **Person**                           | Name der Person in Life360 – ausgewählt aus einer Dropdown-Liste bekannter Personen.                                                                                                              |
| **Benachrichtigung priorisieren**    | Wenn diese Option aktiviert ist, wird die Standardmeldung angezeigt (`prefix text + place name` ) wird unterdrückt. Stattdessen wird der benutzerdefinierte Ankunfts- oder Abreisetext verwendet. |
| **Bei Ankunft benachrichtigen**      | Sende eine Benachrichtigung, wenn die Person an diesem Ort ankommt.                                                                                                                               |
| **SMS bei Ankunft**                  | Benutzerdefinierter Nachrichtentext, der bei Ankunft gesendet wird (z. B.`Nicole arrived home` ).                                                                                                 |
| **Benachrichtigung bei Abwesenheit** | Sende eine Benachrichtigung, wenn die Person diesen Ort verlässt.                                                                                                                                 |
| **Text im Urlaub**                   | Benutzerdefinierter Nachrichtentext, der bei Abwesenheit versendet wird (z. B.`Nicole left home` ).                                                                                               |

### So funktioniert es

- **Eine exakte Übereinstimmung der Personendaten** hat Vorrang vor einem Platzhalter (leeres Personenfeld).
- Wenn **die Option „Benachrichtigung priorisieren“** aktiviert ist und ein benutzerdefinierter Text konfiguriert wurde, wird die Standardnachricht aus der Personentabelle unterdrückt und nur der überschriebene Text gesendet.
- Wenn **die Option „Benachrichtigung priorisieren“** deaktiviert ist, werden sowohl die Standardnachricht als auch der Überschreibungstext nacheinander gesendet.
- Wenn **die Option „Benachrichtigung priorisieren“** aktiviert ist, das Textfeld aber leer ist, wird trotzdem die Standardnachricht als Ausweichlösung verwendet.
- Beim Verlassen eines priorisierten Ortes wird auch die folgende Standardmeldung für den neuen Ort oder den Status „unbekannt/unterwegs“ unterdrückt; ohne Priorisierung werden beide Meldungen nacheinander gesendet.
- Telegram und Alexa verwenden dieselbe Logik. Wenn ein Ereignis mehrere Alexa-Texte auslöst, werden diese nacheinander mit einer kurzen Pause vorgelesen.

### Beispiel

| Ort  | Person            | Priorisieren | Ankunft benachrichtigen | SMS bei Ankunft                | Urlaub melden | Text im Urlaub              |
| ---- | ----------------- | :----------: | :---------------------: | ------------------------------ | :-----------: | --------------------------- |
| Heim | Nicole Mustermann |       ✅      |            ✅            | Nicole kam nach Hause.         |       ✅       | Nicole verließ ihr Zuhause. |
| Heim | _(leer)_          |       ✅      |            ✅            | Jemand ist nach Hause gekommen |       ☐       |                             |

In diesem Beispiel: Wenn Nicole zu Hause ankommt, sendet die Aktivierung der Priorisierung nur`Nicole arrived home` Ohne Priorisierung sendet der Adapter zuerst die Standardnachricht und dann`Nicole arrived home` Die

Sie können entweder den **Anzeigenamen** oder die **Chat-ID** als Filterwert verwenden – beides ist zulässig und kann beliebig kombiniert werden.

**Beispiele:**

- `Nicole` — Nur an den Empfänger mit dem Anzeigenamen "Nicole" senden
- `123456789` — Nur an den Empfänger mit der Chat-ID 123456789 senden
- `Nicole, 987654321` — an Nicole und an den Empfänger mit der Chat-ID 987654321 senden

### Benachrichtigungsnachricht

Die Benachrichtigungsnachricht ist wie folgt aufgebaut:

```
[Prefix text] [Place name]
```

Wenn der Präfixtext leer ist, wird nur der Ortsname gesendet.

**Beispiel:** Präfix =`Nicole is at` Ort =`Home` → Nachricht:`Nicole is at Home`

> **Hinweis:** Benachrichtigungen werden nur versendet, wenn sich eine Person an einem **bekannten Ort** befindet (eigener Standort oder Standort in der Life360-App). Ist der Standortname unbekannt oder leer, wird keine Nachricht versendet.

---

## Testbenachrichtigungen

Verwenden Sie die Schaltfläche **„Testnachricht senden“** (Telegram-Bereich) oder die Schaltfläche **„Testankündigung senden“** (Alexa-Bereich), um Ihre Konfiguration zu überprüfen, ohne auf eine tatsächliche Standortänderung warten zu müssen.

> **Wichtig:** Der Test verwendet die aktuell vom laufenden Adapter geladene Konfiguration. Wenn Sie Änderungen vorgenommen haben, **speichern Sie diese und starten Sie** den Adapter neu, bevor Sie die Schaltfläche „Testen“ verwenden.

| Taste                      | Was es tut                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Testnachricht senden**   | Sendet`[Life360ng] Test notification` an alle konfigurierten Telegram-Empfänger                                                                                                                                     |
| **Testankündigung senden** | Verkündet`Life360ng test notification one` und dann`Life360ng test notification two` auf allen konfigurierten Alexa-Geräten, um die sequentielle Wiedergabe und die Wiederherstellung der Lautstärke zu überprüfen. |

---

## Benachrichtigungsstatus

life360ng schreibt den Benachrichtigungstext immer in einen dedizierten ioBroker-Zustand, unabhängig davon, ob Telegram oder Alexa aktiviert ist. Dadurch können Sie in Blockly-Skripten oder anderen Automatisierungen auf Benachrichtigungen reagieren – beispielsweise, um eine Sonos-Ansage auszulösen, wenn eine Person an einem Ort ankommt.

| Zustand                                             | Typ      | Beschreibung                                                       |
| --------------------------------------------------- | -------- | ------------------------------------------------------------------ |
| `life360ng.<instance>.notifications.lastSpokenText` | `string` | Der letzte Benachrichtigungstext, der erstellt und versendet wurde |

Der Zustand wird beim Start des Adapters erstellt und bei jedem Benachrichtigungsereignis aktualisiert. Er spiegelt den exakten Text wider, der gesprochen (oder über Telegram/Alexa) wurde (oder hätte werden sollen).

**Beispiel für einen Blockly-Anwendungsfall:**\
&#x20;Abonnieren`notifications.lastSpokenText` Wenn sich der Zustand ändert und der Wert nicht leer ist, verwenden Sie den Sonos-Adapter, um den Text per Text-to-Speech abzuspielen.