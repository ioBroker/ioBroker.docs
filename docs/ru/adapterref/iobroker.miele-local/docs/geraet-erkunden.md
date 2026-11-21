---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miele-local/docs/geraet-erkunden.md
title: Ein unbekanntes Miele-Gerät erkunden
hash: R4TkORKfjrXb8FS17OVS61YIw6y6uAgfYA2c9+HtOjM=
---
# Ein unbekanntes Miele-Gerät erkunden

Мы нашли, что Датен в Герат убер DOP2 Hergibt — и что Давон etwas beeuten. Geschrieben nach der Erkundung von WCR860 (Waschmaschine), G5840 (Spülmaschine) и H2469BP (Backofen) в сентябре 2026 г.

Адаптер принес все с собой, но это было не так важно. В Diese Anleitung говорится, что в welcher Reihenfolge man es benutzt und woran man scheitert, wenn man es anders macht.

---

## 1. Das Gerät muss erreichbar sein

Выбор является лучшим способом подключения: выбор IP-адреса, GroupID и GroupKey, `info.connection` steht auf `true`. Wie das zustande kommt, указанный в README — здесь это было danach kommt.

**Die wichtigste Eigenschaft des Geräts:** Ein Miele-Modul beantwortet immer nur **eine** Verbindung. Zwei gleichzeitige Anfragen Bringen es aus dem Tritt; дешалб шляпа `lib/api.js` eine Warteschlange. Wer sie umgeht, bekommt keine schnelleren Antworten, sondern gar keine.

---

## 2. Было ли главное сообщение: der Leaf-Scan

DOP2 addressiert Daten über `unit/attribute`. Vier Adressen sind aus fremden Projekten bekannt und am Gerät bestätigt:

| Лист   | Инхальт            |
| ------ | ------------------ |
| 2/119  | Betriebsstunden    |
| 2/256  | Rest- und Laufzeit |
| 2/1583 | Benutzeranfrage    |
| 2/6195 | Экообратная связь  |

Woher sie stammen, ist nicht dokumentiert. Был daneben noch antwortet, weiß niemand — и genau das findet der Scan heraus.

### So wird gescannt

Пункт данных `<gerät>.collection.scan` ауф `true` сетцен. Der Schalter **bleibt stehen** und bedeutet «scanne, bis Fertig», его nichts mehr offen ist oder der der Schalter umgelegt wird.

**Seit dem 13.11.2026 langsam und schonend** (vorher Durchgänge zu 40 Adressen im 5-s-Abstand, die die EK037-Module von Wash- und Spülmaschine in Unit 14 überforderten):

