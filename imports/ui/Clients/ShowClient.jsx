import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
  Card,
  Icon,
  Image,
  List,
  Container,
  Divider,
  Grid,
} from 'semantic-ui-react';

import ClientsCollection from '/imports/api/Clients/Clients';
import ClientCard from '/imports/ui/ClientRecordCard/ClientCard';

class ShowClient extends React.Component {
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
      } = this.props.client;
      return (
        <Grid style={{ paddingTop: '32px' }}>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={5} computer={4}>
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
            </Grid.Column>
            <Grid.Column mobile={16} tablet={11} computer={12}>
              <ClientCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return <div />;
    }
  }
}

export default withTracker(props => {
  const number = props.match.params.number || 0;
  const sub = Meteor.subscribe('findClient', number);
  return {
    ready: sub.ready(),
    client: ClientsCollection.findOne({ number }),
    ...props,
  };
})(ShowClient);
