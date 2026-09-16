---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md
title: без названия
hash: 48bjeGxqSO/hJPbwGyx52Y8wXRnh9BY1q/cm5bNJ4+k=
---
#### Пример использования виджета для общественного транспорта, не зависящего от базы данных.

![Виджет](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/public-transport-renderresult.png)

##### **Введение**

В этом примере описывается, как визуализировать данные о поездках на общественном транспорте в режиме реального времени из адаптера ioBroker.public-transport.`ioBroker` используя полностью настраиваемый`JSONTemplate` виджет.

Основная задача — создание **легковесного, гибкого и совместимого с VIS/VIS-2** виджета, отображающего соединения, задержки и изменения платформы без использования встроенных виджетов адаптера.

Данная концепция служит в качестве **подтверждения работоспособности (Proof of Concept, PoC)** высокодинамичного рендеринга интерфейса на основе JSON-данных адаптера.

<https://forum.iobroker.net/topic/84201/test-adapter-public-transport-v0.1.x-github-npm/4?_=1776781580235>

---

##### **Источник данных (ioBroker.public-transport)**

Адаптер предоставляет данные о поездках в режиме реального времени в формате JSON.

Соответствующая структура:

- `public-transport.0.Journeys.<id>.json`

Этот JSON включает в себя:

- `journeys[]` : список соединений
- `legs[]` : сегменты путешествия
- Время отправления/прибытия (плановое и фактическое)
- Задержка информации (в секундах)
- данные платформы
- предупреждения и замечания

Виджет обрабатывает этот JSON напрямую, без промежуточного хранения.

---

##### **Интеграция в ioBroker**

###### **Настройка адаптера**

Адаптер ioBroker.public-transport настроен следующим образом:

- Тип услуги:`Vendo` (быстрое извлечение данных из базы данных)
- Определенные маршруты (От → До)
- Интервал опроса (например, 2–5 минут)

После настройки становится доступен JSON-объект данных, например:

```text
public-transport.0.Journeys.journey_0.json
```

---

###### **JSONTemplate Widget**

Вместо использования виджета адаптера по умолчанию,`vis-jsontemplate` Адаптер используется для рендеринга.

Преимущества:

- полностью настраиваемый макет
- совместимо с`vis/vis-2`
- легкий и быстрый

---

##### **Интеграция в VIS**

Мы размещаем`JSONTemplate` виджет и настройте его:

- **Точка данных:**

  ```text
  public-transport.0.Journeys.journey_0.json
  ```

![Настройки](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/public-transport-vis-setting.png)

- **Шаблон:**

<details>
  <summary>Details</summary>
  <pre><code>

