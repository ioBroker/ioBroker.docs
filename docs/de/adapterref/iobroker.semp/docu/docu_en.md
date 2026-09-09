---
chapters: {"pages":{"en/adapterref/iobroker.semp/README.md":{"title":{"en":"ioBroker.semp"},"content":"en/adapterref/iobroker.semp/README.md"},"en/adapterref/iobroker.semp/docu/docu_en.md":{"title":{"en":"Documentation for iobroker.semp"},"content":"en/adapterref/iobroker.semp/docu/docu_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.semp/docu/docu_en.md
title: Dokumentation für iobroker.semp
hash: P8McHMFx5TiQCLJ9ORwuYj8YPMRsInwN8E1x9R+fR9I=
---
# Dokumentation für iobroker.semp

## Einstellungen

### Hauptsächlich

![Hauptsächlich](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Main_de.PNG)

- IP-Adresse IP-Adresse des Geräts, auf dem ioBroker.semp ausgeführt wird.

- UUID eindeutige ID zur Identifizierung des SEMP-Gateways

- SEMP-Port, über den der Adapter für Homemanager erreichbar ist. Standard: 9765

- SEMP-Name ist lediglich ein Name für das SEMP-Gateway. Dieser Name wird in SunnyPortal angezeigt.

- SEMP-Vendor ist nur ein Name.

- Wenn die erweiterte Protokollierung aktiviert ist, wird jede Telegrammnachricht an Homemanager im ioBroker-Protokoll protokolliert. **Beachten Sie,** dass dies die Protokollgröße erheblich vergrößern kann.

### Geräte

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Devices_de.PNG)

- Basis-ID der Geräte. Die Basis-ID der Geräte-IDs muss 8 Zeichen lang sein und darf nur Zahlen enthalten.

Geräte-IDs und Gerätenamen können Sie nur hier in der Liste ändern. In den Gerätedetails sind diese beiden Werte schreibgeschützt.

### Hauptgerät

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Device_Main_de.PNG)

**Achtung:** Die maximale Leistung muss eingestellt werden. 0 ist nicht zulässig.

#### Gerätezähler

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Device_Counter_de.PNG)

Bei Auswahl von „Messung“ muss eine Objekt-ID für die aktuelle Geräteleistung angegeben werden. Die Einheit kann Watt \[W] oder Kilowatt \[kW] sein. Bei Auswahl von „Schätzung“ wird die maximale Leistung aus den allgemeinen Einstellungen verwendet.

#### Geräteschalter

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Device_Switch_de.PNG)

Hier definieren wir zwei Funktionen:

- Gerätestatus (ein oder aus)
- Das Gerät wird gemäß den Energieempfehlungen von Homemanager ein- oder ausgeschaltet.

Der Gerätestatus kann wie folgt definiert werden:

- Objekt-ID: Dann benötigen wir ein Objekt in ioBroker mit dem aktuellen Status
- Aktuelle Leistung: Anschließend verwenden wir die Objekt-ID von der Gerätezählerseite. Schwellenwerte können definiert werden, um ein ständiges Aufprallen zu vermeiden.
- immer eingeschaltet

#### Geräteenergieanforderungen

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Device_Timer_de.PNG)

Timer aktiv: Aktiviert die Energieanforderungen von SunnyHomeManager.

Anfrage abbrechen, wenn sich das Gerät nicht einschaltet: Option. Wenn Sie eine Energieanfrage abbrechen möchten, wenn Ihr Gerät im angegebenen Zeitraum keine Energie benötigt, gibt SunnyHomeManager normalerweise eine Einschaltempfehlung. Sollte sich das Gerät nicht einschalten, versucht SunnyHomeManager den gesamten Zeitraum über, es einzuschalten. Mit dieser Option kann die Energieanfrage abgebrochen werden.

#### Geräte-Wandbox

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Settings_Device_Wallbox_de.PNG)

Batteriekapazität \[Wh]: Wird für Energieanforderungen verwendet. Ist die Batterie leer, wird die volle Kapazität für den Ladevorgang angefordert.

Maximale Ladezeit nach dem Einstecken des Steckers: Zeit, die benötigt wird, um Energie anzufordern.

- 12 h: Energie anfordern, um für die nächsten 12 Stunden aufzuladen
- 24 h: Energie anfordern, um die nächsten 24 Stunden aufzuladen
- endlos: Energie anfordern, solange der Stecker angeschlossen ist
- Benutzerdefiniert: Energie anfordern, um die Wand für einen benutzerdefinierten Zeitraum aufzuladen. Der Benutzer kann die Zeit im Datenpunkt „semp.0.Devices.yourWallbox.MaxChargeTime“ definieren.

