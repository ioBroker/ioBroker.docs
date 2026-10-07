---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md
title: ShoppingRoute - Bedienungsanleitung
hash: MyBXkyjCgaRoJ+7QUx9Y27HZTzVhMy2TBfhaKG4IfV8=
---
# ShoppingRoute – Bedienungsanleitung

**Gültig ab Version 0.5.0**

ShoppingRoute hilft dir dabei, eine Alexa-Einkaufsliste so zu ordnen, wie du tatsächlich einkaufst.

## Warum ShoppingRoute beim Einkaufen wirklich hilft

Der größte Vorteil ist nicht einfach nur eine «sortierte Liste», кажется, что ShoppingRoute deine **echten Einkaufsgewohnheiten** abbildet.

### Alle Märkte in einer einzigen Liste – oder bewusst getrennt

Вы можете сделать **все возможное, чтобы получить больше информации в своем списке Alexa-Liste** . ШоппингRoute trennt die Artikel trotzdem autotisch nach Markt.

Пример:

**ЛИДЛ**

- Бананен
- Молоко
- Йогурт

**РЕВЕ**

- веганы Хак
- Оливен

**Аптека**

- Таблетки для снятия боли в голове

Так что musst du nicht ständig zwischen mehreren Listen wechseln.

Wenn du Liber getrennte Слушайте verwendest, geht das ebenfalls. Вы можете написать список для Lebensmittel и написать письмо для Baumarkt или Apotheke verwenden. ШоппингRoute unterstützt **beide Arbeitsweisen** .

### Das Besondere: dein eigener Laufweg durch jeden Markt

Der wichtigste Unterschied zu einer Normalen Einkaufsliste ist das **Marktrouting** .

Für jeden Markt legt du selbst fest, в welcher Reihenfolge du durch die Abteilungen gehst.

Когда вы LIDL zuerst an Obst und Gemüse vorbeikommst, danach an Brot, dann an Fleisch, Milchprodukten und zuletzt an Tiefkühlware, kannst du genau diesen Weg hinterlegen.

ShoppingRoute sortiert deine Artikel anschließend passend zu **deinem persönlichen Laufweg** .

Das bedeutet beim Einkauf:

- weniger Zurücklaufen,
- weniger Suchen,
- weniger vergessen,
- eine ruhigere, übersichtlichere Einkaufsliste,
- и для всех: **шнеллеры и эффективные айнкауфены** .

Jeder Markt cann dabei einen völlig anderen Laufweg haben, weil ein REWE anders aufgebaut ist als ein LIDL or ALDI. Genau das bildet ShoppingRoute ab.

Statt einer langen unsortierten Liste wie:

- Молоко
- Шраубен
- Бананен
- Йогурт
- Томатен

kann ShoppingRoute daraus zum Beispiel machen:

**ЛИДЛ**

- Бананен
- Томатен
- Молоко
- Йогурт

**БАУМАРКТ**

- Шраубен

Вы должны запрограммировать ночную техническую подсветку в заднем дворе.

---

## 1. Das Wichtigste zuerst

Wenn du ShoppingRoute neu einrichtest, brauchst du im Grunde nur fünf Dinge:

1. свои функции **Alexa2-Instanz** в ioBroker,
2. Mindestens eine Alexa-Einkaufsliste,
3. deine Märkte, zum Beispiel **LIDL** , **ALDI** или **REWE** ,
4. Produktgruppen wie **Obst/Gemüse** , **Milchprodukte** или **Getränke** ,
5. die Reihenfolge, in der du durch den jeweiligen Markt läufst.

Danach übernimmt ShoppingRoute die Sortierung.

### Eine wichtige Einstellung в Alexa-App

Откройте Einkaufsliste в Alexa-App и выберите сортировку по **A–Z** .

Если вы хотите получить выгоду, это очень важно, когда вы покупаете маршрут по алфавитной сортировке, где есть gewünschte Reihenfolge abzubilden.

Вы должны ничего не делать, если это техническая функция.

### Was bedeutet „Dry-Run“?

**Dry-Run ist ein Probetreeb.**

Solange Dry-Run eingeschaltet ist, darf ShoppingRoute deine Alexa-Liste **lesen und planen** , aber **nichts verändern** .

