---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: MGiYMwJoul92QwJbU2ve3VGjaw4SuxeBxGvNS9gxt8c=
---
![Logo](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Anzahl der Installationen](https://iobroker.live/badges/kecontact-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/kecontact-stable.svg)
![NPM](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test und Freigabe](https://github.com/Sneak-L8/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# IoBroker-Adapter für KEBA KeContact P20 oder P30 und BMW i Wallbox
Steuern Sie Ihre Ladestation über das UDP-Protokoll und nutzen Sie die automatische Regelung, z. B. um Ihr Fahrzeug mit Photovoltaik-Überschuss und Batteriespeicher zu laden.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Dialog zur Instanzkonfiguration.
2. Geben Sie die IP-Adresse Ihrer KEBA KeContact Wallbox ein.
3. Geben Sie die Zustände der Energiezähler für PV-Automatik oder Leistungsbegrenzung sowie die gewünschten Daten für den Batteriespeicher ein.
4. Konfiguration speichern
5. Schalten Sie den Adapter ein.

## Konfiguration
### KeContact IP-Adresse
Dies ist die IP-Adresse Ihrer KEBA KeContact oder BMW i Wallbox. Die Kombination mit Keba KeContact S10 (Phasenumschalter) wird unterstützt.

### Firmware-Prüfung
Wird nicht mehr unterstützt, da die Website von Keba geändert wurde.

### Passiver Modus
Aktivieren Sie diese Option, wenn Sie Ihre Wallbox selbst steuern möchten und keine automatischen Funktionen des Adapters wünschen. In diesem Fall werden alle nachfolgenden Optionen bezüglich PV-Automatik und Leistungsbegrenzung ignoriert.

### Nachfolgende Wanddose
Aktivieren Sie diese Option, wenn es sich um eine weitere Wallbox in Ihrer Umgebung handelt. Aktuell kann nur eine Wallbox aktiv verwaltet werden. Alle anderen (separaten Instanzen) müssen diese Option aktivieren, da nur eine Instanz Broadcast-Nachrichten empfangen kann. Diese Wallbox/Instanz wird im passiven Modus betrieben.

### Ladevorgänge
Sie können diese Option aktivieren, um die letzten 30 Ladevorgänge regelmäßig von Ihrer Wallbox herunterzuladen.
HINWEIS für Nutzer von Version v1.1.1 und älter: Sie müssen diese Option aktivieren, um weiterhin Ladevorgänge zu erhalten!

### Aktualisierungsintervall
Dies ist das Intervall in Sekunden, in dem die Wallbox nach neuen Ladewerten abgefragt werden soll.

Der Standardwert beträgt 10 Minuten. Dies stellt ein gutes Gleichgewicht zwischen der Auslastung von KeConnect und der Aktualität der Informationen in ioBroker dar.

### PV-Automatik
Um Ihr Fahrzeug entsprechend einem Überschuss (z. B. durch Photovoltaik) zu laden, können Sie Zustände definieren, die den Überschuss und den Netzverbrauch darstellen. Diese Werte werden zur Berechnung der zum Laden verfügbaren Stromstärke verwendet. Mithilfe zusätzlicher Werte können Sie definieren

* ein Zustand zum Umschalten der Ladephasen 1p/3p oder über den X2-Anschluss des Keba Kecontact (mit Keba KeContact S10 oder einem anderen Schütz)
* ein Zustand für die aktuelle Leistung des Batteriespeichers, sodass die Photovoltaik-Automatik ihn zusätzlich zum Laden Ihres Fahrzeugs nutzt.
* eine Option zur Begrenzung der Speicherkapazität des Akkus, sodass dieser nur mit minimaler Leistung geladen werden kann
* Aktivieren Sie die Option X1, wenn Sie den X1-Eingang der Ladestation verwenden möchten, um zu steuern, ob mit voller Leistung oder per Photovoltaik-Automatik geladen werden soll.
* eine andere Mindeststromstärke als die standardmäßigen 6 A (nur erforderlich z. B. für Renault Zoe)
* ein Wert der Netzentnahmeleistung, der zum Starten des Ladevorgangs verwendet werden kann (das bedeutet, dass der Ladevorgang auch dann startet, wenn nicht genügend Überschuss vorhanden ist - empfohlen werden 0 W für 1-phasiges Laden, 500 W bis 2000 W für 3-phasiges Laden)
* eine Erhöhung der Stromstärke (empfohlen: 500 mA)
* ein Wert für den Netzverbrauch, der vorübergehend zur Aufrechterhaltung des Ladevorgangs verwendet werden kann (das bedeutet, dass der Ladevorgang später auch dann gestoppt wird, wenn nicht mehr genügend Überschuss vorhanden ist - der anfängliche Netzverbrauch wird addiert - empfohlene 500 W)
* Mindestdauer des Ladevorgangs (auch wenn der Überschuss nicht mehr ausreicht, dauert ein Ladevorgang mindestens diese Zeit - empfohlene Dauer: 300 Sekunden)
* Zeit, die für die Fortsetzung der Ladesitzung benötigt wird, wenn der Überschuss nicht mehr ausreicht (um die Zeit an bewölkten Tagen zu überbrücken)
* Laden Sie Ihr Fahrzeug immer sofort auf, sobald es angeschlossen ist und eine Autorisierung erforderlich ist (um einen Fehler zu vermeiden, der dazu führt, dass ohne sofortiges Laden kein weiteres Laden möglich ist).

### 1p/3p-Laden
Wenn Sie einen Installationsschütz zum Trennen der Phasen 2 und 3 Ihrer Ladestation besitzen und dieser Schalter zustandsabhängig angesteuert werden kann, kann dieser Adapter den Ladevorgang mit einer Phase starten und auf drei Phasen umschalten, sobald Ihre Ladekapazität ausreicht.
Geben Sie in diesem Fall bitte den Zustand Ihres Installationsschützes an und ob es sich um einen Öffner (NO) oder Schließer (NC) handelt. Alternativ können Sie den Ladevorgang auch dauerhaft auf 1- oder 3-phasig einstellen.

### Batteriespeicher
Wenn Sie einen Batteriespeicher besitzen, füllen Sie bitte die Optionen hier aus. Durch die Angabe der Zustände für Überschuss- und Netzstromverbrauch Ihres Batteriespeichers kann dieser Adapter steuern, ob der Batteriespeicher zum Laden Ihres Fahrzeugs verwendet werden soll oder nicht, abhängig von der in den Optionen festgelegten Strategie.

### Deutsche §14a EnWG Leistungsbegrenzung
Aufgrund der deutschen EnWG §14a besteht die Möglichkeit, die Ladestation auf maximal 6A fest oder dynamisch auf den Netzverbrauch von 3x6A (4.140 Watt) zu begrenzen.

### Leistungsbegrenzung
Sie können die maximale Leistung Ihrer Wallbox begrenzen, um den Stromverbrauch des Netzspeichers zu reduzieren. Dies ist beispielsweise beim Betrieb von Nachtspeicherheizungen wichtig.
Wenn Sie einen Wert eingeben, wird Ihre Wallbox kontinuierlich begrenzt, um die festgelegte Leistungsgrenze nicht zu überschreiten. Sie können bis zu drei Zustände von Energiezählern für die Begrenzung festlegen. Alle Werte werden addiert, um den aktuellen Verbrauch zu berechnen. Über ein zusätzliches Kontrollkästchen legen Sie fest, ob die Leistung der Wallbox berücksichtigt werden soll (in diesem Fall wird die Leistung der Wallbox von den Zustandswerten abgezogen).

Eine weitere Option ermöglicht es Ihnen, nicht die Leistung, sondern die Stromstärke zu begrenzen. Mit dieser Option wird die Stromstärke der Ladestation reduziert, um einen maximalen Wert pro Phase nicht zu überschreiten.
Daher müssen Sie die Stromstärkewerte jeder Phase Ihres Energiezählers angeben. Bitte stellen Sie sicher, dass die Phasen der Ladestation und des Energiezählers die gleiche Nummerierung haben.

### Dynamische Optionen
Darüber hinaus gibt es einige Zustände, die das Verhalten von Photovoltaikanlagen automatisch und dynamisch beeinflussen, z. B. durch ein eigenes Skript, das diese Werte entsprechend Ihren Bedürfnissen aktualisiert.

* kecontact.n.automatic.photovoltaics - Aktiviert die automatische Photovoltaik-Funktion (true) oder lädt das Fahrzeug mit maximaler Leistung, wenn auf false gesetzt.
* kecontact.n.automatic.calcPhases – definiert die aktuelle Anzahl der Phasen für die Ladeberechnung. Dies ist für die Keba Deutschland Edition erforderlich und kann für die erste Ladesitzung an allen Ladestationen verwendet werden.
* kecontact.n.automatic.1p3pSwitch - legt fest, ob – unabhängig vom Überschuss – die Ladung immer mit 1p oder immer mit 3p erfolgen soll.
* kecontact.n.automatic.addPower - definiert die zulässige Wattzahl für den Netzstromverbrauch zum Laden Ihres Fahrzeugs (entspricht den Optionen)
* kecontact.n.automatic.pauseWallbox - stoppt jeden Ladevorgang sofort, solange der Wert auf true gesetzt ist.
* kecontact.n.automatic.limitCurrent - begrenzt den Ladestrom auf die angegebene Stromstärke in mA (0 = keine Begrenzung)
* kecontact.n.automatic.batteryStorageStrategy - Strategie, ob und wie Ihr Batteriespeicher zum Laden Ihres Fahrzeugs genutzt werden sollte
* kecontact.n.automatic.batterySoCForCharging - Begrenzt die Nutzung der Batteriekapazität des Fahrzeugs durch Angabe eines Ladezustands (SoC), unterhalb dessen das Laden verboten ist.
* kecontact.n.automatic.stateVehicleSoC - Zustandsname zur Ermittlung des aktuellen SoC des Fahrzeugs (erforderlich für targetsoc und maxSoc)
* kecontact.n.automatic.targetSoC - Automatisches Laden mit maximaler Leistung deaktivieren, bis das Fahrzeug diesen Ladezustand erreicht
* kecontact.n.automatic.resetTargetSoC - auf „true“ setzen, wenn der Ziel-SoC nach Erreichen eines bestimmten Wertes gelöscht werden soll.
* kecontact.n.automatic.maxSoC – ein maximaler Ladezustand (SoC); das Fahrzeug wird nicht geladen, wenn dieser SoC erreicht ist.

Beispiel: Um Ihr Fahrzeug unabhängig vom Überschuss mit einer konstanten Stromstärke von 6A zu laden, stellen Sie Photovoltaik auf „false“ und Strombegrenzung auf 6000 ein.

## Rechtliches
Dieses Projekt steht in keiner direkten oder indirekten Verbindung zur Firma KEBA AG.

KeConnect ist eine eingetragene Marke der KEBA AG.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Sneak-L8) new options to charge vehicle up to a specified SoC
* (Sneak-L8) new option to stop charging at a certain SoC
* (Sneak-L8) raise adapter-dev version from 1.4 to 1.5
* (Sneak-L8) drop dependencies to chai, sinon and mocha

### 3.3.0 (2025-09-18)
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