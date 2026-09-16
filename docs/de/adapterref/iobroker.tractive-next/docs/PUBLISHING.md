---
chapters: {"pages":{"en/adapterref/iobroker.tractive-next/README.md":{"title":{"en":"ioBroker.tractive-next"},"content":"en/adapterref/iobroker.tractive-next/README.md"},"en/adapterref/iobroker.tractive-next/docs/PUBLISHING.md":{"title":{"en":"Veröffentlichung: Checkliste bis ioBroker Latest"},"content":"en/adapterref/iobroker.tractive-next/docs/PUBLISHING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-next/docs/PUBLISHING.md
title: Veröffentlichung: Checkliste bis ioBroker Latest
hash: FKN7SI9SOBbYIql/aUY26ujg5JyQJoU/pMrQdKn8Ek8=
---
# Veröffentlichung: Checkliste bis ioBroker Latest

Ziel: Andere Nutzer sollen`tractive-next` Im Admin unter **Adapter** finden, installieren und aktualisieren können.

Installation für Endnutzer läuft über:

1. npm-Paket`iobroker.tractive-next`
2. Eintrag im **Latest** -Repository (`ioBroker.repositories` )
3. später optional **Stable** mit freigegebener Versionsnummer

Dieses Dokument spiegelt den Stand des Projekts (0.2.x) gegen die offiziellen Anforderungen wider.

Offizielle Quellen:

- [Veröffentlichen Sie Ihren Adapter](https://iobroker.github.io/dev-docs/getting-started/04-publish-adapter/)
- [ioBroker.repositories README](https://github.com/ioBroker/ioBroker.repositories)
- [Adapterprüfer](https://adapter-check.iobroker.in/)
- [iobroker.dev](https://www.iobroker.dev/)

---

## Ist-Stand (kurz)

| Bereich                                            | Status                                                                                                                        |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Funktionaler Adapter (Auth, Polling, Objekte, Tab) | weitgehend verfügbar                                                                                                          |
| Öffentliches GitHub-Repository                     | erledigt (öffentlich)                                                                                                         |
| npm-Paket                                          | erledigt (`0.2.9` , Eigentümer`bluefox` )                                                                                     |
| GitHub Actions / Release-Pipeline                  | CI inkl. Deploy-Job und Node 22/24                                                                                            |
| Adapter-Checker / ESLint / Tests                   | Fehler bis auf E2000 behoben; nach npm erneut prüfen                                                                          |
| Metadaten (`news` ,`author` , Schlüsselwörter, …)  | erledigt (`nogit` , max. 7 Nachrichten, Übersetzungen)                                                                        |
| Passwort- (`encryptedNative` )                     | erledigt (0.2.2)                                                                                                              |
| Eintrag Neueste/Stabil                             | PR [#6370](https://github.com/ioBroker/ioBroker.repositories/pull/6370) – Checker-Fixes in 0.5.2; nach npm-Publish`RE-CHECK!` |

---

## Phase A – Repo und Basis-Metadaten

- [x] GitHub-Repository **öffentlich** schalten
- [x] Repo-Name bleibt`ioBroker.tractive-next` (großes **B** )
- [x] GitHub **Topics** setzen (`iobroker` ,`tractive` ,`gps` ,`geoposition` ,`pet` ,`tracker` )
- [x] `package.json` Ergänzen:
  - [x] `repository` ,`bugs` , `homepage`
  - [x] `keywords`
  - [x] `author` im Format`Name <email>`
  - [x] sinnvolle Skripte (`lint` ,`test:package` ,`check` (Später veröffentlichen/bereitstellen)
- [x] `io-package.json` Ergänzen:
  - [x] `common.authors` mit E-Mail (kein ungültiges`common.author` )
  - [x] `common.titleLang` (ohne veraltetes`common.title` )
  - [x] `common.news` für Veröffentlichungen (max. 7, alle Sprachen)
  - [x] `common.licenseInformation` (modernes Lizenzformat)
  - [x] `common.readme` /`common.extIcon` (öffentliche Raw-URLs)
  - [x] `common.nogit: true` (Build lokal, kein`build/` im Repo; Schema-Name kleingeschrieben)
  - [x] ggf.`tier`
- [x] README zum Veröffentlichungsniveau:
  - [ ] Englisch bestätigt, Deutsch willkommen
  - [x] Link zur Herstellerseite (Tractive)
  - [ ] Installation über Admin beschreiben
  - [x] `## Changelog` und`## License` in README
  - [x] klarer Hinweis: **inoffizielle API**
- [ ] Datenschutz-/Sicherheitshinweise (Zugangsdaten, Token, Logging)

## Phase B – Sicherheit und Objektqualität

- [x] `password` In`encryptedNative` +`protectedNative`
- [x] Abhängigkeiten:`js-controller >=6.0.11` ,`admin >=7.6.20` , Knoten`>=22`
- [ ] Rollen prüfen: keine „faulen“ Rollen wie reines`state` , wo vermeidbar
- [ ] `null` -Behandlung und Typwechsel abschließend absichern
- [ ] Kompaktmodus testen (Start / Lauf / Stopp ohne hängenden Timer)
- [ ] Admin-Tab unter aktuellem Admin (7.x) stabil verifizieren

## Phase C – Qualitätssicherung (Pflicht für Latest)

- [ ] Adapter an Creator-/Template-Standard annähern (`npx @iobroker/create-adapter` als Referenz)
- [x] ESLint einrichten und grün fahren
- [x] GitHub Actions:
  - [x] Paket-/Adaptertests
  - [x] Integrationstests (Skript vorhanden)
  - [x] `test-and-release` Workflow inkl. Deploy-Job (Tag`v*` )
- [ ] Release-Script (`@alcalzone/release-script` /`@iobroker/adapter-dev` )
- [ ] <https://adapter-check.iobroker.in/> bzw.`npx @iobroker/repochecker` nach npm-Publish erneut (E2000 sollte weg sein)
- [x] behebbar Checker-Fehler aus 0.2.7/0.2.9-Lauf adressiert

## Phase D – npm

- [x] npm-Account anlegen (2FA empfohlen/pflichtig für Publish)
- [x] Erstveröffentlichung manuell:`npm publish --access public` (`0.2.9` )
- [x] Eigentümer hinzufügen (ioBroker-Anforderung):
  - `npm owner add bluefox iobroker.tractive-next` (angenommen:`bluefox` +`fraese_73` )
- [x] Trusted Publishing auf npmjs.com eingerichtet
- [x] CI Deploy-Job bereit (`id-token: write` , Knoten 24, kein`npm-token` )
- [x] Paketinhalt geprüft (`npm pack --dry-run` :`build/` ,`admin/` ,`io-package.json` , README, LIZENZ)

### Erstpublish (manuell, einmalig)

Trusted Publishing greift erst, wenn das Paket auf npm existiert. Der erste Publish läuft deshalb lokal:

```bash
cd ~/Documents/Coding/ioBroker.tractive-next
npm login                 # Browser/OTP
npm run build
npm publish --access public
npm owner add bluefox iobroker.tractive-next
npm view iobroker.tractive-next version
```

### Trusted Publishing (für künftige`v*` -Tags)

1. <https://www.npmjs.com/package/iobroker.tractive-next> → **Einstellungen** → **Veröffentlichungszugriff**
2. Trusted Publisher / GitHub Actions hinzufügen:
   - Repository-Inhaber:`Fraese73`
   - Repository-Name:`ioBroker.tractive-next`
   - Workflow-Dateiname:`test-and-release.yml` (exakt, Groß-/Kleinschreibung beachten)
   - Umwelt: leer lassen
3. Speichern
4. Ab dann: Version erhöhen → committen → Tag`vX.Y.Z` pushen → Deploy-Job veröffentlicht automatisch

Offizielle Doku: <https://docs.npmjs.com/trusted-publishers/>\
&#x20;ioBroker-Hinweis: Deploy mit Node.js 24 (bereits so konfiguriert).

### Optional: GitHub-Veröffentlichung

Nach erfolgreichem npm-Publish für 0.2.9:

```bash
gh release create v0.2.9 --title "0.2.9" --notes "Adapter-checker fixes: nogit, news translations, deploy Node 24."
```

## Phase E – Neuestes Repository

Voraussetzungen: öffentliches Repo ✅, npm-Paket ✅, Besitzer`bluefox` ✅, Checker ohne kritische Fehler, CI grün.

### Über iobroker.dev (empfohlen)

1. <https://www.iobroker.dev/> mit GitHub-Account`Fraese73` anmelden
2. Adapter`tractive-next` sollte gelistet sein
3. **ZUM AKTUELLEN hinzufügen** auslösen (öffnet/erstellt PR an`ioBroker.repositories` )
4. PR-Checks und Review abwarten; bei Nachfragen im PR antworten
5. Nach Merge: im eigenen ioBroker unter Adapter-Repos **Latest** aktivieren und`tractive-next` installieren

### Manuell (Alternative)

PR an <https://github.com/ioBroker/ioBroker.repositories> mit Eintrag in`sources-dist.json` , Typ`geoposition` , Verweis auf GitHub-Repo und npm-Paket.

- [x] Über [iobroker.dev](https://www.iobroker.dev/) → Verwalten → **ZUM NEUESTEN HINZUFÜGEN** ausgelöst\
  &#x20;→ PR: <https://github.com/ioBroker/ioBroker.repositories/pull/6370> (`auto-checked ✔` (Keine Fehler)
- [x] **Objektstruktur-Dump** an PR #6370 angehängt
- [ ] Nach Merge: im eigenen ioBroker **Latest** -Repo aktivieren und Installation testen
- [ ] Forum-Thread im [Tester-Bereich](https://forum.iobroker.net/category/91/tester) anlegen

### Objektstruktur für den Review exportieren

Anleitung: <https://github.com/ioBroker/ioBroker.repochecker/blob/master/OBJECTDUMP.md>

1. Adapter auf dem Pi laufen lassen (verbunden, typische Staaten vorhanden)
2. Admin → Expertenmodus (grünes Gesicht)
3. Objekte →`tractive-next.0` Marke
4. Herunterladen → Standardeinstellungen → **Nur ausgewählte**
5. Wegen Login-Daten: ggf. **Werte von Staaten nicht exportieren** aktivieren (Passwort/Token nicht mit exportieren)
6. Datei (z. B.`tractive-next.0.json` ) an PR #6370 als Kommentar/Anhang hochladen

## Phase F – Stabil (später)

- [ ] Längerer Betrieb im Latest
- [ ] Positives Nutzerfeedback im Forum
- [ ] Feste Version in Stabil eintragen (`addToStable` )
- [ ] Discovery ist nur sinnvoll (bei Cloud-Login lokal begrenzt)

---

## Empfohlene Reihenfolge für dieses Projekt

1. Passwort-Verschlüsselung + Metadaten nachziehen
2. Öffentliches Repository + Themen
3. ESLint + GitHub Actions + Adapter-Checker
4. npm publish + Besitzer ✅ (`bluefox` angenommen)
5. Trusted Publishing auf npmjs.com ✅
6. ZUM AKTUELLEN HINZUFÜGEN über iobroker.dev ✅ (PR/Rezension)
7. Nach Merge: Latest im Admin aktivieren + Forum-Tests → irgendwann Stable

Feature-Arbeit (Aktivität, Live-Tracking, …) kann parallel laufen, sollte die Veröffentlichung aber nicht blockieren, sobald der Adapter stabil und checker-grün ist.

---

## Was Endnutzer danach tun

Im Admin:

1. Adapter-Repository **Latest** (für neuen Adapter nötig)
2. Adapter suchen: **Tractive Next** /`tractive-next`
3. Installieren / aktualisieren Sie wie jeden anderen Adapter

Handbücher`git pull` auf dem Pi ist dann nur noch für Entwickler relevant.