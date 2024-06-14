import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const all = query({
	args: {
		limit : v.optional(v.number())
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("conversations").order("desc").take(args.limit || 10)
	}
})
	
export const byId = query({
	args: {
		id: v.id("conversations")
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	}
})