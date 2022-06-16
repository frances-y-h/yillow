import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import upload from "../../../assets/profile/upload_photo.svg";
import * as sessionActions from "../../../store/session";

const UploadPhoto = () => {
	const dispatch = useDispatch();

	const agent = useSelector((state) => state.session.user);

	const [photo, setPhoto] = useState(null);
	const [photoLoading, setPhotoLoading] = useState(false);
	const [src, setSrc] = useState("");
	const [errors, setErrors] = useState([]);

	const inputRef = useRef();

	const submitPhoto = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", photo);

		setPhotoLoading(true);

		const res = await fetch("/api/auth/photo", {
			method: "POST",
			body: formData,
		});

		const url = await res.json();
		if (res.ok) {
			setPhotoLoading(false);
			// dispatch to update url
			dispatch(sessionActions.uploadPhoto(url));
			setSrc("");
		} else {
			setPhotoLoading(false);
			setErrors(url.errors);
		}
	};

	const updatePhoto = async (e) => {
		const file = e.target.files[0];
		setPhoto(file);
		if (file) {
			setSrc(URL.createObjectURL(file));
		}
	};

	const cancel = (e) => {
		e.preventDefault();
		setPhoto(null);
		setSrc("");
		inputRef.current.value = "";
	};

	if (agent.photo) {
		return (
			<>
				<div
					className="agent-profile-photo"
					style={{ backgroundImage: `url("${agent.photo}")` }}
					onClick={() => inputRef.current.click()}
				>
					Upload Photo
					<div className="upload-photo-div">
						<img src={upload} alt="Upload" />
					</div>
					{src && (
						<img className="profile-upload-preview" src={src} alt="Upload" />
					)}
				</div>
				<input
					hidden
					type="file"
					accept="image/*"
					onChange={updatePhoto}
					ref={inputRef}
				/>
				{src && (
					<div className="btn-wrap">
						<button className="btn btn-bl" type="button" onClick={cancel}>
							Cancel
						</button>
						<button className="btn" type="button" onClick={submitPhoto}>
							Upload
						</button>
					</div>
				)}
				{photoLoading && <div>Loading...</div>}
				{errors && (
					<div className="error-list">
						{errors.map((err) => (
							<div>{err}</div>
						))}
					</div>
				)}
			</>
		);
	} else {
		return (
			<>
				<div
					className="agent-profile-no-photo"
					onClick={() => inputRef.current.click()}
				>
					Upload Photo
					<div className="upload-photo-div">
						<img src={upload} alt="Upload" />
					</div>
				</div>
				<input
					hidden
					type="file"
					accept="image/*"
					onChange={updatePhoto}
					ref={inputRef}
				/>
				{src && (
					<div className="btn-wrap">
						<button className="btn btn-bl" type="button" onClick={cancel}>
							Cancel
						</button>
						<button className="btn" type="button" onClick={submitPhoto}>
							Upload
						</button>
					</div>
				)}
				{photoLoading && <div>Loading...</div>}
			</>
		);
	}
};

export default UploadPhoto;
