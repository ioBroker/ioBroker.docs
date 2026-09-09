---
chapters: {"pages":{"en/adapterref/iobroker.cec2/README.md":{"title":{"en":"ioBroker.cec2"},"content":"en/adapterref/iobroker.cec2/README.md"},"en/adapterref/iobroker.cec2/doc/ExampleScripts.md":{"title":{"en":"Some script examples"},"content":"en/adapterref/iobroker.cec2/doc/ExampleScripts.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cec2/doc/ExampleScripts.md
title: Несколько примеров скриптов
hash: /U4zXD1aNS1YVJMetpL/dT9YPDDRtICb922MiUXKUTE=
---
# Несколько примеров скриптов

## Убедитесь, что AV-ресивер запускается одновременно с телевизором:

Обязательно замените`AV_Receiver` укажите название вашего AV-ресивера. Время ожидания по умолчанию составляет 20 секунд, но обязательно дайте ему немного времени.

```javascript
//Parameters:
const waitTime = 20; //wait time in seconds
const AVRName = 'AV_Receiver'; //name of AVR as in cec2 object structure. 

let timeoutId = 0;
//TV went on and reported power state to bus. 
//For me this does not always happen, so I did remove the 'ack: true' part for me here, so it will check if I switch TV via CEC.
on({id: 'cec2.0.TV.state', val: true, ack: true}, () => { 
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => { 
        const avrStatus = getState(`cec2.0.${AVRName}.state`).val;
            if (!avrStatus) {
                //switch on AVR with set State here:
                setState(`cec2.0.${AVRName}.state`, true);
                //this will switch it on via CEC, but you can replace ID with Broadlink of course 
        }
    }, waitTime * 1000);
});

on({id: `cec2.0.${AVRName}.state`, val: true, ack: true}, () => {
    if (timeoutId) {
       clearTimeout(timeoutId); //AV Reciever already went on, so we cancel the timeout and won't switch anything.
    }
});
```