- **Jedes Gerät Hat seinen eigenen, unabhängigen Takt** (`lib/scanplaner.js`): **höchstens eine Anfrage je 25 s und Gerät** (Kontrollfrage eingeschlossen), nie zwei Anfragen gleichzeitig an dasselbe Gerät, Zeitlimit 8 s je Anfrage. Альтернативное использование параллельного модуля — это альтернативный модуль с собственным IP-адресом. Rückzug, Ruhe, Schonphase или hängendes Modul eines Geräts verzögern die anderen nicht. (Bis zum Abend des 13.11.2026 gab es einen gemeinsamen Planer für alle Geräte; der Backofen H2469BP, DOP2 nach 3–10 Anfragen lang hängt, hielt damit Wash- und Spülmaschine mit auf.)
- **Die Normale Abfrage Hat Vorrang:** Läuft gerade eine Anfrage an das Gerät or der Steht eine an (/State, EcoFeedback, Steuerbefehl), weicht der Scan aus und schaut nach 5 s wieder. Ein Gerät, das wartet (Ruhe, Rückzug, gebremst), schaut spätestens nach einer Minute Wieder, obsich etwas geändert Hat.
- Вы можете выбрать статус **из (1)** или **(2)** в течение 5 минут, **программировать (7)** в течение 2 минут и, что самое интересное, **в программе (5)** в течение нескольких минут, а также в течение нескольких минут и в течение 500 минут в программе. Grund (сообщение от 13.11.2026): Im Aus beantworten die EK037-Module schon die Kontrollfrage mit 500, sie Schlafen; Spülmaschine Steht nach dem Programm примерно через 9 минут после 7. Не нужно ничего делать, чтобы время/пауза/занятия не выполнялись, не задерживайтесь или не пользуйтесь новыми функциями. Ob das Modul wach ist, entscheidet die Kontrollfrage 2/1583 (Daten oder 404 = wach; 500/503 = schläft → 10 min Ruhe).
- **Rückzug bei Störungen** (Timeout, Verbindung abgelehnt/abgebrochen): 5, 10, 20, 30 мин. Пауза для нескольких дней, danach eine Stunde Schonphase mit höchstens einer Anfrage pro Minute (Backofen H2469BP: Тайм-ауты на \~10 Adressen im 25-s-Takt, /State Лиф Вейтер). Rückzug, Schonphase und Stufe gelten je Gerät. Die Stufe sint erst wieder, wenn die Schonphase ohne neue Störung abgelaufen ist – eine einzelne gute Antwort reicht nicht (sonst pendelt der Rückzug zwischen 5 и 10 min). На ваш адрес, Dreimal Stört или Bei wachem Modul Dreimal 503 Liefert, вы не получите больше удовольствия.
- **Сначала необходимо получить 404/500 ответов** , после чего модуль будет отправлен (5 минут) после того, как это произойдет, и сначала **вы ответите им, что откажетесь от ответа в течение 6 часов, если хотите, чтобы** адрес был окончательным. Alte Ergebnisse: ein 404 zählt als eine Bestätigung, ein 500 als keine (es kann aus einer Schlaffphase stammen — 2/1585 стоять так им Ergebnis und antwortet heute mit Daten).

Der Fortschritt steht in `collection.scanState`, die Ergebnisse in `collection.scanJson`. **Zum Teilen** (Форум, Fehlerbericht) `collection.scanJsonAnonym` нехмен: `scanJson` введите серийный номер (2/145), сменный EUI/MAC (14/1565), модульный номер (14/1566), MAC (14/1571) с указанием IP и WLAN-имени (14/1573), анонимный Fassung Maskiert Sie. Ответ на этот вопрос: Адаптер не может быть декодирован, также как и другие `antwortet: true` мит `status: 200`, dem Fehlertext unter `fehler` und den Rohbytes unter `roh`. Ein Adaptneustart setzt den Scan fort, solange der Schalter steht; gesichert wird nach jedem Treffer, nach zehn Antworten und beim Beenden.

### Die Bereiche und ihre Reihenfolge

`lib/leafscan.js`, Константин `BEREICHE` - Адрес 882, в dieser Reihenfolge:

1. `2/6100–6300` — Die Umgebung des EcoFeedback
2. `2/1500–1700` — die Umgebung der Benutzeranfrage
3. `2/1–400` — Zustand und Zeiten
4. `1/1–40` унд `3/1–40` — Gerätedaten, Конфигурация

**Die Reihenfolge ist die Aussicht auf Erfolg, nicht die Nummer.** До сентября 2026 г. был отправлен Unit 1, а сканирование не было сделано: Nach vier Wochen Standen 20 von 882 Adressen als geprüft, alle aus Unit 1, alle ohne Antwort. Ein Durchgang umfasst 40 Adressen und läuft nur, wenn die Maschine wach ist — wer die ersten achtzig davon auf einen Bereich verwendet, der nachweislich schweigt, kommt nie an die Stelle, and der etwas zu holen wäre.

### Wann gescannt wird

**Im Leerlauf, nicht während eines Programms.** Der Unterschied — это ужасно:

| Состояние              | Adressen je Durchgang        |
| ---------------------- | ---------------------------- |
| Programm läuft         | \~3                          |
| wach, aber im Leerlauf | \~24                         |
| аус                    | nur 500er, nichts verwertbar |

Лучший момент - это прямой путь к вашей программе, поэтому вы можете сделать это ночью и поразить других других людей.

**Weder am ausgeschalteten Gerät noch während eines Programms darf gescannt werden** und der Adaptor verhindert seit 0.3.29 beides selbst — gescannt wird nur im Leerlauf (Status 7): Ein ausgeschaltetes Modul beantwortet **jede** Adresse mit 500, und diese 500er sind von einem echten „gibt es nicht" nicht zu unterscheiden. Ein Scan, der so durchläuft, meldet danach «882 von 882 geprüft» и шляпа в Wahrheit nichts gefragt.

