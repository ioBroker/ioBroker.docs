---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md
title: без названия
hash: 4optUbLdRgr9JyBFCnAfUesgTBOtK4+1bxt7QMWrZzg=
---
#### Вариант использования асинхронных вызовов

**Блок 1:**

Вызов функции sendToAsync с использованием await. В этом примере вызывается тестовая функция в административном адаптере.

**Блок 2:**

Преобразуйте результат в строку и выведите в HTML.

**Блок 3:**

определение функции sendToAsync

```ejs
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %>
<%- JSON.stringify(req) %>
<% async function sendToAsync(instance, command, sendData) {
    console.log(`sendToAsync ${command} ${sendData}`);
    return new Promise((resolve, reject) => {
        try {
            vis.conn.sendTo(instance, command, sendData, function (receiveData) {
                resolve(receiveData);
            });
        } catch (error) {
            reject(error);
        }
    });
} %>
```

**Результат:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```