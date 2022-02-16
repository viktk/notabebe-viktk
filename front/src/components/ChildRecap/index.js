import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Loading from 'src/components/App/Loading';

import HeaderParent from 'src/containers/HeaderParent';
import BasicInfos from './BasicInfos';
import Day from './Day';

import './styles.scss';

const ChildRecap = ({
  loadRecaps,
  loadChildren,
  child,
  loading,
  recap,
  loadParents,
  parent,
  closeCommentSend 

}) => {


const history = useHistory();

const previousPage = () => {
    history.goBack();
    closeCommentSend();
  };

  useEffect(() => {
    loadParents();
    loadChildren();
    loadRecaps();
  }, []);

  if (loading) {
    return <Loading />;
  } 

  

  return (
    <>
      <div>
        <HeaderParent />
      </div>

      <div className="contentChildrecap">
        <div className="childrecap">
          <p className="childrecap__date">{recap.date}</p>

          <BasicInfos recap={recap[0]} child={child} parent={parent} />
          <Day recap={recap[0]} child={child} />
        </div>

        <div className="backButton">
          <div className="backButton__contentButton">
            <button onClick={previousPage} type="button" className="settings__send">Retour</button>
          </div>
        </div>
      </div>
    </>
  );
};

ChildRecap.propTypes = {

};

ChildRecap.defaultProps = {
};

export default ChildRecap;
