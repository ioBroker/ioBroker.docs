---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
---
# ShoppingRoute – Bedienungsanleitung

**Bedienungsanleitung für ShoppingRoute 0.6.1 (27.10.2026)**

ShoppingRoute hilft dir dabei, eine Alexa-Einkaufsliste so zu ordnen, wie du tatsächlich einkaufst.

**Neuerungen 0.6.1:** ShoppingRoute reagiert auf bestätigte Änderungen der Bring!- und Alexa-Listen jetzt ereignisgesteuert. Die zusätzliche ShoppingRoute-Wartezeit von bisher bis zu 90 Sekunden entfällt; als Reserve wird alle 30 Sekunden kontrolliert. Gleichzeitig erledigte Artikel werden nach einer bestätigten vorherigen Übertragung abgeglichen. Alexa-Schreibsperren bleiben erhalten. Im ioBroker-Log erscheinen Warnungen für ausstehende Bestätigungen und Fehler bei Timeouts ohne wiederholte Logflut.

**Wichtig: Diese Wartezeit kann ShoppingRoute nicht beeinflussen.** Der separate ioBroker-Adapter Bring! 1.9.1 fragt die Bring!-Cloud in einem eigenen Intervall von ungefähr **90 Sekunden** ab. **ShoppingRoute kann diesen Abruf weder beschleunigen noch vorzeitig auslösen.** Ein in der Bring!-App hinzugefügter oder erledigter Artikel erreicht ShoppingRoute erst nach der nächsten Aktualisierung durch den Bring!-Adapter; Netzwerk- oder Cloud-Verzögerungen können hinzukommen. Erst anschließend greift der schnelle, ereignisgesteuerte Abgleich von ShoppingRoute 0.6.1. Die 30-Sekunden-Rückfallprüfung von ShoppingRoute ändert **nicht** die 90 Sekunden des Bring!-Adapters.

**Seit Version 0.6.1:** Wird während der Bestätigung einer älteren Bring!/Alexa-Übertragung ein weiterer Artikel in Bring! abgehakt, prüft ShoppingRoute die ursprünglichen Schreibvorgänge einzeln. Sobald diese vollständig bestätigt sind, verarbeitet es die spätere Erledigung im nächsten Abgleich, ohne den erledigten Artikel in Bring! wiederherzustellen. Nicht bestätigte Schreibvorgänge bleiben gesperrt. Ausstehende Bestätigungen und Timeouts werden einmalig im ioBroker-Log gemeldet, statt das Log bei jedem Poll zu füllen. Bei Synchronisationsproblemen die Datenpunkte `shoppingroute.0.info.bringSyncStatus` und `shoppingroute.0.data.bringSyncJournal` prüfen; das Journal nur nach Sicherung und Abgleich beider Listen korrigieren.

## Bring!-Listen in ShoppingRoute 0.6.0 einbinden

Die neuen Bring!-Funktionen sind optional und standardmäßig ausgeschaltet.

**Einrichtung:** Unter **Instanzen → ShoppingRoute → Bring!-Integration** wählst du zunächst die installierte Bring!-Instanz und speicherst. Danach wählst du deine Bring!-Einkaufsliste aus. Für eine Verbindung mit Alexa wählst du zusätzlich die passende, bereits konfigurierte Alexa-Einkaufsliste. Belasse zunächst **Dry-Run** eingeschaltet.

Du hast vier Betriebsarten zur Auswahl:

1. **Aus:** Alexa arbeitet genau wie in 0.5.3.
2. **Bring! → Alexa:** Die Bring!-Liste liefert die Artikel. Neue Artikel werden an Alexa weitergegeben; anschließend bei Bring! erledigte, zuvor synchronisierte Artikel werden auch in Alexa entfernt. Ergänzungen, die nur bei Alexa vorhanden sind, bleiben dort.
3. **Nur Bring!:** Alexa wird nicht benötigt. Öffne die **Einkaufsliste** in der ShoppingRoute-Verwaltung, um die Bring!-Artikel nach deinen Märkten und Laufwegen sortiert anzusehen. Bearbeiten kannst du sie weiterhin direkt in Bring!.
4. **Bring! ↔ Alexa:** Beide Apps nutzen denselben Artikelbestand. Hinzufügen und Erledigen werden nach dem ersten Abgleich in beide Richtungen übertragen.

