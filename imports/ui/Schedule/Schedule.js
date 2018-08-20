import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Grid } from 'semantic-ui-react';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          title: 'Default event',
          start: new Date(),
          end: new Date(Date.now + 30 * 60 * 1000),
        },
      ],
    };
    moment.locale('ru');
    this.onEventSelect = this.onEventSelect.bind(this);
  }

  onEventSelect = (start, end) => {
    const events = this.state.events;

    const newEventsSource = events.concat({
      title: `Event #${events.length}`,
      start: start.toDate(),
      end: end.toDate(),
    });

    this.setState({
      events: newEventsSource,
    });
  };

  render() {
    const calendarOptions = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      header: false,

      id: 'calendar-example',
      defaultView: 'agendaWeek',
      defaultDate: new Date(),
      timezone: 'local',

      editable: true,
      droppable: true,
      selectable: true,
      minTime: '09:00',
      maxTime: '20:00',

      slotDuration: '00:30',
      scrollTime: '09:00',
      columnFormat: 'ddd DD/MM',
      displayTime: true,
      firstDay: 1,
      lang: 'ru',
      select: this.onEventSelect,

      // please, use funciton events source for reactivity support
      events: (start, end, timezone, callback) => {
        callback(this.state.events);
      },
    };

    return (
      <div className="row">
        <div className="calendar">
          <FullCalendar options={calendarOptions} />
        </div>
      </div>
    );
  }
}
