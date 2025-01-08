---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-log.md
title: Вкладка Журнал
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
# Вкладка Журнал
Сюда постоянно выводятся сообщения системы.
Последнее сообщение выше.

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

## Строка заголовка
В строке заголовка расположены значки наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Для этого просто задержите на некоторое время мышку на иконке.

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **Подробно о значках:**
### **1.) Остановить обновление**
Если нажать на эту кнопку, постоянное обновление списка будет остановлено.
Вместо значка паузы теперь отображается количество новых, не отображаемых сообщений.

### **2.) Журнал обновлений**
Эта кнопка обновляет список.

### **3.) Копировать журнал**
После щелчка по этому значку список отображается в виде текста. При нажатии CTRL-A выделяется весь текст, а при нажатии CTRL-C он вставляется в буфер обмена для дальнейшего редактирования.

### **4.) Удалить список**
Нажатие на этот значок удаляет только список на экране.

### **5.) Удалить журнал**
При нажатии на этот значок весь журнал на хосте будет безвозвратно удален.

### Раскрывающиеся меню
### **Фильтр экземпляров**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

Это раскрывающееся меню можно использовать для фильтрации сообщений в соответствии с экземпляром журнала.
В меню отображаются только те экземпляры, для которых есть записи на странице.

### **отображаемый уровень журнала**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

Это меню можно использовать для установки уровня серьезности сообщения, которое должно отображаться.
Однако это лишь фильтр существующего списка. Чтобы настроить ведение журнала на определенном уровне для экземпляра, это необходимо установить на вкладке _**Экземпляры**__.