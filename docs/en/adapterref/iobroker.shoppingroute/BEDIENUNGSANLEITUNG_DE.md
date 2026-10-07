---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
---
# ShoppingRoute – Bedienungsanleitung

**Gültig ab Version 0.5.0**

ShoppingRoute hilft dir dabei, eine Alexa-Einkaufsliste so zu ordnen, wie du tatsächlich einkaufst.

## Warum ShoppingRoute beim Einkaufen wirklich hilft

Der größte Vorteil ist nicht einfach nur eine „sortierte Liste“, sondern dass ShoppingRoute deine **echten Einkaufsgewohnheiten** abbildet.

### Alle Märkte in einer einzigen Liste – oder bewusst getrennt

Du kannst **alle Einkäufe für mehrere Märkte in nur einer Alexa-Liste** sammeln. ShoppingRoute trennt die Artikel trotzdem automatisch nach Markt.

Beispiel:

**LIDL**
- Bananen
- Milch
- Joghurt

**REWE**
- veganes Hack
- Oliven

**APOTHEKE**
- Kopfschmerztabletten

So musst du nicht ständig zwischen mehreren Listen wechseln.

Wenn du lieber getrennte Listen verwendest, geht das ebenfalls. Du kannst zum Beispiel eine Liste für Lebensmittel und eine weitere für Baumarkt oder Apotheke verwenden. ShoppingRoute unterstützt **beide Arbeitsweisen**.

### Das Besondere: dein eigener Laufweg durch jeden Markt

Der wichtigste Unterschied zu einer normalen Einkaufsliste ist das **Marktrouting**.

Für jeden Markt legst du selbst fest, in welcher Reihenfolge du durch die Abteilungen gehst.

Wenn du bei LIDL zuerst an Obst und Gemüse vorbeikommst, danach an Brot, dann an Fleisch, Milchprodukten und zuletzt an Tiefkühlware, kannst du genau diesen Weg hinterlegen.

ShoppingRoute sortiert deine Artikel anschließend passend zu **deinem persönlichen Laufweg**.

Das bedeutet beim Einkauf:

- weniger Zurücklaufen,
- weniger Suchen,
- weniger vergessen,
- eine ruhigere, übersichtlichere Einkaufsliste,
- und vor allem: **schnelleres und effizienteres Einkaufen**.

Jeder Markt kann dabei einen völlig anderen Laufweg haben, weil ein REWE anders aufgebaut ist als ein LIDL oder ALDI. Genau das bildet ShoppingRoute ab.

Statt einer langen unsortierten Liste wie:

- Milch
- Schrauben
- Bananen
- Joghurt
- Tomaten

kann ShoppingRoute daraus zum Beispiel machen:

**LIDL**
- Bananen
- Tomaten
- Milch
- Joghurt

**BAUMARKT**
- Schrauben

Du musst dafür weder programmieren noch die technischen Abläufe im Hintergrund verstehen.

---

## 1. Das Wichtigste zuerst

Wenn du ShoppingRoute neu einrichtest, brauchst du im Grunde nur fünf Dinge:

1. eine funktionierende **Alexa2-Instanz** in ioBroker,
2. mindestens eine Alexa-Einkaufsliste,
3. deine Märkte, zum Beispiel **LIDL**, **ALDI** oder **REWE**,
4. Produktgruppen wie **Obst/Gemüse**, **Milchprodukte** oder **Getränke**,
5. die Reihenfolge, in der du durch den jeweiligen Markt läufst.

Danach übernimmt ShoppingRoute die Sortierung.

### Eine wichtige Einstellung in der Alexa-App

Öffne die Einkaufsliste in der Alexa-App und stelle ihre Sortierung auf **A–Z**.

Das wirkt zunächst merkwürdig, ist aber nötig, weil ShoppingRoute die alphabetische Sortierung verwendet, um die gewünschte Reihenfolge abzubilden.

Du musst dich nicht darum kümmern, wie das technisch funktioniert.

### Was bedeutet „Dry-Run“?

**Dry-Run ist ein Probebetrieb.**

Solange Dry-Run eingeschaltet ist, darf ShoppingRoute deine Alexa-Liste **lesen und planen**, aber **nichts verändern**.

Das ist ideal für die Ersteinrichtung:

