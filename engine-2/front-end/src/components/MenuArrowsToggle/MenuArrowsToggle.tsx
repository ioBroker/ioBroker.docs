import { Box, ToggleButton, ToggleButtonGroup, type BoxProps } from '@mui/material';
import ArrowUpIcon from '../../assets/img/docsIcons/whiteArrowUp.svg';
import ArrowDownIcon from '../../assets/img/docsIcons/whiteArrowDown.svg';
import { useStyles } from './MenuArrowsToggle.styles';
import { useState, type Dispatch, type SetStateAction} from 'react';

interface MenuArrowsToggleProps {
    onExpandAll: Dispatch<SetStateAction<boolean>> | undefined
    sx?: BoxProps['sx'];
}

export const MenuArrowsToggle = ({ onExpandAll,  sx, }: MenuArrowsToggleProps): React.ReactNode => {
    const { classes } = useStyles();
    const [value, setValue] = useState<'expand' | 'collapse'>('expand');
    
    const handleExpandAll = () => {
        setValue('expand');
        onExpandAll?.(true);
    };

    const handleCollapseAll = () => {
        setValue('collapse');
        onExpandAll?.(false);
    };

    return (
        <Box sx={sx} className={classes.menuToggle}>
            <ToggleButtonGroup
                exclusive
                value={value}
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
