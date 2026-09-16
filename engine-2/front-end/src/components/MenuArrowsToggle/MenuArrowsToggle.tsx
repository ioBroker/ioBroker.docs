import { Box, ToggleButton, ToggleButtonGroup, Tooltip, type BoxProps } from '@mui/material';
import ArrowUpIcon from '../../assets/img/docsIcons/whiteArrowUp.svg';
import ArrowDownIcon from '../../assets/img/docsIcons/whiteArrowDown.svg';
import { I18n } from '../../utils/i18n';
import { useStyles } from './MenuArrowsToggle.styles';
import { useState } from 'react';

interface MenuArrowsToggleProps {
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    value?: 'expand' | 'collapse';
    sx?: BoxProps['sx'];
}

export const MenuArrowsToggle = ({
    onExpandAll,
    onCollapseAll,
    value: valueProp,
    sx,
}: MenuArrowsToggleProps): React.ReactNode => {
    const { classes } = useStyles();
    const [value, setValue] = useState<'expand' | 'collapse'>('expand');
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : value;

    const handleExpandAll = (): void => {
        if (!isControlled) {
            setValue('expand');
        }
        onExpandAll?.();
    };

    const handleCollapseAll = (): void => {
        if (!isControlled) {
            setValue('collapse');
        }
        onCollapseAll?.();
    };

    return (
        <Box
            sx={sx}
            className={classes.menuToggle}
        >
            <ToggleButtonGroup
                exclusive
                value={currentValue}
            >
                <ToggleButton
                    value="expand"
                    onClick={handleExpandAll}
                >
                    <Tooltip title={I18n.t('docs.tooltip.expand_all')}>
                        <img
                            alt="ArrowDownIcon"
                            src={ArrowDownIcon}
                        />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton
                    value="collapse"
                    onClick={handleCollapseAll}
                >
                    <Tooltip title={I18n.t('docs.tooltip.collapse_all')}>
                        <img
                            alt="ArrowUpIcon"
                            src={ArrowUpIcon}
                        />
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
