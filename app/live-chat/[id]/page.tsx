'use client'
import ChatWindow from "@/components/chat/ChatWindow";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";

export default function LiveChatPage({
	params
} : {
	params : { id: string }
}) {
	let conversation = useQuery(api.conversations.get.byId, { 
		id: params.id as Id<"conversations">
	});

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
				<h1 className="text-white font-semibold text-xl">{conversation?.joinedServiceMembers[0]}</h1>
			</nav>
			<div className="row-span-11">
				{
					conversation ? <ChatWindow id={conversation._id} user={conversation.createdBy} {...conversation} /> : null
				}
			</div>
		</div>
	);
}