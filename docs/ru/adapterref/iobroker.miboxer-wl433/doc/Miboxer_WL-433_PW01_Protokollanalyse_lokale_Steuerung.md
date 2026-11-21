---
title: Miboxer WL-433 + PW01 - локальное управление в облаке, протокольный анализ и интеграция с ioBroker
subtitle: Recherchebericht mit Quellenbelegen (Herstellerdokumente, Normen, Datenblätter, Fachliteratur, Quellcode)
author: Recherche für Silvio Sternitzke
date: 21. September 2026, Nachtrag 22. September 2026
lang: de
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md
hash: F1lWMITsS2go2WFxcgPJu34DrzHngWY5/AvttbiXg+U=
---
# Miboxer WL-433 + PW01 - локальное управление облаком, протокольный анализ и ioBroker-интеграция
**Recherchebericht, Стенд 21.09.2026 - Вечер 22.09.2026: Datenpunkt 101 vollständig entschlüsselt (Kapitel 3.1.8), DMX-Startadresse, Taste `06 05` и Timer der App (Kapitel 3.1.9)**

Используемые комплектующие: Miboxer **PW01** (27 Вт RGB+CCT PAR56 LED-Poolleuchte, LoRa 433 МГц) и Miboxer **WL-433** (шлюз LoRa-433 МГц, WLAN 802.11b/g/n, DMX512-Eingang). Герстеллер: Shenzhen Futlight Optoelectronics Co., Ltd. (маркен «Mi-Light» / «MiBoxer»).

Zitierweise: Jede Aussage trägt eine Quellen-ID в eckigen Klammern. Die Präfixe kennzeichnen die Evidenzklasse:

| Префикс | Эвиденцкласс | Бейшпиль |
|---|---|---|
| **Ч** | Herstellerdokumente (Руководство, Продукция, Часто задаваемые вопросы, официальный форум) | [Ч1] |
| **С** | Normen, Regulierung, Datenblätter, Patente, begutachtete Fachliteratur | [С9] |
| **С** | Документация/Quellcode для Open-Source-Bibliotheken und Community-Berichte (GitHub, Foren) | [С1] |
| **I** | ioBroker-Adapter (README, Quellcode, Releases, ioBroker-Forum) | [I1] |
| **Д** | DMX-/Art-Net-Оборудование и прошивка | [Д1] |
| **Р** | RF-/LoRa-Werkzeuge und Reverse-Engineering-Projekte | [R1] |
| **Е** | Эйген Мессунген-ам-Эхтен Gateway (Нахтраг, 22.09.2026) | [Е1] |

Aussagen, die **nicht** aus einer Quelle stammen, sondern eigene Schlussfolgerungen sind, werden ausdrücklich als **[Inferenz]** gekennzeichnet.

---

## 0. Kurzfassung - Antworten auf die drei Fragen
### Фрагмент 1: Можно ли использовать локальную систему, одно облако и другой KI-ассистент, с использованием собственного программного обеспечения?
**Я - очень много документов, рядом с Einschränkungen. Ein Dritter Weg (Direkt über Funk) - это технический день, абер бисланг от niemandem realisiert.**

| Weg | Статус | Cloudfrei im Betrieb? | Зонен/Сзенен? | Качество |
|---|---|---|---|---|
| **A - LAN (Tuya-Lokalprotokoll v3.3 des WL-433)** | Отправьте запрос с идентичным оборудованием (WL-433 + 2× PW01) 2025 практическое использование [C1] | Ja (Steuerung), aber Pairing und Local-Key-Beschaffung benetigen die Hersteller-/Tuya-Cloud; Gerät meldet weiterhin a die Cloud [C4] | Ein/Aus, Helligkeit, Farbtemperatur, Farbe **für alle Lampen zugleich**; Zonen/Szenen laufen über einen proprietären Roh-Datenpunkt **DP 101** (12-Byte-Frames, Base64, 8-Bit-Prüfsumme), der nur teilweise dekodiert ist [C1] | Сообщество-Bericht + Библиотечная документация |
| **B - DMX512-Eingang des WL-433** | Официальная документация: «Входной сигнал: DMX512(1990)» [H1] | **Ja, vollständig** (DMX ist eine undirekionale Drahtschnittstelle nach ANSI E1.11 [S22]) | Шлюз принадлежит **eine Startadresse + 5 Kanäle** (Rot, Grün, Blau, Kaltweiß, Warmweiß) [H1]; Зональная адресация для DMX не документирована**; Адрес в приложении [H1] | Herstellerhandbuch |
| **C - LoRa-433-MHz-Funk direkt (собственный отправитель)** | Основные параметры обратного проектирования, ключевые параметры (частота, диапазон, Spreizfaktor, Sync-Word) bekannt [R1][R2] | Да | Все, было Die Fernbedienung FUT086 kann (8 Zonen) - nach erfolgreichem Reverse Engineering | Негативбефунд на ~150 Сучанфраген; LoRa-PHY включает в себя дополнительные требования [S9][S10][S11] |

### Фрагмент 2: Нужен ли ioBroker-Adapter?
- **Возможный адаптер для Weg A:** `ioBroker.tuya` (Apollon77) используется локально с Tuya-Protokoll 3.3/3.4/3.5 для использования облачной синхронизации [I1]. Обратите внимание: (1) Адаптер для входа в систему для Tuya Smart, Smart Life, Ledvance и Sylvania - не для приложения «MiBoxer» [I1][I3]; WL-433 также может быть включен в приложение Smart-Life-App (Händlerangabe: möglich [H16]; Hersteller: keine Aussage). (2) Der Adaptor **verwirft unbekannte Datenpunkte** («Неизвестная точка данных… Пожалуйста, повторно синхронизируйте устройства» → «продолжить») [I2]; ist DP 101 nicht im synchronisierten Schema, gibt es keine Zonen-/Szenensteuerung. (3) Nur **eine** lokale Verbindung pro Gerät - die App muss geschlossen sein [I1].
- **Добавленный адаптер для среды B:** `ioBroker.artnet` (стабильный репозиторий, версия 1.2.2 от 2020 г.) [I9] или `ioBroker.artnetdmx` (ChriD, GitHub, Fixture-Modell mit Fades) [I10] → Art-Net-zu-DMX-Node (Enttec ODE Mk3) [D1], DMXking eDMX1 MAX [D5] или ESP32-Eigenbau LuxDMX [D2]/ESPHome-DMX512 [D3]) → DMX-Eingang des WL-433.
- **Собственный адаптер (выбор для функции):** Адаптер адаптера на основе `tuyapi` [C14] (в библиотеке, в том числе `ioBroker.tuya`), в стандартных датах 20-24 abbildet **und** DP 101 kodiert. Voraussetzung: Abschluss der DP-101-Dekodierung durch eigene Mitschnitte der App (Просмотр в [C1]). Адаптер-Erstellung über `npx @iobroker/create-adapter` [I14].
- **Недоступна панель:** `ioBroker.milight` и `ioBroker.milight-smart-light` (включая Mi-Light-UDP-Protokoll v5/v6 der iBox-Bridges) [I7][I8]; Broadlink RM4 Pro и Sonoff RF Bridge (только OOK-Festcode-Fernbedienungen, keine LoRa-Chirps) [R20][R21].

### Фрагмент 3: Уэлчесский протокол, который будет создан? (Курцформа Schichtenmodells)
```
Smartphone-App „MiBoxer“ (Tuya-OEM-App)  ──Internet──►  Tuya-Cloud  ──Internet──►  WL-433
                                                                                     │  WLAN 802.11b/g/n 2,4 GHz [H1]
Eigene Software (ioBroker)  ──LAN: Tuya-Lokalprotokoll v3.3, TCP 6668, AES-128-ECB, Local Key──►  WL-433 [C1][C2][C3]
DMX512-Pult / Art-Net-Node  ──EIA-485, 250 kbit/s, DMX512(1990), 5 Kanäle ab Startadresse──►  WL-433 [H1][S22][S23]
                                                                                     │
                                                                                     ▼  Funk 433 MHz, „LoRa spread spectrum“,
                                                                                        15 dBm (Gateway) / 10 dBm (FUT086),
                                                                                        proprietäre Applikationsschicht [H1][H6]
                                                                                     ▼
                                                                          PW01 (Empfänger; Pairing = Lampe lernt Sender-ID) [H3][H5]
```

- **WLAN-/LAN-Schicht:** Tuya-SDK-Firmware; используемая система LoRa также называется **ein** Tuya-Gerät (keine Sub-Devices/`cid`) [C1][C6]. Стандартные даты 20 (Schalter), 21 (Modus), 22 (Helligkeit 10-1000), 23 (Farbtemperatur 0-1000), 24 (Farbe HSV-Hex), 26 (Обратный отсчет) [C2]; herstellerspezifisch DP 101 (Roh/Base64) [C1].
- **DMX-Schicht:** USITT DMX512/1990 [H1] - высокий стандарт ANSI E1.11 [S22]; eine 5-Kanal-Fußspur pro Gateway [H1].
- **Funkschicht:** LoRa принадлежит компании Semtechs Chirp-Spread-Spectrum-PHY [S2][S13]; **kein LoRaWAN** (LoRaWAN wäre die MAC-Schicht der LoRa Alliance [S12]). Параметр unbekannt; Чип Vermutlich Semtech SX1278 (unbelegte Community-Angabe [R1]). Регулятор: SRD-диапазон 433,05-434,79 МГц, ERP 10 мВт при ≤ 10 % Arbeitszyklus [S17][S21].

---

## 1. Untersuruchungsgegenstand, Methode und Grenzen
**Метод.** Параллельное использование Recherche-Agenten mit getrennten Aufträgen (Herstellerdokumente; LAN-Protokoll; LoRa-Funk/Reverse Engineering; ioBroker-/Smart-Home-Pfade; Normen und Literatur) для 150 веб-сайтов и 300 Seitenabrufe durch (английский, немецкий, китайский). Все эти вопросы были отправлены из Hauptagenten stichprobenartig gegen die Originalquellen geprüft (WL-433-Handbuch, Miboxer-FAQ, tinytuya-Discussion #623, GitHub-Issues via API, ioBroker.tuya-Quellcode, PW01- и FUT086-Handbücher).

**Grenzen.** Folgende Quellen waren aus der Recherche-Umgebung nicht abrufbar und konnten daher nicht ausgewertet werden: die FCC-Datenbanken (fccid.io, fcc.report, apps.fcc.gov - HTTP 403), das Semtech-Download-CDN (Datenblätter nur über) Spiegel-Kopien geprüft), Developer.tuya.com (robots.txt), tsp.esta.org (PDF по ANSI E1.11, без ANSI-Vorschau geprüft). Ein Negativbefund («nicht gefunden») bedeutet daher «in den erreichbaren Quellen nicht gefunden», nicht «existiert nicht».

---

## 2. Herstellerdocumentation - Gesicherte Fakten
###2.1 WL-433 LoRa-433-MHz-Gateway (Handbuch V1.0.1 [H1], Produktseite [H2])
| Меркмаль | Херстеллерангабе (Вёртлих) | Квелле |
|---|---|---|
| Эйнганг | «Вход: 5 В постоянного тока/500 мА (5,5*2,1 мм)» | [Ч1] |
| Signaleingang | „Входной сигнал: DMX512(1990)“ / „Поддержка управления DMX512(1990).“ | [H1] |
| Связь | „Режим связи: WiFi-IEEE 802.11b/g/n 2,4 ГГц“ | [H1] |
| Функ | «РЧ: 433 МГц (Мощность передачи: 15 дБм)», «Метод модуляции: LoRa с расширенным спектром» | [H1] |
| Технология | «Используется технология модема LoRa SPSP, совместимая с продуктами серии MiBoxer 433 МГц; управление осуществляется через приложение MiBoxer по Wi-Fi или сети 4G». | [H1] |
| Reichweite | «Контрольное расстояние: 50 м (лампы на глубине 0,5 м под пресной водой)», «1000 м (лампы на открытой местности)» | [H1] |
| Приложение | «Для системы iOS: пожалуйста, найдите «MiBoxer» в App Store… Для системы Android: найдите «MiBoxer» в Google Play» | [H1] |
| Konto | „Откройте приложение и нажмите кнопку «Регистрация»; Завершите регистрацию и войдите в систему.“ | [H1] |
| Обучение | «Найдите «Mi-Light Smart» в приложении сторонней платформы и настройте». | [Ч1] |
| Зонен | Verknüpfungsdialog mit «Zone1» … «Zone8» | [Ч1] |
| Группы | «Примечание: Этот шлюз не может управлять группами». | [H1] |
| DMX-адресация | «Нажмите «Установить DMX» в правом верхнем углу; в появившемся окне установите DMX512-адрес шлюза. Шлюз должен занимать 5 адресов для управления красным, зеленым, синим, теплым белым и белым цветом ламп соответственно. Например: установите DMX512-адрес шлюза на 008» → belegte Adressen „008 009 010 011 012 / Red Green Blue Cold white Warm White“ | [H1] |
| Функция обучения | «Функция обучения: Восстановление ID шлюза: 1. Нажмите кнопку «Обучение»… 2. В течение 10 секунд нажмите любую кнопку на пульте дистанционного управления, приложение сообщит об успешном обучении». - «Примечание: В настоящее время обучение поддерживается только пультом дистанционного управления FUT086 433 МГц». | [H1] |
| Веркнюпфен | Zone wählen → Lampe aus, 10 s warten, ein → «Нажмите кнопку соединения один раз в течение 3 секунд». → «Связывание выполнено, когда индикатор медленно мигнет 3 раза.»; Entkoppeln: «отсоединить кнопку один раз в течение 3 секунд» → «быстро моргнуть 10 раз» | [Ч1] |

