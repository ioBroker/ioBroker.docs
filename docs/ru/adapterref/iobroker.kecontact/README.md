---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: La5CV/fe48g5FjWEvYBRJHMgTEF+4t/4PISc93px8Fc=
---
![Логотип](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Количество установок](https://iobroker.live/badges/kecontact-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/kecontact-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/Sneak-L8/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# Адаптер ioBroker для KEBA KeContact P20 или P30 и BMW i wallbox
Управляйте своей зарядной станцией с помощью протокола UDP и используйте автоматическое регулирование, например, для зарядки вашего транспортного средства за счет излишков фотоэлектрической энергии и аккумуляторной батареи.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес вашего настенного устройства KEBA KeContact.
3. Введите состояния счетчиков электроэнергии для фотоэлектрической автоматики или ограничения мощности и желаемые данные для аккумуляторных батарей.
4. Сохраните конфигурацию.
5. Запустите адаптер.

## Конфигурация
### IP-адрес KeContact
Это IP-адрес вашего настенного блока KEBA KeContact или BMW i. Поддерживается сочетание с Keba KeContact S10 (устройство переключения фаз).

### Проверка прошивки
Больше не поддерживается, так как сайт Keba был изменён.

### Пассивный режим
Активируйте эту опцию, если вы хотите управлять своим настенным модулем самостоятельно и не хотите, чтобы этот адаптер выполнял какие-либо автоматические функции. В этом случае все последующие настройки, касающиеся автоматики солнечных панелей и ограничения мощности, будут проигнорированы.

### Последующий настенный блок
Активируйте эту опцию, если это следующий настенный блок в вашей среде. В настоящее время активное управление возможно только одним настенным блоком. Все остальные (отдельные экземпляры) должны включать эту опцию, поскольку только один экземпляр может получать широковещательные сообщения. Этот настенный блок/экземпляр будет работать в пассивном режиме.

### Сеансы зарядки нагрузки
Вы можете включить эту опцию, чтобы периодически загружать данные о последних сеансах зарядки (30) с вашего настенного устройства.
ВНИМАНИЕ для пользователей версии 1.1.1 и ниже: необходимо включить эту опцию, чтобы продолжать получать данные о сеансах зарядки!

### Интервал обновления
Это интервал в секундах, с которым настенный блок должен опрашиваться на предмет новых значений зарядки.

Значение по умолчанию — 10 минут, что является хорошим балансом между нагрузкой на KeConnect и наличием актуальной информации в ioBroker.

### Автоматика для фотоэлектрических систем
Чтобы заряжать автомобиль с учетом избытка энергии (например, от фотоэлектрических систем), вы также можете определить состояния, которые представляют избыток и потребление основной энергии сетью. Эти значения используются для расчета силы тока, необходимого для зарядки. С помощью дополнительных значений можно определить

* состояние переключения фаз зарядки 1п/3п или использование порта X2 Keba Kecontact (с Keba KeContact S10 или любым другим контактором)
* состояние текущей мощности аккумуляторной батареи, поэтому автоматика фотоэлектрических систем будет использовать ее дополнительно для зарядки вашего транспортного средства
* возможность ограничить мощность аккумуляторной батареи, чтобы она могла заряжаться только с минимальной мощностью
* включите опцию X1, если вы хотите использовать вход X1 от зарядной станции для управления зарядкой на полной мощности или с помощью фотоэлектрического автоматического управления
* другой минимальный ток, отличный от 6 А по умолчанию (требуется только для Renault Zoe)
* значение потребляемой мощности сети, которое может быть использовано для начала зарядки (это означает, что зарядка начнется даже при недостаточном избытке — рекомендуется 0 Вт для зарядки по 1 фазе, от 500 Вт до 2000 Вт для зарядки по 3 фазам)
* увеличение силы тока (рекомендуется 500 мА)
* значение потребления сети, которое может временно использоваться для поддержания сеанса зарядки (это означает, что зарядка прекратится позже, даже если достаточного излишка больше не будет — будет добавлено начальное потребление сети — рекомендуемое значение 500 Вт)
* минимальная продолжительность сеанса зарядки (даже если излишков больше нет, сеанс зарядки будет длиться по крайней мере это время - рекомендуемые 300 сек)
* время для продолжения сеанса зарядки каждый раз, когда излишек больше недостаточен (для покрытия времени в пасмурные дни)
* время всегда заряжать свой автомобиль сразу после подключения и требуется авторизация (чтобы избежать ошибки, которая заключается в том, что без немедленной зарядки дальнейшая зарядка невозможна)

### 1 пенс/3 пенса за зарядку
Если у вас есть контактор установки для соединения (отсоединения) фаз 2 и 3 вашей зарядной станции, и этот переключатель может срабатывать при определённом состоянии, то этот адаптер может начать зарядку от одной фазы и переключиться на зарядку от трёх фаз, если у вас достаточно излишков.
В этом случае, пожалуйста, укажите состояние контактора установки: нормально разомкнутый (NO) или нормально замкнутый (NC).
Также есть возможность настроить постоянную зарядку на однофазный (1P) или трёхфазный (3P).

### Аккумуляторная батарея
Если у вас есть аккумуляторная батарея, пожалуйста, заполните поля здесь. Указывая состояние избытка и потребления энергии от сети, этот адаптер может контролировать, следует ли использовать аккумуляторную батарею для зарядки вашего автомобиля, в зависимости от стратегии, указанной в параметрах.

### Немецкий §14a EnWG ограничение мощности
В соответствии с немецким законом §14a EnWG существует возможность ограничить зарядную станцию максимальным фиксированным значением 6 А или динамическим ограничением потребления сети до 3 x 6 А (4,140 Вт).

### Ограничение мощности
Вы также можете ограничить максимальную мощность настенного блока, чтобы снизить потребление электроэнергии. Например, при использовании обогревателей с ночным накоплением тепла может потребоваться соблюдение ограничения максимальной мощности.
Если ввести значение, мощность настенного блока будет постоянно ограничена, чтобы не превысить установленный лимит.
Для ограничения можно указать до трёх состояний счётчиков электроэнергии. Все значения будут суммироваться для расчёта текущего потребления.
Дополнительный флажок используется для указания того, учитывается ли мощность настенного блока (в этом случае мощность настенного блока будет вычитаться из значений состояния).

Другой вариант позволяет ограничить не мощность, а силу тока. С этой опцией сила тока зарядной станции будет снижена, чтобы не превышать максимально допустимую силу тока каждой фазы.
Поэтому вам необходимо указать значения силы тока каждой фазы вашего счётчика электроэнергии. Убедитесь, что фазы зарядной станции и счётчика электроэнергии имеют одинаковую нумерацию.

### Динамические параметры
Кроме того, существуют некоторые состояния, позволяющие автоматически влиять на поведение фотоэлектрических систем «на лету», например, с помощью собственного сценария обновления этих значений в соответствии с вашими потребностями)

