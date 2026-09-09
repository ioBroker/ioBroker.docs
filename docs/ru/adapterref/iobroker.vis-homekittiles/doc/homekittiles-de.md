---
chapters: {"pages":{"en/adapterref/iobroker.vis-homekittiles/README.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/README.md"},"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-de.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-de.md"},"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-en.md":{"title":{"en":"ioBroker.vis-homekittiles"},"content":"en/adapterref/iobroker.vis-homekittiles/doc/homekittiles-en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-homekittiles/doc/homekittiles-de.md
title: ioBroker.vis-homekittiles
hash: eQkNgm098cRUh+6eeTkiz72osVs/rbjF8vMqvMruuqI=
---
# ioBroker.vis-homekittiles

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-homekittiles.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-homekittiles.svg)
![Количество установок](https://iobroker.live/badges/vis-homekittiles-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-homekittiles-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-homekittiles.png?downloads=true)
![Тестирование и выпуск](https://github.com/Standarduser/ioBroker.vis-homekittiles/workflows/Test%20and%20Release/badge.svg)

<img src="img/title-pic_hkt-on-ipad.png" />

## 🇩🇪 HomeKit-Tiles for ioBroker-VIS

Homekit-Tiles — это набор виджетов, который является ангельским дизайном Apple HomeKit. Если вы хотите использовать виджеты, эти элементы стиля привлекают все больше внимания к форматированию CSS. Используйте VIS-Editor, чтобы найти нужные сведения для позиционирования и/или увеличения значков, описания, usw. Anpassungen des Designs помогает улучшить CSS-коды. Hierzu может использовать CSS-код из Datei`/widgets/homekittiles/css/style.css` также Vorlage genutzt werden. Код отображается в VIS-редакторе на вкладке CSS и может быть изменен. Добавление собственного CSS-класса в VIS-редактор в разделе «Общие сведения» виджетов может оказаться еще более полезным.

Виджеты доступны для версии VIS 1.x.

**Примечание:** Aus lizenzrechtlichen Gründen sind im Lieferumfang dieses Adaptors keine Icons enthalten. Sehr gote Quellen für Icons sind:

- <https://www.flaticon.com>
- <https://icons8.com>

## Widget-Typen

### hkt-Уведомление

<img src="/doc/img/hkt-Notification.png" width="120" />

Уведомление может быть отправлено и отправлено в безопасное место (ähnlich den roten Bubbles von Handy-Apps). Это идеальное решение для использования в комбинации с навигационной кнопкой и кнопкой, которая находится на расстоянии от Entresprechenden View Störungen/Fehler/Wichtige Informationen gibt. Unterstützt werden 5 Datenpunkte und damit einhergehend 5 verschiedene Farben für die Benachrichtigungen. Установите флажок, чтобы установить флажок, чтобы выбрать Benachrichtigungen auch bei dem Wert.`0` angezeigt werden sollen.

### hkt-Datepicker

<img src="/doc/img/hkt-Datepicker.png" height="120" />

С помощью Datepicker можно использовать данные в календаре, а виджет будет добавлен в jqui-Datepicker. Этот комплекс является и не требует копирования/нагрузки, а другой VIS-проект на демсельбенской системе не хранится, поэтому виджет должен быть интегрирован в форматирование для Datepicker-Fenster. Если вы хотите использовать CSS-код в VIS-Projekt eingefügt werden:

```CSS
.ui-datepicker {
    padding: 0;
    font-size: 15px;
    border-radius: 5px;
    font-family: -apple-system;
    border: unset;
    background: unset;
    color: unset;
    background-color: #888;
}
.ui-datepicker .ui-datepicker-header {
    padding: .2em 0;
    border-radius: 5px 5px 0 0;
    color: unset;
    border: unset;
    background: unset;
    background-color: var(--hkt-color-tile-on-background);
    font-weight: bold;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev-hover,
.ui-datepicker .ui-datepicker-header .ui-datepicker-next-hover {
    border: unset;
    background: unset;
    font-weight: unset;
    color: unset;
    top: 2px;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev .ui-icon-circle-triangle-w,
.ui-datepicker .ui-datepicker-header .ui-datepicker-next .ui-icon-circle-triangle-e {
    background-image: unset;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-prev .ui-icon-circle-triangle-w:before {
    content: "";
    position: relative;
    width: 20px;
    height: 20px;
    display: block;
    color: #000;
    border-width: 3px 0 0 3px;
    border-color: #000;
    border-style: solid;
    transform: rotate(-45deg);
    top: -3px;
    left: 5px;
}
.ui-datepicker .ui-datepicker-header .ui-datepicker-next .ui-icon-circle-triangle-e:before {
    content: "";
    position: relative;
    width: 20px;
    height: 20px;
    display: block;
    color: #000;
    border-width: 3px 3px 0 0;
    border-color: #000;
    border-style: solid;
    transform: rotate(45deg);
    top: -3px;
    left: -12px;
}
.ui-datepicker .ui-state-default {
    border: unset;
    background: unset;
    font-weight: unset;
    color: unset;
}
.ui-datepicker .ui-datepicker-current-day {
    color: var(--hkt-color-tile-on-foreground);
    background-color: var(--hkt-color-tile-on-background);
    font-weight: bold;
}
.ui-datepicker .ui-datepicker-today {
    color: orange;
}
```

### hkt-Радиокнопки

<img src="/doc/img/hkt-Radiobuttons.png" height="100" />

Радиокнопки dienen vornehmlich zur Umschaltung vordefinierter Werte für einen State. Ausrichtung der Schaltflächen (nebeneinander или untereinander) не выполняется автоматически, поэтому необходимо, чтобы флажок установлен. Die Anzahl der Schaltflächen kann nach Bedarf eingestellt und die Werte, драгоценности в государстве geschrieben werden sollen, können frei gewählt werden. Zusätzlich ist es möglich, jede Schaltfläche mit einer Beschriftung und/oder einem Icon auszustatten. Какие функции:

- **Лучшее сообщение:** если значок не установлен, если флаг штата не используется (= unbestätigte Änderung). Если этот флажок установлен, логика будет отключена, значок будет изменен, если установлен флаг подтверждения (=лучший ответ). С помощью флажка можно установить значок, который отображается (CSS-класс)`spin` wird hinzugefügt). Значок Ack-Icon будет отображаться в коде Quellcode и в режиме Schaltfläche, а затем вводить соответствующий код Quellcode, чтобы активировать его.

### hkt-Switch-Bool

<img src="/doc/img/hkt-Switch-Bool.png" height="120" />

Этот Switch-Bool-Widget используется для ввода/вывода сообщений для штатов из типа`boolean` и Zeigt Ein Icon. Es besitzt zwei Beschriftungsgruppen und eine Bediensperre, die mit dem mitgelieferten CSS-code wie folgt funktionieren:

- **Beschriftungsgruppe 1:** wird im unteren Bereich des Widgets angezeigt. «Beschriftung» (Zeile 1) — это текст. Eine zweite Zeile kann über "Beschriftung 2" определен и аус mehreren zusammengesetzt werden (ein einführender statischer Text, Wert eines Datenpunktes, Einheit des Wertes (wird ohne Leerzeichen an den Wert angehängt), zusätzlicher Text am Ende).
- **Группа 2:** содержит все необходимые сведения в виде виджета и может быть использована для 3-х информационных сообщений, которые можно настроить на дизельном топливе. Je nach Widget-Größe ist der Platz dabei begrenzt, jedoch durchaus ausreichend, um technische Informationen darzustellen (zB`U: 230V, P: 12W` ).
- **Wert inkrementieren:** wird oben-rechts im Widget angezeigt und blendet zwei zusätzliche Schaltflächen mit der Beschriftung (+) и (-) ein. Durch Betätigung dieser Schaltflächen kann der Wert eines beliebigen States erhöht orverringert werden. Dies eignet sich Ideal, um Beispielsweise einen in der Beschriftungsgruppe 1 eingeblendeten Sollwert zu verändern.
- **Bedienung sperren:** Diese Einstellung ermöglicht es, die Bedienung des Widgets zu unterbinden, wenn der Wert des States`true` Одер`false` это, газировка beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, jedoch nicht eingeschaltet werden kann (oder andersherum). При активации флажка можно полностью завершить настройку и виджет, который может быть установлен только сейчас. Дополнительный значок может быть установлен, когда вы используете его. «Bedienung sperren» будет зависеть от «Wert inkrementieren».
- **Лучшее сообщение:** если значок не установлен, если флаг штата не используется (= unbestätigte Änderung). Если этот флажок установлен, логика будет отключена, значок будет изменен, если установлен флаг подтверждения (=лучший ответ). С помощью флажка можно установить значок, который отображается (CSS-класс)`spin` wird hinzugefügt).

