import { useSelector } from "react-redux";

const User = () => {
	const appointments = useSelector((state) => state.appointments);

	return (
		<div>
			<div>User appointments</div>
			{Object?.values(appointments)?.map((appt) => (
				<div>
					{appt?.date} {appt?.time}
				</div>
			))}
		</div>
	);
};
export default User;
