// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

// == Import : local
import './styles.scss';

// == Composant
const Children = ({
  children,
  user,


}) => {
  return (
    <div className="children">
      {children.length > 1 ? (
        <h3 className="children__title">Mes enfants</h3>
      ) : (
        <h3 className="children__title"> Mon enfant</h3>
      )}
      <div className="children__infos">
        {children.map((parent) =>
        (
          <Link
            key={parent.child_id}
            to={{
              pathname: `/profile/parent/${parent.id}/child/${parent.child_id}`,
              state: {
                parent: parent,
              },
            }}
          >
            <div className="children__infos__child">
              <Icon
                name="user"
                size="huge"
                className="children__infos__child__icon"
              />
              <div className="children__infos__child__name">{parent.pwc_child_first_name}</div>
            </div>
          </Link>

        ))}
      </div>
    </div>

  );
}
Children.propTypes = {
  // children: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     firstname: PropTypes.string.isRequired,
  //   }),
  // ),
  // user: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  // }).isRequired,
};

// == Export
export default Children;
