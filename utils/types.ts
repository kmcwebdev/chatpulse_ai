import { Id } from "@/convex/_generated/dataModel";

export enum CONVERSATIONSTATUS {
	NEW = "New",
	OPEN = "Open",
	CLOSED = "Closed",
}

export enum PRIORITY {
	CANCELLED = "Cancelled",
	INCIDENT = "Incident",
	REQUEST = "Request",
	NONE = "None"
}

export const DEFAULTROOM : IRoomInformation = Object.freeze({
	avgResponseTime: "10 minutes",
	channel: "Live Chat",
	topic: "",
	department: "Service Desk",
	priority: PRIORITY.NONE,
	queueTime: "2 hours",
	request: "",
	tags: [],
})

export interface ConversationItemProps extends IConversation{
	id : string;
	createdAt: number;
	isActive: boolean;
	onClick: (e: string) => void;
}

export interface IConversation { //_id and _creatingTime can be taken from the database, we don't need to input those.
	createdBy: string;
	joinedServiceMembers: string[]
	messages: IChatMessage[];
	roomInformation: IRoomInformation;
	status: CONVERSATIONSTATUS;
}

export interface IRoomInformation {
	avgResponseTime: string;
	channel: string;
	topic: string;
	department: string;
	priority: PRIORITY;
	queueTime: string;
	request: string;
	tags: string[]
}

export interface IChatMessage {
	sender: string;
	message: string;
	timestamp: string;
}

export interface QueryReturn {
	_id: Id<"conversations">;
	_creationTime: number;
	rating?: number | undefined;
	createdBy: string;
	email: string;
	joinedServiceMembers: string[];
	messages: IChatMessage[];
	status: CONVERSATIONSTATUS;
	roomInformation : IRoomInformation;
}
