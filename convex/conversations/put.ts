import { CONVERSATIONSTATUS, DEFAULTROOM } from "@/utils/types";
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