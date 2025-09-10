import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
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
  status: text("status").default("pending"), // pending, approved, denied
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
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

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  stock: integer("stock").default(0),
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  items: jsonb("items").notNull(), // Array of order items
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  shippingAddress: text("shipping_address").notNull(),
  status: text("status").default("pending"), // pending, paid, fulfilled, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const warehouseRequests = pgTable("warehouse_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: text("company").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  location: text("location").notNull(), // Added for mediation service
  storageType: text("storage_type").notNull(), // dry, cold, hazardous
  storageSize: text("storage_size").notNull(), // small, medium, large
  duration: text("duration").notNull(), // short-term, long-term
  requirements: text("requirements"), // Additional requirements
  status: text("status").default("new"), // new, contacted, closed
  createdAt: timestamp("created_at").defaultNow(),
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
  contactEmail: true,
  contactPhone: true,
});

export const publicJobSchema = insertJobSchema.extend({
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
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

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  stock: true,
  featured: true,
  published: true,
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  description: z.string().min(1, "Product description is required").optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid decimal number").optional(),
  imageUrl: z.string().url("Image URL must be valid").optional(),
  category: z.string().min(1, "Category is required").optional(),
  stock: z.number().min(0, "Stock cannot be negative").optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
}).partial();

// Define OrderItem schema for proper validation
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  name: z.string().min(1, "Product name is required"),
});

// Status enums for validation
export const orderStatusEnum = z.enum(["pending", "paid", "fulfilled", "cancelled"]);
export const warehouseStatusEnum = z.enum(["new", "contacted", "closed"]);
export const storageTypeEnum = z.enum(["dry", "cold", "hazardous"]);
export const storageSizeEnum = z.enum(["small", "medium", "large"]);
export const durationEnum = z.enum(["short-term", "long-term"]);

export const insertOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(1, "Shipping address is required"),
});

export const updateOrderSchema = z.object({
  status: orderStatusEnum,
}).partial();

export const insertWarehouseRequestSchema = createInsertSchema(warehouseRequests).pick({
  company: true,
  contactName: true,
  contactEmail: true,
  contactPhone: true,
  location: true,
  storageType: true,
  storageSize: true,
  duration: true,
  requirements: true,
}).extend({
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(1, "Location is required"),
  storageType: storageTypeEnum,
  storageSize: storageSizeEnum,
  duration: durationEnum,
});

export const updateWarehouseRequestSchema = z.object({
  status: warehouseStatusEnum,
}).partial();

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
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type OrderItem = z.infer<typeof orderItemSchema>;
export type InsertWarehouseRequest = z.infer<typeof insertWarehouseRequestSchema>;
export type UpdateWarehouseRequest = z.infer<typeof updateWarehouseRequestSchema>;
export type WarehouseRequest = typeof warehouseRequests.$inferSelect;
