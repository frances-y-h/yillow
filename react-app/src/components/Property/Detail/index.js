import { useSelector } from "react-redux";

import logo from "../../../assets/logo-blue.svg";
import footer from "../../../assets/footer-art.svg";

import RequestTour from "./RequestTour";

const Detail = ({ property, openTour }) => {
	const agents = useSelector((state) => state.agents);

	return (
		<div className="property-detail-ctrl">
			<div className="property-detail-top">
				<img className="property-detail-logo" src={logo} alt="Yillow" />
				<div>{/* <i className="fa-regular fa-heart"></i> Save */}</div>
			</div>
			<div className="property-detail-btm">
				<div className="property-detail-btm-header">
					<div className="property-detail-btm-price-wrap">
						<div className="property-detail-price">
							$
							{property?.price
								.toFixed()
								.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
						</div>
						<div className="property-detail-bd">
							<div className="property-detail-bdba">
								<span className="bold">{property?.bed}</span> bd
							</div>
							<div className="property-detail-bdba">
								<span className="bold">{property?.bath}</span> ba
							</div>
							<div className="property-detail-bdba">
								<span className="bold">{property?.sqft}</span> sqft
							</div>
						</div>
					</div>
					<div className="property-detail-address">
						{property?.street}, {property?.city}, {property?.state}{" "}
						{property?.zip}
					</div>
					<div className="property-detail-status">
						{property?.status === "Active" && (
							<>
								<i className="fa-solid fa-circle for-sale"></i>For sale
							</>
						)}
						{property?.status === "Pending" && (
							<>
								<i className="fa-solid fa-circle pending"></i>For sale
							</>
						)}
						{property?.status === "Sold" && (
							<>
								<i className="fa-solid fa-circle sold"></i>For sale
							</>
						)}
					</div>

					<RequestTour openTour={openTour} />
					<div className="property-detail-overview-wrap">
						<div className="property-detail-overview-btn">Overview</div>
					</div>
				</div>
				<div className="property-detail-btm-wrap">
					<div className="property-detail-icons">
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-regular fa-building"></i>
							</div>
							{property?.type}
						</div>
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-regular fa-calendar-days"></i>
							</div>
							Built in {property?.built}
						</div>
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-solid fa-temperature-full"></i>
							</div>
							No Data
						</div>
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-solid fa-snowflake"></i>
							</div>
							Central Air
						</div>
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-solid fa-square-parking"></i>
							</div>
							{property?.garage} Car Garage
						</div>
						<div className="property-detail-icon">
							<div className="property-detail-icon-box">
								<i className="fa-solid fa-ruler-combined"></i>
							</div>
							${(property?.price / property?.sqft).toFixed()} price/sqft
						</div>
					</div>
					<div className="property-detail-overview">
						<div className="property-detail-overview-title">Overview</div>
						<div className="property-detail-overview-desc">
							{property?.description}
						</div>
						<div>Time on Yillow {property?.listing_date}</div>
					</div>
					<div className="property-detail-agent">
						<div>Listing Provided by:</div>
						<div>
							{agents[property?.listing_agent_id]?.username} DRE#
							{agents[property?.listing_agent_id]?.license_num}{" "}
							{agents[property?.listing_agent_id]?.phone}
						</div>
						<div>{property?.office}</div>
					</div>
					<div className="property-detail-mls">
						The multiple listing data appearing on this website, or contained in
						reports produced therefrom, is owned and copyrighted by California
						Regional Multiple Listing Service, Inc. ("CRMLS") and is protected
						by all applicable copyright laws. Information provided is for
						viewer's personal, non-commercial use and may not be used for any
						purpose other than to identify prospective properties the viewer may
						be interested in purchasing. All listing data, including but not
						limited to square footage and lot size is believed to be accurate,
						but the listing Agent, listing Broker and CRMLS and its affiliates
						do not warrant or guarantee such accuracy. The viewer should
						independently verify the listed data prior to making any decisions
						based on such information by personal inspection and/or contacting a
						real estate professional. Based on information from California
						Regional Multiple Listing Service, Inc. and /or other sources. All
						data, including all measurements and calculations of area, is
						obtained from various sources and has not been, and will not be,
						verified by broker or MLS. All information should be independently
						reviewed and verified for accuracy. Properties may or may not be
						listed by the office/agent presenting the information The listing
						broker’s offer of compensation is made only to participants of the
						MLS where the listing is filed.
					</div>
					<div className="footer-ctrl">
						<div className="footer-logo-wrap">
							<img className="footer-logo" src={logo} alt="Yillow" /> © 2022
							Frances (Huang) Lau
						</div>

						<img src={footer} alt="Footer" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Detail;
