---
chapters: {"pages":{"en/adapterref/iobroker.mielecloudservice/README.md":{"title":{"en":"ioBroker.mielecloudservice"},"content":"en/adapterref/iobroker.mielecloudservice/README.md"},"en/adapterref/iobroker.mielecloudservice/machine_states.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mielecloudservice/machine_states.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mielecloudservice/machine_states.md
title: kein Titel
hash: RUjYtlvTbnsXieNOxTwq8933LJO+wYHM4TGLZOsoWsY=
---
## Dokumentation

Bitte beachten Sie hauptsächlich die von Miele veröffentlichte API-Dokumentation.

- [Allgemeine Dokumentation](https://www.miele.com/developer/swagger-ui/index.html)

Einige Datenpunkte liegen in zwei Formaten vor: als lesbarer Text und als Zahl. Diese numerischen Datenfelder, die zu einem Textfeld gehören, haben denselben Namen, jedoch mit dem Suffix „\_raw“. Die Felder mit allgemeiner Bedeutung sind unten aufgeführt. Die nicht aufgeführten Felder haben je nach Gerät unterschiedliche Bedeutungen und sind von Miele nicht dokumentiert. Wenn Sie in Skripten auf diese Felder zugreifen müssen, verwenden Sie immer die „\_raw“-Werte. Die Textwerte können sich zukünftig ändern und sind zudem sprachabhängig. Hier ist eine Liste der Bedeutungen dieser Rohwerte:

### Gerätetypen

| Rohwert | Zustand                                       |
| ------- | --------------------------------------------- |
| 1       | WASCHMASCHINE                                 |
| 2       | Wäschetrockner                                |
| 7       | SPÜLMASCHINE                                  |
| 8       | HALBPROFESSIONELLER GESCHIRRSPÜLER            |
| 12      | OFEN                                          |
| 13      | Backofen Mikrowelle                           |
| 14      | HOB-HIGHLIGHT                                 |
| 15      | DAMPFBACKOFEN                                 |
| 16      | MIKROWELLE                                    |
| 17      | KAFFEESYSTEM                                  |
| 18      | HAUBE                                         |
| 19      | KÜHLSCHRANK                                   |
| 20      | GEFRIERSCHRANK                                |
| 21      | KÜHLSCHRANK-/GEFRIERKOMBINATION               |
| 23      | Staubsauger, automatischer Roboterstaubsauger |
| 24      | WASCHMASCHINE TROCKNER                        |
| 25      | GESCHIRRWÄRMER                                |
| 27      | Induktionskochfeld                            |
| 28      | Gaskochfeld                                   |
| 31      | DAMPFBACKOFEN-KOMBINATION                     |
| 32      | WEINSCHRANK                                   |
| 33      | WEINKONSERVIERUNGSANLAGE                      |
| 34      | WEINLAGER-KONTURIERUNGSEINRICHTUNG            |
| 39      | DOPPELBACKOFEN                                |
| 40      | DOPPELDAMPFBACKOFEN                           |
| 41      | DOPPEL-DAMPFBACKOFEN-KOMBINATION              |
| 42      | DOPPELMIKROWELLE                              |
| 43      | DOPPEL-MIKROWELLE                             |
| 45      | DAMPFBACKOFEN-MIKROWELLE-KOMBINATION          |
| 48      | Staubschublade                                |
| 67      | DIALOGOVEN                                    |
| 68      | Weinschrank-Gefrierkombination                |

### Status

| Rohwert | Zustand                         |
| ------- | ------------------------------- |
| 1       | AUS                             |
| 2       | STEHEN ZU                       |
| 3       | PROGRAMMIERT                    |
| 4       | PROGRAMMIERT\_WARTET\_UM\_START |
| 5       | LÄUFT                           |
| 6       | PAUSE                           |
| 7       | PROGRAMM ENDE                   |
| 8       | VERSAGEN                        |
| 9       | PROGRAMM\_UNTERBROCHEN          |
| 10      | LEERLAUF                        |
| 11      | SPÜLEN\_HALTEN                  |
| 12      | SERVICE                         |
| 13      | SUPERGEFRIEREN                  |
| 14      | UNTERKÜHLUNG                    |
| 15      | ÜBERHITZUNG                     |
| 144     | STANDARD                        |
| 145     | GESPERRT                        |
| 146     | SUPERKÜHLUNG\_SUPERGEFRIEREN    |
| 255     | Gerät offline                   |

### Programmtyp/Programmart

| Rohwert | Zustand                    |
| ------- | -------------------------- |
| 0       | Normaler Betriebsmodus     |
| 1       | Eigenes Programm           |
| 2       | Automatisches Programm     |
| 3       | Reinigungs-/Pflegeprogramm |

### Trocknungsstufe

| Rohwert | Zustand                |
| ------- | ---------------------- |
| 0       | Extra trocken          |
| 1       | Normal Plus            |
| 2       | Normal                 |
| 3       | Leicht trocken         |
| 4       | Handbügeleisen Stufe 1 |
| 5       | Handbügeleisen Stufe 2 |
| 6       | Maschineneisen         |

### Programmbezeichnung

| Rohwert | Zustand                      | verfügbar für          |
| ------- | ---------------------------- | ---------------------- |
| 1       | "Baumwolle" / "Baumwolle"    | Waschmaschine          |
| 3       | "Pflegeleicht"               | Waschmaschine          |
| 4       | "Feinwäsche"                 | Waschmaschine          |
| 8       | "Wolle"                      | Waschmaschine          |
| 9       | "Seide"                      | Waschmaschine          |
| 21      | "Pumpen/Schleudern"          | Waschmaschine          |
| 23      | "Oberhemden"                 | Waschmaschine          |
| 27      | "Imprägnieren"               | Waschmaschine          |
| 29      | "Sportwäsche"                | Waschmaschine          |
| 31      | "Automatik plus"             | Waschmaschine          |
| 37      | "Im Freien"                  | Waschmaschine          |
| 48      | "Flusen aus dem Waschbecken" | Waschmaschine Trockner |
| 50      | "Dunkle Wäsche"              | Waschmaschine Trockner |
| 52      | "Nur Spülen/Stärken"         | Waschmaschine          |
| 122     | "Express 20"                 | Waschmaschine Trockner |
| 123     | "Dunkles/Jeans"              | Waschmaschine          |

### Programmphase

| Rohwert | Zustand                      | verfügbar für                 |
| ------- | ---------------------------- | ----------------------------- |
| 258     | "Einweichen"                 | Waschmaschine                 |
| 260     | "Waschen" / "Washing"        | Waschmaschine                 |
| 261     | "Spülen" / "Rinse"           | Waschmaschine                 |
| 265     | "Pumpen"                     | Waschmaschine                 |
| 266     | "Schleudern" / "Spinning"    | Waschmaschine                 |
| 267     | "Strickschutz" / ""          | Waschmaschine                 |
| 268     | "Ende" / "Ende"              | Waschmaschine                 |
| 256     | "Vorbügeln"                  | Waschmaschine                 |
| 512     | "Ende" / "Fertig"            | Wäschetrockner                |
| 514     | "Trocknen" / "Drying"        | Waschmaschine, Wäschetrockner |
| 519     | "Abkühlen" / "Cool down"     | Waschmaschine Trockner        |
| 521     | "Strickschutz" / ""          | Wäschetrockner                |
| 522     | "Ende" / "Fertig"            | Wäschetrockner                |
| 531     | "Komfortkühlen"              | Wäschetrockner                |
| 532     | "Flusen aus dem Waschbecken" | Waschmaschine Trockner        |