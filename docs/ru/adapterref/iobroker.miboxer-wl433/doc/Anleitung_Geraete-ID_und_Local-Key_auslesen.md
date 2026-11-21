---
title: Geräte-ID и локальный ключ шлюзов WL-433 auslesen - Einsteigeranleitung
lang: de
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md
hash: 2ilxpNQJPrRCjBogBUIb4o1xnabWQuMYN+NfQyIkXt4=
---
# Geräte-ID и локальный ключ шлюзов WL-433 auslesen

**Schritt-für-Schritt-Anleitung für Einsteiger – для Android, iPhone и iPad**

Стенд: 21 сентября 2026 г. · Diese Anleitung gehört zum ioBroker-Adapter **miboxer-wl433** . Die Quellenangaben in eckigen Klammern (z. B. \[Q1]) finden Sie am Ende der Anleitung.

---

## Das Wichtigste auf einen Blick

Чтобы использовать ioBroker для подключения к шлюзу WL-433, выберите адаптер, **который находится в** зоне действия:

| Ангабе                                                                             | Wie sie aussieht                                                               | Вофюр                                                |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **Geräte-ID** (англ. «Идентификатор устройства», в протоколе «devId»)              | etwa 20 bis 22 Zeichen aus Buchstaben und Ziffern, z. Б. `bf0123456789abcdefgh` | Damit weiß der Adaptor, _welches_ Gerät Gemeint ist. |
| **Локальный ключ** (по-мансански Anleitungen auch «Token» или «lokaler Schlüssel») | **genau 16 Zeichen** , часто mit Sonderzeichen, z. Б. `a1B2$c3D4{e5F6g7`        | Это «Пароль», с адаптером и шлюзом.                  |

Die **Geräte-ID** ist leicht zu finden (Часть A). **Локальный ключ** можно использовать напрямую с помощью приложения. Der Hersteller unterstützt für das WL-433 auch nicht die Tuya-Entwicklerplattform, über die man den Schlüssel bei anderen Geräten abbrufen kann \[Q3]. Es gibt aber einen erprobten Weg: Die MiBoxer-App включен в ваш внутренний протокол (das «Log»), и эти протоколы могут быть использованы в **Android-Gerät** mitlesen \[Q1].

**Welcher Weg passt zu Ihnen?**

| Ihre Ausstattung                                           | Ihr Weg                                                                                                          | Ауфванд           |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------- |
| Android-смартфон или планшет (Android 11 или новая версия) | **Часть B** , Вариант для компьютера                                                                             | примерно 30 минут |
| Приложение Android (Android 7–10) и компьютер              | **Часть B** , вариант с компьютером                                                                              | примерно 45 минут |
| Только iPhone или iPad                                     | **Часть C** – это Android-Gerät einfachsten mit einem geliehenen, сынок с einem Android-эмулятором на компьютере | 30–90 минут       |

**Если вы хотите, чтобы ваш локальный ключ был выбран, вы должны** **сделать это, если шлюз не сможет использовать приложение** \[Q2]. Если вы хотите, чтобы шлюз был отключен (например, «Poolleuchte PW01 mit dem Gateway WL-433 verbinden»), вы можете прочитать _его_ , используя локальный ключ, и получить доступ к шлюзу, который больше не используется. Tun Sie es doch, wiederholen Sie einfach diese Anleitung.

---

## 1. Bevor Sie beginnen

### 1.1 Das brauchen Sie – Контрольный список

- [ ] **Шлюз WL-433 является полезным решением** : в приложении «MiBoxer» есть возможность подключения к WLAN, подключение к бассейну, его открытие и обучение для каждого приложения.
- [ ] **Ihre Zugangsdaten zur MiBoxer-App** (адрес электронной почты и пароль). Sie melden sich damit eventuell auf einem weiteren Gerät an.
- [ ] **Приложение Android** – это ваш собственный, удобный или Android-эмулятор на компьютере (например, C). LogFox, приложение для обмена протоколами, работает на Android 7 \[Q4].
- [ ] **Нужен вариант с компьютером:** ПК с Windows, Mac или Linux-Rechner, а также USB-кабель для передачи данных для Android-устройств.
- [ ] **Zettel und Stift или приложение Notiz** для ваших писем.
- [ ] **ioBroker с установочным адаптером «miboxer-wl433».**

### 1.2 Wichtige Begriffe – в einfachen Worten

