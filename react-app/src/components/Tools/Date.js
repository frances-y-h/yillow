import { formatRelative } from "date-fns";

const ApptDate = ({ date, time }) => {
	if (date && time) {
		const now = new Date(`${date} ${time}`);

		return <>{formatRelative(now, new Date())}</>;
	} else {
		const now = new Date();
		return <>{now.toDateString()}</>;
	}
};

export default ApptDate;
