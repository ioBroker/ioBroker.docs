---
chapters: {"pages":{"en/adapterref/iobroker.smartcontrol/README.md":{"title":{"en":"ioBroker.smartcontrol"},"content":"en/adapterref/iobroker.smartcontrol/README.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md
title: без названия
hash: a8lLY7Y3bxUZbz6KgDZ1PfwzjzNyAjfLpFh0wae6h9M=
---
<!-- Markdown Collapsible Section, see https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Über diesen Adapter</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<br>In unserer Heim-Automation haben wir ja разнообразный **Auslöser** , zB

- Bewegungsmelder im Flur löst aus,
- ein Wandschalter wird gedrückt,
- eine bestimmte Zeit tritt ein (30 минут до понедельника или пятницы в 7:00)

Gleichzeitig möchten wir oftmals, dass dabei zusätzliche Bedingungen (nicht) zutreffen (zB «Heute ist Feiertag», «Wohnzimmer-Fenster ist Offen», Helligkeit ist größer 100 Lux и т. д.).

Собальд также был auslöst, и необязательно Bedingungen zutreffen oder nicht zutreffen, sollen Ziel-Datenpunkte (dh **Zielgeräte** ) geschaltet werden. Если вы хотите, чтобы таймер был включен, вы должны (собственно, больше всего времени) на время, когда вы хотите, чтобы время ожидания исчезло.

Функция Smart Control обеспечивает возможность использования всех драгоценных камней IFTTT с помощью.

Это значит, что вы можете использовать JavaScript и блокировать блокировку, а также получить дополнительную информацию для разнообразных сценариев использования.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Wie am besten starten?</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<br> Вы должны получить дополнительные опции-Seiten (obige Reiter), если вы хотите:

| Рейтер                     | Что делать                                                                                                                                                                                                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. ZIELGERÄTE              | Hier trägst du all deine zu schaltenden Ziel-Geräte ein, также Lichter, Radio, usw. Вы можете сделать это в предыдущей таблице, а также в другой таблице, а также в «Aufzählungen» (перечисления). [Ссылка на документацию: Aufzählungen](https://www.iobroker.net/#de/documentation/admin/enums.md) |
| 2. ZUSÄTZLICHE BEDINGUNGEN | _Дополнительно_ : Hier trägst du zusätzliche Bedingungen ein, die (nicht) zutreffen sollen, zB: keiner anwesend, Feiertag heute, usw.                                                                                                                                                                |
| 3. AUSLÖSER                | Hier trägst du Auslöser ein, а также zB Bewegungsmelder, Wandschalter и т. д., sowie ggf. zeitabhängige Auslöser (zB jeden Tag um 8:00 Uhr).                                                                                                                                                         |
| 4. Зона                    | Hier führst du alles zusammen, в dem du alle "Zonen" (zB Badezimmer 1.OG, Kaffeeecke, usw.) и Auslöser und zu schaltende Zielgeräte zuweist, sowie auch weitere Bedingungen zur Ausführung definierst.                                                                                               |
| ДРУГИЕ ВАРИАНТЫ            | Вы можете использовать дополнительные опции адаптера.                                                                                                                                                                                                                                                |

### Нажмите на ссылку, чтобы получить дополнительную информацию о драгоценностях, например:

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_show-explanation.gif?raw=true)

### Совет: Аусваль-Фельдер (выпадающий список) в Табеллене

Чтобы выбрать раскрывающееся меню (выпадающее меню), нажмите кнопку «На странице». Это проблема адаптеров ioBroker-Admin-Adapters, и ее нет в Smart Control. [Эта проблема указана и адресована](https://github.com/ioBroker/ioBroker.admin/issues/590) адаптеру администратора ioBroker, а также будет отправлена для последующего обновления.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_dropdown-ani.gif?raw=true)

<br> Выполните следующие действия: Нажмите на кнопку, чтобы связать ее с синим цветом, и вы можете получить доступ к следующему диалоговому окну:

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_open-dialog.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Adapter-Datenpunkte</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### smartcontrol.x.info.astroTimes

Если вы нашли все актуальные геокоординаты, вы можете их найти в ioBroker-Admin-Optionen (Schraubschlüssel obenlinks) eingestellt hast.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-astro.png?raw=true)

### smartcontrol.x.info.log.zoneActivations.json

Мит`smartcontrol.x.info.log.zoneActivations.json` Чтобы узнать об адаптере, выберите Datenpunkt, чтобы узнать, где находится зона, где вы можете получить информацию, как JSON для проверки (dabei erscheint der neueste Eintrag Jeweils Oben). В разделе «Параметры адаптера» в разделе «ВЫХОДНЫЕ ОПЦИИ» вы можете выполнить «Ведение журнала» с помощью параметра JSON-Einträge einstellen.

### smartcontrol.x.options

Hier kannst du für jede Optionen-Tabelle einzelne Zeilen and- und abschalten (Datenpunkt`active` ).<br> Zudem kannst du für alle Bewegungsmelder die Zeit in Sekunden (Datenpunkt`duration` ) и умереть Grenze für die Helligkeit (Datenpunkt`briThreshold` ) ändern.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-options-motion.png?raw=true)

**Немного начните:** Когда вы начнете работу с мгновенным адаптером, вы должны выполнить следующие действия.

### smartcontrol.x.targetDevices

Для того, чтобы увидеть таблицу «1. ZIELGERÄTE», перейдите к адаптеру, указанному в инструкции. Когда вы получаете эти даты, вы можете воспользоваться услугами Ziel-Datenpunkt entsprechend geändert и umgekehrt.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-target-devices.png?raw=true)

### smartcontrol.x.Test

Ниже приведены инструкции по тестированию адаптеров для проверки. Diese Datenpunkte stellen keinerlei Funktionen или Features zur Verfügung und dienen eben nur zum Testen dieses Adaptors. Nach der ersten Installation einer Instanz dieses Переходники и дополнительные адаптеры с собственными датами. Beginne zB mit dem Testen, indem du zB einen Auslöser-Datenpunkt aktivierst, также zB`smartcontrol.0.Test.trigger.Bathroom_motion` ауф`true` сетц. Dann prüfst du, ob etwas ausgelöst wird (basierend auf den Einstellungen в «4. ZONEN» и т. д.).<br> В журнале ioBroker-Log (Администратор ioBroker > Журнал) содержится подробная информация. Для настройки отладки на уровне журнала адаптера в режиме «отладка» необходимо просмотреть дополнительную информацию в журнале.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-test.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Fragen / Probleme / Verbesserungsvorschläge</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### Fragen zur Bedienung, etc.

Frage am besten im ioBroker-Forum, Idealerweise Referenzierst du @Mic so dass ich als Entwickler eine Meldung bekomme. Форум Aktueller - Тема для адаптера находится здесь: [ioBroker - Форум: Smart Control](https://forum.iobroker.net/topic/36728/) .

### Ошибка / Баг

Prüfe zunächst das ioBroker Log auf sämtliche Hinweise und gehe diesen entsprechend nach. Falls du nicht sicher bist, ob du alles richtig gemacht hast in den Adaptor-Einstellungen, siehe oben -> _Fragen zur Bedienung и т. д._ .<br> Falls du wirklich einen durch diesen Адаптер verursachten Fehler имеет:

1. Gehe zu [GitHub: Проблемы Smart Control](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) под новой проблемой.
2. Beschreibe **ausführlich** die Issuetik und Schritt für Schritt, было du getan hast als/bevor der Fehler auftrat. Установите уровень журнала адаптеров в разделе «Отладка», воспроизведите данные и укажите уровень журнала в кодовых тегах в выпуске. ioBroker schneidet Log-Zeilen ab, daher gehst du dazu bitte непосредственно в файле журнала (нажмите кнопку «Загрузить журнал»).
3. Сделайте скриншоты, чтобы они могли помочь мне с вашими интересами
4. Чтобы получить доступ к адаптеру-опции-экспорту, вы можете нажать на синюю кнопку «Pfeil nach unten».

### Erweiterungungswunsch (новые функции)

Mach am besten ein neues Github-Issue auf unter [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) , на немецком или английском языке. Wenn Deutsch deine Muttersprache ist, dann schreibe auch bitte на Deutsch und nicht English на Github. Das macht unsere Kommunikation deutlich einfacher und du brauchst dir keinen abbrechen :-) Nicht deutsch sprechende Пользователь können das dennoch dank Google Translate o.ä. супер mitlesen und sich einbringen.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->