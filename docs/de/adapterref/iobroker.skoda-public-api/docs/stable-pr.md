---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/docs/stable-pr.md
title: Stabile Anwendung für 0.1.11 - zusammengeführt
hash: UyLczrqrkae118uKOd4APldr+VyISnd7Ft7Yy+0aG7Q=
---
# Stabile Anwendung für 0.1.11 — zusammengeführt

[Der Repository-PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832) wurde am 11. Oktober 2026 zusammengeführt. Der unten stehende Anwendungstext dokumentiert die abgeschlossene Einreichung.

Hinzufügen `skoda-public-api` Version **0.1.11** wurde in das stabile Repository hochgeladen.

Der Adapter liest und steuert Škoda-Fahrzeuge über die offizielle MyŠkoda Public API. Version 0.1.11 ist seit dem 20. September 2026 auf npm verfügbar und kann bereits genutzt werden. `latest` Die

Die öffentlichen Tests sind im [Forum](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x) dokumentiert. Berichte umfassen erfolgreiche Tests des Fahrzeugstatus, der Parkposition, des Kraftstoff-/AdBlue-Betriebs sowie der Start/Stopp-Funktion der Standheizung an einem Octavia 2.0 TDI. Außerdem gibt es positives Feedback von Besitzern eines Superb Hybrid (Modelljahr 2025), eines Superb iV (Modelljahr 2022) und eines Elroq (Modelljahr 2027). Der Elroq-Bericht beschreibt zudem die erfolgreiche Nutzung der Parkpositionsdaten in einem ioBroker-Dashboard. Der Test der Klimaanlage im Bericht zum Hybrid (Modelljahr 2025) steht noch aus. Die Steuerung von Lademodus und Ladeprofil wurde ebenfalls an dem Enyaq des Testers geprüft.

Das Repository verfügt über automatisierte Unit-, Paket- und Adapterintegrationstests. Der [Release-CI-Test für Version 0.1.11](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/35531311953) bestand alle neun Plattform-/Node-Kombinationen und veröffentlichte das Paket. Der [Haupt-CI-Testlauf nach dem vorbereitenden Pull Request #7](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427) war unter Ubuntu, Windows und macOS mit Node 22, 24 und 26 erfolgreich. Dieser Lauf beinhaltet die Aktualisierungen der API-Spezifikation und der Compact-Tests nach Version 0.1.11; das angeforderte stabile Paket bleibt unverändert und ist die bereits veröffentlichte Version 0.1.11. Das heruntergeladene npm-Paket enthält `build/main.js`, die Admin-Konfiguration und alle unterstützten Admin-Übersetzungen. `bluefox` Und `tmarthy` sind npm-Maintainer.

Fahrzeugidentifikationsnummern (VINs) und ein von der App generierter API-Schlüssel werden manuell konfiguriert, da die öffentliche API keinen Endpunkt zur Fahrzeugerkennung besitzt.

**Checklist**

- [x] Alle Voraussetzungen für eine stabile Einbindung sind erfüllt, einschließlich der abschließenden CI- und Repository-Checker-Verifizierung nach der Aktualisierung der Entwicklungsabhängigkeiten.
- [x] Der öffentliche Test-Thread und das Feedback sind oben verlinkt.

Diese Änderung fügt nur Folgendes hinzu: `skoda-public-api` Eingang zu `sources-dist-stable.json`, an Version angeheftet `0.1.11` Die