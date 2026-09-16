---
chapters: {"pages":{"en/adapterref/iobroker.pondpump/README.md":{"title":{"en":"ioBroker.pondpump"},"content":"en/adapterref/iobroker.pondpump/README.md"},"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md":{"title":{"en":"Wassertemperaturen im Koiteich"},"content":"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md"},"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md":{"title":{"en":"ioBroker.pondpump — User Manual"},"content":"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md
title: Вассертемпературен-им-Койтейх
hash: Pl6bEXFSVi6pkEBpaVjgsI4A2YFHXCFxoA8jh2dd5yc=
---
# Вассертемпературен-им-Койтейх

**Biologische Grenzwerte, Krankheitsfenster, Jahres- und Tagesgang, Wärmephysical, Heizen und Kühlen, Messung und Steuerung**

> Begleitdokument zu «Teichpumpen-Durchfluss nach Wassertemperatur und Wetter» · Стенд: 10 сентября 2026 г. · База исследований: rund 90uchanfragen und etwa 150 ausgewertete Quellen (WOAH/OIE-Handbücher, FAO, Universitäts-Extension, Fachzeitschriften, DWD-Klimadaten, Koi-Fachhändler, немецкий и британский Koi-Foren mit Messreihen). Zahlen, die aus Formeln oder Quellenwerten abgeleitet wurden, sind als **\[eigene Berechnung]** markiert; Forenmessungen sind als **\[Форум]** gekennzeichnet; Читать на английском языке Quellen sind übersetzt. Quellenkürzel \[T1]… \[T93] verweisen auf das Verzeichnis am Ende.
>
> **Оригинальный PDF-файл:**[`../Wassertemperaturen_im_Koiteich.pdf`](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/Wassertemperaturen_im_Koiteich.pdf) . Это Markdown-Fassung — это лучший/greppbare Referenz im Repo und die Grundlage der **Koi-Temperatur-Farbskala** im PumpVisual-/PumpScheduler-Widget (`tempColor` в`src-widgets/src/graphics.tsx` ).

## 0. Kurzfassung

Koi sind Karpfen, und Karpfen sind eurytherm: Wildkarpfen überleben nachweislich Monate bei 0–4 °C unter Eis und fressen noch bei 3 °C, температура окружающей среды в трудовой среде составляет 27–32 °C, критическая максимальная температура составляет 40–43 °C. Die Praxis der Koihaltung setzt engere Grenzen, und das aus Guten Gründen: Ein hoch gezüchteter, в Японии теплый aufgezogener Koi Hat weniger Reserven als ein Wildkarpfen, und in einem dicht besetzten Teich mit Biofilter entscheiden nicht die Fische allein, sondern das Zusammenspiel фон Зауэрстофф, Krankheitserregern, Immunsystem und Filterbiologie. Дараус эргибт sich eine Skala mit sechs Bändern: до 2 °C lebensgefährlich, 2–4 °C Grenzbereich, 4–8 °C Winterruhe, 8–13 °C das gefährliche «Aeromonas-Fenster», в dem Erreger aktiv sind, das Immunsystem aber nicht, 13–17 °C, 17–28 °C Normalbereich mit dem Wachstumsoptimum bei 23–26 °C, 28–30 °C Hitzestress mit Sauerstoff als limitierendem Faktor, über 30 °C Gefahr. Die drei wichtigsten Krankheitsfenster sind scharf: SVC при 11–17 °C, KHV при 16–25 °C (смертность до 28 °C, больше при 29–30 °C), CEV при 15–25 °C (форма Koi) без 6–12 °C (Карпфен-Форм).

Ebenso wichtig wie die Absolutwerte ist die Änderungsrate: выше 2 °C и 24 Stunden gold in der deutschen Koi-Szene als Stress, 3–4 °C plötzlich als Schock; Физиологическое воздействие гормона стресса на кортизол происходит при температуре 0,6 °C, а уровень стресса не снижается. Unabgedeckte westerndeutsche Koiteiche von 1,5 м Tiefe laufen innormalen Jahren zwischen 3–6 °C в феврале и 22–26 °C в июле/августе, в июле/августе, в лете 1–3 K und im Herbst 2–4 K über dem Monatsmittel der Luft und folgen der Luft mit einer Zeitkonstante von etwa 2–4 Таген; в Hitzwellen erreichen 1,2–1,4 м, Tiefe Teiche 28–30 °C, 2 м Tiefe bleiben bei 23–26 °C; в Kältewellen Fall Teiche mit laufender Umwälzung auf 0,3–2 °C, während ein ruhiger Teich unter geschlossener Eisdecke am Grund 4 °C. Eine Abdeckung hebt die Wintertemperatur um 2–6 K und Drückt die Tagesschwankung von etwa 2 K auf 0,1–0,2 K. Heizen Costet 1,16 кВтч je Kubikmeter und Kelvin; Если температура не превышает 6 °C зимой, то при мощности 60 Вт и температуре 4–6 °C температура должна быть равна 30–40 Вт/м³, и это должно произойти. Для режима регулировки: Regelfühler в 50–100 см Tiefe, Zweitfühler am Grund, 24-часовой Mittel für Schwellen, Hysterese um 0,4 K, Alarm bei Änderungsraten über 2 K/Tag, и другие Führungsgröße nicht ein Sollwert, sondern das Vermeiden des 8/10–13 °C-Fensters в окрестностях Рихтунгена.

## 1. Температурная температура кои

> _Abbildung 1 (в оригинале-PDF): Temperaturskala für Koi – Zustand, Krankheits- und Parasitenfenster, Bewirtschaftungsfenster. Bänder nach den in Kapitel 1 и 2 Belegten Quellen; Grenzen sind Übergänge, keine Sprünge._

### 1.1 Toleranzgrenzen: Wissenschaft gegen Praxis

Die Laborwerte des Karpfens Ligen weit außerhalb dessen была ein Teich je erreicht. Для Юнгкарпфена, температура 25, 30 и 35 °C может быть опасна, но Чаттерджи и др. (2004) критические максимумы при 39,7, 40,6 и 42,9 °C и критические минимумы при 8,4, 8,6 и 10,2 °C – минимумы, если так хочется, с теплым ангепассом Fische gemessen wurden \[T1]. Umgekehrt zeigt die Kälteseite: Zierkarpfen (Koi) haben je nach Akklimatisation kritische Minima von 2,6–7,4 °C \[T2], kalt akklimatisierte Karpfen „können mehrere Monate Exposition gegenüber niedrigen Температура от 0–4 °C überleben" \[T3], и в österreichischen Karpfenteichen unter Eis Wurden über Drei Winter Wassertemperaturen von 1,0 до 3,7 °C в среднем, при температуре 3,1 °C nachweislich fraßen und höchstens 3,8 % Gewicht верлорен \[Т4]. Die mitteleuropäische Karpfenteichwirtschaft überwintert при 4–8 °C; Gewichtsverluste von 5–10 % гельтен-дорт-алс типичный \[T5]. Температура акклиматизации должна быть выше 3 °C, а летальная температура в Обергренце - 1 °C \[T6]; die höchsten Toleranzwerte erreicht man mit einer Aufheizrate von 1 °C je Tag \[T7]. Behördliche Zusammenstellungen nennen für Karpfen ein chronisches Limit 32 °C, akutes 37 °C и собственная средняя температура 34,5 °C \[T8].

Die Koi-Praxis zieht ihre Untergrenze deutlich höher, und die Quellen sind sich uneins: KOI sieht Koi unter 5 °C in Winterstarre und „um 2 °C über längere Zeit dem Tod nahe" \[T9]; Сид Митчелл установил температуру «до 4 °C и установил температуру 4 °C \[T10]»; Koi-Consult поддерживает температуру 4 °C для сверхвысокой температуры, что обеспечивает теплоту и теплоту в помещении для отдыха \[T11]; Genesis устанавливает 5 °C как минимум для продолжительного времени и 30 °C как максимум \[T12]; Компания Koi-Company предупреждает, что температура ниже 6 °C должна быть установлена в Einzeltieren zum Tod führen können» \[T13]. Die Erfahrungsberichte der Foren \[Форум] reichen von einem 54-m³-Teich, der 2012 fünf Tage bei 0,3 °C lag («unter 1 °C… ein Glücksspiel»), для тех, кто умер при температуре 0,5 °C в Grund ohne Verluste überwinterten \[T14]. Die Lesart: Physiologisch ist 0–4 °C für Karpfen überlebbar; При температуре 4–6 °C необходимо соблюдать меры безопасности для теплого воздействия, для теплых зон, для защиты в дер Sauerstoffversorgung unter Eis und für die Parasiten und Pilze, die im kalten Wasser weiter aktiv sind (Kapitel 2).

Nach oben ist die Praxisgrenze 28–30 °C – nicht wegen der Fische, sondern wegen des Wassers: Bei 28 °C wird «die Menge Sauerstoff, die sich im Wasser lösen lässt, zum limitierenden Faktor» \[T9]; Händler nennen 27 °C также Максимум или «28 °C nicht überschreiten» \[T15], Genesis 30 °C \[T12]. Dass Karpfen im Labor 27–32 °C bevorzugen \[T8]\[T16], erklärt, warum Koi an heißen Tagen scheinbar unbeeindruckt bleiben, bis nachts der Sauerstoff knapp wird.

### 1.2 Зима и зимняя зима

Когда эти 5 °C опустились в Зимнюю Звезду, в дер sie «ihre Energie saven, indem sie kaum schwimmen… im relativ Warmen Wasser nahe dem Grund» \[T17]. Das Warme Wasser am Grund — это 4°C-Wasser des Dichtemaximums (Глава 3.5). Для того, чтобы температура была задана или указана температура, необходимо, чтобы она была в точке, где она находится, – дем Bereich, тогда человек meiden soll:

Die **Kaltüberwinterung** hält 4–6 °C (немецкий Foren, Mitchell), Koi-Company поддерживает 6 °C в Тайхбодене, Нидеррейн-Koi «im Idealfall zwischen 5 и 10 Grad… und constant» \[T13]\[T18]. Die **Warmüberwinterung** Hält Minestens 13 °C (britische Szene, «Минимум 13 °C, um das Immunsystem zu stützen») или 14–16 °C (Koi-Company: «die Gefahr eines Energiemangels im Frühjahr deutlich minimiert») \[T19]\[T13]. **Beide meiden das Zwischenfenster:** «Der Bereich zwischen 10 и 13 °C является проблемой, когда Keime aktiv sind, das Immunsystem der Koi aber noch nicht ausreichend arbeitet» (Koi-Company); „entweder under 10°C or über 13°C” (Бытие); «der Temperaturbereich zwischen 6–12 Grad Celsius ist der ungünstigste» (Форум); Britische Halter nennen 14–19 °C zusätzlich als «problematisschsten» Bereich, weil die Fische fressen wollen, aber schlecht verdauen \[T13]\[T12]\[T20]\[T19]. KOI сформулировал стратегию: чтобы температура при температуре выше 13 °C остановилась или наступила фаза берганга в траве «при температуре 4 °C при температуре 4 °C» \[T17]. Koi aus japanischer Aufzucht, die «in überdachten und beheizten Systemen zügig großgefüttert» wurden, müssen an niedrige Temperature besonders vorsichtig gewöhnt werden \[T21].

### 1.3 Иммунная система и аэромонас-фенстер

В Иммунабвере Карпфенса установлена температура, и она может быть повреждена. Die unspezifische Abwehr arbeitet auch kalt; Специальные антикоррозийные меры действуют при высоких температурах: температура при 12 и 24 °C снижается при температуре ниже 24 и 20 °C, а также при температуре 24 и 20 °C. 18 °C или «верлорен» \[T22]; Нидридж Температурн «beeinträchtigen spezifische Immunantworten, die durch T-Helferzellen vermittelt werden» \[T23]. Die Hobby-Literatur verdichtet das zu Schwellen: «Unterhalb von etwa 12,8 °C finden sich keine weißen Blutkörperchen im Blut der Koi» (KOI; ohne Primärquelle) \[T17], das Immunsystem sei unter 12 °C «sehr stark beeinträchtigt» \[T10], при температуре 18 °C «с температурой 50 % эффективности» \[T24], где «первая температура должна быть 14–15 °C при температуре 14–15 °C, когда температура не превышает 18 °C» \[T13] и «je naher an 18 °C und darüber, desto aktiver» \[T25]. Die Gegenseite, vor allem Aeromonas-Bakterien, ist ab etwa 4,4 °C aktiv und erreicht ihr Aktivitätsmaximum um 15,6 °C \[T17]; Этот обзор должен быть предоставлен для Aeromonas die höchste Virulenzgen-Expression при 28 °C и высокой протеазы-активации при 18 °C \[T26]. Daraus entsteht die «Aeromonas Alley»: je nach Autor 4,4–12,8 °C (KOI), 5,6–16,7 °C (US-Händler), 10–13 °C (Koi-Company, Genesis) или 6–12 °C (немецкие Foren) \[T17]\[T24]\[T13]\[T20]. Für die Steuerung ist weniger die Exakte Grenze wichtig als die Konsequenz: Dieses Fenster wird im Herbst und im Frühjahr zwangsläufig durchquert – möglichst zügig, mit Stabiler Temperatur, ohne Fütterungs- und Behandlungsfehler, und nie als Dauerzustand.

### 1.4 Фюттерунг, Вердауунг, Вахстум

Карпфен ваксен при 23–30 °C в лучшем случае (ФАО) \[T27]; При температуре от 20 до 24 °C лучше, чем при температуре от 16 до 28 °C, а в диапазоне температур от 16 до 24 °C и выше \[T28]; для войны Кой-Ларвен 26 °C или 28 или 30 °C \[T29]; также Wachstumsoptimum при температуре 27 °C \[T8]. Nach unten Liegt die Wachstumsschwelle wildlebender Karpfen bei etwa 8 °C, bei 12 °C sind noch 0,7 % Körpermasse Zuwachs je Tag beobachtet worden \[T30]. Der Verdauungsapparat ist der Engpass: Händlerangaben zur Verdauungsdauer lauten 48–72 Stunden до 10 °C, 12–24 Stunden до 20 °C, 6–12 Stunden до 25 °C \[T31]; eine Tierärztin verlangt, dass der Teich bei 13–18 °C, minestens fünf Stunden in diesem Bereich bleibt, damit eine Mahlzeit verdaut wird \[T32].

Die Fütterungsschwellen der Praxis streuen entsprechend: KOI und Kodama stoppen bei 10 °C, die meisten deutschen Händler bei 8 °C (Bachflohkrebse: «Unter 8 Grad Celsius darf nicht mehr gefüttert werden»; Ханако: «unter etwa 8 bis 10 °C»), Koifriend сначала до 5 °C, Koiparadise до 4 °C \[T33]\[T34]\[T35]. Dazwischen Liegt das Weizenkeimfutter (8/10–15 °C), при нормальной температуре около 15–18 °C, при средней температуре 22–26 °C, при температуре ниже 28 °C и выше 30 °C \[T31]\[T35]. Рационы: 1 % при температуре до 15 °C, 2 % при температуре 20 °C, 3 % при температуре 25 °C \[T35]. При температуре 3–8 °C при температуре \[T4]\[T30], более широкой области применения Praxisregel nicht: Sie ist eine Vorsichtsmaßnahme gegen unverdautes Futter im Darm, Ammoniak im kalten Wasser und die noch inaktive Filterbiologie.

### 1.5 Fortpflanzung

«Das Laichen des europäischen Karpfens start, wenn die Wassertemperatur 17–18 °C erreicht»; оптимальная температура: 18–22 °C, температура эмбрионального периода 20–23 °C etwa drei Tage (60–70 Tagesgrade) \[T36]. Im Koiteich fällt das in den Mai und Juni («unter etwa 18 °C passiert meist wenig») и принесет Verletzungen, Sprünge, Eiweißeintrag und Sauerstoffzehrung mit sich \[T37]; Кортизол и антикорпершпигель входят в дер Laichzeit erhöht \[T38]. Для регулирования температуры: Самая стабильная температура 18 °C в Frühjahr — это ошибка, необходимая для вассервехселя и консервации.

### 1.6 Температурные условия: удары и удары

Die deutsche Koi-Szene ist sich einig: «Die Wassertemperatur sollte binnen 24 h nicht um mehr als 2 °C schwanken» (Koi-Consult) \[T11]; Koitec24 предупредит о «Температурном режиме до 2 °C с меткой» и задаст вопрос о температуре до 4 °C при включении иммунной системы \[T39]; Forenbetreiber heizen und kühlen в «1–2 °C Schritten pro Tag», «nicht mehr als 2–3 Grad pro Tag» \[T40]. Britische Quellen sind großzügiger: Mitchell sieht einen Anstieg um 4,5 °C in 24 Stunden «an der Grenze dessen, was Koi erleben sollten» \[T10]; KOI не 3–4 °C plötzlicher Differenz als möglichen Schock und für den kurzfristigen Umsetzvorgang 0,2 °C je Minute als meist tolerierbar \[T9]. Die Physiologie Lifert die Richtung: Карпфен установлен при температуре 0,6 °C, что приводит к превышению уровня кортизола, который не поглощается \[T41] – **это стресс, который не вызывает стресса.** Zwei Sonderfälle: Plötzliche Abkühlung im Frühjahr, wenn der Filter Warm eingefahren ist, kostet den Nitrifizierern überproportional Leistung (siehe Hauptdokument, Kapitel 2.4) и Chilodonella-Ausbrüche folgen typischerweise einem Kältesturz \[T42].

### 1.7 Präferenz, Optimum и Praxis в отдельной таблице

| Größe                                          | Верт                                                                                                      | Источник                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------- |
| Критический Минимальный уровень акклиматизации | 2,6 °С (Кои); Уберлебен 0–4 °C Убер Монате (Карпфен)                                                      | \[T2]\[T3]\[T4]         |
| Критический Максимум                           | 39,7–42,9 °C (Акклиматизация 25–35 °C)                                                                    | \[Т1]                   |
| Хронический предел / Средняя температура       | 32 °C / 34,5 °C                                                                                           | \[Т8]                   |
| Vorzugstemperatur (Labor)                      | 27,4–32 °C                                                                                                | \[Т8]\[Т16]             |
| Wachstumsoptimum                               | 23–30 °C (ФАО), 27 °C, Koi-Consult 23–26 °C                                                               | \[T27]\[T8]\[T11]       |
| Wachstumsschwelle                              | ≈ 8 °C                                                                                                    | \[Т30]                  |
| Laichouslöser                                  | 17–18 °C, оптимальная температура 18–22 °C                                                                | \[Т36]                  |
| Immunsystem eingeschränkt                      | < 12–13 °C (хобби); spezifische Antwort verzögert < 20 °C, Gedächtnis verloren bei 18 °C (рабочая работа) | \[Т17]\[Т22]            |
| Аэромонас                                      | актив > 4,4 °С, Максимум ≈ 15,6 °С                                                                        | \[Т17]                  |
| Практически минимум                            | 2 / 4 / 5 / 6 °C je nach Autor                                                                            | \[T9]\[T10]\[T12]\[T13] |
| Praxismaximum                                  | 27–30 °C                                                                                                  | \[T15]\[T12]\[T9]       |
| Zulässige Änderung                             | 2 °C/24 ч (DE), 4,5 °C/24 ч (Великобритания-Гренце), 3–4 °C plötzlich = Schock                            | \[T11]\[T10]\[T9]       |

## 2. Кранкхайтен и паразиты при температуре

Die drei meldepflichtigen beziehungsweise überwachten Viruskrankheiten haben scharfe, behördlich documentierte Temperaturfenster; Бактериальные, инфекционные и паразитарные заболевания являются небезопасными.

**Вирус кои-герпеса (KHV, CyHV-3).** Das WOAH-Handbuch: «Die Krankheit ist tempaturabhängig und tritt zwischen 16 and 25 °C auf»; unter Versuchsbedingungen «высокая смертность при 28 °C, максимальная смертность при 29 или 30 °C и ничто при 13 °C»; допустимая температура «> 17 °C», der Verlauf ist bei 23–25 °C в шнельстене; при 13 °C bleibt вирусная ДНК nachweisbar, газированная вода überlebende Fische Reservoire sein können; Инфекционные вирусы при температуре 16 °C сохраняются при температуре 23 или 28 °C; für die Diagnose werden Verdachtsfische bei 20–24 °C gehalten \[T43]. Гилад и др. (2003) максимальная смертность от 85 % при 18 °C, 95 % при 23 °C и 89–95 % при 28 °C, обычно при 13 °C; das Umsetzen exponierter Fische von 13 auf 23 °C löste rasch Sterben aus \[T44]. Die «Heilung» при 30 °C Hinterlässt Träger \[T45]. Практические условия: Frühjahrsfenster 16–18 °C соответствует классическому Ausbruchszeitpunkt, Neuzugänge gehören bei 20–24 °C в карантине.

**Вирус отека карпа (CEV, «Koi-Schlafkrankheit»).** WOAH: «zwischen 15 °C и 25 °C … auch bei niedrigeren Temperaturen berichtet» \[T46]. Neuere Arbeiten trennen zwei Formen: «Клиника CEV-Infektionen treten bei Nutz- und Koikarpfen üblicherweise bei Wassertemperaturen von 6–12 °C beziehungsweise 15–25 °C auf»; В этом документальном документе осень будет при температуре 2 °C, когда температура начнется, как и при температуре 8 °C \[T47]. Deutsche Ausbrüche lagen при температуре 17–22 °C, британская температура при 3 °C, европейская температура при температуре 7–15 °C \[T48]\[T49].

**Frühjahrsvirämie (SVC).** WOAH: «Krankheitsausbrüche bei Karpfen treten im Allgemeinen zwischen 11 и 17 °C auf. «eine Erhöhung der Wassertemperatur über 19–20 °C может быть остановлен или остановлен SVC-Ausbrüche»; при температуре 10 °C или при температуре ниже 20 °C в течение недели \[T50].

**Бактерии и Пильце.** Columnaris около 15 °C, Карпфенпокен около 14 °C (ФАО) \[T27]; Saprolegnia («Winterpilz») замерзает, когда температура до 15 °C падает и становится прохладной \[T51]; Аэромонас Зихе 1.3.

**Паразитен.** Ichthyophthirius entwickelt sich «zwischen 5 и 30 °C», Schwärmer schlupfen bei 25–30 °C до 16–27 Stunden, до 5 °C до 8–9 дней; der Zyklus dauert при 24–26 °C 3–6 Tage \[T52]\[T53]. Костия (Ихтиободо) «lebt bei 2 bis 30 °C oder höher, vermehrt sich aber schnell bei 20–25 °C» \[T54]. Chilodonella имеет оптимальную температуру при 4–10 °C и является типичным Kaltwasser- und Kältesturz-Parasit \[T42]\[T55]. Trichodina vermehrt sich bei 4–30 °C \[T56]. Dactylogyrus-Eier schlupfen bei 5 °C nicht, holen es aber bei Erwärmung nach \[T57]. Lernaea (Ankerwurm) растет при температуре Entwicklung über 20 °C (оптимум 26–28 °C, при 14 °C при температуре 14 °C), Argulus (Karpfenlaus) начинается при температуре Eiablage при температуре 10 °C, при температуре Eier brauchen при 23 °C 17 Tage, при 20 °C 30 Tage \[Т58]\[Т59]\[Т60].

| Эррегер                 | Фенстер                                   | Bemerkung                                                                    | Источник                 |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- | ------------------------ |
| KHV (CyHV-3)            | 16–25 °C, смертность до 28 °C             | температура не выше 13 °C и не выше 29 °C; пермиссив > 17 °С; Трегер Блейбен | \[T43]\[T44]\[T45]       |
| CEV / KSD               | 15–25 °С (Кои), 6–12 °С (Карпфен)         | Великобритания-Фалле до 3 °C; DE 17–22 °С                                    | \[T46]\[T47]\[T48]\[T49] |
| СВК                     | 11–17 °C                                  | сельтен < 10 °С, абнеменд > 22 °С; > 19–20 °C стоппт                         | \[Т50]                   |
| Aeromonas / Pseudomonas | актив > 4,4 °С, Максимум ≈ 15,6 °С        | Geschwüre im «Fenster» 8/10–13/16 °C                                         | \[Т17]\[Т26]             |
| Сапролегния             | < 15 °C, в районе Видерертеплунг          | Winter/Frühjahr                                                              | \[Т51]                   |
| Ихтиофтириус            | 5–30 °C, шнель до 24–26 °C                | Zyklus 3–6 Tage Warm, Wochen kalt                                            | \[Т52]\[Т53]             |
| Костия                  | 2–30 °С, шнель 20–25 °С                   | также зимой активный                                                         | \[Т54]                   |
| Хилодонелла             | Оптимальная температура ≈ 4–10 °C         | nach Kältesturz                                                              | \[Т42]\[Т55]             |
| Триходина               | 4–30 °C                                   | ganzjährig                                                                   | \[Т56]                   |
| Дактилогир              | Eier ruhen bei 5 °C                       | Frühjahrswelle                                                               | \[Т57]                   |
| Лернея                  | > 20 °C, оптимальная температура 26–28 °C | keine Vermehrung bei 14 °C                                                   | \[Т58]                   |
| Аргулус                 | Температура окружающей среды > 10 °C      | Эйер: 17 дней до 23 °C, 30 дней до 20 °C                                     | \[Т59]\[Т60]             |

Die Tabelle Zeigt, Warum Das Fenster 8–17 °C Die gefährlichste Phase des Jahres ist: SVC, CEV, Aeromonas, Saprolegnia, Costia и Chilodonella sind dort activ, das spezifische Immunsystem nicht, und der Biofilter ist noch nicht eingefahren. При 20 °C доминируют KHV, Lernaea, Argulus и Ich – активная иммунная система и фильтр для лечения.

## 3. Был ли der Teich физикалиш тут

### 3.1 Вармебиланц и Кеннзахлен

Ein Teich ist ein Wärmespeicher mit einer Deckelfläche, über die fast alle Wärme kommt und geht. Die Bilanz je Quadratmeter Oberfläche lautet: Sonneneinstrahlung минус langwellige Abstrahlung минус Verdunstung минус Konvektion an die Luft плюс Bodenwärmestrom плюс Heizung плюс Frischwasser. Die Kennzahlen dazu \[eigene Zusammenstellung aus \[T61]–\[T66]]:

Тепловая мощность Вассера составляет 4,18 МДж в кубометре и Кельвине, а также 1,16 кВтч в м³ и К; Мощность 30 м³ составляет 35 кВтч по шкале Кельвина \[T61]. Эффективный теплоизоляционный эффект достигается при уровне освещенности и атмосферы на уровне 17–28 Вт/м²K в районе \[T62]; Конвекция при максимальной мощности составляет 1,16·(10,45 − v + 10·√v) Вт/м²К с ветровым вентилятором, потребляемая мощность составляет 5 Вт/м²К, при этом мощность нагрева должна быть равна нулю \[T63]. Daraus folgt die Zeitkonstante τ = ρ·c·Tiefe/U: для 1,5 м Wassertiefe и U = 20–30 Вт/м²K для 2–4 Tage (0,8 м: 1–2 Tage; 2 м: 3–5 Tage); unter Abdeckung Sint U Grob auf 3–8 W/m²K, τ steigt auf 10–20 Tage \[eigene Berechnung; U-Werte von Abdeckungen sind nicht gemessen]. В зависимости от температуры окружающей среды температура воды должна составлять 3–7 градусов, а температура воздуха должна быть 35–40 °C или температура 30 °C в зоне нагрева. Die Verdunstung beträgt im Sommer 3–7 мм и Tag, bei Wind und Sonne до 10 мм \[Форум] \[T64]; 5 мм составляет 12,3 МДж/м² или 140 Вт/м² в Tagesmittel – ein Kühlpotenzial von etwa 2 K je Tag bei 1,5 m Tiefe \[eigene Berechnung]. Ein 70 см Stadtteich gab in einer durchschnittlichen Sommernacht 2,7 МДж/м² ab, 43 % als Abstrahlung, 39 % als Verdunstung, 11 % als fühlbare Wärme, 0,1–0,3 MJ/m² в ден Бодене \[T65] – на высоте 1,5 м Tiefe etwa 0,4 K je Nacht \[eigene Berechnung]. Der Boden ist im Winter ein kleiner Wärmelieferant: В 1 м Tiefe Liegt die Bodentemperatur Anfang в феврале - 2 °C, в 2 м - 4,5 °C, в августе - в 1 м до 20 °C; die Frostgrenze имеет высоту 80–120 см \[T66]. Grund- und Brunnenwasser Hat 8–11 °C, im Jahresmittel etwa 9–10 °C \[T67].

### 3.2 Джаресганг в Западной Германии

> _Abbildung 2 (в оригинале-PDF): Monatsmittel der Lufttemperatur (DWD-Klimanormal 1991–2020, Дюссельдорф) и типичный Bandbreite der Wassertemperatur в 1 м Tiefe eines 1,5 м Tiefen, unabgedeckten, umgewälzten Koiteichs, zusammengestellt aus Forenmessreihen 2020–2026 (Unsicherheit ± 2 K; Punktmessungen, kein Klimamittel)._

Die DWD-Normalwerte 1991–2020 für Düsseldorf lauten (январь-декабрь) 3,5 / 4,0 / 6,9 / 10,5 / 14,3 / 17,3 / 19,4 / 18,9 / 15,2 / 11,2 / 7,1 / 4,2 °C, Jahresmittel 11,0 °C, 52 Frosttagen, 5,7 Eistagen и 10,2 Heißen Tagen je Jahr; Эссен-Бреденей и Бохум-Лиген 0,4–0,5 К дарунтер \[Т68]. Die Sammelthreads «Wie kalt/warm ist es bei euch – Tempern im Teich» des Hobby-Gartenteich-Forums mit Hunderten Einzelmessungen wiederkehrender Teiche (14–130 м³, 1,3–2,6 м, Гессен, Северный Рейн-Вестфалия, Берлин, Бранденбург, Бавария) ergeben dazu folgendes Билд \[Форум] \[T69]:

| Монат    | Luft Ø Düsseldorf | Типичная вода (1 м) | Beobachtete Extreme                                                 |
| -------- | ----------------- | ------------------- | ------------------------------------------------------------------- |
| Январь   | 3,5               | 4–6                 | 2–3 в Кельтевеллене; 0,3–1 в 2-м Teichen mit laufender Pumpe (2012) |
| Февраль  | 4,0               | 3–6                 | 1,7 (Бранденбург, −7 °С Люфт); 3,0 под Эйс Троцем 12,7 °C Люфт      |
| Марц     | 6,9               | 6–12                | Mitte März bei Sonne 11–12                                          |
| Апрель   | 10,5              | 10–15               | –                                                                   |
| Май      | 14,3              | 15–20               | 18–21 Митте Май 2022                                                |
| Джуни    | 17,3              | 19–24               | 27–28–39–40 °C Люфт (2026 г.)                                       |
| Джули    | 19,4              | 22–26               | 28–30 на 1,3–1,4 м; 23–26 на расстоянии 2 м                         |
| Август   | 18,9              | 21–26               | 22–25 СРВ/Гессен 2020; 27–28 Берлин                                 |
| Сентябрь | 15,2              | 17–20               | Вассер 2–4 Кюбер Люфт (Нахлауф)                                     |
| Октябрь  | 11,2              | 12–17               | Анфанг 14–17 октября, Конец 10–12 октября.                          |
| Ноябрь   | 7,1               | 7–10                | Монацмиттель 7,9 (54 м³, 2011 г.)                                   |
| Декабрь  | 4,2               | 4–7                 | 2–5 в дер Кельтевелле, декабрь 2022 г.                              |

Drei Regelmäßigkeiten упал на землю. Im Sommer Liegt das Wasser 1–3 K über dem Luft-Monatsmittel (Strahlungsgewinn), im Herbst 2–4 K darüber (Wärmeträgheit), im Winter 1–3 K darüber (Bodenwärme, Dichteanomalie). Das Wasser folgt der Luft mit mehreren Tagen Verzögerung – Минимальная температура при 7–8 °C, температура при 20–8 °C – не более 20 °C, максимальная температура – 39 °C при температуре 1–2 K. Und die Tiefe entscheidet über die Sommermaxima: 1,2–1,4 m tiefe Teiche erreichten in den Hitzewellen 2020, 2022 и 2026 гг. 28–30 °C, 1,5–1,6 м, тифе 26–28 °С, 2 м и тифере 23–26 °С \[T69]. Zum Vergleich: Der flache Altmühlsee erreichte 2022: зимний минимум 1,1 °C и летний максимум 28,3 °C, дер Tiefere Schliersee 2,2 и 24,9 °C \[T70].

### 3.3 Tagesgang und Schichtung

Температура окружающей среды обычно варьируется от 1 до 3 K от 24 до 24 градусов, с минимальным курсом для зонирования и максимальным температурным режимом \[T71]. Unter Abdeckung schrumpft das auf 0,1–0,2 K: „ohne Abdeckung Temperaturschwankungen von bis zu 2 Grad pro Tag/Nacht. Mit Abdeckung und isolierter Teichwand Maxime Schwankungen von bis zu 2 Grad pro Tag/Nacht. Mit Abdeckung und isolierter Teichwand Maxime Schwankungen von 0,1–0,2 Grad" \[Форум] \[T72]. Die Vertikale hängt vom Betrieb ab: Bei laufender Umwälzungmessen Halter zwischen 1 и 2 m Tiefe 0,2–0,3 K Unterschied, „oben und unten immer gleiche Temperatur” \[Форум] \[T73]; ohne Umwälzung baut sich im Sommer tagsüber eine Schichtung auf (70-cm-Stadtteich: 25,2 °C, 20,8 °C до начала ночи; kleine Seen schichten an 64 % der Sommertage tagsüber und mischen nachts konvektiv), morgens ist der Grund 1–1,5 К по Кюлеру также 1 м \[T65]\[T74]\[T69]. Die oberste Schicht (5–15 см) weicht deutlich ab: 2,8 °C на расстоянии 10 см от 4,8 °C в январе, 19 °C на расстоянии 10 см от 8 °C Luft an einem Augustmorgen \[Форум] \[T69] – ein Schwimmthermometer Misst diese Schicht, nicht den Teich.

### 3.4 Глубина, Объем, Область

Die Mindesttiefen der Händler: Hanako 1,30 м минимум, 1,50 м стандарт, 1,60–2,50 м оптимально – «ab около 1,30 м bildet sich unter dem Eis eine stabile Schicht при температуре около 4 °C»; Koigarten Müller minestens 1,50 м для Koi, Frostsicherheit ab 1,30 м; Кой-Консалт 1,8–2 м \[Т75]\[Т76]\[Т11]. Die Messungen stützen das nur zur Hälfte: Für die Sommermaxima ist Tiefe entscheidend (3.2), für das Winterminimum zählt mehr die Ruhe als die Tiefe – ein nur 90 cm tiefer, stehender Teich unter 10 cm Eis blieb bei 4,1 °C, 2 m tiefe Teiche mit laufender Pumpe fielen 2012 при 0,3–0,5 °C \[Форум] \[T14]\[T77].

Die Abdeckung (Noppenfolie, Doppelstegplatten, Styrodur, Folientunnel, PE-Bälle) — это самый лучший вариант. Forenmessungen unbeheizter, abgedeckter Teiche: 7 °C до 0–1 °C в Außenluft, 7,5 °C в других местах до Doppelsteg плюс Styrodur, 4,5 °C до Styrodur в мороз, а также до 2,3 °C и «2–4 градуса в Тайхбодене» до Noppenfolie \[Форум] \[T72]\[T78]; beheizt abgedeckte Teiche blieben bei -10 °C Температура воздуха выше 10 °C. Herstellerangaben – Noppenfolie „bis zu 60 %" weniger Wärmeverlust, PE-Bälle „bis zu 90 %" weniger Wärmeaustausch und bis 75 % Heizkostenersparnis – sind nicht unabhängig belegt; Koigarten Müller schreibt Abdeckbällen nur «eine geringe Dämmwirkung» zu \[T75]\[T76]. Нассер Шнее auf der Abdeckung kühlt den Teich, weil er das Dämmmaterial nass und leitfähig macht \[Форум] \[T72].

### 3.5 Зима в деталях: Dichteanomalie, Eis, Umwälzung

Температура воды составляет 3,98 °C; «unterhalb einer Temperatur von etwa 4 °C в раковине Oberflächenwasser nicht nach unten» \[T79]. При температуре 4 °C около 4 °C при температуре 4 °C при температуре 4 °C в грунте, когда температура 4 °C может быть отключена от нагрева, температура 4 °C может быть нарушена, и сначала это будет сделано так, как есть. Die Eisdecke isoliert: Unter geschlossenem Eis blieb ein 1-m-Messpunkt bei zweistelligem Frost «immer noch über vier Grad», das Eis wuchs in zehn Frosttagen auf 22 cm, im Extremwinter bis 50–60 cm bei 1,2 m Bodenfrost \[Форум] \[Т69]\[Т14]. Zwei Dinge zerstören das Refugium: Sprudler und Umwälzung («Sprudler zerstört Schichtung in 3 Stunden»; «mit laufender Pumpe unter 1 °C gemessen»; «bei laufenden Anlagen wird es keine echte Temperaturschichtung geben») \[Форум] \[T69]\[T77]\[T73] и – bei umgepumpten, unabgedeckten Teichen – der Wärmeverlust über die Oberfläche, weil „permanent über die Bodenabläufe wärmeres Wasser vom Boden abgesaugt… und an der mit der Umgebungstemperatur korrespondierenden Oberfläche diesem wieder zugeführt wird" \[T80]. Der Betreiber muss sich также entscheiden: ruhender Teich mit Eisloch und 4-°C-Zone, oder umgewälzter Teich, der dann abgedeckt oder beheizt sein sollte (siehe Hauptdokument, Kapitel 5).

## 4. Heizen und Kühlen

### 4.1 Энергетическое обеспечение и Heizleistung

Die Grundrechnung ist einfach: 1,16 кВтч по кубометру и Кельвину. Мощность 25 м³ равна 29 кВтч по Кельвину, температура 30 м³ 35 кВтч \[T61]\[T83]. Schwieriger ist die Verlustleistung, und dafür gibt es einen belastbaren Praxisfall \[Форум] \[T81]: Ein 62-m³-Teich, 3 м, без ограничений, wurde mit Einem 8,4-kW-Elektroheizer при температуре 6 °C; в 60 Wintertagen вместо Heizer 628 Stunden, также работает 5 300 кВтч или 88 кВтч je Tag – im Mittel 3,7 кВт Dauerleistung, etwa 60 W je Kubikmeter, для 1 000–1 500 евро зимой \[eigene Ableitung aus den Forumsangaben]. Безопасное освещение на 21 м² с 176 Вт/м² в диапазоне 8 K Differenz zur Luft, а также на тепле с 22 Вт/м²K – это то, что нужно, чтобы получить видимую температуру (3.1) \[eigene Berechnung]. Abgedeckte Teiche brauchen einen Bruchteil: Halter mit 1–1,2-kW-Heizern an 30–38 m³ (30–40 W/m³) и температура 4–6 °C berichten, der Heizer sei „diesen Winter bisher noch nicht einmal angesprungen" \[Форум] \[T78]\[T81]. Ganzjährig Warme Teiche kosten entsprechend mehr: 70 м³ при 20–24 °C при температуре дома 12 000–15 000 кВтч в теплом месте (1 200 л Heizöl, 1 000 евро), с тепловым насосом в COP 4 и 3 000 кВтч Стром; Forenbetreibermessen an Luft-Wärmepumpen COP über 3 ab 10 °C Luft, etwa 4 bei 15 °C и 5 bei 20 °C, ein abgedeckter Teich mit Erdwärmepumpe kam mit etwa 1 400 кВтч Strom im Jahr aus \[Форум] \[T82]. Die Händler-Faustregeln beziehen sich auf Anschlussleistung, nicht auf Dauerleistung: Tauchheizer «2 000 Вт до 10 000 литров» (200 Вт/м³ с термостатом), Heizspiralen als Wärmetauscher 15 кВт до 10 м³ и 30 кВт до 30 м³ (rund 1 кВт/м³ для шнелей Aufheizen), Heizkabel etwa 40 Вт/м, Heizbälle mit 300/600 W, остановка «4–6 °C», Regelgenauigkeit ±1 °C \[T84]\[T75]. Für die Steuerung ist die Umrechnung nutzlich: 1 кВт в 30 м³ соответствует 0,69 K je Tag; ein Frischwasserzulauf ändert die Temperatur um um ΔT = (Zulauf/Volumen)·(T\_Zulauf − T\_Teich), также 7 % Tagesvolumen и 10 K Differenz um 0,7 K je Tag \[eigene Berechnung].

### 4.2 Стратегия и инициатива

**Стратегия** поддержания температуры при температуре 4–6 °C: Abdeckung, Heizung nur als Frostwächter (Sollwert 4–5 °C, «ниже 5 °C» как Auslöser \[T75]), Fütterungsstopp до 8 °C, минимальный Umwälzung ohne Tiefenabsaugung, Белюфтер флах. Ein Teil der Szene schaltet bei 2 °C sogar die Heizung ab, „damit sich eine isolierende Eisschicht bilden kann" \[Форум] \[T20]. **Утепленная** стратегия при температуре 13–16 °C или больше, лучше всего подогревать и нагревать воду, чтобы она оставалась в теплом состоянии и была сохранена в резерве; Sie ist teuer und macht die Anlage vom Strom abhängig. Für beide gilt der Übergang als kritische Phase: Im Herbst wird abgedeckt, «wenn der Teich 12 Grad» шляпа или конец октября, теплый gehaltene Teiche früher \[Форум] \[T85]; Температура воздуха составляет 1–2 K, температура падает с температурой 1 °C до 12–13 °C (Koitec24), а температура 8/10–13 °C-Fenster остается в пределах температуры 1 °C, но это недопустимо. \[Т39]\[Т40]\[Т13]. Die Physiologie gibt dazu zwei Randbedingungen: Erwärmung ist der Stressigere Vorgang (кортизол около 0,6 °C/ч) \[T41], и максимальная толерантность человека при 1 °C je Tag \[T7]. Hochwertige Japankoi brauchen nach Koi-Consult eine Heizung ohnehin, «um eine Mindesttetemperatur im Summer und im Winter sicherzustellen und um Temperaturschwankungen klein zu stopen (nicht mehr wie 2° in 24 h)» \[T11].

### 4.3 Kühlen im Sommer

Die Schwellen der Händler: активная температура до 26 °C (Hanako), максимум 27 °C (OlympiaKoi) bzw. «28 Grad nicht überschreiten», Идеальная температура 23–25 °C (Koitec24) \[T86]\[T15]\[T39]. Das wirksamste Mittel ist die Bauweise: 2 м Tiefe statt 1,3 м при температуре Hitzewellen-Maxima um 3–5 K (3,2). Danach kommt Beschattung – Sonnensegel oder Ufergehölz, von Haltern ab 25 °C Wassertemperatur aufgespannt \[Форум] \[T88]. Frischwasser aus dem Brunnen (8–11 °C) kühltmessbar, aber langsam: 2 000 л je Tag in einem etwa 50 м³-Teich brachten 0,25 K je Tag; ein Zulauf von etwa 3 % des Volumens täglich hält einen Teich nach Halterangabe bei etwa 23 °C constant \[Forum] \[T87] – die Formel aus 4.1 macht das nachrechenbar. Verdunstung über Bachlauf oder Wasserfall kühlt nachts, tagsüber bei trockener Luft schwach, bei Schwüle gar nicht (Hauptdokument, Kapitel 3.2); die Größenordnung лежит в Zehntelgraden je Nacht. Für Kühlgeräte und Erdwärmetauscher fand die Recherche keine quantifizierten Erfahrungswerte, für einen Kühlradiator die Aussage, der Effekt sei «nur gering» \[Форум] \[T88]. Было ясно, что последняя редукция: weniger Futter über 26–28 °C, keines über 30 °C, максимальная температура, keine Nachtabsenkung des Filters.

## 5. Messen und Steuern

### 5.1 Датчики и установка датчиков

Wo der Fühler sitzt, entscheidet über den Messwert. Die obersten 10 см Zeigen Sonne und Tagesgang (3.3), der Grund im Winter die 4-°C-Zone, dazwischen Liegt die Repsentative Temperatur. Erfahrene Haltermessen mit Industriefühlern в 50 см, в 100 см или в 180 см плюс 5 см, dazu die Luft в 2 м и 5 см Höhe \[Форум] \[T89]; для Regelung eignet sich ein Fühler размером 50–100 см Tiefe, ein zweiter am Grund für den Winter и опционально ein dritter размером 5–10 см для Sommeroberfläche. Die Filterkammer ist bei laufender Umwälzung gleichwertig («identische Werte», «keinen Unterschied» zwischen Bürstenkammer und Teich) \[Форум] \[T90], bei abgeschaltetem или gedrosseltem Filter im Winter dagegen kälter als der Teich. Для DS18B20 допустимая температура ±0,5 °C составляет 0,0625 °C, Pt1000 класса A ±(0,15 + 0,002·|t|) °C, класса B ±(0,3 + 0,005·|t|) °C \[T91]. Für Absolutschwellen reicht der DS18B20; для различных сообщений (Oberfläche gegen Grund, 0,2–1 K) müssen Fühlerpaare im Eiswasserbad abgeglichen или Pt1000 Klasse A eingesetzt werden. Praxishinweise: Offset in der Steuerung hinterlegen und alle paar Monate prüfen, Biofilm vom Fühler wischen, Kabelfühler können unter Eis Fehlwerte Lifern (Beispiel: 7 °C angezeigt bei fast Geschlossener Eisdecke) \[Форум] \[T90]\[T89]. Der Außenfühler gehört in eine Wetterschutzhülle auf die Nordseite \[T92]. Ein Genesis-Heizungsregler arbeitet mit Sollwert 5,5 °C и Schaltpunkten 5,3/5,7 °C, а также 0,4 K Hysterese \[Форум] \[T69] – eine brauchbare Vorgabe.

### 5.2 Соответствующие инструкции по эксплуатации

Weil der Teich eine Zeitkonstante von Tagen Hat, ghört jede Schwelle auf ein gleitendes 24-h-Mittel mit 0,4–1 K Hysterese; Моментально нажмите для тревоги. Die Bänder, zusammengeführt aus Kapitel 1–4 und dem Hauptdokument \[eigene Synthese]:

| Wassertemp. (24-h-Mittel) | Состояние                    | Насос/Фильтр (Hauptdok.)                | Fütterung                                   | Хайзен/Кюлен                                   | Alarme und Hinweise                                                            |
| ------------------------- | ---------------------------- | --------------------------------------- | ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| < 2 °C                    | lebensgefährlich             | Q\_min, продолжение, нет такта          | кеине                                       | Frostwächter hat versagt                       | Тревога; Эйслох прюфен; ночь верандерн                                         |
| 2–4 °C                    | Гренцберейх                  | Q\_мин; Ансаугунг 30–60 см под Оберфлеш | кеине                                       | Температура при 4–5 °C, мягкая температура     | Предупреждение; Костия/Chilodonella möglich, aber nicht behandelbar            |
| 4–8 °C                    | Винтерруэ (Кальциэль 4–6 °C) | 40–50 %                                 | кеине (Бахфлохкребсе, Ханако); КОИ до 10 °C | Абдекунг; Heizung как Frostwächter             | ЦЕВ-Карпфенформ при температуре 6 °С; Änderungsrate ≤ 2 K/Tag überwachen       |
| 8–13 °C                   | «Aeromonas-Fenster»          | 50–70 %                                 | Вайценкейм 1–2×/Woche bis 1×/Tag            | цугиг дурчкерен, 1–2 К/Тег; nicht als Sollwert | SVC около 11 °C; Гешвюре; Иммунная система aus; Фильтровать без ответа         |
| 13–17 °C                  | Уберганг                     | 70–90 %                                 | Weizenkeim/leicht, 1×/Tag                   | Warmziel ≥ 13–16 °C                            | Аэромонады-Максимум 15,6°С; CEV-Koiform при температуре 15 °C; KHV около 16 °C |
| 17–23 °C                  | Нормалберейх                 | 100 %                                   | нормальный, 2–3×/Тег                        | –                                              | Лайхен 17–22 °С; КВ-Фенстер; Карантин 20–24 °C                                 |
| 23–26 °C                  | Оптимальный                  | 100 %, Belüftung nachts                 | 3–4×/Тег                                    | Sommer-Obergrenze der Heizung                  | KHV-максимальная смертность; Лернея/Аргул                                      |
| 26–28 °C                  | Начало Хитцестресс           | 100 %, Belüftung maximal                | редузиерт                                   | Beschattung, Frischwasser                      | Зауэрстофф моргенс мессен; Бахлауф в ночи                                      |
| 28–30 °C                  | Хитцестресс                  | 100 %, Belüftung maximal                | резкое снижение                             | Kühlen aktiv                                   | O₂-Тревога; keine Behandlungen                                                 |
| > 30 °C                   | Gefahr                       | 100 %, Belüftung maximal                | кеине                                       | Ноткюлунг (Фришвассер, Шаттен)                 | Тревога; Änderungsrate Beachten (1 тыс./метка)                                 |

Сообщение о том, что вы находитесь на всех бандах: Eine Änderung von mehr als 2 K je 24 Stunden löst eine Warnung aus, unabhängig vom Band; и для лечения (медикаментов, залов, паразитов) необходима температура – мой миттель должен работать или при температуре выше 12–15 °C, если это необходимо, но это не означает, что температура будет выше, чем у Herstellerangaben vermerkt ist.

### 5.3 Ein einfaches Prognosemodell

Для Vorwarnungen («Teich unterschreitet in vier Tagen 8 °C – Abdeckung?») genügt ein Einknotenmodell \[eigene Ableitung, Struktur nach dem air2water-Modell für Seen \[T93]]:

```text
T_w(t+1) = T_w(t) + Δt/τ · (T_gleich − T_w(t))
```

mit T\_gleich ≈ Lufttemperatur (3–7-Tage-Prognosemittel) плюс Jahreszeit-Offset (лето +1 до +3 K, Herbst +2 до +4 K, зима +1 до +3 K, aus 3,2) и τ = 2–4 Tage für den offenen 1,5-m-Teich beziehungsweise 10–20 Tage унтер Абдекунг. Die beiden Параметр lassen sich aus den eigenen Messreihen des Teichs anpassen (τ aus der Abklingzeit nach einem Wettersturz, der Offset aus dem Monatsvergleich Wasser gegen Luft); das ist ehrlicher als jeder Literaturwert, weil Beschattung, Wind und Bodenkontakt jeden Teich anders machen. Heizung und Frischwasser gehen additiv ein (4.1). Das Modell kennt weder Eisbildung noch Schichtung; при температуре 4 °C и поддержании температуры 3,5.

## 6. Консенс, диссенс и люкен

Лучший совет в Krankheitsfenstern (WOAH, FAO, Universitäten), в физике (Dichteanomalie, Wärmekapazität, Zeitkonstante), в пределах нормы по этим 2 K je Tag als Comfortgrenze, при максимальной температуре 27–30 °C и при температуре 27–30 °C. Цвишенфенстерс 8/10–13 °C для зимней зимы. Dissens besteht beim Praxisminimum (2, 4, 5 или 6 °C), bei der Fütterungsschwelle (4, 5, 8 или 10 °C), bei der Lage des «Aeromonas-Fensters» (4,4–12,8, 5,6–16,7, 6–12 или 10–13 °C), bei der Температура иммунной системы (12,8, 13, 14–15 или 18 °C), выше KHV-Obergrenze (25 или 28 °C) и «оптимальная» (15–25 °C по KOI, 23–26 °C по Koi-Consult, 27–32 °C по температуре труда). Diese Streuung ist kein Widerspruch, sondern spiegelt unterschiedliche Fische (Wildkarpfen gegen japanische Zuchtkoi), unterschiedliche Anlagen (Teichwirtschaft gegen dicht besetzten Filterteich) и unterschiedliche Risikobereitschaft. Люккен: Für die 12,8-°C-Schwelle der Weißen Blutkörperchen gibt es keine auffindbare Primärquelle; U-Werte von Teichabdeckungen sind nicht gemessen; Kühlgeräte und Erdwärmetauscher не имеет количественной оценки; die Forenmessreihen sind Punktmessungen mit unbekannter Sensorqualität, kein Klimamittel; DWD-Bodenttemperaturnormale für NRW Waren Nicht Abrufbar; Chilodonella-Temperaturbereiche от рецензента Quellen Blieben Hinter Bezahlschranken. Для конкретного Anlage Fehlen: Tiefe, Volumen, Oberfläche, Abdeckung, Heizung, Herkunft der Fische und die eigene Messreihe – с их лассеном τ и Offset aus 5.3 в wenigen Wochen bestimmen.

## Квеллен

- \[T1] Чаттерджи и др. (2004), _Термическая толерантность и потребление кислорода у ранних мальков Labeo rohita и Cyprinus carpio_ , J. Thermal Biology 29.
- \[T2] Янар, Эрдоган и Кумлу (2019), _Термоустойчивость тринадцати видов декоративных рыб_ , Аквакультура.
- \[T3] Лонг и др. (2020), _Границы генетики_ – Kältetoleranz des Karpfens.
- \[T4] Бауэр и Шлотт (2004), _Зимовка выращиваемого обыкновенного карпа в прудах_ (Радиотелеметрия), Аквакультура 241.
- \[T5] _Sustainability_ (2022) 14:3724, Überwinterung von Karpfen in Teich und Kreislaufanlage.
- \[T6] Опушинский и др. (1989), _Верхние летальные температуры молоди карпа_ .
- \[Т7] Голованов и Смирнов (2007), _Журнал ихтиологии_ .
- \[T8] Отдел охраны окружающей среды штата Невада, _Сборник данных о термостойкости карпа_ .
- \[T9] Международная организация по изучению кои (К. Нивз), _Температура воды и кои_ .
- \[T10] С. Митчелл (mankysanke), _Обогрев прудов с карпами кои_ .
- \[T11] Koi-Consult, _Regelwerk für den Bau von Koi-Teichen_ .
- \[T12] Genesis, _Bei welcher Temperatur man Koi besser nicht überwintert_ .
- \[T13] Koi-Company, _Überwinterung/оптимальная зимняя температура/идеальная Überwinterungtemperatur_ .
- \[T14] Koi-Live-Forum, _Wintertemperatur – Erfahrungsbericht_ .
- \[T15] Koi-Live-Forum, _максимальная температура Вассера_ .
- \[T16] Йоблинг (1981), _Температурная толерантность и окончательный преференциум_ .
- \[T17] Международная организация по изучению карпов кои (С. Митчелл), _Наука о холодной воде в прудах с карпами кои_ .
- \[T18] Нидеррейн-Кои, _Koi-Überwinterung – Вассертемператур_ .
- \[T19] koiforum.uk, _Рекомендации по минимальной температуре нагрева_ .
- \[T20] Hobby-Gartenteich-Forum, тема 51374 (температура при 6–12 °C); Koi-Live-Forum, _Оптимальная температура зимой_ .
- \[T21] koifuttershop.de, _Koi-Innenhälterung_ .
- \[T22] Рийкерс и др. (1980), _Температурная зависимость иммунного ответа у карпа_ , Иммунология.
- \[T23] Ле Морван и др. (1998), J. Exp. Биол. 201:165.
- \[T24] Kloubec Koi / POND Trade, _Aeromonas Alley_ .
- \[T25] Ферма по разведению кои Катлбрук. _Обогревать или не обогревать_ ?
- \[T26] Aquaculture International (2024), _Обзор Aeromonas_ .
- \[T27] ФАО, _Культивируемые водные виды – обыкновенный карп_ (через The Fish Site).
- \[T28] Оюги и др. (2012), _Температура и рост молоди карпа_ .
- \[T29] Рыбы (2025) 10:95, _Кой-Ларвен 26–30 °C_ .
- \[T30] Специар и Турчани (2018), Knowl. Менеджер. Акват. Экосист.
- \[T31] Bachflohkrebse.de, _Koi-Fütterung im Sommer / Winterruhe_ .
- \[T32] Дж. Сандерс, доктор ветеринарной медицины, _Как кормить кои_ (cafishvet.com).
- \[T33] KOI, _Брошюра по уходу за кои 2020_ ; Коимферма Кодама, _Подготовка к зиме_ .
- \[T34] Ханако-Кои, _Ab welcher Temperatur nicht mehr füttern_ .
- \[T35] Koifriend, _Fütterungstipps_ ; Koiparadise, _Fütterung nach Temperatur_ ; koifuttershop, _Койфуттер им Летом_ .
- \[Т36] ФАО, _Руководство по разведению обыкновенного карпа_ .
- \[T37] Ханако-Кои, _Ванн вермерен сич Кои_ ; Акватоп, _Koi-Laichzeit_ .
- \[T38] Саха и др. (2002), _Физиология и биохимия рыб_ .
- \[T39] Koitec24, _Зимний фестиваль Teich / Teich im Sommer_ .
- \[T40] Koi-Live-Forum, _Wie kalt darf das Wasser im Koiteich Maximum sein im Sommer_ .
- \[T41] Такахара и др. (2011), _Гидробиология – Выделение кортизола у карпа при изменении температуры_ .
- \[T42] Эрнандес и др. (2024), _Массовая смертность Chilodonella после падения температуры_ .
- \[T43] WOAH, _Руководство по диагностическим тестам для водных животных – Инфекция герпесвирусом кои_ .
- \[T44] Гилад и др. (2003), Дж. Генерал Вирол.
- \[T45] UF/IFAS VM113, _герпесвирусная болезнь карпов кои_ .
- \[T46] WOAH, _Карточка, посвященная вирусному заболеванию «отек карпа_ » (2022).
- \[T47] Frontiers in Veterinary Science (2025), _CEV case report_ .
- \[T48] Юнг-Шроерс и др. (2015), BMC Veterinary Research.
- \[T49] Агентство по охране окружающей среды/CEFAS, _Информационный листок о вирусе отека карпа_ ; Ветеринарный университет Вены (ScienceDaily 2015).
- \[T50] ВОА, _Руководство – Весенняя виремия карпа_ .
- \[T51] Texas A\&M AgriLife, _Сапролегниаз_ .
- \[T52] Айхуа и Бухманн (2001), _Развитие температуры ихтиофтириуса_ .
- \[T53] UF/IFAS FA006, _Ichthyophthirius multifiliis_ .
- \[T54] Пиллай (через BrainKart), _Ихтиободоз_ .
- \[T55] koihealth.info / fishdoc, _Chilodonella_ (Hobby-Fachseiten; рецензируемая Temperaturbereiche nicht zugänglich).
- \[T56] Вельда, _Триходина_ .
- \[T57] _Вылупление яиц Dactylogyrus и температура_ .
- \[T58] UF/IFAS FA185, _Lernaea (якорный червь)_ .
- \[T59] UF/IFAS FA184, _Argulus (рыбья вошь)_ .
- \[T60] IFM/Агентство по охране окружающей среды, _Argulus в форелевых промыслах_ .
- \[Т61] Инженерный инструментарий, _Удельная теплоемкость воды_ .
- \[T62] Исследование теплообмена в озере Эгери (Springer).
- \[T63] Инженерный инструментарий, _Конвективная теплопередача / Испарение с поверхности воды_ .
- \[T64] Hobby-Gartenteich-Forum, _Wieviel Verdunstung — это нормально_ ; Koi-Live-Forum, _Wasserverdunstung täglich_ .
- \[T65] Frontiers in Earth Science (2019), _Ночное охлаждение городского пруда_ .
- \[T66] Википедия, _Erdwärmekollektor/Bodentemperatur_ .
- \[T67] LfU Bayern, _Grundwassertemperatur / Gewässerkundlicher Jahresbericht 2017_ .
- \[T68] DWD OpenData, _Vieljährige Mittel 1991–2020_ (Temperatur, Frosttage, Eistage, Heiße Tage).
- \[T69] Hobby-Gartenteich-Forum, _Wie kalt/warm ist es bei euch – Tempern im Teich_ 2020/2021/2022/2026.
- \[T70] LfU Bayern, _температура Зеевассера, 2022 г._
- \[T71] Международная организация по изучению карпов кои (К. Нивз), _Динамика пруда с карпами кои_ .
- \[T72] Koi-Live-Forum, _Teich abdecken im Winter ohne zu heizen Bringt gar nichts_ .
- \[T73] Koi-Live-Forum, _Schichtungen auch im Teich vorhanden_ ; Hobby-Gartenteich-Forum, _Temperaturschichtung_ .
- \[T74] Гидробиология (2018), _Суточная стратификация малых озер_ .
- \[T75] Ханако-Кой, _Wie tief muss ein Koiteich im Winter sein / Welche Teichheizung / Hitze im Sommer_ .
- \[T76] Койгартен Мюллер, _Тайхтифе_ .
- \[T77] Koi-Live-Forum, _Wintertemperatur im Teich (eigene Messung)_ .
- \[T78] Koi-Live-Forum, _Также doch Teichheizung_ .
- \[T79] Википедия, _Дихтеаномалия_ .
- \[T80] Генезис, _Пумпе в Зимнем дворце или волье Крафт вораус?_ .
- \[T81] Hobby-Gartenteich-Forum, _Stromverbrauch einer Elektroheizung im Winter_ .
- \[T82] Koi-Live-Forum, _Luft-Wärmepumpe für Koiteiche_ .
- \[T83] Koi-Live-Forum, _Heizen ja oder nein_ .
- \[T84] Händlerangaben zu Heizleistungen: teichpflege.eu (Tauchheizer); Koi-Company (Heizspiralen 15/30 кВт).
- \[T85] Koi-Live-Forum, _Ab welcher Temperatur Deckt ihr euren Teich ab_ .
- \[T86] Ханако-Кои, _Hitze im Sommer_ .
- \[T87] Koi-Live-Forum, _Brunnenwasser kühlt Teich ab_ .
- \[T88] Hobby-Gartenteich-Forum, _Heißer Sommer – wie stark sind Teiche beeinflusst / Wie hält man den Teich kühl_ .
- \[T89] Hobby-Gartenteich-Forum, _Wie macht ihr die Temperaturmessung im/am Teich_ .
- \[T90] Koi-Live-Forum, _Wassertemperatur mittels Shelly ermitteln_ .
- \[T91] Аналоговые устройства, _DS18B20 Datenblatt_ ; Википедия, _Термометр Ширестойки_ (DIN EN 60751 Klassen).
- \[T92] koiteichblog.de, _Smarte Temperaturüberwachung am Koiteich_ .
- \[T93] Пикколроаз и др. (2013), _Простая упрощенная модель для преобразования температуры воздуха в температуру поверхностных вод в озерах (air2water)_ , HESS 17.

---

## Anhang: Ableitung der Farbskala im Widget

Умереть`tempColor` -Функция (`src-widgets/src/graphics.tsx` ) setzt die **Zustandsbänder aus Kapitel 0/5.2** в Фарбене (Гренцен и Юбергенге). Das kräftige Grün Liegt bewusst auf dem **Wachstumsoptimum 23–26 °C** ; температура **8–13 °C – «Aeromonas-Fenster»** wird trotz niedriger Temperatur **gelb (Vorsicht)** markiert, weil dort Erreger aktiv sind, das Immunsystem aber nicht:

| Группа   | Фарбе    | Состояние                                                      |
| -------- | -------- | -------------------------------------------------------------- |
| < 2 °C   | Гниль    | lebensgefährlich                                               |
| 2–4 °C   | Апельсин | Гренцберейх                                                    |
| 4–8 °C   | Блау     | Винтерруэ (Калциэль)                                           |
| 8–13 °C  | Гельб    | «Аэромонас-Фенстер» – Воршихт (Erreger aktiv, Immunsystem aus) |
| 13–17 °C | Турецкий | Уберганг                                                       |
| 17–23 °C | Хеллгрюн | Нормалберейх                                                   |
| 23–26 °C | Грюн     | Wachstumsoptimum (идеал)                                       |
| 26–28 °C | Хеллгрюн | оберэр Нормалберейх                                            |
| 28–30 °C | Апельсин | Хитцестресс                                                    |
| ≥ 30 °C  | Гниль    | Gefahr                                                         |