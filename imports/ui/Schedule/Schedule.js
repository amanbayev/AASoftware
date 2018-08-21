import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Grid } from 'semantic-ui-react';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';

import NewAppointmentModal from './NewAppointmentModal';

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

      contentHeight: 400,

      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сент',
        'Окт',
        'Ноя',
        'Дек',
      ],

      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNames: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      views: {
        agenda: {
          timeFormat: 'H:mm',
        },
      },
      slotLabelFormat: 'H:mm',
      timeFormat: 'H:mm',
      allDaySlot: false,
      editable: true,
      droppable: true,
      selectable: true,
      minTime: '09:00',
      maxTime: '20:00',
      firstDay: 1,
      slotDuration: '00:30',
      scrollTime: '09:00',
      columnFormat: 'ddd DD/MM',
      displayTime: true,
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
          <NewAppointmentModal />
        </div>
      </div>
    );
  }
}
