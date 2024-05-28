import ChatWindow from "@/components/chat/ChatWindow";
import RoomInformation from "@/components/conversations/RoomInformation";
import RoomInformationSkeleton from "@/components/skeletons/RoomInformationSkeleton";
import { Suspense } from "react";

export default function Page({ params } : { params : { id : string }}) {
	const title = "Conversation Title";

	return(
		<div className="grid grid-rows-12 h-screen w-full">
			<h1 className="flex items-center justify-left row-span-1 text-lg font-semibold border-b-[1px] p-4">{title}</h1>
			<div className="grid row-span-11 grid-cols-8 w-full">
				<ChatWindow />
				<Suspense fallback={<RoomInformationSkeleton />}>
					<RoomInformation channel="Live Chat" contact="Gelo" department="Service Desk" topic="Topic" priority="High" request="Request" tags={["Live Chat"]} queueTime="2 hours" createdAt="8 hours ago" avgResponseTime="53 seconds" />
				</Suspense>
			</div>
		</div>
	)
}