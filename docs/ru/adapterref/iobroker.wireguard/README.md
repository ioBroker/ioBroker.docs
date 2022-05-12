---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: 54SbCSmbVHFPAQ4YRK3Aw20SEbncQGbr0fB2dNpTqX0=
---
![Логотип](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![версия NPM](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![Количество установок](https://iobroker.live/badges/wireguard-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/wireguard-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![Логотип](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![Тестируйте и выпускайте](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg) ![КодQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## Адаптер wireguard для ioBroker
Подключайтесь к узлам WireGuard и собирайте информацию о соединениях с одноранговыми узлами. Этот адаптер предназначен для мониторинга ваших хостов WireGuard. Он также поддерживает простую установку и докер.

&gt; Если вам нравится этот адаптер и вы можете поддержать меня<br/> &gt; [![Пожертвовать через PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Предпосылки
* запуск ssh-сервера на каждом хосте для мониторинга
* Исполняемый файл wg (wg.exe в Windows) должен находиться в пути поиска
* логин и пароль пользователя с правами на выполнение команды wg

## Шаги установки
* Проверьте, работает ли на вашем хосте WireGuard сервер ssh. Если нет - установите один. Если вы можете открыть командную строку с помощью шпатлевки (или аналогичной), вы используете ssh-сервер.
* убедитесь, что пользователь, которого вы хотите использовать для этого, может выполнить `wg` (то же самое для Windows и Linux). **Этому пользователю нужны права администратора!**
* Подводя итоги теста: откройте удаленную командную строку, войдите в систему и выполните команду `wg show`. Если вы получите правильный результат, все готово, и вы можете использовать эти данные для запуска адаптера.
* Сделайте это для каждого хоста, который вы хотите контролировать
* Установите адаптер и настройте его

## Параметры конфигурации
Поскольку WireGuard внутренне использует открытые ключи только для идентификации пиров, но их довольно неудобно читать и распознавать для людей, была добавлена страница перевода. Не стесняйтесь добавлять к нему открытые ключи и имена, чтобы имена были интегрированы в дерево объектов.

* Главная страница
  - Имя: просто символическое имя хоста, так как оно более удобно и лучше запоминается, чем его IP-адрес.
  - Адрес хоста: IP-адрес хоста. Также работает имя FQDN или DNS. Если вы используете WireGuard и ioBroker на одном хосте, вы можете просто использовать «localhost» в качестве IP-адреса.
  - Пользователь: пользователь, который выполняет скрипт на хосте (будет храниться в зашифрованном виде).
  - Пароль: пароль для этого пользователя (будет храниться в зашифрованном виде)
  - sudo: должна ли команда wg выполняться с использованием sudo или нет (требуется действующая конфигурация sudoers! -> см. [советы по безопасности])
  - Docker: выполняет команду `docker exec` для доступа к серверу wireguard внутри контейнера док-станции. Пожалуйста, проверьте, соответствует ли он вашим потребностям и можете ли вы переключиться на поддерживаемый контейнер.
  - интервал опроса: пауза между каждым опросом в секундах (также задерживает первый запуск после запуска адаптера)
* Страница перевода
    - Открытый ключ: открытый ключ одного из ваших коллег.
    - имя группы: символическое имя для этого однорангового узла

### Выполняемая командная строка зависит от флажков:
* Флажок не установлен: будет выполняться `wg show all dump` (для пользователей с правами root и использования SetUID-Bit)
* Флажок Sudo установлен: будет выполняться `sudo wg show all dump` (работает с соответствующей строкой sudoers)
* Флажок Docker установлен: `docker exec -it wireguard /usr/bin/wg show all dump` будет выполнен
* Флажки Sudo и Docker отмечены: `sudo docker exec -it wireguard /usr/bin/wg show all dump` будет выполнен

> Если вы используете WireGuard в док-контейнере, я предполагаю, что вы достаточно знакомы как с технологиями, так и с концепциями безопасности, чтобы настроить свою систему для выполнения показанных команд таким образом, чтобы не запрашивать пароль.

### Докер
В основном все, что сказано об обычных установках, применимо и к докеру и работает точно так же.
За исключением необходимых флажков для выполнения правильной команды и необходимой строки sudoers. Если вы используете WireGuard внутри док-контейнера, вам может понадобиться строка sudoers, подобная этой:

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
```

Этот адаптер ожидает имя `wireguard` для вашего контейнера WireGuard и команду `wg` в `/usr/bin/`внутри контейнера.
Эти значения в настоящее время не могут быть изменены.

## Как это устроено
* info.connection адаптера используется для указания того, что по крайней мере один интерфейс WireGuard находится в сети, о чем сообщает `wg show all`. Если ни один интерфейс Wireguard не подключен к сети - ничего не сообщается. В этом случае регистрируется ошибка, и светофор адаптеров становится желтым.
* Этот адаптер открывает оболочку ssh на каждом сконфигурированном хосте, выполняет команду `wg show all dump`, удаляет оболочку и анализирует результат.
* Поскольку каждый открытый ключ уникален, адаптер использует их для преобразования открытого ключа в удобные для пользователя, читаемые и узнаваемые имена.
* WireGuard, к сожалению, не обеспечивает состояние «подключено» само по себе. Он предоставляет только информацию о последнем рукопожатии.

Поскольку рукопожатия обычно происходят каждые 120 секунд, этот адаптер вычисляет состояние соединения таким образом, что предполагается, что одноранговый узел подключен, когда последнее рукопожатие получено менее чем за 130 секунд до этого.

## Советы по безопасности
> Я настоятельно рекомендую использовать sudoers под Linux!

Эти подсказки безопасности в основном полагаются на Linux, поскольку его система безопасности более сложна, чем система Windows. На сервере Windows вам просто нужно использовать администратора.
Поскольку команда `wg` (которая выполняется для захвата состояния WireGuard) требует прав администратора, хорошо подумайте, что вы здесь делаете и как вы настраиваете пользователя, которого вы помещаете в config.
Чтобы максимально защитить эти учетные данные, имя пользователя и пароль зашифрованы.

В основном есть три способа выполнить команду:

* используйте административного пользователя (root или аналогичный). Это будет работать, но откроет весь ваш сервер в случае потери/кражи учетных данных.
* Использование SetUID-Bit: установив этот бит (насколько я понял), каждый пользователь может запускать помеченный файл с административными привилегиями без необходимости ввода пароля. **Включая хакеров**. Таким образом, установка этого бита в команде wg раскрывает всю мощь команды wg. Если хотите, выполните chmod u+s /usr/bin/wg от имени администратора.
* использование sudoers: с моей точки зрения, самый безопасный способ — настроить нового простого пользователя с базовыми привилегиями и добавить простую строку в файл sudoers, которая позволяет этому пользователю выполнять необходимую команду без ввода пароля — и ТОЛЬКО ЭТО команда. Пожалуйста, обратитесь к документации вашего дистрибутива для правильной информации о редактировании файла sudoers и использовании visudo. На скриншоте ниже показано, что нужно добавить в файл. `wireguard-monitoring-user` — пользователь по вашему выбору. Остальное должно быть именно так, как вы видите.

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
```

Этот параметр позволяет `<wireguard-monitoring-user>` на хостах `ALL` выполнять команду `wg show all dump` из каталога `/usr/bin/` (может потребоваться изменить его в вашем дистрибутиве) без необходимости ввода пароля (§§ SSSSS_4§§).
![Изображение](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## Известные вопросы
* никто

## Сентри.ио
Этот адаптер использует sentry.io для сбора сведений о сбоях и автоматического сообщения об этом автору.
Для этого используется [Плагин ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

### Отказ от ответственности
Этот проект никак не связан с WireGuard. Название WireGuard и логотип WireGuard используются только для обозначения этого проекта и являются собственностью их владельцев. Они не являются частью этого проекта.

## Авторские права
Copyright (c) grizzelbee, 2022 г. <open.source@hingsen.de>

## Changelog
### v1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### v1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### v1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### v1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### v1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### v1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### v1.0.0 (2022-02-25)
* (grizzelbee) New: Added individual online state indicator for each interface
* (grizzelbee) fix: Improved some data roles
* (grizzelbee) fix: Improved documentation

### v0.9.5 (2022-02-22)
* (grizzelbee) New: dropped use of wg-json script - not needed anymore
* (grizzelbee) New: making internal use of wg show all dump command and self parsing the result
* (grizzelbee) New: Added windows support by using the wg show all command
* (grizzelbee) Upd: moved dependency **admin** to globalDependency as requested during adapter review

### v0.9.2 (2022-02-20)
* (grizzelbee) Fix: removed unnecessary secret from index_m.html file
* (grizzelbee) Fix: Using info.connection of adapter to indicate that at least one interface is online.
* (grizzelbee) Fix: Updated adapter icon

### v0.9.1 (2022-02-19)
* (grizzelbee) New: Improved optical quality of admin page - no technical improvements

### v0.9.0 (2022-02-18)
* (grizzelbee) New: Improved documentation
* (grizzelbee) New: Username and password for WireGuard hosts are getting encrypted now

### v0.8.0 (2022-02-17)
* (grizzelbee) New: admin extended with second page
* (grizzelbee) New: data file is getting parsed
* (grizzelbee) New: data tree is getting populated
* (grizzelbee) New: entire basic functionality is implemented
* (grizzelbee) New: added plugin sentry

### v0.2.0 (2022-02-16)
* (grizzelbee) New: admin is working as expected
* (grizzelbee) New: first steps in backend

### v0.1.0 (2022-02-14)
* (grizzelbee) working on admin

### v0.0.1
* (grizzelbee) initial release

## License
MIT License


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