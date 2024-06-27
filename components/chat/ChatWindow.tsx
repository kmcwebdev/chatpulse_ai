"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { IChatMessage, IConversation } from "@/convex/schema";
import { CONVERSATIONSTATUS } from "@/utils/constants";
import { PaperAirplaneIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

interface ChatWindowProps extends IConversation {
	id: Id<"conversations">;
	user: string;
	className?: string;
}

export default function ChatWindow(props: ChatWindowProps) {
	const generateUploadUrl = useMutation(api._storage.get.generateUploadUrl);
	const generateImageUrl = useMutation(api._storage.get.generateImageUrl);
	const submitMessage = useMutation(api.conversations.put.message);
	const newServiceMember = useMutation(api.conversations.put.newServiceMemeber);
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<IChatMessage[]>(props.messages);

	useEffect(() => {
		setMessages(props.messages);
	}, [props.messages]);

	useEffect(() => {
		if (chatWindowRef.current) {
			chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
		}
	}, messages)

	const handlePaste = async (editor: any, files: any[]) => {
		if (files.length < 1) return;
		const fileType = files[0].type;
		const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
		if (!allowedTypes.includes(fileType)) return;

		const postUrl = await generateUploadUrl();
		const result = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": files[0]!.type },
			body: files[0],
		});
		const { storageId } = await result.json();
		const url = await generateImageUrl({ id: storageId });

		submitMessage({
			id: props.id,
			messages: {
					message: files[0].name,
					link: url,
					sender: props.user,
					timestamp: new Date().toISOString(),
					format: files[0]!.type,
				},
		});
	};

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Image,
			FileHandler.configure({
				onPaste: handlePaste,
				allowedMimeTypes: [
					'image/jpeg',
					'image/png',
					'application/pdf',
				],
			}),
		],
		onUpdate: ({ editor }) => {
			if (editor.isEmpty) return;
			setMessage(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "border border-input rounded-md max-h-96 overflow-y-scroll grow no-scrollbar px-2",
			},
		},
	});

	useEffect(() => {
		editor?.extensionManager.extensions.find((ext) => ext.name === "fileHandler")?.configure({
			onPaste: handlePaste,
		})
	}, [props.messages]);

	const handleSubmit = () => {
		if (editor?.isEmpty) return;
		setMessage("");
		editor?.commands.clearContent();
		setMessages(prevState => {
			return [...prevState, {
				message: message.trim(),
				sender: props.user,
				timestamp: new Date().toISOString(),
				format: "text",
				link: "",
			}]
		})

		submitMessage({
			id: props.id,
			messages : {
				message,
				sender: props.user,
				timestamp: new Date().toISOString(),
				format: "text",
				link: "",
			}
		});
	};

	return (
		<div className="flex flex-col h-full w-full overflow-hidden">
			<div ref={chatWindowRef} className="grow overflow-x-hidden overflow-y-scroll no-scrollbar p-4">
				{messages?.map((chat) => (
					<ChatBubble
						key={Math.random() * 1000000}
						isRight={chat.sender === props.user}
						{...chat}
					/>
				))}
			</div>
			<div className="relative flex items-center justify-stretch w-full h-fit space-x-4 border-t-[1px] p-4">
				{props.status === CONVERSATIONSTATUS.CLOSED ? (
					<span className="text-error w-full text-center">This chat is closed</span>
				) : props.joinedServiceMembers.includes(props.user) || props.createdBy.includes(props.user) ? (
					<>
						<label>
							<PlusCircleIcon className="size-6 text-accent" />
							<input
								type="file"
								style={{ position: "fixed", top: "-100%" }}
								onChange={(e) => {
									if (e.target.files) {
										handlePaste(null, [e.target.files[0]], null);
									}
								}}
								accept="image/*, application/pdf"
							/>
						</label>
						<EditorContent className="grow" editor={editor} />
						<button className="flex h-full items-center justify-start" onClick={handleSubmit}>
							<PaperAirplaneIcon className="size-6 text-accent" />
						</button>
					</>
				) : (
					<button className="btn btn-accent w-full" onClick={() => newServiceMember({ id: props.id, serviceMember: props.user })}>
						Join Chat
					</button>
				)}
			</div>
		</div>
	);
}