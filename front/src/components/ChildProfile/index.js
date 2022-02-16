import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


import { useLocation, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Loading from 'src/components/App/Loading';

// import Header from 'src/components/Header';
import HeaderParent from 'src/containers/HeaderParent';

import ChildRecap from 'src/components/ChildRecap';
import ChildInfos from './ChildInfos';
import ChangeChildInfosForm from './ChangeChildInfosForm';
import Comment from './Comment';

import './styles.scss';

const ChildProfile = ({
  user,
  child,
  openUserInfos,
  isOpenInfos,
  closeForm,
  handleChangeInfos,
  submitComment,
  comment,
  commentSend,
  onChangeTextValue,
  loadRecaps,
  loading,
  //recap,
  loadComments,
  comments,
  onClickOpenModalToFormChangeComment,
  modalOpen,
  commentId,
  onClickCancelFormChangeComment,
  patchComment,
  onClickOpenFormDeleteComment,
  formDeleteOpen,
  deleteComment,
  loadChildren,
  loadParents,
  parent


  // loadUsersParents,

}) => {

  //const data = useLocation();

  useEffect(() => {
    loadParents();
    loadChildren();
    loadRecaps();
    loadComments();
  }, []);

  if (loading) {
    return <Loading />;
  }



  // we retrieve the data of the parent and the child through Link of Children in ParentProfile
  // we could use this informations for the parent and the child
  // I called it parent but the child's information is available too



  const handleOnClickChangeInfosButton = (e) => {
    e.preventDefault();
    openUserInfos();
  };


  return (

    <>
      <div>
        <HeaderParent />
      </div>
      <div className="childprofile">

        {!isOpenInfos ? (
          <>
            <ChildInfos
              openUserInfos={openUserInfos}
              parent={parent}
              child={child}
              loadChildren={loadChildren}
            />

            <button
              type="button"
              className="childprofile__button"
              onClick={handleOnClickChangeInfosButton}
            >
              Modifier les informations
            </button>
          </>
        ) : (
          <>
            <ChangeChildInfosForm
              closeForm={closeForm}
              handleChangeInfos={handleChangeInfos}
              parent={parent}
              child={child}
              loadChildren={loadChildren}
            />
          </>
        )}

        <Link
          to={`/profile/parent/${parent.id}/child/${child.id}/recap`}
        >
          <button
            type="button"
            className="childprofile__button childprofile__button__recap"
          >
            <Icon name="list ul" />
            Récap du jour
          </button>
        </Link>

        <Comment
          submitComment={submitComment}
          commentSend={commentSend}
          onChangeTextValue={onChangeTextValue}
          comments={comments}
          onClickOpenModalToFormChangeComment={onClickOpenModalToFormChangeComment}
          modalOpen={modalOpen}
          parent={parent}
          commentId={commentId}
          onClickCancelFormChangeComment={onClickCancelFormChangeComment}
          patchComment={patchComment}
          onClickOpenFormDeleteComment={onClickOpenFormDeleteComment}
          formDeleteOpen={formDeleteOpen}
          deleteComment={deleteComment}
          loadComments={loadComments}
          loadChildren={loadChildren}
          child={child}
        />

      </div>
    </>
  );
};

// if (user.length === 1) {
//   return (
//     <>

//       <header className="header">
//         <Header />
//       </header>
//       <div className="childprofile">

//         {!isOpenInfos ? (
//           <>
//             <ChildInfos
//               openUserInfos={openUserInfos}
//               user={user}
//             />

//             <button
//               type="button"
//               className="childprofile__button"
//               onClick={handleOnClickChangeInfosButton}
//             >
//               Modifier les informations
//             </button>
//           </>
//         ) : (
//           <>
//             <ChangeChildInfosForm
//               closeForm={closeForm}
//               handleChangeInfos={handleChangeInfos}
//               user={user}
//             />
//           </>
//         )}

//         <Link
//           to="/profile/parent/1/child/1/recap"
//         >
//           <button
//             type="button"
//             className="childprofile__button childprofile__button__recap"
//           >
//             Récap du jour
//           </button>
//         </Link>

//         <Comment
//           submitComment={submitComment}
//           commentSend={commentSend}
//           onChangeTextValue={onChangeTextValue}
//         />

//       </div>

//     </>
//   );
// }
// else if (user.length === 2) {

// }

// };

ChildProfile.propTypes = {

};

ChildProfile.defaultProps = {
};

export default ChildProfile;