Verfügt über einen Schalter zur Aktivierung des Drehstrombetriebs: Einige Wallboxen können mit 1 oder 3 Phasen betrieben werden. Wenn Sie zwischen 1- und 3-Phasen-Laden umschalten möchten, können Sie diese Option aktivieren.

Grenzwert für die Umschaltung auf 3-Phasen-Laden \[W]: Wenn die vom HomeManager empfohlene Leistung über diesem Grenzwert liegt, wird das 3-Phasen-Laden aktiviert.

Verzögerung beim Umschalten auf 3-Phasen-Ladung \[min]: Um ein ständiges Hin- und Herwechseln zwischen 1-Phasen- und 3-Phasen-Ladung zu vermeiden, können Sie eine Verzögerung festlegen, wie lange die Leistung den Grenzwert überschreiten muss.

Objekt-ID „Stecker verbunden“: Dies ist der Datenpunkt, an dem Ihre Wallbox anzeigt, dass Ihr Auto mit der Wallbox verbunden ist. Muss „true“ (boolescher Wert) sein, wenn eine Verbindung besteht. Der Adapter liest ausschließlich diesen Datenpunkt. Wenn der Stecker angeschlossen ist, fordert der Adapter Energie vom SunnyHomeManager an. Wenn der Stecker getrennt ist, wird die Energieanforderung sofort abgebrochen.

Die Objekt-ID „Wird geladen“ gibt an, ob Ihr Auto geladen wird. Dieser Wert muss „true“ (boolescher Wert) sein, wenn der Ladevorgang läuft. Der Adapter liest ausschließlich diesen Wert.

Die Objekt-ID ist ein Fehler: Dies ist der Datenpunkt, an dem Ihre Wallbox einen Fehlerzustand anzeigt. Muss „true“ (boolescher Wert) sein, wenn ein Fehler vorliegt. Der Adapter liest nur diesen Datenpunkt.

Objekt-ID Ladeleistung: Dies ist der Datenpunkt, von dem Ihre Wallbox die Ladeleistung bezieht. Der Wert muss in Watt \[W] angegeben werden. Der Adapter schreibt die Leistung basierend auf einer Empfehlung von SunnyHomeManager.

object-ID Start Charge: Dies ist der Datenpunkt, an dem Ihre Wallbox mit dem Ladevorgang beginnt. Der Adapter setzt den Wert auf „true“, wenn eine Ladeempfehlung vom SunnyHomeManager verfügbar ist.

object-ID Stop Charge: Dies ist der Datenpunkt, an dem Ihre Wallbox zum Laden angehalten wird. Der Adapter setzt den Wert auf „true“, wenn eine Empfehlung zum Anhalten des Ladevorgangs vom SunnyHomeManager verfügbar ist.

Objekt-ID „3-Phasen-Laden aktivieren“: Dies ist der Datenpunkt zur Aktivierung des Dreiphasenladens. Er wird nur verwendet, wenn die Option „Schalter zum Aktivieren des Dreiphasenladens vorhanden“ aktiviert ist.

Objekt-ID „3-Phasen-Laden deaktivieren“: Dies ist der Datenpunkt zum Deaktivieren des Drehstromladens. Er wird nur verwendet, wenn die Option „Schalter zum Aktivieren des Drehstromladens vorhanden“ aktiviert ist.

Alle Objekt-IDs können vom Typ sein:

- boolescher Wert
- Nummer
- URL

Im Falle einer URL wird Set-/CheckValue nicht verwendet.

## Anwendungsfälle

### Anfrage abbrechen, falls sich das Gerät nicht einschalten lässt

Manchmal benötigt ein Gerät die angeforderte Energie nicht (z. B. eine Wärmepumpe). In diesem Fall kann es sinnvoll sein, die Energieanforderung am SHM zu stornieren. Das SHM kann die verfügbare Energie dann anderen Geräten zur Verfügung stellen.

### Multi-Energie-Anfragen

- Die Energieanforderungszeiträume dürfen sich nicht überschneiden (idealerweise sollte ein Zeitunterschied von mindestens fünf Minuten eingehalten werden).
- Die Anzahl der Energieanforderungszeiträume ist nicht begrenzt.

![Geräte](../../../../en/adapterref/iobroker.semp/docu/settings/Portal_Planning.PNG)