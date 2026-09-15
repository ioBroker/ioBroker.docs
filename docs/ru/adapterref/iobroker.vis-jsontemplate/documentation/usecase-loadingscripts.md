---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md
title: без названия
hash: djjzzNO3rmyzoEXz6RZporvmeXJocd8zwkhW1F4Sf68=
---
#### Вариант использования для загрузки дополнительных скриптов

Дополнительные поля позволяют загружать библиотеки JavaScript (например, с CDN, таких как jsDelivr или cdnjs). Следующий пример демонстрирует это на примере библиотеки chartJS.

**Шаг 1:**

Создайте новую точку данных типа string или json с именем`0_userdata.0.chartData` и следующее содержимое

```json
[12, 19, 3, 5, 2, 3]
```

**Шаг 2:**

Введите следующий URL-адрес в поле json\_script\[1]:

```text
https://cdn.jsdelivr.net/npm/chart.js
```

**Шаг 3:**

Введите имя созданной точки данных в поле «Точка данных JSON». Введите следующий шаблон в поле «Шаблон JSON».

За исключением одной строки, это стандартный HTML + JavaScript.

```html
data: <%- JSON.stringify(data) %>,
```

Данные, считанные из точки данных, доступны в переменной JavaScript.`data` и выводится внутри инструкций шаблона <%- ... %>. После компиляции и включения шаблона в HTML-документ он выполняется браузером, так что диаграмма отображается с помощью JavaScript.

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

![Пример](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/example_extscripts.png)