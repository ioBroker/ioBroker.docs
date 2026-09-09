---
chapters: {"pages":{"en/adapterref/iobroker.smartcontrol/README.md":{"title":{"en":"ioBroker.smartcontrol"},"content":"en/adapterref/iobroker.smartcontrol/README.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md
title: без названия
hash: G3631pt59P+qkYTBWX3b1C+8nN2D20sUwqxoBShMOF8=
---
<!-- Markdown Collapsible Section, see https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">About this adapter</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

В нашей системе домашней автоматизации есть несколько **триггеров** , например...

- Датчик движения в коридоре срабатывает.
- Нажата настенная кнопка выключателя.
- наступает определённое время (например, через 30 минут после захода солнца или с понедельника по пятницу в 7:00).

Кроме того, мы часто хотим, чтобы выполнялись (или не выполнялись) дополнительные условия (например, «Сегодня выходной», «окно в гостиной открыто», яркость превышает 100 люкс и т. д.).

Таким образом, как только что-либо срабатывает и, при необходимости, выполняются или не выполняются условия, целевые состояния (т.е. **целевые устройства** ) должны переключаться. Кроме того, после срабатывания датчика движения должен запускаться таймер, который (как только движение прекратится) отключит целевые устройства через заданное количество секунд.

Система Smart Control берет на себя эту задачу и выполняет все действия в соответствии с протоколом IFTTT.

Цель состоит в том, чтобы заменить множество JavaScript-библиотек и Blockly и предоставить очень удобную для пользователя среду для различных сценариев.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">How to start?</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

Просто пройдите по отдельным страницам (вкладкам) с настройками следующим образом:

| Вкладка                   | Что делать                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. ЦЕЛЕВЫЕ УСТРОЙСТВА     | Здесь вы вводите все целевые устройства, которые необходимо переключить, например, освещение, радио и т. д. В первой таблице можно ввести состояния отдельных устройств и/или использовать так называемые перечисления («enums») во второй таблице. [Ссылка на документацию: Перечисления](https://www.iobroker.net/#en/documentation/admin/enums.md) |
| 2. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ | _Необязательно_ : Здесь вы указываете дополнительные условия, которые должны (или не должны) применяться, например: никого нет, сегодня выходной и т. д.                                                                                                                                                                                              |
| 3. ТРИГГЕРЫ               | Здесь вы вводите триггеры, например, датчики движения, настенные выключатели и т. д., а также любые триггеры, зависящие от времени (например, каждый день в 8:00 утра).                                                                                                                                                                               |
| 4 ЗОНЫ                    | Здесь вы объединяете все элементы, определяя все «зоны» (например, ванная комната на первом этаже, кофейный уголок и т. д.), назначая триггеры и целевые устройства для переключения, а также определяя дополнительные условия выполнения.                                                                                                            |
| ДОПОЛНИТЕЛЬНЫЕ ВАРИАНТЫ   | Здесь вы можете задать дополнительные параметры адаптера.                                                                                                                                                                                                                                                                                             |

### Нажав на выделенный темно-синим цветом заголовок, вы получите дополнительную информацию о настройках, например:

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_show-explanation.gif?raw=true)

### Примечание: выпадающие списки в таблицах.

Выпадающие списки с несколькими выбираемыми значениями необходимо нажимать «сбоку». Это проблема административного адаптера ioBroker, а не Smart Control. [Проблема была выявлена и исправлена](https://github.com/ioBroker/ioBroker.admin/issues/590) в административном адаптере ioBroker и будет устранена в следующем обновлении.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_dropdown-ani.gif?raw=true)

<br> Простое решение: просто нажмите на синюю кнопку слева от нее, и вы получите гораздо более удобное диалоговое окно выделения:

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_open-dialog.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Adapter states</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### smartcontrol.x.info.astroTimes

Здесь вы видите все текущие астрономические данные для ваших географических координат, которые вы установили в настройках администратора ioBroker (значок гаечного ключа в левом верхнем углу).

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-astro.png?raw=true)

### smartcontrol.x.info.log.zoneActivations.json

С<code> smartcontrol.x.info.log.zoneActivations.json</code> Адаптер предоставляет состояние, которое передает информацию в формате JSON после успешного выполнения зоны aa (самая новая запись отображается вверху). В параметрах адаптера, на вкладке «ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ» -> «Журналирование», вы можете установить соответствующее количество записей JSON.

### smartcontrol.x.options

Здесь вы можете включать и выключать отдельные строки для каждой таблицы параметров (состояние «активно»).<br> Кроме того, вы можете изменить время в секундах (состояние 'duration') и пороговое значение яркости (состояние 'briThreshold') для всех датчиков движения.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-options-motion.png?raw=true)

**Обратите внимание:** изменение этих состояний приводит к перезапуску экземпляра адаптера, чтобы изменения вступили в силу.

### smartcontrol.x.targetDevices

Для каждой строки таблицы в разделе "1. Целевые устройства" адаптер добавляет сюда связанные состояния. Если вы изменяете эти состояния, исходное целевое состояние изменяется соответствующим образом, и наоборот.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-target-devices.png?raw=true)

### smartcontrol.x.Test

Здесь представлены состояния, предназначенные исключительно для тестирования адаптера. Эти состояния не предоставляют никаких функций или возможностей и используются только для проверки адаптера. После первой установки экземпляра этого адаптера его параметры предварительно задаются некоторыми из этих состояний. Например, начните тестирование, активировав состояние триггера, например, установите для параметра 'smartcontrol.0.Test.trigger.Bathroom\_motion' значение 'true'. Затем проверьте, сработал ли какой-либо триггер (на основе настроек в разделе '4. ZONES' и т. д.).<br> Журнал ioBroker (ioBroker Admin > Log) предоставляет подробную информацию. Для отладки установите уровень ведения журнала для экземпляра адаптера на 'debug', чтобы получить гораздо больше информации в журнале.

![изображение](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-test.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Questions / problems / suggestions for improvement</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### Вопросы об использовании и т. д.

Лучший способ — задать вопрос на форуме ioBroker, в идеале укажите @Mic, чтобы я, как разработчик, получил уведомление. Текущая тема на форуме, посвященная этому адаптеру, находится здесь: [ioBroker-Forum: Smart Control](https://forum.iobroker.net/topic/36728/) . Пишите на английском или немецком языке.

### Ошибка / Баг

Сначала проверьте лог ioBroker на наличие всех подсказок и следуйте им. Если вы не уверены, правильно ли вы выполнили все настройки адаптера, см. выше -> _Вопросы об использовании и т. д_ .<br> Если ошибка действительно вызвана этим адаптером:

1. Перейдите на [страницу GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) и создайте новую задачу.
2. **Подробно** опишите проблему и пошагово объясните, что вы делали до или во время возникновения ошибки. Также установите уровень логирования адаптера на "debug", воспроизведите ошибку и укажите вывод лога в тегах кода в описании проблемы. ioBroker обрезает строки лога, поэтому, пожалуйста, перейдите непосредственно к файлу лога (нажав на "Скачать лог").
3. Добавьте скриншоты, если это может быть полезно мне как разработчику.
4. Добавьте экспорт параметров адаптера, если это может быть полезно для устранения неполадок, нажав на синюю кнопку «стрелка вниз» в правом верхнем углу параметров адаптера SmartControl.

### Запросы на улучшение/добавление новых функций

Создайте новую задачу на [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) , на английском или немецком языке.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->