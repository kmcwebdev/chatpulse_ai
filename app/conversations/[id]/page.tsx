'use client'

import { getConversationsById } from "@/app/lib/actions";
import ChatWindow from "@/components/chat/ChatWindow";
import RoomInformation from "@/components/conversations/RoomInformation";
import RoomInformationSkeleton from "@/components/skeletons/RoomInformationSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function Page({ params } : { params : { id : string }}) {
	
	//TODO: Make this page fetch the needed conversation according to the ID and pass the appropriate props to the components
	const queryCient = useQueryClient();
	const { isLoading, data } = useQuery({ queryKey: ["conversations", params.id], queryFn: () => getConversationsById(params.id) });

	return(
		<div className="grid grid-rows-12 h-screen grow">
			<h1 className="flex items-center justify-left row-span-1 text-lg font-semibold border-b-[1px] p-4">
				{ 
					//Loading Title
					isLoading ? <div className="h-5 w-4/12 skeleton"></div> : data?.title
				}
			</h1>
			<div className="grid row-span-11 grid-cols-8 min-w-fit">
				{ //Loading Chat Window
					isLoading ? <div className="col-span-5"></div> : <ChatWindow messages={data?.messages ? data.messages : []} isActive={data?.isActive ? true : false} />
				}

				{
					isLoading ? <RoomInformationSkeleton /> : 
						<RoomInformation
							channel={data?.roomInformation.channel || ""}
							contact={data?.roomInformation.contact || ""}
							department={data?.roomInformation.department || ""}
							topic={data?.roomInformation.topic || ""}
							priority={data?.roomInformation.priority || ""}
							request={data?.roomInformation.request || ""}
							tags={data?.roomInformation.tags || []}
							queueTime={data?.roomInformation.queueTime || ""}
							createdAt={data?.roomInformation.createdAt || ""}
							avgResponseTime={data?.roomInformation.avgResponseTime || ""}
							/>
				}
			</div>
		</div>
	)
}