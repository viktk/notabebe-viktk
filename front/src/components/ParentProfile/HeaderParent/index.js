import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import logo from 'src/images/NotaBebe_logo.png';

const HeaderParent = ({
  handleLogout, userId,
}) => {
  const history = useHistory();

  const LOGOUT = () => {
    handleLogout();
    history.push('/');
  };

  const profilMenu = () => {
    history.push(`/profile/parent/${userId}`);
  };

  return (
    <header className="header">
      <Dropdown
        icon="content"
        floating
        button
        className="icon iconBurger"
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={profilMenu}>Mon profil</Dropdown.Item>
          <Dropdown.Item onClick={LOGOUT}>Se déconnecter</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1 className="header-title">NotaBebe</h1>
      <Link to="/">
        <img src={logo} className="header-logo" alt="Logo NotaBebe" />
      </Link>
    </header>
  );
};

HeaderParent.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default HeaderParent;
