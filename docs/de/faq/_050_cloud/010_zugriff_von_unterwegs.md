## Wie erreiche ich ioBroker von unterwegs?

Der einfache Weg ist der
[iot-Adapter](/adapters/iot).
Er baut die Verbindung von innen nach außen auf. Es muss also **kein Port im
Router geöffnet werden**, und ein eigenes Zertifikat braucht es auch nicht.

!> Von einer Portweiterleitung auf den Admin ist dringend abzuraten. Der Admin
kennt in der Voreinstellung keine Anmeldung; wer ihn ins Internet stellt, gibt
sein Haus frei.

## Alexa und Google Home

Beides läuft über denselben iot-Adapter. In groben Zügen:

1. Ein kostenloses Konto auf [iobroker.pro](https://iobroker.pro) anlegen.
2. Den Adapter **iot** installieren und die Zugangsdaten eintragen.
3. Die Geräte auswählen, die freigegeben werden sollen, am saubersten über den
   Adapter *devices* oder über Räume und Funktionen im Reiter
   [Kategorien](/docs/admin/enums.md).
4. In der Alexa- bzw. Google-App den ioBroker-Dienst verknüpfen und nach Geräten
   suchen lassen.

?> Damit „Schalte das Licht im Wohnzimmer aus" funktioniert, müssen Raum und
Funktion am **Datenpunkt** gepflegt sein, nicht am Gerät oder Kanal.

Die ausführliche Anleitung samt Fehlersuche steht in der Dokumentation des
iot-Adapters.
