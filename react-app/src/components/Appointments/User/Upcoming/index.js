import ApptCard from "../ApptCard";

const Upcoming = ({ newAppt }) => {
	return (
		<>
			{newAppt?.map((appt, idx) => (
				<ApptCard appt={appt} key={"upcoming" + idx} />
			))}
		</>
	);
};

export default Upcoming;
