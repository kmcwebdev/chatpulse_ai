'use client'
import Sidenav from "@/components/Sidenav";
import { api } from "@/convex/_generated/api";
import { calculateTimePassed } from "@/utils/utils";
import { useQuery } from "convex/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function ConversationLayout({ //TODO: Redo converstations layout to use pathname and searchparams, also make it so our chatwindowcan use more space
	children
} : {
	children : React.ReactNode
}) {
	const [isOpen, setIsOpen] = useState(true);
	const pathName = usePathname().split("/");
	const chats = useQuery(api.conversations.get.all, {limit : 1000});
	pathName.shift(); //Remove the first element of the array which should be empty.

	const title = pathName[1][0].toUpperCase() + pathName[1].slice(1)  + " " +  pathName[0][0].toUpperCase() + pathName[0].slice(1);

	return(
		<>
		<Sidenav />
		<div className={`${isOpen ? "flex flex-col" : "hidden"} h-full border-r-[1px] w-80`}>
			<div className="flex items-center justify-center w-full h-10 py-10 border-b-[1px]">
				<h1 className="text-center">{title}</h1>
			</div>
			<div className="h-full w-full overflow-auto no-scrollbar">
				{
					chats?.map((chat) => (
						<Item
							id={chat._id}
							key={chat._id}
							title={chat.createdBy}
							description={
								chat.messages[0]?.message || "No Activity"
							}
							timeCreated={chat._creationTime.toString()} 
						/>
					))	
				}
			</div>
		</div>
		{ children }
		</>
	)
}

function Item(props : {
	id ?: string;
	title ?: string;
	description ?: string;
	timeCreated ?: string
	children ?: string | React.ReactNode;
}) {

	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");

	const handleOnClick = () => {
		router.push("/conversations")
	}

	return(
		<div onClick={handleOnClick} className={`px-3 py-5 min-h-20 border-b-[1px] hover:cursor-pointer hover:bg-slate-100 transition-all text-gray-500 hover:text-black ${id && id == props.id ? "bg-slate-200" : ""}`}onClick={() => console.log("Clciked!")}>
			<div className="flex items-center justify-between">
				<span>{props.title}</span>
				<span className="text-xs">{calculateTimePassed(props.timeCreated || "")}</span>
			</div>
			<p className="text-sm">{props.description}</p>
		</div>
	)
}