import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {
	Calendar,
	Views,
	DateLocalizer,
	momentLocalizer,
} from "react-big-calendar";

import * as dates from "../../../../utils/dates";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
	React.cloneElement(React.Children.only(children), {
		style: {
			backgroundColor: "lightblue",
		},
	});

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
	localizer = mLocalizer,
	showDemoLink = true,
	...props
}) {
	const appointments = useSelector((state) => state.appointments);
	const properties = useSelector((state) => state.properties);
	const [events, setEvents] = useState([
		{
			title: "Today",
			allDay: true,
			start: new Date(new Date().setHours(new Date().getHours())),
			end: new Date(new Date().setHours(new Date().getHours() + 1)),
		},
	]);

	const { components, defaultDate, max, views } = useMemo(
		() => ({
			components: {
				timeSlotWrapper: ColoredDateCellWrapper,
			},
			defaultDate: new Date(),
			max: dates.add(new Date(), 14, "day"),
			views: { month: true, agenda: true },
		}),
		[]
	);

	useEffect(() => {
		const arr = Object.values(appointments).map((appt) => {
			const start = new Date(`${appt?.date} ${appt?.time}`);
			const end = dates.add(start, 30, "minutes");
			return {
				id: appt?.id,
				start,
				end,
				title: `${properties[appt.property_id].street}, ${
					properties[appt.property_id].city
				}`,
			};
		});
		arr.push({
			id: 0,
			title: "Today",
			allDay: true,
			start: new Date(new Date().setHours(new Date().getHours())),
			end: new Date(new Date().setHours(new Date().getHours() + 1)),
		});
		setEvents(arr);
	}, [appointments]);

	return (
		<Fragment>
			<div className="calendar-wrap" {...props}>
				<Calendar
					components={components}
					defaultDate={defaultDate}
					events={events}
					localizer={localizer}
					max={max}
					showMultiDayTimes
					step={60}
					views={views}
					popup
				/>
			</div>
		</Fragment>
	);
}

Basic.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
	showDemoLink: PropTypes.bool,
};
