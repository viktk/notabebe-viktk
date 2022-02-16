import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import logo from 'src/images/NotaBebe_logo.png';

const HeaderStaff = ({
  handleLogout, userId,
}) => {
  const history = useHistory();

  const LOGOUT = () => {
    handleLogout();
    history.push('/');
  };

  const profilMenu = () => {
    history.push(`/profile/staff/${userId}`);
  };

  const childListMenu = () => {
    history.push(`/profile/staff/${userId}/children`);
  };

  const recapsListMenu = () => {
    history.push(`/profile/staff/${userId}/recaps`);
  };

  const commentsListMenu = () => {
    history.push(`/profile/staff/${userId}/comments`);
  };

  return (
    <header className="header">
      <Dropdown
        icon="content"
        floating
        button
        className="icon iconBurger"
      >
        <Dropdown.Menu className="dropMenu">
          <Dropdown.Item onClick={profilMenu}>Mon profil</Dropdown.Item>
          <Dropdown.Item onClick={childListMenu}>Liste des enfants</Dropdown.Item>
          <Dropdown.Item onClick={recapsListMenu}>Liste des récaps</Dropdown.Item>
          <Dropdown.Item onClick={commentsListMenu}>Listes des commentaires</Dropdown.Item>
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

HeaderStaff.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default HeaderStaff;
