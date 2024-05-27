export default function ConversationLayout({ children } : { children: React.ReactNode }) {
	return(
		<div className="flex flex-col h-full min-w-fit p-4 space-y-2 bg-inherit border-r-[1px]">
			<h1 className="text-center text-base h-10">All Conversations</h1>
			{	children }
		</div>
	)
}