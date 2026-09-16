---
chapters: {"pages":{"en/adapterref/iobroker.shrdzm/README.md":{"title":{"en":"ioBroker.shrdzm"},"content":"en/adapterref/iobroker.shrdzm/README.md"},"en/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md":{"title":{"en":"SHRDZM Adapter Documentation"},"content":"en/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shrdzm/doc/en/DOCUMENTATION_en.md
title: SHRDZM-Adapterdokumentation
hash: 00VEZri3wLpUEUcH+caxpA7h6gpEmEnCETEMVQVnUT0=
---
# SHRDZM-Adapterdokumentation

![Logo](../../../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

## Überblick

Der SHRDZM-Adapter integriert die von _SHRDZM IT Services eU_ bereitgestellte SHRDZM-Smartmeter-Schnittstelle in ioBroker. Mit diesem Adapter können Sie über die SHRDZM-Schnittstelle Energieverbrauchs- und Produktionsdaten Ihrer Smart Meter überwachen.

**Wichtiger Hinweis:** Dieser Adapter steht in keiner Verbindung zu SHRDZM IT Services eU und es besteht keinerlei Geschäftsbeziehung. Es handelt sich um ein unabhängiges Community-Projekt.

## Merkmale

- **Energiemonitoring in Echtzeit** : Erhalten Sie aktuelle Daten zu Energieverbrauch und -produktion.
- **Unterstützung mehrerer OBIS-Codes** : Unterstützt alle Standard-OBIS-Codes für Energiezähler
- **Unterstützung mehrerer Geräte** : Gleichzeitige Verarbeitung von Daten von mehreren SHRDZM-Geräten
- **Historische Daten** : Konfigurierbare Aktualisierungsraten für den Verlauf von Energie- und Leistungsdaten
- **UDP-Weiterleitung** : Empfangene Daten an andere Systeme weiterleiten
- **Gerätefilterung** : Optionale Filterung, um nur Daten von bestimmten Geräten zu akzeptieren.
- **Rohdatenspeicherung** : Option zum Speichern von rohen UDP-Paketen zur Analyse

## Installation

**⚠️ Wichtiger Installationshinweis**

Installieren Sie diesen Adapter **NICHT** mit npm (`npm install iobroker.shrdzm` ). ioBroker-Adapter dürfen **niemals** direkt mit npm installiert werden.

**Korrekte Installationsmethode:**

1. Öffnen Sie die ioBroker-Admin-Benutzeroberfläche.
2. Navigieren Sie zum Tab „Adapter“.
3. Suchen Sie nach „SHRDZM“ oder durchsuchen Sie die verfügbaren Adapter.
4. Klicken Sie auf die Schaltfläche „+“, um den Adapter zu installieren.
5. Konfigurieren Sie die Adapterinstanz wie unten beschrieben.

## SHRDZM-Geräteeinrichtung

### Hardwareanforderungen

- SHRDZM Smartmeter-Schnittstellengerät
- Smart Meter kompatibel mit der SHRDZM-Schnittstelle
- Netzwerkverbindung für das SHRDZM-Gerät
- ioBroker-Host im selben Netzwerk

### SHRDZM-Gerätekonfiguration

1. **Installieren und verbinden Sie Ihr SHRDZM-Gerät** gemäß der Dokumentation des Herstellers.

2. **Greifen Sie über einen Webbrowser auf die SHRDZM-Konfigurationsoberfläche zu** :
   - Stellen Sie eine Verbindung zur Weboberfläche Ihres SHRDZM-Geräts her.
   - Navigieren Sie zur Konfigurationsseite

3. **Cloud-Einstellungen konfigurieren** :![SHRDZM Cloud-Konfiguration](../../../../../en/adapterref/iobroker.shrdzm/doc/shrdzm-cloud.png)
   - Wählen Sie in der SHRDZM-Schnittstelle „Cloud-Konfiguration“ aus.
   - Geben Sie im Feld „Server“ Folgendes ein:
     - **IP-Adresse** : IPv4-Adresse Ihres ioBroker-Hosts
     - **Port** : Die im Adapter konfigurierte Portnummer (Standard: 9000)
   - **Aktivieren Sie "UDP senden"**
   - Cloud-Einstellungen **speichern**

4. **Aktualisierungsintervall konfigurieren** :
   - Navigieren Sie in der SHRDZM-Oberfläche zur Seite „Einstellungen“.
   - Legen Sie das gewünschte Datenübertragungsintervall fest.
   - Einstellungen speichern

Das SHRDZM-Gerät beginnt sofort mit dem Senden von Daten an Ihren ioBroker-Adapter im konfigurierten Intervall.

## Adapterkonfiguration

### Basiskonfiguration

1. **ioBroker-Admin-Benutzeroberfläche öffnen**
2. **Navigieren Sie zu „Instanzen“.**
3. **Suchen Sie Ihre SHRDZM-Adapterinstanz** und klicken Sie auf die Konfigurationsschaltfläche.

#### Netzwerkeinstellungen

- **IP-Adresse binden** :
  - Standard:`0.0.0.0` (auf allen Netzwerkschnittstellen lauschen)
  - Legen Sie eine bestimmte IP-Adresse fest, wenn Sie die zu verwendende Netzwerkschnittstelle einschränken möchten.
- **Hafen** :
  - Standard:`9000`
  - Wählen Sie eine beliebige freie Portnummer (1-65535)
  - Muss mit dem in Ihrem SHRDZM-Gerät konfigurierten Port übereinstimmen.

#### Gerätefilterung (optional)

- **Geräte** :
  - Lassen Sie dieses Feld leer, um Daten von allen SHRDZM-Geräten zu akzeptieren.
  - Geben Sie spezifische Geräte-IDs (durch Kommas getrennt) ein, um Geräte zu filtern.
  - Format der Geräte-ID: z. B.`84CCA8A411EB`

### Erweiterte Konfiguration

#### Aktualisierungsraten

- **Aktualisierungsrate der Energieinformationen** :
  - Steuert, wie häufig Energiedaten für die historische Auswertung verarbeitet werden.
  - Höhere Werte reduzieren die Systemlast, aber die Datenauflösung.
  - Beispiel: Die Einstellung auf 15 bedeutet, dass jeder 15. Datenpunkt für die Historie verwendet wird.

- **Aktualisierungsrate der Energieinformationen** :
  - Steuert, wie häufig Leistungsdaten für die Historie verarbeitet werden.
  - Ähnlich wie bei der Energierate, jedoch für Momentanleistungswerte

#### Datenverarbeitungsoptionen

- **Rohdaten speichern** :
  - Aktivieren Sie die Option zum Speichern von rohen UDP-Paketen, die von Geräten empfangen werden.
  - Nützlich für die Fehlersuche und Datenanalyse
  - **Warnung** : Erhöht die Systemlast aufgrund häufiger Updates

#### UDP-Weiterleitung

- **UDP-Weiterleitung aktivieren** : Empfangene Daten an ein anderes System weiterleiten
- **UDP-Weiterleitungsadresse** : Ziel-IP-Adresse für die Weiterleitung
- **UDP-Weiterleitungsport** : Zielport für die Weiterleitung

## Vom Adapter erstellte Zustände

Der Adapter erzeugt Zustände für alle empfangenen OBIS-Codes. Nachfolgend finden Sie eine vollständige Liste der unterstützten Zustände:

### Geräteinformationsstatus

| Zustand                      | Typ             | Einheit | Rolle                | Beschreibung                              |
| ---------------------------- | --------------- | ------- | -------------------- | ----------------------------------------- |
| `<deviceId>.info.connection` | boolescher Wert | -       | Indikator erreichbar | Verbindungsstatus des Geräts              |
| `<deviceId>.info.lastSeen`   | Nummer          | -       | Datum                | Zeitstempel der zuletzt empfangenen Daten |
| `<deviceId>.uptime`          | Nummer          | S       | Wert                 | Informationen zur Geräteverfügbarkeit     |

### Energieverbrauchsstaaten (Import)

| Zustand            | Typ    | Einheit | Rolle                 | Beschreibung                                             |
| ------------------ | ------ | ------- | --------------------- | -------------------------------------------------------- |
| `<deviceId>.1.8.0` | Nummer | Wh      | Wert.Energieverbrauch | Gesamtverbrauch an aktiver Energie                       |
| `<deviceId>.1.8.1` | Nummer | Wh      | Wert.Energieverbrauch | Tarif für verbrauchte aktive Energie 1 (NT - Nachttarif) |
| `<deviceId>.1.8.2` | Nummer | Wh      | Wert.Energieverbrauch | Tarif für verbrauchte aktive Energie 2 (HT - Hochtarif)  |

### Energieproduktionsstaaten (Export)

| Zustand            | Typ    | Einheit | Rolle                | Beschreibung                             |
| ------------------ | ------ | ------- | -------------------- | ---------------------------------------- |
| `<deviceId>.2.8.0` | Nummer | Wh      | Wert.Energie.erzeugt | Gesamte erzeugte aktive Energie          |
| `<deviceId>.2.8.1` | Nummer | Wh      | Wert.Energie.erzeugt | Tarif für erzeugte aktive Energie 1 (NT) |
| `<deviceId>.2.8.2` | Nummer | Wh      | Wert.Energie.erzeugt | Tarif für erzeugte Wirkenergie 2 (HT)    |

### Reaktive Energiezustände

| Zustand            | Typ    | Einheit | Rolle                 | Beschreibung                         |
| ------------------ | ------ | ------- | --------------------- | ------------------------------------ |
| `<deviceId>.3.8.0` | Nummer | Var     | Wert.Energieverbrauch | Gesamtverbrauch an reaktiver Energie |
| `<deviceId>.4.8.0` | Nummer | Var     | Wert.Energie.erzeugt  | Gesamt erzeugte reaktive Energie     |

### Momentane Leistungszustände

| Zustand             | Typ    | Einheit | Rolle                 | Beschreibung                          |
| ------------------- | ------ | ------- | --------------------- | ------------------------------------- |
| `<deviceId>.1.7.0`  | Nummer | W       | Wert.Leistung.Aktiv   | Aktuelle Wirkleistungsaufnahme        |
| `<deviceId>.2.7.0`  | Nummer | W       | Wert.Leistung.Aktiv   | Erzeugte Wirkleistung                 |
| `<deviceId>.3.7.0`  | Nummer | Var     | Wert.Leistung.Reaktiv | Aktuelle Blindleistungsaufnahme       |
| `<deviceId>.4.7.0`  | Nummer | Var     | Wert.Leistung.Reaktiv | erzeugte Blindleistung                |
| `<deviceId>.16.7.0` | Nummer | W       | Wert.Leistung.Aktiv   | Aktuelle Gesamtleistung (Nettobilanz) |

### Spitzenleistungszustände

| Zustand            | Typ    | Einheit | Rolle               | Beschreibung                                        |
| ------------------ | ------ | ------- | ------------------- | --------------------------------------------------- |
| `<deviceId>.1.6.0` | Nummer | W       | Wert.Leistung.Aktiv | Maximale Wirkleistungsaufnahme (maximal 15 Minuten) |
| `<deviceId>.2.6.0` | Nummer | W       | Wert.Leistung.Aktiv | Maximal erzeugte Wirkleistung (15-Minuten-Maximum)  |

### Rohdatenzustände (falls aktiviert)

| Zustand              | Typ          | Einheit | Rolle | Beschreibung                                                |
| -------------------- | ------------ | ------- | ----- | ----------------------------------------------------------- |
| `<deviceId>.rawData` | Zeichenkette | -       | Text  | Rohdaten der UDP-Pakete, wie sie vom Gerät empfangen wurden |

**Notiz** :`<deviceId>` wird durch die tatsächliche Geräte-ID ersetzt (z. B.`84CCA8A411EB` )

## Fehlerbehebung

### Keine Daten empfangen

1. **Netzwerkkonfiguration prüfen** :
   - Stellen Sie sicher, dass sich das SHRDZM-Gerät und ioBroker im selben Netzwerk befinden.
   - Überprüfen Sie, ob die IP-Adresse und die Port-Einstellungen von Gerät und Adapter übereinstimmen.
   - Überprüfen Sie die Firewall-Einstellungen auf dem ioBroker-Host.

2. **SHRDZM-Konfiguration überprüfen** :
   - Prüfen Sie, ob „UDP senden“ in den SHRDZM-Cloud-Einstellungen aktiviert ist.
   - Überprüfen Sie, ob die korrekte ioBroker-IP-Adresse und der korrekte Port konfiguriert sind.
   - Prüfen Sie, ob das Datenübertragungsintervall korrekt eingestellt ist.

3. **Adapterprotokolle prüfen** :
   - Stellen Sie den Protokollierungsgrad des Adapters auf "debug" oder "silly" ein.
   - Suchen Sie in den Protokollen nach UDP-Empfangsmeldungen.
   - Prüfen Sie auf Fehlermeldungen.

### Hohe Systemlast

1. **Aktualisierungsraten anpassen** :
   - Erhöhen Sie die Werte für die Aktualisierungsrate von Energie und Leistung.
   - Dies verringert die Häufigkeit der Verarbeitung historischer Daten.

2. **Rohdatenspeicherung deaktivieren** :
   - Deaktivieren Sie die Option „Rohdaten speichern“, falls nicht benötigt.
   - Die Speicherung von Rohdaten führt zu häufigen Zustandsaktualisierungen.

3. **Gerätefilterung** :
   - Verwenden Sie die Gerätefilterung, um nur bestimmte Geräte zu verarbeiten.
   - Reduziert die Verarbeitungslast bei Vorhandensein mehrerer Geräte.

### Datenaktualisierungen zu häufig

- Passen Sie das Übertragungsintervall in den Geräteeinstellungen des SHRDZM an.
- Erhöhen Sie die Aktualisierungsraten in der Adapterkonfiguration.
- Überlegen Sie, ob Echtzeitaktualisierungen für Ihren Anwendungsfall erforderlich sind.

## Unterstützung und Mitwirkung

### Unterstützung durch die Gemeinschaft

Bei Fragen, Problemen und Diskussionen in der Community besuchen Sie bitte unser Forum: <https://forum.iobroker.net/topic/80297/test-adapter-shrzdm>

### Problemmeldung

Bitte melden Sie Fehler und Funktionswünsche auf GitHub: <https://github.com/mcm4iob/ioBroker.shrdzm/issues>

### Mitwirken

Beiträge sind willkommen! Bitte:

1. Forke das Repository
2. Erstelle einen Feature-Branch
3. Nehmen Sie Ihre Änderungen vor
4. Reichen Sie einen Pull Request ein.

### Spende

**Wenn Ihnen dieser Adapter gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

## Technische Informationen

### OBIS-Kodexstandard

Dieser Adapter entspricht dem OBIS-Standard (Object Identification System) zur Identifizierung von Energiezählerdaten. OBIS-Codes bieten eine standardisierte Methode zur Identifizierung verschiedener Arten von Energiemessungen.

### Datenformat

Der Adapter empfängt UDP-Pakete im JSON-Format, die Folgendes enthalten:

- Geräte-ID
- Zeitstempel
- OBIS-Codewerte
- Geräteverfügbarkeit

### Netzwerkprotokoll

- **Protokoll** : UDP (User Datagram Protocol)
- **IP-Version** : Nur IPv4
- **Datenformat** : JSON
- **Portbereich** : Konfigurierbar (1-65535)

## License

This adapter is licensed under the MIT License. See the LICENSE file in the repository for full details.

---

*This documentation was last updated for adapter version 1.0.0*