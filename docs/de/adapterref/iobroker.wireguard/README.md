---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: 54SbCSmbVHFPAQ4YRK3Aw20SEbncQGbr0fB2dNpTqX0=
---
![Logo](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wireguard-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wireguard-stable.svg)
![NPM](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![Logo](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![Testen und freigeben](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## Wireguard-Adapter für ioBroker
Stellen Sie eine Verbindung zu WireGuard-Hosts her und holen Sie sich Verbindungsinformationen zu Peers. Dieser Adapter soll eine Überwachungsinstanz für Ihre WireGuard-Hosts sein. Es unterstützt auch einfache Installationen und Docker.

&gt; Wenn Ihnen dieser Adapter gefällt und Sie erwägen, mich zu unterstützen<br/> &gt; [![Mit payPal spenden](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Voraussetzungen
* SSH-Server auf jedem zu überwachenden Host ausführen
* Die ausführbare wg-Datei (wg.exe unter Windows) muss sich im Suchpfad befinden
* Benutzername und Passwort eines Benutzers mit der Berechtigung, den wg-Befehl auszuführen

## Installationsschritte
* Überprüfen Sie, ob auf Ihrem WireGuard-Host ein SSH-Server ausgeführt wird. Wenn nicht - installieren Sie eine. Wenn Sie eine Befehlszeile mit Putty (oder ähnlichem) öffnen können, führen Sie einen SSH-Server aus.
* Stellen Sie sicher, dass der Benutzer, den Sie dafür verwenden möchten, in der Lage ist, `wg` auszuführen (das gleiche für Windows und Linux). **Dieser Benutzer benötigt Administratorrechte!**
* Um den Test zusammenzufassen: Öffnen Sie eine Remote-Befehlszeile, melden Sie sich an und führen Sie den Befehl „wg show“ aus. Wenn Sie ein korrektes Ergebnis erhalten, sind Sie fertig und können diese Daten verwenden, um den Adapter auszuführen.
* Tun Sie dies für jeden Host, den Sie überwachen möchten
* Installieren Sie den Adapter und konfigurieren Sie ihn

## Konfigurationsoptionen
Da WireGuard intern nur die öffentlichen Schlüssel zur Identifizierung von Peers verwendet, diese aber für Menschen ziemlich umständlich zu lesen und zu erkennen sind, wurde die Übersetzungsseite hinzugefügt. Fühlen Sie sich frei, öffentliche Schlüssel und Namen hinzuzufügen, um die Namen in den Objektbaum zu integrieren.

* Hauptseite
  - Name: Nur ein symbolischer Name für den Host, da er bequemer und besser einprägsam ist als seine IP-Adresse
  - Hostadresse: IP-Adresse des Hosts. Ein FQDN- oder DNS-Name funktioniert auch. Wenn Sie WireGuard und ioBroker auf demselben Host ausführen, können Sie einfach „localhost“ als IP verwenden.
  - Benutzer: Der Benutzer, der das Skript auf dem Host ausführt (wird verschlüsselt gespeichert)
  - Passwort: Passwort für diesen Benutzer (wird verschlüsselt gespeichert)
  - sudo: ob der wg-Befehl mit sudo ausgeführt werden soll oder nicht (erfordert gültige Konfiguration von sudoers! -> siehe [Sicherheitshinweise])
  - Docker: Führt einen „docker exec“-Befehl aus, um einen Wireguard-Server innerhalb eines Docker-Containers zu erreichen. Bitte prüfen Sie, ob es Ihren Anforderungen entspricht oder ob Sie zu einem unterstützten Container wechseln können.
  - Abfrageintervall: Pause zwischen jeder Abfrage in Sekunden (verzögert auch den ersten Lauf nach Adapterstart)
* Übersetzungsseite
    - Öffentlicher Schlüssel: Der öffentliche Schlüssel eines Ihrer Kollegen
    - Gruppenname: Ein symbolischer Name für diesen Peer

### Ausgeführte Befehlszeile hängt von Kontrollkästchen ab:
* Keine Checkbox aktiviert: `wg show all dump` wird ausgeführt (für root-ähnliche Benutzer und Verwendung des SetUID-Bits)
* Sudo-Kontrollkästchen ist aktiviert: `sudo wg show all dump` wird ausgeführt (funktioniert mit der richtigen sudoers-Zeile)
* Das Docker-Kontrollkästchen ist aktiviert: `docker exec -it wireguard /usr/bin/wg show all dump` wird ausgeführt
* Sudo- und Docker-Kontrollkästchen sind aktiviert: `sudo docker exec -it wireguard /usr/bin/wg show all dump` wird ausgeführt

> Wenn Sie WireGuard in einem Docker-Container verwenden, gehe ich davon aus, dass Sie mit beiden Technologien und Sicherheitskonzepten vertraut genug sind, um Ihr System so zu konfigurieren, dass die angezeigten Befehle so ausgeführt werden, dass kein Passwort erforderlich ist.

### Docker
Grundsätzlich gilt alles, was zu regulären Installationen gesagt wurde, auch für Docker und funktioniert genauso.
Außer den erforderlichen Kontrollkästchen, um den richtigen Befehl auszuführen, und der erforderlichen sudoers-Zeile. Wenn Sie WireGuard in einem Docker-Container verwenden, benötigen Sie möglicherweise eine Sudoers-Zeile ähnlich der folgenden:

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
```

Dieser Adapter erwartet den Namen `wireguard` für Ihren WireGuard-Container und den Befehl `wg` in `/usr/bin/`innerhalb des Containers.
Diese Werte können derzeit nicht angepasst werden.

## Wie es funktioniert
* info.connection des Adapters wird verwendet, um anzuzeigen, dass mindestens eine WireGuard-Schnittstelle online ist und von `wg show all` gemeldet wird. Wenn keine Wireguard-Schnittstelle online ist, wird nichts gemeldet. In diesem Fall wird ein Fehler protokolliert und die Ampel des Adapters wird gelb.
* Dieser Adapter öffnet eine ssh-Shell auf jedem konfigurierten Host, führt den Befehl „wg show all dump“ aus, löscht die Shell und parst das Ergebnis.
* Da jeder öffentliche Schlüssel einzigartig ist, verwendet der Adapter sie, um den öffentlichen Schlüssel in benutzerfreundliche, lesbare und erkennbare Namen zu übersetzen.
* WireGuard stellt den Zustand "verbunden" leider nicht selbst bereit. Es liefert nur die letzten Handshake-Informationen.

Da Handshakes normalerweise alle 120 Sekunden stattfinden, berechnet dieser Adapter den Verbindungsstatus so, dass er davon ausgeht, dass ein Peer verbunden ist, wenn der letzte Handshake weniger als 130 Sekunden zuvor empfangen wurde.

## Sicherheitshinweise
> Ich empfehle die Verwendung von sudoers unter Linux!

Diese Sicherheitshinweise beziehen sich hauptsächlich auf Linux, da dessen Sicherheitssystem komplexer ist als das von Windows. Auf einem Windows-Server müssen Sie lediglich einen Administrator verwenden.
Da der Befehl `wg` (der ausgeführt wird, um den Status von WireGuard abzurufen) Administratorrechte erfordert, sollten Sie gut überlegen, was Sie hier tun und wie Sie den Benutzer konfigurieren, den Sie in der Konfiguration platzieren.
Um diese Zugangsdaten so gut wie möglich zu schützen, werden sowohl Benutzername als auch Passwort verschlüsselt.

Grundsätzlich gibt es drei Möglichkeiten, den Befehl auszuführen:

* Verwenden Sie einen administrativen Benutzer (root oder ähnlich). Dies wird funktionieren, aber Ihren gesamten Server preisgeben, falls die Anmeldeinformationen verloren gehen/gestohlen werden.
* Verwendung des SetUID-Bits: Durch das Setzen dieses Bits (soweit ich verstanden habe) kann jeder Benutzer die markierte Datei mit Administratorrechten ausführen, ohne ein Passwort zu benötigen. **Dazu gehören Hacker**. Das Setzen dieses Bits im wg-Befehl macht also den gesamten wg-Befehl mit all seiner Kraft verfügbar. Wenn Sie möchten, führen Sie `chmod u+s /usr/bin/wg` als Administrator aus.
* Verwendung von sudoers: Aus meiner Sicht ist der sicherste Weg, einen neuen einfachen Benutzer mit grundlegenden Rechten einzurichten und der sudoers-Datei eine einfache Zeile hinzuzufügen, die es diesem Benutzer ermöglicht, den erforderlichen Befehl ohne Eingabe eines Passworts auszuführen - und NUR DIES Befehl. Bitte beziehen Sie sich auf die Dokumentation Ihrer Distribution für korrekte Informationen zur Bearbeitung der sudoers-Datei und zur Verwendung von visudo. Der folgende Screenshot zeigt, was der Datei hinzugefügt werden muss. `wireguard-monitoring-user` ist der Benutzer Ihrer Wahl. Der Rest muss genau so sein, wie Sie sehen.

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
```

Diese Einstellung erlaubt `<wireguard-monitoring-user>` auf `ALL` Hosts, den Befehl `wg show all dump` aus dem Verzeichnis `/usr/bin/` auszuführen (muss möglicherweise auf Ihrer Distribution geändert werden), ohne dass ein Passwort erforderlich ist (§§ SSSSS_4§§).
![Bild](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## Bekannte Probleme
* keiner

## Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden.
Dafür wird der [ioBroker.sentry-Plugin](https://github.com/ioBroker/plugin-sentry) verwendet. Bitte beachten Sie die [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry) für detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie es deaktiviert werden kann, wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

### Haftungsausschluss
Dieses Projekt hat in keiner Weise mit WireGuard zu tun. Der Name WireGuard und das WireGuard-Logo werden nur verwendet, um auf dieses Projekt hinzuweisen, und sind Eigentum ihrer Eigentümer. Sie sind nicht Teil dieses Projekts.

## Urheberrechte ©
Copyright (c) 2022 grizzelbee <open.source@hingsen.de>

## Changelog
### v1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### v1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### v1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### v1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### v1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### v1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### v1.0.0 (2022-02-25)
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