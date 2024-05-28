'use client'
import { getConversationsByStatus } from '@/app/lib/actions';
import ConversationItem, { ConversationItemProps } from '@/components/conversations/ConversationItem';
import ConversationTab from '@/components/conversations/ConversationTab';
import ConversationItemSkeleton from '@/components/skeletons/ConversationItem';
import { useEffect, useState } from 'react';

export default function ConversationLayout({ children } : { children: React.ReactNode }) {
	const [isSelectedTab, setisSelectedTab] = useState<"New" | "Open" | "Closed">("New");
	const [conversations, setConversations] = useState<ConversationItemProps[]>([]);
	const [isSelectedConversation, setIsSelectedConversation] = useState<string>("1"); //Conversation ID

	//Handle Tab Change
	useEffect(() => {
		getConversationsByStatus(isSelectedTab).then((data) => {
			setConversations(data);
		})
	}, [isSelectedTab])

	useEffect(() => {
		console.log("Selected Tab : ", isSelectedTab);
	}, [isSelectedTab])

	useEffect(() => {
		console.log("Selected Conversation : ", isSelectedConversation);
	}, [isSelectedConversation])

	const handleClick = (id : "New" | "Open" | "Closed") => {
		setConversations([]);
		setisSelectedTab(id);
	}

	return(
		<>
		<div className="flex flex-col h-full min-w-fit p-4 space-y-2 bg-inherit border-r-[1px]">
			<h1 className="text-center text-base h-10">All Conversations</h1>
			<div role="tablist" className="flex flex-row w-full min-h-fit tabs tabs-bordered items-center justify-center">
			<ConversationTab title="New" count={10} isSelected={isSelectedTab === "New"} onClick={() => handleClick("New")} />	
			<ConversationTab title="Open" count={10} isSelected={isSelectedTab === "Open"} onClick={() => handleClick("Open")} />
			<ConversationTab title="Closed" count={10} isSelected={isSelectedTab === "Closed"} onClick={() => handleClick("Closed")} />
			</div>

			{/* Conversations List */}
			<div className="flex flex-col h-full w-full p-2 no-scrollbar overflow-y-scroll space-y-4">
				{conversations.length === 0 ? (
					<ConversationItemSkeleton />
				) : (
					conversations.map((conversation) => (
						<ConversationItem
							key={conversation.id}
							{...conversation}
							isActive={isSelectedConversation == conversation.id}
							onClick={setIsSelectedConversation}
						/>
					))
				)}
			</div>

		</div>
		{/* Chat Box */}
		{children}
		</>
	)
}