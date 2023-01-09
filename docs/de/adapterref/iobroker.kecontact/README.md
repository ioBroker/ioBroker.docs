---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: Ji1Mip+NQ5S+4Fx9eR8lyUwIKoSBLqSOCu/IZTMptgQ=
---
![Logo](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/kecontact-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/kecontact-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)
![NPM](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# IoBroker Adapter für KEBA KeContact P20 oder P30 und BMW i Wallbox
Steuern Sie Ihre Ladestation und nutzen Sie die automatische Regelung z.B. zum Laden Ihres Fahrzeugs durch Photovoltaik-Überschuss und Batteriespeicher mit seinem UDP-Protokoll.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse Ihrer KEBA KeContact Wallbox ein
3. Passen Sie bei Bedarf das Aktualisierungsintervall an
4. Speichern Sie die Konfiguration
5. Starten Sie den Adapter

## Aufbau
### IP-Adresse von KeContact
Dies ist die IP-Adresse Ihrer KEBA KeContact oder BMW i Wallbox.

### Firmware-Check
Einmal am Tag prüft der Adapter, ob eine neuere Firmware auf der KEBA-Website verfügbar ist. Diese Informationen werden im Protokoll als Warnung ausgedruckt.

### Passivmodus
Aktivieren Sie diese Option, wenn Sie Ihre Wallbox selbst steuern möchten und nicht möchten, dass dieser Adapter einige Automatiken durchführt. In diesem Fall werden alle nachfolgenden Optionen bezüglich PV-Automatik und Leistungsbegrenzung ignoriert.

### Nachfolgende Wallbox
Aktivieren Sie diese Option, wenn es sich um eine nachfolgende Wallbox in Ihrer Umgebung handelt. Aktuell kann nur eine Wallbox aktiv verwaltet werden. Alle anderen (separate Instanzen) müssen diese Option aktivieren, da nur eine Instanz Broadcast-Nachrichten empfangen kann. Diese Wallbox/Instanz wird im passiven Modus ausgeführt.

### Ladesitzungen laden
Sie können diese Option aktivieren, um regelmäßig die neuesten Ladesitzungen (30) von Ihrer Wallbox herunterzuladen.
ACHTUNG für Benutzer ab Version v1.1.1 und niedriger: Sie müssen diese Option aktivieren, um weiterhin Ladesitzungen zu erhalten!

### Aktualisierungsintervall
Dies ist das Intervall in Sekunden, wie oft die Wallbox nach neuen Ladewerten abgefragt werden soll.

Der Standardwert beträgt 10 Minuten, was eine gute Balance zwischen der Belastung für KeConnect und aktuellen Informationen in ioBroker darstellt.

### PV-Automatik
Um Ihr Fahrzeug entsprechend einem Überschuss (z. B. durch Photovoltaik) zu laden, können Sie auch Zustände definieren, die Überschuss und Bezug auf Hauptstrom darstellen. Diese Werte werden verwendet, um die Stromstärke zu berechnen, die zum Laden verwendet werden kann. Durch zusätzliche Werte können Sie definieren

* ein Zustand für die aktuelle Leistung des Batteriespeichers, damit die Photovoltaik-Automatik diese zusätzlich zum Laden Ihres Fahrzeugs verwendet
* Schalten Sie die X1-Option um, wenn Sie den X1-Eingang von der Ladestation verwenden möchten, um zu steuern, ob mit voller Leistung oder durch Photovoltaik-Automatik geladen werden soll
* eine andere Mindeststromstärke als die voreingestellten 6 A (wird nur für z. B. Renault Zoe benötigt)
* ein Wert für die Leistung, die zum Starten des Ladevorgangs verwendet werden kann (d. h. der Ladevorgang beginnt, auch wenn nicht genügend Überschuss verfügbar ist - empfohlen 0 W für 1-Phasen-Ladevorgang, 500 W bis 2000 W für 3-Phasen-Ladevorgang)
* ein Inkrement für die Stromstärke (empfohlen 500 mA)
* ein Bezugswert, der vorübergehend verwendet werden kann, um den Ladevorgang aufrechtzuerhalten (das bedeutet, dass der Ladevorgang später stoppt, auch wenn nicht mehr genügend Überschuss verfügbar ist - Startbezug wird hinzugefügt - vorgeschlagen 500 W)
* Mindestdauer des Ladevorgangs (auch wenn der Überschuss nicht mehr ausreicht, dauert ein Ladevorgang mindestens diese Zeit – empfohlen 300 Sek.)
* Zeit zur Fortsetzung des Ladevorgangs jedes Mal, wenn der Überschuss nicht mehr ausreicht (um die Zeit an bewölkten Tagen zu überbrücken)

### 1p/3p Aufladung
Wenn Sie ein Installationsschütz zum (Trennen) von Phase 2 und 3 Ihrer Ladestation haben und dieser Schalter durch einen Zustand ausgelöst werden kann, dann ist dieser Adapter in der Lage, den Ladevorgang mit einer Phase zu starten und auf 3-Phasen-Ladevorgang umzuschalten, wenn Ihr Überschuss ausreicht dafür.
Tragen Sie in diesem Fall bitte den Zustand Ihres Installationsschützes ein und ob es sich um einen NO (normally open) oder NC (normally closed) handelt.

### Leistungsbegrenzung
Sie können auch max. Leistung Ihrer Wallbox, um die Hauptleistung zu begrenzen. Z.B. Beim Betrieb von Nachtspeicherheizungen müssen Sie ggf. eine maximale Leistungsbegrenzung beachten.
Wenn Sie einen Wert eingeben, wird Ihre Wallbox kontinuierlich begrenzt, um Ihr Leistungslimit nicht zu überschreiten.
Zur Begrenzung können bis zu drei Zustände von Energiezählern vorgegeben werden. Alle Werte werden zur Berechnung des Stromverbrauchs addiert.
Ein zusätzliches Kontrollkästchen wird verwendet, um anzugeben, ob die Wallbox-Leistung enthalten ist (in diesem Fall wird die Wallbox-Leistung von den Zustandswerten abgezogen).

### Dynamische Optionen
Zusätzlich gibt es einige Zustände, um das Verhalten der Photovoltaik automatisch im laufenden Betrieb zu beeinflussen, z. durch ein eigenes Skript, das diese Werte gemäß Ihren Anforderungen aktualisiert)

