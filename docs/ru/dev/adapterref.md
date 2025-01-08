---
title: Справочник адаптера
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: NKbO1PQ3EGYvDTaYVbyi2KvWO781qT7NpopN1mx6IOw=
---
# Ссылка на адаптер
## Структура данных — объекты и состояния
Адаптер в ioBroker — это независимый процесс, который считывает и записывает объекты и состояния в центральное хранилище данных. Хранилище данных может быть представлено в виде базы данных (redis/couchDB) или просто текстового файла, но способ подключения всегда один и тот же — через API. То есть разработчику не стоит беспокоиться о том, что это за база данных и как там хранятся и обслуживаются данные.

В памяти имеется два типа данных:

* Объекты
* утверждает

Объекты — это статические описания некоторых точек данных. Состояния — это динамические значения точек данных. Обычно для каждого состояния есть объект с описанием. (Но не наоборот).

Объекты также описывают:

* Конфигурация хоста
* Описание адаптеров
* Конфигурация экземпляров адаптера
* Содержимое HTML-файлов конфигурации.
* Содержимое WEB-файлов
* Перечисления
* Пользователи
* Иерархии состояний (каналов и устройств)

Объекты и их текущие состояния можно просмотреть в адаптере администратора на вкладке «Объекты».

Идентификатор объекта состоит из разных частей. Каждая часть разделяется знаком "." отделены друг от друга. Существуют системные объекты (идентификатор начинается с _ или «система») и объекты адаптера (идентификатор начинается с имени адаптера.номер экземпляра).

?> Примечание. Здесь в описании **Имя адаптера** представляет собой имя адаптера, который разработчик хочет создать.

Объекты можно группировать в каналы, а каналы — в устройства. Вот пример устройств и каналов Homematic:

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

Это используется для установления координации устройств, каналов и состояний в иерархиях.

?> Примечание. Если адаптер не такой сложный, устройства и даже каналы можно не указывать.

