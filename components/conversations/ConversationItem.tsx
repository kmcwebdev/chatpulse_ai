import { ConversationItemProps } from "@/utils/types";
import { calculateTimePassed, trunc } from "@/utils/utils";
import Link from "next/link";

export default function ConversationItem(props: ConversationItemProps) {

	const title = props.createdBy;
	const timePassed = calculateTimePassed(props.createdAt.toString());
	const description = trunc(props.messages[props.messages.length - 1]?.message, 20);
	const participantCount = Number(props.joinedServiceMembers.length) + 1 || 0;

	return(
		<Link href={`/conversations/${props.id}`} className="flex flex-col border rounded-md w-full p-4 shadow-sm space-y-1 indicator transition-shadow hover:shadow-md" onClick={() => props.onClick && props.onClick(props.id)}>
			<div className="flex flex-row justify-between">
				<p className="text-sm font-semibold">{ title }</p>
				<p className="flex items-center justify-center text-xs text-gray-500 font-bold"> { timePassed } </p>
			</div>
			<p className="text-xs text-gray-500"> { description } </p>
			<p className="flex items-center justify-left text-xs font-semibold gap-2">
				Active participants : 
				<span className='badge badge-accent text-black text-xs'>
					{ participantCount }
				</span>
			</p>
			{
				props.isActive ? <div className="indicator-item badge badge-accent right-[25px] text-black text-xs font-semibold"> Current </div> : ""
			}
		</Link>
	)
}