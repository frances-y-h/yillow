import { useSelector } from "react-redux";

const User = () => {
	const appointments = useSelector((state) => state.appointments);

	const now = new Date();

	const apptArr = Object?.values(appointments).sort((a, b) => {
		return (
			new Date(`${a.date} ${a.time}`).getTime() -
			new Date(`${b.date} ${b.time}`).getTime()
		);
	});

	const passedAppt = [];

	const newArr = apptArr?.filter((appt) => {
		if (now.getTime() < new Date(`${appt?.date} ${appt?.time}`).getTime()) {
			return appt;
		} else {
			passedAppt.push(appt);
		}
	});

	console.log(passedAppt);

	return (
		<div className="appointment-ctrl">
			<div>Appointments</div>
			<div>
				{newArr.map((appt, idx) => (
					<div key={"appt" + idx}>
						{appt?.date} {appt?.time}
					</div>
				))}
			</div>
		</div>
	);
};
export default User;
