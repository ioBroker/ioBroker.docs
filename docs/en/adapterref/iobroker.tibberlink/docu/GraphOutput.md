---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
---
# Graph Output Configuration

_Part of the [ioBroker.tibberlink documentation](/#/adapters/tibberlink)._

The adapter helps visualize price trends and calculator results. It provides three levels of complexity — from a simple JSON-based approach to a fully customized JavaScript solution.

## 1. **(Under Development) Visualization using the "E-Charts" Adapter**

This method requires the "E-Charts" adapter to be installed separately.

- JSON data generated in the Calculator States section (`Output-E-Charts`) can be used.
- The capabilities are limited by the constraints of the E-Charts adapter.

## 2. **Using the "FlexCharts" (or "Fully Featured eCharts") Adapter with JSON**

This method requires the "FlexCharts" adapter to be installed separately.

- The TibberLink adapter creates a state called `jsonFlexCharts`.

                                <img src="jsonFlexChartsState.png" width="938" alt="jsonFlexCharts State">

- The FlexCharts adapter renders this state via the following URL:
    ```
    http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
    ```
- Starting with V0.7.0, FlexCharts supports automatic chart updates via SSE (Server-Sent Events). To use this add `&sse` to the URL:
    ```
    http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts&sse=30
    ```
- Refer to the [FlexCharts adapter documentation](https://github.com/MyHomeMyData/ioBroker.flexcharts) for more details.

### **JSON Template Usage**

- The `jsonFlexCharts` state is generated based on a template configured via the JSON editor in the adapter settings.
- The built-in JSON editor uses JSON5 mode, so comments and trailing commas are permitted.
- A sample template can be downloaded from: [TemplateFlexChart01.md](/#/docs/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md).
- Copy and paste the template into the JSON editor.
- The template contains the placeholders:
    - `%%seriesData%%` (populated with the time-series price data at runtime).
    - `%%CalcChannelsData%%` (populated with selected calculator channel data).
- The rest of the template follows the Apache ECharts configuration. For reference, see [Apache ECharts Examples](https://echarts.apache.org/examples/en/index.html).
- **Recommendation:** Test the TibberLink adapter without a real template using the default string:
    ```
    %%seriesData%%\n\n%%CalcChannelsData%%
    ```
    This helps understand its functionality.
- Template adjustments can be tested on Apache ECharts examples pages using the "Output-E-Charts" state data.
- Good templates will be shared within the TibberLink adapter community.

## 3. **Using "FlexCharts" with Custom JavaScript Code**

For maximum flexibility and customization, the FlexCharts adapter can be used with custom JavaScript.

- Both the "FlexCharts" and "JavaScript" adapters need to be installed separately.
- This approach allows the creation of multiple customized graphs.
- For more details, refer to the [FlexCharts Adapter Discussion](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67).