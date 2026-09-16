---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-users.md
title: Вкладка «Пользователи»
hash: xGhgY4eMab4BMoNxFtPxuBeDLJwfNdkUiNilHTX0+qk=
---
# Вкладка «Пользователь»

Здесь можно создавать пользователей. Для этого нажмите на значок (+) в левом нижнем углу. Учетная запись администратора уже создана по умолчанию.

![iobroker\_adapter\_admin\_user\_01](../../../../de/adapterref/iobroker.admin/admin/img/tab-user_01-1.jpg)

## Содержимое страницы

На странице в таблице отображаются существующие пользователи. Поля в заголовках столбцов позволяют фильтровать таблицу по собственным критериям.

Таблица состоит из следующих столбцов:

### **1.) ID**

Это уникальное имя соответствующего пользователя, определяемое структурой, состоящей из system.user.username.

### **2.) Имя**

Имя пользователя. Это имя может быть выбрано произвольно. Это имя должно быть уникальным.

### **3.) Активирован**

Этот флажок можно использовать для включения или отключения доступности пользователя.

### **4.) Группы**

Здесь отображаются группы, созданные на вкладке « **_Группы»_** . Пользователей можно назначать в соответствующие группы с помощью флажка.

![iobroker\_adapter\_admin\_user\_groups](../../../../de/adapterref/iobroker.admin/admin/img/tab-user_Groups.jpg)

### **5.) Создать нового пользователя**

Этот значок используется для создания нового пользователя, которого затем необходимо назначить в существующую группу.

### **6.) Редактирование существующего пользователя**

После выбора существующего пользователя в списке этот значок позволяет редактировать данные этого пользователя.

### **7.) Удалить существующего пользователя**

Значок корзины можно использовать для удаления существующего пользователя; существующие группы останутся неизменными.