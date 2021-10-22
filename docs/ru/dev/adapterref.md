---
title: Ссылка на адаптер
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterref.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: dNvR4aWYGOZY10vGh+U0NkKHMbZwXrRDHRPB5f4QXlY=
---
# Ссылка на адаптер
## Структура данных - объекты и состояния
Адаптер в ioBroker - это независимый процесс, который читает и записывает объекты и состояния в центральное хранилище данных. Хранилище данных может отображаться как база данных (redis / couchDB) или просто как текстовый файл, но способ подключения всегда один и тот же - через API. Это означает, что разработчик не должен заботиться о том, какая это база данных и как данные хранятся и становятся доступными в ней.

В памяти есть два типа данных:

* Объекты
* Состояния

Объекты - это статические описания некоторых точек данных. Состояния - это динамические значения точек данных. Обычно для каждого состояния есть объект с описанием. (Но не наоборот).

Объекты также описывают:

* Конфигурация хостов
* Описание адаптера
* Конфигурация экземпляров адаптера
* Содержимое конфигурационных файлов HTML
* Содержание WEB файлов
* Списки
* Пользователь
* Иерархии состояний (каналы и устройства)

Объекты и текущий статус можно посмотреть в админке на вкладке «Объекты».

ID объекта состоит из разных частей. Каждая часть обозначена "." отделены друг от друга. Существуют системные объекты (идентификатор начинается с _ или "system.") И объекты адаптера (идентификатор начинается с имени адаптера. Номер экземпляра).

?> Примечание. Здесь в описании **имя адаптера** обозначает имя адаптера, который разработчик пытается создать.

Объекты можно сгруппировать по каналам и по каналам в устройствах. Вот пример устройств и каналов Homematic:

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

Идентификатор объекта всегда должен начинаться с идентификатора канала, а идентификатор канала - с идентификатора устройства. Например, в названии статуса hm-rpc.0.IEQ1234567.0.INFO часть hm-rpc.0.IEQ1234567.0 - это идентификатор канала, а hm-rpc.0.IEQ1234567 - это идентификатор устройства.

Это используется для настройки координации устройств, каналов и состояний в иерархиях.

?> Примечание: если адаптер не такой сложный, устройства и даже каналы можно не учитывать.

