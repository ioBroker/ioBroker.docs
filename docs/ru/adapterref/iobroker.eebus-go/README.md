---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eebus-go/README.md
title: ioBroker.eebus-go
hash: 1yrporfEO17FPTwA2KoQpV/nbNK/8ayypId/iWmRbDo=
---
![Логотип](../../../en/adapterref/iobroker.eebus-go/admin/eebus-go.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.eebus-go.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eebus-go.svg)
![Количество установок](https://iobroker.live/badges/eebus-go-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/eebus-go-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.eebus-go.png?downloads=true)

# IoBroker.eebus-go
**Тесты:** ![Тестирование и выпуск](https://github.com/FernetMenta/ioBroker.eebus-go/workflows/Test%20and%20Release/badge.svg)

## Адаптер eebus-go для ioBroker
Этот адаптер позволяет iobroker стать пользовательским менеджером энергопотребления в контексте §14a EnWG и §9 EEG. §14a EnWG — это немецкий закон, требующий, чтобы управляемые системы, такие как настенные светильники или тепловые насосы, были диммируемыми, если они могут потреблять более 4,2 кВт. §9 EEG требует, чтобы системы производства электроэнергии (например, фотоэлектрические инверторы) могли ограничивать потребление оператором сети.
Эти законы обеспечиваются блоками управления, которые работают на шлюзах интеллектуальных счетчиков или подключены к ним. Блок управления передает сигнал об ограничении непосредственно управляемой системе или пользовательскому менеджеру энергопотребления. Использование iobroker в качестве пользовательского менеджера энергопотребления имеет следующие преимущества:

- Если у вас более одной управляемой системы, например, настенный блок и тепловой насос, вы можете распределить ограниченную мощность между устройствами в соответствии с вашими потребностями. Для двух управляемых устройств договорная максимальная мощность в течение периода ограничения составляет Pdim = 4,2 кВт + (CS – 1) x SF x 4,2 кВт. Коэффициент одновременности SF для двух управляемых систем равен 0,8. Это означает, что вы можете загрузить свой автомобиль 7,56 кВт в течение периода затемнения, если, например, выключите тепловой насос.
— Блоки управления обмениваются данными по протоколу EEBUS. Если ваше управляемое устройство не поддерживает этот протокол, данный адаптер может управлять им другими способами, например, переключая реле с помощью пользовательского скрипта.

Адаптер поддерживает два сценария использования EEBUS:

- **LPC** (Ограничение энергопотребления) — ограничивает допустимый уровень энергопотребления устройств (§14a EnWG)
- **Ограничение производства электроэнергии** (LPP) — ограничивает объем электроэнергии, которую могут вырабатывать устройства (например, фотоэлектрические инверторы, аккумуляторные батареи) (§9 EEG).

Оба варианта использования можно включить независимо на вкладке «Базовая конфигурация». Каждый из них имеет свой собственный конечный автомат, конфигурацию защиты энергии и дерево объектов ioBroker.

Вам необходимо иметь хотя бы базовое понимание сценариев использования EEBUS: EEBus UC TS — ограничение энергопотребления и EEBus UC TS — ограничение выработки электроэнергии. Спецификации доступны для скачивания по адресу [eebus.org](https://www.eebus.org/).

### Каскадные созвездия
Адаптер выступает одновременно в качестве управляемой системы (CS) для блока управления оператора сети и в качестве системы защиты энергии (EG) для нижестоящих устройств. Это позволяет осуществлять каскадное распределение ограничений как для потребления (LPC), так и для производства (LPP), как описано в соответствующих спецификациях вариантов использования EEBUS:

<img src="doc/images/cascading-constellations.svg" alt="Каскадные созвездия" width="700">

### Защита от сбоев
Спецификация EEBUS требует, чтобы управляемые системы имели отказоустойчивое состояние, в котором они потребляют (LPC) или производят (LPP) только определенное количество энергии, меньшее или равное 4,2 кВт. Устройства переходят в это отказоустойчивое состояние, если теряют связь с пользовательским менеджером энергии или блоком управления. Надежная связь проверяется по сигналам подтверждения в обоих направлениях.

Если вы используете этот адаптер для управления устройством, не поддерживающим EEBUS, например, настенной зарядной станцией, убедитесь, что эта станция может потреблять резервное питание только в тех случаях, когда iobroker не может ею управлять. Если у вас более одной управляемой системы, убедитесь, что сумма резервных мощностей меньше или равна максимально допустимой мощности, указанной в договоре (см. выше). То же самое относится и к производственным устройствам, управляемым через LPP.

### Управляемый конечный автомат систем
Адаптер реализует независимые конечные автоматы для LPC (ограничение потребления энергии) и LPP (ограничение производства энергии), как определено в EEBus UC TS §2.3.2. Оба конечных автомата используют одни и те же состояния и переходы, но работают независимо:

<img src="doc/images/lpc-state-machine.svg" alt="Конечный автомат LPC/LPP" width="700">

| Штат | Описание |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| **инициализация** | CS запускается здесь после (пере)запуска. Ограничено лимитом мощности системы аварийного отключения. Ожидает 120 секунд первого сигнала активности. |
| **unlimitedControlled** | CS не ограничен, но контролируется Energy Guard. Активен пульс. |
| **ограниченное** | CS в ограниченном режиме, управляется Energy Guard. Действует ограничение активной мощности. |
| **Защита от сбоев** | CS не контролируется Energy Guard. Ограничено пределом защиты от сбоев. Таймер запущен. |
| **Неограниченная автономность** | CS не имеет ограничений. Работает так, как если бы не существовало никаких внешних ограничений. Блок управления отключен. |

### Архитектура
Полный обзор системы см. в разделе [Архитектурная схема](doc/architecture-scenario.md).

### Настраивать
Этот адаптер использует реализацию EEBUS с открытым исходным кодом от enbility, см. https://enbility.net/. Эта реализация написана на Go, поэтому её нельзя напрямую интегрировать в адаптер iobroker. К счастью, enbility предоставляет компонент с gRPC-сервером. Для простоты и совместимости авторы этого адаптера предоставляют этот компонент в виде контейнера Docker. Следуйте этому [описание настройки](doc/setup.md).

### Конфигурация
На вкладке BaseConfig административного интерфейса настройте подключение к gRPC-серверу и сохраните конфигурацию. Если адаптер может подключиться к gRPC-серверу, на этой вкладке в таблице отобразится список обнаруженных устройств EEBUS. Серийный номер может быть любым, это серийный номер вашего пользовательского менеджера энергопотребления, который виден блоку управления. Не меняйте его после сопряжения с блоком управления. Время ожидания подтверждения связи по умолчанию, равное 30 секундам, должно быть достаточным для большинства (если не для всех) случаев.

#### Активация сценария использования
На вкладке «Базовая конфигурация» вы можете независимо включить или отключить сценарии использования LPC и LPP:

- **Включить ограничение потребления электроэнергии** (по умолчанию: включено) — активирует ограничение потребления электроэнергии. Введите максимальную потребляемую мощность, указанную в договоре с вашим поставщиком электроэнергии.
- **Включить LPP** (по умолчанию: выключено) — активирует ограничение выработки электроэнергии. Введите максимальную мощность, предусмотренную договором (например, номинальную мощность вашей фотоэлектрической системы).

Если блок управления подключен к той же подсети, он должен отобразиться в списке обнаруженных устройств. Выберите его и сохраните конфигурацию. SKI этого адаптера был сгенерирован при первом запуске контейнера gRPC. Он закодирован в QR-коде, отображаемом в правом верхнем углу. Он может потребоваться для сопряжения блока управления с этим пользовательским менеджером энергопотребления.

#### Энергетические защитные устройства
На вкладке **LPC Energy Guards** можно определить параметры управления энергопотреблением для устройств потребления (EEBUS или вручную). На вкладке **LPP Energy Guards** (видимой только при включенном LPP) можно определить параметры управления энергопотреблением для производственных устройств. Для каждого параметра управления энергопотреблением адаптер создает объекты, которые можно использовать для наблюдения и управления менеджером энергопотребления.

### Объекты iobroker
Штаты, информация о которых относится к общему адаптеру:

- info.connection: подключение к gRPC-серверу
- info.discoveredDevices: список обнаруженных устройств EEBUS
- info.ski: SKI этого экземпляра адаптера

Штаты, связанные с LPC (в соответствии с `LPC/`):

- LPC.state: состояние сценария использования LPC, см. спецификацию сценария использования EEBUS, упомянутую выше.
- LPC.limit: текущий лимит потребления, отправляемый блоком управления, если функция ограничения активна.
- LPC.limitDuration: продолжительность действия лимита активного потребления
- LPC.limitMinutesToday: общая продолжительность снижения потребления электроэнергии. По закону она не должна превышать 2 часа в день. Если она увеличивается, свяжитесь со своим поставщиком электроэнергии.

Штаты, связанные с LPP (в разделе `LPP/`, только при включенном LPP):

- LPP.state: состояние варианта использования LPP (тот же конечный автомат, что и LPC)
- LPP.limit: текущий лимит производства, отправляемый блоком управления, если функция ограничения активна.
- LPP.limitDuration: длительность ограничения активного производства
- LPP.limitMinutesToday: общая продолжительность сокращения производства

Штаты, относящиеся ко всем энергетическим защитным механизмам (в соответствии с `LPC.EnergyGuards.Guard_{name}/` или `LPP.EnergyGuards.Guard_{name}/`):

- Процент: процент от лимита блока управления, который должен быть выделен этому устройству во время действия ограничения.
- currentLimit: если не равно нулю, текущий активный лимит для этого устройства.
- failsafeLimit: максимальная мощность устройства в режиме отказоустойчивости. Запись в это значение изменит конфигурацию устройства eebus.
- lastHeartbeat: время последнего полученного сигнала активности от устройства (время ожидания совпадает с временем, настроенным для подключения к блоку управления).

Штаты, связанные с системами защиты энергии EEBUS:

- eebusConnected: true, если установлено соединение EEBUS с устройством.
- confirmedLimit: если система защиты энергопотребления установила ограничение, отображается значение, подтвержденное контролируемым устройством.
- manualLimit: если в панели управления не установлено ограничение, пользователи могут установить свои собственные ограничения.

Штаты, в которых применяются ручные энергозащитные устройства:

- Heartbeat: пользовательский скрипт должен регулярно записывать это состояние, чтобы сигнализировать о том, что управляемое устройство находится в состоянии, позволяющем регулировать яркость.
- connected: если сигналы подтверждения, полученные вручную, получены вовремя, это значение true, в противном случае - false. При желании можно установить напрямую.

Пример ручной защиты можно найти в папке doc.

**Примечание:** При обновлении с версии без поддержки LPP существующие состояния LPC автоматически переносятся из `info.*` в `LPC.*`, а объекты защиты энергии — из `EnergyGuards.Guard_*` в `LPC.EnergyGuards.Guard_*`. Пользовательские скрипты, ссылающиеся на старые пути, необходимо обновить.

### Поведение
Когда блок управления отправляет сигнал на ограничение активности, адаптер распределяет его между всеми настроенными устройствами защиты от перенапряжения в зависимости от установленного ими процентного значения.

**Как работают проценты:**

Для каждого энергоконтроля установлен определенный процент, определяющий его долю в общем бюджете. Распределение не зависит от того, подключен или отключен контроллер в данный момент — каждый контроллер всегда участвует в распределении.

- Если сумма всех процентов меньше или равна 100%, каждый охранник получает свою установленную долю бюджета.
- Если сумма превышает 100%, все проценты пропорционально уменьшаются, чтобы уложиться в 100%.

**Предельные значения отказоустойчивости:**

Каждый защитный элемент имеет предел отказоустойчивости (минимальная мощность, которую ему всегда разрешено потреблять или производить). Алгоритм распределения перебирает защитные элементы: если процентная доля защитного элемента в оставшемся бюджете ниже его предела отказоустойчивости, защитный элемент фиксируется на этом пределе, и эта сумма вычитается из бюджета. Это повторяется до тех пор, пока не останется защитных элементов, требующих фиксации. Затем оставшийся бюджет распределяется пропорционально между незафиксированными защитными элементами.

**Пример:** Предельная мощность блока управления составляет 4200 Вт. У защитного устройства A она составляет 70%, а резервная мощность — 4200 Вт. У защитного устройства B она составляет 30%, а резервная мощность отсутствует.

- Доля мощности системы защиты A составит 2940 Вт, но для её аварийного режима требуется 4200 Вт → значение зафиксировано на уровне 4200 Вт.
- Остаток бюджета = 0W. Охранник B получает минимальный бюджет в 1W (минимальный бюджет, отличающийся от "без ограничений").

**Пример:** Максимальная мощность блока управления составляет 4200 Вт. У защитного устройства A она составляет 70%, и отсутствует функция аварийного отключения. У защитного устройства B она составляет 30%, и функция аварийного отключения отсутствует.

- Охранник А получает 2940 Вт (70%), охранник Б получает 1260 Вт (30%). Сумма = 4200 Вт.

**Ограничения, установленные вручную:**

Если на устройствах защиты от перенапряжения EEBUS установлены ручные ограничения, и блок управления отправляет активное ограничение, адаптер сбрасывает все ручные ограничения перед применением ограничения блока управления. Ручные ограничения нельзя установить, пока активно ограничение блока управления.

**Независимость:**

LPC и LPP работают независимо — ограничение потребления от блока управления не влияет на производственные устройства и наоборот.

### Тестирование
Перед сопряжением с реальным блоком управления следует протестировать систему с помощью симулятора, например: https://github.com/FernetMenta/eebus-device-tester. Если вы хотите использовать браузер с другого компьютера, отличного от того, на котором запущен тестер устройств, необходимо указать WEB_ADDR в качестве публичного IP-адреса этого компьютера. Например:

```
WEB_ADDR=192.168.171.49 ./device-tester -p 4815 -c cert.pem -k key.pem
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)

- Update instructions with info on how to run prebuilt binaries instead of a docker container
- Fix: clear discoverd devices on restart
- Move container image to GHCR: ghcr.io/fernetmenta/eebus-grpc:v2.0.2
- Fix: reported failsafe to controlbox is wrong because user set objects was not read at startup
- Fix: handle edge case when failsafeLimit / limit was set to 0
- More meaningful description
- Revised logic for distribution of limits to energy guards.
- Fix: send limit duration to eebus energy guards
- Fix: downgrade some heartbeat logs to debug level
- Fix: do not call distributeLimit if nothing changed
- Fix: Add minimum assured power to config, fix misinterpretation of contractual consumption nominal max.

### 1.1.1 (2026-08-20)

- Fix: adapter admin UI does not meet the ioBroker responsive design initiative requirements
- Fix: refactor subscribeCsLpcEvents and signal stream errors to caller
- Fix: drop console.log in grpc-service.js
- Fix: German strings / logging in grpc-service.js
- Update README with note on docker on Windows

### 1.1.0 (2026-08-19)

- Feature: automatic backup and restore of Docker volume certificates — certs are saved to the adapter data directory on connection and restored to the volume on adapter start, ensuring they survive ioBroker backup/restore cycles
- Check if docker is available and make admin UI options available on this.
- Update depencendy on eebus-grpc

### 1.0.0 (2026-08-17)

- Breaking: requires eebus-grpc container image version 2.0.0 (`fernetmenta/iobroker.eebus-grpc:2.0.0`). The gRPC API changed to a single-server architecture with instance-based routing — use cases no longer spawn separate gRPC servers.
- Feature: integrate ioBroker plugin-docker to automatically manage the eebus-grpc container (pull, start, stop, update) — enable via "Enable Docker Container" checkbox on Base Config tab (requires Docker Engine >= 20.10 on the host)
- Fix: reset info.connection state to false on adapter unload

### 0.3.2 (2026-08-14)

- Fix: reduce log spam on manual energy guards — require 2 consecutive missed heartbeats before marking disconnected, downgrade routine heartbeat logs to debug level
- Fix: suppress error-level logs and reconnect attempts when adapter is shutting down (gRPC stream CANCELLED is expected during stop)
- Add an example of a manual LPC guard to the doc folder.
- Fix: translations
- Various smaller fixes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2024-2026 FernetMenta <fernetmenta@online.de>

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

                            Preamble

The GNU General Public License is a free, copyleft license for
software and other kinds of works.

The licenses for most software and other practical works are designed
to take away your freedom to share and change the works. By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users. We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors. You can apply it to
your programs, too.

When we speak of free software, we are referring to freedom, not
price. Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights. Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received. You must make sure that they, too, receive
or can get the source code. And you must show them these terms so they
know their rights.

Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software. For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so. This is fundamentally incompatible with the aim of
protecting users' freedom to change the software. The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable. Therefore, we
have designed this version of the GPL to prohibit the practice for those
products. If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary. To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

0. Definitions.

"This License" refers to version 3 of the GNU General Public License.

"Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

"The Program" refers to any copyrightable work licensed under this
License. Each licensee is addressed as "you". "Licensees" and
"recipients" may be individuals or organizations.

To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy. The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

A "covered work" means either the unmodified Program or a work based
on the Program.

To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy. Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

To "convey" a work means any kind of propagation that enables other
parties to make or receive copies. Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License. If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

1. Source Code.

The "source code" for a work means the preferred form of the work
for making modifications to it. "Object code" means any non-source
form of a work.

A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form. A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities. However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work. For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

The Corresponding Source for a work in source code form is that
same work.

2. Basic Permissions.

All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met. This License explicitly affirms your unlimited
permission to run the unmodified Program. The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work. This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force. You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright. Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

Conveying under any other circumstances is permitted solely under
the conditions stated below. Sublicensing is not allowed; section 10
makes it unnecessary.

3. Protecting Users' Legal Rights From Anti-Circumvention Law.

No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

4. Conveying Verbatim Copies.

You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

5. Conveying Modified Source Versions.

You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit. Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

6. Conveying Non-Source Forms.

You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling. In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage. For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product. A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

"Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source. The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information. But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed. Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

7. Additional Terms.

"Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law. If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it. (Additional permissions may be written to require their own
removal in certain cases when you modify the work.) You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10. If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term. If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

8. Termination.

You may not propagate or modify a covered work except as expressly
provided under this License. Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License. If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

9. Acceptance Not Required for Having Copies.

You are not required to accept this License in order to receive or
run a copy of the Program. Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance. However,
nothing other than this License grants you permission to propagate or
modify any covered work. These actions infringe copyright if you do
not accept this License. Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

10. Automatic Licensing of Downstream Recipients.

Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License. You are not responsible
for enforcing compliance by third parties with this License.

An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations. If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License. For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

11. Patents.

A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based. The
work thus licensed is called the contributor's "contributor version".

A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version. For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement). To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients. "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License. You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

12. No Surrender of Others' Freedom.

If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License. If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all. For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

13. Use with the GNU Affero General Public License.

Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work. The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

14. Revised Versions of this License.

The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time. Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number. If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation. If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

Later license versions may give you additional or different
permissions. However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

15. Disclaimer of Warranty.

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

16. Limitation of Liability.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

17. Interpretation of Sections 15 and 16.

If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

To do so, attach the following notices to the program. It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License. Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

The GNU General Public License does not permit incorporating your program
into proprietary programs. If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library. If this is what you want to do, use the GNU Lesser General
Public License instead of this License. But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.