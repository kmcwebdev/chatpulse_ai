'use client'

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Tagger from "@/components/Tagger";
import RoomInformationItem from "@/components/conversations/RoomInformationItem";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CONVERSATIONSTATUS, IConversation, IRoomInformation, PRIORITY } from "@/utils/types";
import { ChatBubbleLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

interface RoomInformationProps extends IConversation {
	id: Id<"conversations">;
	createdAt: number;
}

export default function RoomInformation(props: RoomInformationProps) {
	const { createdBy, id, createdAt } = props;
	const closeChat = useMutation(api.conversations.put.closeChat);
	const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
	const [ isTicketModalOpen, setIsTicketModalOpen ] = useState(false);
	const [ roomInformation, setRoomInformation ] = useState<IRoomInformation>(props.roomInformation);
	const [ status, setStatus ] = useState<CONVERSATIONSTATUS>(props.status);	

	const tags = useQuery(api.tags.get.all, { limit: 100000 })
	const editRoomInformation = useMutation(api.conversations.put.roomInformation);

	const handleSubmit = () => {
		setIsEditModalOpen(false);
		editRoomInformation({
			roomInformation: roomInformation,
			id: props.id
		})
	}

	const renderContact = () => {
		if (createdBy) {
			return (
				<RoomInformationItem title="Contact">
					<div className="flex h-10 w-10 place-content-center items-center rounded-md bg-accent text-xl text-white">
						{createdBy[0]}
					</div>
					<p className="text-xs font-light">{createdBy}</p>
				</RoomInformationItem>
			);
		}

		return null;
	};

	const renderTags = () => {
		if (Array.isArray(roomInformation.tags)) {
			return <RoomInformationItem title="Tags">
				{
					roomInformation.tags.map((tag, index) => (
						<span key={index} className="mr-1 badge badge-accent text-xs">
							{tag}
						</span>))
				}
			</RoomInformationItem>
		}

		return null;
	};

	return (
		<section className="col-span-3 hidden lg:block border-l-[1px] overflow-auto">
			<h1 className="flex flex-row space-x-2 p-4 border-b-[1px]">
				<InformationCircleIcon className="size-6" />
				<span> Room Information </span>
			</h1>

			<div id="body" className="flex flex-col items-left justify-start grow p-4 space-y-5">
				<RoomInformationItem title="Channel">
					<ChatBubbleLeftIcon className="size-7" />
					<p>{roomInformation.channel}</p>
				</RoomInformationItem>
				{renderContact()}
				<RoomInformationItem title="Department">
					{roomInformation.department}
				</RoomInformationItem>
				{/* Topic */}
				<RoomInformationItem title="Topic">
					<p>{roomInformation.topic}</p>
				</RoomInformationItem>
				{/*  Priority */}
				<RoomInformationItem title="Priority">
					<p>{roomInformation.priority}</p>
				</RoomInformationItem>
				{ renderTags() }
				<RoomInformationItem title="Queue Time">
					{roomInformation.queueTime}
				</RoomInformationItem>
				<RoomInformationItem title="Created At">
					{new Date(createdAt).toLocaleDateString()}
				</RoomInformationItem>
				<RoomInformationItem title="Average Response Time">
					{roomInformation.avgResponseTime}
				</RoomInformationItem>
				<div className="grid grid-rows-2 gap-2 text-black">
					<div className="grid grid-cols-2 gap-2">
						<button 
							className="btn border-none w-full bg-accent hover:shadow-md transition-shadow"
							onClick={() => setIsEditModalOpen(true)}
							>
							Edit
						</button>
						<button 
							className="btn border-none w-full bg-success hover:shadow-md transition-shadow"
							onClick={() => setIsTicketModalOpen(true)}
							>
							Create ticket
						</button>
					</div>
					<button
						disabled={status == CONVERSATIONSTATUS.CLOSED}
						className={`btn border-none w-full bg-error hover:shadow-md transition-shadow`}
						onClick={() => closeChat({ id })}
					>
						End Chat
					</button>
				</div>
			</div>

			{
				isEditModalOpen ? 
				<Modal 
				id="Edit Room Information"
				isOpen={isEditModalOpen} 
				title="Edit Room Information"
				onClose={() => setIsEditModalOpen(false)}
				>
				<Input
					title="Topic"
					value={roomInformation.topic}
					type="text"
					placeholder="Topic"
					onChange={(e) => setRoomInformation({ ...roomInformation, topic: e.target.value })} />

				<Dropdown
					title="Priority"
					value={roomInformation.priority}
					onChange={(e) => setRoomInformation({ ...roomInformation, priority: e.target.value as PRIORITY})}
				>	
					<option value={PRIORITY.CANCELLED}>{ PRIORITY.CANCELLED }</option>
					<option value={PRIORITY.INCIDENT}>{ PRIORITY.INCIDENT }</option>
					<option value={PRIORITY.REQUEST}>{ PRIORITY.REQUEST }</option>
				</Dropdown>

				<Dropdown
					title="Status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>	
					<option value="Follow Up"> Follow Up </option>
					<option value="New Request"> New Request </option>
					<option value="Cancelled"> Cancelled </option>
				</Dropdown>

				<Tagger title="Tags" items={tags ? tags[0].tags : []} onChange={(e : string[]) => setRoomInformation({
					...roomInformation, tags: e
				})} 
				selectedItems={roomInformation.tags}/>

				<button 
					className="btn border-none my-2 w-full bg-accent text-white hover:shadow-md transition-shadow"
					onClick={handleSubmit}
				> Save </button>
			</Modal> : <></>
			}

			{
				isTicketModalOpen ? 
				<Modal
				id="Create Ticket"
				isOpen={isTicketModalOpen}
				title="Create Ticket"
				onClose={() => setIsTicketModalOpen(false)}
				>
				<Input 
					title="Full Name"
					value="Full Name"
					type="text"
					placeholder="Full Name" 
				/>
				<Input 
					title="Organization"
					value="Organization"
					type="text"
					placeholder="Organization"
				 />
				<Input 
					title="Email"
					value="Email"
					type="text"
					placeholder="Full Name"
				/>
				<div className="flex space-x-4">
					<Dropdown 
						title="Category"
						value="Category"
						onChange={(e) =>{return e}}>
					</Dropdown>
					<Dropdown 
						title="Sub-Category"
						value="Category"
						onChange={(e) =>{return e}}>
					</Dropdown>
				</div>
				<div className="flex space-x-4">
					<Dropdown 
							title="Priority"
							value="Priority"
							onChange={(e) =>{return e}}>
					</Dropdown>
					<Dropdown 
							title="Technician Group"
							value="Category"
							onChange={(e) =>{return e}}>
					</Dropdown>
				</div>
				<div className="flex space-x-4">
					<Dropdown 
							title="Site"
							value="Site"
							onChange={(e) =>{return e}}>
					</Dropdown>
					<Dropdown 
							title="Assigned To"
							value="Assigned To"
							onChange={(e) =>{return e}}>
					</Dropdown>
				</div>
				</Modal> : null
			}
		</section>
	);
}

function Dropdown(props: {
	title: string;
	value: string;
	onChange: (e: any) => void;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<label className="form-control w-full max-w-full mt-2">
			<span className='label label-text'> {props.title} </span>
			<select
				title={props.title}
				value={props.value}
				className={`input input-bordered w-full ${props.className}`}
				onChange={(e) => props.onChange(e)}
			>
				{props.children}
			</select>
		</label>
	);
}