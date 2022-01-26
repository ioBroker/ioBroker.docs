---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: SHkZCRsXMxcXlgYzX58sr7LQTEU7SqrepXu1jcU5gT8=
---
![Logo](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/kecontact-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/kecontact-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)
![NPM](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

#ioBroker.kecontact
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# IoBroker Adapter für KEBA KeContact P20 oder P30 und BMW i Wallbox
Steuern Sie Ihre Ladestation und nutzen Sie die automatische Regelung z.B. Ihr Fahrzeug mit Photovoltaik-Überschuss mit seinem UDP-Protokoll aufzuladen.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Instanzkonfigurationsdialog öffnen
2. Geben Sie die IP-Adresse Ihrer KEBA KeContact Wallbox ein
3. Passen Sie das Aktualisierungsintervall bei Bedarf an
4. Speichern Sie die Konfiguration
5. Starten Sie den Adapter

## Aufbau
### KeContact-IP-Adresse
Dies ist die IP-Adresse Ihrer KEBA KeContact oder BMW i Wallbox.

### Firmware-Check
Der Adapter prüft einmal täglich, ob eine neuere Firmware auf der KEBA-Website verfügbar ist. Diese Informationen werden als Warnung ausgedruckt.

### Passivmodus
Aktivieren Sie diese Option, wenn Sie Ihre Wallbox selbst steuern möchten und nicht möchten, dass dieser Adapter einige Automatiken durchführt. In diesem Fall werden alle nachfolgenden Optionen bezüglich PV-Automatik und Leistungsbegrenzung ignoriert.

###Nachträgliche Wallbox
Aktivieren Sie diese Option, wenn es sich um eine nachfolgende Wallbox in Ihrer Umgebung handelt. Derzeit kann nur eine Wallbox aktiv verwaltet werden. Alle anderen (separaten Instanzen) müssen diese Option aktivieren, da nur eine Instanz Broadcast-Nachrichten empfangen kann. Diese Wallbox/Instanz wird im passiven Modus ausgeführt.

### Ladesitzungen laden
Sie können diese Option aktivieren, um regelmäßig die neuesten Ladesitzungen (30) von Ihrer Wallbox herunterzuladen.
ACHTUNG für Benutzer ab Version v1.1.1: Sie müssen diese Option aktivieren, um weiterhin Ladevorgänge zu erhalten!

### Aktualisierungsintervall
Dies ist das Intervall in Sekunden, wie oft die Wallbox nach neuen Ladewerten abgefragt werden soll.

Der Standardwert beträgt 10 Minuten, was eine gute Balance zwischen der Auslastung des KeConnect und aktuellen Informationen in ioBroker darstellt.

### PV-Automatik
Um Ihr Fahrzeug entsprechend auf Überschuss aufzuladen (z.B. durch Photovoltaik) können Sie auch Zustände definieren, die Überschuss und Netzbezug darstellen. Diese Werte werden verwendet, um die Stromstärke zu berechnen, die zum Laden verwendet werden kann. Durch zusätzliche Werte können Sie definieren

* Schalten Sie die X1-Option um, wenn Sie den X1-Eingang von der Ladestation verwenden möchten, um zu steuern, ob mit voller Leistung oder mit Photovoltaik-Automatik geladen werden soll
* eine andere Mindeststromstärke als die Standard 6 A (nur erforderlich für z.B. Renault Zoe)
* ein Wert der Leistung, die verwendet werden kann, um den Ladevorgang zu starten (das bedeutet, dass der Ladevorgang beginnt, auch wenn nicht genügend Überschuss vorhanden ist - empfohlen 0 W für 1-Phasen-Laden, 500 W bis 2000 W für 3-Phasen-Laden)
* ein Inkrement für die Stromstärke (empfohlen 500 mA)
* ein Wert, der vorübergehend verwendet werden kann, um den Ladevorgang aufrechtzuerhalten (d. h. der Ladevorgang wird später beendet, auch wenn nicht mehr genügend Überschuss vorhanden ist - Startwert wird hinzugefügt - empfohlene 500 W)
* Mindestdauer des Ladevorgangs (auch wenn der Überschuss nicht mehr ausreicht, dauert ein Ladevorgang mindestens diese Zeit - empfohlen 300 Sek.)
* Zeit zum Fortsetzen des Ladevorgangs jedes Mal, wenn der Überschuss nicht mehr ausreicht (um die Zeit an bewölkten Tagen zu überbrücken)

### Leistungsbegrenzung
Sie können auch max. Strom Ihrer Wallbox, um die Hauptstromversorgung zu begrenzen. Z.B. Beim Betrieb von Nachtspeicherheizungen müssen Sie eventuell eine maximale Leistungsbegrenzung beachten.
Wenn Sie einen Wert eingeben, wird Ihre Wallbox kontinuierlich eingeschränkt, um Ihr Leistungslimit nicht zu überschreiten.
Zur Begrenzung können bis zu drei Zustände von Energiezählern angegeben werden. Alle Werte werden addiert, um den aktuellen Verbrauch zu berechnen.
Ein zusätzliches Kontrollkästchen wird verwendet, um anzugeben, ob die Wallbox-Leistung enthalten ist (in diesem Fall wird die Wallbox-Leistung von den Statuswerten abgezogen).

### Dynamische Optionen
Darüber hinaus gibt es einige Zustände, die das Verhalten der Photovoltaik-Automatik on the fly beeinflussen, z.B. durch ein eigenes Skript, das diese Werte nach Ihren Bedürfnissen aktualisiert)