| Бегриф                                                                       | Was damit gemeint ist                                                                                                                           |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Протокол / Журнал**                                                        | Ein internes «Tagebuch», в das Apps im Hintergrund schreiben, был sie gerade tun. Normalerweise sieht es niemand.                               |
| **LogFox**                                                                   | Бесплатное приложение для Android включает в себя различные варианты и лучшие способы \[Q4].                                                    |
| **Entwickleroptionen**                                                       | Откройте меню в Android-Einstellungen. Man schaltet es mit einem Trick frei (Abschnitt 3.1).                                                    |
| **Отладка через WLAN** (например, «Отладка кабелей», «Беспроводная отладка») | Eine Funktion in den Entwickleroptionen, mit der der sich ein Hilfsprogramm ohne Kabel mit dem Handy verbinden darf.                            |
| **Шизуку**                                                                   | Вам нужно бесплатное приложение Hilfs, а также LogFox, который позволяет получить доступ к компьютеру (для Android 11) \[Q5].                   |
| **АБР**                                                                      | «Android Debug Bridge», небольшая программа Google для компьютера, с помощью которой можно управлять Android-Gerät Befehle schicken kann \[Q6]. |
| **Эмулятор**                                                                 | Эта программа, созданная на компьютере, содержит полный набор Android-Handy. Wichtig для iPhone-Besitzer (часть C).                             |

### 1.3 Sicherheitshinweise

- **Локальный ключ — это пароль.** Если вы находитесь в сети WLAN, то можете воспользоваться услугами Poolbeleuchtung steuern. Veröffentlichen Sie ihn nicht, zum Beispiel in Foren или Bildschirmfotos – dort vorher unkenntlich machen.
- **Нур Ихр Эйгенес Герят.** Sie lesen ausschließlich das Protokoll der MiBoxer-App на вашем собственном устройстве (или на вашем собственном устройстве, с _вашим_ именем пользователя) Gerät aus.
- **Nach getaner Arbeit aufräumen.** LogFox может читать протоколы _всех_ приложений. Schalten Sie die Entwickleroptionen danach wieder aus und entfernen Sie LogFox und Shizuku, когда Sie sie nicht mehr brauchen (Teil E).

---

## 2. Часть A – Поиск Geräte-ID (все Geräte, на iPhone)

Приложение MiBoxer **не** имеет идентификатора пользователя и не имеет пункта меню «Создание информации», в котором другие приложения Tuya-Apps не используются, но это не так. Sie bekommen die Geräte-ID trotzdem auf zwei Wegen:

- **zusammen mit dem Local Key** aus dem Protokoll (Teil B bzw. C) – sie steeht dort direkt daneben, или
- **Если вы используете кнопку «Адаптеры»** в ioBroker, используйте Handy. Итак, können Sie später auch prüfen, ob Sie im Protokoll den richtigen Eintrag erwischt haben.

**Таким образом, функция, которая работает с адаптером:** шлюз объединяется с самим пользователем, и адаптер становится частью этого адаптера.

1. Используйте **приложение MiBoxer на всех устройствах Handys** в WLAN. Приложение Solange eine App напрямую связано с шлюзом, поэтому оно не находится в сети.
2. Открыть страницу в ioBroker **Instanzen → miboxer-wl433.0 → Einstellungen** (Schraubenschlüssel-Symbol). Die Instanz muss laufen – auch wenn sie noch nicht Fertig eingerichtet ist und deshalb nicht grün leuchtet.
3. Нажмите «Geräte-ID», **чтобы просмотреть** и нажать **«Gateway im lokalen Netzwerk suchen»** .
4. Nach bis zu 12 Sekunden erscheint eine Liste aller Tuya-Geräte in Ihrem Netz, драгоценности в форме `Geräte-ID @ IP-Adresse (Protokollversion)`, zum Beispiel `bf0123456789abcdefgh @ 192.168.178.45 (3.3)`.
5. **Welcher Eintrag ist das Gateway?**
   - Если вы находитесь в Списке, это шлюз.
   - Stehen mehrere Geräte dort (z. B. weil Sie weil Sie weitere WLAN-Steckdosen oder -Lampen von Tuya-Marken besitzen), gibt es einen einfachen Trick: Ziehen Sie kurz den **Netzstecker des Gateways** , warten Sie etwa 30 Sekunden und suchen Sie erneut. **Der Eintrag, der jetzt fehlt — это Врата.** Stecken Sie es danach wieder ein – nach etwa einer Minute ist es wieder im WLAN.
