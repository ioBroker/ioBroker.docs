---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/states.md":{"title":{"en":"States"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/states.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sun2000-modbus/docs/states.md
title: Штаты
hash: qR/61FTJ9BYeN54HJPxgSw391jq8zS190ceS3YBgdlM=
---
# Штаты

Будут получены данные о состояниях, определенные в переменной dataFields в [файле states.ts (строка 81)](https://github.com/daolis/ioBroker.sun2000-modbus/blob/main/src/lib/states.ts#L81) .

Существует 3 определенных интервала:

- `INITIAL` : Загружается только при запуске\
  &#x20;Например, для получения данных, которые не изменяются от инвертора (SerialNR, Model и т. д.) (Он также будет получать регистры, содержащие количество PVString или MPPTrackers; эти значения будут использоваться для динамического добавления состояний для получения «реального» количества`MPPT[n]Power` или`PV[n]Voltage` и`PV[n]Current` )
- `HIGH` Получать значения с коротким интервалом (по умолчанию 5 секунд)
- `LOW` : Запись данных с более длительным интервалом (по умолчанию 30 секунд)

**Пример**\
&#x20;(Тот, который с`value mapper` , один с`post update hook` ):

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

## Не создавайте и не обновляйте состояние для поля.

Если`state.type` Свойство не задано, значение статуса считывается из инвертора, но состояние не будет создано или обновлено.

Это используется, например, для получения регистров аварийных сигналов. Аварийные сигналы разделены на 3 битовых поля типа uint16. Эти 3 регистра не имеют определенного типа состояния. Вместо этого значения из этих регистров вычисляются в...`post fetch update hook` (Объединить 3 значения в одно — (16 \* 3-значная двоичная строка) и список активных оповещений в формате JSON)

## Крючки

### Разместите начальные хуки для получения данных.

Эти обработчики выполняются после получения данных из регистров INITIAL.

Например, используется для динамического добавления состояний MPPTracker и PVString.

### Хук обновления (на уровне поля)

Этот обработчик выполняется после обновления одного значения.\
&#x20;например, установить состояния только для вычислений, такие как "вычисление".`storage.chargePower` и`storage.dischargePower` от`storage.chargeDischargePower` .

### Хук обновления после получения данных (уровень интервала)

Эти обработчики выполняются после того, как будут получены все регистры для интервала ab.

Например, подготовьте сигналы тревоги и файлы alarmsJSON на основе 3 значений сигналов тревоги.