---
chapters: {"pages":{"en/adapterref/iobroker.mielecloudservice/README.md":{"title":{"en":"ioBroker.mielecloudservice"},"content":"en/adapterref/iobroker.mielecloudservice/README.md"},"en/adapterref/iobroker.mielecloudservice/machine_states.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mielecloudservice/machine_states.md"}}}
---
## Documentation
Please mainly refer to the main API documentation published by Miele
* [General Documentation](https://www.miele.com/developer/swagger-ui/index.html)

There are some data points available in 2 kinds. As a human-readable text and as a number.
These numeric data fields belonging to a text field have the same name, but a "_raw" appended.
Those fields which have a general meaning are listed below.
The fields which aren't listed vary in their meaning from device to device and are not documented by Miele.
If you need to refer in scripts to these fields, always use the _raw values.
The text values may change in the future and also depend on the language.
Here is a list of what these raw values stand for:

### DeviceTypes

| Raw value | State                                            |
|-----------|--------------------------------------------------|
| 1         | WASHING MACHINE                                  |
| 2         | TUMBLE DRYER                                     |
| 7         | DISHWASHER                                       |
| 8         | DISHWASHER SEMI-PROF                             |
| 12        | OVEN                                             |
| 13        | OVEN MICROWAVE                                   |
| 14        | HOB HIGHLIGHT                                    |
| 15        | STEAM OVEN                                       |
| 16        | MICROWAVE                                        |
| 17        | COFFEE SYSTEM                                    |
| 18        | HOOD                                             |
| 19        | FRIDGE                                           |
| 20        | FREEZER                                          |
| 21        | FRIDGE-/FREEZER COMBINATION                      |
| 23        | VACUUM CLEANER, AUTOMATIC ROBOTIC VACUUM CLEANER |
| 24        | WASHER DRYER                                     |
| 25        | DISH WARMER                                      |
| 27        | HOB INDUCTION                                    |
| 28        | HOB GAS                                          |
| 31        | STEAM OVEN COMBINATION                           |
| 32        | WINE CABINET                                     |
| 33        | WINE CONDITIONING UNIT                           |
| 34        | WINE STORAGE CONDITIONING UNIT                   |
| 39        | DOUBLE OVEN                                      |
| 40        | DOUBLE STEAM OVEN                                |
| 41        | DOUBLE STEAM OVEN COMBINATION                    |
| 42        | DOUBLE MICROWAVE                                 |
| 43        | DOUBLE MICROWAVE OVEN                            |
| 45        | STEAM OVEN MICROWAVE COMBINATION                 |
| 48        | VACUUM DRAWER                                    |
| 67        | DIALOGOVEN                                       |
| 68        | WINE CABINET FREEZER COMBINATION                 | 


### State/Status

| Raw value | State                       |
|-----------|-----------------------------|
| 1         | OFF                         |
| 2         | STAND_BY                    |
| 3         | PROGRAMMED                  |
| 4         | PROGRAMMED_WAITING_TO_START |
| 5         | RUNNING                     |
| 6         | PAUSE                       |
| 7         | END_PROGRAMMED              |
| 8         | FAILURE                     |
| 9         | PROGRAMME_INTERRUPTED       |
| 10        | IDLE                        |
| 11        | RINSE_HOLD                  |
| 12        | SERVICE                     |
| 13        | SUPERFREEZING               |
| 14        | SUPERCOOLING                |
| 15        | SUPERHEATING                |
| 144       | DEFAULT                     |
| 145       | LOCKED                      |
| 146       | SUPERCOOLING_SUPERFREEZING  |
| 255       | Device offline              |

### ProgramType/Programmart

| Raw value | State                  |
|-----------|------------------------|
| 0         | Normal operation mode  |
| 1         | Own program            |
| 2         | Automatic program      |
| 3         | Cleaning-/Care program |

### dryingStep/Trockenstufe

| Raw value | State             |
|-----------|-------------------|
| 0         | Extra dry         |
| 1         | Normal Plus       |
| 2         | Normal            |
| 3         | Slightly Dry      |
| 4         | Hand iron level 1 |
| 5         | Hand iron level 2 |
| 6         | Machine iron      |

### Programmbezeichnung

| Raw value | State                   | available for   |
|-----------|-------------------------|-----------------|
|         1 | "Baumwolle" / "Cotton"  | Washing Machine |
|         3 | "Pflegeleicht"          | Washing Machine |
|         4 | "Feinwäsche"            | Washing Machine |
|         8 | "Wolle"                 | Washing Machine |
|         9 | "Seide"                 | Washing Machine |
|        21 | "Pumpen/Schleudern"     | Washing Machine |
|        23 | "Oberhemden"            | Washing Machine |
|        27 | "Imprägnieren"          | Washing Machine |
|        29 | "Sportwäsche"           | Washing Machine |
|        31 | "Automatic plus"        | Washing Machine |
|        37 | "Outdoor"               | Washing Machine |
|        48 | "Flusen ausspülen"      | Washer Dryer    |
|        50 | "Dunkle Wäsche"         | Washer Dryer    |
|        52 | "Nur Spülen/Stärken"    | Washing Machine |
|       122 | "Express 20"            | Washer Dryer    |
|       123 | "Dunkles/Jeans"         | Washing Machine |

### ProgramPhase

| Raw value | State                     | available for               |
|-----------|---------------------------|-----------------------------|
| 258       | "Einweichen"              | Washing Machine             | 
| 260       | "Waschen" / "Washing"     | Washing Machine             |
| 261       | "Spülen"  / "Rinse"       | Washing Machine             |
| 265       | "Pumpen"                  | Washing Machine             |
| 266       | "Schleudern" / "Spinning" | Washing Machine             |
| 267       | "Knitterschutz" / ""      | Washing Machine             |
| 268       | "Ende" / "End"            | Washing Machine             |
| 256       | "Vorbügeln"               | Washing Machine             |
| 512       | "Ende" / "Finished"       | Tumble dryers               |
| 514       | "Trocknen" / "Drying"     | Washer Dryer, Tumble dryers |
| 519       | "Abkühlen" / "Cool down"  | Washer Dryer                |
| 521       | "Knitterschutz" / ""      | Tumble dryer                |
| 522       | "Ende" / "Finished"       | Tumble dryer                |
| 531       | "Komfortkühlen"           | Tumble Dryer                |
| 532       | "Flusen ausspülen"        | Washer Dryer                |