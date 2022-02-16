// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { napTime } from 'src/store/selectors/formatDate'

import './styles.scss';

// == Composant
const Day = ({
  recap,
  child,  

}) => {
  return (
  <div className="day">

    
    { recap.naps && recap.naps.length > 1 ? (
       <>
        <p className="day__designation">Les siestes :</p>
        <div>{recap.naps.map((nap) => (
        <p key={nap.id} className="day__result"> {napTime(nap.start_time)} - {napTime(nap.end_time)} : {nap.comment}</p>
      ))}
       </div>
       </>
    ) : recap.naps && recap.naps.length === 1 ? (
        <>
        <p className="day__designation">Horaires de la sieste :</p>
        <p key={recap.naps[0].id} className="day__result"> {recap.naps[0].start_time} - {recap.naps[0].end_time} : {recap.naps[0].comment}</p>
      </>
    
    ) : recap.naps === null ? (
      <p>{child.first_name} n'a pas fait de sieste aujourd'hui</p>
    ) : null }
    <p className="day__designation">Repas :</p>

    { recap.meals ? (
      <div >{recap.meals.map((meal) => (
        <p key={meal.id} className="day__result"> {meal.comment} </p>
      ))}
      </div>
    ) : null }

    <p className="day__designation">Infos complémentaires :</p>
    <p className="day__result">{recap.extra_info}</p>

  </div>
  )};

// == Export
export default Day;
