'use client'
import { getConversationCount, getConversationsByStatus } from "@/app/lib/actions"
import Sidenav from "@/components/Sidenav"
import ConversationItem from "@/components/conversations/ConversationItem"
import ConversationTab from "@/components/conversations/ConversationTab"
import ConversationItemSkeleton from "@/components/skeletons/ConversationItem"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function ConverationLayout({ children } : { children: React.ReactNode }) {

	const queryClient = useQueryClient();

	const [newConversationCount, setNewConversationCount] = useState<number>(0);
	const [openConversationCount, setOpenConversationCount] = useState<number>(0);
	const [closedConversationCount, setClosedConversationCount] = useState<number>(0);

	const [isSelectedTab, setIsSelectedTab] = useState<"New" | "Open" | "Closed">("New");
	const [isSelectedConversation, setIsSelectedConversation] = useState<string>("1"); //Conversation ID

	//Handle Tab Change
	const { isLoading, data } = useQuery({queryKey: ["conversations", isSelectedTab], queryFn: () =>  getConversationsByStatus(isSelectedTab)});
	
	useEffect( () => {
		getConversationCount().then((data) => {
			setNewConversationCount(data.new);
			setOpenConversationCount(data.open);
			setClosedConversationCount(data.closed);
		})
	}, [])

	return(<>
		<Sidenav />
		<div className="flex flex-col h-full min-w-fit max-w-96 w-96 p-4 space-y-2 bg-inherit border-r-[1px] grow-0">
			<h1 className="text-center text-base h-10">All Conversations</h1>	

			{/* Conversation Tabs */}
			<div role="tablist" className="flex flex-row w-full min-h-fit tabs tabs-bordered items-center justify-evenly">
			<ConversationTab title="New" count={newConversationCount} isSelected={isSelectedTab === "New"} onClick={() => setIsSelectedTab("New")} />	
			<ConversationTab title="Open" count={openConversationCount} isSelected={isSelectedTab === "Open"} onClick={() => setIsSelectedTab("Open")} />
			<ConversationTab title="Closed" count={closedConversationCount} isSelected={isSelectedTab === "Closed"} onClick={() => setIsSelectedTab("Closed")} />
			</div>

			{/* Conversations List */}
			<div className="flex flex-col h-full w-full p-2 no-scrollbar overflow-y-scroll space-y-4">
				{isLoading ? (
					<ConversationItemSkeleton />
				) : (
					data?.map((conversation) => ( 
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
		{ children }
		</>
	)
}