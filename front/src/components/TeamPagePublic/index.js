import React from 'react';
import { Link } from 'react-router-dom';

import Header from 'src/components/Header';

import rosa from '../../images/rosa.jpg';
import morgane from '../../images/morgane.jpg';
import victor from '../../images/victor.jpg';
import blandine from '../../images/blandine.jpg';
import toufik from '../../images/toufik.png';

import linkedin from '../../images/linkedin.png';
import github from '../../images/github.png';

import './styles.scss';

const TeamPagePublic = () => (
  <>
    <Header />
    <div className="team__page__container">
      <div className="team__page">
        <div className="team__page__front">
          <div className="team__page__item">
            <img className="team__page__item__img" src={rosa} alt="rosa" width="140px" />
            <h2 className="team__page__item__name">Rosa</h2>
            <p className="team__page__item__text">Product owner et développeuse front</p>
            <p className="team__page__item__text__tech">Référente technique React-Redux</p>
            <span className="team__page__item__logos">
              <a href="https://github.com/RosaHuisman" target="_blank" rel="noreferrer"><img className="team__page__item__logos__github" src={github} alt="github" width="30px" /></a>
              <a href="https://www.linkedin.com/in/rosa-huisman-480237216/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__linkedin" src={linkedin} alt="linkedin" width="30px" /></a>
            </span>
          </div>

          <div className="team__page__item">
            <img className="team__page__item__img" src={victor} alt="victor" width="140px" />
            <h2 className="team__page__item__name">Victor</h2>
            <p className="team__page__item__text">Lead développeur front</p>
            <p className="team__page__item__text__tech">Référent technique JWT et Netlify</p>
            <span className="team__page__item__logos">
              <a href="https://github.com/viktk" target="_blank" rel="noreferrer"><img className="team__page__item__logos__github" src={github} alt="github" width="30px" /></a>
              <a href="https://www.linkedin.com/in/victor-cao-2021/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__linkedin" src={linkedin} alt="linkedin" width="30px" /></a>
            </span>
          </div>

          <div className="team__page__item">
            <img className="team__page__item__img" src={toufik} alt="toufik" width="140px" />
            <h2 className="team__page__item__name">Toufik</h2>
            <p className="team__page__item__text">Scrum master et développeur front</p>
            <p className="team__page__item__text__tech">Référent technique React</p>
            <span className="team__page__item__logos">
              <a href="https://github.com/webtoufik" target="_blank" rel="noreferrer"><img className="team__page__item__logos__github" src={github} alt="github" width="30px" /></a>
              <a href="https://www.linkedin.com/in/toufik-bezzaouya-1bb97828/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__linkedin" src={linkedin} alt="linkedin" width="30px" /></a>
            </span>
          </div>
        </div>

        <div className="team__page__back">
          <div className="team__page__item">
            <img className="team__page__item__img" src={morgane} alt="morgane" width="140px" />
            <h2 className="team__page__item__name">Morgane</h2>
            <p className="team__page__item__text">Git master et développeuse back</p>
            <p className="team__page__item__text__tech">Référente technique PostgreSQL</p>
            <span className="team__page__item__logos">
              <a href="https://github.com/MorganeBENUREAU/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__github" src={github} alt="github" width="30px" /></a>
              <a href="https://www.linkedin.com/in/morganebenureau/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__linkedin" src={linkedin} alt="linkedin" width="30px" /></a>
            </span>
          </div>

          <div className="team__page__item">
            <img className="team__page__item__img" src={blandine} alt="blandine" width="140px" />
            <h2 className="team__page__item__name">Blandine</h2>
            <p className="team__page__item__text">Lead développeuse back</p>
            <p className="team__page__item__text__tech">Référente technique Heroku</p>
            <span className="team__page__item__logos">
              <a href="https://github.com/blandinejar" target="_blank" rel="noreferrer"><img className="team__page__item__logos__github" src={github} alt="github" width="30px" /></a>
              <a href="https://www.linkedin.com/in/blandine-jarysta/" target="_blank" rel="noreferrer"><img className="team__page__item__logos__linkedin" src={linkedin} alt="linkedin" width="30px" /></a>
            </span>
          </div>
        </div>
      </div>
      <Link to="/">
        <div className="button-settings-back button-settings-back-team">
          Retour à l'accueil
        </div>
      </Link>
    </div>
  </>
);

export default TeamPagePublic;
