import { Box, ToggleButton, ToggleButtonGroup, type BoxProps } from '@mui/material';
import ArrowUpIcon from '../../assets/img/docsIcons/whiteArrowUp.svg';
import ArrowDownIcon from '../../assets/img/docsIcons/whiteArrowDown.svg';
import { useStyles } from './MenuArrowsToggle.styles';
import { useState } from 'react';

interface MenuArrowsToggleProps {
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    value?: 'expand' | 'collapse';
    sx?: BoxProps['sx'];
}

export const MenuArrowsToggle = ({ onExpandAll, onCollapseAll, value: valueProp, sx }: MenuArrowsToggleProps): React.ReactNode => {
    const { classes } = useStyles();
    const [value, setValue] = useState<'expand' | 'collapse'>('expand');
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : value;
    
    const handleExpandAll = () => {
        if (!isControlled) setValue('expand');
        onExpandAll?.();
    };

    const handleCollapseAll = () => {
        if (!isControlled) setValue('collapse');
        onCollapseAll?.();
    };

    return (
        <Box sx={sx} className={classes.menuToggle}>
            <ToggleButtonGroup
                exclusive
                value={currentValue}
            >
                <ToggleButton
                    value="expand"
                    onClick={handleExpandAll}
                >
                    <img
                        alt="ArrowDownIcon"
                        src={ArrowDownIcon}
                    />
                </ToggleButton>
                <ToggleButton
                    value="collapse"
                    onClick={handleCollapseAll}
                >
                    <img
                        alt="ArrowUpIcon"
                        src={ArrowUpIcon}
                    />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
