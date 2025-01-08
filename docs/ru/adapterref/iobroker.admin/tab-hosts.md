---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-hosts.md
title: Вкладка Хосты 
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
---
# Вкладка Хосты
Здесь отображаются доступные хосты.

В стандартной системе имеется только один хост. Для [Многохостовая система](http://www.iobroker.net/?page_id=3068&lang=de) — несколько соответственно.

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов. Для каждой иконки есть контекстная помощь. Для этого просто задержите на некоторое время мышку на иконке.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **Подробно о значках:**
### **1.) Получать обновления**
Чтобы проверить наличие обновлений для контроллера js, вы можете нажать на эту кнопку. При наличии обновления метка вкладки отображается зеленым цветом, а новая версия отображается в столбце _**доступно**_.

### **2.) Фильтры**
С помощью этого файла вы можете фильтровать список хостов по своему желанию.

## Содержимое страницы
На странице отображаются существующие хосты в таблице.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

Таблица состоит из следующих столбцов:

### **3.) Имя**
Это уникальное имя хоста, заданное в операционной системе хоста. Это имя должно быть уникальным.

### **4.) Перезапустить хост**
С помощью этой кнопки соответствующий хост можно перезапустить. Нажатие на нее соответствует команде **_reboot_**.

### **5.) Тип**
Информация о том, на каком движке работает хост.

### **6.) Название**
полное имя движка, обычно ioBroker.js-controller

### **7.) Платформа**
Спецификация программной основы, на которой основан движок.

### **8.) Операционная система**
Спецификация операционной системы, работающей на хосте.

### **9.) Доступно**
Индикация последней доступной версии двигателя

Если доступна более новая версия движка, ее можно обновить через консоль.
Если доступно, это всегда следует делать перед обновлением адаптера.

### **9.) Установлен**
Индикация установленной версии двигателя