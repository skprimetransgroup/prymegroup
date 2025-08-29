import { type User, type InsertUser, type Job, type InsertJob, type JobApplication, type InsertJobApplication, type BlogPost, type Testimonial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Jobs
  getJobs(filters?: { type?: string; category?: string; location?: string; query?: string }): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  getFeaturedJobs(): Promise<Job[]>;
  getJobsByCategory(): Promise<{ category: string; count: number }[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<Job>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;

  // Job Applications
  getJobApplications(jobId?: string, userId?: string): Promise<JobApplication[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  updateJobApplicationStatus(id: string, status: string): Promise<JobApplication | undefined>;

  // Blog Posts
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;

  // Testimonials
  getTestimonials(featured?: boolean): Promise<Testimonial[]>;

  // Statistics
  getStats(): Promise<{ jobs: number; employers: number; hired: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;
  private jobApplications: Map<string, JobApplication>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.jobApplications = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed jobs
    const sampleJobs: Job[] = [
      {
        id: "job-1",
        title: "Paper-Mill Machine Operator",
        description: "Operate and maintain paper mill machinery in a fast-paced manufacturing environment.",
        location: "Ontario",
        company: "Prime Manufacturing Co.",
        type: "Full-Time",
        category: "Manufacturing",
        requirements: "High school diploma, mechanical aptitude, 2+ years experience",
        salary: "$45,000 - $55,000",
        featured: true,
        postedAt: new Date("2022-12-29"),
        expiresAt: null,
      },
      {
        id: "job-2",
        title: "General Labour",
        description: "General labor position with opportunities for growth in warehouse operations.",
        location: "Mississauga",
        company: "Logistics Plus",
        type: "Full-Time",
        category: "Warehouse",
        requirements: "Physical fitness, reliability, willingness to learn",
        salary: "$35,000 - $40,000",
        featured: true,
        postedAt: new Date("2022-12-29"),
        expiresAt: null,
      },
      {
        id: "job-3",
        title: "Delivery Driver",
        description: "Delivery driver for package and freight delivery across GTA.",
        location: "Anywhere",
        company: "Express Delivery Services",
        type: "Full-Time",
        category: "Transportation",
        requirements: "Valid G license, clean driving record, customer service skills",
        salary: "$40,000 - $50,000",
        featured: true,
        postedAt: new Date("2022-12-29"),
        expiresAt: null,
      },
      {
        id: "job-4",
        title: "Bakery Workers",
        description: "Part-time bakery worker for early morning shift in commercial bakery.",
        location: "Mississauga",
        company: "Fresh Bake Co.",
        type: "Part-time",
        category: "Food Service",
        requirements: "Food handling certificate, early morning availability",
        salary: "$16 - $18/hour",
        featured: true,
        postedAt: new Date("2022-12-29"),
        expiresAt: null,
      },
      {
        id: "job-5",
        title: "Product Designer",
        description: "Remote product designer for digital products and user experience design.",
        location: "Global",
        company: "Tech Innovations Inc.",
        type: "Full-Time",
        category: "Design",
        requirements: "Bachelor's degree in Design, 3+ years UX/UI experience, portfolio required",
        salary: "$65,000 - $85,000",
        featured: true,
        postedAt: new Date("2022-12-27"),
        expiresAt: null,
      },
      {
        id: "job-6",
        title: "Office Admin",
        description: "Part-time office administrator for busy corporate office.",
        location: "Brampton",
        company: "Corporate Solutions Ltd.",
        type: "Part-time",
        category: "Administrative",
        requirements: "Office suite proficiency, communication skills, attention to detail",
        salary: "$18 - $22/hour",
        featured: true,
        postedAt: new Date("2022-12-26"),
        expiresAt: null,
      },
    ];

    sampleJobs.forEach(job => this.jobs.set(job.id, job));

    // Seed blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "blog-1",
        title: "Job document checklist in Canada",
        excerpt: "Job document checklist in Canada Prime Trans Group • December",
        content: "Complete guide to preparing your job application documents for the Canadian job market...",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3",
        slug: "job-document-checklist-canada",
        published: true,
        publishedAt: new Date("2022-12-27"),
      },
      {
        id: "blog-2",
        title: "Does cover letter matter",
        excerpt: "Across any industry and level of work, there's one step to the process that's bound to slow down even the most qualified candidate.",
        content: "Understanding the importance of cover letters in today's job market...",
        imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3",
        slug: "does-cover-letter-matter",
        published: true,
        publishedAt: new Date("2022-12-27"),
      },
      {
        id: "blog-3",
        title: "How to write a good resume",
        excerpt: "Your resume must clearly, concisely and strategically present your qualifications to get a recruiter interested in meeting you.",
        content: "Step by step guide to creating an effective resume that gets results...",
        imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3",
        slug: "how-to-write-good-resume",
        published: true,
        publishedAt: new Date("2022-12-27"),
      },
    ];

    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));

    // Seed testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: "testimonial-1",
        name: "Sarah Johnson",
        company: "Ashley Home Furniture Mississauga",
        position: "HR Manager",
        content: "We are working with the prime trans group for a number of years for our changing recruitment needs.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
        featured: true,
      },
      {
        id: "testimonial-2",
        name: "Michael Chen",
        company: "FastFrate Group",
        position: "Operations Director",
        content: "They are one of the best recruitment agencies we work with for the labor shortage.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3",
        featured: true,
      },
      {
        id: "testimonial-3",
        name: "David Rodriguez",
        company: "VA Transport",
        position: "Fleet Manager",
        content: "Prime trans group has helped us in many ways, reducing our hiring expenses and making sure we have skilled resources.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
        featured: true,
      },
      {
        id: "testimonial-4",
        name: "Lisa Wang",
        company: "Apps Transport Group",
        position: "HR Director",
        content: "We are working with them to fill our resource gap for dynamic needs, they are one of the best in the industry.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
        featured: true,
      },
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phone: insertUser.phone || null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Job methods
  async getJobs(filters?: { type?: string; category?: string; location?: string; query?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());
    
    if (filters) {
      if (filters.type) {
        jobs = jobs.filter(job => job.type.toLowerCase() === filters.type?.toLowerCase());
      }
      if (filters.category) {
        jobs = jobs.filter(job => job.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters.location) {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location?.toLowerCase() || ''));
      }
      if (filters.query) {
        const query = filters.query.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
        );
      }
    }
    
    return jobs.sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getFeaturedJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.featured)
      .sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));
  }

  async getJobsByCategory(): Promise<{ category: string; count: number }[]> {
    const categoryMap = new Map<string, number>();
    
    Array.from(this.jobs.values()).forEach(job => {
      const current = categoryMap.get(job.category) || 0;
      categoryMap.set(job.category, current + 1);
    });
    
    return Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count
    }));
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      requirements: insertJob.requirements || null,
      salary: insertJob.salary || null,
      featured: false,
      postedAt: new Date(),
      expiresAt: null,
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: string, updates: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // Job Application methods
  async getJobApplications(jobId?: string, userId?: string): Promise<JobApplication[]> {
    let applications = Array.from(this.jobApplications.values());
    
    if (jobId) {
      applications = applications.filter(app => app.jobId === jobId);
    }
    if (userId) {
      applications = applications.filter(app => app.userId === userId);
    }
    
    return applications.sort((a, b) => (b.appliedAt?.getTime() || 0) - (a.appliedAt?.getTime() || 0));
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = randomUUID();
    const application: JobApplication = {
      ...insertApplication,
      id,
      coverLetter: insertApplication.coverLetter || null,
      resume: insertApplication.resume || null,
      status: "pending",
      appliedAt: new Date(),
    };
    this.jobApplications.set(id, application);
    return application;
  }

  async updateJobApplicationStatus(id: string, status: string): Promise<JobApplication | undefined> {
    const application = this.jobApplications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, status };
    this.jobApplications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Blog methods
  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (published !== undefined) {
      posts = posts.filter(post => post.published === published);
    }
    
    return posts.sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  // Testimonial methods
  async getTestimonials(featured?: boolean): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    
    if (featured !== undefined) {
      testimonials = testimonials.filter(testimonial => testimonial.featured === featured);
    }
    
    return testimonials;
  }

  // Statistics
  async getStats(): Promise<{ jobs: number; employers: number; hired: number }> {
    const jobs = this.jobs.size;
    const employers = new Set(Array.from(this.jobs.values()).map(job => job.company)).size;
    const hired = Array.from(this.jobApplications.values()).filter(app => app.status === "hired").length + 1485; // Base number from original site
    
    return {
      jobs: jobs + 734, // Base number from original site
      employers: employers + 370, // Base number from original site
      hired,
    };
  }
}

export const storage = new MemStorage();
