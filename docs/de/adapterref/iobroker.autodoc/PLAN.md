---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/PLAN.md
title: AutoDoc-Adapter - Projektplan
hash: 9L0p+m+kf8fWkqaOS0LwVAGSKH32vgzG5ucqmnZKIQw=
---
# AutoDoc-Adapter - Projektplan
## Vision
AutoDoc ist ein ioBroker-Adapter, der aus einer Installation automatisch eine lesbare, strukturierte und ständig neu erzeugbare Dokumentation erstellt. Der Mehrwert liegt darin, dass man endlich einen aktuellen Überblick über ein oft sehr komplexes System bekommt, ohne alles manuell pflegen zu müssen - auch nach Monaten noch erklärbar, für sich selbst, für Familie, Mitbewohner oder bei Migrationen.

Drei echte Zielgruppen mit völlig unterschiedlicher Sprache:

- **Admin**: „Warum macht das System X, wenn Y passiert?“ - volle technische Tiefe
- **Benutzer / Familie**: „Wie funktioniert unser Zuhause?“ - Natürlich, kein JSON
- **Onboarding / Gäste**: „Wie benutze ich dieses Haus?“ - null Technik, reine Alltagssprache

Langfristige inhaltliche Richtung (Zusammenhänge, Auto vs. Pflege, Forum-Feedback): siehe Abschnitt **„Zukunftsvision - Zusammenhänge & Kontext (Brainstorming)“** weiter unten.

