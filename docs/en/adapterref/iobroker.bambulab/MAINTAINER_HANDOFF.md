---
chapters: {"pages":{"en/adapterref/iobroker.bambulab/README.md":{"title":{"en":"ioBroker.bambulab"},"content":"en/adapterref/iobroker.bambulab/README.md"},"en/adapterref/iobroker.bambulab/docs/CLOUD.md":{"title":{"en":"Cloud-Verbindung (Fork / geplanter Upstream)"},"content":"en/adapterref/iobroker.bambulab/docs/CLOUD.md"},"en/adapterref/iobroker.bambulab/DEV.md":{"title":{"en":"Entwicklung (Fork Cloud)"},"content":"en/adapterref/iobroker.bambulab/DEV.md"},"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md":{"title":{"en":"Nachricht an Maintainer (Issue #186) – zum Kopieren"},"content":"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md"}}}
---
# Nachricht an Maintainer (Issue #186) – zum Kopieren

> Noch **kein PR** – nur kurz Bescheid geben, dass du dran bist und wie weit es ist.

---

## Deutsch (Forum oder GitHub-Kommentar)

Hallo,

ich arbeite an einer optionalen **Cloud-Anbindung** für den Adapter (Thema #186), weil ich selbst einen **Bambu H2D** habe und ihn ohne dauerhaft offenen LAN-Modus in ioBroker einbinden möchte.

**Stand (Fork, H2D getestet):**

- Admin: **LAN** (Standard) oder **Cloud** (Bambu-Konto, E-Mail-Code-Login, Token wird unter der Instanz gespeichert)
- Verbindung zum Bambu-Cloud-MQTT funktioniert; Status/Temperaturen/AMS etc. per `pushall` wie erwartet
- Über Cloud am H2D getestet: **Kammer-LED** steuerbar
- **Lüfter / G-Code / Soll-Temperaturen** lehnt die **Firmware** über Cloud oft ab (ähnlich wie bei Home Assistant besprochen) – im Adapter als `info.cloudPrintControlBlocked` sichtbar, volle Steuerung bleibt **LAN** (IP + Access Code)

**Fork zum Reinschauen (experimentell):**  
https://github.com/crunchip77/ioBroker.bambulab/tree/feature/cloud-mqtt  
Test-Install: `iobroker url https://github.com/crunchip77/ioBroker.bambulab/tarball/feature/cloud-mqtt`

**Bevor ich einen offiziellen PR stelle, fehlt mir noch:**

- Pause / Stop / Resume über Cloud am H2D praktisch testen  
- Kurzer **LAN-Regressionstest** (damit der bestehende Modus unverändert bleibt)  
- Abgleich mit eurem aktuellen `main` / euer Feedback, ob die Richtung für upstream passt  

Ich melde mich wieder, wenn ich merge-ready bin – vorher wollte ich nur transparent machen, dass ich daran arbeite.

Viele Grüße

---

## English (optional, same content for GitHub)

Hi,

I'm working on an optional **cloud connection** for the adapter (re #186). I own a **Bambu H2D** and want ioBroker integration without relying on LAN-only mode all the time.

**Current status (fork, tested on H2D):**

- Admin: **LAN** (default) or **Cloud** (Bambu account, email code login, token stored per adapter instance)
- Cloud MQTT works; monitoring (status, temps, AMS, …) via `pushall`
- **Chamber LED** control works over cloud on my H2D
- **Fans / G-code / target temps** are often **rejected by printer firmware** over cloud (same class of limitation as discussed in the HA integration) – exposed as `info.cloudPrintControlBlocked`; full control remains **LAN** (IP + access code)

**Fork (experimental):**  
https://github.com/crunchip77/ioBroker.bambulab/tree/feature/cloud-mqtt

**Still before I open a formal PR:**

- Test pause / stop / resume over cloud on the H2D  
- Short **LAN regression** test  
- Sync with upstream `main` and your feedback on whether this fits upstream  

Just wanted to share progress early – I'll follow up when it's ready for a PR.

Thanks!