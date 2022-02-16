import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from 'src/components/App/Loading';
import Field from 'src/containers/Field';

import HeaderStaff from 'src/containers/HeaderStaff';

import { Link } from 'react-router-dom';

import './styles.scss';

const StaffProfile = ({
  loadUsersStaff,
  staff,
  loading,
  hasPasswordError,
  handleChangePassword,
  changePasswordConfirmMessage,
  clearChangePasswordConfirmMessage,

}) => {
  useEffect(() => {
    loadUsersStaff();
    return () => {
      clearChangePasswordConfirmMessage();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSubmitChangePassword = (evt) => {
    evt.preventDefault();
    handleChangePassword(staff.id);
  };


  return (
    <>
      <div>
        <HeaderStaff />
      </div>
      <div className="staff">
        <div className="staff__name">
          {staff.first_name} {staff.last_name}
        </div>
        <div className="staff__button containButton">
          <div className="staff__button__child">
            <Link className="childs__link" to={`/profile/staff/${staff.id}/children`} exact="true">
              <button type="button" className="button">Liste des enfants et création de récap</button>
            </Link>
          </div>
          <div className="staff__button__recap">
            <Link className="recap__link" to={`/profile/staff/${staff.id}/recaps`} exact="true">
              <button type="button" className="button">Liste des récaps déjà créés</button>
            </Link>
          </div>
          <div className="staff__button__comments">
            <Link className="comments__link" to={`/profile/staff/${staff.id}/comments`} exact="true">
              <button type="button" className="button">Les Commentaires des parents</button>
            </Link>
          </div>
        </div>

        {!changePasswordConfirmMessage ? (
          <form
            autoComplete="off"
            className="changepasswordform"
            onSubmit={handleSubmitChangePassword}
          >
            <p> Changer de mot de passe :</p>
            <Field
              name="oldpassword"
              type="password"
              placeholder="Ancien mot de passe"
            />

            <Field
              name="newpassword"
              type="password"
              placeholder="Nouveau mot de passe"
            />

            <Field
              name="confirmpassword"
              type="password"
              placeholder="Confirmez le mot de passe"
            />

            <div className="changepasswordform__buttons">
              <button
                className="changepasswordform__buttons__send"
                type="submit"
              >
                Valider
              </button>
            </div>

            {hasPasswordError && <div>Veuillez vérifier vos identifiants</div>}
          </form>
        )
          : (
            <p className="changepasswordform">{changePasswordConfirmMessage}</p>
          )}

      </div>
    </>
  );
};

StaffProfile.propTypes = {

};

export default StaffProfile;
