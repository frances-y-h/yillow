import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
	const modalRef = useRef();
	const [value, setValue] = useState();

	useEffect(() => {
		setValue(modalRef.current);
	}, []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal({ onClose, children }) {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div className="modal">
			<div className="modal-background" onClick={onClose} />
			<div className="modal-content">{children}</div>
		</div>,
		modalNode
	);
}
