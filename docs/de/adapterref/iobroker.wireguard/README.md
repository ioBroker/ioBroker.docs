---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: h4iXJQNtFlC6N7AvEImkVaMZjydeMDlTjbCL6cOuo8U=
---
![Logo](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wireguard-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wireguard-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![Logo](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![Test und Freigabe](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## Wireguard-Adapter für ioBroker
Stellen Sie eine Verbindung zu WireGuard-Hosts her und rufen Sie Verbindungsinformationen zu Peers ab. Dieser Adapter ist als Überwachungsinstanz für Ihre WireGuard-Hosts gedacht. Es unterstützt auch einfache Installationen und Docker.

&gt; Wenn Ihnen dieser Adapter gefällt und Sie darüber nachdenken, mich zu unterstützen<br/> &gt; [![Mit PayPal spenden](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Voraussetzungen
* Ausführen eines SSH-Servers auf jedem zu überwachenden Host
* Die ausführbare WG-Datei (wg.exe unter Windows) muss sich im Suchpfad befinden
* Benutzername und Passwort eines Benutzers mit der Berechtigung, den wg-Befehl auszuführen

## Installationsschritte
* Überprüfen Sie, ob auf Ihrem WireGuard-Host ein SSH-Server ausgeführt wird. Wenn nicht, installieren Sie eines. Wenn Sie eine Befehlszeile mit Putty (oder ähnlichem) öffnen können, betreiben Sie einen SSH-Server.
* Stellen Sie sicher, dass der Benutzer, den Sie dafür verwenden möchten, „wg“ ausführen kann (dasselbe gilt für Windows und Linux). **Dieser Benutzer benötigt Administratorrechte!**
* Um den Test zusammenzufassen: Öffnen Sie eine Remote-Befehlszeile, melden Sie sich an und führen Sie den Befehl „wg show“ aus. Wenn Sie ein korrektes Ergebnis erhalten, sind Sie fertig und können diese Daten zum Ausführen des Adapters verwenden.
* Tun Sie dies für jeden Host, den Sie überwachen möchten
* Installieren Sie den Adapter und konfigurieren Sie ihn

## Konfigurationsoptionen
Da WireGuard intern die öffentlichen Schlüssel nur zur Identifizierung von Peers verwendet, sie für Menschen jedoch ziemlich unpraktisch zu lesen und zu erkennen sind, wurde die Übersetzungsseite hinzugefügt. Fühlen Sie sich frei, öffentliche Schlüssel und Namen hinzuzufügen, um die Namen in den Objektbaum zu integrieren.

* Hauptseite
  - Name: Nur ein symbolischer Name für den Host, da dieser bequemer und einprägsamer ist als seine IP-Adresse
  - Hostadresse: IP-Adresse des Hosts. Ein FQDN- oder DNS-Name funktioniert auch. Wenn Sie WireGuard und ioBroker auf demselben Host ausführen, können Sie einfach „localhost“ als IP verwenden.
  - Port: Portnummer Ihres SSH-Servers. Standard: 22
  - Benutzer: Der Benutzer, der das Skript auf dem Host ausführt (wird verschlüsselt gespeichert)
  - Passwort: Passwort für diesen Benutzer (wird verschlüsselt gespeichert)
  - sudo: ob der wg-Befehl mit sudo ausgeführt werden soll oder nicht (erfordert gültige Konfiguration von sudoers! -> siehe [Sicherheitshinweise])
  - Docker: Führt einen „docker exec“-Befehl aus, um einen Wireguard-Server in einem Docker-Container zu erreichen. Bitte prüfen Sie, ob es Ihren Anforderungen entspricht oder ob Sie auf einen unterstützten Container wechseln können.
  - Abfrageintervall: Pause zwischen den einzelnen Abfragen in Sekunden (verzögert auch die erste Ausführung nach dem Adapterstart)
  - Container: Name Ihres Docker-Containers. Häufig „Wireguard“, kann jedoch unterschiedlich sein, insbesondere wenn mehr als einer auf einem einzelnen Server ausgeführt wird
* Übersetzungsseite
    - Öffentlicher Schlüssel: Der öffentliche Schlüssel eines Ihrer Peers
    - Gruppenname: Ein symbolischer Name für diesen Peer
* Seite „Konfigurationsdateien“.
  - Name: Muss mit dem auf der Hauptseite identisch sein
  - Schnittstelle: Name der in dieser Konfigurationsdatei gespeicherten Schnittstelle (wg0, wg1, ...)
  - Konfigurationsdatei: vollständig qualifizierter Pfad und Name der Konfigurationsdatei für diese Schnittstelle (/etc/wireguard/wg0.conf, ...)

### Die ausgeführte Befehlszeile hängt von den Kontrollkästchen ab:
* Keine Checkbox aktiviert: „wg show all dump“ wird ausgeführt (für Root-ähnliche Benutzer und Verwendung des SetUID-Bits)
* Das Kontrollkästchen „Sudo“ ist aktiviert: „sudo wg show all dump“ wird ausgeführt (funktioniert mit der richtigen sudoers-Zeile)
* Docker-Kontrollkästchen ist aktiviert: „docker exec -it wireguard /usr/bin/wg show all dump“ wird ausgeführt
* Die Kontrollkästchen „Sudo“ und „Docker“ sind aktiviert: „sudo docker exec -it wireguard /usr/bin/wg show all dump“ wird ausgeführt

> Wenn Sie WireGuard in einem Docker-Container verwenden, gehe ich davon aus, dass Sie mit beiden Technologien und Sicherheitskonzepten ausreichend vertraut sind, um Ihr System so zu konfigurieren, dass die angezeigten Befehle so ausgeführt werden, dass kein Passwort erforderlich ist.

### Docker
Grundsätzlich gilt alles, was über reguläre Installationen gesagt wurde, auch für Docker und funktioniert genauso.
Mit Ausnahme der erforderlichen Kontrollkästchen, um den richtigen Befehl auszuführen, und der erforderlichen Sudoers-Zeile. Wenn Sie WireGuard in einem Docker-Container verwenden, benötigen Sie möglicherweise Sudoers-Zeilen wie diese:

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * remove
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * allowed-ips *
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg syncconf * *
```

Dieser Adapter erwartet den Namen `wireguard` für Ihren WireGuard-Container und den Befehl `wg` in `/usr/bin/`im Container.
Diese Werte können derzeit nicht angepasst werden.

## Wie es funktioniert
* info.connection des Adapters wird verwendet, um anzuzeigen, dass mindestens eine WireGuard-Schnittstelle online ist und von „wg show all“ gemeldet wird. Wenn keine Wireguard-Schnittstelle online ist, wird nichts gemeldet. In diesem Fall wird ein Fehler protokolliert und die Ampel der Adapter wechselt auf Gelb.
* Dieser Adapter öffnet eine SSH-Shell auf jedem konfigurierten Host, führt den Befehl „wg show all dump“ aus, löscht die Shell und analysiert das Ergebnis.
* Da jeder öffentliche Schlüssel einzigartig ist, verwendet der Adapter diese, um den öffentlichen Schlüssel in benutzerfreundliche, lesbare und wiedererkennbare Namen zu übersetzen.
* WireGuard stellt den Status „verbunden“ leider nicht selbst bereit. Es werden nur die letzten Handshake-Informationen bereitgestellt.

Da Handshakes normalerweise alle 120 Sekunden stattfinden, berechnet dieser Adapter den Verbindungsstatus so, dass er davon ausgeht, dass ein Peer verbunden ist, wenn der letzte Handshake weniger als 130 Sekunden zuvor empfangen wurde.

## Sicherheitshinweise
> Ich empfehle dringend den Einsatz von sudoers unter Linux!

Diese Sicherheitshinweise beziehen sich hauptsächlich auf Linux, da dessen Sicherheitssystem komplexer ist als das von Windows. Auf einem Windows-Server müssen Sie lediglich einen Administratorbenutzer verwenden.
Da der Befehl `wg` (der ausgeführt wird, um den Status von WireGuard abzurufen) Administratorrechte erfordert, überlegen Sie gut, was Sie hier tun und wie Sie den Benutzer konfigurieren, den Sie in config platzieren.
Um diese Zugangsdaten bestmöglich zu schützen, werden sowohl Benutzername als auch Passwort verschlüsselt.

Grundsätzlich gibt es drei Möglichkeiten, den Befehl auszuführen:

* Verwenden Sie einen Administratorbenutzer (root oder ähnlich). Dies funktioniert, aber Ihr gesamter Server ist für den Fall, dass die Anmeldeinformationen verloren gehen/gestohlen werden, gefährdet.
* Verwendung des SetUID-Bits: Durch das Setzen dieses Bits (soweit ich es verstanden habe) ist es jedem einzelnen Benutzer gestattet, die markierte Datei mit Administratorrechten auszuführen, ohne dass ein Passwort erforderlich ist. **Dazu zählen auch Hacker**. Wenn Sie also dieses Bit im wg-Befehl setzen, wird der gesamte wg-Befehl mit seiner ganzen Macht verfügbar gemacht. Wenn Sie möchten, führen Sie „chmod u+s /usr/bin/wg“ als Administrator aus.
* Verwendung von sudoers: Aus meiner Sicht besteht der sicherste Weg darin, einen neuen einfachen Benutzer mit grundlegenden Rechten einzurichten und der sudoers-Datei eine einfache Zeile hinzuzufügen, die es diesem Benutzer ermöglicht, den erforderlichen Befehl auszuführen, ohne ein Passwort einzugeben – und NUR DIESES Befehl. Weitere Informationen zum Bearbeiten der sudoers-Datei und zur Verwendung von visudo finden Sie in der Dokumentation Ihrer Distribution. Der Screenshot unten zeigt, was der Datei hinzugefügt werden muss. „wireguard-monitoring-user“ ist der Benutzer Ihrer Wahl. Der Rest muss genau so sein, wie Sie es sehen.

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * remove
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * allowed-ips *
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg syncconf * *
```

Diese Einstellung ermöglicht es den `<wireguard-monitoring-user>` auf `ALL`-Hosts, den `wg show all dump`-Befehl aus dem Verzeichnis `/usr/bin/` auszuführen (muss möglicherweise auf Ihrer Distribution geändert werden), ohne dass ein Passwort erforderlich ist (§§ SSSSS_4§§).
![Bild](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## Bekannte Probleme
* keiner

## Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisiert an den Autor zu melden.
Dafür wird der [ioBroker.sentry-Plugin](https://github.com/ioBroker/plugin-sentry) verwendet. Detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie Sie es deaktivieren können, finden Sie in den [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry), wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

### Haftungsausschluss
Dieses Projekt steht in keinerlei Zusammenhang mit WireGuard. Der Name WireGuard und das WireGuard-Logo werden nur zur Bezugnahme auf dieses Projekt verwendet und sind Eigentum ihrer Eigentümer. Sie sind nicht Teil dieses Projekts.

## Urheberrechte ©
Copyright (c) 2023 grizzelbee <open.source@hingsen.de>

## Changelog
### **WORK IN PROGRESS**

### 1.5.10 (2023-08-17)
* (grizzelbee) Fix: Adapter doesn't crash anymore when user or device name is missing in config.

### 1.5.9 (2023-08-12)
* (grizzelbee) Fix: First device of any user was missing in users viewing
* (grizzelbee) New: Added an icon to peers, users, peer and user

### 1.5.8 (2023-08-11)
* (grizzelbee) Fix: Interface is now correctly set to offline if host is not reachable. 

### 1.5.7 (2023-08-10)
* (grizzelbee) Fix: Added missing icon file
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy
* (grizzelbee) Fix: Another icon fix

### 1.5.2 (2023-08-09)
* (grizzelbee) Fix: Adapter does not crash anymore when host isn't reachable
* (grizzelbee) Fix: Added .releaseconfig file 
* (grizzelbee) Fix: Added icon to interface-device
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy

### 1.5.1 (2023-08-08)
* (grizzelbee) Fix:  [#65](https://github.com/Grizzelbee/ioBroker.wireguard/issues/65) No names in object tree
* (grizzelbee) Fix:  [#64](https://github.com/Grizzelbee/ioBroker.wireguard/issues/64) Online state of interface isn't set correctly if more than one server is queried
* (grizzelbee) Upd: Dependencies got updated

### 1.5.0 (2023-06-27)
* (grizzelbee) Deprecated: The current peer name/description will be dropped in one of the next versions. So please move over to Username/Device config.
* (grizzelbee) New: Splitted Peer names in config in user and device names; So that you are able to group devices by user
* (grizzelbee) New: Some new data fields: connectedPeers, connectedPeersCount, connectedUsers, connectedUsersCount and connection states per user
* (grizzelbee) Fix:  [#61](https://github.com/Grizzelbee/ioBroker.wireguard/issues/61) Fixed continuous recreation of objects
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Dropped support for NodeJS 12
* (grizzelbee) Upd: Added support for NodeJS 18

### 1.4.1 (2022-10-26)
* (grizzelbee) New: Showing number of currently connected peers for each interface

### 1.4.0 (2022-09-09)
* (grizzelbee) New: [#37](https://github.com/Grizzelbee/ioBroker.wireguard/issues/37) Added config options for port and docker container name
* (grizzelbee) Chg: Moved over to new jsonConfig Admin UI

### 1.3.2 (2022-09-07)
* (grizzelbee) New: [#38](https://github.com/Grizzelbee/ioBroker.wireguard/issues/38) Fixed "Adapter doesn't come online" bug caused by pseudo-tty settings 

### 1.3.1 (2022-06-26)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added button to resume a single peer

### 1.3.0 (2022-06-25)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added buttons to suspend single and restore all peers of an interface
* (grizzelbee) Chg: Changed polling log entry from info to debug 
* (grizzelbee) Upd: dependencies got updated

### 1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### 1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### 1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### 1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### 1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### 1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### 1.0.0 (2022-02-25)
* (grizzelbee) New: Added individual online state indicator for each interface
* (grizzelbee) fix: Improved some data roles
* (grizzelbee) fix: Improved documentation

### v0.9.5 (2022-02-22)
* (grizzelbee) New: dropped use of wg-json script - not needed anymore
* (grizzelbee) New: making internal use of wg show all dump command and self parsing the result
* (grizzelbee) New: Added windows support by using the wg show all command
* (grizzelbee) Upd: moved dependency **admin** to globalDependency as requested during adapter review

### v0.9.2 (2022-02-20)
* (grizzelbee) Fix: removed unnecessary secret from index_m.html file
* (grizzelbee) Fix: Using info.connection of adapter to indicate that at least one interface is online.
* (grizzelbee) Fix: Updated adapter icon

### v0.9.1 (2022-02-19)
* (grizzelbee) New: Improved optical quality of admin page - no technical improvements

### v0.9.0 (2022-02-18)
* (grizzelbee) New: Improved documentation
* (grizzelbee) New: Username and password for WireGuard hosts are getting encrypted now

### v0.8.0 (2022-02-17)
* (grizzelbee) New: admin extended with second page
* (grizzelbee) New: data file is getting parsed
* (grizzelbee) New: data tree is getting populated
* (grizzelbee) New: entire basic functionality is implemented
* (grizzelbee) New: added plugin sentry

### v0.2.0 (2022-02-16)
* (grizzelbee) New: admin is working as expected
* (grizzelbee) New: first steps in backend

### v0.1.0 (2022-02-14)
* (grizzelbee) working on admin

### v0.0.1
* (grizzelbee) initial release

## License
MIT License


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