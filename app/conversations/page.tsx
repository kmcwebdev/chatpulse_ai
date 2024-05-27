'use client'
import ConversationItem, { ConversationItemProps } from '@/components/conversations/ConversationItem';
import ConversationTab from '@/components/conversations/ConversationTab';
import ConversationItemSkeleton from '@/components/skeletons/ConversationItem';
import { useEffect, useState } from 'react';

export default function Page() {
	const [isSelectedTab, setisSelectedTab] = useState<"New" | "Open" | "Closed">("New");
	const [conversations, setConversations] = useState<ConversationItemProps[]>([]);
	const [isSelectedConversation, setIsSelectedConversation] = useState<string | null>(null); //Conversation ID

	// Code to mock API delay
	useEffect(() => {
		setTimeout(() => {
			setConversations([{ id: "1", title: "Conversation 1", description: "Description 1", timePassed: 1, participantCount: 1, isActive: true },
				{ id: "2", title: "Conversation 2", description: "Description 2", timePassed: 2, participantCount: 2, isActive: false}
			])
		}, 5000);
	}, [])

	useEffect(() => {
		console.log(isSelectedTab);
	}, [isSelectedTab])

	return(<>
		<div role="tablist" className="flex flex-row w-full min-h-fit tabs tabs-bordered items-center justify-center">
			<ConversationTab title="New" count={10} isSelected={isSelectedTab === "New"} onClick={() => setisSelectedTab("New")} />	
			<ConversationTab title="Open" count={10} isSelected={isSelectedTab === "Open"} onClick={() => setisSelectedTab("Open")} />
			<ConversationTab title="Closed" count={10} isSelected={isSelectedTab === "Closed"} onClick={() => setisSelectedTab("Closed")} />
		</div>

		{/* Conversations List */}
		<div className="flex flex-col h-full w-full p-2 no-scrollbar overflow-y-scroll space-y-4">

			{
				conversations.length === 0 ? (
					<ConversationItemSkeleton />
				) : (
					conversations.map((conversation) => (
						<ConversationItem key={conversation.id} {...conversation} />
					))
				)
			}
		
		</div>
	</>)
}