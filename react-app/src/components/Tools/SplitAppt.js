export default function SplitAppt(appointments) {
	const now = new Date();

	const apptArr = Object?.values(appointments).sort((a, b) => {
		return (
			new Date(`${a?.date} ${a?.time}`).getTime() -
			new Date(`${b?.date} ${b?.time}`).getTime()
		);
	});

	const pastAppt = [];

	const newArr = apptArr?.filter((appt) => {
		if (now.getTime() < new Date(`${appt?.date} ${appt?.time}`).getTime()) {
			return appt;
		} else {
			pastAppt.push(appt);
		}
	});

	return [newArr, pastAppt];
}
