* [en:What is ioBroker?;de:Was ist ioBroker?;ru:Что такое ioBroker?;zh-cn:什么是 ioBroker？](README)
* [en:How this documentation is organised;de:Aufbau der Dokumentation;ru:Структура документации;zh-cn:文档结构](intro/README)

* en:Fundamentals;de:Grundlagen;ru:Основы;zh-cn:基础概念
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](basics/README)
  * [Architecture](basics/architecture)
  * [Adapter & Instanzen](basics/adapter)
  * [Repositories](basics/repositories)
  * [en:Objects;de:Objekte;ru:Объекты;zh-cn:对象](basics/objects)
  * [en:States;de:Zustände;ru:Состояния;zh-cn:状态](basics/states)
  * [Alias](basics/alias)
  * [en:Enums;de:Kategorien;ru:Категории;zh-cn:类别](basics/enums)
  * [Roles](basics/roles)
  * [Glossary](basics/glossary)

* en:Installation;de:Installation;ru:Установка;zh-cn:安装系统
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](install/README)
  * [Requirements](install/requirements)
  * [Hardware](install/hardware)
  * en:Virtualization platforms;de:Virtualisierungsplattformen;ru:Платформы виртуализации;zh-cn:虚拟机安装
    * [Proxmox](install/proxmox)
    * [Docker](install/docker)
  * en:Manual installation;de:Manuelle Installation;ru:Ручная установка;zh-cn:手动安装
    * [Node.js](install/nodejs)
    * [Linux](install/linux)
    * [Windows](install/windows)
    * [macOS](install/macos)
  * en:Updating;de:Updaten;ru:обновить;zh-cn:更新
    * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](install/update)
    * [ioBroker](install/updateself)
    * [Adapter](install/updateadapter)
    * [Node.js & npm](install/updatenode)

* en:Admin interface;de:Admin-Oberfläche;ru:Интерфейс админки;zh-cn:管理员界面
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](admin/README)
  * [en:Overview and quick access;de:Übersicht und Schnellzugriff;ru:Обзор и быстрый доступ;zh-cn:概览与快速访问](admin/overview)
  * [Adapter](admin/adapter)
  * [en:Instances;de:Instanzen;ru:Экземпляры;zh-cn:实例](admin/instances)
  * [en:Objects;de:Objekte;ru:Объекты;zh-cn:对象](admin/objects)
  * [en:Categories;de:Kategorien;ru:Категории;zh-cn:类别](admin/enums)
  * [en:Logs;de:Protokolle;ru:Журналы;zh-cn:日志](admin/log)
  * [en:Users;de:Benutzer;ru:Пользователи;zh-cn:用户](admin/users)
  * [Hosts](admin/hosts)
  * [en:Files;de:Dateien;ru:Файлы;zh-cn:文件](admin/files)
  * [en:System settings;de:Systemeinstellungen;ru:Системные настройки;zh-cn:系统设置](admin/settings)

* en:Tutorials;de:Tutorials;ru:Уроки;zh-cn:教程文档
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](tutorial/README)
  * [en:First steps;de:Die ersten Schritte;ru:Первые шаги;zh-cn:第一步](tutorial/setup)
  * [en:A tour of the interface;de:Rundgang durch die Oberfläche;ru:Обзор интерфейса;zh-cn:界面导览](tutorial/admin)
  * [en:Manage adapters;de:Adapter verwalten;ru:Управление адаптерами;zh-cn:管理适配器](tutorial/adapter)
  * [en:First automation;de:Die erste Automatisierung;ru:Первая автоматизация;zh-cn:第一个自动化](tutorial/logic)
  * [en:First visualisation;de:Die erste Visualisierung;ru:Первая визуализация;zh-cn:第一个可视化](tutorial/viz)
  * [en:Recording values;de:Werte aufzeichnen;ru:Запись значений;zh-cn:记录数值](tutorial/history)
  * [en:Charts;de:Diagramme;ru:Диаграммы;zh-cn:图表](tutorial/flot)
  * [en:Installing updates;de:Updates einspielen;ru:Установка обновлений;zh-cn:安装更新](tutorial/updates)
  * [Restore](tutorial/restore)

