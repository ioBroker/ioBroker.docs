---
chapters: {"pages":{"en/adapterref/iobroker.influxdb/README.md":{"title":{"en":"ioBroker.influxdb"},"content":"en/adapterref/iobroker.influxdb/README.md"},"en/adapterref/iobroker.influxdb/RetentionPolicies.md":{"title":{"en":"Understanding retention policies"},"content":"en/adapterref/iobroker.influxdb/RetentionPolicies.md"}}}
---
# Understanding retention policies

It is important to understand how **Retention Policies** and **Shard Group Durations** are related in order to determine how long data
will be kept in InfluxDB.

Influx stores all measurements within a given time range into the same **Shard** which itself is part of a **Shard Group**.
The Shard Group enforces a time range defined by `Shard Group Duration` to all shards, but it is set differently depending on the Influx release.

When exceeding the configured `Shard Group Duration`,
  
- a new Shard is created which stores newer measurement data from that point onwards
- the old Shard with all its measurement-data is still kept in the database, but will be dropped, once the retention policy for the measurement is exceeded

Measurement data-points are not deleted by Influx via "looking" at their retention policies individually, but instead the Shard as a whole is subject to retention policy check and will be dropped, if the retention policy is exceeded. The check however will only be performed on old Shards, meaning Shards that are still active are not checked, as they also still can receive new measurement data points.

*Please refer to https://docs.influxdata.com/influxdb/v1.4/concepts/schema_and_data_layout/#shard-group-duration-management
for more explanation and examples.*

The following two examples illustrate how the same retention period will be enforced differently, depending on the configured Shard Group Duration.

|                                    | Example 1                                                                                                                                       | Example 2                                                                                                                                                                                                                                                                                                              |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Retention Period                   | 2 hours                                                                                                                                         | 2 hours                                                                                                                                                                                                                                                                                                                |
| Shard Group Duration               | 1 hour                                                                                                                                          | 1 day                                                                                                                                                                                                                                                                                                                  |
| How long will data be kept at max? | 2 hours                                                                                                                                         | 1 day                                                                                                                                                                                                                                                                                                                  |
| Why?                               | The Shard is switched every hour, hence Influx will enforce the configured RP once **every hour** and keep only data from the **last 2 hours**. | The Shard is switched once a day, and Influx will then enforce the configured RP, meaning it will only keep data from the last **2 hours**. Because of this, measurement-data inserted at the beginning of the Shard-lifetime in theory should only be kept for 2 hours, but effectively will be kept a **whole day**. |

 ## iobroker.influxdb Adapter
The Influx Adapter only allows you to select a **Retention Period** and itself will automatically choose the **Shard Group Duration** according to [official InfluxDB recommendations](https://docs.influxdata.com/influxdb/v2.0/reference/internals/shards/#shard-group-duration).

| Bucket retention period     | Default shard group duration |
|-----------------------------|------------------------------|
| less than 2 days            | 1h                           |
| between 2 days and 6 months | 1d                           |
| greater than 6 months       | 7d                           |

The Shard Group Duration can still be altered manually in the DB itself, but in order to keep the adapter configuration manageable,
it can not be changed directly within ioBroker.

By design, the adapter enforces only one global retention policy that applies to all measurements - regardless of the DB version that is used. The policy can be changed at any time, but for the reasons described earlier, it might take a while for the changes to take effect.
  
## Additional considerations

- The shard group duration is often configured shorter than the retention period, in order to be enforced effectively. But it is difficult to state this as a general advice, since other factors, like performance should be considered, too. If shard group durations are configured extremely short, this might be beneficial for housekeeping, but it could negatively impact performance, like causing longer query times, or slow write speeds.
- A retention policy may not be lower than 1 hour. This was a choice made by Influx devs (https://github.com/influxdata/influxdb/issues/5198#issuecomment-166629531) and can only be bypassed by building InfluxDB from the latest source with changed values directly.
- Retention policies are checked by default every 30 minutes. This can be changed, however, in [server configuration for Influx 1.x](https://docs.influxdata.com/influxdb/v1.8/administration/config/#retention-policy-settings) and [server configuration for Influx 2.x](https://docs.influxdata.com/influxdb/v2.0/reference/config-options/#storage-retention-check-interval). This does **not** bypass the principles explained earlier. 
- **Influx 1.x**: For existing dbs the adapter is able to detect the current default retention policy and will update it. If you modified retention policies manually and now are still experiencing missing data in the adapter, it might be related to the changed default-policy. See also here for more information: https://docs.influxdata.com/influxdb/v1.7/troubleshooting/frequently-asked-questions/#why-am-i-missing-data-after-creating-a-new-default-retention-policy.