**Адаптер** представляет собой пакет файлов, расположенный в каталоге node_modules. Для каждого адаптера описание этого адаптера можно найти в объекте «system.adapter.adapterName». Это всего лишь «общие» и «родные» поля из файла io-package.json. Эта запись создается автоматически при вызове `iobroker install adapterName` или `iobroker add adapterName`. Если адаптер установлен с `npm install iobroker.adapterName`, запись не создается до тех пор, пока не будет создан первый экземпляр. Но это не так важно. Информация, необходимая для «обновлений», считывается непосредственно из io-package.json. Полный список общих настроек адаптера можно найти по адресу [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

**Экземпляр** — это экземпляр адаптера. В зависимости от типа адаптера можно создать более одного экземпляра. С некоторыми адаптерами только один, например Vis или Rickshaw. Это поведение контролируется флагами в io-package.json.

Для каждого экземпляра объект конфигурации находится в хранилище данных под идентификатором «system.adapter.adapterName.X», где X — номер экземпляра адаптера. Он содержит настройки для данного экземпляра адаптера. Обычно он состоит из «общих» и «родных» настроек. Общие настройки:

* `включено`: правда/ложь;
* `host`: имя хоста, на котором должен работать этот экземпляр;
* `режим`: нет, демон, подписка, расписание, один раз;

Описание можно найти [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

`Native` Настройки состоят из определенных конфигураций для этого адаптера, например. Например: IP-адрес устройства, настройки устройства и т. д.

?> Примечание. Экземпляры могут работать на разных хостах (мультихостах), а адаптеры на разных хостах могут иметь разные версии.

Все идентификаторы объектов экземпляра адаптера начинаются с имени адаптера.X, где X — номер экземпляра адаптера.

Объекты имеют разные типы для разных целей.

Следующие объекты автоматически создаются для каждого адаптера (не экземпляра):

* `system.adapter.adaptername`: описание адаптера (например, имя, номер версии и т. д.)
* `adaptername`: объект, состоящий из файлов HTML/JS/CSS из каталога «www» адаптера. Этот объект создается только в том случае, если в пакете адаптера обнаружен каталог www.
* `adaptername.admin`: объект, состоящий из файлов HTML/JS/CSS из каталога «admin» пакета адаптера.

Для каждого экземпляра адаптера «X» автоматически создаются следующие объекты:

* `system.adapter.adaptername.X`: конфигурация экземпляра адаптера.
* `system.adapter.adaptername.X.alive`: активен ли экземпляр (отправлять сообщения каждые 30 секунд)
* `system.adapter.adaptername.X.connected`: указывает, подключен ли экземпляр к хранилищу данных. Возможно, он подключен, но не может отправить активное сообщение из-за взаимоблокировки.
* `system.adapter.adaptername.X.memHeapTotal`: Общее использование памяти.
* `system.adapter.adaptername.X.memHeapUsed`: Использование памяти.
* `system.adapter.adaptername.X.memRss`: Использование памяти.
* `system.adapter.adaptername.X.uptime`: секунды работы адаптера.

Пояснения к состояниям памяти можно найти в [здесь](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

Если адаптер находится в режиме «нет» или «один раз», объекты активности, работоспособности и т. д. не создаются.

**Структура каталогов адаптера**

Пакет адаптера должен содержать некоторые обязательные каталоги и файлы:

* `admin` (требуемый каталог)
* `index.html`
* `xxx.png` — необязательно; лучше: `adaptername.png` (поддерживаются все форматы изображений: jpeg, jpg, svg, bmp, ...)
* `www` - (нужный каталог)
* `lib` - (нужный каталог из-за `utils.js`)
* `utils.js`
* `package.json` — обязательно
* `io-package.json` — необходимо
* `main.js` — обязательно (также может быть `adaptername.js`)

?> Примечание: lib/utils.js — это общий файл для всех адаптеров, используемый для определения местоположения js-контроллера и соответствующего пути к iobroker.js-controller/lib/adapter.js. Самую последнюю версию utils.js можно скачать здесь. Не изменяйте этот файл!

## Имена файлов
Чтобы адаптер был принят и запущен контроллером ioBroker, он должен соответствовать соглашению об именовании.

* На github (или где-то еще) он должен называться `io**B**roker.adapterName` (заглавная B).
* Если адаптер должен быть доступен в npm, он должен называться iobroker.adaptername, поскольку npm не допускает использования заглавных букв в именах пакетов. Его можно определить в package.json.
* HTML-файл графического интерфейса для настройки адаптера должен называться admin/index.html. В каталоге «admin» может быть больше файлов, но index.html должен присутствовать.
* Файл запуска адаптера должен иметь имя main.js или имя_адаптера.js.
* Имя адаптера должно быть уникальным, строчными буквами, без специальных символов и пробелов. В имени адаптера разрешены «-», «_».

## Структура io-package.json
io-package.json используется js-контроллером для отображения информации об адаптере и способах его обработки. Полное описание всех полей общей части можно найти [здесь]().

io-package.json читается «администратором», чтобы узнать онлайн-версию адаптера.

### Общие поля
Наиболее важными общими полями являются:

* `имя`: обязательно. Имя адаптера без «ioBroker.», т. е. «имя адаптера», а не «ioBroker.имя адаптера».
* `версия`: Обязательно. Должен быть таким же, как package.json.
* `title`: Обязательно. Короткое имя адаптера, например «имя адаптера».
* `desc`: Обязательно. Описание адаптера. Это может быть строка типа «Этот адаптер делает то и это» или объект типа:

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

Если для текущего языка нет записи, описание будет отображаться на английском языке.

* `платформа`: обязательно. В настоящее время поддерживается только Javascript/Node.js.
* `режим`: Обязательно. Режим, в котором запускается адаптер.
* `включено`: необязательно. Если это правда, экземпляр активируется после добавления.
* `license`: имя лицензии, под которой лицензируется адаптер;
* `loglevel`: начальный уровень журнала, установленный после создания экземпляра. Может быть «глупый», «отладка», «информация», «предупреждение» или «ошибка».
* `readme`: ссылка на страницу Readme в Интернете. Используется адаптером администратора для отображения ссылки, когда "?" Кнопка щелкнула.
* `icon`: имя значка (не путь) значка адаптера. Этот значок должен находиться в каталоге администратора адаптера.
* `extIcon`: Путь к значку в Интернете для отображения значка адаптера, если адаптер еще не установлен.
* `keywords`: ключевые слова в виде массива для включения поиска в адаптере администратора.
* `localLink`: ссылка на файлы адаптера «www» (или сервер адаптера). "http://192.168.0.100"
* `type`: возможны следующие типы: `аппаратное обеспечение, социальные сети, хранилище, визуальные, API, сценарии, погода, другое, соединение`.
* `messagebox`: необязательно. Должно быть установлено значение true, если адаптер должен получать системные сообщения.

?> Примечание: localLink может иметь специальные ключи, которые заменяются реальными значениями.

* `%ip%`: будет заменен IP-адресом, определенным в первом «веб-» экземпляре.
* `%field%`, где поле — это атрибут из `native` части конфигурации экземпляра адаптера.

Например, `http://%ip%:%port%` отображаются как «http://192.168.0.1:8080», где «192.168.0.1» — это IP-адрес «веб-адаптера», а 8080 — значение `system.adapter.adapterName.X => native.port`.

### Поля объекта
Объекты — статические объекты для всех экземпляров адаптера (xxx.object). Установка адаптера (не создание экземпляра) позволяет автоматически создавать некоторые предопределенные объекты (обычно что-то описывающие). Эти объекты не могут зависеть от конкретного экземпляра и применяться ко всем экземплярам этого адаптера. Например, адаптер hm-rpc имеет описание структуры всех устройств HomeMatic.

Кроме того, можно определить новые представления. В SQL они называются «хранимая процедура», а в CouchDB — представления.

?> Примечание. Не смешивайте представления с `vis`.

Язык Javascript используется для определений представлений. Пример:

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

Здесь определены два представления для адаптера hm-rpc: `listDevices` и `paramsetDescription`.
Они возвращают набор объектов из хранилища данных, отфильтрованных по условию просмотра. Он может эффективно (при использовании CouchDB) запрашивать указанный список объектов.

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

?> Примечание. Использование представлений не является обязательным и требует от разработчика базовых знаний CouchDB.

### Поля объекта экземпляра
Некоторые конкретные объекты или объекты с состояниями типов могут быть определены в `instanceObjects` `io-package.json`.

Для каждого созданного экземпляра создаются все записи из поля `instanceObjects`.

Например, адаптер `hm-rpc` создает состояние `updated` для каждого экземпляра, чтобы сигнализировать другому адаптеру о том, что в хранилище данных появляются новые устройства и что их необходимо обработать `hm-rega`.

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

Будет расширен до

```
"name": "Some new devices added in hm-rpc.0,
```

создав первый экземпляр.

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

!> Все поля являются обязательными. `devDependencies` также должен находиться внутри, чтобы можно было выполнять основные задачи.

### Развертывать
Рекомендуется иметь код на Github. После того как код станет стабильным и адаптер можно будет установить, адаптером можно будет поделиться с другими пользователями, попросив пользователей установить адаптер следующим образом:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

Если все пройдет хорошо и от пользователей поступят положительные отзывы, адаптер можно будет опубликовать на npm.
Было бы хорошо, если бы заранее был релиз на github.

Публикация осуществляется следующей командой:

```
npm publish
```

Доступ к нему можно получить в каталоге адаптера. Убедитесь, что все файлы, кроме необходимых, удалены (например, `.idea`), или добавьте к файлу `.gitignore`.

Конечно, сначала вам необходимо создать учетную запись на npm.

?> Примечание. Код не может быть опубликован дважды с одной и той же версией. Поэтому перед публикацией увеличьте версию в `package.json` и `io-package.json`.

После того, как адаптер будет протестирован и другие пользователи найдут его полезным, его можно зафиксировать в общем репозитории, чтобы его можно было установить через адаптер `admin`.

## Как создать свой адаптер
Вы можете найти несколько шаблонов для использования в своем собственном адаптере по адресу https://github.com/ioBroker/ioBroker.template.

Если вы хотите создать виджет или адаптер с виджетом, их можно найти по адресу https://github.com/ioBroker/ioBroker.example/tree/master/VIS.

### Структура main.js
```
var utils = require('./lib/utils'); // Get common adapter utils - mandatory
```

Эта строка загружает модуль `lib/utils.js`. Общим для всех функций адаптера является поиск корня `iobroker.js-controller`.
Потому что адаптер можно установить тремя разными путями:

* `.../iobroker/node_modules/iobroker.adapterName` — это путь по умолчанию, который рекомендуется использовать.
* `.../iobroker.js-controller/node_modules/iobroker.adapterName` — используется при отладке
* `.../iobroker.js-controller/adapter/adapterName` — старый стиль (устаревший)

utils.js не делает ничего, кроме поиска файла `iobroker.js-controller/lib/adapter.js` и его загрузки.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

Эта строка создает объект `adapter` с именем `adapterName`. Он загружает всю конфигурацию для экземпляра `adapterName.X`, где X — номер экземпляра адаптера.

`js-controller` запускает адаптер как ветвь собственного процесса с двумя параметрами: уровень экземпляра и протокола; нравиться:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

В `adapter.js` все обрабатывается автоматически и разработчику адаптера не приходится об этом беспокоиться.

Адаптер поддерживает 3 дополнительных флага запуска:

* `--install` — Запускает адаптер даже при отсутствии конфигурации. Используется адаптером для выполнения операции установки путем установки адаптера.
* `--force` - Запускает адаптер, даже если он отключен в конфигурации
* `--logs` — Показать логи в консоли, если они показаны только в таблице логов.

```
var myPacket1= require('myPacket1'); // add own module
```

Все остальные модули, необходимые в адаптере, например. B. Можно загрузить `fs`, `require` и т. д.
Не забудьте объявить их в `package.json`.

### Варианты адаптера
Объекты адаптера можно создавать только с именами типа `utils.adapter('adapterName')` или со следующими дополнительными параметрами:

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

Все обработчики могут моделироваться событиями (см. ниже), например:

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

* `name` — имя адаптера, например. Например, `имя адаптера`
* `host` — имя хоста, на котором работает экземпляр адаптера.
* `instance` — номер экземпляра этого экземпляра адаптера.
* `namespace` — пространство имен объектов адаптера, например. Например, `имяадаптера.0`
* `config` - родная часть настроек адаптера
* `common` - общая часть настроек адаптера
* `systemConfig` — содержимое `iobroker-data/iobroker.json` (только если `options.systemConfig = true`)
* `log` — объект регистратора

#### Самые важные события
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

!> *Точка входа* Все инициализации должны выполняться в основном режиме, так как никакая настройка не выполняется до состояния «готово».

```
adapter.on('ready', function () {
* main();
});
```

#### Ведение журнала
Очень важно иметь возможность регистрировать события для целей отладки и контроля. Для регистрации событий можно использовать следующие функции:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

Нет необходимости указывать происхождение или время сообщения. Эти атрибуты добавляются автоматически, например.

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Конечно, `console.log`, `console.debug` или `console.error` также можно использовать, но эти сообщения видны только в том случае, если адаптер был запущен вручную в консоли или в среде программирования IDE.

#### Конфигурация экземпляра
У объекта адаптера есть атрибут для чтения конфигурации экземпляра: `adapter.config`.
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

и содержит данные, введенные пользователем в диалоговом окне конфигурации. Доступ к **общей** части конфигурации экземпляра можно получить с помощью атрибута «common» объекта «адаптер». Например, для показанного io-package.json «adapter.common»:

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

Формат даты доступен в адаптере.dateFormat.

Все остальные конфигурации можно прочитать вручную с помощью функции `getForeignObject`.

**Как читать условие**

В адаптере ioBroker есть два режима чтения статусов:

* подписка на мероприятия (рекомендуется)
* опрос

Чтобы подписаться на собственные события, необходимо вызвать следующую команду:

`adapter.subscribeStates('*');` // Подписывается на все переменные этого экземпляра адаптера с шаблоном `adapterName.X.*`

`adapter.subscribeStates('memory*');` // Подписывается на все переменные этого экземпляра адаптера с шаблоном `adapterName.X.memory*`

Как подписаться на другие события:

`adapter.subscribeForeignStates('yr.*.forecast.html');` // Подписка на переменную `forecast.html` всех экземпляров адаптера `yr`.

Подстановочный знак «*» можно использовать в обеих функциях.

Затем вы получите событие `stateChange` и сможете что-то сделать с этим значением.
После подписки вы не будете получать текущий статус, поскольку события происходят только при изменении.
Чтобы получить исходное состояние, следует выполнить опрос один раз при запуске (обычно в событии Ready).

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
Когда речь идет о состояниях, следует проводить различие между командами и состояниями. «Команда» имеет флаг подтверждения как ложный и отправляется пользователем (через vis, адаптер JavaScript, администратор) для управления устройствами или конкретным адаптером. Обычно адаптеры (например, Homematic) подписаны на все свои изменения, и когда какие-то состояния меняются с ack=false, они пытаются выполнить эту команду (например, включить свет).

«Статус» имеет флаг `ack` как true, указывающий, что он исходит от устройства или службы.
Например, если погодный адаптер получил новый прогноз погоды, он будет опубликован с `ack=true`, или если термометр Homematic измеряет новую температуру, он также будет опубликован с `ack=true`.
Даже если пользователь физически включает свет, новый статус публикуется с `ack=true`.

`Ack=false` обычно перезаписываются при выполнении после ответа устройства.

Например, если пользователь нажал клавишу в `vis` и отправил команду `hm-rpc.0.kitchen.light=ON`.
Адаптер Socket-io отправляет новый статус с `kitchen.light = {val: 1, ack: false}` экземпляру `hm-rpc.0`.

Адаптер Homematic подписан на все состояния `hm-rpc.0`, и когда новое состояние получено с помощью `ack=false`, он отправляет новое значение на физический коммутатор.

Физический коммутатор выполняет команду и отправляет новое состояние ON адаптеру `hm-rpc`.
Адаптер `hm-rpc.0` публикует новый статус состояния `hm-rpc.0.kitchen.light={val: 1, ack: true}` (с метками времени).

Это изменение не выполняется адаптером hm-rpc, поскольку значение ack равно true. И это подтверждение с физического устройства.

#### Как пишется состояние
Состояния могут быть записаны как команды или как состояния. Для этого необходимо использовать `adapter.setState` и `adapter.setForeignState`:

`adapter.setForeignState('otherAdapter.X.someState', 1);` // Управление другими адаптерами (нет необходимости контролировать собственное состояние, мы можем сделать это напрямую)

`adapter.setState('myState', 1, true);` // устанавливаем новый статус вашего собственного экземпляра

`adapter.setState('myState', {val: 1, ack: true});` // как указано выше

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

Примечание. Следующие команды идентичны.

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Государственное устройство
Состояние представляет собой объект Javascript со следующими атрибутами:

* `val`: значение состояния (желаемое значение или фактическое значение)
* `ack`: Флаг направления. false для желаемого значения и true для фактического значения. По умолчанию: ложь (команда)
* `ts`: временная метка в виде количества миллисекунд между полуночью 1 января 1970 года и указанной датой. Результат метода getTime() объекта Date Javascript. По умолчанию: текущее время.
* `lc`: временная метка последнего изменения. Тот же формат, что и ts, но меняется временная метка значения. Возможно, значение обновится, но оно останется прежним. В этом случае lc не изменяется.
* `from`: Имя экземпляра адаптера, который устанавливает значение, например. «system.adapter.web.0» (при просмотре)
* `expire`: (необязательно) Существует возможность установить срок действия в секундах. По истечении этого времени переменная устанавливается на «ноль». Оно определяется, например, «активными» состояниями экземпляров адаптера. Если экземпляр адаптера не переходит в «активное» состояние в течение 30 секунд, он помечается как «неактивный». Чтобы установить состояние с истечением срока действия, используйте следующий код setState('Variable', {val: true, expire: 30})
* `q`: (необязательно) Качество. Смотрите описание здесь

**Режимы работы адаптера**

Адаптер может работать в разных режимах. Режим адаптера можно определить с помощью атрибута common.mode.

* `none` - Этот адаптер не запустится.
* `daemon` - всегда запущенный процесс (перезапускается, когда процесс завершается)
* `subscribe` - запускается, когда статус system.adapter ... active меняется на true. Выходит, когда .alive изменяется на false, и устанавливает .alive на false при выходе из процесса (не перезапускается при выходе из процесса)
* `schedule` - запускается по расписанию, найденному в system.adapter... common.schedule - реагирует на изменения в .schedule перепланированием с новым статусом
* `ones` — этот адаптер запускается каждый раз, когда изменяется объект system.adapter... Он не будет перезапускаться после завершения.

Обычно адаптеры должны использовать демон режима.

Если адаптер каждый раз что-то проверяет

#### Как читается объект?
Объекты можно читать с помощью команды getObject или getForeignObject:

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

См.: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf.

#### Как пишется объект?
Для записи объектов обычно можно использовать две функции: `setObject, setForeignObject`. Однако существует множество справочных функций для изменения объектов:

* `extendObject, ExtendForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `createDevice, deleteDevice`
* `createChannel, deleteChannel`
* `createState, deleteState`
* `addStateToEnum, deleteStateFromEnum`

ExtendObject просто читает объект, объединяется с конкретным объектом и записывает объект обратно.

Разница между `xxxObject` и `xxxForeignObject` заключается в том, что `xxxObject` автоматически расширяет идентификатор объекта текстом `adapter.instance.`.

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

#### Инфо.соединение
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

### Вот как создается экземпляр
Перед публикацией в npm: скопируйте в ioBroker/node_modules, перейдите в `admin` и добавьте экземпляр. После публикации в npm: перейдите в `ioBroker/` и напишите `npm install iobroker.xxx --production --no-optional --logevel=error`, перейдите в `admin` и добавьте.

## Вот как отлаживать
* Запустите ioBroker
* Добавить экземпляр адаптера
* Отключить экземпляр адаптера
* Запустить вебшторм
* Создайте конфигурацию для отладки с помощью node.js.
* Флаги для приложения: `--force, экземпляр, уровень журнала` (вы можете запустить адаптер как `node xxx.js 1 Debug --force`, 1 — индекс экземпляра (по умолчанию 0, Debug — уровень журнала, а `- -force ` означает, что настройки «enabled: false» игнорируются.)

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