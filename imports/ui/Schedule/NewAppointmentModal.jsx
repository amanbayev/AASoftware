import React, { Component } from 'react';

import { Button, Header, Image, Modal } from 'semantic-ui-react';

export default class NewAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button onClick={this.show.bind(this)}>Default</Button>
        <Modal dimmer="blurring" open={open} onClose={this.close}>
          <Modal.Content image>
            <Image wrapped size="medium" src="/left_tooth1.png" />
            <Modal.Description>
              <Header>Default profile picture</Header>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
