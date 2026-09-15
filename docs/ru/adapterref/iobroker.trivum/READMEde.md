---
chapters: {"pages":{"en/adapterref/iobroker.trivum/README.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/README.md"},"en/adapterref/iobroker.trivum/READMEde.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/READMEde.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trivum/READMEde.md
title: ioBroker.trivum
hash: TTOP35VBU3OqgONlJCA7Al0XXFva+AVoDr+9znJCpVE=
---
![Логотип](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

# ioBroker.trivum

Адаптер находится в трехкомнатной аудиосистеме Multiroom с использованием локального XML-API с помощью ioBroker.

## Конфигурация

IPv4-адрес тривиального музыкального центра внутри. Zonen und Steuerungen работают автоматически. Abfrageintervall и HTTP-Timeout в панели конфигурации; Bestehende Installationen Behalten die Historischen Konfigurationsschlüssel`adresse` унд`option3` .

`Anzahl der Durchsage-Vorlagen` erzeugt globale Durchsage-Schaltflächen ab ID 0.

## Точки данных

Globale Steuerungen:

- `Global.ALLOFF` : alle Zonen ausschalten
- `Global.Aktive_zonen` : в три раза активная зона
- `Global.PagingN` : Durchsage-Vorlage N starten

Je erkannter Zone werden angelegt:

- `Muten` : Stummschaltung ein-/ausschalten
- `DEFAULT_STREAMING` : Standardstream starten
- `ZONECMD_DEFAULT_TUNER` : Standardtuner starten
- `VOLUME` : Lautstärke от 0 до 100 процентов
- `ZONECMD_POWER_OFF` : Zone ausschalten
- `Status` : aktueller Zonenstatus

Schaltflächen werden nach erfolgreichem Aufruf autotisch zurückgesetzt.`info.connection` wird erst nach einer erfolgreichen trivum-Antwort gesetzt;`info.lastError` enthält den letzten Kommunikationsfehler.

## Лицензия

Авторские права (c) 2021-2026 TheBam <elektrobam@gmx.de>

Лицензия MIT. См. [ЛИЦЕНЗИЮ](https://github.com/TheBam1990/ioBroker.trivum/blob/master/LICENSE) .

## Changelog

### 0.1.0

- Auf aktuelles ioBroker-Adaptertemplate und responsive JSON Config migriert
- Kompatibilität mit Node.js 22/24 und js-controller 6 ergänzt
- adapter-core, Abhängigkeiten, Linting, Tests und Release-Workflows aktualisiert
- Zonenerkennung, Abfrage, Verbindungsstatus und Fehlerbehandlung überarbeitet
- Zonenbefehle auf die erkannten Zonen-IDs korrigiert
- Lautstärke als numerischen Prozentwert umgesetzt und überlappende Abfragen verhindert