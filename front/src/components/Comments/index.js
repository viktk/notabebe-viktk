import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from 'src/components/App/Loading';
import { formatDate, formatHour } from 'src/store/selectors/formatDate';
import { filterComments } from 'src/store/selectors/comment';
import HeaderStaff from 'src/containers/HeaderStaff';

import { childSearched } from 'src/store/selectors/user';

import './styles.scss';


const Comments = ({

  recaps,
  onSearchSubmit,
  inputRef,
  searchValue,
  loading,
  loadComments,
  comments,
  loadChildren,
  // child,
  children,
  inputValue,
  onInputValueCommentChange,
}) => {

  useEffect(() => {
    loadChildren();
    loadComments();
  }, []);

  if (loading) {
    return <Loading />;
  }
  

  return (
    <>
      <div>
        <HeaderStaff />
      </div>

      <h1>Les commentaires parents</h1>
      <div className="filter">
        <form onSubmit={onSearchSubmit}>
          <input
            ref={inputRef}
            className="filter__input"
          // fluid
            value={inputValue}
            onChange={(e) => onInputValueCommentChange(e.target.value)}
            placeholder="Filtrer les commentaires"
          />
        </form>
      </div>
      
      <div className="commments__list">
        { filterComments(comments, inputValue).map((comment) => (
          <div key={comment.id} className="commment">

            <h2 className="commment__child"> {comment.first_name}</h2>
            <p className="commment__child__date">
              <span>Date:</span> {formatDate(comment.created_at)} à {formatHour(comment.created_at)}
            </p>

            <p className="commment__message"><span>Message:</span> {comment.message}</p>
          </div>
        ))}
      </div>

      <div>-</div>

    </>
  );
};

export default Comments;