* en:Visualisations;de:Visualisierungen;ru:Визуализация;zh-cn:可视化页面
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](viz/README)
  * [en:Devices adapter;de:Devices-Adapter;ru:Адаптер Devices;zh-cn:Devices 适配器](viz/devices)
  * [Lovelace](viz/lovelace)
  * [vis-2](viz/vis-2)
  * [vis](viz/vis)
  * [webui](viz/webui)
  * [en:Visu app;de:Visu App;ru:Приложение Visu;zh-cn:Visu 应用](viz/app)
  * en:Widgets for vis and vis-2;de:Widgets für vis und vis-2;ru:Виджеты для vis и vis-2;zh-cn:vis 和 vis-2 的小部件
    * [en:Widget sets;de:Widgetsätze;ru:Наборы виджетов;zh-cn:小工具集](viz/widgetsets)
    * [en:Included widgets;de:Mitgelieferte Widgets;ru:Встроенные виджеты;zh-cn:内置小部件](viz/basic)
    * [en:Material widgets;de:Material-Widgets;ru:Виджеты Material;zh-cn:Material 小部件](viz/widgets-material)
    * [en:Collection widgets;de:Collection-Widgets;ru:Виджеты Collection;zh-cn:Collection 小部件](viz/widgets-collection)
    * [en:JaegerDesign widgets;de:JägerDesign-Widgets;ru:Виджеты JaegerDesign;zh-cn:JaegerDesign 小部件](viz/widgets-jaeger)
    * [en:inventwo widgets;de:inventwo-Widgets;ru:Виджеты inventwo;zh-cn:inventwo 小部件](viz/widgets-inventwo)
    * [Material Design](viz/widgets-materialdesign)
    * [en:Settings of a widget;de:Einstellungen eines Widgets;ru:Настройки виджета;zh-cn:小部件设置](viz/widgets)

* en:Logic & Automation;de:Logik & Automatisierung;ru:Автоматизация;zh-cn:自动化设计
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](logic/README)
  * [Blockly](logic/blockly)
  * [JavaScript](logic/javascript)
  * [TypeScript](logic/typescript)
  * [Node Red](logic/nodered)
  * [Troubleshooting](logic/help)
  * [Best Practices](logic/examples)

* en:Cloud-Services & Apps;de:Cloud-Services & Apps;ru:Облачные сервисы & Apps;zh-cn:云服务
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](cloud/README)
  * [IoT](cloud/iot)
  * [Visualisations](cloud/viz)
  * [Editors](cloud/editor)
  * [Services](cloud/services)
  * [Alexa Smarthome-Skill](cloud/alexasmart)
  * [Alexa Custom-Skill](cloud/alexacustom)
  * [en:App for Android and iOS;de:App für Android und iOS;ru:Приложение для Android и iOS;zh-cn:Android 和 iOS 应用](cloud/app)

* en:Licenses;de:Lizenzen;ru:Лицензии;zh-cn:许可证
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](licenses/README)
  * [en:Adapter licenses;de:Adapterlizenzen;ru:Лицензии адаптеров;zh-cn:适配器许可证](licenses/adapter)
  * [en:Access licenses;de:Zugangslizenzen;ru:Лицензии доступа;zh-cn:访问许可证](licenses/cloud)

* en:Around ioBroker;de:Rund um ioBroker;ru:Вокруг ioBroker;zh-cn:ioBroker 生态
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](ecosystem/README)
  * [en:Usage statistics;de:Nutzungsstatistik;ru:Статистика использования;zh-cn:使用统计](ecosystem/statistics)
  * [en:Crash reports;de:Absturzmeldungen;ru:Отчёты о сбоях;zh-cn:崩溃报告](ecosystem/sentry)
  * [en:Adapter ratings;de:Adapterbewertungen;ru:Оценки адаптеров;zh-cn:适配器评分](ecosystem/rating)
  * [en:Addresses and services;de:Adressen und Dienste;ru:Адреса и сервисы;zh-cn:地址与服务](ecosystem/domains)

