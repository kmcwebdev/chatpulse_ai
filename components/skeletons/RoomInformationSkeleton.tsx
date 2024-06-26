import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function RoomInformationSkeleton() {
	return(<section className="col-span-3 hidden lg:block border-l-[1px]">
		<h1 className="flex flex-row space-x-2 p-4 border-b-[1px]">
			<InformationCircleIcon className="size-6" />
			<span> Room Information </span>
		</h1>
		<div className="flex flex-col items-left justify-start grow px-4 py-4 space-y-5">
			<div>
					<p className="text-sm mb-2">Channel</p>
					<div className="flex flex-row text-xs font-light text-gray-500">
						<div className="skeleton w-20 h-[16px]"></div>
					</div>
			</div>
			<div>
					<p className="text-sm mb-2">Contact</p>
					<div className="flex flex-row items-center justify-left space-x-2">
						<div className="skeleton w-10 h-10 mb-1 rounded-md"></div>
						<p className="skeleton w-20 h-[16px]"></p>
					</div>
				</div>
				<div>
					<p className="text-sm mb-2">Department</p>
					<p className="skeleton w-20 h-[16px]"></p>
				</div>
				<div>
					<p className="text-sm mb-2">Tags</p>
					<p className="skeleton w-20 h-[16px]"></p>
				</div>
				<div>
					<p className="text-sm mb-2">Queue Time</p>
					<p className="skeleton w-20 h-[16px]"></p>
				</div>
				<div>
					<p className="text-sm mb-2">Created at</p>
					<p className="skeleton w-20 h-[16px]"></p>
				</div>
				<div>
					<p className="text-sm mb-2">Average Responce Time</p>
					<p className="skeleton w-20 h-[16px]"></p>
				</div>
				{/* <button className="btn border-none w-full bg-orange-400 text-white hover:shadow-md transition-shadow" onClick={() => {}}>Edit</button>
				<button className="btn border-none w-full bg-red-400 text-white hover:shadow-md transition-shadow" onClick={() => {}}>End Chat Session</button> */}
		</div>
	</section>)
}