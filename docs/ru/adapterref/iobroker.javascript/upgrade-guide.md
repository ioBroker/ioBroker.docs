---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/upgrade-guide.md
title: Руководство по обновлению
hash: 419X0Zch8gHqehaZE1IsqpfUeQSR8YCsQdZ4zzqWFaE=
---
# Руководство по обновлению
## Запрещенные каталоги для зеркалирования файловой системы скрипта
**Начиная с версии 5.5.0 адаптера JavaScript** не допускается использование следующих расположений (относительно базового каталога ioBroker, обычно `/opt/iobroker`):

* Сам базовый каталог ioBroker и любой путь выше!
* Сам `./iobroker-data`, пользовательский подкаталог (выберите имя, которое не пересекается ни с одним адаптером!)
* `./iobroker-data/backup-objects` или что-нибудь ниже
* `./iobroker-data/files` или что-нибудь ниже
* `./iobroker-data/backitup` или что-нибудь ниже
* `./backups` или что-нибудь ниже
* `./node_modules` или что-нибудь ниже
* `./log` или что-нибудь ниже

Зеркальное отображение файловой системы скриптов сохранит все исходные файлы скриптов в вашей файловой системе и позволит вам редактировать файлы в вашем любимом редакторе скриптов рядом с веб-редактором. Все изменения синхронизируются в обоих направлениях.

При включении зеркалирования системы файлов скриптов обязательно создайте **выделенный новый каталог** и **не** используйте существующий каталог с другим содержимым.
Также убедитесь, что никакой другой скрипт или процесс не изменяет файлы в предоставленном каталоге, чтобы предотвратить проблемы с доступом.
Любое местоположение должно быть доступно для записи пользователю "iobroker"!

## Запрос к httpGet
**Начиная с версии 8.0.0 адаптера JavaScript** пакет `request` устарел, и его использование в ваших скриптах вызовет предупреждение.
Адаптер JavaScript должен удалить пакет в какой-то момент.
Чтобы максимально упростить миграцию, песочница предоставляет новую функцию для запроса ресурсов HTTP.

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

1. Удалить импорт пакета `request`
2. Используйте собственный метод `httpGet` (подробности см. в документации)
3. Обновить параметры функции обратного вызова
4. Заменить `body` на `response.data`

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

### Блочно
- Блок `request` поддерживал только HTTP GET (другие методы не поддерживались) - замените блок на `http (GET)`
- Для использования ответа требовалось создать пользовательскую переменную с именем `result`. Теперь это не требуется. Удалите переменную и используйте выделенный блок для работы с параметрами результата (как в блоках триггеров).

![Блочный запрос к httpGet](../../../en/adapterref/iobroker.javascript/img/upgrade-guide/request-httpGet.png)