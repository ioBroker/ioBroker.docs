---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-events.md
title: Вкладка «События»
hash: Yi2E6W9RHhmNwuCEDkiJSk2tvvns8JKWVvLyrnyoMmo=
---
# Вкладка События
На этой вкладке отображаются текущие состояния всех точек данных. Значения также можно изменить.

![iobroker_admin_states_columns](../../../de/adapterref/iobroker.admin/img/tab-events_States_columns.jpg)

## Содержимое страницы
Существующие объекты отображаются в таблице на странице. Столбцы можно сортировать по алфавиту по возрастанию или убыванию, щелкнув заголовки столбцов в соответствии с содержимым соответствующих столбцов (функция переключения). Поля ниже используются для фильтрации точек данных в соответствии с вашими критериями.

Таблица состоит из следующих столбцов:

### **1.) Идентификатор**
Это уникальное имя соответствующей точки данных в соответствии со структурой, состоящей, например, из имени адаптера.Номер экземпляра.Имя устройства.Имя канала.Имя точки данных.

### **2.) Имя родителей**
То же содержание, что и в названии столбца 3.

### **3.) Имя**
Имя точки данных. Это может быть автоматически сгенерированное имя или более понятное имя, назначенное вручную. Это имя не обязательно должно быть уникальным.

### **4.) Значение**
Здесь указывается текущее значение точки данных.

Это значение доступно для редактирования

### **5.) Подтверждено**
Если это значение было изменено и оно было принято системой, значение равно _true_, в противном случае _false._

### **6.) Источник**
Это указывает, какой экземпляр внес последнее изменение в точку данных.

### **7.) Время**
Это временная метка последнего обновления точки данных.

### **8.) изменено**
Это временная метка последнего изменения значения точки данных.

## Нижний колонтитул страницы
В нижнем колонтитуле страницы есть дополнительная информация

![iobroker_admin_states_footer](../../../de/adapterref/iobroker.admin/img/tab-events_States_footer.jpg)

### **1.) перезагрузить**
Нажав на этот значок, можно обновить таблицу.

### **2.) Информация о странице**
Информационный блок в середине нижнего колонтитула страницы предоставляет возможность установить количество строк на странице с помощью раскрывающегося меню. Доступно 20, 100, 200, 500 и 1000 строк на страницу. Здесь также есть информация о том, сколько всего страниц, а также возможность прокручивать страницы вперед или назад с помощью значков стрелок.

### **3.) Информация о точках данных**
Эта информация указывает общее количество существующих точек данных и их диапазон, отображаемый на текущей странице.