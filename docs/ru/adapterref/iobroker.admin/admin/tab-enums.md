---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-enums.md
title: Список предметов, находящихся на велосипеде.
hash: ZfJOk6TGlxMzkk+VijJM++zSiyrxngYXDuIZ2G/dGeI=
---
# Вкладка «Список»

В этом разделе перечислены избранные предметы, варианты обмена и комнаты из Homematic CCU. Вы также можете создавать собственные списки, которые затем можно использовать, например, в скриптах.

![iobroker\_adapter\_admin\_enums\_01](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_01.jpg)

## Заглавная строка

В строке заголовка расположены значки для наиболее важных функций. Каждый значок имеет контекстно-зависимую справку; просто наведите курсор мыши на значок и удерживайте несколько секунд.

![iobroker\_adapter\_admin\_enums\_headers\_01](../../../../de/adapterref/iobroker.admin/admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **Иконки подробно:**

### **1.) Обновить представление**

Если недавно созданные списки не отображаются, нажатие на этот значок поможет обновить страницу.

### **2.) Изменить сортировку**

Эта кнопка изменяет сортировку объектов на этой странице.

Когда кнопка активна, все объекты сортируются в алфавитном порядке. Если эта кнопка неактивна, объекты отображаются иерархически в древовидной структуре в соответствии со списками.

Затем станут видны и следующие два значка.

### **3) Закройте все подпапки.**

### **4.) Разверните все подпапки**

### **5.) добавить**

После выбора этого значка в базовую структуру можно добавлять дополнительные списки. Элементы в структуре папок создаются с помощью значка (+) справа (#10). Откроется окно настроек:

![iobroker\_adapter\_admin\_enums\_new](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_new.jpg)

Теперь вам нужно выбрать название для нового списка; сгенерированный идентификатор будет скорректирован автоматически.

### Содержимое страницы

![iobroker\_adapter\_admin\_enums\_headers\_03](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_Headers_03.jpg)

На странице в табличном виде отображаются существующие списки и их участники.

Таблица состоит из следующих столбцов (поля под заголовками столбцов 6, 7 и 8 служат критериями фильтрации). Таблица на изображении упорядочена иерархически, и все подэлементы (узлы) развернуты:

### **6.) ID**

Здесь перечислены все элементы списков с их идентификаторами. Этот параметр можно изменить двойным щелчком или щелчком по соответствующему значку карандаша (#9). Полный идентификатор подчиненных структур также включает родительские уровни в качестве префикса.

### **7.) Имя**

В этом столбце отображается имя участника. Это имя можно изменить, дважды щелкнув по нему или щелкнув по соответствующему значку карандаша (#9).

### **8.) Члены**

В этом столбце отображаются участники списка; если участников слишком много, отображается только их количество. При наведении курсора мыши на поле все участники отображаются во всплывающем информационном окне. Дополнительную информацию можно получить с помощью значка информации в крайнем правом углу (#12).

### **9.) Редактировать метки**

После нажатия на этот значок вы сможете редактировать метки в столбцах «ID» и «Name». На этом этапе появятся кнопка «ОК» (галочка) и значок «Отмена» (x).

### **10.) Добавить структурный элемент**

Нажатие на этот значок открывает диалоговое окно, в котором можно создать новый элемент в соответствующей структуре.

![iobroker\_adapter\_admin\_enums\_new\_member](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_new_Member.jpg)

Здесь также можно выбрать имя индивидуально. Соответствующий идентификатор генерируется автоматически в соответствии со структурой и выбранным именем.

### **11.) Удалить элемент**

Значок корзины удаляет элемент в этой строке.

### **12.) Информация**

При нажатии на этот значок откроется новое окно с более подробной информацией о выбранном элементе.

![iobroker\_adapter\_admin\_enums\_info](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_Info.jpg)