```html
<% if (typeof data !== 'undefined' && data && data.journeys && Array.isArray(data.journeys)) { function
formatTime(isoString) { if (!isoString) return "--:--"; var date = new Date(isoString); var h =
date.getHours().toString(); var m = date.getMinutes().toString(); return (h.length < 2 ? '0' + h : h) + ":" + (m.length
< 2 ? '0' + m : m); } var firstJourney = data.journeys[0]; var stationTitle = "Verbindung"; if (firstJourney &&
firstJourney.legs && firstJourney.legs[0]) { var l0 = firstJourney.legs[0]; if (l0.origin && l0.destination) {
stationTitle = l0.origin.name + " → " + l0.destination.name; } } %>
<div style="color: white; font-family: RobotoCondensed-Bold; padding: 5px;">
    <div style="font-size: 0.9em; color: #aaaaaa; margin-bottom: 6px;"><%= stationTitle %></div>

    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
            <tr style="text-align: left; border-bottom: 1px solid #444; color: #888; font-size: 0.72em;">
                <th>Linie</th>
                <th>Abfahrt</th>
                <th>Ankunft</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            <% for (var i = 0; i < data.journeys.length; i++) { var journey = data.journeys[i]; var leg = (journey.legs
            && journey.legs[0]) ? journey.legs[0] : null; if (!leg) continue; var depDelay =
            Math.round((leg.departureDelay || 0) / 60); var arrDelay = Math.round((leg.arrivalDelay || 0) / 60); var
            hasDepDelay = depDelay > 0; var hasArrDelay = arrDelay > 0; var lineName = (leg.line && leg.line.name) ?
            leg.line.name : "?"; var depPlat = leg.departurePlatform ? "Gl. " + leg.departurePlatform : ""; var
            plannedDepPlat = leg.plannedDeparturePlatform || ""; var platChanged = depPlat && plannedDepPlat &&
            leg.departurePlatform !== plannedDepPlat; var warnings = []; if (leg.remarks && leg.remarks.length > 0) {
            for (var j = 0; j < leg.remarks.length; j++) { if (leg.remarks[j].type === "warning") {
            warnings.push(leg.remarks[j].summary || leg.remarks[j].text); } } } if (platChanged) { warnings.unshift("Gl.
            " + leg.departurePlatform + " (statt " + plannedDepPlat + ")"); } var warningText = warnings.join(" · ");
            var rowBg = (hasDepDelay || hasArrDelay) ? "background-color: rgba(255,60,60,0.07);" : ""; %>
            <tr style="<%= rowBg %>">
                <td>
                    <div style="background:#1a6bbf;color:white;padding:2px 7px;border-radius:4px;"><%= lineName %></div>
                    <div style="font-size:0.7em;color:#888;"><%= depPlat %></div>
                </td>

                <td>
                    <% if (hasDepDelay) { %>
                    <div style="text-decoration:line-through;color:#ff4444;">
                        <%= formatTime(leg.plannedDeparture) %>
                    </div>
                    <div style="color:#ff4444;font-weight:bold;"><%= formatTime(leg.departure) %> +<%= depDelay %></div>
                    <% } else { %>
                    <div><%= formatTime(leg.plannedDeparture) %> ✓</div>
                    <% } %>
                </td>

                <td>
                    <% if (hasArrDelay) { %>
                    <div style="text-decoration:line-through;color:#ff4444;"><%= formatTime(leg.plannedArrival) %></div>
                    <div style="color:#ff4444;font-weight:bold;"><%= formatTime(leg.arrival) %> +<%= arrDelay %></div>
                    <% } else { %>
                    <div><%= formatTime(leg.plannedArrival) %> ✓</div>
                    <% } %>
                </td>

                <td style="font-size:0.7em;color:#ffcc00;"><%= warningText %></td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>
<% } else { %>
<div>⏳ Warte auf Daten...</div>
<% } %>
```

</code></pre>

</details>

---

##### **Привязка точек данных**

Виджет автоматически реагирует на обновления данных в формате JSON:

```text
public-transport.0.Journeys.journey_0.json
```

Дополнительные точки данных для запуска процесса не требуются, поскольку`VIS/VIS-2` Обрабатывает обновления на основе изменений состояния.

---

##### **Пояснение к коду**

###### **Структура шаблона**

| Диапазон линий | Содержание                                                                            |
| -------------- | ------------------------------------------------------------------------------------- |
| 1–10           | Проверка структуры JSON и вспомогательной функции.`formatTime()`                      |
| 11–20          | Извлечение названия маршрута (пункт отправления → пункт назначения)                   |
| 21–30          | Структура заголовка и таблицы                                                         |
| 31–70          | Итерация завершена`journeys[]` и извлечение`legs[0]`                                  |
| 40–55          | Расчет и обнаружение задержки                                                         |
| 56–65          | Сравнение платформ и обнаружение изменений                                            |
| 66–80          | Сводка предупреждений от`remarks[]`                                                   |
| 81–120         | Отображение строк с условным форматированием.                                         |
| 90–110         | Визуальное выделение задержек (красным, зачеркнутым)                                  |
| 111–120        | Отображение предупреждений и изменений платформы.                                     |
| Финал          | В случае отсутствия данных будет использоваться резервный пользовательский интерфейс. |