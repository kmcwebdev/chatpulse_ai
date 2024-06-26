'use client'
import Sidenav from "@/components/Sidenav";
import React from "react";

export default function AnalyticsPage({ children } : {
	children : React.ReactNode;
}) {

	return(<>
		<Sidenav />
		<div className="grow max-h-screen max-w-full h-screen w-full">
			{ children }
		</div>
	</>)
}