**Beim ersten Abgleich werden bestehende Artikel nur ergänzt, niemals gelöscht.** Das betrifft ausdrücklich auch unterschiedliche Artikel in beiden Listen.

### Alexa ohne Bring!-Skill verwenden

Bei eingeschaltetem Modus **Bring! ↔ Alexa** reicht die normale Spracheingabe **„Alexa, Milch auf die Einkaufsliste“**. Der Artikel landet zunächst in der Alexa-Liste; ShoppingRoute sortiert nach deinen Markt- und Laufwegregeln und übernimmt ihn beim nächsten bestätigten Abgleich in Bring!. Den langen Aufruf **„Alexa, sage Bring! …“** brauchst du für diesen Ablauf nicht mehr. Erledigst du Milch anschließend in Bring!, entfernt ShoppingRoute den gespiegelten Eintrag aus der aktiven Alexa-Liste. Dort wird er technisch entfernt, nicht mit einem Häkchen als erledigt markiert. Änderungen werden nur übertragen, wenn die Verbindung funktioniert und keine Sicherheits- oder Konfliktsperre greift.

Bring! selbst sortiert Artikel nach seinen eigenen Produktkategorien. Die App unterstützt **keine frei vorgegebene Reihenfolge einzelner Artikel**. Die individuellen ShoppingRoute-Laufwege siehst du daher auf der ShoppingRoute-Verwaltungsseite beziehungsweise in Alexa. In der Bring!-App kannst du die Reihenfolge der eigenen Kategorien manuell anpassen.

### Wichtig für den sicheren Betrieb

- **Nicht von ShoppingRoute steuerbar:** Der separate Bring!-Adapter fragt seine Cloud-Liste normalerweise ungefähr alle **90 Sekunden** ab. ShoppingRoute kann dieses Intervall nicht verkürzen. Sobald ein aktualisierter Listenstand im ioBroker ankommt, wird ShoppingRoute ereignisgesteuert aktiv; die eigene Rückfallprüfung erfolgt alle 30 Sekunden.
- Bei gleichen Artikelnamen mit unterschiedlichen Mengen/Beschreibungen oder bei mehrfachen Artikeln wird nichts erraten. Der Abgleich stoppt und meldet den Konflikt.
- Werden Daten nicht rechtzeitig bestätigt, bleibt ein Wiederherstellungsjournal bestehen und weitere Schreibvorgänge werden blockiert. Vor einem Zurücksetzen des Journals müssen **beide Listen manuell geprüft** werden.
- Bei Dry-Run werden weder Bring! noch Alexa beschrieben.
- Die Statusmeldung steht unter `shoppingroute.0.info.bringSyncStatus`; die berechnete Bring!-Route unter `shoppingroute.0.info.bringSyncPreview`.

**Praxistest (26.10.2026):** Vorhandene Bring!-Listen und neu in Bring! hinzugefügte Artikel werden in ShoppingRoute übernommen und beim nächsten Sortierlauf entsprechend den Markt- und Laufwegregeln eingeordnet. Die Bring!-App selbst lässt keine freie Sortierung einzelner Artikel zu. Automatische Tests für Synchronisierung und Konfliktschutz sind erfolgreich. Nicht durch diesen Praxistest bestätigt sind sämtliche Erledigungs-, Lösch- und Konfliktfälle bei bidirektionalem Live-Abgleich. Diesen Modus zuerst mit gesicherten Testlisten verwenden.

## Neu in 0.5.3: Einkäufe direkt in der Alexa-App ändern

**Du bist unterwegs, siehst ein Angebot und willst deine Einkaufsliste ändern? Das geht jetzt direkt auf dem Handy.** Du brauchst dafür nur die normale Alexa-App.

### Beispiel 1: Käse heute lieber bei LIDL kaufen

Auf deiner Einkaufsliste steht:

```text
25> Käse
```

Eigentlich kaufst du Käse bei ALDI. Heute ist er aber bei LIDL im Angebot.

