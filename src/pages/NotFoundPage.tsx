import React from 'react';
import { Link } from 'react-router-dom';

import { useAccountTranslation } from '@/config/i18n';

const NotFoundPage = (): JSX.Element => {
  const { t } = useAccountTranslation();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('NOT_FOUND_PAGE_TEXT')}</h1>
      <p>{t('NOT_FOUND_Page_MESSAGE')}</p>
      <Link to="/">{t('GO_TO_HOME_TEXT')}</Link>
    </div>
  );
};

export default NotFoundPage;
