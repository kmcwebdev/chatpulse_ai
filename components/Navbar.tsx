'use client'
import { CONVERSATIONSTATUS, IConversation } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar(props  : {
	conversation : IConversation;
	onNewChat ?: () => void;
	onEndChat ?: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return(<nav className="relative navbar bg-neutral justify-between px-4">
		<div className="flex space-x-4 font-semibold text-white text-xl">
			<Link href="/">
				<Image src="/kmc-logo.webp" height={40} width={40} alt="Company Logo" />
			</Link>
			<h1>{props.conversation?.joinedServiceMembers[0]}</h1>
		</div>
		<div className="flex lg:hidden items-center justify-center">
			<label className="btn btn-circle bg-transparent border-none swap swap-rotate fill-white hover:bg-transparent">
				<input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)}/>

				{/* hamburger icon */}
				<svg className="swap-off " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
				
				{/* close icon */}
				<svg className="swap-on" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
				
			</label>
		</div>
		<div className="space-x-2 hidden lg:block">
			{
				props.conversation?.status == CONVERSATIONSTATUS.CLOSED ? <Link href="#" className="btn btn-accent" onClick={props.onNewChat}>New Chat</Link> : <Link href="#" className="btn btn-error" onClick={props.onEndChat}>End Chat</Link>
			}
		</div>
	</nav>)
}