Der Scan wartet jetzt, statt Fehlurteile zu sammeln.

**Ein Beispiel, wie man sich dabei selbst täuscht.** Die Spülmaschine G5840 по номеру 875 по адресу mit 500 и genau **einen** Treffer, Während die baugleich angebundene Waschmaschine zehn Hatte. Это был один из артефактов, который можно было использовать для сканирования и просмотра. Beim genauen Hinsehen enthielt er aber **6 × 404** — и die lagen zusammen mit dem Treffer alle im 1500er-Bereich. Das Gerät Hatte также sehr wohl Auskunft gegeben, nur eben ausschließlich dort, wo es etwas zu sagen Hatte. **Ваш основной стимул: Die G5840 имеет функцию EcoFeedback-Leaf.**

Die Lehre позолочена в Beide Richtungen: Ein Ergebnis aus lauter 500ern ist wertlos — aber schon eine Handvoll 404er darin macht es gültig. Vor dem Verwerfen eines Scans также начинается, _wo_ die Differentzierten Antworten Ligen.

**Ein laufendes Programm ist genauso schlecht — das wurde zuerst übersehen.** Am 07.09.2026 lif der Scan an der _arbeitenden_ Spülmaschine und Liferte 102 Adressen, davon **102 mit 500, ausnahmslos** . Zur selben Zeit beantwortete die ebenfalls arbeitende Waschmaschine Anfragen auf `2/6192` — ein Leaf, das sie nachweislich Hat — nur noch mit Timeouts. Während eines Programms has das Modul keine Kapazität, und seine Absagen beeuten nichts.

**Die Probe auf ein brauchbares Ergebnis: Kommt mehr als eine Sorte Antwort?** Ein Gerät, das wirklich antwortet, unterscheidet — die Washmaschine Liferte 500er _und_ 404er _und_ Treffer. Ein Ergebnis aus lauter 500ern ist kein Ergebnis, egal wie viele Adressen Darin Stehen.

**Установите версию 0.3.31, скачав сам адаптер, чтобы его можно было использовать** (`gespraechsbereit`): Er fragt eine Adresse, die es nicht gibt, und wertet die Antwort aus — 404 heißt «ich gebe Auskunft», 500 oder Schweigen heißt «gerade nicht». Это означает, что вы можете выполнить сканирование «в режиме ожидания», чтобы начать войну: Der Gerätestatus sagt nichts über die Kapazität des Moduls. Eine Spülmaschine im Trocknen steht auf «In Betrieb» und wartet dabei nur; umgekehrt schalten manche Geräte nach dem Programm sofort ab und Zeigen nie einen Leerlauf.

**Die Kontrolladresse muss in einem Bereich Ligen, den das Gerät kennt.** Сначала стоит 2/6196 (не использовать EcoFeedback) — Spülmaschine kennt den gesamten 6000er-Bereich nicht und hätte damit dauerhaft als ausgelastet gegolten. Jetzt ist **2/1583** : Ответ на вопрос, как получить дифференциал, die Washmaschine mit einem Treffer, die Spülmaschine mit 404.

### Was einen Neustart überlebt — и было nicht

Drei Dinge Liefen als Schleife или Merkposten im Speicher, Während ihr Schalter auf der Platte стенд. Ein Adaptneustart nahm Jeweils das eine mit und Liß das andere stehen; der Zustand las sich danach als „läuft" und tat nichts, ohne eine Zeile im Log:

| Был                           | Симптом                                          | сейт           |
| ----------------------------- | ------------------------------------------------ | -------------- |
| Feinaufzeichnung              | zeichnete stumm nicht mehr auf                   | 0.3.26 behoben |
| Leaf-Scan-Dauerlauf           | Стойка для сканирования на 4 шт. от 882 Adressen | 0.3.27 behoben |
| Zählerstand bei Programmstart | `history.gemessenLetzter` блиб 0                 | 0.3.27 behoben |