6. Schreiben Sie die Geräte-ID ab или kopieren Sie sie.

Wird gar kein Gerät gefunden, sind Gateway und ioBroker vermutlich в unterschiedlichen Netzwerken (z. B. Gäste-WLAN или getrennte Netzbereiche). Dann erhalten Sie die Geräte-ID в Teil B bzw. Используйте локальный ключ.

---

## 3. Часть B – Локальный ключ с установленным Android-приложением

Dieser Teil ist der Kern der Anleitung. Лучше всего использовать следующие инструкции: Entwickleroptionen freeischalten, LogFox installieren, LogFox die Leseberechtigung Geben, Werte auslesen.

### 3.1 Entwickleroptionen freischalten

1. Отключите **Einstellungen** Ihres Android-Geräts.
2. Suchen Sie die **Build-Nummer** :
   - в Google Pixel и других местах: **Über das Telefon → Build-Nummer** ,
   - в Samsung: **Информация о телефоне → Информация о программном обеспечении → Номер сборки** . Совет: Такая функция доступна непосредственно в разделе «Build-Nummer».
3. Tippen Sie **siebenmal schnell hintereinander** auf die Build-Nummer. Eventuell müssen Sie Ihre Bildschirmsperre (PIN) eingeben. Es erscheint die Meldung **«Du bist jetzt Entwickler!»** (или Анлих).
4. Die **Entwickleroptionen** finden Sie jetzt unter **Einstellungen → System → Entwickleroptionen** (Samsung: ganz unten in den Einstellungen).
5. Schalten Sie dort **«USB-Debugging»** ein.

### 3.2 Установка LogFox

LogFox ist kostenlos und quelloffen und Wird über **F-Droid** verteilt \[Q4]:

1. Откройте приложение Android в браузере на сайте **f-droid.org/packages/com.f0x1d.logfox** .
2. Советуем добавить **«APK hereunterladen»** (на английском языке «Загрузить APK»).
3. Öffnen Sie die heruntergeladene Datei. Фрагмент Android, в котором устанавливаются браузерные приложения: erlauben Sie das ( **«Aus dieser Quelle zulassen»** ) и советуется Sie auf **«Installieren»** .

LogFox — это новая английская версия. Die wenigen Begriffe, die Sie brauchen, sind unten jeweils übersetzt.

### 3.3 Использование LogFox для лесопользования

Android-приложение поможет вам узнать больше о протоколах, которые помогут вам получить больше информации. Diese vergeben Sie **einmalig** auf einem von zwei Wegen.

#### Вариант на компьютере (под Android 11) – с Shizuku

1. Установите приложение **«Shizuku»** из **Google Play Store** \[Q5].
2. Убедитесь, что Android-Gerät с вашим **WLAN** (Pflicht für diesen Weg).
3. Откройте **меню «Отладка → Система» → «Отладка проводов** » и выберите **«Отладка через WLAN»** (heißt je nach Hersteller auch «Отладка кабелей» или «Беспроводная отладка»). Bestätigen Sie die Rückfrage mit **«Zulassen»** .
4. Оффнен Си **Шизуку** . Tippen Sie im Abschnitt zum Start über Debugging über WLAN (англ. «Начать через беспроводную отладку») или **«Kopplung»** (англ. «Сопряжение»). Сидзуку zeigt nun eine **Benachrichtigung** an.
5. Вы можете выполнить **отладку WLAN** и получить совет по **«Gerät mit Kopplungscode koppeln»** . Es erscheint ein **sechsstelliger Code** .
6. Ziehen Sie die Benachrichtigungsleiste herunter und geben Sie den Code **in der Shizuku-Benachrichtigung** ein. Die Meldung «Kopplung erfolgreich» erscheint.
7. Загрузите приложение Shizuku-App и выберите **«Старт»** (англ. «Старт»). Oben wird jetzt angezeigt, dass Shizuku läuft (англ. «Шизуку бежит»).
8. Открыть ссылку **LogFox** . Beim ersten Запустите erscheint die Einrichtungsseite **«Setup»** . Tippen Sie auf **«Shizuku»** и лучший вариант Sie die Rückfrage von Shizuku mit **«Zulassen»** .

Wichtig: Nach einem **Neustart des Handys** ist Shizuku wieder aus und muss mit Schritt 7 neu gestartet werden \[Q5]. Das betrifft Sie nur, wenn Sie den Vorgang später wiederholen.

