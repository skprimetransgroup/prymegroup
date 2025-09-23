import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertJobApplicationSchema, insertAdminUserSchema, publicJobSchema, insertProductSchema, updateProductSchema, insertOrderSchema, updateOrderSchema, insertWarehouseRequestSchema, updateWarehouseRequestSchema, insertBlogPostSchema, updateBlogPostSchema, type OrderItem } from "@shared/schema";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Client } from "@replit/object-storage";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extend Express session type
declare module 'express-session' {
  interface SessionData {
    adminUser?: {
      id: string;
      username: string;
    };
  }
}

// Middleware to check admin authentication
function requireAdminAuth(req: any, res: any, next: any) {
  if (!req.session?.adminUser) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Object Storage route for serving public files
  app.get("/api/public/*", async (req, res, next) => {
    // Extract the file path from the URL
    const filePath = req.path.replace("/api/public/", "");
    
    // Try to serve from local assets first (for development)
    const assetsPath = path.join(__dirname, '../client/public/assets', filePath);
    const publicPath = path.join(__dirname, '../client/public', filePath);
    
    let localPath: string | null = null;
    
    // Check assets folder first, then root public folder
    if (fs.existsSync(assetsPath)) {
      localPath = assetsPath;
    } else if (fs.existsSync(publicPath)) {
      localPath = publicPath;
    }
    
    if (localPath) {
      // Set proper headers for video files
      const extension = path.extname(filePath).toLowerCase();
      if (extension === '.mp4' || extension === '.webm' || extension === '.gif') {
        res.setHeader('Accept-Ranges', 'bytes');
      }
      return res.sendFile(path.resolve(localPath));
    }
    
    // If not found locally, try object storage (for production)
    try {
      console.log(`Trying to load from object storage: public/${filePath}`);
      const client = new Client();
      const objectPath = `public/${filePath}`;
      
      // Check if file exists in object storage
      const result = await client.downloadAsBytes(objectPath);
      
      if (result.error) {
        console.log(`Object storage error for ${filePath}:`, result.error);
        throw new Error(`Object storage error: ${result.error.message}`);
      }
      
      const objectBuffer = result.value;
      console.log(`Successfully loaded ${filePath} from object storage, size: ${objectBuffer.length}`);
      
      // Set proper headers for video files
      const extension = path.extname(filePath).toLowerCase();
      if (extension === '.mp4' || extension === '.webm') {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      } else if (extension === '.gif') {
        res.setHeader('Content-Type', 'image/gif');
      }
      
      // Send the file from object storage
      res.send(objectBuffer);
    } catch (error) {
      console.log(`File not found in object storage: ${filePath}`, error);
      res.status(404).json({ message: 'File not found' });
    }
  });

  // Admin Authentication API
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const adminUser = await storage.getAdminUserByUsername(username);
      if (!adminUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const bcrypt = await import('bcryptjs');
      const isValidPassword = await bcrypt.compare(password, adminUser.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Update last login time
      await storage.updateAdminUserLastLogin(adminUser.id);
      
      // Set session
      req.session.adminUser = {
        id: adminUser.id,
        username: adminUser.username,
      };
      
      res.json({
        id: adminUser.id,
        username: adminUser.username,
        message: 'Login successful'
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logout successful' });
    });
  });

  app.get("/api/admin/me", requireAdminAuth, (req, res) => {
    res.json(req.session.adminUser);
  });

  // Jobs API
  app.get("/api/jobs", async (req, res) => {
    try {
      const { type, category, location, query } = req.query;
      const filters = {
        type: type as string,
        category: category as string,
        location: location as string,
        query: query as string,
      };
      
      const jobs = await storage.getJobs(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const jobs = await storage.getFeaturedJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/categories", async (req, res) => {
    try {
      const categories = await storage.getJobsByCategory();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job categories" });
    }
  });

  // Recent jobs for dashboard activity feed
  app.get("/api/jobs/recent", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      const recentJobs = jobs.slice(0, 5); // Get latest 5 jobs
      res.json(recentJobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent jobs" });
    }
  });

  // Get pending jobs (admin only) - MOVED BEFORE :id route
  app.get("/api/jobs/pending", requireAdminAuth, async (req, res) => {
    try {
      const jobs = await storage.getPendingJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pending jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  // Public job submission (for employers)
  app.post("/api/jobs/submit", async (req, res) => {
    try {
      const jobData = publicJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json({ message: "Job submitted successfully and is under review", jobId: job.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid job data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit job" });
    }
  });

  // Admin job creation (for internal use)
  app.post("/api/jobs", requireAdminAuth, async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid job data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create job" });
    }
  });


  // Update job (admin only)
  app.put("/api/jobs/:id", requireAdminAuth, async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.updateJob(req.params.id, jobData);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid job data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update job" });
    }
  });

  // Delete job (admin only)
  app.delete("/api/jobs/:id", requireAdminAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteJob(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete job" });
    }
  });

  // Approve/Deny job (admin only)
  app.patch("/api/jobs/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const { status } = req.body;
      if (!['approved', 'denied'].includes(status)) {
        return res.status(400).json({ message: "Status must be 'approved' or 'denied'" });
      }
      
      const job = await storage.updateJobStatus(req.params.id, status);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json({ message: `Job ${status} successfully`, job });
    } catch (error) {
      res.status(500).json({ message: "Failed to update job status" });
    }
  });

  // Job Applications API
  app.post("/api/jobs/:jobId/apply", async (req, res) => {
    try {
      const applicationData = insertJobApplicationSchema.parse({
        ...req.body,
        jobId: req.params.jobId,
      });
      
      const application = await storage.createJobApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit application" });
    }
  });

  app.get("/api/applications", async (req, res) => {
    try {
      const { jobId, userId } = req.query;
      const applications = await storage.getJobApplications(
        jobId as string,
        userId as string
      );
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Recent applications for dashboard activity feed
  app.get("/api/applications/recent", async (req, res) => {
    try {
      const applications = await storage.getJobApplications();
      const recentApplications = applications.slice(0, 5); // Get latest 5 applications
      res.json(recentApplications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent applications" });
    }
  });

  // Update application status (admin only)
  app.patch("/api/applications/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const { status } = req.body;
      if (!['submitted', 'under_review', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Status must be 'submitted', 'under_review', 'accepted', or 'rejected'" });
      }
      
      const application = await storage.updateJobApplicationStatus(req.params.id, status);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      res.json({ message: `Application status updated to ${status}`, application });
    } catch (error) {
      res.status(500).json({ message: "Failed to update application status" });
    }
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin blog post management
  app.get("/api/admin/blog", requireAdminAuth, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(); // Get all posts (published and drafts)
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/admin/blog/:id", requireAdminAuth, async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/admin/blog", requireAdminAuth, async (req, res) => {
    try {
      const blogData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost({
        ...blogData,
        publishedAt: blogData.published ? new Date() : null,
      });
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.patch("/api/admin/blog/:id", requireAdminAuth, async (req, res) => {
    try {
      const updateData = updateBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, updateData);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdminAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { featured } = req.query;
      const testimonials = await storage.getTestimonials(
        featured === "true" ? true : undefined
      );
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured, published } = req.query;
      const filters = {
        category: category as string,
        featured: featured === "true" ? true : featured === "false" ? false : undefined,
        published: published === "true" ? true : published === "false" ? false : undefined,
      };
      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/categories", async (req, res) => {
    try {
      const categories = await storage.getProductsByCategory();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product categories" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", requireAdminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const updateData = updateProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, updateData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Orders API
  app.get("/api/orders", requireAdminAuth, async (req, res) => {
    try {
      const { status } = req.query;
      const filters = status ? { status: status as string } : undefined;
      const orders = await storage.getOrders(filters);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", requireAdminAuth, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      
      // Server-side total calculation and validation
      let calculatedTotal = 0;
      const validatedItems: OrderItem[] = [];
      
      for (const item of orderData.items) {
        // Verify product exists and get current price
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ 
            message: `Product with ID ${item.productId} not found` 
          });
        }
        
        // Check stock availability
        const availableStock = product.stock ?? 0;
        if (availableStock < item.quantity) {
          return res.status(400).json({ 
            message: `Insufficient stock for ${product.name}. Available: ${availableStock}, Requested: ${item.quantity}` 
          });
        }
        
        // Use server-side price for security
        const serverPrice = parseFloat(product.price);
        const itemTotal = serverPrice * item.quantity;
        calculatedTotal += itemTotal;
        
        validatedItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // Use server price
          name: product.name, // Use server name
        });
      }
      
      // Create order with server-calculated data
      const finalOrderData = {
        ...orderData,
        items: validatedItems,
        total: calculatedTotal.toFixed(2),
      };
      
      const order = await storage.createOrder(finalOrderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const updateData = updateOrderSchema.parse(req.body);
      if (!updateData.status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(req.params.id, updateData.status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json({ message: `Order status updated to ${updateData.status}`, order });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid status data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Warehouse Requests API
  app.get("/api/warehouse/requests", requireAdminAuth, async (req, res) => {
    try {
      const { status } = req.query;
      const filters = status ? { status: status as string } : undefined;
      const requests = await storage.getWarehouseRequests(filters);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch warehouse requests" });
    }
  });

  app.get("/api/warehouse/requests/:id", requireAdminAuth, async (req, res) => {
    try {
      const request = await storage.getWarehouseRequest(req.params.id);
      if (!request) {
        return res.status(404).json({ message: "Warehouse request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch warehouse request" });
    }
  });

  app.post("/api/warehouse/requests", async (req, res) => {
    try {
      const requestData = insertWarehouseRequestSchema.parse(req.body);
      const request = await storage.createWarehouseRequest(requestData);
      res.status(201).json({ message: "Warehouse request submitted successfully", requestId: request.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit warehouse request" });
    }
  });

  app.patch("/api/warehouse/requests/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const updateData = updateWarehouseRequestSchema.parse(req.body);
      if (!updateData.status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const request = await storage.updateWarehouseRequestStatus(req.params.id, updateData.status);
      if (!request) {
        return res.status(404).json({ message: "Warehouse request not found" });
      }
      
      res.json({ message: `Warehouse request ${updateData.status}`, request });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid status data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update warehouse request status" });
    }
  });

  // Statistics API
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Dashboard stats for admin
  app.get("/api/admin/dashboard/stats", requireAdminAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