Ausgelöst wurden alle drei durch etwas völlig Harmloses: **eine Konfigurationsänderung startet die Instantz neu.** Если вы используете Energiezähler einträgt, вы можете выполнить сканирование, а затем выполнить сканирование. Beim Bau eines langlaufenden Vorgangs gehört deshalb immer beides dazu — der Zustand in einem Datenpunkt _und_ eine Fortsetzung beim Adaptstart.

### Die Antworten und Was sie beeuten

| Муравьиная нить       | Bedeutung             | Behandlung                                      |
| --------------------- | --------------------- | ----------------------------------------------- |
| 200 + Вефдер          | Треффер               | wird gespeichert                                |
| 101, 404, 500         | „gibt es nicht"       | Adresse ist erledigt — **nur am wachen Gerät!** |
| **503**               | „gerade beschäftigt"  | **warten und erneut fragen**                    |
| Разъем завис, таймаут | Modul kommt nicht mit | nach 5 in Folge abbrechen                       |

Der Unterschied zwischen den Letzten Beiden Entcheidet, ob der Scan je Fertig Wird. Ein 503 ist eine höfliche Absage: Das Modul Hat Gehört und Bittet um Geduld. Darauf gehört Warten (2 с → 4 → 8 → 16 → 32, gedeckelt bei 60 с), kein Rückzug. Ein abgebrochener Socket dagegen heißt, dass das Modul **nicht konnte** — genau so kündigte sich am 04.09.2026 ein Ausfall an, bei dem die Waschmaschine ihre Verbindung local _und_ zur Cloud verlor und von selbst nicht zurückkam.

**Eine Absage - это nur dann eine Absage, когда Gerät sie ausgesprochen Hat.** Wer 503 als Ergebnis cangt, hakt Adressen ab, die nie gefragt wurden. утра 04.09. geschah genau das: Von 239 unbeantworteten Adressen kamen 132 mit 503 zurück, und zwei Leafs, die vorher Daten geliefert Hatten (2/122, 2/123), standen danach als erledigt im Ergebnis.

---

## 3. Was die gefundenen Leafs beeuten: der Werteverlauf

Ein Leaf mit siebenundvierzig Feldern ist eine Wand aus Zahlen. Прежде всего, вы должны были сделать это с вашими пожеланиями — и nur solche Felder können eine Messung tragen.

Die Aufzeichnung läuft von selbst: Alle drei Minuten werden die gefundenen Leafs erneut gelesen, **aber nur bei Geräten, die gerade arbeiten** . Ein Gerät im Standby Lifert Dieselben Zahlen wie vor Einer Stunde.

- `collection.trendJson` — je Leaf und Feld eine Reihe von Wertwechseln mit Zeitstempel
- `collection.trendSize` — Umfang der Ablage

### Wenn die drei Minuten nicht reichen

Если вы хотите, чтобы программа была разработана, это необходимо. Für **schaltende Verbraucher** ist sie es nicht: Das Heizelement der WCR860 taktet im Minutenrhythmus zwischen 2200 W und Standby (06.09.2026 и 86 Sprünge über 800 W). Jede Drei-Minuten-Messung fällt in einen zufälligen Takt — ein vorhandenes Schaltbit ist so grundsätzlich nicht von Rauschen zu unterscheiden. Genau das war das Ergebnis: Über 24 aufgezeichnete Wahrheitswerte lag die beste Trennschärfe bei 7,6 % gegen 0,6 %, а также Zufall.

Dafür gibt es `collection.trendLeaf`: die Leaf-Adresse eintragen, und **dieses eine Leaf** wird alle zwanzig Sekunden gelesen, Während die Normale Runde für das Gerät aussetzt. Die Last bleibt Dieselbe — ein Leaf alle 20 s statt Zehn alle alle 3 min —, die Auflösung wird neunfach feiner. Sie endet von selbst mit dem Programm.

**Damit fiel die Zuordnung sofort.** Запись на 2/6192 минуты:

| Поле 1 в 2/6192 | Leistung an der Steckdose    |
| --------------- | ---------------------------- |
| `[8, true, 0]`  | 2102 – 2230 Вт (6 Мессунген) |
| `[8, false, 0]` | 7–80 Вт (7 Мессунген)        |

