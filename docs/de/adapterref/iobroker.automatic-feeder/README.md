---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.automatic-feeder/README.md
title: ioBroker.automatic-feeder
hash: 9otIFz+O2XFgmf9NN+IoAXN+2ggtDnIgxrNY2bNJTLo=
---
![Logo](../../../en/adapterref/iobroker.automatic-feeder/admin/automatic-feeder.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.automatic-feeder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.automatic-feeder.svg)
![Anzahl der Installationen](https://iobroker.live/badges/automatic-feeder-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/automatic-feeder-stable.svg)
![NPM](https://nodei.co/npm/iobroker.automatic-feeder.png?downloads=true)
![Test und Freigabe](https://github.com/ssbingo/ioBroker.automatic-feeder/workflows/Test%20and%20Release/badge.svg)

# ioBroker.automatic-feeder

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

> ### 🔌 Passende Hardware – die **Feeder-Relais-** Zeitschaltuhr
>
> Sie möchten eine Einspeisung bauen und lieber eine fertige Zeitschaltuhr verwenden, anstatt Ihr eigenes Relais zu verdrahten? Dann schauen Sie sich die **[Feeder-Relais (Timer-Ersatzplatine)](https://github.com/ssbingo/timer-ersatzplatine)** an – eine ESP32-Zeitschaltuhr zum Selbstbau, die perfekt zu diesem Adapter passt ( [Online-Übersicht](https://ssbingo.github.io/timer-ersatzplatine/) ).
>
> **Es handelt sich um ein separates, eigenständiges Projekt – unabhängig vom Adapter.** Die Platine und der Adapter sind zwar aufeinander abgestimmt, aber völlig unabhängig voneinander: Der Adapter funktioniert auch ohne die Platine, und die Platine funktioniert ohne den Adapter.

---

## Adapter für automatische Zuführung für ioBroker

Dieser Adapter verwandelt jeden vorhandenen ioBroker-Schalter (z. B. eine smarte Steckdose, ein Relais, einen GPIO-Ausgang) in einen zeitgesteuerten **automatischen Futterautomaten** . Er schaltet den Ausgang für eine festgelegte Anzahl von Sekunden zu den von Ihnen konfigurierten Zeiten ein und berücksichtigt dabei Temperatur und Tag-Nacht-Rhythmus, sodass die Fütterung nie zum falschen Zeitpunkt erfolgt.

Dieses Dokument ist eine vollständige Bedienungsanleitung. Falls Sie den Adapter noch nie benutzt haben, lesen Sie ihn bitte von oben bis unten durch – die **Kurzanleitung** führt Sie in wenigen Minuten zur ersten Fütterung, der Rest erklärt jede Option im Detail.

> 🇩🇪 Deutsche Anleitung: [doc/de/README.md](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/de/README.md) · andere Sprachen: siehe [Dokumentation](#documentation) unten.

---

## Inhaltsverzeichnis

1. [Was der Adapter bewirkt](#1-what-the-adapter-does)
2. [Anforderungen](#2-requirements)
3. [Installation](#3-installation)
4. [Schnellstart](#4-quick-start--your-first-feeding)
5. [Die Einstellungsseite im Detail](#5-the-settings-page-in-detail)
6. [Objekte / Datenpunkte](#6-objects--data-points)
7. [Beispiele / Rezepte](#7-examples--recipes)
8. [Telegram-Benachrichtigungen](#8-telegram-notifications)
9. [Fehlerbehebung & Häufig gestellte Fragen](#9-troubleshooting--faq)
10. [Protokollierung und Debugging](#10-logging--debugging)
11. [Dynamische Fütterung – Hintergrund & Quellen](#11-dynamic-feeding--background--sources)

---

## 1. Was der Adapter bewirkt

Eine „Fütterung“ ist einfach: **einen Ausgang einschalten → eine konfigurierbare Anzahl von Sekunden warten → ihn wieder ausschalten** . Bei einem umgebauten Futterautomaten gibt der laufende Motor während dieser Sekunden das Futter aus.

Der Adapter kann **bis zu 5 Switches** verwalten, jeder davon völlig unabhängig und mit einem eigenen, nach dem Switch benannten Konfigurationsreiter. Sie legen pro Switch fest:

- **wenn** es füttert – entweder zu **festen Zeiten** (z. B. 08:00 und 18:00 Uhr) oder in einem **Intervall** innerhalb eines Zeitfensters (z. B. alle 60 Minuten zwischen 08:00 und 18:00 Uhr);
- **wie lange** der Ausgang eingeschaltet bleibt (Einspeisungsdauer in Sekunden);
- **ob die Fütterung unterbrochen werden soll,** wenn die Wasser- oder Lufttemperatur zu niedrig/zu hoch ist;
- **ob die Zufuhr auf das astronomische Tagesfenster beschränkt werden soll** (Sonnenaufgang/Sonnenuntergang mit schalterspezifischen Abweichungen, von einem System aus, gemeinsam genutzt oder schalterspezifisch);
- **ob der Schalter überwacht werden soll** (überprüfen, ob er tatsächlich ein- und ausgeschaltet wurde) und optional eine **Telegram-** Nachricht über das Ergebnis gesendet werden soll;
- **ob die Fütterung während einer wiederkehrenden Wintersaison reduziert oder ausgesetzt werden soll** **–** optional mit Telegram-Erinnerungen vor Beginn und Ende der Saison;
- **ob das Intervall und die Portionsgröße automatisch an die Wasser-/Lufttemperatur angepasst werden sollen** ( **dynamische Fütterung** , Modell Q10);
- **ob die Zufuhr unterbrochen werden soll,** wenn der Gehalt an gelöstem **Sauerstoff** (O₂) zu niedrig ist;
- **bis zu 3 einmalige Fütterungspausen** (absolute Datums- und Zeiträume, z. B. eine Quarantäne nach der Wiederauffüllung) mit einer **Telegram-** Nachricht zu Beginn und am Ende jeder Pause;
- Ein **Hauptpausenschalter** ( _Fütterung jetzt unterbrechen_ ), der **die gesamte** Fütterung für einen Schalter sofort unterbricht, bis Sie ihn wieder ausschalten, wobei bei jedem Umschalten eine **Telegram-** Nachricht angezeigt wird.

Sie können die Zufuhr auch jederzeit **manuell** auslösen – entweder über die Einstellungsseite des Adapters (Schaltfläche mit frei wählbarer Dauer) oder über einen Datenpunkt (z. B. eine Schaltfläche in einer VIS-Ansicht).

Optional kann der Adapter die **Relaisplatine „Automatic Feeder“** (ein ESP32 mit drei Timer-Tasten und eigener Weboberfläche) integrieren. Sie entscheiden **für jeden Schalter einzeln** , ob diese Platine verwendet wird. Wenn Sie sie in den allgemeinen Einstellungen für einen Schalter aktivieren, erhält dieser Schalter einen **„Relay“** -Tab. Dort können Sie die Netzwerkadresse der Platine festlegen, die Verbindung testen und die drei Timer-Zeiten (S1–S3) direkt über den Adapter konfigurieren.

> Wichtig: Der Adapter erstellt den Switch niemals selbst. Er **steuert ein Objekt, das bereits in Ihrem ioBroker-System existiert** . Dieses Objekt wählen Sie in der Konfiguration aus.

---

## 2. Anforderungen

| Du brauchst                                                                           | Details                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker** mit **admin ≥ 7.8.23** , **js-controller ≥ 6.0.11** und **Node.js ≥ 22** | Erforderliche Mindestversionen. Die Konfigurationsseite wurde mit React 19 erstellt.                                                                                                                                                                                                                                      |
| **Ein Schalterobjekt**                                                                | Jeder beschreibbare ioBroker-Zustand, der Ihren Feeder ein-/ausschaltet – z. B. eine intelligente Steckdose (`shelly.0.…` ,`sonoff.0.…` ,`zigbee.0.…` ), ein Relais, eine Skriptvariable.                                                                                                                                 |
| _(optional)_ **Geokoordinaten**                                                       | Dient zur Berechnung von Sonnenaufgang und Sonnenuntergang im **astronomischen Zeitfenster** des jeweiligen Switches. Nur erforderlich, wenn ein Switch dieses Zeitfenster nutzt; die Werte werden aus den ioBroker-Systemeinstellungen übernommen, an einer gemeinsamen Stelle gespeichert oder pro Switch konfiguriert. |
| _(optional)_ Temperaturobjekte                                                        | Vorhandene Zustände mit Luft- und/oder Wassertemperatur zur Temperaturblockierung oder dynamischen Zufuhr. Zuordnung **pro Schalter** auf der Registerkarte „Schalter“.                                                                                                                                                   |
| _(optional)_ **Sauerstoff (O₂)** Objekte                                              | Vorhandene Zustände mit gelöstem Sauerstoff, um die Zufuhr zu blockieren, wenn dieser zu niedrig sinkt. Zugewiesen **pro Schalter** .                                                                                                                                                                                     |
| _(optional)_ Eine **Telegram-** Instanz                                               | Der Offizielle`telegram` Adapter, konfiguriert und betriebsbereit, falls Sie Push-Benachrichtigungen wünschen.                                                                                                                                                                                                            |
| Internetzugang auf dem ioBroker-Host                                                  | Nur für die Adresssuche/Kartendarstellung in der Konfiguration. Der normale Betrieb funktioniert offline.                                                                                                                                                                                                                 |

---

## 3. Installation

1. Öffnen Sie im ioBroker- **Adminbereich** die Registerkarte **„Adapter“** .
2. Suchen Sie in der Liste **nach dem automatischen Futterzuführer** und klicken Sie auf **Installieren** .
3. Erstelle eine **Instanz** des Adapters.
4. Öffnen Sie die Instanzeinstellungen (Zahnradsymbol) – Sie sollten die Konfigurationsseite mit der Registerkarte **„Allgemeine Einstellungen“** sehen. Falls diese leer bleibt, lesen Sie bitte [den Abschnitt zur Fehlerbehebung](#9-troubleshooting--faq) .

---

## 4. Schnellstart – Ihre erste Fütterung

Das Ziel: Jetzt sofort einen Schalter für 5 Sekunden betätigen, um zu beweisen, dass alles funktioniert.

1. **Öffnen Sie die Einstellungen** der automatischen Fütterungsinstanz.
2. Auf der Registerkarte **„Allgemeine Einstellungen“** :
   - Unter **„Standort“** lassen Sie _die Option „Systemeinstellungen für alle Switches verwenden“_ ausgewählt (nur relevant, wenn Sie später das astronomische Fenster aktivieren). Sie können auch einen gemeinsamen Standort auswählen oder ihn für jeden Switch einzeln konfigurieren.
   - Scrollen Sie nach unten zu **Schalter** und klicken Sie auf **Schalter hinzufügen** .
   - Gib ihm einen **Namen** (z. B.`Koi pond` Dieser Name wird zum Titel eines eigenen Tabs.
   - Klicken Sie auf das Listensymbol neben **„Schalterobjekt“** und wählen Sie den Zustand aus, der Ihre Zuleitung (z. B. Ihre smarte Steckdose) schaltet. Stellen Sie sicher, dass der Schalter auf **„Aktiv“** (Kontrollkästchen links) eingestellt ist.
3. **Speichern** (das Diskettensymbol/Häkchen unten). Ein neuer Tab mit dem Namen Ihrer Switch wird angezeigt.
4. Öffnen Sie den **entsprechenden Schalter** . Stellen Sie oben unter **„Manuelle Fütterung“** eine Dauer ein (z. B.`5` Sekunden) und klicken Sie auf **„Jetzt füttern“** . Die Ausgabe sollte sich für 5 Sekunden einschalten und dann wieder ausschalten.
5. Bleiben Sie auf der Registerkarte "Wechsel", legen Sie unter **"Fütterungsplan"** den tatsächlichen Zeitplan fest (z. B. feste Zeiten 08:00 und 18:00) und unter **"Fütterungsaktion"** die **Fütterungsdauer** , und **speichern Sie** anschließend.

Das war's – der Adapter versorgt die Stromversorgung nun automatisch. Im Folgenden werden die verschiedenen Optionen ausführlich erläutert.

---

## 5. Die Einstellungsseite im Detail

Die Konfiguration enthält einen Reiter **„Allgemeine Einstellungen“** sowie **einen Reiter pro Schalter** (dieser wird automatisch erstellt, sobald ein Schalter benannt wurde). Falls eine Seite nicht scrollt, vergrößern Sie das Fenster oder verwenden Sie die Bildlaufleiste rechts – alle Bereiche sind erreichbar.

### 5.1 Registerkarte „Allgemeine Einstellungen“

#### Standort (für das astronomische Beobachtungsfenster)

Der Standort dient zur Berechnung von Sonnenaufgang und Sonnenuntergang für das **astronomische Zeitfenster** , das pro Schalter aktiviert werden kann (siehe _Einschränkungen_ auf der Registerkarte „Schalter“). Er wird nur benötigt, wenn mindestens ein Schalter dieses Zeitfenster nutzt. Drei Optionen:

- **Systemeinstellungen für alle Switches verwenden** – Breiten- und Längengrad werden aus der ioBroker-Systemkonfiguration übernommen (empfohlen, falls diese bereits festgelegt sind). Die aktuellen Werte werden angezeigt.
- **Ein gemeinsamer Standort für alle Schalter** – eine einzige Position festlegen, die alle Schalter verwenden:
  - Geben Sie eine **Adresse** ein und klicken Sie auf **„Suchen“** . Der Adapter ermittelt die Adresse (über OpenStreetMap/Nominatim) und setzt eine Markierung.
  - Oder **klicken Sie auf die Karte** / **ziehen Sie die Markierung** an die genaue Stelle.
  - Die Breiten- und Längengrade können auch direkt eingegeben werden; die Karte folgt dann.
- **Konfigurieren Sie den Standort individuell für jeden Schalter** – jeder Schalter definiert seinen eigenen Standort auf einem eigenen Tab (nützlich, wenn sich Futterstellen, z. B. Teiche, an verschiedenen Orten befinden).

> Die Adresssuche läuft im Adapter-Backend, daher **muss die Instanz dafür ausgeführt werden** . Kartenkacheln und die Suche benötigen Internetzugang.

Die **Sonnenaufgangs-/Sonnenuntergangs-Offsets werden pro Switch konfiguriert** (unter _Einschränkungen_ ), und die berechneten Zeiten werden pro Switch veröffentlicht als`status.sunrise` /`status.sunset` , wird jede Nacht automatisch neu berechnet.

#### Schalter

Die Liste der Futterstellen (bis zu 5). Für jeden Eintrag:

- **Aktiv** (Kontrollkästchen) – nur aktive Schalter werden eingeplant.
- **Name** – Freitext; wird zum Tab-Titel des Schalters und zum Kanalnamen in der Objektstruktur.
- **Schalterobjekt** – der aktuelle ioBroker-Status, der gesteuert werden soll. Verwenden Sie das Listensymbol zum Durchsuchen oder das Kreuz zum Löschen.

Verwenden Sie **„Schalter hinzufügen“** , um einen weiteren Schalter zu erstellen (maximal 5), und das Papierkorbsymbol, um einen zu entfernen. Beim Entfernen eines Schalters werden auch dessen Datenpunkte gelöscht.

- **Dieser Schalter nutzt die Relaisplatine für die automatische Zuführung** (pro Schalter). Aktivieren Sie diese nur für Schalter, deren Zuführungsstation die optionale Relaisplatine für die automatische Zuführung (ESP32) verwendet. Im aktivierten Zustand erhält dieser Schalter eine zusätzliche **Relais-** Registerkarte (siehe [5.4](#54-relay-board-tab-optional) ).

### 5.2 Registerkarte „Futterliste“

Eine zentrale, **vom Benutzer verwaltete Liste Ihrer Futtermittelarten** , die von allen Switches genutzt wird. Für jedes eingegebene Futtermittel:

- **Name des Futtermittelherstellers** **/Händlers** ,
- **Pelletgröße (mm)**
- die vier **Standardnährwertangaben** des _Herstellers_ – **Rohprotein / Fett / Ballaststoffe / Asche (%)** ,
- ein optionaler **Angebots-/Kauflink** (ein verstecktes Feld, das durch Klicken auf die Schaltfläche „Link“ sichtbar wird) zur Online-Nachbestellung.

Fügen Sie beliebig viele Feeds mit **„Feed hinzufügen“** hinzu und entfernen Sie sie mit dem Papierkorbsymbol. Die Liste wird zentral gespeichert und außerdem als JSON veröffentlicht.`info.feeds` für VIS/Widgets. In jedem **Schalterfeld** wählen Sie dann unter **„Aktuell geladener Feed“** aus, welcher dieser Feeds aktuell in den jeweiligen Feeder gefüllt ist – Name, Größe und Nährwert werden angezeigt als`status.activeFeed*` und kann auch über das VIS-Widget umgeschaltet werden.

### 5.3 Registerkarten wechseln

Jeder konfigurierte Schalter erhält eine eigene Registerkarte mit seinem Namen. Diese enthält die folgenden Abschnitte.

#### Manuelle Zuführung

- **Manuelle Zufuhrdauer (Sekunden)** – die durch Drücken der Taste benötigte Zeit.
- **Jetzt füttern** – löst sofort eine Fütterung mit dieser Dauer aus. Nützlich zum Testen oder für eine zusätzliche Portion. (Ob Sperren ignoriert werden, hängt davon ab, ob in _den Einschränkungen_ unter _„Manueller Auslöser ignoriert alle Sperren“ die Option „Alle Sperren ignorieren_ “ aktiviert ist.)
- Die Instanz muss ausgeführt werden und die Konfiguration **muss gespeichert sein** , damit die Schaltfläche funktioniert.

#### Fütterungsplan

Wählen Sie **einen** Modus:

- **Feste Zeiten** – eine Liste der Uhrzeiten (`HH:mm` Fügen Sie beliebig viele hinzu; der Futterautomat fährt jeden Tag alle an. Beispiel:`08:00` Und`18:00` Die
- **Intervall innerhalb eines Zeitfensters** – wiederholte Zufuhr innerhalb eines Fensters:
  - **Fensterbeginn** / **Fensterende** – z. B. 08:00 bis 18:00 Uhr.
  - **Intervall (Minuten)** – z. B. 60 → Füttern um 08:00, 09:00, …, bis zum Ende des Zeitfensters, jeden Tag.

Wenn das **astronomische Fenster** aktiviert ist (siehe _Einschränkungen_ ), werden die festen Start- und Endzeiten des Fensters durch das Sonnenaufgangs-/Sonnenuntergangsfenster ersetzt und ausgeblendet; das Intervall läuft dann zwischen Sonnenaufgang und Sonnenuntergang. Die nächste geplante Zeit ist immer sichtbar.`status.nextFeeding` Datenpunkt.

#### Fütterungsaktion

- **Fütterungsdauer (Sekunden)** – wie lange der Ausgang während einer geplanten Fütterung eingeschaltet bleibt.
- **Ein-Wert** / **Aus-Wert** – die Werte, die in das Schalterobjekt geschrieben werden. Standardwerte sind`true` Und`false` Diese passen zu den meisten intelligenten Steckdosen/Relais. Falls Ihr Gerät Zahlen oder Text erwartet, geben Sie z. B. Folgendes ein:`1` /`0` oder`ON` /`OFF` Hier.

#### Temperatur- und Sauerstoffquellen

Jeder Schalter (jede Fütterungsstation) verfügt **über eigene** Sensoren – verschiedene Teiche/Behälter können unterschiedliche Objekte verwenden:

- **Lufttemperatur** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, in dem die Lufttemperatur dieser Station gemessen wird.
- **Wassertemperatur** – Markieren Sie das Kästchen und wählen Sie den Bundesstaat aus, in dem die Wassertemperatur dieser Station gemessen wird. Dies ist der primäre Sensor **für die Futterzone** (platzieren Sie ihn dort, wo die Fische tatsächlich fressen, nicht an der Oberfläche).
- **Wassertemperatur (Tiefe)** – _optionaler zweiter_ Wassersensor (z. B. in Bodennähe). Wird erst angezeigt, wenn der primäre Wassersensor aktiviert ist. Bei zwei Sensoren wählen Sie einen **Kombinationsmodus** für die dynamische Fütterung: _Fütterungszone (nur flaches Wasser)_ \[Standard], _Durchschnitt beider Werte_ , _kälteste Schicht_ oder _saisonal_ (verwendet den Sensor für flaches Wasser, solange die Temperatur einen Schwellenwert erreicht oder überschreitet, ansonsten den Sensor für tiefes Wasser). Der **Temperaturblock** verwendet immer die **kältere** der beiden Schichten. Ein zweiter Sensor ist nur in **tiefen, nicht durchmischten Teichen** hilfreich (eine laufende Pumpe durchmischt das Wasser und beseitigt jegliche Schichtung) – siehe _Dynamische Fütterung – Hintergrund & Quellen_ .
- **Sauerstoff (O₂)** – Kreuzen Sie das Kästchen an und wählen Sie den Zustand aus, der den gelösten Sauerstoff enthält.

Nur numerische Zustände sind sinnvoll. Die aktuellen Werte werden auf diesen Schalter übertragen.`status.airTemperature` ,`status.waterTemperature` ,`status.waterTemperatureDeep` ,`status.oxygen` (Und`status.waterStratification` = flache − tiefe) Datenpunkte. Die Schwellenwerte sind unten festgelegt ( _Temperaturblockierung_ ), und die Temperaturen steuern auch _die dynamische Zufuhr_ .

#### Temperaturblockierung

Wird nur für die oben aktivierten Temperaturquellen angezeigt ( _Temperatur- und Sauerstoffquellen_ ). Pro Schalter können Sie Folgendes einstellen:

- **Blockieren nach Wassertemperatur** – _Blockieren, wenn darunter_ und/oder _darüber_ (°C).
- **Blockierung durch Lufttemperatur** – Gleiches gilt für Luft.

Liegt die aktuelle Temperatur außerhalb des zulässigen Bereichs, wird die Zufuhr übersprungen und der Grund dafür protokolliert.`status.blockReason` (Wenn ein Temperaturwert unbekannt ist, wird diese Quelle nicht blockiert.)

#### Wasserqualität (Ammoniak / Nitrit)

Optional überwacht der Schalter den **Ammoniak-** (NH₃/NH₄) und/oder **Nitritgehalt** (NO₂) des Wassers – „Wenn diese Werte steigen, weniger Futter geben“ (aus der Bedienungsanleitung des Futterautomaten). Weisen Sie jedem Stoff einen bestehenden Zustand zu und aktivieren Sie die Option **„Futterzufuhr bei schlechter Wasserqualität blockieren/reduzieren“** . Legen Sie für jeden Stoff zwei Schwellenwerte fest:

- **Reduzierung oberhalb** – Sobald der Wert diesen Warnschwellenwert **erreicht oder überschreitet** , **wird die Tagesmenge um einen konfigurierbaren Prozentsatz reduziert** ( _Tagesmenge reduzieren auf (%)_ ). Dies gilt nur im **Modus „Fütterungsmengenregelung“** (in den Modi „Fest“/„Dynamisch“ gibt es keine zu reduzierende Menge).
- **Block oben** – wenn der Wert **über** diesem Maximum liegt, wird die Zufuhr in jedem Modus **vollständig blockiert** (wie bei den Temperatur-/Sauerstoffblöcken); der Grund wird protokolliert.`status.blockReason` Die

Lassen Sie einen Schwellenwert leer, um diese Stufe zu deaktivieren. Die Live-Werte werden gespiegelt in`status.ammonia` Und`status.nitrite` Es gibt keine allgemeingültigen Sicherheitsgrenzen (sie hängen von pH-Wert und Temperatur ab) – als Richtwert sollten Sie Ammoniak und Nitrit nahe Null halten und die Schwellenwerte anhand Ihres eigenen Testkits festlegen.

#### Einschränkungen

- **Beschränken Sie die Fütterung auf das astronomische Tagesfenster (Sonnenaufgang/Sonnenuntergang + Abweichungen)** – wenn diese Option aktiviert ist, wird die Fütterung auf das anhand der Position dieses Schalters berechnete Tagesfenster beschränkt. Bei _Intervall-_ und _dynamischer Fütterung_ ersetzt dieses Fenster den festen Start-/Endzeitpunkt; bei _festen Zeiten_ dient es als Tag-/Nachtwächter (Zeiten außerhalb des Fensters werden übersprungen). Wenn diese Option aktiviert ist, können Sie Folgendes einstellen:
  - **Minuten nach Sonnenaufgang** – Startzeitpunkt so viele Minuten _nach_ Sonnenaufgang (Standardwert 0).
  - **Minuten vor Sonnenuntergang** – Stopp so viele Minuten _vor_ Sonnenuntergang (Standardwert 0).
  - **Standort für diesen Schalter** – wird nur angezeigt, wenn der allgemeine _Standort_ auf _„Einzeln“_ eingestellt ist: Wählen Sie _„Systemeinstellungen verwenden“_ oder _„Bestimmten Standort definieren_ (Adresssuche + Karte)“ für diesen Schalter. Die berechneten Zeiten werden angezeigt in`status.sunrise` /`status.sunset` Die
- **Die manuelle Auslösung ignoriert alle Sperren** – wenn sie aktiviert ist, werden sowohl die manuelle Taste als auch die …`feedNow` /`feedFor` Datenpunkte werden auch dann erfasst, wenn eine Temperatur-/Fenstersperre aktiv ist.

#### Dynamische Zuführung

Optional: **Fütterungsintervall und -dauer können mithilfe des Q10-Modells an die Temperatur** angepasst werden (der Stoffwechsel verdoppelt sich etwa pro +10 °C). Hierfür ist eine aktive Temperaturquelle erforderlich; feste Zeiten werden dann durch ein Intervall innerhalb des vorgegebenen Bereichs ersetzt.

- **Aktivieren/Quelle** – Schalten Sie die Funktion ein und wählen Sie die Wasser- oder Lufttemperatur. Wenn ein zweiter (Tiefen-)Wassersensor konfiguriert ist, wird die hier verwendete Wassertemperatur gemäß dem gewählten Kombinationsmodus aus den Werten beider Schichten kombiniert (siehe _Temperatur- und Sauerstoffquellen_ ).
- **Referenz / Q10** – das Basisintervall und die Basisdauer gelten bei der Referenztemperatur (z. B. 20 °C); Q10 ist typischerweise 2–2,5 (der Stoffwechsel verdoppelt sich ungefähr pro +10 °C – siehe _Dynamische Fütterung – Hintergrund & Quellen_ ).
- **Intervall/Dauer (Basis, Minimum, Maximum)** – Grenzen für das berechnete Intervall (Minuten) und die Dauer (Sekunden). Das **Basisintervall und das maximale Intervall müssen größer als 0 sein** , andernfalls kann keine Fütterung geplant werden.
- **Mittelungsfenster / Hysterese** – ein gleitender Durchschnitt (z. B. 24 h) glättet Spitzenwerte; die Hysterese vermeidet eine Neuberechnung aufgrund kleinster Änderungen.

Die aktuellen Werte werden angezeigt in`status.dynamicAvgTemperature` ,`status.dynamicRate` ,`status.dynamicIntervalMin` Und`status.dynamicDurationSec` Eine optionale **Sauerstoffquelle (O₂)** kann die Nahrungsaufnahme unterbrechen, wenn der gelöste Sauerstoffgehalt unter einen bestimmten Schwellenwert sinkt. Die Winterpause hat Vorrang vor der dynamischen Nahrungsaufnahme.

> Wenn die dynamische Fütterung aktiviert ist, aber kein gültiges Intervall berechnet werden kann (Basis- oder Maximalintervall ist 0 oder ein ungültiges Zeitfenster), wird nichts eingeplant:`status.nextFeeding` bleibt leer und`status.blockReason` Zeigt einen Hinweis an. Legen Sie ein Basisintervall und ein maximales Intervall größer als 0 fest.

#### Fütterungsmengenmodell (Empfehlung)

Optional schätzt der Adapter die **empfohlene tägliche Futtermenge** für einen Wechsel vom **Fischbestand** und der **Wassertemperatur** gemäß der Originalanleitung des Futterautomaten:`daily amount [g] = total fish weight × percentage(water temperature)` Sie geben lediglich die **Anzahl der Fische pro Größenklasse** (15/20/30/40/50/60 cm) in einer kleinen Tabelle mit einem Fischsymbol pro Größe ein; das **Gewicht pro Größe ist ein fester Schätzwert aus der Bedienungsanleitung** (60/125/350/1000/2000/4000 g). Außerdem legen Sie den **Fütterungsprozentsatz pro Temperaturbereich** fest (Standardwerte: 0 % unter 15 °C, 1 % bei 15–18 °C, 1,5 % bei 18–21 °C, 2 % bei 21–23 °C, 3 % bei 23–28 °C, danach **reduziert bei höheren Temperaturen** : 1,5 % bei 28–30 °C und 0,5 % über 30 °C – die Temperaturabhängigkeit erreicht ihren Höhepunkt bei etwa 24–26 °C und nimmt darüber ab). Für die Steuerung wird eine **Wassertemperaturquelle** benötigt.

An sich ist es ein **Rechner** – er berechnet die Empfehlung und zeigt sie an. Die Ergebnisse werden veröffentlicht in`status.fishTotalWeight` (G),`status.feedPercentToday` (%) Und`status.feedTargetGramsToday` (g); die Registerkarte "Wechsel" zeigt zusätzlich das geschätzte Gesamtgewicht und ein Beispiel an.

Optional können Sie **die Fütterung über diese Menge steuern** lassen: Aktivieren Sie **„Fütterung mit dieser Menge steuern“** , und die empfohlene Tagesmenge in Gramm wird in Motorlaufzeit umgerechnet und auf die Fütterungen des Tages verteilt. Dazu kalibrieren Sie die **Abgaberate** (g/s) – ein kleines Hilfsprogramm lässt den Motor einige Sekunden laufen, damit Sie das abgegebene Futter wiegen und der Adapter die Rate berechnen kann – und können optional ein **tägliches Maximum (g)** als Überfütterungsschutz festlegen. Dieser Modus **schließt die dynamische Fütterung (Q10) aus** ; die **Einstellungen „wann“** (feste Zeiten/Intervall/astronomisches Fenster) und alle Blöcke (Nacht, Temperatur, O₂, Pausen, Winter) bleiben unverändert und behalten ihre Priorität. Die resultierende Laufzeit wird veröffentlicht in`status.feedTargetSecondsToday` (s pro Tag) und`status.feedEffectiveDurationSec` (s pro Fütterung); die Dauer pro Fütterung ist aus Sicherheitsgründen begrenzt.

Das aktuell im Futterautomaten befindliche **Futter** wird pro Schalter unter **„Aktuell geladenes Futter“** aus der zentralen **Futterliste** ausgewählt (siehe [5.2](#52-feed-list-tab) ). Name, Pelletgröße und Nährwertangaben sind veröffentlicht in`status.activeFeed*` und es kann auch über das beschreibbare VIS-Widget umgeschaltet werden.`settings.activeFeed` Zustand (die ID des Zufuhrguts). Die **Abgaberate (g/s)** wird **pro Schalter** kalibriert (sie hängt von der Mechanik des Zuführers ab), unabhängig davon, welches Zufuhrgut geladen wird.

#### Winterpause

Pro Schalter kann eine wiederkehrende **Winterpause** (saisonal, angegeben als) definiert werden.`MM-DD` Termine, die sich jedes Jahr wiederholen und sich um Neujahr erstrecken können).

- **Winterpause aktivieren** – die Pause einschalten.
- **Winterbeginn / Winterende** – Tag und Monat aus einem Kalender auswählen (angezeigt als TT.MM), z. B. 01.11 bis 15.03.
- **Fütterungsmodus** – während der Pause entweder **die Fütterung aussetzen** , in **kürzeren** Abständen füttern oder **einmal täglich** zu einer festgelegten Zeit füttern; **für den Winter gilt eine gesonderte Fütterungsdauer** .
- **Erinnerungen (Telegram)** – Eine tägliche Erinnerung wird in den Tagen vor Beginn und vor Ende (zuletzt am selben Tag) zur konfigurierten Uhrzeit versendet. Eine Telegram-Installation ist erforderlich (siehe unten).

Der aktuelle Zustand wird angezeigt in der`status.winterActive` Datenpunkt. Die Fütterung wird automatisch fortgesetzt, sobald die Pause endet.

#### Fütterungspausen

**Fütterung jetzt unterbrechen (Hauptschalter).** Oben in diesem Abschnitt können Sie mit einem einzigen **Ein-/Ausschalter** **die** Fütterung für diesen Bereich **sofort und dauerhaft** unterbrechen. Dies überschreibt die darunter stehenden zeitbasierten Pausen **sowie** alle Fütterungsmodi (feste Zeiten, Intervallfütterung, dynamische Fütterung, Winterpause). Schalten Sie den Schalter wieder **aus** , wird die Fütterung genau wie zuvor konfiguriert fortgesetzt; es sind keine weiteren Änderungen erforderlich. Durch Umschalten wird eine **Telegram-** Nachricht gesendet ( _Ein_ / _Aus_ ). Typische Anwendung: eine spontane Unterbrechung (Medikamentengabe, Wartung, Wasseraufbereitung) ohne Änderung eines Fütterungsplans. Die Einstellungen können auf der Einstellungsseite **und über VIS/Skripte** vorgenommen werden.`settings.pauseNow` und sein aktueller Zustand wird angezeigt in`status.pauseManual` Die

Unterhalb des Hauptschalters können Sie bis zu **drei einmalige Fütterungspausen** pro Schalter festlegen, um absolute Zeiträume zu planen, in denen die Fütterung **vollständig ausgesetzt** wird (höhere Priorität als alle Fütterungsmodi). Typischer Anwendungsfall: **Quarantäne nach dem Besatz** , wenn neue Fische für eine gewisse Zeit nicht gefüttert werden sollen.

- **Pause 1 / 2 / 3** – zum Aktivieren ankreuzen, dann **Start-** und **Enddatum** (Datum + Uhrzeit, angezeigt als) auswählen.`DD.MM.YYYY HH:mm` z.B.`15.07.2026 08:00` Zu`22.07.2026 18:00` Die
- Die Fütterung wird _während_ einer aktivierten Pause unterbrochen und nach deren Ende automatisch fortgesetzt.
- Zu **Beginn** und **am Ende** jeder Pause wird eine **Telegram** -Nachricht gesendet (eine Telegram-Instanz ist erforderlich, siehe unten). Startet der Adapter, während eine Pause bereits aktiv ist, wird nur die _Abschlussnachricht_ gesendet.
- Bearbeitbar über die Einstellungsseite **und über VIS/scripts.**`settings.*` Staaten (z. B.`settings.pause1Start` ).

Der aktuelle Zustand wird angezeigt in`status.pauseActive` Und`status.pauseActiveUntil` (Der Hauptschalter steuert auch`status.pauseActive` ).

#### Wechselaufsicht

Nach dem Umschalten kann der Adapter überprüfen, ob der Schalter **tatsächlich** den Ein- bzw. Aus-Zustand erreicht hat, und pro Fütterung eines von drei Ergebnissen melden:

| Ergebnis                       | Bedeutung                                                 | Nachricht                                                                      |
| ------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ✅ Erfolg                       | Der Schalter ließ sich wie erwartet ein- und ausschalten. | "Fütterung für x Sekunden ausgelöst."                                          |
| ❌ bei Fehlschlag               | Der Schalter hat den EIN-Zustand nie bestätigt.           | „Die Fütterung konnte nicht durchgeführt werden. Überprüfen Sie den Schalter!“ |
| ❌ Ausgeschaltet fehlgeschlagen | Es schaltete sich ein, ging aber nicht wieder aus.        | „Fehler: Die Stromzufuhr wurde nicht abgeschaltet!“                            |

> Die Nachricht wird in der konfigurierten ioBroker-Systemsprache (standardmäßig Englisch) gesendet.

- **Prüfen Sie, ob der Schalter tatsächlich ein- und ausgeschaltet werden kann** – dies ermöglicht die Überwachung.
- **Verifizierungs-Timeout (Sekunden)** – wie lange auf die Bestätigung gewartet werden soll.
- **Verifizierungsversuche** – wie viele gestaffelte Wiederholungsprüfungen durchgeführt werden sollen, bevor ein Fehler gemeldet wird (Standard: 3). Bei jedem Versuch wird auch der aktuelle Status ausgelesen, sodass verzögerte Statusrückmeldungen (z. B. von Homematic-Funkgeräten) keinen Fehlalarm mehr auslösen.

> **Wichtig:** Die Überwachung funktioniert nur, wenn der Schalter **seinen tatsächlichen Zustand zurückmeldet** , d. h. wenn das Zielobjekt aktualisiert wird.`ack=true` (Typisch für intelligente Steckdosen/Relais mit Statusrückmeldung). Eine einfache Hilfsfunktion, die niemand beachtet, würde immer einen Fehler melden – in diesem Fall die Überwachung für diesen Schalter deaktivieren.

Das Ergebnis wird auch in der gespeichert`status.lastResult` (Text) und`status.error` (Boolesche) Datenpunkte, auf die Sie reagieren können (z. B. eine eigene Benachrichtigung auslösen).

#### Telegram-Benachrichtigungen

Sende die Überwachungsmeldungen an Telegram – **pro Switch** konfiguriert:

- **Nachrichtensprache** – die Sprache aller ausgehenden Nachrichten für diesen Switch (Telegram, Sayit und die Feeding-Ankündigung): _Systemsprache_ (die ioBroker-Systemsprache) oder eine spezifische Sprache. Die Statusdatenpunkte sind davon nicht betroffen.
- **Telegram-Instanz** – wählen Sie eine der installierten aus.`telegram.*` Instanzen (oder _„Keine“_ , um Telegram für diesen Schalter zu deaktivieren). Falls keine Instanzen installiert sind, wird dies im Feld angezeigt.
- **Telegram-Empfänger (optional)** – ein bestimmter Benutzer-/Chatname, wie im Telegram-Adapter konfiguriert; leer lassen, um an alle konfigurierten Empfänger zu senden.
- **Kontrollkästchen** – Wählen Sie aus, welche Meldungen gesendet werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder Abschaltfehler.

Die **Erinnerungen an die Winterpause** (falls aktiviert, siehe _Winterpause_ ) werden unabhängig von diesen Überwachungs-Checkboxes an dieselbe Telegram-Instanz gesendet.

Die vollständige Einrichtung finden Sie in [den Telegram-Benachrichtigungen](#8-telegram-notifications) .

#### Sayit-Benachrichtigungen

Sprechen Sie dieselben Überwachungsnachrichten über eine **Sayit-Instanz (Text-zu-Sprache)** – konfiguriert **pro Schalter** , unabhängig von Telegram (beide können gleichzeitig aktiv sein):

- **Sayit-Instanz** – wählen Sie eine der installierten aus`sayit.*` Instanzen (oder _None,_ um Sayit für diesen Schalter zu deaktivieren). Falls keine Instanzen installiert sind, wird dies im Feld angezeigt.
- **Lautstärke (0–100, optional)** – die Sprechlautstärke für diesen Schalter; lassen Sie das Feld leer, um die Standardlautstärke der Sayit-Instanz zu verwenden.
- **Testansage** – neben der Instanzauswahl: Gibt über die ausgewählte Instanz einen kurzen Testtext aus, damit Sie die Audioausgabe sofort überprüfen können, ohne auf eine Zufuhr warten zu müssen.
- **Kontrollkästchen** – Wählen Sie aus, welche Meldungen vorgelesen werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder Abschaltfehler (die gleichen drei wie bei Telegram, hier jedoch separat auswählbar).

Der gesprochene Text verwendet die im obigen Telegram-Bereich ausgewählte **Nachrichtensprache** .

#### Fütterungsankündigung

Kündige eine bevorstehende Fütterung zu einem konfigurierbaren Zeitpunkt im Voraus via Telegram und/oder Sayit an:

- **Fütterung im Voraus ankündigen** – schaltet die Ankündigung ein.
- **Vorlaufzeit (Minuten)** – wie lange vor dem Versand der Ankündigung (z. B.`5` ).
- **Ankündigung via Telegram** / **Ankündigung via Sayit** – der/die Kanal(e), der/die für die Ankündigung verwendet wird/werden (jeweils muss seine/ihre Instanz oben konfiguriert werden).

Die Ansage wird zusammen mit jeder Fütterung geplant. Falls die Fütterung zum Zeitpunkt der Ansage **blockiert oder pausiert** wäre (z. B. nachts, aufgrund von Temperatur, Sauerstoffmangel oder einer Fütterungspause), wird die Ansage übersprungen, sodass niemals eine Fütterung versprochen wird, die nicht stattfindet. Manuelle Fütterungen (über die Schaltfläche _„Jetzt füttern_ “ /`feedFor` ) haben keine Vorlaufzeit und werden nicht angekündigt.

### 5.4 Relaisplatinenanschluss (optional)

Dieser Tab wird nur angezeigt, wenn die Option „ **Dieser Schalter verwendet die automatische Zuführungsrelaisplatine“** in den allgemeinen Einstellungen aktiviert ist (siehe [5.1](#switches) ). Jede Relaisplatine gehört zu einem Schalter (Zuführungsstation). Die Platine ist ein ESP32 mit drei Timer-Tasten (S1–S3) und einer eigenen Weboberfläche, die über **Port 80** Ihres Netzwerks erreichbar ist. Der Adapter **konfiguriert** die Platine, **zeigt ihren Status an** und löst – standardmäßig – **die Zuführung über die Platine aus** (siehe _„Zuführung primär über die Relaisplatine“_ weiter unten). Die Platine führt also einen eigenen Countdown durch, zeigt diesen auf ihrem Display an und schaltet ihr Relais anschließend wieder ab.

> **Hinweis:** Die Relaisplatine für die automatische Zuführung wird parallel als **separates Projekt** entwickelt. Der Adapter funktioniert auch ohne sie einwandfrei – die Platine ist eine optionale, praktische Ergänzung. Da sie unabhängig weiterentwickelt wird, können sich einige Details unabhängig vom Adapter ändern.

- **Boardadresse (IP- oder mDNS-Host)** – z. B.`192.168.1.50` oder`feeder.local` Eine feste IP-Adresse ist am zuverlässigsten; mDNS (`.local` ) funktioniert nur, wenn Ihr Hostsystem es auflösen kann.`:port` Ein Suffix ist zulässig, aber normalerweise nicht erforderlich (Standardeinstellung).`80` ).
- **Die Stromversorgung erfolgt primär über die Relaisplatine (alternativ: direkt über Shelly)** – standardmäßig aktiviert. Wenn aktiviert, wird die Stromversorgung über die Weboberfläche der Platine ausgelöst (`POST /api/trigger` Die **Platine selbst** führt den Countdown für die berechnete Dauer aus, zeigt ihn auf ihrem OLED-Display an und schaltet ihr Relais wieder ab. Nur wenn die Platine **nicht erreichbar ist** , schaltet der Adapter das Zielobjekt (Shelly) direkt – analog zu Schaltern außerhalb der Platine. Dadurch spiegeln die Anzeige und das Protokoll der Platine stets die tatsächliche Stromzufuhr wider. Deaktivieren Sie diese Funktion, um Shelly immer direkt zu schalten (das alte Verhalten). Der tatsächlich verwendete Pfad wird in folgendem Verzeichnis gespeichert:`relay.lastTriggerPath` (`board` /`direct` ), wurde der Erfolgsmeldung und dem Protokoll hinzugefügt. Sowohl die Platine **als auch** das Zielgerät werden überprüft, bevor ein Zufuhrvorgang als abgeschlossen gilt, und ein Sicherheitsanschlag schaltet die Platine ab, falls sie sich einmal nicht selbstständig abschalten sollte.
- **Test der Verbindungs- und Abrufzeiten** – kontaktiert die Platine einmalig. Ein grünes _„Verbunden_ “-Symbol und die Host-/IP-Adresse/Firmware der Platine bestätigen eine funktionierende Verbindung; die drei Tastendrückzeiten werden anschließend von der Platine in die Felder darunter ausgelesen. Ein rotes _„Nicht verbunden“_ -Symbol zeigt einen Fehler an. Dieser Vorgang läuft auch **automatisch beim Öffnen des Tabs** (sofern eine Adresse konfiguriert ist), sodass Status, Systemübersicht und Tastendrückzeiten ohne Klick geladen werden.
- **Tastenansprechzeiten (Sekunden)** – die Ansprechzeit jeder Taste **S1** , **S2** und **S3** (1–600 s). Da diese Werte **auch über die Weboberfläche der Platine bearbeitet werden können** , sollten sie immer zuerst _abgerufen_ und anschließend angepasst werden.
- **Spart Zeit beim Schreiben an die Tafel** – schreibt die drei Werte an die Tafel.
- **Neustart des Boards** – startet den ESP32 über seine API neu (`POST /api/reboot` Nach einer Bestätigungsabfrage startet das Board neu und ist für einige Sekunden offline, dann kehrt es automatisch zurück.

Am unteren Rand des Tabs wird in einer **Systemübersicht** die aktuellen Systemdaten des Boards nach einem erfolgreichen Verbindungstest (über die Schaltfläche _„Verbindung testen & Abrufzeiten_ “) angezeigt: Firmware-Version und Build, Hostname, IP-Adresse, Wi-Fi-Netzwerk, Signalstärke (dBm), MAC-Adresse, Betriebszeit, freier Speicher und der Grund für den letzten Reset (in Klartext angezeigt, z. B. „Software“).

Die Verbindung wird auch in den Objektbaum gespiegelt und alle 60 Sekunden aktualisiert – siehe`relay.*` Datenpunkte in [Abschnitt 6](#6-objects--data-points) .

---

## 6. Objekte / Datenpunkte

> **Hinweis:** Alle Zeitstempeldaten werden in der **lokalen Zeitzone des Systems** angezeigt (Format)`DD.MM.YYYY HH:MM:SS` z.B.`01.07.2026 16:20:00` Bei VIS und Skripten hat jeder Zeitstempel zusätzlich einen **numerischen Zwilling,** der mit .com endet.`…Ts` (Unix-Zeit in **Millisekunden** )`0` = keine) — ideal für Countdowns und Zeitbalken ohne String-Parsing und unabhängig vom Anzeigeformat.

Der Adapter erzeugt die folgenden Zustände unter seinem Namensraum (`automatic-feeder.<instance>.` ).

**Global**

| Datenpunkt        | Typ                  | Bedeutung                                                                                                                                                                                                               |
| ----------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | boolescher Wert (ro) | Der Adapter läuft und die Konfiguration ist gültig.                                                                                                                                                                     |
| `info.feeds`      | Zeichenkette (ro)    | Die zentrale **Futterliste** als JSON (jede Futtersorte mit Name, Anbieter, Pelletgröße, Nährwertangaben und Angebotslink) – damit VIS/Widgets die Liste rendern können, ohne die Instanzkonfiguration lesen zu müssen. |

**Pro Schalter, unter`switches.<id>.`** (`<id>` ist eine interne ID wie`sw-0` )

Direkt unter dem Schalter befinden sich der manuelle Auslöser und zwei Unterkanäle:

- **`status`** (`switches.<id>.status.*` ) – die unten aufgeführten schreibgeschützten Statusdatenpunkte.
- **`settings`** (`switches.<id>.settings.*` ) – eine **bearbeitbare** Spiegelung der Konfiguration dieses Schalters. Durch das Schreiben eines neuen Werts dort (über VIS oder ein Skript) wird die Konfiguration geändert und die Instanz neu gestartet, damit die Änderung wirksam wird. Einige abgeleitete Felder sind schreibgeschützt (z. B.`winterWindow` ).
- **`relay`** (`switches.<id>.relay.*` ) – nur vorhanden, wenn dieser Schalter eine Relaisplatine verwendet; die schreibgeschützten Statusdatenpunkte der Relaisplatine sind am Ende der Tabelle aufgeführt.

| Datenpunkt                            | Typ                  | Bedeutung                                                                                                                                                                                                  |
| ------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feedNow`                             | boolescher Wert (rw) | Schreiben`true` um eine manuelle Fütterung auszulösen.                                                                                                                                                     |
| `feedFor`                             | Nummer (rw)          | Geben Sie eine Dauer in **Sekunden** an, um **eine Fütterung mit genau dieser Dauer** auszulösen – keine Konfigurationsänderung, kein Neustart. (Zurücksetzung auf)`0` nach der Ausführung.                |
| `status.feedingActive`                | boolescher Wert (ro) | Die Fütterung läuft gerade.                                                                                                                                                                                |
| `status.feedingEndsTs`                | Nummer (ro)          | Ende der **laufenden** Datenzufuhr als Unix-Zeit in ms (`0` = keine Fütterung) — für einen Live-Laufzeit-Countdown (z. B. 15 → 0 s) in VIS.                                                                |
| `status.feedingDurationSec`           | Nummer (ro)          | Gesamtdauer der **laufenden** Fütterung in Sekunden (`0` = keine Fütterung) — ermöglicht es einem VIS-Widget, einen exakten Fortschrittsring neben dem Countdown zu zeichnen.                              |
| `status.lastFeeding`                  | Zeichenkette (ro)    | Zeitstempel der letzten Fütterung.                                                                                                                                                                         |
| `status.lastFeedingTs`                | Nummer (ro)          | Letzte Fütterung als Unix-Zeit in ms (`0` (noch keine vorhanden).                                                                                                                                          |
| `status.nextFeeding`                  | Zeichenkette (ro)    | Zeitstempel der nächsten geplanten Fütterung.                                                                                                                                                              |
| `status.nextFeedingTs`                | Nummer (ro)          | Nächste geplante Fütterung als Unix-Zeit in ms (`0` (nichts geplant).                                                                                                                                      |
| `status.blocked`                      | boolescher Wert (ro) | Der letzte Versuch wurde blockiert.                                                                                                                                                                        |
| `status.blockReason`                  | Zeichenkette (ro)    | Warum es blockiert wurde (Nacht / Temperatur / Sauerstoff), in der Systemsprache.                                                                                                                          |
| `status.blockReasonCode`              | Zeichenkette (ro)    | Der Blockgrund als **stabiler maschinenlesbarer Code** (z. B.`blockNight` ,`blockWaterBelow` ,`blockPauseManual` ; leer = nicht blockiert) — für die Symbol-/Farblogik in VIS, unabhängig von der Sprache. |
| `status.lastResult`                   | Zeichenkette (ro)    | Ergebnis des letzten Fütterungsversuchs.                                                                                                                                                                   |
| `status.error`                        | boolescher Wert (ro) | Beim letzten Versuch gab es einen Schaltfehler.                                                                                                                                                            |
| `status.winterActive`                 | boolescher Wert (ro) | Die Winterpause ist derzeit aktiv.                                                                                                                                                                         |
| `status.winterLastStartReminder`      | Zeichenkette (ro)    | Datum der letzten versendeten Erinnerung „Winterbeginn“.                                                                                                                                                   |
| `status.winterLastEndReminder`        | Zeichenkette (ro)    | Datum der letzten versendeten Erinnerung „Winterende“.                                                                                                                                                     |
| `status.pauseManual`                  | boolescher Wert (ro) | Die manuelle Master-Pause ( _Fütterung jetzt unterbrechen_ /`settings.pauseNow` ) ist eingeschaltet.                                                                                                       |
| `status.pauseActive`                  | boolescher Wert (ro) | Derzeit ist eine einmalige Fütterungspause aktiv.                                                                                                                                                          |
| `status.pauseActiveUntil`             | Zeichenkette (ro)    | Ende der aktuell aktiven Fütterungspause (leer, falls keine vorhanden).                                                                                                                                    |
| `status.pauseActiveUntilTs`           | Nummer (ro)          | Ende der aktiven Fütterungspause als Unix-Zeit in ms (`0` = keine).                                                                                                                                        |
| `status.dynamicAvgTemperature`        | Nummer (ro)          | Durchschnittliche Temperatur bei dynamischer Zuführung.                                                                                                                                                    |
| `status.dynamicRate`                  | Nummer (ro)          | Der Q10-Ratenfaktor wird derzeit durch dynamische Fütterung angewendet.                                                                                                                                    |
| `status.dynamicIntervalMin`           | Nummer (ro)          | Aktuell berechnetes dynamisches Intervall (Minuten).                                                                                                                                                       |
| `status.dynamicDurationSec`           | Nummer (ro)          | Aktuell berechnete dynamische Dauer (Sekunden).                                                                                                                                                            |
| `status.airTemperature`               | Nummer (ro)          | Eigener Lufttemperaturquellenwert dieses Schalters.                                                                                                                                                        |
| `status.waterTemperature`             | Nummer (ro)          | Eigener Wassertemperaturquellenwert dieses Schalters (Einspeisezone / Flachwassersensor).                                                                                                                  |
| `status.waterTemperatureDeep`         | Nummer (ro)          | Der optionale Wert des Tiefenwassertemperatursensors dieses Schalters.                                                                                                                                     |
| `status.waterStratification`          | Nummer (ro)          | Temperaturdifferenz oberflächennah − tief (nur mit zwei Wassersensoren).                                                                                                                                   |
| `status.oxygen`                       | Nummer (ro)          | Der eigene Wert der gelösten Sauerstoffquelle dieses Schalters.                                                                                                                                            |
| `status.ammonia`                      | Nummer (ro)          | Eigener Ammoniak-Quellenwert (NH₃/NH₄) dieses Schalters.                                                                                                                                                   |
| `status.nitrite`                      | Nummer (ro)          | Eigener Nitrit- (NO₂)-Quellenwert dieses Schalters.                                                                                                                                                        |
| `status.fishTotalWeight`              | Nummer (ro)          | Futtermengenmodell: geschätztes Gesamtgewicht der Fische (g).                                                                                                                                              |
| `status.feedPercentToday`             | Nummer (ro)          | Futtermengenmodell: Futteranteil in Prozent bei der aktuellen Wassertemperatur (%).                                                                                                                        |
| `status.feedTargetGramsToday`         | Nummer (ro)          | Fütterungsmengenmodell: empfohlene Futtermenge pro Tag (g).                                                                                                                                                |
| `status.feedingsPerDayToday`          | Nummer (ro)          | Fütterungsmengenmodell: Anzahl der für heute geplanten Fütterungen.                                                                                                                                        |
| `status.feedTargetPortionGrams`       | Nummer (ro)          | Fütterungsmengenmodell: Empfohlene Menge pro Einzelfütterung (g) = Tagesmenge ÷ Fütterungen (nach Begrenzung / Reduzierung der Wasserqualität).                                                            |
| `status.feedTargetSecondsToday`       | Nummer (ro)          | Modell zur Futtermengenregulierung (Regelungsmodus): Gesamte Motorlaufzeit pro Tag (s) zur Abgabe der Menge. 0, wenn die Regelung ausgeschaltet ist.                                                       |
| `status.feedEffectiveDurationSec`     | Nummer (ro)          | Futtermengenmodell (Regelungsmodus): Dauer pro Fütterung, die aktuell gesteuert wird (s). 0, wenn die Regelung ausgeschaltet ist.                                                                          |
| `status.dispenseRate`                 | Nummer (ro)          | Modell für die Futtermenge: Kalibrierte Abgaberate dieses Schalters (g/s).                                                                                                                                 |
| `status.activeFeedName`               | Zeichenkette (ro)    | Aktuell geladener Feed: Name (leer, wenn kein Feed ausgewählt ist).                                                                                                                                        |
| `status.activeFeedVendor`             | Zeichenkette (ro)    | Aktuell geladener Feed: Lieferant / Händler.                                                                                                                                                               |
| `status.activeFeedSize`               | Nummer (ro)          | Aktuell geladenes Futter: Pelletgröße (mm).                                                                                                                                                                |
| `status.activeFeedProtein`            | Nummer (ro)          | Aktuell geladenes Futter: Rohprotein (%).                                                                                                                                                                  |
| `status.activeFeedFat`                | Nummer (ro)          | Aktuell geladenes Futter: Rohfett (%).                                                                                                                                                                     |
| `status.activeFeedFibre`              | Nummer (ro)          | Aktuell geladenes Futter: Rohfaser (%).                                                                                                                                                                    |
| `status.activeFeedAsh`                | Nummer (ro)          | Aktuell geladenes Einsatzmaterial: Rohasche (%).                                                                                                                                                           |
| `status.activeFeedUrl`                | Zeichenkette (ro)    | Aktuell geladener Feed: Angebots-/Kauflink (optional).                                                                                                                                                     |
| `status.sunrise` /`status.sunset`     | Zeichenkette (ro)    | Berechneter Sonnenaufgang/Sonnenuntergang für den Standort dieses Schalters (astronomisches Fenster).                                                                                                      |
| `status.sunriseTs` /`status.sunsetTs` | Nummer (ro)          | Sonnenaufgang/Sonnenuntergang als Unix-Zeit in Millisekunden – z. B. für einen Tagesfortschrittsbalken in VIS.                                                                                             |
| `relay.connected`                     | boolescher Wert (ro) | Die für diesen Schalter konfigurierte Relaisplatine ist erreichbar (nur wenn dieser Schalter eine Relaisplatine verwendet).                                                                                |
| `relay.info`                          | Zeichenkette (ro)    | Identität der Relaisplatine (Host / IP / Firmware) aus der letzten erfolgreichen Abfrage.                                                                                                                  |
| `relay.active`                        | boolescher Wert (ro) | Der Timer der Relaisplatine läuft derzeit.                                                                                                                                                                 |
| `relay.remaining`                     | Nummer (ro)          | Verbleibende Sekunden auf dem Laufzeittimer der Relaisplatine.                                                                                                                                             |
| `relay.lastTriggerPath`               | Zeichenkette (ro)    | So wurde die letzte Fütterung für diesen Schalter ausgelöst:`board` (über die Relaisplatine) oder`direct` (Shelly hat direkt umgeschaltet, z. B. ist die Platine nicht erreichbar).                        |

Sie können diese in VIS, Skripten oder anderen Adaptern verwenden – zum Beispiel in der Anzeige.`status.nextFeeding` auf einem Dashboard oder reagieren auf`status.error = true` um Ihren eigenen Alarm auszulösen.

---

## 7. Beispiele / Rezepte

**Koiteich, zweimal täglich, nur wenn es warm genug ist**

- Modus _Feste Zeiten_ →`08:00` ,`18:00` ; Dauer`6` S.
- Im Menüband unter _„Temperatur & Sauerstoffquellen“_ die _Option „Wassertemperatur“_ aktivieren und den Sensor auswählen; anschließend _„Blockieren nach Wassertemperatur“_ → _„Blockieren, wenn unter“ auswählen._`8` °C (bei Kälte nicht füttern).
- Unter _„Einschränkungen“_ aktivieren Sie die _Option „Feeding auf das astronomische Tagesfenster beschränken“,_ sodass nach Einbruch der Dunkelheit kein Feed mehr gefüttert wird.

**Voliere, nur tagsüber (astronomisches Fenster)**

- Modus _Intervall innerhalb eines Zeitfensters_ → Intervall`90` min; Dauer`3` S.
- Unter _„Einschränkungen“_ kann das astronomische Fenster mit Offsets aktiviert werden.`30` /`30` min → Die Fütterung erfolgt von 30 Minuten nach Sonnenaufgang bis 30 Minuten vor Sonnenuntergang und passt sich automatisch den Jahreszeiten an.

**Koiteich, temperaturadaptiv (dynamische Fütterung)**

- Auf der Registerkarte „Schalter“ unter _„Temperatur & Sauerstoffquellen“_ die _Option „Wassertemperatur“_ aktivieren und den Sensor auswählen.
- Öffnen Sie dann _die dynamische Zufuhr_ , aktivieren Sie sie und geben Sie als Quelle _die Wassertemperatur an_ .
- Referenz`20` °C, Q10`2.2` , Basisintervall`60` min (min`30` , max`480` ), Basisdauer`5` s (min`2` , max`15` Dann frisst sie häufiger und etwas mehr, wenn es warm ist, und weniger, wenn es kalt ist.

**Winterpause für den Teich**

- Öffnen Sie im Schaltermenü _die Option „Winterpause“_ , aktivieren Sie sie und stellen Sie _den Winterstart_ ein.`01.11` und _Winterende_`15.03` , Modus: _Zufuhr unterbrechen_ .
- Optional können Sie die Erinnerungen aktivieren, damit Sie einige Tage vor Beginn/Ende eine Telegram-Nachricht erhalten.

**Quarantäne nach Wiederauffüllung (Fütterungspause)**

- Öffnen Sie im Menü „Wechsel“ _die Option „Fütterungspausen“_ , aktivieren Sie _„Pause 1“_ und stellen Sie _„Start“_ ein.`15.07.2026 08:00` , _Ende_`22.07.2026 18:00` → In diesem Zeitraum findet überhaupt keine Fütterung statt, danach wird sie automatisch wieder aufgenommen.
- Bei konfigurierter Telegram-Instanz erhalten Sie eine Nachricht zu Beginn und am Ende der Pause.

**Stromzufuhr jetzt unterbrechen (Hauptschalter)**

- Öffnen Sie im Menü „ _Fütterungspausen_ “ die _Option „Fütterung jetzt unterbrechen“_ – oder schreiben Sie`true` Zu`automatic-feeder.0.switches.sw-0.settings.pauseNow` von einem VIS-Schalter.
- Die gesamte Fütterung wird sofort gestoppt (und setzt damit alle Modi außer Kraft), bis Sie sie wieder ausschalten; jeder Schalter sendet eine Telegram-Nachricht.`status.pauseManual` zeigt den aktuellen Status an.

**Manuelle Zusatzportion von einer VIS-Taste**

- Fügen Sie in VIS eine Schaltfläche ein, die Folgendes schreibt:`true` Zu`automatic-feeder.0.switches.sw-0.feedNow` Die
- Oder verwenden Sie ein Schieberegler-/Zahlenfeld, das die **Sekunden** ausgibt.`automatic-feeder.0.switches.sw-0.feedFor` → wird **einmalig mit genau dieser Dauer** gefüttert (keine Konfigurationsänderung, kein Neustart; der Zustand wird zurückgesetzt auf`0` nachher).
- Optional kann _der manuelle Trigger so eingestellt werden, dass er alle Blöcke ignoriert_ und somit immer eine Zufuhr durchführt.

---

## 8. Telegram-Benachrichtigungen

1. Installieren und konfigurieren Sie den **Telegram-** Adapter (erstellen Sie einen Bot mit @BotFather, geben Sie das Token ein und starten Sie einen Chat mit Ihrem Bot). Stellen Sie sicher, dass die Telegram-Instanz **ausgeführt** wird.
2. Öffnen Sie im **Tab** „Automatischer Feeder“ **die Telegram-Benachrichtigungen** :
   - Wählen Sie Ihre **Telegram-Instanz** aus dem Dropdown-Menü aus (z. B.`telegram.0` ).
   - Optional können Sie einen **Empfänger** eingeben (den im Telegram-Adapter angezeigten Benutzer-/Chatnamen); lassen Sie das Feld leer, um alle zu benachrichtigen.
   - Markieren Sie die gewünschten Meldungen: _erfolgreiche Fütterung_ , _Fütterung fehlgeschlagen_ , _Abschaltfehler_ .
3. Speichern. Ab sofort werden die ausgewählten Überwachungsergebnisse an Telegram (mit dem Namen des Schalters als Präfix) gesendet. Hierfür muss _die Schalterüberwachung_ für diesen Schalter aktiviert sein.
4. Die **Erinnerungen zur Winterpause** verwenden dieselbe Telegram-Instanz und denselben Empfänger. Sie werden im Bereich _„Winterpause“_ (Tage vor Beginn/Ende und Erinnerungszeit) verwaltet und müssen **nicht** manuell aktiviert werden.

---

## 9. Fehlerbehebung & Häufig gestellte Fragen

**Die Einstellungsseite ist leer/weiß.** Laden Sie den Browser mit **Strg+Umschalt+R** neu (möglicherweise hat der Administrator eine ältere Seite zwischengespeichert). Sollte das Problem weiterhin bestehen, starten Sie die Instanz neu und öffnen Sie die Einstellungen erneut.

**Das neue Symbol bzw. die Änderung wird nicht angezeigt.** Browser-Cache – Seite mit **Strg+Umschalt+R** neu laden.

**Es wird nichts zugeführt.** Prüfen Sie der Reihe nach: Der Schalter ist **aktiv** ; ein **Schalterobjekt** ist ausgewählt; der **Zeitplan** ist gültig (`status.nextFeeding` zeigt eine Uhrzeit an; es ist nicht **blockiert** (siehe`status.blocked` /`status.blockReason` Das **astronomische Fenster** schließt die Zeit nicht aus; die **Protokollierungsstufe** der Instanz wird auf`debug` und beobachte das Protokoll.

**Es füttert nachts nie, obwohl ich es möchte.** Deaktivieren Sie die _Option „Fütterung auf das astronomische Tagesfenster beschränken“_ für diesen Schalter oder passen Sie die Sonnenaufgangs-/Sonnenuntergangs-Offsets an. Wenn das astronomische Fenster aktiviert ist, der Schalter aber keine gültigen Koordinaten hat, bleibt der Fensterschutz inaktiv und eine Warnung wird protokolliert.

**Die Überwachung meldet immer einen Fehler.** Ihr Schalterobjekt meldet wahrscheinlich nicht seinen tatsächlichen Zustand zurück (`ack=true` Entweder einen Schalter mit Statusrückmeldung verwenden oder _die Schaltüberwachung_ für diesen Schalter deaktivieren.

**Die dynamische Zufuhr ändert nichts.** Stellen Sie sicher, dass die ausgewählte Temperaturquelle (Wasser oder Luft) im Schalter-Tab ( _„Temperatur- und Sauerstoffquellen_ “) aktiviert ist und Werte liefert. Direkt nach einem Neustart wird der gleitende Durchschnitt noch berechnet und beginnt daher mit den Basiswerten.`status.dynamicAvgTemperature` Und`status.dynamicIntervalMin` Die

**Die dynamische Fütterung ist aktiviert, aber es wird nie etwas gefüttert (`status.nextFeeding` ist leer).** Das **Basisintervall oder das maximale Intervall ist 0** (oder das Zeitfenster ist ungültig), daher kann kein Intervall berechnet werden –`status.blockReason` Anschließend wird ein Hinweis angezeigt. Legen Sie ein Basisintervall und ein maximales Intervall größer als 0 (sowie ein gültiges Fenster) fest. Hinweis: Wenn Sie _sowohl_ das minimale als auch das maximale Intervall auf 0 setzen, ist das Ergebnis ebenfalls 0.

**Es wird nichts gefüttert, obwohl es nicht Winter ist (oder es wird gefüttert, obwohl es pausieren sollte).** Überprüfen Sie die Daten der _Winterpause_ (`Winter start` /`Winter end` , Format TT.MM) und der Modus.`status.winterActive` Der Datenpunkt zeigt an, ob die Pause aktuell aktiv ist.

**Die Adresssuche meldet, dass die Instanz laufen muss.** Starten Sie die automatische Feeder-Instanz – die Geokodierung erfolgt im Hintergrund.

**Telegram-Nachrichten kommen nicht an.** Ist im Menü „Wechseln“ eine Telegram-Instanz ausgewählt? Ist der Telegram-Adapter konfiguriert und aktiv? Ist mindestens ein Nachrichtentyp ausgewählt und ist _die Überwachung des Umschaltvorgangs_ aktiviert?

---

## 10. Protokollierung und Fehlersuche

Der Adapter protokolliert auf den Standard-IOBroker-Ebenen. Um detaillierte Meldungen anzuzeigen, erhöhen Sie die Protokollierungsstufe der Instanz (Instanzen → automatic-feeder.x → Protokollierungsstufe) auf **„debug“** oder **„silly“** .

- **Fehler** – Fehler, die Aufmerksamkeit erfordern (z. B. ist ein Schreibvorgang auf den Switch fehlgeschlagen).
- **Warnung** – Fehlkonfiguration (keine Koordinaten, ungültiger Zeitplan …).
- **Info** – Meilensteine (Start, Ausführung oder Blockierung einer Zufuhr, manueller Auslöser).
- **Debugging** – detaillierter Ablauf (Planungsentscheidungen, Temperaturaktualisierungen, Geokodierung, Ein-/Aus-Werte, Bestätigung der Verifizierung/Timeout).
- **Unsinn** – extrem ausführliches Protokollieren (jeder Timer, jede Blockprüfung, jede Zustandsänderung).

---

## 11. Dynamische Fütterung – Hintergrund und Quellen

Fische (Kois, Goldfische, Teichkarpfen) sind **wechselwarm (wechselwarm)** : Ihr Stoffwechsel richtet sich nach der Wassertemperatur. Als Faustregel gilt, dass sich die Stoffwechselrate **mit jedem Temperaturanstieg um 10 °C etwa verdoppelt** . Dies entspricht genau dem **Q10-Koeffizienten** (typischerweise 2–3), den dieser Adapter verwendet. Daher ist es physiologisch gerechtfertigt, bei warmem Wasser häufiger und etwas mehr und bei kaltem Wasser weniger zu füttern.

**Praktische Temperaturempfehlung (Koi/Teichfische):**

- **Unterhalb von \~4–5 °C** – nicht füttern ( _Winterpause_ beachten).
- **Bei etwa 4–10 °C** – kaum aktiv; selten oder gar nicht füttern, leicht verdauliches (Weizenkeim-) Futter.
- **Bei etwa 10–15 °C** ist die Nahrungsaufnahme reduziert; das Immunsystem ist noch schwach (bei etwa 12 °C).
- **\~15–25 °C** – optimaler Wachstumsbereich, volle Nährstoffversorgung.
- **Oberhalb von \~28 °C** wird der gelöste **Sauerstoff** zum limitierenden Faktor → der O₂-Block ist hier nützlich.

**Wo messen und warum ein zweiter Sensor?** Entscheidend ist die Temperatur des Wassers, in dem sich die Fische tatsächlich aufhalten (ihre **Fresszone** ), _nicht_ die Oberflächentemperatur (die um mehrere Grad abweichen kann). In einem Teich, der durch eine laufende Pumpe durchmischt wird, oder in einem flachen Teich genügt ein gut platzierter Sensor. Nur in einem **tiefen, undurchmischten Teich** schichtet sich das Wasser: Oberhalb von 4 °C befindet sich das warme Wasser oben (unten ist es kälter); unterhalb von 4 °C kehrt sich dies um, wodurch sich in Bodennähe eine etwa 4 °C warme Zone bildet. Hier bietet ein **zweiter (tieferer) Sensor** Vorteile – zur Sicherheit (Futter aus der kältesten Schicht), für einen saisonalen Wechsel zwischen flachem und tiefem Wasser und um die Schichtung sichtbar zu machen.`status.waterStratification` Für die meisten Teiche ist es optional.

**Quellen / weiterführende Literatur:**

- Volkoff H. & Rønnestad I. (2020): _Auswirkungen der Temperatur auf Fress- und Verdauungsprozesse bei Fischen._ Temperature 7(4):307–320. <https://pubmed.ncbi.nlm.nih.gov/33251280/>
- KOI – _Wassertemperatur und Koi._ <https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi>
- KOI – _Die Wissenschaft hinter kaltem Wasser in Koiteichen._ <https://koiorganisationinternational.org/koi-articles/science-behind-cold-water-koi-ponds>
- Pond Informer – _Fütterungsleitfaden für Koi._ <https://pondinformer.com/koi-feeding-guide/>

> Diese Werte dienen als allgemeine Richtlinie für Koi/Teichfische und ersetzen nicht die Beobachtung Ihrer eigenen Tiere. Passen Sie die Referenztemperatur, Q10, Grenzwerte und Schwellenwerte an Ihre Fischart und Ihre Haltungsbedingungen an.

## Dokumentation

- 🇩🇪 [Deutsche Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/nl/README.md)
- 🇫🇷 [Dokumentation française](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/it/README.md)
- 🇪🇸 [Dokumentation auf Spanisch](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/pt/README.md)
- 🇺🇦 [Ukrainische Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/uk/README.md)
- 🇨🇳[简体中文文档](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/doc/zh-cn/README.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.18.3 (2026-09-06)
* (ssbingo) Maintenance: updated `@iobroker/adapter-core` to 3.4.3 (repository checker W0034). No functional changes

### 1.18.2 (2026-09-06)
* (ssbingo) Maintenance: dependency updates merged via Dependabot — `@iobroker/adapter-react-v5` 8.3.3, `@tsconfig/node22` 22.0.6 and `dayjs` 1.11.23 (MUI stays 6 as `adapter-react-v5` still requires it); the admin UI was rebuilt. No functional changes

### 1.18.1 (2026-09-03)
* (ssbingo) **Fix – Sayit announcement.** The pre-feeding announcement via **Sayit** now reliably speaks the **current** text: it uses Sayit's documented **`say` message command** (`sendTo`) instead of writing the `tts.text` / `tts.volume` states, which could re-play a **stale/old** announcement (e.g. a previous test message) and raced the separate volume write. Telegram announcements were never affected

### 1.18.0 (2026-09-01)
* (ssbingo) **Central feed list** with its own **Feed list** tab (issue #26). Maintain your food types centrally — **name, vendor/dealer, pellet size (mm)** and the four standard **nutritional values** (crude protein / fat / fibre / ash %), plus an optional **offer/purchase link**. In each switch tab you pick, under **Currently loaded feed**, which feed is currently filled into that feeder
* (ssbingo) This **replaces the per-switch feed profiles** from 1.17.0 (issue #25): existing profiles are automatically merged into the central list, each switch's calibrated **dispense rate stays per switch** (`dispenseGramsPerSec`), and its `activeFeed` now references a feed by **id**
* (ssbingo) New states: **`info.feeds`** (the list as JSON, for VIS/widgets) and per switch **`status.activeFeedName` / `activeFeedVendor` / `activeFeedSize` / `activeFeedProtein` / `activeFeedFat` / `activeFeedFibre` / `activeFeedAsh` / `activeFeedUrl`**. The active feed is selectable from VIS via the writable `settings.activeFeed` (feed id)
* (ssbingo) Documentation updated in all 11 languages and in the German PDF handbook

### 1.17.0 (2026-09-01)
* (ssbingo) **Feed profiles for the feeding-amount model.** Instead of a single rate you can define several **named feed types** per switch, each with its own calibrated **dispense rate (g/s)** (e.g. a 3 mm all-round and a 6 mm summer pellet); the **active** profile's rate drives Phase B. Manage the list in the admin (the calibration helper fills the active profile), switch the active feed from the VIS widget via the writable `settings.activeFeed` state
* (ssbingo) New states **`status.dispenseRate`** (effective g/s) and **`status.activeFeedName`**. Backward compatible — with no profile defined, the single dispense rate is used
* (ssbingo) Documentation updated in all 11 languages and in the German PDF handbook

### 1.16.0 (2026-08-31)
* (ssbingo) **Feeding-amount model – high-temperature throttling** (issue #23). The percentage table no longer stays at 3 % above 23 °C: the top band now ends at 28 °C and two new editable bands throttle the amount in the heat – **1.5 % at 28–30 °C** and **0.5 % above 30 °C** (the temperature response peaks around 24–26 °C and falls off above it). Behaviour up to 28 °C is unchanged; existing switches get the new bands with sensible defaults
* (ssbingo) **Feeding-amount settings are now editable from VIS/scripts** (issue #24): the model's config (`amountModelEnabled`, fish counts, temperature percentages, `amountControlEnabled`, `dispenseGramsPerSec`, `feedDailyMaxGrams`) is mirrored as writable `switches.<id>.settings.*` states, so a VIS widget can edit them
* (ssbingo) New states **`status.feedingsPerDayToday`** and **`status.feedTargetPortionGrams`** (recommended grams per single feeding = daily amount ÷ feedings, after cap / water-quality reduction)
* (ssbingo) Documentation updated in all 11 languages and in the German PDF handbook

### 1.15.1 (2026-08-31)
* (ssbingo) Fix (relay board): a **false "did not switch off" fault** could be reported for a board-fed switch even though it fed and switched off correctly. The **target object (e.g. the Shelly) is now authoritative** for the off check — a fault (and the Telegram/Sayit notification) is only raised when the target is genuinely still on. If the target is off but the board's `/api/status` cannot confirm its relay off in time (a brief hiccup, or its countdown ending a moment later), the adapter now logs a **warning** instead of a fault; the safety back-stop still forces the board off

### 1.15.0 (2026-08-31)
* (ssbingo) **Water-quality limits (Phase C).** New optional per-switch **ammonia (NH₃/NH₄)** and **nitrite (NO₂)** sources – "if these values rise, feed less" (from the feeder manual). Each has a **warn threshold** that **reduces the daily amount** (only in the feeding-amount control mode) and a **max threshold** that **blocks feeding entirely** in every mode
* (ssbingo) New states **`status.ammonia`** and **`status.nitrite`** mirror the source values; when a max threshold is exceeded the block reason (`blockAmmoniaHigh` / `blockNitriteHigh`) appears in `status.blockReason`. There are no universal safe limits – set the thresholds from your own test kit
* (ssbingo) Documentation updated in all 11 languages and in the German PDF handbook

### 1.14.2 (2026-08-31)
* (ssbingo) Fix (admin UI, **dark mode**): the configuration page is now wrapped in the theme the admin has already resolved, so the **tab labels are visible immediately in dark mode**. Previously they rendered as dark text on a dark background (only revealed on hover or after opening a tab), because the tabs inherited the outer theme that is fixed at page-load time. Applies on first open and when you toggle the theme

### 1.14.1 (2026-08-29)
* (ssbingo) UI: opening a switch's **Relay** tab now runs the **connection test and reads the board data automatically** (once, when a board address is configured) — the connection status, system overview and S1–S3 button times load without clicking *Test connection*. A plain read no longer marks the configuration as changed

---

[Older changelogs can be found there](https://github.com/ssbingo/ioBroker.automatic-feeder/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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