import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const generateUploadUrl = mutation( async (ctx) => {
	return await ctx.storage.generateUploadUrl();
})

export const generateImageUrl = mutation({
	args: {
		id: v.id("_storage"),
	},
	handler: async (ctx, args) => {
		const url =  await ctx.storage.getUrl(args.id);
		if(!url) return "";
		return url;
	}
})