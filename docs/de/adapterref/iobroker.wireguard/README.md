---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: kROD67t+Fi60N95eUGP6pxz2GeQf4cff258561e6UpU=
---
![Logo](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wireguard-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wireguard-stable.svg)
![Test und Freigabe](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# ioBroker.wireguard

![Logo](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

## WireGuard-Adapter für ioBroker

Stellen Sie eine Verbindung zu WireGuard-Hosts her und erfassen Sie Verbindungsinformationen zu den Peers. Dieser Adapter dient als Überwachungsinstanz für Ihre WireGuard-Hosts. Er unterstützt sowohl Standardinstallationen als auch Docker.

> Wenn Ihnen dieser Adapter gefällt und Sie mich unterstützen möchten<br/>[![Spenden Sie mit PayPal](https://github.com/grizzelbee/ioBroker.wireguard/blob/main/admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Voraussetzungen

- Auf jedem Host einen SSH-Server betreiben, um die Überwachung zu gewährleisten.
- Die ausführbare Datei wg (wg.exe unter Windows) muss im Suchpfad enthalten sein.
- Benutzername und Passwort eines Benutzers mit der Berechtigung zur Ausführung des wg-Befehls

## Installationsschritte

- Prüfen Sie, ob auf Ihrem WireGuard-Host ein SSH-Server läuft. Falls nicht, installieren Sie einen. Wenn Sie mit PuTTY (oder einem ähnlichen Programm) eine Kommandozeile öffnen können, läuft auf Ihrem System ein SSH-Server.
- Stellen Sie sicher, dass der Benutzer, den Sie dafür verwenden möchten, die Anweisung ausführen kann.`wg` (Gilt für Windows und Linux). **Dieser Benutzer benötigt Administratorrechte!**
- Zusammenfassend lässt sich der Test wie folgt beschreiben: Öffnen Sie eine Remote-Befehlszeile, melden Sie sich an und führen Sie den folgenden Befehl aus:`wg show` Befehl. Wenn Sie ein korrektes Ergebnis erhalten, sind Sie fertig und können diese Daten verwenden, um den Adapter auszuführen.
- Führen Sie diese Schritte für jeden Host durch, den Sie überwachen möchten.
- Installieren Sie den Adapter und konfigurieren Sie ihn.

## Konfigurationsoptionen

Da WireGuard intern ausschließlich öffentliche Schlüssel zur Peer-Identifizierung verwendet, diese aber für Menschen schwer lesbar sind, wurde die Übersetzungsseite hinzugefügt. Sie können dort öffentliche Schlüssel und Namen hinzufügen, um die Namen in die Objektstruktur zu integrieren.

- Startseite
  - Name: Nur ein symbolischer Name für den Host, da er praktischer und einprägsamer ist als seine IP-Adresse.
  - Hostadresse: IP-Adresse des Hosts. Ein FQDN oder DNS-Name funktioniert ebenfalls. Wenn Sie WireGuard und ioBroker auf demselben Host ausführen, können Sie einfach Folgendes verwenden:`localhost` als IP.
  - Port: Portnummer Ihres SSH-Servers. Standard: 22
  - Benutzer: Der Benutzer, der das Skript auf dem Host ausführt (wird verschlüsselt gespeichert).
  - Passwort: Passwort für diesen Benutzer (wird verschlüsselt gespeichert)
  - sudo: Gibt an, ob der wg-Befehl mit sudo ausgeführt werden soll oder nicht (erfordert eine gültige Konfiguration der sudoers! -> siehe \[Sicherheitshinweise])
  - Docker: Führt einen aus`docker exec` Befehl zum Erreichen eines WireGuard-Servers innerhalb eines Docker-Containers. Bitte prüfen Sie, ob dies Ihren Anforderungen entspricht oder ob Sie auf einen unterstützten Container umsteigen können.
  - Abfrageintervall: Pause zwischen den einzelnen Abfragen in Sekunden (verzögert auch den ersten Durchlauf nach dem Start des Adapters)
  - Container: Name Ihres Docker-Containers. Häufig „wireguard“, kann aber abweichen, insbesondere wenn mehrere Container auf einem Server ausgeführt werden.
- Übersetzungsseite
  - Öffentlicher Schlüssel: Der öffentliche Schlüssel eines Ihrer Kollegen
  - Gruppenname: Ein symbolischer Name für diesen Peer
- Seite mit Konfigurationsdateien
  - Name: Muss mit dem Namen auf der Hauptseite übereinstimmen.
  - Schnittstelle: Name der in dieser Konfigurationsdatei gespeicherten Schnittstelle (wg0, wg1, ...)
  - Konfigurationsdatei: Vollständiger Pfad und Name der Konfigurationsdatei für diese Schnittstelle (/etc/wireguard/wg0.conf, ...)

### Die Ausführung der Befehlszeile hängt von den Kontrollkästchen ab:

- Kein Kontrollkästchen markiert:`wg show all dump` wird ausgeführt (für Benutzer mit Root-Rechten und Verwendung des SetUID-Bits)
- Das Kontrollkästchen „Sudo“ ist aktiviert:`sudo wg show all dump` wird ausgeführt (funktioniert mit der korrekten sudoers-Zeile)
- Das Docker-Kontrollkästchen ist aktiviert:`docker exec -it wireguard /usr/bin/wg show all dump` wird ausgeführt
- Die Kontrollkästchen für Sudo und Docker sind aktiviert:`sudo docker exec -it wireguard /usr/bin/wg show all dump` wird ausgeführt

> Wenn Sie WireGuard in einem Docker-Container verwenden, gehe ich davon aus, dass Sie mit beiden Technologien und Sicherheitskonzepten ausreichend vertraut sind, um Ihr System so zu konfigurieren, dass die gezeigten Befehle auf eine Weise ausgeführt werden, die nicht nach einem Passwort fragt.

### Docker

Grundsätzlich gilt alles, was für reguläre Installationen gesagt wird, auch für Docker und funktioniert genauso. Ausgenommen sind die notwendigen Kontrollkästchen, um den richtigen Befehl auszuführen, und die erforderliche sudoers-Zeile. Wenn Sie WireGuard in einem Docker-Container verwenden, benötigen Sie möglicherweise sudoers-Zeilen ähnlich den folgenden:

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * remove
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * allowed-ips *
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg syncconf * * 
```

Dieser Adapter erwartet den Namen`wireguard` für Ihren WireGuard-Container und den`wg` Befehl in`/usr/bin/` innerhalb des Containers. Diese Werte können derzeit nicht angepasst werden.

## So funktioniert es

- Die Info.Verbindung des Adapters wird verwendet, um anzuzeigen, dass mindestens eine WireGuard-Schnittstelle online ist und gemeldet wird.`wg show all` Wenn keine WireGuard-Schnittstelle online ist, wird nichts gemeldet. In diesem Fall wird ein Fehler protokolliert und die Ampel der Adapter leuchtet gelb.
- Dieser Adapter öffnet eine SSH-Shell auf jedem konfigurierten Host und führt die folgenden Befehle aus:`wg show all dump` Der Befehl beendet die Shell und analysiert das Ergebnis.
- Da jeder öffentliche Schlüssel einzigartig ist, verwendet der Adapter diese, um den öffentlichen Schlüssel in benutzerfreundliche, lesbare und erkennbare Namen zu übersetzen.
- WireGuard liefert leider nicht selbst den Verbindungsstatus, sondern nur die Informationen zum letzten Handshake. Da Handshakes üblicherweise alle 120 Sekunden stattfinden, berechnet dieser Adapter den Verbindungsstatus folgendermaßen: Er geht davon aus, dass ein Peer verbunden ist, wenn der letzte Handshake weniger als 130 Sekunden zurückliegt.

## Sicherheitshinweise

> Ich empfehle die Verwendung von sudoers unter Linux dringend!

Diese Sicherheitshinweise beziehen sich hauptsächlich auf Linux, da dessen Sicherheitssystem komplexer ist als das von Windows. Auf einem Windows-Server benötigen Sie lediglich einen Administratorbenutzer.`wg` Der Befehl (der den Status von WireGuard abfragt) erfordert Administratorrechte. Überlegen Sie sich daher gut, was Sie tun und wie Sie den Benutzer in der Konfiguration festlegen. Um diese Zugangsdaten bestmöglich zu schützen, werden sowohl Benutzername als auch Passwort verschlüsselt.

Grundsätzlich gibt es drei Möglichkeiten, den Befehl auszuführen:

- Verwenden Sie einen Administratorbenutzer (root oder ähnlich). Dies funktioniert zwar, gefährdet aber Ihren gesamten Server, falls die Zugangsdaten verloren gehen oder gestohlen werden.
- Verwendung des SetUID-Bits: Durch Setzen dieses Bits (soweit ich es verstanden habe) kann jeder Benutzer die markierte Datei mit Administratorrechten und ohne Passwort ausführen. **Dies schließt auch Hacker ein** . Das Setzen dieses Bits im Befehl \`wg\` legt also dessen gesamte Macht offen. Wenn Sie dies tun möchten, führen Sie folgenden Befehl aus:`chmod u+s /usr/bin/wg` als Administrator.
- Verwendung von sudoers: Meiner Ansicht nach ist die sicherste Methode, einen neuen Benutzer mit grundlegenden Berechtigungen anzulegen und der sudoers-Datei eine Zeile hinzuzufügen, die diesem Benutzer erlaubt, den benötigten Befehl ohne Passworteingabe auszuführen – und zwar NUR DIESEN Befehl. Genaue Informationen zum Bearbeiten der sudoers-Datei und zur Verwendung von visudo finden Sie in der Dokumentation Ihrer Distribution. Der Screenshot unten zeigt, was der Datei hinzugefügt werden muss.`wireguard-monitoring-user` ist der Benutzer Ihrer Wahl. Der Rest muss genau so sein, wie Sie es sehen.
  ```
  #iobroker.wireguard adapter
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * remove
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * allowed-ips *
  wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg syncconf * * 
  ```
  Diese Einstellung ermöglicht Folgendes:`<wireguard-monitoring-user>` An`ALL` Hosts, um die Ausführung durchzuführen`wg show all dump` Befehl aus dem Verzeichnis`/usr/bin/` (muss möglicherweise in Ihrer Distribution angepasst werden) ohne Passwort erforderlich (`NOPASSWD` ).![Bild](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## bekannte Probleme

- keiner

## sentry.io

Dieser Adapter nutzt sentry.io, um Details zu Abstürzen zu erfassen und diese automatisch an den Autor zu melden. Hierfür wird das [Plugin ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Auf der [Homepage des Plugins](https://github.com/ioBroker/plugin-sentry) finden Sie detaillierte Informationen zu dessen Funktionsweise, den erfassten Daten und wie Sie die Erfassung deaktivieren können, falls Sie den Autor nicht mit Ihren Absturzinformationen unterstützen möchten.

### Haftungsausschluss

Dieses Projekt steht in keinerlei Verbindung zu WireGuard. Der Name WireGuard und das WireGuard-Logo werden lediglich zur Kennzeichnung dieses Projekts verwendet und sind Eigentum ihrer jeweiligen Inhaber. Sie sind nicht Bestandteil dieses Projekts.

## Copyright

Copyright © 2025 grizzelbee <open.source@hingsen.de>

## Changelog
### 1.8.0 (2025-02-15)
- (grizzelbee) Upd: [#137](https://github.com/Grizzelbee/ioBroker.wireguard/issues/137)minor fixes for adapter checker
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: Removed snyk
- (grizzelbee) Fix: [#138](https://github.com/Grizzelbee/ioBroker.wireguard/issues/138) moved  to eslint 9 and fixed new lint errors
- (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.wireguard/issues/119) Fixed log warning "invalid JsonConfig"

### 1.7.0 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: [#120](https://github.com/Grizzelbee/ioBroker.wireguard/issues/120) Fixed some issues mentioned by adapter-checker

### 1.6.4 (2024-05-08)
- (grizzelbee) Upd: Dependencies got updated

### 1.6.3 (2024-04-16)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Removed annoying warning when setting null or undefined values (introduced in v1.6.2)
* (grizzelbee) Upd: Requiring at least admin v6.13.16

### 1.6.2 (2024-03-26)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: fixed sentry issues WIREGUARD-2B & WIREGUARD-2C
* (grizzelbee) Upd: Adapter requires at least node 18.x

### 1.6.1 (2023-09-14)
* (mcm1957) Fix: [#90](https://github.com/Grizzelbee/ioBroker.wireguard/pull/90) adapter-core 3.x.x is known to fail during installation at node 14 as npm 6 fails to install peerDependencies. So this adapter requires node 16 or newer
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: removed some old news entries in io-package file

### 1.5.11 (2023-08-30)
* (grizzelbee) Fix: [#88](https://github.com/Grizzelbee/ioBroker.wireguard/issues/88) Avoid warning: Cannot read properties of undefined (reading 'at') when user- or devicename is empty

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
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.wireguard/issues/65) No names in object tree
* (grizzelbee) Fix: [#64](https://github.com/Grizzelbee/ioBroker.wireguard/issues/64) Online state of interface isn't set correctly if more than one server is queried
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