**Примечание:** CSS-код не подходит для «Beschriftungsgruppe 2», «Wert inkrementieren», «Bedienung sperren» и «Bestätigte Änderung», которые можно использовать. Длительное использование виджетов и/или использование кодов очень важно.

### hkt-Value

<img src="/doc/img/hkt-Value.png" height="120" />

Виджет Value-Widget для Anzeige von Werten, vornehmlich Zahlenwerten. Es besitzt zwei Beschriftungsgruppen und (+)/(-)-Tasten, die mit dem mitgelieferten CSS-code wie folgt funktionieren:

- **Beschriftungsgruppe 1:** wird im unteren Bereich des Widgets angezeigt. «Beschriftung» (Zeile 1) — это текст. Eine zweite Zeile kann über "Beschriftung 2" определен и аус mehreren zusammengesetzt werden (ein einführender statischer Text, Wert eines Datenpunktes, Einheit des Wertes (wird ohne Leerzeichen an den Wert angehängt), zusätzlicher Text am Ende).
- **Группа 2:** содержит все необходимые сведения в виде виджета и может быть использована для 3-х информационных сообщений, которые можно настроить на дизельном топливе. Je nach Widget-Größe ist der Platz dabei begrenzt, jedoch durchaus ausreichend, um technische Informationen darzustellen (zB`H: 64%, Y: 10%` ).
- **Wert inkrementieren:** wird oben-rechts im Widget angezeigt und blendet zwei zusätzliche Schaltflächen mit der Beschriftung (+) и (-) ein. Durch Betätigung dieser Schaltflächen kann der Wert eines beliebigen States erhöht orverringert werden. Dies eignet sich Ideal, um Beispielsweise einen in der Beschriftungsgruppe 1 eingeblendeten Sollwert zu verändern.

