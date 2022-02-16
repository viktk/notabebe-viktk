import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import Header from 'src/components/Header';
import HeaderParent from 'src/containers/HeaderParent';
import Loading from 'src/components/App/Loading';

import Children from './Children';
import ChangePasswordForm from './ChangePasswordForm';
import ChangeUserInfosForm from './ChangeUserInfosForm';
import UserInfos from './UserInfos';

import './styles.scss';

const ParentProfile = ({
  openUserInfos,
  isOpenInfos,
  closeForm,
  handleChangeInfos,
  isOpenPassword,
  togglerChangePassword,
  handleChangePassword,
  user,
  loadUsersParents,
  loading,
  changeInfos,
  children,

}) => {

  useEffect(() => {
    loadUsersParents();

  }, []);

  const handleOnClickChangePasswordButton = (e) => {
    e.preventDefault();
    togglerChangePassword();
  };

  const handleOnClickChangeInfosButton = (e) => {
    e.preventDefault();
    openUserInfos();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <HeaderParent />
      </div>

      <div className="parentprofile">

        {!isOpenInfos ? (
          <>
            <UserInfos
              user={user}
              openUserInfos={openUserInfos}
              loadUsersParents={loadUsersParents}
            />
            <button
              type="button"
              className="parentprofile__button"
              onClick={handleOnClickChangeInfosButton}
            >
              Modifier mes informations
            </button>
          </>
        ) : (
          <ChangeUserInfosForm
            closeForm={closeForm}
            handleChangeInfos={handleChangeInfos}
            user={user}
            changeInfos={changeInfos}
            loadUsersParents={loadUsersParents}
          />
        )}

        {!isOpenPassword ? (
          <button
            type="button"
            className="parentprofile__button"
            onClick={handleOnClickChangePasswordButton}
          >
            Changer mon mot de passe
          </button>
        ) : (

          <ChangePasswordForm
            closeForm={closeForm}
            handleChangePassword={handleChangePassword}
            user={user}
          />
        )}

        <Children
          children={children}
          user={user}
        />
      </div>
    </>
  );
};

ParentProfile.propTypes = {
  openUserInfos: PropTypes.func.isRequired,
  isOpenInfos: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  handleChangeInfos: PropTypes.func.isRequired,
  isOpenPassword: PropTypes.bool,
  togglerChangePassword: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,

  // children: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //   }),
  // ).isRequired,

  //   user: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //   }).isRequired,
};

ParentProfile.defaultProps = {
  isOpenInfos: false,
  isOpenPassword: false,
};

export default ParentProfile;
