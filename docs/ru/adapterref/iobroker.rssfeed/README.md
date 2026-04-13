---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rssfeed/README.md
title: Адаптер ioBroker для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF).
hash: lyXFXr3Ju6dg0BPZZRhneQ+hOP4x0mGTAy7vzr/kM5E=
---
# Адаптер ioBroker для запроса и отображения RSS-каналов различных стандартов (Atom, RSS, RDF)
![Логотип](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Количество установок](https://iobroker.live/badges/rssfeed-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/rssfeed-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Обзор
Адаптер для запроса и отображения RSS-лент различных стандартов (Atom, RSS, RDF).
Вы можете настроить вывод ленты с помощью системы шаблонов. В шаблоны можно включать HTML, CSS и JavaScript.

Важно: из-за ошибок в автоматическом переводе на другие языки, выполняемом iobroker, действителен только английский перевод.

## Конфигурация
Установите адаптер обычным способом из стабильного репозитория. Если вы хотите протестировать новые функции или исправления ошибок, вы также можете установить адаптер из бета-репозитория. Информацию о новых функциях и новостях можно найти в теме «Тестирование и поддержка» на форуме iobroker.

После установки адаптер должен отобразиться в разделе адаптеров в iobroker.
Иногда изменения могут быть невидимыми, особенно при изменении веб-интерфейса (виджеты / диалоговое окно конфигурации), в этом случае может потребоваться выполнить следующую команду в командной строке:

```bash
iobroker upload rssfeed
```

В правой части адаптера можно добавить экземпляр, используя кнопку «плюс».

Настройка проста. Полей всего несколько.

| Настройки | описание |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Частота обновления по умолчанию (мин) | — это общее указание того, как часто лента новостей должна обновляться в минутах. Значение по умолчанию — 60 минут |
| Максимальная статья (стандартная) | Здесь может быть ограничен общий объем обрабатываемых данных. |

Затем для каждого нового потока:

| Настройки | описание |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Имя | Название для точки данных. Внутри папки имя не должно встречаться дважды. |
| Категория | Название подпапки, в которой должна отображаться точка данных. |
| URL | Полный адрес ленты (с http:// или https://, см. примеры ниже) |
| Обновление (мин) | Время обновления/загрузки ленты. Для этой ленты можно указать другое значение. В противном случае используется общее значение. |
| Максимальное количество статей | Количество статей, которые должны быть сохранены в точке данных. Для этого потока можно указать другое значение. В противном случае используется общее значение. |

Если вы сохранили и закрыли конфигурацию, данные из фида можно найти в виде точки данных JSON в дереве объектов.
Если вы удалите запись, точки данных не будут удалены автоматически.

## Визуализация и виджеты
Следующие виджеты действительно существуют.

- [`Виджет RSS-ленты 2`](#rss-feed-widget-2) - для отображения одной ленты
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - для отображения нескольких агрегированных лент в одном виджете.
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - вспомогательный виджет для просмотра метаданных ленты.
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - вспомогательный виджет для просмотра данных статей из ленты.
- [`RSS Feed Title marquee 4 (deprecated)`](#rss-feed-title-marquee-4-deprecated) - виджет для отображения заголовков ленты в виде бегущей строки
- [`RSS Feed Title marquee 5`](#rss-feed-title-marquee-5) - виджет для отображения заголовков ленты в виде бегущей строки.
- [`JSON Template 3`](#json-template3) - виджет, не имеющий ничего общего с RSS-лентами, но использующий ту же технологию, и вы можете определить пользовательский шаблон для отображения любых JSON-данных в визуализации.

### Виджет RSS-ленты 2
Этот виджет можно использовать для отображения RSS-каналов, на которые подписан адаптер, в диалоговом окне конфигурации.
Благодаря системе шаблонов вывод можно настроить по своему усмотрению. Простой стандартный шаблон уже предоставлен.
Описание форматирования и синтаксиса можно найти на следующих страницах.

| Настройки | описание |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |
| rss_template | Этот шаблон определяет внешний вид RSS-ленты. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах style). Кроме того, существуют специальные теги, внутри которых отображаются данные ленты и могут выполняться инструкции JavaScript. Для лучшей идентификации используемых данных и имен атрибутов предусмотрены два виджета: rssfeed Meta helper и rssfeed Article helper. |
| rss_maxarticles | Максимальное количество отдельных статей, отображаемых из RSS-ленты |
| rss_filter | Для функции фильтрации в поле можно ввести один или несколько критериев, разделенных точками с запятой (;). Поиск осуществляется по следующим атрибутам статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

**Наличие переменной:**

- rss.meta: метаинформация ленты
- rss.articles: массив всех статей
- widgetid: идентификатор виджета
- style: объект стиля, если вы настроили дополнительную информацию о стиле.

Более подробную информацию об этих переменных см. в главе **Доступные переменные**.

Подробную информацию о системе шаблонов см. в главе «Шаблоны на основе примеров».

### Многофункциональный виджет RSS-ленты 3
С помощью этого виджета можно объединить несколько лент в одну.
Из-за наличия нескольких лент доступ к данным в шаблоне несколько отличается от обычного виджета RSS-ленты.
Мета-переменная недоступна в шаблоне. Однако для каждой отдельной статьи доступны 3 мета-атрибута: заголовок и описание под именами meta_title и meta_description.
Кроме того, в настройках каждой ленты можно присвоить общее имя, которое доступно в шаблоне под именем meta_name для каждой статьи, чтобы можно было определить источник статьи.
В остальном к шаблону применяются те же правила, что и к виджету RSS-ленты.

| Настройки | Группа | описание |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Общая группа | Здесь можно задать количество настраиваемых лент. Для каждой ленты в vis создается отдельная группа для настройки. |
| rss_template | | Шаблон определяет внешний вид RSS-ленты. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах стиля). Кроме того, существуют специальные теги, внутри которых отображаются данные ленты и могут выполняться инструкции JavaScript. Для лучшей идентификации используемых данных и имен атрибутов предусмотрены два виджета: rssfeed Meta helper и rssfeed Article helper. Подробную информацию о системе шаблонов см. в главе «Шаблоны на основе примеров». |
| rss_dpCount | Общая группа | Здесь можно указать количество дополнительных точек данных, которые должны быть доступны в шаблоне. |
| rss_dp[номер] | Общая группа | Здесь вы можете выбрать соответствующую точку данных. Точка данных доступна в шаблоне в переменной dp. Это означает, что точку данных можно получить в шаблоне следующим образом. Подробную информацию об этих переменных см. в главе «Доступные переменные» |
| rss_oid | Группировка каналов[число] | Выбор точки данных с соответствующим RSS-каналом. |
| rss_name | Групповые ленты[число] | Здесь вы можете ввести имя, которое будет доступно в шаблоне для каждой статьи в атрибуте meta_name. |
| rss_maxarticles | Групповые ленты[число] | Максимальное количество отдельных статей, отображаемых из RSS-ленты |
| rss_filter | Групповые ленты[число] | Для получения более подробной информации об этих переменных см. главу «Доступные переменные». Для функции фильтрации в поле можно ввести один или несколько критериев фильтрации, разделенных точками с запятой (;). Для поиска используются следующие атрибуты статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

**Наличие переменной:**

- rss.articles: массив всех статей.

— Часть метаинформации элемента доступна в статье в виде **meta_name**, **meta_title** и **meta_description**.

- массив dp[], если вы зададите дополнительные точки данных.
- widgetid: идентификатор виджета
- style: объект стиля, если вы настроили дополнительную информацию о стиле.

### Вспомогательная функция для метаданных RSS-ленты
Этот виджет можно использовать для отображения мета-атрибутов конкретного канала. Он просто служит справочным виджетом для создания шаблона, позволяющего быстро и легко отображать содержимое данных RSS-канала.
Атрибуты

| Настройки | описание |
| ------- | ------------------------------------------------------------ |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |

### Вспомогательная функция для RSS-ленты статей
Этот виджет можно использовать для отображения атрибутов статьи в конкретной ленте. Он просто служит справочным виджетом для создания шаблона, позволяющего быстро и легко отображать содержимое данных RSS-ленты.

| Настройки | описание |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Выбор точки данных с соответствующим RSS-каналом. |
| rss_prefix | Чтобы упростить использование имен атрибутов при копировании/вставке, здесь можно указать имя переменной, используемой в шаблоне для статьи. |
| rss_article | Этот атрибут можно использовать для переключения между различными существующими статьями в RSS-ленте. |

### RSS Feed Title marquee 4 (deprecated)
В этом виджете все атрибуты заголовка будут отображаться в виде прокручиваемого текста. В рамках перехода от виджета Marquee 2 к виджету 3, этот виджет теперь является мультивиджетом, в котором можно объединить более одной RSS-ленты.

| Настройки | группа | описание |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Общая группа | Здесь можно задать количество настраиваемых каналов. Для каждого настраиваемого канала в vis создается отдельная группа. |
| rss_speed | Общая группа | Скорость прокрутки текста. Атрибут rss_divider - Общая группа. Здесь можно ввести символы, используемые для разделения заголовков. Значение по умолчанию - +++. |
| rss_pauseonhover | Общая группа | Если эта опция включена, прокрутка текста останавливается, как только вы наводите на него курсор мыши. |
| rss_link | Общая группа | Если эта опция включена, заголовки отображаются в виде ссылки. При нажатии на заголовок ссылка на статью откроется в новом окне или вкладке. |
| rss_withtime | Общая группа | Если этот параметр включен, время отображается перед соответствующим заголовком. Атрибут rss_withdate - Общая группа. Если этот параметр включен, перед соответствующим заголовком отображается дата без года и время. |
| rss_withyear | Общая группа | Если эта опция включена, дата с годом и временем отображаются перед соответствующим заголовком. |
| rss_oid | Группа Feeds[number] | Выберите точку данных с соответствующим RSS-каналом. |
| rss_maxarticles | Группа Feeds[number] | Максимальное количество отдельных статей, отображаемых из RSS-ленты |
| rss_filter | Группа Feeds[number] | Для функции фильтрации в поле можно ввести один или несколько критериев, разделенных точками с запятой (;). Поиск осуществляется по следующим атрибутам статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

### RSS-лента Заголовок бегущей строки 5
В этом виджете все атрибуты заголовка будут отображаться в виде прокручиваемого текста. В рамках перехода от виджета Marquee 2 к виджету 3, этот виджет теперь является мультивиджетом, в котором можно объединить более одной RSS-ленты.

| Настройки | группа | описание |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Общая группа | Здесь можно задать количество настраиваемых каналов. Для каждого настраиваемого канала в vis создается отдельная группа. |
| rss_speed | Общая группа | Скорость прокрутки текста. Атрибут rss_divider - Общая группа. Здесь можно ввести символы, используемые для разделения заголовков. Значение по умолчанию - +++. |
| rss_pauseonhover | Общая группа | Если эта опция включена, прокрутка текста останавливается, как только вы наводите на него курсор мыши. |
| rss_opentype | Общая группа | Выбор способа открытия ссылки: `none`, `link`, `popup` |
| rss_withtime | Общая группа | Если этот параметр включен, время отображается перед соответствующим заголовком. Атрибут rss_withdate - Общая группа. Если этот параметр включен, перед соответствующим заголовком отображается дата без года и время. |
| rss_withyear | Общая группа | Если эта опция включена, дата с годом и временем отображаются перед соответствующим заголовком. |
| rss_oid | Группа Feeds[number] | Выберите точку данных с соответствующим RSS-каналом. |
| rss_maxarticles | Группа Feeds[number] | Максимальное количество отдельных статей, отображаемых из RSS-ленты |
| rss_filter | Группа Feeds[number] | Для функции фильтрации в поле можно ввести один или несколько критериев, разделенных точками с запятой (;). Поиск осуществляется по следующим атрибутам статьи: заголовок, описание, категории. Отображаются только статьи, содержащие один из этих терминов. |

### Шаблон JSON3
С помощью этого виджета можно отображать любые данные в формате JSON по своему усмотрению.
Отображение осуществляется с использованием шаблонного формата, который можно рассматривать как комбинацию HTML-кода + JavaScript + специальных тегов, управляющих отображением атрибутов JSON.
JSON Template3 теперь поддерживает асинхронные вызовы с помощью await. JSON Template 2 будет устаревать в будущем.

| Настройки | описание |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | Этот шаблон можно использовать для определения внешнего вида данных JSON. В шаблоне можно использовать все допустимые HTML-теги (включая атрибуты CSS в тегах стиля). Также существуют специальные теги, внутри которых отображаются данные JSON и могут выполняться инструкции JavaScript. |
| json_oid | Выбор точки данных с соответствующими данными в формате JSON. |

Подробную информацию о системе шаблонов см. в главе «Шаблоны на основе примеров».

Данные в формате JSON передаются в шаблон вместе с префиксом data. Кроме того, текущий widgetID также доступен в виде переменной, что позволяет указывать его в отдельных инструкциях CSS.

#### Расширенный вариант использования
В приведенных выше примерах рассматривался только чистый вывод. Теперь шаблон можно дополнить HTML-тегами для достижения определенного макета. Вот пример:

```html
<h3>Output</h3>
<style>
    .mycssclassproperty {
        color: green;
    }
    .mycssclassdata {
        color: red;
    }
</style>
<% for (var prop in data.oneobject) { %>
<div>
    <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
    <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(В Markdown цвета не отображаются)

#### Варианты использования асинхронных вызовов
**Блок 1:**

Вызов функции sendToAsync с использованием await. В этом примере вызывается тестовая функция в административном адаптере.

**Блок 2:**

Преобразуйте результат в строку и выведите в HTML.

**Блок 3:**

определение функции sendToAsync

```html
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %> <%- JSON.stringify(req) %> <% async function
sendToAsync(instance, command, sendData) { console.log(`sendToAsync ${command} ${sendData}`); return new
Promise((resolve, reject) => { try { vis.conn.sendTo(instance, command, sendData, function (receiveData) {
resolve(receiveData); }); } catch (error) { reject(error); } }); } %>
```

**Результат:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### Пример использования списка задач, поддерживаемого базой данных
##### **Введение**
В этом примере использования описывается, как визуализировать и интерактивно изменять список дел из базы данных MySQL в `ioBroker` с помощью адаптера `>=rssfeed 3.5.0`. Основное внимание уделяется реализации простого изменения статуса по нажатию кнопки. Эта концепция служит **проверкой концепции (PoC)** и может быть включена в будущую документацию.

---

##### **Структура базы данных (MySQL)**
Сначала создаётся база данных MySQL с именем `test`. Она содержит таблицу `test` со следующими полями:

- `id`: Уникальный идентификатор для каждой записи
- `todo`: Заголовок записи в списке дел
- `действие`: Статус записи (0 = в процессе, 1 = завершено)

###### **SQL-код для создания таблицы**
<details><summary>Подробности</summary><pre><code>

```sql

CREATE TABLE `test` (
`id` int(11) NOT NULL,
`todo` varchar(100) NOT NULL,
`action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `test` (`id`, `todo`, `action`) VALUES
(1, 'Todo 1', 0),
(2, 'Todo 2', 1),
(3, 'Todo 3', 1),
(4, 'Todo 4', 0);

ALTER TABLE `test`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `id` (`id`),
ADD KEY `idx` (`id`);

ALTER TABLE `test`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

```

</code></pre>

</details>

---

##### **Интеграция в ioBroker**
###### **SQL-адаптер**
Для взаимодействия с базой данных требуется адаптер `ioBroker.sql`.
Он настроен соответствующим образом для подключения к базе данных MySQL `test`.
Обратите внимание, что `ioBroker` автоматически создает собственные структуры в базе данных для хранения исторических данных.

###### **Адаптер RSSFeed и виджет JSONTemplate**
Для визуализации мы используем виджет `JSONTemplate`.

**Важные примечания:**

- В `vis 2` виджет включен в адаптер `vis-2-widget-ovarious`.
В будущем планируется интегрировать этот виджет в `ioBroker.jsontemplate` после того, как `bluefox` стабилизирует цепочку сборки.

##### **Интеграция в VIS**
Размещаем виджет `JSONTemplate` и заполняем следующие поля:

###### **Код шаблона**
<details><summary>Подробности</summary><pre><code>

```html
<style>
    .btn {
        width: 100%;
    }
</style>
<table>
    <tr>
        <th>ID</th>
        <th>Todo</th>
        <th>Action</th>
    </tr>
    <% let todos = await getTodo(); for (let i = 0; i < todos.length; i++) { let todo = todos[i]; %>
    <tr>
        <td><%- todo.id %></td>
        <td><%- todo.todo %></td>
        <td><%- getButton(todo.id, todo.action) %></td>
    </tr>
    <% } %>
</table>

<script>
    window.jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
    }

    function clicktodo(el) {
        let id = el.dataset.id;
        let action = el.dataset.action;
        let nextAction = action == 0 ? 1 : 0;
        setAction(id, nextAction);
    }

    async function getTodo() {
        let req = await sendToAsync('sql.0', 'query', 'SELECT * FROM test.test');
        return req.result;
    }

    async function setAction(id, action) {
        await sendToAsync('sql.0', 'query', `UPDATE test.test SET action = ${action} WHERE id = ${id}`);
        vis.setValue('local_trigger', Math.random());
    }

    async function sendToAsync(instance, command, sendData) {
        return new Promise((resolve, reject) => {
            try {
                vis.conn.sendTo(instance, command, sendData, receiveData => resolve(receiveData));
            } catch (error) {
                reject(error);
            }
        });
    }
</script>
```

</code></pre>

</details>

###### **Точка данных для обновления контента**
Чтобы обновления отражались после изменения статуса, мы добавляем следующую локальную точку данных:

```text
local_trigger
```

Эту точку данных **не нужно создавать явно**, поскольку точки данных `local_?` обрабатываются внутри VIS (см. документацию `vis`).

##### **Пояснение к коду**
###### **Структура шаблона**
| Строка | Содержание |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | CSS-стили для внешнего вида кнопок |
| 6-11 | Заголовок таблицы со столбцами ID, Todo, Action |
| 12-16 | Получение данных из базы данных MySQL с помощью `getTodo()` |
| 23-28 | Глобальная ссылка на функцию `clicktodo()` |
| 30-37 | `getButton()` функция для создания кнопки с текущим статусом |
| 38-44 | `clicktodo()` функция для изменения статуса по нажатию кнопки |
| 45-48 | `getTodo()` функция для получения данных через SQL-адаптер |
| 49-52 | `setAction()` функция для обновления записи в базе данных |
| 53-58 | `sendToAsync()` функция для использования `async/await` с `vis.conn.sendTo()` |
| 53-58 | Функция `sendToAsync()` для использования `async/await` с `vis.conn.sendTo()` |

## Система шаблонов
## Теги
Система шаблонов работает с определенными тегами.
Используемые теги означают следующее:

| `tag` | описание |
| ----- | ------------------------------------------------------------------- |
| <%= | Содержимое содержащегося выражения/переменной будет экранировано. |
| <%- | Содержимое содержащегося выражения/переменной не экранировано. |
| <% | Нет вывода, используется для вложенных инструкций JavaScript |
| %> | обычно является закрывающим тегом, завершающим один из предыдущих |

Всё, что находится за пределами этих тегов, отображается точно так же, как есть, или, если это HTML, интерпретируется как HTML.
В шаблоне доступны 2 предопределенные переменные.

### Пример объекта
Во всех приведенных ниже примерах используется следующий JSON.

```json
{
    "onearray": ["one", "two"],
    "oneobject": {
        "attribute1": 1,
        "attribute2": 2
    },
    "onenumber": 123,
    "onetext": "onetwothree"
}
```

Атрибуты могут быть выведены следующим образом.

**Шаблон:**

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Результат:**

```text
    123 onetwothree
```

Доступ к массивам осуществляется по индексу. Индекс всегда начинается с 0. Однако существуют и фиктивные массивы, где индекс не начинается с 0 или даже состоит из текста. В этом случае применяются правила, действующие для объектов. В приведенном выше примере это будет выглядеть так:

**Шаблон:**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**Результат:**

```text
    one two
```

Если вы попытаетесь вывести массив напрямую, без указания индекса, шаблон выведет все элементы, разделенные запятыми.

**Шаблон:**

```html
<%- data.onearray %>
```

**Результат:**

```text
    one,two
```

Массивы также могут состоять из набора объектов. В приведенном здесь примере используется только простой массив. Пример массивов с объектами будет приведен позже.

**Шаблон:**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**Результат:**

```text
    one two
```

**Объекты** могут содержать отдельные атрибуты, массивы или снова объекты. Это означает, что данные JSON могут быть вложены на любую глубину.

Атрибуты объекта можно указывать с помощью точечной или скобочной нотации. Точечная нотация работает только в том случае, если атрибут соответствует определенным правилам именования (первый символ должен быть буквой, остальные – цифрами, буквами или подчеркиванием).
Скобочная нотация также работает для атрибутов, не соответствующих правилам именования.

**Точечная нотация:**

**Шаблон:**

```html
<%- data.oneobject.attribute1 %>
```

**Обозначение в скобках:**

**Шаблон:**

```html
<%- data.oneobject["attribute1"] %>
```

**Результат для обоих примеров:**

```text
    1
```

Прохождение цикла по атрибутам объекта

**Шаблон:**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**Результат:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Доступные переменные в шаблонах
### `rss.meta`
Здесь содержится вся метаинформация о ленте. Доступен следующий контент. Думаю, идентификаторы понятны сами собой. В справке я опишу их подробнее. Или укажите контент (некоторые из них представляют собой массивы). Полный набор метаинформации доступен только в виджете RSS Feed 2.

Использование шаблона см. в разделе **Шаблон на основе примера**.

- `meta.title`
- `meta.description`
- `meta.link`
- `meta.xmlurl`
- `meta.date`
- `meta.pubdate`
- `meta.author`
- `meta.language`
- `meta.image`
- `meta.favicon`
- `meta.copyright`
- `meta.generator`
- `meta.categories`

### `rss.articles or articles`
Это массив с отдельными элементами (массив JavaScript). Каждый элемент имеет следующие свойства.
Чтобы он соответствовал, например, я добавлю перед ним префикс item. Но при желании вы можете выбрать его самостоятельно. Нужно лишь правильно назвать его в цикле (forEach). Здесь идентификаторы тоже понятны сами собой. Не все атрибуты заполняются в каждом ленте. Наиболее важные уже включены в шаблон выше.

Статьи доступны в виде rss.articles в виджете RSS-ленты 2 и в виде статей в многофункциональном виджете RSS-ленты 3.

Использование шаблона см. в разделе **Шаблон на основе примера**.

- `item.title`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `item.author`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `item.source`
- `item.enclosures`

## Шаблон создан на основе примеров
### Базовый шаблон виджета RSS-ленты 2
В настоящее время в виджете RSS-ленты 2 в качестве стандартного используется следующий шаблон.
Он был протестирован со следующими лентами.

- <http://www.tagesschau.de/xml/rss2> или
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<p><%- rss.meta.title %></p>
<% rss.articles.forEach(function(item){ %>
<div class="article">
    <p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
    <h3><%- item.title %></h3>
    <p><%- item.description %></p>
    <div style="clear:both;"></div>
</div>
<% }); %>
```

### Базовый шаблон RSS-ленты, многофункциональный виджет 3
В настоящее время в виджете RSS-ленты Multi Widget 3 используется следующий шаблон в качестве стандартного.
Обратите внимание на небольшие различия в использовании переменных. Он был протестирован со следующими лентами.

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    articles      ->  all articles as array, details see Article Helper widget
                      only subset of meta information of the feed is available as
                      articles[0].meta_name
                      articles[0].meta_title
                      articles[0].meta_description
    style         ->  all style settings for the widget
    dp[]          ->  array of addition configured datapoints

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<% rss.articles.forEach(function(item){ %>
<p><%- item.meta_name || item.meta_title || '' %></p>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

### Пример шаблона для многофункционального виджета RSS-ленты (3 уровня) со статьями в режиме слайд-шоу и кнопками «Предыдущая/Следующая».
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }

    .container {
        overflow: hidden;
        height: 100%;
    }
    .content {
        position: relative;
        border: 1px solid #ccc;
        overflow: scroll;
        height: 90%;
    }

    .slide {
        position: absolute;
        display: none;
    }

    .slide.active {
        display: contents;
    }

    .controls {
        margin-top: 10px;
    }
</style>

<div class="container">
    <div class="content">
        <% rss.articles.forEach(function(item){ %>
        <div class="article slide">
            <p>
                <small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small>
            </p>
            <h3><%- item.title %></h3>
            <p><%- item.description %></p>
            <div style="clear:both;"></div>
        </div>
        <% }); %>
    </div>
    <div class="controls">
        <button onclick="prevSlide()">Zurück</button>
        <button onclick="nextSlide()">Weiter</button>
    </div>
</div>

<script>
    currentSlide = 0;
    slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }
    showSlide(currentSlide);
</script>
```

### Пример шаблона и подробное описание
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Краткое описание того, что происходит в отдельных строках: Z1: Вывод заголовка ленты. Z2: Без вывода. Команда JavaScript для перебора всех статей, при каждом обороте текущий элемент присваивается переменной item.
Z3: Вывод даты и времени. Он заключен в тег <p> для форматирования. Для форматирования используется функция форматирования даты vis-own. Описание можно найти в адаптере vis.

Z4: Вывод заголовка статьи. Для форматирования используется тег <Header>.

Z5: Вывод содержимого статьи. Он заключен в тег <p>. Здесь, по крайней мере в двух примерах, включен HTML-код, который обычно сопровождает изображение и описательный текст. Z6: Вывод тега div, который очищает специальное форматирование в HTML-коде ленты (в обоих примерах для tagesschau и bild это необходимо. В других лентах это может не потребоваться).
Z7: Без вывода. Эта строка замыкает цикл JavaScript. Все, что было определено между Z2 и Z7, повторяется для каждой статьи.

## Todo
- Удалите неиспользуемые записи в параметре info.lastRequest точки данных, сохранив их в диалоговом окне администратора.
- кнопка для очистки неиспользуемых точек данных в диалоговом окне администратора
- ~~Многовиджетные RSS-каналы~~
- ~~Многовиджетная бегущая строка~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Виджет для Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-03-26)

- Update packages
- fix repochecker

### 4.0.2 (2026-03-07)

- fix repochecker

### 4.0.1 (2026-03-07)

- fix repochecker

### 4.0.0 (2026-03-05)

- update packages
- remove deprecated widgets

### 3.6.1 (2025-09-22)

- remove dist/ folder from lint

### 3.6.0 (2025-09-22)

- revert to node 18
- remove deprecated marquee4 widget
- improve widget build
- integrate translations and css into build process
- remove unused css
- deprecate JSON-Template widgets, please use new adapter iobroker.vis-jsontemplate
- add message for the update to inform users

### 3.5.2 (2025-03-20)

- improve build

### 3.5.1 (2025-03-20)

- improve build

### 3.5.0 (2025-03-18)

- make async function calls available in templates

### 3.4.1 (2025-02-18)

- fix eslint
- introducing a new attribute opentype to open the links in the marquee widget

### 3.3.1 (2025-01-23)

- add an accept request header, because axios send only application/json

### 3.3.0 (2025-01-21)

- upgrade version js-controller
- switch from request to axios

### 3.2.0 (2024-11-27)

- update jsonconfig responsive
- switch to iobroker/eslint
- improver adapter code
- improve widget code

### 3.1.0 (2024-08-11)

- adjust dependency to js-controller in a minor release

### 3.0.2 (2024-08-09)

- add keyword in package.json

### 3.0.1 (2024-08-09)

- add template example for articles as a Diashow
- adjust dependency to js-controller

### 3.0.0 (2024-07-24)

- update multifeed widget 3 and deprecate multifeed widget 2
- breaking change: in rssfeed widget 2: articles and meta have to be changed to rss.articles and rss.meta

### 2.10.0 (2024-07-11)

- fine tuning on templates and available variables
- fine tuning on format and translation
- move widget documentation form doc.html to readme

### 2.9.10 (2024-07-11)

- update images for dark and light theme

### 2.9.9 (2024-07-11)

- update packages
- update formating and improve error logging
- remove detailed sentry status reporting
- fix subscribing states

### 2.9.8 (2024-07-09)

- ignore widgets in vis-2
- add restart vis/vis2

### 2.9.7 (2024-06-22)

- formating code
- remove common.main from io-package.json

### 2.9.6 (2024-06-06)

- fix branch name in link

### 2.9.4 (2024-06-05)

- test release after rename branch from master to main

### 2.9.3 (2024-06-05)

- switch branchname from master to main
- add node 22 to tests

### 2.9.2 (2024-06-04)

- add some translations
- fix warning from adapter checker

### 2.9.1 (2024-06-03)

- update iobroker files and settings

### 2.8.2 (2024-04-21)

- (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

- (bluefox) Corrected vis widget
- admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

- added more information to sentry

### 2.6.0 (2022-07-26)

- added sentry

### 2.4.0 (2022-07-25)

- added name option to marquee widget

### 2.0.0

- Rework of the admin dialog
- Fix some errors and glitches

### 1.0.0

- Released in stable

### 0.9.0

- fixed/extended json template

### 0.8.0

- adapted configuration pages to react.
- Prepared for stable release

### 0.0.30

- added some template examples to the widget documentation

### 0.0.29

- improved error messages
- removed deprecated widget / change widget beta flag
- changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

- removed customtab

### 0.0.27

- adapter configuration is now editable

### 0.0.26

- corrected changelog size

### 0.0.25

- the error messages for the template are improved

### 0.0.24

- errors in the request of feeds are now real errors in the iobroker log
- loading of rules for ejs in the editor is improved
- marquee3 widget: options to show time and date

### 0.0.23

- republish to npm

### 0.0.22

- improvements in the configuration dialog
- remove unused admintab
- new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
- New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
- the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
- Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

- add link option to marquee widget
- widget help added
- marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

- add ejs syntax to template editor

### 0.0.19

- try to fix marquee widget.

### 0.0.18

- try to fix the wrong NoSave dialog

### 0.0.17

- rework setting objects and states

### 0.0.16

- improve logic adding rssfeed in configuration dialog
- fix wrong icon for marquee widget
- define default template for rssfeed widget
- deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
- widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

- fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

- update package.json and install new tools for stream encoding/decoding detection
- implement encoding detection and stream encoding
- change the ejs lib with a real browserified lib

### 0.0.13

- new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

- now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

- improve admin layout
- implement a forceRefresh button

### 0.0.10

- fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

- apply widget styles also to the inner span element, because they had not any effect on the marquee.
- renew the package-lock.json
- add categories to save feeds in subfolders
- improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

- improve lasrequest logic of the adapter
- fix problem with datapoint naming

### 0.0.7

- test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

- add attribute duration for widget marquee to control animation duration

### 0.0.5

- new widget marquee for article titles
- add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

- some adjustments in readme, io-package

### 0.0.3

- add addveyor build

### 0.0.2

- added widgets meta helper and article helper

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

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