**So geht's:** Tippe in der Alexa-Einkaufsliste auf **Eintrag hinzufügen** und schreibe:

```text
25WLIDL
```

**Fertig.** ShoppingRoute verschiebt den Käse für **diesen Einkauf** zu LIDL. Beim nächsten Einkauf wird er wieder seinem normalen Markt zugeordnet.

### Beispiel 2: Käse ab jetzt immer bei LIDL kaufen

Du möchtest Käse grundsätzlich bei LIDL kaufen? Dann füge stattdessen diesen Eintrag hinzu:

```text
25FLIDL
```

**Der Unterschied:** **W** gilt nur für diesen Einkauf. **F** merkt sich LIDL dauerhaft für diesen Artikel.

### Beispiel 3: Einen Artikel auf der Liste nach oben schieben

Stell dir vor, deine Liste bei LIDL sieht so aus:

```text
10> Gurken
20> Bananen
25> Käse
30> Milch
40> Butter
```

Du möchtest den Käse **zwei Plätze weiter oben** haben. Füge diesen Eintrag hinzu:

```text
25H2
```

Danach steht Käse vor Gurken und Bananen:

```text
Käse
Gurken
Bananen
Milch
Butter
```

Möchtest du Käse stattdessen **zwei Plätze nach unten** schieben, verwendest du:

```text
25R2
```

**H = hoch, R = runter.** Es zählen die Artikel, nicht die Abstände zwischen den Nummern. Ein Artikel bleibt immer in seinem Markt; an der ersten oder letzten Stelle ist Schluss. Deine festgelegten Laufwege und Produktgruppen werden dadurch nicht geändert.

### Das solltest du wissen

**Die Nummer ist nur ein Beispiel.** Schau vor jedem Befehl nach, welche **zweistellige Nummer gerade vor deinem Artikel** steht. Bei einem anderen Einkauf kann Käse eine andere Nummer haben. Nummern vor Marktüberschriften zählen nicht als Artikelnummern.

Du kannst **mehrere Befehle** in die Liste schreiben. Groß- und Kleinschreibung ist egal: `25wlidl` funktioniert genauso. Kleine, eindeutig erkennbare Tippfehler bei Marktnamen werden korrigiert.

**Bitte nicht ungeduldig werden:** ShoppingRoute sortiert **nicht sofort**. Je nach Internetverbindung und Alexa kann es **bis zu fünf Minuten** dauern. Solange der Befehl noch in der Liste steht, ist das erst einmal normal. Nach erfolgreicher Verarbeitung verschwindet er automatisch.

**Steht der Befehl nach fünf Minuten immer noch da?** Prüfe die Internet-/Alexa-Verbindung und ob Nummer, Buchstabe und Markt richtig sind. Einen falschen Befehl einfach **abhaken und neu eingeben**. Wenn ShoppingRoute einen Befehl nicht eindeutig versteht, lässt es ihn stehen, statt den falschen Artikel zu verschieben.

**Vier Funktionen, jeweils auf Deutsch oder Englisch:** `W/C` (Wechsel/Change), `F/E` (Fest/Ever), `H/U` (Hoch/Up) und `R/D` (Runter/Down). Zum Beispiel sind `25WLIDL` und `25CLIDL` gleichwertig. Für dauerhaft verwende `25FLIDL` oder `25ELIDL`. `25D2` bedeutet **zwei Plätze nach unten**, nicht dauerhaft wechseln.

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

Manuelle Verschiebungen in der Einkaufsliste bleiben zunächst als Entwurf im Browser. Verschiebe alle gewünschten Artikel und drücke dann **Änderungen an Alexa übertragen**. Erst dieser Button startet einen gemeinsamen, geprüften Alexa-Sortierlauf. Bei einem Fehler bleibt der Entwurf erhalten; **Änderungen verwerfen** lädt die aktuelle Liste neu. Solange Änderungen offen sind, sind Listenwechsel, Hinzufügen, Löschen und Zurücksetzen gesperrt, damit der Entwurf erhalten bleibt. Ein Neuladen desselben Browser-Tabs stellt den Entwurf bei verfügbarem Sitzungsspeicher wieder her.

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