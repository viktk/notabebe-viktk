import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';
import Header from 'src/containers/Header';

import './styles.scss';

const ForgotPassword = ({
  handleForgot,
  messageForgot,
  successMessage,
  errorMessage,
}) => {
  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  const previousPage = () => {
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgot();
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="contentForgot">
        <div className="ForgotP">
          <div className="ForgotP__txt">
            <p className="ForgotP__txt__title">Mot de passe oublié ?</p>
            <p className="ForgotP__txt__subtitle">
              {messageForgot && 'Remplissez le formulaire et nous vous enverrons un email vous permettant de réinitialiser votre mot de passe.'}
              {errorMessage && <p className="setting__error">Oups! Erreur de saisie</p>}
              {successMessage && <p className="setting__success">Demande envoyée !</p>}
            </p>

          </div>
          <form autoComplete="off" className="loginForm__content" onSubmit={handleSubmit}>
            <Field
              name="email"
              placeholder="Adresse Email"
              type="email"
              required
            />
            <button
              type="submit"
              className="settings__send"
            >
              Réinitialiser le mot de passe
            </button>
          </form>
        </div>

        <div className="backButton">
          <div className="backButton__contentButton">
            <button onClick={previousPage} type="button" className="settings__send">Retour</button>
          </div>
        </div>
      </div>

    </>
  );
};

ForgotPassword.propTypes = {
  // handleForgot: PropTypes.func.isRequired,
  successMessage: PropTypes.bool,
  errorMessage: PropTypes.bool,
  messageForgot: PropTypes.bool,
};

ForgotPassword.defaultProps = {
  messageForgot: true,
  successMessage: false,
  errorMessage: false,
};

export default ForgotPassword;
