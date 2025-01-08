---
title: Publish
lastChanged: 21.01.2020
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterpublish.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: G9Qg1a+J3PRWRwDWflz0rxRNU5K80XmOyeE6fJZlKLI=
---
# Publishing an adapter
Before you think about publishing an adapter, you should offer it for testing in [Forum Test Thread](https://forum.iobroker.net/category/91/tester).
If the tests are successful and the adapter runs stably, it should be included in the Latest repository for the time being.

If the adapter runs stably on a certain version number, it can be transferred to the stable repository. This requires the developer's own assessment in conjunction with user feedback.

***For more current requirements, see here:*** https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md

## Requirements for the Latest Repository
0. Use [https://adapter-check.iobroker.in/](https://adapter-check.iobroker.in/) to test adapter repo.

1. The adapter's GitHub repository should have a capital B in ioBroker, while in the package.json it must be lowercase because ``npm`` does not allow uppercase letters.

2. The title in the io-package.json should not contain the word ``ioBroker`` and not the word ``Adapter``.

3. The ``title`` attribute in the io-package.json (common) is the short name of the adapter in English. While ``titleLang`` contains the translations of the ``title`` attribute. (The extension Lang stands for languages)

4. The adapter should contain instructions in the form of a README.md file. This should be available in at least English. Other languages are also welcome. This [example](https://github.com/foxriver76/ioBroker.denon) can serve as a suggestion.

5. The adapter requires a license. Both in the io-package.json and a separate [file](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) in the Github repository.

Example for io-package.json:

```json
{
  "common": {
      "license": "MIT"
  }
}
```

6. The `www` directory and the `widget` directory should be deleted if not used.

7. In the io-package.json a `type` attribute should be created under common. For this purpose the best matching category should be specified from this [list](#Adapter categories).

8. In the io-package.json the `connectionType` and `dataSource` attributes should be created under common. To do this, the best matching connection category should be specified from this [list](#Adapter connection type).

9. The states created by the adapter should have valid information for their [roles](https://github.com/ioBroker/ioBroker/blob/master/doc/STATE_ROLES.md#state-roles) `role` under common.

The use of the role `state` should be avoided.

10. The adapter should use both the testing specified in the template. To do this, the Github account can be linked to Appveyor (Windows tests) and Travis CI (Linux and Mac OS tests) and the corresponding repository can be registered for testing.

These two continuous integration tools have proven to be suitable for the ioBroker project and are free for public Github repositories.

The scope of testing can be expanded by the developer.

11. In the io-package.json at least one entry must be made under common for the attribute `authors`.

The attribute `author` must also be filled in in the package.json.
Optionally, multiple authors can also be stored for npm by using the attribute `contributors` in the package.json.

12. The adapter must be available as an npm package. More information can be found [here](https://github.com/ioBroker/ioBroker.repositories#how-to-publish-on-npm).

13. The ioBroker organization must be added to npm. This is necessary to enable long-term maintenance of the package, even if the developer is no longer able to maintain the package due to time constraints or other reasons.

Further information can be found in [here](https://github.com/ioBroker/ioBroker.repositories#add-owner-to-packet).

## Requirements for the stable repository
1. The adapter was successfully added to the Latest Repository
2. There is a [Forum Test Thread](https://forum.iobroker.net/viewforum.php?f=36) for the adapter, in which user feedback has already been given.
3. A discovery function should be implemented. This is a function in the [Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery),

to automatically detect whether the user can use an instance of the adapter.
To do this, a pull request must be made to the [Discovery Adapters](https://github.com/ioBroker/ioBroker.discovery) repository.

## Adding the adapter to the official repository
1. Visit the [official Github repository](https://github.com/ioBroker/ioBroker.repositories) and submit a pull request with the following content, depending on the repository.

2. Please arrange the adapter alphabetically correctly between the existing adapters.

3. When adding the adapter to the stable repository, a version number must be declared. This must be updated as the adapter is further developed.

4. The adapter should set a list attribute `docs` in the io-package.json, specifying where to find instructions in the respective language.

The language is specified as the key and the path to the Markdown file as the value.
English instructions are mandatory (in an emergency, reference can be made to the standard README). German instructions are also desirable, as the majority of users speak German, but this is optional.
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

The `published` date represents the date of first publication and should not be changed.

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

The `published` date represents the date of first publication and should not be changed.

## Managing adapter versions
The current version number of the adapter is specified in both the io-package.json and the package.json.
The two pieces of information must match. The version number is separated into three parts by two dots.

```json
"version": "1.7.6"
```

Where the first part (from left to right) represents the `Major Part`, the second part the `minor` part and the last part the `micro` part.
The version numbers should be incremented according to the following list:

- **micro**: Only bugs were fixed
- **minor**: Features have been added, but the version is compatible with previous versions
- **major**: Major changes that mean that backwards compatibility with old versions is no longer possible

The `news` attribute should also be maintained in the io-package.json.
This allows users to install any listed version (assuming it has been published on npm) via the admin interface.
The version number and the changes should be stored here.
The changes can be documented for each supported language, but they should be specified at least in English.

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
- `communication` - data provision for other adapters, e.g. via REST
- `date-and-time` - e.g. B. Calendar
- `energy` - power monitoring, solar systems, inverters and much more.
- `metering` - Other measuring systems (e.g. water, gas, oil)
- `garden` - e.g. lawn mowers, sprinkler systems
- `general` - General adapters such as Admin, Web, Discovery
- `geoposition` - Geolocation of objects or people
- `hardware` - Various multifunctional hardware such as Arduino, ESP, Bluetooth, ...
- `health` - blood pressure, heart rate, body weight, ...
- `household` - kitchen appliances, vacuum cleaners, etc.
- `infrastructure` - network, NAS, printers, telephones
- `iot-systems` - Other Smart Home Systems (Hardware & Software)
- `lighting` - lighting
- `logic` - rules, scripts, parsers, etc.
- `messaging` - Adapter for sending and receiving messages e.g. via email, Telegram, ...
- `misc-data` - Export and import of data, currency converter, etc.
- `multimedia` - TV, AVR, speakers, voice assistants, etc.
- `network` - ping, network discovery, UPnP, ...
- `protocols` - communication protocols, e.g. MQTT
- `storage` - logging, data storage e.g. relational databases, ...
- `utility` - Supporting adapters such as backup
- `vehicle` - cars
- `visualization` - visualization adapters, like vis etc.
- `visualization-icons` - Icons for visualizations
- `visualization-widgets` - iobroker.vis Widgets
- `weather` - weather information, air quality, environmental information

## Adapter connection type
Define `connectionType` in `common` part of `io-package.json` as:

- `local` - Provides direct communication with the device or hub.
- `cloud` - The integration of this device is done via the cloud and requires an active internet connection

Define `dataSource` in `common` as:

- `poll` - Polling the status means that an update may be noticed later.
- `push` - ioBroker will be notified as soon as a new status is available.
- `assumption` - The status of the device cannot be determined. ioBroker assumes the status based on the last ioBroker command.