---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md
title: kein Titel
hash: 48bjeGxqSO/hJPbwGyx52Y8wXRnh9BY1q/cm5bNJ4+k=
---
#### Anwendungsfall für ein datenbankunabhängiges Widget für den öffentlichen Nahverkehr

![Widget](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/public-transport-renderresult.png)

##### **Einführung**

Dieser Anwendungsfall beschreibt, wie man Echtzeit-Fahrtdaten des öffentlichen Nahverkehrs aus dem ioBroker.public-transport-Adapter visualisiert.`ioBroker` mit einem vollständig anpassbaren`JSONTemplate` Widget.

Im Fokus steht die Entwicklung eines **leichtgewichtigen, flexiblen und VIS/VIS-2-kompatiblen** Widgets, das Verbindungen, Verzögerungen und Plattformänderungen anzeigt, ohne auf die integrierten Adapter-Widgets angewiesen zu sein.

Dieses Konzept dient als **Machbarkeitsnachweis (Proof of Concept, PoC)** für ein hochdynamisches Frontend-Rendering auf Basis von Adapter-JSON-Daten.

<https://forum.iobroker.net/topic/84201/test-adapter-public-transport-v0.1.x-github-npm/4?_=1776781580235>

---

##### **Datenquelle (ioBroker.public-transport)**

Der Adapter liefert Echtzeit-Reisedaten über JSON-Datenpunkte.

Relevante Struktur:

- `public-transport.0.Journeys.<id>.json`

Dieses JSON enthält:

- `journeys[]` : Liste der Verbindungen
- `legs[]` Abschnitte einer Reise
- Abfahrts-/Ankunftszeiten (geplant & tatsächlich)
- Verzögerungsinformationen (in Sekunden)
- Plattformdaten
- Warnungen und Anmerkungen

Das Widget verarbeitet dieses JSON direkt ohne Zwischenspeicherung.

---

##### **Integration in ioBroker**

###### **Adapter-Setup**

Der ioBroker.public-transport-Adapter ist wie folgt konfiguriert:

- Serviceart:`Vendo` (schneller Datenbankabruf)
- Vordefinierte Reisen (Von → Nach)
- Abstimmungsintervall (z. B. 2–5 Minuten)

Nach der Konfiguration steht ein JSON-Datenpunkt zur Verfügung, z. B.:

```text
public-transport.0.Journeys.journey_0.json
```

---

###### **JSONTemplate-Widget**

Anstatt das Standard-Adapter-Widget zu verwenden,`vis-jsontemplate` Der Adapter wird für die Darstellung verwendet.

Vorteile:

- vollständig anpassbares Layout
- kompatibel mit`vis/vis-2`
- leicht und schnell

---

##### **Integration in VIS**

Wir platzieren einen`JSONTemplate` Widget und Konfiguration:

- **Datenpunkt:**

  ```text
  public-transport.0.Journeys.journey_0.json
  ```

![Einstellungen](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/public-transport-vis-setting.png)

- **Vorlage:**

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

##### **Datenpunktbindung**

Das Widget reagiert automatisch auf Aktualisierungen des JSON-Datenpunkts:

```text
public-transport.0.Journeys.journey_0.json
```

Es ist kein zusätzlicher Trigger-Datenpunkt erforderlich, da`VIS/VIS-2` Verarbeitet Aktualisierungen basierend auf Zustandsänderungen.

---

##### **Code-Erklärung**

###### **Vorlagenstruktur**

| Linienbereich | Inhalt                                                         |
| ------------- | -------------------------------------------------------------- |
| 1–10          | Validierung der JSON-Struktur und Hilfsfunktion`formatTime()`  |
| 11–20         | Extraktion des Routentitels (Ursprung → Ziel)                  |
| 21–30         | Kopfzeilen- und Tabellenstruktur                               |
| 31–70         | Iteration über`journeys[]` und Extraktion von`legs[0]`         |
| 40–55         | Verzögerungsberechnung und -erkennung                          |
| 56–65         | Plattformvergleich und Änderungserkennung                      |
| 66–80         | Warnungsaggregation von`remarks[]`                             |
| 81–120        | Darstellung von Zeilen mit bedingter Formatierung              |
| 90–110        | Visuelle Hervorhebung von Verzögerungen (rot, durchgestrichen) |
| 111–120       | Anzeige von Warnungen und Plattformänderungen                  |
| Finale        | Ausweich-Benutzeroberfläche, falls keine Daten verfügbar sind  |