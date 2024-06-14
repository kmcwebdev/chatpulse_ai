import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const all = query({
	args : {
		limit : v.optional(v.number())
	}, 
	handler: async (ctx, args) => {
		return await ctx.db.query("tags").take(args.limit || 10);
	}
})