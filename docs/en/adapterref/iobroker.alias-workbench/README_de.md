---
chapters: {"pages":{"en/adapterref/iobroker.alias-workbench/README.md":{"title":{"en":"ioBroker.alias-workbench"},"content":"en/adapterref/iobroker.alias-workbench/README.md"},"en/adapterref/iobroker.alias-workbench/README_de.md":{"title":{"en":"ioBroker.alias-workbench"},"content":"en/adapterref/iobroker.alias-workbench/README_de.md"},"en/adapterref/iobroker.alias-workbench/docs/changes-detailed.md":{"title":{"en":"Changes in detail"},"content":"en/adapterref/iobroker.alias-workbench/docs/changes-detailed.md"},"en/adapterref/iobroker.alias-workbench/docs/aenderungen-ausfuehrlich.md":{"title":{"en":"Änderungen im Einzelnen"},"content":"en/adapterref/iobroker.alias-workbench/docs/aenderungen-ausfuehrlich.md"}}}
---
<img src="admin/alias-workbench.png" width="80" align="right" alt="Symbol">

# ioBroker.alias-workbench

Erstellt komfortabel Aliase — Geräte, die vis, Alexa und der Geräte-Adapter
verstehen. Vorlagen erledigen die Arbeit: mitgeliefert für Homematic und
Tasmota, selbst gebaut für jedes weitere Gerät. Bei Tasmota prüft sie
zusätzlich den Weg zum Gerät: fehlende Sendepunkte, abgeschaltetes `publish`,
verzögerte Rückmeldung.

