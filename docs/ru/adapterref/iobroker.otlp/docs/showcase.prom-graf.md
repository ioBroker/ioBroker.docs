---
chapters: {"pages":{"en/adapterref/iobroker.otlp/README.md":{"title":{"en":"ioBroker.otlp"},"content":"en/adapterref/iobroker.otlp/README.md"},"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.otlp/docs/showcase.prom-graf.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.otlp/docs/showcase.prom-graf.md
title: без названия
hash: B2beWNdXuMI18gGl/5LszXtkIB21tBwGQIWB6HtD/EQ=
---
В этом документе описывается конфигурация, в которой`ioBroker.otlp` Адаптер используется для передачи данных с оконных датчиков и отправки напоминаний, если окно обнаружено открытым дольше определенного времени.`X` минут.

## Общий обзор

```mermaid
flowchart
    
iobOtlp[[ioBroker OTLP Adapter]]

otlpGw(Open Telemetry Gateway)

prom[(Prometheus)]
grafana(Grafana)

telegram(Telegram)

iobOtlp -->|Custom Setting Config|iobOtlp
iobOtlp -->|Push Datapoints as Metrics| otlpGw

otlpGw -->|Remote Write| prom

grafana <-->|Tracks| prom
grafana -->|Push via Recording Rule| prom

grafana -->|Notification: Window Open > X Minutes| telegram
```

У меня есть несколько совместимых с Matter оконных датчиков, подключенных к ioBroker. Каждая точка данных/состояние генерирует временной ряд для одного и того же имени метрики (`contact-sensor-open` ):

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/custom-setting.png)

В результате этого`ioBroker.otlp` адаптер публикует эти метрики через`OTLP` на настроенный открытый телеметрический шлюз/сборщик. Сборщик настроен на отправку (удаленная запись) метрик в (без сохранения состояния)`Prometheus` , которая служит мне краткосрочным хранилищем для исторических данных.

**Примечание:** Разумеется, я _мог бы_ хранить данные и в базе данных временных рядов, например, InfluxDB, но для данного случая мне, как правило, не требуется и нежелательно долговременное хранение. Меня не заинтересует, будет ли мое окно открыто _сегодня_ через 3 месяца; по сути, это бесполезные данные после того, как окно будет закрыто.

После сохранения данных в Prometheus, Grafana выполняет запрос к этим данным и перезаписывает их с помощью правила записи:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/recording-rule.png)

Это немного упрощает работу с данными, поскольку PROMQL доставляет немало хлопот при работе с относительными временными метками, сбросами и отсутствующими точками данных. Полученная метрика выглядит так — вы можете увидеть, где отсутствуют точки данных, потому что окно было закрыто в течение длительного времени:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/recorded-metric.png)

На скриншоте выше вы можете увидеть (неуклонно) увеличивающееся время работы соответствующих комнат. С учетом этого, легко настроить оповещение, которое должно отправляться, если какой-либо временной ряд превысит определенный порог:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/alert.png)

Оповещение настроено на доставку через Telegram, что показалось самым простым вариантом.`Contact-Point` для достижения этой цели и поставляется в комплекте с Grafana:

![img.png](../../../../en/adapterref/iobroker.otlp/docs/images/tg.png)