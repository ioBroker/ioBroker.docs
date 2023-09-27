---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-Tabelle
hash: izpwJ24aR0P/H6C6sJWqfSW0f8rciOnE7oBxl2EZH5Y=
---
![Logo](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![Anzahl der Installationen](https://iobroker.live/badges/google-spreadsheet-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![NPM](https://nodei.co/npm/iobroker.google-spreadsheet.png?downloads=true)

# IoBroker.google-spreadsheet
**Tests:** ![Test und Freigabe](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/workflows/Test%20and%20Release/badge.svg)

## Google-Spreadsheet-Adapter für ioBroker
Dieser Adapter kann zur automatischen Interaktion mit Google-Tabellen verwendet werden.

## Merkmale
* Daten an die Tabelle anhängen
* Zeilen aus einer Tabelle löschen
* Blätter hinzufügen
* Blätter löschen
* Duplikatblätter

## Verwendung
### Aufstellen
#### API-Zugriff aktivieren
1. Besuchen Sie die [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com).

2. Erstellen oder wählen Sie ein vorhandenes Projekt aus, das Sie mit der API verwenden möchten.

3. Aktivieren Sie die Google Spreadsheet API für Ihr Projekt.

#### Erstellen Sie ein Dienstkonto
Erstellen Sie für das im vorherigen Schritt ausgewählte Projekt ein neues Dienstkonto in Google Cloud IAM, indem Sie die folgenden Schritte ausführen:

1. Navigieren Sie zur Seite „IAM & Admin“ in der [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).

2. Klicken Sie auf „Dienstkonten“ und dann auf „Dienstkonto erstellen“.

3. Geben Sie einen Namen für das Dienstkonto ein und wählen Sie die Rolle „Projekt“ > „Editor“ aus.

4. Klicken Sie auf „Weiter“, um mit dem nächsten Schritt fortzufahren.

5. Klicken Sie auf der Registerkarte „Schlüssel“ auf „Schlüssel erstellen“ und wählen Sie als Format „JSON“. Klicken Sie dann auf „Weiter“.

6. Ihr privater Schlüssel wird generiert und automatisch heruntergeladen. Bewahren Sie diese Datei sicher auf, da Sie sie später benötigen werden.

#### Gewähren Sie Zugriff auf die Tabelle
Öffnen Sie die Tabelle, mit der Sie interagieren möchten, und teilen Sie sie mit der E-Mail-Adresse Ihres neu erstellten Dienstkontos:

1. Öffnen Sie die gewünschte Tabelle in Google Sheets.

2. Klicken Sie oben rechts auf „Teilen“.

3. Geben Sie im Feld „Personen hinzufügen“ die E-Mail-Adresse des Dienstkontos ein und erteilen Sie ihm die erforderlichen Berechtigungen (z. B. „Bearbeiten“ oder „Anzeigen“).

4. Klicken Sie auf „Senden“, um den Freigabevorgang abzuschließen.

#### Konfigurieren Sie die Adapterinstanz
Fügen Sie der Konfiguration Ihrer Adapterinstanz in ioBroker die folgenden Informationen hinzu:

- **Tabellen-ID** – Sie finden die ID in der URL Ihrer Tabelle.
- **Dienstkonto** – Die E-Mail-Adresse des von Ihnen erstellten Dienstkontos.
- **Privater Schlüssel** – Öffnen Sie die heruntergeladene JSON-Datei und suchen Sie den privaten Schlüssel in der Datei. Kopieren Sie nur den Teil, der mit „-----BEGIN PRIVATE KEY-----“ beginnt.

#### Suchen Sie die Tabellen-ID in der URL
Gehen Sie folgendermaßen vor, um die „Spreadsheet-ID“ in der URL Ihres Google Sheets-Dokuments zu finden:

1. Wenn Sie Ihr Google Sheets-Dokument in einem Webbrowser öffnen, sieht die URL in der Adressleiste etwa so aus:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. Die „SPREADSHEET_ID“ ist die lange Zeichenfolge aus Zeichen und Zahlen zwischen den Teilen „/d/“ und „/edit“ der URL.

### Blockig
Nutzen Sie die verfügbaren Blöcke, um automatisch mit Ihrer Tabelle zu interagieren.

![Blockhaft](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

## Fehlerbehebung
### Fehler beim Senden von Daten an Google Spreadsheet:Error: error:0909006C:PEM routines:get_name:no start line
Stellen Sie beim Kopieren des privaten Schlüssels in die Konfiguration sicher, dass keine \n vorhanden sind. Wenn der Schlüssel \n enthält, ersetzen Sie ihn bitte durch normale Zeilenumbrüche

### Fehler beim Senden von Daten an Google Spreadsheet:Fehler: Der Anrufer hat keine Berechtigung
Stellen Sie sicher, dass das Dienstkonto über ausreichende Berechtigungen zum Schreiben in die Tabelle verfügt. Weitere Informationen finden Sie oben im Abschnitt „Zugriff auf die Tabelle gewähren“.

## Changelog
### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup

### 0.0.6

* (Thomas Pohl) Parameter validation

### 0.0.5

* (Thomas Pohl) Position for "duplicate sheet"

### 0.0.4

* (Thomas Pohl) Added "duplicate Sheet"

### 0.0.3

* (Thomas Pohl) Added "add Sheet"
* (Thomas Pohl) Added "remove Sheet"

### 0.0.2

* (Thomas Pohl) Added "delete rows"

### 0.0.1

* (Thomas Pohl) initial release

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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

   Copyright 2023 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.