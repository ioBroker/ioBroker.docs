---
chapters: {"pages":{"en/adapterref/iobroker.easee/README.md":{"title":{"en":"ioBroker.easee"},"content":"en/adapterref/iobroker.easee/README.md"},"en/adapterref/iobroker.easee/docs/bluetooth.md":{"title":{"en":"Bluetooth connection"},"content":"en/adapterref/iobroker.easee/docs/bluetooth.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.easee/docs/bluetooth.md
title: Bluetooth-Verbindung
hash: uct7pUiHWbXt2Czb/WhTHHNoU5KHGwxkjv5lqzHjevM=
---
# Bluetooth-Verbindung

Der Bluetooth-Modus verbindet den Adapter direkt mit konfigurierten Easee-Ladegeräten. Er ist unabhängig von der Easee Cloud: Er verwendet weder die Cloud-Anmeldung, noch erkennt er Ladegeräte aus Ihrem Konto oder wechselt automatisch zur Cloud. Nutzen Sie den Cloud-Modus für Standortinformationen und den Ladeverlauf.

Die Bluetooth-Kompatibilität hängt vom Ladegerät, der Firmware und dem ioBroker-Host ab. Laut den veröffentlichten Systemvoraussetzungen von Easee ist für Drehstromladegeräte Firmware 316 oder höher und für Easee One Firmware 60 oder höher erforderlich. Diese Voraussetzungen von Easee garantieren keine Kompatibilität mit jeder Konfiguration. Firmware-Updates können die Bluetooth-Unterstützung ebenfalls beeinträchtigen.

## Bevor Sie beginnen

- Halten Sie die Seriennummer des Ladegeräts und die Bluetooth-PIN bereit. Die PIN ist nicht Ihr Easee-Kontopasswort. Sie können die PIN mithilfe der [Easee-Hilfe](https://support.easee.com/hc/en-gb/articles/4856383404177-Easee-charger-PIN-code-find-or-recover-the-PIN) finden oder wiederherstellen.
- Halten Sie das Ladegerät in der Nähe des Computers oder Geräts, auf dem ioBroker ausgeführt wird. Bluetooth muss auf dem Host-Gerät aktiviert sein und ioBroker die Nutzung erlauben.
- Stellen Sie sicher, dass das Ladegerät für Bluetooth verfügbar ist. Laut Easee öffnet ein zehnminütiges Zeitfenster, wenn Sie die Ladetaste mindestens fünf Sekunden lang gedrückt halten. Bluetooth kann auch in der App aktiviert werden. Modellspezifische Anweisungen finden Sie unter [„Easee: Bluetooth verwenden“](https://support.easee.com/hc/en-gb/articles/19270172294161-Using-Bluetooth) und [„Bluetooth in der Installations-App“](https://support.easee.com/hc/en-gb/articles/19160690698513-Bluetooth-in-the-Installer-App) .
- Ein Ladegerät erlaubt möglicherweise nur eine lokale Verbindung gleichzeitig. Schließen Sie die Easee-App oder andere Bluetooth-Verbindungen, während Sie den Adapter einrichten.

## Aufstellen

Über den Geräte-Manager auf der Registerkarte **„Verbindung“** können Sie lokale Ladegeräte hinzufügen, bearbeiten und entfernen.

1. Wählen Sie in den Adaptereinstellungen **Bluetooth (lokal)** aus.
2. Fügen Sie auf der Registerkarte **„Verbindung“** im Geräte-Manager jedes Ladegerät mit seiner ID oder Seriennummer und Bluetooth-PIN hinzu. Ein optionaler Name ist lediglich eine ioBroker-Bezeichnung; er ändert den Namen des Ladegeräts nicht.
3. Speichern Sie die Einstellungen und starten Sie den Adapter neu, um die Ladegeräteliste anzuwenden. Die PIN wird verschlüsselt in der Adapterkonfiguration gespeichert. Geben Sie sie nicht in Protokollen oder Supportanfragen an.
4. Halten Sie den ioBroker-Host während der Verbindungsherstellung des Adapters in Reichweite.

Um später Ladegeräte hinzuzufügen oder zu entfernen, verwenden Sie den Geräte-Manager auf der Registerkarte **„Verbindungen“** . Speichern Sie anschließend die Einstellungen und starten Sie den Adapter neu. Die bestehende Bluetooth-Konfiguration bleibt erhalten; gespeicherte PINs müssen nicht erneut eingegeben werden.

## Bluetooth-Status und Suche

Der Tab **„Erweiterte Bluetooth-Funktionen“** zeigt an, ob Bluetooth verfügbar ist und eine Suche gestartet werden kann. Die manuelle Suche ist optional; verwenden Sie **„Nach Easee-Ladegeräten in der Nähe suchen“** , um Geräte in der Umgebung zu finden. Die Suche dauert bis zu 30 Sekunden. Die Ergebnisse zeigen erkannte Namen, Kennungen und Diagnosedetails an, sind aber nur Vorschläge: Sie werden nicht automatisch hinzugefügt und ersetzen weder die auf dem Tab **„Verbindung“** eingegebene Ladegerät-ID noch die PIN.

Wird kein Ladegerät gefunden, prüfen Sie, ob es eingeschaltet, in Reichweite und Bluetooth-fähig ist. Ein fehlendes Suchergebnis bedeutet nicht zwangsläufig, dass Bluetooth deaktiviert ist. Kann der Adapter keine Verbindung herstellen, prüfen Sie die Seriennummer und die PIN, stellen Sie sicher, dass kein anderes Telefon oder Adapter das Ladegerät verwendet, und vergewissern Sie sich, dass der ioBroker-Host Bluetooth unterstützt.

Unter Linux wird die **automatische** Verbindungseinstellung empfohlen. Sie verwendet BlueZ D-Bus und greift auf **Raw HCI** zurück, falls Noble die Auflösung nicht fehlschlägt. `dbus-next` und sein HCI-Backend ist verfügbar. Unter macOS und Windows wählt „Automatisch“ die Plattformbindung aus; unter FreeBSD wird Raw HCI verwendet. Wählen Sie die Bindung in den Adaptereinstellungen aus. `NOBLE_BINDINGS` Umgebungsüberschreibungen werden nicht verwendet. Der Adapter bietet außerdem **BlueZ D-Bus** und **Raw HCI** explizit zur Fehlerbehebung im Tab **„Erweiterte Bluetooth-Funktionen“** . Raw HCI benötigt möglicherweise zusätzliche Host-Berechtigungen und kann mit anderen Bluetooth-Apps oder Scannern in Konflikt geraten. Belassen Sie die Einstellung auf „Automatisch“, es sei denn, Sie müssen eine bestimmte Konfiguration untersuchen. Linux- und Docker-Installationen benötigen möglicherweise Zugriff auf den Host-Bluetooth-Adapter. Wenn eine explizite BlueZ-D-Bus-Auswahl meldet, dass Noble den Wert nicht auflösen kann, …`dbus-next` Installieren Sie den Adapter mit seinen Laufzeitabhängigkeiten neu. Adapterstatus, Bindung, Scanvorgang und Details zu Verbindungsfehlern werden im Debug-Modus protokolliert. Jedes konfigurierte Ladegerät hat maximal drei Scan-/Verbindungsversuche (den ersten Versuch plus zwei Wiederholungsversuche). Der Adapter protokolliert einen Eintrag der Informationsstufe. `connecting` Staat und, im Erfolgsfall, `connected` Eine erfolgreiche Verbindung setzt den Wiederholungszähler zurück. Schlagen alle drei Versuche fehl, wird ein Fehler protokolliert und die automatischen Wiederholungsversuche für dieses Ladegerät werden gestoppt, bis der Adapter neu gestartet wird. Eine Trennung nach einer erfolgreichen Verbindung startet einen neuen Zyklus mit drei Versuchen.

## Was ist im Bluetooth-Modus verfügbar?

Der Bluetooth-Modus liefert Informationen zu Ladestatus, Leistung, Energieverbrauch und elektrischen Messwerten. Die Geräte-Manager-Karte jedes Ladegeräts zeigt außerdem die aktuelle Ladeleistung (kW) und die Bluetooth-Signalstärke (dBm) an. Sie ermöglicht die Anpassung der Stromgrenzen von Ladegerät und Stromkreis, des Phasenmodus, der permanenten Kabelverriegelung und der LED-Helligkeit. Funktionen zum Anhalten, Fortsetzen und Neustarten sind ebenfalls verfügbar. Die Änderung des Phasenmodus wird erst nach dem Aus- und Wiedereinschalten des Ladegeräts wirksam.

Beim Wechseln `config.dynamicCircuitCurrentP1` –`P3` Geben Sie alle drei Phasenwerte gleichzeitig an. Der Adapter sendet die Änderung nicht, wenn er die anderen Phasenwerte nicht ermitteln kann.

Der Bluetooth-Modus liefert keine Cloud-exklusiven Informationen wie Preise, Ladeverlauf oder Namen von Autorisierungstoken-Inhabern. Auch intelligente Lade- und Tastenfunktionen, die Umbenennung des Ladegeräts, WLAN-Passwortänderungen sowie Cloud-basierte Start-/Stopp-Steuerungen sind nicht verfügbar. Bluetooth-Datenpunkte verwenden die konfigurierte Seriennummer des Ladegeräts; weicht diese von der Cloud-Ladegerät-ID ab, unterscheiden sich die Datenpfade.

Es werden nur die vom gewählten Verbindungsmodus unterstützten Datenpunkte angezeigt. Bei einem Moduswechsel werden veraltete, vom Adapter erstellte Datenpunkte, die im neuen Modus nicht unterstützt werden, entfernt; unterstützte Datenpunkte und nicht zugehörige benutzerdefinierte Objekte bleiben unverändert.

## Wenn Sie den Support kontaktieren

Aktivieren Sie die Debug-Protokollierung des Adapters und beschränken Sie sich dabei auf die Protokollzeilen eines einzelnen Verbindungsversuchs. Entfernen Sie vor der Weitergabe der Protokolle Seriennummern des Ladegeräts, Bluetooth-Adressen, PINs, Anmeldedaten und andere vertrauliche Informationen. Senden Sie niemals eine Bluetooth-PIN oder ein Kontopasswort.

## Quellenangabe

Die Bluetooth-Unterstützung basiert auf öffentlich zugänglichen Informationen des unabhängigen [Projekts easee-ble](https://github.com/parrel/easee-ble/tree/bec7b061fc8199cd150dbb8bbce5ed5112145ede) und [der Home Assistant-Integration von Easee](https://github.com/parrel/ha-easee-ble/tree/9973cec92660ecd791a9809eb06361bd5b535f1b) . Diese Projekte stehen in keiner Verbindung zu Easee; die Texte der MIT-Lizenz sind in den jeweiligen Projekten verfügbar ( [easee-ble-Lizenz](https://github.com/parrel/easee-ble/blob/bec7b061fc8199cd150dbb8bbce5ed5112145ede/LICENSE) ).