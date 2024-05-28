'use client'
import { useEffect, useState } from 'react';

export default function ChatWindow() {
	const [isActive, setIsActive] = useState(false);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		console.log(message)
	},[message])

	return(<section className="grid grid-rows-12 col-span-8 lg:col-span-5 h-full overflow-y-scroll no-scrollbar">
		<div className="row-span-11 overflow-y-scroll no-scrollbar px-4 py-2">

		</div>
		<div className="flex items-center justify-center row-span-1 border-t-[1px]">
			{
				isActive ? (<input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border-none focus:outline-none" placeholder="Type a message" />) : (<input className="w-full px-3 py-2 border-none focus:outline-none placeholder-error bg-transparent" placeholder="Chat is closed" disabled />)

			}
		</div>
	</section>)
}