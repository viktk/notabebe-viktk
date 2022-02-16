import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const getToken = localStorage.getItem('MyToken');

  return (
    <Route
      {...rest}
      render={(props) => (getToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
