import Link from 'next/link';

interface ConversationTabProps  {
	title: string;
	count ?: number;
	isSelected ?: boolean;
	onClick ?: () => void;
}

export default function ConversationTab(props : ConversationTabProps) {
	return(<Link role="tab" className={`tab flex space-x-1 min-w-fit w-full transition-colors hover:text-neutral hover:border-neutral ${props.isSelected ? "tab-active" : ""}`} href="#" onClick={props.onClick}>
		<span> {props.title} </span>
		{
			props.count != undefined || props.count != null ? <div className="indicator-item badge text-inherit transition-colors duration-0"> {props.count} </div> : null
		}
	</Link>)
}	