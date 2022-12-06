---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/my-data-diy.md
title: ioBroker.lametric
hash: hMoft1ysQhW0Ac/z37JxOmvupWpRqaB7ADkkfeGrqSc=
---
![логотип](../../../de/admin/lametric.png)

# IoBroker.lametric
## Мои данные (сделай сам) *(требуется адаптер версии >= 1.1.0)*
*LaMetric* предлагает (через встроенный магазин приложений) дополнительное приложение для отображения вашей собственной информации. Это приложение называется [Мои данные своими руками](https://apps.lametric.com/apps/my_data__diy_/8942). Этот адаптер создает точку данных в требуемом формате.

Для передачи этих данных в *LaMetric Time* можно использовать различные адаптеры:

- Веб-адаптер (рекомендуется) * (требуется версия адаптера >= 2.1.0)*
- Адаптеры REST API
- Простые адаптеры API

### Веб-адаптер (рекомендуется)
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Web Adapter <- My Data DIY App <- LaMetric```

1. Установите [адаптер Web ioBroker] (https://github.com/ioBroker/ioBroker.web)
2. Создайте новый экземпляр веб-адаптера (например, ``web.0``)
3. Настройте порт нового веб-экземпляра (например, ``8082``)
4. Установите приложение *My Data DIY* на *LaMetric Time* через магазин приложений.
5. Откройте настройки приложения *Мои данные (DIY)* и настройте URL-адрес адаптера REST API (см. ниже).
6. Зайдите в настройки адаптера и добавьте новые кадры со своей информацией (см. следующий раздел)
7. Не забудьте выбрать ранее настроенный веб-экземпляр!

```
http://172.16.0.219:8082/lametric.0/
```

### Адаптер REST API
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker REST API Adapter <- My Data DIY App <- LaMetric```

#### Конфигурация (с аутентификацией)
1. Установите [Адаптер REST API ioBroker] (https://github.com/ioBroker/ioBroker.rest-api)
2. Создайте нового пользователя ioBroker с именем lametric и собственным паролем (например, HhX7dZl3Fe).
3. Добавьте нового пользователя lametric в группу пользователей.
4. Установите приложение *My Data DIY* на *LaMetric Time* через магазин приложений.
5. Откройте настройки приложения *Мои данные (DIY)* и настройте URL-адрес адаптера REST API (см. ниже).
6. Зайдите в настройки адаптера и добавьте новые кадры со своей информацией (см. следующий раздел)

```
http://lametric:HhX7dZl3Fe@172.16.0.219:8093/v1/state/lametric.0.mydatadiy.obj/plain?extraPlain=true
```

**Замените пример IP, порта, имени пользователя и пароля в URL-адресе!**

### Простой адаптер API
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Simple API Adapter <- My Data DIY App <- LaMetric```

#### Конфигурация (с аутентификацией)
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

**Замените пример IP, порта, имени пользователя и пароля в URL-адресе!**

#### Конфигурация (без аутентификации)
1. Установите [Адаптер Simple API ioBroker] (https://github.com/ioBroker/ioBroker.simple-api)
2. Установите приложение *My Data DIY* на *LaMetric Time* через магазин приложений.
3. Откройте настройки приложения *Мои данные (DIY)* и настройте URL-адрес простого адаптера API (см. ниже).
4. Зайдите в настройки адаптера и добавьте новые кадры со своей информацией (см. следующий раздел)

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**Важно: используйте флаг json адаптера SimpleAPI (доступен, начиная с версии 2.6.2)**

**Замените образец IP и порт в URL!**

### Конфигурация кадра
- Добавьте столько кадров, сколько хотите, с помощью кнопки «плюс»
- Значок: выберите значок на [официальном сайте] (https://developer.lametric.com/icons) и вставьте идентификатор в поле. **Важно: Используйте i (для статических символов) или a (для анимированных символов) в качестве префикса идентификатора (пример: `i3389`)**
- Текст: введите любой текст для отображения. Вы можете получить информацию из точек данных, заключив их идентификатор в фигурные скобки. Затем в этой точке используется текущее значение точек данных. (Пример: `{youtube.0.channels.HomeAutomationCom.statistics.subscriberCount} подписчиков`)
- Продолжительность: указывает, как долго должен отображаться каждый кадр (по умолчанию = 5 секунд).

Пример конфигурации некоторых кадров:

![пример конфигурации кадра](../../../de/adapterref/iobroker.lametric/img/my-data-diy.png)

![пример конфига айфона](../../../de/adapterref/iobroker.lametric/img/my-data-diy-iphone.png)