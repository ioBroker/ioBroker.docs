---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.fakeroku
BADGE-stable: https://iobroker.live/badges/fakeroku-stable.svg
BADGE-Installations: https://iobroker.live/badges/fakeroku-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.fakeroku
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
hash: VldTQVDnEtbZXLBWDfliPbv3jGRHxQY0VOJpSmZIDNQ=
---
# fakeroku — эмулированные устройства Roku для вашего пульта дистанционного управления

Этот адаптер позволяет ioBroker имитировать одно или несколько **потоковых устройств Roku** в вашей локальной сети. Пульт дистанционного управления, поддерживающий протокол Roku — например, Logitech Harmony Hub или Sofabaton X1/X2 — обнаруживает эмулируемое устройство, и каждое нажатие кнопки становится точкой данных в ioBroker, на которую могут реагировать ваши скрипты и визуализации.

Это аналог адаптера Logitech Harmony для **ввода данных** : вместо того, чтобы ioBroker управлял устройством, устройство управляет ioBroker.

> **Официальное мобильное приложение Roku не работает с этим адаптером.** Приложение взаимодействует с реальными устройствами Roku по проприетарному зашифрованному каналу, который невозможно воспроизвести. Используйте концентратор Harmony или Sofabaton — они используют открытый протокол, который поддерживает этот адаптер.

## Требования

- Node.js 22 или новее
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
  - **Телевизор** предлагает эти дополнительные кнопки, а также кнопки регулировки громкости, включения/выключения, переключения каналов и выбора входа. Выбирайте этот вариант только в том случае, если вам действительно нужны эти дополнительные кнопки в качестве триггеров в ioBroker.

### 4. Обучите свой пульт дистанционного управления

**Logitech Harmony:** добавьте устройство в приложение Harmony, выберите **Roku** в качестве производителя и укажите в качестве хоста ваш ioBroker. Хаб самостоятельно обнаружит эмулируемое устройство Roku и считает порт из объявления — вам не нужно его вводить.

**Sofabaton X1/X2:** добавьте устройство Roku в приложение Sofabaton, если приложение находится в той же сети. Адаптер сообщает текущую версию Roku, которую эти пульты проверяют перед тем, как принять устройство.

## Что вы получаете в дереве объектов

На уровне экземпляра:

