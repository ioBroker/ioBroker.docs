---
chapters: {"pages":{"en/adapterref/iobroker.upnp/README.md":{"title":{"en":"ioBroker.upnp"},"content":"en/adapterref/iobroker.upnp/README.md"},"en/adapterref/iobroker.upnp/doc/en/DOCUMENTATION.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.upnp/doc/en/DOCUMENTATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.upnp/doc/en/DOCUMENTATION.md
title: kein Titel
hash: t/+vd1GkgTHz56xDO7Y7xEBB/5HAVBFB3U/WnR/uLKc=
---
1. [Was ist UPnP?](#what-is-upnp)
2. [Funktionsbeschreibung](#functional-description)
3. [Objektstruktur](#object-structure)
4. [Allgemeine Objekte](#general-objects)
5. [UPnP-Objekte](#object-structure)
6. [Kontrolle](#control)
7. [Geräte-/dienstspezifische Merkmale](#devicesservice-specific-features)

### Verwendungszweck

Dient der Kommunikation und Interaktion mit allen UPnP-fähigen Geräten.

#### Was ist UPnP?

UPnP steht für Universal Plug and Play. Es handelt sich um den Versuch, die Kommunikation zwischen Geräten im Netzwerk zu standardisieren. Hierfür gibt es sogenannte „Schemas“, die als XML-Datei vorliegen. Sie enthalten alle Informationen über das Gerät oder die Software sowie die von ihnen bereitgestellten Dienste. Um die Nutzung dieser Dienste zu gewährleisten, wird für jeden Dienst eine Beschreibung bereitgestellt. Diese Beschreibung folgt dem für den Dienst definierten Schema und ermöglicht so den schnellen Austausch von Informationen und Befehlen, ohne dass Modell oder Hersteller des Geräts oder der Software bekannt sein müssen. In der Vergangenheit wurde diese Standardisierung hauptsächlich für Mediengeräte und Software verwendet. Seit einiger Zeit gibt es Bestrebungen, die Kommunikation des „IoT – Internet der Dinge“ mithilfe dieser Standardisierung zu standardisieren. Zu diesem Zweck wurde 2016 die „Open Connectivity Foundation“ gegründet, die die Aufgaben des UPnP-Forums übernimmt. Dieses hat die Zertifizierung UPnP-fähiger Geräte durchgeführt und Standards entwickelt.

#### Funktionsbeschreibung

Der Adapter sendet und wertet die Antworten beim ersten Start aus. Die Antworten enthalten den Link zu den XML-Dateien der Dienste. Mithilfe dieser XML-Dateien werden die Objekte in ioBroker erstellt und mit allen verfügbaren Informationen befüllt.

Ein zeitverzögerter Dienst wird gestartet, der auf Meldungen von Geräten/Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte/Dienste werden automatisch zu den bestehenden hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, sodass ioBroker automatisch über alle Änderungen (gesendete Meldungen) am Gerät/Dienst informiert wird.

#### Objektstruktur

Jedes Gerät oder jede Software, die auf die Übertragung reagiert, wird als separates Objekt erstellt. Unterhalb dieses Objekts finden Sie alle verfügbaren Dienste mit ihren Funktionen. Die Möglichkeiten sind in drei Kategorien (Rolle/Funktion) unterteilt: Indikator, Status, Aktion und Argument.

**Der Status (state)** ist eine Variable, die den aktuellen Zustand eines Objekts/Datenpunkts im Gerät/Dienst repräsentiert. Jeder Statuswert (indicator.state) hat einen bestimmten Typ, z. B. Zahl, Zeichenkette, boolescher Wert usw. Zusätzlich wird der genaue Wert oder Wertebereich des Statuswerts festgelegt. Diese Details werden im „nativen“ Attribut eines Objekts gespeichert. Zuvor implementierte native Attribute:

- sendEvents = Bedeutung bisher unbekannt.
- allowedValues = Zeichenketten, die akzeptiert werden.
- Minimum = Gibt den niedrigsten Wert an, bei dem der Wert akzeptiert wird.
- Maximum = Gibt den höchsten Wert an, bei dem die Annahme erfolgt.
- Schritt = Gibt an, in welchen Schritten ein Wert geändert werden kann.

**Der Button** „reuqest“ ist ein Befehl, der an das Gerät/den Dienst gesendet und von diesem akzeptiert werden kann. Dieses Objekt besitzt üblicherweise ein Unterobjekt, das Argument.

**Argument –** ist ein Unterobjekt einer Aktion. Der Typ ist „gemischt“, da er nicht spezifiziert ist. Die nativen Daten des Objekts enthalten unterschiedliche Informationen und können sich von Argument zu Argument unterscheiden. Bisher bekannte native Daten:

- Richtung = Gibt die Richtung des Informationsflusses an. "In" bedeutet, dass kein Wert zurückgegeben wird. "Out" bedeutet, dass ein Wert zurückgegeben wird.
- relatedStateVariable = Gibt den Indikatorzustand zurück, für den der Datenaustausch zuständig ist.
- argumentNumber = Gibt die Anzahl der Argumente der jeweiligen Aktion zurück.

### Allgemeine Objekte

Die folgenden Objekte werden für jedes Gerät/jeden Dienst gefunden und sind für die Administration erforderlich. Sie sind weder Bestandteil des UPnP-Standards noch der Geräte-/Bedienungsanleitung des jeweiligen Geräts.

**Der Status „Alive** “ wird vom Gerät/Dienst auf „true“ gesetzt und vom Adapter nach x Sekunden auf „null“ zurückgesetzt, falls er nicht erneut vom Gerät/Dienst auf „true“ gesetzt wird. Die Gültigkeitsdauer hängt von der maximalen Lebensdauer des vom Gerät gesendeten „Alive“-Signals ab. Beim Abmelden eines Geräts wird der Status auf „false“ gesetzt. Es ist möglich, diesen Status manuell oder per Skript auf „true“ zu setzen. Dies sollte jedoch nur erfolgen, wenn sichergestellt ist, dass das Gerät/der Dienst erreichbar ist. Wurde „Alive“ manuell auf „true“ gesetzt, sollte der Status auch manuell auf „false“ zurückgesetzt werden, falls er nicht mehr benötigt wird, um Fehler zu vermeiden.

**SID –** Dient zur Identifizierung des Abonnements. Diese Seite wird vom Host jedes Mal neu erstellt, wenn ein Client ein Abonnement anfordert. Die SID wird nach einer vom Host festgelegten Zeit neu berechnet und daher fortlaufend aktualisiert. Sie ist nur für einen bestimmten Dienst gültig.

### UPnP-Objekte

Die hier aufgeführten Objekte finden sich im UPnP-Standard und/oder in den Geräte-/Gerätebeschreibungen. Es handelt sich nicht um eine vollständige Liste aller Objekte; die Auswahl umfasst lediglich häufig vorkommende Objekte.

**(A\_ARG\_TYPE\_)InstanceID –** Die Instanz-ID ist die gebräuchlichste und erforderliche ID, da sie die zu adressierende Instanz eines Dienstes angibt. In den meisten Fällen ist die Instanz-ID gleich 0. Diese ID wird mit jeder Ereignisnachricht eines Dienstes und jedem an einen Dienst gesendeten Befehl übermittelt.

**(A\_ARG\_TYPE\_)Kanal (\*) –** Das Kanalobjekt ist Audio-/Videodiensten zugeordnet. Beispielsweise muss ein Kanal angegeben werden, wenn Sie die Lautstärke ändern möchten. Mögliche Werte sind beispielsweise „Master", „LF“ oder „RF“. In diesem Beispiel steht „Master“ für die allgemeine Lautstärke, „LF“ für den linken vorderen Lautsprecher und „RF“ für den rechten vorderen Lautsprecher. Wenn Sie die Lautstärke nur am rechten vorderen Lautsprecher ändern möchten, müssen Sie im Feld „Kanal“ „RF“ angeben.

**(Einstellen/Abrufen) Lautstärke (\*) –** Das Lautstärke-Objekt ist mit Audio-/Videodiensten verknüpft. Je nach Verwendung dient es zur Anzeige oder Anpassung der Lautstärke. Dieses Objekt verfügt stets über einen minimalen und einen maximalen Wert, der festgelegt werden kann. In den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittweite beträgt üblicherweise 1, d. h. es können nur gerade Zahlen eingegeben werden.

### Kontrolle

**Die Schaltfläche** „Anfordern“ ist ein Befehl, der an das Gerät/den Dienst gesendet werden kann. Jede Aktion enthält obligatorische Argumente. Aktionen sind an ihrer Rolle/Rolle erkennbar, die „Aktion“ lautet. Wird die Aktion mit „Senden“ beschrieben, wird der Befehl an das Gerät/den Dienst gesendet.

**state.argument.x –** Erforderlich für eine Aktion, wenn die Rolle "state.argument.in" ist. Mögliche Werte, die angegeben werden können/müssen, finden Sie in der "Zugehörigen Zustandsvariable". Der Name dieser "Zugehörigen Zustandsvariable" ist im Objekt unter "native" -> "relatedStateVariable" gespeichert. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, die unter "native" -> Argument\_No. festgelegt ist. Ein Argument ist an seiner Rolle/Rolle erkennbar, wo "argument" steht. Einige Zeichenketten müssen mit einem """" im Datenpunkt geschrieben werden. Diese Frage lässt sich nicht pauschal beantworten, aber bei komplexen Zeichenketten wie URLs kann dies der Fall sein. Es hilft nur, es auszuprobieren. Wenn Sie ein " in einem Argument übergeben möchten, müssen Sie """ verwenden.

**(Zugehörige Zustands-)Variable –** Dies sind Variablen, die für den Datenaustausch verwendet werden. Die nativen Daten der Variablen enthalten einige Informationen:

- allowedValues = gibt Auskunft über den möglichen Inhalt der Variablen oder darüber, was als Argument mit einer Aktion gesendet werden kann.
- Minimum = der niedrigste Wert, den die Variable enthalten oder als Argument mit einer Aktion übergeben werden kann.
- Maximum = der höchste Wert, den die Variable enthalten kann oder der als Argument mit einer Aktion übergeben werden kann.
- Schritt = gibt an, in welchen Schritten ein Wert festgelegt wird.
- sendEvents = ? Mögliche Werte sind „yes“ oder „no“. Es ist jedoch völlig unklar, was das bedeutet. Die Annahme, dass die Werte dieser Variable nur dann automatisch von einem Gerät/Dienst gesendet werden, wenn bei sendEvents „yes“ gesetzt ist, wurde nicht bestätigt.

Beispiel für die Abfrage der Werte:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Die Abfrage kann im Adminbereich über die Objektkonfiguration aktiviert werden.

### Geräte-/dienstspezifische Merkmale

**Sonos:** Es ist nicht möglich, ein Abonnement für QPlay zu erstellen. Hierfür ist möglicherweise eine Authentifizierung erforderlich.

**Philips Hue Bridge 2:** Die Implementierung des UPnP-Standards in der Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 zwar gefunden, aber nicht über UPnP erreichbar ist.

**Yamaha:** Nutzt eine API, die auf dem UPnP-Standard basiert, jedoch ein eigenes Datenformat verwendet. Dies wird derzeit vom UPnP-Adapter nicht unterstützt.

**Sony:** Nutzt eine ScalarWebApi-Schnittstelle namens UPnP-adressierbar, verwendet aber ein eigenes Datenformat. Dies wird derzeit vom UPnP-Adapter nicht unterstützt.

**Amazon Kindle:** Bietet einen UPnP-Dienst an, jedoch ohne Beschreibung des UPnP-Dienstes, sodass dieser nicht genutzt werden kann.