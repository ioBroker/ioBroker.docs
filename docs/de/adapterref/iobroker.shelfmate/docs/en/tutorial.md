---
chapters: {"pages":{"en/adapterref/iobroker.shelfmate/README.md":{"title":{"en":"ioBroker.shelfmate"},"content":"en/adapterref/iobroker.shelfmate/README.md"},"en/adapterref/iobroker.shelfmate/README.de.md":{"title":{"en":"ioBroker.shelfmate"},"content":"en/adapterref/iobroker.shelfmate/README.de.md"},"en/adapterref/iobroker.shelfmate/docs/en/tutorial.md":{"title":{"en":"ShelfMate – Guide"},"content":"en/adapterref/iobroker.shelfmate/docs/en/tutorial.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shelfmate/docs/en/tutorial.md
title: ShelfMate - Leitfaden
hash: VDfYnlAH0/t8eE+R2hSyJSEVLdrCEcoZn8KfOlpGS8M=
---
# ShelfMate – Leitfaden

Mit ShelfMate verwalten Sie Ihre Vorräte direkt in ioBroker. Diese Anleitung zeigt Ihnen, wie Sie Produkte anlegen, Ihren Lagerbestand verwalten, Barcodes scannen und die verschiedenen Funktionen nutzen.

Alle Einstellungen, Anforderungen und Datenpunkte finden Sie in der [README-Datei](/#/adapters/shelfmate) .

Deutsche Version: [Anleitung](https://github.com/backfisch88/ioBroker.shelfmate/blob/main/docs/de/tutorial.md)

---

## Inhalt

1. [Die App im Überblick](#the-app-at-a-glance)
2. [Bearbeitungsprodukte](#editing-products)
3. [Automatische Haltbarkeitsdauer und das Glitzersymbol](#automatic-shelf-life-and-the-sparkle-symbol)
4. [Produktdaten aktualisieren](#refreshing-product-data)
5. [Einlagern, Auslagern und Umräumen](#stock-in-take-out-and-move)
6. [Lagerplätze schaffen](#creating-storage-locations)
7. [Produkte ohne Barcode](#products-without-a-barcode)
8. [Bücher, Zeitschriften, Notenblätter und Medikamente](#books-magazines-sheet-music-and-medicines)
9. [Mindestbestand und Einkaufsliste](#minimum-stock-and-shopping-list)
10. [Haltbar bis](#best-before-date)
11. [Einkaufslistenmodi](#shopping-list-modes)
12. [Zutaten prüfen](#checking-ingredients)
13. [Ein ganzes Regal füllen](#stocking-a-whole-shelf)
14. [Durchführung einer Bestandsaufnahme](#doing-a-stocktaking)
15. [Scannermodus ohne die App](#scanner-mode-without-the-app)
16. [Vorschläge](#suggestions)
17. [Benachrichtigungen](#notifications)
18. [Exportieren und Sichern](#export-and-backup)
19. [Offline-Modus](#offline-mode)
20. [HTTPS und Zertifikate](#https-and-certificates)
21. [Etiketten drucken](#printing-labels)
22. [Aussehen](#appearance)

---

## Die App im Überblick

### Überblick

Auf der Startseite sehen Sie Ihre Produkte und deren Lagerbestand.

Mit der Suche finden Sie Produkte anhand von Name, Marke oder Schlagwort. Passende Vorschläge werden Ihnen während der Eingabe angezeigt. Tippen Sie auf ×, um die Suche zurückzusetzen.

Es gibt außerdem mehrere Filter:

- Bereich: Zeigt nur Produkte aus einem Lagerbereich an.
- Standort: Filtert nach einem einzelnen Regal, Schrank oder Fach.
- Kategorie: Zeigt Produkte einer Kategorie an.
- Status: Filtert nach geöffneten, bald ablaufenden, abgelaufenen, noch zu kaufenden oder leeren Produkten.
- Schlagwörter: Häufig verwendete Suchbegriffe können direkt ausgewählt werden.

Durch erneutes Antippen eines aktiven Status oder Tags wird dieser Filter entfernt.

Produktgruppen werden zusammen angezeigt. Tippen Sie auf das kleine Dreieck, um die darin enthaltenen Produkte aufzuklappen.

Die Liste ist sortiert: Produkte mit bald ablaufendem oder bereits abgelaufenem Mindesthaltbarkeitsdatum stehen an erster Stelle, dann angebrochene Produkte und schließlich alle anderen (Produkte, die zuerst gekauft werden sollten). Leere Produkte stehen am Ende.

Wenn Sie von einer Produktseite zurückkehren, gelangen Sie wieder an Ihre vorherige Position in der Übersicht.

<p align="center"><img src="../images/filterOpen.jpg" width="250"><br><sub>The status filters and tags above the list. The red frame shows the active filter "Opened".</sub></p>

Die Scan-Schaltfläche befindet sich über der Leiste auf jedem Tab und klappt beim Scrollen ein. Wenn Sie sie nicht benötigen, deaktivieren Sie sie unter Einstellungen → Steuerung → Scan-Schaltfläche. Diese Einstellung gilt nur für dieses Gerät.

### Produktseite

Auf der Produktseite finden Sie den Gesamtbestand, die Lagerorte und, falls aktiviert, die Daten zur Haltbarkeit.

Abgelaufene und bald ablaufende Produkte sind farblich hervorgehoben.

Falls Standardwerte existieren, zeigt ShelfMate beispielsweise Folgendes an:

`Standard shelf life 365 days · after opening 90 days`

Darunter folgen die Aktionen immer in der gleichen Reihenfolge:

1. Wareneingang / Warenausgang
2. Verschieben / Öffnen / Öffnen rückgängig machen, falls verfügbar
3. Zur Einkaufsliste – mit einem Häkchen, falls das Produkt bereits darauf steht
4. Drucken von Etiketten – welche Schaltflächen angezeigt werden, wird in den Instanzeinstellungen im ioBroker-Adminbereich unter „Etiketten“ festgelegt.
5. Bearbeiten / Löschen

---

<p align="center"><img src="../images/productButtons.jpg" width="250"><br><sub>The product page with stock, locations and buttons. "Stock in" and "Take out" (red) book the stock.</sub></p>

## Bearbeitungsprodukte

Tippen Sie auf „Bearbeiten“, um die Produkteinstellungen zu öffnen.

Wenn Sie ein Produkt manuell anlegen, schlägt ShelfMate Ihnen während der Namenseingabe passende Produkte aus einer vorgefertigten Liste vor. `Sch` Beispielsweise wird unter anderem Schokolade (Schokolade) angezeigt. Durch Antippen eines Vorschlags wird der Name übernommen und die Kategorie festgelegt, falls Sie noch keine ausgewählt haben. Für Produkte von Open Food Facts werden keine Vorschläge angezeigt, da der Name von dort stammt.

Das Formular ist in fünf Abschnitte unterteilt, die Sie aufklappen können. Geschlossene Abschnitte zeigen eine kurze Zusammenfassung, zum Beispiel `Packung · 400g · min 1` Die

| Abschnitt     | Einstellungen                                                                       |
| ------------- | ----------------------------------------------------------------------------------- |
| Grundlagen    | Produktname, Marke, Bild und Kategorie                                              |
| Aktie         | Stückzahl, Gewicht oder Volumen, Einheit, Verpackungsgröße und Mindestbestand       |
| Gruppe & Tags | Produktgruppe und zusätzliche Suchbegriffe                                          |
| Haltbarkeit   | Mindesthaltbarkeitsdatum, Standardhaltbarkeitsdatum und Haltbarkeit nach dem Öffnen |
| Mehr          | Barcode, eigene EAN, Nutri-Score, Bildlink und offene Nährwertangaben               |

Der Bereich „Grundlagen“ ist standardmäßig geöffnet, und bei neuen Produkten auch der Bereich „Lagerbestand“.

<p align="center"><img src="../images/editProduct.jpg" width="250"><br><sub>The editor has sections that can be folded, for example "Stock" (open) and "Group & tags" (red, closed).</sub></p>

### Produktgruppen

Mehrere Produkte können zu einer Gruppe zusammengefasst werden.

Beispiel: Weizenmehl von REWE, Edeka und Kaufland gehört zur gemeinsamen Gruppe Mehl.

ShelfMate addiert den Bestand dieser Produkte und berücksichtigt ihn bei der Berechnung des Mindestbestands.

Hat ein Produkt keine eigene Standardhaltbarkeitsdauer, kann der Wert seiner Produktgruppe herangezogen werden.

#### Gruppen finden und verwalten

- **Neues Produkt:** Wenn Sie ein Produkt erstellen, das zu einer bestehenden Gruppe passt, wird es dieser Gruppe automatisch zugeordnet. ShelfMate vergleicht das erste Wort des Namens (ohne Marke). „Fuchs Zimt“ und „Zimt gemahlen“ passen beide zur Gruppe Zimt. Passen mehrere Gruppen, wählt ShelfMate keine aus. Die Gruppe wird nach dem Speichern in der Meldung angezeigt.
- **Vorschläge:** Unter Aufgaben → Gruppen finden Sie Vorschläge für Produkte, die noch keiner Gruppe angehören.
- **Mehrere gleichzeitig:** Unter Aufgaben → Gruppen → Gruppe für mehrere festlegen können Sie suchen und filtern, z. B. nach Mindestbestand, Produkte auswählen und den Gruppennamen eingeben. Ein leerer Name entfernt die Produkte aus der Gruppe.
- **Verwalten:** Unter Aufgaben → Gruppen → Gruppen verwalten sehen Sie alle Gruppen. Sie können diese umbenennen, Produkte hinzufügen oder entfernen und die Gruppe auflösen. Die Produkte bleiben erhalten. Wenn Sie einer Gruppe den Namen einer anderen Gruppe geben, werden die beiden zusammengeführt.

### Nutri-Score

Den Nutri-Score wählen Sie unter „Mehr“ mit den farbigen Tasten A bis E aus.

Durch erneutes Antippen des ausgewählten Werts wird dieser entfernt.

---

## Automatische Haltbarkeitsdauer und das Glitzersymbol

ShelfMate kann Haltbarkeitsdaten vorschlagen oder automatisch eintragen.

Dies umfasst:

- Die Standardhaltbarkeit eines Produkts
- Die Haltbarkeit nach dem Öffnen
- Mindesthaltbarkeitsdaten werden beim Einlagern automatisch berechnet.

### Was bedeutet das Glitzersymbol?

Das kleine ✨ Glitzersymbol auf der Produktseite kennzeichnet Werte, die automatisch übernommen wurden.

Dies geschieht beispielsweise, wenn die Haltbarkeit aus der integrierten Lebensmittelliste oder einer Produktgruppe stammt oder wenn ein Mindesthaltbarkeitsdatum automatisch berechnet wurde.

Werte, die man selbst einbringt, setzen sich immer durch.

Wenn Sie ein automatisch vorgeschlagenes Datum ändern, wird dies fortan als manueller Wert gewertet. Das Symbol verschwindet, sobald keine automatischen Werte mehr vorhanden sind.

Das Symbol wird nur auf der Produktseite angezeigt, nicht in der Übersicht.

ShelfMate kann ältere, automatisch berechnete Daten erkennen, wenn Sie die Funktion „Haltbarkeit automatisch auffüllen“ erneut ausführen, sofern diese genau dem Einlagerungsdatum plus der Standardhaltbarkeit entsprechen.

### Wann wird das Haltbarkeitsdatum ausgefüllt?

Das stellen Sie in den Adaptereinstellungen ein.

| Einstellung      | Verhalten                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Stets            | Die App schlägt ein Datum für die Warenbestückung vor. Scannermodus und Datenpunkte füllen es automatisch aus. |
| Nur ohne die App | Automatisches Ausfüllen nur im Scannermodus und anhand von Datenpunkten                                        |
| Niemals          | Keine automatische Ausfüllfunktion und keine automatischen Vorschläge                                          |

Bei Never kann die Funktion „Haltbarkeit automatisch eintragen“ weiterhin manuell verwendet werden.

### Welche Werte werden verwendet?

Es gibt zwei Möglichkeiten:

**Alle mit einer Standard-Haltbarkeit**

Berücksichtigt Ihre eigenen Werte für das Produkt, die Werte der Produktgruppe und die integrierte Liste.

**Nur Trockenwaren aus der integrierten Liste**

Es werden ausschließlich die gespeicherten Standardwerte für typische Vorratsprodukte verwendet. Ihre eigenen Produkt- und Gruppenwerte werden daher nicht automatisch ausgefüllt.

Die integrierte Liste enthält beispielsweise Nudeln, Reis, Mehl, Konserven und Süßigkeiten.

Frische und gekühlte Produkte wie Milch, Fleisch, Wurst, Käse, Eier oder Joghurt erhalten bewusst keinen automatisch berechneten Standardwert.

Babynahrung in Gläsern (z. B. von Hipp oder Bebivita) ist 120 Tage haltbar und nach dem Öffnen nur noch 1 bis 2 Tage, da geöffnete Gläser schnell verderben.

Wichtig: Automatisch angegebene Haltbarkeitsdaten sind Richtwerte und kein tatsächliches Mindesthaltbarkeitsdatum des Herstellers. Maßgeblich ist das aufgedruckte oder manuell eingegebene Datum. Das Öffnen einer Verpackung verlängert das Mindesthaltbarkeitsdatum nicht.

### Verwaltung der Haltbarkeitswerte

Unter Aufgaben → Haltbarkeit → Haltbarkeit verwalten finden Sie alle Produkte mit ihren jeweiligen Haltbarkeitswerten.

Dort können Sie Werte bearbeiten, sie einzeln mit × entfernen oder alle auf einmal mit „Alle eigenen Werte entfernen“ löschen.

Die Änderungen treten sofort in Kraft.

Nutzen Sie die Suchfunktion oben, um schnell ein Produkt zu finden. Die Suchleiste bleibt beim Scrollen oben sichtbar, und mit × wird der Text gelöscht. Bei jedem Produkt werden die Haltbarkeit und die Haltbarkeit nach dem Öffnen angezeigt. Der graue Wert wurde von ShelfMate geschätzt, der schwarze Wert von Ihnen eingegeben.

### Regeln zur Haltbarkeit

Unter Aufgaben → Haltbarkeit → Haltbarkeit verwalten → Haltbarkeitsregeln können Sie ändern, wie ShelfMate die Haltbarkeit anhand des Produktnamens ermittelt.

Jede Regel besteht aus Schlüsselwörtern, der Haltbarkeit in Tagen und der Haltbarkeit nach dem Öffnen in Tagen. Enthält ein Produktname eines der Schlüsselwörter, greift die Regel.

- - Mit „Regel“ wird eine Regel hinzugefügt. Mit „Speichern“ bleiben Ihre Änderungen erhalten.
- Ihre eigenen Regeln werden zuerst aufgelistet. Sie haben Vorrang vor den integrierten Standardeinstellungen.
- Unten finden Sie die Standardeinstellungen mit ihren Werten. Tippen Sie auf „Bearbeiten“, um den Eintrag mit Feldern für die Stichwörter und die Tage zu öffnen. Mit „Abbrechen“ wird er geschlossen, ohne dass Änderungen vorgenommen werden.
- Während Sie Schlüsselwörter eingeben, werden Vorschläge angezeigt. Diese stammen aus den Produkten in Ihrem Sortiment.
- Die Suchfunktion oben filtert Regeln und Standardeinstellungen nach Stichwort.

Nachdem Sie eine Regel geändert haben, führen Sie im Reiter „Aufgaben“ einmal die Option „Haltbarkeit automatisch auffüllen“ aus, um die Änderung auf Produkte anzuwenden, deren Haltbarkeit zuvor geschätzt wurde.

---

## Produktdaten aktualisieren

Produkte mit bekanntem Barcode können ihre Informationen von Open Food Facts beziehen.

Im Produkteditor finden Sie ganz unten die Option „Von Open Food Facts neu laden“. Die Suche erfolgt immer aus der Quelle des Produkts. Bei Produkten ohne sichere Quelle wird „Daten aus dem Web aktualisieren“ angezeigt und eine Websuche durchgeführt. Beim Scannen fragt ShelfMate automatisch nach Open Food Facts die Datenbank dm ab, erst danach Open Beauty Facts und die anderen Schwesterdatenbanken. Die Suche nach Rossmann und die restliche Websuche starten Sie selbst. ShelfMate merkt sich die Herkunft eines Produkts, und „Tags & Nutri-Score neu laden“ aktualisiert die dm-Produkte erneut aus dm. Für dm und Rossmann verwendet ShelfMate die Shop-Kategorie als Tag und leitet daraus die Kategorie (Drogerie, Haushalt usw.) ab; bei Rossmann wird sie aus dem Produktlink abgeleitet. Drogerie- und Haushaltsprodukte erhalten keine automatische Angabe der Haltbarkeit. Die Bildersuche funktioniert analog: Bei einem Produkt aus einer Datenbank wird nur diese Datenbank abgefragt; das Web wird nur für Produkte ohne sichere Quelle genutzt. Bei Kosmetika, Tiernahrung und Haushaltsprodukten ist die Quelle Open Beauty Facts, Open Pet Food Facts oder Open Products Facts, und ShelfMate zeigt dort den entsprechenden Namen an.

Wenn Sie selbst ein Produkt anlegen (Aufgaben → Neues Produkt erstellen) und den Barcode oben eingeben, erscheint die Schaltfläche „Produktdaten suchen“. Diese fragt wie der Scanner alle Quellen in der Reihenfolge der Adaptereinstellungen ab (Open Food Facts und zugehörige Datenbanken, dm, Buchkataloge, Apotheken) und greift erst zuletzt auf das Web zu.

Wenn keine dieser Datenbanken einen Barcode kennt, ist das Produkt neu und wird unter Aufgaben → Neue Produkte bearbeiten aufgeführt. Da die Datenbanken bereits angefragt wurden, durchsucht die Schaltfläche „Im Web suchen“ im Editor dieses Produkts nur das Web. Die Suche erfolgt schrittweise und stoppt beim ersten Treffer: Zuerst fragt sie den offiziellen MCP-Dienst von dm (kostenlos, kein Schlüssel erforderlich) nach Name, Marke und Bildern. Anschließend folgen die Barcode-Datenbanken ean-suche.net (kostenlos, maximal 50 Abfragen pro Stunde, liefert auch das Bild der Produktseite), ean-search.org und, falls ein Schlüssel eingegeben wurde, Open EAN (opengtindb.org). Die Website von ean-search.org sperrt nach wenigen Abfragen; mit einem kostenlosen Token in den Adaptereinstellungen verwendet ShelfMate stattdessen die offizielle Schnittstelle und fragt diese zuerst ab. Zuletzt sucht sie den Barcode im Web, so wie ich es manuell tun würde: bei DuckDuckGo und Bing. `ean "<barcode>" <country>` Wenn das Land aus der Barcode-Vorwahl folgt (400–440 steht für Deutschland), wird es gezählt, wenn nur die Nummer angezeigt wird. Ein Treffer auf rossmann.de wird gezählt, wenn die Adresse mit dem Barcode endet, da Rossmann seine Seiten für Skripte sperrt. Der Name wird dann aus dem Suchergebnis übernommen. Seiten aus anderen Ländern (z. B. ein polnischer Shop derselben Marke) werden ignoriert. Wenn die Quellen nur den Namen kennen, werden Bilder mit diesem Namen in der Bildersuche von DuckDuckGo und Bing gesucht. Dabei zählen nur Treffer, deren Titel mindestens zwei Wörter des Produktnamens enthält. Die Meldung nennt die Quelle. Überprüfen Sie die Daten vor dem Speichern. Ein Treffer der Websuche zählt nur, wenn die Seite oder das Suchergebnis den Barcode tatsächlich anzeigt; andernfalls bleibt das Produkt unverändert. Eine graue Linie unter dem Button zeigt die ausgeführten Schritte an. Diese Schritte werden nie automatisch ausgeführt, sondern nur beim Antippen des Buttons. Dabei wird nur der Barcode gesendet. Um nur nach einem Bild zu suchen, verwenden Sie „Bilder suchen“ neben dem Bild. Zuerst werden die offenen Datenbanken abgefragt, und nur wenn diese nichts enthalten, wird das Web durchsucht. Bei Produkten, deren Daten nicht aus einer solchen Datenbank stammen, sucht die Option „Daten aus dem Web aktualisieren“ unten im Editor erneut und füllt die Felder aus (die Daten werden erst nach dem Tippen auf „Speichern“ gespeichert). Falls die Suche keine Ergebnisse liefert, finden Sie unter „Technische Details“ ganz unten ein kurzes Protokoll, das Sie in einen Fehlerbericht kopieren können. Sind unter „Aufgaben“ → „Neue Produkte bearbeiten“ mehrere neue Produkte vorhanden, durchsucht die Option „Alle im Web suchen“ diese nacheinander und zeigt den Fortschritt an. Anschließend werden alle Treffer mit Name, Marke, Größe, Bild und Quelle in einer Übersicht aufgelistet. Deaktivieren Sie die falschen Treffer und tippen Sie auf „Ausgewählte übernehmen“. Nur die markierten Produkte werden gespeichert; die übrigen bleiben in der Liste unverändert. Sie können die Websuche in den Adaptereinstellungen deaktivieren.

Diese Details wurden aktualisiert:

- Name und Marke
- Verpackungsgröße
- Produktbild
- Kategorie
- Nutri-Score
- Zusätzliche Tags

Selbst erstellte Tags bleiben erhalten.

Die Änderungen werden erst wirksam, wenn Sie auf „Produkt speichern“ tippen. Sie können das Ergebnis also zuerst überprüfen und das Formular schließen, ohne zu speichern.

Bei Produkten von Open Food Facts ist der Barcode im Editor gesperrt.

---

## Einlagern, Auslagern und Umräumen

So funktioniert eine normale Buchung:

1. Tippen Sie unten rechts in der Übersicht auf „Scannen“ und erfassen Sie den Barcode mit der Kamera oder geben Sie ihn ein.
2. Bei bekannten Produkten öffnet sich die Produktseite.
3. Unbekannte Barcodes werden in Open Food Facts, in Buchkatalogen, Zeitschriften und Notenblättern sowie in der Apotheke (Apothekenkatalog) nachgeschlagen. Sie können die gefundenen Informationen überprüfen und speichern.
4. Wählen Sie zwischen Einlagerung, Entnahme oder Umlagerung.
5. Geben Sie den Betrag und den Lagerort ein und speichern Sie die Buchung.

Sie können den Speicherort aus der Liste auswählen oder den zugehörigen QR-Code direkt scannen.

Alle Buchungen werden im Verlauf gespeichert.

---

## Lagerplätze schaffen

ShelfMate unterscheidet zwischen Lagerbereichen und Lagerorten.

Beispiel:

- Bereich: Speisekammer
- Standort: Regal 1

Unter „Standorte“ können Sie beides erstellen und bearbeiten.

<p align="center"><img src="../images/locationEdit.jpg" width="250"><br><sub>A storage location with its QR code text. The checkbox "Consumables" lists the stock of this location in a data point.</sub></p>

### Verbrauchsmaterial

Die Funktion „Verbrauchsmaterialien“ gibt den Bestand eines Lagerorts als Datenpunkt aus. Sie ist für Orte gedacht, aus denen Sie regelmäßig Dinge entnehmen, z. B. Kühlschrank, Speisekammer oder Gefrierschrank. Ein Skript, eine visuelle Anzeige (VIS) oder eine Sprachausgabe kann dann anzeigen, was sich aktuell im Kühlschrank befindet, was geöffnet ist und was bald abläuft.

Aktivieren Sie beim Bearbeiten des Standorts die Option „Verbrauchsmaterialien“. Der Bestand aller aktivierten Standorte wird dann zusammengeführt und in zwei Datenpunkten unter „Verbrauchsmaterialien“ aufgelistet. `shelfmate.0.stats`:

| Datenpunkt              | Beschreibung                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stats.consumables`     | JSON-Liste mit Name, Marke, Menge, Einheit, Standorten, geöffneter Menge, nächstliegendem Mindesthaltbarkeitsdatum, verbleibenden Tagen und `expiring` |
| `stats.consumablesText` | Eine Zeile pro Produkt, zum Beispiel `2 Stück Joghurt (1 geöffnet, MHD 2026-10-25)`                                                                     |

Der Text zeigt die geöffnete Menge und das Mindesthaltbarkeitsdatum nur dann an, wenn etwas geöffnet ist oder bald abläuft. Das ist praktisch für die Rezeptplanung oder für eigene Rezepte.

### Gefrierfachstandorte

Aktivieren Sie beim Bearbeiten eines Lagerorts (Gefriertruhe, Gefrierschublade) die Option „Gefrierfach“. Alle dort gelagerten Lebensmittel erhalten die Haltbarkeitsdauer für Gefriergut anstelle der normalen Haltbarkeitsdauer, da Lebensmittel gefroren deutlich länger haltbar sind.

- **Eigener Wert pro Produkt:** Geben Sie auf der Produktseite „Gefroren, in Tagen“ ein. Ohne diese Angabe wird der Standardwert aus den Adaptereinstellungen verwendet (180 Tage; 0 deaktiviert diese Funktion).
- **Einlagern in den Gefrierschrank:** Wenn Sie ein Produkt von einem normalen Lagerort in den Gefrierschrank umlagern, wird das Mindesthaltbarkeitsdatum auf das heutige Datum plus die Haltbarkeit im Gefrierschrank festgelegt. Beim Zurückräumen bleibt dieses Datum erhalten.
- **Öffnen:** Wählen Sie unter „Gefrierfach“ die Option „Nach dem Öffnen verschieben nach“ (z. B. Kühlschrank). Wenn Sie eine Packung aus dem Gefrierfach öffnen, wird sie automatisch dorthin verschoben. Das Datum richtet sich dann nach dem Mindesthaltbarkeitsdatum nach dem Öffnen. Mit „Rückgängig“ können Sie die Verschiebung rückgängig machen. Der Verlauf zeigt die Verschiebung an (z. B. „Gefrierschrank → Kühlschrank“). Mit „Öffnung rückgängig machen“ auf der Produktseite legen Sie die Packung wieder ins Gefrierfach.
- **Tiefgekühlt gekauft:** Markieren Sie auf der Produktseite „Tiefkühlprodukt“ bei Produkten, die Sie tiefgekühlt kaufen, wie z. B. Pommes frites. Diese behalten auch im Gefrierschrank ihre normale Haltbarkeit.
- **Vakuumverpackt und gefroren:** Aufschnitt behält denselben Barcode. Weisen Sie dem Produkt seinen eigenen Tiefkühlwert zu und drucken Sie das „Gefrier-EAN-Etikett“ von der Produktseite aus.

Das Datum wird nur dann automatisch ausgefüllt, wenn die automatische Haltbarkeitsdauer für die Einlagerung aktiviert ist; Sie können es jederzeit manuell ändern.

### Standardspeicherort für Kategorien

Am unteren Rand eines Lagerplatzes befindet sich die Option „Standardkategorien“. Aktivieren Sie beispielsweise die Option „Bücher“ beim Bücherregal. Beim Einräumen wird dann ein Produkt dieser Kategorie für diesen Lagerplatz vorgeschlagen. Ein externer Scanner bucht es dort ein, falls Sie keinen Lagerplatz angeben. Jede Kategorie ist nur einem Lagerplatz zugeordnet; wenn Sie sie an einem anderen Lagerplatz aktivieren, wird sie dorthin verschoben. Falls ein Produkt bereits einen eigenen Lagerplatz hat, gilt dieser.

Mit einem externen Scanner genügt ein einziger Scan: Scannen Sie nur den Barcode des Buches. Nach einer Wartezeit (standardmäßig 10 Sekunden) bucht ShelfMate das Buch am Standardlagerplatz ein, und die Rückmeldung zeigt diesen Lagerplatz direkt beim Scannen an. Scannen Sie innerhalb dieser Zeit einen weiteren Lagerplatz, zählt dieser. Scannen Sie das Buch erneut, entnehmen Sie es wie gewohnt. Beginnen Sie mit dem Einräumen (erst einen Lagerplatz, dann die Produkte scannen), zählt der gescannte Lagerplatz und der Standardlagerplatz wird überschrieben. Auch beim Einräumen in der App wird der von Ihnen gewählte Lagerplatz belegt. Im Zählmodus wird der letzte Lagerplatz des Produkts zuerst angezeigt, dann der Standardlagerplatz der Kategorie.

### QR-Codes für Lagerorte

Jeder Speicherort erhält einen eigenen Code.

Öffnen Sie den Standort und wählen Sie die gewünschte Bezeichnung aus:

- Nur QR-Code
- Großes Regaletikett
- Kartonetikett mit Inhalt

Alternativ können Sie Standortetiketten mit einem Code-128-Barcode erstellen. Dies ist besonders praktisch für Scanner ohne QR-Code-Unterstützung.

Den Code-Typ wählen Sie unter Einstellungen → Bezeichnungen.

### Etikettengröße

Sie legen die Etikettengröße einmal fest, zum Beispiel 50 × 30 mm.

Für große Regaletiketten, Kartonetiketten und ganzseitige Codes sind auch Ihre eigenen Formate wie A6, A5 oder A4 möglich.

Welche Beschriftungsschaltflächen in der App angezeigt werden, wählen Sie in den Instanzeinstellungen im ioBroker-Adminbereich unter „Beschriftungsschaltflächen in der App“ aus. Die Beschriftungsgröße legen Sie direkt in den App-Einstellungen fest.

Nach der Erstellung können Sie das Etikett als Bild speichern oder direkt ausdrucken.

---

## Produkte ohne Barcode

Auch Produkte ohne Hersteller-Barcode können verwaltet werden.

1. Das Produkt wird von Hand gefertigt.
2. Im Editor die Option „EAN generieren“ auswählen.
3. Drucken Sie den eigenen EAN-13-Code als Etikett.
4. Kleben Sie das Etikett auf das Produkt oder den Behälter.

Danach kann das Produkt wie jedes andere gescannt werden.

Sie können auch Ihr eigenes Produktbild hochladen. ShelfMate verkleinert es automatisch.

### Ihre eigene Produktdatenbank

Neben Open Food Facts kann ShelfMate auch Ihre eigene Datenbank verwenden. Diese wird beim Scannen oder Eingeben eines Barcodes zuerst abgefragt, sodass Ihre eigenen Namen, Gruppen und Haltbarkeitsdaten verwendet werden.

Der Datenpunkt `ownDb.data` Existiert immer. Fügen Sie Ihre Datenbank dort als JSON-Liste ein, zum Beispiel:

`[{"ean":"4006381333931","name":"Oat flakes","brand":"Demo","shelfLifeDays":365}]`

Produkte mit einem von ShelfMate automatisch generierten Barcode (EAN-Generierung) werden dieser Liste automatisch hinzugefügt. Bei einer Datenwiederherstellung oder -verschiebung erhält dasselbe Produkt denselben Barcode erneut. Selbst hinzugefügte Einträge bleiben unverändert.

In den Adaptereinstellungen können Sie weitere Quellen hinzufügen, die alle schreibgeschützt sind:

- ein Datenpunkt in der Datenbank (JSON- oder CSV-Text)
- eine Datei auf dem System oder auf einem eingebundenen Netzlaufwerk
- die Webadresse einer Datei (http oder https), die nach der Aktualisierungszeit erneut geladen wird

JSON-Listen, JSON-Objekte mit Barcodes als Schlüsseln und CSV-Dateien mit Kopfzeile werden erkannt; die Option „Automatisch erkennen“ wählt das richtige Format aus.

Falls Ihre Daten andere Namen verwenden, tragen Sie diese in die Tabelle „Feldnamen in Ihren Daten“ ein, z. B. das Feld „Name“ →`Krömpel` Ein Punkt greift in verschachtelte Daten hinein (`data.title` Jedes Produktfeld kann zugeordnet werden: Barcode, Name, Marke, Packungsgröße, Einheit, Kategorie, Produktgruppe, Tags, Bild-URL, Mindestbestand und Haltbarkeit (normal, nach dem Öffnen, gefroren). Neben dem Barcode wird nur der Name benötigt. Der Datenpunkt `ownDb.data` verwendet immer die ShelfMate-Namen.

Unter „Nutzung der eigenen Datenbank“ wählen Sie:

| Einstellung                                  | Verhalten                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Erst die eigene Datenbank, dann das Internet | Eigene Daten sind entscheidend, Open Food Facts und das Internet helfen nur, wenn nichts gefunden wird. |
| Nur eigene Datenbank                         | Das Internet wird überhaupt nicht gefragt                                                               |
| Nicht verwendet                              | Nur das Internet, wie zuvor                                                                             |

Ein dort gefundenes Produkt wird wie jedes andere in den Editor eingepflegt oder direkt beim Einlagern oder Scannen erstellt.

---

## Bücher, Zeitschriften, Notenblätter und Medikamente

ShelfMate erkennt diese Produkte anhand der Nummer im Barcode und sucht sie in den entsprechenden Katalogen. Lebensmitteldatenbanken kennen sie nicht.

### Bücher, Zeitschriften und Noten

- **Bücher:** Der Barcode auf der Rückseite ist die ISBN-13 (beginnt mit 978 oder 979). Eine ISBN-10 oder eine ISBN mit Bindestrichen (`ISBN 3-16-148410-0` Auch das, was Sie tippen oder scannen, wird erkannt.
- **Zeitschriften:** Der Barcode beginnt mit 977 und enthält die ISSN.
- **Noten:** Die ISMN beginnt mit 9790.

Die Suche durchsucht Open Library, die Deutsche Nationalbibliothek (über lobid.org) und zuletzt Google Books. Bei deutschen Büchern (978-3) frage ich zuerst die Nationalbibliothek an. Das Produkt erhält die Kategorie „Bücher“, den Autor als Marke, die Seitenzahl als Packungsgröße (z. B. „96 S.“) und, falls vorhanden, das Coverbild. Noten erhalten zusätzlich das Tag „Noten“, Zeitschriften das Tag „Zeitschrift“. Falls keine Quelle das Buch kennt, bleibt es als unvollständiges Produkt in der Liste „Aufgaben → Neue Produkte bearbeiten“.

Als Schlagwörter verwende ich bekannte Genres wie „Kinderbuch“, „Krimi“ oder „Kochbuch“ aus den Katalogeinträgen sowie für deutsche Bücher bis zu drei Schlagwörter der Nationalbibliothek. Fehlen Cover oder Seitenzahl in einem Katalog, ergänzt ShelfMate diese Daten aus einem anderen Katalog. Fehlt ein Bild, frage ich den Cover-Service der Nationalbibliothek und der Open Library anhand der ISBN ab. Kleine Cover sind im Produkt selbst gespeichert und somit auch ohne Verknüpfung vorhanden.

Bei Produkten der Kategorie „Bücher“ blendet der Editor alle relevanten Lebensmittelinformationen aus: Haltbarkeitsdatum (Mindesthaltbarkeitsdatum, Standardhaltbarkeitsdatum, nach dem Öffnen, gefroren), Verpackungsart, Einheit und Nährwertkennzeichnung. Ein Buch wird immer als ein Stück gezählt. Beim Einlagern wird kein Mindesthaltbarkeitsdatum abgefragt, und Datumsangaben aus einem Data-Matrix-Code werden für Bücher ignoriert. Auch die Kennzeichnungen „geöffnet“, „gefroren“ und „verdorben“ beim Entnehmen werden entfernt. Unter „Marke“ wird „Autor/Verlag“ und unter „Packungsgröße“ „Seiten“ angezeigt.

### Medikamente

Sie erkennen ein Arzneimittel an seiner Apothekenproduktnummer (PZN). ShelfMate liest diese vom Barcode der Packung (Code 39 oder die 13-stellige Nummer, die mit 4150 beginnt) oder von der reinen PZN (8-stellig, ebenfalls mit …). `PZN-` vorne) und aus dem Data Matrix-Code auf der Verpackung.

Beim Scannen eines Barcodes sucht ShelfMate automatisch bei Shop Apotheke nach der PZN und, falls diese dort nicht vorhanden ist, bei vitality-fit.de. Name, Marke, Packungsgröße und Bild werden übernommen, und die Kategorie lautet „Medikamente“. Shop Apotheke kennt auch herkömmliche Barcodes: Findet keine andere Quelle ein Produkt, fragt ShelfMate zusätzlich bei den Apotheken nach, beispielsweise bei Nahrungsergänzungsmitteln oder Pflegeprodukten. Ein Treffer zählt nur, wenn die Produktseite den Barcode korrekt angibt; die Kategorie lautet „Medikamente“, wenn die Seite ein Medikament anzeigt, andernfalls „Sonstige“. Kennt keine Apotheke die Nummer, erscheint „Unbekanntes Produkt …“ in der Kategorie „Medikamente“. Diese Information können Sie über die Websuche oder manuell ergänzen.

### Mindesthaltbarkeitsdatum aus dem Data-Matrix-Code

Der Data-Matrix-Code auf Medikamentenverpackungen (PPN) enthält neben der PZN das Verfallsdatum und die Chargennummer. GS1-Codes mit Verfallsdatum (Anwendungskennung 17) werden ebenfalls gelesen. ShelfMate speichert dieses Datum als Mindesthaltbarkeitsdatum, wenn Sie in der App und im Scannermodus ein Regal bestücken. Tag „00“ bedeutet der letzte Tag des Monats.

### Reihenfolge der Produktquellen

Wenn Sie viele Bücher scannen, möchten Sie nicht bei jedem Scan zuerst die Lebensmitteldatenbanken abfragen. Deshalb gibt es in den Adaptereinstellungen unter „Produktsuche“ die Tabelle „Reihenfolge der Produktquellen“. Die Standardreihenfolge ist:

1. Lebensmittel (Öffnen Sie die Lebensmittelfakten)
2. Drogerie (Open Beauty Facts, dm)
3. Tierbedarf (Fakten zu Tierfutter öffnen)
4. Haushaltswaren (Fakten zu offenen Produkten)
5. Arzneimittel und Apotheke (PZN und Barcode: Shop Apotheke, vitality-fit)
6. Bücher, Zeitschriften, Noten (Offene Bibliothek, Deutsche Nationalbibliothek)

Ändern Sie die Reihenfolge, indem Sie die Zeilen verschieben oder die Quelle innerhalb einer Zeile ändern. Die oberste Zeile wird zuerst abgefragt. ShelfMate fügt fehlende Quellen am Ende hinzu. Bei Apotheken wird jeder Barcode abgefragt, bei Büchern nur ISBN, ISSN und ISMN. Starten Sie den Adapter nach jeder Änderung neu. Die Einstellung gilt für die App und den Scannermodus.

ShelfMate erkennt die Bedeutung eines Codes: ISBN, ISSN oder ISMN fragen zuerst die Buchkataloge ab, PZN zuerst die Apotheken – je nach Tabelle. Kennt der Katalog den Artikel, ist die Suche abgeschlossen und es wird keine Lebensmitteldatenbank angefragt. Nur wenn der Artikel dort nicht bekannt ist, werden die anderen Quellen durchsucht. Alle anderen Barcodes folgen der Tabelle; dm folgt direkt auf die erste Open Facts-Datenbank.

Diese Abfolge ist überall gleich: Scannen mit dem Smartphone, mit dem externen Scanner, Einlagerung, Produktanlage und Stapelimport. Ihre eigene Datenbank hat immer Vorrang. Die Websuche erfolgt nie eigenständig, sondern erst nach der Datenbanksuche und per Knopfdruck: „Produktdaten suchen“ im Produkteditor und „Geöffnete Produkte im Web suchen“ beim Stapelimport. Die Textsuche im Web läuft mit strenger Sicherheitsprüfung über DuckDuckGo, Bing und Mojeek.

## Mindestbestand und Einkaufsliste

Sie können für jedes Produkt einen Mindestbestand festlegen.

Beispiel: Man sollte immer mindestens zwei Packungen Nudeln vorrätig haben.

Sobald der Lagerbestand auf zwei Packungen oder weniger sinkt, kann ShelfMate die Nudeln automatisch auf Ihre Einkaufsliste setzen.

Bei Produktgruppen wird der Lagerbestand der Produkte innerhalb der Gruppe zusammengezählt.

In der Übersicht zeigt ein Häkchen an, welche Produkte sich bereits auf der Einkaufsliste befinden. Durch Antippen des Häkchens wird der Eintrag wieder entfernt, sofern die entsprechenden Einstellungen aktiviert sind.

Die Verbindung zur Einkaufsliste wird in den Adaptereinstellungen eingerichtet.

### Obst und Gemüse aus der Skala (PLU)

Lose Obst- und Gemüsesorten haben keinen Barcode, sondern nur eine vierstellige Produktnummer (PLU), z. B. 4011 für gelbe Bananen. Bio-Produkte haben eine vorangestellte 9 (94011). ShelfMate kennt die internationale Liste dieser Nummern (ca. 1.500 Nummern, IFPS-Liste 2024, mit einer Bezeichnung in jeder Sprache des Adapters), sodass ein Scan oder die Eingabe der Nummer das Produkt automatisch erstellt. Die Kategorie ist immer „Lebensmittel“.

Die Etiketten von Waagen (z. B. von REWE) enthalten die Zahl in einem Data-Matrix-Code. ShelfMate liest diese Zahl aus, entweder mit einem Scanner oder mit der Kamera. Preis und Gewicht auf dem Etikett werden nicht verwendet.

Manche Nummern werden vom Händler vergeben und enthalten lediglich die Bezeichnung „Bananen“. REWE druckt beispielsweise für die Nummer 4238 „Bio-Banane“ auf das Etikett, der Code selbst enthält aber nur die Nummer. Um Ihre eigene Bezeichnung zu erhalten, geben Sie diese im Datenfeld ein. `plu.data`:

```json
{ "4238": "Banane Bio", "4400": { "name": "Pfirsich", "packageSize": "500 g" } }
```

Ihre eigenen Einträge haben Vorrang vor der integrierten Liste. Sie können die Felder Ihrer eigenen Produktdatenbank verwenden (`name`, `category`, `group`, `unit`, `shelfLifeDays`, ...). Ein Produkt wird nur einmal erstellt; danach wird es anhand seiner Nummer gefunden.

### Festlegung des Mindestbestands für mehrere Produkte

Wenn für viele Produkte der gleiche Mindestbestand gelten soll, zum Beispiel 1 Stück für alle Gewürze, müssen Sie nicht jedes Produkt einzeln öffnen.

1. Öffnen Sie die Seite „Aufgaben“ und tippen Sie unter „Mindestbestand“ auf „Mindestbestand für mehrere festlegen“.
2. Suchen Sie nach einem Stichwort wie „Gewürze“ oder wählen Sie einen Bereich, einen Ort oder eine Kategorie wie in der Übersicht. Unter „Nicht festgelegt“ werden nur Produkte ohne Mindestbestand angezeigt.
3. Markieren Sie die Produkte oder tippen Sie auf „Alle auswählen“, um alle angezeigten Produkte zu kennzeichnen.
4. Geben Sie die Zahl ein und tippen Sie auf „Festlegen“. Geben Sie 0 ein, um den Mindestbestand wieder zu entfernen.

Die Auswahl bleibt auch beim Wechsel der Suche erhalten, sodass Sie Produkte aus mehreren Suchen sammeln und alle gleichzeitig festlegen können.

### den fehlenden Betrag eintragen

Mit der Option „Fehlende Menge in die Liste schreiben“ (Bring! Spezial- und Skriptmodus) gibt ShelfMate auch die fehlenden Mengen an. Beispiel: Mindestbestand 5 für Mehl.

- Die Aktie fällt auf 5: die Liste wird `Flour, 1` Die
- Der Aktienkurs fällt weiter auf 3: Nur die Differenz wird addiert. Mit Bring! Special wird der Einstieg zu `Flour, 3` Im Skriptmodus erhält Ihr Skript `Flour, 2` und addiert den Betrag selbst.
- Die Aktie fällt von 8 direkt auf 3: die Liste wird `Flour, 2` Die

---

## Haltbar bis

ShelfMate unterstützt drei Modi.

| Modus       | Beschreibung                                                    |
| ----------- | --------------------------------------------------------------- |
| Aus         | Kein Mindesthaltbarkeitsdatum                                   |
| Pro Produkt | Ein gemeinsames Mindesthaltbarkeitsdatum für das Produkt        |
| Pro Strumpf | Jeder Strumpf kann sein eigenes Mindesthaltbarkeitsdatum haben. |

### Mindesthaltbarkeitsdatum pro Strumpf

Bei der Einlagerung kann jede Packung ihr eigenes Datum erhalten.

Mehrere Mindesthaltbarkeitsdaten werden pro Produkt und Standort separat gespeichert.

Bei der Entnahme oder dem Umlagern von Waren wird der Bestand mit dem ältesten Mindesthaltbarkeitsdatum zuerst verwendet.

Falls ein Datum fehlt, kann ShelfMate es anhand der Standardhaltbarkeit berechnen. Hierfür wird das Einlagerungsdatum aus dem Verlauf verwendet.

### Öffnen einer Verpackung

Mit der Funktion „Öffnen“ können Sie ein einzelnes Paket als geöffnet markieren.

ShelfMate bewahrt diese Verpackung dann separat auf und verwendet sie zuerst beim Herausnehmen.

Wird ein Produkt nach dem Öffnen weitergelagert, wird daraus ein neues Mindesthaltbarkeitsdatum berechnet. Das bisherige Mindesthaltbarkeitsdatum bleibt bestehen.

Wenn die Rückgängig-Funktion geöffnet ist, können Sie den Vorgang zurücksetzen.

### Verdorbene Produkte

Beim Mitnehmen kann man zwischen gebraucht und verdorben unterscheiden.

Verdorbene Produkte werden nicht zum normalen Verbrauch gezählt. In der Historie werden sie für 30 Tage zusammengefasst.

### Buchungen stornieren

Im Verlauf können Sie die letzte Buchung rückgängig machen.

Im Scannermodus wird der Steuercode `SM:UNDO` ist dafür verfügbar.

Für Umzüge und Inventuren funktioniert das dort nicht.

<p align="center"><img src="../images/history.jpg" width="250"><br><sub>The history with the button to undo the last booking.</sub></p>

### Änderung des Mindesthaltbarkeitsdatums

Im Modus „Pro Lagerbestand“ werden unter „Mindesthaltbarkeitsdatum bearbeiten“ alle Packungen einzeln angezeigt – auch bereits geöffnete.

Sie können das Datum manuell eingeben oder die Schnellzugriffstasten verwenden:

- +1 Tag
- +3 Tage
- +5 Tage
- +10 Tage
- Kein Datum

Speichern wendet alle Änderungen an. Die Änderungen werden im Verlauf angezeigt und können rückgängig gemacht werden.

Im Scannermodus können Sie für alle ungeöffneten Artikel ein neues Mindesthaltbarkeitsdatum festlegen mit `SM:DATE:<days>` anschließend wird das Produkt gescannt.

`SM:DATE:0` Entfernt das Datum.

### Schnelles Eingeben eines Datums

Neben normalen Datumsangaben versteht ShelfMate auch Kurzformen.

| Eingang  | Bedeutung             |
| -------- | --------------------- |
| +3d      | In 3 Tagen            |
| +2w      | In 2 Wochen           |
| +1m      | In einem Monat        |
| +1 Jahr  | In einem Jahr         |
| 12/26    | Ende Dezember 2026    |
| 2412     | Nächster 24. Dezember |
| 24.12.   | Nächster 24. Dezember |
| 24.12.26 | 24. Dezember 2026     |
| X        | Kein Datum            |

Unterhalb des Eingabefelds wird eine Vorschau des erkannten Datums angezeigt.

Tippen Sie auf × im Feld, um es zu leeren; die Tastatur wird ausgeblendet. Sind für das Produkt bereits Lagerdaten vorhanden, werden diese als Schaltflächen unterhalb des Feldes angezeigt, sodass Sie per Fingertipp ein Datum auswählen können. Wenn Sie mehrere Pakete gleichzeitig bearbeiten, kopiert „Wie oben“ das Datum der darüberliegenden Zeile. Nach „Datum festlegen“ ist das Feld wieder leer.

Außerdem gibt es Schnellzugriffstasten für +1 bis +14 Tage, +3 Wochen, +1 Monat, +3 Monate, +6 Monate und +1 Jahr.

### Ablaufwarnungen

Produkte, deren Ablaufdatum bald erreicht ist oder die bereits abgelaufen sind, werden in der App entsprechend gekennzeichnet, zum Beispiel mit:

- "Läuft in 3 Tagen ab"
- "Abgelaufen"

Die Informationen sind auch in den Datenpunkten verfügbar. `stats.expiring*` Die

Unter Datumsformat können Sie zwischen 31.10.2026, 31/10/2026 und 2026-10-31 wählen.

---

## Einkaufslistenmodi

ShelfMate unterstützt vier Möglichkeiten, Produkte auf eine Einkaufsliste zu setzen.

### Aus

Es werden keine Produkte automatisch einer Einkaufsliste hinzugefügt.

### Skript

ShelfMate schreibt den Artikelnamen mit `ack=false` in einen Datenpunkt Ihrer Wahl.

Optional können Sie auch einen Datenpunkt mit der aktuellen Einkaufsliste benennen. Es wird ein JSON-Array von Objekten erwartet, wobei jedes Objekt eine `name` Der Inhalt muss folgendermaßen aussehen:

```json
[
  { "name": "Mehl" },
  { "name": "Milch" },
  { "name": "Feta" }
]
```

ShelfMate erkennt damit bereits vorhandene Produkte und vermeidet doppelte Einträge.

Die Objekte können weitere Felder enthalten, beispielsweise einen Betrag oder eine Beschreibung. ShelfMate liest nur diese Felder. `name` und ignoriert den Rest.

Wenn die Option „Fehlenden Betrag schreiben“ aktiviert ist, schreibt ShelfMate den Text `Name, amount` statt des einfachen Namens in den Datenpunkt einzugeben, zum Beispiel `Milk, 2` Ihr Skript teilt den Text am Komma und addiert die Beträge selbst, da ShelfMate in diesem Fall nicht auf Duplikate prüft.

Alternativ liest Ihr Skript den Datenpunkt. `shopping.lastItem` Es speichert das zuletzt hinzugefügte Element als JSON, sodass Sie den Text nicht aufteilen müssen:

```json
{ "name": "Mehl", "quantity": 500, "unit": "g", "text": "500 g" }
```

`quantity` ist eine Zahl oder `null`, `unit` Das Feld ist leer, wenn keine Einheit vorhanden ist. Der Datenpunkt wird nur im Skriptmodus ausgefüllt.

Zum Entfernen von Elementen kann ein weiterer Datenpunkt festgelegt werden. Der Elementname wird dort mit `ack=false` sowie.

Nur mit diesem Datenpunkt funktionieren das Entfernen über das Häkchen in der App und die automatische Entfernung nach dem Nachfüllen.

### Bringen!

ShelfMate kann direkt mit dem Bring!-Adapter verwendet werden.

Die verfügbaren Listen werden automatisch erkannt. Alternativ können Sie den Kanal auch manuell eingeben, zum Beispiel:

```
bring.0.<list-id>
```

ShelfMate liest den Listeninhalt durch `<Liste>.content` und fügt neue Produkte hinzu durch `<Liste>.saveItem` Die

Produkte, die bereits in der Liste enthalten sind, werden nicht erneut aufgenommen.

Bei einem Eintrag mit einem Komma wird nur der Artikelname vor dem ersten Komma verwendet.

### Bringt etwas Besonderes mit!

Dieser Modus berücksichtigt auch Mengen und Varianten.

Beispiele:

- `Mehl` →`Mehl, 2` →`Mehl, 3`
- `Feta, 200g` und dann `Feta, Kräuter` **einen** Eintrag geben: `Feta, Kräuter, 200g` Sie sehen also: ein Feta mit 200 g und ein Feta als Kräutervariante.
- Wenn ein anderer `Feta, Kräuter` wird hinzugefügt, lautet der Eintrag `Feta, Kräuter 2, 200g`

Vorhandene Artikel werden also nicht einfach übersprungen. Stattdessen erhöht ShelfMate die Menge oder fügt die Variante hinzu.

Die Einträge werden nacheinander verarbeitet. Der nächste Eintrag wird erst weitergeleitet, wenn der Bring!-Adapter seine Liste aktualisiert hat.

Dies ist besonders hilfreich bei der Überprüfung der Zutaten.

### Datenpunkt Shopping.addItem

Mit `shopping.addItem` Sie können Produkte unabhängig von der App auf die Einkaufsliste setzen.

Der aktuell ausgewählte Einkaufslistenmodus wird immer verwendet.

### Produkte automatisch entfernen

Mit Bring!, Bring! Special und einem Skript mit der Option „Datenpunkt entfernen“ gibt es zwei unabhängige Optionen:

**Von der Liste streichen, sobald die Liste wieder aufgefüllt ist.**

Sobald der Lagerbestand den Mindestbestand wieder übersteigt, wird das Produkt von der Einkaufsliste entfernt.

Standardmäßig deaktiviert.

**Streichen Sie den Eintrag von der Liste, sobald das Häkchen entfernt wurde.**

Durch Antippen des Häkchens in der App wird das Produkt auch aus der verknüpften Einkaufsliste entfernt.

Wenn die Funktion deaktiviert ist, verschwindet nur die Markierung in ShelfMate.

Standardmäßig aktiviert.

Nur Artikel, die tatsächlich auf der Liste stehen, werden entfernt. Bei Bring! erfolgt die Entfernung über `<Liste>.removeItem` Die

---

## Zutaten prüfen

ShelfMate kann eine Zutatenliste mit Ihrem aktuellen Lagerbestand vergleichen.

Die Rezepte selbst werden nicht in ShelfMate gespeichert. Stattdessen übergeben Sie eine Zutatenliste, beispielsweise aus einer Rezept-App.

### Übergabe der Zutaten

Tragen Sie die Zutaten in den Datenpunkt ein. `check.request` mit `ack=false` Die

Mögliche Formate:

- Eine Zutat pro Zeile
- Zutaten durch Semikolons getrennt
- Ein JSON-Array von Texten
- Ein JSON-Array von Objekten mit `name`, `amount` Und `unit`

Beispiele:

```
Zwiebeln, rot, 1
Cherrytomaten, bunt, 500g
Salz, 0.5 tl
Basilikum
```

Diese Schreibweisen sind ebenfalls anerkannt:

```
380g Linguine
2EL Olivenöl
Mehl 200g
```

Unterstützte Einheiten sind kg, g, l, ml, cl und Stück.

Spezifikationen wie EL oder TL (Esslöffel, Teelöffel) werden nur auf ihr Vorhandensein geprüft.

Identische Zutaten werden addiert.

### So funktioniert der Vergleich

ShelfMate prüft zuerst den Produktnamen, dann die Produktgruppe und zuletzt das letzte Wort. Dieses gibt die Produktart an: „Kartoffel Rösti“ ist eine Rösti und zählt nicht zu den Kartoffeln. Zahlen, Mengenangaben und das Suffix „Fett“ werden ignoriert, daher zählt „H-Milch 3,5 % Fett“ zu Milch. Namen mit „mit“, „und“, „in“ oder „&“ (z. B. „Reis mit Karotten“) bezeichnen Gerichte und werden nie über ein einzelnes Wort, sondern nur über den vollständigen Namen oder die Produktgruppe gefunden. Der erste Treffer gewinnt. Schlagwörter werden beim Vergleich nicht berücksichtigt, da sie oft zu allgemein sind (z. B. „Frischkäse“ bei jedem Frischkäseprodukt).

Ganze Wörter werden verglichen.

Beispiel: Cherrytomaten werden nicht automatisch als Tomaten erkannt. Weisen Sie das Produkt daher der Gruppe „Cherrytomaten“ zu. Dasselbe gilt für zwei Bezeichnungen für ein und dasselbe Produkt, zum Beispiel Vanillezucker und Vanillinzucker: Weisen Sie beide Produkte der Gruppe „Vanillezucker“ zu.

Bei Produkten, die nach Gewicht oder Volumen verkauft werden, wird der tatsächliche Lagerbestand verwendet.

Beispiel: 500 g Mehl im Vorrat, 200 g benötigt – die Zutat ist verfügbar.

Verpackungsgrößen wie z. B. 1 kg werden entsprechend umgerechnet.

Bei Zutaten ohne Mengenangabe genügt ein positiver Vorrat.

Unbekannte Zutaten gelten als fehlend. Auf diese Weise können auch andere Artikel aus dem Einkauf übernommen werden.

### Ergebnis

Nach jeder Überprüfung stehen folgende Datenpunkte zur Verfügung:

| Datenpunkt           | Inhalt                                    |
| -------------------- | ----------------------------------------- |
| `check.result`       | Ergebnis für jede einzelne Zutat als JSON |
| `check.available`    | Zutaten vorrätig                          |
| `check.missing`      | Fehlende Zutaten                          |
| `check.allAvailable` | Das stimmt, wenn alles auf Lager ist.     |

Die Listen enthalten die ursprünglichen Zutatenlisten, jeweils eine pro Zeile.

Mit `check.addMissing` Sie können die fehlenden Zutaten auf die Einkaufsliste setzen.

Alternativ können Sie in den Adaptereinstellungen die Option „Fehlende Zutaten auf die Einkaufsliste setzen“ aktivieren. Diese werden dann nach jeder Überprüfung automatisch übermittelt.

Bring! special berücksichtigt auch Mengen und Varianten, während die anderen Modi nur den Artikelnamen weitergeben.

Um die Überprüfung im Blick zu behalten, aktivieren Sie die Option „Zutaten melden, die nicht auf der Liste stehen“. Nach jeder Überprüfung erhalten Sie dann eine Nachricht über Ihren Benachrichtigungsadapter, zum Beispiel:

`Not put on the shopping list, already in stock:` gefolgt von Zeilen wie `- Potatoes: Potatoes Rewe`

Jede Zeile zeigt die Zutat und die dazugehörigen Produkte an, sodass Sie einen Fehler sofort erkennen können. Dies erfordert einen Benachrichtigungsadapter in den Einstellungen und funktioniert zusammen mit „Fehlende Zutaten zur Einkaufsliste hinzufügen“.

### Unter Berücksichtigung des Mindestbestands

Beim Vergleich der Inhaltsstoffe kann ShelfMate auch die gewünschte Mindestmenge angeben.

Beispiel:

- Vorrat: 2 kg Zucker
- Mindestbestand: 1 kg
- Benötigt: 3 kg Zucker

Auf dem Einkaufszettel landen 2 kg Zucker, damit nach dem Kochen nur noch ein minimaler Vorrat übrig bleibt.

Nach jeder Überprüfung `check.request` wird automatisch geleert.

---

## Ein ganzes Regal füllen

Mit „Standorte → Lagerbestand“ können Sie mehrere Produkte nacheinander erfassen und gemeinsam einbuchen.

1. Scannen Sie den QR-Code des gewünschten Standorts oder wählen Sie ihn aus der Liste aus.
2. Scannen Sie die Produkte nacheinander – mit der Kamera, einem externen Scanner oder durch Eingabe der EAN-Nummer.
3. Jeder Scan erhöht den Betrag um 1.
4. Korrigieren Sie gegebenenfalls die Beträge in der Liste.
5. Zum Abschluss scannen Sie denselben Standortcode erneut oder wählen Sie „Lagerbestand“.

Alle erfassten Produkte werden zusammen gebucht.

Bei Produkten, die nach Gewicht oder Volumen verkauft werden, zählt jeder Scan als eine vollständige Verpackung. Die Verpackungsgröße in g oder ml muss hierfür gespeichert werden.

### Unbekannte Produkte

Ist ein Barcode noch nicht bekannt, fragt ShelfMate die Produktdaten bei Open Food Facts ab und erstellt das Produkt. Es sucht in den Buchkatalogen nach Büchern, Zeitschriften und Noten und in der Apotheke anhand ihrer PZN nach Medikamenten; das im Data-Matrix-Code einer Packung enthaltene Verfallsdatum wird als Mindesthaltbarkeitsdatum hinterlegt (siehe [Bücher, Zeitschriften, Noten und Medikamente](#books-magazines-sheet-music-and-medicines) ).

Wird dort nichts gefunden, erstellt ShelfMate vorübergehend einen Eintrag wie diesen:

```
Unbekanntes Produkt 1234567890123
```

Das Produkt wird trotzdem gezählt.

In den Einstellungen erscheint dann der Hinweis „Neue Produkte bearbeiten“, bis der Eintrag vollständig ausgefüllt und gespeichert wurde.

---

## Durchführung einer Bestandsaufnahme

Bei einer Inventur überprüfen Sie, ob der gelagerte Bestand mit dem übereinstimmt, was Sie tatsächlich haben.

Es gibt zwei Varianten: Scannen und Auflisten.

### Bestandsaufnahme per Scan

1. Unter Standorte → Inventur die Variante Scan auswählen.
2. Scannen Sie den QR-Code des Standorts.
3. Scannen Sie alle Produkte nacheinander.
4. Jeder Scan zählt als ein Stück. Derselbe Barcode kann mehrmals gescannt werden.
5. Zum Abschluss scannen Sie den QR-Code an derselben Stelle erneut.

ShelfMate vergleicht die gezählten Mengen mit dem Lagerbestand und zeigt eine Zusammenfassung an.

Die Differenzen werden anhand der erwarteten und der tatsächlich gezählten Beträge dargestellt.

Produkte, die nicht gescannt wurden, werden mit 0 gezählt.

Danach können Sie mit dem nächsten Standort fortfahren. Ein neuer Standort wird erst akzeptiert, wenn der vorherige abgeschlossen ist.

In der Übersicht sehen Sie, welche Standorte überprüft wurden und welche noch geöffnet sind.

### Bestandsaufnahme nach Liste

Alternativ können Sie die vorhandenen Produkte direkt in einer Liste überprüfen.

- Geben Sie den tatsächlichen Betrag ein.
- Mit ✓ bestätigen, ob die Aktie korrekt ist

Bestandskorrekturen werden in der Historie unter dem Begriff „Bestandsaufnahme“ gespeichert.

Eine regelmäßige Erinnerung zur Bestandsaufnahme kann in den Adaptereinstellungen aktiviert werden.

---

<p align="center"><img src="../images/inventory.jpg" width="250"><br><sub>Stocktaking: choose a location and check the products in a list or by scanning.</sub></p>

## Scannermodus ohne die App

ShelfMate unterstützt das Ein- und Auslagern von Artikeln mit einem externen Barcode-Scanner, ohne dass die Web-App geöffnet sein muss.

Der Scannermodus ist eingeschaltet mit `scanner.active` Die

Scans können übergeben werden durch `scanner.input` mit `ack=false` oder von einem Scanner empfangen, der direkt mit dem ioBroker-Host verbunden ist.

### Scansequenzen

| Scansequenz                  | Aktion                                            |
| ---------------------------- | ------------------------------------------------- |
| Produkt → Standort           | Lagerbestand: 1 Stück                             |
| Produkt → Produkt            | Entnehmen Sie 1 Stück.                            |
| Produkt → Produkt → Standort | Entnehmen Sie 1 Stück von einer bestimmten Stelle |
| Standort                     | Lagermodus starten                                |
| Standort erneut              | Endbestandsmodus                                  |
| Ein weiterer Standort        | Schalterstandort im Lagermodus                    |

Wird bei der Entnahme kein Abholort angegeben, verwendet ShelfMate den Bestand mit dem kürzesten Mindesthaltbarkeitsdatum.

Falls kein Mindesthaltbarkeitsdatum angegeben ist, wird der Standort mit der größten Menge verwendet.

### Mehrmals scannen

Ein Scan wartet auf einen Lagerplatz und füllt den Bestand automatisch auf. Bei zwei aufeinanderfolgenden Scans desselben Produkts führt ShelfMate eine von Ihnen festgelegte Aktion aus. Fehlt eine Reihe für zwei Scans, werden diese automatisch entnommen.

Die Aktionen werden in den Adaptereinstellungen unter „Aktionen für wiederholte Scans“ festgelegt. Jede Anzahl von Scans von 2 bis 20 entspricht einer Zeile und kann einmal verwendet werden.

| Aktion                                             | Wirkung                                                                                                                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mitnahme                                           | Der Artikel mit dem nächstliegenden Mindesthaltbarkeitsdatum wird entfernt, wie es bei zwei Scans standardmäßig der Fall ist. Stattdessen wird ein später gescannter Standort verwendet. |
| Lagerbestand am zuletzt bekannten Standort         | Ein Artikel wird an seinen letzten Lagerort zurückgebracht. Stattdessen wird ein anschließend gescannter Lagerort verwendet.                                                             |
| Mehrere Artikel sind am letzten Standort vorrätig. | Wie oben, jedoch mit der Menge aus dem Feld „Wert“. Ist dieses Feld leer, wird die Anzahl der Scans gezählt.                                                                             |
| Als leer markieren                                 | Der gesamte Lagerbestand ist auf 0 gesetzt. Bei einem Mindestbestand landet das Produkt auf der Einkaufsliste.                                                                           |
| Schalter geöffnet / geschlossen                    | Markiert eine Packung als geöffnet, z.B. `SM:OPEN` ohne den Kontrollcode. Wenn ein Paket bereits geöffnet ist, wird es durch denselben Scan wieder geschlossen.                           |
| Auf die Einkaufsliste setzen                       | Das Produkt ist vermerkt. Das Feld „Wert“ kann eine Menge enthalten.                                                                                                                     |
| Von der Einkaufsliste entfernen                    | Das Produkt wurde aus der Liste entfernt.                                                                                                                                                |

Standardmäßig werden Artikel bei zwei Scans entnommen, bei drei Scans am letzten Lagerplatz eingelagert, bei vier Scans als leer markiert und bei fünf Scans auf die Einkaufsliste gesetzt. Ein Scan bleibt unverändert, und bei zwei Scans wird ein Artikel entnommen, es sei denn, Sie fügen eine Zeile für zwei Artikel hinzu. Beispiel: Zeile 2 = „Geöffnet/Geschlossen umschalten“ und Zeile 3 = „Entnehmen“ bewirken, dass bei zwei Scans eine Verpackung geöffnet und bei drei Scans eine entnommen wird.

Ab dem ersten Scan mit einer Zeile (bzw. ab dem zweiten Scan, wenn Sie eine Zeile für zwei Zeilen verwenden) muss jeder weitere Scan innerhalb der vorgegebenen Zeit (standardmäßig 3 Sekunden) erfolgen. Dauert es länger, beginnt die Zählung von vorn, und die vorherigen Scans werden als „zum Mitnehmen“ verbucht.

Jede ausgelöste Aktion wird im Protokoll und im Datenpunkt gespeichert. `scanner.lastAction` mit der Anzahl der Scans, zum Beispiel `3x: Pasta ×1 stocked in at Pantry` Sie können es für Sprachausgabe oder Benachrichtigungen verwenden. Die Buchungen werden auch im Verlauf angezeigt.

### Unbekannte Produkte im Scannermodus

Ist ein gescannter Barcode noch nicht bekannt, erstellt ShelfMate das Produkt automatisch, bevor es gebucht wird. Die Daten (Name, Marke, Kategorie und Etiketten) stammen von Open Food Facts sowie aus den Datenbanken für Kosmetik und Tiernahrung. Bücher, Zeitschriften und Noten werden aus den Buchkatalogen, Medikamente (PZN) aus der Apotheke bezogen. Der Scan wird anschließend wie gewohnt gebucht.

Wenn nichts gefunden wird, erstellt ShelfMate das Produkt als unvollständig mit einem Namen wie `New product 1234567890123` Und bucht es trotzdem. Das Ergebnis des Scanners bestätigt dies. Unter Aufgaben → Neue Produkte bearbeiten können Sie diese Einträge später vervollständigen.

### Scanner mit Speicher

Manche Scanner speichern Scans außerhalb der Reichweite und senden sie später gesammelt. ShelfMate teilt solche Scans in einzelne Scans auf und verarbeitet sie in der Reihenfolge ihres Scans. Eine Sequenz wie Lagerort → Produkte → Lagerort (Einlagerungsmodus) funktioniert ebenfalls. Dauert die Suche nach vielen unbekannten Produkten länger als die Wartezeit zwischen zwei Scans, erhöhen Sie diese Wartezeit.

### Lagermodus

Scannen Sie zuerst den Standortcode.

Anschließend können Sie beliebig viele Produkte scannen. Jeder Produktscan bucht sofort ein Exemplar am ausgewählten Lagerort.

Um den Vorgang zu beenden, scannen Sie denselben Standortcode erneut.

Ein anderer Standortcode schaltet den Standort direkt um.

Nach fünf Minuten ohne Scanvorgang wird der Modus automatisch beendet.

### Zählmodus (Scans = Anzahl)

Wenn Sie einen Standort überhaupt nicht scannen möchten, wählen Sie in den Adaptereinstellungen als Scannermodus „Scans = Anzahl“.

- Bei jedem Scan eines Produkts wird ein einzelnes Stück an dem Lagerort eingelagert, an dem das Produkt zuletzt eingelagert war. Drei Scans ergeben drei Stück.
- Produkte, die nie gelagert wurden, verwenden den in den Einstellungen festgelegten Standardlagerort oder, falls nur ein Lagerort vorhanden ist, den einzigen Lagerort. Bei mehreren Lagerorten und keinem Standardlagerort wird der Scan abgelehnt und dies im Ergebnis entsprechend vermerkt.
- `SM:QTY:5` vor einem Scanvorgang werden die Bestände in fünf Teilen gleichzeitig gespeichert.
- Zum Auspacken scannen `SM:OUT` Alle anschließend gescannten Produkte werden aussortiert. Scannen `SM:OUT` Erneut zum Beenden, oder fünf Minuten warten.
- Ein zuerst gescannter Standortcode führt dazu, dass der Bestand weiterhin an diesem Standort eingelagert wird, also im Einlagerungsmodus.

`SM:OUT` Funktioniert auch im Standardmodus.

### Mindesthaltbarkeitsdatum während der Lagerung

Mehrere Produkte mit demselben Datum müssen nicht einzeln eingegeben werden.

1. Scannen Sie den Standortcode, um den Einlagerungsmodus zu starten.
2. Scan `SM:DATE:7`, was so viel wie „heute plus 7 Tage“ bedeutet.
3. Scannen Sie alle Produkte. Jedes Produkt ist vorrätig und erhält sofort das Datum. Scannen Sie mehrere identische Verpackungen. `SM:QTY:3` Erste.
4. Für ein anderes Datum scannen Sie den nächsten Scan. `SM:DATE:…` Code. `SM:DATE:0` schaltet das Datum aus.
5. Scannen Sie den Standort am Ende erneut.

Wenn ein anderes Produkt das richtige Datum hat, scannen Sie es. `SM:COPY` Anschließend wird das jeweilige Produkt gescannt. Die nachfolgenden Produkte im Einlagerungsmodus erhalten ihr Datum. Außerhalb des Einlagerungsmodus erhält das nächste gescannte Produkt das Datum seines vorhandenen Lagerbestands.

Ohne Lagermodus `SM:DATE:7` Das Produkt legt anschließend weiterhin das Datum für bereits eingelagerte Lagerbestände fest.

### Ohne Mindesthaltbarkeitsdatum: mehrere Produkte gleichzeitig

Aktivieren Sie bei einem Lagerort, z. B. dem Kühlschrank, die Option „Mindesthaltbarkeitsdatum beim Einräumen erfassen“. Die Produkte dieses Lagerorts, für die noch kein Datum festgelegt ist, werden dann im Aufgaben-Tab und als Filter „Ohne MHD“ in der Übersicht angezeigt. Ein von ShelfMate geschätztes Datum (Funkensymbol) gilt als fehlend, bis Sie es bestätigen.

Geben Sie ein Datum ein (zum Beispiel `0511` oder `+7d` Markieren Sie die entsprechenden Produkte und tippen Sie auf „Datum setzen“. Produkte an anderen Orten, wie z. B. Nudeln in der Speisekammer, werden dort nicht angezeigt.

### Steuercodes

Für weitere Aktionen gibt es spezielle Codes:

| Code             | Funktion                                                                     |
| ---------------- | ---------------------------------------------------------------------------- |
| `SM:UNDO`        | Die letzte unterstützte Buchung rückgängig machen                            |
| `SM:SPOIL`       | Nehmen Sie das nächste Produkt als verdorben heraus.                         |
| `SM:OPEN`        | Markieren Sie das nächste Produkt als geöffnet.                              |
| `SM:OUT`         | Nehmen Sie jedes folgende Produkt heraus, bis der Code erneut gescannt wird. |
| `SM:DATE:<days>` | Legen Sie das Mindesthaltbarkeitsdatum für die ungeöffnete Ware fest.        |
| `SM:DATE:0`      | Mindesthaltbarkeitsdatum entfernen                                           |
| `SM:COPY`        | Kopieren Sie das Mindesthaltbarkeitsdatum eines Produkts.                    |
| `SM:QTY:5`       | Buchen Sie die nächste Transaktion mit einem Betrag von 5.                   |
| `SM:CANCEL`      | Wartenden Scan abbrechen                                                     |

Die Steuercodes können über die Einstellungen als PDF ausgedruckt werden.

### Codebibliothek

Unter Einstellungen → Scanner → Codebibliothek verwalten Sie Ihre eigenen Codes.

- Scannen Sie einen Code oder geben Sie seinen Inhalt manuell ein, geben Sie ihm einen Namen und speichern Sie ihn.
- Einen gespeicherten Code als Etikett drucken.
- Die Standard-Steuercodes aus der obigen Tabelle sind unterhalb Ihrer eigenen Codes aufgeführt. Sie können nicht gelöscht werden.
- Über ein Kontrollkästchen bei jedem Code wird entschieden, ob dieser in die PDF-Datei mit dem Steuercode aufgenommen wird.

Wenn kein Code ausgewählt ist, kann die PDF-Datei nicht erstellt werden und die App meldet dies.

<p align="center"><img src="../images/controlCodes.jpg" width="250"><br><sub>The settings have the control codes for the scanner as a PDF.</sub></p>

### Zeit zwischen zwei Scans

In den Adaptereinstellungen können Sie festlegen, wie lange ShelfMate auf den nächsten Code wartet.

Mögliche Werte sind 3 bis 120 Sekunden.

Standardwert: 10 Sekunden.

Bei wiederholten Scans (ab dem dritten Scan bzw. ab dem zweiten, wenn Sie eine Zeile für zwei Scans verwenden) gibt es zwischen den wiederholten Scans eine separate kurze Wartezeit von standardmäßig 3 Sekunden.

### Anschließen eines externen drahtlosen Scanners

Beispielsweise ist der Tera HW0009 mit einem 2,4-GHz-Dongle vorgesehen.

1. Versetzen Sie den Scanner in den Kopplungsmodus und koppeln Sie ihn gemäß der Bedienungsanleitung des Herstellers über 2,4 GHz mit dem Dongle.
2. Schließen Sie den USB-Dongle an den ioBroker-Computer an. Falls ioBroker in einer virtuellen Maschine läuft, leiten Sie das USB-Gerät an die VM weiter. Die genaue Vorgehensweise hängt von der verwendeten Virtualisierungssoftware ab.
3. Stellen Sie das Tastaturlayout des Scanners auf US-amerikanisch oder deutsch ein und betätigen Sie das Codeende mit Enter. Wählen Sie in den Einstellungen des ShelfMate-Adapters dasselbe Layout (Tastaturlayout des Scanners). Scanner und Einstellungen müssen übereinstimmen.
4. Erteilen Sie ioBroker die Berechtigung, das Eingabegerät zu lesen (siehe unten), und starten Sie ioBroker neu. Diese Berechtigung gilt erst nach dem Neustart.
5. Wählen Sie in den ShelfMate-Adaptereinstellungen das Scannergerät aus.
6. Schalten Sie den Scannermodus ein durch `scanner.active` Die

Der Scanner wird als USB-Tastatur erkannt. Normalerweise ist kein zusätzlicher Treiber erforderlich.

Damit ioBroker auf das Eingabegerät zugreifen kann, benötigt der Benutzer die entsprechenden Berechtigungen:

```
sudo adduser iobroker input
```

Starten Sie anschließend ioBroker selbst neu, nicht nur die Instanz. Die neuen Berechtigungen gelten erst danach.

Wenn der Scanner ein Präfix oder Suffix verwendet, müssen die entsprechenden Einstellungen in ShelfMate identisch sein.

Jeder erkannte Code ist gespeichert in `scanner.lastCode` Das Ergebnis ist in `scanner.result` Die

### Verbindung des Scanners über Bluetooth

Befindet sich der Scanner weit entfernt vom ioBroker-Host (z. B. in der Küche), koppeln Sie ihn direkt über Bluetooth. Die Ladestation lädt dann nur das Gerät.

1. Scannen Sie auf dem Scanner „Bluetooth HID“ und anschließend „Pairing“ (Handbuch des Tera HW0009, Seite 4).
2. Auf dem ioBroker-Host starten `bluetoothctl` und eintreten `scan on`, `pair <address>`, `trust <address>` Und `connect <address>` Der Scanner heißt „BarCode Scanner HID“.
3. Wählen Sie in den ShelfMate-Einstellungen das Gerät mit dem Suffix "(Bluetooth)" aus.

ShelfMate findet das Gerät anhand seines Namens und erkennt den Scanner daher nach dem Energiesparmodus automatisch wieder. Durch Drücken des Auslösers wird er aktiviert.

### Kurzstandortcodes

Da einige Scanner mit einem US-Tastaturlayout arbeiten, können Sonderzeichen oder Umlaute Probleme verursachen.

Hierfür bietet ShelfMate kurze Standortcodes an.

Im Standorteditor wählen Sie „Kurzen Scannercode verwenden“, speichern Sie das Etikett und drucken Sie es erneut.

Bestehende Etiketten behalten ihre Gültigkeit.

Der Kurzcode hat folgendes Format:

```
SM:L:<8 characters>
```

### Scanner ohne QR-Code-Unterstützung

Es können auch einfache Scanner verwendet werden, die nur Barcodes lesen.

Wählen Sie dazu die Option Barcode unter Einstellungen → Etiketten.

ShelfMate erstellt dann Code-128-Barcodes anstelle von QR-Codes für Standort- und Kontrollcodes.

Dies gilt auch für Karton- und Regaletiketten.

Der Standort muss zuerst gespeichert werden, damit seine Kurz-ID verwendet werden kann.

Die Codes passen beispielsweise auf Etiketten der Größe 50 × 30 mm.

Hinweis: Der Scanner selbst benötigt kein Display. Das Ergebnis jedes Scans wird ausgegeben in `scanner.result` Die

Die Inventur findet weiterhin in der Web-App statt, da diese eine Anzeige benötigt.

---

## Vorschläge

Sobald ShelfMate etwas für Sie bereithält, erscheint im unteren Menüpunkt „Aufgaben“ ein Punkt. Dort finden Sie alle Vorschläge und offenen Aufgaben übersichtlich an einem Ort. Die Scan-Schaltfläche befindet sich in der Übersicht.

Dazu gehören:

### Mindesthaltbarkeitsdaten notieren

Bei Standorten mit der Option „Mindesthaltbarkeitsdatum beim Einlagern erfassen“ werden hier alle Produkte ohne Datum aufgelistet. Geben Sie ein Datum ein, markieren Sie die Verpackungen und legen Sie es fest. Jede Verpackung wird einzeln aufgeführt, sodass beispielsweise zwei Parmesanpackungen zweimal erscheinen. So können Sie ihnen unterschiedliche Daten zuweisen. Die Scan-Schaltfläche befindet sich auf allen Registerkarten oberhalb der Leiste.

### Produktgruppen

ShelfMate erkennt Produkte mit ähnlichem Namen und schlägt vor, diese zu einer Gruppe zusammenzufassen.

Einzelne Produkte können aus einem Vorschlag entfernt werden. Ganze Vorschläge können auch ignoriert werden.

### Mindestbestand

Basierend auf dem Verbrauch der letzten 30 Tage kann ShelfMate einen passenden Mindestbestand vorschlagen.

Hierbei handelt es sich um Produkte, die regelmäßig verwendet werden.

Mit ✓ akzeptieren Sie den Vorschlag, mit × lehnen Sie ihn ab.

### Neue Produkte

Produkte, die vom Scanner ohne Daten erstellt wurden (siehe Unbekannte Produkte im Scannermodus), warten hier, bis sie vervollständigt werden.

### Bestandsaufnahme

Wenn eine Inventur ansteht, wird ebenfalls ein Hinweis angezeigt.

Wichtig: ShelfMate wendet Vorschläge niemals selbstständig an. Änderungen werden erst nach Ihrer Bestätigung vorgenommen.

---

## Benachrichtigungen

ShelfMate kann automatisch Benachrichtigungen für wichtige Ereignisse versenden.

In den Adaptereinstellungen wählen Sie einen unterstützten Benachrichtigungsadapter und den gewünschten Empfänger aus.

Unterstützt werden:

- Telegramm
- telegrammenu2
- Leichtgläubig
- Signal
- WhatsApp
- Matrix
- E-Mail

Mit der Testfunktion können Sie überprüfen, ob die Verbindung funktioniert.

Folgende Benachrichtigungen sind möglich:

### Mindestbestand erreicht

Eine Benachrichtigung, sobald ein Produkt seinen Mindestbestand erreicht oder unterschreitet.

### Mindesthaltbarkeitsdatum

Eine tägliche Übersicht über Produkte, deren Ablaufdatum bald erreicht ist oder die bereits abgelaufen sind.

Die Uhrzeit kann eingestellt werden. Unter „Nachricht an diesen Tagen vor dem Datum“ können Sie die Tage auflisten, an denen eine Nachricht versendet wird, zum Beispiel `7,4,3,2,1,0` Sie erhalten eine Nachricht 7 Tage vorher, dann 4, 3, 2 und 1 Tag vorher sowie am Tag selbst, und dazwischen nichts. `0` ist der Tag selbst, `-1` einen Tag später. „Leer“ bedeutet, dass innerhalb des Warnzeitraums täglich eine Meldung angezeigt wird. In den Adaptereinstellungen können Sie die Überschriften und die Zeilen pro Produkt ändern. Folgende Platzhalter stehen zur Verfügung: `{name}`, `{brand}`, `{date}`, `{days}`, `{when}`, `{amount}`, `{place}`. Standard: `• {name} ({date}) – {place}`. Beispiel: `• {brand} {name}: {when}, {place}` Die

### Erinnerung an die Inventur

Eine Erinnerung nach einer festgelegten Anzahl von Tagen ohne Inventur.

Bei dem Wert 0 ist die Erinnerungsfunktion deaktiviert.

---

## Exportieren und Sichern

Unter Einstellungen → Daten gibt es mehrere Optionen.

### JSON-Backup

Erstellt eine vollständige Sicherung Ihrer ShelfMate-Daten.

Eine zuvor gespeicherte Sicherungskopie kann später wieder importiert werden.

### CSV-Export

Exportiert den Bestand als CSV-Datei, beispielsweise zur Verwendung in Excel.

### PDF-Export

Erstellt eine druckbare Bestandsliste, sortiert nach Lagerort.

Die PDF-Datei kann über das Teilen-Menü gespeichert oder ausgedruckt werden.

### Datenspeicherung

ShelfMate speichert die Lagerbestandsdaten in der Datei:

```
shelfmate.json
```

Es befindet sich im Datenverzeichnis des Adapters und nicht in der ioBroker-Objektdatenbank.

Wenn Sie ein Backup importieren oder alle Daten löschen, wird der vorherige Zustand gespeichert als `shelfmate.json.bak` Die

---

## Offline-Modus

ShelfMate kann auch bei kurzzeitigen Verbindungsunterbrechungen verwendet werden, sofern die Web-App zuvor eingerichtet wurde und ein vertrauenswürdiges HTTPS-Zertifikat vorhanden ist.

Die App speichert alle Daten auf dem Gerät: Produkte, Lagerbestand, Standorte, Verlauf, Mindesthaltbarkeitsdatum, Einstellungen, Tipps und die Einkaufsliste. Diese Daten werden angezeigt, wenn keine Verbindung besteht.

Wareneingang, Warenausgang, das Anlegen und Bearbeiten von Produkten und Standorten sowie die Bestandsaufnahme werden offline in einer Warteschlange gespeichert. Das Öffnen einer Verpackung, das Markieren verdorbener Produkte, das Rückgängigmachen von Aktionen und das Nachschlagen unbekannter Barcodes in Open Food Facts erfordern eine Internetverbindung.

Eine offline gebuchte Wareneingangsbuchung führt zu einer sofortigen Bestandsänderung. Mindesthaltbarkeitsdatum und geöffneter Status der neuen Artikel werden bei Absendung der Buchung festgelegt.

Sobald die Verbindung wiederhergestellt ist, sendet ShelfMate die wartenden Aktionen automatisch.

Auf diese Weise gehen keine Buchungen verloren, wenn die Verbindung kurzzeitig abbricht.

---

## HTTPS und Zertifikate

Für den Kamera- und Offline-Modus benötigt ShelfMate HTTPS mit einem Zertifikat, dem das verwendete Gerät vertraut.

### HTTPS einrichten

1. Aktivieren Sie in den Adaptereinstellungen die Option „HTTPS verwenden“.
2. Wählen Sie ein vorhandenes Zertifikat aus oder erstellen Sie ein neues.
3. Speichern Sie die Einstellungen und starten Sie die Instanz neu.

Mit der Option „Selbstsigniertes Zertifikat erstellen“ erzeugt ShelfMate ein Zertifikat für den Hostnamen und die IP-Adressen des ioBroker-Computers.

Das Zertifikat wird im ioBroker-Zertifikatspeicher abgelegt, automatisch ausgewählt und ist 825 Tage gültig.

### Das iPhone fragt jedes Mal nach der Kamera.

Auf dem iPhone fragt die App nach jedem Start erneut „Kamera zulassen?“. Ich unterbinde diese Frage folgendermaßen:

1. Öffnen Sie ShelfMate in Safari unter der angegebenen Adresse, nicht über das Symbol auf dem Startbildschirm.
2. Öffnen Sie den Scanner, tippen Sie auf „Kamera starten“ und anschließend auf „Zulassen“.

Danach erscheint die Frage nicht mehr, auch nicht in der App auf dem Startbildschirm. Sollte sie erneut auftreten, haben Safari und die Startbildschirm-App die Berechtigung vergessen; wiederholen Sie in diesem Fall die beiden Schritte.

Alternativ können Sie Ihre eigenen Zertifikate oder eine Zertifikatssammlung verwenden, beispielsweise über den ioBroker-Adapter acme.

Ein öffentlich vertrauenswürdiges Zertifikat, beispielsweise von Let's Encrypt, muss normalerweise nicht zusätzlich auf dem Telefon installiert werden, solange der Hostname, den Sie öffnen, damit übereinstimmt.

### Installation eines selbstsignierten Zertifikats auf dem iPhone

Diese Schritte wurden auf dem iPhone getestet:

1. ShelfMate in Safari öffnen: `https://<Host>:8120/`
2. In der App Einstellungen → Offline-Modus öffnen.
3. Wählen Sie „ioBroker-Zertifikat laden“ und erlauben Sie den Download.

Alternativ ist die Zertifikatsdatei unter folgender Adresse verfügbar:

`https://<Host>:8120/iobrokerZertifikat.cer`

Dann auf dem iPhone:

1. Öffnen Sie Einstellungen → Allgemein → VPN- und Geräteverwaltung.
2. Wählen Sie das heruntergeladene Profil aus und installieren Sie es.
3. Öffnen Sie Einstellungen → Allgemein → Info → Zertifikatsvertrauenseinstellungen.
4. Aktivieren Sie die Vertrauenswürdigkeit für das installierte Zertifikat.
5. ShelfMate erneut öffnen.
6. Überprüfen Sie die Verbindung im Offline-Modus → Überprüfen Sie erneut.

Installieren und vertrauen Sie nur Zertifikaten, deren Ursprung Sie kennen.

### Android

Die Einrichtung unter Android wurde bisher nicht getestet.

Die Zertifikatsdatei kann auch heruntergeladen werden unter `https://<Host>:8120/iobrokerZertifikat.cer` Die

Je nach Android-Version wird ein CA-Zertifikat über die Sicherheits- oder Anmeldeinformationseinstellungen installiert.

Menübezeichnungen und -verhalten können je nach Hersteller und Version variieren.

### Zum Startbildschirm hinzufügen

iPhone: Öffnen Sie ShelfMate in Safari, wählen Sie das Teilen-Menü und tippen Sie auf "Zum Home-Bildschirm hinzufügen".

Android: Öffnen Sie ShelfMate im Browser und wählen Sie im Browsermenü „Zum Startbildschirm hinzufügen“ oder „App installieren“.

Danach startet ShelfMate wie eine normale Anwendung.

---

## Etiketten drucken

ShelfMate erstellt Etiketten als PNG-Bilder in der festgelegten Größe.

Sie können sie auf Ihrem Handy speichern, teilen oder direkt ausdrucken.

Unterstützt werden unter anderem:

- EAN-Etiketten
- QR-Codes
- QR-Code-Etiketten
- Große Regaletiketten
- Kartonetiketten mit Inhalt
- „Geöffnet am“-Etiketten
- Gefrieretiketten

Welche Label-Typen verfügbar sind, wählen Sie in den Instanzeinstellungen im ioBroker-Adminbereich unter „Beschriftungsschaltflächen in der App“ aus.

### Beispiel: Niimbot B1

Die Etiketten können beispielsweise mit einem Niimbot B1 gedruckt werden.

Dazu kann der Drucker über CUPS auf einem Linux-Computer als AirPrint-Drucker eingerichtet werden. Anschließend können Sie direkt vom iPhone aus drucken.

Die Einrichtung des Druckers ist nicht Teil von ShelfMate.

Weitere Informationen finden Sie unter dem Suchbegriff „Niimbot CUPS AirPrint“.

---

## Fragen, Ideen oder Fehlerberichte?

Falls etwas nicht funktioniert oder Sie eine Idee für ShelfMate haben, können Sie gerne ein Issue auf GitHub eröffnen:

[GitHub – ShelfMate-Probleme](https://github.com/backfisch88/ioBroker.shelfmate/issues)

---

## Aussehen

Unter Einstellungen → Darstellung können Sie das Aussehen der App ändern. Die Einstellungen gelten nur für dieses Gerät.

- Thema: hell, dunkel oder automatisch.

- Akzentfarbe: Die Farbe der ausgewählten Tabs, Schaltflächen, Schalter und Häkchen. Standardmäßig ist dies Blau. Wählen Sie eine der Farben oder tippen Sie auf das Farbrad, um Ihre eigene Farbe festzulegen. Plus und Minus bleiben immer grün und rot, unabhängig von der gewählten Akzentfarbe.

- Hintergrundfarbe: Die Farbe hinter den Karten. Standardmäßig ist sie grau. Sie können hier auch eine eigene Farbe auswählen.

- Transparenz: Mit dem Schieberegler lässt sich die Durchsichtigkeit der Glaselemente einstellen: die Leiste am unteren Rand, die Scan-Taste und die Nachrichten. Die Karten selbst bleiben davon unberührt. In der mittleren Position ist die Leiste fast transparent wie unter iOS. Ist auf Ihrem Gerät die Option „Transparenz reduzieren“ aktiviert, bleibt das Glas mattiert.

- Unschärfe: Mit dem zweiten Schieberegler regelt man, wie stark das Glas den Bereich dahinter unscharf darstellt. Die mittlere Position erzeugt eine leichte Unschärfe wie in iOS; durch Verschieben nach unten wird das Glas fast scharf, durch Verschieben nach oben mattiert. Dieser Regler wirkt zusammen mit dem Transparenzregler. Ist „Transparenz reduzieren“ aktiviert, bleibt das Glas mattiert und beide Regler haben keine Auswirkung.

Die Suchleisten haben die gleiche Glasoptik wie die untere Leiste und folgen beiden Schiebereglern. Sie bleiben beim Scrollen oben.

Die Textgröße passt sich der Textgröße Ihres Geräts an (iOS: Einstellungen → Anzeige & Helligkeit → Textgröße; Android: Schriftgröße). Die Zoomfunktion per Pinch-Geste ist deaktiviert.

Die Leiste am unteren Rand klappt beim Scrollen nach unten zu einem kleinen Kreis mit dem aktuellen Symbol zusammen und öffnet sich wieder, wenn man nach oben scrollt oder darauf tippt.

Beim Drücken eines Schalters, eines Klickkreises oder des Schiebereglers erscheint eine Glasblase darum herum, wie man es von iOS kennt.