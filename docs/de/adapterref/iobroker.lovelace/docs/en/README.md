---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/docs/en/README.md
title: ioBroker.lovelace - Dokumentation
hash: dHALAkifjortu4QuDqsfh4Yiw82U9/RX0UuFzxAZEVU=
---
![Logo](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# ioBroker.lovelace – Dokumentation

Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

Der Adapter emuliert eine Home-Assistant-Umgebung und stellt die in ioBroker vorhandenen Geräte bereit. In Home Assistant werden die Funktionen wie folgt bereitgestellt:`entities` (ein`entity` entspricht in der Regel einem Gerät). In ioBroker besteht ein Gerät oft aus mehreren`states` also eine 1:1-Zuordnung von`state` Zu`entity` ist nicht immer trivial.

Ein`entity` benötigt immer eine eindeutige ID der Form`domain.unique_name` . Der`domain` (z.B`light` ,`cover` ,`input_number` ) beschreibt die Funktion der Entität und bestimmt, wie sich die Lovelace-Karten verhalten.

## Themen

- [Entitäten](/#/docs/adapterref/iobroker.lovelace/docs/en/entities.md) – automatische Erkennung, manuelle Konfiguration, unterstützte und spezielle Entitätstypen
- [Benutzerdefinierte Karten, Designs & UI-Tipps](/#/docs/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md)
- [Funktionen](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md) – Benachrichtigungen, Sprachsteuerung, Video, Fehlerbehebung
- [Migration von Themes (Frontend-Update 2026)](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md)

Die Entwickler-/Build-Dokumentation befindet sich in der [Stamm-README-Datei](/#/adapters/lovelace#development) .

## Instanzobjekte

Im Ordner`instances` Es gibt einige Objekte, mit denen die Benutzeroberfläche gesteuert werden kann. Für jeden Browser wird ein neuer Unterordner mit einer zufälligen ID erstellt. Diese ID wird im Webspeicher des Client-Browsers gespeichert. Wenn Sie den Webspeicher löschen, wird eine neue Instanz erstellt. Wenn Sie den Fully Kiosk Browser verwenden, stellen Sie sicher, dass die Funktion`Delete webstorage on reload` ist **deaktiviert** .

Diese Funktionalität nutzt browser\_mod, das vom Adapter installiert und aktualisiert wird. Fügen Sie keine eigene Version von browser\_mod als benutzerdefinierte Karte hinzu.

## Fernzugriff über ioBroker Cloud

Neben der Nutzung eines VPNs oder der Freigabe des Ports der Lovelace-Instanz (mit integrierter Autorisierung und SSL) lässt sich Lovelace auch über die ioBroker-Cloud verwenden. Der Vorteil: Es wird keine Verbindung von außen in Ihr Netzwerk hergestellt – die Verbindung wird von Ihrem System über den Cloud-Adapter initiiert. Dies ist besonders hilfreich bei Dual Stack Lite oder anderen komplexen Netzwerkkonfigurationen, über die Sie keine vollständige Kontrolle haben.

Um Lovelace zu aktivieren, registrieren Sie sich bei iobroker.pro und installieren Sie den Cloud-Adapter. Wählen Sie in der Konfiguration des Cloud-Adapters die gewünschte Lovelace-Instanz aus. Anschließend wird Lovelace in der Benutzeroberfläche von iobroker.pro unter „Anwendungen“ angezeigt und ist nach der Anmeldung unter folgender Adresse erreichbar:`https://iobroker.pro:4443/lovelace/` Die

In der Lovelace-Instanz sollte SSL anschließend deaktiviert werden. Eine Autorisierung ist ebenfalls nicht erforderlich, da diese über das ioBroker-Konto abgewickelt wird.