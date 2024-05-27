'use client'

import Link from 'next/link';
import { useState } from 'react';

interface ConversationTabProps {
	title: string;
	link ?: string;
	count ?: number;
}

interface ConverstationItemProps {
	title: string;
	description: string;
	timePassed: number; //Amount of time passed in hours
	participantCount: number; 
	isActive ?: boolean;
}

export default function ConversationsList() {
	const [selected , setSelected] = useState<"New" | "Open" | "Closed">("New");

	return(<div className="flex flex-col h-full w-96 p-4 space-y-2 bg-[#f9fafb] border-r-[1px]">
		<h1 className="text-center text-base h-10">All Conversations</h1>
		<div className="flex flex-col grow space-y-4">
			<ConversationTabs  />


			{ /* Placeholder for conversation items */}
			<div className="flex flex-col space-y-5">
				<ConversationItem title="Title" isActive={true} description="Description" timePassed={10} participantCount={10}/>
				<ConversationItem title="Title" description="Description" timePassed={10} participantCount={10} />
				<ConversationItem title="Title" description="Description" timePassed={10} participantCount={10} />
				<ConversationItem title="Title" description="Description" timePassed={10} participantCount={10} />
				<ConversationItem title="Title" description="Description" timePassed={10} participantCount={10} />
			</div>
		</div>
	</div>)
}

export function ConversationTabs() {
	return(<div role="tablist" className="flex flex-row w-full min-h-fit tabs tabs-bordered items-center justify-center">
			<ConversationTab title="New" count={10} />
			<ConversationTab title="Open" count={10} />
			<ConversationTab title="Closed" count={10} />
	</div>)
}

export function ConversationTab(props : ConversationTabProps) {
	return(<Link role="tab" className="tab flex space-x-2 transition-colors hover:text-blue-500 hover:border-blue-500" href={props.link || "#"}>
		<span> {props.title} </span>
		{
			props.count ? <div className="indicator-item badge text-inherit transition-colors duration-0"> {props.count} </div> : null
		}
	</Link>)
}

export function ConversationItem(props: ConverstationItemProps) {
	return(<div className="flex flex-col border rounded-md w-full p-4 shadow-sm space-y-1 indicator">
		<div className="flex flex-row justify-between">
			<p className="text-sm font-semibold">{props.title}</p>
			<p className="flex items-center justify-center text-xs text-gray-500 font-bold"> {props.timePassed} hours ago </p>
		</div>
		<p className="text-xs text-gray-500"> {props.description} </p>
		<p className="flex items-center justify-left text-xs font-semibold gap-2">
			Active participants : 
			<span className='badge badge-secondary text-black text-xs'>
				{ props.participantCount }
			</span>
		</p>
		{
			props.isActive ? <div className="indicator-item badge badge-secondary right-[25px] text-black text-xs font-semibold"> Current </div> : ""

		}
	</div>)
}