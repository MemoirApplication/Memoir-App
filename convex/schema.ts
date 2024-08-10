import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
// import { title } from "process";

export default defineSchema({
  // the structure of the "documents" table

  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    workspaceId: v.optional(v.id("workspaces")),
    comments: v.optional(v.array(v.id("comments"))),
    tags: v.optional(v.array(v.id("tags"))),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    isFav: v.boolean(),
    blockId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"])
})