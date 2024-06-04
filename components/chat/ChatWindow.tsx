'use client'
import { IChatMessage } from '@/app/lib/actions';
import ChatBubble from "@/components/chat/ChatBubble";
import { useState } from 'react';

export default function ChatWindow({ messages, isActive } : { messages : IChatMessage[], isActive : boolean }) {
	const [message, setMessage] = useState<string>("");
	
	return (
		<section className="grid grid-rows-12 col-span-8 lg:col-span-5 h-full overflow-y-scroll no-scrollbar">
			<div className="row-span-11 overflow-y-scroll no-scrollbar px-4 py-2">
				{messages?.map((chat) => (
					<ChatBubble
						key={chat.id}
						header={chat.sender}
						content={chat.message}
						footer={calculateTimePassed(chat.timestamp)}
					/>
				))}
			</div>
			<div className="flex items-center justify-center row-span-1 border-t-[1px]">
				{isActive ? (
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full p-2 border-none focus:outline-none"
						placeholder="Type a message"
					/>
				) : (
					<input
						className="w-full px-3 py-2 border-none focus:outline-none placeholder-error bg-transparent"
						placeholder="Chat is closed"
						disabled
					/>
				)}
			</div>
		</section>
	);

	function calculateTimePassed(timestamp: string): string {
		const currentTime = new Date().getTime();
		const chatTime = new Date(timestamp).getTime();
		const timeDiff = currentTime - chatTime;

		const minutes = Math.floor(timeDiff / (1000 * 60));
		if (minutes < 60) {
			return `${minutes} minutes ago`;
		}

		const hours = Math.floor(timeDiff / (1000 * 60 * 60));
		if (hours < 24) {
			
			return `${hours} hours ago`;
		}

		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

		return `${days} days ago`;
	}
}