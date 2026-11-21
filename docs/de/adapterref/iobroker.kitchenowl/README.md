---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kitchenowl/README.md
title: ioBroker.kitchenowl
hash: Ohmlcnpb24CuiYd/StdGZC9JidQephJXl+oNCafhlMw=
---
<p align="center"> <img src="admin/kitchenowl.png" alt="KitchenOwl" width="120" /> </p>

# IoBroker.kitchenowl
<p align="center"> Integrieren Sie Ihre selbst gehostete <a href="https://kitchenowl.org/">KitchenOwl</a>-Küche in ioBroker.

</p>

<p align="center"> <a href="https://github.com/n1tr0-5urf3r/ioBroker.kitchenowl/actions/workflows/test-and-release.yml"><img src="https://github.com/n1tr0-5urf3r/ioBroker.kitchenowl/actions/workflows/test-and-release.yml/badge.svg?branch=main" alt="Test and Release" /></a> <a href="https://www.npmjs.com/package/iobroker.kitchenowl"><img src="https://img.shields.io/npm/v/iobroker.kitchenowl.svg" alt="NPM version" /></a> <a href="https://www.npmjs.com/package/iobroker.kitchenowl"><img <a href="LICENSE"><img src="https://img.shields.io/npm/dm/iobroker.kitchenowl.svg" alt="Downloads" /></a> <img src="https://iobroker.live/badges/kitchenowl-installed.svg" alt="Anzahl der Installationen" /> <img src="https://iobroker.live/badges/kitchenowl-stable.svg" alt="Aktuelle Version im stabilen Repository" /> <a href="LICENSE"><img src="https://img.shields.io/npm/l/iobroker.kitchenowl.svg" alt="Lizenz" /></a> </p>

## Merkmale
- **Einkaufslisten** - jede Liste mit ihren Artikeln, einer durch Kommas getrennten Textzusammenfassung für Benachrichtigungen und kürzlich

entfernte Gegenstände

- **Essensplaner** - ein Zweig pro Wochentag plus die nächste geplante Mahlzeit, bereit für ein Dashboard oder per Sprachausgabe
- **Rezepte** - Zutaten, Zubereitungszeiten, Portionen, Schlagwörter, Quelle und Foto, pro Rezept oder als ein JSON-Zustand
- **Ausgaben** - Aktuelle Buchungen, Ausgaben pro Kategorie und eine tägliche/wöchentliche/monatliche/jährliche Statistikübersicht
- **Mitglieder und Kontostände** - wer schuldet wem was, gerundet und anzeigebereit
- **Artikelkatalog** - alle bekannten Artikel, Kategorien und Schlagwörter
- **Antworten** - Einkaufslistenartikel hinzufügen und abhaken, Ausgaben buchen, Rezepte planen, ein Rezept von einer URL importieren
- **Mehrere Haushalte** - Synchronisieren Sie einen, mehrere oder alle Haushalte, die ein Token sehen kann.
- **Deutsch und Englisch** durchgängig, sowohl in der Admin-Benutzeroberfläche als auch in der Objektstruktur.

Alle oben genannten Funktionen können einzeln deaktiviert werden, der Schreibzugriff ist standardmäßig deaktiviert.

<details> <summary><b>Über KitchenOwl, Kompatibilität und Haftungsausschluss</b></summary>

