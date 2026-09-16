---
chapters: {"pages":{"en/adapterref/iobroker.viessmann/README.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/README.md"},"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md":{"title":{"en":"ioBroker.viessmann"},"content":"en/adapterref/iobroker.viessmann/docs/en/viessmann_en.md"}}}
---
![Logo](admin/viessmann.png)
# ioBroker.viessmann
=================

![Number of Installations](http://iobroker.live/badges/viessmann-installed.svg) ![Number of Installations](http://iobroker.live/badges/viessmann-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)
[![Downloads](https://img.shields.io/npm/dm/iobroker.viessmann.svg)](https://www.npmjs.com/package/iobroker.viessmann)

**Github Actions**:
![GitHub Actions](https://github.com/misanorot/ioBroker.viessmann/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)](https://nodei.co/npm/iobroker.viessmann/)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

With this adapter, it is possible to save values from a Viessmann control unit,
which communicates with the program [Vcontrold](https://github.com/openv/vcontrold),
into objects.
It is also possible to set values that you have configured in your Vito.xml.

#### (Same Host)
If Vcontrold runs on the same host as IOBroker,
no further changes to the admin configuration are actually necessary under Linux to read the .xml files.
*(Provided it is located in the standard path: /etc/vcontrold/vito.xml)*

#### (Other Host)
If Vcontrold is installed on another host, you can read the .xml files via SSH access.
Enter the necessary information in the SSH tab for this.
*(A working SSH connection is required.)*

After restarting the instance, it will be read automatically,
you can now set the values in the configuration of the instance.

#### The structure of the vito.xml must be built in the following form:

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

Sorting the commands is possible by clicking on the table header.

## Important!: 	
	- Every time the Vito data is read again, the "old" settings may be deleted.

It is recommended to select as large a polling interval as possible for relatively unimportant query values.
It is also possible to query a value outside of the polling cycle. To do this, the data point *force_polling*
must be written with the desired *get* value.

*the used images are from www.viessmann.com.*

## ToDo
	- Changing the Vito.xml without losing the settings
	- Implementation Unit on/off