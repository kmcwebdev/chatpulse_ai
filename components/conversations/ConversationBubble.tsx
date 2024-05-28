interface ConversationBubbleProps {
	header: string;
	content: string;
	footer: string;
	isLeft: boolean;
}

export default function ConversationBubble(props : ConversationBubbleProps) {
	return(
		<div className={`chat ${props.isLeft ? "chat-start" : "chat-end"}`}>
			<div className="chat-header">{props.header}</div>
			<div className="chat-content">{props.content}</div>
			<div className="chat-footer">{props.footer}</div>
		</div>
	)
}