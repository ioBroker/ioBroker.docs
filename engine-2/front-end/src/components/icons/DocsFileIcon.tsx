import type React from 'react';

/**
 * The mark in front of a top level page of the documentation tree.
 *
 * It used to be `assets/img/docsIcons/blueFolder.svg`, whose colour was baked in. The entry
 * was therefore blue at all times and looked selected even while another page was open -
 * exactly what the highlight is supposed to mean. Drawn here instead of loaded as a file, so
 * that it takes the colour of its row: quiet while the row is not the current page, accent
 * while it is.
 *
 * The sheet itself is outlined rather than filled: beside the solid folder of a chapter it
 * would otherwise be the heavier of the two, and it is the lighter thing. Inside it carries
 * the two slashes of the brand, the same ones the heading over the page spells out as
 * "// DOKUMENTATION" (Denis, 08.09.2026, asked for something with more character than a
 * blank sheet). They sit below the folded corner, where the page has room for them.
 *
 * 1.6 is the stroke: at the 22 px the row gives the icon, 1.5 goes thin next to Roboto 700
 * and 2 closes the gap between the two slashes.
 */
export default function DocsFileIcon(props: { className?: string }): React.JSX.Element {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={props.className}
            aria-hidden="true"
        >
            <path
                d="M13 3H6.5C5.67 3 5 3.67 5 4.5v15c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5V9L13 3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M13 3v4.5c0 .83.67 1.5 1.5 1.5H19"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M10 16.6 12.3 11.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M13.2 16.6 15.5 11.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}
