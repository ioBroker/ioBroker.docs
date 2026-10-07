---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md
title: ShoppingRoute - Benutzerhandbuch
hash: 4FUQIxMfYc+0hxcKKI70ZOhnPDhTi5zYDGnTjpH6y6M=
---
# ShoppingRoute – Benutzerhandbuch

**Gilt für Version 0.5.0 und neuer**

ShoppingRoute hilft dabei, eine normale Alexa-Einkaufsliste in eine Liste umzuwandeln, die Ihrem tatsächlichen Einkaufsverhalten entspricht.

## Warum ShoppingRoute das Einkaufen tatsächlich einfacher macht

Der Hauptvorteil besteht nicht einfach nur in einer „sortierten Liste“. ShoppingRoute kann Ihre **tatsächlichen Einkaufsgewohnheiten** widerspiegeln.

### Alle Geschäfte in einer Liste – oder aufgeteilt auf mehrere Listen

Sie können **alle Einkäufe mehrerer Geschäfte in einer Alexa-Einkaufsliste** speichern. ShoppingRoute sortiert die Artikel weiterhin automatisch nach Markt.

Beispiel:

**LIDL**

- Bananen
- Milch
- Joghurt

**REWE**

- Veganes Hackfleisch
- Oliven

**APOTHEKE**

- Schmerzmittel

Das bedeutet, dass Sie beim Einkaufen nicht zwischen mehreren Listen hin- und herwechseln müssen.

Wenn Sie lieber separate Listen verwenden, ist das auch möglich. Sie können beispielsweise Lebensmittel in einer Liste und Artikel aus dem Baumarkt oder der Apotheke in einer anderen führen. ShoppingRoute unterstützt **beide Vorgehensweisen** .

### Das Hauptmerkmal: Ihre eigene Route durch jedes Geschäft

Der wichtigste Unterschied zu einer normalen Einkaufsliste besteht in **der Routenplanung zum Markt** .

Für jeden Shop legen Sie die Reihenfolge fest, in der Sie normalerweise die einzelnen Abschnitte durchlaufen.

Wenn Ihr LIDL mit Obst und Gemüse beginnt, gefolgt von Backwaren, Fleisch, Milchprodukten und schließlich Tiefkühlkost, können Sie genau diese Reihenfolge konfigurieren.

ShoppingRoute sortiert Ihre Artikel anschließend so, dass sie **Ihrer persönlichen Gehroute** entsprechen.

Das praktische Ergebnis ist:

- weniger Hin- und Herlaufen
- weniger suchen,
- weniger vergessene Gegenstände
- eine ruhigere und übersichtlichere Einkaufsliste,
- und vor allem: **schnelleres und effizienteres Einkaufen** .

Jede Filiale kann eine völlig andere Route haben, da ein REWE-Markt nicht wie ein Lidl oder Aldi aufgebaut ist. ShoppingRoute wurde genau für solche Fälle entwickelt.

Statt einer langen, unsortierten Liste wie beispielsweise:

- Milch
- Schrauben
- Bananen
- Joghurt
- Tomaten

ShoppingRoute kann daraus beispielsweise Folgendes machen:

**LIDL**

- Bananen
- Tomaten
- Milch
- Joghurt

**Eisenwarenladen**

- Schrauben

Sie müssen nicht wissen, wie die Sortierung intern funktioniert, und Sie müssen auch nichts programmieren.

---

## 1. Die wichtigsten Dinge zuerst.

Für den Anfang benötigen Sie nur fünf Dinge:

1. eine funktionierende **Alexa2-Instanz** in ioBroker,
2. mindestens eine Alexa-Einkaufsliste,
3. die Geschäfte, in denen Sie normalerweise einkaufen,
4. Produktgruppen wie **Obst/Gemüse** , **Milchprodukte** oder **Getränke** ,
5. die Reihenfolge, in der Sie normalerweise die einzelnen Geschäfte besuchen.

ShoppingRoute nutzt diese Informationen dann, um Ihre Liste zu sortieren.

### Eine wichtige Einstellung in der Alexa-App

Öffne die Einkaufsliste in der Alexa-App und stelle die Sortierung auf **A–Z** ein.

Das mag ungewöhnlich aussehen, aber ShoppingRoute verwendet die alphabetische Reihenfolge, um die von Ihnen konfigurierte Einkaufsreihenfolge zu erstellen.

Sie müssen die technischen Details dahinter nicht verstehen.

### Was bedeutet „Trockenlauf“?

**Der Trockenlauf ist ein sicherer Testmodus.**

Solange der Testlauf aktiviert ist, kann ShoppingRoute Ihre Alexa-Liste **lesen und planen** , **darf sie aber nicht ändern** .

