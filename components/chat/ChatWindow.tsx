'use client'
import ChatBubble from "@/components/chat/ChatBubble";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CONVERSATIONSTATUS, IConversation } from "@/utils/types";
import { calculateTimePassed } from "@/utils/utils";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from 'react';

interface ChatWindowProps extends IConversation {
	className ?: string;
	id : Id<"conversations">
	user: string;
}

export default function ChatWindow(props : ChatWindowProps) {

	const [ message, setMessage ] = useState<string>("");
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const handleSubmit = useMutation(api.conversations.put.message);

	useEffect(() =>{
		if(!chatWindowRef.current) return;
		chatWindowRef.current.scrollTop = chatWindowRef.current?.scrollHeight;
	}, props.messages)

	return (
		<section className={`grid grid-rows-12 col-span-8 lg:col-span-5 h-full overflow-y-scroll no-scrollbar ${props.className}`}>
			<div className="row-span-11 overflow-y-scroll no-scrollbar px-4 py-2" ref={chatWindowRef}>
				{props.messages?.map((chat) => (
					<ChatBubble
						key={chat.sender}
						header={chat.sender}
						content={chat.message}
						isRight={chat.sender == props.user}
						footer={calculateTimePassed(new Date(chat.timestamp).getTime().toString())}
					/>
				))}
			</div>
			<div className="flex items-center justify-center row-span-1 border-t-[1px]">

			{/* Add an if else here to display button to join chat */}
				{
					props.status == CONVERSATIONSTATUS.CLOSED ? (
						<input
						className="w-full px-3 py-2 border-none focus:outline-none placeholder-error bg-transparent"
						placeholder="Chat is closed"
						disabled
					/>) : 
					<form className="flex grow" onSubmit={(e) => {
						e.preventDefault();
						setMessage("");
						handleSubmit({ //Follow IChatMessage interface
							id: props.id,
							messages: [...props.messages, {
								message, 
								sender: props.user,
								timestamp: new Date().toISOString(),
							}]
						})		
					}}>
						<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full p-2 border-none focus:outline-none"
						placeholder="Type a message"
					/>
					</form>
				}

			</div>
		</section>
	);
}