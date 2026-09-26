---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md
title: ioBroker-Adapterentwicklung - Referenzen (adapterneutral)
hash: Z+8+5PjXf5OOKg1gwnBEMi6BgcsvYDquF+yC+KKQWEE=
---
# ioBroker-Adapterentwicklung — Referenzen (adapterneutral)

Sammlung von **offiziellen Links und typischen Stolpersteinen** , sobald ein Adapter **regelkonform** (Checker, npm, ggf. `ioBroker.repositories`) gehalten werden soll. **Ohne** projektspezifische Paketnamen oder Release-Notizen — die gehören in die jeweiligen `CONTRIBUTING.md` /`TODO.md` Die

**Gedächtnisstützen (Pflicht-Abgleich):** Die Links unten sind **keine Volltext-Kopie** , sondern die **maßgeblichen Quellen** , die bei Adapter-Arbeit (Cursor, Review, Release) **aktiv abgeglichen** werden sollen – damit Checker, **ioBroker.repositories** -Review und Konventionen eingehalten bleiben. Bei Widersprüchen gilt der **aktuelle** Text auf der verlinkten Seite.

## Regelkonform entwickeln – Kernquellen

| Quelle                            | Link                                                                                      | Wofür                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **ioBroker-Entwicklerportal**     | <https://www.iobroker.dev>                                                                | Zentraler Einstieg (u. a. gehosteter Adapter Checker, Ökosystem-Doku)                                   |
| **Adapterprüfer** (gehostet)      | <https://adapter-check.iobroker.in/>                                                      | Automatische Regelprüfung für npm / Listen-PR                                                           |
| **Bewährte Programmierpraktiken** | <https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices> | Offizielle Konventionen für Adapter-Code und Metadaten                                                  |
| **Checkliste zur Adapterprüfung** | <https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md>       | Manuelle Review-Matrix für **ioBroker.repositories** -PRs (Tester, README, `io-package.json`, Laufzeit) |
| **Typendetektor**                 | <https://github.com/ioBroker/ioBroker.type-detector>                                      | State-Rollen, Gerätetypen, Kanäle – Referenz wenn Objekte/Rollen gesetzt oder geprüft werden            |

Vor größeren Änderungen a&#x6E;** `io-package.json` ** , **Admin-Konfiguration** ,** `package.json` ** (Adapter-Felder), **Laufzeit** (`main.js`, `lib/`) oder **Release-Workflow** : Diese Kernquellen mit dem **gehosteten Checker** und den **aktuellen** Regeltexten abgleichen.

## Weitere offizielle Einstiege

1. **ioBroker AI-Entwicklerhandbuch** — <https://github.com/Jey-Cee/iobroker-ai-developer-guide>
2. **Adapter Creator** (Konventionen / Vorlagen) – <https://github.com/ioBroker/create-adapter>

## Rezensions-Checkliste — Kurzüberblick (Stichpunkte)

Aus **[REVIEW\_CHECKLIST.md](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md)** — bei größeren PRs / vor **repositories** -Einreichung querlesen:

- **Testen:** GitHub Actions aktiv; Paket- und Adapter-Integrationstests grün.
- **README:** Englische Beschreibung, Changelog, Lizenz; bei Sentry-Nutzung Hinweis oben.
- ** `package.json`:** `adapter-core`; Mindest- **Node.js** -Version auch in README; grob gegen Best Practices fliegen.
- ** `io-package.json`:** `js-controller` -Abhängigkeit; `news` /Name übersetzt; `native` pass zu Admin (`index_m.html` /`jsonConfig`); Passwörter über `protectedNative` /`encryptedNative`; Web-Einstellungen exakt benannt (`port`, `bind`, `secure`, … — nicht für andere Geräte missbrauchen).
- **Verzeichnisse:** Widget/`www` /`docs` /`admin` sinnvoll und mit `io-package.json` Konsistenz.
- **Adapter-Logik:** Timeouts/Intervalle in `unload` räumen; externe Kommunikation nicht stumpf per `schedule` (Randomisierung bei Scheduled-Adaptern); nur nötiger Event-Handler; `strictObjectChecks: false` nur begründet; Objekt-Rollen plausibel; `setObject` vermeiden; `onStateChange` -Ack; Parallelität bei State/Object-Erzeugung; `info.connection` nur wenn Kanal/Objekt definiert.