Das macht es ideal für die Einrichtung:

- Sie konfigurieren Filialen, Produkte und Routen.
- ShoppingRoute zeigt, was es tun würde.
- Ihre echte Alexa-Liste bleibt unberührt.

Sobald alles korrekt aussieht, deaktivieren Sie den Testlauf. Erst dann kann ShoppingRoute die Liste tatsächlich neu organisieren.

Betrachten Sie den Trockenlauf als Vorschau vor dem Drucken.

---

## 2. Wo finde ich alles?

Ab Version 0.5.0 verfügt ShoppingRoute über zwei separate Bereiche.

### Adaptereinstellungen

Unter **Instanzen → ShoppingRoute → Schraubenschlüssel-Symbol** finden Sie nur die Grundeinstellungen, zum Beispiel:

- Welche Alexa2-Instanz wird verwendet?
- ob der Trockenlauf aktiviert ist,
- wie mit unbekannten Produkten umgegangen wird,
- allgemeine Sicherheits- und API-Einstellungen.

### Verwaltungsseite von ShoppingRoute

Es gibt einen eigenen Eintrag **für ShoppingRoute** in der ioBroker-Seitenleiste.

Hier verwalten Sie die Dinge, die Sie im täglichen Betrieb verwenden:

- **Einkaufsliste**
- **Produkte**
- **Märkte**
- **Produktgruppen**
- **Routen**
- **Listen**
- **Rezension**

Die hier vorgenommenen Änderungen werden zur Laufzeit gespeichert. Der Adapter muss nicht neu gestartet werden.

---

## 3. Schnellstart – Ihre erste sortierte Liste in etwa 10 Minuten

### Schritt 1: Alexa2 auswählen

Öffnen Sie die normalen Einstellungen des ShoppingRoute-Adapters.

Wählen Sie unter **„Allgemein“** Ihre Alexa2-Instanz aus und speichern Sie die Einstellungen.

Wenn Sie die Alexa2-Instanz gerade geändert haben, öffnen Sie die Seite anschließend einmal erneut.

### Schritt 2: Trockenlauf aktivieren

Aktivieren:

**Trockenlauf – schreibe nicht an Alexa**

So können Sie alles sicher einrichten.

### Schritt 3: Einkaufsliste auswählen

Öffnen Sie die **ShoppingRoute-Verwaltungsseite** über die ioBroker-Seitenleiste und wählen Sie **Listen** .

Wählen Sie die Alexa-Liste aus, die ShoppingRoute verwalten soll.

Für viele Nutzer reicht eine einzige Liste wie **SHOP** aus.

### Schritt 4: Fügen Sie Ihre Filialen hinzu

Öffnen Sie **die Märkte** und betreten Sie die Geschäfte, in denen Sie normalerweise einkaufen.

Zum Beispiel:

- LIDL
- ALDI
- REWE
- EDEKA
- APOTHEKE
- Eisenwarenladen

ShoppingRoute speichert Marktnamen automatisch in **GROSSBUCHSTABEN** .

Die Eingabe von „Lidl“ oder „Rewe“ ist also in Ordnung.

### Schritt 5: Produktgruppen prüfen

Definieren Sie unter **Produktgruppen** Bereiche, die in etwa den Abteilungen eines Geschäfts entsprechen.

Zum Beispiel:

- Obst/Gemüse
- Brot/Bäckerei
- Fleisch/Fisch
- Milchprodukte
- Getränke
- Tiefkühlprodukte
- Haushalt/Hygiene
- Nicht-Lebensmittel
- Andere

Sie benötigen kein perfektes Klassifizierungssystem für den Einzelhandel. Die Gruppen müssen lediglich für Ihren Einkaufsbummel sinnvoll sein.

### Schritt 6: Die Wanderroute festlegen

Offene **Routen** .

Wählen Sie einen Markt, zum Beispiel **LIDL** , und ordnen Sie die Produktgruppen in der Reihenfolge an, in der Sie normalerweise durch diesen Laden gehen.

Beispiel:

1. Obst/Gemüse
2. Brot/Bäckerei
3. Fleisch/Fisch
4. Milchprodukte
5. Getränke
6. Tiefkühlprodukte

Falls Ihre ALDI-Filiale anders organisiert ist, nimmt ALDI einfach seine eigene Route.

### Schritt 7: Bekannte Produkte prüfen

**Produkte** öffnen.

Ein Produkt kann beispielsweise so aussehen:

**Milch**

- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- Verfügbare Märkte: LIDL, ALDI, REWE

### Schritt 8: Testen Sie es