**Чтобы узнать:** Hat die Freigabe geklappt, **schließt sich LogFox kurz und startet neu** . Das ist Absicht und kein Absturz – danach zeigt LogFox Direct die Protokollzeilen.

#### Wenn LogFox Мелдет «Ошибка при использовании Шизуку»

LogFox zeigt diese Meldung in drei Fällen \[Q4]. Нажмите кнопку «Настроить» и выберите «Шизуку» в LogFox, затем выберите **«Настройка» → «Шизуку»** :

1. **Сидзуку не светится.** Открытое приложение Shizuku-App: Oben muss stehen, dass Shizuku läuft (англ. «Шизуку бежит»). Не удается выполнить следующие действия: использовать Handy в WLAN и **отладку WLAN** , а также советовать в Shizuku auf **«Starten»** . Nach jedem Neustart des Handys ist das erneut nötig \[Q5].
2. **LogFox находится в Сидзуку без ограничений.** Если вы хотите получить сообщение от Шизуку, фрагмент LogFox **больше не** работает. Öffnen Sie in Shizuku den Punkt **«Autorisierte Anwendungen»** (английский «Авторизованные приложения») и Schalten Sie **LogFox** ein.
3. **Ваш Handy специалист по Rechtevergabe.** Einige Hersteller verlangen eine zusätzliche Einstellung in den **Entwickleroptionen** \[Q5]:
   - **Xiaomi, Redmi, POCO:** zusätzlich zu «Отладка по USB» или **«Отладка по USB (Sicherheitseinstellungen)»** einschalten (англ. «Отладка по USB (параметры безопасности)»; das ist ein eigener Schalter). Xiaomi предлагает лучшую SIM-карту и лучший выбор Xiaomi-Konto. Außerdem unter Einstellungen → Benachrichtigungen den Stil der Benachrichtigungsleiste auf «Android» stellen, sonst scheitert die Kopplung.
   - **OPPO, OnePlus, Realme:** **«Berechtigungsüberwachung deaktivieren»** einschalten (англ. «Отключить мониторинг разрешений»).
   - **Huawei:** «ADB-Debugging im Nur-Laden-Modus zulassen» einschalten (англ. «Разрешить параметры отладки ADB в режиме «Только зарядка»).
   - **Meizu:** «Flyme-Zahlungsschutz» ausschalten (англ. «Защита платежей Flyme»).

Hängt Shizuku schon beim Koppeln («Suche nach Kopplungsdienst…»), erlauben Sie Shizuku in den App-Einstellungen, **im Hintergrund zu laufen** (Akku-Optimierung für Shizuku ausschalten) \[Q5].

Klappt es trotzdem nicht, nehmen Sie die Die die **Variante mit Computer** (nächster Abschnitt). Die herstellerspezifischen Schalter aus Punkt 3 brauchen Sie dort allerdings ebenfalls.

#### Вариант с компьютером (все версии Android) – с ADB

1. Загрузить компьютер с **«SDK Platform-Tools»** от Google (developer.android.com/tools/releases/platform-tools) и загрузить ZIP-Datei, z. Б. нач `C:\platform-tools` \[Q6].
2. Используйте Android-устройство для **USB-кабеля** с компьютером. Auf dem Handy erscheint **«Отладка по USB?»** – setzen Sie den Haken bei «Von diesem Computer immer zulassen» и Tippen Sie auf **«Zulassen»** .
3. Открыть компьютер в пакете в порядке:
   - **Окна:** Орднер `platform-tools` im Explorer öffnen, oben in die Adresszeile `cmd` tippen, Enter drücken.
   - **Mac/Linux:** Терминал отключен и `cd` gefolgt vom Ordnerpfad eingeben.
4. Tippen Sie diesen Befehl ein und drücken Sie Enter (Mac/Linux: `./adb` статт `adb`):

   ```text
   adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS
   ```

   Kommt keine Fehlermeldung, шляпа es geklappt. После установки LogFox выберите **«Настройка» → «ADB»** и \[Q4].
5. Beenden Sie LogFox vollständig (aus der App-Übersicht wegwischen) и öffnen Sie es neu.

Рекомендации для Android 13 и новых версий: Google Hat Den Zugriff auf diesem Weg eingeschränkt. LogFox использует протокол в течение **нескольких минут** ; danach die Aufzeichnung neu starten \[Q4]. Если вы можете использовать Android-фрагмент, в LogFox **«на всех созданных протоколах»** можно указать **«Einmaligen Zugriff erlauben»** \[Q7]. Arbeiten Sie Abschnitt 3,4 deshalb zügig ab.

