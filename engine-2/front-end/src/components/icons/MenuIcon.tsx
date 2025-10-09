import React from 'react';

export default function MenuIcon(props: { style?: React.CSSProperties }): React.JSX.Element {
    return (
        <svg
            style={{ width: 24, height: 24, marginTop: 4, ...props?.style }}
            viewBox="0 0 40 40"
        >
            <path
                d="M5 10H35M5 20H35M5 30H35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
