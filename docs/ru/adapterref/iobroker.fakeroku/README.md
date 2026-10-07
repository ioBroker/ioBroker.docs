---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.fakeroku
BADGE-stable: https://iobroker.live/badges/fakeroku-stable.svg
BADGE-Installations: https://iobroker.live/badges/fakeroku-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.fakeroku
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.fakeroku/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fakeroku/README.md
title: fakeroku - эмулированные устройства Roku для вашего пульта дистанционного управления
hash: xWYoTEUd/qwn/PiRJLxTBDdS3nI5XNHFF77/kAKXYT4=
---
# fakeroku — эмулированные устройства Roku для вашего пульта дистанционного управления

Этот адаптер позволяет ioBroker имитировать одно или несколько **потоковых устройств Roku** в вашей локальной сети. Пульт дистанционного управления, поддерживающий протокол Roku — например, Logitech Harmony Hub или Sofabaton X1/X2 — обнаруживает эмулируемое устройство, и каждое нажатие кнопки на нём становится точкой данных в ioBroker, на которую могут реагировать ваши скрипты и визуализации.

Это аналог адаптера Logitech Harmony для **ввода данных** : вместо того, чтобы ioBroker управлял устройством, устройство управляет ioBroker.

> **Официальное мобильное приложение Roku не работает с этим адаптером.** Приложение взаимодействует с реальными устройствами Roku через собственный, недокументированный канал ECP-2 WebSocket от Roku, который этот эмулятор не поддерживает. Используйте хаб Harmony или Sofabaton — они используют открытый протокол, который обслуживает этот адаптер.

## Требования

- Node.js 22 или более поздняя версия
- js-controller 7.2.2 или новее
- admin 8.0.14 или новее
- Удаленный сервер или концентратор, находящийся в **той же локальной сети** , что и ваш хост ioBroker.

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и создайте один экземпляр. Новый экземпляр запустится в выключенном состоянии: проверьте настройки ниже, затем включите его. Он будет поставляться с уже настроенным эмулированным устройством Roku, названным "Roku" и работающим на порту 8060.

### 2. Выберите сетевой интерфейс (обычно: не выбирайте).

Оставьте **сетевой интерфейс** в режиме "все интерфейсы". В этом случае адаптер будет обслуживать каждую сеть, в которой находится ваш хост ioBroker, и отвечать удаленному пользователю в каждой из них собственным адресом хоста в этой сети — удаленный пользователь в отдельной VLAN получит доступный ему адрес.

Выбирайте конкретный адрес только в том случае, если эмулируемые устройства Roku должны находиться **только в одной сети** . В этом случае все устройства остаются в этой сети: обрабатываются только удаленные запросы из нее, и ничего не предлагается в других сетях. Если этот адрес отсутствует на хосте при запуске экземпляра, адаптер ожидает его до двух минут (сеть, которая появляется после ioBroker), затем сообщает об этом в журнале и ничего не запускает — он никогда не переключается на другую сеть.

### 3. Добавьте или отредактируйте эмулируемые устройства Roku.

Каждая карточка в разделе **«Эмулированные устройства Roku»** — это одно устройство Roku, которое может обнаружить ваш пульт дистанционного управления.

- **Имя** — это имя устройства в ioBroker и в информации об устройстве, которую выдает эмулируемый Roku. Отображается ли оно на пульте дистанционного управления, зависит от самого пульта: Harmony присваивает устройству имя самостоятельно. Выберите что-нибудь знакомое, например, название комнаты. **Переименование карточки в дальнейшем сохраняет ее данные** — папку в дереве объектов, ее назначения комнат и функций, а также настройки истории остаются на своих местах; изменяется только отображаемое имя.
- **Порт ECP** — сетевой порт, через который отвечает этот Roku. `8060` Это порт, который использует настоящий Roku. Каждому эмулированному Roku нужен **свой собственный** порт; диалоговое окно предварительно выбирает свободный порт и не позволяет подтвердить уже занятый порт. Harmony или Sofabaton считывают порт из результатов поиска.
- **Тип**
  - **Плеер** (приставка для потокового воспроизведения) оснащен 16 стандартными клавишами навигации и управления воспроизведением.
  - **Телевизор** предлагает эти функции, а также кнопки регулировки громкости, включения/выключения, переключения каналов и выбора входа (`VolumeUp`, `PowerOn`, `PowerOff`, `Power`, `Sleep`, `ChannelUp`, `InputTuner`, `InputHDMI1` …). Выбирайте этот вариант только в том случае, если вам действительно нужны эти дополнительные кнопки в качестве триггеров в ioBroker.

