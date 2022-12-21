---
title: ссылка на адаптер
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: Ad0AddDAdDBh/iKtmoy2o/v6XigJcQuFn8pgOkgGOB8=
---
# Ссылка на адаптер
## Структура данных - объекты и состояния
Адаптер в ioBroker — это независимый процесс, который считывает и записывает объекты и состояния в центральное хранилище данных. Хранилище данных может быть представлено в виде базы данных (redis/couchDB) или просто в виде текстового файла, но способ подключения всегда один — через API. То есть разработчику все равно, что это за база данных и как в ней хранятся и предоставляются данные.

В памяти есть два типа данных:

* Объекты
* состояния

Объекты — это статические описания некоторых точек данных. Состояния — это динамические значения точек данных. Обычно для каждого состояния существует объект с описанием. (Но не наоборот).

Объекты также описывают:

* Конфигурация хоста
* Описание адаптеров
* Конфигурация экземпляров адаптера
* Содержимое HTML-файлов конфигураций
* Содержимое WEB-файлов
* Перечисления
* Пользователь
* Иерархии состояний (каналы и устройства)

Объекты и их текущее состояние можно просмотреть в Административном адаптере на вкладке «Объекты».

ID объекта состоит из разных частей. Каждая часть отделяется знаком "." отделены друг от друга. Существуют системные объекты (идентификатор начинается с _ или «system.») и объекты адаптера (идентификатор начинается с имени_адаптера.номер_экземпляра).

?> Примечание. Здесь в описании **имя адаптера** — это имя адаптера, который хочет создать разработчик.

Объекты можно группировать в каналы, а каналы в устройства. Вот пример устройств и каналов Homematic:

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

Идентификатор объекта всегда должен начинаться с идентификатора канала, а идентификатор канала — с идентификатора устройства. Например, в приведенном выше имени состояния hm-rpc.0.IEQ1234567.0.INFO часть hm-rpc.0.IEQ1234567.0 — это идентификатор канала, а hm-rpc.0.IEQ1234567 — это идентификатор устройства.

Это используется для построения координации устройств, каналов и состояний в иерархиях.

?> Примечание. Если адаптер не такой сложный, устройства и даже каналы можно не указывать.

