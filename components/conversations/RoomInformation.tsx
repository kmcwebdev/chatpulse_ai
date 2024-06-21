'use client'

import RoomInformationItem from "@/components/conversations/RoomInformationItem";
import { api } from "@/convex/_generated/api";
import { CONVERSATIONSTATUS, IRoomInformation, PRIORITY, QueryReturn } from "@/utils/types";
import { trunc } from "@/utils/utils";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import Tagger from "../Tagger";

interface RoomInformationProps extends QueryReturn {
	isOpen: boolean;
}

export default function RoomInformation(props: RoomInformationProps) {
	const [roomInformation, setRoomInformation] = useState<IRoomInformation>(props.roomInformation);
	const [status, setStatus] = useState<CONVERSATIONSTATUS>(props.status);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

	const tags = useQuery(api.tags.get.all, { limit: 50 });
	const closeChat = useMutation(api.conversations.put.closeChat);
	const editRoomInformation = useMutation(api.conversations.put.roomInformation);

	const handleSubmit = () => {
		setIsEditModalOpen(false);
		editRoomInformation({
			id: props._id,
			roomInformation,
		});
	};

	const renderContact = () => {
		if (!props.createdBy) return null;

		return (
			<RoomInformationItem title="Contact">
				<div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-xl text-white">
					{props.createdBy[0]}
				</div>
				<p className="text-xs font-light">{trunc(props.createdBy, 30)}</p>
			</RoomInformationItem>
		);
	};

	const renderTags = () => {
		if (!Array.isArray(roomInformation.tags)) return null;
		
		return (
			<RoomInformationItem title="Tags">
				{props.roomInformation.tags.map((tag, index) => (
					<span key={index} className="mr-1 badge badge-accent text-xs">
						{tag}
					</span>
				))}
			</RoomInformationItem>
		);
	};

	return (
		<section
			className={`overflow-y-scroll overflow-x-hidden bg-white border-l-[1px] h-full absolute top-0 right-0 transition-all no-scrollbar ${
				props.isOpen ? "w-96" : "w-0"
			}`}
		>
			<div className="flex flex-col space-y-2 px-4 py-6">
				<RoomInformationItem title="Channel">
					<ChatBubbleLeftIcon className="size-7" />
					<p>{props.roomInformation.channel}</p>
				</RoomInformationItem>
				{renderContact()}
				<RoomInformationItem title="Department">
					<p>{props.roomInformation.department}</p>
				</RoomInformationItem>
				<RoomInformationItem title="Topic">
					<p>{props.roomInformation.topic}</p>
				</RoomInformationItem>
				<RoomInformationItem title="Priority">
					<p>{props.roomInformation.priority}</p>
				</RoomInformationItem>
				{renderTags()}
				<RoomInformationItem title="Queue Time">
					<p>{props.roomInformation.queueTime}</p>
				</RoomInformationItem>
				<RoomInformationItem title="Created At">
					<p>{new Date(props._creationTime).toLocaleDateString()}</p>
				</RoomInformationItem>
				<RoomInformationItem title="Average Response Time">
					<p>{props.roomInformation.avgResponseTime}</p>
				</RoomInformationItem>
				<div className="grid grid-rows-2 gap-2 text-white">
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
						disabled={props.status == CONVERSATIONSTATUS.CLOSED}
						className={`btn border-none w-full bg-error hover:shadow-md transition-shadow`}
						onClick={() => closeChat({ id: props._id })}
					>
						End Chat
					</button>
				</div>
			</div>

			{isEditModalOpen ? (
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
						onChange={(e) => setRoomInformation({ ...roomInformation, topic: e.target.value })}
					/>

					<Dropdown
						title="Priority"
						value={roomInformation.priority}
						onChange={(e) => setRoomInformation({ ...roomInformation, priority: e.target.value as PRIORITY })}
					>
						<option value={PRIORITY.CANCELLED}>{PRIORITY.CANCELLED}</option>
						<option value={PRIORITY.INCIDENT}>{PRIORITY.INCIDENT}</option>
						<option value={PRIORITY.REQUEST}>{PRIORITY.REQUEST}</option>
					</Dropdown>

					<Dropdown
						title="Status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="Follow Up">Follow Up</option>
						<option value="New Request">New Request</option>
						<option value="Cancelled">Cancelled</option>
					</Dropdown>

					<Tagger
						title="Tags"
						items={tags ? tags[0].tags : []}
						onChange={(e: string[]) => setRoomInformation({
							...roomInformation, tags: e
						})}
						selectedItems={roomInformation.tags}
					/>

					<button
						className="btn border-none my-2 w-full bg-accent text-white hover:shadow-md transition-shadow"
						onClick={handleSubmit}
					>
						Save
					</button>
				</Modal>
			) : null}

			{isTicketModalOpen ? (
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
							onChange={(e) => { return e }}
						>
						</Dropdown>
						<Dropdown
							title="Sub-Category"
							value="Category"
							onChange={(e) => { return e }}
						>
						</Dropdown>
					</div>
					<div className="flex space-x-4">
						<Dropdown
							title="Priority"
							value="Priority"
							onChange={(e) => { return e }}
						>
						</Dropdown>
						<Dropdown
							title="Technician Group"
							value="Category"
							onChange={(e) => { return e }}
						>
						</Dropdown>
					</div>
					<div className="flex space-x-4">
						<Dropdown
							title="Site"
							value="Site"
							onChange={(e) => { return e }}
						>
						</Dropdown>
						<Dropdown
							title="Assigned To"
							value="Assigned To"
							onChange={(e) => { return e }}
						>
						</Dropdown>
					</div>
				</Modal>
			) : null}
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