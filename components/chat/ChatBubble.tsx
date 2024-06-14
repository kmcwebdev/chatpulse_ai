interface ConversationBubbleProps {
	header: string;
	content: string;
	ref? : React.RefObject<any>
	footer?: string;
	isRight?: boolean;
}

export default function ConversationBubble(props : ConversationBubbleProps) {
	return(
		<div className={`chat text-xs ${props.isRight ? "chat-end" : "chat-start"}`} ref={props.ref}>
			<div className="chat-header">{props.header}</div>
			<div className="flex items-center justify-center chat-bubble text-white">{props.content}</div>
			<small className="chat-footer text-[10px] text-black font-light">{props.footer}</small>
		</div>
	)
}