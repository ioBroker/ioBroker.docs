import { Box, ToggleButton, ToggleButtonGroup, Tooltip, type BoxProps } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuListIcon from '../../assets/img/whiteMenuList.svg';
import { I18n } from '../../utils/i18n';
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
                    <Tooltip title={I18n.t('adapters.tooltip.menu_expand')}>
                        <img
                            alt="MenuList Icon"
                            src={MenuListIcon}
                        />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton
                    sx={buttonSx}
                    value="installed"
                    onClick={() => onCollapse(true)}
                >
                    <Tooltip title={I18n.t('adapters.tooltip.menu_collapse')}>
                        <KeyboardDoubleArrowLeftIcon />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