| Точка данных      | Тип                                    | Значение                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection` | логическое значение, только для чтения | Это верно только в том случае, если **все** настроенные устройства Roku действительно находятся в режиме прослушивания. Если одно из них не может запуститься — почти всегда из-за того, что его порт уже занят — экземпляр остается отключенным, и в журнале указывается имя устройства и порт. |

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

Ключевые параметры данных сброшены до исходных значений.`false` Каждый раз при запуске адаптера, поэтому клавиша, которая оставалась нажатой при остановке ioBroker, не сможет заблокировать ваше правило впоследствии. Отпускание клавиши никогда не прерывается, даже когда адаптер отправляет множество команд.

## Порты, используемые адаптером

- **TCP 8060** (один протокол на каждый эмулируемый Roku, настраиваемый) — протокол управления. Ваш пульт дистанционного управления отправляет нажатия клавиш сюда.
- **UDP 1900** (многоадресная рассылка) — обнаружение устройств, благодаря чему пульт дистанционного управления находит эмулируемые устройства Roku. Этот порт фиксирован стандартом и используется всеми устройствами.

Ответы принимаются только от устройств, находящихся в вашей локальной сети. Запросы из интернета отклоняются, а поиск извне игнорируется.

Когда вы останавливаете экземпляр, эмулируемые устройства Roku объявляют о своем завершении работы, поэтому пульт дистанционного управления удаляет их из своего списка, вместо того чтобы отправлять нажатия клавиш в никуда еще на час.

На одной машине можно запустить несколько экземпляров — каждому из них нужно назначить собственные порты ECP. Обнаружение происходит совместно: тот экземпляр, который запустится первым, будет использовать порт UDP 1900, а остальные продолжат работу без него, поэтому удаленные устройства, уже сопряженные с ними, будут продолжать работу.

Адаптер также работает в компактном режиме ioBroker, где несколько адаптеров используют один процесс вместо того, чтобы каждый запускал свой собственный. Это занимает мало места и экономит память и время запуска. Включение этой функции происходит в настройках экземпляра; здесь ничего менять не нужно.

## Поиск неисправностей

**Удаленный маршрутизатор не обнаруживает ни одного устройства.** Убедитесь, что концентратор и хост ioBroker находятся в одной сети и что брандмауэр не блокирует UDP-порт 1900. На хосте с несколькими сетевыми картами выберите нужную в разделе **«Сетевой интерфейс»** . Если обнаружение недоступно, адаптер сообщит об этом в журнале и продолжит работу для уже сопряженных удаленных устройств.

**Удаленный сервер ничего не обнаруживает, и в логе отображается сообщение «реклама на 172.17.xx».** Этот адрес принадлежит мосту Docker на хосте, а не вашей домашней сети — ни один удаленный сервер не может до него добраться. Адаптер предпочитает использовать реальный сетевой адрес, поэтому это сообщение отображается только тогда, когда у хоста в данный момент нет других вариантов. Выберите правильную карту в разделе **«Сетевой интерфейс»** и перезапустите экземпляр.

**Устройство остается в состоянии «не подключено».** По крайней мере, одно настроенное устройство Roku не удалось запустить. В журнале указано устройство и его порт — почти всегда этот порт уже занят чем-то другим (включая другое эмулированное устройство Roku с тем же портом). Освободите ему порт. Адаптер пытается подключиться к такому устройству каждую минуту и сообщает об этом в журнале, когда оно подключается, поэтому порт, который все еще был занят предыдущим процессом после перезапуска, освобождается сам собой без вашего участия.

**Я нажимаю кнопку, и в ioBroker ничего не происходит.** Установите уровень логирования экземпляра на`debug` На мгновение. Каждая полученная команда записывается в лог с указанием имени ключа и адреса, с которого она поступила. Если ничего не отображается, значит, удаленный канал не достигает адаптера; если отображается, значит, команда получена, и проблема в скрипте, считывающем данные.

**Функции воспроизведения и паузы выполняют одну и ту же задачу.** Это протокол Roku, а не адаптера: пульт дистанционного управления отправляет _одну и ту же_ команду для воспроизведения и для паузы, поэтому здесь их невозможно различить.

**Кнопки приложений на моем Harmony не работают.** Кнопки приложений Harmony (Netflix, YouTube и т. д.) привязаны к действиям Harmony и никогда не отправляются на устройство, поэтому адаптер их не видит.

## Конфиденциальность

Адаптер взаимодействует только с устройствами в вашей локальной сети. Он не обращается к облачным сервисам и никуда не отправляет данные. Дополнительная функция отправки отчетов об ошибках через Sentry отключена, если вы не включили диагностику в системных настройках ioBroker; она передает анонимный идентификатор установки и саму ошибку, никаких персональных данных.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.6.1 (2026-09-07)

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

### 1.4.0 (2026-09-03)
- (krobipd) Fixed: renaming an emulated Roku could change its identity on the network, so a paired Harmony or Sofabaton lost the device and had to be set up again.
- (krobipd) Fixed: a remote key that was pressed when the adapter stopped stayed on for good. All key datapoints are now released at start-up, so the next press works again.
- (krobipd) Fixed: a device named "info" entered by hand into the configuration replaced the instance's own status channel. The name is refused now and leftovers are removed.
- (krobipd) Changed: every datapoint now carries a translated name and, where useful, a short description — in all eleven languages, in existing installations as well.
- (krobipd) Improved: a remote with a globally routable IPv6 address is accepted when it sits in the same network as the ioBroker host, not just on the reserved IPv6 ranges.
- (krobipd) New: user documentation in English and German, shown in the ioBroker documentation portal.

### 1.3.0 (2026-09-01)
- (krobipd) Fixed: a malformed keyboard keypress from a remote (a bad %-escape in the URL) could crash the adapter.
- (krobipd) Fixed: remotes on an IPv6-only local network were refused; link-local and unique-local IPv6 addresses now count as LAN.
- (krobipd) Fixed: the adapter icon in the admin is now the same one shown on GitHub.
- (krobipd) Changed: requires admin >= 8.0.11.
- (krobipd) Improved: discovery answers only searches from your own network, and the device dialog in the admin keeps working after the device list was edited by hand.
- (krobipd) Improved: the emulated Roku reports Roku OS 15.0 (was 14.1), and the command-type datapoint lists its possible values so the admin shows them as labels.
- (krobipd) New: a misbehaving device on your network can no longer flood ioBroker — more than 25 commands per second per emulated Roku are dropped and reported in the log.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

---

_Developed with assistance from Claude.ai_