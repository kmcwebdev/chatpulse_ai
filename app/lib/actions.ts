'use server'

export interface ConversationItemProps {
	id: string;
	title: string;
	description: string;
	timePassed: number;
	participantCount: number;
	isActive?: boolean;
	onClick?: (e: string) => void;
}

//Used 'I' in naming convention instead of 'props' to indicate that these are templates for the data that our database should return.
//Expected format for Chat messages and conversations
export interface IConversation extends ConversationItemProps {
	status: "New" | "Open" | "Closed";
	messages: IChatMessage[];
	createdBy: string;
	roomInformation: IRoomInformation;
}

export interface IRoomInformation {
	channel: string;
	contact: string;
	department: string;
	topic: string;
	priority: string;
	request: string;
	tags: string[] | undefined;
	queueTime: string;
	createdAt: string;
	avgResponseTime: string;
}

export interface IChatMessage {
	sender: string;
	message: string;
	timestamp: string;
	id: number;
}

const conversations: IConversation[] = [
	{
		id: "1",
		title: "Conversation 1",
		description: "This conversation is New",
		status: "New",
		timePassed: 60,
		participantCount: 3,
		isActive: true,
		messages: [
			{
				sender: "Testing Sender",
				message: "Hello World",
				timestamp: "2022-01-01T10:00:00",
				id: 1
			}
		],
		createdBy: "Wing Ching Wong",
		roomInformation: {
			channel: "Channel 1",
			contact: "Contact 1",
			department: "Department 1",
			topic: "Topic 1",
			priority: "Priority 1",
			request: "Request 1",
			tags: ["Tag 1", "Tag 2"],
			queueTime: "10 minutes",
			createdAt: "2022-01-01T10:00:00",
			avgResponseTime: "5 minutes"
		}
	},
	{
		id: "2",
		title: "Conversation 2",
		description: "This conversation is New",
		status: "New",
		timePassed: 120,
		participantCount: 5,
		isActive: false,
		messages: [],
		createdBy: "Williard Wizard",
		roomInformation: {
			channel: "Channel 2",
			contact: "Contact 2",
			department: "Department 2",
			topic: "Topic 2",
			priority: "Priority 2",
			request: "Request 2",
			tags: ["Tag 3", "Tag 4"],
			queueTime: "20 minutes",
			createdAt: "2022-01-01T11:00:00",
			avgResponseTime: "10 minutes"
		}
	},
	{
		id: "3",
		title: "Conversation 3",
		description: "This conversation is New",
		status: "New",
		timePassed: 180,
		participantCount: 2,
		messages: [],
		createdBy: "Klent Clark",
		roomInformation: {
			channel: "Channel 3",
			contact: "Contact 3",
			department: "Department 3",
			topic: "Topic 3",
			priority: "Priority 3",
			request: "Request 3",
			tags: ["Tag 5", "Tag 6"],
			queueTime: "30 minutes",
			createdAt: "2022-01-01T12:00:00",
			avgResponseTime: "15 minutes"
		}
	},
	{
		id: "4",
		title: "Conversation 4",
		description: "Uhm what the Sigma?",
		status: "Open",
		timePassed: 240,
		participantCount: 4,
		isActive: false,
		messages: [],
		createdBy: "Alpha Male",
		roomInformation: {
			channel: "Channel 4",
			contact: "Contact 4",
			department: "Department 4",
			topic: "Topic 4",
			priority: "Priority 4",
			request: "Request 4",
			tags: ["Tag 7", "Tag 8"],
			queueTime: "40 minutes",
			createdAt: "2022-01-01T13:00:00",
			avgResponseTime: "20 minutes"
		}
	},
	{
		id: "5",
		title: "Conversation 5",
		description: "This conversation is Open",
		status: "Open",
		timePassed: 300,
		participantCount: 1,
		messages: [],
		createdBy: "John Doe",
		roomInformation: {
			channel: "Channel 5",
			contact: "Contact 5",
			department: "Department 5",
			topic: "Topic 5",
			priority: "Priority 5",
			request: "Request 5",
			tags: ["Tag 9", "Tag 10"],
			queueTime: "50 minutes",
			createdAt: "2022-01-01T14:00:00",
			avgResponseTime: "25 minutes"
		}
	},
	{
		id: "6",
		title: "Conversation 6",
		description: "This conversation is Open",
		status: "Open",
		timePassed: 360,
		participantCount: 6,
		messages: [],
		createdBy: "Jane Smith",
		roomInformation: {
			channel: "Channel 6",
			contact: "Contact 6",
			department: "Department 6",
			topic: "Topic 6",
			priority: "Priority 6",
			request: "Request 6",
			tags: ["Tag 11", "Tag 12"],
			queueTime: "60 minutes",
			createdAt: "2022-01-01T15:00:00",
			avgResponseTime: "30 minutes"
		}
	},
	{
		id: "7",
		title: "Conversation 7",
		description: "This conversation is Closed",
		status: "Closed",
		timePassed: 420,
		participantCount: 2,
		messages: [],
		createdBy: "Michael Johnson",
		roomInformation: {
			channel: "Channel 7",
			contact: "Contact 7",
			department: "Department 7",
			topic: "Topic 7",
			priority: "Priority 7",
			request: "Request 7",
			tags: ["Tag 13", "Tag 14"],
			queueTime: "70 minutes",
			createdAt: "2022-01-01T16:00:00",
			avgResponseTime: "35 minutes"
		}
	},
	{
		id: "8",
		title: "Conversation 8",
		description: "This conversation is Closed",
		status: "Closed",
		timePassed: 480,
		participantCount: 3,
		messages: [],
		createdBy: "Emily Brown",
		roomInformation: {
			channel: "Channel 8",
			contact: "Contact 8",
			department: "Department 8",
			topic: "Topic 8",
			priority: "Priority 8",
			request: "Request 8",
			tags: ["Tag 15", "Tag 16"],
			queueTime: "80 minutes",
			createdAt: "2022-01-01T17:00:00",
			avgResponseTime: "40 minutes"
		}
	},
	{
		id: "9",
		title: "Conversation 9",
		description: "This conversation is Closed",
		status: "Closed",
		timePassed: 540,
		participantCount: 5,
		messages: [],
		createdBy: "David Wilson",
		roomInformation: {
			channel: "Channel 9",
			contact: "Contact 9",
			department: "Department 9",
			topic: "Topic 9",
			priority: "Priority 9",
			request: "Request 9",
			tags: ["Tag 17", "Tag 18"],
			queueTime: "90 minutes",
			createdAt: "2022-01-01T18:00:00",
			avgResponseTime: "45 minutes"
		}
	},
	{
		id: "10",
		title: "Conversation 10",
		description: "This conversation is New",
		status: "New",
		timePassed: 600,
		participantCount: 4,
		messages: [],
		createdBy: "Zephyr Zircon",
		roomInformation: {
			channel: "Channel 10",
			contact: "Contact 10",
			department: "Department 10",
			topic: "Topic 10",
			priority: "Priority 10",
			request: "Request 10",
			tags: ["Tag 19", "Tag 20"],
			queueTime: "100 minutes",
			createdAt: "2022-01-01T19:00:00",
			avgResponseTime: "50 minutes"
		}
	},
	{
		id: "11",
		title: "Conversation 11",
		description: "This conversation is Open",
		status: "Open",
		timePassed: 660,
		participantCount: 2,
		messages: [],
		createdBy: "Luna Lovegood",
		roomInformation: {
			channel: "Channel 11",
			contact: "Contact 11",
			department: "Department 11",
			topic: "Topic 11",
			priority: "Priority 11",
			request: "Request 11",
			tags: ["Tag 21", "Tag 22"],
			queueTime: "110 minutes",
			createdAt: "2022-01-01T20:00:00",
			avgResponseTime: "55 minutes"
		}
	},
	{
		id: "12",
		title: "Conversation 12",
		description: "This conversation is Closed",
		status: "Closed",
		timePassed: 720,
		participantCount: 3,
		messages: [],
		createdBy: "Mystique Moon",
		roomInformation: {
			channel: "Channel 12",
			contact: "Contact 12",
			department: "Department 12",
			topic: "Topic 12",
			priority: "Priority 12",
			request: "Request 12",
			tags: ["Tag 23", "Tag 24"],
			queueTime: "120 minutes",
			createdAt: "2022-01-01T21:00:00",
			avgResponseTime: "60 minutes"
		}
	}
];

export async function getConversationsByStatus(tab: string): Promise<ConversationItemProps[]> {
	const data = conversations.filter((conversation) => conversation.status === tab);
	
	return data.map(({ status, messages, ...rest }) => rest);
}

export async function getConversationsById(id: string): Promise<IConversation | null> {
	const conversation = conversations.find((conversation) => conversation.id === id);
	if (conversation === undefined)
		return {
			id: "-1",
			title: "Testing Title",
			description: "Testing description",
			status: "New",
			timePassed: Math.floor(Math.random() * 1000),
			participantCount: Math.floor(Math.random() * 10),
			createdBy: "Test User",
			isActive: true,
			messages: [
				{
					sender: "Testing Sender",
					message: "Hello World",
					timestamp: "2022-01-01T10:00:00",
					id: 1
				}
			],
			roomInformation: {
				channel: "Channel Test",
				contact: "Contact Test",
				department: "Department Test",
				topic: "Topic Test",
				priority: "Priority Test",
				request: "Request Test",
				tags: ["Tag Test"],
				queueTime: "Test",
				createdAt: "2022-01-01T10:00:00",
				avgResponseTime: "Test"
			}
		}

	else return conversation
}