* kecontact.0.automatic.photovoltaics - Aktiviert die Photovoltaik automatisch (true) oder lädt das Fahrzeug mit maximaler Leistung, wenn auf false gesetzt
* kecontact.0.automatic.calcPhases - definiert die aktuelle Anzahl der Phasen, die für die Ladeberechnung verwendet werden. Dies wird für die Keba Deutschland Edition benötigt und kann für den ersten Ladevorgang für alle Ladestationen verwendet werden
* kecontact.0.automatic.addPower - definiert eine zulässige Wattzahl zum Aufladen Ihres Fahrzeugs (wie in den Optionen)
* kecontact.0.automatic.pauseWallbox - stoppt jede Ladesitzung sofort, solange sie auf true gesetzt ist
* kecontact.0.automatic.limitCurrent - begrenzt Ihre Ladung auf die angegebene Stromstärke in mA (0 = keine Begrenzung)

Beispiel: Um Ihr Fahrzeug unabhängig vom Überschuss mit einer konstanten Stromstärke von 6A zu laden, stellen Sie Photovoltaik auf false und limitCurrent auf 6000.

##Rechtliches
Dieses Projekt ist weder direkt noch indirekt mit der Firma KEBA AG verbunden.

KeConnect ist eine eingetragene Marke der KEBA AG.

## Changelog

### 1.3.0 (2021-08-16)
* (Sneak-L8) new adapter base generated by adapter creator
* (Sneak-L8) support multiple wallboxes

### 1.2.3 (2021-08-14)
* (Sneak-L8) fix wrong P20/P30 detection

### 1.2.2 (2021-07-28)
* (Sneak-L8) new: limit max. charging current dynamically
* (Sneak-L8) support BMW charging station (Keba OEM, Sentry IOBROKER-KECONTACT-3)
* (Sneak-L8) support P20 charging station (Sentry IOBROKER-KECONTACT-B)
* (Sneak-L8) optimized power calculation for Deutschland edition

### 1.2.1 (2021-07-20)
* (Sneak-L8) support X1 contact of charging station to switch photovoltaics automatic
* (Sneak-L8) prevent a crash case (Sentry IOBROKER-KECONTACT-2)

### 1.2.0 (2021-06-07)
* (Sneak-L8) support for compact mode
* (Sneak-L8) using sentry.io to track errors
* (Sneak-L8) support for KeContact P30 Deutschland edition

### 1.1.3 (2021-04-26)
* (Sneak-L8) new time option to continue charging session with regard
* (Sneak-L8) optimized calculation of surplus (prevent alternating amperage)

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

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

   Copyright 2021 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.