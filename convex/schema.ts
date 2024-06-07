import { CONVERSATIONSTATUS, PRIORITY } from "@/utils/types";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversations: defineTable({
    createdBy: v.string(),
		email: v.string(),
    joinedServiceMembers: v.array(v.any()),
    messages: v.array(
      v.object({
        message: v.string(),
        sender: v.string(),
        timestamp: v.string(),
      })
    ),
    roomInformation: v.object({
      avgResponseTime: v.string(),
      channel: v.string(),
      contact: v.string(),
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
    }),
    status: v.union(
      v.literal(CONVERSATIONSTATUS.NEW),
      v.literal(CONVERSATIONSTATUS.OPEN),
      v.literal(CONVERSATIONSTATUS.CLOSED),
    ),
  }),
});