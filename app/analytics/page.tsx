'use client'
import Sidenav from "@/components/Sidenav";
import TagPercentage from "@/components/analytics/piechart";
import Search from "@/components/analytics/search";
import Timeline from "@/components/analytics/timeline";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function AnalyticsPage() {

	const conversations = useQuery(api.conversations.get.all);

	return(<>
		<Sidenav />
		<div className="grow grid grid-rows-12 p-4 space-y-4">
			<div className="card grid grid-cols-12 row-span-6 border-[1px]">
				<Timeline className="col-span-7" conversations={conversations} />
				<TagPercentage className="col-span-5" conversations={conversations} />
			</div>
			<Search className="card row-span-6 border-[1px]"/>
		</div>
	</>)
}