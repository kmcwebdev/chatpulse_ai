import { IChatMessage } from "@/convex/schema";
import { calculateTimePassed } from "@/utils/utils";
import { FolderArrowDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ChatBubbleProps extends IChatMessage {
	isRight ?: boolean;
	ref ?: React.RefObject<any>;
}

export default function ChatBubble(props: ChatBubbleProps) {
	const renderContent = () => {
		if(!props.link) return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{props.message}</ReactMarkdown>

		else if(props.format?.includes("image")) {
			return (
				<Image
					alt="image"
					height={500}
					width={400}
					src={props.link}
					className="max-w-[400px] max-h-[500px] object-contain"
				/>
			)
		} else if(props.format?.includes("pdf")) {
			return (
				<Link href={props.link} className="text-white flex space-x-4">
					<span>{props.message}</span>
					<FolderArrowDownIcon className="size-6" />
				</Link>
			)
		}
	}

	return (
		<div className={`chat text-xs ${props.isRight ? "chat-end" : "chat-start"}`} ref={props.ref}>
			<div className="chat-header">{props.sender}</div>
			<div className="flex items-center justify-center chat-bubble text-white prose">
				{renderContent()}
			</div>
			<small className="chat-footer text-[10px] text-black font-light">
				{
					calculateTimePassed(new Date(props.timestamp).getTime().toString())
				}
			</small>
		</div>
	)
}