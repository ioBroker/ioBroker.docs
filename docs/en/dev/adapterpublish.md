---
title: Publish
lastChanged: 08.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterpublish.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: 2bsmkDQnkVbfXqhNconzCPzkmMsVapBMgiNeEBQlD2A=
---
# Publishing an adapter

Before considering releasing an adapter, it should be offered for testing in the [forum test thread](https://forum.iobroker.net/category/91/tester) . If the tests are successful and the adapter runs stably, it should be added to the latest repository for the time being.

If the adapter runs stably at a specific version number, it can be moved to the stable repository. This requires the developer's own assessment in conjunction with user feedback.

_**Further current requirements can be found here:**_ <https://github.com/ioBroker/ioBroker.repositories/blob/master/README.md>

## Requirements for the Latest Repository

0. Use <https://adapter-check.iobroker.in/> to test the adapter repo.

1. The adapter's GitHub repository should have a capital B in ioBroker, while it must be lowercase in the package.json file, because`npm` does not allow capital letters.

2. The title in the io-package.json should not be the word`ioBroker` and not the word`Adapter` contain.

3. The`title` The attribute in the io-package.json (common) is the short name of the adapter in English. During`titleLang` the translations of the`title` Attributes are included. (The extension "Lang" stands for languages.)

4. The adapter should include instructions in the form of a README.md file. These should be available in English at a minimum. Additional languages are welcome. This [example](https://github.com/foxriver76/ioBroker.denon) can serve as inspiration.

5. The adapter requires a license. This is specified both in the io-package.json file and in a separate [file](https://github.com/foxriver76/ioBroker.denon/blob/master/LICENSE) in the GitHub repository.

   Example for io-package.json:

   ```json
   {
     "common": {
         "license": "MIT"
     }
   }
   ```

6. The`www` directory as well as the`widget` Directories should be deleted when not in use.

7. The io-package.json file should contain a`type` An attribute will be created under "common". The most suitable category should be selected from this [list](#adapterkategorien) .

8. The following should be in the io-package.json file:`connectionType` and`dataSource` Attributes are created under "common". The most suitable connection category should be selected from this [list](#adapter-verbindungstyp) .

9. The states created by the adapter should contain valid information for their [roles](/docs/dev/stateroles.md) .`role` under common. Using the role`state` should be avoided.

10. The adapter must run the tests from the framework via **GitHub Actions** , at least package and integration tests (i.e., installation and startup). The workflows for this are already included in the [Adapter Creator](https://adapter-creator.iobroker.in/) and are located in the folder.`.github/workflows` Further information can be found under [Adapter Tests](/docs/dev/adaptertesting.md) .

The developer is welcome to expand the scope of the test.

11. The io-package.json file must contain at least one entry under common for the attribute.`authors` to be done. The attribute must also be...`author` must be filled in the package.json file. Optionally, multiple authors can be specified for npm by adding the attribute to the package.json file.`contributors` is used.

12. The adapter must be published as a package on [npmjs.com](https://www.npmjs.com/) . The next section explains how to do this.

13. The **ioBroker organization must be a co-owner of the npm package** :

    ```bash
    npm owner add bluefox iobroker.<adaptername>
    ```

    This isn't just a formality. It ensures that the package can continue to be maintained even if the developer no longer has time for it. Without this entry, the adapter won't be included.

## Requirements for the Stable Repository

1. The adapter has been successfully added to the Latest Repository.
2. There is a [forum test thread](https://forum.iobroker.net/category/91/tester) for the adapter, in which user feedback has already been given.
3. A discovery function should be implemented. This is a function within the [Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery) to automatically detect whether a user can use an instance of the adapter. A pull request for this should be submitted to the [Discovery Adapter](https://github.com/ioBroker/ioBroker.discovery) repository.

## Publish on npm

Before an adapter can be added to the ioBroker repository, it must be available on npm. The administrator retrieves it from there during installation, not from GitHub.

The Adapter Creator framework includes the **release script** for this purpose:

```bash
npm run release patch     # Fehlerbehebungen
npm run release minor     # neue Funktionen, abwärtskompatibel
npm run release major     # Änderungen, die Bestehendes brechen
```

The command accomplishes in one step what otherwise often happens separately: it increases the version in **both** files,`package.json` and`io-package.json` , carries the changes from the changelog into`common.news` It checks the license, sets a Git tag, and pushes everything to GitHub.

The workflow in`.github/workflows` It then publishes to npm as soon as a day arrives. It can also be done manually:

```bash
npm publish
```

Publishing from GitHub Actions no longer requires an npm token in the repository. npm now supports **Trusted Publishing** : The package is linked to the GitHub repository on npm, and the workflow authenticates via OpenID Connect. This eliminates the need for a persistent secret in the repository settings.

Once published, the version is final. A version on npm cannot be overwritten, and a`npm unpublish` This is only possible within the first 72 hours and still renders the version number unusable. It's better to have one extra version than a broken one in circulation.

## Adding the adapter to the official repository

The lists are located in the [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories) repository. The files are **not** edited manually; instead, scripts are used to place the entry in the correct location and check it immediately.

1. _Fork_ the repository and clone it locally.

2. Generate the entry:

   ```bash
   npm run addToLatest -- --name <adaptername> --type <kategorie>
   npm run addToStable -- --name <adaptername> --version <version>
   ```

   The category is one from the [list below](#adapterkategorien) , the version in _stable_ is the version number that should run stably.

3. Check in the modified file and submit a pull request.

4. When adding a project to the stable repository, a version number must be declared. This number must be updated as the adapter is further developed.

5. The adapter should have a list attribute in the io-package.json file.`docs` Specify where to find instructions in the respective language. The language is specified as the key, and the path to the Markdown file as the value. English instructions are mandatory (in case of emergency, the standard README can be referenced). German instructions are also desirable, as a large proportion of users speak German, but this is optional. Comprehensive instructions can save the developer a lot of time in the forum. An example can be found [here](https://github.com/foxriver76/ioBroker.denon/blob/master/docs/de/README.md) .

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

The file`sources-dist.json` needs to be edited:

Example:

```json
  "admin": {
    "meta": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/io-package.json",
    "icon": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/admin/admin.png",
    "published": "2017-04-10T17:10:21.690Z",
    "type": "general"
  }
```

The`published` The date represents the date of first publication and should no longer be changed.

### Stable

The file`sources-dist-stable.json` needs to be edited:

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

The`published` The date represents the date of first publication and should no longer be changed.

## Managing adapter versions

The current version number of the adapter is specified in both the io-package.json and package.json files. These two entries must match. The version number is separated into three parts by two dots.

```json
"version": "1.7.6"
```

Where the first part (from left to right)`Major Part` represents, the second part the`minor` Part and the last one`micro` Part. The version numbers should be incremented according to the following list:

- **micro** : Only bugs were fixed.
- **minor** : Features have been added, but the version is compatible with previous versions.
- **Major** : Major changes that result in the loss of backward compatibility with older versions.

The following should also be included in the io-package.json file:`news` This attribute must be maintained. This allows users to install any listed version (provided it has been published on npm) via the admin interface. The version number and changes should be recorded. The changes can be documented for each supported language, but should be specified in English at a minimum.

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

- `alarm` - Security systems
- `climate-control` - Air conditioners, air filters, heaters and more
- `communication` - Data provision for other adapters, e.g. via REST
- `date-and-time` - e.g. calendars
- `energy` - Power monitoring, solar systems, inverters and much more.
- `metering` - Other measuring systems (e.g. water, gas, oil)
- `garden` - e.g. lawnmowers, sprinkler systems
- `general` - General adapters such as Admin, Web, Discovery
- `geoposition` - Geolocation of objects or people
- `hardware` - Various multifunctional hardware such as Arduino, ESP, Bluetooth, ...
- `health` - Blood pressure, heart rate, body weight, ...
- `household` - Kitchen appliances, vacuum cleaners, etc.
- `infrastructure` - Network, NAS, printers, telephones
- `iot-systems` - Other smart home systems (hardware & software)
- `lighting` - Lighting
- `logic` - Rules, scripts, parsers, etc.
- `messaging` - Adapter for sending and receiving messages, e.g., via email, Telegram, ...
- `misc-data` - Export and import of data, currency converter, etc.
- `multimedia` - TV, AVR, speakers, voice assistants, etc.
- `network` - Ping, network discovery, UPnP, ...
- `protocols` - Communication protocols, e.g. MQTT
- `storage` - Logging, data storage, e.g. relational databases, ...
- `utility` - Supporting adapters such as backup
- `vehicle` - Cars
- `visualization` - Visualization adapters, such as vis etc.
- `visualization-icons` - Icons for visualizations
- `visualization-widgets` - iobroker.vis Widgets
- `weather` - Weather information, air quality, environmental information

## Adapter connection type

Define`connectionType` in the`common` Part of`io-package.json` as:

- `local` - Provides direct communication with the device or hub.
- `cloud` - This device is integrated via the cloud and requires an active internet connection.

Define`dataSource` in the`common` as:

- `poll` - Checking the status means that an update may be noticed later.
- `push`- ioBroker will be notified as soon as a new status is available.
- `assumption` - The device status cannot be determined. ioBroker takes the status based on the last ioBroker command.