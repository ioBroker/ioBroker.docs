---
chapters: {"pages":{"en/adapterref/iobroker.eebus-go/README.md":{"title":{"en":"ioBroker.eebus-go"},"content":"en/adapterref/iobroker.eebus-go/README.md"},"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md":{"title":{"en":"Architecture Scenario: Controlbox + EEBUS Energy Guards + Manual Energy Guards (LPC & LPP)"},"content":"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md"},"en/adapterref/iobroker.eebus-go/doc/setup.md":{"title":{"en":"Setup of iobroker.eebus-grpc sidecar"},"content":"en/adapterref/iobroker.eebus-go/doc/setup.md"}}}
---
# Setup of iobroker.eebus-grpc sidecar

The eebus-go adapter communicates with the EEBUS network through a gRPC sidecar. EEBUS uses mDNS (multicast DNS) for device discovery, so the sidecar must have access to the local network (host networking or macvlan).

There are four options for running the sidecar, depending on your environment.

## Option 1: Managed by ioBroker (recommended)

If ioBroker is installed **directly on the host** (not inside a container), the adapter can manage the Docker container automatically using the built-in Docker plugin.

**Prerequisites:**
- Docker Engine >= 20.10 installed on the host
- The ioBroker user must have access to the Docker socket (typically member of the `docker` group)

**Setup:**
1. Open the adapter instance configuration in the admin UI
2. On the **Base Config** tab, check **Enable Docker Container**
3. Optionally adjust the **Docker Log Level**
4. Save — the adapter will automatically pull the image, create, and start the container with host networking

The gRPC endpoint is managed internally (`127.0.0.1:50051`) and cannot be changed when Docker is enabled. The container lifecycle (start/stop/update) is fully handled by the adapter.

> **Note:** Because EEBUS relies on mDNS, the container runs with `--network=host`. Host networking is only supported on **Linux**. On Windows and macOS, Docker Desktop runs containers inside a Linux VM, so `--network=host` does not expose the container to the real LAN. Use Option 2 (macvlan) or run the sidecar natively on those platforms.

## Option 2: Docker Compose (ioBroker running in a container)

If ioBroker itself runs inside a Docker container, you need to run the eebus-grpc container separately. Use a macvlan network so both containers can use mDNS on the LAN.

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

**Important:** In the adapter settings, set `grpcEndpoint` to `172.30.0.10:50051` (the container's internal bridge IP). Do **not** enable the Docker checkbox in this setup.

If you need to reach containers on the macvlan from the host, set up an additional IP link:

```bash
ip link add mac0 link enp3s0 type macvlan mode bridge
ip addr add 192.168.178.219/24 dev mac0
ip link set mac0 up
ip route add 192.168.178.220/30 dev mac0 protocol static
```

## Option 3: Pre-built binary (no Docker)

If you cannot use Docker (e.g. on Windows or macOS without a Linux VM), you can download and run the pre-built binary directly from https://github.com/FernetMenta/eebus-grpc.

> **Important:** Do not simply grab the latest release — consult the adapter's [README](/#/adapters/eebus-go) for the compatible eebus-grpc version. Mismatched versions may cause connection failures.

**Usage:**

```bash
eebus-grpc-<os>-<arch> -port=<port> -ipv4Addr=<bind address> -certificate-path=<certificate path> -private-key-path=<private key path>
```

For example on Linux amd64:

```bash
eebus-grpc-linux-amd64 -port=50051 -ipv4Addr=192.168.178.10 -certificate-path=./certs/myhems_cert -private-key-path=./certs/myhems_key
```

Set `grpcEndpoint` in the adapter to `<bind address>:<port>`. Do **not** enable the Docker checkbox in this setup.

> **Tip:** When running the binary on the same host as ioBroker, use `127.0.0.1` as the bind address. This keeps the gRPC port off the network and avoids unnecessary exposure.

> **Note:** When running the binary directly, you are responsible for health checks and log redirection (e.g. via systemd, a process manager, or your own scripting).

## Option 4: Quick test with docker run

For development or quick testing on the host network:

```bash
mkdir -p certs
docker run --rm -it \
  --network=host \
  -v "$PWD/certs:/certs" \
  -e LOG_LEVEL=debug \
  ghcr.io/fernetmenta/eebus-grpc:v2.0.2
```

Certificates are created automatically in the certs directory if they don't exist. Set `grpcEndpoint` in the adapter to `127.0.0.1:50051`.

## Environment Variables

| Variable    | Default              | Description                          |
| ----------- | -------------------- | ------------------------------------ |
| `IPV4_ADDR` | `0.0.0.0`            | gRPC server bind address             |
| `CRT_PATH`  | `/certs/myhems_cert` | Path to certificate                  |
| `KEY_PATH`  | `/certs/myhems_key`  | Path to private key                  |
| `GRPC_PORT` | `50051`              | gRPC server port                     |
| `LOG_LEVEL` | `info`               | Log level: trace, debug, info, error |

Note: `0.0.0.0` configures the server to listen on all interfaces. For production, use a specific IP address to limit exposure.