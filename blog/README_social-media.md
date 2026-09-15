# Social Media für ioBroker

Arbeitsgrundlage für die Kanäle Facebook, Instagram, Forum und Discord.
Teil 1 ist die Kampagne zum Start der neuen Website, Teil 2 der laufende Betrieb:
Monatsrückblick, Adapter-News, Doku-Tipps.

Alle Texte stehen in Deutsch und Englisch, jeweils fertig zum Kopieren.
Platzhalter sind in geschweiften Klammern: `{{URL}}`, `{{Datum}}`, `{{Zahl}}`.

---

## 0. Die Regeln, die für alles gelten

**Ton.** Im Blog und im Forum duzt ioBroker seine Nutzer, auf der Website siezt es
sie. Social Media gehört zur Community, also **duzen**. Kein Werbedeutsch, keine
Ausrufezeichenketten: erzählen, was es gibt, und wofür es gut ist.

**Schreibweise.** Immer `ioBroker`, auch am Satzanfang. Adapternamen klein und so,
wie sie im Repository heißen: `javascript`, `node-red`, `vis-2`.

**Länge.** Facebook 3 bis 5 Sätze, Instagram 2 bis 4 Sätze plus Hashtags, Discord
2 Sätze plus Link, Forum darf ausführlich sein.

**Jeder Beitrag hat genau eine Aufgabe.** Ein Link, eine Aussage, eine Frage am
Ende. Wer drei Dinge gleichzeitig ankündigt, bekommt zu keinem davon eine Reaktion.

**Bilder.** Dunkler Grund im Kit-Blau, Überschrift in Audiowide, Wortmarke unten
rechts, sonst nichts. Formate:

| Kanal | Format | Größe |
| --- | --- | --- |
| Instagram, Beitrag | 4:5 | 1080 × 1350 |
| Instagram, Story | 9:16 | 1080 × 1920 |
| Facebook | 1,91:1 | 1200 × 630 |
| Forum, Discord | 1,91:1 | 1200 × 630 |

**Die Bilder entstehen mit einer Vorlage.** In `blog/social/` liegt
`social_templates.py`; es setzt Kennzeile, Überschrift, Unterzeile, Adresse und
Wortmarke auf den dunklen Grund der Website:

```bash
cd blog/social
python3 social_templates.py \
    --format ig \
    --label "monatsrueckblick" \
    --title "72 neue Adapter im August" \
    --sub "Alles zum Nachlesen im Blog" \
    --out ../images/social/2026_09_monatsrueckblick.webp
```

`--format` ist `fb`, `ig` oder `story`. Mit `--image logo.png` kommt ein Bild
dazu, etwa das Logo eines Adapters, mit `--claim` steht der Claim unter der
Wortmarke, mit `--url ""` bleibt die Adresse weg. Die Schriften holt das Skript
aus `engine-2/front-end/public`, gebraucht wird `pillow` und `numpy`.

**Keine Personenfotos ohne Einwilligung.** Gilt seit der Arbeit an der
Projektgeschichte für alles, was veröffentlicht wird. Screenshots ohne Namen,
ohne UUID, ohne Zugangsdaten.

**Hashtags.** Fünf bis acht, nicht mehr. Feste Basis, dazu zwei zum Thema.

* Deutsch: `#ioBroker #SmartHome #Hausautomation #OpenSource #IoT`
* Englisch: `#ioBroker #SmartHome #HomeAutomation #OpenSource #IoT`
* Thema je nach Beitrag: `#Blockly` `#NodeRED` `#Zigbee` `#Matter` `#Energiemonitoring`

**Beste Zeiten.** Werktags 18 bis 20 Uhr, sonntags vormittags. Nicht freitags
nachmittags, da liest niemand mit.

---

## 1. Der Start der neuen Website

Sechs Beiträge über zwei Wochen. Ein einziger großer Beitrag verpufft, eine Reihe
kleiner erzählt eine Geschichte und gibt den Leuten sechs Gelegenheiten,
vorbeizuschauen.

| Tag | Beitrag | Kanäle |
| --- | --- | --- |
| T minus 3 | Teaser | Instagram Story, Discord |
| T | Die neue Seite ist da | alle |
| T plus 2 | Die Doku und die Suche | Facebook, Instagram, Forum |
| T plus 5 | Die Adapterseiten | Facebook, Instagram |
| T plus 8 | Blog und Monatsrückblick | Facebook, Discord |
| T plus 12 | Rückmeldungen einsammeln | Forum, Discord |

### T minus 3: Teaser

**Deutsch**

