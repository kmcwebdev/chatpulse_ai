import Link from "next/link";

export interface ConversationItemProps {
	id: string;
	title: string;
	description: string;
	timePassed: number;
	participantCount: number;
	isActive?: boolean;
	onClick ?: (e : string) => void;
}

export default function ConversationItem(props: ConversationItemProps) {
	return(
		<Link href={`/conversations/${props.id}`} className="flex flex-col border rounded-md w-full p-4 shadow-sm space-y-1 indicator transition-shadow hover:shadow-md" onClick={() => props.onClick && props.onClick(props.id)}>
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
				props.isActive ? <div className="indicator-item badge badge-accent right-[25px] text-black text-xs font-semibold"> Current </div> : ""
			}
		</Link>
	)
}