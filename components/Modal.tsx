'use client'
import { useEffect, useState } from "react";

interface ModalProps {
	id: string;
	title ?: string;
	isOpen: boolean;
	onClose ?: () => void;
	children? : React.ReactNode;
	hasCloseBtn ?: boolean;
	className ?: string;
}

export default function Modal(props : ModalProps ) {
	const [ isOpen, setIsOpen ] = useState<boolean>(props.isOpen);
	
	const handleClose = () => {
		if(props.onClose) props.onClose();
	}

	const handleKeydownEvent = (event : any) => {
		if(event.keyCode == 27 && props.onClose) handleClose();
	}
	
	useEffect(() => {
		window.addEventListener("keydown", handleKeydownEvent);

		return () => {
			window.removeEventListener("keydown", handleKeydownEvent);
		}
	})

	//Sync state with parent state.
	useEffect(() => {
		console.log(props.isOpen)
		setIsOpen(props.isOpen)
	}, [props.isOpen])

	return(
		<dialog id={props.id} className={`modal ${props.className}`} open={isOpen} style={{zIndex: 9999}}>
			<div className="modal-box h-fit overflow-visible">
				<h3 className="font-bold text-lg"> { props.title }</h3>
				<small className="py-4">Press ESC key or click outside to close</small>
				{ props.children }
			</div>
			<form method="dialog" className="modal-backdrop">
				<button onClick={handleClose}>close</button>
			</form>
		</dialog>
	)
}