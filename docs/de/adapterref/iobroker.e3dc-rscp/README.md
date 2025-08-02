---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3dc-rscp/README.md
title: ioBroker.e3dc-rscp
hash: KmrfRshWYIEUuXjIgry4a6ZChRs+A3Ir8nRcoCSaFeQ=
---
![Logo](../../../en/adapterref/iobroker.e3dc-rscp/admin/e3dc-rscp.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.e3dc-rscp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3dc-rscp.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/e3dc-rscp-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/e3dc-rscp-stable.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/git-kick/ioBroker.e3dc-rscp/badge.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![NPM](https://nodei.co/npm/iobroker.e3dc-rscp.png?downloads=true)

# IoBroker.e3dc-rscp
**Tests:** ![Testen und Freigeben](https://github.com/git-kick/ioBroker.e3dc-rscp/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## E3dc-rscp-Adapter für ioBroker
Steuern Sie Ihr E3/DC-Kraftwerk mit dem proprietären RSCP-Protokoll. Dieses ermöglicht das Auslesen von Zustandswerten und das Einstellen von Steuerparametern, z. B. der Ladeleistungsgrenze. Dies ist der Vorteil von RSCP gegenüber dem Standard-Modbus, der nur zum Auslesen von Werten dient. Wenn Sie keine Werte schreiben müssen, sehen Sie sich das (einfachere) [Modbus-Adapter](https://github.com/ioBroker/ioBroker.modbus) an.

Der e3dc-rscp-Adapter wurde für das <a href="https://www.e3dc.com/produkte/s10/">E3/DC S10</a> -Gerät entwickelt. Man könnte davon ausgehen, dass andere E3/DC-Geräte eine entsprechende RSCP-Schnittstelle bieten, aber wir haben bereits Ausnahmen gesehen. Beispielsweise sind einige Batteriemodelle offensichtlich nicht vollständig in E3/DC integriert und leiten daher nicht alle Werte über RSCP weiter. In solchen Fällen leitet der Adapter nur das weiter, was über RSCP eingeht – manchmal einen Nullwert, manchmal einen Fehlercode.

## Inhaltsverzeichnis
1. [ Adapterkonfiguration ](#toc)
1. [ Abdeckung der Schnittstellennachrichten ](#cov)
1. [ Probleme und Funktionsanfragen ](#iss)
1. [ Beispielskript ](#sam)
1. [ Änderungsprotokoll ](#log)
1. [ Lizenz](#lic)

<a name="toc"></a>

## Adapterkonfiguration Hier erfahren Sie, was Sie beim Erstellen einer neuen Adapterinstanz konfigurieren müssen. Die Einstellungen sind in Registerkarten organisiert.
### Registerkarte &quot;Optionen&quot;<table><tr><th> Eingabefeld</th><th> Bedeutung</th></tr><tr><td> E3/DC-Portal-Benutzername</td><td> Ihr Benutzername im <a href="https://s10.e3dc.com/s10/">E3/DC-Portal</a> . E3/DC überprüft dort Ihre Anmeldeinformationen, bevor RSCP-Zugriff gewährt wird.</td></tr><tr><td> E3/DC-Portal-Passwort</td><td> Ihr Passwort im <a href="https://s10.e3dc.com/s10/">E3/DC-Portal</a> .</td></tr><tr><td> E3/DC-IP-Adresse</td><td> Adresse in Ihrem lokalen Netzwerk, z. B. 192.168.178.107<br> <code>ioBroker.discovery</code> (ab 2.8.0) kann E3/DC-Geräte mithilfe von uPnP erkennen.<br> Sie können die IP auch auf Ihrem E3/DC-Bildschirm überprüfen, sie heißt „System-IP“:<br><img src="admin/e3dc-system-ip.png" width="600"></td></tr><tr><td> E3/DC-Anschluss</td><td> RSCP-Port Ihres E3/DC, normalerweise 5033. Wenn Sie eine Farm haben, versuchen Sie stattdessen 5034 (Danke an <a href="https://github.com/gitpaddex">@gitpaddex</a> )<br> HINWEIS: Dies unterscheidet sich vom Modbus-Port.</td></tr><tr><td> RSCP-Passwort</td><td> RSCP-Passwort, wie lokal an Ihrer E3/DC-Station eingegeben:<br><img src="admin/e3dc-rscp-password.png" width="600"></td></tr><td> SET_POWER-Neusendeintervall [Sek.]</td><td> Definieren Sie, wie oft ioBroker Statusaktualisierungen von E3/DC anfordert. Experimente haben gezeigt, dass SET_POWER schwanken kann, wenn dieses Intervall länger als 10 Sekunden ist, obwohl in der offiziellen E3/DC-Tagliste angegeben ist, dass eine Einstellung alle 30 Sekunden ausreichend ist. Bei einem Wert von 0 (Null) erfolgt kein erneutes Senden. Das bedeutet, dass Sie das erneute Senden von außen anstoßen müssen, andernfalls fällt E3/DC nach ca. 10 Sekunden in den Normalzustand zurück.</td></tr><tr><td> Verzögerung beim Senden von Tupeln [Sek.]</td><td> Definieren Sie, wie lange ioBroker wartet, bevor Änderungen der Leerlaufzeit oder des Datenverlaufs in E3/DC geschrieben werden. Ziel ist es, mehrere aufeinanderfolgende Änderungen in einem einzigen Aufruf zusammenzufassen. Bei jeder Änderung der Werte innerhalb einer Leerlaufzeit bzw. einer Datenverlaufsskala wird ein dediziertes Timeout gesetzt bzw. zurückgesetzt; Änderungen werden erst nach Ablauf des Timeouts übertragen. Dies gilt für EMS.IDLE_PERIODS_* und DB.HISTORY_DATA_*</td><tr><tr><td> Kontrollkästchen für jeden E3/DC-Namespace</td><td> Es werden nur Daten für geprüfte Namespaces abgefragt.</td></tr><tr><td> Max. Index für die Initialisierung von Komponenten</td><td> Passen Sie den maximalen Index nach Bedarf an, z. B. wenn Sie mehr Batterien haben. Dies dient der ersten Erkennung von Komponenten. Ausnahme: Die PERIOD2-Zählung gibt an, wie viele PERIOD-Objekte der Version 2 mindestens erstellt werden. Beachten Sie, dass der Index mit 0,1,... beginnt. Wenn Sie also vier Batterien haben, ist der maximale Index 3 angemessen.</td></tr><td> Kontrollkästchen für Lazy SetState()</td><td> Wenn aktiviert (Standard), schreibt der Adapter nur dann in die ioBroker-States, wenn sich Werte geändert haben. Dies reduziert den Arbeitsaufwand und ist besser für kleinere Hardware geeignet. Deaktivieren Sie diese Option, und der Adapter ruft nach jedem Abfrageintervall setState() auf, auch für unveränderte Werte. Dies ist besser, wenn Ihre Anwendung auf regelmäßige State.ts-Updates angewiesen ist.</td></tr></tr><td> Kontrollkästchen für Leerlaufzeiten V1 und V2</td><td> Im Jahr 2024 führte E3/DC Version 2 der Leerlaufperioden ein, die mehrere Perioden am selben Tag verarbeiten kann. Das alte E3/DC-Portal zeigte V1-Perioden an, das neue V2-Perioden. Ich habe V1 nicht vollständig entfernt, sodass Sie sie aus Gründen der Abwärtskompatibilität weiterhin verwenden können. Wenn Sie sich für V2 entscheiden, empfehle ich, V1 auszuschalten. Beide Versionen beeinträchtigen sich auf nicht triviale Weise, seien Sie also vorsichtig.</td></tr>
</Tabelle>

### Reiter "Polling-Intervalle"
<table><tr><th>Eingabefeld</th><th> Bedeutung</th></tr><tr><td> Polling-Intervall kurz [Sek.]</td><td> Definieren Sie, wie oft ioBroker für die meisten dynamischen Variablen Statusaktualisierungen von E3/DC anfordert.</td></tr><tr><td> Polling-Intervall mittel [min]</td><td> Definieren Sie, wie oft ioBroker im Normalfall Statusaktualisierungen von E3/DC anfordert.</td></tr><tr><td> Polling-Intervall lang [Std.]</td><td> Definieren Sie, wie oft ioBroker Statusaktualisierungen von E3/DC für selten oder nie geänderte Variablen anfordert.</td></tr><tr><td> Anforderungs-Tag-Tabelle</td><td> Weisen Sie einzelnen Anforderungs-Tags die Abfrageintervalle S/M/L/N zu. N steht für „nie“.<br> Beachten Sie, dass es keine 1:1-Zuordnung zwischen den Zuständen im Objektbaum und den Einträgen in der Liste der Abfrageintervalle gibt. Die Gründe sind vielfältig: Manchmal ist die Antwort leer (häufig bei EMS_REQ_STORED_ERRORS), dann erscheint kein Zustand im Objektbaum. Manchmal wählen wir einen gemeinsamen Namen für „Getter“ und „Setter“ (z. B. wird die Antwort EMS_USER_CHARGE_LIMIT in den Zustand EMS_MAX_CHARGE_POWER geschrieben). Außerdem kann die Antwort des E3/DC mehr als ein Tag enthalten (z. B. liefert eine BAT_REQ_INFO-Anfrage BAT_RSOC, BAT_MODULE_VOLTAGE, BAT_CURRENT und mehr).</td></tr></table><a name="toc"></a>

### Wiederverwendung der Adapterkonfiguration
Sie können die integrierten Schaltflächen "Speichern"/"Laden" in den Instanzeinstellungen verwenden, um Ihre Adaptereinstellungen in einer JSON-Datei zu speichern und von dort zu laden, z. B. nachdem Sie eine komplett neue ioBroker-Installation durchgeführt haben.

Allerdings: In manchen Situationen führt die Wiederverwendung der Adapterkonfiguration zu unerwartetem Verhalten. Führt eine neue Adapterversion neue Parameter ein, z. B. neue Zeilen in der Polling-Intervall-Liste, werden diese durch das erneute Laden der Einstellungen aus einer älteren JSON-Datei gelöscht. **Deshalb wird generell empfohlen, mit leeren Einstellungen zu beginnen und diese mindestens für jede neue Haupt- (X) oder Nebenversion (Y) (X.Y.z) neu einzugeben:**

1. Löschen Sie die e3dc-rscp-Instanz
2. Erstellen Sie eine neue e3dc-rscp-Instanz
3. Geben Sie die Einstellungen manuell ein (laden Sie die Einstellungen *nicht* aus einer JSON-Datei)

## Abdeckung der Schnittstellennachrichten
### Unterstützte RSCP-Namespaces
Das RSCP-Protokoll gruppiert *Tags* (d. h. Zustände oder Werte) in *Namespaces* (d. h. Gruppen von Tags).<table><tr><th> Namespace</th><th> Steht für</th><th> Unterstützt durch Adapter</th></tr><tr><td> RSCP</td><td> Remote-Storage-Control-Protocol (d. h. Tags auf Protokollebene)</td><td> teilweise unterstützt</td></tr><tr><td> EMS</td><td> Energiemanagementsystem</td><td> teilweise unterstützt</td></tr><tr><td> PVI</td><td> Photovoltaik-Wechselrichter</td><td> unterstützt</td></tr><tr><td> SCHLÄGER</td><td> Batterie</td><td> unterstützt</td></tr><tr><td> DCDC</td><td> Batterie DCDC</td><td> (noch) nicht unterstützt</td></tr><tr><td> PM</td><td> Leistungsmesser</td><td> teilweise unterstützt (REQ-Tags ok, SET-Tags noch nicht implementiert)</td></tr><tr><td> DB</td><td> Datenbank</td><td> experimentell (siehe README-dev.md)</td></tr><tr><td> FMS</td><td> (Flottenverwaltungssystem?)</td><td> keine Tags definiert</td></tr><tr><td> SRV</td><td> Server online / Benutzerverwaltung</td><td> (noch) nicht unterstützt</td></tr><tr><td> HA</td><td> Heimautomatisierung</td><td> (noch) nicht unterstützt</td></tr><tr><td> INFO</td><td> Information</td><td> teilweise unterstützt (REQ-Tags ok, SET-Tags noch nicht implementiert)</td></tr><tr><td> EP</td><td> Notstromversorgung</td><td> unterstützt</td></tr><tr><td> SYS</td><td> Systemneustart/-start</td><td> unterstützt</td></tr><tr><td> ÄH</td><td> Updateverwaltung</td><td> (noch) nicht unterstützt</td></tr><tr><td> WB</td><td> Wallbox</td><td> unterstützt</td></tr></table>

### Beschreibbare RSCP-Tags
<table><tr><th>Namespace</th><th> Etikett</th><th> Typ</th><th> Inhalt</th></tr><tr><td> EMS</td><td> MAX_LADELEISTUNG</td><td> Nummer</td><td> Ladelimit in [W] – HINWEIS: wirkungslos, sofern POWER_LIMITS_USED nicht auf „true“ gesetzt ist.</td></tr><tr><td> EMS</td><td> MAX_ENTLADUNGSLEISTUNG</td><td> Nummer</td><td> Entladegrenze in [W] – HINWEIS: wirkungslos, sofern POWER_LIMITS_USED nicht „true“ ist.</td></tr><tr><td> EMS</td><td> DISCHARGE_START_POWER</td><td> Nummer</td><td> Minimale Batterieentladeleistung in [W] – HINWEIS: wirkungslos, sofern POWER_LIMITS_USED nicht auf „true“ gesetzt ist.</td></tr><tr><td> EMS</td><td> POWERSAVE_ENABLED</td><td> Boolescher Wert</td><td> Der Energiesparmodus ist aktiviert.</td></tr><tr><td> EMS</td><td> POWERLIMITS_USED</td><td> Boolescher Wert</td><td> Es werden Leistungsgrenzen verwendet.</td></tr><tr><td> EMS</td><td> WETTERGEREGELTE LADUNG AKTIVIERT</td><td> Boolescher Wert</td><td> Wettergeregeltes Laden ist aktiviert.</td></tr><tr><td> EMS</td><td> SET_POWER_MODE</td><td> Staaten</td><td> Lademodus; wird normalerweise an MODE weitergeleitet.</td></tr><tr><td> EMS</td><td> LEISTUNGSWERT EINSTELLEN</td><td> Nummer</td><td> Ladeleistung [W]; wird normalerweise an SET_POWER weitergegeben.</td></tr><tr><td> EMS</td><td> MANUELLE_LADEENERGIE</td><td> Nummer</td><td> Manuelle Ladeenergie [Wh]; durch Einstellen dieses Wertes wird der manuelle Ladevorgang gestartet.</td></tr><tr><td> EMS</td><td> BATTERIE_VOR_AUTOMODUS</td><td> Boolescher Wert</td><td> Batterie vor der Wallbox laden.</td></tr><tr><td> EMS</td><td> BATTERIE_ZUM_AUTO_MODUS</td><td> Boolescher Wert</td><td> Batterie per Wallbox im Sonnenmodus entladen.</td></tr><tr><td> EMS</td><td> WB_DISCHARGE_BAT_UNTIL</td><td> Nummer</td><td> Prozentwert, bis zu dem die Wallbox die Batterie entladen darf.</td></tr><tr><td> EMS</td><td> WB_ENFORCE_POWER_ASSIGNMENT</td><td> Boolescher Wert</td><td> Verhindern Sie die Batterieentladung durch die Wallbox im Mischmodus, true=verboten, false=erlaubt</td></tr><tr><td> EMS</td><td> VERFÜGBARE LEISTUNG ÜBERSCHREIBEN</td><td> Nummer</td><td> E3/DC sendet diesen Wert [W] als verfügbare Solarleistung an wallvox.</td></tr><tr><td> EMS</td><td> NOTSTROM</td><td> Staaten</td><td> Notstrombetrieb. **experimentell**</td></tr><tr><td> EMS</td><td> START_NOTSTROMTEST</td><td> Boolescher Wert</td><td> Durch Einstellen dieses Wertes wird der E3/DC in den Inselmodus geschaltet. **experimentell**</td></tr><tr><td> EMS (1)</td><td> Leerlaufzeitraum _aktiv</td><td> Boolescher Wert</td><td> (De-)Aktivieren der Leerlaufzeit.</td></tr><tr><td> EMS (1)</td><td> START_HOUR</td><td> Nummer</td><td> Beginn der Leerlaufzeit.</td></tr><tr><td> EMS (1)</td><td> START_MINUTE</td><td> Nummer</td><td> Startminute der Leerlaufzeit.</td></tr><tr><td> EMS (1)</td><td> END_HOUR</td><td> Nummer</td><td> Ende der Leerlaufstunde.</td></tr><tr><td> EMS (1)</td><td> END_MINUTE</td><td> Nummer</td><td> Ende der Minute der Leerlaufzeit.</td></tr><tr><td> EMS (2)</td><td> IDLE_PERIOD_TYPE</td><td> Nummer</td><td> (V2) 0 = Ladepause, 1 = Entladepause.</td></tr><tr><td> EMS (2)</td><td> PERIOD_ACTIVE</td><td> Boolescher Wert</td><td> (V2) Leerlaufzeit (de-)aktivieren.</td></tr><tr><td> EMS (2)</td><td> PERIOD_START</td><td> Schnur</td><td> (V2) Die Leerlaufzeit beginnt zu einer Tageszeit wie „12:30:00“.</td></tr><tr><td> EMS (2)</td><td> PERIOD_STOP</td><td> Schnur</td><td> (V2) Die Leerlaufzeit endet zu einer Tageszeit wie „21:00:00“.</td></tr><tr><td> EMS (2)</td><td> PERIOD_WEEKDAYS</td><td> Schnur</td><td> (V2) Die Leerlaufzeit wird an Wochentagen wie „135“ aktiviert, wobei 1 = Montag, 2 = Dienstag, … 7 = Sonntag.</td></tr><tr><td> EP</td><td> PARAM_EP_RESERVE</td><td> Nummer</td><td> Soll-Reserve für Notstrom; Prozentwert der Batteriekapazität. Korreliert mit PARAM_EP_RESERVE_ENERGY.</td></tr><tr><td> EP</td><td> PARAM_EP_RESERVE_ENERGY</td><td> Nummer</td><td> Soll-Reserve für Notstrom; Energie in [Wh]. Korreliert mit PARAM_EP_RESERVE.</td></tr><tr><td> DB (3)</td><td> TIME_START</td><td> Schnur</td><td> Beginn des Zeitraums, für den Daten angefordert werden sollen.</td></tr><tr><td> DB (3)</td><td> ZEITSPANNE</td><td> Schnur</td><td> Länge des Zeitraums (Sekunden), für den Daten angefordert werden sollen.</td></tr><tr><td> DB (3)</td><td> ZEITINTERVALL</td><td> Schnur</td><td> Intervall zwischen Datenpunkten.</td></tr><tr><td> SYS</td><td> SYSTEM_REBOOT</td><td> Nummer</td><td> Durch Ändern des Werts auf 1 wird das E3/DC-System neu gestartet.</td></tr><tr><td> SYS</td><td> RESTART_APPLICATION</td><td> Boolescher Wert</td><td> Durch Ändern des Werts auf „true“ wird die E3/DC-Anwendung neu gestartet.</td></tr><tr><td> WB</td><td> EXTERN_DATA_SUN</td><td> Boolescher Wert</td><td> Stellen Sie den Sonnenmodus oder den gemischten Modus ein.</td></tr><tr><td> WB</td><td> EXTERN_DATA_NET</td><td> Nummer</td><td> Stellen Sie die Netzleistung der Wallbox ein.</td></tr><tr><td> WB</td><td> EXTERN_DATA_ALL</td><td> Nummer</td><td> Gesamtleistung der Wallbox einstellen.</td></tr><tr><td> WB</td><td> EXTERN_DATA_ALG</td><td> Byte-Array</td><td> Wallbox-Modus einstellen, Laden abbrechen, Typ 2 Steckerverriegelung, Leistungsbegrenzung.</td></tr></table>

Hinweis (1): Der vollständige Pfad lautet EMS.IDLE_PERIODS_(DIS)CHARGE.<Wochentag> - z. B. "EMS.IDLE_PERIODS_CHARGE.00-Montag". Änderungen werden erst mit der "Tupel-Sendeverzögerung" nach der letzten Änderung gesendet.

Hinweis (2): Der vollständige Pfad lautet EMS.IDLE_PERIODS_2.<Zähler> – z. B. „EMS.IDLE_PERIODS_2.07.PERIOD_START“. Änderungen werden erst mit der „Tupel-Sendeverzögerung“ nach der letzten Änderung gesendet. (V2) bedeutet, dass dieser Tag 2024 für die neue PERIODS_2-Funktion eingeführt wurde. E3/DC kopiert (V1)- und (V2)-Perioden in beide Richtungen. Bei mehreren Intervallen am selben Wochentag wird (V1) jedoch nur eines davon haben. **Achtung**: Wenn Sie (V1)-Perioden ändern, werden zusätzliche (V2)-Intervalle von E3/DC entfernt! Daher empfiehlt es sich, konsequent nur (V1) oder nur (V2) zu verwenden.

Hinweis (3): Der vollständige Pfad lautet DB.HISTORY_DATA_{TAG,WOCHE,MONAT,JAHR} – z.B. "DB.HISTORY_DATA_TAG". Änderungen werden erst mit der "Tupel-Sendeverzögerung" nach der letzten Änderung gesendet.

Für DB ist nicht klar, was den Unterschied zwischen den Skalen (TAG/WOCHE/MONAT/JAHR) ausmacht. Die Ergebnisse ähneln sich. Hypothesen sind:

* spezifische Datenaufbewahrung
* spezifische Datenauflösung
* spezifische Datenaggregation

Weitere Untersuchungen sind erforderlich.

Beachten Sie, dass RSCP mehr als 600 Tags (die ca. 300 Parameter repräsentieren) kennt. Daher halten wir es für nicht sinnvoll, alle Tags zu lesen.
Daher werden wir dem Adapter bei zukünftigen Anwendungsfällen Tags hinzufügen.

<a name="iss"></a>

## Probleme und Funktionsanfragen
Bei Problemen und Funktionsanfragen können Sie auf Englisch oder Deutsch schreiben.

### Fehlerberichte
Öffnen Sie [Formular für Fehlerberichte](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new?assignees=&labels=&template=bug_report.md&title=) und geben Sie umfassende Informationen ein.
In den meisten Fällen ist zur Fehlerbehebung eine Protokolldatei erforderlich. Bitte stellen Sie daher ein Debug-Protokoll bereit:

1. Instanz stoppen
2. Protokoll löschen
3. Setzen Sie die Instanz in den Protokollmodus „Debug“ (oder sogar „Silly“, je nach Art des Problems).
4. Starten Sie die Instanz und lassen Sie sie ca. 1 Minute lang laufen (oder länger, wenn Sie wissen, dass der Fehler länger braucht, um aufzutreten).
5. Protokoll in einer Datei speichern
6. Hängen Sie dem Problem eine Protokolldatei an (bitte kein Inline-Protokoll, es ist zu lang)

### Funktionsanfragen und allgemeine Probleme
Öffnen Sie ein [leere Ausgabe](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new) und beschreiben Sie, was der Adapter tun soll und warum.
Bitte beachten Sie:

* Der Adapter soll RSCP auslösen und die Ergebnisse im Objektbaum von ioBroker bereitstellen, mehr nicht. Die weitere Verarbeitung oder Speicherung bleibt anderem Code überlassen.
* **Um nach derzeit nicht unterstützten RSCP-Namespaces und -Tags zu suchen, beziehen Sie sich bitte auf die offizielle E3/DC-Tag-Liste**, die mit der [Beispielanwendung](http://s10.e3dc.com/dokumentation/RscpExample.zip) bereitgestellt wird.
* Alles, was nicht in der RSCP-Tag-Liste aufgeführt ist oder anderweitig als geliefert angezeigt wird, gilt als „außerhalb des Geltungsbereichs“.

<a name="sam"></a>

## Beispielskript Hier ist ein Beispielskript zur Ladelimitsteuerung – es ist nicht für die Verwendung im Ist-Zustand gedacht, sondern soll nur zeigen, wie E3/DC-Werte verwendet werden könnten.
// Auslöser: Die Leistungsreduzierung ist erreicht, d. h. die Stromzufuhr zum Netz wird begrenzt. // Aktion: Setzen Sie die Ladeleistungsgrenze der Batterie auf das Maximum zurück, wie unter SYS_SPECS angegeben on( { id: &#39;e3dc-rscp.0.EMS.POWER_GRID&#39;, valLe: -getState(&#39;e3dc-rscp.0.EMS.DERATE_AT_POWER_VALUE&#39;).val, change: &#39;lt&#39;, logic: &#39;and&#39; }, (obj) =&gt; { console.log(&#39;Auslöser: Die Stromzufuhr zum Netz hat die Reduzierungsschwelle erreicht – setzen Sie die Ladeleistungsgrenze zurück&#39;); setState(&#39;e3dc-rscp.0.EMS.MAX_CHARGE_POWER&#39;, getState(&#39;e3dc-rscp.0.EMS.SYS_SPECS.maxBatChargePower&#39;).val ); });<a name="log"></a>

## Changelog

### 1.4.3

* fixed errors reported by the ioBroker Check and Service Bot:
  * \[W028\] now "node": ">=20" at package.json
  * \[W037\] now "adapter-dev": "^1.4.0" at package.json
  * \[W037\] now "testing": "^5.0.4" at package.json

### 1.4.2

* introduced config value maxindex_wb - before, maxIndex["WB"] remained undefined in some cases - [Issue #262](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/262)
* restored EP_RESERVE is writable - [Issue #263](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/263)
* fixed errors reported by the ioBroker Check and Service Bot:
  * \[E160\]\[E190\] "peerDependencies.iobroker.admin"  in package.json
  * \[605\] updated (c) 2025.
  * \[254\] removed v1.3.2 which was never released.
* removed duplicate queueWbRequestData() definition from main.js - the relevant one is in wallbox.js
* removed obsolete initialisation of maxIndex for BAT and PVI from constructor(). Both values are now initialized from config during initChannel().

### 1.4.1

MODIFIED ADAPTER SETTINGS - see [Reuse of adapter configuration](https://github.com/git-kick/ioBroker.e3dc-rscp/tree/master?tab=readme-ov-file#reuse-of-adapter-configuration)
 
(git-kick)
* fixed error in weekdayStringToBitmask() - thanks to @SurfGargano for testing.
* idle periods v1 or v2 can now be switched off in the adapter config - recommendation is to use only one of both.
* fixed errors reported by the ioBroker Check and Service Bot:
  * \[E186\] "common.globalDependencies" must be an array at io-package.json
  * \[E190\] admin dependency missing. Please add to dependencies at io-package.json.
* New RscpTags.json: added new tags from 01-2024 tag list. 
**But keep** ...EMERGENCY_POWER_TEST... naming despite it changed to ...EMERGENCYPOWER_TEST... in the new tag-list (this affects four tags).
* Fixed [Issue #236](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/236) - added handling for version 2 PERIODs. 
* New instance settings for max. number of BAT/PVI/PM/PERIOD - so everybody who has e.g. 6 batteries or 3 power inverters can now adjust the detection range for his own setup. This fixes [Issue #249](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/249)
* Fixed [Issue #241](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/241) - modified PM index detection so that discountinuous index sets are handled correctly, like ( 0, 1, 3, 6 ).
* Fixed E524, E525, S526 dev dependencies.
* Enhanced max. index handling to produce less debug log messages. (Introduced notIndexIds for non-index counts.)
* fixed errors reported by the ioBroker Check and Service Bot:
  * \[E186\] "common.globalDependencies" must be an array at io-package.json
  * \[E190\] admin dependency missing. Please add to dependencies at io-package.json.
  * \[W050\] Package 'axios' listed as devDependency at package.json might be obsolete if using '@iobroker/adapter-dev'.

### 1.4.0   - Deprecated - Do not install -

### 1.3.1

MODIFIED ADAPTER SETTINGS - see [Reuse of adapter configuration](https://github.com/git-kick/ioBroker.e3dc-rscp/tree/master?tab=readme-ov-file#reuse-of-adapter-configuration)
 
(git-kick)
* Fixed [Issue #217](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/217) - added PM (power meter) namespace. **Only reading values, no SET tags.**
* Fixed two newly reported "undefined" occurences in main.js.
* Fixed errors listed in [Issue #217](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/217) - reported by the ioBroker Check and Service Bot.
  * \[E162\] js-controller dependency updated to >= 5.0.19
  * \[E204\] "remove news version 1.3.0" considered a false finding; in v1.2.6, io-package.json does not contain common.news "1.3.0"
  * \[E605\] updated copyright to 2024 in README.md
  * \[E605\] removed .npmignore from project directory
  * \[W040\] added keyword "ioBroker" in package.json
  * \[W130\] deleted all but some recent common.news in io-package.json 
  * \[W184\] removed "common.materialize" from io-package.json 
  * \[S522\] migrated to admin5 UI (jsonConfig.json5)

### 1.3.0  - Deprecated - Do not install -

### 1.2.6
 
(git-kick)
* Fixed [Issue #211](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/211) - added tag 0x0100003E to RscpTags.json and to ignoreIds, now adapter does not warn about it anymore.
* In consequence of [Issue #211](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/211), degraded "unknown tag" from warning to debug level. Message does not make sense to most of end users.

### 1.2.5
 
(git-kick)
* Added setter function for PARAM_EP_RESERVE and PARAM_EP_RESERVE_ENERGY in EP namespace - [Issue #199](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/199)  
  * Renamed PARAM_EP_RESERVE_W to PARAM_EP_RESERVE_ENERGY because it is a [Wh] energy variable.
  * Renamed PARAM_EP_RESERVE_MAX_W to PARAM_EP_RESERVE_MAX_ENERGY for the same reason.

* Removed "dangerous" setter tags introduced with v1.2.4 , instead of just switching them off - [Issue #196](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/196)

### 1.2.4
__MODIFIED ADAPTER SETTINGS - do not re-use settings stored in *.json__

__CAUTION: re-use of config from *.json will periodically stop your inverter! See [Issue #196](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/196) for details.__

(ka-vaNu / git-kick)
* Added setter functions for wallbox: BATTERY_BEFORE_CAR_MODE, BATTERY_TO_CAR_MODE, WB_DISCHARGE_BAT_UNTIL, WB_ENFORCE_POWER_ASSIGNMENT - [Issue #185](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/185)

(git-kick)
* Added EMS.REQ_SET_EMERGENCY_POWER (=>EMERGENCY_POWER), EMS.REQ_START_EMERGENCY_POWER_TEST (=>START_EMERGENCY_POWER_TEST) and EMS.REQ_SET_OVERRIDE_AVAILABLE_POWER (=>OVERRIDE_AVAILABLE_POWER). **EMERGENCY_POWER tags are experimental. Testing against the real E3/DC is difficult unless you have an UPS for all relevant devices.** - [Issue #57](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/57)

* Added EMS.REQ_EMERGENCY_POWER_RETRY (=>EMERGENCY_POWER_RETRY) and EMS.REQ_EMERGENCY_POWER_OVERLOAD_STATUS (=>PARAM_NO_REMAINING_ENTRY,PARAM_TIME_TO_RETRY). Note that both have polling interval "N" by default. (Reason is that they are not in the official tag list and use is unclear.)
* Check for IP address and port - [Issue #194](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/194)
* Added setter EMS.MANUAL_CHARGE_ENERGY - [Issue #184](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/184)
* Fixed onReady() async calls causing (very rare) unhandled exceptions - [Issue #178](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/178)
* Handle ENOENT exception if admin/words.js is unavailable - [Issue #180](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/180)
* Added config switch lazy_setstate  - [Issue #174](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/174). The adapter is now capable of updating State.ts according to convention (also when the value was unchanged). **Note** that the default ist "false" (i.e. no setState() call as long as value remains unchanged) in order to avoid a breaking chage for users with small hardware. 
* New chapter in [README-dev.md](https://github.com/git-kick/ioBroker.e3dc-rscp/blob/master/README-dev.md) describing how to add a standard setter tag to the adapter.

### 1.2.3
(git-kick)
* Added testing with Node 18 and Node 20 - [Issue #165](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/165)
* Upgraded to new translations, adding "uk" language - [Issue #166](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/166)
* Stop polling "unavailable" tags - [Issue #169](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/169)
* Fixed vulnerable dependency: protobufjs < 7.2.4 - [CVE-2023-36665](https://nvd.nist.gov/vuln/detail/CVE-2023-36665)
* Fixed vulnerable dependency: word-wrap < 1.2.4 - [CVE-2023-26115](https://nvd.nist.gov/vuln/detail/CVE-2023-26115)
* Adapter uses Sentry now.

### 1.2.2
(git-kick)
* Fixed TAG_PVI_REQ_FREQUENCY_UNDER_OVER warning with polling interval 'N' - [Issue #157](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/157)
* Log "warn - received message with invalid ..." reclassified to 'debug' - [Issue #159](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/159)
* Revised BAT and PVI probing; now resilient with lost responses - [Issue #160](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/160)
* Integrated Sentry plugin for crash reporting - see [documentation](https://github.com/ioBroker/plugin-sentry)

### 1.2.1
__MODIFIED ADAPTER SETTINGS - do not re-use settings stored in *.json__

(git-kick)
* Added INFO namespace REQ tags (no SET tags yet) - [Issue #149](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/149)
* Fixed representation of EMS.EPTEST_NEXT_TESTSTART in object tree.
* Fixed out of range exceptions upon TCP/IP noise (i.e., if a frame has inconsistent length, then stop processing it.)
* Added two README.md sections: "Reuse of adapter configuration", "Issues and feature requests"

### 1.2.0 - Deprecated - Do not install -

### 1.1.2
(ka-vaNu)
* WB Control.* no longer updated by rscp response - [PR #144](https://github.com/git-kick/ioBroker.e3dc-rscp/pull/144)

(git-kick)
* Avoid cleartext password in silly log.

### 1.1.1
(ka-vaNu)
* Fixed typo which prevented creation of wallbox object - [Issue #139](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/139)

(git-kick)
* Fixed vulnerable dependency: glob-parent < 5.1.2 - [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2022-28469)

### 1.1.0
(ka-vaNu)
* Added support for wallboxes, including setter tags - [Issue #106](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/106)

(helper0815)
* Added value "N" for polling intervals, meaning "never" - [Issue #126](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/126)

(git-kick)
* Fixed vulnerable dependency: minimatch < 3.0.5 - [CVE-2022-3517](https://nvd.nist.gov/vuln/detail/CVE-2022-3517)
* Fixed vulnerable dependency: decode-uri-component < 0.2.1 - [CVE-2022-38900](https://nvd.nist.gov/vuln/detail/CVE-2022-38900)

### 1.0.8
(git-kick)
* No updates for e3dc-rscp.0.EP.PARAM_0.* - [Issue #117](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/117)
* Vulnerable dependency: glob-parent < 5.1.2 - [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2020-28469)
* Define info.connection and RSCP.AUTHENTICATION synchronously (to avoid warning in adapter log)

__Note__: DO NOT import adapter settings from a json-file created with an older version of e3dc-rscp. Instead, create a new adapter configuration from the scratch and then store it to a json-file. Reason is that importing an older json-file will delete polling interval list entries which have been added with v1.0.8 and this will invalidate the bugfix!

### 1.0.7
(git-kick)
* High CPU load on js-controller after triggering historical data - [Issue #114](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/114)

### 1.0.6
(git-kick)
* Boolean switches (e.g. EMS.WEATHER_REGULATED_CHARGE_ENABLED) did not work properly - [Issue #109](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/103)
* Fixed vulnerable dependency: minimist < 1.2.6 - [CVE-2021-44906](https://nvd.nist.gov/vuln/detail/CVE-2021-44906)

### 1.0.5
(git-kick)
* SET_POWER not effective due to delayed transmission - [Issue #103](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/103)

### 1.0.4
(git-kick)
* BAT_1 not visible after update to v1.0.3 - [Issue #96](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/96)
* Save button inactive after loading adapter configuration - [Issue #95](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/95)

### 1.0.3
(git-kick)
* Reconnect does not work after RESTART_APPLICATION - [Issue #74](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/74)
* Query of battery data does not work - [Issue #85](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/85)
* DCB_CELL_TEMPERATURE = 0 obviously means there is no value, so display "(null)" instead of "0 °C"
* Uncaught out-of-range exception when entering invalid data - [Issue #88](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/88)
* Emergency Power Level - [Issue #89](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/89)

### 1.0.2
(git-kick)
* SYS namespace, experimental support - [Issue #60](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/60)
* info.connection is true while no connection - [Issue #64](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/64)
* Compatibility check to js-controller 4.0 - [Issue #75](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/75)
* WB.PM_ACTIVE_PHASES decode values - [Issue #76](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/76)
* WB.MODE decode value 8 - [Issue #77](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/77)
* Dependabot: follow-redirects 1.14.8

### 1.0.1
(git-kick)
* [CVE-2021-23566](https://nvd.nist.gov/vuln/detail/CVE-2021-23566): require nanoid >=3.1.31 - [Issue #61](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/61)
* [CVE-2020-28469](https://nvd.nist.gov/vuln/detail/CVE-2020-28469): require glob-parent >=5.1.2
* [Sentry Event](https://sentry.io/organizations/ulrich-kick/issues/2812710513/events/0c4653a38cd24b6a8732a10d07370e06/): Type Error in sendNextFrame(), handling case this == null

### 1.0.0
(git-kick)
* Prerequisites for ioBroker repo in README.md, io-package.json, github
* CVE-2022-0155: require follow-redirects 1.14.7
* Best Practices: create info.connection state
* Best practices: set roles for all inner nodes in object tree
* Bugfix: EMS.POWER_PV was never updated due to missing line in polling intervals table
* Adapter review (PR#1589): removed tab stuff (tab_m.html)
* Adapter review (PR#1589): onUnload(), clear _all_ timers and close TCP connection
* Remove Sentry, because it was only a trial and not properly configured

<a name="lic"></a>

## License

Copyright (c) 2025 Ulrich Kick <iobroker@kick-web.de>

```
					GNU GENERAL PUBLIC LICENSE
					   Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

							Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

					   TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

	a) The work must carry prominent notices stating that you modified
	it, and giving a relevant date.

	b) The work must carry prominent notices stating that it is
	released under this License and any conditions added under section 7.
	This requirement modifies the requirement in section 4 to
	"keep intact all notices".

	c) You must license the entire work, as a whole, under this
	License to anyone who comes into possession of a copy.  This
	License will therefore apply, along with any applicable section 7
	additional terms, to the whole of the work, and all its parts,
	regardless of how they are packaged.  This License gives no
	permission to license the work in any other way, but it does not
	invalidate such permission if you have separately received it.

	d) If the work has interactive user interfaces, each must display
	Appropriate Legal Notices; however, if the Program has interactive
	interfaces that do not display Appropriate Legal Notices, your
	work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

	a) Convey the object code in, or embodied in, a physical product
	(including a physical distribution medium), accompanied by the
	Corresponding Source fixed on a durable physical medium
	customarily used for software interchange.

	b) Convey the object code in, or embodied in, a physical product
	(including a physical distribution medium), accompanied by a
	written offer, valid for at least three years and valid for as
	long as you offer spare parts or customer support for that product
	model, to give anyone who possesses the object code either (1) a
	copy of the Corresponding Source for all the software in the
	product that is covered by this License, on a durable physical
	medium customarily used for software interchange, for a price no
	more than your reasonable cost of physically performing this
	conveying of source, or (2) access to copy the
	Corresponding Source from a network server at no charge.

	c) Convey individual copies of the object code with a copy of the
	written offer to provide the Corresponding Source.  This
	alternative is allowed only occasionally and noncommercially, and
	only if you received the object code with such an offer, in accord
	with subsection 6b.

	d) Convey the object code by offering access from a designated
	place (gratis or for a charge), and offer equivalent access to the
	Corresponding Source in the same way through the same place at no
	further charge.  You need not require recipients to copy the
	Corresponding Source along with the object code.  If the place to
	copy the object code is a network server, the Corresponding Source
	may be on a different server (operated by you or a third party)
	that supports equivalent copying facilities, provided you maintain
	clear directions next to the object code saying where to find the
	Corresponding Source.  Regardless of what server hosts the
	Corresponding Source, you remain obligated to ensure that it is
	available for as long as needed to satisfy these requirements.

	e) Convey the object code using peer-to-peer transmission, provided
	you inform other peers where the object code and Corresponding
	Source of the work are being offered to the general public at no
	charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

	a) Disclaiming warranty or limiting liability differently from the
	terms of sections 15 and 16 of this License; or

	b) Requiring preservation of specified reasonable legal notices or
	author attributions in that material or in the Appropriate Legal
	Notices displayed by works containing it; or

	c) Prohibiting misrepresentation of the origin of that material, or
	requiring that modified versions of such material be marked in
	reasonable ways as different from the original version; or

	d) Limiting the use for publicity purposes of names of licensors or
	authors of the material; or

	e) Declining to grant rights under trademark law for use of some
	trade names, trademarks, or service marks; or

	f) Requiring indemnification of licensors and authors of that
	material by anyone who conveys the material (or modified versions of
	it) with contractual assumptions of liability to the recipient, for
	any liability that these contractual assumptions directly impose on
	those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

					 END OF TERMS AND CONDITIONS

			How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

	<one line to give the program's name and a brief idea of what it does.>
	Copyright (C) <year>  <name of author>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

	<program>  Copyright (C) <year>  <name of author>
	This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
	This is free software, and you are welcome to redistribute it
	under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.
```