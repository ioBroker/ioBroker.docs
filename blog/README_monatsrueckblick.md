# Anleitung: ioBroker Monatsrückblick

Arbeitsanleitung für den wiederkehrenden deutschen Blogbeitrag „ioBroker Monatsrückblick".
Beiträge liegen unter `blog/de/JJJJ_MM_TT.md`, Bilder unter `blog/images/`.

Die genannten Zahlen stammen aus zurückliegenden Ausgaben und dienen nur als Orientierung.

---

## 1. Vorbereitung

```bash
git fetch origin && git log --oneline -1 origin/master
```

Den **vorherigen Beitrag** in `blog/de/` lesen — er gibt Ton, Aufbau und Formulierungen vor.
Sein Erscheinungsdatum (aus dem Dateinamen) ist der **Stichtag** für alle folgenden Vergleiche.

---

## 2. Neue Adapter ermitteln

Maßgeblich ist das **`latest`-Repository**.

> `docs/en/history/history.md` ist **nicht** als Grundlage geeignet. Die Datei wird von Hand
> gepflegt und ist unvollständig — Adapter landen dort meist erst beim Sprung nach `stable`, viele
> gar nicht. Eine Ausgabe, die allein daraus gebaut wurde, hat 40 von 42 neuen Adaptern übersehen.
> Nur als Gegenprobe verwenden.

### 2.1 Achtung: `created` ist irreführend

Die Download-Liste enthält je Adapter ein Feld `created`. Das ist **nicht** das Datum der Aufnahme
ins Repository, sondern das Entstehungsdatum des Pakets. Wer danach filtert, übersieht genau die
etablierten Adapter, die nach Jahren endlich aufgenommen werden — `ioBroker.goodwe` etwa trägt
`created = 2022`, kam aber erst 2026 ins Repository.

### 2.2 Verlässlich: Diff der Repository-Dateien

Neu in **`latest`**:

```bash
STICHTAG=2026-07-10T00:00:00Z
SHA=$(curl -s "https://api.github.com/repos/ioBroker/ioBroker.repositories/commits?path=sources-dist.json&until=$STICHTAG&per_page=1" \
      | python3 -c "import sys,json;print(json.load(sys.stdin)[0]['sha'])")
curl -s "https://raw.githubusercontent.com/ioBroker/ioBroker.repositories/$SHA/sources-dist.json" -o alt.json
curl -s "https://raw.githubusercontent.com/ioBroker/ioBroker.repositories/master/sources-dist.json" -o neu.json
python3 -c "
import json
o=set(json.load(open('alt.json'))); n=set(json.load(open('neu.json')))
print('NEU:', sorted(n-o)); print('ENTFERNT:', sorted(o-n))
"
```

Neu in **`stable`**: identisch, nur mit `sources-dist-stable.json`.
(`sources-dist-latest.json` existiert nicht und liefert 404.)

### 2.3 Metadaten und Relevanz

`https://download.iobroker.net/list.html` enthält die komplette Tabelle als **Inline-JSON** —
kein Browser nötig:

```python
import json
h = open('list.html', encoding='utf-8', errors='replace').read()
i = h.find('"absaar"')          # alphabetisch erster Adapter
s = h.rfind('{', 0, i); d = 0
for k in range(s, len(h)):
    if h[k] == '{': d += 1
    elif h[k] == '}':
        d -= 1
        if d == 0: e = k + 1; break
data = json.loads(h[s:e])
```

Felder: `created`, `versions.latest` / `.stable` / `.latestDate`, `installs`, `desc`, `type`,
`maintainers`, `icon`, `link`. **`installs` ist das beste Relevanzmaß** — danach entscheiden, wer
einen ausführlichen und wer einen kompakten Eintrag bekommt.

### 2.4 Dublettenprüfung — Pflicht

Kein Adapter darf zweimal als „neu" vorgestellt werden:

- Adapter im **`latest`-Abschnitt** dürfen in **keinem** älteren Beitrag vorgekommen sein.
- Adapter im **`stable`-Abschnitt** dürfen früher vorgekommen sein — dann gehören sie in den
  Abschnitt „Alte Bekannte, neu in `stable`".

Jeden Kandidaten gegen alle Dateien in `blog/de/` prüfen und **jeden Treffer im Kontext ansehen**.
Es gibt viele falsche Positive: „Home Assistant" trifft auf `assistant`, `hoymiles-ms` ist ein
anderer Adapter als `hoymiles`, und eine Erwähnung im Forum-Abschnitt ist keine Vorstellung.

