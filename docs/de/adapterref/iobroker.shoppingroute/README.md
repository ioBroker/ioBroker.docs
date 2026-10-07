---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shoppingroute/README.md
title: ShoppingRoute für ioBroker
hash: NW15kAOFLwVZi4V0z/wE/nlEoAtd8TDfUGvDd+4xFpU=
---
# ShoppingRoute für ioBroker

<p align="center">
  <img src="admin/shoppingroute.png" alt="ShoppingRoute" width="160">
</p>

<p align="center">
  <strong>Smart Alexa shopping lists — sorted by store, product group and your real walking route.</strong>
</p>

<p align="center">
  <img src="http://iobroker.live/badges/shoppingroute-installed.svg" alt="ioBroker installations">
  <img src="http://iobroker.live/badges/shoppingroute-stable.svg" alt="ioBroker stable installations">
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/v/iobroker.shoppingroute.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/iobroker.shoppingroute"><img src="https://img.shields.io/npm/dm/iobroker.shoppingroute.svg" alt="npm downloads"></a>
  <a href="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml"><img src="https://github.com/RaviniZib/ioBroker.shoppingroute/actions/workflows/test-and-release.yml/badge.svg" alt="Test and Release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
</p>

> **Aktuelle Version: 0.5.1** ShoppingRoute ist im **neuesten** ioBroker-Repository verfügbar.

## Was ShoppingRoute tut

ShoppingRoute verwandelt Ihre Alexa-Einkaufsliste in einen praktischen Einkaufsassistenten. **Alle Geschäfte können eine gemeinsame Alexa-Liste nutzen, oder Sie verteilen Ihre Einkäufe gezielt auf mehrere Listen.** Das Hauptmerkmal ist die konfigurierbare **Marktroute** : Für jedes Geschäft legen Sie Ihre individuelle Reihenfolge durch die Abteilungen fest. ShoppingRoute passt die Liste dann an Ihre tatsächlichen Wege im Geschäft an – so vermeiden Sie unnötiges Hin- und Herlaufen und können **schneller und effizienter einkaufen** .

Anstatt Artikel nur in der Reihenfolge zu speichern, in der Alexa sie empfangen hat, kann der Adapter sie Geschäften, Produktgruppen und einer konfigurierbaren Laufroute innerhalb jedes Geschäfts zuordnen. Er verwendet sichtbare zweistellige Präfixe wie z. B. `20> Bananas` und optionale Marktüberschriften wie z. B. `40> ═════ ALDI ═════` Die

Das bedeutet, dass eine Liste automatisch etwa so aussehen kann:

```text
10> Apples
20> Bananas
30> Bread
40> ═════ ALDI ═════
50> Milk
60> Cheese
70> Coffee
```

Verwaltete Alexa-Listen müssen in der Alexa-App auf **A–Z** eingestellt sein. ShoppingRoute steuert dann die effektive Reihenfolge über seine Präfixe.

ShoppingRoute nutzt die lokale Authentifizierung des ioBroker **Alexa2-** Adapters für direkte Artikelaktualisierungen, Löschungen und die Erstellung von Stapelverarbeitungen. Alexa2-Listenstatus bleiben der externe Änderungsauslöser.

