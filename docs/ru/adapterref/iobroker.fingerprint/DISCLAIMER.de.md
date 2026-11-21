---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fingerprint/DISCLAIMER.de.md
title: Haftungsausschluss (Отказ от ответственности) - ioBroker.fingerprint
hash: jt7MKGY1lE/YTvIiI7Negm9HhaEm3y3z9QgczXoYXQQ=
---
# Haftungsausschluss (Отказ от ответственности) — ioBroker.fingerprint

Адаптер Dieser является уникальной интеграцией с сообществом и предназначен **для** использования с автоматическим прошивкой дверного звонка отпечатков пальцев, Sensorherstellern или ioBroker GmbH. Программное обеспечение должно быть **«wie besehen» без использования** MIT- [LICENSE](https://github.com/sadam6752-tech/ioBroker.fingerprint/blob/main/LICENSE) ; die Nutzung erfolgt auf eigenes Risiko.

- **Получите сертификацию Sicherheitsprodukt.** Датчик отпечатка пальца для конечного устройства (z. B. R503) предназначен для персонифицированных процедур, требующих тщательного прослушивания или прослушивания. Verlasse dich nicht allein auf diesen Adaptor, um Türen, Schlösser, Alarmanlagen или Personen und Sachwerte zu schützen, unde immer einen mechanischen bzw. unabhängigen Zugang bereit.
- **Nicht für sicherheitskritische Anwendungen.** Netzwerk-, WLAN-, Stromader Softwarefehler können Ereignisse verzögern или verlieren. Nicht dort einsetzen, wo ein Ausfall Leben oder Gesundheit gefährden kann (z. B. Fluchttüren).
- **Dein Netzwerk, deine Verantwortung.** WebUI des Geräts и Webhook позволяют использовать HTTP (Basic-Auth и Token werden im Klartext übertragen). Если вы используете LAN/VLAN, порт Webhook и свободный доступ в Интернет, токен не работает.
- **Биометрические данные / Datenschutz (DSGVO).** Fingerabdruck-Templates, Namen, Zeitstempel и Zugriffsprotokolle sind personenbezogene Daten. Вы можете получить следующее подтверждение: Отверстие для Einwilligung der eingelernten Personen ein, schütze Backup-Dateien (sie enthalten die Roh-Templates unverschlüsselt — im Storage-Ordner `fingerprint.0.storage`, lesbar für alle Admin-Benutzer und unter Umständen über eine `web` -Instanz, sowie auf einem externen SFTP-Server) и Beachte die für dich geltenden Gesetze (z. B. DSGVO/BDSG, Betriebsrat bei Beschäftigten).
- **Активация автоматическая.** Fingerabdruck-Regeln schreiben в безопасном месте для ioBroker-Objekte (Licht, Schlösser, Alarm, Skripte). Teste deine Regeln gründlich, bevor du dich darauf verlässt.
- Die Autoren haften nicht für Schäden, Datenverlust, unbefugten Zutritt, Einbruch или Sonstige Folgen aus der Nutzung или dem Missbrauch dieser Software.