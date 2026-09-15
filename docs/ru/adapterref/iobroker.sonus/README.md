---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonus/README.md
title: ioBroker.sonus
hash: Ym0VKPQAcNcM8YHO/cKoDqKpN60ly7K10LlprzFeuww=
---
![Логотип](../../../en/adapterref/iobroker.sonus/admin/sonus.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.sonus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonus.svg)
![Статус зависимости](https://img.shields.io/david/GermanBluefox/iobroker.sonus.svg)
![Известные уязвимости](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sonus.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.sonus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/GermanBluefox/ioBroker.sonus?branch=master&svg=true)

# ioBroker.sonus

## адаптер Sonus для ioBroker

С помощью этого адаптера вы можете управлять ioBroker голосом на многих разных языках.

Программа использует пакет с открытым исходным кодом Snowboy для распознавания ключевого слова и сервис Google Speech для преобразования записанного голоса в текст. Запись ключевого слова начинается через 5 секунд после его произнесения.

## Установка в Linux

Для компиляции Snowboy (до установки этого адаптера) вам потребуются некоторые пакеты Linux, которые можно установить следующим образом:

```
sudo apt-get install libmagic-dev 
sudo apt-get install libatlas-base-dev 
sudo apt-get install build-essential 
sudo apt-get install sox libsox-fmt-all
```

### Проверьте микрофон

Для качественного распознавания необходим хороший микрофон. Я протестировал его с помощью [USB-микрофонной системы UMA-8](https://www.minidsp.com/products/usb-audio-interface/uma-8-microphone-array) .

Перечислите все записывающие устройства:

` arecord -l`

Если у вас есть дополнительный микрофон, необходимо установить его в качестве микрофона по умолчанию:

```
**** List of CAPTURE Hardware Devices ****
card 1: SpkUAC20 [miniDSP VocalFusion Spk (UAC2.0], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Редактировать`/usr/share/alsa/alsa.conf` и заменить`defaults.pcm.card 0` с`defaults.pcm.card 1` , потому что, например, на первой карте есть микрофон.

Вы можете проверить микрофон с помощью`rec test.wav` .

### учетные данные Google

Для распознавания текста после обнаружения ключевого слова этот адаптер использует API Google Speech. Чтобы включить его, вам необходимо получить собственные учетные данные и вставить их в конфигурацию в формате JSON.

Инструкцию можно найти здесь: <https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library> или [здесь.](https://github.com/googleapis/nodejs-speech#using-the-client-library)

JSON-файл Google выглядит следующим образом:

```
{
  "type": "service_account",
  "project_id": "ыаыаыаыва",
  "private_key_id": "ун457567565",
  "private_key": "-----BEGIN PRIVATE KEY-----\шукгншугкнеушеуке\n-----END PRIVATE KEY-----\n",
  "client_email": "рапрарапрапр.iam.gserviceaccount.com",
  "client_id": "апрапрарапрапр",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/аапрарарапрапра.iam.gserviceaccount.com"
}
```

И просто скопированный текст вставляется в конфигурацию iobroker.

### Собственное горячее слово

Ключевое слово по умолчанию —`snowboy` или`sonus` , но вы можете создать свою собственную модель "горячего слова" здесь: <https://snowboy.kitt.ai/hotword/> и загрузить ее в адаптер.

## Как разобрать текст

Как правило, у вас есть два способа проанализировать текст и запустить команду:

- текст2команда
- javascript

### текст2команда

В text2command можно задать ключевые слова, для этого необходимо выбрать экземпляр text2command в конфигурации.

### javascript

Напишите скрипт, который будет анализировать текст, появившийся в sonus.X.data.detected, где X — экземпляр адаптера sonus.

Сценарий должен выглядеть примерно так:

```
on({id: 'sonus.0.data.detected', change: 'any'), obj => {
    console.log('Detected words: ' + obj.state.val);
    let command = '';
    if (obj.state.val.match(/on|ein/)) {
        command = true;
    } else if (obj.state.val.match(/off|aus/)) {
        command = false;
    }
    
    if (command === '') {
        console.log('Cannot detect command');
    } else {
        if (obj.state.val.match(/light|backlight/) && obj.state.val.match(/living/)) {
            setState('hm-rpc.0.Q92837293.1.STATE'/* Living room light */, command);
        } else {
            console.log('Cannot detect room or function');
        }
    }  
});
```

## Changelog

### 0.1.1 (2019-05-24)
* (bluefox) added sensitivity parameter

### 0.1.0 (2019-05-20)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

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