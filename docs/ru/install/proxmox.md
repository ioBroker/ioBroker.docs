---
title: Проксмокс
Version: 0.3
Autoren: TeNNo2k5, crunchip
Schlüsselworte: Proxmox, VM, LXC, USB Passthrough, Usb-Backup
lastChanged: 19.07.2026
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/proxmox.md
hash: imKxLXnIM3RpdEz0ybsRai8vJqexiRV+rinXjROC5bc=
---
# Проксмокс

![логотип Proxmox](../../de/install/media/proxmox/Proxmox-logo-860.png)

## Установка Proxmox

Proxmox Virtual Environment (сокращенно Proxmox VE) — это платформа виртуализации на основе Debian. Виртуализация основана на QEMU/KVM.

Proxmox "включает" QEMU/KVM в свой собственный веб-интерфейс, упрощает администрирование и поддерживает контейнеры Linux (LXC). Это делает Proxmox удобным для начинающих, но при этом достаточно мощным для профессионального использования.

В этом разделе на примере демонстрируется установка и базовая настройка Proxmox в бесплатной (без подписки) версии.

Для большей ясности описания изображений и дополнительная информация могут быть дополнены.

_Уведомление:_ Некоторые изображения в этом руководстве взяты из более старых версий Proxmox или Debian. Однако процесс и последовательность действий остаются неизменными и напрямую применимы к текущим версиям (таким как Proxmox VE 9 и Debian 13).

### Требования

<details>
<summary>Voraussetzungen</summary>

- 64-битный процессор
- Процессор и материнская плата поддерживают технологию Intel VT/AMD-V для виртуализации (ее необходимо включить в BIOS).
- 1 ГБ оперативной памяти (только для Proxmox). В зависимости от количества запускаемых виртуальных машин потребуется больше оперативной памяти. Поэтому рекомендуется минимум 8 ГБ, а предпочтительно 16 ГБ.

</details>

### Создайте ISO-образ/загрузочную USB-флешку

