---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miele-local/README_de.md
title: ioBroker.miele-local
hash: TmQ6r+Jh/fKIX0P8RlkR/0lT3RBrspxP6+eujw/f4ds=
---
![Логотип](../../../en/adapterref/iobroker.miele-local/admin/miele-local.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.miele-local.svg)
![Лицензия: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

# ioBroker.miele-local

_Diese Dokumentation in einer anderen Sprache lesen: [Документация на английском языке](/#/adapters/miele-local) ._

Адаптер для современного **устройства Miele\@Home** — **для локального подключения к Интернету** . Er spricht das lokale Miele-Protokoll (`MieleH256` / DOP2) напрямую к локальной сети – используйте Cloud-Konto в лауфендене Betrieb, kein Umweg über die Miele 3rd-Party-Cloud-API.

> Чтобы **войти в систему** с помощью Miele-Konto, необходимо сначала отключить локальный шлюз (GroupID/GroupKey). Полностью отключенный адаптер работает в автономном режиме, а приложение Miele-App работает бездействующим.

**Было так:** Er ist den Zustand jedes Geräts im Klartext, schreibt jedes abgeschlossene Programm mitsamt Verbrauch mit und startet, stoppt und pausiert die Geräte, wenn man es erlaubt. **Было сделано:** eine einmalige Anmeldung und entweder mDNS в сети или IP-адресе.

## Schnellstart

1. Адаптер устанавливается и мгновенно устанавливается.
2. Im Reiter **Anmeldung** das Land wählen und den drei Schritten unten folgen.
3. Die abgefangene `miele://…` - Введите адрес и **нажмите кнопку GroupKey** .
4. Шпайхерн. Адаптер находится в упаковке и легок в использовании.

Läuft ioBroker в Docker-Container с Bridge-Netz, findet die suche nichts – dann die IP-addressen im Reiter **Geräte** von Hand eintragen. Зихе [Нетц](#netz-ports-docker-push) .

### Die Anmeldung, Schritt für Schritt

Die letzte Adresse benutzt das `miele://` -Схема Handy-App. Браузер, когда вы не знаете, что делать, должен быть на странице, где вы находитесь, и человек, который больше всего знает адрес, указанный в браузере.

1. **Используйте Entwicklertools.** Auf **Login-Seite öffnen** klicken – ein neuer Reiter geht auf. Дорт **F12** , auf **Netzwerk** wechseln und das Protokoll behalten:
   - **Chrome / Edge / Brave:** Haken bei **Log beibehalten** (Сохранить журнал).
   - **Firefox:** Zahnrad ⚙️ → **Protokolle dauerhaft anzeigen** (Постоянные журналы).
2. **Анмельден.** Электронная почта и пароль Miele-App-Kontos eingeben. Danach bleibt die Seite bei einem drehenden Rad stehen oder meldet einen Ladefehler – genau so sieht hier Erfolg aus.
3. **Адрес копии.** Im Netzwerk-Reiter ganz nach unten zur letzten (meist rot markierten) Zeile Scrollen; здесь началось с `redirect?redirect_uri=miele…` Одер `miele://oauth2-code/…`. Rechtsklick → **URL-адрес скопирован** , и вы **можете добавить его в поле:://-Redirect-URL** и нажать **GroupKey** .

GroupID и GroupKey должны быть добавлены в мгновенную конфигурацию, чтобы изменить шлюз. Diese Prozedur braucht man nie Wieder.

**Anmeldung scheitert mit `invalid_request … unknown contextId` ?** Mieles Anmeldedienst wechselt beim Login zwischen zwei Domains und verliert die Sitzung, wenn ein Werbeblocker или ein Strenger Schutz vor Drittanbieter-Cookies dazwischenfunkt. Die Login-Seite dann in einem Privaten Fenster ohne Erweiterungen öffnen.

**Umzug auf ein anderes System.** GroupID и GroupKey не являются таковыми. Eine Sicherung der ioBroker-Konfiguration (etwa mit BackItUp) nimmt sie mit; auf einem frischen Система дает возможность войти в систему через две минуты. Die Admin-Seite zeigt den Schlüssel nur als Platzhalter.

## Was dabei herauskommt

Jedes Gerät wird ein Objekt mit seiner Seriennummer als Kennung. Дарунтер:

### `state` – was das Gerät gerade tut

| Пункт данных                                           | Bedeutung                                                                                                                     |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `status`                                               | Betriebszustand. Die Zahl trägt den Klartext als Werteliste, der Objektbrowser und VIS zeigen deshalb «In Betrieb» statt `5`. |
| `statusText`                                           | dasselbe als Text. Bleibt für Aufbauten, die ihn bereits lesen.                                                               |
| `programId` /`programText`                             | Программа laufendes                                                                                                           |
| `programPhase` /`programPhaseText`                     | Phase innerhalb des Programms                                                                                                 |
| `remainingMinutes`, `elapsedMinutes`, `startInMinutes` | Zeiten in Minuten                                                                                                             |
| `remainingSeconds`, `elapsedSeconds`                   | секунда, wenn eingeschaltet                                                                                                   |
| `estimatedEndTime` /`estimatedEndTimeText`             | voraussichtliches Ende (Zeitstempel в мс/`HH:MM`)                                                                            |
| `temperature`, `targetTemperature` (зоны 2 и 3)        | Температура                                                                                                                   |
| `signalDoor`, `signalInfo`, `signalFailure`            | Tür- und Signalmerker                                                                                                         |
| `mobileStart`                                          | ob das Gerät gerade Fernsteuerung annimmt                                                                                     |
| `light`, `spinningSpeed`, `dryingStepText`             | gerätespezifisch                                                                                                              |

Роверт унд `…Text` stehen mit Absicht nebeneinander: Mit der Zahl rechnet und zeichnet man, den Text zeigt man an. Если в 0.3.37 вы перейдете в раздел «Клартекстовый список», то текстовые пункты будут доступны и доступны для просмотра.

### `info` – was das Gerät ist

`connected`, `techType`, `fabNumber`, `matNumber`, `deviceType`, `xkmType`, `xkmVersion`, `protocolVersion`, `operatingHours`, dazu die Abfragezähler `pollTotal`, `pollErrors`, `pollRetries`, `pollErrorRate`. В `lastError` пожалуйста, желайте, чтобы вы были в безопасности.

### `eco` – Энергия и Вода

`eco.energy`(кВт·ч), `eco.energyWh` (Вх), `eco.water` (l), soweit das Gerät sie Liefert, dazu `eco.source` mit der Herkunft des Werts. Gelesen wird über DOP2; bislangliefern das Waschmaschinen. **Der vom Gerät gemeldete Wert ist seine eigene Erwartung, keine Messung.** Если бы вы выбрали Zahl, перейдя к Reiter **Abfrage & Werte** den Zähler-Datenpunkt einer Messsteckdose ein – dann schreibt der Adaptor mit, была бы программа Wirklich Gezogen Hat.

### `history` унд `stats` – was gelaufen ist

Jedes abgeschlossene Programm wird mit Dauer, Programm, Energie und Wasser festgehalten. Die Geräte selbst heben nichts auf, der Verlauf начинается также с Einschalten dieser Funktion и lässt sich nicht rückwirkend füllen. В `history.cyclesJson` Программа stehen die letzten, в `stats.week`, `stats.month`, `stats.year` унд `stats.total` die Summen daneben.

### `control` – nur, wenn man es erlaubt

`start`, `stop`, `pause`, `powerOn`, `powerOff`, `lightOn`, `lightOff`. Эйн `true` löst aus, der Datenpunkt setzt sich selbst zurück. Befehle wirken nur, solange am Gerät **MobileStart / Fernsteuerung** freigegeben ist; manche Firmwares lehnen DOP2-Schreibbefehle grundsätzlich ab.

## Einstellungen

| Рейтер              | Was darin steht                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Anmeldung**       | Земля, der geführte Логин, die abgefangene Adresse                                               |
| **Geräte**          | mDNS-Suche, Ausfall-Suche im Subnetz, ручной IP-адрес                                            |
| **Абфраге и Верте** | Abfrageintervalle, deutsche Namen, Sekundenzeit, EcoFeedback, Energiezähler, geräteinterne Werte |
| **Push & Ports**    | дополнительный канал Echtzeitkanal и собственный порт                                            |
| **Steuerung**       | der Schalter, der die beschreibbaren Datenpunkte anlegt                                          |
| **Верлауф**         | Программа Mitschrift abgeschlossener, Ringpuffer, Aufbewahrung, History-Adapter                  |
| **Диагностика**     | alles zur Fehlersuche und Feldzuordnung – ab Werk aus                                            |
| **Эрвайтерт**       | GroupID и GroupKey от Hand                                                                       |

Jedes Feld перейдет к администратору напрямую; diese Seite wiederholt sie nicht.

## Netz: Порты, Docker, Push

| Рихтунг   | Порт                            | Возу                                     | Нётиг                 |
| --------- | ------------------------------- | ---------------------------------------- | --------------------- |
| eingehend | TCP _Push-Port_ (Vorgabe 18082) | Получите больше возможностей от ioBroker | нур мит Пуш           |
| ein/aus   | UDP 5353 (mDNS)                 | Gerätesuche und Push-Anmeldung           | für die Suche         |
| ausgehend | TCP 80 → Geräte                 | Zustände lesen, Befehle senden           | джа                   |
| ausgehend | TCP 443 → miele-iot.com         | GroupKey abrufen                         | nur bei der Anmeldung |

Ohne Push ist **kein einghender Port** notig. Для mDNS выберите ioBroker и выберите собственный широковещательный сегмент. Подключите IoT-WLAN или VLAN, межсетевые экраны (например, брандмауэр Windows или брандмауэр Windows) и маршрутизатор, многоадресный фильтр и другие подобные устройства. Во всех случаях Fällen представляет собой ручной список IP-адресов Verlässliche Weg.

**Докер.** В контейнере с Bridge-Netz, где многоадресная рассылка не используется, такое соединение также не обнаруживается – IP-адрес, указанный вручную, das Abfragen läuft dann dann. Нажмите на функцию, чтобы она не исчезла, если контейнер не будет установлен: Die Rückadresse Liegt Hinter NAT. Zuverlässiger Push braucht `network_mode: host`.

**Wie Push арбитраж.** Адаптер может быть использован в домашних условиях (`PUT /Devices/<Serie>/SuperVision/<eigene-Fab>`) и abonniert mit einer Rückrufadresse. Das Gerät schickt Änderungen dann von sich aus, im Sekundenbereich. Невозможно использовать модуль: Die älteren XKM EK037 и EK057 не подлежат подписке и не отправляются никуда. Das Abfragen bleibt der verlässliche Weg.

## Защита дат

Адаптер должен быть **безопасным для людей** . GroupID, GroupKey и Refresh-Token лежат в различных мгновенных конфигурациях или в объектах ioBroker. Es wird nichts an Dritte übertragen; im Normalbetrieb besteht überhaupt keine Cloud-Verbindung.

Eine Ausnahme, die man kennen sollte: Die Datensammlung der Diagnose hält **Beginn und Ende jedes Programms** fest. Das bleibt in der eigenen Instanz – wed diese Zeitpunkte aber mit.

## Kompatibilität und Grenzen

- Вы можете использовать стиральную машину (WCR860/EK037), машину Spülmaschine (G5840/EK037) и машину Backofen (H2469BP/EK057).
- Kühl- und Gfriergeräte sind local meist nur lesbar; die Firmware lehnt Schreibbefehle ab.
- Steuern setzt MobileStart am Gerät voraus; Ответ на несколько прошивок для DOP2-Schreibbefehle mit 404 или 500.
- EcoFeedback вообще не работает. Die hier geprüfte Spülmaschine fuhrt über kein lesbares Leaf einen Energie- oder Wasserzähler – dort müssen die Werte aus der Cloud kommen.
- Нажмите на кнопку «Нажмите на лучшее, чтобы помочь, das Abfragen der Normalfall».

## Диагностика

Alles in diesem Abschnitt ist **ab Werk aus** und wird im täglichen Betrieb nicht gebraucht. Es dient einer einzigen Frage: Welches Rohfeld _dieses_ Geräts trägt Energie und Wasser? Полевой номер соответствует широчайшему стандарту и указан в адаптере WCR860.

**Рофельдер.** Schreibt alle Felder des Eco-Leaf nach `eco.fieldsJson` statt nur der zwei ausgewerteten.

**Датенсаммлунг.** Legt je abgeschlossenem Programm einen Datensatz an – Modell, Programm, alle Rohfelder und am Ende den Schlussstand jedes antwortenden Leafs. Чтобы получить доступ к адаптеру, необходимо получить доступ к облачному адаптеру или другой программе от Hand in `collection.inputEnergy` унд `collection.inputWater` eingetragen. In `collection.progress` steht, was noch fehlt; in `collection.finding` das Ergebnis: welches Feld passt, mit welchem Teiler und wie genau.

**Лист-Суше.** Адрес DOP2 `Unit/Attribut`, и nur eine Handvoll dieser Adressen ist überhaupt irgendwo dokumentiert. Die suche arbeitet den Adressraum schonend genug ab, um das Modul nicht zu überlasten; в `collection.scanJson` sammelt sich, была шляпа geantwortet. Мит `collection.trendLeaf` lässt sich ein einzelnes Leaf während eines laufenden Programs engmaschig mitschreiben – das Feld, dessen Wert mit dem Verbrauch mitwächst, ist das geuchte.

**CSV-Аусдрук.** Der Knopf im Diagnose-Reiter legt zwei Tabellen im Dateibereich der Instanz ab und öffnet die erste:

- `collection-<Datum>.csv` – eine Zeile je Programm: Zeiten, Programm, die Vergleichswerte, jedes Rohfeld in einer eigenen Spalte, und je Leaf-Feld der Stand bei Beginn, bei Ende und die Differenz dazwischen. Bei Lebenszählern сказал, что Differenz etwas aus.
- `finding-<Datum>.csv` – eine Zeile je Feld: Übereinstimmung mit dem Vergleichswert, bester Teiler, mittlere und größte Abweichung. Это ответ, который поможет вам собрать информацию.

Точка с запятой для календарных значений, Комма для десятичных значений, BOM – это двойной щелчок в таблице расчетов.

**Ein unbekanntes Gerät erkunden.** [docs/geraet-erkunden.md](/#/docs/adapterref/iobroker.miele-local/docs/geraet-erkunden.md) beschreibt das ganze Verfahren der Reihe nach: wann man scannt, woran man eine Abweisung von einem Überlastsignal unterscheidet, wie man eine Zahlenreihe lest, wenn man eine Hat, und is ein neu verstandenes Feld braucht, bevor daraus ein Датенпункт вирд. Es hält auch fest, было _нефункционально_ , но, черт возьми, это не так.

## Rechtliche Hinweise / Haftungsausschluss

Dies ist ein **inoffizielles, Private Entwickeltes** Projekt und Steht **in keiner Verbindung zur [Miele & Cie. KG](https://www.miele.com/)** , wird von dieser weder unterstützt noch geprüft. «Miele», «Miele\@home» и zugehörige Namen sind Marken der [Miele & Cie. KG](https://www.miele.com/) и мы их обеспечиваем, чтобы обеспечить совместимость. Informationen zu den Geräten selbst gibt es beim Hersteller unter <https://www.miele.com/> .

Адаптер не является локальным протоколом, и его **обратная инженерия** доступна в документальной форме. Die Nutzung erfolgt **auf eigene Gefahr** ; je nach Gerät und Firmware cann sie Gewährleistungsansprüche berühren. Программное обеспечение находится под лицензией MIT **без использования Gewährleistung** (такая ЛИЦЕНЗИЯ). Der Autor haftet nicht für Schäden an Geräten, Daten or sonstige Folgen der Nutzung.

## Danksagung

Besonderer Dank gilt **[meistermopper](https://github.com/meistermopper)** , einem erfahrenen ioBroker-Adapterentwickler, der diesen Adaptor unaufgefordert durchgesehen und wesentliche Verbesserungen beigesteuert Hat: die periodische Hintergrunduche für Geräte, die aus der Bereitschaft aufwachen, einen Verbindungszustand je Gerät, korrigierte Rollen und Einheiten, ausdrückliche Vorgabewerte für alle Datenpunkte und die deutsche Dokumentation. Seine Arbeit находится в версии 0.3.0 eingeflossen.

Das lokale Protokoll (`MieleH256`, DOP2, Provisionierung) от öffentlichen Reverse-Engineering-Arbeit der Projekte `MieleRESTServer` (akappner), `home-assistant-miele-mobile` унд `ha-miele-at-lan`.

## Danksagung

Die Programm- und Phasentabellen в `lib/enums.js` und die Zuordnung der Gerätetypen stammen aus [Home Assistant](https://github.com/home-assistant/core) (Apache License 2.0, © Home Assistant Authors), übernommen über [ha-miele-at-lan](https://github.com/tiehfood/ha-miele-at-lan) (MIT, © Tiehfood) и abgeglichen mit [ioBroker.miele-unbound](https://github.com/meistermopper/ioBroker.miele-unbound) (MIT, © meistermopper). Дайте мне все остальные проекты.

## Лицензия

Лицензия MIT – Авторские права (c) 2026, Иммануэль <github@freitag.online>

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.3.45
- Die letzte deutsche Datenpunkt-ID ist weg: `eco.quelle` heißt jetzt `eco.source`, der Wert ist immer englisch. Vorhandene Installationen ziehen beim Start um.
- `statusText`, `programText`, `programPhaseText`, `programTypeText` und `dryingStepText` folgen der Option „Deutsche Namen“ - ist sie aus, sind die Texte englisch (bisher immer deutsch).
- Restliche deutsche Log- und Fehlermeldungen übersetzt; die CSV-Dateien heißen `collection-<Datum>.csv` und `finding-<Datum>.csv`.
- Alle JSDoc-Kommentare vollständig (keine Lint-Warnungen mehr); `@iobroker/testing` 6.3.0.
- `eco.felderJson` heißt jetzt `eco.fieldsJson` (Umzug beim Start).
- Einstellungen tragen englische Namen: aus `sammlerAktiv`/`sammlerCloud`/`sammlerCloudInstanz` wurden `collectorActive`/`collectorCloud`/`collectorCloudInstance`, aus `leafDatenpunkte` wurde `leafStates`, aus der Zählertabelle `zaehler` wurde `energyMeters`. Vorhandene Einstellungen werden beim Start einmalig übernommen (Review 03.10.2026).
- Hintergrundschleifen (Eco, Betriebsstunden, Sekunden, Suche, Push-Erneuerung, Leaf-Verlauf) planen den nächsten Lauf erst nach dem Ende des vorigen – keine überlappenden Läufe mehr, wenn ein Gerät langsam antwortet.

### 0.3.38
- **Die Objekt-IDs sind jetzt durchgängig englisch.** Der Diagnosekanal hieß `sammlung` und
  trug ausschließlich deutsche Datenpunktnamen (`befund`, `fortschritt`, `datenJson`,
  `leafVerlaufFein` …), dazu vier deutsche im sonst englischen Kanal `history`
  (`laufendSeit`, `zaehlerStart`, `gemessenLetzter`, `gemessenTotal`) - zusammen 57 von
  446 Objekten. Im Aufnahmeantrag hielt der Prüfer sie deshalb für von Hand angelegte
  Skript-Datenpunkte. Aus `sammlung` wurde `collection`, aus `befund` wurde `finding`,
  aus `laufendSeit` wurde `runningSince`.
- **Beim ersten Start zieht der Adapter um.** Jeder vorhandene Wert wandert an seine neue ID,
  erst danach fällt der alte Punkt weg. Gesammelte Daten gehen nicht verloren - in einer
  laufenden Anlage sind das die Datensätze der Feldsuche, der Leaf-Scan über 882 geprüfte
  Adressen und die Verlaufsaufzeichnung. Eine frisch aufgesetzte Instanz findet nichts
  umzuziehen und schreibt nichts.
- **Aufgezeichnete Verläufe bleiben stehen**, aber unter der alten ID: Die Historie hängt am
  Objekt und zieht nicht mit. Betroffen sind nur die vier Zahlen im Kanal `history`.
- **Wer die alten IDs in eigenen Skripten benutzt, muss nachziehen.** Geprüft vor der
  Umbenennung: In 56 ioBroker-Skripten und in der Android-App des Betreibers kam keine
  einzige davon vor.
- Die IDs stehen jetzt in `lib/ids.js` an einer Stelle statt verstreut im Quelltext.

### 0.3.37
- **Klartext am Rohwert.** `status`, `programType`, `programPhase` und `programId` tragen ihre
  Werteliste jetzt in `common.states`, gebaut aus denselben Tabellen, aus denen auch die
  `…Text`-Datenpunkte kommen – damit können beide nicht auseinanderlaufen. Objektbrowser und VIS
  zeigen den Text, der Wert bleibt eine Zahl. Die `…Text`-Datenpunkte bleiben unverändert.
  Programmtabellen über 64 Einträgen bleiben außen vor; ein Backofen hat 168 davon, und die
  gehören nicht in jedes Objekt.
- **Beschreibungen, wo sie fehlten.** Kein einziges der 446 Objekte trug eine `common.desc`. Alles
  Beschreibbare hat jetzt eine, dazu der ganze Diagnosezweig, die drei Zeitstempel in
  Millisekunden und die fünf Rohwerte, deren Bedeutung nirgends dokumentiert ist. Bei
  `sammlung.leafVerlaufFein` stehen Format und ein Beispiel darin – ohne sie konnte niemand
  erraten, was einzutragen ist.
- **Admin neu geordnet.** „Geräte & Abfrage“ trug 25 Felder aus sechs unabhängigen Themen und ist
  nun in **Geräte** und **Abfrage & Werte** geteilt; die drei Eco-Feldindizes stehen bei der
  Diagnose, neben der Sammlung, die sie ermittelt. 18 Fließtextblöcke sind verschwunden: Ihr
  Inhalt steht als ein bis zwei Sätze unter dem Feld, zu dem er gehört, wo der Admin ihn zeigt.
  Sieben von 69 Feldern hatten vorher eine Hilfe, jetzt sind es 28.
- **Der Diagnosezweig entsteht nur, wenn er benutzt wird.** Seine vierzehn Datenpunkte je Gerät
  standen bisher bei jedem im Baum. Sie setzen jetzt eingeschaltete Datensammlung oder Leaf-Suche
  voraus; Suche und Feinaufzeichnung bringen den Kanal selbst mit, damit sie nicht still
  ausfallen.
- **CSV: Start, Ende und Differenz je Leaf-Feld.** Bisher trug ein Datensatz nur den Schlussstand
  der übrigen Leafs. Bei einem Lebenszähler wie `hoursOfOperation` sagt der über ein einzelnes
  Programm nichts – erst die Differenz tut das, und genau diese Leafs sind der einzige Weg bei
  Geräten, die 2/6195 gar nicht beantworten. Der Adapter liest den Stand jetzt auch bei
  Programmbeginn. Dazu im Ausdruck: die Seriennummer als eigene Spalte, die Adapterversion,
  Teiler und Einheit in den Überschriften, eine Einheit an der Temperatur und ein Vermerk an
  Datensätzen aus der Zeit vor den Zeitstempeln statt stillschweigend leerer Zellen.
- **Zweite Datei mit der Auswertung.** `befund-<Datum>.csv` führt eine Zeile je Feld:
  Übereinstimmung mit dem Vergleichswert, bester Teiler, mittlere und größte Abweichung. Das ist
  die Frage, wegen der die Sammlung läuft, und sie muss nicht mehr von Hand in der
  Tabellenkalkulation nachgebaut werden.
- **Behoben: Die Rolle `value.volume` war zurückgekehrt.** Eine neu hinzugekommene Tabelle führte
  eine Rolle wieder ein, die der ioBroker-Katalog nicht kennt; die Repository-Prüfung meldet sie
  als E1008. Es ist wieder `value`.
- **Objekt-IDs des Diagnosezweigs in einer Tabelle.** Umbenannt ist noch nichts, aber sie stehen
  jetzt in `lib/ids.js` statt verstreut über 180 kB Quelltext – eine spätere Umbenennung ist damit
  eine Änderung an einer Tabelle statt einer Suchaktion.
- **Geräteinterne Messwerte als Datenpunkte.** Der Adapter führt jetzt die Feldtabellen aller
  DOP2-Leafs, die die öffentlichen Reverse-Engineering-Projekte `MieleRESTServer` (akappner) und
  `ha-miele-at-lan` (tiehfood) dokumentieren - 52 Strukturen, darunter die für Backofen,
  Kaffeevollautomat, Störungen und Kommunikationsmodul, nicht nur die der Waschmaschine.
  Angelegt wird ein Datenpunkt erst, wenn das Gerät das Feld tatsächlich liefert; blind entsteht
  nichts. Geschrieben wird aus Abrufen, die ohnehin laufen - es kommt keine einzige Anfrage hinzu.
  Neuer Zweig je Gerät: `detail.<Kanal>.<Feld>`. Abschaltbar im Reiter „Diagnose".
- **Fehlerbehebung: Generic-Wertehüllen wurden an der falschen Stelle gelesen.** Miele verpackt
  jeden Messwert in eine kleine Struktur, und es gibt zwei Bauarten:
  `[Maske, Wert, Deutung]` und `[Maske, min, max, Istwert, Schrittweite]`. Der Adapter las immer
  den zweiten Eintrag - bei der ersten Bauart richtig, bei der zweiten das *Minimum*, und das ist
  bei jedem beobachteten Feld 0. Betroffen waren sieben Felder des Eco-Leaf, darunter
  `heatingTargetTemperature`: Während eines 40-Grad-Programms meldete das Gerät
  `[9, 0, 0, 40, 0, 0]` und der Adapter 0. Die Feldnummern innerhalb von Strukturen bleiben jetzt
  erhalten und werden benutzt.
- **Wasser: das EcoFeedback des Geräts hat Vorrang.** Wo es DOP2 2/1585 gibt, gilt dessen Wert für
  das letzte Programm; nur wo es ihn nicht gibt, zählt der Adapter weiter die Impulse des
  Durchflusszählers (Feld 21 / 200, über 24 Programme gegen den Hauswasserzähler belegt). Der neue
  Datenpunkt `eco.source` (bis 0.3.44 `eco.quelle`) sagt, aus welcher der beiden Quellen ein Wert stammt.
- **Der Datensammler schreibt alle Leafs mit.** Am Programmende liest der Adapter jedes
  antwortende Leaf einmal, schonend (fünf Sekunden zwischen zwei Anfragen, im Hintergrund) und
  hängt den Schlussstand an den Datensatz. Erst das macht die Sammlung für Geräte brauchbar, die
  2/6195 gar nicht beantworten - eine Spülmaschine, die dort schweigt, antwortet auf neunzehn
  andere Adressen. Die CSV führt sie als eigene Spalten, benannt wie `2/119.1 hoursOfOperation`.
- **Der Leaf-Scan durchsucht Unit 14.** Ein Backofen, der alle 882 gescannten Adressen mit 404
  beantwortete, wurde in den falschen Units gefragt: `ha-miele-at-lan` nennt die Programmlisten der
  Gargeräte unter 14/1570 und 14/1571.

### 0.2.1 (2026-08-18)
- Adopt ioBroker development guidelines and conformity rules.
- Translate internal log messages to pure English.
- Add explicit default metadata values (`def`) to all state definitions.
- Sanitize dynamic object IDs against forbidden characters.
- Add local verification test script (`npm run test:local`).
- Add German documentation (`README_de.md`).
- Fix dev-server packaging issue by removing redundant prepare script.
- Clarify step-by-step login instructions and i18n translations.
- Add CHANGELOG_OLD.md for historical pre-rename versions.
- Add per-device connectivity state (`info.connected`).
- Add periodic background discovery for waking/standby appliances.
- Add admin UI configuration for second-precise remaining time polling.
- Refine EcoFeedback state roles and measurement units.

### 0.2.1
- Veröffentlichung über GitHub Actions mit npm-Provenance (Trusted Publishing). Keine funktionalen Änderungen.

### 0.2.0
- Umbenennung von `miele-lokal` in `miele-local`: englischer Adaptername und Titel.
  Erste Version unter dem neuen Paketnamen.