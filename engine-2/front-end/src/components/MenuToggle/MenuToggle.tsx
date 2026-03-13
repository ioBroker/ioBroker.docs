import { Box, ToggleButton, ToggleButtonGroup, type BoxProps } from '@mui/material';
import MenuListIcon from '../../assets/img/whiteMenuList.svg';
import { useStyles } from './MenuToggle.styles';

interface MenuToggleProps {
    value: 'all' | 'installed';
    onChange: (value: 'all' | 'installed') => void;
    onCollapse: (collapsed: boolean) => void;
    sx?: BoxProps['sx'];
    buttonSx?: BoxProps['sx'];
}

export const MenuToggle = ({ value, onChange, onCollapse, sx, buttonSx }: MenuToggleProps): React.ReactNode => {
    const { classes } = useStyles();

    return (
        <Box className={classes.menuToggle}>
            <ToggleButtonGroup
                sx={sx}
                exclusive
                value={value}
                onChange={(_, newValue) => newValue && onChange(newValue)}
            >
                <ToggleButton
                    sx={buttonSx}
                    value="all"
                    onClick={() => onCollapse(false)}
                >
                    <img
                        alt="MenuList Icon"
                        src={MenuListIcon}
                    />
                </ToggleButton>
                <ToggleButton
                    sx={buttonSx}
                    value="installed"
                    onClick={() => onCollapse(true)}
                >
                    <Box sx={{ width: 20 }} />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