- Du richtest Märkte, Artikel und Laufwege ein.
- ShoppingRoute zeigt dir, was es tun würde.
- Deine echte Alexa-Liste bleibt dabei unverändert.

Wenn alles richtig aussieht, schaltest du Dry-Run aus. Erst dann darf ShoppingRoute die Liste tatsächlich umsortieren.

Du kannst dir Dry-Run wie eine Vorschau vor dem Drucken vorstellen.

---

## 2. Wo finde ich was?

ShoppingRoute hat ab Version 0.5.0 zwei Bereiche.

### Adapter-Einstellungen

Unter **Instanzen → ShoppingRoute → Schraubenschlüssel** findest du nur noch die grundlegenden Einstellungen, zum Beispiel:

- welche Alexa2-Instanz verwendet wird,
- ob Dry-Run aktiv ist,
- wie unbekannte Artikel behandelt werden,
- allgemeine Sicherheits- und API-Einstellungen.

### ShoppingRoute-Verwaltung

In der linken ioBroker-Seitenleiste gibt es einen eigenen Eintrag **ShoppingRoute**.

Dort pflegst du alles, was du im Alltag brauchst:

- **Einkaufsliste**
- **Artikel**
- **Märkte**
- **Produktgruppen**
- **Laufwege**
- **Listen**
- **Prüfung**

Änderungen auf dieser Seite werden direkt gespeichert. Der Adapter muss dafür nicht neu gestartet werden.

---

## 3. Schnellstart – in 10 Minuten zur ersten sortierten Liste

### Schritt 1: Alexa2 auswählen

Öffne die normalen Adapter-Einstellungen von ShoppingRoute.

Wähle unter **Allgemein** deine Alexa2-Instanz aus und speichere.

Wenn du die Instanz gerade erst geändert hast, öffne die Seite danach einmal neu.

### Schritt 2: Dry-Run einschalten

Aktiviere zunächst:

**Dry-Run – nichts zu Alexa schreiben**

Damit kannst du gefahrlos einrichten und testen.

### Schritt 3: Einkaufsliste auswählen

Öffne die neue **ShoppingRoute-Verwaltung** in der Seitenleiste und gehe auf **Listen**.

Wähle die Alexa-Liste aus, die ShoppingRoute verwalten soll.

Für die meisten Nutzer reicht eine Liste, zum Beispiel:

**SHOP**

### Schritt 4: Märkte anlegen

Gehe auf **Märkte** und trage die Geschäfte ein, in denen du normalerweise einkaufst.

Zum Beispiel:

- LIDL
- ALDI
- REWE
- EDEKA
- APOTHEKE
- BAUMARKT

ShoppingRoute speichert Marktnamen automatisch in **GROSSBUCHSTABEN**.

Du kannst also auch „Lidl“ oder „Rewe“ eingeben.

### Schritt 5: Produktgruppen prüfen

Unter **Produktgruppen** legst du Bereiche fest, die ungefähr den Abteilungen eines Geschäfts entsprechen.

Zum Beispiel:

- Obst/Gemüse
- Brot/Gebäck
- Fleisch/Fisch
- Milchprodukte
- Getränke
- Tiefkühlprodukte
- Haushalt/Hygiene
- Nonfood
- Sonstiges

Du musst nicht jede denkbare Warengruppe anlegen. Es reicht, wenn die Gruppen für deinen Einkauf sinnvoll sind.

### Schritt 6: Laufweg festlegen

Gehe auf **Laufwege**.

Wähle einen Markt, zum Beispiel **LIDL**, und ordne die Produktgruppen so an, wie du normalerweise durch den Laden gehst.

Beispiel:

1. Obst/Gemüse
2. Brot/Gebäck
3. Fleisch/Fisch
4. Milchprodukte
5. Getränke
6. Tiefkühlprodukte

Wenn dein ALDI anders aufgebaut ist, bekommt ALDI einfach einen anderen Laufweg.

### Schritt 7: Erste Artikel prüfen

Unter **Artikel** siehst du die Produkte, die ShoppingRoute bereits kennt.

Ein Artikel kann zum Beispiel so eingestellt sein:

**Milch**
- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- Verfügbare Märkte: LIDL, ALDI, REWE

### Schritt 8: Testen

