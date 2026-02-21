import { Box } from '@mui/material';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { docsData } from './DocsData';
import { useParams } from 'react-router-dom';

const DocsPage = (): React.ReactNode => {
    const params = useParams();
    return (
        <Box>
            <SectionTitle>{I18n.t('home.docs.title')}</SectionTitle>
            <DocsMenu docsData={docsData} />
            {`https://www.iobroker.net/en/${params['*']}`}
        </Box>
    );
};

export default DocsPage;
