import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button, Icon, Table, Form,
} from 'semantic-ui-react';

import Field from 'src/containers/Field';
import logoAdmin from 'src/images/logo_admin.png';
import HeaderAdmin from 'src/containers/HeaderAdmin';

const AddUserAdmin = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  postcode,
  city,
  password,
  roleId,

  handleAddUser,
  changeField,
  roleSelected,
  resetFormAdmin,

  contentAdminPageAdd,
  addUserSuccess,
  addUserError,
}) => {
  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  useEffect(() => {
    resetFormAdmin();
  }, []);

  const handleSubmitAddUser = (e) => {
    e.preventDefault();
    handleAddUser();
  };

  const selectRole = (e) => {
    e.preventDefault();
    roleSelected(e.target.value, e.target.name);
  };

  const previousPage = () => {
    history.goBack();
    resetFormAdmin();
  };

  return (
    <>
      <div className="adminMobileHome">
        <div>
          <HeaderAdmin />
        </div>
        <img src={logoAdmin} className="adminMobileHome__logo" alt="admin" />
        <div className="adminMobileHome__txt">
          Pour une meilleure expérience, veuillez vous connecter à partir d'un ordinateur.
        </div>
      </div>

      <div className="adminDesktopHome">
        <div>
          <HeaderAdmin />
        </div>
        <div className="addUserForm">
          {contentAdminPageAdd
            && (
              <Form onSubmit={handleSubmitAddUser}>
                <Table celled>
                  <Table.Header fullwidth="true" column="equal">
                    <Table.Row>
                      <Table.HeaderCell colSpan="2" textAlign="center">
                        <h1>CREATION ACCES UTILISATEUR</h1>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Nom</div></Table.Cell>
                      <Table.Cell>
                        <Field
                          type="text"
                          name="last_name"
                          // placeholder="Nom"
                          onChange={changeField}
                          value={lastName}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Prénom</div></Table.Cell>
                      <Table.Cell>
                        <Field
                          type="text"
                          name="first_name"
                          // placeholder="Prénom"
                          onChange={changeField}
                          value={firstName}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Adresse mail</div></Table.Cell>
                      <Table.Cell>
                        <Field
                          type="email"
                          name="email"
                          // placeholder="Email"
                          onChange={changeField}
                          value={email}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Numéro de téléphone</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <Field
                          type="text"
                          name="phone_number"
                          pattern="^[0-9]{10}$"
                          // placeholder="Numéro de téléphone"
                          onChange={changeField}
                          value={phoneNumber}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Adresse</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <Field
                          type="text"
                          name="address"
                          // placeholder="Adresse"
                          onChange={changeField}
                          value={address}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Code postal</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <Field
                          type="text"
                          name="postcode"
                          // placeholder="Code postal"
                          onChange={changeField}
                          value={postcode}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Ville</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <Field
                          type="text"
                          name="city"
                          // placeholder="Ville"
                          onChange={changeField}
                          value={city}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Rôle</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <div className="roleSelectedMenu">
                          <select name="role_id" id="role-select" onChange={selectRole}>
                            <option value="0">Rôles</option>
                            <option value="1">1 : Parent</option>
                            <option value="2">2 : Staff</option>
                            <option value="3">3 : Admin</option>
                          </select>
                        </div>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell verticalAlign="middle"><div className="columnTitle">Mot de passe temporaire</div></Table.Cell>
                      <Table.Cell verticalAlign="middle">
                        <Field
                          type="text"
                          name="password"
                          // placeholder="Mot de passe"
                          onChange={changeField}
                          value={password}
                          required
                        />
                      </Table.Cell>
                    </Table.Row>

                  </Table.Body>
                  <Table.Footer fullwidth="true" column="equal" className="footerTable">
                    <Table.Row>
                      <Table.HeaderCell colSpan="2" textAlign="center">
                        <Button
                          type="button"
                          onClick={previousPage}
                          icon="cancel"
                          color="red"
                          size="tiny"
                        />
                        <Button
                          type="submit"
                          icon
                          labelPosition="left"
                          primary
                          size="tiny"
                        >
                          <Icon name="angle right" />Ajouter
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Form>
            )}

          {addUserSuccess
            && (
              <Table celled>
                <Table.Header fullwidth="true" column="equal">
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign="center">
                      <h1>CREATION ACCES UTILISATEUR</h1>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell verticalAlign="middle" textAlign="center">
                      <div className="messageSuccessAddUser">Utilisateur créé</div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Footer fullwidth="true" column="equal">
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign="center">
                      <Button
                        onClick={previousPage}
                        type="button"
                        icon
                        labelPosition="left"
                        primary
                        size="tiny"
                      >
                        <Icon name="angle left" />Retour
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )}

          {addUserError
            && (
              <Table celled>
                <Table.Header fullwidth="true" column="equal">
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign="center">
                      <h1>CREATION ACCES UTILISATEUR</h1>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell verticalAlign="middle" textAlign="center">
                      <div className="messageErrorAddUser">Erreur serveur</div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Footer fullwidth="true" column="equal">
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign="center">
                      <Button
                        onClick={previousPage}
                        type="button"
                        icon
                        labelPosition="left"
                        primary
                        size="tiny"
                      >
                        <Icon name="angle left" />Retour
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )}
        </div>
      </div>
    </>
  );
};

AddUserAdmin.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  password: PropTypes.string,
  roleId: PropTypes.string.isRequired,

  handleAddUser: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  resetFormAdmin: PropTypes.func.isRequired,

  contentAdminPageAdd: PropTypes.bool,
  addUserSuccess: PropTypes.bool,
  addUserError: PropTypes.bool,
};

AddUserAdmin.defaultProps = {
  email: '',
  password: '',
  contentAdminPageAdd: false,
  addUserSuccess: false,
  addUserError: false,
};

export default AddUserAdmin;
