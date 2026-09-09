---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.codesys-nvl/README.md
title: ioBroker.codesys-nvl
hash: 54MRaFUT64/G9p29rijarj9N0rmrGTjQlqw0Suxdz4Y=
---
![Логотип](../../../en/adapterref/iobroker.codesys-nvl/admin/codesys-nvl.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.codesys-nvl.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.codesys-nvl.svg)
![Количество установок](https://iobroker.live/badges/codesys-nvl-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/codesys-nvl-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.codesys-nvl.png?downloads=true)

# ioBroker.codesys-nvl

**Тесты:**![Тестирование и выпуск](https://github.com/Bannsaenger/ioBroker.codesys-nvl/workflows/Test%20and%20Release/badge.svg)

## адаптер codesys-nvl для ioBroker

Отправка и получение списков сетевых переменных (NVL) от ПЛК, управляемого CODESYS®.

## Ссылки

CODESYS® — зарегистрированный товарный знак компании [CODESYS GmbH, входящей в группу компаний CODESYS.](https://www.codesys.com)

Логотип взят с главной страницы CODESYS.

EN 61131 — это европейский стандарт, основанный на международном стандарте IEC 61131-3 comp. [(Википедия)](https://en.wikipedia.org/wiki/IEC_61131-3) .

Вспомогательные данные взяты из [jisotalo/iec-61131-3](https://github.com/jisotalo/iec-61131-3)

Обработка (парсинг и построение) Telegram-сообщений, а также работа со структурой переменных заимствованы у [Hopperpop](https://github.com/Hopperpop) и его проекта [node-red-contrib-nvl.](https://github.com/Hopperpop/node-red-contrib-nvl)

## Цель

Простой адаптер для отправки и приема данных от ПЛК, управляемого CODESYS®, с помощью списков NVL. Эти списки можно редактировать и экспортировать в редакторе CODESYS.

## Документация

### Начиная

Сначала необходимо создать список NVL в редакторе CODESYS. На данный момент поддерживаются только несжатые списки. Если размер списка превышает 256 байт, данные передаются более чем в одном телеграмме. Эта функция пока не поддерживается.

### Создание файла GVL

Сначала экспортируйте список NVL в редакторе и сохраните его как файл GVL. Например, **myfirstlist.gvl.** Он будет выглядеть так:

```
<GVL>
  <Declarations><![CDATA[{attribute 'qualified_only'}
VAR_GLOBAL
	Watchdog: BOOL;
	Input1: BOOL;
	Input2: BOOL;
END_VAR]]></Declarations>
  <NetvarSettings Protocol="UDP">
    <ListIdentifier>1</ListIdentifier>
    <Pack>True</Pack>
    <Checksum>False</Checksum>
    <Acknowledge>False</Acknowledge>
    <CyclicTransmission>True</CyclicTransmission>
    <TransmissionOnChange>True</TransmissionOnChange>
    <TransmissionOnEvent>False</TransmissionOnEvent>
    <Interval>T#10s</Interval>
    <MinGap>T#20ms</MinGap>
    <EventVariable>
    </EventVariable>
  </NetvarSettings>
</GVL>
```

### Поместите файл в ioBroker и настройте его.

Далее файл необходимо перетащить на вкладку **«Файлы»** в раздел **codesys-nvl.0** или в соответствии с номером вашего экземпляра. После перезапуска адаптера файл появится в административном интерфейсе на вкладке **«Списки сетевых переменных»** .

Здесь вы можете настроить тип списка: **«Отправить»** , **«Получить»** или **«Отключить»** .

### Использование

При запуске адаптер создает базу данных для каждого списка. Путь к списку, например, следующий:

```
codesys-nvl.0.nvl.1
```

В разделе **«Конфигурация»** вы найдете импортированный контент GVL. **Информационный** канал предоставляет сведения о состоянии соединения и актуальности данных.

В **переменной \`var\`** вы найдете имена переменных, например, \`channel\`, а в названии \`channel\` **— тип** и **значение** .

В списке **отправки** можно задать значения в базе данных для передачи данных на ПЛК. На другой стороне экрана отображаются полученные значения из списка **приема** .

## Список дел

- Исправлена поддержка длинных NVL.
- Добавить поддержку сжатых NVL-файлов

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.6 (2026-08-31)
- (Bannsaenger) fixed last errors from code review

### 0.0.5 (2026-08-25)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- (Bannsaenger) fixed errors from code review for check in to latest repository

### 0.0.4 (2026-07-08)
- (Bannsaenger) fixed errors from code review for check in to latest repository

### 0.0.3 (2026-06-16)
- (Bannsaenger) fixed errors for check in to repository

### 0.0.2 (2026-05-15)
- (Bannsaenger) add initial documentation

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 Bannsaenger <bannsaenger@gmx.de>

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