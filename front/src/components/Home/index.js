import React, { useEffect } from 'react';
import {
  Link, Redirect, useLocation, useHistory,
} from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';
import Header from 'src/containers/Header';
import jwtDecode from 'jwt-decode';
import logoHome from 'src/images/baleines.png';

import './styles.scss';

const Home = ({
  changeField,
  handleLogin,
  errorMessage,
  contentHome,
  user,
  logged,
  token,
  checkIsLogged,
}) => {
  useEffect(() => {
    // ici on veut vérifier si l'utilisateur est déjà connecté
    // au 1e rendu du composant App
    checkIsLogged();
  }, []);

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  const previousPage = () => {
    history.goBack();
  };
  const getToken = localStorage.getItem('MyToken');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // if (tokenLocal && jwtDecode(tokenLocal).exp > Date.now() / 1000 (

  return (
    <>
      {getToken ? (
      // {getToken && jwtDecode(getToken).exp < Date.now() / 1000 ? (
        <>
          {user.roleId === 1
            && (
              <Redirect to={`/profile/parent/${user.userId}`} />
            )}

          {user.roleId === 2
            && (
              <Redirect to={`/profile/staff/${user.userId}`} />
            )}

          {user.roleId === 3
            && (
              <Redirect to="/admin" />
            )}
        </>

      ) : (
      // {!getToken && (
        <>
          <div>
            <Header />
          </div>

          <div className="containerMain">
            {contentHome
              && (
                <>
                  <div className="loginForm">
                    <div className="loginForm__title">
                      Connexion
                    </div>
                    {errorMessage
                      && (
                        <div className="loginForm__errorMsg">
                          <p className="loginForm__errorMsg__error">
                            Erreur de connexion
                          </p>
                          <p className="loginForm__errorMsg__errorBis">
                            Veuillez vérifier vos identifiants
                          </p>
                        </div>
                      )}
                    <form autoComplete="off" className="loginForm__content" onSubmit={handleSubmit}>
                      <Field
                        name="email"
                        placeholder="Adresse Email"
                        type="email"
                        required
                      />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        required
                      />
                      <button
                        type="submit"
                        className="settings__send"
                      >
                        Se connecter
                      </button>
                      <Link to="/forgot">
                        <p className="settings__forgottxt">
                          Mot de passe oublié
                        </p>
                      </Link>
                    </form>
                  </div>

                  <div className="backButton">
                    <Link
                      className="backButton__contentButton"
                      exact="true"
                      to="/contact"
                    >
                      <button type="button" className="settings__send">Contactez-nous</button>
                    </Link>
                  </div>
                  <div>
                    <img src={logoHome} className="homeLogo" alt="Logo home" />
                  </div>
                </>
              )}
          </div>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.bool,
  contentHome: PropTypes.bool,
};

Home.defaultProps = {
  errorMessage: false,
  contentHome: true,
};

export default Home;
