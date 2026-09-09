---
chapters: {"pages":{"en/adapterref/iobroker.schlueter-thermostat/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/README.md"},"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md":{"title":{"en":"ioBroker.schlueter-thermostat"},"content":"en/adapterref/iobroker.schlueter-thermostat/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schlueter-thermostat/docs/en/README.md
title: ioBroker.schlueter-thermostat
hash: VCNuxegHNTcLQe6OgQo1haZtdihCx9h24wAsxdNdcJE=
---
# ioBroker.schlueter-thermostat

Cloud-Adapter für **Schlüter / OJ Microline OWD5 Thermostate**

---

## 🌍 Übersicht

Dieser Adapter integriert **Schlüter / OJ Microline OWD5-Thermostate** über die **offiziellen Cloud-APIs** in ioBroker.

Es unterstützt:

- 🌡 Temperaturüberwachung
- 🎯 Sollwerte
- 🔄 Modussteuerung
- ⏱ Komfort- und Boost-Timer
- 🏖 Urlaubsmodus
- 📅 Vollständiger Zeitplan
- ⚡ Energiestatistik
- 🔔 Optionale Adapterbenachrichtigungen (Telegram, Pushover, WhatsApp, E-Mail, Signal, Matrix, Synology Chat)

> **Rein Cloud-basiert** – kein lokales Gateway, Modbus oder LAN-API erforderlich.

---

## 🧠 Architektur

```
ioBroker
   │
   │ HTTPS (REST)
   ▼
schlueter-thermostat Adapter
   │
   ├──► OWD5 Cloud API  (READ)
   │      - Groups
   │      - Thermostats
   │      - Temperatures
   │      - Modes
   │      - Schedule
   │      - Energy
   │
   └──► OCD5 Cloud API  (WRITE)
          - Setpoints
          - Modes
          - End times
          - Vacation
          - Thermostat name
```

---

## 🖥️ Geräte-Manager (Admin)

Der bisherige benutzerdefinierte Admin-Tab wurde entfernt und durch den offiziellen ioBroker Admin **Device Manager** ersetzt.

Jede Adapterinstanz wird nun im Geräte-Manager aufgelistet und zeigt dort alle Thermostate der Instanz an.

### Merkmale

| Bereich                        | Was Sie tun können                                                                                                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Geräteliste**                | Alle Thermostate nach Adaptergruppe anzeigen                                                                                                                                                                                     |
| **Karte**                      | Verbindungssymbol auf der Karte sowie zusammenfassende Werte in den Kartendetails (Raum-/Fußbodentemperatur, Heizung, Regelmodus, Verbrauch).                                                                                    |
| **Details (Drei-Punkte-Menü)** | Öffnen Sie die Thermostatdetails mit einer Registerkarte **„Informationen“** (Gruppen-ID, Thermostat-ID, Modell) und einer Registerkarte **„Steuerung“** .                                                                       |
| **Kontrolle**                  | Legen Sie manuelle/Komfort-Sollwerte fest, lösen Sie zeitgesteuerte/Eco-/manuelle/Komfort-Aktionen aus, konfigurieren Sie die Boost-Dauer und -Anwendung, verwalten Sie Urlaubseinstellungen und benennen Sie das Thermostat um. |

### Geräte-Manager öffnen

1. ioBroker-Admin öffnen
2. Öffnen Sie den **Geräte-Manager**
3. Erweitern Sie Ihre`schlueter-thermostat.X` Beispiel
4. Über das Drei-Punkte-Menü auf der Thermostatkarte können Sie Details/Aktionen öffnen.

---

## 🚀 So geht's los

1. Adapter in ioBroker installieren
2. Konfiguration der offenen Instanz
3. Eingeben:

| Einstellung            | Beschreibung                                                |
| ---------------------- | ----------------------------------------------------------- |
| Benutzername           | Ihr Schlüter/OJ Cloud-Login                                 |
| Passwort               | Cloud-Passwort                                              |
| API-Schlüssel          | Die Standardeinstellung funktioniert in den meisten Fällen. |
| Kunden-ID              | Gefunden in den Thermostatinformationen                     |
| Client-Softwareversion | Zahlenwert vom Thermostat                                   |
| Umfrageintervall       | Standardwert: 60 Sekunden                                   |

4. Adapter speichern und starten

---

## 🔄 Adapter-Workflow

### Beim Start

- Anmeldung in der Cloud
- Objektbaum erstellen
- Umfrage starten

### Wahlzyklus

- Liest alle Gruppen und Thermostate
- Aktualisiert Temperaturen, Betriebsarten und Sollwerte
- Aktualisierungsendzeiten (Komfort/Boost)
- Leseplan
- Liest Energiewerte

### Wenn Sie auf die Schaltfläche „Anwenden“ klicken

- Der Adapter erstellt eine **vollständige UpdateThermostat-Nutzlast.**
- Sendet an die Cloud
- Die Cloud leitet die Daten an den Thermostat weiter.

---

## 🧩 Objektstruktur

```
schlueter-thermostat.0
└─ groups
   └─ <GroupId>
      └─ thermostats
         └─ <ThermostatId>
```

---

## 📥 Lesbare Staaten

| Kategorie    | Staaten                             |
| ------------ | ----------------------------------- |
| Temperaturen | Zimmer, Etage                       |
| Sollwerte    | Manuell, Komfort                    |
| Modi         | Regulierungsmodus                   |
| Endzeit      | Komfort, Boost                      |
| Urlaub       | Aktiviert, Beginn, Ende, Temperatur |
| Zeitplan     | Alle Tage + Veranstaltungen         |
| Energie      | kWh-Historiewerte                   |

---

## ✍ Beschreibbare Zustände (Konzept anwenden)

Direkte Schreibvorgänge werden **nicht mehr verwendet** .\
&#x20;Alle Aktionen werden über **die Schaltflächen „Anwenden“** ausgeführt.

| Anwendungsmodus          | Funktion              |
| ------------------------ | --------------------- |
| apply.schedule.apply     | Zeitplan aktivieren   |
| apply.comfort.apply      | Komfortmodus + Dauer  |
| apply.manual.apply       | Manuelle Temperatur   |
| apply.boost.apply        | Boost-Modus           |
| apply.eco.apply          | Eco-Modus             |
| bewerben.Urlaub.bewerben | Urlaubseinstellungen  |
| apply.name.apply         | Thermostat umbenennen |

---

## 🔥 Regulierungsmodi

| Modus    | Nummer | Verhalten                                  |
| -------- | ------ | ------------------------------------------ |
| Zeitplan | 1      | Nutzt einen Wochenplan                     |
| Komfort  | 2      | Vorübergehende Komforttemperatur           |
| Handbuch | 3      | Feste Temperatur                           |
| Schub    | 8      | Temporäre Leistungssteigerung max. 60 Min. |
| Öko      | 9      | Energiesparmodus                           |

---

## ⏱ Zeitmanagement

- Die Endzeiten werden in **der Ortszeit des Thermostats** gesendet.
- Kein Zeitzonensuffix (kein`Z` )
- Unterstützte Boost- und Komfort-Zeiträume (Boost max. 60 Min.).
- Die Zeitzonenabweichung des Thermostats wird berücksichtigt.

---

## ⚡ Energie

Jeder Thermostat bietet folgende Funktionen:

```
energy.count
energy.value0
energy.value1
...
```

Werte beginnen mit **heute** .

---

## 🛡 Stabilität & Sicherheit

- Sichere DB-Wrapper
- Schutz der Wahllokale (keine Überschneidungen der Wahllokale)
- Offline-Erkennung
- Überwachung der Cloud-Verbindung
- Fehlerbehandlung anwenden
- Geordnetes Herunterfahren
- Ausweichabfrage (automatischer Backoff, siehe unten)

---

## 🔁 Ausweichumfrage

Wenn die Cloud nicht erreichbar ist oder **alle** Thermostate offline sind, reduziert der Adapter automatisch die Abfragehäufigkeit, um Ressourcen zu schonen:

| Phase           | Verhalten                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Normal          | Abfragen im konfigurierten Intervall (Standard: 60 s)                                                             |
| Zurückweichen   | Bei jedem aufeinanderfolgenden Ausfall verdoppelt sich das Intervall (60 s → 120 s → 240 s → … → 1 h)             |
| Fester Zeitplan | Nach einer Stunde wird die Abfrage auf einen festen Zeitplan um **12:00** und **00:00 Uhr** umgestellt.           |
| Erholung        | Sobald mindestens ein Thermostat wieder online ist, wird das Intervall auf den konfigurierten Wert zurückgesetzt. |

---

## Registerkarte „Benachrichtigungen“

Aktiviert Push-Benachrichtigungen, um über Geräteereignisse zu informieren. Alle Benachrichtigungen werden in der vorkonfigurierten Systemsprache versendet.

### Benachrichtigungskategorien

| # | Kategorie                                |
| - | ---------------------------------------- |
| 1 | **⚠️ Thermostat offline**                |
| 2 | **✅ Thermostat Online**                  |
| 3 | **⚠️ Cloud-Verbindung unterbrochen**     |
| 4 | **✅ Cloud-Verbindung wiederhergestellt** |

### Unterstützte Anbieter

Jeder aktivierte Anbieter unterstützt einen optionalen Adapterinstanzselektor (`type:instance` ) in der Instanzkonfiguration. Wenn diese Option leer bleibt, erkennt der Adapter automatisch eine laufende Instanz und bevorzugt die niedrigste Instanznummer (`.0` ,`.1` , ...).

| Anbieter                       | Optionale Konfiguration           |
| ------------------------------ | --------------------------------- |
| **Telegramm**                  | Benutzer- oder Chat-ID (optional) |
| **Leichtgläubig**              | Titel, Gerät (optional)           |
| **WhatsApp** (`whatsapp-cmb` ) | Telefonnummer (optional)          |
| **E-Mail**                     | Empfänger, Betreff (optional)     |
| **Signal** (`signal-cmb` )     | Telefonnummer (optional)          |
| **Matrix** (`matrix-org` )     | Keine zusätzliche Konfiguration   |
| **Synology-Chat**              | Kanalname (erforderlich)          |

---

## 🐞 Fehlersuche

Stellen Sie den Protokollierungsgrad auf **Debug** ein, um die Cloud-Kommunikation anzuzeigen.

---

## 📌 Notizen

- Entwickelt und getestet mit einem einzigen Thermostat
- Umgebungen mit mehreren Geräten werden unterstützt, Feedback ist jedoch willkommen.