---

## 3. Adapterdetails

Für **jeden** Adapter README und `io-package.json` lesen.

Die Logo-URL immer aus dem Feld **`extIcon`** der `io-package.json` nehmen — nicht aus dem
README-Bildpfad. Dateinamen weichen häufig ab: `go-eCharger.png` in CamelCase auf Branch `master`,
`creality_icon.png` obwohl die README `creality.png` verlinkt, `nut2` verweist bewusst auf jsDelivr.
Jede URL vor der Veröffentlichung auf HTTP 200 prüfen.

---

## 4. Kern-Updates

| Komponente | Quelle |
|---|---|
| js-controller | `github.com/ioBroker/ioBroker.js-controller/releases` (CHANGELOG im master kann hinterherhinken) |
| admin | `raw.githubusercontent.com/ioBroker/ioBroker.admin/master/README.md` (Changelog steht in der README) |
| vis-2, javascript, devices, iot | jeweils README bzw. Releases |

**Breaking Changes und Sicherheitsfixes zuerst**, mit ⚠️ markiert — Node-Mindestversion, geänderte
IDs, umbenannte States. Danach die sichtbaren Neuerungen. Reine interne Refactorings weglassen.
Prüfen, ob eine Version nur als Vorabversion auf GitHub steht: Nightlies gehören nicht als
Empfehlung in den Beitrag.

---

## 5. Forum

`https://forum.iobroker.net`, Kategorie 8 sind die Announcements (dort stehen auch die früheren
Blog-Ankündigungen). API: `/api/category/ID`, `/api/topic/ID`.

⚠️ NodeBB liefert für jede gültige Topic-ID HTTP 200, **egal welcher Slug in der URL steht**. Ein
200 belegt also weder Titel noch Beitragszahl — beides über die API prüfen.

Gesucht sind aktive Test-Threads, Warnungen und Probleme sowie größere Community-Projekte. Kein
festes Thema vorgeben, sondern das nehmen, was den Zeitraum geprägt hat.

---

## 6. Aufbau

```markdown
---
Author: Bluefox
title: ioBroker Monatsrückblick – MONATE JAHR
logo: de/blog/images/JJJJ_MM_TT.png
---
```

1. **Intro** — Adapterzahl, Aufteilung latest/stable, Schwerpunkt, ein bis zwei Exoten als
   Aufhänger, dann das wichtigste Kern-Thema
2. **Kern-Updates** — js-controller, Admin, vis-2
3. **Wichtige Adapter-Updates** — javascript, devices, iot …
4. **Neue Adapter in `latest` – Tester gesucht!** — ab etwa 20 Adaptern thematisch gruppieren
   (`###` Gruppe, `####` Adapter, `#####` Unterpunkte)
5. **Neue Adapter in `stable`**
6. **Alte Bekannte, neu in `stable`** — mit Link auf den Beitrag, in dem sie vorgestellt wurden
7. **Forumdiskussionen & spannende Test-Threads**
8. **Community** — Discord, Stammtisch, Entwickler-Meeting, Forum, Facebook
9. **Danke für eure Unterstützung** — Fazit, Update-Hinweise, Spendenlink

### Adapterblock

```markdown
### ioBroker.NAME

<img width="100" height="100" src="EXTICON_URL" />

**Kategorie:** deutsch
**Entwickler:** GitHub-Handle

1–2 Sätze, was der Adapter macht und für wen er interessant ist.

#### Funktionsumfang:
- konkret und technisch, keine Marketing-Floskeln

#### Besonderheiten:
- Voraussetzungen, Einschränkungen, Warnungen

🔗 [GitHub-Seite des Adapters](https://github.com/OWNER/ioBroker.NAME)

---
```

Screenshots: `<img src="de/blog/images/DATEI" width="800" style="border: 1px solid #205895"/>`
YouTube: `[<img src="https://img.youtube.com/vi/ID/hqdefault.jpg" width="600px" />](https://youtu.be/ID)`

### Ton

Deutsch, „ihr"-Ansprache, sachlich und warm, gern eine pointierte Einordnung. Warnungen mit ⚠️.
Fachbegriffe erklären, wo sie nicht selbsterklärend sind.

---

## 7. Titelbild

`blog/images/JJJJ_MM_TT.png`, exakt **2560 × 500**, vollständig deckend (kein Alphakanal-Rest),
dunkles Marineblau um `RGB(2, 20, 53)`. Schrift **Oxanium**: Titel „Monatsrückblick" Gewicht ~560,
Untertitel „Monat / Monat Jahr" ~500, beide auf x = 1280 zentriert. Textposition am besten aus dem
Vorgängerbild übernehmen.