### 3.4 Получение идентификатора и локального ключа

1. **Загрузите приложение MiBoxer-App** (App-Übersicht öffnen, MiBoxer nach oben wegwischen).
2. Открыть ссылку **LogFox** . Oben laufen jetzt Protokollzeilen durch. Steht dort «Запись приостановлена» (Aufzeichnung pausiert), Tippen Sie auf **«Resume»** (Fortsetzen).
3. Если вы откроете **приложение MiBoxer** , вы увидите его и получите совет по своему **шлюзу WL-433** . Schalten Sie die Leuchte **einmal aus und wieder ein** . Приложение должно быть использовано в протоколе \[Q1].
4. Wechseln Sie zurück zu **LogFox** und Tippen Sie auf die **Lupe** («Поиск»). Гебен Си в роли Сучбегрифф&#x430;** `localKey` ** эйн.
5. Sie sehen nun eine oder mehrere Zeilen, die ungefähr so aussehen (Werte hier erfunden):

   ```text
   ..."devId":"bf0123456789abcdefgh", ... "localKey":"a1B2$c3D4{e5F6g7", ... "name":"WL-433", ...
   ```

   - Der Text **zwischen den Anführungszeichen nach `"devId":` ** ist die **Geräte-ID** .
   - Der Text **zwischen den Anführungszeichen nach `"localKey":` ** ist der **Local Key** .
   - Stehen dort mehrere Geräte (weil Sie weitere Tuya- oder MiBoxer-Geräte haben), nehmen Sie die Zeile, deren `"name"` эти шлюзы названы в приложении. Vergleichen Sie die Geräte-ID mit dem Surergebnis aus Teil A.
6. **Kopieren statt abschreiben:** Tippen Sie lange auf die Zeile und wählen Sie **«Расширенная копия»** , um genau den gewünschten Teil zu markieren und zu kopieren. Мелдет LogFox **«Текст скопирован»** . Используйте текст в своем приложении Notiz-App. Beim Abschreiben passieren leicht Fehler (`l` /`1` /`I`, `O` /`0`).
7. **Prüfen Sie die Werte:**
   - Der Local Key имеет **номер 16 Zeichen** . Sonderzeichen wie `$ { ' < |` gehören dazu – übernehmen Sie alles exakt, aber **ohne** die umschließenden Anführungszeichen.
   - Steht im Local Key ein **Schrägstrich mit vorangestelltem Rückstrich** (`\/`) или ein Rückstrich vor einem Anführungszeichen (`\"`), ist der Rückstrich nur eine Schreibweise des Protokolls: Übernehmen Sie nur `/` бзв. `"`.

Findet die Muche nichts, lesen Sie Abschnitt 7 («Häufige Fragen»).

---

## 4. Часть C – Вы можете использовать iPhone или iPad

**Действительно ли это не так прямо на iPhone?** Apple предлагает больше приложений для iPhone или iPad, а также протоколы других приложений для чтения. Ваша iPhone-версия LogFox не может быть использована и не может быть использована.

**Die Gute Nachricht:** Der Local Key gehört zum **Gateway** , nicht zu Ihrem Handy. Это в Ihrem MiBoxer-Konto, созданном и указанном в качестве _основного_ средства, на dem Sie sich mit diesem Konto anmelden. Это также может быть **связано с Android-Gerät** zu verwenden – ваш iPhone не работает, и шлюз **не** может быть использован снова.

Die Geräte-ID находит Sie unabhängig vom Handy с помощью таких кнопок адаптеров (часть A).

### 4.1 Der einfachste Weg: ein Android-Gerät ausleihen

Используйте Android-смартфон или планшет под управлением Android 7, а также другие устройства, подключенные к Schublade или Handy eines Familienmitglieds.

1. Установите приложение **«MiBoxer»** на Android из Google Play Store.
2. Используйте его с **вашим** MiBoxer-Konto (обычный адрес электронной почты и пароль для iPhone). Их шлюз работает автоматически в der Geräteliste. **Fügen Sie das Gateway nicht neu hinzu und entfernen Sie es nicht** – sonst ändert sich der Local Key \[Q2].
3. Arbeiten Sie **Teil B** vollständig durch.
4. Загрузите его в приложение MiBoxer-App и используйте его (в базовых приложениях, которые отображаются в разделе **«Ich» → Einstellungen → «Abmelden»** ) и деинсталлируют MiBoxer, LogFox и Shizuku. Ваш шлюз и ваш iPhone должны быть доступны.

