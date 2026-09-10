---
chapters: {"pages":{"en/adapterref/iobroker.iot/README.md":{"title":{"en":"ioBroker IoT Adapter"},"content":"en/adapterref/iobroker.iot/README.md"},"en/adapterref/iobroker.iot/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.iot/doc/ifttt.md"},"en/adapterref/iobroker.iot/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.iot/doc/tasker.md"},"en/adapterref/iobroker.iot/doc/alisa.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.iot/doc/alisa.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/doc/tasker.md
title: без названия
hash: FWxIuY41WZGIMo9yUNMICoq3G1tGcwgiI1UeD6kHp9Y=
---
## Использование Tasker для отправки координат в ioBroker

### Установите Tasker

Установите Tasker на свой Android-телефон отсюда: <https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm>

### Настроить Tasker

#### Создать задачу

![Шаг 1](../../../../en/adapterref/iobroker.iot/doc/tasker1.png)

Добавьте задачу и назовите её "Гео".

![Шаг 2](../../../../en/adapterref/iobroker.iot/doc/tasker2.png)

![Шаг 3](../../../../en/adapterref/iobroker.iot/doc/tasker3.png)

![Шаг 4](../../../../en/adapterref/iobroker.iot/doc/tasker4.png)

![Шаг 5](../../../../en/adapterref/iobroker.iot/doc/tasker5.png)

Настройки по умолчанию подходят. Оставьте без изменений.

![Шаг 6](../../../../en/adapterref/iobroker.iot/doc/tasker6.png)

![Шаг 7](../../../../en/adapterref/iobroker.iot/doc/tasker7.png)

![Шаг 8](../../../../en/adapterref/iobroker.iot/doc/tasker8.png)

![Шаг 9](../../../../en/adapterref/iobroker.iot/doc/tasker9.png)

Запишите в **server:port**`https://iobroker.pro` или`https://iobroker.net`

Записать в **путь**`/service/custom_position/<app-key>/%LOC` Ссылку можно найти в настройках облачного экземпляра.

![Шаг 10](../../../../en/adapterref/iobroker.iot/doc/tasker10.png)

Не забудьте добавить название пользовательского сервиса в белый список (в нашем случае это «позиция»), или просто «\*», чтобы разрешить все сервисы.

![Шаг 11](../../../../en/adapterref/iobroker.iot/doc/tasker11.png)

![Шаг 12](../../../../en/adapterref/iobroker.iot/doc/tasker12.png)

После создания задачи протестируйте её, и должность должна отобразиться в административной панели.

#### Создать профиль

Запускать задачу каждые 10 минут.

![Шаг 13](../../../../en/adapterref/iobroker.iot/doc/tasker13.png)

![Шаг 14](../../../../en/adapterref/iobroker.iot/doc/tasker14.png)

![Шаг 15](../../../../en/adapterref/iobroker.iot/doc/tasker15.png)

![Шаг 16](../../../../en/adapterref/iobroker.iot/doc/tasker16.png)

![Шаг 17](../../../../en/adapterref/iobroker.iot/doc/tasker17.png)

![Шаг 18](../../../../en/adapterref/iobroker.iot/doc/tasker18.png)

Проверьте результат.

![Шаг 19](../../../../en/adapterref/iobroker.iot/doc/tasker19.png)

Вы можете использовать координаты в виджете карты. Только не забудьте поменять местами долготу и широту.