**Адаптер** представляет собой пакет файлов и находится в каталоге node_modules. Для каждого адаптера описание этого адаптера можно найти в объекте «system.adapter.adapterName». Это только общие и нативные поля из файла io-package.json. Эта запись создается автоматически при вызове `iobroker install adapterName` или `iobroker add adapterName`. Если адаптер установлен с `npm install iobroker.adapterName`, запись не создается до тех пор, пока не будет создан первый экземпляр. Но это не так важно. Информация, необходимая для «обновлений», считывается непосредственно из io-package.json. Полный список общих настроек адаптера можно найти в [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

**Экземпляр** — это экземпляр адаптера. В зависимости от типа адаптера может быть создано несколько экземпляров. Но с некоторыми адаптерами только один, например Vis или Rickshaw. Это поведение контролируется флагами в io-package.json.

Для каждого экземпляра объект конфигурации находится в хранилище данных под идентификатором «system.adapter.adapterName.X», где X — номер экземпляра адаптера. Он содержит настройки для данного экземпляра адаптера. Обычно он состоит из «общих» и «родных» настроек. Общие настройки:

* `включено`: правда/ложь;
* `host`: имя хоста, на котором должен работать этот экземпляр;
* `режим`: нет, демон, подписка, расписание, один раз;

Описание можно найти в [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

`Native` Настройки состоят из определенных конфигураций для этого адаптера, например. B.: IP-адрес устройства, настройки устройства и т. д.

?> Примечание. Экземпляры могут работать на разных хостах (многохостовых), а адаптеры на разных хостах могут иметь разные версии.

Все идентификаторы объектов экземпляра адаптера начинаются с имени_адаптера.X, где X — номер экземпляра адаптера.

Объекты имеют разные типы для разных целей.

Для каждого адаптера (не экземпляра) автоматически создаются следующие объекты:

* `system.adapter.adaptername`: описание адаптера (например, имя, номер версии, ...)
* `adaptername`: объект, состоящий из файлов HTML/JS/CSS из каталога "www" адаптера. Этот объект создается только в том случае, если каталог www находится в пакете адаптера.
* `adaptername.admin`: объект, состоящий из файлов HTML/JS/CSS из каталога «admin» пакета адаптера.

Для каждого экземпляра адаптера «X» автоматически создаются следующие объекты:

* `system.adapter.adaptername.X`: конфигурация экземпляра адаптера
* `system.adapter.adaptername.X.alive`: указывает, жив ли экземпляр (отправлять сообщения каждые 30 секунд)
* `system.adapter.adaptername.X.connected`: указывает, подключен ли экземпляр к хранилищу данных. Он может быть подключен, но не может отправить активное сообщение из-за взаимоблокировки.
* `system.adapter.adaptername.X.memHeapTotal`: общее использование памяти
* `system.adapter.adaptername.X.memHeapUsed`: использование памяти
* `system.adapter.adaptername.X.memRss`: использование памяти
* `system.adapter.adaptername.X.uptime`: секунды, в течение которых работает адаптер.

Пояснения к состояниям памяти можно найти в [здесь](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

Если адаптер находится в режиме 'none' или 'once', никакие активные объекты, объекты безотказной работы и т. д. не создаются.

**Структура каталогов адаптера**

Пакет адаптера должен содержать обязательные каталоги и файлы:

* `admin` (обязательный каталог)
* `index.html`
* `xxx.png` - не обязательно; лучше: `adaptername.png` (поддерживаются все форматы изображений: jpeg, jpg, svg, bmp, ...)
* `www` - (обязательный каталог)
* `lib` - (необходимый каталог из-за `utils.js`)
* `utils.js`
* `package.json` - обязательно
* `io-package.json` - обязательно
* `main.js` — обязательно (также может быть `adaptername.js`)

?> Примечание: lib/utils.js — это общий файл для всех адаптеров, который используется для поиска местоположения js-контроллера и соответствующего пути к iobroker.js-controller/lib/adapter.js. Самые последние версии utils.js можно скачать здесь. Не изменяйте этот файл!

## Имена файлов
Чтобы контроллер ioBroker принял и запустил адаптер, он должен соответствовать соглашению об именах.

* На github (или где-либо еще) он должен называться io**B**roker.adapterName (заглавная B).
* Если вы хотите, чтобы адаптер был доступен в npm, он должен называться iobroker.adaptername, потому что npm не допускает использование заглавных букв в именах пакетов. Его можно определить в package.json
* HTML-файл GUI для настройки адаптера должен называться admin/index.html. В каталоге «admin» может быть больше файлов, но index.html должен присутствовать.
* Файл запуска адаптера должен называться main.js или adaptername.js.
* Имя адаптера должно быть уникальным, в нижнем регистре, без специальных символов и без пробелов. В имени адаптера допускаются "-", "_".

## Структура io-package.json
io-package.json используется js-контроллером, чтобы показать информацию об адаптере и узнать, как с ним обращаться. Полное описание всех полей общей части можно найти [здесь]().

io-package.json читается «администратором», чтобы узнать онлайн-версию адаптера.

### Общие поля
Наиболее важные общие поля:

* `имя`: обязательно. Имя адаптера без «ioBroker.», т. е. «имя адаптера», а не «ioBroker.adaptername».
* `версия`: требуется. Должен совпадать с package.json.
* `название`: обязательно. Краткое имя адаптера, например "имя адаптера"
* `описание`: обязательно. Описание адаптера. Это может быть строка типа «Этот адаптер делает то-то и то-то» или объект вроде:

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

Если для текущего языка нет записей, описание отображается на английском языке.

* `платформа`: обязательно. В настоящее время поддерживается только `Javascript/Node.js`.
* `режим`: требуется. Режим, в котором запускается адаптер.
* «включено»: необязательно. Если true, экземпляр будет активирован после его добавления.
* `license`: имя лицензии, под которой лицензируется адаптер;
* `loglevel`: начальный уровень журнала, установленный после создания экземпляра. Может быть «глупым», «отладочным», «информационным», «предупреждающим» или «ошибочным».
* `readme`: ссылка на страницу readme в Интернете. Используется адаптером администратора для отображения ссылки, когда "?" кнопка нажата.
* `icon`: имя значка (не путь) значка адаптера. Этот значок должен находиться в каталоге администратора адаптера.
* `extIcon`: путь к значку в Интернете для отображения значка адаптера, если адаптер еще не установлен.
* `keywords`: ключевые слова в виде массива для включения поиска в адаптере администратора.
* `localLink`: ссылка на файлы адаптера "www" (или сервер адаптера). "http://192.168.0.100"
* «тип»: возможны следующие типы: «аппаратные, социальные, хранилище, визуальные, API, сценарии, погода, другое, подключение».
* `messagebox`: необязательно. Должно быть установлено значение true, если вы хотите, чтобы адаптер получал системные сообщения.

?> Примечание: localLink может иметь специальные ключи, которые заменяются реальными значениями.

* `%ip%`: будет заменен IP-адресом, определенным в первом "веб-экземпляре".
* `%field%`, где поле — это атрибут из `native` части конфигурации экземпляра адаптера.

Например, `http://%ip%:%port%` будет отображаться как «http://192.168.0.1:8080», где «192.168.0.1» — это IP-адрес «веб-адаптера», а 8080 — значение `system.adapter.adapterName.X => native.port`.

### Поля объекта
Объекты - статические объекты для всех экземпляров адаптера (xxx.object). Установка адаптера (без его создания) позволяет автоматически создавать некоторые предопределенные объекты (обычно описывающие что-либо). Эти объекты не должны зависеть от конкретного экземпляра и применяться ко всем экземплярам этого адаптера. Например, адаптер hm-rpc имеет описание структуры всех устройств HomeMatic.

Кроме того, новые представления могут быть определены. В SQL они называются "хранимой процедурой", а в CouchDB - представлениями.

?> Примечание. Не смешивайте с представлениями `vis`.

Язык Javascript используется для определения представлений. Пример:

```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

Здесь для адаптера hm-rpc определены два представления: `listDevices` и `paramsetDescription`.
Они возвращают набор объектов, отфильтрованных по условиям просмотра, из хранилища данных. Он может эффективно (при использовании CouchDB) запрашивать заданный список объектов.

Пример:

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
    {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
    function (err, doc) {
	    if (doc && doc.rows) {
		    for (var i = 0; i < doc.rows.length; i++) {
			    var id  = doc.rows[i].id;
			    var obj = doc.rows[i].value;
			    console.log('Found ' + id + ': ' + JSON.stringify(obj));
		    }
            if (!doc.rows.length) console.log('No objects found.');
	    } else {
		    console.log('No objects found: ' + err);
	    }
    }
);
```

Использование `startkey` и `endkey` также можно найти на той же странице.

?> Примечание. Использование представлений необязательно и требует от разработчика базового понимания CouchDB.

### Поля объекта экземпляра
Некоторые конкретные объекты или объекты с состояниями типов могут быть определены в `instanceObjects` из `io-package.json`.

Все записи из поля `instanceObjects` создаются для каждого созданного экземпляра.

Например, адаптер `hm-rpc` создает статус `updated` для каждого экземпляра, чтобы сигнализировать другому адаптеру о том, что в хранилище данных появились новые устройства и что их необходимо обработать с помощью `hm-rega`.

```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```

Нет необходимости указывать полный путь к объекту, и это невозможно, поскольку экземпляр адаптера неизвестен.
Специальное слово `%INSTANCE%` можно использовать в `common.name`, чтобы указать его в имени объекта. Например:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Будет расширяться до

```
"name": "Some new devices added in hm-rpc.0,
```

путем создания первого экземпляра.

### Пакет.json
package.json — это файл описания по умолчанию для пакета npm. Полное описание можно найти по адресу https://docs.npmjs.com/files/package.json.

Краткая структура `package.json`:

```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
    "myPacket1": "~0.3.1",
    "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```

!> Все поля обязательны для заполнения. `devDependencies` также должен быть внутри, чтобы активировать базовые квесты.

### Предоставлять
Рекомендуется иметь код на Github. После того, как код станет стабильным и адаптер можно будет установить, адаптером можно будет поделиться с другими пользователями, попросив пользователей установить адаптер следующим образом:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

Если все ок и есть положительные отзывы пользователей, адаптер можно публиковать на npm.
Было бы хорошо, если бы до этого был релиз на гитхабе.

Публикация осуществляется следующей командой:

```
npm publish
```

Это можно вызвать в каталоге адаптера. Убедитесь, что все файлы, кроме необходимых, удалены (например, `.idea`), или добавьте в файл `.gitignore`.

Конечно, сначала необходимо создать учетную запись в npm.

?> Примечание. Код нельзя публиковать дважды с одной и той же версией. Поэтому увеличьте версию в `package.json` и `io-package.json` перед публикацией.

После того, как адаптер протестирован и другие пользователи сочтут его полезным, его можно передать в общий репозиторий, чтобы установить поверх адаптера `admin`.

## Как создать собственный адаптер
На https://github.com/ioBroker/ioBroker.template вы можете найти несколько шаблонов для своего собственного адаптера.

Если вы хотите создать виджет или адаптер с виджетом, вы можете найти их по адресу https://github.com/ioBroker/ioBroker.example/tree/master/VIS.

### Структура main.js
```
var utils = require('./lib/utils'); // Get common adapter utils - mandatory
```

Эта строка загружает модуль `lib/utils.js`. Все функции адаптера имеют общее свойство находить корень `iobroker.js-controller`.
Потому что адаптер можно установить тремя разными путями:

* `.../iobroker/node_modules/iobroker.adapterName` — это путь по умолчанию, рекомендуемый для использования.
* `.../iobroker.js-controller/node_modules/iobroker.adapterName` — используется при отладке
* `.../iobroker.js-controller/adapter/adapterName` — старый стиль (устаревший)

utils.js ничего не делает, кроме как ищет файл `iobroker.js-controller/lib/adapter.js` и загружает его.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

Эта строка создает объект `adapter` с именем `adapterName`. Он загружает всю конфигурацию экземпляра `adapterName.X`, где X — номер экземпляра адаптера.

`js-controller` запускает адаптер как ветвь собственного процесса с двумя параметрами: уровень экземпляра и протокол; нравиться:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

Все автоматически обрабатывается в `adapter.js` и разработчику адаптера не нужно об этом беспокоиться.

Адаптер поддерживает 3 дополнительных стартовых флага:

* `--install` - Запускает адаптер даже при отсутствии конфигурации. Используется адаптером для выполнения операции установки путем установки адаптера.
* `--force` - Запускает адаптер, даже если он отключен в конфигурации
* `--logs` - Отображает логи в консоли, если они отображаются только в таблице логов.

```
var myPacket1= require('myPacket1'); // add own module
```

Затем все остальные модули, необходимые в адаптере, например. B. Можно загрузить `fs`, `require` и т. д.
Не забудьте объявить их в `package.json`.

### Опции адаптера
Объекты адаптера можно создавать только с такими именами, как `utils.adapter('adapterName')`, или со следующими дополнительными параметрами:

```
var adapter = utils.adapter({
    name: 'adapterName',    // mandatory - name of adapter
    dirname: '',            // optional - path to adapter (experts only)
    systemConfig: false,    // optional - if system global config must be included in object
                            // (content of iobroker-data/iobroker.json)
        config: null,       // optional - alternate global configuration for adapter (experts only)
    instance: null,         // optional - instance of the adapter
    useFormatDate: false,   // optional - if adapter wants format date according to global settings.
                            // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,  // optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,     // optional - handler for subscribed objects changes
    message: null,          // optional - handler for messages for this adapter
    stateChange: null,      // optional - handler for subscribed states changes
    ready: null,            // optional - will be called when adapter is initialized
    unload: null,           // optional - will be called by adapter termination
    noNamespace: false      // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```

Все обработчики могут быть смоделированы событиями (см. ниже), например.

```
adapter.on('ready', function () {
    main();
});
```

### Атрибуты объекта адаптера
Как вы создали объект `adapter` с помощью

```
var adapter = utils.adapter('adapterName');
```

В этом экземпляре объекта создаются следующие атрибуты:

* `name` - имя адаптера, например B. имя адаптера
* `host` — имя хоста, на котором запущен экземпляр адаптера.
* `instance` - номер экземпляра этого экземпляра адаптера
* `namespace` - пространство имен объектов адаптера, т.е. B. имя_адаптера.0
* `config` - родная часть настроек адаптера
* `common` - общая часть настроек адаптера
* `systemConfig` - содержимое `iobroker-data/iobroker.json` (только если `options.systemConfig = true`)
* `log` - объект логгера

#### Главные события
```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
* adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

* // you can use the ack flag to detect if state is command(false) or status(true)
* if (!state.ack) {
* * adapter.log.info('ack is not set!');
* }
});
```

!> *Точка входа* Все инициализации должны выполняться в main, так как до "готовности" нет конфигурации.

```
adapter.on('ready', function () {
* main();
});
```

#### Логирование
Очень важно иметь возможность регистрировать события в целях отладки и контроля. Для регистрации событий можно использовать следующие функции:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

Нет необходимости указывать источник или время сообщения. Эти атрибуты добавляются автоматически, например.

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Конечно, можно также использовать `console.log`, `console.debug` или `console.error`, но эти сообщения видны только в том случае, если адаптер был запущен вручную в консоли или в среде программирования.

#### Конфигурация экземпляра
Существует атрибут объекта адаптера для чтения конфигурации экземпляра: `adapter.config`.
Этот объект состоит из `native` части объекта `system.adapter.adapterName.X`. Например, если `io-package.json` выглядит так:

```
{
   "common": {
       "name": "adapterName"
   },
   "native": {
       "location": "Stuttgart",
       "language": ""
   }
}
```

Таким образом, `adapter.config` равны:

```
{
   "location": "Stuttgart",
   "language": ""
}
```

и ввел данные от пользователя в диалог конфигурации. Доступ к **общей** части конфигурации экземпляра можно получить с помощью атрибута «общий» объекта «адаптер». Например, для показанного io-package.json «adapter.common» имеет вид:

```
{
   "name": "adapterName"
}
```

Чтобы получить доступ к конфигурации ioBroker (хранящейся в файле `iobroker-data/iobroker.json`), установите для параметра адаптера `systemConfig` значение true.

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

Чтобы получить глобальный формат даты, для параметра `useFormatDate` должно быть установлено значение true:

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

Формат даты доступен в adapter.dateFormat.

Все остальные конфигурации можно прочитать вручную с помощью функции `getForeignObject`.

**Как читать условие**

В адаптере ioBroker есть два режима чтения статусов:

* подписка на мероприятие (рекомендуется)
* опрос

Чтобы подписаться на собственные события, необходимо вызвать следующую команду:

`adapter.subscribeStates('*');` // Подписывается на все переменные этого экземпляра адаптера по шаблону `adapterName.X.*`

`adapter.subscribeStates('memory*');` // Подписывается на все переменные этого экземпляра адаптера по шаблону `adapterName.X.memory*`

Чтобы подписаться на другие события:

`adapter.subscribeForeignStates('yr.*.forecast.html');` // Подписка на переменную `forecast.html` всех экземпляров адаптера `yr`.

Подстановочный знак «*» можно использовать в обеих функциях.

После этого вы получаете событие `stateChange` и можете что-то делать с этим значением.
После подписки вы не получите текущий статус, так как события происходят только при их изменении.
Чтобы получить начальное состояние, вы должны сделать «запрос» один раз при запуске (обычно в событии «готово»).

Опрос Чтобы прочитать собственные состояния при запуске или прочитать значения с интервалом, используйте функцию `adapter.getState` следующим образом:

```
adapter.getState('myState', function (err, state) {

  adapter.log.info(
      'State ' + adapter.namespace + '.myState -' +
      '  Value: '    + state.val +
      ', ack: '      + state.ack +
      ', time stamp: '   + state.ts  +
      ', last changed: ' + state.lc
  );
});
```

Обратите внимание, что этот результат возвращается асинхронно.

Для чтения состояний других адаптеров следует использовать функцию `adapter.getForeignState`. Подстановочные знаки не поддерживаются.

#### Команды и статусы
Делайте различие между командами и состояниями, когда говорите о состояниях. «Команда» имеет флаг подтверждения как ложный и отправляется пользователем (через vis, адаптер javascript, администратор) для управления устройствами или конкретным адаптером. Обычно адаптеры (например, Homematic) подписаны на все свои собственные изменения, и когда некоторые состояния изменяются с помощью ack=false, они пытаются выполнить эту команду (например, включение света).

«Статус» имеет флаг `ack` как истинный, что указывает на то, что он получен от устройства или службы.
Например, если адаптер погоды получил новый прогноз погоды, он будет опубликован с `ack=true`, а если термометр Homematic измеряет новую температуру, он также будет опубликован с `ack=true`.
Даже если пользователь физически включит свет, новый статус будет опубликован с `ack=true`.

`Ack=false` обычно перезаписываются выполнением после ответа устройства.

Например, если в `vis` пользователь нажал клавишу и отправил команду `hm-rpc.0.kitchen.light=ON`.
Адаптер сокета io отправляет новый статус экземпляру `hm-rpc.0` с `kitchen.light = {val: 1, ack: false}`.

Адаптер Homematic подписан на все состояния `hm-rpc.0`, и когда новое состояние получено с `ack=false`, он отправляет новое значение на физический коммутатор.

Физический коммутатор выполняет команду и отправляет новый статус ON адаптеру `hm-rpc`.
Адаптер `hm-rpc.0` публикует новое состояние состояния `hm-rpc.0.kitchen.light={val: 1, ack: true}` (с метками времени).

Это изменение не выполняется адаптером hm-rpc, поскольку ack имеет значение true. И это подтверждение от физического устройства.

#### Как пишется состояние
Состояния могут быть записаны как команды или как статусы. Для этого необходимо использовать `adapter.setState` и `adapter.setForeignState`:

`adapter.setForeignState('otherAdapter.X.someState', 1);` // Управление другими адаптерами (нет необходимости контролировать собственное состояние, мы можем сделать это напрямую)

`adapter.setState('myState', 1, true);` // Установить новый статус собственного экземпляра

`adapter.setState('myState', {val: 1, ack: true});` // как указано выше

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

Примечание. Следующие команды идентичны

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Государственная структура
Состояние представляет собой объект javascript со следующими атрибутами:

* `val`: значение состояния (желаемое значение или фактическое значение)
* `ack`: флаг направления. false для желаемого значения и true для фактического значения. По умолчанию: ложь (команда)
* `ts`: метка времени в миллисекундах между полуночью 1 января 1970 года и указанной датой. Результат метода getTime() объекта Javascript Date. По умолчанию: текущее время.
* `lc`: метка времени последней модификации. Тот же формат, что и у ts, но изменяется отметка времени значения. Может случиться так, что значение обновится, но значение останется прежним. В этом случае lc не изменяется.
* `from`: имя экземпляра адаптера, который устанавливает значение, например. "system.adapter.web.0" (по адресу)
* `expire`: (необязательно) Возможность установить время ожидания в секундах. По истечении этого времени переменная устанавливается в «ноль». Например, через «активные» состояния экземпляров адаптера. Если экземпляр адаптера не активирует состояние «работает» в течение 30 секунд, он помечается как «неработающий». Чтобы установить состояние с истечением срока действия, используйте следующий код setState('variable', {val: true, expire: 30})
* `q`: (необязательно) качество. Смотрите описание здесь

**Режимы работы адаптера**

Адаптер может работать в разных режимах. Режим адаптера можно определить с помощью атрибута common.mode.

* `none` - Этот адаптер не будет запущен.
* `daemon` - всегда работающий процесс (будет перезапущен, когда процесс будет убит)
* `subscribe` - запускается, когда статус system.adapter ...alive меняется на true. Убивает, когда .alive изменяется на false и устанавливает .alive на false при выходе из процесса (не перезапускается при выходе из процесса)
* `schedule` — запускается по расписанию, найденному в system.adapter ... common.schedule — реагирует на изменения в .schedule перепланированием с новым статусом
* `once` — этот адаптер будет запускаться при каждом изменении объекта system.adapter .. . Он не будет перезапущен после завершения.

Обычно адаптеры должны использовать демон режима.

Если адаптер проверяет что-то только каждые X минут, он должен использовать режим `schedule` и совместно определять расписание cron (например, `1 * * * *` — каждый час).

#### Как читается объект?
Объекты можно прочитать с помощью команды getObject или getForeignObject:

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
  }
});