### 4.2 Приложение Android: Android-эмулятор на компьютере

С помощью **эмулятора** вы получите полную систему Android в своем приложении на ПК с ОС Windows или Mac. Sie brauchen dafür einen Computer с 8 ГБ Arbeitsspeicher und ein Google-Konto для Play Store.

**Эрлихер Хинвейс:** Dieser Weg — это техническая защита, которая с приложением MiBoxer не вызывает никаких ошибок. Приложение в магазине Play Store с эмуляторами не будет доступно или не будет запущено, пока не появится версия 4.1.

**Схема 1. Установка Android Studio** (плата от Google, для Windows, Mac и Linux) \[Q8]:

1. Загрузите **Android Studio** на сайт Developer.android.com/studio и установите его с mit den vorgeschlagenen Einstellungen («Стандарт»). При установке перейдите к Gigabyte nach.
2. Нажмите кнопку **«Дополнительные действия» → «Диспетчер виртуальных устройств»** .
3. Нажмите **«+» (Создать виртуальное устройство)** , выберите телефон **с символом Play-Store** в разделе «Play Store» (например, «Pixel 8») и нажмите **«Далее»** .
4. Нажмите кнопку **«Google Play»** , чтобы загрузить ее, нажмите кнопку «Готово» и нажмите кнопку **«Готово»** .
5. Начните игру с **игровым символом** ▶. Получите больше минут в Android-Handy в Фенстере.

**Schritt 2 – приложение MiBoxer в эмуляторе:**

1. Откройте эмулятор в **Play Store** , используйте Google-Konto и установите **«MiBoxer»** .
2. Откройте приложение MiBoxer с **вашим** MiBoxer-Konto. Das Gateway erscheint in der Liste – **nicht neu hinzufügen, nicht entfernen** .

**Шрифт 3 – Собранный протокол:** Im Emulator Brauchen Sie weder LogFox noch Shizuku, затем этот протокол просматривается непосредственно на компьютере:

1. Öffnen Sie ein Befehlsfenster (Windows: Стартовое меню →`cmd`; Mac: программа «Терминал») и перейдите в порядок действий с этой программой `adb`. Android Studio требует установки:
   - **Окна:** `cd %LOCALAPPDATA%\Android\Sdk\platform-tools`
   - **Мак:** `cd ~/Library/Android/sdk/platform-tools`
2. Начните использовать фильтрованный протокол:
   - **Окна:** `adb logcat | findstr /i "localKey"`
   - **Мак:** `./adb logcat | grep -i "localKey"`
3. Используйте эмулятор в приложении MiBoxer на шлюзе и выберите его, чтобы получить доступ к нему.
4. Im Befehlsfenster erscheinen Zeilen wie in Abschnitt 3.4, Schritt 5. Werten Sie sie genauso aus (Schritte 5 bis 7). Kopieren können Sie, indem Sie den Text mit der Maus markieren (Windows: danach Rechtsklick bzw. Enter).
5. Сделайте это с помощью **Strg + C** (Mac: **ctrl + C** ). Откройте приложение MiBoxer в эмуляторе.

Альтернатива для Windows: функция Android Studio или бесплатный эмулятор **BlueStacks 5** . Dort schalten Sie unter **Einstellungen → Erweitert → «Android Debug Bridge»** в Zugriff ein und verbinden sich mit `adb connect 127.0.0.1:5555` (Номер порта в BlueStacks и; sie kann sich nach jedem Neustart ändern) \[Q9]. Danach geht es oben mit «Schritt 3 – Protokoll mitlesen», Punkt 2, weiter.

### 4.3 Nur für Mac-Besitzer: Veruch mit der Konsole (ohne Gewähr)

Auf einem Mac cann das Programm **«Konsole»** die Protokolle eines for Kabel angeschlossenen iPhone anzeigen \[Q10]. **Если версия MiBoxer-приложения для iPhone и локальный ключ не используются, это не так** – ошибка может быть получена на Android \[Q1]. Эйн Версух костит абер нур зен Минутен:

