import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Footer = () => {
  const getToken = localStorage.getItem('MyToken');

  return (
    <>
      {getToken ? (

        <div className="footer">
          <a href="#" className="mention__link">Mentions légales</a>
          <br />
          <Link to="/devteams" className="devteam">Développé par &#9829; NotaBebe-Tardis</Link>
        </div>

      ) : (

        <div className="footer">
          <a href="#" className="mention__link">Mentions légales</a>
          <br />
          <Link to="/devteam" className="devteam">Développé par &#9829; NotaBebe-Tardis</Link>
        </div>

      )}
    </>
  );
};

export default Footer;
