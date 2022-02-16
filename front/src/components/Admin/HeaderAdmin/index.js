import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import logo from 'src/images/NotaBebe_logo.png';

const HeaderAdmin = ({ handleLogout }) => {
  const history = useHistory();

  const LOGOUT = () => {
    // localStorage.removeItem('MyToken');
    // e.preventDefault();
    handleLogout();
    // if (!getToken) {
    history.push('/');
    // }
  };

  return (
    <>
      <header className="headerAdmin">
        <div className="headerAdmin__logoutButton">
          <Button icon="power off" onClick={LOGOUT} />
        </div>
        <h1 className="headerAdmin__title">NotaBebe</h1>
        <div className="headerAdmin__logo">
          <img src={logo} alt="Logo NotaBebe" />
        </div>
      </header>
    </>
  );
};

HeaderAdmin.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default HeaderAdmin;
