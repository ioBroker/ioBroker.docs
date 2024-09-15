---
title: Admin und Editieren
lastChanged: 15.09.2024
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/cloud/editor.md
---
# Administratoren und Redakteure
Mit der `ioBroker.pro`-Cloud erhalten Sie mehr Funktionen im Vergleich zur kostenlosen `ioBroker.net`-Cloud.

Zu den zusätzlichen Funktionen gehören:

- Zugriff auf die `Admin`-Oberfläche
- Möglichkeit, Vis-2- und Vis-Projekte zu bearbeiten, nicht nur anzuzeigen
- Lovelace-Zugang
- Mehr Ressourcen und weniger Benutzer, was zu einer schnelleren und zuverlässigeren Leistung führt

## Admin
Um den Admin-Zugriff zu ermöglichen, müssen Sie diesen in den Cloud-Einstellungen auf der Registerkarte „Erweiterte Einstellungen“ aktivieren.

![Admin zulassen](../../en/cloud/media/cloud_admin.png)

Für die ausgewählte Admin-Instanz darf die HTTPS-Option nicht aktiviert sein und sie darf nicht kennwortgeschützt sein.
Dies ist erforderlich, damit die Cloud auf die Admin-Oberfläche zugreifen kann.

Wenn Sie Ihre Admin-Oberfläche schützen müssen, können Sie eine separate Instanz für die Cloud ohne Kennwortschutz und ohne HTTPS erstellen und diese Instanz an einen anderen Port an den lokalen Host binden.

In dieser Konstellation ist die Admin-Oberfläche nur vom lokalen Rechner (nicht Netz) aus erreichbar, die Cloud hat aber weiterhin Zugriff darauf.

Wichtig: Wählen Sie einen anderen Port als 8081, da 8081 von Ihrer Haupt-Admin-Instanz verwendet wird.

![Lokaler Host](../../en/cloud/media/admin_localhost.png)

Stellen Sie anschließend sicher, dass Sie in den Cloud-Einstellungen die neu erstellte Instanz auswählen.

## Vis und vis-2
Zum Aktivieren der Vis- und Vis-2-Bearbeitung ist keine spezielle Konfiguration erforderlich. Öffnen Sie einfach das Vis- oder Vis-2-Projekt im Bearbeitungsmodus.

## Liebeskette
Die Lovelace-Cloud läuft auf Port 4463.
Stellen Sie sicher, dass Ihre Firewall-Einstellungen Ihrem Mobiltelefon oder Tablet den Zugriff auf die Cloud über Port 4463 erlauben.
