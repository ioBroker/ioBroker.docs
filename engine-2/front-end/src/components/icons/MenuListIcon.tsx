import React from 'react';

/**
 * The list mark of the menu toggle - the same drawing as `assets/img/whiteMenuList.svg`,
 * but inline and in `currentColor` so the button around it can colour it.
 */
export default function MenuListIcon(props: { style?: React.CSSProperties }): React.JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 6"
            fill="none"
            style={{ width: 18, height: 7.2, ...props?.style }}
        >
            <rect
                width="3.92857"
                height="2"
                rx="1"
                fill="currentColor"
            />
            <rect
                x="4.71436"
                width="9.42857"
                height="2"
                rx="1"
                fill="currentColor"
            />
            <rect
                y="4"
                width="3.92857"
                height="2"
                rx="1"
                fill="currentColor"
            />
            <rect
                x="4.71436"
                y="4"
                width="9.42857"
                height="2"
                rx="1"
                fill="currentColor"
            />
        </svg>
    );
}
