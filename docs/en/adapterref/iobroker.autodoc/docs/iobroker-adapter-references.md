---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
---
# ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)

Sammlung von **offiziellen Links und typischen Stolpersteinen**, sobald ein Adapter **regelkonform** (Checker, npm, ggf. `ioBroker.repositories`) gehalten werden soll. **Ohne** projektspezifische Paketnamen oder Release-Notizen — die gehören in die jeweilige `CONTRIBUTING.md` / `TODO.md`.

**Gedächtnisstützen (Pflicht-Abgleich):** Die Links unten sind **keine Volltext-Kopie**, sondern die **maßgeblichen Quellen**, die bei Adapter-Arbeit (Cursor, Review, Release) **aktiv abgeglichen** werden sollen — damit Checker, **ioBroker.repositories**-Review und Konventionen eingehalten bleiben. Bei Widersprüchen gilt der **aktuelle** Text auf der verlinkten Seite.

## Regelkonform entwickeln — Kernquellen

| Quelle | Link | Wofür |
| ------ | ---- | ----- |
| **ioBroker Developer Portal** | https://www.iobroker.dev | Zentraler Einstieg (u. a. gehosteter Adapter Checker, Ökosystem-Doku) |
| **Adapter Checker** (gehostet) | https://adapter-check.iobroker.in/ | Automatische Regelprüfung vor npm / Listen-PR |
| **Coding Best Practices** | https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices | Offizielle Konventionen für Adapter-Code und Metadaten |
| **Adapter Review Checklist** | https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md | Manuelle Review-Matrix für **ioBroker.repositories**-PRs (Tester, README, `io-package.json`, Runtime) |
| **type-detector** | https://github.com/ioBroker/ioBroker.type-detector | State-Rollen, Gerätetypen, Kanäle — Referenz wenn Objekte/Rollen gesetzt oder geprüft werden |

Vor größeren Änderungen an **`io-package.json`**, **Admin-Konfig**, **`package.json`** (Adapter-Felder), **Runtime** (`main.js`, `lib/`) oder **Release-Workflow**: diese Kernquellen mit dem **gehosteten Checker** und den **aktuellen** Regeltexten abgleichen.

## Weitere offizielle Einstiege

1. **ioBroker AI Developer Guide** — https://github.com/Jey-Cee/iobroker-ai-developer-guide  
2. **Adapter Creator** (Konventionen / Vorlagen) — https://github.com/ioBroker/create-adapter  

## Review-Checkliste — Kurzüberblick (Stichpunkte)

Aus **[REVIEW_CHECKLIST.md](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md)** — bei größeren PRs / vor **repositories**-Einreichung querlesen:

- **Testing:** GitHub Actions aktiv; Paket- und Adapter-Integrationstests grün.  
- **README:** Englische Beschreibung, Changelog, Lizenz; bei Sentry-Nutzung Hinweis oben.  
- **`package.json`:** `adapter-core`; Mindest-**Node.js**-Version auch in README; grob gegen Best Practices fliegen.  
- **`io-package.json`:** `js-controller`-Abhängigkeit; `news`/Namen übersetzt; `native` passt zu Admin (`index_m.html` / `jsonConfig`); Passwörter über `protectedNative` / `encryptedNative`; Web-Settings exakt benannt (`port`, `bind`, `secure`, … — nicht für andere Geräte missbrauchen).  
- **Verzeichnisse:** Widget/`www`/`docs`/`admin` sinnvoll und mit `io-package.json` konsistent.  
- **Adapter-Logik:** Timeouts/Intervalle in `unload` räumen; externe Kommunikation nicht stumpf per `schedule` (Randomisierung bei Scheduled-Adaptern); nur nötige Event-Handler; `strictObjectChecks: false` nur begründet; Objekt-Rollen plausibel; `setObject` vermeiden; `onStateChange`-Ack; Parallelität bei State/Object-Erzeugung; `info.connection` nur wenn Kanal/Objekt definiert.

