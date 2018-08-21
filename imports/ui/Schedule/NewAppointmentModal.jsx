import React, { Component } from 'react';

import { Button, Header, Radio, Modal, Form } from 'semantic-ui-react';

export default class NewAppointmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      visitType: 'consulting',
    };
    moment().locale('ru');
  }

  // handles radio button change for visit type
  handleRadio = (e, { value }) => this.setState({ visitType: value });

  // triggers showing of modal
  show = () => this.setState({ open: true });

  // triggers hiding of modal, also calls parent method (handler) passed in props to save state
  close = () => {
    this.setState({ open: false });
    this.props.handler();
  };

  // triggers hiding but also saves and confirms visit
  save = () => {
    this.setState({ open: false });
    this.props.saver(this.state.visitType);
  };

  render() {
    // used for shorthand
    const { open } = this.state;
    const selectedDate = this.props.clickedEvent.start;

    return (
      // small sized, blur background
      <Modal size="tiny" dimmer="blurring" open={open} onClose={this.close}>
        <Modal.Content>
          <Modal.Description>
            {/* create new appointment label */}
            <Header>Создать новое посещение?</Header>
            Вы выбрали {moment(selectedDate).format('LLLL')} для посещения.
            <Form>
              <Form.Field>Выберите тип посещения:</Form.Field>
              <Form.Field>
                <Radio
                  label="Консультация"
                  value="consulting"
                  checked={this.state.visitType === 'consulting'}
                  onChange={this.handleRadio}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Лечение"
                  value="treatment"
                  checked={this.state.visitType === 'treatment'}
                  onChange={this.handleRadio}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.close}>
            Отмена
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Подтвердить"
            onClick={this.save}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
