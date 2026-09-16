import React from 'react';

export default function CloseIcon(props: { style?: React.CSSProperties }): React.JSX.Element {
    return (
        <svg
            viewBox="0 0 48 48"
            style={{ width: 48, height: 48, ...props.style }}
        >
            <path
                d="M14 14L34 34M14 34L34 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
