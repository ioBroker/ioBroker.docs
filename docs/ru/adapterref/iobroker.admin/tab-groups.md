---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-groups.md
title: Вкладка «Группы»
hash: w81xH774XQVxqMAhQ70BdlBiKKarcO5bWiTNR7Zbfvc=
---
# Вкладка «Группы»
Здесь можно создать группы пользователей с разными правами, нажав на (+) в левом нижнем углу экрана.

![iobroker_adapter_admin_user_02](../../../de/adapterref/iobroker.admin/img/tab-groups_admin_User_02.jpg)

## Содержимое страницы
Существующие группы отображаются в таблице на странице. Поля в заголовках столбцов используются для фильтрации таблицы по вашим критериям.

Таблица состоит из следующих столбцов:

### **1.) Идентификатор**
Это уникальное имя соответствующей группы в соответствии со структурой, состоящей из system.group.groupname.

### **2.) Имя**
Название группы. Это имя может быть выбрано свободно. Это имя должно быть уникальным.

### **3.) Описание**
Сюда можно добавить описание, которое, например, относится к правам в этой группе.

### **4.) Пользователи**
Здесь отображаются пользователи, созданные на вкладке **_Пользователи_**, и их можно отнести к выбранной группе с помощью флажка.

### **5.) Настройка прав**
При нажатии на символ карандаша открывается еще одно окно, в котором можно настроить права этой группы.

![iobroker_adapter_admin_user_rechte_01](../../../de/adapterref/iobroker.admin/img/tab-groups_User_Rechte_01.jpg)

### **6.) Создать новую группу**
Этот значок можно использовать для создания новой группы, настроенной с использованием предыдущих пунктов.