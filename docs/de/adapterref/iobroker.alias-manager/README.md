---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alias-manager/README.md
title: ioBroker.alias-manager
hash: aUc414CIMut6wnYAOryCvRI4FFgqYw9itq8ND7gTWEk=
---
![Logo](../../../en/adapterref/iobroker.alias-manager/admin/alias-manager.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.alias-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alias-manager.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/alias-manager-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/alias-manager-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/sbormann/iobroker.alias-manager.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/sbormann/ioBroker.alias-manager/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alias-manager.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/sbormann/ioBroker.alias-manager/master.svg)

# IoBroker.alias-manager
## Alias-Manager-Adapter für ioBroker
Verwaltet und erstellt Aliase.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @sbormann (https://github.com/sbormann) nicht möglich gewesen, der frühere Versionen dieses Adapters entwickelt hat.

## So melden Sie Probleme und Funktionsanfragen
Verwenden Sie hierfür idealerweise GitHub-Probleme. Die beste Methode erreichen Sie, indem Sie den Adapter in den Debug-Protokollmodus versetzen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über Admin, da dies Zeilen abschneiden würde.

## Kurze Einführung
### Aliase verwalten
![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_1.png)

* (1) Klicken Sie auf „ALIASE VERWALTEN“
* (2) Um einen neuen Alias anzulegen, klicken Sie auf 'NEUER ALIAS' oder
* (3) Wählen Sie einen vorhandenen Alias zum Bearbeiten aus

![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_2b.png)

* (1) Sie finden dann einen Bereich mit allgemeinen Einstellungen dieses Alias, wie dem Namen oder der gemeinsamen Rolle
* (2) Nachfolgend finden Sie eine Liste mit allen Datenpunkten des Alias
* (3) Sie können dieser Liste Alias-Datenpunkte hinzufügen, indem Sie entweder einen leeren hinzufügen oder einen vorhandenen iobroker-Datenpunkt auswählen und dessen Einstellungen in einen neuen Alias-Datenpunkt kopieren.
* (4) Datenpunkte können Sie löschen, indem Sie auf das Mülleimer-Symbol klicken.
* Jeder Datenpunkt verfügt über mehrere Felder zur Konfiguration:
* Im grauen Bereich können Sie den Namen festlegen oder den Datenpunkt löschen
* Im blauen Bereich können Sie die Rolle, den Typ und - optional - die Einheit konfigurieren
* Im grünen Bereich können Sie optional Min. und Max. festlegen und bestimmen, ob der Datenpunkt schreibgeschützt sein soll (common.write ist deaktiviert) und ob auf seinen Wert zugegriffen werden kann (common.read ist aktiviert – dies ist in den meisten Fällen die richtige Einstellung).
* Im roten Bereich können Sie:
* (5) Konfigurieren Sie den ursprünglichen ioBroker-Datenpunkt, mit dem dieser Alias-Datenpunkt verknüpft ist. Beide (der ursprüngliche Datenpunkt und der Alias-Datenpunkt) werden synchron gehalten.
* (6) Weiterhin können Sie Konvertierungsfunktionen für Lesen und Schreiben konfigurieren.
* Beispiel: Wenn Sie als „Lesefunktion“ „val / 10“ festlegen, beträgt der Wert des AIAS-Datenpunkts immer 10 Prozent des ursprünglichen Datenpunkts.
* In den meisten Fällen möchte man dann als „Schreibfunktion“ „val * 10“ konfigurieren, um dieses Verhältnis auch beim Schreiben auf den Alias-Datenpunkt beizubehalten.
* Weitere Informationen hierzu finden Sie in der ioBroker-Dokumentation zu Aliasen unter https://www.iobroker.net/#en/documentation/dev/aliases.md

![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_3.png)

* (1) Wenn Sie auf 'ALIAS KOPIEREN' klicken, um
* (2) Über „ALIAS UMBENENNEN“ können Sie den Alias umbenennen, es öffnet sich folgendes Dialogfeld:

![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_4.png) \ Hier können Sie:

* (1) Legen Sie eine neue ID fest und
* (2) Legen Sie einen neuen gemeinsamen Namen für den Alias fest
* (3) Durch Klicken auf „ERSATZ HINZUFÜGEN“ können Sie Zeilen zur folgenden Liste hinzufügen. Dort können Sie:
* (4) Geben Sie eine Zeichenfolge ein, die gesucht und durch (5) diese Zeichenfolge ersetzt wird.
* Mit dieser Funktion können Sie schnell die ursprünglichen ioBroker-Datenpunkte ändern, mit denen Ihre Alias-Datenpunkte verknüpft sind
	* Beispiel:
* Sie haben einen Lüfter mit mehreren Datenpunkten wie „SET“, „ERROR“ und „UNREACH“
* Diese Alias-Datenpunkte sind mit Original-Datenpunkten wie „hm-rpc.0.JEQ0698034.1.STATE“, „hm-rpc.0.JEQ0698034.0.ERROR“ und „hm-rpc.0.JEQ0698034.0.UNREACH“ verknüpft.
* Wenn Ihr Gerät nun defekt ist und durch ein neues ersetzt werden muss, ändert sich seine Seriennummer beispielsweise auf ASDF1234
* Um alle Links in allen Ihren Alias-Datenpunkten auf einmal zu aktualisieren, können Sie nach „hm-rpc.0.JEQ0698034“ suchen und es durch „hm-rpc.0.ASDF1234“ ersetzen.
* Dies ist auch nützlich, wenn Sie neue Aliase erstellen, die einem alten ähneln. Kopieren Sie einfach den Alias, legen Sie eine neue ID und einen neuen Namen fest und verwenden Sie die Ersetzungsfunktion, um die verknüpften Datenpunkte anzupassen.

![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_5.png)

* Nachdem Sie die Einstellungen geändert haben, können Sie:
* (1) Speichern Sie alle geänderten Alias-Datenpunkte auf einmal, indem Sie auf 'ALLE ÄNDERUNGEN SPEICHERN' klicken oder
* (2) Speichern Sie nur einen Datenpunkt, indem Sie auf „ÄNDERUNGEN SPEICHERN“ klicken.
* (3) Abschließend können Sie den gesamten Alias löschen, indem Sie auf ‚ALIAS LÖSCHEN‘ klicken.

### Alias automatisch erstellen
![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_6b.png)

* (1) Klicken Sie auf 'ALIASE AUTOCREATE'

![Screenshot](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_7b.png)

* (1) Wählen Sie zunächst eine ID eines Gerätes aus dem ioBroker Objektbaum
* (2) Klicken Sie dann auf „VERSUCHEN, EINEN ALIAS VON DIESEM GERÄT ZU ERSTELLEN“.
* (3) Anschließend finden Sie die festgelegten Einstellungen für Alias und
* (4) Eine Liste aller Datenpunkte des ausgewählten Gerätes
* Alle automatisch erkannten Datenpunkte werden geprüft (nur geprüfte Zeilen werden gespeichert)
* Bei automatischer Erkennung wird dem Datenpunkt eine „Ziel-ID“ zugewiesen. Dies ist der entsprechende Datenpunkt des Alias (der ursprüngliche Datenpunkt wird mit diesem neuen Alias-Datenpunkt verknüpft). Die Autocreate-Funktion versucht, je nach erkanntem Gerätetyp standardisierte Datenpunkt-IDs zuzuordnen. Sie können die Einstellungen jedoch beliebig ändern, jede „Ziel-ID“ muss jedoch eindeutig sein.
* Und schließlich können Sie einen Namen für den Ziel-Alias-Datenpunkt eingeben
* Alle NICHT automatisch erkannten Datenpunkte erscheinen in der Liste ohne Häkchen. Sie können die Einstellungen manuell anpassen und das Kontrollkästchen aktivieren.
* (5) Sie können dieser Liste auch manuell weitere Datenpunkte hinzufügen oder die gesamte Liste löschen
* (6) Anschließend können Sie den neuen Alias mit allen markierten(!) Datenpunkten speichern (nicht markierte Datenpunkte werden verworfen)
* Anschließend wirst du automatisch auf die Registerkarte „ALIASE VERWALTEN“ weitergeleitet und der neue Alias wird geöffnet, um seine Einstellungen nach Bedarf anzupassen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-10-20)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 1.2.6 (2022-03-02)
* (sbormann) Updated dependencies.
* (sbormann) Fixed saving of common.custom.

### 1.2.5 (2022-03-02)
* (sbormann) Added All and None Buttons to select Datapoint while autocreating alias.
* (sbormann) Some GUI-Enhancements and fixes for dark mode.

### 1.2.4 (2021-08-25)
* (sbormann) Fixed autocreate not working after renaming destination id.

### 1.2.3 (2021-06-05)
* (sbormann) Fixed autocreate not working after deleting or renaming alias.

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Sebastian Bormann <sebastian@bormann.net>

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