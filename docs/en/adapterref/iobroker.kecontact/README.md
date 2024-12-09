![Logo](admin/kecontact.png)
# ioBroker.kecontact

[![NPM version](https://img.shields.io/npm/v/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact)
![Number of Installations (latest)](https://iobroker.live/badges/kecontact-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/kecontact-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.kecontact)

[![NPM](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)](https://nodei.co/npm/iobroker.kecontact/)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# ioBroker adapter for KEBA KeContact P20 or P30 and BMW i wallbox

Control your charging station using its UDP protocol and use automatic regulation e.g. to charge your vehicle by photovoltaic surplus and battery storage.

## Install

Install this adapter via ioBroker Admin:
1. Open instance config dialog
2. Enter the IP address of your KEBA KeContact wallbox
3. Enter states of energy meters for PV autoamtics or power limitation and desired data for battery storage
4. Save the configuration
5. Start the adapter

## Configuration

### KeContact IP Address

This is the IP address of your KEBA KeContact or BMW i wallbox. Combination with Keba KeContact S10 (phase switching device) is supported.

### Firmware check

No longer supported since webite of Keba was changed.

### Passive Mode

Activate this option if you wnat to control your wallbox by your own and yu do not wish this adapter to do some automatics. In this case all subsequent options regarding PV automatics and power limitation will be ignored.

### Subsequent wallbox

Activate this option if this a subsequent wallbox in your environment. Currently, only one wallbox can be managed actively. All others (seperate instances) must check this option because of only one instance can receive broadcast messages. This wallbox/instance will be running in passive mode.

### Load charging sessions

You can check this option to periodically download the latest charging sessions (30) from your wall box.
ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!

### Refresh Interval

This is the interval in seconds how often the wallbox should be queried for new charging values.

The default value is 10 minutes which is a good balance between the load for the KeConnect and having up-to-date information in ioBroker.

### PV automatics

To charge your vehicle accordingly to a surplus (e.g. by photovoltaics) you can also define states which represent surplus and regard of main power. These value are used to calculate amperage which can be used for charging. By additional values you can define
* a state to switch charging phases 1p/3p or using X2 port of Keba Kecontact (with Keba KeContact S10 or any other contactor)
* a state for current power of battery storage, so the photovoltaics automatics will use it additionally for charging your vehicle
* an option to limit power of battery storage to just hold charging with minimum power
* toggle X1 option if you want to use X1 input from charging station to control whether to charge with full power or by photovoltaic automatic
* a different mimimum amperage than the default 6 A (only needed for e.g. Renault Zoe)
* a value of regard power that may be used to start charging (that means charging will start even if not enough surplus is available - suggested 0 W for 1 phases charging, 500 W to 2000 W for 3 phases charging)
* an increment for amperage (suggested 500 mA)
* a value of regard that may be temporarily used to uphold charging session (that means charging will stop later even if enough surplus is no longer available - starting regard will be added - suggested 500 W)
* minimum duration of charging session (even if surplus is no longer sufficient, a charging session will last at least this time - suggested 300 sec)
* time to continue charging session each time surplus is no longer sufficient (to bridge the time on cloudy days)

### 1p/3p charging

If you have an installation contactor to (dis)connect phase 2 and 3 of your charging station and this switch can be triggered by a state then this adapter is able to start charging with one phase and switch to 3 phases charging if your surplus is sufficient for it.
In this case please enter the state for your installation contactor and whetherit is a NO (normally open) or NC (normally close)

### batery storage

If you own a battery storage please fill in the options here. By specifiying states for surplus and regard of your battery storage, this adapter can control whether
battery storage should be used for charging your vehicle or not, depenent from the strategy preficied in the options.

### german §14a EnWG power limitation

Due to german §14a EnWG there's an option to limit charging station to max. 6A fix or dynamically to regard of 3x6A (4.140 watts)

### power limitation

You can also limit max. power of your wallbox to limit main power. E.g. when running night-storage heaters you might have to respect a maximum power limitation.
If you enter a value, your wallbox will be limited continously to not pass your power limit.
Up to three states of energy meters can be specified for limitation. All values will be added to calculate current consumption.
An extra checkbox is used to specified whether wallbox power is included (in this case wallbox power will be subtracted from the state values).

### dynamic options

Additionally there are some states to influence behaviour of photovoltaics automatic on the fly, e.g. by a script of your own updating these values according to your needs)
* kecontact.n.automatic.photovoltaics - actives photovoltaics automatic (true) or will charge vehicle with maximum power when set to false
* kecontact.n.automatic.calcPhases - defines the current number of phases to be used for charging calculation. This is needed for Keba Deutschland edition and can be used for initial charging session for all charging stations
* kecontact.n.automatic.addPower - defines an amount of watts of regard allowed to charge your vehicle (same as in options)
* kecontact.n.automatic.pauseWallbox - stops every charging session immediately as long a set to true
* kecontact.n.automatic.limitCurrent - limits your charging to specified amperage in mA (0 = no limitation)
* kecontact.n.automatic.batteryStorageStrategy - strategy whether and how your battery storage should be using for charging your vehicle
* kecontact.n.automatic.batterySoCForCharging - limit usage of battery torage for vehicle by specifying a SoC below which charging is prohibited

Sample:
To charge your vehicle with a constant amperage of 6A regardless of surplus, set photovoltaics to false and limitCurrent to 6000.


## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.3.0 (2024-11-29)
* (Sneak-L8) new option to limit charging station according to german §14a EnWG
* (Sneak-L8) enable currTime for manual use and X2 even in passive mode
* (Sneak-L8) minimum verison für js-controller now 5.0.19
* (Sneak-L8) set currTimer timeout default value from 0 to 1
* (Sneak-L8) support new option "setBoot" of c-series stating firmware 3.10.57

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

## Legal

This project is not affiliated directly or indirectly with the company KEBA AG.

KeConnect is a registered trademark of KEBA AG.

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