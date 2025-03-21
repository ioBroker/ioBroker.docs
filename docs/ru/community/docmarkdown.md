---
title: Уценка
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/community/docmarkdown.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
# Маркдаун: синтаксис
?> Чтобы документация ioBroker могла создаваться быстро и ее было легко читать, в качестве упрощенного языка разметки был выбран Markdown. Следующие инструкции помогут вам познакомиться с синтаксисом и возможностями Markdown и преобразовать их в отличные документы.

Технически системой документации поддерживаются только следующие возможности:

- Заголовки
-Таблицы
- Встроенный HTML
- Списки
- Левый
-Изображения
- Жирный текст
- Курсивный текст

## Обзор
### Философия
Markdown был разработан с целью сделать его максимально простым для чтения и записи.

Читабельность здесь является основной целью. Документ в формате Markdown должен иметь возможность публиковаться в своей базовой форме без каких-либо тегов или форматирования (как в случае с HTML).

Соответственно, синтаксис Markdown состоит только из символов, тщательно подобранных так, чтобы их внешний вид соответствовал их значению. Например, звездочки вокруг слова на самом деле выглядят как \*акцент\*. Списки в Markdown выглядят как списки. Даже блоки цитат выглядят как цитируемые отрывки текста, которые вы видите в электронных письмах.

### Встроенный HTML
Синтаксис Markdown имеет одну цель: его можно использовать для *записи* для Интернета.

Markdown не является заменой HTML, даже близко. Объем синтаксиса очень мал и соответствует лишь небольшой части всех HTML-тегов. Целью Markdown не является упрощение вставки HTML-тегов. HTML уже достаточно прост. Идея Markdown — максимально упростить чтение, написание и редактирование текста. HTML — это *формат публикации*; Markdown — это *формат письма*. Следовательно, его синтаксис учитывает только контент, который можно передать с помощью чистого текста.

Для любого форматирования, которое невозможно выполнить с помощью Markdown, вы можете просто использовать HTML. Нет необходимости выделять HTML, чтобы отделить его от остального.
Это просто прописано в тексте.

Единственное ограничение — это блочные элементы, такие как `<div>`, `<table>`, `<pre>`, `<p>` и т. д. Они должны быть отделены от окружающего контента пустыми строками, а начальный и конечный теги не должны иметь отступов с пробелами или табуляциями. Markdown достаточно умен, чтобы не помещать дополнительные (нежелательные) теги `<p>` вокруг блоков HTML.

Например, вы можете включить таблицу HTML в статью Markdown:

    Это обычный абзац.

<table><tr><td>Фу</td></tr></table>

    Это еще обычный абзац.

Следует отметить, что синтаксис Markdown не интерпретируется внутри блоков HTML. Например, *выделение* нельзя использовать в блоках HTML.

Встроенные HTML-теги, такие как `<span>`, `<cite>` или `<del>`, можно использовать в любом месте абзаца Markdown, пункта списка или заголовка.
HTML-теги можно использовать даже вместо соответствующего форматирования Markdown. Нет проблем просто использовать `<a>` или `<img>` вместо синтаксиса Markdow для ссылок или графики.

В отличие от блочных тегов, синтаксис Markdown *интерпретируется* внутри встроенных тегов.

### Автоматическое маскирование специальных символов
В HTML есть два символа, требующие особого обращения: `<` и `&`.
Левая угловая скобка используется для открытия HTML-тегов, амперсанд используется для описания именованных символов (сущностей). Если эти символы будут использоваться как «сами по себе» в документах HTML, их необходимо экранировать как объекты, то есть как `&lt;` и `&amp;`.

Амперсанд особенно неудобен для веб-разработчиков. Если вы хотите написать о «AT&T», вам нужно написать «`AT&amp;T`». Амперсанд необходимо экранировать даже в URL-адресах. В ссылке на страницу

`http://images.google.com/images?num=30&q=larry+bird`

URL-адрес должен быть закодирован следующим образом:

`http://images.google.com/images?num=30&amp;q=larry+bird`

Об этом легко забыть, и это, вероятно, самая распространенная ошибка при проверке правильно сформированных HTML-документов.

Markdown позволяет использовать эти символы в обычном режиме. Он регулирует само кодирование. Если в объекте используется амперсанд, он не кодируется, в противном случае преобразуется в `&amp;`.

Например, если вы хотите ввести символ авторского права, вы можете просто

`&copy;`

write, и Markdown не изменит это. Но вне

`AT&T`

становится уценкой

`AT&amp;T`

делать. Поскольку Markdown поддерживает встроенный HTML, угловые скобки в этом случае рассматриваются как HTML. Просто из таких вещей, как

