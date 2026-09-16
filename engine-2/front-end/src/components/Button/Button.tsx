import React from 'react';
import { useStyles } from './Button.styles';

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    href?: string;
    target?: string;
    /** only meaningful together with `target` - a new tab gets `noopener` */
    rel?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className,
    href,
    target,
    rel,
}) => {
    const { classes, cx } = useStyles();

    const buttonClass = cx(classes.button, variant === 'primary' ? classes.primary : classes.secondary, className);

    if (href) {
        return (
            // no inline `display` here: it would beat the class and drop the flex
            // centring, which left every label sitting against the left padding
            <a
                href={href}
                target={target}
                rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
                className={buttonClass}
                style={{ textDecoration: 'none' }}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
