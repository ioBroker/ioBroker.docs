---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pi-agent/README.md
title: ioBroker.pi-Agent
hash: Kc5rVhOLw0+2P1xBPs3vBOWyknwCq/T5C95ZbSr3Uyg=
---
![Logo](../../../en/adapterref/iobroker.pi-agent/admin/pi-agent.png)

![Stabil](https://iobroker.live/badges/pi-agent-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.pi-agent.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pi-agent.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.pi-agent.svg)
![NPM](https://nodei.co/npm/iobroker.pi-agent.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.pi-agent/actions/workflows/test-and-release.yml/badge.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pi-agent-installed.svg)

# ioBroker.pi-Agent

Ein Sprachmodellagent für ioBroker, der Neustarts und Abstürze übersteht. Er basiert auf [Pi Durable](https://earendil.com/posts/pi-durable/) : Jeder Modell- und Toolaufruf wird vor seiner Ausführung als Prüfpunkt gespeichert, sodass eine unterbrochene Anfrage nach dem Neustart des Adapters fortgesetzt wird, anstatt von vorn zu beginnen.

## Was es tut

- Liest und durchsucht Staaten mithilfe der Tools. `search_objects`, `get_state` (eine ID oder ein `*` Muster) und `list_instances` Diese Tools können gefahrlos wiederholt werden. Beide zeigen Typ, Einheit, Schreibbarkeit und, falls der Zustand diese Werte enthält, Minimal-, Maximal- und zulässige Werte an (`common.states` Der Agent schreibt also den Wert, den das Gerät erwartet.
- Ermittelt die Zustände eines Raums und/oder einer Funktion, wie sie in ioBroker eingerichtet sind (`enum.rooms`, `enum.functions`) mit `find_states` z. B. Raum „Küche“ und Funktion „Licht“ für „die Beleuchtung in der Küche“; `list_rooms` Und `list_functions` Es wird angezeigt, was existiert. Die Namen stimmen in jeder Sprache des Enums und teilweise überein; ein Element, das ein Gerät oder Kanal ist, bringt die darunter liegenden Zustände mit sich.
- `list_instances` beginnt mit den Instanzobjekten und liest `alive` Und `connected` jedes Instanz durch ihre exakte ID. A `*` Das Muster findet nur Zustände, die ein Objekt enthalten, daher ist ein veralteter Zustand `alive` Der Wert einer Instanz, deren Zustandsobjekt fehlt, fehlt in einer Musterabfrage, aber nicht in der Abfrage selbst. `list_instances` Die
- Protokolliert jeden Toolaufruf als eine Zeile: `Tool <name> <arguments> -> <outcome>` (Blockierte Schreibvorgänge als Warnung).
- Schreibt Staaten durch `set_state` Dieses Werkzeug wird nach einer Unterbrechung **nie wiederholt** : Dem Modell wird mitgeteilt, dass der Aufruf unterbrochen wurde, und es überprüft zunächst den aktuellen Wert. Eine Lampe kann nicht zweimal durch einen Neustart geschaltet werden.
- Schreibt nur in Zustände, für die die **Schreibberechtigungen** dies zulassen. Alles andere wird vor der Ausführung blockiert.
- Jede Anfrage wird genau einmal beantwortet. Die Anfrage-ID wird aus dem auslösenden Zustand abgeleitet, sodass bei einer wiederholten Auslösung die ursprüngliche Anfrage gefunden wird.

## Anforderungen

- Node.js 22.19.0 oder neuer, js-controller 6.0.11 oder neuer, admin 8.0.0 oder neuer.
- Ein API-Schlüssel des gewählten Anbieters: Anthropic, OpenAI, DeepSeek, Google Gemini oder OpenRouter, oder ein OpenAI-kompatibler Server (ein lokaler Server wie Ollama benötigt keinen Schlüssel). Alternativ die systemweiten KI-Einstellungen des Administrators (Systemeinstellungen, Registerkarte „KI“), in denen Anbieter, Modell und Schlüssel einmalig für das gesamte System festgelegt werden.
- Der Adapter läuft als eigener Prozess (nicht im Kompaktmodus). Er hält langlaufende Modellanfragen und einen Konversationsspeicher geöffnet, und seine Abhängigkeiten sind umfangreich. Durch die separate Ausführung werden Fehler oder Speicherspitzen von anderen Adaptern ferngehalten. Der API-Schlüssel wird ausschließlich im Speicher dieser Instanz gespeichert und niemals in die Prozessumgebung übernommen.

## Konfiguration

Die Einstellungen haben vier Registerkarten: **Allgemein** , **Schreibberechtigungen** , **Messenger** und **Backup** (siehe unten).

| Einstellung                                          | Bedeutung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Schlüsselquelle                                      | **Systemweite KI-Einstellungen des Administrators** : Anbieter, Modell, Basis-URL und Schlüssel stammen aus den Systemeinstellungen des Administrators, Registerkarte „KI“ (Objekt). `system.ai` Eine Änderung dort führt zu einem Neustart der Instanz. **Speichern Sie den Schlüssel im Adapter** oder **im zentralen Anmeldeinformationsspeicher** (siehe Einstellungen unten). Eine Instanz ohne eigenen Schlüssel oder OpenAI-kompatiblen Server verwendet ebenfalls die systemweiten Einstellungen. Daher funktioniert eine neue Instanz nach der Einrichtung ohne weitere Konfigurationen.                                                                                                                                                                                                                                                                                                                                                                                                     |
| Anbieter, Modell                                     | Das Sprachmodell. Das Feld „Modell“ listet die Modelle des ausgewählten Anbieters auf (die Instanz muss für die Liste ausgeführt werden); es kann jede andere Modell-ID eingegeben werden. Leer: Standardwert des Anbieters (`claude-sonnet-5-5`, `gpt-6-sol`, `deepseek-flash`, `gemini-3.5-flash`, `anthropic/claude-sonnet-5.5`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Basis-URL                                            | Nur für **OpenAI-kompatible (eigene URL)** : der Endpunkt des Servers, siehe unten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| API-Schlüssel                                        | **Speichern Sie den Schlüssel im Adapter** (Feld „API-Schlüssel“, verschlüsselt gespeichert) oder **im zentralen Anmeldeinformationsspeicher** : eine Anmeldeinformation aus dem zentralen Anmeldeinformationsspeicher von Admin 8, ausgewählt unter „API-Schlüssel-Anmeldeinformation“. Eine Änderung der Anmeldeinformation startet die Instanz mit dem neuen Schlüssel neu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Testverbindung                                       | Stellt dem Modell eine kurze Frage mit den Werten des Formulars, unabhängig davon, ob diese gespeichert sind oder nicht, und zeigt die Antwort oder den Fehler an. Die Instanz muss ausgeführt werden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Simulationsmodus (es werden keine Schalter umgelegt) | Standardmäßig aktiviert. Der Agent gibt an, was er umschalten würde, aber es wird kein Status geschrieben und keine Instanz neu gestartet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Langzeitgedächtnis                                   | Standardmäßig aktiviert: Der Agent speichert Fakten über alle Konversationen hinweg, siehe unten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Schreibberechtigungen                                | Tabelle, eine Zeile pro Bereich: eine Instanz- oder Objekt-ID (`hm-rpc.0` (deckt alles darunter ab) oder ein Muster mit `*` (`hm-rpc.0.*.STATE` Mit den Kontrollkästchen „Schreiben erlaubt“, „Bestätigung erforderlich“ und „Neustart erlaubt“ (nur für Zeilen mit vollständigen Instanzen, siehe unten) wird für jede installierte **Instanz,** die noch keine Instanzen besitzt, eine Zeile hinzugefügt, in der noch keine Schreibberechtigungen vorhanden sind. Die Schaltflächen **… alle ein/aus** oberhalb der Tabelle schalten jeweils eine Kontrollkästchenspalte für alle Zeilen um: Ist sie in jeder Zeile aktiviert, wird sie deaktiviert, andernfalls aktiviert. „Bestätigung erforderlich“ gilt nur für Zeilen, in denen Schreibzugriffe erlaubt sind, „Neustart erlaubt“ nur für Zeilen mit vollständigen Instanzen. Wie beim Import ändern diese Schaltflächen nur die Tabelle; speichern Sie sie wie gewohnt. Zustände, die keiner Zeile zugeordnet sind, können nur gelesen werden. |
| Skripte                                              | **Der Agent kann Skripte erstellen und ändern** (standardmäßig deaktiviert), die Javascript-Instanz neuer Skripte, **auch andere Skripte ändern** und **Skripte per Spracheingabe bestätigen** , siehe unten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Schreibe Zulassungsliste, Bestätigung erforderlich   | Unter „Erweitert“: reguläre Ausdrücke, einer pro Zeile, zusätzlich zur Tabelle (die Einstellungen von Version 0.0.5 und früher funktionieren weiterhin).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Zeitzone                                             | IANA-Name wie z.B. `Europe/Berlin` zur Erinnerung, `get_time` und historische Zeiten, die aus einer Liste mit den aktuellen UTC-Offsets ausgewählt (die Instanz muss für die Liste ausgeführt werden) oder manuell eingegeben werden. Leer: die Zeitzone des ioBroker-Servers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Grenzen                                              | **Anfragen pro Minute pro Konversation** (Standard 10, 0 = kein Limit) und **Tokens pro Tag** (Standard 0 = kein Limit), siehe „Limits“ unten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Verlaufsinstanz                                      | `history`, `sql` oder `influxdb` Instanz für `get_history` Leer: der Standardverlauf der Systemeinstellungen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Anweisungen                                          | Dem Systemaufruf wird Text hinzugefügt, beispielsweise Zimmernamen und Hausregeln. Der Mitarbeiter antwortet in der Sprache der Frage; eine hier angegebene Sprache (z. B. „Immer auf Deutsch antworten.“) wird verwendet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Boten                                                | Tabelle, eine Zeile pro `telegram` oder `max` Instanz (Bot): aktiv, Instanz, zulässige Benutzer, Präfix. Keine Zeile: Kein Messenger wird verwendet.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ↳ Zugelassene Benutzer                               | Benutzer-ID, Benutzername oder Vorname (wie im Messenger-Adapter), durch Kommas getrennt. Nachrichten von anderen Absendern werden ignoriert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ↳ Präfix                                             | Nur Nachrichten, die mit diesem Präfix beginnen, werden an den Agenten weitergeleitet, z. B. `/ai` Leer: Jede Nachricht eines zugelassenen Benutzers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Beispiel für die Tabelle „Schreibberechtigungen“:

| Umfang                | Schreiben erlaubt | Bestätigung erforderlich |
| --------------------- | ----------------- | ------------------------ |
| `hm-rpc.0.Wohnzimmer` | ✓                 |                          |
| `zigbee.0.*.lock`     | ✓                 | ✓                        |
| `javascript.0.agent`  | ✓                 |                          |

Dasselbe wie reguläre Ausdrücke unter „Erweitert“:

```
^hm-rpc\.0\.Wohnzimmer\.
^zigbee\.0\..*\.lock$
^javascript\.0\.agent\.
```

Beginnen Sie mit eingeschaltetem Simulationsmodus, beobachten Sie das Protokoll und schalten Sie ihn erst dann aus.

## Verwendung

### Chat im Adminbereich

Der Menüpunkt **„Pi Agent“** auf der linken Seite des Adminbereichs öffnet einen Chat mit dem Agenten:

- Jeder ioBroker-Benutzer hat seine eigene Konversation; **eine neue Konversation** beginnt von vorn. Die alte Konversation wird beim nächsten Start der Instanz nach einer Sicherheitskopie aus dem Speicher gelöscht (`pi-agent-prepurge-….sqlite.gz` Im Sicherungsordner). Eine Konversation mit einer noch nicht fälligen Erinnerung wird nach der Erinnerung gelöscht. Die Löschung hängt vom Speicherschema von Pi Durable ab; bei einer unbekannten Schemaversion (nach einem Update von Pi Durable) werden keine Nachrichten gelöscht.
- Die Antwort wird formatiert angezeigt, darüber die Tool-Aufrufe des Agenten.
- Im Chat wird man gebeten, einen Eintrag in die Liste "Bestätigung erforderlich" mit ✅/❌-Schaltflächen einzutragen.
- Die Anfrage läuft auch nach dem Schließen der Seite weiter; die Antwort befindet sich im Chat, sobald die Seite wieder geöffnet wird.
- Im Chat werden Erinnerungen an die Konversation angezeigt (diese bleiben bis zum Neustart des Adapters erhalten).
- **Die Details** (im Browser gespeichert) zeigen unter jeder Antwort den Anbieter, das Modell, die Zeit, die Tokens (eingehend, ausgehend, zwischengespeichert) und die Anzahl der Modellaufrufe an, und für jeden Toolaufruf die Argumente, den Beginn des Ergebnisses und die Zeit; ein blockierter oder fehlgeschlagener Aufruf wird rot dargestellt.
- Administratoren (Gruppe „Administrator“) wählen in der Liste oben eine andere Konversation aus: die Chats der Messenger, der anderen Administratorbenutzer und von `sendTo` Aufrufer wie ioBroker.assistant (einer pro Raum oder Satellit). Diese werden schreibgeschützt angezeigt und alle paar Sekunden aktualisiert.

### Staaten und Skripte

Schreibe einen Text an `pi-agent.0.chat.input` Die Antwort erscheint in `pi-agent.0.chat.answer` Aus einem Skript:

```js
sendTo('pi-agent.0', 'ask', { text: 'Is the living room light on?' }, result => log(result.answer));
```

Die Antwort auf eine `sendTo` Die Anfrage wird nur über den Callback beantwortet (`result.answer`, oder `result.error`); es ist nicht geschrieben zu `chat.answer` Die

Ohne weitere Felder, alle `sendTo` Anfragen werden in einem Gespräch zusammengefasst. Ein Anrufer, der mehrere Personen oder Räume bedient (z. B. ein Sprachassistent), kann jeder von ihnen ein eigenes Gespräch mit eigener Historie und eigenen Anweisungen geben:

```js
sendTo('pi-agent.0', 'ask', {
    text: 'Is the light on?',
    conversation: 'kitchen', // own conversation of this caller; up to 100 characters
    instructions: 'Answer in one or two short sentences without Markdown; the answer is spoken.', // optional
    requestId: 'kitchen-1730123456789', // optional: a repeated request with the same id is answered once
    language: 'ru', // optional: language of the user, for the questions to confirm (see below)
}, result => log(result.answer, result.language));
```

Ein Anrufer, der sendet `language` gibt die Antworten aus (ioBroker.assistant). Die Konversation erhält außerdem die Regel, die Sprache jeder Antwort zu markieren; pi-agent entfernt die Markierung und gibt den Code zurück als `result.language` (`'ru'`, `'de'` …), sodass der Anrufer auch dann auf Russisch antworten kann, wenn der Satellit auf Deutsch zuhört. Wenn das Modell die Markierung weglässt, `language` fehlt und der Anrufer entscheidet selbst.

**Runden Sie die Werte für gesprochene Antworten** (Registerkarte „Schreibberechtigungen“, standardmäßig aktiviert): im Gespräch eines solchen Anrufers `get_state` Das Gerät liest Temperaturen (°C, °F, K), Prozentwerte und Windgeschwindigkeiten (km/h, m/s, mph, kn, Bft) als ganze Zahlen ein, sodass ein Satellit beispielsweise „1 bis 8 Grad“ statt „0,6 bis 8 Grad“ anzeigt. Eine Regel in der Bedienungsanleitung allein reichte nicht aus: Das Modell gab die tatsächlichen Wetterdaten aus. Andere Werte (mm, kWh usw.) und alle anderen Umrechnungen verwenden die exakten Werte.

Die Konversationen werden pro sendender Instanz gespeichert (`pi-agent.0.telegram.chats` listet sie auf als `sendTo:<instance>/<conversation>` Die geänderten Anweisungen gelten ab der nächsten Anfrage im Gespräch.

Eine Anfrage kann Bilder enthalten; ioBroker.assistant leitet die von Nutzern gesendeten Fotos auf folgende Weise an den Telegram-Bot weiter:

```js
sendTo('pi-agent.0', 'ask', {
    text: 'What is this?', // optional when there are pictures
    images: [{ data: '<base64>', mimeType: 'image/jpeg' }], // a data URL works too
    conversation: 'telegram:Max',
}, result => log(result.answer));
```

- JPEG, PNG, GIF und WebP, maximal 4 Bilder mit jeweils bis zu ca. 3,9 MB. Der Dateityp wird anhand des Bildinhalts ermittelt. Andere Dateitypen und größere Bilder werden mit einer Warnung im Protokoll verworfen.
- Ein Modell ohne Bildeingabe erhält anstelle des Bildes eine Notiz.
- Ein Bild wird dem Model nur einmal mit einer eigenen Nachricht zugesandt. Das Model notiert nach seiner Antwort, was es zeigt (`<picture-notes>` Der Nutzer sieht sie nicht; spätere Fragen erhalten diese Notizen anstelle des Bildes. Ein Bild kostet seine Token also nur einmal, und ein vom Anbieter abgelehntes Bild kann die Konversation nicht blockieren.
- Der Speicher behält die 20 neuesten Bilder; ältere werden beim nächsten Start der Instanz gelöscht (ihre Notizen bleiben erhalten). `chat.pending` Es wird nur der Text beibehalten.

Eine solche Konversation verfügt über keine Schaltflächen, daher sind Schreibvorgänge mit „Bestätigung erforderlich“, Neustarts und Aktualisierungen standardmäßig blockiert. Mit **der Bestätigung per Text in SendTo-Konversationen** (Registerkarte „Schreibberechtigungen“, standardmäßig deaktiviert) fragt der Agent stattdessen per Text nach:

- Die Frage kommt als Antwort auf die Anfrage zurück, gefolgt von `[[LISTEN]]` (ioBroker.assistant öffnet das Mikrofon erneut), z. B. „Die telegram.0-Instanz neu starten? Ja oder nein.“ Es befindet sich in der `language` Der Anrufer sendet seine letzte Anfrage im Gespräch (ioBroker.assistant sendet die Sprache, in der seine Satelliten zuhören), ansonsten die Sprache des ioBroker-Systems. Ein Satellit, der auf Russisch zuhört, versteht ein deutsches „Ja“ nicht: Seine Spracherkennung gibt nichts oder „Я“ zurück.
- Die nächste Anfrage im selben Gespräch ist die Antwort. pi-agent prüft diese selbst, nicht das Modell: Die Antwort muss aus Ja-Wörtern bestehen, wobei Groß- und Kleinschreibung sowie Zeichensetzung außer Acht gelassen werden: „Ja“ oder das entsprechende Wort in einer der Sprachen des Adapters („ja“, „да“, „oui“), die übliche Redewendung („okay“, „klar“, „jawohl“, „конечно“, „ага“) und die Spracherkennung, die ein kurzes „Ja“ interpretiert („Ya“, „Yup“). Höflichkeitsformen sind zulässig („ja bitte“, „да, пожалуйста“); auch die zweimalige Verwendung desselben Wortes („да да“, „Ja, ja.“) zählt. Jedes andere Wort führt zu einem Nein („ja, aber erst …“, eine neue Frage), ebenso wie zwei Minuten ohne Antwort. Der vom Anrufer vorangestellte Kontext, getrennt durch eine Leerzeile (ioBroker.assistant sendet zuerst Uhrzeit, Wetter und Anwesenheitsstatus), wird nicht berücksichtigt. Das Protokoll zeigt an, was gehört wurde und wie die Entscheidung getroffen wurde.
- Die Antwort auf die nächste Anfrage ist das Ergebnis: was der Agent nach der Aktion oder der nächsten Frage sagt.
- Per Sprachbefehl kann jeder im Raum zustimmen. Schalten Sie es nur dort ein, wo dies akzeptabel ist.

`pi-agent.0.chat.pending` listet die Anfragen auf, die angenommen, aber noch nicht beantwortet wurden. Wenn der Adapter mittendrin stoppt, wird er beim nächsten Start fortgesetzt. Die Antwort auf eine Anfrage von `chat.input` oder `sendTo` wird dann geschrieben an `chat.answer` (Die `sendTo` Wenn der Anrufer nicht mehr wartet, wird die Antwort auf eine Messenger-Anfrage an den entsprechenden Chat gesendet. `sendTo` Der unterbrochene Anrufer erhält `{ error: "Interrupted by shutdown; the request continues after the next start" }` Die

### Bestätigung, Erinnerungen, Verlauf, Nutzung

- **Bestätigung:** Im Messenger-Chat oder im Admin-Chat der Konversation wird mit ✅/❌-Schaltflächen eine Bestätigung für einen Status auf der Liste „Bestätigung erforderlich“ angefordert. Nur „Ja“ ermöglicht die Ausführung; „Nein“, keine Antwort (10 Minuten) oder eine Anfrage, die nicht von einem Messenger stammt, verhindern dies. Die Antwort wird mit dem Anruf gespeichert, sodass bei einem Neustart keine erneute Anfrage erfolgt. Im Simulationsmodus wird nichts geschrieben, daher wird auch keine Anfrage gestellt.
- **Hinweise:** `remind_me` sendet später (maximal 7 Tage im Voraus) eine Nachricht an den Chat der Konversation oder an `chat.answer` Die Erinnerung bleibt im Konversationsspeicher erhalten und übersteht Neustarts.
- **Hinweise zu einem Sprachsatelliten:** ioBroker.assistant 1.4.9 und neuer benennt den Satelliten, von dem eine Anfrage stammt (`satellite`, `tts` in "ask"). Eine dort innerhalb der nächsten 24 Stunden angeforderte Erinnerung wird zu einem **Timer auf diesem Satelliten** (sendTo). `setTimer` Das Gerät zählt herunter, klingelt und der Text wird vorgelesen („Erinnerung: …“). Eine spätere Erinnerung oder eine Erinnerung, die ein älterer Assistent nicht als Timer einstellen kann, wird auf diesem Satelliten zum Fälligkeitstermin vorgelesen. `tts` (Zustand). Geplante Schreib- und Überwachungsvorgänge einer solchen Konversation werden dort ebenfalls protokolliert. Im Simulationsmodus wird nichts gesprochen. Nur ein `tts` Es wird der Zustand der anfragenden Instanz selbst verwendet.
- **Geschichte:** `get_history` Liest vergangene Werte (bis zu 31 Tage, gemittelt auf höchstens 200 Werte) aus der Verlaufsinstanz; wenn diese keinen Zustand enthält, aus ioBroker.recorder (siehe unten).
- **Verwendung:** `pi-agent.0.usage.*` zeigt Input, Output und Gesamt-Token sowie die Kosten in USD über alle Konversationen hinweg (die Kosten benötigen Preise im Modellkatalog; sie können bei einem Anbieter ohne Preise 0 bleiben). `usage.json` pro Modell `usage.tokensToday` Die Tokens seit Mitternacht in der Zeitzone des Hauses, die für das Tageslimit zählen (neue Eingabe-, Ausgabe- und Cache-Schreibvorgänge; nicht die Cache-Lesevorgänge, siehe unten).

### Grenzen

Zwei Beschränkungen verhindern eine Anfrage, bevor das Modell abgefragt wird, sodass ein unkontrollierter Ausfall keine Token kostet:

- **Anfragen pro Minute und Konversation** (Standard: 10): Eine Schleife, z. B. ein Skript oder ein anderer Adapter, der nach jeder Antwort erneut anfragt, wird bei Überschreitung des Limits gestoppt. Jede Konversation wird einzeln gezählt (Messenger-Chat, Benutzer-Chat, Satelliten- oder SendTo-Konversation, Hintergrundprozess). Eine Person erreicht nicht 10 Anfragen pro Minute. Die abgelehnte Anfrage führt zu einem Fehler.`Too many requests from this conversation (at most 10
  per minute) ` und das Protokoll erhält pro Durchlauf eine Warnung mit dem Namen der Konversation, z. B.` sendTo:assistant.0/chat` Anfragen, die nach einem Neustart fortgesetzt werden, werden nicht gezählt.
- **Tokens pro Tag** (Standardwert 0 = aus): wenn die Tokens seit Mitternacht (`usage.tokensToday`) wenn die Nummer erreicht wird, wird jede Anfrage beantwortet mit `The daily token limit (…) is reached; the agent answers again after midnight` Bis Mitternacht erhält das Protokoll eine Warnung, und `usage.limitReached` Ist `true` Bis zur ersten Anfrage nach Mitternacht. Eine Anfrage, die vor Erreichen des Limits gestartet wurde, wird abgeschlossen, sodass der Tag etwas darüber hinausgehen kann. Antworten auf ✅/❌-Fragen funktionieren weiterhin; sie benötigen kein Modell. Bei 80 %, 90 % und 99 % des Limits erhält der anfragende Nutzer einmal täglich eine Warnung unter der Antwort (im Admin-Chat als Notiz, im Messenger, in einem Job oder `chat.answer` am Ende der Antwort), und das Protokoll gibt eine Warnung aus; ein `sendTo` Der Anrufer erhält es im Feld `warning` Die Antwort selbst wird nicht im Antworttext (sondern von einem Satelliten gesprochen) übermittelt. Cache-Lesezugriffe werden nicht berücksichtigt: Jede Anfrage sendet die gesamte Konversation erneut (Anweisungen, Werkzeugbeschreibungen, bisherige Nachrichten und Ergebnisse), und der Anbieter liest den bereits gelesenen Teil aus seinem Cache – für etwa ein Zehntel des Preises. Insgesamt machten sie über 90 % der Token eines Tages aus. Eine neue Konversation nach einem Themenwechsel hält die Anzahl der Anfragen gering.
- **Tokens pro Anfrage (Kontext)** (Standardwert 0 = bis zum Fenster des Modells): Jede Anfrage enthält die Anweisungen, die Werkzeugbeschreibungen (insgesamt ca. 5.000–10.000 Tokens) und den Gesprächsverlauf. Ohne Limit wächst der Verlauf, bis das Fenster des Modells fast voll ist (mit 128.000 Tokens bis zu ca. 100.000 Tokens pro Anfrage) und wird erst dann zusammengefasst. Mit einem Limit, z. B. 40.000, wird der ältere Teil eines Gesprächs im Hintergrund ab drei Vierteln des Limits bis einschließlich der Anfrage am Limit zusammengefasst; die letzten 30 % des Limits bleiben wortgetreu erhalten. Dadurch wird jede Anfrage günstiger, insbesondere die erste nach einer Pause, wenn der Cache des Anbieters leer ist und jedes Token den vollen Preis kostet. Eine Zusammenfassung entspricht einem zusätzlichen Modellaufruf. Der kleinste Wert ist 24.000; 32.000–48.000 eignen sich für Sprach- und Chat-Kommunikation. Besonders vorteilhaft ist dies bei Satellitengesprächen, die über Wochen laufen. Das Debug-Log zeigt jeden Modellaufruf an, z. B. `Model call deepseek/deepseek-flash: context 41234 tokens (39000 from the cache = 95 %, 2234 new), answer 85, cost $0.00091`, Und `Summarising the older part of a conversation (threshold): 58 messages` wenn eine Zusammenfassung beginnt.

### Messenger: Telegram und MAX

Fügen Sie der Tabelle „Boten“ mit **dem Zeichen +** eine Zeile hinzu und wählen Sie eine aus. `telegram` oder `max` Geben Sie beispielsweise die zulässigen Benutzer ein und, falls der Bot auch andere Skripte ausführt, ein Präfix wie z. B. `/ai` Schreiben Sie dann an den Bot: `/ai Is the living room light on?` Messenger-Adapter, die nur das Senden von Nachrichten ermöglichen (z. B. WhatsApp, Signal, Pushover), können nicht für einen Chat verwendet werden.

- Mehrere Bots können mit dem Agenten kommunizieren, jeder mit eigenen Benutzern und Präfixen. Antworten, Bestätigungen und Erinnerungen werden über den Bot zurückgesendet, von dem die Anfrage kam.
- Jeder Chat hat seine eigene Konversation mit seiner eigenen Geschichte; `pi-agent.0.telegram.chats` Karten `<instance>/<chat id>` ihnen.
- Einstellungen der Version 0.0.5 und älter (eine Instanz in einzelnen Feldern) werden beim ersten Start in die Tabelle übernommen, wodurch die Instanz einmal neu gestartet wird. Bestehende Chats behalten ihre Konversation.
- Nachrichten von Nutzern, die nicht auf der Liste stehen, werden ignoriert und als Warnung protokolliert. Eine leere Liste lässt niemanden zu.
- Ein Vorname wie zum Beispiel `Alex` Zählt nur für Benutzer, die dem Messenger-Adapter bekannt sind (im Telegram-Adapter authentifiziert, `max.0.users.<id>` Im Max-Adapter kann jeder einen beliebigen Vornamen wählen. Zwei bekannte Benutzer mit demselben Vornamen sind zulässig; verwenden Sie den Benutzernamen oder die ID, um sie zu unterscheiden.
- Eine Nachricht, die der Messenger-Adapter zweimal zustellt, wird nur einmal beantwortet.
- Längere Antworten werden in mehrere Nachrichten aufgeteilt.
- **Telegram:** Das Modell wird als Markdown-Datei im Telegram-HTML-Format (fett, kursiv, Code, Links) gesendet.
- **MAX** (Adapter `max` 0.1.12 oder neuer): Antworten werden als Klartext übermittelt. In einem privaten Dialog erhält der Benutzer die Antwort, in einem Gruppendialog die Gruppe. MAX kennt keine „Frage“-Funktion, daher sendet eine Bestätigung Rückruf-Buttons; der gedrückte Button wird als Antwort zurückgegeben. `communicate.request`, wird beantwortet mit `answerCallback` und erreicht niemals das Modell.

### Sprachnachrichten (Telegram und MAX)

Der Telegram-Adapter und der Max-Adapter (0.1.13 oder neuer) speichern jede empfangene Sprachnachricht und schreiben den Dateipfad in die Datei. `<instance>.communicate.pathFile`. Mit aktivierter Spracherkennung (Registerkarte „Messengers“, Block „Spracherkennung“) wandelt pi-agent eine solche Nachricht in Text um und zeigt sie im Chat an (`🎤 «…»`) und beantwortet sie wie eine schriftliche Anfrage: gleiches Gespräch, gleiche Bestätigungen, gleiche Grenzen.

- **Eigener Server:** jeder Server mit der Transkriptions-API von OpenAI (`POST <url>/audio/transcriptions` Beispielsweise [Sprachausgaben](https://github.com/speaches-ai/speaches) (faster-whisper) in Docker. Kein Schlüssel erforderlich, nichts verlässt das Haus. Geben Sie die URL ein (`http://<host>:8000/v1` Wählen Sie eines der auf dem Server installierten Modelle aus. Auf einer CPU `Systran/faster-whisper-small` benötigt etwa ein Drittel der Redelänge. `large-v3-turbo` ungefähr so lang wie die Rede selbst, aber er versteht mehr.
- **OpenRouter:** seine Transkriptionsmodelle, `openai/whisper-large-v3-turbo` Wenn kein Schlüssel ausgewählt ist, wird ohne Angabe eines Schlüssels in diesem Block der OpenRouter-Schlüssel des Agenten (Anbieter OpenRouter) oder der Systemeinstellungen des Administrators (Registerkarte „KI“) verwendet.
- **Sprache:** zwei Buchstaben (`de`, `ru`) oder leer. Die Option „Leer“ erkennt die Sprache jeder Nachricht, was zwar zusätzlichen Zeitaufwand für den lokalen Server bedeutet, aber das Verständnis von Nachrichten in mehreren Sprachen ermöglicht.
- Die Spalte **„Sprache“** in der Tabelle wählt die Bots aus, die Sprachnachrichten entgegennehmen; das Präfix gilt nicht für sie. Nur autorisierte Benutzer werden angehört. Ein älterer Max-Adapter speichert keine Sprachnachrichten; diese werden daher ignoriert.
- Der Text geht an das Modell als `🎤 <text>` Die Anweisungen des Messenger-Chats weisen darauf hin, dass ein solcher Text falsch verstandene Wörter enthalten kann.
- **Beim Test der Spracherkennung** wird eine Sekunde Stille mit Werten der Form gesendet: eine falsche URL, ein falscher Schlüssel oder ein falsches Modell wird sofort angezeigt.

### Fotos (Telegram und MAX)

Wenn die Spalte **„Fotos“** aktiviert ist, werden die an den Bot gesendeten Fotos zusammen mit ihrer Bildunterschrift („Was ist das?“, „Wie viel zeigt der Zähler an?“) an das Modell weitergeleitet. Die Fotos eines Albums bilden eine Frage (maximal vier Bilder). Ein direkt im Anschluss an Fotos gesendeter Text ohne Bildunterschrift stellt ebenfalls eine Frage dar; Fotos ohne Text bilden eine eigene Frage.

- Der Telegram-Adapter speichert Fotos nur, wenn in den Einstellungen **„Dateien speichern“ aktiviert** ist, und bewahrt sie auf, bis **die Option „Empfangene Dateien nach (Tagen) löschen“** (Telegram 6.3.0 oder neuer) aktiviert ist. Er sendet die Bildunterschrift vor dem Foto. pi-agent erkennt die Bildunterschrift nur, wenn die Option **„Rohdaten der Anfrage speichern** “ (Registerkarte „Nachrichten“) aktiviert ist. Andernfalls werden Bildunterschrift und Foto als separate Antworten gesendet. pi-agent warnt zu Beginn, wenn eine der beiden Optionen deaktiviert ist. Bei eingestellter Medienqualität (mindestens „Hoch“) wird Text auf Fotos besser gelesen. Der Max-Adapter speichert Fotos immer und löscht ältere automatisch.
- Telegram speichert jedes Foto in bis zu vier Größen; nur die größte wird dem Model angezeigt. JPEG, PNG, GIF und WebP mit bis zu ca. 3,9 MB, wie bei Bildern in `ask` Die
- Dem Model wird ein Foto nur mit der dazugehörigen Frage zugesandt: Das Model macht sich Notizen zu dem, was es zeigt; diese Notizen werden in späteren Fragen anstelle des Fotos verwendet (siehe Bilder in …). `ask` Der Benutzer sieht die Notizen nicht.
- Das Präfix gilt nicht für Fotos und deren Bildunterschriften. Nur autorisierte Nutzer sind zu hören.
- Bei Zeilen, die vor Version 0.9.6 gespeichert wurden, ist **die Fotofunktion** deaktiviert, sodass bei einem Update keine Fotos an das Modell gesendet werden.
- Richten Sie in den Telegram-Einstellungen keine Assistenteninstanz ein: Diese empfängt die Fotos ebenfalls, und zu jedem Foto gibt es zwei Antworten.

### DeepSeek

Wählen Sie **DeepSeek** als Anbieter aus und geben Sie einen Schlüssel von der DeepSeek-Plattform ein. Verfügbare Modelle: `deepseek-flash` (Standard, schnell) und `deepseek-v4-pro` Anfragen gehen an `https://api.deepseek.com` Die

### OpenRouter

Wählen Sie **OpenRouter** aus und geben Sie einen OpenRouter-Schlüssel ein. Im Feld „Modell“ werden die von der installierten Version erkannten OpenRouter-Modelle mit ihren jeweiligen Beschränkungen und Preisen aufgelistet. OpenRouter fügt schneller neue Modelle hinzu, als diese Liste wächst: Eine nicht aufgeführte Modell-ID (z. B. `minimax/minimax-m3.1-flash` Das Modell funktioniert weiterhin über die OpenAI-API von OpenRouter. Preise, Kontextfenster, Antwortlänge und Bildeingabe stammen aus der öffentlichen Modellliste von OpenRouter, die zu Beginn eingelesen wird; die logische Argumentation ist deaktiviert. Kann die Liste nicht eingelesen werden, arbeitet das Modell mit den Annahmen eines OpenAI-kompatiblen Servers (Kontext von 128.000 Tokens, maximal 8.192 Tokens pro Antwort, keine Kosten), was im Protokoll vermerkt wird.

### OpenAI-kompatible Server

Wählen Sie **„OpenAI-kompatibel (eigene URL)“** für jeden Server mit der OpenAI Chat-Vervollständigungs-API, lokal oder in der Cloud:

| Server     | Basis-URL                        | API-Schlüssel |
| ---------- | -------------------------------- | ------------- |
| Ollama     | `http://<host>:11434/v1`         | keiner        |
| LM Studio  | `http://<host>:1234/v1`          | keiner        |
| vLLM       | `http://<host>:8000/v1`          | optional      |
| Groq       | `https://api.groq.com/openai/v1` | erforderlich  |
| OpenRouter | `https://openrouter.ai/api/v1`   | erforderlich  |

- Das Feld „Modell“ listet auf, was der Server meldet. `<base URL>/models` Die Modell-ID ist erforderlich.
- Das Modell muss den Aufruf von Tools unterstützen, andernfalls kann der Agent weder Zustände lesen noch schreiben.
- Der Adapter kennt die Grenzen eines solchen Modells nicht; er geht von einem Kontext von 128k Tokens und höchstens 8192 Tokens pro Antwort aus und meldet keine Kosten.

## Sicherheit

- Das Modell entscheidet, welche Tools aufgerufen werden. Die Schreibberechtigungen und der Simulationsmodus schützen Sie, nicht die Eingabeaufforderung.
- Die vom Agenten geschriebenen Skripte werden mit den Rechten des JavaScript-Adapters ausgeführt: Sobald ein Skript ausgeführt wird, schränken die Schreibberechtigungen und der Simulationsmodus von pi-agent es nicht mehr ein. Lesen Sie die Änderung, bevor Sie sie bestätigen (siehe Skripte).
- Der Text Ihrer Anfragen und die vom Agenten gelesenen Werte werden an den Anbieter gesendet. Gewähren Sie ihm keinen Zugriff auf Zustände, die Geheimnisse enthalten.
- Die Konversationen werden unverschlüsselt im Instanzdatenverzeichnis gespeichert (`session.sqlite`, SQLite ist in Node.js integriert). Eine Installation, die noch den JSONL-Speicher der Version 0.0.1/0.0.2 (Ordner) enthält `session`) wechselt beim ersten Start ohne ausstehende Anfragen zu SQLite; der alte Ordner wird umbenannt in `session.jsonl-<date>` und bleibt erhalten. Frühere Verläufe werden nicht übernommen, und die Messenger-Chats beginnen mit neuen Unterhaltungen.

## Benachrichtigungen, geplante Schreibvorgänge, Diagnose

- `notify_when` Informiert den Benutzer im Chat der Konversation, wenn ein Zustand eine Bedingung erfüllt: `==`, `!=`, `>`, `<`, `>=`, `<=` oder `changes` Optional für einige Minuten, z. B. „Die Waschmaschine ist fertig“ (Leistung unter 5 W für 3 Minuten) oder „Das Fenster ist länger als 10 Minuten geöffnet“. Nur vom Gerät gemeldete Werte (ack=true) werden gezählt, nicht Befehle. Eine Überwachung wird einmal ausgelöst und endet spätestens nach 7 Tagen; maximal 20 gleichzeitig. Die Überwachungen werden gespeichert in `scheduled.watches` und nach einem Neustart weitermachen.
- `schedule_set_state` Der Status wird später gespeichert („Heizung um 23:00 Uhr ausschalten“), maximal sieben Tage im Voraus. Die Schreibberechtigungen und die Bestätigung werden zum geplanten Zeitpunkt geprüft; die Berechtigung wird erneut geprüft, wenn die Speicherung fällig ist. Ein zwischenzeitlicher Berechtigungsentzug verhindert die Speicherung. Der Benutzer erhält eine Benachrichtigung, sobald die Speicherung abgeschlossen ist. Die Speicherung bleibt auch nach einem Neustart erhalten.
- `list_scheduled` zeigt die Erinnerungen, geplanten Schreib- und Beobachtungsphasen der Konversation an. `cancel_scheduled` einen davon storniert.
- `get_logs` liest die neuesten Zeilen der ioBroker-Protokolldatei (gefiltert nach Instanz, Ebene und einem Wort, maximal 50); `list_notifications` Zeigt die Benachrichtigungen von ioBroker an (die Glocke im Adminbereich). Beide sind nur lesbar.
- Eine Nachricht aus einem Gespräch `sendTo` Der Aufrufer (z. B. ioBroker.assistant) geht zu `chat.answer`; von einem Sprachsatelliten von ioBroker.assistant 1.4.9+ wird es auf diesem Satelliten gesprochen.

## Hintergrundjobs

Ein Hintergrundjob ist eine Aufgabe, die über Tage läuft und jedes Mal ein gewisses Maß an Aufmerksamkeit erfordert, z. B. „Während meiner Abwesenheit bis zum 20., teile mir mit, wenn ein Fenster 15 Minuten lang offen bleibt, während die Heizung läuft, oder wenn ein Zigbee-Sensor ausfällt“ oder „teile mir jeden Morgen um 7 Uhr das Wetter und den niedrigen Batteriestand mit“.

- Der Agent richtet es ein mit `create_job`: ein kurzer Name, die Aufgabe in den Worten des Benutzers, die Auslöser, die Anzahl der Tage, in denen sie läuft (maximal 30), und wohin ihre Nachrichten gehen.
- **Auslöser:** ein Zustand, der eine Bedingung erfüllt (`==`, `!=`, `>`, `<`, `>=`, `<=` oder `changes`, optional für einige Minuten; nur Werte der Geräteanzahl), eine Tageszeit (`daily` (Ortszeit) oder einem Intervall (15 bis 1440 Minuten). Ein Statusauslöser wird ausgelöst, sobald seine Bedingung erfüllt ist und erst wieder, nachdem die Bedingung nicht mehr erfüllt ist.
- **Das Modell wird nur aufgerufen, wenn ein Trigger ausgelöst wird.** Der Adapter überwacht die Trigger selbst; anschließend wird die zugehörige Konversation des Jobs mit der Aufgabe aktiviert, liest die benötigten Informationen und benachrichtigt den Benutzer oder bleibt stumm (Fehlalarm). Ein Job, der nie ausgeführt wird, verursacht keine Kosten.
- **Wo es meldet:** der Chat, in dem der Auftrag eingerichtet wurde (Standard), der Admin-Chat, ein Messenger-Chat oder **per Sprachnachricht** : der Satellit von ioBroker.assistant, von dem aus der Auftrag eingerichtet wurde (`assistant.0.satellites.<id>.tts`, benannt vom Assistenten seit 1.4.9), ansonsten alle von ihnen (`assistant.0.tts.text` Die Sprachausgabe erfordert **Schreibberechtigungen** für diesen Zustand in den „Schreibberechtigungen“; im Simulationsmodus wird nicht gesprochen. Bei der Einrichtung per Sprachausgabe fragt der Agent, wohin er sich melden soll.
- **Aktionen nur mit ✅/❌:** Jede Schreib-, Neustart-, Befehls-, Aktualisierungs- oder Skriptänderung eines Jobs wird im Messenger oder Admin-Chat, an den er sich meldet, angefordert, auch ohne „Bestätigung erforderlich“. Ein Job, der sich nur per Sprachnachricht meldet, kann dies nur mitteilen.
- **Beschränkungen:** maximal 5 Aufträge und 5 Auslöser pro Auftrag. Ein Auftrag, der mehr als 20 Mal an einem Tag aktiviert wird, wird pausiert und meldet dies, damit ein überlasteter Sensor das Budget nicht aufbrauchen kann; `resume_job` startet es von neuem.
- `list_jobs` zeigt die Jobs an (Auslöser, laufend oder pausiert, bis wann, wie oft sie aufgewacht sind), `stop_job` stoppt einen; ein Job kann sich selbst stoppen, wenn seine Aufgabe abgeschlossen ist („Sag mir einmal Bescheid, wenn die Waschmaschine fertig ist“). Die Jobs werden gespeichert in `scheduled.jobs` und nach einem Neustart weitermachen.
- Im Chat im Adminbereich werden die Jobs oberhalb der Konversation angezeigt (einklappbar): Status, Auslöser, bis wann, Aufwachvorgänge des heutigen Tages, der letzte, wo sie gemeldet werden, mit **Stopp** und **Fortsetzen** .
- Für eine einzelne Benachrichtigung, wenn etwas passiert, `notify_when` ist ausreichend.

## Code-Modus

Im **Code-Modus** (Registerkarte „Allgemein“, standardmäßig deaktiviert) kann der Agent eine Frage zu vielen Zuständen mit einem kurzen Skript beantworten, anstatt einen Tool-Aufruf nach dem anderen durchzuführen, z. B. „Welche Batterien haben weniger als 20 %, pro Raum?“:

```js
const rooms = await tools.list_rooms({});
for (const room of rooms.rows) {
    const found = await tools.find_states({ room: room.name, function: 'battery' });
    const low = found.rows.filter(s => s.role === 'value.battery');
    // …
}
```

- Das Skript läuft in einer QuickJS-Sandbox (`@earendil-works/pi-codemode`): Keine Dateien, kein Netzwerk, keine Timer, nur die Werkzeuge des Agenten als `tools.<name>(args)` Die Lesewerkzeuge liefern ihre Werte als Objekte. Nur das, was das Skript ausgibt, wird an das Modell übergeben, sodass eine Anfrage zum gesamten Haus nur einen Modellaufruf anstatt Dutzender benötigt und deutlich weniger Tokens erfordert.
- **Jeder Skriptaufruf ist ein eigener Toolaufruf:** Schreibberechtigungen, Simulationsmodus und Bestätigungen gelten für jeden einzelnen, auch bei Hintergrundprozessen. Ein Skript, das zehn Lampen auf der Liste „Bestätigung erforderlich“ schaltet, fragt zehnmal nach. Ein blockierter Aufruf ist ein Fehler im Skript, den dieses gegebenenfalls abfangen kann.
- Ein Skript übersteht einen Neustart des Adapters: Es wird an der Stelle fortgesetzt, an der es unterbrochen wurde, und die zuvor durchgeführten Aufrufe werden nicht erneut ausgeführt (ein unterbrochener Schreibvorgang wird als unterbrochen gemeldet, wie außerhalb eines Skripts).
- Skripte können keine Modelle aufrufen (keine Klassifikatoren, keine Bildgenerierung). Das Modell entscheidet, wann sich ein Skript lohnt; ein einzelner Schalter bleibt ein einzelner Werkzeugaufruf.
- Die Werkzeuge werden dem Modell als TypeScript-Deklarationen beschrieben (etwa 3000 zusätzliche Token pro Anfrage). Funktioniert am besten mit umfangreichen Modellen; bei kleineren Modellen sollten die Antworten im deaktivierten Code-Modus verglichen werden.

> **Der Code-Modus spart Tokens nur bei Fragen mit mehreren Schritten.** Eine Frage, die man anhand eines Musters beantwortet („Welche Batterien haben weniger als 20 % Ladung?“), ist im Code-Modus etwas aufwendiger als ohne: Auf einem Testsystem mit DeepSeek-Flash wurden 3 statt 2 Modellaufrufe benötigt. Eine Frage, die Daten kombiniert, zählt oder mehrere Geräte durchläuft („Wo ist ein Fenster geöffnet, während das Licht an ist, und welche Batterien haben weniger als 20 % Ladung?“), benötigte 1.646 neue Eingabe-Tokens statt 7.972 – etwa 80 % weniger. Das Skript führte die exakte Zuordnung durch, anstatt das Modell zu verwenden. Aktivieren Sie den Code-Modus, wenn solche Fragen häufig vorkommen oder das Haus groß ist.

## Scheduler fullcalendar

Für Aktionen, die sich wiederholen (jeden Werktag um 7:00 Uhr), mehr als 7 Tage im Voraus liegen, etwas für eine gewisse Zeit aktivieren oder von einer Bedingung abhängen, verwendet der Agent den Adapter [fullcalendar](https://github.com/ioBroker/ioBroker.fullcalendar) (3.3 oder neuer) über `send_to`: `addEvent`, `updateEvent`, `deleteEvent`, `listEvents`, `getCalendars`, `enableCalendar` Die Ereignisse erscheinen im Kalender und können dort geändert werden. Was geplant ist, liest der Agent vor. `fullcalendar.0.events.today`, `.tomorrow` Und `.next` Die

- Es benötigt **Schreibberechtigung** für `fullcalendar.0` in "Schreibberechtigungen".
- FullCalendar schreibt den Status eines Ereignisses später selbstständig. Daher überprüft pi-agent diesen Status (`oid`) zuerst gegen seine eigenen Schreibberechtigungen: Ein Ereignis für einen Zustand, in den der pi-Agent nicht schreiben darf, wird blockiert. Für `updateEvent` ohne `oid` Der Status des Ereignisses wird nachgeschlagen. Wo sich der Status oder die Zeile befindet `fullcalendar.0`, hat **eine Bestätigung erforderlich** , der Benutzer bestätigt das Ereignis mit Angabe von Art und Zeitpunkt, z. B. "addEvent: hm-rpc.0.heater.STATE = false, start 23:00, recurring daily".
- Wenn FullCalendar nicht installiert oder nicht zugelassen ist, teilt der Agent dem Benutzer mit, was fehlt, und bietet Alternativen an, die ohne FullCalendar funktionieren (`schedule_set_state` einmal innerhalb von 7 Tagen `notify_when`, `remind_me` Der Agent erkennt eine Installation ohne Neustart.

## Neustart der Instanzen

Das Werkzeug `restart_instance` Startet eine Adapterinstanz neu, z. B. „Telegram antwortet nicht, starte es neu“:

- Nur Instanzen mit **der Berechtigung „Neustart** “ in der Tabelle „Schreibberechtigungen“. Das Kontrollkästchen zählt nur für eine Zeile, deren Gültigkeitsbereich eine gesamte Instanz umfasst (`telegram.0`), nicht für eine Objekt-ID oder ein Muster und niemals für pi-agent oder admin. Schreiben und Neustarten sind separat zulässig.
- Jeder Neustart wird im Chat (Messenger oder Admin-Chat) mit ✅/❌ bestätigt, auch ohne die Meldung „Bestätigung erforderlich“. `sendTo` Der Anrufer (z. B. ioBroker.assistant) kann dies nicht bestätigen, daher ist ein Neustart von dort aus blockiert, es sei denn, die Option „Bestätigung per Text in sendTo-Konversationen“ ist aktiviert.
- Der Neustart funktioniert wie die Neustart-Schaltfläche im Administratorbereich. Der Agent wartet dann bis zu 45 Sekunden, bis die Instanz wieder läuft, und meldet dies. Eine ausgeschaltete Instanz wird nicht eingeschaltet. Im Simulationsmodus wird nichts neu gestartet.

## Befehle an andere Adapter

Das Werkzeug `send_to` sendet einen Befehl an einen anderen Adapter und gibt dessen Antwort zurück, z. B. eine Instanz. `telegram.0`, Befehl `send`, Nachricht `{"text": "Hello"}` oder einem Text-zu-Sprache-Adapter. Der Agent verwendet den Befehl und die Nachricht, die der Adapter dokumentiert.

- Nur für Instanzen, deren Zeile in "Schreibberechtigungen" die gesamte Instanz umfasst (`telegram.0`) mit **Schreibzugriff erlaubt** ; eine Zeile für einige Zustände einer Instanz (`telegram.0.communicate.*`) reicht nicht aus. Niemals an pi-agent oder admin.
- Da in dieser Zeile **eine Bestätigung erforderlich ist** , wird jeder Befehl zuerst im Chat mit ✅/❌ bestätigt.
- Der Agent wartet bis zu 30 Sekunden auf eine Antwort; viele Adapter antworten nicht, der Befehl könnte aber dennoch erfolgreich gewesen sein. Nach einer Unterbrechung wird ein Befehl niemals erneut gesendet. Im Simulationsmodus werden keine Befehle gesendet.

Vor dem ersten Befehl an einen Adapter liest der Agent mithilfe des Tools, was der Adapter über sich selbst aussagt. `adapter_help` Der Adapter beantwortet die Nachricht `help` mit seinen Befehlen, deren Parametern und Antworten, seinen wichtigen Zuständen und der Angabe, welche Befehle nur lesen und welche etwas verändern. `list_instances` markiert die Instanzen, die es deklarieren (`common.supportedMessages.help` in ihren `io-package.json`) mit `"help": true` Ohne Hilfe verwendet der Agent ausschließlich die im Adapter dokumentierten Befehle und versucht nicht, etwas zu erraten.

- `adapter_help` Es wird lediglich gelesen: Es benötigt keine Zeile in "Schreibberechtigungen" und keine Bestätigung.
- Es fragt nur nach laufenden Instanzen, die Nachrichten empfangen; ein Adapter, der dies nicht deklariert `help` Einem anderen werden ohnehin 3 Sekunden zum Antworten gegeben, einem anderen 10 Sekunden.
- Ein Adapter, der keine Nachrichten empfängt (ein reiner Webadapter ohne Prozess, z. B. home3d), kann diese Anfrage nicht beantworten. `help` Seine Hilfe liegt in den Zuständen, die es in seinem Dokument beschreibt. `io-package.json`: Die `instanceObjects` vom Typ `state` mit einem `common.desc` (höchstens 30), jeweils mit Angabe von Typ, Funktion, ob es beschreibbar ist und Beschreibung (Englisch, ansonsten die Muttersprache). `list_instances` kennzeichnet einen solchen Adapter mit `"help": true` ebenfalls. Diese Staaten mit `set_state` Sie benötigen wie üblich die Option "Schreiben erlaubt".

Adapter lernen durch Updates neue Funktionen, während eine Konversation (ein Sprachsatellit speichert seine eigene Konversation wochenlang) sich weiterhin daran erinnert, was eine ältere Version konnte. Daher hält pi-agent die Hilfen aktuell:

- Beim Start liest es die Hilfe jeder laufenden Instanz, die sich selbst beschreibt. Es beobachtet `system.adapter.*.alive` Die Instanzobjekte werden nach einem Neustart (auch ein Update startet eine Instanz neu) oder einer Änderung ihrer Objekte erneut abgefragt. Eine Instanz, die keine Hilfe mehr deklariert, ohne Hilfe antwortet, deaktiviert oder gelöscht wird, verlässt die Liste. Im Protokoll wird vermerkt, wann eine Hilfe geändert oder eine Instanz die Liste verlassen hat.
- Die Anweisungen des Modells benennen die Instanzen, die sich selbst beschreiben, und zwei Regeln: Lesen `adapter_help` Bevor die Zustände einer solchen Instanz zum ersten Mal geschrieben werden, und bevor der Benutzer darüber informiert wird, dass ein Adapter oder ein Gerät etwas nicht tun kann, wird der Zustand erneut in derselben Anfrage gelesen; eine frühere Antwort im Gespräch ist kein Beweis.
- pi-agent notiert für jede Konversation die Hilfe jeder solchen Instanz, die es verwendet hat (`get_state`, `set_state`, `send_to`) oder lesen (`adapter_help` Wenn sich diese Hilfe seitdem geändert hat, liest das Modell in seinen Anweisungen, dass die Instanz aktualisiert wurde und die vorherigen Ergebnisse der Konversation möglicherweise nicht mehr stimmen, bis es die Hilfe erneut liest. Die Notizen werden gespeichert in `adapter-knowledge.json` im Datenverzeichnis der Instanz, für die letzten 300 Konversationen.

## Das aufgezeichnete Haus (ioBroker.recorder)

[ioBroker.recorder](https://github.com/ioBroker/ioBroker.recorder) zeichnet jeden relevanten Zustand des Hauses auf, ohne dass jeder einzelne konfiguriert werden muss, erfasst, wer ihn geändert hat, und lernt, was für jede Stunde der Woche üblich ist. Wenn eine Instanz davon beim Start von pi-agent aktiviert wird, erhält der Agent vier Tools, die ausschließlich Daten auslesen:

| Werkzeug          | Befehl über den Rekorder | Bei Fragen wie                                                                                           |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `house_events`    | `getEvents`              | "Was wurde gestern Abend umgestellt?", "Wer hat die Garage geöffnet?"                                    |
| `house_snapshot`  | `getSnapshot`            | „War das Schlafzimmerfenster um 22:00 Uhr geöffnet?“, „Wie warm war das Wohnzimmer um 3:00 Uhr morgens?“ |
| `house_anomalies` | `getAnomalies`           | „Gab es gestern Abend irgendetwas Ungewöhnliches?“, „Warum habe ich diese Benachrichtigung erhalten?“    |
| `usual_value`     | `getProfile`             | „Sind 23 °C im Badezimmer jetzt normal?“                                                                 |

- Die angegebenen Zeiten sind die Ortszeiten des Hauses; "22:00" bedeutet die letzte 22:00 Uhr. Ein Raum wird in jeder Sprache gefunden ("Küche" findet "Küche"), die Kategorien sind die des Aufzeichners (`light`, `shading`, `climate`, `windowsDoors`, `motion`, `security`, `sockets`, `media`, `weather`, `energy`).
- Sie benötigen weder Schreibberechtigung noch eine Bestätigung. Bewegungs- und Anwesenheitserkennung sind nur verfügbar, wenn sie im Rekorder aktiviert sind; ein Profil für `usual_value` wird nach 14 Tagen erlernt.
- Nach einem Neustart des pi-agenten wird eine später installierte Instanz verwendet.

## Dokumentensuche (RAG)

Modelle, insbesondere lokale, erstellen Funktionen der Skript-API oder Einstellungen von Adaptern. Mit einem Server des Projekts [ioBrokerRAG](https://github.com/bloop-herbert-bot/ioBrokerRAG) (REST API v1) durchsucht der Agent zunächst die ioBroker-Dokumentation: die offizielle Dokumentation, den Quellcode des Kerns und die README-Dateien der Adapter.

- Registerkarte „Allgemein“, Block „Dokumentationssuche (RAG)“: die URL des Servers (z. B. `http://192.168.1.10:8000` und nur dann, wenn der Server dies festlegt `IOB_RAG_TOKEN`, sein Token (verschlüsselt gespeichert). „Dokumentationssuche testen“ prüft beides. Leere URL: deaktiviert, und das Modell erhält das Tool nicht.
- Das Werkzeug `search_docs` Sendet die Modellfrage an diesen Server und gibt bis zu 10 Textpassagen mit ihrer Quelle zurück. Nur Textpassagen aus frei lizenzierten Quellen (`license_status: allow`) Gehe zum Modell.
- Der Agent sucht nach Informationen, bevor er ein Skript schreibt und wenn er nach der Funktionsweise eines Adapters oder ioBrokers gefragt wird. Die Status-IDs des Hauses stammen weiterhin aus den Objekten, nicht aus der Dokumentation.

## Aktualisierungen der Adapter

Mit der Option **„Adapteraktualisierungen zulassen** “ (Registerkarte „Schreibberechtigungen“, standardmäßig deaktiviert) kann der Agent Adapter aktualisieren, z. B. „Gibt es Aktualisierungen?“ oder „Telegram aktualisieren“.

- `list_updates` Zeigt die installierten Adapter mit einer neueren Version im in ioBroker ausgewählten Repository (wie vom Administrator angezeigt) und ob der Agent diese aktualisieren darf. Auf die Frage nach npm oder den neuesten Versionen („Alle Updates auf npm prüfen“) vergleicht es in einem Aufruf alle installierten Adapter mit npm, einschließlich pi-agent. `check_npm` zeigt die neueste Version eines Adapters auf npm an; außerdem findet es einen Adapter anhand seines Titels (FingerprintDoorbell →`fingerprint`).
- Versionen, Zustände und Protokolle, die zuvor im Gespräch gelesen wurden, werden nicht wiederverwendet: Wenn der Agent aufgefordert wird, erneut zu prüfen, liest er sie erneut.
- Nur Adapter, deren Instanz über Schreibberechtigungen **verfügt** , und der pi-agent selbst. Niemals admin oder js-controller, und nur Adapter auf dem Host des pi-agent.
- Jede Aktualisierung wird im Chat mit ✅/❌ bestätigt, auch ohne „Bestätigung erforderlich“. `sendTo` Der Anrufer kann die Nachricht nicht bestätigen, daher wird eine Aktualisierung blockiert, es sei denn, die Option „Bestätigung per SMS in SendTo-Konversationen“ ist aktiviert. Im Simulationsmodus ist nichts installiert.
- Das Update wird auf dem Host wie die Aktualisierungsschaltfläche des Administrators ausgeführt (`iobroker upgrade`, oder `iobroker url` (für npm); der Agent wartet bis zu 10 Minuten und meldet das Ergebnis. Wenn sich pi-agent aktualisiert, startet er neu und informiert den Chat anschließend darüber, ob die neue Version läuft (Status). `update.pending` inzwischen).

## Skripte

Mit der Option „Schreibberechtigungen“ (standardmäßig deaktiviert) **kann der Agent Skripte erstellen und ändern.** Er schreibt Skripte des JavaScript-Adapters, z. B. „Schreibe ein Skript, das das Flurlicht bei Sonnenuntergang einschaltet“. Ein Skript wird mit den Rechten des JavaScript-Adapters ausgeführt, nicht mit den Rechten des pi-Agents: Schreibberechtigungen und Simulationsmodus sind nach der Ausführung nicht mehr verfügbar. Diese Funktion ist daher für Benutzer gedacht, die den Code vor der Bestätigung lesen.

- `list_scripts` Und `get_script` Ich habe jedes Drehbuch gelesen. `save_script` erzeugt oder verändert eines, `set_script_enabled` startet oder stoppt es, `revert_script` lädt die vorherige Version zurück (jeder Aufruf lädt eine Version weiter zurück; das Skript wird anschließend gestoppt).
- Neue Skripte sind in JavaScript geschrieben; TypeScript wird nur auf Anfrage erstellt („schreiben Sie es in TypeScript“). Ein bestehendes Skript behält seine Sprache.
- Der Agent schreibt nur in den Ordner `script.js.pi-agent` **Die Option „Andere Skripte ändern“** ermöglicht es, auch andere Skripte zu ändern, einschließlich globaler Skripte. Blockly- und Rules-Skripte bleiben schreibgeschützt.
- Jeder Speichervorgang, Start, Stopp und Rückgängigmachungsvorgang wird separat bestätigt. Der Admin-Chat zeigt die Änderungen zeilenweise an; Telegram und MAX zeigen sie so weit an, wie es die Nachricht zulässt. Die Frage listet außerdem auf, was pi-agent im Code gefunden hat: `exec`, `require` Dateizugriff, Objektänderungen, `sendTo` Netzwerkanrufe und `setState` auf Zustände außerhalb der Schreibberechtigungen von pi-agent oder anhand einer berechneten ID. Diese Suche ist ein Hinweis, kein Schutz.
- Ein neues Skript bleibt angehalten, bis sein Start bestätigt wird. Ein laufendes Skript wird sofort mit dem neuen Code neu gestartet; dies ist in der Frage angegeben. Die Syntax wird geprüft, bevor der Benutzer gefragt wird; der Agent behebt Fehler zuerst. TypeScript verliert bei dieser Prüfung seine Typen (Node.js). `stripTypeScriptTypes`): Die Typen werden nicht überprüft, und `enum` oder `namespace` ausschließlich durch den Compiler des JavaScript-Adapters beim Start des Skripts.
- Nach dem Start überwacht der Agent einige Sekunden lang das Protokoll der JavaScript-Instanz und meldet Fehler im Skript.
- Per Stimme (a `sendTo` Konversationen (z. B. ioBroker.assistant) werden nur mit **„Skripte per Sprache bestätigen** “ bestätigt, wofür „Bestätigung per Text in sendTo-Konversationen“ erforderlich ist. Der Code wird nicht vorgelesen: Die Frage benennt das Skript, beschreibt dessen Funktion in einem Satz (vom Modell generiert) und listet den im Code gefundenen pi-Agenten auf.
- Die vorherigen Versionen (fünf pro Skript) werden im Instanzdatenverzeichnis aufbewahrt und sind Teil der Sicherungskopien der Konversationen.

## Langzeitgedächtnis

Ein Gespräch erinnert sich an alles Gesagte, aber die Gespräche kennen einander nicht. Fakten, die überall gelten sollten, gelangen ins Langzeitgedächtnis:

- Der Agent speichert eine Tatsache mit dem Werkzeug `remember` wenn Sie es bitten („Merken Sie sich: Die Lampe im Wohnzimmer ist hue.0.lamp3“) oder wenn Sie ihm eine dauerhafte Präferenz mitteilen, entfernt es diese mit `forget` Die
- Alle Fakten fließen in die Anweisungen jeder Konversation ein: Messenger, Admin-Chat und `sendTo` Aufrufer wie ioBroker.assistant. Maximal 100 Fakten, jeweils 500 Zeichen und insgesamt 8.000 Zeichen.
- Die Fakten liegen im Staat. `pi-agent.0.memory.list` (JSON). Sie können es dort bearbeiten; der Adapter übernimmt die Änderung. `memory.count` zeigt die Anzahl an. Der Speicher ist Teil der Sicherungskopien der Konversationen.
- Der Speicher wird von allen gemeinsam genutzt, die mit dem Agenten kommunizieren. Deaktivieren Sie ihn in den Einstellungen unter „Langzeitspeicher“. Speichern Sie niemals Passwörter oder Schlüssel; der Agent ist dazu angewiesen, dies nicht zu tun.

## Sicherung der Konversationen

Die Gespräche finden statt `session.sqlite` im Instanzdatenverzeichnis, das die ioBroker-Sicherung nicht enthält. Die Registerkarte „ **Sicherung“** speichert sie dort, wo sie gespeichert werden:

- **Die Funktion „Backup erstellen“** schreibt eine konsistente, gzip-komprimierte Kopie des Speichers zusammen mit der Zuordnung der Messenger-Chats in den Speicherordner. `pi-agent.0.storage/backups` (Admin → **Dateien** ). ioBroker- und BackItUp-Backups sichern diesen Ordner. Der Agent arbeitet während der Sicherung weiter.
- **Automatische Datensicherung** : täglich (Standard) oder wöchentlich, gezählt ab der letzten Datensicherung, auch nach einem Neustart; eine fällige Datensicherung wird fünf Minuten nach dem Start ausgeführt. „Automatische Datensicherungen aufzubewahren“ (Standard 7) löscht die ältesten automatischen Datensicherungen; manuell erstellte Datensicherungen und Sicherheitskopien werden niemals gelöscht.
- **Die Wiederherstellung** ersetzt die Konversationen durch die ausgewählte Sicherung und startet die Instanz neu. Die aktuellen Konversationen werden zuerst als Sicherheitskopie gespeichert (`pi-agent-prerestore-….sqlite.gz` Anfragen, die in der Warteschlange standen, werden verworfen.
- **Kopieren auf einen externen Server (SFTP)** : Jedes Backup wird zusätzlich auf einen anderen Computer, z. B. ein NAS, per SFTP-Protokoll kopiert (ohne Mounten, ohne sudo). Der Upload wird wie folgt beschrieben: `.part` Die Datei wird nach Fertigstellung umbenannt; der Fingerabdruck des Servers kann so ermittelt werden. Verwenden Sie einen Benutzer, der ausschließlich Schreibrechte im Zielverzeichnis besitzt. Die Datei enthält den vollständigen Text der Konversationen und ist serverseitig nicht verschlüsselt.
- **Wiederherstellung vom externen Server** , z. B. nach einer Neuinstallation: Geben Sie die SFTP-Einstellungen ein, aktivieren Sie die Kopierfunktion, speichern Sie die Daten und wählen Sie dann eine Sicherung auf dem Server aus.

Die Staaten `backup.last`, `backup.size`, `backup.lastRemote` Und `backup.remoteError` Zeigen Sie das letzte Backup und die letzte Kopie an.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.3 (2026-11-20)

- (sadam6752-tech) A conversation that used an adapter without a help, or heard from adapter_help that it has none, is now told when the adapter gains one (the same "UPDATED" line as after a changed help). Seen with movieswipe: a voice conversation had heard "takes no messages" from 1.1.6 and after the update to 1.2.0, which brought a movie search, kept answering that it has no access to the movie database.
- (@GermanBluefox) `send_to`: a data URL in an answer (e.g. the picture echarts rendered) reaches the model as its
  type and size instead of 4000 characters of base64

### 0.12.2 (2026-11-20)

- (@GermanBluefox) The helps of the adapters stay current: pi-agent reads them at its start and again after an
  instance restarts or its object changes; an instance without a help any more leaves the list. A conversation that
  used an instance whose help changed since is told to read it again, so it does not answer from what an older
  version could do (seen with a voice satellite: "the TV takes only exact links" after youtube-remote learned to search)
- (@GermanBluefox) The instructions name the instances that describe themselves; before telling the user that an
  adapter cannot do something, the agent reads its help in that request
- (sadam6752-tech) `@iobroker/testing` 6.3.2 (repository checker W0037); the changelog links to CHANGELOG_OLD.md

### 0.12.1 (2026-11-20)

- (@GermanBluefox) `adapter_help` for adapters that take no messages (web-only ones such as home3d): their help is
  the states they describe in their `io-package.json` (`instanceObjects` with `common.desc`), listed with type,
  whether they are writable and the description; `list_instances` marks them with `"help": true` too
- (sadam6752-tech) The help from states stays within 20000 characters like any other help; `list_updates` marks
  a new web-only adapter that describes its states with `"help": true` in `newAdapters`

### 0.12.0 (2026-11-20)

- (sadam6752-tech) A recorder installed, switched on, off or removed while the agent runs restarts the agent, so its
  tools come and go without a manual restart; `list_updates` names the adapters installed since the last look
  (`newAdapters`, with `"help": true` when the adapter describes its commands for `adapter_help`)
- (sadam6752-tech) A background job whose triggers are all times of day (a report every morning) runs up to 365 days
  or without an end instead of 30 days; the agent asks "one year or without an end?" when the user did not say how
  long, and the admin chat shows "no end"; every job conversation starts anew after 30 days, so a long report does
  not send months of history; with a recorder, job reports use `house_events`, `house_anomalies` and `usual_value`

### 0.11.1 (2026-11-19)

- (@GermanBluefox) Tool `adapter_help`: before the first `send_to` to an adapter the agent reads the description the
  adapter gives of its commands and states (message `help`, `common.supportedMessages.help`), without a write
  permission; `list_instances` marks those adapters with `"help": true`; the description of `send_to` points to it
  instead of telling the model to send `help` itself (that needed a write permission)

### 0.11.0 (2026-11-18)

- (sadam6752-tech) With ioBroker.recorder installed, four read-only tools: `house_events` (what was switched, when and by whom), `house_snapshot` (the house at a moment in the past), `house_anomalies` and `usual_value`; `get_history` reads from the recorder when the history instance has nothing for a state

### 0.10.5 (2026-11-15)

- (sadam6752-tech) New setting "Tokens per request (context)" (0 = as before): above it the older part of a
  conversation is summarised, so a long satellite conversation no longer sends up to 100k tokens with every request.
  The debug log shows the tokens of every model call (context, share from the cache, answer, cost)

### 0.10.4 (2026-11-13)

- (sadam6752-tech) Confirmation by voice: a bare yes or no keeps the language of the conversation. A spoken "Да" came
  back from speech recognition as "Yeah.", and the confirmation that followed was asked in German instead of Russian

Older changes are listed in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Alex <sadam6752@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.