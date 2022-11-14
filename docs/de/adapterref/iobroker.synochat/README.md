---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synochat/README.md
title: <img src="docs/images/synochatLogo.png" alt="Zeichnung"/>Synology-Chat-Adapter für ioBroker
hash: DzT6jCvzbCdQRXm+MK1pxWib1vd3CPkC2plPyUPr+Ok=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.synochat.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synochat.svg)
![Anzahl der Installationen](https://iobroker.live/badges/synochat-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/synochat-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/phoeluga/iobroker.synochat.svg)
![NPM](https://nodei.co/npm/iobroker.synochat.png?downloads=true)

#<img src="docs/images/synochatLogo.png" alt="Zeichnung"/> Synology-Chat-Adapter für ioBroker
![Testen und freigeben](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)

[![Spenden][Spenden-Abzeichen2]][Spenden-Link]

## Was ist es?
Dieser Adapter stellt eine Schnittstelle zwischen Synology Chat und ioBroker bereit. Zu diesem Zweck werden die von Synology Chat bereitgestellten Standard-Integrationsfunktionen und die entsprechenden REST-API-Endpunkte verwendet.
Eingehende und ausgehende Integrationen können verwendet werden, um Nachrichten an den Chat-Server von Synology zu senden oder ein Nachrichtenobjekt in Ihrer ioBroker-Instanz zu aktualisieren, um Nachrichten zu empfangen.

---

# Manuell
## 1. Installation
Der Adapter kann aus dem Adapterabschnitt in Ihrer ioBroker-Installation instanziiert werden.
Weitere Informationen finden Sie im offiziellen [ioBroker-Dokumentation](https://www.iobroker.net/#de/documentation/admin/adapter.md).

## 2. Konfiguration
<div id="synology-chat-configuration"></div>

### 2.1. Synology-Chat-Konfiguration
- Der Synology Chat bietet die Möglichkeit ein- und ausgehende Nachrichten zu verwalten. Im Folgenden werden beide Optionen näher betrachtet.

- Um Nachrichten über die Synology Chat-Oberfläche zu erstellen, muss eine Integration in Synology Chat erstellt werden:

![SynoChatChannel](./docs/images/diSynoChatChannel.png) ![SynoChat-Integrationen](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrations.png)

  #### 2.1.1. Eingehende Integration
Für die Einbindung einer eingehenden Nachricht in den Synology-Chat wird ein Token benötigt, das der bei der Erstellung generierten URL entnommen werden kann.
![SynoChat-IntegrationIncoming](./docs/images/diSynoChatIntegrationIncoming.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrationIncomingSettings.png)

<div id="synologyChatConfigurationOutgoingIntegration"></div>

  #### 2.1.1. Ausgehende Integration
Für die Integration einer ausgehenden Nachricht in den Synology-Chat muss eine Web-Hook-URL angegeben werden. Sie erhalten diese Web-Hook-URL von den Instanzobjekten, nachdem Sie den `synochat`-Adapter instanziiert haben. Weitere Details finden Sie in [3. Nutzung > 3.1 Allgemeines](#webHookLocation) ![SynoChat-IntegrationIncoming](./docs/images/diSynoChatIntegrationOutgoing.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrationOutgoingSettings.png)

***HINWEIS:*** *Der Kanaltyp (eingehend; ausgehend) wird aus der Perspektive des Synology-Chats angegeben. „Eingehend“ bedeutet beispielsweise, dass die Nachrichten an den Chat-Server von Synology gesendet werden.*

Weitere Einzelheiten zur Handhabung von Integrationen im Synology-Chat finden Sie in der offiziellen Dokumentation von Synology [HIER](https://kb.synology.com/DSM/help/Chat/chat_integration)

### 2.2. Konfiguration der ioBroker-Adapterinstanz
- Die Konfiguration dieses Adapters kann in den Instanzeinstellungen vorgenommen werden.

    #### 2.2.1. Haupteinstellungen:
	![IobrokerInstanceSettingsMainSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerInstanceSettingsMainSettings.png)

* **Synology-URL/IP**

Mit dieser Eigenschaft wird eine URL zu Ihrer Synology-Chat-App bereitgestellt. Bitte achten Sie darauf, eine absolute URL einschließlich `http://` oder `https://` zu verwenden und kein Postfix wie `/` bereitzustellen.
Hinter der URL kann wie gewohnt mit `:` ein bestimmter Port angegeben werden.

***Beispiel für gültige Werte:***

- https://mychat.mydomain.tld
- https://192.168.1.1:8080

    * **SSL-Zertifikat validieren**

Es wird natürlich immer empfohlen, Datenübertragungen zu verschlüsseln.
Häufig werden selbstsignierte Zertifikate für verschlüsselte Verbindungen in Heimumgebungen verwendet. In diesem Fall kann es erforderlich sein, die SSL-Zertifikatsprüfung einer HTTP-Verbindung zu deaktivieren.
Deaktivieren Sie diese Eigenschaft, um die Zertifikatvalidierung zu deaktivieren.

* **Hostname / IP-Adresse der ioBroker-Instanz**

        Mit dieser Eigenschaft können Sie den Hostnamen oder die IP-Adresse angeben, unter der Ihre ioBroker-Instanz per URL erreichbar ist. Dieser Wert wird nach der anfänglichen Adapter-Instanziierung automatisch auf die aktuelle IP-Adresse des Host-Betriebssystems Ihrer ioBroker-Installation gesetzt.

Bei Verwendung von ioBroker als Docker-Instanz kann es erforderlich sein, diesen Wert zu ändern, z. wenn ein Reverse-Proxy oder ähnliches verwendet wird, um Ihre ioBroker-Instanz zu erreichen.

Dieser Wert wird verwendet, um die Web-Hook-URL für Kanäle zu generieren, die Nachrichten vom Synology-Chat-Server erhalten.

<div id="configurationAdapterWebInstance"></div>

* **Webinstanz für Nachrichten, die vom Synology-Chat an die ioBroker-Adapterinstanz gesendet werden**

        Der Adapter `synochat` verwendet einen Adapter `web`, um Web-Hooks verfügbar zu machen. Sie müssen eine bestimmte Instanz des `web`-Adapters auswählen, um einen dedizierten Web-Hook für die Synology-Chat-Integration bereitzustellen.

<div id="channel-configuration"></div>

    #### 2.2.2. Kanalkonfiguration / -verwaltung:
	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

* **Kanal aktiviert**

Diese Option kann verwendet werden, um die Behandlung eingehender oder ausgehender Nachrichten zu deaktivieren.

Dies kann sinnvoll sein, wenn z.B. Der Benutzer möchte die Nutzung eines Kanals nur vorübergehend deaktivieren und die Einstellungen wie das Zugriffstoken oder ähnliches beibehalten, um zu verhindern, dass sie erneut erfasst werden.

    * **Kanal Name**

Diese Einstellung gibt den Namen des Kanals an, von/zu dem Nachrichten gesendet werden. Dieser Name ist frei wählbar und dient der Referenzierung.

Der hier zu konfigurierende Kanalname sollte mit dem Kanalnamen des Synology-Chats identisch sein.

* **Kanal-Token**

Diese Einstellung stellt das Zugriffstoken für den Synology-Chatkanal bereit. Je nach Kanaltyp variiert die Erstellung dieser.
Weitere Details finden Sie im Kapitel [Synology-Chat-Konfiguration](#synology-chat-configuration).

***HINWEIS:***\ *Abhängig von der Integration erhalten Sie beim Erstellen der Synology-Chat-Integration einen Link ähnlich dem folgenden Beispiel:*

https://mychat.mydomain.tld/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22QF5DWyG7M47Ls3cv%22

*In diesem Beispiel ist das Token in der URL enthalten. Verschlüsselte Steuerzeichen - `%22` - werden hier am Anfang und am Ende der Einstellung angegeben.\ **Diese müssen entfernt werden!**\ In diesem Beispiel wäre der einzugebende Token `QF5DWyG7M47Ls3cv`. *

* **Kanaltyp**

***HINWEIS:***\ *Der Kanaltyp muss aus der Perspektive des Synology-Chats angegeben werden. Wenn Sie beispielsweise in der Konfiguration „Eingehend“ auswählen, werden die Nachrichten an den Synology-Chat gesendet.*

Diese Einstellung legt den Typ des Synology-Chatkanals fest, der verwendet wird, abhängig von der im Synology-Chat ausgewählten Integration.

* **Daten an Synology-Chat-Server senden - Eingehende Integration**\

Diese Option ermöglicht es dem Kanal, den neuen Wert des ioBroker-Message-Objekts ([siehe Kapitel Verwendung](#usage)) zu senden, sobald sich der Objektwert ändert.

        * **Daten vom Synology-Chatserver abrufen - Ausgehende Integration**\

Diese Option ermöglicht es dem Kanal, Nachrichten vom Synology-Chatserver zu empfangen und den neuen Wert des ioBroker-Nachrichtenobjekts ([siehe Kapitel Verwendung](#usage)) zu aktualisieren.

Bitte beachten Sie, dass bei Verwendung dieses Kanaltyps der Kanalname der ioBroker-Adapterinstanzkonfiguration mit dem Kanalnamen des Synology-Chatkanals identisch sein muss, um Nachrichten zu erhalten.

Wenn ein Kanal sowohl zum Senden als auch zum Empfangen von Nachrichten konfiguriert werden soll, fügen Sie einfach einen zweiten Kanal mit demselben Namen hinzu und wählen Sie den anderen Kanaltyp aus.

* **SSL-Zertifikat validieren - Für Nicht-Textnachrichten**

Falls für einen eingehenden Kanaltyp ein anderer Inhalt als ein Text, beispielsweise ein Bild, gesendet werden soll, wird dies von einer HTTP-Quelle über eine URL angegeben. Wenn dieser Inhalt mit einem selbstsignierten Zertifikat versehen ist, kann die Zertifikatsprüfung mit dieser Einstellung aktiviert oder deaktiviert werden.
Einzelheiten zum Senden von Nicht-Text-Inhalten finden Sie im Kapitel [Synology-Chat-Konfiguration](#synology-chat-configuration)..

#### 2.2.3. Hilfe:
   * Diese Registerkarte leitet normalerweise zur offiziellen GitHub-Seite dieses Projekts weiter, wo detaillierte Hilfe- und Gebrauchsanweisungen gegeben werden.
* Wenn es offene Fragen, Änderungsvorschläge, unerwünschtes Verhalten oder Fehler gibt, erstellen Sie bitte ein [GitHub-Problem] (https://github.com/phoeluga/ioBroker.synochat/issues/new/choose), um die Qualität sicherzustellen dieses Projekt.

<div id="configurationWebInstance"></div>

### 2.3. Konfiguration der Instanz `web`
Für den Empfang von Nachrichten vom Synology-Chatserver muss eine ausgehende Integration konfiguriert werden - Siehe [Ausgehende Integration](#synologyChatConfigurationOutgoingIntegration).

Dazu muss eine Instanz des `web`-Adapters ausgeführt und in [`synochat`-Adapterinstanz konfiguriert](#configurationAdapterWebInstance) konfiguriert werden.

Wenn die verwendete `web`-Instanz für die Verwendung einer sicheren Verbindung über HTTPS konfiguriert ist, **stellen Sie sicher, dass Sie ein gültiges Zertifikat bereitstellen, oder importieren Sie Ihr eigenes Zertifikat in Ihre vertrauenswürdigen Synology-Zertifikate**.\ Andernfalls werden keine Nachrichten von gesendet Synology-Chatserver zu Ihrer ioBroker-Adapterinstanz.
Die Kommunikation wird nicht hergestellt und leider gibt es auf beiden Seiten keinen direkten Hinweis für den Benutzer, dass die Nachricht aufgrund eines ungültigen Zertifikats abgelehnt wurde.

Wenn die konfigurierte `web`-Instanz für die Verwendung einer sicheren Verbindung über HTTPS konfiguriert ist, stellen Sie sicher, dass Sie ein gültiges Zertifikat bereitstellen oder Ihr eigenes Zertifikat in die vertrauenswürdigen Zertifikate in Ihrer Synology importieren.
Andernfalls werden keine Nachrichten vom Synology-Chatserver an Ihre ioBroker-Adapterinstanz gesendet.

<div id="usage"></div>

## 3. Nutzung
### 3.1 Allgemeines
* Nach der Konfiguration der Adapterinstanz wird in den Objekten der jeweiligen Adapterinstanz für jeden konfigurierten Kanal ein Ordner mit dem Kanalnamen angelegt.

	![IobrokerObjectOverview](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectOverview.png)

* In diesem Ordner ist ein Nachrichtenobjekt des jeweiligen Kanals zu finden, welches die gesendete bzw. empfangene Nachricht darstellt.

***HINWEIS:***\ *Wenn Sie eine Nachricht senden oder das Nachrichtenobjekt vom Benutzer geändert wird, stellen Sie sicher, dass das Ack-Flag nicht gesetzt ist. Das Ack-Flag wird vom Adapter nach Bestätigung des erfolgreichen Empfangs der Nachricht durch den Synology-Chatserver gesetzt.*\ **Wenn das Ack-Flag vom Benutzer gesetzt wird, während der Nachrichtenwert in der ioBroker-Objektansicht geändert wird, wird die Nachricht gesetzt nicht verarbeitet werden!***

	![IobrokerObjectSetMessage](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectSetMessage.png)

* Wenn das Nachrichtenobjekt geändert wird und der Kanaltyp auf „Daten an Synology-Chatserver senden“ eingestellt ist, wird diese Nachricht – abhängig vom Kanaltyp – an den Synology-Chat weitergeleitet.

	![SynoChatChannelIncomingMessage](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatChannelIncomingMessage.png)

<div id="webHookLocation"></div>

* Die Web-Hook-URL / -Adresse wird als Objektwert im Infoordner der Adapterinstanz bereitgestellt und gilt für alle Kanäle innerhalb einer Adapterinstanz.

	![IobrokerObjectWebHook](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectWebHook.png)

### 3.2 Art des Nachrichteninhalts
Neben dem Senden von reinen Textnachrichten können auch andere Inhaltstypen wie Bilder an einen eingehenden Kanal gesendet werden.\ Um dies zu realisieren, muss der Inhalt als Webressource verfügbar sein. Um ein Bild zu senden, setzen Sie einfach die URL als Wert des Nachrichtenobjekts der Syno-Chat-Adapterinstanz, die in [3. Nutzung > 3.1 Allgemeines](#usage) erwähnt wird.

**Beispiel für einen Anwendungsfall einer Überwachungskamera:**\ Viele Überwachungskameras bieten einen Stream oder eine Schnittstelle, um ein Bild abzurufen, das in einem bestimmten Zeitintervall aktualisiert wird oder wenn eine Bewegung erkannt wird.\ Diese URL stellt ein Bild bereit, das benötigt wird als Wert des Nachrichtenobjekts festgelegt.

### 3.3 Debugging bei Problemen
Um detailliertere Informationen zum Verhalten des Adapters bei Problemen zu erhalten, können Sie die Protokollebene der Adapterinstanz `synochat` auf `debug` erhöhen.

Da dieser Adapter eine `web`-Adapterinstanz verwendet, um Web-Hooks für den Synology-Chatserver bereitzustellen, führt die konfigurierte `web`-Instanz einige Funktionen aus. Um detailliertere Informationen bei Problemen mit dem Empfang von Nachrichten zu erhalten, müssen Sie das Protokolllevel der konfigurierten `web`-Instanz ebenfalls auf `debug` erhöhen. Protokollmeldungen, die sich auf den Adapter `synochat` beziehen, können durch das Protokollmeldungspräfix `synochat.<INSTANCE_NUMBER>` identifiziert werden.

---

## Sonstige Angaben
#### Ressourcenzuordnung
- [Chat-Icons erstellt von Pixel Perfect - Flaticon](https://www.flaticon.com/free-icons/chat)

[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=

[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=

[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674

## Changelog
All changes to this project are described in the [CHANGELOG](./CHANGELOG.md).

## License

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](./LICENSE) file.

Copyright (c) 2022 phoeluga <phoeluga@gmail.com>