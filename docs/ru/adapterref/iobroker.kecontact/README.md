---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: ioBroker.keконтакт
hash: LKGHnXzAIq821xdC8UXfHqEwrLe7ezq5Y6Hg4ftgqls=
---
![Логотип](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Количество установок (последние)](https://iobroker.live/badges/kecontact-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/kecontact-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)
![НПМ](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.keконтакт
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# Адаптер ioBroker для KEBA KeContact P20 или P30 и BMW i wallbox
Управляйте своей зарядной станцией и используйте автоматическое регулирование, например. для зарядки вашего автомобиля с помощью фотоэлектрических излишков и аккумуляторов с использованием протокола UDP.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра
2. Введите IP-адрес вашего настенного ящика KEBA KeContact.
3. При необходимости отрегулируйте интервал обновления.
4. Сохраните конфигурацию
5. Запустите адаптер

## Конфигурация
### IP-адрес KeContact
Это IP-адрес вашего KEBA KeContact или настенного ящика BMW i.

### Проверка прошивки
Раз в день адаптер будет проверять, доступна ли более новая прошивка на сайте KEBA. Эта информация будет напечатана в журнале как предупреждение.

### Пассивный режим
Активируйте эту опцию, если вы не хотите управлять настенной коробкой самостоятельно и не хотите, чтобы этот адаптер выполнял какие-либо автоматические действия. В этом случае все последующие опции по автоматике PV и ограничению мощности будут игнорироваться.

### Последующий настенный ящик
Активируйте этот параметр, если это следующий настенный ящик в вашей среде. В настоящее время можно активно управлять только одним настенным боксом. Все остальные (отдельные экземпляры) должны отметить эту опцию, поскольку только один экземпляр может получать широковещательные сообщения. Этот настенный ящик/экземпляр будет работать в пассивном режиме.

### Загрузка сеансов зарядки
Вы можете установить этот флажок, чтобы периодически загружать последние сеансы зарядки (30) из настенной коробки.
ВНИМАНИЕ для пользователей с версии v1.1.1 и ниже: вы должны отметить эту опцию, чтобы по-прежнему получать за сеансы зарядки!

### Интервал обновления
Это интервал в секундах, через который настенная приставка должна запрашивать новые значения тарификации.

Значение по умолчанию — 10 минут, что является хорошим балансом между нагрузкой на KeConnect и наличием актуальной информации в ioBroker.

### Автоматика PV
Чтобы зарядить свой автомобиль в соответствии с избытком (например, с помощью фотогальваники), вы также можете определить состояния, которые представляют избыток и отношение к основной мощности. Эти значения используются для расчета силы тока, которую можно использовать для зарядки. По дополнительным значениям можно определить

* состояние текущей мощности аккумуляторной батареи, чтобы фотоэлектрическая автоматика использовала ее дополнительно для зарядки вашего автомобиля
* возможность ограничить мощность аккумуляторной батареи, чтобы просто держать зарядку с минимальной мощностью
* Переключите опцию X1, если вы хотите использовать вход X1 от зарядной станции, чтобы контролировать, заряжать ли полной мощностью или фотогальваническим автоматическим способом.
* Минимальная сила тока отличается от стандартной 6 А (требуется только, например, для Renault Zoe)
* значение относительной мощности, которое может быть использовано для начала зарядки (это означает, что зарядка начнется, даже если не будет достаточного излишка - рекомендуется 0 Вт для 1-фазной зарядки, от 500 Вт до 2000 Вт для 3-фазной зарядки)
* увеличение силы тока (рекомендуется 500 мА)
* стоимость обслуживания, которая может быть временно использована для поддержания сеанса зарядки (это означает, что зарядка будет остановлена позже, даже если достаточный запас больше не доступен - будет добавлено начальное значение - рекомендуется 500 Вт)
* минимальная продолжительность сеанса зарядки (даже если избытка уже недостаточно, сеанс зарядки будет длиться как минимум это время - рекомендуется 300 секунд)
* время для продолжения сеанса зарядки каждый раз, когда излишка больше не достаточно (чтобы сократить время в пасмурные дни)

### 1p/3p зарядка
Если у вас есть установочный контактор для (отключения) фазы 2 и 3 вашей зарядной станции, и этот переключатель может быть активирован состоянием, то этот адаптер может начать зарядку с одной фазы и переключиться на 3-фазную зарядку, если ваш избыток достаточен. для этого.
В этом случае введите состояние контактора вашей установки и укажите, является ли он НО (нормально разомкнутым) или НЗ (нормально замкнутым).

### Ограничение мощности
Вы также можете ограничить макс. мощность вашего настенного блока для ограничения основного питания. Например. при работе с ночными накопительными нагревателями вам, возможно, придется соблюдать ограничение максимальной мощности.
Если вы введете значение, ваш настенный ящик будет постоянно ограничен, чтобы не превысить лимит мощности.
Для ограничения можно указать до трех состояний счетчиков энергии. Все значения будут добавлены для расчета текущего потребления.
Дополнительный флажок используется для указания того, включено ли питание настенного ящика (в этом случае мощность настенного ящика будет вычтена из значений состояния).

### Динамические параметры
Кроме того, есть некоторые состояния, влияющие на поведение фотогальваники «на лету», например. с помощью собственного скрипта, обновляющего эти значения в соответствии с вашими потребностями)

* kecontact.0.automatic.photovoltaics - активирует фотогальванику автоматически (true) или будет заряжать автомобиль максимальной мощностью, если установлено значение false
* kecontact.0.automatic.calcPhases — определяет текущее количество фаз, которые будут использоваться для расчета зарядки. Это необходимо для версии Keba Deutschland и может использоваться для первоначального сеанса зарядки для всех зарядных станций.
* kecontact.0.automatic.addPower - определяет количество ватт энергии, разрешенное для зарядки вашего автомобиля (так же, как и в опциях)
* kecontact.0.automatic.pauseWallbox — немедленно останавливает каждую сессию зарядки, пока установлено значение true
* kecontact.0.automatic.limitCurrent — ограничивает вашу зарядку до указанной силы тока в мА (0 = без ограничений)

Пример: чтобы зарядить автомобиль постоянным током 6 А независимо от избытка, установите для параметра photovoltaics значение false, а для параметра limitCurrent — значение 6000.

## Юридический
Этот проект не связан прямо или косвенно с компанией KEBA AG.

KeConnect является зарегистрированной торговой маркой KEBA AG.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Sneak-L8) support for 1p/3p-charging (start charging with 1 phase and switch to 3 phases when enough surplus available)
* (Sneak-L8) minimum amperage allowed to 5A because some vehicles and KeContact (undocumented) allow this value
* (Sneak-L8) new switch to limit battery storage support only to hold minimum charging power
* (Sneak-L8) catch error when requesting firmware page (sentry IOBROKER-KECONTACT-1H)
* (Sneak-L8) RFID tag and class where not updated in channel "statitics" when no charging sessions were obtained

### 1.5.2 (2022-11-02)
* (Sneak-L8) fix error in release script

### 1.5.1 (2022-11-02)
* (Sneak-L8) update release script to v3

### 1.5.0 (2022-11-01)
* (Sneak-L8) minor fixes from adapter check
* (Sneak-L8) using Weblate for translations
* (Sneak-L8) update power and amperage value immediately for better calculation
* (Sneak-L8) fix description of authreq state
* (Sneak-L8) handle message at wallbox startup
* (Sneak-L8) catch error when UDP connection got lost (sentry IOBROKER-KECONTACT-1C)
* (Sneak-L8) update url and regex to Keba firmware

### 1.4.1 (2022-05-30)
* (Sneak-L8) separate states for charging and discharging battery storage
* (Sneak-L8) additional states to (de)authorize or unlock charging station and set date/time
* (Sneak-L8) fix unsubscribing foreign states (sentry IOBROKER-KECONTACT-10)

### 1.4.0 (2022-03-31)
* (Sneak-L8) support for battery storage in photovoltaics automatics
* (Sneak-L8) add state selector in settings dialog

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

   Copyright 2021-2022 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.