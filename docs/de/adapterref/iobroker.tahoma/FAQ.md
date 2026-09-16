---
chapters: {"pages":{"en/adapterref/iobroker.tahoma/README.md":{"title":{"en":"ioBroker.tahoma"},"content":"en/adapterref/iobroker.tahoma/README.md"},"en/adapterref/iobroker.tahoma/FAQ.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.tahoma/FAQ.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tahoma/FAQ.md
title: Häufig gestellte Fragen
hash: mQoX1ZKRq8uJ8f5AWi1SYseLvcPBliLOWDn0+sjmn4k=
---
# Häufig gestellte Fragen

Nachfolgend finden Sie eine Liste häufig gestellter Fragen und die dazugehörigen Antworten.

## Der Adapter stürzt beim Laden von Geräten aus Tahoma ab oder stellt die entsprechenden Zustände falsch ein. Wie kann ich den Entwicklern bei der Behebung dieses Problems helfen?

Der Adapter kann die von Tahoma empfangenen Daten protokollieren, was Entwicklern enorm hilft, das Problem zu reproduzieren und zu beheben. Bitte fügen Sie diese Daten Ihrem Fehlerbericht bei.

- Bitte aktivieren Sie die Debug-Protokollierung und starten Sie den Adapter in ioBroker Admin neu.
- Exportieren Sie die Protokolle in der Protokollansicht von ioBroker Admin.
- Bevor Sie die Protokolldateien einem Ticket anhängen oder senden, entfernen Sie bitte Ihre persönlichen Daten. Achten Sie dazu auf Folgendes:`Response:` Einträge im Protokoll. Manchmal sendet Tahomalink Daten wie diese:`<location>` (Ihre privaten Adressdaten!), die auf dem DEBUG-Protokolllevel ebenfalls in Ihren Protokollen erscheinen. Ersetzen Sie die sensiblen Daten dort durch Platzhalter.
- Senden Sie die Protokolle an <excodibur-iobroker@posteo.de> oder hängen Sie sie an Ihr GitHub-Issue an.

## Ich kann keine Verbindung zu Tahoma herstellen und erhalte 401-Fehler. Warum?

- Ihre Benutzername-/Passwortkombination ist möglicherweise ungültig. Bitte prüfen Sie unter <https://tahomalink.com/> , ob Sie sich mit diesen Zugangsdaten noch anmelden können. Falls sie dort funktionieren, sollten sie auch für den Adapter funktionieren.
- Somfy hat Ihr Konto möglicherweise vorübergehend gesperrt. Wir wissen nicht genau, warum das passiert, aber es könnte folgende Gründe haben:
  - Zu viele fehlgeschlagene Anmeldeversuche mit falschem Passwort. Deaktivieren Sie den Adapter vorübergehend und versuchen Sie es später erneut. Sie können das Wiederverbindungsverhalten auch unter \[Link einfügen] anpassen.`Advanced Connection Settings` Die
  - Zu viele Aktualisierungs-/Statusabfrageanfragen innerhalb eines bestimmten Zeitraums. Erwägen Sie, ein größeres Zeitlimit festzulegen.`Polling Interval` Konfiguration.

## Mein Adapter verliert ständig das Passwort. Warum?

Der Adapter speichert das Passwort verschlüsselt und nutzt zudem eine ioBroker-Funktion, um es im Rahmen der Adapterkonfiguration vor dem Auslesen durch externe Quellen zu schützen. Dieser Sicherheitsmechanismus trägt dazu bei, Ihre sensiblen Zugangsdaten vor Diebstahl oder Weitergabe zu schützen.

Wenn Sie versuchen, die Adapterkonfiguration abzurufen (`getObject` Beispielsweise stellt ioBroker im JavaScript-Adapter den Inhalt des geleerten Passwortfelds bereit. Wenn Sie dann versuchen, diese Konfiguration erneut zu aktualisieren und zu speichern (`setObject` Wenn Sie das Feld für das Passwort leer lassen, wird Ihr festgelegtes Passwort überschrieben und Ihr Passwort geht somit verloren.

Falls Sie lediglich eine externe Neustartlogik für den Adapter implementieren möchten, sollten Sie anstatt die Adapterkonfiguration zu ändern, den _Aktivierungsstatus_ des Adapters anpassen:

```
setState("system.adapter.tahoma.0.alive", false);
setState("system.adapter.tahoma.0.alive", true);
```

## Warum ist es so schwierig, diesen Adapter in einem stabilen Zustand bereitzustellen?

Es gibt mehrere Gründe, die zu wiederkehrenden Problemen führen:

- Der Adapter nutzt eine inoffizielle API, die von Somfy für ihr Tahomalink-Frontend (und vermutlich auch von der mobilen App) verwendet wird. Dank der [Recherche eines Forenmitglieds](https://forum.iobroker.net/post/336001) können wir diese für den Adapter nutzen. Das bedeutet aber:
  - Es gibt keinerlei offiziellen Support von Somfy für die verwendete API, daher kennen wir weder ihren vollen Funktionsumfang noch – noch wichtiger – wir wissen, wann Somfy Mechanismen wie die Ratenbegrenzung einsetzt. Möglicherweise stuft Somfy wiederholte programmatische Zugriffe auf eine für die grafische Benutzeroberfläche konzipierte API als verdächtiges Verhalten ein und blockiert sie vorübergehend – wir wissen es einfach nicht.
  - Theoretisch könnte Somfy diese API jederzeit einstellen, wodurch der Adapter in seiner jetzigen Form nutzlos würde.
- Da uns keine Schnittstellenspezifikation für die verwendete API vorliegt, können wir nur Vermutungen darüber anstellen, in welcher Form Somfy uns Gerätedaten und -zustände bereitstellt. Offenbar liefern manche Geräte komplexere Datenstrukturen über die API als andere. Auch ältere RTS-Komponenten unterscheiden sich optisch von neueren IO-Komponenten.
  - Entwicklern steht nur eine begrenzte Anzahl an Gerätetypen zum Testen zur Verfügung. Ohne die Unterstützung von Nutzern, die DEBUG-Protokolle bereitstellen, lässt sich daher nicht gewährleisten, dass der Adapter alle Gerätetypen korrekt verarbeitet. Jedes Mal, wenn Somfy ein neues Gerät mit Tahoma-Konnektivität veröffentlicht, muss der Adapter möglicherweise angepasst werden, um damit einwandfrei zu funktionieren.

## Warum verwendet der Adapter nicht die offizielle Somfy Open API?

Idealerweise könnten wir für diesen Adapter die [Somfy Open API](https://developer.somfy.com/apis-docs) verwenden, da dies die von Somfy offiziell unterstützte Methode zur technischen Ansteuerung ihrer Geräte ist. Allerdings gibt es bei diesem Ansatz Probleme:

- <span style="color:orange; font-weight: bold"> ZU ÜBERPRÜFEN</span> Die API scheint für Drittanbieter-App-Anbieter konzipiert zu sein, um ihnen die Möglichkeit zu geben, einige Somfy-Geräte über ihr eigenes Frontend zu verwalten. Das Problem dabei ist, dass Somfy den [OAuth2-Autorisierungscode-Grant-Typ](https://developer.somfy.com/apis-docs) verwendet, was im Wesentlichen bedeutet, dass
  - Anmeldeinformationen können nicht direkt an einen Authentifizierungsendpunkt gesendet werden, um ein gültiges Token zu erhalten. Stattdessen muss der Benutzer auf eine Somfy-Anmeldeseite weitergeleitet werden, wo er seine Anmeldeinformationen eingeben muss, um den Client (hier den ioBroker-Adapter) für die Nutzung der Somfy-Geräte-API zu autorisieren. Es muss geprüft werden, ob dies nur eine einmalige Aktion ist. Der Benutzer muss den Adapter mindestens als App im Entwicklerportal einrichten, damit er funktioniert.
  - Es gibt bereits Implementierungen der neuen API für andere Smart-Home-Lösungen, daher ist es grundsätzlich möglich, allerdings muss der Adapter komplett neu geschrieben werden, um dies zu unterstützen.
- <span style="color:orange; font-weight: bold"> EINSCHRÄNKUNG</span> Die offizielle Somfy Open API unterstützt derzeit deutlich weniger Geräte als der (undokumentierte) API-Endpunkt, den der Adapter verwendet. Auch die von dieser API bereitgestellten Geräteinformationen und verwendbaren Befehle sind eingeschränkter als die aktuellen Funktionen des Adapters.
- <span style="color:orange; font-weight: bold">EINSCHRÄNKUNG</span> Somfy wendet von Zeit zu Zeit Ratenbegrenzungen für diese API an, die über folgende Ankündigungen bekannt gegeben werden:

  ```
    Dear customer,

    As you might have noticed, we have updated the quota policy of the Somfy Open API, in an ongoing effort to provide the best services to our users.

    We are contacting you today to inform you about the new rules we are now applying to the API:
    - First of all, no limitation will be applied on the POST /device/{deviceId}/exec endpoint as we want to provide you a total freedom on controlling your devices.
    - On the other hand, polling frequency on the GET /site and child endpoints will now have to be under 1 call per minute.

    To preserve an efficient and available service to any of our users, we want to keep the usage of the Open API to a usable but reasonable level to everybody. As we will keep monitoring the generated traffic and the potential impacts, be aware that we do reserve the rights to modify the authorized polling frequency or take any additional measure at any time as stated in our General Terms of Use.

    Thank you for your understanding.
  ```

## Einige der vom Adapter bereitgestellten Gerätezustände sollten änderbar sein, sind es aber derzeit nicht. Warum?

Da Somfy keine offizielle API-Unterstützung oder Spezifikation anbietet, ist es manchmal schwer zu erkennen, welche Datenfelder von Tahoma-Link änderbar sein sollten und welche nur informellen Zwecken dienen. Wenn Sie der Meinung sind, dass ein Zustand unbedingt änderbar sein sollte (z. B. zur Steuerung des Geräteverhaltens), **könnten Sie Recht haben!** Bitte erstellen Sie dazu ein GitHub-Issue, damit wir dies prüfen können.

## Warum sind manche Konfigurationsoptionen nur in Admin 5.x mit der neuen React-basierten Benutzeroberfläche sichtbar?

Da dies nun (2021) die Standard-GUI sein soll und viel einfacher erweitert werden kann, werden neue Konfigurationsfunktionen nur hier hinzugefügt, um den Implementierungsaufwand überschaubar zu halten.

## Ich möchte meine Geräte lokal steuern, ohne mich mit den Online-Servern von Somfy verbinden zu müssen.

Derzeit gibt es mehrere mögliche Ansätze, um Somfy-Geräte lokal zu steuern, ohne die Somfy-Server über das Internet zu kontaktieren.

### Option A: Die neue lokale API-Funktion des Adapters verwenden

Somfy ermöglicht nun die Aktivierung der lokalen API der Tahoma-Box, wofür jedoch ein Entwicklerkonto erforderlich ist. Weitere Informationen finden Sie [hier](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) . Der Adapter unterstützt diese Funktion ab Version 0.7.

### Option B: _Velux KLF200_ anstelle von Somfy Tahoma/Connexxon/Switch zur Steuerung von E/A-Geräten verwenden

Das Velux KLF 200 ist ein weiteres Gateway, das das IO-Homecontrol-Protokoll implementiert, welches auch von Somfy IO-Geräten verwendet wird. Der Vorteil hierbei ist, dass das Gerät eine lokale Netzwerk-API bietet, mit der sich nicht nur Velux IO-Geräte, sondern auch Somfy IO-Produkte steuern lassen.

- Sie können bis zu 200 E/A-Geräte daran anschließen.
- Es gibt einen ioBroker-Adapter dafür, der bereits hervorragend funktioniert: <https://github.com/MiSchroe/ioBroker.klf200> .
- Der Nachteil ist, dass nicht alle Somfy IO-Produkte unterstützt werden (z. B. funktioniert _Smoove 1 A/M io_ , _Smoove Uno A/M io_ jedoch nicht), daher hängt es weitgehend von den Geräten ab, die Sie anschließen möchten.
- Wenn bereits Geräte zu Ihrem Somfy-Gateway hinzugefügt wurden, müssen Sie dessen Schlüssel mit dem KLF200 teilen, da die Geräte sonst nicht gefunden werden. Nach dem Hinzufügen des Schlüssels können Sie Velux und das Somfy-Gateway parallel zur Steuerung Ihrer E-Mail-Geräte verwenden.

### Option C: \[Gefährlich] Flashen Sie Ihr Somfy Connexoon/Tahoma-Gerät, um die "Lokale API" zu aktivieren.

Die _Local API_ wird/wurde auf einigen Somfy-Produktseiten beworben, scheint aber standardmäßig deaktiviert zu sein. Findige Nutzer haben Wege gefunden, die Firmware des Geräts zu flashen, um SSH-Zugriff zu erhalten: <https://blog.unauthorizedaccess.nl/2021/04/07/no-clouds-just-sunshine.html> oder <https://github.com/Aldohrs/tahoma-jailbreak> . Dadurch lässt sich letztendlich auch die _Local API_ aktivieren, sodass das Gerät aus dem lokalen Netzwerk erreichbar ist.

Allerdings birgt dies auch **erhebliche Risiken** :

- Dies ist zum jetzigen Zeitpunkt weitgehend unerforschtes Terrain, daher ist unklar, für welches Somfy-Gateway (Connexxoon, Tahoma, Switch) es funktionieren wird und welche Teile der Local API tatsächlich nutzbar sind.
- Das Auslesen der Firmware erfordert, dass Sie Ihr Gerät öffnen (Garantie erlischt!) und elektrische Schaltkreise manuell überbrücken, was, wenn es falsch gemacht wird, Ihr Gerät oder Sie selbst beschädigen kann :-().
- Somfy kann solche Änderungen technisch erkennen (z. B. das Starten der lokalen API) und könnte die eindeutige Seriennummer Ihrer Box sperren, wodurch der Zugriff auf die Online-Dienste von Somfy dauerhaft verhindert wird.
- Dies wird wahrscheinlich mit den Software-Updates, die Somfy regelmäßig auf Ihr Gerät aufspielt, in Konflikt geraten, was Folgendes bedeutet:
  - Updates können alle manuell vorgenommenen Änderungen rückgängig machen.
  - Updates funktionieren möglicherweise gar nicht oder beschädigen Ihr Gerät.
  - Updates könnten dieses Jailbreak-Szenario irgendwann unmöglich machen.