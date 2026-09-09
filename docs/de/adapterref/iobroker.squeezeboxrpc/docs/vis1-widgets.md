---
chapters: {"pages":{"en/adapterref/iobroker.squeezeboxrpc/README.md":{"title":{"en":"ioBroker Logitech/Lyrion Squeezebox Adapter over JSON/RPC-Protocol"},"content":"en/adapterref/iobroker.squeezeboxrpc/README.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 1"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 2"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md
title: SqueezeboxRPC-Widgets für VIS 1
hash: 5NNNU8LEGAgWJwqGmCTIFy6naWNuITMnr7lQiz9DAHs=
---
# SqueezeboxRPC-Widgets für VIS 1

Dieses Dokument beschreibt alle mit dem Adapter gelieferten VIS 1-Widgets. Fügen Sie zuerst ein **Players-** Widget hinzu, konfigurieren Sie dessen Adapterinstanz und referenzieren Sie dieses Widget von den anderen Steuerelementen und Anzeigen aus.

## Inhaltsverzeichnis

- [Spieler](#players)
- [Favoriten](#favorites)
- [Wiedergabetaste](#play-button)
- [Weiter-Schaltfläche](#forward-button)
- [Rückspultaste](#rewind-button)
- [Wiederholungstaste](#repeat-button)
- [Zufallswiedergabe-Taste](#shuffle-button)
- [Lautstärkeregler](#volume-bar)
- [SyncGroup](#syncgroup)
- [Spielzeitleiste](#playtime-bar)
- [Zeichenkette](#string)
- [Nummer](#number)
- [Datum/Uhrzeit](#datetime)
- [Bild](#image)
- [Wiedergabeliste](#playlist)
- [PlaylistDetail](#playlistdetail)
- [Browser](#browser)

## Spieler

![Spieler-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/players.png)

Wählt den aktiven LMS-Player aus und dient als Verbindungspunkt für die anderen SqueezeboxRPC-Widgets.

| Einstellung                                     | Standard             | Beschreibung                                                                                              |
| ----------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| SqueezeboxRPC-Instanz (`ainstance` )            | —                    | Adapterinstanz, deren Spieler geladen sind.                                                               |
| Widget-Format (`formattype` )                   | `formatbutton`       | Zeigt Spielerschaltflächen oder ein kompaktes Auswahlfeld an. SyncGroup benötigt das Schaltflächenformat. |
| Hilfe zum Anzeigen des Index (`viewindex` )     | —                    | Der VIS 1-Helfer wird verwendet, um konfigurierte Spielereinträge zu adressieren.                         |
| CamelCase einwickeln (`wrapcamelcase` )         | An                   | Ermöglicht das Umbrechen langer CamelCase-Player-Etiketten.                                               |
| Bearbeitungsmodus-Assistent (`editmodehelper` ) | An                   | Zeigt Indizes im Editor an, um die individuelle Konfiguration zu vereinfachen.                            |
| Bildbreite / -höhe                              | `50` /`50` px        | Größe jedes Spielerbuttons.                                                                               |
| Opazität                                        | `0.5`                | Deckkraft für inaktive Schaltflächen.                                                                     |
| Rahmenbreite / -stil                            | `2px` /`solid`       | Abmessungen des Button-Rahmens und CSS-Rahmenstil.                                                        |
| Normale / aktive Rahmenfarbe                    | `#2e2e2e` /`#87ceeb` | Rahmenfarben für inaktive und ausgewählte Spieler.                                                        |
| Randradius                                      | `5px`                | Eckradius.                                                                                                |
| Hintergrundfarbe                                | `#000000`            | Hintergrund der Schaltfläche und generierter Textbildhintergrund.                                         |
| Schaltflächenrand                               | `0px`                | Platz um jeden Spielerbutton herum.                                                                       |
| Einzelbild / Text                               | —                    | Bild- und Etikettenersetzung pro Index.                                                                   |

Der ausgewählte Player wird mit referenzierten Widgets geteilt. Wenn kein benutzerdefiniertes Bild konfiguriert ist, wird der Playername als Textbild dargestellt.

## Favoriten

![Favoriten-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/favorites.png)

Zeigt die vom LMS bereitgestellten Favoriten an und startet einen Favoriten auf dem ausgewählten Player.

| Einstellung                                     | Standard             | Beschreibung                                                                     |
| ----------------------------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| Spieler-Widget (`widgetPlayer` )                | —                    | Verweis auf das Players-Widget, das die Instanz und den aktiven Spieler anzeigt. |
| Index anzeigen (`viewindex` )                   | —                    | VIS 1-Hilfsprogramm zum Zuweisen von Optionen pro Favorit.                       |
| Bearbeitungsmodus-Assistent (`editmodehelper` ) | An                   | Zeigt während der Bearbeitung die bevorzugten Indizes an.                        |
| Bildbreite / -höhe                              | `50` /`50` px        | Größe der einzelnen Favoriten-Buttons.                                           |
| Opazität                                        | `0.5`                | Deckkraft inaktiver Favoriten-Schaltflächen.                                     |
| Rahmenbreite / -stil                            | `2px` /`solid`       | Rahmenabmessungen und CSS-Rahmenstil.                                            |
| Normale / aktive Rahmenfarbe                    | `#2e2e2e` /`#87ceeb` | Rahmenfarben für normale und aktive Favoriten.                                   |
| Randradius                                      | `5px`                | Eckradius.                                                                       |
| Hintergrundfarbe                                | `#000000`            | Schaltflächenhintergrund.                                                        |
| Schaltflächenrand                               | `0px`                | Platz um die Favoriten-Buttons herum.                                            |
| Einzelbild / Text                               | —                    | Bild- und Etikettenersetzung pro Index.                                          |

Der Inhalt bleibt innerhalb des Widgets und ist bei Bedarf vertikal scrollbar. Es wird eine schmale Scrollleiste verwendet.

## Wiedergabetaste

<img src="../widgets/squeezeboxrpc/img/play.svg" width="128px" alt="Play button">

Steuert Wiedergabe, Pause und Stopp für den aktiven Player und spiegelt dessen aktuellen Status wider.

| Einstellung                         | Standard        | Beschreibung                                |
| ----------------------------------- | --------------- | ------------------------------------------- |
| Spieler-Widget                      | —               | Quelle des aktiven Spielers.                |
| Bild anhalten / abspielen / stoppen | Eingebautes SVG | Optionales Bild für jeden Wiedergabestatus. |
| SVG-Füll-/Konturfarbe               | Weiß            | Farben des integrierten Symbols.            |
| SVG-Strichbreite                    | `0.3`           | Strichstärke des integrierten Symbols.      |

Benutzerdefinierte Bilder ersetzen die integrierten SVG-Grafiken für den jeweiligen Bundesstaat.

## Weiter-Schaltfläche

<img src="../widgets/squeezeboxrpc/img/fwd.svg" width="128px" alt="Forward button">

Sendet den LMS-Befehl zum Weiterspringen an den aktiven Spieler.

| Einstellung           | Standard        | Beschreibung                                      |
| --------------------- | --------------- | ------------------------------------------------- |
| Spieler-Widget        | —               | Quelle des aktiven Spielers.                      |
| Weiterleitungsbild    | Eingebautes SVG | Optionales benutzerdefiniertes Schaltflächenbild. |
| SVG-Füll-/Konturfarbe | Weiß            | Farben des integrierten Symbols.                  |
| SVG-Strichbreite      | `0.3`           | Strichstärke des integrierten Symbols.            |

## Rückspultaste

<img src="../widgets/squeezeboxrpc/img/rew.svg" width="128px" alt="Rewind button">

Sendet den LMS-Sprung-zurück-Befehl an den aktiven Spieler.

| Einstellung           | Standard        | Beschreibung                                      |
| --------------------- | --------------- | ------------------------------------------------- |
| Spieler-Widget        | —               | Quelle des aktiven Spielers.                      |
| Bild zurückspulen     | Eingebautes SVG | Optionales benutzerdefiniertes Schaltflächenbild. |
| SVG-Füll-/Konturfarbe | Weiß            | Farben des integrierten Symbols.                  |
| SVG-Strichbreite      | `0.3`           | Strichstärke des integrierten Symbols.            |

## Wiederholungstaste

<img src="../widgets/squeezeboxrpc/img/repeat0.svg" width="128px" alt="Repeat button">

Anzeigen und Änderungen`PlaylistRepeat` für den aktiven Spieler.

| Einstellung                | Standard        | Beschreibung                                                                         |
| -------------------------- | --------------- | ------------------------------------------------------------------------------------ |
| Spieler-Widget             | —               | Quelle des aktiven Spielers.                                                         |
| Bild 0 / 1 / 2 wiederholen | Eingebautes SVG | Optionales Bild für die Zustände „Aus“, „Einmal wiederholen“ und „Alle wiederholen“. |
| SVG-Füll-/Konturfarbe      | Weiß            | Farben des integrierten Symbols.                                                     |
| SVG-Strichbreite           | `0.3`           | Strichstärke des integrierten Symbols.                                               |

Klickzyklus`0 → 1 → 2 → 0` . Zustand`0` zeigt Wiederholung deaktiviert an, Status`1` verwendet das Symbol für eine Wiederholung und den Status`2` Verwendet das aktivierte Wiederholungssymbol. Wenn kein Bild für Zustand 2 konfiguriert ist, wird das benutzerdefinierte Bild für Zustand 0 oder das integrierte Symbol wiederverwendet.

## Zufallswiedergabe-Taste

\<img src="../widgets/squeezeboxrpc/img/shuffle0.svg" width="128px" alt="Shuffle-Button"

>

Anzeigen und Änderungen`PlaylistShuffle` für den aktiven Spieler.

| Einstellung            | Standard        | Beschreibung                                    |
| ---------------------- | --------------- | ----------------------------------------------- |
| Spieler-Widget         | —               | Quelle des aktiven Spielers.                    |
| Bild mischen 0 / 1 / 2 | Eingebautes SVG | Optionale Bilder für die drei LMS-Shuffle-Modi. |
| SVG-Füll-/Konturfarbe  | Weiß            | Farben des integrierten Symbols.                |
| SVG-Strichbreite       | `0.3`           | Strichstärke des integrierten Symbols.          |

Jeder Klick schaltet in den nächsten Zufallsmodus und schreibt den neuen Wert in die entsprechende Tabelle.`PlaylistShuffle` Die

## Lautstärkeregler

![Lautstärkeregler](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/volume.png)

Zeigt die Lautstärke des aktiven Players segmentweise an und ermöglicht dem Benutzer, durch Klicken oder Tippen auf die Leiste eine neue Lautstärke einzustellen.

| Einstellung                | Standard                  | Beschreibung                                              |
| -------------------------- | ------------------------- | --------------------------------------------------------- |
| Spieler-Widget             | —                         | Quelle des aktiven Spielers und`Volume` Zustand.          |
| Berechnung (`calctype` )   | `segstep`                 | Verwendet Segmentschritte oder die genaue Zeigerposition. |
| Segmente                   | `10`                      | Anzahl der angezeigten Segmente.                          |
| Orientierung (`position` ) | `vertical`                | Vertikales oder horizontales Layout.                      |
| Umkehren                   | Aus                       | Kehrt die visuelle Richtung und die Eingabezuordnung um.  |
| Inaktives / aktives Füllen | `#005000` /`#00ff00`      | Segmentfüllfarben.                                        |
| Normaler / aktiver Rand    | VIS-Standardeinstellungen | Segmentrahmenfarben.                                      |
| Rand-/Rahmenbreite         | `1px` /`1px`              | Segmentabstand und Rahmenbreite.                          |

## SyncGroup

![SyncGroup-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/syncgroups.png)

Zeigt alle Spieler an und ermöglicht es dem Benutzer, Spieler zur LMS-Synchronisierungsgruppe des ausgewählten Spielers hinzuzufügen oder daraus zu entfernen.

| Einstellung                    | Standard       | Beschreibung                                                |
| ------------------------------ | -------------- | ----------------------------------------------------------- |
| Spieler-Widget                 | —              | Zeigt den ausgewählten Spieler und die Spielerliste an.     |
| Rahmenbreite / -stil           | `2px` /`solid` | Abmessungen und CSS-Stil des Buttonrahmens.                 |
| Rahmenfarbe ohne Gruppierung   | `#2e2e2e`      | Der Spieler ist nicht synchronisiert.                       |
| Rahmenfarbe der eigenen Gruppe | `#87ceeb`      | Der Spieler gehört zur Gruppe des ausgewählten Spielers.    |
| Rahmenfarbe der anderen Gruppe | `#ff0080`      | Der Spieler gehört einer anderen Synchronisationsgruppe an. |
| Randradius                     | `5px`          | Eckradius.                                                  |
| Hintergrundfarbe               | `#000000`      | Schaltflächenhintergrund.                                   |
| Schaltflächenrand              | `0px`          | Freiraum um die Schaltflächen herum.                        |

Der ausgewählte Player selbst kann nicht umgeschaltet werden. Player-Bilder und -Beschriftungen werden vom referenzierten Players-Widget übernommen.

## Spielzeitleiste

![Spielzeitleiste](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playtime.png)

Zeigt die verstrichene Zeit im Verhältnis zur Trackdauer an und ermöglicht das Suchen durch Anklicken der Leiste.

| Einstellung          | Standard       | Beschreibung                                              |
| -------------------- | -------------- | --------------------------------------------------------- |
| Spieler-Widget       | —              | Lieferungen`Time` ,`Duration` und der Suchbefehlszustand. |
| Hauptleistenfarbe    | `#909090`      | Hintergrundinformationen für die gesamte Dauer.           |
| Spielzeit Farbe      | `#00ff00`      | Füllwert der verstrichenen Zeit.                          |
| Rahmenbreite / -stil | `2px` /`solid` | Äußere Grenze.                                            |
| Rahmenfarbe          | `#ffffff`      | Farbe des äußeren Randes.                                 |
| Randradius           | `2px`          | Eckradius.                                                |

Bei Streams ohne endliche positive Dauer bleibt die Fortschrittsanzeige leer und die Suchfunktion ist deaktiviert.

## Zeichenkette

![String-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/string.png)

Zeigt den Status des aktiven Players als Zeichenkette an, z. B. Titel, Interpret oder Album.

| Einstellung      | Standard | Beschreibung                        |
| ---------------- | -------- | ----------------------------------- |
| Spieler-Widget   | —        | Quelle des aktiven Spielers.        |
| Spielerattribute | —        | Anzuzeigender Spielerstatus.        |
| HTML-/Testfeld   | —        | VIS 1 Text-/HTML-Formatierungsfeld. |

## Nummer

![Zahlen-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/number.png)

Zeigt den numerischen Spielerstatus mit optionaler Formatierung an.

| Einstellung                  | Standard    | Beschreibung                                                                     |
| ---------------------------- | ----------- | -------------------------------------------------------------------------------- |
| Spieler-Widget               | —           | Quelle des aktiven Spielers.                                                     |
| Spielerattribute             | —           | Numerischer Spielerstatus zur Anzeige.                                           |
| HTML-Voranstellen / Anhängen | —           | Text oder Auszeichnungssprache vor und nach dem Wert.                            |
| Dezimalstellen (`digits` )   | Automatisch | Bei entsprechender Konfiguration ist die Anzahl der Nachkommastellen festgelegt. |
| Dezimalkomma                 | An          | Verwendet ein Komma als Dezimaltrennzeichen.                                     |
| Tausendertrennzeichen        | Aus         | Gruppiert Tausende im formatierten Wert.                                         |
| HTML-/Testfeld               | —           | VIS 1 Formatierungsfeld.                                                         |

## Datum/Uhrzeit

![Datum/Uhrzeit-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/datetime.png)

Formatiert einen numerischen Spielerstatus als Dauer- oder Datums-/Zeitwert.

| Einstellung                  | Standard   | Beschreibung                                                                                                                |
| ---------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| Spieler-Widget               | —          | Quelle des aktiven Spielers.                                                                                                |
| Spielerattribute             | —          | Numerischer Zustand zum Formatieren.                                                                                        |
| HTML-Voranstellen / Anhängen | —          | Text oder Auszeichnungssprache vor und nach dem Ergebnis.                                                                   |
| Format                       | `hh:mm:ss` | Datums-/Zeitformat; Stunden, Minuten und Sekunden werden standardmäßig angezeigt.                                           |
| Faktor                       | `1000`     | Der Multiplikator wird vor der Formatierung angewendet; dies ist nützlich für die Umrechnung von Sekunden in Millisekunden. |
| HTML-/Testfeld               | —          | VIS 1 Formatierungsfeld.                                                                                                    |

## Bild

![Bild-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/image.png)

Zeigt eine Bild-URL des aktiven Players an, meistens`ArtworkUrl` Die

| Einstellung                  | Standard | Beschreibung                                                 |
| ---------------------------- | -------- | ------------------------------------------------------------ |
| Spieler-Widget               | —        | Quelle des aktiven Spielers.                                 |
| Spielerattribute             | —        | Anzuzeigender Spielerstatus (als URL-Wert).                  |
| Strecken                     | Aus      | Streckt das Bild bis an die Grenzen des Widgets.             |
| HTML-Voranstellen / Anhängen | —        | Text, der vor dem Rendern um die URL herum hinzugefügt wird. |
| HTML-/Testfeld               | —        | VIS 1 Formatierungsfeld.                                     |

Das Widget abonniert Statusaktualisierungen und lädt außerdem den Anfangswert asynchron.

## Wiedergabeliste

![Playlist-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlist.png)

Öffnet gespeicherte LMS-Playlists und ermöglicht dem Benutzer, eine ausgewählte Playlist zu starten oder hinzuzufügen.

| Einstellung    | Standard | Beschreibung                                         |
| -------------- | -------- | ---------------------------------------------------- |
| Spieler-Widget | —        | Stellt die aktive Player- und Adapterinstanz bereit. |

Die Liste wird bei Bedarf vom LMS geladen. Dieses Widget durchsucht gespeicherte Wiedergabelisten; verwenden Sie PlaylistDetail für die aktive Wiedergabeliste.

## PlaylistDetail

![PlaylistDetail-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlistdetail.png)

Zeigt alle Titel in der aktuellen Wiedergabeliste des aktiven Players mit Coverbild, Metadaten, Dauer und Aktionen an.

| Einstellung                   | Standard                  | Beschreibung                                                       |
| ----------------------------- | ------------------------- | ------------------------------------------------------------------ |
| Spieler-Widget                | —                         | Lieferungen`Playlist` ,`PlaylistCurrentIndex` und Aktionsbefehle.  |
| Zeilenhintergrund             | `#f5f7fa`                 | Normaler Zeilenhintergrund.                                        |
| Aktiver/Hover-Hintergrund     | `#dbeafe`                 | Hintergrund der aktuellen Spur und der darüber schwebenden Zeilen. |
| Rahmenfarbe / -breite / -stil | `#cbd5e1` /`1px` /`solid` | Darstellung der Zeilenränder.                                      |
| Zeilenabstand                 | `4px`                     | Vertikaler Abstand zwischen den Gleisen.                           |
| Miniaturansicht anzeigen      | An                        | Zeigt Kunstwerke von`ArtworkUrl` Die                               |
| Inhaltsverzeichnis anzeigen   | An                        | Zeigt eine Tracknummer, die mit Eins beginnt, vor dem Titel an.    |

Der aktuelle Titel ist hervorgehoben. Mit „Wiedergabe“ wird der ausgewählte Titel aus der Wiedergabeliste gestartet; mit „Löschen“ wird er nur aus der aktuellen Wiedergabeliste entfernt, nicht aus einer gespeicherten Wiedergabeliste. Die Scrollposition bleibt nach Aktionen erhalten.

## Browser

<img src="../widgets/squeezeboxrpc/img/browser.svg" width="128px" alt="Browser widget">

Navigiert durch die Menühierarchie des Lernmanagementsystems und stellt die vom Lernmanagementsystem angebotenen Aktionen „Weiter“, „Wiedergabe“ und „Hinzufügen“ bereit.

| Einstellung           | Standard | Beschreibung                                                                                      |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| Spieler-Widget        | —        | Liefert Adapterinstanz und aktiven Spieler.                                                       |
| Debuggen              | Aus      | Schreibt Browserdiagnosedaten in die Browserkonsole.                                              |
| Debug-Abrufergebnisse | Aus      | Außerdem werden die Rohdaten der LMS-Antworten protokolliert, wenn der Debug-Modus aktiviert ist. |

Die Breadcrumb-Schaltfläche führt zurück zur vorherigen Menüebene. Die verfügbaren Aktionen hängen vom jeweiligen LMS-Menüpunkt und den installierten LMS-Plugins ab.