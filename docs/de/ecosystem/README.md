---
title:       "Rund um ioBroker"
lastChanged: "08.09.2026"
---

# Rund um ioBroker

Die meisten Kapitel dieser Dokumentation beschreiben, was auf Ihrem eigenen
Rechner passiert. Dieses hier beschreibt, was darum herum liegt: welche Daten
das Projekt sammelt, wohin ein abgestürzter Adapter meldet, und welche
Internetadressen zu ioBroker gehören.

Das sind die Themen, zu denen es außerhalb dieser Dokumentation kaum
verlässliche Auskunft gibt. Im Forum kursieren dazu Vermutungen, und die sind
meistens entweder zu misstrauisch oder zu sorglos.

## Die Seiten dieses Kapitels

**[Nutzungsstatistik](/docs/ecosystem/statistics.md)**
Was eine Installation über sich meldet, wo das eingestellt wird, welche vier
Stufen es gibt und was auf der Statistikseite dieser Website daraus entsteht.

**[Absturzmeldungen](/docs/ecosystem/sentry.md)**
Wie ein abgestürzter Adapter seinen Entwickler erreicht, was dabei übertragen
wird und wie sich das für die ganze Installation, einen Host oder eine einzelne
Instanz abschalten lässt.

**[Adapterbewertungen](/docs/ecosystem/rating.md)**
Wer die Sterne im Admin vergeben darf, warum sie sich immer auf eine bestimmte
Version beziehen und was in einen Kommentar gehört und was nicht.

**[Adressen und Dienste](/docs/ecosystem/domains.md)**
Welche Internetadresse wozu gehört, und welche davon Ihre Installation von sich
aus anspricht.

## Der kurze Überblick

Wer nur wissen will, ob ioBroker nach Hause telefoniert: ja, in zwei genau
umrissenen Fällen, und beide lassen sich abschalten.

Das eine ist die **Nutzungsstatistik**. Sie meldet, mit welcher Node.js-Version
und auf welcher Plattform Sie arbeiten und welche Adapter installiert sind,
verbunden mit einer Zufallskennung, aber ohne Ihren Namen und ohne Ihre Daten.
Daraus entsteht die öffentliche Statistik, an der sich ablesen lässt, welche
Node.js-Versionen noch unterstützt werden müssen und ob ein Adapter noch
benutzt wird.

Das andere sind die **Absturzmeldungen**. Stürzt ein Adapter ab, geht der
Fehlertext an seinen Entwickler. Auch das ohne Ihre Daten.

Beides steht in denselben Systemeinstellungen, im Reiter *Statistik*. Wer dort
**keins** wählt, sendet nichts.

Alles Übrige, was Ihre Installation an Verbindungen aufbaut, geht auf Adapter
zurück, die Sie selbst eingerichtet haben, und auf das Abrufen der
Adapterliste.
