---
chapters: {"pages":{"en/adapterref/iobroker.envertech-pv/README.md":{"title":{"en":"ioBroker.envertech-pv"},"content":"en/adapterref/iobroker.envertech-pv/README.md"},"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md":{"title":{"en":"Envertech-PV Adapter Information"},"content":"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.envertech-pv/docs/en/envertech.md
title: Envertech-PV-Adapterinformationen
hash: E4gbP/Nr8ff6nCw5bLm9ZboMi/ui7y20T4BZXmrSW5c=
---
# Envertech-PV-Adapterinformationen

## allgemeine Informationen

Dieser Adapter ermöglicht den Abruf von Daten aus dem Envertech-Cloud-Service ( [www.envertecportal.com](http://www.envertecportal.com) ) durch regelmäßige Abfrage des Webdienstes. Alle abgerufenen Daten werden in für Benutzer zugänglichen Verzeichnissen gespeichert.

Der Zugriff auf das Envertech-Portal ist durch eine Kombination aus Benutzername und Passwort gesichert. Envertech unterstützt Endbenutzer- und Installationskonten. Dieser Adapter wurde ausschließlich mit Endbenutzerkonten getestet, die jeweils nur den Zugriff auf eine einzige Installation ermöglichen. Jedem Endbenutzerkonto wird von Envertech eine Stations-ID zugewiesen. Der Adapter erlaubt die Verwendung mehrerer Stations-IDs pro Adapterinstanz. Dadurch können mehrere Installationen innerhalb einer Instanz überwacht werden.

Die vom Envertech-Portal abgerufenen Daten sind wie folgt strukturiert:

- Stationsinformationen, identifiziert durch die Stations-ID
- ein oder mehrere Gateways, die der durch die Gateway-Seriennummer identifizierten Station zugeordnet sind.
- ein oder mehrere Wechselrichter, die mit diesen Gateways verbunden sind.

## Konfiguration

Wie bereits beschrieben, wird jede Station durch ihre Stations-ID identifiziert. Die einem Benutzerkonto zugewiesene Stations-ID kann abgerufen werden, indem Benutzername und Passwort in die entsprechenden Felder auf der Registerkarte „Cloud-Konfiguration“ eingegeben und die Schaltfläche „Stations-ID abrufen“ gedrückt wird. Die Stations-ID wird im Feld „Stations-ID“ angezeigt. Beachten Sie, dass die Adapterinstanz aktiv sein muss, damit der Abruf funktioniert.

Nachdem Sie die gewünschte Stations-ID abgerufen haben, können Sie in der Tabelle „Liste der zu überwachenden Cloud-Stationen“ eine oder mehrere Stationen konfigurieren – eine pro Zeile.

### TAB Cloud-Konfiguration

<p align=center><img src="img/envertech_tab_cloudstations.jpg" width="600" /></p>

| Parameter            | Typ             | Beschreibung                                                 | Kommentar                                                               |
| -------------------- | --------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Aktiv                | boolescher Wert | Falls markiert, wird der Bahnhof überwacht                   | kann verwendet werden, um eine einzelne Station zu deaktivieren.        |
| Stations-ID          | Text            | Stations-ID zur Identifizierung der zu überwachenden Station | Geben Sie die mit Benutzername und Passwort abgerufene Stations-ID ein. |
| Umfrageintervall (s) | ganze Zahl      | Abstimmungsintervall                                         | Intervall für die Datenabfrage vom Cloud-Dienst festlegen               |

### Registerkarte „Allgemeine Optionen“

Hier legen Sie einige allgemeine Optionen fest.

<p align=center><img src="img/envertech_tab_options.jpg" width="600" /></p>

- Aktivieren Sie die Protokollierung von HTTP-Anfragen.<br> Durch Aktivieren dieser Option wird die Protokollierung von HTTP-Anfrage- und Antwortdaten während der Kommunikation mit dem Envertech-Webservice aktiviert.

- Protokollierung neuer Datenschlüssel aktivieren<br> Durch Setzen dieser Option wird eine Warnung protokolliert, falls vom Envertech-Webservice Daten gemeldet werden, die noch nicht implementiert sind.

### TAB-Expertenoptionen

Hier können Sie einige spezielle Optionen festlegen. Es wird empfohlen, alle diese Optionen unverändert zu lassen, sofern nichts anderes angegeben ist.

<p align=center><img src="img/envertech_tab_expert.jpg" width="600" /></p>

- Envertech Cloud-Service-URL<br> Die URL für den Zugriff auf den Envertech-Cloud-Dienst kann hier geändert werden.

- HTTP-Anfrage-Timeout (s)<br> Diese Option definiert ein allgemeines Timeout für alle HTTP-Anfragen. Der Wert wird in Sekunden angegeben.

- Mindestverzögerung (s)<br> Diese Option definierte eine minimale Verzögerung in Sekunden zwischen dem Abschluss eines Abfragezyklus und dem Beginn des nächsten Zyklus.

## Weitere Informationen

Falls Sie die Stations-ID mithilfe von Benutzername und Passwort innerhalb des Adapters abrufen, können Sie Ihre Stations-ID auch auf diesem Weg erhalten:

- Melden Sie sich unter [www.envertecportal.com](http://www.envertecportal.com) an.
- Lassen Sie sich den Quellcode der Webseite anzeigen, indem Sie mit der rechten Maustaste klicken und „Quelltext anzeigen“ auswählen.
- Suchen Sie nach "var stationId = ...". Der Code sollte wie folgt aussehen: "var stationId = '3EH583732993048DDX706VT57F8708452';".
- Sie benötigen die Schnur auf der rechten Seite ("3EH58373299348DDX706VT57F8708452").
- Geben Sie diese Zeichenfolge in die Tabellenspalte mit der Bezeichnung Station-Id ein.