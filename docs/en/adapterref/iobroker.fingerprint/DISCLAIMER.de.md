---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
---
# Haftungsausschluss (Disclaimer) — ioBroker.fingerprint

Dieser Adapter ist eine unabhängige Community-Integration und steht in **keiner** Verbindung
zu den Autoren der FingerprintDoorbell-Firmware, den Sensorherstellern oder der ioBroker GmbH.
Die Software wird **„wie besehen“ ohne jegliche Gewährleistung** bereitgestellt (siehe
MIT-[LICENSE](https://github.com/sadam6752-tech/ioBroker.fingerprint/blob/main/LICENSE)); die Nutzung erfolgt auf eigenes Risiko.

- **Kein zertifiziertes Sicherheitsprodukt.** Fingerabdrucksensoren für den Endverbraucher
  (z. B. R503) können Personen fälschlich akzeptieren oder abweisen und lassen sich überlisten.
  Verlasse dich nicht allein auf diesen Adapter, um Türen, Schlösser, Alarmanlagen oder
  Personen und Sachwerte zu schützen, und halte immer einen mechanischen bzw. unabhängigen
  Zugang bereit.
- **Nicht für sicherheitskritische Anwendungen.** Netzwerk-, WLAN-, Strom- oder Softwarefehler
  können Ereignisse verzögern oder verlieren. Nicht dort einsetzen, wo ein Ausfall Leben oder
  Gesundheit gefährden kann (z. B. Fluchttüren).
- **Dein Netzwerk, deine Verantwortung.** WebUI des Geräts und Webhook nutzen unverschlüsseltes
  HTTP (Basic-Auth und Token werden im Klartext übertragen). Nur in einem vertrauenswürdigen
  LAN/VLAN betreiben, Webhook-Port und Gerät niemals ins Internet freigeben, Token geheim halten.
- **Biometrische Daten / Datenschutz (DSGVO).** Fingerabdruck-Templates, Namen, Zeitstempel und
  Zugriffsprotokolle sind personenbezogene Daten. Du bist Verantwortlicher: Hole die
  Einwilligung der eingelernten Personen ein, schütze Backup-Dateien
  (`fingerprints-backup.json` enthält die Roh-Templates unverschlüsselt) und beachte die für
  dich geltenden Gesetze (z. B. DSGVO/BDSG, Betriebsrat bei Beschäftigten).
- **Aktionen laufen automatisch.** Fingerabdruck-Regeln schreiben in beliebige von dir gewählte
  ioBroker-Objekte (Licht, Schlösser, Alarm, Skripte). Teste deine Regeln gründlich, bevor du
  dich darauf verlässt.
- Die Autoren haften nicht für Schäden, Datenverlust, unbefugten Zutritt, Einbruch oder sonstige
  Folgen aus der Nutzung oder dem Missbrauch dieser Software.