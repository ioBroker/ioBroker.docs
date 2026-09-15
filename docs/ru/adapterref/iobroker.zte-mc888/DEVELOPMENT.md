---
chapters: {"pages":{"en/adapterref/iobroker.zte-mc888/README.md":{"title":{"en":"ioBroker.zte-mc888"},"content":"en/adapterref/iobroker.zte-mc888/README.md"},"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zte-mc888/DEVELOPMENT.md
title: Примечания к разработке
hash: hTfwKa4rn88QgZq5fTylANMUipIbJlv+k+El79/YXzM=
---
# Примечания к разработке

Эти примечания предназначены для участников проекта. Пользователям адаптера ничего из этого не требуется — установите адаптер через административный интерфейс ioBroker.

## Требования

- Node.js >= 22
- npm

## Настройка и тестирование

```bash
npm install               # install dependencies (incl. the test framework)
npm test                  # unit tests + package validation
npm run test:js           # only the unit tests (fields + zteClient, no router needed)
npm run test:package      # validate package.json / io-package.json
npm run test:integration  # boot the adapter in a temporary js-controller
npm run lint              # ESLint (@iobroker/eslint-config)
npm run check             # type check the JavaScript sources via JSDoc (tsc --noEmit)
```

Модульные тесты выполняются полностью в автономном режиме: [test/zteClient.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/zteClient.test.js) запускает локальный имитирующий HTTP-сервер, который эмулирует работу маршрутизатора.`goform` API, поэтому настоящий ZTE MC888 не требуется. Интеграционный тест загружает и запускает реальный js-контроллер во временную директорию (для первого запуска требуется доступ к интернету).

## API маршрутизатора

Адаптер считывает локальные данные маршрутизатора.`goform` HTTP API (`/goform/goform_get_cmd_process` Процесс авторизации использует`LOGIN_MULTI_USER` с`AD` токен (`MD5( MD5(cr_version + wa_inner_version) + RD )` ) и хеш пароля`SHA256( SHA256(password) + LD )` См. [lib/zteClient.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/zteClient.js) .

Маршрутизатор обрабатывает лишь несколько полей (тип сети и основной RSRP/RSSI) без аутентификации; для всего остального требуется сессия, и маршрутизатор разрешает только одну сессию на пользователя — повторный вход в систему автоматически отключает первую. Обработка сессий и механизм "веб-интерфейс имеет приоритет" реализованы в`poll()` в [файле main.js.](https://github.com/muraus/ioBroker.zte-mc888/blob/main/main.js)

## Добавление полей для другой прошивки

Названия исходных полей различаются в зависимости от версии прошивки. Чтобы добавить поддержку прошивки:

1. Запустите экземпляр с уровнем логирования.`debug` — Исходные данные JSON маршрутизатора записываются в лог при каждом опросе.
2. Добавьте или отредактируйте запись в [файле lib/fields.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/fields.js) (`cmd` — это исходное имя поля.`id` (идентификатор состояния ioBroker) и расширьте тесты в [файле test/fields.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/fields.test.js) .
3. Создайте запрос на слияние (pull request) с указанием версии прошивки, которую вы тестировали.

Пожалуйста, не обновляйте установленный адаптер локально — изменения будут перезаписаны при следующем обновлении, и никто другой от них не получит выгоды.

## Выпускать

Релизы создаются с помощью [@alcalzone/release-script](https://github.com/AlCalzone/release-script) :

```bash
npm run release -- patch   # or minor / major
```

Журнал изменений ведется в`## Changelog` раздел файла [README.md](/#/adapters/zte-mc888) ; скрипт выпуска копирует его в`io-package.json` .