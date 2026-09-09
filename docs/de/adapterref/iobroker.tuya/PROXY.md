---
chapters: {"pages":{"en/adapterref/iobroker.tuya/README.md":{"title":{"en":"ioBroker.tuya"},"content":"en/adapterref/iobroker.tuya/README.md"},"en/adapterref/iobroker.tuya/PROXY.md":{"title":{"en":"Proxy instructions for mobile Phones"},"content":"en/adapterref/iobroker.tuya/PROXY.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/PROXY.md
title: Proxy-Anleitung für Mobiltelefone
hash: iFp2gokgU8uAPvx1smy3TPwUqG97vLpP4Nl2i0zgYrM=
---
# Proxy-Anleitung für Mobiltelefone

## iOS

**Wichtig: Der Proxy heißt seit Version 3.0.0 „NodeMITMProxyCA“ und nicht mehr „Anyproxy“!**

<https://youtu.be/bHaL9ftU2zc>

### Zertifikat installieren

![Zertifikat 1](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_1.jpg)

![Zertifikat 2](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_2.jpg)

![Zertifikat 3](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_3.jpg)

![Zertifikat 4](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_4.jpg)

![Zertifikat 5](../../../en/adapterref/iobroker.tuya/img/ios_Zertifikat_5.jpg)

### Proxy aktivieren

![Proxy 1](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_1.jpg)

![Proxy 2](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_2.jpg)

![Proxy 3](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_3.jpg)

![Proxy 4](../../../en/adapterref/iobroker.tuya/img/ios_Proxy_4.jpg)

## Android

<https://youtu.be/bHaL9ftU2zc?t=275>

**Wichtig: Der Proxy heißt seit Version 3.0.0 „NodeMITMProxyCA“ und nicht mehr „Anyproxy“!**

**Wichtig: Einige neuere Android-Versionen erlauben selbstsignierte Zertifikate möglicherweise gar nicht mehr! Wenn Sie also sicher sind, dass Sie alles richtig gemacht haben und es trotzdem nicht funktioniert oder nur SSL-Fehler in den Protokollen angezeigt werden, versuchen Sie es bitte mit einem Android-Emulator (siehe unten)!**

### Zertifikat installieren

![Zertifikat](../../../en/adapterref/iobroker.tuya/img/Android-Zertifikat.jpg)

Je nach Android-Version ist die Installation des Zertifikats für „VPN und Apps“ ODER „WLAN“ erforderlich. Am einfachsten ist es, es einfach zweimal zu installieren (einmal für beide Modi) :-)

### PROXY aktivieren

![Proxy](../../../en/adapterref/iobroker.tuya/img/Android-Proxy.jpg)

### Detaillierte Schritt-für-Schritt-Anleitung zur Verwendung eines Proxys mit Android und älteren App-Versionen

siehe [TuyaSync.pdf](https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/TuyaSync.pdf)

Eine Liste bekannter kompatibler Apps und Versionen finden Sie in der [Datei README.md](https://github.com/Apollon77/ioBroker.tuya#compatible-mobile-apps-and-versions) !

Ein großes Dankeschön geht an HappyTeaFriend vom ioBroker-Forum!

### Ausweichoption, falls die obigen Optionen nicht funktionieren

Diese Lösung, die auch für Nutzer mit Windows-Computern funktioniert, wurde im [ioBroker-Forum](https://forum.iobroker.net/topic/16103/aufruf-neuer-adapter-iobroker-tuya-wlan-devices-tuya-smart-life-und-andere/83) vorgestellt und ist mit einem Android-Simulator kompatibel. Ein zweiter Ansatz mit einem Andreoid-Emulator wird unter <https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte-ger%C3%A4te/19> beschrieben.

<https://youtu.be/bHaL9ftU2zc?t=157>