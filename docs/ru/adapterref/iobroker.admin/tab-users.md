---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-users.md
title: Вкладка «Пользователи»
hash: HKsMwIvpGIO+9hqNOzBFUsRM8OOTNgILqQ6z75xDXDY=
---
# Вкладка Пользователи
Здесь можно создавать пользователей. Для этого нажмите на (+) внизу слева. По умолчанию администратор уже создан.

![iobroker_adapter_admin_user_01](../../../de/adapterref/iobroker.admin/img/tab-user_01-1.jpg)

## Содержимое страницы
На странице существующие пользователи отображаются в виде таблицы. Поля в заголовках столбцов используются для фильтрации таблицы по вашим критериям.

Таблица состоит из следующих столбцов:

### **1.) Идентификатор**
Это уникальное имя соответствующего пользователя в соответствии со структурой, состоящей из system.user.Username.

### **2.) Имя**
Имя пользователя. Это имя может быть выбрано свободно. Это имя должно быть уникальным.

### **3.) Включено**
Этот флажок можно использовать для активации или деактивации доступности пользователя.

### **4.) Группы**
Здесь отображаются группы, созданные на вкладке **_Группы_**. Здесь пользователей можно отнести к соответствующим группам с помощью флажка.

![iobroker_adapter_admin_user_groups](../../../de/adapterref/iobroker.admin/img/tab-user_Groups.jpg)

### **5.) Создать нового пользователя**
Этот значок можно использовать для создания нового пользователя, которого затем необходимо назначить в существующую группу.

### **6.) Редактировать существующего пользователя**
После выбора существующего пользователя в списке этот значок можно использовать для редактирования данных этого пользователя.

### **7.) Удалить существующего пользователя**
Существующего пользователя можно удалить с помощью значка корзины, но существующие группы останутся нетронутыми.