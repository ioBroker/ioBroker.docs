---
chapters: {"pages":{"en/adapterref/iobroker.zte-mc888/README.md":{"title":{"en":"ioBroker.zte-mc888"},"content":"en/adapterref/iobroker.zte-mc888/README.md"},"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md":{"title":{"en":"Development notes"},"content":"en/adapterref/iobroker.zte-mc888/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zte-mc888/DEVELOPMENT.md
title: Entwicklungsnotizen
hash: hTfwKa4rn88QgZq5fTylANMUipIbJlv+k+El79/YXzM=
---
# Entwicklungsnotizen

Diese Hinweise richten sich an Mitwirkende. Als Benutzer des Adapters benötigen Sie dies nicht – installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.

## Anforderungen

- Node.js >= 22
- npm

## Einrichtung und Tests

```bash
npm install               # install dependencies (incl. the test framework)
npm test                  # unit tests + package validation
npm run test:js           # only the unit tests (fields + zteClient, no router needed)
npm run test:package      # validate package.json / io-package.json
npm run test:integration  # boot the adapter in a temporary js-controller
npm run lint              # ESLint (@iobroker/eslint-config)
npm run check             # type check the JavaScript sources via JSDoc (tsc --noEmit)
```

Die Unit-Tests laufen vollständig offline: [test/zteClient.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/zteClient.test.js) startet einen lokalen simulierten HTTP-Server, der den Router emuliert.`goform` Da es sich um eine API handelt, wird kein echter ZTE MC888 benötigt. Der Integrationstest lädt einen echten JS-Controller in ein temporäres Verzeichnis herunter und startet ihn (beim ersten Start ist eine Internetverbindung erforderlich).

## Router-API

Der Adapter liest die lokalen Einstellungen des Routers.`goform` HTTP-API (`/goform/goform_get_cmd_process` Der Anmeldevorgang verwendet`LOGIN_MULTI_USER` mit dem`AD` Token (`MD5( MD5(cr_version + wa_inner_version) + RD )` und der Passwort-Hash`SHA256( SHA256(password) + LD )` Siehe [lib/zteClient.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/zteClient.js) .

Der Router stellt ohne Authentifizierung nur wenige Felder bereit (Netzwerktyp und primärer RSRP/RSSI-Wert); alles andere erfordert eine Sitzung, und der Router erlaubt nur eine Sitzung pro Benutzer – eine zweite Anmeldung beendet die erste. Die Sitzungsverwaltung und die Priorisierung der Web-Oberfläche sind in`poll()` in [main.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/main.js) .

## Hinzufügen von Feldern für eine andere Firmware

Die Feldnamen unterscheiden sich je nach Firmware-Version. So fügen Sie Unterstützung für eine Firmware hinzu:

1. Führen Sie die Instanz mit dem Protokollierungsgrad aus.`debug` — Der unformatierte Router-JSON-Code wird bei jeder Abfrage protokolliert.
2. Fügen Sie den Eintrag in [lib/fields.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/lib/fields.js) hinzu oder passen Sie ihn an (`cmd` ist der Rohfeldname,`id` die ioBroker-Status-ID) und erweitern Sie die Tests in [test/fields.test.js](https://github.com/muraus/ioBroker.zte-mc888/blob/main/test/fields.test.js) .
3. Erstelle einen Pull Request mit der Firmware-Version, gegen die du getestet hast.

Bitte patchen Sie einen bereits installierten Adapter nicht lokal – die Änderungen werden beim nächsten Update überschrieben und niemand sonst profitiert davon.

## Freigeben

Releases werden mit [@alcalzone/release-script](https://github.com/AlCalzone/release-script) erstellt:

```bash
npm run release -- patch   # or minor / major
```

Das Änderungsprotokoll wird in der`## Changelog` Abschnitt der [README.md](/#/adapters/zte-mc888) -Datei; das Release-Skript kopiert ihn nach`io-package.json` Die