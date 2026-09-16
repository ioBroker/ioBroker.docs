---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/states.md":{"title":{"en":"States"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/states.md"}}}
---
# Migration of historical data (on state name change)

## InfluxDB

1. Stop Adapter
2. Copy the measurement to new one. (`stateOfCapacity` -> `stateOfCharge`)\
   https://www.laub-home.de/wiki/InfluxDB_2_Measurements_umbenennen (DE)
   * Open InfluxDB 2 web interface (`http://<INFLUXDB2>:8086`)
   * On 'DataExplorer' tab click on 'Script Editor'
   * Replace `old`, `new` and the bucket name with your values.
     ```
     from(bucket: "example-bucket")
         |> range(start: 2021-11-21T00:00:00Z, stop: 2021-11-22T00:00:00Z)
         |> filter(fn: (r) => r._measurement == "old")
         |> set(key: "_measurement", value: "new")
         |> to(bucket: "example-bucket")
     ```
3. Delete the old one (`stateOfCapacity`)
   ```shell
   # InfluxDB Host
   INFLUXHOST=localhost
   # openHAB Database
   INFLUXDB=openhab_db
   # InflusDB API Key
   INFLUXDBAUTH="TkrV8yQ8adcwwwwedsiuhf5V1OhXasdfadfeGgtzsb_bfucYeHSeTID-JlB7AKBZjE47TCwf8w-jGCFzpChw=="
   # Measurement to delete
   MEASUREMENT="LaubIot07BME680_Temperature"

   curl -s --get http://$INFLUXHOST:8086/query?db=$INFLUXDB \
       --header "Authorization: Token $INFLUXDBAUTH" \
       --data-urlencode "q=DROP MEASUREMENT $MEASUREMENT"
   ```
4. Install new adapter. Write to new state