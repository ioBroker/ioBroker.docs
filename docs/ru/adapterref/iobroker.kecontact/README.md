---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: 3QHyVqiZjfLgnQkZ8ZhUM6HuhmxbrSS6fRqH+mXLgG8=
---
![Логотип](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Количество установок (последнее)](https://iobroker.live/badges/kecontact-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/kecontact-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)
![НПМ](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# Адаптер ioBroker для KEBA KeContact P20 или P30 и BMW i Wallbox
Управляйте своей зарядной станцией с помощью протокола UDP и используйте автоматическое регулирование, например, для зарядки вашего автомобиля за счет излишков фотоэлектрической энергии и аккумуляторной батареи.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес вашего настенного устройства KEBA KeContact.
3. Введите состояния счетчиков электроэнергии для фотоэлектрической автоматики или ограничения мощности и желаемые данные для аккумуляторной батареи.
4. Сохраните конфигурацию.
5. Запустите адаптер.

## Конфигурация
### IP-адрес KeContact
Это IP-адрес вашего KEBA KeContact или BMW i wallbox. Поддерживается сочетание с Keba KeContact S10 (устройство переключения фаз).

### Проверка прошивки
Больше не поддерживается, так как сайт Keba был изменён.

### Пассивный режим
Активируйте эту опцию, если вы хотите управлять своим настенным блоком самостоятельно и не хотите, чтобы этот адаптер выполнял какие-либо автоматические действия. В этом случае все последующие опции, касающиеся автоматики PV и ограничения мощности, будут игнорироваться.

### Последующий настенный ящик
Активируйте эту опцию, если это последующий wallbox в вашей среде. В настоящее время только один wallbox может управляться активно. Все остальные (отдельные экземпляры) должны выбрать эту опцию, поскольку только один экземпляр может получать широковещательные сообщения. Этот wallbox/экземпляр будет работать в пассивном режиме.

### Сеансы зарядки нагрузки
Вы можете отметить эту опцию, чтобы периодически загружать последние сеансы зарядки (30) из вашей настенной коробки.
ВНИМАНИЕ для пользователей версии v1.1.1 и ниже: вам необходимо отметить эту опцию, чтобы продолжать получать сеансы зарядки!

### Интервал обновления
Это интервал в секундах, с которым следует запрашивать у Wallbox новые значения зарядки.

Значение по умолчанию составляет 10 минут, что является хорошим балансом между нагрузкой на KeConnect и актуальностью информации в ioBroker.

### Автоматика для фотоэлектрических систем
Чтобы зарядить ваш автомобиль в соответствии с избытком (например, фотоэлектрическими устройствами), вы также можете определить состояния, которые представляют избыток и отношение к основной мощности. Эти значения используются для расчета силы тока, которая может быть использована для зарядки. С помощью дополнительных значений вы можете определить

* состояние для переключения фаз зарядки 1п/3п или с использованием порта X2 Keba Kecontact (с Keba KeContact S10 или любым другим контактором)
* состояние текущей мощности аккумуляторной батареи, поэтому автоматика фотоэлектрических систем будет использовать ее дополнительно для зарядки вашего автомобиля
* возможность ограничить мощность аккумуляторной батареи, чтобы она просто поддерживала зарядку с минимальной мощностью
* включите опцию X1, если вы хотите использовать вход X1 от зарядной станции для управления зарядкой на полной мощности или с помощью фотоэлектрического автоматического управления
* иная минимальная сила тока, чем 6 А по умолчанию (требуется только, например, для Renault Zoe)
* значение мощности, которое может быть использовано для начала зарядки (это означает, что зарядка начнется даже при недостаточном избытке — рекомендуется 0 Вт для 1-фазной зарядки, от 500 Вт до 2000 Вт для 3-фазной зарядки)
* увеличение силы тока (рекомендуется 500 мА)
* значение отношения, которое может временно использоваться для поддержания сеанса зарядки (это означает, что зарядка прекратится позже, даже если достаточного излишка больше не будет - начальное отношение будет добавлено - рекомендуемое значение 500 Вт)
* минимальная продолжительность сеанса зарядки (даже если излишков больше нет, сеанс зарядки будет длиться по крайней мере это время - рекомендуемые 300 сек)
* время для продолжения сеанса зарядки каждый раз, когда излишек больше недостаточен (чтобы сократить время в пасмурные дни)

### 1p/3p зарядка
Если у вас есть контактор установки для (отключения)подключения фаз 2 и 3 вашей зарядной станции, и этот переключатель может быть активирован состоянием, то этот адаптер может начать зарядку с одной фазы и переключиться на зарядку с 3 фазами, если вашего излишка для этого достаточно.
В этом случае, пожалуйста, введите состояние для вашего контактора установки и является ли он нормально разомкнутым (NO) или нормально замкнутым (NC)

### Аккумуляторная батарея
Если у вас есть аккумуляторная батарея, пожалуйста, заполните параметры здесь. Указывая состояния излишков и отношение к вашей аккумуляторной батарее, этот адаптер может контролировать, следует ли использовать аккумуляторную батарею для зарядки вашего автомобиля или нет, в зависимости от стратегии, указанной в параметрах.

### Немецкий §14a EnWG ограничение мощности
В соответствии с немецким законом §14a EnWG существует возможность ограничить зарядную станцию макс. фиксированным значением 6 А или динамическим значением 3x6 А (4,140 Вт)

### Ограничение мощности
Вы также можете ограничить максимальную мощность вашего настенного блока, чтобы ограничить основную мощность. Например, при работе ночных обогревателей вам, возможно, придется соблюдать ограничение максимальной мощности.
Если вы введете значение, ваш настенный блок будет ограничен непрерывно, чтобы не превысить ваш предел мощности.
Для ограничения можно указать до трех состояний счетчиков энергии. Все значения будут добавлены для расчета текущего потребления.
Дополнительный флажок используется для указания того, включена ли мощность настенного блока (в этом случае мощность настенного блока будет вычтена из значений состояния).

### Динамические параметры
Кроме того, существуют некоторые состояния, которые позволяют автоматически влиять на поведение фотоэлектрических систем «на лету», например, с помощью вашего собственного сценария обновления этих значений в соответствии с вашими потребностями.

* kecontact.n.automatic.photovoltaics - активирует фотоэлектрические элементы автоматически (true) или будет заряжать автомобиль с максимальной мощностью, если установлено значение false
* kecontact.n.automatic.calcPhases - определяет текущее количество фаз, которые будут использоваться для расчета зарядки. Это необходимо для версии Keba Deutschland и может использоваться для начального сеанса зарядки для всех зарядных станций
* kecontact.n.automatic.addPower - определяет количество ватт мощности, разрешенное для зарядки вашего автомобиля (то же самое, что и в опциях)
* kecontact.n.automatic.pauseWallbox — немедленно останавливает каждый сеанс зарядки, если установлено значение true
* kecontact.n.automatic.limitCurrent — ограничивает зарядку указанным током в мА (0 = без ограничений)
* kecontact.n.automatic.batteryStorageStrategy - стратегия, определяющая, следует ли использовать аккумуляторную батарею для зарядки вашего автомобиля и каким образом
* kecontact.n.automatic.batterySoCForCharging - ограничивает использование заряда аккумулятора транспортного средства, указывая SoC, ниже которого зарядка запрещена

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
* (Sneak-L8) new option to limit charging station according to german §14a EnWG
* (Sneak-L8) enable currTime for manual use and X2 even in passive mode
* (Sneak-L8) minimum verison für js-controller now 5.0.19
* (Sneak-L8) set currTimer timeout default value from 0 to 1

### 2.2.0 (2024-06-23)
* (mcm1957) Adapter requires nodejs >= 18 and js-controller >= 5 now.
* (mcm1957) Dependencies have been updated.
* (Sneak-L8) fix url for download page at Keba website
* (Sneak-L8) fix lint problems by replacing double by single quotes

### 2.1.1 (2024-03-16)
* (fischmi) fix error when chanigig dynamic SoC parameter

### 2.1.0 (2024-01-06)
* (Sneak-L8) multiple options for battery storage strategy
* (Sneak-L8) added names for values of some states: state, plug, timeQ and batteryStorageStrategy
* (Sneak-L8) don't try to charge when state is 5 (auth req, car not ready, ...)
* (Sneak-L8) new state to dynamically set SoC above which battery storage may be used for charging vehicle

### 2.0.2 (2023-10-10)
* (Sneak-L8) default value for minimum regard time (180 seconds)
* (Sneak-L8) fix calculation of phases for reduced charging
* (chrisko) added minimum timer to switch between phases if 1p/3p charging is used.
* (Sneak-L8) disable firmware check for c-series due to changes on webpage of Keba
* (Sneak-L8) sometimes 1p/3p switch was not working correctly (repeatedly "stop charging fpr switch of phases...")

### 2.0.1 (2023-07-10)
* (Sneak-L8) support for Company Car Wall Box MID - GREEN EDITION (sentry IOBROKER-KECONTACT-1K & IOBROKER-KECONTACT-1N) and PV-Edition (sentry IOBROKER-KECONTACT-1M)

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

   Copyright 2021-2024 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.