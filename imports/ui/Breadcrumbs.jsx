import React, { Component } from 'react';
import { Breadcrumb, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routeNames from '/imports/modules/route-names';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { pathname } = this.props.location;
    let arr = pathname.split('/');
    let sections = [];
    let to = '';
    if (pathname == '/') arr = [''];
    arr.forEach((item, i) => {
      if (to == '/') to = '';
      to = to + '/' + item;
      let routeName = routeNames[item];
      if (routeName == undefined) routeName = 'Просмотр';
      const key = 'crumb' + routeName;
      const newCrumb = {
        key: key,
        content: routeName,
        to: to,
        as: Link,
      };
      sections.push(newCrumb);
    });
    return (
      <Grid.Row>
        <Breadcrumb sections={sections} icon="right chevron" />
      </Grid.Row>
    );
  }
}

export default Breadcrumbs;
