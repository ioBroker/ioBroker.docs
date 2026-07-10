---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: 2w58m4StxpHt/xXPYTyZx0m1RMVdpv6czsNDW2Sl5uY=
---
# IoBroker.aurora-nowcast
![Logo](../../../en/adapterref/iobroker.aurora-nowcast/admin/aurora-nowcast.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)
![Anzahl der Installationen](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/aurora-nowcast-stable.svg)
![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

**Tests:** ![Test und Freigabe](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## Aurora Nowcast-Adapter für ioBroker
Liefert **aktuelle (Nowcast-)Daten** zur Aurora-Aktivität (Nord- und Südlichter) für einen bestimmten Ort, basierend auf öffentlich verfügbaren Daten des NOAA Space Weather Prediction Center (SWPC).

**Hinweis:** Die OVATION-Aurora-Daten stellen die *aktuellen Bedingungen (Nowcast)* basierend auf Echtzeit-Sonnenwindmessungen dar – keine Langzeitprognose.

Der Kp-Index-Feed liefert zusätzlich eine **72-Stunden-Vorhersage** für Planungszwecke.

---

## Merkmale
- Ruft Echtzeitdaten zur Aurora-Aktivität (NOAA OVATION-Modell) für die Nord- und Südhalbkugel ab.
- Berechnet die lokale Wahrscheinlichkeit der Aurora-Sichtbarkeit für einen konfigurierten Standort
- Bietet den aktuellen Kp-Index (1-Minuten-Takt) und eine 72-Stunden-Kp-Vorhersage
- Liefert Echtzeitdaten zum Sonnenwind (Bz, Gesamtfeldstärke, Geschwindigkeit, Dichte) als Frühwarnindikatoren für Polarlichter.
- Stellt ioBroker-Status für Automatisierung, Visualisierung und Benachrichtigungen bereit
- Optionale Verwendung des Systemstandorts oder manuelle Eingabe von Längen- und Breitengraden
- Geeignet für Dashboards, Benachrichtigungen und Smart-Home-Szenarien

---

## ❤️ Unterstützung
Wenn Sie **ioBroker.aurora-nowcast** nützlich finden und die Weiterentwicklung unterstützen möchten, könnten Sie mir gerne einen Kaffee spendieren. ☕🙂

Vielen Dank für Ihre Unterstützung!

---

## Konfiguration
Sie haben entweder:

- Verwenden Sie den in ioBroker konfigurierten Systemstandort, oder
- Manuelle Koordinaten angeben (Breitengrad/Längengrad in Dezimalgrad)

Manuelle Koordinaten sind erforderlich, wenn die Systemortung deaktiviert ist.

Beispiele:

| Standort | Breitengrad | Längengrad |
|-----------------|----------|-----------|
| Berlin | 52,5 | 13,4 |
| Buenos Aires | -34,6 | -58,4 |
| Reykjavik | 64,1 | -21,9 |

Die Werte in Nord-Ost-Richtung sind positiv, die Werte in Süd-West-Richtung negativ.

### Aktualisierungsintervalle
| Einstellung | Standard | Bereich | Beschreibung |
|-------------------|---------|-------|------------------------------------------------------------------------------------|
| Standardintervall | 5 | 1–60 | Wie oft OVATION-Auroradaten, Kp-Vorhersage und Sturmskalen abgerufen werden (Minuten) |
| Echtzeitintervall | 1 | 1–60 | Häufigkeit des Abrufs von Echtzeitdaten: aktueller Kp-Index, Sonnenwind (Minuten) |

---

## Staaten
### Hintergrund: Weltraumwetterindizes
**Kp-Index** – Der planetare K-Index misst die globale geomagnetische Aktivität auf einer Skala von 0 bis 9 (0 = ruhig, 9 = extremer Sturm). Werte ≥ 5 deuten auf geomagnetische Sturmbedingungen (G1 und höher) hin, bei denen Polarlichter in mittleren Breiten wie Mitteleuropa sichtbar werden. Der Adapter liefert sowohl den aktuellen Kp-Wert (1 Minute) als auch eine 72-Stunden-Vorhersage.

### OVATION — Aurora-Wahrscheinlichkeit
| Bundesland | Typ | Beschreibung |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability` | Zahl | Geschätzte Wahrscheinlichkeit der Aurora-Sichtbarkeit am konfigurierten Standort (%) |
| `forecast_time` | Nummer | Zeitpunkt, für den die geomagnetische Antwort der Erde berechnet wird (UTC, ms) |
| `forecast_time` | Zahl | Zeitpunkt, für den die geomagnetische Antwort auf der Erde berechnet wird (UTC, ms) |

### Kp-Index
| Bundesland | Typ | Beschreibung |
|------------------------|---------|--------------------------------------------------------|
| `kp.value` | Nummer | Aktueller Kp-Index (0–9, dezimal, 1-Minuten-Feed) |
| `kp.g_scale` | Nummer | Abgeleitete NOAA-G-Skala (0 = keine, 1–5 = G1–G5) |
| `kp.forecast_max` | Nummer | Maximaler Kp-Wert in der 72-Stunden-Vorhersage |
| `kp.forecast_max_time` | Nummer | Zeitpunkt des vorhergesagten Maximums (UTC, ms) |
| `kp.forecast` | Zeichenkette | Vollständige 72-Stunden-Kp-Vorhersage als JSON-Array `[{time, kp}]` |
| `kp.forecast` | string | Vollständige 72-Stunden-Kp-Vorhersage als JSON-Array `[{time, kp}]` |

### Solarwind
**Bz (GSM)** – Die z-Komponente des interplanetaren Magnetfelds in GSM-Koordinaten. Ein stark negatives Bz (südliche Ausrichtung) öffnet die Erdmagnetosphäre für einfallende Sonnenwindenergie und ist der zuverlässigste kurzfristige Vorläufer von Polarlichtern – typischerweise 15–60 Minuten vor deren sichtbarer Aktivität. **Bt** ist die Gesamtfeldstärke; das Verhältnis von Bz zu Bt gibt an, wie stark das Feld nach Süden ausgerichtet ist.

| Bundesland | Typ | Einheit | Beschreibung |
|-------------------------|--------|--------|----------------------------------------------------------|
| `solar_wind.bz` | Nummer | nT | Bz-Komponente in GSM-Koordinaten (negativ = nach Süden) |
| `solar_wind.speed` | Zahl | km/s | Protonengeschwindigkeit des Sonnenwinds |
| `solar_wind.density` | Anzahl | p/cm³ | Protonendichte des Sonnenwinds |
| `solar_wind.mag_time` | Nummer | ms | Magnetometer-Messzeit (UTC) |
| `solar_wind.plasma_time`| Nummer | ms | Plasmamesszeit (UTC) |
| `solar_wind.plasma_time`| Zahl | ms | Plasmamesszeit (UTC) |

Diese Zustände können verwendet werden für:

- Benachrichtigungen (z. B. Push-Nachrichten, wenn Kp ≥ 5 oder Bz ≤ −10 nT)
- Dashboard-Visualisierungen
- Automatisierungsregeln (z. B. Kamera aktivieren, wenn die Wahrscheinlichkeit für Polarlichter hoch ist)

---

## Praktischer Leitfaden: Die Aurora Borealis einfangen
Die Jagd nach Polarlichtern funktioniert in zwei Phasen: **Vorausplanung** mithilfe der Kp-Vorhersage und **Reaktion in Echtzeit** mithilfe von Sonnenwind- und OVATION-Daten.

### Phase 1 — Plan: Wird ein Sturm erwartet?
Verwenden Sie `kp.forecast_max`, um zu prüfen, ob in den nächsten 72 Stunden ein geomagnetischer Sturm zu erwarten ist. Ungefähre Sichtbarkeitsschwellenwerte nach geografischer Breite:

| `kp.forecast_max` | Sturmstärke | Sichtbar bis ~ |
|-------------------|-------------|-------------------------------------------------|
| < 5 | Keine | Nur hohe Breitengrade |
| 5 (G1) | Minor | ~60°N — nördliches Schottland, südliches Skandinavien |
| 6 (G2) | Mäßig | ~55°N — Norddeutschland, Polen |
| 7 (G3) | Stark | ~50°N — London, Frankfurt, Warschau |
| 8 (G4) | Schwer | ~45°N — Schweiz, Österreich, Norditalien |
| 9 (G5) | Extrem | ~40°N — Zentralfrankreich, Nordspanien |

`kp.forecast_max_time` gibt an, *wann* der Höhepunkt erwartet wird – nützlich für eine Benachrichtigung wie „G2-Sturmvorhersage für heute Nacht“.

`kp.g_scale` gibt die aktuelle Sturmstärke in Echtzeit an (0 = ruhig, 1–5 = G1–G5).

**Hinweis:** Dies sind ungefähre geografische Breitengrade für Europa. Die tatsächliche Sichtweite hängt stark von `solar_wind.bz` (siehe unten), der Bewölkung und der Lichtverschmutzung ab.

### Phase 2 — React: Ist Aurora derzeit aktiv?
Selbst bei einem hohen Kp-Wert wird die Aurora nur sichtbar, wenn das interplanetare Magnetfeld (IMF) **nach Süden** gerichtet ist – erkennbar an einem stark negativen `solar_wind.bz`. Dies ist der zuverlässigste kurzfristige Auslöser.

| `solar_wind.bz` | Bedeutung |
|-----------------|----------------------------------------------------------|
| > 0 nT | Nordwärts — Magnetosphäre weitgehend geschlossen, geringe Aurora |
| 0 bis −5 nT | Schwach nach Süden gerichtet — Grenzbedingungen |
| −5 bis −10 nT | Südlich — Aurora-Aktivität nimmt zu |
| ≤ −10 nT | Stark nach Süden gerichtet — signifikante Aurora wahrscheinlich |
| ≤ −20 nT | Extrem — intensive Aurora bis weit in die mittleren Breiten |

**Vorwarnzeit:** Bz wird am Beobachtungspunkt L1 zwischen Erde und Sonne gemessen. Der Sonnenwind benötigt **15–60 Minuten**, um von L1 zur Erde zu gelangen – dies ist Ihr Vorwarnfenster.

`solar_wind.bt` ist die Gesamtfeldstärke. Wenn sich `|bz|` `bt` annähert, ist das Feld nahezu vollständig nach Süden gerichtet. Beispielsweise ist bz = −18 nT mit bt = 20 nT ein stärkeres Signal als bz = −10 nT mit bt = 30 nT.

`solar_wind.speed` verstärkt den Effekt: Schneller Wind (> 400 km/s) in Kombination mit negativem Bz führt der Magnetosphäre mehr Energie zu. Sehr hohe Geschwindigkeiten (> 600 km/s) können selbst bei moderatem Bz Polarlichter auslösen.

`solar_wind.density` spielt eine unterstützende Rolle: Eine hohe Dichte (> 10 p/cm³) erhöht den dynamischen Druck und kann die Aktivität steigern.

### Standortspezifische Bestätigung: Was fügt `probability` hinzu?
Kp ist ein globaler Index – er beschreibt die allgemeine geomagnetische Aktivität, nicht die Vorgänge über Ihrem Standort. `probability` ist anders: Er wird speziell für Ihre konfigurierten Koordinaten mithilfe des **NOAA OVATION-Modells** berechnet. Dieses Modell verwendet Echtzeit-Sonnenwindmessungen als direkte Eingangsdaten und modelliert die tatsächliche Ausdehnung und Intensität des Polarlichtovals. Daher reagiert es schneller und präziser auf Änderungen von Bz als der abgeleitete Kp-Wert.

Für Mitteleuropa (etwa 50–55°N) sind unter aktiven Bedingungen folgende Reichweiten realistisch:

| `probability` | Interpretation |
|---------------|--------------------------------------------------------|
| < 5 % | Keine nennenswerte Aktivität an Ihrem Standort |
| 5–15 % | Erhöht – sehenswert, besonders außerhalb von Städten |
| 15–30 % | Aktiv — Polarlichter wahrscheinlich sichtbar, wenn der Himmel klar ist |
| > 30 % | Hoher Aktivitätsaufwand |

Verwenden Sie `probability` als ortsspezifische Bestätigung zusätzlich zu Kp und Bz. Ein steigender Wert bei gleichzeitig stark negativem Bz ist das deutlichste Zeichen dafür, dass es sich lohnt, nach draußen zu gehen.

### Beispiel für Automatisierungslogik
Eine praktische dreistufige Alarmierungsstrategie:

1. **Beobachtungsmodus** — `kp.forecast_max` ≥ 5: „Sturm wird in den nächsten 72 Stunden erwartet – beobachten Sie die Bedingungen heute Abend“
2. **Warnung** — `kp.value` ≥ 5 UND `solar_wind.bz` ≤ −10: „Sturm aktiv und Bz stark nach Süden gerichtet — Aurora wahrscheinlich in 15–60 Minuten“
3. **Bestätigung durch die Luft** — `Wahrscheinlichkeit` ≥ 15: "Nordlichter sind an Ihrem Standort wahrscheinlich gerade sichtbar"

Durch die Kombination aller drei Schichten werden Fehlalarme vermieden: Der Kp-Filter bestätigt einen echten Sturm, der Bz-Filter bestätigt, dass die Magnetosphäre geöffnet ist, und der Wahrscheinlichkeitsfilter bestätigt Aktivität an Ihrem genauen Standort.

---

## Datenquelle
Dieser Adapter verwendet öffentlich verfügbare Daten, die von Folgendem bereitgestellt werden:

- NOAA Weltraumwettervorhersagezentrum (SWPC)

<https://www.swpc.noaa.gov/>

Insbesondere werden das OVATION-Aurora-Nowcast-Modell und zugehörige geomagnetische Echtzeitindizes verwendet, um die Aurora-Aktivität für den konfigurierten Standort abzuschätzen.

---

## Haftungsausschluss
NOAA und SWPC stehen in keiner Verbindung zu diesem Projekt.

Die von diesem Adapter verwendeten Daten werden von der NOAA zur öffentlichen Nutzung bereitgestellt.
Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen übernommen.

Die Sichtbarkeit von Polarlichtern hängt von zahlreichen externen Faktoren ab (z. B. Wolkenbedeckung, Lichtverschmutzung, IMF-Orientierung), die außerhalb des Anwendungsbereichs dieses Adapters liegen.

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.