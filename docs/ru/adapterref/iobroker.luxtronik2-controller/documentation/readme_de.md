---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"Luxtronik 2 Controller\\n\\nAdapter to control Luxtronik 2.x heat pumps."},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md
title: без названия
hash: zmswxOA/FXFtGmPfEoCGNqoWxHYmb7vCQu/XaYn4c/A=
---
## Монтаж и настройка

1. Установите адаптер в репозиторий ioBroker.

2. Ошибка в мгновенной конфигурации IP-адреса теплового насоса.

3. Стандарт-Порт-Лотет 8889.

4. Wähle im Reiter "Datenpunkte" die gewünschten Verzeichnisse (z. B. Heizung, Warmwasser, Tabellen) aus.

5. Определите в Reiter «Verhalten & Vorgabewerte» стандартную версию, а также адаптер, который можно использовать вручную.

## Aktionen & Automatisierungen (папка: Aktionen)

Адаптер должен быть установлен в ioBroker-Objectbaum Datenpunkte zur Verfügung:

1. Интеллектуальная оптимизация такта (Regelung\_Aktiv) позволяет активировать сокращение адаптера при запуске во время комбинации циклов:

- **Комбинированный совет** : Steht die Warmwasserbereitung zeitnah and es besteht Heizbedarf, wird der Heizzyklus vorgezogen.

- **Функция «Heizen nach Warmwasser»** : В этом разделе вы найдете функцию «Heizen nach Warmwasser», которая будет временно активна. Die Heizung läuft weiter, bis die gewünschte Rücklaufttemperatur zuzüglich Hysterese erreicht ist.

- Nach Abschluss des kombinierten Taktes (Wechsel in den Leerlauf) setzt der Adaptor alle veränderten Параметр для определенного параметра Vorgabewerte zurück.

2. **Aktion** Zwangsheizen (Zwangsheizen) Prüft, obsich die Anlage im Leerlauf befindet. Если выбрана актуальная температура, выбранная при температуре Зольверта плюс гистерезис, то температура нагревания будет зависеть от температуры 35 °C, при которой температура будет повышена.

3. **Aktion** Zwangswarmwasser (Zwangswarmwasser) Prüft, ob die Warmwasser-Ist-Temperatur Minestens 1 K unter dem Sollwert Liegt. Ist dies der Fall, wird die Warmwasser-Hysterese auf 1 K reduziert, um die Aufheizung zu starten.

4. Запуск **действия** по циркуляции (Activate\_Zip) Запустите процедуру циркуляции для изменения конфигурации (zip\_aktiv). Если температура теплой воды превышает температуру, необходимо включить адаптер для внутренней программы обогрева, а также циркуляцию, которую лучше всего использовать в программе Zeitprogramme zu uberschreiben. Найдите, где LWP не работает в Leerlauf, и активируйте таблицу для активации циркуляции и найдите Ablauf wieder auf die vorherigen Werte zurückgesetzt.

## Erweiterte Integrationen & Überwachung

1. Bewegungsmelder-Kopplung (Smart-ZIP) Адаптер должен быть Möglichkeit, ioBroker-Bewegungssensoren (z. B. im Badezimmer) непосредственно перед конфигурацией, которая может быть отключена, а также циркуляционным насосом, необходимым для управления.

- **Функции** : Зарегистрируйте адаптер, чтобы он был подключен к датчику и подключен к нему, и циркуляционный насос получит физическое повреждение.

- **Логика замедления** : Если вы постоянно работаете так же, как и насос, для продолжения работы, вы можете умереть в конфигурации с задержкой настройки (стандарт: 10 минут). Если вы хотите, чтобы макрос Activate\_Zip автоматически открывался, нажмите кнопку Activate\_Zip.

2. Fehler-Benachrichtigungen (Управление сигнализацией) Адаптер постоянно работает с Fehlerspeicher der Luxtronik-Steuerung и Vergleicht die Zeitstempel der Hinterlegten Codes. Следите за тем, чтобы в системе не возникало аварийных ситуаций при срабатывании:

- **ioBroker Benachrichtigungszentrale** : Der Fehler изначально используется для ioBroker-System übergeben и в категории lwpError (System-Glocke) с подсказкой.

- **Интеграция Telegram** : Sofern configuriert, sendet der Adapter eine formatierte Nachricht (вкл. Fehlercode, Klartextbeschreibung und Zeitstempel) непосредственно в действующий Telegram-Instanz.

- **Тестовая функция** : Чтобы включить тестовую сигнализацию, нажмите кнопку в адаптере и установите ее. Это исторический материал, имитирующий передвижной вариант, который находится в конфигурационном канале.

## Эйджин Верте анлеген (Таможенные штаты)

Zusätzliche Datenpunkte der Luxtronik-Steuerung können manuell eingebunden werden:

1. Отключите адаптер-Einstellungen und wechsle zu **Benutzerdefinierte Datenpunkte** .

2. Füge einen neuen Eintrag hinzu.

3. Trage die entsprechende **Luxtronik ID (Index)** ein.

4. Wähle die Datenquelle:
   - Messwert (rawValues): Lesezugriff für Sensordaten (индекс 3004).

   - Параметр (rawParams): Lese- und Schreibzugriff für Einstellungen (индекс 3003).

5. Определите имя и значение даты (Zahl, Text, Boolean, oder Datum/Uhrzeit).

6. Nach dem Speichern wird der Datenpunkt im Verzeichnis Benutzer angelegt.