Füge über Alexa einige Artikel zur Einkaufsliste hinzu, zum Beispiel:

- Bananen
- Milch
- Joghurt
- Cola

Schau anschließend in ShoppingRoute unter **Einkaufsliste**.

Wenn die Zuordnung stimmt, kannst du Dry-Run in den Adapter-Einstellungen ausschalten.

Ab dann darf ShoppingRoute deine echte Alexa-Liste sortieren.

---

## 4. Die Einkaufsliste

Unter **Einkaufsliste** siehst du die aktuelle Liste nach Märkten gegliedert.

Zum Beispiel:

**LIDL**
- Bananen
- Tomaten
- Milch
- Joghurt

**REWE**
- veganes Hack

### Artikel verschieben

Wenn ShoppingRoute einen Artikel in den falschen Markt einsortiert hat, kannst du ihn direkt verschieben.

Je nach Ansicht stehen dafür Drag & Drop, Pfeiltasten oder eine Marktauswahl zur Verfügung.

Eine manuelle Änderung hat Vorrang vor der automatischen Zuordnung.

### Artikel löschen

Mit **Löschen** entfernst du den Eintrag aus der aktuellen Alexa-Einkaufsliste.

Der Artikel selbst bleibt im Artikelstamm erhalten und kann später wieder verwendet werden.

---

## 5. Märkte

Unter **Märkte** verwaltest du deine Geschäfte.

Ein Markt besteht im Wesentlichen aus:

- **Name**
- **Aktiv**
- **Reihenfolge**
- **Aliase**

### Was sind Aliase?

Aliase sind alternative Bezeichnungen für denselben Markt.

Beispiel:

**REWE**

Aliase:
- Rewe Markt
- Rewe Center

Wenn du später sagst:

„Setze Milch bei Rewe Center auf die Einkaufsliste“

kann ShoppingRoute trotzdem erkennen, dass **REWE** gemeint ist.

### OHNE MARKT

**OHNE MARKT** ist ein Auffangbereich.

Dort können Artikel landen, wenn ShoppingRoute noch nicht weiß, welchem Geschäft sie zugeordnet werden sollen.

---

## 6. Produktgruppen

Produktgruppen beschreiben, **wo im Laden ein Artikel ungefähr zu finden ist**.

Beispiele:

- Bananen → Obst/Gemüse
- Milch → Milchprodukte
- Cola → Getränke
- Tiefkühlpizza → Tiefkühlprodukte

Sie sind wichtig, weil ShoppingRoute damit deinen Laufweg durch den Markt nachbildet.

Du brauchst keine perfekte Warenwirtschaft. Die Gruppen sollen nur beim praktischen Einkauf helfen.

---

## 7. Laufwege

Ein Laufweg ist einfach die Reihenfolge, in der du an den Abteilungen eines Marktes vorbeikommst.

Beispiel für LIDL:

1. Obst/Gemüse
2. Brot/Gebäck
3. Fleisch/Fisch
4. Milchprodukte
5. Getränke
6. Tiefkühlprodukte

ShoppingRoute versucht dann, die Artikel in genau dieser Reihenfolge auf deiner Einkaufsliste anzuzeigen.

Jeder Markt kann einen eigenen Laufweg haben.

---

## 8. Artikel

Unter **Artikel** verwaltest du den Produktstamm.

Für jeden Artikel kannst du festlegen:

### Name

Der normale Name des Produkts.

Beispiel:

**Milch**

### Aliase

Andere Wörter, die dasselbe Produkt meinen.

Beispiel für „Hackfleisch“:

- Hack
- Rinderhack

### Produktgruppe

Wo der Artikel im Laden zu finden ist.

Beispiel:

Milch → Milchprodukte

### Standardmarkt

Der Markt, in dem du diesen Artikel normalerweise kaufst.

Beispiel:

Milch → LIDL

### Verfügbare Märkte

Weitere Geschäfte, in denen der Artikel ebenfalls gekauft werden kann.

Beispiel:

Milch:
- LIDL
- ALDI
- REWE

So kann ShoppingRoute flexibler entscheiden.

---

## 9. Einen Markt direkt bei Alexa nennen

Du kannst ShoppingRoute ausdrücklich sagen, in welchem Markt ein Artikel gekauft werden soll.

Zum Beispiel:

