---
title:       "Architektur"
lastChanged: "07.09.2026"
---

# Systemaufbau
## Architektur

ioBroker ist modular, d.h. aus vielen einzelnen Komponenten aufgebaut. Jedes Modul hat eine spezifische Aufgabe. Um den Überblick zu behalten, besitzt ioBroker deshalb einen zentralen Koordinator für alle seine Module. Dieser Koordinator ist der im Hintergrund arbeitende `js-controller`. Er ist zuständig für die zentrale Datenhaltung sowie Management und Kommunikation zwischen allen Modulen. Die Module selbst werden `Adapter` genannt.
Adapter werden vom Anwender nur bei Bedarf installiert. Die webbasierte Administrationsoberfläche `admin` ist selbst auch ein Adapter. Der Admin-Adapter oder kurz "Admin" ist die Managementoberfläche eines ioBroker-Systems. Der [Admin](/docs/admin/README.md) wird in der Regel mit der Adresse [http://localhost:8081](http://localhost:8081) aufgerufen.

Wenn ein neuer Adapter mit dem Admin installiert wird, werden zuerst die Adapterdateien aus dem Internet geladen und auf die Server-Festplatte geschrieben. Soll ein Adapter gestartet werden, wird zuerst eine `Instanz` des Adapters erzeugt. Jede Adapterinstanz kann individuell konfiguriert und unabhängig mit dem Admin gestoppt und gestartet werden. Deshalb läuft jede Instanz in einem eigenen Prozess, der im Hintergrund mit dem ioBroker js-controller kommuniziert.

In einem `Multihost`-System mit mehreren ioBroker-Servern können Instanzen von Adaptern auch auf verschiedenen Servern verteilt werden. Dadurch kann die Last verteilt oder direkt vor Ort zusätzliche Hardware angebunden werden (z.B. IO-Ports, USB).

Die Kommunikation zwischen Adaptern, js-controller, Datenbanken und Webfrontends erfolgt über mehrere TCP/IP-Verbindungen. Der Datenaustausch erfolgt je nach gewählter Einstellung entweder im Klartext oder verschlüsselt.

ioBroker und Adapter sind vorwiegend in der Programmiersprache JavaScript geschrieben. Zur Ausführung von JavaScript benötigt man eine entsprechende Laufzeitumgebung. ioBroker setzt deshalb auf [Node.js](https://github.com/nodesource/distributions#installation-instructions). Diese Laufzeitumgebung gibt es für verschiedenste Softwareplattformen wie Linux, Windows und macOS.

Zur Installation von ioBroker und den Adaptern wird der Node Package Manager, kurz `npm`, genutzt. Dieser kann Module samt ihrer Abhängigkeiten suchen, installieren, entfernen, kompilieren und aktualisieren.
Ohne Node.js funktioniert ioBroker nicht. Eine manuelle Installation von Node.js ist nicht nötig, dies erledigt direkt der ioBroker-Installer.

Wie bei vielen Open-Source-Technologien üblich, entwickelt sich Node.js schnell weiter. Kleinere Updates, die die Stabilität und Sicherheit steigern oder gar neue Funktionen hinzufügen, erscheinen regelmäßig.

Node.js-Versionen mit **gerader** Hauptversionsnummer werden nach einigen Monaten zu LTS-Versionen (Long Term Support) und danach mehrere Jahre gepflegt. Jedes Jahr kommt eine neue hinzu, und im selben Zug erreicht eine ältere ihr Lebensende (EOL, End of Life) - ab dann gibt es für sie keine Sicherheits-Updates mehr. Ungerade Hauptversionen sind Vorabversionen und für ioBroker nicht geeignet.

Für ioBroker heißt das: Es gilt immer eine bestimmte empfohlene LTS-Version, und eine Version nach ihrem Lebensende wird von den Adaptern und später auch vom js-controller nicht mehr unterstützt. Welche Version derzeit empfohlen wird und wie der Wechsel abläuft, steht unter [Node.js & npm aktualisieren](/docs/install/updatenode.md).

## Adapter und Instanzen

Adapter sind spezielle Module, die verschiedene Geräte, Dienste oder Protokolle in das ioBroker-System integrieren. Sie fungieren als Schnittstellen zwischen ioBroker und den externen Systemen, die Sie steuern oder von denen sie Daten sammeln. Adapter können in verschiedenen Kategorien eingeteilt werden, wie z.B. Geräteadapter, Protokolladapter, Serviceadapter, Datenbankadapter, Visualisierungsadapter, Skriptadapter und Spezialadapter.

Jede Adapterinstanz kann individuell konfiguriert und unabhängig mit dem Admin gestoppt und gestartet werden. Dies ermöglicht eine flexible und skalierbare Integration von verschiedenen Geräten und Diensten in das ioBroker-System. Adapterinstanzen laufen in eigenen Prozessen und kommunizieren im Hintergrund mit dem js-controller.

## Multihost-Systeme

In einem Multihost-System können mehrere ioBroker-Server miteinander verbunden werden, um die Last zu verteilen oder zusätzliche Hardware vor Ort anzubinden. Dies ermöglicht eine bessere Skalierbarkeit und Flexibilität des ioBroker-Systems. Adapterinstanzen können auf verschiedenen Servern verteilt werden, um die Systemressourcen optimal zu nutzen.

Die Kommunikation zwischen den Servern erfolgt über TCP/IP-Verbindungen, und der Datenaustausch kann je nach Einstellung im Klartext oder verschlüsselt erfolgen. Multihost-Systeme bieten eine robuste und skalierbare Lösung für große Installationen mit vielen Geräten und Diensten.

## Sicherheit und Updates

Sicherheit und regelmäßige Updates sind wichtige Aspekte bei der Nutzung von ioBroker. Node.js, die zugrunde liegende Laufzeitumgebung, entwickelt sich schnell weiter und erhält regelmäßig Updates, die die Stabilität und Sicherheit verbessern. Es ist wichtig, die LTS-Versionen von Node.js zu verwenden, da diese über einen längeren Zeitraum gepflegt werden und Sicherheitsupdates erhalten.

ioBroker und seine Adapter nutzen viele Module und Erweiterungen aus der JavaScript Open-Source-Community. Es ist wichtig, diese Module regelmäßig zu aktualisieren, um von den neuesten Sicherheits- und Stabilitätsverbesserungen zu profitieren. Der Node Package Manager (npm) erleichtert die Verwaltung und Aktualisierung dieser Module.

## Zusammenfassung

ioBroker ist ein modulares und skalierbares System zur Integration und Steuerung von verschiedenen Geräten, Diensten und Protokollen. Der zentrale Koordinator, der js-controller, verwaltet die Adapter und sorgt für die Kommunikation zwischen den verschiedenen Komponenten des Systems. Adapter ermöglichen die flexible Integration von Geräten und Diensten, und Multihost-Systeme bieten zusätzliche Skalierbarkeit und Flexibilität. Sicherheit und regelmäßige Updates sind wichtige Aspekte, um die Stabilität und Zuverlässigkeit des ioBroker-Systems zu gewährleisten.
