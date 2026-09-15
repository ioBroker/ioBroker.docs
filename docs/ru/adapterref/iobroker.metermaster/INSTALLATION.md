---
chapters: {"pages":{"en/adapterref/iobroker.metermaster/README.md":{"title":{"en":"ioBroker.metermaster"},"content":"en/adapterref/iobroker.metermaster/README.md"},"en/adapterref/iobroker.metermaster/INSTALLATION.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.metermaster/INSTALLATION.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.metermaster/INSTALLATION.md
title: без названия
hash: tFQhqb7V05bUSMEAEJlOuc6gSjuUQcdxUDabc8X0GZs=
---
## Установка адаптера MeterMaster

Этот документ дополняет файл [README](/#/adapters/metermaster) дополнительными инструкциями по установке.

### Стандартная установка

1. Откройте **административную панель ioBroker** → **Адаптеры**
2. Поиск **MeterMaster**
3. Нажмите **«Установить»** и создайте экземпляр.
4. Запустите экземпляр

Командная строка на хосте ioBroker:

```bash
iobroker add metermaster
iobroker start metermaster
```

### Брандмауэр

Если приложение MeterMaster не может связаться с адаптером, откройте порт 8089:

```bash
sudo ufw allow 8089/tcp
```

### Конфигурация экземпляра

| Параметр                   | По умолчанию  | Описание                                                  |
| -------------------------- | ------------- | --------------------------------------------------------- |
| HTTP-порт                  | `8089`        | Порт, на котором адаптер прослушивает                     |
| Имя пользователя           | `metermaster` | Имя пользователя для базовой аутентификации               |
| Пароль                     | –             | Пароль для базовой аутентификации                         |
| Подробная запись в журнале | включено      | Отображение отладочных записей в средстве просмотра логов |
| Буфер лога                 | `500`         | Максимальное количество сохраненных записей в журнале     |
| Сохраняйте историю         | `0`           | 0 = неограниченный                                        |

### Обновлять

```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

### Поиск неисправностей

Проверьте состояние адаптера:

```bash
iobroker status metermaster.0
```

Просмотреть журналы:

```bash
iobroker logs metermaster.0
```

Если порт 8089 уже используется, выберите другой порт в конфигурации экземпляра адаптера.