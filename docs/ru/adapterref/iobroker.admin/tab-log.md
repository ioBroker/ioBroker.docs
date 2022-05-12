---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-log.md
title: Вкладка Журнал
hash: fQLM1zK2J90Y+AnKpwUQUJWiTOX0QR/IeRpHOmRhKYI=
---
# Вкладка Журнал
Системные сообщения выводятся здесь постоянно.
Последнее сообщение вверху.

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Просто задержите мышь на иконке на некоторое время.

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **Значки в деталях:**
### **1.) Остановить обновление**
Если вы нажмете на эту кнопку, непрерывное обновление списка будет остановлено.
Вместо значка паузы теперь отображается количество новых, неотображаемых сообщений.

### **2.) Журнал обновлений**
Эта кнопка обновляет список.

### **3.) Копировать журнал**
После щелчка по этому значку список отображается в виде текста. С помощью CTRL-A выделяется весь текст, а с помощью CTRL-C он вставляется в буфер обмена для дальнейшего редактирования.

### **4.) Удалить список**
Щелчок по этому значку удаляет только список на экране.

### **5.) Удалить журнал**
Щелчок по этому значку безвозвратно удаляет весь журнал на хосте.

### Выпадающие меню
### **Фильтр экземпляров**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

Сообщения можно фильтровать в соответствии с экземпляром журнала с помощью этого раскрывающегося меню.
В меню отображаются только те экземпляры, для которых есть записи на странице.

### **отображаемый уровень журнала**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

Это меню можно использовать для установки серьезности отображаемого сообщения.
Однако это только фильтр существующего списка. Чтобы определить ведение журнала на определенном уровне для экземпляра, это необходимо установить на вкладке _**Экземпляры**_.