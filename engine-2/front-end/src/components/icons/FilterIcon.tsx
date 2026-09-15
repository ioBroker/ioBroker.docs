import React from 'react';

/**
 * Der Trichter vor dem Feld über dem Doku-Verzeichnis.
 *
 * Dort stand bis zum 15.09.2026 eine Lupe, und die verspricht etwas, was das Feld nicht
 * einlöst: Es durchsucht nicht den Text, es filtert die Kapitelliste. Denis: *"mache
 * deutlich, dass es kein Suchfeld ist, sondern Filter. Lupensymbol ersetzen."* Der Trichter
 * ist das gewohnte Zeichen dafür, dass eine vorhandene Liste kleiner wird.
 *
 * Gezeichnet statt geladen, damit er die Farbe seiner Umgebung annimmt, wie die übrigen
 * Zeichen in diesem Ordner auch.
 */
export default function FilterIcon(): React.JSX.Element {
    return (
        <svg
            style={{ width: 18, height: 18 }}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M2.5 4.5H21.5L14 13V20.5L10 22.5V13L2.5 4.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
