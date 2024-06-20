'use client'
import Sidenav from "@/components/Sidenav";
import ConversationItem from "@/components/conversations/ConversationItem";
import ConversationTab from "@/components/conversations/ConversationTab";
import ConversationItemSkeleton from "@/components/skeletons/ConversationItem";
import { api } from "@/convex/_generated/api";
import { CONVERSATIONSTATUS } from "@/utils/types";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

export default function ConversationLayout({ children }: { children: React.ReactNode }) {
	const [openConversationCount, setOpenConversationCount] = useState<number>(0);
	const [closedConversationCount, setClosedConversationCount] = useState<number>(0);
	const [selectedTab, setSelectedTab] = useState<CONVERSATIONSTATUS>(CONVERSATIONSTATUS.NEW);
	const [selectedConversation, setSelectedConversation] = useState<string>("");

	const conversations = useQuery(api.conversations.get.all, {});

	useEffect(() => {
		let openCount = 0;
		let closedCount = 0;

		if (!conversations) return;

		conversations.forEach((conversation) => {
			switch (conversation.status) {
				case CONVERSATIONSTATUS.OPEN:
					openCount++;
					break;
				case CONVERSATIONSTATUS.CLOSED:
					closedCount++;
					break;
			}
		});

		setOpenConversationCount(openCount);
		setClosedConversationCount(closedCount);
	}, [conversations]);

	const filteredConversations = conversations
		? conversations.filter((conversation) => conversation.status === selectedTab)
		: [];

	return (
		<>
			<Sidenav />
			<div className="flex flex-col h-full w-80 min-w-80 max-w-80 p-4 space-y-2 bg-inherit border-r-[1px] grow-0">
				<h1 className="text-center text-base h-10">All Conversations</h1>
				{/* Conversation Tabs */}
				<div role="tablist" className="flex flex-row w-full min-h-fit tabs tabs-bordered items-center justify-evenly">
					<ConversationTab
						title="Open"
						count={openConversationCount}
						isSelected={selectedTab === CONVERSATIONSTATUS.OPEN}
						onClick={() => setSelectedTab(CONVERSATIONSTATUS.OPEN)}
					/>
					<ConversationTab
						title="Closed"
						count={closedConversationCount}
						isSelected={selectedTab === CONVERSATIONSTATUS.CLOSED}
						onClick={() => setSelectedTab(CONVERSATIONSTATUS.CLOSED)}
					/>
				</div>

				{/* Conversations List */}
				<div className="flex flex-col h-full w-full p-2 no-scrollbar overflow-y-scroll space-y-4">
					{filteredConversations.length > 0 ? (
						filteredConversations.map((conversation) => (
							<ConversationItem
								key={conversation._id}
								id={conversation._id}
								createdAt={conversation._creationTime}
								isActive={selectedConversation === conversation._id}
								onClick={setSelectedConversation}
								{...conversation}
							/>
						))
					) : (
						<ConversationItemSkeleton />
					)}
				</div>
			</div>

			{/* Chat Box */}
			{children}
		</>
	);
}