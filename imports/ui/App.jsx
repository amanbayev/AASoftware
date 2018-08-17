import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

import { Container } from 'semantic-ui-react';

import Authenticated from '/imports/ui/Authenticated';
import Public from '/imports/ui/Public';

import Login from '/imports/ui/Login';
import TopMenu from '/imports/ui/TopMenu';
import Breadcrumbs from '/imports/ui/Breadcrumbs';

// START old pages
import Blank from '/imports/ui/Blank';
import Admin from '/imports/ui/Admin';
import Clients from '/imports/ui/Clients/Clients';
import Staff from '/imports/ui/Staff/Staff';
import NotFound from '/imports/ui/NotFound';
import Naryads from '/imports/ui/Naryads/Naryads';
// END old pages

// START new pages
import Visit from '/imports/ui/Visit/Visit';
// END new pages

import Landing from './Landing';

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

  renderAuthenticated = (path, component, exact = false) => {
    return (
      <Authenticated
        exact={exact}
        path={path}
        component={component}
        setAfterLoginPath={this.setAfterLoginPath}
        {...this.props}
        {...this.state}
      />
    );
  };

  render() {
    const { props, state, setAfterLoginPath } = this;

    return (
      <>
        <TopMenu
          location={props.location}
          history={props.history}
          userId={props.userId}
        />
        <Container>
          <Breadcrumbs location={props.location} />
          <div style={{ marginTop: '16px' }}>
            <Switch>
              {this.renderAuthenticated('/', Blank, true)}
              <Public exact path="/blank" component={Blank} />
              {this.renderAuthenticated('/admin', Admin)}
              {this.renderAuthenticated('/clients', Clients)}
              {this.renderAuthenticated('/staff', Staff)}
              {this.renderAuthenticated('/naryads', Naryads)}
              {/* // new routes */}
              {this.renderAuthenticated('/visit', Visit)}
              {/* end new routes */}
              <Route component={NotFound} />
            </Switch>
          </div>
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
          <Route exact path="/landing" component={Landing} />
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
