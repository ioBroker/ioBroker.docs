---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md
title: без названия
hash: pHC8wHMrvjFlZUIjZnHa7JXJwnin/xVJ3dD9C1taQS0=
---
#### Пример использования виджета сегментированного индикатора.

В этом примере создается полукруглый индикатор. Индикатор отображает одно значение из точки данных ioBroker и преобразует это значение в процентное значение на основе настраиваемых минимального и максимального значений. Цветовой градиент отображается с использованием множества небольших сегментов SVG вместо обычного линейного градиента SVG. Это позволяет градиенту правильно следовать дуге.

**Пример виджета:**

![Пример](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/simplegauge.png)

**Настройка виджета в VIS 2:**

![Пример](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/vis2properties.png)

После размещения JSON-виджета необходимо добавить точку данных, которая должна предоставлять значение. Пожалуйста, введите точку данных ниже.`Datapoints[1]` как показано на изображении, а не в первом поле данных под`Common` .

Затем откройте редактор шаблонов, нажав на значок карандаша рядом с ним.`Template` и вставьте следующий шаблон EJS.

Шаблон можно настроить в начале кода.

**Параметры конфигурации:**

- `dpId` должен содержать тот же идентификатор точки данных, который был добавлен ниже.`Datapoints[1]` .
- `minValue` и`maxValue` Определите диапазон значений, который соответствует 0% и 100%.

Пример:

```text
minValue = 0
maxValue = 500
```

Это означает:

```text
0   => 0%
250 => 50%
500 => 100%
```

Если в данных уже указано процентное значение, просто используйте:

```text
minValue = 0
maxValue = 100
```

- `barWidth` Определяет толщину измерительной шкалы. Если установлено значение...`0` Если же ширина полосы не задана, она рассчитывается автоматически.
- `startColor` и`endColor` Определить цветовой градиент видимой шкалы индикатора.
- `segments` Определяет, сколько сегментов SVG используется для отрисовки градиента. Более высокое значение создает более плавный градиент, но также увеличивает количество генерируемых элементов SVG/HTML. Обычно значение по умолчанию менять не нужно.
- `backgroundColor` Определяет цвет той части индикатора, которая не заполнена.

Заголовок и текст значения намеренно не отображаются в этом шаблоне. Их можно добавить отдельно, используя обычные виджеты VIS над или под индикатором. Это делает позиционирование, группировку и форматирование более гибкими. При необходимости отображение метки и значения можно добавить позже.

**Шаблон:**

```ejs
<%
/* ========= Configuration ========= */

const dpId = "0_userdata.0.val1";

const minValue = 0;
const maxValue = 500;

/*
Bar width
0 or undefined => automatic calculation
*/
const barWidth = 20;

/*
Gradient colors
*/
const startColor = "#ff0000";
const endColor = "#00ff00";

/*
Background arc
*/
const backgroundColor = "#d7d7d7";

/*
Number of color segments
Higher value = smoother gradient
*/
const segments = 80;

//***************************
// End of configuration
//***************************

/* ========= Widget size from VIS ========= */

const widgetWidth = parseInt(style.width) || 300;
const widgetHeight = parseInt(style.height) || 180;

/* ========= Helper functions ========= */

function clamp(v, min, max) {
   v = Number(v);
   if (isNaN(v)) return min;
   return Math.max(min, Math.min(max, v));
}

function hexToRgb(hex) {
   hex = String(hex).replace("#", "");

   if (hex.length === 3) {
       hex = hex.split("").map(c => c + c).join("");
   }

   return {
       r: parseInt(hex.substring(0, 2), 16),
       g: parseInt(hex.substring(2, 4), 16),
       b: parseInt(hex.substring(4, 6), 16)
   };
}

function rgbToHex(r, g, b) {
   return "#" +
       [r, g, b]
           .map(v => {
               const s = Math.round(v).toString(16);
               return s.length === 1 ? "0" + s : s;
           })
           .join("");
}

function mixColor(c1, c2, t) {
   return rgbToHex(
       c1.r + (c2.r - c1.r) * t,
       c1.g + (c2.g - c1.g) * t,
       c1.b + (c2.b - c1.b) * t
   );
}

/* ========= Bar width ========= */

const stroke =
   barWidth && barWidth > 0
       ? Number(barWidth)
       : Math.max(8, Math.round(Math.min(widgetWidth, widgetHeight) * 0.13));

/* ========= Gauge geometry ========= */

const cx = widgetWidth / 2;
const cy = widgetHeight - stroke / 2;

const radius = Math.max(
   1,
   Math.min(
       widgetWidth / 2 - stroke / 2,
       widgetHeight - stroke / 2
   )
);

/* ========= Datapoint ========= */

const rawValue = Number(dp[dpId]?.val ?? dp[dpId] ?? 0);

const normalizedValue =
   ((rawValue - minValue) / (maxValue - minValue)) * 100;

const value = clamp(normalizedValue, 0, 100);

/* ========= Segment calculation ========= */

const startRgb = hexToRgb(startColor);
const endRgb = hexToRgb(endColor);

const visibleSegments = Math.round(segments * value / 100);

function pointOnArc(t) {
   /*
   t = 0 left, t = 1 right
   Angle runs from 180° to 0°
   */
   const angle = Math.PI - t * Math.PI;

   return {
       x: cx + radius * Math.cos(angle),
       y: cy - radius * Math.sin(angle)
   };
}
%>

<style>
   .jt-gauge-<%- widgetid %> {
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       overflow: hidden;
       box-sizing: border-box;
   }

   .jt-gauge-svg-<%- widgetid %> {
       width: 100%;
       height: 100%;
       display: block;
       overflow: hidden;
   }

   .jt-gauge-bg-<%- widgetid %>,
   .jt-gauge-segment-<%- widgetid %> {
       fill: none;
       stroke-width: <%- stroke %>;
       stroke-linecap: butt;
   }

   .jt-gauge-bg-<%- widgetid %> {
       stroke: <%- backgroundColor %>;
   }
</style>

<div class="jt-gauge-<%- widgetid %>">
   <svg
       class="jt-gauge-svg-<%- widgetid %>"
       viewBox="0 0 <%- widgetWidth %> <%- widgetHeight %>"
       preserveAspectRatio="xMidYMid meet"
   >

       <!-- Background arc -->
       <path
           class="jt-gauge-bg-<%- widgetid %>"
           d="
               M <%- pointOnArc(0).x %> <%- pointOnArc(0).y %>
               A <%- radius %> <%- radius %> 0 0 1
               <%- pointOnArc(1).x %> <%- pointOnArc(1).y %>
           "
       />

       <!-- Color segments -->
       <% for (let i = 0; i < visibleSegments; i++) {
           const t1 = i / segments;
           const t2 = (i + 1) / segments;
           const p1 = pointOnArc(t1);
           const p2 = pointOnArc(t2);
           const color = mixColor(startRgb, endRgb, t1);
       %>
           <path
               class="jt-gauge-segment-<%- widgetid %>"
               d="
                   M <%- p1.x %> <%- p1.y %>
                   A <%- radius %> <%- radius %> 0 0 1
                   <%- p2.x %> <%- p2.y %>
               "
               stroke="<%- color %>"
           />
       <% } %>

   </svg>
</div>
```