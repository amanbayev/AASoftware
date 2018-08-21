import React, { Component } from 'react';

import { Step, Segment, Icon } from 'semantic-ui-react';
import Schedule from '/imports/ui/Schedule/Schedule';
import ClientsSearchTable from '/imports/ui/Clients/ClientsSearchTable';
import ShortName from '/imports/modules/generate-initials';
import SelectDoctorsServices from '/imports/ui/Staff/SelectDoctorsServices';

import Blank from '/imports/ui/Blank';

export default class NewVisit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 2,
      client: null,
      event: null,
      doctorId: '1234',
    };
    this.handleClientClick = this.handleClientClick.bind(this);
    this.handleEventSelect = this.handleEventSelect.bind(this);
    this.returnClassName = this.returnClassName.bind(this);
  }

  handleClientClick(client) {
    this.setState({
      client,
      step: 2,
    });
  }

  handleEventSelect(event) {
    this.setState({
      event,
    });
    console.log(event);
  }

  returnClassName(position) {
    if (this.state.step == position) {
      return 'active';
    } else if (this.state.step > position) {
      return 'completed';
    } else return '';
  }

  render() {
    return (
      <>
        <Step.Group ordered attached="top">
          <Step className={this.returnClassName(1)}>
            <Step.Content>Выбрать пациента</Step.Content>
          </Step>
          <Step className={this.returnClassName(2)}>
            <Step.Content>Выбрать услугу/врача</Step.Content>
          </Step>
          <Step className={this.returnClassName(3)}>
            <Step.Content>Выбрать дату и время</Step.Content>
          </Step>
          <Step className={this.returnClassName(4)}>
            <Step.Content>Подверждение</Step.Content>
          </Step>
        </Step.Group>
        <Segment attached>
          {this.state.step === 1 && (
            <ClientsSearchTable handleClientClick={this.handleClientClick} />
          )}
          {this.state.step === 2 && <SelectDoctorsServices />}
          {this.state.step === 3 && (
            <>
              <p>Выбранный клиент: {ShortName(this.state.client)}</p>
              <Schedule
                clientId={this.state.client._id}
                doctorId={this.state.doctorId}
                title={ShortName(this.state.client)}
                handleEventSelect={this.handleEventSelect}
              />
            </>
          )}
          {this.state.step === 4 && <Blank />}
        </Segment>
      </>
    );
  }
}
