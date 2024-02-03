---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.awtrix-light/weather-app.md
title: ioBroker.awtrix-light
hash: yES6pra10Z+PwF/i1SgF+xx2KsTlB4pXj5TsMMgfnRs=
---
![标识](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
##天气应用程序（专家应用程序）
此脚本在专家应用程序中显示当前天气情况的正确图标。为此，[ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap/tree/master) 中的图标将映射到设备上的图标。

*感谢 ioBroker 论坛的 Andy200877 提出的想法。*

### 图标
通过 Web 界面将以下图标加载到设备上：

- `11201`（01d 晴空）- 晴空日
- `52163` (01n 晴空) - 晴空之夜
- `22315`（02d 几云）- 几云天（11-25% 云）
- `26088`（02n 几云）- 夜晚几云（11-25% 云）
- `22378`（03d 散云）- 散云日（25-50% 云）
- `21907`（03n 分散云）- 夜间分散云（25-50% 云）
- `13852` (04d 破碎的云) - 阴天 (51-100%)
- `52159` (04n 破碎的云) - 阴夜 (51-100%)
- `43706`（09d 阵雨）- 雨天
- `43739` (09n 阵雨) - 阵雨之夜
- `22257`（10天雨） - 雨天
- `72`（10n 雨）- 雨夜
- `43733`（11d 雷暴）- 雷暴日
- `43748` (11n 雷暴) - 雷暴之夜
- `43732`（13 天雪）- 下雪天
- `26090`（13n 雪）- 雪夜
- `43708`（50d 雾） - 雾天
- `43741`（50n 雾） - 雾夜

### 新的专家应用程序
创建一个名为`weather`的新专家应用程序。

＃＃＃ 脚本
```javascript
// v0.2
const displayTemp = true;

const appName = 'weather';
const objIdIcon = 'openweathermap.0.forecast.current.icon';
const objIdText = 'openweathermap.0.forecast.current.state';
const objIdTemp = 'openweathermap.0.forecast.current.temperature';

const iconMapping = {
    '01d': '11201', // clear sky day
    '01n': '52163', // clear sky night
    '02d': '22315', // few clouds day
    '02n': '26088', // few clouds night
    '03d': '22378', // scattered clouds day
    '03n': '21907', // scattered clouds night
    '04d': '13852', // broken clouds day
    '04n': '52159', // broken clouds night
    '09d': '43706', // shower rain day
    '09n': '43739', // shower rain night
    '10d': '22257', // rain day
    '10n': '72',    // rain night
    '11d': '43733', // thunderstorm day
    '11n': '43748', // thunderstorm night
    '13d': '43732', // snow day
    '13n': '26090', // snow night
    '50d': '43708', // mist day
    '50n': '43741', // mist night
};

async function refreshExpertApp() {
    try {
        const iconState = await getStateAsync(objIdIcon);
        if (iconState && iconState.ack && iconState.val) {
            const icon = /([0-9]{2}[d|n]{1})/.exec(iconState.val)[0];
            if (iconMapping[icon]) {
                await setStateAsync(`awtrix-light.0.apps.${appName}.icon`, { val: iconMapping[icon] });
            }
        }

        let temp = 0;
        const tempState = await getStateAsync(objIdTemp);
        if (tempState && tempState.ack && tempState.val) {
            temp = tempState.val;
        }

        if (temp > 30) {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#bd2020' });
        } else if (temp < 0) {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#236fd9' });
        } else {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#ffffff' });
        }

        const textState = await getStateAsync(objIdText);
        if (textState && textState.ack && textState.val) {
            if (displayTemp) {
                await setStateAsync(`awtrix-light.0.apps.${appName}.text`, { val: `${textState.val} - ${formatValue(temp, 2)} °C` });
            } else {
                await setStateAsync(`awtrix-light.0.apps.${appName}.text`, { val: textState.val });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

on({ id: [objIdIcon, objIdText, objIdTemp], change: 'ne' }, refreshExpertApp);

// Init on startup
refreshExpertApp();
```