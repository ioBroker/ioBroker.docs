---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/docs/user-guide/README.md
title: AutoDoc - Benutzerhandbuch (Erste Schritte)
hash: IHmoFDczSkP1TvD53BSSa+vUYbd8Dm0xkgMZutnbyV0=
---
# AutoDoc – Benutzerhandbuch (Erste Schritte)

Strukturierte Hilfe für **Operatoren** , die den Adapter aus dem [GitHub-Repository](https://github.com/crunchip77/ioBroker.autodoc) installieren und ausführen.

- **Deutsches** Wiki – Admin-Registerkarten, Screenshots, fiktives **„Muster‑Einfamilienhaus“** -Übungsszenario:**[`README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)**

**Abbildungen:** Bei mehreren Tabs werden **zwei Bilder nebeneinander** angezeigt: ein **SVG-Drahtgittermodell** (die Anordnung der Elemente – nicht die tatsächlichen Pixel) und anschließend eine **PNG-Datei** der eigentlichen Admin-Benutzeroberfläche (alle sechs Tabs sind dargestellt). Diese Anordnung ist **beabsichtigt** . Falls eingebettete Bilder auf GitHub klein erscheinen, **öffnen Sie das Bild in einem neuen Tab** oder vergrößern Sie die Seite; sieh&#x65;**[`SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** ( _Lesbarkeit_ , **Zeitpunkt für eine erneute Aufnahme** , Datenschutz). Benennung und Datenschutz: dieselbe Datei. Tooltips pro Feld in der Administrationsoberfläche (`?`) bleiben maßgebend. Projektübersicht: **[README](/#/adapters/autodoc)** .

## Voraussetzungen

- **Node.js** ≥ 22
- Die im README unter **Anforderungen** aufgeführten ioBroker-Versionen sind angegeben.

## Installation (URL / Klonen)

Installation via [np&#x6D;** `iobroker.autodoc` **](https://www.npmjs.com/package/iobroker.autodoc) , Git-URL / Klonen oder (nachdem der Pull Request **für ioBroker.repositories** zusammengeführt wurde) die Standardadapterliste der ioBroker-Administration – siehe Haupt-README **Installation** . Standardlisten werden in **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** verwaltet. Nach dem Hinzufügen einer Instanz öffnen Sie **Instanzen → AutoDoc.X → Konfiguration** .

## Admin-Registerkarten (Was sollte zuerst konfiguriert werden?)

1. **Grundeinstellungen** – Projektname, Dokumentationssprache, Markdown-Profilpräferenz, Timer und Trigger („Generieren …“).
2. **Manuelle Dokumentation („Meine Dokumentation“)** – von Menschen verfasster Text für Haushalte und Gäste (`guestHelpNote` (Playbook, Schnelltests zur Fehlerbehebung). Optionale **Mermaid** -Diagramme: siehe Feldhilfe dort (eingebettetes SVG vs. Browser-/CDN-Fallback).
3. **Erweitert** – optionaler **Dateisystem-Exportpfad** , optionales **PDF nach jedem Lauf** (erforder&#x74;** `puppeteer` ** ),** `documentation.exportHashes` ** (siehe Zusammenfassung unten); große Exporte immer unte&#x72;** `/files/` ** (siehe Admin-Hinweis).
4. **HTML-Export & zusätzliche Abschnitte** – Designs, Kapitel-Sichtbarkeit/Reihenfolge, benutzerdefinierte Abschnitte; der Einleitungstext auf dieser Registerkarte verweist auch auf **die PDF-** Einstellungen (diese befinden sich unter **Erweitert** ).
5. **Benachrichtigungen** / **KI** — optional; nur nach vorheriger Anmeldung.

### Abbildungen

**SVG-Wireframes** und **PNG-Screenshots** werden **bewusst zusammen angezeigt** : Die SVG-Datei zeigt eine **schematische Darstellung** desselben Tabs; die PNG-Datei zeigt die **tatsächliche** Admin-Ansicht (Demo-Beispiel; das Layout variiert je nach Theme/Version). Die Inline-Vorschau von GitHub verkleinert Bilder oft – **klicken Sie** auf die Datei in voller Auflösung oder verwenden Sie die Browser-Zoomfunktion, um kleine Beschriftungen zu lesen.

![Grundeinstellungen — Schema](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-grundeinstellungen.svg)

_Echte Admin-Benutzeroberfläche:_

![Registerkarte „Grundeinstellungen“ – Screenshot](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-grundeinstellungen-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

![Meine Dokumentation – Schaltplan](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-tab-meine-dokumentation.svg)

_Echte Admin-Benutzeroberfläche (Demo-Instanz; **Meine Dokumentation** ist ein langer Scrollvorgang – vier Screenshots, von oben nach unten):_

**1/4 —** Projekt, Kontakt & Notizen; Gästehilfe & Formulierungen für die alltägliche Automatisierung.

![Meine Dokumentation – Screenshot (1/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**2/4 —** Playbook, optionales **Mermaid-** Diagramm, automatische Host-Topologie, Notfall-Einzeiler (WLAN / Strom / Wasser).

![Meine Dokumentation – Screenshot (2/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-2.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**3/4 —** Kurze Zeile „Sonstiges“ (optional); Hinweise pro Adapter und pro Raum.

![Meine Dokumentation – Screenshot (3/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-3.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**4/4 —** Räume oder Adapter pro Profil ausblenden (Onboarding vs. Benutzer/Familie); Sichtbarkeit von Gast-JavaScript-Dateinamen.

![Meine Dokumentation – Screenshot (4/4)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-meine-dokumentation-admin-4.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

![Erweitert — Schema der Basis-URL (fiktiver Host)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/fig-erweitert-basisurl.svg)

_Echte Admin-Benutzeroberfläche (Demo; **die erweiterten Einstellungen** sind nur über einen langen Scrollvorgang zugänglich – zwei Screenshots, von oben nach unten). **Basis-URL** und Exportpfade sind **Platzhalter** und entsprechen nicht Ihrem tatsächlichen Netzwerk._

**1/2 —** Inhaltsbeschränkungen; **Exporte in Dateien** (kurze Platzhalter in `documentation.*` Staaten); optionale **Basis-URL** für Lesezeichen-/QR-Ziele.

![Registerkarte „Erweitert“ – Screenshot (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**2/2 —** Dokumentationseinstellungen **, Bewertungsoptionen** ; optionaler **Dateisystem-Exportpfad** ; **PDF nach jedem Durchlauf** (Puppeteer / Chromium).

![Registerkarte „Erweitert“ – Screenshot (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-erweitert-basisurl-admin-2.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

_Echte Admin-Oberfläche (Demo; Registerkarte **„HTML-Export“ & zusätzliche Kapitel** – drei Screenshots, von oben nach unten). Im Einleitungstext wird **PDF** erwähnt (Schalter unter **„Erweitert“** verfügbar). Ersetzen Sie die Logo-URLs/den Demo-Text der benutzerdefinierten Kapitel durch Ihre eigenen Platzhalter für öffentliche Repositories._

**1/3 —** Erscheinungsbild: HTML- **Farbschema** & **Voreinstellung** , optionale URL **für das Seitenleistenlogo** .

![HTML-Export & zusätzliche Kapitel — Screenshot (1/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**2/3 –** **Administratorprofil** : Kapitelreihenfolge & versteckte Kapitel ( **JSON-** Arrays). **Benutzer/Familie** : versteckte Kapitel & Reihenfolge ( **JSON** ).

![HTML-Export & zusätzliche Kapitel — Screenshot (2/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-2.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**3/3 —** **Onboarding** : versteckte Kapitel & Reihenfolge ( **JSON** ); **benutzerdefinierte Markdown-Kapitel** ( **JSON-** Objekte); Fußzeile verweist auf optionale Schriftart/CSS (Felder weiter unten).

![HTML-Export & zusätzliche Kapitel — Screenshot (3/3)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-html-export-pdf-hint-admin-3.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

_Echte Admin-Benutzeroberfläche (Demo; **Benachrichtigungen** – diesen Tab komplett überspringen, wenn Sie keine Benachrichtigungen nach der Ausführung benötigen). **Adapterinstanz-IDs** , Empfänger und benutzerdefinierte Vorlagen sollten **nicht in öffentlichen Repositories** gespeichert oder durch Platzhalter ersetzt werden._

![Benachrichtigungs-Registerkarte – Screenshot](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-benachrichtigungen-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

_Echte Admin-Oberfläche (Demo; **KI-Dokumentation** – langer Tab, zwei Screenshots **von oben nach unten** ). **Datenschutz- und Hardwarehinweise** sind im Produkttext enthalten. Für öffentliche Repositories bevorzugen Sie **lokale Ollama-** oder **geschwärzte** Cloud-Felder; veröffentlichen Sie niemals **API-Schlüssel** ._

**1/2 —** Anbieter- und Modellauswahl, **Ollama-Basis-URL** , Anfrage-Timeout.

![KI-Dokumentation – Screenshot (1/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

**2/2 —** Optionale **Kontexthinweise** für Operatoren (nur in der Eingabeaufforderung); **Temperatur** ; optionale Option **„KI erklärt JavaScript-Skripte“** .

![KI-Dokumentation – Screenshot (2/2)](../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/screen-ki-dokumentation-admin-2.png)

_Erfassung: AutoDoc **0.9.43** , ioBroker Admin **≥ 7.6.20** (Mai **2026** )._

Benennung, Austausch von **PNG-** Hinweisen, Schwärzung:**[`assets/SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)** Die

## Kochbuchbeispiele (Mermaid & JSON)

Eine schrittweise JSON-Anleitung für **benutzerdefinierte Abschnitte** ist ebenfalls verfügbar.**[`README.de.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md)** (Szenarioabschnitt). **Weitere Diagramme zum Kopieren und Einfügen** , **Kapitelreihenfolge-/Ausblendlistenmuster** un&#x64;** `customDocSectionsJson` ** Varianten siehe die Haupt **[-README-Datei](/#/adapters/autodoc)** . Für eine **deutsche** Version ( **Listen vor der Neuanordnung ausblenden** , Mini-Rezepte): **[`README.de.md`— Schritt 6 — Kapitelreihenfolge / ausblenden](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)** .

- [**Beispiele aus Meerjungfrauen-Kochbüchern**](/#/adapters/autodoc#mermaid-cookbook-examples)
- [**JSON-Kochbuch-Snippets**](/#/adapters/autodoc#json-cookbook-snippets)

Verwenden Sie diese Ziele, wenn Sie von der Feldhilfe im Adminbereich verlinken —** `blob/main/README.md#…` ** Öffnet **die Vorschau** (lesbar). Überschriftenfragmente entsprechen dem englischen Original. `###` Titel in der Haupt-README; Scrollverhalten nach **bestem Wissen und Gewissen** . Repo-Root `#…` URLs bleiben unzuverlässig – verwenden Sie imme&#x72;** `blob/main/…#…` ** Die

## Dokumentation generieren

Trigger **Generieren** aus der Instanz (Zustand `action.generate` (oder dem von Ihnen aktivierten Zeitplan). Nach erfolgreichem Durchlauf erhalten Sie:

- **Dateien** unter `/files/autodoc.<instance>/` — kanonisches **HTML** (Admin, Benutzer, Onboarding), **Markdown** , **JSON**
- **Staaten** wie `info.htmlUrlAdmin` /`info.htmlUrlUser` /`info.htmlUrlOnboarding`, `info.lastGeneration`, …

Große Markdown-Formate, Admin-HTML-Dateien und das JSON-Modell werden **nur** unte&#x72;** `/files/` ** (`autodoc-latest.*`, Profil-HTML). Die Staate&#x6E;** `documentation.markdown` ** ,** `documentation.html` ** , Un&#x64;** `documentation.json` ** **Platzhalter kurz** halten — verwende&#x6E;** `info.htmlUrl*` ** ,** `/files/` ** Oder laden Sie Aktionen herunter, um den vollständigen Text zu erhalten.

**Hashes:** die Adapteraktualisierunge&#x6E;** `documentation.exportHashes` ** — **SHA-256 (hex)** der neuesten **Markdown-** , **Admin-HTML-** , **JSON-** und (nach erfolgreicher **PDF-** Erstellung)** `autodoc-*.pdf` ** Dateien, damit Integrationen kostengünstig erkennen können, ob sich das Dokument geändert hat, ohne die vollständigen Nutzdaten analysieren zu müssen.

## Onboarding-QR-Code und kopierter Link

Gäste benötigen eine im Browser **erreichbare** URL für die Onboarding-HTML-Datei. Konfigurieren Sie **die IoBroker-Basis-URL** (erweitert) entsprechend _Ihrer_ Vorgehensweise beim Öffnen des Admin-Bereichs (Schema, Host, Port). Falsche oder leere Werte führen zu Problemen beim QR-Code-Eintrag/Kopieren von anderen Geräten – siehe README **„Öffentliche Basis-URL“** .

## Optionale Mermaid CLI

Die Wah&#x6C;** `@mermaid-js/mermaid-cli` ** Paket (installiert mit `npm install` (auf dem Adapter-Host) rendert Diagramme **während der HTML-Generierung als Inline-SVG,** sofern dies funktioniert – besser für Offline-Kopien und **ohne jsDelivr-Skript** im Export, wenn jedes Diagramm eingebettet ist. Wenn einige Blöcke als `<pre class="mermaid">` (Falls die CLI fehlt oder ein Diagramm nicht angezeigt wird), lädt der Browser Mermaid weiterhin vom CDN. Hinweise zu Puppeteer/OS finden Sie in PLAN/TODO **Phase 5** (PDF und mmdc basieren auf ähnlichen Chromium-Annahmen).

## Repository-Prüfungen vor der Veröffentlichung

Die Maintainer führen den **Adapter-Checker** aus dem geklonten Repository aus (erwartet den Standard-Branch, den Sie übergeben). `repochecker`; `package.json` Verwendun&#x67;** `main` ** ):

```bash
npm install
npm run adapter-check
```

Sehe&#x6E;** `CONTRIBUTING.md` ** zur Interpretation (** `common.extIcon` ** , npm-Pake&#x74;** `iobroker.autodoc` ** ( **W4001** , bis der Pull Request für die Repositories eingeht, bekannte Repochecker-Eigenheiten). CI läuft weiterhin.** `npm test` ** ,** `npm run lint` ** ,** `npm run check` ** Die

## Hier gibt es nur Demoinhalte.

Die Beispiele in der Dokumentation verwenden **eine neutrale Demo-Formulierung** . Geben Sie **keine** echten IP-Adressen, LAN-Hostnamen aus der Produktion oder Live-Forum-/Karten-Payloads an.