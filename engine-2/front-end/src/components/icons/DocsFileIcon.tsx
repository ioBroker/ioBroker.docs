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
 * The sheet is **solid**, like the folder of a chapter next to it (`closed_folder.svg` is a
 * filled shape too). It was outlined until 09.09.2026, on the reasoning that a page is the
 * lighter of the two things; in the tree that came out as two different drawing styles one
 * above the other. Denis: *"nimm andere icons, ich denke, lieber volle. passt zu den
 * anderen."* One style for the whole tree beats a fine distinction nobody reads.
 *
 * The two slashes of the brand - the same ones the heading over the page spells out as
 * "// DOKUMENTATION" (Denis, 08.09.2026, asked for something with more character than a
 * blank sheet) - are cut **out** of the sheet with `fill-rule="evenodd"`. They therefore show
 * whatever is behind the row and keep working on the hover and the selected background alike,
 * which a second drawn colour would not.
 */
export default function DocsFileIcon(props: { className?: string }): React.JSX.Element {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={props.className}
            aria-hidden="true"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z
                   M10.736 16.914 13.036 11.514 11.564 10.886 9.264 16.286Z
                   M13.936 16.914 16.236 11.514 14.764 10.886 12.464 16.286Z"
            />
        </svg>
    );
}