## State-Rollen /legen (`type-detector`)

Wenn der Adapter **Rollen** , **Kanäle** oder **Gerätetypen** setzt oder prüft:**[`@iobroker/type-detector`](https://github.com/ioBroker/ioBroker.type-detector)** als Referenz nutzen (offizielle Rollen-/Typ-Liste, nicht frei erfinden). Für reine Doku-/Utility-Adapter oft weniger relevant – trotzdem bei `common.role` /`setState` -Mustern im Blick behalten.

## Typische Adapter-Checker-Themen (Kurz)

- **W4001** („nicht in repositories“): **normal** , bis der Adapter **tatsächlich** i&#x6E;** `sources-dist.json` ** steht. Ein einmal gemergter Latest-PR reicht nicht, wenn der Eintrag später wieder fehlt — dann behandelt der Checker den Adapter oft als **neu** und **stuft** Warnings/Suggestions zu **Errors** hoch (`isNewAdapter` /`--strict`).
- **E4052:** GitHub- **noreply** -Adressen (`…@users.noreply.github.com`) sind im Autor/Copyright **unzulässig** — echt erreichbare Mail.
- **E6034 / W6034:** README-Abschnit&#x74;** `## License` ** braucht **Volltext** oder einen Markdown-Link au&#x66;** `LICENSE` ** ;** `## License` ** soll die **letzte** `##` -Überschrift sein ( **W6021** ).
- **E2008 / S2008 (npm Provenance):** `latest` Auf npm soll mit **Trusted Publishing** (GitHub Actions OIDC) signiert sein. Ein Publish vom Arbeitsplatz erzeugt in der Regel **keine** Bescheinigungen – nächste Version über den **Deploy** -Job.
- **E2004** (`common.news`): nur **Versionen eintragen, die auf npm existieren** ; Ältere Git-only-Versionen nicht in `news` lassen.
- **E2001** : Für die zentrale Liste wird **Maintainer „bluefox“** als npm-Owner erwartet —`npm owner add bluefox <dein-paketname>` (Befehl aus Checker-Doku / Meldung prüfen).
- **E3009 / fehlende Eltern-Objekte** : Jeder Staat braucht ein Eltern-Objekt (`type: "channel"` Oder `"device"`). Fehlen diese, meldet der Objekt-Checker beim `ioBroker.repositories` -Review **E3009** — ioBroker selbst läuft trotzdem, der Fehler fällt erst beim formalen Review auf. **Fix:** Channel-Objekte **vor** ihren Staaten in `instanceObjects` (`io-package.json`) eintragen — Channel immer zuerst, dann die Staaten darunter. Referenz-Adapter für das Muster: **telegram** , **backitup** , **dwd** .
- **W5042 / optionale Abhängigkeiten** : Manche Pakete (z. B. schwere Browser-Bibliotheken) stehen bewusst unte&#x72;** `optionalDependencies` ** ; Der lokale Repochecker kann das anders bewerten als der gehostete Checker – **Doppel-Eintrag** unter `dependencies` +`optionalDependencies` vermeiden (oft durch Regeln verboten). **W5042 nicht „fixen“** — für Review dokumentieren ( **CONTRIBUTING** ). Wenn mehrere optionale Pakete dieselbe Peer-Linie teilen (z. B.** `puppeteer` ** +** `@mermaid-js/mermaid-cli` ** ), **Peer-Ranges vor Merge prüfen** und in der eigene&#x6E;** `CONTRIBUTING.md` ** festhalten — sonst wirkt es wie ungelöste Tech-Debt be&#x69;** `ioBroker.repositories` ** -Rezension.
- **W5051 /`adapter.delay()` ** : KI-Wiederholungen i&#x6E;** `lib/aiEnhancer.js` ** nutze&#x6E;** `this.adapter.delay()` ** (übe&#x72;** `delayFn` ** Keine Alias-Namen wi&#x65;** `sleep` ** — der Checker erkennt das sonst als „custom wait“, obwohl es ioBroker-konform ist.

Konkrete Meldungen und Projekt-Workarounds immer im **eigenen** Repo (`CONTRIBUTING.md`) festhalten.

## `@alcalzone/release-script` (häufig bei create-adapter)

- **README-Änderungsprotokoll:** Unte&#x72;** `## Changelog` ** die Überschriftzeile exakt `### **WORK IN PROGRESS**` stehen lassen (nicht umbenennen oder „schöner“ schreiben — sonst schläg&#x74;** `check:changelog` ** mit z. B. „Changelog-Platzhalter fehlt“ fehl). Darunter die Work-in-progress-Stichpunkte bis zur nächsten Veröffentlichung. Plugins ( **z. B.** `@alcalzone/release-script-plugin-changelog`,** `release-script-plugin-iobroker` ** ) vergleichen Sie diese Zeile **wortgetreu** .
- ** `common.news`:** nur **veröffentlichte** npm-Versionen; max. **7** Einträge üblich (Checker / Listen).
- **Branche:** Viele Setups erlauben `npm run release` nur vo&#x6E;** `main` ** — auf Entwicklungsbranchen ggf. `--branchPattern` (siehe Repo-Doku /`package.json`).
- **Veröffentlichen:** Wenn das Projekt auf release-script ausgelegt ist, nicht nur nacktes `npm publish`, sondern den dokumentierten Release-Befehl nutzen.

## npm / GitHub (optional)

- **npm:** Konto, idealerweise **2FA** ; Registrierung `https://registry.npmjs.org/` Die
- **GitHub Actions + npm:** **Vertrauenswürdige Veröffentlichung** (OIDC, `id-token: write`) ist der Weg zu **Provenance** (Checker **S2008** / bei neuen Adaptern **of E2008** ). Ein Publish vom Arbeitsplatz **vor** dem Tag überspringt den Deploy-Job oft – dann fehlt die Signatur.

## Übersetzungen / i18n

ioBroker erwartet Übersetzungen in allen 10 Sprachen (en, de, ru, pt, nl, fr, it, es, pl, zh-cn). Arbeitsablauf:

1. **Basis:** `admin/i18n/en.json` als Quelle pflegen.
2. **Maschinell vorübersetzen:** `npm run translate` (`@iobroker/adapter-dev`) übersetzt über Google Translate alle **fehlenden** Schlüssel in die anderen Sprachen. Wichtig: nur fehlende Schlüssel werden ergänzt — diese (auch englisch-identische) werden übersprungen. Sollen alle neu übersetzt werden: Zieldatei vorher leeren oder `--rebuild` nutzen.
3. **Community-Qualität:** Adapter bei [Weblate (weblate.iobroker.net)](https://weblate.iobroker.net) anmelden – dazu Issue in [ioBrokerTranslator/requests](https://github.com/ioBrokerTranslator/requests) erstellen. Voraussetzung: `npm run translate all` laufen lassen und committen, dann GitHub Webhook konfigurieren (Payload URL `https://weblate.iobroker.net/hooks/github/`). Weblate schickt danach automatisch PRs für Übersetzungsverbesserungen.

- **E5606** (identische Übersetzungen): tritt auf, wenn Sprachen englische Fallbacks enthalten —`npm run translate` nach dem Leeren der Dateien behebt das.
- **de / fr** (oder andere manuell gepflegte Sprachen): bleiben bei `npm run translate` unverändert, wenn bereits alle Schlüssel vorhanden sind.

## `ioBroker.repositories`

PR au&#x66;** `sources-dist.json` ** ist der Schritt für Sichtbarkeit in den **Standard-Adapterlisten** – **unabhängig** vom npm-Tarball. Zeitpunkt und Branch-Policy im jeweiligen Projekt abstimmen.

Beim Review wird ein **Objekt-Dump** (`adaptername.0.json`) als **Datei-Anhang** am PR erwartet (nicht als Kommentar-Paste — der Bot verarbeitet nur echte Anhänge). Anleitung: <https://github.com/ioBroker/ioBroker.repochecker/blob/master/OBJECTDUMP_de.md>

---

_Kopierbar in andere Adapter-Repos; Projektdetails (Paketname, Checker-Ausnahmen, Branch-Workflow) dort ergänzen._