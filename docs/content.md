* [Welcome](README)

* en:Fundamentals;de:Grundlagen;ru:Основы;zh-cn:基础概念
  * [Introduction](basics/README)
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
  * [Introduction](install/README)
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
  * [en:Updating;de:Updaten;ru:обновить;zh-cn:更新](install/update.md)
    * [ioBroker](install/updateself)
    * [Adapter](install/updateadapter)
    * [Node.js & npm](install/updatenode)

* [en:Admin interface;de:Admin-Oberfläche;ru:Интерфейс админки;zh-cn:管理员界面](admin/README.md)
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

* [en:Tutorials;de:Tutorials;ru:Уроки;zh-cn:教程文档](tutorial/README.md)
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
  * [Introduction](viz/README)
  * [Material](viz/material)
  * [Vis](viz/vis)
    * en:Widgets;de:Widgets;ru:Виджеты;zh-cn:小部件
      * [Allgemeine Einstellungen](viz/widgets)
      * en:Widget sets;de:Widgetsätze;ru:Наборы виджетов;zh-cn:小工具集
        * [Basic](viz/basic)
        * [Fancyswitch](viz/fancyswitch)
        * [Time&Weather](viz/timeandweather)
  * [App](viz/app)

* [en:Logic & Automation;de:Logik & Automatisierung;ru:Автоматизация;zh-cn:自动化设计](logic/README.md)
  * [Blockly](logic/blockly)
  * [JavaScript](logic/javascript)
  * [TypeScript](logic/typescript)
  * [Node Red](logic/nodered)
  * [Troubleshooting](logic/help)
  * [Best Practices](logic/examples)

* en:Cloud-Services & Apps;de:Cloud-Services & Apps;ru:Облачные сервисы & Apps;zh-cn:云服务
  * [Introduction](cloud/README)
  * [IoT](cloud/iot)
  * [Visualisations](cloud/viz)
  * [Editors](cloud/editor)
  * [Services](cloud/services)
  * [Alexa Smarthome-Skill](cloud/alexasmart)
  * [Alexa Custom-Skill](cloud/alexacustom)
  * [App](cloud/app)

* en:Licenses;de:Lizenzen;ru:Лицензии;zh-cn:许可证
  * [en:Overview;de:Überblick;ru:Обзор;zh-cn:概览](licenses/README)
  * [en:Adapter licenses;de:Adapterlizenzen;ru:Лицензии адаптеров;zh-cn:适配器许可证](licenses/adapter)
  * [en:Access licenses;de:Zugangslizenzen;ru:Лицензии доступа;zh-cn:访问许可证](licenses/cloud)

* en:Advanced configuration;de:Erweiterte Konfiguration;ru:Экспертные настройки;zh-cn:高级配置
  * [Introduction](config/README)
  * [User und rights control](config/userrights)
  * [Authentication](config/login)
  * [SSL for Web access](config/encryption)
  * [CLI](config/cli)
  * [Multi-Host](config/multihost)
  * [Data storage with Redis](config/redis)
  * [Backup](config/backup)

* en:Troubleshooting;de:Fehlerbehebung;ru:Поиск и решение проблем;zh-cn:故障排除手册
  * [Introduction](trouble/README)
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
  * [Introduction](community/README)
  * [Work im team](community/project)
  * en:Documentation;de:Dokumentation;ru:Документация;zh-cn:相关文档
    * [Write an article](community/doc)
    * [Style Guide Documentation](community/styleguidedoc)
    * [Markdown Syntax](community/docmarkdown)

* en:Adapter development;de:Adapterentwicklung;ru:Разработка драйвера;zh-cn:适配器开发
  * [Introduction](dev/adapterdev)
  * en:IDEs;de:Entwicklungsumgebung;ru:Среда разработки;zh-cn:集成开发环境
    * [WebStorm](dev/webstorm)
    * [VS Code](dev/vscode)
  * [Adapter reference](dev/adapterref)
  * [JSON config](dev/adapterjsonconfig)
  * [Object schema](dev/objectsschema)
  * [en:State roles;de:Zustandsrollen;ru:Роли состояний;zh-cn:国家角色](dev/stateroles)
  * [Aliases](dev/aliases)
  * [Template](dev/adaptertemplate)
  * [Adapter tests](dev/adaptertesting)
  * [Adapter doc template](dev/adapterdoctemplate)
  * [Style Guide Adapter-Doc](dev/adapterdocstyleguide)
  * [Style Guide GUI](dev/styleguideui)
  * [Debugging](dev/adapterdebug)
  * [Publish](dev/adapterpublish)
  * [JS-Controller](dev/controller)
  * [Best Practices](dev/bestpractices)
  * [Add new device](dev/adddevice)

* en:System integrators;de:System-Integratoren;ru:Системные интеграторы;zh-cn:系统集成
  * [Introduction](integrators/README)
  * [Link-Box](integrators/linkbox)
