---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-enums.md
title: Перечисления вкладок
hash: rqPVvVeC50Hm4dxcQ7zBoNm0VTUa7zS5Txki6arYBmc=
---
# Вкладка перечисления
Здесь перечислены избранные, сделки и комнаты из Homematic CCU.
Вы также можете создавать свои собственные списки, которые затем можно использовать, например, в скриптах.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Для этого просто задержите на некоторое время мышку на иконке.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **Подробно о значках:**
### **1.) Обновить представление**
Если только что созданные списки не видны, нажатие на этот значок поможет обновить статус страницы.

### **2.) Изменить сортировку**
Эта кнопка меняет сортировку объектов на этой странице.

Когда кнопка активна, все объекты сортируются по алфавиту.
Если эта кнопка не активна, объекты отображаются иерархически согласно спискам в древовидной структуре.

Тогда также будут видны следующие два значка.

### **3.) Свернуть все подпапки**
### **4.) Развернуть все подпапки**
### **5.) добавить**
После выбора этого значка к базовой структуре можно добавить дополнительные списки.
Элементы структуры папок создаются с помощью значка (+) справа (#10).
Откроется окно конфигурации:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

Теперь здесь необходимо выбрать имя для нового перечисления; сгенерированный идентификатор будет скорректирован автоматически.

### Содержимое страницы
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

Существующие перечисления и их члены отображаются на странице в виде таблицы.

Таблица состоит из следующих столбцов (поля под заголовками столбцов 6, 7 и 8 служат критериями фильтра). Таблица на рисунке упорядочена по иерархии, все узлы развернуты:

### **6.) Идентификатор**
Здесь перечислены все члены списков со своими идентификаторами. Это обозначение можно изменить двойным щелчком мыши или щелчком по соответствующему значку карандаша (#9).
Полный идентификатор подчиненных структур включает также находящиеся перед ними уровни более высокого уровня.

### **7.) Имя**
В этом столбце указывается имя участника. Это имя можно изменить, дважды щелкнув или щелкнув соответствующий значок карандаша (#9).

### **8.) Участники**
В этом столбце показаны члены списка; если их слишком много, отображается только число.
Если вы наведете указатель мыши на поле, все участники отобразятся в виде пузырька с информацией.
Дополнительную информацию можно получить с помощью значка информации в крайнем правом углу (# 12).

### **9.) Изменить ярлыки**
Нажав на этот значок, вы можете редактировать имена в столбцах «Идентификатор» и «Имя».
В этот момент появляется кнопка ОК в виде галочки и значок отмены в виде (x).

### **10.) Добавить элемент конструкции**
После щелчка по этому значку откроется диалоговое окно, в котором можно создать нового члена внутри соответствующей структуры.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Здесь тоже имя можно выбрать индивидуально. Соответствующий идентификатор автоматически генерируется в соответствии со структурой и выбранным именем.

### **11.) Удалить элемент**
Значок мусорной корзины удаляет элемент в этой строке.

### **12.) Информация**
После нажатия на этот значок откроется еще одно окно с расширенной информацией о выбранном элементе.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)