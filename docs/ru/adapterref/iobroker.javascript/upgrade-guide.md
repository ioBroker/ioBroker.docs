---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/upgrade-guide.md
title: Руководство по обновлению
hash: o2Eb9G64jS09GCXeuuf0Re3XwktoidGHb+SLICVLxHk=
---
# Руководство по обновлению
## Запрещенные каталоги для зеркалирования файловой системы скриптов
**Начиная с версии 5.5.0 адаптера JavaScript**, следующие расположения (относительно базового каталога ioBroker, обычно `/opt/iobroker`) не допускаются к использованию:

* Базовый каталог ioBroker и любой указанный выше путь!
* `./iobroker-data` — это собственный подкаталог (выберите имя, которое не пересекается ни с одним адаптером!)
* `./iobroker-data/backup-objects` или любой другой вариант ниже.
* `./iobroker-data/files` или любой другой файл, расположенный ниже.
* `./iobroker-data/backitup` или любой другой вариант ниже
* `./backups` или что-либо ниже
* `./node_modules` или любой другой код ниже
* `./log` или что-либо ниже

Функция зеркального отображения файловой системы скриптов позволит хранить все исходные файлы скриптов в вашей файловой системе и редактировать их в вашем любимом редакторе скриптов наряду с веб-редактором. Все изменения синхронизируются в обоих направлениях.

При включении зеркалирования файлов скриптов убедитесь, что вы создали **выделенную новую директорию** и **не** используйте существующую директорию с другим содержимым.
Также убедитесь, что никакие другие скрипты или процессы не изменяют файлы в указанной директории, чтобы предотвратить проблемы с доступом.
Любое местоположение должно быть доступно для записи пользователю "iobroker"!

Синхронизация происходит в обе стороны, включая удаления: **когда папка исчезает из зеркального каталога, содержащиеся в ней скрипты удаляются из базы данных ioBroker.** Таким образом, любая другая операция записи в эту папку — резервное копирование, очистка, развертывание — может удалить ваши скрипты. Только если зеркальный каталог в целом становится недоступным, например, из-за того, что общий ресурс не смонтирован, скрипты сохраняются, и каталог снова записывается при следующем запуске.

## Запрос к httpGet
**Начиная с версии 8.0.0 адаптера JavaScript** пакет `request` устарел, и его использование в ваших скриптах вызовет предупреждение.
Адаптер JavaScript должен в какой-то момент отказаться от этого пакета.
Чтобы максимально упростить миграцию, в песочнице предоставляется новая функция для запроса HTTP-ресурсов.

### JavaScript
Пример кода:

```js
const request = require('request');

schedule('*/30 * * * *', () => {
    const options = ;

    request({ url: 'https://api.forecast.solar/estimate/', method: 'GET' }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const resObj = JSON.parse(body);

            // ...
        }
    });
});
```

Миграция:

1. Удалите импорт пакета `request`.
2. Используйте встроенный метод `httpGet` (подробности см. в документации).
3. Обновите параметры функции обратного вызова.
4. Замените `body` на `response.data`.

```js
schedule('*/30 * * * *', () => {
    httpGet('https://api.forecast.solar/estimate/', (err, response) => {
        if (err) {
            console.error(err);
        } else if (response.statusCode == 200) {
            const resObj = JSON.parse(response.data);

            // ...
        }
    });
});
```

### Блокли
- Блок `request` поддерживал только HTTP GET (другие методы не поддерживались) - замените блок на `http (GET)`
— Ранее требовалось создать пользовательскую переменную с именем `result` для использования полученного ответа. Теперь это не нужно. Удалите переменную и используйте специальный блок для работы с параметрами результата (как в блоках-триггерах).

![Блокировка запроса к httpGet](../../../en/adapterref/iobroker.javascript/img/upgrade-guide/request-httpGet.png)