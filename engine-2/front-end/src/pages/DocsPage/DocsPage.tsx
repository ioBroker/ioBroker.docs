import { Box } from '@mui/material';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { docsData } from './DocsData';
import { useParams } from 'react-router-dom';
import { MarkdownView } from '../../components/MarkdownView/MarkdownView';
import { useStyles } from './DocsPage.styles';

const DocsPage = (): React.ReactNode => {
    const params = useParams();
    const { classes } = useStyles();
    return (
        <Box>
            <SectionTitle>{I18n.t('home.docs.title')}</SectionTitle>
            <Box className={classes.root}>
                <DocsMenu docsData={docsData} />
                {/* {`https://www.iobroker.net/en/${params['*']}`} */}
                <MarkdownView url={`/api/iobroker/en/${params['*']}`} />
            </Box>
        </Box>
    );
};

export default DocsPage;
