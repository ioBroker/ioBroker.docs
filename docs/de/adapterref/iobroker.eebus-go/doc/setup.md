---
chapters: {"pages":{"en/adapterref/iobroker.eebus-go/README.md":{"title":{"en":"ioBroker.eebus-go"},"content":"en/adapterref/iobroker.eebus-go/README.md"},"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md":{"title":{"en":"Architecture Scenario: Controlbox + EEBUS Energy Guards + Manual Energy Guards (LPC & LPP)"},"content":"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md"},"en/adapterref/iobroker.eebus-go/doc/setup.md":{"title":{"en":"Setup of iobroker.eebus-grpc sidecar"},"content":"en/adapterref/iobroker.eebus-go/doc/setup.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eebus-go/doc/setup.md
title: Einrichtung des iobroker.eebus-grpc Sidecars
hash: OFlXEWdPt5lSLNaivK0VvPlV7pwQ9kp2cIXlG0tMhRg=
---
# Einrichtung des iobroker.eebus-grpc Sidecars

Der eebus-go-Adapter kommuniziert über einen gRPC-Sidecar mit dem EEBUS-Netzwerk. EEBUS verwendet mDNS (Multicast-DNS) zur Geräteerkennung, daher muss der Sidecar Zugriff auf das lokale Netzwerk (Host-Netzwerk oder Macvlan) haben.

Es gibt vier Möglichkeiten, den Sidecar auszuführen, abhängig von Ihrer Umgebung.

## Option 1: Verwaltet von ioBroker (empfohlen)

Wenn ioBroker **direkt auf dem Host** installiert ist (nicht in einem Container), kann der Adapter den Docker-Container mithilfe des integrierten Docker-Plugins automatisch verwalten.

**Voraussetzungen:**

- Docker Engine >= 20.10 ist auf dem Host installiert
- Der ioBroker-Benutzer muss Zugriff auf den Docker-Socket haben (typischerweise ein Mitglied der Docker-Socket-Umgebung).`docker` Gruppe)

**Aufstellen:**

1. Öffnen Sie die Adapterinstanzkonfiguration in der Admin-Oberfläche.
2. Aktivieren Sie auf der Registerkarte **„Basiskonfiguration“** **die Option „Docker-Container aktivieren“** .
3. Optional kann der **Docker-Protokollierungsgrad** angepasst werden.
4. Speichern – der Adapter lädt das Image automatisch herunter, erstellt den Container und startet ihn mit der Host-Netzwerkverbindung.

Der gRPC-Endpunkt wird intern verwaltet (`127.0.0.1:50051` und kann nicht geändert werden, wenn Docker aktiviert ist. Der Container-Lebenszyklus (Start/Stopp/Aktualisierung) wird vollständig vom Adapter verwaltet.

> **Hinweis:** Da EEBUS auf mDNS basiert, läuft der Container mit`--network=host` Host-Netzwerkfunktionen werden nur unter **Linux** unterstützt. Unter Windows und macOS führt Docker Desktop Container in einer Linux-VM aus.`--network=host` Der Container wird nicht im realen LAN angezeigt. Verwenden Sie Option 2 (macvlan) oder führen Sie den Sidecar nativ auf diesen Plattformen aus.

## Option 2: Docker Compose (ioBroker läuft in einem Container)

Wenn ioBroker selbst in einem Docker-Container läuft, muss der eebus-grpc-Container separat ausgeführt werden. Verwenden Sie ein macvlan-Netzwerk, damit beide Container mDNS im LAN nutzen können.

```yaml
services:
  eebus-grpc:
    image: ghcr.io/fernetmenta/eebus-grpc:v2.0.2
    container_name: eebus-grpc
    hostname: iob-hems
    restart: unless-stopped
    environment:
      IPV4_ADDR: 172.30.0.10
      CRT_PATH: "/certs/myhems_cert"
      KEY_PATH: "/certs/myhems_key"
      GRPC_PORT: 50051
      LOG_LEVEL: info
    networks:
      internal:
        ipv4_address: 172.30.0.10
      lan:
        ipv4_address: 192.168.178.221
    user: 1000:1000
    volumes:
      - ./certs:/certs
    healthcheck:
      test: ["CMD-SHELL", "grpc-health-probe -addr=$${IPV4_ADDR}:50051 || pkill -u $$(id -u)"]
      interval: 60s
      timeout: 10s
      retries: 3
      start_period: 10s

  iobroker:
    container_name: iobroker
    image: buanet/iobroker
    hostname: iobroker
    restart: always
    depends_on:
      eebus-grpc:
        condition: service_healthy
    networks:
      internal:
        ipv4_address: 172.30.0.11
      lan:
        ipv4_address: 192.168.178.222
    ports:
      - "8081:8081"
    volumes:
      - ./iobrokerdata:/opt/iobroker
    environment:
      - TZ=Europe/Berlin

networks:
  internal:
    driver: bridge
    ipam:
      config:
        - subnet: 172.30.0.0/24
          gateway: 172.30.0.1
          ip_range: 172.30.0.0/24
  lan:
    driver: macvlan
    driver_opts:
      parent: enp3s0
    ipam:
      config:
        - subnet: 192.168.178.0/24
          gateway: 192.168.178.1
          ip_range: 192.168.178.220/30
```

**Wichtig:** Stellen Sie in den Adaptereinstellungen Folgendes ein:`grpcEndpoint` Zu`172.30.0.10:50051` (die interne Bridge-IP des Containers). Aktivieren Sie in dieser Konfiguration **nicht** das Docker-Kontrollkästchen.

Wenn Sie von dem Host aus auf Container im Macvlan zugreifen müssen, richten Sie eine zusätzliche IP-Verbindung ein:

```bash
ip link add mac0 link enp3s0 type macvlan mode bridge
ip addr add 192.168.178.219/24 dev mac0
ip link set mac0 up
ip route add 192.168.178.220/30 dev mac0 protocol static
```

## Option 3: Vorkompilierte Binärdatei (ohne Docker)

Falls Sie Docker nicht verwenden können (z. B. unter Windows oder macOS ohne eine Linux-VM), können Sie die vorkompilierte Binärdatei direkt von <https://github.com/FernetMenta/eebus-grpc> herunterladen und ausführen.

> **Wichtig:** Laden Sie nicht einfach die neueste Version herunter – konsultieren Sie die [README-Datei](/#/adapters/eebus-go) des Adapters, um die kompatible eebus-grpc-Version zu ermitteln. Versionskonflikte können zu Verbindungsfehlern führen.

**Verwendung:**

```bash
eebus-grpc-<os>-<arch> -port=<port> -ipv4Addr=<bind address> -certificate-path=<certificate path> -private-key-path=<private key path>
```

Zum Beispiel unter Linux amd64:

```bash
eebus-grpc-linux-amd64 -port=50051 -ipv4Addr=192.168.178.10 -certificate-path=./certs/myhems_cert -private-key-path=./certs/myhems_key
```

Satz`grpcEndpoint` im Adapter zu`<bind address>:<port>` Aktivieren Sie in dieser Konfiguration **nicht** das Docker-Kontrollkästchen.

> **Tipp:** Wenn Sie die Binärdatei auf demselben Host wie ioBroker ausführen, verwenden Sie`127.0.0.1` als Bindungsadresse. Dadurch bleibt der gRPC-Port vom Netzwerk fern und unnötige Offenlegung wird vermieden.

> **Hinweis:** Wenn Sie die Binärdatei direkt ausführen, sind Sie für die Integritätsprüfung und die Umleitung der Protokolle verantwortlich (z. B. über systemd, einen Prozessmanager oder Ihre eigenen Skripte).

## Option 4: Schnelltest mit docker run

Für die Entwicklung oder schnelle Tests im Host-Netzwerk:

```bash
mkdir -p certs
docker run --rm -it \
  --network=host \
  -v "$PWD/certs:/certs" \
  -e LOG_LEVEL=debug \
  ghcr.io/fernetmenta/eebus-grpc:v2.0.2
```

Zertifikate werden automatisch im Zertifikatsverzeichnis erstellt, falls sie noch nicht vorhanden sind.`grpcEndpoint` im Adapter zu`127.0.0.1:50051` Die

## Umgebungsvariablen

| Variable    | Standard             | Beschreibung                                      |
| ----------- | -------------------- | ------------------------------------------------- |
| `IPV4_ADDR` | `0.0.0.0`            | gRPC-Server-Bindungsadresse                       |
| `CRT_PATH`  | `/certs/myhems_cert` | Pfad zum Zertifikat                               |
| `KEY_PATH`  | `/certs/myhems_key`  | Pfad zum privaten Schlüssel                       |
| `GRPC_PORT` | `50051`              | gRPC-Server-Port                                  |
| `LOG_LEVEL` | `info`               | Protokollierungsstufe: Trace, Debug, Info, Fehler |

Notiz:`0.0.0.0` Konfiguriert den Server so, dass er auf allen Schnittstellen lauscht. Im Produktivbetrieb sollte eine spezifische IP-Adresse verwendet werden, um die Angriffsfläche zu minimieren.