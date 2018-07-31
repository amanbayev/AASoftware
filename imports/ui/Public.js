import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Public = ({
  loggingIn,
  authenticated,
  afterLoginPath,
  component,
  path,
  exact,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !authenticated ? (
        React.createElement(component, {
          ...props,
          ...rest,
          loggingIn,
          authenticated,
        })
      ) : (
        <Redirect to={afterLoginPath || '/landing'} />
      )
    }
  />
);

Public.defaultProps = {
  path: '',
  exact: false,
  afterLoginPath: null,
};

export default Public;
