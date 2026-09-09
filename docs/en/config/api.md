---
title: External interfaces
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/api.md
hash: LlTjK/9N01Atb1OMbKaJlmq5zLF5YzV/lxgXgU68z7Q=
---
# External interfaces

Eventually, something other than an adapter will need to communicate with ioBroker: a shell script, Node-RED, Grafana, a weather station, a neighbor's home automation system, or a custom-built app. Adapters exist that provide external access for this purpose.

## Which access

| adapter        | Art                     | Port from factory    | Good for                                                                |
| -------------- | ----------------------- | -------------------- | ----------------------------------------------------------------------- |
| **simple-api** | HTTP, static addresses  | 8087                 | Reading or setting a value from a script or a browser                   |
| **rest-api**   | HTTP, REST with Swagger | 8093                 | Programs that expect a clean interface, with login via tokens           |
| **ws**         | WebSocket               | on the`web` -Adapter | Applications that should detect changes **immediately** without asking. |

The rule of thumb: **query** via HTTP, **listen** via WebSocket. Anyone who calls the same address every ten seconds to see if anything has changed really needs a WebSocket.

## simple-api

The easiest access. After creating an instance, it delivers`http://<adresse>:8087/help` The list of possible calls. The most important ones:

```
http://<adresse>:8087/getPlainValue/<id>        nur der Wert, als Text
http://<adresse>:8087/get/<id>                  der Zustand als JSON
http://<adresse>:8087/getBulk/<id1>,<id2>       mehrere auf einmal
http://<adresse>:8087/set/<id>?value=1          einen Wert setzen
http://<adresse>:8087/toggle/<id>               umschalten
http://<adresse>:8087/setBulk?<id1>=0.7&<id2>=0 mehrere setzen
http://<adresse>:8087/states?pattern=hm-rpc.0*  Zustände suchen
http://<adresse>:8087/objects?pattern=hm-rpc.0* Objekte suchen
```

Appended to a call, formatted`?prettyPrint` The output is readable. This allows you to try everything out in the browser before it's incorporated into a script.

?>`getPlainValue` It returns only the value, without quotation marks or parentheses. That's exactly what a shell script needs to pass the value on.

The progress can also be viewed if a [recording](/docs/config/history.md) is in progress:

```
http://<adresse>:8087/query/<id>?dateFrom=2026-09-01T00:00:00.000Z&aggregate=minmax&count=2000
```

## rest-api

The more modern approach. A call from`http://<adresse>:8093/` opens a Swagger interface where all calls can be tried out without having to look them up first.

```
http://<adresse>:8093/v1/state/<id>             Zustand als JSON
http://<adresse>:8093/v1/state/<id>/plain       nur der Wert
http://<adresse>:8093/v1/sendto/javascript.0    eine Nachricht an eine Instanz
http://<adresse>:8093/v1/command/<name>         einen Befehl ausführen
```

States can also be **subscribed to** , and via`http://<adresse>:8093/oauth/token` Is there a login option using a token instead of a username and password in the address?

## ws

WebSocket access. It is not accessed directly, but rather used by an application that establishes a persistent connection and is notified of changes instead of requesting them. vis and echarts retrieve their data this way.

Since version 4, the adapter works with pure WebSockets; socket.io is only emulated. An example is available in the [repository](https://github.com/ioBroker/ioBroker.ws) .

## Security

These adapters grant access to your data points, and without registration, access is open to anyone who knows the address. This might be sufficient within your own network, but not beyond.

Three things are required before an interface extends beyond the home network:

1. **Enable login** on the relevant instance. See [Authentication](/docs/config/login.md) .
2. **Creating a separate user** with only the rights required by the calling program is not possible.`admin` See [Access Management](/docs/config/userrights.md) .
3. **Encrypt your** connection; otherwise, your login credentials will be transmitted in plaintext. See [Encryption](/docs/config/encryption.md) .

!> At`simple-api` The username and password are included in the address and therefore end up in logs and the browser's history list. This is relevant for external access.`rest-api` Tokens are the better choice.

Making it accessible remotely is possible without an open port via the [IoT adapter](/docs/cloud/iot.md) . Port forwarding to one of these interfaces is the worst of the possible solutions.

## The reverse way

If the data is not to be queried but **reported** , i.e., an external system sends something to ioBroker, other methods are possible:

- **MQTT** via the adapter of the same name, if the other system supports it.
- **URL services** via the cloud are used when the message originates from the internet and no port should be opened. See [Services](/docs/cloud/services.md) .
- **simple-api** with`set` , if the foreign system can simply access an address.