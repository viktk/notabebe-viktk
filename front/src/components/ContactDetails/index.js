import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from 'src/containers/Header';

import { Icon } from 'semantic-ui-react';

import './styles.scss';

const ContactDetails = () => {
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
      <div>
        <Header />
      </div>

      <div className="contact">

        <div className="contact__nursery">
            <h1 className="contact__nursery__title">Pour contacter la crèche:</h1>
            <div className="contact__nursery__details">
              <p className="contact__nursery__adress"><Icon name="home" />7 rue des bambins, 75000 Paris</p>
              <p className="contact__nursery__mail"><Icon name="mail" />contact-creche@notabebe.fr</p>
              <p className="contact__nursery__phone"><Icon name="phone" />01.23.45.67.89</p>
            </div>
        </div>

          <div className="contact__admin">
            <h1 className="contact__admin__title">Pour contacter l'Administrateur du site:</h1>
            <div className="contact__admin__details">
              <p><Icon name="mail" />admin@notabebe.fr</p>
            </div>
          </div>

          <div className="contact__dev">
            <h1 className="contact__dev__title">Pour contacter l'équipe de conception du site:</h1>
            <div className="contact__dev__details">
              <p><Icon name="mail" />notabebe.dev@gmail.com</p>
            </div>
          </div>
      </div>

        <div className="backButton">
          <div className="backButton__contentButton">
            <button onClick={previousPage} type="button" className="settings__send">Retour</button>
          </div>
        </div>
    </>
  );
};

export default ContactDetails;