Это идеальный вариант для Ersteinrichtung:

- Du richtest Märkte, Artikel und Laufwege ein.
- В данный момент ShoppingRoute был такой странный.
- Deine echte Alexa-Liste bleibt dabei unverändert.

Если вы хотите, чтобы все было хорошо, попробуйте Dry-Run aus. Прежде всего, обратитесь к ShoppingRoute die Liste tatsächlich umsortieren.

Вы можете сделать Dry-Run Wie Eine Vorschau для dem Drucken vorstellen.

---

## 2. Wo finde ich was?

Шляпа ShoppingRoute ab Версия 0.5.0 zwei Bereiche.

### Adapter-Einstellungen

Unter **Instantzen → Маршрут для покупок → Schraubenschlüssel** findest du nur noch die grundlegenden Einstellungen, zum Beispiel:

- как Alexa2-Instanz verwendet wird,
- ob Dry-Run aktiv ist,
- wie unbekannte Artikel behandelt werden,
- allgemeine Sicherheits- und API-Einstellungen.

### ShoppingRoute-Verwaltung

В ссылке ioBroker-Seitenleiste gibt есть einen eigenen Eintrag **ShoppingRoute** .

Dort pflegst du alles, был du im Alltag brauchst:

- **Список покупок**
- **Статья**
- **Маркте**
- **Группы продуктов**
- **Laufwege**
- **Слушать**
- **Prüfung**

Änderungen auf dieser Seite werden Direct Gespeichert. Адаптер должен быть отключен.

---

## 3. Schnellstart – за 10 минут zur ersten sortierten Liste

### Schritt 1: Alexa2 auswählen

Отключите стандартный адаптер от ShoppingRoute.

Используйте **Allgemein** deine Alexa2-Instanz aus und speichere.

Когда вы сначала запустите Instanz gerade, öffne die Seite danach einmal neu.

### Шрифт 2: «Сухой пробег»

Aktiviere zunächst:

**Dry-Run – ничего от Алексы Шрайбен**

Damit kannst du gefahrlos einrichten und testen.

### Шрифт 3: Einkaufsliste auswählen

Öffne die neue **ShoppingRoute-Verwaltung** in der Seitenleiste und gehe auf **Listen** .

Если у вас есть список Alexa-Liste, вы можете использовать ShoppingRoute.

Für die meisten Nutzer reicht eine Liste, zum Beispiel:

**МАГАЗИН**

### Schritt 4: Märkte anlegen

Gehe auf **Märkte** und trage die Geschäfte ein, in denen du Normalerweise einkaufst.

Пример:

- ЛИДЛ
- АЛДИ
- РЕВЕ
- ЭДЕКА
- Аптека
- БАУМАРКТ

ShoppingRoute speichert Marktnamen autotisch в **GROSSBUCHSTABEN** .

Вы можете также использовать «Lidl» или «Rewe».

### Шрифт 5: Produktgruppen prüfen

Unter **Produktgruppen** legt du Bereiche fest, die ungefähr den Abteilungen eines Geschäfts entsprechen.

Пример:

- Obst/Gemüse
- Брот/Гебек
- Флейш/Фиш
- Молочные продукты
- Getränke
- Tiefkühlprodukte
- Хаушальт/Гигиена
- Непродовольственные товары
- Прочее

Вы не должны ничего делать с Warengruppe anlegen. Es reicht, wenn die Gruppen für deinen Einkauf sinnvoll sind.

### Schritt 6: Laufweg festlegen

Gehe auf **Laufwege** .

Wähle einen Markt, zum Beispiel **LIDL** , und ordne die Produktgruppen so and, wie du Normalerweise durch den Laden gehst.

Пример:

1. Obst/Gemüse
2. Брот/Гебек
3. Флейш/Фиш
4. Молочные продукты
5. Getränke
6. Tiefkühlprodukte

Когда ALDI anders aufgebaut ist, bekommt ALDI einfach einen anderen Laufweg.

### Шрифт 7: Erste Artikel prüfen

Если вы хотите прочитать **статью** о продуктах, обратите внимание на ShoppingRoute.

Ein Artikel kann zum Beispiel so eingestellt sein:

**Молоко**

- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- Торговая марка: LIDL, ALDI, REWE

### Schritt 8: Testen

Вот несколько статей, посвященных Алексе, из следующего списка, где написано:

- Бананен
- Молоко
- Йогурт
- Кола

Schau anschließend на ShoppingRoute uner **Einkaufsliste** .

При включении режима работы всухую можно включить адаптер-Einstellungen ausschalten.

Ab Dann Darf ShoppingRoute deine echte Alexa-Liste sortieren.

---

## 4. Список покупок

Unter **Einkaufsliste** siehst du die aktuelle Liste nach Märkten Gegliedert.

Пример:

**ЛИДЛ**

- Бананен
- Томатен
- Молоко
- Йогурт

**РЕВЕ**

- веганы Хак

### Artikel verschieben

Если вы хотите найти статью на фальшивом рынке, вы можете получить прямой доступ к ней.

Je nach Ansicht stehen dafür Drag & Drop, Pfeiltasten или eine Marktauswahl zur Verfügung.

Eine manuelle Änderung Hat Vorrang vor der der Autotischen Zuordnung.

### Artikel löschen

Mit **Löschen** entfernst du den Eintrag aus der aktuellen Alexa-Einkaufsliste.

Der Artikel selbst bleibt im Artikelstamm erhalten und kann später Wieder verwendet werden.

---

## 5. Маркте

Unter **Märkte** verwaltest du deine Geschäfte.

Ein Markt besteht im Wesentlichen aus:

- **Имя**
- **Актив**
- **Рейенфолге**
- **Псевдоним**

### Was sind Aliase?

Альтернативный псевдоним Bezeichnungen für Denselben Markt.

Пример:

**РЕВЕ**

Псевдоним:

- Реве Маркет
- Центр Реве

Wenn du später sagst:

«Setze Milch bei Rewe Center auf die Einkaufsliste»

kann ShoppingRoute trotzdem erkennen, dass **REWE** gemeint ist.

### OHNE MARKT

**OHNE MARKT** — это Auffangbereich.

Dort können Artikel Landen, wenn ShoppingRoute noch nicht weiß, welchem Geschäft sie zugeordnet werden sollen.

---

## 6. Группы продуктов

Produktgruppen beschreiben, **wo im Laden ein Artikel ungefähr zu finden ist** .

Примеры:

- Bananen → Obst/Gemüse
- Молоко → Молочные продукты
- Cola → Getränke
- Tiefkühlpizza → Tiefkühlprodukte

Sie sind wichtig, weil ShoppingRoute damit deinen Laufweg durch den Markt nachbildet.

Du brauchst keine Perfecte Warenwirtschaft. Die Gruppen sollen nur beim praktischen Einkauf helfen.

---

## 7. Laufwege

Ein Laufweg ist einfach die Reihenfolge, in der du an den Abteilungen eines Marktes vorbeikommst.

Пример для LIDL:

1. Obst/Gemüse
2. Брот/Гебек
3. Флейш/Фиш
4. Молочные продукты
5. Getränke
6. Tiefkühlprodukte

ShoppingRoute versurucht dann, die Artikel in genau dieser Reihenfolge auf deiner Einkaufsliste anzuzeigen.

Jeder Markt kann einen eigenen Laufweg haben.

---

## 8. Статья

Unter **Artikel** verwaltest du den Produktstamm.

Статья для праздника:

### Имя

Обычное название продуктов.

Пример:

**Молоко**

### Псевдоним

Andere Wörter, die dasselbe Produkt meinen.

Действия для «Hackfleisch»:

- Взлом
- Риндерхак

### Группа продуктов

Wo der Artikel im Laden zu finden ist.

Пример:

Молоко → Молочные продукты

### Стандартмаркт

Der Markt, in dem du diesen Artikelnormalerweise kaufst.

Пример:

Милч → ЛИДЛ

### Verfügbare Märkte

Weitere Geschäfte, in denen der Artikel ebenfalls gekauft werden kann.

Пример:

Молоко:

- ЛИДЛ
- АЛДИ
- РЕВЕ

Таким образом, ShoppingRoute может быть более гибким.

---

## 9. Эйнен Маркт напрямую от Алексы Неннен