* kecontact.0.automatic.photovoltaics - Aktiviert automatisch die Photovoltaik (true) oder lädt das Fahrzeug mit maximaler Leistung, wenn es auf false gesetzt ist
* kecontact.0.automatic.calcPhases - definiert die aktuelle Anzahl der Phasen, die für die Ladeberechnung verwendet werden sollen. Dieser wird für die Keba Deutschland Edition benötigt und kann für die Erstladung für alle Ladestationen verwendet werden
* kecontact.0.automatic.addPower - definiert eine Wattmenge, die zum Aufladen Ihres Fahrzeugs zulässig ist (wie in den Optionen)
* kecontact.0.automatic.pauseWallbox - stoppt jeden Ladevorgang sofort, solange auf true gesetzt
* kecontact.0.automatic.limitCurrent - begrenzt Ihren Ladevorgang auf die angegebene Stromstärke in mA (0 = keine Begrenzung)

Beispiel: Um Ihr Fahrzeug unabhängig vom Überschuss mit einer konstanten Stromstärke von 6A zu laden, stellen Sie photovoltaics auf false und limitCurrent auf 6000.

## Rechtlich
Dieses Projekt ist weder direkt noch indirekt mit der Firma KEBA AG verbunden.

KeConnect ist eine eingetragene Marke der KEBA AG.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Sneak-L8) support for 1p/3p-charging (start charging with 1 phase and switch to 3 phases when enough surplus available)
* (Sneak-L8) minimum amperage allowed to 5A because some vehicles and KeContact (undocumented) allow this value
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