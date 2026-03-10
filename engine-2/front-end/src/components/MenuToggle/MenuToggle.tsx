import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MenuListIcon from '../../assets/img/whiteMenuList.svg';
import { useStyles } from './MenuToggle.styles';

interface MenuToggleProps {
    value: 'all' | 'installed';
    onChange: (value: 'all' | 'installed') => void;
    onCollapse: (collapsed: boolean) => void;
}

export const MenuToggle = ({ value, onChange, onCollapse }: MenuToggleProps): React.ReactNode => {
    const { classes } = useStyles();

    return (
        <Box className={classes.menuToggle}>
            <ToggleButtonGroup
                exclusive
                value={value}
                onChange={(_, newValue) => newValue && onChange(newValue)}
            >
                <ToggleButton
                    value="all"
                    onClick={() => onCollapse(false)}
                >
                    <img
                        alt="MenuList Icon"
                        src={MenuListIcon}
                    />
                </ToggleButton>
                <ToggleButton
                    value="installed"
                    onClick={() => onCollapse(true)}
                >
                    <Box sx={{ width: 20 }} />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
