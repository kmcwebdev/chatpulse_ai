import { IRoomInformation } from "@/convex/schema";

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