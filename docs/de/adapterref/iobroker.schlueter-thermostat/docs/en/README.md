---
chapters: {"pages":{"en/adapterref/iobroker.schlueter-thermostat/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/README.md"},"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schlueter-thermostat/docs/en/README.md
title: ioBroker.schlueter-thermostat
hash: F3hV6jgv0R8EO+IJ8G/hchma9utcC4BlMznl5423QRM=
---
# ioBroker.schlueter-thermostat

Fußbodenheizung mit **Schlüter DITRA-HEAT / OJ Microline WD5** (OWD5 / MWD5) in ioBroker – über die Hersteller-Cloud und optional **lokal in Ihrem eigenen Netzwerk** (in der Testphase).

---

## 🌍 Übersicht

- 🌡 Raum- und Fußbodentemperatur, Heizstatus
- 🎯 Sollwerte und Regelmodi (Zeitplan, Komfort, Manuell, Boost, Eco, Urlaub, Frostschutz)
- 📅 Wochenplan, ⚡ Energieverbrauch
- 🖥️ Gerätemanager mit Live-Ansicht und kompakten Steuerelementen
- 🔔 Benachrichtigungen (Telegram, Pushover, WhatsApp, E-Mail, Signal, Matrix, Synology Chat)
- 🏠 **Lokale Steuerung (in der Testphase):** Der Adapter übernimmt die Rolle des Hersteller-Gateways – schneller und bei Bedarf ohne Cloud.

---

## 🧠 Architektur

```
                         ┌──────────────── Cloud (default) ─────────────────┐
ioBroker ── adapter ─────┤  OWD5 API (read) · OCD5 API (write)              ├── thermostat
            │            └──────────────────────────────────────────────────┘
            │
            └─ Local gateway (port 9513) ◄──── thermostat (redirected by a DNS record)
                  │
                  └─ Relay: forwards to the vendor cloud (the app keeps working)
```

Cloud- und lokale Verbindungen füllen **dieselben** Zustände. Solange ein Thermostat lokal verbunden ist, bezieht er seine Werte von dort – sofort und nicht durch Abfrage.

---

## 🚀 Schnellstart

1. Installieren Sie den Adapter und öffnen Sie die Instanz.
2. Geben Sie die Zugangsdaten ein:

| Einstellung             | Notiz                                        |
| ----------------------- | -------------------------------------------- |
| Benutzername / Passwort | Anmeldung bei der Schlüter / OJ App          |
| API-Schlüssel           | Der Standardwert funktioniert normalerweise. |
| Kunden-ID               | Standardwert: **3**                          |
| Umfrageintervall        | Standardwert: 60 s (mindestens 10 s)         |

3. Speichern – die Thermostate erscheinen unter `groups.<group>.thermostats.<thermostat>` und im Geräte-Manager.

Informationen zum Einrichten der lokalen Steuerung finden Sie [unter Lokale Steuerung](#-local-control) .

---

## 🖥️ Gerätemanager

Administrator → **Gerätemanager** → Instanz `schlueter-thermostat.X` Jeder Thermostat ist eine Karte; über das Drei-Punkte-Menü werden die Bedienelemente geöffnet.

### Karte

| Symbol                                                                                                                                                | Bedeutung                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| <img src="../images/cloud.svg" width="20"> Wolke ·<img src="../images/relay.svg" width="20"> Staffel ·<img src="../images/home.svg" width="20"> Lokal | So ist der Thermostat aktuell angeschlossen                                                                  |
| <img src="../images/fire.svg" width="20"> Heizung ·<img src="../images/fire-off.svg" width="20"> Aus                                                  | Heizung aktiv                                                                                                |
| <img src="../images/thermometer.svg" width="20">                                                                                                      | Raumtemperatur                                                                                               |
| <img src="../images/floor.svg" width="20">                                                                                                            | Bodentemperatur                                                                                              |
| <img src="../images/target.svg" width="20">                                                                                                           | Sollwert des aktiven Modus (Eco 20 °C, Boost 35 °C, Urlaubs-/Frostschutz 5 °C, Zeitplan: aktuelles Ereignis) |
| <img src="../images/mode.svg" width="20">                                                                                                             | Regulierungsmodus                                                                                            |
| <img src="../images/flight.svg" width="20">                                                                                                           | Urlaub geplant oder aktiv                                                                                    |
| <img src="../images/bolt.svg" width="20">                                                                                                             | Energie (Wolke; geschätzt im lokalen Modus)                                                                  |

Jeder Indikator kann in der Symbolleiste ein- oder ausgeblendet werden.

### Instanz-Symbolleiste

| Symbol                                                                                                                                           | Bedeutung                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| <img src="../images/cloud-ok.svg" width="20"> /<img src="../images/cloud-error.svg" width="20">                                                  | Adapter mit der Cloud verbunden / nicht verbunden                                                    |
| <img src="../images/home.svg" width="20"> **1**                                                                                                  | Lokales Gateway: Anzahl der lokal angeschlossenen Thermostate                                        |
| <img src="../images/home-warning.svg" width="20"> Kein Thermostat                                                                                | Gateway läuft, aber kein Thermostat angeschlossen → DNS-Eintrag prüfen                               |
| <img src="../images/home-error.svg" width="20"> Aus                                                                                              | Gateway nicht aktiv (z. B. Port bereits belegt)                                                      |
| <img src="../images/relay.svg" width="20"> /<img src="../images/relay-warning.svg" width="20"> /<img src="../images/relay-error.svg" width="20"> | Nur Weiterleitung: Anbieter-Gateway verbunden / nicht erreichbar / Zertifikat nicht vertrauenswürdig |

### Bedienelemente

Eine Seite mit Thermostat und Seriennummer und eine Zeile pro Funktion: **manuell** , **Komfort** (mit Dauer), **Boost** (Dauer), **Zeitplan / Eco** , **Urlaub** (aktiv, Beginn, Ende), **Name** .

---

## 🧩 Webkomponente

Der Adapter bringt die Webkomponente **Thermostat** (`<iob-schlueter-thermostat-card>`, [ioBroker-Webkomponenten](https://github.com/ioBroker/web-components) ). Hosts wie vis-2, devices oder admin bieten es in ihrer Palette an; es sieht aus wie die Geräte-Manager-Karte.

| Teil         | Inhalt                                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Kopfzeile    | Name (Thermostatnummer), Gruppe (Gruppennummer), Seriennummer, online / offline (rot, wenn offline)                               |
| Indikatoren  | Gleiche Symbole wie in der Geräte-Manager-Karte: Verbindung, Heizung, Raum, Etage, Sollwert, Modus, Urlaub, Energie               |
| − / +        | Ändert den Sollwert in 0,5 °C-Schritten; wird 1,5 s nach dem letzten Klick als **manueller** Modus gesendet.                      |
| Modus-Tasten | **Zeitplan** , **Eco** sofort; **Komfort** , **Manuell** , **Boost** , **Urlaub –** fragen Sie in einem Dialog nach ihren Werten. |

| Einstellung | Bedeutung                                       |
| ----------- | ----------------------------------------------- |
| Beispiel    | Adapterinstanz (leer: `schlueter-thermostat.0`) |
| Thermostat  | Thermostat der Instanz (leer: der erste)        |

Befehle durchlaufen denselben Prozess `apply.<mode>.*` Der Status entspricht dem aller anderen Benutzeroberflächen. Solange ein Thermostat in der Cloud offline ist (und keine lokale Verbindung besteht), sind die Steuerelemente deaktiviert; im Editor eines Hosts wird auf der Karte nichts angezeigt.

| Gastgeber | Notiz                                                                                                                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aura      | Stellen Sie in den Widget-Einstellungen **„Auf Komponente klicken“** auf **„Komponente“** ein; standardmäßig speichert Aura Klicks für das Widget, und die Steuerelemente reagieren nicht.                                                                  |
| Geräte    | Die Karte erscheint in „Widget hinzufügen“, sobald das Instanzobjekt das neue Widget enthält. `common.webComponents` Nach einem Update müssen die Adapterdateien erneut hochgeladen werden (`iobroker upload schlueter-thermostat`) und die Seite neu laden |

---

## 🧩 Staaten

Pro Thermostat: `groups.<group>.thermostats.<thermostat>`

| Bereich      | Staaten                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Status       | `online`, `heating`, `connection` (Cloud / Relay / lokal), `regulationMode`, `thermostatName`, `softwareVersion`                          |
| Temperaturen | `temperature.room`, `temperature.floor`                                                                                                  |
| Sollwerte    | `setpoint.active`, `setpoint.manual`, `setpoint.comfort`, `setpoint.frostProtection`                                                     |
| Endzeit      | `endTime.comfort`, `endTime.boost` (Thermostat-Ortszeit)                                                                                 |
| Urlaub       | `vacation.enabled`, `.begin`, `.end`, `.temperature`                                                                                     |
| Zeitplan     | `schedule.day1` (Montag) …`day7`, jede `event0…5`                                                                                        |
| Energie      | `energy.value0…` (Cloud); auch mit lokaler Steuerung `energy.estimatedToday` /`estimatedTotal` (Aufheizzeit × Last) und `energy.loadWatts` |

**Steuerung** nur über die Anwendungsordner: Werte unter `apply.<mode>.*` dann setzen `apply.<mode>.apply` Zu `true` Die

| Modus       | NEIN. | Anwenden          | Sollwert                   |
| ----------- | ----- | ----------------- | -------------------------- |
| Zeitplan    | 1     | `apply.schedule`  | aktuelles Ereignis         |
| Komfort     | 2     | `apply.comfort`   | einstellbar, mit Dauer     |
| Handbuch    | 3     | `apply.manual`    | einstellbar                |
| Urlaub      | 4     | `apply.vacation`  | 5 °C (im Gerät festgelegt) |
| Frostschutz | 6     | – (auf dem Gerät) | 5 °C                       |
| Schub       | 8     | `apply.boost`     | 35 °C, mit Dauer           |
| Öko         | 9     | `apply.eco`       | 20 °C                      |
| Name        | –     | `apply.name`      | –                          |

---

## 🔁 Umfrage und Ausweichlösung

| Situation                                                | Wolkenumfrage                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Normal                                                   | im konfigurierten Intervall (Standard 60 s)                                                  |
| Alle Thermostate sind **lokal** angeschlossen.           | seltener, standardmäßig alle 300 Sekunden – die Werte werden lokal abgerufen.                |
| Cloud nicht erreichbar oder **alle** Thermostate offline | Das Intervall verdoppelt sich bis zu einer Stunde, dann nur noch um 12:00 Uhr und 00:00 Uhr. |
| Ein Thermostat ist wieder erreichbar                     | sofort wieder zum normalen Intervall zurückkehren                                            |

Ein lokal angeschlossener Thermostat wird als online betrachtet – der lokale Modus wird also nicht einfach zurückgeschaltet, nur weil die Cloud das Gerät nicht erkennt.

---

## 🔔 Benachrichtigungen

**Benachrichtigungen** : Aktivieren Sie die Kanäle (Telegram, Pushover, WhatsApp, E-Mail, Signal, Matrix, Synology Chat). Falls keine Instanz ausgewählt ist, wird automatisch eine laufende Instanz verwendet.

| Nachricht                                             | Wann                                                                                                                                    |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ / ✅ Thermostat offline / online                    | Die Erreichbarkeit des Thermostats ändert sich                                                                                          |
| ⚠️ / ✅ Cloud-Verbindung verloren / wiederhergestellt  | Der Adapter kann die Cloud nicht mehr erreichen / wieder                                                                                |
| ⚠️ / ✅ Lokale Verbindung verloren / wiederhergestellt | **Relais und nur lokal:** Thermostat ohne lokale Verbindung für 2 Minuten oder ohne angeschlossene Verbindung 10 Minuten nach dem Start |

---

## 🏠 Lokale Kontrolle

> **In der Testphase** – für Nutzer mit DNS- und Hostnamenkenntnissen. Bestätigt auf einem **OWD5** (Firmware 1013W220) in allen Modi. Die WG4-Serie (Nordamerika) wird unterstützt, aber nicht auf realer Hardware getestet. Feedback ist willkommen.

Das Thermostat behält seine eigene Verbindung zum **Geräte-Gateway** des Herstellers. Ein DNS-Eintrag leitet die Verbindung zum ioBroker-Host um – am Thermostat selbst wird nichts geändert. Löschen Sie den DNS-Eintrag, bleibt alles wie zuvor.

### Modi

| Modus                     | App                | Steuerung über ioBroker | Ohne Internet                                                                                                                          |
| ------------------------- | ------------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Aus**                   | ✔                  | über die Cloud          | ✘                                                                                                                                      |
| **Staffel** ⭐             | ✔ (synchronisiert) | lokal, sofort           | ✔ Der Adapter übernimmt automatisch und kehrt innerhalb von ≤ 1 Minute nach Wiederherstellung der Internetverbindung zum Relay zurück. |
| **Nur für lokale Nutzer** | ✘ (offline)        | lokal, sofort           | ✔                                                                                                                                      |

### Aufstellen

1. Weisen Sie dem ioBroker-Host eine **feste IP-Adresse** zu.
2. Umleiten `owd5-sl003-thermostat.ojelectronics.com` zum ioBroker-Host in Ihrem DNS (Pi-hole, AdGuard, Router) (prüfen Sie ggf. den Hostnamen im DNS-Protokoll des Thermostats):
   - **Empfohlen – CNAME-Eintrag** auf den Namen des ioBroker-Hosts (z. B. `iobroker.lan` Der Host behält seinen Namen; ein einfacher A-Record bewirkt, dass Pi-hole den ioBroker-Host unter dem Namen des Thermostats anzeigt. Pi-hole: _Lokaler DNS → CNAME-Records_ ; Pi-hole muss das Ziel selbst kennen (eigener DNS-Record oder DHCP).
   - Alternativ: Aufzeichnung `owd5-sl003-thermostat.ojelectronics.com` → **IP-Adresse des ioBroker-Hosts** .
3. Registerkarte **Lokal** : Modus **Relay** , "Befehle lokal senden" ein, speichern.
4. **Schalten Sie** das Thermostat aus und wieder ein.
5. Überprüfen Sie die Symbolleiste:<img src="../images/home.svg" width="20"> **1** = verbunden.<img src="../images/home-warning.svg" width="20"> "Kein Thermostat" = Der DNS-Eintrag funktioniert nicht.

Die Schaltfläche **„DNS prüfen“** zeigt an, wohin der Name aus Sicht von ioBroker verweist. Wenn ioBroker in Docker mit eigenem DNS ausgeführt wird, kann dort „cloud“ angezeigt werden, obwohl die Weiterleitung für das Thermostat funktioniert.

### Gut zu wissen

- **Läuft lokal:** Zeitplan, Manuell, Komfort, Boost, Eco, Urlaub. Der Name wird immer über die Cloud übertragen (im rein lokalen Modus abgelehnt).
- **Ein lokaler Befehl schlägt fehl** → er wird automatisch über die Cloud gesendet.
- **Die Energie im rein lokalen Modus** stammt nicht aus der Cloud; sie wird aus der Aufheizzeit × Last geschätzt.
- **Port 9513** muss frei und vom Thermostat erreichbar sein (Docker: Port veröffentlichen, VLAN: Firewall).
- **Mehrere Thermostate:** ein DNS-Eintrag für alle (noch nicht mit mehreren realen Geräten getestet).
- **Zurück zur Cloud:** Modus „Aus“, DNS-Eintrag löschen, Thermostat neu starten. Falls der Eintrag aktiv bleibt, warnt der Adapter.
- **Sicherheitshinweis:** Jedes Gerät im Netzwerk kann Port 9513 erreichen – verwenden Sie ihn daher nur in einem vertrauenswürdigen Netzwerk.

---

## 🐞 Fehlerbehebung

| Problem                                                                                        | Lösung                                                                                                                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Symbolleiste<img src="../images/home-warning.svg" width="20"> "Kein Thermostat"                | Ist der DNS-Eintrag aktiv? Wurde der Thermostat neu gestartet? Ist Port 9513 erreichbar?                                                        |
| Thermostat offline im Modus "Aus"                                                              | Der DNS-Eintrag ist noch aktiv – löschen Sie ihn und schalten Sie das Thermostat neu aus.                                                       |
| Karte zeigt<img src="../images/cloud.svg" width="20"> Cloud, obwohl das Relais eingestellt ist | Der Thermostat ist nicht an den Adapter angeschlossen (siehe oben).                                                                             |
| Ich benötige Details.                                                                          | Protokollierungsstufe „ **Debug“** : alle Cloud-Anfragen und – mit lokaler Steuerung – jede Nachricht (`Thermostat (…)` /`Vendor gateway (…)`) |