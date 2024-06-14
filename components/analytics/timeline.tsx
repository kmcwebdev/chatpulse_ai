// 'use client'
// import { IConversation } from "@/app/lib/actions";
// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// export default function Timeline(props: {
// 	conversations: IConversation[] | undefined;
// 	className?: string;
// }) {
// 	const { conversations } = props;

// 	// Calculate the total number of conversations per day
// 	const conversationsPerDay: { date: string; count: number }[] = [];
// 	if (conversations) {
// 		const dateCounts: { [date: string]: number } = {};
// 		conversations.forEach((conversation) => {
// 			const date = conversation.roomInformation.createdAt.split("T")[0];
// 			dateCounts[date] = (dateCounts[date] || 0) + 1;
// 		});

// 		Object.entries(dateCounts).forEach(([date, count]) => {
// 			conversationsPerDay.push({ date, count });
// 		});
// 	}

// 	// Sort the conversations per day by date in descending order
// 	conversationsPerDay.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// 	// Get the 10 most recent days
// 	const recentDays = conversationsPerDay.slice(0, 10);

// 	return (
// 		<div className={`grid grid-rows-12 ${props.className}`}>
// 			<div className="row-span-2 flex items-center justify-left px-4">
// 				<h2 className="text-lg font-bold">Recent Activity</h2>
// 			</div>
// 			<ResponsiveContainer width="95%" height="90%" className={props.className + ` row-span-10`}>
// 				<AreaChart data={recentDays}>
// 					<XAxis dataKey="date" />
// 					<YAxis />
// 					<Tooltip />
// 					<Area type="monotone" dataKey="count" stroke="#2f4052" fill="#2D3E4F"/>
// 					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
// 				</AreaChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// }