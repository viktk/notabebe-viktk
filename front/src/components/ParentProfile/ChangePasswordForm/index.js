// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';

// == Import : local
import './styles.scss';

// == Composant
const ChangePasswordForm = ({
  hasPasswordError,
  handleChangePassword,
  closeForm,
  user,

}) => {

  const handleSubmitChangePassword = (evt) => {
    evt.preventDefault();
    handleChangePassword(user.id);
  };

  const handleOnClickCancelButton = () => {
    closeForm();
  };

  return (
    <form
      autoComplete="off"
      className="changepasswordform"
      onSubmit={handleSubmitChangePassword}
    >
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
          className="changepasswordform__buttons__cancel"
          type="button"
          onClick={handleOnClickCancelButton}
        >
          Annuler
        </button>

        <button
          className="changepasswordform__buttons__send"
          type="submit"
        >
          Valider
        </button>
      </div>

      {/* voir comment gérer l'erreur une fois qu'on pourra se connecter au back */}

      {hasPasswordError && <div>Veuillez vérifier vos identifiants</div>}
    </form>

  );
};

ChangePasswordForm.propTypes = {
  // user: PropTypes.shape({
  //     oldpassword: PropTypes.string.isRequired,
  //     newpassword: PropTypes.string.isRequired,
  //     confirmpassword: PropTypes.string.isRequired,
  // }).isRequired,
  hasPasswordError: PropTypes.bool,
  handleChangePassword: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,

};

ChangePasswordForm.defaultProps = {
  hasPasswordError: false,
};

// == Export
export default ChangePasswordForm;
