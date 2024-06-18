import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const all = query({
	args: {
	},
	handler: async (ctx, args) => {
		return await ctx.db.query("conversations").collect()
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