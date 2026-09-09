---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md
title: без названия
hash: VxCKbZ4tTIP8phPc//xLBK2IVNz9zM3vXqCga6Oov/I=
---
## Шаблон 01 для FlexCharts

```typescript
{
	backgroundColor: "rgb(232, 232, 232)",
	title: {
		text: "Tibber Price",
		textStyle: {
			color: "#ffffff"
		}
	},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "cross"
		}
	},
	grid: { // Randabstände
		left: "10%", right: "4%", top: "8%", bottom: "8%"
	},
	xAxis: {
		type: "time",
		boundaryGap: false
	},
	yAxis: {
		type: "value",
		axisLabel: {formatter: "{value} €/kWh"},
		axisPointer: {
			snap: true
		}
	},
	visualMap: {
		min: 0.2,
		max: 0.35,
		inRange: {
			color: ["green", "yellow", "red"] // Verlauf von grün über gelb nach rot
		},
		show: false
	},
	series: [
		{
			name: "Total",
			type: "line",
			step: "end",
			symbol: "none",
			data: %%seriesData%%,

			markArea: {
				itemStyle: {
					color: "rgba(120, 200, 120, 0.2)"
				},
				data: [
					%%CalcChannelsData%%
				]
			},

	        markLine: { // Markierung des aktuellen Zeitblocks
                data: [
                    {
                        name: "now",
                        xAxis: (function() {
                            const now = new Date();
                            const roundedMinutes = Math.floor(now.getMinutes() / 15) * 15;
                            now.setMinutes(roundedMinutes, 0, 0);
                            return now.getTime();
                        })()
                    }
                ],
                symbol: ["arrow", "none"],
                label: {
                    show: false,
                }
            }

        }
    ]

};
```