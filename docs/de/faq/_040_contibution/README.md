# Contribution (Beitrag)
Es gibt unterschiedliche Möglichkeiten, wie Sie an der Entwicklung von ioBroker mitwirken können. 
Wir haben die wichtigsten Möglichkeiten in diesem Kapitel zusammengefasst.

## Dokumentation
Die Dokumentation ist ein wichtiger Bestandteil von ioBroker. Sie ist die erste Anlaufstelle für neue Nutzer, die sich mit ioBroker beschäftigen möchten.

Die Dokumentation ist in diesem GitHub Repository zu finden und z.B. dieser Text ist hier zu editieren: [docs/en/faq_040_contribution/README.md](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/faq/_040_contibution/README.md).

Die Dokumentation kann in einer von 3 Sprachen geschrieben werden: English (preferred), Deutsch und Russisch.

Die Texte und Seiten sind in Markdown geschrieben und kann mit jedem Texteditor bearbeitet werden, oder direkt im Browser auf GitHub.
 
Sie können die Sprache benutzen, die Ihnen am besten gefällt.
Wenn Sie eine Sprache nicht beherrschen, können Sie auch eine Übersetzung von Google verwenden.
Wir werden die Texte dann korrigieren. Das wichtigste, dass die Texte verständlich sind und ihre Willen nicht nur im Kopf bleiben, sondern auch auf dem Papier (auf GitHub) gespeichert sind.

Achten Sie darauf in welche Sprache ein existierendes Dokument erfasst ist. Wenn ganz oben `translatedFrom: XX` steht, dann wird dieses Dokument aus einer anderen Sprache übersetzt und alle Ihre Änderungen werden dann wieder überschrieben.
Wenn Sie das Dokument aber in genau diese Sprache bearbeiten möchten, dann löschen Sie bitte den `translatedFrom` Eintrag, damit das Dokument nicht wieder übersetzt wird.

Es ist aber besser original Sprache zu bearbeiten, da wir dann die Synchronisierung zwischen Sprachen leichter machen können.

## Fehler melden
Falls Sie einen Fehler in ioBroker finden, dann können Sie diesen bei entsprechenden Adapter auf GutHub melden.

Dafür benötigen Sie einen kostenlosen GitHub Account. Wenn Sie noch keinen haben, dann können Sie sich hier registrieren: [github.com](https://github.com).
Die Registrierung dauert nur wenige Sekunden, aber das wird uns enorm helfen, die Fehler zu pflegen und zu beheben. 

Bitte denken Sie daran, dass der Entwickler nicht ihre Gedanken lesen kann.
Wenn Sie einen Fehler melden, dann beschreiben Sie bitte genau, was Sie gemacht haben, was passiert ist und was Sie erwartet haben.
Es hilft sehr, wenn Error logs auch mit angehängt werden. Auch Screenshots sind sehr hilfreich.

Bitte vergessen Sie nicht die Versionsnummer des Adapters und die Version von `ioBroker.js-controller` zu erwähnen.

Wie man die grafische Fehler (die im Browser vorkommen) melden sollte, finden Sie [hier](./010_how_to_debug_gui.md).

Bitte nicht vergessen, dass man ioBroker-Protokolle auch im CLI anschauen kann:
- `iob logs` um die letzten 100 Zeilen der Protokolle anzuzeigen,
- `iob logs --w` um die Protokolle in Echtzeit anzuzeigen.

## Entwicklung
Es kann passieren, dass Sie selbst einen Adapter entwickeln möchten oder sogar am ioBroker Core mitarbeiten möchten.

Beides ist möglich. :)

Um einen Adapter zu entwickeln, gibt es eine [Anleitung](../dev/adapterdev.md).

## Fragen auf ioBroker Forum beantworten
Sie können auch damit helfen, wenn Sie die Fragen auf dem ioBroker Forum beantworten.
Es kommen jeden Tag die neuen Anwender und die haben Fragen, weil die Dokumentation nicht ausreichend ist oder nicht verständlich ist.

## Ideen einbringen
Wenn Sie eine Idee haben, wie ioBroker verbessert werden kann, dann können Sie diese auf dem ioBroker Forum diskutieren oder [hier](https://github.com/ioBroker/AdapterRequests/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+is%3Aopen) eine Wünsch platzieren.
Falls Ihre Idee genügend Unterstützung bekommt, dann wird sie in die Roadmap aufgenommen.
 