Во-первых, вам нужен ISO-образ, который находится на... [Страница загрузки Proxmox](https://www.proxmox.com/de/downloads/category/iso-images-pve) можно скачать.

<details>
<summary>Proxmox Iso</summary>

![проксмокс-изо](../../de/install/media/proxmox/proxmox-iso.png)

</details>

Для установки создается загрузочный USB-накопитель с использованием этого ISO-образа. На этом накопителе должно быть не менее 2 ГБ памяти. Существует несколько способов создания загрузочного USB-накопителя; см. ниже. [Подготовьте установочные носители.][Installationsmedien vorbereiten].

### установка

Система настроена в UEFI/BIOS на загрузку с USB-накопителя. После установки USB-накопителя через короткое время появляется меню установки Proxmox. В качестве альтернативы, USB-накопитель можно указать в качестве загрузочного устройства вручную (на большинстве материнских плат это делается с помощью клавиш F8 или F11).

Теперь меню установки простое **Установите Proxmox VE** выбрано.

<details>
<summary>Installations Menü</summary>

![меню установки](../../de/install/media/proxmox/installationsmenü.png)

</details>

Следующий шаг — согласие с условиями использования (EULA).

<details>
<summary>Eula</summary>

![эула](../../de/install/media/proxmox/eula.png)

</details>

Далее необходимо выбрать жесткий диск, на который будет установлен Proxmox. Если на сервере установлено несколько дисков, убедитесь, что вы выбрали правильный!

<details>
<summary>Auswahl der Festplatte</summary>

![выбор жесткого диска](../../de/install/media/proxmox/festplattenauswahl.png)

</details>

С **Параметры кнопки** Можете ли вы также указать дополнительные параметры для установочного жесткого диска?

<details>
<summary>Erweiterte Optionen Festplatte</summary>

![параметры жесткого диска](../../de/install/media/proxmox/harddisk-options.png)

</details>

Proxmox использует [Менеджер логических томов](https://de.wikipedia.org/wiki/Logical_Volume_Manager) (LVM). Расширенные параметры позволяют детально настроить LVM. Установщик создает группу томов (VG) с именем pve и дополнительные логические тома (LV) с именами root (где установлен сам Proxmox), data (хранилище, где хранятся виртуальные диски виртуальных машин) и swap (где хранится файл подкачки).

<details>
<summary>Mit den erweiterten Einstellungen können hier gewisse Parameter angegeben werden:</summary>

- Файловая система: Здесь вы можете выбрать файловую систему. По умолчанию используется ext4, что в большинстве случаев является хорошим выбором. Если в хост-системе доступно несколько жестких дисков (и достаточно оперативной памяти), целесообразно использовать ZFS с соответствующим уровнем RAID. Однако в этом случае вам необходимо иметь базовое представление о ZFS.
- hdsize: Указывает общий размер жесткого диска, который будет использоваться Proxmox. Обычно здесь выбирается весь размер жесткого диска, если только вы не планируете добавить дополнительные разделы позже.
- swapsize: Определяет размер тома подкачки. По умолчанию он равен размеру установленного хранилища, но с минимальным значением 4 ГБ и максимальным значением 8 ГБ.
- maxroot: Указывает максимальный размер корневого тома (самого Proxmox). **Следует отметить, что при базовой установке необходимые в дальнейшем шаблоны и ISO-образы также хранятся здесь.**
- minfree: Остаток свободного места на диске в группе томов LVM pve. Если объем жесткого диска превышает 128 ГБ, по умолчанию остается свободным 16 ГБ (LVM всегда требуется некоторое свободное место для создания снимков).
- maxvz: Задает максимальный размер тома данных.

</details>

Обычно все параметры можно оставить по умолчанию (то есть, здесь ничего не указано). Для большинства установок они уже оптимально настроены.

После выбора жесткого диска для Proxmox запрашиваются параметры локализации (страна, время и соответствующая раскладка клавиатуры):

<details>
<summary>Lokalisierung</summary>

![расположение](../../de/install/media/proxmox/location.png)

</details>

Далее вам будет предложено ввести пароль пользователя root. Также вам будет предложено указать адрес электронной почты для отправки важных системных сообщений. Действительный адрес электронной почты не требуется (однако в этом случае вы не будете получать уведомления о системных событиях по электронной почте).

<details>
<summary>Passwort und Email</summary>

![пароль](../../de/install/media/proxmox/password.png)

</details>

Следующий шаг установщика связан с настройкой сети. Можно выбрать соответствующий сетевой интерфейс. Имя хоста можно выбрать произвольно, но необходимо указать DNS-домен. Например, для пользователей Fritz!Box это будет... `hostname.fritz.box`Для IP-адреса предпочтительно указывать статический IP-адрес (не DHCP). Это включает в себя сам IP-адрес (в формате CIDR), IP-адрес шлюза (обычно IP-адрес маршрутизатора) и используемый DNS-сервер (в домашней среде обычно также IP-адрес маршрутизатора). Proxmox обычно определяет сеть автоматически.

<details>
<summary>Netzwerk</summary>

![сеть](../../de/install/media/proxmox/network.png)

</details>

В заключение отображается сводка по установке:

<details>
<summary>Zusammenfassung</summary>

![краткое содержание](../../de/install/media/proxmox/zusammenfassung.png)

</details>

Установка системы будет выполнена после проверки настроек и нажатия кнопки «Установить».

<details>
<summary>Installation</summary>

![установка](../../de/install/media/proxmox/installation.png)

</details>

После непродолжительной паузы установка завершается, и система перезагружается (предварительно извлеките USB-накопитель с образом ISO).

Далее вы увидите терминал. Здесь отображаются инструкции по доступу к системе:

<details>
<summary>Konsole</summary>

![консоль](../../de/install/media/proxmox/konsole.png)

</details>

Теперь продолжим в браузере (например). <https://10.1.1.89:8006>Сначала появляется предупреждение. Это связано с тем, что во время установки был сгенерирован самоподписанный сертификат, который браузер не распознает. Вы можете смело игнорировать это сообщение; соединение определенно зашифровано по протоколу HTTPS. Само сообщение зависит от браузера. В этом примере, при нажатии на **Расширенный** а затем далее **Продолжение до 10.1.1.89 (неопределенно)**

<details>
<summary>Datenschutzfehler</summary>

![ошибка защиты данных](../../de/install/media/proxmox/datenschutzfehler.png)

</details>

Вход в систему осуществляется с использованием пользователя root и пароля, выбранного во время установки. Здесь же можно выбрать язык. **первый** Переключитесь на немецкий язык, что избавит вас от необходимости повторно вводить имя пользователя и пароль.

<details>
<summary>Anmeldung</summary>

![регистрация](../../de/install/media/proxmox/anmeldung.png)

</details>

Сразу после входа в систему вы увидите сообщение о том, что у вас нет действующей подписки на этот сервер. Подтвердите это сообщение, нажав кнопку ОК.

<details>
<summary>Subscription</summary>

![подписка](../../de/install/media/proxmox/subskription.png)

</details>

В настоящее время происходит корректировка исходных кодов пакетов Proxmox для получения обновлений.

<details>
<summary>Paketquellen</summary>

![исходные коды пакетов](../../de/install/media/proxmox/paketquellen.png)

</details>

Это будет сделано посредством **Репозиторий без подписки** Добавлено в исходные файлы пакета. Это можно сделать в меню экземпляра Proxmox. `Updates > Repositories` Это будет сделано. Репозиторий без подписки можно добавить с помощью кнопки «Добавить»:

<details>
<summary>Non-Subscription</summary>

![без подписки](../../de/install/media/proxmox/no-subscription.png)

</details>

Теперь следует добавить следующее: **Корпоративный репозиторий** Эту функцию можно отключить. Для этого просто выберите репозиторий pve-enterprise в окне репозитория и нажмите кнопку. **Деактивировать** клик.

В этом случае конфигурация репозитория будет выглядеть следующим образом:

<details>
<summary>Enterprise-Repository</summary>

![предприятие](../../de/install/media/proxmox/enterprise.png)

</details>

### Обновления

После изменения источников пакетов необходимо выполнить первоначальное обновление системы. Лучший способ сделать это — через веб-интерфейс:

<details>
<summary>Updates</summary>

![обновления](../../de/install/media/proxmox/updates.png)

</details>

Просто выберите нужный узел Proxmox (например, "pve") и перейдите в раздел "Обновления". **Обновлять** Нажмите. Откроется окно «Просмотр задач», которое появляется при обнаружении активности системы. Это диалоговое окно можно закрыть сразу, так как задача продолжает выполняться в фоновом режиме. Ожидание завершения («ЗАДАЧА ОК») не требуется. Если доступны обновления, их можно установить, нажав на кнопку. **Обновление** в котором будет сыграно.

После этого откроется веб-консоль, которая позволит вам отслеживать ход выполнения.

<details>
<summary>Web-Konsole</summary>

![веб-консоль](../../de/install/media/proxmox/web-konsole.png)

</details>

Конечно, обновить сервер Proxmox можно и через командную строку (например, через SSH):

```bash
apt-get update && apt-get dist-upgrade
```

или, совсем недавно:

```bash
apt update && apt full-upgrade
```

Здесь важно лишь то, чтобы у вас было **apt-get dist-upgrade** или **apt полное обновление** (На обычных машинах Debian/Ubuntu обычно используется команда \`apt upgrade\`). Однако команда \`dist-upgrade\` или \`full-upgrade\` важна для Proxmox, поскольку она лучше решает проблемы с зависимостями, необходимыми для корректной работы Proxmox.

Таким образом, базовая конфигурация Proxmox теперь полностью готова. Если вы хотите узнать больше о Proxmox, стоит ознакомиться с... [Вики Proxmox](https://pve.proxmox.com/wiki/Main_Page) или в [официальный форум](https://forum.proxmox.com/).

---

## Proxmox — создание виртуальной машины Qemu/KVM (VM) и последующая установка ioBroker.

В этом руководстве показано, как это сделать. [VM][] Создается Debian (стабильная версия, начиная с 2026 года = Debian 13 'Trixie'), после чего в нее устанавливается ioBroker.

В качестве альтернативы Debian можно использовать Ubuntu, хотя использование... **LTS-версия** следует принять во внимание.

Для большей наглядности описания изображений и дополнительная информация представлены в раскрывающихся разделах.

### 1 - Скачать образ ISO

Сначала создаётся образ ISO ([64-битный ПК Netinst-ISO][ISO-Image]) является обязательным и загружается в корневой каталог (local) при базовой установке.

Для этого перейдите в раздел «Локальные файлы > ISO-образы». Есть два варианта:

- Через кнопку **Загрузить** ISO-файл, который ранее хранился на компьютере, можно загрузить на хост Proxmox.
- Над **Скачать по URL** ISO-образ можно загрузить непосредственно на хост через URL. Для этого скопируйте адрес ссылки на 64-битный ISO-образ PC Netinst (щелкните правой кнопкой мыши), вставьте URL и нажмите \[соответствующую кнопку/команду]. **URL запроса** получено. Последний клик по **Скачать** Начинает загрузку непосредственно на хост.

<details>
<summary>ISO herunterladen</summary>

![vm-iso](../../de/install/media/proxmox/vm-iso.png)

![vm-isourl](../../de/install/media/proxmox/vm-isourl.png)

</details>

### 2. Создайте виртуальную машину.

Нажатием на синюю кнопку **Создать виртуальную машину** Откроется окно со следующими настройками:

- Общие сведения: Имя хоста и пароль назначаются, идентификатор предопределен (начинается с 100), его можно изменить, но не позднее.
- ОС: Выбор хранилища (локальное) и образ ISO (debian-13-netinst.iso)
- Система: все настройки остаются по умолчанию. **флажок Qemu Agent**
- Диски: локальное хранилище LVM, размер диска 10 ГБ (10-20 ГБ должно быть достаточно, последующие изменения возможны, но здесь они не описываются более подробно).
- Процессор: Зависит от производительности компьютера (можно также настроить в любое время, для этого необходимо перезапустить виртуальную машину).
- Память: размер ОЗУ в МиБ (можно изменить в любое время, для этого необходимо перезапустить виртуальную машину).
- Сеть: vmbr0, все остальное остается без изменений.
- Подтверждение: Здесь вы можете еще раз увидеть сводку (поставьте галочку рядом с...). **Начать после создания**) затем, нажав на **Полный** Виртуальная машина была создана.

<details>
<summary>Bilderserie Erstelle VM</summary>

![vm-general](../../de/install/media/proxmox/vm-allgemein.png)

![vm-os](../../de/install/media/proxmox/vm-os.png)

![система виртуальных машин](../../de/install/media/proxmox/vm-system.png)

![vm-диски](../../de/install/media/proxmox/vm-disks.png)

![vm-cpu](../../de/install/media/proxmox/vm-cpu.png)

![хранилище виртуальных машин](../../de/install/media/proxmox/vm-speicher.png)

![сеть виртуальных машин](../../de/install/media/proxmox/vm-netzwerk.png)

![vm-confirm](../../de/install/media/proxmox/vm-bestätigen.png)

</details>

### 3 - Установка Debian

После запуска виртуальной машины перейдите в консоль виртуальной машины и запустите ее. **Установить**.

<details>
<summary>Konsole</summary>

![vm-install](../../de/install/media/proxmox/vm-install.png)

</details>

Процесс установки проведет вас через все этапы, требуя настройки нескольких параметров. Для навигации вам понадобятся клавиши Tab, Space и стрелки. Ввиду сложности программы, различные настройки показаны на прилагаемых изображениях.

<span style="color:red">**ВНИМАНИЕ! — Пароль root не должен быть установлен.**</span>

<span style="color:red">**ВНИМАНИЕ! — В качестве имени пользователя не следует выбирать ioBroker, так как оно уже используется внутри системы.**</span>

Имя пользователя должно состоять только из строчных букв и цифр от 0 до 9 и начинаться с буквы. Дефис также допускается, но не в качестве первого символа.

<details>
<summary>Bilderserie Debian Install</summary>

![vm-1](../../de/install/media/proxmox/vm-1.png)

![vm-2](../../de/install/media/proxmox/vm-2.png)

![vm-3](../../de/install/media/proxmox/vm-3.png)

![vm-4](../../de/install/media/proxmox/vm-4.png)

![vm-5](../../de/install/media/proxmox/vm-5.png)

![vm-6](../../de/install/media/proxmox/vm-6.png)

![vm-7](../../de/install/media/proxmox/vm-7.png)

![vm-8](../../de/install/media/proxmox/vm-8.png)

![vm-9](../../de/install/media/proxmox/vm-9.png)

![vm-10](../../de/install/media/proxmox/vm-10.png)

![vm-11](../../de/install/media/proxmox/vm-11.png)

![vm-12](../../de/install/media/proxmox/vm-12.png)

![vm-13](../../de/install/media/proxmox/vm-13.png)

![vm-14](../../de/install/media/proxmox/vm-14.png)

![vm-15](../../de/install/media/proxmox/vm-15.png)

![vm-16](../../de/install/media/proxmox/vm-16.png)

![vm-17](../../de/install/media/proxmox/vm-17.png)

![vm-18](../../de/install/media/proxmox/vm-18.png)

![vm-19](../../de/install/media/proxmox/vm-19.png)

![vm-20](../../de/install/media/proxmox/vm-20.png)

![vm-21](../../de/install/media/proxmox/vm-21.png)

![vm-22](../../de/install/media/proxmox/vm-22.png)

![vm-23](../../de/install/media/proxmox/vm-23.png)

![vm-24](../../de/install/media/proxmox/vm-24.png)

![vm-25](../../de/install/media/proxmox/vm-25.png)

![vm-26](../../de/install/media/proxmox/vm-26.png)

</details>

### 4. Настройка виртуальной машины

Перезагрузите виртуальную машину, затем войдите в систему, используя имя пользователя и пароль, назначенные во время установки. После этого используйте команду...

```bash
ip addr
```

IP-адрес найден. Он необходим для удалённого подключения к виртуальной машине через SSH, как это будет сделано на следующем шаге.

<details>
<summary>ip addr</summary>

![vm-iaddr](../../de/install/media/proxmox/vm-ipaddr.png)

</details>

Теперь вы можете получить доступ к виртуальной машине через SSH (например, PuTTY). Войдите снова, используя свое имя пользователя и пароль. Затем вы можете ввести сетевой адрес **dhcp** на **статический** будет изменено. (что рекомендуется для работы сервера)

```bash
sudo nano /etc/network/interfaces
```

<details>
<summary>network/interfaces</summary>

![vm-nano](../../de/install/media/proxmox/vm-nano.png)

![vm-dhcp](../../de/install/media/proxmox/vm-dhcp.png)

![vm-static](../../de/install/media/proxmox/vm-statisch.png)

</details>

Изменения в редакторе сохраняются с помощью комбинации клавиш CTRL + o, за которой следует ENTER; CTRL + x закрывает редактор.

Изменения IP-адреса вступят в силу только после перезапуска виртуальной машины. Однако перед этим выполняется проверка активности гостевого агента Qemu с помощью...

```bash
sudo systemctl status qemu-guest-agent
```

<details>
<summary>Guest-Agent</summary>

![vm-qemuguest](../../de/install/media/proxmox/vm-qemuguest.png)

</details>

<span style="color:orange">**ВНИМАНИЕ! — В системах Ubuntu необходимо установить и запустить гостевой агент Qemu.**</span>

Для этого используются следующие команды:

```bash
sudo apt-get install qemu-guest-agent
sudo systemctl start qemu-guest-agent
```

Кроме того, для установки ioBroker требуется следующий инструмент: **локон**
установить позже.

```bash
sudo apt install curl
```

<details>
<summary>curl nachinstallieren</summary>

![vm-curl](../../de/install/media/proxmox/vm-curl.png)

</details>

Для сквозной передачи USB-устройств в виртуальной машине выберите VM > Hardware > Add > USB Devices > Manufacturer/Device ID. Здесь будут перечислены все подключенные устройства.

<details>
<summary>USB-Geräte</summary>

![vm-usb](../../de/install/media/proxmox/vm-usb.png)

</details>

Для обеспечения автоматического запуска виртуальной машины после перезагрузки хоста Proxmox эта функция включается в параметрах виртуальной машины.

<details>
<summary>Option booten</summary>

![vm-boots](../../de/install/media/proxmox/vm-booten.png)

</details>

Установка и настройка виртуальной машины завершены. Теперь виртуальную машину можно перезапустить, после чего можно установить ioBroker.

---

## Proxmox — создание контейнера Linux (LXC) и последующая установка ioBroker.

В этом примере показано, как создать [Контейнер LXC][LXC Container] Создается образ системы Debian 13, после чего в него устанавливается ioBroker.

Для большей ясности описания изображений и дополнительная информация могут быть дополнены.

### Альтернативный вариант: автоматическая установка с помощью вспомогательных скриптов.

Для Proxmox существуют популярные вспомогательные скрипты. Изначально они были созданы tteck, а после его смерти поддерживаются сообществом под \[ссылка на скрипт].
[helper-scripts.com][] Они активно поддерживаются. Благодаря им можно полностью автоматически настроить контейнер ioBroker одной командой.

> \[!ПРЕДУПРЕЖДЕНИЕ]
> **ВАЖНОЕ ПРЕДУПРЕЖДЕНИЕ ПО БЕЗОПАСНОСТИ:**
> Слепое копирование и выполнение скриптов из интернета непосредственно в консоли Proxmox (например, через...) `curl | bash`Это представляет собой серьёзный риск для безопасности!
>
> Перед запуском скрипта всегда следует внимательно прочитать и понять его исходный код, чтобы знать, какое воздействие он окажет на систему. Если вы не понимаете синтаксис или не доверяете проекту, следует воздержаться от этого метода и выбрать ручную установку, чтобы избежать нарушения целостности и безопасности вашего сервера Proxmox.

Те, кто осведомлен о рисках и ознакомился со скриптами, могут найти команды и документацию непосредственно по адресу \[ссылка]. [helper-scripts.com][].

### 1 - Скачать шаблон контейнера

Во-первых, необходим шаблон, который загружается в корневой каталог (локальный) при базовой установке (при условии, что дополнительные диски не были созданы).

Для этого перейдите в раздел «Локальные > Шаблоны контейнеров». Нажмите на
**Шаблоны** Откроется список вариантов. Здесь вы выбираете нужный вариант.
`debian-13-standard` (Трикси) и нажмите кнопку загрузки.

<details>
<summary>Template herunterladen</summary>

![местный](../../de/install/media/proxmox/local.png)

![шаблоны](../../de/install/media/proxmox/templates.png)

![загрузка шаблона](../../de/install/media/proxmox/template-laden.png)

</details>

### 2 - Создать LXC

Нажатием на синюю кнопку **Создать КТ** Откроется окно со следующими настройками:

- Общие сведения: Имя хоста и пароль назначаются; идентификатор предопределен (начинается с 100), но может быть изменен.
- Шаблон: Выбор хранилища (локальное) и Шаблон (debian-13-standard)
- Диски: Задание размера диска (не завышайте размер, его всегда можно увеличить позже).
- Процессор: Зависит от производительности компьютера (можно также настроить в любое время).
- Память: распределение оперативной и подкачки (можно изменить в любое время, даже во время работы).
- Сеть: статическое назначение IP-адреса/CIDR, шлюз; если IPv6 не настроен, будет установлено значение SLAAC.
- DNS: обычно ничего не меняется (используются значения с хоста).
- Подтвердить: Сводка (поставьте галочку в соответствующем поле). **Начать после создания**) затем, нажав на **Полный** Контейнер создан.

<details>
<summary>Bilderserie Erstelle CT</summary>

![ПВЭ](../../de/install/media/proxmox/pve.png)

![lxc-general](../../de/install/media/proxmox/lxc-allgemein.png)

![lxc-template](../../de/install/media/proxmox/lxc-template.png)

![lxc-диски](../../de/install/media/proxmox/lxc-disks.png)

![lxc-cpu](../../de/install/media/proxmox/lxc-cpu.png)

![память LXC](../../de/install/media/proxmox/lxc-speicher.png)

![сеть lxc](../../de/install/media/proxmox/lxc-netzwerk.png)

![lxc-dns](../../de/install/media/proxmox/lxc-dns.png)

![lxc-confirm](../../de/install/media/proxmox/lxc-bestätigen.png)

![lxc-taskviewer](../../de/install/media/proxmox/lxc-taskviewer.png)

</details>

### 3. Настройка LXC

Теперь, когда контейнер запущен, перейдите в консоль LXC.

<details>
<summary>Konsole</summary>

![консоль lxc](../../de/install/media/proxmox/lxc-konsole.png)

</details>

Сначала войдите в систему как root, используя ранее назначенный пароль, который был указан при создании LXC-файла, а затем обновите его до последней версии.

```bash
apt update && apt upgrade
```

<details>
<summary>Upgrade</summary>

![lxc-upgrade](../../de/install/media/proxmox/lxc-upgrade.png)

</details>

Затем текст напрямую предлагает пользователю установить часовой пояс.

```bash
dpkg-reconfigure tzdata
```

<details>
<summary>Zeitzone</summary>

![lxc-tzdata](../../de/install/media/proxmox/lxc-tzdata.png)

![lxc-area](../../de/install/media/proxmox/lxc-area.png)

![lxc-timezone](../../de/install/media/proxmox/lxc-timezone.png)

</details>

Теперь будет **судо** и **локон** Установка была произведена позже. Для корректного создания пользователя, как на следующем шаге, который будет использоваться для дальнейшей работы в консоли, требуется команда \`sudo\`. Для запуска скрипта установки ioBroker на заключительном шаге необходима команда \`curl\`.

```bash
apt install sudo curl
```

<details>
<summary>Nachinstallieren</summary>

![lxc-sudo](../../de/install/media/proxmox/lxc-sudo.png)

</details>

Теперь создайте будущего пользователя. Замените "username" в данном случае. Установите пароль для пользователя. Остальное можно подтвердить нажатием клавиши ENTER.

Уведомление:

**iobroker** Не выбирайте это имя пользователя, так как оно уже используется внутри системы.

```bash
adduser benutzername
```

Затем пользователю назначается группа sudo.

```bash
usermod -aG sudo benutzername
```

Если пользователь создается впоследствии, его назначение в соответствующие группы осуществляется следующим образом:

```bash
usermod -aG adm,dialout,sudo,audio,video,plugdev,users,iobroker benutzername
```

<details>
<summary>User anlegen</summary>

![lxc-adduser](../../de/install/media/proxmox/lxc-adduser.png)

</details>

В качестве последнего шага перед установкой ioBroker, выйдите из системы.

```bash
exit
```

Затем войдите в систему под новым именем пользователя. После этого можно устанавливать ioBroker.

<details>
<summary>ausloggen und mit Benutzer anmelden</summary>

![lxc-user login](../../de/install/media/proxmox/lxc-useranmeldung.png)

</details>

Для обеспечения автоматического запуска LXC после перезапуска хоста Proxmox эта функция включена в параметрах контейнера.

<details>
<summary>Option booten</summary>

![lxc-booten](../../de/install/media/proxmox/lxc-booten.png)

</details>

### Необязательно: Устранить предупреждения/сообщения об ошибках, касающиеся служб, которые не запустились.

При вызове команды \`iob diag\` в выходных данных могут содержаться сообщения об ошибках, подобные показанным ниже. Некоторые из этих ошибок возникают только в непривилегированных контейнерах, в то время как другие встречаются и в привилегированных контейнерах.

```
....
*** FAILED SERVICES ***

  UNIT                                 LOAD   ACTIVE SUB    DESCRIPTION
* run-rpc_pipefs.mount                 loaded failed failed RPC Pipe File System
* sys-kernel-config.mount              loaded failed failed Kernel Configuration File System
* systemd-networkd-wait-online.service loaded failed failed Wait for Network to be Configured
...
```

Если вы хотите очистить контейнер перед установкой iobroker, вы можете получить сообщение "FAILED SERVICES" следующим образом:

```bash
systemctl list-units --failed
```

Вот последовательность действий по устранению неполадок:

#### не удалось выполнить команду run-rpc\_pipefs.mount службы.

```bash
sudo systemctl mask run-rpc_pipefs.mount
sudo systemctl mask var-lib-nfs-rpc_pipefs.mount
```

#### не удалось выполнить службу sys-kernel-config.mount

В файл конфигурации контейнера в каталоге `/etc/pve/lxc` Добавьте следующую строку:

```
lxc.cap.drop: "sys_rawio audit_read"
```

#### не удалось выполнить службу systemd-networkd-wait-online.service

Замена `ifupdown` Сервис от `ifupdown2`:

```bash
sudo systemctl disable --now systemd-networkd-wait-online.service
sudo systemctl disable --now systemd-networkd.service
sudo systemctl disable --now ifupdown-wait-online
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install ifupdown2
```

---

## Установите ioBroker

Для установки ioBroker достаточно выполнить всего одну команду.

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

Процесс установки состоит из 4 этапов, которые полностью автоматизированы.

- Установка необходимых компонентов (1/4)
- Создание пользователя и каталога ioBroker (2/4)
- Установка ioBroker (3/4)
- Завершение установки (4/4)

<details>
<summary>Installer</summary>

![iobroker-installer](../../de/install/media/proxmox/iobroker-installer.png)

![iobroker-installer1](../../de/install/media/proxmox/iobroker-installer1.png)

![iobroker-installer2](../../de/install/media/proxmox/iobroker-installer2.png)

![iobroker-installer3](../../de/install/media/proxmox/iobroker-installer3.png)

</details>

Установка считается успешно завершенной, когда в конце появляется следующее сообщение.

```
ioBroker was installed successfully
Open http://10.1.1.222:8081 in a browser and start configuring!
```

Это также означает, что теперь к ioBroker можно получить доступ по адресу в вашем браузере. Если все прошло правильно, вас встретит страница настройки ioBroker. Теперь осталось всего несколько шагов, которые проведет вас мастер настройки.

<details>
<summary>Bilderserie ioBroker Assistent</summary>

![iobroker-setup](../../de/install/media/proxmox/iobroker-setup.png)

![iobroker-setup1](../../de/install/media/proxmox/iobroker-setup1.png)

![iobroker-setup2](../../de/install/media/proxmox/iobroker-setup2.png)

![iobroker-setup3](../../de/install/media/proxmox/iobroker-setup3.png)

![iobroker-setup4](../../de/install/media/proxmox/iobroker-setup4.png)

![iobroker-setup5](../../de/install/media/proxmox/iobroker-setup5.png)

![iobroker-setup6](../../de/install/media/proxmox/iobroker-setup6.png)

</details>

После этого у вас появится возможность выполнить поиск устройств и служб. Необходимые адаптеры/экземпляры могут быть созданы автоматически.

<details>
<summary>Bilderserie Geräte/Dienst Suche</summary>

![поиск устройств](../../de/install/media/proxmox/gerätesuche.png)

![экземпляры](../../de/install/media/proxmox/instanzen.png)

![iobroker-ready](../../de/install/media/proxmox/iobroker-fertig.png)

</details>

Установка ioBroker завершена. Дополнительные адаптеры можно установить в любое время в зависимости от сценария использования и ваших предпочтений.

---

## Proxmox - LXC (контейнеры Linux) -> Передача USB-устройств

В этой части руководства пошагово объясняется, как передать USB-устройство (сквозная передача USB) в Proxmox контейнеру LXC (контейнеру Linux).

В случае виртуальной машины (ВМ) передача USB-устройства возможна напрямую через веб-интерфейс Proxmox. В случае контейнера Linux в настоящее время это требует ручного редактирования конфигурационного файла LXC.

В инструкциях приводится пример того, как интегрировать **Texas Instruments Inc. CC2531** Описание устройств Zigbee.

_Уведомление:_ Микросхема CC2531 технически устарела, имеет очень мало памяти и больше не рекомендуется для новых конфигураций в сообществе ioBroker. Вместо неё следует использовать современные USB-накопители (например, CC2531). _Sonoff Zigbee 3.0 USB Dongle Plus_ на основе CC2652P или _Конби &#x33;_&#x41F;ошаговая инструкция по передаче данных, описанная в этом руководстве, идентична практически для всех устройств, преобразующих USB-сигнал в последовательный порт (например, устройств для считывания показаний интеллектуальных счетчиков, других устройств Zigbee). Исключением являются сетевые устройства USB (такие как Bluetooth или Wi-Fi).

- В этой части инструкций используется Proxmox версии 9.x.

### 1.) Соберите информацию об USB-устройстве.

<details>

Установление SSH-соединения с Proxmox:

```bash
ssh root@IP-Adresse
```

<span style="color:red">**Если USB-устройство уже подключено к хосту Proxmox, временно отключите его.**</span>

Следующая команда выводит список всех подключенных в данный момент USB-устройств на хосте Proxmox:

```bash
lsusb
```

![proxmoxlxc00](../../de/install/media/proxmox/proxmoxlxc00.PNG)

Теперь USB-устройство, которое необходимо интегрировать, подключается к хосту Proxmox, и команда lsusb выполняется снова.

![proxmoxlxc01](../../de/install/media/proxmox/proxmoxlxc01.PNG)

На скриншоте показано новое устройство с номером шины USB: **001** и номер устройства: **003** указан в списке.

Эта информация необходима, помимо прочего, для использования следующей команды, чтобы... **основной номер устройства** вывод с устройства:

```bash
ls -l /dev/bus/usb/001/003
```

Важно: используйте номер вашей USB-шины и номер устройства в качестве выходных данных команды!

**_ls -l /dev/bus/usb/USB-Bus-Number/Device-Number_**

![proxmoxlxc02](../../de/install/media/proxmox/proxmoxlxc02.PNG)

В этом примере USB-устройство имеет основной номер устройства. **189**Запишите значение вашего устройства в текстовый файл с пометкой: #1

![proxmoxlxc03](../../de/install/media/proxmox/proxmoxlxc03.PNG)

Далее выводится уникальный идентификатор USB-устройства, и это значение записывается в текстовый файл с пометкой: #2:

```bash
ls /dev/serial/by-id/
```

![proxmoxlxc04](../../de/install/media/proxmox/proxmoxlxc04.PNG)

![proxmoxlxc05](../../de/install/media/proxmox/proxmoxlxc05.PNG)

В качестве заключительного шага выводится основной номер устройства ttyACM, который обозначается следующим образом: #3:

```bash
ls -l /dev/ttyACM*
```

![proxmoxlxc06](../../de/install/media/proxmox/proxmoxlxc06.PNG)

> _Если вывод отсутствует, проверьте с помощью команды "ls -l /dev/serial/by-id/", смонтировано ли USB-устройство системой как ttyUSB; если да, замените все последующие команды, которые ссылаются на него. **ttyACM…** получить через **ttyUSB…** Если вывод отсутствует, это не устройство класса USB CDC (последовательная связь), поэтому все шаги по его интеграции из ttyACM можно проигнорировать._

Таким образом, **три** Задает значения USB-устройства, необходимые для интеграции в конфигурационный файл LXC.

![proxmoxlxc07](../../de/install/media/proxmox/proxmoxlxc07.PNG)

</details>

### 2.) Отредактируйте конфигурационный файл LXC.

<details>

На хосте Proxmox перейдите в каталог конфигурации LXC, используя следующую команду:

```bash
cd /etc/pve/lxc
```

Конфигурационный файл имеет тот же идентификационный номер, который был присвоен при создании файла LXC!

![proxmoxlxc08](../../de/install/media/proxmox/proxmoxlxc08.PNG)

![proxmoxlxc09](../../de/install/media/proxmox/proxmoxlxc09.PNG)

Перед редактированием конфигурационного файла необходимо создать его резервную копию:

```bash
cp 201.conf 201.conf.backup
```

![proxmoxlxc10](../../de/install/media/proxmox/proxmoxlxc10.PNG)

Теперь файл конфигурации редактируется с помощью vi или nano:

```bash
nano 201.conf
```

![proxmoxlxc11](../../de/install/media/proxmox/proxmoxlxc11.PNG)

В конец конфигурационного файла добавляется следующее:

```
lxc.cgroup2.devices.allow: c 189:* rwm
lxc.mount.entry: usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 dev/serial/by-id/usb-Texas_Instruments_TI_CC2531_USB_CDC___0X00124B0012023529-if00 none bind,optional,create=file

lxc.cgroup2.devices.allow: c 166:* rwm
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

Замените выделенные значения записями из ваших заметок!

![12](../../de/install/media/proxmox/proxmoxlxc12.PNG)

- Первая строка содержит номер основного устройства. **189** Примечание: #1
- Во второй строке уникальный идентификатор (usb-Texas\_Instruments\_TI\_CC2531\_USB\_CDC\_\_\_0X00124B0012023529-if00) из примечания № 2 указан отдельно и с абсолютным путем (без переноса строки).
- В третьей строке указан основной номер устройства. **166** Как указано в примечании № 3 пользователем ttyACM.

Сохраните файл конфигурации (в редакторе Nano используйте сочетание клавиш: CTRL + o и CTRL + x для выхода из редактора).

</br>

<span style="color:orange">**ВНИМАНИЕ! — Если в вашем контейнере есть активные снимки:**</span>

<details>

В таком случае код lxc.cgroup следует размещать не в конце файла конфигурации, а перед первой записью снимка.

![proxmoxlxc18](../../de/install/media/proxmox/proxmoxlxc18.PNG)

</details>

<span style="color:orange">**ВНИМАНИЕ! — Для установки Proxmox версий ниже 7.0:**</span>

<details>

Замените записи на

```
lxc.cgroup2
```

через

```
lxc.cgroup
```

</details>

</br>  
Abschließend wird der folgende Befehl ausgeführt, um die benötigten Rechte
für `ttyACM0` zu setzen:

```bash
chmod o+rw /dev/ttyACM*
```

Для применения изменений к LXC выполняется холодная перезагрузка контейнера с использованием **идентификатор остановки pct / идентификатор начала pct** выполненный:

```bash
pct stop 201
```

```bash
pct start 201
```

</br>

<span style="color:green">**Совет: Лучше всего сохранить копию рабочего конфигурационного файла на внешнем носителе, поскольку, например, встроенная служба резервного копирования Proxmox не создает резервные копии содержимого вашего конфигурационного файла!**</span>

</br>

</details>

### 3) Проверьте конфигурацию сквозной передачи USB-сигнала LXC и экземпляра Zigbee.

<details>

Установление SSH-соединения с LXC:

```bash
ssh Benutzer@IP-Adresse
```

С помощью команд:

```bash
lsusb
```

&

```bash
ls -l /dev
```

Система проверяет, были ли изменения в конфигурационном файле успешно внесены.

![proxmoxlxc13](../../de/install/media/proxmox/proxmoxlxc13.PNG)

- Как видно на скриншоте, контейнер теперь имеет доступ к USB-устройству.

- Важно, чтобы у ttyACM0 были те же права доступа, что и на скриншоте, поэтому **crw-rw-rw- 1 nobody nogroup**

  > **_Если вы не проверите, установлены ли все значения в конфигурационном файле, как описано, и права доступа по-прежнему не совпадают, перейдите к пункту 5._**

- На скриншоте также видно, что номер устройства CC2531 изменился с 3 на 4. Это произошло из-за того, что флешка была отключена и снова подключена. Однако, поскольку в файле конфигурации указан уникальный идентификатор, а не номер шины/устройства, сквозная передача USB продолжает работать.

Если Zigbee-адаптер подключен к контейнеру, как описано в начале, настройки Zigbee-адаптера в ioBroker будут отображаться в следующем разделе:
_имя COM-порта_

```
/dev/ttyACM0
```

ввести данные, чтобы устройство было адресовано правильно.

![proxmoxlxc14](../../de/install/media/proxmox/proxmoxlxc14.PNG)

</details>

### 4.) Правило UDEV для постоянных прав: Адаптация ttyACM0

<details>

В конце шага 3 была использована команда.

```bash
chmod o+rw /dev/ttyACM*
```

Для ttyACM0 установлены соответствующие права доступа, но эти изменения прав доступа будут сброшены при перезапуске хоста Proxmox; для сохранения изменений на хосте Proxmox требуется правило udev.

С помощью команды lsusb мы снова выведем список подключенных в данный момент USB-устройств:

```bash
lsusb
```

![proxmoxlxc15](../../de/install/media/proxmox/proxmoxlxc15.PNG)

На этот раз мы записываем числовые значения в соответствии с ID, в данном случае, следовательно, **0451:16a8**

- Первое значение: **_0451_** Это означает **idVendor** и второе значение: **_16a8_** для **idProduct**.

Теперь правило udev создается в каталоге /etc/udev/rules.d с помощью vi или nano:

```bash
nano /etc/udev/rules.d/50-myusb.rules
```

и было вставлено следующее содержимое:

```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0451", ATTRS{idProduct}=="16a8", GROUP="users", MODE="0666"
```

![proxmoxlxc16](../../de/install/media/proxmox/proxmoxlxc16.PNG)

Наконец, выполните следующую команду, чтобы активировать правило udev:

```bash
udevadm control --reload
```

</details>

### 5.) Устранение неполадок

<details>

**Ошибка:** Права доступа ttyACM0 в lxc некорректны или теряются через короткое время (ConBee II).

```bash
ls -l /dev/ttyACM0
 c--------- 0 nobody nogroup 166, 0 Feb  7 14:29 ttyACM0
```

</br>

**Решение:** Создайте постоянную привязку для контейнера с помощью команды mknod.

Это делается по пути. **"/var/lib/lxc/CONTAINERID"** папка **устройства** Создан и привязана в этой папке с помощью команды mknod:

```bash
mkdir /var/lib/lxc/201/devices
```

```bash
cd /var/lib/lxc/201/devices
```

```bash
mknod -m 666 ttyACM0 c 166 0
```

- _Команда mknod создает файл с именем ttyACM0 по указанному пути (пока файл существует, устройство привязано к lxc)._

![proxmoxlxc17](../../de/install/media/proxmox/proxmoxlxc17.PNG)

**_Номер основного устройства и ttyACM... при необходимости скорректируйте._**

Далее необходимо внести изменения в запись в конфигурационном файле lxc:

```
lxc.mount.entry: /dev/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

будет заменено на:

```
lxc.mount.entry: /var/lib/lxc/CONTAINERID/devices/ttyACM0 dev/ttyACM0 none bind,optional,create=file
```

</details>

---

## Настройка USB-накопителя/жесткого диска для резервного копирования

Для обеспечения возможности отдельного хранения резервных копий в будущем, существует возможность интеграции USB-устройства в виде флешки или жесткого диска в хост-систему Proxmox.

_Уведомление:_ В более ранних версиях этого руководства файловая система упоминалась довольно часто.
**vFAT (FAT32)** Рекомендуется использовать, так как она без проблем читается как в Linux, так и в Windows. В настоящее время это крайне не рекомендуется! FAT32 имеет техническое ограничение на максимальный размер файла. **4 ГБ на файл**Поскольку современные резервные копии Proxmox (например, `.vma.zst`Если размер файлов целых виртуальных машин или контейнеров часто значительно превышает этот показатель, процесс резервного копирования в файловой системе FAT32 будет прерываться с ошибками типа «Слишком большой файл».

Обычный, подходящий [файловые системы][Filesysteme] Таким образом, являются:

- **EXT4** (Стандарт для чистого Linux, настоятельно рекомендуется для резервного копирования Proxmox)
- **NTFS** или **эксФАТ** (если резервный диск обязательно должен считываться непосредственно в Windows)

Если носитель информации по-прежнему не размечен или вы хотите его переформатировать, это можно сделать на компьютере с Windows или непосредственно на сервере Proxmox.

После подготовки носителя информации его можно смонтировать в систему и впоследствии добавить непосредственно в качестве хранилища (каталога) через графический интерфейс Proxmox.

<span style="color:orange">**ВНИМАНИЕ! — Переформатирование приведет к удалению всех существующих данных на носителе информации.**</span>

Приведенные ниже примеры инструкций относятся к настройке... **EXT4** непосредственно на хосте Proxmox.

**Пожалуйста, обрати внимание:** Следующие команды установлены `root` Предварительное условие. Если на хосте используется отдельный пользователь, команды должны выполняться от имени другого пользователя. `sudo` должны быть выполнены.

### Подготовьте устройство

### 1. Идентификация устройства.

Сначала вы изготавливаете устройство, используя [lsblk][] для определения местоположения устройства. Рекомендуется выполнить команду один раз до и один раз после подключения устройства. Это упростит идентификацию устройства.

```bash
lsblk
```

В итоге это будет выглядеть примерно так (буквы могут различаться в зависимости от количества подключенных устройств):

```
sdd                    8:48   0 119.2G  0 disk
├─sdd1                 8:49   0 119.2G  0 part
└─sdd9                 8:57   0     8M  0 part
sde                    8:64   0 931.5G  0 disk                    <-- Das ist die Disk /dev/sde
└─sde1                 8:65   0 931.5G  0 part                    <-- Das ist die erste Partition /dev/sde1
sr0                   11:0    1  1024M  0 rom
sr1                   11:1    1  1024M  0 rom
```

### 2 - Разделение

С меню, управляемым пользователем. [cfdisk][] Накопитель будет разбит на разделы:

```bash
cfdisk /dev/sde
```

### 3. Создайте файловую систему.

Теперь необходимо отформатировать ранее созданный раздел. Как упоминалось выше, для этого мы будем использовать файловую систему. **EXT4**С помощью команды [мкфс][mkfs] и раздел форматируется в соответствии с необходимыми параметрами:

```bash
mkfs.ext4 /dev/sde1
```

### 4. Установите накопитель.

Для использования готового носителя данных необходимо...
[установленный][gemountet] становиться.

Для этой цели создается подходящая точка монтирования. Чтобы обеспечить автоматическое перемонтирование запоминающего устройства после перезагрузки, необходима соответствующая запись в... [/etc/fstab][] необходимый.

Для этого необходима недвусмысленность. **UUID** Диск можно прочитать.

Создать точку монтирования:

```bash
mkdir /media/ext_usb
```

Установите носитель данных:

```bash
mount /dev/sde1 /media/ext_usb
```

Определить UUID:

```bash
blkid | grep -i sde
```

В результате, например, получаются следующие результаты:

```
/dev/sde1: LABEL="Backup" UUID="136b058d-f0c8-406d-a82b-2adcc00b72bf" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="00011a10-01"
```

Вступление в [/etc/fstab][] Редактировать с помощью nano:

```bash
nano /etc/fstab
```

Теперь эта запись будет добавлена и сохранена:

```
UUID="136b058d-f0c8-406d-a82b-2adcc00b72bf" /media/ext_usb ext4 defaults 0 2
```

_(Примечание: для разделов EXT4 файл fstab обычно находится в конце строки.) `0 2` (Проверка файловой системы завершена.)_

### 5. Добавление хранилища в Proxmox

В разделе «Центр обработки данных > Хранилище» теперь можно добавить каталог. Имя идентификатора можно выбрать произвольно, например: _резервное копирование на USB-накопитель_.

В колонке _каталог_ В этом случае путь указан.
`/media/ext\_usb`.

В _Содержание_ Вам нужно всего лишь выбрать необходимую функцию (например, файл резервной копии VZDump).

[VM]: https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines
[LXC Container]: https://pve.proxmox.com/wiki/Linux_Container
[Filesysteme]: https://wiki.ubuntuusers.de/Dateisystem/
[lsblk]: https://wiki.ubuntuusers.de/lsblk/
[cfdisk]: https://wiki.ubuntuusers.de/fdisk/
[mkfs]: https://wiki.ubuntuusers.de/Formatieren/
[gemountet]: https://wiki.ubuntuusers.de/mount/
[/etc/fstab]: https://wiki.ubuntuusers.de/fstab/
[helper-scripts.com]: https://helper-scripts.com
[Installationsmedien vorbereiten]: https://pve.proxmox.com/wiki/Prepare_Installation_Media#_instructions_for_windows
[ISO-Image]: https://www.debian.org/distrib/