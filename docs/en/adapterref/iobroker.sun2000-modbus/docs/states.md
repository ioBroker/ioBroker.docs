---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/states.md":{"title":{"en":"States"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/states.md"}}}
---
# States

The states defined in variable dataFields in [states.ts L81](https://github.com/daolis/ioBroker.sun2000-modbus/blob/main/src/lib/states.ts#L81) will be fetched.

There are 3 defined intervals:

* `INITIAL`: ONly fetched at startup\
  e.g. to get data which does not change from inverter (SerialNR, Model, ...)
  (It will fetch the registers containing the number of PVString or MPPTrackers too, this values will be used to dynamically add states to fetch the 'real' number of `MPPT[n]Power` or `PV[n]Voltage` and `PV[n]Current`)
* `HIGH`: Fetch values with a short interval (default 5sec)
* `LOW`: Fetch with a longer interval (default 30sec)

**Example**\
(One with `value mapper`, one with `post update hook`):
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

## Do not create or update state for field

If the `state.type` property is not set, the status the value is read from the inverter, but no state will be created nor updated.

This is used for e.g. getting the alarm registers. The alarms are split up to 3 uint16 bitfields. These 3 registers has no defined state type.
Instead, the values from these registers are evaluated in a `post fetch update hook`.
(combine 3 values to one - (16 * 3 digit binary string), and a json list of active alarms)

## Hooks

### Post initial fetch hooks

These hooks are executed after fetching the INITIAL registers.

e.g. used for dynamically adding MPPTracker and PVString states.

### Post update hook (Field level)

These hook is executed after a single value was updated.\
e.g. to set calculation only states, like calculating `storage.chargePower` and `storage.dischargePower` from `storage.chargeDischargePower`.

### Post fetch update hook (Interval level)

These hooks are executed after all registers for ab interval are fetched.

e.g. Prepare alarms & alarmsJSON from 3 alarm values.