adapter.getObject('myObject', function (err, obj) {

});
```

Функции всегда асинхронны.

Объекты адаптера должны быть организованы в устройства, каналы и состояния.

См.: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### Как пишется объект?
Как правило, для записи объектов можно использовать две функции: `setObject, setForeignObject`. Однако существует множество вспомогательных функций для изменения объектов:

* `extendObject, extendForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `создать устройство, удалить устройство`
* `создать канал, удалить канал`
* `создать состояние, удалить состояние`
* `добавитьStateToEnum, удалитьStateFromEnum`

extendObject просто читает объект, объединяется с данным объектом и записывает объект обратно.

Разница между `xxxObject` и `xxxForeignObject` заключается в том, что `xxxObject` автоматически дополняет идентификатор объекта текстом `adapter.instance.`.

Функции всегда асинхронны.

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
    obj.native = {}; // modify object
    adapter.setForeignObject(obj._id, obj, function (err) {
      if (err) adapter.log.error(err);
    });
  }
});
```

#### Информ.соединение
Когда адаптер подключается и контролирует (например, управляемое устройство), он должен создать и поддерживать переменную `info.connection`.

В этом случае статус подключения отображается в списке экземпляров в `admin`. При желании качество состояний зависит от статуса соединения.

## Функции
```
* setObject = function setObject(id, obj, callback)
* extendObject = function extendObject(id, obj, callback)
* setForeignObject = function setForeignObject(id, obj, callback)
* extendForeignObject = function extendForeignObject(id, obj, callback)
* getEnum = function getEnum(_enum, callback)
* getEnums = function getEnums(_enumList, callback)
* getForeignObjects = function getForeignObjects(pattern, type, enums, callback)
* findForeignObject = function findForeignState(id, type, callback)
* getForeignObject = function getForeignObject(id, callback)
* delObject = function delObject(id, callback)
* delForeignObject = function delForeignObject(id, callback)
* subscribeObjects = function subscribeObjects(pattern)
* subscribeForeignObjects = function subscribeObjects(pattern)
* setObjectNotExists = function setObjectNotExists(id, object, callback)
* setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback)
* createDevice = function createDevice(deviceName, common, _native, callback)
* createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback)
* createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
* deleteDevice = function deleteDevice(deviceName, callback)
* addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)
* deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback)
* deleteChannel = function deleteChannel(parentDevice, channelName, callback)
* deleteState = function deleteState(parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum('', parentDevice, parentChannel, stateName);
* getDevices = function getDevices(callback)
* getChannelsOf = function getChannelsOf(parentDevice, callback)
* getStatesOf = function getStatesOf(parentDevice, parentChannel, callback)
* addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)
* rmDir = function rmDir(path, callback)
* mkDir = function mkDir(path, mode, callback)
* readDir = function readDir(adapter, path, callback)
* unlink = function unlink(adapter, name, callback)
* rename = function rename(adapter, oldName, newName, callback)
* mkdir = function mkdir(adapter, dirname, callback)
* readFile = function readFile(adapter, filename, options, callback)
* writeFile = function writeFile(adapter, filename, data, mimeType, callback)
* formatDate = function formatDate(dateObj, isSeconds, _format)
* sendTo = function sendTo(objName, command, message, callback)
* sendToHost = function sendToHost(objName, command, message, callback)
* setState = function setState(id, state, callback)
* setForeignState = function setForeignState(id, state, callback)
* getState = function getState(id, callback)
* getStateHistory = function getStateHistory(id, start, end, callback)
* getForeignStateHistory = function getStateHistory(id, start, end, callback)
* idToDCS = function idToDCS(id)
* getForeignState = function getForeignState(id, callback)
* delForeignState = function delForeignState(id, callback)
* delState = function delState(id, callback)
* getStates = function getStates(pattern, callback)
* getForeignStates = function getForeignStates(pattern, callback)
* subscribeForeignStates = function subscribeForeignStates(pattern)
* unsubscribeForeignStates = function unsubscribeForeignStates(pattern)
* subscribeStates = function subscribeStates(pattern)
* getSession = function getSession(id, callback)
* setSession = function setSession(id, ttl, data, callback)
* destroySession = function destroySession(id, callback)
* getMessage = function getMessage(callback)
* lenMessage = function lenMessage(callback)
* setBinaryState = function setBinaryState(id, binary, callback)
* getBinaryState = function getBinaryState(id, callback)
* getPort = function adapterGetPort(port, callback)
* checkPassword = function checkPassword(user, pw, callback)
* setPassword = function setPassword(user, pw, callback)
* checkGroup = function checkGroup(user, group, callback)
* stop (common.mode: subscribe, schedule, once)
* terminate
* setInteral
* clearInterval
* setTimeout
* clearTimeout
* log.debug(msg)
* log.info(msg)
* log.warn(msg)
* log.error(msg)
```

## События
```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

