---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3dc-rscp/README.md
title: ioBroker.e3dc-rscp
hash: FGyqr5gZVazPIvT5jq5auYtCJdKjT60HLRXHPq/HozA=
---
![Logo](../../../en/adapterref/iobroker.e3dc-rscp/admin/e3dc-rscp.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.e3dc-rscp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3dc-rscp.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/e3dc-rscp-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/e3dc-rscp-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/git-kick/ioBroker.e3dc-rscp/badge.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![NPM](https://nodei.co/npm/iobroker.e3dc-rscp.png?downloads=true)

# IoBroker.e3dc-rscp
**Tests:** ![Test und Freigabe](https://github.com/git-kick/ioBroker.e3dc-rscp/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## E3dc-rscp-Adapter für ioBroker
Steuern Sie Ihre E3/DC-Kraftstation mit dem proprietären RSCP-Protokoll. Dieses ermöglicht das Auslesen von Statuswerten und das Einstellen von Steuerungsparametern, z. B. der Ladeleistungsgrenze. Dies ist der Vorteil von RSCP gegenüber dem Standard-Modbus, der nur zum Auslesen von Werten dient. Wenn Sie keine Werte schreiben müssen, sehen Sie sich das (einfachere) [Modbus-Adapter](https://github.com/ioBroker/ioBroker.modbus) an.

Der e3dc-rscp-Adapter wurde für das <a href="https://www.e3dc.com/produkte/s10/">E3/DC S10</a> -Gerät entwickelt. Man könnte annehmen, dass andere E3/DC-Geräte eine vergleichbare RSCP-Schnittstelle bieten, doch es gibt Ausnahmen. Beispielsweise sind manche Akkumodelle offensichtlich nicht vollständig in E3/DC integriert und übertragen daher nicht alle Werte über RSCP. In solchen Fällen leitet der Adapter lediglich die über RSCP eingehenden Daten weiter, manchmal den Wert Null, manchmal einen Fehlercode.

## Inhaltsverzeichnis
1. [ Adapterkonfiguration ](#toc)
1. [ Abdeckung von Schnittstellennachrichten ](#cov)
1. [ Probleme und Funktionswünsche ](#iss)
1. [ Beispielskript ](#sam)
1. [ Änderungsprotokoll ](#log)
1. [Lizenz](#lic)

<a name="toc"></a>

## Adapterkonfiguration Hier erfahren Sie, was Sie beim Erstellen einer neuen Adapterinstanz konfigurieren müssen. Die Einstellungen sind in Registerkarten organisiert.
### Registerkarte &quot;Optionen&quot;<table><tr><th> Eingabefeld</th><th> Bedeutung</th></tr><tr><td> E3/DC-Portal-Benutzername</td><td> Ihr Benutzername im <a href="https://s10.e3dc.com/s10/">E3/DC-Portal</a> . E3/DC überprüft dort Ihre Anmeldeinformationen, bevor der RSCP-Zugriff gewährt wird.</td></tr><tr><td> E3/DC-Portal-Passwort</td><td> Ihr Passwort für das <a href="https://s10.e3dc.com/s10/">E3/DC-Portal</a> .</td></tr><tr><td> E3/DC IP-Adresse</td><td> Adresse in Ihrem lokalen Netzwerk, z. B. 192.168.178.107<br> <code>ioBroker.discovery</code> (ab Version 2.8.0) kann E3/DC-Geräte mithilfe von uPnP erkennen.<br> Sie können die IP-Adresse auch auf Ihrem E3/DC-Bildschirm überprüfen; sie wird als „System-IP“ bezeichnet:<br><img src="admin/e3dc-system-ip.png" width="600"></td></tr><tr><td> E3/DC-Anschluss</td><td> RSCP-Port Ihres E3/DC, üblicherweise 5033. Falls Sie eine Serverfarm verwenden, versuchen Sie es stattdessen mit Port 5034 (Dank an <a href="https://github.com/gitpaddex">@gitpaddex</a> ).<br> HINWEIS: Dies ist etwas anderes als der Modbus-Port.</td></tr><tr><td> RSCP-Passwort</td><td> RSCP-Passwort, wie es lokal an Ihrer E3/DC-Station eingegeben wurde:<br><img src="admin/e3dc-rscp-password.png" width="600"></td></tr><td> SET_POWER erneut senden Intervall [Sek.]</td><td> Legen Sie fest, wie oft ioBroker Statusaktualisierungen von E3/DC anfordert. Tests haben gezeigt, dass SET_POWER schwanken kann, wenn dieses Intervall länger als 10 Sekunden ist, obwohl in der offiziellen E3/DC-Tag-Liste ein Intervall von 30 Sekunden als ausreichend angegeben wird. Bei der Einstellung 0 (Null) erfolgt keine erneute Übertragung; d. h. Sie müssen die erneute Übertragung von außen auslösen, da E3/DC sonst nach ca. 10 Sekunden in den Normalzustand zurückkehrt.</td></tr><tr><td> Verzögerung beim Senden von Tupeln [Sek.]</td><td> Definieren Sie, wie lange ioBroker wartet, bevor Änderungen der Leerlaufperiode oder des Datenverlaufs an E3/DC geschrieben werden. Ziel ist es, mehrere aufeinanderfolgende Änderungen in einem einzigen Aufruf zusammenzufassen. Bei jeder Änderung der Werte innerhalb einer Leerlaufperiode bzw. eines Datenverlaufsabschnitts wird ein dediziertes Timeout gesetzt bzw. zurückgesetzt; Änderungen werden erst nach Ablauf des Timeouts übertragen. Dies gilt für EMS.IDLE_PERIODS_* und DB.HISTORY_DATA_*.</td><tr><tr><td> Kontrollkästchen für jeden E3/DC-Namensraum</td><td> Daten werden nur für geprüfte Namensräume angefordert.</td></tr><tr><td> Maximaler Index für die Initialisierung von Komponenten</td><td> Passen Sie den Maximalindex nach Bedarf an, z. B. bei einer größeren Anzahl an Batterien. Dieser Wert dient der ersten Komponentenerkennung. Ausnahme: Die Anzahl der PERIOD2-Objekte gibt an, wie viele PERIOD-Objekte der Version 2 mindestens erstellt werden. Beachten Sie, dass die Indizierung mit 0, 1 usw. beginnt. Bei vier Batterien ist beispielsweise ein Maximalindex von 3 angemessen.</td></tr><td> Kontrollkästchen für Lazy SetState()</td><td> Ist diese Option aktiviert (Standardeinstellung), schreibt der Adapter nur dann in die ioBroker-Zustände, wenn sich Werte geändert haben. Dies reduziert die Arbeitslast und ist besonders für leistungsschwächere Hardware geeignet. Deaktivieren Sie diese Option, ruft der Adapter `setState()` nach jedem Abfrageintervall auf, auch bei unveränderten Werten. Dies ist vorteilhaft, wenn Ihre Anwendung auf regelmäßige Aktualisierungen der `State.ts`-Datei angewiesen ist.</td></tr></tr><td> Kontrollkästchen für Leerlaufzeiten V1 und V2</td><td> Im Jahr 2024 führte E3/DC die Version 2 der Leerlaufperioden ein, die mehrere Perioden am selben Tag verarbeiten kann. Das alte E3/DC-Portal zeigte Perioden der Version 1 an, das neue die der Version 2. Ich habe Version 1 nicht vollständig entfernt, sodass Sie sie aus Gründen der Abwärtskompatibilität weiterhin verwenden können. Wenn Sie sich für Version 2 entscheiden, empfehle ich, Version 1 zu deaktivieren. Beide Versionen können sich gegenseitig beeinträchtigen, seien Sie daher vorsichtig.</td></tr>
</table>

### Registerkarte „Abfrageintervalle“
<table><tr><th>Eingabefeld</th><th> Bedeutung</th></tr><tr><td> kurzes Abfrageintervall [Sek.]</td><td> Definieren Sie, wie oft ioBroker Statusaktualisierungen von E3/DC für die meisten dynamischen Variablen anfordert.</td></tr><tr><td> mittleres Abfrageintervall [min]</td><td> Definieren Sie, wie oft ioBroker im Normalfall Statusaktualisierungen von E3/DC anfordert.</td></tr><tr><td> langes Abstimmungsintervall [Std.]</td><td> Definieren Sie, wie oft ioBroker Statusaktualisierungen von E3/DC für selten oder nie geänderte Variablen anfordert.</td></tr><tr><td> Tabelle mit Anforderungs-Tags</td><td> Weisen Sie den Abfrageintervallen S/M/L/N einzelne Anforderungs-Tags zu. N steht für „nie“.<br> Beachten Sie, dass keine 1:1-Zuordnung zwischen Zuständen im Objektbaum und Elementen in der Liste der Abfrageintervalle besteht. Die Gründe hierfür sind vielfältig: Manchmal ist die Antwort leer (was häufig bei EMS_REQ_STORED_ERRORS der Fall ist), dann erscheint kein Zustand im Objektbaum. Manchmal wird ein gemeinsamer Name für „Getter“ und „Setter“ verwendet (z. B. wird die Antwort EMS_USER_CHARGE_LIMIT in den Zustand EMS_MAX_CHARGE_POWER geschrieben). Außerdem kann die Antwort des E3/DC mehrere Tags enthalten (z. B. liefert eine BAT_REQ_INFO-Anfrage BAT_RSOC, BAT_MODULE_VOLTAGE, BAT_CURRENT usw.).</td></tr></table><a name="toc"></a>

### Wiederverwendung der Adapterkonfiguration
Sie können die integrierten "Speichern"/"Laden"-Schaltflächen in den Instanzeinstellungen verwenden, um Ihre Adaptereinstellungen in einer JSON-Datei zu speichern und sie von dort zu laden, z. B. nachdem Sie eine komplett neue ioBroker-Installation durchgeführt haben.

Aber: In manchen Situationen kann die Wiederverwendung der Adapterkonfiguration zu unerwartetem Verhalten führen. Wenn eine neue Adapterversion neue Parameter einführt, z. B. neue Zeilen in der Liste des Abfrageintervalls, werden diese neuen Parameter beim Neuladen der Einstellungen aus einer älteren JSON-Datei gelöscht. **Daher wird generell empfohlen, mit leeren Einstellungen zu beginnen und diese mindestens für jede neue Hauptversion (X) oder Nebenversion (Y) (X.Y.z) neu einzugeben:**

1. Löschen Sie die e3dc-rscp-Instanz.
2. Erstellen Sie eine neue e3dc-rscp-Instanz.
3. Einstellungen manuell eingeben (Einstellungen *nicht* aus einer JSON-Datei laden)

## Abdeckung von Schnittstellennachrichten
### Unterstützte RSCP-Namensräume
Das RSCP-Protokoll gruppiert *Tags* (d. h. Zustände oder Werte) in *Namensräume* (d. h. Gruppen von Tags).<table><tr><th> Namensraum</th><th> Steht für</th><th> Unterstützt durch Adapter</th></tr><tr><td> RSCP</td><td> Remote-Storage-Control-Protocol (d. h. Protokollebenen-Tags)</td><td> teilweise unterstützt</td></tr><tr><td> Rettungsdienst</td><td> Energiemanagementsystem</td><td> teilweise unterstützt; insbesondere werden viele der 2024 eingeführten neuen Tags noch nicht verarbeitet.</td></tr><tr><td> PVI</td><td> Photovoltaik-Wechselrichter</td><td> unterstützt</td></tr><tr><td> SCHLÄGER</td><td> Batterie</td><td> unterstützt</td></tr><tr><td> DCDC</td><td> DC-DC-Wandler</td><td> Teilweise unterstützt, experimentell; Dank an <a href="https://github.com/db3wf">db3wf</a></tr><tr><td> PM</td><td> Stromzähler</td><td> Teilweise unterstützt (REQ-Tags ok, SET-Tags noch nicht implementiert)</td></tr><tr><td> DB</td><td> Datenbank</td><td> experimentell (siehe README-dev.md)</td></tr><tr><td> FMS</td><td> (Flottenmanagementsystem?)</td><td> Keine Tags definiert</td></tr><tr><td> SRV</td><td> Server online / Benutzerverwaltung</td><td> wird (noch) nicht unterstützt</td></tr><tr><td> HA</td><td> Hausautomation</td><td> wird (noch) nicht unterstützt</td></tr><tr><td> INFO</td><td> Information</td><td> Teilweise unterstützt (REQ-Tags ok, SET-Tags noch nicht implementiert)</td></tr><tr><td> EP</td><td> Notstromversorgung</td><td> unterstützt</td></tr><tr><td> SYSTEM</td><td> Systemneustart</td><td> unterstützt</td></tr><tr><td> ÄH</td><td> Aktualisierungsverwaltung</td><td> wird (noch) nicht unterstützt</td></tr><tr><td> WB</td><td> Wandbox</td><td> Unterstützt; mit freundlicher Genehmigung von <a href="https://github.com/ka-vaNu">ka-vaNu</a></td></tr></table>

### Beschreibbare RSCP-Tags
<table><tr><th>Namensraum</th><th> Etikett</th><th> Typ</th><th> Inhalt</th></tr><tr><td> Rettungsdienst</td><td> BATTERIE_VOR_FAHRZEUGMODUS</td><td> boolescher Wert</td><td> Laden Sie den Akku vor der Wallbox auf.</td></tr><tr><td> Rettungsdienst</td><td> BATTERIE-ZU-FAHRZEUG-MODUS</td><td> boolescher Wert</td><td> Batterie im Sonnenmodus über die Wallbox entladen.</td></tr><tr><td> Rettungsdienst</td><td> DENTARGE_START_LEISTUNG</td><td> Nummer</td><td> Minimale Batterieentladeleistung in [W] - HINWEIS: Unwirksam, es sei denn, POWER_LIMITS_USED ist &quot;true&quot;.</td></tr><tr><td> Rettungsdienst</td><td> DPP_MONTHS_ACTIVE</td><td> Zeichenkette</td><td> Dynamische Strompreise: aktiv in Monaten mit Großbuchstaben, inaktiv in Monaten mit Kleinbuchstaben, z. B. &quot;jfMAMJJASOnd&quot;</td></tr><tr><td> Rettungsdienst</td><td> DPP_PRICE_BASED_BATTERY_CHARGE_ENABLED</td><td> boolescher Wert</td><td> Dynamische Strompreise: Akkuladung aktiviert?</td></tr><tr><td> Rettungsdienst</td><td> DPP_PRICE_LIMIT_BATTERY</td><td> Nummer</td><td> Dynamische Strompreise unterhalb dieser Grenze werden zum Laden der Batterie verwendet.</td></tr><tr><td> Rettungsdienst</td><td> DPP_PRICE_LIMIT_WB</td><td> Nummer</td><td> Dynamische Strompreise unterhalb dieser Grenze werden zum Laden des Autos verwendet.</td></tr><tr><td> Rettungsdienst</td><td> DPP_SOC_BATTERY</td><td> Nummer</td><td> Wenn der SoC-Wert [%] erreicht ist, wird das DPP-basierte Laden gestoppt.</td></tr><tr><td> Rettungsdienst</td><td> Notstromversorgung</td><td> Staaten</td><td> Notstrombetrieb. **Experimentell**</td></tr><tr><td> Rettungsdienst</td><td> MANUELLE_LADUNG_ENERGIE</td><td> Nummer</td><td> Manuelle Ladeenergie [Wh]; durch Einstellen dieses Wertes wird der manuelle Ladevorgang gestartet.</td></tr><tr><td> Rettungsdienst</td><td> MAX_CHARGE_POWER</td><td> Nummer</td><td> Ladebegrenzung in [W] - HINWEIS: Unwirksam, es sei denn, POWER_LIMITS_USED ist &quot;true&quot;.</td></tr><tr><td> Rettungsdienst</td><td> MAX_DISCHARGE_LEISTUNG</td><td> Nummer</td><td> Entladegrenze in [W] - HINWEIS: Wirksam nur, wenn POWER_LIMITS_USED auf &quot;true&quot; gesetzt ist.</td></tr><tr><td> Rettungsdienst</td><td> ÜBERREITEN_VERFÜGBARE_LEISTUNG</td><td> Nummer</td><td> E3/DC sendet diesen Wert [W] als verfügbare Solarenergie an wallvox.</td></tr><tr><td> Rettungsdienst</td><td> LEISTUNGSGRENZEN_VERWENDET</td><td> boolescher Wert</td><td> Es werden Leistungsgrenzen verwendet.</td></tr><tr><td> Rettungsdienst</td><td> Energiesparmodus aktiviert</td><td> boolescher Wert</td><td> Der Energiesparmodus ist aktiviert.</td></tr><tr><td> Rettungsdienst</td><td> SET_POWER_MODUS</td><td> Staaten</td><td> Lademodus; wird üblicherweise an MODUS weitergeleitet.</td></tr><tr><td> Rettungsdienst</td><td> LEISTUNGSWERT SETZEN</td><td> Nummer</td><td> Ladeleistung [W]; wird üblicherweise an SET_POWER weitergegeben.</td></tr><tr><td> Rettungsdienst</td><td> START_NOTSTROMTEST</td><td> boolescher Wert</td><td> Durch Durchstellen dieses Wertes wird der E3/DC in den Inselbetrieb geschaltet. **Experimentell**</td></tr><tr><td> Rettungsdienst</td><td> MANUELLES LADEN STARTEN</td><td> Nummer</td><td> Manuelle Ladung starten [Wh].</td></tr><tr><td> Rettungsdienst</td><td> WB_DISCHARGE_BAT_UNTIL</td><td> Nummer</td><td> Prozentsatz, bis zu dem die Wallbox die Batterie entladen darf.</td></tr><tr><td> Rettungsdienst</td><td> WB_ENFORCE_POWER_ASSIGNMENT</td><td> boolescher Wert</td><td> Batterieentladung über die Wallbox im Mischmodus verhindern, wahr = verboten, falsch = erlaubt</td></tr><tr><td> Rettungsdienst</td><td> WETTERREGELUNGS-LADUNG AKTIVIERT</td><td> boolescher Wert</td><td> Wetterabhängiges Laden ist aktiviert.</td></tr><tr><td> Rettungsdienst (1)</td><td> Leerlaufzeitraum aktiv</td><td> boolescher Wert</td><td> Leerlaufzeit (de-)aktivieren.</td></tr><tr><td> Rettungsdienst (1)</td><td> STARTSTUNDE</td><td> Nummer</td><td> Beginn der Leerlaufzeit.</td></tr><tr><td> Rettungsdienst (1)</td><td> STARTMINUTE</td><td> Nummer</td><td> Beginn der Leerlaufzeit.</td></tr><tr><td> Rettungsdienst (1)</td><td> ENDE_STUNDE</td><td> Nummer</td><td> Ende der Leerlaufzeit.</td></tr><tr><td> Rettungsdienst (1)</td><td> ENDE_MINUTE</td><td> Nummer</td><td> Minute Ende der Leerlaufzeit.</td></tr><tr><td> Rettungsdienst (2)</td><td> IDLE_PERIOD_TYPE</td><td> Nummer</td><td> (V2) 0 = Ladevorgang pausieren, 1 = Entladevorgang pausieren.</td></tr><tr><td> Rettungsdienst (2)</td><td> ZEITRAUM_AKTIV</td><td> boolescher Wert</td><td> (V2) Leerlaufzeit (deaktivieren).</td></tr><tr><td> Rettungsdienst (2)</td><td> PERIOD_START</td><td> Zeichenkette</td><td> (V2) Die Leerlaufzeit beginnt zu einer bestimmten Tageszeit, z. B. um 12:30:00 Uhr.</td></tr><tr><td> Rettungsdienst (2)</td><td> PERIOD_STOP</td><td> Zeichenkette</td><td> (V2) Die Leerlaufzeit endet zu einer bestimmten Tageszeit, z. B. um 21:00:00 Uhr.</td></tr><tr><td> Rettungsdienst (2)</td><td> ZEITRAUM_WOCHENTAGS</td><td> Zeichenkette</td><td> (V2) An Wochentagen ist eine Leerlaufzeit aktiviert, z. B. „135“, wobei 1 = Montag, 2 = Dienstag, ... 7 = Sonntag.</td></tr><tr><td> EP</td><td> PARAM_EP_RESERVE</td><td> Nummer</td><td> Zielreserve für Notstromversorgung; Prozentsatz der Batteriekapazität. Entspricht dem Parameter PARAM_EP_RESERVE_ENERGY.</td></tr><tr><td> EP</td><td> PARAM_EP_RESERVE_ENERGY</td><td> Nummer</td><td> Zielreserve für Notstromversorgung; Energie in [Wh]. Entspricht dem Parameter PARAM_EP_RESERVE.</td></tr><tr><td> DB (3)</td><td> ZEITSTART</td><td> Zeichenkette</td><td> Beginn des Zeitraums, für den Daten angefordert werden sollen.</td></tr><tr><td> DB (3)</td><td> ZEITRAUM</td><td> Zeichenkette</td><td> Zeitraum, für den Daten angefordert werden sollen (Sekunden).</td></tr><tr><td> DB (3)</td><td> ZEITINTERVALL</td><td> Zeichenkette</td><td> Intervall zwischen Datenpunkten.</td></tr><tr><td> SYSTEM</td><td> SYSTEMREBOOT</td><td> Nummer</td><td> Durch Ändern des Wertes auf 1 wird das E3/DC-System neu gestartet.</td></tr><tr><td> SYSTEM</td><td> ANWENDUNG NEU STARTEN</td><td> boolescher Wert</td><td> Wenn der Wert auf „true“ geändert wird, wird die E3/DC-Anwendung neu gestartet.</td></tr><tr><td> WB</td><td> EXTERN_DATA_ALG</td><td> Byte-Array</td><td> Wallbox-Modus einstellen, Ladevorgang abbrechen, Typ-2-Steckerverriegelung, Leistungsbegrenzung.</td></tr><tr><td> WB</td><td> EXTERN_DATA_ALL</td><td> Nummer</td><td> Stellen Sie die Gesamtleistung der Wanddose ein.</td></tr><tr><td> WB</td><td> EXTERN_DATA_NET</td><td> Nummer</td><td> Netzstrom für die Wanddose einstellen.</td></tr><tr><td> WB</td><td> EXTERN_DATA_SUN</td><td> boolescher Wert</td><td> Stellen Sie den Sonnenmodus oder den Mischmodus ein.</td></tr></table>

Hinweis (1): Der vollständige Pfad lautet EMS.IDLE_PERIODS_(DIS)CHARGE.<Wochentag> – z. B. „EMS.IDLE_PERIODS_CHARGE.00-Montag“. Änderungen werden erst nach der letzten Änderung mit einer Verzögerung von „Tupel senden“ übertragen.

Hinweis (2): Der vollständige Pfad lautet EMS.IDLE_PERIODS_2.<Zähler> – z. B. „EMS.IDLE_PERIODS_2.07.PERIOD_START“. Änderungen werden erst nach der letzten Änderung mit einer Verzögerung von „Tupeln“ gesendet. (V2) bedeutet, dass es sich um ein 2024 für die neue PERIODS_2-Funktion eingeführtes Tag handelt. E3/DC kopiert (V1)- und (V2)-Perioden in beide Richtungen. Bei mehreren Intervallen am selben Wochentag enthält (V1) jedoch nur eines davon. **Achtung:** Wenn Sie (V1)-Perioden ändern, werden zusätzliche (V2)-Intervalle von E3/DC entfernt! Daher empfiehlt es sich, entweder ausschließlich (V1) oder ausschließlich (V2) zu verwenden.

Hinweis (3): Der vollständige Pfad lautet DB.HISTORY_DATA_{DAY,WEEK,MONTH,YEAR} – z. B. „DB.HISTORY_DATA_DAY“. Änderungen werden erst nach der letzten Änderung mit einer Verzögerung von „tuple sendig delay“ gesendet.

Für DB ist nicht klar, wodurch sich die Skalen (TAG/WOCHE/MONAT/JAHR) unterscheiden. Die Ergebnisse sehen ähnlich aus. Hypothesen lauten:

* spezifische Datenaufbewahrung
* spezifische Datenauflösung
* spezifische Datenaggregation

Weitere Untersuchungen sind erforderlich.

RSCP kennt über 600 Tags (die ca. 300 Parameter repräsentieren), daher erscheint es uns nicht sinnvoll, alle auszulesen.
Wir werden dem Adapter daher bei zukünftigen Anwendungsfällen weitere Tags hinzufügen.

<a name="iss"></a>

## Probleme und Funktionswünsche
Bei Problemen und Funktionswünschen können Sie auf Englisch oder Deutsch schreiben.

### Fehlerberichte
Öffnen Sie [Fehlerberichtsformular](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new?assignees=&labels=&template=bug_report.md&title=) und geben Sie umfassende Informationen ein.
In den meisten Fällen ist eine Protokolldatei für die Fehlersuche erforderlich. Bitte stellen Sie daher ein Debug-Protokoll bereit:

1. Instanz stoppen
2. Protokoll löschen
3. Stellen Sie die Instanz auf den Protokollierungsmodus „debug“ (oder je nach Art des Problems auch „silly“) ein.
4. Starten Sie eine Instanz und lassen Sie sie ca. 1 Minute lang laufen (oder länger, wenn Sie wissen, dass der Fehler erst nach längerer Zeit auftritt).
5. Protokoll in einer Datei speichern
6. Bitte fügen Sie der Problembeschreibung eine Protokolldatei bei (kein Inline-Protokoll, da dieses zu lang ist).

### Funktionswünsche und allgemeine Probleme
Öffnen Sie ein [leere Ausgabe](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/new) und beschreiben Sie, was der Adapter leisten soll und warum.
Bitte beachten Sie:

Der Adapter dient lediglich dazu, RSCP auszulösen und die Ergebnisse im Objektbaum von ioBroker bereitzustellen. Weiterverarbeitung und Speicherung erfolgen durch anderen Code.
* **Um nach derzeit nicht unterstützten RSCP-Namensräumen und -Tags zu suchen, konsultieren Sie bitte die offizielle E3/DC-Tag-Liste**, die mit der [Beispielanwendung](http://s10.e3dc.com/dokumentation/RscpExample.zip) bereitgestellt wird.
* Alles, was nicht in der RSCP-Tag-Liste aufgeführt ist oder anderweitig als geliefert gekennzeichnet wird, wird als „nicht im Leistungsumfang enthalten“ betrachtet.

<a name="sam"></a>

## Beispielskript Hier ist ein Beispielskript zur Ladebegrenzungssteuerung - es ist nicht zur direkten Verwendung gedacht, sondern dient nur dazu, zu demonstrieren, wie E3/DC-Werte verwendet werden könnten.
// Auslöser: Leistungsreduzierung erreicht, d. h. die Netzeinspeisung wird begrenzt. // Aktion: Ladeleistungsbegrenzung der Batterie auf den Maximalwert zurücksetzen, wie unter SYS_SPECS angegeben. on( { id: &#39;e3dc-rscp.0.EMS.POWER_GRID&#39;, valLe: -getState(&#39;e3dc-rscp.0.EMS.DERATE_AT_POWER_VALUE&#39;).val, change: &#39;lt&#39;, logic: &#39;and&#39; }, (obj) =&gt; { console.log(&#39;Auslöser: Netzeinspeisung erreicht den Schwellenwert für die Leistungsreduzierung – Ladeleistungsbegrenzung zurücksetzen&#39;); setState(&#39;e3dc-rscp.0.EMS.MAX_CHARGE_POWER&#39;, getState(&#39;e3dc-rscp.0.EMS.SYS_SPECS.maxBatChargePower&#39;).val ); });<a name="log"></a>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

(git-kick)
* "@iobroker/testing": "^5.2.2" - [Issue #301](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/301)
* Added JSDoc - [Issue #300](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/300)

### 1.4.5-alpha.1 (2026-01-26)

(git-kick)
* Added EMS.DPP_PRICE_LIMIT_WALLBOX - [Issue #284](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/284)
* Fixed EMS.DPP_SOC_BATTERY setter - [Issue #295](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/295)
* Settings: 
  * name space WB defaults to false (not everybody has an attached wallbox)
  * name space DCDC defaults to true (everybody has a DCDC converter)

### 1.4.5-alpha.0 (2026-01-09)

- Include [AlCalzone/release-script](https://github.com/AlCalzone/release-script)

### 1.4.4

(git-kick)
* Wording (de): now "DC-DC-Wandler" instead of "DC-DC-Konverter"
* Migrated to ESLint 9 and @iobroker/eslint-config - [Issue #246](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/246)
* fixed errors reported by the ioBroker Check and Service Bot:
  * \[W028\] now "node": ">=20" at package.json
  * \[W037\] now "@iobroker/adapter-dev": "^1.4.0" at package.json
  * \[W037\] now "@iobroker/testing": "^5.2.2" at package.json
  * \[W037\] now "@alcalzone/release-script": "^5.0.0" at package.json
  * \[W037\] now "@alcalzone/release-script-plugin-iobroker": "^4.0.0" at package.json
  * \[W037\] now "@alcalzone/release-script-plugin-license": "^4.0.0" at package.json
  * \[W037\] now "@alcalzone/release-script-plugin-manual-review": "^4.0.0" at package.json
  * \[S0064\] now "@iobroker/adapter-dev": "^1.5.0" at package.json

### 1.4.3

(db3wf)
* Added DCDC namespace - [Issue #273](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/273)

(git-kick)
* Added dynamic power prices tags `EMS.DPP...` - [Issue #247](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/247)
* Initialize DB.HISTORY_DATA_{DAY,WEEK,MONTH,YEAR}.TIME_{START,INTERVAL,SPAN} values only if not existing before  - [Issue #271](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/271)
* Fixed warnings and suggestions reported by the ioBroker Check and Service Bot:
  * \[W028\] now "node": ">=20" in package.json
  * \[W034\] now "adapter-core": "^3.3.2" in package.json
  * \[W037\] now "adapter-dev": "^1.4.0" in package.json
  * \[W037\] now "testing": "^5.1.0" in package.json
  * \[W050\] now "@types/html-to-text" is under "devDependencies" in package.json
  * \[W156\] now "admin": ">=7.6.17" in io-package.json
  * \[W156\] now "js-controller": ">=6.0.11" in io-package.json
  * \[W442\] added schema for jsonConfig files in .vscode/settings.json
  * \[W444\] added schema for JSON5 config files in settings.json
  * \[S532\] removed unused lib/tools.js
  * \[S906\] added ".commitinfo§ to .gitignore

### 1.4.2

(git-kick)
* introduced config value maxindex_wb - before, maxIndex["WB"] remained undefined in some cases - [Issue #262](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/262)
* restored EP_RESERVE is writable - [Issue #263](https://github.com/git-kick/ioBroker.e3dc-rscp/issues/263)
* fixed errors reported by the ioBroker Check and Service Bot:
  * \[E160\]\[E190\] "peerDependencies.iobroker.admin"  in package.json
  * \[605\] updated (c) 2025.
  * \[254\] removed v1.3.2 which was never released.
* removed duplicate queueWbRequestData() definition from main.js - the relevant one is in wallbox.js
* removed obsolete initialisation of maxIndex for BAT and PVI from constructor(). Both values are now initialized from config during initChannel().

## License
Copyright (c) 2026 Ulrich Kick <iobroker@kick-web.de>  
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