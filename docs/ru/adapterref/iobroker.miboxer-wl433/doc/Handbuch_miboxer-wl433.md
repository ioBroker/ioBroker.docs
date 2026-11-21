---
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md
title: Руководство ioBroker.miboxer-wl433
hash: 7hEDd2P/2OzOKaRI6ZPYb6bEOHbK/wtpqRvidFyHwho=
---
# Руководство ioBroker.miboxer-wl433

_MiBoxer-Poolbeleuchtung (шлюз WL-433, Leuchten PW01 / PW02) локально с ioBroker steuern – Schritt für Schritt erklärt_

|                 |                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Версия адаптера | 0.2.2                                                                                                 |
| Стоять          | 02.11.2026                                                                                            |
| Voraussetzung   | ioBroker с администратором ab версии 8, js-контроллер ab 6.0.11, Node.js ab 22                        |
| Язык            | Немецкий · [Английская версия](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) |

## Инхальт

1. [Über dieses Handbuch](#1-über-dieses-handbuch)
2. [Что делает адаптер](#2-was-der-adapter-macht)
3. [Was Sie brauchen](#3-was-sie-brauchen)
4. [Schritt 1 – Leuchten und Gateway в приложении MiBoxer-App einrichten](#4-schritt-1--leuchten-und-gateway-in-der-miboxer-app-einrichten)
5. [Шаг 2 – Получение идентификатора и локального ключа](#5-schritt-2--geräte-id-und-local-key-besorgen)
6. [Схема 3 – Установка адаптера](#6-schritt-3--adapter-installieren)
7. [Шритт 4 – Мгновение einrichten](#7-schritt-4--instanz-einrichten)
8. [Schritt 5 – Prüfen, все функции](#8-schritt-5--prüfen-ob-alles-funktioniert)
9. [Die Poolbeleuchtung bedienen](#9-die-poolbeleuchtung-bedienen)
10. [Зонен](#10-zonen)
11. [Zeitschaltungen (Таймер)](#11-zeitschaltungen-timer)
12. [Действия для автоматизации](#12-beispiele-für-automatisierungen)
13. [Фелерсухе](#13-fehlersuche)
14. [Für Neugierige: Функционирование в деталях](#14-für-neugierige-so-funktioniert-es-im-detail)
15. [Бегрифе](#15-begriffe)
16. [Правовой контакт](#16-rechtliches-und-kontakt)

## 1. Über dieses Handbuch

Это руководство поможет вам использовать MiBoxer-App для использования пула, а также использовать ioBroker, чтобы он был доступен, затемнен и открыт. Sie brauchen dafür **keine Programmierkenntnisse** . Джедер Шритт настолько хорош, что дает Sie ihn der Reihe nach abarbeiten können.

**So lesen Sie dieses Handbuch:**

- Arbeiten Sie die Kapitel 3 bis 8 **der Reihe nach** ab. Это функция Steuerung.
- Капитель 9-бис 12 Zeigen был Sie danach alles tun können. Капитель 13 hilft, если это было nicht klappt.
- Число прослушиваний и Handlungsschritte: сначала Шрифт 1, затем Шрифт 2 и так далее.
- Wörter in `dieser Schrift` Tippen Sie genau so ab или finden sie genau so auf dem Bildschirm.
- Unbekannte Begriffe erklärt Kapitel 15.

Farbige Kästen weisen auf Besonderes hin:

> \[!TIP] Ein Tipp macht Ihnen die Arbeit leichter.

> \[!NOTE] Ein Hinweis erklärt Hintergründe.

> \[!ВАЖНО] Важно: Das sollten Sie auf keinen Fall übersehen.

> \[!ВНИМАНИЕ] Внимание: Hier kann etwas schiefgehen, wenn Sie nicht aufpassen.

**Был получен:** Alle Schritte mit dem Adaptor wurden am 22.09.2026 mit einem echten WL-433-Gateway ausprobiert. Die Bilder stammen aus ioBroker Admin 8. Bei einer anderen Admin-Version können Knöpfe leicht anders aussehen orers heißen. Стеллен, die nicht selbst ausprobiert werden konnten, sind mit **(ungeprüft)** gekennzeichnet.

## 2. Что делает адаптер?

MiBoxer-Gateway WL-433 — это соединение с беспроводным соединением (WLAN) и пулом. Вы можете использовать Befehle для фанка (LoRa, 433 МГц) от Gateway. Обычный доступ к шлюзу с приложением MiBoxer – доступ к Интернету (облако Herstellers Tuya).

Адаптер **ioBroker.miboxer-wl433** подключается **непосредственно к шлюзу** , где можно подключиться к Интернету:

```text
ioBroker  ──(Heimnetz / WLAN)──►  Gateway WL-433  ──(Funk 433 MHz)──►  Poolleuchten PW01 / PW02
```

**Информация о адаптере:**

- Leuchten ein- und ausschalten und dimmen (1–100 %)
- Weißes Licht от теплого (2700 K) до белого (6500 K) света
- Jede Farbe einstellen, auch blasse Pastelltöne (Farbton und Sättigung)
- Die 9 Farbprogramme M1–M9 der App start und schneller или langsamer laufen lassen (S+ / S-)
- Einzelne der 8 Zonen или alle Zonen gleichzeitig steuern
- Die Leuchten mit bis zu 50 Zeitschaltungen autotisch schalten – zu festen Uhrzeiten oder nach dem Sonnenstand, а также в Интернете
- Alles mit ioBroker-Skripten, Zeitplänen, Visualisierungen und Sprachassistenten verbinden

**Невозможно использовать адаптер (если шлюз не сливается):**

- Er kann nicht anzeigen, welche Zone gerade welche Farbe шляпа. Das Gateway kennt nur **einen** Zustand für alle Leuchten: die letzte Einstellung. Auch die MiBoxer-App zeigt keinen Unterschied zwischen den Zonen.
- Er kann nicht anzeigen, wie schnell ein Farbprogramm läuft.
- Er kann nicht sehen, ob eine Leuchte den Funkbefehl wirklich empfangen Hat. Итак, это было сочетание Врат.
- Таймер приложения MiBoxer можно использовать только сейчас – он находится в Tuya-Cloud (Глава 11).

## 3. Was Sie brauchen

Haken Sie diese Liste ab, bevor Sie anfangen:

- [ ] **MiBoxer WL-433** - шлюз и контроль над **PW01** или **PW02** , добавленный в **приложение MiBoxer** (глава 4).
- [ ] Eine laufende **ioBroker** — Установка, которую можно выполнить на Raspberry Pi. Рекомендуемые версии: **Admin 8** , **js-controller 6.0.11** , **Node.js 22** .
- [ ] Шлюз и ioBroker в **собственном Хеймнеце** .
- [ ] **Укажите идентификатор** и **локальный ключ** шлюза (Глава 5). Dafür brauchen Sie einmalig ein **Android-смартфон или планшет** – ein iPhone или iPad allein reicht dafür nicht (предварительно, описано в Главе 5).
- [ ] Etwa 30 bis 60 Minuten Zeit.

> \[!TIP] **Поэтому рекомендуется использовать версию ioBroker:** Отключить администратора ioBroker в браузере. Ссылки в меню можно найти **на хостах** — неважно, какие версии используются для js-контроллера и Node.js. Для **адаптера** необходимо установить версию **администратора** .

> \[!TIP] **Feste IP-адрес для шлюза:** Зарегистрируйтесь в маршрутизаторе, чтобы указать «DHCP-Reservierung» для шлюза (bei einer FRITZ!Box: _Heimnetz → Netzwerk → Gerät Bearbeiten → «Diesem Netzwerkgerät immer die gleiche IPv4-Adresse zuweisen»_ ). Dann ändert sich seine Adresse nie. Das ist nicht zwingend, macht den Betrieb aber zuverlässiger.

## 4. Schritt 1 – Leuchten und Gateway в приложении MiBoxer-App einrichten

Адаптер отключен от Leuchten, поэтому он может быть добавлен в приложение. Richten Sie deshalb zurst alles в приложении.

1. Установите приложение **MiBoxer** (Hersteller Futlight) на свой смартфон – из Google Play (Android) или из App Store (iPhone/iPad).
2. Легендарный код и доступный шлюз **WL-433-Gateway** . Folgen Sie dabei den Anweisungen der App.
3. Verknüpfen Sie jede Poolleuchte mit einer **Zone** des Gateways (Зоны 1–8). Wie das geht, beschreibt Schritt für Schritt die Anleitung [Anleitung\_PW01\_mit\_WL-433\_verbinden.pdf](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf) .
4. Попробуйте войти в приложение, где есть все Leuchten Schalten lassen.

> \[!TIP] Notieren Sie sich, welche Leuchte в зоне welcher Zone ist. Sie brauchen das später, когда Sie einzelne Leuchten gezielt steuern möchten:
>
> | Зона | Leuchte (z. B. Einbauort) |
> | ---- | ------------------------- |
> | 1    |                           |
> | 2    |                           |
> | 3    |                           |

> \[!ВАЖНО] Если шлюз загрузится в приложение и будет отключен («neu koppeln»), появится **локальный ключ** . Данн müssen Sie Kapitel 5 wiederholen und den neuen Schlüssel im Adapter eintragen.

## 5. Шаг 2 – получение идентификатора и локального ключа

Адаптер должен быть доступен, когда шлюз используется в течение длительного времени:

| Ангабе                                                | Wie sie aussieht                                                   | Вофюр                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| **Geräte-ID** (english _Device ID_ , im Log _devId_ ) | etwa 20 bis 22 Zeichen, z. B. `bf0123456789abcdefgh`                | Если использовать адаптер, _он_ может быть поврежден |
| **Локальный ключ**                                    | Genau 16 Zeichen, часто mit Sonderzeichen, z. Б. `a1B2$c3D4{e5F6g7` | «Пароль» для Verschlüsselte Verbindung               |

Приложение MiBoxer-App всегда поможет вам. Sie schreibt sie aber в своем внутреннем **протоколе** (журнал) – и протоколы могут быть использованы на **Android-Gerät** mitlesen.

**Der einfachste Weg ist die ausführliche Anleitung** [Anleitung\_Geraete-ID\_und\_Local-Key\_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md) ( [PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.pdf) ). Sie erklärt jeden Fingertipp – ganz ohne Computer mit Den Apps _LogFox_ und _Shizuku_ и т. д., был Sie mit einem iPhone или iPad, который вы использовали.

### 5.1 Альтернатива: с компьютером и USB-кабелем (Windows)

Сообщение от 22 сентября 2026 г. с полученным смартфоном Android-13.

1. **Бесплатные варианты выбора:** При использовании Android-Gerät _Einstellungen → Über das Telefon_ öffnen и **7-mal** auf **Build-Nummer** Tippen, например, «Sie sind jetzt Entwickler».
2. **Выбор USB-отладки:** _Выбор → Система → Entwickleroptionen → Выбор USB-отладки_ . Используйте Xiaomi-Geräten zusätzlich **USB-Debugging (Sicherheitseinstellungen)** .
3. **Работа с компьютером:** Загрузите **SDK Platform-Tools** от Google: <https://developer.android.com/tools/releases/platform-tools> . Entpacken Sie die die die ZIP-Datei, zum Beispiel nach `C:\sdk`.
4. **Eingabeaufforderung öffnen:** Windows-Taste drücken, `cmd` Типпен, Введите Дрюкен. Dann in den Ordner wechseln: `cd C:\sdk\platform-tools`
5. **Handy verbinden:** Das Handy per USB-Kabel anschließen und entsperren. Фрагмент **«Отладка по USB выполняется?»** – Введите **«Von diesem Computer immer Zulassen»** и дайте **совет** .
6. **Verbindung prüfen:** `adb devices` айнгебен. Ihr Gerät muss mit dem Wort `device` erscheinen. Steht dort `unauthorized`, haben Sie die Frage aus Schritt 5 noch nicht bestätigt: Handy entsperren und auf den Bildschirm schauen.
7. **Mitschnitt starten:** `adb logcat -v time > miboxer.txt` айнгебен. Das Fenster scheint nun «hängen» zu bleiben – das ist richtig, es schreibt mit.
8. **Использование приложения:** откройте приложение MiBoxer, выберите шлюз и проверьте его, чтобы открыть его и просмотреть его.
9. **Mitschnitt beden:** Zurück am Computer **Strg + C** drücken.
10. **Werte suchen:** `findstr /i "localKey devId" miboxer.txt` айнгебен. In den gefundenen Zeilen Stehen Hinter `devId` die Geräte-ID und hinter `localKey` der Local Key.

> \[!WARNING] Локальный ключ соответствует паролю. Geben Sie ihn nicht weiter und veröffentlichen Sie die Datei `miboxer.txt` ниргенды. Löschen Sie die Datei, sobald Sie die Werte notiert haben. Вы можете выполнить **USB-отладку** с помощью дополнительных опций.

### 5.2 Доступен ли iPhone или iPad?

Apple erlaubt keinem Programm, das Protokoll anderer Apps mitzulesen. Если вы хотите, чтобы в течение нескольких минут вы использовали Android-Gerät, установите приложение MiBoxer-App и используйте его с **вашим** MiBoxer-Konto - шлюз будет автоматическим, и вы сможете получить доступ к нему. Weitere Wege (Android-эмулятор на компьютере) для дополнительного использования; sie sind **(ungeprüft)** .

> \[!TIP] **Полученный идентификатор** можно найти в другом журнале: после установки адаптеров, таких как Knopf **Gateway, в локальной сети Netzwerk, такой** (глава 7), чтобы создать все необходимые идентификаторы и идентификаторы. **Местный ключ** может быть не найден.

## 6. Схема 3 – Установка адаптера

Адаптер не находится в официальном списке адаптеров ioBroker. Он устанавливается непосредственно на GitHub. Собальд входит в расширенный список, предназначенный для **адаптера** Reiter nach. `miboxer` zu suchen und auf **+** (Installieren) zu clicken.

### 6.1 Expertenmodus einschalten

1. Отключить администратора ioBroker в браузере, чтобы получить доступ к нему `http://<IP-Adresse Ihres ioBroker>:8081`.
2. Щелкните ссылку в меню **«Адаптер»** .
3. Нажмите на ссылку, чтобы найти ссылку на **Kopf-Symbol** (rot markiert).

![Expertenmodus einshalten: Kopf-Symbol связывает unten](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-expert-de.png)

4. Es erscheint ein Hinweis zum Expertenmodus. Нажмите кнопку **«ОК»** .

![Hinweis zum Expertenmodus](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-expert-dialog-de.png)

> \[!NOTE] Der Expertenmodus zeigt zusätzliche Knöpfe. Er gilt nur für diese Browsersitzung und schadet nichts. Sie können ihn mit demselben Knopf wieder ausschalten.

### 6.2 Aus GitHub installieren

1. Доступ к новому **символу Katzen** (логотип GitHub) с инструкциями **по установке по собственному URL-адресу** . Нажмите кнопку Sie Darauf.
2. Wählen Sie im Fenster den Reiter **Benutzerdefiniert** .
3. Введите **URL-адрес** в поле: URL-адрес: `https://github.com/ssbingo/ioBroker.miboxer-wl433`
4. Lassen Sie den Haken bei **Instanz erstellen, wenn noch keine Existiert Gesetzt** .
5. Нажмите кнопку **«Установить»** .

![Установить собственный URL-адрес: Reiter «Benutzerdefiniert» и Adresse.](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-install-de.png)

6. Ein Fenster zeigt den Fortschritt. Warten Sie, его установка будет выполнена (das kann auf einem Raspberry Pi einige Minuten dauern), und schließen Sie das Fenster.

> \[!NOTE] Обязательное предупреждение в Fenster — это все, что вам нужно от ioBroker для всех адаптеров, но не в официальном списке.

**Альтернатива для работы – с помощью консоли** (например, для SSH auf dem ioBroker-Rechner):

```bash
iobroker url https://github.com/ssbingo/ioBroker.miboxer-wl433
iobroker add miboxer-wl433
```

## 7. Шритт 4 – Instanz einrichten

**Названия** моментов установки не указаны. `miboxer-wl433.0` – это «латунный адаптер» для вашего шлюза.

1. Щелкните ссылку, чтобы мгновенно щелкнуть **ссылку** .
2. Введите Zeile **miboxer-wl433.0** и щелкните Sie auf das **Schraubenschlüssel-Symbol** . Die Einstellungsseite öffnet sich. Sie Hat oben Zwei Reiter: **Gateway** for die Verbindung (dieses Kapitel) и **Timer** für Zeitschaltungen (Kapitel 11). Началось с Reiter **Gateway** :

![Einstellungsseite der Instanz (Beispielwerte)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-config-de.png)

3. Füllen Sie die Felder aus:

| Поле                               | Was Sie eintragen                                                                                         | Пример                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Geräte-ID**                      | Die Geräte-ID aus Kapitel 5                                                                               | `bf0123456789abcdefgh` |
| **Локальный ключ**                 | Den Local Key aus Kapitel 5 – genau 16 Zeichen, Groß- und Kleinschreibung Beachten                        | `a1B2$c3D4{e5F6g7`     |
| **IP-адрес шлюзов**                | IP-адрес шлюзов на вашем маршрутизаторе. **Если вы просматриваете уроки** – нет ли такого адаптера шлюза? | `192.168.1.50`         |
| **Tuya-Protokollversion**          | `3.3` stehen lassen                                                                                       | `3.3`                  |
| **Wartezeit bis zum Neuverbinden** | Nach wielen Sekunden der Adaptor es nach einer Störung erneut versurucht. `30` паст                        | `30`                   |
| **Интервал для статуса**           | Все пройдены секунды с адаптером на месте. `60` паст                                                       | `60`                   |
| **Zonensteuerung**                 | Wie Zonen angeboten werden – siehe unten. Im Zweifel **Zonenwahl** lassen                                 | Зоненвал               |

4. **Zonensteuerung wählen:** Нажмите кнопку Sie auf das Auswahlfeld. Es gibt zwei Möglichkeiten:

![Auswahl der Zonensteuerung](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-zonemode-de.png)

| Валь                       | Что вы получите                                                                                                        | Nehmen Sie diese Wahl, когда…                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Zonenwahl (light.zone)** | Einen Satz Datenpunkte `light.*` und einen Datenpunkt `light.zone`, с dem Sie festlegen, хорошая зона die Befehle gehen | … Sie alle Leuchten meist gemeinsam steuern oder unsicher sind. **Эмпфолен.**   |
| **Ein Kanal je Zone**      | Zusätzlich die Ordner `zones.zone1` бис `zones.zone8` с собственными датами в зоне                                       | … Sie in Skripten или Visualisierungen einzelne Zonen direkt ansprechen möchten |

Глава 10 содержит варианты с вариантами.

5. Нажмите кнопку Sie unten auf **Speichern und schließen** . Мгновенный запуск и завершение работы с шлюзом.

> \[!TIP] **IP-адрес не указан?** Для получения идентификатора и локального ключа щелкните «Sie auf **Speichern** » (не закрытый) и **вставьте шлюз в локальную сеть Netzwerk** . Dieuche dauert bis zu 12 Sekunden. Найдите шлюз, перейдите к его IP-адресу и версии протокола — это означает **, что вы не знаете, как это сделать** . Der Knopf функционирует только после мгновенного запуска.

> \[!ВАЖНО] Если **зона безопасности** отключена, адаптер должен быть удален от другого варианта. Скрипт, в котором указаны даты, необходимо, чтобы вы могли пройти мимо.

## 8. Шрифт 5 – Prüfen, все функции

1. **Мгновенный статус:** Нажмите на ссылку в **мгновенном режиме** . Das Symbol am Anfang der Zeile **miboxer-wl433.0** zeigt den Zustand – так что все ioBroker-Adaptern:
   - **grün:** läuft und ist mit dem Gateway verbunden – alles в Ordnung;
   - **гельб:** läuft, ist aber (noch) nicht verbunden – kurz warten, sonst Kapitel 13;
   - **rot:** gestoppt – mit dem Start-Knopf (Dreieck) starten.
2. **Дата ответа:** Щелкните ссылку на **объект** и отмените его, чтобы получить порядок **miboxer-wl433 → 0 → свет** (при щелчке по обычному символу). Когда мы прошли мимо, было приложение MiBoxer-App:

![Дата установки miboxer-wl433.0.light](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-light-de.png)

3. **Verbindung prüfen:** Im Ordner **info** muss der Datenpunkt **Connection** auf `true` stehen.
4. **Erster Schalttest:** Щелчок в дер Zeile, **яркость** auf den Wert, типпен Sie `50` ein und drücken Sie Enter. Через **2–3 секунды** в течение 50 % времени в приложении.

> \[!NOTE] **Warum dauert das 2 bis 3 Sekunden?** Прежде всего, через 2,5 секунды наступит время ожидания. Прежде всего, это лучший адаптер для адаптера. Это значит, что администратор не может быть лучше.

Wenn etwas nicht klappt, прочтите статью в 13-й главе.

## 9. Die Poolbeleuchtung Bedienen

### 9.1 Einen Wert ändern

Im Reiter **Objekte** ändern Sie einen Wert так:

1. Нажмите кнопку «Sie in der Spalte **Wert** auf den Wert des Datenpunkts».
2. Geben Sie den neuen Wert ein oder wählen Sie ihn aus. Schalter (wie **on** ) щелкает Sie einfach an, Knöpfe (wie **SpeedUp** ) ebenso.
3. Bestätigen Sie mit Enter bzw. **Убернемен** .

В сценарии Visualisierungen или Sprachassistenten benutzen Sie Dieselben Datenpunkte – nur eben autotisch (Kapitel 12).

### 9.2 Was möchten Sie tun?

Все даты, лежащие в Орднере `miboxer-wl433.0.light`:

| Sie möchten …                        | Пункт данных             | Верт (Пример)                                          |
| ------------------------------------ | ------------------------ | ------------------------------------------------------ |
| einschalten                          | `light.on`               | `true` (Шалтер ан)                                     |
| ausschalten                          | `light.on`               | `false` (Schalter aus) – oder `light.brightness` ауф `0` |
| heller oder dunkler                  | `light.brightness`       | `1` бис `100` (Процент)                                 |
| теплый белый свет                    | `light.colorTemperature` | `2700`                                                 |
| нейтрально-белый свет                | `light.colorTemperature` | `4500`                                                 |
| kaltweißes Licht                     | `light.colorTemperature` | `6500`                                                 |
| цвет                                 | `light.color`            | `#0000ff` (синий) – одер `light.hue` mit einer Gradzahl |
| eine blassere Farbe                  | `light.saturation`       | `0` (weiß) bis `100` (kräftig)                          |
| ein Farbprogramm starten             | `light.scene`            | `1` бис `9` (M1–M9 в приложении)                        |
| Farbprogramm schneller               | `light.speedUp`          | Knopf drücken                                          |
| Farbprogramm langsamer               | `light.speedDown`        | Knopf drücken                                          |
| zurück zu weißem Licht               | `light.mode`             | `white`                                                |
| zurück zur letzten Farbe             | `light.mode`             | `colour`                                               |
| autotisch nach einer Zeit umschalten | `light.countdown`        | Секунден, з. Б. `3600` für eine Stunde                  |

### 9.3 Фарбен

Farben stellen Sie am einfachsten über `light.color` формат `#RRGGBB` ein oder über `light.hue` als Winkel auf dem Farbkreis:

| Фарбе    | `light.hue` | `light.color` |
| -------- | ----------- | ------------- |
| Гниль    | `0`         | `#ff0000`     |
| Апельсин | `30`        | `#ff8000`     |
| Гельб    | `60`        | `#ffff00`     |
| Грюн     | `120`       | `#00ff00`     |
| Турецкий | `180`       | `#00ffff`     |
| Блау     | `240`       | `#0000ff`     |
| Вайолетт | `270`       | `#8000ff`     |
| Розовый  | `300`       | `#ff00ff`     |

Die **Helligkeit** stellen Sie immer getrennt mit `light.brightness` ein. Ein dunkler RGB-Wert wie `#800000` ergift deshalb **kräftiges Rot in der aktuellen Helligkeit** – nicht ein dunkles Rot.

### 9.4 Автоматическое управление адаптером

- **Einschalten bei Bedarf:** Stellen Sie Helligkeit, Farbe, Weißton или Ein Programme in, Während das Licht aus ist, Schaltet der Adaptor es zuerst ein – genau wie die App.
- **Moduswechsel:** Eine Farbtemperatur Shaltet autotisch auf Weißes Licht, eine Farbe auf Farblicht.
- **Шибереглер:** Ändern Sie einen Wert sehr schnellhintereinander (etwa mit einem Schieberegler), sendet der Adaptor nur den letzten Wert.
- **Лучшее:** сначала нажмите «Jeder Befehl gilt als ausgeführt», когда Gateway den neuen Zustand meldet (на протяжении 2,5 секунд). Bleibt die Meldung aus, fragt der Adaptor nach und schreibt eine Warnung in Protokoll (Kapitel 13).
- **Сообщение с приложением:** было ли оно в приложении MiBoxer, а также в ioBroker. Фрагмент адаптера для повторного включения (Einstellung _Intervall für die Statusabfrage_ ).

### 9.5 DMX-Startadresse

WL-433 предназначен для **DMX512** – стандарта, с подсветкой и эффектами управления. Сначала **начальный адрес** будет включать шлюз для DMX-каналов: Rot, Grün, Blau, Kaltweiß и Warmweiß. Когда вы войдете в DMX-Lichtpult anschließen, это будет сделано позже. Приложение MiBoxer указывает адрес в пункте **DMX** (от 1 до 512). Адаптер сейчас находится в Datenpunkt `settings.dmxAddress` und kann sie auch ändern:

1. Открыть Sie im Reiter **Objekte** den Ordner **miboxer-wl433 → 0 → settings** .
2. Нажмите на ссылку, чтобы увидеть адрес **dmxAddress** , нажмите на ссылку, чтобы перейти на другую страницу. `1` бис `512` ein und drücken Sie Enter.
3. Этот шлюз лучше всего подходит для нового внутреннего адреса в течение нескольких секунд. Bleibt die Bestätigung aus, steht eine Warnung im Protokoll (Главная 13).

Позолоченный адрес – где находится приложение – для выбранной зоны: bei der Variante _Zonenwahl_ für die Zone aus `light.zone`, на _Эйн-Канале есть зона_ для всех зон.

> \[!NOTE] Если вы войдете в DMX-Lichtpult, вы должны указать адрес, который необходимо пройти. Ob je Zone ein eigener Kanalblock позолочен, beschreibt der Hersteller nicht. Этот шлюз объединяется с вашим адресом и позволяет получить адрес (das untere Byte). Ваш адрес составляет более 255 раз, когда адаптер будет отключен, если вы начнете его фальсифицировать и получить доступ к адресу, указанному в приложении или в адаптере.

## 10. Зонен

Шлюз может быть от **8 зон** до 8 (зона от 1 до 8) или во всех помещениях («ВСЕ»). Welche Leuchte zu welcher Zone gehört, haben Sie in Kapitel 4 in der App festgelegt.

> \[!ВАЖНО] Этот шлюз должен быть **доступен для всех Leuchten** – для того, чтобы получить доступ к любой зоне. Стеллен Зи Зона 1 на гниении и данах Зона 2 на Синем, время `light.*` «Blau», obwohl die Leuchten в зоне 1 weiter rot leuchten. Das ist eine Eigenschaft des Gateways: Auch die MiBoxer-App zeigt keinen Unterschied zwischen den Zonen.

### 10.1 Вариант «Zonenwahl» (стандартный)

Mit dem Datenpunkt `light.zone` legen Sie fest, wohin die Befehle фон `light.*` геен:

| `light.zone` | Befehle gehen an |
| ------------ | ---------------- |
| `0`          | все зоны         |
| `1` бис `8`    | ну дисе Зона     |

**Beispiel – nur die Leuchten в зоне 2 sollen blau leuchten:**

1. `light.zone` ауф `2` stellen.
2. `light.color` ауф `#0000ff` stellen.
3. Данах `light.zone` wieder auf `0` stellen, damit spätere Befehle wieder alle Zonen gehen.

> \[!КОНЧИК]`light.zone` bleibt eingestellt, bis Sie es ändern – auch nach einem Neustart. Stellen Sie es nach gezielten Befehlen an eine Zone am besten wieder auf `0`.

### 10.2 Вариант «Зона канала»

Hier gibt es zusätzlich den Ordner `zones` mit je einem Unterordner `zone1` бис `zone8`. Jeder шляпа дизельбен Datenpunkte wie `light` (on, brightness, colorTemperature, color, hue, saturation, mode, scene, speedUp, speedDown). `light.*` Отправьтесь в этот вариант погружения во **все** зоны.

**Beispiel – nur Zone 2 blau:** `zones.zone2.color` ауф `#0000ff` stellen. Fertig.

![Зона канала 2: nur die bestätigten Werte sind gefüllt](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-zones-de.png)

> \[!NOTE] Зональный канал должен быть **установлен в этой зоне и лучше всего отправлен через шлюз** . Felder bleiben leer, bis Sie etwas die Zone geschickt haben. Я написал зону 2 с надписью «Ein» и «Helligkeit 40 %». Эйн Бефель убер `light.*` (все зоны) trägt seinen Wert in allen acht Zonenkanälen ein.

## 11. Zeitschaltungen (Таймер)

Адаптер может быть использован для установки оборудования для бассейна – во время праздников или прохода мимо зон. Если таймер установлен на **50 раз** , вы можете включить его в режиме мгновенного программирования. Таймер доступен в ioBroker у вас дома и функционирует также при подключении к Интернету.

### 11.1 Таймер адаптеров или таймер приложения?

Также есть MiBoxer-App с таймером. Beide Arten arbeiten unabhängig voneinander:

|                                               | Таймер адаптеров                                                                                             | Таймер приложения MiBoxer    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| Wo sie gespeichert sind und laufen            | в ioBroker, в Инен цу Хаузе                                                                                  | в облаке Tuya в Интернете    |
| Без интернета                                 | функционировать                                                                                              | funktionieren nicht          |
| Auslöser                                      | feste Uhrzeit oder Sonnenereignis (z. B. Sonnenuntergang), драгоценности с Verschiebung in Minuten           | feste Uhrzeit                |
| Zufällige Abweichung (Anwesenheitssimulation) | джа                                                                                                          | нет                          |
| Таге                                          | Wochontage und Saison (от 1 мая до 30 сентября)                                                              | Выходные                     |
| Зонен                                         | все зоны или лучшие зоны                                                                                     | все зоны                     |
| Акции                                         | Einschalten, Ausschalten, Weißlicht, Farbe, Farbprogramm, Helligkeit und nach einer Dauer wieder ausschalten | Einschalten oder Ausschalten |

Die Angaben zu den App-Timern stammen aus einem Test mit der App am 22.09.2026.

> \[!NOTE] Адаптер может включать таймер приложения, который может быть активирован только сейчас. Если вы используете App-Timer в Leuchten, выберите адаптер, который будет работать более комфортно и актуально. `light.*`. Sie können beide Arten gleichzeitig verwenden – achten Sie nur darauf, dass sie sich nichtwidesprechen (zum Beispiel App-Timer «20:00 Uhr ein» и адаптер-таймер «19:55 Uhr aus»).

### 11.2 Информация: Standort für Sonnenereignisse

Dieser Schritt ist nur nötig, wenn ein Timer einem Sonnenereignis folgen soll (Sonnenaufgang, Sonnenuntergang, Dämmerung…). Адаптер будет использоваться при установке стандартного ioBroker-Installation. Meist ist er schon eingetragen. Итак, prüfen Sie es:

1. Нажмите кнопку «Ссылки администратора ioBroker» для доступа к **системе** . Das Fenster **Basiseinstellungen** öffnet sich.
2. Im Reiter **System** stehen rechts unter der Karte **Breitengrad** und **Längengrad** (rot markiert). Passen die Zahlen ungefähr zu Ihrem Wohnort, это все в Орднунге.
3. Sonst tragen Sie die Werte ein. Sie finden sie zum Beispiel, indem Sie Ihren Ort in einem Kartendienst suchen. Байшпиль Берлин: Брайтенград `52.52` Ленгенград `13.40`. Verwenden Sie einen **Punkt** als Dezimaltrennzeichen.
4. Нажмите «Sie auf **Speichern und Schließen»** .
5. Starten Sie die Instanz **miboxer-wl433.0** neu (ссылки **Instanzen** , в der Zeile auf das Symbol mit dem kreisförmigen Pfeil clicken). Прежде всего, необходимо использовать адаптер нового стандарта.

![Standort in den Basiseinstellungen (Карта: © OpenStreetMap-Mitwirkende)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-system-position-de.png)

> \[!NOTE] В стандартном режиме игнорируйте таймер адаптера с датчиком и предупреждением в протоколе. Таймер с задержкой Uhrzeit brauchen keinen Standort.

### 11.3 Открытый таймер – Schritt für Schritt

1. Щелкните ссылку на **Instanzen** und in der Zeile **miboxer-wl433.0** на **Schraubenschlüssel-Symbol** (например, в Главе 7).
2. Нажмите на кнопку Reiter **Timer** .
3. Klicken Sie auf das **+** (Плюс, rot markiert). Ein neuer Eintrag erscheint und ist gleich aufgeklappt. Это так важно, начиная с 20:00 Uhr alle Zonen einschaltet:

![Neuer Timer mit seinen Startwerten](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-new-de.png)

4. Tragen Sie bei **Name** eine kurze Bezeichnung ein, zum Beispiel `Pool abends`. Der Name erscheint в der Kopfzeile des Eintrags und im Protokoll.
5. Wählen Sie den **Auslöser** : _Uhrzeit_ oder ein Sonnenereignis (Таблица в 11.4). Нажмите кнопку _Uhrzeit_ , чтобы увидеть символ Uhr в поле **Uhrzeit** und Wählen die Zeit aus.
6. Wählen Sie die **Wochentage** : Нажмите кнопку Sie auf das Feld, чтобы открыть этот список. Ein Klick auf einen Tag будет на другом языке. Ein Klick не может быть включен в Liste schließt sie wieder.
7. Легендарная **зона** и **фестиваль действий** . Je nach Aktion erscheinen weitere Felder: **Farbtemperatur** bei _Weißlicht_ , **Farbe** bei _Farbe_ , **Szene** bei _Szene_ .
8. Нажмите кнопку Sie unten auf **Speichern und schließen** . Die Instant startet neu und plant den Timer ein.
9. **Контроль:** Im Reiter **Objekte** zeigt der Datenpunkt `miboxer-wl433.0.timers.nextRun`, если хотите, выберите таймер (11.7).

> \[!TIP] Легендарный таймер с копируемым символом (11.6) – dann müssen Sie nur noch die Unterschiede ändern.

### 11.4 Die Felder im Einzelnen

| Поле                      | Bedeutung                                                                                                                                                          | Пример                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| **Актив**                 | Чтобы отключить таймер, не включайте его в работу                                                                                                                  | Haken gesetzt                                         |
| **Имя**                   | Frei wählbare Bezeichnung                                                                                                                                          | `Pool abends`                                         |
| **Auslöser**              | _Uhrzeit_ oder ein Sonnenereignis (Tabelle unten)                                                                                                                  | _Sonnenuntergang_                                     |
| **Урцайт**                | Nur beim Auslöser _Uhrzeit_ : хотите, чтобы таймер был выбран                                                                                                      | `21:30`                                               |
| **Verschiebung**          | So viele Minuten früher (отрицательный Zahl) или später (положительный Zahl) als der Auslöser, от −720 до 720                                                      | `-15` = 15 минут для Sonnenuntergang                  |
| **Zufällige Abweichung**  | Таймер может быть выбран только в течение следующих минут или минут (от 0 до 120). Так что это еще не все, также как и в доме                                      | `10` = zwischen 10 Minuten früher и 10 Minuten später |
| **Выходные**              | Общее описание таймера                                                                                                                                             | Понедельник – Пятница                                 |
| **Сезон фон / Сезон бис** | Нур в diesem Zeitraum des Jahres, в формате `TT.MM.`. Eine Saison über den Jahreswechsel ist möglich (`01.11.` бис `28.02.`). Бейде Фельдер leer = ganzjährig      | `01.05.` бис `30.09.`                                  |
| **Зона**                  | _Все зоны_ или зоны от 1 до 8                                                                                                                                      | _Все зоны_                                            |
| **Акция**                 | Was passiert (Tabelle unten)                                                                                                                                       | _Белый свет_                                          |
| **Фарбтемпература**       | Нур бей _Вайслихт_ : 2700 К (теплый) до 6500 К (калт).                                                                                                             | `3000`                                                |
| **Фарбе**                 | Нур бей Фарбе : Farbe aus der _Farbauswahl_                                                                                                                        | Блау                                                  |
| **Сцена**                 | Нур бей _Сене_ : Фарбпрограмма М1 бис М9                                                                                                                           | М3                                                    |
| **Хеллигкейт**            | 1 до 100 %. Leer lassen = die Helligkeit bleibt, wie sie ist. _Нихт-бай-Аусшалтен_                                                                                 | `60`                                                  |
| **Ausschalten nach**      | Затем вы увидите, что минуты будут отключены от таймера Leuchten seiner Zone Wieder aus (0 = nicht ausschalten, höchstens 1440 = 24 Stunden). _Нихт-бай-Аусшалтен_ | `120`                                                 |

**Die Sonnenereignisse:**

| Auslöser                  | Ванн                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| _Morgendämmerung_         | Es wird hell: Beginn der bürgerlichen Morgendämmerung (Sonne 6° unter dem Horizont)         |
| _Зонненауфганг_           | Die Sonne erscheint am Horizont                                                             |
| _Goldene Stunde (abends)_ | Начало «золотого ствола», etwa eine Stunde vor Sonnenuntergang (Sonne 6° über dem Horizont) |
| _Sonnenuntergang_         | Die Sonne verschwindet намекает на горизонт                                                 |
| _Abenddämmerung_          | Es ist fast dunkel: Ende der bürgerlichen Abenddämmerung (Sonne 6° unter dem Horizont)      |
| _Ночь_                    | Es ist völlig dunkel: Начало астрономической ночи (Sonne 18° unter dem Horizont)            |

Beispiel Berlin am 21. Июнь: Morgendämmerung 03:52, Sonnenaufgang 04:43, Goldene Stunde 20:37, Sonnenuntergang 21:33, Abenddämmerung 22:23 Uhr. 21 декабря. Зонненауфганг 08:14, Зонненунтерганг 15:53.

> \[!ВАЖНО] В Германии wird es von etwa Mitte Mai bis Ende Juli nie ganz dunkel – die _Nacht_ findet dann nicht statt, und ein Timer mit diesem Auslöser schaltet an diesen Tagen nicht. Nehmen Sie für den Sommer besser _Abenddämmerung_ mit einer Verschiebung.

**Die Aktionen:**

| Акция           | Was passiert                                                                  |
| --------------- | ----------------------------------------------------------------------------- |
| _Einschalten_   | Schaltet die Leuchten mit den zuletzt eingestellten Werten ein                |
| _Ausschalten_   | Schaltet die Leuchten aus                                                     |
| _Белый свет_    | Weißes Licht mit der Gewählten Farbtemperatur                                 |
| _Фарбе_         | Die gewählte Farbe                                                            |
| _Сцена_         | Начало основной программы M1 до M9                                            |
| _Ну Хеллигкеит_ | Ändert nur die Helligkeit – dafür muss im Feld **Helligkeit** ein Wert stehen |

Sind die Leuchten aus, schalten _Weißlicht_ , _Farbe_ , _Szene_ und _Nur Helligkeit_ sie zuerst ein – genau wie die App.

### 11.5 Примеры

**Beispiel 1 – im Sommer jeden Abend Warmweißes Licht**

| Поле     | Верт                                                       |
| -------- | ---------------------------------------------------------- |
| Имя      | `Pool abends`                                              |
| Auslöser | _Зонненунтерганг_ , Вершибунг `-15`                         |
| Выходные | алле                                                       |
| Сезон    | `01.05.` бис `30.09.`                                       |
| Зона     | _Все зоны_                                                 |
| Акция    | _Белый свет_ , цветовая температура `3000`, Хеллигкейт `60` |

Условия: до сентября адаптер должен быть отключен в течение 15 минут для обогрева помещения с 60 % температуры.

![Пример: «Pool abends»](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-de.png)

**Часть 2 – Farbprogramm am Wochenende für zwei Stunden**

| Поле     | Верт                              |
| -------- | --------------------------------- |
| Имя      | `Party Freitag`                   |
| Auslöser | _Урцайт_ `21:30`                   |
| Выходные | Пт, Сб                            |
| Зона     | _Зона 2_                          |
| Акция    | _Szene_ M3, Ausschalten nach `120` |

Время: Freitags und samstags в 21:30 Начало работы в зоне 2 программы Farbprogramm M3. 23:30 Uhr schaltet der Adaptor Zone 2 Wieder aus.

![Пример „Party Freitag“](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-scene-de.png)

**Beispiel 3 – nachts ausschalten wie von Hand**

| Поле     | Верт                                       |
| -------- | ------------------------------------------ |
| Имя      | `Nachts aus`                               |
| Auslöser | _Урцайт_ `23:30`, zufällige Abweichung `10` |
| Выходные | алле                                       |
| Зона     | _Все зоны_                                 |
| Акция    | _Ausschalten_                              |

Время: Jede Nacht gehen alle Leuchten zwischen 23:20 и 23:40 Uhr aus – jeden Tag zu einer etwas anderen Zeit.

> \[!TIP] Действие 3 - это auch eine gute Absicherung: Автоматическое «Ausschalten nach» из режима Beispiel 2, которое будет выполнено, когда умрет Instanz в der Zwischenzeit neu startet (11.8). Ein eigener Timer zum Ausschalten schaltet trotzdem.

### 11.6 Таймер включения, копирования, разгрузки и выключения

- **Ändern:** Klicken Sie auf die Kopfzeile eines Eintrags (den Namen), um ihn aufoder zuzuklappen, und ändern Sie die Felder.
- In der grauen Leiste unten in jedem aufgeklappten Eintrag finden Sie diese Symbole:

| Символ                       | Виркунг                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Pfeil nach oben / nach unten | Eintrag in der Liste nach oben oder unten verschieben. Die Reihenfolge bestimmt nummer des Timers im Protokoll |
| Папьеркорб                   | Eintrag löschen                                                                                                |
| Zwei Blätter                 | Eintrag kopieren – Практика для обычного таймера                                                               |

- **Nach jer Änderung** clicken Sie auf **Speichern und schließen** . Erst dann gelten die Änderungen. Mit **Schließen** ohne Speichern verwerfen Sie sie.
- Die Einstellungsseite lässt höchstens **50 Timer** zu.
- Über der Liste gibt es Symbole, um alle Timer in eine Datei zu sichern ( **Konfigurationsabschnitt Exportieren** ) и sie aus einer Datei zu laden ( **… importieren und ersetzen** bzw. **… importieren und hinzufügen** ). Итак, вы знаете, как использовать таймер, или в другом мгновенном режиме. **(унгепруфт)**

### 11.7 Таймер при быстром нажатии останавливается и останавливается

Im Reiter **Objekte** finden Sie unter **miboxer-wl433 → 0 → таймеры с** этими датами:

![Даты настроек и таймеров (hier noch ohne eingerichtete Timer)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-timers-de.png)

| Пункт данных      | Bedeutung                                                                                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timers.active`   | Schalter für **alle** Timer: `false` pausiert sie (zum Beispiel im Urlaub oder im Winter), `true` Lässt sie Wieder Laufen. Während der Pausefallde Termine werden übersprungen, nicht nachgeholt |
| `timers.nextRun`  | Der nächste Lauf mit Name, zum Beispiel `Tue 2026-09-22 19:05:00 · Pool abends`. Während der Pause steht davor `paused`                                                                        |
| `timers.lastRun`  | Der letzte Lauf с именем и действием                                                                                                                                                           |
| `timers.overview` | Список всех таймеров с Zeitplan, Aktion, nächstem Lauf und – падает на Timer ignoriert wird – dem Grund (`error`)                                                                             |

Die Texte dieser Datenpunkte на английском языке: `Mon` бис `Sun` sind die Wochentage Montag bis Sonntag, `daily` bedeutet täglich.

> \[!КОНЧИК]`timers.active` lässt sich auch aus Skripten, Visualisierungen или Sprachassistenten Schalten – Beispiel в Главе 12.1.

### 11.8 Gut zu wissen

- **Uhrzeit:** Es gilt die Uhrzeit des ioBroker-Rechners. Летнее и зимнее время было berücksichtigt.
- **Шлюз не работает: Ist das Gateway zum Zeitpunkt eines Timers nicht erreichbar** , entfällt dieser Lauf. Адаптер должен быть предупрежден в протоколе и не блокировать его.
- **Новый запуск:** Nach jedem Speichern der Einstellungen startet die Instantz neu und set alle Timer neu. Ein laufendes «Ausschalten nach» geht dabei verloren.
- **Wochentage und Verschiebung:** Wochentage und Saison beziehen sich auf den Tag des Auslösers. Ein Timer «Uhrzeit 00:30, Verschiebung −60, nur Samstag» schaltet deshalb am Freitag um 23:30 Uhr.
- **Зоны:** в зависимости от _зоны_ вы можете отправить таймер в собственную зону, где бы вы ни находились. `light.zone` zu verändern. Bei _Ein Kanal je Zone_ является актуальной зоной канала (`zones.zone1` бис `zones.zone8`).
- **Рекомендации:** Используйте Timer-Befehl, чтобы узнать, как и когда лучше всего использовать Gateway (Глава 9.4).

### 11.9 Если таймер не работает

Gehen Sie diese Punkte der Reihe nach durch:

1. Является ли таймер der Haken **Aktiv** gsetzt, und haben Sie **Speichern und schließen** geklickt?
2. Штехт `timers.active` ауф `true` ?
3. Steht der Timer in `timers.overview` мит еинем `error` ? Dann nennt der Eintrag den Grund (английский):

| Грунд                                              | Bedeutung                                                 | Абхилфе                                                |
| -------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| `no valid time set`                                | Keine Uhrzeit eingetragen                                 | Uhrzeit wählen                                         |
| `no weekday selected`                              | Kein Wochentag gewählt                                    | Mindestens einen Tag wählen                            |
| `season needs "from" and "to" as DD.MM.`           | Nur eines der Saisonfelder ausgefüllt или falsches Format | Оба поля в формате `TT.MM.` ausfüllen oder beide leeren |
| `action white needs a colour temperature`          | _Weißlicht_ ohne Farbtemperatur                           | Farbtemperatur eintragen                               |
| `action colour needs a colour like #0000ff`        | _Farbe_ ohne gültige Farbe                                | Farbe wählen                                           |
| `action scene needs a scene 1 to 9`                | _Szene_ ohne Szene                                        | Szene wählen                                           |
| `action brightness needs a brightness`             | _Нур Хеллигкейт_ без Хеллигкейта                          | Helligkeit eintragen                                   |
| `uses the sun event "…", but no position is set …` | Für das Sonnenereignis fehlt der Standort                 | Standort eintragen (11.2)                              |

4. Что на таймере не работает? Будь им `nextRun` ауф `null`, passen Wochentage, Saison und Auslöser nie zusammen (zum Beispiel _Nacht_ nur im Juni).
5. War das Gateway zum geplanten Zeitpunkt verbunden? Я знаю протокол `[timer] … could not switch the lights …`.
6. Stellen Sie die Protokollstufe auf `debug` (Капитель 13.1). Адаптер должен быть установлен с помощью адаптера `[timer]` Для этого таймера вы хотите, чтобы ваш таймер был маленьким и теплым.

## 12. Действия по автоматизации

> \[!TIP] Für Zeitschaltungen brauchen Sie kein Skript: Die Timer aus Kapitel 11 erledigen das einfacher. Сохраните сценарий, когда «Beleuchtung auf Andere Dinge reagieren soll» – «Zum Beispiel auf einen Bewegungsmelder» или «Poolabdeckung».

### 12.1 Скриптен (JavaScript-адаптер)

Установите адаптер **JavaScript/Blockly** (Reiter **Adaptor** , Muche `javascript`). Легенды о новых **сценариях** JavaScript и их следующих функциях:

```javascript
// Bei Sonnenuntergang: Poolbeleuchtung blau mit 60 % Helligkeit einschalten
schedule({ astro: "sunset" }, async () => {
    await setStateAsync("miboxer-wl433.0.light.color", "#0000ff");
    await setStateAsync("miboxer-wl433.0.light.brightness", 60);
});

// Um 23:00 Uhr ausschalten
schedule("0 23 * * *", async () => {
    await setStateAsync("miboxer-wl433.0.light.on", false);
});
```

**Nur eine Zone schalten – Вариант «Zonenwahl»:**

```javascript
// Zone 2 auf Farbprogramm M3, danach wieder alle Zonen ansprechen
await setStateAsync("miboxer-wl433.0.light.zone", 2);
await setStateAsync("miboxer-wl433.0.light.scene", 3);
await setStateAsync("miboxer-wl433.0.light.zone", 0);
```

**Nur eine Zone schalten – Вариант «Ein Kanal je Zone»:**

```javascript
await setStateAsync("miboxer-wl433.0.zones.zone2.scene", 3);
```

**Во время остановки таймера необходимо выполнить установку Poolabdeckung** (den Datenpunkt der Abdeckung passen Sie an Ihre Installation and):

```javascript
on({ id: "0_userdata.0.poolAbdeckungGeschlossen", change: "ne" }, obj => {
    setState("miboxer-wl433.0.timers.active", !obj.state.val);
});
```

### 12.2 С блоками (без программирования)

Blockly — это адаптер **JavaScript/Blockly,** который нравится. Sie setzen dabei Bausteine zusammen: **(ungeprüft)**

1. Unter **Skripte** ein neues **Blockly -** Новый сценарий.
2. Aus der Gruppe **Zeitplan** einen Auslöser wählen, zum Beispiel **Astro** mit _Sonnenuntergang_ .
3. Aus der Gruppe **System** den Baustein **steuere** hineinziehen, die Object-ID `miboxer-wl433.0.light.color` auswählen und als Wert `#0000ff` эйнтраген.
4. Speichern und das Script starten.

### 12.3 Визуализация и обучение

Die Datenpunkte haben die в ioBroker üblichen «Rollen» (zum Beispiel _Schalter Licht_ , _Dimmer_ , _Farbe RGB_ , _Farbtemperatur_ ). Визуализация и адаптер для использования в бассейне автоматически удаляются с включенной лампой. **(унгепруфт)**

## 13. Фелерсухе

### 13.1 Ausführliches Protokoll einshalten

Чтобы получить описание адаптера, необходимо использовать протокол:

1. Öffnen Sie die Einstellungen der Instanz (Kapitel 7, Schraubenschlüssel).
2. Oben neben dem Namen steht die **Protokollstufe** (zum Beispiel `info`). Нажмите кнопку «Нажмите на кнопку **«Стифт»** для получения и возврата денег»`debug`.
3. Den Stift нашел Sie auch im Bild в Kapitel 7 oben rechts neben _v0.2.0_ .

Das Protokoll sehen Sie ссылается на **Protokoll** . Tippen Sie oben в фильтрфельде `miboxer`, um nur die Meldungen dieses Adaptors zu sehen. Jede Meldung начал с einer Kennung в eckigen Klammern, zum Beispiel `[conn]` für die Verbindung oder `[cmd]` für Befehle.

> \[!TIP] Stellen Sie die Stufe nach der Fehlersuche wieder auf `info`. Die Stufe `debug` erzeugt sehr viele Zeilen.

### 13.2 Meldungen und Was Sie tun können

| Meldung im Protokoll (Anfang)                                                       | Bedeutung                                                                                   | Was Sie tun können                                                                                                                                                 |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[cfg] Adapter is not configured: please enter the device ID and the local key …`   | Получить идентификатор или локальный ключ                                                   | Глава 7: Beide Felder ausfüllen                                                                                                                                    |
| `[cfg] The local key must have exactly 16 characters …`                             | Местный ключ — это то, что вам нужно, или то, что вам нужно.                                | Schlüssel genau abschreiben (16 Zeichen, keine Leerzeichen)                                                                                                        |
| `[conn] Cannot keep a connection to the WL-433 gateway …`                           | Шлюз не используется адаптером                                                              | IP-адрес, локальный ключ и версия протокола; MiBoxer-App для всех Handys Schließen; дополнительная интеграция (ioBroker.tuya, Home Assistant) для отключения шлюза |
| `[rx] Gateway sent data that could not be decoded …`                                | Der Local Key ist falsch oder veraltet (Gateway neu gekoppelt)                              | Kapitel 5 wiederholen und den neuen Local Key eintragen                                                                                                            |
| `[disc] Gateway … did not announce itself in the local network …`                   | Автоматическое соединение шлюзов недоступно                                                 | IP-адрес доступного и доступного маршрутизатора; Шлюз и ioBroker доступны в Интернете                                                                              |
| `[cmd] #12 light.brightness: the gateway did not confirm …`                         | Das Gateway Hat nach einem Befehl keinen Passenden Zustand Gemeldet                         | Является ли шлюз единым и включенным в WLAN? В приложении App это очень удобно. Замечание es öfter auf: Решение проблемы (13.4)                                    |
| `[poll] … Status query not answered …`                                              | Ответ на сообщение Das Gateway nicht auf die Zustandsabfrage                                | Prüfen, ob es wirklich ein WL-433 ist; Решение задачи (13.4)                                                                                                       |
| `[cmd] … not executed: a colour like "#ff8800" is expected`                         | Der eingegebene Wert Hat das Falsche Format                                                 | Цвет в формате `#RRGGBB` eingeben                                                                                                                                   |
| `[cmd] … not executed: gateway is not connected`                                    | Der Befehl kam, während keine Verbindung bestand                                            | Warten, bis `info.connection` ведер `true` это и ден Befehl Wiederholen                                                                                              |
| `[dp101] Status frame … has an unknown mode …`                                      | Das Gateway meldet einen unbekannten Zustand                                                | Problem melden (13.4)                                                                                                                                              |
| `[cfg] light.mode is created again without the mode "music" …`                      | Обновление Einmalige Umstellung beim от версии 0.0.1                                        | Nichts – eigene Einstellungen dieses Datenpunkts (z. B. Verlauf) ggf. новый режим                                                                                  |
| `[cfg] Zone mode "…": removed …`                                                    | Nach einer Änderung der Zonensteuerung wurden die Datenpunkte der anderen Variante gelöscht | Нихтс – ггф. Скрипт анпассена                                                                                                                                      |
| `[timer] Timer 3 "…" is ignored: …`                                                 | Таймер не работает автоматически; намек на двойные пункты der Grund                         | Timer im Reiter Исправление **таймера** (11.9)                                                                                                                     |
| `[timer] Timer … uses the sun event "…", but no position is set …`                  | Für Sonnenereignisse fehlt der Standort                                                     | Standort eintragen und Instanz neu starten (11.2)                                                                                                                  |
| `[timer] Timer … has no run within the next year …`                                 | Wochentage, Saison und Auslöser passen nie zusammen                                         | Wochentage, Saison und Auslöser prüfen (11,9)                                                                                                                      |
| `[timer] #… Timer … could not switch the lights: gateway is not connected`          | Zum Zeitpunkt des Timers war das Gateway nicht verbunden; Дисер Лауф entfällt               | Verbindung prüfen (Капитель 8)                                                                                                                                     |
| `[timer] … timers configured, only the first 50 are used …`                         | Это больше, чем 50 таймеров (для импорта)                                                   | Überzählige Timer löschen                                                                                                                                          |
| `[cmd] #… settings.dmxAddress: the gateway did not confirm the DMX start address …` | Новый DMX-Startadresse больше не используется для Das Gateway                               | Verbindung prüfen und den Wert erneut schreiben (9,5)                                                                                                              |

### 13.3 Häufige Fragen

**Alle Zonen Zeigen Dieselbe Farbe, obwohl die Leuchten verschieden leuchten.** Это так: Das Gateway meldet nur einen Zustand für alle Leuchten (Глава 10).

**Ein Wert Springt nach dem Ändern kurz zurück order wird erst nach 2 bis 3 Sekunden übernommen.** Для этого шлюза потребуется 2,5 секунды, чтобы пройти через 2,5 секунды. Прежде всего, необходимо использовать адаптер в конце концов.

**Nach dem erneuten Koppeln des Gateways в функциональном приложении больше не работает.** Der Local Key имеет значение. Lesen Sie ihn neu aus (Kapitel 5) und tragen Sie ihn ein (Kapitel 7).

**IP-адрес шлюза указан здесь.** Укажите **IP-адрес шлюза** , если он указан в адаптере шлюза. Лучше всего: резервирование DHCP на маршрутизаторе (Глава 3).

**Die Geschwindigkeit des Farbprogramms wird nirgends angezeigt.** Этот шлюз больше не работает. `speedUp` унд `speedDown` wirken trotzdem.

**Если адаптер не используется, он может быть отключен.** Адаптер, кроме шлюза, не работает. Вы можете использовать Leuchte mit Einer Zone verknüpft ist und obsie in der App reagiert. Leuchten im Wasser haben eine kürzere Funkreichweite.

**Я пользуюсь таймером приложения MiBoxer. Что такое адаптер, его нет?** Таймер приложения находится в Tuya-Cloud, но не на шлюзе. Адаптер может не использоваться, если он не работает (Главная 11.1).

**Эйн Таймер не работает.** Gehen Sie die Liste в Kapitel 11.9 durch.

**Мой таймер поможет вам использовать другие часы.** Das ist richtig, wenn er einem Sonnenereignis folgt – das verschiebt sich im Lauf des Jahres – или wenn eine zufällige Abweichung eingestellt ist.

**Wie pausiere ich alle Timer, zum Beispiel im Urlaub?** Сетцен Си `timers.active` ауф `false`. Мит `true` laufen sie wieder (Капитель 11.7).

### 13.4 Ein Problem melden

Открыть «Проблему» на GitHub: <https://github.com/ssbingo/ioBroker.miboxer-wl433/issues> . Хильфрейх Синд:

1. die Adaptor-Version (находится в мгновенном доступе, z.B. _v0.2.0_ );
2. ein Protokoll в **отладке** Stufe – vom Start der Instanz bis zum Fehler (13.1);
3. der Inhalt des Datenpunkts `dp101.history` (im Objekte-Reiter unter `miboxer-wl433.0.dp101` anklicken und kopieren);
4. eine kurze Beschreibung, было Sie getan haben и passiert ist.

> \[!NOTE] Адаптер не поддерживает локальный ключ, **не** входящий в протокол – протокол должен быть доступен только на одном языке. Sie können das Protokoll также bedenkenlos anhängen. **Используйте** приложение MiBoxer App (Глава 5), чтобы включить его в Шлюссель.

## 14. Für Neugierige: так функционально, как в деталях

Эта глава предназначена для всех, кто хочет получить доступ к адаптеру со шлюзом. Für die Bedienung brauchen Sie es nicht.

### 14.1 Die Verbindung

WL-433 входит в состав WLAN-модуля фирмы Tuya. Адаптер связан с **протоколом Tuya-LAN 3.3** (TCP-порт 6668, включенным в локальный ключ) со шлюзом. Die eigentlichen Licht-, Zonen- und Szenenbefehle stecken im herstellerspezifischen **Datenpunkt 101** : kurze Nachrichten («Кадры») из 12 байт. Das letzte Byte ist eine Prüfsumme – die Summe der ersten 11 Bytes.

### 14.2 Die Befehle

Ein Befehl an das Gateway sieht so aus (Werte in Hexadezimalschreibweise):

```text
41 00 00 0B  cc  vv  vv vv vv  zz  80  ss
             │   │             │       └─ Prüfsumme
             │   │             └─ Zone: 00 = alle, 01–08 = Zone 1–8
             │   └─ Wert
             └─ Befehl
```

| Бефель `cc` | Bedeutung                    | Верт `vv`                                                                                                                                                                                                                          |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01`       | Farbton (schaltet auf Farbe) | 0–255 для исходных данных, записанных в байтах с 5 по 8                                                                                                                                                                            |
| `02`       | Хеллигкейт                   | 1–100 %                                                                                                                                                                                                                            |
| `03`       | Фарбтемпература              | 0–38 (2700 К + 100 К в штуфе)                                                                                                                                                                                                      |
| `04`       | Sättigung                    | 0–100 %                                                                                                                                                                                                                            |
| `05`       | Фарбпрограмма                | 1–9 (М1–М9)                                                                                                                                                                                                                        |
| `06`       | Вкус                         | `01` эйн, `02` аус, `03` лангсамер (S-), `04` schneller (S+), `06` белый свет. `05` schaltet ebenfalls aus (ein zweites Mal bleiben die Leuchten aus); Был Диезе Вкус, Андерс Махт и другие `02`, это небезопасно – адаптер не работает |

Die Abfrage `43 00 00 80 00 00 00 00 00 80 80 C3` beantwortet das Gateway mit seinem Zustand:

```text
42|44 00 00 00  mm  hh  tt  bb  ss  0B  dd  xx
                │   │   │   │   │       └─ DMX-Startadresse (unteres Byte)
                │   │   │   │   └─ Sättigung (im Weißmodus 0)
                │   │   │   └─ Helligkeit
                │   │   └─ Farbtemperatur-Stufe
                │   └─ Farbton
                └─ Modus: 00 aus, 01 Farbe, 02 Weiß, 03–0B Programm M1–M9
```

`42` meldet eine Änderung (этва 2,5 секунды на der Letzten Änderung), `44` ist die Antwort auf die Abfrage.

Die DMX-Startadresse (Kapitel 9.5) имеет следующие значения:

```text
49 00 00 0B 02  aa aa  00 00  zz  80  ss
                │             │       └─ Prüfsumme
                │             └─ Zone: 00 = alle, 01–08 = Zone 1–8
                └─ DMX-Startadresse 1–512 (oberes Byte, unteres Byte)
```

Das Gateway antwortet mit `49 00 00 0B 02 01 tt bb ss aa aa xx`: `01` = übernommen, danach Farbtemperatur-Stufe, Helligkeit, Sättigung und die Adresse.

### 14.3 Таймер приложения MiBoxer

Приложение использует таймер для Tuya-Cloud (Schnittstelle) `tuya.m.timer.group.add`, Категория `mi-light-timer`). Ein Timer besteht aus einer Uhrzeit, den Wochentagen (`loops`, zum Beispiel `0111000` = Montag bis Mittwoch, Beginnend mit Sonntag) und einem Befehl wie `{"dps":{"20":true}}`. Er schreibt также den Standard-Datenpunkt 20 (ein/aus), ohne Zone und ohne Datenpunkt 101. Zur geplanten Zeit schickt die Cloud den Befehl and das Gateway; der Adaptor sieht dann Datenpunkt 20 и etwa 2,5 Sekunden später den neuen Status. Местный таймер не будет отключен.

### 14.4 Das Protokoll selbst nachvollziehen

Формат был опубликован 22.09.2026, поэтому он был изменен – Sie können es mit derselben Methode nachprüfen или für eine neuere Gateway-Firmware erweitern:

1. **Ниже описано, как** использовать приложение для Android в главе 5.1 с компьютером и запустить его. `adb logcat -v time > befehle.txt`. Die MiBoxer-App schreibt jeden Befehl als Zeile `ayxsendData =<Hex-Werte>` ins Protokoll.
2. **Если вы хотите, чтобы приложение было активировано в течение** **50** %, обратите внимание на то, что в течение 10 секунд вы начнёте действовать.
3. **Befehle finden:** `findstr "ayxsendData" befehle.txt` (Windows) или. `grep ayxsendData befehle.txt` (Linux, macOS) список всех необходимых действий.
4. **Дополнительная информация:** Der Datenpunkt `dp101.history` адаптеры должны быть установлены в шлюзах с использованием устройства.
5. **Selbst senden:** In `dp101.hex` Входящие 11 байт – адаптер обеспечивает получение суммы и отправку кадра. Бейшпиль: `43 00 00 80 00 00 00 00 00 80 80` fragt den Zustand ab.

> \[!WARNING] Файл `befehle.txt` enthält auch den Local Key. Veröffentlichen Sie sie nicht, sondern nur die herausgesuchten `ayxsendData` -Цайлен.

Die vollständige Herleitung mit allen Belegen steht in der Protokollanalyse, Глава 3.1.8 и 3.1.9: [Miboxer\_WL-433\_PW01\_Protokollanalyse\_lokale\_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) .

## 15. Бегриффе

| Бегриф                            | Erklärung                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Адаптер**                       | Ein Zusatzprogramm für ioBroker, das ein bestimmtes Gerät orer einen Dienst anbindet                                                             |
| **Инстанц**                       | Ein laufender Adaptor mit eigenen Einstellungen, z. Б. `miboxer-wl433.0`                                                                          |
| **Датапункт / Государство**       | Ein einzelner Wert в ioBroker, z. Б. `light.brightness`. Im Reiter **Objekte** zu sehen                                                          |
| **Bestätigt (ack)**               | Der Wert Wurde vom Gerät Gemeldet или Bestätigt – nicht nur eingegeben                                                                           |
| **Врата**                         | Das Gerät WL-433, das zwischen WLAN и Funk vermittelt                                                                                            |
| **Зона**                          | Eine Gruppe von Leuchten, die Gemeinsam Geschaltet Wird (1-8)                                                                                    |
| **Сцена / Программа для цветных** | Программа M1–M9 с приложением Wechselnden Farben                                                                                                 |
| **Geräte-ID**                     | Die eindeutige Kennung des Gateways в Туе                                                                                                        |
| **Локальный ключ**                | Der geheime 16-звездный шлюз для Verschlüsselte Verbindung im Heimnetz                                                                           |
| **Туя**                           | Hersteller des WLAN-Moduls im Gateway und der zugehörigen Cloud                                                                                  |
| **LoRa**                          | Die Funktechnik, mit der das Gateway die Leuchten erreicht (433 МГц)                                                                             |
| **Протокол / Журнал**             | Эйн Тагебух, в das ein Programm schreibt, был es tut                                                                                             |
| **адб**                           | Работа с Google, с компьютером на Android-Gerät zugreifen kann                                                                                   |
| **DHCP-резервирование**           | Eine Einstellung im Router, die einem Gerät immer be IP-addresse gibt                                                                            |
| **Таймер**                        | Eine Zeitschaltung: schaltet die Leuchten zu einer bestimmten Zeit                                                                               |
| **Sonnenereignis**                | Ein Zeitpunkt, der vom Sonnenstand abhängt, zum Beispiel Sonnenuntergang. Er verschiebt sich im Lauf des Jahres                                  |
| **Dämmerung**                     | Die Zeit zwischen Tag und Nacht, in der es noch (покидает) или schon (morgens) это был ад                                                        |
| **Сезон**                         | Ein Zeitraum im Jahr, zum Beispiel 1 мая до 30 сентября.                                                                                         |
| **Anwesenheitssimulation**        | Licht, das jeden Tag zu leicht unterschiedlichen Zeiten Zeiten, damit das Haus bewohnt wirkt                                                     |
| **DMX**                           | Ein Standard zur Steuerung von Bühnen- und Effektlicht über Kabel. Jedes Gerät ist ab seiner Startadresse (1 до 512) eine feste Zahl von Kanälen |
| **JSON**                          | Текстовый формат для структурирования данных, который можно использовать в `timers.overview`                                                      |

## 16. Правовые отношения и контакт

Dies ist ein **inoffizielles Community-Projekt** . Это лучшее решение для Shenzhen Futlight Optoelectronics Co., Ltd. (MiBoxer / Mi-Light) или для Tuya. «MiBoxer», «Mi-Light» и «Tuya» являются маркировкой их ювелирных изделий и используются для обеспечения совместимости. Die Nutzung erfolgt auf eigene Gefahr.

- Quellcode и Fragen: <https://github.com/ssbingo/ioBroker.miboxer-wl433>
- Лицензия: Массачусетский технологический институт – Авторские права (c) 2026, ssbingo