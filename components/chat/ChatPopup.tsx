"use client"

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

export default function ChatPopup(props : {
	className ?: string;
	isOpen ?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(props.isOpen ? props.isOpen : false);
	const chatPopupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
				if (chatPopupRef.current && !chatPopupRef.current.contains(event.target as Node)) {
						setIsOpen(false);
				}
		};
		window.addEventListener('click', handleClickOutside);

		return () => {
				window.removeEventListener('click', handleClickOutside);
		};
}, []);

	return(
	<div className="absolute bottom-5 right-5" ref={chatPopupRef}>
		<div className={`relative flex items-center justify-center h-fit w-fit aspect-square rounded-full bg-accent shadow-2xl p-4`}
		onClick={() => setIsOpen(true)}
		>
	 		<ChatBubbleLeftRightIcon className="size-8 text-white" />
		</div>
		<div className={`absolute bottom-7 right-7 overflow-hidden rounded-lg border-black border-2  ${isOpen ? "h-fit" : "h-0 border-none"}`} style={{zIndex: 9999}}>
			<iframe 
				id="chatPopup"
				title="Support Popup"
				width={300}
				height={500}
				src="/live-chat"
				>
			</iframe>
		</div>
	</div>
	)
}