**Примечание:** в некоторых случаях CSS-код не используется, в «Beschriftungsgruppe 2» и «Wert inkrementieren» gleichzeitig verwendet werden. Доступ к виджетам или просмотр кодов очень важен.

### hkt-ViewInWidget-Dialog

<img src="/doc/img/hkt-ViewInWidget-Dialog.png" height="120" />

Если виджет отключен в диалоговом окне, его можно просмотреть в другом месте. Das Dialog-Fenster besitztz keinen eigenen Schließen-Button. Dieser muss in der angezeigten View eingefügt werden. Beim Öffnen und Schließen kann ein beliebiger State gesetzt werden, die geschriebenen Werte sind dabei frei auswählbar. Если вы позолочены в этом месте, если вы находитесь в Шлиссене, и если это не произойдет, если диалоговое окно или кнопка «Закрыть диалог» будут заблокированы, ничего не будет сделано в новом окне VIS.

Некоторые функции CSS-кода следующие:

- **Beschriftungsgruppe 1:** wird im unteren Bereich des Widgets angezeigt. «Beschriftung» (Zeile 1) — это текст. Eine zweite Zeile kann über "Beschriftung 2" определен и аус mehreren zusammengesetzt werden (ein einführender statischer Text, Wert eines Datenpunktes, Einheit des Wertes (wird ohne Leerzeichen an den Wert angehängt), zusätzlicher Text am Ende).
- **Группа 2:** содержит все необходимые сведения в виде виджета и может быть использована для 3-х информационных сообщений, которые можно настроить на дизельном топливе. Je nach Widget-Größe ist der Platz dabei begrenzt, jedoch durchaus ausreichend, um technische Informationen darzustellen (zB`H: 64%, Y: 10%` ).
- **Диалог:** определение Eigenschaften des Dialogfensters. Die Eigenschaften «Dialoghöhe» und «Dialogbreite» beziehen sich auf den Inhalt der angezeigten View. Die Titelzeile wird zur Gesamthöhe hinzugefügt. Mit der Eigenschaft «Pfeil am Dialog anzeigen» может быть использован в Dialogfenster am Rand ein Pfeil hinzugefügt werden, sodass der Eindruch einer Sprechblase entsteht.

