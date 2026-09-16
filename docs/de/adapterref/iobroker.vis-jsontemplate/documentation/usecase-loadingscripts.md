---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md
title: kein Titel
hash: djjzzNO3rmyzoEXz6RZporvmeXJocd8zwkhW1F4Sf68=
---
#### Anwendungsfall für das Laden zusätzlicher Skripte

Zusätzliche Felder ermöglichen das Laden von JavaScript-Bibliotheken (z. B. von CDNs wie jsDelivr oder cdnjs). Das folgende Beispiel veranschaulicht dies am Beispiel der ChartJS-Bibliothek.

**Schritt 1:**

Erstellen Sie einen neuen Datenpunkt vom Typ String oder JSON mit dem Namen`0_userdata.0.chartData` und der folgende Inhalt

```json
[12, 19, 3, 5, 2, 3]
```

**Schritt 2:**

Geben Sie die folgende URL in das Feld json\_script\[1] ein:

```text
https://cdn.jsdelivr.net/npm/chart.js
```

**Schritt 3:**

Geben Sie den Namen des erstellten Datenpunkts in das Feld „JSON-Datenpunkt“ ein. Geben Sie die folgende Vorlage in das Feld „JSON-Vorlage“ ein.

Bis auf eine Zeile handelt es sich um Standard-HTML + JavaScript.

```html
data: <%- JSON.stringify(data) %>,
```

Die vom Datenpunkt gelesenen Daten sind in der JavaScript-Variablen verfügbar.`data` und wird innerhalb der Template-Anweisungen <%- ... %> ausgegeben. Sobald das Template kompiliert und in das HTML-Dokument eingebunden ist, wird es vom Browser ausgeführt, sodass das Diagramm über JavaScript angezeigt wird.

```ejs
<div>
  <canvas id="myChart"></canvas>
</div>

<script>
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: <%- JSON.stringify(data) %>,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
</script>
```

![Beispiel](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/example_extscripts.png)