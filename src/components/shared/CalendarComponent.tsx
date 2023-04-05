import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
	ReactElement,
	JSXElementConstructor,
	ReactFragment,
	ReactPortal,
	ReactNode,
} from 'react';

const events = [
	{
		title: 'Meeting',
		start: '2023-01-27T10:30:00',
		end: '2023-01-27T12:30:00',
	},
];

export const CalendarComponent = () => {
	return (
		<FullCalendar
			plugins={[timeGridPlugin]}
			initialView="timeGridWeek"
			events={events}
			eventContent={renderEventContent}
			eventDisplay={'block'}
			expandRows={true}
			slotMinTime="7:00:00"
			slotMaxTime="22:00:00"
			slotDuration={'00:15:00'}
		/>
	);
};

function renderEventContent(eventInfo: {
	timeText:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| ReactFragment
		| ReactPortal
		| Iterable<ReactNode>
		| null
		| undefined;
	event: {
		title:
			| string
			| number
			| boolean
			| ReactElement<any, string | JSXElementConstructor<any>>
			| ReactFragment
			| ReactPortal
			| Iterable<ReactNode>
			| null
			| undefined;
	};
}) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}

export default CalendarComponent;
