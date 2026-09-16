---
chapters: {"pages":{"en/adapterref/iobroker.eebus-go/README.md":{"title":{"en":"ioBroker.eebus-go"},"content":"en/adapterref/iobroker.eebus-go/README.md"},"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md":{"title":{"en":"Architecture Scenario: Controlbox + EEBUS Energy Guards + Manual Energy Guards (LPC & LPP)"},"content":"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md"},"en/adapterref/iobroker.eebus-go/doc/setup.md":{"title":{"en":"Setup of iobroker.eebus-grpc sidecar"},"content":"en/adapterref/iobroker.eebus-go/doc/setup.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eebus-go/doc/setup.md
title: Настройка сайдкара iobroker.eebus-grpc
hash: OFlXEWdPt5lSLNaivK0VvPlV7pwQ9kp2cIXlG0tMhRg=
---
# Настройка сайдкара iobroker.eebus-grpc

Адаптер eebus-go взаимодействует с сетью EEBUS через gRPC-контейнер. EEBUS использует mDNS (многоадресный DNS) для обнаружения устройств, поэтому контейнер должен иметь доступ к локальной сети (сетевой сети хоста или macvlan).

Существует четыре варианта управления коляской, в зависимости от условий окружающей среды.

## Вариант 1: Управление через ioBroker (рекомендуется)

Если ioBroker установлен **непосредственно на хосте** (а не внутри контейнера), адаптер может автоматически управлять контейнером Docker, используя встроенный плагин Docker.

**Предварительные требования:**

- На хосте установлен Docker Engine версии 20.10 и выше.
- Пользователь ioBroker должен иметь доступ к сокету Docker (обычно он является членом группы).`docker` группа)

**Настраивать:**

1. Откройте конфигурацию экземпляра адаптера в административном интерфейсе.
2. На вкладке **«Базовая конфигурация»** установите флажок **«Включить контейнер Docker».**
3. При желании можно настроить **уровень логирования Docker.**
4. Сохраните — адаптер автоматически загрузит образ, создаст и запустит контейнер с сетевыми настройками хоста.

Управление конечной точкой gRPC осуществляется внутри системы (`127.0.0.1:50051` ) и не может быть изменено при включенном Docker. Жизненный цикл контейнера (запуск/остановка/обновление) полностью обрабатывается адаптером.

> **Примечание:** Поскольку EEBUS использует mDNS, контейнер запускается с`--network=host` Поддержка сетевого взаимодействия с хостом доступна только в **Linux** . В Windows и macOS Docker Desktop запускает контейнеры внутри виртуальной машины Linux, поэтому...`--network=host` не предоставляет доступ к контейнеру из реальной локальной сети. Используйте вариант 2 (macvlan) или запустите sidecar-контейнер непосредственно на этих платформах.

## Вариант 2: Docker Compose (ioBroker, работающий в контейнере)

Если сам ioBroker работает внутри контейнера Docker, вам необходимо запустить контейнер eebus-grpc отдельно. Используйте сеть macvlan, чтобы оба контейнера могли использовать mDNS в локальной сети.

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

**Важно:** В настройках адаптера установите`grpcEndpoint` к`172.30.0.10:50051` (внутренний IP-адрес моста контейнера). **Не** включайте флажок Docker в этой настройке.

Если вам необходимо получить доступ к контейнерам в macvlan с хоста, настройте дополнительное IP-соединение:

```bash
ip link add mac0 link enp3s0 type macvlan mode bridge
ip addr add 192.168.178.219/24 dev mac0
ip link set mac0 up
ip route add 192.168.178.220/30 dev mac0 protocol static
```

## Вариант 3: Предварительно собранный бинарный файл (без Docker)

Если у вас нет возможности использовать Docker (например, в Windows или macOS без виртуальной машины Linux), вы можете загрузить и запустить предварительно собранный бинарный файл непосредственно с <https://github.com/FernetMenta/eebus-grpc> .

> **Важно:** Не следует просто брать последнюю версию — ознакомьтесь с [файлом README](/#/adapters/eebus-go) адаптера, чтобы узнать совместимую версию eebus-grpc. Несовместимые версии могут привести к сбоям подключения.

**Применение:**

```bash
eebus-grpc-<os>-<arch> -port=<port> -ipv4Addr=<bind address> -certificate-path=<certificate path> -private-key-path=<private key path>
```

Например, в Linux amd64:

```bash
eebus-grpc-linux-amd64 -port=50051 -ipv4Addr=192.168.178.10 -certificate-path=./certs/myhems_cert -private-key-path=./certs/myhems_key
```

Набор`grpcEndpoint` в адаптере к`<bind address>:<port>` В этой конфигурации **не** следует включать флажок Docker.

> **Совет:** При запуске исполняемого файла на том же хосте, что и ioBroker, используйте`127.0.0.1` В качестве адреса привязки. Это позволяет предотвратить доступ порта gRPC к сети и избежать ненужного раскрытия информации.

> **Примечание:** При непосредственном запуске исполняемого файла вы сами отвечаете за проверку работоспособности и перенаправление логов (например, через systemd, менеджер процессов или собственные скрипты).

## Вариант 4: Быстрая проверка с помощью команды \`docker run\`.

Для разработки или быстрого тестирования в хост-сети:

```bash
mkdir -p certs
docker run --rm -it \
  --network=host \
  -v "$PWD/certs:/certs" \
  -e LOG_LEVEL=debug \
  ghcr.io/fernetmenta/eebus-grpc:v2.0.2
```

Если сертификаты еще не существуют, они автоматически создаются в каталоге certs.`grpcEndpoint` в адаптере к`127.0.0.1:50051` .

## Переменные окружающей среды

| Переменная  | По умолчанию         | Описание                                                      |
| ----------- | -------------------- | ------------------------------------------------------------- |
| `IPV4_ADDR` | `0.0.0.0`            | адрес привязки gRPC-сервера                                   |
| `CRT_PATH`  | `/certs/myhems_cert` | Путь к сертификату                                            |
| `KEY_PATH`  | `/certs/myhems_key`  | Путь к закрытому ключу                                        |
| `GRPC_PORT` | `50051`              | порт сервера gRPC                                             |
| `LOG_LEVEL` | `info`               | Уровень логирования: трассировка, отладка, информация, ошибка |

Примечание:`0.0.0.0` Настраивает сервер для прослушивания всех интерфейсов. В производственной среде используйте определенный IP-адрес, чтобы ограничить доступ.