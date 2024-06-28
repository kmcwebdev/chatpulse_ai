import { CONVERSATIONSTATUS, PRIORITY } from "@/utils/constants";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export type IConversation = Infer<typeof ChatTableSchema>
export type IRoomInformation = Infer<typeof RoomInformationSchema>
export type IChatMessage = Infer<typeof ChatMessageSchema>

export const ChatMessageSchema = v.object({
	message: v.string(),
	link: v.optional(v.string()),
	sender: v.string(),
	timestamp: v.string(),
	format: v.union(
		v.literal("text"),
		v.literal("image/jpeg"),
		v.literal("image/png"),
		v.literal("application/pdf"),
	),
})

export const RoomInformationSchema = v.object({
	avgResponseTime: v.string(),
	channel: v.string(),
	department: v.string(),
	topic: v.string(),
	priority: v.union(
		v.literal(PRIORITY.CANCELLED),
		v.literal(PRIORITY.INCIDENT),
		v.literal(PRIORITY.REQUEST),
		v.literal(PRIORITY.NONE),
	),
	queueTime: v.string(),
	request: v.string(),
	tags: v.array(v.string()),
})

const ChatTableSchema = v.object({
	_id: v.id("chats"),
	_creationTime: v.string(),
	createdBy: v.string(),
	email: v.string(),
	thread_id: v.string(),
	joinedServiceMembers: v.array(v.string()),
	messages: v.array(ChatMessageSchema),
	roomInformation: RoomInformationSchema,
	status: v.union(
		v.literal(CONVERSATIONSTATUS.NEW),
		v.literal(CONVERSATIONSTATUS.OPEN),
		v.literal(CONVERSATIONSTATUS.CLOSED),
	),
	rating: v.optional(v.number()),
})

//TODO REFACTOR THIS TO USE CONVEX INFER
export default defineSchema({
  chats: defineTable(ChatTableSchema),
	tags: defineTable({
		tags: v.array(v.string()),
	}),
});