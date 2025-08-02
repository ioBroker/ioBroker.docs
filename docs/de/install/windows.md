---
title: "Windows"
lastChanged: "11.06.2025"
---

# Voraussetzungen prüfen

Vor der Installation prüfe bitte, ob das System alle notwendigen [Installationsvoraussetzungen](./requirements.md) erfüllt.

Probleme zum Windows Installer können hier im Forum diskutiert werden: https://forum.iobroker.net/topic/63610/test-iobroker-unter-windows-installieren-2023-edition

# Der ioBroker Windows Installer

Mit dem ioBroker Windows Installer kann ioBroker mit wenigen Klicks auf Windows PCs installiert werden. Der Installer bringt selbst keine Softwarepakete mit. Benötigte Software wird automatisch während der Installation heruntergeladen. Eine Internetverbindung ist also zwingend erforderlich.

Ist ioBroker erst einmal installiert, kann der Installer für folgende Aktionen verwendet werden:

1. Aktualisieren von Node.js auf die aktuell empfohlene Version
2. Ausführen des ioBroker Fixers
3. Löschen oder Anlegen von Regeln für die Windows Firewall, damit ioBroker auch von außen erreicht werden kann
4. Festlegen, ob ioBroker beim Start von Windows automatisch gestartet wird.

Dafür installiert sich der Installer selbst und ist im Windows-Startmenü unter "ioBroker automation platform" - "ioBroker Setup" zu finden.

## ioBroker unter Windows - ist das überhaupt sinnvoll?

ioBroker läuft auf Windows Systemen in der Regel genauso gut wie auf Linux Systemen. Allerdings haben Windows Systeme für den Einsatz als 24/7 Systeme u.U. systembedingt Nachteile, die jeder für sich selbst abwägen muss.
Besonders gut eignet sich Windows dafür, ioBroker einfach mal schnell auf einem vorhandenen Windows PC auszuprobieren.

## ioBroker installieren

Zunächst muss der Installer heruntergeladen werden. Die aktuelle Version liegt immer auf der offiziellen Download Seite: https://www.iobroker.net/#de/download

Anschließend wird der Installer per Doppelklick gestartet. Zunächst wählen wir die zu verwendende Sprache aus:

![Sprachauswahl](./media/windows/InstallWin_language.png "Sprachauswahl")

Anschließend erscheint die Begrüßungsseite:

![Begrüßungsseite](./media/windows/InstallWin_welcome.png "Begrüßungsseite")

Nach einem Klick auf "Weiter" erscheint die Lizenzseite:

![Lizenzseite](./media/windows/InstallWin_license.png "Lizenzseite")

Die Lizenz müssen wir akzeptieren und anschließend klicken wir wieder auf "Weiter". Auf der folgenden Seite können wir nun den Installationsordner für unsere ioBroker-Installation auswählen:

![Installationsordner](./media/windows/InstallWin_folder.png "Installationsordner")

In der Regel ist es eine gute Idee, einfach den Vorgabewert "C:\ioBroker" zu verwenden. Nach einem Klick auf "Weiter" werden einige Überprüfungen durchgeführt:

![Überprüfungen](./media/windows/InstallWin_check.png "Überprüfungen")

Dies kann einen Moment dauern. Im Anschluss erscheint automatisch das Ergebnis der Überprüfung:

![Überprüfungsergebnis](./media/windows/InstallWin_checkresult.png "Überprüfungsergebnis")

In diesem Beispiel ist alles in Ordnung und wir können fortfahren. Sollten jetzt nicht alle erforderlichen Voraussetzungen erfüllt sein, dann muss zunächst geklärt werden, was zu tun ist. Meist sind Ports nicht verfügbar, die für die Installation und den Betrieb von ioBroker benötigt werden. Wer in dieser Situation ist und nicht weiß, was zu tun ist, findet Hilfe im ioBroker Forum unter https://forum.iobroker.net/
Nach einem Klick auf "Weiter" können wir einige Details auswählen:

![Optionen](./media/windows/InstallWin_options.png "Optionen")

Bei der ioBroker Erstinstallation sind die ersten drei Optionen fest vorgegeben:

1. Node.js, die Laufzeitumgebung für ioBroker, wird in der empfohlenen Version heruntergeladen und installiert
2. ioBroker selbst wird installiert
3. Der ioBroker Fixer kann nicht ausgewählt werden
   Die nächsten zwei Optionen können verändert werden, in der Regel ist es aber empfehlenswert, die Standardeinstellungen beizubehalten.
   Und schließlich bietet der Installer noch die Möglichkeit, die Konfiguration einer vorhandenen Installation zu übernehmen. Dafür ist der komplette Ordner "iobroker-data" erforderlich, der bei einer vorhandenen ioBroker Installation im ioBroker Ordner zu finden ist. Dieser kann von einer ioBroker Installation unter Windows oder Linux stammen. Die Daten werden während der Installation aus diesem Ordner übernommen, der Inhalt dieses Ordners wird nicht verändert.
   Nach Klick auf "Weiter" sehen wir jetzt die Zusammenfassung der geplanten Aktionen:

   ![Optionen](./media/windows/InstallWin_summary.png "Optionen")

   Mit einem Klick auf "Installieren" wird jetzt die eigentliche Installation gestartet:

   ![Optionen](./media/windows/InstallWin_downloadnode.png "Optionen")

   ![Optionen](./media/windows/InstallWin_installnode.png "Optionen")

   ![Optionen](./media/windows/InstallWin_installiobroker.png "Optionen")

   ![Optionen](./media/windows/InstallWin_finish.png "Optionen")

Mit einem Klick auf "Fertigstellen" öffnet sich ein Webbrowser und ioBroker leitet dich durch die ersten Schritte der Einrichtung.

## Update

!> Normalerweise verlaufen Updates völlig problemlos und sicher. Dennoch sollte vor der Durchführung vorsichtshalber eine Datensicherung durchgeführt werden.

- Mit Hilfe des Windows Installers kann automatisch die installierte Node.js Version auf den empfohlenen Stand gebracht werden.
  Dafür einfach den Installer aus dem Windows Startmenü ("ioBroker Setup") starten und den Anweisungen folgen. Ein verfügbares Update für Node.js wird automatisch erkannt und im weiteren Verlauf angeboten.
- Seit Windows Installer Version 3.1.0 kann mit dem Windows Installer auch ein Update des JS-Controllers durchgeführt werden.
  Dafür einfach den Installer aus dem Windows Startmenü ("ioBroker Setup") starten und den Anweisungen folgen. Ein verfügbares Update für JS-Controller wird automatisch erkannt und im weiteren Verlauf angeboten.
- Außerdem ist es möglich, JS-Controller manuell zu aktualisieren. Es wird aber ausdrücklich empfohlen, Aktualisierungen mit dem Windows Installer durchzuführen.

  Will man die Aktualisierung dennoch manuell vornehmen, geht das mit den folgenden Kommandos:

  `iob stop`

  `iob update`

  `iob upgrade self`

  `iob start`

## Expertenmodus

Der Installer bietet auch einen Expertenmodus, der für den normalen ioBroker Anwender normalerweise nicht erforderlich ist. Er kann auf der ersten Seite des Installers durch einen Doppelklick auf das ioBroker Logo und anschließend durch setzen des Häkchens "Expertenmodus" aktiviert werden.

Der Expertenmodus bietet folgende zusätzlichen Funktionen:

- Installation und Pflege mehrerer ioBroker Server parallel auf einem PC
- Installieren von JS-Controller Alpha-Versionen

![Expertenmodus](./media/windows/InstallWin_expertmode.png "Expertenmodus")

## Fehlersuche

**Problem:**
Die Installation kann nicht durchgeführt werden, da Port 9001 von einem Prozess mit dem Namen "System" belegt ist.

**Mögliche Lösung:**
Der Intel® Graphics Command Center ist bekannt dafür, Port 9001 zu blockieren.
Überprüfe, ob es einen Windows Service mit dem Namen "Graphics Command Center" o.ä. auf deinem PC gibt. Wenn ja, beende und deaktiviere diesen Dienst.
Anschließend sollte die Installation von ioBroker möglich sein.

**Problem:**
Git wurde währen der ioBroker Installation nicht installiert. Im Logfile gibt es eine entsprechende Fehlermeldung:
`Fehler beim Durchsuchen der Quelle: winget
Unerwarteter Fehler beim Ausführen des Befehls:
0x8a15000f : Data required by the source is missing`  

**Mögliche Lösung:**
Im ioBroker Command Fenster (aus dem Startmenü) den folgenden Befehl eingeben, anschließend den Installer neu starten und "Reparieren" auswählen.
`powershell -command " Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.Winget.Source_8wekyb3d8bbwe"`
