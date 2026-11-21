---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md":{"title":{"en":"Migrating inventwo vis-1 widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md":{"title":{"en":"Universal Widget — Interaction Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md":{"title":{"en":"Event Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md":{"title":{"en":"Universal Widget — Content Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md":{"title":{"en":"Universal Widget — Styling and Shapes"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md
title: Перенос виджетов inventwtwo vis-1
hash: Dyf9rJFzmg3ij0kZtc62yAF8Xa8aPE1T03cuzfVjdJQ=
---
> 🌐 **Английский** | [Немецкий](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/migration.md)

# Перенос виджетов inventwtwo vis-1

Если вы импортировали проект vis-1 в VIS 2, который использует старые виджеты адаптера **vis-inventwo** (шаблоны), `i-vis-*`), настройки этого адаптера могут преобразовать их в виджеты VIS 2 из этого набора.

Миграция — это вспомогательный инструмент, а не решение в один клик: в типичных случаях конвертация происходит полностью, в других — лишь частично, а некоторые виджеты вообще не конвертируются. После миграции вы получите список всего, что нужно проверить вручную.

> Идея и некоторые элементы отображения основаны на общедоступном инструменте [inventwo-vis1-to-vis2](https://github.com/crunchip77/inventwo-vis1-to-vis2) от crunchip77.

> **Гарантий нет:** миграция была разработана с особой тщательностью, но мы не можем гарантировать ее безупречную работу для каждого проекта — проекты vis-1 слишком разнообразны. Всегда сохраняйте оригинал (новый проект или резервную копию, см. ниже) и проверяйте результат. Если что-то не конвертируется должным образом, пожалуйста, [создайте заявку](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/issues) и опишите виджет и его настройки. Ваши отзывы помогают улучшить инструмент.

---

## Как им пользоваться

1. Импортируйте свой проект VIS-1 в VIS 2 (если вы еще этого не сделали).
2. **Закройте редактор VIS 2** этого проекта. Открытый редактор может перезаписать результат.
3. В административной панели ioBroker откройте **раздел «Экземпляры»** и настройки. `vis-2-widgets-inventwo`.
4. В разделе **1. Проект** выберите **проект VIS 2** .
   - **Название нового проекта** (необязательно): если указано название, проект копируется со всеми файлами в новый проект и преобразуется там — оригинал остается неизменным. Если название не указано, сам проект перезаписывается (предварительно сохраняется резервная копия, см. ниже).
   - **Исходный проект vis-1** (необязательно): выберите его, если после импорта отсутствуют виджеты (см. раздел « [Отсутствующие виджеты после импорта](#widgets-missing-after-the-import) »).
5. Нажмите **«Анализировать»** . Пока ничего не изменилось — вы видите только предварительный просмотр:
   - Сколько виджетов можно преобразовать без доработки?
   - Сколько из них можно конвертировать, но необходимо проверить?
   - Сколько из них нельзя преобразовать, и чтобы они остались неизменными?
6. Нажмите **«Преобразовать проект…»** или **«Создать проект…»** и подтвердите.
7. Перезагрузите VIS 2 и пройдите по списку **преобразованных виджетов, которые необходимо отметить** .

В разделе **«Что можно конвертировать?»** в верхней части страницы перечислены все поддерживаемые виджеты.

С помощью **функции «Скачать отчет»** вы можете сохранить результат в виде файла JSON.

---

## Создайте резервную копию и отмените действие.

Если вы конвертируете проект на месте (без нового имени), то исходный проект сохраняется. `vis-views.json` сохраняется в папке проекта как `vis-views-backup-inventwo-<date>-<time>.json` Проект будет перезаписан только после того, как эта резервная копия будет успешно записана и прочитана.

Если вы записали результат в новый проект, ничего отменять не нужно: исходный проект остаётся неизменным, и вы можете просто удалить новый.

Чтобы отменить миграцию на месте, откройте вкладку « **Файлы»** в разделе «Администрирование» и перейдите по ссылке. `vis-2.0/<project>/` и заменить `vis-views.json` с файлом резервной копии.

---

## Виджеты отсутствуют после импорта

vis-1 хранит виджет, который отображается в нескольких представлениях по одному разу в каждом представлении, при этом к его ID добавляется имя представления (например, `w00220_02_EG` VIS 2 удаляет все виджеты с подчеркиванием в идентификаторе при загрузке проекта, поэтому после импорта эти виджеты исчезают — плитки пропадают в редакторе, а список виджетов становится короче, чем раньше.

Чтобы восстановить их, выберите исходный проект в разделе **«Исходный проект vis-1 (необязательно)»** . Он используется только в качестве ссылки и не изменяется. Он должен по-прежнему существовать в vis-1 (хранилище файлов). `vis.0` Затем помощник добавляет каждый из этих виджетов по одному разу и вносит остальные представления в их атрибут **«Показать в представлениях»** — так VIS 2 хранит такие виджеты. Восстановленные виджеты отображаются в предварительном просмотре и преобразуются в ходе того же запуска.

---

## Что конвертируется

| виджет vis-1                                    | Виджет VIS 2                                                     | Результат                                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Универсальный — Переключатель                   | Универсальный виджет, тип _Переключатель_                        | полный                                                                                                |
| Универсальный — Фон                             | Универсальный виджет, тип _"Только для чтения"_                  | полный                                                                                                |
| Универсальная — Навигация                       | Универсальный виджет, тип _Навигация_                            | полный                                                                                                |
| Универсальный — Просмотреть во всплывающем окне | Универсальный виджет, введите _View в диалоговом окне_           | полный                                                                                                |
| Универсальное — Государство                     | Универсальный виджет, тип _Кнопка_                               | Проверка значения и поведения при нажатии; время сброса учитывается как _значение сброса через (мс)._ |
| Универсальный — Увеличение/уменьшение значения  | Универсальный виджет, тип _Увеличение/уменьшение значения_       | проверить значение шага                                                                               |
| Универсальный — HTTP                            | Универсальный виджет, тип: _Отправить HTTP-запрос / Открыть URL_ | проверить URL                                                                                         |
| Универсальный с аналоговыми часами              | Универсальный виджет, контент _Аналоговые часы_                  | Проверьте циферблат, не занят ли часовой пояс.                                                        |
| Много                                           | Универсальный виджет с несколькими состояниями                   | проверьте условия и внешний вид штатов.                                                               |
| Переключатель, Переключатель маленький          | Универсальный виджет, тип _Переключатель_                        | полный                                                                                                |
| Фон, Маленький фон                              | Универсальный виджет, тип _"Только для чтения"_                  | полный                                                                                                |
| Пуговица, Маленькая пуговица                    | Универсальный виджет, тип _Кнопка_                               | полный                                                                                                |
| Навигация, навигационная система малого размера | Универсальный виджет, тип _Навигация_                            | полный                                                                                                |
| Изображение, Изображение (новое)                | Универсальный виджет, контент _Изображение_                      | Проверьте масштабирование, цвета и тени.                                                              |
| Список радиокнопок                              | Универсальный виджет с _отдельными кнопками_                     | проверьте размер и расстояние                                                                         |
| Выбор цвета                                     | Универсальный виджет, _палитра цветов_ для контента              | проверьте точки данных и отображаемые элементы                                                        |
| Флажок                                          | Виджет флажка                                                    | Отображается только первый флажок виджета; внешний вид не меняется.                                   |
| Переключить базовый                             | Виджет переключения                                              | только первое переключение виджета                                                                    |
| Переключатель (качелька)                        | Виджет переключения                                              | проверьте размер и цвета                                                                              |
| Список ценностей                                | Виджет списка значений                                           | Завершено (некоторые стили списков отсутствуют)                                                       |
| Шатер                                           | Виджет бегущей строки                                            | снова установите скорость                                                                             |
| JSON-таблица                                    | Виджет таблицы                                                   | Заменяются столбцы, форматирование и цвета; проверьте внешний вид.                                    |
| Слайдер (простой)                               | Виджет слайдера                                                  | проверьте этикетки и отображение значения                                                             |

Цвета, текст, изображения, радиус скругления углов, тени, границы, выравнивание, отступы и прозрачность виджетов Universal и Multi переносятся в настройки CSS виджета. `font-size`, `text-shadow`).

### Не преобразовано

Ползунки цвета (`i-vis-slider-color-hor`, `i-vis-slider-color-vert`) не имеют аналогов. Они остаются неизменными и перечислены в разделе **«Виджеты» без преобразования** .

В VIS 2 отсутствовали и поэтому были удалены следующие элементы: цвета при наведении курсора, цифровые часы, отдельная точка данных для закрытия диалогового окна, матричное расположение переключателей, пороговые значения для каждой ячейки таблицы, вращение ползунков.

В VIS 2 диалоговое окно по-прежнему можно закрыть с помощью точки данных: оно следует за **идентификатором объекта** виджета и остается открытым только до тех пор, пока для этой точки данных **значение равно true** (см. [Типы взаимодействия](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md#view-in-dialog) ). Только дополнительная точка данных закрытия в vis-1 не имеет аналога.