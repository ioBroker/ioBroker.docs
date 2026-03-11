import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowUpIcon from '../../assets/img/docsIcons/whiteArrowUp.svg';
import ArrowDownIcon from '../../assets/img/docsIcons/whiteArrowDown.svg';
import { useStyles } from './MenuArrowsToggle.styles';

interface MenuArrowsToggleProps {
    value: 'all' | 'installed';
    onChange: (value: 'all' | 'installed') => void;
    onCollapse: (collapsed: boolean) => void;
    onExpandAll: (expand: boolean) => void;
}

export const MenuArrowsToggle = ({ value, onChange, onCollapse, onExpandAll }: MenuArrowsToggleProps): React.ReactNode => {
    const { classes } = useStyles();
    
    const handleExpandAll = () => {
        onExpandAll(true);
    };

    const handleCollapseAll = () => {
        onExpandAll(false);
    };

    return (
        <Box className={classes.menuToggle}>
            <ToggleButtonGroup
                exclusive
                value={value}
                onChange={(_, newValue) => newValue && onChange(newValue)}
            >
                <ToggleButton
                    value="all"
                    onClick={handleExpandAll}
                >
                    <img
                        alt="ArrowDownIcon"
                        src={ArrowDownIcon}
                    />
                </ToggleButton>
                <ToggleButton
                    value="installed"
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