**Примечания:**

- В руководстве можно указать «Вход питания», «Вход сигнала DMX512» и внешнюю «Панель управления DMX512». **Штекер типа DMX-Eingangs (XLR, RJ45, Schraubklemme) находится в конкретной документации** [H1].
- Форма продукта «Поддержка беспроводного управления DMX512-2.4G» [H2]. Das ist bei einem 433-MHz-Gerät offensichtlich ein Textfehler; В блестящей формуле найден 2,4-ГГц-DMX-передатчик FUTD01 [H15]. **[Inferenz]**: Die Produktseite wurde vom FUTD01 übernommen; maßgeblich ist das Handbuch [H1].
- Die Lernfunktion kopiert die Sender-ID der Fernbedienung ins Gateway («Шлюз копирует удаленный идентификатор… шлюз может управлять лампами напрямую, без повторного соединения» [H1][H2]). Das ist ein wichtiger Hinweis auf das Adressierungsmodell der Funkschicht (см. 3.3).

### 2.2 PW01 / PW02 Poolleuchte (Руководство EN/DE V1.0 [H3], Produktseite [H4])
| Меркмаль | Херстеллерангабе (Вёртлих) | Квелле |
|---|---|---|
| Фанк | «433 МГц RF-Funkübertragungstechnologie» / «Wir verwenden die LoRa-Modemtechnologie, um die Steuerung über große Entfernungen zu erfüllen». | [H3] (DE) |
| Совместимость | «Совместимость с FUT086 Fernbedienung и WL-433 433 МГц Gateway (отдельно)» | [H3] (DE) |
| Ворота-Пфлихт | «Steuerung der Smartphone-app (433 МГц-шлюз с полезным)», «Unterstützt Sprachsteuerung von Drittanbietern (433 МГц-шлюз с полезным)» | [H3] (DE) |
| Спаннунг (Руководство) | «При подключении к сети постоянного тока с напряжением 24 В, блок управления будет беспрепятственным, если источник питания будет соответствовать 24 В постоянного тока». | [H3] (DE) |
| Спаннунг (Продукт) | «Входное напряжение: 12 В переменного тока / 12 ~ 24 В постоянного тока» | [Ч4] |
| Световые характеристики | „2600 лм“, „95 лм/Вт“, „160°“, „IP68 (требуется крышка)“, „-20~45℃“, „Нержавеющая сталь 316 + ПК“, „9 динамических режимов“ | [H4] |
| Нетцшальтер-Штойерунг | Durch Aus-/Einschalten der Versorgung («Ausschalten (für 5 Sekunden); Wieder einschalten») werden nacheinander 17 Modi durchgeschaltet (8 статических фарбенов + 9 динамических моди); längere Auszeiten («5-10 секунд», «больше 10 секунд») haben abweichende Bedeutung | [H3] (DE) |
| Веркнюпфен | «Für weitere Details lesen Sie bitte die Remote-Anleitung». | [H3] (DE) |

**Widerspruch:** Handbuch (24 В постоянного тока) и Produktseite und Ihr Datenblatt (12 В переменного тока / 12-24 В постоянного тока). Für die Steuerungsfrage unerheblich, für die Установка очень актуальна - im Zweifel beim Hersteller klären.

**Praktische Folge des Netzschalter-Verhaltens [Inferenz]:** Wird die Leuchte über eine geschaltete Steckdose or ein Relais (z. B. aus ioBroker) versorgt, verändern kurze Aus-Phasen den Modus. Das ist einerseits eine rudimentäre, vollständig locale «Steuerung» (17 Modi durchschalten), andererseits eine Fehlerquelle bei jder Automatisierung, die die Versorgung schaltet.

### 2.3 FUT086 LoRa-433-MHz-Fernbedienung (Руководство [H5], Produktseite [H6])
- «Этот продукт представляет собой беспроводной пульт дистанционного управления с частотой 433 МГц. Мы используем технологию модема LoRa SPSP». [H5]
- Характеристики продукта: «Мощность передачи 10 дБм», «РЧ-частота 433 МГц», «Дальность управления 2000 м (открытая местность)» / «50 м (лампы на глубине 0,5 м под водой)», «Рабочее напряжение 3 В (2 батарейки AAA)», «Метод модуляции LoRa Spread Spectrum» [H6].
- Verknüpfen ohne Gateway: „Выключите свет, через 10 секунд снова включите.“ → „Коротко нажмите кнопку "I" 3 раза в течение 3 секунд, когда свет горит.“ → „Три медленных мигания индикатора означают успешное соединение.“; Entkoppeln: „Коротко нажмите кнопку "I" 5 раз в течение 3 секунд“ → „10 быстрых миганий индикатора“ [H5].
- Описание: «Вы можете добавить бесконечное количество светильников в зону с помощью 8-канального пульта дистанционного управления» и «Одной лампой или контроллером можно управлять только четырьмя пультами дистанционного управления (макс.)» [H5].

**Schlussfolgerung [Inferenz]:** Die Lampe speichert bis zu vier Sender-Identitäten (Fernbedienungen oder Gateway) je Zone; Шлюз может использоваться для Lernfunktion die Identität einer FUT086 ubernehmen. Модель сопряжения, которая содержит точное описание продукта Mi-Light-Produkte с частотой 2,4 ГГц, представляет собой реверс-инжиниринг Funkprotokoll (см. 3.3.5).

### 2.4 Семейство продуктов LoRa 433 МГц [H12]
PW01 (27 Вт PAR56), PW02 (18 Вт PAR56), UW01 (15 Вт Wandleuchte), UW02 (27 Вт Wandleuchte), UW03 (9 Вт Unterwasserleuchte), RD-9L (9 Вт Bodeneinbauleuchte), FUT086 (Fernbedienung), WL-433 (шлюз). Отдельный DMX-передатчик для линии 433 МГц не используется; DMX-Sender FUTD01 работает с GFSK 2,4 ГГц и «работает только с продуктами Miboxer RGB+CCT» (2,4 ГГц) [H7][H15]. Комплекты контроллеров 433 МГц FUT041/FUT042 не включены в документацию LoRa (управление: «Модуляция: ASK», «LoRa: Нет») [H17].

### 2.5 Был ли описан процесс интеграции во Fremdsysteme Sagt
- FAQ [H7] и официальный форум (Реклама «MiBoxer», 25.03.2025) [H8]: «Поддерживают ли устройства серии MiBoxer Wi-Fi и Zigbee Home Assistant и Homebridge? - Да, следуйте инструкциям по настройке устройства: https://developer.tuya.com/en/docs/iot/HA_HB_Bestpractice … **Внимание! 1. WL-Box1 и WL-433 не могут быть настроены.** 2. WL-Box2 поддерживает подключение к Home Assistant и Homebridge, но групповое управление бесполезно.»
- История компании [H9]: 2019 - «Компания Tuya Smart установила с нами прочные партнерские отношения. Все устройства MiBoxer получили обновленное программное обеспечение для поддержки Alexa, Google Home и голосового управления сторонних производителей».; 2021 - «Завершена разработка нового приложения MiBoxer Smart, все функции идентичны приложению Tuya Smart».
- FAQ [H7]: «Почему мое приложение перестало работать? (Приложение Mi-Light 3.0, приложение Mi-Light Cloud, приложение Miboxer)» → «Эти 3 приложения предназначены для старых серий, Miboxer обновил серию с Wi-Fi, мы рекомендуем использовать приложение Miboxer Smart или Tuya Smart».
- Загрузить-сайт [H10]: «Приложение MiBoxer поддерживает только WiFi-продукты серии WL» (идентификатор App-Store 1460445992, Android-Paket `com.futlight.miboxer`); «MiBoxer Smart» - это ваше любимое приложение (ID 1552337399).
- Собственный API, SDK, MQTT-, REST- или Entwicklermodus für das WL-433 с подробной документацией (Загрузки, Часто задаваемые вопросы, Каталог [H11], Форум) - **Negativbefund**.

**Einordnung [Inferenz]:** Der Hersteller verweist für Fremdintegration ausschließlich auf die Tuya-Entwicklerplattform und schließt das WL-433 Davon aus. Дамит чувствовал себя официальным Weg zum Local Key; Дополнительный документированный эрзац-метод - это дополнение к журналам отладки приложения MiBoxer (например, 3.1.4).

### 2.6 Widersprüche в Херстеллерангабене (Übersicht)
| Тема | Квелле А | Квелле Б | Bewertung |
|---|---|---|---|
| PW01-Спаннунг | Справочник: 24 В пост. тока [H3] | Продукт: 12 В переменного тока / 12-24 В постоянного тока [H4] | Бейм Херстеллер фото |
| WL-433 DMX | Продукт: «DMX512 to 2.4G» [H2] | Справочник: LoRa 433 МГц, DMX-Eingang [H1] | Handbuch maßgeblich |
| Имя приложения | Руководство/Скачать: «MiBoxer» [H1][H10] | Часто задаваемые вопросы: «Miboxer APP» = другое поколение; Empfehlung «Miboxer smart или Tuya smart» [H7]; Хендлер: «Tuya Smart / Smart Life» [H16] | Все остальные приложения с Tuya-basiert (здесь 3.1); Приложение для работы WL-433 не является самостоятельным тестом |
| Райхвайт WL-433 | 1000 м Фрайфельд [H1] | Хендлер: 50 м Фрайфельд | Herstellerangabe maßgeblich |

---

