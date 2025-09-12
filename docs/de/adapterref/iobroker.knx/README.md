---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: OgC3W9ajAU4i8QZBvIlBJIUkTzpBBHJaHAiFBrWv2gs=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Inhaltsverzeichnis
* [Beschreibung](#description)
* [Anforderungen](#Anforderungen)
* [Funktionen](#Funktionen)
* [Installation](#installation)
* [Adapterkonfiguration](#adapter-configuration)
* [Installieren Sie die Lizenz](#install-the-license)
* [Konfigurationsschnittstelle](#configuration-interface)
* [Objekte](#Objekte)
* [Verwendung](#Verwendung)
* [Datenpunkttypen (DPT)](#data-point-types-dpt)
* [So funktioniert der Import](#how-the-import-works)
* [Problemvermeidung](#avoidance-of-problems)
* [GA-Tool](#ga-tool)
* [Direkte Verbindung vom Nicht-KNX-Zustand zum KNX-Zustand und umgekehrt](#direct-link-non-knx-state-to-knx-vice-verse)
* [Geplante Funktionen](#planned-features)
* [Änderungsprotokoll](#changelog)

## Beschreibung
en: Dieser Adapter ermöglicht den Import von `knxproj` Dateien aus der ETS. Er generiert die Übersetzung zwischen KNX-Gruppenadressen und ioBroker und ordnet die Geräte den Räumen zu (insb. für MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Es lässt sich mit Standard-KNX/LAN-Gateways verbinden.

**Achtung: Mit der Umstellung auf den KNX-Adapter Version 2.x hat sich die Lizenzierung geändert. Eine neue Lizenz erhalten Sie unter [https://iobroker.net](https://iobroker.net/)**

**Sie sollten außerdem den iobroker js-controller UND den Admin auf die neueste Version aktualisieren.**

Bevor Sie beginnen: Jeder DPT von com.Objects sollte in Ihrem ETS-Projekt festgelegt sein. Jedes Gerät sollte in Ihre Anlagenstruktur einsortiert sein.

## Anforderungen
* Knotenversion >= 14.15.4
* Admin-Version >= 5.2.0
* js-controller Version >=3.3.20

Ohne diese Voraussetzung ist der Adapter nicht installierbar bzw. funktioniert nicht ordnungsgemäß.

## Merkmale
* Importieren der Datei „knxproj“
* Generieren einer ETS-ähnlichen Objektstruktur
* Finden und Kombinieren von Akt-Kanal und Zustands-Kanal (Heuristik)
* Aktualisierung aller Zustände beim Start
* keine Cloud oder Internet erforderlich
* Ausgeben eines READ an den KNX-Bus, während auf das Statusobjekt geschrieben wird
* Bearbeiten und Ändern von GA-Objekten mit GA-Tools
* Zustands-Akt-Beziehungen mit GA-Tools bearbeiten und ändern
* NEU: Erlaubt eine direkte Verbindung zu Nicht-KNX-Zuständen (und umgekehrt)
* NEU: Adapterantworten auf GroupValueRead an ein per DirectLink verbundenes Objekt
* NEU: Import von passwortgeschützten Projektdateien (danke an aKzenT)

###Installation
Dieser Adapter kann nur mit npm installiert werden. Die Installation über GitHub funktioniert **nicht**.

##Adapterkonfiguration
Öffnen Sie nach der Installation dieses Adapters die Adapterkonfiguration.

###Installieren Sie die Lizenz
Der erste Schritt besteht darin, die Lizenz anzuwenden. Wenn Sie keine Lizenz installiert haben, werden 500 Datenpunkte angewendet.

* (1) zeigt Ihre System-ID, diese benötigen Sie um eine Lizenz zu erhalten
* (2) Klicken Sie hier, um Ihre Lizenz anzuwenden

![knxV2-first-start-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Wenn Sie bereits eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erstellt haben, können Sie diese in (2) einfügen, ODER Sie können sie direkt online erwerben, indem Sie auf (1) klicken.

![knxV2-2-1-Install-Lizenz-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Wenn Sie auf (1) geklickt haben, geben Sie Ihre iobroker.net-Kontoanmeldung ein.

![knxV2-2-2-Install-Lizenz-Online-Mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Wenn Ihre Angaben korrekt sind, werden Ihnen alle Lizenzen angezeigt, die Sie erworben haben. Wählen Sie die Lizenz aus, die Sie verwenden möchten.

![knxV2-2-3-Install-Lizenz-Online-Mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Wenn dies erfolgreich war, speichern Sie es.

![knxV2-2-4-Install-Lizenz-Online-Mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Das ist alles. Klicken Sie unten auf dieser Seite auf die Schaltfläche zum Speichern.

### Konfigurationsschnittstelle
![knxV2-2-5-Install-Lizenz-online-angewendet-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP: IPv4 des KNX-LAN Gateways.
2. KNX-Gateway-Port: Standard ist Port 3671.
3. Physikalische Adresse: Physikalische Adresse der iobroker knx-Instanz. **Wichtig: Dies ist nicht die physikalische Adresse des LAN-Gateways!** und darf nicht auf 0 enden.
4. KNX-Pakete pro Sekunde: Dies begrenzt die Paketrate. Wenn das KNX Lan Gateway zu oft erneut eine Verbindung herstellt oder vorübergehend nicht erreichbar ist, reduzieren Sie diese Rate.
5. lokale iobroker IP: Wählen Sie die IP / Schnittstelle, an die der Adapter gebunden wird
6. Loglevel: Normalerweise ist es das Level „Info“, zum Debuggen erhöhen Sie das Level.
7. Nur neue Datenpunkte importieren: Dies ist standardmäßig aktiviert. Im Falle einer Deaktivierung werden neue GAs generiert UND vorhandene GAs neu erstellt.
8. Schaltfläche „Datei hochladen“: Hier steht Drag-and-Drop zur Verfügung oder Sie klicken auf den Dateiauswahldialog. Hier können Sie Ihren ETS-Export im Format „knxproj“ hochladen.

Nach erfolgreichem Import zeigt ein Dialog die Anzahl der importierten Objekte an. Klicken Sie nun auf „Speichern & Schließen“, und der Adapter sollte starten.
Beim Start liest der Adapter alle Gruppenadressen mit Lese- und Schreib-Flags. Dies kann eine Weile dauern und Ihren KNX-Bus stark belasten. Die Werte in Ihrer Visualisierung werden jedoch nach dem Start aktualisiert.
Das Hochladen einer passwortgeschützten Datei ist derzeit nicht möglich.

9. Host-ID: Dies ist eine spezielle ID des iobroker-Hosts. Diese ID wird für die Generierung und Validierung der Lizenz benötigt.
10. GA-Tools: Toolbox für schnell wechselnde GAs

### Objekte
Hier ist unter knx.0 der Gruppenadressbaum wie in Ihrem ETS-Projekt. Zum Ändern der Eigenschaften verwenden Sie das GA-Tool.

### Verwendung
Wenn der Adapter erfolgreich startet, stehen Ihnen Ihre Datenpunkte für alles zur Verfügung, was Sie tun möchten.

### Datenpunkttypen (DPT)
Alle DPTs gemäß "System Specifications, Interworking, Datapointtypes" der KNX Association sind verfügbar. Das bedeutet, dass Sie zwei Arten von Informationen erhalten können: 1) einen Wert oder eine Zeichenfolge 2) durch Kommas getrennte Werte oder ein Array von Werten (im Moment weiß ich nicht, was der bessere Weg ist, damit umzugehen).

Beispielsweise wird ein DPT5.001 als vorzeichenloser Integer mit 8 Bit kodiert. Dies ergibt einen einzelnen Wert. Der DPT3.007 (Dimmsteuerung) wird als 1Bit(Boolean)+3Bit(unsigned Int) kodiert.
Dies führt beispielsweise zu einem Wert wie „0,5“, wobei „0“ für „Verringerung“ und „5“ für die Anzahl der Intervalle steht.

### So funktioniert der Import
1. Lesen aller Kommunikationsobjektreferenzen (COR):

Kombination der Gruppenadressreferenz-ID mit dem DPT des entsprechenden COR (falls vorhanden).

2. Generierung der Gruppenadressstruktur (GAS):

Generieren des GAS basierend auf GAR-IDs und Festlegen des DPT (falls noch nicht geschehen)

3. Feststellung des Staates, in dem eine Handlung stattfindet:

In ETS-Exporten sind keine Informationen zu Status- und Aktadressen enthalten. Der Adapter analysiert alle GAs mit "Status" oder "State". Bei zwei GAs mit einer Ähnlichkeit von über 90 % ist eine Adresse der Akteur und die andere der Status. Es wird auch geprüft, ob die DPTs ähnlich sind. Daher ist es nicht einfach, ein Paar zu finden, wenn die GA-Benennung nicht konsistent ist.

4. Flag-Check in der Gerätekonfiguration:

Die Flags werden wie folgt behandelt:

| KNX | KNX | KNX | ioBroker | ioBroker | |
    |-------|-------|----------|----------|----------|----------------------------------------------------------|
| Lesen | Schreiben | Senden | Lesen | Schreiben | Erklärung |
| - | - | - | - | - | der Wert wird durch GroupValueRead aktualisiert |
| x | - | - | x | x | Das Senden eines beliebigen Werts in diesem Status löst einen GroupValueRead aus |
| - | x | - | - | x | schreibe den Wert mit GroupValueWrite auf KNX |
| - | - | x | x | - | der Statuswert wird von GroupValueResponse aktualisiert |
| x | - | x | x | x | Das Senden eines beliebigen Werts in diesem Status löst einen GroupValueRead aus |

6. Erstellen von Datapoint Peers (DPP):

Ein DPP wird erstellt, wenn GA, GAR und DPT gültig sind. Dies sind die DPP, mit denen der Adapter arbeitet.
Falls DPT in einem GA fehlt, weil es nicht gefunden werden konnte, wird der DPP nicht erstellt. Dies kann mit dem GA-Tool erfolgen.

7. Beim Adapterstart:

Alle mit "Read" gekennzeichneten GAs werden beim Start überprüft. Dies kann zu einem höheren Busverkehr führen. Am Ende sind alle Zustände aktuell.

### Vermeidung von Problemen
* saubere ETS-Programmierung und noch wichtiger saubere ETS-Programmierung und am wichtigsten saubere ETS-Programmierung
* Weisen Sie die DPTs zu!!
* einheitliche Kennzeichnung der GA-Bezeichnungen (z. B. „EG Wohnen Decke Licht schalten“ und „EG Wohnen Decke Licht schalten Status“)
* Vermeidung von Sonderzeichen ",./;&%$§[]" (kann Probleme bei der Gaserzeugung verursachen)
* Prüfen Sie, ob das KNX/LAN GW erreichbar ist. Ist dies nicht der Fall, versucht der Adapter kontinuierlich, eine Verbindung herzustellen.
* Physikalische Adresse richtig wählen (wichtig bei Verwendung von Linienkopplern). !!! ACHTUNG: die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN-Gateways und darf nicht auf 0 enden!!!
* Der Port der LAN-Schnittstelle ist in der Regel 3671
* Aufgrund der Möglichkeit der Statusabfrage ist eines zu beachten: Es muss sichergestellt werden, dass nicht mehr als 40 Anfragen pro Sekunde vom ioBroker generiert werden, da diese dann physikalisch generiert werden können

können vom Adapter nicht mehr an das Gateway weitergegeben werden.

## GA-Tool
Das GA-Tool erleichtert das Ändern der Eigenschaften von GAs.

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. zeigt den GA-Baum und ausgewählte GA
2. im Eigenschaftsbereich der Name des ausgewählten GA
3. Setzen Sie die Iobroker-Flags
4. GA DPT einstellen
5. anerkannte Handlung GA
6. anerkannte staatliche GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. Zeigen Sie die Zustands-Akt-Beziehung
2. Wenn eine Beziehung besteht, kann sie entfernt werden

Falls keine Beziehung besteht, kann durch Klicken auf (2) für die ausgewählte GA (1) eine neue erstellt werden.
Im Dialog (3) kann der Peer ausgewählt werden.

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Wenn mehrere GAs Eigenschaften ändern müssen, verwenden Sie die Mehrfachauswahl. Diese Funktion funktioniert nur für GAs ohne Beziehung.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. ausgewählte GAs
2. Zu ändernde Eigenschaften
3. Es ist keine Änderung möglich

### Direkte Verknüpfung eines Nicht-KNX-Zustands mit KNX und umgekehrt
Seit Adapterversion 2.0.6 ist es möglich, einen Nicht-KNX-ioBroker-Zustand direkt mit einem GA zu verknüpfen. Dies kann verwendet werden, um Uhrzeit, Datum, beliebige Zustände oder Informationen auf KNX anzuwenden. (Kleiner Hinweis: Sie können jede Ihrer IoT-Komponenten direkt mit einem GA in KNX verknüpfen (z. B. einen Homematic-Taster mit einem KNX-GA verknüpfen oder einen KNX-Tastensensor mit Ihrem Sonos-Player verknüpfen). Die Zustände können mit einem GroupValueRead gelesen werden. Bei einer Zustandsänderung wird dieser automatisch auf KNX aktualisiert. Wenn Sie den Zustand auf KNX ändern, wird auch das verknüpfte Nicht-KNX-IoT-Gerät aktualisiert.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. Wählen Sie das GA aus, mit dem Sie eine Verbindung herstellen möchten
2. Zeigen Sie die ausgewählte GA
3. Dieser GA muss das Attribut **write** haben
4. Wählen Sie einen gültigen Datenpunkttyp (wenn sie nicht übereinstimmen, funktioniert es nicht)
5. Es ist nicht erlaubt, eine Akt-Zustand-Beziehung zu haben
6. Schaltfläche zum Auswählen eines Nicht-KNX-Objekts zur Verknüpfung mit

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. Wählen Sie das Nicht-KNX-Objekt aus, das Sie verknüpfen möchten
2. Klicken Sie auf OK, wenn Sie fertig sind

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

Nun ist KNX-GA **(1)** direkt mit dem Nicht-KNX-IObroker **(2)** verknüpft. Mit **(3)** können Sie diese Verknüpfung löschen.

## Geplante Funktionen
* esf-import
* GA-Mon-Busüberwachungstool

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->
## Versionen
### 2.0.33 (22.6.2025)
* Problem mit instabiler KNX-Verbindung behoben

### 2.0.31 (22.05.2025)
* Das Adapter-Importschema für ETS 6.3.1 wurde aktualisiert
* nodejs >= 22 ist erforderlich

### 2.0.30 (22.12.2024)
* GUI-Fehler behoben, Neugestaltung von GA-Tools gestartet

### 2.0.29 (11.12.2024)
* Das Adapter-Importschema für ETS 6.3.0 wurde aktualisiert
* nodejs >= 20 ist erforderlich

### 2.0.28
* Lizenzbezogene Daten aktualisieren und Paketversion korrigieren

### 2.0.27 (02.05.2024)
* Das Adapter-Importschema für ETS 6.2.2 wurde aktualisiert
* UTF-8-Fehler behoben

### 2.0.26 (28.03.2024)
* Das Adapter-Importschema für ETS 6.2.1 wurde aktualisiert
* nodejs >= 18 ist erforderlich

### 2.0.25 (03.03.2024)
* Das Adapter-Importschema für ETS 6.2.0 wurde aktualisiert
* kleine Fehlerbehebungen

### 2.0.24 (24.11.2023)
* Das Adapter-Importschema für ETS 6.1.1 wurde aktualisiert

### 2.0.23 (11.10.2023)
* falscher GW-Port nach Adapter-Upgrade korrigiert
* selbstdefinierte Werte für Min und Max zulassen
* einige andere kleine Korrekturen

### 2.0.22 (04.07.2023)
* Importspezifikation hinzugefügt, Probleme in GaTools gelöst

### 2.0.21 (17.06.2023)
* Lizenzhandhabung behoben

### 2.0.20 (16.06.2023)
* Lizenzhandhabung mit js-controller Version > 5 behoben

### 2.0.19 (29.05.2023)
* ETS V6.1.0-Import hinzugefügt
* erforderliche Knotenversion >= 16.13.1

### 2.0.18 (08.04.2023)
* Sendeverzögerung behoben
* kleine Änderungen

### 2.0.17 (14.10.2022)
* ETSv6.0.6-Import hinzugefügt
* wesentliche Änderungen in der Adapterkonfigurations-Benutzeroberfläche
* Änderung der Porteinstellungen für LAN-GW behoben

### 2.0.16 (04.09.2022)
* ETSv6.0.5-Import hinzugefügt

### 2.0.15 (02.06.2022)
* Importfehler bei extrem großen KNX-Katalogdateien behoben
* nicht erkannte Verbindungsabbrüche behoben

### 2.0.14 (08.04.2022)
* ETSv6.0.4 hinzugefügt (6.0.3 überschreiben)
* kleine Fehlerbehebungen

### 2.0.13 (12.03.2022)
* ETSv5.7.7-Import hinzugefügt
* Fehler „unbekannter Wert“ behoben
* einige andere kleine Korrekturen

### 2.0.12 (25.02.2022)
* Handhabung undefinierter DP behoben
* Datenpunkttypen aktualisiert
* Warnung bei inkompatiblem DPT zukünftig beheben
* Das größte Problem von allen: Der Krieg in der Ukraine schockiert mich. Meine Gedanken sind bei den Menschen in der Ukraine. Es tut mir unendlich leid, was ihnen und ihrem Land widerfährt. Es ist eine unmenschliche Schande.
* kann es nicht richten, aber ich appelliere an alle: Seid Nachbarn und nicht Feinde. Respektiert den anderen und streitet nicht miteinander.

### 2.0.11
* Korrektur der Passwortbehandlung für Projekte aus aktualisiertem ETS

### 2.0.10
* Import von ETS6.0.2 Projekten **ETS6.0.1 nicht möglich**
* Fehlerbehebungen

### 2.0.9
* passwortgeschützte Projektdateien importieren
* Fehlerbehebungen

### 2.0.8
* Fehler mit unbestätigtem Schreiben behoben
* Fehler im LinkedState behoben

### 2.0.7
* Fehler behoben, bei dem das Schreiben auf KNX nicht möglich war

### 2.0.6
* Problem beim ETSv6-Import behoben
* viele kleine Bugfixes
* GA-Tools DirectLink-Funktion implementiert

### 2.0.5
* Problem beim ETSv4-Import behoben
* einige Nachrichten korrigiert
* DPT14.x Min.- und Max.-Bereich korrigiert

### 2.0.4
* DPT9.xxx-Berechnung korrigiert
* Datum und Uhrzeit DPT19.00x implementiert
* Verwirrender „Keine Lizenz“-Fehler behoben
* kleine Fehlerbehebungen

### 2.0.3 (04.12.2021)
* Feste Zählung des 1. Datenpunkts
* alte V1-Lizenz automatisch entfernen", um Verwirrung nach dem Upgrade von V1 auf V2 zu vermeiden

### 2.0.1
* Problem mit der Lizenzakzeptanz behoben

### 2.0.0 (15.11.2021) **Hauptversion**
* Wichtige Änderung! => Neue Lizenz erforderlich. V1-Lizenzen funktionieren nicht. => V1-Business-Lizenzen können auf V2 geändert werden.
* komplettes Refactoring von knx-admin
* Tool zur Handhabung von GA in knx-admin hinzugefügt
* Viele Fehler behoben (im KNX-Stack, beim Importieren von ETS-Projekten, erneuter Verbindung und Timeouts)
* neue Datenpunkttypen hinzugefügt
* Import bis ETS V6 hinzugefügt
* geändertes Lizenzmanagement

### 1.0.46 (23.03.2021)
* Neue Admin-GUI

### 1.0.45 (2021_03_22)
* Import von ETS v5.7.5-Projekten

### 1.0.44 (2021_01_22)
* feste Akt- und Zustandsbehandlung
* einige neue Datenpunkttypen hinzugefügt
* Einrichtungs- und Raumerkennung sowie Gerätezuordnung korrigieren

### 1.0.42 (03.09.2020)
* Problem mit fehlender index_m.html behoben

### 1.0.41
* Fehler beim GroupValue_Response-Ereignis behoben
* Anbindung an Gira GW korrigiert

### 1.0.40
* einige Importfehler für ETS 5.7.x behoben
* Fehler beim GroupValue_Response-Ereignis behoben

### 1.0.39
* Importfehler behoben

### 1.0.38
* einige Fehler beim Import behoben
* Warnung anzeigen, wenn Importdatei passwortgeschützt ist

### 1.0.37 (31.01.2010)
* Update für ETS 5.7.3 Import

### 1.0.36 (16.10.2019)
* einige Fehler behoben

### 1.0.35 (15.09.2019)
* Permanente Neuverbindungen behoben, wenn kein Verkehr auf dem KNX-Bus besteht

### 1.0.34 (15.09.2019)
* Änderungen am Importer zum Erkennen der Projekt-ID

### 1.0.33 (12.09.2019)
* Fehler beim Schreiben auf den Bus behoben
* Einheiten zu Staaten hinzugefügt
* Fehler „Lesen/Schreiben von undefiniertem“ behoben

### 1.0.32 (03.09.2019)
* aktualisierter Importer für ETS V5.7.2, einige Änderungen in der KNX-Stack-Zustandsmaschine

### 1.0.31
* einige Korrekturen am ETS5.7.2-Importer
* kleine Änderungen in der KNX-Stack-Zustandsmaschine
* Physische Adresse zum Admin-Konfigurationsdialog hinzugefügt (erneut)
* Fehler bei der DeviceTree-Generierung behoben

### 1.0.30
* neuer Importer für ETS5.7.2 knxproj-Dateien
* erweiterte akzeptierte Datenpunkttypen
* neues Adapter-Konfigurationsmenü
* Implementierung eines Schalters, mit dem der Benutzer entscheiden kann, ob für Binärwerte "true" und "false" oder "0" oder "1" verwendet werden soll
* Fehler in GroupValue_Read behoben
* Implementierung eines Selektors für die lokale Netzwerkschnittstelle für die KNX-zu-Gateway-Kommunikation
* erweitertes State Object für spätere Funktionen
* einige andere kleine Fehler behoben

### 1.0.20
* Fehler im Umgang mit KNX-Datenpaketen behoben, der zu periodischen Neuverbindungen führte
* Fehler im Upload-Verfahren für KNX-Projektdateien behoben

### 1.0.19
* Zurückgesetzt auf True/False-Behandlung für DPT1.x

### 1.0.18
* Upload-Problem mit ETS5.6.x-Projektdateien behoben
* Werte für "boolean" von 1 und 0 auf true false umgestellt
* Erkennung des Rollensatzes für DPT1.x zum Umschalten behoben
* Fehler beim Schreiben von DPT16.xxx auf den KNX-Bus mit Werten < 14Byte behoben

### 1.0.17 (16.08.2018)
* Bessere Zustandsverarbeitung
* Konfigurierbare Paketrate hinzufügen
* Fehler bei „Nur neue Objekte importieren“ behoben

### 1.0.15 (18.07.2018)
* ChID bei erneuter Verbindung ändern
* beim Startlesen auf Antwort des Statuskanals oder Timeout warten

### 1.0.13 (04.07.2018)
* Eliminierung von Sonderzeichen beim Import
* kleine Fehlerbehebungen

### 1.0.12 (19.06.2018)
* reduzierte und sortierte Protokollausgabe
* kleine Fehlerbehebungen
* NEUE Funktion: Status/Wert des Statusobjekts vom KNX-Bus anfordern

### 1.0.11 (27.05.2018)
* Problem mit dem DPT1-Korrekturwert behoben
* Problem beim erneuten Verbinden behoben
* weitere kleine Optimierungen und Fehlerbehebungen

### 1.0.10 (04.05.2018)
* Schließen des lokalen Ports bei undefiniertem Verbindungsstatus
* Erweiterte Debug-Ebene über Adapter-Konfiguration hinzugefügt
* viele Fehlerbehebungen

### 1.0.9 (29.04.2018)
* auf zustandsweise Verarbeitung umgestellt
* "Disconnect-Request" behoben
* geänderte Verbindungsbehandlung mit knxd
* viele kleine Korrekturen

### 1.0.8 (04.04.2018)
* geänderte Paketwarteschlange
* ACK beim Senden an den KNX-Bus behoben
* viele kleine Korrekturen

### 1.0.7 (16.03.2018)
* Adapter-Sperre beim Hochladen von Projekten behoben

### 1.0.6 (11.03.2018)
* Verbindungsproblem behoben
* Paketzähler korrigiert

### 1.0.5 (01.03.2018)
* leere Objekte behoben, bezogen auf DPT1 (Fehlermeldung \[Objekt Objekt\] unbekannter Eingabewert)
* feste Pfadvariable
* Fehler mit GAs behoben, die ein "/" im Namen enthielten (beim Projektimport)
* Beginnen Sie mit der Implementierung einer übergreifenden Eigenschaftsaktualisierung auf dem entsprechenden DPT (beim Projektimport).

### 1.0.4 (27.02.2018)
* Schema-Update für die Raumaufzählung mit ETS 5.6

### 1.0.2 (27.02.2018)
* kleine Fehler beseitigt

### 1.0.1 (26.02.2018)
* Zertifikatsfehler behoben

### 1.0.0 (25.02.2018)
* Ersetzen des verwendeten KNX-Stacks durch einen eigenen, von Grund auf neu erstellten Stack
* DPT-Komplettumfang gemäß „System Specifications, Interworking, Datapointtypes“ der KNX Association implementiert
* Härtung der Verbindungsverarbeitung für Tunnelverbindungen
* Aktualisieren Sie die Adapter-Konfigurationsschnittstelle, um mit Admin3 bereit zu sein
* "Delay Slider" wegen des neuen KNX-Stacks entfernt
* viele weitere kleine Änderungen
* Nachkommawerte auf Skalenwert von DPT korrigiert
* Implementierung des „Hinzufügen“-Modus für den KNX-Projekt-Upload (vorhandene Objekte bleiben wie sie sind, nur neue Objekte werden hinzugefügt)

### 0.8.6 (17.06.2017)
* einige kleine Fehlerbehebungen
* Schieberegler einfügen, um eine Sendeverzögerung für langsame KNX/LAN-Gateways einzustellen und so Verbindungsverluste zu verhindern

### 0.8.5 (05.06.2017)
* Projektlader neu erstellt, dpt13-fix

### 0.8.3 (24.04.2017)
* Act-Kanal-Update des entsprechenden Status hinzugefügt
* Fehler im State-Vis-Update behoben
* optimierter knxproj-Upload

### 0.8.2 (26.02.2017)
* Gerätekonfigurationsanalyse von knxproj implementiert
* bessere Auswahl des Status/Werts von DP-Objekten

### 0.8.1 (06.02.2017)
* DPT1-Schalterproblem behoben

### 0.8.0 (2017-02-xx) kommt bald
### 0.7.3 (22.12.2016)
* (chefkoch009) mehr DPTs werden unterstützt
* schnellerer Start
* Generierung einer Raumliste mit Geräteabhängigkeiten implementiert

### 0.7.2 (20.11.2016)
* (chefkoch009) notwendige Abhängigkeiten hinzugefügt

### 0.7.1 (19.11.2016)
* (chefkoch009) Unterstützt standardmäßige KNX/LAN-Gateways.

### 0.7.0 (13.10.2016)
* (chefkoch009) Unterstützung beim Projektexport

### 0.6.0 (20.07.2016)
* (chefkoch009) Neugestaltung

### 0.5.0
* (vegetto) Vis-Widget einschließen

#### 0.4.0
* (Bluefox) Fehler mit Grunt beheben

#### 0.2.0
* (Bluefox) Erstveröffentlichung

## Ausnahmen und Fehler
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der Entwickler kann keine weiteren speziellen Informationen zum System/Konfiguration/Benutzer/Umgebung abrufen. Falls keine Lizenz gefunden wird, werden auch die Adapterversion und die Host-ID gemeldet.

## Vielen Dank für die Unterstützung und Hilfe
* Blaufuchs
* foxriver76

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2024 K.Ringmann <info@punktnetzwerk.net>

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