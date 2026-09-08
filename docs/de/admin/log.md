---
title:       "Protokolle"
lastChanged: "07.09.2026"
---

# Reiter Protokolle

Hier laufen die Meldungen des Systems auf. Die neueste steht oben. Wenn etwas
nicht funktioniert, ist das die erste Stelle, an der man nachsieht.

?> Erscheint der Menüpunkt **Protokolle** rot, gibt es einen Fehler. Die Zahl
daneben nennt die Anzahl.

## Die Werkzeugleiste

<img src="media/admin_protokolle_leiste.png" alt="Die Werkzeugleiste des Reiters Protokolle" width="900" />

| Nr. | Funktion |
| --- | -------- |
| 1 | **Log aktualisieren.** |
| 2 | **Ausgabe pausieren.** Statt des Symbols erscheint dann die Zahl der neuen, noch nicht angezeigten Meldungen. Praktisch, wenn man eine bestimmte Zeile in Ruhe lesen will. |
| 3 | **Log löschen**: leert nur die Anzeige im Browser. |
| 4 | **Von der Disk dauerhaft löschen**: löscht die Protokolldatei auf dem Host. |
| 5 | **Prozess-ID ein-/ausblenden.** |
| 6 | **Farben ein-/ausblenden**: hebt Fehler rot und Warnungen gelb hervor. |
| 7 | **Ausgaberichtung umkehren**: neueste Meldung oben oder unten. |
| 8 | **Nur Fehler anzeigen.** Die Zahl daneben nennt die vorhandenen Fehler. |
| 9 | **Fehler und Warnungen anzeigen.** |
| 10 | **Log herunterladen**: lädt die vollständige Tagesdatei aus `/opt/iobroker/log`. |
| 11 | Die **Größe** der aktuellen Protokolldatei. |

Rechts daneben steht der Host. In einem
[Multihost-System](https://www.iobroker.net/#de/documentation/config/multihost.md)
wird dort umgeschaltet. Angezeigt werden immer nur die Meldungen des
ausgewählten Hosts.

## Die Liste

<img src="media/admin_protokolle_liste.png" alt="Die Protokollliste mit Quelle, Zeit, Stufe und Nachricht" width="900" />

Die Spalten sind **Quelle** (die Instanz oder der Host), **Zeit**, die
**Log-Stufe** und die **Nachricht**. Über die Felder in der Kopfzeile lässt sich
filtern: nach Quelle, nach Mindest-Log-Stufe und nach einem Text in der
Nachricht.

Die Log-Stufen von der ausführlichsten zur knappsten:

| Stufe | Wofür |
| ----- | ----- |
| `silly` (im Dialog **Alles**) | Wirklich jede Meldung. Nur, wenn `debug` nicht ausreicht. |
| `debug` | Auch interne Abläufe. Für die Fehlersuche, danach wieder zurückstellen. |
| `info` | Der Normalfall: Start, Stopp, Verbindungen. |
| `warn` | Etwas ist ungewöhnlich, läuft aber weiter. |
| `error` | Etwas hat nicht funktioniert. |

Die Stufe wird je Instanz im Reiter
[Instanzen](https://www.iobroker.net/#de/documentation/admin/instances.md)
eingestellt, die Vorgabe für neue Instanzen in den
[Systemeinstellungen](https://www.iobroker.net/#de/documentation/admin/settings.md).

!> In der Liste werden lange Zeilen abgeschnitten. Wer einer Meldung wirklich
auf den Grund gehen will, lädt die Protokolldatei herunter und sieht dort nach.
Oft steht die eigentliche Ursache in den Zeilen davor.

## Wenn im Protokoll ein Fehler steht

Zwei Dinge helfen fast immer weiter:

1. **Die erste Fehlermeldung suchen, nicht die letzte.** Ein Fehler zieht oft
   Folgefehler nach sich; interessant ist der Anfang der Kette.
2. **Die Log-Stufe der betroffenen Instanz auf `debug` stellen**, die Instanz neu
   starten und die Meldungen noch einmal ansehen.

Führt das nicht weiter, hilft das
[Forum](https://forum.iobroker.net/). Dorthin gehört der Auszug aus der
heruntergeladenen Protokolldatei, nicht ein Bildschirmfoto der Liste.
