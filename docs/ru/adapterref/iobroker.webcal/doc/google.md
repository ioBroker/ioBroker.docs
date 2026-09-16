---
chapters: {"pages":{"en/adapterref/iobroker.webcal/README.md":{"title":{"en":"ioBroker.webcal"},"content":"en/adapterref/iobroker.webcal/README.md"},"en/adapterref/iobroker.webcal/doc/google.md":{"title":{"en":"Google Calendar API"},"content":"en/adapterref/iobroker.webcal/doc/google.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webcal/doc/google.md
title: API календаря Google
hash: 8+BTC7koMqce+JLa2ig3nyihvZ9XQSgaHhT4Yh/9+mY=
---
# API календаря Google

См. <https://developers.google.com/calendar/caldav/v2/guide>

- Войдите в систему на странице [https://console.developers.google.com/projectselector/apis/credentials.](https://console.developers.google.com/projectselector/apis/credentials)
- Нажмите «Создать проект».[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/Utkgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/Utkgrafik.png)

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/Fb0grafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/Fb0grafik.png)

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/xPmgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/xPmgrafik.png)

Настройка экрана согласия

- UserType внешний

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/KUcgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/KUcgrafik.png)

- для использования названия приложения`ioBroker.webCal`
- Выберите свой адрес электронной почты для связи со службой поддержки и разработчиками.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/zvAgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/zvAgrafik.png)

- Нажмите кнопку «Сохранить» три раза
- вернуться на доску объявлений
- Настройте публикацию на производственный режим

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/vmpgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/vmpgrafik.png)

Нажмите кнопку "+ создать учетные данные" и добавьте новый идентификатор клиента OAuth.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/2Hcgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/2Hcgrafik.png)

- тип Веб-приложение
- имя`ioBroker.webCal`
- Разрешенные URI перенаправления:`https://developers.google.com/oauthplayground`
- Нажмите кнопку «Создать» и загрузите JSON на следующем экране.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/kUXgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/kUXgrafik.png)

- Нажмите «Библиотека» в боковом меню.
- Найдите "webdav" и нажмите на плитку с результатами поиска.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/S5sgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/S5sgrafik.png)

- Нажмите «Включить», чтобы активировать API CalDAV.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/VCigrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/VCigrafik.png)

Открытая [площадка для тестирования OAuth 2.0](https://developers.google.com/oauthplayground/)

- Нажмите кнопку «Настройка OAuth 2.0» в правом верхнем углу.
- Выбирать`Use your own OAuth credentials` Внизу укажите значения Client ID и Client Secret из JSON-файла.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/CCZgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/CCZgrafik.png)

- закрыть

- В разделе «Шаг 1» слева найдите Google Календарь и нажмите на него.\
  `https://www.googleapis.com/auth/calendar` и[`https://www.googleapis.com/auth/calendar.events`](https://www.googleapis.com/auth/calendar.events)\
  [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/tsLgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/tsLgrafik.png)

- Нажмите на кнопку «Авторизовать API».
  - Теперь вам нужно принять себя и поверить в себя... (возможно, вам придётся нажать на «Расширенные настройки»)
  - [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/0Elgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/0Elgrafik.png)

    [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/8hMgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/8hMgrafik.png)

- Нажмите`Button Exchange authorization code for tokens` на шаге 2\
  [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/LW2grafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/LW2grafik.png)

- Здесь нам нужен токен обновления.

Используйте следующие настройки в ioBroker.

- auth Methold = google
- Секрет = Секрет клиента (из JSON-файла)
- токен обновления = который вы получаете выше
- Идентификатор клиента = ваш идентификатор клиента (из JSON-файла)