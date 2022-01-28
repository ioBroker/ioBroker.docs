---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md
title: ioBroker.шелли
hash: ETZyDH5CptFxPEp95rUvpyc32Hz1GOYuHBy4KAxZ5S0=
---
![логотип](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.шелли
## КоАП
По умолчанию используется протокол CoAP.

Если вы используете Shelly с прошивкой ниже 1.9.4, вам не нужно ничего настраивать. Ваши устройства Shelly будут найдены ioBroker самостоятельно.

**Если вы используете версии прошивки выше 1.9.4, вам необходимо указать сервер CoIoT для CoAP на вашем устройстве Shelly.** Введите IP-адрес вашего сервера ioBroker, а затем порт ```5683``` в качестве сервера CoIoT. Например, если ioBroker работает по адресу ```192.168.1.2```, вам нужно ввести ```192.168.1.2:5683``` и активировать CoIoT.

**Важно: поскольку CoAP использует многоадресные пакеты UDP, устройства Shelly должны находиться в той же подсети, что и ваш сервер ioBroker.**

Если вы используете ioBroker в док-контейнере, контейнер должен работать в сетевом режиме ```host``` или ```macvlan```. Если контейнер Docker работает в режиме ```bridge```, ваши устройства Shelly не будут найдены.

![iobroker_restrict_login](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_coap.png)

CoAP добавит все устройства в вашей сети. Если вы хотите исключить некоторые устройства Shelly, вы можете поместить их в черный список. Просто введите серийные номера в таблицу черного списка:

![iobroker_coap](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_coap.png)

![shelly_coap](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_coap.png)

### Важные заметки
#### Прошивка Shelly 1.8.0 (или выше)
- Если вы используете протокол CoAP, вам необходимо использовать адаптер версии 4.0.0 или выше.
- Если вы используете устройства с прошивкой ниже 1.8.0 (кроме Shelly 4 Pro), вам необходимо использовать адаптер версии 3.3.6 или ниже. Адаптер версии 4.0.0 (или выше) в этом случае работать не будет!

#### Прошивка Shelly 1.9.4 (или выше)
- Вы должны ввести сервер CoIoT для CoAP. Дополнительные сведения см. в разделе CoAp в этой документации.

### Исправление проблем
В некоторых случаях устройства Shelly не будут обнаружены адаптером Shelly в режиме CoAP. Пожалуйста, попробуйте следующее:

1. Отключите экземпляр адаптера ioBroker Shelly. **Не удаляйте адаптер Shelly!** Но важно отключить экземпляр Shelly.
2. Откройте окно терминала и выполните следующие команды на сервере ioBroker:

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

Вы можете использовать §§YYYYY_0§§ для прослушивания сообщений CoAP:

```
# Install tcpdump if it is not installed
sudo apt-get update
sudo apt-get install tcpdump

# tcpdump with IP address of Shelly device on network device eth1
sudo tcpdump -i eth1 src <IP-OF-SHELLY> and port 5683 -A

# tcpdump with IP address of Shelly device
sudo tcpdump src <IP-OF-SHELLY> and port 5683 -A

# tcpdump of all Shelly devices on network device eth1
sudo tcpdump  -i eth1 port 5683 -A

 # tcpdump of all Shelly devices
sudo tcpdump port 5683 -A
```

Теперь вы увидите все сообщения CoAP от Shelly. Если вы не видите никаких сообщений, у вас есть сетевая проблема с UDP или многоадресными сообщениями.

Сообщения CoAP выглядят следующим образом:

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```