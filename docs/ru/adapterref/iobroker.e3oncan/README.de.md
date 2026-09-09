---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.e3oncan/README.de.md
title: ioBroker.e3oncan
hash: BUFSXP5jpxfqi/zfCV71DIMzHSx3JRGAPjXgtUZZfyQ=
---
![Логотип](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Количество установок](https://iobroker.live/badges/e3oncan-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/e3oncan-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)
![Тестирование и выпуск](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

# ioBroker.e3oncan

## e3oncan Adapter für ioBroker

> **Примечание:** Навигационные ссылки в этом документе лучше всего функционируют в [GitHub-Ansicht](/#/docs/adapterref/iobroker.e3oncan/README.de.md) . Относительные ссылки на другие документы (zB [data-points.md](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md) ) доступны на GitHub.

> Этот документ является немецкой версией документации. [Английская версия: README.md](/#/adapters/e3oncan)

## Inhaltsverzeichnis

- [Übersicht](#übersicht)
- [Что нового в версии 1.1.0?](#was-ist-neu-in-v110)
- [Что нового в версии 1.0.3?](#was-ist-neu-in-v103)
- [Что нового в версии 1.0.0](#was-ist-neu-in-v100)
- [Schnellstart](#schnellstart)
- [Konfigurationsanleitung](#konfigurationsanleitung)
  - [Schritt 1 – CAN-адаптер](#schritt-1--can-adapter)
  - [Schritt 2 – Gerätescan und Energiezähler-Erkennung](#schritt-2--gerätescan-und-energiezähler-erkennung)
  - [Schritt 3 – Datenpunktscan](#schritt-3--datenpunktscan)
  - [Шритт 4 – Zuweisungen und Zeitpläne](#schritt-4--zuweisungen-und-zeitpläne)
- [Анализ топологии автобусной сети](#bus-topologie-analyse)
- [e3oncan Страница с точками данных](#e3oncan-datenpunkte-seite)
- [Читать пункты данных](#datenpunkte-lesen)
- [Datenpunkte schreiben](#datenpunkte-schreiben)
- [Datenpunkte und Metadaten](#datenpunkte-und-metadaten)
- [Энергетические элементы](#energiezähler)
  - [E380 – Daten und Einheiten](#e380--daten-und-einheiten)
  - [E3100CB – Дата и время](#e3100cb--daten-und-einheiten)
- [FAQ und Einschränkungen](#faq-und-einschränkungen)
- [Спенден](#spenden)
- [Список изменений](#changelog)

---

## Übersicht

Viessmann-Geräte der E3-Serie (One Base Ökosystem) tauschen über den CAN-Bus eine große Datenmenge aus. Этот адаптер включается в эту коммуникацию и может быть установлен в ioBroker для подключения.

Ниже перечислены возможные варианты выбора и комбинации комбинаций:

| Модус        | Описание                                                                                                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Собирать** | Пассивное использование CAN-шины и дополнительные данные в Echtzeit, когда Geräte sie austauschen. Es werden keine Anfragen gesendet. Идеально подходит для использования Energiefluss.            |
| **UDSonCAN** | Liest und schreibt Datenpunkte aktiv über das UDS-Protokoll (универсальные диагностические службы по CAN). Erforderlich für Sollwerte, Zeitprogramme und Daten, die nicht spontan gesendet werden. |

Welche Modi verfügbar sind, hängt von der Geräteconfiguration ab. Подробнее читайте в [обсуждениях по теме топологии](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34) . Anwendungsbeispiele sind in der [Diskussion zu Anwendungsfällen](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) zu finden.

> Wichtige Teile dieses Adapters basieren auf dem [open3e](https://github.com/open3e) -Projekt. Базовая реализация Python только для сбора с MQTT находится на панели [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) .

---

## Was ist neu in v1.1.1

### Актуальные определения дат

Die Datenpunktdefinitionen wurden auf Version 20260705 (allgemein) и 20260630 (Varianten) актуальны.

### Новый кодек O3ESwitch

Ein neuer Codec`O3ESwitch` Чтобы получить доступ к дате, необходимо использовать структуру вашего специального дискриминатора-байта. Первый байт будет активен при выборе выбранного кодека. Если вы хотите, чтобы структурное декодирование ZigBee-Geräteslot-DID (2086–2143, 2262) было невозможным, то это означает, что декодирование не требуется (z. B. Klimasensor, Heizkörperthermostat, Fußbodenheizungsthermostat, Stellantrieb).

### Десятичное числовые кодеки

Численные кодеки (`O3EInt8` ,`O3EInt16` ,`O3EInt32` ,`O3EInt64` ,`O3EFloat32` ) unterstützen jetzt einen опционально Параметр`decimals` . Если это число больше 0, вы получите Dekodierergebnis auf die angebene Anzahl Nachkomastellen gerundet. Beispielsweise wird`SignalLevel` (Скалирование 2,55, десятичное число 2) damit ohne übermäßig lange Gleitkommazahlen ausgegeben.

### Einheiten und Metadaten werden beim Start nach Strukturänderungen Gesetzt

Чтобы начать работу с адаптером, выберите Struktur eines Datenpunkts geändert Hat (новая версия в`didsE3var.json` Одер`didsE3.json` ), werden Einheiten und Beschreibungen für alle Unterzustände des neu angelegten Tree-Abschnitts jetzt correkt gsetzt. Bisher wurden Einheiten nur beim Datenpunktscan gesetzt; nach einer Strukturaktualisierung war ein erneuter Scan erforderlich, um sie zu befüllen.

---

## Что нового в версии 1.0.3?

### Выполните перестройку, чтобы выполнить обновление Node.js.

Das native CAN-Modul`socketcan` Когда версия 4.2.1 будет актуализирована и будет проверена стабильная версия **N-API** -Schnittstelle. Этот модуль должен быть заменен версией Node.js, которая больше не компилируется. Обновление Node.js (от 22 до 24) erfordert keinen`iob rebuild` -Schritt mehr — der Adaptor startet ohne weitere Maßnahmen.

### Фильтр для установленных дат в дата-центре

Щелкните по зеленому значку с установленными датами и **дополнительными фильтрами по картам и установленными датами** . Итак, lassen sich Zeitplane für ein bestimmtes Gerät schnell prüfen und anpassen. Ein weiterer Klick auf das Badge или auf den Kartenkopf stellt die vollständige Ansicht wieder ее.

### Schutz benutzerdefinierter Variantendatenpunkt-Definitionen

Benutzerdefinierte Strukturen в`e3oncan.0.<GERÄT>.info.udsDidsSpecific` können jetzt durch das Setzen фон`"protected": true` **для автоматических обновлений** . Дополнительные опции Feld`"reason"` wird in das Log geschrieben, wenn der Schutz greift. Ohne Schutz werden Variantendatenpunkte (die auch in`didsE3var.json` enthalten sind) weiterhin autotisch auf neuere Definitionen actualisiert. Подробности Стивен в [документации](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific) .

### Актуальные определения дат

Die Datenpunktdefinitionen wurden auf Version 20260528 (allgemein) и 20260527 (Varianten) актуальны. Основные моменты:

- ZigBee-DIDs 2084–2319 vollständig Strukturiert (Geräteeigenschaften, aktuelle Werte в 57- и 68-байтовых вариантах)
- Структура Raum-DID 1884–1943 (название, тип, температура, Fenstererkennung, мин/макс-Luftfeuchte)
- Neue ViGuide-basierte DID-Strukturen für Brennstoffzellenmetriken, Energiedeckung und Batterie-/Wechselrichter-Abonnements
- `Unknown*` -Felder verwenden jetzt einheitlich`RawCodec`

---

## Что нового в версии 1.0.0

### Страница точек данных

Eine neue **e3oncan Datenpunkte** — это прямой доступ к адаптерам в ioBroker-Instanzansicht verrankert. Нажмите на кнопку Schaltfläche<img src="admin/icon_open_tab.svg" height="20"> в der Instantzzeile, um sie zu öffnen. Sie bietet eine dedizierte Oberfläche zum Verwalten von Zeitplänen und Collect-Einstellungen je Gerät und Datenpunkt — ohne dass der vollständige Adaptorconfigurationsdialog geöffnet werden muss.

### Автоматическое управление энергией

Энергетические устройства (E380 и E3100CB) работают **автоматически при автоматическом сканировании** , за исключением пассивного режима работы CAN-канала. Название штата было изменено автоматически по CAN-адресу и каналам. Der Aktiv/Inaktiv-Schalter und die Collect-Verzögerung für jeden Energiezähler werden ausschließlich in der Datenpunkte-Seite configuriert.

Beim ersten Start nach einem Upgrade von einer früheren Version wird die bisherige Energiezähler-Konfiguration autotisch migriert.

### Automatische Erkennung von Collect-fähigen Geräten

При сканировании данных с пассивного адаптера на шине CAN, в случае необходимости, когда вы создаете режим сбора, вы не можете установить его. Для этого используйте значок-символ в заголовке-заголовке даты.

### Гибкое сканирование точек данных

Новый вариант **выбора даты сканирования в объектной базе** должен быть указан, а также актуален, когда необходимо указать сканированные объекты в выбранном объекте. Если эта опция деактивирована, активируется переход и метаданные для изменения объекта ввода данных, а затем снова автоматически включается, когда на дем-сканере используются старые данные.

### Анализ топологии автобусной сети

Для автоматического сканирования адаптером всех топологических данных необходимо выполнить сканирование. Das Ergebnis wird в новых Штатах в`info` -Канал gespeichert:

- `info.topology` – структурированные JSON со всеми используемыми UDS-файлами и топологическими элементами (дедупликация всех топологических матриц).
- `info.topologyHtml` – вам нужно создать HTML-таблицу, указать тип шины (CanInternal, CanExternal, CanRaw, ModBus, ServiceBus), с UDS-значком для создания, а также использовать UDS-бар. Используйте этот HTML-виджет для просмотра, просмотра или просмотра вашего HTML-виджета.

---

## Schnellstart

**Voraussetzungen**

- USB-to-CAN- или CAN-адаптер, который используется для внешней или внутренней CAN-шины Viessmann-E3-Geräts verbunden ist.
- Базовая хост-система Linux (Nur Linux wird unterstützt).
- CAN-адаптер активен и находится на системной панели, z. Б. как`can0` (prüfen mit`ifconfig` ).
- Zur Einrichtung des CAN-Adapters siehe das [open3e-Projekt-Wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry) .

> **Важная информация:** Если вы хотите использовать другой клиент UDsonCAN (z. B. open3e), используйте адаптер для быстрого подключения. Parallele UDS-Kommunikation verursacht Fehler в beiden Anwendungen.

**Эрштайнрихтунг – Курцюберзихт**

1. Установите адаптер и откройте диалоговое окно конфигурации.
2. CAN-адаптер на вкладке **CAN-адаптер** , настроенный и настроенный.
3. Создайте E3 в **списке вкладок сканирования UDS** .
4. Datenpunkte auf dem Tab **Liste der Datenpunkte** Scannen (до 5 минут).
5. Используйте интервалы между вкладками **для чтения** и чтения.

Подробные описания указаны в [настройках конфигурации](#konfigurationsanleitung) .

> **После обновления Node.js:** встроенные адаптеры модулей должны быть снова компилированы, если вы хотите установить версию Node.js. Переход к адаптеру после Node.js-Upgrade больше не начинается, адаптер останавливается,`iob rebuild` auf der Kommandozeile ausführen и адаптер не запускается.

---

## Konfigurationsanleitung

### Schritt 1 – CAN-адаптер

Откройте диалоговое окно конфигурации адаптера и перейдите на вкладку **CAN-адаптер** .

- Namen der CAN-Schnittstelle eingeben (Стандарт:`can0` ).
- **С помощью адаптера** можно активировать автоматические выключатели.
- **ШПЕЙХЕРН** дрюкен. Адаптер не будет установлен и будет отключен от CAN-шины.

Falls ein zweiter CAN-Bus vorhanden ist (z. B. inner Bus), может быть использован также как zweiter Adaptor configuriert werden. Ein zweiter **Zuweisungen** -Tab erscheint, sobald der zweite Адаптер конфигурируется.

### Schritt 2 – Gerätescan und Energiezähler-Erkennung

Zum Tab **Liste der UDS-Geräte** wechseln und **Scan** Drücken.

- Der Scan dauert einige Sekunden. Fortschritt находится на панели «Адаптер-Журнал» (открыта вкладка «Браузер-Вкладка»).
- Все автобусы E3-Geräte werden aufgelistet. Die Geräte können in der zweiten Spalte umbenannt werden — эти имена указаны как Bezeichner im ioBroker-Objektbaum verwendet.
- **SPEICHERN** Drücken, Wenn Fertig. Die Instanz wird neu gestartet.

> В зависимости от конфигурации адаптера (Datenpunkt 382) можно найти различные значения температуры (°C или °F) и датум-/Zeitformaten. Diese werden Gespeichert und Beim Nachfolgenden Datenpunktscan verwendet.

**Energiezähler-Erkennung**

Отключите сканирование, запустите пассивный адаптер на шине CAN на широковещательных устройствах E380- и E3100CB-Energiezählern. Es ist keine zusätzliche Scanzeit erforderlich — die Erkennung läuft Parallel. Das Ergebnis wird Gespeichert und Angezeigt:

- В диалоговом окне «Конфигурации адаптера» ( **Список вкладок для создания UDS** ) также используется Textzusammenfassung.
- In der **e3oncan Datenpunkte** -Seite als einzelne Karten für jeden erkannten Zählertyp (siehe [unten](#e3oncan-datenpunkte-seite) ).

### Schritt 3 – Datenpunktscan

Откройте Tab **Liste der Datenpunkte** , **Scan starten…** drücken und mit **OK** bestätigen.

> **Geduld** – der Scan kann bis zu 5 Minuten dauern. Der Fortschritt находится на панели управления Adaptor-Log.

Was der Scan tut:

- Ermittelt alle verfügbaren Datenpunkte für jes Gerät.
- Fügt Metadaten (Beschreibung, Einheit, Lese-/Schreibzugriff) zu jedem Datenpunkt-Objekthinzu.
- Setzt phykalische Einheiten gemäß der in Schritt 2 gefundenen Datenformatconfiguration.
- Erstellt den vollständigen Objektbaum für jedes Gerät в ioBroker.
- При сборе данных необходимо отключить пассивное сканирование при использовании CAN-шины (keine zusätzliche Scanzeit — параллельное сканирование). Ein Pin-Symbol erscheint im Gerätekarten-Header der **e3oncan Datenpunkte** — Seite für jedes erkannte Gerät.

Dieser Schritt ist für die reine Lesenutzung nicht zwingend erforderlich, wird aber **dringend empfohlen** — und ist **notwendig** , wenn Datenpunkte geschrieben werden sollen.

**Datenpunktwerte während des Scans im Objektbaum speichern**

Standardmäßig schreibt der Scan auch den aktuellen Wert jedes Datenpunkts in den Objektbaum (`json` -,`raw` - унд`tree` -Штаты). Если вы хотите использовать опцию **Datenpunktwerte im Objektbaum während des Scans speichern** oberhalb der Scan-Schaltfläche angepasst werden. Если эта опция деактивирована, активируется переход и метаданные для изменения объекта ввода данных, а затем снова автоматически включается, когда на дем-сканере используются старые данные.

Этот вариант - это лучший вариант, когда вы получаете большую прибыль от State-Schreibvorgängen während des Scans vermieden werden soll (z. B. auf Systemen mit vielen Geräten). Wenn zuvor ein Scan mit gespeicherten Werten durchgeführt wurde und jetzt ein sauberer Neuanfang gewünscht wird, können die`json` -,`raw` - одер`tree` -Unterobjekte eines Geräts aus dem ioBroker-Objektbaum gelöscht werden — адаптер легт sie autotisch neu an, wenn er das das nächste Mal Daten empfängt. **Примечание: Если вы хотите,** чтобы ваш брокер ioBroker имел привлекательный внешний вид, вы могли получить доступ к RAM-Verbrauch erhöhen kann. Auf Systemen mit knappem Arbeitsspeicher besser in kleinen Batches loschen.

> **Совет по адаптеру истории:** если объект **не** использует исторические данные, адаптер истории (History, InfluxDB, SQL) не используется. Если вы хотите использовать Backend-ы адаптеров для просмотра диаграмм, то State-ID будет неожиданным. История-Подключение-Конфигурация (das „enabled“-Flag am Objekt) будет доступна для просмотра и должна быть активирована вручную.

> **Предупреждение:** Den`info` -Kanal niemals löschen (z.B.`e3oncan.0.info` ). Er enthält Scan-Ergebnisse, Energiezähler-Erkennung, Verzögerungen, Aktiv-Flags, Bus-Topologie-Zusammenfassungen и CAN-Verbindungsstatus. Если устройство не настроено, оно не должно автоматически выполняться.

**Анализ топологии автобусной сети**

Nach dem Scan erzeugt der Adaptisch eine Bus-Topologie-Zusammenfassung und speichert und speichert sie in Zwei States im`info` -Канал:`info.topology` (JSON) унд`info.topologyHtml` (HTML). Подробности [для анализа топологии шины](#bus-topologie-analyse) еще раз.

Nach dem Scan können die gefundenen Datenpunkte über die **e3oncan Datenpunkte** -Seite durchsucht und verwaltet werden (siehe [unten](#e3oncan-datenpunkte-seite) ).

### Шритт 4 – Zuweisungen und Zeitpläne

Die empfohlene Vorgehensweise zum Konfigurieren von Leseintervallen und geräteindividuellem Collect-Modus ist die **e3oncan Datenpunkte** -Seite (siehe [unten](#e3oncan-datenpunkte-seite) ).

**Энергетические элементы**

Если вы используете Gerätescan E380 или E3100CB-Energiezähler, вы можете использовать эту карту для **e3oncan Datenpunkte** - Seite. Das Sammeln mit dem **Collect** -Schalter auf der Karte aktivieren. Im Feld **Verzögerung (s)** das Mindestintervall zwischen Wertaktualisierungen в ioBroker einstellen. Der Standardwert von 5 Sekunden ist empfohlen — Energiezähler übertragen mehr als 20 Werte pro Sekunde, und ein Wert von 0 würde ioBroker stark belasten.

**Speichern & Schließen** Drücken, Wenn Fertig. Den Objektbaum prüfen, ob Daten gesammelt werden.

---

## Анализ топологии автобусной сети

Когда данные Datenpunktscan пересылаются адаптером во все места сканирования, общие топологические данные и сведения об их эргебнисах в двух штатах`info` -Канал:

| Состояние           | Ролле  | Инхальт                                                                                                                                  |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `info.topology`     | `json` | Структурированные JSON: список всех UDS-изображений, созданных и всех топологических элементов, дедупликация всех топологических матриц. |
| `info.topologyHtml` | `html` | Создайте HTML-таблицу, кодировку для Bus-Typ, с **UDS** -Badge для создания, а также рядом с UDS-кодом                                   |

**Anzeige der HTML-Tabelle**

Если вам нужна топология в ioBroker с помощью Dashboard-Tool, то HTML-состояния могут отображаться следующим образом:

- **jarvis** : **stateHTML** -Подсказка виджета →`e3oncan.x.info.topologyHtml` auswählen.
- **vis / vis2** : Widget **basic – Строка (без экранирования)** или **HTML** →`e3oncan.x.info.topologyHtml` auswählen.

> **Hinweis:** Die States`info.topology` унд`info.topologyHtml` können für den Standard-ioBroker-Admin-State-Editor-Dialog zu Groß Sein. Dies ist eine bekannte Einschränkung des Admin-UI для больших строковых состояний. Состояния были исправлены, а стандартные настройки скриптов и виджетов были изменены.

---

## e3oncan Страница с точками данных

Die **e3oncan Datenpunkte** -Seite ist die zentrale Stelle zum Durchuchen von Datenpunkten und zum Konfigurieren von UDSonCAN-Leseintervallen und geräteindividuellem Collect-Modus. Если вы перейдете на новую вкладку «Браузер», перейдите в раздел «ioBroker-Admin-Instanzansicht» и выберите «Schaltfläche **Datenpunkte»** в режиме «Мгновенный переход адаптеров».

**Datenpunkte durchsuchen**

Все устройства и устройства для энергоснабжения должны быть включены в стандартную защитную крышку для использования в стандартной системе. Ein Klick auf den Karten-Header klappt die Karte auf. Если вы отфильтровали имя или идентификатор, введите карту, которая автоматически включается.

Если вы хотите, чтобы ваши данные были в безопасности, вы можете просмотреть их на странице с предупреждающим баннером в качестве уведомления. Когда сканирование выполняется, в версии 1.x необходимо выполнить сбор автоматического сканирования, а затем ничего не сделать, включить информационный баннер и выполнить сканирование. Dieser Hinweis kann per Instanz dauerhaft ausgeblendet werden (Schaltfläche **Nicht mehr anzeigen** ).

**Gerätekarten**

Необходимо получить список дат с идентификатором, именем, кодеком и параметрами плана полета. Der Collect-Schalter и минимальное Aktualisierungszeit erscheinen im Karten-Header. Когда вы получаете данные по сканированию данных о сборе трафика, вы можете указать, что в заголовке карты есть графический пин-символ, как лучший вариант. Если у вас нет даты, нажмите на значок **N по расписанию** — и нажмите кнопку, чтобы нажать на карту и получить нужную дату. Нажмите на значок, чтобы установить фильтр; Нажмите на кнопку «Заголовок карты», чтобы выбрать «Фильтр» и «Клапнуть карту», или нажмите на значок, чтобы получить значок, который вы хотите видеть.

**Energiezähler-Karten**

Когда вы используете энергетические сканеры (siehe [Schritt 2](#schritt-2--gerätescan-und-energiezähler-erkennung) ), вы можете найти их на странице для использования вашей карты. Den **Collect** -Schalter zum Aktivieren der Datenerfassung verwenden und im Feld **Verzögerung (s)** das Mindestintervall zwischen Wertaktualisierungen в ioBroker einstellen.

**Zeitpläne**

Для того, чтобы получить данные, можно использовать следующие сведения:

- **Включите функцию «Пуск»** – пункт «Данные» должен быть активен для запуска адаптеров.
- **Интервал (ы)** eingeben – der Datenpunkt wird in diesem Abstand wiederholt gelesen.

Beide Optionen können kombiniert werden. В режиме Zeitplan-Filter (Alle / Beim Start / Intervall) вы можете выбрать один из следующих вариантов фокусировки.

**Топология**

**Топология** Schaltfläche на панели инструментов отключена от Bus-Topologie-Diagramm в одном модальном диалоговом окне. Эта диаграмма будет автоматически начата с помощью Datenpunktscan erstellt (например, [Bus-Topologie-Analyse](#bus-topologie-analyse) ). Die Schaltfläche деактивирован, поэтому необходимо изменить топологические данные.

**Шпайхерн**

**Speichern** drückt die Änderungen an, ohne den Tab zu schließen. **Speichern & Schließen** speichert und schließt den Tab und kehrt zur Instantansicht zurück. **Проверьте и** замените вкладку без использования Speichern — kein Adaptor-Neustart wird ausgelöst. Ein **Nicht gespeicherte Änderungen** - Значок erscheint, sobald ausstehende Änderungen vorhanden sind.

> **Примечание:** Beim Speichern werden die Zeitpläne aller in diesem Tab angezeigten Geräte aus dem aktuellen UI-Zustand neu aufgebaut. Когда устройство не будет отключено (напрямую в диалоговом окне конфигурации адаптера), оно не будет отключено. Existieren für dasselbe Gerät Zeitpläne and beiden Stellen, überschreibt der Datenpunkte-Tab beim Speichern. Двойные повторные включения выполняются автоматически.

---

## Читать пункты данных

Даты автоматически включаются в конфигурацию Zeitplanen gelesen. Die Werte erscheinen im ioBroker-Objektbaum unter dem Gerätenamen, aufgeteilt in`json` -,`raw` - унд`tree` -Unterobjekte mit lesbaren Namen und Metadaten.

**Einzelnen Datenpunkt auf Abruf lesen**

Jeder Datenpunkt kann jederzeit abgefragt werden, indem der State`e3oncan.0.<GERÄT>.cmnd.udsReadByDid` Bearbeitet und eine Liste von Datenpunkt-IDs eingegeben wird, z. Б.`[3350, 3351, 3352]` . Wenn der Datenpunkt auf dem Gerät verfügbar ist, erscheint der Wert im Objektbaum und kann in Leseintervallen verwendet werden.

Der numerische Scanbereich ist derzeit begrenzt (z. B. 256–3338 в версии 0.11.0). Мит`udsReadByDid` können Datenpunkte außerhalb dieses Bereichs abgerufen werden.

---

## Datenpunkte schreiben

Das Schreiben ist bewusst einfach gehalten: Den Wert des entsprechenden States in ioBroker ändern und speichern, **ohne** das Kontrollkästchen`Bestätigt` (ack) zu activieren. Адаптер предназначен для наилучшего подключения и отправки в устройство.

Через 2,5 секунды после установки адаптера на место выпадет напряжение и будет указан лучший момент. Если состояние не является лучшим, необходимо прочитать журнал адаптера или получить подробную информацию о нем.

**Белый список шрайббареров Datenpunkte**

Если вы хотите получить доступ к белому списку, нажмите здесь:

```
e3oncan.0.<GERÄT>.info.udsDidsWritable
```

Die Liste kann durch Bearbeiten dieses States erweitert werden. Шпайхерн **без**`Bestätigt` zu aktivieren.

Einige Datenpunkte können auch nach der Aufnahme in die Whitelist nicht geändert werden — das Gerät Liefert dann eine отрицательный ответ. Вариант адаптера может быть альтернативным (внутренняя CAN-шина). Schreibvorgänge immer durch Prüfen des bestätigten Werts verifizieren.

---

## Точки данных и метаданные

Ausführliche Informationen zur Struktur der Datenpunkte, zur Funktionsweise von Varianten-Datenpunkten und Metadaten sowie zur Handhabung von Temperatur-, Datums- und Zeitformaten ind [data-points.md](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md) (english) zu finden.

---

## Энергетические элементы

Энергетика работает автоматически. Eine manuelle Konfiguration ist nicht erforderlich. Если адаптер имеет имя состояния в ioBroker-Objektbaum, вам нужно будет выполнить следующие действия:

| Канал    | CAN-адрес | Название штата |
| -------- | --------- | -------------- |
| UDS CAN  | 98        | `e380`         |
| UDS CAN  | 97        | `e380_97`      |
| 2. МОЖЕТ | 98        | `e380_98`      |
| 2. МОЖЕТ | 97        | `e380_97`      |

`e380` (без суффикса) укажите CAN-адрес 98 на UDS-CAN-канале, чтобы обеспечить совместимость с наилучшей установкой.`e3100cb` Вы можете погрузить его в E3100CB.

Die Collect-Verzögerung (Standard 5 s) может быть использован для Zählertyp in der **e3oncan Datenpunkte** -Seite angepasst werden. Не используйте адаптер-Neustart.

### E380 – Daten und Einheiten

Es werden bis zu zwei E380-Energiezähler unterstützt. Идентификаторы даты указаны на CAN-адресе устройства:

- **CAN-адрес 97:** Datenpunkte mit geraden ID
- **CAN-адрес 98:** Даты с незарегистрированными идентификаторами

| ИДЕНТИФИКАТОР | Датен                                   | Einheit |
| ------------- | --------------------------------------- | ------- |
| 592, 593      | Wirkleistung L1, L2, L3, Gesamt         | В       |
| 594, 595      | Слепой лист L1, L2, L3, Gesamt          | вар     |
| 596, 597      | Betragsstrom L1, L2, L3; cosPhi         | А, —    |
| 598, 599      | Spannung L1, L2, L3; Frequenz           | В, Гц   |
| 600, 601      | Kumulierter Bezug, Einspeisung          | кВтч    |
| 602, 603      | Gesamtwirkleistung, Gesamtblindleistung | В, вар  |
| 604, 605      | Kumulierter Bezug                       | кВтч    |

### E3100CB – Дата и время

| ИДЕНТИФИКАТОР | Датен                                 | Einheit |
| ------------- | ------------------------------------- | ------- |
| 1385\_01      | Kumulierter Bezug                     | кВтч    |
| 1385\_02      | Kumulierte Einspeisung                | кВтч    |
| 1385\_03      | Статус: −1 = Einspeisung / +1 = Безуг | —       |
| 1385\_04      | Wirkleistung Gesamt                   | В       |
| 1385\_08      | Wirkleistung L1                       | В       |
| 1385\_12      | Wirkleistung L2                       | В       |
| 1385\_16      | Wirkleistung L3                       | В       |
| 1385\_05      | Blindleistung Gesamt                  | вар     |
| 1385\_09      | Blindleistung L1                      | вар     |
| 1385\_13      | Blindleistung L2                      | вар     |
| 1385\_17      | Blindleistung L3                      | вар     |
| 1385\_06      | Бетрагсстром Л1                       | А       |
| 1385\_10      | Бетрагстром Л2                        | А       |
| 1385\_14      | Бетрагстром Л3                        | А       |
| 1385\_07      | Spannung L1                           | В       |
| 1385\_11      | Spannung L2                           | В       |
| 1385\_15      | Spannung L3                           | В       |

---

## FAQ und Einschränkungen

**Комбинировать сбор и UDsonCAN?**

Сбор Lifert Echtzeitdaten für alles, был die Geräte untereinander austauschen — schnell wechselnde Werte wie Energiefluss und langsam wechselnde wie Temperna, драгоценности, актуальные в данный момент, в dem sie sich ändern. UDSonCAN позволяет использовать функцию Zugriff auf Daten, которая не может быть спонтанно использована, типизирована и настроена. Комбинация модификаций позволяет использовать и активировать Bild des Systems.

**Welche Geräte unterstützen den Collect-Modus?**

Derzeit ist das Collect-Protokoll bekannt für:

- Витокал / HPMUMASTER (Collect-ID)`0x693` (интернет CAN-шина)
- Vitocharge VX3 и Vitoair / EMCUMASTER (Collect-ID`0x451` , внешняя и внутренняя CAN-шина)

CAN-ID можно автоматически сканировать и автоматически сканировать по UDS-Gerätennames. Когда вы ничего не делаете в списке, вы можете автоматически собирать идентификаторы; Вы можете вручную изменить конфигурацию адаптера.

**Можно ли использовать open3e gleichzeitig genutzt werden?**

Да, с Einschränkungen. Если в этом адаптере нет режима сбора, вы можете открыть 3e без параллельного подключения. Если UDSonCAN не работает, open3e nicht gleichzeitig für Dieselben Geräte betreiben — это спорадические способы связи в Beiden Anwendungen.

**Функция адаптера для Node.js-Upgrade больше не используется. Был Тун?**

Этот адаптер является родным модулем, но его версия Node.js не компилируется автоматически. Адаптер стопор,`iob rebuild` При включении командной строки адаптер не запускается. Если проблема будет лучше всего, проблема будет решена.

**Был ли это Unterschied zum open3e-Projekt?**

- Прямая интеграция в ioBroker: конфигурация в диалоговом окне, данные непосредственно на панели объектов.
- Echtzeit-Collect-Modus zusätzlich zu UDSonCAN.
- Schreiben von Daten ist einfacher: einfach einen State-Wert ändern und ohne Bestätigung speichern.
- Используйте MQTT erforderlich (MQTT — это естественная функция нормальной настройки ioBroker-Konfiguration).
- 64-битное целочисленное кодирование в исходном коде не соответствует 2^52 (4.503.599.627.370.496). Функциональное декодирование корректируется при использовании 64-битной версии.

**Können Datenpunkte außerhalb des Scanbereichs abgefragt werden?**

Дж. Ден Стейт`e3oncan.0.<GERÄT>.cmnd.udsReadByDid` Bearbeiten und eine Liste von Datenpunkt-IDs eingeben, z. Б.`[3350, 3351, 3352, 3353]` . Verfügbare Datenpunkte erscheinen im Objektbaum und können in Leseintervallen verwendet werden. Nicht verfügbare Datenpunkte erzeugen eine «Отрицательный ответ»-Meldung im Log.

---

## Спенден

<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>\
&#x20;Когда я начну работать над проектом — или Sie einfach großzügig sind — würde ich mich über ein Bier freuen. Прост! :пиво:

## Лицензия

Лицензия MIT

Авторские права (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

Настоящим предоставляется разрешение любому лицу, получившему копию данного программного обеспечения и сопутствующих файлов документации («Программное обеспечение»), бесплатно распоряжаться Программным обеспечением без ограничений, включая, помимо прочего, право использовать, копировать, изменять, объединять, публиковать, распространять, сублицензировать и/или продавать копии Программного обеспечения, а также разрешать лицам, которым предоставляется Программное обеспечение, делать это при соблюдении следующих условий:

Указанное выше уведомление об авторских правах и данное разрешение должны быть включены во все копии или существенные части программного обеспечения.

Программное обеспечение предоставляется «как есть», без каких-либо гарантий, явных или подразумеваемых, включая, помимо прочего, гарантии товарной пригодности, пригодности для определенной цели и отсутствия нарушений прав интеллектуальной собственности. Ни при каких обстоятельствах авторы или правообладатели не несут ответственности за какие-либо претензии, убытки или иную ответственность, независимо от того, возникли ли они в результате нарушения договора, деликта или иным образом, в связи с использованием программного обеспечения или другими действиями с ним.

## Changelog

### Historie der Änderungen

Die Changelog-Einträge sind in der englischen Verison der (README.MD)[README.MD#changelog] verfügbar.

### Ältere Versionen

Ältere Changelog-Einträge sind in [CHANGELOG_OLD.md](https://github.com/MyHomeMyData/ioBroker.e3oncan/blob/main/CHANGELOG_OLD.md) zu finden.