---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: FXpS9b4KAaHE0lDvD390oRsICpFPR8J0gz0Q4f7ELPc=
---
# ioBroker.webui

![Anzahl der Installationen](https://iobroker.live/badges/webui-installed.svg)
![Stabile Version](https://iobroker.live/badges/webui-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.webui.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.webui.svg)
![NPM](https://nodei.co/npm/iobroker.webui.png?downloads=true)

Web-Oberfläche für ioBroker

![Bild](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Tutorial-Videos (derzeit nur auf Deutsch)

<https://www.youtube.com/@jogibear9988>

## Beschreibung

Dies ist ein komplettes Visualisierungssystem für ioBroker.

Es umfasst Funktionen wie:

- einfache Skriptsprache
- Bindung an ioBroker-Objekte einschließlich Konverter und JavaScript-Ausdrücke
- Einfügen von Bildern aus der Zwischenablage
- Externe Bilder per Drag & Drop einfügen
- ioBroker-Objekte per Drag & Drop hinzufügen, um automatisch Bindungen zu erstellen
- Ziehen Sie ioBroker-Objekte per Drag & Drop auf die Eigenschaften, um Bindungen zu ihnen zu erstellen.
- relative Signalpfade zu ioBroker-Objekten in Bildschirmen (der vollständige Pfad kann von außerhalb an den Bildschirm übergeben werden)
- Bearbeitung von Layout und HTML-Code in geteilter Ansicht
- Unterstützung für globale Stylesheets
- Verwendung von npm-Paketen, die Webkomponenten enthalten
- Nutzung der ioBroker-Webkomponenten der installierten Adapter (die gleichen Komponenten vis-2, devices und admin show)
- Bildschirme in Bildschirmen
- Verwenden Sie alle Symbolpakete von ioBroker.
- Verwenden Sie Charts von ioBroker.
- Verwenden Sie kombinierte Signalobjekt-IDs, z. B. „webui.0.test3.{webui.0.test3.select}“ -> dadurch wird der Wert von webui.0.test3.select für den Signalnamen verwendet.

Weitere Informationen zu spezifischen Themen finden Sie im [Wiki](https://github.com/iobroker-community-adapters/ioBroker.webui/wiki) (der deutsche Teil enthält einige Artikel mehr als der englische).

## Installation

### Abhängigkeiten

- Sie benötigen den Webadapter. Er funktioniert mit folgenden Einstellungen:![Bild](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)

## Konzepte

### Beschreibung

Der Designer verwendet Webkomponenten, daher befindet sich der von Ihnen entworfene HTML-Code innerhalb eines Shadowroots einer Webkomponente. Das bedeutet, dass Sie ihn nicht formatieren können.<body> oder<html> Innerhalb des Stylesheets. Um das äußere Layout zu gestalten, verwenden Sie den Selektor ":host". Dies bedeutet auch, dass Sie keine "on..."-Ereignisbehandler verwenden können. Verwenden Sie stattdessen die Ereigniszuweisung "@...".

### Benutzerdefinierte Steuerelemente in der WebUI

Sie können in WebUI Ihre eigenen wiederverwendbaren CustomControls erstellen, von denen jedes über eigenes JavaScript, eigene Eigenschaften und eine Vorlage verfügen kann.

Sie können die Syntax mit doppelten eckigen Klammern und doppelten geschweiften Klammern der „BaseCustomWebcomponent“ verwenden, um Bindungen von der Vorlage zu den im Designer definierten Eigenschaften zu erstellen. Geschweifte Klammern erzeugen bidirektionale Bindungen. Im Dialogfeld „Bindungen“ können Sie eine Eigenschaft mit ??Eigenschaftsname und ein IoBroker-Objekt in dieser Eigenschaft mit ?Eigenschaftsname binden. In Skripten können Sie außerdem Signale ansprechen, die in benutzerdefinierten Eigenschaften definiert sind.

Sie können JavaScript in Ihr CustomControl oder Ihren Bildschirm einbinden. Zusätzlich können Sie eine Funktion exportieren. `init(instance)` Diese Methode wird aufgerufen, wenn Ihr CustomControl instanziiert wird. `connected()` Und `disconnected()` Es können Funktionen definiert werden, die aufgerufen werden, wenn ...

### ioBroker-Webkomponenten

Adapter können [ioBroker-Webkomponenten](https://github.com/ioBroker/web-components) einbinden: benutzerdefinierte Elemente, die in jeder ioBroker-Benutzeroberfläche gleich angezeigt werden. Ihre Adapter listen diese auf in `common.webComponents` Der Designer zeigt sie in der Palette unter **Steuerelemente → Designer → ioBroker-Webkomponenten** an; Komponenten, die einen eigenen Wert bearbeiten (`editsValue`) werden ausgelassen, da die Web-Oberfläche solche Werte nicht speichert.

Eine platzierte Komponente wird folgendermaßen gespeichert:

```html
<iobroker-webui-web-component adapter="flow" component="flow-diagram" setting-oid="flow.0.diagrams.main" theme="dark"></iobroker-webui-web-component>
```

- Jede Einstellung der Komponente ist ein Attribut. `setting-<name>` (`textTrue` wird `setting-text-true` Bearbeiten Sie es im Eigenschaftenraster oder binden Sie es wie jedes andere Attribut an einen ioBroker-Status. Eine Checkbox-Einstellung funktioniert wie ein boolescher HTML-Wert: vorhanden bedeutet wahr.
- `theme` Ist `light` (Standard), `dark` oder `auto` (folgt dem Browser). Die benutzerdefinierten CSS-Eigenschaften `--iob-primary`, `--iob-paper`, `--iob-text`, ... auf oder über dem Element werden einzelne Farben überschrieben, wenn die Komponente angezeigt wird.
- Im Designer wird die Komponente `editMode` und schreibt keine Zustände. Zur Laufzeit ruft es den Socket der Web-Oberfläche ab.
- Die Veranstaltung `iob-navigate` Öffnet die Web-Benutzeroberfläche mit diesem Namen, sofern vorhanden.
- Die Komponenten werden beim Laden der Seite einmalig eingelesen: Laden Sie den Designer nach der Installation eines Adapters neu.

## KI-Bildschirmassistent

Öffnen Sie **AI** in der Designer-Toolbar. Konfigurieren Sie einen Provider unter **ioBroker Admin → Systemeinstellungen → AI** und wählen Sie anschließend dessen Modell im Assistenten aus. Der Adapter verwendet dasselbe.[`@iobroker/ai-core`](https://github.com/ioBroker/ai-core) Backend als vis-2; Provider-Zugangsdaten verbleiben auf dem Server. Ein lokaler KI-Server/Ollama-Endpunkt kann über die KI-Systemkonfiguration ausgewählt werden. Node.js 22.19 oder neuer ist erforderlich; für den KI-Chat wird außerdem ein aktueller Controller/Webadapter mit Instanznachrichten-Abonnements benötigt.

Der Assistent startet als ausgeblendeter Tab am rechten Rand. Sie können ihn über diesen Tab oder den Befehl in der **KI** -Symbolleiste öffnen. Die Schaltfläche „Schließen“ blendet das Dock aus, ohne dass Entwürfe oder laufende Chats verloren gehen; der Befehl in der Symbolleiste öffnet es wieder.

Geben Sie Ihren Text ein und drücken Sie **die Eingabetaste** , um automatisch einen Chat zu erstellen. **Mit Shift+Eingabe** fügen Sie eine neue Zeile ein. Klicken Sie auf einen Chat-Tab, um fortzufahren; klicken Sie erneut auf denselben Tab, um zu Ihrem ursprünglichen Entwurf zurückzukehren. Klicken Sie mit der rechten Maustaste auf einen Tab, um den Chat umzubenennen oder zu löschen. Die Anbieter-/Modellauswahl befindet sich unterhalb des Nachrichtenfelds; klicken Sie mit der rechten Maustaste auf die Steuerelemente des Editors, um sie neu zu laden. Chats und der noch nicht gesendete Entwurf werden für die aktuelle Installation und den aktuellen ioBroker-Benutzer in diesem Browser gespeichert. Das Neuladen unterbricht laufende Chatrunden.

Während der Assistent arbeitet, können Sie weiter tippen und mit „Senden **“ die Eingabe** steuern, um den nächsten sicheren Schritt zu lenken, oder **„Warteschlange“** wählen, um nach dem aktuellen Zug eine Folgenachricht zu senden. Ausstehende Nachrichten können oberhalb des Eingabefelds bearbeitet oder gelöscht werden. **Mit „Stopp“** wird der lokale Zug sofort beendet, nachfolgende Tools werden übersprungen und nicht gesendete, ausstehende Nachrichten gelöscht; eine bereits gesendete Provider-Anfrage kann im Hintergrund noch abgeschlossen werden. Aktive Tabs und die Konversation zeigen Aktivitätsindikatoren an.

Die Mikrofontaste diktiert den Text in das Nachrichtenfeld, ohne ihn abzusenden. Sie nutzt die Spracherkennung des Browsers und benötigt die Mikrofonberechtigung; die Verfügbarkeit ist browserabhängig. Die Diktierfunktion kann mit derselben Taste beendet werden. Das Schließen des KI-Docks beendet die Diktierfunktion.

Der Assistent kann gespeicherte Bildschirme und Steuerelemente, nicht gespeicherte geöffnete Editoren, HTML/CSS/JavaScript, globale Stile/Skripte, installierte Palettenelemente sowie durchsuchbare ioBroker-Objektmetadaten/aktuelle Werte untersuchen. Er enthält Dokumentationen zu Bindungen, Ereignisbehandlern und den generierten einfachen Skript-Befehlsschemata. Die native Objektkonfiguration ist ausgeschlossen, und es gibt kein Werkzeug zum Schreiben des Live-Zustands. Der vom Assistenten angeforderte Quell- und Objektkontext wird an den in ioBroker ausgewählten Anbieter gesendet.

Verwenden Sie die **Funktion „Dateien anhängen“** für Text-/Quelldateien und PNG/JPEG/WebP/GIF-Bilder oder fügen Sie Screenshots in das Nachrichtenfeld ein. Wählen Sie für Bilder ein bildverarbeitungsfähiges Modell. Es sind maximal acht Anhänge und 10 MB pro Nachricht zulässig. Die aktuelle ioBroker Anthropic Bridge unterstützt nur Text; für Screenshot-Chats muss ein OpenAI-kompatibler Bildverarbeitungsanbieter verwendet werden (z. B. OpenAI, Gemini, OpenRouter oder ein geeignetes lokales Modell).

Änderungen werden als Vorschläge mit dem ursprünglichen und dem vorgeschlagenen Quellcode angezeigt. **Die Funktion „Im Editor anwenden“** aktualisiert die Ansicht, ohne sie zu speichern. Überprüfen Sie die Änderung im Designer und speichern Sie sie anschließend mit dem Befehl „ **Speichern“** . Falls sich der Quellcode geändert hat, nachdem der Assistent ihn gelesen hat, verweigert „Im Editor anwenden“ das Überschreiben. Bitten Sie den Assistenten, den Quellcode erneut zu lesen und einen neuen Vorschlag zu erstellen. Neue Ansichten werden über denselben Workflow für Vorschläge erstellt.

## Sponsoring

Wenn Sie die Entwicklung unterstützen möchten, können Sie dieses Projekt unter <https://github.com/sponsors/jogibear9988> sponsern.

## Entwicklung

- Repository als Adapter in IOBroker installieren

- Laden Sie das Repository in ein separates "dev"-Verzeichnis herunter; entwickeln Sie nicht innerhalb des ioBroker Node\_modules-Verzeichnisses.

- Führen Sie die folgenden Schritte im Verzeichnis „dev“ aus.

- Abhängigkeiten installieren

```
  $ npm install
```

- Nach den Änderungen TypeScript kompilieren (oder in VS Code Strg + Umschalt + B drücken und „tsc watch“ auswählen).

```
  $ npm run tsc
```

- Passen Sie die Datei 'config.js' an Ihre IP-Adresse und Ihren Port für Ihren iobroker an (Die config.js-Datei im Stammverzeichnis des Repositorys wird beim Ausführen von 'npm build' durch die Datei in '/config' ersetzt).

```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

- Führen Sie die App auf einem lokalen Server aus.

```
  $ npm start
```

- Navigieren Sie in Chrome zu [localhost:8000,]() um die App anzuzeigen.

### Mehr zum Thema Entwicklung

- Laufen

```
  $ npm run reflection
```

um Reflexionsdateien für Skripte neu zu erstellen, die für das Eigenschaftenraster verwendet werden.

- Laufen

```
  $ npm run build
```

Die kompilierten Dateien und der Ordner node\_modules werden in den www-Ordner kopiert, damit der Adapter über GitHub installiert werden kann.

- Laufen

```
  $ npm run release
  $ npm publish
```

Um einen korrekten Release-Commit für iobroker zu erstellen, beachten Sie bitte, dass dieser auch in das Git-Repository übertragen wird. Bearbeiten Sie daher unbedingt vorher die Datei „CHANGELOG.md“. Der Text unter „## **WORK IN PROGRESS** “ in der Datei „README.md“ wird für die Versionsinformationen verwendet.

## Informationen zum Adapter.

Der Adapter basiert auf der folgenden Designer-Komponente: <https://github.com/node-projects/web-component-designer>

Sie müssen einen Bildschirm namens „start“ erstellen. Dieser wird beim Öffnen von runtime.html als erstes aufgerufen. Sie können ihn jedoch über den Abfrageparameter runtime.html?screenName=screen2 ändern.

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.4.0 (2026-11-11)
- Use the ioBroker web components of installed adapters (`common.webComponents`, `@iobroker/web-components`) in screens: palette entries, a settings section in the property grid with every setting as a bindable `setting-*` attribute, theme support and `iob-navigate` to screens.
- dark mode changed
- components list

### 2.3.0 (2026-11-10)
- Expand AI context with current/open editors, selected screen elements, separate CSS/JavaScript, settings and component properties.
- Add paged discovery of components, installed component APIs, signals, images, icons and chart presets, with on-demand image/icon previews for vision models.
- Improve AI guidance for CSS bindings, converters and simple scripts, preferring the separate CSS/JavaScript fields.
- Apply AI proposals as one Undo/Redo step covering HTML, CSS, JavaScript, settings and properties while preserving earlier manual history.
- Show proposal review and Apply/Discard actions below AI answers, outside collapsed work outputs.
- Add chat message timestamps, elapsed thinking time and cost totals in the chat list/footer when explicitly reported.
- Balance the default dock column widths and fix document context-menu colors in light/dark mode.
- Keep detached screens, AI chats and tool/global-editor windows editable, including component drops, shared models, Save and Undo/Redo. Closing a popup returns its unsaved panel to the main editor.
- Fix missing script command details, including SetSignalValue signal/target fields, by resolving scalar schema aliases.

### 2.2.0 (2026-11-10)
- (copilot) Adapter requires node.js >= 22.19.0 now
* (GermanBluefox) Repochecker warnings fixed (#563)
- new features, AI, new designer, ...

### 2.1.0 (2026-09-15)
- fix blockly scripts
- add dark/light mode

### 2.0.3 (2026-08-21)
- fix help dlg pos

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 jogibear9988 <jochen.kuehner@gmx.de>

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