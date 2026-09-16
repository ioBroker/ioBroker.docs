---
chapters: {"pages":{"en/adapterref/iobroker.omron-fins/README.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/README.md"},"en/adapterref/iobroker.omron-fins/READMEde.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/READMEde.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.omron-fins/READMEde.md
title: ioBroker.omron-fins
hash: mftWZbDidsrl4MzlO9CzuV3UNv0QHQ7mQA7EDjrbKkQ=
---
![Логотип](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

# ioBroker.omron-fins

Адаптер Omron-SPS поддерживает CP, CV, CS, CJ, NJ и совместимый NX-Steuerungen или FINS-протокол для UDP или TCP с ioBroker.

## Конфигурация

В отзывчивой конфигурации адаптера указаны IP-адрес, FINS-порт (обычный`9600` ), Protokoll und Abfrageintervall eingetragen. Ziel- und Quellknoten könnennormalerweise auf`0` для автоматической работы. Bei grouuteten FINS-Netzen lassen sich DA1 und SA1 ausdrücklich vorgeben.

Переменные данные указаны с указанным именем, адресом FINS и датой, указанной вручную. Бейспиеле-Синд`CIO0.00` (или исторический)`CB0:00` ),`W31.00` ,`H0.01` ,`A0.00` ,`D100` , Timer und Zähler.

Используйте переменную, связанную с ioBroker-Datenpunkt angelegt. Прежде всего, лучше всего выбрать SPS и FINS-Befehl, а также шляпу с капюшоном.

## CX-Programmer-Symboltabelle importieren

Таблицы символов в CX-Programmer в формате CSV или в виде табуляторов экспортируют текст и вводят его в нужные конфигурации. Адаптер автоматически используется на немецком и английском языках для имени, адреса и даты. Комма, точка с запятой и табулятор не используются. Manuelle Einträge überschreiben importierte Symbole gleichen Namens.

## Fehlerbehebung

- `info.connection` wird erst nach einer erfolgreichen SPS-Antwort gesetzt.
- `info.lastError` enthält den letzten Kommunikations- или Konfigurationsfehler.
- UDP-/TCP-порт 9600 имеет доступ к FINS-/ETN-Einstellungen для SPS.
- Если автоматический узел не работает, DA1 и SA1 могут быть настроены.

## Лицензия

Авторские права (c) 2021-2026 TheBam <elektrobam@gmx.de>

Лицензия MIT. См. [ЛИЦЕНЗИЮ](https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/LICENSE) .

## Changelog

### 0.1.0

- Kompatibilität mit Node.js 22/24, js-controller 6 und aktuellem adapter-core
- Alte Administrationsseite durch responsive JSON Config ersetzt
- UDP/TCP-, Timeout- und FINS-Knoteneinstellungen ergänzt
- Automatischen Import von CX-Programmer-CSV-/TSV-Symboltabellen ergänzt
- Überlappende Abfragen verhindert und Verbindungs-/Fehlerbehandlung verbessert
- Tests, Linting, Release- und Dependabot-Workflows aktualisiert