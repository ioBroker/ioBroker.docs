---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: ioBroker.ecovacs-deebot
hash: Pfjue01765+6tWgkRnw7rf4zZ3X6XMZYNCFdeAOJpG4=
---
# IoBroker.ecovacs-deebot
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Stabile Version](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Neueste Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Anzahl der Installationen](http://iobroker.live/badges/ecovacs-deebot-installed.svg)

Dieser Adapter verwendet die [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) Bibliothek.

> **⚠️ Wartungsstatus: Community-Projekt** > Dieser Adapter wird nun nach einem **Community-basierten** Wartungsmodell gewartet. Der Entwickler konzentriert sich auf die Kerntechnologie und auf Geräte in seinem Besitz. Die Unterstützung aller anderen Modelle hängt vollständig von Beiträgen der Community (Pull Requests) ab.

---

## 🗺️ Roadmap & Strategie
Um die langfristige Wartbarkeit zu gewährleisten, optimieren wir die Architektur des Adapters. **Hinweis: Wir befinden uns aktuell im Release-Zyklus 1.4.x.**

1. **Phase 1 (Geplant): Abschließende Unterstützung für ältere Systeme (Adapter v1.5.x / Bibliothek v0.9.6)**
* Dies wird der endgültige "sichere Hafen" für alle älteren Geräte sein, die XML-Protokolle (XMPP/XML oder MQTT/XML) verwenden.
* Nach der Veröffentlichung werden keine neuen Legacy-Funktionen mehr hinzugefügt.
2. **Phase 2 (geplant): Modernisierung (Adapter v2.0.x / Bibliothek v1.0.0)**
* Umstellung auf einen **reinen MQTT/JSON**-Stack.
* Vollständige Entfernung des Altcodes zur Verbesserung von Leistung und Stabilität.
* **Wichtige Änderung:** Ältere Modelle (z. B. OZMO 930, Deebot 900) werden in Version 2.x nicht mehr unterstützt.

---

## Modelle & Supportstufen
Der Support ist in Stufen unterteilt, je nachdem, welches Gerät für den Wartungsanbieter verfügbar ist:

| **Tier** | **Modellreihen (Beispiele)** | **Status** |
| :--- | :--- | :--- |
| 🟢 Aktiv | OZMO 920/950, T8 AIVI, X1 Turbo | **Vollständig unterstützt.** Geräte im Besitz des Entwicklers |
| 🟡 Community | T10, T20, T30, X2, X8 usw. | **Best Effort.** Unterstützt durch Pull Requests der Community |
| 🔴 Legacy | OZMO 930, Deebot 900/901 etc. | **Nur Wartung.** Unterstützt nur in **Version 1.5.x** |

### Wie erhalten Sie Unterstützung für Ihr Modell?
Wenn Sie ein modernes (MQTT/JSON-)Modell besitzen, das derzeit nicht unterstützt wird:

1. Überprüfen Sie die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).
2. Stellen Sie einen **Pull Request** mit den erforderlichen Modelldefinitionen bereit.
3. **Anfragen für neue Modelle ohne Pull Request werden ohne weitere Ankündigung geschlossen.**

---

## Installation & Voraussetzungen
* **Node.js:** >= 20.x (seit Version 1.4.16)
* **ioBroker:** Stabile Installation
* **Optional:** `canvas` für die Kartendarstellung (siehe [Wiki](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki) für Details).

## Haftungsausschluss
Ich stehe in keinerlei Verbindung zu Ecovacs Robotics Co., Ltd. oder yeedi Technology Limited. Dies ist ein privates Hobbyprojekt.

## Changelog

### 1.4.16 (alpha)
- Breaking change: Bump minimum required version of Node.js to 20.x
- Add more states for air drying timer
- Use adapter-dev module
- Some further improvements and optimizations
- Bumped ecovacs-deebot.js to 0.9.6 (latest beta)
- Bumped several other dependencies
 
### 1.4.15 (latest stable)
- Breaking change: Bump minimum required version of Node.js to 18.x
- Bumped ecovacs-deebot.js to 0.9.6 (beta)
- Add state (button) for manually requesting the cleaning log
- Separate mopping and scrubbing mode
- Add states for air drying timer
- Some further improvements and optimizations

### 0.0.1 - 1.4.14
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

---

## License
MIT License - Copyright (c) 2026 Sascha Hölzel