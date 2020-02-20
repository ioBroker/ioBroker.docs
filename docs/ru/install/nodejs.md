---
title: установка
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/nodejs.md
hash: aiE+/kF28wavV+TG9cs6S1B4VXymKjBAiO1O8la65Z4=
---
# Установка Node.js и npm
?> ***Это подстановочный знак*** . <br><br> Помогите с ioBroker и расширьте эту статью. Пожалуйста, обратите внимание на [Руководство по стилю ioBroker](community/styleguidedoc), чтобы изменения могли быть приняты легче.

ioBroker и адаптеры в основном написаны на языке программирования JavaScript. Поскольку компьютер не может выполнять Javascript напрямую, ему требуется среда выполнения Node.js.

Следующая информация является неофициальным переводом инструкций по установке [Node.js Foundation](https://nodejs.org/en/download/package-manager/).

## Оглавление
* [Arch Linux] (# arch)
* [Дистрибутивы Linux на основе Debian и Ubuntu] (#)
* [Enterprise Linux и Fedora] (# debian)
* [FreeBSD] (#)
* [Gentoo] (#)
* [NetBSD] (#)
* [nvm] (#)
* [OpenBSD] (#)
* [openSUSE и SLE] (#)
* [macOS] (#)
* [SmartOS и иллюминаты] (#)
* [Void Linux] (#)
* [Solus] (#)
* [Windows] (# windows)

<h2 id="arch"> Arch Linux </h2>

Готовые пакеты Node.js и npm доступны в репозитории сообщества.

```
pacman -S nodejs npm
```

<h2 id="debian"> Дистрибутивы Linux на основе Debian и Ubuntu </h2>

Это включает в себя **Linux Mint, Linux Mint Debian Edition (LMDE), элементарную ОС, bash для Windows** и многое другое.

Node.js предоставляется через Debian NodeSource и бинарный репозиторий Ubuntu (ранее PPA Launchpad Криса Ли).
Справку и скрипты для репозитория можно найти на GitHub в разделе [nodesource / распределения](https://github.com/nodesource/distributions).

** Примечание: ** Если Node.js должен быть установлен на Ubuntu Precise или Debian Wheezy, рекомендуется прочитать статью на [Node.js> = 6.x в старых дистрибутивах](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md).

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Для Node.js 10 используйте следующую команду:

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*** Дополнительно: *** Установка инструментов для сборки

Чтобы скомпилировать и установить собственные расширения с помощью npm, вам также следует установить инструменты сборки.

```
sudo apt-get install -y build-essential
```

** Доступные архитектуры: **

* **i386** (32-разрядная версия)
* **amd64** (64-разрядная версия)
* **armhf** (ARM 32-bit hard-float, ARMv7 и более поздние версии: arm-linux-gnueabihf)

Поддерживаемые версии Ubuntu:

* **Ubuntu 14.04 LTS** (Трасти Тар)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

Поддерживаемые версии Debian:

* **Debian 8** (Джесси, старая стабильная)
* **Debian 9 / стабильный** (растянуть)
* **Тестирование Debian 9** (бастер, который будет выпущен как следующий "стабильный")
* **Debian нестабильный** (sid, который никогда не будет выпущен, он же катится)

Пакет Node.js также доступен в официальном репозитории для Debian Sid (нестабильный), Jessie (тестирование) и Wheezy (wheezy-backports) как «nodejs». Он просто устанавливает двоичный файл nodejs.

Пакет nodejs-legacy устанавливает символическую ссылку на узел, которая нужна многим модулям для правильной сборки и запуска. Модули Node.js доступны в официальных дистрибутивах репозиториев и не нуждаются в этом.

Поддерживаемые версии Linux Mint:

* **Linux Mint 17 "Qiana"** (через Ubuntu 14.04 LTS)
* **Linux Mint 17.1 «Ребекка»** (через Ubuntu 14.04 LTS)
* **Linux Mint 17.2 "Rafaela"** (через Ubuntu 14.04 LTS)
* Linux Mint Debian Edition (LMDE) 2 "Бетси" ** (через Debian 8)

Поддерживаемые элементарные версии ОС:

* **элементарная ОС Luna** (через Ubuntu 12.04 LTS)
* **элементарная ОС Freya** (через Ubuntu 14.04 LTS)
* **элементарная ОС Loki** (через Ubuntu 16.04 LTS)
* **элементарная ОС Juno** (через Ubuntu 18.04 LTS)

Поддерживаемые версии Trisquel:

* **Trisquel 7 "Belenos"** (через Ubuntu 14.04 LTS)

Поддерживаемые версии BOSS:

* **BOSS 5.0 "Anokha"** (через Debian 7)

Корпоративный Linux и Fedora

Включая Red Hat® Enterprise Linux® / RHEL, CentOS и Fedora.

Node.js доступен в репозитории двоичных дистрибутивов NodeSource Enterprise Linux и Fedora. Поддержка этого репозитория, а также его сценариев, может быть найдена на GitHub в nodeource / Distribution.

Обратите внимание, что пакеты Node.js для EL 5 (RHEL5 и CentOS 5) зависят от наличия репозитория EPEL. Сценарий установки хочет проверить и указать, не установлен ли он.

На RHEL, CentOS или Fedora, для Node.js v8 LTS:

```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

Альтернативно для Node.js 10:

```
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```

Затем установите:

```
sudo yum -y install nodejs
```

Необязательно: установите инструменты сборки

Чтобы скомпилировать и установить собственные дополнения из npm, вам может понадобиться установить инструменты сборки:

```
sudo yum install gcc-c++ make
# or: sudo yum groupinstall 'Development Tools'
```

Доступные архитектуры:

* **i386** (32-разрядная версия, недоступна для EL7)
* **x86_64** (64-разрядная версия)

Поддерживаемые версии Red Hat® Enterprise Linux®:

* **RHEL 5** (32-битный и 64-битный)
* **RHEL 6** (32-битная и 64-битная)
* RHEL 7 ** (64-разрядная версия)

Поддерживаемые версии CentOS:

* **CentOS 5** (32-битная и 64-битная)
* **CentOS 6** (32-битная и 64-битная)
* **CentOS 7** (64-разрядная версия)

Поддерживаемые версии CloudLinux:

* **CloudLinux 6** (32-битная и 64-битная)

Поддерживаемые версии Fedora:

* **Fedora 21** (Двадцать один) (32-разрядный и 64-разрядный)
* **Fedora 20** (Гейзенбаг) (32-битная и 64-битная)
* **Fedora 19** (кот Шредингера) (32-битный и 64-битный)

Другие известные дистрибутивы, которые поддерживаются:

* **Oracle Linux** (очень близко отражает RHEL)
* **Amazon Linux** (протестировано на 2016.03)

альтернативы

Официальные пакеты Fedora Node.js и npm доступны в Fedora 18 и более поздних версиях. Установить с помощью:

```
sudo dnf install nodejs
```

Спешите за последними обновлениями? Захватите их из обновления-тестирования.

Пользователи Enterprise Linux (RHEL и CentOS) могут использовать пакеты Node.js и npm из репозитория EPEL.

Установите соответствующий RPM-пакет epel-release для вашей версии (находится на домашней странице репозитория EPEL), затем запустите:

```
sudo yum install nodejs npm --enablerepo=epel
```

Спешите за последними обновлениями? Захватите их из Epel-тестирования.

Доступные архитектуры:

* **i686** (32-разрядная версия, недоступна для EL7)
* **x86_64** (64-разрядная версия)
* **armv6hl** (Raspberry Pi, только Pidora)
* **armv7hl** (32-битный ARM hard-float, ARMv7 и выше, только для Fedora)

Поддерживаемые версии Red Hat® Enterprise Linux®:

* **RHEL 6** (i686 / x86_64)
* **RHEL 7** (aarch64 / x86_64)

RHEL 6 больше не поддерживается EPEL, но вы можете использовать Red Hat Software Collections.

Кроме того, версии CentOS и Scientific Linux, соответствующие вышеуказанным версиям RHEL, официально поддерживаются всеми пакетами EPEL, включая nodejs. Amazon Linux официально не поддерживается EPEL из-за существенных несовместимостей, ранее сообщенных в списке рассылки epel-devel.

Поддерживаемые версии Fedora:

* **Fedora Rawhide** (i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le / s390x)
* **Fedora 27** (i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le / s390x)
* **Fedora 26** (i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le)

FreeBSD

Самый последний выпуск Node.js доступен через порт www / node.

Установите бинарный пакет через pkg:

```
pkg install node
```

Или скомпилируйте его самостоятельно, используя порты:

```
cd /usr/ports/www/node && make install
```

Gentoo

Node.js доступен в дереве портежей.

```
emerge nodejs
```

NetBSD

Node.js доступен в дереве pkgsrc:

```
cd /usr/pkgsrc/lang/nodejs && make install
```

Или установите бинарный пакет (если он доступен для вашей платформы) с помощью pkgin:

```
pkgin -y install nodejs
```

NVM

Node Version Manager - это bash-скрипт, используемый для управления несколькими выпущенными версиями Node.js. Он позволяет выполнять такие операции, как установка, удаление, переключение версии и т. Д. Чтобы установить nvm, используйте этот скрипт установки.

В системах Unix / OS X Node.js, созданный из исходного кода, может быть установлен с использованием команды nvm:

```
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

После этого вы можете использовать между версиями и версиями, созданными из исходного кода. Например, если версия Node.js v8.0.0-pre:

```
$ nvm use 8
```

Как только официальный релиз будет готов, вы хотите удалить версию, созданную из исходного кода:

```
$ nvm uninstall 8
```

OpenBSD

Node.js доступен через систему портов.

```
/usr/ports/lang/node
```

Использование pkg_add в OpenBSD:

```
pkg_add node
```

openSUSE и SLE

Node.js доступен в основных репозиториях в следующих пакетах:

* **openSUSE Leap 42.2:** nodejs4
* **openSUSE Leap 42.3:** nodejs4, nodejs6
* **openSUSE перевернутый:** nodejs4, nodejs6, nodejs8
* **SUSE Linux Enterprise Server (SLES) 12:** nodejs4, nodejs6

    («Модуль Web и Scripting» должен быть добавлен перед установкой.)

Например, чтобы установить Node.js 4.x в openSUSE Leap 42.2, запустите следующее от имени пользователя root:

```
zypper install nodejs4
```

Macos

Просто скачайте установщик macOS прямо с веб-сайта nodejs.org.

Если вы хотите скачать пакет с bash:

```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

альтернативы

Использование доморощенного:

Заваривать узел установки

Использование MacPorts:

```
port install nodejs<major version>
```

# Пример
порт установить nodejs7

Использование pkgsrc:

Установите бинарный пакет:

```
pkgin -y install nodejs
```

Или соберите вручную из pkgsrc:

```
cd pkgsrc/lang/nodejs && bmake install
```

SmartOS и иллюминаты

Образы SmartOS поставляются с pkgsrc. В других дистрибутивах Illumos сначала установите pkgsrc, затем вы можете установить бинарный пакет как обычно:

```
pkgin -y install nodejs
```

Или соберите вручную из pkgsrc:

```
cd pkgsrc/lang/nodejs && bmake install
```

Void Linux

Void Linux поставляет стабильный файл node.js в основном хранилище.

```
xbps-install -Sy nodejs
```

в единственном числе

Solus предоставляет node.js в своем основном хранилище.

```
sudo eopkg install nodejs
```

<h2 id="windows"> Windows </h2>

?> Рекомендуется скачать Node.js с компьютера, на котором он будет установлен. Сайт загрузки Node.js автоматически определяет, доступна ли Windows в 32- или 64-разрядной версии.

1. С сайта

[https://nodejs.org/en/download](https://nodejs.org/en/download/) загрузить текущую версию Node.js.

![Скачать Node.js](../../de/install/media/w01downloadnode.png "': Size = 550'") *Скачать Node.js*

1. Запустите загруженный установщик Node.js двойным щелчком мыши.

?> Как правило, программа находится в папке `Downloads` и следует схеме именования `node-<Version>.msi`.

1. Если появляется сообщение о том, что приложение не является подтвержденным приложением из Магазина Microsoft,

   Выберите `Trotzdem installieren`.

1. Установите Node.js с настройками по умолчанию. Не меняйте путь установки.

   Подтвердите любые появляющиеся запросы безопасности.

![Установка Node.js](../../de/install/media/w03nodeinst.gif) *Node.js Установка*