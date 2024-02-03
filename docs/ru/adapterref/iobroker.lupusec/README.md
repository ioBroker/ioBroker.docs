---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: FOsVkdhmsKEJqpxIIyHRpzocKLIuM9IB+/On4IfMQfw=
---
![Логотип](../../../en/adapterref/iobroker.lupusec/admin/icons/lupusec.png)

![Стабильная версия](http://iobroker.live/badges/lupusec-stable.svg)
![Количество установок](http://iobroker.live/badges/lupusec-installed.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![НПМ](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
**Требуется node.js 18.0 или выше и администратор v5!**

Этот адаптер соединяет системы сигнализации Lupusec XT1 Plus, XT2, XT2 Plus и XT3 с ioBroker.
XT1 (без Plus) не поддерживается. Вы можете прочитать состояние датчиков Lupusec, таких как датчики дверей, окон, воды, дыма, а также состояние системы сигнализации.
Например, вы можете включать выключатели, управлять жалюзи и ставить/снимать с охраны систему сигнализации.
Поскольку адаптеру приходится несколько раз вызывать систему сигнализации, чтобы получить всю информацию о состоянии и устройстве, загрузка ЦП и использование памяти высоки. Чтобы уменьшить нагрузку на процессор, вы можете увеличить время опроса.

Подробную информацию вы можете найти здесь: [Волчанка](https://www.lupus-electronics.de/en).

## Монтаж
1. Установите адаптер

   Самый простой способ — настроить адаптер lupusec.iobroker через адаптер обнаружения в ioBroker. Адаптер обнаружения ищет правильный IP-адрес системы охранной сигнализации Lupusec. Другой способ — настроить его вручную.

2. Настройка адаптера вручную.

Выберите IP-адрес или имя хоста и порт из системы сигнализации Lupusec. Если вы используете https, активируйте флаг https. Нагрузка на процессор выше при использовании https без http.
Чтобы только прочитать статус, выберите пользователя без доступа на запись. Если вы хотите изменить статус (например, включить/выключить свет или поставить/снять с охраны сигнализацию), выберите пользователя с доступом на запись.
С помощью polltime вы можете настроить, как часто будет вызываться система сигнализации. Большое время опроса снижает нагрузку на процессор.

![admin_main](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png) Если у вас есть камеры наблюдения, подключенные к вашей системе сигнализации Lupusec, вы можете предоставить их в ioBroker. Адаптер Lupusec самостоятельно находит все камеры Lupusec. Вам необходимо ввести адрес (ваш IP-адрес ioBroker или 0.0.0.0) и порт для последующего подключения к камерам.
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png) Если ваш дверной механизм Nuki подключен к системе сигнализации Lupusec, вы также можете использовать его через ioBroker. В меню администратора экземпляра ioBroker вы можете ввести свой дверной датчик Lupusec, который установлен на двери Nuki. Если вы теперь откроете дверь, на которой установлен Нуки, у вас будет дополнительное состояние «дверь открыта», а не только «разблокирована». Если у вас нет дверного датчика Lupusec на двери Nuki, вы увидите только состояния «заперто» или «заперто».
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

По умолчанию все устройства Lupusec будут отображаться на вкладке объекта ioBroker.
Полностью поддерживаются и индивидуально адаптируются следующие устройства:

- Дверной/оконный контакт (Тип 4)
- Датчик воды (Тип 5)
- Тревожная кнопка (Тип 7)
- Детектор движения/детектор движения на 360 градусов (Тип 9)
- Датчик CO (Тип 13)
- Детектор дыма/детектор тепла (Тип 14)
- Датчик температуры V2 (Тип 20)
- Сирена внутри (Тип 21)
- Индикатор состояния / Внутренняя мини-сирена (Тип 22)
- Выключатель питания (Тип 24)
- 1-канальное реле с повторителем ZigBee (Тип 24)
- 2-канальное реле с повторителем ZigBee (Тип 24)
- Репатер V2 (Тип 26)
- Клавиатура (Тип 37)
- Датчик стекла (Тип 39)
- Сирена внутри (Тип 45)
- Сирена внешняя (Тип 48)
- Измеритель мощности (Тип 48)
- Электросчетчик (Тип 50)
- Универсальный ИК-контроллер (Тип 52)
- Комнатный датчик V1 (Тип 54)
- Датчик температуры ЖК-дисплей (Тип 54)
- Мини-температура (Тип 54)
- Устройство открывания дверей Нуки (Тип 57)
- Тепловой датчик (Тип 58)
- Диммер (Тип 66)
- Выключатель света V2 (Тип 66)
- Хюэ (Тип 74)
- Реле роллет V1 (Тип 76)
- Радиаторный термостат (Тип 79)
- Радиаторный термостат V2 (Тип 79)
- Датчик освещенности (Тип 78)
- Переключатель сценариев V2 (Тип 81)
- Датчик удара (Тип 93)
- Детектор дыма V2 (Тип 14)
- Реле для установки в стену с диммером V3 (Тип 66)
- Наружная клавиатура V2 (Тип 17)

Два состояния apple_home_a1 и lupusec.0.status.apple_home_a2 для адаптера Apple Homekit поддерживаются yahka. В дополнение к состояниям lupusec вы можете включать и выключать систему сигнализации для зон 1 и 2.

Если у вас есть устройство, которого нет в списке выше, свяжитесь со мной по адресу Thorsten Stueben <thorsten@stueben.de>.

## Объекты
### Статус Лупусека
ioBroker предлагает вам те же объекты статуса, что и в приложении Lupusec.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Устройства Лупусек
Все поддерживаемые датчики и устройства Lupsec вы найдете в разделе «Устройства». Если устройство отсутствует, пожалуйста, свяжитесь со мной.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) Подробный вид датчика или устройства. В этом примере вы видите датчик CO. При тревоге CO состояние «alarm_status_ex» меняется на true, а «alarm_status» меняется на «CO».
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Веб-камеры Лупусека
Все подключенные камеры наблюдения вы найдете в разделе «Веб-камеры». Вы можете скопировать ссылку, представленную в состояниях «изображение» и «поток», в свой веб-браузер для открытия.
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### Лупусек Нуки
Устройство открывания дверей Nuki вы найдете в разделе «устройства», например, устройства Lupusec. Нуки предоставляет 2 состояния. Состояние nuki_state показывает фактическое состояние механизма открывания дверей Nuki, например, дверь заперта или разблокирована. С помощью состояния nuki_action вы можете открыть, запереть или разблокировать дверь.
![lupusec_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

### Лупусек СМС
Если вы используете Lupusec XT1+, XT2+ или XT3 с SIM-картой SMS, вы можете отправлять SMS со следующими состояниями: ![lupusec_obj_sms](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_sms.png)

Альтернативно вы можете отправить SMS из вашего JavaScript с помощью следующей команды:

```
sendTo('lupusec.0', 'sms', { number: '+4917247114711', text: 'Test message' });
```

если вы используете SMS-шлюз, вы можете использовать в своем скрипте следующую команду:

```
sendTo('lupusec.0', 'smsgw', { number: '+4917247114711', text: 'Test message' });
```

## Поиск неисправностей
Если вы запустите адаптер Lupusec и получите сообщение об ошибке, что система сигнализации недоступна, попробуйте выполнить проверку связи с системой из окна терминала вашей системы ioBroker.

```
ssh <user>@<iobroker-ip-address>
sudo -u iobroker ping <lupsec-ip-address>
```

Если вы получаете сообщение об ошибке _ping: icmp open сокет: операция не разрешена_, выполните следующие действия и затем снова запустите адаптер Lupusec.

```
ls -l `which ping`
sudo chmod u+s `which ping`
```

## Строганый
В будущем планируется следующее:

- поддержка большего количества датчиков/устройств
- написание [документации](docs/en/info.md) для каждого датчика/устройства

## Changelog

### 2.0.0 (06.01.2023)

-   (Stübi) Redesign - changed everything from JavaScript to TypeScript
-   (Stübi) Using axios for http requests
-   (Stübi) the configuration changed. You have to edit the configuration

## License

The MIT License (MIT)

Copyright (c) 2024 Thorsten Stueben <thorsten@stueben.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.