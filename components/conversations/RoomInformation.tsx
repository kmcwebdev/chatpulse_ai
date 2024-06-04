import { IRoomInformation } from "@/app/lib/actions";
import { ChatBubbleLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

//TODO: Implement editing modal for the room information.

export default function RoomInformation(props: IRoomInformation) {
	
	return(<section className=" col-span-3 hidden lg:block border-l-[1px]">
		<h1 className="flex flex-row space-x-2 p-4 border-b-[1px]">
			<InformationCircleIcon className="size-6" />
			<span> Room Information </span>
		</h1>

		<div className="flex flex-col items-left justify-start grow px-4 py-4 space-y-5">
				<div>
					<p className="text-sm mb-2">Channel</p>
					<div className="flex flex-row text-xs font-light text-gray-500">
						<ChatBubbleLeftIcon className="size-5 mr-1"/>
						<p> {props.channel} </p>
					</div>
				</div>
				<div>
					<p className="text-sm mb-2">Contact</p>
					<div className="flex flex-row items-center justify-left space-x-2">
						<div className="flex h-10 w-10 place-content-center items-center rounded-md bg-orange-500 text-xl text-white"> {props.contact[0]} </div>
						<p className="text-xs font-light"> {props.contact} </p>
					</div>
				</div>
				<div>
					<p className="text-sm mb-2">Department</p>
					<p className="text-xs font-light text-gray-500">{props.department}</p>
				</div>
				<div>
					<p className="text-sm mb-2">Tags</p>
					<p className="text-xs font-light text-gray-500">{props.tags}</p>
				</div>
				<div>
					<p className="text-sm mb-2">Queue Time</p>
					<p className="text-xs font-light text-gray-500">{props.queueTime}</p>
				</div>
				<div>
					<p className="text-sm mb-2">Created at</p>
					<p className="text-xs font-light text-gray-500">{props.createdAt}</p>
				</div>
				<div>
					<p className="text-sm mb-2">Average Responce Time</p>
					<p className="text-xs font-light text-gray-500">{props.avgResponseTime}</p>
				</div>
				<button className="btn border-none w-full bg-orange-400 text-white hover:shadow-md transition-shadow">Edit</button>
				<button className="btn border-none w-full bg-red-400 text-white hover:shadow-md transition-shadow">End Chat Session</button>
			</div>
	</section>)
}