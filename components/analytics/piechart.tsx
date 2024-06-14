// 'use client'
// import { IConversation } from "@/app/lib/actions";
// import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// export default function TagPercentage(props: {
// 	conversations: IConversation[] | undefined;
// 	className?: string;
// }) {
// 	// Calculate the total count for each tag
// 	const tagCounts: { [tag: string]: number } = {};
// 	props.conversations?.forEach((conversation) => {
// 		conversation.roomInformation.tags?.forEach((tag) => {
// 			tagCounts[tag] = (tagCounts[tag] || 0) + 1;
// 		});
// 	});

// 	// Sort the tags by count in descending order
// 	const sortedTags = Object.keys(tagCounts).sort(
// 		(a, b) => tagCounts[b] - tagCounts[a]
// 	);

// 	// Get the top 5 tags
// 	const topTags = sortedTags.slice(0, 5);

// 	// Calculate the count for 'others'
// 	const othersCount = sortedTags
// 		.slice(5)
// 		.reduce((count, tag) => count + tagCounts[tag], 0);

// 	// Prepare the data for the pie chart
// 	const tagData = topTags.map((tag, index) => ({
// 		name: tag,
// 		percentage: Math.round(tagCounts[tag] / (props.conversations?.length ?? 1) * 100),
// 		fill: getSegmentColor(index), // Assign a different color to each segment
// 	}));
// 	tagData.push({
// 		name: "Others",
// 		percentage: Math.round(othersCount / (props.conversations?.length ?? 1)) * 100,
// 		fill: getSegmentColor(topTags.length), // Assign a different color to the 'Others' segment
// 	});

// 	// Render the pie chart
// 	return (
// 		<div className={`grid grid-rows-12 ${props.className}`}>
// 			<div className="row-span-2 flex items-center justify-left px-4">
// 				<h2 className="text-lg font-bold">Tag Percentage</h2>
// 			</div>
// 			<ResponsiveContainer
// 				width="100%"
// 				height="100%"
// 				className="row-span-10"
// 			>
// 				<PieChart
// 					margin={{
// 						top: 0,
// 						right: 0,
// 						left: 0,
// 						bottom: 0,
// 					}}
// 				>
// 					<Pie
// 						dataKey="percentage"
// 						isAnimationActive={false}
// 						data={tagData}
// 						cx="50%"
// 						cy="50%"
// 						outerRadius="80%"
// 						fill="#8884d8"
// 						label
// 					/>
// 					<Tooltip />
// 				</PieChart>
// 			</ResponsiveContainer>
// 		</div>);
// }

// // Helper function to get a different color for each segment
// function getSegmentColor(index: number): string {
// 	const colors = [
// 		"#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7",
// 		"#2E4053", "#273746", "#4A235A", "#5B2C6F", "#7D3C98",
// 		"#154360", "#1B4F72", "#0E6251", "#145A32", "#186A3B",
// 		"#7E5109", "#784212", "#6E2C00", "#512E5F", "#4A235A",
// 		"#283747", "#212F3D", "#4D5656", "#5D6D7E", "#85929E",
// 		"#1F3A93", "#1A5276", "#117A65", "#148F77", "#17A589",
// 		"#D68910", "#CA6F1E", "#BA4A00", "#8E44AD", "#7D3C98",
// 		"#1E8449", "#196F3D", "#D4AC0D", "#D68910", "#CA6F1E"
// 	];

// 	return colors[index % colors.length];
// }
