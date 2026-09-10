---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/states.md":{"title":{"en":"States"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/states.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sun2000-modbus/docs/states.md
title: Staaten
hash: qR/61FTJ9BYeN54HJPxgSw391jq8zS190ceS3YBgdlM=
---
# Staaten

Die in der Variablen dataFields in [states.ts L81](https://github.com/daolis/ioBroker.sun2000-modbus/blob/main/src/lib/states.ts#L81) definierten Zustände werden abgerufen.

Es gibt 3 definierte Intervalle:

- `INITIAL` Wird NUR beim Start abgerufen\
  &#x20;z. B. um Daten zu erhalten, die sich vom Wechselrichter nicht ändern (Seriennummer, Modell, ...). (Es werden auch die Register abgerufen, die die Anzahl der PVStrings oder MPPTracker enthalten; diese Werte werden verwendet, um Zustände dynamisch hinzuzufügen und so die „tatsächliche“ Anzahl zu ermitteln.)`MPPT[n]Power` oder`PV[n]Voltage` Und`PV[n]Current` )
- `HIGH` : Werte in kurzem Intervall abrufen (Standard: 5 Sekunden)
- `LOW` : Abruf mit einem längeren Intervall (Standard 30 Sekunden)

**Beispiel**\
&#x20;(Einer mit`value mapper` , einer mit`post update hook` ):

```json
{
    interval: UpdateIntervalID.LOW,
    state: {id: 'grid.meterStatus', name: 'Meter status', type: 'string', role: 'info.status'},
    register: {reg: 37100, type: ModbusDatatype.uint16, length: 1, gain: 1},
    mapper: value => Promise.resolve(MeterStatus[value])
},
{
    interval: UpdateIntervalID.HIGH,
    state: {id: 'grid.activePower', name: 'Active power', type: 'number', role: 'value.power.active', unit: 'W', desc: '(>0 feed-in to the power grid, <0: supply from the power grid)'},
    register: {reg: 37113, type: ModbusDatatype.int32, length: 2},
    postUpdateHook: async (adapter, value): Promise<Map<string, StateToUpdate>> =>
    {
        return Promise.resolve(new Map<string, StateToUpdate>([
            ['grid.feedIn', {id: 'grid.feedIn', value: Math.max(0, value), updateState: true}],
            ['grid.supplyFrom', {id: 'grid.supplyFrom', value: Math.abs(Math.min(0, value)), updateState: true}]
        ]));
    }
}
```

## Für das Feld keinen Status erstellen oder aktualisieren

Wenn die`state.type` Die Eigenschaft ist nicht festgelegt, der Statuswert wird vom Wechselrichter gelesen, aber es wird kein Zustand erstellt oder aktualisiert.

Dies wird beispielsweise zum Abrufen der Alarmregister verwendet. Die Alarme werden in bis zu drei uint16-Bitfelder aufgeteilt. Diese drei Register haben keinen definierten Zustandstyp. Stattdessen werden die Werte aus diesen Registern in einem`post fetch update hook` (Kombiniere 3 Werte zu einem - (16 \* 3-stellige Binärzeichenkette) und eine JSON-Liste aktiver Alarme)

## Haken

### Hooks für den ersten Abruf

Diese Hooks werden ausgeführt, nachdem die INITIAL-Register abgerufen wurden.

z.B. wird es verwendet, um MPPTracker- und PVString-Zustände dynamisch hinzuzufügen.

### Post-Update-Hook (Feldebene)

Dieser Hook wird ausgeführt, nachdem ein einzelner Wert aktualisiert wurde.\
&#x20;z. B. um Zustände festzulegen, in denen nur Berechnungen durchgeführt werden, wie z. B. die Berechnung`storage.chargePower` Und`storage.dischargePower` aus`storage.chargeDischargePower` Die

### Post-Fetch-Update-Hook (Intervallebene)

Diese Hooks werden ausgeführt, nachdem alle Register für das ab-Intervall abgerufen wurden.

Beispiel: Alarme und alarmsJSON aus 3 Alarmwerten vorbereiten.