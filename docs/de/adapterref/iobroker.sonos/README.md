---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonos/README.md
title: ioBroker.sonos
hash: FB8ZHahjBod8nsWYjOPNOTJ/kHl8IxJX0Cupmpc4d1Y=
---
![Logo](../../../en/adapterref/iobroker.sonos/admin/sonos.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonos-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonos.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonos.svg)

# ioBroker.sonos

![Test und Freigabe](https://github.com/ioBroker/ioBroker.sonos/workflows/Test%20and%20Release/badge.svg)[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sonos/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

SONOS-Geräte mit ioBroker steuern und überwachen.

## Widgets

Der Adapter liefert ein Widget für beide Visualisierungsadapter. Beide werden mit dem Adapter installiert; **vis** und **vis-2** werden automatisch neu gestartet, der Editor muss jedoch manuell neu geladen werden (Strg+F5).

**Sonos Control** schaltet zwischen Räumen um, steuert die Wiedergabe, erstellt Gruppen und startet Favoriten, Wiedergabelisten, Titel in der Warteschlange, zuletzt gehörte Titel und Quellen. Binden Sie es an eine _Instanz_ , zum Beispiel`sonos.0` - nicht auf einen einzelnen Staat wie z.B.`play` Das Widget erkennt selbstständig alle Sprecher dieser Instanz.

Jeder gefundene Lautsprecher wird oben als Symbol angezeigt. Die Gruppenzugehörigkeit wird über die Kontrollkästchen aktiviert/deaktiviert. Gehört ein Raum zu einer Gruppe, wird im Wiedergabebereich der Titel der Gruppe angezeigt, nicht der letzte lokale Titel dieses Raums. Die Bibliotheksschaltflächen ( **Favoriten** , **Wiedergabelisten** , **Warteschlange** , **Zuletzt gehört** , **Quellen** ) öffnen darunter ein Fenster. Unter **„Zuletzt gehört** “ werden die letzten Titel des ausgewählten Raums angezeigt.

![Sonos-Steuerung – Player](../../../en/adapterref/iobroker.sonos/img/widget-player.png)

_Räume, Gruppierung und aktuelle Wiedergabe_

![Sonos-Steuerung – Favoriten](../../../en/adapterref/iobroker.sonos/img/widget-favorites.png)

_Die Bibliotheksknöpfe öffnen ein Blatt unterhalb der Räume._

![Sonos-Steuerung – Quellen](../../../en/adapterref/iobroker.sonos/img/widget-sources.png)

_Quellen: TuneIn, die Musikbibliothek, Netzwerkfreigaben, Line-In und HDMI-Anschluss des Fernsehers_

![Sonos-Steuerung – TV-HDMI](../../../en/adapterref/iobroker.sonos/img/widget-hdmi.png)

_TV HDMI: Titel, TV-Format, Stummschaltung, Nachtmodus, Ton- und Sprachverbesserung_

### vis-2 und vis 1

Es gibt zwei Implementierungen von **Sonos Control** unter derselben Template-ID.`tplSonosControl` : eine React-Version für vis-2 (`src-widgets` ) und die ursprüngliche jQuery-Version für vis 1 (`widgets/sonos.html` ).

Jeder Editor zeigt immer nur eines davon an. Denn der Adapter deklariert`common.visWidgets` , vis-2 Skips`widgets/sonos.html` vollständig und lädt das React-Widget; vis 1 kennt keine React-Widget-Sets und lädt stattdessen das jQuery-Widget. Ansichten, die mit dem vis-1-Widget erstellt wurden, behalten ihre`oid` Bindung, wenn sie in vis-2 geöffnet werden.

vis-2 bietet zusätzlich **Sonos Room** , einen Lautsprecher als kompakte Karte mit Cover, Titel, Transport- und Lautstärkeregelung. Die letzte Taste öffnet die gleiche Quellenauswahl in einem Dialog, sodass eine einzelne Karte auch einen Favoriten, eine Playlist oder eine Quelle starten kann. Es gibt kein vis-1-Pendant.

In vis-2 kann jeder Teil der Sonos-Steuerung (Räume, Gruppen, Lautstärke, Bibliothek) deaktiviert werden, und das Widget kann in einem bestimmten Raum gestartet werden.

### Quellen

**Die Quellensuche** durchsucht TuneIn Radio, die Musikbibliothek, Netzwerkfreigaben und Line-In über das Inhaltsverzeichnis des Lautsprechers. Musikdienste werden nur angezeigt, wenn sie vom Haushalt gemeldet werden. Dienste mit einem SMAPI-Katalog (z. B. Spotify) können nach einmaliger Anmeldung durchsucht werden. Dienste ohne solchen Katalog zeigen nur die in der Sonos App als Favoriten oder Playlist gespeicherten Titel an.

**Das TV-Signal** wird nur auf Lautsprechern wiedergegeben, die über einen HDMI- oder optischen Eingang verfügen (Arc, Beam, Playbar, Playbase, Ray, Amp). Über den TV-Eingang stehen keine Transportsteuerungen zur Verfügung – Wiedergabe, Pause, Suche, nächster und vorheriger Titel sind nicht möglich; Stummschaltung, Nachtmodus und Sprachverbesserung hingegen schon.

## Widgets für ioBroker.devices

Neben den vis-Widgets liefert der Adapter zwei Widgets für das Dashboard des **ioBroker.devices** -Adapters. Diese werden dort mit **+ → SONOS Player** / **SONOS Rooms** hinzugefügt, und jedes Widget verfügt über einen eigenen Einstellungsdialog – es muss kein Status manuell ausgewählt werden.

**Der SONOS Player** ist ein einzelner Lautsprecher. In den Einstellungen werden die Instanz und der Lautsprecher abgefragt; die Lautsprecherliste stammt vom Adapter selbst und stimmt daher immer mit den Geräten auf der Registerkarte _„SONOS-Geräte“_ überein.

| Größe    | Was gezeigt wird                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------- |
| 1x1      | Das Cover als Hintergrund, der Raum, der Titel und die Wiedergabe-/Pause-Taste.                          |
| 2x0,5    | Ein Comicstrip: Titelbild, Titel, vorheriger/Wiedergabe/nächster Titel, Stummschaltung                   |
| 2x1, 2x2 | Der gesamte Player: Cover, Titel, Transport, Zufallswiedergabe, Wiederholung, Fortschritt und Lautstärke |

Cover, Fortschritt, Lautstärke, Zufallswiedergabe/Wiederholung und die Quellenauswahl können einzeln deaktiviert werden. Bei einem Lautsprecher, der den TV-Eingang wiedergibt, sind die Transporttasten ausgeblendet, da der HDMI-Eingang nicht gesteuert werden kann – nur die Stummschaltung bleibt erhalten.

Über die Schaltfläche „Quelle“ wird dieselbe Auswahl wie im Widget „vis“ angezeigt – Favoriten, Wiedergabelisten, die Warteschlange, zuletzt abgespielte Titel und die durchsuchbaren Quellen des Sprechers – als Dialogfeld über der Kachel geöffnet.

**SONOS Rooms** visualisiert den gesamten Haushalt in einem Widget: Anzahl der Lautsprecher, Musikwiedergabe und Lautstärke. Die kleinen Widgets zeigen den Zähler und öffnen die Liste in einem Dialog; 2x1 und 2x2 zeigen die Liste direkt an.

Jede Zeile verfügt außerdem über eine Quellenauswahltaste, die die Quellenauswahl für den jeweiligen Lautsprecher öffnet, sodass ein Favorit oder eine Wiedergabeliste gestartet werden kann, ohne die Übersicht zu verlassen.

Es bildet außerdem Gruppen: Durch Klicken auf die Verknüpfungsschaltfläche eines Sprechers wird dieser als Gruppenmaster festgelegt, und durch Klicken auf die Verknüpfungsschaltfläche jedes anderen Sprechers wird dieser der Gruppe hinzugefügt oder wieder entfernt. Ein zweites Klicken auf den Master beendet diesen Modus.

## Registerkarte „Steuerung“ im Adminbereich

Die Instanzeinstellungen verfügen über einen dritten Tab, **„Steuerung“** . Es handelt sich um denselben Player wie in der visuellen Ansicht, jedoch innerhalb der Administrationsoberfläche: Wählen Sie links einen Lautsprecher aus und steuern Sie ihn rechts – Wiedergabe, Fortschritt, Lautstärke, Gruppierung und die Bibliothek mit Favoriten, Wiedergabelisten, Warteschlange, zuletzt gespielten Titeln und Quellen.

Dies dient der Überprüfung, ob ein neu hinzugefügter Lautsprecher tatsächlich antwortet, ohne die Adapterkonfiguration zu verlassen. Der Tab kommuniziert mit der laufenden Instanz und bleibt daher leer, solange die Instanz gestoppt ist.

## Steuerseite im Browser

Der Adapter liefert eine Steuerungsseite für den **Webadapter** mit. Diese ist erreichbar unter

```
http://<ioBroker>:8082/sonos/
```

und bietet die gleichen Funktionen wie das Vis-Widget: die Raum-Chips, die aktuell abgespielte Musik mit Cover, Transport, Fortschritt, Lautstärke, die Gruppierungs-Kontrollkästchen und die Quellenauswahl mit Favoriten, Wiedergabelisten, Warteschlange, zuletzt abgespielten Titeln und den durchsuchbaren Quellen des Lautsprechers.

Es wird keine Web-Erweiterung verwendet.`iobroker upload sonos` setzt die`www/` Der Adapter speichert den Ordner im ioBroker-Dateispeicher, und der Webadapter stellt die Datei von dort bereit – seine Catch-All-Route liest den ersten Pfadabschnitt der URL als Adapternamen. Dies ist derselbe Mechanismus, den der Adapter bereits verwendet, um eine TTS-Datei an einen Sprecher zu übergeben.

Die Seite kommuniziert über den Socket der Webinstanz, die sie bereitstellt, mit ioBroker und übernimmt daher deren Authentifizierung und Benutzerrechte. Der Socket-Client ist nicht im Lieferumfang enthalten: Die Seite fragt den Webadapter danach.`socket.io.js` und ruft ab, was diese Instanz verwendet – socket.io oder`@iobroker/ws` Die

`?instance=sonos.1` Heft die Seite an eine Instanz an,`?room=Kitchen` Öffnet es auf einem bestimmten Lautsprecher. Andernfalls wird die erste Instanz verwendet und der letzte Lautsprecher im Browser gespeichert.

Im Adminbereich erscheint die Seite auch als Kachel in der Übersicht, neben den Kacheln der anderen Adapter.

## Umgang mit Gruppen

- Bundesstaaten für die Verwaltung von SONOS-Gruppen:
  - **`coordinator`** : Den Koordinator festlegen/abrufen, also das SONOS-Gerät, das als Master fungiert und die Gruppe koordiniert. Hierfür wird die IP-Adresse (der Kanalname) des SONOS-Geräts benötigt, das als Koordinator fungieren soll, jedoch mit einem Unterstrich.`_` statt Punkt`.` Verwenden Sie beispielsweise`192_168_0_100` für IP-Adresse`192.168.0.100` Wenn das Gerät keiner Gruppe angehört, entspricht der Wert dem eigenen Kanalnamen (IP-Adresse).
  - **`group_volume`** : das Volumen der Gruppe
  - **`group_muted`** : Stummschaltungsstatus der Gruppe.
  - **`add_to_group`** Fügen Sie dem SONOS-Gerät, unter dem dieser Status angezeigt wird, ein bestimmtes SONOS-Gerät hinzu. Verwenden Sie die IP-Adresse mit Unterstrichen (siehe oben).
  - **`remove_from_group`** Entfernen Sie ein bestimmtes SONOS-Gerät aus dem SONOS-Gerät, unter dem dieser Status registriert ist. Verwenden Sie die IP-Adresse mit Unterstrichen (siehe oben).

\*) Diese Statusangaben werden aktualisiert, wenn Änderungen in der SONOS-App vorgenommen werden.

