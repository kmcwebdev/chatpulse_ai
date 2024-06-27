"use client"

import ChatWindow from "@/components/chat/ChatWindow";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function LiveChatPage() {
	const params = useParams<{ id : string}>();
	const chat = useQuery(api.conversations.get.byId, {
		id: params.id as Id<"conversations">
	})
	
	if(Array.isArray(chat)) return <div className="flex h-full w-full items-center justify-center">
		<span>Select a conversation to view</span>
	</div>

	return (
		<div className="grid grid-rows-12 h-full w-full">
			<nav className="flex row-span-1 items-center justify-start px-4 py-2 bg-neutral space-x-4">
				<div className="relative w-7 h-7 sm:w-10 sm:h-10">
					<Image
						fill
						alt="KMC Logo"
						src="/kmc-logo.webp"
						sizes="100vw" />
				</div>
				<h1 className="text-white font-semibold text-xl">{chat?.joinedServiceMembers[0]}</h1>
			</nav>
			<div className="row-span-11">
				{
					chat ? <ChatWindow id={chat._id} user={chat.createdBy} {...chat} /> : null
				}
			</div>
		</div>
	);
}