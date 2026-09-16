---
chapters: {"pages":{"en/adapterref/iobroker.sunenergyxt500/README.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.md"},"en/adapterref/iobroker.sunenergyxt500/README.en.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.en.md"},"en/adapterref/iobroker.sunenergyxt500/README.de.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sunenergyxt500/README.de.md
title: ioBroker.sunenergyxt500
hash: kF9dSqhhzwMXBcJgjaVvg3xNZYAXPFNayY508qdKhzQ=
---
![Логотип](../../../en/adapterref/iobroker.sunenergyxt500/admin/sunenergyxt500.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)
![Количество установок](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sunenergyxt500-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)
![Тестирование и выпуск](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sunenergyxt500

## sunenergyxt500-Адаптер для ioBroker

Интеграция и дополнительная настройка для **[SunEnergyXT 500 / 500 PRO](https://www.sunenergyxt.com/details-500-series)** с гибридными аккумуляторами переменного тока (производитель: [SunEnergyXT](https://www.sunenergyxt.com/) ) с использованием **локального HTTP-API** вашего устройства — не забудьте об облачном хранилище. Eine Instanz verwaltet **bis zu drei Köpfe** (Speichertürme).

## Язык / Language

- [Английский](/#/docs/adapterref/iobroker.sunenergyxt500/README.en.md)
- [Немецкий](/#/docs/adapterref/iobroker.sunenergyxt500/README.de.md) (стандартный)

## Функции

- Verwaltet **einen bis drei Köpfe** in einer Instantz, jeden unter eigenem Teilbaum`heads.<n>.*` , plus zusammengefasste`total.*` -Совокупность.
- Pollt die lokale API (`GET /read` ) и отображать все стабильные устройства Felder в штатах: SoC, Batterie-/Netz-/Last-/PV-Leistung, Strom/Spannung je MPPT, Tagesenergiezähler, SoC je Pack, Geräte-/Firmware-Infos und Zählerstatus.
- Schreibbare Steuerfelder (`POST /write` , durch Rücklesen bestätigt), passend zur Bedienoberfläche der offiziellen Integration — außer den in der API-Doku также _зарезервировано_ для маркировки Feldern: Netz-Sollwert`GS` , max. Einspeisung`IS` , SoC-Grenzen`SI` /`SA` /`SO` , Eigenverbrauchsmodus`MM` , Zählerkonfiguration`MD` , Цайтзона`TZ` , Нойстарт`RT` макс. Нетцаусганг`MG` , die Schalter`LFB` /`LPS` /`PM` sowie lokaler Modus`LM` (⚠️`LM=1` Blockiert die Cloud-/App-Steuerung bis zum Zurücksetzen). Reservierte Felder (z.B.`PT` ,`SI1` ,`SA1` ) и не имеет доступной только для чтения панели.
- Zwei umschaltbare **Steuemodi** : ein адаптерseitiger Eigenverbrauchs- **Regler** (schreibt`GS` _когда вы используете_ ioBroker-Zähler-State, Feedforward + P, mit Watchdog/Failsafe), der **einen Netz-Sollwert auf alle Köpfe verteilt** , или **Geräte-Eigenregelung** (bindet einen unterstützten Zähler in einen einzelnen Speicher ein und lässt das Gerät selbst regeln) — плюс ein **Aus** -Modus für reines Monitoring.
- **«Проверить все головы»** — нажмите кнопку администратора, чтобы настроить настройки Kopfes (Modell + SoC) для dem Speichern.
- Verbindungsanzeige (`info.connection` ) плюс`info.lastUpdate` , sowie pro Kopf`online` /`lastError` .
- Die komplette, unveränderte`/read` -Antwort jedes Kopfes лежит в`heads.<n>.info.rawResponse` (JSON), газированные напитки Jedes Feld, das der Adaptor nicht auf einen eigenen State abbildet, dort weiterhin auslesbar ist.

## Функционирование адаптера

Дизер-адаптер можно использовать **локально** , без Hersteller-Cloud. Eine Instanz verwaltet **einen bis drei Köpfe** (Speichertürme). Der Eigenverbrauch lässt sich auf **zwei sich gegenseitig ausschließende Arten** umsetzen — du wählst eine über die Einstellung **Steuermodus** :

**Modus B — Адаптер-реглер (Standard-Empfehlung, mit jedem Zähler, 1–3 Köpfe).** ioBroker ist die aktuelle Netzleistung aus **einem beliebigen State** , auf den du ihn zeigen lässt (`gridPowerStateId` ), и адаптер schreibt den Netz-Sollwert`GS` (Упреждение + П-Коррекция, с Сторожевым таймером). Der Zähler cann _alles_ sein, был ioBroker unterstützt — Shelly, Tasmota, ein Smartmeter-/Modbus-Adapter — **auch Zähler, die der Speicher selbst nicht lesen kann** . Du Lieferst Einen State mit der **Netto-Netzleistung в Ватте** (`>0` = Безуг,`<0` = Эйнспейсунг; _Vorzeichen invertieren_ Falls umgekehrt; bei кВт / getrennten Bezug-/Einspeisezählern / pro Phase zunächst einen sauberen Nettowert in einem kleinen ioBroker-State berechnen). Bei mehr als einem Kopf berechnet der Regler **einen** Gesamt-Sollwert und **verteilt ihn auf die Online-Köpfe** — gleichmäßig, auf die Leistung jedes Kopfes begrenzt, und überspringt einen Kopf, der voll (beim Laden) bzw. leer (beim Entladen) ist; Dessen Anteil wird auf die anderen umgelegt. Использование адаптера`MM=0` auf jedem Kopf, damit die Geräte`GS` аусфюрен; der Zähler bleibt voll в нуцбаре ioBroker.

**Modus A — Geräte-Eigenregelung (unterstützte Zähler, nur Einzelkopf).** Der Adaptorbindet einen unterstützten Zähler **in den Speicher** ein (`MM=1` +`MD` ) und lässt das **Gerät selbst regeln** — der herstellereigene Eigenverbrauch, der evtl. Шнеллер передвигается как eine externe Schleife. Dieser Modus ist **nur mit einem einzelnen Kopf** verfügbar; mit zwei oder drei configurierten Köpfen ist er nicht wählbar — nutze stattdessen den Adaptor-Regler. Это значит, что тип Zählertype unterstützt (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota) и Zähler должен быть доступен для использования в локальной сети. В этом разделе описаны способы адаптера **.**`GS` . Die Anbindung ist nur mDNS-/HTTP-Polling, der Zähler **bleibt в ioBroker nutzbar** — а также Zähler-Einrichtung der Hersteller-App, die den Zähler umconfigurieren und aus ioBroker entfernen kann; адаптер для прямого связывания и фиксации.

**Aus (Стандартный, без мониторинга).** Адаптер не доступен`MM` /`MD` /`GS` ; er pollt nur.`control.*` -States kannst du weiterhin manuell befehlen.

В beiden Steuermodi **besitzt der Adaptor`MM`** : bei jedem Опрос prüft er das`MM` jedes Kopfes gegen den gewählten Modus und setzt es (mit Warnung) wieder, падает etwas anderes es geändert Hat — так что cann eine versehentliche Zählerbindung oder ein externes Skript die Steuerung nicht Stillschweigend lahmlegen. Примечание: Ein Kopf führt ein geschriebenes`GS` нур бей`MM=0` aus; mit gebundemen Zähler (`MM=1` ) regelt er selbst und ignoriert`GS` .

**Mehrere Köpfe müssen auf unterschiedlichen Phasen Ligen.** Das ist die elektrische Verantwortung des Betreibers — адаптер prüft (und kann) das nicht. Der Regler regelt die **Netto-(Summen-)Netzleistung** , die dein Zähler meldet, также genau das, был ein üblicher saldierender deutscher Zweirichtungszähler abrechnet; eine Per-Phasen-Optimierung ist nicht vorgesehen.

**Lokaler Modus (`LM=1` ) ist Voraussetzung.** Необходимо указать локальный HTTP-API (`/read` /`/write` ) nur bereit, wenn der **lokale Modus aktiviert** ist — ohne ihn Liefert`/read` keine Daten (из лучшей прошивки). Der locale Modus schaltet außerdem die Cloud-/App-Fernsteuerung ab; folglich kann die Hersteller-App das Gerät nicht mehr steuern.

## Voraussetzungen

- Эйн бис дрей SunEnergyXT 500 (`PK=1` , 800 Вт) или 500 PRO (`PK=2` , 2400 Вт) Köpfe, erreichbar im lokalen Netzwerk (Mischbetrieb verschiedener Modelle ist möglich).
- **Lokaler Modus (`LM=1` ) и всегда активен** — при включении локального HTTP-API (например _, функция адаптера_ ). Деактивируйте функцию Cloud-/App-Fernsteuerung.
- Ein Zähler, je nach Steuermodus: für **Modus B** (Adapter-Regler) ein beliebiger Zähler, dessen Netzleistung als **ioBroker-State** verfügbar ist; Для **режима A** (Geräte-Eigenregelung, Einzelkopf) можно использовать различные настройки Zähler (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), чтобы использовать его в локальной сети. Im _Aus_ -Modus nicht notig.

## Установка

1. Я открыл **адаптер** ioBroker-Admin, затем **sunenergyxt500** установил и установил.
2. Начало установки происходит мгновенно`sunenergyxt500.0` . Deren Einstellungen öffnen und die **Kopf-1-IP / Hostname** eintragen (bei mehreren Köpfen auch **Kopf 2 / Kopf 3** ). Для более точного мониторинга **Steuermodus** _aus_ lassen.
3. Speichern & schließen — адаптер начинается с пыльцы и завершает работу над объектами`sunenergyxt500.0.heads.*` (унд`total.*` ).

## Конфигурация

**Verbindung**

- **Kopf 1 — IP/имя хоста** (Pflicht) и **Kopf 2 / Kopf 3** (необязательно) — локаль Adressen deiner Speicherköpfe, с необязательной меткой. Bis zu drei Köpfe werden von dieser einen Instant verwaltet. Mehrere Köpfe auf **unterschiedliche Phasen** legen (Verantwortung des Betreibers); адаптер должен быть заменен **Netto-Summen** -Netzleistung. Dieselbe Adresse kann nicht doppelt eingetragen werden.
- **Проверьте все головки** — фрагмент конфигурации Kopf и сочетание Modell + SoC (или einen Fehler), укажите адрес для dem Speichern prüfen kannst.
- **Abfrageintervall (s)** — часто используется Jeder Kopf`/read` abgefragt wird (стандартное 5 с).
- **Anfrage-Timeout (ms)** — HTTP-Timeout (Standard 8000 ms).

**Steuerung** — einen **Steuermodus** wählen:

_Aus_ (Standard) — нур-мониторинг; адаптер не используется`MM` /`MD` /`GS` .

_Адаптер-Реглер_ (Модус Б) — Фельдера:

- **Quell-State Netzleistung** — ein Fremd-State mit der Netzleistung deines Hauszählers. Конвенция:`>0` = Netzbezug,`<0` = Эйнспейсунг. Чтобы активировать **инвертирование** , необходимо, чтобы Zähler умер от участия в конференции.
- **Адаптивная подзарядка** (стандартная и стандартная): повторное использование в течение длительного времени — kleine Abweichungen Sanft (все 7 с, 20-W-Schritte), Mittlere alle 2,5 s (120 W), große Lastsprünge soft (450 W), с праздничным 5-W-Totband. Деактивируйте режим регулирования вручную, используя Felder Verstärkung / Totband / Schreibintervall / Schritt-Limit einzustellen (erscheinen nur dann).
- **Ziel-Netzleistung** (W, стандарт 0): 0 = Nulleinspeisung; позитивные Wertehalten bewusst einen kleinen Netzbezug (nie einspeisen), негативные eine kleine Einspeisung — gleiche Vorzeichenknvention wie der Quell-State (`>0` = Безуг).
- **Макс. Änderung pro Korrektur** (W, Standard 500, 0 = unbegrenzt): begrenzt, wie weit sich der Sollwert pro Regelschritt bewegt — hohe Verstärkung kann so bei Zähler-Ausreißern nicht überschwingen.
- **Verstärkung** (Стандарт 0,3), **Общий диапазон** (W), **Мин. Schreibintervall** (ms), **Per-Kopf-Schreib-Totband** (W — минимальный Änderung des Kopf-Sollwerts, bevor erneut geschrieben wird, gegen Zappeln bei sich verschiebender Aufteilung). Die Maximalleistung jedes Kopfes wird **autotisch** vom Gerät erkannt (800 Вт для 500, 2400 Вт для 500 PRO), функция Mischbetrieb также без дополнительной конфигурации.
- **Watchdog Warnung / Failsafe (s)** — wird die Netzquelle zu alt, loggt der Regler eine Warnung und erzwingt schließlich`GS=0` auf **allen Köpfen** (sicherer Neutralzustand), bis die Quelle zurück ist. Сторожевая телеметрия лежит под`controller.*` .

Der Regler ist vor jed Korrektur die tatsächliche Netzleistung (`GP` ) jedes Geräts zurück — das ergibt natürlichen Anti-Windup, когда вы начинаете стажировку (z. B. durch SoC).

_Geräte-Eigenregelung_ (Modus A, **nur Einzelkopf** ) — Фельдер:

- **Типы осцилляторов** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota.
- **Zähler-SN / IP** — серийный номер для Shelly/Tasmota (согласно mDNS aufgelöst) bzw. LAN-IP для EcoTracker (напрямую). Bei Tasmota die SN ohne die letzten 4 Zeichen und den **Power-Key** passend zu deinem Energiezähler-Subtyp setzen.

Повязка-адаптер Zähler (`MM=1` +`MD` ) и das Gerät regelt selbst; der Адаптер schreibt kein`GS` . Держите Zähler bleibt в нуцбаре ioBroker. Dieser Modus wird ausgeblendet/gesperrt, sobald ein zweiter order Dritter Kopf configuriert ist.

> **Ответ:** Im _Aus_ -Modus ist der Adaptor только для чтения — это опрос`/read` und schreibt nichts, außer du befiehlst einen`control.*` -Состояние. В einem Steuermodus **erzwingt** der Adaptor das passende`MM` auf jedem Kopf und setzt es bei externer Änderung wieder; lass **nicht** gleichzeitig einen zweiten`GS` -Schreiber laufen (dein eigenes Skript oder den geräteeigenen)`MM` -Modus mit einem anderen Zähler), sonst kämpfen sie um den Akku.

## Регельверхальтен, Генуигкейт и Гренцен

**Вы можете быть осторожны:** Der Regler hält die Netzleistung in einem Band von typisch **±10–20 W um den Nullpunkt** und regelt Lastsprünge — je nach Einstellungen — inerhalb von **\~1–3 Sekunden bis \~30 Sekunden** aus. Eine dauerhafte, exakte 0,0 W ist **prinzipbedingt nicht erreichbar** — mit keiner Regelung auf dieser

- **Zähler-Genauigkeit und Rauschen:** Der externe Zähler selbst Misst mit Einigen Watt Toleranz und Rauschen — feiner zu regeln ist sinnlos. (Дер`GS` -Sollwert Hat 1-W-Auflösung, die Stellgranularität также nicht die Grenze.)
- **Messketten-Latenz:** Zähler Misst → ioBroker-State → Regler →`/write` → Герэт пандус. Zwischen Lastspung und Korrektur vergehen unvermeidbar \~1–3 секунды.
- **Последняя динамика:** Ein Kompressor или Wasserkocher сработали в течение нескольких миллисекунд — необходимо повторно выполнить повторную установку. Kurze Leistungsspitzen im Diagramm sind Normal und Energetisch Bedeutungslos (Wattsekunden).
- Der Regler regelt auf die eingestellte **Ziel-Netzleistung** (Standard 0) und pendelt **symmetrisch** darum — kurze, kleine Einspeise-Momente gehören zur Nulleinspeisung dazu. Wer nie einspeisen will, setzt das Ziel auf einen kleinen bewussten Bezug (z. B. +10 Вт).

**Wie die Einstellungen wirken:**

| Einstellung                          | Виркунг                                                    | kleiner Wert                                       | größerer Wert                                                                              |
| ------------------------------------ | ---------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Verstärkung**                      | Anteil der Abweichung, der pro Schritt korrigiert wird     | träge, glatt (0,3 ≈ 7 Schritte до \~0)             | schnell (1,0 = eine Korrektur), reagiert aber härter auf Messrauschen; >1 канн Юбершвинген |
| **Ziel-Netzleistung (W)**            | der Wert, auf den die Netzleistung geregelt wird           | <0 = bewusste Einspeisung                          | >0 = bewusster Bezug («nie einspeisen»)                                                    |
| **Макс. Эндерунг про Корректур (Ж)** | begrenzt die Sollwert-Bewegung pro Schritt                 | zähmt Zähler-Ausreißer bei hoher Verstärkung       | größer (или 0 = unbegrenzt) reagiert schneller auf große Lastsprünge                       |
| **Всего (Вт)**                       | Abweichungen darunter werden ignoriert                     | präziser, mehr Schreibvorgänge (0 = все корригеры) | ruhiger, lässt kleine Dauerabweichung stehen                                               |
| **Мин. Шрайбинтервалль**             | Takt der Korrekturen                                       | шнеллерес Аусрегельн (Untergrenze 1000 мс)         | Венигер Герэтезугриффе, Лангзамер Нахфюрен                                                 |
| **Per-Kopf-Schreib-Totband**         | unterdrückt Mini-Umverteilungen zwischen Köpfen (Mehrkopf) | präziser                                           | меньше Zappeln                                                                             |

**Адаптивная регулировка** (Стандартная) обеспечивает автоматическое изменение темпа. Для ручного режима работы возможный профиль: _Gelassen_ (Standardwerte — Ruhig,минимальный Gerätezugriffe, Band ±20–30 W) и _Präzise_ (Verstärkung 0,8–1,0 · Totband 0 · Intervall 1000 ms · Schreib-Totband 0 — Band ±10–20 W, Ausregeln in 1–3 с). Beide erreichen über den Tag практических дизельных энергетических установок — der Unterschied ist Optik im Diagramm, nicht Geld.

## Vorzeichenkonventionen

- `GP` (Netzleistung):`>0` = Einspeisung,`<0` = Bezug — **entgegengesetzt zu einem Shelly-Zähler** (`api.GP ≈ −shelly.gridPower` ).
- `BP` (Батарейная тяга):`>0` = Нагруженный,`<0` = Entladen.
- `GS` (Нец-Соллверт):`>0` = Einspeisung/Entladen,`<0` = Netzladen (±2400 Вт для Pro, 1 Вт для Auflösung).

## Объектбаум

Йедер Копф erhält seinen eigenen Teilbaum unte&#x72;**`heads.<n>.*`** (`n` = 1…3), дазу зусамменгефаст&#x435;**`total.*`** -Aggregate sowie adapterweite`controller.*` /`info.*` . Innerhalb eines Kopfes sind die States в тематической группе каналов; das **Blatt jeder Objekt-ID ist der API-Feldcode** des Geräts (die Entitäts-ID der offiziellen Feldreferenz), и der zweisprachige Objektname beschreibt es — так что bildet der Baum die dokumentierten Gerätefelder 1:1 ab.

| Канал                 | Инхальт                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heads.<n>.battery.*` | SoC (`SC` ), Батарейная мощность (`BP` ), SoC je Pack (`SC0` –`SC5` ), Пакеты онлайн (`ON` ), SoC-Hysterese (`SI1` /`SA1` )                                                                       |
| `heads.<n>.grid.*`    | Netzleistung (`GP` ), Tages-Lade-/Einspeiseenergie (`GD1` /`GD2` )                                                                                                                                |
| `heads.<n>.load.*`    | Lastleistung (`LP` ), Tages-Inselbetriebs-Lastenergie (`LD` )                                                                                                                                     |
| `heads.<n>.pv.*`      | PV gesamt (`PV` ), Tages-PV-Erzeugungsenergie (`PD` ) и Leistung/Strom/Spannung je MPPT (`mppt1` –`mppt4` )                                                                                       |
| `heads.<n>.system.*`  | Gesamt-Ein-/Ausgangsleistung (`IW` /`OP` )                                                                                                                                                        |
| `heads.<n>.device.*`  | Тип/Модель/Серийный номер/Статус;`network.*` (IP-адрес, порт, беспроводная сеть);`firmware.*` (`ES` /`AS` /`DS` Программное обеспечение,`EH` /`AH` /`DH` Аппаратное обеспечение,`BS0` –`BS5` BMS) |
| `heads.<n>.meter.*`   | Status des externen Zählers (`MS` )                                                                                                                                                               |
| `heads.<n>.ups.*`     | USV-Modus/Netzladen/Обход (`UO` /`UG` /`FP` )                                                                                                                                                     |
| `heads.<n>.fault.*`   | Битовые маски Фелера (`TF` /`EF` /`DF1` /`DF2` /`AF1` /`AF2` /`BF` ) — nur im aktiven Fehlerfall befüllt                                                                                          |
| `heads.<n>.control.*` | alle **schreibbaren** Felder (siehe unten)                                                                                                                                                        |
| `heads.<n>.info.*`    | про Копф`online` ,`lastError` ,`rawResponse` (полная версия)`/read` (Рохантворт)                                                                                                                  |
| `total.*`             | Gesamtsicht: kapazitätsgewichtteter`soc` , summierte`batteryPower` /`gridPower` /`maxPower` , `onlineCount`                                                                                       |
| `controller.*`        | Телеметрия де Эйгенвербрауксреглерс (англ.`status` (Alter der Netzquele)                                                                                                                          |
| `info.*`              | `connection` (ум. ein Kopf erreichbar) и`lastUpdate`                                                                                                                                              |

### Schreibbare Steuerfelder (`heads.<n>.control.*` )

Согласно ioBroker-Konvention, все ваши действия будут проходить под ними`control.*` Джедес Копфес. Das die thematische Zuordnung verflacht, zeigt diese Tabelle, wozu jedes Feld gehört:

| Объект        | Поле            | Gehört zu  | Описание                                                                                |
| ------------- | --------------- | ---------- | --------------------------------------------------------------------------------------- |
| `control.GS`  | ГС              | сетка      | Netzleistungs-Sollwert (`>0` Einspeisung /`<0` Netzladen)                               |
| `control.IS`  | ЯВЛЯЕТСЯ        | сетка      | Макс. Netzeinspeisung / WR-Ausgangsgrenze                                               |
| `control.MG`  | МГ              | сетка      | Макс. netzgekoppelte Ausgangsleistung                                                   |
| `control.SI`  | СИ              | батарея    | Мин. Enlade-SoC (Netzbetrieb)                                                           |
| `control.SA`  | ЮАР             | батарея    | Max. Lade-SoC (Netzbetrieb)                                                             |
| `control.SO`  | ТАК             | батарея    | Мин. Энтладе-SoC (Inselbetrieb)                                                         |
| `control.MM`  | ММ              | режим      | Lokale Nulleinspeisung / Eigenverbrauch (gekoppelt mit`MD` )                            |
| `control.MD`  | МД              | метр       | Zählerverbindung как JSON (используется с`MM` )                                         |
| `control.LM`  | ЛМ              | режим      | Lokaler Modus (⚠️`1` Blockiert Cloud/App-Steuerung)                                     |
| `control.LFB` | LFB             | режим      | Lastprioritäts-Schalter                                                                 |
| `control.LPS` | ЛПС             | режим      | Инселаусганг-Шальтер                                                                    |
| `control.PM`  | Премьер-министр | режим      | Параллельный режим                                                                      |
| `control.TZ`  | TZ              | устройство | POSIX-Zeitzone                                                                          |
| `control.RT`  | РТ              | устройство | Gerät neu starten (Кнопка — ein Soft-Restart, **kein** vollständiger Stromlos-Neustart) |

> Совет: Im ioBroker-Admin может сделать список объектов, который вы хотите найти, - _пометить_ фильтр и все Steuerfelder auf einmal zu finden.

`device.PK` wird aus`DevType` abgeleitet, wenn die Firmware`PK` nicht mehr Liefert. Резервье Фельдер (`PT` ,`SI1` ,`SA1` ) доступен только для чтения. Vom Hersteller entfernte (`UP` ) или reine Doku-Artefakte (`WT` ,`BN` ) werden nicht angelegt; alles Ungemappte steht weiterhin in`heads.<n>.info.rawResponse` .

## Мануэль Целер-/Модус-Фельдер (ММ/МД)

`MM`/`MD` Sind die geräteeeigene zählerbasierte Eigenverbrauchsregelung eines Kopfes. Когда вы используете **Steuermodus** , убедитесь, что адаптер установлен для вас (Modus A setzt).`MM=1` +`MD` auf dem einzelnen Kopf; Модус Берцвингт`MM=0` auf jedem Kopf), и sein Guard setzt das modusgerechte`MM` beim nächsten Poll wieder — eine manuelle Änderung in einem Steuermodus ist также nur vorübergehend.

Die Roh-Felder bleiben für Experten-/Handbetrieb schreibbar (z.B. im _Aus_ -Modus). Sie folgen der offiziellen Kopplung:`MM` ausschalten löscht auch`MD` , und das Schreiben von`MD` актививерт`MM` (nicht-leer) bzw. deaktiviert es (ухмыляясь). умереть`MD` -JSON-Formate der vier unterstützten Zähler stehen в локальном API-Referenz des Geräts; Im Modus _Geräte-Eigenregelung_ baut der Adaptor sie aus Zählertyp und SN/IP für dich.

## Einschränkungen

- **Bis zu drei Köpfe pro Instant.** Der Einzelkopf-Betrieb — это действительное оборудование; Die Mehrkopf-Aufteilung ist durch Unit-Tests abgesichert, zum jetzigen Zeitpunkt aber **an einer echten 2–3-Kopf-Anlage ungetestet** — Rückmeldungen aus Mehrkopf-Setups sind sehr willkommen. _Geräte-Eigenregelung_ nur mit Einzelkopf.
- **Köpfe müssen auf unterschiedlichen Phasenliegen** (Verantwortung des Betreibers). Адаптер не соответствует требованиям **Netto-Summen** -Netzleistung, nicht pro Phase.
- Балансировка дополнительных пакетов используется для BMS Jedes Kopfes — der Adaptor steuert nur die Gesamtleistung des Kopfes und Nutzt`battery.SC` (gesamt) zur Regelung; Einzelne Packs действительно бесполезен.
- Tagesenergiezähler (`PD` /`GD1` /`GD2` /`LD` ) sind rohe **Wh** , nicht kWh.`PD` benötigt Steuermodul-Прошивка`ES 1.1.14` (öffentlich als „1.1.4" vermarktet — die öffentliche Zählweise weicht von der internen in`ES` аб); Если прошивка не используется, der State bleibt dann leer.
- Die Tageszähler werden vom Gerät beim Neustart zurückgesetzt — ein Firmwareupdate mitten am Tag setzt sie также auf 0.
- `MD` унд`TZ` Если вы хотите, чтобы ваша работа не была гарантированной, вы можете быть уверены в том, что это будет лучше всего, если вы не получите эха.
- **PV-Eingänge не подлежит проверке с оборудованием** (die Referenzanlage läuft ohne PV-Module, daher sind`PV1–4` погрузиться 0). Интеграция и регулирование с PV-agnostisch и volllständig, а также PV-Firmware-Edge-Cases (z. B. Akku voll + PV-Überschuss, USV-/Bypass-Felder`FP` /`UG` ) sind unverifiziert — Отзыв будет отправлен.

## Fehlerbehebung

- **`info.connection`bleibt`false` / keine Daten:** stelle zuerst sicher, dass der **lokale Modus (`LM=1` )** am Gerät aktiviert ist — ohne ihn Lifert die lokale API keine Werte. Прюфе Данн, об.`http://<geräte-ip>/read` vom ioBroker-Host доступен (с браузером или`curl` тесты). Pro Kopf показать`heads.<n>.info.online` унд`heads.<n>.info.lastError` , welcher ausfällt.
- **Es wird nichts gesteuert:** prüfe den **Steuermodus** — _Aus_ schreibt nie. Im _Adaptor-Regler_ einen gültigen **Quell-State Netzleistung** setzen; в _Geräte-Eigenregelung_ einen unterstützten **Zählertyp** und **SN/IP** .
- **Gerät ignoriert`GS` / Akku reagiert nicht:** ein Kopf führt ein geschriebenes`GS` нур бей`MM=0` аус. Im _Adaptor-Regler_ -Modus erzwingt der Adaptor das; Венн Ду`GS` Мануэль Шрайбст, stelle sicher, dass kein Zähler gebunden ist (`MM=0` ). Mit gebundenem Zähler (`MM=1` ) regelt das Gerät selbst und ignoriert`GS` .
- **Der Regler ist zu langsam / erreicht nie exakt 0:** siehe _Regelverhalten, Genauigkeit und Grenzen_ — die Messkette Bringt \~1–3 с Latenz mit und der Zähler Misst mit Endlicher Genauigkeit, ein Band von ±10–20 Вт um das Ziel ist das phykalische Оптимально. Für die schnellste Reaktion das _Präzise_ -Profil nutzen (Verstärkung 0,8–1,0, Totband 0, мин. интервал 1000 мс); Если это не так, установите **Ziel-Netzleistung** auf einen kleinen позитивный Bezug.
- **Zeitstempel von States wirken alt / Quality-Flag 32:** Der Adaptor schreibt einen State nur bei Wertänderung (Стандартная практика — schützt die States-DB vor Millionen identischer Schreibvorgänge). Der Zeitstempel zeigt также die letzte Wert _änderung_ , nicht den letzten Poll. Die Datenfrische Zeigt`info.lastUpdate` (bei jedem erfolgreichen Актуальный опрос) bzw.`heads.<n>.info.online` . Качество 32 («Ersatz-Initialwert») bleibt nur auf States, die das Gerät nie Liefert (z. B. SoC nicht vorhandener Erweiterungspacks); nach jedem Adapterstart werden alle gelieferten Werte einmal Geschrieben — ihre Zeitstempel sind также thinkestens so frisch wie der Start.
- **Zwei Regler kämpfen um den Akku:** nur einen laufen lassen. Использование адаптера`MM` für den gewählten Modus — деактивация внешнего режима`GS` -Скрипт (или созданный`MM` mit anderem Zähler), bevor du einen Steuermodus nutzt.
- **Manche States bleiben leer (`0` /`""` ):** ein Gerät Liefert nur die Felder, die seine Firmware/Topologie tatsächlich bereitstellt (z. B. weitere Packs`SC2` –`SC5` или Fehler-Bitmasks nur im Fehlerfall). Die komplette Rohantwort steht immer in`heads.<n>.info.rawResponse` .
- **Nach dem Update von einer Einzelkopf-Version sieht der Baum falsch aus:** der Objektbaum wurde в версии 0.2.0 auf`heads.<n>.*` умгестеллт. Адаптер обеспечивает автоматический запуск объекта; bleibt doch etwas übrig, die alten Objekte löschen (oder die Instanz neu anlegen).
- **Время от времени зависало время ожидания / время ожидания Ping:** модуль WLAN в момент отключения отключался и был установлен в Металлгехаусе непосредственно через антенну. Прюфе`heads.<n>.device.network.WR` (Стартовый сигнал в дБ) — значение минус 75 дБ при отключенном сигнале. Gestapelte Geräte trennen und das **Abfrageintervall** auf 10–15 s erhöhen (die Regelgüte leidet kaum: der Regler regiert auf die Netzleistungsquelle, nicht auf diese Abfrage). Um den Adaptor auszuschließen: Instant stoppen und den Kopf einige Minuten anpingen — bleiben die Ausfälle, Liegt es nicht an der Abfrage. Der Adaptor selbst sendet ein`/read` pro Kopf und Intervall, fragt mehrere Köpfe zeitversetzt ab, schließt jede Verbindung nach Gebrauch und bremst nach fehlgeschlagenen Abfragen autotisch ab.

## Änderungshistorie (Журнал изменений)

Die Änderungshistorie wird im Haupt- [README.md](/#/adapters/sunenergyxt500#changelog) gepflegt.

## Лицензия

Лицензия MIT

Авторские права (c) 2026 Маркус Бортель (Creekhail)

Die Erlaubnis wird hiermit unentgeltlich jeder Person erteilt, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien («Программное обеспечение») erhält, mit der Software uningeschränkt zu Handeln, einschließlich und ohne Einschränkung der Rechte, sie zu utzen, zu kopieren, zu ändern, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software überlassen wird, dies zu gestatten, unter den folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Erlaubnishinweis in allen Kopien или wesentlichen Teilen der Software beizufügen.

ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ «WIE BESEHEN» BEREITGESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UN DER NICHTVERLETZUNG VON RECHTEN. IN KEINEM FALL HAFTEN DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNG, OB AUS VERTRAG, UNERLAUBTER HANDLung ODER ANDERWEITIG, DIE SICH AUS DER SOFTWARE ODER DER DER NUTZUNG ODER SONSTIGEN VERWENDUNG ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ЭРГЕБЕН.