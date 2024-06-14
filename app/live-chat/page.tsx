'use client'
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LiveChat() {
	const [ email, setEmail ] = useState<string>("");
	const [ name, setName ] = useState<string>("");
	const router = useRouter();

	const createConversation = useMutation(api.conversations.put.newMessage);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const conversationId = await createConversation({
			createdBy: name,
			email,
		})
		
		router.push(`/live-chat/${conversationId}?name=${name}`);
	}

	return (
		<div className="flex grow items-center justify-center">
			{/* Registration Form */}
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-96">
				<div className="flex flex-col space-y-1">
					<label htmlFor="Email" className="">Email</label>
					<input id="Email" type="email" className="input input-bordered" placeholder="Email address (Required)" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="flex flex-col space-y-1">
					<label htmlFor="Name" className="">Name</label>
					<input id="Name" className="input input-bordered" placeholder="Name (Required)" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}