### hkt-Settings-Bool

<img src="/doc/img/hkt-Settings-Bool.png" height="30px" />

Настройки-Bool-Widget, который можно использовать/Aus-Schalter für States от Typ`boolean` и для Verwendung auf Seiten gedacht, wo mehrere Einstellungsoptionen dargestellt werden. Если вы хотите, чтобы ваш CSS-код имел следующие функции:

- **Bedienung sperren:** Diese Einstellung ermöglicht es, die Bedienung des Widgets zu unterbinden, wenn der Wert des States`true` Одер`false` это, газировка beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, jedoch nicht eingeschaltet werden kann (oder andersherum). При активации флажка можно полностью завершить настройку и виджет, который может быть установлен только сейчас. Дополнительный значок может быть установлен, когда вы используете его.

### hkt-Settings-Value

<img src="/doc/img/hkt-Settings-Value.png" height="30px" />

Настройки-Значение-Виджет, которые можно использовать для просмотра, могут быть изменены. Если вы хотите (+)/(-)-попробовать, добавьте CSS-код с нужными функциями:

- **Wert inkrementieren:** neben dem eigentlichen Anzeigewert werden zwei zusätzliche Schaltflächen mit der Beschriftung (+) и (-) angezeigt. Durch Betätigung dieser Schaltflächen kann der Wert erhöht или verringert werden. \* **Bedienung sperren:** Diese Einstellung ermöglicht es, die Bedienung des Widgets zu unterbinden, wenn der Wert des States`true` Одер`false` это, газировка beispielsweise ein Gerät mit diesem Widget nur ausgeschaltet, jedoch nicht eingeschaltet werden kann (oder andersherum). При активации флажка можно полностью завершить настройку и виджет, который может быть установлен только сейчас. Дополнительный значок может быть установлен, когда вы используете его.

### hkt-Button-DialogClose

<img src="/doc/img/hkt-Button-DialogClose.png" height="50px" />

Кнопка Dieser будет отключена в диалоговом окне. Если кнопка находится на плате Fensters, необходимо использовать идентификатор Widget-ID для диалоговых окон.

### hkt-Button-Set

<img src="/doc/img/hkt-Button-Set.png" height="50px" />

Dieses Widget erzeugt eine einstellbare Anzahl and Buttons, wobei jeder Button einen eigenen State steuern kann. Уэлчер Wert dabei geschrieben wird kann je Button eingestellt werden. Активация флажка «Закрытое диалоговое окно» будет использоваться для настройки кнопок диалогового окна, в этом месте оно находится в закрытом состоянии. Виджет может также использоваться для установки диалоговых окон, а также для «закрытого диалога» с определенной функцией.

### hkt-Button-Navigation

<img src="/doc/img/hkt-Button-Navigation.png" height="30px" />

Der Button ruft die eingestellte View auf.

### hkt-Button-Set-Navigation

<img src="/doc/img/hkt-Button-Set-Navigation.png" height="30px" />

Этот виджет позволяет использовать кнопки для навигации и различные виды. С помощью CSS-кода можно настроить кнопки для флажков, перемещая их по горизонтали и вертикали. Горизонтальное расположение — это короткие кнопки с размером 120 пикселей, а вертикальное расположение — это высокие кнопки с размером 30 пикселей.

### hkt-ViewInWidget-Swipe

Этот виджет — это контейнер для интервью, который нужно быстро прокручивать. С помощью CSS-кода вы должны получить интервью в своем рабочем окне, когда функция прокрутки-привязки отключена в состоянии покоя.