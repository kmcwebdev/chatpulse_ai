'use server'
import { CONVERSATIONSTATUS, DEFAULTROOM } from "@/utils/constants";
import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { ChatMessageSchema, RoomInformationSchema } from "../schema";

export const message = mutation({
	args: {
		id: v.id("conversations"),
		messages: ChatMessageSchema,
	},
	handler: async (ctx, args) => {
		const chats = await ctx.db.get(args.id);
		await ctx.db.patch(args.id, { messages: [...(chats?.messages ?? []), args.messages] });
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
		roomInformation: RoomInformationSchema,
	},
	handler: async (ctx, args) => {
		const oldData = await ctx.db.get(args.id);
		return await ctx.db.patch(args.id, {
			roomInformation: args.roomInformation,
		})
	}
})