** Адаптер ** - это пакет файлов, который хранится в каталоге node_modules. Для каждого адаптера описание этого адаптера можно найти в объекте «system.adapter.adapterName». Это только поля «common» и «native» из файла io-package.json. Эта запись создается автоматически при вызове `iobroker install adapterName` или `iobroker add adapterName`. Если адаптер установлен с `npm install iobroker.adapterName`, запись не создается, пока не будет создан первый экземпляр. Но это не так уж важно. Информация, необходимая для «обновлений», читается непосредственно из io-package.json. Полный список общих настроек адаптера можно найти в [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

** Экземпляр ** - это экземпляр адаптера. В зависимости от типа адаптера может быть создано несколько экземпляров. С некоторыми переходниками только один, например Vis или Rickshaw. Это поведение контролируется флагами в io-package.json.

Для каждого экземпляра объект конфигурации находится в хранилище данных под идентификатором «system.adapter.adapterName.X», где X - номер экземпляра адаптера. Он содержит настройки для этого экземпляра адаптера. Обычно он состоит из «общих» и «родных» настроек. Общие настройки:

* `enabled`: истина / ложь;
* `host`: имя хоста, на котором должен запускаться этот экземпляр;
* `режим`: нет, демон, подписка, расписание, один раз;

Описание можно найти в [здесь](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md).

`Native` Настройки состоят из определенных конфигураций для этого адаптера, например Например: IP-адрес устройства, настройки устройства и т. Д.

?> Примечание. Экземпляры могут работать на разных хостах (несколько хостов), кроме того, адаптеры на разных хостах могут иметь разные версии.

Все идентификаторы объектов экземпляра адаптера начинаются с adaptername.X, где X - номер экземпляра адаптера.

Объекты бывают разных типов для разных целей.

Для каждого адаптера (не экземпляра) автоматически создаются следующие объекты:

* `system.adapter.adaptername`: Описание адаптера (например, имя, номер версии, ...)
* `имя адаптера`: Объект, состоящий из файлов HTML / JS / CSS из каталога« www »адаптера. Этот объект создается только в том случае, если каталог www находится в пакете адаптера.
* `adaptername.admin`: объект, состоящий из файлов HTML / JS / CSS из каталога« admin »пакета адаптера.

Для каждого экземпляра адаптера 'X' автоматически создаются следующие объекты:

* `system.adapter.adaptername.X`: Конфигурация экземпляра адаптера.
* `system.adapter.adaptername.X.alive`: указывает, активен ли экземпляр (отправлять сообщения каждые 30 секунд)
* `system.adapter.adaptername.X.connected`: указывает, подключен ли экземпляр к хранилищу данных. Он может быть подключен, но не может отправить живое сообщение из-за тупиковой ситуации.
* `system.adapter.adaptername.X.memHeapTotal`: общее использование памяти
* `system.adapter.adaptername.X.memHeapUsed`: использование памяти
* `system.adapter.adaptername.X.memRss`: использование памяти
* `system.adapter.adaptername.X.uptime`: секунды, в которых адаптер работает.

Пояснения к статусу памяти можно найти в [здесь](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for).

Если адаптер находится в режиме «нет» или «один раз», объекты «живые», «работоспособные» и т. Д. Не создаются.

** Структура каталогов адаптера **

Пакет адаптера должен содержать несколько обязательных каталогов и файлов:

* `admin` (обязательный каталог)
* `index.html`
* `xxx.png` - необязательно; лучше: `adaptername.png` (поддерживаются все форматы изображений: jpeg, jpg, svg, bmp, ...)
* `www` - (обязательный каталог)
* `lib` - (обязательный каталог из-за` utils.js`)
* `utils.js`
* `package.json` - обязательно
* `io-package.json` - обязательно
* `main.js` - обязательно (также может быть` adaptername.js`)

?> Примечание: lib / utils.js - это общий файл для всех адаптеров, с помощью которого можно определить положение js-контроллера и соответствующий путь к iobroker.js-controller / lib / adapter.js. Большинство текущих utils.js можно скачать здесь. Не меняйте этот файл!

## Имена файлов
Чтобы контроллер ioBroker принял и запустил адаптер, он должен соответствовать соглашению об именах.

* На github (или где-либо еще) он должен называться `io **B** roker.adapterName` (заглавная B).
* Если адаптер должен быть доступен в npm, он должен иметь имя iobroker.adaptername, поскольку npm не допускает использование заглавных букв в именах пакетов. Его можно определить в package.json
* HTML-файл графического интерфейса пользователя для настройки адаптера должен называться admin / index.html. В каталоге администратора может быть больше файлов, но index.html должен присутствовать.
* Файл запуска адаптера должен называться main.js или adaptername.js.
* Имя адаптера должно быть уникальным, строчными буквами, без специальных символов и без пробелов. В имени адаптера можно использовать «-», «_».

## Структура io-package.json
io-package.json используется js-контроллером для отображения информации об адаптере и для того, чтобы знать, как с ним обращаться. Полное описание всех полей в общей части можно найти [здесь] ().

io-package.json читает "администратор", чтобы узнать онлайн-версию адаптера.

### Общие поля
Наиболее важные общие поля:

* `name`: обязательно. Имя адаптера без «ioBroker.», Т.е. «имя адаптера», а не «ioBroker.adaptername»
* `version`: обязательно. Должен быть идентичен package.json.
* `title`: обязательно. Краткое название адаптера, например «имя адаптера».
* `desc`: необходимо. Описание адаптера. Это может быть строка типа «Этот адаптер делает то и то» или объект вроде:

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

Если нет записи для текущего языка, описание отображается на английском языке.

* `platform`: необходимо. В настоящее время поддерживается только `Javascript / Node.js`.
* `mode`: необходимо. Режим, в котором запускается адаптер.
* `enabled`: необязательно. Если true, экземпляр активируется после добавления.
* `license`: название лицензии, под которой лицензируется адаптер;
* `loglevel`: начальный уровень журнала, который устанавливается после создания экземпляра. Может быть отладка, информация, предупреждение или ошибка.
* `readme`: ссылка на страницу readme в Интернете. Используется адаптером администратора для отображения ссылки, когда "?" Нажата кнопка.
* `icon`: имя значка (а не путь) значка адаптера. Этот значок должен находиться в каталоге администратора адаптера.
* `extIcon`: путь к значку в Интернете для отображения значка адаптера, если адаптер еще не установлен.
* `ключевые слова`: ключевые слова в виде массива для включения поиска в адаптере администратора.
* `localLink`: Ссылка на файлы адаптера" www "(или сервер адаптера). "http://192.168.0.100"
* `type`: Возможны следующие типы:` hardware, social, storage, visual, api, scripting, weather, other, connection`.
* `messagebox`: необязательно. Должно быть установлено значение true, если адаптер должен получать системные сообщения.

?> Примечание: localLink может иметь специальные ключи, которые заменяются реальными значениями.

* `% ip%`: будет заменен IP-адресом, который был определен в первом "веб" экземпляре.
* `% field%`, где поле - это атрибут из `native` части конфигурации экземпляра адаптера.

Например, `http://%ip%:%port%` отображается как «http://192.168.0.1:8080», где «192.168.0.1» - это IP-адрес «веб-адаптера», а 8080 - это значение `system.adapter.adapterName.X => native.port`.

### Поля объекта
Объекты - статические объекты для всех экземпляров адаптера (xxx.object). Установив адаптер (а не создание экземпляра), некоторые предопределенные объекты (обычно что-то описывают) могут быть созданы автоматически. Эти объекты не должны зависеть от конкретного экземпляра и применяться ко всем экземплярам этого адаптера. Например, адаптер hm-rpc имеет описание структуры всех устройств HomeMatic.

Кроме того, можно определить новые представления. В SQL они называются «хранимой процедурой», а в представлениях couchDB.

?> Примечание. Не смешивайте представления с `vis`.

Для определений представлений используется язык Javascript. Пример:

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
Они возвращают набор объектов, отфильтрованных по условию просмотра из хранилища данных. Он может эффективно (при использовании CouchDB) запрашивать указанный список объектов.

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

?> Примечание. Использование представлений не является обязательным и требует от разработчика базовых знаний о CouchDB.

### Поля объекта экземпляра
Некоторые конкретные объекты или объекты с состояниями типа могут быть определены в `instanceObjects` `io-package.json`.

Для каждого созданного экземпляра создаются все записи из поля `instanceObjects`.

Например, адаптер `hm-rpc` создает статус `updated` для каждого экземпляра, чтобы передать сигнал другому адаптеру о том, что в хранилище данных появятся новые устройства и что они должны быть обработаны §§SSSSS_2 §§.

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

Необязательно указывать полный путь к объекту, и это невозможно, потому что экземпляр адаптера неизвестен.
Специальное слово `%INSTANCE%` в `common.name` может использоваться для обозначения его в названии объекта. Например:

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

Будет расширен до

```
"name": "Some new devices added in hm-rpc.0,
```

создав первый экземпляр.

### Package.json
package.json - это стандартный файл описания для пакета npm. Полное описание можно найти на https://docs.npmjs.com/files/package.json.

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

!> Все поля обязательны. `devDependencies` также должны быть внутри, чтобы разрешить задачи ворчания.

### Предоставлять
Рекомендуется разместить код на Github. После того, как код станет стабильным и адаптер может быть установлен, его можно использовать совместно с другими пользователями, попросив пользователей установить адаптер следующим образом:

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

Если все в порядке и положительные отзывы пользователей, адаптер можно опубликовать на npm.
Было бы хорошо, если бы заранее была публикация на github.

Публикация выполняется с помощью следующей команды:

```
npm publish
```

Его можно вызвать в каталоге адаптера. Убедитесь, что все остальные файлы, кроме необходимых, были удалены (например, `.idea`), или добавьте к файлу `.gitignore`.

Конечно, сначала необходимо создать учетную запись в npm.

?> Примечание. Код не может быть опубликован дважды с одной и той же версией. Поэтому увеличьте версию в `package.json` и `io-package.json` перед публикацией.

После того, как адаптер был протестирован и другие пользователи сочтут его полезным, его можно перенести в общий репозиторий, чтобы его можно было установить с помощью адаптера `admin`.

## Вот как вы создаете свой собственный адаптер
На https://github.com/ioBroker/ioBroker.template вы можете найти несколько шаблонов для использования в собственном адаптере.

Если необходимо создать виджет или адаптер с виджетом, их можно найти по адресу https://github.com/ioBroker/ioBroker.example/tree/master/VIS.

### Структура main.js
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

Эта строка загружает модуль `lib/utils.js`. Все функции адаптера имеют общее свойство находить корень `iobroker.js-controller`.
Потому что адаптер можно установить тремя разными путями:

* `... / iobroker / node_modules / iobroker.adapterName` - это путь по умолчанию и рекомендуется для использования
* `... / iobroker.js-controller / node_modules / iobroker.adapterName` - используется при отладке
* `... / iobroker.js-controller / adapter / adapterName` - старый стиль (устарел)

utils.js ничего не делает, кроме поиска файла `iobroker.js-controller/lib/adapter.js` и его загрузки.

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

Эта строка создает объект `adapter` с именем `adapterName`. Он загружает всю конфигурацию экземпляра `adapterName.X`, где X - номер экземпляра адаптера.

`js-controller` запускает адаптер как ветвь собственного процесса с двумя параметрами: уровень экземпляра и протокол; нравится:

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

В `adapter.js` все обрабатывается автоматически, и разработчику адаптера не нужно об этом беспокоиться.

Адаптер поддерживает 3 дополнительных стартовых флага:

* `--install` - запускает адаптер, даже если конфигурация недоступна. Используется адаптером для выполнения процесса установки путем установки адаптера.
* `--force` - запускает адаптер, даже если он отключен в конфигурации
* `--logs` - отображает журналы в консоли, если они отображаются только в таблице журналов.

```
var myPacket1= require('myPacket1'); // add own module
```

Затем все остальные модули, необходимые в адаптере, например B. Загружены `fs`, `require` и т. Д.
Не забудьте указать их в `package.json`.

### Опции адаптера
Объекты адаптера могут быть созданы только с такими именами, как `utils.adapter('adapterName')`, или со следующими дополнительными параметрами:

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

Все обработчики могут быть смоделированы событиями (см. Ниже), такими как

```
adapter.on('ready', function () {
    main();
});
```

### Атрибуты объекта адаптера
Как вы создали объект `adapter` с

```
var adapter = utils.adapter('adapterName');
```

В этом экземпляре объекта создаются следующие атрибуты:

* `name` - имя адаптера, например B. `имя_адаптера '
* `host` - имя хоста, на котором запущен экземпляр адаптера
* `instance` - номер экземпляра этого экземпляра адаптера
* `namespace` - пространство имен объектов адаптера, например B. `adapterName.0`
* `config` - родная часть настроек адаптера
* `common` - общая часть настроек адаптера
* `systemConfig` - содержимое` iobroker-data / iobroker.json` (только если `options.systemConfig = true`)
* `log` - объект логгера

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

!> *Точка входа* Все инициализации должны выполняться в основном, так как конфигурация не выполняется до "готовности".

```
adapter.on('ready', function () {
* main();
});
```

#### Протоколирование
Очень важно иметь возможность регистрировать события для отладки и контроля. Следующие функции могут использоваться для регистрации событий:

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

Нет необходимости указывать источник или время сообщения. Эти атрибуты добавляются автоматически, например

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

Конечно, также можно использовать `console.log`, `console.debug` или `console.error`, но эти сообщения видны только в том случае, если адаптер был запущен вручную в консоли или в среде программирования IDE.

#### Конфигурация экземпляра
Есть атрибут объекта адаптера для чтения конфигурации экземпляра: `adapter.config`.
Этот объект состоит из `native`, части объекта `system.adapter.adapterName.X`. Например, если `io-package.json` выглядит так:

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

Таким образом, `adapter.config` одинаковы:

```
{
   "location": "Stuttgart",
   "language": ""
}
```

и ввел данные от пользователя в диалоговом окне конфигурации. К **общей** части конфигурации экземпляра можно получить доступ с помощью атрибута «common» объекта «адаптер». Например, для показанного io-package.json это "adapter.common":

```
{
   "name": "adapterName"
}
```

Чтобы получить доступ к конфигурации ioBroker (сохраненной в файле `iobroker-data/iobroker.json`), установите для параметра адаптера `systemConfig` значение true.

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

Чтобы получить глобальный формат даты, для параметра `useFormatDate` необходимо установить значение true:

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

Формат даты доступен в разделе adapter.dateFormat.

Все остальные конфигурации можно прочитать вручную с помощью функции `getForeignObject`.

** Как читать состояние **

В адаптере ioBroker есть два режима чтения статуса:

* подписка на мероприятие (рекомендуется)
* опрос

Чтобы подписаться на собственные события, необходимо вызвать следующую команду:

`adapter.subscribeStates('*');` // Подпишется на все переменные этого экземпляра адаптера с шаблоном `adapterName.X.*`

`adapter.subscribeStates('memory*');` // Подпишется на все переменные этого экземпляра адаптера с шаблоном `adapterName.X.memory*`

Как подписаться на другие события:

`adapter.subscribeForeignStates('yr.*.forecast.html');` // переменная `forecast.html` подписывается на все экземпляры адаптера `yr`.

Заполнитель «*» можно использовать в обеих функциях.

После этого вы получите событие `stateChange` и сможете что-то сделать с этим значением.
После подписки вы не получите текущий статус, так как события происходят только при изменении.
Чтобы получить начальное состояние, вы должны выполнить «Запрос» один раз при запуске (обычно в событии «Готово»).

Опрос Чтобы прочитать свои собственные состояния в начале или прочитать значения с интервалом, используйте функцию `adapter.getState`, как здесь:

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

Чтобы прочитать статус других адаптеров, вы должны использовать функцию `adapter.getForeignState`. Подстановочные знаки не поддерживаются.

#### Команды и статусы
Говоря о статусах, следует различать команды и статусы. «Команда» имеет флаг подтверждения как false и отправляется пользователем (через vis, адаптер Javascript, администратор) для управления устройствами или конкретным адаптером. Обычно адаптеры (например, Homematic) подписываются на все свои собственные изменения, и если некоторые состояния изменяются с ack = false, они пытаются выполнить эту команду (например, загорается).

«Статус» имеет флаг `ack` как истинный и указывает, что он исходит от устройства или службы.
Например, если погодный адаптер получил новый прогноз погоды, он будет опубликован с `ack=true`, или, если термометр Homematic измеряет новую температуру, он также будет опубликован с `ack=true`.
Даже если пользователь физически включает свет, новый статус публикуется с `ack=true`.

`Ack=false` обычно перезаписываются путем выполнения после ответа от устройства.

Например, если пользователь нажал клавишу в `vis` и отправил команду `hm-rpc.0.kitchen.light=ON`.
Адаптер Socket-io отправляет новый статус с `kitchen.light = {val: 1, ack: false}` экземпляру `hm-rpc.0`.

Адаптер Homematic подписан на все состояния `hm-rpc.0`, и когда новое состояние получено с помощью `ack=false`, он отправляет новое значение на физический коммутатор.

Физический коммутатор выполняет команду и отправляет новый собственный статус ON адаптеру `hm-rpc`.
Адаптер `hm-rpc.0` публикует новый статус состояния `hm-rpc.0.kitchen.light={val: 1, ack: true}` (с отметками времени).

Это изменение не выполняется адаптером hm-rpc, потому что ack имеет значение true. А это подтверждение от физического устройства.

#### Как пишется государство?
Состояния можно записать как команды или как состояния. Для этого необходимо использовать `adapter.setState` и `adapter.setForeignState`:

`adapter.setForeignState('otherAdapter.X.someState', 1);` // Контроль других адаптеров (нет необходимости контролировать свой статус, мы можем сделать это напрямую)

`adapter.setState('myState', 1, true);` // установить новый статус собственного экземпляра

`adapter.setState('myState', {val: 1, ack: true});` // как указано выше

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

Примечание: следующие команды идентичны

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### Государственная структура
Состояние - это объект Javascript со следующими атрибутами:

* `val`: значение состояния (желаемое значение или фактическое значение)
* `ack`: флаг направления. false для желаемого значения и true для фактического значения. По умолчанию: false (команда)
* `ts`: Отметка времени как количество миллисекунд между полночью 1 января 1970 года и указанной датой. Результат метода getTime () объекта Javascript Date. По умолчанию: текущее время.
* `lc`: отметка времени последнего изменения. Тот же формат, что и ts, но отметка времени значения изменяется. Значение может быть обновлено, но значение останется прежним. В этом случае lc не меняется.
* `from`: Имя экземпляра адаптера, определяющего значение, например "system.adapter.web.0" (с vis)
* `expire`: (необязательно) Можно установить лимит времени истечения в секундах. По истечении этого времени переменная устанавливается на «ноль». Это, например, через «активные» состояния экземпляров адаптера. Если экземпляр адаптера не переходит в состояние «активен» в течение 30 секунд, он помечается как «отключен». Чтобы установить состояние с истечением срока действия, используйте следующий код setState ('Variable', {val: true, expire: 30})
* `q`: (необязательно) качество. Смотрите описание здесь

** Режимы работы адаптера **

Адаптер может работать в разных режимах. Режим адаптера можно определить с помощью атрибута common.mode.

* `none` - этот адаптер не запускается.
* `daemon` - всегда запущенный процесс (перезапускается, когда процесс завершается)
* `subscribe` - запускается при изменении статуса system.adapter ... alive на true. Завершается, когда .alive изменяется на false и устанавливает .alive в false при выходе из процесса (не перезапускается при выходе из процесса)
* `schedule` - запускается в соответствии с расписанием, найденным в system.adapter ... common.schedule - реагирует на изменения в .schedule путем перепланирования с новым статусом
* `once` - этот адаптер запускается каждый раз при изменении объекта system.adapter ... По завершении он не перезапустится.

Обычно адаптеры должны использовать демон режима.

Если адаптер проверяет что-то только каждые X минут, он должен использовать режим `schedule` и вместе определить расписание cron (например, `1 * * * *` - каждый час).

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

Объекты адаптера должны быть организованы по устройствам, каналам и состояниям.

См .: getForeignObjects, findForeignObject, getForeignObject, getDevices, getChannels, getStatesOf

#### Как пишется объект?
Обычно для записи объектов можно использовать две функции: `setObject, setForeignObject`. Однако есть много вспомогательных функций для изменения объектов:

* `extendObject, extendForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `createDevice, deleteDevice`
* `createChannel, deleteChannel`
* `createState, deleteState`
* `addStateToEnum, deleteStateFromEnum`

extendObject только читает объект, сливается с конкретным объектом и записывает объект обратно.

Разница между `xxxObject` и `xxxForeignObject` заключается в том, что `xxxObject` автоматически добавляет текст `adapter.instance.` к идентификатору объекта.

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

#### Info.connection
Когда адаптер устанавливает соединение и выполняет мониторинг (например, с управляемым устройством), он должен создать переменную `info.connection` и ждать.

В этом случае статус подключения отображается в списке экземпляров в `admin`. При желании качество статуса зависит от статуса подключения.

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
Перед публикацией в npm: скопируйте в ioBroker / node_modules, перейдите к `admin` и добавьте экземпляр. После публикации в npm: перейдите к `ioBroker/` и напишите `npm install iobroker.xxx --production --no-optional --logevel=error`, перейдите к `admin` и добавьте.

## Вот как происходит отладка
* Запустите ioBroker
* Добавить экземпляр адаптера
* Деактивировать экземпляр адаптера
* Запустить WebStorm
* Создайте конфигурацию для отладки с помощью node.js.
* Флаги для приложения: `--force, instance, log level` (вы можете запустить адаптер как` node xxx.js 1 Debug --force`, 1 - индекс экземпляра (по умолчанию 0, Debug - уровень журнала и` - -force `означает , что настройки«включены: ложь». будет игнорироваться)

## Admin.html
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

## Лучшая практика