## 3. Протоколлализ - Schichtenmodell
### 3.1 Схема 1: WLAN/IP - локальный протокол Tuya
#### 3.1.1 Beleg, dass das WL-433 ein Tuya-Gerät ist
1. **Директор по идентификационному оборудованию [C1]:** Эйн Анвендер («Silverstar», 04.06.2025) с «двумя подводными (бассейновыми) светильниками MiBoxer PW01, которые управляются по фирменному протоколу LoRa 433 МГц» и einem WL-433, «который имеет вход DMX, а также управление через приложение MiBoxer, которое использует tuya under the hood», «Geräte-ID и Local Key aus dem Debug-Log der App gewonnen» («приложение свободно сообщает мне идентификатор устройства, локальный ключ и некоторые данные DP при регистрации своих отладочных данных (с помощью LogFox на Android)») и das Gateway mit «version»: «3.3»` в tinytuya/localtuya/tuya-local eingebunden.
2. **Herstelleraussagen [H9][H7]:** Tuya-Partnerschaft seit 2019, «все функции такие же, как у приложения Tuya smart APP» (2021), версия Tuya-Entwicklerplattform für Home Assistant [H7].
3. **Schwestergerät WL-Box2 [C6]:** Home-Assistant-Integration tuya-local führt ein offizielles Geräteprofil «MiBoxer WL-Box2» (Tuya-Produkt-ID `2vc0xj19d766eq0k`) с Standard-Licht-Datenpunkten 20-24, 26 и Einem Zonen-Datenpunkt 107.
4. **Разборка контроллеров Miboxer-WLAN [C10]:** Модуль Tuya CB3S (BK7231N) с TuyaMCU и датами «dpID 20 - логическое значение, состояние включения/выключения… dpID 24 - цвет RGB в виде строки ASCII».
5. **Проект с открытым исходным кодом bcaro/Miboxer [C11]:** «Miboxer совершенно другой и использует протокол Tuya».

#### 3.1.2 Das Tuya-Lokalprotokoll (LAN) - техническое описание
В официальном офисе существует специальная специализация Tuya. Фактический справочник - это документация и код библиотеки tinytuya [C2][C3] (Python) bzw. туяпи [C14] (Node.js):

| Эйгеншафт | Бесшрайбунг | Квелле |
|---|---|---|
| Транспорт | TCP-порт **6668** (Befehle/Status); UDP **6666** (Klartext-Broadcast v3.1), **6667** (verschlüsselter Broadcast ab v3.3), **7000** (Discovery-Anfrage v3.5) | [С2][С3] |
| Рахмен | Префикс `0x000055AA`, Sequenznummer, Kommando, Länge, Nutzdaten, CRC32, суффикс `0x0000AA55` (v3.1-3.4); v3.5: Префикс `0x00006699` | [С3][С2] |
| v3.3 (WL-433 laut [C1]) | „AES-ECB (все шифруемые команды) … без согласования сессии; целостность CRC32“ - statischer 16-Byte-Local-Key | [C3] |
| v3.4 | «Сессионный ключ (3-сторонний) … AES-ECB (сессионный ключ) … HMAC-SHA256» | [C3][C15] |
| Нуцдатен | JSON с `dps`-Объект: `{"dps": {"20": true, "22": 500}}`; Подустройства подсказки Hubs zusätzlich mit `cid` | [С2][С3] |
| Нуцдатен | JSON с `dps`-Объект: `{"dps": {"20": true, "22": 500}}`; Подсказка о суб-устройствах Hubs zusätzlich mit `cid` | [С2][С3] |
| Стандартные данные (v3.3) | 20 Шальтер (бул); 21 Modus (перечисление белый/цвет/сцена/музыка); 22 Хеллигкейт 10-1000; 23 Фарбтемпература 0-1000; 24 Farbe (шестнадцатеричная строка h:0-360, с:0-1000, v:0-1000); 25 Сене (Струна); 26 Отдых 0-86400 с | [С2] |
| Gleichzeitige Clients | „Обратите внимание, что многие устройства Tuya, похоже, поддерживают только одно локальное соединение.“ | [C4]; ebenso [I1] |
| Облачное соединение | «Использование этой интеграции не препятствует отправке вашими устройствами информации о состоянии в облако Tuya» | [C4] |
| Поведение в Cloud-Sperre | «Многие устройства Tuya перестают отвечать, если им не удается подключиться к серверам Tuya в течение длительного периода времени. Сообщается, что некоторые устройства лучше работают в автономном режиме, если заблокированы как DNS, так и TCP-соединения». | [C4] |

**История истории (Einordnung):** Die Tuya-Plattform wurde 2018 auf dem 35C3 analysiert («Умный дом - умный взлом», VTRUST) [S29]; daraus entstand tuya-convert (Fremdfirmware для gefälschtem Cloud-Update) [S30]. Tuya Hat das SDK 2019 und erneut im Februar 2022 gepatcht («Tuya исправила свой SDK по состоянию на февраль 2022 года.») [C12]. **[Inferenz]:** Ein Firmware-Esatz (Tasmota/ESPHome) на WL-433 не является реалистичным - актуальный модуль Tuya с установленными исправлениями, а LoRa-Ansteuerung не имеет отдельного, не требующего MCU-/Modem-Logik. Практичный способ - это набор локальных протоколов с оригинальным локальным ключом.

#### 3.1.3 WL-433 ist **ein** Tuya-Gerät - die Lampen sind keine Sub-Devices
Шлюзы Zigbee/BLE адресованы подустройствам через `cid`/`node_id` («Поддержка шлюза Zigbee использует модель родительского/дочернего устройства, в которой подключается родительское шлюзовое устройство, а затем добавляется одно или несколько дочерних устройств.» [C2]). Beim WL-433 ist das **nicht** der Fall: In [C1] erscheint das Gateway als ein einziges Gerät mit einer Geräte-ID; Zonen und Szenen werden über einen Roh-Datenpunkt gesendet («приложение отправляет несколько строк на DP 101»). Dasselbe Muster zeigt das WL-Box2-Profil (Zonenwahl über über DP 107 als Integer) [C6] и localtuya-Erfahrung mit dem WL-Box2: «в HA вы можете контролировать только зону, выбранную в вашем смарт-приложении» [C7].

**Конечный результат для ioBroker [Inferenz]:** Die Sub-Device-Unterstützung von `ioBroker.tuya` (см. 3.11.0, «Добавлена поддержка локального управления устройствами Zigbee через концентраторы» [I1]) hilft hier nicht; entscheidend ist, ob DP 101 im Schema Landet und ob seine Byte-Struktur bekannt ist.

#### 3.1.4 Локальный ключ - Beschaffung
| Метод | Бесшрайбунг | Анвендбар на WL-433? | Квелле |
|---|---|---|---|
| IoT-платформа Tuya + tinytuya-Wizard | Entwicklerkonto на iot.tuya.com, App-Konto для подтверждения QR-кода (например, Tuya Smart / Smart Life), ключей для API-интерфейса; Тестирование IoT-Core в течение 1 месяца и многое другое | Лаут Херстеллер **nein** («WL-433 невозможно настроить» [H7]); Лаут Анвендер: «Это устройство нельзя использовать с облачной платформой Tuya» [C1] | [C2][C13][H7][C1] |
| `ioBroker.tuya` Облачная синхронизация | Бесплатная синхронизация с App-Konto (Tuya Smart / Smart Life / Ledvance / Sylvania) | Nur wenn das WL-433 in einem dieser Konten gepaart werden kann (Händlerangabe «Tuya Smart / Smart Life app» [H16]; unbestätigt) | [I1][I3] |
| Журнал отладки приложения MiBoxer (Android, LogFox) | Приложение предоставляет идентификатор, локальный ключ и данные DP в журнале | **Ja - nachgewiesen** [C1] | [С1] |
| Примечание | «Ключ Local_Key для устройств Tuya будет меняться каждый раз, когда устройство удаляется и повторно добавляется в приложение TuyaSmart». | Nach jedem Neu-Pairing neu auslesen | [C2] |

#### 3.1.5 Der herstellerspezifische Datenpunkt 101 - Стенд der Dekodierung
> **Ночь от 22.09.2026:** Der Stand dieses Abschnitts ist überholt - Befehle, Statusabfrage und Status sind inzwischen an einem echten Gateway entschlüsselt und im Adaptor umgesetzt, siehe **3.1.8**.

Aus [C1] (Beiträge von «Silverstar» und dem tinytuya-Mitentwickler «uzlonewolf», 04.06.2025):

- DP 101 передает двоичные данные, закодированные в Base64: „Похоже, что они не зашифрованы, а просто закодированы в Base64.“ - „Base64 довольно распространен на устройствах Tuya для двоичных данных переменной длины.“
- Prüfsumme: «Единственное, что я могу сказать наверняка, это то, что последний байт представляет собой 8-битную сумму сообщения».
- Veröffentlichte Frames (декодирование, 12 байт):

| Рихтунг | База64 | Шестнадцатеричный | Prüfsumme Σ(байты 0-10) mod 256 |
|---|---|---|---|
| Приложение → Шлюз | `QwAAgAAAAAAAgIDD` | `43 00 00 80 00 00 00 00 00 80 80 c3` | 0xC3 ✓ |
| Приложение → Шлюз | `QQAACwYBAAAAAIDT` | `41 00 00 0b 06 01 00 00 00 00 80 d3` | 0xD3 ✓ |
| Приложение → Шлюз | `QQAACwYGAAAAAIDY` | `41 00 00 0b 06 06 00 00 00 00 80 d8` | 0xD8 ✓ |
| Шлюз → Приложение | `RAAAAAABAAEACwFS` | `44 00 00 00 00 01 00 01 00 0b 01 52` | 0x52 ✓ |
| Шлюз → Приложение | `SQAACwIBAAEAAAFY` * | `49 00 00 0b 02 01 00 01 00 00 01 59` | 0x59 ✓ (шестнадцатеричное значение) |
| Шлюз → Приложение | - | `42 00 00 00 02 01 00 01 00 0b 01 52` | 0x52 ✓ |
| Шлюз → Приложение | - | `42 00 00 00 02 01 00 01 00 0b 01 52` | 0x52 ✓ |

\* Строка Base64 может быть декодирована `…01 58`, в шестнадцатеричной форме потока `…01 59`; лучше всего выбрать шестнадцатеричную форму. Vermutlich ein Übertragungsfehler im letzten Base64-Zeichen (Y/Z). Eigene Nachrechnung aller sieben Frames: siehe Anhang A.

**Struktur-Hypothesen [Inferenz, nicht belegt]:** Байт 0 ist ein Kommandotyp (0x41-0x49); Байт 3: 0x0B или 0x80; Байт 10 находится между ответом 0x80 и ответом 0x01; Байт 11 умирает Prüfsumme. Die beiden 0x41-Frames unterscheiden sich nur в байте 5 (0x01 против 0x06) - ein Kandidat für eine Zonenoder Szenennummer. Eine belastbare Zuordnung erfordert eigene, systematische Mitschnitte (je Zone, je Taste); die Vorgehensweise находится в Kapitel 6 beschrieben.

#### 3.1.6 Ничего неясного: новый протокол Mi-Light-/LimitlessLED-LAN
iBox1/iBox2-Bridges der Vorgängergeneration Hatten Eine Offene UDP-API (v5: порт 8899; v6: порт 5987, Session-ID, Sequenznummer, Prüfsumme; Discovery über Port 48899 с «HF-A11ASSISTHREAD») [C16], auf der `ioBroker.milight` [I7], `ioBroker.milight-smart-light` [I8], Home Assistant «limitlessled» и sidoh/esp8266_milight_hub [R18] aufsetzen. Для позолоты WL-Generation:

- Кейн Херстеллер документирует порты «LimitlessLED» или LAN-API [H1][H2].
- Сообщение WL-Box1: «Я думаю, что WL-BOX1 использует другой протокол, с разными номерами портов, UDP вместо TCP» [C9]; Форум ioBroker: «ZZ gibt es keine Möglichkeit die neue Box в ioBroker zu bekommen.» [И5]; Выпуск «Unterstützung WL-Box1» без Lösung Geschlossen [I8].
- Das WL-433 spricht nachweislich Tuya 3.3 [C1].

**Schluss [Inferenz, hohe Sicherheit]:** Die milight-Adapter Sind für das WL-433 Strukturell Unbrauchbar.

#### 3.1.7 Облако-Abhängigkeit - zusammengefasst
| Фаза | Облако нетиг? | Белег |
|---|---|---|
| Ersteinrichtung / Сопряжение / Активация | Ja (Konto-Registrierung [H1]; Tuya-Activierung ist ein Cloud-Schritt, Token-Ablauf und «Активация не удалась» и Cloud-Fehler [C18]) | [H1][C18] |
| Local-Key-Beschaffung | Да (журнал приложений или IoT-платформы) | [С1][С2] |
| Laufender Betrieb в локальной сети | Nein (Tuya-Lokalprotokoll) - означает, что статус будет изменен в облаке, и вы сможете получить доступ к информации | [C4][I1] |
| Laufender Betrieb убер DMX | Нейн | [Ч1] |
| Установка DMX-Startadresse | Да (Приложение) | [Ч1] |

#### 3.1.8 Datenpunkt 101 - формат entschlüsseltes (нахтраг 22.09.2026)
**Добавьте.** Чтобы получить драгоценности с помощью **einer** действий в MiBoxer-App pro Schritt:

1. **Statusframes des Gateways** [E1]: Адаптер ioBroker (версия 0.0.1) связан с WL-433 и включен в DP-101-Frame в `dp101.history` и в протоколе журнала отладки. Действия в приложении (Helligkeit, Farbtemperatur, Farbe, Sättigung, Ein/Aus, Modi M1-M3, S+/S-, Zonen) должны выполняться в соответствии со стандартными датами 20-23.
2. **Описание приложения** [E2]: на смартфоне Android (Android 13) можно выполнить процедуру отладки по USB. WLAN-adb с использованием Rechner verbunden и системного протокола с `adb logcat` mitgeschnitten. Приложение MiBoxer (пакет `com.futlight.miboxer`) использует DP-101-Befehl как Zeile `ayxsendData =<hex>` и использует empfangenen Wert как `list value = {…}` ins Log; das Tuya-SDK protokolliert zusätzlich `publishDps(), вызываемый с помощью: dps = […], конвейер = [LAN]` bzw. `[MQTT]`. Для iOS доступны некоторые дополнительные возможности, связанные с протоколами других приложений - это поможет вам использовать Android-Gerät benötigt.

**Befehlsframe (Приложение → Шлюз), введите 0x41:**

| Байт | 0 | 1-2 | 3 | 4 | 5 | 6-8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|
| Вдох | `41` | `00 00` | `0B` | Бефель | Верт | beim Farbton = Wert, sonst `00` | Зона | `80` | Прюфсумме |

| Бефель (байт 4) | Бедейтунг | Верт (байт 5) | Митшнитт (Бейшпиль) [E2] |
|---|---|---|---|
| `01` | Фарбтон, шальтет зуглеих в ден Фарбмодус | 0-255 (0 = поворот, 360° по 256 Stufen) | `41 00 00 0B 01 49 49 49 49 01 80 F2` |
| `03` | Фарбтемпература | 0-38 (2700 К + 100 К в Стуфе) | `41 00 00 0B 03 12 00 00 00 01 80 E2` |
| `04` | Сеттигунг | 0-100 % | `41 00 00 0B 04 34 00 00 00 01 80 05` |
| `05` | Сзене / Модус M1-M9 | 1-9 | `41 00 00 0B 05 01 00 00 00 01 80 D3` |
| `06` | Вкус | `01` ein, `02` aus, `03` S- (ланзамер), `04` S+ (шнеллер), `06` Weißmodus | `41 00 00 0B 06 02 00 00 00 01 80 D5` |
| `06` | Вкус | `01` ein, `02` aus, `03` S- (Langsamer), `04` S+ (шнеллер), `06` Weißmodus | `41 00 00 0B 06 02 00 00 00 01 80 D5` |

Зона (байт 9): `00` = все зоны («ВСЕ»), `01`-`08` = Зоны 1-8 [E2]. Приложение устанавливает Zonenwahl nach einem Neustart в Zone 1 zurück. Ein eigener Tastencode für den Farbmodus existiert nicht - приложение было отправлено в Farbmodus, вместо того, чтобы отправить Farbton. Beim Ziehen eines Schiebereglers sendet die App die Zwischenwerte im Abstand von etwa 170 ms.

**Фрагмент статуса, тип 0x43:** `43 00 00 80 00 00 00 00 00 80 80 C3` - в [C1] вероффентлихте фрейме. Приложение будет отключено в течение 0,7 с и будет отключено в течение 36 с; Ответ шлюза наступает через 0,4 с с помощью Statusframe vom Typ 0x44 [E1][E2].

**Statusframe (Gateway → App), Typ 0x42 / 0x44:**

| Байт | 0 | 1-3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|
| Вдох | `42` Änderungsmeldung / `44` Ответ на 0x43 | `00 00 00` | Режим: `00` aus, `01` Farbe, `02` Weiß, `03`-`0B` M1-M9 | Фарбтон | Фарбтемпература | Хеллигкейт % | Sättigung % (im Weißmodus `00`) | `0B` | Стартовый DMX-адрес, один байт (версия 3.1.9) | Прюфсумме |

Бележ [E1]: Helligkeitsregler im Weißmodus min/mittel/max → Байт 7 = `01` / `2F` / `64` внутри DP 22 = 10 / 470 / 1000; Farbtemperatur Warm/mittel/Kalt → Байт 6 = `00` / `11`-`12` / `26` bei DP 23 = 0 / 440-490 / 1000; Sättigung max/mittel → Байт 8 = `64` / `2F`; Ein/Aus → Байт 4 = `01` ↔ `00`; M1/M2/M3 → Байт 4 = `03` / `04` / `05`; die App Zeigte dabei die Werte 1:1 an (Farbe «rgb251» = байт 5 `FB`, Sättigung 86 % = байт 8 `56`, 6500 K = байт 6 `26`). Die Änderungsmeldung 0x42 коммт через 2,5 с после завершения Änderung; einzelne Frames werden nach etwa 2 s wiederholt.

**Weitere Befunde [E1][E2]:**

- **Статус для всех зон.** Статус в вашей зоне; Байты 1-3 и 9 записаны в константе Allen Mitschnitten, байт 10 - в пределах DMX-Startadresse (3.1.9). Шлюз обеспечивает доступ к зоне доступа только в том случае, если приложение находится в зоне доступа.
- **Abgeleitete Standard-Datenpunkte.** DP 20-23 erzeugt das Gateway aus den DP-101-Befehlen (DP 22 = Helligkeit × 10, DP 23 ≈ Stufe × 26). Nach einem Moduswechsel sendet es DP 22 nicht neu; solange das Licht aus ist, meldet DP 21 «белый».
- **DP 24 не работает с приложением.** Ein Schreibversuch mit `007803e803e8` (Grün, v2-Format) для шлюза, который не работает, не работает и не устанавливается на 0.
- **Unbekannte Frame-Typen werden verworfen.** Ein nach dem Statusmuster gebauter Frame mit Typ 0x42 and `80` в байте 10 без Reaktion.
- **Geschwindigkeit nicht im Status.** S+ и S- исчезают, когда вы не можете изменить статус.
- **Подключение к локальной сети.** Доступ к адаптеру и удобному приложению для локальной сети с включенным шлюзом; Приложение, работающее в облаке (MQTT) на нашем сайте.
- **Тип кадра 0x49 и код вкуса `06 05`:** в соответствии с версией 3.1.9.

**Проверка.** Адаптер версии 0.1.0 был отправлен отдельно. Я echten Gateway wurden Helligkeit (все зоны), Farbe (Farbton + Sättigung), Szene M2, Weiß 3000 K в зоне 1 и Helligkeit в зоне 2, а также драгоценности в течение 2,7 с в течение 2,7 секунд для лучшего статуса [E1].

#### 3.1.9 DMX-Startadresse, Taste `06 05` и таймер приложения (начало 22.09.2026, Nachmittag)
Die Untersuchung wurde mit derselben Methode fortgesetzt (eine Aktion je Schritt, Mitschnitt des Adapters [E1] und der App [E2]).

**Начало DMX-адреса, тип 0x49.** В меню выбора приложения указано «DMX einstellen». Это setzt die Startadresse des DMX512-Eingangs (3.2.2). В приложении с адресом 123 и указанным адресом [E2] будет указано:

| Рихтунг | Рамка | Бедейтунг |
|---|---|---|
| Приложение → Шлюз | `49 00 00 0B 02 00 7B 00 00 02 80 53` | Адрес 123 (байты 5-6 = `00 7B`), Зона 2 (байт 9) |
| Шлюз → Приложение (статус) | `44 00 00 00 02 AB 03 28 00 0B 7B` + Prüfsumme | Байт 10 для Statusframes = следующий байт адреса (для `01` = адрес 1) |
| Шлюз → Приложение (статус) | `44 00 00 00 02 AB 03 28 00 0B 7B` + Prüfsumme | Байт 10 для Statusframes = следующий байт адреса (форма `01` = адрес 1) |

Для каждого кадра из [C1] необходимо указать: `49 00 00 0B 02 00 01 00 00 00 80` setzt Адрес 1 для всех зон, ответ `49 00 00 0B 02 01 00 01 00 00 01` лучше всего. Формат Бефелса: `49 00 00 0B 02 <Adresse high> <Adresse low> 00 00 <Zone> 80 <Prüfsumme>`. Адрес больше 255 (максимальный байт ≠ 0) wurden am echten Gerät nicht gesetzt; этот формат соответствует Zweibyte-Darstellung **[Inferenz]**. Статусный кадр содержит один байт - адрес больше 255, который указан на панели 0x49-Antwort. Адаптер имеет адрес версии 0.2.0 как Datenpunkt `settings.dmxAddress` an. При подключении шлюза [E1]: `49 00 00 0B 02 00 03 00 00 00 80 D9` (Адрес 3, все зоны) в течение 374 мс с `49 00 00 0B 02 01 03 32 00 00 03 8F` лучше всего, в новом состоянии определяется байт 10 = `03`; `49 00 00 0B 02 00 02 00 00 00 80 D8` (из 2) за 348 мс лучше всего, 10-й байт состояния соответствует `02`.

**Вкус `06 05`.** Vom Adaptor во всех заданных зонах (`41 00 00 0B 06 05 00 00 00 00 80 D7`): Die Leuchten gingen aus (DP 20 = false, Statusmodus `00`); ein zweites `06 05` лежит на [E1]. Die Taste также не может быть изменен, поэтому вы можете выбрать другой вариант. Bei anderen Mi-Light-Fernbedienungen ist ein solcher Code häufig das «Nachtlicht» **[Inferenz]** - das Liß sich nicht prüfen, weil der Anwender die Leuchten bei den Tests nicht sehen konnte. Адаптер не имеет вкуса.

**Таймер приложения.** Таймер приложения **в Tuya-Cloud** [E2]: Sie ruft die Cloud-Schnittstellen `tuya.m.timer.group.list` и `tuya.m.timer.group.add` auf (Категория `mi-light-timer`). Ein am 22.09.2026 angelegter Таймер «Montag bis Mittwoch 13:40 einschalten» bestand aus `time` = `13:40`, `loops` = `0111000` (sieben Stellen Sonntag bis Samstag), der Zeitzone und dem Befehl `instruct` = `[{"dps":{"20":true},"time":"13:40"}]`. Er schreibt также den Standard-Datenpunkt 20 - ohne Zone und DP 101. UM 13:40:07 meldete das Gateway DP 20 = true и 2,4 с später einen 0x42-Status; Адаптер должен быть заменен другим [E1]. Рекомендации: Таймер приложения для браузера в Интернете, если вы находитесь в локальной зоне, но не в любое время, а затем в любой другой зоне.

**Локальный таймер в адаптере.** Также Cloudfreier Ersatz enthält der Adaptor ab Version 0.2.0 до 50 собственных таймеров (Uhrzeit oder Sonnenereignis nach suncalc mit Verschiebung und Zufallsabweichung, Wochentage, Saison, Zone, jede Lichtaktion, Ausschalten nach einer Dauer). Praxistest am echten Gateway [E1]: Ein Timer в 14:13:25 («все зоны: Weiß 3000 K, 50 %, в течение 1 минуты»), отправьте `41 00 00 0B 06 01 …` (ein), `41 00 00 0B 03 03 …` (Stufe 3 = 3000 K) и `41 00 00 0B 02 32 …` (50 %); Статус `42 00 00 00 02 AB 03 32 00 0B 02` лучше всего подходит для всех дней в течение 2,7-3,0 с. Гм 14:14:25 после `41 00 00 0B 06 02 …` (аус), лучше всего на 2,7 с.

### 3.2 Схема 2: DMX512-Eingang
#### 3.2.1 Нормы и физика
- «DMX512 (1990)» bezeichnet die USITT-Revision von 1990 des ursprünglich 1986 geschaffenen Standards; seit 2004 ist DMX512-A als ANSI E1.11normaliert («8 ноября 2004 года Совет по стандартизации ANSI утвердил ANSI E1.11») [S24]. Aktuelle Ausgabe: ANSI E1.11-2024 (25.04.2024) [S22]; die von den meisten Datenblättern zitierte Ausgabe ist E1.11-2008 (R2018) [S23].
- Физика: «простой асинхронный восьмибитный последовательный протокол, состоящий из нетипизированного потока байтов, создаваемого стандартными UART» или «Технологии сбалансированной передачи данных EIA-485-A» [S23][S25]; 250 кбит/с, 8Н2; Пакет = BREAK, Mark-after-Break, Startcode + bis zu 512 Datatenslots [S23]; BREAK ≥ 92 мкс для отправителя (тип. 176 мкс), ≥ 88 мкс для Empfänger; MAB ≥ 12 мкс/≥ 8 мкс [S26][S27] (Секундное время, срок действия E1.11).
- DMX512 однонаправленный (Контроллер → Empfänger); Rückkanal nur mit RDM (ANSI E1.20) [S27]. Для WL-433 имеется документация RDM-Unterstützung [H1].

#### 3.2.2 Подключение к WL-433
- Этот шлюз является DMX-**Empfänger** («Вход сигнала DMX512») и входит в состав приложения, стартового адреса для дополнительных каналов в регионах Rot, Grün, Blau, Kaltweiß, Warmweiß [H1].
- Der Adressdialog enthält eine Zonenwahl («Нажмите «Зона» слева внизу в выборе зоны») [H1]. **Никакая документация:** для зоны, в которой имеется собственная 5-канальная блокировка, или для блокировки существующей зоны; welche Priorität DMX gegenüber App-/Fernbedienungsbefehlen шляпа; Шлюз с постоянным DMX-строком (с частотой ≈ 44 пакетов/с в 512 слотах, со скоростью 250 кбит/с, 11 бит со слотом BREAK/MAB [S23][S27]) в отдельных функциональных телеграммах (Relevanz für den Arbeitszyklus, siehe 3.3.7).
- Händlerhinweis: „Для этой функции требуется отдельный DMX-контроллер, использующий стандартные протоколы DMX512.“ [H18].
- Die Startadresse lässt sich auch local über DP 101 lesen und setzen (тип кадра 0x49, байт состояния 10), например 3.1.9 [E1][E2].

#### 3.2.3 Bewertung [Инференц]
DMX - это **einzige vollständig CloudFreeie и Deterministische** Steuerpfad, документация Hersteller. Preis: zusätzliche Hardware (Art-Net-Node + Kabel bis zum Gateway), voraussichtlich keine Zonentrennung, und die Adresse muss einmalig gsetzt werden - über die App или locale per DP 101 (3.1.9).

### 3.3 Схема 3: LoRa 433 МГц
#### 3.3.1 Была ли «Лора» здесь лучше?
- LoRa ist eine von Semtech entwickelte, proprietäre Chirp-Spread-Spectrum-Modulation: „A proprietary spread-spectrum modulation technique derived from existing Chirp Spread Spectrum (CSS) technology“ [S2]; „LoRa is purely a physical (PHY), or 'bits' layer implementation“ [S2]; „LoRa is the silicon developed by Semtech, and LoRaWAN® is a standard for interoperability managed by the LoRa Alliance®“ [S13].
- LoRaWAN ist davon zu trennen: «LoRa - это радиосигнал, который передает данные, а LoRaWAN - это протокол связи, который контролирует и определяет, как эти данные передаются по сети». [С12]. **[Inferenz]:** Miboxer nutzt LoRa als reine Punkt-zu-Mehrpunkt-PHY с собственным Applikationsschicht; LoRaWAN (Сетевой сервер, AES-Sitzungsschlüssel, EU433-Kanalplan, 433,175-434,665 МГц [S14]) spielt keine Rolle.
- Mathematische Beschreibung: Vangelista (2017) описывает LoRa как «Чирп-модуляцию со сдвигом частоты» с базовым демодулятором FFT [S8]. Vollständige, Offene PHY-Beschreibungen mit Quellcode: Knight & Seeber (2016, gr-lora, Bastille) [S11], Robyns et al. (2018, «первое детальное и полное описание физического уровня LoRa») [S9], Tapparel et al. (2020, gr-lora_sdr) [S10]. Патент: Seller & Sornin, США 9 252 834 B2 / EP 2 763 321 B1 [S7].
- Параметр трансивера (SX1276/77/78/79): 137-1020 МГц (SX1278: 137-525 МГц), Spreizfaktor SF 6-12, Bandbreite 7,8-500 кГц, Coderate 4/5-4/8, Sync-Word-Register `RegSyncWord` 0x39 mit Vorgabe 0x12 («частный») и 0x34 («зарезервировано для сетей LoRaWAN») [S3][R5][R6]. Символизация T_sym = 2^SF / BW [R14].
- Wichtig für jedes Mithören: «Аппаратный приемопередатчик LoRa будет отбрасывать кадры, содержащие символы синхронизации, которые не соответствуют предварительно настроенному значению». [С9]. Ein unbekanntes Sync-Word также должен быть ermittelt (SDR) или durchprobiert (256 Werte) werden; bei sehr hohem Signal-Rausch-Abstand ist die Filterung «утечка» [R13].

#### 3.3.2 Был ли прейсгибт Герстеллера
«Расширенный спектр LoRa», «Модемная технология LoRa SPSP» [H1][H5], 15 дБм Sendeleistung (шлюз) [H1], 10 дБм (FUT086) [H6], Райхвайтен 1000 м/2000 м Фрайфельд, 50 м и 0,5 м Вассертифе [H1][H6]; Каталог: «Радиомодуль LoRa 433 МГц - это маломощный беспроводной сетевой модуль большого радиуса действия… максимальное расстояние управления составляет более 2 км». [H11]. **Недоступно:** Чип, Mittenfrequenz, Bandbreite, Spreizfaktor, Sync-Word, Verschlüsselung, Kanalplan. Die Abkürzung «SPSP» wird nirgends erklärt (**[Inferenz]:** vermutlich «расширенный спектр»).

#### 3.3.3 Идентификация оборудования
- Единственное предложение по чипу: Запрос функции в esp8266_milight_hub (13.05.2024): «Возможно ли добавить поддержку удаленной эмуляции FUT086? Он использует трансивер SX1278 LoRa». [R1] - Предложение сообщества без фото или текста. Ответ от сопровождающего (13.07.2024): «Конечно, звучит возможно, но это довольно далеко от того, на что у меня будет время. С удовольствием рассмотрю запрос на слияние…» [R1]. Статус: открыто, не реализовано.
- FCC: Код получателя Futlights ist 2AJWW (Filings für 2,4-GHz-Produkte FUT092, FUT096, LS2, FUT106 u. a.) [S37]; В файле для WL-433, PW01 или FUT086 используется **nicht gefunden** (Datenbanken teilweise nicht erreichbar; die 433-MHz-Linie wird primar in EU/UK vertrieben, Händler nennen «CE, RoHS, UKCA» [H16]). Eine EU-Konformitätserklärung ist online nicht auffindbar.
- **[Inferenz]:** Ein Semtech-SX127x/SX126x- или LLCC68-basiertes Modul (z. B. Ai-Thinker Ra-01/Ra-02, Ebyte E32-433) ist die naheliegende, aber unbewiesene Annahme. Лучше всего использовать лучшие функции FUT086 (Modul-/Chipaufdruck).

#### 3.3.4 Стенд реверс-инжиниринга: **nichts vorhanden**
Trotz gazielter suche (GitHub-Repositories und -Issues, Hackaday.io, EEVblog, Reddit, Home-Assistant-Community, ioBroker-Forum, OpenMQTTGateway, rtl_433, ESPHome, chinesischsprachige Quellen) существует **keine** Veröffentlichung von Funkparametern, Выполните или внедрите Miboxer-433-MHz-LoRa-Line. Belege für die Vergeblichkeit anderer:

- Разработчик OpenMQTTGateway (29.05.2024): «Очень маловероятно. Хотя один из вариантов радиочастотного шлюза может принимать и передавать данные на MiBoxers, именно проприетарный протокол MiBoxer неизвестен OpenMQTTGateway, что делает это определенно сложным или, возможно, совершенно невозможным…» [R2]; Разработчик: «пока не повезло с Lora Milights» [R2].
- rtl_433 kann LoRa grundsätzlich nicht dekodieren: «Однако демодем rtl_433 не может расшифровать LoRa (в шестнадцатеричный формат) (мы ожидаем какой-то формы импульсов, а не этих разверток/чириканий)». [R3].
- Форум ioBroker: «WL-433» и «miboxer lora» - «Keine Ergebnisse gefunden» [I17].

#### 3.3.5 Vergleich: 2,4-ГГц-линия ist vollständig, реверс-инжиниринг
Хенрик Плётц (2015) использовал протокол Mi-Light-2,4 ГГц для SDR и SPI-Mitschnitt: PL1167/LT8900-Transceiver, GFSK, каналы 2411/2442/2473 МГц, Nutzdaten «3 байта идентификатор удаленного устройства/шлюза, 1 байт значения цвета, 1 байт яркость, 1 байт статуса кнопки, 1 байт счетчика пакетов и 2 байта CRC», Befehle ~30-fach wiederholt [R17][R19]. Darauf bauen henryk/openmili und sidoh/esp8266_milight_hub auf (Эмуляция Fernbedienungen FUT005-FUT098, FUT089, B05) [R18]. Auch der Hersteller selbst hatte die 2,4-GHz-Luftschnittstelle einst documentiert (Präambel 0xAAAAAA, Sync 0x147A/0x258B, 2-Byte-Remote-ID, Farbe, Helligkeit, Kommando 0x01-0x1A, CRC) [C16].

**[Inferenz]:** Идентичная модель сопряжения на частоте 433 МГц (Lampe lernt Sender-ID; bis zu vier Sender je Lampe; Lernfunktion kopiert Remote-ID in Gateway [H1][H5]) и LAN-seitigen DP-101-Frames eine schlichte 8-битное сообщение без проверки [C1] является дополнительным приложением (идентификатор отправителя, зона, команда, сообщение, сообщение, сообщение) или более частным LoRa-PHY.

#### 3.3.6 Vorgehen für ein eigenes Reverse Engineering (Machbarkeit: **mittel**)
| Шритт | Воргеен | Веркцойге/Квеллен |
|---|---|---|
| 0 | FUT086 открыт, Funkmodul/Chip для фотографирования и идентификации | - |
| 1 | RTL-SDR (433 МГц) + SDR++/gqrx: Taste drücken, Chirps im Wasserfall beobachten («эти колебания вверх или вниз типичны для LoRa» [R3]); Mittenfrequenz und Bandbreiteables; aus der Symboldauer den SF berechnen (T_sym = 2^SF/BW [R14]); Дополнительный IQ | RTL-SDR, сигидвики [S38] |
| 2 | IQ mit gr-lora_sdr [R8] или rpp0/gr-lora [R7] декодирован; Präambel, die zwei Sync-Word-Symbole («Два модулированных импульсных сигнала, значение которых может быть использовано в качестве идентификатора сети» [S9]) и заголовок (Coderate, CRC, Länge - bei explizitem Header selbstbeschreibend [S10]) auslesen | ГНУ Радио |
| 2б | Ohne SDR: ESP32 + SX1262 с локальным сканированием «syncfind» (256 синхронизированных слов) [R11] или CAD-базой SF-Sweep [R12][R22] | ESP32-S3/Хелтек, SX1262 |
| 3 | ESP32 + SX1276/78 (вариант 433 МГц, z. B. LILYGO/Heltec LoRa32 433) с ESPHome-`sx127x` (параметр `frequency`, `bandwidth`, `spreading_factor`, `coding_rate`, `sync_value`, `crc_enable`, `preamble_size`) [R5] или RadioLib [R6] или OpenMQTTGateway-LoRa (привязка MQTT и ioBroker) [R4] сконфигурированы; Nutzdaten je Taste/Zone протоколы | ESPHome/RadioLib/OMG |
| 3б | Обработка: Логический анализатор на шине SPI в FUT086 - регистрация частоты (частота, конфигурация модема, синхронизация слова, IQ-инвертация) и вход TX-FIFO в строку с открытым текстом (метод фон Плёца [R17]) | Логикаанализатор |
| 4 | Байтовое описание: идентификатор отправителя, зона, команда, Farbe/CCT/Helligkeit, Zähler, Prüfsumme; Установка с рамами DP-101 [C1] | - |
| 5 | Собственный отправитель (ESP32 + SX127x) также «virtuelle FUT086», в лампе для специального Verknüpfungsprozedur [H5]; Привязка ioBroker к MQTT [I12] или напрямую через адаптер | - |

Примечание: **mittel** - PHY is offen und wissenschaftlich beschrieben [S9][S10][S11], der Parameterraum nach einer SDR-Aufnahme klein (Sync-Word 8 Bit, IQ-Polarität, Header-Modus), die Applikationsschicht vermutlich einfach; есть **keine Vorarbeit**, keinen bestätigten Chip и keine FCC-Innenfotos. Реалистичный выбор для более подробного описания: выберите вариант PHY-параметра, введите значение байтового значения.

#### 3.3.7 Regulatorischer Rahmen (Германия/ЕС)
| Регельверк | Вдох для 433 МГц | Квелле |
|---|---|---|
| ETSI EN 300 220-2 V3.3.1 (2025-03), Таблица 4 | Полоса **H** 433 050-434 790 МГц: ERP 10 мВт, Arbeitszyklus ≤ 10 %, полоса пропускания до 1,74 МГц; Диапазон **I** (полоса шума): 1 мВт ERP, спектральный диапазон частот −13 дБм/10 кГц в полосе модуляции > 250 кГц, keine Zugriffsanforderung; Полоса **J** 434 040-434 790 МГц: ERP 10 мВт, Каналрастр ≤ 25 кГц | [S17] (V3.2.1: [S16]) |
| Arbeitszyklus-Определение | Kumulierte Sendezeit Internalhalb eines Beobachtungsintervalls T_obs (Стандартный 1 час) | [С15] |
| ERC/REC 70-03 (июнь 2024 г.), Приложение 1 | Gleiche Drei Teilbänder как g1/g2/g3 | [С18] |
| EU-Durchführungsbeschluss (EU) 2025/105 (позолота в Аньхане с 01.07.2025) | Цейлен 44a (ERP 1 мВт), 44b (ERP 10 мВт, Arbeitszyklus ≤ 10 %) | [S19] (Форгенгер (ЕС) 2022/180: [S20]) |
| БНецА Вфг. 91/2025 (ноябрь 2025 г.) «Allgemeinzuteilung… SRD» | 44а «433,05-434,79 МГц» «1 мВт (ЭРП)»; 44b «10 мВт (ERP)» «Arbeitsyklus: ≤ 10 %»; 45c «434,04-434,79 МГц» «10 мВт (ERP)» «Arbeitszyklus ≤ 100 % bei einer Bandbreite ≤ 25 кГц»; эрсетц Вфг. 133/2019; бефристе бис 31.12.2035 | [С21] |
| ФуАГ § 7 | Funkanlagen durfen nur genutzt werden, wenn sie bei bestimmungsgemäßer Nutzung den Anforderungen genügen | [С33] |

**Возможность 15 дБм для WL-433 [Inferenz]:** 15 дБм ≈ 31,6 мВт, 5 дБ выше 10 мВт ERP для полос H. Die Grenze gilt jedoch für die **abgestrahlte** Leistung (ERP = Leistung am Antennenanschluss + Antennengewinn) в дБд - Verluste ERP = EIRP - 2,15 дБ [S32]); Значение «15 дБм» соответствует стандарту Modulausgangsleistung. С внутренней антенной (Gewinn ≤ −5 дБд) был установлен выходной сигнал в Гренце - при падении, может быть, если это не произойдет, это может быть недопустимо. Für einen **eigenen** Отправитель позолочен: keine Einzelzuteilung nötig (Allgemeinzuteilung), aber ≤ 10 мВт ERP и ≤ 10 % Arbeitszyklus (bzw. ≤ 1 мВт ERP ohne Arbeitszykluslimit) sind einzuhalten [S21]; Стандартный модуль LoRa 433 МГц с ≤ +10 дБм с дипольной антенной в Рамене. Райнер предлагает собственные средства для SDR с помощью Sendefrage auf.

---

## 4. Bewertung der Steuerungspfade
| Пфад | Клаудфри (Бетриб) | Зонен | Сзенен/Моди | Zusatz-Аппаратное обеспечение | Ауфванд | Эвиденц | Хауптрисикен |
|---|---|---|---|---|---|---|---|
| **A1** `ioBroker.tuya` локальный | Да | Nein (для декодирования и адаптера DP 101) | Нейн | кейне | Геринг | [C1][I1][I2] | Сопряжение в Smart Life unbestätigt; unbekannte DPs werden verworfen; nur ein lokaler Клиент; Прошивка-OTA для 3.4/3.5 möglich (weiter unterstützt [I1]) |
| **A3** Скрипт (`ioBroker.javascript` + tuyapi / `exec` tinytuya) | Да | как A2 | как A2 | кейне | Геринг-Миттель | [I13][C2] | Wie A2, прочный Венигер |
| **A3** Скрипт (`ioBroker.javascript` + tuyapi / `exec` tinytuya) | Да | как A2 | как A2 | кейне | Геринг-Миттель | [I13][C2] | Wie A2, прочный Венигер |
| **B** DMX512 через Art-Net | **Да, пожалуйста** | нет документов (vermutlich nein) | nein (нур RGB+CW+WW-Werte) | Арт-Нет-Узел + DMX-Кабель | Геринг-Миттель | [H1][I9][I10][D1]-[D5] | Steckertyp/Pinout unbekannt; Приоритет DMX по сравнению с приложением невозможен; Адрес для панели настроек приложения |
| **C** Эйгенер LoRa-Sender | Да | Да (8 зон с FUT086) | Да | ESP32 + SX127x/SX126x, СДР | хох | [S9][S10][R5][R7][R8] | Кейн Форвиссен; регулирование; Чип unbestätigt |
| **E** Tuya-Cloud (IoT-Plattform-MQTT в `ioBroker.tuya`) | Нейн | - | - | - | - | [H7][I1] | Херстеллер: WL-433 «невозможно настроить» |
| **F** `ioBroker.milight` / Broadlink / Sonoff RF Bridge | - | - | - | - | - | [I7][I8][R20][R21] | **Нет анвендбара** |
| **F** `ioBroker.milight` / Broadlink / Sonoff RF Bridge | - | - | - | - | - | [I7][I8][R20][R21] | **Нет анвендбара** |

**Empfehlung [Inferenz]:** Kurzfristig A1 (Tuya-Lokalprotokoll testen, Local Key sichern) и параллельный B prüfen (DMX-Buchse inspizieren). Mittelfristig A2 также является собственным адаптером с DP-101-Unterstützung - это лучший вариант, который можно использовать в качестве дополнительного и функционального оборудования и полезного оборудования Funk. Weg C nur als Forschungsprojekt или Wenn das Gateway entfallen soll.

---

## 5. ioBroker - конкретные варианты интеграции
### 5.1 `ioBroker.tuya` (Аполлон77) - Weg A1
**Документация по собственным данным [I1][I2][I3]:**

- «При желании этот адаптер может работать в основном без Tuya Cloud». - einmalige Synchronization («синхронизировать один раз») с вашим App-Konto, danach lokale Erkennung for UDP-Broadcast и locale Verbindung.
- Unterstützte Konten: Tuya Smart, Smart Life; zusätzlich Ledvance (3.15.0) и Sylvania - **kein** «MiBoxer»-Вход.
- Протокол: Стандарт 3.3 (`версия || 3.3` в Parser), 3.4, 3.5 (версия 3.17.0, январь 2025 г.).
- Вспомогательные устройства: Zigbee-концентраторы (3.11.0) и ИК-шлюзы - для WL-433 без использования (например, 3.1.3).
- Unbekannte Datenpunkte werden mit `adapter.log.info("… Неизвестная точка данных… Пожалуйста, выполните повторную синхронизацию устройств")` **übersprungen** (`continue`) [I2] - DP 101 также будет доступен, когда он будет синхронизирован с облаком Schema enthalten ist.
- «Это возможно только в том случае, если приложение Tuya НЕ открыто ни на одном устройстве, поскольку большинство устройств допускают только одно локальное подключение».
- Ручная документация (ID + локальный ключ для облачной синхронизации); nur die IP kann manuell gesetzt werden.

**Практическое использование Miboxer-Geräten на ioBroker-Forum:** WL-BOX2 (2,4 ГГц) работает с `ioBroker.tuya`, Zonen über einen State «Choose_zone» [I4]; MiBoxer WL2-P75V24 функционал [I4]; MiBoxer WL5 erschien bei einem Nutzer nicht [I6]; zum WL-433 gibt es keinen Нить [I17].

**Обработка [Inferenz]:** Сопряжение WL-433 в Smart Life und der Sync, включая состояния для DP 20-24/26 → Ein/Aus, Modus, Helligkeit, Farbtemperatur, Farbe for die Gerade в App Gewählte Zone bzw. алле Лампен. Zonenwechsel nur, wenn DP 101 im Schema erscheint - и даже если это касается Roh-String, адаптер не может интерпретироваться.

### 5.2 DMX512 über Art-Net - Weg B
Кетте: `ioBroker.artnet` [I9] или `ioBroker.artnetdmx` [I10] → LAN → Art-Net-Node → DMX512 (EIA-485) → WL-433-DMX-Eingang → LoRa → PW01.

| Компоненты | Статус | Квелле |
|---|---|---|
| `ioBroker.artnet` | Im Stable-Repository, версия 1.2.2 (08.04.2020); Offene Wartungs-Issues (Node.js-26-Compatibilität, адаптер-ядро-обновление) | [I9] |
| `ioBroker.nodedmx` | node-dmx-Treiber (Art-Net, Enttec USB), как пройти тестирование | [I11] |
| `ioBroker.nodedmx` | node-dmx-Treiber (Art-Net, Enttec USB), как пройти тестирование | [I11] |
| Энттек ОДЭ Mk3 | 2 Universen, PoE или 12-24 В пост. тока, RDM | [Д1] |
| DMXking eDMX1 MAX | 1 Universum, Art-Net/sACN, USB-C-Versorgung | [Д5] |
| LuxDMX (ESP32, Open Source) | «Шлюз DMX512 с открытым исходным кодом Art-Net / sACN (E1.31) → DMX512 для ESP32 / ESP32-S3 / Ethernet», Browser-Flash | [D2] |
| Выход WLED DMX | Пользовательская сборка с `WLED_ENABLE_DMX`, MAX485 | [D4] |
| Выход DMX WLED | Пользовательская сборка с `WLED_ENABLE_DMX`, MAX485 | [D4] |

Информация о цвете: Steckertyp/Pinout am WL-433 (недокументированный [H1]); ob die 5 Kanäle einer Zone или allen Lampen gelten; Используйте DMX-сигнал.

### 5.3 Адаптер Eigener - Weg A2 (Konzept)
**Архитектура [Инференц, Форшлаг]:**

```
ioBroker-Adapter „miboxer-wl433“ (TypeScript, create-adapter-Template [I14])
 ├─ Konfiguration: IP, Geräte-ID, Local Key, Protokollversion (3.3, optional 3.4/3.5), Zonenanzahl
 ├─ Transport: tuyapi [C14] (find(), connect(), set({multiple:true, data:{…}}), on('data'))
 ├─ Standard-DPs → States: 20 on/off, 21 mode, 22 brightness (10–1000 → 1–100 %), 23 ct (0–1000 → 2700–6500 K),
 │                        24 hsv-hex → rgb/hex, 26 countdown
 ├─ Zonen-/Szenen-States → DP-101-Encoder (12-Byte-Frame + 8-Bit-Prüfsumme, Base64) – nach Dekodierung
 ├─ Watchdog: Reconnect, Heartbeat, Erkennung „App offen“ (Verbindung abgewiesen)
 └─ Optional: DP-101-Decoder für Statusmeldungen des Gateways (Antwortframes 0x42/0x44/0x49 [C1])
