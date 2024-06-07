'use client'

import ChatWindow from "@/components/chat/ChatWindow";
import RoomInformation from "@/components/conversations/RoomInformation";
import RoomInformationSkeleton from "@/components/skeletons/RoomInformationSkeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export default function Page({ params } : { params : { id : string }}) {
	
	const conversation = useQuery(api.conversations.get.byId, { id: params.id as Id<"conversations"> })
	const { user } = useUser();
	return(
		<div className="grid grid-rows-12 h-screen grow">
			<h1 className="flex items-center justify-left row-span-1 text-lg font-semibold border-b-[1px] p-4">
			{
				//Loading Title
				conversation ? conversation.createdBy : <div className="h-5 w-4/12 skeleton"></div>
			}
			</h1>

			<div className="grid row-span-11 grid-cols-8 min-w-fit">
				{
					//Loading Chat Window
					conversation ? <ChatWindow user={user?.fullName || ""} id={conversation._id} {...conversation} /> : <div className="col-span-5"></div>
				}

				{
					//Loading Room Information
					conversation ? <RoomInformation createdAt={conversation._creationTime} {...conversation} /> : <RoomInformationSkeleton />
				}
			</div>
		</div>
	)
}