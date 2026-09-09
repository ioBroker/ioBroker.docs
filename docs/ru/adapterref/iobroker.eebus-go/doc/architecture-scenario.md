---
chapters: {"pages":{"en/adapterref/iobroker.eebus-go/README.md":{"title":{"en":"ioBroker.eebus-go"},"content":"en/adapterref/iobroker.eebus-go/README.md"},"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md":{"title":{"en":"Architecture Scenario: Controlbox + EEBUS Energy Guards + Manual Energy Guards (LPC & LPP)"},"content":"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md"},"en/adapterref/iobroker.eebus-go/doc/setup.md":{"title":{"en":"Setup of iobroker.eebus-grpc sidecar"},"content":"en/adapterref/iobroker.eebus-go/doc/setup.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eebus-go/doc/architecture-scenario.md
title: Архитектурный сценарий: Блок управления + Защита от перегрузки по энергии EEBUS + Ручная защита от перегрузки по энергии (LPC и LPP)
hash: 2rS7NgQ1al6HKV05vk4sfP36jRvc2ydAZKt3X/ovk64=
---
# Архитектурный сценарий: Блок управления + Защита от перенапряжения EEBUS + Ручная защита от перенапряжения (LPC и LPP)

```mermaid
graph TD
    subgraph Grid / Utility
        CB["<b>Controlbox</b><br/>(Energy Guard)"]
    end

    subgraph EEBUS Container
        SHIP["<b>EEBUS/SHIP Stack</b><br/>gRPC Server"]
        CSLPC["CS-LPC Use Case"]
        CSLPP["CS-LPP Use Case"]
        EGLPC1["EG-LPC Use Case 1"]
        EGLPP1["EG-LPP Use Case 1"]
        EGn["..."]
        SHIP --- CSLPC
        SHIP --- CSLPP
        SHIP --- EGLPC1
        SHIP --- EGLPP1
    end

    subgraph ioBroker HEMS Adapter
        ADAPTER["<b>eebus-go Adapter</b><br/>(HEMS Coordinator)"]
        LPC_UC["LPC Use Case Class<br/>(State Machine + Distribution)"]
        LPP_UC["LPP Use Case Class<br/>(State Machine + Distribution)"]
        ADAPTER --> LPC_UC
        ADAPTER --> LPP_UC
    end

    subgraph LPC Energy Guards
        LPC_MG1["<b>Manual Guard</b><br/>(type: manual)"]
        LPC_EG1["<b>EEBUS Guard</b><br/>(type: eebus)"]
    end

    subgraph LPP Energy Guards
        LPP_MG1["<b>Manual Guard</b><br/>(type: manual)"]
        LPP_EG1["<b>EEBUS Guard</b><br/>(type: eebus)"]
    end

    subgraph Consumers
        HP["<b>Heatpump</b>"]
    end

    subgraph Producers
        PV["<b>PV Inverter</b>"]
    end

    CB -->|"EEBUS/SHIP"| SHIP
    CSLPC -->|"gRPC stream<br/>heartbeat + consumption limit"| ADAPTER
    CSLPP -->|"gRPC stream<br/>heartbeat + production limit"| ADAPTER
    LPC_UC -->|"proportional limit"| LPC_MG1
    LPC_UC -->|"proportional limit"| LPC_EG1
    LPP_UC -->|"proportional limit"| LPP_MG1
    LPP_UC -->|"proportional limit"| LPP_EG1
    LPC_EG1 -->|"gRPC<br/>WriteConsumptionLimit"| EGLPC1
    LPP_EG1 -->|"gRPC<br/>WriteProductionLimit"| EGLPP1
    EGLPC1 -->|"EEBUS/SHIP<br/>EG-LPC limit"| HP
    EGLPP1 -->|"EEBUS/SHIP<br/>EG-LPP limit"| PV
    HP -.->|"paired via SKI"| SHIP
    PV -.->|"paired via SKI"| SHIP

    style CB fill:#4A90D9,stroke:#6AB0FF,color:#fff
    style SHIP fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style CSLPC fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style CSLPP fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style EGLPC1 fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style EGLPP1 fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style EGn fill:#3B7DD8,stroke:#5A9AEF,color:#fff
    style ADAPTER fill:#4CAF50,stroke:#66CC6A,color:#fff
    style LPC_UC fill:#F9A825,stroke:#FFC107,color:#000
    style LPP_UC fill:#7B1FA2,stroke:#CE93D8,color:#fff
    style LPC_EG1 fill:#E57373,stroke:#FF8A80,color:#fff
    style LPC_MG1 fill:#FFB74D,stroke:#FFCC80,color:#000
    style LPP_EG1 fill:#E57373,stroke:#FF8A80,color:#fff
    style LPP_MG1 fill:#FFB74D,stroke:#FFCC80,color:#000
    style HP fill:#AB47BC,stroke:#CE93D8,color:#fff
    style PV fill:#66BB6A,stroke:#A5D6A7,color:#000
```

## Описание компонента

| Компонент                             | Роль                                                                                                                                                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Блок управления**                   | Устройство оператора энергосети, передающее ограничения потребления и/или производства по протоколу EEBUS/SHIP.                                                                                                 |
| **Контейнер EEBUS**                   | Контейнер Docker/Podman, работающий со стеком eebus-go SHIP. Обрабатывает все сетевые операции EEBUS/SHIP, обнаружение mDNS и модель данных SPINE. Предоставляет адаптеру доступ к gRPC API.                    |
| **Пример использования CS-LPC**       | Управляемая система — Ограничение энергопотребления (§14a EnWG). Получает данные об ограничениях потребления от блока управления.                                                                               |
| **Пример использования CS-LPP**       | Управляемая система — Ограничение выработки электроэнергии (§9 ЭЭГ). Получает ограничения на выработку электроэнергии от блока управления.                                                                      |
| **Пример использования EG-LPC**       | Energy Guard — Ограничение энергопотребления. Передает ограничения на потребление энергии сопряженным потребительским устройствам.                                                                              |
| **Пример использования EG-LPP**       | Energy Guard — Ограничение выработки электроэнергии. Передаёт ограничения на выработку электроэнергии парным производственным устройствам.                                                                      |
| **Адаптер eebus-go**                  | Адаптер ioBroker (координатор HEMS), который взаимодействует с контейнером через gRPC и делегирует задачи классам сценариев использования LPC и LPP.                                                            |
| **Класс вариантов использования LPC** | Реализует состояния CS-LPC (инициализация, неограниченное контролируемое, ограниченное, отказоустойчивое, неограниченное автономное) и распределяет ограничения потребления между системами защиты энергии LPC. |
| **Класс вариантов использования LPP** | Реализует состояния CS-LPP (идентичный конечный автомат) и распределяет ограничения на производство энергии между защитниками LPP.                                                                              |
| **EEBUS Energy Guard**                | Передает свою лимитную долю на сопряженное устройство через конечную точку gRPC EG-LPC или EG-LPP контейнера. Также принимает лимиты, установленные вручную оператором (продолжительность 60 минут).            |
| **Ручная защита энергии**             | Отсутствует соединение EEBUS. Лимит устанавливается вручную оператором с помощью объектов состояния ioBroker.                                                                                                   |
| **Тепловой насос**                    | Потребительское устройство сопряжено с контейнером через SKI. Получает ограничения EG-LPC по шине EEBUS/SHIP.                                                                                                   |
| **фотоэлектрический инвертор**        | Производственное устройство сопряжено с контейнером через SKI. Получает ограничения EG-LPP по шине EEBUS/SHIP.                                                                                                  |

## Поток данных

### LPC (ограничение потребления)

1. **Блок управления** подключается к **контейнеру EEBUS** через протокол EEBUS/SHIP (обнаружение mDNS, доверие SKI).
2. **В рамках сценария использования CS-LPC** контейнер передает события пульсации и ограничения потребления на **адаптер по протоколу** gRPC.
3. **Класс вариантов использования LPC** осуществляет переходы своего конечного автомата на основе сообщений о пульсе и ограничениях.
4. Когда активен лимит потребления, класс LPC распределяет его между энергозащитными устройствами LPC в процентном соотношении.
5. **Энергетическая защита EEBUS** вызывает`WriteConsumptionLimit` на конечной точке gRPC **EG-LPC** контейнера.
6. Контейнер передает ограничение EG-LPC на **тепловой насос** по шине EEBUS/SHIP.
7. Система **ручной защиты от перенапряжения** устанавливает ограничение на основе ввода данных оператором (без использования EEBUS).
8. Оператор также может установить **вручную ограничение** на **EEBUS Energy Guard** (продолжительность 60 минут, передается на тепловой насос через контейнер). Это ограничение сбрасывается, когда срабатывает ограничение блока управления.

### LPP (Ограничение производства)

1. Блок **управления** передает обязательства по ограничению производства в **сценарий использования CS-LPP** контейнера через EEBUS/SHIP.
2. **В рамках сценария использования CS-LPP** контейнер передает события пульсации и ограничения производственной среды на **адаптер** через gRPC.
3. **Класс вариантов использования LPP** осуществляет переходы своего конечного автомата на основе сообщений о пульсе и ограничениях.
4. Когда активен лимит производства, класс LPP распределяет его между защитными элементами LPP в процентах.
5. **Энергетическая защита EEBUS** вызывает`WriteProductionLimit` на конечной точке gRPC **EG-LPP** контейнера.
6. Контейнер передает ограничение EG-LPP на **фотоэлектрический инвертор** по шине EEBUS/SHIP.
7. Система **ручного регулирования энергопотребления** устанавливает предельный уровень выработки энергии на основе данных, введенных оператором.
8. Оператор также может установить **вручную ограничение на производство энергии** в системе **EEBUS Energy Guard** (продолжительность 60 минут). Это ограничение сбрасывается, когда активируется ограничение на производство в блоке управления.

## Дерево объектов ioBroker

```
eebus-go.0/
├── info/
│   ├── connection         (boolean)
│   ├── discoveredDevices  (JSON string)
│   └── ski                (string)
├── LPC/
│   ├── state              (string)
│   ├── limit              (number, W)
│   ├── limitDuration      (number, min)
│   ├── limitMinutesToday  (number, min)
│   └── EnergyGuards/
│       └── Guard_{name}/
│           ├── percentage, currentLimit, lastHeartbeat, failsafeLimit
│           ├── eebusConnected, manualLimit, confirmedLimit  (EEBUS only)
│           └── heartbeat, connected                         (manual only)
├── LPP/
│   ├── state              (string)
│   ├── limit              (number, W)
│   ├── limitDuration      (number, min)
│   ├── limitMinutesToday  (number, min)
│   └── EnergyGuards/
│       └── Guard_{name}/
│           ├── percentage, currentLimit, lastHeartbeat, failsafeLimit
│           ├── eebusConnected, manualLimit, confirmedLimit  (EEBUS only)
│           └── heartbeat, connected                         (manual only)
```