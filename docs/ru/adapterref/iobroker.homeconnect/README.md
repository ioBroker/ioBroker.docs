---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homeconnect
BADGE-stable: https://iobroker.live/badges/homeconnect-stable.svg
BADGE-Installations: https://iobroker.live/badges/homeconnect-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homeconnect
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: dvUU0ta6sAga8HiRasziX0549VfBKyghdWNRZIjBtEk=
---
# ioBroker.homeconnect

Управляйте и контролируйте бытовую технику Bosch, Siemens, NEFF и Gaggenau через официальный облачный API Home Connect — посудомоечные машины, стиральные машины, сушилки, духовки, варочные панели, вытяжки, холодильники, морозильники, кофеварки, роботы-пылесосы и многое другое.

Каждое значение поступает в удобном для непосредственного использования формате: включение/выключение — в виде логического значения, фиксированный выбор — в виде читаемого имени, измерение — в виде числа с указанием единицы измерения и предельных значений. Обновления поступают в режиме реального времени через единый поток событий, а программы можно выбирать, настраивать и запускать из ioBroker.

## Требования

- Node.js >= 22
- js-controller >= 7.2.5
- Администрирование >= 8.2.0
- Бесплатная учетная запись разработчика Home Connect, включающая идентификатор клиента (Client ID) и секретный ключ клиента (Client Secret).

## Получение учетных данных для Home Connect

Три вещи должны быть взаимосвязаны: ваша обычная учетная запись Home Connect (та, что используется в приложении Home Connect, где сопряжены ваши устройства), связанная с ней учетная запись разработчика и приложение, зарегистрированное в учетной записи разработчика. На странице настроек отображаются те же шаги в виде контрольного списка, с кнопками для создания учетной записи разработчика, регистрации приложения и открытия ваших приложений.

