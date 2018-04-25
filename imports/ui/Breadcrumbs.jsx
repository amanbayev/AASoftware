import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import routeNames from '/imports/modules/route-names'

class Breadcrumbs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { pathname } = this.props.location
    let arr = pathname.split('/')
    let sections = []
    let to = ''
    if (pathname == '/') arr = ['']
    arr.forEach((item, i) => {
      if (to == '/') to = ''
      to = to + '/' + item
      let key = 'crumb' + routeNames[item]
      let newCrumb = {
        key: key,
        content: routeNames[item],
        to: to,
        as: Link
      }
      sections.push(newCrumb)
    })
    return <Breadcrumb sections={sections} icon="right chevron" />
  }
}

export default Breadcrumbs