### Так создается экземпляр
Перед публикацией в npm: Скопируйте в ioBroker/node_modules, перейдите в `admin` и добавьте экземпляр. После публикации в npm: перейдите в `ioBroker/` и напишите `npm install iobroker.xxx --production --no-optional --logevel=error`, перейдите в `admin` и добавьте.

## Как отлаживать
* Запустить ioBroker
* Добавить экземпляр адаптера
* Отключить экземпляр адаптера
* Запустите вебсторм
* Создайте конфигурацию для отладки с помощью node.js
* Флаги для приложения: `--force, instance, log level` (Вы можете запустить адаптер как `node xxx.js 1 Debug --force`, 1 — индекс экземпляра (по умолчанию 0, отладка — это уровень логирования и ` --force ` означает, что настройки «enabled: false» игнорируются.)

## Админ.html
```
* function showMessage(message, title, icon)
* function getObject(id, callback)
* function getState(id, callback)
* function getEnums(_enum, callback)
* function getIPs(host, callback)
* function fillSelectIPs(id, actualAddr, noIPv4, noIPv6)
* function sendTo(_adapter_instance, command, message, callback)
* function sendToHost(host, command, message, callback)
* function fillSelectCertificates(id, type, actualValued)
* function getAdapterInstances(_adapter, callback)
* function getIsAdapterAlive(_adapter, callback)
* function addToTable(tabId, value, $grid, _isInitial)
* function enumName2Id(enums, name)
* function editTable(tabId, cols, values, top, onChange)
* function getTableResult(tabId, cols)
```

## Лучшие практики