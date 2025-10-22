---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.awtrix-light/weather-app.md
title: ioBroker.awtrix-light
hash: xOEQ+GozvpV4FTaUnP1Z23Lv4aTSNnr8tdg+7oQ7jG0=
---
![标识](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
## 天气应用程序（专家应用程序）
此脚本可在专家应用中显示当前天气状况的正确图标。这是通过将[ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap/tree/master)中的图标映射到设备上的图标来实现的。

*感谢 ioBroker 论坛的 Andy200877 提出这个想法。*

### 图标
通过 Web 界面将以下图标上传到设备：

- `11201` (01d 晴朗天空) - 晴朗天空
- `52163` (01n 晴朗天空) - 晴朗的夜晚
- `22315` (02d 少量云) - 少量云天 (11-25% 云量)
- `26088` (02n 少量云) - 夜间少量云 (11-25% 云量)
- `22378` (03d 有云) - 白天有云 (25-50% 云量)
- `21907` (03n 零星多云) - 夜间零星多云 (25-50% 云量)
- `60742` (04d 多云) - 阴天 (51-100%)
- `52159` (04n 多云) - 多云夜间 (51-100%)
- `43706` (09d 阵雨) - 阵雨天
- `43739` (09n 阵雨) - 夜间有阵雨
- `22257` (10天降雨) - 雨天
- ` 72` (10n 降雨) - 雨夜
- `43733` (11 天雷暴) - 雷暴日
- `43748` (11n 雷暴) - 雷暴夜晚
- `43732` (13天雪) - 雪天
- `26090` (13n 雪) - 雪夜
- `43708` (50d 雾) - 雾天
- `43741`（50n 雾）- 雾夜

### 新的专家应用程序
创建一个名为`weather`的新专家应用程序。

＃＃＃ 脚本
```javascript
// v0.3
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
    '04d': '60742', // broken clouds day
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