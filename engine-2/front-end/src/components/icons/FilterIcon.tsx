import React from 'react';

/**
 * The funnel in front of the field above the table of contents of the documentation.
 *
 * Until 15.09.2026 a magnifier stood there, and it promises something the field does not keep:
 * it does not search the text, it filters the list of chapters. Denis: *"make it clear that it is
 * not a search field but a filter. Replace the magnifier icon."* The funnel is the familiar sign
 * for a list that is already there getting shorter.
 *
 * Drawn rather than loaded, so that it takes on the colour of its surroundings, like the other
 * icons in this folder.
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