---

## 8. Prüfung vor der Veröffentlichung

```bash
grep -oE 'https://[^ ")<>]+' blog/de/JJJJ_MM_TT.md | sed 's/[.,)]*$//' | sort -u > /tmp/u.txt
while read u; do c=$(curl -sL -o /dev/null -w '%{http_code}' -m 10 "$u"); [ "$c" = 200 ] || echo "FAIL $c $u"; done < /tmp/u.txt
```

- Alle URLs und Logos liefern 200
- Adapterzahlen in Intro, Abschnittseinleitungen und Fazit stimmen überein
- Kein Adapter doppelt vorgestellt
- Klammern und Backticks je Zeile ausgeglichen
- Umlaute in Forum-URLs prozentkodieren, sonst schlägt die Prüfung fehl (im Browser funktioniert es trotzdem)

Bei größeren Umbauten vorher eine Kopie sichern und hinterher die URL-Liste gegen die vorherige
diffen — sie muss identisch sein.

---

## 9. Ankündigung in Forum, Facebook und Co.

Vorlage (Wortlaut der festen Bausteine unverändert übernehmen):

```
Hallo Liebe ioBroker-Community!

Der neue ioBroker-Monatsrückblick für MONAT und MONAT JAHR ist online!

Auch in den vergangenen beiden Monaten hat sich im ioBroker-Ökosystem wieder viel getan.
Neben wichtigen Aktualisierungen für zentrale Komponenten stehen diesmal N neue Adapter aus
den Bereichen A, B und C bereit.

Blog lesen:
https://www.iobroker.net/#de/blog/JJJJ_MM_TT

Wichtige Updates
🔐 Name – ein bis zwei ganze Sätze, was die Neuerung dem Nutzer bringt.
…

Neue Adapter in latest – Tester gesucht!
⚡ ioBroker.name (Bereich / Unterbereich) – ein Satz, was sich damit machen lässt.
…

Ein großes Dankeschön geht an alle Entwicklerinnen und Entwickler, Tester und
Community-Mitglieder, die mit neuen Adaptern, Updates, Fehlerberichten und
Verbesserungsvorschlägen zur Weiterentwicklung von ioBroker beitragen.

Unterstützung für das Open-Source-Projekt:
https://www.paypal.com/donate?campaign_id=MJBDJ9TGBQ7GN

#ioBroker #smarthome #homeautomation #opensource #adapter #iot
```

Stilregeln:

- Jede Zeile beginnt mit einem passenden Emoji.
- **Nutzen statt Technik.** Im Blog stehen Protokolle und Registergruppen, hier steht, was man
  davon hat („Verbrauchsdaten lokal erfassen und in Dashboards darstellen").
- Ganze Sätze, keine Stichpunktfragmente. Keine Versionsnummern in den Adapterzeilen.
- Kategorie immer als „(Bereich / Unterbereich)" hinter dem Adapternamen.
- ⚠️ **Adapternamen exakt so schreiben wie im Repository.** In einer früheren Ausgabe standen
  `ioBroker.parcel`, `ioBroker.alko`, `ioBroker.life360` und `ioBroker.ha-wallpanel` — richtig
  heißen sie `parcelapp`, `al-ko`, `life360ng` und `hassemu`. Unter dem falschen Namen findet
  niemand den Adapter im Katalog.
- Bei sehr vielen Adaptern zusätzlich eine Kurzfassung für Kanäle mit Zeichenlimit anbieten.

---

## Checkliste

- [ ] Vorgängerbeitrag gelesen, Stichtag bestimmt
- [ ] Neu in `latest` über Diff von `sources-dist.json` ermittelt
- [ ] Neu in `stable` über Diff von `sources-dist-stable.json` ermittelt
- [ ] Installationszahlen aus der Download-Liste für die Gewichtung
- [ ] Dublettenprüfung gegen alle älteren Beiträge, Treffer im Kontext bewertet
- [ ] README und `extIcon` für jeden Adapter gelesen
- [ ] Changelogs der Kernkomponenten gelesen, Breaking Changes markiert
- [ ] Forum gescannt, Titel über die API verifiziert
- [ ] Zahlen im Beitrag konsistent
- [ ] Alle URLs und Logos auf 200 geprüft
- [ ] Titelbild vorhanden, Maße und Dateiendung passen zum Frontmatter
