---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.starline/README.md
title: ioBroker.starline
hash: uSGA8rTiU9pBpcSEn6/WSYsQNZE1ssAb1lr9DO8EPS4=
---
![标识](../../../en/adapterref/iobroker.starline/admin/starline_git.jpg)

![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker.starline
该适配器允许您通过 StarLine Telematics 服务 (https://starline-online.ru) 检索车辆状态数据。

##### 主要报警功能的控制：
- 布防/撤防系统
- 激活反劫持功能
- 远程发动机启动
- 启用代客（服务）模式
- 触发辅助通道
- 打开/关闭 Webasto 加热器（如果安装）
- 请求车辆的 GPS 坐标
- 禁用冲击和倾斜传感器

Для работы драйвера необходимо установленное 和 настроенное противоугонное устройство поддерживающее сервис StarLine特雷马蒂卡 2.0。

Драйвер позволяет получать данные состояния автомобиля через сервис StarLine Телематика。 https://starline-online.ru。

##### Управление основными режимами работы автосигнализации:
  - Постановка/снятие с охраны
  - AntiHiJack 反劫持工具
  - Автозапуск
  - Активация сервисного режима (代客泊车)
  - Активация доп. каналов
  - Включение/отключение подогревателя Webasto (При его наличии)
  - Запрос координат автомобиля
  - Отключение датчиков удара и наклона

## Changelog

#### 2.1.0
* (tglynx) modernized the adapter to support the current (August 2025) starline website api

#### 2.0.0
* (instalator) latest working version from 2021

#### 1.1.3
* (instalator) fixed error parse mayak

#### 1.1.2
* (instalator) fixed objects
* (instalator) fixed interval

#### 1.1.1
* (instalator) fixed send command

#### 1.1.0
* (instalator) fixed auth
* (instalator) added support admin3

#### 1.0.0
* (instalator) up to stable

#### 0.2.0
* (instalator) fix error sendCommand

#### 0.1.9
* (instalator) change send command, 
* (instalator) fix parse balance"

#### 0.1.8
* (instalator) change link getdata

#### 0.1.7
* (instalator) change position x and y to longitude and latitude

#### 0.1.5
* (instalator) release

#### 0.1.2
* (instalator) fix widget for new structure

#### 0.1.1
* (Bluefox) changed the structure of the widget

#### 0.1.0
* (instalator) add widget

#### 0.0.3
* (instalator) added monitoring function
* (instalator) added control function

#### 0.0.2
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.