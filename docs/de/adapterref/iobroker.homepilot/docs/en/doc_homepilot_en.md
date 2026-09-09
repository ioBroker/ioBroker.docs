---
chapters: {"pages":{"en/adapterref/iobroker.homepilot/README.md":{"title":{"en":"ioBroker.homepilot"},"content":"en/adapterref/iobroker.homepilot/README.md"},"en/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md":{"title":{"en":"ioBroker.homepilot"},"content":"en/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md
title: ioBroker.homepilot
hash: P310Rs695JTh7E93Tlw9HR4BIacwTHcKlXGlF6IMK0Y=
---
![Logo](../../../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

# IoBroker.homepilot
## Beschreibung
Dieser Adapter verbindet ioBroker und die Rademacher Homepilot Station 9496 (1/2 mit Firmware-Versionen unter 5.0) über TCP/IP zur Steuerung von Rademacher DuoFern Funkgeräten. DuoFern sendet auf 434,5 MHz. Homepilot synchronisiert sich standardmäßig alle 12 Sekunden mit ioBroker. ioBroker hingegen sendet seine Befehle bedarfsgerecht. Daher sollte dieser Adapter verwendet werden, um Homepilot-Aktoren von ioBroker aus zu steuern, anstatt Homepilot-Sensoren von ioBroker auszulesen.

### Unterstützte Geräte
| Code | Produktname | Hinweis | Datenpunkt | Produktnummer |
|:----:|:---------------------------:|:--------------------------------------:|:------------:|:----------------------:|
| 40 | RolloTron Standard | Gurtwickler / Verschlussriemenaufwickler | Wasserwaage | |
| 41 | RolloTron Comfort | Gurtwickler / Rollladenriemenaufwickler | Wasserwaage | |
| 42 | Rohrmotor-Aktor |                                        |  Ebene | [9471-1](https://www.rademacher.de/fileadmin/rad-daten/pdf/2_VBD_621-1-_09.14_-D_DuoFern_Rohrmotor-Aktor_Druckfreigabe.pdf) |
| 43 | Schaltaktor 2-Kanal |  Universalaktor |  Staat | 9470-2 |
| 46 | Schaltaktor 1-Kanal |  Steckdosenaktor |  Zustand | 9470-1 |
| 47 | Rohrmotor-Steuerung |  Rohrmotorsteuerung |  Ebene |                        |
| 48 | Dimmer |  Dimmaktor |  Ebene |                        |
| 49 | Rohrmotor | | Ebene | |
| 70 | Troll Comfort DuoFern | (mit Dank an homecineplexx) | | |
|  4 | Z-WAVE | Heizkörperstellantrieb |  Temperatur |                        |
| 4B | Connect-Aktor | | | |

Der Aktor Duofern Code 43 unterstützt einen Licht- und einen Gerätemodus. Durch Drücken der Aufwärtstaste wird entweder der Gerätemodus aktiviert (EIN) oder der Lichtmodus deaktiviert (AUS). Durch Drücken der Abwärtstaste wird das Licht in den jeweils anderen Modus umgeschaltet.

#### Noch nicht unterstützt (Danke an [mhop](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/30_DUOFERN.pm))
| Code | Produktname | Hinweis | Datenpunkt | Produktnummer |
|:----:|:---------------------------:|:--------------------------------------:|:------------:|:----------------------:|
| 4C | Trollbasis | | | |
| 4E | SX5 |                                        |              |                        |
| 61 | RolloTron Comfort Master | | | |
| 62 | SuperFake-Gerät | | | |
| 65 | Bewegungsmelder |                                        |              |                        |
| 69 | Umweltsensor |                                        |              |                        |
| 70 | Troll Comfort DuoFern | | | |
| 71 | Troll Comfort DuoFern<br/>(Lichtmodus)|                                        |              |                        |      | (Lichtmodus) |                                        |              |                        |
| 73 | Raumthermostat |                                        |              |                        |
| 74 | Wandtaster 6fach 230V |                                        |              |                        |
| A0 | Handsender<br/>(6 Gruppen-48 Geraete)|                                        |              |                        |      | (6 Gruppen-48 Geräte) |                                        |              |                        |
| A1 | Handsender<br/>(1 Gruppe-48 Geraete) |                                        |              |                        |      | (1 Gruppe-48 Geraete) |                                        |              |                        |
| A2 | Handsender<br/>(6 Gruppen-1 Geraet) |                                        |              |                        |      | (6 Gruppen-1 Geräte) |                                        |              |                        |
| A3 | Handsender<br/>(1 Gruppe-1 Geraet) |                                        |              |                        |      | (1 Gruppe-1 Geraet) |                                        |              |                        |
| A4 | Wandtaster |                                        |              |                        |
| A5 | Sonnensensor | | | |
| A7 | Funksender UP |                                        |              |                        |
| A8 | HomeTimer | | | |
| AA | Markisenwächter |                                        |              |                        |
| AB | Rauchmelder |                                        |              |                        |
| ANZEIGE | Wandtaster 6fach Bat |                                        |              |                        |

## Konfiguration
### IP / Port
IP-Adresse der Homepilot-Station im lokalen Netzwerk. Wird keine Adresse angegeben, verwendet der Adapter __homepilot.local__. Die Portnummer ist optional und wird nur berücksichtigt, wenn zuvor eine IP-Adresse festgelegt wurde.

### Synchronisierung
In snyctime können Sie die Verbindungsfrequenz zur Homepilot-Basisstation in Sekunden einstellen. Standardmäßig sind 12 Sekunden eingestellt, die Eingabe ist optional.

## Datenpunkte
Es gibt zwei Hauptkanäle, einen für den Sender und einen für alle gefundenen Geräte (z. B. Riemenaufwickler für Verschlusszeiten):

homepilot.0.__station__ (Daten zur Homepilot-Station)

homepilot.0.__devices.product__ (Geräte sortiert nach Produkttyp)

Innerhalb von *devices.product* erstellt jedes gefundene Gerät einen neuen Kanal *devicedID*, z. B. homepilot.0.devices.rollotron.__10001__.balcony

homepilot.0.devices.product.*deviceID*.__name__ (string)

homepilot.0.devices.product.*deviceID*.__description__ (string)

homepilot.0.devices.product.*deviceID*.__productName__ (string)

homepilot.0.devices.product.*deviceID*.__duofernCode__ (string)

homepilot.0.devices.product.*deviceID*.__hasErrors__ (number)

homepilot.0.devices.product.*deviceID*.__status_changed__ (number, timecode)

homepilot.0.devices.product.*deviceID*.__cid__ (string, writeable) !!! NUR STRING SCHREIBEN

homepilot.0.devices.product.*deviceID*.__level__ (number)

homepilot.0.devices.product.*deviceID*.__level_inverted__ (number)

homepilot.0.devices.product.*deviceID*.__temperature__ (number, alternativ)

homepilot.0.devices.product.*deviceID*.__state__ (boolean, nur wenn es sich beim Produkt um einen Schalter handelt)

homepilot.0.devices.__json__ (*JSON*-Datei *json*-Datenpunkt gefüllt mit zurückgegebenem JSON)

homepilot.0.station.__ip__ (string)

homepilot.0.station.__UNREACH__ (boolean) (true, wenn die Homepilot-Station nicht erreichbar ist)

Die Datenpunkte *cid*, *level* und in einigen Fällen *state* sind beschreibbar und können Änderungen empfangen, die von anderen Adaptern (z. B. VIS, Javascript, Scenes) gemeldet werden.

### Kontrolle
#### Level und Level_inverted
Die Rollläden lassen sich über JavaScript, VIS-Widgets oder Szenen auf zwei Arten steuern.

Beispielsweise können Sie den Rollladen mit der Geräte-ID 10002 („Wohnzimmer rechts“) steuern, indem Sie homepilot.0.devices.product.*10002*.__level__ auf „30“ setzen.

Dieser Datenpunkt akzeptiert nur ganze Zahlen zwischen 0 und 100. Alternativ können Sie die Homepilot-Befehls-ID verwenden. Geben Sie dazu einfach eine der in der folgenden Tabelle aufgeführten Zeichenketten für homepilot.0.devices.product.*deviceID*.__cid__ an. Wenn Sie eine Darstellung wie bei Homematic bevorzugen (0 % = dunkel/unten, 100 % = hell/oben), wählen Sie den Datenpunkt __level_inverted__.

#### Befehls-ID
Der Datenpunkt *state* kann zur Steuerung von Schaltern verwendet werden. Er wird nur erstellt, wenn der Produktname „Universal-Aktor“/„Steckdosenaktor“ lautet oder die Seriennummer 43 oder 46 ist. Verwenden Sie einfach ein VIS-Widget zur Statussteuerung, um *true*/*false* einzugeben. Dieser boolesche Wert wird in Stufe 100 (true) bzw. Stufe 0 (false) übersetzt.
Sie können diese Befehle verwenden, um Homepilot mit der CID in homepilot.0.devices.product.*deviceID*.__cid__ zu steuern.

| CID | Befehle |
| :--:|:---------------------------------|
| 1 | UP, up, HOCH, hoch, RAUF, rauf |
| 2 | STOP, stop, Stop |
| 3 | RUNTER, runter, RUNTER, runter |
| 4 | POSITION_0, position_0, 0% |
| 5 | POSITION_25, position_25, 25% |
| 6 | POSITION_50, position_50, 50% |
| 7 | POSITION_75, position_75, 75% |
| 8 | POSITION_100, position_100, 100% |
| 9 | *POSITION_N (noch nicht)* |
| 10 | EIN, ein, AN, an, ON, on |
| 11 | AUS, aus, OFF, aus |
| 23 | INCREMENT, increment, + |
| 24 | DEKREMENT, Dekrement, - |

## VIS-Widgets
### Beispiel für Fensterläden
```
[{"tpl":"tplValueFloat","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"is_comma":true,"is_tdp":"false","factor":"1","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0","html_append_singular":" %","html_append_plural":" %","name":"RolloTron Percent","label":"{homepilot.0.devices.RolloTronStandard.10002.name}"},"style":{"left":"519px","top":"555px","color":"lightblue","text-align":"right","z-index":"20"},"widgetSet":"basic"},{"tpl":"tplValueLastchange","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.status_changed","visibility-cond":"==","visibility-val":1,"gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"format_date":"DD.MM.YYYY hh:mm:ss"},"style":{"left":"432px","top":"582px","z-index":"20","color":"lightblue","width":"148px","height":"15px","font-size":"80%","text-align":"right"},"widgetSet":"basic"},{"tpl":"tplMetroTileShutter","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"step":"-1","bg_class":"bg-darkCobalt","brand_bg_class":"bg-mauve","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"min":"100","max":"1","oid-working":"homepilot.0.devices.RolloTronStandard.10002.level","name":"Rollotron Metro","label":"{homepilot.0.devices.RolloTronStandard.10002.name}","sliderColor":"","sliderMarkerColor":"","sliderCompleteColor":"#c19fb9"},"style":{"left":"301px","top":"439px","z-index":"15"},"widgetSet":"metro"}]
```

In der unteren rechten Ecke wird der Pegelstand als Zahl angezeigt. Unter dem transparenten Metro-Widget befindet sich ein Widget namens „lastchange-end“, das jegliche Verschlussbewegungen anzeigt.

![Alternativtext](../../../../../en/adapterref/iobroker.homepilot/docs/en/img/homepilot_vis_widgets.jpg "Screenshot VIS-Widgets")

![Alternativtext](../../../../../en/adapterref/iobroker.homepilot/docs/en/img/homepilot_vis_widgets_settings.jpg "Screenshot der VIS-Widget-Einstellungen")