- „Milch von REWE“
- „Cola bei LIDL“
- „Eier bei ALDI“

Diese Angabe hat Vorrang vor der normalen automatischen Zuordnung.

Wenn du also sonst Milch bei LIDL kaufst, aber diesmal ausdrücklich „Milch von REWE“ sagst, bleibt sie bei REWE.

---

## 10. Mengenangaben

Du kannst Alexa wie gewohnt Mengen nennen.

Zum Beispiel:

- 2 Milch
- 3 Packungen Milch
- zwei Flaschen Cola
- 1,5 kg Kartoffeln
- 6x Wasser
- halbes Kilo Hack

ShoppingRoute versucht dabei, den eigentlichen Artikel zu erkennen und die Mengenangabe sichtbar zu erhalten.

---

## 11. Was passiert mit unbekannten Artikeln?

Wenn du einen Artikel nennst, den ShoppingRoute noch nicht kennt, gibt es drei Möglichkeiten.

Diese stellst du in den normalen Adapter-Einstellungen ein.

### Erst prüfen

Der neue Artikel landet unter **Prüfung**.

Das ist für den Einstieg die beste Einstellung.

Du kannst dort kontrollieren:

- Produktname
- Produktgruppe
- Standardmarkt
- weitere verfügbare Märkte
- Aliase

Danach kannst du den Artikel übernehmen.

### Automatisch lernen

ShoppingRoute versucht neue Artikel selbstständig in den Produktstamm aufzunehmen.

Das ist bequem, aber für eine neue Installation weniger übersichtlich.

### Nicht lernen

Unbekannte Artikel werden nicht dauerhaft gespeichert.

---

## 12. Prüfung

Unter **Prüfung** findest du unbekannte oder noch nicht bestätigte Artikel.

Beispiel:

Alexa hat „Skyr“ aufgenommen, ShoppingRoute kennt Skyr aber noch nicht.

Dann kannst du dort festlegen:

- Name: Skyr
- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- weitere Märkte: ALDI, REWE

Mit **Übernehmen** wird der Artikel dauerhaft in den Artikelstamm aufgenommen.

Mit **Ignorieren** wird er nicht gelernt.

---

## 13. Welcher Markt gewinnt?

Meist musst du dich um diese Regeln nicht kümmern.

Falls du aber wissen möchtest, warum ein Artikel in einem bestimmten Markt gelandet ist, gilt vereinfacht diese Reihenfolge:

1. Ein Markt, den du ausdrücklich bei Alexa genannt hast
2. der Standardmarkt des Artikels
3. ein vorübergehend gewählter Markt für den aktuellen Einkauf
4. der Standardmarkt der verwendeten Alexa-Liste
5. der allgemeine Standardmarkt
6. ein anderer erlaubter Markt
7. OHNE MARKT

Ein ausdrücklich genannter Markt gewinnt also immer.

---

## 14. Sicherheit

ShoppingRoute schreibt nicht beliebig oft auf deine Alexa-Liste.

Wenn etwas unerwartet läuft oder Amazon eine Änderung nicht bestätigt, kann der Adapter einen **Sicherheitsstopp** auslösen.

Das bedeutet:

**ShoppingRoute stoppt weitere Änderungen, statt auf Verdacht weiterzuschreiben.**

Wenn du einen solchen Hinweis siehst, prüfe zuerst die aktuelle Alexa-Liste und die Fehlermeldung.

Ein Sicherheitsstopp ist kein Datenverlust, sondern eine Schutzfunktion.

---

## 15. Was sind diese Zahlen wie „20>“ in Alexa?

Manchmal siehst du auf der Alexa-Liste Einträge wie:

`20> Milch`

oder eine Überschrift wie:

`40> ═════ LIDL ═════`

Diese Zeichen verwendet ShoppingRoute intern, damit Alexa die Liste in der gewünschten Reihenfolge anzeigt.

**Du musst damit nichts tun.**

Bitte ändere oder entferne diese Zahlen nicht manuell, solange ShoppingRoute die Liste verwaltet.

Sie sind nur ein technischer Trick für die Sortierung.

---

## 16. Was ShoppingRoute nicht macht

ShoppingRoute:

