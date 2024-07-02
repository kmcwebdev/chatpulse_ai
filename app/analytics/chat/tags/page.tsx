"use client"
import Card from "@/components/Card";
import { api } from "@/convex/_generated/api";
import { generateColor, trunc } from "@/utils/utils";
import { useQuery } from "convex/react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AnalyticsTagsPage() {
	let totalTags = 0;
	const tags : {[key: string] : number} = {};
	const chats = useQuery(api.chats.get.all, { limit : 1000});
	
	chats?.forEach((chat) => {
		chat.roomInformation.tags.forEach((tag) => {
			tags[tag] = (tags[tag] || 0) + 1;
			totalTags++;
		});
	})

	const sortedTags = Object.entries(tags)
		.sort((a, b) => b[1] - a[1])
		.map(([tag, count]) => ({ tag, count }));

	const pieData = sortedTags.map((tag) => ({
		tag: tag.tag,
		name: trunc(tag.tag,2),
		count: tag.count,
		percentage: Math.round((tag.count / totalTags) * 100),
		fill: generateColor()
	}))

	return(
		<div className="grid grid-rows-12 h-full w-full">
			<Card className="row-span-6" title="Tags">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }} data={pieData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="count" fill="#f0a154" />
					</BarChart>
				</ResponsiveContainer>
			</Card>
		</div>
	)
}