---
chapters: {"pages":{"en/adapterref/iobroker.squeezeboxrpc/README.md":{"title":{"en":"ioBroker Logitech/Lyrion Squeezebox Adapter over JSON/RPC-Protocol"},"content":"en/adapterref/iobroker.squeezeboxrpc/README.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 1"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 2"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md
title: SqueezeboxRPC-Widgets für VIS 2
hash: ctIHnXuldxn5II6axb49lf4DcA2+IeAglhHbWBZFahk=
---
# SqueezeboxRPC-Widgets für VIS 2

Dieses Dokument beschreibt alle mit dem Adapter ausgelieferten VIS 2-Widgets. Beginnen Sie mit dem **Players** -Widget. Alle anderen Widgets referenzieren dieses Widget und erhalten die aktive Adapterinstanz und den Player über den gemeinsamen Auswahlmechanismus, einschließlich Referenzen zwischen VIS-Ansichten.

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

Wählt den aktiven LMS-Player aus und veröffentlicht die Auswahl in jedem referenzierten SqueezeboxRPC-Widget.

| Einstellung                          | Standard             | Beschreibung                                                                                                        |
| ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| SqueezeboxRPC-Instanz                | —                    | Adapterinstanz, deren Spieler geladen sind.                                                                         |
| Format                               | Tasten               | Zeigt Spielertasten oder ein kompaktes Auswahlfeld an.                                                              |
| Spielerkonfiguration                 | Entdeckte Spieler    | Ordnet die Spielerreihenfolge neu an, aktiviert oder deaktiviert sie und weist jedem Spieler Präsentationsdaten zu. |
| CamelCase-Hülle                      | An                   | Ermöglicht das Umwickeln von CamelCase-Etiketten.                                                                   |
| Bildbreite / -höhe                   | `50` /`50` px        | Größe der Spielertasten.                                                                                            |
| Opazität                             | `0.5`                | Deckkraft der inaktiven Schaltfläche.                                                                               |
| Rahmenbreite / -stil                 | `2px` /`solid`       | Darstellung des Schaltflächenrahmens.                                                                               |
| Normale / aktive Rahmenfarbe         | `#2e2e2e` /`#87ceeb` | Auswahlhinweis.                                                                                                     |
| Randradius                           | `5px`                | Eckradius.                                                                                                          |
| Hintergrund                          | `#000000`            | Schaltfläche und generierter Text-Bild-Hintergrund.                                                                 |
| Schaltflächenrand                    | `0px`                | Freiraum um die Spielerbuttons.                                                                                     |
| Bild/Text der einzelnen Schaltfläche | —                    | Spielerspezifisches Ersatzbild und -label.                                                                          |

Die Konfiguration bleibt erhalten, wenn Spieler vorübergehend verschwinden; neu entdeckte Spieler werden hinzugefügt. Die Auswahl wird über einen browserweiten Bus veröffentlicht, sodass referenzierte Widgets auch in anderen Ansichten vorhanden sein können.

## Favoriten

![Favoriten-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/favorites.png)

Zeigt die LMS-Favoriten an und startet einen Favoriten auf dem ausgewählten Player.

| Einstellung                     | Standard             | Beschreibung                                                                                   |
| ------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| Spieler-Widget-Referenz         | —                    | Spieler-Widget, das die Instanz und den aktiven Spieler anzeigt.                               |
| Bevorzugte Konfiguration        | Entdeckte Favoriten  | Ordnet Favoriten neu an, blendet sie aus und konfiguriert sie mithilfe stabiler Favoriten-IDs. |
| Indexhilfe im Bearbeitungsmodus | Aus                  | Im Editor werden nur nullbasierte Indizes angezeigt.                                           |
| CamelCase-Hülle                 | An                   | Ermöglicht den Zeilenumbruch generierter Labels.                                               |
| Bildbreite / -höhe              | `50` /`50` px        | Bevorzugte Knopfgröße.                                                                         |
| Opazität                        | `0.5`                | Deckkraft der inaktiven Schaltfläche.                                                          |
| Rahmenbreite / -stil            | `2px` /`solid`       | Darstellung des Schaltflächenrahmens.                                                          |
| Normale / aktive Rahmenfarbe    | `#2e2e2e` /`#87ceeb` | Normale und aktive Favoritanzeige.                                                             |
| Randradius                      | `5px`                | Eckradius.                                                                                     |
| Hintergrund                     | `#000000`            | Schaltflächenhintergrund.                                                                      |
| Schaltflächenrand               | `0px`                | Freiraum um die Schaltflächen herum.                                                           |
| Lieblingsbild / Lieblingstext   | —                    | Pro bevorzugtem Ersatzbild und Etikett.                                                        |

Überschüssiger Inhalt bleibt innerhalb des Widgets und verwendet eine schmale Scrollleiste. Fehlgeschlagene Bilder werden durch generierte Textbilder ersetzt.

## Wiedergabetaste

<img src="../widgets/squeezeboxrpc/img/play.svg" width="128px" alt="Play button">

Steuert und zeigt Wiedergabe, Pause und Stopp für den ausgewählten Player an.

| Einstellung                         | Standard        | Beschreibung                                         |
| ----------------------------------- | --------------- | ---------------------------------------------------- |
| Spieler-Widget-Referenz             | —               | Quelle des ausgewählten Spielers.                    |
| Bild anhalten / abspielen / stoppen | Eingebautes SVG | Optionales individuelles Bild für jeden Bundesstaat. |
| SVG-Füll-/Konturfarbe               | `#ffffff`       | Integrierte Symbolfarben.                            |
| SVG-Strichbreite                    | `0.3`           | Integrierte Strichstärke der Symbole.                |

## Weiter-Schaltfläche

<img src="../widgets/squeezeboxrpc/img/fwd.svg" width="128px" alt="Forward button">

Sendet den LMS-Sprungbefehl an den ausgewählten Spieler.

| Einstellung             | Standard        | Beschreibung                           |
| ----------------------- | --------------- | -------------------------------------- |
| Spieler-Widget-Referenz | —               | Quelle des ausgewählten Spielers.      |
| Weiterleitungsbild      | Eingebautes SVG | Optionales benutzerdefiniertes Symbol. |
| SVG-Füll-/Konturfarbe   | `#ffffff`       | Integrierte Symbolfarben.              |
| SVG-Strichbreite        | `0.3`           | Integrierte Strichstärke der Symbole.  |

## Rückspultaste

<img src="../widgets/squeezeboxrpc/img/rew.svg" width="128px" alt="Rewind button">

Sendet den LMS-Sprung-zurück-Befehl an den ausgewählten Spieler.

| Einstellung             | Standard        | Beschreibung                           |
| ----------------------- | --------------- | -------------------------------------- |
| Spieler-Widget-Referenz | —               | Quelle des ausgewählten Spielers.      |
| Bild zurückspulen       | Eingebautes SVG | Optionales benutzerdefiniertes Symbol. |
| SVG-Füll-/Konturfarbe   | `#ffffff`       | Integrierte Symbolfarben.              |
| SVG-Strichbreite        | `0.3`           | Integrierte Strichstärke der Symbole.  |

## Wiederholungstaste

<img src="../widgets/squeezeboxrpc/img/repeat0.svg" width="128px" alt="Repeat button">

Zeigt die Daten des ausgewählten Spielers an und ändert sie.`PlaylistRepeat` Zustand.

| Einstellung                                       | Standard        | Beschreibung                                              |
| ------------------------------------------------- | --------------- | --------------------------------------------------------- |
| Spieler-Widget-Referenz                           | —               | Quelle des ausgewählten Spielers.                         |
| Bild im Modus „Aus“ / Modus „Eins“ / Modus „Zwei“ | Eingebautes SVG | Optionales Bild für die Wiederholungszustände 0, 1 und 2. |
| SVG-Füll-/Konturfarbe                             | `#ffffff`       | Integrierte Symbolfarben.                                 |
| SVG-Strichbreite                                  | `0.3`           | Integrierte Strichstärke der Symbole.                     |

Klickzyklus`0 → 1 → 2 → 0` Zustand 0 ist deaktiviert, Zustand 1 zeigt die Wiederholung „Einmal“ an und Zustand 2 zeigt die aktivierte Wiederholung „Alle“. Falls kein Bild für Zustand 2 vorhanden ist, wird das benutzerdefinierte Bild für Zustand 0 oder das integrierte Wiederholungssymbol wiederverwendet.

## Zufallswiedergabe-Taste

\<img src="../widgets/squeezeboxrpc/img/shuffle0.svg" width="128px" alt="Shuffle-Button"

>

Zeigt die Daten des ausgewählten Spielers an und ändert sie.`PlaylistShuffle` Zustand.

| Einstellung                                       | Standard        | Beschreibung                                         |
| ------------------------------------------------- | --------------- | ---------------------------------------------------- |
| Spieler-Widget-Referenz                           | —               | Quelle des ausgewählten Spielers.                    |
| Bild im Modus „Aus“ / Modus „Eins“ / Modus „Zwei“ | Eingebautes SVG | Optionales Bild für die Shuffle-Zustände 0, 1 und 2. |
| SVG-Füll-/Konturfarbe                             | `#ffffff`       | Integrierte Symbolfarben.                            |
| SVG-Strichbreite                                  | `0.3`           | Integrierte Strichstärke der Symbole.                |

## Lautstärkeregler

![Lautstärkeregler](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/volume.png)

Die Lautstärke wird segmentweise angezeigt und ändert sich, wenn der Benutzer auf den Balken klickt oder tippt.

| Einstellung                | Standard             | Beschreibung                                      |
| -------------------------- | -------------------- | ------------------------------------------------- |
| Spieler-Widget-Referenz    | —                    | Versorgt den ausgewählten Spieler`Volume` Die     |
| Berechnung                 | Segmentschritt       | Segment-Schritt- oder Positions-Eingabezuordnung. |
| Segmente                   | `10`                 | Anzahl der Segmente, von 2 bis 100.               |
| Orientierung               | Vertikal             | Vertikales oder horizontales Layout.              |
| Umkehren                   | Aus                  | Kehrt Richtung und Eingabezuordnung um.           |
| Inaktives / aktives Füllen | `#005000` /`#00ff00` | Segmentfarben.                                    |
| Normaler / aktiver Rand    | `#909090` /`#87ceeb` | Segmentrahmenfarben.                              |
| Rand-/Rahmenbreite         | `1px` /`1px`         | Segmentabstand und Rahmenbreite.                  |

## SyncGroup

![SyncGroup-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/syncgroups.png)

Verwaltet die LMS-Synchronisierungsgruppe des ausgewählten Spielers.

| Einstellung               | Standard       | Beschreibung                                             |
| ------------------------- | -------------- | -------------------------------------------------------- |
| Spieler-Widget-Referenz   | —              | Liefert Spielerliste, Aussehen und ausgewählten Spieler. |
| Rahmenbreite / -stil      | `2px` /`solid` | Darstellung des Schaltflächenrahmens.                    |
| Keine-Gruppen-Grenze      | `#2e2e2e`      | Der Spieler ist nicht synchronisiert.                    |
| Eigengruppengrenze        | `#87ceeb`      | Der Spieler gehört zur Gruppe des ausgewählten Spielers. |
| Grenze der anderen Gruppe | `#ff0080`      | Der Spieler gehört einer anderen Gruppe an.              |
| Randradius                | `5px`          | Eckradius.                                               |
| Hintergrund               | `#000000`      | Schaltflächenhintergrund.                                |
| Schaltflächenrand         | `0px`          | Freiraum um die Schaltflächen herum.                     |

Überlappende LMS-Beziehungen werden zu vollständigen Gruppen zusammengeführt. Durch Klicken auf einen Player wird dieser synchronisiert oder die Synchronisierung aufgehoben; der ausgewählte Player selbst wird deaktiviert.

## Spielzeitleiste

![Spielzeitleiste](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playtime.png)

Zeigt die verstrichene Zeit im Verhältnis zur Dauer an und sucht, wenn der Benutzer auf eine Position klickt oder tippt.

| Einstellung             | Standard       | Beschreibung                                           |
| ----------------------- | -------------- | ------------------------------------------------------ |
| Spieler-Widget-Referenz | —              | Lieferungen`Time` ,`Duration` und das Ziel anvisieren. |
| Hauptleistenfarbe       | `#909090`      | Hintergrund in voller Länge.                           |
| Spielzeit Farbe         | `#00ff00`      | Füllwert der verstrichenen Zeit.                       |
| Rahmenbreite / -stil    | `2px` /`solid` | Äußere Grenze.                                         |
| Rahmenfarbe             | `#ffffff`      | Farbe des äußeren Randes.                              |
| Randradius              | `2px`          | Eckradius.                                             |

Bei Datenströmen ohne endliche positive Dauer bleibt die Füllung leer und der Balken bewegt sich nicht.

## Zeichenkette

![String-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/string.png)

Zeigt einen Zustand als Zeichenkette an, z. B. Titel, Künstler oder Album.

| Einstellung                  | Standard | Beschreibung                                      |
| ---------------------------- | -------- | ------------------------------------------------- |
| Spieler-Widget-Referenz      | —        | Quelle des ausgewählten Spielers.                 |
| Spielerattribute             | —        | Anzuzeigender Status.                             |
| HTML-Voranstellen / Anhängen | —        | Text oder Auszeichnungssprache um den Wert herum. |

## Nummer

![Zahlen-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/number.png)

Zeigt den numerischen Status des ausgewählten Spielers an und formatiert ihn.

| Einstellung                  | Standard    | Beschreibung                                      |
| ---------------------------- | ----------- | ------------------------------------------------- |
| Spieler-Widget-Referenz      | —           | Quelle des ausgewählten Spielers.                 |
| Spielerattribute             | —           | Numerischer Status zur Anzeige.                   |
| HTML-Voranstellen / Anhängen | —           | Text oder Auszeichnungssprache um den Wert herum. |
| Dezimalstellen               | Automatisch | Feste Nachkommastellen bei Einstellung.           |
| Dezimalkomma                 | An          | Verwendet das Komma als Dezimaltrennzeichen.      |
| Tausendertrennzeichen        | Aus         | Gruppen zu Tausenden.                             |

## Datum/Uhrzeit

![Datum/Uhrzeit-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/datetime.png)

Formatiert einen numerischen Spielerwert als Datum/Uhrzeit- oder Dauertext.

| Einstellung                  | Standard   | Beschreibung                                                                                    |
| ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| Spieler-Widget-Referenz      | —          | Quelle des ausgewählten Spielers.                                                               |
| Spielerattribute             | —          | Numerischer Zustand zum Formatieren.                                                            |
| HTML-Voranstellen / Anhängen | —          | Text oder Auszeichnungssprache um den formatierten Wert herum.                                  |
| Format                       | `hh:mm:ss` | Formatierungsmuster.                                                                            |
| Faktor                       | `1000`     | Multiplikator vor der Formatierung, normalerweise zur Umrechnung von Sekunden in Millisekunden. |

## Bild

![Bild-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/image.png)

Zeigt eine Bild-URL an, üblicherweise das Coverbild des aktiven Spielers.

| Einstellung                  | Standard | Beschreibung                                    |
| ---------------------------- | -------- | ----------------------------------------------- |
| Spieler-Widget-Referenz      | —        | Quelle des ausgewählten Spielers.               |
| Spielerattribute             | —        | URL-Wert-Zustand, normalerweise`ArtworkUrl` Die |
| Strecken                     | Aus      | Streckt das Bild bis an die Widget-Grenzen.     |
| HTML-Voranstellen / Anhängen | —        | Text um die URL herum hinzugefügt.              |

Das Laden von Bildern wird wiederholt, wenn sich der Abonnementstatus ändert; fehlgeschlagene externe URLs unterliegen weiterhin den Netzwerk- und Mixed-Content-Regeln des Browsers.

## Wiedergabeliste

![Playlist-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlist.png)

Durchsucht gespeicherte LMS-Playlists und bietet Start-/Hinzufügen-Aktionen für den ausgewählten Player an.

| Einstellung             | Standard | Beschreibung                              |
| ----------------------- | -------- | ----------------------------------------- |
| Spieler-Widget-Referenz | —        | Liefert Instanz und ausgewählten Spieler. |

Gespeicherte Wiedergabelisteneinträge werden vom LMS abgerufen. Dies ist unabhängig von der aktiven Warteschlange, die von PlaylistDetail angezeigt wird.

## PlaylistDetail

![PlaylistDetail-Widget](../../../../en/adapterref/iobroker.squeezeboxrpc/widgets/squeezeboxrpc/img/playlistdetail.png)

Zeigt die aktuelle Warteschlange des ausgewählten Spielers mit Coverbild, Metadaten, Dauer und Aktionen an.

| Einstellung                   | Standard                  | Beschreibung                                                                  |
| ----------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| Spieler-Widget-Referenz       | —                         | Lieferungen`Playlist` ,`PlaylistCurrentIndex` und Befehle.                    |
| Zeilenhintergrund             | `#f5f7fa`                 | Normaler Zeilenhintergrund.                                                   |
| Aktiver/Hover-Hintergrund     | `#dbeafe`                 | Hintergrund der aktuellen und der Zeile, über die sich der Mauszeiger bewegt. |
| Rahmenfarbe / -breite / -stil | `#cbd5e1` /`1px` /`solid` | Darstellung der Zeilenränder.                                                 |
| Zeilenabstand                 | `4px`                     | Vertikaler Abstand zwischen den Zeilen.                                       |
| Miniaturansicht anzeigen      | An                        | Shows`ArtworkUrl` wenn vorhanden.                                             |
| Inhaltsverzeichnis anzeigen   | An                        | Zeigt einsbasierte Trackindizes an.                                           |

Die Wiedergabe springt direkt zum Titel. Die Löschtaste entfernt ihn nur aus der aktiven Wiedergabeliste und bearbeitet keine gespeicherten Wiedergabelisten. Längere Texte werden mit Auslassungspunkten abgeschnitten, überschüssiger Text ist vertikal scrollbar.

## Browser

<img src="../widgets/squeezeboxrpc/img/browser.svg" width="128px" alt="Browser widget">

Navigiert durch Meine Musik, Radio, Favoriten, Apps und andere Menüpunkte, die vom LMS bereitgestellt werden.

| Einstellung             | Standard | Beschreibung                                                                    |
| ----------------------- | -------- | ------------------------------------------------------------------------------- |
| Spieler-Widget-Referenz | —        | Liefert Instanz und ausgewählten Spieler.                                       |
| Debuggen                | Aus      | Protokolliert Browserdiagnosedaten.                                             |
| Debug-Abrufergebnisse   | Aus      | Protokolliert die Rohantworten der Befehle, wenn der Debug-Modus aktiviert ist. |

Die Breadcrumb-Navigation navigiert nach oben. Die Schaltflächen „Abspielen“ und „Hinzufügen“ werden erst angezeigt, wenn das LMS die entsprechende Aktion bereitstellt.