1. Используйте iPhone для кабеля с Mac и советуйте использовать iPhone в **«Vertrauen»** .
2. Открыть **программу Mac → Dienstprogramme → Konsole** .
3. Wählen Sie ссылается на «Geräte» Ihr **iPhone** aus. Активируйте меню **«Действие»** в пунктах **«Информационное обновление»** и **«Отладка»** .
4. Geben Sie oben rechts в дас Сухфель&#x434;** `localKey` ** ein und klicken Sie auf **«Streaming starten»** («Начать»).
5. Откройте приложение MiBoxer для iPhone, выберите его из шлюза и выберите Leuchte aus und ein.
6. Erscheint eine Zeile mit `"localKey"`, werten Sie sie wie in Abschnitt 3.4 aus. Erscheint nichts oder nur `<private>`, предоставьте iPhone-приложение без использования Schlüssel – в версии 4.1 или 4.2.

---

## 5. Часть D – Вертесь в ioBroker eintragen und prüfen

1. Открыть страницу в ioBroker **Instanzen → miboxer-wl433.0 → Einstellungen** (Schraubenschlüssel-Symbol).
2. Введите **идентификатор** и **локальный ключ** . Achten Sie darauf, dass beim Einfügen keine Leerzeichen am Anfang или Ende mitkommen.
3. Нажмите кнопку **«Шлюз в локальной сети Netzwerk suchen»** . При использовании шлюза можно получить **IP-адрес** адаптера и **версию протокола** . Альтернативно прочитайте IP-поле – если такой адаптер находится в самом начале. Версия протокола для WL-433 соответствует **версии 3.3** .
4. Нажмите **кнопку «Speichern und schließen»** .
5. **Если вы используете приложение MiBoxer-App** для всех Handys, включите WLAN без подключения к сети. Вы можете использовать **свое** местное приложение в удобном месте – это приложение в хорошем состоянии, которое не используется в адаптере.
6. **Prüfen:** Das Symbol der Instanz wird **grün** . Unter **Objekte → miboxer-wl433.0 → информация → соединение** установлено **верно** . Schalten Sie **testweiselight.on** um – die Poolleuchten reagieren.

**Был ли tun, wenn es nicht klappt?** Схема адаптера в ioBroker-Protokoll ( **Журнал** ):

| Meldung im Log (englisch)                                          | Bedeutung                                                                                                   | Лёсунг                                                                                                     |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| «Локальный ключ должен содержать ровно 16 символов (настроено: …)» | Beim Kopieren sind Zeichen verloren gegangen или hinzugekommen (z. B. Anführungszeichen, Leerzeichen).      | Местный ключ erneut und exakt übernehmen (Abschnitt 3.4, Schritt 7).                                       |
| «Шлюз передал данные, которые не удалось расшифровать…»            | Der Local Key ist falsch oder veraltet (Шлюз не может быть использован).                                    | Местный ключ не используется. Установлен протокол версии 3.3.                                              |
| «Не удаётся поддерживать соединение со шлюзом WL-433…»             | Шлюз не используется адаптером – приложение MiBoxer находится в подключенной сети, или IP-адрес не активен. | Приложение на всех Handys schließen, а также другие способы интеграции для ваших целей, IP-адрес доступен. |
| «Компания Gateway… не заявляла о себе в локальной сети».           | Автоматическое соединение с шлюзом не используется.                                                         | IP-адрес, доступный маршрутизатору и в поле «IP-адрес шлюза». Шлюз и ioBroker доступны в сети Netz.        |

---

## 6. Часть E – Выпуск

- **Entwickleroptionen ausschalten:** Einstellungen → System → Entwickleroptionen → Schalter ganz oben auf **Aus** . Используйте также USB-отладку и отладку через WLAN или другие устройства.
- **LogFox и Shizuku будут деинсталлированы** , если вы больше не пользуетесь ими.
- **Эмулятор:** Откройте приложение MiBoxer в Emulator ab. Если вы хотите использовать Virtual Device Manager, вы можете использовать его.
- **Если вы хотите, чтобы я был** лучше всего в Einem Passwort-Manager. Sie brauchen sie Wieder, когда Sie ioBroker neu einrichten.
- **Обратите внимание:** Nach jedem erneuten Koppeln des Gateways (WLAN neu eingerichtet, Gateway aus der App entfernt und neu hinzugefügt) ist ein **neuer Local Key** fällig \[Q2] – в этом Anleitung wiederholen.

---

## 7. Häufige Fragen

