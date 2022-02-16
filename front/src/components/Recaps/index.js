import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import recaps from 'src/store/middlewares/recap';
import HeaderStaff from 'src/containers/HeaderStaff';
import Loading from 'src/components/App/Loading';
import { filterRecaps } from 'src/store/selectors/recap';

import { childSearched } from 'src/store/selectors/user';
import './styles.scss';

// Dans mon composant FilterRecaps ci dessous, j'y ai mis:
// Le titre
// Le filtre de recherche
// Le rendu des récaps

const Recaps = ({
  recaps,
  onSearchSubmit,
  inputRef,
  searchValue,
  loading,
  inputValue,
  onInputValueRecapChange,
  loadRecaps,
  loadChildren,
  children,
}) => {
  useEffect(() => {
    loadChildren();
    loadRecaps();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <HeaderStaff />
      </div>

      <div className="recaps">
        <h1 className="recaps__title">Mes récapitulatifs enfants </h1>
        <h2>{recaps.length}</h2>
        <div className="recaps__filter">
          <form onSubmit={onSearchSubmit}>
            <input
              ref={inputRef}
              className="recaps__filter__input"
          // fluid
              value={inputValue}
              onChange={(e) => onInputValueRecapChange(e.target.value)}
              placeholder="Filtrer les récaps"
            />
          </form>
        </div>

        <div className="recaps__listing">
          { filterRecaps(recaps, inputValue).map((recap) => (
            <div key={recap.id} className="recaps__listing__recap">
              <h1 className="recaps__listing__recap__title">{recap.first_name} - {recap.date}</h1>
              <span className="recaps__listing__recap__mood">Son humeur: {recap.mood}</span>
              { recap.naps ? (
                <>
                  <span className="recaps__listing__recap__nap"> Sieste(s): </span>
                  {recap.naps.map((nap) => (
                    <div key={nap.id}>
                      <p className="recaps__listing__recap__nap__time"> {nap.start_time} - {nap.end_time} : </p>
                      <p className="recaps__listing__recap__nap__comment">- {nap.comment}</p>
                    </div>
                  ))}
                </>
              ) : null}
              { recap.meals ? (
                <>
                  <span className="recaps__listing__recap__meal"> Repas: </span>
                  {recap.meals.map((meal) => (
                    <div
                      key={meal.id}
                    >
                      <p className="recaps__listing__recap__meal__comment"> - {meal.comment} </p>
                    </div>
                  ))}
                </>
              ) : null}
              <p className="recaps__listing__recap__otherscomment"><span>Divers:</span> {recap.extra_info}</p>

            </div>
          ))}
        </div>
      </div>
    </>

  );
};

Recaps.propTypes = {

};

export default Recaps;
