* [Welcome](README)

* en:Fundamentals;de:Grundlagen;ru:Основы;zh-cn:基础概念
  * [Introduction](basics/README)
  * [Architecture](basics/architecture)
  * [Adapter & Instanzen](basics/adapter)
  * [Repositories](basics/repositories)
  * [Objects](basics/objects)
  * [States or Datapoints](basics/states)
  * [Alias](basics/alias)
  * [Enums](basics/enums)
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
  * [System settings](admin/settings)
  * [Admin-Overview](admin/overview)
  * [Adapter](admin/adapter)
  * [Instances](admin/instances)
  * [Objects](admin/objects)
  * [Enumerations](admin/enums)
  * [Log](admin/log)
  * [User](admin/users)
  * [Hosts](admin/hosts)
  * [Files](admin/files)

* [en:Tutorials;de:Tutorials;ru:Уроки;zh-cn:教程文档](tutorial/README.md)
  * [First setup](tutorial/setup)
  * [User interface](tutorial/admin)
  * [Manage adapters](tutorial/adapter)
  * [Simple logic](tutorial/logic)
  * [Visualisation](tutorial/viz)
  * [Data logging](tutorial/history)
  * [Charts](tutorial/flot)
  * [Updates](tutorial/updates)
  * [Restore](tutorials/restore)

* en:Visualisations;de:Visualisierungen;ru:Визуализация;zh-cn:可视化页面
  * [Introduction](viz/README)
  * [Material](viz/material)
  * [Vis](viz/vis)
    * en:Widgets;de:Widgets;ru:Виджеты;zh-cn:小部件
      * [Allgemeine Einstellungen](viz/widgets)
      * en:Widget sets;de:Widgetsätze;ru:Наборы виджетов;zh-cn:小工具集
        * [Basic](viz/basic)
        * [Fancyswitch](viz/fancyswitch)
        * [Hqwidgets](viz/hqwidgets)
        * [Jqui](viz/jqui)
        * [Jquimfd](viz/jquimfd)
        * [Metro](viz/metro)
        * [Rgraph](viz/rgraph)
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
  * [Alexa Smarthome-Skill](cloud/alexasmart)
  * [Alexa Custom-Skill](cloud/alexacustom)
  * [App](cloud/app)

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
