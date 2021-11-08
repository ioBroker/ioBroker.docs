---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-контроллер
hash: 6IptBGhOqH4i2YF7j4HpvXlLr1MXmh0RxUqoddQJQcU=
---
![Логотип](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![Количество установок (последнее)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/homekit-controller-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-controller
![Тестирование и выпуск](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Адаптер homekit-controller для ioBroker
Этот адаптер позволяет сопрягать и напрямую управлять устройствами с логотипом «работает с HomeKit», который можно использовать с Apple Home. Адаптер поддерживает устройства IP / WLAN, а также устройства BLE (Bluetooth LE). Адаптер работает полностью локально в вашей сети.

### Адаптера нет ...
... предлагая устройства или состояния ioBroker для управления приложением / системой Apple Home. Если вам нужно это направление, используйте адаптер [yahka](https://github.com/jensweigele/ioBroker.yahka).

### Как пользоваться адаптером
Адаптер прослушивает доступные устройства в вашей сети.

Есть три «типа» обнаруженных устройств:

* **Несопряженные устройства** - это устройства, которые обнаружены и доступны для сопряжения. Некоторые базовые состояния генерируются для этих устройств в ioBroker, который содержит некоторые информационные и административные состояния. Предоставляя PIN-код, вы можете связать эти устройства с этим экземпляром адаптера (см. Раздел «Сопряжение» ниже).
* **В паре с этим экземпляром** устройствами можно полностью управлять, они будут обновлять значения состояния в «реальном времени» с использованием подписок (только для IP-устройств) и интервала опроса данных. Устройство также может быть «несопряженным» с этим экземпляром (см. Раздел ниже).
* **Сопряженные с кем-то другим** устройства - это устройства, которые обнаружены, но уже подключены к другому контроллеру. Они регистрируются в режиме отладки, но для них не создаются состояния. Если вы хотите использовать их с ioBroker, вам сначала нужно отсоединить их от текущего контроллера (иногда это возможно только с помощью аппаратного сброса или чего-то подобного - см. Руководство), и после этого они должны отображаться как «несопряженные устройства».

После сопряжения поддерживаемые состояния считываются с устройства, и создаются объекты и состояния. Все известные точки данных, определенные в стандарте HomeKit, должны иметь имена, удобочитаемые для человека. Если вы видите UUID как имена, то производитель устройства добавил собственные данные. Если известно, что они предоставляют, это можно добавить в адаптер (например, как те, которые добавлены для устройств Elgato), чтобы они отображались в следующей версии, как указано.

Точки данных создаются с правильными состояниями и, если они доступны, также с правильными ролями. Используются другие общие роли.

### Идентификационная информация
Устройства, которые не сопряжены с каким-либо контроллером, имеют состояние admin.identify, которое может быть запущено с помощью «true». В этом случае соответствующее устройство должно идентифицировать себя (например, лампа должна мигать или что-то подобное, чтобы его можно было идентифицировать). Эта функция доступна, только если устройство не сопряжено с контроллером.

#### Информация о сопряжении
Чтобы связать устройство с этим экземпляром адаптера, вам необходимо предоставить контакт, который показан на устройстве, или этикетку или что-то подобное. PIN-код - это 8 цифр рядом с QR-кодом. Цифры необходимо вводить в формате 123-45-678 (также, когда тире не напечатаны на этикетке и не показаны на экране!)

Прямо сейчас PIN-код необходимо ввести в состояние admin.pairWithPin - вскоре появится интерфейс администратора.

После сопряжения устройства с этим экземпляром НЕВОЗМОЖНО также добавить устройство в приложение Apple Home или подобное параллельно.

Могут быть случаи, которые по-прежнему проблематичны для сопряжения, потому что я смог протестировать только на очень небольшом количестве устройств, поэтому, пожалуйста, сообщайте о проблемах, и я поддержу вас инструкциями, чтобы получить необходимые данные для отладки.

#### Информация об отключении пары
Чтобы разорвать пару, просто активируйте состояние «admin.unpair» с «true», и процесс разрыва пары будет выполнен - вскоре появится интерфейс администратора.

#### Особые примечания по использованию IP-устройств
IP-устройства обнаруживаются с помощью пакетов UDP, поэтому ваш хост должен находиться в той же сети, что и устройства. В настоящее время нет реального способа обойти это, потому что используемая запись MDNS содержит важную информацию для процесса сопряжения.
Особенно при использовании Docker вам нужно найти способы (режим хоста, macvlan, ...) для просмотра пакетов UDP.

Основная проблема для IP-устройств на базе WLAN без элементов управления или экрана - подключить их к вашей сети WLAN. Скорее всего, существует специальное мобильное приложение от производителя для первоначального добавления устройств в вашу сеть. Если этот первоначальный процесс также связывает устройство с Apple Home, вам может потребоваться отключить его впоследствии (например, https://www.macrumors.com/how-to/delete-homekit-device/). После этого он должен быть в вашей WLAN и доступен для сопряжения с этим адаптером.

Как только IP-устройство сопряжено и IP-адрес остается прежним, адаптер напрямую подключается к устройству при запуске. ТАК лучше закрепите IP в вашем роутере. Если IP-адрес изменился, соединение должно быть установлено при следующем обнаружении, и IP-адрес должен быть обновлен.

#### Особые примечания по использованию устройств BLE
По умолчанию BLE отключен в настройках адаптера. После включения можно обнаружить доступные устройства.

Из-за ограничений устройств Bluetooth недоступны «обновления в реальном времени» об изменениях состояния. Устройства будут сообщать о «важных изменениях состояния» (например, об изменениях состояния «включено») специальными пакетами, которые запускают немедленное обновление данных. Кроме того, данные обновляются в определенные интервалы опроса данных. Не устанавливайте их слишком короткими!

После перезапуска адаптера устройства bluetooth нельзя подключать напрямую - системе необходимо получить хотя бы один пакет обнаружения от устройства, чтобы получить необходимые сведения о подключении. Это означает, что устройства BLE могут быть доступны с некоторой задержкой.

### Ресурсы и ссылки
* Ресурс, который пытается расшифровать особые состояния Elgato: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

*

### ДЕЛАТЬ
* проверьте, как адаптер работает с кнопками (у них нет состояния, и у меня нет такого устройства. для этого нужна поддержка)
* изучить поддерживающие видео устройства
* изучите устройства поддержки, предлагающие изображения
* проверьте все случаи, когда обновления опроса могут перекрываться - обратная связь необходима, если есть проблемы

## Changelog
### 0.3.3 (2021-10-26)
* (bluefox) Fix the Discovery checkboxes

### 0.3.1 (2021-10-25)
* (Apollon77) Fix datatype of lastDiscovered state

### 0.3.0 (2021-10-24)
* (Apollon77) BREAKING CHANGE: All channel names will be changed and a number gets added at the end of the name. Please manually delete the ones without such a number

### 0.2.0 (2021-10-23)
* (bluefox) Add Admin UI
* (Apollon77) Store pairing data additionally in an instance directory and retry them on start if objects where deleted or such
* (Apollon77) Add info.lastDiscovered state with a timestamp to allow manual cleanup of devices that are paired somewhere else then with the adapter instance (because such objects would currently not be deleted)
* (Apollon77) Add missing device and channel objects
* (Apollon77) Always convert bool-type to boolean because it might be numbers coming from the devices
* (Apollon77) sort devices for Admin UI to have those with available actions on top
* (Apollon77) Enhance error messages
* (Apollon77) Adjust some roles

### 0.1.0 (2021-10-19)
* (Apollon77) Optimizations and added some Elgato states
* (Apollon77) Initial GitHub release

### 0.0.x
* (Apollon77) Initial commit and Alpha GitHub testing

## License
MIT License

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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