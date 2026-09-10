---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
---
#### Use case for a database-independent public transport widget

![Widget](img/public-transport-renderresult.png)

##### **Introduction**

This use case describes how to visualize real-time public transport
journey data from the ioBroker.public-transport adapter
in `ioBroker` using a fully customizable `JSONTemplate` widget.

The focus is on creating a **lightweight, flexible, and VIS/VIS-2-compatible**
widget that displays connections, delays, and platform changes without relying
on the built-in adapter widgets.

This concept serves as a **Proof of Concept (PoC)** for highly dynamic
frontend rendering based on adapter JSON data.

<https://forum.iobroker.net/topic/84201/test-adapter-public-transport-v0.1.x-github-npm/4?_=1776781580235>

---

##### **Data Source (ioBroker.public-transport)**

The adapter provides real-time journey data via JSON datapoints.

Relevant structure:

- `public-transport.0.Journeys.<id>.json`

This JSON includes:

- `journeys[]`: list of connections
- `legs[]`: segments of a journey
- departure/arrival times (planned & real)
- delay information (in seconds)
- platform data
- warnings and remarks

The widget directly processes this JSON without intermediate storage.

---

##### **Integration into ioBroker**

###### **Adapter Setup**

The ioBroker.public-transport adapter is configured with:

- Service type: `Vendo` (fast DB data retrieval)
- Defined journeys (From → To)
- Polling interval (e.g. 2–5 minutes)

After configuration, a JSON datapoint is available, e.g.:

```text
public-transport.0.Journeys.journey_0.json
```

---

###### **JSONTemplate Widget**

Instead of using the default adapter widget, the
`vis-jsontemplate` adapter is used for rendering.

Advantages:

- fully customizable layout
- compatible with `vis/vis-2`
- lightweight and fast

---

##### **Integration into VIS**

We place a `JSONTemplate` widget and configure:

- **Data point:**

    ```text
    public-transport.0.Journeys.journey_0.json
    ```

![Settings](img/public-transport-vis-setting.png)

- **Template:**

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

##### **Data Point Binding**

The widget automatically reacts to updates of the JSON datapoint:

```text
public-transport.0.Journeys.journey_0.json
```

No additional trigger datapoint is required, as `VIS/VIS-2` handles updates
based on state changes.

---

##### **Code Explanation**

###### **Template Structure**

| Line Range | Content                                                         |
| ---------- | --------------------------------------------------------------- |
| 1–10       | Validation of JSON structure and helper function `formatTime()` |
| 11–20      | Extraction of route title (origin → destination)                |
| 21–30      | Header and table structure                                      |
| 31–70      | Iteration over `journeys[]` and extraction of `legs[0]`         |
| 40–55      | Delay calculation and detection                                 |
| 56–65      | Platform comparison and change detection                        |
| 66–80      | Warning aggregation from `remarks[]`                            |
| 81–120     | Rendering of rows with conditional formatting                   |
| 90–110     | Visual highlighting of delays (red, strikethrough)              |
| 111–120    | Display of warnings and platform changes                        |
| Final      | Fallback UI if no data is available                             |