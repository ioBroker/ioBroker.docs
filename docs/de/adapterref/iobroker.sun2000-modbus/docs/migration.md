---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sun2000-modbus/docs/migration.md
title: Migration historischer Daten (bei Namensänderung eines Bundesstaates)
hash: mg6ZXfd4hlmchOWxqsVF55CU1wHRuUr9elZKtXy4uO0=
---
# Migration historischer Daten (bei Namensänderung eines Bundesstaates)

## InfluxDB

1. Stoppadapter
2. Die Messung in die neue Datei kopieren.`stateOfCapacity` ->`stateOfCharge` )\
   &#x20;<https://www.laub-home.de/wiki/InfluxDB_2_Measurements_umbenennen> (DE)
   - InfluxDB 2-Weboberfläche öffnen (`http://<INFLUXDB2>:8086` )
   - Klicken Sie auf der Registerkarte „DataExplorer“ auf „Skripteditor“.
   - Ersetzen`old` ,`new` und der Bucket-Name mit Ihren Werten.
     ```
     from(bucket: "example-bucket")
         |> range(start: 2021-11-21T00:00:00Z, stop: 2021-11-22T00:00:00Z)
         |> filter(fn: (r) => r._measurement == "old")
         |> set(key: "_measurement", value: "new")
         |> to(bucket: "example-bucket")
     ```
3. Löschen Sie die alte Datei (`stateOfCapacity` )
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
4. Neuen Adapter installieren. Neuen Zustand schreiben.