Fügen Sie über Alexa einige Elemente hinzu, zum Beispiel:

- Bananen
- Milch
- Joghurt
- Cola

Öffnen Sie anschließend **die Einkaufsliste** in ShoppingRoute.

Wenn die Zuordnungen korrekt aussehen, deaktivieren Sie den Trockenlauf in den Adaptereinstellungen.

Ab diesem Zeitpunkt sortiert ShoppingRoute möglicherweise die tatsächliche Alexa-Liste.

---

## 4. Die Einkaufslistenseite

Auf der Seite **„Einkaufsliste“** wird Ihre aktuelle Liste nach Markt gruppiert angezeigt.

Zum Beispiel:

**LIDL**

- Bananen
- Tomaten
- Milch
- Joghurt

**REWE**

- Veganes Hackfleisch

### Einen Gegenstand verschieben

Falls ShoppingRoute einen Artikel dem falschen Markt zugeordnet hat, können Sie ihn direkt verschieben.

Je nach Ansicht können Sie Drag & Drop, Pfeiltasten oder eine Marktauswahl verwenden.

Eine manuelle Änderung hat Vorrang vor der automatischen Zuweisung.

### Löschen eines Elements

Verwenden Sie die **Option „Löschen“** , um diesen Eintrag aus der aktuellen Alexa-Einkaufsliste zu entfernen.

Das Produkt selbst bleibt im Produktkatalog erhalten und kann später wiederverwendet werden.

---

## 5. Märkte

Nutzen Sie **Markets** , um die Geschäfte zu verwalten, in denen Sie einkaufen.

Ein Markt besteht hauptsächlich aus:

- **Name**
- **Aktiv**
- **Befehl**
- **Aliase**

### Was sind Aliasnamen?

Aliase sind alternative Namen für ein und dasselbe Geschäft.

Beispiel:

**REWE**

Aliasnamen:

- Rewe Market
- Rewe Center

Wenn Sie später sagen:

„Milch im Rewe Center hinzufügen“

ShoppingRoute versteht trotzdem, dass Sie **REWE** meinen.

### KEIN MARKT

**„KEIN MARKT“** ist ein Ausweichbereich.

Artikel können dort landen, wenn ShoppingRoute noch nicht weiß, zu welchem Geschäft sie gehören.

---

## 6. Produktgruppen

Produktgruppen beschreiben, **wo sich ein Artikel im Geschäft ungefähr befindet** .

Beispiele:

- Bananen → Obst/Gemüse
- Milch → Milchprodukte
- Cola → Getränke
- Tiefkühlpizza → Tiefkühlprodukte

Sie sind wichtig, weil ShoppingRoute sie verwendet, um Ihre übliche Route durch das Geschäft nachzubilden.

Sie benötigen keine perfekte Produktdatenbank. Die Gruppen müssen lediglich für den tatsächlichen Einkauf nützlich sein.

---

## 7. Routen

Eine Route ist einfach die Reihenfolge, in der Sie die einzelnen Abteilungen des Geschäfts passieren.

Beispiel für LIDL:

1. Obst/Gemüse
2. Brot/Bäckerei
3. Fleisch/Fisch
4. Milchprodukte
5. Getränke
6. Tiefkühlprodukte

ShoppingRoute versucht dann, die Artikel in derselben Reihenfolge anzuzeigen.

Jeder Markt kann seinen eigenen Weg haben.

---

## 8. Produkte

Verwenden Sie **„Produkte“** , um den Produktkatalog zu verwalten.

Für jedes Produkt können Sie Folgendes definieren:

### Name

Die normale Produktbezeichnung.

Beispiel:

**Milch**

### Aliase

Andere Wörter, die dasselbe Produkt bezeichnen.

Beispiel für „Hackfleisch“:

- Hackfleisch
- Rinderhackfleisch

### Produktgruppe

Wo sich der Artikel im Geschäft befindet.

Beispiel:

Milch → Milchprodukte

### Ausfallmarkt

Das Geschäft, in dem Sie dieses Produkt normalerweise kaufen.

Beispiel:

Milch → LIDL

### Verfügbare Märkte

Andere Geschäfte, in denen der gleiche Artikel ebenfalls gekauft werden kann.

Beispiel:

Milch:

- LIDL
- ALDI
- REWE

Dies verleiht ShoppingRoute mehr Flexibilität.

---

## 9. Einen Markt direkt über Alexa benennen

Sie können ShoppingRoute genau mitteilen, wo Sie einen Artikel kaufen möchten.

Zum Beispiel:

- „Milch aus REWE“
- „Cola bei LIDL“
- „Eier bei ALDI“

