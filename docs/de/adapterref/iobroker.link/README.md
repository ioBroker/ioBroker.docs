---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.link/README.md
title: ioBroker.link
hash: Ufskz6wegWqZ9PHHBgaFmbPasVdORL/Tx39x2cF3imU=
---
![Logo](../../../en/adapterref/iobroker.link/admin/link.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.link.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.link.svg)
![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)

# IoBroker.link
Dieser Adapter ermöglicht eine sichere Verbindung über die [ioBroker.link](https://iobroker.link/) Cloud.

## FAQ
### Was kann ich mit diesem Adapter machen?
Dieser Adapter ermöglicht eine sichere Verbindung zu einer lokalen ioBroker-Installation und anderen Servern/Geräten in Ihrem lokalen Netzwerk hinter einem DSL-Modem/Router/Firewall. Die Verbindung erfolgt über öffentlich zugängliche `ioBroker.link` Cloud (Link-Cloud). Über die Link-Cloud können sogar mehrere lokale ioBroker-Installationen eingerichtet und aufgerufen werden.

### Was ist der Unterschied zu einer Portweiterleitung, die ich auf meinem Router konfigurieren könnte?
Während Sie auf Ihrem Router eine Portweiterleitung konfigurieren und so von überall auf Ihre lokale ioBroker-Installation zugreifen können, bietet die Link-Cloud die folgenden wesentlichen Vorteile:

- Auf Ihrem Router müssen keine Ports zum Internet geöffnet werden
- Keine öffentliche IP oder (dynamischer) DNS-Name für Ihre lokale ioBroker-Installation erforderlich
- link-cloud kümmert sich um Authentifizierung und Autorisierung
- link-cloud sichert eine Verbindung mit SSL/TLS
- link-cloud stellt ein Audit-Log bereit
- Auf mehrere lokale ioBroker-Installationen kann über dieselbe Benutzeroberfläche des Link-Cloud-Servers zugegriffen werden
- Der `ioBroker.link`-Adapter fungiert als Reverse-Proxy und ermöglicht den Zugriff auf andere Server/Geräte in Ihrem lokalen Netzwerk, die HTTP/TCP/UDP-Protokolle unterstützen
- Sie können einer dritten Person einen vorübergehenden oder dauerhaften Zugriff auf Ihre lokale <sup>ioBroker</sup> -Installation gewähren, z. B. um Geräteausfälle zu beheben, ohne dass Sie Ihr Passwort preisgeben oder Anmeldeinformationen verwalten müssen

### Wie kann eine Verbindung zu meiner lokalen ioBroker-Installation hergestellt werden, wenn keine öffentliche IP und keine Ports geöffnet sind?
Die Link-Cloud verbindet sich nie mit Ihrer lokalen Installation, es ist der `ioBroker.link` Adapter, der lokal läuft und eine Verbindung zur Link-Cloud initiiert, falls es eine Verbindungsanfrage gibt.

### Was ist eine _Verbindungsanfrage_?
Eine Verbindungsanfrage ist die Absicht, eine Verbindung zu einer lokalen ioBroker-Installation herzustellen, die von einer authentifizierten und autorisierten Person über die Link-Cloud durchgeführt wird.

### Wie erkennt der Adapter `ioBroker.link`, dass eine Verbindungsanfrage vorliegt?
Ein `ioBroker.link`-Adapter prüft regelmäßig auf ausstehende Verbindungsanforderungen, indem er die Verbindungswolke abfragt. Das Abfrageintervall können Sie in den Einstellungen des Adapters `ioBroker.link` einstellen.

### Wie kann ich sicherstellen, dass der `ioBroker.link`-Adapter eine Verbindung zur Link-Cloud aufbaut und nicht zu einem Man-in-the-Middle?
Der ioBroker.link-Adapter kann nur eine Verbindung zu einem Server herstellen, der ein gültiges SSL-Zertifikat präsentiert, das für ioBroker.link ausgestellt wurde.

### Wie identifiziert und autorisiert die Link-Wolke alle `ioBroker.link`-Adapter, die nach ausstehenden Verbindungsanfragen fragen oder eine Verbindung aufbauen?
Jeder `ioBroker.link`-Adapter generiert sein eigenes eindeutiges 2048-Bit-Schlüsselpaar. Bei der Registrierung bei link-cloud übermittelt ein Adapter seinen öffentlichen Schlüssel. Bei jeder nachfolgenden Anfrage an die Link-Cloud (Prüfung auf ausstehende Verbindungsanfragen, Akzeptieren oder Ablehnen einer ausstehenden Verbindung, Schließen einer offenen Verbindung usw.) autorisiert sich der Adapter selbst, indem er ein JSON Web Token (JWT) bereitstellt, das mit dem privaten Schlüssel des Adapters signiert ist . Die Link-Cloud verifiziert die Signatur von JWT mit dem gespeicherten öffentlichen Schlüssel und akzeptiert oder lehnt die Verbindung ab.

### Kann sich ein Adapter mit dem Adapter-JWT eines anderen mit einer Link-Cloud verbinden?
Nein. Ein Adapter signiert ein JWT mit seinem eigenen eindeutigen privaten Schlüssel, der die lokale Installation nie verlässt. Die Link-Cloud verwendet den entsprechenden öffentlichen Schlüssel, um die Signatur zu überprüfen.

### Kann ich die Sicherheit erhöhen, indem ich die zur Autorisierung meines Adapters verwendeten Schlüssel rotiere?
Ja. Die Schlüssel werden im Ordner /keys Ihrer Adapterinstallation gespeichert. Löschen Sie alle Dateien in diesem Ordner und starten Sie den Adapter neu. Der Adapter erstellt beim Start ein neues Schlüsselpaar und aktualisiert die Registrierung bei Link-Cloud, indem er den neuen öffentlichen Schlüssel sendet.

### Wie wird eine aufgebaute Verbindung selbst gesichert?
Bei einer ausstehenden Verbindungsanfrage baut ein `ioBroker.link`-Adapter zunächst einen SSH-Tunnel zur Link-Cloud auf und akzeptiert die eingehende Verbindung. Beide Seiten autorisieren sich mittels Zertifikaten. Sobald der SSH-Tunnel eingerichtet ist, beginnt die eigentliche Kommunikation. Sobald die Verbindung geschlossen wird, z. B. durch einen Benutzer über die Link-Cloud-Server-UI, wird der SSH-Tunnel geschlossen und es ist keine Kommunikation mehr möglich.

### Kann ich mich auch über die Link-Cloud mit meinen lokalen Geräten verbinden?
Ja. Wenn Ihre Geräte das HTTP-Protokoll unterstützen, können Sie über die Link-Cloud darauf zugreifen. Jedes Gerät, mit dem Sie sich über die Link-Cloud verbinden möchten, muss explizit in den `ioBroker.link` Adaptereinstellungen konfiguriert werden. Standardmäßig kann kein Gerät verbunden werden. Auch die ioBroker.admin Web-UI muss erst konfiguriert werden, um sich verbinden zu können.

### Was muss ich installieren, um mich über die Link-Cloud mit meinen lokalen Geräten zu verbinden?
Eine Verbindung zu lokalen Geräten, die das HTTP-Protokoll unterstützen, wird über den Browser Ihrer Wahl hergestellt. Es ist keine zusätzliche Software erforderlich.

### Mein lokales Gerät unterstützt nur das TCP/UDP-Protokoll. Ist auch eine Verbindung zu TCP/UDP-Geräten möglich?
Ja. Um sich mit lokalen TCP/UDP-Geräten zu verbinden, verwenden Sie bitte ioBroker.link-box: https://www.npmjs.com/package/iobroker.link-box

### Wie gewähre ich Zugriff auf meine lokale ioBroker-Installation?
Wer Zugriff auf eine lokale ioBroker Installation erhalten soll, muss explizit in den `ioBroker.link` Adaptereinstellungen konfiguriert werden. Standardmäßig hat niemand Zugriff. Das bedeutet, dass Sie sich auch selbst konfigurieren müssen, um sich mit Ihrer eigenen lokalen ioBroker-Installation verbinden zu können.

### Wie und wo erstelle ich den Benutzer, dem ich Zugriff auf meine lokale Installation gewähren möchte?
Zunächst müssen Sie ein kostenloses Konto bei https://iobroker.pro erstellen. Nach der Erstellung können Sie die registrierte E-Mail in der Einstellung _Erlaubte Benutzer_ des Adapters `ioBroker.link` konfigurieren. In der Adapterkonfiguration muss kein Passwort angegeben werden.

### Ich habe bereits ein Konto auf https://iobroker.pro. Kann ich es für die Link-Cloud verwenden?
Ja. Sie können ein bereits bestehendes https://iobroker.pro-Konto verwenden.

### Ist es möglich, https://iobroker.pro und Link-Cloud-Dienste gleichzeitig zu nutzen?
Ja. Zwischen diesen beiden Diensten bestehen keine Abhängigkeiten. Sie können sie separat oder parallel verwenden.

### Warum verwendet die Link-Cloud https://iobroker.pro-Konten?
Die Link-Cloud verwendet die https://iobroker.pro-Konten nicht. Keine mit https://iobroker.pro-Konten verbundenen Informationen werden an die Link-Cloud übertragen/verfügbar. Die Link-Cloud föderiert lediglich die Authentifizierung an https://iobroker.pro. Die Autorisierung wiederum wird vollständig von der Link-Cloud abgewickelt.

### Wie kann ich den Zugriff auf meine lokale Installation widerrufen?
Sie können die Zugriffsrechte einzelner Personen widerrufen, indem Sie deren E-Mails aus der Einstellung _Erlaubte Benutzer_ des Adapters `ioBroker.link` entfernen. Alternativ können Sie den Zugriff auf Ihre lokale Installation vollständig verhindern, indem Sie die Einstellung _Erlaubte Benutzer_ leer lassen. Auch das Stoppen oder Entfernen des `ioBroker.link`-Adapters verhindert jeglichen Zugriff über die Link-Wolke.

### Fallen bei der Nutzung der Link-Cloud Gebühren an?
Im Moment werden keine Gebühren erhoben und die Nutzung der Link-Cloud ist völlig kostenlos. Es ist auch unabhängig, ob Sie Ihren kostenlosen oder kostenpflichtigen https://iobroker.pro-Account verwenden. Bitte beachten Sie, dass sich dies in Zukunft ändern könnte.

### Warum beabsichtigen Sie, für diesen einfachen Service Gebühren zu erheben?
Auch diese einfache Dienstleistung erfordert eine rund um die Uhr laufende Infrastruktur und verursacht Kosten. Die Sicherstellung der Hochverfügbarkeit dieses Dienstes, die Fehlerbehebung bei Ausfällen und die Verbesserung oder das Hinzufügen neuer Funktionen nehmen einen erheblichen Teil unserer Zeit in Anspruch. Um uns der Weiterentwicklung zu widmen, brauchen wir Chips. Das würde es unseren Frauen ermöglichen, einkaufen zu gehen und uns mehr Zeit geben, uns um dieses Projekt zu kümmern.

### Was sind die Einschränkungen der Link-Cloud?
Momentan kann nur eine einzige Verbindung zu einer lokalen ioBroker-Installation geöffnet werden. Das bedeutet, wenn mehreren Benutzern Zugriffsberechtigungen für eine lokale Installation erteilt werden, kann sich jeweils nur ein Benutzer verbinden. Außerdem ist die einzige Verbindung pro Benutzer zulässig. Das bedeutet, dass derselbe Benutzer, dem die Zugriffsberechtigung für mehrere lokale Installationen gewährt wurde, nur auf eine Installation gleichzeitig zugreifen kann.

### Wie kann ich verfolgen, wer wann auf meine lokale Installation zugegriffen hat?
Die Metadaten aller angeforderten Verbindungen werden beibehalten und können unter https://iobroker.link eingesehen werden.

### Welche Ports müssen in der Firewall verfügbar sein?
Folgende Ports auf `ioBroker.link` Server müssen erreichbar sein: 5000-5100 (ausgehend)

## Adapterkonfiguration :: Haupteinstellungen
### Kundenname
Dies ist der Name Ihrer lokalen ioBroker-Installation. Sie können es frei wählen. Es hilft Ihnen, verschiedene ioBroker-Installationen zu unterscheiden, während Sie eine Verbindungsanfrage über die Link-Cloud stellen.

### Server-URI
Dies ist der Domänenname der Link-Wolke. Diese Einstellung ist mit https://iobroker.link vorkonfiguriert und sollte geändert werden.

### Proxy-URI
Wenn sich Ihre ioBroker-Installation hinter einem Proxy befindet, können Sie den Proxy-Server hier konfigurieren. Proxy kann hier definiert werden als: *http://proxy:8080* oder über die Umgebungsvariable **HTTPS_PROXY**.

### Abfrageintervall (Sek.)
Definiert, wie oft Ihr Adapter die Link-Cloud nach ausstehenden Verbindungsanforderungen abfragt.
Empfohlene Einstellung: 10

### Zugelassene Benutzer
Definiert die vorhandenen https://iobroker.pro-Konten, denen Zugriffsberechtigungen für Ihre lokale ioBroker-Installation gewährt werden müssen.

Falls Sie sich und Ihrer Frau Zugriff gewähren möchten und vorausgesetzt, Sie haben beim Erstellen der https://iobroker.pro-Konten me@gmail.com und darling@gmail.com angegeben, enthält die Einstellung _Erlaubte Benutzer_ diese beiden E-Mail-Adressen. Mailadressen.

## Adapterkonfiguration :: Geräte
Hier definieren Sie eine Liste von Geräten, auf die über die Link-Cloud zugegriffen werden kann.

### Aktiviert
Legt fest, ob das konfigurierte Gerät erreichbar sein soll.

### Name
Der frei gewählte Name des Geräts. Es hilft, zwischen verschiedenen Geräten zu unterscheiden, während man sich über die Link-Cloud verbindet.

###IP
Die IP-Adresse eines Geräts, das in Ihrem lokalen Netzwerk verbunden werden soll. Sie können einen Hostnamen, z. B. _localhost_, anstelle der IP-Adresse angeben, aber beachten Sie, dass dieser Name auf dem Computer auflösbar sein muss, auf dem Ihr ioBroker-Link-Adapter läuft, und dass Hostnamen nicht für UDP-Geräte verwendet werden können.

### Hafen
Die Portnummer, die Ihr Gerät auf eingehende Verbindungen überwacht.

### Typ
- TCP – für Geräte, die das TCP- und/oder HTTP-Protokoll unterstützen
- UDP - für Geräte, die das UDP-Protokoll unterstützen

## Adapterkonfiguration :: Gerätekonfigurationsbeispiel
Um Ihr `ioBroker.admin` Web-UI über die Link-Cloud zugänglich zu machen, würden Sie es unter _Adapterkonfiguration :: Geräte_ wie folgt konfigurieren:

- aktiviert: aktiviert
- Name: ioBrokerAdminWebUI (oder wie auch immer Sie möchten)
- IP: localhost (oder 127.0.0.1)
- Port: 8081 (wenn Sie den Standardport von ioBroker.admin nicht geändert haben)
- Typ: TCP

Um auf die Web-UI Ihres Routers zuzugreifen, haben Sie möglicherweise eine Konfiguration wie folgt:

- aktiviert: aktiviert
- Name: Router
- IP: 192.168.0.1 (oder was auch immer die lokale Netzwerk-IP Ihres Routers ist)
- Port: 80 (wenn Sie den Standardport der Web-Benutzeroberfläche des Routers nicht geändert haben)
- Typ: TCP

Um auf den Schnappschuss oder Live-Stream Ihrer IP-Kamera zuzugreifen, konfigurieren Sie ein Gerät wie folgt:

- aktiviert: aktiviert
- Name: Front-Door-Snapshot (oder wie auch immer Sie wollen)
- IP: HTTP-Endpunkt Ihrer Kamera, z. B.: _http://192.168.0.178:8000/tmpfs/snap.jpg_
- Port: ignoriert, soll Teil der HTTP-Endpunktkonfiguration sein
- Typ: TCP

Fügen Sie die Anmeldedaten Ihrer Kamera **NICHT** als Anforderungsparameter in den konfigurierten HTTP-Endpunkt ein: _http://192.168.0.178:8000/tmpfs/snap.jpg?usr=admin&pwd=admin_

Stellen Sie sie stattdessen bereit, wenn Sie beim Herstellen einer Verbindung dazu aufgefordert werden.

<!--

### **IN ARBEIT** -->

## Changelog
### 0.5.12 (2022-10-27)
* (bluefox) Added warning if UUID is not unique

### 0.5.11 (2020-12-09)
* (bluefox) Fixed the type of `info.connection` state

### 0.5.10 (2020-12-09)
* (bluefox) Ignore errors at 4:00 because of the server restart

### 0.5.6 (2019-12-02)
* (gh-got) multi-factor connection approval
* (gh-got) Implemented the acknowledgment via telegram

### 0.5.2 (2019-11-26)
* (bluefox) Added user disable/enable

### 0.4.4 (2019-07-16)
* (gh-got) closing tunnels in case server considers an agent as offline
* (gh-got) fixed timeout to query active connection status

### 0.4.2 (2019-03-28)
* (gh-got) agents will report own version by registration

### 0.4.0 (2019-03-10)
* (bluefox) Made this adapter to be compatible with the new server

### 0.3.7 (2018-09-23)
* (bluefox) Do not connect to the cloud if no configuration defined

### 0.3.6 (2018-06-26)
* (bluefox) The download of SSF from GitHub depending on plattform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2022 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).