1. Создайте бесплатную учетную запись разработчика на [developer.home-connect.com](https://developer.home-connect.com/user/register) . В качестве **учетной записи Home Connect по умолчанию для тестирования** введите адрес электронной почты вашей учетной записи приложения Home Connect — точно так же, как в приложении, **строчными буквами** . Это свяжет две учетные записи; без этого вход в систему будет отклонен.
2. [Зарегистрируйте приложение](https://developer.home-connect.com/applications/add) : любой **идентификатор приложения** , **поток аутентификации OAuth.** `Device Flow` (Адаптер работает на сервере без браузера; изменить схему работы позже невозможно), **Перенаправление при успешном выполнении** пустое, **Режим одноразового токена** отключен.
3. **Подождите от 15 до 60 минут** — новое или отредактированное приложение станет активным в Home Connect только после этого времени.
4. Скопируйте **идентификатор клиента** (64 символа) и **секретный ключ клиента** в настройки адаптера и сохраните.

## Вход в систему

После сохранения учетных данных адаптер запрашивает ссылку для входа. На панели настроек она отображается вместе с **кодом** подтверждения. Откройте ссылку, войдите в свою учетную запись Home Connect и подтвердите доступ — адаптер автоматически обрабатывает подтверждение в течение нескольких секунд и сохраняет данные для входа в зашифрованном виде. Уведомление только указывает на настройки: код меняется каждые пять минут, и на панели всегда отображается текущий код.

Пока соединение ожидает подтверждения, оно обновляется каждые пять минут. Если в течение часа никто не подтверждает соединение, адаптер перестает запрашивать у Home Connect новые ссылки; **запрос новой ссылки для входа** в систему в панели запускается снова, и происходит перезапуск. **Сброс входа в** систему удаляет данные для входа и запускает новый вход — например, для переключения на другую учетную запись Home Connect. Кнопка **«Проверить соединение»** обращается непосредственно к Home Connect: она сообщает, сколько устройств указано в вашей учетной записи и сколько из них подключено в данный момент, а также выполняются ли обновления в реальном времени.

Вход в систему осуществляется один раз. Адаптер автоматически обновляет доступ; новый вход в систему требуется только в случае отзыва доступа в вашей учетной записи Home Connect, отказа Home Connect в приеме приложения (отключено, удалено, новый секретный ключ) или перемещения данных ioBroker в другую систему — сохраненные данные для входа в систему там не могут быть прочитаны, о чем сообщается в журнале.

Если Home Connect отклоняет запрос на вход, на панели отображается ответ и дальнейшие действия; `auth.lastError` сохраняет ответ (см. раздел «Устранение неполадок»).

## Дерево объектов

Каждому устройству выделяется отдельная папка. Ее название состоит из **модели устройства и последних четырех символов его собственного номера Home Connect** (например, `sx87tx02ce-5775`) — неизменяемый и разный для двух устройств одной модели, для которых не существует ни названия приложения, ни номера E с заводской таблички. Название устройства из приложения остается видимым в качестве отображаемого имени папки и отображается в режиме реального времени. Если два устройства одной модели заканчиваются на одинаковые четыре символа, второе получает свой полный номер.

Ниже каждого прибора — какие каналы он будет использовать, зависит от его типа; холодильники, морозильники и винные холодильники не имеют программ:

| Канал        | Что в нём содержится?                                                                                                                                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`       | `reachable` — подключено ли устройство в данный момент к Home Connect (зеленая/серая точка на папке); `firmware` — версия прошивки стиральной, сушильной или стирально-сушильной машины; Home Connect не запрашивает её, поэтому она отображается после того, как устройство самостоятельно отправляет свои версии, и затем остаётся видимой. |
| `status`     | Состояние устройства (только для чтения): рабочее состояние. `programRunning` дистанционное и локальное управление, внутреннее освещение, неисправности, батарея                                                                                                                                                                              |
| `run`        | Программа в процессе выполнения: оставшееся, прошедшее и общее время, прогресс, этап, прогнозы потребления энергии и воды, рекомендации — пусто, пока программа не запущена.                                                                                                                                                                 |
| `settings`   | Записываемые параметры: состояние питания, блокировка от детей, внутреннее освещение, температура холодильника.                                                                                                                                                                                                                              |
| `doors`      | Каждая дверца прибора имеет логическое значение: `door` (дверца прибора), `doorLocked` а в холодильных установках каждое отделение (`freezer`, `refrigerator` …)                                                                                                                                                                               |
| `events`     | Каждое событие этого типа прибора отображается как логическое значение: программа завершена, соль почти закончилась, ополаскиватель закончился, фильтр насыщен, сработала дверная сигнализация…                                                                                                                                              |
| `counters`   | Итоговые показатели: количество пробежек, время бега, затраченная энергия, вода, моющее средство, смягчитель воздуха, напитки.                                                                                                                                                                                                               |
| `programs`   | `selectedProgram`, `activeProgram` и `start` /`stop` кнопки                                                                                                                                                                                                                                                                                   |
| `options`    | Вы можете выбрать следующие параметры программы: температура, скорость отжима, интенсивная зона, отложенный старт…                                                                                                                                                                                                                           |
| `commands`   | Устройство оснащено кнопками мгновенного действия, например, для подтверждения события.                                                                                                                                                                                                                                                      |
| `history`    | Заезды, по одному каналу каждый: `latest`, `previous`, `thirdLatest` …с программой и продолжительностью; `latest` Также содержит информацию о начале, конце, завершении, а также о расходе воды, энергии, моющих средств и смягчителя воды, если прибор предоставляет соответствующие данные.                                                  |
| `statistics` | По каждой программе: количество начатых запусков, количество завершенных запусков, общее время выполнения.                                                                                                                                                                                                                                   |

На уровне отдельных экземпляров, `info.devicesTotal`, `info.devicesOnline` и `info.devicesAllOnline` кратко изложите содержание отчета. `info.connection` Индикатор горит зелёным, когда адаптер подключен **и** выполняются обновления в реальном времени. `auth.lastError` содержит ответ Home Connect на отказ в авторизации (пустое поле, хотя авторизация прошла успешно). `Unknown` (хотя никаких вопросов еще не задавали).

Откуда берутся данные:

- **Состояние, настройки, программы, параметры и команды** — это то, что само устройство передает в Home Connect, а адаптер создает именно это. `options` Содержит только то, что вы выбираете для программы; значения, которые устройство отображает во время выполнения программы (оставшееся время, ход выполнения, прогнозы, фаза процесса), находятся в пределах... `run`.
- Исключением являются **события** . Home Connect не может запросить информацию о том, какие события может отправлять устройство — событие поступает только в момент его возникновения. Поэтому адаптер заранее создает все известные события для данного типа устройства из собственного каталога: вы можете создать скрипт на основе «оставшейся соли» уже сегодня, вместо того чтобы ждать месяцами, пока соль закончится. Таким образом, у устройства могут быть точки данных событий, которые оно никогда не использует; событие, о котором каталог не знает, добавляется при первой отправке устройством.

Стоит знать о двух свойствах:

- **Все данные сохраняются с момента первого считывания подключенного устройства** — события, относящиеся к типу устройства, даже с первого запуска, а также параметры _всех_ его программ, а не только той, которая выбрана в данный момент.
- **Ни одна точка данных никогда не исчезает.** Выключенное устройство передает в облако гораздо меньше данных, но это никогда не означает, что оно потеряло свои возможности. Только устройство, удаленное из вашей учетной записи Home Connect, теряет свою папку. (Исключение: канал статистики с именем `program<number>` После того, как адаптер его запомнит или его программная таблица присвоит номеру имя программы, он переходит к имени программы; записи, псевдонимы, комнаты и функции перемещаются дальше.

## Эксплуатационные приборы

- **Настройка:** запишите значение в точку данных под `settings`. `"true"`, `1` и `true` Всё работает — адаптер преобразует данные в тип точки данных перед отправкой.
- **Запустить программу:** выберите её в `programs.selectedProgram` выберите нужные параметры в разделе `options` затем установить `programs.start` к `true` Адаптер отправляет выбранные параметры при запуске; если устройство отклоняет эту комбинацию, оно повторяет попытку с настройками по умолчанию программы.
- **Остановить программу:** установить `programs.stop` к `true`.
- **Команда:** установить кнопку под `commands` к `true`; это возвращается к `false` сам по себе.

Письменное подтверждение считается выполненным. `ack`) после того, как прибор отправит ответ. Если прибор отклонит запрос, значение точки данных вернется к реальному значению прибора.

Функция Home Connect принимает удаленное управление только в том случае, если устройство это позволяет — для большинства устройств требуется включить функцию **удаленного запуска** , и многие отказываются вносить изменения во время работы программы. `status.remoteControlActive` и `status.remoteControlStartAllowed` Это позволит вам узнать, какие возможности в настоящее время предоставляет данное устройство.

## Названия и описания точек данных

На первом месте стоят собственные имена адаптера: он присваивает имена событиям, общим значениям состояния и настройкам, параметрам программы и своей собственной структуре на одиннадцати языках. Там, где у него нет собственного имени, он использует локализованное имя, которое Home Connect отправляет на языке вашей системы ioBroker, и, в крайнем случае, читаемое имя, полученное из идентификатора. Описание объясняет значение точки данных, никогда не повторяет ключ производителя и остается пустым там, где адаптеру нечего объяснять.

Названия и описания принадлежат адаптеру: обновление переносит существующие установки, поэтому дерево из более старой версии не сохраняет старые метки. Если вы хотите использовать собственные названия, используйте псевдонимы или собственные точки данных. `0_userdata`.

## Обновление с версии 1.x

В версии 2.0 дерево исходных данных из релизов сообщества до версии 1.6.x заменяется на читаемое дерево данных для каждого устройства. Пример: `homeconnect.0.012345678901234567.status.BSH_Common_Status_DoorState` становится `homeconnect.0.kg49nsbbf-4567.status.doorOpen` — Папка устройства называется по модели и последним четырем символам номера самого устройства.

Обновление затрагивает само дерево: ваш логин и идентификатор клиента сохраняются, а комнаты, функции и псевдонимы перемещаются в точку данных, которая занимает место старой, как только устройство будет считано один раз. Настройки записи перемещаются только в том дереве, которое также содержит комнату, функцию или псевдоним, и только там, где ровно одна новая точка данных того же типа значения заменяет старую. Если тип изменился (текст двери стал «да/нет») или одна старая точка данных стала несколькими (состояние работы → состояние работы + запущенная программа), новая точка данных начинается без записи — включите ее снова там. В журнале подсчитываются записи комнат/функций и псевдонимов, а также точки данных с комнатой или псевдонимом, у которых не было аналога.

Что вам нужно сделать:

1. Перед обновлением сделайте резервную копию. Возврат к версии 1.x не поддерживается — старая структура данных удаляется после передачи, и версия 1.x не может прочитать зашифрованные данные, хранящиеся в хранилище авторизации версии 2.0.
2. Настройте свои скрипты и визуализации в соответствии с новыми идентификаторами. В таблице для последней части каждого старого идентификатора указана точка данных, которая его заменяет (ниже папки нового устройства). Строки, отмеченные (декодированные), представляют собой новые точки данных, считанные из старого исходного значения; комнаты, функции, псевдонимы и записи старой исходной точки данных в них не переносятся.

| Старый ID, последняя часть (1.x)                                               | Новая точка данных (2.0)                                               |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `BSH_Common_Command_AcknowledgeEvent`                                          | `commands.acknowledgeEvent`                                            |
| `BSH_Common_Command_DeactivateWiFi`                                            | — (внутреннее устройство, больше не создается)                         |
| `BSH_Common_Command_OpenDoor`                                                  | `commands.openDoor`                                                    |
| `BSH_Common_Command_PartlyOpenDoor`                                            | `commands.partlyOpenDoor`                                              |
| `BSH_Common_Command_PauseProgram`                                              | `commands.pauseProgram`                                                |
| `BSH_Common_Command_ResumeProgram`                                             | `commands.resumeProgram`                                               |
| `BSH_Common_Command_StopProgram`                                               | `programs.stop`                                                        |
| `BSH_Common_Event_AlarmClockElapsed`                                           | `events.alarmClockElapsed`                                             |
| `BSH_Common_Event_AquaStopOccured`                                             | `events.aquaStopOccured`                                               |
| `BSH_Common_Event_Favorite_001_ExternalTrigger`                                | `events.favorite001ExternalTrigger`                                    |
| `BSH_Common_Event_Favorite_002_ExternalTrigger`                                | `events.favorite002ExternalTrigger`                                    |
| `BSH_Common_Event_LowWaterPressure`                                            | `events.lowWaterPressure`                                              |
| `BSH_Common_Event_ProgramAborted`                                              | `events.programAborted`                                                |
| `BSH_Common_Event_ProgramFinished`                                             | `events.programFinished`                                               |
| `BSH_Common_Option_BaseProgram`                                                | `programs.baseProgram`                                                 |
| `BSH_Common_Option_CurrentStepRemainingTime`                                   | `run.currentStepRemainingTime`                                         |
| `BSH_Common_Option_Duration`                                                   | `options.duration`                                                     |
| `BSH_Common_Option_ElapsedProgramTime`                                         | `run.elapsedProgramTime`                                               |
| `BSH_Common_Option_ElapsedProgramTime_AutoCounting`                            | `run.elapsedProgramTimeAutoCounting`                                   |
| `BSH_Common_Option_EnergyForecast`                                             | `run.energyForecast`                                                   |
| `BSH_Common_Option_EstimatedTotalProgramTime`                                  | `run.estimatedTotalProgramTime`                                        |
| `BSH_Common_Option_FinishInRelative`                                           | `options.finishInRelative`                                             |
| `BSH_Common_Option_ProgramName`                                                | `programs.programName`                                                 |
| `BSH_Common_Option_ProgramProgress`                                            | `run.programProgress`                                                  |
| `BSH_Common_Option_RemainingProgramTime`                                       | `run.remainingProgramTime`                                             |
| `BSH_Common_Option_RemainingProgramTime_AutoCounting`                          | `run.remainingProgramTimeAutoCounting`                                 |
| `BSH_Common_Option_RemainingProgramTimeEstimationState`                        | `run.remainingProgramTimeEstimationState`                              |
| `BSH_Common_Option_RemainingProgramTimeIsEstimated`                            | `run.remainingProgramTimeIsEstimated`                                  |
| `BSH_Common_Option_SmartEnergyService_SmartStartEnabled`                       | `status.smartEnergyServiceSmartStartEnabled`                           |
| `BSH_Common_Option_StartInRelative`                                            | `options.startInRelative`                                              |
| `BSH_Common_Option_WaterForecast`                                              | `run.waterForecast`                                                    |
| `BSH_Common_Root_ActiveProgram`                                                | `programs.activeProgram`                                               |
| `BSH_Common_Root_SelectedProgram`                                              | `programs.selectedProgram`                                             |
| `BSH_Common_Setting_AlarmClock`                                                | `settings.alarmClock`                                                  |
| `BSH_Common_Setting_AllowBackendConnection`                                    | — (внутреннее устройство, больше не создается)                         |
| `BSH_Common_Setting_AmbientLightBrightness`                                    | `settings.ambientLightBrightness`                                      |
| `BSH_Common_Setting_AmbientLightColor`                                         | `settings.ambientLightColor`                                           |
| `BSH_Common_Setting_AmbientLightCustomColor`                                   | `settings.ambientLightCustomColor`                                     |
| `BSH_Common_Setting_AmbientLightEnabled`                                       | `settings.ambientLightEnabled`                                         |
| `BSH_Common_Setting_ChildLock`                                                 | `settings.childLock`                                                   |
| `BSH_Common_Setting_LiquidVolumeUnit`                                          | `settings.liquidVolumeUnit`                                            |
| `BSH_Common_Setting_PowerState`                                                | `settings.powerState`                                                  |
| `BSH_Common_Setting_TemperatureUnit`                                           | `settings.temperatureUnit`                                             |
| `BSH_Common_Status_BackendConnected`                                           | — (внутреннее устройство, больше не создается)                         |
| `BSH_Common_Status_BatteryChargingState`                                       | `status.batteryChargingState`                                          |
| `BSH_Common_Status_BatteryLevel`                                               | `status.batteryLevel`                                                  |
| `BSH_Common_Status_ChargingConnection`                                         | `status.chargingConnection`                                            |
| `BSH_Common_Status_DoorState`                                                  | `doors.door` (+`doors.doorLocked` (на приборах с запирающейся дверцей) |
| `BSH_Common_Status_ErrorCodesList`                                             | `status.errorCodes`, `status.faultActive` (расшифровано)               |
| `BSH_Common_Status_InteriorIlluminationActive`                                 | `status.interiorIlluminationActive`                                    |
| `BSH_Common_Status_LocalControlActive`                                         | `status.localControlActive`                                            |
| `BSH_Common_Status_OperationState`                                             | `status.operationState`, `status.programRunning`                      |
| `BSH_Common_Status_Program_All_Count_Completed`                                | `counters.programAllCountCompleted`                                    |
| `BSH_Common_Status_Program_All_Count_Started`                                  | `counters.programAllCountStarted`                                      |
| `BSH_Common_Status_Program_All_Energy_Consumed`                                | `counters.programAllEnergyConsumed`                                    |
| `BSH_Common_Status_Program_All_Time_Effective`                                 | `counters.programAllTimeEffective`                                     |
| `BSH_Common_Status_Program_All_Water_Consumed`                                 | `counters.programAllWaterConsumed`                                     |
| `BSH_Common_Status_ProgramSessionSummary_Latest`                               | `history.latest.*` (расшифровано)                                      |
| `BSH_Common_Status_RemoteControlActive`                                        | `status.remoteControlActive`                                           |
| `BSH_Common_Status_RemoteControlStartAllowed`                                  | `status.remoteControlStartAllowed`                                     |
| `BSH_Common_Status_RemoteControlStartAllowedSince`                             | `status.remoteControlStartAllowedSince`                                |
| `BSH_Common_Status_SoftwareUpdateTransactionID`                                | — (внутреннее устройство, больше не создается)                         |
| `BSH_Common_Status_Video_CameraState`                                          | `status.videoCameraState`                                              |
| `ConsumerProducts_CleaningRobot_Event_DockingStationNotFound`                  | `events.dockingStationNotFound`                                        |
| `ConsumerProducts_CleaningRobot_Event_DustBin_NotInstalled`                    | `events.dustBinNotInstalled`                                           |
| `ConsumerProducts_CleaningRobot_Event_EmptyDustBoxAndCleanFilter`              | `events.emptyDustBoxAndCleanFilter`                                    |
| `ConsumerProducts_CleaningRobot_Event_Robot_Lifted`                            | `events.robotLifted`                                                   |
| `ConsumerProducts_CleaningRobot_Event_RobotIsStuck`                            | `events.robotIsStuck`                                                  |
| `ConsumerProducts_CleaningRobot_Option_CarpetBoostEnabled`                     | `options.carpetBoostEnabled`                                           |
| `ConsumerProducts_CleaningRobot_Option_CleaningMode`                           | `options.cleaningMode`                                                 |
| `ConsumerProducts_CleaningRobot_Option_CleaningPasses`                         | `options.cleaningPasses`                                               |
| `ConsumerProducts_CleaningRobot_Option_CleaningSpeed`                          | `options.cleaningSpeed`                                                |
| `ConsumerProducts_CleaningRobot_Option_MopExtensionEnabled`                    | `options.mopExtensionEnabled`                                          |
| `ConsumerProducts_CleaningRobot_Option_ProcessPhase`                           | `run.processPhase`                                                     |
| `ConsumerProducts_CleaningRobot_Option_ReferenceMapId`                         | `options.referenceMapId`                                               |
| `ConsumerProducts_CleaningRobot_Option_SuctionPower`                           | `options.suctionPower`                                                 |
| `ConsumerProducts_CleaningRobot_Option_WaterFlowRate`                          | `options.waterFlowRate`                                                |
| `ConsumerProducts_CleaningRobot_Setting_CurrentMap`                            | `settings.currentMap`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap1`                            | `settings.nameOfMap1`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap2`                            | `settings.nameOfMap2`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap3`                            | `settings.nameOfMap3`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap4`                            | `settings.nameOfMap4`                                                  |
| `ConsumerProducts_CleaningRobot_Setting_NameOfMap5`                            | `settings.nameOfMap5`                                                  |
| `ConsumerProducts_CleaningRobot_Status_DustBoxInserted`                        | `status.dustBoxInserted`                                               |
| `ConsumerProducts_CleaningRobot_Status_LastSelectedMap`                        | `status.lastSelectedMap`                                               |
| `ConsumerProducts_CleaningRobot_Status_Lifted`                                 | `status.lifted`                                                        |
| `ConsumerProducts_CleaningRobot_Status_Lost`                                   | `status.lost`                                                          |
| `ConsumerProducts_CleaningRobot_Status_ProcessPhase`                           | `run.processPhase`                                                     |
| `ConsumerProducts_CoffeeMaker_Event_BeanContainerEmpty`                        | `events.beanContainerEmpty`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn10Cups`                        | `events.calcNCleanIn10Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn15Cups`                        | `events.calcNCleanIn15Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn20Cups`                        | `events.calcNCleanIn20Cups`                                            |
| `ConsumerProducts_CoffeeMaker_Event_CalcNCleanIn5Cups`                         | `events.calcNCleanIn5Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn10Cups`                         | `events.descalingIn10Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn15Cups`                         | `events.descalingIn15Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn20Cups`                         | `events.descalingIn20Cups`                                             |
| `ConsumerProducts_CoffeeMaker_Event_DescalingIn5Cups`                          | `events.descalingIn5Cups`                                              |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCalcNCleanBlockage`                  | `events.deviceCalcNCleanBlockage`                                      |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCalcNCleanOverdue`                   | `events.deviceCalcNCleanOverdue`                                       |
| `ConsumerProducts_CoffeeMaker_Event_DeviceCleaningOverdue`                     | `events.deviceCleaningOverdue`                                         |
| `ConsumerProducts_CoffeeMaker_Event_DeviceDescalingBlockage`                   | `events.deviceDescalingBlockage`                                       |
| `ConsumerProducts_CoffeeMaker_Event_DeviceDescalingOverdue`                    | `events.deviceDescalingOverdue`                                        |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeCalcNCleaned`                | `events.deviceShouldBeCalcNCleaned`                                    |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeCleaned`                     | `events.deviceShouldBeCleaned`                                         |
| `ConsumerProducts_CoffeeMaker_Event_DeviceShouldBeDescaled`                    | `events.deviceShouldBeDescaled`                                        |
| `ConsumerProducts_CoffeeMaker_Event_DripTrayFull`                              | `events.dripTrayFull`                                                  |
| `ConsumerProducts_CoffeeMaker_Event_KeepMilkTankCool`                          | `events.keepMilkTankCool`                                              |
| `ConsumerProducts_CoffeeMaker_Event_WaterTankEmpty`                            | `events.waterTankEmpty`                                                |
| `ConsumerProducts_CoffeeMaker_Option_AromaSelect`                              | `options.aromaSelect`                                                  |
| `ConsumerProducts_CoffeeMaker_Option_BeanAmount`                               | `options.beanAmount`                                                   |
| `ConsumerProducts_CoffeeMaker_Option_BeanContainerSelection`                   | `options.beanContainerSelection`                                       |
| `ConsumerProducts_CoffeeMaker_Option_BeverageSize`                             | `options.beverageSize`                                                 |
| `ConsumerProducts_CoffeeMaker_Option_BeveragesRemaining`                       | `status.beveragesRemaining`                                            |
| `ConsumerProducts_CoffeeMaker_Option_Coarsness`                                | `options.coarsness`                                                    |
| `ConsumerProducts_CoffeeMaker_Option_Coarsness_Recommendation`                 | `run.coarsnessRecommendation`                                          |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeMilkRatio`                          | `options.coffeeMilkRatio`                                              |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeStrength`                           | `options.coffeeStrength`                                               |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeStrength_Recommendation`            | `run.coffeeStrengthRecommendation`                                     |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeTemperature`                        | `options.coffeeTemperature`                                            |
| `ConsumerProducts_CoffeeMaker_Option_CoffeeTemperature_Recommendation`         | `run.coffeeTemperatureRecommendation`                                  |
| `ConsumerProducts_CoffeeMaker_Option_FillQuantity`                             | `options.fillQuantity`                                                 |
| `ConsumerProducts_CoffeeMaker_Option_FillQuantity_Recommendation`              | `run.fillQuantityRecommendation`                                       |
| `ConsumerProducts_CoffeeMaker_Option_FlowRate`                                 | `options.flowRate`                                                     |
| `ConsumerProducts_CoffeeMaker_Option_FlowRate_Recommendation`                  | `run.flowRateRecommendation`                                           |
| `ConsumerProducts_CoffeeMaker_Option_HotWaterTemperature`                      | `options.hotWaterTemperature`                                          |
| `ConsumerProducts_CoffeeMaker_Option_MultipleBeverages`                        | `options.multipleBeverages`                                            |
| `ConsumerProducts_CoffeeMaker_Option_Shot_Count`                               | `options.shotCount`                                                    |
| `ConsumerProducts_CoffeeMaker_Setting_CupWarmer`                               | `settings.cupWarmer`                                                   |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterCoffee`                    | `counters.beverageCounterCoffee`                                       |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterCoffeeAndMilk`             | `counters.beverageCounterCoffeeAndMilk`                                |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterFrothyMilk`                | `counters.beverageCounterFrothyMilk`                                   |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotMilk`                   | `counters.beverageCounterHotMilk`                                      |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotWater`                  | `counters.beverageCounterHotWater`                                     |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterHotWaterCups`              | `counters.beverageCounterHotWaterCups`                                 |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterMilk`                      | `counters.beverageCounterMilk`                                         |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterPowderCoffee`              | `counters.beverageCounterPowderCoffee`                                 |
| `ConsumerProducts_CoffeeMaker_Status_BeverageCounterRistrettoEspresso`         | `counters.beverageCounterRistrettoEspresso`                            |
| `Cooking_Common_Event_Hood_GreaseFilterMaxSaturationNearlyReached`             | `events.hoodGreaseFilterMaxSaturationNearlyReached`                    |
| `Cooking_Common_Event_Hood_GreaseFilterMaxSaturationReached`                   | `events.hoodGreaseFilterMaxSaturationReached`                          |
| `Cooking_Common_Option_Hood_Boost`                                             | `options.hoodBoost`                                                    |
| `Cooking_Common_Option_Hood_IntensiveLevel`                                    | `options.hoodIntensiveLevel`                                           |
| `Cooking_Common_Option_Hood_VentingLevel`                                      | `options.hoodVentingLevel`                                             |
| `Cooking_Common_Setting_Lighting`                                              | `settings.lighting`                                                    |
| `Cooking_Common_Setting_LightingBrightness`                                    | `settings.lightingBrightness`                                          |
| `Cooking_Hob_Setting_Ventilation`                                              | `settings.ventilation`                                                 |
| `Cooking_Hood_Setting_ColorTemperature`                                        | `settings.colorTemperature`                                            |
| `Cooking_Hood_Setting_ColorTemperaturePercent`                                 | `settings.colorTemperaturePercent`                                     |
| `Cooking_Oven_Event_PreheatFinished`                                           | `events.preheatFinished`                                               |
| `Cooking_Oven_Event_RegularPreheatFinished`                                    | `events.regularPreheatFinished`                                        |
| `Cooking_Oven_Option_AirExchange`                                              | `options.airExchange`                                                  |
| `Cooking_Oven_Option_CavitySelector`                                           | `options.cavitySelector`                                               |
| `Cooking_Oven_Option_FastPreHeat`                                              | `options.fastPreHeat`                                                  |
| `Cooking_Oven_Option_HeatupProgress`                                           | `run.heatupProgress`                                                   |
| `Cooking_Oven_Option_Level`                                                    | `options.level`                                                        |
| `Cooking_Oven_Option_MeatProbeTemperatureV2`                                   | `options.meatProbeTemperatureV2`                                       |
| `Cooking_Oven_Option_MicrowavePower`                                           | `options.microwavePower`                                               |
| `Cooking_Oven_Option_PyrolysisLevel`                                           | `options.pyrolysisLevel`                                               |
| `Cooking_Oven_Option_SetpointTemperature`                                      | `options.setpointTemperature`                                          |
| `Cooking_Oven_Option_SteamAssistLevel`                                         | `options.steamAssistLevel`                                             |
| `Cooking_Oven_Option_SteamBoost`                                               | `options.steamBoost`                                                   |
| `Cooking_Oven_Option_WarmingLevel`                                             | `options.warmingLevel`                                                 |
| `Cooking_Oven_Setting_SabbathMode`                                             | `settings.sabbathMode`                                                 |
| `Cooking_Oven_Status_CurrentCavityTemperature`                                 | `status.currentCavityTemperature`                                      |
| `Dishcare_Dishwasher_Event_MachineCareAndFilterCleaningReminder`               | `events.machineCareAndFilterCleaningReminder`                          |
| `Dishcare_Dishwasher_Event_MachineCareAndLowMaintenanceFilterCleaningReminder` | `events.machineCareAndLowMaintenanceFilterCleaningReminder`            |
| `Dishcare_Dishwasher_Event_MachineCareReminder`                                | `events.machineCareReminder`                                           |
| `Dishcare_Dishwasher_Event_ProgramBlockedSaltLack`                             | `events.programBlockedSaltLack`                                        |
| `Dishcare_Dishwasher_Event_RinseAidLack`                                       | `events.rinseAidLack`                                                  |
| `Dishcare_Dishwasher_Event_RinseAidNearlyEmpty`                                | `events.rinseAidNearlyEmpty`                                           |
| `Dishcare_Dishwasher_Event_SaltLack`                                           | `events.saltLack`                                                      |
| `Dishcare_Dishwasher_Event_SaltNearlyEmpty`                                    | `events.saltNearlyEmpty`                                               |
| `Dishcare_Dishwasher_Event_SmartFilterCleaningReminder`                        | `events.smartFilterCleaningReminder`                                   |
| `Dishcare_Dishwasher_Option_BrillianceDry`                                     | `options.brillianceDry`                                                |
| `Dishcare_Dishwasher_Option_DelicateBasket`                                    | `options.delicateBasket`                                               |
| `Dishcare_Dishwasher_Option_EcoDry`                                            | `options.ecoDry`                                                       |
| `Dishcare_Dishwasher_Option_EnergySafe`                                        | `options.energySafe`                                                   |
| `Dishcare_Dishwasher_Option_ExtraDry`                                          | `options.extraDry`                                                     |
| `Dishcare_Dishwasher_Option_ExtraRinse`                                        | `options.extraRinse`                                                   |
| `Dishcare_Dishwasher_Option_FixedZone`                                         | `options.fixedZone`                                                    |
| `Dishcare_Dishwasher_Option_FlexSpray_BackLeft`                                | `options.flexSprayBackLeft`                                            |
| `Dishcare_Dishwasher_Option_FlexSpray_BackRight`                               | `options.flexSprayBackRight`                                           |
| `Dishcare_Dishwasher_Option_FlexSpray_FrontLeft`                               | `options.flexSprayFrontLeft`                                           |
| `Dishcare_Dishwasher_Option_FlexSpray_FrontRight`                              | `options.flexSprayFrontRight`                                          |
| `Dishcare_Dishwasher_Option_FlexSpray_Type`                                    | `options.flexSprayType`                                                |
| `Dishcare_Dishwasher_Option_HalfLoad`                                          | `options.halfLoad`                                                     |
| `Dishcare_Dishwasher_Option_HolidayMode`                                       | `options.holidayMode`                                                  |
| `Dishcare_Dishwasher_Option_HygienePlus`                                       | `options.hygienePlus`                                                  |
| `Dishcare_Dishwasher_Option_IntensivZone`                                      | `options.intensivZone`                                                 |
| `Dishcare_Dishwasher_Option_LearningDishwasher_CleaningLevel`                  | `options.learningDishwasherCleaningLevel`                              |
| `Dishcare_Dishwasher_Option_LearningDishwasher_DryingLevel`                    | `options.learningDishwasherDryingLevel`                                |
| `Dishcare_Dishwasher_Option_LearningDishwasher_DurationLevel`                  | `options.learningDishwasherDurationLevel`                              |
| `Dishcare_Dishwasher_Option_Pretreatment`                                      | `options.pretreatment`                                                 |
| `Dishcare_Dishwasher_Option_SanitationUC`                                      | `options.sanitationUC`                                                 |
| `Dishcare_Dishwasher_Option_SilenceOnDemand`                                   | `options.silenceOnDemand`                                              |
| `Dishcare_Dishwasher_Option_StorageFunction`                                   | `options.storageFunction`                                              |
| `Dishcare_Dishwasher_Option_Turbo`                                             | `options.turbo`                                                        |
| `Dishcare_Dishwasher_Option_VarioSpeed`                                        | `options.varioSpeed`                                                   |
| `Dishcare_Dishwasher_Option_VarioSpeedPlus`                                    | `options.varioSpeedPlus`                                               |
| `Dishcare_Dishwasher_Option_ZeoliteDry`                                        | `options.zeoliteDry`                                                   |
| `Dishcare_Dishwasher_Setting_TimeLight`                                        | `settings.timeLight`                                                   |
| `Dishcare_Dishwasher_Status_EcoDryActive`                                      | `run.ecoDryActive`                                                     |
| `Dishcare_Dishwasher_Status_ProgramPhase`                                      | `run.programPhase`                                                     |
| `LaundryCare_Common_Event_DelayedShutdown`                                     | `events.delayedShutdown`                                               |
| `LaundryCare_Common_Event_DelayedShutdownCanceled`                             | `events.delayedShutdownCanceled`                                       |
| `LaundryCare_Common_Event_DoorNotLockable`                                     | `events.doorNotLockable`                                               |
| `LaundryCare_Common_Event_DoorNotUnlockable`                                   | `events.doorNotUnlockable`                                             |
| `LaundryCare_Common_Event_DoorOpen`                                            | `events.doorOpen`                                                      |
| `LaundryCare_Common_Event_FatalErrorOccured`                                   | `events.fatalErrorOccured`                                             |
| `LaundryCare_Common_Event_FoamDetection`                                       | `events.foamDetection`                                                 |
| `LaundryCare_Common_Event_SupplyPower_BlackedOut`                              | `events.supplyPowerBlackedOut`                                         |
| `LaundryCare_Common_Event_SupplyPower_SupplyVoltageTooLow`                     | `events.supplyPowerSupplyVoltageTooLow`                                |
| `LaundryCare_Common_Option_LoadRecommendation`                                 | `run.loadRecommendation`                                               |
| `LaundryCare_Common_Option_LowTemperatureHygiene`                              | `options.lowTemperatureHygiene`                                        |
| `LaundryCare_Common_Option_ProcessPhase`                                       | `run.processPhase`                                                     |
| `LaundryCare_Common_Option_SilentMode`                                         | `options.silentMode`                                                   |
| `LaundryCare_Common_Option_SpeedPerfect`                                       | `options.speedPerfect`                                                 |
| `LaundryCare_Common_Option_VarioPerfect`                                       | `options.varioPerfect`                                                 |
| `LaundryCare_Common_Setting_Brightness`                                        | `settings.brightness`                                                  |
| `LaundryCare_Common_Setting_EndSignalVolume`                                   | `settings.endSignalVolume`                                             |
| `LaundryCare_Common_Setting_KeySignalVolume`                                   | `settings.keySignalVolume`                                             |
| `LaundryCare_Common_Status_Program_Details_Program01`                          | `statistics.<program>.*`(расшифровано)                                 |
| `LaundryCare_Common_Status_Program_Details_Program02`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program06`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program08`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program09`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program10`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program11`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_Details_Program20`                          | `statistics.<program>.*` (расшифровано)                                |
| `LaundryCare_Common_Status_Program_History_EffectiveTime`                      | `history.latest.*`, `history.previous.*` … (расшифровано)              |
| `LaundryCare_Common_Status_Program_History_Uid`                                | `history.latest.*`, `history.previous.*` … (расшифровано)              |
| `LaundryCare_Common_Status_Version_Smm_DomainFw`                               | `info.firmware` (только номер версии)                                  |
| `LaundryCare_Common_Status_Version_Smm_HcFw`                                   | — (внутреннее устройство, больше не создается)                         |
| `LaundryCare_Dryer_Event_DryingProcessFinished`                                | `events.dryingProcessFinished`                                         |
| `LaundryCare_Dryer_Option_ConnectedDry_OriginalProgramTime`                    | `run.connectedDryOriginalProgramTime`                                  |
| `LaundryCare_Dryer_Option_DryingTarget`                                        | `options.dryingTarget`                                                 |
| `LaundryCare_Dryer_Option_DryingTargetAdjustment`                              | `options.dryingTargetAdjustment`                                       |
| `LaundryCare_Dryer_Option_Gentle`                                              | `options.gentle`                                                       |
| `LaundryCare_Dryer_Option_HalfLoad`                                            | `options.halfLoad`                                                     |
| `LaundryCare_Dryer_Option_ProcessPhase`                                        | `run.processPhase`                                                     |
| `LaundryCare_Dryer_Option_Refresher`                                           | `options.refresher`                                                    |
| `LaundryCare_Dryer_Option_WrinkleGuard`                                        | `options.wrinkleGuard`                                                 |
| `LaundryCare_Washer_Event_Circulation_Pump_ErrorLockedRotor`                   | `events.circulationPumpErrorLockedRotor`                               |
| `LaundryCare_Washer_Event_Circulation_Pump_ErrorMaxTorque`                     | `events.circulationPumpErrorMaxTorque`                                 |
| `LaundryCare_Washer_Event_IDos1FillLevelPoor`                                  | `events.iDos1FillLevelPoor`                                            |
| `LaundryCare_Washer_Event_IDos2FillLevelPoor`                                  | `events.iDos2FillLevelPoor`                                            |
| `LaundryCare_Washer_Event_IDosUnitDefect`                                      | `events.iDosUnitDefect`                                                |
| `LaundryCare_Washer_Event_PumpError`                                           | `events.pumpError`                                                     |
| `LaundryCare_Washer_Event_Spin_SpinAbort`                                      | `events.spinSpinAbort`                                                 |
| `LaundryCare_Washer_Event_WaterSupply_WarmWaterAbsent`                         | `events.waterSupplyWarmWaterAbsent`                                    |
| `LaundryCare_Washer_Option_EISA`                                               | `options.eISA`                                                         |
| `LaundryCare_Washer_Option_IDos1_Active`                                       | `options.iDos1Active`                                                  |
| `LaundryCare_Washer_Option_IDos1Active`                                        | `options.iDos1Active`                                                  |
| `LaundryCare_Washer_Option_IDos1DosingLevel`                                   | `options.iDos1DosingLevel`                                             |
| `LaundryCare_Washer_Option_IDos2_Active`                                       | `options.iDos2Active`                                                  |
| `LaundryCare_Washer_Option_IDos2Active`                                        | `options.iDos2Active`                                                  |
| `LaundryCare_Washer_Option_IDos2DosingLevel`                                   | `options.iDos2DosingLevel`                                             |
| `LaundryCare_Washer_Option_IntensivePlus`                                      | `options.intensivePlus`                                                |
| `LaundryCare_Washer_Option_LessIroning`                                        | `options.lessIroning`                                                  |
| `LaundryCare_Washer_Option_MiniLoad`                                           | `options.miniLoad`                                                     |
| `LaundryCare_Washer_Option_MultipleSoak`                                       | `options.multipleSoak`                                                 |
| `LaundryCare_Washer_Option_Prewash`                                            | `options.prewash`                                                      |
| `LaundryCare_Washer_Option_ProcessPhase`                                       | `run.processPhase`                                                     |
| `LaundryCare_Washer_Option_RinseHold`                                          | `options.rinseHold`                                                    |
| `LaundryCare_Washer_Option_RinsePlus`                                          | `options.rinsePlus`                                                    |
| `LaundryCare_Washer_Option_RinsePlus1`                                         | `options.rinsePlus1`                                                   |
| `LaundryCare_Washer_Option_SilentWash`                                         | `options.silentWash`                                                   |
| `LaundryCare_Washer_Option_Soak`                                               | `options.soak`                                                         |
| `LaundryCare_Washer_Option_SpeedPerfect`                                       | `options.speedPerfect`                                                 |
| `LaundryCare_Washer_Option_SpinSpeed`                                          | `options.spinSpeed`                                                    |
| `LaundryCare_Washer_Option_Stains`                                             | `options.stains`                                                       |
| `LaundryCare_Washer_Option_Temperature`                                        | `options.temperature`                                                  |
| `LaundryCare_Washer_Option_WaterAndRinsePlus1`                                 | `options.waterAndRinsePlus1`                                           |
| `LaundryCare_Washer_Option_WaterPlus`                                          | `options.waterPlus`                                                    |
| `LaundryCare_Washer_Setting_EnableDrumCleanReminder`                           | `settings.enableDrumCleanReminder`                                     |
| `LaundryCare_Washer_Setting_IDos1BaseLevel`                                    | `settings.iDos1BaseLevel`                                              |
| `LaundryCare_Washer_Setting_IDos1_ContentName`                                 | `settings.iDos1ContentName`                                            |
| `LaundryCare_Washer_Setting_IDos2BaseLevel`                                    | `settings.iDos2BaseLevel`                                              |
| `LaundryCare_Washer_Setting_IDos2Content`                                      | `settings.iDos2Content`                                                |
| `LaundryCare_Washer_Setting_IDos2_ContentName`                                 | `settings.iDos2ContentName`                                            |
| `LaundryCare_Washer_Status_Detergent_All_Consumed`                             | `counters.detergentAllConsumed`                                        |
| `LaundryCare_Washer_Status_Softener_All_Consumed`                              | `counters.softenerAllConsumed`                                         |
| `LaundryCare_WasherDryer_Option_DryingTarget`                                  | `options.dryingTarget`                                                 |
| `LaundryCare_WasherDryer_Option_LowTemperatureHygiene`                         | `options.lowTemperatureHygiene`                                        |
| `LaundryCare_WasherDryer_Option_ProgramMode`                                   | `options.programMode`                                                  |
| `LaundryCare_WasherDryer_Option_WrinkleGuardBoost`                             | `options.wrinkleGuardBoost`                                            |
| `Refrigeration_Common_Setting_BottleCooler_SetpointTemperature`                | `settings.bottleCoolerSetpointTemperature`                             |
| `Refrigeration_Common_Setting_ChillerCommon_SetpointTemperature`               | `settings.chillerCommonSetpointTemperature`                            |
| `Refrigeration_Common_Setting_ChillerLeft_SetpointTemperature`                 | `settings.chillerLeftSetpointTemperature`                              |
| `Refrigeration_Common_Setting_ChillerRight_SetpointTemperature`                | `settings.chillerRightSetpointTemperature`                             |
| `Refrigeration_Common_Setting_Dispenser_Enabled`                               | `settings.dispenserEnabled`                                            |
| `Refrigeration_Common_Setting_Door_AssistantForceFreezer`                      | `settings.doorAssistantForceFreezer`                                   |
| `Refrigeration_Common_Setting_Door_AssistantForceFridge`                       | `settings.doorAssistantForceFridge`                                    |
| `Refrigeration_Common_Setting_Door_AssistantFreezer`                           | `settings.doorAssistantFreezer`                                        |
| `Refrigeration_Common_Setting_Door_AssistantFridge`                            | `settings.doorAssistantFridge`                                         |
| `Refrigeration_Common_Setting_Door_AssistantTimeoutFreezer`                    | `settings.doorAssistantTimeoutFreezer`                                 |
| `Refrigeration_Common_Setting_Door_AssistantTimeoutFridge`                     | `settings.doorAssistantTimeoutFridge`                                  |
| `Refrigeration_Common_Setting_Door_AssistantTriggerFreezer`                    | `settings.doorAssistantTriggerFreezer`                                 |
| `Refrigeration_Common_Setting_Door_AssistantTriggerFridge`                     | `settings.doorAssistantTriggerFridge`                                  |
| `Refrigeration_Common_Setting_EcoMode`                                         | `settings.ecoMode`                                                     |
| `Refrigeration_Common_Setting_FreshMode`                                       | `settings.freshMode`                                                   |
| `Refrigeration_Common_Setting_Light_External_Brightness`                       | `settings.lightExternalBrightness`                                     |
| `Refrigeration_Common_Setting_Light_External_Power`                            | `settings.lightExternalPower`                                          |
| `Refrigeration_Common_Setting_Light_Internal_Brightness`                       | `settings.lightInternalBrightness`                                     |
| `Refrigeration_Common_Setting_Light_Internal_EnableTheaterMode`                | `settings.lightInternalEnableTheaterMode`                              |
| `Refrigeration_Common_Setting_Light_Internal_Power`                            | `settings.lightInternalPower`                                          |
| `Refrigeration_Common_Setting_SabbathMode`                                     | `settings.sabbathMode`                                                 |
| `Refrigeration_Common_Setting_VacationMode`                                    | `settings.vacationMode`                                                |
| `Refrigeration_Common_Setting_WineCompartment_SetpointTemperature`             | `settings.wineCompartmentSetpointTemperature`                          |
| `Refrigeration_Common_Setting_WineCompartment2_SetpointTemperature`            | `settings.wineCompartment2SetpointTemperature`                         |
| `Refrigeration_Common_Setting_WineCompartment3_SetpointTemperature`            | `settings.wineCompartment3SetpointTemperature`                         |
| `Refrigeration_Common_Status_Door_BottleCooler`                                | `doors.bottleCooler`                                                   |
| `Refrigeration_Common_Status_Door_Chiller`                                     | `doors.chiller`                                                        |
| `Refrigeration_Common_Status_Door_ChillerCommon`                               | `doors.chillerCommon`                                                  |
| `Refrigeration_Common_Status_Door_ChillerLeft`                                 | `doors.chillerLeft`                                                    |
| `Refrigeration_Common_Status_Door_ChillerRight`                                | `doors.chillerRight`                                                   |
| `Refrigeration_Common_Status_Door_FlexCompartment`                             | `doors.flexCompartment`                                                |
| `Refrigeration_Common_Status_Door_Freezer`                                     | `doors.freezer`                                                        |
| `Refrigeration_Common_Status_Door_Refrigerator`                                | `doors.refrigerator`                                                   |
| `Refrigeration_Common_Status_Door_Refrigerator2`                               | `doors.refrigerator2`                                                  |
| `Refrigeration_Common_Status_Door_Refrigerator3`                               | `doors.refrigerator3`                                                  |
| `Refrigeration_Common_Status_Door_WineCompartment`                             | `doors.wineCompartment`                                                |
| `Refrigeration_FridgeFreezer_Event_DoorAlarmFreezer`                           | `events.doorAlarmFreezer`                                              |
| `Refrigeration_FridgeFreezer_Event_DoorAlarmRefrigerator`                      | `events.doorAlarmRefrigerator`                                         |
| `Refrigeration_FridgeFreezer_Event_TemperatureAlarmFreezer`                    | `events.temperatureAlarmFreezer`                                       |
| `Refrigeration_FridgeFreezer_Setting_SetpointTemperatureFreezer`               | `settings.setpointTemperatureFreezer`                                  |
| `Refrigeration_FridgeFreezer_Setting_SetpointTemperatureRefrigerator`          | `settings.setpointTemperatureRefrigerator`                             |
| `Refrigeration_FridgeFreezer_Setting_SuperModeFreezer`                         | `settings.superModeFreezer`                                            |
| `Refrigeration_FridgeFreezer_Setting_SuperModeRefrigerator`                    | `settings.superModeRefrigerator`                                       |
| `general.brand`                                                                | — (больше не создано)                                                  |
| `general.connected`                                                            | `info.reachable`                                                       |
| `general.enumber`                                                              | — (больше не создано)                                                  |
| `general.haId`                                                                 | — (больше не создано)                                                  |
| `general.name`                                                                 | — (больше не создано)                                                  |
| `general.type`                                                                 | — (больше не создано)                                                  |
| `general.vib`                                                                  | — (больше не создано)                                                  |
| `own_request.request_json`                                                     | — (больше не создано)                                                  |
| `own_request.response`                                                         | — (больше не создано)                                                  |
| `rateLimit.*`, `rateTokenLimit.*` (ниже `homeconnect.0`)                       | - (удаленный)                                                          |

## Обновление с версии 1.7 до 1.23

Папки устройств были названы по названию приложения (до версии 1.12) или по E-номеру с заводской таблички (1.13 – 1.23, `sx87tx02ce-60`), которая указывает только модель. В этой версии каждая папка перемещается один раз в папку с номером модели и номером самого устройства (`sx87tx02ce-5775` Значения, настройки записи, комнаты, функции и псевдонимы переносятся, а история записей продолжается в старой последовательности. Сценарии и визуализации, использующие старые идентификаторы, необходимо обновить.

Программа забега, информация о результатах и итоговые итоги теперь доступны на отдельных каналах: `status.remainingProgramTime` →`run.remainingProgramTime` (аналогично, прошедшее время, прогресс, этап, прогнозы и рекомендации), `status.doorOpen` →`doors.door`, `status.doorLocked` →`doors.doorLocked`, `status.programAllCountCompleted` →`counters.programAllCountCompleted` (аналогично и для всех итоговых сумм). Дверь отсека или контейнера тестовой сборки версии 2.0, которая представляла собой отдельный канал (`events.programFinished.active`, `doors.freezer.open`) снова становится простой точкой данных (`events.programFinished`, `doors.freezer` Последний заезд стал частью истории. `lastRun.start` →`history.latest.start` (аналогично, конец, как все закончилось и потребление); там, где история уже имела программу и продолжительность, они остаются, а также два из `lastRun` Вперед. Ценности, записи, псевдонимы, комнаты и функции перемещаются.

## Ограничения скорости

Home Connect разрешает 1000 запросов в день на приложение и учетную запись, максимум 50 в минуту, и блокирует выполнение на десять минут после десяти неудачных запросов подряд. Адаптер построен на этом принципе: он использует один постоянный поток событий вместо опроса, постоянно запоминает определения программ, отправляет максимум 50 запросов в минуту (поэтому первый запуск после обновления или с новым устройством занимает несколько минут), помещает ваши команды перед ожидающими чтениями и автоматически приостанавливается после ответа на запрос ограничения скорости — в журнале указывается лимит и время блокировки Home Connect. Ничего настраивать не нужно — но второе ваше приложение, использующее те же учетные данные, использует тот же бюджет.

## Поиск неисправностей

| Симптом                                                                                      | Причина и средство устранения                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` остается красным                                                           | Вы не авторизованы или поток событий недоступен. Используйте **функцию «Проверить соединение»** в настройках — она укажет причину.                                                                                                       |
| Бытовая техника отсутствует.                                                                 | Учетная запись разработчика должна быть связана с вашей учетной записью приложения Home Connect (в качестве тестовой учетной записи по умолчанию используется адрес электронной почты приложения), и вход в систему должен быть одобрен. |
| Ссылка для входа не работает.                                                                | Коды истекают через несколько минут. Адаптер автоматически запрашивает новый код; панель настроек отображает его сама.                                                                                                                   |
| Ссылка для входа больше недоступна.                                                          | В течение часа никто не подтверждал ссылку, поэтому адаптер перестал запрашивать её. Используйте **функцию «Запросить новую ссылку для входа»** в настройках.                                                                            |
| `unauthorized_client: Invalid client id`                                                     | Идентификатор клиента неизвестен — скопируйте его еще раз из вашего приложения (64 символа).                                                                                                                                             |
| `unauthorized_client: request rejected by client authorization authority (developer portal)` | Приложение пока неактивно — подождите от 15 до 60 минут после регистрации или редактирования, убедитесь, что его статус «Включено», а затем запросите новую ссылку для входа.                                                            |
| `unauthorized_client: client not authorized for this oauth flow (grant_type)`                | Приложение использует другой поток аутентификации OAuth — зарегистрируйте новый поток в Device Flow.                                                                                                                                     |
| `invalid_client`                                                                             | Секретный ключ клиента был отклонен — проверьте его.                                                                                                                                                                                     |
| `access_denied`                                                                              | Учетная запись была отклонена — проверьте это в приложении Home Connect (идентификатор SingleKey, принятые условия использования) и убедитесь, что это та учетная запись, которая указана на портале разработчика.                       |
| В Китае                                                                                      | Home Connect в Китае (`api.home-connect.cn`) не поддерживается.                                                                                                                                                                         |
| Бытовая техника остается серой                                                               | Если устройство выключено или не подключено к сети, его данные сохраняются и принимают свои последние значения.                                                                                                                          |
| Операция записи ничего не делает.                                                            | В настоящий момент устройство не поддерживает дистанционное управление. `status.remoteControlActive`), или же данная опция программы не относится к выбранной программе.                                                                 |
| В логе отображается сообщение "SDK.Error.NoProgramActive".                                   | Это обычный ответ неактивного устройства, а не ошибка — он регистрируется на уровне отладки.                                                                                                                                             |

## Диагностический отчет

Если устройство работает некорректно, откройте настройки экземпляра, вкладку **«Эксперт»** , выберите устройство и загрузите отчет о диагностике. В нем содержатся ответы Home Connect для этого устройства (а также актуальная информация о его состоянии, настройках и программах во время подключения), события прямой трансляции, данные устройства с их значениями и последние записи журнала адаптера. Прикрепите файл к сообщению о проблеме, используя форму **«Сообщить об устройстве»** — карточка будет содержать ссылку на него.

Отчет формируется только по вашему запросу, хранится в памяти до момента загрузки и ничего не записывает. Серийные номера, названия, которые вы дали своим устройствам, и ваши учетные данные используются в качестве заполнителей.

## Поддерживать

Вопросы, сообщения об ошибках и предложения: [github.com/iobroker-community-adapters/ioBroker.homeconnect](https://github.com/iobroker-community-adapters/ioBroker.homeconnect) .

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now

<!--
    Placeholder for the next version (at the beginning of the line): 
    ### **WORK IN PROGRESS**
-->

### 2.0.0-alpha.0 (2026-10-21)

- (krobipd) Changed: complete rewrite with a new object tree and new datapoint IDs — breaking for existing scripts and visualizations
- (krobipd) Changed: readable values with units and labels in the user's language
- (krobipd) New: program history and the consumption of the last run as readable datapoints
- (krobipd) Changed: the adapter requires js-controller 7.2.5 and Admin 8.2.0 or newer now
- (krobipd) New: sign-in panel in the instance settings with a connection test and a reset of the login
- (krobipd) Improved: an update from 1.x keeps rooms, functions, aliases and the Home Connect sign-in
- (krobipd) Fixed: the object database no longer grows with every value change (#387), and the start stays within the Home Connect request limits (#327, #58)
- (krobipd) New: diagnostics report on the Expert tab, with a 'Report a device' issue form for it

### 1.6.1 (2026-05-12)

- (TA2k) Login/Refresh flow improved

### 1.6.0 (2026-05-11)

- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (Lucky-ESA) Fixed adapter crash if URI is empty
- (Lucky-ESA) Save remaining time in active folder
- (Lucky-ESA) Device monitoring starts only after the adapter has started (this may take up to 2 minutes)

### 1.5.2 (2025-12-14)

- (Lucky-ESA) Rate limit of 50 requests per minute intercepted at adapter startup
- (Lucky-ESA) Added custom request

### 1.5.1 (2025-09-20)

- (Lucky-ESA) Fixed: Name of the objects are deleted

## License

The MIT License (MIT)

Copyright (c) 2019-2026 TA2k <tombox2020@gmail.com>  
Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.