### 4. Обучите свой пульт дистанционного управления

**Logitech Harmony:** добавьте устройство в приложение Harmony, выберите **Roku** в качестве производителя и укажите в качестве хоста ваш ioBroker. Хаб самостоятельно обнаружит эмулируемое устройство Roku и считает порт из объявления — вам не нужно его вводить.

**Sofabaton X1/X2:** добавьте устройство Roku в приложение Sofabaton, если приложение находится в той же сети; оно обнаружит эмулируемое устройство Roku посредством обнаружения.

## Что вы получаете в дереве объектов

На уровне экземпляра:

| Точка данных            | Тип                                    | Значение                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`       | логическое значение, только для чтения | Это верно только пока всё работает: **каждый** настроенный Roku прослушивает соединение, система обнаружения отвечает, и выбранный адрес существует. В противном случае экземпляр отображается жёлтым цветом; в журнале указывается причина один раз, и адаптер каждую минуту пытается подключиться к Roku или системе обнаружения, которая не работает, пока не запустится снова. |
| `info.devicesTotal`     | число, только для чтения               | Сколько эмулируемых устройств Roku настроено?                                                                                                                                                                                                                                                                                                                                      |
| `info.devicesOnline`    | число, только для чтения               | Сколько из них слушают прямо сейчас?                                                                                                                                                                                                                                                                                                                                               |
| `info.devicesAllOnline` | логическое значение, только для чтения | `true` при этом каждый настроенный Roku будет слушать; `false` при условии, что ни один параметр не настроен.                                                                                                                                                                                                                                                                       |

Для каждой эмулируемой модели Roku, см. ниже. `fakeroku.0.<name>`:

| Точка данных  | Тип                                    | Значение                                                                                                                                                                                                                              |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.online` | логическое значение, только для чтения | `true` Пока устройство Roku прослушивает порт, в дереве объектов отображается зеленый или серый символ, а в диспетчере устройств — его карточка в режиме онлайн или офлайн.                                                           |
| `info.error`  | строка, только для чтения              | Почему этот Roku не запускается, например? `port 8061 is already in use (another program or another instance holds it)`; пусто во время работы, `Unknown` Когда адаптер выключен или включен, карта отображает это как предупреждение. |
| `command`     | строка, только для чтения              | Последняя команда в виде читаемого текста: `Home`, `Lit_a`, `launch:12`, `search:news`.                                                                                                                                               |
| `keys.<Key>`  | логическое значение, только для чтения | Одна точка данных на каждый дистанционный ключ. Нажатие клавиши устанавливает значение. `true` на мгновение и обратно к `false`; удержание ключа сохраняет его `true` до момента его выпуска.                                           |