* en:Advanced configuration;de:Erweiterte Konfiguration;ru:Экспертные настройки;zh-cn:高级配置
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](config/README)
  * [User und rights control](config/userrights)
  * [Authentication](config/login)
  * [SSL for Web access](config/encryption)
  * [CLI](config/cli)
  * [Multi-Host](config/multihost)
  * [Data storage with Redis](config/redis)
  * [en:Recording data;de:Datenaufzeichnung;ru:Запись данных;zh-cn:数据记录](config/history)
  * [en:Interfaces;de:Schnittstellen;ru:Интерфейсы;zh-cn:接口](config/api)
  * [Backup](config/backup)

* en:Troubleshooting;de:Fehlerbehebung;ru:Поиск и решение проблем;zh-cn:故障排除手册
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](trouble/README)
  * [Runs no more](trouble/RunsNoMore)
  * [Error search](trouble/search)
  * [Errors in adapter](trouble/adapter)
  * [Error reporting](trouble/issue)
  * [Restore of configuration](trouble/restore)
  * [Forum](trouble/forum)
  * [Performance](trouble/monitoring)
  * [Installation Fixer](trouble/install_fixer)

* en:FAQ;de:FAQ;ru:ЧаВо;zh-cn:FAQ
  
* en:Support;de:Unterstützung;ru:Поддержка;zh-cn:加入社区
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](community/README)
  * [Work im team](community/project)
  * en:Documentation;de:Dokumentation;ru:Документация;zh-cn:相关文档
    * [Write an article](community/doc)
    * [en:Style guide;de:Styleguide;ru:Руководство по стилю;zh-cn:风格指南](community/styleguidedoc)
    * [en:Markdown syntax;de:Markdown-Syntax;ru:Синтаксис Markdown;zh-cn:Markdown 语法](community/docmarkdown)

* en:Adapter development;de:Adapterentwicklung;ru:Разработка драйвера;zh-cn:适配器开发
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](dev/adapterdev)
  * [en:Best Practices;de:Empfehlungen;ru:Рекомендации;zh-cn:最佳实践](dev/bestpractices)
  * [en:io-package.json;de:io-package.json;ru:io-package.json;zh-cn:io-package.json](dev/iopackage)
  * [en:Security;de:Sicherheit;ru:Безопасность;zh-cn:安全](dev/adaptersecurity)
  * [en:Messages;de:Nachrichten;ru:Сообщения;zh-cn:消息](dev/messagebox)
  * [en:Notifications;de:Benachrichtigungen;ru:Уведомления;zh-cn:通知](dev/notifications)
  * [en:Storing files;de:Dateien speichern;ru:Хранение файлов;zh-cn:文件存储](dev/filestorage)
  * [en:Log transporter;de:Log-Transporter;ru:Транспорт логов;zh-cn:日志传输](dev/logging)
  * [en:Translating an adapter;de:Adapter übersetzen;ru:Перевод адаптера;zh-cn:适配器翻译](dev/adaptertranslate)
  * [en:dev-server;de:dev-server;ru:dev-server;zh-cn:dev-server](dev/devserver)
  * en:IDEs;de:Entwicklungsumgebung;ru:Среда разработки;zh-cn:集成开发环境
    * [WebStorm](dev/webstorm)
    * [VS Code](dev/vscode)
  * [en:Adapter reference;de:Adapterreferenz;ru:Справочник адаптера;zh-cn:适配器参考](dev/adapterref)
  * [JSON config](dev/adapterjsonconfig)
  * [Object schema](dev/objectsschema)
  * [en:State roles;de:Zustandsrollen;ru:Роли состояний;zh-cn:状态角色](dev/stateroles)
  * [Aliases](dev/aliases)
  * [Template](dev/adaptertemplate)
  * [Adapter tests](dev/adaptertesting)
  * [Adapter doc template](dev/adapterdoctemplate)
  * [Style Guide Adapter-Doc](dev/adapterdocstyleguide)
  * [Style Guide GUI](dev/styleguideui)
  * [Debugging](dev/adapterdebug)
  * [en:Debugging VIS widgets;de:VIS-Widgets debuggen;ru:Отладка VIS-виджетов;zh-cn:调试 VIS 小部件](dev/adaptervis)
  * [Publish](dev/adapterpublish)
  * [JS-Controller](dev/controller)
  * [Add new device](dev/adddevice)
  * [en:Development FAQ;de:Häufige Fragen;ru:Частые вопросы;zh-cn:常见问题](dev/adapter-dev-faq)

