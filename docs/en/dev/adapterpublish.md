---
title: Publish
lastChanged: 21.01.2020
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterpublish.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: I0FIhrW7GjK+oU9/a+Snt1/LZjxE7xtbGDLoF8Lr2VE=
---
# Publish an adapter
Before you think about publishing an adapter, it should be offered for testing in [Forum testing thread](https://forum.iobroker.net/category/91/tester).
If the tests are successful and the adapter runs stably, it should be included in the latest repository for the time being.

If the adapter runs stably on a specific version number, you are welcome to transfer it to the stable repository. This requires the developer's own assessment in conjunction with user feedback.

***See other current requirements here:*** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

## Requirements for the Latest Repository
0. Use [https://adapter-check.iobroker.in/](https://adapter-check.iobroker.in/) to test adapter repo.

1. The adapter's Github repository should have a capital B in ioBroker, while in the package.json it must be lowercase because ``npm`` doesn't allow uppercase letters.

2. The title in the io-package.json should not contain the word ``ioBroker`` nor the word ``Adapter``.

3. The ``title`` attribute in the io-package.json (common) is the short name of the adapter in English. While ``titleLang`` contain the translations of the ``title`` attribute. (the Lang extension stands for languages)

4. The adapter should include instructions in the form of a README.md file. This should be available at least in English. Other languages are also welcome. This [example](https://github.com/foxriver76/ioBroker.denon) can serve as a suggestion.

5. The adapter requires a license. Both in the io-package.json and a separate [file](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) in the Github repository.

   Sample io-package.json:

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6. The `www` directory and the `widget` directory should be deleted if they are not used.

7. In the io-package.json a `type` attribute should be created under common. For this purpose, the best matching category should be specified from this [list](#adapter categories).

8. In the io-package.json the `connectionType` and `dataSource` attributes should be created under common. For this purpose, the most suitable connection category should be specified from this [list](#adapter connection type).

9. The states created by the adapter should have valid specifications for their `role` under common .

The use of the role `state` should be avoided.

10. The adapter should use both the testing specified in the template. To do this, the Github account can be linked to Appveyor (Windows tests) and Travis CI (Linux and Mac OS tests) and the corresponding repository can be registered for testing.

These two continuous integration tools have proven to be suitable for the ioBroker project and are free for public Github repositories.

The test scope can be extended by the developer.

11. In the io-package.json, at least one entry must be made under common for the `authors` attribute.

The attribute `author` in the package.json must also be filled out.
Optionally, multiple authors can also be stored for npm by using the `contributors` attribute in the package.json.

12. The adapter must be available as an npm package. More information can be found [here](https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm).

13. The ioBroker organization needs to be added on npm. This is necessary to allow long-term maintenance of the package, even if the developer is no longer able to maintain the package due to time or other reasons.

More information can be found in [here](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet).

## Stable repository requirements
1. The adapter has been successfully added to the Latest Repository
2. There is a [Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36) for the adapter in which user feedback has already been given.
3. A discovery function should be implemented. This is a feature in the [Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery),

to automatically detect whether the user can use an instance of the adapter.
To do this, a pull request must be submitted to the [Discovery adapters](https://github.com/ioBroker/ioBroker.discovery) repository.

## Adding the adapter to the official repository
1. The [official Github repository](https://github.com/ioBroker/ioBroker.repositories) should be visited and a pull request made with the following content, depending on the repository.

2. Please arrange the adapter alphabetically correctly between the existing adapters.

3. When included in the stable repository, a version number must be declared. This must be updated when the adapter is developed further.

4. The adapter should set a list attribute `docs` in the io-package.json indicating where to find instructions in the respective language.

The language is specified as the key and the path to the markdown file as the value.
An English manual is mandatory (in an emergency, reference can be made to the standard README). German instructions are also desirable, since the majority of users speak German, but this is optional.
Detailed instructions can save the developer a lot of time in the forum.
An example can be found in [here](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md).

   Example:

```json
{
  "common": {
     "docs": {
         "de": "docs/de/README.md"
     }
  }
}
```

### Latest
The file `sources-dist.json` must be edited:

Example:

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

The `published` date represents the date of the first publication and should not be changed.

### Stable
The file `sources-dist-stable.json` must be edited:

Example:

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "version": "2.0.7",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

The `published` date represents the date of the first publication and should not be changed.

## Management of adapter versions
The current version number of the adapter is specified in both the io-package.json and the package.json.
The two details must match. The version number is separated into three parts by two dots.

```json
"version": "1.7.6"
```

The first part (from left to right) represents the `Major Part`, the second part the `minor` part and the last part the `micro` part.
The version numbers should be incremented according to the following list:

- **micro**: Only bugs fixed
- **minor**: Features have been added, however the version is compatible with previous versions
- **major**: Major changes, which mean that backwards compatibility with the old version is no longer given

The `news` attribute should also be maintained in the io-package.json.
This allows users to install any version listed (assuming it was released to npm) from the admin interface.
The version number and the changes should be stored here.
The changes can be documented for each supported language, whereby these should be specified at least in English.

Example:

```json
"news": {
    "1.7.6": {
        "en": "Configuration dialog was corrected",
        "de": "Konfigurationsdialog wurde korrigiert",
        "ru": "Диалог конфигурации был исправлен",
        "pt": "A caixa de diálogo de configuração foi corrigida",
        "nl": "Configuratiedialoog is gecorrigeerd",
        "fr": "La boîte de dialogue de configuration a été corrigée",
        "it": "La finestra di configurazione è stata corretta",
        "es": "Se corrigió el diálogo de configuración",
        "pl": "Okno dialogowe konfiguracji zostało poprawione"
    },
    "1.7.5": {
        "en": "The roles were tuned",
        "de": "Die Rollen waren abgestimmt",
        "ru": "Роли были настроены",
        "pt": "Os papéis foram afinados",
        "nl": "De rollen zijn afgestemd",
        "fr": "Les rôles ont été réglés",
        "it": "I ruoli erano sintonizzati",
        "es": "Los roles fueron sintonizados",
        "pl": "Role zostały dostrojone"
    }
}
```

## Adapter categories
- `alarm` - security systems
- `climate-control` - air conditioners, air filters, heaters and more
- `communication` - data provision for other adapters, e.g. B. via REST
- `date-and-time` - e.g. B. Calendar
- `energy` - current monitoring, solar systems, inverters and much more.
- `metering` - other measuring systems (e.g. water, gas, oil)
- `garden` - e.g. B. lawn mowers, sprinkler systems
- `general` - General adapters like Admin, Web, Discovery
- `geoposition` - Geolocation of objects or people
- `hardware` - Different multifunction hardware like Arduino, ESP, Bluetooth, ...
- `health` - blood pressure, heart rate, body weight, ...
- `household` - kitchen appliances, vacuum cleaners, etc.
- `infrastructure` - network, NAS, printers, phones
- `iot-systems` - Other smart home systems (hardware & software)
- `lighting` - lighting
- `logic` - rules, scripts, parsers, etc.
- `messaging` - adapter for sending and receiving messages e.g. E.g. via e-mail, telegram, ...
- `misc-data` - export and import of data, currency converter etc.
- `multimedia` - TV, AVR, boxes, voice assistants, etc.
- `network` - ping, network discovery, UPnP, ...
- `protocols` - communication protocols, e.g. B.MQTT
- `storage` - logging, data management e.g. B. relational databases, ...
- `utility` - Supporting adapters such as B. Backup
- `vehicle` - cars
- `visualization` - visualization adapters, like vis etc.
- `visualization-icons` - Icons for visualizations
- `visualization-widgets` - iobroker.vis Widgets
- `weather` - weather information, air quality, environment information

## Adapter connection type
Define `connectionType` in the `common` part of `io-package.json` as:

- `local` - Provides direct communication with the device or hub.
- `cloud` - This device integrates via the cloud and requires an active internet connection

Define `dataSource` in `common` as:

- `poll` - Polling the status means an update may be noticed later.
- `push` - ioBroker will be notified as soon as a new status is available.
- `assumption` - The status of the device cannot be determined. ioBroker takes status based on last ioBroker command.