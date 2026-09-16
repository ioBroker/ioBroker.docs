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
hash: O1xo1l6OYvT3mYNLtXvpoAeTNgQ0tNJgxP3Z93N4jeo=
---
# fakeroku — эмулированные устройства Roku для вашего пульта дистанционного управления

Этот адаптер позволяет ioBroker имитировать одно или несколько **потоковых устройств Roku** в вашей локальной сети. Пульт дистанционного управления, поддерживающий протокол Roku — например, Logitech Harmony Hub или Sofabaton X1/X2 — обнаруживает эмулируемое устройство, и каждое нажатие кнопки становится точкой данных в ioBroker, на которую могут реагировать ваши скрипты и визуализации.

Это аналог адаптера Logitech Harmony для **ввода данных** : вместо того, чтобы ioBroker управлял устройством, устройство управляет ioBroker.

> **Официальное мобильное приложение Roku не работает с этим адаптером.** Приложение взаимодействует с реальными устройствами Roku через собственный, недокументированный канал ECP-2 WebSocket от Roku, который этот эмулятор не поддерживает. Используйте хаб Harmony или Sofabaton — они используют открытый протокол, который обслуживает этот адаптер.

## Требования

- Node.js 22 или более поздняя версия
- js-controller 7.2.2 или новее
- admin 8.0.11 или новее
- Удаленный сервер или концентратор, находящийся в **той же локальной сети** , что и ваш хост ioBroker.

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и создайте один экземпляр. Он работает сразу после установки: в экземпляре уже настроен эмулированный Roku с именем "Roku" на порту 8060.

### 2. Выберите сетевой интерфейс (обычно: не выбирайте).

Оставьте **параметр «Сетевой интерфейс»** в режиме «все интерфейсы». После этого адаптер самостоятельно определит маршрутизируемый адрес вашего хоста ioBroker и сообщит его.

Указывайте конкретный адрес только в том случае, если ваш хост ioBroker находится в **нескольких сетях** , а удаленный сервер доступен только в одной из них.

### 3. Добавьте или отредактируйте эмулируемые устройства Roku.

Каждая карточка в разделе **«Эмулированные устройства Roku»** — это одно устройство Roku, которое может обнаружить ваш пульт дистанционного управления.

- **Имя** — отображается как имя устройства на пульте дистанционного управления и как папка в дереве объектов. Выберите что-нибудь знакомое, например, комнату.
- **Порт ECP** — сетевой порт, через который отвечает этот Roku.`8060` Это порт, который использует настоящий Roku. Каждому эмулированному Roku нужен **свой собственный** порт; диалоговое окно предварительно выбирает свободный порт и отклоняет уже занятый.
- **Тип**
  - **Плеер** (приставка для потокового воспроизведения) оснащен 16 стандартными клавишами навигации и управления воспроизведением.
  - **Телевизор** предлагает эти дополнительные кнопки, а также кнопки регулировки громкости, переключения каналов и выбора входа, а также кнопку выключения. Выбирайте этот вариант только в том случае, если вам действительно нужны эти дополнительные кнопки в качестве триггеров в ioBroker.

### 4. Обучите свой пульт дистанционного управления

**Logitech Harmony:** добавьте устройство в приложение Harmony, выберите **Roku** в качестве производителя и укажите в качестве хоста ваш ioBroker. Хаб самостоятельно обнаружит эмулируемое устройство Roku и считает порт из объявления — вам не нужно его вводить.

**Sofabaton X1/X2:** добавьте устройство Roku в приложение Sofabaton, если приложение находится в той же сети. Адаптер сообщает текущую версию Roku, которую эти пульты проверяют перед тем, как принять устройство.

## Что вы получаете в дереве объектов

На уровне экземпляра:

| Точка данных      | Тип                                    | Значение                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | логическое значение, только для чтения | Это справедливо только в том случае, если **все** настроенные устройства Roku действительно находятся в режиме прослушивания. Если одно из них не может запуститься — почти всегда из-за того, что его порт уже занят — в журнале указывается имя устройства и порт, и адаптер повторяет попытку подключения к этому устройству каждую минуту, пока оно не запустится. |

Для каждой эмулируемой модели Roku, см. ниже.`fakeroku.0.<name>` :

