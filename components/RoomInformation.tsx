import { ChatBubbleLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline"

export default function RoomInformation() {
	return(<section className="flex flex-col h-full border-l-[1px]">
			<h1 className="flex flex-row space-x-2 text-base font-medium text-left border-b-[1px] px-4 py-4 flex-0">
				<InformationCircleIcon className="size-6" />
				<span> Room Information </span>
			</h1>
			<div className="flex flex-col items-left justify-start grow px-4 py-4 space-y-5">
				<div>
					<p className="text-sm mb-2">Channel</p>
					<p className="flex flex-row text-xs font-light text-gray-500">
						<ChatBubbleLeftIcon className="size-5 mr-1"/>
						<p> Live Chat </p>
					</p>
				</div>
				<div>
					<p className="text-sm mb-2">Contact</p>
					<div className="flex flex-row items-center justify-left space-x-2">
						<div className="flex h-10 w-10 place-content-center items-center rounded-md bg-orange-500 text-xl text-white">G</div>
						<p className="text-xs font-light"> Gelo </p>
					</div>
				</div>
				<div>
					<p className="text-sm mb-2">Department</p>
					<p className="text-xs font-light text-gray-500">Service Desk</p>
				</div>
				<div>
					<p className="text-sm mb-2">Tags</p>
					<p className="text-xs font-light text-gray-500">Live Chat</p>
				</div>
				<div>
					<p className="text-sm mb-2">Queue Time</p>
					<p className="text-xs font-light text-gray-500">2 hours</p>
				</div>
				<div>
					<p className="text-sm mb-2">Created at</p>
					<p className="text-xs font-light text-gray-500">8 hours ago</p>
				</div>
				<div>
					<p className="text-sm mb-2">Average Responce Time</p>
					<p className="text-xs font-light text-gray-500">53 seconds</p>
				</div>
				<button className="btn w-full bg-orange-400 text-white">Edit</button>
				<button className="btn w-full bg-red-400 text-white">End Chat Session</button>
			</div>
		</section>)
}