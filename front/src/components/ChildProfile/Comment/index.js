// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Field from 'src/containers/Field';

import { Icon } from 'semantic-ui-react';

import { formatDate, formatHour } from 'src/store/selectors/formatDate';

// == Import : local
import './styles.scss';
import { openFormDeleteComment } from '../../../store/actions/comment';

// == Composant
const Comment = ({
  submitComment,
  commentSend,
  onChangeTextValue,
  name,
  comments,
  onClickOpenModalToFormChangeComment,
  modalOpen,
  parent,
  commentId,
  onClickCancelFormChangeComment,
  patchComment,
  onClickOpenFormDeleteComment,
  formDeleteOpen,
  deleteComment,
  loadComments,
  loadChildren,
  child

}) => {
  useEffect(() => {
    loadChildren(),
      loadComments()
  }, [modalOpen]);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitComment(parent.id, child.id);
  };

  const handleOnChange = (evt) => {
    evt.preventDefault();
    onChangeTextValue(evt.target.value, name);
  };

  const handleClickEdit = (evt) => {
    evt.preventDefault();
    onClickOpenModalToFormChangeComment(evt.target.id);
  };
  const handleClickCancel = (evt) => {
    evt.preventDefault();
    onClickCancelFormChangeComment();
  };
  const handleClickDelete = (evt) => {
    evt.preventDefault();
    onClickOpenFormDeleteComment(evt.target.id);
  };
  
  const handleSubmitPatch = (evt) => {
    evt.preventDefault();
    patchComment(parent.id, child.id, commentId);
  };

  const handleSubmitDelete = (evt) => {
    evt.preventDefault();
    deleteComment(parent.id, parent.child_id, evt.target.id);
  };

  return (

    <>
      {commentSend ? (
        <div className="comment__success">Votre message a bien été envoyé</div>
      ) : (
        <>
          <div>

            <form
              autoComplete="off"
              className="comment"
              onSubmit={handleSubmit}
            >

              <div className="comment__text">
                <label
                  htmlFor="comment"
                  className="comment__text__label"
                >
                  Votre message pour la crèche :
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    className="comment__text__textarea"
                    placeholder="Saisissez votre message..."
                    onChange={handleOnChange}
                  />
                </label>
              </div>

              <button
                className="comment__submitt"
                type="submit"
              >
                Envoyer le message
              </button>
            </form>

          </div>

        </>

      )}

      <div className="comment__allcomments">

        <p className="comment__allcomments__title">Mes messages envoyés:</p>

        {comments.map((comment) => (
          <div
            className="comment__onecomment"
            key={comment.id}
          >
            <div className="comment__onecomment__infos">
              {comment.updated_at ? (
                <p className="comment__onecomment__date">
                  Modifié le {formatDate(comment.updated_at)} à {formatHour(comment.updated_at)}
                </p>
              ) : (
                <p className="comment__onecomment__date">
                  Envoyé le {formatDate(comment.created_at)} à {formatHour(comment.created_at)}
                </p>

              )}

              <div className="comment__onecomment__icons">
                <Icon
                  name="edit"
                  className="comment__onecomment__icons__icon"
                  {...comment}
                  onClick={handleClickEdit}
                />

                <Icon name="ban" className="comment__onecomment__icons__icon" {...comment} onClick={handleClickDelete} />

              </div>
            </div>
            {(commentId == comment.id && modalOpen) ? (
              <div className="comment__onecomment__message">
                <form
                  autoComplete="off"
                  className="comment2"
                  onSubmit={handleSubmitPatch}
                  {...comment}
                >
                  <textarea
                    name="comment"
                    rows="4"
                    className="comment__onecomment__message"
                    placeholder="Modifiez votre message..."
                    onChange={handleOnChange}
                  />
                  <div className="comment__onecomment__buttons">
                    <button
                      className="comment__onecomment__buttons__cancel"
                      type="button"
                      onClick={handleClickCancel}
                    >
                      Annuler
                    </button>
                    <button
                      className="comment__onecomment__buttons__submit"
                      type="submit"
                    >
                      Valider
                    </button>
                  </div>
                </form>

              </div>

            ) : (
              <p className="comment__onecomment__message">
                {comment.message}
              </p>

            )}
            {(commentId == comment.id && formDeleteOpen) ? (
              <div className="comment__formdelete">
                <form
                  autoComplete="off"
                  className="comment__formdelete"
                  onSubmit={handleSubmitDelete}
                  {...comment}
                >
                  <div className="question">Etes vous sûr.e de vouloir supprimer ce commentaire?</div>
                  <div className="comment__onecomment__buttons">
                    <button
                      className="comment__onecomment__buttons__cancel"
                      type="button"
                      onClick={handleClickDelete}
                    >
                      Non
                    </button>
                    <button
                      className="comment__onecomment__buttons__submit"
                      type="submit"
                    >
                      Oui
                    </button>
                  </div>
                </form>

              </div>
            ) : null}

          </div>
        ))}

      </div>

    </>

  );
};

Comment.propTypes = {

};

// == Export
export default Comment;