Ein expliziter Markt hat Vorrang vor den normalen automatischen Regeln.

Selbst wenn Sie Ihre Milch also normalerweise bei LIDL kaufen, bleibt die Bezeichnung „Milch von REWE“ weiterhin REWE zugeordnet.

---

## 10. Mengen

Sie können mit Alexa normale Mengenausdrücke verwenden.

Zum Beispiel:

- 2 Milch
- 3 Packungen Milch
- zwei Flaschen Cola
- 1,5 kg Kartoffeln
- 6x Wasser
- ein halbes Kilo Hackfleisch

ShoppingRoute versucht, das eigentliche Produkt zu erkennen und gleichzeitig die Menge sichtbar zu halten.

---

## 11. Was geschieht mit unbekannten Produkten?

Wenn Sie etwas hinzufügen, das ShoppingRoute noch nicht kennt, gibt es drei mögliche Verhaltensweisen.

Diese Einstellung wählen Sie in den normalen Adaptereinstellungen.

### Zuerst die Rezension lesen

Der neue Eintrag erscheint unter **„Rezension“** .

Dies ist die beste Option für Anfänger.

Sie können Folgendes überprüfen:

- Produktname,
- Produktgruppe
- Ausfallmarkt,
- zusätzliche verfügbare Märkte
- Aliase.

Dann können Sie das Produkt annehmen.

### Automatisches Lernen

ShoppingRoute versucht, neue Produkte automatisch zum Katalog hinzuzufügen.

Das ist zwar praktisch, aber weniger transparent, solange man sich noch in der Einrichtungsphase befindet.

### Lerne nicht

Unbekannte Produkte werden nicht dauerhaft gelagert.

---

## 12. Rückblick

Die **Bewertungsseite** enthält unbekannte oder noch nicht bestätigte Produkte.

Beispiel:

Alexa hat „Skyr“ hinzugefügt, aber ShoppingRoute kennt Skyr noch nicht.

Sie können dann Folgendes definieren:

- Name: Skyr
- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- Weitere Märkte: ALDI, REWE

Klicken Sie auf **„Akzeptieren“** , um das Produkt dauerhaft in den Katalog aufzunehmen.

Verwenden Sie **„Ignorieren“** , wenn ShoppingRoute dies nicht lernen soll.

---

## 13. Welcher Markt gewinnt?

Die meisten Nutzer müssen sich darüber keine Gedanken machen.

Wenn Sie aber verstehen möchten, warum ein Artikel in einem bestimmten Geschäft gelandet ist, folgt ShoppingRoute in etwa dieser Reihenfolge:

1. ein Markt, den Sie über Alexa explizit genannt haben.
2. der Standardmarkt des Produkts,
3. ein temporärer Markt, der für den aktuellen Einkaufsbummel ausgewählt wurde
4. der Standardmarkt der Alexa-Liste,
5. der allgemeine Ausfallmarkt,
6. ein weiterer zugelassener Markt
7. KEIN MARKT.

Ein explizit benannter Markt setzt sich immer durch.

---

## 14. Sicherheit

ShoppingRoute schreibt nicht blind in Ihre Alexa-Liste.

Wenn Amazon eine Änderung nicht bestätigt oder etwas inkonsistent erscheint, kann ShoppingRoute einen **Sicherheitsstopp** auslösen.

Das bedeutet:

**ShoppingRoute hört auf, weitere Änderungen vorzunehmen, anstatt zu raten.**

Wenn eine Sicherheitsstopp-Meldung angezeigt wird, überprüfen Sie zuerst die Alexa-Liste und die Fehlermeldung.

Ein Sicherheitsstopp ist eine Schutzfunktion, kein Datenverlustereignis.

---

## 15. Was bedeuten Zahlen wie „20>“ in Alexa?

Sie sehen möglicherweise gelegentlich Einträge wie:

`20> Milk`

oder eine Überschrift wie:

`40> ═════ LIDL ═════`

ShoppingRoute verwendet diese Zeichen intern, damit Alexa die Liste in der gewünschten Reihenfolge anzeigt.

**Sie müssen nichts damit tun.**

Ändern oder entfernen Sie diese Nummern nicht manuell, während ShoppingRoute die Liste verwaltet.

Es handelt sich lediglich um einen technischen Sortiertrick.

---

## 16. Was ShoppingRoute nicht tut

ShoppingRoute tut dies nicht:

- Elemente automatisch als erledigt markieren,
- Bestellungen aufgeben,
- Kaufe alles,
- Ein Produkt wird aus dem Katalog gelöscht, wenn es von der aktuellen Einkaufsliste entfernt wird.
- Bei normalen Produkt-, Markt- oder Routenänderungen ist ein Neustart des Adapters erforderlich.