Zwei Kilowatt Abstand zwischen den Gruppen, keine Überlappung: **Field 1 ist das Heizelement.** Alle elf Felder des Leafs haben Dieselbe Form `[8, bool, 0]` — 2/6192 ist die **Schaltzustandstabelle der Aktoren** . Положите 3 шт. в одну фазу с немецкими клеммами Lasten (Mittel 220 Вт или 48 Вт) и используйте насос или вентиляцию.

Die Lehre ist allgemein: **Если бы Schaltbit был таким, muss schneller abtasten als das Bauteil schaltet.** Kein Ergebnis bei grober Abtastung ist kein Beleg for ein fehlendes Signal.

**Nur Wechsel werden Gespeichert.** Ein Feld, das eine Woche lang `7` zeigt, belegt einen Eintrag statt dreitausend. Это интересная информация: Eine Zahl, die Stillsteht, ist Konfiguration und keine Messung.

**Der Gerätezustand wird mitgeschrieben** (Цвейг `_zustand`): Программа, Фаза, Статус, Температура Солнца, Дрейзал. Ohne ihn ist keine Zahlenreihe zu deuten — «608, 368, −378, −598» wird erst zur Aussage, когда нужно, чтобы машина работала, spülte или schleuderte.

### Die Falle beim Auslesen

`dop2.parseLeaf` Liefert je Feld ein Paar aus Typ und Wert. Bei Listen ist der Wert **selbst wieder** eine Liste solcher Paare. Wer nur die oberste Schicht abstreift, speichert `[{'type':'u8','value':3}, …]` статт `[3, …]` — und keine Auswertung kann damit etwas anfangen. `MieleLocal.reinerWert()` löst das rekursiv auf; Испытает дазу в `test/leafwerte.js`.

---

## 4. Deuten: von der Zahlenreihe zur Bedeutung

Die Reihenfolge, in der sich Fragen beantworten lassen:

**а) Welche Felder bewegen sich überhaupt?** `leafverlauf.bewegt(von, bis)` über die Dauer eines Programms. Alles Unbewegte scheidet aus.

**б) Passt der Verlauf zu einer bekannten Größe?** Die stärksten Belege kommen aus Werten, die das Gerät selbst nennt:

- **Температура раствора** (`state.targetTemperature`) — ein Feld, das darauf zuläuft und dort stehenbleibt, ist die Istemperatur. Итак, где будет Фельд 9 в 2/6193: 23 → 29 → 35 → 41 → 44 → 50 → 55 → **60** при Зольверте 60, в Хальтене, в Абфолле в Шпюлене.
- **Фаза программы** — в поле, дас гену беим вехсель ауф «Шлейдерн» пружинит, шляпа с барабаном цу тун.
- **Cloud-Werte** — solange die Cloud angebunden ist, ist sie die Gegenprobe. Итак, wurde der Wasserverbrauch belegt (Поле 21 в 2/6195, получено 199,4, на 0,5 % от общего числа).
- **Messsteckdose** — für den Stromverbrauch die einzige verlässliche Quelle.

**в) Было ли ist eine Ableitung, keine Messung?** `lib/feldsuche.js` prüft, ob zwei Felder в празднике Verhältnis stehen. Feld 25 in 2/6195 sah lange nach der Energie aus — bis sich zeigte, dass es Feld 26 × 1,7822 ist, также eine Umrechnung ohne eigenen Messwert.

**г) Vorzeichen und Sprünge lesen.** Негативные Werte schließen manche Deutungen aus (ein Füllstand wird nicht negativ), legen andere nahe (Drehrichtung, Regelabweichung). Ein Feld, das von 1200 auf 9 einbricht, Während die Phase auf «Knitterschutz» wechselt, Hat mit der Trommeldrehzahl zu Tun.

### Was sich nicht finden ließ

