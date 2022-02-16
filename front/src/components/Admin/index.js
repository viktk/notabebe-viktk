import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Table, Input, Form } from 'semantic-ui-react';

import HeaderAdmin from 'src/containers/HeaderAdmin';
import logoAdmin from 'src/images/logo_admin.png';

import Loading from '../App/Loading';
// import UsersListData from './data.json';

import './styles.scss';

const AdminHome = ({
  handleDelete,
  error,
  user,
  FormDeleteOpen,
  loading,
  // newSearchValue,
  // onApiChange,
  onApiSubmit,
  // userAPI,
  // loadMoreUsers,
  // getAllUsers,
  // dataUserList,
  onClickOpenFormDeleteUser,
  onClickCloseFormDeleteUser,
  userDeleteId,
  deleteUser,
  deletedUserError,
  deletedUserSuccess,
  checkIsLogged,

}) => {
  const [searchNewValue, setSearchNewValue] = useState('');
  const [UsersListData, setUsersListData] = useState([]);

  useEffect(() => {
    fetch('https://notabebe-backend.herokuapp.com/profile/admin/allusers')
      .then((response) => response.json())
      .then((json) => setUsersListData(json));
  }, [FormDeleteOpen]); // useEffect se relance à chaque fois que le state FormDeleteOpen change

  useEffect(() => {
    // ici on veut vérifier si l'utilisateur est déjà connecté
    // au 1e rendu du composant App
    checkIsLogged();
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  // le hook useLocation nous renvoie l'url courante
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  const addUserPage = () => {
    history.push('/admin/adduser');
  };

  const handleClickEditUser = (id) => {
    history.push('/admin/edituser');
  };

  const handleClickDeleteUserOpen = (id) => {
    onClickOpenFormDeleteUser(id);
  };

  const handleSubmitDelete = (id) => {
    deleteUser(id);
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

        <div className="menu">
          <Link
            className="menu__link"
            activeclassname="menu__link__selected"
            to="/admin"
          >
            Listes des utilisateurs
          </Link>
          <Link
            className="menu__link"
            activeclassname="menu__link__selected"
            to="/actualites"
          >
            Actualités
          </Link>
          <Link
            className="menu__link"
            activeclassname="menu__link__selected"
            to="/admin/contacts"
          >
            Contact
          </Link>
        </div>

        <div className="adminDesktopHome__adminTitle">
          Administration des accès

          {deletedUserSuccess
            && (
              <div className="adminDesktopHome__adminTitle__messageSuccess">
                Utilisateur supprimé
              </div>
            )}

          {deletedUserError
            && (
              <div className="adminDesktopHome__adminTitle__messageError">
                Erreur serveur
              </div>
            )}
        </div>

        <div className="TableListUser">
          <Table celled>
            <Table.Header fullwidth="true">
              <Table.Row>
                <Table.HeaderCell colSpan="4" width="twelve">
                  <Form onSubmit={onApiSubmit}>
                    <Input
                      fullwidth="true"
                      fluid
                      icon="search"
                      iconPosition="left"
                      type="text"
                      placeholder="Filtrer les accès"
                      loading={loading}
                      value={searchNewValue}
                      onChange={(e) => setSearchNewValue(e.target.value)}
                    />
                  </Form>
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="2" textAlign="center">
                  <Button
                    onClick={addUserPage}
                    type="button"
                    icon
                    labelPosition="left"
                    primary
                    size="medium"
                  >
                    <Icon name="add user" /> Créer un accès
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nom</Table.HeaderCell>
                <Table.HeaderCell>Prénom</Table.HeaderCell>
                <Table.HeaderCell>Adresse mail</Table.HeaderCell>
                <Table.HeaderCell>Numéro de téléphone</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Rôle</Table.HeaderCell>
                {/* <Table.HeaderCell textAlign="center">Modifier</Table.HeaderCell> */}
                <Table.HeaderCell textAlign="center">Supprimer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <>
                {
                  UsersListData.filter((user) => {
                    if (searchNewValue === '') {
                      return user;
                    } if (
                      user.first_name.toLowerCase().includes(searchNewValue.toLowerCase())
                      || user.last_name.toLowerCase().includes(searchNewValue.toLowerCase())
                      || user.email.toLowerCase().includes(searchNewValue.toLowerCase())
                      || user.phone_number.toLowerCase().includes(searchNewValue.toLowerCase())
                    ) {
                      return user;
                    }
                  }).map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.last_name}</Table.Cell>
                      <Table.Cell>{user.first_name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.phone_number}</Table.Cell>
                      <Table.Cell textAlign="center">{user.role_id}</Table.Cell>

                      {/* <Table.Cell textAlign="center">
                      <Button icon="edit" onClick={() => handleClickEditUser(user.id)} />
                    </Table.Cell> */}

                      <Table.Cell textAlign="center">
                        {FormDeleteOpen && userDeleteId === user.id ? (
                          <Button.Group size="mini">
                            <Button primary type="button" onClick={() => handleSubmitDelete(user.id)}>Oui</Button>
                            <Button color="red" type="button" onClick={() => handleClickDeleteUserOpen(user.id)}>Non</Button>
                          </Button.Group>
                        ) : (
                          <Button icon="trash alternate" onClick={() => handleClickDeleteUserOpen(user.id)} />
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </>
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

AdminHome.propTypes = {
  loading: PropTypes.bool.isRequired,
  FormDeleteOpen: PropTypes.bool,
  deletedUserSuccess: PropTypes.bool,
  deletedUserError: PropTypes.bool,
  // newSearchValue: PropTypes.string.isRequired,
  // userAPI: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     first_name: PropTypes.string.isRequired,
  //     last_name: PropTypes.string.isRequired,
  //     email: PropTypes.string.isRequired,
  //     phone_number: PropTypes.string.isRequired,
  //     role_id: PropTypes.number.isRequired,
  //   }).isRequired,
  // ).isRequired,

  // userAPI: PropTypes.array.isRequired,
  // onApiSubmit: PropTypes.func.isRequired,
  // onApiChange: PropTypes.func.isRequired,
  // loadMoreUsers: PropTypes.func.isRequired,
  // getAllUsers: PropTypes.func.isRequired,

};

// AdminHome.defaultProps = {
//   FormDeleteOpen: false,
//   deletedUserSuccess: false,
//   deletedUserError: false,
// };

export default AdminHome;
