import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Link, useHistory, Redirect } from 'react-router-dom';

import './styles.scss';
import logo from 'src/images/NotaBebe_logo.png';
import Loading from 'src/components/App/Loading';

const Header = ({
  loading, logged, handleLogout, loggedMessage, roleId, userId,
}) => {
  const history = useHistory();

  const getToken = localStorage.getItem('MyToken');

  const LOGOUT = (e) => {
    localStorage.removeItem('MyToken');
    e.preventDefault();
    // handleLogout();
    // if (!getToken) {
    history.push('/');
    // }
  };

  const handleMenu2 = (e) => {
    e.preventDefault();
    if (getToken) {
      history.push('/homepage2');
    }
  };
  const handleMenu3 = (e) => {
    e.preventDefault();
    if (getToken) {
      history.push('/homepage3');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
  // <>
  //   {!logged ? (
  //     <>
  //       <header className="header">
  //         <>
  //           {roleId === 1
  //             ? (
  //               <Dropdown
  //                 icon="content"
  //                 floating
  //                 button
  //                 className="icon iconBurger"
  //               >
  //                 <Dropdown.Menu>
  //                   <Dropdown.Item>{loggedMessage}</Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to={`/profile/parent/${userId}`}>Mon profil</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to="/actualites">Actualités</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item onClick={LOGOUT}>Se déconnecter</Dropdown.Item>
  //                 </Dropdown.Menu>
  //               </Dropdown>
  //             ) : (
  //               <Dropdown
  //                 icon="content"
  //                 floating
  //                 button
  //                 className="icon iconBurger"
  //               >
  //                 <Dropdown.Menu>
  //                   <Dropdown.Item>{loggedMessage}</Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to={`/profile/staff/${userId}`}>Mon profil</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to="/actualites">Actualités</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to="">Listes des commentaires</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item>
  //                     <Link to="">Editer un récap</Link>
  //                   </Dropdown.Item>
  //                   <Dropdown.Item onClick={LOGOUT}>Se déconnecter</Dropdown.Item>
  //                 </Dropdown.Menu>
  //               </Dropdown>
  //             )}
  //         </>
  //         <h1 className="header-title">NotaBebe</h1>
  //         <Link to="/">
  //           <img src={logo} className="header-logo" alt="Logo NotaBebe" />
  //         </Link>
  //       </header>

  //     </>
  //   ) : (
  //     <>
    <header className="header">
      <div className="header-blank" />
      <h1 className="header-title">NotaBebe</h1>
      <Link to="/">
        <img src={logo} className="header-logo" alt="Logo NotaBebe" />
      </Link>
    </header>
  //     </>
  //   )}
  // </>
  );
};

Header.propTypes = {
  logged: PropTypes.bool,
  // handleLogout: PropTypes.func.isRequired,
  loggedMessage: PropTypes.string,
};

Header.defaultProps = {
  logged: false,
  loggedMessage: 'Connecté',
};

export default Header;
