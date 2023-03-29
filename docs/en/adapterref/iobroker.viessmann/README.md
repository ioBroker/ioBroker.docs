![Logo](admin/viessmann.png)
# ioBroker.viessmann
=================

![Number of Installations](http://iobroker.live/badges/viessmann-installed.svg) ![Number of Installations](http://iobroker.live/badges/viessmann-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)
[![Downloads](https://img.shields.io/npm/dm/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)

**Github Actions**:
<!-- [![Travis-CI](http://img.shields.io/travis/misanorot/ioBroker.viessmann/master.svg)](https://travis-ci.org/misanorot/ioBroker.viessmann) -->
<!-- Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/misanorot/ioBroker.viessmann?branch=master&svg=true)](https://ci.appveyor.com/project/misanorot/ioBroker-viessmann/) -->
![GitHub Actions](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)](https://nodei.co/npm/iobroker.viessmann/)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[English description](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit diesem Adapter ist es möglich, Werte aus einer Viessmann Steuerung
die mit dem Programm [Vcontrold](https://github.com/openv/vcontrold) kommuniziert,
in Objekten zu speichern.
Ebenso ist das Setzen von Werten, die man in seiner Vito.xml konfiguriert hat möglich.

#### (selber Host)
Sollte Vcontrold auf dem gleichen Host wie auch IOBroker laufen,
so ist unter Linux eigentlich keine weitere Veränderung in der Adminkonfiguration nötig um die .xml Dateien einzulesen.
*(Vorausgesetzt, sie liegt in dem Standard Pfad: /etc/vcontrold/vito.xml)*

#### (Anderer Host)
Ist Vcontrold auf einem anderen Host installiert, kann man per SSH Zugang die .xml Dateien einlesen.
Hierfür die nötigen Informationen in dem SSH Tab eingeben.
*(Eine funktionierende SSH Verbindung wird vorausgesetzt.)*

Nach dem Neustart der Instanz, wird diese dann automatisch eingelesen,
man kann nun in der Konfiguration der Instanz die Werte einstellen.



#### Die Struktur der vito.xml muss in der folgenden Form aufgebaugt sein:

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

Eine Sortierung der Befehle, ist durch klicken auf den Tabellenkopf möglich.


## Wichtig!: 	
	- Bei jedem neuen einlesen der Vito Daten, werden ggf. die "alten" Einstellungen gelöscht.


Es ist empfehlenswert, bei relativ unwichtigen Abfragewerten, ein möglichst grosses Abfrageintervall zu wählen.
Es ist ebenso möglich, einen Wert ausserhalb des Abfragezyklus abzufragen. Hierzu muss der Datenpunkt *force_polling*,
mit dem gewünschten *get* Wert beschrieben werden.


*die benutzten Bilder stammen von www.viessmann.com.*

## ToDo
	- Anderung der Vito.xml ohne Verlust der Einstellungen
	- Implementierung Unit on/off

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.3 (2023-03-21)
* (misanorot) fixed reload xml issues

### 1.4.2 (2022-12-26)
* (misanorot) update files 
* (misanorot) translate states 


#### 1.3.6 (12.04.2022)
* (misanorot) fixed ssh errors

### License

The MIT License (MIT)

Copyright (c) 2017-2023 misanorot <audi16v@gmx.de>