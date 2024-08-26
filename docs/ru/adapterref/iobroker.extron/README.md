---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.extron/README.md
title: ioBroker.extron
hash: gmjZSEUabprBE9/QQWdIuYgax6cnMmNaMF1Jacukr+0=
---
![Логотип](../../../en/adapterref/iobroker.extron/admin/extron.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.extron.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.extron.svg)
![Количество установок (последнее)](http://iobroker.live/badges/extron-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/extron-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.extron/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.extron.png?downloads=true)

# IoBroker.extron
![Тест и выпуск](https://github.com/bannsaenger/iobroker.extron/workflows/Test%20and%20Release/badge.svg)

## Ссылки
Extron®, CrossPoint®, DTP®, NetPA®, XPA®, XTP® являются зарегистрированными товарными знаками RGB Systems, Incorporated\ См. [www.extron.com](https://www.extron.com/article/termsprivacy)

Логотип взят из приложения Extron Control от Extron

Dante® является торговой маркой [Аудинат](https://www.audinate.com/)

## Адаптер extron для ioBroker
Адаптер Extron SIS

Устройства управления от Extron.
Этот адаптер предназначен для управления некоторыми аудио-видео продуктами Extron через **S**imple **I**nstruction **S**et Protocol.
Функциональный объем устройств огромен. Не все функции имеет смысл поддерживать с помощью адаптера и взаимодействия с iobroker.

**Обратите внимание:** после выбора типа устройства в конфигурации адаптера его нельзя будет изменить в будущем!

В установке iobroker может быть несколько экземпляров разных или одинаковых типов этого адаптера. Для будущих выпусков вам необходимо добавить действительную лицензию в конфигурацию адаптера для каждого экземпляра.
Если вы некоммерческая организация или используете его в личных целях, вы можете получить лицензию бесплатно. Пожалуйста, свяжитесь с автором.

### Поддерживаемые устройства
- Коммутатор презентационной матрицы 8x2 (DTP2 CrossPoint 82)
- Потоковый медиаплеер и декодер H.264 (SMD 202)
- Кодер потокового мультимедиа (SME 211)
- Процессор 6x4 ProDSP с AEC и Dante (DMP 64 Plus C AT)
- Процессор 12x8 ProDSP с Dante (DMP 128 Plus AT)
- Процессор 12x8 ProDSP с AEC, VoIP и Dante (DMP 128 Plus C V AT)
- Аудиопроцессор Dante Audio Matrix с AEC (XMP 240 C AT)

## Задача
- Тип устройства проверяется в начале разговора. Иногда это не срабатывает. Необходимо изменить на более надежный механизм.
- Сделайте более детальный выбор используемых входов и выходов, чтобы уменьшить размер базы данных на устройствах DSP.
- добавить больше команд и их реализацию на стороне базы данных
- улучшить механизм повторного подключения к сети

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated to adapter-dev and release script
* (Bannsaenger) updated dependencies
* (Bannsaenger) introducing jsonConfig
* (mschlgl) add more DSP SIS commands
* (mschlgl) enhanced network reconnect functionality, added DANTE remote commands, additional devices

### 0.2.15 (2024-06-12)
* (mschlgl) fixed typo in io-package.json

### 0.2.14 (2024-06-10)
* (mschlgl) changed function createDatabase to use setObj()

### 0.2.13 (2024-06-06)
* (mschlgl) corrected instance.comon.titleLang to be set at startup, updated role definitions, added audiofile transfer functionality for DMPxxx

### 0.2.12
* (mschlgl) added instance.comon.title / .titleLang to be set at startup

### 0.2.11
* (mschlgl) added instance.device.name to be set at startup

### 0.2.10
* (mschlgl) corrected preset list handling on SMD202

### 0.2.9
* (mschlgl) disable subtitle command on startup added for SMD202

### 0.2.8
* (mschlgl) onStreamData command debug msg added

### 0.2.7
* (mschlgl) SMD202 preset list handling updated

### 0.2.6
* (mschlgl) added SMD202 preset list handling on startup
### 0.2.5
* (mschlgl) added SMD202 preset list handling

### 0.2.4
* (mschlgl) corrected typo in object_templates

### 0.2.3
* (mschlgl) fixed DMP128 file handling

### 0.2.2
* (mschlgl) fixed SMD202 loopmode command

### 0.2.1
* (mschlgl) updated log messages, improved group control on DMP128

### 0.2.0
* (Bannsaenger) updated dependencies

### 0.1.16
* (mschlgl) fixed group command issues, added statedelay log message on DMP128

### 0.1.15
* (mschlgl) added statedelay log message on DMP128

### 0.1.14
* (mschlgl) fixed group command issues on DMP128

### 0.1.13
* (mschlgl) fixed source code version issues

### 0.1.12
* (mschlgl) added support for channel preset selection in SMD202

### 0.1.11
* (Bannsaenger) fixed support for groups in DSP DMP128

### 0.1.10
* (mschlgl) added support for groups in DSP DMP128

### 0.1.9
* (Bannsaenger) fixed setting of info.connection in telnet mode

### 0.1.7
* (mschlgl) added plain Telnet communication

### 0.1.6
* (mschlgl) added limiter section for DMP128

### 0.1.5
* (mschlgl) fixes on device communication sme211

### 0.1.4
* (mschlgl) fixes on device communication cp82 and smd202

### 0.1.3
* (mschlgl) fixes on device communication and user flash file management

### 0.1.2
* (mschlgl) extend device/database structure to add user flash memory

### 0.1.1
* (mschlgl) extend device/database structure to add devices CP82, SME211, SMD202

### 0.1.0
* (mschlgl) extend device/database structure to cover all controllable elements

### 0.0.3
* (Bannsaenger) fix dependencies for integration test

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.0.1
* (Bannsaenger) initial release

## License
Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)

Copyright (c) 2021-2024 Bannsaenger, https://github.com/bannsaenger <bannsaenger@gmx.de>

![CC BY-NC License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License
http://creativecommons.org/licenses/by-nc/4.0/

Short content:
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.
You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:

Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