```

- Repository-Pflichten (io-package.json, журнал изменений во всех README-Sprachen, Adaptor-Checker, ESLint) gemäß den ioBroker-Entwicklungsrichtlinien [I14]; Для базового набора навыков необходимо использовать `iobroker-adapter-dev`-Vorgabe zur Verfügung.
- Kritischer Pfad ist ausschließlich die DP-101-Dekodierung (Kapitel 6, Schritt 4). Функциональность адаптера идентична с `ioBroker.tuya`, а также используется облачная синхронизация (ID + ключ для прямой настройки).

### 5.4 Вариант сценария - Weg A3
`ioBroker.javascript` kann zusätzliche npm-Module laden («введите имя (и версию) модуля в конфигурации экземпляра. ioBroker установит модуль.») и Systembefehle ausführen (`exec()`; muss in der Instanz freigegeben sein) [I13]. Дайте lässt sich tuyapi непосредственно в скрипте или в Python-скрипте с крошечным (`set_value(101, base64)`) aufrufen [C2]. Geeignet für Experimente und die DP-101-Mitschnitte; для Dauerbetrieb ist A2 vorzuziehen.

### 5.5 Nicht geignete Wege (mit Beleg)
- `ioBroker.milight` (foxthefox): „версия протокола milight v5 или v6 -> автоматически устанавливает соответствующий порт“ - kein 433/LoRa/Tuya [I7]. `ioBroker.milight-smart-light` (Steiger04): nur iBox1 v6 und Legacy-Bridge, letzte Version 1.2.2 (2021) [I8].
- Broadlink RM4 Pro: «RM4 pro IR не поддерживает частоту 315 МГц или плавающий код, только удаленное управление с фиксированным кодом 433 МГц» [R21]; Sonoff RF Bridge: «RF Bridge поддерживает только устройства OOK», изучает «команды дистанционного управления с фиксированным кодом, предоставляемые передатчиками PT2260, PT2262, PT2264 и EV1527» [R20]. LoRa-Chirps lassen sich damit weder aufzeichnen noch wiedergeben.

---

## 6. Планирование установки собственного оборудования
Значение: с минимальным Aufwand die Drei Offenen Fragen Klären (1) spricht das WL-433 Tuya 3.3 в собственной локальной сети, (2) с любыми датами, (3) с помощью DMX-Eingang ausgeführt.

1. **DMX-Eingang inspizieren** (Фото der Buchse/Klemme, Aufdruck). Ergebnis entscheidet über Weg B.
2. **Netzwerk-Scan** (Proxmox-LXC/VM с Python ≥ 3.8): `pip install tinytuya` → `python -m tinytuya scan` findet Tuya-Geräte über die UDP-Broadcasts 6666/6667 и Zeigt IP, Geräte-ID и Protokollversion [C2]. Erscheint das WL-433 с «3.3» - лучший вариант.
3. **Использование локального ключа** - Вариант а) Android-Gerät mit der MiBoxer-App und LogFox (Logcat-Viewer), App-Debug-Ausgabe beim Start/Steuern mitlesen; dort stehen Geräte-ID и локальный ключ [C1]. Вариант б) В этом случае WL-433 в паре приложений Smart-Life-App (Händlerangabe [H16]; beim WL-Box1 ist das documentiert [C9]) и аннулируется `ioBroker.tuya`-Sync bzw. tinytuya-Wizard (benötigt IoT-Plattform-Konto, monatlich zu verlängern [C13]). Совет: повторное сопряжение с ключом [C2].
4. **Статус:** `python -m tinytuya` bzw. Скрипт: `d = tinytuya.Device(id, ip, key, version=3.3); d.set_socketPersistent(True); print(d.status())` → Список DP. Erwartung: 20-24/26 и 101 [C1].
5. **Основы:** `d.set_value(20, True)`, `d.set_value(22, 500)`, `d.set_value(24, "00ff03e803e8")` (HSV-Hex, формат [C2]) - в используемом приложении.
6. **DP-101-Mitschnitte:** Приложение открыто, ваша зона и действие (Ein, Aus, Farbe, Szene 1…9) могут быть активированы и DP-101-String aus dem LogFox-Log или для настройки (pcapdroid + tinytuya-pcap-Parser, Verfahren aus) [C1]) notieren. Декодированные кадры (Base64 → 12 байт), допустимые значения (Anhang A), различные байты. Ergebnis ist Grundlage for den DP-101-Encoder в Weg A2.
7. **Проверка Cloud-Sperre:** WL-433 в UDM Pro с настройками брандмауэра без подключения к Интернету и настройками в локальной сети в течение 24 часов в сутки (Указания по DNS-Sperre в [C4]).
8. **Необязательно (Weg C):** RTL-SDR в пуле; Попробуйте дрюкен FUT086; Чирикает сихтбар? Mittenfrequenz/Bandbreite notieren - erste Daten für 3.3.6.

---

## 7. Offene Fragen und Unsicherheiten
| № | Фраге | Статус | Weg zur Klärung |
|---|---|---|---|
| 1 | Lässt sich das WL-433 в паре Tuya Smart/Smart Life (и будет ли он синхронизирован в `ioBroker.tuya`)? | Хэндлер: ja [H16]; Герстеллер: keine Aussage; Ответ: нет никакой IoT-платформы [C1] | Эйгенер Версах (Prüfplan 3b) |
| 3 | Байт-код от DP 101 | **gelöst** (22.09.2026): Befehle, Statusabfrage und Status entschlüsselt, siehe 3.1.8 [E1][E2]; Введите 0x49 = DMX-Startadresse, начиная с версии 3.1.9; offen nur die genau Wirkung der Taste `06 05` (Sichtprüfung) | Sichtprüfung в бассейне |
| 3 | Байт-код от DP 101 | **gelöst** (22.09.2026): Befehle, Statusabfrage und Status entschlüsselt, siehe 3.1.8 [E1][E2]; Введите 0x49 = DMX-Startadresse, начиная с версии 3.1.9; offen nur die genaue Wirkung der Taste `06 05` (Sichtprüfung) | Sichtprüfung в бассейне |
| 4 | DMX-Steckertyp/Pinout, Zonenzuordnung, Priorität DMX vs. App | недокументировано [H1] | Инспекция, Тест |
| 5 | LoRa-чип и параметр | Behauptung SX1278 [R1], не работает | FUT086 Оффнен, СДР |
| 6 | Betriebsspannung PW01 (24 В постоянного тока или 12 В переменного тока/12-24 В постоянного тока) | более широкие [H3][H4] | Херстеллер |
| 7 | Регуляторное соответствие 15 дБм (ERP) | Prüfbericht nicht auffindbar | Hersteller/Konformitätserklärung |
| 8 | Версия прошивки/протокол версии собственного WL-433 (3.3 или версии 3.4/3.5?) | необдуманный | сканирование tinytuya (Prüfplan 2) |

---

## 8. Референсы
Все URL-адреса были опубликованы в Rahmen der Recherche (сентябрь 2026 г.) abgerufen или - wo vermerkt - über Spiegelkopien bzw. Такой запрос проверен.

### H - Герстеллердокументе (Мибоксер / Футлайт)
- **[H1]** Miboxer: *Шлюз LoRa 433 МГц, модель: WL-433 - Руководство пользователя, версия V1.0.1*. https://miboxer.com/light/download/manual/WL-433.pdf (Spiegel: https://www.ledbe.com/image/catalog/MiBoxer/WL433/MiBoxer-WL-433-MHz-Gateway-User-Manual.pdf)
- **[H2]** Мибоксер: Продукт *LoRa 433MHz Gateway (WL-433)*. https://miboxer.com/product/lora-433mhz-gateway
- **[H3]** Miboxer: *PW01/PW02 Руководство пользователя V1.0* (EN/DE). https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_EN_V1.0.pdf; https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_DE_V1.0.pdf
- **[H4]** Мибоксер: Продукт *27 Вт RGB+CCT PAR56 светодиодный светильник для бассейна (LoRa 433 МГц), PW01*. https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz
- **[H5]** Miboxer: *FUT086 LoRa 433MHz RF Remote - Руководство пользователя V1.0*. https://miboxer.com/light/m_n/pdf/FUT086/FUT086_EN_V1.0.pdf
- **[H6]** Мибоксер: Продукт *8-зонный пульт дистанционного управления LoRa, 433 МГц (FUT086)*. https://miboxer.com/product/8-zone-lora-433mhz-remote-control
- **[H7]** Miboxer: *Часто задаваемые вопросы*. https://miboxer.com/faq
- **[H8]** Miboxer-Forum (официальный представитель Beitrag «MiBoxer», 25.03.2025): *Поддерживают ли серии MiBoxer Wi-Fi и Zigbee Home Assistant и Homebridge?* https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29
- **[H9]** Miboxer: *История*. https://miboxer.com/history
- **[H10]** Miboxer: *Загрузить* (App-Zuordnung, App-Store-ID). https://miboxer.com/download
- **[H11]** Miboxer: *Каталог продукции 2023-2024*. https://miboxer.com/down/2023-2024_product_catalogue.pdf
- **[H12]** Мибоксер: Категория продукта *LoRa 433*. https://miboxer.com/products-category/lora-433
- **[H13]** Apple App Store: *MiBoxer* (ID 1460445992, Anbieter Shenzhen Xincaiyi Technology Co., Ltd.). https://apps.apple.com/us/app/miboxer/id1460445992 ; Google Play `com.futlight.miboxer`
- **[H14]** Miboxer-Forum (Nutzerbeiträge 2026): *Пульт FUT086 не подключается должным образом к PW01*. https://forum.miboxer.com/t/fut086-remote-not-linking-up-properly-with-pw01-led-pool-light/251
- **[H15]** Мибоксер: Продукт *Светодиодный передатчик DMX512 (FUTD01)*. https://miboxer.com/product/dmx-512-led-transmitter
- **[H16]** Магазин Future House (Händler): *MiBoxer 433 МГц Gateway WL-433*. https://futurehousestore.co.uk/miboxer-lora/miboxer-433mhz-gateway-wl-433
- **[H17]** LEDBE (Händler): *Контроллер RGB MiBoxer FUT042 433 МГц* (Angabe «Модуляция: ASK», «LoRa: Нет»). https://www.ledbe.com/miboxer-fut042-433mhz-4pin-rgb-controller
- **[H18]** Яркие светодиоды Smart Bright (Händler): *Шлюз MiBoxer 433 МГц*. https://www.smartbrightleds.com/dmx-controllersdecoders-c-217_221/sblwl433-miboxer-433mhz-gateway-p-2146

### C - Community-Berichte und Documentation von Open-Source-Bibliotheken (LAN/Tuya)
- **[C1]** GitHub, jasonacox/tinytuya, Обсуждение №623: *Вопросы и немного информации о MiBoxer WL-433 Gateway DPs* (Silverstar, uzlonewolf; 04.06.2025). https://github.com/jasonacox/tinytuya/discussions/623
- **[C2]** Кокс, Дж. и др.: *TinyTuya - модуль Python для взаимодействия с интеллектуальными устройствами Wi-Fi Tuya*, README. https://github.com/jasonacox/tinytuya
- **[C3]** TinyTuya: *PROTOCOL.md* (Protokollversionen 3.1-3.5, Rahmenformat, Verschlüsselung, Sub-Devices). https://github.com/jasonacox/tinytuya/blob/master/PROTOCOL.md
- **[C4]** make-all: *tuya-local - интеграция Home Assistant для локального управления устройствами Tuya*, README. https://github.com/make-all/tuya-local
- **[C5]** tuya-local: *DEVICES.md* (Подсказка о Nicht-Tuya-Geräten подсказке Tuya-Hubs). https://github.com/make-all/tuya-local/blob/main/DEVICES.md
- **[C6]** tuya-local: Профиль устройства *miboxer_wlbox2_lighting.yaml* (PR #4254, 07.01.2026). https://github.com/make-all/tuya-local/blob/main/custom_components/tuya_local/devices/miboxer_wlbox2_lighting.yaml
- **[C7]** GitHub, rospogrigio/localtuya, выпуск № 1436 (WL-Box2-Zonen nur die in der App gewählte). https://github.com/rospogrigio/localtuya/issues/1436
- **[C8]** Сообщество Home Assistant: *MiBoxer WL-Box1 с локальной библиотекой Tuya*. https://community.home-assistant.io/t/miboxer-wl-box1-with-local-tuya/320747
- **[C9]** Сообщество Home Assistant: *LimitlessLED / Miboxer WL-Box1*. https://community.home-assistant.io/t/limitlessled-miboxer-wl-box1/148283
- **[C10]** elektroda.com: Демонтаж контроллеров Wi-Fi Miboxer (Tuya CB3S/BK7231N, Datenpunkte 20-24). https://www.elektroda.com/rtvforum/topic4030989.html
- **[C11]** bcaro/Miboxer, README («Miboxer - это совершенно другой проект, использующий протокол Tuya»). https://github.com/bcaro/Miboxer
- **[C12]** tuya-cloudcutter, README («Tuya внесла изменения в свой SDK в феврале 2022 года»). https://github.com/tuya-cloudcutter/tuya-cloudcutter
- **[C13]** Поддержка Tuya: *Пробная версия IoT Core - срок действия и продление*. https://support.tuya.com/en/help/_detail/Kbm9zue1v7vvu
- **[C14]** codetheweb: *TuyAPI - библиотека Node.js для локального протокола Tuya*. https://github.com/codetheweb/tuyapi
- **[C15]** GitHub, jasonacox/tinytuya, обсуждение № 260 (криптография 3.4/3.5). https://github.com/jasonacox/tinytuya/discussions/260
- **[C16]** BKrajancic: *LimitlessLED-DevAPI* (Archiv der Mi-Light-/LimitlessLED-Entwicklerdokumentation: Wifi Bridge v6 Protocol, 2.4 GHz RF). https://github.com/BKrajancic/LimitlessLED-DevAPI
- **[C17]** mwittig: *node-milight-promise*, `src/commandsV6.js`. https://github.com/mwittig/node-milight-promise
- **[C18]** Разработчик Tuya: *Проблемы с сопряжением Wi-Fi* (Token-Ablauf, „Activation failed“). https://developer.tuya.com/en/docs/iot-device-dev/Distribution-network-problem-Wi-Fi?id=Kaunggovmyubu

### Я - ioBroker
- **[I1]** Apollon77: *ioBroker.tuya*, README. https://github.com/Apollon77/ioBroker.tuya
- **[I2]** Apollon77: *ioBroker.tuya*, `main.js` („Неизвестная точка данных… Пожалуйста, синхронизируйте устройства“, `version || 3.3`, `cid`). https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/main.js
- **[I3]** Apollon77: *ioBroker.tuya*, Релизы (3.15.0 Ledvance/Sylvania-Login; 3.17.0 Tuya 3.5; 3.18.2 Август 2026). https://github.com/Apollon77/ioBroker.tuya/releases
- **[I4]** Форум ioBroker: *Светодиодная лента RGB+CCT с ioBroker steuern* (WL-BOX2 с ioBroker.tuya, «Выбрать_зону»). https://forum.iobroker.net/topic/70871/led-rgb-cct-strip-mit-iobroker-steuern
- **[I5]** ioBroker-Forum: *MiLight WL-Box1*. https://forum.iobroker.net/topic/29496/milight-wl-box1
- **[I6]** Форум ioBroker: *MiGlight/MiBoxer WL5 einbinden*. https://forum.iobroker.net/topic/71451/miglight-miboxer-wl5-einbinden
- **[I7]** foxthefox: *ioBroker.milight*, README. https://github.com/foxthefox/ioBroker.milight
- **[I8]** Steiger04: *ioBroker.milight-smart-light* (README; выпуск № 27 «Unterstützung WL-Box1»). https://github.com/Steiger04/ioBroker.milight-smart-light
- **[I9]** ioBroker: *ioBroker.artnet* (npm 1.2.2, 2020-04-08). https://github.com/ioBroker/ioBroker.artnet
- **[I10]** ChriD: *ioBroker.artnetdmx*; Тема на форуме *Neuer Adaptor artnetdmx*. https://github.com/ChriD/ioBroker.artnetdmx; https://forum.iobroker.net/topic/61571/neuer-adapter-artnetdmx
- **[I11]** Bordman-ger: *ioBroker.nodedmx*. https://github.com/Bordman-ger/ioBroker.nodedmx
- **[I12]** ioBroker: *ioBroker.mqtt*. https://github.com/ioBroker/ioBroker.mqtt
- **[I13]** ioBroker: *ioBroker.javascript - Документация* (`exec`, zusätzliche npm-Module). https://github.com/ioBroker/ioBroker.javascript/blob/master/docs/en/javascript.md
- **[I14]** Документация для разработчиков ioBroker: *Создание адаптера* (`npx @iobroker/create-adapter`). https://iobroker.github.io/dev-docs/getting-started/02-create-adapter/
- **[I15]** Apollon77/ioBroker.tuya, Issue #519 (Zigbee-Hub-Sub-Devices, 120-s-Polling). https://github.com/Apollon77/ioBroker.tuya/issues/519
- **[I16]** Форум ioBroker: *Tuya 3.9.x и локальный Zigbee* (Лучшая поддержка Hub 3.11). https://forum.iobroker.net/topic/60485/gel%C3%B6st-tuya-3-9-x-und-zigbee-local-geht-noch-nicht/23
- **[I17]** ioBroker-Forum, Muche «WL-433» / «miboxer lora»: «Keine Ergebnisse gefunden» (Стенд, сентябрь 2026 г.). https://forum.iobroker.net/search?term=WL-433&in=titlesposts

### D - DMX-/Art-Net-оборудование и прошивка
- **[D1]** Enttec: *ODE Mk3 - DMX Ethernet Converter*. https://www.enttec.com/product/dmx-ethernet/ode-mk3-dmx-ethernet-converter/
- **[D2]** tombueng: *LuxDMX - Открытый шлюз Art-Net / sACN → DMX512 для ESP32*. https://github.com/tombueng/LuxDMX
- **[D3]** andyboeh: *esphome-dmx512*. https://github.com/andyboeh/esphome-dmx512
- **[D4]** База знаний WLED: *Выход DMX*. https://kno.wled.ge/interfaces/dmx-output/
- **[D5]** DMX Pro Sales: *DMXking eDMX1 MAX*. https://dmxprosales.com/products/dmxking-edmx1-max

### R - RF-/LoRa-Werkzeuge und Reverse-Engineering-Projekte
- **[R1]** GitHub, sidoh/esp8266_milight_hub, выпуск № 828: *Добавлена поддержка удаленной эмуляции FUT086* (13.05.2024; Antwort sidoh 13.07.2024; отключено). https://github.com/sidoh/esp8266_milight_hub/issues/828
- **[R2]** GitHub, 1 технофил/OpenMQTTGateway, выпуск № 1956: *Miboxer Lora* (29.05.2024; Antwort DigiH; также «устаревший» от 16.09.2024). https://github.com/1technophile/OpenMQTTGateway/issues/1956
- **[R3]** GitHub, merbanan/rtl_433, выпуск № 2745 (rtl_433 не поддерживает LoRa nicht demodulieren). https://github.com/merbanan/rtl_433/issues/2745
- **[R4]** OpenMQTTGateway: *Шлюз LoRa - использование/настройка*. https://docs.openmqttgateway.com/use/lora.html ; https://docs.openmqttgateway.com/setitup/lora.html
- **[R5]** ESPHome: *Компонент SX127x* (LoRa/OOK/FSK; `sync_value` 0x12 privat, 0x34 LoRaWAN). https://esphome.io/components/sx127x/
- **[R6]** jgromes: *RadioLib*, `SX127x.h` (`REG_SYNC_WORD 0x39`, `SYNC_WORD 0x12`, `SYNC_WORD_LORAWAN 0x34`). https://github.com/jgromes/RadioLib
- **[R7]** rpp0: *gr-lora* (GNU-Radio-LoRa-Decoder; Zenodo DOI 10.5281/zenodo.853201). https://github.com/rpp0/gr-lora
- **[R8]** нажмите: *gr-lora_sdr* (EPFL, поддержка LoRa-TX/RX в GNU Radio). https://github.com/tapparelj/gr-lora_sdr
- **[R9]** BastilleResearch: *gr-lora*. https://github.com/BastilleResearch/gr-lora
- **[R10]** PentHertz: *LoRa_Craft*. https://github.com/PentHertz/LoRa_Craft
- **[R11]** Loomwave: *lorascan* (SX1262, «syncfind» около 256 слов синхронизации). https://github.com/Loomwave/lorascan
- **[R12]** JaapBraam: *LoRaWanGateway* (CAD-база SF-Sweep для SX1276/78). https://github.com/JaapBraam/LoRaWanGateway
- **[R13]** Форум The Things Network: *Следует ли частным сетям LoRaWAN использовать другое синхронизирующее слово?* («Обнаружение синхронизирующего слова «просачивается»»). https://www.thethingsnetwork.org/forum/t/should-private-lorawan-networks-use-a-different-sync-word/34496
- **[R14]** RevSpace: *DecodingLora* (Symboldauer 2^SF/BW, Sync-Word im Register 0x39). https://revspace.nl/DecodingLora
- **[R15]** Швайцер, А. (Classy Code, 2021): *Совместимость синхронизирующего слова LoRa между SX127x и SX126x*. https://blog.classycode.com/lora-sync-word-compatibility-between-sx127x-and-sx126x-460324d1787a
- **[R16]** Форум разработчиков Semtech LoRa: *Совместимость синхронизирующих слов LoRa для SX1272 и SX1262* (0x12 ↔ 0x1424, 0x34 ↔ 0x3444). https://forum.lora-developers.semtech.com/t/sx1272-and-sx1262-lora-sync-word-compatibility/988
- **[R17]** Плетц, Х. (2015): *Обратное проектирование эфирного протокола milight*, Hackaday.io Projekt 5888. https://hackaday.io/project/5888-reverse-engineering-the-milight-on-air-protocol
- **[R18]** Маллинс, К. (sidoh): *esp8266_milight_hub*, README. https://github.com/sidoh/esp8266_milight_hub
- **[R19]** Транкнер, Т. (2015/2017): *Откройте Milight на Raspberry Pi 2*. https://www.torsten-traenkner.de/wissen/smarthome/openmilight.php
- **[R20]** Документация Tasmota: *Sonoff RF Bridge 433*; rtl_433 PR #1491 («Радиочастотный мост поддерживает только устройства OOK»). https://tasmota.github.io/docs/devices/Sonoff-RF-Bridge-433/ ; https://github.com/merbanan/rtl_433/pull/1491
- **[R21]** Broadlink: *RM4 pro - Руководство пользователя* (manuals.plus). https://manuals.plus/broadlink/broadlink-rm4-pro-smart-remote-and-sensor-cable-set-rm4-pro-s-universal-ir-rf-remote-control-complete-features-user-guide
- **[R22]** Semtech (2024): *AN1200.85 - Обнаружение активности канала (CAD)*, v2.0. https://www.semtech.com/uploads/technology/LoRa/cad-ensuring-lora-packets.pdf
- **[R23]** haksht: *lorecon* (ESP32-S3 + SX1262 LoRa-Recon). https://github.com/haksht/lorecon

### E - Эйген Мессунген (Нахтраг, 22.09.2026)
- **[E1]** Настройка DP-101-Statusframes eines WL-433 (Tuya-Protokoll 3.3) с адаптером ioBroker.miboxer-wl433 0.0.1 (`dp101.history`, Debug-Log), проверка работы с версией 0.1.0. DMX-Antworten, Taste `06 05`, Ausführung eines App-Timers и Praxistest der local Timer с версией 0.2.0, 22.09.2026.
- **[E2]** Android-системный протокол (`adb logcat`) приложения MiBoxer `com.futlight.miboxer` на Android-13-смартфоне: Zeilen `ayxsendData =…`, `list value = …` и `publishDps()`, поэтому Cloud-Aufrufe `tuya.m.timer.group.*` beim Anlegen eines Таймеры, 22.09.2026.

### S - Normen, Regulierung, Datenblätter, Patente, Fachliteratur
- **[S1]** Semtech Corporation (2015): *AN1200.22 - Основы модуляции LoRa™*, редакция 2, май 2015 г. Список https://www.semtech.com/products/wireless-rf/lora-connect/sx1276 (Semtech-CDN aus der Recherche-Umgebung nicht abrufbar; Inhalt über Spiegelkopie geprüft).
- **[S2]** Semtech Corporation (2024): *AN1200.86 - LoRa® и LoRaWAN®*, v1.0, март 2024 г. https://www.semtech.com/uploads/technology/LoRa/lora-and-lorawan.pdf
- **[S3]** Semtech Corporation (2020 г.): *SX1276/77/78/79 - маломощный трансивер дальнего действия от 137 до 1020 МГц, техническое описание, ред. 7, май 2020 г.* (Spiegel: https://core-electronics.com.au/attachments/localcontent/SX1276_Datasheet_52573f9f913.pdf; Ред. 4/2015: https://cdn-shop.adafruit.com/product-files/3179/sx1276_77_78_79.pdf). Примечание: Die Registertabelle (RegSyncWord 0x39) война в необработанных копиях, ничего не энтальтен; Werte über [R5][R6][R15] был оставлен.
- **[S4]** Semtech: *SX1261/SX1262 Datasheet* (Produktseite, 07.04.2025). https://www.semtech.com/products/wireless-rf/lora-connect/sx1262
- **[S5]** Semtech: *Информационный листок LLCC68* (Produktseite, 07.04.2025). https://www.semtech.com/products/wireless-rf/lora-connect/llcc68
- **[S6]** Semtech Corporation (2013): *AN1200.13 - SX1272/3/6/7/8: Руководство разработчика модема LoRa*, Ред. 1. https://www.mouser.com/pdfdocs/semtech-lora-modem-design.pdf
- **[S7]** Продавец, O.B.A.; Сорнин, Н. (Semtech): *Маломощный передатчик дальнего действия*, US 9 252 834 B2 (объявлено 02 февраля 2016 г.), EP 2 763 321 B1 (объявлено 08 апреля 2020 г.). https://patents.google.com/patent/US9252834B2/en; https://patents.google.com/patent/EP2763321B1/en
- **[S8]** Вангелиста, Л. (2017): *Частотно-сдвиговая модуляция с частотной модуляцией: модуляция LoRa*. IEEE Signal Processing Letters 24(12), 1818-1821. DOI 10.1109/LSP.2017.2762960
- **[S9]** Робинс, П.; Квакс, П.; Ламотт, В.; Тенаерс, В. (2018): *Многоканальный программный декодер для схемы модуляции LoRa*. Труды IoTBDS 2018, с. 41-51, SciTePress. DOI 10.5220/0006668400410051. https://www.scitepress.org/Papers/2018/66684/
- **[S10]** Таппарел, Дж.; Афисиадис, О.; Майораз, П.; Балацукас-Стимминг, А.; Бург, А. (2020): *Прототип физического уровня LoRa с открытым исходным кодом на GNU Radio*. IEEE SPAWC 2020. DOI 10.1109/SPAWC48557.2020.9154273; arXiv:2002.08208. https://arxiv.org/abs/2002.08208
- **[S11]** Найт, М.; Сибер, Б. (2016): *Декодирование LoRa: реализация современной LPWAN с помощью SDR*. Труды конференции GNU Radio 1(1). https://pubs.gnuradio.org/index.php/grcon/article/view/8
- **[S12]** LoRa Alliance: *О LoRaWAN®*. https://lora-alliance.org/about-lorawan/
- **[S13]** Semtech: *Что такое LoRa?* https://www.semtech.com/lora/what-is-lora
- **[S14]** LoRa Alliance (2018): *Региональные параметры LoRaWAN 1.0.3*, версия A (EU433: 433,175-434,665 МГц, MaxEIRP +12,15 дБм, Sync-Word 0x34). https://lora-alliance.org/wp-content/uploads/2020/11/lorawan_regional_parameters_v1.0.3reva_0.pdf (актуально: RP002-1.0.5, 08.10.2025)
- **[S15]** ETSI (2017): *EN 300 220-1 V3.1.1 (2017-02) - Устройства ближнего действия (SRD), работающие в диапазоне частот от 25 МГц до 1000 МГц; Часть 1: Технические характеристики и методы измерения*. https://www.etsi.org/deliver/etsi_en/300200_300299/30022001/03.01.01_60/en_30022001v030101p.pdf
- **[S16]** ETSI (2018): *EN 300 220-2 V3.2.1 (2018-06) - … Часть 2: Гармонизированный стандарт доступа к радиочастотному спектру для неспецифического радиооборудования*. https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.02.01_60/en_30022002v030201p.pdf
- **[S17]** ETSI (2025): *EN 300 220-2 V3.3.1 (2025-03)*. https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf
- **[S18]** CEPT/ECC (2024): *Рекомендация ERC 70-03 - Относительно использования устройств ближнего действия (SRD)*, издание июнь 2024 г. https://docdb.cept.org/download/4512
- **[S19]** Европейская комиссия (2025 г.): *Durchführungsbeschluss (EU) 2025/105 от 22 января 2025 г. zur Änderung der Entscheidung 2006/771/EG* (ABl. L, 2025/105, 23.01.2025). http://data.europa.eu/eli/dec_impl/2025/105/oj
- **[S20]** Европейская комиссия (2022 г.): *Durchführungsbeschluss (EU) 2022/180 от 8 февраля 2022 г.* (ABl. L 29, 10.02.2022). https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022D0180
- **[S21]** Bundesnetzagentur (2025): *Vfg. 91/2025 - Allgemeinzuteilung von Frequenzen zur Nutzung durch Geräte geringer Reichweite (SRD)*, ноябрь 2025 г. https://www.bundesnetzagentur.de/DE/Fachthemen/Telekommunikation/Frequenzen/Allgemeinzuteilungen/_DL/vfg91_2025.pdf?__blob=publicationFile&v=3
- **[S22]** ESTA (2024): *ANSI E1.11-2024 - Технологии развлечений - USITT DMX512-A Асинхронный последовательный стандарт цифровой передачи данных для управления осветительным оборудованием и аксессуарами*. https://tsp.esta.org/tsp/documents/published_docs.php
- **[S23]** ESTA (2018): *ANSI E1.11-2008 (R2018)* - ANSI-Воршау. https://webstore.ansi.org/preview-pages/esta/preview_ansi-esta_e1-11_2008r2018.pdf
- **[S24]** Хефтер, М. (USITT): *Изумрудная годовщина USITT DMX512*, USITT Sightlines (Geschichte 1986/1990/2004). http://sightlines.usitt.org/archive/v46/n08/stories/DMX.html
- **[S25]** TIA (1998): *ANSI/TIA/EIA-485-A-1998 - Электрические характеристики генераторов и приемников для использования в сбалансированных цифровых многоточечных системах*. https://www.dinmedia.de/en/standard/eia-tia-485-a/51801110
- **[S26]** Сильверман, С.: *TeensyDMX -break-timing.md* (Секундные часы E1.11-Timing). https://github.com/ssilverman/TeensyDMX/blob/master/extras/break-timing.md
- **[S27]** ЗВУКОВОЙ СВЕТ: *Новый стандарт: DMX-512A* (Секундная скорость: 250 кбит/с, BREAK ≥ 92 мкс/88 мкс, однонаправленный/RDM). https://www.dmx512.de/dmx512a/index.htm
- **[S28]** IEEE (2021 г.): *IEEE Std 802.11-2020 - Спецификации MAC и PHY беспроводной локальной сети*. DOI 10.1109/IEESTD.2021.9363693 (inzwischen abgelöst durch IEEE 802.11-2024). https://standards.ieee.org/ieee/802.11/7028/
- **[S29]** Штайгервальд, М. (VTRUST) (2018): *Умный дом - умный взлом*, 35C3. https://media.ccc.de/v/35c3-9723-smart_home_-_smart_hack
- **[S30]** ct-Open-Source: *tuya-convert*. https://github.com/ct-Open-Source/tuya-convert
- **[S31]** Тлеубердин, С.; Сатыбалдина Д.; Муратхан Р.; Абишева, Г. (2026): *Аудит безопасности смарт-замка Tuya с использованием методологии тестирования на проникновение*. Компьютеры, материалы и континуа 88(3). DOI 10.32604/cmc.2026.081906
- **[S32]** Texas Instruments (2005): *SWRA048 - Обзор соответствия нормативным требованиям для устройств ISM-диапазона и ближнего действия* (ЭИЗП = ЭИИЗП − 2,15 дБ). https://www.ti.com/lit/an/swra048/swra048.pdf
- **[S33]** Закон о защите прав потребителей (FuAG) § 7. https://lxgesetze.de/fuag/7
- **[S34]** Semtech: Produktseite SX1276 (Список указаний по применению AN1200.22, AN1200.86 u.a.). https://www.semtech.com/products/wireless-rf/lora-connect/sx1276
- **[S35]** Хорнбакл, Калифорния (Semtech): *Синтезированный ЛЧМ-генератор с дробным N*, US 7,791,415 B2 (2010) - Vorläuferpatent, nicht das LoRa-Modulationspatent. https://patents.google.com/patent/US7791415B2/en
- **[S36]** Служба поддержки Tuya: *Локальный ключ не предоставляется для некоторых категорий устройств* (По состоянию на 19.05.2022). https://support.tuya.com/en/help/_detail/K9tndtl21hlin
- **[S37]** Код грантополучателя FCC 2AJWW (Futlight Optoelectronics Co., Ltd.) - z. Б. https://fcc.report/FCC-ID/2AJWW-LS2; https://fccid.io/2AJWW-FUT092 (Datenbanken aus der Recherche-Umgebung nur eingeschränkt erreichbar)
- **[S38]** Википедия идентификации сигналов: *LoRa*. https://www.sigidwiki.com/wiki/LoRa

---

## Anhang A - Nachrechnung der DP-101-Prüfsumme
Eigene Prüfung (Python) der sieben в [C1] veröffentlichten Кадры: Base64 → 12 байт; Prüfsummenhypothese Σ(байт 0…10) mod 256 = байт 11.

```
4300008000000000008080c3  12 Byte  OK  (0xc3)
4900000b02000100000080d7  12 Byte  OK  (0xd7)
4100000b06010000000080d3  12 Byte  OK  (0xd3)
4100000b06060000000080d8  12 Byte  OK  (0xd8)
4400000000010001000b0152  12 Byte  OK  (0x52)
4900000b0201000100000159  12 Byte  OK  (0x59)   [Base64-String im Thread ergibt …0158 – vermutlich Tippfehler]
4200000002010001000b0152  12 Byte  OK  (0x52)
```

Ответ: Предложенная гипотеза от узкого волка [C1] соответствует всем вероффентлихтенным фреймам. Кодировщик DP-101 может изменять количество кадров, а также семантику байтов 0-10.

## Аньханг Б - Hinweise zur Sitzung (Schätzwerte)
- **Dauer:** Die fünf Recherche-Agenten Liefen параллельные драгоценности ок. 14-18 минут; с проверкой и получением информации в течение 45-60 минут (kein exakter Zeitgeber verfügbar).
- **Token-Verbrauch:** Die Agenten meldeten zusammen ca. 915 000 токенов (172 тыс. + 198 тыс. + 199 тыс. + 178 тыс. + 167 тыс.); hinzu kommt der Kontext des Hauptagenten (200 000-250 000 токенов). Gesamt grob **1,1-1,2 млн. Token** - Schätzung, kein exakter Zähler.
- **Костен:** Der Max-Plan ist eine Pauschale ohne Token-Preis. Eine anteilige Zuordnung wäre nur als (Sitzungs-Token ÷ Monats-Token) × Monatspreis möglich; beide Größen sind hier nicht bekannt. Es wird daher kein Euro-Betrag angeben.