KitchenOwl ist ein kostenloser, selbstgehosteter Einkaufslisten- und Rezeptmanager. Das Projekt befindet sich unter [github.com/TomBursch/kitchenowl](https://github.com/TomBursch/kitchenowl) und ist unter der AGPL-3.0 lizenziert.

Getestet mit KitchenOwl v0.7.10 (Backend-Version 124). Die API-Pfade für den Haushaltsbereich sind seit Backend-Version 57 stabil, daher sollten Version 0.4 und neuer funktionieren; der Adapter liest die Serverversion beim Start und schreibt sie in `info.serverVersion`.

**Haftungsausschluss:** Dieser Adapter ist ein unabhängiges Projekt und steht in keiner Verbindung zum KitchenOwl-Projekt oder dessen Autoren. Er wird weder von diesen unterstützt noch empfohlen. Der Name KitchenOwl und das Logo gehören ihren jeweiligen Eigentümern; das Logo wird hier lediglich zur Kennzeichnung des Dienstes verwendet, mit dem dieser Adapter verbunden ist.

</details>

## Erste Schritte
1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Erstellen Sie in KitchenOwl ein langlebiges API-Token: Öffnen Sie Ihr Profil, gehen Sie zu **Sitzungen** und fügen Sie ein langlebiges Token hinzu.
3. Geben Sie die Basis-URL Ihres Servers ein (z. B. `https://kitchenowl.example.com`) und das Token auf der

Klicken Sie auf die Registerkarte **Verbindung** und anschließend auf **Verbindung testen**. Der Adapter fügt automatisch `/api` hinzu und entfernt ein nachfolgendes `/api`, falls Sie eines eingeben.

4. Wählen Sie auf der Registerkarte **Haushalte und Synchronisierung** die zu synchronisierenden Haushalte aus. Wenn Sie das Feld leer lassen, werden alle Haushalte synchronisiert.

Haushalt, den der Token sehen kann.

Das Token gehört einem Benutzer, nicht einem Haushalt, und gewährt diesem Benutzer alle Berechtigungen in jedem Haushalt, dem er angehört. Es ist so lange gültig, bis Sie es in KitchenOwl widerrufen.

<details> <summary><b>Alle Einstellungen</b></summary>

### Verbindung
| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| Server-URL | - | Basis-URL der Instanz, ohne `/api` |
| API-Token | - | Langlebiges Token; verschlüsselt in der Instanzkonfiguration gespeichert |
| Timeout für Anfragen | 10000 ms | Maximale Dauer einer einzelnen Anfrage |
| Wiederholungsversuche pro Anfrage | 2 | Server- und Netzwerkfehler werden wiederholt; 4xx-Antworten nicht |
| Verzögerung zwischen Wiederholungsversuchen | 2000 ms | Steigt linear mit der Anzahl der Versuche |
| TLS-Zertifikat überprüfen | Ein | Nur für selbstsignierte Zertifikate deaktivieren |

### Haushalte und Synchronisierung
| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| Zu synchronisierende Haushalte | alle | Leer bedeutet alle für das Token sichtbaren Haushalte |
| Abfrageintervall | 300 s | Mindestens 30 s |
| Rezepte und Katalog werden alle | 10 Umfragen gelesen | Diese beiden werden mit Abstand am häufigsten gelesen und ändern sich selten; 1 liest sie bei jeder Umfrage. Eine Aktualisierung, die Sie anfordern, liest sie so, wie es hier steht. |
| Mitglieder- und Ausgabensalden | am | |
| Einkaufslisten | auf | |
| Rezepte | auf | |
| Speiseplaner | aktiviert | Übersprungen für Haushalte, bei denen die Planerfunktion deaktiviert ist |
| Ausgaben | an | Übersprungen für Haushalte, bei denen die Ausgabenfunktion deaktiviert ist |
| Artikelkatalog, Kategorien und Schlagwörter | Aus | Es können mehrere hundert Einträge pro Haushalt vorhanden sein |
| Erstelle einen Zustandsbaum pro Rezept | Ein | Aus lässt nur den Zustand `recipes.json` übrig |
| Erstelle einen Zustandsbaum pro Einkaufslistenelement | ein | Aus: Belässt nur den `json`-Zustand pro Liste |
| Objekte löschen, die in KitchenOwl verschwunden sind | ein | Bereinigt den Status entfernter Listen, Rezepte und Mitglieder |
| Fotos herunterladen, damit eine Visualisierung sie anzeigen kann | an | Speichert eine Kopie jedes Fotos mit dem Adapter; ungefähr 185 kB pro Foto, einmalig abgerufen |

### Ausgaben
| Einstellung | Standard | Beschreibung |
| --- | --- | --- |
| Perspektive | Gesamter Haushalt | Persönliche Berichte nur Ihr Anteil an jeder Ausgabe |
| Seiten mit den letzten Ausgaben | 1 | Der Server liefert 30 Ausgaben pro Seite zurück |
| Zeitraum | Monatlich | Größe des Statistik-Übersichts-Buckets |
| Anzahl der Perioden | 5 | Wie viele Perioden die Übersicht umfasst, einschließlich der aktuellen Periode |

### Schreibzugriff
Standardmäßig deaktiviert. Wenn aktiviert, erstellt der Adapter zusätzliche beschreibbare Zustände und Schaltflächen; siehe dazu den Abschnitt **Rückmeldung an KitchenOwl** weiter unten.

</details>

<details> <summary><b>Objektbaum</b></summary>

```
kitchenowl.<instance>
├── info
│   ├── connection              adapter reached the server on the last poll
│   ├── lastUpdate              timestamp of the last successful poll
│   ├── lastError               message of the last failure, empty when healthy
│   ├── serverVersion           KitchenOwl backend version
│   └── minFrontendVersion      minimum frontend version the server expects
├── commands
│   └── refresh                 button, polls immediately
└── households.<id>
    ├── name, description, language, photoUrl, viewOrdering
    ├── expensesFeature, plannerFeature, defaultShoppingListId
    ├── members
    │   ├── count, balancesJson
    │   └── <username>          id, name, username, balance, isHouseholdAdmin,
    │                           isOwner, lastSeen, photoUrl
    ├── shoppingLists
    │   ├── count, json
    │   └── <listId>            name, itemCount, itemNames, json, recentItemsJson
    │       └── items.<itemId>  name, category, icon, description
    ├── recipes
    │   ├── count, json
    │   └── <recipeId>          name, description, time, prepTime, cookTime,
    │                           yields, source, photoUrl, tags, planned,
    │                           plannedDays, visibility, itemsJson
    ├── planner
    │   ├── count, json, nextRecipeName, nextRecipeId, nextCookingDate
    │   └── days.<0-6>          count, recipeNames, date, json
    ├── expenses
    │   ├── count, recentJson, overviewJson, currentPeriodTotal
    │   ├── newestName, newestAmount, newestDate, newestPaidBy
    │   └── categories.<id>     name, budget, color, currentPeriodSum
    │       └── uncategorized   currentPeriodSum for expenses with no category
    └── catalog
        └── itemsJson, itemCount, categoriesJson, categoryCount, tagsJson, tagCount
```

**Zu `photoUrl`:** KitchenOwl liefert Fotos nur auf Anfrage mit API-Token. Da ein Browser für ein `<img>`-Tag niemals ein Token sendet, antwortet die Serveradresse mit `Request unauthorized`. Der Adapter lädt daher jedes Foto einmal in seinen eigenen Speicher herunter und verweist `photoUrl` auf diese Kopie, beispielsweise `/kitchenowl.0/photos/<name>.jpg`. ioBroker liefert diese Kopie ohne Token aus, und jede Visualisierung kann sie laden. Fotos werden anhand einer UUID benannt, sodass ein Bild nur einmal abgerufen und nur dann erneut heruntergeladen wird, wenn es sich tatsächlich ändert. Kopien, auf die nicht mehr verwiesen wird, werden gelöscht. Nur Fotos, auf die ein Zustand tatsächlich verweist, werden gespeichert. Das Deaktivieren von **Zustandsbaum pro Rezept erstellen** oder **Mitglieder** verhindert daher auch das Herunterladen deren Bilder. Das Deaktivieren von **Fotos herunterladen** hingegen veröffentlicht die Adresse auf dem KitchenOwl-Server, der dann das Token benötigt.

**Zu `icon`:** Die KitchenOwl-API vergibt einen Symbolschlüssel (z. B. `honey`), und die zugehörige Grafik ist in die KitchenOwl-Apps integriert: Sie wird von keiner Adresse bereitgestellt, und die Lizenz verbietet die Weitergabe einer Kopie. Der Adapter veröffentlicht daher stattdessen ein Emoji, sodass der Status überall ohne weitere Zuordnung Ihrerseits korrekt angezeigt wird. Elemente, deren Schlüssel unbekannt ist, verwenden das Emoji ihrer Kategorie, das KitchenOwl-Benutzer selbst festlegen. Elemente ohne Schlüssel melden eine leere Zeichenkette anstelle eines Platzhalters, der als fehlerhaftes Bild angezeigt würde.

Wochentag `0` ist Montag. Die Zeitstempel geben die Millisekunden des Unix-Zeitstempels an und entsprechen damit den Angaben der KitchenOwl-API. Ein nicht festgelegtes Datum wird als leer und nicht als Unix-Zeitstempel 0 interpretiert. Ausgabensalden werden auf zwei Dezimalstellen gerundet; die API gibt sie als unformatierte Gleitkommazahlen zurück.

Das Umbenennen einer Liste, eines Rezepts, eines Mitglieds oder einer Kategorie in KitchenOwl benennt den entsprechenden Kanal in der Objektstruktur um. Ein Name, den Sie in der Admin-Oberfläche bearbeiten, bleibt auch nach einem Neustart des Adapters erhalten, da sich Ihre Umbenennung nach einem Neustart nicht von einer vorgelagerten unterscheiden lässt.

</details>

<details> <summary><b>Rückmeldung an KitchenOwl</b></summary>

Aktivieren Sie **Schreibzugriff**, um diese zusätzlichen Zustände zu erhalten. Durch Schreiben in einen dieser Zustände wird die Änderung an KitchenOwl gesendet und anschließend der betroffene Haushalt neu eingelesen.

| Zustand | Typ | Wirkung |
| --- | --- | --- |
| `households.<id>.shoppingLists.<listId>.addItemByName` | Zeichenkette | Fügt der Liste ein Element hinzu. Der Name wird als Klartext angegeben; JSON legt auch die Beschreibung fest, z. B. `{"name": "Milk", "description": "2 L"}` |
| `households.<id>.shoppingLists.<listId>.items.<itemId>.remove` | Schaltfläche | Entfernt dieses Element aus der Liste |
| `households.<id>.shoppingLists.<listId>.items.<itemId>.description` | Zeichenkette | Ändert die Artikelbeschreibung, z. B. den Betrag |
| `households.<id>.expenses.add` | JSON | Bucht eine Ausgabe. `name`, `amount`, `paid_by` und `paid_for` sind alle erforderlich, z. B. `{"name": "Groceries", "amount": 12.5, "paid_by": {"id": 1}, "paid_for": [{"id": 1}, {"id": 2}]}` |
| `households.<id>.expenses.recalculateBalances` | Schaltfläche | Fordert den Server auf, die Mitgliedsguthaben neu zu berechnen |
| `households.<id>.planner.addRecipe` | JSON | Plant ein Rezept, z. B. `{"recipe_id": 20, "cooking_date": 1700000000000}` |
| `households.<id>.planner.days.<0-6>.removeAll` | Schaltfläche | Entfernt **alle** Mahlzeiten, die für diesen Wochentag geplant sind. An einem Tag können mehrere Mahlzeiten geplant sein, und eine einzelne Schaltfläche kann nicht angeben, welche. |
| `households.<id>.recipes.scrapeUrl` | Zeichenkette | Importiert ein Rezept von einer URL; das extrahierte Rezept landet in `recipes.scrapeResult` als JSON |
| `households.<id>.recipes.scrapeUrl` | string | Importiert ein Rezept von einer URL; das extrahierte Rezept landet in `recipes.scrapeResult` als JSON |

### Nachrichten
Die Instanz beantwortet auch `sendTo`-Nachrichten, was für Skripte praktisch ist:

```javascript
sendTo('kitchenowl.0', 'getHouseholds', {}, result => log(JSON.stringify(result)));
sendTo('kitchenowl.0', 'testConnection', {}, result => log(JSON.stringify(result)));
sendTo('kitchenowl.0', 'refresh', {}, result => log(JSON.stringify(result)));
```

</details>

<details> <summary><b>Fehlerbehebung</b></summary>

- ** `info.connection` bleibt false** - prüfen Sie `info.lastError`. Ein abgelehntes Token wird explizit gemeldet; der Adapter behält es bei.

Es wird eher erneut versucht, als dass man aufgibt.

- **Die Haushaltsauswahlliste bleibt leer.** - Die Admin-Oberfläche fragt die laufende Instanz nach der Liste, daher die URL und das Token.

Die Verbindung muss gültig sein. Verwenden Sie **Verbindung testen**, um die genaue Fehlermeldung anzuzeigen.

- **Ein Haushalt hat keine Ausgaben oder keinen Planungszweig** - diese Funktionen werden pro Haushalt in KitchenOwl aktiviert, und

Der Adapter spiegelt das wider.

- **Selbstsigniertes Zertifikat** - Deaktivieren Sie **TLS-Zertifikat überprüfen** auf der Registerkarte Verbindung.
- **Ein Haushalt fehlt im Baum** - ein Haushalt, den der Adapter nicht lesen kann, wird als Warnung protokolliert und

Andere Haushalte werden weiterhin aktualisiert; `info.lastError` benennt sie. Solange dies der Fall ist, wird nichts aus dem Baum gelöscht.

</details>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**

	The release script turns that heading into the version it is releasing and
	copies the entries below it into common.news. Afterwards there is no such
	heading any more, so anything added at the top of this list lands inside a
	version that has already shipped and credits it with changes it does not
	contain. Before adding an entry, check whether the first heading below is
	a released version: if it is, add the placeholder line again above it and
	write underneath that.

	The heading has to be present for a release to run at all; without it the
	script stops with "The changelog placeholder is missing from README.md!".
-->
### 0.0.8 (2026-11-01)

- (n1tr0-5urf3r) The name of the photo storage is brought up to date on an upgrade too. It is created outside the sweep over the synced objects, so the previous version corrected every object name except that one
- (n1tr0-5urf3r) The adapter is built with TypeScript 6. `npm run check:next` type-checks it with TypeScript 7 as well, so the move to the native compiler is a known quantity by the time the tooling around it can follow

### 0.0.7 (2026-10-18)

- (n1tr0-5urf3r) Object names written by an earlier version are brought up to date on an upgrade. Names were only ever created, never corrected, so an installation that already had the tree kept the English and German names of version 0.0.5 even after updating. A name that was edited in the admin interface or that comes from KitchenOwl is still left untouched

### 0.0.6 (2026-10-18)

- (n1tr0-5urf3r) Object names carry every language ioBroker asks for instead of only English and German. They now come from the same translation files the admin interface uses, so `npm run translate` keeps them in step. The photo storage was named in English alone and is covered too
- (n1tr0-5urf3r) The colour of an expense category is a plain text state. Its old role is meant for a colour something can be set to and requires a writable state, which this one is not
- (n1tr0-5urf3r) An installation whose translation files cannot be read logs a warning and keeps the names English instead of refusing to start

### 0.0.5 (2026-10-17)

- (n1tr0-5urf3r) Photos are downloaded into the adapter's own file storage and `photoUrl` points at that copy, so a visualisation can show them. The address on the KitchenOwl server needs the API token, which a browser does not send, so loading one directly answered `Request unauthorized`
- (n1tr0-5urf3r) Items report an emoji instead of KitchenOwl's icon key. The key named artwork that no address serves and whose licence forbids shipping a copy, so a visualisation showed a broken image and the word `honey`. All 403 upstream keys are covered, and an item without one falls back to the emoji on its category, which is taken whole: a skin tone, a flag, a keycap or a sequence such as 👩🏽‍🍳 arrives as the user wrote it rather than cut down to its first character
- (n1tr0-5urf3r) Recipes and the item catalog are read every tenth poll rather than every one. They are 93 % of the traffic a poll makes and change rarely, so a five minute interval now moves around 30 kB instead of 505 kB. The interval is configurable, and 1 restores the old behaviour. A refresh you ask for reads them whatever the setting says, as does the refresh after importing a recipe or adding an item by a name the household has not used before, so a change you just made never waits for the next tenth poll
- (n1tr0-5urf3r) A weekday that holds more than one meal shows all of them. Each day now carries `count`, `recipeNames`, `date` and `json`; the singular `recipeId`, `recipeName` and `yields` are gone, because they described only the first meal and were quietly wrong on a day with two. The per-day button is now `removeAll` and clears every meal on that day, since one button cannot say which of several to drop
- (n1tr0-5urf3r) Removing a planned meal and deleting an expense send a request body, without which the server answered with an error. Removing a planned meal also names the date it refers to, so the right one goes when a recipe is on the plan more than once, and pressing remove on an empty day does nothing instead of logging an error
- (n1tr0-5urf3r) Clearing a shopping list names the items to remove, which is what the endpoint expects; it answered with an error before
- (n1tr0-5urf3r) Adding an expense documents and checks the fields the server actually requires: `paid_by` and `paid_for` are objects, and there is no `paid_by_id`
- (n1tr0-5urf3r) Writing to a state the adapter does not recognise as a command says so in the log instead of doing nothing quietly, which matters after a rename such as the planner's `remove` becoming `removeAll`
- (n1tr0-5urf3r) A member whose username matches one of the member branch's own states, `count` or `balancesJson`, no longer takes that state's object over; such a name gets the user id appended, as a name shared with another member already did

### 0.0.4 (2026-10-17)

- (n1tr0-5urf3r) Removed the id states whose value was already the name of the object they sat in
- (n1tr0-5urf3r) A date that is not set now reads as empty instead of 1 January 1970
- (n1tr0-5urf3r) Expenses name the person who paid instead of exposing a numeric user id
- (n1tr0-5urf3r) Expense category colours are CSS values, and recipe visibility shows a label
- (n1tr0-5urf3r) Existing objects are kept in line with the adapter's own definitions, so enabling write access makes the states that are already there writable rather than only the ones created afterwards
- (n1tr0-5urf3r) A shopping list, recipe, member or category renamed in KitchenOwl is renamed in the object tree as well
- (n1tr0-5urf3r) Names that come from KitchenOwl are no longer run through the German name table, so a list called "Items" keeps its name
- (n1tr0-5urf3r) The result of a recipe import reaches `recipes.scrapeResult` instead of being thrown away and the state wiped on the next poll
- (n1tr0-5urf3r) The next planned meal skips days that are already over
- (n1tr0-5urf3r) One household that cannot be read no longer costs every other household its update
- (n1tr0-5urf3r) A refresh requested while a poll is running is carried out afterwards instead of being dropped, and the refresh button is acknowledged
- (n1tr0-5urf3r) Shopping list items can be added with a description by writing JSON instead of a plain name
- (n1tr0-5urf3r) A server URL entered with a trailing `/api` is accepted, a request that times out says so instead of reporting an aborted operation, and a rate limited request is retried
- (n1tr0-5urf3r) Two members whose usernames differ only in punctuation no longer share one branch
- (n1tr0-5urf3r) `getHouseholds` over the message box keeps the configured TLS setting and no longer leaks its connection when it fails
- (n1tr0-5urf3r) The object database is only read back when a definition actually changed, which takes around a thousand lookups per household out of every poll

### 0.0.3 (2026-10-17)

- (n1tr0-5urf3r) The item payloads no longer repeat the full category object and KitchenOwl's internal bookkeeping, which cuts the catalog state of a 800 item household from roughly 290 kB to 56 kB
- (n1tr0-5urf3r) Removed the household json state, which only repeated the states next to it

### 0.0.2 (2026-10-17)

- (n1tr0-5urf3r) Fixed a retry delay that was not cancelled when the adapter shut down
- (n1tr0-5urf3r) The compiled output is part of the repository again, so installing from a GitHub URL works
- (n1tr0-5urf3r) Translated the admin interface into the remaining languages
- (n1tr0-5urf3r) Raised the requirements to Node.js 22.19 and admin 7.6.20
- (n1tr0-5urf3r) Releases are published automatically from CI

### 0.0.1 (2026-10-17)

- (n1tr0-5urf3r) initial release

## License

MIT License

Copyright (c) 2026 n1tr0-5urf3r <fabi@ihlecloud.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.