**LogFox находит Bei deruche nach `localKey` ночь. Была монахиней?** Нажмите, чтобы выполнить следующие действия: (1) При включении приложения MiBoxer-App оно будет отключено? Чтобы использовать приложение и отключить его, используйте LogFox лучше всего. (2) Сухен Sie auch nach `devId`, `localkey` Одер `local_key`. (3) Вариант ADB для Android 13: Aufzeichnung läuft nur einige Minuten – в LogFox можно запустить и MiBoxer-App так быстро отключить. (4) В июне 2025 г. от Эйнема Анвендера с открытым сегодня шлюзом \[Q1]. Это может быть лучше, если у вас есть новая версия приложения MiBoxer-App, которая является новой.

**Kann ich den Local Key nicht einfach beim Hersteller или bei Tuya abfragen?** Лейдер Нейн. Der Hersteller schreibt ausdrücklich, dass das WL-433 nicht auf der Tuya-Entwicklerplattform eingerichtet werden kann \[Q3]; Эйн Анвендер был лучшим \[Q1].

**Хотите ли вы использовать приложение «MiBoxer» или «MiBoxer Smart»?** Приложение находится в вашем шлюзе, но это руководство по WL-433, которое находится в приложении «MiBoxer».

**Дашь ли я MiBoxer-App мне это сделать?** Джа. **Когда вы используете WLAN,** это может стать проблемой, если шлюз имеет локальное значение. Unterwegs über das Mobilfunknetz spricht die App über die Cloud mit dem Gateway – адаптер не используется.

**Ändert sich der Local Key von selbst?** Теперь, когда шлюз не заблокирует приложение \[Q2]. Ein Stromausfall или Neustart des Gateways не работают.

---

## Квеллен

- **\[Q1]** GitHub, jasonacox/tinytuya, Обсуждение #623 «Вопросы и некоторая информация о точках доступа шлюза MiBoxer WL-433» (Anwender „Silverstar“, 04.06.2025): «Приложение свободно сообщает мне идентификатор устройства, локальный ключ и некоторые данные о точках доступа при выводе отладочной информации (с помощью LogFox на Android)»; «Это устройство нельзя использовать с облачной платформой Tuya». <https://github.com/jasonacox/tinytuya/discussions/623>
- **\[Q2]** TinyTuya, README: «Ключ Local\_Key для устройств Tuya будет меняться каждый раз, когда устройство удаляется и повторно добавляется в приложение TuyaSmart». <https://github.com/jasonacox/tinytuya>
- **\[Q3]** MiBoxer, FAQ и официальный форум (25.03.2025): «Внимание! 1. WL-Box1 WL-433 не может быть настроен.» <https://miboxer.com/faq> · <https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29>
- **\[Q4]** LogFox (F0x1d), F-Droid-Seite (версия 2.1.10, «Android 7.0 или новее», «Поддержка Shizuku, Root и ADB») и Quellcode (ADB-Befehl) `adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS` Примечание: «Начиная с Android 13, Google ограничил доступ к logcat через ADB. Вы сможете просматривать логи только в течение нескольких минут». <https://f-droid.org/packages/com.f0x1d.logfox/> · <https://github.com/F0x1d/LogFox>
- **\[Q5]** Сидзуку, Действия «Настройка»: запуск отладки WLAN в Android 11, подключение с использованием кода «Настройка», «этапы запуска необходимо выполнять заново после каждой перезагрузки». <https://shizuku.rikka.app/guide/setup/> · Google Play: <https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api>
- **\[Вопрос 6]** Разработчики Android: «Примечания к выпуску SDK Platform Tools» (Загрузка ADB). <https://developer.android.com/tools/releases/platform-tools>
- **\[Q7]** Google, Android-Hilfe: «Управление журналами вашего устройства» (einmaliger Zugriff auf alle Geräteprotokolle ab Android 13). <https://support.google.com/android/answer/12986432>
- **\[Q8]** Разработчики Android: «Скачать Android Studio» и «Создание и управление виртуальными устройствами». <https://developer.android.com/studio> · <https://developer.android.com/studio/run/managing-avds>
- **\[Вопрос 9]** Служба поддержки BlueStacks: «Как включить Android Debug Bridge в BlueStacks 5». <https://support.bluestacks.com/hc/en-us/articles/23925869130381-How-to-enable-Android-Debug-Bridge-on-BlueStacks-5>
- **\[Q10]** Apple, Konsole-Benutzerhandbuch: Protokollmeldungen eines angeschlossenen Geräts anzeigen. <https://support.apple.com/guide/console/cnsl1012/mac>
- Hintergrund zum Protokoll: [Miboxer\_WL-433\_PW01\_Protokollanalyse\_lokale\_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) , Abschnitt 3.1.4.