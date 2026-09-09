---
chapters: {"pages":{"en/adapterref/iobroker.cloud/README.md":{"title":{"en":"ioBroker cloud adapter"},"content":"en/adapterref/iobroker.cloud/README.md"},"en/adapterref/iobroker.cloud/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.cloud/doc/ifttt.md"},"en/adapterref/iobroker.cloud/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.cloud/doc/tasker.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cloud/doc/ifttt.md
title: Wie man IFTTT mit ioBroker verwendet
hash: 94lTK4s+XsEgvYz9VvvNmFIJgq33zKWbSi323lIbtoQ=
---
# Wie man IFTTT mit ioBroker verwendet

Hier erfahren Sie, wie Sie IFTTT mit ioBroker und dem IFTTT-Webhooks-Dienst nutzen. Wir beginnen mit der Darstellung des Datenflusses von ioBroker zu IFTTT, indem wir ein Applet erstellen, das Daten von ioBroker über IFTTT an Telegram sendet. Natürlich ist dies auch mit einem Adapter und somit direkter möglich, aber dieses Beispiel veranschaulicht die Funktionsweise gut.

- [Daten an IFTTT senden](#sending-data-to-ifttt)
- [Daten von IFTTT abrufen](#getting-data-from-ifttt)

---

## Daten an IFTTT senden

Wir werden ein Applet erstellen, das folgende Kette durchführt: ioBroker => Webhook (IFTTT) => Telegram

**1. Dazu erstellen wir zunächst ein neues Applet:**

![Abbildung der Startseite für die IFTTT-Applet-Erstellung](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_01.png)

**2. Klicken Sie nun wie gewohnt auf „+this“ und wählen Sie dann als Dienst Webhooks aus.**

![Abbildung, die die IFTTT-Dienstauswahl mit dem ausgewählten Dienst „Webhooks“ zeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_02.png)

**3. Wählen Sie hier die einzige verfügbare Option „Webanfrage empfangen“ als Auslöser für die Kette aus.**

![Abbildung der IFTTT-Trigger-Auswahlseite](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_03.png)

**4. Nun benennen wir unser Ereignis. Wählen Sie hier denselben Namen, den Sie später in Blocky verwenden werden. Nennen wir es in diesem Beispiel „Zustand“.**

![Abbildung der Triggerfeldseite des Webhook-Dienstes mit einem roten Pfeil, der die Eingabestelle für den Ereignisnamen anzeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_04.png)

**5. Nachdem wir den Auslöserteil des Applets fertiggestellt haben, fahren wir nun mit der Aktion fort. Klicken Sie dazu auf „+dann“.**

![Abbildung mit Applet-Übersicht, wobei Webhooks ausgewählt und der Bereich „+then“ hervorgehoben ist.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_05.png)

**6. Suchen Sie nun nach Telegram und klicken Sie darauf (falls Ihr Telegram-Konto noch nicht verknüpft ist, müssen Sie den Vorgang durchführen; diese Anleitung geht davon aus, dass dies bereits geschehen ist).**

![Abbildung, die die IFTTT-Dienstauswahl für den Zieldienst zeigt, wobei im Suchfeld „Telegram“ eingegeben wurde.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_06.png)

**7. Wählen Sie als Aktion „Nachricht senden“.**

![Abbildung der Seite „Aktion auswählen“ mit einem roten Pfeil, der auf die Aktion „Nachricht senden“ zeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_07.png)

**8. Nun legen wir fest, wohin die Nachricht gesendet werden soll und wie sie aussehen soll. Bitte füllen Sie die Felder wie in der Abbildung gezeigt aus. In diesem Beispiel ist Wert1 die Objekt-ID, Wert2 der Wert des Objekts und Wert3 der Bestätigungsstatus (falsch/wahr).**

![Abbildung der vollständigen Aktionsseite mit ausgefülltem Nachrichtenfeld für unser Beispiel mit Wert1/Wert2/Wert3 als Zutaten](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_08.png)

**9. Die Erstellung des Applets ist nun abgeschlossen. Sie können es bei Bedarf umbenennen und anschließend auf „Fertigstellen“ klicken, um den Erstellungsprozess zu beenden.**

![Abbildung, die die letzte Seite des Applet-Erstellungsprozesses zeigt](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_09.png)

**10. Nun benötigen wir den Schlüssel, den der IFTTT-Webhooks-Dienst für die Eingabe von Ereignissen erfordert. Besuchen Sie dazu <https://ifttt.com/maker_webhooks> und klicken Sie auf die Schaltfläche „Dokumentation“. Auf der folgenden Seite wird Ihnen Ihr Schlüssel angezeigt. Bitte kopieren Sie ihn, da wir ihn im nächsten Schritt für ioBroker benötigen.**

![Abbildung mit der IFTTT-Webhooks-Dokumentation, in der Sie den Maker-Webhooks-Schlüssel finden.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_10.png)

**11. Gehen Sie nun zu ioBroker und dort zur Einstellungsseite Ihrer Cloud-Adapter-Instanz. Wählen Sie den Tab „IFTTT und Dienste“ aus und fügen Sie den Schlüssel in das Feld mit der Bezeichnung „IFTTT-Schlüssel“ ein. (Versuchen Sie es gar nicht erst, der Schlüssel ist zufällig und dient nur zur Veranschaulichung.)**

![Abbildung der Cloud-Adapter-Konfigurationsseite mit ausgewähltem Tab „Dienste und IFTTT“.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_11.png)

**12. Jetzt können wir Daten mit Blocky an IFTTT senden. Die Felder des Elements „Text an IFTTT senden“ (unter „Sendto“ in Blocky) entsprechen den Feldern, die wir in IFTTT als Aktion konfiguriert haben.**

![Abbildung, die das Applet auf IFTTT und das IFTTT-Element von blocky zeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_12.png)

**Wenn Sie JavaScript lieber direkt schreiben möchten, anstatt Blocky zu verwenden, sieht die zu verwendende Funktion folgendermaßen aus:**

```javascript
sendTo("cloud.0", "ifttt", {
    event: 'state',
    value1: 'value1',
    value2: 'value2',
    value3: 'value3'
});
```

**Es ist auch möglich, die Variable festzulegen.`cloud.0.service.ifttt` mit einem gewissen Wert wird es auch gesendet.**

**13. Hier ein einfaches Beispiel: ein Blocky-Skript, das den Zustand eines HomeMatic-Türkontakts erfasst und bei einer Änderung an IFTTT und die daraus resultierende Telegram-Nachricht sendet.**

![Abbildung des oben erwähnten Blocky-Skripts und eine Nachricht von Telegram mit dem Ergebnis des Blocky-Skripts](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_13.png)

---

## Daten von IFTTT abrufen

Nachdem wir nun wissen, wie wir Daten an IFTTT und damit an andere Dienste senden können, sehen wir uns an, wie wir Daten von anderen Diensten empfangen. In diesem Beispiel gehen wir den umgekehrten Weg und empfangen Daten von Telegram über IFTTT. Wir erstellen ein Applet mit folgender Kette: Telegram => Webhook (IFTTT) => ioBroker

**1. Erstellen Sie zunächst ein neues Applet in IFTTT und klicken Sie dann auf „+dies“, um die Triggerauswahl zu starten.**

![Abbildung der Startseite für die IFTTT-Applet-Erstellung](../../../../en/adapterref/iobroker.cloud/doc/ifttt_send_01.png)

**2. Wählen Sie nun „Telegram“ als Dienst für das Applet aus.**

![Das Bild zeigt die Dienstauswahl; im Suchfeld ist „Telegram“ eingegeben.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_02.png)

**3. Wählen Sie hier als Auslöser „Neue Nachricht mit Schlüsselphase an @IFTTT“.**

![Abbildung mit der Triggerauswahl und rotem Pfeil, der auf „Neue Nachricht mit Schlüsselphase an @IFTTT“ zeigt](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_03.png)

**4. Als Schlüsselphase geben wir "state" ein und als Antwort nehmen wir in diesem Beispiel "OK".**

![Abbildung der Seite zur Einrichtung des Triggerfelds mit ausgefüllten Feldern für Schlüsselphase und Antwort.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_04.png)

**5. Nachdem wir den Auslöserteil des Applets fertiggestellt haben, fahren wir nun mit der Aktion fort. Klicken Sie dazu auf „+dann“.**

![Abbildung mit Applet-Übersicht, wobei Webhooks ausgewählt und der Bereich „+then“ hervorgehoben ist.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_05.png)

**6. Wählen Sie als Aktionsdienst „Webhooks“ aus.**

![Das Bild zeigt die Aktionsauswahl und das Suchfeld mit der Aufschrift „Webhooks“.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_06.png)

**7. Wählen Sie hier die einzige Option „Webanfrage stellen“.**

![Abbildung der Seite „Aktion auswählen“ des Webhooks-Dienstes](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_07.png)

**8. Jetzt benötigen wir die API-URL (dazu benötigen Sie ein ioBroker-Cloud-Konto, entweder kostenlos oder als Pro-Version). Sie finden sie auf der Cloud-Adapter-Seite unter dem Tab „IFTTT und Dienste“. (Übrigens: Der Schlüssel im Bild ist gefälscht.)**

Falls Sie benutzerdefinierte Dienste verwenden, müssen Sie die „Whitelist für Dienste“ entweder auf „\*“ setzen, um alle Dienste zuzulassen, oder „ifttt“ zur Liste der zulässigen Dienste hinzufügen. Wenn Sie keine benutzerdefinierten Dienste verwenden, können Sie diesen Schritt ignorieren.

![Abbildung der Cloud-Adapterseite mit geöffnetem Tab „IFTTT und Dienste“ und einem roten Pfeil, der auf die IFTTT-URL zeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_08.png)

**9. Fügen Sie die API-URL, die Sie aus der Cloud-Adapter-Konfiguration kopiert haben, hier in das URL-Feld ein. Wählen Sie dann als Aktion „Post“, als Inhaltstyp „Text/Plain“ und als Inhaltsbestandteil „Text“ für den Nachrichtentext aus.**

![Abbildung, die die vollständigen Aktionsfelder mit allen ausgefüllten/ausgewählten Optionen wie erläutert zeigt.](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_09.png)

**10. Schließen Sie den Applet-Erstellungsprozess ab.**

![Abbildung der letzten Seite der Applet-Erstellung auf IFTTT](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_10.png)

**11. Wenn wir nun eine private Nachricht an @IFTTT auf Telegram senden, beispielsweise "state roflcopter", ändert sich die Variable`cloud.0.service.ifttt` wird "roflcopter" enthalten. Dies kann von jedem Blocky- oder Javascript-Programm erfasst werden, das dann entsprechend reagieren kann.**

![Abbildung eines Telegram-Fensters mit der an den @IFTTT-Bot gesendeten Nachricht und dem Status in ioBroker](../../../../en/adapterref/iobroker.cloud/doc/ifttt_get_11.png)