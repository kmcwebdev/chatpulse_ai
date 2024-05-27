
interface ConversationProps {
	header?: string;
	time? : string;
	content: string;
	footer?: string;
	isLeft ?: boolean;
}

export default function Conversation(props: ConversationProps) {
	return(<div className={`chat ${props.isLeft ? "chat-end" : "chat-start"} gap-y-1`}>
	<div className="chat-header text-xs font-semibold">
		{props.header}
	</div>
	<div className="chat-bubble bg-slate-100 text-center flex items-center justify-center text-black text-xs">{props.content}</div>
	<div className="chat-footer text-xs text-slate-400">{props.footer}</div>
</div>)
}