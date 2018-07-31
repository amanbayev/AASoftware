import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Icon, Image, List } from 'semantic-ui-react';

import StaffCollection from '/imports/api/Staff/Staff';

class ShowStaff extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.ready) {
      const {
        email,
        lastname,
        firstname,
        phone,
        sex,
        notes,
        patronimic,
      } = this.props.staff;
      return (
        <Card>
          <Image src="http://i.pravatar.cc/300" />
          <Card.Content>
            <Card.Header>
              {lastname} {firstname} {patronimic}
            </Card.Header>
            <Card.Meta>{email}</Card.Meta>
            <Card.Description>{phone}</Card.Description>
          </Card.Content>
          <Card.Content>
            <List>
              <List.Item>
                Пол: {sex === 'male' ? 'Мужской' : 'Женский'}
              </List.Item>
              <List.Item>Заметки: {notes}</List.Item>
            </List>
          </Card.Content>
        </Card>
      );
    } else {
      return <div />;
    }
  }
}

export default withTracker(props => {
  const number = props.match.params.number || 0;
  const sub = Meteor.subscribe('findStaff', number);
  return {
    ready: sub.ready(),
    staff: StaffCollection.findOne({ number }),
    ...props,
  };
})(ShowStaff);
