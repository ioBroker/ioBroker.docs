---
chapters: {"pages":{"en/adapterref/iobroker.telegram-menu/README.md":{"title":{"en":"ioBroker.telegram-menu"},"content":"en/adapterref/iobroker.telegram-menu/README.md"},"en/adapterref/iobroker.telegram-menu/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.telegram-menu/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.telegram-menu/docs/en/README.md
title: kein Titel
hash: GOfkZhYKK5baMfjQL5RmBmiwTefU2RAHJBVHDq5tvb0=
---
![Logo](../../../../../en/adapterref/iobroker.telegram-menu/admin/telegram-menu.png)

## ioBroker Telegram-Menü-Adapter

Erstelle interaktive Telegram-Menüs für deinen ioBroker.

Der Adapter ermöglicht die Kommunikation mit dem ioBroker über Telegram: Datenpunkte umschalten, Werte abfragen, Bilder und Diagramme senden, HTTP-Anfragen auslösen und vieles mehr. Die Menüs sind in Gruppen organisiert und einzelnen Telegram-Nutzern zugeordnet.

---

### Erste Schritte

Hilfetexte können direkt im Adapter über diese Schaltfläche aufgerufen werden:![Button HelperText](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/btnHelperTexte.png)

\*\*Wichtig:\*\* Damit ein Menü genutzt werden kann, muss mindestens ein Menü unter „Telegram-Benutzer“ aktiviert sein (Kontrollkästchen rechts).

---

## Navigation

![Navigation](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/nav.png)

- \*\*Zeile 1 (grün)\*\* ist die Startnavigation – sie wird automatisch beim Start oder Neustart des Adapters gesendet und kann jederzeit manuell aufgerufen werden.
- Der Text auf der rechten Seite (z. B. „Wählen Sie eine Aktion“) ist frei wählbar, darf aber nicht leer sein.
- Schaltflächen innerhalb einer Zeile sind mit einem`,` getrennt.
- Eine neue Schaltflächenzeile wird erscheinen`&&` generiert.

![Schaltflächen in Telegram](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/image-1.png)

Wenn der Nutzer eine Schaltfläche drückt, sendet Telegram den Schaltflächentext an den Adapter. Dieser sucht dann nach dem passenden Eintrag in der Konfiguration – der **Anruftext muss exakt übereinstimmen und darf nur einmal (in allen verknüpften Menüs) vorkommen** .

- Es können verschiedene vordefinierte Untermenüs verwendet werden, z. B. B. Ein/Aus, Prozent oder Zahlen (z. B. zur Steuerung von Rollläden). Für jedes Untermenü in der Aktionskonfiguration wird automatisch ein neuer Auslöser erstellt – mehr dazu weiter unten.

### Mehrere Menüs

Es ist möglich, zwischen verschiedenen Menüs zu wechseln. Dies ist nützlich, wenn zwei Personen dasselbe Menü nutzen, aber einer der Nutzer Zugriff auf ein zusätzliches Menü benötigt, das dem anderen nicht zur Verfügung steht. Die entsprechende Schaltfläche ist in beiden Gruppen sichtbar, ihre Funktion ist jedoch nur für einen der Nutzer relevant. Damit dies funktioniert, **muss der betreffende Nutzer in beiden Gruppen registriert sein** .

Damit das zweite Menü (Untermenü) korrekt funktioniert, muss der Auslösertext der Startseite des Untermenüs deaktiviert werden: Lassen Sie einfach das Feld „Auslöser“ leer. Die Zeile wird dann **orange** und es erscheint eine Meldung, die darauf hinweist, dass es sich um ein Untermenü handelt. (A)`-` (Als Platzhalter funktioniert es auch noch.)

\*\*Wichtig:\*\* Auch bei zwei verknüpften Menüs kann jeder Anruftext nur einmal erscheinen. Zwei Menüs ohne gemeinsame Benutzer, die nicht miteinander verknüpft sind, können jedoch dieselben Einträge verwenden (z. B. „Licht“ in beiden).

### Symbole in Menüschaltflächen

![Symbol1](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/heizung-icon1.png)

Emojis können direkt als Schaltflächentext verwendet werden – kopieren Sie einfach ein Emoji (z. B. von <https://www.getemojis.net/> ) oder über`Windows + .` Einfügen. Es wird das Emoji selbst eingefügt, nicht sein HTML-Code.

![Symbol2](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/heizung-icon2.png)

### Verlauf löschen

Um alle Nachrichten zu löschen (ähnlich wie „Verlauf löschen“ im Client), geben Sie Folgendes in einem Menüpunkt ein:

```
menu:deleteAll:Startseite
```

`Startseite` Dies ist der Menüname, der nach dem Löschen angezeigt wird. Nur Nachrichten, die jünger als 48 Stunden sind, können gelöscht werden.

---

### Platzhalter für Rückgabetext

Diese Ausdrücke können an beliebiger Stelle im Rückgabetext von Navigation, SetState und GetState verwendet werden.

#### <span id="status"></span> Status eines Datenpunkts anzeigen

```
{status:'ID':true}
```

`ID` Ersetzen Sie dies durch die gewünschte Datenpunkt-ID. Der Ausdruck muss direkt an der Stelle platziert werden, an der der Status angezeigt werden soll. Der zweite Parameter (`true` /`false` ) steuert, ob`change{...}` kann auf diesen Wert angewendet werden - relevant, wenn mehrere`{status:...}` -Die Abfragen erscheinen im selben Rückgabetext.

#### Tauschwert

```
change{"true":"an","false":"aus"}
```

Tauscht den zurückgegebenen Wert gegen lesbaren Text aus. Kann direkt dahinter stehen.`{status:...}` oder dass`&&` - Platzhalter stehen.

#### Datenpunkt beim Öffnen festlegen

```
{set:'id':'ID',val,ack}
```

Setzt einen Datenpunkt beim Öffnen einer Navigation.`ID` = Datenpunkt-ID,`val` = festzulegender Wert,`ack` = bestätigt (`true` ) oder unbestätigt (`false` ).

#### Zeitstempel senden

Zur letzten Änderung eines Datenpunkts:

```
{time.lc,(DD MM YYYY hh:mm:ss:sss),id:'ID'}
```

Für den letzten Zeitstempel eines Datenpunkts:

```
{time.ts,(DD MM YYYY hh:mm:ss:sss),id:'ID'}
```

Das Format in den Klammern ist frei anpassbar. Nicht benötigte Platzhalter können entfernt, aber nicht umbenannt werden. Ausnahme:`YYYY` kann als`YY` geschrieben werden.

#### Unix-Zeitstempel in Zeit umwandeln

```
{time}
```

Wird im Rückgabetext verwendet, wo der konvertierte Wert erscheinen soll.

#### Zeilenumbruch

```
\n
```

#### Analysemodus

Ermöglicht HTML-Formatierung in Telegram-Nachrichten:

| Etikett                  | Darstellung     |
| ------------------------ | --------------- |
| `<b>Text</b>`            | **Fett**        |
| `<i>Text</i>`            | _Kursivschrift_ |
| `<code>Text</code>`      | `Code`          |
| `<a href="URL">Link</a>` | Verlinkter Text |

Aktivieren Sie den Analysemodus in den Einstellungen der jeweiligen Zeile und fügen Sie den Text zwischen den Tags ein. Zusätzliche Tags können unterstützt werden.

---

## Untermenüs

![Untermenüs](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/image10.png)

Untermenüs werden über die Navigation aufgerufen.`TRIGGER` muss eindeutig sein (d.h. darf nur einmal vorkommen) und bezieht sich auf den gleichnamigen Auslöser in der Aktionskonfiguration, in dem die zu umschaltende ID angegeben ist.

### Vordefinierte Untermenüs

**Ein-/Ausschalter:**

```
menu:switch-on.true-off.false:TRIGGER:
```

`on` /`off` sind die Schaltflächenbeschriftungen.`true` /`false` werden automatisch als boolesche Werte interpretiert, können aber durch beliebigen Text ersetzt werden.

---

**Prozentuale Anteile:**

```
menu:percent10:TRIGGER:
```

Sterben`10` Definiert die Schrittweite und ist variabel.

---

**Zahlenbereich:**

```
menu:number1-20-2-unit:TRIGGER:
```

`1`–`20` ist die Spannweite (auch umgekehrt)`20-1` möglich),`2` die Schrittgröße`unit` die Einheit. Für negative Schrittweiten`(-)` Voranstellen. Beispiel:`menu:number16-36-4-°C:temperaturXY:`

---

**Dynamisches Menü:**

```
menu:dynSwitch[Name1|value1, Name2|value2, value3]:TRIGGER:LengthOfRow:
```

Erstellt ein Menü aus einem Array.`Name|Wert` Definiert die Beschriftung und den Wert der jeweiligen Schaltfläche. Es handelt sich lediglich um einen Wert ohne Angabe des Wertes.`|` Sofern angegeben, dient es auch als Etikett.`LengthOfRow` Gibt die Anzahl der Tasten pro Zeile an. Dezimalzahlen als Wert sind möglich (z. B. 2).`2.5` Der aktuelle Wert eines Datenpunkts kann auch als Schaltflächenname verwendet werden:`{status:'ID':true}` – [Weitere Informationen finden Sie hier](#status) .

---

**Zurück:**

```
menu:back
```

Springt zurück zur zuletzt aufgerufenen Seite (max. 20 Seiten).

<br>
<img src="../pic/menu_percent10_r2.png" width="800"/>
<img src="../pic/submenu_setstate.png" width="800"/>

---

## SetState

![SetState](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/setState.png)

- Die Checkbox „Switch“ (rechts) schaltet einen booleschen Datenpunkt zwischen den einzelnen Aufrufen um.`true` Und`false` Der Name des Auslösers muss exakt mit dem Schaltflächentext übereinstimmen, der die Aktion auslösen soll.
- Unter „Wert“ kann ein beliebiger Wert eingegeben werden. Erstellen Sie für verschiedene Werte einen separaten SetState-Eintrag.
- Staaten sind standardmäßig auf`ack:false` Einstellen – dies ist erforderlich, um andere Adapter damit zu steuern. Sollte`ack:true` kann direkt eingestellt werden, das Kontrollkästchen „Bestätigen“ aktivieren.
- \*\*Bestätigung nach`ack:true` Sobald der adressierte Adapter den Wert hat`ack:true` Bestätigt, wird die Antwortnachricht gesendet. Platzhalter für den festgelegten Wert in der Antwortnachricht:`&&` Die

### Rückgabetextoptionen für SetState

**Senden Sie den festgelegten Wert nicht:**

```
{novalue}
```

Wird im Rückgabetext eingetragen, wenn der Wert nicht in der Bestätigung erscheinen soll.<br>![kein Wert](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/image5.png)

---

**Warten Sie, bis sich ein weiterer Datenpunkt ändert:**

```json
{"foreignId":"ID","text":"Wert wurde gesetzt:"}
```

Wartet auf`ack:true` des angegebenen Datenpunkts und sendet dann den Rückgabetext.`ID` Ersetzen Sie dies durch die gewünschte Datenpunkt-ID. Der Text kann frei angepasst werden.`&&` steht für den Wert des überwachten Datenpunkts.

<details>
  <summary>Alte Version anzeigen (ausklappbar)</summary>

### Alt (veraltet)

```
 {'id':'ID','text':'Wert wurde gesetzt:'} 
```

## </details>

**Sofortige Bestätigung (ohne`ack:true` (zu warten):**

```
{confirmSet:Wert wurde gesetzt:noValue}
```

Sendet sofortiges Feedback. Dies bedeutet nicht, dass ein Adapter den Wert tatsächlich verarbeitet hat.`noValue` unterdrückt die Wertanzeige.

---

**Dem Benutzer die Eingabe dynamischer Werte ermöglichen:**

```
{setDynamicValue:RequestText:Type:ConfirmText:ID}
```

Nach dem Drücken des Knopfes wartet der Adapter auf die Texteingabe des Benutzers und schreibt den eingegebenen Text anschließend in das Datenfeld. Dieser wird dann im Rückgabefeld angezeigt.

| Parameter     | Beschreibung                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `RequestText` | Dem Benutzer wird eine Aufforderungsnachricht gesendet.                                                                     |
| `Type`        | Datentyp:`boolean` ,`number` oder `string`                                                                                  |
| `ConfirmText` | Bestätigungstext nach der Einstellung (eigener Text möglich)                                                                |
| `ID`          | Optional: ID eines anderen Datenpunkts, dessen Wert (gemäß`ack:true` ) wird im Bestätigungstext angezeigt. Platzhalter:`&&` |

---

\*\*Parse-Modus, Änderung, Zeilenumbruch:\*\* Siehe Abschnitt [Platzhalter für Rückgabetext](#rückgabetext-platzhalter) .

### Wert aus einem Untermenü übernehmen

Erstellen Sie das Untermenü wie gewohnt. Geben Sie den statischen Teil im Wertfeld von SetState ein.`{value}` Als Platzhalter für den Wert aus dem Untermenü verwenden.

### Statischen und dynamischen Wert kombinieren

Im Wertfeld kann ein statischer Text mit dem aktuellen Wert eines Datenpunkts kombiniert werden:

```
{id:ID}
```

`ID` Ersetzen Sie dies durch die gewünschte Datenpunkt-ID.`&&` Das Platzhalterzeichen im Rückgabetext gibt an, wo das Ergebnis eingefügt wird. Ohne`&&` Das Ergebnis wird am Ende angehängt.

**Beispiele:**

| Eingang                                                                    | Datenpunktwert | Ausgabe        |
| -------------------------------------------------------------------------- | -------------- | -------------- |
| `{id:0_userdata.0.Fenster_Status}`                                         | `true`         | `true`         |
| `{id:0_userdata.0.Count} {math:*2}`                                        | `5`            | `10`           |
| `Test {id:0_userdata.0.Count} {math:*2} Test`                              | `5`            | `Test Test 10` |
| `Test && {id:0_userdata.0.Count} {math:*2} Test`                           | `5`            | `Test 10 Test` |
| `Status && {id:0_userdata.0.Count} {math:*2} change{"10":"an","20":"aus"}` | `5`            | `Status an`    |

Das Ergebnis wird immer an das Ende des Textes angehängt – es sei denn`&&` Wenn der Wert festgelegt ist, wird er an der Position des Platzhalters eingefügt.

---

## GetState

- Platzhalter`&&` Gibt an, wo der abgerufene Wert im Rückgabetext erscheint.

- `change{"true":"an","false":"aus"}` – ersetzt den zurückgegebenen Wert durch lesbaren Text.

- `{math:/10}` – eine mathematische Berechnung auf den Wert anwenden (z. B.`/10` ,`*2` ,`+5` ).

  ![Mathe](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/image9.png)

- `{round:2}` – Runden Sie den Wert auf N Dezimalstellen.

- `{time}` – Unix-Zeitstempel in lokale Zeit konvertieren.

- Kontrollkästchen\*\*„Zeilenumbruch“\*\*– Wenn mehrere GetState-Abfragen gleichzeitig ausgeführt werden, wird der Rückgabetext jeder Abfrage in einer neuen Zeile ausgegeben.

### Alle Werte einer ioBroker-Funktion abrufen

Anstelle einer spezifischen ID`functions=Licht` Geben Sie (Beispiel) ein. Mit`{common.name}` Der Name des Datenpunkts wird an der gewünschten Position im Ausgabetext angezeigt.

![Funktionen](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/functions.png)

### Der Tisch

**JSON als Texttabelle anzeigen:**

```json
{"tableData":[{"key":"value-1-inJSON","label":"Spalte 1"},{"key":"value-2-inJSON","label":"Spalte 2"}],"tableLabel":"Überschrift","type":"TextTable"}
```

1. Wählen Sie unter „ID“ einen Datenpunkt aus, der JSON enthält.
2. Passen Sie das JSON wie oben beschrieben an:`key` entspricht dem Schlüssel im JSON des Datenpunkts,`label` ist der Spaltenname (wird`label` wird ausgelassen`key` (wird als Spaltenname verwendet).
3. `tableLabel` ist die Tabellenüberschrift (leerer String = keine Überschrift).
4. `type` muss`"TextTable"` und darf nicht verändert werden.

---

**Alexa-Einkaufsliste ansehen:**

```json
{"tableData":[{"key":"name"}],"tableLabel":"Einkaufsliste","listName":"SHOP","type":"alexaShoppingList"}
```

Erstellt eine Liste von Schaltflächen für die`alexa-shoppinglist` -Adapter. Die Tasten entfernen das jeweilige Element aus der Alexa-Liste.`listName` muss mit dem in Alexa erstellten Listennamen übereinstimmen (z. B.`SHOP` oder`TOBUY` Der Datenpunkt muss aus`alexa-shoppinglist` -Den Stiel anpassen.

![Inline-Tabelle](../pic/inlinetable-grafik.png)![Texttabelle](../../../../../en/adapterref/iobroker.telegram-menu/docs/pic/textable-grafik.png)

---

## Bild senden (Grafana)

- Speichern Sie ein Grafana-Token in den Einstellungen.
- Erstellen Sie ein Verzeichnis mit vollen Schreibrechten (z. B.`/opt/iobroker/grafana/` ) zum Zwischenspeichern von Bildern.
- Geben Sie die Rendering-URL in der Aktion ein. Diese finden Sie in Grafana unter: Diagramm → Teilen → Direkter Link zum gerenderten Bild. Deaktivieren Sie die Option „Zeitraum sperren“, damit immer das aktuelle Diagramm gesendet wird.
- Wenn Sie mehrere Diagramme haben, muss jeder Dateiname eindeutig sein, da sich die Bilder sonst gegenseitig überschreiben.
- Verzögerung`0` → Das Bild wird sofort gesendet. Verzögerung > 0 → Das Bild wird mit der angegebenen Verzögerung in Sekunden gesendet.

<img src="../pic/grafana.png" width="400"/>

---

## Standort senden

1. Auslöser auswählen.
2. Breitengrad-Datenpunkt (`latitude` ) und die Längengrad (`longitude` ) angeben.

---

## Veranstaltungen

Integrierter Ereignis-Listener: Wartet darauf, dass sich der Status eines Datenpunkts ändert - wenn dies festgelegt ist (z. B. über ein Skript oder einen Adapter), öffnet sich automatisch ein vordefiniertes Menü.

- Die angegebene Bedingung wird geprüft. Unterstützte Operatoren:`=` ,`!=` ,`<` ,`>` ,`<=` ,`>=` Wird kein Operator ausgewählt, wird standardmäßig auf Gleichheit geprüft.
- Es wird am`ack` des überprüften Datenpunkts.

---

## Echarts

Lassen Sie sich Diagramme direkt vom Echarts-Adapter senden.

| Feld               | Beschreibung                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Voreinstellung** | Kann direkt aus der ioBroker-Objektstruktur übernommen werden.                                                                                                                         |
| **Hintergrund**    | Hintergrundfarbe des Diagramms                                                                                                                                                         |
| **Thema**          | `auto` ,`default` ,`dark` ,`dark-bold` ,`dark-blue` ,`gray` ,`vintage` ,`macarons` ,`infographic` ,`shine` ,`roma` ,`azul` ,`blue` ,`royal` ,`tech-blue` ,`red` ,`red-velvet` ,`green` |
| **Dateiname**      | Individueller Dateiname für das Bild                                                                                                                                                   |

\*\*Wichtig:\*\* In den Einstellungen muss ein Verzeichnis mit vollen Schreibrechten angegeben werden.

---

## HTTP-Anfrage

Sendet eine HTTP-Anfrage – mit oder ohne Authentifizierung.

- **URL** – Pflichtfeld.
- **Benutzername / Passwort** – Optional, bei Bedarf leer lassen.
- **Dateiname** – kann auf dem Standardwert belassen werden.

---

## Einstellungen

| Attitüde                      | Beschreibung                                                                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Telegram-Instanz**          | Auswahl der Telegram-Instanz, falls mehrere Instanzen installiert sind                                                                                                                                                           |
| **Text für „Kein Eintrag“**   | Wird gesendet, wenn kein passender Menüeintrag gefunden wurde. Kann über das danebenliegende Kontrollkästchen deaktiviert werden.                                                                                                |
| **Tastaturgröße ändern**      | Passt die Tastaturhöhe dynamisch an die Anzahl der Zeilen an. Standard:`false` ( [Telegram-API](https://core.telegram.org/bots/api#replykeyboardmarkup) )                                                                        |
| **Einmal-Tastatur**           | Blendet die Tastatur nach einmaliger Benutzung aus. Kann über eine spezielle Schaltfläche im Eingabefeld wieder eingeblendet werden. Standard:`false` ( [Telegram-API](https://core.telegram.org/bots/api#replykeyboardmarkup) ) |
| **Grafana-Token**             | Optional – erforderlich zum Abrufen von Grafana-Diagrammen                                                                                                                                                                       |
| **Verzeichnis**               | Cache für Bilder und Diagramme (Grafana und Echarts). Vollständige Schreibberechtigung erforderlich.                                                                                                                             |
| **Menü nach Neustart senden** | Kann deaktiviert werden. Wenn die Option deaktiviert ist, muss das Menü beim ersten Aufruf über das Eingabefeld in der Telegram-App manuell aufgerufen werden.                                                                   |