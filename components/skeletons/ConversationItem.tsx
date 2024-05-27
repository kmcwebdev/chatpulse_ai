export default function ConversationItemSkeleton() {
	return(
		<div className="grid grid-cols-3 border rounded-md w-full p-4 shadow-sm space-y-1">
			<div className="col-span-3 rounded-lg skeleton h-4" />
			<div className="col-span-2 rounded-lg skeleton h-4" />
			<div className="col-span-1" />
			<div className="col-span-1 rounded-lg skeleton h-4" />
		</div>
	)
}