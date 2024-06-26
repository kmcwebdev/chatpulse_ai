'use client'

import Sidenav from "@/components/Sidenav"
import ChatWindow from "@/components/chat/ChatWindow"
import RoomInformation from "@/components/conversations/RoomInformation"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { CONVERSATIONSTATUS } from "@/utils/types"
import { calculateTimePassed, trunc } from "@/utils/utils"
import { useUser } from "@clerk/nextjs"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useQuery } from "convex/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Page() {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const [ selectedChatId, setSelectedChatId ] = useState<Id<"conversations"> | null>(searchParams.get("id") as Id<"conversations">);
	const [searchValue, setSearchValue] = useState("");
	const pathName = usePathname();
	const status = pathName.split("/")[2].replace(/(\w)(\w*)/g, function(_, firstChar, restOfString) {
		return firstChar.toUpperCase() + restOfString.toLowerCase();
	});
	
	const title = status + " Chats";
	const chats = useQuery(api.conversations.get.all, { limit: 1000 })
	
	const handleChatSelect = (id : Id<"conversations">) => {
		setSelectedChatId(id);
		const params = new URLSearchParams(searchParams);
		params.set("id", id);
		replace(`${pathName}?${params.toString()}`)
	}

	return(
		<>
		<Sidenav />
		<div className="grid grid-rows-12 h-full w-60 min-w-60 border-r-[1px]">
			<h1 className="flex row-span-1 items-center justify-center border-b-[1px]">{title}</h1>
			<input className="row-span-1 outline-none border-b-[1px] h-full w-full px-2" placeholder="Search here..." type="text" onChange={(e) => setSearchValue(e.target.value)} />
			<div className="row-span-10 overflow-auto no-scrollbar">
				{
					chats ? chats?.map((chat) => { //TODO : Add proper chat searching
						if(chat.status.toLowerCase() == status.toLowerCase() && chat.createdBy.toLowerCase().includes(searchValue.toLowerCase())) return <Item
							onClick={() => handleChatSelect(chat._id)}
							id={chat._id}
							status={chat.status}
							key={chat._id}
							title={chat.createdBy}
							description={
								chat.messages[chat.messages.length - 1]?.message || "No Activity"
							}
							timeCreated={chat._creationTime.toString()}
							isNew={chat.joinedServiceMembers.length === 0}
						/>
					}) : null
				}
			</div>
		</div>
		{
			selectedChatId === "" || selectedChatId === null ? <div className="flex grow items-center justify-center">
				Select a chat to continue
			</div> : <ConversationSection id={selectedChatId as Id<"conversations">} />
		}
		</>
	)
}

function Item(props : {
	id : string;
	title : string;
	description : string;
	timeCreated : string;
	status : CONVERSATIONSTATUS;
	children ?: string | React.ReactNode;
	isNew ?: boolean;
	onClick: () => void;
}) {

	const searchParams = useSearchParams();

	return( //TODO : text-black not getting applied when searchParams id == props.id
		<div onClick={props.onClick} className={`relative px-3 py-5 min-h-20 border-b-[1px] hover:cursor-pointer hover:bg-slate-100 transition-all text-gray-500 hover:text-black ${searchParams.get("id") == props.id ? "bg-slate-100 text-black " : ""} text-gray-500`}>
			<div className="flex items-center justify-between">
				<span>{trunc(props.title, 13)}</span>
				<span className="text-xs">{calculateTimePassed(props.timeCreated || "")}</span>
			</div>
			<p className="text-sm">{trunc(props.description, 20)}</p>
			{
				props.isNew ? <div className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full" /> : null
			}
		</div>
	)
}

function ConversationSection(props : {
	id: Id<"conversations">;
}) {
	const { user } = useUser();
	const chat = useQuery(api.conversations.get.byId, { id: props.id });

	const [ isRoomInformationOpen, setIsRoomInformationOpen ] = useState(false)

	if(!props.id || Array.isArray(chat)) return <div className="flex h-full w-full items-center justify-center">
		<span>Select a conversation to view</span>
	</div>

	return(
		<div className="grid grid-rows-12 h-full w-full">
			<h1 className="flex items-center justify-between row-span-1 text-lg font-semibold border-b-[1px] px-6">
				{
					chat == null ? <div className="h-4 w-4/12 skeleton" /> : (<>
						{trunc(chat.createdBy, 40)}
						<InformationCircleIcon className="size-7 hover:cursor-point" onClick={() => setIsRoomInformationOpen(!isRoomInformationOpen)}/>
						</>)
				}
			</h1>
			
			<div className="relative row-span-11">
				{
					chat ? (<>
						<ChatWindow user={user?.fullName || ""} id={chat._id} {...chat} />
						<RoomInformation isOpen={isRoomInformationOpen} {...chat} />
					</>) : null
				}
			</div>
		</div>
	)
}