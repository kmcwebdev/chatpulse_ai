'use server'
import { CONVERSATIONSTATUS, DEFAULTROOM, PRIORITY } from "@/utils/types";
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const message = mutation({
	args: {
		id: v.id("conversations"),
		messages: v.array(v.object({ //Need to update this whenever we change the IChatMessage Interface
			message: v.string(),
			sender: v.string(),
			timestamp: v.string(),
		}))
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { messages: args.messages })
	}
})

export const newMessage = mutation({
	args:{
		createdBy: v.string(),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("conversations", {
			createdBy: args.createdBy,
			email: args.email,
			joinedServiceMembers: [],
			messages: [],
			roomInformation: DEFAULTROOM,
			status: CONVERSATIONSTATUS.NEW
		})
	}
})

export const newServiceMemeber = mutation({
	args: {
		id: v.id("conversations"),
		serviceMember: v.string(),
	},
	handler: async (ctx, args) => {
		const oldData = await ctx.db.get(args.id);
		return await ctx.db.patch(args.id, {
			joinedServiceMembers: [...(oldData?.joinedServiceMembers ?? []), args.serviceMember],
			status : CONVERSATIONSTATUS.OPEN,
		})
	}
})


//Keep this updated with IRoomInformation
export const closeChat = mutation({
	args: {
		id: v.id("conversations")
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, {
			status: CONVERSATIONSTATUS.CLOSED,
		})
	}
})

export const roomInformation = mutation({
	args: {
		id : v.id("conversations"),
		roomInformation: v.object({
			avgResponseTime : v.string(),
			channel : v.string(),
			topic : v.string(),
			department: v.string(),
			priority : v.union(
				v.literal(PRIORITY.CANCELLED),
				v.literal(PRIORITY.INCIDENT),
				v.literal(PRIORITY.NONE),
				v.literal(PRIORITY.REQUEST)
			),
			queueTime : v.string(),
			request : v.string(),
			tags : v.array(v.string())
		})
	},
	handler: async (ctx, args) => {
		const oldData = await ctx.db.get(args.id);
		return await ctx.db.patch(args.id, {
			roomInformation: args.roomInformation,
		})
	}
})