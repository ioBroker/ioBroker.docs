---
chapters: {"pages":{"en/adapterref/iobroker.kecontact/README.md":{"title":{"en":"ioBroker.kecontact"},"content":"en/adapterref/iobroker.kecontact/README.md"},"en/adapterref/iobroker.kecontact/kecontact.md":{"title":{"en":"Programmablauf – ioBroker.kecontact"},"content":"en/adapterref/iobroker.kecontact/kecontact.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/kecontact.md
title: Программаblauf - ioBroker.kecontact
hash: jdhfqPHDux77bKQpJdXE0i6KDGHjey9qbP7RelO/Fs0=
---
# Программаblauf – ioBroker.kecontact

Этот документ описан в разделе «Программные настройки адаптеров», в котором описаны варианты конфигурации и данные. Есть собственная логика`main.js` в классе`Kecontact` .

---

## 1. Обзор

Адаптер предназначен для KEBA KeContact P20/P30 (bzw. BMW i) Wallbox über **UDP** . Кернауфгабе: во время периодического режима работы, чтобы получить возможность использовать PV-убершусс (дополнительно от аккумуляторной батареи), он будет работать и работать в сети и в режиме ожидания.

Zwei Betriebsarten:

- **Актив** (стандартный): Адаптер для широковещательной передачи на Wallbox, поиск и повторный запуск.
- **Пассивный** (`passiveMode` Одер`subsequent wallbox` ): nur Beobachtung, keine Regelung. Обратите внимание, что у Wallbox есть **мгновенный** доступ к Broadcast-Port.

---

## 2. Lebenszyklus / Start

```mermaid
flowchart TD
    A[onReady] --> B{I18n vorhanden?<br/>js-controller >= 7}
    B -- nein --> Bx[Fehler, Abbruch]
    B -- ja --> C[checkConfig]
    C -- ungültig --> Cx[Fehler, Abbruch]
    C -- gültig --> D{loadChargingSessions?}
    D -- ja --> E[createHistory<br/>History-Datenpunkte anlegen]
    D -- nein --> F
    E --> F[info.connection = false]
    F --> G[setupUdpCommunication<br/>txSocket + 2 rxSockets binden]
    G --> H[initializeInternalStateValues<br/>alle States in internen Cache laden<br/>Foreign-States registrieren]
    H --> I[subscribeStatesAndStartWorking]
    I --> J["subscribeStates('*')<br/>+ stateChangeListeners registrieren"]
    J --> K[requestReports<br/>Report 1/2/3 anfordern]
    K --> L[enableChargingTimer<br/>Intervall = aktiv/passiv Update]
    L --> M((Poll-Schleife läuft))
```

Важные баллы:

- `checkConfig()` verwirft ungültige IPs (`0.0.0.0` ,`127.0.0.1` ), setzt`isPassive` и интервал обновления.
- Внутренний кэш состояния (`getStateInternal` /`setStateInternal` ) просмотрите все ioBroker-States, если вы хотите выполнить асинхронное чтение повторно.
- `stateVehicleSoC` kann auf einen **Fremd-State** zeigen; dieser wird beim Start und bei Änderung dynamisch (un)подписка.

---

## 3. UDP-коммуникация

```mermaid
flowchart LR
    subgraph Empfang
      RX1[rxSocketReports<br/>Port 7090] --> HM[handleWallboxMessage]
      RX2[rxSocketBroadcast<br/>Broadcast-Port] --> HB[handleWallboxBroadcast]
      HM --> HMSG[handleMessage]
      HB --> HMSG
      HMSG --> HJ[handleJsonMessage<br/>KEBA-Report JSON parsen]
      HJ --> UP[updateState<br/>Datenpunkte aktualisieren]
    end
    subgraph Senden
      Q[sendUdpDatagram<br/>Prioritäts-Queue] --> SN[sendNextQueueDatagram<br/>gedrosselt via sendDelayTimer]
      SN --> TX[txSocket -> Wallbox]
    end
```

- **Senden ist gedrosselt** (Очередь +`sendDelayTimer` ), мы получим доступ к командам Wallbox.`highPriority` команда должна стоять в очереди.
- Schreiben auf steuernde Datenpunkte löst über`stateChangeListeners` das passende UDP-Kommando aus (см. Таблицу Abschnitt 6).
- Bei mehreren Instanzen tauschen sich diese über`internal.message` (`handleWallboxExchange` ) аус.

---

## 4. Регель-Шляйфе:`checkWallboxPower()`

Герц адаптеров. Wird periodisch (Таймер) и bei erzwungenen Neuberechnungen (`forceUpdateOfCalculation` ) ауфгеруфен. Эргебнис ист-эйн-Ладестрем`curr` в мА, через`regulateWallbox()` gesetzt wird – oder`stopCharging()` .

```mermaid
flowchart TD
    START[checkWallboxPower] --> LADEN{lädt Fahrzeug bereits<br/>ohne chargeTimestamp?}
    LADEN -- ja --> TS[chargeTimestamp setzen]
    LADEN -- nein --> LIMITS
    TS --> LIMITS

    subgraph LIMITS[Obergrenzen bestimmen tempMax]
      L1[Start: tempMax = getMaxCurrent]
      L1 --> L2{maxGridPowerActive?}
      L2 -- ja --> L2a[Netzleistungs-Limit<br/>getTotalPowerAvailable -> Ampere]
      L2 -- nein --> L3
      L2a --> L3{maxAmperageActive?}
      L3 -- ja --> L3a[Amperegrenze je Phase<br/>getTotalAmperageAvailable]
      L3 -- nein --> L4
      L3a --> L4{§14a EnWG aktiv?}
      L4 -- ja --> L4a[getMaxCurrentEnWG]
      L4 -- nein --> L5
      L4a --> L5[tempMax < minCurrent -> tempMax = 0]
    end

    LIMITS --> SUR[available = getSurplusWithoutWallbox<br/>statistics.surplus setzen]
    SUR --> SW{check1p3pSwitching<br/>läuft Phasenumschaltung?}
    SW -- ja --> RET1[return, warten]
    SW -- nein --> PAS{isPassive?}
    PAS -- ja --> RET2[nur Session-Daten pflegen, return]
    PAS -- nein --> IVAL{innerhalb<br/>intervalCalculating?}
    IVAL -- ja --> IVALa[nur bei Bedarf auf tempMax deckeln, return]
    IVAL -- nein --> LOCK

    LOCK{gesperrt?<br/>pauseWallbox / tempMax=0 /<br/>PV aktiv & nicht eingesteckt}
    LOCK -- ja --> CURR0[curr = 0]
    LOCK -- nein --> DYN{isDynamicChargingActive?<br/>PV-Automatik greift}

    DYN -- nein --> MAXP[curr = tempMax<br/>Laden mit Maximalleistung<br/>1p3p -> 3p bzw. off]
    DYN -- ja --> CALC[curr = getAmperage available, phases]

    CALC --> BAT{Batterie-Mindestladung?}
    BAT --> SOC{maxSoC erreicht?}
    SOC -- ja --> CURR0
    SOC -- nein --> P13{has1P3PAutomatic?}
    P13 -- ja --> P13a[prepareFor1p/3pCharging<br/>je nach manuellem Schalter/Überschuss]
    P13 -- nein --> ADD
    P13a --> ADD[addPower: Netzbezug bis Grenze zulassen]
    ADD --> HOLD{chargeTimestamp gesetzt?<br/>Session halten}
    HOLD -- ja --> HOLDa[underusage / minTime /<br/>regardTime prüfen -> ggf. curr = minCurrent]
    HOLD -- nein --> AUTH
    HOLDa --> AUTH

    CURR0 --> AUTH
    MAXP --> AUTH
    AUTH{authChargingTime aktiv &<br/>frisch autorisiert?}
    AUTH -- ja --> AUTHa[curr = minCurrent für Startfenster]
    AUTH -- nein --> DEC
    AUTHa --> DEC

    DEC{curr < minCurrent?}
    DEC -- ja --> STOP[Phasen auf Default,<br/>stopCharging]
    DEC -- nein --> SET[ggf. 1p3p umschalten<br/>curr auf tempMax deckeln<br/>regulateWallbox curr<br/>chargingToBeStarted = true]
```

### Керн-Райхенфольге (Приоритет дер Эйншранкунген)

1. **Harte Obergrenzen** zuerst:`maxGridPower` →`maxAmperage` →`§14a EnWG` . Diese können den Strom nur **senken** , nie erhöhen.
2. **Сперрен** : Мануэль Пауза, kein Fahrzeug eingesteckt,`tempMax = 0` .
3. **Betriebsmodus** : динамизм (PV) против Maximalleistung (`isDynamicChargingActive` – abhängig von PV-Automatik,`targetSoC` ,`maxSoC` ).
4. **Überschussrechnung** с дополнительным аккумулятором.
5. **Сессион-Халтен** :`addPower` ,`underusage` ,`minTime` ,`regardTime` verhindern ständiges Ein/Aus – ein einmal gestarteter Ladevorgang wird toleriert fortgeführt.
6. **Phasenumschaltung 1p/3p** als Sonderfall, der die Rechnung neu anstößt.

---

## 5. Zusammenspiel der Optionen (Конфигурация → Verhalten)

Опционен аус`admin/jsonConfig.json` (`this.config.*` ). Fremd-States включает в себя Verweise auf Datenpunkte **anderer** Adaptor (Energiezähler, Speicher, Fahrzeug-SoC).

| Берейх           | Вариант(ен)                                                                                                                                                              | Wirkung im Ablauf                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Verbindung       | `host` ,`pollInterval` ,`passiveMode` ,`loadChargingSessions` ,`lessInfoLogs`                                                                                            | Основа: IP, Poll-Takt, aktiv/passiv, Session-Download, Log-Detail.                 |
| PV-Basis         | `stateSurplus` ,`stateRegard`                                                                                                                                            | Fremd-States für Überschuss / Netzbezug →`getSurplusWithoutWallbox`                |
| PV-Feintuning    | `minAmperage` ,`addPower` ,`delta` ,`underusage` ,`minTime` ,`regardTime`                                                                                                | Начало/остановка сеанса, гистерезисное выравнивание                                |
| Wallbox-Einbezug | `statesIncludeWallbox` ,`wallboxNotIncluded`                                                                                                                             | ob Wallbox-Leistung в Zählerwerten bereits enthalten ist                           |
| 1p/3p            | `state1p3pSwitch` ,`1p3pSwitchIsNO` ,`1p3pViaX2` ,`useX1forAutomatic`                                                                                                    | Phasenumschaltung через Schütz (НО/НЗ) или порт X2; X1-Эйнганг                     |
| Batteriespeicher | `stateBatteryCharging` ,`stateBatteryDischarging` ,`stateBatterySoC` ,`batteryPower` ,`batteryChargePower` ,`batteryMinSoC` ,`batteryLimitSoC` ,`batteryStorageStrategy` | ob/wie Speicher fürs Fahrzeug genutzt wird →`getBatteryStoragePower` Стратегии 1–4 |
| §14a EnWG        | `stateEnWG` ,`dynamicEnWG` ,`powerEnWG`                                                                                                                                  | fixe 6 или динамическое начало →`getMaxCurrentEnWG`                                |
| Leistungslimit   | `maxPower` ,`stateEnergyMeter1..3` ,`wallboxNotIncluded`                                                                                                                 | Gesamtleistungs-Deckel →`getTotalPowerAvailable`                                   |
| Амперлимит       | `maxAmperage` ,`stateAmperagePhase1..3` ,`amperageUnit`                                                                                                                  | Deckel je Phase →`getTotalAmperageAvailable`                                       |
| Авторизация      | `authChargingTime`                                                                                                                                                       | Zwangs-Ladefenster nach RFID-Autorisierung                                         |

Merksatz: **Fremd-States leefern Messwerte** , **Optionen liefern Parameter/Grenzen** , und die dynamischen`automatic.*` -Datenpunkte erlauben Übersteuerung zur Laufzeit.

---

## 6. Steuernde Datenpunkte (Шрайбен → UDP-Kommando)

Зарегистрироваться в`subscribeStatesAndStartWorking()` . Чтобы получить дополнительную информацию в UDP-команде, выполните следующие действия:

| Пункт данных                             | Kommando an Wallbox                         |
| ---------------------------------------- | ------------------------------------------- |
| `enableUser`                             | `ena 0/1`                                   |
| `currentUser`                            | `curr <mA>`                                 |
| `currentTimer` (+`timeoutCurrentTimer` ) | `currtime <mA> <t>`                         |
| `output`                                 | `output 0/1`                                |
| `display`                                | `display 0 0 0 0 <text>`                    |
| `setenergy`                              | `setenergy <Wh*10>`                         |
| `report`                                 | `report <n>`                                |
| `start` /`stop`                          | `start <tag>` / `stop <tag>`                |
| `setdatetime`                            | `setdatetime <...>`                         |
| `unlock`                                 | `unlock`                                    |
| `x2phaseSource` /`x2phaseSwitch`         | `x2src <n>` /`x2 <n>` (+`1p3pSwTimestamp` ) |

---

## 7. Динамический Штойер-Датенпункте`automatic.*`

Diese verändern das Regelverhalten zur Laufzeit (по сценарию/виду описания), без UDP-команды – sie fließen in`checkWallboxPower` эйн:

| Пункт данных                                         | Bedeutung                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `automatic.photovoltaics`                            | PV-Automatik an (динамичный) / aus (Maximalleistung)         |
| `automatic.pauseWallbox`                             | sofortiger Ladestopp, solange `true`                         |
| `automatic.addPower`                                 | erlaubter zusätzlicher Netzbezug (W); отрицательный = Резерв |
| `automatic.limitCurrent` /`automatic.limitCurrent1p` | Ampere-Deckel dynamisches Laden (0 = aus / aus Settings)     |
| `automatic.maxGridPower`                             | Netzleistungs-Deckel (0 = другие настройки,`maxPower` )      |
| `automatic.calcPhases`                               | Phasenzahl für Berechnung (KeContact Deutschland-Edition)    |
| `automatic.1p3pCharging`                             | erzwungen 1p oder 3p                                         |
| `automatic.batteryStorageStrategy`                   | Стратегии Шпайхера 1–4                                       |
| `automatic.batterySoCForCharging`                    | Speicher erst ab diesem SoC nutzen                           |
| `automatic.stateVehicleSoC`                          | Fremd-State mit Fahrzeug-SoC                                 |
| `automatic.targetSoC`                                | Bis zu diesem SoC ohne PV с максимальной нагрузкой           |
| `automatic.maxSoC`                                   | Oberhalb dieses SoC больше не загружен                       |
| `automatic.resetTargetSoC`                           | `targetSoC` nach Erreichen zurücksetzen                      |

---

## 8. Ergebnis-/Status-Datenpunkte

| Пункт данных                                                         | Вдох (gesetzt durch Regelung)                         |
| -------------------------------------------------------------------- | ----------------------------------------------------- |
| `statistics.surplus`                                                 | Актуеллер Überschuss für PV-Automatik                 |
| `statistics.maxPower` /`statistics.maxAmperage`                      | wirksame Leistungs-/Amperegrenze                      |
| `statistics.chargingPhases`                                          | актуальный фазенцаль                                  |
| `statistics.plugTimestamp` /`chargeTimestamp` /`authPlugTimestamp`   | Zeitstempel Einstecken / Ladebeginn / Autorisierung   |
| `statistics.consumptionTimestamp` /`1p3pSwTimestamp`                 | Таймер остановки Netzbezug / Letzte Phasenumschaltung |
| `statistics.lastChargeStart` /`lastChargeFinish` /`lastChargeAmount` | последняя сессия                                      |
| `statistics.sessionId` ,`rfid_tag` ,`rfid_class`                     | Информация о сессиях/RFID                             |
| `info.connection`                                                    | Wallbox erreichbar                                    |

Roh-Messwerte der Wallbox (из KEBA-Reports):`state` ,`plug` ,`p` ,`u1..u3` ,`i1..i3` ,`ePres` ,`eTotal` ,`maxCurrent` ,`currentHardware` ушв.

---

## 9. Kurz-Zusammenfassung des Zusammenspiels

1. **Используйте** UDP-отчет (собственный Wallbox) и другие **состояния Fremd** (Zähler, Speicher, Fahrzeug-SoC) во внутреннем кэше.
2. **Optionen** legen Parameter und harte Grenzen fest;**`automatic.*`** erlaubt Laufzeit-Übersteuerung.
3. `checkWallboxPower()` verrechnet beides zu einem Ladestrom, unter Beachtung der Reihenfolge Grenzen → Sperren → Modus → Überschuss → Session-Halten → 1p/3p.
4. Das Ergebnis wird via`regulateWallbox()` /`stopCharging()` также UDP-команда отправляется и в`statistics.*` gespiegelt.