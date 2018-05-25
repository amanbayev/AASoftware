import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class Authenticated extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (Meteor.isClient)
      this.props.setAfterLoginPath(
        `${window.location.pathname}${window.location.search}`,
      );
  }

  render() {
    const {
      loggingIn,
      authenticated,
      component,
      path,
      exact,
      ...rest
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={props =>
          authenticated ? (
            React.createElement(component, {
              ...props,
              ...rest,
              loggingIn,
              authenticated,
            })
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

Authenticated.defaultProps = {
  path: '',
  exact: false,
};

export default Authenticated;
