---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: hwAWHgbqN4OZ5ffAQUp3DaN2MiSvvVhaOFde0QNrS4Q=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Inhaltsverzeichnis
* [Beschreibung](#description)
* [Anforderungen](#requirements)
* [Funktionen](#features)
* [Installation](#installation)
* [Adapterkonfiguration](#adapter-configuration)
* [Lizenz installieren](#install-the-license)
* [Konfigurationsschnittstelle](#configuration-interface)
* [Objekte](#objects)
* [Verwendung](#Verwendung)
* [Datenpunkttypen (DPT)](#data-point-types-dpt)
* [So funktioniert der Import](#how-the-import-works)
* [Vermeidung von Problemen](#avoidance-of-problems)
* [GA-Tool](#ga-tool)
* [Direkte Verbindung zwischen Nicht-KNX-System und KNX-System (und umgekehrt)](#direct-link-non-knx-state-to-knx-vice-verse)
* [Geplante Funktionen](#planned-features)
* [Änderungsprotokoll](#changelog)

## Beschreibung
Dieser Adapter ermöglicht den Import von `knxproj`-Dateien aus ETS. Er generiert die Übersetzung zwischen KNX-Gruppenadressen und ioBroker und ordnet die Geräte Räumen zu (insbesondere für MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Es ist mit Standard-KNX/LAN-Gateways kompatibel.

**Achtung: Mit dem Wechsel zu KNX-Adapter Version 2.x hat sich die Lizenzierung geändert. Sie können eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erhalten.**

**Sie sollten außerdem iobroker js-controller UND admin auf die neueste Version aktualisieren.**

Vor Beginn: Alle DPTs von com.Objects müssen in Ihrem ETS-Projekt eingerichtet sein. Alle Geräte müssen Ihrer Anlagenstruktur zugeordnet sein.

## Anforderungen
* Node-Version >= 24.0.0
* Administratorversion >= 5.2.0
* js-controller Version >= 3.3.20

Ohne diese Voraussetzung lässt sich der Adapter nicht installieren oder er funktioniert nicht richtig.

## Merkmale
* Importieren der `knxproj`-Datei
* Erzeugung einer ETS-ähnlichen Objektstruktur
* Auffinden und Kombinieren von Handlungs- und Zustandskanälen (Heuristik)
* Aktualisierung aller Zustände beim Start
* Keine Cloud oder Internetverbindung erforderlich
* Senden eines Lesebefehls an den KNX-Bus während des Schreibens auf das Zustandsobjekt
* GA-Objekte mit GA-Tools bearbeiten und modifizieren
* Bearbeiten und Ändern von Beziehungen zwischen Bundesstaaten und Gesetzen mit GA-Tools
* NEU: Direkte Verbindung eines Nicht-KNX-Zustands zulassen (und umgekehrt)
* NEU: Adapterantworten auf GroupValueRead für ein mit directLink verbundenes Objekt
* NEU: Import passwortgeschützter Projektdateien (danke an aKzenT)
* NEU: Responsives Design für die Admin-Oberfläche (materialize)

###Installation
Dieser Adapter lässt sich nur mit npm installieren. Die Installation über GitHub funktioniert **nicht**.

##Adapterkonfiguration
Nach der Installation dieses Adapters öffnen Sie die Adapterkonfiguration.

###Lizenz installieren
Der erste Schritt besteht darin, die Lizenz anzuwenden. Falls Sie keine Lizenz installiert haben, werden 500 Datenpunkte angerechnet.

* (1) zeigt Ihre System-ID an; diese benötigen Sie zum Erhalt einer Lizenz.
* (2) Klicken Sie hier, um Ihre Lizenz zu beantragen

![knxV2-first-start-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Wenn Sie bereits eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erstellt haben, können Sie diese in (2) einfügen, ODER Sie können sie direkt online erwerben, indem Sie auf (1) klicken.

![knxV2-2-1-Install-License-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Wenn Sie auf (1) geklickt haben, geben Sie Ihre iobroker.net-Konto-Anmeldedaten ein.

![knxV2-2-2-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Wenn Ihre Daten korrekt sind, werden Ihnen alle Ihre Lizenzen angezeigt. Wählen Sie die gewünschte Lizenz aus.

![knxV2-2-3-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Falls dies erfolgreich war, speichern Sie es.

![knxV2-2-4-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Das ist alles. Klicken Sie unten auf dieser Seite auf die Schaltfläche zum Speichern.

### Konfigurationsschnittstelle
![knxV2-2-5-Install-License-online-applied-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP: IPv4 des KNX-LAN Gateways.
2. KNX-Gateway-Port: Standardmäßig ist Port 3671 eingestellt.
3. Physikalische Adresse: Physikalische Adresse der iobroker KNX-Instanz. **Wichtig: Dies ist nicht die physische Adresse des LANs.**

Gateway!** und darf nicht auf 0 enden

4. KNX-Pakete pro Sekunde: Dies begrenzt die Paketrate. Wenn das KNX LAN-Gateway zu oft die Verbindung wiederherstellt oder vorübergehend nicht erreichbar ist.

Wenn Sie die Möglichkeit nutzen, reduzieren Sie diesen Satz.

5. Lokale iobroker-IP: Wählen Sie die IP-Adresse/Schnittstelle aus, an die der Adapter gebunden werden soll.
6. loglevel: Normalerweise ist dies die Stufe "Info", zum Debuggen erhöhen Sie die Stufe.
7. Nur neue Datenpunkte importieren: Diese Option ist standardmäßig aktiviert. Wenn sie deaktiviert wird, werden neue GAs generiert UND

Die bestehenden GAs werden neu erstellt.

8. Schaltfläche „Datei hochladen“: Hier können Sie per Drag & Drop oder durch Klicken auf den Dateiauswahldialog Ihre ETS-Datei hochladen.

Exportieren Sie im Format `knxproj`.

Nach erfolgreichem Import zeigt ein Dialogfeld die Anzahl der importierten Objekte an. Klicken Sie nun auf „Speichern & Schließen“. Der Adapter sollte nun starten.

Beim Start liest der Adapter alle Gruppenadressen mit Lese- und Schreibflag. Dies kann einige Zeit dauern und die KNX-Buslast erhöhen. Die Werte in Ihrer Visualisierung werden jedoch nach dem Start aktualisiert.

Das Hochladen einer passwortgeschützten Datei ist derzeit nicht möglich.

9. Host-ID: Dies ist eine spezielle ID des iobroker-Hosts. Diese ID ist für die Generierung und Validierung der Lizenz erforderlich.
10. GA-Tools: Werkzeugkasten für sich schnell ändernde GAs

### Objekte
Hier finden Sie unter knx.0 die Gruppenadressstruktur, wie in Ihrem ETS-Projekt. Zum Ändern der Eigenschaften verwenden Sie GA-Tool.

### Verwendung
Wenn der Adapter erfolgreich startet, stehen Ihnen Ihre Datenpunkte für alle gewünschten Aktionen zur Verfügung.

### Datenpunkttypen (DPT)
Alle DPTs gemäß „System Specifications, Interworking, Datapointtypes“ der KNX Association sind verfügbar. Das bedeutet, dass Sie zwei Arten von Informationen erhalten können:

1) ein Wert oder eine Zeichenkette 2) durch Kommas getrennte Werte oder ein Array von Werten (momentan weiß ich noch nicht, welche Methode besser geeignet ist)

Beispielsweise wird ein DPT5.001 als vorzeichenlose Ganzzahl mit 8 Bit kodiert. Dies ergibt einen einzelnen Wert. Der DPT3.007 (Steuerungsdimmung) wird als 1 Bit (Boolescher Wert) + 3 Bit (vorzeichenlose Ganzzahl) kodiert.

Dies führt beispielsweise zu einem Wert wie „0,5“, wobei „0“ „Verringern“ und „5“ die Anzahl der Intervalle bedeutet.

### So funktioniert der Import
1. Lesen aller CommunicationObjectReferences (COR):

Kombination der groupadressreference ID mit dem DPT des entsprechenden COR (falls vorhanden).

2. Generierung der Gruppenadressstruktur (GAS):

GAS auf Basis der GAR-IDs generieren und DPT festlegen (falls noch nicht geschehen).

3. Ermittlung der Adressen in den einzelnen Bundesstaaten und Gesetzen:

In ets-exports sind keine Informationen über Status- und Akteursadressen enthalten. Der Adapter analysiert alle GAs mit dem Status „Status“ oder „Status“.

Wenn zwei GAs eine Ähnlichkeit von über 90 % aufweisen, wird eine Adresse dem Akteur und die andere dem Status zugeordnet. Zusätzlich wird geprüft, ob die DPTs ähnlich sind. Daher ist es schwierig, ein passendes Paar zu finden, wenn die GA-Benennung nicht einheitlich ist.

4. Flag-Prüfung in der Gerätekonfiguration:

Die Flaggen werden wie folgt behandelt:

| KNX | KNX | KNX | ioBroker | ioBroker | |
       |-------|-------|----------|----------|----------|----------------------------------------------------------|
| Lesen | Schreiben | Senden | Lesen | Schreiben | Erklärung |
| - | - | - | - | - | Der Wert wird von GroupValueRead aktualisiert |
| x | - | - | x | x | Senden eines beliebigen Werts in diesem Zustand löst GroupValueRead aus |
| - | x | - | - | x | Wert mit GroupValueWrite an KNX senden |
| - | - | x | x | - | Der Statuswert wird von GroupValueResponse aktualisiert |
| x | - | x | x | x | Senden eines beliebigen Werts in diesem Zustand löst GroupValueRead aus |

6. Erstellung von Datenpunkt-Peers (DPP):

Ein DPP wird erstellt, wenn GA, GAR und DPT gültig sind. Dies sind die DPPs, mit denen der Adapter arbeitet. Falls DPT in einem GA fehlt, weil es nicht gefunden werden konnte, wird kein DPP erstellt. Dies kann mit dem GA-Tool behoben werden.

7. Beim Start des Adapters:

Alle mit dem „Gelesen“-Flag gekennzeichneten GAs werden zu Beginn überprüft. Dies kann zu einem höheren Busverkehr führen. Am Ende sind alle Bundesstaaten auf dem neuesten Stand.

### Vermeidung von Problemen
* Saubere ETS-Programmierung und, noch wichtiger, saubere ETS-Programmierung und am wichtigsten, saubere ETS-Programmierung
* Weisen Sie die DPTs zu!!
* einheitliche Kennzeichnung der GA-Bezeichnungen (z. B. „EG Wohnen Decke Licht schalten“ und „EG Wohnen Decke Licht schalten Status“)
* Vermeidung der Sonderzeichen ",./;&%$§[]" (kann Probleme bei der Gaserzeugung verursachen)
* Prüfen Sie, ob das KNX/LAN-Gateway erreichbar ist. Falls nicht, versucht der Adapter ständig, eine Verbindung herzustellen.
* Wählen Sie die korrekte physikalische Adresse (wichtig bei Verwendung von Leitungskupplungen). !!! ACHTUNG: Die eingegebene physikalische Adresse

Dies ist NICHT die Adresse des LAN-Gateways und darf nicht mit 0 enden!!!

* Der Port der LAN-Schnittstelle ist üblicherweise 3671.
* Aufgrund der Möglichkeit von Statusabfragen ist Folgendes zu beachten: Es muss sichergestellt werden, dass nicht mehr als 40 Anfragen pro Sitzung gestellt werden.

Die zweiten werden vom ioBroker generiert, da diese dann physisch erzeugt werden können und nicht mehr vom Adapter an das Gateway weitergeleitet werden können.

## GA-Tool
Mit dem GA-Tool lassen sich die Eigenschaften von GAs einfach ändern.

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. zeigt den GA-Baum und den ausgewählten GA-Baum.
2. Im Abschnitt „Eigenschaften“ den Namen des ausgewählten GA angeben.
3. iobroker-Flags setzen
4. GA DPT einstellen
5. anerkannter Akt GA
6. anerkannter Staat GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. Zeigen Sie die Zustands-Handlungs-Beziehung.
2. Falls eine Beziehung besteht, kann sie entfernt werden.

Besteht keine Beziehung, kann durch Klicken auf (2) für die ausgewählte GA (1) eine neue erstellt werden.
Im Dialog (3) kann der Peer ausgewählt werden.

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Wenn mehrere GAs Eigenschaften geändert werden sollen, verwenden Sie die Mehrfachauswahl. Diese Funktion ist nur für GAs ohne Beziehung verfügbar.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. ausgewählte GAs
2. Zu ändernde Eigenschaften
3. Es ist keine Änderung möglich

### Direkte Verbindung zwischen Nicht-KNX- und KNX-Systemen und umgekehrt
Seit Adapterversion 2.0.6 ist es möglich, den Status eines Nicht-KNX-ioBrokers direkt mit einem GA zu verknüpfen. Dadurch lassen sich Uhrzeit, Datum, beliebige Status oder Informationen an KNX übertragen. (Kleiner Tipp: Sie können jede Ihrer IoT-Komponenten direkt mit einem GA in KNX verbinden, z. B. einen Homematic-Taster mit einem KNX-GA oder einen KNX-Tastensensor mit Ihrem Sonos-Player.) Die Status können mit `GroupValueRead` ausgelesen werden. Ändert sich der Status, wird er automatisch in KNX aktualisiert. Umgekehrt wird bei einer Änderung in KNX das verknüpfte Nicht-KNX-IoT-Gerät aktualisiert.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. Wählen Sie das GA aus, mit dem eine Verbindung hergestellt werden soll.
2. Zeigen Sie die ausgewählte GA an.
3. Diese GA muss das **write**-Attribut besitzen.
4. Wählen Sie einen gültigen Datenpunkttyp (wenn diese nicht übereinstimmen, funktioniert es nicht).
5. Es ist nicht zulässig, eine Akt-Zustands-Beziehung zu haben.
6. Schaltfläche zur Auswahl eines Nicht-KNX-Objekts zur Verknüpfung mit

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. Wählen Sie das Nicht-KNX-Objekt aus, das Sie verknüpfen möchten.
2. Klicken Sie auf OK, wenn Sie fertig sind.

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

KNX-GA ist nun **(1)** direkt mit dem Nicht-KNX-iobroker **(2)** verknüpft. Mit **(3)** kann diese Verknüpfung aufgehoben werden.

## Geplante Funktionen
* esf-import
* GA-Mon Busüberwachungstool

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->
## Versionen
### 2.0.39 (05.04.2026)
* Unterstützung für ETS 6.4.1 hinzugefügt.
* Fehlerbehebung
* Aktualisierungen der Abhängigkeiten

### 2.0.38 (01.03.2026)
* 0

### 2.0.37 (20.02.2026)
* Aktualisierungen der Abhängigkeiten
* Fehlerbehebung in der Adapterkonfiguration

### 2.0.35 (05.02.2026)
* Aktualisierungen der Abhängigkeiten
* Fehlerbehebung in GA-Tools
* Funktionserweiterungen in GA-Tools

### 2.0.33 (22.6.2025)
* Problem mit instabiler KNX-Verbindung gelöst

### 2.0.31 (22.05.2025)
* Das Adapter-Importschema für ETS 6.3.1 wurde aktualisiert.
* nodejs >= 22 ist erforderlich

### 2.0.30 (22.12.2024)
* GUI-Fehler behoben, Überarbeitung der GA-Tools gestartet

### 2.0.29 (11.12.2024)
* Das Adapter-Importschema für ETS 6.3.0 wurde aktualisiert.
* nodejs >= 20 ist erforderlich

### 2.0.28
* Lizenzbezogene Daten aktualisieren und Paketversion korrigieren

### 2.0.27 (02.05.2024)
* Das Adapter-Importschema für ETS 6.2.2 wurde aktualisiert.
* UTF-8-Fehler behoben

### 2.0.26 (28.03.2024)
* Das Adapter-Importschema für ETS 6.2.1 wurde aktualisiert.
* nodejs >= 18 ist erforderlich

### 2.0.25 (03.03.2024)
* Das Adapter-Importschema für ETS 6.2.0 wurde aktualisiert.
* kleinere Fehlerbehebungen

### 2.0.24 (24.11.2023)
* Das Adapter-Importschema für ETS 6.1.1 wurde aktualisiert.

### 2.0.23 (11.10.2023)
* Falscher Gateway-Port nach Adapter-Upgrade korrigiert
* Erlauben Sie selbstdefinierte Werte für Minimum und Maximum.
* einige weitere kleinere Korrekturen

### 2.0.22 (04.07.2023)
* Importspezifikation hinzugefügt, Probleme in GaTools behoben

### 2.0.21 (17.06.2023)
* Behobene Lizenzverwaltung

### 2.0.20 (16.06.2023)
* Lizenzverwaltung mit js-controller Version > 5 korrigiert

### 2.0.19 (29.05.2023)
* ETS V6.1.0-Import hinzugefügt
* Erforderliche Node-Version >= 16.13.1

### 2.0.18 (08.04.2023)
* Feste Sendeverzögerung
* kleine Änderungen

### 2.0.17 (14.10.2022)
* ETSv6.0.6-Import hinzugefügt
* Wesentliche Änderungen in der Benutzeroberfläche für die Adapterkonfiguration
* Behobene Änderung der Porteinstellungen für LAN-GW

### 2.0.16 (04.09.2022)
* ETSv6.0.5-Import hinzugefügt

### 2.0.15 (02.06.2022)
* Importfehler bei extrem großen KNX-Katalogdateien behoben
* Nicht erkannte Verbindungsabbrüche behoben

### 2.0.14 (08.04.2022)
* ETSv6.0.4 hinzugefügt (ersetzt 6.0.3)
* kleinere Fehlerbehebungen

### 2.0.13 (12.03.2022)
* ETSv5.7.7-Import hinzugefügt
* Fehler „unbekannter Wert“ behoben
* einige weitere kleinere Korrekturen

### 2.0.12 (25.02.2022)
* Fehlerhafte Behandlung von undefinierten DPs behoben
* Die Datenpunkttypen wurden aktualisiert
* Warnung bei inkompatiblem DPT in Zukunft beheben
Das Allerwichtigste: Ich bin schockiert über den Krieg in der Ukraine. Meine Gedanken sind bei den Menschen in der Ukraine.

Es tut mir unendlich leid, was ihnen und ihrem Land widerfährt. Es ist eine unmenschliche Schande.

Ich kann es nicht ändern, aber ich appelliere an alle: Seid Nachbarn und keine Feinde. Respektiert einander und bekämpft euch nicht selbst.

### 2.0.11
* Die Passwortverwaltung für Projekte aus dem aktualisierten ETS wurde korrigiert.

### 2.0.10
* Import von ETS 6.0.2-Projekten **ETS 6.0.1 nicht möglich**
* Fehlerbehebungen

### 2.0.9
* Import passwortgeschützter Projektdateien
* Fehlerbehebungen

### 2.0.8
* Fehler beim Schreiben ohne Bestätigung behoben
* Fehler in linkedState behoben

### 2.0.7
* Fehler behoben, der das Schreiben auf KNX verhinderte

### 2.0.6
* Problem beim ETSv6-Import behoben
* viele kleine Fehlerbehebungen
* GA-Tools directLink-Funktion implementiert

### 2.0.5
* Problem beim ETSv4-Import behoben
* Einige Meldungen wurden korrigiert
* Korrigierter DPT14.x-Mindest- und Maximalbereich

### 2.0.4
* korrigierte DPT9.xxx-Berechnung
* Datum und Uhrzeit DPT19.00x implementiert
* Behebung des verwirrenden Fehlers "Keine Lizenz"
* kleinere Fehlerbehebungen

### 2.0.3 (04.12.2021)
* korrigierte Zählung des ersten Datenpunkts
* Automatische Entfernung der alten V1-Lizenz, um Verwirrung nach dem Upgrade von V1 auf V2 zu vermeiden

### 2.0.1
* Problem mit der Lizenzannahme behoben

### 2.0.0 (15.11.2021) **Hauptversion**
* Wichtige Änderung! => Eine neue Lizenz ist erforderlich. V1-Lizenzen funktionieren nicht mehr. => V1-Business-Lizenzen können auf V2 umgestellt werden.
* vollständige Refaktorisierung von knx-admin
* Tool zur Verwaltung von GA in knx-admin hinzugefügt.
* Zahlreiche Fehler behoben (im knx-Stack, beim Importieren von ETS-Projekten, bei Verbindungsabbrüchen und Timeouts)
* Neue Datenpunkttypen hinzugefügt
* Import bis ETS V6 hinzugefügt.
* geänderte Lizenzverwaltung

### 1.0.46 (2021-03-23)
* Neue Admin-Oberfläche

### 1.0.45 (2021_03_22)
* Import von ETS v5.7.5-Projekten

### 1.0.44 (2021_01_22)
* Feste Bearbeitung von Gesetzen und Staaten
* Einige neue Datenpunkttypen hinzugefügt
* Behebung der Erkennung von Einrichtungen und Räumen sowie der Gerätezuweisung

### 1.0.42 (03.09.2020)
* Problem mit fehlender index_m.html-Datei behoben

### 1.0.41
* Fehler im GroupValue_Response-Ereignis behoben
* korrigierte Verbindung zu Gira GW

### 1.0.40
* Einige Importfehler für ETS 5.7.x wurden behoben.
* Fehler im GroupValue_Response-Ereignis behoben

### 1.0.39
* Importfehler behoben

### 1.0.38
* Einige Importfehler wurden behoben
* Warnung anzeigen, wenn die Importdatei passwortgeschützt ist

### 1.0.37 (31.01.2010)
* Aktualisierung für ETS 5.7.3 Import

### 1.0.36 (2019-10-16)
* Einige Fehler behoben

### 1.0.35 (2019-09-15)
* Feste dauerhafte Wiederverbindungen, falls kein Verkehr auf dem KNX-Bus herrscht

### 1.0.34 (2019-09-15)
* Änderungen am Importer zur Erkennung der Projekt-ID

### 1.0.33 (2019-09-12)
* Fehler beim Schreiben in den Bus behoben
* Einheiten zu Staaten hinzugefügt
* Fehler "Lesen/Schreiben von undefiniertem Wert" behoben

### 1.0.32 (03.09.2019)
* Aktualisierter Importer für ETS V5.7.2, einige Änderungen im KNX-Stack-Zustandsautomaten

### 1.0.31
* Einige Fehlerbehebungen beim ETS5.7.2-Importer
* kleine Änderungen im KNX-Stack-Zustandsautomaten
* Die physische Adresse wurde (erneut) zum Admin-Konfigurationsdialog hinzugefügt.
* Fehler bei der Gerätebaumgenerierung behoben

### 1.0.30
* Neuer Importer für ETS5.7.2 knxproj-Dateien
* Erweiterte akzeptierte Datenpunkttypen
* Neues Adapterkonfigurationsmenü
* Es wurde ein Schalter implementiert, mit dem der Benutzer entscheiden kann, ob für Binärwerte "true" und "false" oder "0" oder "1" verwendet werden soll.
* Fehler in GroupValue_Read behoben
* Implementierte einen Selektor für die lokale Netzwerkschnittstelle für die KNX-zu-Gateway-Kommunikation
* Erweitertes Statusobjekt für spätere Funktionen
* Einige kleinere Fehler wurden behoben.

### 1.0.20
* Fehler bei der Verarbeitung von KNX-Datenpaketen behoben, der bei periodischen Neuverbindungen auftrat
* Fehler im KNX-Projektdatei-Upload-Verfahren behoben

### 1.0.19
* Für DPT1.x wurde die Behandlung auf wahr/falsch zurückgesetzt.

### 1.0.18
* Problem beim Hochladen von ETS5.6.x-Projektdateien behoben
* Die Werte für "boolean" wurden von 1 und 0 auf true false geändert.
* Die Erkennung der Rolleneinstellung für DPT1.x wurde korrigiert.
* Problem behoben: DPT16.xxx schreibt Werte < 14 Byte auf den KNX-Bus.

### 1.0.17 (2018-08-16)
* Verbesserte Zustandsverarbeitung
* Konfigurierbaren Paketpreis hinzufügen
* Fehler in "Nur neue Objekte importieren" behoben

### 1.0.15 (2018-07-18)
* Ändere ChID bei erneuter Verbindung
* Beim Startvorgang auf Antwort des Statuskanals warten oder Timeout auslösen

### 1.0.13 (2018-07-04)
* Wegfall von Sonderzeichen beim Import
* kleinere Fehlerbehebungen

### 1.0.12 (2018-06-19)
* reduzierte und sortierte Protokollausgabe
* kleinere Fehlerbehebungen
* NEUE Funktion: Status/Wert des Statusobjekts vom KNX-Bus anfordern

### 1.0.11 (2018-05-27)
* Problem mit dem DPT1-Korrekturwert behoben
* Problem mit der Wiederverbindung behoben
* weitere kleinere Optimierungen und Fehlerbehebungen

### 1.0.10 (2018-05-04)
* Lokalen Port bei undefiniertem Verbindungsstatus schließen
* Erweiterter Debug-Level über adapter-config hinzugefügt
* viele Korrekturen

### 1.0.9 (2018-04-29)
* Umstellung auf zustandsbasierte Verarbeitung
* Problem mit "Disconnect-Request" behoben
* Die Verbindungsbehandlung wurde mit knxd geändert.
* viele kleine Korrekturen

### 1.0.8 (2018-04-04)
* geänderte Paketwarteschlange
* Behobene Bestätigung beim Senden an den KNX-Bus
* viele kleine Korrekturen

### 1.0.7 (16.03.2018)
* Adapter-Sperre beim Hochladen von Projekten behoben

### 1.0.6 (11.03.2018)
* Verbindungsproblem behoben
* korrigierter Paketzähler

### 1.0.5 (2018-03-01)
* Leere Objekte korrigiert, bezogen auf DPT1 (Fehlermeldung \[object Object\] unbekannter Eingabewert)
* feste Pfadvariable
* Fehler behoben, der bei GAs auftrat, deren Name ein "/" enthielt (beim Projektimport)
* Beginn der Implementierung der übergreifenden Eigenschaftsaktualisierung auf dem entsprechenden DPT (beim Projektimport)

### 1.0.4 (2018-02-27)
* Schema-Update für die Raumaufzählung in ETS 5.6

### 1.0.2 (2018-02-27)
* Kleiner Fehler aus

### 1.0.1 (2018-02-26)
* Zertifikatsfehler behoben

### 1.0.0 (2018-02-25)
* Ersetzung des gebrauchten KNX-Stacks durch einen selbstgebauten Stack
* Implementierung des vollständigen DPT-Modells gemäß den „Systemspezifikationen, Interworking, Datapointtypes“ der KNX Association
* Verbesserung der Verbindungsbehandlung für Tunnelverbindungen
* Aktualisierung der Adapterkonfigurationsschnittstelle für die Verwendung mit Admin3
* "Delay Slider" wurde aufgrund des neuen KNX-Stacks entfernt.
* viele weitere kleine Änderungen
* Die Werte nach dem Komma wurden auf den Skalenwert von DPT festgelegt.
* Implementierung des "Hinzufügen"-Modus für den KNX-Projekt-Upload (vorhandene Objekte bleiben unverändert, nur neue Objekte werden hinzugefügt)

### 0.8.6 (2017-06-17)
* einige kleinere Fehlerbehebungen
* Schieberegler einfügen, um eine Sendeverzögerung für langsame KNX/LAN-Gateways einzustellen und so Verbindungsverluste zu verhindern.

### 0.8.5 (2017-06-05)
* Projektlader neu erstellen, dpt13-Fix

### 0.8.3 (2017-04-24)
* Aktualisierung des entsprechenden Status im Aktionskanal hinzugefügt
* Fehlerbehebung bei der Statusvisualisierungsaktualisierung
* Optimierter knxproj-Upload

### 0.8.2 (2017-02-26)
* Implementierung der Gerätekonfigurationsanalyse aus knxproj
* bessere Wahl des Zustands/Werts von DP-Objekten

### 0.8.1 (2017-02-06)
* Problem mit dem DPT1-Schalter behoben

### 0.8.0 (2017-02-xx) erscheint demnächst
### 0.7.3 (2016-12-22)
* (chefkoch009) Weitere DPTs werden unterstützt
* schnellerer Start
* Generierung der Raumliste mit Geräteabhängigkeiten implementiert

### 0.7.2 (2016-11-20)
* (chefkoch009) hat die notwendigen Abhängigkeiten hinzugefügt

### 0.7.1 (19.11.2016)
* (chefkoch009) Unterstützung von Standard-KNX/LAN-Gateways.

### 0.7.0 (13.10.2016)
* (chefkoch009) Unterstützung des Projektexports

### 0.6.0 (2016-07-20)
* (chefkoch009) Neugestaltung

### 0.5.0
* (vegetto) include vis widget

#### 0.4.0
* (bluefox) Fehlerbehebung bei Grunt

#### 0.2.0
* (bluefox) Erstveröffentlichung

## Ausnahmen und Fehler
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der Entwickler kann keine weiteren spezifischen Informationen über System/Konfiguration/Benutzer/Umgebung abrufen. Falls keine Lizenz gefunden wird, werden auch die Adapterversion und die Host-ID gemeldet.

Vielen Dank für die Unterstützung und Hilfe!
* Blaufuchs
* foxriver76

## Changelog

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available
on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License

The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2026 K.Ringmann info@punktnetzwerk.net

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)