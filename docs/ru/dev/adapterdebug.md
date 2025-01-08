---
title: Отладка
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterdebug.md
hash: Ut+I3NFMdm9vI6ASK9i8VBIPRKjKBJSlVWTcyAYuh3w=
---
# Отладка адаптеров
## Отладка адаптеров с помощью Chrome
Node.JS поддерживает отладку с помощью Chrome.

Если вы остановите адаптер в ioBroker, а затем запустите его из консоли (CLI) вот так:

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --debug
```

Важным является `-–inspect`.

Затем выводится что-то вроде этого:

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

Затем вы можете выполнить отладку с помощью Chrome, если введете выходную ссылку в Chrome:

![Хром](../../de/dev/media/adapterdebug1.png)

*Протестировано: Windows, Chrome 55, node.js 6.9.2*

### Удаленная отладка с помощью Chrome
Если iobroker не запущен на том же компьютере, где запущен браузер Chrome, то команда основана на примере выше:

```
node --inspect-brk=0.0.0.0:9229 node_modules/iobroker.sayit/main.js --debug
```

параметр `--inspect-brk` обеспечивает, по сравнению с предыдущим,

что точка останова установлена в первой строке вашего адаптера сразу при запуске отладчика.

Если вы не всегда хотите копировать ссылку для запуска отладки отдельно, вы также можете получить доступ к следующей странице в Chrome:

```
chrome://inspect
```

Затем введите IP-адрес и порт вашего **компьютера ioBroker** один раз через конфигурацию точно так же, как при использовании команды Inspect.

Сеанс отладки будет отображаться там после запуска команды, и его можно будет запустить одним щелчком мыши.

Возможности отладки Chrome просто фантастические.
У вас есть все возможности, которые вы знаете из **веб-отладки**: точки останова, также с условиями, `watch`, `call stack`, `scope inspection`, вывод на консоль и т. д.

Картинки и описание на английском языке расположены [здесь](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application).

Если он еще не установлен, на компьютере ioBroker необходим инспектор узлов:

```
npm install -g node-inspector
```

Обычно инспектор узлов устанавливается автоматически вместе с ioBroker.

## Отладка с помощью WebStorm
## Отладка с помощью `Visual Studio Code`
Если вы откроете каталог с помощью `VS Code`, то после открытия каталога адаптера (меню `File=>Open folder...`) вы сможете отладить адаптер.

Конфигурация в файле `.vscode/launch.js` должна выглядеть следующим образом:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}\\main.js",
            "args": ["--debug"]
        },
        {
            "name": "Attach to Process",
            "type": "node",
            "request": "attach",
            "address": "IO_BROKER_IP_ADDRESS",
            "port": 9229
          }
    ]
}
```

### Локальная отладка
После остановки адаптера (`iobroker stop ADAPTER_NAME`) его можно запустить в VS Code: ![VS-код](../../de/dev/media/adapterdebug10.png).

После выбора `Launch Program` и нажатия кнопки `Play` адаптер запускается, и вы можете выполнять отладку локально.

### Удаленная отладка
Для этого вам следует специально запустить адаптер на сервере ioBroker.

```
d /opt/iobroker
obroker stop ADAPTERNAME
ode --inspect-brk=0.0.0.0:9229 node_modules/iobroker.ADAPTERNAME/main.js --debug
```

Затем вы можете подключить `VS Code` к процессу (`attach`).

![VS-код](../../de/dev/media/adapterdebug11.png)