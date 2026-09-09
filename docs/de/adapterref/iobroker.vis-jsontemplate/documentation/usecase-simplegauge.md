---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md
title: kein Titel
hash: pHC8wHMrvjFlZUIjZnHa7JXJwnin/xVJ3dD9C1taQS0=
---
#### Anwendungsfall für ein segmentiertes Messinstrument-Widget

Dieses Beispiel erzeugt ein halbkreisförmiges Messinstrument. Das Messinstrument zeigt einen Wert aus einem ioBroker-Datenpunkt an und ordnet diesen Wert einem Prozentsatz zu, basierend auf einem konfigurierbaren Minimal- und Maximalwert. Der Farbverlauf wird mithilfe vieler kleiner SVG-Segmente anstelle eines herkömmlichen linearen SVG-Verlaufs gerendert. Dadurch folgt der Verlauf dem Bogen korrekt.

**Beispiel-Widget:**

![Beispiel](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/simplegauge.png)

**Widget-Konfiguration in VIS 2:**

![Beispiel](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/vis2properties.png)

Nach dem Platzieren des JSON-Widgets muss der Datenpunkt hinzugefügt werden, der den Wert liefern soll. Bitte geben Sie den Datenpunkt unter folgendem Pfad ein:`Datapoints[1]` , wie im Bild dargestellt, nicht im ersten Datenpunktfeld unter`Common` Die

Öffnen Sie anschließend den Vorlageneditor, indem Sie auf das Stiftsymbol neben klicken.`Template` und fügen Sie die folgende EJS-Vorlage ein.

Die Vorlage kann am Anfang des Codes konfiguriert werden.

**Konfigurationsoptionen:**

- `dpId` muss dieselbe Datenpunkt-ID enthalten, die unter hinzugefügt wurde`Datapoints[1]` Die
- `minValue` Und`maxValue` Definiere den Wertebereich, der 0 % und 100 % zugeordnet ist.

Beispiel:

```text
minValue = 0
maxValue = 500
```

Das heisst:

```text
0   => 0%
250 => 50%
500 => 100%
```

Wenn der Datenpunkt bereits einen Prozentwert liefert, verwenden Sie einfach:

```text
minValue = 0
maxValue = 100
```

- `barWidth` Definiert die Dicke des Messstabs. Wenn dieser Wert auf`0` Wird die Balkenbreite nicht angegeben, wird sie automatisch berechnet.
- `startColor` Und`endColor` Definiere den Farbverlauf des sichtbaren Messbalkens.
- `segments` Legt fest, wie viele SVG-Segmente zur Darstellung des Farbverlaufs verwendet werden. Ein höherer Wert erzeugt einen weicheren Farbverlauf, erhöht aber auch die Anzahl der generierten SVG-/HTML-Elemente. Normalerweise muss der Standardwert nicht geändert werden.
- `backgroundColor` Definiert die Farbe des nicht gefüllten Teils des Messgeräts.

Titel und Werttext werden in dieser Vorlage absichtlich nicht angezeigt. Sie können separat mithilfe normaler VIS-Widgets ober- oder unterhalb des Messgeräts hinzugefügt werden. Dies ermöglicht eine flexiblere Positionierung, Gruppierung und Formatierung. Bei Bedarf können Beschriftung und Wert später hinzugefügt werden.

**Vorlage:**

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