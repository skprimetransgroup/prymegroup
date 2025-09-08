import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  company: text("company").notNull(),
  type: text("type").notNull(), // Full-Time, Part-time, Contract, Remote
  category: text("category").notNull(),
  requirements: text("requirements"),
  salary: text("salary"),
  featured: boolean("featured").default(false),
  postedAt: timestamp("posted_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => jobs.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  coverLetter: text("cover_letter"),
  resume: text("resume"), // URL or base64
  status: text("status").default("pending"), // pending, reviewed, interviewed, hired, rejected
  appliedAt: timestamp("applied_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  slug: text("slug").notNull().unique(),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  company: text("company").notNull(),
  position: text("position"),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  phone: true,
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  description: true,
  location: true,
  company: true,
  type: true,
  category: true,
  requirements: true,
  salary: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).pick({
  jobId: true,
  userId: true,
  coverLetter: true,
  resume: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  excerpt: true,
  content: true,
  imageUrl: true,
  slug: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  company: true,
  position: true,
  content: true,
  rating: true,
  imageUrl: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
