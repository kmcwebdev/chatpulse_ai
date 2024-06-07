'use client'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		console.log(isOpen);
	}, [isOpen])

	return(<nav className="navbar bg-primary justify-between px-4">
		<div className="flex-0">
			<Link href="/" className="">
				<Image src="/kmc-logo.webp" height={40} width={40} alt="Company Logo" />
			</Link>
		</div>
		<div className="flex lg:hidden items-center justify-center ">
			<button onClick={() => setIsOpen(!isOpen)} className="size-7 text-white transition-all">
				{ isOpen ? <Bars3Icon id="button-logo" /> : <XMarkIcon id="button-close"/> }
			</button>
		</div>
		<div className="space-x-2 hidden lg:block">
			<Link href="#" className="btn btn-success">New Chat</Link>
			<Link href="#" className="btn btn-error">End Chat</Link>
		</div>
	</nav>)
}