Вы можете посетить ShoppingRoute ausdrücklich sagen на welchem Markt ein Artikel gekauft werden soll.

Пример:

- «Milch von REWE»
- «Кола в LIDL»
- «Кофейня в ALDI»

Diese Angabe Hat Vorrang vor der Normalen Autotischen Zuordnung.

Если вы также сынок Milch bei LIDL kaufst, aber diesmal ausdrücklich «Milch von REWE» sagst, bleibt sie bei REWE.

---

## 10. Mengenangaben

Вы можете сказать, что Алекса не знает, как это сделать.

Пример:

- 2 молока
- 3 упаковки молока
- две бутылки колы
- Картофель 1,5 кг
- 6x Wasser
- halbes Kilo Hack

ShoppingRoute versurucht dabei, den eigentlichen Artikel zu erkennen und die Mengenangabe sichtbar zu erhalten.

---

## 11. Был ли passiert mit unbekannten Artikeln?

Если вы не знаете эту статью, то ShoppingRoute noch nicht kennt, gibt es drei Möglichkeiten.

Вы должны установить обычный адаптер-Einstellungen ein.

### Первый тест

Der neue Artikellandet unter **Prüfung** .

Это лучший способ Einstieg лучше всего Einstellung.

Du kannst dort kontrollieren:

- Название продукта
- Группа продуктов
- Стандартмаркт
- weitere verfügbare Märkte
- Псевдоним

Danach kannst du den Artikel übernehmen.

### Automatisch lernen

ShoppingRoute versurucht neue Artikel selbstständig in den Produktstamm aufzunehmen.

Das ist bequem, aber für eine neue Installation weniger übersichtlich.

### Nicht lernen

Unbekannte Artikel werden nicht dauerhaft Gespeichert.

---

## 12. Prüfung

Unter **Prüfung** findest du unbekannte или noch nicht bestätigte Artikel.

Пример:

Шляпа Alexa «Skyr» добавлена, ShoppingRoute kennt Skyr aber noch nicht.

Dann kannst du dort festlegen:

- Имя: Скайр
- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- другие рынки: ALDI, REWE

Mit **Übernehmen** wird der Artikel dauerhaft в ден Artikelstamm aufgenommen.

С **игнорированием** ничего не происходит.

---

## 13. Welcher Markt gewinnt?

Meist musst du dich um diese Regeln nicht kümmern.

Falls du aber wissen möchtest, warum ein Artikel in einem bestimmten Markt gelandet ist, gilt vereinfacht diese Reihenfolge:

1. Ein Markt, den du ausdrücklich bei Alexa genannt hast
2. der Standardmarkt des Artikels
3. ein vorübergehend gewählter Markt für den aktuellen Einkauf
4. der Standardmarkt der verwendeten Alexa-Liste
5. общий стандартный рынок
6. ein anderer erlaubter Markt
7. OHNE MARKT

Ein ausdrücklich genannter Markt gewinnt также immer.

---

## 14. Безопасность

ShoppingRoute schreibt nicht beliebig часто на Алексе-Листе.

Если это не было сделано на Amazon, это не лучший вариант, возможно, адаптер будет **отключен** .

Das bedeutet:

**ShoppingRoute останавливается в Weitere Änderungen, statt auf Verdacht weiterzuschreiben.**

Если вы хотите, чтобы это произошло, вы можете получить актуальный список Alexa-Liste und die Fehlermeldung.

Ein Sicherheitsstopp — это kein Datenverlust, sondern eine Schutzfunktion.

---

## 15. Было ли в Alexa слово «20>»?

Manchmal siehst du auf der Alexa-Liste Einträge wie:

`20> Milch`

oder eine Überschrift wie:

`40> ═════ LIDL ═════`

Diese Zeichen verwendet ShoppingRoute стажер, дай Алекса умереть в списке в der gewünschten Reihenfolge anzeigt.

**Du musst damit nichts tun.**

Bitte ändere или Entferne Diese Zahlen nicht manuell, solange ShoppingRoute die Liste verwaltet.

Это технический трюк для сортировки.

---

## 16. Шоппинг-роут был нерабочим

ShoppingRoute:

