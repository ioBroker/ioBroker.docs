---
chapters: {"pages":{"en/adapterref/iobroker.eebus-go/README.md":{"title":{"en":"ioBroker.eebus-go"},"content":"en/adapterref/iobroker.eebus-go/README.md"},"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md":{"title":{"en":"Architecture Scenario: Controlbox + EEBUS Energy Guards + Manual Energy Guards (LPC & LPP)"},"content":"en/adapterref/iobroker.eebus-go/doc/architecture-scenario.md"},"en/adapterref/iobroker.eebus-go/doc/setup.md":{"title":{"en":"Setup of iobroker.eebus-grpc sidecar"},"content":"en/adapterref/iobroker.eebus-go/doc/setup.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eebus-go/doc/architecture-scenario.md
title: Architekturszenario: Steuereinheit + EEBUS-Energiewächter + manuelle Energiewächter (LPC & LPP)
hash: 2rS7NgQ1al6HKV05vk4sfP36jRvc2ydAZKt3X/ovk64=
---
# Architekturszenario: Steuereinheit + EEBUS-Energiewächter + manuelle Energiewächter (LPC & LPP)

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

## Komponentenbeschreibung

| Komponente                   | Rolle                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Steuerkasten**             | Gerät des Netzbetreibers, das Verbrauchs- und/oder Produktionsgrenzen über das EEBUS/SHIP-Protokoll sendet.                                                                                                           |
| **EEBUS-Container**          | Docker-/Podman-Container, der den eebus-go SHIP-Stack ausführt. Übernimmt die gesamte EEBUS/SHIP-Netzwerkkommunikation, die mDNS-Erkennung und das SPINE-Datenmodell. Stellt dem Adapter eine gRPC-API zur Verfügung. |
| **CS-LPC-Anwendungsfall**    | Steuerbares System – Begrenzung des Stromverbrauchs (§14a EnWG). Empfängt Verbrauchsgrenzwerte von der Steuereinheit.                                                                                                 |
| **CS-LPP-Anwendungsfall**    | Steuerbares System – Begrenzung der Stromerzeugung (§9 EEG). Empfängt Produktionsgrenzen von der Steuereinheit.                                                                                                       |
| **EG-LPC-Anwendungsfall**    | Energy Guard – Begrenzung des Stromverbrauchs. Sendet Verbrauchsgrenzen an gekoppelte Endgeräte.                                                                                                                      |
| **EG-LPP-Anwendungsfall**    | Energy Guard – Begrenzung der Stromerzeugung. Sendet Produktionsgrenzen an gekoppelte Produktionsgeräte.                                                                                                              |
| **eebus-go Adapter**         | ioBroker-Adapter (HEMS-Koordinator), der über gRPC mit dem Container kommuniziert und an die LPC- und LPP-Anwendungsfallklassen delegiert.                                                                            |
| **LPC-Anwendungsfallklasse** | Implementiert CS-LPC-Zustände (init, unlimitedControlled, limited, failsafe, unlimitedAutonomous) und verteilt Verbrauchsgrenzen an LPC-Energiewächter.                                                               |
| **LPP-Anwendungsfallklasse** | Implementiert CS-LPP-Zustände (identische Zustandsmaschine) und verteilt Produktionsgrenzen an LPP-Energiewächter.                                                                                                    |
| **EEBUS Energy Guard**       | Leitet seinen Limitanteil über den EG-LPC- oder EG-LPP-gRPC-Endpunkt des Containers an ein gekoppeltes Gerät weiter. Akzeptiert außerdem manuelle Limits vom Operator (Gültigkeitsdauer: 60 Minuten).                 |
| **Manueller Energieschutz**  | Keine EEBUS-Verbindung. Das Limit wird manuell von einem Operator über ioBroker-Statusobjekte festgelegt.                                                                                                             |
| **Wärmepumpe**               | Das Endgerät ist über SKI mit dem Container gekoppelt. Es empfängt EG-LPC-Grenzwerte über EEBUS/SHIP.                                                                                                                 |
| **PV-Wechselrichter**        | Das Produktionsgerät ist über SKI mit dem Container gekoppelt. Es empfängt EG-LPP-Grenzwerte über EEBUS/SHIP.                                                                                                         |

## Datenfluss

### LPC (Verbrauchsbeschränkung)

1. Die **Controlbox** verbindet sich über das EEBUS/SHIP-Protokoll (mDNS-Erkennung, SKI-Vertrauen) mit dem **EEBUS-Container** .
2. Der **CS-LPC-Anwendungsfall** des Containers streamt Heartbeat- und Verbrauchslimit-Ereignisse über gRPC an den **Adapter** .
3. Die **LPC-Anwendungsfallklasse** wechselt ihren Zustandsautomaten basierend auf Heartbeat- und Limit-Nachrichten.
4. Wenn ein Verbrauchslimit aktiv ist, teilt die LPC-Klasse diesen prozentual auf die LPC-Energieschutzmodule auf.
5. Die **EEBUS Energy Guard-** Anrufe`WriteConsumptionLimit` auf dem **EG-LPC** gRPC-Endpunkt des Containers.
6. Der Container leitet den EG-LPC-Grenzwert über EEBUS/SHIP an die **Wärmepumpe** weiter.
7. Der **manuelle Energieschutz** setzt sein Limit auf Basis der Eingabe des Bedieners fest (ohne Beteiligung von EEBUS).
8. Der Bediener kann außerdem einen **manuellen Grenzwert** für den **EEBUS Energy Guard** festlegen (60 Minuten Dauer, Übertragung an die Wärmepumpe über den Container). Dieser wird zurückgesetzt, sobald der Grenzwert der Steuereinheit aktiv wird.

### LPP (Produktionsbeschränkung)

1. Die **Controlbox** sendet Produktionslimitvorgaben über EEBUS/SHIP an den **CS-LPP-Anwendungsfall** des Containers.
2. Der **CS-LPP-Anwendungsfall** des Containers streamt Heartbeat- und Produktionslimit-Ereignisse über gRPC an den **Adapter** .
3. Die **LPP-Anwendungsfallklasse** wechselt ihren Zustandsautomaten basierend auf Heartbeat- und Limit-Nachrichten.
4. Wenn eine Produktionsbegrenzung aktiv ist, teilt die LPP-Klasse diese prozentual auf die LPP-Energieschutzmodule auf.
5. Die **EEBUS Energy Guard-** Anrufe`WriteProductionLimit` auf dem **EG-LPP** gRPC-Endpunkt des Containers.
6. Der Container leitet den EG-LPP-Grenzwert über EEBUS/SHIP an den **PV-Wechselrichter** weiter.
7. Der **manuelle Energieschutz** wendet sein Produktionslimit basierend auf den Eingaben des Bedieners an.
8. Der Bediener kann außerdem ein **manuelles Produktionslimit** für den **EEBUS Energy Guard** festlegen (Dauer: 60 Minuten). Dieses wird zurückgesetzt, sobald das Produktionslimit der Steuereinheit aktiv wird.

## ioBroker-Objektbaum

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