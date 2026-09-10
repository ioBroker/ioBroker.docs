---
---
![Logo](../../admin/octoprint.png)

# ioBroker.octoprint

**Getestet mit [OctoPrint](https://github.com/OctoPrint/OctoPrint/releases) 1.10.3**

## Features

### Informationen

- Versions-Informationen
- Drucker-Informationen (wenn ``operational``)
- Infos zum Druckauftrag (wenn ``printing``)
- Datei-Informationen (wenn nicht ``printing``)

### Werkzeuge

- Tool-Temperatur ändern (wenn ``operational``)
- Bed-Temperatur ändern (wenn ``operational``)
- Extrude / Retract (wenn ``operational``)

### Kommandos

- Drucker: Connect, disconnect and home
- Druckauftrag: Start, Pause, Resume, Cancel, Restart
- SD-Karte: Init, Refresh, Release
- Eigene Drucker-Befehle
- System-Kommandos
- Jog X, Y and Z Achse
- Datei auswählen und drucken

### Unterstützte Plugins

- [Display Layer Progress](https://github.com/OllisGit/OctoPrint-DisplayLayerProgress) - getestet mit Version 1.28.0 (erfordert **Adapter-Version 2.1.0** oder neuer)
- [Slicer Thumbnails](https://github.com/jneilliii/OctoPrint-PrusaSlicerThumbnails) - getestet mit Version 1.0.0 (erfordert **Adapter-Version 2.2.0** oder neuer)

## Wichtig!

Starte deine OctoPrint-Instanz (oder irgend eine andere Instsanz) NICHT mit dem folgenden Code neu:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Da der `API-Key` seit Adapter-Version 1.1.0 als geschütztes Attribut hinterlegt ist, würde dadurch die Konfiguration des API-Key verloren gehen. Der Grund dafür ist, dass `getObject` keine geschützen Attribute ausliefert (sodass der API-Key nicht im zurückgelieferten Objekt enthalten ist). Wird das Objekt dann erneut gespeichert, geht das Attribut im Objekt verloren.

Bitte nutzt den Datenpunkt `system.adapter.octoprint.0.alive` um die Instanz zu starten oder zu stoppen.