**Service-/Herstellerhinweis:** ShoppingRoute ist mit Amazon Alexa-Einkaufslisten kompatibel. Amazon dokumentiert Alexa-Listen als Kundenfunktion des Alexa-Ökosystems. Kunden können über die Alexa-App, die Amazon-App und die Amazon-Website auf Alexa-Einkaufs- und Aufgabenlisten zugreifen. Weitere Informationen finden Sie in der [offiziellen Amazon Alexa-Entwicklerdokumentation](https://www.developer.amazon.com/en-US/docs/alexa/ask-overviews/deprecated-features.html#list-skills-and-alexa-shopping-and-to-do-lists) .

## Dokumentation

Wählen Sie Ihre Sprache:

- 🇬🇧 **Englisch:** [Benutzerhandbuch](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md)
- 🇩🇪 **Deutsch:** [Bedienungsanleitung](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) · [Ausführliche README](/#/docs/adapterref/iobroker.shoppingroute/README_DE.md)

Gemeinschaft und Unterstützung:

- 🧪 [ioBroker-Testerforum – ShoppingRoute](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4)
- 🐞 [GitHub-Probleme](https://github.com/RaviniZib/ioBroker.shoppingroute/issues)

Die Adaptereinstellungen und das Backup-Dienstprogramm unterstützen alle 11 Standardsprachen der ioBroker-Administration. Feedback zur Einkaufsliste ist auf Deutsch und Englisch verfügbar.

## Was ist neu in Version 0.5.1?

Diese Version behebt die auf der neuen Verwaltungsseite gemeldeten Probleme beim Speichern und Verschieben von Daten und macht das Einkaufen vom Smartphone aus komfortabler:

- **Erstellen Sie nutzbare Alexa-Listen:** Eine neue Liste wird in Alexa erstellt und bestätigt, bevor ShoppingRoute sie verwendet. Eine ungültige neue Verknüpfung wird abgelehnt, bevor sie sich auf funktionierende Listen auswirken kann.
- **Artikel während des Einkaufs hinzufügen:** Sie können Artikel direkt auf der Einkaufslistenseite hinzufügen, auch zu einer leeren Liste.
- **Bewegen Sie sich zum Ende und zurück:** Spezielle Endablagebereiche, Touch-Ziehgriffe, korrigierte Einfügepositionen und leere Rückmärkte erleichtern die Bewegungen. Verwenden Sie „Andere Märkte als Ablageziele anzeigen“, um zusätzliche Ziele zu sehen.
- **Längere Aktualisierungen verstehen:** Eine sichtbare Meldung erklärt die anstehende Alexa-Aktualisierung sofort. Der Adapter meldet das Endergebnis separat, sodass ein längerer Vorgang nicht fälschlicherweise als sofortiger Fehler interpretiert wird.
- **Änderungen im Katalog bleiben erhalten:** Löschungen, Änderungen der Reihenfolge und Auswahlen auf der Verwaltungsseite werden automatisch gespeichert. Eingaben werden erst nach dem Klicken auf die Schaltfläche **„Speichern“** gespeichert; **mit „Hinzufügen“** wird ein neuer Eintrag erstellt. Gespeicherte Daten bleiben auch nach erneutem Öffnen der Seite erhalten.
- **Unterbrochene Speichervorgänge werden vermieden:** Lokale Katalogspeicherungen führen nicht mehr zu unnötigen Amazon-Prüfungen, und gelernte Katalogdaten verursachen keinen Neustart der Instanz mehr. Schnelle Änderungen werden in eine Warteschlange gestellt, und fehlgeschlagene Speichervorgänge bleiben für einen erneuten Versuch erhalten.
- **Nach einem Alexa-Neuaufbau kann ein Artikel zurückversetzt werden:** Geänderte Amazon-Artikel-IDs lassen sich anhand eines eindeutigen Artikelnamens auflösen. Doppelte Namen werden nicht automatisch erkannt.

Öffnen Sie **ShoppingRoute** in der ioBroker-Seitenleiste auf Ihrem Smartphone. Verwenden Sie die `⋮⋮` Ziehen Sie den Griff per Drag & Drop oder verwenden Sie die Pfeiltasten und die Marktauswahl. Nach dem Update laden Sie die Verwaltungsseite einmal vollständig neu, um die neue Benutzeroberfläche zu laden. Schreibvorgänge in Alexa-Listen unterliegen weiterhin den konfigurierten Ratenbegrenzungen, dem Testlauf und den Verifizierungsmechanismen.

## Hauptmerkmale

- Eine eigene **ShoppingRoute-Verwaltungsseite** in der ioBroker-Seitenleiste für Einkaufslisten, Produkte, Märkte, Produktgruppen, Routen, Listen und Bewertungsartikel
- Katalogänderungen werden zur Laufzeit gespeichert und erfordern keinen Neustart des Adapters.
- Erstellen Sie bestätigte Alexa-Listen und fügen Sie Einkaufsartikel direkt vom Smartphone aus hinzu.
- automatisches Speichern von Strukturänderungen, mit expliziter Speicherfunktion für Textänderungen
- Marktnamen werden immer in **GROSSBUCHSTABEN** gespeichert, unabhängig von der Eingabemethode, wobei alle Verweise einheitlich normalisiert werden.
- Schutz vor versehentlichen Katalog-Resets während Admin-/Update-Vorgängen

### Filial- und routenbasierte Sortierung

- konfigurierbare Speicher und Speicheraliase
- individueller Fußweg zu jedem Geschäft
- Produktgruppen mit unabhängiger Sortierreihenfolge
- bevorzugte und verfügbare Märkte pro Produkt
- globale, börsennotierte und temporäre Prioritätsmärkte
- optionale Marktüberschriften wie z.B. `═════ ALDI ═════`
- optionale marktübergreifende Konsolidierung unter Verwendung eines Mindestwertes
- Explizite Marktanfragen werden niemals in ein anderes Geschäft verschoben.

### Intelligente Produkthandhabung

- Produktkatalog mit Aliasen
- duplikationsresistentes Lernen
- Warteschlange für die Überprüfung unbekannter Produkte
- automatische, Überprüfungs- und Aus-Lernmodi
- Kategorie- und Aliasvorschläge
- Mengenanalyse für Ziffern, Zahlwörter, Packungen, Halbkilo-Ausdrücke und `6x` Formen
- Manuelle Markt- und Positionsüberschreibungen pro Artikel

### Alexa-kompatible Listenaktualisierungen

- inkrementell `00>` –`99>` Präfixsortierung
- Lückenerhaltende Einfügungen, um unnötige Überschreibungen zu vermeiden
- Neuaufbau nur anhand des Suffixes, wenn eine numerische Lücke aufgebraucht ist
- Direkte Amazon-Antworten wurden zur Bestätigung der Vorgänge verwendet.
- Die endgültige Liste der Direkteinstiegslisten wurde zur Überprüfung gelesen.
- Exklusive Transaktionsverarbeitung zur Vermeidung von sich überschneidenden Schreibvorgängen
- Wiederherstellungsprotokoll für unterbrochene Vorgänge
- API-Sicherheitsmodus mit konfigurierbarer Schreibratenbegrenzung
- begrenzte Alexa-Callbacks und Polling mit Backoff

### Administration und Diagnose

- interaktive Ansicht der aktuellen Einkaufsliste
- Drag & Drop und berührungsfreundliche Bedienelemente
- Sortiervorschau vor dem Schreiben
- Statistiken zum lokalen Einkauf
- Konfigurationssicherung und -wiederherstellung
- teilbare Marktroutenprofile
- datenschutzkonformer Diagnose- und Feedbackbericht
- Alexa2/alexa-remote2 Direktsitzungsdiagnose
- Sicherheitsmodus „Trockenlauf“

## Anforderungen

- ioBroker mit **Admin 8 oder neuer**
- **js-controller 7.1.0 oder neuer**
- eine funktionierende ioBroker **Alexa2-** Adapterinstanz
- Die von ShoppingRoute verwaltete Alexa-Einkaufsliste muss in der Alexa-App **alphabetisch** sortiert sein.

## So funktioniert es

1. Alexa2 meldet eine Änderung der Einkaufsliste an ioBroker.
2. ShoppingRoute liest die betroffene Liste und normalisiert die Artikelnamen.
3. Produkte werden mit Aliasnamen, Produktgruppen und Marktzuordnungen abgeglichen.
4. Der Adapter erstellt den besten Markt- und Routenplan.
5. Nur die erforderlichen Listenänderungen werden an Amazon zurückgeschrieben.
6. Die endgültige Liste der Remote-Rechner wird erneut gelesen und überprüft.

Die browserbasierte Admin-Oberfläche empfängt niemals Alexa- oder Amazon-Zugangsdaten.

## Datenschutz und Sicherheit

ShoppingRoute benötigt keine eigene Amazon-Anmeldung. Es nutzt die lokal gespeicherte Alexa2-Sitzung wieder und protokolliert keine Authentifizierungsschlüssel.

Die Statistiken werden lokal gespeichert. Der Feedbackbericht ist datenschutzkonform gestaltet, und mit der Trockenübung können geplante Änderungen überprüft werden, ohne die Einkaufsliste zu verändern.

## Installation

Installieren Sie ShoppingRoute von der ioBroker- **Adapterseite** unter Verwendung des **neuesten** Repositorys.

Nach der Installation:

1. Erstellen Sie eine Instanz von ShoppingRoute,
2. Alexa-Einkaufsliste auswählen/konfigurieren,
3. Märkte und Produktgruppen definieren,
4. Konfigurieren Sie die Laufroute für jedes Geschäft.
5. Die verwaltete Alexa-Liste auf **A–Z** einstellen,
6. Beginnen Sie mit **einem Trockenlauf,** wenn Sie das Ergebnis überprüfen möchten, bevor Sie Schreibvorgänge aktivieren.

Alle Konfigurationsdetails finden Sie im [englischen Benutzerhandbuch](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md) oder im [deutschen Benutzerhandbuch](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) .

## Feedback und Unterstützung

ShoppingRoute ist noch jung, daher ist Feedback aus der Praxis besonders wertvoll.

Bitte nutzen Sie den [ioBroker-Tester-Thread](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4) für allgemeines Feedback zu Tests und den [GitHub-Issue-Tracker](https://github.com/RaviniZib/ioBroker.shoppingroute/issues) für reproduzierbare Fehler oder Funktionsanfragen.

## Changelog

### 0.5.1 (2026-10-07)
- Create new lists in Alexa and verify them before saving their bindings; add shopping items directly, including to empty lists.
- Show immediate, readable progress for Alexa moves, retain optimistic positions while waiting, and track long operations without the previous UI timeout failure.
- Fix end-drop targets, row insertion positions, touch dragging and empty return markets in the shopping list; restore drag ordering for markets, product groups and walking routes.
- Save deletions, ordering and selections immediately on the management page; preserve typed drafts until Save and queue rapid structural changes without a retry loop.
- Keep local saves independent of unnecessary Amazon list checks; persist learned catalogues in runtime data instead of restarting the instance through native-object writes.
- Safely resolve uniquely named items after Amazon replaces their IDs, retaining rejection for ambiguous duplicate names and all write safeguards.
- Provide German and English shopping feedback, a language-aware help button and updated user guides and READMEs.

### 0.5.0 (2026-10-05)
- Add a dedicated ShoppingRoute management page in the ioBroker sidebar with a fixed header and direct management of shopping list, products, markets, product groups, routes, lists and review queue.
- Persist large catalogue data outside normal instance configuration so catalogue edits no longer require an adapter restart.
- Add defensive recovery and regression coverage for the destructive Admin/default reset reported in issue #59, including a successful real-instance reproduction test.
- Normalize every market name to UPPERCASE on create, rename, load and save, and update market references consistently.
- Refine the management UI with a stable sticky header, logo and shaded/zebra list blocks.

### 0.4.4 (2026-09-25)
- (RaviniZib) Use `No Market` for new fallback-market defaults, add all 11 admin languages to the backup utility, and remove six unused translation keys. Existing market names, routes and product data remain unchanged.

### 0.4.3 (2026-09-25)
- (RaviniZib) Route Alexa callback timeouts through ioBroker-managed timers so stalled callbacks stay bounded without plain Node.js `setTimeout()` calls in adapter source.
- (RaviniZib) Keep `common.news` within the seven entries supported by the repository builder.

### 0.4.2 (2026-09-17)
- (RaviniZib) Bound direct Alexa callbacks to 30 seconds so missing callbacks cannot block startup or sorting.
- (RaviniZib) Poll Amazon lists directly with error backoff when Alexa2 events are missing; keep polling scheduled while sorting is busy or disabled.
- (RaviniZib) Retry delayed final verification and preserve concurrent additions for a follow-up sort. Recover completed transactions without discarding additional items; retain safety stops for incomplete writes.
- (RaviniZib) Refresh the checked-in build and add recovery and polling regression tests.

### 0.4.1 (2026-09-12)

- Validates shopping-list responses before rendering or replacing the current view. Incomplete responses show an error and a Reload button instead of crashing on `.map()`.

- Adds a Delete button for each shopping item. Deletes the selected Amazon ID and empty market headers through the exclusive, journaled transaction with direct final verification. Dry Run and the safety stop block deletion.

- Prevents duplicate shopping items from overlapping drag/drop events and concurrent direct writes. Reserves UI/backend operations synchronously and keeps move errors visible after refresh.

- Corrects checker #16 metadata: removes unpublished 0.3.8 from `common.news`, adds the existing npm maintainer email to author/copyright fields, links the MIT license and declares testing ^6.2.1. Local checker: no errors; repository admission remains pending in PR #6434.

- Updates the catalogue and removes accepted review rows in one Admin draft change, avoiding stale accepted rows after saving. Discarding restores the original draft. The reported errors were confirmed fixed by the user.
- Replaces the review queue’s native multi-select with independently clickable market checkboxes and a visible selection summary. Included in 0.4.1; not in the published 0.4.0.

### 0.4.0 (2026-09-12)

**Correction to the original acceptance claim:** The complete review workflow was not fixed. Accepted rows could remain visible in the Admin draft, and market selection still used a native multi-select. The original “end-to-end test” description was incorrect: tests covered editor/helper functions and serialization, not full Admin interaction.

- Persists startup cleanup of previously accepted review rows even without accepting another product.
- Normalizes legacy product-market strings to arrays at startup and preserves market arrays in acceptance functions.
- The additional local UI correction is listed under “0.4.1”; it is not part of the published 0.4.0 package.

### 0.3.9 (2026-09-11)

- Replaces incomplete 0.3.8 snapshots that may have been installed directly from GitHub with an unambiguous newer version.
- Includes the final product-market normalization, review cleanup, single-column shopping-list view, structural header filtering, and orphaned-header removal verified in PR #37.
- No user configuration migration is required; legacy comma/semicolon market values are normalized automatically.

### 0.3.8 (2026-09-11)

- “Available markets” is stored consistently as a multi-select array; legacy comma/semicolon strings remain readable and are migrated to arrays at startup.
- Accepted review entries are removed after saving once the product catalogue has been updated.
- The current shopping list is presented as a clear single-column sequence of market sections.
- Structurally formatted market headings are filtered even when their label is unknown or misspelled (for example `═════ DROGERIEMART ═════`).
- Market headings without associated active items are deleted from the Alexa shopping list during the next sorting run.
- Fixed the review queue so accepting an item updates the article catalogue and visible status immediately in the same Admin draft.
- Legacy market headings such as `— LIDL —` are recognized as headings and can no longer enter the shopping items or review queue.
- Nested internal sort prefixes are stripped recursively from parsing and the Admin shopping-list display.
- Simplified the current shopping-list view by hiding empty market columns while retaining drag, arrow and market-selector controls.
- Updated current ioBroker CI/checker compatibility: testing-action-check v2, Node.js 26 matrix coverage, current @iobroker/testing and bounded common.news history.

### 0.3.7 (2026-09-11)

- Added an interactive current shopping-list view to Admin with drag-and-drop plus touch-friendly arrow/market controls.
- Manual item positions and market moves are persisted locally and take precedence over automatic sorting while that active list item exists.
- Alexa writes are performed by the adapter; the browser receives no Alexa/Amazon credentials, and failed moves reload the confirmed list state.
- Improved responsive Admin layouts for xs/sm screens and added the repository Responsive Design tab width recommendation.
- Review entries now retain an idempotent “Accepted” status after a normal Save instead of falling back to “Pending”.

### 0.3.6 (2026-09-04)

- Cleaned up avoidable repository-checker warnings.
- Made the JSON Config i18n mode explicit and moved all existing translations into the standard language-file structure.
- Removed obsolete prepublish protection and archived older changelog entries.
- No sorting or runtime behavior was changed.

### 0.3.5 (2026-08-17)

- Completed the remaining repository re-review cleanup with an English statistics fallback.
- Aligned release deployment with the regular tested `npm run build` path.
- Removed the obsolete `stable:build` / source-map cleanup path and updated its regression protection.
- No sorting behavior or adapter functionality was changed.

### 0.3.4 (2026-08-14)

- Added Admin 8 compatibility for all custom Admin components and set the minimum Admin version to 8.0.0.
- Improved logging with an optional sort-summary message and made market headings clearer (`═════ MARKET ═════`).
- Fixed the review queue’s “Accept all” action and now process foreign Alexa2 states only when their values are acknowledged.
- Removed obsolete timing/API configuration options and the internal npm version check.
- Removed code obfuscation and obsolete package-preparation paths.
- Completed repository-review compatibility cleanup, including English runtime log/state texts and bounded `maxWritesPerMinute` handling.

### 0.3.3 (2026-08-13)

- New direct `00>`–`99>` prefix sorting for Alexa lists configured to A–Z.
- Added very fast incremental insertion into free numeric gaps; only the affected suffix is rebuilt when a gap is exhausted.
- Direct Amazon responses confirm each operation, followed by one final direct verification of the complete list result.
- Managed Alexa lists must be set to **A–Z** in the Alexa app.

### 0.3.2 (2026-08-11)

- Replaced the former buffered/marker/`updatedDateTime` sorter with one direct `00>`–`99>` prefix architecture for Alexa A–Z lists.
- Added midpoint insertion into existing numeric gaps; if a gap is exhausted, only the smallest necessary suffix is deleted serially and recreated with one batch request.
- Reuses Alexa2 credentials locally without logging secrets or writing Alexa2 item states. Direct Amazon responses confirm each operation and one final direct list read verifies the complete apply.
- Added a simple exclusive `IDLE`/`COLLECTING`/`APPLYING` lifecycle: one new item waits at most five seconds, while a second new item starts the collected run immediately.
- Replaced the old marker transaction with a compact persistent direct-apply journal and a safety stop for incomplete or ambiguous remote results.

### 0.3.1 (2026-08-10)

- Fixed a restart loop in Review learning: repeated identical observations no longer rewrite `reviewItems` solely to refresh `lastSeen`.

### 0.3.0 (2026-08-10)

- Added optional market headings (now formatted as `═════ MARKET ═════`).
- A heading stays active until the last real item for that market is completed and is then deleted completely instead of remaining among completed items.
- Added configurable minimum-items-per-market consolidation for flexible articles.
- Explicit market phrases always remain assigned to the requested market.
- Header management uses Alexa2 states (`#New`, `#delete`) and does not create a second Amazon session; normal shopping items are never automatically deleted or completed.

Older releases: CHANGELOG_OLD.md.

## License

Licensed under the MIT License. See [LICENSE](https://github.com/RaviniZib/ioBroker.shoppingroute/blob/main/LICENSE) for the complete terms.

Copyright (c) 2026 RaviniZib <zib@ravini.org>