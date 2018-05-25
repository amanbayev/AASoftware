import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

import { Container } from 'semantic-ui-react';

import Authenticated from '/imports/ui/Authenticated';
import Public from '/imports/ui/Public';

import Login from '/imports/ui/Login';
import TopMenu from '/imports/ui/TopMenu';
import Blank from '/imports/ui/Blank';
import Admin from '/imports/ui/Admin';
import Clients from '/imports/ui/Clients/Clients';
import NotFound from '/imports/ui/NotFound';
import Breadcrumbs from '/imports/ui/Breadcrumbs';

class PropsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, afterLoginPath: null };
    this.setPageReady = this.setPageReady.bind(this);
    this.setAfterLoginPath = this.setAfterLoginPath.bind(this);
  }

  componentDidMount() {
    this.setPageReady();
  }

  setPageReady() {
    this.setState({ ready: true });
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;

    return (
      <>
        <TopMenu location={props.location} history={props.history} />
        <Container>
          <Breadcrumbs location={props.location} />
          <Switch>
            <Public exact path="/" component={Blank} />
            <Authenticated
              path="/admin"
              component={Admin}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Authenticated
              path="/clients"
              component={Clients}
              setAfterLoginPath={setAfterLoginPath}
              {...props}
              {...state}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false, afterLoginPath: null };
    this.setPageReady = this.setPageReady.bind(this);
    this.setAfterLoginPath = this.setAfterLoginPath.bind(this);
  }

  componentDidMount() {
    this.setPageReady();
  }

  setPageReady() {
    this.setState({ ready: true });
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;

    return (
      <Router>
        <Switch>
          <Public exact path="/login" component={Login} {...props} {...state} />
          <Authenticated
            path="/"
            component={PropsWrapper}
            setAfterLoginPath={setAfterLoginPath}
            {...props}
            {...state}
          />
        </Switch>
      </Router>
    );
  }
}

const getUserName = profile =>
  ({
    string: profile,
    object: `${profile.first_name} ${profile.last_name}`,
  }[typeof profile]);

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  let name = user && user.profile && getUserName(user.profile);
  const emailAddress = user && user.emails && user.emails[0].address;
  const authenticated = !loggingIn && !!userId;
  name = name || emailAddress;
  const roles = !loading && Roles.getRolesForUser(userId);
  return {
    loggingIn,
    user,
    userId,
    loading,
    authenticated,
    name,
    roles,
  };
})(App);