## State-Rollen / Gerätetypen (`type-detector`)

Wenn der Adapter **Rollen**, **Kanäle** oder **Gerätetypen** setzt oder prüft: **[`@iobroker/type-detector`](https://github.com/ioBroker/ioBroker.type-detector)** als Referenz nutzen (offizielle Rollen-/Typ-Liste, nicht frei erfinden). Für reine Doku-/Utility-Adapter oft weniger relevant — trotzdem bei `common.role` / `setState`-Mustern im Blick behalten.

## Typische Adapter-Checker-Themen (Kurz)

- **W4001** („nicht in repositories"): **normal**, bis der Adapter **tatsächlich** in **`sources-dist.json`** steht. Ein einmal gemergter latest-PR reicht nicht, wenn der Eintrag später wieder fehlt — dann behandelt der Checker den Adapter oft als **neu** und **stuft** Warnings/Suggestions zu **Errors** hoch (`isNewAdapter` / `--strict`).
- **E4052:** GitHub-**noreply**-Adressen (`…@users.noreply.github.com`) sind in Author/Copyright **unzulässig** — echte erreichbare Mail.
- **E6034 / W6034:** README-Abschnitt **`## License`** braucht **Volltext** oder einen Markdown-Link auf **`LICENSE`**; **`## License`** soll die **letzte** `##`-Überschrift sein (**W6021**).
- **E2008 / S2008 (npm Provenance):** `latest` auf npm soll mit **Trusted Publishing** (GitHub Actions OIDC) signiert sein. Ein Publish vom Arbeitsplatz erzeugt in der Regel **keine** Attestations — nächste Version über den **deploy**-Job.
- **E2004** (`common.news`): nur **Versionen eintragen, die auf npm existieren**; ältere Git-only-Versionen nicht in `news` lassen.
- **E2001**: für die zentrale Liste wird **Maintainer „bluefox"** als npm-Owner erwartet — `npm owner add bluefox <dein-paketname>` (Befehl aus Checker-Doku / Meldung prüfen).
- **E3009 / fehlende Eltern-Objekte**: jeder State braucht ein Eltern-Objekt (`type: "channel"` oder `"device"`). Fehlen diese, meldet der Objekt-Checker beim `ioBroker.repositories`-Review **E3009** — ioBroker selbst läuft trotzdem, der Fehler fällt erst beim formalen Review auf. **Fix:** Channel-Objekte **vor** ihren States in `instanceObjects` (`io-package.json`) eintragen — Channel immer zuerst, dann die States darunter. Referenz-Adapter für das Muster: **telegram**, **backitup**, **dwd**.
- **W5042 / optionale Abhängigkeiten**: manche Pakete (z. B. schwere Browser-Bibliotheken) stehen bewusst unter **`optionalDependencies`**; der lokale Repochecker kann das anders bewerten als der gehostete Checker — **Doppel-Eintrag** unter `dependencies` + `optionalDependencies` vermeiden (oft durch Regeln verboten). **W5042 nicht „fixen“** — für Review dokumentieren (**CONTRIBUTING**). Wenn mehrere optionale Pakete dieselbe Peer-Linie teilen (z. B. **`puppeteer`** + **`@mermaid-js/mermaid-cli`**), **Peer-Ranges vor Merge prüfen** und in der eigenen **`CONTRIBUTING.md`** festhalten — sonst wirkt es wie ungelöste Tech-Debt bei **`ioBroker.repositories`**-Review.
- **W5051 / `adapter.delay()`**: KI-Retries in **`lib/aiEnhancer.js`** nutzen **`this.adapter.delay()`** (über **`delayFn`**). Keine Alias-Namen wie **`sleep`** — der Checker erkennt das sonst als „custom wait“, obwohl es ioBroker-konform ist.

Konkrete Meldungen und Projekt-Workarounds immer im **eigenen** Repo (`CONTRIBUTING.md`) festhalten.

## `@alcalzone/release-script` (häufig bei create-adapter)

- **README-Changelog:** Unter **`## Changelog`** die Überschriftzeile exakt ``### **WORK IN PROGRESS**`` stehen lassen (nicht umbenennen oder „schöner" schreiben — sonst schlägt **`check:changelog`** mit z. B. „changelog placeholder is missing" fehl). Darunter die Work-in-progress-Stichpunkte bis zum nächsten Release. Plugins (**z. B.** `@alcalzone/release-script-plugin-changelog`, **`release-script-plugin-iobroker`**) vergleichen diese Zeile **wortgetreu**.
- **`common.news`:** nur **veröffentlichte** npm-Versionen; max. **7** Einträge üblich (Checker / Listen).
- **Branch:** Viele Setups erlauben `npm run release` nur von **`main`** — auf Entwicklungsbranches ggf. `--branchPattern` (siehe Repo-Doku / `package.json`).
- **Publish:** Wenn das Projekt auf release-script ausgelegt ist, nicht nur nacktes `npm publish`, sondern den dokumentierten Release-Befehl nutzen.

## npm / GitHub (optional)

- **npm:** Account, idealerweise **2FA**; Registry `https://registry.npmjs.org/`.
- **GitHub Actions + npm:** **Trusted Publishing** (OIDC, `id-token: write`) ist der Weg zu **Provenance** (Checker **S2008** / bei neuen Adaptern oft **E2008**). Ein Publish vom Arbeitsplatz **vor** dem Tag überspringt den Deploy-Job oft — dann fehlt die Signatur.

## Übersetzungen / i18n

ioBroker erwartet Übersetzungen in allen 10 Sprachen (en, de, ru, pt, nl, fr, it, es, pl, zh-cn). Workflow:

1. **Basis:** `admin/i18n/en.json` als Quelle pflegen.
2. **Maschinell vorübersetzen:** `npm run translate` (`@iobroker/adapter-dev`) übersetzt via Google Translate alle **fehlenden** Keys in die anderen Sprachen. Wichtig: nur fehlende Keys werden ergänzt — vorhandene (auch englisch-identische) werden übersprungen. Sollen alle neu übersetzt werden: Zieldatei vorher leeren oder `--rebuild` nutzen.
3. **Community-Qualität:** Adapter bei [Weblate (weblate.iobroker.net)](https://weblate.iobroker.net) anmelden — dazu Issue in [ioBrokerTranslator/requests](https://github.com/ioBrokerTranslator/requests) erstellen. Voraussetzung: `npm run translate all` laufen lassen und committen, dann GitHub Webhook konfigurieren (Payload URL `https://weblate.iobroker.net/hooks/github/`). Weblate schickt danach automatisch PRs für Übersetzungsverbesserungen.
- **E5606** (identische Übersetzungen): tritt auf wenn Sprachen englische Fallbacks enthalten — `npm run translate` nach dem Leeren der Dateien behebt das.
- **de / fr** (oder andere manuell gepflegte Sprachen): bleiben bei `npm run translate` unverändert, wenn bereits alle Keys vorhanden sind.

## `ioBroker.repositories`

PR auf **`sources-dist.json`** ist der Schritt für Sichtbarkeit in den **Standard-Adapterlisten** — **unabhängig** vom npm-Tarball. Zeitpunkt und Branch-Policy im jeweiligen Projekt abstimmen.

Beim Review wird ein **Objekt-Dump** (`adaptername.0.json`) als **Datei-Anhang** am PR erwartet (nicht als Kommentar-Paste — der Bot verarbeitet nur echte Anhänge). Anleitung: https://github.com/ioBroker/ioBroker.repochecker/blob/master/OBJECTDUMP_de.md

---

*Kopierbar in andere Adapter-Repos; Projektdetails (Paketname, Checker-Ausnahmen, Branch-Workflow) dort ergänzen.*