**Die Gesamtenergie Steht in keinem Feld von 2/6195.** Geprüft wurden alle 47 Felder in vier Ableitungen (Endwert, Differenz, Maximum, Spanne) gegen elf Vergleichswerte; das beste Feld отстает на 25 %. Der Grund ist grundsätzlich: `eco.energyWh` (Поле 25) ist die **Heizenergie-Vorgabe** für die Hauptwäsche — geplante Heizzeit (Feld 26, s) × 2020 W bei 230 V, gesetzt zu Beginn der Heizung, keine Messung (Befund 13.11.2026, 31 Läufe). Am 09.03.2026 принадлежит: Der Wert стенд 2:40 Stunden unverändert auf 770 Wh, während der Shelly von 0 auf 847 Wh stieg; über den ganzen Lauf maß der Shelly 1158 Wh. Feld 16 zählt dagegen laufend die **Antriebsenergie** (ohne Heizstab, Wh); auch Feld 25 + Feld 16 trifft den Gesamtverbrauch nicht (im Mittel 40 % daneben).

Ein zweites Argument, das hier lange stand, ist **falsch und zurückgenommen** : Eine Rewards über Wassermenge × Temperaturhub ergab 0,000486 кВтч/(л·К), а также 42 % теплового режима Вассера — было недопустимо. Der Fehler лежит в der Wassermenge: Die genannten Liter sind der **Gesamtverbrauch über alle Wasch- und Spülgänge** , geheizt wird nur die Hauptwäsche. Dieselbe Rechnung auf den Katalogwert der Anleitung angewandt (Baumwolle 60 °C: 1,45 кВтч при 65 л и 55 °C Wäschetemperatur) составляет 48 % — für einen Wert aus dem EU-Prüfprogramm. Wo eine Plausabilitätsrechnung auch die geprüfte Referenz verwirft, ist die Rechnung более широкий, nicht die Referenz.

Der Messbeleg oben trägt allein. **Der Vergleich mit der Anleitung ist die naheliegende Gegenprobe** und steht in `docs/` -Nachbarschaft noch aus: Die Verbrauchsdatentabelle nennt je Programm Energie und Wasser bei Nennbeladung, und die Anleitung sagt selbst, dass die im Feedback angezeigten Werte davon abweichen können. Zusatzoptionen wirken laut Anleitung gerichtet auf die Energie — _Quick_ , _Intensiv_ und _AllergoWash_ erhöhen sie, _Extra schonend_ senkt sie —, ohne dass die Tabelle den Betrag beziffert.

---

## 5. Был ли ein neues Gerät braucht

Wenn der Scan Treffer Lifert und der Verlauf zeigt, welche Felder tragen:

1. **Objekte anlegen** —`lib/objects.js`, dort steht die Beschreibung aller Datenpunkte and einer Stelle. Nie an zwei Stellen definieren: Zwei Definitionen Liefen в сентябре 2026 г. auseinander, und jedes laufende Programm setzte die Umbenennung zurück.
2. **Abfrage einhängen** — как собственный таймер с собственным интервалом, после чего он будет собран. `pollEco` /`pollHours`. Mit Rücksicht auf die eine Verbindung.
3. **Absagen zählen** — nicht jedes Modell шляпа jedes Leaf. Nach mehreren echten Absagen (nicht 503!) die Abfrage einstellen und die Objekte entfernen, statt ewig weiterzufragen.
4. **Prüfroutine anlegen** —`lib/kontrolle.js` vergleicht laufend gegen eine zweite Quelle und meldet, wenn die Zuordnung nicht mehr trägt.

---

## Werkzeuge im Überblick

| Датей                | Вофюр                                                          |
| -------------------- | -------------------------------------------------------------- |
| `lib/leafscan.js`    | Adressbereiche, Fortschritt, Absage gegen Störung              |
| `lib/leafverlauf.js` | Werteverlauf, Zustandsaufzeichnung, `bewegt()`                 |
| `lib/feldsuche.js`   | Feld gegen Vergleichswerte prüfen, feste Verhältnisse erkennen |
| `lib/kontrolle.js`   | laufende Gegenprobe einer eingestellten Zuordnung              |
| `lib/objects.js`     | Beschreibung aller Datenpunkte                                 |

Die Ablagen unter `<gerät>.sammlung` sind Werkzeuge, keine Duereinrichtung: Sie lassen sich wegwerfen, sobald klar ist, welche Felder taugen.