## Rollen der Dokumente
| Datei | Zweck |
| ----- | ----- |
| **[TODO.md](/#/docs/adapterref/iobroker.autodoc/TODO.md)** | **Offene** Punkte und **Klärungen** oben; **erledigte** Meilensteine im **Anhang** (vollständige Checklisten - nichts verloren) |
| **[README.md](/#/adapters/autodoc)** | Nutzer-Dokumentation und **Changelog** (Release-Notizen) |
| **[README.md](/#/adapters/autodoc)** | Nutzer-Dokumentation und **Changelog** (Release-Notizen) |

### Überblick - was umgesetzt ist vs. was noch offen ist
| Bereich | Kurz |
| ------- | ---- |
| Phasen 1-4, 0.9.x RC, Multihost, KI-Basis, Custom-Template-**Teile**, ** `documentation.exportHashes` **, große ** `documentation.*` nur Platzhalter (ab 0.9.39)**, Downloads aus `/files` | ✅ siehe [TODO.md - Übersichtstabelle](/#/docs/adapterref/iobroker.autodoc/TODO.md#stand-uebersicht) |
| Phase **5.x.2** Quick Start / Raumguides | 🟡 Kern **0.9.20**; Feinschliff **0,9,48** - optional mehr: [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| Phase **5.x.2** Quick Start / Raumguides | 🟡 Kern **0.9.20**; Feinschliff **0.9.48** - optional mehr: [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **Inventar-Delta / Export-Sprache** | ✅ ab **0.9.39** - `hideAdminDeltaSinceLastRun`, `docChangeFormat` |
| Phase **5.x.3** Meerjungfrau | ✅ **0,9,27-0,9,28**; Linux-Hinweise **0.9.48** - [TODO § 5.x.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **npm-Release** + **ioBroker.repositories** | 🟡 **npm** ** `0.9.48` ** ✅ (Herkunft); **latest**-Eintrag fehlt (**W4001**) - [TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung) |
| Phase **5.x.1** „Hybrid-Fehlerbehebung“ | ✅ **MVP in 0.9.18 / 0.9.19:** Freitext (`guestHelpNote` u.a.), **Kurzzeilen** + Doku-Links (Bookmark-URLs), **Node.js**-Checkliste + Snapshot-Hinweis (`lib/diagnosisSnapshot.js`) - [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x); **dev:** Admin **Betrieb - Referenz** + Diagnose-Copy (Schnappschuss / enge Checks) - optional später weitere Befund-Typen |
| **Architektur:** Redis/jsonl, States, Medien/Grafiken ([Leitplanken](#architektur-grenzen), [Medien-MVP](#architektur-medien-mvp), [Nächste Schritte](#architektur-naechste-schritte)) | ✅ festgelegt | Umsetzung = README + Phase 5 / 5.x |
| **System-Visitenkarte** „Forum kopieren“ | ✅ [Festlegung](#system-visitenkarte-festlegung) | ✅ **jsonConfig** `getForumCard`, Status `info.forumCardPlain`, `lib/forumCard.js` + Diagnose-HTML |
| **KI + Skriptquellcode** | ✅ [Festlegung](#ki-skript-festlegung) | **A** ✅ (`aiAnalyzeScriptSources`); **B** ⬜ wie Backup **zurückgestellt** ([TODO Phase 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) |
| **KI + Skriptquellcode** | ✅ [Festlegung](#ki-skript-festlegung) | **A** ✅ (`aiAnalyzeScriptSources`); **B** ⬜ wie Backup **zurückgestellt** ([TODO Phase 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) |

Detaillierte **Checkboxen**: immer **[TODO.md](/#/docs/adapterref/iobroker.autodoc/TODO.md)** zuerst; Dieser PLAN liefert **Warum** und **Kontext**.

## Technische Grundlagen
- **Sprache**: JavaScript (ioBroker Creator Standard)
- **Admin-UI**: JSON/jsonConfig
- **Framework**: @iobroker/create-adapter v3.1.2
- **Node.js**: Mindest **22** (`package.json` → `engines` **>= 22**; CI oft **Node 24**)
- **Repository**: [crunchip77/ioBroker.autodoc](https://github.com/crunchip77/ioBroker.autodoc)

## Entwicklungsumgebung
- **IDE**: Visual Studio Code auf Windows
- **Testsystem**: ioBroker auf Unraid-Server (separat vom Produktivsystem)
- **Bereitstellung**: Tägliche Arbeit an ** `dev` ** → Push → Testinstallation über ioBroker Admin (**benutzerdefinierte URL**): `https://github.com/crunchip77/ioBroker.autodoc/tarball/dev`; stabile Standardzeile folgt auf ** `main` **: `…/tarball/main`.
- **Release-Strategie**: `dev` testen → Merge nach `main` für Forum-/RC-Tester; **npm + repositories** erst wenn Adapter-Checker und PR durch sind (Versionsnummer dann bewusst wählen - **nicht** mit RC **0.9.x** verwechseln)

## Adapter sinnvoll nutzen (Betreiber - empfohlene Reihenfolge)
1. **Grundeinstellungen:** Projektname, Sprache, sinnvolle **Generierungs-Auslöser** (Start / Intervall / Adapter-Änderungen nach Bedarf).
2. **Erweitert → ioBroker-Basis-URL:** Für **QR**, **Link kopieren** und **Lesezeichen** die URL eintragen, die **Gäste im Browser** nutzen (oft ≠ Docker-Interna oder rein interne IPs - siehe Hinweis direkt über das Feld im Admin).
3. **Dokumentation in Staaten:** Entfällt ab **0.9.39** - **Volltext** nur unter ** `/files/` **; Staaten ** `documentation.markdown` / `.html` / `.json` ** sind **immer** kurze Platzhalter ([README - Exports & storage](/#/adapters/autodoc), `io-package` **0.9.39** `news`).
4. **Meine Dokumentation:** Freitexte (Notfall, Routinen, optional Mermaid); **HTML-Export & Zusatzkapitel:** Theme, sichtbare Kapitel, Reihenfolge - ** `atAGlance` ** / Onboarding ** `quickstart` **: Hilfetexte beachten (User vs. Gast-Kapitel).
5. **Optional:** ** `exportPath` ** für NAS/USB-Kopien; **KI** und **PDF** bewusst aktivieren (Ressourcen/Datenschutz); ** `docs/user-guide/` ** (Konfigurations-Wiki / Screenshots).

- `main` = stabiler Stand nach Merge aus `dev` (**0.9.x** Release-Kandidat / Forum); **npm**-Paket ** `iobroker.autodoc` ** wird von hier veröffentlicht (Version/News wie in **CONTRIBUTING**)
- `dev` = aktive Entwicklung; Commits immer auf `dev`
- Kein direkter Feature-Push auf `main` ohne offiziellen `dev`-Stand; Führt „dev“ → „main“ für getestete RC-Schnitte zusammen

## Release-Prozess (echter ioBroker-Release)
**npm** `iobroker.autodoc`: **Version im Repo** siehe `package.json` / `io-package.json` (aktuell ** `0.9.48` **). **Pre-Release-Suffix** zwischen Publishes nur wie in **[CONTRIBUTING - Abschnitt Maintainer-Versionierung („Between veröffentlicht“)](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#npm-package-identity-for-maintainers)** (Checker **E1036** vs **E2004**); vor ** `npm Publish` ** ** `news` ** nur für **auf npm** geplante Versionen ergänzen. ** `npm view iobroker.autodoc version` ** gegen Repo abgleichen. **[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (**latest**): Eintrag per **PR** mit Maintainer - **Standard-Adapterliste** im Admin **nach Merge**; bis dahin Installation über **npm** oder **Git**/URL. URL-Installation von ** `main`/`dev` ** bleibt für Tester möglich.

**Reihenfolge (vollständig und nichts vergessen):** **[CONTRIBUTING.md - Checkliste für Maintainer - Veröffentlichungsreihenfolge](/#/docs/adapterref/iobroker.autodoc/CONTRIBUTING.md#maintainer-checklist-release-order)** (**Tests → push `main` → `npm publish` → `git tag`/`push` → GitHub Release → `dev` sync**). Kurzfassung älterer Schritte bleibt hilfreich:

1. `package.json` + `io-package.json` (** `version` **, ** `common.news` **) + README/ Lockfile konsistent (**E2004**)
2. `dev` → ** `main` ** wenn stabil
3. ** `npm run release` ** und/oder ** `npmPublish` ** → Paket auf npmjs.com
4. ** `git tag -a vx.y.z` ** + ** `git push origin vx.y.z` ** + ** `gh release create` ** (oder GitHub-UI) - nicht weglassen
5. ** `ioBroker.repositories` ** bei Bedarf aktualisieren (** `sources-dist.json` **)
6. [Adapter Checker](https://adapter-check.iobroker.in/) - **W4001** erst **nach Merge** des Listeneintrags ohne die Warnung zu erwarten

## Wichtige Referenzen
- [ioBroker AI Developer Guide](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Adapter Creator](https://github.com/ioBroker/create-adapter)
- [Adapter-Prüfer](https://adapter-check.iobroker.in/)

---

## Phase 1 - Basis ✅ ABGESCHLOSSEN (v0.1.0)
> Vollständige, zeilenweise Checklisten aller Phasen: [TODO.md - Anhang A](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).

- Modularisierung: `lib/discovery.js`, `lib/documentModel.js`, `lib/markdownRenderer.js`, `lib/htmlRenderer.js`, `lib/versionTracker.js`, `lib/i18n.js`
- Dateibasierter Export: Markdown, HTML, JSON nach `/files/autodoc.0/`
- Admin-Benutzeroberfläche: „jsonConfig.json5“ + i18n (EN, DE, FR)
- Drei Zielgruppenprofile: Admin, Benutzer, Onboarding
- Adapter-Beschreibungen aus ioBroker-Metadaten (`common.desc`, `common.titleLang`)
- Versionsverfolgung mit Diff und Changelog
- Automatische Generierung: Startup, Timer, Event-basiert (30s Debounce)
- HTML-Renderer mit Sidebar-Navigation, Stat-Cards, profilbewusstem Layout

---

## Phase 2 - Inhalt ✅ ABGESCHLOSSEN
Der Sprung von „Adapter-Inventar“ zu echter „System-Dokumentation“.

### 2.1 Räume und Geräte ✅
- `enum.rooms` und `enum.functions` auslesen
- Räume-Kapitel in HTML + Markdown

### 2.2 Skript-Dokumentation ✅
- Alle Skripte aus `script.js.*` mit Name, Status, Beschreibung, Trigger-Typ

### 2.3 Wartungs- und Diagnosehilfe ✅
- Admin: Diagnose-Abschnitt (Scan, Befunde, Forum-Visitenkarte); Wartungs-Checkliste mit **Dokumentations-Score** nur für **offene Warnungen** (deaktivierte Adapter-Instanzen sind **Inventar**, kein Score-Abzug - bewusst deaktivierte Instanzen sind üblich)
- Lange Admin-HTML-Blöcke (Skript-Ordner, State-Referenzen, gemeinsame States, Userdata, Aliase) Standardmäßig **eingeklappt** (`<details>`), um die Seite lesbar zu halten

### 2.4 Such-/Filterfunktion im HTML ✅
- Clientseitiges JS, kein Server, gefilterte Tabellen + Karten
- Suchbox im Nav-Sidebar, Ergebnis-Zähler, Escape-Reset

---

## Phase 3 - Tiefe ✅ ABGESCHLOSSEN
### 3.1 Benachrichtigungen ✅
- „sendTo“ nach Generierung: Telegram, E-Mail, Pushover, Signal, WhatsApp, generisch
- Konfigurierbar: Instanz, Empfänger, optionales Nachrichten-Template

### 3.2 Abhängigkeitsanalyse ✅
- `lib/dependencyAnalyzer.js`: Regex-Extraktion von State-Referenzen aus Script-Quellcode
- `stateRefs` pro Script + Querverweistabelle (Gemeinsame Zustände)
- HTML: Unterabschnitt "State References" + "Shared States" (Admin-only)

### 3.3 KI-gestützte Dokumentation ✅
- `lib/aiEnhancer.js`: steckbare Provider-Architektur, Opt-In
- Anbieter: „anthropic“ (Claude Haiku/Sonnet, kostenpflichtig), „groq“ (Llama 3.3 70B, Free Tier), „ollama“ (lokal, kein Datenschutzproblem)
- Groq + Ollama nutzen OpenAI-kompatible API - minimaler Overhead
- Admin-Profil wird automatisch übersprungen (alle Daten bereits faktisch vorhanden)
- Narrative Zusammenfassung + Maintenance-Empfehlungen (nur Benutzer/Onboarding)
- HTML: hervorgehobene AI-Box; Markdown: Blockquote
- Fehler → stille Warnung, Doku wird trotzdem generiert

### 3.x i18n-Vollständigkeit ✅
- Alle hardcodierten englischen Strings in htmlRenderer.js durch i18n-Schlüssel ersetzt
- EN, DE, FR vollständig

### 3.x Adapter-Metadaten & ManualContext ✅
- `discovery.js`: liest `connectionType`, `dataSource`, `tier` aus `common.*` je Instanz
- `discovery.js`: `filterNative()` entfernt sensible Felder (Passwort/Token/Schlüssel/Geheimnis/...) per Regex, behält nur skalierte Werte → sicheres Admin-Detail
- `documentModel.js`: `parseManualContext()` normalisiert manualContext (JSON-String oder Objekt), gibt immer `{description, contact, Notes, Adapters:{}, rooms:{}}` zurück
- `htmlRenderer.js`: Admin-Tabelle zeigt Badges (🔌/☁️ ConnectionType, Push/Poll dataSource, Tier); ManualContext-Notiz Pro Adapter in allen Profilen

---

## Phase 4 - Profil-Redesign ✅ ABGESCHLOSSEN
Echte Zielgruppen-Dokumente statt „mehr oder weniger Details vom selben Template“.

### Architektur-Entscheidungen
- **Dispatcher-Muster** in `htmlRenderer.js`: `renderHtml()` → `renderAdminHtml()` / `renderUserHtml()` / `renderOnboardingHtml()`
- Bestehende Kapitel-Methoden bleiben für Admin/User nutzbar
- Onboarding erhält eigene Methoden ohne technische Kapitel

### Bekannte Probleme & Lösungen
- **Raum-Mitglieder auflösen**: Unique Device-IDs bündeln, einmalig `getForeignObjectsAsync` statt N Einzelaufrufe
- **Rollen-Inkonsistenz**: `lib/roleMapper.js` normalisiert alle Adapter-Rollen auf Kategorien + Icons
- **Live-States**: Opt-in (`config.readLiveStates`), nur sinnvolle Rollen (Thermostat, Tür/Fenster, Alarm), fehlertolerant
- **Dünner Onboarding-Inhalt**: Hinweis wenn kein `manualContext` + kein AI → Nutzer zur Konfiguration auffordern
- ** `system.config` **: Anmutiger Fallback, wenn Stadt/Land nicht gepflegt wird

### 4.1 Discovery-Erweiterungen
- `system.config` auslesen (Stadt, Land, Systemsprache)
- Geräte-Namen-Auflösung: Raum-Mitglieder → Geräte-Objekte → `common.name`
- Geräte nach Device gruppieren (nicht jeder Staat einzeln)
- Live-States für Schlüssel-Rollen (opt-in)

### 4.2 `lib/roleMapper.js`
- ioBroker-Rollen → Kategorien + Icons + Labels (EN/DE/FR)
- Abdeckung: Licht, Dimmer, Rolllade, Thermostat, Feuchtigkeit, Bewegung, Tür/Fenster, Medien, Schloss, Alarm, Steckdose, Kamera

### 4.3 DocumentModel-Erweiterungen
- `docModel.systemConfig`: Stadt, Land, Sprache
- `docModel.rooms.rooms[].devices[]`: aufgelöste Geräte mit Name, Kategorie, Icon, ggf. aktueller Wert + Einheit
- Abwärtskompatibel: nur neue Felder hinzu

### 4.4 Renderer-Architektur: Dispatcher
- `renderHtml()` als Dispatcher
- `renderAdminHtml()` = aktuelles Rendering (leicht bereinigt)
- `renderUserHtml()` = neue User-Methode
- `renderOnboardingHtml()` = komplett neu

### 4.5 Onboarding-Profil: Neues Template
- Sprache: „Du“, kurze Sätze, kein Passiv, kein Fachjargon
- Inhalt: Willkommenstext, Räume mit Geräte-Namen, „Was läuft automatisch?“, ManualContext, AI-Summary prominent
- Kein: Adapter-Inventar, OIDs, State-Counts, Trigger-Typen
- Live-Werte wenn aktiviert: Thermostat-Temperatur, Tür/Fenster-Status

### 4.6 Benutzer-/Familienprofil: Überarbeitung
- Räume mit aufgelösten Gerätenamen + Funktion
- Skripte: nur Name + Beschreibung, kein Trigger-Typ
- Wartungshinweise in Alltagssprache (keine OIDs)
- Adapter: nur Titel, keine Version/ID

### 4.7 Admin-Profil: Ergänzungen
- Device-Hierarchie in Räumen (mit OIDs für Vollständigkeit)
Der Rest bleibt wie bisher

---

## Phase 5 - Erweiterungen (Nice-to-Have)
> **Offene Arbeit** (Checkboxen): [TODO.md - § 1](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). **Abgestimmte Reihenfolge** (Benutzerdefiniert → 5.x → Phase 5 → npm): [TODO.md - Umsetzungsreihenfolge](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit).

- PDF-Export
- **Backup-Anbindung** (kein vollständiges „zweites Backitup“ im Adapter): typisches Archiv ** `.tar.gz` **, lesbarer Pfad und/oder Kopplung an [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) - Details [TODO.md - Backup / Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)
- Benutzerdefinierte Vorlagen (Teile bereits umgesetzt - siehe unten „Benutzerdefinierte Vorlagen“ und [TODO.md - Übersicht](/#/docs/adapterref/iobroker.autodoc/TODO.md#stand-uebersicht))

**Erledigt (ehemals Phase 5-Idee):** QR-Code und teilbarer Link für das Onboarding-Profil - **serverseitig** als eingebettetes SVG (npm-Paket `qrcode`), **ohne CDN** und ohne zusätzliches Client-Skript für die QR-Erzeugung. „Link kopieren“ nutzt dieselbe öffentliche `/files/…`-URL wie der QR-Code (Voraussetzung: sinnvoll gesetzte **ioBroker-Basis-URL** in den Adapter-Einstellungen; siehe README).

<a id="phase-5x-plan"></a>

### Phase 5.x - Onboarding / Fehlerbehebung / Mermaid (gestaffelt)
> Abgestimmt auf die nächste Ausbaustufe. Checkboxen: [TODO.md - § 1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x). **Priorität:** 1 → 2 → 3.

**1. Notfall & Troubleshooting für Laien (Hybrid)** **Bereits vorhanden (Abgrenzung):** Manuelle Felder z. B. **Hilfe & Notfälle** / **Routinen** / **Playbook** (`guestHelpNote`, `homeRoutinesNote`, `ownerPlaybookNote`, u. a. ab 0.9.9 / 0.9.25) - Freitext, kein erfundenes Auto-„Notfallwissen“.

**Umgesetzt (fester MVP laut [TODO - 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x)):**

- **0.9.18:** **Kurzzeilen** (WLAN, Strom, Wasser, Sonstiges) + **Lesezeichen-Links** zu generiertem **User-**, **Onboarding-** und **Admin**-HTML (gleiche Ziele wie QR / `info.htmlUrl*`, sinnvoll nur mit gesetzter **ioBroker-Basis-URL**).
- **0.9.19:** In **User/Onboarding**-Exporten kurze **Auto-Checklisten** nur bei **konkretem** Befund (derzeit: **Node.js**-Regel wie in **Admin → Diagnosis**) plus **Hinweis auf Momentaufnahme**; gemeinsame Logik: `lib/diagnosisSnapshot.js` - kein doppelter Diagnose-Block im **Admin**-HTML (dort vollwertiges Diagnose-Kapitel).
- **dev (Renderer-Copy, nicht zwingend eigene semver):** Admin-HTML: Kapitel **Betrieb - Referenz** (mit Disclaimer statt „Fehlerbehebung“-Konnotation); **Diagnose:** Einleitung **Schnappschuss** (kein Voll-Audit), **Automatische Prüfungen** (Node-Heuristik) getrennt von **Allgemeine Erinnerungen** (OS-Tipp); `RENDERER_VERSION` in `lib/htmlRenderer.js` bei Templateänderung anheben.

**Später ausbaufähig (nicht blockierend):** weitere Diagnose-Signal-Typen in derselben **„nur bei Befund“**-Logik, fällt Daten tragfähig; Keine Pflicht, den Hybrid um „KI-Notfallwissen“ zu erweitern.

**2. Quick Start & Raumguides (strukturierter)** MVP ✅ **0.9.20**; Gäste kürzer **0.9.26**; Sortierung/Caps/Automations-Zähler **0.9.48**. Optional: weitere Caps/i18n - [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x).

**Festlegung Sortierung Skript-Snapshot (`buildQuickStartGuide`):** Primäre **längere erste Zeile** von `common.desc` (mehr Informationsgehalt). **Nicht** primär nach Trigger sortieren - kurze Beschreibungen kämen trotz „wichtigem“ Trigger nach oben. Bei **gleicher** Zeilenlänge: ** `triggerType` ** aus `DocumentModel.detectTriggerType` als Tie-Breaker (schedule → subscribe → on-start → blockly → unlimited), danach Name - `lib/quickStartGuide.js`.

**3. Mermaid / kleine Graphen** **Stufe 1 (MVP):** Mermaid aus **kuratiertem** Inhalt (eigenes Feld / `manualContext`); Ausgabe mindestens in Markdown, HTML-Darstellung bewusst wählen (Codeblock vs. Client-Render). **Stufe 2:** optional kleiner **begrenzter** Auto-Graph (z.B. Multihost Host → Instanzen mit Knotenlimit). **Nicht Ziel:** vollständiger Skript-/State-Graph großer Installationen ohne Filter.

**Umgesetzt:** **0.9.27** (`manualMermaidDiagram`, HTML + Client-Mermaid jsDelivr; Markdown-Fence); **0.9.28** (`autoMermaidHostGraph`, Knotenlimit). **Offen** (Phase 5 / portable Artefakte): serverseitig **SVG statt** oder **zusätzlich zu** Client-Render - siehe [TODO § 1.2a](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-pdf-offline-mermaid) und Leitplanke **Graphen / Mermaid** unten.

---

<a id="zukunftsvision"></a>

## Zukunftsvision - Zusammenhänge & Kontext (Brainstorming)
> **Status:** Sammelplatte für Ideen - **keine feste Roadmap** für alles in der Tabelle unten. **5.x.3 (Meerjungfrau)** ist umgesetzt; **Phase 5** (u.a. PDF, Backup-Anbindung) und weiteres Feintuning bleiben **Umsetzung / Produktentscheid** mit [TODO.md - Phase 5](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features). Festgehaltene **Produkt-Merkliste** inkl. **Plattform-Reconnaissance:** Abschnitt [Merkliste - Produkt-Lücken & nächste Ausbaustufen](#merkliste-produktluecken-platform). Dieser Abschnitt soll verhindern, dass Diskussionen (Forum, Praktikant) verloren gehen.

### Auslöser
- **Ziel des Adapters:** aus der Installation **automatisch** aktuelle, gut lesbare Doku - ohne Pflicht zur manuellen Pflege.
- **Forum** ([Test Adapter autodoc](https://forum.iobroker.net/topic/84267/test-adapter-autodoc/)): Nutzer **UlliJ** lobt AutoDoc und wünscht sich die **Kombination** mit manuell erstellter Doku, die **Zusammenhänge** verständlich macht (z.B. Topologie-Skizzen: Proxmox, LXC, ioBroker, Influx, Grafana, Funk-Ökosysteme). Verlinkung **von** externer Doku **zu** AutoDoc wurde praktisch gezeigt („quick & dirty“).
- **Abgrenzung zu „Bilder in Notizen“:** Bilder/Grafiken können *ein* Baustein sein; der Kernfeedback ist breiter: **Beziehungen** zwischen Teilen des Systems sichtbar machen - für **Onboarding** (Gäste), **User** (Alltag) und **Admin** (Aufbau, Abhängigkeiten, Sonderfälle, Wiederanlauf).

### Spannungsfeld
- Je **mehr** Nutzer einpflegen müssen, desto eher wird es **nicht** genutzt („zu faul“ / kein Zeitbudget) - **Auto-Charakter** leidet.
- **Lösungsrichtung:** starke **auto-Basisschicht** aus Objekten/Metadaten/Analyse (bereits z.B. Inventar, Skript-Übersicht, Dependency-/Referenz-Ideen) + **optionale, dünne** Schicht für Dinge, die ioBroker **nicht** weiß (Umgebung, Absicht, Notfall-Infos, externe Doku-Links).

### Admin-Profil - „Wie ist das System aufgebaut?“
**Möglichst ohne Zusatzpflege:**

- Inventar: Hosts, Controller/Node, Instanzen, Adapter-Metadaten, Diagnose, Repos - Landkarte des **Ist-Zustands**.
- **Abhängigkeiten / Querbezüge:** aus vorhandener Analyse (z.B. `stateRefs`, Skript↔Objekt, Instanzübersicht) - echte **Auto-Doku**.
- Skript-Landkarte (Trigger, Zeitpläne, Ordner) als Grundlage für **„was läuft wie automatisch“** und für **Recovery-Listen** (was muss nach Neuaufbau wieder existieren), ohne Romane.

**Nur wo nötig (opt-in, wenig Felder):**

- Kurzes Kapitel **„Umgebung & Wiederanlauf“** mit festen Unterpunkten; Auto-Befüllung wo möglich, **Lücken** optional vom Nutzer (einmalig oder selten).
- **Externe Quelle:** prominente Links (Wiki, BookStack, Markdown-Repo) statt alles in den Adapter zu duplizieren.
- Optional später: **Mermaid** oder **Bilder** nur für diesen Kontext - **Umsetzung Mermaid:** [Phase 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md) (gestaffelt: kuratiert → klein & auto); Bilder weiterhin separat zu klären.

### Benutzerprofil
- **Gleiche Schichtung**, andere **Tiefe und Sprache:** Alltag („Räume, Geräte, was passiert von selbst“), **kein** technisches Recovery-Kapitel wie im Admin.
- **Auto-first** noch stärker: kurze Texte, Karten, wenig Pflege-Fläche; optionale **Hausnotizen** bleiben knapp.

### Onboarding-Profil
- **Orientierung** und **„was läuft automatisch“** in groben, vertrauenswürdigen Worten; strikt **faktenbasiert** wo KI genutzt wird (Guards, Fallbacks - bestehende Philosophie fortführen).
- **Zusammenhänge** als sehr kurzer Block + ggf. **eine** visuelle oder verlinkte Ebene - kein Architektur-Wälzer für Gäste.

<a id="merkliste-produktluecken-platform"></a>

### Merkliste - Produkt-Lücken & nächste Ausbaustufen
> **Zweck:** Sammelt Punkte aus Produkt-/Nutzerperspektive - **keine** automatische Priorität gegenüber der abgestimmten Reihenfolge in [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). Umsetzung **stückweise**, wenn Aufwand und Nutzen passen.

**Inhaltliche Lücken („erklären“, nicht nur inventarisieren):**

- **Semantik der Automatisierung:** zuverlässiger Überblick „was läuft wie automatisch“ über alle **für die Installation** relevanten Quellen (Skripte, Zeitpläne, wo erkennbar Adapter-interne Regeln). Bekannte Grenzen mitdenken: Blockly-Inhalt, **dynamische** State-IDs (heute Regex-Grenzen), Szenen/Logik/Node-RED und andere Regeladapter - nur wo Daten tragfähig sind oder **gezielt** angebunden werden.
- **Tiefere Skript-Analyse:** über Live-/Regex-Schicht hinaus - insbesondere **offline** aus Backup-Inhalten (**KI + Skript Variante B**, gekoppelt an [Backup / Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)): längere Läufe, ggf. AST statt nur Muster, ohne das laufende System zu belasten.
- **Gerätemanager (ioBroker Admin Device Manager):** optional strukturierte Gerätelisten über das ** `dm:` **-/Device-Manager-Protokoll nutzen, wo Adapter mitspielen - stärkeres „welche Geräte unter welcher Instanz“; **ersetzt nicht** globale Automatisierungs-Semantik.
- **Vertrauen & Zeit:** menschenlesbare **„Was hat sich seit dem letzten Lauf geändert?“** aus Versions-/Diff-Logik - **Umsetzung (`dev`):** Admin **Systemübersicht** und **Admin-Markdown** mit Inventar-Delta (optional per ** `hideAdminDeltaSinceLastRun` ** ausblendbar); **Changelog**-Karten und gespeicherte Vergleichs-Zusammenfassungen werden beim Export in der **gewählten Dokumentationssprache** angezeigt; **User**-Export mit kurzer Alltagszeile bei **echten** Deltas (nicht Erstlauf). Onboarding ohne diesen zusätzlichen Delta-Hinweis. Details README / [TODO - Delta-UX](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).
- **Kurierte „Warum“-Ebene:** neben KI/Freitext eine **systematische** Schicht (z.B. knappe Pflicht-/Halbpflichtfelder pro Bereich, Glossar, „Absicht in einem Satz“) - skalierbarer als reine KI-Erklärung.
- **Transparenz der Grenzen:** in Exporten klar kennzeichnen, **wo automatische Erkennung endet** (Gerät/Firmware/Cloud/manuelle Schicht) - Erwartungsmanagement für Nutzer. *Baseline (Export):* kurzer Hinweis am Ende des **Systemübersicht**-Kapitels (**Admin**-Profil: HTML + Markdown) - `docTransparencyLimitsShort` in `lib/i18n.js`. User/Onboarding-HTML haben **kein** technisches Systemkapitel; Dort bleibt der Hinweis bewusst weg.

**Plattform-Reconnaissance (laufend; bei js-controller-/Admin-Sprüngen oder größeren AutoDoc-Releases sinnvoll):**

- **js-controller** und Objekt-/State-Zugriffe: Welche ** `getObjectView` **-Designs und APIs sind portabel und über Releases hinweg stabil interpretierbar?
- **Admin** (Stand relevante **globalDependencies**): **jsonConfig**, **Device Manager**, Messaging - welche Endpunkte liefern strukturierte, adapterübergreifend nutzbare Daten?
- **Referenz-Adapter** stichprobenartig prüfen (z.B. **javascript**, **backitup**, bei Bedarf Szenen/Logik/„IoT“-Regeln o.Ä.): Objektschemas, typische States, Backup-Artefakte, `sendTo`-Konventionen - kurz festhalten, **was zuverlässig für AutoDoc nutzbar ist** vs. **Best Effort**.

Ergebnisse können in Erweiterungen von `discovery.js` / Hilfstexten münden - ohne dass jedes Diskussionsthema sofort ein eigenes Feature wird.

<a id="merkliste-nachzeichnung-2026-05"></a>

### Nachzeichnung - Produktperspektive & Fortführung (12.05.2026)
> **Zweck:** Vollständige **Formulierung** aus der Projekt-Diskussion („was dem Adapter aus Nutzer-/Produktperspektive noch fehlt“), damit beim Fortsetzen nichts fehlt. **Keine** neue Priorität gegenüber [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit). Die technischen Stichworte sind mit **Inhaltliche Lücken** und **Plattform-Reconnaissance** oben bereits verbunden.

**Checkliste (Diskussionsstand):**

1. **„Was automatisiert hier wirklich?“** - Inventar allein reicht nicht ohne **zuverlässige Semantik**: Blockly ohne eigene Auswertung bleibt eine Blackbox; **dynamische** State-IDs unterlaufen die Regex-Schicht; Szenen/Logik/Node-RED/eigene Adapter-Regeln sind **kein** einheitlicher Automatisierungsüberblick - entweder angehen oder Erwartung „vollständige Doku“ durch **Transparenz der Grenzen** entschärfen.
2. **Zweite, tiefere Datenquelle für Skripte** - z. B. **Backup-/Stand-basiert**, **AST statt nur Regex**, längere Läufe, weniger Live-Last; bei uns angeplant (**KI + Skript Variante B**, [Backup-Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung)), noch nicht umgesetzt.
3. **Brücken zu neuen Admin-Fähigkeiten** - z. B. **Gerätemanager** (`dm:` / Device Management) für strukturierte Gerätelisten, wo Adapter mitspielen (**ersetzt nicht** globale Automatisierungs-Semantik).
4. **Vertrauen: Änderungen erzählen** - Diff intern vorhanden; in der **lesbaren Doku** das Narrativ „**seit letztem Lauf** …“. **Erste Ausbaustufe umgesetzt** (Admin-HTML/Markdown, User-Kurzzeile, optional ausblendbar - siehe Bullet **Vertrauen & Zeit** oben und [TODO - Delta-UX](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt)); weitere Ausbaustufen optional.
5. **Kuratierte „Warum“-Ebene ohne nur KI** - systematische Schicht (Pflicht-/Halbpflichtfelder, Glossar, „Absicht in einem Satz“), skalierbarer als reine KI-Erklärung.
6. **Transparenz der Grenzen** - explizit, wo automatische Erkennung endet (Gerät/Firmware/Cloud/manuelle Schicht); Grundlinie z. B. `docTransparencyLimitsShort` am Ende der Admin-**Systemübersicht**.

**Prioritäts-Empfehlung (Diskussion):** Richtung „vollwertige Doku“ zuerst **Automatisierungs-Semantik / Inventar-Tiefe** und **Änderungs-Narrativ** stärken - **DnD/Kosmetik** nachrangig.

**Fortführung:** Aktueller Stand von **js-controller**, **Admin** und **Referenz-/Default-Adaptern** (welche APIs liefern **tragfähige** Daten vs. nur Best Effort?) wie unter **Plattform-Reconnaissance** - bei größeren Releases oder Controller-/Admin-Sprüngen kurz gegenprüfen; Erkennt ggf. hier oder in Issue/TODO nachziehen.

##### Reconnaissance 20.09.2026 (Live-Host + Ökosystem)
Abgleich gegen eine laufende Installation (MCP `system_info` / `list_adapters`) und aktuelle Admin-/MCP-Doku - **kein** Pflicht-Feature-Bau in diesem Schritt.

| Komponente | Beobachteter Stand | Bedeutung für AutoDoc |
| ---------- | ------------------ | --------------------- |
| **js-controller** | **7.2.2** (Linie **7.x / Lucy**); AutoDoc deklariert weiter ** `>= 6.0.11` ** | **Minimum nicht anheben** - 6.x-Hosts bleiben unterstützt. Discovery weiter über **Objekte/Views**, nicht über interne Controller-APIs. |
| **Web** | **9.1.4** | Unverändert: optionale Auslieferung des HTML-Exports; AutoDoc schreibt weiter nach ** `/files/` **. |
| **Javascript** | **10.2.5** | KI-Variante A (`common.source`) weiter gültig; kein Blockly-Parser. |
| **iobroker.mcp** | **1.1.7** (Streamable HTTP `/mcp`, Session-Header) | Werkzeuge für **externe** KI-Clients (u.a. Cursor). **Kein** Ersatz für AutoDoc-Provider (Ollama/Groq/Anthropic) und **kein** Weg, ein Cursor-Abo als `aiApiKey` einzutragen. Optional später: im **Admin-Profil** Best-Effort-Hinweis „MCP-Instanz vorhanden“ - **nicht** priorisiert. |
| **ioBroker.repositories** | **latest:** Eintrag ** `autodoc` fehlt** in aktuellem ** `sources-dist.json` ** (obwohl PR **#5978** gemerged war). **stable:** bewusst **zurückgestellt** (zu wenige Tester, Issue **#54**). | Zuerst Checker-**Errors** (#60) schließen, dann **neuesten** beantragen. Keine stabile PR. |
| **ioBroker.repositories** | **latest:** Eintrag **``autodoc` fehlt** in aktuellem **``sources-dist.json`** (obwohl PR **#5978** gemerged war). **stable:** bewusst **zurückgestellt** (zu wenigen Testern, Issue **#54**). | Zuerst Checker-**Errors** (#60) schließen, dann **neuesten** beantragen. Keine stabile PR. |

**Betrieb / GitHub-Doku (Support-Hinweis):** Sprünge zu `#…` auf `github.com` setzen **JavaScript** voraus - strenge Blocker (z.B. **NoScript** ohne Ausnahme für GitHub) können Hash-Scroll ausfallen lassen; Adapter-Links auf ** `blob/<branch>/…` **, nicht `raw.githubusercontent.com`.

### Umsetzungs-Ideen (nicht priorisiert)
| Richtung | Idee |
| -------- | ---- |
| **A - Auto** | Aus `documentModel` generierte Kurztexte/Kacheln „Zusammenspiel“; **automatische** Mermaid-Graphen *nur* wo Daten tragfähig sind (z.B. kleine Hierarchien). |
| **B - Halbautomatisch** | Ein konfigurierbares Markdown-Feld „System & Zusammenhänge“ mit optionalen Mermaid-Blöcken (wenig Pflege, hoher Effekt). |
| **D - Medien** | Bild-Upload oder Ablage unter `files/…` + Verweise - höherer Aufwand (Größe, Dark Mode, Rotation). |
| **D - Medien** | Bild-Upload oder Ablage unter `files/…` + Verweise - höherer Aufwand (Größe, Dark Mode, Rotation). |

<a id="weitere-moeglichkeiten-roadmap-2026-05"></a>

### Weitere Möglichkeiten - Roadmap-Vorschlag (2026-05)
> **Zweck:** Sammelt **konkrete Ausbaustufen** aus Projekt-Diskussion (Produktperspektive, Plattform **js-controller** / **Admin** / Referenz-Adapter), damit Ideen **nicht verloren** gehen. **Keine** automatische Priorität gegenüber [TODO.md - offene Arbeit](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit) - Checkboxen und Releases bleiben in **TODO**; Hier nur **Möglichkeiten** und **Begründungen**. Bei Umsetzung: Eintrag in TODO anlegen oder abhaken, ggf. Aufklärungs-Ergebnisse kurz nachziehen.

#### A - Prozess & Sichtbarkeit (wenig Code, hoher Nutzen)
| Möglichkeit | Kurz |
| ----------- | ---- |
| **PR [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories)** (`sources-dist.json`, **latest**) | Schließt Adapter-Checker **W4001**; Standard-Adapterliste im Admin - [TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung) |
| **Plattform-Aufklärung** (laufend) | Bei js-controller-/Admin-Sprüngen oder größeren Releases: Was ist **stabil** vs. **Best Effort**? Kurz in Issue/TODO/PLAN - siehe [Plattform-Aufklärung](#merkliste-produktluecken-platform) |
| **Plattform-Aufklärung** (laufend) | Bei js-controller-/Admin-Sprüngen oder größeren Releases: Was ist **stabil** vs. **Best Effort**? Kurz in Issue/TODO/PLAN - siehe [Plattform-Reconnaissance](#merkliste-produktluecken-platform) |

#### B - Offene Arbeitspakete aus TODO / Phase 5 (bereits festgehalten, hier zur Vollständigkeit)
| Thema | Sinn | Aufwand (grob) | Verweis |
| ----- | ---- | -------------- | ------- |
| **Backup / [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup)** | Offline/Migration, **KI-Skript Variante B**, Doku aus ** `.tar.gz` ** | Hoch | [TODO - Backup-Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung), [§ 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |
| **Admin-UI-Reaktion** | Nur wenn **jsonConfig** für DnD, Live-Mermaid-Preview, Medien-Galerie **systematisch** zu eng | Hoch, optional | [TODO § 1.8](/#/docs/adapterref/iobroker.autodoc/TODO.md#admin-react-optional) |
| **Phase 5.x.2 - Feintuning** | Kern **0,9,48** ✅; optional: Caps, Doppelinfos | Klein | [TODO § 5.x.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) |
| **Phase 5.x.1 - weitere Diagnose-Signale** | Auto-Checklisten **nur bei Befund** (wie Node.js heute via `lib/diagnosisSnapshot.js`) | Mittel | [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x), [Hybrid MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan) |
| **Phase 5.x.1 - weitere Diagnose-Signale** | Auto-Checklisten **nur bei Befund** (wie Node.js heute über `lib/diagnosisSnapshot.js`) | Mittel | [TODO § 5.x.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x), [Hybrid MVP](/#/docs/adapterref/iobroker.autodoc/PLAN.md#phase-5x-plan) |

#### C - Merkliste „Sinn der Doku“ (inhaltliche Vertiefung)
| Lücke (PLAN) | Erster sinnvoller Schritt | Verknüpfungscode |
| ------------ | ------------------------- | ---------------- |
| **„Was hier wirklich automatisiert?“** | ✅ **0.9.48:** Admin-Kapitel **„Automatisierung im Überblick“** + Transparenz-Grenzen (Blockly/Subscribe/Regel-Adapter) | `lib/automationOverview.js`, Renderer |
| **Transparenz der Grenzen** | `docTransparencyLimitsShort` **erweitern**: Blockly, Node-RED, Szenen/Logik-Adapter, **dynamische** State-IDs (Regex-Grenze) | `lib/i18n.js`, Admin-Systemübersicht |
| **Änderungs-Narrativ** | Delta-UX ✅; optional **ein** Onboarding-Satz bei **großen** Inventar-Deltas (heute bewusst ohne) | `docChangeFormat.js`, Renderer |
| **Änderungs-Narrativ** | Delta-UX ✅; optional **ein** Onboarding-Satz bei **großen** Inventar-Deltas (heute bewusst ohne) | `docChangeFormat.js`, Renderer |

**Leitgedanke:** Stärkere Hebel sind **erzählbare Schicht** („was läuft von selbst / was hat sich geändert / wo endet AutoDoc“) und **Plattform-Brücken** - nicht primär mehr Kapitel oder DnD.

#### D - Plattform & Referenz-Adapter (was nutzbar ist)
> **Grundsatz:** Daten über **Objekte/States/Views** des js-controllers - **kein** Pflicht-Zugriff auf private Admin-HTTP-APIs. **Best Effort** klar kennzeichnen.

##### Js-Controller
| Quelle / API | Möglicher Nutzen für AutoDoc | Bereits / Stand |
| ------------ | ----------------------------- | ---------------- |
| `getObjectView(system, host\|instance\|schedule)` | Host-/Instanz-Landkarte, Zeitplan-Übersicht | ✅ weitgehend |
| ** `system.adapter.*.alive` / `.connected` ** | Kurzzeile User/Onboarding: Automatik/Instanz **nicht erreichbar** (faktenbasiert) | ⬜ Vorschlag |
| ** `system.adapter.*.alive` / `.connected` ** | Kurzzeile User/Onboarding: Automatik/Instanz **nicht erreichbar** (faktenbasiert) | ⬜ Vorschlag |
| **Schedule-Objekte / CRON** | Admin: Zeitplan-Landkarte; Benutzer: „Was läuft nachts?“ ohne Quelltext | 🟡 Teile in Discovery |
| Weitere ** `getObjectView` **-Ansichten | Nur nach **Reconnaissance** - portabel und release-stabil | ❓ vor Bau dokumentieren |
| Weitere ** `getObjectView` **-Views | Nur nach **Reconnaissance** - portabel und release-stabil | ❓ vor Bau dokumentieren |

**Nicht Ziel:** Vollständiger Objektbaum oder ungefilterter State-/Skript-Graph ([Bewusst weggelassen](#bewusst-weggelassen)).

##### IoBroker.admin
| Fähigkeit | Möglicher Nutzen |
| --------- | ---------------- |
| **Geräte-Manager** (`dm:` / Geräteverwaltung) | Strukturierte Gerätelisten **pro Instanz** - Räume/User verständlicher („Gerät unter Adapter X“) |
| **jsonConfig-Muster** | Nutzer-Doku (`docs/user-guide/`) an Tabs/Kochbücher anbinden - ✅ teilweise |
| **Datenweg** | Geräte über **Objekte**, die DM-fähige Adapter schreiben - Reconnaissance: welche Adapter **deviceManagement** nutzen |

**Pragmatischer MVP (Vorschlag):** `deviceMap` in Discovery anreichern, wo DM-Objekte existieren; **User-Raum-Kapitel** priorisiert Gerätenamen.

##### IoBroker.javascript
| Erweiterung | Nutzen | Grenze |
| ----------- | ------ | ------ |
| **Blockly** (`common.engine`) | Label „visuelles Skript - Quelltext nicht ausgewertet“ | Kein Blockly-Parser |
| **Ordner / `lib/scriptGroups.js` ** | Admin: Automatisierung nach Bereich | ✅ |
| **KI Variante A** (`common.source`, Opt-in) | Benutzer-/Onboarding-Erklärungen | ✅ |
| **KI Variante A** (`common.source`, Opt-in) | Benutzer-/Onboarding-Erklärungen | ✅ |
| **KI Variante B** (Backup) | Tiefe ohne Live-Last | an Backitup gekoppelt |

##### IoBroker.backitup (Phase 5, zurückgestellt)
- Archiv ** `*.tar.gz` ** lesen (`iobroker-objects.json`, Skript-Inhalte).
- **Lesbarer Mount-Pfad** oder lose ** `sendTo` ** (`list`, `getSystemInfo` - gegen aktuelle Backitup-Version prüfen).
- **Gleiche KI-Pipeline** wie Variante A - **andere Quelle**; Doku bei ioBroker-Ausfall / Migration.

##### Weitere Adapter (Best Effort, mit Transparenz)
| Typ | Realistisch für AutoDoc |
| --- | ------------------------ |
| **Szene / Logik / Knotenrot** | Instanz + aktiviert + Metadaten-Kurztext; Abschnitt **„Weitere Regel-Engines“** + Hinweis **nicht vollständig analysiert** |
| **hm-rpc, zigbee, mqtt, …** | Inventar, Räume, Rollen, `connectionType`/`tier` | ✅ Kern |
| **Zufluss, Grafana, SQL** | Admin: Zeile „externe Datenhaltung vorhanden“ - **kein** DB-Inhalt |
| **Entdeckung** | Meta in Diagnose („Gerätesuche aktiv“) |

#### E - Vorgeschlagene Umsetzungs-Reihenfolge (Diskussion 2026-05, nicht bindend)
| Stufe | Stufe Paket | Begründung |
| ----- | ----- | ---------- |
| **1** | **Repositories-PR** + README-Hinweis Standardliste | Prozess, kein Feature-Bloat; schließt W4001 |
| **2** | ~~**„Automatisierung im Überblick“** (Admin) + Transparenz~~ | ✅ **0,9,48** |
| **3** | **Device-Manager-Anreicherung** (Best Effort) | Bessere Räume/User ohne neuen HTTP-Endpunkt |
| **Danach** (nach Forum/Tester) | **Backup/Backitup** + KI-B; dann **DnD** oder **weitere Diagnose-Checks** | Priorität aus Rückmeldung |

#### F - Bewusst nicht als „nächste“ Ausbaustufe
Entspricht [Bewusst weggelassen](#bewusst-weggelassen) und [TODO - Bewusst weggelassen](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt): u. A. ungefilterte Groß-Graphen, vollständiges Live-AST aller Skripte, REST-API/Webhooks, Mobile App, Asset-Upload-Tab / eigener HTTP-Asset-Server (Medien-MVP: **URLs + kleine SVG**), Admin-React **ohne** konkreten jsonConfig-Engpass.

---

### Skript-Quellcode-Analyse & Smarthome-Beschreibung durch KI
**Grundgedanke:** Nicht nur Metadaten (Name, Trigger, Status) der Skripte auslesen, sondern optional den **Quelltext** per KI kurz erklären lassen - was das Zuhause **tatsächlich** automatisiert (in Alltagssprache für User/Onboarding).

#### Variante A - Deep Script Analysis (live, Erweiterung Phase 3.3)
- `discovery.js` liest `common.source` nur bei **aktiviertem** Config-Flag ein.
- Zusätzlicher KI-Pass in `aiEnhancer.js`: Batches/Truncation wegen Token-Limits.
- Ausgabe: **pro Skript** kurze Erklärung (2-4 Sätze) + **optional ein** zusammenfassender Absatz „Automatisierung im Überblick“ (nur **User/Onboarding**, nicht redundant zum Admin-Profil).

#### Variante B - Backup-basiert (Erweiterung Phase 5)
- Gleiche Idee, Datenquelle = **ioBroker-Backup** (Inhalt z.B. `iobroker-objects.json` o.ä.; typisch ** `.tar.gz` ** von [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup), nicht nur **ZIP**).
- Sinn: **Offline**/Migration - **kein** Ersatz für A, sondern **Erweiterung derselben Pipeline**, sobald [Backup-Anbindung / Festlegung](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung) umgesetzt ist.

<a id="ki-skript-festlegung"></a>

#### Festlegung (Schicht 2)
| Frage | Entscheidung |
| ----- | ---------- |
| **A, B oder beides?** | **Zuerst A** (laufende Installation, höchster Alltagsnutzen). **B** an die **Phase-5-Backup-Integration** anbinden - gleiche KI-Logik, andere Quelle. |
| **Tiefe** | **Pro Skript** Kurztext (Pflicht, wenn Feature an); **eine** globale KI-Zusammenfassung optional; **Admin-Profil** keine zusätzliche KI-Flut (Metadaten + ggf. bestehende Tabellen reichen). |
| **Darstellung** | **Erweiterung** des Skript-Kapitels / der Skript-Karten bei **User & Onboarding**; Admin unverändert oder nur technische Zusatzzeile ohne Marketing-Text. |
| **Datenschutz** | **Opt-in** + klare README-Warnung; vor dem Senden **heuristische Redaktion** von Zeilen mit typischen Secret-Mustern (analog `filterNative()`-Denke) - **kein** Vollversprechen; Der Rest liegt bei **verantwortungsvollem Opt-in**. |

---

<a id="system-visitenkarte-festlegung"></a>

### System-Visitenkarte / „Für Forum kopieren" (Forum-Feedback)
**Grundgedanke:** Kompakte **System-Kurzübersicht** für Helfer im Forum - Kerndaten (js-controller, Node.js, RAM, CPU, Instanzen, Repository, …) sind in der generierten Admin-Doku schon da, aber nicht **ein-Klick-teilbar**.

#### Festlegung (Schicht 2)
| Frage | Entscheidung |
| ----- | ---------- |
| **Wo der Button?** | **Primär:** Button/Aktion in der **Adapter-Instanz** (**jsonConfig**) → kopiert in die **Zwischenablage**. Nutzer sind beim Schreiben von Forumsbeiträgen regelmäßig in der **Admin-Oberfläche** - dort maximaler Nutzen. |
| **Zusätzlich HTML?** | **Behalten:** bestehendes Snippet in der **generierten Admin-HTML** (wer nur die Doku offen hat). **Kein** muss für zwei identische Buttons; UI-Instanz ist die Hauptlösung. |
| **Formatieren** | **Plaintext** mit festem, gut lesbarem Layout (Überschriftenzeilen, Key: Value) - **Forum- und Markdown-freundlich**. **Kein** HTML in der Zwischenablage (vermeidet Formatierungsmüll in Foren). |
| **Benutzerdefinierte Vorlagen (Ebene 1)** | **Kein** Ersatz für den Button: Kapitel-Auswahl kann später eine **„nur System“-Doku** erzeugen, ist aber **schwerer** als Copy-Paste für Foren. Visitenkarte ≠ Template-Thema. |

**Inhalt (Minimum):** js-controller-Version, Node.js inkl. LTS-Hinweis, Host/OS falls sinnvoll, RAM/CPU (Kurz), Instanz-Anzahl, Repository-Kanal - wie bereits in der Diagnose/System-Sparte erfasst, aber **kompakt in einem Block**.

---

<a id="custom-templates-detail"></a>

### Benutzerdefinierte Vorlagen (Phase 5 - Ausarbeitung)
> **Status:** In Phase 5 als Stichpunkt vorhanden - hier konkretisiert, noch nicht priorisiert. Bei gegebenem Anlass weiter ausarbeiten.

Benutzerdefinierte Vorlagen können viel bedeuten. Sinnvolle Scope-Abgrenzung nach Aufwand und realem Nutzen:

| Ebene | Beschreibung | Aufwand | Empfehlung |
| ----- | ------------ | ------- | ---------- |
| **1 - Kapitel-Auswahl** | Nutzer wählt welche Kapitel erscheinen (Checkboxen), Reihenfolge anpassbar | Gering | ✅ sinnvoll |
| **2 - Layout/Styling** | Eigenes CSS-Theme, Logo, Farben, **Schriftart** (`font-family`), **Hell/Dunkel fest vorgeben oder Auto mit Umschalter**, ggf. **Header-Bild/Logo-URL** - z. B. für Weitergabe an Familie/Hausverwaltung | Mittel | ✅ sinnvoll |
| **3 - Kostenlose Zusatz-Sektionen** | Nutzer definierten eigenes Kapitel mit Markdown-Freitext (Notfallkontakte, WLAN, etc.) - Ergänzung zu `manualContext`, aber strukturierter; optional **pro Profil** (`admin` / `user` / `onboarding`) | Mittel | ✅ sinnvoll |
| **4 - Eigene Daten-Abfragen** | Nutzer definierten welche Zustände/Objekte zusätzlich abgefragt werden, eigene Tabellen | Hoch | ⚠️Grenzwertig |
| **5 - Vollständiger Template-Ersatz** | Nutzer liefert eigene Lenker/Jinja-Vorlage, volle HTML-Kontrolle | Sehr hoch | ❌ Over-Engineering |

**Empfehlung:** Ebene 1 + 3 als Kombination - Kapitel-Auswahl und freie Zusatz-Sektionen. Löst 90% der echten Wünsche ohne Template-Engine. Ebene 4-5 widerspricht dem Kern-Versprechen „automatisch ohne Pflege“.

**Verbindung zur System-Visitenkarte:** [Festlegung](#system-visitenkarte-festlegung) - der **Forum-Button** in der Instanz ist die Hauptlösung. Ebene 1 (Kapitel-Auswahl) kann **zusätzlich** eine kurze „nur System“-HTML liefern, ersetzt aber **nicht** den Ein-Klick-Kopier-Fall fürs Forum.

**Umsetzungsstand (Adapter-Code, laufend erweiterbar):**

- **Ebene 3 (MVP):** JSON `customDocSectionsJson` - Liste `{ title, body[, Profiles] }`, Markdown → **alle drei HTML-Profile** + **Markdown-Export**; Nav-Einträge; KI-Owner-Context nennt die Kapitelüberschriften.
- **Ebene 2 (Teil):** `htmlColorScheme` (auto / hell / dunkel), `htmlHeaderLogoUrl` (https oder `/…`), `htmlFontStack`, `htmlExtraCss` - nur **exportiertes HTML**, nicht Markdown. **0.9.17:** `htmlThemePreset` - feste **Paletten** (default, high contrast, warm, Slate) als CSS-Variablen, ohne dass Nutzer Roh-CSS schreiben müssen (ergänzt, ersetzt nicht `htmlExtraCss`).
- **Ebene 1 (Teil):** `adminHiddenChaptersJson` - Kapitel im **Admin-HTML** ausblenden (und im **Markdown**, wenn Dokumentationsprofil Admin); optional ** `custom` ** für eigenes Markdown-Kapitel. Zusätzlich ** `userHiddenChaptersJson` ** / ** `onboardingHiddenChaptersJson` **; ** `mermaidAuto` ** als eigene Chapter-ID (auto-Topologie, immer versteckt im Onboarding). **0.9.17:** `adminChapterOrderJson` - **Reihenfolge** der **Admin**-Kapitel; **dev:** `userChapterOrderJson` / `onboardingChapterOrderJson` - Reihenfolge **User/Onboarding**-Kapitel (JSON-Liste, Merge mit Default).

**Noch offen (bewusst):** Drag-and-drop, **PDF**, beliebig viele / editierbare **eigene** Presets, Ebene 4-5.

---

### Leitplanken (Merksätze)
- Standard-Nutzung muss **ohne** Extra-Pflege **lohnen**.
- Manuelles ist **opt-in**, begrenzt (Länge/Anzahl), und soll **nicht** bei jedem Export ungültig werden, wenn sich nur die Installation ändert.
- **Gemeinsame Datenbasis** für alle drei Profile, **unterschiedliche Darstellung** (sachlich Admin / alltagsnah User / gästetauglich Onboarding).

---

<a id="architektur-grenzen"></a>

## Architektur - Grenzen, Ist-Zustand und Erweiterungen
> **Hintergrund:** Diskutiert im Dev-Meeting 2026-04-15 und in Folge-Sessions. Hier wird die Architektur **ohne zusätzliche Markdown-Datei** in diesem Projektplan festgehalten.

### Wie Architektur hier „endgültig“ dokumentiert wird
Es gibt **drei Schichten** - alles in **diesem** Abschnitt von `PLAN.md` (bzw. nutzerrelevante Kurzfassungen optional im **README**, nicht als zweite Architektur-Quelle):

| Schicht | Inhalt | Bindung |
| -------- | ------ | ------- |
| **1 - Ist** | Was der Adapter im **Code heute** tut: Ausgabeorte (`/files/`), States-Modus, Hashes, optionaler `exportPath`, Multihost-Verhalten, Admin als Viewer, … | Beschreibung des **tatsächlichen** Verhaltens; bei größeren Code-Änderungen hier **mitziehen**. |
| **3 - Offen** | Was **noch** nicht entschieden ist (z.B. **optionale** spätere Erweiterungen wie HTTP-Asset-Endpunkt). **Medien/MVP**, [System-Visitenkarte](#system-visitenkarte-festlegung) und [KI + Skript](#ki-skript-festlegung) sind **festgelegt** (Umsetzung = Arbeitspakete). | Wird bei Entscheidung in **1** oder **2** überführt und TODO/Release-Notizen angepasst. |
| **3 - Offen** | Was **noch** nicht entschieden ist (z.B. **optionale** spätere Erweiterungen wie HTTP-Asset-Endpunkt). **Medien/MVP**, [System-Visitenkarte](#system-visitenkarte-festlegung) und [KI + Skript](#ki-skript-festlegung) sind **festgelegt** (Umsetzung = Arbeitspakete). | Wird bei Entscheidung in **1** oder **2** überführt und TODO/Release-Notizen angepasst. |

**Reihenfolge im folgenden Text:** zuerst **technischer Kontext** (warum es Grenzen gibt), dann **bereits umgesetzte** Architekturteile, dann **Richtlinien** für noch nicht gebaute Teile, zuletzt **explizit offene Fragen**.

### Ausgangsproblem: ioBroker-Abhängigkeit
Alles wurde von AutoDoc generiert, landet in `/files/autodoc.0/` - ioBrokers **virtueller Dateischicht**. Der Zugriff darauf setzt einen laufenden ioBroker voraus (Web-Adapter oder Admin-UI). Fällt ioBroker aus, ist die Dokumentation nicht mehr erreichbar.

Zusätzliche Dimension: **Nicht jeder Nutzer hat einen Web-Adapter** installiert - und das ist bewusst so, denn nicht jeder braucht einen. Mail/Benachrichtigung ist ebenfalls kein universelles Fallback (nicht jeder hat es integriert oder möchte es nutzen).

### Wie ioBroker Dateien intern speichert
| Backend | `writeFileAsync()` schreibt nach... | Binärdaten (Bilder) |
| **jsonl** (Standard) | `iobroker-data/files/` als echte OS-Dateien auf Disk | ⚠️ Disk wächst, jsonl-DB selbst bleibt sauber |
| **jsonl** (Standard) | `iobroker-data/files/` als echte OS-Dateien auf Disk | ⚠️ Disk wächst, jsonl-DB selbst bleibt sauber |
| **Redis** | In Redis als binäre Blobs (RAM/Memory) | ❌ Redis bläht bei Bildern massiv auf |

### Der kleinste gemeinsame Nenner: Admin-UI
Der **ioBroker Admin** (Port 8081) ist die einzige Komponente, die **jede Installation** hat - auch Multihost-Raspberry-Pi-Setups ohne Web-Adapter, ohne VIS, ohne NAS. Der Admin:

- Kann Dateien aus `/files/` anzeigen (eingebaut, kein Web-Adapter nötig)
- Kann HTML inline rendern (Datei-Browser)
- Läuft auf praktisch jedem Host

**Konsequenz:** `/files/autodoc.0/` bleibt der primäre Ausgabeort. Admin ist der universelle Viewer. Der Web-Adapter ist optional, kein Pflichtbestandteil.

### Problem: Bilder und DB-Bloat
Wenn Bilder (Grundrisse, Topologie-Skizzen, Screenshots) in `/files/autodoc.0/` gespeichert werden:

- **jsonl-Backend:** Disk wächst, aber jsonl-DB bleibt selbst sauber - vertretbar bei kleinen Dateien
- **Redis-Backend:** Bilder im RAM/Speicher → inakzeptabel bei echten Fotos oder mehreren Assets

### Saubere Trennung (Lösungsrichtung)
```
/files/autodoc.0/           ← ioBroker-Datenbank (virtual filesystem)
  ├── admin.html             → immer überschrieben bei Regenerierung
  ├── user.html              → immer überschrieben
  ├── onboarding.html        → immer überschrieben
  └── doc.json               → immer überschrieben
                             → KEIN Anwachsen, nur Latest-Stand

Realer Dateisystem-Pfad:    ← AUSSERHALB der ioBroker-Datenbank (opt-in)
  iobroker-data/autodoc-export/
  ├── smarthome.html         → portable, selbst-enthaltende HTML-Kopie
  └── assets/
      └── grundriss.svg      → User-Assets, NICHT in jsonl/redis
```

**Generierter Inhalt** → immer in `/files/`, immer überschrieben, keine Akkumulation, kein Bloat.

**User-Assets (Bilder)** → große Binärdateien **nicht** in der virtuellen Dateischicht ablegen; siehe **[Medien - festgelegte Arbeitsweise](#architektur-medien-mvp)** unten.

<a id="doppelte-ablage-states"></a>

### Doppelte Ablage: Staaten `documentation.*` vs. `/files/`
Historisches **Problem:** Große Dokumentationsinhalte lagen parallel in **States** und unter ** `/files/` ** - doppelte Nutzlast (u.a. Redis).

**Umsetzung (Stand Code):** Kanonische Dateien unter ** `/files/` **. Ab **0.9.39** gibt es ** `documentationStatesMode` nicht mehr**: große `documentation.*`-States sind **immer** kurze Platzhalter; Volltext nur in ** `/files/` ** (und optional ** `exportPath` **). Download-Aktionen lesen aus Dateien (`autodoc-latest.*` …), mit Fallback auf eventuell noch vorhandenen Legacy-State-Inhalt. ** `documentation.exportHashes` ** (SHA-256 hex der „latest“-Export) für Änderungserkennung. Details: [TODO.md - Anhang A](/#/docs/adapterref/iobroker.autodoc/TODO.md#anhang-a-erledigt).

### Optionaler Filesystem-Export (ioBroker-unabhängiger Zugriff)
Ein optionaler, konfigurierbarer **echter Ausgabepfad** ermöglicht den Zugriff auf die Doku auch wenn ioBroker down ist:

- Nutzer konfiguriert z.B. `/mnt/nas/autodoc/`, `D:\Docs\smarthome\` oder einen lokalen Pfad
- AutoDoc schreibt das fertige HTML **zusätzlich** dorthin (kein Ersetzen der ioBroker-Ausgabe)
- Browser öffnet „smarthome.html“ direkt über „file://“ - **kein Webserver nötig**
- Wer einen Webserver hat: Pfad ins Webroot → immer online erreichbar
- Wer keinen hat: Pfad auf NAS, lokaler Disk, USB-Mount - direkt per Browser öffenbar
- Wer es nicht braucht: Feld leer lassen

**Voraussetzung:** HTML sollte für portablen Export wirklich selbstenthaltend sein (kein CDN). **Stand 0.9.x:** QR-Code wird serverseitig per npm-Paket `qrcode` als SVG erzeugt - kein CDN mehr.

### Assets/Bilder: Lösungsoptionen (Vergleich - Festlegung siehe [Medien - festgelegte Arbeitsweise](#architektur-medien-mvp))
| Option | Beschreibung | DB-Bloat | Admin-Zugriff | Offline |
|--------|-------------|----------|--------------|---------|
| **A - Nur externe URLs** | Nutzer referenziert URLs (NAS-HTTP, Cloud, intern) | Null | ✅ wenn erreichbar | ⚠️ nur wenn URL erreichbar |
| **B - SVG/Text in `/files/` ** | Nur textbasierte Grafiken (SVG, Mermaid) in DB; Fotos → externe URL | Minimal (SVG klein) | ✅ über Admin/Web | ✅ SVG immer inline möglich |
| **C - Vermögenswerte außerhalb der DB** | Bilder im realen Dateisystem-Pfad; Adapter wird über eigenen HTTP-Endpunkt bereitgestellt | Null in DB | ✅ Web-Adapter erforderlich | ✅ wenn Pfad erreichbar |
| **D - Inline Base64** | Bilder direkt in HTML eingebettet | N/A (kein File-Store) | ✅ immer | ✅ immer | ❌ Dateigröße ×3-5 bei Fotos |

**Tendenz:** Option B als Basis (SVG/Mermaid-Diagramm in `/files/`, klein und sauber) + Option A für Fotos (externe URLs, kein Storage-Problem). Option D nur für sehr kleine Icons vertretbar.

**Für Redis-Nutzer:** Explizit dokumentieren: nur externe URLs oder SVGs empfohlen - keine Binär-Uploads in `/files/`.

### Verbindliche Leitplanken (Schicht 2 - beschlossen)
Die Regeln sind die **festgelegte folgende Soll-Richtung** für neue Features; Sie **widersprechen nicht** dem bestehenden Code (Schicht 1), [Phase 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5x) (Mermaid gestaffelt, kein Gesamtgraph), [TODO § 1.4](/#/docs/adapterref/iobroker.autodoc/TODO.md#nachzuege) (News bei Default-Wechsel der States) oder dem README - sie **präzisieren** nur, was vorher als Tendenz/Optionen stand.

| Thema | Leitplanke |
| ----- | ----------- |
| **Generierte Artefakte** | Immer unter `/files/autodoc.0/`, pro Lauf überschrieben, **kein** Anwachsen über Versionen. |
| **Optionaler Export** | ** `exportPath` bleibt immer opt-in** (kein Pflichtfeld). Schreibt **zusätzlich** zur `/files/`-Ausgabe; Multihost: Export vom **Master** (bereits Ist). |
| **Portables HTML (`file://` / NAS)** | **Kein CDN** für Kern-Doku; Medien, die offline funktionieren sollen: **inline SVG** (wie QR heute) oder **relative Pfade** zu Assets **im selben Exportordner**. Reine `https://`-Verweise (Logo in Custom-Template, externe Fotos) können offline fehlen - **akzeptiert** oder durch Nutzerwahl vermeidbar. |
| **Bilder** | **B + A:** kleine **SVG**/Textgrafiken im generierten Pfad; **Fotos** über **externe URLs** und/oder Dateien **nur** im **realen Dateisystem** (z.B. neben der exportierten HTML), **nicht** als Redis-lastigen „Upload in `/files/`“. **D** nur für sehr kleine Icons. **C** (eigener Adapter-HTTP für Assets) nur falls sich ein Bedarf abzeichnet - **kein** Standard. |
| **Bilder** | **B + A:** kleine **SVG**/Textgrafiken im generierten Pfad; **Fotos** über **externe URLs** und/oder Dateien **nur** im **realen Dateisystem** (z.B. neben der exportierten HTML), **nicht** als Redis-lastigen „Upload in `/files/`“. **D** nur für sehr kleine Icons. **C** (eigener Adapter-HTTP für Assets) nur falls sich ein Bedarf abzeichnet - **kein** Standard. |
| **Graphen / Meerjungfrau** | Wie Phase 5.x: zuerst **kuratiert**; **Auto** nur **klein** und mit **hartem Knotenlimit**. Für **exportiertes HTML** ohne externe JS-Abhängigkeit: Darstellung **bevorzugt bei der Generierung nach SVG** (oder gleichwertig eingebettet); Markdown-Export kann zunächst **Mermaid-Quelltext** behalten, bis die Pipeline einheitlich ist. |

**Hinweis:** Die öffentliche **Base-URL** für QR/„Link kopieren“ bleibt ein **Online-Szenario**; Wer **offline** eine Kopie braucht, nutzt `exportPath` und die Leitplanken zu selbstenthaltenden/relativen Medien - das sind **zwei gültige Nutzungsmodi**, kein Widerspruch.

### IoBroker-Backup und AutoDoc (Einordnung)
> **Hintergrund:** Nutzer fragen zuverlässig, ob die Doku „mit dem normalen Backup weg ist“. Kurz: **Konfiguration und generierte Dateien in ioBroker** ja - **optionaler Export nach außen** und **externe Inhalte** nur, wenn der Nutzer sie separat absichert.

Ein **Standard-ioBroker-Backup** (entspricht dem, was `iobroker backup` bzw. das **Haupt-„ioBroker-Backup“** in [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup) erzeugt) sichert laut js-controller/backitup-Dokumentation **Objects**, **States** und **Nutzerdateien** (virtuelles Dateisystem, u.a. VIS-Dateien und alles unter dem Datei-Adapter - damit typisch auch ** `/files/autodoc.0/` ** inkl. generierter HTML/MD/JSON).

| Daten | Typisch im Standard-ioBroker-Backup? | Hinweis für AutoDoc |
| ----- | -------------------------------------- | ------------------- |
| Adapter-Objekte inkl. AutoDoc-**Konfiguration** (`native`, Instanz) | ✅ | Einstellungen überstehen Wiederherstellen |
| ** `documentation.exportHashes` ** | ✅ | Status |
| Dateien unter ** `autodoc.0` ** in `/files/` (generierte Exporte) | ✅ | „Latest“-Stand zum Backupzeitpunkt |
| **Optionaler `exportPath` ** (z.B. NAS, `D:\…`, Mount außerhalb `iobroker-data`) | ⚠️ **nur wenn** dieser Ordner **vom gleichen Backup-Job** oder einer **Host-/NAS-Sicherung** erfasst wird | Liegt **nicht automatisch** im reinen ioBroker-Archiv, wenn nur das Standard-Backup gezogen wird |
| **Optionaler `exportPath` ** (z.B. NAS, `D:\…`, Mount außerhalb von `iobroker-data`) | ⚠️ **nur wenn** dieser Ordner **vom gleichen Backup-Job** oder einer **Host-/NAS-Sicherung** erfasst wird | Liegt **nicht automatisch** im reinen ioBroker-Archiv, wenn nur das Standard-Backup gezogen wird |
| **Externe URLs** (Fotos, Wiki, Cloud) nur als **Verweise** in Text/Markdown | Nur der **Link/Text**, nicht die fremde Datei | Inhalte hinter der URL: **eigenes** Backup der Quelle |
| **Historie-/Zeitreihen-DBs** (Influx, SQL, …), **Zigbee-/Coordinator-Dumps**, … | Nur wenn in **backitup** (oder anderem Tool) **extra** aktiviert | Nicht Teil des „minimalen“ ioBroker-Backups |

**Architektur-Folge (Schicht 2):** AutoDoc muss **kein** eigenes Backup-Format finden; die kanonische Doku liegt in ** `/files/` ** und die großen ** `documentation.*`-States** sind **Platzhalter** - das passt zum üblichen ioBroker-Restore. ** `exportPath` ** ist bewusst **zusätzlich** und erfordert bei Bedarf **eine zweite Sicherungsregel** (Ordner mit ins NAS-Backup, rsync, …). Die geplante **Phase-5-Idee „Backup-Anbindung“** (Doku aus einem ioBroker-Backup-Archiv erzeugen, typisch ** `.tar.gz` ** / [ioBroker.backitup](https://github.com/simatec/ioBroker.backitup)) ist ein **anderes** Thema: Offline-Analyse/Migration - **kein Ersatz** für die Nutzer-Strategie „was sicher ich auf dem Host“. Siehe [TODO - Backup / Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung).

<a id="architektur-medien-mvp"></a>

### Medien, Grafiken und externe Daten - festgelegte Arbeitsweise (MVP)
> **Zielbild:** „So gut wie möglich“ innerhalb von ioBroker: **automatischer Kern** aus Objekten/Analyse + **optionale** manuelle Schicht (Texte, Links, kleine Grafiken) - **ohne** die interne DB (v.a. **Redis**) mit Fotos oder riesigen Blobs zu füllen. **Vollständige Topologie/externe Lebenswelt** bleibt über **Links** und ggf. **BookStack/Wiki** abgedeckt (wie in der Zukunftsvision) - das ist **kein** Versagen des Adapters, sondern **Scope-Grenze**.

**jsonl vs. Redis - keine Wahl für den Adapter:** Das Setup des Nutzers ist gegeben. AutoDoc **vermeidet Aufblähung** durch: (1) kanonische große Inhalte unter ** `/files/` **, (2) **keine** Volltext-Duplikation in großen ** `documentation.*`-States** (ab **0.9.39**), (3) **keine** Empfehlung, große Binärdateien in `/files/autodoc.0/` abzulegen. **Redis:** hier gilt die Leitplanke **streng**; **jsonl:** technisch toleranter, trotzdem **dieselbe** Nutzer-Empfehlung (einheitliches Verhalten, spätere Umstellung auf Redis ohne Überraschung).

| Bedarf | Festgelegte Lösung (MVP) | Nicht nötig vor Phase 5 / ohne konkreten Bedarf |
| ------ | ------------------------- | ----------------------------------------------- |
| **Fotos, Screenshots, großes PNG/JPEG** | ** `https://`-URLs** in Markdown (`customDocSectionsJson`, `manualContext`, …) auf NAS/Nextcloud/statischen Webspace - **kein** Upload großer Dateien in die ioBroker-Dateischicht. | Eigener Adapter-**HTTP-Endpunkt** für Assets (**Option C**) - **nicht** Standard, nur evaluieren, wenn sich echte Nachfrage zeigt. |
| **Portable Kopie (`file://`, NAS-Ordner)** | Unter ** `exportPath` ** vom Nutzer einen Unterordner (z.B. `assets/`) anlegen, Dateien dort ablegen, in Markdown **relative Pfade** nutzen (sofern vom Renderer unterstützt - sonst weiterhin URLs). | - |
| **Portable Kopie (`file://`, NAS-Ordner)** | Unter ** `exportPath` ** vom Nutzer einen Unterordner (z.B. `assets/`) anlegen, Dateien dort ablegen, in Markdown **relative Pfade** nutzen (sofern vom Renderer unterstützt - sonst weiterhin URLs). | - |
| **Externe Daten / „perfekte“ Gesamtdoku** | **URLs und kurze Zusammenfassungen** im Adapter; Ausführliche externe Doku **verlinken**. | Alles in einem Adapter **ziehen** - **nicht** Ziel. |

**Upload-UI / „wo klickt der Nutzer?“ - Beschlossen:** Es gibt **kein** separates AutoDoc-**Asset-Upload-Tab** in der nächsten Ausbauphase. Ausreichend ist: Konfigurationstextfelder (Markdown) + ** `exportPath` ** + ggf. **Admin-Dateizugriff** auf ** `/files/` ** nur für **kleine** Dateien (z.B. SVG). **Große Fotos** nicht nach `autodoc.0` legen - in README klar machen.

**Größenlimits - beschlossen:** **Kein** hartes technisches Limit im Adapter-Code als nächster Schritt. **Empfehlung** in der Nutzer-Doku: alles, was unter `/files/autodoc.0/` liegt, **deutlich unter ~500KB pro Datei** halten; bei Redis **strenger** (lieber nur URLs). Wenn Missbrauch oder Supportfälle häufen, kann später nachgerüstet werden - **blockiert** keine weitere Arbeit.

**Ehemals offen (Schicht 3) - damit erledigt für die Arbeitsplanung:** eigener HTTP-Handler vs. Subordner → **MVP ohne** zusätzlicher Handler; Upload-UI → **nein**, bis auf bestehende Felder; Größenlimit → **Soft-Empfehlung**, kein Hard-Limit vorerst.

<a id="multihost-plan"></a>

### Multihost - Analysieren & Entscheidungen
In ioBroker-Multihost-Setups (z. B. 2-3 Raspberry Pis):

> **Stand Umsetzung:** Host-Warnung, Host-Verteilung im Admin-HTML, optionaler Filesystem-Export und selbstenthaltendes HTML sind umgesetzt (siehe [TODO.md - Anhang / Multihost](/#/docs/adapterref/iobroker.autodoc/TODO.md#multihost-done)). Historisch (Dev-Meeting 15.04.2026): **Dual-Output** - einmal für den Admin-Zugriff auf `/files/`, einmal optional für direkten Dateisystem-Zugriff (`exportPath`) - genau dieser Ansatz ist aktiv.

#### Was bereits funktioniert (kein Handlungsbedarf)
- `getObjectViewAsync('system', 'host', {})` → liest **alle** Hosts aus der zentralen DB ✅
- `getForeignObjectAsync(host._id)` → enthält vollständige native-Daten (Node.js, OS) für **jeden** Host ✅
- `instance.common.host` → welcher Adapter auf welchem Host läuft, bereits in `rawData` ✅
- `getForeignStateAsync('system.host.{hostId}.*')` → RAM/CPU für alle Hosts ✅
- `host.common.npmVersion` aus zentraler DB → npm-Version für alle Hosts, kein Problem ✅
- `writeFileAsync('autodoc.0', ...)` → geht durch ioBrokers zentrales File-API → landet immer auf Master ✅

#### Wo AutoDoc laufen soll: Master
AutoDoc **muss auf dem Master** laufen. Gründe:

- `execSync('npm -v')` als lokaler Fallback läuft nur auf dem eigenen Host - auf Master sinnvoll, auf Slave irreführend
- Realer Filesystem-Export schreibt auf das lokale Dateisystem - auf Master gewollt, auf Slave nicht
- Der Master ist der primäre Admin-Zugriffspunkt

**Umsetzung:** Log-Warnung, wenn AutoDoc auf einem Host läuft, aber mehrere Hosts im System erkannt werden und der eigene Host nicht der erste/einzige ist. Kein hartes Blockieren - nur informativer Hinweis.

#### Host-Zugehörigkeit in der Dokumentation
**Umgesetzt:** `instance.common.host` wird ausgewertet; im **Admin-Profil** erscheint bei **mehr als einem Host** eine **Host-Distribution** (Karten pro Host mit Instanz-Badges) über der Adapter-Tabelle; bei **Single-Host** bleibt das Layout ohne diesen Block.

**Entscheidung (implementiert):** Gruppierung nach Host statt nur einer zusätzlichen Tabellenspalte - klare Lastverteilung, kein Overhead bei nur einem Host.

```
┌─ Host: raspi-master ──────────────────────────┐
│  admin.0 · javascript.0 · autodoc.0 · ...     │
└───────────────────────────────────────────────┘
┌─ Host: raspi-slave1 ──────────────────────────┐
│  zigbee.0 · hm-rpc.0 · ...                    │
└───────────────────────────────────────────────┘
```

#### Dateisystemexport in Multihost
- AutoDoc läuft auf Master → Export-Pfad auf Master-Filesystem → korrekt
- Empfehlung für Multihost-Nutzer: **NAS-Mount als Export-Pfad** - löst gleichzeitig das ioBroker-Unabhängigkeits-Problem (NAS läuft auch wenn alle Pis down)
- Kein Zwang - wer kein NAS hat, lässt das Feld leer

#### Mermaid-Topologie (Phase 5+)
Automatisch generierter Topologie-Graph aus vorhandenen Daten - inhaltlich tragfähig da alle Daten (welcher Adapter auf welchem Host) bereits vorhanden ist. Zurückgestellt für Phase 5.

```
Master → Slave1 (zigbee.0, hm-rpc.0)
       → Slave2 (sonos.0, unifi.0)
```

### Wann ist die Architektur „komplett genug“, um weiterzumachen?
- **Schicht 2** (Leitplanken) + **Medien-MVP** (Abschnitt oben) sind die **verbindliche** Zielbeschreibung für alles Weitere - es fehlt **kein** weiterer Architektur-Block, bevor an **Phase 5 / 5.x** gearbeitet wird.
- **Phase 5** ist dann **Umsetzung** (PDF, Backup-Archive / Backitup-Anbindung, Rest Custom Templates; **Mermaid-Stufen** ✅) **innerhalb** dieser Leitplanken - nicht „noch mehr Architektur raten“, sondern Features bauen und ggf. README pflegen.
- Ausnahme: **npm-/Repository-Release** ([TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit)) ist **Prozess**, nicht Architektur - kann parallel oder davor liegen, je nach Priorität.

<a id="architektur-nächste-schritte"></a>

### Nächste Schritte (empfohlene Reihenfolge)
1. ~~**Nutzer-Doku (README)** - kurzer Abschnitt **„Medien & Redis“** (Soft-Limits, Fotos pro URL, „Metadaten“; Details in PLAN) - **erledigt**.~~
2. ~~**Festgelegte Features** aus [TODO § 1.5](/#/docs/adapterref/iobroker.autodoc/TODO.md#todo-festlegt-umsetzung): **System-Visitenkarte** und **KI + Skriptquellcode Variante A** - **erledigt** (0.9.12).~~ **Variante B** (Backup-Analyse) bleibt an **Backup-Anbindung** ([TODO - Backitup](/#/docs/adapterref/iobroker.autodoc/TODO.md#backup-backitup-festlegung), [§ 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features)) gekoppelt.
3. **Feature-Reihenfolge (Projekt):** [TODO - abgestimmte Umsetzungsreihenfolge](/#/docs/adapterref/iobroker.autodoc/TODO.md#offene-arbeit) - ~~**5.x.1-5.x.3**~~, ~~**PDF**~~ **0.9.33** ✅, ~~**Phase B Doku-UX**~~ **0.9.48** ✅, **npm** **0,9,48** (Provenienz). **Nächster inhaltlicher Fokus:** **ioBroker.repositories** (**W4001**), dann Phase‑5‑**Rest** (**Backup**/Backitup, optional DnD) - [TODO § 1.2](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features).
4. **Adapter Checker** und **Listen-Updates** bei neuen npm-Versionen ([TODO § 1.1](/#/docs/adapterref/iobroker.autodoc/TODO.md#release-veroeffentlichung)).
5. ~~Optional **Default `documentationStatesMode` ** auf `metadata` **mit** `io-package` news ([TODO § 1.4](/#/docs/adapterref/iobroker.autodoc/TODO.md#nachzuege))~~ - **0.9.38** ✅; **0.9.39** `documentationStatesMode` / `full` vollständig entfernt
6. **Optional später (nicht blockiert):** HTTP-Asset-Endpunkt, harte Limits, eigene Asset-UI - nur bei **realem** Bedarf und dann als **Schicht-2-Erweiterung** im PLAN nachziehen.

---

## Bewusst weggelassen
| Funktion | Grund |
| --------------------------------------------- | ------------------------------------------- |
| Ungefilterte Groß-Graphen (Skript/State ohne Limit) | Bewusst nicht als „Komplett-Graph“; **Mermaid gestaffelt** siehe [Phase 5.x](/#/docs/adapterref/iobroker.autodoc/TODO.md) (kuratiert → klein & auto) |
| Vollständiges Code-Parsing für Abhängigkeiten | Fehleranfälliger, unverhältnismäßiger Aufwand |
| REST-API / Webhooks | Wer JSON hat, kann selbst damit arbeiten |
| Alexa/Google Home-Integration | Kein Bezug zur Dokumentation |
| Analytics/Adapter-Popularität | Kein Dokumentations-Feature |
| Mobile App | Außerhalb des Geltungsbereichs |
| Kollaborative Funktionen | Außerhalb des Geltungsbereichs |

---

## Ausbaustufen Zusammenfassung
| Version | Inhalt | Status | Anmerkung |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------------------------------------------------- |
| **v0.x** | Basis: Adapter-Inventar, Export, Profil, Versionierung | ✅ Haupt | interner Meilenstein |
| **v0.9.x** | RC-Funktionen bis **0.9.48** (Profil, Multihost, KI, Benutzerdefinierte Vorlagenteile, 5.x.1-5.x.3, Phase B Doku-UX) - Details README-Changelog | ✅ `main` (= `dev`) | |
| **v1.x** | Phase 5 - Ruhe (Backup, DnD); optional 5.x.2-Feinschliff, weitere Diagnose-Signale | ⬜ geplant | [TODO § 1.2-1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |
| **v1.x** | Phase 5 - Ruhe (Backup, DnD); optional 5.x.2-Feinschliff, weitere Diagnose-Signale | ⬜ geplant | [TODO § 1.2-1.3](/#/docs/adapterref/iobroker.autodoc/TODO.md#phase-5-features) |