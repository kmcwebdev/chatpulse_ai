'use client'
import Sidenav from "@/components/Sidenav";
import React from "react";

export default function AnalyticsPage({ children } : {
	children : React.ReactNode;
}) {

	return(<>
		<Sidenav />
		{ children }
	</>)
}