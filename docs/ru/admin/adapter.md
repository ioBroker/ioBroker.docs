---
title: адаптер
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/admin/adapter.md
hash: svGv1TgKOa2pP8zn85C5t9Xd7FgJNy5dfaEK2af4S84=
---
# Вкладка "Адаптеры"
Доступные и установленные адаптеры отображаются и управляются здесь.

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов. Для каждой иконки есть контекстная помощь. Просто задержите мышь на иконке на некоторое время.

![Вкладка "Администратор"](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### 1 - Переключить вид
Эта кнопка может использоваться для переключения между представлением плитки и представлением таблицы (функция переключения).

### 2 – Обновить объявление
Каждый раз, когда вы перезагружаетесь, он будет автоматически проверять наличие обновлений. Эту кнопку можно использовать для запуска поиска вручную или для запуска обновления страницы.

### 3 - показывать только установленные адаптеры
При выборе этого значка отображаются только адаптеры с уже установленными экземплярами (функция переключения)

### 4 - Просмотр адаптеров с обновлениями
При выборе этого значка отображаются только адаптеры, для которых доступно обновление (функция переключения). Плитки обновляемых адаптеров имеют зеленый заголовок. Если обновления для адаптера нет, появится соответствующее сообщение.

Кроме того, в строке заголовка появляется еще один значок:

![Вкладка "Администратор"](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

При нажатии на этот значок (8) будут обновлены все доступные адаптеры.

### 5 - Установить адаптер с пользовательского URL
!> **ВНИМАНИЕ: использование этого параметра может привести к проблемам с установкой ioBroker.** Адаптеры GitHub могут все еще находиться в стадии разработки и поэтому могут работать некорректно! Их следует использовать с осторожностью в продуктивной системе. Рекомендуется дождаться стабильной версии!

Адаптеры можно устанавливать по их собственным путям (URL или пути к файлам) или по предварительным версиям GitHub с помощью значка Octocat.

После нажатия на этот значок открывается соответствующее окно выбора:

![Установить с GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

На вкладке ***FROM GITHUB*** нужный адаптер просто выбирается из раскрывающегося меню, и устанавливается последний предварительный выпуск.

Если выбрана вкладка ***ЛЮБОЙ***, в поле можно ввести любой путь к файлу или любой URL-адрес (например, URL-адрес внешнего разработчика адаптера) и установить соответствующий адаптер.

###6 - Включить экспертный режим
Экспертный режим также позволяет устанавливать более старые версии адаптера. При выборе этой кнопки (9) в плитке появляется дополнительная иконка, которую можно использовать для установки более ранних версий.

![Установить другие версии](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

### 7 - Фильтры
Здесь вы можете использовать термин фильтра для поиска конкретных адаптеров.
