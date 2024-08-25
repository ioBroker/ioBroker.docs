---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-hosts.md
title: Вкладка Хосты
hash: Jnt6k6H3Zc3NxzBPrWKISqelf4FWzT2DqjFE1jk2OjQ=
---
# Вкладка Хосты
Здесь отображаются доступные хосты.

В стандартной системе есть только один хост. С [многохостовая система](http://www.iobroker.net/?page_id=3068&lang=de) несколько соответственно.

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов. Для каждой иконки есть контекстная помощь. Просто задержите мышь на иконке на некоторое время.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **Значки в деталях:**
### **1.) Получать обновления**
Чтобы проверить, есть ли обновление для js-контроллера, вы можете нажать на эту кнопку. При наличии обновления метка на вкладке становится зеленой, а новая версия отображается в столбце _**доступно**_.

### **2.) Фильтры**
С помощью этого поля вы можете отфильтровать список хостов в соответствии с вашими потребностями.

## Содержимое страницы
Существующие хосты отображаются в виде таблицы на странице.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

Таблица состоит из следующих столбцов:

### **3.) Имя**
Это уникальное имя каждого хоста, установленное в операционной системе хоста. Это имя должно быть уникальным.

### **4.) Перезапустите хост**
С помощью этой кнопки можно перезапустить соответствующий хост. Нажатие на нее соответствует команде **_reboot_**.

### **5.) Тип**
Уточнение, на каком движке работает хост.

### **6.) Заголовок**
полное имя движка, обычно ioBroker.js-controller

### **7.) Платформа**
Спецификация программной основы, на которой основан движок.

### **8.) Операционная система**
Спецификация операционной системы, работающей на хосте.

### **9 доступных**
Индикация последней доступной версии движка

Если доступна более новая версия движка, ее можно обновить через консоль.
Если доступно, это всегда следует делать в первую очередь, прежде чем начинать обновление адаптера.

### **9.) Установлено**
Спецификация установленной версии двигателя
