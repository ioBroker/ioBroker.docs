---
chapters: {"pages":{"en/adapterref/iobroker.bambulab/README.md":{"title":{"en":"ioBroker.bambulab"},"content":"en/adapterref/iobroker.bambulab/README.md"},"en/adapterref/iobroker.bambulab/docs/CLOUD.md":{"title":{"en":"Cloud-Verbindung (Fork / geplanter Upstream)"},"content":"en/adapterref/iobroker.bambulab/docs/CLOUD.md"},"en/adapterref/iobroker.bambulab/DEV.md":{"title":{"en":"Entwicklung (Fork Cloud)"},"content":"en/adapterref/iobroker.bambulab/DEV.md"},"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md":{"title":{"en":"Nachricht an Maintainer (Issue #186) – zum Kopieren"},"content":"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md"}}}
---
# Cloud-Verbindung (Fork / geplanter Upstream)

> **Standard bleibt LAN.** Cloud ist optional und ersetzt weder Bambu Studio noch den LAN-Access-Code für volle Steuerung.

## Einrichtung

1. Admin: **Verbindungsmodus** → **Cloud (MQTT über Bambu-Konto)**
2. **Seriennummer** und **Druckermodell** (z. B. H2D-Series) setzen
3. **Cloud-Region:** Global (EU/US) – getestet; **China** nur wählbar, **nicht getestet**
4. Anmeldung:
   - **E-Mail-Code** (empfohlen für Google/OAuth-Konten): Instanz starten → Code per Mail → Feld **Cloud E-Mail-Bestätigungscode** → speichern → einmal neu starten
   - **E-Mail + Bambu-Passwort:** App-Passwort, nicht das Google-Passwort
5. Erfolg im Log: `Printer connected`, Token in **`iobroker-data/<instanz>/cloud-credentials.json`**

## Token & Sicherheit

- JWT-Gültigkeit typisch **~360 Tage**; der Adapter **refresh’t nicht automatisch** (Bambu-API unklar).
- Ab **~14 Tage vor Ablauf** erscheint eine **Warnung** im Log; danach: Token leeren, neu anmelden.
- Passwort wird nur für Login genutzt; dauerhaft gespeichert wird das Token (Datei + optional Admin-Feld).

## 2FA

- **Zwei-Faktor-Login in der Bambu-App wird nicht unterstützt.**
- Fehlermeldung im Log mit Workaround: **E-Mail-Code-Login** oder 2FA in der App **vorübergehend deaktivieren** und Passwort-Login nutzen.

## Was Cloud kann (H2D, Stand Tests)

| Bereich | Cloud |
|--------|--------|
| Status, Temperaturen, AMS, HMS, Airduct (lesen) | ja |
| Kammer-LED (`control.lightChamber`) | ja |
| H2D „Logo“-State (linke Kammerleiste) | ja |
| Werklicht (`lightWorkHead`) | Cloud oft unzuverlässig; **LAN + Dev-Modus: ok** (H2D-Test) |
| Lüfter Kammer (`big_fan2_speed`) | Cloud blockiert; **LAN: ok** (inkl. Airduct/Klappe) |
| Heatbreak-Lüfter (`heatbreak_fan_speed`) | am H2D **kein MQTT-Befehl** (Adapter wie HA) |
| Lüfter, Soll-Temp., Custom G-Code | am H2D oft **gesperrt** → `info.cloudPrintControlBlocked` |
| Pause / Stop / Resume | **Pause am H2D getestet: `failed`** (2026-11-02); Stop/Resume über Cloud nicht empfohlen |

Referenz: [Home Assistant Bambu Lab #1330](https://github.com/greghesp/ha-bambulab/issues/1330) (Remote-Print-Policy).

## Volle Steuerung

**LAN-Modus am Drucker** + Admin **LAN** + Drucker-IP + **LAN Access Code** ([Bambu Wiki – Netzwerk](https://wiki.bambulab.com/en/general/printer-network-ports)).

## Gesamt-Druckstunden (H2D)

Am Gerät: Einstellungen → Geräteinformation. In ioBroker (MQTT, getestet Cloud):

- **`bambulab.0.<serial>.printer.print_time`** – Wert in **Stunden** (technischer MQTT-Name `print_time`, **nicht** Laufzeit des aktuellen Jobs)

Nach Instanz-Update mit `state_attr` heißt der State in der UI „Total usage hours (device)“.

## States

- **`info.cloudPrintControlBlocked`** – `true`, wenn Firmware `print.*`-Steuerung über Cloud ablehnt; betroffene **control**-States (inkl. Pause/Stop/Resume am H2D) werden dann **read-only**.
- **`info.mqttPrintFun`** – Roh-Flag aus MQTT (Hex).
- **`control.cloudRequestEmailCode`** – Button: neuen E-Mail-Code anfordern.

Weitere Entwickler-Notizen: [`DEV.md`](/#/docs/adapterref/iobroker.bambulab/DEV.md) im Repo-Root.