- hakt keine Artikel automatisch als erledigt ab,
- bestellt nichts,
- kauft nichts,
- löscht deinen Artikelstamm nicht, wenn du einen Eintrag aus der aktuellen Einkaufsliste entfernst,
- benötigt für normale Änderungen an Artikeln, Märkten oder Laufwegen keinen Adapter-Neustart.

---

## 17. Wenn etwas nicht funktioniert

### Die Liste wird nicht sortiert

Prüfe:

1. Ist die Alexa-Liste in der Alexa-App auf **A–Z** gestellt?
2. Ist die richtige Alexa-Liste unter **Listen** aktiviert?
3. Ist Dry-Run vielleicht noch eingeschaltet?
4. Läuft die Alexa2-Instanz?
5. Zeigt ShoppingRoute einen Fehler oder Sicherheitsstopp an?

### Ein Artikel landet im falschen Markt

Prüfe den Artikel unter **Artikel**:

- Standardmarkt
- verfügbare Märkte
- Produktgruppe

Oder verschiebe ihn direkt in der Einkaufsliste.

### Ein neuer Artikel fehlt im Artikelstamm

Schau unter **Prüfung**.

Wenn der Lernmodus auf „Erst prüfen“ steht, wartet er dort auf deine Bestätigung.

### Ein Button reagiert nicht

Während ShoppingRoute gerade eine Änderung an Amazon überträgt, werden weitere Änderungen kurz gesperrt. Warte, bis der Vorgang beendet ist, und versuche es dann erneut.

---

## 18. Für Fortgeschrittene

Der folgende Abschnitt ist für den normalen Betrieb **nicht erforderlich**.

### Temporärer Prioritätsmarkt

Für einen einzelnen Einkauf kann ein Markt vorübergehend bevorzugt werden über:

`shoppingroute.0.control.temporaryPriorityMarket`

### Vorschau

Technische Vorschau-Informationen stehen unter anderem in:

`shoppingroute.0.info.preview`

`shoppingroute.0.info.previewText`

`shoppingroute.0.info.lastPlan`

### Konfigurationsschutz

Ab Version 0.5.0 werden die großen Katalogdaten zusätzlich als Laufzeitdaten unter:

`shoppingroute.0.data.managedConfig`

gespeichert.

Das schützt Märkte, Laufwege, Artikel und weitere Verwaltungsdaten davor, bei einem fehlerhaften Admin- oder Update-Vorgang unbemerkt auf Paket-Standardwerte zurückzufallen.

### Sortierpräfixe

Die sichtbaren Zahlen von `00>` bis `99>` sind interne Sortierschlüssel.

ShoppingRoute nutzt sie, weil die Alexa-Liste selbst keine frei definierbare Reihenfolge anbietet. Durch die Einstellung **A–Z** werden diese Zahlen alphabetisch bzw. numerisch in die gewünschte Reihenfolge gebracht.

Für den normalen Betrieb musst du diese Technik nicht kennen.

---

## 19. Empfehlung für neue Nutzer

Für eine neue Installation empfehlen wir:

1. Alexa-Liste auf **A–Z** stellen.
2. Dry-Run einschalten.
3. Märkte anlegen.
4. Produktgruppen prüfen.
5. Laufwege einrichten.
6. einige typische Artikel hinzufügen.
7. unter **Einkaufsliste** und **Prüfung** kontrollieren.
8. Dry-Run ausschalten.
9. einen echten Einkauf testen.

Danach erledigt ShoppingRoute den größten Teil der Arbeit automatisch.

### Listen und Artikel unterwegs anlegen

Unter **Listen → In Alexa anlegen** erstellt ShoppingRoute eine echte Alexa-Liste und speichert ihre Zuordnung direkt. Erst die Bestätigung von Amazon zählt als Erfolg. Die Liste steht anschließend auch in der Alexa-App auf dem Handy zur Verfügung. Bereits vorhandene Namen werden wiederverwendet.

Im Bereich **Einkaufsliste** kannst du über **Neuen Artikel hinzufügen → Hinzufügen** direkt in die ausgewählte Alexa-Liste schreiben, auch wenn diese noch leer ist. Der Adapter übernimmt die anschließende Sortierung. Bei einem Fehler bleibt deine Eingabe erhalten. Dry-Run und Schreibschutz gelten auch hier. Fehlende Alexa-Listen blockieren keine anderen Listen.