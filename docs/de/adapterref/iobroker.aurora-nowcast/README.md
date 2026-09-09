---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: 1KfCH4LP25JvPzPaNMiZJRGpgj30bSECMW0X1g+LYxw=
---
# ioBroker.aurora-nowcast

![NPM-Version](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)
![Anzahl der Installationen](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/aurora-nowcast-stable.svg)
![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)
![Test und Freigabe](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

![Logo](../../../en/adapterref/iobroker.aurora-nowcast/admin/aurora-nowcast.png)

---

## Aurora Nowcast-Adapter für ioBroker

Liefert **aktuelle (Nowcast-)Daten** zur Aurora-Aktivität (Nord- und Südlichter) für einen bestimmten Ort, basierend auf öffentlich verfügbaren Daten des NOAA Space Weather Prediction Center (SWPC).

> **Notiz:**\
> &#x20;Die OVATION-Aurora-Daten stellen _die aktuellen Bedingungen (Nowcast)_ auf Basis von Echtzeit-Sonnenwindmessungen dar – keine Langzeitprognose.\
> &#x20;Der Kp-Index-Feed bietet zusätzlich eine **72-Stunden-Vorhersage** für Planungszwecke.

---

## Merkmale

- Ruft Echtzeitdaten zur Aurora-Aktivität (NOAA OVATION-Modell) für die Nord- und Südhalbkugel ab.
- Berechnet die lokale Wahrscheinlichkeit der Aurora-Sichtbarkeit für einen konfigurierten Standort
- Bietet den aktuellen Kp-Index (1-Minuten-Takt) und eine 72-Stunden-Kp-Vorhersage
- Liefert Echtzeitdaten zum Sonnenwind (Bz, Gesamtfeldstärke, Geschwindigkeit, Dichte) als Frühwarnindikatoren für Polarlichter.
- Bietet ioBroker-Zustände für Automatisierung, Visualisierung und Benachrichtigungen.
- Optionale Verwendung des Systemstandorts oder manuelle Eingabe der Breiten- und Längengrade.
- Geeignet für Dashboards, Benachrichtigungen und Smart-Home-Szenarien

---

## ❤️ Unterstützung

Wenn Sie **ioBroker.aurora-nowcast** nützlich finden und die Weiterentwicklung unterstützen möchten, könnten Sie mir gerne einen Kaffee spendieren. ☕🙂

Vielen Dank für Ihre Unterstützung!

---

## Konfiguration

Sie haben entweder:

- Verwenden Sie den in ioBroker konfigurierten Systemstandort, oder
- Geben Sie die Koordinaten manuell an (Breitengrad/Längengrad in Dezimalgrad).

Manuelle Koordinaten sind erforderlich, wenn die Systemortung deaktiviert ist.

Beispiele:

| Standort     | Breite | Länge |
| ------------ | ------ | ----- |
| Berlin       | 52.5   | 13.4  |
| Buenos Aires | -34.6  | -58.4 |
| Reykjavik    | 64.1   | -21.9 |

Die Werte in Nord-Ost-Richtung sind positiv, die Werte in Süd-West-Richtung negativ.

### Aktualisierungsintervalle

| Einstellung       | Standard | Reichweite | Beschreibung                                                                           |
| ----------------- | -------- | ---------- | -------------------------------------------------------------------------------------- |
| Standardintervall | 5        | 1–60       | Wie oft werden OVATION-Auroradaten, Kp-Vorhersagen und Sturmskalen abgerufen (Minuten) |
| Echtzeitintervall | 1        | 1–60       | Wie oft Echtzeitdaten abgerufen werden: aktueller Kp-Index, Sonnenwind (Minuten)       |

---

## Staaten

### Hintergrund: Weltraumwetterindizes

**Kp-Index** – Der planetare K-Index misst die globale geomagnetische Aktivität auf einer Skala von 0 bis 9 (0 = ruhig, 9 = extremer Sturm). Werte ≥ 5 deuten auf geomagnetische Sturmbedingungen (G1 und höher) hin, bei denen Polarlichter in mittleren Breiten wie Mitteleuropa sichtbar werden. Der Adapter liefert sowohl den aktuellen Kp-Wert im 1-Minuten-Takt als auch eine 72-Stunden-Vorhersage.

### OVATION — Aurora-Wahrscheinlichkeit

| Zustand            | Typ    | Beschreibung                                                                                              |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------- |
| `probability`      | Nummer | Geschätzte Wahrscheinlichkeit der Aurora-Sichtbarkeit am konfigurierten Standort (%)                      |
| `observation_time` | Nummer | Zeitpunkt der vorgelagerten Sonnenwindbeobachtung, die als Modelleingabe verwendet wurde (UTC, ms)        |
| `forecast_time`    | Nummer | Zeitpunkt, für den die jetzt prognostizierte geomagnetische Reaktion an der Erde berechnet wird (UTC, ms) |

### Kp-Index

| Zustand                | Typ          | Beschreibung                                                       |
| ---------------------- | ------------ | ------------------------------------------------------------------ |
| `kp.value`             | Nummer       | Aktueller Kp-Index (0–9, dezimal, 1-Minuten-Feed)                  |
| `kp.time`              | Nummer       | Messzeitpunkt des aktuellen Kp-Wertes (UTC, ms)                    |
| `kp.g_scale`           | Nummer       | Abgeleitete NOAA-G-Skala (0 = keine, 1–5 = G1–G5)                  |
| `kp.forecast_max`      | Nummer       | Maximaler Kp-Wert in der 72-Stunden-Vorhersage                     |
| `kp.forecast_max_time` | Nummer       | Zeitpunkt des vorhergesagten Maximums (UTC, ms)                    |
| `kp.forecast`          | Zeichenkette | Vollständige 72-Stunden-Kp-Vorhersage als JSON-Array`[{time, kp}]` |

### Solarwind

**Bz (GSM)** – Die z-Komponente des interplanetaren Magnetfelds in GSM-Koordinaten. Ein stark negatives Bz (südliche Ausrichtung) öffnet die Erdmagnetosphäre für einfallende Sonnenwindenergie und ist der zuverlässigste kurzfristige Vorläufer von Polarlichtern – typischerweise 15–60 Minuten vor deren sichtbarer Aktivität. **Bt** ist die Gesamtfeldstärke; Bz relativ zu Bt gibt an, wie stark das Feld nach Süden ausgerichtet ist.

| Zustand                  | Typ    | Einheit | Beschreibung                                            |
| ------------------------ | ------ | ------- | ------------------------------------------------------- |
| `solar_wind.bz`          | Nummer | nT      | Bz-Komponente in GSM-Koordinaten (negativ = nach Süden) |
| `solar_wind.bt`          | Nummer | nT      | Gesamtstärke des interplanetaren Magnetfelds            |
| `solar_wind.speed`       | Nummer | km/s    | Protonengeschwindigkeit des Sonnenwinds                 |
| `solar_wind.density`     | Nummer | p/cm³   | Protonendichte des Sonnenwinds                          |
| `solar_wind.mag_time`    | Nummer | MS      | Magnetometer-Messzeit (UTC)                             |
| `solar_wind.plasma_time` | Nummer | MS      | Plasmamesszeit (UTC)                                    |

Diese Zustände können verwendet werden für:

- Benachrichtigungen (z. B. Push-Nachrichten, wenn Kp ≥ 5 oder Bz ≤ −10 nT)
- Dashboard-Visualisierungen
- Automatisierungsregeln (z. B. Kamera aktivieren, wenn die Wahrscheinlichkeit für Polarlichter hoch ist)

---

## Praktischer Leitfaden: Die Aurora einfangen

Die Jagd nach Polarlichtern funktioniert in zwei Phasen: **Planung im Voraus** mithilfe der Kp-Vorhersage und **Reaktion in Echtzeit** mithilfe von Sonnenwind- und OVATION-Daten.

### Phase 1 – Plan: Wird ein Sturm erwartet?

Verwenden`kp.forecast_max` um zu prüfen, ob in den nächsten 72 Stunden ein geomagnetischer Sturm zu erwarten ist. Ungefähre Sichtweiten nach geografischer Breite:

| `kp.forecast_max` | Sturmstärke | Sichtbar bis hinunter zu \~                            |
| ----------------- | ----------- | ------------------------------------------------------ |
| < 5               | Keiner      | Nur hohe Breitengrade                                  |
| 5 (G1)            | Unerheblich | \~60°N — nördliches Schottland, südliches Skandinavien |
| 6 (G2)            | Mäßig       | \~55°N — Norddeutschland, Polen                        |
| 7 (G3)            | Stark       | \~50°N — London, Frankfurt, Warschau                   |
| 8 (G4)            | Schwer      | \~45°N — Schweiz, Österreich, Norditalien              |
| 9 (G5)            | Extrem      | \~40°N — Zentralfrankreich, Nordspanien                |

`kp.forecast_max_time` zeigt an, _wann_ der Höhepunkt erwartet wird – nützlich für eine Benachrichtigung wie „G2-Sturmvorhersage für heute Nacht“.

`kp.g_scale` spiegelt die aktuelle Sturmstärke in Echtzeit wider (0 = ruhig, 1–5 = G1–G5).

> **Hinweis:** Dies sind ungefähre geografische Breitengrade für Europa. Die tatsächliche Sichtweite hängt stark von verschiedenen Faktoren ab.`solar_wind.bz` (siehe unten), Wolkenbedeckung und Lichtverschmutzung.

### Phase 2 – React: Ist Aurora derzeit aktiv?

Selbst bei einem hohen Kp-Wert wird die Aurora nur sichtbar, wenn sich das interplanetare Magnetfeld (IMF) **nach Süden** dreht – erkennbar an einem stark negativen Wert.`solar_wind.bz` Dies ist der zuverlässigste kurzfristige Auslöser.

| `solar_wind.bz` | Bedeutung                                                                |
| --------------- | ------------------------------------------------------------------------ |
| > 0 nT          | Nordwärts – Magnetosphäre weitgehend geschlossen, geringe Aurora         |
| 0 bis −5 nT     | Schwach nach Süden – grenzwertige Bedingungen                            |
| −5 bis −10 nT   | Südlich – die Aurora-Aktivität nimmt zu                                  |
| ≤ −10 nT        | Stark nach Süden – wahrscheinlich starkes Polarlicht                     |
| ≤ −20 nT        | Extrem – intensive Polarlichter bis weit in die mittleren Breiten hinein |

**Vorwarnzeit:** Bz wird am Beobachtungspunkt L1 zwischen Erde und Sonne gemessen. Der Sonnenwind benötigt **15–60 Minuten,** um von L1 zur Erde zu gelangen – dies ist Ihr Vorwarnfenster.

`solar_wind.bt` ist die gesamte Feldstärke. Wenn`|bz|` Ansätze`bt` Das Feld ist nahezu vollständig nach Süden gerichtet. Beispielsweise ist bz = −18 nT mit bt = 20 nT ein stärkeres Signal als bz = −10 nT mit bt = 30 nT.

`solar_wind.speed` Der Effekt wird verstärkt: Starke Winde (> 400 km/s) in Kombination mit negativem Bz-Wert führen der Magnetosphäre mehr Energie zu. Sehr hohe Geschwindigkeiten (> 600 km/s) können sogar bei moderatem Bz-Wert Polarlichter auslösen.

`solar_wind.density` spielt eine unterstützende Rolle: Eine hohe Dichte (> 10 p/cm³) erhöht den dynamischen Druck und kann die Aktivität steigern.

### Standortspezifische Bestätigung: Was bedeutet das?`probability` hinzufügen?

Kp ist ein globaler Index – er beschreibt die allgemeine geomagnetische Aktivität, nicht das, was über Ihrem Standort geschieht.`probability` ist anders: Es wird speziell für Ihre konfigurierten Koordinaten mithilfe des **NOAA OVATION-Modells** berechnet, das Echtzeit-Sonnenwindmessungen als direkte Eingangsdaten verwendet und die tatsächliche Ausdehnung und Intensität des Polarlichtovals modelliert. Daher reagiert es schneller und präziser auf Änderungen von Bz als der abgeleitete Kp-Wert.

Für Mitteleuropa (etwa 50–55°N) sind unter aktiven Bedingungen folgende Reichweiten realistisch:

| `probability` | Interpretation                                                       |
| ------------- | -------------------------------------------------------------------- |
| < 5 %         | Keine sinnvolle Aktivität an Ihrem Standort                          |
| 5–15 %        | Hoch angesehen – sehenswert, besonders abseits der Städte.           |
| 15–30 %       | Aktiv – Polarlichter sind bei klarem Himmel wahrscheinlich sichtbar. |
| > 30 %        | Starke Aktivität über uns                                            |

Verwenden`probability` Als standortspezifische Bestätigung zusätzlich zu Kp und Bz. Ein steigender Wert bei gleichzeitig stark negativem Bz ist das deutlichste Zeichen dafür, dass es sich lohnt, nach draußen zu gehen.

### Beispiel für Automatisierungslogik

Eine praktische dreistufige Alarmierungsstrategie:

1. **Uhrenmodus** —`kp.forecast_max` ≥ 5: „Sturm wird in den nächsten 72 Stunden erwartet – beobachten Sie die Bedingungen heute Abend“
2. **Alarm** -`kp.value` ≥ 5 UND`solar_wind.bz` ≤ −10: „Sturm aktiv und Bz stark nach Süden gerichtet – Aurora wahrscheinlich in 15–60 Minuten“
3. **Bestätigung von oben** —`probability` ≥ 15: „An Ihrem Standort ist derzeit wahrscheinlich ein Nordlicht sichtbar.“

Durch die Kombination aller drei Schichten werden Fehlalarme vermieden: Der Kp-Filter bestätigt einen echten Sturm, der Bz-Filter bestätigt, dass die Magnetosphäre geöffnet ist, und der Wahrscheinlichkeitsfilter bestätigt Aktivität an Ihrem genauen Standort.

---

## Datenquelle

Dieser Adapter verwendet öffentlich verfügbare Daten, die von Folgendem bereitgestellt werden:

- NOAA Weltraumwettervorhersagezentrum (SWPC)\
  &#x20;<https://www.swpc.noaa.gov/>

Insbesondere werden das OVATION-Aurora-Nowcast-Modell und zugehörige geomagnetische Echtzeitindizes verwendet, um die Aurora-Aktivität für den konfigurierten Standort abzuschätzen.

---

## Haftungsausschluss

NOAA und SWPC stehen in keiner Verbindung zu diesem Projekt.

Die von diesem Adapter verwendeten Daten werden von der NOAA zur öffentlichen Nutzung bereitgestellt.\
&#x20;Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen wird keine Gewähr übernommen.

Die Sichtbarkeit von Polarlichtern hängt von zahlreichen externen Faktoren ab (z. B. Bewölkung, Lichtverschmutzung, Ausrichtung des interplanetaren Magnetfelds), die außerhalb des Anwendungsbereichs dieses Adapters liegen.

---

## Changelog

### **WORK IN PROGRESS**

- when upgrading from version 2.2.2 or earlier to version 2.3.0 or later, any instance should be manually deleted and recreated. Otherwise they will remain registered as CRON-type adapters. As the datapoints don't include any IDs or other dynamic values, they will be recreated exactly as they were and no script adjustments will be necessary.
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/38>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/37>)

### 2.3.0 (2026-06-19)

- added solar wind data: Bz, total field (Bt), proton speed and density as aurora early-warning indicators
- added Kp index: current value (1-minute feed) and 72-hour forecast with maximum detection
- added separate realtime polling interval for time-critical feeds (Kp, solar wind)
- switched from single-run to continuous interval-based polling (daemon mode)
- configurable update interval (1–60 minutes, default: 5)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/32>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/33>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/35>)

### 2.2.2 (2026-04-17)

- re-added git-type URL because of npm linter

### 2.2.1 (2026-04-17)

- more checks
- fixed Readme link to a more stable direct link instead of an anchor
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/24>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/27>)

### 2.2.0 (2026-03-30)

- fixed review findings (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/21>)

### 2.1.4 (2026-03-11)

- disabled Sentry in GitHub workflow

[Older changelogs can be found there](https://github.com/chrmenne/ioBroker.aurora-nowcast/blob/main/CHANGELOG_OLD.md)

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.