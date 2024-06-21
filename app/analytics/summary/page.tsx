"use client"
import Card from '@/components/Card';
import { api } from '@/convex/_generated/api';
import { generateColor } from '@/utils/utils';
import { useQuery } from 'convex/react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

export default function AnalyticsSummaryPage() {
	const chats = useQuery(api.conversations.get.all, { limit: 1000 });

	const getTagsAndChatDays = () => {
		let totalTags = 0;
		const tags: { [key: string]: number } = {};
		const chatDays: { [key: string]: number } = {};

		chats?.forEach((chat) => {
			chat.roomInformation.tags.forEach((tag) => {
				tags[tag] = (tags[tag] || 0) + 1;
				totalTags++;
			});

			const date = new Date(chat._creationTime);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear().toString();
			const dateString = day + month + year;

			chatDays[dateString] = (chatDays[dateString] || 0) + 1;
		});

		return { totalTags, tags, chatDays };
	};

	const { totalTags, tags, chatDays } = getTagsAndChatDays();

	const sortedTags = Object.entries(tags)
		.sort((a, b) => b[1] - a[1])
		.map(([tag, count]) => ({ tag, count }));

	const totalTop5 = sortedTags.slice(0, 5).reduce((sum, item) => sum + item.count, 0);

	const pieData = sortedTags.slice(0, 5).map((item) => ({
		tag: item.tag,
		count: item.count,
		percentage: Math.round((item.count / totalTags) * 100),
		fill: generateColor(),
	}));

	const othersData = {
		tag: 'Others',
		chats: totalTags - totalTop5,
		percentage: Math.round(((totalTags - totalTop5) / totalTags) * 100),
		fill: generateColor(),
	};

	const data = Object.entries(chatDays).map(([date, chats]) => ({
		date,
		chats,
	}));

	const updatedPieData = [...pieData, othersData];

	return (
		<div className="grid grid-rows-12 w-full min-h-fit h-full overflow-scroll no-scrollbar">
			<Card className="row-start-2 row-span-5" title="Total Chats">
				<ResponsiveContainer width="95%" height="90%">
					<BarChart data={data} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Bar key={Math.random() * 1000} dataKey="chats" fill="#f0a154" />
					</BarChart>
				</ResponsiveContainer>
			</Card>
			<div className="grid grid-cols-1 lg:grid-cols-12 row-span-6 min-h-fit h-fit lg:h-full">
			<Card className="col-span-1 lg:col-span-8"> 
					Test
				</Card>
				<Card className="col-span-1 lg:col-span-4 lg:col-start-9" title="Popular Tags">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
							<Pie
								data={updatedPieData}
								dataKey="percentage"
								nameKey="tag"
								cx="50%"
								cy="50%"
								outerRadius="95%"
								fill="#f0a154"
							/>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</Card>
			</div>
		</div>
	);
}