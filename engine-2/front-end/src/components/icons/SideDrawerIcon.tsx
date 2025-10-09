import React from 'react';

export default function SideDrawerIcon(props: { style?: React.CSSProperties; active?: boolean }): React.JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43"
            height="30"
            fill="none"
            style={{ marginTop: 6, ...props.style }}
            viewBox="0 0 43 30"
        >
            <g>
                <rect
                    x="4.08691"
                    y="6.84766"
                    width="3.01678"
                    height="3.13043"
                    rx="1.50839"
                    fill="var(--textColor)"
                />
                <rect
                    x="7.60596"
                    y="6.84766"
                    width="7.54194"
                    height="3.13043"
                    rx="1.56522"
                    fill="var(--textColor)"
                />
                <rect
                    x="4.08691"
                    y="11.543"
                    width="3.01678"
                    height="3.13043"
                    rx="1.50839"
                    fill="var(--textColor)"
                />
                <rect
                    x="7.60596"
                    y="11.543"
                    width="7.54194"
                    height="3.13043"
                    rx="1.56522"
                    fill="var(--textColor)"
                />
                <rect
                    x="1"
                    y="1"
                    width="41"
                    height="28"
                    rx="9"
                    stroke={props.active ? 'var(--primary)' : 'var(--textColor)'}
                    strokeWidth="2"
                />
                <line
                    x1="20.5454"
                    y1="1.30469"
                    x2="20.5454"
                    y2="29.8047"
                    stroke={props.active ? 'var(--primary)' : 'var(--textColor)'}
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
}