Набирая текст на клавиатуре пульта дистанционного управления (`Lit_a`) и запуск приложений отображается в `command` только — они сами не получают точек данных. Кнопка приложения на пульте дистанционного управления, которая отправляет команды запуска приложений (Sofabaton), приходит как `launch:<id>`, с указанием его параметров, если таковые имеются (`launch:12?contentId=…` Названия ключей считываются в любом случае: `home` и `HOME` являются ключевыми `Home`.

## Использование в скрипте

Обычно это происходит в ответ на нажатие клавиши. `true`:

```javascript
on({ id: "fakeroku.0.Living_room.keys.Play", val: true }, () => {
  // your action
});
```

Или смотреть `command` Если вам нужно управлять несколькими кнопками в одном месте:

```javascript
on({ id: "fakeroku.0.Living_room.command" }, obj => {
  log("Remote sent: " + obj.state.val);
});
```

Ключевые параметры данных сброшены до исходных значений. `false` Каждый раз при запуске адаптера, поэтому клавиша, которая оставалась нажатой при остановке ioBroker, не сможет заблокировать ваше правило впоследствии. Отпускание удерживаемой клавиши никогда не прекращается, даже во время отправки адаптером большого количества команд — иначе именно защита от перегрузки привела бы к застреванию клавиши.

## Порты, используемые адаптером

- **TCP 8060** (один протокол на каждый эмулируемый Roku, настраиваемый) — протокол управления. Ваш пульт дистанционного управления отправляет нажатия клавиш сюда.
- **UDP 1900** (многоадресная рассылка) — обнаружение устройств, благодаря чему пульт дистанционного управления находит эмулируемые устройства Roku. Этот порт фиксирован стандартом и используется всеми устройствами.

Ответы принимаются только от устройств, находящихся в одной из собственных сетей хоста ioBroker — при выборе сетевого интерфейса обрабатываются только устройства из сети этого интерфейса. Запросы из других источников (интернет, другая VLAN, VPN) отклоняются, и поиск устройств оттуда игнорируется.

При остановке экземпляра эмулируемые устройства Roku объявляют о своем отключении. Контроллер, который не позволяет обнаружить устройства из списка, удаляет их, вместо того чтобы сохранять их в течение часа; Harmony, который запоминает сопряженное устройство самостоятельно, не затрагивается.

На одной машине можно запустить несколько экземпляров — каждому из них нужно назначить свои собственные порты ECP. Они используют общий порт UDP 1900: адаптер открывает его с повторным использованием адресов, поэтому каждый экземпляр получает запросы на обнаружение и ответы для своих собственных устройств. Только если какая-либо другая программа занимает этот порт эксклюзивно, экземпляр запускается без обнаружения — это указывается в журнале, и удаленные устройства, уже сопряженные с ним, все равно проходят проверку.

Адаптер также работает в компактном режиме ioBroker, где несколько адаптеров используют один процесс вместо того, чтобы каждый запускал свой собственный. Это занимает мало места и экономит память и время запуска. Включение этой функции происходит в настройках экземпляра; здесь ничего менять не нужно.

## Поиск неисправностей

**Удаленный сервер не обнаруживает ни одного устройства.** Убедитесь, что концентратор и хост ioBroker находятся в одной сети и что брандмауэр не блокирует UDP-порт 1900. На хосте с несколькими сетевыми картами выберите нужную в разделе **«Сетевой интерфейс»** . Если обнаружение недоступно, адаптер сообщит об этом в журнале, отобразит сообщение желтым цветом, продолжит работу для уже сопряженных удаленных устройств и будет запускать обнаружение заново каждую минуту.

**Удаленный сервер ничего не находит, и ioBroker работает в Docker.** В стандартной мостовой сети Docker контейнер имеет только внутренний адрес, недоступный для удаленного сервера, и запросы на обнаружение из вашей домашней сети никогда не поступают. Запустите контейнер ioBroker с помощью `network_mode: host` или присвойте ему адрес в вашей домашней сети с помощью `macvlan` сеть.

**В журнале отображается сообщение "Адрес… не существует на этом хосте — прослушивание на всех адресах".** Адрес, выбранный в настройках, больше не используется на хосте — новая сетевая карта, измененный DHCP-адрес, восстановленная резервная копия на другом оборудовании. Эмулируемые устройства Roku тем временем продолжают работать на всех адресах, а индикатор экземпляра отображается желтым цветом. Выберите текущий адрес (или "все интерфейсы") и сохраните; экземпляр перезапустится.

**Индикатор экземпляра остается желтым.** Что-то не запускается, и в журнале один раз указано, что именно. В диспетчере устройств на карточке Roku отображается, какой именно экземпляр не работает (в автономном режиме с указанием причины), и то же самое отображается на ее карточке. `info.error`; `info.devicesOnline` Показывает, сколько запущенных устройств. Чаще всего настроенное устройство Roku не может запуститься, потому что его порт уже занят чем-то другим (включая другое эмулированное устройство Roku с тем же портом) — освободите ему порт. Адаптер пытается запустить такое устройство Roku раз в минуту, даже если сервер остановился во время работы, и сообщает об этом в журнале, когда оно запускается, поэтому порт, который оставался занятым предыдущим процессом после перезапуска, освобождается сам собой без вашего участия. Если же устройство Roku вообще не настроено, в журнале вам будет предложено добавить его в настройках экземпляра.

**Я нажимаю кнопку, и в ioBroker ничего не происходит.** Установите уровень логирования экземпляра на `debug` На мгновение. Каждая команда, _примененная_ адаптером, регистрируется с указанием адреса, с которого она поступила, и, для ключа, с именем ключа (`launch`, `input` и `search` Вместо этого запишите в лог то, что было запущено или введено. Если появляется эта строка, значит, команда выполнена, и проблема заключается в скрипте, считывающем данные.

Если ничего не отображается, сначала проверьте наличие предупреждения о превышении 25 команд в секунду: команды, превышающие этот лимит, не регистрируются по отдельности, поэтому слишком активный удаленный запрос выглядит так, как будто он вообще не доходит до адаптера. Без такого предупреждения удаленный запрос действительно не проходит — проверьте сеть и порт ECP.

**Функции воспроизведения и паузы выполняют одну и ту же задачу.** Это протокол Roku, а не адаптера: пульт дистанционного управления отправляет _одну и ту же_ команду для воспроизведения и для паузы, поэтому здесь их невозможно различить.

**Кнопки приложений на моем Harmony не работают.** Harmony Hub не отправлял свои кнопки приложений (Netflix, YouTube и т. д.) на эмулируемый Roku — они привязаны к действиям Harmony, поэтому адаптер их никогда не видит. Пульты, которые отправляют команды запуска приложений (например, Sofabaton), отображают их в `command` как `launch:<id>`.

## Конфиденциальность

Адаптер взаимодействует только с устройствами в вашей собственной сети.

Функция отправки сообщений об ошибках через Sentry активна по умолчанию; что именно она отправляет и как её отключить, описано в [разделе Sentry основного файла README](https://github.com/iobroker-community-adapters/ioBroker.fakeroku/blob/master/README.md#sentry--error-reporting) .

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.10.0 (2026-10-03)

- (krobipd) New: every emulated Roku shows whether it runs and, if not, why — a green or grey symbol in the object tree, online or offline on its card with the reason.
- (krobipd) New: three datapoints count the emulated Rokus — how many are configured, how many run, and whether all of them run.
- (krobipd) Fixed: the connection datapoint's description says what green means — every Roku listening, discovery answering and the chosen address present.

### 1.9.0 (2026-10-03)

- (krobipd) Changed: the emulated Roku answers only what a Harmony or Sofabaton reads — Home Assistant and openHAB can no longer set it up.
- (krobipd) Changed: the instance shows green only while every Roku and discovery run, and yellow otherwise.
- (krobipd) Changed: a Roku whose server stopped while running and a discovery that failed start again within a minute instead of waiting for a restart.
- (krobipd) Changed: with no Roku configured or none running, the instance stays up so the device manager works, and asks you to add a Roku.
- (krobipd) Changed: a chosen address that is missing on the host no longer leaves the Rokus off — they listen on all addresses until you choose another.
- (krobipd) Changed: requests from the ioBroker host itself or from self-assigned addresses outside the host's networks are refused.
- (krobipd) Changed: the datapoint with the kind of the last command is gone — the last command itself still arrives as before; existing installations drop it on the next start.

### 1.8.2 (2026-10-02)

- (krobipd) Changed: a new instance starts switched off — check the settings, then switch it on.
- (krobipd) Fixed: the README and the user documentation name admin 8.0.14, the version the adapter actually requires.
- (krobipd) Fixed: the device manager answers right after a restart instead of failing until the translations are loaded.
- (krobipd) Improved: the type of the last command shows a readable label in the language you set instead of a protocol word.
- (krobipd) Improved: a start writes only datapoints that changed and reads the key states in one request — no needless updates for history adapters.
- (krobipd) Improved: the README links the detailed user documentation in English and German.

### 1.8.1 (2026-09-27)

- (krobipd) Improved: the note the Admin shows before an update from 0.x is short now: the apps folder is removed, app launches arrive as launch:<id> in command.

### 1.8.0 (2026-09-25)

- (krobipd) Fixed: Home Assistant and openHAB can set up the emulated Roku again — it now answers the active-app, media-player and TV-channel queries they send.
- (krobipd) Fixed: keys sent in any upper or lower case (home, POWERON) press the right button, and spaces typed in Home Assistant arrive as spaces.
- (krobipd) Fixed: an upgrade from the old adapter keeps every object tree with its rooms and history, also for names with an umlaut, a bracket or a double space.
- (krobipd) Fixed: renaming a device only changes its displayed name; its datapoints and scripts pointing at them stay where they are.
- (krobipd) Fixed: an instance started before the network is up starts its devices and adds discovery as soon as the host has an address.
- (krobipd) Fixed: the device dialog greys out OK for a taken name or port and says why.
- (krobipd) Changed: only devices in the host's own networks are answered; a chosen network interface keeps everything in its network and is never swapped for another.
- (krobipd) Changed: a chosen network interface that does not exist is waited for up to two minutes at start, then reported, instead of being replaced.
- (krobipd) New: the TV profile adds the PowerOn, Power, Sleep and InputTuner keys and announces itself the way real Roku TVs do.
- (krobipd) New: every new emulated Roku gets its own network identity instead of one every installation with the same name would share.

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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