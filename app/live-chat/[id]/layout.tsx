import Navbar from "@/components/Navbar";
import React from "react";

export default function LiveChatLayout({ children } : { children: React.ReactNode }) {
	return(
		<div className="flex flex-col h-screen w-screen">
			<Navbar />
			<div className="flex grow">
				{children}
			</div>
		</div>
	)
}