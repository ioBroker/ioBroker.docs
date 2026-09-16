---
chapters: {"pages":{"en/adapterref/iobroker.heizungssteuerung/README.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README.md"},"en/adapterref/iobroker.heizungssteuerung/README_DE.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizungssteuerung/README_DE.md
title: ioBroker.heizungssteuerung
hash: O4ik/HOtPgHN8SmuyAIXRRCAQZancMqXX6Kt2Q87kWo=
---
# ioBroker.heizungssteuerung

![Версия NPM](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Статус зависимости](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Известные уязвимости](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)
![Тестирование и выпуск](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)

![Логотип](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

## Адаптер ioBroker для Heizungssteuerung

Этот адаптер предназначен для быстрой установки ioBroker-Installationen. Er unterstützt sowohl Heizals auch Kühlmodus mit erweiterten Funktionen wie Boost-Modus, Pause-Funktionalität und Zeitbasierter Temperaturplanung.

[🇬🇧 Английская версия](/#/adapters/heizungssteuerung)

## Функции

- **Двойной режим-Unterstützung** : Wechseln zwischen Heiz- und Kühlmodus
- **Wetterbasierte Steuerung** : Автоматическое активирование/деактивирование базового режима при пониженной температуре
- **Режим повышения** : Временное изменение температуры/Временное изменение температуры
- **Режим паузы** : Временное выключение режима нагрева/выключение для наилучшего замедления
- **Zeitbasierte Planung** : Определение температурного периода для различных сроков и температур
- **Raumbasierte Steuerung** : Индивидуальная температура для вашего помещения
- **Feuchtigkeitssteuerung** : Stopp der Kühlung bei Erreichen von Feuchtigkeitsschwellenwerten
- **Abwesenheitsmodus** : Снижение температуры при использовании или длительном использовании.
- **Изменение температуры** : Manuelle Überschreibung der Zieltemperaturen bei Bedarf

## Установка

### Uber die ioBroker Admin-Oberfläche

1. Открыть страницу администратора ioBroker
2. Gehen Sie zum Tab "Adapter"
3. Сухен Sie nach "heizungssteuerung"
4. Нажмите кнопку «Установщики»

### О npm

```bash
npm install iobroker.heizungssteuerung
```

## Schnellstart-Anleitung

### 1. Raumstruktur einrichten

Чтобы настроить адаптер, необходимо использовать его структуру в ioBroker:

1. Navigieren Sie zu **Objekte → Aufzählungen → Räume**
2. Erstellen Sie Räume für jeden Bereich, den Sie steuern möchten (zB "Wohnzimmer", "Schlafzimmer", "Küche")
3. Следуйте инструкциям ниже:
   - Датчики температуры
   - Heiz-/Kühlstellglieder (Ventile, Schalter и т. д.)
   - Feuchtigkeitssensoren (опционально)

### 2. Funktionen konfigurieren

Richten Sie die erforderlichen Funktionen unter **Objekte → Aufzählungen → Funktionen** ein:

- **Температура** : Все параметры датчика температуры
- **Feuchtigkeit** : Feuchtigkeitssensor-Zustände hinzufügen (опционально)
- **Антриб** : Alle Heiz-/Kühlstellglied-Zustände hinzufügen

### 3. Конфигурация адаптера

#### Grundeinstellungen

- **Betriebsmodus** : Wählen zwischen "Heizen" и "Kühlen"
- **Prüfintervall** : Частота изменения температуры адаптера (в минутах)
- **Стандартная температура** : Резервная температура, при прохождении определенного периода
- **Температура-гистерезис** : Temperaturdifferenz-Schwellenwert für Ein-/Ausschalten der Heizung/Kühlung

#### Zeitbasierte Perioden

Конфигурация температурного режима для вашего помещения:

1. Доступ к раскрывающемуся списку
2. Setzen Sie Start- und Endzeiten
3. Definieren Sie die Zieltemperatur
4. Wählen Sie Wochentage
5. Geben Sie an, ob diese Periode für Heizoder Kühlmodus ist

#### Erweiterte Einstellungen

- **Пауза-длительность** : автоматический сброс-время паузы (минуты)
- **Boost-Dauer** : автоматический сброс времени для режима повышения (минуты)
- **Feuchtigkeitsschwellenwert** : Maximale Feuchtigkeit bevor Kühlung stoppt
- **Сброс пуска** . : Überschreibt alle Climaten mit Standardwerten beim Adaptor-Start.

#### Wetterbasierte Steuerung (опционально)

Интеллектуальный Betrieb basierend auf der Außenttemperatur:

- **Активация Wettersteuerung** : Wetterbasierte Heiz-/Kühlsteuerung aktivieren
- **Wetterdatenquelle** : Штат с Außentemperaturdaten auswählen
- **Heizschwellenwert** : Heizung nur aktivieren wenn Außentemperatur unter diesem Wert Liegt (Стандартная температура: 15°C)
- **Kühlschwellenwert** : Кюлунг нур активен при температуре окружающей среды или температуре окружающей среды (стандарт: 24°C)

**So funktioniert es:**

- Im Heizmodus: Система работает при температуре окружающей среды < Schwellenwert
- Im Kühlmodus: Система Arbeitet Nur Wenn Außenttemperatur > Schwellenwert
- Hat Vorrang vor allen anderen Einstellungen (Perioden, Boost, Abwesenheit)
- Bei fehlenden Wetterdaten Arbeitet das System Normal als Fallback

## Verwendung

### Manuelle Steuerungsaktionen

Другие действия адаптера`heizungssteuerung.0.Actions` :

#### Globale Aktionen (Alle Räume)

- **отсутсвие** : Abwesenheitsmodus bis zu einem bestimmten Datum/Zeit setzen
  - Формат:`dd.MM.yyyy HH:mm` (zB "01.01.2024 14:00")
  - Эффект: Игнорирование периода и изменение стандартной температуры.
- **пауза : Alle Heizung/Kühlung temporär pausieren**
- **boost** : Режим повышения для всех активных режимов

#### Raumspezifische Aktionen

Für jeden Raum finden Sie:

- **пауза** : Heizung/Kühlung nur für diesen Raum pausieren
- **boost** : Boost-Modus nur für diesen Raum aktivieren
- **targetTemp** : Максимальная температура окружающей среды.

### Примеры конфигураций

#### Базис-Хайцплан

```
Raum: Wohnzimmer
Zeit: 06:00 - 22:00
Tage: Montag bis Freitag
Temperatur: 21°C
Modus: Heizen
```

#### План выходных

```
Raum: Wohnzimmer  
Zeit: 08:00 - 24:00
Tage: Samstag, Sonntag
Temperatur: 22°C
Modus: Heizen
```

#### Ночная температура

```
Raum: Schlafzimmer
Zeit: 22:00 - 06:00
Tage: Alle Tage
Temperatur: 18°C
Modus: Heizen
```

## Konfigurationsbeispiele

### Typische Heimeinrichtung

1. **Wohnbereiche** : 21°C на ночь, 19°C на ночь.
2. **Шлафциммер** : 19°C в ночное время, 16°C в ночное время.
3. **Бадезиммер** : 22°C моргенс/абенд, 19°C сонст.
4. **Температура воздуха** : 21°C при температуре окружающей среды, 18°C при температуре окружающей среды.

### Энергеспар-Типпс

- Verwenden Sie niedrigere Nachttemperaturen (снижение на 2-3°C)
- Setzen Sie Abwesenheitstemperaturen 3-5°C ниже нормы
- Конфигурация режима повышения температуры для автоматической регулировки температуры.
- Nutzen Sie Feuchtigkeitssteuerung zur Vermeidung von Überkühlung

## Fehlerbehebung

### Häufige Probleme

**Температурный режим sich nicht**

- Prüfen Sie, ob Raum-Aufzählungen правильная конфигурация
- Проверьте, какие температурные датчики используются для корректировки.
- Stellen Sie sicher, dass Stellglieder in der "Antrieb"-Funktions-Aufzählung sind

**Perioden funktionieren nicht**

- Verifizieren Sie das Zeitformat (24-Stunden-Format)
- Prüfen Sie, ob Betriebsmodus zur Periodenconfiguration passt
- Bestätigen Sie die Raumauswahl in den Periodeneinstellungen

**Feuchtigkeitssteuerung funktioniert nicht**

- Fügen Sie Feuchtigkeitssensoren sowohl zu Raum-als auch Funktions-Aufzählungen hinzu
- Prüfen Sie die Feuchtigkeitsschwellenwert-Einstellungen
- Verifizieren Sie, dass Sensoren aktuelle Daten Lifern

### Отладочная информация

Активируя отладку-регистрацию в адаптере, вы можете получить подробную информацию о следующем:

- Temperaturberechnungen
- Сопоставление периодов
- Stellglied-Steuerungsentscheidungen
- Fehlerbedingungen

## Лицензия

Лицензия MIT

Авторские права (c) 2024 jbeenenga <j.beenenga@gmail.com>

Hiermit wird unentgeltlich jeder Person, die eine Kopie der Software und der zugehörigen Dokumentationen («Программное обеспечение») erhält, die Erlaubnis erteilt, sie uneingeschränkt zu nutzen, inklusive und ohne Ausnahme mit dem Recht, sie zu verwenden, zu kopieren, zu verändern, zusammenzufügen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen diese Software überlassen wird, diese Rechte zu verschaffen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk in allen Kopien или Teilkopien der Software beizulegen.

ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ, КОТОРОЕ НЕ ДОЛЖНО УСЛОВИТЬ, ИЛИ ПОДКЛЮЧАЕТСЯ ГАРАНТИИ, ДЕЙСТВУЕТ ГАРАНТИИ НА ЛУЧШЕЕ ПРАВИЛЬНОЕ ОБЕСПЕЧЕНИЕ И НЕОБХОДИМОЕ ОБЕСПЕЧЕНИЕ. DIE AUTOREN ODER COPYRIGHTINHABER SIND NICHT HAFTBAR FÜR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE, EGAL OB DIESE DURCH DIE ERFÜLLUNG EINES VERTRAGES, UNERLAUBTE HANDLUNGEN ODER ANDERWEITIG ENTSTEHEN ODER IN VERBINDUNG MIT DER ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ДАЛЬШЕ.

## Danksagungen

Иконка от Freepik ( <https://www.flaticon.com/de/kostenloses-icon/heizung_1295221> )

---

**Unterstützen Sie dieses Projekt** ⭐ Geben Sie diesem Repository einen Stern, wenn Sie es hilfreich finden!