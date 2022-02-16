// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';

// == Import : local
import './styles.scss';

// == Composant
const ChangeChildInfosForm = ({
  hasInfosError,
  closeForm,
  handleChangeInfos,
  parent,
  child,
  loadChildren,
  //user
}) => {
  useEffect(() => {
    loadChildren();
   }, []);

  const handleOnClickCancelButton = (e) => {
    e.preventDefault();
    closeForm();
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
     handleChangeInfos(parent.id, child.id);
  };

  return (
    <form
      autoComplete="off"
      className="changechildinfosform"
      onSubmit={handleSubmit}
    >
      <p className="changechildinfosform__firstname">{child.first_name} </p>
      {/* <p className="changechildinfosform__fullname">{parent.pwc_child_first_name}</p> */}

      <Field
        name="allergy"
        type="text"
        placeholder="Allergies"
      />

      <div className="changechildinfosform__buttons">
        <button
          className="changechildinfosform__buttons__cancel"
          type="button"
          onClick={handleOnClickCancelButton}
        >
          Annuler
        </button>

        <button
          className="changechildinfosform__buttons__send"
          type="submit"
        >
          Valider
        </button>

      </div>
    </form>

  );
};

ChangeChildInfosForm.propTypes = {
  hasInfosError: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  // user: PropTypes.shape({
  //   last_name: PropTypes.string.isRequired,
  //   first_name: PropTypes.string.isRequired,
  //   address: PropTypes.string.isRequired,
  //   postcode: PropTypes.string.isRequired,
  //   city: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   phone_number: PropTypes.string.isRequired,
  //  }).isRequired,
  handleChangeInfos: PropTypes.func.isRequired,

};

ChangeChildInfosForm.defaultProps = {
  hasInfosError: false,
};

// == Export
export default ChangeChildInfosForm;