`4 < 5`

становится уценкой

`4 &lt; 5`

делать. Однако в блоках кода или диапазона угловые скобки и амперсанд *всегда* кодируются. Это упрощает написание HTML в Markdown (в отличие от необработанного HTML, где кодирование каждого `<` и `&` является по большей части кошмаром).

## Блочные элементы
### Абзацы и разрывы строк
Абзац просто состоит из одной или нескольких строк текста, разделенных одной или несколькими пустыми строками. (Пустая строка — это любая строка, которая *выглядит* как пустая строка — строка, не содержащая ничего, кроме пробелов и табуляции, считается пустой.) Обычные абзацы не должны иметь отступов с пробелами или табуляциями.

Правило «одна или несколько строк» подразумевает одно: Markdown поддерживает абзацы с «жесткими разрывами». Это большое отличие от большинства других средств форматирования текста в HTML (включая опцию «Преобразовать разрывы строк» Movable Type), которые форматируют каждый разрыв строки в абзаце как `<br />`.

Если вы *хотите* иметь `<br />` в качестве разрыва, вы можете просто закончить строку двумя или более пробелами.

Хотя создание `<br />` требует небольших затрат, простое правило «каждый разрыв строки является `<br />`» не будет работать в Markdown.

Стиль электронной почты Markdown с несколькими абзацами [Цитаты](#quotes) и [записи списка](#listen) работает лучше всего (и выглядит лучше) при форматировании с разрывами строк.

[bq]: #blockquote

[l]:  #list

### Заголовки
Markdown здесь поддерживает только один тип форматирования заголовка: atx.
Заголовки в стиле ATX используют 1–6 хеш-символов в начале строки, что соответствует уровням 1–6. Например:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

### Кавычки
Как и электронная почта, Markdown использует символ `>` для блоков цитат. Если у вас есть опыт работы с кавычками в электронных письмах, вы также знаете, как создавать кавычки в Markdown. Лучше всего будет переносить текст по строкам и помещать `>` перед каждой строкой:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

Но Markdown также позволяет вам лениться и использовать `>` только в первой строке жестко завернутого абзаца:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

Цитаты могут быть вложенными (т. е. цитата внутри цитаты), используя дополнительные `>`:

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

Кавычки могут содержать другие элементы Markdown, включая заголовки, списки и блоки кода:

> ## Это заголовок.
> > 1. Это первый пункт списка.
> 2. Это второй пункт списка.
> > Вот пример кода: > > returnshell_exec("echo $input | $Markdown_script");

Любой приличный текстовый редактор должен упростить цитирование в стиле электронной почты. Например, в BBEdit вы можете сделать выбор и выбрать `Increase Quote Level` из меню `Text`.

### Списки
Markdown поддерживает отсортированные (нумерованные) и несортированные списки (перечисления).

В неупорядоченных списках в качестве маркеров списка используются звездочки, плюсы и дефисы (взаимозаменяемо):

    *   Красный
    *   Зеленый
    *   Синий

то же самое:

+ Красный + Зеленый + Синий

И:

    -   Красный
    -   Зеленый
    -   Синий

В отсортированных списках используются числа, за которыми следует точка:

    1. Собака
    2. Кот
    3. Мышь

Важно понимать, что сами цифры не влияют на вывод Markdown. Markdown создает следующий HTML-код из последнего списка:

<ol><li>Собака</li><li> Кот</li><li> Мышь</li></ol>

Если вместо этого вы напишете список следующим образом:

    1. Собака
    1. Кот
    1. Мышь

Или даже:

    3. Собака
    1. Кот
    8. Мышь

Каждый раз выходит один и тот же список. При желании вы можете правильно нумеровать свои списки вручную. Но если вы хотите полениться, вы всегда можете использовать один и тот же номер.

Однако начинать список все равно следует с номера 1. В будущем Markdown, возможно, захочет установить начальный номер для первой записи списка.

Записи списка обычно начинаются с левого края документа, но могут иметь отступ до трех пробелов вправо.
Маркеры списка должны быть отделены от следующего текста одним или несколькими пробелами или табуляцией.

Чтобы правильно отформатировать списки, отдельные записи можно сделать с отступом, например:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit miposere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec сидеть amet nisl. Aliquam semper ipsum сидит амет велит.

        Suspendisse id sem consectetuer libero luctus adipiscing.

Следующий пример генерирует тот же код, но менее аккуратный:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit miposere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec сидеть amet nisl. Aliquam semper ipsum сидит амет велит.

    Suspendisse id sem consectetuer libero luctus adipiscing.

Если записи списка разделены пустыми строками, Markdown обернет записи списка `<p>` и `</p>`.

Например, это будет:

    * Варштайнер
    * Король

к

<ul><li>Варштайнер</li><li> король</li></ul>

Но это:

    * Варштайнер

    * Король

становится слишком

<ul><li><p>Варштайнер</p></li><li><p> король</p></li></ul>

Элементы списка могут состоять из нескольких абзацев. Каждый следующий абзац в элементе списка должен иметь отступ не менее 4 пробелов или табуляции:

    1. Это пункт списка, состоящий из двух абзацев. Лорем ipsum dolor

сидите с уважением, consectetuer adipiscing elit. Aliquam hendrerit miposere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec сидеть амет нисл. Aliquam semper ipsum сидит амет велит.

    2. Suspendisse id sem consectetuer libero luctus adipiscing.

Хорошо выглядит, когда каждая строка следующего абзаца имеет отступ, но опять же, Markdown позволяет ленивым делать отступ только в первой строке:

    *Это элемент списка, состоящий из двух абзацев.

Это второй абзац в этом пункте списка. Отступ нужен только для первой строки. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

    * Еще один пункт в том же списке.

Чтобы использовать кавычку в пункте списка, кавычка должна быть с отступом:

    * Элемент списка с цитатой:

> Это цитата > В списке.

Чтобы использовать блок кода в элементе списка, он должен иметь отступ *два* — 8 пробелов или две табуляции:

    * Элемент списка с примером кода:

            <вставьте сюда код>

Списки можно создавать непреднамеренно, например.
пишет следующее:

    1986. Какой чудесный год.

Другими словами: последовательность *число-точка-пробел* в начале строки. Чтобы избежать этой проблемы, точку можно замаскировать с помощью обратной косой черты:

    1986\. Какой чудесный год.

<h3 id="precode">Блоки кода</h3>

Предварительно отформатированные блоки кода используются для записи поверх исходного кода программы или разметки. Вместо формирования обычных абзацев строки в блоке кода интерпретируются как найденные. Markdown включает блоки кода с тегами `<pre>` и `<code>`.

Чтобы создать блок кода в Markdown, просто сделайте отступ в каждой строке блока не менее 4 пробелов или табуляции. Из следующего ввода...

    Это обычный абзац.

        Это блок кода.

...Markdown делает следующее:

    <p>Это обычный абзац.</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

Из каждой строки отступа удаляется один уровень отступа (4 пробела или 1 табуляция). Например, следующее...

    Пример в AppleScript:

сообщить приложению "Фу" завершить звуковой сигнал

...становится слишком

    <p>Пример в AppleScript:</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

Блок кода заканчивается на первой строке без отступа (или в конце документа).

В блоке кода амперсанд (`&`) и угловые скобки (`<` и `>`) автоматически преобразуются в объекты HTML. Это значительно упрощает включение фрагментов HTML — просто скопируйте HTML в документ, сделайте отступ, и Markdown выполнит кодировку амперсандов и угловых скобок. Например:

<div class="footer">© 2004 Корпорация Фу</div>

становится:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Обычный синтаксис Markdown не обрабатывается в блоках кода. Т.е.
Звездочки — это просто звездочки в блоке кода и не являются сигналом для выделения текста. В результате легко говорить *о* Markdown в Markdown.

<a id="hr"></a>

### Горизонтальные линии Тег горизонтальной линии (`<hr />`) может быть создан путем написания 3 или более дефисов или звездочек в строке. Допускаются также пробелы между символами. Все следующие примеры будут генерировать горизонтальную линию:
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Элементы диапазона
<a id="link"></a>

### Ссылки
Markdown поддерживает два типа ссылок: *встроенные* и *ссылки*.

В обоих стилях текст ссылки выделяется [квадратными скобками].

Чтобы создать встроенную ссылку, напишите обычные скобки сразу после закрывающей квадратной скобки. URL-адрес, на который будет сделана ссылка, записывается в этих скобках вместе с *необязательным* заголовком ссылки в кавычках. Примеры:

Это [пример](http://example.com/ "Der Linktitel") для встроенной ссылки.

    [Эта ссылка](http://example.net/) не имеет атрибута заголовка.

Это становится:

<p>Это <a href="http://example.com/" title="заголовок">пример</a> встроенной ссылки.</p>

<p><a href="http://example.net/">Эта ссылка</a> не имеет атрибута title.</p>

Если вы хотите ссылаться на контент на том же сервере, вы можете использовать относительные пути:

    Дополнительную информацию можно найти на странице [Обо мне](/about/).

Ссылочные ссылки используют второй набор квадратных скобок, в которых записан произвольный идентификатор ссылки:

    Это [пример][id] для ссылочной ссылки.

При желании можно также вставить пробел между скобками:

    Это [пример][id] для ссылочной ссылки.

Затем где-то в документе ссылка определяется в отдельной строке следующим образом:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

Так:

* Квадратные скобки, содержащие идентификатор ссылки (необязательно с

    с отступом до трех пробелов);

* за которым следует двоеточие;
* за которым следует один или несколько пробелов (или табуляции);
* за которым следует URL-адрес ссылки;
* необязательно, за которым следует текст атрибута заголовка ссылки,

    заключено в круглые скобки, одинарные или двойные кавычки.

Следующие три определения идентичны:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**Примечание.** В Markdown 1.0.1 существует известная ошибка, из-за которой одинарные кавычки не могут использоваться в качестве разделителей заголовков ссылок.

URL-адрес ссылки при желании можно заключить в угловые скобки:

[id]: <http://example.com/>  "Optionaler Titel hier"

Атрибут title также может быть установлен на следующую строку и иметь отступ с большим количеством пробелов или табуляции. Это выглядит лучше с длинными URL-адресами:

[id]: http://example.com/langer/pfad/zu/seite

        «Здесь необязательное название»

Определения ссылок используются только для создания ссылок во время обработки документа Markdown и удаляются из документа перед выводом HTML.

Идентификаторы определений ссылок могут состоять из букв, цифр, пробелов и знаков препинания. Они *независимы* от верхнего и нижнего регистра:

[Текст ссылки][a] [Текст ссылки][A]

Два определения ссылок эквивалентны.

*подразумеваемый идентификатор ссылки* позволяет опустить идентификатор ссылки. В этом случае в качестве идентификатора используется текст ссылки. Просто добавьте к тексту ссылки пустой набор квадратных скобок:

	[Google][]

Затем определяется ссылка:

[Google]: http://google.com/

Поскольку идентификаторы ссылок могут содержать пробелы, это сокращение работает даже для нескольких слов в тексте ссылки:

	Посетите [Дерзкий огненный шар][] для получения дополнительной информации.

Затем определяется ссылка:

[Daring Fireball]: http://daringfireball.net/

Определения ссылок можно создавать в любом месте документа Markdown. В общем, рекомендуется размещать их после абзаца, в котором они используются. Однако их также можно перечислить все вместе в конце документа в виде сносок.

Небольшой пример:

Я получаю в десять раз больше трафика от [Google] [1], чем от [Yahoo] [2] или [MSN] [3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

Используя аббревиатуру через подразумеваемый идентификатор ссылки, вы также можете написать следующее:

Я получаю в десять раз больше трафика от [Google][], чем от [Yahoo][] или [MSN][].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Оба примера приведут к следующему HTML-коду:

<p>Я получаю в десять раз больше трафика от <a href="http://google.com/" title="Google">Google,</a> чем от <a href="http://search.yahoo.com/" title="Поиск Yahoo">Yahoo</a> или <a href="http://search.msn.com/" title="MSN-поиск">MSN</a> .</p>

Для сравнения тот же абзац следует с использованием встроенных ссылок Markdown:

Я получаю в десять раз больше трафика от [Google](http://google.com/ "Google"), чем от [Yahoo](http://search.yahoo.com/ "Yahoo Search") или [MSN](http://search.msn.com/ "MSN Search").

Идея ссылочных ссылок не в том, что их легче писать. Идея состоит в том, что они делают документы гораздо более читабельными. Примерный абзац имеет длину всего 80 символов со ссылочными ссылками и целых 181 символ со ссылочными ссылками; в формате HTML это 239 символов, больше разметки, чем контента.

Благодаря справочным ссылкам Markdown исходный документ больше напоминает окончательный выходной формат, показанный в браузере. Возможность извлекать метаданные для разметки из абзаца означает, что ссылки можно интегрировать в текст, не замедляя поток текста.

<a id="em"></a>

### Выделение Markdown рассматривает звездочки (`*`) и подчеркивание (`_`) как индикаторы выделения. Текст, упакованный в одиночные `*` или `_`, оборачивается HTML-тегом `<em>`, двойной `*` или `_` помечается тегом `<strong>`. Например, следующий текст:
    *Одна звездочка*

    _Одиночное подчеркивание_

    **Двойные звездочки**

    __Двойное подчеркивание__

Выведет следующее:

    <em>Одиночные звездочки</em>

    <em>Одиночное подчеркивание</em>

    <strong>Двойные звездочки</strong>

    <strong>Двойное подчеркивание</strong>

Стиль можно выбирать произвольно. Единственное ограничение заключается в том, что для открытия и закрытия области выделения необходимо использовать один и тот же символ.

Ударение может стоять в середине слова:

    Господь*Бог*таинство

Но если `*` или `_` окружены пробелами, он рассматривается как простая звездочка или простое подчеркивание.

Чтобы написать звездочку или знак подчеркивания там, где это будет восприниматься как ударение, их можно экранировать обратной косой чертой:

    \*Этот текст окружен звездочками.\*

<a id="code"></a>

### Код Чтобы отметить область кода, она заключается в символы обратной кавычки (`` ` ``). В отличие от блока кода, область кода форматирует код внутри обычного абзаца:
    Используйте функцию `printf()` для вывода текста.

Становится:

    <p>Используйте функцию <code>printf()</code> для печати текста.</p>

Если в области кода должна отображаться обратная апострофа, то до и после области кода можно использовать несколько обратных кавычек:

    ``Irgendwo hier (`) — это скрытый обратный апостроф.``

Это становится:

    <p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

Разделители обратных кавычек вокруг области кода могут содержать пробелы: один после открывающих кавычек, другой перед закрывающими кавычками. Это позволяет использовать обратные кавычки внутри области кода, даже в начале или в конце:

	Один обратный апостроф в области кода: `` ` ``

	Строка, завернутая в обратную кавычку, в разделе кода: `` `foo` ``

становится:

	<p>Одиночный обратный апостроф в области кода: <code>`</code></p>

	<p>Строка, завернутая в обратную кавычку, в области кода: <code>`foo`</code></p>

В областях кода амперсанд и угловые скобки кодируются как объекты HTML.

    Никто не использует теги `<blink>`.

Это становится:

    <p>Никто не использует теги <code>&lt;blink&gt;</code> .</p>

Также работает следующее:

    `&#8212;` — это десятичный кодированный эквивалент `&mdash;`.

Это будет слишком

<p><code>&amp;#8212;</code> представляет собой десятичный эквивалент <code>&amp;mdash;</code> .</p>

<a id="img"></a>

### Графика Следует признать, что найти «естественный» синтаксис для включения графики в текст довольно сложно.
Markdown использует синтаксис, похожий на стиль ссылок. Это позволяет использовать два типа: встроенный и ссылочный.

Встроенный синтаксис выглядит следующим образом:

    ![Альтернативный текст](../../de/community/pfad/zum/bild.jpg)

    ![Альтернативный текст](../../de/community/pfad/zum/bild.jpg "Необязательное название")

Так:

* Восклицательный знак: `!`;
* за которым следует набор квадратных скобок, обозначающих значение

    Атрибуты `alt` для включенной графики;

* за которыми следуют круглые скобки, указывающие URL-адрес или путь к изображению

а также значение необязательного атрибута `title`, заключенное в кавычки.

Ссылки на изображения в стиле ссылки выглядят следующим образом:

    ![Альтернативный текст][id]

«id» здесь — это имя определенной ссылки на изображение. Ссылки на изображения определяются с тем же синтаксисом, что и ссылки на ссылки:

[id]: url/zur/grafik  "Optionales title-Attribut"

В настоящее время в Markdown нет синтаксиса для указания размера изображения. Если это необходимо, вы можете просто использовать обычный HTML-тег `<img>`.

* * *

<div id="misc"></div>

## Разнообразный
<a id="backslash"></a>

### Экранирование обратной косой черты
Markdown позволяет вам использовать обратную косую черту для записи символов, которые в противном случае имеют определенное значение в синтаксисе Markdown.
Например, если вы хотите окружить слово звездочками (вместо HTML-тега `<em>`), вы можете поставить перед звездочками обратную косую черту:

    \*В окружении звезд\*

Markdown предлагает эту опцию для следующих символов:

\ Обратная косая черта ` Обратный апостроф

    * звездочка

_ Подчеркивание {} Фигурные скобки [] Квадратные скобки () Круглые скобки

# Хэш + знак плюса
    - Знак минус (дефис)

.   Точка !   восклицательный знак

* * *

<a id="lizenz"></a>

### Лицензия
Эта работа распространяется по [Международной лицензии Creative Commons Attribution-ShareAlike (BY-SA) 4.0][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>Это перевод [документации по исходному синтаксису][osd] автора [John Grubers][jg] [Markdown][md]. Этот перевод выполнен по состоянию на 15 декабря 2013 г. (версия Markdown 1.0.1). Никакая гарантия не дается за точность перевода. Если в переводе есть какие-либо ошибки, отправьте короткое сообщение на адрес <lasar@liepins.net>.
Любые другие отзывы также приветствуются.*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax