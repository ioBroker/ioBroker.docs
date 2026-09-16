---
chapters: {"pages":{"en/adapterref/iobroker.cec2/README.md":{"title":{"en":"ioBroker.cec2"},"content":"en/adapterref/iobroker.cec2/README.md"},"en/adapterref/iobroker.cec2/doc/ExampleScripts.md":{"title":{"en":"Some script examples"},"content":"en/adapterref/iobroker.cec2/doc/ExampleScripts.md"}}}
---
# Some script examples

## Make sure AV receiver starts together with TV:

Be sure to replace `AV_Receiver` with the name of your AVR device.
Default wait time is 20 seconds, but be sure to give it some time.
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