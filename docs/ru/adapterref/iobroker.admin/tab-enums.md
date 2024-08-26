---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-enums.md
title: Вкладка "Перечисления"
hash: 9FniQdkSMjiJGDBfr5fYi7lDHmMAquGE8W5bEO9hTuk=
---
# Вкладка "Перечисления"
Здесь перечислены избранные, сделки и комнаты из Homematic CCU.
Вы также можете создавать свои собственные перечисления, которые затем можно использовать, например, в сценариях.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## Строка заголовка
Строка заголовка содержит значки наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Просто задержите мышь на иконке на некоторое время.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **Значки в деталях:**
### **1.) Обновить представление**
Если только что созданные объявления не видны, щелчок по этому значку поможет обновить статус страницы.

### **2.) Изменить сортировку**
Эта кнопка изменяет сортировку объектов на этой странице.

Когда кнопка активна, все объекты сортируются в алфавитном порядке.
Если эта кнопка не активна, объекты отображаются иерархически в соответствии со списками в древовидной структуре.

Затем также видны следующие два значка.

### **3.) Свернуть все вложенные папки**
### **4.) Развернуть все подпапки**
### **5.) добавить**
После выбора этого значка к базовой структуре можно добавить дополнительные списки.
Элементы в структуре папок создаются с помощью значка (+) справа (#10).
Откроется окно конфигурации:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

Теперь здесь необходимо выбрать имя для нового перечисления, сгенерированный идентификатор будет скорректирован автоматически.

### Содержимое страницы
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

Существующие перечисления и их элементы отображаются на странице в виде таблицы.

Таблица состоит из следующих столбцов (поля под заголовками столбцов 6, 7 и 8 служат критериями фильтрации). Таблица на картинке упорядочена по иерархии и все подпункты (узлы) расширены:

### **6.) ID**
Здесь перечислены все члены перечисления с их идентификаторами. Это обозначение можно изменить, дважды щелкнув или щелкнув соответствующий значок карандаша (#9).
Полный идентификатор подчиненных структур также включает предшествующие вышестоящие уровни.

### **7.) Имя**
В этом столбце указано имя участника. Это обозначение можно изменить, дважды щелкнув или щелкнув соответствующий значок карандаша (#9).

### **8.) Участники**
В этом столбце отображаются члены перечисления, если их слишком много, отображается только число.
Если вы наведете указатель мыши на поле, все участники отобразятся в виде всплывающей информации.
Дополнительную информацию можно получить с помощью значка информации справа (# 12).

### **9.) Редактировать обозначения**
После нажатия на этот значок вы можете редактировать обозначения в столбцах ID и Name.
В этот момент появляется кнопка ok в виде галочки и значок отмены в виде (x).

### **10.) Добавить элемент структуры**
После нажатия на этот значок открывается диалоговое окно, в котором можно создать новый элемент в соответствующей структуре.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Здесь тоже имя можно выбрать индивидуально. Связанный идентификатор генерируется автоматически в соответствии со структурой и выбранным именем.

### **11.) Удалить элемент**
Элемент в этой строке удаляется со значком корзины

### **12.) Информация**
После нажатия на этот значок отображается другое окно с расширенной информацией о выбранном элементе.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)
