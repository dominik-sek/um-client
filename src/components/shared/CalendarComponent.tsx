import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Flex, Wrap, WrapItem } from '@chakra-ui/react';

const events = [
  { title: 'Meeting', start: '2023-01-27T10:30:00', end: '2023-01-27T12:30:00' },
];


export const CalendarComponent = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView='timeGridWeek'
      events={events}
      eventContent={renderEventContent}
      eventDisplay={'block'}
      expandRows={true}
      slotMinTime='7:00:00'
      slotMaxTime='22:00:00'
      slotDuration={'00:15:00'}
    />
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarComponent;