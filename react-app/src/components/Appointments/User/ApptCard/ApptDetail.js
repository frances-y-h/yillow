import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../../context/Notification";

import editAvailable from "../../../Tools/EditAvailable";
import Agent from "./Agent";

import Property from "../../../Property";
import { Modal } from "../../../../context/Modal";

import * as appointmentActions from "../../../../store/appointment";
import * as propertyActions from "../../../../store/property";

const ApptDetail = ({ appt, past, onClose }) => {
	const dispatch = useDispatch();

	const properties = useSelector((state) => state.properties);
	const agents = useSelector((state) => state.agents);
	const [today, setToday] = useState("");
	const [hour, setHour] = useState("");
	const [message, setMessage] = useState("");
	const [hourList, setHourList] = useState([]);
	const [errors, setErrors] = useState([]);
	const [showProperty, setShowProperty] = useState(false);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const property = properties[appt?.property_id];
	const agent = agents[appt?.agent_id];

	const schedule = editAvailable(property, appt.date, appt.time);

	const update = async (e) => {
		e.preventDefault();
		const apptToUpdate = {
			id: appt.id,
			property_id: appt.property_id,
			date: today,
			time: hour,
			message,
		};
		const data = await dispatch(
			appointmentActions.editAppointment(apptToUpdate)
		);
		if (!data.errors) {
			// after appt updated, need to dispatch to update property
			await dispatch(propertyActions.getThisProperty(appt.property_id));
			setNotificationMsg("Appointment updated");
			setToggleNotification("");
			setTimeout(() => {
				setToggleNotification("notification-move");
				setNotificationMsg("");
			}, 2000);
			onClose();
		} else {
			setErrors(data.errors);
		}
	};

	const undo = (e) => {
		e.preventDefault();
		setToday(appt.date);
		setHour(appt.time);
		setMessage(appt.message);
	};

	const cancel = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			appointmentActions.deleteThisAppointment(appt.id)
		);
		if (!data.errors) {
			// after appt updated, need to dispatch to update property
			await dispatch(propertyActions.getThisProperty(appt.property_id));
			setNotificationMsg("Appointment Deleted");
			setToggleNotification("");
			setTimeout(() => {
				setToggleNotification("notification-move");
				setNotificationMsg("");
			}, 2000);
			onClose();
		} else {
			setErrors(data.errors);
		}
	};

	useEffect(() => {
		setToday(appt.date);
		setHour(appt.time);
		setMessage(appt.message);
	}, []);

	useEffect(() => {
		setHourList(schedule[today]);
		console.log(hourList);
	}, [today]);

	return (
		<form className="appt-detail-modal" onSubmit={update}>
			{property?.front_img ? (
				<div
					className="appt-img-detail"
					style={{ backgroundImage: `url("${property.front_img}")` }}
					onClick={() => setShowProperty(true)}
				></div>
			) : (
				<div className="appt-img-detail" onClick={() => setShowProperty(true)}>
					No image available
				</div>
			)}
			<div className="appt-modal-btm">
				<div
					className="appt-address-wrap"
					onClick={() => setShowProperty(true)}
				>
					<div className="appt-label">Address</div>
					<div className="appt-address">
						{property?.st_num} {property?.st_name}, {property?.city},{" "}
						{property?.state}, {property?.zip}
					</div>
					<div className="appt-visit-property">
						Click here to visit property page
					</div>
				</div>
				<div>
					<div className="appt-label">Appointment Time</div>
					<div className="appt-time-wrap">
						<select
							className="appt-input"
							value={today}
							onChange={(e) => setToday(e.target.value)}
							disabled={past}
						>
							{Object.keys(schedule).map((day) => (
								<option value={day} key={day}>
									{day}
								</option>
							))}
						</select>
						<select
							className="appt-input"
							value={hour}
							onChange={(e) => setHour(e.target.value)}
							disabled={past}
						>
							{hourList?.map((hour) => (
								<option value={hour} key={hour}>
									{hour}
								</option>
							))}
						</select>
					</div>
				</div>
				<label className="label">
					Message
					<textarea
						className="appt-input"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={past}
					/>
				</label>
				<Agent agent={agent} />
				{errors && (
					<div className="error-list error-ctr">
						{errors.map((err) => (
							<div key={err}>{err}</div>
						))}
					</div>
				)}
				{!past && (
					<>
						<button className="btn" type="submit">
							<div>Update Appointment to</div>
							<div className="btn-desc">
								{today} {hour}
							</div>
						</button>
						<div className="appt-edit-btn-wrap">
							<button type="button" className="btn btn-red" onClick={cancel}>
								Cancel Appointment
							</button>
							<button type="button" className="btn btn-bl" onClick={undo}>
								Undo Changes
							</button>
						</div>
					</>
				)}
			</div>
			{showProperty && (
				<Modal onClose={() => setShowProperty(false)}>
					<Property
						property={property}
						onClose={() => setShowProperty(false)}
					/>
				</Modal>
			)}
		</form>
	);
};

export default ApptDetail;
