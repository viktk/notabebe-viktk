import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Header from 'src/containers/Header';

import './styles.scss';
import error404 from 'src/images/Error404.png';

const Error = () => {
  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  const previousPage = () => {
    history.goBack();
  };

  return (
    <>
      {/* <div>
        <Header />
      </div> */}
      <div className="error-page">
        <img src={error404} className="error404" alt="error 404" />
        <div className="error-txt">
          <p className="error-txt__title">Oups !</p>
          <em>Une erreur vient de se produire</em>
        </div>
        <Button
          type="button"
          onClick={previousPage}
          icon
          labelPosition="left"
          primary
          size="tiny"
        >
          <Icon name="angle left" />Retour
        </Button>
      </div>
    </>
  );
};

export default Error;
