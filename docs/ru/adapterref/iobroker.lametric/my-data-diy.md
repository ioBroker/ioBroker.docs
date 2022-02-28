---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/my-data-diy.md
title: ioBroker.lametric
hash: 09v28Es4lPeVPPPbl6LNyafmkRVelSq/5QwgV4Vlp6g=
---
![логотип](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
## Мои данные (сделай сам) *(версия > 1.1.0)*
*LaMetric* предлагает (через встроенный магазин приложений) дополнительное приложение для отображения вашей собственной информации. Это приложение называется [Мои данные своими руками](https://apps.lametric.com/apps/my_data__diy_/8942). Этот адаптер создает точку данных в требуемом формате.
Вы можете использовать Simple API Adapter для передачи данных в LaMetric Time.

```ioBroker LaMetric Adapter -> State with Frame information <- Simple API Adapter <- My Data DIY App <- LaMetric```

### Конфигурация (с аутентификацией)
1. Установите [Адаптер Simple API ioBroker] (https://github.com/ioBroker/ioBroker.simple-api)
2. Создайте нового пользователя ioBroker с именем lametric и собственным паролем (например, HhX7dZl3Fe).
3. Добавьте нового пользователя lametric в группу пользователей.
4. Установите приложение *My Data DIY* на *LaMetric Time* через магазин приложений.
5. Откройте настройки приложения *Мои данные (DIY)* и настройте URL-адрес простого адаптера API (см. ниже).
6. Зайдите в настройки адаптера и добавьте новые кадры со своей информацией (см. следующий раздел)

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json&user=lametric&pass=HhX7dZl3Fe
```

**Важно: используйте флаг json адаптера SimpleAPI (доступен, начиная с версии 2.6.2)**

**Убедитесь, что IP, порт, имя пользователя и пароль в URL указаны правильно!**

### Конфигурация (без аутентификации)
1. Установите [Simple API ioBroker Adapter] (https://github.com/ioBroker/ioBroker.simple-api)
2. Установите приложение *My Data DIY* на *LaMetric Time* через магазин приложений.
3. Откройте настройки приложения *Мои данные (DIY)* и настройте URL-адрес простого адаптера API (см. ниже).
4. Зайдите в настройки адаптера и добавьте новые кадры со своей информацией (см. следующий раздел)

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**Убедитесь, что IP-адрес и порт в URL указаны правильно!**

### Конфигурация фрейма *(Версия > 1.1.0)*
- Добавьте столько кадров, сколько хотите, с помощью кнопки «плюс»
- Значок: выберите значок на [официальном сайте] (https://developer.lametric.com/icons) и вставьте идентификатор в поле. **Важно: Используйте i (для статических символов) или a (для анимированных символов) в качестве префикса идентификатора (пример: `i3389`)**
- Текст: введите любой текст для отображения. Вы можете получить информацию из точек данных, заключив их идентификатор в фигурные скобки. Затем в этой точке используется текущее значение точек данных. (Пример: `{youtube.0.channels.HomeAutomationCom.statistics.subscriberCount} подписчиков`)

Пример конфигурации некоторых кадров:

![пример конфигурации кадра](../../../de/adapterref/iobroker.lametric/./my-data-diy.png)