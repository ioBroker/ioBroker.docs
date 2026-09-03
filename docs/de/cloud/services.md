---
title:       "Dienste (Cloud-Service-URL)"
lastChanged: "01.09.2026"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/cloud/services.md"
---
# Dienste

Mit ioBroker kannst du über eine spezielle URL Befehle ausführen oder Daten an dein Smart Home senden – ganz egal, wo du dich gerade befindest. Das ist besonders praktisch, wenn du Geräte von unterwegs steuern oder externe Daten in dein Smart Home holen möchtest.

Die Dienste gehören zur Smart-Assistenten-Lizenz. Jeder Aufruf zählt dabei wie ein Sprachbefehl.

## Was kann ich mit dieser URL tun?

Die URL ermöglicht dir, Daten an dein ioBroker-System zu senden und vorher definierte Befehle auszuführen. Typische Anwendungsfälle sind:

* **Steuerung von Geräten**: zum Beispiel Licht ein- und ausschalten oder die Heizung regulieren.
* **GPS-Tracking**: Dein Handy sendet regelmäßig seinen Standort, damit dein Zuhause auf deine Anwesenheit reagieren kann.
* **Senden von Sensordaten**: Externe Systeme schicken Messwerte wie Temperatur oder Luftfeuchtigkeit an ioBroker.
* **Webhook-Integration**: Du verbindest ioBroker mit externen Diensten wie IFTTT, Tasker oder Home-Automation-Apps.

## Wie funktioniert das?

Du rufst eine spezielle URL auf, die dein ioBroker-System über den Cloud-Adapter erreicht:

```text
https://service.iobroker.in/v1/iotService?service=SERVICE_NAME&key=USER_KEY&user=USER_EMAIL&data=myString
```

### Erklärung der Parameter

| Parameter | Bedeutung |
|---|---|
| `service` | Der Name des Befehls, den du in ioBroker vorher definiert hast. |
| `key` | Dein persönlicher Sicherheitsschlüssel. Er wird vom Cloud-Adapter erzeugt. |
| `user` | Deine in der ioBroker-Cloud registrierte E-Mail-Adresse. |
| `data` | Die Daten, die du senden möchtest – zum Beispiel eine Nachricht oder ein Steuerbefehl. |

## Beispiele

### Licht per URL einschalten

Voraussetzung: Du hast in ioBroker eine Aktion mit dem Namen `turnOnLight` erstellt.

```text
https://service.iobroker.in/v1/iotService?service=turnOnLight&key=DEIN_KEY&user=DEINE_EMAIL&data=on
```

### GPS-Daten ans Smart Home senden (Geofencing)

Dein Handy schickt regelmäßig seine Position an ioBroker.

```text
https://service.iobroker.in/v1/iotService?service=updateLocation&key=DEIN_KEY&user=DEINE_EMAIL&data={"lat":52.5200,"lng":13.4050}
```

### Daten per POST senden

Möchtest du größere Datenmengen übertragen, kannst du statt des Aufrufs über die Adresszeile eine POST-Anfrage senden. Die URL bleibt gleich, die Daten stehen dann im Body der Anfrage.

## Wie richte ich einen neuen Dienst ein?

1. Öffne den ioBroker-Admin.
2. Installiere und aktiviere den Adapter ioBroker.iot.
3. Gehe in die Einstellungen des Adapters und erstelle eine neue Aktion.
4. Lege fest, welche Daten empfangen werden sollen und was daraufhin passiert.
5. Merke dir den Namen der Aktion und benutze ihn in deiner URL.

## Sicherheitshinweise

* **Schütze deinen Key.** Wer ihn kennt, kann ungewollt Aktionen in deinem Smart Home auslösen.
* **Nutze HTTPS**, damit die Verbindung verschlüsselt ist.
* **Definiere sichere Aktionen**, zum Beispiel mit einem zusätzlichen Passwort oder mit der Einschränkung, von welchen IP-Adressen Befehle gesendet werden dürfen.

## Fazit

Die Cloud-Service-URL ist eine mächtige Funktion, um dein Smart Home von überall zu steuern oder externe Daten einzubinden. Über einfache Aufrufe verbindest du dein System flexibel mit anderen Diensten – für Automatisierungen, Webhooks oder die Steuerung vom Handy aus.
