---
chapters: {"pages":{"en/adapterref/iobroker.eusec/README.md":{"title":{"en":"ioBroker.euSec"},"content":"en/adapterref/iobroker.eusec/README.md"},"en/adapterref/iobroker.eusec/docs/devices.md":{"title":{"en":"Supported devices"},"content":"en/adapterref/iobroker.eusec/docs/devices.md"},"en/adapterref/iobroker.eusec/docs/debugging.md":{"title":{"en":"Debugging"},"content":"en/adapterref/iobroker.eusec/docs/debugging.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eusec/docs/debugging.md
title: Отладка
hash: MYdPVmvdIHqJ65gJhwKkLaAeZjW/2bMHfJcjuOZBQnE=
---
# Отладка

## Включить отладку

Для перевода адаптера в режим отладки выполните следующие действия.

1. Выбирать `Instances` В левом меню нажмите на значок головы вверху, чтобы активировать экспертный режим.

![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug01.png)

2. Подтвердите следующее окно с помощью `OK`.

![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug02.png)

3. Теперь щелкните по стрелке, указывающей вниз, в строке адаптера 'eufy-security.0' в крайнем правом углу.

![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug03.png)

4. Теперь нажмите на кнопку с изображением карандаша (редактировать) в крайнем правом углу первой строки, на уровне версии адаптера.

![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug04.png)

5. Теперь выберите `debug` и подтвердить с `OK`.

![Журналы с капчей](_media/en/debug05.png)![Журналы с капчей](_media/en/debug06.png)![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug07.png)

6. Режим отладки настроен.

![Журналы с капчей](../../../../en/adapterref/iobroker.eusec/docs/_media/en/debug08.png)

В моем примере адаптер уже был остановлен, поэтому его необходимо запустить, чтобы он принял новый уровень логирования. Если адаптер уже был активен, и вы его не выбрали... `Without restart` В этом случае адаптер будет перезапущен автоматически.

## Отключить отладку

Чтобы отключить режим отладки адаптера, выполните действия, описанные в предыдущих главах, и установите соответствующие параметры. `Log Level` к `info`.