* kecontact.n.automatic.photovoltaics — активирует фотоэлектрические системы автоматически (true) или будет заряжать автомобиль с максимальной мощностью, если установлено значение false
* kecontact.n.automatic.calcPhases — определяет текущее количество фаз, используемое для расчёта заряда. Это необходимо для версии Keba Deutschland и может использоваться для первоначального сеанса зарядки на всех зарядных станциях.
* kecontact.n.automatic.1p3pSwitch — определяет, должна ли — независимо от излишков — производиться зарядка по тарифу «всегда 1 пенс» или «всегда 3 пенса»
* kecontact.n.automatic.addPower — определяет количество ватт потребляемой сети, разрешенное для зарядки вашего автомобиля (такое же, как в опциях)
* kecontact.n.automatic.pauseWallbox — немедленно останавливает каждый сеанс зарядки, если установлено значение true
* kecontact.n.automatic.limitCurrent — ограничивает зарядку заданной силой тока в мА (0 = без ограничений)
* kecontact.n.automatic.batteryStorageStrategy — стратегия, определяющая, следует ли использовать аккумулятор для зарядки вашего автомобиля и как это сделать
* kecontact.n.automatic.batterySoCForCharging — ограничение использования заряда аккумулятора транспортного средства путем указания уровня заряда, ниже которого зарядка запрещена

Пример: Чтобы заряжать автомобиль постоянной силой тока 6 А независимо от излишков, установите для параметра «фотоэлектрические системы» значение «ложь», а для параметра «limitCurrent» — значение «6000».

## Юридический
Данный проект не связан ни напрямую, ни косвенно с компанией KEBA AG.

KeConnect является зарегистрированной торговой маркой KEBA AG.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Sneak-L8) new option to always charge with 1p oder 3p
* (Sneak-L8) new setting for discharging power of storage battery (if not equal to max battery power)
* (Sneak-L8) updated version requirements (admin 7.6.17 and core 3.3.2)

### 3.2.0 (2025-07-13)
* (Sneak-L8) new option to always start charging when vehicle is plugged if authorization is required to prevent charging station to block charging
* (Sneak-L8) optimized strategy for battery charging
* (Sneak-L8) node.js >= 20 required

### 3.1.0 (2025-03-20)
* (Sneak-L8) new option to reduce log entries on info level (write them with debug level)
* (Sneak-L8) fix wording error ("regard" changed to grid consumption)
* (Sneak-L8) fixed some english translations
* (Sneak-L8) renamed state "regardTimestamp" to "consumptionTimestamp" - please delete old state

### 3.0.1 (2025-03-15)
* (Sneak-L8) fix error sentry IOBROKER-KECONTACT-29 an IOBROKER-KECONTACT-2A
* (Sneak-L8) minimum js-controller now >= 7 due to I18n
* (Sneak-L8) fix roles of states in io-package.json
* (Sneak-L8) log of config on level debug instead of info

### 3.0.0 (2025-03-10)
* (Sneak-L8) rebase adapter on newest version of adapter creator
* (Sneak-L8) required js-controller now >= 6.0.11 and admin >= 7.0.23
* (Sneak-L8) new option to limit amperage of charging station to maximum value for amperage of whole mains circuit
* (Sneak-L8) immediately reduce charging power when over max amperage or max power limits
* (Sneak-L8) fix one time attempt for recharging vehicle in state 5
* (Sneak-L8) reduced info logs for max power adjustment when no vehicle is plugged (log as debug in that case)
* (Sneak-L8) pay attention to minimum time for phase switch by x2 when vehicle is plugged/unplugged
* (Sneak-L8) fix error sentry IOBROKER-KECONTACT-21
* (Sneak-L8) migrate from request to axios
* (Sneak-L8) migrate from ESlint v8 to v9

### 2.3.0 (2024-11-29)
* (Sneak-L8) new option to limit charging station according to german §14a EnWG
* (Sneak-L8) enable currTime for manual use and X2 even in passive mode
* (Sneak-L8) minimum verison für js-controller now 5.0.19
* (Sneak-L8) set currTimer timeout default value from 0 to 1
* (Sneak-L8) support new option "setBoot" of c-series stating firmware 3.10.57

## License
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2021-2025 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.