---
BADGE-Number of Installations: http://iobroker.live/badges/wolf-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.wolf.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wolf.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wolf/README.md
title: iobroker.wolf
hash: pDtMB9foXkJXjjQ5/dxzpSFjGTXi8W15I1kZGV8qa3E=
---
# Iobroker.wolf
## 应用领域：供暖/太阳能/家庭通风
该适配器可通过 ISM8i 评估最多 4 个以下加热器：

   * 气体冷凝机组：CGB-2（包括：CGW-2、CGS-2、CSZ-2）、MGK-2
   * 油冷凝锅炉：TOB
   * 分体式热泵：BWL-1-S
   * 客厅通风 CWL 优秀

始终需要系统控制模块 BM-2 或显示模块 AM。
此外，eBus系统中可以存在诸如混合器模块MM、级联模块KM、太阳能模块SM1或SM2之类的附加组件。

单个模块的最大数量：

   * 最大限度。 4 个加热器 hg (1) -hg (4)
   * 最大限度。 3 个搅拌机 mm (1) - mm (3)
   * 最大限度。 4 个操作面板 (BM-2) bm (1) -bm (4)
   * 最大限度。 1个级联模块km (1)
   * 最大限度。 1 个太阳能模块（SM1 或 SM2）sm (1)
   * 最大限度。 1 分体式空气/水热泵 (BWL-1-S) hg (0)

   CWL Excellent 系列的住宅通风装置也可以使用 ISM8i 进行评估和操作。

## Changelog
### 1.7.0 (2023-01-26)
* (fred0815) added missing ISM8i states
* (fred0815) optimized channel object naming
* (fred0815) fixed configuration of polling interval
* (Apollon77) Adjust some temperature states to allow to go negative

### 1.6.1 (2023-01-16)
* (Apollon77) Fixed some crash cases with unknown datapoints

### 1.6.0 (2022-12-30)
* (Apollon77) Add DPT10 Encoding (TimeofDay) - but ignores weekday!
* (Apollon77) Adjust some temperature states to allow to go negative
* (Apollon77) Add additional polling of all values to ensure that all values are updated
* (Apollon77) Fix configuration issue with Mixing modules

### 1.5.0 (2022-05-30)
* (Apollon77) make sure datapoints are created correctly and resolve name-mixup since 1.2.0 (all states now be names with _t!)
* (Apollon77) Drop support for Admin <3.0.0
* (Apollon77) Fix crash cases reported by Sentry

### 1.4.0 (2022-04-26)
* IMPORTANT: Requires now at least js-controller 2.0
* (Apollon77) Optimize Configuration UI to prevent people from selecting bind interfaces that do not allow external connections!
* (Apollon77) Correctly create all objects when "Status as bool" is used
* (Apollon77) Adjust some min/max values
* (Apollon77/Dark-Tower-Coder) Fix parsing of DP 149
* (Apollon77/Dark-Tower-Coder) Add encoding of DPT_Date type
* (Dark-Tower-Coder) return value for DPT_Switch corrected from '0ff' to 'Off'
* (Apollon77) Add sentry for crash reporting

### 1.3.4 (2021-11-14)
* (eifel-tech) Min value of outside temperature corrected

### 1.3.2 (2021-08-31)
* (eifel-tech/tobias) Corrected error: DP 149 with correct Type (Issue #30)
* (eifel-tech/tobias) Changes for js-controller 3.3

### 1.2.1 [2020.06.20]
* (schweigel) Corrected error: DPT_Switch in boolean mode didn't work correct

### 1.2.0 [2020.03.20]
* (LHBL2003) Added for all variables "write" as Bool value
* (bluefox) Admin3 compatibility

### 1.1.1 [2019.12.02]
* (schweigel) Fixed: DPT_Date is wrong
* (schweigel) Fixed: CWL - DPT_TimeOfDay - error

### 1.1.0 [2019.09.13]
* (RustyThePropellerHead) ISM8i Firmware v1.50 Update to be able to use the new DataPoints (FW Released in 2016)
                          * As a side note the GLT °C boiler set point is defined and read as a 1 °C resolution, but you can send the boiler set point commands with 0.1 °C resolution
* (RustyThePropellerHead) DHW minimum value reduced from 20 °C to 0 °C to allow for deactivation                          
* (RustyThePropellerHead) Reorganisation of the hg0 to have its own area on the adapter configuration webpage.
* (RustyThePropellerHead) Scaling DPT_FlowRate_m3/h corrected
* (RustyThePropellerHead) Lookup "Programmwahl CWL" corrected

### 1.0.0 [2017.11.21]
* (bluefox) resize logo

### 0.9.1 [2016.12.19]
* (smiling_Jack) Add Bool option
* (smiling_Jack) Add Bar option
* (smiling_Jack) Bugfix Type 5.001 Scaling

### 0.1.0 [2015.12.01]
* (smiling_Jack) Add writing to ism8

### 0.0.9 [2015.11.06]
* (smiling_Jack) Bugfix
* (smiling_Jack) Add test output

### 0.0.8 [2015.11.02]
* (smiling_Jack) Bugfix io-package

### 0.0.7 [2015.11.02]
* (smiling_Jack) new object management
* (smiling_Jack) Bugfixes

### 0.0.6 [2015.10.20]
* (smiling_Jack) Bugfix parsing

### 0.0.5 [2015.10.16]
* (smiling_Jack) Add support for multiple data
* (smiling_Jack) Add debug output 
* (smiling_Jack) Bugfixes

### 0.0.4 [2015.10.15]
* (smiling_Jack) Bugfix on parse error
* (smiling_Jack) Add DPT_HVACContrMode
* (smiling_Jack) Add DPT_HVACMode

### 0.0.3 [2015.10.14]
* (smiling_Jack) add CWL
* (smiling_Jack) remove ISM8 ip

### 0.0.2 [2015.10.12]
* (smiling_Jack) add BWL-1-S
* (smiling_Jack) update readme

### 0.0.1 [2015.10.08]
* (smiling_Jack) first release

## License

The MIT License (MIT)

Copyright (c) 2015-2023 smiling_Jack, ioBroker-Community

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.