'use client'
import ChatWindow from "@/components/chat/ChatWindow";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";

export default function LiveChatPage({ params } : { params: { id: string } }) {
	const name = useSearchParams().get("name");
	const conversation = useQuery(api.conversations.get.byId, { 
		id: params.id as Id<"conversations">
	})

	return(<div className="flex h-full w-full">
		{
			conversation ? <ChatWindow className="h-full w-full"id={conversation._id} user={name || ""} {...conversation} /> : <div className="w-full h-full"></div>
		}
	</div>)
}