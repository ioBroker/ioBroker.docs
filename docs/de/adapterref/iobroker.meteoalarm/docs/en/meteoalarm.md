---
chapters: {"pages":{"en/adapterref/iobroker.meteoalarm/README.md":{"title":{"en":"ioBroker.meteoalarm"},"content":"en/adapterref/iobroker.meteoalarm/README.md"},"en/adapterref/iobroker.meteoalarm/docs/en/meteoalarm.md":{"title":{"en":"ioBroker.meteoalarm"},"content":"en/adapterref/iobroker.meteoalarm/docs/en/meteoalarm.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/docs/en/meteoalarm.md
title: ioBroker.meteoalarm
hash: v5pPz+oJj5kfFFniftY6Og4UQ12pXtU95W7pViDENVo=
---
# ioBroker.meteoalarm

## Fügen Sie es Ihrer Ansicht hinzu

Am einfachsten fügen Sie es Ihrer Ansicht hinzu, indem Sie das Widget „basic - html“ verwenden und dort {meteoalarm.0.htmlToday} eingeben. Dadurch erhalten Sie ein vordefiniertes HTML-Widget, das Sie in der Adapterkonfiguration anpassen können.

# Aufstellen

## Einstellungen

"Keine Hintergrundfarbe im HTML-Widget": Möglichkeit, das HTML-Widget ohne Hintergrundfarbe zu verwenden (z. B. wenn Sie das Farbobjekt verwenden möchten, um Ihr gesamtes Widget zu füllen, nicht nur das HTML-Widget).

"Weiße Symbole verwenden": Verwenden Sie weiße Symbole anstelle von schwarzen.

"Icons": Definieren Sie die Größe des Icons im HTML-Widget.

"Keine Symbole im Widget": Verwenden Sie das Symbol nicht im HTML-Widget. Sie können weiterhin über die Objekte darauf zugreifen. Dies ist nützlich, wenn Sie das Symbol separat vom Widget anzeigen möchten – z. B. in einer größeren Größe.

Im Header des Widgets soll anstelle des Wochentags „heute“, „morgen“ oder „gestern“ „heute“ angezeigt werden.

„Warnfarben definieren“: Möglichkeit, die Farben für die verschiedenen Alarmstufen im Hexadezimalcode festzulegen. Wird für HTML-Widgets und auch für das Farbobjekt verwendet, um es einem anderen Widget manuell zuzuweisen.

## Alarmtypen einrichten

Hier können Sie festlegen, welche Alarmstufen und Alarmtypen überwacht werden. Dies wirkt sich auf die Alarmobjekte, das HTML-Widget und das JSON-Objekt aus.

## Benachrichtigungen

Es ist möglich, sich die Benachrichtigungen vom Adapter per E-Mail, Telegramm, Signal oder Pushover senden zu lassen.

- Signal
- Post
- Leichtgläubig
- Telegramm
- Synochat

Verfügbare Einstellungen:

- Standort anzeigen: Wenn diese Einstellung aktiviert ist, wird der Standortname der Benachrichtigung hinzugefügt.
- Warnstufe in Worten: Fügen Sie die Warnstufe zusätzlich zu den Warnsymbolen in Worten hinzu.
- Keine Details: Fügen Sie der Benachrichtigung keine Beschreibung der Warnung hinzu – z. B. für Alexa.
- „Keine Warnungen senden“: Eine Benachrichtigung senden, wenn alle Alarme beendet sind und aktuell keine Warnung vorliegt.
- Warnsymbole: Wählen Sie aus, welche Symbole der Benachrichtigung hinzugefügt werden sollen.

## Benachrichtigungsalarmtypen

Hier können Sie festlegen, welche Alarmstufen und -typen für die Benachrichtigungen verwendet werden. Wichtig: Wenn eine Stufe oder ein Typ in den „Alarmtypen“ nicht definiert ist, kann er auch nicht in den Benachrichtigungen erfasst werden.

# Objekte

## Allgemeine Objekte

|       Objektname      |                                                  Beschreibung                                                 |
| :-------------------: | :-----------------------------------------------------------------------------------------------------------: |
|          JSON         |      JSON-Datei mit allen Alarmen. Struktur: Ereignis, Beschreibung, Ebene, Startdatum, Symbol, Alarmtyp      |
|         Farbe         |                                  Farbcode der höchsten verfügbaren Alarmstufe                                 |
|       htmlToday       |                               HTML-Widget-Code (in den Einstellungen anpassbar)                               |
| letzte Aktualisierung |                                      Letzte Aktualisierung von Meteoalarm                                     |
|         Ebene         |                                              Maximale Alarmstufe                                              |
|          Link         |                                                   Feed-Link                                                   |
|        Standort       |                                               Name des Standorts                                              |
|      keine Alarme     |                                         Anzahl der verfügbaren Alarme                                         |
|    Benachrichtigung   | Objekt, das sich ändert, wenn ein neuer Alarm hinzugefügt wird. Kann für Benachrichtigungen verwendet werden. |

## Objekte für jeden Alarm

Für jeden Alarm werden diese Objekte erstellt.

|       Objektname       |                                                Beschreibung                                               |
| :--------------------: | :-------------------------------------------------------------------------------------------------------: |
|          Farbe         | Hexadezimalcode für Alarm – kann in den Einstellungen für die verschiedenen Alarmstufen angepasst werden. |
|      Beschreibung      |                                       Lange Beschreibung des Alarms                                       |
|         wirksam        |                                   Startdatum/-zeit des Alarmereignisses                                   |
|        Ereignis        |                                                Ereignistyp                                                |
|        läuft ab        |                                    Enddatum/-zeit des Alarmereignisses                                    |
|       Überschrift      |                                        Kurzbeschreibung des Alarms                                        |
|         Symbol         |                                              Link zum Symbol                                              |
|          Ebene         |                                      Stufe (siehe Alarmstufen unten)                                      |
|        levelText       |                                              Niveau in Worten                                             |
|          Link          |                                                Link zu XML                                                |
|        Absender        |                         Wer hat den Alarm gesendet (z. B. Deutscher Wetterdienst)?                        |
|        gesendet        |                                      Datum/Uhrzeit der Alarmauslösung                                     |
|           Typ          |                                 Alarmtyp als Zahl (siehe Alarmtypen oben)                                 |
|        typeText        |                                 Alarmart in Worten (siehe Alarmarten oben)                                |
| Aktualisierungskennung |                                               Nicht relevant                                              |

# Alarmdetails

## Alarmstufen

| Alarmstufe | Nummer |                                                                                                                                                       Beschreibung                                                                                                                                                       |
| :--------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    Grün    |    1   |                                                                                                                                          Im Moment ist keine Warnung verfügbar.                                                                                                                                          |
|    Gelb    |    2   | Das Wetter ist potenziell gefährlich. Die vorhergesagten Wetterphänomene sind zwar nicht ungewöhnlich, dennoch sollte man Aktivitäten, die meteorologischen Risiken ausgesetzt sind, besondere Aufmerksamkeit widmen. Informieren Sie sich über die zu erwartenden Wetterbedingungen und vermeiden Sie unnötige Risiken. |
|   Orange   |    3   |                                   Das Wetter ist gefährlich. Es wurden ungewöhnliche Wetterphänomene vorhergesagt. Schäden und Unfälle sind wahrscheinlich. Seien Sie äußerst aufmerksam und vorsichtig und informieren Sie sich regelmäßig über die zu erwartenden Wetterbedingungen.                                   |
|     Rot    |    4   |                                                            Das Wetter ist extrem gefährlich. Es wurden ungewöhnlich starke Wetterphänomene vorhergesagt. Es drohen extreme Schäden und Unfälle, oft großflächig, die Leib und Leben sowie Eigentum gefährden.                                                            |

## Alarmtypen

| Alarmtyp |     Beschreibung    |
| :------: | :-----------------: |
|     1    |         Wind        |
|     2    |      Schnee/Eis     |
|     3    |   Donner und Blitz  |
|     4    |        Nebel        |
|     5    |   Hohe Temperatur   |
|     6    | Niedrige Temperatur |
|     7    | Küstenveranstaltung |
|     8    |      Waldbrand      |
|     9    |        Lawine       |
|    10    |        Regen        |
|    11    |      Unbekannt      |
|    12    |         Flut        |
|    13    |      Regenflut      |

# Unterstützte Länder

- Österreich
- Deutschland
- Belgien
- Bosnien und Herzegowina
- Kroatien
- Zypern
- Tschechische Republik
- Dänemark
- Estland
- Finnland
- Frankreich
- Griechenland
- Ungarn
- Island
- Israel
- Italien
- Lettland
- Litauen
- Luxemburg
- Malta
- Niederlande
- Norwegen
- Polen
- Rumänien
- Serbien
- Slowakei
- Slowenien
- Spanien
- Schweden
- Schweiz
- Vereinigtes Königreich

Falls Ihr Land nicht aufgeführt ist, erstellen Sie bitte ein Issue auf GitHub, und ich füge es gerne hinzu.

# Nicht unterstützte Länder

- Portugal (Die Geocode-Datei von meteoalarm.org ist wahrscheinlich fehlerhaft)
- Bulgarien (die Geocode-Datei von meteoalarm.org ist wahrscheinlich fehlerhaft)