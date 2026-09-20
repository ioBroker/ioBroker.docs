---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

### ioBroker-Adapter für MotionEye

[zurück zur Dokumentations-Übersicht](/#/adapters/motioneye)

## Hilfe & FAQ

Typische Fragen und Log-Meldungen aus dem Alpha-Test.

---

### Log zeigt `unauthorized`

MotionEye ist erreichbar, aber Login oder API-Signatur schlägt fehl.

**Prüfen:**

1. Instanz-Einstellungen öffnen, **MotionEye-Benutzer** und **Passwort** neu eintragen, **Speichern**, Instanz neu starten.
2. Seit Adapter-Update 0.2.1 wird das Passwort verschlüsselt gespeichert — ein alter Klartext-Wert funktioniert ggf. erst nach erneutem Speichern wieder.
3. Hat MotionEye **kein Passwort**, Feld leer lassen (keine Leerzeichen).
4. Benutzername exakt wie in MotionEye (oft `admin`).
5. **MotionEye Config-API-Port** ist **8765** — nicht der Port der Weboberfläche hinter einem Reverse-Proxy ohne Weiterleitung der API.

**Erfolg:** `_info.connection` = `true`, keine `unauthorized`-Warnungen im Log.

#### Web-Login klappt, Adapter zeigt trotzdem `unauthorized`

Wenn du dich im Browser anmelden kannst, der Adapter aber `GET /config/list → HTTP 403: unauthorized` meldet, liegt es fast nie an „falschem Host“, sondern an **unterschiedlichen Zugangsdaten** oder **falscher API-Adresse**:

1. **Gleicher Port wie der Adapter:** Web-Login muss unter `http://<motionHost>:8765/` funktionieren — nicht nur unter `:80`, `:443` oder einer anderen URL.
2. **Gleicher Benutzer:** Der Wert unter **MotionEye-Benutzer** muss exakt dem Admin-User in MotionEye entsprechen (Groß/Klein, oft `admin`).
3. **Passwort in ioBroker:** Feld komplett leeren → **Speichern** → Instanz neu starten → Passwort **von Hand** tippen (nicht kopieren) → **Speichern** → neu starten. Hilft bei kaputter Verschlüsselung oder unsichtbaren Leerzeichen.
4. **Zwei verschiedene Server:** ioBroker und MotionEye auf getrennten VMs/LXCs (z. B. Proxmox) ist normal — SSH-Tests und `node` gehören auf den **ioBroker-Host**, nicht auf den MotionEye-Container.
5. **MotionEye 0.44 oder neuer:** Ab MotionEye **0.44** nutzt die API **Session-Login** statt URL-Signatur. Dafür brauchst du Adapter **0.5.0** oder neuer — mit **0.4.x** bleibt `unauthorized`, obwohl der Web-Login klappt. Siehe Abschnitt [MotionEye 0.44+](#motioneye-044-adapter-050).

---

### MotionEye 0.44+ (Adapter 0.5.0+)

Ab **MotionEye 0.44** hat sich die API-Authentifizierung geändert: Statt `_username` / `_signature` in der URL meldet sich der Client per **`POST /login`** an und nutzt ein Session-Cookie ([Release Notes](https://github.com/motioneye-project/motioneye/releases/tag/0.44.0)).

| MotionEye | Adapter | Ergebnis |
|-----------|---------|----------|
| **0.43.x** | 0.4.x oder **0.5.0+** | funktioniert (URL-Signatur) |
| **0.44+** | 0.4.x | `unauthorized` — auch wenn Web-Login auf Port 8765 klappt |
| **0.44+** | **0.5.0+** | funktioniert (Session-Login, automatischer Fallback) |
| **0.43.x** | **0.5.0+** | funktioniert weiterhin (Rückwärtskompatibilität) |

**Version prüfen:** MotionEye-Weboberfläche, `http://<host>:8765/version` oder Datenpunkt `motioneye.<Instanz>._info.motionEyeVersion`.

**Upgrade:** Adapter auf **0.5.0** oder neuer aktualisieren (npm oder ioBroker Admin). Keine Änderung an Kameras oder MotionEye-Config nötig — Host, Benutzer und Passwort bleiben gleich.

---

### Geräteeinstellungen (`settings.*`)

Ab Adapter **0.6.0** liegen Kamera-Parameter unter `motioneye.<Instanz>.<kamera>.settings.*` (z. B. `framerate`, `resolution`, `rotation`, `autoBrightness`, `privacyMask`). Werte werden beim Status-Poll gelesen und können per Datenpunkt geschrieben werden.

**Datenschutzmaske (`settings.privacyMask`):**

1. Die **Maskenbereiche** zeichnest du einmalig in der MotionEye-Weboberfläche (Videogerät → Datenschutzmaske).
2. **Ein-/Ausschalten** am besten nur über den ioBroker-Datenpunkt `settings.privacyMask` — der Adapter merkt sich die gezeichneten Bereiche (dauerhaft im Objekt, übersteht Adapter-Updates/-Neustarts ab **0.6.1**) und sendet sie beim Einschalten wieder mit.
3. Schaltest du die Maske **direkt in MotionEye** aus, verwirft MotionEye die Bereiche sofort. Danach hilft nur: Maske in MotionEye neu zeichnen, kurz warten (Poll) oder Instanz neu starten, damit der Adapter die Linien wieder übernimmt.
4. **Helligkeit/Kontrast/Sättigung/Farbton** gibt es in MotionEye nur für lokale USB-/v4l2-Kameras, nicht für Netzwerk-Kameras (RTSP) — deshalb keine Datenpunkte im Adapter.

**Mehrere Einstellungen gleichzeitig ändern:** Ab Adapter **0.7.0** werden Config-Schreibvorgänge pro Kamera in eine Warteschlange gestellt. Wenn du mehrere `settings.*`/`overlay.*`/`motiondetection.*`-Datenpunkte derselben Kamera fast gleichzeitig setzt (z. B. per Skript oder Mehrfachauswahl), geht dadurch keine der Änderungen mehr verloren. In älteren Versionen: Datenpunkte einzeln nacheinander setzen und `lastAction` abwarten, bevor der nächste geändert wird.

---

### Bewegungserkennung (`motiondetection.*`)

Ab Adapter **1.0.0** liegen die Parameter zur Feineinstellung der Bewegungserkennung unter `motioneye.<Instanz>.<kamera>.motiondetection.*` (`frameChangeThreshold`, `autoThresholdTuning`, `autoNoiseDetect`, `noiseLevel`, `eventGap`, `minimumMotionFrames`, `lightSwitchDetect`, `despeckleFilter`, `preCapture`, `postCapture`).

1. **Erkennung ein/aus** steuerst du weiterhin über den Root-Datenpunkt `mode` (`off` / `still` / `sharp`) — `motiondetection.*` regelt nur Empfindlichkeit und Timing, solange die Erkennung aktiv ist.
2. **`frameChangeThreshold`** ist der Anteil der Bildpixel in Prozent, der sich ändern muss, um Bewegung auszulösen (0–20 %, wie der Schieberegler in MotionEye). Bei `0` ist die Erkennung praktisch ausgeschaltet.
3. **`autoThresholdTuning`** und **`autoNoiseDetect`** lassen MotionEye Schwellwert und Rauschen automatisch anpassen. Ist die automatische Rauscherkennung an, ist `noiseLevel` weiter lesbar, wirkt aber erst wieder, wenn du Auto ausschaltest.
4. **Timing:** `eventGap` ist die Dauer ohne Bewegung, bis ein Ereignis endet (Sekunden). `minimumMotionFrames` filtert kurze Fehlalarme. `preCapture`/`postCapture` sind Frame-Puffer vor/nach der Bewegung (die Frame-Anzahl hängt von der Kamera-Framerate ab).
5. **Sync-Verzögerung:** Änderungen in der MotionEye-Weboberfläche erscheinen in ioBroker erst beim nächsten Status-Poll (`statusPollIntervalSec`, Standard 300 s). Schreiben aus ioBroker wirkt sofort.

Nach dem Adapter-Update: Instanz **neu starten**, damit die neuen Objekte unter `motiondetection.*` angelegt werden.

---

### Textüberlagerung (`overlay.*`)

Ab Adapter **0.7.0** liegt die Textüberlagerung der Kamera unter `motioneye.<Instanz>.<kamera>.overlay.*` (`enabled`, `leftText`, `rightText`, `customLeftText`, `customRightText`, `textScale`).

1. **`enabled`** ist der Hauptschalter für die Überlagerung. Schaltest du ihn aus, entfernt MotionEye den angezeigten Text im Video — `leftText`/`rightText`/der Benutzertext bleiben im Adapter und in der MotionEye-Config erhalten und werden beim erneuten Einschalten wieder verwendet.
2. **`leftText`/`rightText`** akzeptieren einen der Werte `camera-name`, `timestamp`, `custom-text`, `disabled` (in der ioBroker-Admin/Objektansicht als Dropdown dargestellt).
3. **Benutzerdefinierter Text:** Setze `leftText` (bzw. `rightText`) auf `custom-text` und trage den Text in `customLeftText` (bzw. `customRightText`) ein — die Reihenfolge spielt keine Rolle. MotionEye speichert den Benutzertext nur dann dauerhaft, wenn der Modus bereits `custom-text` ist, deshalb sendet der Adapter beide Werte immer gemeinsam in einer Anfrage, damit der Text nicht verloren geht.
4. **`textScale`** steuert die Textgröße (`1`–`10`, entspricht dem Schieberegler in der MotionEye-Oberfläche).

**Textüberlagerung über die Adapter-Konfiguration voreinstellen (Overlay-Tab):**

Ab Adapter **0.8.0** zeigt der Konfigurations-Tab **Overlay** eine Zeile pro Kamera (aus dem Cameras-Tab) mit den gleichen Feldern wie oben, plus einem Button **"Overlay-Einstellungen jetzt anwenden"**. Das wirkt nur in eine Richtung — von der Config zu den Datenpunkten — die Tabelle wird nie automatisch aus Datenpunkt-Änderungen aktualisiert und kann dadurch auch nichts, was du live geändert hast, unbemerkt zurücksetzen:

- Lässt du ein Feld leer (bzw. steht das Dropdown auf **"— unverändert —"**), wird es übersprungen — ein bestehender Wert wird nie überschrieben.
- **Neue Kamera** (im Cameras-Tab angelegt, aber noch nicht gespeichert/neu gestartet): Ausgefüllte Felder werden zum Startwert der Datenpunkte, sobald diese beim nächsten Neustart zum ersten Mal angelegt werden — kein weiterer Schritt nötig.
- **Kamera, die schon `overlay.*`-Datenpunkte hat** (der Normalfall, wenn du den Adapter schon länger nutzt): Das reine Ausfüllen der Tabelle bewirkt für sich genommen **nichts** — du musst auf **"Overlay-Einstellungen jetzt anwenden"** klicken. Der Button übernimmt die Tabelle sofort (Datenpunkte + MotionEye), ohne dass du speichern oder die Instanz neu starten musst, und lässt sich beliebig oft wiederholen — praktisch, um z. B. mehrere Kameras auf einmal einzurichten.
- Da die Config-Tabelle Datenpunkt-Änderungen nie zurückliest, wird eine später live geänderte Einstellung (z. B. per VIS oder Skript) beim nächsten Adapter-Neustart nicht durch die Tabelle überschrieben — die Zeile wirkt erst wieder, wenn du selbst auf "Overlay-Einstellungen jetzt anwenden" klickst.

---

### Wo werden Snapshots und Videos gespeichert?

**Kurz:** Das **gesamte Medienarchiv** (alle Snapshots, alle Videoclips) liegt auf dem **MotionEye-Server** — nicht in ioBroker. Zusätzlich kann der Adapter den **letzten Snapshot** pro Kamera im **ioBroker-Dateispeicher** cachen (Tab **Snapshots**, standardmäßig aktiv): eine JPEG-Datei unter **Admin → Dateien**, Datenpunkte `snapshots.*`. Es gibt **kein** vollständiges Archiv in ioBroker — nur `lastsnap.jpg`, die bei jedem Update überschrieben wird.

| Was | Wo |
|-----|-----|
| **Snapshot-/Video-Archiv** | Auf dem **MotionEye-Server**, im Medienordner der Kamera (Standard `/var/lib/motioneye/Camera<N>/`, oder ein eigener Ordner in MotionEye / Feld **Medienordner** im Cameras-Tab) |
| **Datenpunkt `snapshot`** | Button — löst in MotionEye eine Aufnahme aus; MotionEye speichert die Datei auf dem MotionEye-Server |
| **Datenpunkt `motion`** | Boolesches Ereignis per Webhook — ohne Bilddatei |
| **`storage.*`-Datenpunkte** | Nur **Anzahl und belegter Speicherplatz** aus MotionEye — nicht die Dateien selbst |
| **`snapshots.*` + Dateien-Tab** | **Letzter Snapshot als JPEG** im ioBroker-Dateispeicher (Cache, optional abschaltbar) — `snapshots.filePath` für Telegram/Skripte, `snapshots.urlLocal` / `snapshots.html` für VIS |

**Archiv ansehen oder herunterladen:** MotionEye-Weboberfläche (Bilder / Filme pro Kamera) oder direkt auf dem MotionEye-Host.

Details zum Snapshot-Cache (VIS, Telegram, Blockly): [Snapshot-Cache](#snapshot-cache-snapshots) unten.

---

### Snapshot-Cache (`snapshots.*`)

Wenn **Letzten Snapshot in ioBroker cachen** aktiv ist (`snapshotCacheEnabled`, standardmäßig an), lädt der Adapter `lastsnap.jpg` von MotionEye (Symlink auf den zuletzt gespeicherten Snapshot) und speichert sie unter **Admin → Dateien → `motioneye.<Instanz>/snapshots/<kanal>/lastsnap.jpg`**.

| Auslöser | Wann |
|----------|------|
| **Datenpunkt `snapshot`** | Nach jeder erfolgreichen Snapshot-Aktion (mit konfigurierbarer Wartezeit, damit MotionEye die Datei schreiben kann) |
| **Bewegungs-Webhook** | Optional (`snapshotCacheOnMotion`, standardmäßig aus) — pro Kamera rate-limitiert |
| **`snapshots.refresh`** | Manuell neu laden, ohne weiteren Snapshot auszulösen |

**Datenpunkte für Automatisierung / VIS:**

- `snapshots.urlLocal` — URL für VIS/HTML-Widget im LAN, z. B. `http://192.168.1.10:8082/motioneye.0/snapshots/garten/lastsnap.jpg`
- `snapshots.filePath` — absoluter Dateipfad für Telegram und Skripte, z. B. `/opt/iobroker/iobroker-data/files/motioneye.0/snapshots/garten/lastsnap.jpg` (wird automatisch für deinen Host ermittelt)
- `snapshots.html` — HTML-Widget-Binding (wie bei `streamUrl`)
- `snapshots.lastUpdate` — Zeitpunkt der letzten Cache-Aktualisierung

**Telegram:** `snapshots.filePath` als **einzige** Meldung/`text` verwenden (Blockly: nur den Datenpunkt, nicht mit Text verketten). Caption für Text unter dem Bild nur per JavaScript (`caption: '…'`) oder zwei getrennte Telegram-Nachrichten. **Nicht** die Download-URL aus Admin → Dateien (`:8081/files/...`) — die liefert HTML, kein JPEG.

Voraussetzung: **Web-Adapter** (`admin` / Port 8082), damit das JPEG per HTTP für `urlLocal` ausgeliefert wird. Für die LAN-URL wird **ioBroker-Host für Webhooks** (`webhookHost`) verwendet, wenn gesetzt.

Pro Kamera abwählen: Tab **Snapshots** → **Vom Snapshot-Cache ausschließen**.

---

### Telegram-Benachrichtigungen (Tab **Benachrichtigungen**)

Bei **Bewegungs-Webhook** oder nach **Snapshot-Aktualisierung** kann der Adapter automatisch Telegram-Nachrichten senden — ohne Blockly/Skript.

1. **Telegram-Adapter** installieren und Benutzer authentifizieren.
2. Tab **Benachrichtigungen** → **Telegram-Benachrichtigungen aktivieren** und **Empfänger** eintragen (Instanz meist `0`, Chat-ID aus dem Telegram-Adapter). Spalte **Aktiv** deaktivieren, um jemanden vorübergehend auszublenden.
3. Pro Kamera in der Tabelle: **Text vor dem Bild**, **Bild senden** / **Zeitstempel**, **Bei Bewegung** / **Bei Snapshot** (Dropdown Ja/Nein, Standard Ja), optional **Empfänger** (leer = alle aktiven; sonst Name oder Chat-ID).

Der Adapter sendet **bis zu drei separate Telegram-Nachrichten** (wie dein Blockly-Beispiel): Vor-Text → Bild (`snapshots.filePath`) → Nach-Text. Platzhalter in Texten: `{camera}`, `{channel}`, `{timestamp}`.

Bei **Bewegungs-Webhook** mit **Bild senden = Ja** löst der Adapter zuerst einen MotionEye-Snapshot aus und lädt danach das JPEG (siehe [Schutzstufe](/#/docs/adapterref/iobroker.motioneye/alert-level.md#telegram-bild-bei-bewegung-notify--full)). Die Spalte **Bei Snapshot** gilt nur für manuellen `snapshot` / `snapshots.refresh`.

**Test:** Button **Testnachricht senden**. **Mindestabstand pro Kamera** verhindert Flut bei Dauerbewegung.

Für eigene Logik weiterhin Blockly/Skripte mit `snapshots.filePath` möglich.

**VIS-Schutzstufe:** Ein Dropdown an `motioneye.<Instanz>.<kamera>.alertLevel` steuert MotionEye-Modus und Telegram-bei-Bewegung gemeinsam (`off` / `motion` / `notify` / `record` / `full`). Details: [Schutzstufe](/#/docs/adapterref/iobroker.motioneye/alert-level.md).

---

### Speicherplatz (`storage.*`)

Seit Adapter **0.9.0** zeigt `motioneye.<Instanz>.<kamera>.storage.*` an, wie viele Snapshots/Videoclips aktuell gespeichert sind und wie viel Platz sie belegen (`snapshotCount`, `videoCount`, `usedSpaceMb`, `lastRefresh` sowie der Trigger `refresh`).

1. **Warum das nicht automatisch läuft:** Um diese Werte zu ermitteln, muss MotionEye den Medienordner der Kamera rekursiv durchsuchen und jede einzelne gespeicherte Datei prüfen — bei Kameras mit großen Medienarchiven (tausende Snapshots/Clips) kann das etwas dauern und den MotionEye-Server merklich belasten. Deshalb ist das **nicht** Teil des normalen Status-Polls (`statusPollIntervalSec`).
2. **Manuelle Aktualisierung (immer verfügbar):** Setze `storage.refresh` bei der gewünschten Kamera auf `true` — der Adapter holt die aktuellen Werte und setzt `refresh` danach automatisch wieder auf `false`. Das funktioniert unabhängig von den folgenden Einstellungen.
3. **Globaler Auto-Aktualisierung-Schalter:** Im Config-Tab **Storage** ist **Speicherplatz-Statistik Auto-Aktualisierung aktivieren** (`storagePollEnabled`) standardmäßig aus. Aktiviere ihn und stelle **das Intervall in Sekunden** (`storagePollIntervalSec`, z. B. `3600` für stündlich) ein, damit Kameras automatisch in diesem Intervall aktualisiert werden.
4. **Pro Kamera abwählen:** Derselbe Tab **Storage** zeigt eine Zeile pro Kamera mit einem Häkchen **Vom Auto-Intervall ausschließen** (standardmäßig deaktiviert). Aktiviere es für unwichtige Kameras mit großen Medienarchiven, damit sie beim automatischen Intervall übersprungen werden — ihr Datenpunkt `storage.refresh` funktioniert davon unabhängig weiterhin jederzeit. Der Tab enthält außerdem den Button **"Speicherplatz-Statistik jetzt aktualisieren"**, der sofort alle Kameras der Tabelle aktualisiert (unabhängig vom Häkchen) — praktisch für eine einmalige Aktualisierung aller Kameras, ohne auf das Intervall zu warten.
5. **`usedSpaceMb` ist eine Näherung:** MotionEye liefert pro Datei nur eine bereits gerundete Größenangabe (z. B. `"1.2 MB"`), keine exakten Byte-Werte. Die Summe hat daher einen kleinen Rundungsfehler — ausreichend genau, um Speichertrends zu erkennen, aber keine exakte Belegungsanzeige.
6. Schlägt eine Aktualisierung fehl (z. B. weil MotionEye bei einem sehr großen Ordner ein Timeout auslöst), bleiben die vorherigen Werte erhalten und der Fehler wird in `status` geschrieben — später erneut versuchen oder das **API-Anfrage-Timeout** (`requestTimeoutMs`) in den Einstellungen erhöhen.

---

### Verbindung testen (Admin)

Ab GitHub-Stand / Version **0.4.2** gibt es unter **Einstellungen** den Button **Verbindung testen**. Er prüft Host, Port, Benutzer und das **gespeicherte** Passwort gegen `/config/list` — ohne SSH.

**Voraussetzungen:**

- Adapter-Instanz **läuft**
- Einstellungen gespeichert (Passwort muss in der Instanz hinterlegt sein)

**Ablauf:**

1. **Einstellungen** → Host, Port `8765`, Benutzer, Passwort prüfen → **Speichern**
2. **Verbindung testen** klicken
3. Ergebnis in der Admin-Meldung; Details (Kameraanzahl, MotionEye-Version) stehen im Adapter-Log

| Ergebnis | Bedeutung |
|----------|-----------|
| Erfolg | API und Zugangsdaten stimmen — nach Instanz-Neustart sollte `_info.connection` = `true` werden |
| `unauthorized` | Gespeichertes Passwort oder Benutzer passt nicht zur API — Schritte unter `unauthorized` wiederholen |

Optional: Tab **Protokolle** → **detaillierte Diagnoseprotokollierung** aktivieren — dann siehst du API-Pfade und HTTP-Status im Log (ohne Passwort).

---

### API-Test per SSH (ioBroker-Host)

Isoliert, ob MotionEye die Zugangsdaten akzeptiert — unabhängig von der ioBroker-Passwort-Speicherung.

**Wichtig:** Den Befehl auf dem **ioBroker-Host** ausführen (z. B. per SSH auf die ioBroker-VM/LXC), **nicht** auf Proxmox-Host oder MotionEye-LXC. Dort fehlt `node` oft (`node: command not found`).

ioBroker bringt Node mit — voller Pfad:

```bash
/opt/iobroker/node/bin/node -e "const {createMotionEyeApi}=require('/opt/iobroker/node_modules/iobroker.motioneye/lib/motionEyeApi');createMotionEyeApi({host:'192.168.1.10',motionEyePort:8765,username:'admin',password:'DEIN_PASSWORT',requestTimeoutMs:10000,listCacheMs:0}).getCameraList().then(c=>console.log('OK',c.length)).catch(e=>console.error('FAIL',e.message));"
```

`192.168.1.10` und `DEIN_PASSWORT` anpassen (Passwort von Hand einsetzen).

| Ausgabe | Bedeutung |
|---------|-----------|
| `OK 1` (oder andere Zahl) | API + Zugangsdaten stimmen → Problem liegt an der **ioBroker-Instanz** (Verschlüsselung). Instanz löschen, neu anlegen, Passwort von Hand tippen |
| `FAIL unauthorized` | Web-Login läuft vermutlich **nicht** auf Port **8765** mit denselben Daten — Browser-Adresszeile beim Login prüfen |

**Docker-ioBroker:** Befehl **im ioBroker-Container** ausführen (`docker exec -it <iobroker-container> bash`), Pfade ggf. anpassen.

---

### Aktuelle GitHub-Version installieren

Für Fixes vor dem npm-Release (z. B. **Verbindung testen**, Trim von Host/Benutzer/Passwort):

```bash
cd /opt/iobroker
npm install inventwo/ioBroker.motioneye
iobroker upload motioneye
```

Danach die Adapter-Instanz neu starten. In der Log-Startzeile sollte ein aktueller Git-Commit stehen (nicht mehr ein alter `#41a69ae`-Hash).

---

### Log zeigt `EHOSTUNREACH` oder `ECONNREFUSED` (Docker / Unraid)

Der ioBroker-Container erreicht `motionHost:8765` auf Netzwerkebene nicht — **kein** Passwort-Problem.

**Prüfen:**

1. Vom **ioBroker-Container** aus testen, nicht vom PC:

   ```bash
   docker exec -it <iobroker-container> sh
   wget -O- http://<motionHost>:8765/ 2>&1 | head
   ```

2. **motionHost** muss vom **ioBroker-Container** aus erreichbar sein:
   - Gleiches Docker-Custom-Network → Container-Name (z. B. `motioneye`)
   - Sonst Unraid/Host-IP, wenn vom Container geroutet
   - `192.168.x.x` im PC-Browser garantiert nicht Erreichbarkeit aus dem Container

3. MotionEye-Docker-Template: Port **8765** published?
4. **webhookHost** ist getrennt — MotionEye muss ioBroker auf Port **8090** für Bewegungs-Webhooks erreichen.

---

### `_info.connection` bleibt `false`

- Falscher **motionHost** oder **motionEyePort** (Standard 8765)
- Firewall zwischen ioBroker und MotionEye
- MotionEye läuft nicht
- Docker/Netzwerk-Problem (siehe oben)

---

### Kein Stream-Bild in VIS

1. `<kamera>.stream` auf `true` setzen (oder `streamPulse` auslösen).
2. HTML-Widget mit Binding, z. B. `{motioneye.0.garten.streamUrl}` — Kanalordner in Kleinbuchstaben.
3. Nach Stream-Einschalten kurz warten.
4. **HTTPS in VIS + HTTP bei MotionEye:** Browser kann Mixed Content blockieren.

Schritt-für-Schritt: [Livestream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md).

---

### Bewegung in ioBroker, aber nicht in MotionEye (oder umgekehrt)

**MotionEye über Config-API steuern** aktiviert lassen. Der Adapter schreibt Modus, Webhooks und Stream nach MotionEye. Wenn deaktiviert, empfängt ioBroker nur Webhooks ohne Config-Sync.

---

### Wo finde ich ausführliche Logs?

Log-Level der Instanz auf **Debug** setzen, Fehler reproduzieren, unter **Log** in ioBroker Admin prüfen. Für Forum-Posts `_info.connection` und die erste Fehlerzeile mitschicken.