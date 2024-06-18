"use client"
import { api } from '@/convex/_generated/api';
import { trunc } from '@/utils/utils';
import { TagIcon } from '@heroicons/react/24/solid';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AnalyticsSummaryPage() {

	const chats = useQuery(api.conversations.get.all, { limit : 100 })
	
	let chatDays: { [key: string]: number } = {};
	const tags :{ [key: string] : number} = {};
	let totalTags : number = 0;

	chats?.map((item) => {
		
		item.roomInformation.tags.forEach((tag) => {
			if(Number(tags[tag]) != 0 && !Number.isNaN(Number(tags[tag]))) {
				tags[tag]++;
			} else {
				tags[tag] = 1;
			}
			totalTags++;
		})

		const date = new Date(item._creationTime);
		const day = date.getDate().toString().padStart(2, '0');
		const month = date.getMonth().toString().padStart(2, '0');
		const year = date.getFullYear().toString();
		const dateString = day + month + year;
		if(Number(chatDays[dateString]) != 0 && !Number.isNaN(Number(chatDays[dateString]))) {
			chatDays[dateString]++;
		} else {
			chatDays[dateString] = 1;
		}
	})

	const colors = ["#f0a154", "#e08d43", "#c97432", "#a95c21", "#874310", "#662100"];

	const sortedTags = Object.entries(tags)
	.sort((a, b) => b[1] - a[1])
	.map(([tag, count]) => ({tag, count}))

	const totalTop5 = sortedTags.slice(0, 5).reduce((sum, item) => sum + item.count, 0);
	
	const pieData = sortedTags.slice(0, 5).map((item, index) => ({
		tag: item.tag,
		count: item.count,
		percentage: Math.round((item.count / totalTags) * 100),
		fill: colors[index],
	}));

	const othersData = {
		date: "Others",
		chats: totalTags - totalTop5,
		percentage: Math.round(((totalTags - totalTop5) / totalTags) * 100),
		fill: colors[colors.length - 1],
	};

	const updatedPieData = [...pieData, othersData];

	const data = Object.entries(chatDays).map(([date, chats]) => ({
		date: date.slice(0, 2) + '-' + date.slice(2, 4) + '-' + date.slice(4),
		chats,
	}));

	return (
		<div className="grid grid-rows-12 h-full w-full ">
			<Card className="row-span-6" title="Total Chats">
				<ResponsiveContainer width="100%" height="80%">
					<BarChart
						data={data}
						margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Bar key={Math.random() * 1000} dataKey="chats" fill="#f0a154" />
					</BarChart>
				</ResponsiveContainer>
			</Card>
			<div className="grid row-span-6 grid-cols-12">
				<Card className="col-span-7" title={<>
						<span>Popular Tags</span>
						<TagIcon className="size-5" />
					</>}>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
							<Pie
								data={updatedPieData}
								dataKey="percentage"
								nameKey="date"
								cx="50%"
								cy="50%"
								outerRadius="95%"
								fill="#f0a154"
							/>
							<Tooltip />
							<Legend align="right" layout="vertical" />
						</PieChart>
					</ResponsiveContainer>
				</Card>
				<div className="col-span-5">
					<Card title="Recent Chats">
						{
							chats ? chats.slice(0,5).map((chat,index) => {
								return(
									<Link key={index} href={`/conversations/${chat._id}`} className="flex flex-col grow">
										<div className="flex items-center justify-between space-x-3">
											<h3 className="hover:underline">{trunc(chat.createdBy, 20)}</h3>
											<small className="text-gray-500 font-light">{new Date(chat._creationTime).toLocaleDateString()}</small>
										</div>
										<small className="text-gray-500 font-light">{trunc(chat.messages[chat.messages.length - 1]?.message, 20) || "No Activity"}</small>
									</Link>
								)
							}) : <RecentChatsSkeleton />
						}
					</Card>
				</div>
			</div>
		</div>
	);
}

function Card(props: {
	title ?: string | React.ReactNode;
	description ?: string;
	className ?: string;
	children ?: React.ReactNode;
}) {
	return(
	<div className={`${props.className} bg-white card shadow-sm m-2`}>
		<div className="card-body">
			{
				props.title ?  <div className="card-title">{props.title}</div> : null
			}

			{
				props.description ? <p>{props.description}</p> : null
			}
			{props.children}
		</div>
	</div>
	)
}

function RecentChatsSkeleton() {
	return (
		<div className="row-span-1">
			<div className="grid grid-cols-12">
				<div className="skeleton col-span-6 h-4"></div>
				<div className="skeleton col-start-10 col-span-3 h-4"></div>
			</div>
			<div className="skeleton h-4 mt-2"></div>
		</div>
	)
}