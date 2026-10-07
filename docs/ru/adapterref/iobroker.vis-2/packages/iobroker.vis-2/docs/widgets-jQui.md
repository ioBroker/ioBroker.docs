---
chapters: {"pages":{"en/adapterref/iobroker.vis-2/README.md":{"title":{"en":"Next generation visualization for ioBroker: vis-2"},"content":"en/adapterref/iobroker.vis-2/README.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md":{"title":{"en":"Standard widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md":{"title":{"en":"jQui widgets - jQuery UI widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md
title: Виджеты jQui - виджеты jQuery UI
hash: T3DKA2oJcdVN8JPeWaN1AY1/B7V4QSqkqE3uXBvwEu4=
---
# Виджеты jQui — виджеты jQuery UI

Это набор виджетов в материальном стиле.

Изначально для стилизованных виджетов в vis-1 использовался фреймворк jQuery UI, но теперь он заменен на Material Style (фреймворк React JS MUI).

В целях обеспечения совместимости название по-прежнему jQui.

В 2014 году разработчики предполагали, что для каждой вариации виджета будет создаваться новый тип виджета. Сейчас это уже не так. Виджеты стали более гибко настраиваемыми.

Доступны следующие основные виджеты:

## Бинарное управление (`tplJquiBool`)

Он включает в себя следующие производные виджеты, все из которых основаны на том же самом. `tplJquiBool` виджет:

- Кнопка с логической иконкой (tplIconStateBool)
- Бинарная иконка кнопки (tplIconStatePushButton)
- Кнопки радио (вкл/выкл) (tplJquiRadio)
- Кнопка переключения со значком (tplJquiToogle)

## Перейти по URL (tplJquiButtonLink).

Он содержит следующие производные виджеты:

- Перейти к URL (в новом окне) (tplJquiButtonLinkBlank)
- Кнопка навигации (tplJquiButtonNav)
- Навигация с использованием пароля (tplJquiNavPw)
- Кнопка => Диалоговое окно страницы (tplContainerButtonDialog)
- Диалоговое окно контейнера (tplContainerDialog)
- Icon=>Page dialog (tplContainerIconDialog)
- HTML-диалог (tplJquiDialog)
- Внешний диалог (tplContainerDialogExternal)
- Диалоговое окно с иконкой (tplJquiIconDialog)
- Вызов URL-адреса в бэкэнде (tplIconHttpGet)
- Перейти по URL-адресу (с иконкой) (tplIconLink)
- Значок навигации (tplJquiIconNav)

## Кнопка закрытия диалогового окна (tplJquiButtonDialogClose)

## Ввод (tplJquiInput)

Он содержит следующие производные виджеты:

- Ввод с помощью кнопки (tplJquiInputSet)

## Ввод даты (tplJquiInputDate)

## Ввод времени (tplJquiInputDatetime)

## Слайдер (tplJquiSlider)

Он содержит следующие производные виджеты:

- Вертикальный ползунок (tplJquiSliderVertical)

## Элемент управления состояниями (tplJquiButtonState). Он имеет следующие производные виджеты:

- Список радиокнопок со значениями (tplJquiRadioList)
- Переключатель (шаги) (tplJquiRadioSteps)
- Выберите из списка (tplJquiSelectList)

## Запишите значение (tplIconState). Оно содержит следующие производные виджеты:

- Увеличение с помощью значка (tplIconInc)