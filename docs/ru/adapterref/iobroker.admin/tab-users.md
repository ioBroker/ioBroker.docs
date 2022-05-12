---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-users.md
title: Вкладка "Пользователи"
hash: I8VBVO8GbDcbNuFQLInmFwTRSYk3E1gv2Csc99eIZRw=
---
# Вкладка "Пользователи"
Здесь можно создавать пользователей. Для этого нажмите на (+) внизу слева. Администратор уже создан по умолчанию.

![iobroker_adapter_admin_user_01](../../../de/adapterref/iobroker.admin/img/tab-user_01-1.jpg)

## Содержимое страницы
Существующие пользователи отображаются в виде таблицы на странице. Поля в заголовках столбцов используются для фильтрации таблицы в соответствии с вашими критериями.

Таблица состоит из следующих столбцов:

### **1.) ID**
Это уникальное имя каждого пользователя согласно структуре, состоящей из system.user.username.

### **2.) Имя**
Имя пользователя. Это имя выбирается свободно. Это имя должно быть уникальным.

### **3.) Активировано**
С помощью этого флажка можно активировать или деактивировать доступность пользователя.

### **4.) Группы**
Здесь отображаются группы, созданные на вкладке **_Groups_**. Здесь пользователи могут быть назначены в соответствующие группы с помощью флажка.

![iobroker_adapter_admin_user_groups](../../../de/adapterref/iobroker.admin/img/tab-user_Groups.jpg)

### **5.) Создать нового пользователя**
С помощью этого значка можно создать нового пользователя, который затем должен быть назначен существующей группе.

### **6.) Изменить существующего пользователя**
После выбора существующего пользователя в списке данные этого пользователя могут быть отредактированы с помощью этого значка.

### **7.) Удалить существующего пользователя**
Существующего пользователя можно удалить с помощью значка корзины, существующие группы сохраняются.