> Seit Monaten arbeiten wir an etwas, das die meisten von euch täglich benutzen
> werden, ohne darüber nachzudenken. Donnerstag zeigen wir es.

**Englisch**

> We have been working on something most of you will use every day without
> thinking about it. Thursday we will show you.

*Bild:* ein Ausschnitt der neuen Startseite, unscharf oder nur ein Viertel
sichtbar. Als Story mit Countdown.

### T: Die neue Seite ist da

**Facebook, Deutsch**

> Die neue ioBroker-Website ist online.
>
> Neu sind eine Dokumentation, die man auch lesen kann, wenn man ioBroker noch
> nicht kennt, eine Suche über alle Seiten, Adapter und Blogbeiträge, und
> Adapterseiten mit allem, was zum Adapter gehört: Beschreibung, Bewertungen,
> Statistik, Verlauf.
>
> Schaut euch um und sagt uns, was fehlt: {{URL}}

**Facebook, Englisch**

> The new ioBroker website is live.
>
> It brings documentation you can read before you know ioBroker, a search across
> all pages, adapters and blog posts, and adapter pages with everything in one
> place: description, ratings, statistics, history.
>
> Have a look around and tell us what is missing: {{URL}}

**Instagram, Deutsch**

> Neue Website, neue Doku, neue Suche. Ab heute unter {{URL}}
>
> Erzählt uns in den Kommentaren, was ihr als Erstes nachgeschlagen habt.
>
> #ioBroker #SmartHome #Hausautomation #OpenSource #IoT

**Discord**

> Die neue Website ist online: {{URL}}
> Fehler, Lücken und Wünsche bitte hier in den Thread, wir sammeln.

**Forum, Beitragstitel:** *Die neue ioBroker-Website ist online*

> Nach einigen Monaten Arbeit ist die neue Website erreichbar: {{URL}}
>
> Was sich geändert hat:
>
> * **Dokumentation.** Neu geschrieben, mit Einstiegskapiteln, Tutorials und
>   Zeichnungen statt Textwüsten.
> * **Suche.** Über Doku, Adapter und Blog hinweg, mit Treffern im Text.
> * **Adapterseiten.** Beschreibung, Bewertungen, Statistik und Verlauf auf einer
>   Seite.
> * **Blog.** Alle Monatsrückblicke an einem Ort.
>
> Die alten Adressen leiten weiter, Lesezeichen bleiben gültig.
>
> Wir sind noch nicht fertig, und genau deshalb dieser Beitrag: schreibt, was
> fehlt, was ihr nicht findet und was auf eurem Telefon schlecht aussieht.

*Bild:* die Startseite auf einem großen und einem kleinen Bildschirm
nebeneinander.

### T plus 2: Die Doku und die Suche

**Deutsch**

> Wer früher wissen wollte, was ein Alias ist, hat gesucht, gefragt oder
> aufgegeben. Jetzt steht es in der Doku, mit einer Zeichnung dazu.
>
> Schaut mal: {{URL}}/docs/basics/alias.md

**Englisch**

> Finding out what an alias does used to mean searching, asking, or giving up.
> Now it is in the documentation, with a drawing: {{URL}}/docs/basics/alias.md

*Bild:* die Alias-Zeichnung aus der Doku, sie funktioniert für sich allein.

### T plus 5: Die Adapterseiten

**Deutsch**

> Rund 800 Adapter, und für jeden eine Seite: was er macht, wie andere ihn
> bewerten, wie viele ihn benutzen, was sich zuletzt geändert hat.
>
> Sucht euren Lieblingsadapter und schaut, wie er dasteht: {{URL}}/adapters

**Englisch**

> Around 800 adapters, each with its own page: what it does, how others rate it,
> how many people run it, what changed last.
>
> Look up your favourite: {{URL}}/adapters

*Bild:* die Adapterseite eines bekannten Adapters, etwa `zigbee` oder `shelly`.

### T plus 8: Blog und Monatsrückblick

**Deutsch**

> Jeden Monat schreiben wir auf, was im Projekt passiert ist: neue Adapter,
> Kern-Updates, Fundstücke aus dem Forum. Alle Ausgaben stehen jetzt an einem
> Ort: {{URL}}/blog

**Englisch**

> Every month we write down what happened in the project: new adapters, core
> updates, finds from the forum. All issues in one place: {{URL}}/blog

### T plus 12: Rückmeldungen einsammeln

**Forum und Discord**

> Zwei Wochen neue Website. Was fehlt euch noch, was findet ihr nicht, wo hakt
> es auf dem Telefon? Alles in diesen Thread, wir arbeiten die Liste ab.

---

## 2. Der laufende Betrieb

