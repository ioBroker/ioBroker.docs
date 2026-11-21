---
chapters: {"pages":{"en/adapterref/iobroker.weather-warnings/README.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README.md"},"en/adapterref/iobroker.weather-warnings/README_DE.md":{"title":{"en":"ioBroker.weather-warnings"},"content":"en/adapterref/iobroker.weather-warnings/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weather-warnings/README_DE.md
title: ioBroker.weather-warnings
hash: HwR1IHXMdPYTJoeXfiV/IsC+E9GuTszZTh56ZKgRW3U=
---
![Logo](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weather-warnings-installed.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)
![NPM](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Test und Freigabe](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# ioBroker.weather-warnings

## Wetterwarnungen Adapter für ioBroker

[English Readme](/#/adapters/weather-warnings) · Den Changelog gibt es nur in der englischen Readme.

Der Adapter enthält amtliche Wetter- und Bevölkerungsschutz-Warnungen für deine Orte und

- verschickt sie als Text- oder Sprachnachricht (Telegram, WhatsApp, Pushover, Gotify, E-Mail, NSPanel, Alexa, SayIt),
- schreibt sie in Datenpunkte (Rohdaten, formatierte Werte, nach Warntyp gruppierte Warnungen) für VIS und Skripte.

Alle Texte entstehen aus Vorlagen, die du im Admin mit Live-Vorschau bearbeitest.

### Anbieter

| Anbieter                         | Gebiet      | Ortsangabe                          | Hinweis                                                                                |
| -------------------------------- | ----------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| **DWD** (Deutscher Wetterdienst) | Deutschland | Gemeinde oder Kreis aus einer Liste | amtliche Wetterwarnungen                                                               |
| **UWZ** (Unwetterzentrale)       | Europa      | Koordinaten                         | Wetterwarnungen                                                                        |
| **ZAMG / GeoSphere**             | Österreich  | Koordinaten                         | Wetterwarnungen                                                                        |
| **NINA** (Warn-App des BBK)      | Deutschland | Koordinaten → Landkreis             | Bevölkerungsschutz: MoWaS, KATWARN, BIWAPP, Polizei; optional DWD und Hochwasser (LHP) |

Pro Anbieter sind mehrere Orte möglich. Jeder Ort ist ein eigenes Gerät unter `provider.<anbieter>.<ort>` Die

### Benachrichtigungsdienste

Telegram, WhatsApp, Pushover, Gotify, E-Mail, NSPanel (nspanel-lovelace-ui), Alexa (alexa2), SayIt sowie zwei Ausgaben innerhalb des Adapters:

- **Verlauf (History)** : Liste der letzten Warnungen in einem Datenpunkt
- **JSON-Array** : die aktuellen Warnungen als JSON für Skripte

Telegram, WhatsApp, Pushover, Gotify und E-Mail können gleichzeitig an mehrere Adapter-Instanzen senden.

## Voraussetzungen

- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer
- Admin 8.1.0 oder neuer

## Installation

Adapter über den ioBroker-Admin installieren. Beim ersten Start schreibt die Instanz die Nachrichtenvorlagen in der Systemsprache. War die Konfigurationsseite schon offen, **lade sie neu** , damit die Vorlagen erscheinen.

## Konfiguration

### Allgemein

![Allgemein](../../../en/adapterref/iobroker.weather-warnings/img/config-general_de.png)

- **DWD / UWZ / ZAMG / NINA aktivieren** : Schaltet den Datenabruf dieses Anbieters ein. Jeder Anbieter erhält einen eigenen Reiter.
- **Telegram / Pushover / … aktivieren** : schaltet einen Benachrichtigungsdienst ein. Seine Einstellungen stehen im Reiter _Benachrichtigungsdienste_ .
- **Farbe der Symbole** : Farbsatz für `${iconurl}` Die
- **Aktualisierungsintervall** : in Minuten, für alle Anbieter (mindestens 5).
- **Maximale Anzahl verarbeiteter Warnungen pro Anbieter** : Anzahl der Datenpunkt-Plätze `00`, `01`, … pro Ort.
- **Eingehende Warnungen nach dem Adapterstart gelten als bekannt** : Warnungen, die beim Start bereits bestehen, lösen keine Benachrichtigungen aus.
- **Experte** : zeigt weitere Einstellungen (Ruhezeiten für Sprachausgabe, alternative Icon-URLs, welche Datenpunkt-Ordner geschrieben werden, Testoptionen).
- **Testwarnungen aktivieren** : nutzt eingebaute Testdaten statt der echten Anbieter.

### Vorlagen

![Vorlagen](../../../en/adapterref/iobroker.weather-warnings/img/config-templates_de.png)

Die Nachrichten entstehen aus Vorlagen. Der Herausgeber zeigt

- die Liste der Vorlagen (durchsuchbar) mit der Anzahl der Stellen, die sie verwenden,
- wo eine Vorlage verwendet wird ( **Verwendet von** ) – beim Umbenennen werden alle diese Stellen mit angepasst,
- eine Palette aller Platzhalter – Klick fügt ein,
- Eine **Live-Vorschau** , die der Adapter mit den aktuellen Warnungen erzeugt (oder mit Beispieldaten, wenn keine aktiv sind).

Syntax der Vorlagen:

- `${token}` wird durch einen Wert der Warnung ersetzt, z. B. `${headline}`, `${starttime}`. Ein großer Anfangsbuchstabe (`${Warntypename}`) schreibt den Wert groß.
- `${_meineVorlage}` fügt eine andere Vorlage ein. Vorlagen, deren Schlüssel mit `_` beginnt, werden die Dienste nicht angeboten.
- `${[a,b,c,d,e]warnlevelnumber}` wählt einen Eintrag über einen Zahlen-Platzhalter, z. B. `${[0,🟢,🟡,🟠,🔴]warnlevelnumber}` Die
- `${(wert=token)dann#sonst}` Oder `${(wert=token)dann}` – Vergleiche `=`, `!=`, `<`, `>` Die
- `\n` ist ein Zeilenumbruch; in JSON-Vorlagen muss eine schließende Klammer als `\}` geschrieben werden.

**Vorlagen wiederherstellen** setzt alle Vorlagen auf die Standardvorlagen in der aktuellen Systemsprache zurück (eigene Vorlagen gehen verloren). **Fügt Standardvorlagen hinzu** ergänzt nur fehlende.

<details>
<summary>Alle Platzhalter</summary>

| Platzhalter                                                                                 | Bedeutung                                                             |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `headline`, `description`, `instruction`, `impact`                                          | Texte der Warnung (`impact` nur ZAMG)                                 |
| `warnlevelname`, `warnlevelnumber`                                                          | Stufe als Text / Zahl 0–4                                             |
| `warnlevelcolorname`, `warnlevelcolorhex`                                                   | Farbe der Stufe als Text / Hex                                        |
| `warntypename`                                                                              | Warntyp, wie ihn der Anbieter liefert                                 |
| `warntypegenericname`, `warntypegeneric`                                                    | vereinheitlichter Warntyp (siehe unten) als Text / Zahl               |
| `weatheremoji`, `iconurl`, `htmlicon`                                                       | Emoji, URL des Icons, Icon als Base64-`<img>`                         |
| `location`, `locationcustom`, `provider`                                                    | Gebiet laut Anbieter, dein Ortsname, Anbieter                         |
| `starttime`, `startdate`, `startday`, `startmonth`, `startdayofweek`, `startdayofweekshort` | Beginn                                                                |
| `endtime`, `enddate`, `endday`, `endmonth`, `enddayofweek`, `enddayofweekshort`              | Ende                                                                  |
| `startdaytime`, `enddaytime`, `startadverb`                                                 | Tageszeit, „heute/morgen/…“                                           |
| `countdown`, `cdhour`, `cdminute`, `cdfuture`                                               | Zeit bis zum Beginn                                                   |
| `starttimems`, `endtimems`                                                                  | Zeitstempel in ms (`endtimems` ist 0, wenn die Warnung kein Ende hat) |
| `ceiling`, `altitude`                                                                       | Höhenbereich (DWD, UWZ)                                               |
| `status`, `warningcount`                                                                    | neu / Bestehend / Entwarnung, Anzahl der Warnungen                    |
| `zamgdayPeriod`                                                                             | ZAMG: ganztägige Warnung                                              |

</details>

### Anbieter

![DWD](../../../en/adapterref/iobroker.weather-warnings/img/config-dwd_de.png)

- **DWD** : Gemeinde oder Kreis aus der Liste wählen (rund 10 000 Einträge). Nach der Eingabe kurz auf einen anderen Reiter und zurück wechseln – die Liste ist zu groß, um sofort aktualisiert zu werden.
- **UWZ** : Koordinaten `Breite/Länge`. Der Adapter ermittelt einmalig das UWZ-Gebiet und speichert es.
- **ZAMG** : Koordinaten in Österreich.
- **Ortsname (benutzerdefiniert)** : eigener Name für den Ort, verfügbar als `${locationcustom}` Die
- **Rohdaten filtern: Startzeit** : verwirft Warnungen, die mehr als X Stunden in der Zukunft beginnen (0 = aus).
- **Warntypen** : Die ausgewählten Typen werden verworfen.
- **Stufe** : Warnungen unter dieser Stufe werden verworfen. Das farbige Quadrat zeigt die Farbe der Stufe.

#### NINA

![NINA](../../../en/adapterref/iobroker.weather-warnings/img/config-nina_de.png)

NINA ist die offizielle Warn-App des Bundesamts für Bevölkerungsschutz und Katastrophenhilfe (BBK). Sie enthält Warnungen, die Wetterdienste nicht haben: Gefahrstoffe, Trinkwasser, Bombenfunde, Stromausfälle, Polizeilagen, Hochwasser, …

- **Koordinaten** : werden aus den ioBroker-Systemeinstellungen vorbelegt. Beim Start ermittelt der Adapter aus den Koordinaten des Landkreises und zeigt dessen Schlüssel (ARS) in der Tabelle. NINA warnt pro Landkreis, zwei Orte im selben Landkreis werden deshalb nur einmal abgefragt.
- **Quellen** : welche NINA-Quellen verwendet werden. Standard: MoWaS (Bevölkerungsschutz), KATWARN, BIWAPP und Polizei. **DWD** gibt es als eigene Anbieter und **Hochwasser (LHP)** ist sehr lokal, deshalb sind beide standardmäßig aus.
- Warnungen ohne Ende (bei MoWaS häufig) zeigen in `${endtime}` „bis auf Widerruf“; Sie enden, wenn NINA sie entfernt.
- Entwarnungen beenden die zugehörige Warnung; Aktualisierungen ersetzen die Warnung ohne neue Benachrichtigung (außer die Stufe steigt).
- Die Texte kommen in der Systemsprache, wenn NINA sie liefert (sonst Englisch oder Deutsch; Hochwasserwarnungen gibt es nur auf Deutsch).

### Benachrichtigungsdienste

![Benachrichtigungsdienste](../../../en/adapterref/iobroker.weather-warnings/img/config-services_de.png)

Jeder aktivierte Dienst hat eine eigene Seite mit denselben Abschnitten:

- **Ziel** : Die Adapter-Instanz(en), an die gesendet wird. Ohne gültiges Ziel startet der Dienst nicht (siehe Log).
- **Wetterdienste** : Welche Anbieter mit diesem Dienst verschickt werden.
- **Automatische Benachrichtigungen** : Vorlagen für _neue Warnung_ , _Warnung aufgehoben_ (andere Warnungen noch aktiv) und _keine Warnungen mehr_ , dazu ein Typfilter und eine Mindest-Warnstufe. Mit der Vorlage `none` wird für diesen Fall nichts gesendet.
- **Manuell ausgelöste Benachrichtigungen** : Vorlagen für das Schreiben auf `commands.send_message.<dienst>` – eine für „es gibt Warnungen“, eine für „keine Warnungen“.
- **Weitere Einstellungen** : dienstspezifisch, z. B.
  - Telegramm: Benutzernamen, Chat-ID, lautlos, Parse-Modus
  - Pushover / Gotify: Priorität, Ton, Gerät, Inhaltstyp
  - NSPanel: Popup, Screensaver-Überschrift oder beides, Priorität, immer an
  - Alexa: Geräte, Lautstärke, Audiodatei vor der Nachricht, Ton pro Warntyp (Experte)
  - SayIt: Instanzen und Lautstärke
  - E-Mail: Empfänger, Titel-, Kopf- und Fußvorlage, Zeilenumbruch
  - Verlauf: Jeden formatierten Wert in den Verlauf schreiben

Sprachausgaben (Alexa, SayIt) lassen sich mit **Ruhezeit-Profilen** stummschalten (Experte, _Zusätzliche Einstellungen_ ), umschaltbar über `commands.silentTime.*` Die

## Warnstufen und Warntypen

| Stufe | Bedeutung   | Farbe                    |
| ----- | ----------- | ------------------------ |
| 0     | keine       | grün                     |
| 1     | unerheblich | gelb                     |
| 2     | klasse      | orange                   |
| 3     | schwer      | verrotten                |
| 4     | extrem      | violett (DWD: dunkelrot) |

Jeder Anbieter hat eigene Warntypen. Der Adapter ordnet sie vereinheitlichten Typen zu, die für Filter, Icons und die `alerts` -Datenpunkte werden verwendet:

`storm` (Sturm), `snowfall` (Schneefall), `rain` (Regen), `cold` (Kälte), `forest_fire` (Waldbrand), `thunderstorm` (Gewitter), `black_ice_slippery` (Glätte), `heat` (Hitze), `hail` (Hagel), `fog` (Nebel), `thaw` (Tauwetter), `flood` (Hochwasser), `civil_protection` (Gefahrenlage), `unknown` (unbekannt)

`flood` und `civil_protection` (alle Nicht-Wetter-Ereignisse von NINA) kommen von NINA.

## Datenpunkte

| Datenpunkt                                                                                           | Inhalt                                                                                                     |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `provider.<anbieter>.<ort>.warning.NN`                                                               | Rohdaten der Warnung, wie der Anbieter sie liefert (NINA: bereits bereinigt)                               |
| `provider.<anbieter>.<ort>.formatedKeys.NN`                                                          | alle Platzhalter mit aktuellem Wert, dazu deine Vorlagen mit `_` am Anfang                                  |
| `provider.<anbieter>.<ort>.alerts.<typ>`                                                             | pro Warntyp: `level`, `start`, `end`, `headline`, `active`, `type` – die höchste aktive Warnung dieses Typs |
| `provider.<anbieter>.<ort>.history`, `.activeWarnings`, `.lastUpdate`                                | pro Ort                                                                                                    |
| `alerts.<typ>`                                                                                       | wie oben, über alle Anbieter und Orte                                                                      |
| `provider.activeWarnings`, `provider.hasActiveWarning`, `provider.maxLevel`, `provider.maxLevelText` | Zusammenfassung aller Warnungen                                                                            |
| `provider.history`                                                                                   | Verlauf (Dienst _Verlauf_ )                                                                                |
| `commands.send_message.<dienst>`                                                                     | Aktuelle Warnungen mit diesem Dienst senden (manuelle Vorlagen)                                            |
| `commands.silentTime.*`                                                                              | Ruhezeit-Profil und Automatik                                                                              |
| `commands.clearHistory`                                                                              | löscht den Verlauf                                                                                         |

Die Anzahl der Plätze `NN` ist fest (Einstellung _Maximale Anzahl verarbeiteter Warnungen_ ). Leere Plätze werden geleert, nicht gelöscht – der Objektbaum ändert sich auch nicht mit jeder Warnung.

## Allgemeines Verhalten

- Keine doppelten Nachrichten für dieselbe Warnung: Aktualisierungen werden nur verschickt, wenn sie für dich eine neue Warnung sind.
- `alerts.<typ>` zeigt eine Warnung pro Typ: die **jetzt** aktiv mit der höchsten Stufe, sonst die nächste in der Zukunft.
- Zeiten werden in der Zeitzone des ioBroker-Hosts angezeigt – der Host sollte eine echte Zone wie `Europe/Berlin` nutzen, keinen festen Versatz.

## Symbole

DWD-Icon: Copyright liegt beim Deutschen Wetterdienst

ZAMG-Symbol: Copyright by GeoSphere Austria

Wetter-Icons:

- Ersteller: [Adri Ansyah](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)
- Iconseite: <https://www.flaticon.com/packs/weather-613>
- Lizenz: [CC BY 4.0 Rechtscode](https://creativecommons.org/licenses/by/4.0/legalcode)
- Änderungen: Im Original sind sie blau, die anderen Farben sind Änderungen am Original.

Hochwasser-Symbol (`flood.png`): "Flooding icon by Adriansyah, Creative Commons, via ToSVG" - <https://tosvg.com/icon/flooding-1044958> (umgefärbt)

Gefahren-Symbol (`civil_protection.png`): „Danger Triangle icon by Paweł Gleń, Creative Commons, via ToSVG“ – <https://tosvg.com/icon/danger-triangle-1046822> (umgefärbt)