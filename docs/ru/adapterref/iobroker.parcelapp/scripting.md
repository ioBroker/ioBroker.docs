---
chapters: {"pages":{"de/adapterref/iobroker.parcelapp/README.md":{"title":{"de":"ioBroker.parcelapp — Nutzerdokumentation"},"content":"de/adapterref/iobroker.parcelapp/README.md"},"de/adapterref/iobroker.parcelapp/scripting.md":{"title":{"de":"Skripte und Automatisierung"},"content":"de/adapterref/iobroker.parcelapp/scripting.md"},"de/adapterref/iobroker.parcelapp/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.parcelapp/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcelapp/scripting.md
title: Скрипты и автоматизация
hash: Ecq2zEbOAcY1cONwFtdk1V2veBjtNb6NdeCTqBOmPjk=
---
# Скрипты и автоматизация

Разделы: [Главная страница](/#/adapters/parcelapp) · **Эта страница** · [Часто задаваемые вопросы](/#/docs/adapterref/iobroker.parcelapp/faq.md)

---

## Реагирование на трансляцию

Брать `statusCode` никогда `status` Текст меняется в зависимости от языка системы, число — нет.

```javascript
// Ansage für eine Sendung, die in Zustellung ist.
on({ id: /^parcelapp\.0\.deliveries\..*\.statusCode$/, change: "ne" }, obj => {
  if (obj.state.val !== 4) {
    return; // 4 = In Zustellung
  }
  const base = obj.id.replace(/\.statusCode$/, "");
  const was = getState(`${base}.description`).val;
  const wann = getState(`${base}.deliveryWindow`).val;
  say(wann ? `${was} kommt zwischen ${wann}` : `${was} ist in Zustellung`);
});
```

Коды находятся на [главной странице](/#/adapters/parcelapp#status-codes) . Два из них заслуживают отдельного скрипта: **6** (попытка доставки не удалась) и **7** (исключение) — это состояния, в которых отправлению требуется ваша помощь.

## Реагируйте в течение дня

`summary.todayCount` и `summary.deliveryWindow` Опишите события дня, а не одну конкретную передачу — отлично подойдет для утреннего выпуска новостей:

```javascript
schedule("0 7 * * *", () => {
  const anzahl = getState("parcelapp.0.summary.todayCount").val;
  if (anzahl === 0) {
    return;
  }
  const fenster = getState("parcelapp.0.summary.deliveryWindow").val;
  say(fenster ? `${anzahl} Pakete heute, zwischen ${fenster}` : `${anzahl} Pakete werden heute erwartet`);
});
```

## `lastUpdated` является знаком изменения

`lastUpdated` Эта запись появляется только тогда, когда данные о доставке фактически изменились, а не при каждом запросе — ежедневная оценка, новое отображаемое имя курьера или другой язык системы не учитываются, но новый код курьера — учитывается. Таким образом, она служит триггером «что-то произошло», а старая метка времени — это информация, а не ошибка.

```javascript
// Warnen bei einer Sendung, die sich seit vier Tagen nicht bewegt.
schedule("0 18 * * *", () => {
  $("state[id=parcelapp.0.deliveries.*.lastUpdated]").each(id => {
    const tage = (Date.now() - new Date(getState(id).val).getTime()) / 86400000;
    if (tage > 4) {
      log(`Seit ${Math.floor(tage)} Tagen keine Bewegung: ${id}`);
    }
  });
});
```

---

## Добавить сценарий трансляции

Адаптер принимает `addDelivery` -Сообщение получено и переслано в ваш аккаунт parcel.app:

```javascript
sendTo(
  "parcelapp.0",
  "addDelivery",
  {
    tracking_number: "1234567890",
    carrier_code: "dhl",
    description: "Mein Paket",
    // optional:
    language: "de", // Sprache der Sendungsverfolgung, ISO 639-1, Vorgabe "en"
    send_push_confirmation: true, // parcel.app-Push nach dem Hinzufügen, Vorgabe false
    postcode: "10115", // manche Zusteller (z. B. bpost, DPD Deutschland) verfolgen ohne sie nicht
    email: "du@example.com", // manche Dienste (z. B. Apple-Store-Bestellungen) verlangen sie
  },
  result => {
    if (result.success) {
      log("Zu parcel.app hinzugefügt");
    } else {
      log(`Konnte nicht hinzugefügt werden: ${result.error_message}`, "warn");
    }
  },
);
```

### Ответ

Функция обратного вызова всегда включает объект с `success` и в случае ошибки, `error_message` Эта форма стабильна — скрипты, написанные с её использованием, по-прежнему будут работать. Функция обратного вызова необязательна: a `sendTo` Без этого программа прибавляет ту же сумму; результат затем отображается в журнале на информационном уровне. `addDelivery: added '…'` или `addDelivery: parcel.app rejected '…': …`).

`success: false` Это может быть вызвано несколькими причинами, и `error_message` Какой именно: неизвестный `carrier_code` номер отслеживания, который курьер не знает, пропажа `postcode` или `email` Проблема может возникнуть из-за курьера, которому это необходимо, из-за дневного лимита на доставку POST или ошибки проверки в адаптере, даже до отправки запроса. Если parcel.app отклонит запрос, это повлечет за собой дополнительные расходы. `error_message` Причина присвоения HTTP-статуса предоставляется самим приложением parcel.app — например. `HTTP 400: Unknown carrier code` — и не только строка состояния.

### Что проверяет адаптер перед отправкой

| Правило                                                                                                             | Отвечать                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `tracking_number`, `carrier_code` и `description` являются обязательными и не пустыми                                | `tracking_number, carrier_code and description are required`         |
| Каждое поле может содержать максимум 512 символов.                                                                  | `each field must be at most 512 characters`                          |
| Максимальное количество просмотров за 24 часа — 20, что соответствует дневному лимиту самого приложения parcel.app. | `daily limit of 20 addDelivery requests reached; next possible at …` |

Эти меры защиты существуют для предотвращения чрезмерного использования скриптом ежедневного бюджета POST-запросов parcel.app, которые parcel.app всё равно бы отклонил, а также для предотвращения отправки запросов объёмом в несколько мегабайт. Они вмешиваются до обработки сетевого запроса, поэтому отклонение запроса ничего не стоит. Первое отклонение в течение 24 часов отображается как предупреждение; каждое последующее отклонение отображается на уровне отладки.

### Что происходит после успешного сложения?

Адаптер немедленно отправляет повторный запрос — не чаще одного раза за интервал запросов, не раньше чем через 60 секунд после предыдущего запроса и только в течение времени, которое позволяет почасовой бюджет; в противном случае, следующий обычный запрос получает данные об отправлении. Однако данные о вашем отправлении обычно по-прежнему пусты — сам parcel.app отстает от веб-сайта службы доставки в среднем **на 45, а максимум примерно на 90 минут** ; до этого момента новое добавленное отправление не отображает никаких событий. Это задержка на стороне parcel.app, а не ошибка адаптера.

### Сокращенное обозначение водителя-курьера

`carrier_code` Идентификатор, используемый приложением parcel.app, не совпадает с именем курьера. `dhl`, `ups`, `fedex` и так далее. Список, из которого адаптер определяет имена, выглядит следующим образом...[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json) Читаемое название уже просматриваемой программы всегда отображается в её файле. `carrier` — Точка данных.

---

## Проверка соединения с помощью скрипта

Сообщение `checkConnection` Выполняет подлинный запрос и отвечает в формате, ожидаемом административным интерфейсом. `{ result: "..." }` В случае успеха, `{ error: "..." }` В случае сбоя:

```javascript
sendTo("parcelapp.0", "checkConnection", { apiKey: "dein-schluessel" }, reply => {
  log(reply.error ? `Fehlgeschlagen: ${reply.error}` : `Ok: ${reply.result}`);
});
```

Форма намеренно отличается от `addDelivery`: то `sendTo` В административном компоненте ioBroker написано именно так. `result` /`error`. `checkConnection` Это не должно быть включено в расписание — каждый запрос обрабатывает один из 20 запросов в час. При использовании настроенного ключа адаптер отвечает автоматически, пока идет период ожидания для лимита запросов parcel.app или пока не исчерпан почасовой бюджет.