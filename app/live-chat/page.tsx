'use client'
import Input from "@/components/Input";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LiveChat() {
	const [ email, setEmail ] = useState<string>("");
	const [ name, setName ] = useState<string>("");
	const	[ submitElement, setSubmitElement] = useState<string | React.ReactNode>("Submit");

	const router = useRouter();

	const createConversation = useAction(api.chats.put.create);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitElement(<span className="loading loading-spinner loading-xs"></span>)
		const conversationId = await createConversation({
			createdBy: name,
			email,
		})

		router.push(`/live-chat/${conversationId}`);
	}

	return (
		<div className="w-full h-full flex items-center justify-center flex-col" >
			<form className="w-full px-2 max-w-96 space-y-4" onSubmit={handleSubmit}>
				<div className="flex items-center justify-center flex-col space-y-4 my-4 ">
					<Image src="/kmc-logo-large.png" alt="KMC Logo" height={100} width={160} />
					<p className="text-xs text-center">Welcome back, it's good to see you again</p>
				</div>
				<Input title="Name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required={true} />
				<Input title="Email" type="email" placeholder="abc@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
				<button className="btn btn-accent w-full" >
					{ submitElement }
				</button>
			</form>
		</div>
	)
}