- hakt keine Artikel autotisch als erledigt ab,
- bestellt nichts,
- kauft nichts,
- löscht deinen Artikelstamm nicht, wenn du einen Eintrag aus der aktuellen Einkaufsliste entfernst,
- Для нормальной эксплуатации и использования изделий рекомендуется использовать адаптер или адаптер Neustart.

---

## 17. Когда это не работало

### Die Liste wird nicht sortiert

Prüfe:

1. Можно ли использовать список Alexa-App в приложении Alexa-App от **A до Z** ?
2. Является ли список Alexa-Liste активным для **прослушивания** ?
3. Является ли Dry-Run vielleicht noch eingeschaltet?
4. Läuft die Alexa2-Instanz?
5. Zeigt ShoppingRoute einen Fehler или Sicherheitsstopp an?

### Ein Artikel Landet im Falschen Markt

Прюфе ден Артикель унтер **Артикель** :

- Стандартмаркт
- verfügbare Märkte
- Группа продуктов

Вы также можете перейти прямо в Einkaufsliste.

### Новая статья чувствовалась в Artikelstamm

Schau unter **Prüfung** .

Если вы выбрали «Первоначальный метод обучения», то это значит, что вам нужно выбрать лучший вариант.

### Ein Button reagiert nicht

Если вы путешествуете по торговому маршруту, где есть места для покупок на Amazon, вы можете получить больше удовольствия от покупок. Warte, bis der Vorgang bedetist, und versuche es dann erneut.

---

## 18. Für Fortgeschrittene

Der folgende Abschnitt ist für den Normalen Betrieb **nicht erforderlich** .

### Temporärer Prioritätsmarkt

Для того, чтобы получить больше информации, вы можете воспользоваться рынком:

`shoppingroute.0.control.temporaryPriorityMarket`

### Предварительное

Technische Vorschau-Informationen stehen unter anderem в:

`shoppingroute.0.info.preview`

`shoppingroute.0.info.previewText`

`shoppingroute.0.info.lastPlan`

### Конфигурационная защита

В версии 0.5.0 есть большие каталоги, которые можно использовать в качестве Laufzeitdaten для:

`shoppingroute.0.data.managedConfig`

gespeichert.

Если вы хотите, чтобы информация, информация, статья и другие данные были добавлены, вы должны получить доступ к обновлению администратора при помощи пакета-стандарта.

### Sortierpräfixe

Die sichtbaren Zahlen von `00>` бис `99>` Sind Interne Sortierschlüssel.

ShoppingRoute не дает вам покоя, когда Алекса-Список умирает, он будет свободен от определенных ограничений. Durch die Einstellung **A–Z** werden diese Zahlen алфавитный bzw. числовые значения в Gewünschte Reihenfolge gebracht.

Для нормального использования необходимо знать, что технология неизвестна.

---

## 19. Empfehlung für neue Nutzer

Для новой установки необходимо:

1. Alexa-Liste auf **AZ** stellen.
2. Dry-Run einschalten.
3. Märkte anlegen.
4. Produktgruppen prüfen.
5. Laufwege einrichten.
6. einige typische Artikel hinzufügen.
7. unter **Einkaufsliste** und **Prüfung** kontrollieren.
8. Dry-Run ausschalten.
9. einen echten Einkauf testen.

Danach erledigt ShoppingRoute den größten Teil der Arbeitautotisch.

### Слушайте и рассказывайте статьи

Unter **Listen → В Alexa anlegen** erstellt ShoppingRoute eine echte Alexa-Liste und speichert ihre Zuordnung direkt. Сначала лучше всего пользоваться Amazon zählt als Erfolg. Список будет добавлен в приложение Alexa App для Handy zur Verfügung. Bereits vorhandene Namen werden wiederverwendet.

Im Bereich **Einkaufsliste** kannst du über **Neuen Artikel hinzufügen → Hinzufügen** direkt in die ausgewählte Alexa-Liste schreiben, auch wenn diese noch leer ist. Адаптер не работает при последующей сортировке. Bei einem Fehler bleibt deine Eingabe erhalten. Dry-Run und Schreibschutz gelten также здесь. Слушайте Alexa-Listen Blockieren keine Anderen Listen.