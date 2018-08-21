import React, { Component } from 'react';

import { FullCalendar } from 'meteor/jss:fullcalendar-react';
import { withTracker } from 'meteor/react-meteor-data';

import AppointmentsCollection from '/imports/api/Staff/Appointments';

import NewAppointmentModal from './NewAppointmentModal';

class Schedule extends Component {
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
      clickedEvent: {},
      show: false,
    };
    moment.locale('ru');
    this.onEventSelect = this.onEventSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveAppointment = this.saveAppointment.bind(this);
  }

  closeModal() {
    this.setState({ show: false });
  }

  saveAppointment(type) {
    this.setState({ show: false });
    // console.log('saving this:');
    let titlePrefix = '';
    this.state.visitType === 'consulting'
      ? (titlePrefix = 'Консультация ')
      : (titlePrefix = 'Лечение ');
    let newEvent = {
      title: titlePrefix + this.props.title,
      clientId: this.props.clientId,
      date: this.state.clickedEvent.start,
      end: this.state.clickedEvent.end,
      doctorId: this.props.doctorId,
      visitType: type,
      approved: true,
    };
    this.props.handleEventSelect(newEvent);
  }

  onEventSelect = (start, end) => {
    const events = this.state.events;

    this.setState({
      clickedEvent: {
        start: start.toDate(),
        end: end.toDate(),
      },
      show: true,
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
          {this.state.show && (
            <NewAppointmentModal
              clickedEvent={this.state.clickedEvent}
              handler={this.closeModal}
              saver={this.saveAppointment}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const sub = Meteor.subscribe('AllAppointments');
  return {
    ready: sub.ready(),
    appointments: AppointmentsCollection.find({}).fetch(),
    ...props,
  };
})(Schedule);
