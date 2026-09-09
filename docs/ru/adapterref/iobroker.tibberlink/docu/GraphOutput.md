---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/docu/GraphOutput.md
title: Настройка вывода графика
hash: JVORhNlhuo7IlPhNtMRG3ZtVCVKBAzedIBMH/L23894=
---
# Настройка вывода графика

_Часть [документации ioBroker.tibberlink](/#/adapters/tibberlink) ._

Адаптер помогает визуализировать ценовые тренды и результаты калькулятора. Он предлагает три уровня сложности — от простого подхода на основе JSON до полностью настраиваемого решения на JavaScript.

## 1. **(В разработке) Визуализация с использованием адаптера "E-Charts".**

Для этого метода требуется отдельная установка адаптера "E-Charts".

- Данные в формате JSON генерируются в разделе «Состояния калькулятора» (`Output-E-Charts` ) можно использовать.
- Возможности ограничены особенностями адаптера E-Charts.

## 2. **Использование адаптера "FlexCharts" (или "Fully Featured eCharts") с JSON.**

Для этого метода требуется отдельная установка адаптера "FlexCharts".

- Адаптер TibberLink создает состояние, называемое`jsonFlexCharts` .

  ```
                            <img src="jsonFlexChartsState.png" width="938" alt="jsonFlexCharts State">
  ```

- Адаптер FlexCharts отображает это состояние по следующему URL-адресу:
  ```
  http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
  ```

- Начиная с версии 0.7.0, FlexCharts поддерживает автоматическое обновление диаграмм через SSE (Server-Sent Events). Для использования этой функции добавьте...`&sse` к URL-адресу:
  ```
  http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts&sse=30
  ```

- Для получения более подробной информации обратитесь к [документации по адаптеру FlexCharts](https://github.com/MyHomeMyData/ioBroker.flexcharts) .

### **Использование шаблонов JSON**

- Он`jsonFlexCharts` Состояние генерируется на основе шаблона, настроенного с помощью редактора JSON в параметрах адаптера.
- Встроенный редактор JSON использует режим JSON5, поэтому допускаются комментарии и завершающие запятые.
- Образец шаблона можно скачать по ссылке: [TemplateFlexChart01.md](/#/docs/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md) .
- Скопируйте и вставьте шаблон в редактор JSON.
- Шаблон содержит заполнители:
  - `%%seriesData%%` (заполняется данными о ценах временного ряда на момент выполнения).
  - `%%CalcChannelsData%%` (заполняется данными выбранного канала калькулятора).
- Остальная часть шаблона соответствует конфигурации Apache ECharts. Для справки см. [примеры использования Apache ECharts](https://echarts.apache.org/examples/en/index.html) .
- **Рекомендация:** протестируйте адаптер TibberLink без реального шаблона, используя строку по умолчанию:
  ```
  %%seriesData%%\n\n%%CalcChannelsData%%
  ```
  Это помогает понять его функциональность.
- Настройки шаблона можно протестировать на страницах примеров Apache ECharts, используя данные состояния "Output-E-Charts".
- Хорошие шаблоны будут распространены в сообществе разработчиков адаптеров TibberLink.

## 3. **Использование FlexCharts с пользовательским кодом JavaScript.**

Для максимальной гибкости и возможности индивидуальной настройки адаптер FlexCharts можно использовать с пользовательским JavaScript.

- Адаптеры "FlexCharts" и "JavaScript" необходимо устанавливать отдельно.
- Такой подход позволяет создавать множество настраиваемых графиков.
- Для получения более подробной информации обратитесь к разделу « [Обсуждение адаптера FlexCharts»](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) .