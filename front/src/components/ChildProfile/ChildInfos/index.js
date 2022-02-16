// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './styles.scss';

// == Composant
const ChildInfos = ({
  parent,
  child,
  loadChildren,
}) => {
  useEffect(() => {
    loadChildren()
  }, [])
  return (
    <div className="childinfos">
      <p className="childinfos__firstname">{child.first_name}</p>
      <p className="childinfos__infos">Date de naissance : {child.birthdate}</p>
      <p className="childinfos__infos">Tél. du parent : {parent.phone_number}</p>
      <div className="childinfos__infos">
        {child.allergies ? (
          <p> Allergies : {child.allergies} </p>
        ) : (
          <p> Allergies : aucune </p>
        )}
      </div>
    </div>
  );
};

ChildInfos.propTypes = {

};

// == Export
export default ChildInfos;
