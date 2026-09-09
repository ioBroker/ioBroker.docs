---
title:       "Begriffserklärungen"
lastChanged: "08.09.2026"
---

# Begriffserklärungen

Rund um ioBroker begegnen einem eine Handvoll Begriffe, die man kennen muss, um
Anleitungen und Forumsbeiträge zu verstehen. Hier stehen sie, alphabetisch.

* **Adapter**

    Ein Modul für ein Gerät, einen Dienst oder eine Funktion. Weil ioBroker
    durchgehend aus Modulen besteht, ist fast alles ein Adapter: die
    Admin-Oberfläche, die Visualisierung, die Skriptausführung. Siehe
    [Controller und Adapter](/docs/basics/adapter.md).

* **Admin**

    Der Adapter, der die Weboberfläche bereitstellt, üblicherweise unter Port
    8081. Über ihn läuft alles: Adapter installieren, Instanzen anlegen,
    Objekte ansehen, Skripte schreiben. Siehe
    [Admin-Oberfläche](/docs/admin/README.md).

* **Alias**

    Ein virtueller Datenpunkt, der auf einen echten zeigt. Damit lassen sich
    Name, Rolle und Einheit eines fremden Datenpunkts ändern, ohne den Adapter
    anzufassen. Siehe [Alias](/docs/basics/alias.md).

* **Backup**

    Eine Sicherung der Installation. Das ioBroker-Backup enthält Objekte,
    Zustände und Konfigurationen, **nicht** aber die aufgezeichneten Messwerte.
    Siehe [Datensicherung](/docs/config/backup.md).

* **Blockly**

    Grafische Programmierung: Skripte werden aus Bausteinen zusammengesteckt
    statt geschrieben. Beim Speichern entsteht daraus JavaScript, das dann
    ausgeführt wird. Programmierkenntnisse sind nicht nötig.

* **CCU**

    *Central Control Unit*, die Smarthome-Zentrale von eQ-3 für Homematic. Die
    aktuelle Ausführung ist die CCU3. Mit ihr lassen sich Homematic- und
    Homematic-IP-Geräte steuern, in Funk- wie in Wired-Ausführung.

* **Datenpunkt**

    Umgangssprachlich die Stelle, an der ein Wert steht. Genauer besteht sie aus
    zwei Teilen: dem **Objekt**, das den Wert beschreibt, und dem **Zustand**,
    der ihn enthält. Siehe [Zustände](/docs/basics/states.md).

* **Gerät**

    Englisch *device*. Eine Ebene im Objektbaum, meist direkt unter dem Adapter,
    die alle Kanäle und Zustände eines Geräts zusammenfasst.

* **Homematic**

    Ein Smarthome-System von eQ-3, in Deutschland weit verbreitet. Die Geräte
    werden über eine CCU angebunden.

* **Host**

    Der Rechner, auf dem ioBroker läuft. Im Multihost-Betrieb gibt es mehrere.

* **Instanz**

    Ein laufender Prozess eines Adapters. Die meisten Adapter erlauben mehrere,
    damit sich zum Beispiel zwei Hue-Bridges getrennt einrichten lassen. Die
    Instanznummer steht im Objektbaum vorn: `hue.0` und `hue.1`. Siehe
    [Controller und Adapter](/docs/basics/adapter.md).

* **JavaScript**

    Die Programmiersprache, in der ioBroker und seine Adapter geschrieben sind
    und in der sich auch eigene Skripte schreiben lassen.

* **js-controller**

    Der Hauptprozess von ioBroker. Er verwaltet die beiden Datenbanken, startet
    die Instanzen, überwacht sie und startet sie im Fehlerfall neu. Siehe
    [js-controller](/docs/dev/controller.md).

* **jsonl**

    Das voreingestellte Dateiformat der beiden internen Datenbanken. Löst das
    ältere `file`-Format ab und ist deutlich schneller. Siehe
    [Redis](/docs/config/redis.md).

* **Kanal**

    Eine Ebene, die zusammengehörige Zustände gruppiert, meist unterhalb eines
    Geräts. Ein Gerät kann mehrere Kanäle haben.

* **Kategorie**

    Englisch *enum*. Eine Liste von Objekten, die zusammengehören: alle Geräte
    eines Raums, alle Lampen im Haus. Siehe
    [Kategorien](/docs/basics/enums.md).

* **Multihost**

    Der Betrieb über mehrere Rechner hinweg, etwa um Last zu verteilen oder eine
    Schnittstelle zu nutzen, die nur an einem bestimmten Gerät hängt. Ein Host
    führt dabei die Datenbanken, die anderen verbinden sich dorthin. Siehe
    [Multihost](/docs/config/multihost.md).

* **Node-Red**

    Grafische Programmierung durch Verketten fertiger Bausteine zu einem
    Ablauf. Eine Alternative zu Blockly, mit eigener Oberfläche.

* **Objekt**

    Die Beschreibung eines Datenpunkts: Name, Datentyp, Einheit, Rolle, ob er
    les- und schreibbar ist. Das Objekt ändert sich selten, der Zustand
    ständig. Siehe [Objekte](/docs/basics/objects.md).

* **Redis**

    Eine Datenbank, die ihre Daten im Arbeitsspeicher hält. In ioBroker
    wahlweise für die Zustände zu gebrauchen, was auf größeren Anlagen die
    Schreibzugriffe auf die Karte oder Platte deutlich verringert. Siehe
    [Redis](/docs/config/redis.md).

* **Repository**

    Die Liste, aus der die Adapter kommen. Es gibt zwei: *stable* für den
    Regelbetrieb und *beta* zum Testen. Siehe
    [Repositories](/docs/basics/repositories.md).

* **Rolle**

    Wofür ein Wert steht: Schalter, Temperatur, Helligkeit. Oberflächen und
    Sprachassistenten richten sich danach. Siehe
    [Rollen von Datenpunkten](/docs/basics/roles.md).

* **State**

    Siehe Zustand.

* **vis / vis-2**

    Die Visualisierung: eigene Bedienoberflächen, aus Widgets zusammengestellt.
    **vis-2** ist der Nachfolger und für neue Projekte die richtige Wahl. Siehe
    [Visualisierungen](/docs/viz/README.md).

* **Widget**

    Ein Bedienelement in einer Visualisierung. Es zeigt einen Zustand an oder
    steuert ihn, etwa ein Schalter, der sein Aussehen mitändert.

* **Zustand**

    Englisch *state*. Der aktuelle Wert eines Datenpunkts, zusammen mit dem
    Zeitstempel, dem Zeitpunkt der letzten Änderung und dem Bestätigungskennzeichen
    (`ack`). Siehe [Zustände](/docs/basics/states.md).
