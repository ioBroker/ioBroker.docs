---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cam-recorder/README.md
title: ioBroker.cam-recorder
hash: 8sgJup6aBDOvQHFgkj9BQA1029nnoeAo5QHlvbG4KM0=
---
![Logo](../../../en/adapterref/iobroker.cam-recorder/admin/cam-recorder.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cam-recorder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cam-recorder.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.cam-recorder.svg)
![NPM](https://nodei.co/npm/iobroker.cam-recorder.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.cam-recorder/workflows/Test%20and%20Release/badge.svg)

# IoBroker.cam-recorder
## Kamerarekorder-Adapter für ioBroker
Zeichnet kurze Videoclips (MP4 oder GIF) und Schnappschüsse (JPEG) von RTSP-Kameras auf, beispielsweise von einer [DoorBird](https://www.doorbird.com/) Türstation, wenn die Türklingel ertönt oder eine Bewegung erkannt wird, und kann das Ergebnis an Telegram, MAX, E-Mail und andere Messenger senden.

- **ffmpeg ist enthalten.** Der Adapter bringt seine eigene ffmpeg-Binärdatei mit (Paket

[ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)), muss nichts auf dem System installiert werden.

**Keine Passwörter in Skripten.** Die Kamera-Logins befinden sich in den Adaptereinstellungen und werden verschlüsselt gespeichert. Skripte verwenden lediglich den Namen.

die Kamera.

- **Funktioniert ohne Skripte.** Eine Triggertabelle verbindet jeden Zustand (Türklingel, Bewegung, ein Knopf) mit einer Kamera.
- **Schonend für kleine Systeme.** ffmpeg läuft nur während der Aufnahme eines Clips; die Anzahl der parallelen ffmpeg-Prozesse ist

eingeschränkt, und der Kamerastream kann kopiert statt neu codiert werden.

## Einstellungen
### Kameras
Eine Zeile pro Kamera: Name, RTSP-URL, Benutzername und Passwort. Beispiele für RTSP-URLs:

| Kamera | URL |
| ------------------ | ----------------------------------------------------- |
| DoorBird | `rtsp://192.168.1.20:554/mpeg/media.amp` |
| Reolink | `rtsp://192.168.1.41:554/h264Preview_01_main` |
| UniFi Protect | `rtsp://<console>:7447/<alias>` (siehe unten) |
| UniFi Protect | `rtsp://<console>:7447/<alias>` (siehe unten) |
| Die meisten ONVIF-Kameras | siehe das Handbuch der Kamera oder das ONVIF-Gerätetool |

Die in die URL (`rtsp://user:password@host/...`) eingegebenen Anmeldedaten werden beim nächsten Start in die Felder für Benutzername und Passwort übernommen. Sonderzeichen in Passwörtern sind unproblematisch; der Adapter kodiert sie für ffmpeg.

Als Transportprotokoll wird standardmäßig TCP verwendet; dies funktioniert auch in Docker-Containern zuverlässig. Die Option „Nur Keyframes“ ist hilfreich, wenn Schnappschüsse einer H.265-Kamera grau dargestellt werden.

_↻_ dreht das Bild einer Kamera, die kopfüber oder seitlich montiert ist und sich nicht selbst drehen kann: 90°, 180° oder 270° im Uhrzeigersinn oder gespiegelt (↔ links und rechts, ↕ oben und unten). Schnappschüsse, GIFs, neu codierte Clips, Zeitraffervideos und die Bilder für die KI-Prüfung werden tatsächlich gedreht; die Breite des gedrehten Bildes wird berücksichtigt. Eine kopierte MP4-Datei (_Kamerastream kopieren_) kann nicht ohne Neucodierung gedreht werden: Sie erhält eine Markierung (Anzeigematrix), die von Telegram, Browsern, VLC und den meisten Playern beim Abspielen des Videos angewendet wird. Bei einer ffmpeg-Version des Systems, die älter als 6.0 ist und diese Markierung nicht schreiben kann, werden die Clips einer gedrehten Kamera stattdessen neu codiert (die mitgelieferte ffmpeg-Version ist aktuell genug).

_Sound_ fügt den Kameraton in die MP4-Clips ein, auch in die vorab aufgenommenen, sodass diese in Telegram und anderen Apps mit Ton wiedergegeben werden. Die Kamera muss den Ton in ihrem RTSP-Stream senden; bei vielen Kameras ist die Tonübertragung standardmäßig deaktiviert oder nur in einem ihrer Streams verfügbar (siehe die Audioeinstellungen in den Video- oder Stream-Einstellungen der Kamera). Kameras senden G.711 oder AAC; der Adapter speichert immer AAC, das MP4 und Messenger benötigen, auch beim Kopieren des Bildes. GIFs, Schnappschüsse und Zeitraffer-Videos bleiben stumm. Eine Kamera ohne Ton zeichnet trotzdem auf, nur eben ohne Ton.

Bei Live-Aufnahmen behalten Bild und Ton ihre zeitliche Übereinstimmung. Ein Live-Clip beginnt mit dem Verbindungsaufbau: Eine Kamera, die nur alle paar Sekunden ein Keyframe aufnimmt, zeigt ihr erstes Bild einen Moment nach dem Einsetzen des Tons. Clips aus der Voraufzeichnung weisen diese Lücke nicht auf.

Der Kameraname wird zur Objekt-ID: `Front Door` → `cam-recorder.0.cameras.front_door`. Buchstaben mit diakritischen Zeichen werden transliteriert (`ü` → `ue`, `é` → `e`), andere Sonderzeichen werden zu `_`.

#### Online oder offline
Der Adapter prüft minütlich, ob jede Kamera online ist, und trägt dies in `cameras.<camera>.reachable` (den Kartenstatus im Geräte-Manager) ein. Ohne weitere Einstellungen öffnet er eine TCP-Verbindung zu Host und Port der angegebenen URL. Bei einer Kamera hinter einem NVR (UniFi Protect, Frigate, go2rtc, Synology Surveillance Station) wird nur der NVR angezeigt: Er akzeptiert die Verbindung, obwohl die dahinterliegende Kamera ausgeschaltet ist. Zwei Lösungsansätze:

- **Online-Status** (Spalte der Kamera): Jeder Status, der angibt, ob die Kamera online ist, z. B. des Adapters.

Der NVR. `true`, jede Zahl ungleich 0, `connected`, `online`, `on`, `ok`, `yes`, `up` werden als online gezählt, alle anderen Werte als offline. Der Adapter reagiert sofort auf Änderungen; ein nicht existierender Zustand wird beim Start gemeldet und die Kamera wie zuvor überprüft.

- **UniFi Protect-Anmeldung** (unterhalb der Tabelle): Kameras von UniFi Protect streamen über die Konsole (`rtsp://<console>:7447/<alias>`

oder `rtsps://<console>:7441/<alias>`, die URL von _Protect → Kamera → Einstellungen → Erweitert → RTSP_). Mit einem lokalen Benutzer der Konsole meldet sich der Adapter jede Minute an der Konsole an, liest die Kameraliste einmalig für alle Kameras und erfasst `isConnected` der Kamera, deren Stream den Alias der URL hat. Es ist kein weiterer Adapter erforderlich. Erstellen Sie einen lokalen Benutzer (kein UI-Konto mit Zwei-Faktor-Authentifizierung) in _UniFi OS → Administratoren & Benutzer_; die Rolle _Nur-Anzeigen_ für Protect ist ausreichend. Der HTTPS-Port ist 443 auf UniFi OS-Konsolen (UDM, UNVR, Cloud Key Gen2+ mit UniFi OS).

Wenn die Konsole nicht antwortet oder die Anmeldung verweigert, wird einmalig eine Warnung protokolliert und die Kameras werden in der Zwischenzeit per TCP überprüft; nach einer verweigerten Anmeldung wartet der Adapter 15 Minuten, bevor er es erneut versucht, sodass ein falsches Passwort den Benutzer nicht sperrt. Eine Kamera, deren Alias der Konsole nicht bekannt ist (RTSP wurde für sie deaktiviert oder die URL hat sich nach einem Reset geändert), wird als nicht erreichbar angezeigt, begleitet von einer Warnung.

### Auslöser
| Spalte | Bedeutung |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Staat | Beliebiger Staat, z. B. `doorbird.0.Doorbell.1.trigger` oder `doorbird.0.Motion.trigger` |
| Wenn | _Wert ist wahr_ (Standard) oder _Jeder Schreibvorgang_ |
| Abklingzeit | Sekunden, in denen weitere Schreibvorgänge keinen neuen Clip starten (dreimaliges Klingeln an der Tür = ein Clip) |
| Nur wenn, Vergleich, Wert | Optionale Bedingung, siehe unten |
| Kamera | Name einer Kamera des ersten Tabs |
| Aktion | Videoclip, Schnappschuss oder beides (beide laufen gleichzeitig, das Foto kommt zuerst an) |
| Dauer | Sekunden, 0 = Wert der Registerkarte _Aufnahme_ |
| Format | MP4-Video, GIF-Animation oder _Standard_ |
| Nachricht | Profile der Registerkarte _Senden_, die das Ergebnis erhalten, durch Kommas getrennt; leer = keine Nachricht |

**Bedingungen.** Ein Trigger mit der Bedingung „Nur wenn“ wird nur dann ausgelöst, wenn der entsprechende Zustand mit dem Wert verglichen wird: `=`, `≠`, `>` oder `<`. Beispiele: `0_userdata.0.away`, `=`, `true` (nur wenn niemand zu Hause ist), `javascript.0.isNight`, `=`, `true`, `hm-rpc.0.ABC.LUX`, `<`, `50`. Ein boolescher Status entspricht auch `1`/`0`, `on`/`off`, `yes`/`no`; Texte werden ohne Berücksichtigung der Groß-/Kleinschreibung verglichen. Der Status wird zum Zeitpunkt des Ereignisses ausgelesen; ein übersprungenes Ereignis wird protokolliert und löst keine Abklingzeit aus.

Jeder Schreibvorgang des Status zählt, auch wenn sich der Wert nicht ändert. Bei Voraufzeichnung verlängert ein Schreibvorgang innerhalb der Abklingzeit den noch laufenden Clip, anstatt ignoriert zu werden: Der Clip beendet dann die Triggerdauer nach dem letzten Klingeln bis zur maximalen Cliplänge auf der Registerkarte „Aufzeichnung“ (standardmäßig 30 Sekunden). Im Protokoll wird dies als `extended 2x` angezeigt.

### Aufnahme
Cliplänge und -format sowie die Erstellung von MP4-Dateien:

- **Neu kodieren** (Standard): Der Clip wird skaliert (Standardbreite 640 px) und mit H.264 kodiert, wodurch kleine Dateien entstehen, die Telegram unterstützt.

Spielt überall ab. Dies beansprucht die CPU für die gesamte Dauer des Clips.

- **Kamerastream kopieren**: nahezu keine CPU-Auslastung, Originalauflösung. Die Kamera muss H.264 senden.

Ein kopierter Stream kann nur an einem Keyframe beginnen, während die Cliplänge ab der Verbindung gemessen wird: Bei einer Kamera, die alle paar Sekunden ein Keyframe sendet, ist ein kopierter Clip um bis zu diesem Intervall kürzer. Neu codierte Clips beginnen ihre Länge mit dem ersten Bild und behalten ihre volle Länge.

GIF-Animationen werden immer neu codiert (Breite und Bildrate im selben Tab).

### Voraufzeichnung
Eine Türklingel-Aufnahme, die erst beim Drücken des Klingelknopfs startet, erfasst nicht die Person, die sich der Tür nähert. Durch die Voraufzeichnung enthält die Aufnahme zusätzlich die Sekunden **vor** dem Ereignis.

- **Standardmäßig deaktiviert.** Aktivieren Sie die Voraufnahmefunktion auf der Registerkarte „Aufnahme“ und stellen Sie dann die Anzahl der Voraufnahmen (s) (1 bis 30) ein.

für jede Kamera, die diese Funktion nutzen soll. Kameras mit dem Wert 0 sind nicht betroffen.

**Was es kostet.** Für jede solche Kamera läuft ständig ein ffmpeg-Prozess. Dieser kopiert den Kamerastream in

Es werden 2-Sekunden-Ausschnitte ohne erneute Kodierung aufgezeichnet (geringe CPU-Auslastung, wenige MB Speicherplatz im temporären Ordner) und ältere Ausschnitte gelöscht. Die Kamera hält einen Stream permanent geöffnet - prüfen Sie, ob ein zweiter Stream für Schnappschüsse und Live-Ansichten möglich ist.

- **Wie ein Clip erstellt wird.** Der Adapter wartet, bis die Sekunden nach dem Ereignis auf der Festplatte gespeichert sind, und fügt sich dann dem Clip hinzu.

Das Zeitfenster wird um die Länge der Voraufnahme plus die Cliplänge gekürzt. Ein Clip ist daher etwa 2 bis 4 Sekunden später fertig als ohne Voraufnahme. Die Dauer in der Triggertabelle und in `sendTo` ist die Zeit **nach** dem Ereignis.

- **Schnappschüsse** werden während des Betriebs aus dem Puffer erstellt: das neueste Bild auf der Festplatte, höchstens etwa eine Sekunde alt, ohne …

Die zweite Verbindung zur Kamera erfolgt sofort und zeigt den Moment des Ereignisses an. `sendTo` mit `live: true` fragt stattdessen die Kamera ab.

- **Livebild.** Die Spalte _Live (s)_ im Tab _Kameras_ (ohne Voraufzeichnung ausgegraut) schaltet den neuesten Schlüssel um

Alle paar Sekunden wird ein Frame aus dem Puffer in `cam-recorder.0.storage/<camera>_live.jpg` gespeichert, für ein Bild-Widget mit vis und demselben Aktualisierungsintervall (z. B. über eine Webinstanz `http://<host>:8082/cam-recorder.0.storage/door_live.jpg`). Es werden nur Schlüsselframes dekodiert, daher wird kaum CPU-Leistung benötigt und keine zweite Verbindung ist erforderlich; das Bild ist maximal ein Schlüsselframe-Intervall alt. Für Live-Video verwenden Sie go2rtc; cam-recorder kann dann den RTSP-Stream als Kamera-URL verwenden.

- **Wenn etwas fehlschlägt** (Kamera offline, Stream für 20 Sekunden unterbrochen), wird der Vorgang nach 5 Sekunden, 10 Sekunden, 30 Sekunden neu gestartet.

60 Sekunden lang, dann alle 5 Minuten, mit einer Warnung im Protokoll. Solange der Puffer nicht aktiv ist, werden Clips ab dem Ereignis ohne Voraufzeichnung aufgezeichnet, ebenfalls mit einer Warnung im Protokoll. Nach dem Start des Adapters benötigt der Puffer etwa 10 Sekunden (ffmpeg analysiert den Stream und wartet dann auf Schlüsselbilder), bis `prebuffer` `running` anzeigt.

- **Warnung lesen.** Sie gibt an, wie lange der Stream lief und welche Warnungen ffmpeg zuletzt ausgegeben hat, z. B.

`received no data for 20 s after 37 s of stream: [rtsp] RTP: missed 12 packets (5×)`. _bevor Daten eintrafen_ bedeutet, dass die Kamera keine Daten gesendet hat (falsche URL, falsche Anmeldedaten, falscher Port); _nach … Sekunden Stream_ mit immer wieder derselben Zeitangabe bedeutet, dass die Kamera nach einer Weile die Übertragung einstellt, z. B. weil ein anderer Client (die Kamera-App, ein Videorekorder) den Stream übernimmt oder eine Sitzung beendet wird. Versuchen Sie es mit einem anderen Übertragungsprotokoll (TCP/UDP) oder schalten Sie den Ton der Kamera aus und wieder ein.

Die Dateien werden im temporären Systemordner (unter Linux: `/tmp/iobroker-cam-recorder.0-prebuffer`) gespeichert, sofern Sie keinen Eintrag hinzufügen.

Ordner. Eine RAM-Disk (tmpfs) ist eine gute Wahl auf Systemen mit SD-Karte.

### Schicken
Ein **Profil** legt fest, wohin ein Ergebnis geschrieben und was gesendet wird. Trigger und Zeitraffer wählen Profile anhand ihres Namens in der Spalte „Nachricht“ aus (wählen Sie eines aus der Liste oder geben Sie mehrere Namen durch Kommas getrennt ein; leer oder `—` = keine Nachricht; die Startnamen solcher Trigger werden im Protokoll protokolliert, es sei denn, sie liefern die Statusinformationen der KI-Prüfung). Skripte verwenden `profiles: 'Name'`. Die Liste in dieser Spalte zeigt die Profile der gespeicherten Einstellungen an. Speichern Sie daher nach dem Hinzufügen eines Profils einmal.

| Spalte | Bedeutung |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Name | Eindeutiger Name des Profils |
| Instanz | Messaging-Instanz, z. B. `telegram.0`, `max.0`, `email.0` (siehe Tabelle unten) |
| Empfänger | Optional, in der vom Adapter erwarteten Form; leer = Standardwert des Adapters |
| KI | Nur für ein Profil mit Kriterien auf der Registerkarte _KI-Prüfung_: Wie die Prüfung verwendet wird (siehe [KI-Prüfung](#ai-check)) |
| Text | Bildunterschrift: `{camera}`, `{date}`, `{time}`, `{description}` und `{matches}` werden ersetzt, das Datum im Format der Systemeinstellungen |
| Text | Bildunterschrift: `{camera}`, `{date}`, `{time}`, `{description}` und `{matches}` werden ersetzt, das Datum im Format der Systemeinstellungen |
| Vorlage | Optionale JSON-Nachricht für Adapter ohne integriertes Format oder zum Ersetzen des integrierten Formats (siehe unten) |

Bei der Option „Nur Text“ wird der Text sofort nach Auslösung des Triggers, noch vor Abschluss der Aufnahme, ohne Datei gesendet - beispielsweise ein kurzes „Jemand ist an der Tür“, während der Clip mit der Datei ein zweites Profil durchläuft. Bei einem Zeitraffer oder einem Skript wird der Text gesendet, sobald die Datei fertig ist.

| Adapter | Lieferumfang | Empfänger |
| -------------- | ------------------------------------------ | -------------------------------------------------- |
| `telegram` | die Datei (MP4 als Video, GIF als Animation) | Benutzer, leer = alle Benutzer des Bots |
| `email` | die Datei als Anhang, Bildunterschrift als Betreff | Adresse |
| `pushover` | Bilder als Anhang, ein Clip als Text | Gerät |
| `discord` | die Datei | `serverId/channelId`, eine Benutzer-ID oder ein Benutzer-Tag |
| `matrix-org` | Bilder, ein Clip als Text | - |
| `signal-cmb` | Text mit Kamera, Art und Dateinamen | Telefonnummer |
| `whatsapp-cmb` | Text | Telefonnummer |
| `gotify` | Text | - |
| `ntfy` | Text | Thema |
| `ntfy` | Text | Thema |

Alle Messaging-Adapter müssen auf demselben Host wie dieser Adapter ausgeführt werden, da sie die Datei von ihrem Pfad lesen.

Beispiel für eine Türstation mit zwei Tasten für zwei Wohnungen:

| Name | Instanz | Empfänger | Anhang |
| ------------ | ---------- | --------- | ---------- |
| Ich | telegram.0 | Alex | Alles |
| Vater | telegram.0 | Vater | Nur Clip |
| Vater (MAX) | max.0 | 123456 | Nur Text |

Trigger `doorbird.0.Doorbell.1.trigger` → _Message_ `Me`; Trigger `doorbird.0.Doorbell.2.trigger` → _Message_ `Father, Father (MAX)`. Zu Beginn wird ein Name gemeldet, der keinem aktiven Profil entspricht.

**Update von Version 0.4.x.** Beim ersten Start nach dem Update werden die Einstellungen des ehemaligen Benachrichtigungs-Tabs in Profile umgewandelt: Die Telegram-Instanz wird zum Profil `Telegram`, jedes weitere Ziel erhält ein Profil mit demselben Namen (identische Ziele nur einmal, ein Ziel ohne Namen wird nach Instanz und Empfänger benannt), alle mit der vorherigen Beschriftung. Jeder Trigger und jeder Zeitraffer erhält die Profile, an die er zuvor gesendet hat; ein leeres Feld „Senden an“ wird zur Liste aller dieser Profile. Die Instanz wird danach einmal neu gestartet. Skripte mit `telegram: true` funktionieren weiterhin (siehe Skripte).

#### Vorlage
Die Spalte „_Template_“ enthält die JSON-Nachricht, die der Adapter an die Profilinstanz sendet (z. B. `sendTo('<instance>', 'send', <template>)`). Lassen Sie sie leer, um das Standardformat der obigen Tabelle zu verwenden. Geben Sie eine Vorlage für einen Adapter ein, der nicht in der Tabelle enthalten ist, oder um das Standardformat zu ersetzen, z. B. um Optionen hinzuzufügen.

| Platzhalter | Ersetzt durch |
| ------------- | ----------------------------------------------------------------------------- |
| `{file}` | vollständiger Pfad der Datei |
| `{fileUrl}` | der Pfad als `file:///…` URL |
| `{caption}` | der _Text_ des Profils, mit ausgefüllten Kamera-, Datums- und Zeitangaben |
| `{camera}` | Name der Kamera |
| `{format}` | `mp4`, `gif` oder `jpg` |
| `{duration}` | Länge des Clips in Sekunden |
| `{recipient}` | der _Empfänger_ des Profils |
| `{text}` | ein fertiger Text, z. B. `Door 09:00: mp4 clip 10 s (door_2026-11-11_09-00-00.mp4)` |
| `{text}` | ein fertiger Text, z. B. `Tür 09:00: mp4-Clip 10 s (door_2026-11-11_09-00-00.mp4)` |

- Platzhalter werden innerhalb der JSON-Zeichenketten ersetzt, sodass ihre Werte immer Zeichenketten sind, ebenfalls `{duration}`.

Schreiben Sie Zahlen und `true`/`false` direkt in das JSON.

- Anführungszeichen in der Bildunterschrift dürfen die Vorlage nicht beschädigen: Sie wird zuerst als JSON analysiert, die Werte werden anschließend eingefügt.
- Bei _Nur Text_ sind `{file}`, `{fileName}`, `{fileUrl}`, `{format}` und `{duration}` leer.
- Zu Beginn wird im Protokoll eine Meldung über eine ungültige JSON-Vorlage ausgegeben.

Telegram ohne Benachrichtigungston:

```json
{ "text": "{file}", "caption": "{caption}", "user": "{recipient}", "disable_notification": true }
```

Pushover mit hoher Priorität; Pushover fügt nur Bilder an, daher die _Anhang_ dieses Profils auf _Nur Schnappschüsse_ einstellen:

```json
{ "message": "{text}", "file": "{file}", "priority": 1 }
```

Jeder andere Adapter:

```json
{ "to": "{recipient}", "title": "{camera}", "body": "{caption}", "attachment": "{file}" }
```

### KI-Prüfung
Mit [ioBroker.pi-Agent](https://github.com/sadam6752-tech/ioBroker.pi-agent) und einem Modell, das Bilder erkennt, erhält ein Profil des Tabs „Senden“ eine zusätzliche Nachricht, wenn das Bild eines Ereignisses die für den Empfänger relevanten Informationen zeigt. Die Dateien des Ereignisses werden wie bisher versendet, unabhängig vom Ergebnis der Prüfung. Eine fehlgeschlagene Erkennung führt also nie zu einer verlorenen Nachricht.

Wählen Sie die pi-agent-Instanz auf der Registerkarte _KI-Prüfung_ aus und fügen Sie pro Kriterium eine Zeile in Ihren eigenen Worten und Ihrer eigenen Sprache hinzu, mit den Profilen, die die zusätzliche Meldung erhalten, wenn das Bild dem Kriterium entspricht:

| Aktiv | Kriterium | Profile |
| ------ | -------------------------- | ---------- |
| ✓ | eine Person | Ich, Vater |
| ✓ | ein Tier im Garten | Garten |
| ✓ | Ein Auto vor dem Tor | Ich |

Wird ein Trigger ausgelöst, werden Clip und Snapshot wie zuvor erstellt und gesendet. Gleichzeitig erstellt der Adapter beim Start einen Snapshot (aus der Voraufzeichnung) und fragt den pi-Agenten einmalig mit allen Kriterien der Profile dieses Triggers ab. Ein Profil, dessen Kriterien das Bild erfüllt, erhält über seine eigene Instanz und seinen Empfänger eine weitere Nachricht.

```
🔍 Front door: a person — A man with a parcel at the door.
```

Die Beschreibung erfolgt in der Sprache der Systemeinstellungen; der Status „Beschreibung“ der Kamera speichert die

das neueste.

- _Warte auf die Antwort des Pi-Agenten_ (5-120 s, Standardwert 30). Wenn keine Übereinstimmung gefunden wird, also wenn der Pi-Agent nicht rechtzeitig antwortet, oder

Wenn die Überprüfung fehlschlägt (pi-agent gestoppt, Modell ohne Bildeingabe), gibt es keine zusätzliche Meldung, und das Protokoll gibt den Grund dafür an.

- pi-agent führt eine Konversation pro Kamera (`cam-recorder-<camera>`). Es sendet das Bild nur an sein Modell mit

Diese Frage; spätere Fragen beziehen sich auf den Text dazu. Eine Überprüfung kostet eine Anfrage mit einem Bild und wird vom täglichen Token-Limit des pi-Agenten berücksichtigt.

- Skripte werden für `record` und `snapshot` mit `profiles` gleich geprüft. Zeitraffervideos werden nicht geprüft.

**Wie ein Profil die Überprüfung nutzt** - Spalte _AI_ des Tabs _Senden_, für ein Profil mit folgenden Kriterien:

| KI | Was das Profil erhält |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| _Sofort, zusätzliche Meldung_ | die Dateien gleichzeitig und die obige zusätzliche Meldung bei einer Übereinstimmung (Standard, wie oben beschrieben) |
| _Nur bei einem KI-Match_ | Jede Datei wird gespeichert, aber nur gesendet, wenn pi-agent eines seiner Kriterien erkennt, wobei die Beschreibung in der Bildunterschrift enthalten ist. |
| _Warten auf KI, mit Beschreibung_ | eine Nachricht nach der Prüfung, die Beschreibung in der Bildunterschrift; ohne rechtzeitige Antwort wird die Datei ohne Beschreibung weiterverarbeitet |

Die Beschreibung steht unterhalb des Profiltextes, es sei denn, der Text enthält selbst `{description}` (was der Pi-Agent gesehen hat) und `{matches}` (die Kriterien wurden erfüllt), z. B. `🔍 {camera} {time}: {description}`. So kann ein einziger Auslöser die Türklingel gleichzeitig an alle senden und, über ein zweites Profil für denselben Empfänger, das auf „Nur bei KI-Übereinstimmung“ eingestellt ist, nur die Ereignisse mit einer Person an eine andere Person weiterleiten - ein typischer Fall ist ein Bewegungsmelder im Garten, in dem sich hauptsächlich Katzen und Schatten aufhalten.

**Zustände für Skripte und Szenen.** Eine Zeile mit _State_ weist jeder Kamera den Zustand `cam-recorder.0.cameras.<camera>.ai.<criterion>` (z. B. `…cameras.doorbird.ai.a_person`) zu, sodass andere Adapter auf das reagieren können, was die Kamera gesehen hat, ohne dass eine Nachricht erforderlich ist:

| Aktiv | Kriterium | Profile | Status | Halten (s) |
| ------ | --------- | -------- | ----- | -------- |
| ✓ | eine Person | | ✓ | 120 |

Der Zustand ändert sich auf „true“, wenn pi-agent das Kriterium im Snapshot eines Triggers erkennt, und ändert sich danach wieder auf „false“.

_Hold_ Sekunden (5-3600, Standard 60), wie bei einem Bewegungsmelder; eine weitere Übereinstimmung hält `true` aufrecht und startet die Zeit neu.
Zu Beginn des Adapters sind alle `false`.

- Bei jedem Auslösen jeder Kamera wird ein Kriterium mit dem Status „Status“ geprüft, auch wenn dem Auslöser kein Profil zugeordnet ist. Skripte

Anfragen nach `record` oder `snapshot` ändern den Zustand nicht.

Die ID ergibt sich aus dem Kriterium: Buchstaben, Ziffern und `_`; wenn nichts mehr übrig ist (z. B. kyrillischer Text), ist sie

`criterion_<row>`. Durch das Umbenennen eines Kriteriums wird ein neuer Zustand erzeugt; der alte Zustand wird beim nächsten Start entfernt.

Die Antwort kommt einige Sekunden nach dem Auslösen (Snapshot Plus Modell). Für ein Licht, das in dem Moment eingeschaltet sein muss, in dem jemand

Wenn sich jemand nähert, ist ein Bewegungsmelder schneller; der Zustand dient der Entscheidungsfindung, z. B. „eine Person, keine Katze“.

Beispiel mit dem JavaScript-Adapter:

```js
on({ id: 'cam-recorder.0.cameras.doorbird.ai.a_person', val: true }, () => {
    setState('hue.0.Entrance.on', true);
});
```

#### Bericht
Einmal täglich fasst pi-agent zusammen, was seine Prüfungen seit dem letzten Bericht ergeben haben, z. B.

> 📋 Bericht vom 15.11.2026 > Haustür: 10:12 Uhr Postbote, 14:40 Uhr Kurier mit Paket, 18:05 Uhr zwei Besucher klingelten.

Hof: Um 7:30 Uhr und 17:45 Uhr stand ein Auto in der Einfahrt, ansonsten nur Katzen.

| Schauplatz | Bedeutung |
| ---------------------- | ------------------------------------------------------------------------ |
| Täglichen Bericht senden | Hauptschalter: Schecks einsammeln und Bericht senden |
| Zeit (HH:MM) | Wenn es ausgeht, Standardwert `21:00` |
| Profile des Berichts | Profile der Registerkarte _Senden_ (kommagetrennt); leer = nur `report.text` |
| Kameras | Kameras im Bericht (kommagetrennt), leer = alle |
| Wünsche an den Pi-Agenten | Optional, z. B. „nur Personen und Fahrzeuge, keine Tiere“ |

- Jede KI-Prüfung eines Schnappschusses mit Beschreibung fügt eine Zeile (Zeit, Kamera, Beschreibung, erkannte Kriterien) hinzu

`report.json` im Datenordner der Instanz, die einen Neustart übersteht. Nur Bilder, die vom pi-agent geprüft werden, zählen; ein Kriterium benötigt daher ein Profil oder einen _Status_. Für den Bericht wird kein Bild gespeichert.

Zum festgelegten Zeitpunkt empfängt pi-agent die Zeilen als Text (keine Bilder, Konversationsprotokoll `cam-recorder-report`) und schreibt sie.

Der Bericht wird in der Systemsprache verfasst. Die Nachricht enthält nur diesen Text, nicht den Text, die Vorlage, den Anhang oder die Datei des Profils. Wenn pi-agent nicht antwortet, wird stattdessen eine einfache Liste versendet; ohne Zeilenumbrüche wird nichts gesendet.

- Ein gesendeter Bericht startet den nächsten: Die Zeilen bis dahin werden entfernt.
- `report.send` sendet den Bericht sofort ab, `report.text` speichert den letzten Bericht, und `report.lastTime` gibt den Sendezeitpunkt an. Skripte

und Agenten können mit `sendTo('cam-recorder.0', 'report', { send: false })` fragen: die Antwort `{ text }` ist der bisherige Bericht, nichts wird gesendet oder entfernt.

### Zeitraffer
Eine Zeile pro Kamera: Alle _Interval_ Minuten wird ein Bild aufgenommen. Einmal täglich um _Video at_ (HH:MM, Standard 23:55) werden die Bilder zu einem MP4-Video (_Frames per second_, Breite des _Recording_-Tabs) verarbeitet, das nach dem Tag des ersten Bildes benannt wird. Die Bilder werden nach der Videoerstellung gelöscht. Während der Voraufzeichnung werden die Bilder aus dem Puffer geladen, ohne dass eine zweite Verbindung zur Kamera besteht.

- Mit dem Button `cameras.<camera>.timelapse` (oder `sendTo(…, 'timelapse', 'Front Door')`) wird das Video sofort aufgenommen.
- Falls der Adapter zum Zeitpunkt der Videoaufnahme angehalten wurde, wird das fehlende Video beim nächsten Start nachgeholt.
- _Message_ sendet das Video über die benannten Profile des _Send_-Tabs.
- Speicherplatz: Ein Bild pro Minute bei 640 Pixeln benötigt etwa 50 MB pro Tag, bis das Video fertiggestellt ist; maximal 10.000 Bilder

Wartezeit pro Kamera. Ältere Zeitraffervideos werden nach Ablauf der maximalen Lebensdauer gemäß dem Tab „Speicher“ gelöscht.

### NAS (SFTP)
Jeder neue Clip, Schnappschuss und jedes Zeitraffervideo wird auf einen SFTP-Server (ein NAS wie Synology oder QNAP oder ein beliebiger Linux-Server mit SSH) in das Verzeichnis `<folder>/<camera>/` kopiert. Der Adapter stellt die SSH-Verbindung selbst her - ohne Mount-Vorgang oder Shell-Befehle.

1. Erstellen Sie einen Benutzer auf dem NAS, der nur in den Zielordner schreiben darf, und aktivieren Sie SFTP.
2. Geben Sie Host, Port, Benutzername, Passwort und Ordner ein und klicken Sie anschließend auf „Verbindung testen“. Es wird eine kleine Testdatei geschrieben und gelöscht.

Die Datei zeigt den Fingerabdruck des Servers an.

3. Geben Sie diesen Fingerabdruck ein: Ab diesem Zeitpunkt wird ein anderer Server abgewiesen, bevor das Passwort gesendet wird. Ohne einen solchen Fingerabdruck...

Jede Kopie erhält einen Fingerabdruck, der im Protokoll als Warnung angezeigt wird.

So verhält es sich:

Der Kopiervorgang läuft im Hintergrund, eine Datei nach der anderen; Benachrichtigungen warten nicht darauf.
- Eine Datei erscheint erst dann unter ihrem endgültigen Namen auf dem Server, wenn sie vollständig ist (Hochladen als `.part`, Größenprüfung, Umbenennen).
- Ein fehlgeschlagener Kopiervorgang wird protokolliert und in `info.remoteError` angezeigt; er wird nicht wiederholt, sondern die nächste Datei wird erneut kopiert.

`info.lastRemoteCopy` enthält die Zeitangabe der letzten gültigen Kopie.

- _Tage auf dem Server behalten_ löscht ältere Dateien dieses Adapters auf dem Server (0 = alles behalten); andere Dateien in

Die Ordner werden nie angerührt.

- Die _Monatsordner auf dem Server_ sortieren die Dateien in `<Ordner>/<Kamera>/<JJJJ-MM>/`, benannt nach dem Datum in der Datei.

Name. Es dient dazu, alles zu speichern: _Tage auf dem Server gespeichert_ ist dann deaktiviert und es wird nichts auf dem Server gelöscht.

Das Passwort wird verschlüsselt gespeichert. Die Dateien selbst werden auf dem Server nicht verschlüsselt, nur die Übertragung.

### Lagerung
Dateien werden in `iobroker-data/cam-recorder.<instance>/media/` (oder dem von Ihnen angegebenen Ordner) unter dem Namen `<camera>_<YYYY-MM-DD_HH-MM-SS>.<mp4|gif|jpg>` gespeichert. Ältere Dateien werden pro Kamera und Kameratyp gelöscht: Die neuesten _n_ Dateien (standardmäßig 20) bleiben erhalten, jedoch keine, die älter als die maximale Speicherdauer (standardmäßig 7 Tage) sind. Alle anderen Dateien im Ordner bleiben unverändert.

Die Funktion „In Monatsordner sortieren“ speichert alle Dateien, inklusive Zeitraffer-Videos, im Ordner `<folder>/<camera>/<yyyy-mm>/` (Ortszeit). Wer die Dateien in Monatsordner sortiert, behält sie: Die Anzahl der Dateien und das maximale Alter werden dann deaktiviert (ausgegraut), und alte Ordner werden manuell oder durch eine eigene Aufgabe gelöscht. Dateien, die vor diesem Zeitpunkt erstellt wurden, bleiben an ihrem ursprünglichen Speicherort.

Die jeweils neueste Datei jeder Kamera und jedes Typs wird auch in den ioBroker-Dateispeicher (`cam-recorder.0.storage/<camera>.mp4`, `.gif`, `.jpg`) kopiert, wo sie im Admin-Tab _Files_ oder über eine `web`-Instanz geöffnet werden kann.

### Fortschrittlich
- **Pfad zu ffmpeg**: Wenn Sie keinen Pfad angeben, wird die mitgelieferte Binärdatei verwendet. Geben Sie stattdessen einen Pfad an, um eine systemeigene ffmpeg-Version zu verwenden.
- **ffmpeg-Prozesse gleichzeitig** (Standardwert 2): Weitere Anfragen werden zurückgestellt. Auf leistungsschwachen Systemen oder für Kameras, die

Es darf jeweils nur ein Datenstrom zugelassen werden.

- **Kamera-Timeout**: Sekunden, nach denen eine nicht erreichbare Kamera als ausgefallen gewertet wird.

## Gerätemanager
Mit Admin 7 oder neuer zeigt der Geräte-Manager eine Karte pro konfigurierter Kamera an, und zwar auf der Registerkarte „Geräte“ der Instanzeinstellungen und unter „Geräte“ im Menü des Admins:

- **Status:** online oder offline. Der Adapter öffnet eine TCP-Verbindung zum Host und Port der Kamera-URL unter der

Der Vorgang startet jede Minute (ohne Anmeldung, ohne ffmpeg) oder überwacht den Online-Status bzw. die UniFi Protect-Konsole (siehe _Online oder Offline_) und speichert das Ergebnis in `cameras.<camera>.reachable`. Der letzte Fehler wird als Warnung auf der Karte angezeigt.

- **Aufnahme läuft:** Ein roter Punkt mit der Aufschrift _Aufnahme_ oder _Schnappschuss_ wird angezeigt, während ffmpeg für diese Kamera arbeitet.
- **Letzter Clip** und **letztes Foto** mit Datum und Uhrzeit sowie den Sekunden vor der Aufnahme, falls diese Funktion aktiviert ist.
- **Bild:** der letzte Snapshot, wenn _Neueste Datei in den ioBroker-Dateispeicher kopieren_ aktiviert ist (Registerkarte _Speicher_).
- **Video aufnehmen** und **Schnappschuss**: entsprechen den Schaltflächen `cameras.<camera>.record` und `.snapshot` - ein Clip mit

Die Länge und das Format des Aufnahmefensters (Registerkarte „Aufnahme“) oder eines Bildes werden ohne Benachrichtigung angezeigt. Im Dialogfeld wird der Dateiname oder der Fehler angezeigt, anschließend wird die Karte aktualisiert. Solange die Kamera offline ist, sind beide Schaltflächen ausgegraut. Der Administrator aktualisiert die Schaltflächen nicht automatisch, sodass eine zuvor geöffnete Karte so lange angezeigt wird, bis die Seite neu geladen wird. Ein Klick darauf zeigt dann lediglich an, dass die Kamera offline ist.

Die Kameras, Auslöser und alle anderen Einstellungen bleiben in den Einstellungen der Instanz erhalten; der Geräte-Manager zeigt sie nur an und startet Aufnahmen.

## Zeitplan
Neben Triggern kann eine Kamera auch selbstständig Bilder oder Videos aufnehmen: alle paar Minuten oder zu festgelegten Zeiten. Der Zeitplan wird in den Zuständen `cam-recorder.0.cameras.<camera>.schedule.*` gespeichert, nicht in den Instanzeinstellungen. Daher ändert er sich ohne Neustart, und Skripte, Blockly, Szenen und KI-Agenten (ioBroker.pi-agent liest seine Beschreibung über `help`) können ihn wie die Karte selbst festlegen. Die Zustände werden in Backups gespeichert.

Auf der Registerkarte „Geräte“ verfügt jede Kamerakarte über zwei Schaltflächen:

- **Intervall**: alle _N_ Minuten, gezählt ab Mitternacht (30 = um :00 und :30 Uhr), optional nur zwischen zwei Zeitpunkten

(22:00 bis 06:00 Uhr, einschließlich Mitternacht).

- **Zeitplan**: Feste Zeiten als Cronmuster im Cron-Dialog des Administrators festlegen, z. B. `0 7,19 *** für 7:00 Uhr und

19:00 oder `*/15 * * * 1-5` für jede Viertelstunde an Wochentagen.

Beide Formulare verwenden die Felder „Aktiv“, die Aktion (Schnappschuss, Clip oder beides), die zu sendenden Profile und zwei Bedingungen. Jeder Durchlauf funktioniert wie ein Auslöser: Die Dateien werden gespeichert und gesendet, und die KI-Prüfung wird für Profile mit den entsprechenden Kriterien ausgeführt. Die Karte zeigt den nächsten Durchlauf an.

- **Nur bei einem KI-Match senden** (benötigt pi-agent auf dem Tab „KI-Prüfung“): Die Dateien werden immer gespeichert, aber nur an den/die/das gesendete/n Spieler/in gesendet.

Profile, deren Kriterium der Pi-Agent im Snapshot erkennt, werden zusammen mit der zugehörigen Meldung gespeichert. Ein Snapshot des Hofes alle 5 Minuten nachts wird dann nur dann erstellt, wenn sich dort eine Person befindet, nicht 96 Mal, wenn der Hof leer ist. Im Gegensatz zu einem Trigger, bei dem eine fehlgeschlagene Erkennung niemals die Türklingelmeldung auslösen darf, sendet ein Zeitplan ohne diesen Schalter bei jedem Durchlauf eine Meldung.

- **Nur wenn**: ein Zustand und eine Bedingung, wie in der Triggertabelle, z. B. `0_userdata.0.away` `=` `true`. Ein Lauf, dessen

Wenn die Bedingung nicht erfüllt ist, wird die Meldung stillschweigend übersprungen (Debug-Protokoll).

| Zustand | Beispiel | Bedeutung |
| ------------- | ------------------- | ----------------------------------------------- |
| `enabled` | `true` | Hauptschalter |
| `from` | `22:00` | nur das Intervall von … (beide leer = ganztägig) |
| `to` | `06:00` | … bis |
| `cron` | `0 7,19 * * *` | feste Zeiten, leer = aus |
| `action` | `snapshot` | `snapshot`, `record` oder `both` |
| `profiles` | `Alex, Telegram` | Profile senden, leer = nur gespeichert |
| `aiOnly` | `true` | Nur an Profile mit KI-Übereinstimmung senden |
| `onlyIfState` | `0_userdata.0.away` | Nur ausführen, solange dieser Zustand die Bedingung erfüllt |
| `onlyIfOp` | `eq` | `eq`, `ne`, `gt`, `lt` |
| `onlyIfValue` | `true` | Wert der Bedingung |
| `next` | (schreibgeschützt) | Zeitpunkt des nächsten Durchlaufs, 0 = keiner |
| `next` | (schreibgeschützt) | Zeitpunkt des nächsten Durchlaufs, 0 = keiner |

Ein falscher Wert (ein Cron-Muster mit einem Tippfehler, eine Zeitangabe wie `25:00`) wird im Protokoll und auf der Karte gemeldet, und dieser Teil wird nicht ausgeführt.

## Staaten
Pro Kamera unten `cam-recorder.0.cameras.<camera>`:

| Zustand | Bedeutung |
| -------------------- | ----------------------------------------------- |
| `record` | Schaltfläche: Clip mit den Standardeinstellungen aufnehmen |
| `lastVideo` | Pfad des neuesten Clips |
| `lastVideoTime` | Zeitpunkt des neuesten Clips |
| `lastSnapshot` | Pfad des neuesten Snapshots |
| `lastSnapshotTime` | Zeitpunkt des letzten Snapshots |
| `status` | `idle`, `recording`, `snapshot` oder `error` |
| `lastError` | Text des letzten Fehlers, nach Erfolg leer |
| `description` | Was die KI-Prüfung im neuesten Snapshot festgestellt hat |
| `reachable` | Online (siehe _Online oder offline_) |
| `prebuffer` | `off`, `starting`, `running` oder `restarting` |
| `timelapse` | Schaltfläche: Jetzt das Zeitraffervideo starten |
| `lastTimelapse` | Pfad des neuesten Zeitraffervideos |
| `lastTimelapseTime` | Zeitpunkt des neuesten Zeitraffervideos |
| `timelapseFrames` | Bilder, die auf das nächste Zeitraffervideo warten |
| `timelapseNextVideo` | Zeitpunkt des nächsten Zeitraffervideos |
| `timelapseNextVideo` | Zeitpunkt des nächsten Zeitraffervideos |

Unterhalb von `cam-recorder.0.report` (siehe _Bericht_): `send` (Schaltfläche), `text` (der letzte Bericht), `lastTime`.

`info.connection` ist wahr, wenn ffmpeg gefunden wurde und funktioniert; `info.ffmpegVersion` zeigt die Version an.

`info.lastRemoteCopy` und `info.remoteError` melden, dass das Programm auf den SFTP-Server kopiert wurde.

## Skripte
Die Antwort erfolgt, sobald die Datei vollständig ist, daher ist keine Wartezeit erforderlich:

```js
on({ id: 'doorbird.0.Doorbell.1.trigger', change: 'any' }, () => {
    sendTo('cam-recorder.0', 'record', { camera: 'Front Door', duration: 5, format: 'mp4' }, result => {
        if (result.error) {
            log(result.error, 'warn');
            return;
        }
        sendTo('telegram.0', 'send', { text: result.file, user: 'User1', caption: 'Doorbell' });
    });
});
```

| Befehl | Nachricht | Antwort |
| -------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `record` | `{ camera, duration?, pre?, format?: 'mp4' \| 'gif', width?, fps?, profiles? }` | `{ file, size, format, duration, pre, extended, fromBuffer, realDuration, camera, time }` oder `{ error }` |
| `timelapse` | `{ camera }` oder nur der Kameraname | das Video wie oben, oder `{ error }` wenn weniger als zwei Bilder warten |
| `report` | `{ send?: boolean }`, `send: false` erstellt nur den Text | `{ text }` (leer ohne ausgewählte Ereignisse), oder `{ error }` wenn der Bericht deaktiviert ist |
| `listCameras` | - | `[{ value, label }]` |
| `listProfiles` | - | `[{ value, label }]` |
| `help` | - | `{ help }`: die Befehle, Zustände und Regeln als Text für einen KI-Agenten |
| `help` | - | `{ help }`: die Befehle, Zustände und Regeln als Text für einen KI-Agenten |

`profiles: 'Me, Father'` (oder eine Liste) sendet das Ergebnis über die Profile des Tabs „Senden“. Die Vorgehensweise aus Version 0.4.x funktioniert weiterhin: `telegram: true` sendet über alle aktiven Profile, `recipients: 'Father'` hingegen nur über diese.

Wenn ein Profil der Nachricht das Kriterium des Tabs „KI-Prüfung“ erfüllt, wird auch der Snapshot geprüft (siehe „KI-Prüfung“), und die Antwort enthält `description`.

`pre` begrenzt die Sekunden vor dem Ereignis (maximal der für die Kamera festgelegte Wert; `0` = keine Voraufzeichnung für diesen Clip); `duration` ist immer die Zeit nach dem Ereignis, und `duration` der Antwort enthält den gesamten Clip.

## Sicherheitshinweise
- Die Kamerapasswörter werden verschlüsselt im Instanzobjekt gespeichert, und die Kameraliste ist für andere nicht lesbar.

Adapter (`protectedNative`).

ffmpeg wird ohne Shell gestartet. Anmeldeinformationen werden aus allen Logzeilen, Statusmeldungen und Antworten entfernt.
Während ffmpeg läuft, ist seine Befehlszeile (mit dem Kamera-Login) für andere Benutzer **desselben Rechners** sichtbar.

Die Prozessliste (`ps`). ffmpeg kann keine RTSP-Anmeldung von anderen Orten annehmen. Auf einem dedizierten ioBroker-Host oder in einem Container ist dies in der Regel akzeptabel; weisen Sie der Kamera einen Benutzer zu, der ausschließlich den Stream ansehen darf.

- Aufgezeichnete Dateien sind nicht verschlüsselt. Dateien, die in den ioBroker-Dateispeicher kopiert wurden, können von jedem Administratorbenutzer geöffnet werden und

abhängig von den Einstellungen, über eine `web`-Instanz.

Das Passwort der UniFi Protect-Konsole wird verschlüsselt gespeichert („encryptedNative“). Die Konsole verfügt über ein Zertifikat.

Da niemand das Zertifikat unterzeichnet hat, wird es nicht überprüft; verwenden Sie einen Benutzer mit der Rolle _Nur anzeigen_.

Das SFTP-Passwort wird verschlüsselt gespeichert (`encryptedNative`). Ein Verbindungstest mit leerem Passwortfeld verwendet die

Das gespeicherte Passwort gilt nur für den gespeicherten Server, sodass kein Skript es an einen anderen Host senden kann.

## Ffmpeg-Lizenz
Der Adapter ist unter der MIT-Lizenz lizenziert. Die mitgelieferte ffmpeg-Binärdatei stammt aus [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) und ist unter der GPL lizenziert (sie enthält libx264). Sie wird als separates Programm gestartet und nicht in den Adapter eingebunden.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.8.5 (2026-11-19)

- (sadam6752-tech) The message `help` is declared (`supportedMessages.help`) and lists every command with `write`, so
  AI agents know which commands only read

### 0.8.4 (2026-11-16)

- (sadam6752-tech) Cameras: column _Online state_ and a login for UniFi Protect, so a camera behind an NVR shows
  offline when it is off (the TCP check only reached the NVR)
- (sadam6752-tech) Devices: _Record video_ and _Snapshot_ are greyed out on the card of an offline camera

### 0.8.3 (2026-11-15)

- (sadam6752-tech) AI check: a daily report (_Report_), written by pi-agent from what its checks saw since the last
  one, sent through chosen profiles; state `report.send` and command `report`

### 0.8.2 (2026-11-15)

- (sadam6752-tech) AI check: the new column _AI_ of the tab _Send_ lets a profile with criteria get the files only on a
  match or wait for the check and get one message with the description; `{description}` and `{matches}` in the text.
  The default keeps the files at once plus the extra message

### 0.8.1 (2026-11-15)

- (sadam6752-tech) Schedule: _Send only on an AI match_ sends a scheduled snapshot or clip only to the profiles whose
  criterion pi-agent sees, and _Only if_ runs it only while a state meets a condition (e.g. nobody at home)

Older changes are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>

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