---

## 17. Wenn etwas nicht funktioniert

### Die Liste wird nicht sortiert.

Überprüfen:

1. Ist die Alexa-Liste in der Alexa-App auf **A–Z** eingestellt?
2. Ist die richtige Alexa-Liste unter **Listen** aktiviert?
3. Ist der Probelauf noch aktiviert?
4. Läuft die Alexa2-Instanz?
5. Zeigt ShoppingRoute einen Fehler oder einen Sicherheitsstopp an?

### Ein Artikel ist dem falschen Markt zugeordnet.

Prüfen Sie das Produkt unter **Produkte** :

- Ausfallmarkt,
- verfügbare Märkte
- Produktgruppe.

Oder verschieben Sie den Artikel direkt auf die Einkaufsliste.

### Ein neuer Artikel fehlt in der Produktliste.

Siehe unter **„Rezension“** .

Wenn der Lernmodus auf „Zuerst überprüfen“ eingestellt ist, wartet der Artikel dort auf Ihre Bestätigung.

### Ein Knopf reagiert nicht.

Während ShoppingRoute eine Änderung an Amazon sendet, werden weitere Änderungen kurzzeitig blockiert.

Warten Sie, bis der aktuelle Vorgang abgeschlossen ist, und versuchen Sie es erneut.

---

## 18. Für fortgeschrittene Benutzer

Dieser Abschnitt wird für den normalen Betrieb **nicht** benötigt.

### Vorübergehender Vorrangmarkt

Für einen einzelnen Einkaufsbummel kann ein Markt vorübergehend bevorzugt werden durch:

`shoppingroute.0.control.temporaryPriorityMarket`

### Vorschauinformationen

Technische Vorschauinformationen sind verfügbar in:

`shoppingroute.0.info.preview`

`shoppingroute.0.info.previewText`

`shoppingroute.0.info.lastPlan`

### Konfigurationsschutz

Ab Version 0.5.0 werden die großen Katalogdaten zusätzlich zur Laufzeit unter folgendem Pfad gespeichert:

`shoppingroute.0.data.managedConfig`

Dadurch werden Märkte, Routen, Produkte und andere Verwaltungsdaten davor geschützt, bei einem fehlerhaften Administrations- oder Aktualisierungsvorgang stillschweigend auf die Standardeinstellungen des Pakets zurückzufallen.

### Präfixe sortieren

Sichtbare Zahlen von `00>` durch `99>` sind interne Sortierschlüssel.

ShoppingRoute verwendet diese Präfixe, da Alexa keine frei programmierbare Listenreihenfolge anbietet. Bei der Sortierung **A–Z** sorgen die numerischen Präfixe dafür, dass Alexa die Artikel in der von ShoppingRoute berechneten Reihenfolge anzeigt.

Im Normalfall müssen Sie diese Präfixe nicht selbst verstehen oder verwalten.

---

## 19. Empfohlene Konfiguration für neue Benutzer

Für eine Neuinstallation empfehlen wir:

1. Stelle die Alexa-Liste auf **A–Z** ein.
2. Trockenlauf aktivieren.
3. Fügen Sie Ihre Märkte hinzu.
4. Prüfen Sie die Produktgruppen.
5. Konfigurieren Sie die Routen.
6. Fügen Sie einige typische Produkte hinzu.
7. **Einkaufsliste** prüfen und **bewerten** .
8. Trockenlauf deaktivieren.
9. Machen Sie doch mal einen richtigen Einkaufsbummel.

Danach sollte ShoppingRoute den Großteil der Arbeit automatisch erledigen.

### Erstellen Sie Listen und fügen Sie Elemente auf Ihrem Telefon hinzu.

**Listen → „In Alexa erstellen“** erstellt eine echte Alexa-Liste, überprüft die Bestätigung von Amazon und speichert sofort die ShoppingRoute-Anbindung. Vorhandene Namen werden wiederverwendet. Die Liste ist anschließend in der Alexa-App auf Ihrem Mobilgerät verfügbar.

Geben Sie in **der Einkaufsliste** einen Artikel ein und tippen Sie auf **„Hinzufügen“** , auch bei leeren Listen. ShoppingRoute fügt ihn der ausgewählten Alexa-Liste hinzu und plant die Sortierung. Fehlgeschlagene Übermittlungen bleiben erhalten; wiederholtes Tippen erzeugt keine doppelten Anfragen. Testlauf und Schreibschutz bleiben aktiv. Fehlende Alexa-Bindungen beeinträchtigen keine intakten Listen.