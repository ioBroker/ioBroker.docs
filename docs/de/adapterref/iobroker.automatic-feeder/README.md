---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.automatic-feeder/README.md
title: ioBroker.automatic-feeder
hash: 43yJtBOiyWpzSFcw2NZSm4jNDjJgJxpD5hKkHk2qjk4=
---
![Logo](../../../en/adapterref/iobroker.automatic-feeder/admin/automatic-feeder.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.automatic-feeder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.automatic-feeder.svg)
![Anzahl der Installationen](https://iobroker.live/badges/automatic-feeder-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/automatic-feeder-stable.svg)
![NPM](https://nodei.co/npm/iobroker.automatic-feeder.png?downloads=true)

# ioBroker.automatic-feeder

**Tests:** ![Test und Freigabe](https://github.com/ssbingo/ioBroker.automatic-feeder/workflows/Test%20and%20Release/badge.svg)

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

> ### 🔌 Passende Hardware — die **Zuführungsrelais** Zeitschaltuhr
>
> Sie bauen eine Stromzuführung und möchten lieber eine fertige Zeitschaltuhr verwenden, anstatt ein eigenes Relais zu verdrahten? Dann schauen Sie sich Folgendes an: **[Feeder-Relais (Timer-Ersatzplatine)](https://github.com/ssbingo/timer-ersatzplatine)** — eine selbstgebaute ESP32-Timerplatine, die perfekt zu diesem Adapter passt ([Online-Übersicht](https://ssbingo.github.io/timer-ersatzplatine/)).
>
> **Es handelt sich um ein separates, eigenständiges Projekt – unabhängig vom Adapter.** Die Platine und dieser Adapter sind aufeinander abgestimmt, aber völlig unabhängig voneinander: Der Adapter funktioniert auch ohne die Platine, und die Platine funktioniert auch ohne den Adapter.

---

## Adapter für automatische Zuführung für ioBroker

Dieser Adapter wandelt jeden vorhandenen ioBroker-Schalter (eine smarte Steckdose, ein Relais, einen GPIO-Ausgang usw.) in einen zeitgesteuerten Schalter um. **automatischer Zuführer**Es schaltet den Ausgang für eine festgelegte Anzahl von Sekunden zu den von Ihnen konfigurierten Zeiten ein und kann Temperatur und Tag-Nacht-Zyklus berücksichtigen, sodass es nie zum falschen Zeitpunkt Strom liefert.

Dieses Dokument ist eine vollständige Bedienungsanleitung. Wenn Sie den Adapter noch nie benutzt haben, lesen Sie es von oben nach unten. **Schnellstart** Sie gelangen in wenigen Minuten zur ersten Fütterung, der Rest erklärt jede Option im Detail.

> 🇩🇪 Deutsche Anleitung: [doc/de/README.md](doc/de/README.md) • andere Sprachen: siehe
> [Dokumentation](#documentation) ganz unten.

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

Eine „Fütterung“ ist einfach: **Einen Ausgang EIN schalten → eine konfigurierbare Anzahl von Sekunden warten → ihn wieder AUS schalten**Bei einem umgebauten Futterautomaten gibt der laufende Motor während dieser Sekunden das Futter aus.

Der Adapter kann verwalten **bis zu 5 Schalter**Jeder Schalter ist völlig unabhängig und verfügt über einen eigenen Konfigurationsreiter, der nach dem Schalter benannt ist. Sie legen pro Schalter Folgendes fest:

- **Wann** es ernährt sich – entweder bei **feste Zeiten** (z. B. 08:00 und 18:00) oder in einem **Intervall**
  innerhalb eines Zeitfensters (z. B. alle 60 Minuten zwischen 08:00 und 18:00 Uhr);
- **Wie lange** Der Ausgang bleibt eingeschaltet (Einspeisungsdauer in Sekunden);
- **ob blockiert werden soll** Fütterung bei zu niedriger/zu hoher Wasser- oder Lufttemperatur;
- **ob Einschränkungen** Einspeisung in das astronomische Tagesfenster (Sonnenaufgang/Sonnenuntergang mit schalterspezifischen Abweichungen, von einem System, gemeinsam genutzter oder schalterspezifischer Standort);
- **ob Aufsicht geführt werden soll** den Schalter (prüfen Sie, ob er sich tatsächlich ein- und ausschalten ließ) und senden Sie optional ein **Telegramm** Nachricht über das Ergebnis;
- **ob reduzieren oder pausieren** Fütterung während eines wiederkehrenden **Winter** Saison – optional mit Telegram-Erinnerungen vor Beginn und Ende;
- **ob man sich anpassen soll** das Intervall und den Anteil an der Wasser-/Lufttemperatur automatisch (**dynamische Zuführung**, Q10-Modell);
- **ob blockiert werden soll** Fütterung, wenn das gelöste **Sauerstoff** (O₂) ist zu niedrig;
- **bis zu 3 einmalige Fütterungspausen** (absolute Datums- und Zeiträume, z. B. eine Quarantäne nach der Wiederauffüllung des Lagerbestands) mit einem **Telegramm** Nachricht am Anfang und Ende jedes Abschnitts;
- A **Hauptpausenschalter** (_Fütterung jetzt einstellen_) das sofort unterbricht **alle** Stromzufuhr für einen Schalter, bis Sie ihn wieder ausschalten, mit einem **Telegramm** Bei jedem Umschalter wird eine Nachricht angezeigt.

Sie können auch eine Fütterung auslösen. **manuell** jederzeit – von der Einstellungsseite des Adapters (Schaltfläche mit frei wählbarer Dauer) oder von einem Datenpunkt (z. B. einer Schaltfläche in einer VIS-Ansicht).

Optionalerweise integriert der Adapter die **Relaisplatine für automatische Zuführung** (Ein ESP32 mit drei Timer-Tasten und eigener Weboberfläche). Sie entscheiden. **pro Schalter** unabhängig davon, ob eine solche Platine verwendet wird; wenn Sie sie für einen Schalter in den allgemeinen Einstellungen aktivieren, erhält dieser Schalter eine **Relais** Registerkarte, auf der Sie die Netzwerkadresse der Platine einstellen, die Verbindung testen und die drei Tasten-Einspeisungszeiten (S1–S3) direkt vom Adapter aus konfigurieren können.

> Wichtig: Der Adapter erzeugt den Schalter niemals selbst. **steuert ein bereits existierendes Objekt** in Ihrem ioBroker-System. Sie wählen dieses Objekt in der Konfiguration aus.

---

## 2. Anforderungen

| Du brauchst                                                                          | Details                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker** mit **admin ≥ 7.8.23**, **js-controller ≥ 6.0.11** Und **Node.js ≥ 22** | Erforderliche Mindestversionen. Die Konfigurationsseite wurde mit React 19 erstellt.                                                                                                                                                                                                     |
| **Ein Schalterobjekt**                                                               | Jeder beschreibbare ioBroker-Zustand, der Ihren Feeder ein-/ausschaltet – z. B. eine intelligente Steckdose (`shelly.0.…`, `sonoff.0.…`, `zigbee.0.…`), ein Relais, eine Skriptvariable.                                                                                                 |
| _(optional)_ **Geokoordinaten**                                                      | Wird verwendet, um Sonnenaufgang/Sonnenuntergang pro Schalter zu berechnen. **astronomisches Fenster**Wird nur benötigt, wenn ein Switch dieses Fenster verwendet; wird aus den ioBroker-Systemeinstellungen übernommen, ist eine gemeinsame Position oder wird pro Switch konfiguriert. |
| _(optional)_ Temperaturobjekte                                                       | Bestehende Zustände mit Luft- und/oder Wassertemperatur, für Temperaturblockierung oder dynamische Zufuhr. Zugewiesen **pro Schalter** auf der Registerkarte "Schalter".                                                                                                                 |
| _(optional)_ **Sauerstoff (O₂)** Objekte                                             | Bestehende Zustände mit gelöstem Sauerstoff, um die Zufuhr zu blockieren, wenn der Sauerstoffgehalt zu niedrig sinkt. Zugewiesen **pro Schalter**.                                                                                                                                       |
| _(optional)_ A **Telegramm** Beispiel                                                | Der Offizielle `telegram` Adapter, konfiguriert und betriebsbereit, falls Sie Push-Benachrichtigungen wünschen.                                                                                                                                                                          |
| Internetzugang auf dem ioBroker-Host                                                 | Nur für die Adresssuche/Kartendarstellung in der Konfiguration. Der normale Betrieb funktioniert offline.                                                                                                                                                                                |

---

## 3. Installation

1. Im ioBroker **Administrator**, öffnen Sie die **Adapter** Tab.
2. Finden **automatischer Zuführer** in der Liste auswählen und klicken **Installieren**.
3. Erstellen Sie einen **Beispiel** des Adapters.
4. Öffnen Sie die Instanzeinstellungen (das Zahnradsymbol) – Sie sollten die Konfigurationsseite mit der
   **Allgemeine Einstellungen** Registerkarte. Falls diese leer bleibt, siehe [Fehlerbehebung](#9-troubleshooting--faq).

---

## 4. Schnellstart – Ihre erste Fütterung

Das Ziel: Jetzt sofort einen Schalter für 5 Sekunden betätigen, um zu beweisen, dass alles funktioniert.

1. **Öffnen Sie die Einstellungen** der automatischen Zuführungsinstanz.
2. Auf dem **Allgemeine Einstellungen** Tab:
   - Unter **Standort**, verlassen _Verwenden Sie die Systemeinstellungen für alle Schalter._ Ausgewählt (nur relevant, wenn Sie später das astronomische Fenster aktivieren). Sie können auch einen gemeinsamen Standort auswählen oder ihn pro Schalter konfigurieren.
   - Scrollen Sie nach unten zu **Schalter** und klicken **Schalter hinzufügen**.
   - Gib ihm ein **Name** (z.B `Koi pond`Dieser Name wird zum Titel eines eigenen Tabs.
   - Klicken Sie auf das Listensymbol neben **Switch-Objekt** Wählen Sie den Zustand, der Ihre Zuleitung (z. B. Ihre smarte Steckdose) schaltet. Stellen Sie sicher, dass der Schalter aktiv ist. **Aktiv** (Kontrollkästchen links).
3. **Speichern** (das Häkchen unten). Ein neuer Tab mit dem Namen Ihrer Switch wird angezeigt.
4. Öffne das **Registerkarte wechseln**Ganz oben unter **Manuelle Zuführung**eine Dauer festlegen (z. B. `5`
   Sekunden) und klicken **Jetzt füttern**Der Ausgang sollte sich für 5 Sekunden einschalten und dann wieder ausschalten.
5. Sie befinden sich immer noch auf der Registerkarte „Schalter“ und richten den eigentlichen Zeitplan unter folgendem Eintrag ein: **Fütterungsplan** (z. B. feste Zeiten 08:00 und 18:00 Uhr) und die **Fütterungsdauer** unter **Fütterungsaktion**, Dann **Speichern**.

Das war's – der Adapter versorgt die Stromversorgung nun automatisch. Im Folgenden werden die verschiedenen Optionen ausführlich erläutert.

---

## 5. Die Einstellungsseite im Detail

Die Konfiguration hat eine **Allgemeine Einstellungen** Tab Plus **ein Tab pro Schalter** (Wird automatisch erstellt, sobald ein Schalter benannt ist). Falls eine Seite nicht scrollt, vergrößern Sie das Fenster oder verwenden Sie die Bildlaufleiste rechts – alle Abschnitte sind erreichbar.

### 5.1 Registerkarte „Allgemeine Einstellungen“

#### Standort (für das astronomische Beobachtungsfenster)

Der Standort wird verwendet, um Sonnenaufgang/Sonnenuntergang für die **astronomisches Fütterungsfenster** das pro Schalter aktiviert werden kann (siehe _Einschränkungen_ (auf der Registerkarte „Switch“). Dies ist nur erforderlich, wenn mindestens ein Switch dieses Fenster verwendet. Drei Optionen:

- **Verwenden Sie die Systemeinstellungen für alle Schalter.** – Übernimmt die Breiten- und Längengradangaben aus der ioBroker-Systemkonfiguration (empfohlen, falls diese bereits festgelegt sind). Die aktuellen Werte werden angezeigt.
- **Ein gemeinsamer Ort für alle Schalter** – eine einzige Position festlegen, die alle Schalter verwenden:
  - Geben Sie eine ein **Adresse** und Presse **Suchen**Der Adapter löst das Problem (über OpenStreetMap / Nominatim) und platziert eine Markierung.
  - Oder **Klicken Sie auf die Karte** / **Ziehen Sie die Markierung** bis auf den exakten Punkt.
  - Die Breiten- und Längengrade können auch direkt eingegeben werden; die Karte folgt dann.
- **Konfigurieren Sie den Standort individuell für jeden Schalter.** – Jeder Schalter definiert seinen eigenen Standort auf einem eigenen Tab (nützlich, wenn sich Futterstellen, z. B. Teiche, an verschiedenen Orten befinden).

> Die Adresssuche läuft im Adapter-Backend, daher **Die Instanz muss laufen.** Dafür benötigen die Kartenkacheln und die Suche einen Internetzugang.

Der **Die Sonnenaufgangs-/Sonnenuntergangs-Offsets werden pro Schalter konfiguriert.** (unter _Einschränkungen_), und die berechneten Zeiten werden pro Schalter veröffentlicht als `status.sunrise` / `status.sunset`, wird jede Nacht automatisch neu berechnet.

#### Schalter

Die Liste der Futterstellen (bis zu 5). Für jeden Eintrag:

- **Aktiv** (Kontrollkästchen) – Nur aktive Schalter werden eingeplant.
- **Name** – Freitext; wird zum Tab-Titel des Schalters und zum Kanalnamen in der Objektstruktur.
- **Switch-Objekt** – den aktuellen ioBroker-Status, der gesteuert werden soll. Verwenden Sie das Listensymbol zum Durchsuchen oder das Kreuz zum Löschen.

Verwenden **Schalter hinzufügen** Zum Erstellen eines weiteren Schalters (maximal 5) und zum Entfernen eines Schalters das Papierkorbsymbol verwenden. Beim Entfernen eines Schalters werden auch dessen Datenpunkte gelöscht.

- **Dieser Schalter verwendet die Relaisplatine „Automatische Zuführung“.** (pro Schalter) – Aktivieren Sie diese Option nur für Schalter, deren Zufuhrstation die optionale automatische Zufuhrrelaisplatine (ESP32) verwendet. Im aktivierten Zustand erhält dieser Schalter eine zusätzliche **Relais** Registerkarte (siehe [5.4](#54-relay-board-tab-optional)).

### 5.2 Registerkarte „Futterliste“

Ein zentrales **Benutzergeführte Liste Ihrer Lebensmittelarten**, wird von allen Switches gemeinsam genutzt. Für jeden eingegebenen Feed:

- **Feed-Name** Und **Verkäufer / Händler**,
- **Pelletgröße (mm)**,
- die vier Standard **Nährwerte** vom Hersteller _analytische Bestandteile_ — **Rohprotein / Fett / Ballaststoffe / Asche (%)**,
- eine optionale **Angebots-/Kauflink** (ein verstecktes Feld, das durch Klicken auf den Link-Button sichtbar wird) zur Online-Nachbestellung.

Fügen Sie beliebig viele Feeds hinzu mit **Futter hinzufügen** und entfernen Sie sie mit dem Papierkorbsymbol. Die Liste wird zentral gespeichert und auch als JSON veröffentlicht in `info.feeds` für VIS/Widgets. In jedem **Registerkarte wechseln** Sie wählen dann unter **Aktuell geladener Feed**Welches dieser Futtermittel sich aktuell in dem jeweiligen Futterautomaten befindet – Name, Größe und Nährwertangaben werden angezeigt als `status.activeFeed*` und kann auch über das VIS-Widget umgeschaltet werden.

### 5.3 Registerkarten wechseln

Jeder konfigurierte Schalter erhält eine eigene Registerkarte mit seinem Namen. Diese enthält die folgenden Abschnitte.

#### Manuelle Zuführung

- **Dauer der manuellen Fütterung (Sekunden)** – die vom Button verwendete Dauer.
- **Jetzt füttern** – Löst sofort eine Fütterung mit dieser Dauer aus. Nützlich zum Testen oder für eine zusätzliche Portion. (Ob es Sperren ignoriert, hängt davon ab, ob…) _Manuelle Auslösung ignoriert alle Blöcke_ In
  _Einschränkungen_.)
- Die Instanz muss ausgeführt werden und die Konfiguration muss korrekt sein. **gespeichert** damit der Knopf funktioniert.

#### Fütterungsplan

Wählen **eins** Modus:

- **Feste Zeiten** – eine Liste von Uhrzeiten (`HH:mm`Fügen Sie beliebig viele hinzu; der Futterautomat fährt jeden Tag alle an. Beispiel: `08:00` Und `18:00`.
- **Intervall innerhalb eines Zeitfensters** – wiederholt innerhalb eines Fensters füttern:
  - **Fensterstart** / **Fensterende** – z. B. von 08:00 bis 18:00 Uhr.
  - **Intervall (Minuten)** – z. B. 60 → Fütterung um 08:00, 09:00, …, bis zum Ende des Zeitfensters, jeden Tag.

Wenn die **astronomisches Fenster** ist aktiviert (siehe _Einschränkunge&#x6E;_&#x44;ie festen Start- und Endzeiten werden durch das Sonnenaufgangs-/Sonnenuntergangsfenster ersetzt und ausgeblendet; das Intervall läuft dann zwischen Sonnenaufgang und Sonnenuntergang. Die nächste geplante Zeit ist immer sichtbar. `status.nextFeeding` Datenpunkt.

#### Fütterungsaktion

- **Fütterungsdauer (Sekunden)** – wie lange der Ausgang während einer geplanten Einspeisung eingeschaltet bleibt.
- **Zum Wert** / **Wert** – die in das Switch-Objekt geschriebenen Werte. Standardwerte sind `true`
  Und `false`Diese passen zu den meisten intelligenten Steckdosen/Relais. Falls Ihr Gerät Zahlen oder Text erwartet, geben Sie z. B. Folgendes ein: `1` / `0` oder `ON` / `OFF` Hier.

#### Temperatur- und Sauerstoffquellen

Jeder Schalter (jede Einspeisestation) hat **seine eigene** Sensoren – verschiedene Teiche/Becken können unterschiedliche Objekte verwenden:

- **Lufttemperatur** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, in dem die Lufttemperatur dieser Station gemessen wird.
- **Wassertemperatur** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, der die Wassertemperatur dieser Station misst. Dies ist die primäre **Fütterungszone** Sensor (platzieren Sie ihn dort, wo die Fische tatsächlich fressen, nicht an der Oberfläche).
- **Wassertemperatur (Tiefe)** – _optionale zweite_ Wassersensor (z. B. im unteren Bereich). Wird nur angezeigt, wenn der primäre Wassersensor aktiviert ist. Bei zwei Sensoren wählen Sie einen **Kombinationsmodus** für dynamische Fütterung:
  _Futterzone (nur flach)_ \[Standard], _Durchschnitt beider_, _kälteste Schicht_, oder _Saisonal_ (Verwendet den Oberflächensensor, solange die Temperatur einen Schwellenwert erreicht oder überschreitet, andernfalls den Tiefensensor). Die Temperatur **Block**
  benutzt immer **kälteste** der beiden Schichten. Ein zweiter Sensor hilft nur dabei **tiefe, unvermischte Teiche**
  (Eine laufende Pumpe vermischt das Wasser und beseitigt jegliche Schichtung) — siehe _Dynamische Fütterung – Hintergrund & Quellen_.
- **Sauerstoff (O₂)** – Kreuzen Sie das Kästchen an und wählen Sie den Staat aus, der den gelösten Sauerstoff enthält.

Nur numerische Zustände sind sinnvoll. Die aktuellen Werte werden auf diesen Schalter übertragen. `status.airTemperature`,
`status.waterTemperature`, `status.waterTemperatureDeep`, `status.oxygen` (Und `status.waterStratification`
\= flache − tiefe) Datenpunkte. Die Schwellenwerte sind unten festgelegt (_Temperaturblockierung_), und die Temperaturen treiben ebenfalls an _Dynamische Zuführung_.

#### Temperaturblockierung

Wird nur für die oben aktivierten Temperaturquellen angezeigt (_Temperatur- und Sauerstoffquelle&#x6E;_&#x50;ro Schalter können Sie:

- **Blockierung durch Wassertemperatur** - Satz _Blockieren, falls unten_ und/oder _Blockieren, falls oben_ (°C).
- **Blockierung durch Lufttemperatur** – Gleiches gilt für Luft.

Liegt die aktuelle Temperatur außerhalb des zulässigen Bereichs, wird die Zufuhr übersprungen und der Grund dafür protokolliert. `status.blockReason`(Wenn ein Temperaturwert unbekannt ist, wird diese Quelle nicht blockiert.)

#### Wasserqualität (Ammoniak / Nitrit)

Optional überwacht der Schalter die **Ammoniak** (NH₃/NH₄) und/oder **Nitrit** (NO₂) des Wassers – „Wenn diese Werte steigen, weniger Wasser zuführen“ (aus der Bedienungsanleitung des Dosierers). Weisen Sie jedem Parameter einen bestehenden Zustand zu und aktivieren Sie ihn. **Futteraufnahme bei schlechter Wasserqualität blockieren/reduzieren**Für jede Substanz legen Sie zwei Schwellenwerte fest:

- **Reduzieren Sie oben** – wenn der Wert **bei oder über** dieser Warnschwellenwert, der **Der Tagesbetrag wird reduziert** auf einen konfigurierbaren Prozentsatz (_Reduziere den Tagesbetrag auf (%)_&#x44;ies tritt nur im Jahr in Kraft. **Fütterungsmengenregelungsmodus** (Im festen/dynamischen Modus gibt es keinen Betrag, der reduziert werden könnte.)
- **Block darüber** – wenn der Wert **über** dieses Maximum, Fütterung ist **vollständig blockiert** in jedem Modus (wie den Temperatur-/Sauerstoffblöcken); der Grund wird geschrieben an `status.blockReason`.

Lassen Sie einen Schwellenwert leer, um diese Stufe zu deaktivieren. Die Live-Werte werden gespiegelt in `status.ammonia`
Und `status.nitrite`Es gibt keine allgemeingültigen Sicherheitsgrenzen (sie hängen von pH-Wert und Temperatur ab) – als Richtwert sollten Sie Ammoniak und Nitrit nahe Null halten und die Schwellenwerte anhand Ihres eigenen Testkits festlegen.

#### Einschränkungen

- **Beschränken Sie die Fütterung auf das astronomische Tagesfenster (Sonnenaufgang/Sonnenuntergang + Zeitverschiebung).** – Im eingeschalteten Zustand ist die Stromversorgung auf das vom Standort dieses Schalters berechnete Tagesfenster beschränkt. _Intervall_
  Und _Dynamische Zuführung_ Dieses Fenster ersetzt den festen Fensterstart/-end; für _Feste Zeiten_ Es fungiert als Tag-/Nachtwächter (Zeiten außerhalb des Zeitfensters werden übersprungen). Wenn es aktiviert ist, können Sie Folgendes einstellen:
  - **Minuten nach Sonnenaufgang** – in dieser Anzahl Minuten beginnen _nach_ Sonnenaufgang (Standardwert 0).
  - **Minuten vor Sonnenuntergang** – Stoppen Sie nach so vielen Minuten _vor_ Sonnenuntergang (Standardwert 0).
  - **Position für diesen Schalter** – wird nur angezeigt, wenn der allgemeine _Standort_ ist eingestellt auf _Person_: wählen _Systemeinstellungen verwenden_ oder _Genauen Standort definieren_ (Adresssuche + Karte) für diesen Switch. Die berechneten Zeiten erscheinen in `status.sunrise` / `status.sunset`.
- **Manuelle Auslösung ignoriert alle Blöcke** – wenn eingeschaltet, die manuelle Taste und die `feedNow` /
  `feedFor` Datenpunkte werden auch dann erfasst, wenn eine Temperatur-/Fenstersperre aktiv ist.

#### Dynamische Zuführung

Optional: die Fütterung anpassen **Intervall und Dauer bis zur Temperatur** Nach dem Q10-Modell (der Stoffwechsel verdoppelt sich annähernd pro +10 °C) ist eine aktive Temperaturquelle erforderlich; feste Zeiten werden dann durch ein Intervall innerhalb des Fensters ersetzt.

- **Aktivieren / Quelle** – Schalten Sie es ein und wählen Sie die Wasser- oder Lufttemperatur. Wenn ein zweiter (Tiefen-)Wassersensor konfiguriert ist, wird die hier verwendete Wassertemperatur gemäß dem gewählten Kombinationsmodus aus den Temperaturen beider Schichten kombiniert (siehe _Temperatur- und Sauerstoffquellen_).
- **Referenz / Q10** – Das Basisintervall und die Basisdauer gelten bei der Referenztemperatur (z. B. 20 °C); Q10 beträgt typischerweise 2–2,5 (der Stoffwechsel verdoppelt sich ungefähr pro +10 °C – siehe _Dynamische Fütterung – Hintergrund & Quellen_).
- **Intervall / Dauer (Basis, Minimum, Maximum)** – Grenzen für das berechnete Intervall (Minuten) und die Dauer (Sekunden). **Das Basisintervall und das maximale Intervall müssen größer als 0 sein.**&#x41;ndernfalls kann keine Fütterung geplant werden.
- **Mittelungsfenster / Hysterese** – Ein gleitender Durchschnitt (z. B. über 24 Stunden) glättet Kursausschläge; die Hysterese vermeidet eine Neuplanung aufgrund kleinster Änderungen.

Die aktuellen Werte werden angezeigt in `status.dynamicAvgTemperature`, `status.dynamicRate`, `status.dynamicIntervalMin` Und `status.dynamicDurationSec`. Eine optionale **Sauerstoff (O₂)** Die Nahrungsaufnahme kann unterbrochen werden, wenn der Gehalt an gelöstem Sauerstoff unter einen bestimmten Schwellenwert sinkt. Die Winterpause hat Vorrang vor der dynamischen Nahrungsaufnahme.

> Wenn die dynamische Fütterung aktiviert ist, aber kein gültiges Intervall berechnet werden kann (Basis- oder Maximalintervall ist 0 oder ein ungültiges Zeitfenster), wird nichts eingeplant: `status.nextFeeding` bleibt leer und `status.blockReason` Zeigt einen Hinweis an. Legen Sie ein Basisintervall und ein maximales Intervall größer als 0 fest.

#### Fütterungsmengenmodell (Empfehlung)

Optional schätzt der Adapter die **empfohlene tägliche Nahrungsmenge** für einen Wechsel von der **Fischbestand** und die **Wassertemperatur**, gemäß der ursprünglichen Anleitung des Zuführers:
`daily amount [g] = total fish weight × percentage(water temperature)`Sie betreten nur den **Anzahl der Fische pro Größenklasse** (15/20/30/40/50/60 cm) in einer kleinen Tabelle mit einem Fischsymbol pro Größe; die
**Das Gewicht pro Größe ist ein fester Schätzwert aus dem Handbuch.** (60/125/350/1000/2000/4000 g). Sie stellen außerdem ein **Fütterungsprozentsatz pro Temperaturband** (Standardwerte: 0 % unter 15 °C, 1 % bei 15–18 °C, 1,5 % bei 18–21 °C, 2 % bei 21–23 °C, 3 % bei 23–28 °C, dann **In der Hitze wurde erneut gedrosselt.**: 1,5 % bei 28–30 °C und 0,5 % über 30 °C – die Temperaturabhängigkeit erreicht ihren Höhepunkt bei etwa 24–26 °C und fällt darüber ab). Es benötigt eine **Wassertemperaturquelle** für den Schalter.

Für sich genommen ist dies ein **Kalkulator** – Es berechnet die Empfehlung und zeigt sie an. Die Ergebnisse werden veröffentlicht in `status.fishTotalWeight` (G), `status.feedPercentToday` (%) Und
`status.feedTargetGramsToday` (g); die Registerkarte "Wechsel" zeigt zusätzlich das geschätzte Gesamtgewicht und ein Beispiel an.

Optional können Sie diesen Betrag angeben. **Kontrollfütterung**: aktivieren **Mit dieser Menge die Fütterung kontrollieren**
Die empfohlene Tagesmenge in Gramm wird in Motorlaufzeit umgerechnet und auf die Fütterungen des Tages verteilt. Dazu kalibrieren Sie die **Abgaberate** (g/s) – Ein kleines Hilfsmodul lässt den Motor einige Sekunden lang laufen, damit Sie das abgegebene Futter wiegen und der Adapter die Ausbringungsmenge berechnen kann – und kann optional eingestellt werden **Tagesmaximum (g)** als Schutz vor Überfütterung. Dieser Modus ist **sich gegenseitig ausschließend mit der dynamischen (Q10) Fütterung**; Die **"Wann"** (feste Zeiten / Intervall / astronomisches Fenster) und alle Blöcke (Nacht, Temperatur, O₂, Pausen, Winter) bleiben unverändert und behalten ihre Priorität. Die resultierende Laufzeit wird veröffentlicht in `status.feedTargetSecondsToday` (s pro Tag) und
`status.feedEffectiveDurationSec` (s pro Fütterung); die Dauer pro Fütterung ist aus Sicherheitsgründen begrenzt.

Der **füttern** Die aktuell im Feeder befindlichen Füllstände werden pro Schalter ausgewählt. **Aktuell geladener Feed**, aus dem Zentrum **Feedliste** (sehen [5.2](#52-feed-list-tab)Name, Pelletgröße und Nährwertangaben sind veröffentlicht in `status.activeFeed*` und es kann auch über das beschreibbare VIS-Widget umgeschaltet werden.
`settings.activeFeed` Status (die Feed-ID). **Abgaberate (g/s)** ist kalibriert **pro Schalter**
(Es hängt von der Mechanik des Zuführers ab), unabhängig davon, welches Material zugeführt wird.

#### Winterpause

Pro Schalter können Sie eine wiederkehrende Funktion definieren. **Winterpause** (saisonal, angegeben als `MM-DD` Daten, die sich jedes Jahr wiederholen und sich um Neujahr erstrecken können).

- **Winterpause aktivieren** – Schalte die Pause ein.
- **Winterbeginn / Winterende** – Wählen Sie Tag und Monat aus einem Kalender (angezeigt im Format TT.MM), z. B. 01.11 bis 15.03.
- **Modus** – während der Pause entweder **Fütterung aussetzen**, füttern mit einem **reduziert** eigenes Intervall oder **einmal täglich** zu einer festgelegten Zeit; ein separates **Winterfütterungsdauer** gilt.
- **Erinnerungen (Telegram)** – In den Tagen vor Beginn und vor Ende (zuletzt am selben Tag) wird zur konfigurierten Uhrzeit eine tägliche Erinnerung versendet. Eine Telegram-Instanz ist erforderlich (siehe unten).

Der aktuelle Zustand wird angezeigt in der `status.winterActive` Datenpunkt. Die Fütterung wird automatisch fortgesetzt, sobald die Pause endet.

#### Fütterungspausen

**Die Stromzufuhr jetzt unterbrechen (Hauptschalter).** Ganz oben in diesem Abschnitt befindet sich ein einzelnes **Ein-/Ausschalter** ermöglicht es Ihnen, den Status zu deaktivieren **alle** Zuleitung für den Schalter **sofort und auf unbestimmte Zeit** — es setzt die unten stehenden zeitbasierten Pausen außer Kraft. **Und** Alle Fütterungsmodi (feste Zeiten, Intervallfütterung, dynamische Fütterung, Winterpause). **aus** Die Fütterung wird wieder aufgenommen, genau wie zuvor konfiguriert; es müssen keine weiteren Änderungen vorgenommen werden. Durch Umschalten wird ein **Telegramm** Nachricht (_An_ / _au&#x73;_&#x54;ypische Anwendung: eine spontane Unterbrechung (Medikamentengabe, Wartungsarbeiten, Wasseraufbereitung) ohne Änderung eines Zeitplans. Die Einstellungen können auf der Einstellungsseite angepasst werden. **und aus VIS/scripts** über `settings.pauseNow`und sein aktueller Zustand wird angezeigt in `status.pauseManual`.

Unterhalb des Hauptschalters, bis zu **3 einmalige Fütterungspausen** Mit jedem Schalter können Sie absolute Datums- und Zeiträume planen, in denen die Fütterung erfolgt. **vollständig ausgesetzt** (Höhere Priorität als alle Fütterungsmodi). Typische Verwendung: a **Quarantäne nach Wiederauffüllung**, wenn neue Fische eine Zeitlang nicht gefüttert werden sollten.

- **Pause 1 / 2 / 3** – Aktivieren Sie das Kontrollkästchen, um die Aktivierung zu ermöglichen, und wählen Sie dann eine aus. **Start** Und **Ende** (Datum + Uhrzeit, angezeigt als `DD.MM.YYYY HH:mm`z.B. `15.07.2026 08:00` Zu `22.07.2026 18:00`.
- Die Fütterung wird unterbrochen, während _Jetzt_ befindet sich innerhalb einer aktivierten Pause und wird am Ende automatisch fortgesetzt.
- A **Telegramm** Die Nachricht wird genau zum richtigen Zeitpunkt gesendet. **Start** Und **Ende** bei jeder Pause (erfordert eine Telegram-Instanz, siehe unten). Wenn der Adapter startet, während eine Pause bereits aktiv ist, wird nur die _Ende_ Nachricht wurde gesendet.
- Kann auf der Einstellungsseite bearbeitet werden. **und aus VIS/scripts** über die `settings.*` Staaten (z. B. `settings.pause1Start`).

Der aktuelle Zustand wird angezeigt in `status.pauseActive` Und `status.pauseActiveUntil` (Der Hauptschalter steuert auch `status.pauseActive`).

#### Wechselaufsicht

Nach dem Umschalten kann der Adapter überprüfen, ob der Schalter **Genau genommen** erreichten den Ein- und Aus-Zustand und meldeten eines von drei Ergebnissen pro Fütterung:

| Ergebnis                       | Bedeutung                                                 | Nachricht                                                                      |
| ------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ✅ Erfolg                       | Der Schalter ließ sich wie erwartet ein- und ausschalten. | "Fütterung für x Sekunden ausgelöst."                                          |
| ❌ bei Fehlschlag               | Der Schalter hat den EIN-Zustand nie bestätigt.           | „Die Fütterung konnte nicht durchgeführt werden. Überprüfen Sie den Schalter!“ |
| ❌ Ausgeschaltet fehlgeschlagen | Es schaltete sich ein, ging aber nicht wieder aus.        | „Fehler: Die Stromzufuhr wurde nicht abgeschaltet!“                            |

> Die Nachricht wird in der konfigurierten ioBroker-Systemsprache (standardmäßig Englisch) gesendet.

- **Prüfen Sie, ob sich der Schalter tatsächlich ein- und ausschalten lässt.** – ermöglicht die Überwachung.
- **Verifizierungs-Timeout (Sekunden)** – wie lange muss man auf die Bestätigung warten?
- **Verifizierungsversuche** – Wie viele gestaffelte Wiederholungsprüfungen durchgeführt werden sollen, bevor ein Fehler gemeldet wird (Standard: 3). Bei jedem Versuch wird auch der aktuelle Status ausgelesen, sodass verzögerte Statusrückmeldungen (z. B. von Homematic-Funkgeräten) keinen Fehlalarm mehr auslösen.

> **Wichtig:** Die Überwachung funktioniert nur, wenn der Schalter **meldet seinen Immobilienwert zurück**, d. h. das Zielobjekt wird aktualisiert mit `ack=true` (Typisch für intelligente Steckdosen/Relais mit Statusrückmeldung). Eine einfache Hilfsfunktion, die niemand beachtet, würde immer einen Fehler melden – in diesem Fall die Überwachung für diesen Schalter deaktivieren.

Das Ergebnis wird auch in der gespeichert `status.lastResult` (Text) und `status.error` (Boolesche) Datenpunkte, auf die Sie reagieren können (z. B. eine eigene Benachrichtigung auslösen).

#### Telegram-Benachrichtigungen

Sende die Überwachungsnachrichten an Telegram – konfiguriert **pro Schalter**:

- **Nachrichtensprache** – die Sprache aller ausgehenden Texte für diesen Wechsel (Telegram, Sayit und die Ankündigung der Fütterung): _Systemsprache_ (die Systemsprache von ioBroker) oder eine bestimmte Sprache. Die Statusdatenpunkte bleiben unberührt.
- **Telegram-Instanz** – Wählen Sie eine der installierten Optionen aus `telegram.*` Instanzen (oder _Keiner_ (Um Telegram für diesen Schalter zu deaktivieren). Falls kein Telegram installiert ist, wird dies im entsprechenden Feld angezeigt.
- **Telegrammempfänger (optional)** – ein bestimmter Benutzer-/Chatname, wie er im Telegram-Adapter konfiguriert ist; leer lassen, um an alle konfigurierten Empfänger zu senden.
- **Kontrollkästchen** – Wählen Sie aus, welche Meldungen gesendet werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder Abschaltfehler.

Der **Erinnerungen zur Winterpause** (falls aktiviert, siehe _Winterpause_) werden unabhängig von diesen Überwachungs-Checkboxes an dieselbe Telegram-Instanz gesendet.

Sehen [Telegram-Benachrichtigungen](#8-telegram-notifications) für die vollständige Konfiguration.

#### Sayit-Benachrichtigungen

Sprechen Sie dieselben Aufsichtsbotschaften über ein **Sayit (Text-zu-Sprache)** Instanz – konfiguriert
**pro Schalter**, unabhängig von Telegram (beide können gleichzeitig aktiv sein):

- **Sagen Sie eine Instanz** – Wählen Sie eine der installierten Optionen aus `sayit.*` Instanzen (oder _Keiner_ (um Sayit für diesen Schalter zu deaktivieren). Falls kein Sayit installiert ist, wird dies im entsprechenden Feld angezeigt.
- **Lautstärke (0–100, optional)** – die Sprechlautstärke für diesen Schalter; lassen Sie dieses Feld leer, um die Standardlautstärke der Sayit-Instanz zu verwenden.
- **Testankündigung** – neben der Instanzauswahl: gibt einen kurzen Testtext über die ausgewählte Instanz aus, damit Sie die Audioausgabe sofort überprüfen können, ohne auf eine Zufuhr warten zu müssen.
- **Kontrollkästchen** – Wählen Sie aus, welche Meldungen vorgelesen werden sollen: erfolgreiche Fütterung, Fütterung fehlgeschlagen und/oder Abschaltfehler (die gleichen drei wie bei Telegram, hier jedoch separat auswählbar).

Der gesprochene Text verwendet die **Nachrichtensprache** Im obigen Telegram-Bereich ausgewählt.

#### Fütterungsankündigung

Kündige eine bevorstehende Fütterung zu einem konfigurierbaren Zeitpunkt im Voraus via Telegram und/oder Sayit an:

- **Füttern im Voraus ankündigen** – schaltet die Ansage ein.
- **Vorlaufzeit (Minuten)** – wie lange vor dem Versand der Ankündigung (z. B. `5`).
- **Ankündigung via Telegram** / **Ankündigung über Sayit** – der/die Kanal(e), der/die für die Ankündigung verwendet wird/werden (jeder Kanal benötigt seine eigene, oben konfigurierte Instanz).

Die Ankündigung wird zusammen mit jeder Fütterung geplant. Wenn zum Zeitpunkt der Ankündigung die Fütterung stattfinden würde **blockiert oder pausiert** (Nacht, Temperatur, Sauerstoffgehalt oder eine Fütterungspause), wird die Ansage übersprungen, sodass nie eine Fütterung versprochen wird, die nicht stattfindet. Manuelle Fütterungen (die _Jetzt füttern_
Taste / `feedFor`) haben keine Vorlaufzeit und werden nicht angekündigt.

### 5.4 Relaisplatinenanschluss (optional)

Dieser Tab wird nur angezeigt, wenn der Schalter **Dieser Schalter verwendet die Relaisplatine „Automatische Zuführung“.**
Die Option ist in den allgemeinen Einstellungen aktiviert (siehe [5.1](#switches)Eine Relaisplatine gehört zu einem Schalter (Einspeisestation). Die Platine ist ein ESP32 mit drei Timer-Tastern (S1–S3) und einer eigenen Weboberfläche, die über Ihr Netzwerk erreichbar ist. **Port 80**Der Adapter **konfiguriert** dem Vorstand **zeigt seinen Status** und – standardmäßig – **löst die Stromzufuhr durch die Platine aus.** (sehen _Die Stromversorgung erfolgt hauptsächlich über die Relaisplatine._ unten), sodass die Platine ihren eigenen Countdown durchführt, ihn auf ihrem Display anzeigt und ihr Relais anschließend wieder selbst abschaltet.

> **Notiz:** Die Relaisplatine für die automatische Zuführung wird parallel dazu entwickelt als **separates Projekt**Der Adapter funktioniert auch ohne die Platine einwandfrei – diese ist ein optionales, praktisches Zubehör. Da sie unabhängig weiterentwickelt wird, können sich einige ihrer Details unabhängig vom Adapter ändern.

- **Boardadresse (IP- oder mDNS-Host)** – z.B. `192.168.1.50` oder `feeder.local`Eine feste IP-Adresse ist am zuverlässigsten; mDNS (`.local`) funktioniert nur, wenn Ihr Hostsystem es auflösen kann. `:port` Ein Suffix ist zulässig, aber normalerweise nicht erforderlich (Standardeinstellung). `80`).
- **Die Stromversorgung erfolgt primär über die Relaisplatine (alternativ: direkt über Shelly).** – standardmäßig aktiviert. Wenn aktiviert, wird eine Datenzufuhr über die Weboberfläche des Boards ausgelöst (`POST /api/trigger`) genau für die berechnete Dauer, so dass **Platine selbst** startet den Countdown, zeigt ihn auf dem OLED-Display an und schaltet das Relais wieder ab. Erst wenn die Platine den Countdown startet, wird dieser auf dem OLED-Display angezeigt und das Relais wieder abgeschaltet. **ist nicht erreichbar** Schaltet der Adapter das Zielobjekt (Shelly) direkt um – analog zu Schaltern außerhalb der Platine? Dadurch spiegeln Anzeige und Protokoll der Platine stets die tatsächliche Stromversorgung wider. Deaktivieren Sie diese Option, um Shelly immer direkt umzuschalten (altes Verhalten). Der tatsächlich verwendete Pfad wird in folgendem Verzeichnis gespeichert: `relay.lastTriggerPath`
  (`board`/`direct`), wurde der Erfolgsmeldung und dem Protokoll hinzugefügt. Sowohl das Board als auch das Board **Und** Die Zielwerte werden überprüft, bevor ein Zuführungsvorgang als abgeschlossen gilt, und ein Sicherheitsanschlag schaltet das Board ab, falls es sich einmal nicht von selbst abschalten sollte.
- **Testverbindung & Abrufzeiten** – kontaktiert den Vorstand einmal. Ein grünes _Verbunden_ Chip und Host/IP/Firmware der Platine bestätigen eine funktionierende Verbindung; die drei Tastendrückzeiten werden dann von der Platine in die unten stehenden Felder ausgelesen. Ein rotes _Nicht verbunden_ Der Chip zeigt den Fehler an. Das läuft auch. **automatisch beim Öffnen des Tabs** (sofern eine Adresse konfiguriert ist), sodass Status, Systemübersicht und Schaltflächenzeiten ohne Klick geladen werden.
- **Tastenbetätigungszeiten (Sekunden)** – die Fütterungszeit jedes Knopfes **S1**, **S2** Und **S3**
  (1–600 s). Weil diese **auch über die Weboberfläche des Boards bearbeitbar**, stets
  _bringen_ Zuerst die richtigen Einstellungen vornehmen, dann anpassen.
- **Zeitersparnis beim Einsteigen** – schreibt die drei Werte an die Tafel.
- **Neustart der Platine** – startet den ESP32 über seine API neu (`POST /api/reboot`Nach einer Bestätigungsabfrage startet das Board neu und ist für einige Sekunden offline, dann kehrt es automatisch zurück.

Am unteren Rand des Tabs befindet sich ein **Systemübersicht** zeigt die Live-Systemdaten des Boards nach einem erfolgreichen Verbindungstest (der _Testverbindung & Abrufzeiten_ Schaltfläche): Firmware-Version und Build, Hostname, IP-Adresse, Wi-Fi-Netzwerk, Signalstärke (dBm), MAC-Adresse, Betriebszeit, freier Speicher und der Grund für den letzten Reset (in Klartext angezeigt, z. B. „Software“).

Die Verbindung wird auch in den Objektbaum gespiegelt und alle 60 Sekunden aktualisiert – siehe
`relay.*` Datenpunkte in [Abschnitt 6](#6-objects--data-points).

---

## 6. Objekte / Datenpunkte

> **Notiz:** Alle Zeitstempeldatenpunkte werden angezeigt in der **lokale Zeitzone des Systems** (Format `DD.MM.YYYY HH:MM:SS`z.B. `01.07.2026 16:20:00`Für VIS und Skripte hat jeder Zeitstempel zusätzlich ein **numerischer Zwilling** endet auf `…Ts` (Unix-Zeit in **Millisekunden**, `0` = keine) — ideal für Countdowns und Zeitbalken ohne String-Parsing und unabhängig vom Anzeigeformat.

Der Adapter erzeugt die folgenden Zustände unter seinem Namensraum (`automatic-feeder.<instance>.`).

**Global**

| Datenpunkt        | Typ                  | Bedeutung                                                                                                                                                                                                    |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection` | boolescher Wert (ro) | Der Adapter läuft und die Konfiguration ist gültig.                                                                                                                                                          |
| `info.feeds`      | Zeichenkette (ro)    | Das Zentrum **Feedliste** als JSON (jeder Futtertyp mit Name, Anbieter, Pelletgröße, Nährwertangaben und Angebotslink) – damit VIS/Widgets die Liste rendern können, ohne die Instanzkonfiguration zu lesen. |

**Pro Schalter, unter `switches.<id>.`** (`<id>` ist eine interne ID wie `sw-0`)

Direkt unter dem Schalter befinden sich der manuelle Auslöser und zwei Unterkanäle:

- **`status`** (`switches.<id>.status.*`) – die unten aufgeführten schreibgeschützten Statusdatenpunkte.
- **`settings`** (`switches.<id>.settings.*`) - ein **bearbeitbar** Spiegelbild der Konfiguration dieses Schalters. Das Schreiben eines neuen Werts dort (über VIS oder ein Skript) ändert die Konfiguration und startet die Instanz neu, damit die Änderung wirksam wird. Einige abgeleitete Felder sind schreibgeschützt (z. B. `winterWindow`).
- **`relay`** (`switches.<id>.relay.*`) – nur vorhanden, wenn dieser Schalter eine Relaisplatine verwendet; die schreibgeschützten Statusdatenpunkte der Relaisplatine sind am Ende der Tabelle aufgeführt.

| Datenpunkt                             | Typ                  | Bedeutung                                                                                                                                                                                                     |
| -------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feedNow`                              | boolescher Wert (rw) | Schreiben `true` um eine manuelle Fütterung auszulösen.                                                                                                                                                       |
| `feedFor`                              | Nummer (rw)          | Geben Sie eine Dauer ein **Sekunden** auslösen **eine Fütterung mit genau dieser Dauer** — Keine Konfigurationsänderung, kein Neustart. Wird auf den vorherigen Stand zurückgesetzt. `0` nach der Ausführung. |
| `status.feedingActive`                 | boolescher Wert (ro) | Die Fütterung läuft gerade.                                                                                                                                                                                   |
| `status.feedingEndsTs`                 | Nummer (ro)          | Ende des **läuft** Eingabe als Unix-Zeit in ms (`0` = keine Fütterung) — für einen Live-Laufzeit-Countdown (z. B. 15 → 0 s) in VIS.                                                                           |
| `status.feedingDurationSec`            | Nummer (ro)          | Gesamtdauer der **läuft** Fütterung in Sekunden (`0` = keine Fütterung) — ermöglicht es einem VIS-Widget, einen exakten Fortschrittsring neben dem Countdown zu zeichnen.                                     |
| `status.lastFeeding`                   | Zeichenkette (ro)    | Zeitstempel der letzten Fütterung.                                                                                                                                                                            |
| `status.lastFeedingTs`                 | Nummer (ro)          | Letzte Fütterung als Unix-Zeit in ms (`0` (noch keine).                                                                                                                                                       |
| `status.nextFeeding`                   | Zeichenkette (ro)    | Zeitstempel der nächsten geplanten Fütterung.                                                                                                                                                                 |
| `status.nextFeedingTs`                 | Nummer (ro)          | Nächste geplante Fütterung als Unix-Zeit in ms (`0` (nichts geplant).                                                                                                                                         |
| `status.blocked`                       | boolescher Wert (ro) | Der letzte Versuch wurde blockiert.                                                                                                                                                                           |
| `status.blockReason`                   | Zeichenkette (ro)    | Warum es blockiert wurde (Nacht / Temperatur / Sauerstoff), in der Systemsprache.                                                                                                                             |
| `status.blockReasonCode`               | Zeichenkette (ro)    | Der Blockgrund als **stabiler maschinenlesbarer Code** (z.B `blockNight`, `blockWaterBelow`, `blockPauseManual`; leer = nicht blockiert) — für die Symbol-/Farblogik in VIS, unabhängig von der Sprache.      |
| `status.lastResult`                    | Zeichenkette (ro)    | Ergebnis des letzten Fütterungsversuchs.                                                                                                                                                                      |
| `status.error`                         | boolescher Wert (ro) | Beim letzten Versuch gab es einen Schaltfehler.                                                                                                                                                               |
| `status.winterActive`                  | boolescher Wert (ro) | Die Winterpause ist derzeit aktiv.                                                                                                                                                                            |
| `status.winterLastStartReminder`       | Zeichenkette (ro)    | Datum der letzten versendeten Erinnerung „Winterbeginn“.                                                                                                                                                      |
| `status.winterLastEndReminder`         | Zeichenkette (ro)    | Datum der letzten versendeten Erinnerung „Winterende“.                                                                                                                                                        |
| `status.pauseManual`                   | boolescher Wert (ro) | Die manuelle Master-Pause (_Fütterung jetzt einstellen_ / `settings.pauseNow`) ist eingeschaltet.                                                                                                             |
| `status.pauseActive`                   | boolescher Wert (ro) | Derzeit ist eine einmalige Fütterungspause aktiv.                                                                                                                                                             |
| `status.pauseActiveUntil`              | Zeichenkette (ro)    | Ende der aktuell aktiven Fütterungspause (leer, falls keine vorhanden).                                                                                                                                       |
| `status.pauseActiveUntilTs`            | Nummer (ro)          | Ende der aktiven Fütterungspause als Unix-Zeit in ms (`0` = keine).                                                                                                                                           |
| `status.dynamicAvgTemperature`         | Nummer (ro)          | Durchschnittliche Temperatur bei dynamischer Zuführung.                                                                                                                                                       |
| `status.dynamicRate`                   | Nummer (ro)          | Der Q10-Ratenfaktor wird derzeit durch dynamische Fütterung angewendet.                                                                                                                                       |
| `status.dynamicIntervalMin`            | Nummer (ro)          | Aktuell berechnetes dynamisches Intervall (Minuten).                                                                                                                                                          |
| `status.dynamicDurationSec`            | Nummer (ro)          | Aktuell berechnete dynamische Dauer (Sekunden).                                                                                                                                                               |
| `status.airTemperature`                | Nummer (ro)          | Eigener Lufttemperaturquellenwert dieses Schalters.                                                                                                                                                           |
| `status.waterTemperature`              | Nummer (ro)          | Eigener Wassertemperaturquellenwert dieses Schalters (Einspeisezone / Flachwassersensor).                                                                                                                     |
| `status.waterTemperatureDeep`          | Nummer (ro)          | Der optionale Wert des Tiefenwassertemperatursensors dieses Schalters.                                                                                                                                        |
| `status.waterStratification`           | Nummer (ro)          | Temperaturdifferenz oberflächennah − tief (nur mit zwei Wassersensoren).                                                                                                                                      |
| `status.oxygen`                        | Nummer (ro)          | Der eigene Wert der gelösten Sauerstoffquelle dieses Schalters.                                                                                                                                               |
| `status.ammonia`                       | Nummer (ro)          | Eigener Ammoniak-Quellenwert (NH₃/NH₄) dieses Schalters.                                                                                                                                                      |
| `status.nitrite`                       | Nummer (ro)          | Eigener Nitrit- (NO₂)-Quellenwert dieses Schalters.                                                                                                                                                           |
| `status.fishTotalWeight`               | Nummer (ro)          | Futtermengenmodell: geschätztes Gesamtgewicht der Fische (g).                                                                                                                                                 |
| `status.feedPercentToday`              | Nummer (ro)          | Futtermengenmodell: Futteranteil in Prozent bei der aktuellen Wassertemperatur (%).                                                                                                                           |
| `status.feedTargetGramsToday`          | Nummer (ro)          | Fütterungsmengenmodell: empfohlene Futtermenge pro Tag (g).                                                                                                                                                   |
| `status.feedingsPerDayToday`           | Nummer (ro)          | Fütterungsmengenmodell: Anzahl der für heute geplanten Fütterungen.                                                                                                                                           |
| `status.feedTargetPortionGrams`        | Nummer (ro)          | Fütterungsmengenmodell: Empfohlene Menge pro Einzelfütterung (g) = Tagesmenge ÷ Fütterungen (nach Begrenzung / Reduzierung der Wasserqualität).                                                               |
| `status.feedTargetSecondsToday`        | Nummer (ro)          | Modell zur Futtermengenregulierung (Regelungsmodus): Gesamte Motorlaufzeit pro Tag (s) zur Abgabe der Menge. 0, wenn die Regelung ausgeschaltet ist.                                                          |
| `status.feedEffectiveDurationSec`      | Nummer (ro)          | Futtermengenmodell (Regelungsmodus): Dauer pro Fütterung, die aktuell gesteuert wird (s). 0, wenn die Regelung ausgeschaltet ist.                                                                             |
| `status.dispenseRate`                  | Nummer (ro)          | Modell für die Futtermenge: Kalibrierte Abgaberate dieses Schalters (g/s).                                                                                                                                    |
| `status.activeFeedName`                | Zeichenkette (ro)    | Aktuell geladener Feed: Name (leer, wenn kein Feed ausgewählt ist).                                                                                                                                           |
| `status.activeFeedVendor`              | Zeichenkette (ro)    | Aktuell geladener Feed: Lieferant / Händler.                                                                                                                                                                  |
| `status.activeFeedSize`                | Nummer (ro)          | Aktuell geladenes Futter: Pelletgröße (mm).                                                                                                                                                                   |
| `status.activeFeedProtein`             | Nummer (ro)          | Aktuell geladenes Futter: Rohprotein (%).                                                                                                                                                                     |
| `status.activeFeedFat`                 | Nummer (ro)          | Aktuell geladenes Futter: Rohfett (%).                                                                                                                                                                        |
| `status.activeFeedFibre`               | Nummer (ro)          | Aktuell geladenes Futter: Rohfaser (%).                                                                                                                                                                       |
| `status.activeFeedAsh`                 | Nummer (ro)          | Aktuell geladenes Einsatzmaterial: Rohasche (%).                                                                                                                                                              |
| `status.activeFeedUrl`                 | Zeichenkette (ro)    | Aktuell geladener Feed: Angebots-/Kauflink (optional).                                                                                                                                                        |
| `status.sunrise` / `status.sunset`     | Zeichenkette (ro)    | Berechneter Sonnenaufgang/Sonnenuntergang für den Standort dieses Schalters (astronomisches Fenster).                                                                                                         |
| `status.sunriseTs` / `status.sunsetTs` | Nummer (ro)          | Sonnenaufgang/Sonnenuntergang als Unix-Zeit in Millisekunden – z. B. für einen Tagesfortschrittsbalken in VIS.                                                                                                |
| `relay.connected`                      | boolescher Wert (ro) | Die für diesen Schalter konfigurierte Relaisplatine ist erreichbar (nur wenn dieser Schalter eine Relaisplatine verwendet).                                                                                   |
| `relay.info`                           | Zeichenkette (ro)    | Identität der Relaisplatine (Host / IP / Firmware) aus der letzten erfolgreichen Abfrage.                                                                                                                     |
| `relay.active`                         | boolescher Wert (ro) | Der Timer der Relaisplatine läuft derzeit.                                                                                                                                                                    |
| `relay.remaining`                      | Nummer (ro)          | Verbleibende Sekunden auf dem Laufzeittimer der Relaisplatine.                                                                                                                                                |
| `relay.lastTriggerPath`                | Zeichenkette (ro)    | So wurde die letzte Fütterung für diesen Schalter ausgelöst: `board` (über die Relaisplatine) oder `direct` (Shelly hat direkt umgeschaltet, z. B. ist die Platine nicht erreichbar).                         |

Sie können diese in VIS, Skripten oder anderen Adaptern verwenden – zum Beispiel in der Anzeige. `status.nextFeeding` auf einem Dashboard oder reagieren auf `status.error = true` um Ihren eigenen Alarm auszulösen.

---

## 7. Beispiele / Rezepte

**Koiteich, zweimal täglich, nur wenn es warm genug ist**

- Modus _Feste Zeiten_ → `08:00`, `18:00`; Dauer `6` S.
- Auf der Registerkarte „Schalter“, unter _Temperatur- und Sauerstoffquellen_, aktivieren _Wassertemperatur_ und den Sensor auswählen; dann _Blockierung durch Wassertemperatur_ → _Blockieren, falls unten_ `8` °C (bei Kälte nicht füttern).
- Unter _Einschränkungen_, aktivieren _Beschränken Sie die Fütterung auf das astronomische Tagesfenster._ Deshalb wird nach Einbruch der Dunkelheit nichts mehr gefüttert.

**Voliere, nur tagsüber (astronomisches Fenster)**

- Modus _Intervall innerhalb eines Zeitfensters_ → Intervall `90` min; Dauer `3` S.
- Unter _Einschränkungen_, das astronomische Fenster mit Offsets aktivieren `30` / `30` min → Die Fütterung erfolgt von 30 Minuten nach Sonnenaufgang bis 30 Minuten vor Sonnenuntergang und passt sich automatisch den Jahreszeiten an.

**Koiteich, temperaturadaptiv (dynamische Fütterung)**

- Auf der Registerkarte „Schalter“, unter _Temperatur- und Sauerstoffquellen_, aktivieren _Wassertemperatur_ und den Sensor auswählen.
- Dann öffnen _Dynamische Zuführung_, aktivieren Sie es, Quelle _Wassertemperatur_.
- Referenz `20` °C, Q10 `2.2`, Basisintervall `60` min (min `30`, max `480`), Basisdauer `5` s (min `2`, max `15`Dann frisst sie häufiger und etwas mehr, wenn es warm ist, und weniger, wenn es kalt ist.

**Winterpause für den Teich**

- Auf der Registerkarte "Schalter" öffnen _Winterpause_, aktivieren Sie es, einstellen _Winterbeginn_ `01.11` Und _Winterende_
  `15.03`, Modus _Fütterung aussetzen_.
- Optional können Sie die Erinnerungen aktivieren, damit Sie einige Tage vor Beginn/Ende eine Telegram-Nachricht erhalten.

**Quarantäne nach Wiederauffüllung (Fütterungspause)**

- Auf der Registerkarte "Schalter" öffnen _Fütterungspausen_, Haken _Pause 1_ und setzen _Start_ `15.07.2026 08:00`,
  _Ende_ `22.07.2026 18:00` → In diesem Zeitraum findet überhaupt keine Fütterung statt, danach wird sie automatisch wieder aufgenommen.
- Bei konfigurierter Telegram-Instanz erhalten Sie eine Nachricht zu Beginn und am Ende der Pause.

**Stromzufuhr jetzt unterbrechen (Hauptschalter)**

- Auf der Registerkarte "Schalter" öffnen _Fütterungspausen_ und einschalten _Fütterung jetzt einstellen_ – oder schreiben `true` Zu
  `automatic-feeder.0.switches.sw-0.settings.pauseNow` von einem VIS-Schalter.
- Die gesamte Fütterung wird sofort gestoppt (und setzt damit alle Modi außer Kraft), bis Sie sie wieder ausschalten; jeder Schalter sendet eine Telegram-Nachricht. `status.pauseManual` zeigt den aktuellen Status an.

**Manuelle Zusatzportionierung über eine VIS-Taste**

- Fügen Sie in VIS eine Schaltfläche ein, die Folgendes schreibt: `true` Zu `automatic-feeder.0.switches.sw-0.feedNow`.
- Oder verwenden Sie ein Schieberegler-/Zahlenfeld, das die Daten ausgibt. **Sekunden** Zu
  `automatic-feeder.0.switches.sw-0.feedFor` → Fütterungen **einmal mit genau dieser Dauer**
  (Keine Konfigurationsänderung, kein Neustart; der Zustand wird zurückgesetzt auf `0` nachher).
- Optional einstellbar _Manuelle Auslösung ignoriert alle Blöcke_ Es ernährt sich also ständig.

---

## 8. Telegram-Benachrichtigungen

1. Installieren und konfigurieren Sie die **Telegramm** Adapter (Erstelle einen Bot mit @BotFather, gib das Token ein und starte einen Chat mit deinem Bot). Stelle sicher, dass die Telegram-Instanz aktiv ist. **läuft**.
2. In einem automatischen Zuführer **Registerkarte wechseln**, offen **Telegram-Benachrichtigungen**:
   - Wählen Sie Ihre **Telegram-Instanz** aus dem Dropdown-Menü (z. B. `telegram.0`).
   - Optional können Sie eine **Empfänger** (der Benutzer-/Chatname, der im Telegram-Adapter angezeigt wird); leer lassen, um alle zu benachrichtigen.
   - Markieren Sie die gewünschten Meldungen: _erfolgreiche Fütterung_, _konnte nicht füttern_, _Abschaltfehler_.
3. Speichern. Ab sofort werden die ausgewählten Überwachungsergebnisse an Telegram (mit dem vorangestellten Schalternamen) gesendet. Dies erfordert _Wechselaufsicht_ muss für diesen Schalter aktiviert sein.
4. Der **Erinnerungen zur Winterpause** Verwenden Sie dieselbe Telegram-Instanz und denselben Empfänger. Diese werden in der Telegram-Verwaltung gesteuert. _Winterpause_ Abschnitt (Tage vor Beginn/Ende und die Erinnerungsstunde) und tun
   **nicht** Die Überwachung muss aktiviert sein.

---

## 9. Fehlerbehebung & Häufig gestellte Fragen

**Die Einstellungsseite ist leer / weiß.**
Laden Sie den Browser neu mit **Strg+Umschalt+R** (Der Administrator hat möglicherweise eine alte Seite zwischengespeichert.) Sollte das Problem weiterhin bestehen, starten Sie die Instanz neu und öffnen Sie die Einstellungen erneut.

**Das neue Symbol / die Änderung wird nicht angezeigt.**
Browser-Cache – Hard-Reload mit **Strg+Umschalt+R**.

**Nichts wird gefüttert.**
Prüfen Sie der Reihe nach: Der Schalter ist **Aktiv**; A **Schalterobjekt** wird ausgewählt; die **Zeitplan** ist gültig (`status.nextFeeding` zeigt eine Zeit an); es ist nicht **blockiert** (schau dir an `status.blocked` / `status.blockReason`); Die **astronomisches Fenster** Die Zeit wird nicht ausgeschlossen; die Instanz festlegen **Protokollierungsstufe** Zu `debug`
und beobachte das Protokoll.

**Es frisst nachts nie, obwohl ich es mir wünsche.**
Deaktivieren _Beschränken Sie die Fütterung auf das astronomische Tagesfenster._ Für diesen Schalter oder passen Sie dessen Sonnenaufgangs-/Sonnenuntergangs-Offsets an. Wenn das astronomische Fenster aktiviert ist, der Schalter aber keine gültigen Koordinaten hat, bleibt sein Fensterschutz inaktiv und eine Warnung wird protokolliert.

**Die Aufsicht meldet immer einen Fehler.**
Ihr Switch-Objekt meldet wahrscheinlich nicht seinen tatsächlichen Zustand zurück (`ack=true`Entweder einen Schalter mit Statusrückmeldung verwenden oder deaktivieren _Wechselaufsicht_ für diesen Schalter.

**Die dynamische Fütterung ändert nichts.**
Stellen Sie sicher, dass die ausgewählte Temperaturquelle (Wasser oder Luft) auf der Registerkarte „Schalter“ aktiviert ist (_Temperatur- und Sauerstoffquellen_) und liefert Werte. Direkt nach einem Neustart füllt sich der gleitende Durchschnitt noch, daher beginnt er mit den Basiswerten. Beobachten `status.dynamicAvgTemperature` Und `status.dynamicIntervalMin`.

**Die dynamische Fütterung ist aktiviert, aber es wird nie etwas gefüttert (`status.nextFeeding` ist leer).**
Der **Das Basisintervall bzw. das maximale Intervall ist 0.** (oder das Zeitfenster ist ungültig), daher kann kein Intervall berechnet werden – `status.blockReason` Anschließend wird ein Hinweis angezeigt. Legen Sie ein Basisintervall und ein maximales Intervall größer als 0 (sowie ein gültiges Fenster) fest. Hinweis: Verlassen _beide_ Das Minimum-Maximum-Intervall von 0 erzwingt ebenfalls das Ergebnis 0.

**Es wird nichts gefüttert, obwohl es nicht Winter ist (oder es wird gefüttert, obwohl es pausieren sollte).**
Überprüfen Sie die _Winterpause_ Daten (`Winter start` / `Winter end`, Format TT.MM) und der Modus.
`status.winterActive` Der Datenpunkt zeigt an, ob die Pause aktuell aktiv ist.

**Die Adresssuche zeigt an, dass die Instanz ausgeführt werden muss.**
Starten Sie die automatische Feeder-Instanz – die Geokodierung läuft im Backend.

**Telegram-Nachrichten kommen nicht an.**
Ist im Menü „Wechsel“ eine Telegram-Instanz ausgewählt? Ist der Telegram-Adapter konfiguriert und aktiv? Ist mindestens ein Nachrichtentyp ausgewählt? _Wechselaufsicht_ ermöglicht?

---

## 10. Protokollierung und Fehlersuche

Der Adapter protokolliert auf den Standard-IOBroker-Ebenen. Um detaillierte Meldungen anzuzeigen, erhöhen Sie die Protokollierungsstufe der Instanz (Instanzen → automatic-feeder.x → Protokollierungsstufe). **debuggen** oder **dumm**:

- **Fehler** – Fehler, die Aufmerksamkeit erfordern (z. B. ein Schreibvorgang auf den Switch ist fehlgeschlagen).
- **warnen** – Fehlkonfiguration (keine Koordinaten, ungültiger Zeitplan …).
- **Info** – Meilensteine (Start, Ausführung oder Blockierung einer Zufuhr, manueller Auslöser).
- **debuggen** – detaillierter Ablauf (Planungsentscheidungen, Temperaturaktualisierungen, Geokodierung, Ein-/Aus-Werte, Bestätigung der Verifizierung/Timeout).
- **dumm** – sehr ausführliche Protokollierung (jeder Timer, jede Blockprüfung, jede Zustandsänderung).

---

## 11. Dynamische Fütterung – Hintergrund und Quellen

Fische (Kois, Goldfische, Teichkarpfen) sind **poikilotherm (ektotherm)**&#x49;hr Stoffwechsel richtet sich nach der Wassertemperatur. Als Faustregel gilt, dass die Stoffwechselrate ungefähr **Verdoppelt sich bei jeder +10 °C**, was genau das ist **Q10-Koeffizient** (typischerweise 2–3) dieser Adapter verwendet — daher ist es physiologisch gerechtfertigt, bei warmem Wetter häufiger und etwas mehr und bei kaltem Wetter weniger zu füttern.

**Praktische Temperaturempfehlung (Koi/Teichfische):**

- **unterhalb von \~4–5 °C** – nicht füttern (verwenden Sie die _Winterpause_).
- **\~4–10 °C** – kaum aktiv; nur selten oder gar nicht füttern, leicht verdauliches (Weizenkeim-) Futter.
- **\~10–15 °C** – reduzierte Nahrungsaufnahme; das Immunsystem ist noch geschwächt (\~12 °C).
- **\~15–25 °C** – optimaler Wachstumsbereich, vollständige Fütterung.
- **oberhalb von \~28 °C** – aufgelöst **Sauerstoff** wird zum limitierenden Faktor → der O₂-Block ist hier nützlich.

**Wo soll gemessen werden und warum ein zweiter Sensor?** Die entscheidende Temperatur ist die des Wassers, in dem sich die Fische tatsächlich aufhalten (die **Futterzone**), _nicht_ Die Oberfläche (die um mehrere Grad abweichen kann). In einem Teich, der durch eine laufende Pumpe umgewälzt wird, oder in einem flachen Teich genügt ein gut platzierter Sensor. Nur in einem
**tiefer, unvermischter Teich** Schichtet sich das Wasser? Oberhalb von 4 °C befindet sich das warme Wasser oben (unten ist es kälter); unterhalb von 4 °C kehrt sich die Schichtung um, wodurch sich in Bodennähe eine etwa 4 °C kalte Zone bildet. **zweiter (tiefer) Sensor** bietet einen Mehrwert – für die Sicherheit (Speisung durch die kälteste Schicht), für einen saisonalen Wechsel zwischen flachen und tiefen Wasserschichten und um die Schichtung sichtbar zu machen (`status.waterStratification`Für die meisten Teiche ist es optional.

**Quellen / weiterführende Literatur:**

- Volkoff H. & Rønnestad I. (2020): _Auswirkungen der Temperatur auf die Nahrungsaufnahme und Verdauungsprozesse bei Fischen._ Temperatur 7(4):307–320. <https://pubmed.ncbi.nlm.nih.gov/33251280/>
- KOI – _Wassertemperatur und Koi._ <https://koiorganisationinternational.org/koi-articles/water-temperature-and-koi>
- KOI – _Die Wissenschaft hinter kaltem Wasser in Koiteichen._ <https://koiorganisationinternational.org/koi-articles/science-behind-cold-water-koi-ponds>
- Pond Informer – _Fütterungsanleitung für Kois._ <https://pondinformer.com/koi-feeding-guide/>

> Diese Werte dienen als allgemeine Richtlinie für Koi/Teichfische und ersetzen nicht die Beobachtung Ihrer eigenen Tiere. Passen Sie die Referenztemperatur, Q10, Grenzwerte und Schwellenwerte an Ihre Fischart und Ihre Haltungsbedingungen an.

## Dokumentation

- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Französische Dokumentation](doc/fr/README.md)
- 🇮🇹 [Documentazione italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Polnische Dokumentarfilme](doc/pl/README.md)
- 🇵🇹 [Documentação portuguesa](doc/pt/README.md)
- 🇺🇦 [Dokumentarfilm](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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