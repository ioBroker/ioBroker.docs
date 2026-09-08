import type React from 'react';

/**
 * The document sheet in front of the first entry of the documentation tree.
 *
 * It used to be `assets/img/docsIcons/blueFolder.svg`, whose colour was baked in. The entry
 * was therefore blue at all times and looked selected even while another page was open -
 * exactly what the highlight is supposed to mean. Drawn here instead of loaded as a file, so
 * that it takes the colour of its row: quiet while the row is not the current page, accent
 * while it is.
 *
 * The folded corner is a hole in the same path (`fill-rule: evenodd`), not a second shape in
 * the background colour - that way it stays a hole on every surface the icon sits on.
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 3H13.2L19 8.8V20C19 20.55 18.55 21 18 21H6C5.45 21 5 20.55 5 20V4C5 3.45 5.45 3 6 3ZM13.8 4.6V9.4H18.6L13.8 4.6Z"
                fill="currentColor"
            />
        </svg>
    );
}
