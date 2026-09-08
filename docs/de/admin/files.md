---
title:       "Dateien"
lastChanged: "07.09.2026"
---

# Reiter Dateien

ioBroker verwaltet neben Objekten und Zuständen auch Dateien: Symbole, Bilder,
Konfigurationen der Adapter, die Seiten von vis. Dieser Reiter ist der
Dateimanager dafür.

<img src="media/admin_dateien.png" alt="Der Reiter Dateien mit den Verzeichnissen der Adapter" width="900" />

Jeder Adapter bekommt ein eigenes Verzeichnis, meist `<adapter>.admin` für die
Dateien seiner Konfigurationsoberfläche. Ganz oben steht **Benutzerdaten**
(`0_userdata.0`). Dorthin gehören eigene Dateien, etwa Bilder für eine
Visualisierung.

Rechts neben jedem Eintrag stehen die Zahl der enthaltenen Dateien und die
Zugriffsrechte.

## Die Werkzeugleiste

<img src="media/admin_dateien_leiste.png" alt="Die Werkzeugleiste des Dateimanagers" width="380" />

| Nr. | Funktion |
| --- | -------- |
| 1 | **Ansicht umschalten** zwischen Liste und Kacheln. |
| 2 | **Leere Verzeichnisse ausblenden.** |
| 3 | **Neu laden.** |
| 4 | **Neues Verzeichnis anlegen.** |
| 5 | **Datei hochladen**: auch per Ziehen und Ablegen. |
| 6 | **Hintergrund der Vorschau umschalten**, damit sich Bilder mit durchsichtigem Hintergrund beurteilen lassen. |

!> Die Verzeichnisse der Adapter gehören dem jeweiligen Adapter. Wird er
aktualisiert, überschreibt er seine Dateien. Eigene Dateien deshalb unter
**Benutzerdaten** ablegen. Dort bleiben sie erhalten.

?> Dateien lassen sich auch aus einem Skript heraus lesen und schreiben. Wie das
geht, steht unter
[Dateispeicher](/docs/dev/filestorage.md).