| Точка данных  | Тип                                    | Значение                                                                                                                                                                                    |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`     | строка, только для чтения              | Последняя команда в виде читаемого текста:`Home` ,`Lit_a` ,`launch:12` ,`search:news` .                                                                                                     |
| `commandType` | строка, только для чтения              | Что это был за приказ:`keypress` ,`keydown` ,`keyup` ,`launch` ,`install` ,`input` или`search` .                                                                                            |
| `keys.<Key>`  | логическое значение, только для чтения | Одна точка данных на каждый дистанционный ключ. Нажатие клавиши устанавливает значение.`true` на мгновение и обратно к`false` ; удержание ключа сохраняет его`true` до момента его выпуска. |

Набирая текст на клавиатуре пульта дистанционного управления (`Lit_a` ) и запуск приложений отображается в`command` только — они не получают собственных данных.

## Использование в скрипте

Обычно это происходит в ответ на нажатие клавиши.`true` :

```javascript
on({ id: "fakeroku.0.Living_room.keys.Play", val: true }, () => {
  // your action
});
```

Или смотреть`command` Если вам нужно управлять несколькими кнопками в одном месте:

```javascript
on({ id: "fakeroku.0.Living_room.command" }, obj => {
  log("Remote sent: " + obj.state.val);
});
```

Ключевые параметры данных сброшены до исходных значений.`false` Каждый раз при запуске адаптера, поэтому клавиша, которая оставалась нажатой при остановке ioBroker, не сможет заблокировать ваше правило впоследствии. Отпускание удерживаемой клавиши никогда не прекращается, даже во время отправки адаптером большого количества команд — иначе именно защита от перегрузки привела бы к застреванию клавиши.

## Порты, используемые адаптером

- **TCP 8060** (один протокол на каждый эмулируемый Roku, настраиваемый) — протокол управления. Ваш пульт дистанционного управления отправляет нажатия клавиш сюда.
- **UDP 1900** (многоадресная рассылка) — обнаружение устройств, благодаря чему пульт дистанционного управления находит эмулируемые устройства Roku. Этот порт фиксирован стандартом и используется всеми устройствами.

Ответы принимаются только от устройств, находящихся в вашей локальной сети. Запросы из интернета отклоняются, а поиск извне игнорируется.

Когда вы останавливаете экземпляр, эмулируемые устройства Roku объявляют о своем завершении работы, поэтому пульт дистанционного управления удаляет их из своего списка, вместо того чтобы отправлять нажатия клавиш в никуда еще на час.

На одной машине можно запустить несколько экземпляров — каждому из них нужно назначить свои собственные порты ECP. Они используют общий порт UDP 1900: адаптер открывает его с повторным использованием адресов, поэтому каждый экземпляр получает запросы на обнаружение и ответы для своих собственных устройств. Только если какая-либо другая программа занимает этот порт эксклюзивно, экземпляр запускается без обнаружения — это указывается в журнале, и удаленные устройства, уже сопряженные с ним, все равно проходят проверку.

Адаптер также работает в компактном режиме ioBroker, где несколько адаптеров используют один процесс вместо того, чтобы каждый запускал свой собственный. Это занимает мало места и экономит память и время запуска. Включение этой функции происходит в настройках экземпляра; здесь ничего менять не нужно.

## Поиск неисправностей

**Удаленный маршрутизатор не обнаруживает ни одного устройства.** Убедитесь, что концентратор и хост ioBroker находятся в одной сети и что брандмауэр не блокирует UDP-порт 1900. На хосте с несколькими сетевыми картами выберите нужную в разделе **«Сетевой интерфейс»** . Если обнаружение недоступно, адаптер сообщит об этом в журнале и продолжит работу для уже сопряженных удаленных устройств.

**Удаленный сервер ничего не обнаруживает, и в логе отображается сообщение «реклама на 172.17.xx».** Этот адрес принадлежит мосту Docker на хосте, а не вашей домашней сети — ни один удаленный сервер не может до него добраться. Адаптер предпочитает использовать реальный сетевой адрес, поэтому это сообщение отображается только тогда, когда у хоста в данный момент нет других вариантов. Выберите правильную карту в разделе **«Сетевой интерфейс»** и перезапустите экземпляр.

**Устройство остается в состоянии «не подключено».** По крайней мере, одно настроенное устройство Roku не удалось запустить. В журнале указано устройство и его порт — почти всегда этот порт уже занят чем-то другим (включая другое эмулированное устройство Roku с тем же портом). Освободите ему порт. Адаптер пытается подключиться к такому устройству каждую минуту и сообщает об этом в журнале, когда оно подключается, поэтому порт, который все еще был занят предыдущим процессом после перезапуска, освобождается сам собой без вашего участия.

**Я нажимаю кнопку, и в ioBroker ничего не происходит.** Установите уровень логирования экземпляра на`debug` На мгновение. Каждая команда, _примененная_ адаптером, регистрируется с указанием адреса, с которого она поступила, и, для ключа, с именем ключа (`launch` ,`input` и`search` Вместо этого запишите в лог то, что было запущено или введено. Если появляется эта строка, значит, команда выполнена, и проблема заключается в скрипте, считывающем данные.

Если ничего не отображается, сначала проверьте наличие предупреждения о превышении 25 команд в секунду: команды, превышающие этот лимит, не регистрируются по отдельности, поэтому слишком активный удаленный запрос выглядит так, как будто он вообще не доходит до адаптера. Без такого предупреждения удаленный запрос действительно не проходит — проверьте сеть и порт ECP.

**Функции воспроизведения и паузы выполняют одну и ту же задачу.** Это протокол Roku, а не адаптера: пульт дистанционного управления отправляет _одну и ту же_ команду для воспроизведения и для паузы, поэтому здесь их невозможно различить.

**Кнопки приложений на моем Harmony не работают.** Кнопки приложений Harmony (Netflix, YouTube и т. д.) привязаны к действиям Harmony и никогда не отправляются на устройство, поэтому адаптер их не видит.

## Конфиденциальность

Адаптер взаимодействует только с устройствами в вашей локальной сети. Он не обращается к облачным сервисам и никуда не отправляет данные. Дополнительная функция отправки отчетов об ошибках через Sentry отключена, если вы не включили диагностику в системных настройках ioBroker; она передает анонимный идентификатор установки и саму ошибку, никаких персональных данных.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.7.1 (2026-09-16)

- (krobipd) Fixed: a second instance on the same host is possible again — an instance carried over from an older version still claimed the whole machine.

### 1.7.0 (2026-09-16)

- (krobipd) Fixed: button datapoints keep their value and their room and function assignment when the adapter starts.
- (krobipd) Fixed: after an emulated Roku drops out, its port is free again instead of staying blocked until ioBroker restarts.
- (krobipd) Fixed: stopping the instance no longer leaves it reported as connected.
- (krobipd) Fixed: a key you hold right after a short press stays pressed instead of being released early.
- (krobipd) Fixed: the device dialog now also refuses a name that would collide with an existing device in the object tree.
- (krobipd) Improved: after the host gets a new IP address, remotes find the emulated Rokus again without restarting the instance.
- (krobipd) Improved: the admin now warns you when a port you enter is already used by another adapter on this host; the instance restarts once after this update.

### 1.6.1 (2026-09-07) — stable

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead.

### 1.6.0 (2026-09-07)

- (krobipd) Fixed: saving a device in the admin could change its identity on the network, so a paired Harmony or Sofabaton lost it.
- (krobipd) Fixed: with the device list open twice, editing or deleting a card could hit a different emulated Roku than the one clicked.
- (krobipd) Fixed: releasing a key was dropped while the adapter shed a flood of commands, so the key could stay pressed for half a minute.
- (krobipd) Fixed: an ECP port still held after a restart left that device dead until you restarted the instance; it is retried every minute now.
- (krobipd) Fixed: stopping the instance now takes the emulated Rokus out of the remote's list instead of leaving them there for up to an hour.
- (krobipd) Fixed: an emulated Roku whose server died is no longer offered for discovery.
- (krobipd) Fixed: a configured port no server can bind falls back to 8060 instead of leaving the device unstarted.
- (krobipd) Changed: the device dialog refuses a reserved or colliding name right away instead of reporting it after saving.
- (krobipd) Changed: the adapter can now run in compact mode, sharing one process with other adapters instead of claiming its own.
- (krobipd) Changed: more than one instance may run on the same machine again; only the ports have to differ.

### 1.5.0 (2026-09-03)

- (krobipd) Fixed: deleting the last emulated Roku left all of its datapoints behind for good. They are now removed whenever the configuration says a device is gone.
- (krobipd) Fixed: on a host running Docker the adapter could announce itself under a container address no remote can reach. A real network address is preferred now.
- (krobipd) Fixed: an emulated Roku whose server died while running left the instance showing "connected". It now reports the failure and names the device.

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