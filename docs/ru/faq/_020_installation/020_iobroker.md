---
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/faq/_020_installation/020_iobroker.md
title: без названия
hash: kwfPhtBV8XuVrlDlYH6zK2hTmhGFNG5hHIZjGel4S/Y=
---
## Как установить ioBroker?

Метод зависит от операционной системы:

| система                                     | Прочь                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Linux** (Debian, Ubuntu, Raspberry Pi OS) | Обычная процедура. Одна команда выполнена: [установка под Linux.](/docs/install/linux.md)          |
| **докер**                                   | Если хост Docker или NAS уже доступны: [Docker](/docs/install/docker.md)                           |
| **Проксмокс**                               | Если ioBroker должен работать параллельно с другими сервисами: [Proxmox](/docs/install/proxmox.md) |
| **Windows**                                 | [Windows](/docs/install/windows.md)                                                                |
| **macOS**                                   | Только для тестирования и разработки: [macOS](/docs/install/macos.md)                              |

В Linux достаточно следующего:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

После этого администратор находится в подчинении.`http://<IP-Adresse>:8081` доступен.

Для тех, кто не уверен: Debian без графического интерфейса на мини-ПК с SSD — это путь с наименьшим количеством неожиданностей.