*(This is the German version. The English one is in [README.md](/#/adapters/alias-workbench).)*

---

## Warum

Ein Alias ist schnell angelegt und sieht danach immer gut aus. Ob er etwas
taugt, entscheidet sich an Dingen, die man **nicht sieht**:

- ob die **Rollen** so gewählt sind, dass der type-detector ein Gerät erkennt
- ob die **Quelle** überhaupt existiert und einen Wert trägt
- ob die **Leseformel** eine Zahl liefert oder `undefined`
- ob der **Schreibweg** funktioniert

Ein Werkzeug, das nur Datenpunkte verknüpft, hilft bei keinem dieser vier
Punkte. Dieser Adapter zeigt alle vier, **während** du baust — nicht Stunden
später im Protokoll.

### Warum ein Admin-Reiter und keine Einstellungsseite

Die Werkbank ist ein **Admin-Reiter** (`adminTab` in `io-package.json`) und läuft
ohne Adapterprozess (`mode: none`). Das ist Absicht: Sie ist ein interaktiver
Editor — links der Objektbaum, rechts der Entwurf mit Live-Werten, ein
Trockenlauf vor jedem Schreiben, der Quellentausch, das Vorlagenblatt. Nichts
davon passt in eine jsonConfig-Seite, die für Einstellungen gebaut ist. Die
eigentlichen Einstellungen der Instanz liegen trotzdem in einer normalen
jsonConfig-Seite (`adminUI.config: "json"`, vier Schalter, in alle elf Sprachen
übersetzt). Ohne Prozess belegt der Adapter keinen Speicher, solange niemand den
Reiter offen hat.

## Was er kann

![Die Werkbank mit einem gewählten Gerät](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/01-device.png)

*Eine Tasmota-Steckdose im Baum gewählt: was der Detektor daraus macht, welche Vorlage gewonnen hat, und jeder Datenpunkt mit dem Wert, den er gerade liefert.*

**Der Detektorbericht rechnet mit.** Der echte `@iobroker/type-detector` läuft
gegen einen Entwurf deines Alias, während du ihn bearbeitest. Änderst du eine
Rolle, ändert sich der Bericht mit — du siehst sofort, ob ein Gerät entstanden
ist oder ein Haufen loser Werte, welche Musterplätze belegt sind und welche noch
frei.

**Werte, wie sie gerade sind.** Jeder Datenpunkt zeigt, was seine Leseformel
*in diesem Moment* zurückgibt, daneben den Rohwert der Quelle. Eine Formel, die
`undefined` liefert oder wirft, sieht man, bevor irgendetwas geschrieben wird.

![Ein aufgeklappter Datenpunkt](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/03-datapoint.png)

*Eine Zeile aufgeklappt: woraus sie liest, welches Feld im JSON, die Leseformel, die Rolle — und der Musterplatz, den diese Rolle füllt.*

**JSON wird ausgepackt, ohne dass du eine Formel schreibst.** Viele Geräte
liefern ihre Messwerte nicht als einzelne Datenpunkte, sondern als ein
einziges JSON — bei Tasmota etwa alles in `tele/SENSOR`. Erkennt die Werkbank
in einer Quelle gültiges JSON, zerlegt sie es und bietet seine Felder in einer
Auswahlliste an: `ENERGY.Power`, `ENERGY.Total`, `Wifi.Signal`. Ein Klick
darauf genügt, die passende Formel entsteht von selbst — und zwar in der
abgesicherten Form:

```js
JSON.parse(val)?.ENERGY?.Power ?? null
```

Das `?.` ist kein Schmuck. `tele/SENSOR` ist ein Sammeltopf, in dem je nach
Gerät und Nachricht mal dieses und mal jenes Feld steht; der blanke Zugriff
`JSON.parse(val).ENERGY.Power` scheitert, sobald `ENERGY` einmal fehlt — der
Alias liefert dann gar nichts mehr und der Controller schreibt eine Warnung
ins Protokoll. Mit `?.` kommt in diesem Fall schlicht `null` heraus. Ist das
Feld `0`, steht auch `0` da und nicht „kein Wert": `??` greift nur bei
`null` und `undefined`.

Der Weg geht in beide Richtungen. Steht in einer Zeile bereits eine Formel,
liest die Werkbank sie zurück und zeigt in der Auswahl das gemeinte Feld statt
„eigene Formel" — auch bei der blanken Schreibweise ohne `?.`. Nur was
wirklich mehr tut als ein Feldzugriff (`JSON.parse(val)?.POWER === "ON"`),
bleibt eine eigene Formel und wird nicht angetastet. Und was du selbst
geschrieben hast, bleibt stehen: Weicht deine Formel von der ab, die die
Vorlage vorschlägt, sagt die Zeile das — geändert wird sie erst, wenn du es
verlangst.

**Rolle, Raum und Funktion werden gleich mit gepflegt.** Ein Alias ist mehr
als ein Bündel Datenpunkte, und die Werkbank hält die drei Dinge in Ordnung,
an denen ein Gerät im ioBroker als Gerät erkennbar wird:

- **Die Rollen der Punkte** kommen aus der Vorlage oder aus dem Muster und
  passen sich mit, wenn du das Muster wechselst — `switch.light` passt auf
  kein `socket`-SET. Die Rollenwahl ist nach Musterplätzen gruppiert und
  zeigt, welcher Platz dadurch belegt würde und ob er noch frei ist. Kennt ein
  Platz mehrere zulässige Schreibweisen, stehen alle zur Wahl: `LOWBAT` nimmt
  `indicator.lowbat` genauso wie `indicator.maintenance.lowbat` — was die
  eigene Hardware schreibt, ist also dabei. Veraltete Schreibweisen bleiben
  draußen.
- **Die Rolle des Kanals** ist der Gerätetyp selbst (`light`, `blind`,
  `thermostat`), so wie der Geräte-Adapter des Admin es hält — daran erkennen
  ihn andere Adapter wieder.
- **Raum und Funktion** stehen nicht am Objekt, sondern in `enum.rooms.*` und
  `enum.functions.*`. Die Werkbank schlägt beide vor — den Raum aus der
  Quelle, ihrem Namen oder dem Zielordner, die Funktion aus der Vorlage oder
  dem erkannten Gerätetyp —, trägt den Alias beim Schreiben dort ein und
  wieder aus, wenn du die Zuordnung änderst. Verlegst du den Alias, wandert
  die Zuordnung mit; fremde Mitglieder derselben Aufzählung bleiben dabei
  unberührt.
- **Und ihre Bilder.** Der Admin bringt für Räume und Funktionen fertige
  Vorlagen mit Symbol mit. Fehlt einer vorhandenen Aufzählung das Bild — aus
  einer Homematic-Zentrale gespiegelte tragen nie eines —, trägt die Werkbank
  es nach. Neben dem Feld siehst du vorher, was passieren wird. Siehe
  [Raum und Funktion](#raum-und-funktion).

Nichts davon geschieht im Verborgenen: Jede dieser Änderungen steht im
Trockenlauf, bevor irgendetwas geschrieben wird — auch die an den
Aufzählungen, die ja fremde Objekte sind.

**Vorlagen.** Eine Vorlage beschreibt, wie aus einer Gerätequelle ein fertiges
Aliasgerät wird. Vorlagen sind schlichte JSON-Dateien, eine je Vorlage — siehe
[Vorlagenformat](#vorlagenformat). Sechzehn liegen bei: vier für Tasmota, ein
reiner Messpunkt und elf für Homematic — siehe
[Was die mitgelieferten Vorlagen abdecken](#was-die-mitgelieferten-vorlagen-abdecken).

**Eigene Vorlagen.** Bau ein Gerät — von Hand oder indem du eine mitgelieferte
Vorlage abwandelst — und sichere es als eigene Vorlage. Was sich ableiten lässt,
wird abgeleitet; was sich nicht ableiten lässt, wird gefragt. Bevor etwas
gespeichert wird, läuft ein Probelauf der neuen Vorlage gegen jedes Gerät im
System und zeigt, welche sie trifft, welche Vorlage dort gewinnt und welche
Geräte den Besitzer wechseln würden. Siehe
[Eigene Vorlagen sichern](#eigene-vorlagen-sichern).

**Tasmota und MQTT.** Ein Tasmota-Gerät hängt über den MQTT-Adapter als Satz
roher Themen in ioBroker: `cmnd/`, `stat/`, `tele/` — kein Gerät, nur
Datenpunkte. Die Werkbank baut daraus nicht nur den Alias, sondern prüft auch
den Weg dorthin:

- **Fehlende Sendepunkte.** Ein `cmnd.POWER`, das es nicht gibt, wird auf
  Knopfdruck angelegt — mit dem richtigen Thema und der passenden Rolle.
- **Stumme Punkte.** Es gibt sie, aber sie dürfen nicht senden: `publish` steht
  aus. Ein Alias, der darüber schaltet, tut nichts, ohne dass man es ihm
  ansieht. Die Werkbank zeigt es und schaltet es auf Wunsch frei.
- **Verzögerte Rückmeldung.** Ohne `SetOption59` meldet Tasmota eine Änderung
  erst mit der nächsten Telemetrie — der Alias zeigt minutenlang den alten Wert.
  Die Werkbank fragt beim Gerät nach und schaltet die Einstellung ein.
- **Befehle abfragen.** Kennt sie die Befehlsliste eines Geräts nicht, fragt sie
  beim Gerät nach (Status 11). Eine reine Abfrage, die nichts schaltet und
  nichts ändert.

**Bekannte Ausnahme: Schreiben im Bereich des MQTT-Adapters.** Sonst schreibt
die Werkbank nur in `alias.*` und `enum.*`. Die Tasmota-Helfer sind die einzige
Ausnahme. Einen Sendepunkt anlegen, das Senden freischalten, beim Gerät
nachfragen und SetOption59 brauchen jeweils einen `cmnd`-Datenpunkt unter
`mqtt-client.0.…`, und den legt die Werkbank dort an oder ändert ihn. Das ist
**ab Werk aus**. Freigegeben wird es in den Instanz-Einstellungen
(*Datenpunkte im MQTT-Adapter anlegen und ändern erlauben*). Ohne Freigabe
zeigt die Werkbank, was zu tun wäre, und schreibt nichts außerhalb ihres
eigenen Bereichs.

Wer seine Tasmota-Geräte so einbindet, braucht für die Gerätestruktur keinen
eigenen Adapter: MQTT liefert die Daten, die Werkbank macht daraus Geräte.

**Geräte mit mehreren Ausgängen.** Eine Steckdosenleiste oder Ventilinsel hat
`POWER1`, `POWER2`, … Da ein `socket`-Muster genau ein `SET` kennt, wird jeder
Ausgang ein eigener Kanal, alle unter einem Ordner. Die Nummern der Ausgänge
werden aus dem gelesen, was tatsächlich da ist — Lücken sind erlaubt.

**Verlegen, umbenennen, Quelle tauschen.** Eine Kennung lässt sich im
Objektspeicher nicht ändern, deshalb ist Verlegen immer: neu anlegen,
Aufzählungen umtragen, alt löschen — in dieser Reihenfolge, damit ein Fehlschlag
dich mit zwei Aliasen zurücklässt statt mit keinem. Der Quellentausch lässt den
Alias unangetastet und biegt ihn nur um, was genau das ist, was man will, wenn
ein Gerät stirbt. Siehe [Quelle tauschen](#quelle-tauschen).

**Fehlende Plätze raten.** Ein Gerät, auf das kein Muster passt, ist oft kein
unbekanntes Gerät — es fehlt schlicht eine Rolle. **Fehlende Plätze raten**
setzt Rollen im Entwurf und lässt den Detektor noch einmal entscheiden. Das
läuft nur auf diesen Knopf, nie während der normalen Erkennung, jede geratene
Zeile ist markiert, und solange eine Vermutung unentschieden ist, bleiben die
Schreibknöpfe gesperrt. Nicht zu entscheiden ist kein stillschweigendes Ja mehr.

![Der Trockenlauf](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/02-dry-run.png)

*Der Trockenlauf, bevor etwas geschrieben wird: elf Objekte, zehn neu, eines würde überschrieben — jedes mit Ziel und Quelle.*

**Ohne Trockenlauf wird nichts geschrieben.** Der Trockenlauf listet jedes
Objekt, das entstehen, sich ändern oder verschwinden würde, als vollständiges
JSON. Bei allem, was sich ändert, stellt er **vorher und nachher nebeneinander**,
Zeile gegen Zeile, damit du siehst, *was* sich ändert statt nur *dass* sich
etwas ändert. Feldreihenfolge und abschließende Kommas werden vorher
vereinheitlicht — sonst leuchtet die halbe Liste ohne Grund. Erst von dort aus
lässt sich schreiben. Existiert eine Quelle nicht, ist das Schreiben gesperrt:
Der js-controller merkt sich eine fehlende Quelle dauerhaft, und nur Löschen und
Neuanlegen des Objekts hilft.

## Stand

![Die Prüfungen](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/06-checks.png)

*Die Prüfungen laufen immer mit und fassen nichts an. Hier fällt eine durch: Der Alias sähe fertig aus, aber sein Schalter könnte nichts senden — am MQTT-Befehlspunkt ist das Senden abgeschaltet.*

Früh. Benutzbar, aber nicht fertig.

- Läuft als Tab im Admin; der Adapter selbst führt keinen Prozess aus
  (`mode: none`). Die Instanz gibt es nur, damit sie die Einstellungen trägt.
- Oberfläche in allen elf Admin-Sprachen, je 712 Schlüssel — ein Wörterbuch
  unter `admin/i18n/`, von Reiter und Einstellungsseite gemeinsam benutzt. Eine
  unbekannte Sprache fällt auf Englisch zurück
- 16 mitgelieferte Vorlagen: elf Homematic, vier Tasmota, ein reiner Messpunkt
- **Es fehlt:** „wer benutzt diesen Alias" — vis-Ansichten sowie Alexa- und
  Google-Namen lassen sich von hier aus nicht durchsuchen, deshalb warnt ein
  Umbenennen, statt Vollständigkeit vorzutäuschen. Eine Vorlage in eine Datei
  auszugeben und wieder einzulesen funktioniert, ist aber der am wenigsten
  erprobte Weg.

## Installation

Im ioBroker-Admin auf **Adapter** gehen, nach **Alias Workbench** suchen und eine
Instanz anlegen. Danach den Admin neu laden und links im Menü **Alias-Werkbank**
wählen.

## Warum der Baum Geräte zeigt, die es nicht gibt

Bei MQTT legt ioBroker nur Objekte für die Datenpunkte selbst an. Ein Thema wie
`SmartHome/Bastelzimmer/Gartenpumpe/stat/POWER` ergibt ein Objekt für
`stat.POWER` — die Ebene `Gartenpumpe` ist bloß ein Namensteil, kein Objekt.

Der type-detector sucht aber nach einem `channel` oder `device`, unter dem er
Datenpunkte gruppieren kann. Er findet keinen, erkennt also kein Gerät, und
Alexa, Matter und Material haben nichts, woran sie andocken könnten.

Genau diese Lücke füllt der Alias: `alias.0.…Gartenpumpe` ist ein echter Kanal
mit ordentlichen Rollen darunter. Deshalb lässt die Werkbank einen solchen
nicht existierenden Knoten im Baum anwählen und ein Gerät daraus bauen.

## Was ein vorhandener Alias beisteuert

![Ein vorhandener Alias im Bearbeiten-Modus](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/05-alias.png)

*Ein Alias, den es schon gibt. Seine eigenen Rollen und Formeln gewinnen gegen die Vorlage, darunter stehen die freien Plätze des Licht-Musters, und die drei Verwaltungsknöpfe gibt es nur in diesem Modus.*

Wählst du eine Quelle, zu der es schon einen Alias gibt, gewinnt der Alias.
Rolle, Typ, Einheit, Werteliste, Beschriftung, Formeln, beide Quellen und die
Haken kommen aus dem, was gespeichert ist — in **beiden** Sichten, „Alias
anlegen" und „Alias bearbeiten".

Vorher trug dieselbe Zeile je nach Modus eine andere Rolle, und Aktualisieren
tat in jedem Modus etwas anderes. Jetzt ändert Aktualisieren von sich aus
nichts.

Wo die Vorlage etwas anderes will, sagt die Zeile das — *„Vorlage:
sensor.window"* — und ein Knopf über der Liste bietet an, es zu übernehmen. Das
ist ein Klick, nie eine Nebenwirkung. Die Beschriftung ist ausgenommen: Der
Anzeigename gehört dem, der ihn getippt hat.

## Quelle tauschen

Ein Gerät geht kaputt und wird ersetzt. Der Alias soll genau bleiben, wie er ist
— gleiche Kennung, gleiche Aufzeichnung, gleicher Raum, gleiche Funktion — und
nur woandershin zeigen. **Quelle tauschen …** macht das und ändert dabei nur
`common.alias.id` je Datenpunkt sowie `native.quelle` am Kanal.

Jeder Datenpunkt wird in drei Schritten zugeordnet, und der Dialog sagt, welcher
davon gegriffen hat:

1. **gleicher relativer Pfad** unter dem neuen Gerät — `…ABC.1.STATE` →
   `…XYZ.1.STATE`
2. **über die Vorlagenzeile** — findet `LOWBAT` an einem Gerät, das es `LOWBAT`
   schreibt, wo das alte `LOW_BAT` sagte
3. **geraten** aus Name oder Rolle — mit Absicht schwach und als **vermutet**
   markiert, damit du es prüfst

Zeilen ganz ohne Treffer werden rot und bieten ein Kästchen an: *diesen Punkt
beim Tauschen entfernen*. Lässt du es leer, bleibt der Punkt stehen und zeigt
weiter auf die alte Quelle — erlaubt, aber sichtbar.

Auf zwei Dinge achtet der Dialog besonders. Er nennt die alte Quelle auch dann,
wenn es das Gerät **nicht mehr gibt** — das ist ja der Normalfall bei „Gerät
kaputt". Und er warnt, wo die neue Quelle anders misst: *„Achtung: ACTUAL:
Wertebereich 0..100 → 0..255"*. Der Alias behält seine Formeln; zählt das neue
Gerät anders, sind die Zahlen danach falsch, und nichts sonst würde es dir sagen.

## Raum und Funktion

Beide stehen in `enum.rooms.*` / `enum.functions.*`, nicht am Objekt — das ist
also die einzige Stelle, an der die Werkbank außerhalb von `alias.` schreibt.
Sonst wird außerhalb dieses Namensraums nie etwas angefasst.

Der Vorschlag kommt der Reihe nach aus: dem Raum, der schon an der Quelle oder
an einem ihrer Kanäle steht, dem Gerätenamen (`FK_Max_Spielzimmer` →
`Max_Spielzimmer`), dem Zielordner. Die Funktion kommt aus dem Feld `enumFunction`
der Vorlage, oder aus dem erkannten Typ, wenn die Vorlage keines hat.

Der Admin bringt 62 Funktions- und 58 Raumvorlagen mit, jede mit einem Bild. Die
Werkbank kopiert sie nicht, sondern liest sie zur Laufzeit aus dem Bündel des
Admin — so altern nie zwei Listen auseinander. Misslingt das, zeigt das Feld
still nur, was es gibt, und sagt das in der letzten Zeile, statt ohne Grund leer
auszusehen.

**Das Bild wird gezeigt, bevor es geschrieben wird.** Neben jedem der beiden
Felder steht das Bild der gewählten Aufzählung: kräftig, wenn schon eines
hinterlegt ist, blass mit einer kleinen Ecke **neu**, wenn die Werkbank beim
Schreiben eines ergänzen würde, und gar nicht, wenn der Katalog den Namen nicht
kennt oder der Schalter aus ist. So ist die Einstellungsseite in der Zeile selbst
sichtbar, statt sich aus einem Trockenlauf erraten zu lassen.

## Einstellungen

Die Instanz hat keinen Prozess; ihre Einstellungen entscheiden nur, wie die
Werkbank schreibt. Vier Schalter, von Haus aus alle an — und fehlt `native` ganz,
gelten dieselben Vorgaben, statt dass alles als aus zählt:

| Schalter | Was er tut |
|---|---|
| `ikonRaeume` | ein fehlendes Bild an einem **Raum** ergänzen |
| `ikonFunktionen` | dasselbe für eine **Funktion** |
| `ikonErsetzen` | auch einen Eintrag ersetzen, der kein Bild ist. Die Vorgaberäume von ioBroker tragen `icon: "Bedroom"` — ein blankes Wort, das als kaputtes Kästchen erscheint |
| `vorlagenVomAdmin` | die Raum- und Funktionsvorlagen des Admin überhaupt anbieten |

Die Werkbank liest sie **einmal beim Laden**. Nach dem Speichern die Seite neu
laden.

## Was die mitgelieferten Vorlagen abdecken

Sechzehn Vorlagen liegen bei. Vier Tasmota, ein reiner Messpunkt — und elf für
Homematic, wo das Kunststück nicht ist, dass eine Vorlage greift, sondern dass
die **richtige** greift. In den Daten sehen die Geräte gleich aus; was sie
trennt, ist je ein Datenpunkt:

| Unterschieden an | Was was ist |
|---|---|
| `1.WORKING` | Schaltaktor, kein Fensterkontakt — beide haben `1.STATE` |
| `2.STATE` | Mehrkanalaktor; die Einkanalvorlage lehnt ab, wenn es ihn gibt |
| `1.LEVEL_REAL` gegen `1.STOP` | Dimmer gegen Rollladen — beide haben `1.LEVEL` |
| `1.ERROR` | klassischer Fensterkontakt gegen HmIP, das einen Wahrheitswert aus einer Zahl rechnet |
| `0.SABOTAGE` | Pflicht für den HmIP-Kontakt. Ohne ihn trafen `1.STATE` + `0.LOW_BAT` zwölf Geräte, acht davon Aktoren |
| `1.LEVEL` / `1.HUMIDITY` / `4.SECTION` | Heizkörperventil gegen Wandthermostat gegen Heizgruppe |
| `1.TEMPERATURE` gegen `1.ACTUAL_TEMPERATURE` | ein reiner Fühler gegen etwas, das auch einen Wert setzt |

Die Empfänger der CCU selbst — `HM-RCV-50`, `HmIP-RCV-50`, `RPI-RF-MOD` —
treffen mit Absicht nichts. Fünfzig blanke `LEVEL`-Kanäle sind kein Gerät.

Wird eine Vorlage abgelehnt, sagt die Auswahl warum: *„1.LEVEL fehlt"*, nicht
*„passt nicht"*. Ein Grund, mit dem man nichts anfangen kann, ist kein Grund.

**Zur Rolle des Verbrauchs.** Vier Vorlagen (`messpunkt`, `tasmota-lampe`,
`tasmota-mehrfach`, `tasmota-steckdose`) geben der Zeile `CONSUMPTION` die Rolle
`value.energy.consumed`. Das ist die richtige: Die Einheit ist Wh, also eine
**Energie** und keine Leistung — sie gehört unter `value.energy.*` und nicht zu
den Watt in `value.power.*`. Genau deshalb ist `value.power.consumption` in der
[Rollenliste](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md)
von ioBroker durchgestrichen.

Bis `@iobroker/type-detector` 6.0.2 ging es trotzdem nicht anders: das Muster
`consumption` erkannte `CONSUMPTION` nur mit der durchgestrichenen Rolle, ein
Punkt mit der richtigen fiel ohne ein Wort aus dem erkannten Gerät. Gemeldet als
[Issue 334](https://github.com/ioBroker/ioBroker.type-detector/issues/334),
behoben in PR 339, seit 6.0.3 nimmt der Platz beide
(`/^value\.(energy\.consumed|power\.consumption)$/`).

**Wer so einen Alias mit einem älteren Detektor liest, verliert den Punkt.**
Betroffen ist nicht die Werkbank, sondern jeder Adapter, der den Alias liest —
und jeder bringt seine **eigene** Detektor-Fassung mit, teils über npm, teils
fest in sein Frontend eingebacken, wo keine `package.json` sie verrät. Auf
einem bewohnten System am 14.10.2026 nachgemessen:

| Leser | Fassung | nimmt `value.energy.consumed`? |
|---|---|---|
| `iobroker.admin`, Gerätemanager | eingebacken ins Frontend-Asset | nein — im Bündel steht nur `value\.power\.consumption` |
| `iobroker.devices` | eingebacken ins Frontend-Asset | nein, ebenso |
| `iobroker.matter` | 5.0.15 über npm | nein, `/^value\.power\.consumption$/` |
| `@iobroker/mcp-server` | 6.0.1 über npm | nein, dieselbe Zeile |
| `iobroker.hm-rpc` | 4.6.4, oberste Ebene | nein — liest aber keine Aliase |

Gemessen wurde am Muster selbst, nicht an der Versionsnummer: bei den beiden
eingebackenen steht `energy.consumed` nirgends im Bündel. Dort fehlt der
Verbrauch also, bis der lesende Adapter nachzieht. Bestehende Aliase mit der
alten Rolle bleiben überall erkannt, der Ausdruck nimmt sie weiter. Jede der
vier Zeilen trägt den Grund im Feld `_role`.

### Rollenwissen neben den Zeilen

Eine Vorlage kann `extraPoints` mitbringen: Rollen für Datenpunkte, die keine
eigene Zeile bekommen. Ohne das zeigte „alle Datenpunkte des Geräts" bei den
meisten Zeilen *keine Rolle* an, weil hm-rpc das Feld schlicht leer lässt. Eine
`*.NAME`-Wildcard gilt je Kanal, sodass `2.LEVEL` und `3.RAMP_TIME` abgedeckt
sind, ohne jeden Kanal aufzuführen. An der Frage, welche Vorlage gewinnt, ändert
es nichts — angereichert werden nur Rohzeilen.

## Eigene Vorlagen sichern

Der Knopf **Als Vorlage speichern …** macht aus dem Gerät, das du vor dir hast,
wieder eine Vorlage. Pfade werden relativ zum Gerät, aus
`JSON.parse(val).ENERGY.Power` wird wieder `jsonField: "ENERGY.Power"`, und Rollen,
Einheiten und Formeln bleiben erhalten.

Was eine Vorlage von sich aus nicht wissen kann, ist, **welche Datenpunkte ein
Gerät zu dieser Art Gerät machen**. Das ist eine Aussage über alle künftigen
Geräte, also fragt der Dialog:

- **Pflichtpunkte** — vorgeschlagen (alles mit einem Schreibweg ist von Haus aus
  Pflicht), entschieden von dir mit einem Haken je Zeile. Jeder weitere
  Pflichtpunkt macht die Vorlage genauer und zugleich spröder.
- **Inhaltsprüfungen** — vorgeschlagen, wo ein JSON-Feld gelesen wird. Das ist,
  was „Steckdose" von „Steckdose mit Messung" trennt, deshalb wird es angeboten,
  aber nicht angehakt.
- **Namenshinweis** — wird nie abgeleitet. Er entscheidet nur zwischen Vorlagen,
  die gleich gut passen; MQTT kann eine Lampe nicht von einem PC unterscheiden.
- **mehrere Ausgänge** — ein Haken und die Nummer, die diesen Ausgang bezeichnet.
  Aus `stat.POWER1` wird dann `stat.POWER%N%`, ersetzt nur am Ende eines
  Pfadabschnitts, damit `ENERGY.Power` heil bleibt. Verweist der Entwurf noch auf
  die anderen Ausgänge, sagt der Dialog das: Eine solche Vorlage passte immer nur
  auf genau dieses eine Gerät.
- **darf es nicht geben** — Datenpunkte, deren Vorhandensein die Vorlage
  ausschließt.

Danach zeigt der Probelauf, was die Erkennung tatsächlich fängt, bevor
irgendetwas gespeichert wird.

### Sie verwalten

Die dritte Sicht neben **Alias anlegen** und **Alias bearbeiten** ist
**Vorlagen**: jede Vorlage mit ihrer Erkennung, ihren Datenpunkten, einem
ständigen Probelauf und dem rohen JSON. An einer eigenen Vorlage lässt sich dort
alles ändern: Name, Rang, Namenshinweis, die Pflicht- und die verbotenen
Datenpunkte, und jeder Datenpunkt selbst — eine Zeile anklicken öffnet Rolle,
Typ, Einheit, Pfade, Formeln und Merker. Datenpunkte lassen sich hinzufügen und
entfernen. Der Probelauf darunter reagiert auf jede Änderung, sodass man sieht,
was eine Änderung an der Erkennung bewirkt, bevor man speichert.

Mitgelieferte Vorlagen lassen sich nicht ändern — so bleiben sie immer der
Auslieferungszustand. *Eigene Kopie zum Bearbeiten* gibt dir eine Kopie unter
derselben Kennung, die das Original verdeckt; löschst du die Kopie, kommt die
mitgelieferte wieder zum Vorschein. *Duplizieren* gibt einer eigenen Vorlage eine
neue Kennung — für eine Abwandlung, die neben dem Original steht, statt es zu
ersetzen.

Das Einlesen nimmt eine Vorlage je Datei, in genau dem Format unter
`admin/vorlagen/`. Beim Einlesen wird nichts gespeichert: Die Datei erscheint
zuerst als Vorschau, mit einer Zeile, die sagt, was ein Speichern täte — neu
anlegen, deine eigene Fassung ersetzen oder eine mitgelieferte verdecken.

Deine Vorlagen liegen in `native.vorlagen` des Instanzobjekts, überstehen also
`iobroker upload` und Adapter-Aktualisierungen und sind Teil einer
Backitup-Sicherung. Eine eigene Vorlage mit derselben `id` wie eine
mitgelieferte verdeckt diese. Ablage und Austauschformat sind dasselbe JSON,
sodass eine gut geratene Vorlage unverändert ins Paket wandern kann.

### Wie eine Vorlage ausgewählt wird

Passen mehrere Vorlagen, entscheidet diese Reihenfolge:

1. **wie viele Datenpunkte die Vorlage wirklich belegt hat** — Pflichtpunkte, bei
   Mehrfachgeräten je Ausgang, dazu Inhaltsprüfungen, die zutrafen
2. **der Namenshinweis**, falls er passt
3. **deine eigene Vorlage** vor einer mitgelieferten
4. **`priority`**, damit dasselbe Gerät immer gleich erkannt wird

Die Reihenfolge ist wichtig. Zuerst Belege zu zählen ist das, was eine mit
Absicht gebaute Vorlage davor bewahrt, gegen eine mitgelieferte zu verlieren,
deren Stichwort zufällig im Gerätenamen vorkommt.

Was Schritt 3 für Aktualisierungen bedeutet: Eine eigene Vorlage **kann von
einer mitgelieferten nicht über den `priority` ausgestochen werden** — dieser Schritt
steht über `priority`, also kann keine künftige Fassung dieses Adapters dir
stillschweigend ein Gerät wegnehmen. `priority` entscheidet immer nur zwischen
Vorlagen derselben Herkunft, weshalb eine neue eigene Vorlage auch aus deinen
eigenen Vorlagen heraus nummeriert wird und die mitgelieferten Nummern gar nicht
beachtet.

Eine mitgelieferte Vorlage kann trotzdem über Schritt 1 gewinnen, indem sie
strikt mehr Datenpunkte belegt. Das ist Absicht — mehr Belege sollen gewinnen —
und betrifft nur Geräte, die du noch nicht gebaut hast: Ein fertiger Alias merkt
sich die Vorlage, aus der er entstand, und behält sie.

## Was eine Vorlage von sich aus anhakt

Ob ein Datenpunkt einen Platz im Muster des type-detectors hat, ist **nicht** das
Kriterium. Das entscheidet nur, *wo* der Punkt landet — im Gerät selbst oder in
einem eigenen Info-Gerät. Über die Frage, ob ihn jemand braucht, sagt es nichts.
Das Muster `thermostat` hat 24 Plätze, `socket` hat 14; alles, was jemals in
einem solchen Gerät sitzen könnte, steht dort, bis hin zu Frequenz und
Scheinleistung.

Das Kriterium ist der Zweck: **angehakt wird, was man braucht, um das Gerät zu
bedienen und zu merken, dass etwas nicht stimmt.** Sollwert, Istwert und die
Meldungen, die einen Ausfall ankündigen — `LOWBAT`, `UNREACH`.

Nicht angehakt bleibt die Diagnose. Signalstärke, Laufzeit, Rampenzeiten,
Sperren. Die hakt man an, wenn man einem Problem nachgeht.

Die **Batteriespannung** sieht aus, als gehörte sie in die erste Gruppe — sie
fällt über Wochen sichtbar, während `LOW_BAT` erst umspringt, wenn der Wechsel
schon fällig ist. Sie bleibt trotzdem aus, weil der Detektor keinen Platz für
sie hat. Muster setzen sich aus zwei gemeinsamen Gruppen zusammen:

```
maintenance  WORKING UNREACH LOWBAT MAINTAIN ERROR DIRECTION
             CONNECTED RSSI ON_TIME BATTERY   value.battery   Einheit %
metering     ELECTRIC_POWER CURRENT VOLTAGE CONSUMPTION
             FREQUENCY SPEED POWER            value.voltage   Einheit V
```

`VOLTAGE` sitzt zwischen Strom und Verbrauch: Es ist die **Netzspannung eines
Messgeräts**, nicht die Zellspannung eines Sensors. Ein Fensterkontakt hat gar
keine metering-Gruppe, deshalb hat er auch keinen Spannungsplatz — und
`BATTERY`, den Platz, den er hat, meint einen Prozentwert. In beide Volt zu
schreiben wäre falsch, also wird der Punkt angeboten und bleibt aus.

Zwei Dinge stechen diese Regel:

- Ein Punkt, der **dieselbe Quelle** liest wie ein bereits angehakter, wird nie
  angehakt. Sonst steht derselbe Wert zweimal im Alias, und die siebte Prüfung
  meldet das zu Recht. Homematic-Schaltaktoren haben keinen eigenen
  Rückmeldewert — `1.STATE` ist beides —, deshalb bleibt ihr `ON_ACTUAL` aus.
- Wo der Zweck für Anhaken spricht, das Muster aber **keinen Platz** hat, wird
  abgewogen: Der Punkt landet in einem Info-Gerät neben dem eigentlichen. Für
  einen einzelnen Wert lohnt das selten, und der `note` der Vorlage muss es
  sagen. Und prüfe, was ein Platz **bedeutet**, bevor du ihn benutzt — ein
  passender Name ist noch kein passender Zweck, wie der Spannungsfall oben zeigt.

## Vorlagenformat

![Ein Vorlagenblatt](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/04-template.png)

*Eine mitgelieferte Vorlage, nicht änderbar: Kopfdaten, was es geben und was es nicht geben darf, damit sie greift, und ihre Datenpunkte. „Eigene Kopie" macht sie bedienbar.*

Eine JSON-Datei je Vorlage unter `admin/vorlagen/`. Beispiel:

```jsonc
{
  "id": "tasmota-steckdose",
  "version": 1,
  "rang": 20,
  "name": { "en": "Tasmota socket", "de": "Tasmota-Steckdose" },
  "geraetetyp": "socket",

  "erkennung": {
    "erforderlich": ["stat.POWER", "cmnd.POWER"],
    "inhalt": { "tele.SENSOR": "ENERGY" },
    "namenshinweis": "steckdose|dose|plug|socket"
  },

  "zustaende": [
    { "name": "SET", "rolle": "switch", "typ": "boolean",
      "lesen": "stat.POWER", "schreiben": "cmnd.POWER",
      "schreibformel": "val ? \"ON\" : \"OFF\"" },

    { "name": "ELECTRIC_POWER", "rolle": "value.power", "einheit": "W",
      "lesen": "tele.SENSOR", "feld": "ENERGY.Power", "optional": true },

    { "name": "TODAY", "rolle": "value", "einheit": "kWh",
      "lesen": "tele.SENSOR", "feld": "ENERGY.Today",
      "optional": true, "vorgabeAus": true }
  ]
}
```

| Schlüssel | Bedeutung |
|---|---|
| `detection.required` | diese Datenpunkte muss es geben, sonst greift die Vorlage nicht |
| `detection.content` | der genannte Datenpunkt muss dieses Feld in seinem JSON enthalten |
| `detection.forbidden` | diese Datenpunkte darf es **nicht** geben, sonst greift die Vorlage nicht |
| `detection.nameHint` | entscheidet nur zwischen Vorlagen, die gleich gut passen |
| `priority` | letzter Stichentscheid, damit dasselbe Gerät immer gleich erkannt wird |
| `optional` | der Zustand entfällt, wenn seine Quelle oder das JSON-Feld fehlt |
| `offByDefault` | vorgeschlagen, aber nicht angehakt — siehe **Was eine Vorlage von sich aus anhakt** |
| `jsonField` | baut die Leseformel `JSON.parse(val).<Feld>` |
| `multiple` + `%N%` | ein Gerät je Ausgang; die Nummern werden aus dem Bestand gelesen |
| `valueList` | Werteliste für den Datenpunkt — Plätze wie EFFECT werden ohne sie nicht erkannt |
| `absolute` | `read` ist eine vollständige Objektkennung, nicht relativ zum Gerät — dasselbe Objekt für jedes Gerät |
| `caption` | der Anzeigename des Datenpunkts, wenn er vom Platznamen abweichen soll |
| `decimals` | Nachkommastellen für die Wertanzeige |

`forbidden` ist das, was eine einfache Steckdose wirklich von einer mehrfachen
trennt: Die einfache hat kein `stat.POWER2`. Ein fehlender Datenpunkt zählt
bewusst **nicht** als Beleg — sonst ließe sich der Punktestand einer Vorlage mit
einer Liste erfundener Ausschlüsse aufblasen.

Datenpunktnamen werden ersatzweise ohne Rücksicht auf Groß- und Kleinschreibung
verglichen, weil MQTT die Schreibweise behält, die gesendet wurde — dieselbe
Gerätefamilie schickt am einen Gerät `cmnd.POWER` und am nächsten `cmnd.power`.

## Unter der Haube

```
Quelle (z. B. mqtt-client.0.…)
   ↓  eine Vorlage greift und wird angewendet
Entwurf im Speicher  →  Objektbild  →  type-detector  →  Bericht
   ↓  Trockenlauf
alias.0.<Ordner>.<Gerät>            Kanal + Zustände mit common.alias
```

Der Entwurf rührt die Objektdatenbank nie an. Der Detektor läuft gegen ein Abbild
des Entwurfs — deshalb reagiert der Bericht sofort, und deshalb kann beim
Ausprobieren nichts kaputtgehen.

Der type-detector ist eine echte npm-Abhängigkeit, mit esbuild für den Browser
gebündelt. Er wird nie in den Quellbaum kopiert — eine eingefrorene Kopie, die
von der Bibliothek abdriftet, war die Hauptschwäche des bestehenden
Alias-Managers.

## Entwicklung

Nach dem Klonen die Abhängigkeiten auf dem üblichen Weg eines Node-Projekts
holen, dann das Bauskript laufen lassen:

```bash
npm run build      # bündelt @iobroker/type-detector nach admin/detector.js
```

`npm run build` fasst **nur** das Detektor-Bündel an. Die Module der Werkbank
werden ausgeliefert, wie sie sind; eines ändern und die Seite neu laden ist der
ganze Kreislauf. Auf einer laufenden Installation hält der Admin Adapterdateien
im Zwischenspeicher, deshalb ist `iobroker upload alias-workbench` nach dem
Kopieren das, was den Browser die Änderung sehen lässt.

Es gibt ein Wörterbuch, `admin/i18n/`, alle elf Sprachen. Der Admin lädt es
für die Einstellungsseite (jsonConfig mit `"i18n": true`). Der Reiter lädt
dieselben Dateien aus `admin/js/sprache.js`. Eine Sprache, die nicht in der
Liste steht, fällt auf Englisch zurück. Achte
auf Zeichenketten, die direkt in `admin/tab.html` stehen: Sie werden zur
Laufzeit ersetzt, und eine, die niemand verdrahtet hat, bleibt in jeder Sprache englisch,
ohne dass es auffällt.

Die Werkbank besteht aus **30 ES-Modulen** unter `admin/js/`, die der Browser
direkt lädt — einen Bauschritt gibt es für sie nicht, und die Gestaltung liegt
in einer Datei, `admin/css/werkbank.css`. Weil eine falsch gesetzte Modulgrenze
erst zur Laufzeit auffällt, prüft `npm test` vor jedem Commit, ob sich noch
alles bündeln lässt, ob jeder Bezeichner deklariert oder importiert ist und ob
alle elf Sprachdateien dieselben Schlüssel tragen.

## Hintergrund

- [@iobroker/type-detector](https://github.com/ioBroker/ioBroker.type-detector) —
  entscheidet, was als Gerät zählt, über Rollen statt über Namen
- [Tasmota](https://tasmota.github.io/docs/) — die Gerätefamilie, die die
  mitgelieferten Vorlagen abdecken
- [ioBroker-Aliase](https://github.com/ioBroker/ioBroker.docs) — Aliase sind eine
  Kernfunktion des js-controllers, nicht die eines Adapters

## Änderungen

### **WORK IN PROGRESS**
* **Eine Kurzansicht rechts — der erste Eindruck erschlägt nicht mehr.** Nach dem Klick auf ein Gerät zeigt die Werkbank jetzt zuerst eine Zusammenfassung: als was das Gerät erkannt wurde, Raum, Funktion, Ablageort und Name (dieselben Felder wie bisher), eine Ampel aus den Prüfungen und eine Vorschau, wie der Alias danach im Objekt-Explorer aussieht — neue Zeilen grün, geänderte orange, wegfallende durchgestrichen, mit den aktuellen Werten des Geräts. Passt alles, bleibt nur „Alias erzeugen“ direkt unter der Vorschau; daneben stehen „Prüfungen“ und „Ich muss mehr einstellen“. Vorlagenkasten, Musterwahl, MQTT-Karte und Zeilenliste sind weiter da: Der Umschalter **Kurz | Detail** oben rechts zeigt die heutige Ansicht unverändert.
* **Zeilen, die eine Prüfung betrifft, sind markiert.** In der Detailansicht trägt eine Zeile, die eine Prüfung nennt, ein Zeichen vor dem Namen — rot ✕ bei einem Fehler, orange ! bei einem Hinweis, der Text der Prüfung steht im Hinweis; ein Klick klappt die Zeile auf. Bisher sah man es nur im Dialog „Prüfungen“ und musste die Zeile suchen. Die Ampel der Kurzansicht zeigt außerdem, was die MQTT-Karte im Kopf meldet (offline, Sendepunkte fehlen, verzögerte Rückmeldung).
* **„N Sendepunkte fehlen“ nur noch, wo der Alias sie braucht.** Der gelbe Chip im Kopf der MQTT-Karte zählte jeden Befehl, den das Gerät kennt und für den es noch keinen Punkt gibt — `Sleep`, `SleepMode` … —, und stand damit an fast jeder Tasmota, obwohl die kaum jemand braucht. Jetzt zählt er nur fehlende Sendepunkte, auf die eine angehakte Zeile des Alias schreiben soll. Die aufgeklappte Karte und der Dialog führen weiter alle auf. Dasselbe gilt für „N können nicht senden“: es zählen nur Sendepunkte, auf die der Alias schreibt.
* **Ein Tasmota mit Werkseinstellung beim Thema wird abgelegt wie jedes andere.** Bei `%prefix%/%topic%/` liegt das Gerät unter `cmnd`, `stat` und `tele`; der vorgeschlagene Ablageort kam aus dem angeklickten Zweig — `alias.0.cmnd.<Gerät>`, `alias.0.stat.<Gerät>` … Jetzt schlagen alle drei Zweige denselben Ort vor, gebildet wie bei jedem anderen Tasmota (`alias.0.<Ebene über dem Präfix>.<Gerät>`).
* **Leerer Raum oder leere Funktion wird angezeigt.** Das Feld wird orange mit „Raum wählen“ / „Funktion wählen“, und die Ampel der Kurzansicht sagt, wozu es gut ist (Alexa, vis und der Geräte-Adapter finden Geräte nach Räumen; Funktionen ergeben Gruppen wie „alle Lichter“). Ein Klick auf den Hinweis springt ins Feld. Gesperrt wird nichts — ein Stromzähler etwa gehört eben keinem Raum.
* **Ausgang wählen in der Kurzansicht.** Bei Geräten mit mehreren Ausgängen (Tasmota-Steckdosenleiste, Mehrfachrelais) steht die Ausgangswahl jetzt auch im Kasten „Erkannt als …“; umschalten dort ist dasselbe wie im Vorlagenkasten.
* **Mit Nachbarzweigen nennt jede Zeile ihren Zweig.** Nach „Nachbarzweige dazunehmen“ (Matter legt Schalter und Messwerte in getrennte Endpunkte) steht an jeder Zeile, woher sie liest — „aus ElectricalSensor-2“, „aus OnOffPlugInUnit-1“, „aus info“. Ebenso, wenn nur ein Zweig angeklickt ist und der vorhandene Alias aus mehreren liest.
* **Kein falsches „Platz schon belegt“ mehr.** Passt eine Rolle auf zwei Plätze (`button.long` auf PRESS und PRESS_LONG im Tastenmuster), behauptet das Detail der Zeile nicht mehr, sie zähle nicht zum Gerät, während sie auf dem zweiten sitzt.
* **Befunde lesen sich als Befund, eine Taste ohne Wert ist keiner.** In der Ampel und am Zeichen der Zeile sagt eine gescheiterte Prüfung jetzt, was fehlt („Quelle hat noch keinen Wert“ statt „Quelle hat einen Wert: PRESS“). Tasten (`button…`), die noch nie gedrückt wurden, sind ein oranger Hinweis („Taste noch nie gedrückt“) statt eines Fehlers.
* **Knöpfe ohne drei Punkte.** „Alias erzeugen …“, „Verlegen …“, „Alias entfernen …“ und die anderen Knöpfe, die erst einen Dialog öffnen, heißen jetzt ohne das „…“ am Ende, in allen elf Sprachen.
* **In der Kurzansicht ist „Alias aktualisieren“ nur aktiv, wenn sich etwas ändern würde.** An einem bestehenden Alias, an dem nichts anders ist, steht der Knopf grau mit „Keine Änderungen“ daneben; wer Raum, Funktion, Ablageort oder Name ändert — oder wenn eine Vorlage neuer ist —, bekommt ihn aktiv. Ein geänderter Raum oder eine geänderte Funktion färbt jetzt auch die Kanalzeile der Vorschau orange.
* **Aus der Ampel direkt an die Stelle.** Jede Zeile der Ampel lässt sich anklicken, ebenso „In der Detailansicht ansehen“: es geht auf Detail, und der Bereich, in dem man etwas tun kann, steht aufgeklappt vor einem — die MQTT-Karte bei Sendepunkten und Rückmeldung, die Zeile selbst bei einem Befund an einer Zeile.
* **Die leere rechte Seite ist eine Karte.** Bevor etwas gewählt ist, steht dort eine Karte mit Pfeil nach links, Überschrift, der Erklärung des Modus und — beim Anlegen — drei nummerierten Schritten; schon beim Öffnen des Reiters.
* **Jedes Gerät geht in der Kurzansicht auf — oder wie eingestellt.** Neue Einstellung „Beim Wählen eines Geräts zeigen“ (Abschnitt „Kurz- und Detailansicht“): *Kurzansicht* (Vorgabe) — jedes Gerät geht kurz auf, der Umschalter gilt bis zum nächsten; *Immer die Detailansicht*; *Letzte Wahl merken*. Der Hinweis am Umschalter sagt, wo man das einstellt.

### 0.14.1 (2026-11-22)
* **Was in die Datenbank geht, ist englisch; was nur angezeigt wird, folgt der Sprache.** Drei Stellen waren noch deutsch. Die Werteliste der Tasmota-Farbeffekte (`Scheme`, Platz EFFECT der Farblampen-Vorlage) heißt jetzt `single colour, wake up, cycle colours up, cycle colours down, random` — sie wird in den Alias und den Sendepunkt geschrieben und bleibt dort, also ist sie englisch wie die Wertelisten der Geräte-Adapter; die Vorlage steht auf Version 7, ein bestehender Alias zeigt die Abweichung und bekommt die neue Liste mit „Auf Vorlage zurücksetzen“. Ein Sendepunkt, den die Werkbank anlegt, trägt jetzt fest die Beschreibung `created by the Alias Workbench` statt eines Texts in der Sprache dessen, der gerade klickte. Und die Beschreibungen im Dialog „Sendepunkte anlegen“ („Helligkeit 0 bis 100“ …) kommen aus den Sprachdateien, in allen elf Sprachen. Die Datei mit dem Befehlswissen hat englische Feldnamen.

### 0.14.0 (2026-11-22)
* **Datenpunkte im MQTT-Adapter anzulegen ist jetzt eine Einstellung, und ab Werk aus.** Die Tasmota-Helfer brauchen `cmnd`-Punkte unter `mqtt-client.0.…` — zum Nachfragen beim Gerät (`Status`, `TelePeriod`), für SetOption59 und als Sendepunkt eines Alias. Das liegt außerhalb des eigenen Bereichs der Werkbank (`alias.*`, `enum.*`); bei der Prüfung des Aufnahmeantrags wurde es bemängelt und als Ausnahme angenommen. Jetzt entscheidet, wer die Werkbank betreibt: *Datenpunkte im MQTT-Adapter anlegen und ändern erlauben* in den Instanz-Einstellungen. Ist es aus, sagt die MQTT-Karte das oben, und jeder Knopf, der dort schreiben würde, öffnet einen Dialog, der die Datenpunkte nennt, die entstehen würden, mit einem Knopf direkt in die Einstellungen — geschrieben wird nichts. Lesen, Erkennung und Aliase auf vorhandene Punkte gehen wie bisher. Die Einstellung wird vor jedem dieser Schreibwege frisch gelesen; einschalten wirkt also ohne die Werkbank neu zu laden. **Wer diese Helfer bisher benutzt hat: nach dem Update einmal einschalten.**
* **Die vier Einstellungen heißen jetzt englisch.** Aus `ikonRaeume`, `ikonFunktionen`, `ikonErsetzen` und `vorlagenVomAdmin` wurden `iconRooms`, `iconFunctions`, `iconReplace` und `templatesFromAdmin`. Die Prüfliste von ioBroker verlangt englische Objektnamen, wo sie vom Adapter selbst stammen — und diese tun es. Deutsch waren sie, weil die Werkbank so gebaut wurde, nicht weil es irgendetwas verlangt hätte.
* **Beim Start läuft einmal eine Umstellung, und die ist nicht freiwillig.** Bloß umzubenennen wäre stiller Schaden gewesen: `einst()` liest die Einstellungen aus dem Instanzobjekt, fände die alten Schlüssel nicht mehr und fiele auf die Vorgaben zurück — und die stehen bei allen vieren auf **an**. Wer eine abgeschaltet hatte, hätte sie ohne ein Wort wieder angehabt. Eine Instanz mit alten Namen öffnet deshalb beim Start einen modalen Dialog, der die Zahl nennt und sagt, dass es keinen Rückweg gibt. „Nicht jetzt" schließt ihn nicht; bis die Umstellung gelaufen ist, arbeitet die Werkbank nicht. Danach sind die alten Schlüssel weg, die Werte bleiben — eine abgeschaltete Einstellung bleibt abgeschaltet — und die eigenen Vorlagen im selben Objekt sind unberührt. Ein zweiter Lauf findet nichts.
* **Eine Stelle kennt die alten Namen, und nur eine.** Das ist `admin/js/migration.js`; jede andere Datei im Adapter kennt ausschließlich die englischen. Der andere Weg — überall beide Schreibweisen lesen — hätte 92 Stellen im Adapter bedeutet, jede eine zweite Wahrheit, und keine davon wäre je wieder verschwunden. Das Modul bleibt: nicht jede Installation aktualisiert nächste Woche, und es kostet nichts, wenn nichts passt.
* **Und ein Fallstrick, den erst das Einspielen zeigte.** `iobroker upload` trägt die Vorgaben aus `io-package.json` in bestehende Instanzen nach. Nach dem Einspielen stehen die vier englischen Schlüssel also schon da — mit ihrer Vorgabe **an**, nicht mit dem Wert des Nutzers —, während die alten noch danebenstehen. Der erste Entwurf hätte dem neuen Wert den Vorrang gegeben und damit genau den stillen Sprung gemacht, den die Umstellung verhindern soll. Jetzt gewinnt der alte Wert, und das Ergebnis hängt auch nicht mehr an der Reihenfolge der Schlüssel im Objekt. Am Produktivsystem gefunden, am Testsystem nachgestellt und belegt.
* **Und dieselbe Umstellung für die Aliase selbst.** Die Felder, die die Werkbank an ihre Aliase schreibt, hießen deutsch: `quelle`, `vorlage`, `vorlageVersion`, `ausZustand`, `geraetetyp`, `musterVonHand`, `vonHand`, `angelegtVon`, `attrappeAus`. Jetzt `source`, `template`, `templateVersion`, `templateState`, `deviceType`, `deviceTypeManual`, `manual`, `createdBy`, `mockedFrom`. Derselbe Dialog erledigt es beim Start und nennt die Zahl der betroffenen Objekte — gezählt wird nur, was eines unserer Felder trägt; ein von Hand im Admin gebauter Alias bleibt unberührt. Angefasst wird ausschließlich `native`: kein `common.alias`, keine Rolle, keine Formel, keine Einheit. Es bewegt sich kein Wert und es schaltet nichts. An 109 Objekten gegengerechnet — `common` blieb bei **allen** gleich, `native` änderte sich bei genau den 100 betroffenen. Bricht der Lauf ab, weil der Reiter geschlossen wird, nennt der Dialog beim nächsten Öffnen genau die übrigen.
* **Die Umstellung bleibt nicht mehr an einem inzwischen verschwundenen Objekt hängen.** Wurde ein Alias, den der Dialog nennt, vor dem Klick auf „Umstellen“ gelöscht, stand der Knopf für immer auf „Wird umgestellt…“: Das Objekt fehlte, ein Schritt warf, und der Lauf kam nie ans Ende. Jetzt wird jedes Objekt vor dem Schreiben frisch aus der Datenbank gelesen; ist es weg, wird es übersprungen, nicht mitgezählt und keinesfalls neu angelegt. Ein Schritt, der wirft oder 15 Sekunden lang keine Antwort bekommt, landet in der Fehlerliste, und die übrigen laufen weiter.
* **Ein halbfertiger Alias füllt nicht mehr das Protokoll.** Wählte man einen Alias, unter dem ein Punkt ohne `common.alias.id` liegt, abonnierte die Werkbank `alias.….*`; der Controller lehnt ein solches Muster als Ganzes ab, und der Admin schrieb bei jeder Auswahl `Error on "subscribeForeignStates": Alias … has no target` ins ioBroker-Protokoll. Jetzt werden die Punkte mit Ziel einzeln abonniert, der ohne bleibt außen vor — er hat keinen Wert, der sich ändern könnte.
* **Die eigenen Vorlagen liegen jetzt unter `templates`.** Bisher hieß der Schlüssel in der Instanzkonfiguration `vorlagen`. Umbenannt wird nur der Schlüssel — die Vorlage darunter bleibt Zeichen für Zeichen gleich. Ihre **Feldnamen** (`zustaende`, `rolle`, `typ` …) sind bewusst noch nicht dran: Sie lassen sich nicht über ein Muster erfassen, weil dieselben Wörter im Code auch anderes bedeuten — `z.typ` ist ein Vorlagenfeld, das danebenstehende `typ:` ein Entwurfsfeld, beide in derselben Zeile. Das wird ein eigener Schritt.
* **Das Vorlagenformat ist englisch — und besser benannt, nicht nur übersetzt.** Alle Felder einer Vorlage haben neue Namen: `points` statt `zustaende`, `detection` mit `required`, `forbidden`, `content` und `nameHint`, je Punkt `role`, `type`, `unit`, `read`, `write`, `readFormula`, `writeFormula`, `readFallback`, `offByDefault` und so fort. Wo eine Übersetzung zu wenig war, steht ein besserer Name: `priority` sagt, wozu die Zahl da ist (welche Vorlage gewinnt); `points` statt „states", weil das sich mit der Werteliste `common.states` und den Plätzen des Detektors verwechselt; `jsonField`, weil das Feld ein Pfad **in einem JSON** ist; `enumFunction`, weil `function` ein Schlüsselwort ist und die ioBroker-Aufzählung gemeint ist. Die 16 mitgelieferten Vorlagen sind umgestellt, **eigene Vorlagen stellt derselbe Startdialog um**, Inhalt für Inhalt. Eine alte exportierte Datei wird beim Einlesen **abgewiesen** — mit dem Satz, dass sie aus einer älteren Fassung stammt, statt mit einem rätselhaften „keine Zeilen". Die Tabelle der Feldnamen in diesem README ist nachgezogen.
* **Auch die Attrappen-Datei ist englisch.** „Als Attrappe ausgeben" schreibt jetzt `root`, `createdAt`, `createdBy`, `source`, `nativeIncluded`, `objects` und je Eintrag `path`, `virtual`, `value` (Format 2). Eine ältere Datei (Format 1) wird beim Einlesen mit dem Hinweis abgewiesen, sie neu auszugeben.
* **„SET hat schon SET“ heißt jetzt, was es meint.** Hält eine andere Zeile den Platz, auf den die Rolle zeigt, stand darunter „{Platz} hat schon {Zeile}“ — hießen beide gleich, las es sich wie Unsinn. Jetzt sagt der Satz, was es auslöst, woran es scheitert und was folgt: „Die Rolle „state“ macht ACTUAL zum Platz SET im Steckdose-Muster, aber den hat schon die Zeile SET. Deshalb zählt ACTUAL nicht zum Gerät.“ Danach entweder der Rat, einen anderen Platz zu wählen, oder — lesen beide Zeilen denselben Datenpunkt — „Beide lesen stat.POWER, ACTUAL zeigt also nur dasselbe noch einmal.“
* **Kein regulärer Ausdruck mehr unter „Rolle“.** Dort stand „passt auf /^switch(\.active)?$|^state$/ → Platz SET im Steckdose-Muster, erwartet boolean“ — das Erkennungsmuster des type-detector. Jetzt: „Mit der Rolle „state“ gehört die Zeile auf den Platz SET im Steckdose-Muster. Der Platz verlangt den Typ boolean.“ Am Gerät und im Vorlagenblatt. Ist der Platz schon belegt, entfällt die Zeile, weil der gelbe Satz darunter dasselbe sagt.
* **Ein bestehender Alias-Punkt findet wieder die richtige Vorlagenzeile.** Lesen zwei Vorlagenzeilen dieselbe Quelle — `hm-schaltaktor-lampe` hat SET (schaltet) und ON_ACTUAL (meldet nur), beide auf `1.STATE` —, gewann bisher die letzte. Ein schaltender Alias-Punkt `STATE` galt als ON_ACTUAL, trug „weicht von der Vorlage ab“, und „Werte der Vorlage übernehmen“ machte aus dem Schalter einen Melder ohne Schreibziel: nach dem Aktualisieren war das Licht nicht mehr schaltbar. Jetzt entscheidet die Schreibrichtung: ein schreibender Alias-Punkt nimmt die schreibende Zeile, ein lesender die lesende.
* **Der Musterwechsel benennt nicht mehr blind um.** Ein bestehender Alias, von Steckdose auf Licht umgestellt: aus dem Punkt `STATE` wurde `SET` (ein Aktualisieren hätte `STATE` gelöscht und `SET` neu angelegt), die abgehakte Schaltsperre `INHIBIT` wurde ein zweites `SET` mit der Rolle `switch.light`, und es standen drei Zeilen namens `SET` da. Jetzt bleiben abgehakte Zeilen, wie sie sind, eine Zeile, die schon im Alias steht, bekommt die neue Rolle, behält aber ihren Namen, und kein Name wird zweimal vergeben.
* **„Werte der Vorlage übernehmen“ nimmt das Muster der Vorlage mit.** Ein Alias, dessen Schalter die Rolle `switch` trägt, öffnet als Steckdose. Mit einer Licht-Vorlage übernommen wurde der Punkt `switch.light`, das Muster blieb aber Steckdose — deren SET nimmt nur `switch` —, und das Muster stand auf „nicht erkannt“. Jetzt stellt der Knopf auch das Muster auf den Gerätetyp der Vorlage, und der Kopf behauptet nicht, es sei von Hand gewählt.
* **Das Muster sagt, wenn die Vorlage ein anderes meint.** Ein bestehender Alias behält das Muster, das seine Rollen sagen — das ist die Wahrheit über ihn —, aber im Musterkopf steht jetzt „die Vorlage ist für Licht gebaut, der bestehende Alias ist als Steckdose angelegt“.
* **Der blaue Knopf wird unter der Maus nicht mehr weiß**, und die leere Zeile zwischen dem Musterhinweis und den Knöpfen darunter ist weg.
* **Zwei Knöpfe heißen, was sie tun.** „Werte der Vorlage übernehmen“ heißt jetzt **„Auf Vorlage zurücksetzen“** — was am Alias anders ist als in der Vorlage, wird wie in der Vorlage, das Muster eingeschlossen. „Freie Plätze vorschlagen“ heißt **„Fehlende Plätze raten“**, weil es eine Vermutung ist und kein Wissen. Dabei aufgefallen: in fünf Sprachen stand für den Rateknopf „kostenlose Spielautomaten“ (Spanisch, Französisch, Niederländisch, Polnisch, Chinesisch), in vier „kostenlose Plätze“ — alle neu übersetzt.
* **„Auf Vorlage zurücksetzen“ hakt auch an, was die Vorlage anhaken würde.** Ein bestehender Alias mit nur `STATE` bekommt `WORKING`, `LOWBAT` und `UNREACH` angehakt, wie die Vorlage es vorsieht; abgehakt wird nichts, kein Punkt des Alias verschwindet durch diesen Knopf. Die Zahl am Knopf zählt diese Zeilen mit.
* **Die Liste zeigt, was neu in den Alias kommt und was herausfällt.** Ein frisch angehakter Punkt sah aus wie einer, der schon im Alias steht; erst die Änderungskarte beim Aktualisieren sagte „neu“. Unter einem bestehenden Alias trägt jetzt jede angehakte Zeile, deren Punkt es noch nicht gibt, ein grünes „kommt dazu“, jede abgehakte, deren Punkt es gibt, ein rotes „wird entfernt“ — dieselbe Regel wie in der Änderungskarte.
* **Die Marken an den Zeilen beantworten eine Frage: was passiert beim Schreiben mit dem Punkt.** Unter einem bestehenden Alias: „kommt dazu“, „wird geändert“ (vorher „weicht vom gespeicherten Alias ab“; der Tooltip nennt die Felder, jetzt auch die Beschriftung), „wird entfernt“ — ohne Marke bleibt er, wie er ist. Die Marke „geändert“ ist weg: sie sagte nur „hier wurde geklickt“, stand doppelt neben „weicht vom gespeicherten Alias ab“ und blieb stehen, nachdem man einen Wert zurückgestellt hatte. Bei einem neuen Alias tragen die Zeilen keine solche Marke, dort ist alles neu; „weicht von der Vorlage ab“ geht jetzt auch dort, weil die Vorlagenwerte von Anfang an festgehalten werden.
* **Das orange Band bietet keine Zeile mehr an, die die Vorlage abgehakt hat.** Dort stand „INHIBIT passt auf SET, ist aber nicht angehakt — anhaken“: die Schaltsperre eines Homematic-Aktors hat die Rolle `switch`, angehakt wäre die Sperre der Schalter der Steckdose geworden. Eine Zeile, die die Vorlage standardmäßig weglässt, ist kein Ersatz für einen Pflichtplatz. Auch „Mit „Freie Plätze vorschlagen“ würde es greifen“ war auf den Rollen von vor dem Übernehmen gerechnet; die Aussicht wird jetzt verworfen, wenn sich die Zeilen ändern.

### 0.13.0 (2026-11-02)
* **Der type-detector ist jetzt 6.2.0, und damit kommt ein Gerätetyp dazu: `tv`.** Die Werkbank bietet deshalb 52 Muster statt 51, mit zwanzig Plätzen für einen Fernseher — `POWER`, `KEY`, `VOLUME`, `INPUT`, `APP`, `ART_MODE` und die übrigen. Unterwegs brachte 6.1.0 einen ES-Modul-Bau mit, und daher ist das ausgelieferte Bündel kleiner (66 KB statt 70). An der Verbrauchsrolle ändert sich gegenüber 6.0.3 nichts: beide Rollen werden erkannt, vorgeschlagen wird die aktuelle. Am 02.11.2026 über alle Muster gemessen: 752 Plätze statt 732, und die Rollenableitung bleibt unberührt — dieselben acht Plätze holen ihre Rolle aus dem Ausdruck, dieselben neunzehn haben keine.
* **Der Verbrauchspunkt trägt jetzt die Rolle, die richtig ist: `value.energy.consumed`.** Die Einheit ist Wh, also eine Energie und keine Leistung — sie gehört unter `value.energy.*` und nicht zu den Watt in `value.power.*`. Genau deshalb ist `value.power.consumption` in der Rollenliste von ioBroker durchgestrichen. Bis `@iobroker/type-detector` 6.0.2 ging es trotzdem nicht anders: das Muster `consumption` traf allein die durchgestrichene Rolle, und ein Punkt mit der richtigen fiel ohne ein Wort aus dem erkannten Gerät — die Steckdose wurde weiter erkannt, nur ohne ihren Verbrauch, und genauso kam sie bei vis, Alexa und im Gerätemanager an. Gemeldet als [Issue 334](https://github.com/ioBroker/ioBroker.type-detector/issues/334) samt Befund, behoben in PR 339, am 14.10.2026 als 6.0.3 veröffentlicht. Der Detektor nimmt jetzt beide Rollen, und die vier mitgelieferten Vorlagen (`messpunkt`, `tasmota-lampe`, `tasmota-mehrfach`, `tasmota-steckdose`) schreiben die richtige.
* **Was das kostet, offen gesagt — und wer inzwischen nachgezogen hat.** Einen Alias liest nicht die Werkbank, sondern jeder Adapter, der ihn liest, und jeder bringt seine eigene Detektor-Fassung mit — teils über npm, teils fest in sein Frontend eingebacken, wo keine `package.json` sie verrät. Eine ältere als 6.0.3 nimmt nur die durchgestrichene Rolle. Deshalb wurde die Umstellung drei Wochen zurückgehalten und am 02.11.2026 am Muster selbst nachgemessen, nicht an der Versionsnummer: Der **Gerätemanager** des Admin (ab 8.3.6, 29.10.2026) und **iobroker.devices** (ab 4.2.7, 25.10.2026) tragen die neue Rolle inzwischen in ihrem eingebackenen Bündel. **iobroker.matter** steht noch auf 1.3.1 vom 23.07.2026 und damit auf type-detector 5.0.15 — sein Hauptzweig verlangt aber schon `^6.0.1`, die nächste Freigabe hat es also von selbst. Wer einen älteren Leser benutzt, dem fehlt dort ein Verbrauchspunkt, der neu aus einer der vier Vorlagen entsteht. Bestehende Aliase bleiben unberührt: der Ausdruck nimmt die alte Rolle weiter, sie werden also so oder so erkannt.

### 0.12.0 (2026-10-14)
**Quelle tauschen**
* **Der Tausch fragt jetzt dieselbe Erkennung wie der Baum.** Die bisherigen Stufen gingen alle von der **alten** Quelle aus — Pfad, gemerkte Vorlage, Namen, Rollen. Dabei stellt der Tausch dieselbe Frage, die die Werkbank beim Anklicken eines Geräts ohnehin beantwortet: Welcher Punkt **dort** ist das `ELECTRIC_POWER`? Neu wird vor dem Raten der Entwurf der **neuen** Quelle gerechnet und über die Musterplätze zugeordnet — Vorlage zuerst, sonst der Detektor. Das trägt in **beide** Richtungen, und darauf kam es an: Zu einem Gerät, das seine Punkte beschriftet (Matter: `role: value.power`, `unit: W`), antwortet der Detektor; zu einem, das gar nichts beschriftet, die Vorlage. An `mqtt-client.0.SmartHome.PC_Jonas` gemessen: alle zehn Punkte ohne `common.role`, Typ `mixed`, der type-detector macht daraus `info` — aber die Tasmota-Vorlage weiß, dass `stat.POWER` der Melder ist und die Leistung in `tele.SENSOR` unter `ENERGY.Power` steht. Vorher fand ein Tausch von Matter zurück auf MQTT **0 von 7** Punkten, jetzt 6 von 7 samt getrennter Lese- und Schreibquelle.
* **Und die Formeln kommen mit.** Sie gehören zur Quelle, nicht zum Alias: `JSON.parse(val)?.ENERGY?.Power ?? null` beschreibt, wie man aus einer Tasmota-Telemetrie eine Leistung holt. Blieb sie beim Tausch auf Matter stehen, stand der Punkt still auf `null` — vier Messwerte leer, ohne jede Fehlermeldung, und `SET` hätte mit `val ? "ON" : "OFF"` einen String auf einen boolean geschrieben. Jetzt bringt jede Richtung ihre eigene mit: hin zu Matter keine, zurück zu Tasmota wieder die JSON-Formel.
* **Einen Punkt, den keine Stufe findet, kann man selbst benennen.** Bisher blieb nur „entfernen" oder stehenlassen. Die Zeile bietet jetzt eine Liste aller Punkte des neuen Geräts, mit Rolle und Einheit dahinter. Was man dort wählt, trägt die Marke „von Hand" und den Hinweis, dass **Formel, Einheit und Wertebereich bleiben, wie sie am Alias stehen** — über diesen Punkt weiß die Werkbank nichts, also ändert sie auch nichts daran.
* **Wechselt die Einheit, stehen die Zahlen daneben — entschieden wird nichts.** Tasmota liefert `ENERGY.Total` in kWh, Matter `CONSUMPTION` in Wh: derselbe Zähler, Faktor 1000, unsichtbar. Automatisch umgerechnet wird trotzdem nichts, denn die Beschriftung selbst ist unzuverlässig — Matter schreibt an `CURRENT` die Einheit `mA` und liefert Ampere (0,926 bei 245 W an 228 V). Eine Automatik, die der Beschriftung glaubt, hätte daraus 926 A gemacht. Stattdessen nennt die Zeile den Befund („am Alias A · neue Quelle: keine"), zeigt, was der Alias heute anzeigt, und bietet **zwei freie Felder**: Einheit und Faktor, beide auf dem Ist-Zustand. Das Ergebnis rechnet beim Tippen mit. Wo die Werkbank etwas weiß, steht ein Kürzel zum Anklicken daneben (`Wh`, `/ 1000`) — als Vorschlag aus der Beschriftung, prüfbar an den Zahlen darüber. Freie Felder, weil feste Knöpfe dort versagen, wo das Ziel **gar keine** Einheit trägt: Ein JSON-Sammelpunkt hat keine, sie steckt im Feld. Gezeigt wird das nur, wenn die **neue Quelle** etwas anderes liefert als die alte — beim Tausch zwischen gleichartigen Geräten steht dort nichts.
* **Beim Tausch wird die gemerkte Vorlage gegen die neue Quelle gehalten.** Ein Alias merkt sich, aus welcher Vorlage er entstanden ist, und die Werkbank wendet sie an, bis man sie ausdrücklich umstellt — beim baugleichen Ersatz genau richtig. Beim Tausch auf eine andere Bauart war sie es nicht, und das Schlimme daran war die Stille: Nach einem Tausch von einer Tasmota- auf eine Matter-Steckdose stand am Kanal weiter „Tasmota-Steckdose, erzwungen, ✕ cmnd.POWER" — und an den Punkten blieben die **Formeln** derselben Vorlage stehen. `JSON.parse(val)?.ENERGY?.Power ?? null` ist für ein Telemetrie-JSON gedacht; Matter liefert eine blanke Zahl, und der Punkt stand auf `null`. Vier Messwerte waren leer, ohne dass irgendwo ein Fehler erschien, und `SET` hätte mit `val ? "ON" : "OFF"` einen String auf einen boolean geschrieben. Neu prüft der Dialog die Merkung gegen das **neue** Gerät: passt sie weiter, bleibt alles; passt sie nicht, steht da warum, wie viele Punkte Formeln tragen und — falls eine andere Vorlage auf die neue Quelle passt — welche. Dazu ein vorbelegter Haken, der Merkung und Formeln mit entfernt. **Entschieden wird nichts automatisch**: Die Formel gehört zur Quelle, nicht zum Alias, und beim Rückweg auf MQTT wird sie wieder gebraucht — still zu löschen wäre derselbe Fehler wie still stehenzulassen. `native.geraetetyp` und das gesamte `common` bleiben unberührt; der Tausch ändert die Quelle, nicht das, was das Gerät ist.
* **Der Quellentausch fragt jetzt auch den Alias-Punkt selbst.** Bisher gingen alle drei Zuordnungsstufen von der **alten Quelle** aus — vom Pfad, von der Vorlagenzeile, vom Namen oder der Rolle des alten Datenpunkts. Das greift, solange beide Geräte ähnlich gebaut sind, und versagt vollständig, sobald sie es nicht sind: eine Tasmota-Steckdose auf eine Matter-Steckdose umzuhängen ergab **0 von 8** Zuordnungen, bei zwei Geräten, die dasselbe tun. Zweimal lag es an der Quelle, nie am Ziel — `mqtt-client` pflegt keine Rollen, und fünf der acht Punkte lesen aus **einem** Telemetrie-JSON. Dabei steht die Antwort fertig im Alias: `ELECTRIC_POWER` trägt `role: value.power`, und am neuen Gerät liegt genau ein Punkt dieses Namens mit dieser Rolle. Neu wird deshalb vor dem Raten der **Alias-Punkt** gefragt. Stimmen **Name und Rolle** und gibt es den Punkt genau einmal, gilt das wie ein Pfadtreffer und die Zeile trägt die graue Marke „aus dem Alias"; stimmt nur die **Rolle** und auch sie genau einmal, ist es ein Vorschlag mit „vermutet". Zwei Punkte gleicher Rolle heben sich auf, statt dass einer gewählt wird. Im gemessenen Fall sind das sechs von acht, verteilt auf **beide** Matter-Endpoints; `TODAY` und `YESTERDAY` bleiben leer, weil es sie am neuen Gerät nicht gibt.
* **Liest und schreibt ein Punkt am neuen Gerät auf derselben Kennung, darf er das auch.** Die Regel „das Schreibziel ist nie die Lesequelle" schützt vor einem geratenen Melder (`stat.POWER` statt `cmnd.POWER`). Wo ein einziger Punkt beides kann — `OnOffPlugInUnit-1.SET` bei Matter, `1.STATE` bei Homematic — war sie zu streng und meldete „kein Schreibziel gefunden" an genau dem Punkt, der dafür da ist. Die Ausnahme gilt nur für den belegten Treffer über den Alias-Punkt und nur, wenn beide Seiten schreibbar sind; ein Melder wie `ACTUAL` bekommt weiterhin keines.

**Baum**
* **Mehrere Zweige lassen sich als ein Gerät auswählen.** Manche Adapter verteilen ein Gerät auf Geschwisterzweige: Matter legt eine Steckdose als Ordner ohne eigene Datenpunkte ab, darunter zwei `device` — den Schalter im einen, die Messwerte im anderen. Der Ordner war nicht wählbar, und jeder Endpoint einzeln ergab ein halbes Gerät: am Schalter erkannte der Detektor eine Steckdose und bot die fünf Messwerte als „anzulegen" an, die es im Nachbarzweig längst gab. **Strg-Klick** nimmt jetzt einen Zweig dazu oder heraus; die Auswahl springt dabei auf den gemeinsamen Elternknoten, und alle beteiligten Zweige sind im Baum markiert. Dasselbe steht im **Rechtsklickmenü**, für alle ohne Tastatur, und im Kopf der rechten Seite als Knopf **„Nachbarzweige dazunehmen (N)"** — wo der Adapter es belegt, sagt der Tooltip warum (Matter schreibt an jeden Endpoint dieselbe Node-Kennung). Die Punktnamen werden dabei gekürzt, wo sie eindeutig sind: aus `OnOffPlugInUnit-1.SET` wird `SET`. Nicht bei Tasmota — dort ist der Zweig bedeutungstragend, und die Vorlagen adressieren `stat.POWER` und `tele.SENSOR`. **Automatisch zusammengefasst wird nichts**: unter einem Knoten können viele Geräte nebeneinander liegen, und was ein Gerät ist, weiß nur der Mensch.
* **Rechtsklick auf einen Knoten → „Als Attrappe ausgeben".** Alles unterhalb dieses Knotens wandert in eine Datei: die Objekte und die Werte, die sie gerade tragen. Der Zweck ist nicht das Sichern, sondern das Nachbauen — aus der Datei entsteht anderswo wieder ein Gerät, so dass sich eine Vorlage für ein Gerät bauen lässt, das man nicht besitzt. Was mitgeht, steht in einer Positivliste, nicht in einem Filter: `native` fällt vollständig weg, aus `common` bleiben nur `name`, `role`, `type`, `unit`, `read`, `write`, `min`, `max`, `def` und `states`. `states` muss mit, sonst erkennt der type-detector die Plätze mit `statesDefined` nicht. Die Pfade sind relativ zum ausgegebenen Knoten — darum trifft die Attrappe an einem anderen Ort dieselben Vorlagen. Ebenen ohne eigenes Objekt werden als solche vermerkt. 
* **Vor dem Ausgeben zeigt die Werkbank, was in die Datei geht.** Je Eintrag eine Zeile mit Wert, Pfad, Typ, Rolle und Name — und je Wert ein Kästchen: was nicht mitsoll, wird abgewählt, das Objekt bleibt trotzdem stehen. Werte, die wie eine IP, eine MAC oder eine Kennung aussehen, sind hervorgehoben. Darüber steht, was auch ohne `native` mitfährt: Kennungen stehen oft **auch im Pfad und in den Namen**, und `native` wegzulassen entfernt die nicht. Gemessen an einer Homematic-Zentrale: zwölf solcher Stellen, obwohl kein `native` in der Datei ist.
* **Und wieder einlesen.** Rechtsklick → „Attrappe einlesen …" nimmt so eine Datei und baut daraus wieder ein Gerät — **immer unter `0_userdata.0.wb-attrappe.<name>`, nie am Originalpfad.** Das ist keine Regel, sondern Bauweise: ein fremder Export kann so kein echtes Gerät überschreiben. Die Vorlagen greifen trotzdem, weil sie relative Namen prüfen (`stat.POWER`, `1.LEVEL`) und nicht die Wurzel. Vorher zeigt ein Dialog jedes Objekt, das entstehen würde, mit Name zum Ändern; eine Datei, die nicht passt, wird mit Begründung abgewiesen. Gemessen: ein HmIP Wandthermostat, ausgegeben und als Attrappe eingelesen, wird dort von derselben Vorlage erkannt — gleicher Gerätetyp, dieselben elf belegten Punkte.

### 0.11.0 (2026-10-11)
**Vorlagen**
* **Hinweistexte der Vorlagen sind Deutsch und Englisch.** Beschreibung, Erkennungshinweis und der Hinweis an jeder Zeile stehen als `{ "de", "en" }`. Der Reiter zeigt die Adminsprache, sonst Englisch, sonst Deutsch. Der Namenshinweis bleibt eine Suchmaske (`licht|lampe|light|…`): er prüft den Gerätenamen, und der folgt nicht der Adminsprache.
* **Ein Wörterbuch für Einstellungsseite und Reiter.** Beides liegt in `admin/i18n/`, alle elf Sprachen, gleiche Schlüssel. Der Reiter lädt dieselbe Datei. Eine unbekannte Sprache fällt auf Englisch zurück. Vorher hatte der Reiter ein eigenes Wörterbuch unter `admin/sprachen/`, nur Deutsch und Englisch.

**Kennungen**
* **Objektkennungen enthalten keine Umlaute mehr.** Eine Kennung darf nur Buchstaben ohne Akzent, Ziffern, `-` und `_` enthalten. Aus `Küche` im Namensfeld wird `Kueche` (`ä`/`Ä` zu `ae`/`Ae`, `ö`/`Ö` zu `oe`/`Oe`, `ü`/`Ü` zu `ue`/`Ue`, `ß` zu `ss`). Dasselbe gilt für „Ablegen unter“, den Verlege-Dialog und den Namen eines neuen Punkts. Punkte im Ordnerfeld bleiben, sie trennen die Ebenen. Einen Alias, dessen Kennung schon ein Ü trägt, lässt die Werkbank stehen, solange das Namensfeld nicht neu verlassen wird.
* **Raum und Funktion behalten den Umlaut.** Der Raum heißt weiter `Wohnküche`. Wird der Ablageort daraus übernommen, heißt der Ordner `Wohnkueche`, der Pfad `alias.0.Wohnkueche.…`.
* **Von Hand getippt bleibt der Raumvorschlag beim getippten Wort.** `Küche` in „Ablegen unter“ wird zum Ordner `Kueche`. Die Frage darunter nennt weiter den Raum `Küche`. Bestätigt man sie, entsteht `enum.rooms.Küche`, nicht `enum.rooms.Kueche`.

**Werteliste und Thermostate**
* **Mitgelieferte Vorlagen lassen sich jetzt Zeile für Zeile aufklappen**, zum Ansehen. Bisher war die Zeilenansicht den eigenen vorbehalten: wer sehen wollte, welche Ersatzquellen, Formeln oder Hinweise eine mitgelieferte führt, musste erst eine eigene Kopie anlegen — und hatte danach eine Kopie im Bestand, die er nie wollte. Alle Felder im Block sind gesperrt, durch bloßes Ansehen entsteht also kein Arbeitsstand.
* Die Marke **„muss da sein“** zeigt jetzt, ob die Zeile selbst Pflicht ist — nicht, ob ihr Lesepfad in der Erkennungsliste steht. Das sind zwei verschiedene Fragen, die unter einem Wort gezeigt wurden: an der HmIP-Heizgruppe stand eine Marke, wo vier Zeilen Pflicht sind, bei den Tasmota-Vorlagen stand gar keine. Dasselbe galt für das Häkchen in der aufgeklappten Zeile, es gab also nirgends in der Oberfläche die richtige Auskunft. Über alle 16 Vorlagen gezählt ändert sich bei 15 die Zahl — jeweils auf das, was in der Vorlagendatei steht.
* Dieses Häkchen hat beim Anhaken außerdem **heimlich die Erkennung mitgeändert**. An der Tasmota-Lampe hätte ein Haken an SET die Vorlage an `stat.POWER` gebunden — einen Punkt, den der MQTT-Adapter erst anlegt, wenn das Gerät einmal geschaltet hat. Es setzt jetzt nur noch das, was draufsteht; die Erkennungsliste wird im Kasten darüber gepflegt.
* Die Zeilenübersicht markiert Zeilen mit **Ersatz-Lesewegen** („+3 Ersatz“). Vorher stand dort nur der erste Weg, die übrigen sah man erst aufgeklappt.
* Das Feld **Gerätetyp** im Vorlagenblatt ist jetzt ein Suchfeld mit eigener Liste statt eines Klappmenüs mit 52 Einträgen. Tippen sucht über beide Namen — `socket` und „Steckdose“ finden dasselbe —, so wie es die Musterwahl beim Alias seit jeher kann. Ein Klappmenü lässt sich nicht durchsuchen, und weil die Beschriftung mit dem deutschen Namen beginnt, fand die Tipp-Navigation des Browsers den Rohnamen nie.
* Die Detailzeile hat jetzt ein Feld **Werteliste** (`common.states`). Bisher ließ sie sich nur von einer Vorlage erben — nicht ansehen, nicht anlegen, nicht ändern, obwohl die Werkbank sie die ganze Zeit mitgeschrieben hat. Hat die Quelle eine und der Entwurf nicht, bietet ein Knopf die Übernahme an, und bei „ergibt“ steht der Text zum Wert statt der nackten Zahl. Beide Abweichungsvergleiche nehmen sie mit; gegen den Bestand in beide Richtungen, damit eine vorhandene Liste nicht mehr stillschweigend verschwinden kann.
* **Behoben**: Die HmIP-Vorlagen für Heizkörperthermostat und Heizgruppe lasen die Ventilstellung aus `1.VALVE_STATE`. Das ist bei HmIP ein Zustandscode 0–8 (ADAPTION_DONE, TOO_TIGHT, ERROR_POSITION, …) und kein Prozentwert — ein Thermostat mit Code 4 zeigte „4 %“. Sie lesen jetzt `1.LEVEL`, das die Heizkörpervorlage zur Erkennung ohnehin schon verlangt.

**MQTT**
* Die Karte sagt jetzt, ob sich das Gerät meldet: ein roter Chip „offline", wenn der Broker das Testament veröffentlicht hat, ein gelber „meldet sich nicht", wenn das Gerät sich als online ausgibt, aber seit drei Telemetrietakten nichts geschickt hat, und gar nichts, wenn es keine Auskunft gibt. Als offline gilt nur, was ausdrücklich offline sagt — andere Firmwares benutzen andere Wörter, und ein unbekanntes heißt „weiß ich nicht", nicht „weg". Ein retained gemerktes „Online" kann Jahre alt sein: ein Gerät, das ein Jahr durchläuft, wiederholt es nie.
* „Beim Gerät nachfragen" holt jetzt auch die IP-Adresse und den Telemetrietakt, und der Knopf erscheint, sobald eines der drei fehlt — nicht mehr nur bei unvollständiger Befehlsliste. Von sich aus nennt das Gerät beides nirgends: die IP nur in `tele/INFO2` (kommt einmal beim Start) oder in `stat/STATUS5` (nur auf Abruf), den Takt überhaupt nur auf Abruf. Bisher gab es an einem Gerät mit vollständiger Befehlsliste gar keinen Knopf und damit keinen Weg, an beides zu kommen.
* Der Telemetrietakt wurde aus `tele/STATE` gelesen, wo Tasmota ihn nicht hinschreibt — über 36 Geräte nachgezählt, kein einziges trug das Feld. Er wird jetzt abgefragt und gemerkt, damit der SetOption59-Hinweis die wirkliche Zahl nennt statt sie wegzulassen.
* `Status 5` wird jetzt zweimal gefragt, wie `Status 11`: beim Erstkontakt legt der MQTT-Adapter nur das Antwortobjekt an und verwirft den Wert. Am Broker mitgeschnitten — die Antwort wurde veröffentlicht, der Wert kam nie an.
* Eine Tasmota mit dem werkseitigen FullTopic `%prefix%/%topic%/` gilt jetzt als ein Gerät. Die MQTT-Adapter bilden das Thema eins zu eins auf den Objektpfad ab, ein solches Gerät liegt deshalb verteilt auf `tele.<Name>`, `stat.<Name>` und `cmnd.<Name>`, ohne einen Knoten, der es zusammenhält — die MQTT-Karte erschien gar nicht, und ein eine Ebene höher angelegter Sendepunkt hätte sich mit dem nächsten Gerät am selben Präfix dieselbe Kennung geteilt. Beide Bauformen ergeben jetzt dieselben relativen Namen, die mitgelieferten Vorlagen greifen also unverändert, und die Karte sagt, aus wie vielen Zweigen sie zusammengefasst hat.
* Als Präfix zählen nur die Werksnamen `cmnd`/`stat`/`tele`. Ein struktureller Rückfall für umbenannte hat an einer echten Anlage Fremdes zusammengeworfen — die L1-Phasen von acht verschiedenen Stromquellen landeten in einem Gerät —, und Victron-Daten und ein umbenanntes Tasmota sind im Objektbaum nicht zu unterscheiden.
**Aufzaehlungen vom Admin**
* **Der Raum- und Funktionskatalog kommt auch unter Admin 8.0.x wieder an.** Der Admin bringt 58 Raum- und 62 Funktionsvorlagen mit, mehrsprachig und mit Bild; die Werkbank liest sie aus seinen Buendeln, statt eine eigene Kopie zu pflegen. Seit Admin 8.0.x liegen sie an anderer Stelle und in anderer Schreibweise — nicht mehr als JSON-Text in einem eigenen „Enums"-Baustein, sondern als gewoehnliches JavaScript in einem Sammelmodul von knapp acht Megabyte. Zwei Dinge standen im Weg: eine Groessengrenze von drei Megabyte uebersprang ausgerechnet die richtige Datei, und das Suchmuster verlangte `JSON.parse`. Beide Bauarten werden jetzt gelesen. Wer unter Admin 8 nur den Bestand in der Auswahl sah statt 120 Vorlagen, bekommt sie wieder — unter Admin 7 aendert sich nichts.
* Das Ergebnis liegt danach **im Dateibereich des Adapters** und wird erst wieder geholt, wenn der Admin seine Buendel neu schreibt; erkannt an den Namen der Buendel, nicht an der Versionsnummer, damit auch ein Zwischenbau auffaellt. Solange geholt wird, sagt ein Hinweis unten rechts, warum es einmalig ein paar Sekunden dauert. Zur Ablage legt die Werkbank beim ersten Mal ein Objekt `alias-workbench.0` vom Typ `meta` an — den Dateibereich gibt es sonst nicht, weil die Werkbank keinen Dienstteil hat.
* **Auch die Musternamen kommen jetzt aus der Ablage.** `socket` → „Steckdose“ holt die Werkbank ebenfalls beim Admin, weil der type-detector nur rohe Typnamen kennt — und seit Admin 8 steht diese Karte im selben Sammelmodul wie der Raumkatalog. Beide teilen sich jetzt eine Ablage, es wird also einmal geholt statt zweimal. Gemessen beim zweiten Öffnen des Reiters: **404 statt 2 255 KB unter Admin 8.0.14**, 419 statt 864 KB unter Admin 7.8.23, in beiden Fällen kein Abruf über 100 KB. Mitgenommen werden gleich beide Oberflächensprachen, damit ein Sprachwechsel den Abruf nicht erneut auslöst.
* **Behoben: Der Chip „n Quellen“ zählte ein Gerät doppelt**, wenn ein Alias aus zwei Knoten liest, von denen einer unter dem anderen liegt. Zusammengefasst wurden bisher nur Geschwister — `…Solar_Balkon.stat` und `…Solar_Balkon.tele` also richtig, `…inverter.HM600.ch0` und `…inverter.HM600` aber nicht. An `Solar.Balkon.Einspeisung` stand deshalb „4 Quellen“, obwohl der HM600 ein einziger Wechselrichter ist. Jetzt zählt auch eine Quelle, die unter einer anderen liegt, zu dieser — unter derselben Bedingung wie bisher: nur wenn der tiefere Knoten kein eigenes Objekt hat (so legt MQTT seine Kennungsebenen an) oder der Vorfahr ein `device` ist (so liegen die Homematic-Kanäle). Zwei `channel` mit eigenen Objekten bleiben getrennt, auch wenn einer unter dem anderen liegt — das sind zwei Geräte.
* **Behoben: ein deutscher Rest im englischen Reiter.** In der Änderungskarte stand bei einer von Hand angelegten Zeile ohne Namen „(ohne Namen)“ — fest eingetragen statt übersetzt, mitten in sonst durchweg englischer Oberfläche. Der Text kommt jetzt aus den Sprachdateien (`diff.noName`).

### 0.10.0 (2026-09-20)
**Erkennung und Muster**
* Ein anderes Muster zu wählen setzt die Haken neu und lässt sie stehen, solange das neue Muster noch nicht greift.
* Beim Vorschlagen bekommt jeder Datenpunkt nur einen Platz, und eine widersprechende Einheit schließt einen Platz aus — eine Startverzögerung in Sekunden wird keine Ist-Temperatur.
* Das Musterfeld nennt, was wirklich fehlt, auch als Gruppe („SET / SET_HEATING / SET_COOLING“). Die Legende sagt, warum ein Muster nicht greift, und bietet den passenden Knopf gleich an.
* Der Hinweis „… würde evtl. besser passen“ empfiehlt nur noch Muster, die danach auch greifen.
* Bei „Information“ steht „✓ 24 Punkte“ statt „24/31 belegt“ — dieses Muster nimmt beliebig viele Punkte auf.
* Die Meldung „Kein übriger Datenpunkt passt“ steht nicht mehr über der orangen Legende und nennt die von Hand entschiedenen Zeilen beim Namen.

**Freie Plätze**
* Ein Platz lässt sich nur einmal anlegen, und jeder Platz steht nur einmal in der Liste.
* „Freie Plätze vorschlagen“ steht jetzt im blauen Kasten bei der Erkennung; der Knopf für den ganzen Bestand heißt „Alle Datenpunkte des Geräts laden“ und steht über der Liste.

**Die Detailzeile eines Punkts**
* Neu: „Name“ und „Platz im Muster“ — der Platz trägt Rolle, Typ, Einheit und Werteliste ein.
* „liest aus“ und „schreibt auf“ sind breiter, die Formel heißt „Leseformel“ und steht darunter.
* Gehört der Platz schon einer anderen Zeile, sagt die Werkbank das, statt einen falschen Typ anzumahnen. Ein reiner Messwert bekommt kein Schreibziel mehr.

**Vorlagen**
* „Werte der Vorlage übernehmen“ löscht keine Werteliste mehr.
* Eine Vorlage ohne Namen lässt sich einlesen und dann auch benennen.
* Eine weggelassene Zeile nennt den Grund: Punkt fehlt, kein JSON, oder Feld fehlt.
* „Vorlage aktualisieren“ lässt die Erkennung, wie sie war; eine ausgegebene Vorlage lässt sich wieder einlesen.

**Quellentausch**
* Scheitert ein Punkt, bleibt der Vermerk am Alias auf der alten Quelle — der Tausch lässt sich danach zu Ende bringen.
* Der ausgegraute Knopf nennt seinen eigenen Grund.
* Der Hinweis „eine Ebene höher“ erscheint nur noch, wo er hilft.

**Löschen und Verlegen**
* Der Löschdialog warnt nur vor Kanälen, die wirklich unter dem Alias liegen.
* Nach dem Verlegen kennt die Quelle ihren Alias sofort wieder; „zur Quelle →“ springt nicht mehr ins Ungefähre.

**Raum und Funktion**
* Ein Raum wird auch mitten im Gerätenamen gefunden („Heizung_Badezimmer INT0000001“).
* Mit der Tastatur gewählt wirkt wie mit der Maus, und das Angebot „auch unter … ablegen?“ braucht keine eigene Zeile mehr.
* Fehlen Räume und Funktionen, sagen das die Felder selbst.

**Tasmota und MQTT**
* Die IP wird auch bei älterer Firmware gefunden (`tele.INFO2` in beiden Formen).
* Die Karte behauptet nicht mehr, ein abgeschalteter Punkt sende; „senden erlauben“ schaltet die Verknüpfung gleich mit ein.
* Mehrere Sendepunkte auf einmal anzulegen ergibt dieselben Objekte wie einzeln — `POWER`, `Fade` und `LedTable` als `mixed`, damit die Schreibformel wirkt.
* Ein HomeMatic-Aktor ohne Vorlage bringt keinen Wartungskram mehr mit.
* „nachfragen“ bei SetOption59 wertet nur, was nach dem Senden kam; bleibt die Antwort aus, steht „Keine Antwort …“ da, und der Knopf bleibt zum Nachprüfen stehen.
* Die Karte „MQTT-Gerät“ klappt auch an Geräten ohne Zeile aus `tele/…` wieder auf.

**Anzeige**
* Die Zahl am Baumknoten zählt, was darunter liegt.
* Ein Knoten ohne eigenes Objekt trägt „VIR“, die Geräte-Karte sortiert wie der Baum.
* Ein Taster liest mit und bleibt ein Taster; die irreführende Marke „ändert sich nie“ ist weg.
* JSON-Felder mit einem Punkt im Namen lassen sich auswählen.

Alle Änderungen im Einzelnen, mit Ursache und Messung: [docs/aenderungen-ausfuehrlich.md](/#/docs/adapterref/iobroker.alias-workbench/docs/aenderungen-ausfuehrlich.md).

### 0.9.12 (2026-09-18)
* Die kleinen **Typkästchen im Baum** (DEV, CHA, FOL …) sind jetzt alle gleich breit. Ein Knoten ohne eigenes Objekt trägt dort nur einen Punkt, und sein Kästchen war schmaler — der Name rückte aus der Flucht.
* **„Verlegen …“ tat an manchen Aliasen gar nichts.** Wer Aliaspunkte von Hand im Admin anlegt, bekommt oft einen Alias ohne eigenes Kanalobjekt — der Knoten steht im Baum, ist aber selbst kein Objekt. Die Werkbank zeigte dort den Knopf „Verlegen …“ an, ein Klick darauf öffnete aber keinen Dialog und sagte auch nichts. Jetzt wird so ein Alias beim Verlegen genauso behandelt wie einer mit Kanal; ein fehlender Kanal wird dabei nicht nachträglich angelegt.
* **Kein Deutsch mehr in der englischen Oberfläche.** An drei Stellen stand fest verdrahtet Deutsch: die Typmarke in der Detailzeile („Zahl“), das Feld „Datenpunkt“ bei „schreibt auf“ und die Vorlesehilfe der Häkchen („SET anlegen“). Die festen Vorgabetexte in `tab.html` sind jetzt englisch — vorher waren es 44 deutsche Texte, die erst zur Laufzeit übersetzt wurden. Auch die zwei Meldungen in der Browserkonsole sind jetzt englisch.
* Der **Menüeintrag** des Reiters heißt jetzt in allen elf Admin-Sprachen so wie der Adapter. Bisher gab es ihn nur auf Deutsch und Englisch; bei jeder anderen Sprache stand „Alias Workbench“.
* **Warum `value.power.consumption`** — vier mitgelieferte Vorlagen geben dem Verbrauch diese Rolle, die in der Rollenliste von ioBroker als veraltet gilt. Das ist Absicht: der type-detector 6.0.x erkennt den Verbrauch nur mit genau dieser Rolle. Der Grund steht jetzt in jeder betroffenen Vorlage (Feld `_rolle`) und im README. Dazu erklärt das README, warum die Werkbank ein Admin-Reiter ist und keine Einstellungsseite.
* **Die Objektzahl in der Kopfzeile wuchs, je länger der Reiter offen war.** Gezählt werden sollen nur Geräte, Kanäle, Ordner und Datenpunkte — so wird auch geladen. Beim Nachziehen nahm die Werkbank aber jede geänderte Art auf: nach dem Umstellen der Systemsprache stand `system.config` im Vorrat und die Zahl auf 3146 statt 3145, ebenso nach jeder gespeicherten Instanzeinstellung oder einem Adapter-Update. Jetzt gilt beim Nachziehen dieselbe Regel wie beim Laden.
* **Werte aus einem anderen Knoten liefen an einer Quelle nicht mit.** Wählt man eine Quelle, zu der es schon einen Alias gibt, zeigt die Liste auch dessen Zeilen — und die lesen oft woanders. Am Stromzähler stehen drei Zeilen „aus Solar.Netz“: Bezug, Bezug geglättet und Hausverbrauch. Ihr Wert wurde beim Anklicken einmal geholt und stand danach still, gemessen stundenlang auf 428 W, während das System 22 W meldete. Abonniert war nur der angeklickte Knoten; die Quellen der Zeilen kamen nur im Modus „Alias bearbeiten“ dazu. Jetzt abonniert die Werkbank überall, was sie anzeigt — auch eine Quelle, die man in der Detailzeile von Hand auf einen anderen Knoten stellt. Die Kopfleiste zeigt am Stromzähler entsprechend zwei Abos statt einem.
* Die Legende über der Liste behauptete **„Das Licht-Muster greift gerade nicht: SET verlangt boolean, eingestellt ist number. Deshalb hat keine Zeile einen Platz."** — an einem Gerät, dessen SET-Zeile `switch.light`/`boolean` trägt und völlig in Ordnung ist. Schuld war `0_AES_KEY`: hm-rpc vergibt dafür die Rolle `state` und den Typ `number`, und `state` ist beim Licht-Platz SET zugelassen. Die Prüfung fragt je Zeile „deine Rolle taugt für einen Platz, dein Typ aber nicht" — sie sieht nicht nach, wer den Platz am Ende bekommen hat, und die Meldung schrieb dann den PLATZ hin statt der Zeile, um die es ging. Der Satz stimmte auch hinten nicht: fünf Zeilen hatten sehr wohl einen Platz. Der Typ-Grund gilt jetzt nur noch, wenn der genannte Platz auch wirklich leer geblieben ist; sonst steht wieder die gewöhnliche Legende da, und alle platzlosen Zeilen sind getönt statt nur einer. Der Fall, für den die Meldung gebaut wurde — SET selbst im falschen Typ, Platz bleibt leer — bleibt unverändert.
* Zeilen trugen **„weicht von der Vorlage ab"**, wo gar keine Vorlage in Kraft war — und markierten dabei ausgerechnet den besseren Wert. Verglichen wurde in Wahrheit gegen den Rohentwurf, also gegen die blanke Rolle des Quellpunkts: an einem Schaltaktor stand nach „— keine Vorlage —" an `SET` die Marke und darunter „Die Vorlage will hier: **switch**", während im Alias `switch.light` steht, was auf das Muster `light` sogar passt. Dasselbe an `UNREACH`, wo `indicator.maintenance.unreach` als Abweichung galt und `indicator.unreach` als Sollwert. Und es traf nicht nur den abgewählten Fall: an einem Gerät, zu dem **nie** eine Vorlage gefunden wird, erschien dieselbe Marke. Jetzt gilt: ist keine Vorlage in Kraft — abgewählt oder nie gefunden —, entsteht kein Vorlagenwert, und damit fallen Marke, Detailzeile, der `←`-Knopf und der Filterknopf **Vorlage** weg. Die Zeilen behalten, was im Alias steht; das ist die Bestandsregel und hängt nicht an Vorlagen. Mit Vorlage bleibt alles, wie es war — eine echte Abweichung wird weiter angezeigt.
* Bei **„— keine Vorlage —"** blieb der **Ausgang**-Kasten stehen, wenn man von der Mehrfachvorlage kam — kam man über eine andere Vorlage, war er weg. Zwei Wege, zwei Antworten am selben Gerät. Schlimmer: wer den stehengebliebenen Kasten benutzte, holte die abgewählte Vorlage **kommentarlos zurück** (gemessen: nach dem Umschalten auf `Licht_Esstisch` stand wieder „Homematic Schaltaktor mit mehreren Ausgängen" im Feld). Ein Ausgang gehört nicht zum Gerät, sondern zum `mehrfach`-Block der Vorlage — ohne ihn gibt es keinen Platzhalter und damit nichts zu wählen; von 17 mitgelieferten Vorlagen tragen genau zwei so einen Block. Der Rohentwurf erbt ihn jetzt nicht mehr, und die Kanäle laufen über „Unterordner je Kanal". **Und angehakt ist jetzt alles.** Bisher hakte der Rohentwurf an, was im erkannten Muster einen Platz hat; an zwei **gleichartigen** Kanälen nahm der Detektor einen davon — und zwar den zweiten, so dass `Licht_Esstisch` angehakt dastand und `Licht_Bar` leer. Welcher es wird, ist Zufall, und danach zu raten ist nicht die Aufgabe eines Entwurfs ohne Vorlage: wer sie abwählt, will die Punkte selbst aussuchen.
* Der Aufklapper im Vorlagenkasten hieß **„Warum diese Vorlage +"** und wollte immer an den rechten Rand. Bei einem langen Namen und zwei Marken — „Homematic Rollladenaktor", von Hand gewählt, erzwungen — fand er dort keinen Platz mehr und nahm sich eine **eigene Zeile**; der Kasten wuchs, ohne dass etwas dazugekommen war. Jetzt steht dort ein **Fragezeichen** und der Satz im Tooltip. Was weggelassen wurde, bleibt als kurze Marke sichtbar (`4 OHNE QUELLE`) — dass Punkte fehlen, soll niemand erst suchen müssen —, und der Satz dahinter heißt jetzt herum „4 weggelassen, weil die Quelle fehlt" statt „Weggelassen, weil die Quelle fehlt: 4". Die Kopfzeile bricht überhaupt nicht mehr um: Platz macht der Vorlagenname, der gekürzt wird und vollständig im Tooltip steht; die Kennung bleibt stehen, denn `hm-rollladen…` ist keine Kennung mehr. Aufgeklappt ist das Fragezeichen gefüllt.
* **Ein Taster ist nicht jeder Punkt, der nur schreibt.** Die Werkbank liess die Lesequelle bei jeder Zeile weg, deren Quelle `read: false` trug. Homematic vergibt dieses Merkmal aber für zweierlei, gezählt über alle Geräte im Haus: für den Tastendruck (`PRESS_SHORT` 100 Punkte, `RAMP_STOP` 3, `STOP` 1, `OLD_LEVEL` 3 — alle mit `native.TYPE: ACTION`) **und** für eine Vorgabe, die stehen bleibt (`ON_TIME` 20 Punkte, `RAMP_TIME` 3 — `TYPE: FLOAT`). Am Wohnzimmer-Dimmer stand deshalb an `ON_TIME` „ändert sich nie" und das Feld „liest aus" war leer — bei einer Zahl in Sekunden, die man auch mal direkt an der Quelle setzt. Nachgemessen: Alias auf `1.ON_TIME` gelegt, die Quelle direkt auf 30 gesetzt, der Alias zeigte 30. `read: false` sperrt das Lesen also nicht. Die Lesequelle bleibt jetzt nur noch dort leer, wo wirklich ein Tastendruck gemeint ist: `native.TYPE: ACTION` oder eine Rolle, die mit `button` beginnt. `OLD_LEVEL` ist der Fall, an dem die Rolle nicht reicht — sie heißt `value.dimmer`.
* **„— keine Vorlage —"** steht jetzt in der Vorlagenwahl. Hatte die Werkbank eine Vorlage erkannt, liess sie sich nur gegen eine andere tauschen, nicht weglassen: der erste Eintrag der Liste war eine blosse Überschrift mit leerem Wert, und der Zweig stieg bei leerem Wert sofort aus. Wer alle Punkte eines Geräts ohne Vorlagenvorgaben anlegen wollte, kam nicht hin. Jetzt baut die Wahl den Entwurf ohne jede Vorlage neu auf — angehakt ist, was im erkannten Muster einen Platz hat — und Ziel, Ordner, Name, Raum und Funktion bleiben stehen.
* Die Marke an einer Zeile, deren Quelle nur schreibt, hiess **„meldet nichts"**. Das klang nach einer Störung — als wäre das Gerät stumm. Gemeint ist etwas anderes: der Wert steht da, wo man ihn hingeschrieben hat, und er meldet sich nicht von allein zurück. Sie heißt jetzt **„ändert sich nie"**, und dasselbe in der Prüfung „Ziel liest nicht".
* **„Unterordner je Kanal"** — der Knopf neben „als ein Gerät erzeugen" hat einen anderen Zweck als dieses, und das stand nirgends: er **bildet die Ordnerstruktur der Quelle ab**. Ein Behälter für das Gerät, darunter je Kanal einer, darunter die Punkte. **Jetzt bestimmen die Haken, was entsteht**: ein Unterordner für jeden Kanal, aus dem mindestens eine angehakte Zeile stammt, und darin genau diese Zeilen. Vorher baute der Weg je Kanal einen frischen Entwurf und hakte an, was das Muster des Kanals hergab — es entstand, was niemand gewählt hatte (am Testgerät bekam der Wartungskanal drei Punkte statt der zwei angehakten), und Kanäle, aus denen nichts gewählt war, entstanden trotzdem. Handeingaben an einer Zeile — Rolle, Typ, Einheit, Formel, Beschriftung — wandern jetzt mit. **Informationskanäle zählen mit**: bisher fielen sie heraus, und am Geschirrspüler sagte der Knopf „3 Stück", während im Baum daneben sechs Kanäle standen — wer `general` einzeln anklickte, bekam längst einen Entwurf („Information ✓ 7/14 belegt") und durfte ihn anlegen. **Der Wartungskanal bekommt einen eigenen Ordner**, statt in jeden Ausgang hineinkopiert zu werden: `UNREACH` gibt es am Dimmer nur in Kanal 0, also gehört es dorthin; wer es beim Licht mit drin haben will, nimmt „als ein Gerät erzeugen". Das Verteilen hatte Unsinn produziert — 206 Rohdatenpunkte eines Rasenmähers in jedem der vier Entwürfe, die drei Emeter-Phasen eines Shelly SHEM-3 als „gemeinsam" statt als eigene Kanäle. **Virtuelle Kanäle fallen von selbst weg**: an einem Homematic-Dimmer ist in den beiden `VIRTUAL_DIMMER`-Kanälen nichts angehakt, also entsteht dort nichts. **Punkte direkt am Gerät** bleiben im Behälter, der dann als Kanal statt als Ordner entsteht. **Und der Hinweis stimmt wieder**: er rechnete `zielOrdner + Kanal`, geschrieben wird `zielOrdner + Gerät + Kanal` — am Geschirrspüler versprach er `alias.0.Befehle` und legte `alias.0.Geschirrspüler.Befehle` an, am Wohnzimmer-Dimmer las man `alias.0.1`, `alias.0.2`, `alias.0.3`. Jetzt nennt er Kennung, Zahl der angehakten Punkte und erkannten Typ. Die Beschriftung sagt es auch: „Unterordner je Kanal, N Stück …" statt „je Kanal ein Gerät"
* An einem **Mehrfachgerät** übernahm der Entwurf die Haken eines fremden Alias. Die Werkbank fragte „gibt es für dieses Gerät schon einen Alias?" und antwortete mit dem, der **am häufigsten** aus dem Gerät liest. An Ricardos Steckdosenleiste ist das der Verbrauchsalias mit sechs Punkten aus `tele.SENSOR` — er schlug `RF1000` mit zwei Punkten aus `stat.POWER1`. Für Ausgang 1 standen danach ELECTRIC_POWER und CONSUMPTION angehakt da, SET nicht, und das Musterfeld meldete **„✕ SET fehlt"** an einem Gerät mit funktionierendem SET. Die Mehrheitsregel ist an einem Gerät mit einem Ausgang richtig und an einem Mehrfachgerät die falsche Frage. Richtig ist: **gehört dieser Alias zu dem Ausgang, der gerade gewählt ist?** Erkannt wird das nicht an Namen, sondern an der Vorlage — welche ihrer Pfade tragen den Platzhalter? Genau die unterscheiden die Ausgänge (`stat.POWER%N%`, `cmnd.POWER%N%`), alles andere (`tele.SENSOR`, `tele.LWT`) ist allen gemeinsam. Damit fällt auch die Falle aus I31 weg: `tele.INFO2` trägt zwar eine Zwei, aber keinen Platzhalter. Für Ausgang 1 zählt zusätzlich das blanke `cmnd.POWER` — bei Tasmota ist POWER ohne Nummer ein Zweitname für POWER1, am Gerät nachgemessen: eine Abfrage an `cmnd/POWER` wird mit `{"POWER1":"ON"}` beantwortet, ein Thema `stat/POWER` gibt es nicht. **Der Fehler traf nur den ersten Blick**: Über den Baum kam der falsche Bestand, beim Umschalten des Ausgangs wurde gar nicht erst gefragt und die Vorlagenvorgaben gewannen — derselbe Ausgang sah je nach Weg anders aus. Jetzt stellen alle drei Wege dieselbe Frage. Geräte mit einem Ausgang laufen per Bauart nie in den neuen Zweig; `aliasFuer` verhält sich ohne das neue Argument Zeile für Zeile wie bisher.
* **Die Zielzeile folgt jetzt demselben Alias.** Sie stand am Mehrfachgerät immer auf der Ausgangsnummer — `alias.0.Bastelzimmer.Steckdosenleiste.POWER1`, eine Kennung, die es gar nicht gibt — und meldete „wird neu angelegt", während `RF1000` danebenstand. Wer geklickt hätte, hätte einen zweiten Alias neben seinen gesetzt. Im Quelltext stand als Begründung: „Wie der einzelne Ausgang heisst, kann die Werkbank nicht wissen." Das galt, solange sie nur nach dem Gerät fragen konnte. Jetzt zeigt die Zielzeile auf `…Steckdosenleiste.RF1000` mit dem Abzeichen „gibt es schon", und „Alias aktualisieren" trifft ihn. Gibt es für den Ausgang noch nichts — die Garten-Ventilinsel —, bleibt es beim Vorschlag aus der Ausgangsnummer und bei „wird neu angelegt".
* Der Hinweis zu **SetOption59** stand an jedem Tasmota-Gerät, auch wo er folgenlos ist. Er behauptete, ein Alias zeige „nach dem Schalten minutenlang den alten Wert" — an der Steckdosenleiste liest aber keine einzige Zeile aus `tele/STATE`, alle lesen aus `stat.POWERn`, und das schickt das Gerät bei jedem Befehl sofort (gemessen: 1,07 s). „Minutenlang" unterstellte obendrein die Tasmota-Vorgabe von 300 Sekunden; an der Leiste sind es zehn (gemessen: `tele/STATE` im Zehnsekundentakt). Der Block erscheint jetzt nur noch, wenn wirklich eine Zeile aus `tele/…` liest **und** nach `cmnd/…` schreibt, nennt diese Zeilen beim Namen und liest den Takt aus `TelePeriod`; steht er nicht im Telegramm, sagt der Text „im Telemetrietakt" statt einer erfundenen Zahl. Dasselbe gilt für den Chip in der Kopfzeile. Und die Prüfung „Rückmeldung kommt sofort" meldet nicht länger „alle in Ordnung", wo es nichts zu prüfen gab, sondern **„betrifft keine Zeile — alle lesen aus stat/…"** mit grauem Punkt statt Haken. Karte und Prüfung fragen dieselbe Funktion und können nicht mehr auseinanderlaufen.

Ältere Einträge: [CHANGELOG_OLD_de.md](https://github.com/RicardoHipp/ioBroker.alias-workbench/blob/main/CHANGELOG_OLD_de.md).

## Lizenz

MIT-Lizenz

Copyright (c) 2026 Ricardo Hipp <ricardo.hipp@googlemail.com>

Hiermit wird unentgeltlich jeder Person, die eine Kopie der Software und der
zugehörigen Dokumentationen (die „Software") erhält, die Erlaubnis erteilt, sie
uneingeschränkt zu nutzen, inklusive und ohne Ausnahme mit dem Recht, sie zu
verwenden, zu kopieren, zu verändern, zusammenzufügen, zu veröffentlichen, zu
verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen diese
Software überlassen wird, diese Rechte zu verschaffen, unter den folgenden
Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk sind in allen Kopien
oder Teilkopien der Software beizulegen.

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE
BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN
ODER EINEM BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT
DARAUF BESCHRÄNKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER FÜR
JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE HAFTBAR ZU MACHEN, OB INFOLGE DER
ERFÜLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER
SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.