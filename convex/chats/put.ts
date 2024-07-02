"use server"

import { CONVERSATIONSTATUS, DEFAULTROOM } from "@/utils/constants";
import { v } from "convex/values";
import { api, internal } from "../_generated/api";
import { action, internalMutation, mutation } from "../_generated/server";
import { ChatMessageSchema, IConversation, RoomInformationSchema } from "../schema";

export const create  = action({
	args: {
		createdBy: v.string(),
		email: v.string(),
	},	
	handler: async (ctx, args): Promise<any> => {
		const res = await fetch(`${process.env.CHATPULSE_BASE_URL}/api/threads/${process.env.CHATPULSE_ASSISTANT_ID}`, {
			method: "POST",
		});

		const response = await res.json();
		const thread_id = response.thread_id;
		return await ctx.runMutation(internal.chats.put.internalCreate, {
			createdBy: args.createdBy,
			email: args.email,
			thread_id,
		});
	}
})

export const update = action({
	args: {
		id: v.id("chats"),
		message: ChatMessageSchema,
	},
	handler : async (ctx, args) => {
		const chat = await ctx.runQuery(api.chats.get.byId, {
			id: args.id,
		}) as IConversation
		if(chat == null) return;
		if(chat.status === CONVERSATIONSTATUS.NEW) { //If Chat is still new then get auto response
			await fetch(`${process.env.CHATPULSE_BASE_URL}/api/threads/${chat.thread_id}/messages`, {
				method: "POST",
				body: JSON.stringify({
					"assistant_id": process.env.CHATPULSE_ASSISTANT_ID,
					"content" : args.message.message,
				}),
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const res = await fetch(`${process.env.CHATPULSE_BASE_URL}/api/threads/${chat.thread_id}/messages`, {
				method: "GET",
			});
			const response = await res.json()
			const latestMessage = response[0].content
			await ctx.runMutation(internal.chats.put.internalUpdate, {
				id: args.id,
				messages: [
					args.message,
					{	
						sender: "Assistant",
						message: latestMessage,
						timestamp: new Date().toISOString(),
						format: "text"
					}
				]
			})
		} else {
			await ctx.runMutation(internal.chats.put.internalUpdate, {
				id: args.id,
				messages: [args.message]
			})
		}
	}
})

export const newServiceMember = mutation({
	args: {
		id: v.id("chats"),
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

export const internalUpdate = internalMutation({
	args: {
		id: v.id("chats"),
		messages: v.array(ChatMessageSchema),
	},
	handler: async (ctx, args) => {
		const chats = await ctx.db.get(args.id);
		await ctx.db.patch(args.id, { messages: [...(chats?.messages ?? []), ...args.messages] });
	}
})

export const internalCreate = internalMutation({
	args :{ 
		createdBy: v.string(),
		email: v.string(),
		thread_id: v.string(),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert("chats", {
			createdBy: args.createdBy,
			email: args.email,
			joinedServiceMembers: [],
			thread_id: args.thread_id,
			messages: [
				{
					sender: "Assistant",
					message: "Hello, how can I help you?",
					timestamp: new Date().toISOString(),
					format: "text",
				}
			],
			roomInformation: DEFAULTROOM,
			status: CONVERSATIONSTATUS.NEW
		})

		return id;
	}
})

export const closeChat = mutation({
	args: {
		id: v.id("chats")
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, {
			status: CONVERSATIONSTATUS.CLOSED,
		})
	}
})


export const roomInformation = mutation({
	args: {
		id : v.id("chats"),
		roomInformation: RoomInformationSchema,
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, {
			roomInformation: args.roomInformation,
		})
	}
})