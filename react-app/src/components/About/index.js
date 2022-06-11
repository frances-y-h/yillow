import Frances from "../../assets/frances/Frances_500_500.png";
import git from "../../assets/about/git-logo.png";
import linkedin from "../../assets/about/linkedin-logo.png";
import skyline from "../../assets/about/skyline.png";

const About = () => {
	return (
		<div
			className="about-ctrl"
			style={{ backgroundImage: `url("${skyline}")` }}
		>
			<div className="wrapper">
				<img className="img" src={Frances} alt="Frances" />
				<div>
					<div className="name">Frances (Huang) Lau</div>
					<div className="slogan">Love crafting from scratch</div>
				</div>
				<div className="icon-group">
					<a
						href="https://github.com/frances-y-h"
						target="_blank"
						rel="noreferrer"
					>
						<img src={git} className="icon" alt="Git" />
					</a>
					<a
						href="https://www.linkedin.com/in/frances-huang-660607156/"
						target="_blank"
						rel="noreferrer"
					>
						<img src={linkedin} className="icon" alt="Linked In" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;
