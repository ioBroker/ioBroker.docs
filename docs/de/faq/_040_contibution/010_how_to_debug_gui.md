## Fehler in der Grafische Oberfläche melden
ioBroker hat sehr viele grafische Oberflächen, die mit JavaScript geschrieben sind.

Aktuell viele Oberflächen werden mit ReactJS entwickelt.
Falls ein Fehler in einer solchen Oberfläche auftritt, oder die Reaktion einfriert oder dei Seite verhält sich unerwartet, dann können und sollten Sie den Fehler melden.

Dafür muss man Browserkonsole öffnen und die Fehlermeldungen dort finden.
Die Browserkonsole ist in jedem Browser anders, aber die meisten Browser haben die Konsole in der Entwickleransicht und die Entwickleransicht ist in der Regel mit F12 erreichbar (Chrome, Firefox, Edge) ist.

Es ist wichtig, dass **erst die Browserkonsole geöffnet wird, dann die Seite neu geladen (F5) wird* und dann die Aktionen durchgeführt werden, die den Fehler verursachen.

So sieht die Browserkonsole in Chrome aus:
![Browserkonsole in Chrome](./media/010_browser_console.png)

So sieht eine Fehlermeldung, falls die Konsole erst nach dem Laden der Seite geöffnet wird:
![Fehler ohne Quellen](./media/010_browser_without_sources.png)

Und so, wenn die Konsole vor dem Laden der Seite geöffnet wird:
![Fehler mit Quellen](./media/010_browser_with_sources.png)

Wie man merken konnte, es ist der Dateiname und die Zeilennummer angezeigt, wo der Fehler auftritt.

Mit dieser Information (zusammen mit der Versionsnummer des Adapters) können wir den Fehler reproduzieren oder beheben.