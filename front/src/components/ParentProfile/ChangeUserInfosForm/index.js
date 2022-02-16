// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';
import UserInfos from '../UserInfos';

// == Import : local
import './styles.scss';

// == Composant
const ChangeUserInfosForm = ({
  hasInfosError,
  closeForm,
  handleChangeInfos,
  user,
  changeInfos,
  loadUsersParents,

}) => {
  useEffect(() => {
    loadUsersParents();
  }, []);

  const handleOnClickCancelButton = (e) => {
    e.preventDefault();
    closeForm();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleChangeInfos(user.id);
  };

  return (
    <>
      {changeInfos ? (
        <>
          <UserInfos />
          {/* <UserInfos /> */}
          <div className="success">Vos données ont été modifiées</div>
        </>
      ) : (
        <>
          <form
            autoComplete="off"
            className="changeuserinfosform"
            onSubmit={handleSubmit}
          >
            <p className="changeuserinfosform__fullname">{user.last_name} {user.first_name} </p>
            <p className="changeuserinfosform__email">{user.email}</p>

            <Field
              name="address"
              type="text"
              placeholder="Adresse"
              value={user.address}
            />

            <Field
              name="postcode"
              type="text"
              placeholder="Code postal"
              value={user.postcode}
            />

            <Field
              name="city"
              type="text"
              placeholder="Commune"
              value={user.city}
            />

            <Field
              name="phone_number"
              type="text"
              placeholder="Numéro de téléphone"
              value={user.phone_number}
            />
            <div className="changeuserinfosform__buttons">
              <button
                className="changeuserinfosform__buttons__cancel"
                type="button"
                onClick={handleOnClickCancelButton}
              >
                Annuler
              </button>

              <button
                className="changeuserinfosform__buttons__send"
                type="submit"
              >
                Valider
              </button>

            </div>
          </form>
        </>
      )}

      {/* voir comment gérer l'erreur une fois qu'on pourra se connecter au back */}

      {hasInfosError && <div>Une erreur s'est produite, veuillez recommencer</div>}

    </>
  );
};

ChangeUserInfosForm.propTypes = {
  hasInfosError: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    last_name: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
  handleChangeInfos: PropTypes.func.isRequired,

};

ChangeUserInfosForm.defaultProps = {
  hasInfosError: false,
};

// == Export
export default ChangeUserInfosForm;