Fünf Formate, die sich wiederholen. Mehr braucht es nicht, und weniger wäre zu
wenig, um im Gedächtnis zu bleiben.

| Format | Wie oft | Kanäle | Aufhänger |
| --- | --- | --- | --- |
| Monatsrückblick | 1× im Monat | alle | der Blogbeitrag |
| Neuer Adapter | 2× im Monat | Facebook, Instagram | Aufnahme ins stable-Repository |
| Doku-Tipp | 1× im Monat | Facebook, Instagram | eine Seite, die Fragen erspart |
| Release-News | bei Bedarf | Forum, Discord | js-controller, Admin, große Adapter |
| Frage an die Community | 1× im Monat | Instagram, Discord | Umfrage oder offene Frage |

### Monatsraster

| Woche | Beitrag |
| --- | --- |
| 1 | Monatsrückblick, sobald der Blogbeitrag steht |
| 2 | Neuer Adapter |
| 3 | Doku-Tipp |
| 4 | Frage an die Community, dazu neuer Adapter |

Release-News kommen dazwischen, wenn es etwas zu melden gibt. Wichtig: nie am
selben Tag wie der Monatsrückblick.

---

## 3. Vorlagen

### Monatsrückblick

**Deutsch**

> **Monatsrückblick {{Monat}}**
>
> {{Zahl}} neue Adapter, davon {{Zahl}} im stable-Repository. Schwerpunkt diesmal:
> {{Thema}}. Dazu {{Kern-Update}} und die üblichen Fundstücke aus dem Forum.
>
> Alles zum Nachlesen: {{Link}}

**Englisch**

> **Monthly review {{month}}**
>
> {{number}} new adapters, {{number}} of them in the stable repository. This
> month's focus: {{topic}}. Plus {{core update}} and the usual finds from the
> forum.
>
> The whole story: {{link}}

*Bild:* das Titelbild des Blogbeitrags, es gibt es ohnehin schon.

### Neuer Adapter

**Deutsch**

> **{{adaptername}}** ist neu im stable-Repository.
>
> {{Ein Satz, was er anbindet.}} {{Ein Satz, für wen er sich lohnt.}}
>
> Zur Adapterseite: {{URL}}/adapters/{{adaptername}}

**Englisch**

> **{{adaptername}}** is new in the stable repository.
>
> {{One sentence: what it connects.}} {{One sentence: who needs it.}}
>
> Adapter page: {{URL}}/adapters/{{adaptername}}

*Bild:* das Logo des Adapters auf dunklem Grund, darunter der Name in Audiowide.

### Doku-Tipp

**Deutsch**

> **Wusstet ihr schon?** {{Ein Satz mit der Erkenntnis.}}
>
> Steht mit Bild und Beispiel in der Doku: {{Link}}

Themen, die sich dafür anbieten und schon geschrieben sind: Alias, Rollen,
Kategorien, der Expertenmodus, die Zugriffsrechte, der Unterschied zwischen dem
jetzigen Wert und dem aufgezeichneten Verlauf.

### Release-News

**Forum und Discord**

> **{{Komponente}} {{Version}}** ist da.
>
> {{Zwei bis drei Zeilen: was neu ist, was Vorsicht braucht.}}
>
> Vor dem Update ein Backup. Rückmeldungen bitte hierher.

### Frage an die Community

**Instagram, Umfrage in der Story**

> Womit automatisiert ihr? Blockly, Regeln, JavaScript oder Node-RED?

Die Antworten sind Material für den nächsten Doku-Tipp und zeigen, welches
Kapitel Arbeit braucht.

---

## 4. Vor dem Posten, jedes Mal

* Schreibweise `ioBroker` geprüft.
* Link angeklickt, führt er wirklich dorthin?
* Zahlen aus der Quelle, nicht aus dem Gedächtnis.
* Bild in der richtigen Größe, Text darauf lesbar, wenn das Bild
  daumennagelgroß ist.
* Alternativtext für das Bild geschrieben.
* Keine Namen, keine UUID, keine Zugangsdaten im Screenshot.
* Englische Fassung fertig, nicht erst später.

---

## 5. Was daraus wird

Nach drei Monaten nachsehen: Welche Formate bringen Reaktionen, welche nicht?
Was in drei Monaten kein einziges Mal getragen hat, wird gestrichen statt
weitergeschleppt. Was trägt, bekommt mehr Platz.

Sinnvoll messbar sind Kommentare und geteilte Beiträge, nicht die Zahl der
Abonnenten. Ein Beitrag, der fünf Leute ins Forum bringt, ist mehr wert als
einer mit dreihundert Daumen.
