---
chapters: {"pages":{"en/adapterref/iobroker.sun2000-modbus/README.md":{"title":{"en":"ioBroker.sun2000-modbus"},"content":"en/adapterref/iobroker.sun2000-modbus/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/README.md":{"title":{"en":"ioBroker SUN2000 Documentation"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/README.md"},"en/adapterref/iobroker.sun2000-modbus/docs/migration.md":{"title":{"en":"Migration of historical data (on state name change)"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/migration.md"},"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md":{"title":{"en":"Configuration"},"content":"en/adapterref/iobroker.sun2000-modbus/docs/configuration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sun2000-modbus/docs/migration.md
title: Перенос исторических данных (о смене названия штата)
hash: mg6ZXfd4hlmchOWxqsVF55CU1wHRuUr9elZKtXy4uO0=
---
# Перенос исторических данных (о смене названия штата)

## ИнфлюксД

1. Стоп-адаптер
2. Скопируйте измерение в новое.`stateOfCapacity` ->`stateOfCharge` )\
   &#x20;<https://www.laub-home.de/wiki/InfluxDB_2_Measurements_umbenennen> (DE)
   - Откройте веб-интерфейс InfluxDB 2 (`http://<INFLUXDB2>:8086` )
   - На вкладке «DataExplorer» нажмите «Редактор скриптов».
   - Заменять`old` ,`new` и название корзины с вашими значениями.
     ```
     from(bucket: "example-bucket")
         |> range(start: 2021-11-21T00:00:00Z, stop: 2021-11-22T00:00:00Z)
         |> filter(fn: (r) => r._measurement == "old")
         |> set(key: "_measurement", value: "new")
         |> to(bucket: "example-bucket")
     ```
3. Удалите старый (`stateOfCapacity` )
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
4. Установите адаптер. Запишите в новое состояние.