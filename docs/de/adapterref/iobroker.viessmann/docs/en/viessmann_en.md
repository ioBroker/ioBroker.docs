---
chapters: {"pages":{"en/adapterref/iobroker.viessmann/README.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/README.md"},"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.viessmann/docs/en/viessmann_en.md
title: ioBroker.viessmann
hash: ya3ykLnVRKe8pkuaZsDZon2Dmgb7/G7QWe9pxKlR6IU=
---
![Logo](../../../../../en/adapterref/iobroker.viessmann/docs/en/admin/viessmann.png)

![Anzahl der Installationen](http://iobroker.live/badges/viessmann-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![GitHub Actions](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

# ioBroker.viessmann

\=================

**GitHub Actions** :

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=ZYHW84XXF5REJ\&source=url)

Mit diesem Adapter können Werte einer Viessmann-Steuereinheit, die mit dem Programm [Vcontrold](https://github.com/openv/vcontrold) kommuniziert, in Objekten gespeichert werden. Außerdem können Werte, die Sie in Ihrer Vito.xml-Datei konfiguriert haben, übernommen werden.

#### (Gleicher Host)

Wenn Vcontrold auf demselben Host wie IOBroker läuft, sind unter Linux keine weiteren Änderungen an der Administratorkonfiguration erforderlich, um die .xml-Dateien zu lesen. _(Vorausgesetzt, sie befinden sich im Standardpfad: /etc/vcontrold/vito.xml)_

#### (Anderer Host)

Wenn Vcontrold auf einem anderen Host installiert ist, können Sie die .xml-Dateien per SSH-Zugriff lesen. Geben Sie dazu die erforderlichen Informationen im SSH-Tab ein. _(Eine funktionierende SSH-Verbindung ist erforderlich.)_

Nach dem Neustart der Instanz werden die Werte automatisch eingelesen. Anschließend können Sie die Werte in der Konfiguration der Instanz festlegen.

#### Die Struktur der Datei vito.xml muss wie folgt aussehen:

````
	```<vito>
		<devices>
			<device ID="2094" name="V200KW1" protocol="KW2"/>
		</devices>
		<commands>
			<command name='getOelverbrauch' protocmd='getaddr' >
				<addr>7574</addr>
				<len>4</len>
				<description></description>
			</command>
			<command name='getTempAbgas' protocmd='getaddr'>
				<addr>0808</addr>
				<len>2</len>
				<unit>UT</unit>
				<error>05 05</error>
				<description>Abgastemeratur in Grad C</description>
			</command>
		</commands>
	</vito>```
````

Die Befehle können durch Anklicken der Tabellenüberschrift sortiert werden.

## Wichtig!:

```
- Every time the Vito data is read again, the "old" settings may be deleted.
```

Für relativ unwichtige Abfragewerte empfiehlt es sich, ein möglichst großes Abfrageintervall zu wählen. Es ist auch möglich, einen Wert außerhalb des Abfragezyklus abzufragen. Dazu muss der Datenpunkt _\`force\_polling\`_ mit dem gewünschten _Wert_ beschrieben werden.

_Die verwendeten Bilder stammen von [www.viessmann.com](http://www.viessmann.com) ._

## Aufgaben

```
- Changing the Vito.xml without losing the settings
- Implementation Unit on/off
```