## Verwendung mit dem sayIt-Adapter

Um den [Sayit-Adapter](https://github.com/ioBroker/ioBroker.sayit) mit diesem SONOS-Adapter zu verwenden, stellen Sie sicher, dass der [Web-Adapter](https://github.com/ioBroker/ioBroker.web) ebenfalls instanziiert ist und ausgeführt wird. Der Web-Adapter ist erforderlich, damit der SONOS-Adapter die vom Sayit-Adapter generierte MP3-Datei lesen kann.

### Warnung: Stabilitätsprobleme in Kombination mit dem sayIt-Adapter

Bitte beachten Sie: Dieser SONOS-Adapter weist Stabilitätsprobleme auf, wenn die Sprachausgabe mit dem sayIt-Adapter verwendet wird. Folgende Symptome wurden beobachtet:

1. Beliebige Volumenänderung auf 0 oder 100 %.
2. Keine Reaktion nach einer zufälligen Anzahl von Text-zu-Sprache-Sequenzen

Als Workaround für die Text-zu-Sprache-Umwandlung kann die [SONOS HTTP API](https://github.com/jishi/node-sonos-http-api) verwendet werden.

## Favoriten & Warteschlange in VIS

Nutzungszustände`favorites_list_html` Und`queue_html` Mit einem einfachen HTML-Widget in VIS lassen sich Wiedergabelisten und die aktuelle Wiedergabeliste anzeigen. Durch Klicken auf eine Zeile wird die entsprechende Wiedergabeliste oder der Titel sofort abgespielt.

Für eine eigene Benutzeroberfläche sind dieselben Listen als JSON verfügbar:`favorites_list_array` ,`playlist_list_array` Und`queue_array` Die`queue` Verbindet die Spuren mit einem Komma und kann nicht zuverlässig wieder getrennt werden, daher verwenden Sie`queue_array` - es trägt eins`{ artist, title, album, cover }` Eintrag pro Spur, und der Index eines Eintrags ist der Wert für`current_track_number` Formatieren Sie die Tabelle mit den folgenden CSS-Klassen:

### Favoriten

- `sonosFavoriteTable` : Lieblingstisch für ein Loch
- `sonosFavoriteRow` : Zeilen mit Favoriteninformationen
- `sonosFavoriteNumber` Anzahl der Favoriten
- `sonosFavoriteCover` Albumcover des Lieblingsalbums (Bild aufnehmen mit`.sonosFavoriteCover img` )
- `sonosFavoriteTitle` Name des Favoriten

### Warteschlange

- `.sonosQueueTable` : Lochtabelle
- `.sonosQueueRow` : Zeilen mit Streckeninformationen
- `.currentTrack` : wurde der Zeile hinzugefügt, die den aktuell abgespielten Titel enthält.
- `.sonosQueueTrackNumber` : Nummer oder Spur
- `.sonosQueueTrackCover` Albumcover des Titels (Bild aufnehmen mit`.sonosQueueTrackCover img` )
- `.sonosQueueTrackArtist` Name des Künstlers
- `.sonosQueueTrackAlbum` Name des Albums (verwenden`display:none` (falls nicht erforderlich)
- `.sonosQueueTrackTitle` Name des Titels

Bei langen Listen hinzufügen`overflow:auto;` oder`overflow-y:auto;` zum einfachen HTML-Widget. Bitte beachten Sie: Das Hervorheben des aktuell abgespielten Favoriten wird nicht unterstützt.

### Beispiel-CSS

```
.sonosFavoriteTable {
    color: #bbb;
    font-size: 12px;
}
.sonosFavoriteRow {
    cursor: pointer;
}
.sonosFavoriteNumber {}
.sonosFavoriteCover img {
    width: 30px;
    height: 30px;
}
.sonosFavoriteTitle {}

.sonosQueueTable {
    color: #bbb;
    font-size: 12px;
}
.sonosQueueRow {
    display: table-row;
    cursor: pointer;
}
.sonosQueueRow.currentTrack {
    color: #fff;
    font-weight: bold;
}
.sonosQueueTrackNumber {}
.sonosQueueTrackCover img {
    width: 30px;
    height: 30px;
    display: table-column;
}
.sonosQueueTrackArtist {
    display: table-row;
}
.sonosQueueTrackAlbum {
    display: none;
}
.sonosQueueTrackTitle {
    display: table-row;
}
```

## Entwicklung

Neben dem Adapter befinden sich vier Frontends, alle mit Vite erstellt – die ersten drei zusätzlich mit Modulföderation:

| Quellen        | Build-Ausgabe       | Geladen von                                                |
| -------------- | ------------------- | ---------------------------------------------------------- |
| `src-widgets/` | `widgets/sonos/`    | vis-2                                                      |
| `src-admin/`   | `admin/custom/`     | die Registerkarte **„Steuerung“** der Instanzeinstellungen |
| `src-devices/` | `admin/dm-widgets/` | das Dashboard von ioBroker.devices                         |
| `src-web/`     | `www/`              | der **Webadapter** , bei`/sonos/`                          |

```bash
npm run npm:all        # install the adapter and all four front-ends
npm run build          # adapter + vis-2 widgets + web page - what CI and npm publish run
npm run build:web      # the control page          -> www/
npm run build:admin    # the Control tab component -> admin/custom
npm run build:devices  # the ioBroker.devices widgets -> admin/dm-widgets
npm run build:all      # everything
```

`admin/custom/`Und`admin/dm-widgets/` sind festgeschrieben, da ein Cold-Module-Federation-Build den gesamten gemeinsam genutzten GUI-Stack vorab erstellt und mehrere Minuten dauert – erstellen Sie ihn mit den oben genannten Skripten neu, sobald etwas unterhalb von`src-admin/` oder`src-devices/` geändert und das Ergebnis speichern.

`src-devices` verfügt über ein Entwickler-Geschirr:`cd src-devices && npm start` öffnet die Widgets auf`http://localhost:3000` gegen einen echten ioBroker-Administrator am`localhost:8081` , sodass sie entwickelt werden können, ohne jedes Mal ioBroker.devices neu erstellen zu müssen.

`src-web` hat dasselbe:`cd src-web && npm start` dient der Steuerungsseite auf`http://localhost:4174` und leitet den Socket, den Socket-Client und die Coverbilder an eine Webinstanz weiter.`localhost:8082` Die

## Zu erledigen

- Neu schreiben mit <https://github.com/svrooij/node-sonos-ts>

## Konfiguration

- Webserver - \[optional] Gibt an, ob der Webserver aktiviert ist oder nicht.
- Aktualisierung der verstrichenen Zeit (ms) – Intervall in ms, wie oft der Timer während der Wiedergabe aktualisiert werden soll. (Standardwert: 2000)
- Sonos-Bibliothek – welche Client-Bibliothek mit den Lautsprechern kommuniziert, siehe unten

### Sonos-Bibliothek

Der Adapter liefert zwei Clientbibliotheken mit, und die Einstellung wählt eine davon aus. Ansonsten ändert sich nichts: Die Zustände, ihre Namen und ihre Werte sind in beiden Fällen identisch.

| Einstellung                     | Bibliothek        | Status                                    |
| ------------------------------- | ----------------- | ----------------------------------------- |
| `sonos-discovery (default)`     | `sonos-discovery` | Was der Adapter schon immer verwendet hat |
| `@svrooij/sonos (experimental)` | `@svrooij/sonos`  | Instandgehaltener Ersatz, wird getestet   |

`sonos-discovery` Da es seit 2022 keine neue Version gab und eine seiner Abhängigkeiten den Adapter beim Start beschädigte, wird derzeit ein Ersatz vorbereitet. Dieser wird hier angeboten, damit er in realen Haushalten getestet werden kann – im CI ist keine SONOS-Hardware vorhanden, und die Bereiche, die nur von realen Lautsprechern abgedeckt werden, können in Tests nicht berücksichtigt werden.

Wenn Sie es ausprobieren, sind folgende Anwendungsfälle interessant: Gruppierung und Auflösung der Lautsprechergruppe, Ansagen während der Wiedergabe, Starten eines Favoriten oder einer Playlist, der TV-Eingang einer Soundbar und die Suche in einem Musikdienst. **Stellen Sie die Einstellungen wieder auf die Standardeinstellungen zurück, falls etwas nicht wie erwartet funktioniert,** und melden Sie bitte Ihre Beobachtungen. Diese Einstellung dient dazu, dass niemand den Adapter downgraden muss, um den funktionierenden Zustand wiederherzustellen.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.4 (2026-09-08)
* (@GermanBluefox) Added a control page for the web adapter under `/sonos/`, plus a tile on the admin overview
* (@GermanBluefox) Added the source selection (favorites, playlists, queue, recently played, sources) to all four widgets
* (@GermanBluefox) Added `queue_array`, the play queue as JSON - `queue` joins the tracks with a comma and cannot be split back reliably

### 4.2.2 (2026-09-08)
* (@GermanBluefox) Added two widgets for the `ioBroker.devices` dashboard: SONOS player and SONOS rooms
* (@GermanBluefox) Added a "Control" tab to the instance settings, which plays and groups the speakers directly in admin

### 4.2.0 (2026-09-06)
* (@GermanBluefox) The client library can be switched in the instance settings
* (@GermanBluefox) Added `@svrooij/sonos` as an experimental alternative to `sonos-discovery`
* (@GermanBluefox) The adapter talks to a backend interface now, so both libraries fill the same states

### 4.1.0 (2026-09-06)
* (@GermanBluefox) Added a React implementation of `Sonos Control` for vis-2, plus the new `Sonos room` widget
* (kosmix1980) vis widget: rooms, groups, favorites, playlists, queue, recent tracks and sources
* (kosmix1980) Sources: TuneIn, music library, network shares, line-in and SMAPI catalog search
* (kosmix1980) TV HDMI as a playable source with format, cover, night sound and speech enhancement
* (kosmix1980) Added `playlist_list` / `playlist_list_array` and per-room `recent_tracks`
* (kosmix1980) Group members follow the coordinator's now-playing and transport
* (@GermanBluefox) TV is offered only on speakers that have an HDMI/optical input
* (@GermanBluefox) Music services are listed only when the household reports them
* (@GermanBluefox) Removed the YouTube Music catalog search: it used a private, undocumented Google endpoint
* (@GermanBluefox) Only the group coordinator updates the elapsed time of the group now
* (@GermanBluefox) SMAPI account tokens are stored with restrictive file permissions

### 4.0.3 (2026-08-13)
* (@GermanBluefox) Fixed TTS: without a volume in the file name, the announcement was played with volume 0
* (@GermanBluefox) Fixed the immediate stop of TTS: the state before TTS was not restored and TTS stayed blocked
* (@GermanBluefox) A muted player is unmuted now for the announcement and muted again afterwards
* (@GermanBluefox) An empty value in the `tts` state stops the running announcement
* (@GermanBluefox) The adapter was migrated to TypeScript and is now based on classes
* (@GermanBluefox) The "root" device object is created now by js-controller from io-package.json
* (biglouis) Missing states of the already existing devices will be created at the start
* (VierlingMt) Fixed the error if `favorites_set` was called with an empty value
* (seb2010) Added support for treble and bass information
* (Apollon77) stores the tts files in files instead of binary states

## License

The MIT License (MIT)

Copyright (c) 2014-2026, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.