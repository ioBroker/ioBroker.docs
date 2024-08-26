---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.notificationforandroidtv/README.md
title: ioBroker.notificationforandroidtv — интеграция для Android TV/Fire TV
hash: YI6BFufhPQmA6Z0Uq+gCBtF2K4JJ1ZLP1TLPqIHvfZA=
---
![Логотип](../../../en/adapterref/iobroker.notificationforandroidtv/admin/notificationforandroidtv.png)

![НПМ](https://nodei.co/npm/iobroker.notificationforandroidtv.png?downloads=true)

# IoBroker.notificationforandroidtv — интеграция для Android TV/Fire TV
Интеграция уведомлений для ioBroker включает поддержку уведомлений для [Android TV](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google) и уведомления для [Fire TV](https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK). Благодаря этой интеграции вы можете отправлять уведомления на свое устройство Android TV. Он включает наложение, отображающее содержимое сообщения в течение настраиваемого периода времени, прежде чем оно исчезнет. Кроме того, он поддерживает отправку изображений, например, с камер наблюдения, и пользовательских значков. Значки функционируют аналогично изображениям: они кажутся меньше и располагаются слева от уведомления, а изображения отображаются крупнее и над уведомлением.

Эти уведомления действуют в пределах вашего устройства Android TV и появляются независимо от активного приложения.

Во время установки обратите внимание, что существует два разных приложения: одно для вашего смартфона (которое не обязательно для этой платформы), а другое для вашего устройства Android TV для получения уведомлений. Приложение, необходимое для отображения уведомлений, отправленных от ioBroker, доступно в магазине вашего устройства Android TV. Любые покупки в приложении доступны исключительно клиенту для смартфонов Android и не ограничивают отправку уведомлений от ioBroker.

Начиная с версии 3.0.0, наша интеграция уведомлений также поддерживает [ПиПуп](https://github.com/rogro82/PiPup). PiPup можно использовать для передачи видеопотоков, например, с камер, или для наложения веб-сайтов на экран Android TV. Он представляет собой универсальное решение для плавной интеграции различного контента в ваш Android TV.

## Описание
Интеграция уведомлений для ioBroker поддерживает отправку уведомлений на устройства Android TV и Fire TV. Эта интеграция позволяет отображать настраиваемые наложения сообщений на экране телевизора в течение заданного времени. Кроме того, он может отображать изображения, например, с камер видеонаблюдения, и пользовательские значки. Кроме того, он представляет новую функцию для беспрепятственной потоковой передачи видео и веб-контента на ваш Android TV или устройство Fire TV. Это означает, что вы можете использовать PiPup для трансляции видеопотоков, например, с камер, или наложения веб-сайтов прямо на экран телевизора.

## Шаги установки:
### 1. Настройки адаптера:
- Зайдите в настройки адаптера в интерфейсе ioBroker.
- Добавьте IP-адреса целевых устройств и дайте им имена для идентификации.

### 2. Загрузите приложение на свой Android TV/Fire TV:
– Загрузите приложение «Уведомления для Android TV» для устройств Android TV из [Google Play](https://play.google.com/store/apps/details?id=de.cyberdream.androidtv.notifications.google).
- Загрузите приложение «Уведомления для Fire TV» для устройств Fire TV с [Amazon] (https://www.amazon.com/Christian-Fees-Notifications-for-Fire/dp/B00OESCXEK).
- **Только PiPup**. См. руководство по установке на странице 5.

### 3. Создание объектов со следующими настройками для уведомлений для Android TV и уведомлений для Fire TV
| Настройка | Описание | Пример значения |
| -------------- | ------------------------------------------- | ------------------------- |
| продолжительность | Продолжительность отображения в секундах | 10 с |
| IP | IP-адрес ТВ-устройства | 192.168.0.100 |
| сообщение | Сообщение для отправки | «Тестовое сообщение» |
| позиция | Позиция на экране телевизора | 0 = "НИЖНЕЕ_ПРАВО" |
| титул | Название сообщения | «Важное уведомление» |
| прозрачность | Прозрачность наложения | 25 |
| тип | Тип отображения наложения | Стандартный, ONLY_TITLE, ONLY_ICON |
| цвет | Цвет | синий, зеленый,... |
| ширина | Размер наложения | маленький, xxl,... |
| значок | Выбор значка | ! ? :-) |
| значок URL | URL-адрес значка | http://192.168.20.111/myIcon.png |
| удалить_значок | Очистить URL-адрес значка после отправки | правда/ложь |
| URL-адрес изображения | URL-адрес изображения | http://192.168.20.111/myImage.png |
| удалить_изображение | Очистить URL-адрес изображения после отправки | правда/ложь |
| полезная нагрузка | json object |{"msg":"мое сообщение","bkgcolor": "7","title": "мой заголовок"} ,... продолжительность,позиция,ширина,прозрачность,тип,значок,iconurl,imageurl |

### 3.1 Создание объектов со следующими настройками для PiPup
#### Подпапка PiPup для каждого устройства
| Настройка | Описание | Пример значения |
| -------------- | ------------------------------------------- | ------------------------- |
| продолжительность | Продолжительность отображения в секундах | 10 с |
| сообщение | Сообщение для отправки | «Тестовое сообщение» |
| позиция | Позиция на экране телевизора | 0 = "Верхний правый" |
| титул | Название сообщения | «Важное уведомление» |
| сообщениеЦвет | Цветовое сообщение | #E11AE7 |
| заголовокЦвет | Цветовой код заголовка | #1AE730 |
| сообщениеЦвет | Цветовой код фона | #711AE7 |
| заголовокРазмер | размер из названия | 20 |
| размер сообщения | размер из сообщения | 18 |
| прозрачность | Прозрачность наложения | 25 |
| ширина | ширина изображения/сети/видео | 640 пикселей |
| высота | высота паутины | 480 пикселей |
| URL | URL-адрес потока | http://192.168.20.111/myImage.png |
| тип | тип потока | изображение/веб/видео |
| полезная нагрузка | json object |{"duration": 30,"position": 0,"title": "Ваш потрясающий заголовок","titleColor": "#0066cc","titleSize": 20,"message": "Все, что вы хотите сказать... сделайте это здесь...","messageColor": "#000000","messageSize": 14,"backgroundColor": "#ffffff","media": { "image": {"uri" : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cfcc3137009463.5731d08bd66a1.png", "ширина": 480}}} |

### 4. Отправка сообщений:
- Как только сообщение будет введено в объект «сообщение» или в раздел «полезная нагрузка», оно будет отправлено на ТВ-устройство. Полезная нагрузка использует только IP-адрес объектов; остальное должно быть передано через объект полезной нагрузки.
- То же самое касается и PiPup; здесь URL-адрес также передается при вводе сообщения.

### 5. Руководство по установке PiPup
## Для пользователей Android TV
Следуйте инструкциям [PiPup на GitHub](https://github.com/rogro82/PiPup) для Android TV.

## Для Fire TV или другого Android TV без Google Play Store
1. Установите на свой смартфон такое приложение, как [atvTools](https://apps.apple.com/us/app/atvtools/id1661419573).
2. Загрузите [APK-файлы PiPup] (https://github.com/desertblade/PiPup/releases) на свой смартфон.
3. Перенесите файлы APK на свой Android TV.

### Использование команд adb
4. Откройте командную консоль на своем смартфоне.

5. Выполните следующую команду, чтобы предоставить разрешение SYSTEM_ALERT_WINDOW:

```bash
adb shell appops set nl.rogro82.pipup SYSTEM_ALERT_WINDOW allow
`

Убедитесь, что ваш Android TV подключен к той же сети, что и ваш смартфон, и на вашем Android TV включен [варианты разработчика](https://www.firesticktricks.com/developer-options-firestick.html).

Теперь вы сможете использовать PiPup на своем Fire TV или другом Android-телевизоре без Google Play Store.

## Changelog
### 3.0.4 (2024-04-24)
* (DNAngel/mcm1957) Release merges

### 3.0.3 (2024-02-16)
* (DNAngel) audit fixes

### 3.0.1 (2024-01-27)
* (DNAngel) typo fix

### 3.0.0 (2024-01-27)
* (DNAngel) added support for [PiPup](https://github.com/rogro82/PiPup) video and web stream

### 2.4.0 (2024-01-25)
* (DNAngel) change requests for official release by @mcm1957 & @Apollon77

### 2.3.1 (2024-01-12)
* (DNAngel) payload bugfix

### 2.3.0 (2024-01-08)
* (DNAngel) extended payload possibility as message object

### 2.2.2 (2024-01-01)
* (DNAngel) Stable release

### 2.2.0 (2023-12-22)
* (DNAngel) translations for official release

### 2.1.2 (2023-12-21)
* (DNAngel) small small translation issues

### 2.1.1 (2023-12-21)
* (DNAngel) device name added

### 2.1.0 (2023-12-21)
* (DNAngel) color added
* (DNAngel) icon & icon_url added
* (DNAngel) image & image_url added

### 2.0.3 (2023-12-18)
* (ldittmar81) Typo fix

### 2.0.2 (2023-12-18)
* (DNAngel) Ui Button fixed

### 2.0.1 (2023-12-18)
* (DNAngel) Design changes & description

### 2.0.0 (2023-12-18)
* (DNAngel) initial release

## License
MIT License

Copyright (c) 2024 DNAngel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
