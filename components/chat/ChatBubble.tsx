interface ConversationBubbleProps {
	header: string;
	content: string;
	footer: string;
	isLeft?: boolean;
}

export default function ConversationBubble(props : ConversationBubbleProps) {
	return(
		<div className={`chat text-xs ${props.isLeft ? "chat-start" : "chat-end"}`}>
			<div className="chat-header">{props.header}</div>
			<div className="chat-bubble text-black bg-primary">{props.content}</div>
			<small className="chat-footer text-[10px] text-black font-light">{props.footer}</small>
		</div>
	)
}