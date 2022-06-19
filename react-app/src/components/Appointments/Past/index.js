import ApptCard from "../ApptCard";

const Past = ({ pastAppt }) => {
	return (
		<>
			{pastAppt?.map((appt, idx) => (
				<ApptCard appt={appt} past={true} key={"past" + idx} />
			))}
		</>
	);
};

export default Past;
