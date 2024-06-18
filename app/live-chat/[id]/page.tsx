'use client'
import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { IConversation } from "@/utils/types";
import { useMutation, useQuery } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LiveChatPage({
	params
} : {
	params : { id: string }
}) {
	let conversation = useQuery(api.conversations.get.byId, { 
		id: params.id as Id<"conversations">
	});

	const router = useRouter();	
	const createConversation = useMutation(api.conversations.put.newMessage); //TODO: WE can change the api name to something else less ambiguous
	const endConversation = useMutation(api.conversations.put.closeChat);
	const name = useSearchParams().get("name");

	const handleNewChat = async () => {
		if (!conversation) return;
		const id = await createConversation({
			createdBy: conversation?.createdBy,
			email: conversation?.email
		});
		router.push("/live-chat/" + id + "?name=" + conversation.createdBy)
	};

	const handleEndChat = () => {
		if(!conversation) return;

		endConversation({
			id : params.id as Id<"conversations">
		})
	}

	return (
		<div className="flex flex-col h-screen w-screen">
			<Navbar conversation={conversation as IConversation} onNewChat={handleNewChat} onEndChat={handleEndChat}/>
			<div className="flex h-full w-full">
				{conversation ? (
					<ChatWindow
						className="h-full w-full"
						id={conversation._id}
						user={name || ""}
						{...conversation}
					/>
				) : (
					<div className="w-full h-full"></div>
				)}
			</div>
		</div>
	);
}