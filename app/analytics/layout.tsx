'use client'
import Sidenav from "@/components/Sidenav";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

export default function AnalyticsPage({ children } : {
	children : React.ReactNode;
}) {

	const conversations = useQuery(api.conversations.get.all, { limit : 1000 });

	return(<>
		<Sidenav />
		{ children }
	</>)
}