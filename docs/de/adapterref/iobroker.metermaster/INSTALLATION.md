---
chapters: {"pages":{"en/adapterref/iobroker.metermaster/README.md":{"title":{"en":"ioBroker.metermaster"},"content":"en/adapterref/iobroker.metermaster/README.md"},"en/adapterref/iobroker.metermaster/INSTALLATION.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.metermaster/INSTALLATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.metermaster/INSTALLATION.md
title: kein Titel
hash: tFQhqb7V05bUSMEAEJlOuc6gSjuUQcdxUDabc8X0GZs=
---
## MeterMaster-Adapter – Installation

Dieses Dokument ergänzt die [README-Datei](/#/adapters/metermaster) um zusätzliche Installationshinweise.

### Standardinstallation

1. **ioBroker-Admin** öffnen → **Adapter**
2. Suche nach **MeterMaster**
3. Klicken Sie auf **„Installieren** “ und erstellen Sie eine Instanz.
4. Starten Sie die Instanz

Befehlszeile auf dem ioBroker-Host:

```bash
iobroker add metermaster
iobroker start metermaster
```

### Firewall

Falls die MeterMaster-App den Adapter nicht erreichen kann, öffnen Sie Port 8089:

```bash
sudo ufw allow 8089/tcp
```

### Instanzkonfiguration

| Einstellung                  | Standard      | Beschreibung                                    |
| ---------------------------- | ------------- | ----------------------------------------------- |
| HTTP-Port                    | `8089`        | Port, an dem der Adapter lauscht                |
| Benutzername                 | `metermaster` | Benutzername für die Basisauthentifizierung     |
| Passwort                     | –             | Standard-Authentifizierungspasswort             |
| Ausführliche Protokollierung | ermöglicht    | DEBUG-Einträge im Protokoll-Viewer anzeigen     |
| Protokollpuffer              | `500`         | Maximale Anzahl gespeicherter Protokolleinträge |
| Geschichte bewahren          | `0`           | 0 = unbegrenzt                                  |

### Aktualisieren

```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

### Fehlerbehebung

Adapterstatus prüfen:

```bash
iobroker status metermaster.0
```

Protokolle anzeigen:

```bash
iobroker logs metermaster.0
```

Falls Port 8089 bereits belegt ist, wählen Sie in der Adapterinstanzkonfiguration einen anderen Port.