import React from 'react';
import { useStyles } from './Button.styles';

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    className?: string;
    href?: string;
    target?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className,
    href,
    target,
}) => {
    const { classes, cx } = useStyles();

    const buttonClass = cx(classes.button, variant === 'primary' ? classes.primary : classes.secondary, className);

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={buttonClass}
                style={{ textDecoration: 'none', display: 'inline-block' }}
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
