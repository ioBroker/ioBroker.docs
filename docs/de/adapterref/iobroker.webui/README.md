---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: A96T9KF5U5AVrmYLAJDO4JXZRD8QOO7fJfpoZZk4czg=
---
# IoBroker.webui

![Anzahl der Installationen](https://iobroker.live/badges/webui-installed.svg)
![stabile Version](https://iobroker.live/badges/webui-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.webui.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.webui.svg)
![NPM](https://nodei.co/npm/iobroker.webui.png?downloads=true)

Webui für ioBroker

![Bild](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Tutorial-Videos
https://www.youtube.com/@jogibear9988

## Beschreibung
Dies ist ein vollständiges Visualisierungssystem für ioBroker.

Es umfasst Funktionen wie:

  - eigene einfache Skriptsprache
  - Bindung an ioBroker-Objekte einschließlich Konvertern und Javascript-Ausdrücken
  - Einfügen von Bildern aus der Zwischenablage
  - Drag-Drop von externen Bildern
  - Ziehen Sie ioBroker-Objekte per Drag-Drop, um automatisch Bindungen zu erstellen
  - Ziehen Sie ioBroker-Objekte per Drag-Drop in die Eigenschaften, um Bindungen für sie zu erstellen
  - relative Signalpfade zu ioBroker-Objekten in Bildschirmen (der vollständige Pfad kann von außen an den Bildschirm übergeben werden)
  - Bearbeitung des HTML-Codes in geteilter Ansicht
  - Globale Stylesheet-Unterstützung
  - Verwendung von NPM-Paketen, die Webkomponenten enthalten
  - Bildschirme innerhalb von Bildschirmen
  - Verwenden Sie alle Icon-Pakete von ioBroker
  - Verwenden Sie Diagramme von ioBroker
  - Verwenden Sie Objekt-IDs für kombinierte Signale, z. „webui.0.test3.{webui.0.test3.select}“ -> Dies verwendet den Wert von webui.0.test3.select für den Signalnamen

## Installation
### Abhängigkeiten
  - Sie müssen den Web Adaptor installiert haben. Es funktioniert mit den folgenden Einstellungen: ![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)

## Konzepte
### Beschreibung
Der Designer verwendet Webkomponenten, sodass sich der von Ihnen entworfene HTML-Code in einem Shdowroot einer Webkomponente befindet. Diese Herrenmode kann man nicht stylen<body> oder<html> innerhalb des Stylesheets. Um das äußere Layout zu gestalten, verwenden Sie den Selektor „:host“. Das bedeutet auch, dass Sie keine „on…“-Eventhandler verwenden können. Verwenden Sie die Ereigniszuweisung „@...“.

### Benutzerdefinierte Steuerelemente in WebUI
Sie können in WebUI eigene wiederverwendbare CustomControls erstellen. Dies kann individuelles Javascript, Eigenschaften und eine Vorlage haben.

Sie können die Double-Bracket-Syntax und die Double-Curly-Braket-Syntax von „BaseCustomWebcomponent“ verwenden, um Bindungen aus der Vorlage an die im Designer definierten Eigenschaften zu erstellen. Curylklammern erzeugen bidirektionale Bindungen.
Wenn Sie das Dialogfeld „Bindungen“ verwenden, können Sie über „Propertyname“ eine Bindung an eine Eigenschaft und über „Propertyname“ an ein ioBroker-Objekt in der Eigenschaft vornehmen.
In Skripten können Sie auch in Signale schreiben, die in benutzerdefinierten Eigenschaften definiert sind.

Sie können auch Javascript in Ihr CustomControl oder Ihren Bildschirm einbinden. Sie können auch eine Funktion „init(instance)“ exportieren, die aufgerufen wird, wenn Ihr CustomControl instanziiert wird. (und auch die verbundenen und getrennten Funktionen könnten verwendet werden)

## Sponsoring
Wenn Sie die Entwicklung unterstützen möchten, sponsern Sie dieses Projekt unter https://github.com/sponsors/jogibear9988

## Entwicklung
  * Repository als Adapter in IOBroker installieren
  * Laden Sie das Repository in ein zusätzliches „dev“-Verzeichnis herunter, entwickeln Sie es nicht im ioBroker Node_modules-Verzeichnis.
  * Führen Sie die folgenden Schritte im Verzeichnis „dev“ aus.

  * Abhängigkeiten installieren

```
  $ npm install
```

  * Kompilieren Sie Typescript, nachdem Sie Änderungen vorgenommen haben (oder drücken Sie Strg + Umschalt + B in VsCode und wählen Sie „tsc watch“).

```
  $ npm run tsc
```

  * Passen Sie „config.js“ an Ihre IP-Adresse und Ihren Port für Ihren Iobroker an

   (Die config.js im Repository-Stammverzeichnis wird durch die in „/config“ ersetzt, wenn „npm build“ ausgeführt wird.)

```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

  * Führen Sie die App auf einem lokalen Server aus

```
  $ npm start
```

  * Navigieren Sie in Chrome zu [localhost:8000](), um die App anzuzeigen.

### Mehr über Entwicklung
  - Laufen

```
  $ npm run reflection
```

   um Reflexionsdateien für die Skripterstellung neu zu erstellen, die für das Eigenschaftenraster verwendet werden

  - Laufen

```
  $ npm run build
```

   um kompilierte Dateien und node_modules in den WWW-Ordner zu kopieren, damit der Adapter über Github installiert werden kann

  - Laufen

```
  $ npm run release
  $ npm publish
```

Um das richtige Release-Commit für iobroker zu erstellen, seien Sie vorsichtig, da dies auch zum Git-Repo führt.
Stellen Sie sicher, dass Sie „CHANGELOG.md“ vorher bearbeiten. Der Text in „## **WORK IN PROGRESS**“ in README.Md wird für Versionsinformationen verwendet

## Infos zum Adapter.
Der Adapter basiert auf der folgenden Designer-Komponente: https://github.com/node-projects/web-component-designer

Sie müssen einen Bildschirm „Start“ erstellen. Dies ist der erste, der aufgerufen wird, wenn Sie runtime.html öffnen. Sie können dies jedoch über den Abfrageparameter runtime.html?screenName=screen2 ändern

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- fix upercase screen names in runtime
- raster in designer is now adjustable
- copy object nodes now copies complete string
- context menu to directly edit custom element
TODO: fix handler path in script
TODO: uiChangedView
TODO: error when importing invalid file (for example html instead of json)

### 0.12.3 (2023-09-20)
- after eval removal, functions need a return

### 0.12.2 (2023-09-20)
- events names for 2way bindings need a editor

### 0.12.1 (2023-09-20)
- two way for indirect bindings

### 0.12.0 (2023-09-20)
- support indirect bindings via {...} in signals (like in vis)

### 0.11.2 (2023-09-17)
- check npm package name

### 0.11.1 (2023-09-16)
- fix build on windows

### 0.11.0 (2023-09-11)
- dragdrop fixes
- screen/control size fixes
- connected/disconnected callbacks

### 0.10.0 (2023-09-10)
- new script commands
- bugfix with bindings and empty events
- select exported function in javascript
- bugfix in save of screens
- typescript in scripts
- started work on translateable runtime

### 0.9.0 (2023-09-06)
- signal selector in properties
- screen selector in properties
- new screen had style in scripts
- indirect value/property acces from scripts via editor
- list multiple undo entries (on hold of undo)

### 0.8.0 (2023-09-03)
- update designer to add and fix some commands
- move screen/control scripts out of html code
- add a javascript editor view
- bugfix when states where null after a fresh install
- designer addons do now work again
- docking framework updated, cause of bugs with undocking

### 0.7.0 (2023-09-01)
- screens and controls have now settings (width, height, useGlobalStyle)

### 0.6.0 (2023-09-01)
- removed many uneeded files from installation

### 0.5.1 (2023-09-01)
- show version in ui

### 0.5.0 (2023-09-01)
- signal as property type
- removed svg-image control
- shorter custom control tag name
- better dynamics editor
- dock ui fixes
- control ui from backend (switch view, reload)

### 0.4.0 (2023-08-30)
- remove uneeded files from upload
- remove icons into extra iobroker packages
- support icon adapters
- rename screens & controls

### 0.3.0 (2023-08-29)
- default value for custom properties
- open screens only once
- property bindings default one way

### 0.2.3 (2023-08-28)
- rework how custom controls are initalized

### 0.2.2 (2023-08-28)
- better support & fixes of custom elements
- enum properties in custom controls
- sample custom controls

### 0.2.1 (2023-08-28)
- null ref fix in bindings

### 0.2.0 (2023-08-28)
- Import/Export of Screens/Images/Controls
- Define your own Controls directly in webui
- Drag/Drop of Icons/Images to Properties
- Drag/Drop of objects to Bindings-Editor Signalname
- Basic functionality of CustomControls

### 0.1.0 (2023-08-27)
-   initial public release

## License
The MIT License (MIT)

Copyright (c) 2023 jogibear9988 <jochen.kuehner@gmx.de>