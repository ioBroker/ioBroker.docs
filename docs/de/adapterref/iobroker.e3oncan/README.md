---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: NSo23ZZJFyEvhcKaN9Y+hI611HavqaS+hfFbhTdWT7w=
---
![Logo](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/e3oncan-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/e3oncan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Tests:** ![Test und Freigabe](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## E3oncan-Adapter für ioBroker
> Eine deutsche Version dieser Dokumentation ist verfügbar: [README.de.md](README.de.md)

## Inhaltsverzeichnis
- [Übersicht](#overview)
- [Neuerungen in Version 1.0.0](#whats-new-in-v100)
- [Neuerungen in Version 0.11.x](#whats-new-in-v011x)
- [Schnellstart](#quick-start)
- [Konfigurationsleitfaden](#configuration-guide)
- [Schritt 1 – CAN-Adapter](#step-1--can-adapter)
- [Schritt 2 – Gerätescan und Energiezählererkennung](#step-2--device-scan-and-energy-meter-detection)
- [Schritt 3 – Datenpunktscan](#step-3--data-point-scan)
- [Schritt 4 – Aufgaben und Zeitpläne](#step-4--assignments-and-schedules)
- [Bustopologieanalyse](#bus-topology-analysis)
- [e3oncan datapoints tab](#e3oncan-datapoints-tab)
- [Datenpunkte lesen](#reading-data-points)
- [Schreiben von Datenpunkten](#writing-data-points)
- [Datenpunkte und Metadaten](#data-points-and-metadata)
- [Energiezähler](#energy-meters)
- [E380 Daten und Einheiten](#e380-data-and-units)
- [E3100CB Daten und Einheiten](#e3100cb-data-and-units)
- [FAQ und Einschränkungen](#faq-and-limitations)
- [Spenden](#donate)
- [Änderungsprotokoll](#changelog)

---

## Übersicht
Geräte der Viessmann E3-Serie (One Base-Ökosystem) tauschen große Datenmengen über den CAN-Bus aus. Dieser Adapter greift auf diese Kommunikation zu und stellt die Daten in ioBroker zur Verfügung.

Zwei Betriebsarten funktionieren unabhängig voneinander und können kombiniert werden:

| Modus | Beschreibung |
|---|---|
| **Erfassen** | Lauscht passiv auf dem CAN-Bus und extrahiert Daten in Echtzeit, während Geräte sie austauschen. Es werden keine Anfragen gesendet. Ideal für sich schnell ändernde Werte wie z. B. den Energiefluss. |
| **UDSonCAN** | Liest und schreibt aktiv Datenpunkte mithilfe des UDS-Protokolls (Universal Diagnostic Services over CAN). Erforderlich für Sollwerte, Zeitpläne und Daten, die nicht spontan übertragen werden. |

Welche Modi verfügbar sind, hängt von Ihrer Gerätetopologie ab. Siehe Abschnitt [Weitere Details zur Gerätetopologie finden Sie in der Diskussion unter [https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34]. Anregungen für die Verwendung des Adapters finden Sie in der Diskussion zu Anwendungsfällen.](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35).

Wichtige Teile dieses Adapters basieren auf dem Projekt [open3e](https://github.com/open3e).

Eine Python-basierte Implementierung, die ausschließlich Daten sammelt und MQTT verwendet, ist unter [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) verfügbar.

---

## Was ist neu in Version 1.0.0?
### Registerkarte „Datenpunkte“
Eine neue **e3oncan-Datenpunktseite** ist direkt an die Instanzzeile des Adapters in der ioBroker-Instanzansicht angeheftet. Klicken Sie auf die<img src="admin/icon_open_tab.svg" height="20"> Klicken Sie auf die Schaltfläche in der Instanzzeile, um sie zu öffnen. Sie bietet eine eigene Benutzeroberfläche zur Verwaltung von Zeitplänen und Erfassungseinstellungen pro Gerät und Datenpunkt – für alltägliche Änderungen muss nicht der vollständige Adapterkonfigurationsdialog geöffnet werden.

### Automatische Erkennung von Energiezählern
Energiezähler (E380 und E3100CB) werden nun **automatisch** während des Gerätescans durch passives CAN-Abhören auf beiden CAN-Kanälen erkannt. Statusnamen werden automatisch anhand der erkannten CAN-Adresse und des Kanals vergeben. Die Aktivierung/Deaktivierung und die Erfassungsverzögerung für jeden Energiezähler werden ausschließlich im Datenpunkte-Tab konfiguriert.

Beim ersten Start nach einem Upgrade von einer früheren Version wird die vorherige Energiezählerkonfiguration automatisch migriert.

### Automatische Erkennung von Collect-fähigen Geräten
Während des Datenpunkt-Scans überwacht der Adapter passiv den CAN-Bus, um zu erkennen, welche Geräte den Sammelmodus unterstützen. Erkannte Geräte werden im Gerätekarten-Header des Datenpunkt-Tabs mit einem Stecknadelsymbol hervorgehoben.

### Flexibler Datenpunktscan
Die neue Option „Datenpunktwerte während des Scans im Objektbaum speichern“ steuert, ob die aktuellen Werte während des Scans im Objektbaum gespeichert werden. Ist die Option deaktiviert, aktualisiert der Adapter weiterhin Werte und Metadaten aller vorhandenen Datenpunktobjekte – lediglich neue Objekte werden während des Scans nicht erstellt. Dies ist nützlich, um Metadaten nach einer Migration zu aktualisieren, ohne alle Zustandswerte neu schreiben zu müssen.

### Bustopologieanalyse
Nach dem Scan der Datenpunkte analysiert der Adapter automatisch die während des Scans erfassten Bustopologiedaten und generiert eine Zusammenfassung. Das Ergebnis wird in zwei neuen Zuständen im Kanal `info` gespeichert:

- `info.topology` – strukturiertes JSON mit allen gefundenen UDS-zugänglichen Geräten und Topologieelementen (über alle Topologiematrizen hinweg dedupliziert).
- `info.topologyHtml` – eine gerenderte HTML-Tabelle, farblich nach Bustyp (CanInternal, CanExternal, CanRaw, ModBus, ServiceBus) gekennzeichnet, mit einem UDS-Badge für Geräte, die auch über UDS erreichbar sind. Zur Anzeige in vis, jarvis oder jedem HTML-fähigen Widget geeignet.

---

## Was ist neu in Version 0.11.x?
### Aktualisierte Datenpunktstrukturen (Aktion beim Upgrade erforderlich)
Version 0.11.0 enthält aktualisierte Definitionen für zahlreiche Datenpunkte – neue Variantentypen, zusätzliche Metadaten (Beschreibung, Einheit, Verknüpfungen) und eine überarbeitete Datenformatverarbeitung. **Wenn Sie von Version 0.10.x aktualisieren, führen Sie bitte einen Gerätescan und anschließend einen vollständigen Datenpunktscan durch,** um die neuen Definitionen und Metadaten auf Ihren ioBroker-Objektbaum anzuwenden.

Eine detaillierte Liste der geänderten Datenpunkte finden Sie im Abschnitt [Änderungsprotokoll für Datenpunkte](lib/data-points.md#changelog-of-data-point-definitions).

### Variantendatenpunkte und Geräteformatkonfiguration
Der Adapter verarbeitet nun variable Datenpunkte – Datenpunkte, deren Struktur von der Gerätekonfiguration abhängt (z. B. Temperatureinheit °C/°F, Datums-/Zeitformat). Während des Gerätescans wird die entsprechende Formatkonfiguration (Datenpunkt 382) gelesen und gespeichert. Anschließend wird automatisch der passende Codec für jedes Gerät angewendet.

### Metadaten zu Datenpunktobjekten
Datenpunktobjekte im ioBroker-Objektbaum enthalten nun Metadaten: Beschreibung, physikalische Einheit, Lese-/Schreibzugriffsflag und, falls verfügbar, Links zu weiteren Informationen. Die Metadaten vorhandener Objekte werden bei jedem Datenpunktscan aktualisiert und auch wiederhergestellt, wenn ein Datenpunktobjekt gelöscht und neu erstellt wird (hinzugefügt in Version 0.11.1).

---

## Schnellstart
**Voraussetzungen**

- Ein USB-zu-CAN- oder CAN-Adapter, der an den externen oder internen CAN-Bus Ihres Viessmann E3-Geräts angeschlossen ist.
- Ein Linux-basiertes Hostsystem (nur Linux wird unterstützt).
- Der CAN-Adapter ist aktiv und im System sichtbar, z. B. als `can0` (Überprüfung mit `ifconfig`).
- Einzelheiten zur Einrichtung des CAN-Adapters finden Sie im [open3e Projekt-Wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry).

**Wichtig:** Stellen Sie sicher, dass kein anderer UDSonCAN-Client (z. B. open3e) ausgeführt wird, während Sie diesen Adapter zum ersten Mal einrichten. Parallele UDS-Kommunikation führt zu Fehlern in beiden Anwendungen.

**Ersteinrichtung – auf einen Blick**

1. Installieren Sie den Adapter und öffnen Sie dessen Konfigurationsdialog.
2. Konfigurieren Sie Ihren/Ihre CAN-Adapter auf der Registerkarte **CAN-Adapter** und speichern Sie die Einstellungen.
3. Suchen Sie auf der Registerkarte **Liste der UDS-Geräte** nach E3-Geräten.
4. Suchen Sie auf der Registerkarte **Liste der Datenpunkte** nach Datenpunkten (dauert bis zu 5 Minuten).
5. Richten Sie auf der Registerkarte **Aufgaben** Lesepläne ein und speichern Sie diese.

Die detaillierten Schritte werden in den nachfolgenden Abschnitten [Konfigurationsleitfaden](#configuration-guide) beschrieben.

**Nach einem Node.js-Upgrade:** Die von diesem Adapter verwendeten nativen Module müssen bei einer Änderung der Node.js-Version neu kompiliert werden. Falls der Adapter nach einem Node.js-Upgrade nicht startet, stoppen Sie ihn, führen Sie in der Kommandozeile den Befehl ``iob rebuild`` aus und starten Sie ihn anschließend erneut.

---

## Konfigurationsleitfaden
### Schritt 1 – CAN-Adapter
Öffnen Sie den Adapterkonfigurationsdialog und wechseln Sie zur Registerkarte **CAN-Adapter**.

- Geben Sie den Namen Ihrer CAN-Schnittstelle ein (Standard: `can0`).
- Aktivieren Sie **Mit Adapter verbinden** für jede Schnittstelle, die Sie verwenden möchten.
- Drücken Sie **SPEICHERN**. Die Adapterinstanz wird neu gestartet und verbindet sich mit dem CAN-Bus.

Falls Sie über einen zweiten CAN-Bus verfügen (z. B. einen internen Bus), konfigurieren Sie diesen hier als zweiten Adapter. Nach der Konfiguration des zweiten Adapters wird ein zweiter Reiter „Zuweisungen“ angezeigt.

### Schritt 2 – Gerätescan und Energiezählererkennung
Wechseln Sie zum Tab **Liste der UDS-Geräte** und klicken Sie auf die Schaltfläche **Scannen**.

Der Scan dauert einige Sekunden. Sie können den Fortschritt im Adapterprotokoll verfolgen (öffnen Sie dazu einen zweiten Browsertab).
Alle im Bus gefundenen E3-Geräte werden aufgelistet. Sie können die Geräte in der zweiten Spalte umbenennen – diese Namen dienen als Kennungen im Objektbaum von ioBroker.
- Klicken Sie nach Abschluss auf **SPEICHERN**. Die Instanz wird neu gestartet.

Während des Gerätescans liest der Adapter auch die Datenformatkonfiguration des Geräts (Datenpunkt 382), einschließlich der Temperatureinheiten (°C oder °F) und des Datums-/Zeitformats. Diese Daten werden gespeichert und bei nachfolgenden Datenpunktscans verwendet.

**Energiezählererkennung**

Während der Gerätescan läuft, empfängt der Adapter passiv Signale vom CAN-Bus der Energiezähler E380 und E3100CB. Es ist keine zusätzliche Scanzeit erforderlich – die Erkennung erfolgt parallel. Das Ergebnis wird gespeichert und angezeigt.

- Im Adapterkonfigurationsdialog (Registerkarte **Liste der UDS-Geräte**) als Textzusammenfassung.
- Auf der Seite **e3oncan datapoints** als einzelne Karten für jeden erkannten Zählertyp (siehe [unten](#e3oncan-datapoints-tab)).

### Schritt 3 – Datenpunktscan
Gehen Sie zum Tab **Liste der Datenpunkte**, klicken Sie auf **Scan starten…** und bestätigen Sie mit **OK**.

**Bitte haben Sie Geduld** – der Scan kann bis zu 5 Minuten dauern. Der Fortschritt wird im Adapterprotokoll angezeigt.

Was der Scan bewirkt:

- Ermittelt alle verfügbaren Datenpunkte für jedes Gerät.
- Fügt jedem Datenpunktobjekt Metadaten (Beschreibung, Einheit, Lese-/Schreibzugriff) hinzu.
- Legt die physikalischen Einheiten anhand der in Schritt 2 ermittelten Geräteformatkonfiguration fest.
- Erstellt den vollständigen Objektbaum für jedes Gerät in ioBroker.
- Erkennt Collect-fähige Geräte durch passives Abhören ihrer Zeitsignale im CAN-Bus (keine zusätzliche Scanzeit erforderlich – läuft parallel). Für jedes erkannte Gerät wird im Gerätekarten-Header der Seite **e3oncan datapoints** ein Stecknadelsymbol angezeigt.

Dieser Schritt ist für die Nutzung im Nur-Lese-Modus nicht unbedingt erforderlich, wird aber **dringend empfohlen** – und ist **erforderlich**, wenn Sie Datenpunkte beschreiben möchten.

**Speichern der Datenpunktwerte im Objektbaum während des Scans**

Standardmäßig schreibt der Scan den aktuellen Wert jedes Datenpunkts in den Objektbaum (Zustände `json`, `raw`, `tree`). Sie können dieses Verhalten über die Option **Datenpunktwerte während des Scans im Objektbaum speichern** oberhalb der Scan-Schaltfläche anpassen. Wenn diese Option deaktiviert ist, aktualisiert der Adapter Werte und Metadaten bereits vorhandener Datenpunktobjekte, erstellt aber keine neuen – diese werden automatisch beim ersten Datenempfang nach dem Scan angelegt.

Diese Option ist nützlich, wenn Sie eine große Anzahl von Statusänderungen während des Scans vermeiden möchten (z. B. auf Systemen mit vielen Geräten). Wenn Sie zuvor einen Scan mit gespeicherten Werten durchgeführt haben und nun einen sauberen Zustand wünschen, können Sie die Unterobjekte `json`, `raw` oder `tree` eines beliebigen Geräts aus dem ioBroker-Objektbaum löschen – der Adapter erstellt sie automatisch neu, sobald er die nächsten Daten empfängt. **Hinweis:** Das gleichzeitige Löschen einer großen Anzahl von Objekten führt dazu, dass ioBroker viele interne Ereignisse gleichzeitig auslöst, was kurzzeitig zu einem Anstieg der RAM-Auslastung führen kann. Löschen Sie die Objekte in kleinen Gruppen, wenn Ihr System unter Speichermangel leidet.

**Hinweis zu Verlaufsadaptern:** Das Löschen von Objekten löscht **nicht** die vom Verlaufsadapter (History, InfluxDB, SQL) gespeicherten Verlaufsdaten. Die aufgezeichneten Werte bleiben im Backend des Adapters erhalten und werden in den Diagrammen wieder angezeigt, sobald die Status-ID neu erstellt wurde. Die Konfiguration des Verlaufsabonnements (das „Aktiviert“-Flag des Objekts) geht jedoch beim Löschen eines Objekts verloren und muss für das neue Objekt manuell wieder aktiviert werden.

**Warnung:** Löschen Sie niemals den Kanal `info` (z. B. `e3oncan.0.info`). Er enthält Scan-Ergebnisse, Informationen zur Energiezählererkennung, Verzögerungen, aktive Flags, Bus-Topologie-Zusammenfassungen und den CAN-Verbindungsstatus. Durch das Löschen gehen Konfigurationsdaten verloren, die nicht automatisch wiederhergestellt werden können.

**Bustopologieanalyse**

Nach Abschluss des Scans generiert der Adapter automatisch eine Bustopologie-Zusammenfassung und speichert diese in zwei Zuständen im Kanal `info`: `info.topology` (JSON) und `info.topologyHtml` (HTML). Weitere Details finden Sie unter [Bustopologieanalyse](#bus-topology-analysis).

Nach dem Scan können Sie die gefundenen Datenpunkte auf der Seite **e3oncan datapoints** durchsuchen und verwalten (siehe [unten](#e3oncan-datapoints-tab)).

### Schritt 4 – Aufgaben und Zeitpläne
Die empfohlene Methode zum Konfigurieren von Lesezeitplänen und des gerätespezifischen Erfassungsmodus ist die **e3oncan-Datenpunkte**-Seite (siehe [unten](#e3oncan-datapoints-tab)).

**Energiezähler**

Wenn der Gerätescan E380- oder E3100CB-Energiezähler erkannt hat, wird auf der Seite **e3oncan-Datenpunkte** für jeden erkannten Zähler eine Karte angezeigt. Aktivieren Sie die Datenerfassung mit dem Schalter **Erfassen** auf der Karte. Legen Sie im Feld **Verzögerung (s)** das minimale Intervall zwischen den Wertaktualisierungen in ioBroker fest. Der Standardwert von 5 Sekunden wird empfohlen, da Energiezähler mehr als 20 Werte pro Sekunde übertragen. Die Einstellung auf 0 führt zu einer erheblichen Belastung von ioBroker.

Klicken Sie nach Abschluss der Arbeit auf **Speichern & Schließen**. Überprüfen Sie die Objektstruktur, um sicherzustellen, dass Daten erfasst werden.

---

## Bustopologieanalyse
Nach dem Scan der Datenpunkte analysiert der Adapter alle während des Scans erfassten Bustopologiedaten und speichert das Ergebnis in zwei Zuständen im Kanal `info`:

| Status | Rolle | Inhalt |
|---|---|---|
| `info.topology` | `json` | Strukturiertes JSON: Liste der über UDS zugänglichen Geräte und aller Topologieelemente, dedupliziert über alle Topologiematrizen hinweg |
| `info.topologyHtml` | `html` | Gerenderte HTML-Tabelle, farblich nach Bustyp gekennzeichnet, mit einem **UDS**-Badge auf Geräten, die auch UDS-fähig sind |

**Anzeigen der HTML-Tabelle**

Die einfachste Möglichkeit, die Topologie in ioBroker anzuzeigen, besteht in der Verwendung eines Dashboard-Tools, das HTML-Zustände rendern kann:

- **jarvis**: Füge ein **stateHTML**-Widget hinzu → wähle `e3oncan.x.info.topologyHtml` aus.
- **vis / vis2**: Fügen Sie ein **einfaches – String (unmaskiert)**- oder **HTML**-Widget hinzu → wählen Sie `e3oncan.x.info.topologyHtml`.

**Hinweis:** Die Zustände `info.topology` und `info.topologyHtml` sind möglicherweise zu groß, um im Standarddialog des ioBroker-Admin-Zustandseditors angezeigt zu werden. Dies ist eine bekannte Einschränkung der Admin-Benutzeroberfläche für große Zeichenkettenzustände. Die Zustände sind korrekt geschrieben und können von Skripten und Widgets normal verwendet werden.

---

## E3oncan-Datenpunkte-Registerkarte
Die Seite **e3oncan-Datenpunkte** dient als zentrale Anlaufstelle zum Durchsuchen von Datenpunkten und zum Konfigurieren von UDSonCAN-Lesezeitplänen und des gerätespezifischen Erfassungsmodus. Sie öffnet sich in einem neuen Browser-Tab, wenn Sie in der ioBroker-Administrationsansicht auf die Schaltfläche **Datenpunkte** in der Instanzzeile des Adapters klicken.

**Durchsuchen von Datenpunkten**

Alle Geräte und erkannten Energiezähler werden als ausklappbare Karten angezeigt, die standardmäßig zusammengeklappt sind, sodass Sie Ihr gesamtes System auf einen Blick erfassen können. Klicken Sie auf eine Kartenüberschrift, um sie auszuklappen. Das Suchfeld filtert nach Name oder ID, und passende Karten werden automatisch ausgeklappt.

Wurde für ein Gerät noch kein Datenpunktscan durchgeführt, erscheint oben auf der Seite ein Warnhinweis. Wurde zwar ein Scan durchgeführt, die in Version 1.x eingeführte automatische Datenerfassung jedoch noch nicht ausgeführt, empfiehlt ein Informationsbanner einen neuen Datenpunktscan. Dieser Hinweis kann mit der Schaltfläche „Nicht mehr anzeigen“ dauerhaft ausgeblendet werden.

**Gerätekarten**

Jede Gerätekarte listet ihre Datenpunkte mit ID, Name, Codec und Zeitplaneinstellungen auf. Die Schaltfläche „Erfassen“ und die minimale Aktualisierungszeit werden in der Kartenüberschrift angezeigt. Wurde während des Scans der Datenpunkte Datenverkehr vom Gerät erfasst, erscheint zur Bestätigung ein grünes Stecknadelsymbol in der Kartenüberschrift. Sind Datenpunkte geplant, erscheint ein grünes Symbol mit der Aufschrift „**N geplant**“. Klicken Sie darauf, um die Karte zu erweitern und nur die geplanten Datenpunkte anzuzeigen. Klicken Sie erneut auf das Symbol, um den Filter zu entfernen. Durch Klicken auf die Kartenüberschrift wird der Filter entfernt und die Karte – je nachdem, ob sie durch das Symbol geöffnet wurde – ein- oder ausgeblendet.

**Energiezählerkarten**

Wurden während des Gerätescans Energiezähler erkannt (siehe [Schritt 2](#step-2--device-scan-and-energy-meter-detection)), erscheint für jeden erkannten Zähler eine Karte oben auf der Seite. Aktivieren Sie die Datenerfassung mit dem Schalter **Erfassen** und legen Sie im Feld **Verzögerung (s)** das Mindestintervall zwischen Wertaktualisierungen in ioBroker fest.

**Terminplanung**

Für jeden Datenpunkt können Sie Folgendes tun:

- Prüfen Sie **Beim Start** – der Datenpunkt wird einmal beim Start des Adapters ausgelesen.
- Geben Sie ein **Intervall (s)** ein – der Datenpunkt wird in diesem Intervall wiederholt ausgelesen.

Beide Optionen lassen sich kombinieren. Verwenden Sie den Zeitplanfilter (Alle / Bei Start / Intervall), um sich schnell auf bereits geplante Datenpunkte zu konzentrieren.

**Topologie**

Die Schaltfläche **Topologie** in der Symbolleiste öffnet das Bus-Topologiediagramm in einem modalen Dialog. Das Diagramm wird nach jedem Datenpunkt-Scan automatisch generiert (siehe [Bustopologieanalyse](#bus-topology-analysis)). Die Schaltfläche ist deaktiviert, bis Topologiedaten verfügbar sind.

**Ersparnis**

Klicken Sie auf **Speichern**, um Ihre Änderungen anzuwenden, ohne den Tab zu schließen. **Speichern & Schließen** speichert die Änderungen und schließt den Tab. Sie gelangen zurück zur Instanzenansicht. **Verwerfen & Schließen** schließt den Tab, ohne die Änderungen zu speichern – ein Neustart des Adapters wird nicht ausgelöst. Ein Symbol für **Nicht gespeicherte Änderungen** wird angezeigt, sobald Änderungen ausstehen.

**Hinweis:** Beim Speichern werden die Zeitpläne aller in diesem Tab angezeigten Geräte anhand des aktuellen UI-Zustands neu erstellt. Zeitpläne für hier nicht aufgeführte Geräte (z. B. direkt im Adapterkonfigurationsdialog hinzugefügt) bleiben unverändert. Falls für dasselbe Gerät an beiden Stellen Zeitpläne vorhanden sind, hat beim Speichern der Tab „Datenpunkte“ Vorrang. Doppelte Einträge werden automatisch entfernt.

---

## Datenpunkte lesen
Die Datenpunkte werden automatisch gemäß den von Ihnen konfigurierten Zeitplänen ausgelesen. Die Werte erscheinen im Objektbaum von ioBroker unter dem Gerätenamen und sind in die Unterobjekte `json`, `raw` und `tree` mit lesbaren Namen und Metadaten unterteilt.

**Auslesen eines bestimmten Datenpunkts auf Anfrage**

Sie können jederzeit beliebige Datenpunkte anfordern, indem Sie den Status `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` bearbeiten und eine Liste von Datenpunkt-IDs eingeben, beispielsweise `[3350, 3351, 3352]`. Ist der Datenpunkt auf dem Gerät verfügbar, wird der Wert in der Objektstruktur angezeigt und kann in Leseplänen verwendet werden.

Der numerische Scanbereich ist derzeit begrenzt (z. B. 256–3338 in Version 0.11.0). Verwenden Sie `udsReadByDid`, um Datenpunkte außerhalb dieses Bereichs zu untersuchen.

---

## Schreiben von Datenpunkten
Der Schreibvorgang ist bewusst einfach gehalten: Der Wert des entsprechenden Zustands in ioBroker wird geändert und gespeichert, **ohne** das Kontrollkästchen `Acknowledged` (Bestätigung) zu aktivieren. Der Adapter erkennt den nicht bestätigten Schreibvorgang und sendet ihn an das Gerät.

Etwa 2,5 Sekunden nach dem Schreiben liest der Adapter den Datenpunkt vom Gerät zurück und speichert den bestätigten Wert. Wird der Status danach nicht bestätigt, überprüfen Sie das Adapterprotokoll auf Fehlerdetails.

**Whitelist der beschreibbaren Datenpunkte**

Das Schreiben ist auf Datenpunkte auf einer Positivliste beschränkt, die hier gespeichert ist:

```
e3oncan.0.<DEVICE>.info.udsDidsWritable
```

Sie können die Liste erweitern, indem Sie diesen Status bearbeiten. Speichern Sie ihn **ohne** `Acknowledged` zu aktivieren.

Manche Datenpunkte können selbst dann nicht geändert werden, wenn sie auf der Whitelist stehen – das Gerät gibt eine negative Antwort zurück. Der Adapter versucht es dann mit einem alternativen Dienst (nur interner CAN-Bus). Überprüfen Sie Schreibvorgänge immer, indem Sie kontrollieren, ob der Wert bestätigt wurde.

---

## Datenpunkte und Metadaten
Detaillierte Informationen darüber, wie Datenpunkte strukturiert sind, wie Variantendatenpunkte und Metadaten funktionieren und wie Temperatur-/Datums-/Zeitformate behandelt werden, finden Sie in [data-points.md](lib/data-points.md).

---

## Energiezähler
Energiezähler werden während des Gerätescans automatisch erkannt. Eine manuelle Konfiguration ist nicht erforderlich. Der Adapter weist jedem Zähler basierend auf seinem Fundort einen Statusnamen im Objektbaum von ioBroker zu.

| Kanal | CAN-Adresse | Bundesstaat |
|---|---|---|
| UDS CAN | 98 | `e380` |
| 2. CAN | 98 | `e380_98` |
| 2. CAN | 97 | `e380_97` |
| 2. CAN | 97 | `e380_97` |

`e380` (ohne Suffix) wird für die CAN-Adresse 98 auf dem UDS-CAN-Kanal verwendet, um die Abwärtskompatibilität mit bestehenden Installationen zu gewährleisten. `e3100cb` wird immer für den E3100CB verwendet.

Die Erfassungsverzögerung (standardmäßig 5 s) kann pro Zählertyp auf der Seite **e3oncan-Datenpunkte** angepasst werden. Änderungen werden nach einem Neustart des Adapters wirksam.

### E380 Daten und Einheiten
Es werden bis zu zwei E380-Energiezähler unterstützt. Die Datenpunkt-IDs hängen von der CAN-Adresse des Geräts ab:

- **CAN-Adresse 97:** Datenpunkte mit geraden IDs
- **CAN-Adresse 98:** Datenpunkte mit ungeraden IDs

| ID | Daten | Einheit |
|---|---|---|
| 592, 593 | Wirkleistung L1, L2, L3, Gesamt | W |
| 594, 595 | Blindleistung L1, L2, L3, Gesamt | var |
| 596, 597 | Absoluter Strom L1, L2, L3; cosPhi | A, — |
| 598, 599 | Spannung L1, L2, L3; Frequenz | V, Hz |
| 600, 601 | Kumulierte Importe, Exporte | kWh |
| 602, 603 | Gesamtwirkleistung, Gesamtblindleistung | W, var |
| 604, 605 | Kumulierte Importe | kWh |

### E3100CB Daten und Einheiten
| ID | Daten | Einheit |
|---|---|---|
| 1385_01 | Kumulierter Import | kWh |
| 1385_02 | Kumulierte Exporte | kWh |
| 1385_03 | Zustand: −1 = Einspeisung / +1 = Versorgung | — |
| 1385_04 | Gesamtleistung (Wirkleistung) | W |
| 1385_08 | Wirkleistung L1 | W |
| 1385_12 | Wirkleistung L2 | W |
| 1385_16 | Wirkleistung L3 | W |
| 1385_05 | Blindleistung gesamt | var |
| 1385_09 | Blindleistung L1 | var |
| 1385_13 | Blindleistung L2 | var |
| 1385_17 | Blindleistung L3 | var |
| 1385_06 | Stromstärke, absolut L1 | A |
| 1385_10 | Stromstärke, absolut L2 | A |
| 1385_14 | Stromstärke, absolut L3 | A |
| 1385_07 | Spannung L1 | V |
| 1385_11 | Spannung L2 | V |
| 1385_15 | Spannung L3 | V |

---

## Häufig gestellte Fragen und Einschränkungen
**Warum sollte man Collect und UDSonCAN zusammen verwenden?**

Collect liefert Ihnen Echtzeitdaten für alle zwischen den Geräten ausgetauschten Daten – schnell veränderliche Werte wie den Energiefluss und langsam veränderliche Werte wie Temperaturen, die alle sofort aktualisiert werden. UDSonCAN ermöglicht Ihnen den Zugriff auf Daten, die nicht spontan übertragen werden, typischerweise Sollwerte und Konfigurationswerte. Die Kombination beider Systeme bietet Ihnen ein umfassendes und aktuelles Bild Ihres Systems.

**Welche Geräte unterstützen den Sammelmodus?**

Das Collect-Protokoll ist derzeit bekannt für:

- Vitocal / HPMUMASTER (Sammel-ID `0x693`, interner CAN-Bus)
- Vitocharge VX3 und Vitoair / EMCUMASTER (Sammel-ID `0x451`, externer und interner CAN-Bus)

Die Collect-CAN-IDs werden während des Gerätescans automatisch anhand des UDS-Gerätenamens zugewiesen. Geräte, die oben nicht aufgeführt sind, erhalten keine automatische Collect-ID; diese kann manuell in der Adapterkonfiguration eingegeben werden.

Kann ich open3e gleichzeitig verwenden?

Ja, unter bestimmten Bedingungen. Wenn Sie in diesem Adapter ausschließlich den Collect-Modus verwenden, kann open3e ohne Einschränkungen parallel dazu ausgeführt werden. Wenn Sie hier UDSonCAN verwenden, sollten Sie open3e nicht gleichzeitig für dieselben Geräte ausführen – dies führt zu sporadischen Kommunikationsfehlern in beiden Anwendungen.

**Der Adapter funktioniert nach einem Node.js-Upgrade nicht mehr. Was kann ich tun?**

Dieser Adapter verwendet native Module, die bei einer Änderung der Node.js-Version neu kompiliert werden müssen. Stoppen Sie den Adapter, führen Sie in der Kommandozeile ``iob rebuild`` aus und starten Sie den Adapter anschließend neu. Sollte das Problem weiterhin bestehen, melden Sie es bitte.

**Was unterscheidet es vom open3e-Projekt?**

- Direkte Integration in ioBroker: Konfiguration über Dialoge, Daten direkt im Objektbaum sichtbar.
- Echtzeit-Erfassungsmodus zusätzlich zu UDSonCAN.
- Das Schreiben von Daten ist einfacher: Man ändert einfach einen Statuswert und speichert ihn, ohne eine Bestätigung abzugeben.
- Kein MQTT erforderlich (obwohl MQTT natürlich über die normale ioBroker-Konfiguration verfügbar ist).
Die 64-Bit-Ganzzahlkodierung für Schreibvorgänge ist auf Werte unter 2^52 (4.503.599.627.370.496) beschränkt. Die Dekodierung funktioniert über den gesamten 64-Bit-Bereich korrekt.

**Kann ich Datenpunkte außerhalb des Scanbereichs anfordern?**

Ja. Bearbeiten Sie den Status `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` und geben Sie eine Liste von Datenpunkt-IDs ein, z. B. `[3350, 3351, 3352, 3353]`. Verfügbare Datenpunkte werden in der Objektstruktur angezeigt und können in Leseplänen verwendet werden. Nicht verfügbare Datenpunkte führen zu einer Meldung „Negative Antwort“ im Protokoll.

---

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.1 (2026-05-11)
* (MyHomeMyData) Clicking the green scheduled badge on a device card filters the view to show only its scheduled data points; clicking the badge again or the card header restores the full view
* (MyHomeMyData) Fixed: saving from the datapoints tab now preserves inactive schedules (disabled in the old config UI) for full backward compatibility

### 1.0.0 (2026-05-06)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) Improved scan status detection: uses `udsDidsWritable` instead of `didsMetaDict` to reliably detect whether a data point scan has been performed
* (MyHomeMyData) Added re-scan recommendation hint in datapoints tab when a scan exists but Collect auto-detection has not yet been run

### 1.0.0-beta.2 (2026-05-02)
* (MyHomeMyData) Fixed: saving schedules in the datapoints tab could leave stale entries under certain conditions
* (MyHomeMyData) Added Topology button to the datapoints tab; opens the bus topology diagram in a modal dialog

### 1.0.0-beta.1 (2026-04-30)
* (MyHomeMyData) Bus topology analysis is now generated automatically after the data point scan; results are stored in `info.topology` (JSON) and `info.topologyHtml` (HTML); see Readme for details
* (MyHomeMyData) Input validation added for interval and delay fields in the datapoints tab — only positive integers are accepted

### 1.0.0-beta.0 (2026-04-26)
* (MyHomeMyData) Introduced new e3oncan datapoints webUI pinned to the adapter's instance row
* (MyHomeMyData) Energy meters (E380, E3100CB) are now auto-detected during the device scan by passive CAN listening on both CAN channels
* (MyHomeMyData) State names for energy meters are assigned automatically based on CAN address and channel; see Readme for details
* (MyHomeMyData) Energy meter Collect toggle and delay are now configured exclusively in the e3oncan datapoints page; changes take effect after adapter restart
* (MyHomeMyData) On first run after upgrade, the active setting is automatically migrated from the previous adapter configuration
* (MyHomeMyData) Collect-capable devices are now auto-detected during the data point scan by passive CAN listening; a pin icon is shown in the device card header for each detected device
* (MyHomeMyData) Added option to suppress storing of data point values during data point scan

### 0.11.3 (2026-05-03)
* (MyHomeMyData) The accidentally mentioned data points 1415-1418 have been removed from the changelog of version 0.11.0

### 0.11.2 (2026-05-02)
* (MyHomeMyData) Added "What's new in v0.11.x" section to Readme with upgrade notes for data point structure changes

### 0.11.1 (2026-04-23)
* (MyHomeMyData) Improved robustness: Receiving a data point of length zero is treated as a "negative response"
* (MyHomeMyData) The metadata is now also restored after a data point is deleted
* (MyHomeMyData) Aligned test cases for German system language

### 0.11.0 (2026-04-14)
* (MyHomeMyData) To take full advantage of the variant data points and metadata, please perform a device scan followed by a data point scan
* (MyHomeMyData) Added handling for variant data points and for device's data format configuration, refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/lib/data-points.md for details
* (MyHomeMyData) Added metadata to several data points, e.g. description, unit, link to further info
* (MyHomeMyData) During scan of data points now metadata are added to data point objects
* (MyHomeMyData) Changed handling of writable data points; this info now also is available within definition of data point; however, there is no change to handling of the whitelist of writables
* (MyHomeMyData) During device scan the information about used data formats (data point 382) is evaluated
* (MyHomeMyData) Updated structure of many data points; for details see this [changelog](lib/data-points.md#changelog-of-data-point-definitions)

### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.