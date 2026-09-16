---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md"},"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md":{"title":{"en":"Special Jaeger Design widgets for ioBroker.vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-jaeger-design/docs/README_de.md
title: Специальные виджеты Jaeger Design для ioBroker.vis 2.0
hash: ubglOi+4ilw7XP8I0dZPmzF6vYBD+F5cU60ShwNrVFY=
---
![Логотип](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![Количество установок](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)

# Специальные виджеты Jaeger Design для ioBroker.vis 2.0

![ютуб](../../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/youtube.jpg)

Видеоинструкции по использованию виджетов можно найти [здесь](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) (на немецком языке).

Видео с виджетами benutzt werden können, kann man [hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden.

## Kommerzielle Nutzung

Используйте этот переходник для более дорогой версии. Для настройки виджетов требуется дополнительная лицензия (действительная цена: 50 евро, включая MwSt.). Установка и тестирование в редакторе могут оказаться очень полезными.

## Übersicht zur Erstellung einer Smart Home Oberfläche mit dem "VIS-2 JAEGER Design Adaptor"

### Voraussetzungen

- Система Ein ioBroker
- Адаптер Der Jäger Design (около 50 евро)
- Grundkenntnisse im Umgang mit ioBroker

### Введение

Адаптер Jäger Design лежит в основе адаптера vis-2 и является удобным для использования, если вы хотите установить его с помощью щелчка и падения. Дополнительные виджеты можно использовать и использовать для создания умного дома.

### Grundaufbau der Oberfläche

Die Oberfläche besteht aus mehreren Bereichen:

- **Главное меню** : Ссылки находятся в том месте, где находится главное меню, и вы можете видеть, как это происходит.
- **Statusleiste** : Oben können verschiedene wichtige Statusanzeigen hinzugefügt werden.
- **Mittlerer Bereich** : Hier können Szenen, Aktionen und Hinweise angezeigt werden. Die rechte Seite - это свободный гештальтбар и канн Informationen wie Sicherheit, Wetter, Hausgeräte und Energieverbrauch anzeigen.![iobroker Schnittstellen1](https://github.com/user-attachments/assets/d0323e58-ba6e-455c-8a06-81f9acda9ef9)

### Белеухтунг

Im Hauptmenü können verschiedene Stockwerke ausgewählt werden. Der Grundriss des Erdgeschosses zeigt alle Lichter, die durch Icons dargestellt werden. Некоторые значки могут отображаться только в том случае, если они используются, где и когда они затемнены. Нажмите на значок, чтобы открыть всплывающее окно с слайдером для отображения значка.![iobroker-jaeger-design-beleuchtung](https://github.com/user-attachments/assets/7e4a4ee9-b1b4-4ab1-88cb-eddf0a1fc707) Beleuchtungsszenen auf der rechten Seite können einfach abgerufen und auch Lichteinstellungen Gespeichert werden:![iobroker-jaeger-design-beleuchtung\_szenen\_speichern](https://github.com/user-attachments/assets/d9099048-0d26-4cfb-9b74-04a36b07131b)

### Ролллен

В меню «Rollladen» можно включить функцию Beschattung gesehen werden. Значки отображаются в высоком разрешении и при нажатии на значок открываются всплывающие окна для изменения высоты и рамок.![Beschattung-iobroker-умный дом](https://github.com/user-attachments/assets/a808b0c2-0e84-4586-b482-3d63b49e4706)

### Энергия

В меню «Энергия» указана температура окружающей среды. Значки Zeigen die Ist- und Solltemperaturen sowie den Zustand der Heizung und Fenster an. Нажмите на значок, чтобы открыть всплывающее окно для изменения температуры и настройки температуры, чтобы активировать климатические условия или теплые условия.![iobroker-jaeger-design-raumtemperatur\_ueberblick](https://github.com/user-attachments/assets/b34ab5bb-e05a-438f-b0d6-649a34d1dfde)

![iobroker-jaeger-design-raumtemperatur](https://github.com/user-attachments/assets/282f5f01-827c-4976-8cbc-78084f076ac1)

### Безопасность

В меню «Sicherheit» можно нажать кнопку «Зустанд дер Фенстер». Geöffnete Fenster werden rot dargestellt.![iobroker-jaeger-design-sicherheit](https://github.com/user-attachments/assets/9e0234ac-aa0a-4811-b971-ac33237502f5)

### Дополнительные функции

Es können auch frei definierte Oberflächen erstellt werden, wie zB die Verbrauchsdarstellung des Adapters "consumer" or die Darstellung von Nightscout for Diabetes. В меню «Настройки» можно увидеть различные варианты выбора.![iobroker-jaeger-design-energieueberwachung](https://github.com/user-attachments/assets/92e09c5f-88d9-48b3-b97f-0401a8839946)

![iobroker-jaeger-design-diabetes](https://github.com/user-attachments/assets/39d0a043-6025-4f9d-96f4-e8c9bd2245bd)

![iobroker-jaeger-design-einstellungen](https://github.com/user-attachments/assets/bff91b52-c04e-4482-9dd8-e17a9a7c762c)

### Видеоуроки на YouTube

Для получения подробной информации и получения дополнительной информации см. ссылки на обучающие материалы YouTube.