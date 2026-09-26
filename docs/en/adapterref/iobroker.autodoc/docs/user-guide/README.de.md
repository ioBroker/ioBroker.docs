---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
---
# AutoDoc — Konfiguration der Instanz (Wiki)

Diese Seite richtet sich an **Betreuer** und **Haus-Admins**, die die **AutoDoc-Instanz** im ioBroker-Admin einrichten: Sie beschreibt die **Registerkarten**, was dort typischerweise eingetragen wird, und zeigt **Screenshots** zur Orientierung.  

Die **Inline-Hilfe** bei jedem Feld im Admin (`jsonConfig`) bleibt die **fachliche Referenz** — diese Datei ergänzt sie um **Überblick, Bilder und ein Übungsszenario**. **Klickbare Dokumentation:** In den Instanz-Tabs zeigt AutoDoc unter den betreffenden Feldern **eigene GitHub-Links** (nicht nur Fließtext in der `?`-Tooltip-Hilfe — dort sind URLs meist nicht anklickbar).

**Je nach Link** öffnet sich im Browser **nicht immer dieselbe GitHub-Datei:** **Einordnung** (Tabs, Sprache, Basis-URL, PDF, **Kapitelreihenfolge/Ausblenden**, Zusatzkapitel-JSON) → **Wiki DE** (`README.de.md`); **lange Copy-Paste-Kochbücher** (Mermaid, JSON-Felder, CSS) → **englisches Haupt-[README](/#/adapters/autodoc)**. Darunter im **Übungsszenario** gibt es zusätzlich **dieselben Themen** noch einmal mit **Screenshots** — dort weiterhin die Wiki-Anker **`#wiki-step…`** / **`#wiki-admin…`**.

Im Admin sind **Instanz-Konfiguration** und **Zusätzliche Markdown-Kapitel** zwei **getrennte** Links — erster Sprung **[Registerkarten](#wiki-overview-registerkarten)**, zweiter **[Schritt 4 — Custom sections](#wiki-step4-custom-sections-json)**. Wäre für beide dieselbe Textmarke im Adapter hinterlegt gewesen, würde auch „Instanz-Konfiguration“ fälschlich nach Schritt 4 zeigen.

## Schnellzugriff — wie die Admin-Links (je nach Link: Wiki DE oder README EN)

Die **sieben** dokumentierten Hauptthemen im **Schnellzugriff** unten (**vier** deutschsprachige Wiki-Anker **`README.de.md`**, **`id=`** gesetzt · **drei** englische Kochbuch-Sprünge ins Haupt-`README.md`) verlinken **`blob/main/…`** (Tagesarbeit der Maintainer oft Branch **`dev`**). **Hinweis:** An der Instanz gibt es **darüber hinaus** weitere klickbare **`staticLink`**-Zeilen (z. B. Tab **HTML-Export**, Unterabschnitt **Sichtbare Kapitel (je Profil)**: dort **README — JSON-Kochbuch** und direkt darunter **Wiki DE — Schritt 6**).

**Wiki DE** (`blob/main/docs/user-guide/README.de.md`, Markdown-**Vorschau**, feste **`id=`**):

- [Dokumentationssprache & Deltas](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-doc-lang)
- [Öffentliche Basis-URL / QR](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-step3-qr-base-url)
- [PDF-Export (Puppeteer)](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-pdf-export)
- [Schritt 6 — Kapitelreihenfolge oder ausblenden](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook)

**Englisches Haupt-README — Kochbuch** (`blob/main/README.md`, Überschriften-Slugs, Sprung **best effort**):

- [Mermaid-Kochbuch](/#/adapters/autodoc#mermaid-cookbook-examples)
- [JSON-Kochbuch](/#/adapters/autodoc#json-cookbook-snippets)
- [HTML — Schrift & CSS](/#/adapters/autodoc#html-custom-css-examples)

**Technische Grundlagen** (Systemvoraussetzungen, Projektbeschreibung) stehen ebenfalls im englischen Haupt-[README](/#/adapters/autodoc). **Szenario & Screenshots** zu Mermaid/JSON/HTML/CSS: weiter unten in dieser Datei (**Schritt 4–7**) und unter **`#wiki-step5-mermaid`** usw. — die **Admin-Kochbuch-Links** zeigen bewusst auf die **englischen** Schnipsel-Abschnitte.

**Instanz-Links (`staticLink`):** Die **Ziele** entsprechen der Schnellzugriffsliste (`blob/main/…`); gleiche Links können **an mehreren** Tab-Stellen erscheinen (es gibt **also mehr** klickbare Zeilen als die **sieben** Themensprünge der Überschrift). Repo-Wurzel-URL mit `#…` bleibt unzuverlässig — immer **`blob/main/…`**. Nach großen Umbauten **Slugs** und **`admin/jsonConfig.json`** prüfen.

**Häufiger Fehler:** **`raw.githubusercontent.com/…/README.md`** ist nur **Plaintext** — dort funktionieren **`#…`-Sprünge praktisch nicht**. Immer die **GitHub-Vorschau** öffnen (`github.com/…/blob/<branch>/…#.…`), wie die Admin-Links sie setzen.

**Sprungmarken:** Ziele wie **`#wiki-admin-pdf-export`** und **`#wiki-step3-qr-base-url`** sitzen auf **`h2`/`h3` mit festem `id=`** — die GitHub-Vorschau scrollt dorthin zuverlässiger als bei einem bloßen **`<a id="…"></a>`** ohne Überschrift (wirkt oft wie „immer Seitenanfang“).

**„In neuem Tab öffnen“:** Der Link und das **`#…`** sind korrekt — trotzdem bleibt GitHubs Markdown-Vorschau manchmal **oben**, weil die Seite **asynchron** rendert und der Browser den Sprung **vor** dem Ziel im DOM ausführt ([bekanntes Verhalten](https://github.com/github/markup/issues/1807), nicht nur „euer Browser“). **Meist hilft:** nach dem Laden in der Adresszeile **Enter** (Hash erneut anwenden), einmal **F5**, oder den Link **im gleichen Tab** öffnen.

**Anker-ID-Referenz (wartungsfest):** **Haupt-README:** `#mermaid-cookbook-examples`, `#json-cookbook-snippets`, `#html-custom-css-examples` — fixe **`###`‑Slug-Namen**, nicht fragile Zeilennummern. **`README.de.md`:** u. a. `#wiki-admin-doc-lang`, `#wiki-overview-registerkarten`, `#wiki-step3-qr-base-url`, `#wiki-admin-pdf-export`, `#wiki-admin-json-cookbook`, `#wiki-admin-html-css`, `#wiki-step4-custom-sections-json` (alternative Lesezeichen mit langem **`#schritt-4--…`‑Slug** oft zuverlässiger), `#wiki-step5-mermaid`. **Nach Umbauten** IDs und **`admin/jsonConfig.json`** abstimmen (Pflegehinweis auch als HTML-Kommentar vor der Lizenz im Haupt-[README](/#/adapters/autodoc)). Unter der Repo-Wurzel `#…` hat nur **`### Optional PDF export …`** zufällig denselben Slug wie `#optional-pdf-export-puppeteer` geliefert; die anderen Kurz-Hashes passten dort nicht — oder springen im **Blob**-Viewer trotzdem nicht zuverlässig.

**Instanz öffnen:** **Instanzen** → Ihre AutoDoc-Instanz → **Schraubenschlüssel** (Konfiguration).

**Zu den Bildern:** Wo ein **SVG** steht, beschreibt es die **Tab-Struktur** schematisch; der **Screenshot** darunter zeigt dieselbe Stelle in der **echten Oberfläche** (Demo). In GitHub wirken Vorschauen oft klein — Bild in neuem Tab öffnen oder zoomen. Hinweise zu **Aufnahmen, Verpixelung und Datenschutz** sowie **wann neue Screenshots nötig sind**: **[`SCREENSHOTS.md`](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md)**.

---

<h2 id="wiki-admin-doc-lang">Kurz vom Haupt-README (Betrieb)</h2>

- **Dokumentationssprache** (Grundeinstellungen): steuert Überschriften und feste Texte in **allen HTML-Profilen** und im Markdown; auch die **Kurzzeilen** für Inventarvergleich („changes since last run“) und für **Changelog**-Karten beim erneuten Erzeugen — ältere gespeicherte Changelog-Zeilen erscheinen in der **aktuellen** Export-Sprache. Details: gleicher GitHub-Sprung wie unter **„Schnellzugriff“** → *Dokumentationssprache & Deltas*.
- **Erweitert → Ausblenden „Änderungen seit letztem Lauf“** (`hideAdminDeltaSinceLastRun`): blendet nur die **gelbe Delta-Box** in der **Admin**-HTML-Systemübersicht und den passenden Block im **Admin**-Markdown aus; **Changelog-Kapitel**, User und Onboarding bleiben unverändert.
- **User/Familie**: bei **echten** Inventaränderungen seit dem letzten Schnappschuss (nicht beim ersten Lauf) erscheint ein kurzer **Alltagssatz** unter dem Titelblock — **Onboarding** nicht.
- **Basis-URL / QR / „Link kopieren“**: dieselbe Einstellung wie der Browser-Zugang zum Admin, **ohne** Slash am Ende; nach Änderung **Dokumentation erzeugen**. Ausführlich: **„Schnellzugriff“** → *Öffentliche Basis-URL / QR*.

<h3 id="wiki-admin-pdf-export">PDF-Export (Puppeteer)</h3>

- **PDF**: optional **`puppeteer`** im **Adapterverzeichnis**; Schalter unter **Erweitert** oder Datenpunkt **`action.exportPdf`**. Siehe **„Schnellzugriff“** → *PDF-Export (Puppeteer)*.
- **Dateisystem-Export / Docker**: Host-Ordner einbinden und im Adapter den **Container-Pfad** eintragen — Kurzhinweis auch in der Feldhilfe.
- **Große Bilder / Redis:** Große Bilder oder Binärdateien **nicht** als **State-Werte** in der **Objektdatenbank** ablegen — bei Backend **Redis** treiben große Blobs den RAM hoch. Lieber **externe URLs** oder kleine **SVG**. AutoDoc legt Volltext ohnehin nur unter **`/files/`** ab; **`documentation.markdown` / `.html` / `.json`** sind **kurze Platzhalter** (kein Ersatz für Medienspeicher) — siehe [PLAN.md — Medien (MVP)](/#/docs/adapterref/iobroker.autodoc/PLAN.md#architektur-medien-mvp).

---

<h2 id="wiki-overview-registerkarten">Registerkarten — was gehört wohin?</h2>

1. **Grundeinstellungen** — **Projektname** und **Dokumentationssprache** (alle Exporte); welches **Markdown-Profil** standardmäßig erzeugt wird; **wann** neu generiert wird (Start, Zeitplan, Adapteränderungen).
2. **Meine Dokumentation** — **Leser-Texte** für Familie und Gäste (Notizen, Abläufe, Playbook); optionale **Notfall-Kurzzeilen**; optional **Mermaid** und **Auto-Host-Topologie**; Filter „was ausblenden“ für User vs. Onboarding.
3. **Erweitert** — **Basis-URL** für QR/Links; Grenzen (z. B. nur aktivierte Instanzen); **Export nach Dateisystem**; optional **PDF**; **Doku-Setup-Score**; Hinweis: volle Exporte liegen unter **`/files`**, States nur Platzhalter.
4. **HTML-Export & Zusatzkapitel** — **Erscheinungsbild** (Theme, Logo); **Kapitelreihenfolge und Ausblenden** je Profil (**JSON**); **eigene Markdown-Kapitel** (`customDocSectionsJson`); optional **Schriftart** (`htmlFontStack`) und **zusätzliches CSS** (`htmlExtraCss`, nur exportiertes HTML) — Beispiele und Selektoren: **„Schnellzugriff“** → *HTML — Schrift & CSS*; PDF-Schalter unter **Erweitert**.
5. **Benachrichtigungen** — optional Nachricht nach erfolgreicher Generierung (abhängig vom Messaging-Adapter).
6. **KI-Dokumentation** — nur relevant, wenn ein **Anbieter aktiv** ist; sonst bleiben die Felder ohne KI-Wirkung.

Nach inhaltlichen Änderungen: **Dokumentation generieren** (Button oder Datenpunkt **`action.generate`**) auslösen oder den eingestellten Timer abwarten.

---

## Screenshots der Tabs

**SVG + PNG gehören zusammen:** Schema zuerst, dann reales UI (Demo-Instanz; Layout kann je nach Admin-Version variieren).

![Grundeinstellungen — überblicksartiges Schema](assets/fig-tab-grundeinstellungen.svg)

*Echte Admin-Oberfläche (Demo-Instanz; je nach Theme/Version abweichend):*

![Grundeinstellungen — Screenshot](assets/screen-grundeinstellungen-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

![Meine Dokumentation — Freitext- und Diagrammbereiche (Schema)](assets/fig-tab-meine-dokumentation.svg)

*Echte Admin-Oberfläche — **Meine Dokumentation** ist ein langer Scroll; vier Screenshots **von oben nach unten** (Demo):*

**1/4 —** Projekt, Kontakt & Hinweise; Hilfe & Abläufe (Klartext).

![Meine Dokumentation — Screenshot (1/4)](assets/screen-meine-dokumentation-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**2/4 —** Playbook, optionales **Mermaid**-Diagramm, automatische Host-Topologie, Notfall-Kurzzeilen (WLAN/Strom/Wasser).

![Meine Dokumentation — Screenshot (2/4)](assets/screen-meine-dokumentation-admin-2.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**3/4 —** Kurzzeile Sonstiges (optional); Adapter- und Raum-Notizen.

![Meine Dokumentation — Screenshot (3/4)](assets/screen-meine-dokumentation-admin-3.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**4/4 —** Räume/Adapter pro Profil ausblenden (Onboarding vs. User/Familie); Anzeige interner JavaScript-Dateinamen für Gäste.

![Meine Dokumentation — Screenshot (4/4)](assets/screen-meine-dokumentation-admin-4.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

![Erweitert — Basis-URL und Hinweise (Schema, Beispieldomain)](assets/fig-erweitert-basisurl.svg)

*Echte Admin-Oberfläche — Tab **Erweitert**, langer Scroll; zwei Screenshots **von oben nach unten** (Demo; **Basis-URL** und Exportpfade nur **Beispiele**):*

**1/2 —** Inhalt & Grenzen; **Exporte in Dateien** (Platzhalter in `documentation.*`); optionale **Basis-URL**.

![Erweitert — Screenshot (1/2)](assets/screen-erweitert-basisurl-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**2/2 —** **Doku-Setup-Score**; optionaler **Dateisystem-Export**; **PDF nach jedem Lauf** (Puppeteer/Chromium).

![Erweitert — Screenshot (2/2)](assets/screen-erweitert-basisurl-admin-2.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

*Echte Admin-Oberfläche — Tab **HTML-Export & Zusatzkapitel**, drei Screenshots **von oben nach unten** (Demo). Im Einleitungstext Hinweis auf **PDF** (Schalter unter **Erweitert**). Für öffentliche Repos: Logo-URLs und Mustertexte in **eigenen** Zusatzkapiteln durch **generische Beispiele** ersetzen.*

**1/3 —** Darstellung: **Farbschema** & **Preset** (HTML), optionale **Logo-URL** (Seitenleiste).

![HTML-Export & Zusatzkapitel — Screenshot (1/3)](assets/screen-html-export-pdf-hint-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**2/3 —** **Admin**: Kapitel-Reihenfolge & ausgeblendete Kapitel (**JSON**). **User/Familie**: ausgeblendete Kapitel & Reihenfolge (**JSON**).

![HTML-Export & Zusatzkapitel — Screenshot (2/3)](assets/screen-html-export-pdf-hint-admin-2.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**3/3 —** **Onboarding**: ausgeblendete Kapitel & Reihenfolge (**JSON**); **eigene Markdown-Kapitel** (**JSON**-Objekte); unten Hinweis auf optionale Schrift/zusätzliches CSS.

![HTML-Export & Zusatzkapitel — Screenshot (3/3)](assets/screen-html-export-pdf-hint-admin-3.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

*Echte Admin-Oberfläche — Tab **Benachrichtigungen** (optional; bei Bedarf **überspringen**). **Instanznamen**, Empfänger und Vorlagen in **öffentlichen Repos** nur mit **Platzhaltern** ausfüllen oder weglassen.*

![Benachrichtigungen — Screenshot](assets/screen-benachrichtigungen-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

*Echte Admin-Oberfläche — Tab **KI-Dokumentation**, langer Scroll; **zwei Screenshots von oben nach unten** (Demo). Die **Datenschutz-** und **Hardware-Hinweise** im UI sind Bestandteil des Adapters — Cloud‑Anbieter nur nutzen, wenn das für euch passt.*

**1/2 —** Anbieter & Modell, **Ollama-Basis-URL**, Anfrage‑Timeout.

![KI-Dokumentation — Screenshot (1/2)](assets/screen-ki-dokumentation-admin.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

**2/2 —** **KI-Kontexthinweise** (nur für die Anfrage); **Temperatur**; Opt-in **„KI erklärt JavaScript-Skripte“**.

![KI-Dokumentation — Screenshot (2/2)](assets/screen-ki-dokumentation-admin-2.png)

*Aufnahme: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (Stand **2026-05**).*

---

## Wo liegen die fertigen Exporte?

- Alle Profile (Admin-/User-/Onboarding-HTML, Markdown, JSON) unter **`/files/autodoc.<instanz>/`**, u. a. `autodoc-latest.*` und bei Bedarf **ältere** zeitgestempelte Dateien.
- Datenpunkte z. B. **`info.htmlUrlAdmin`** / **`User`** / **`Onboarding`**, **`info.lastGeneration`**.
- **`documentation.exportHashes`** — SHA‑256‑Hex der „latest“-Exporte (Markdown, Admin-HTML, JSON); nach **PDF**-Lauf zusätzlich die **`autodoc-*.pdf`**.

**Speicherlayout:** Volltext liegt **nur** unter **`/files`**; **`documentation.*`-States** sind **kurze Platzhalter** (Stand Adapter **0.9.43**). Wer Automatisierung anbindet: Volltext aus **`/files`**, **`info.htmlUrl*`** oder Download-Aktionen lesen.

---

## Übungsszenario: „Muster-Einfamilienhaus“

> **Nur Übung:** Alle Werte sind **frei erfunden**. Keine echten **Adressen**, **WLAN-Schlüssel**, **internen IPs**, **Forum-Karten** oder Produktiv-Zugänge in Screenshots oder Git übernehmen — lieber **Platzhalter** und eigene Notizen **lokal** pflegen.

**Ausganglage:** Zweistöckiges Einfamilienhaus mit ioBroker (**Heizszenen**, Licht u. a. in **Wohnzimmer**, **Treppenhaus**, Kinderzimmer), ergänzend z. B. Rauchmelder oder KNX — es geht um **nachvollziehbare Beispieltexte**, nicht um echte Hausdaten.

<h3 id="wiki-step1-basis">Schritt 1 — Basis</h3>

- Projektbezeichnung: z. B. **„Musterhaus Schulweg“** (keine echte Anschrift).
- Dokumentationssprache: **DE**.
- Nach Änderungen mindestens einmal **Dokumentation erzeugen**.

### Schritt 2 — Gäste & Familie (Tab „Meine Dokumentation“)

- **`guestHelpNote`**: Stichworte (**Notfallkontakt**, **Sicherungen**, **Gäste-WLAN getrennt vom Hauptnetz** — nur das, was ihr wirklich so dokumentieren wollt).
- Optional **Kurzzeilen** WLAN/Strom/Wasser.
- **`ownerPlaybookNote`**: wenige Stichpunkte aus dem Alltag (z. B. **Warmwasser** erst nach …).
- Felder dürfen **leer** bleiben — ohne eure Texte füllt sich nichts von alleine.

<h3 id="wiki-step3-qr-base-url">Schritt 3 — QR &amp; Link (Tab Erweitert)</h3>

**Basis-URL** = genau die Adresse, mit der **ihr** den Admin im Browser öffnet (**https://…** oder **http://host:8081**), **ohne** Schrägstrich am Ende. Danach wieder **Dokumentation erzeugen**. Test zuerst im **Heim-WLAN**, nicht öffentlich exponieren. Ausführlicher: **„Schnellzugriff“** oben → *Öffentliche Basis-URL / QR*.

<h3 id="schritt-4--zusätzliches-markdown-kapitel-tab-html---zusatzkapitel--custom-sections-customdocsectionsjson"><span id="wiki-step4-custom-sections-json"></span>Schritt 4 — Zusätzliches Markdown-Kapitel (Custom sections, JSON)</h3>

Im Feld: gültiges **JSON-Array** mit Objekten `title`, `body`, optional `profiles` — Platzhalter und Hilfetext im Admin beachten.

**Weitere Beispiele** (Reihenfolgen, Ausblenden, zweites Mermaid-Muster): **„Schnellzugriff“** → *JSON-Kochbuch* und *Mermaid-Kochbuch* (englisches README); Schritt‑für‑Schritt Ausblenden/**Reihenfolge-Einstieg**: **„Schnellzugriff“** → [Schritt 6 — Wiki DE](/#/docs/adapterref/iobroker.autodoc/docs/user-guide/README.de.md#wiki-admin-json-cookbook).

```json
[
  {
    "title": "Musterhilfe Gast-WLAN",
    "body": "Beispieldaten: Hier steht später _Ihr_echter Hinweistext (Markdown)._",
    "profiles": ["onboarding", "user"]
  }
]
```

Maximal **12** Einträge; sehr lange Texte werden beim Erzeugen gekürzt.

<h3 id="wiki-step5-mermaid">Schritt 5 — Optional Mermaid (Tab „Meine Dokumentation“)</h3>

Platzhalter im Feld überschreiben. **Copy-Paste-Diagramme:** **„Schnellzugriff“** → *Mermaid-Kochbuch*.

Mit installierter **Mermaid-CLI** werden Diagramme als **SVG** ins HTML eingebettet (offlinefreundlich). Ohne CLI oder bei Fehler bleibt `<pre class="mermaid">` und der Browser kann **jsDelivr** laden — siehe Admin-Hilfe.

**Ausblenden:** Kapitel-IDs **`mermaid`** (manuell) und **`mermaidAuto`** (nur Auto-Host-Graph) in den jeweiligen **Ausblenden**-Listen.

<h3 id="wiki-admin-json-cookbook">Schritt 6 — Kapitelreihenfolge oder ausblenden</h3>

Tab **HTML-Export & Zusatzkapitel**: je Profil (Admin / User/Familie / Onboarding) gibt es zwei Arten Felder:

- **`…HiddenChaptersJson`** — Kapitel komplett **ausblenden** (fehlen dann auch im gleichen Profil unter **Markdown**).
- **`…ChapterOrderJson`** — **Reihenfolge** nur für Kapitel, die nicht versteckt sind.

Die **Felderhilfe (`?`)** bleibt die **Kanontabelle** der erlaubten englischen Kapitel-**Ids** für dieses Profil; diese Wikiseite ergänzt **Rezepte**.

### Erster Griff: weniger Pflege durch Ausblenden

Wenn ihr eine Doku nur **„kürzer“** haben wollt, probiert oft zuerst **Ausblenden** statt neue Sortierung zu pflegen („erst weglassen, dann umsortieren“). **Gültige Ids:** wie in den **`?`‑Tooltipps** beim jeweiligen JSON-Feld (**Admin**/User/Onboarding unterscheiden sich). Bei **Admin** gibt es zusätzlich die Ausblend-Id **`mermaidAuto`** (nur Auto-Host‑Topologie im Handbuchteil); das **von euch geschriebene** Mermaid liegt im Kapitel **`manual`** — es komplett zu entfernen geht dort über **`manual`** in der Ausblenden-Liste (wie jedes andere Admin‑Kapitel auch). Im **User**‑Profil nennen die Hilfen ausdrücklich **`mermaid`** und **`mermaidAuto`** eigene Listeinträge.

Copy-Paste‑Beispiele (z. B. nur Changelog weg oder User‑Skript‑Kapitel aus): **„Schnellzugriff“** → [JSON‑Kochbuch (engl. README)](/#/adapters/autodoc#json-cookbook-snippets).

### Reihenfolge — wie die Logik gedacht ist

- **`[]`** oder leeres Feld ⇒ **Standard‑Reihenfolge** des Adapters (**Quellcode‑Referenz** `USER_HTML_CHAPTER_KEYS` / `DEFAULT_ADMIN_CHAPTER_ORDER` / `ONBOARDING_HTML_CHAPTER_KEYS` in `lib/docTemplateConfig.js` — Änderungen im Produkt sollten dort und im JSON‑Kochbuch nachgezogen werden).
- Ihr tragt nur die gewünschten Ids als **JSON‑Array** in der Reihenfolge ein. **Alle Ids, die ihr weglasst**, hängen AutoDoc in der eingebauten Produktreihenfolge **hinten an** — ohne dass ihr die ganze Liste abtippen müsst (außer ihr wollt eine **strikt geschlossene** Reihenfolge).
- **`Unbekannte` oder falsch geschriebene** Ids (**Groß-/Kleinschreibung** zählt; z. B. `atAGlance`) werden **still übersprungen** — bei „Ändert nichts“, zuerst Tippfehler prüfen.

### Mini‑Rezept: zwei User‑Kapitel nach vorn holen

Nur zwei Ids angeben genügt, um sie **vor** den Rest zu setzen; der Adapter hängt fehlende Kapitel in der eingebauten Standardreihenfolge an. Beispiel: **`guestHelp`** und **`manual`** ganz vorne für das User‑Profil:

```json
["guestHelp", "manual"]
```

Vollständige **volle Reihenfolge** (bei Bedarf kopieren für User‑Profil, Stand Code wie oben beschrieben):

```json
["manual", "ai", "guestHelp", "atAGlance", "rooms", "scripts", "routines", "ownerPlaybook", "mermaid", "adapters", "custom", "system", "troubleshooting"]
```

### Wo noch mehr Schnipsel stehen

- **„Schnellzugriff“** → **[JSON‑Kochbuch](/#/adapters/autodoc#json-cookbook-snippets)** (Admin umordnen, weitere Hidden‑Listen, **`customDocSectionsJson`** …).
- Gleicher Abschnitt im **Übungsszenario** unten weiter mit **Screenshots** verknüpfbar.

Nach Änderungen: **Dokumentation erzeugen** und einen Export-Link (`info.*Url*`) kurz prüfen.

<h3 id="wiki-admin-html-css">Schritt 7 — Optional: Schrift &amp; zusätzliches CSS</h3>

Nur für den **HTML**-Export (Tab **HTML-Export & Zusatzkapitel**, Bereich **Optional: eigene Schrift & CSS**). Die **Tooltips** (`?`) enthalten **Copy-Paste-Starter**; Hintergrund und Selektoren (`nav`, `nav ul li a`, …): **„Schnellzugriff“** → *HTML — Schrift & CSS*. Nach Änderung wieder **Dokumentation erzeugen**.