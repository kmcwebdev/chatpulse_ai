'use client'

import Conversation from "@/components/Conversation";
import RoomInformation from "@/components/RoomInformation";

export default function ConversationLiveView() {
	return(<section className="flex flex-col grow min-h-screen items-left justify-center">
		<h1 className="text-lg text-left border-b-[1px] px-3 py-4 font-medium flex-0">Testing Title</h1>
		<div className="flex flex-row grow">
			<div className="w-7/12 pt-1">
				<Conversation header="Title" content="===Content===" footer="Footer" />
				<Conversation header="Title" isLeft={true} content="===Content===" footer="Footer" />
				<Conversation header="Title" content="===Content===" footer="Footer" />
				<Conversation header="Title" isLeft={true} content="===Content===" footer="Footer" />
				<Conversation header="Title" isLeft={true} content="===Content===" footer="Footer" />
				<Conversation header="Title" isLeft={true} content="===Content===" footer="Footer" />
			</div>
			<div className="w-5/12">
				<RoomInformation />
			</div>
		</div>
	</section>)
}
