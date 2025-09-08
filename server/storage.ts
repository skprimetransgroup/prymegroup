import { type User, type InsertUser, type Job, type InsertJob, type JobApplication, type InsertJobApplication, type BlogPost, type Testimonial, type AdminUser, type InsertAdminUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Admin Users
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUserLastLogin(id: string): Promise<AdminUser | undefined>;

  // Jobs
  getJobs(filters?: { type?: string; category?: string; location?: string; query?: string; status?: string }): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  getFeaturedJobs(): Promise<Job[]>;
  getJobsByCategory(): Promise<{ category: string; count: number }[]>;
  getPendingJobs(): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<Job>): Promise<Job | undefined>;
  updateJobStatus(id: string, status: string): Promise<Job | undefined>;
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
  private adminUsers: Map<string, AdminUser>;
  private jobs: Map<string, Job>;
  private jobApplications: Map<string, JobApplication>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.users = new Map();
    this.adminUsers = new Map();
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
        status: "approved",
        contactEmail: "hr@primemanufacturing.com",
        contactPhone: "+1 (555) 123-4567",
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
        status: "approved",
        contactEmail: "jobs@logisticsplus.com",
        contactPhone: "+1 (555) 234-5678",
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
        status: "approved",
        contactEmail: "careers@expressdelivery.com",
        contactPhone: "+1 (555) 345-6789",
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
        status: "approved",
        contactEmail: "hiring@freshbake.com",
        contactPhone: "+1 (555) 456-7890",
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
        status: "approved",
        contactEmail: "talent@techinnovations.com",
        contactPhone: "+1 (555) 567-8901",
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
        status: "approved",
        contactEmail: "admin@corpsolutions.com",
        contactPhone: "+1 (555) 678-9012",
        postedAt: new Date("2022-12-26"),
        expiresAt: null,
      },
    ];

    sampleJobs.forEach(job => this.jobs.set(job.id, job));

    // Seed blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "blog-1",
        title: "Job Document Checklist in Canada",
        excerpt: "In order to find a job in Canada, there are specific documents required to submit to potential employers before you are considered for a particular position.",
        content: `In order to find a job in Canada, there are specific documents required to submit to potential employers before you are considered for a particular position. The exact types of documents required will depend on several factors, such as the job you apply for and the program applied under. Before you set your sights on a job and start pounding the pavement in search of employment, be sure to have your arsenal of documentation ready to present.

**Social Insurance Number (SIN)**

One of the first pieces of documentation that you will need before you are eligible to retain employment in Canada is your Social Insurance Number, or "SIN" for short. Many parents apply for a SIN for their children shortly after they are born so that they will already have this important piece of information when they are of age to seek out work.

A SIN is a nine-digit number that's unique to each Canadian and is required to work in Canada, as well as to gain access to various government benefits and programs. In order to apply for your SIN, you will need to show various pieces of original documents that prove your identity (no photocopies allowed), such as:

• Certificate of birth or birth certificate
• Certificate of Canadian Citizenship
• Certificate of Registration of Birth Abroad

These documents apply to Canadian citizens. For permanent residents of Canada (those who have permanent resident status in Canada but are not Canadian citizens), an original copy of one of the following is required as proof of identity to apply for a SIN:

• Permanent resident card
• Confirmation of Permanent Residence
• Record of Landing
• Verification of Landing
• Status Verification or Verification of Status

These documents must then be taken to a Service Canada office when applying for a SIN. This number is highly confidential and should only be given out to verified employers when requested.

**Work Permit**

Over 300,000 foreign employees come to Canada to work on temporary work permits every year. If you are foreign to Canada and wish to seek employment, you will require a work permit to get a job. In addition, an offer of employment will be required from a Canadian employer prior to being given a temporary work permit. Sometimes a Temporary Resident Visa will also be required, depending on your country of citizenship.

**Labour Market Impact Assessment (LMIA)**

While you aren't necessarily responsible for obtaining a Labour Market Impact Assessment (LMIA) as a foreign worker, prospective employers will require one when hiring foreign employees. A LMIA is a document required by employers in Canada who hire foreign employees. A positive LMIA essentially shows that a need exists to hire foreign workers to fill jobs and that there are currently no Canadian workers available to fill them.

**Resume**

Before applying for a job, it's typically necessary to submit a resume along with any application being filled out. Your resume basically outlines your previous work and educational experience that a potential employer would want to know about before deciding whether or not to hire you for a specific job.

Your resume should contain a few key elements in order for it to impress employers, including the following:

• An engaging summary of your qualifications
• Core competencies and proof of relative expertise
• Relevant work and volunteer experience
• Educational certificates, diplomas or degrees

Your resume should:
• Be honest
• Have a proper format
• Be well-organized and free of any spelling or grammatical errors
• Feature relevant keywords that are related to the job position you're applying for
• Be up-to-date

The purpose of your resume is to essentially describe what you bring to the table and what you can do for the company.

**Cover Letter**

Accompanying your resume or job application should be a cover letter, which essentially introduces your resume and yourself to the employer. It will outline the reasons why you are applying for the job and why you would make a perfect fit for the position. Your cover letter should be professional but still personable at the same time while highlighting specific aspects of your application.

Your cover letter should:
• Address the person your application is intended for
• Showcase why and how your skills are perfect for the job at hand
• Highlight previous achievements that are relative to the job being applied for
• Include your contact information

**Educational Documentation**

If a specific job requires any type of formal educational training, you may be required to submit proof of such education in the form of a diploma, certificate, degree, or even a transcript. Depending on the position, your prospective employer may do a background check on you to find out whether or not you have the educational training required to be considered for the position you're applying for.

**References**

Your prospective employer may want to get in touch with some of your previous employers to verify the type of employee you were and could be if hired for the job you're applying for. As such, you may be asked to submit a list of references of previous employers, along with their contact information.`,
        imageUrl: "@assets/kelly-sikkema-1_RZL8BGBM-unsplash_1757368986355.jpg",
        slug: "job-document-checklist-canada",
        published: true,
        publishedAt: new Date("2024-01-15"),
      },
      {
        id: "blog-2",
        title: "Why Cover Letters Still Matter in Today's Job Market",
        excerpt: "Searching for a new job is a time-consuming endeavor. By some estimates, the typical worker takes about six weeks to apply for, interview and finally land a new job offer.",
        content: `Searching for a new job is a time-consuming endeavor. By some estimates, the typical worker takes about six weeks to apply for, interview and finally land a new job offer. And across any industry and level of work, there's one step to the process that's bound to slow down even the most qualified and enthusiastic candidate: the cover letter.

But findings from one new report offer some motivation to draft a good elevator pitch, even in a time when cover letters are becoming increasingly optional.

According to a survey of 200 hiring managers from ResumeLab, a resume advice site, 83% of HR professionals agreed with the statement "a great cover letter can make me decide to interview a candidate, even if I don't think their resume is good enough."

That means, out of every 10 resumes where the applicant might not have the right work history, set of skills or management experience, eight job seekers are likely to advance, as long as they can make up for it in their cover letters.

A majority of hiring managers said cover letters were crucial to their hiring decisions, and 77% give preference to candidates who submit one, even if they're deemed optional on the application form. A similar share always expect the document, even if they're not required in order to apply.

**Cover letters only matter if job seekers do this:**

While cover letters can give candidates a leg up on the competition, they come with a major caveat.

Companies are increasingly relying on applicant tracking systems, often shortened to ATS, and artificial intelligence software to review resumes. These algorithms scan resumes for specific words and phrases around work history, responsibilities, skills and accomplishments to identify candidates who match well with the job description.

Ian Siegel, CEO of jobs marketplace ZipRecruiter, estimates more than 70% of resumes are now reviewed by robots before they reach a human reader.

That means resumes, and how they're written, matter first and foremost.

To be sure, the ResumeLab survey was designed to measure the impact of a cover letter only after a resume passed an ATS scan and made it to a human reviewer, explains Maciej Duszynski, career expert and researcher behind the study.

Siegel offers three recommendations for a resume to make it past the bots:

**Use standard file types** — no more trying to stand out by putting your resume into Photoshop," he tells CNBC Make It. Instead, "Use Microsoft Word or Google Docs to give something the parser can parse.

**Check your grammar and spelling.** It seems obvious, yet a surprising number of job seekers don't do it.

**Clearly list your skills** and make it easy for the parser to understand your years of experience," Siegel says.

If possible, Siegel says to demonstrate mastery of each skill by listing your years of experience learning or using each one in your work history.

*Source: CNBC*`,
        imageUrl: "@assets/glenn-carstens-peters-npxXWgQ33ZQ-unsplash_1757369012389.jpg",
        slug: "why-cover-letters-still-matter",
        published: true,
        publishedAt: new Date("2024-01-10"),
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
    
    // Seed admin user with strong password
    this.seedAdminUsers();
  }

  private async seedAdminUsers() {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('PrimeAdmin2024!@#', 12);
    
    const adminUser: AdminUser = {
      id: 'admin-1',
      username: 'primeadmin',
      password: hashedPassword,
      createdAt: new Date(),
      lastLoginAt: null,
    };
    
    this.adminUsers.set('admin-1', adminUser);
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

  // Admin User methods
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.username === username);
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(insertAdminUser.password, 12);
    const id = randomUUID();
    
    const adminUser: AdminUser = { 
      ...insertAdminUser,
      id,
      password: hashedPassword,
      createdAt: new Date(),
      lastLoginAt: null,
    };
    
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }

  async updateAdminUserLastLogin(id: string): Promise<AdminUser | undefined> {
    const adminUser = this.adminUsers.get(id);
    if (!adminUser) return undefined;
    
    const updatedAdminUser = { ...adminUser, lastLoginAt: new Date() };
    this.adminUsers.set(id, updatedAdminUser);
    return updatedAdminUser;
  }

  // Job methods
  async getJobs(filters?: { type?: string; category?: string; location?: string; query?: string; status?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());
    
    // Default to showing only approved jobs for public users
    if (!filters?.status) {
      jobs = jobs.filter(job => job.status === 'approved');
    }
    
    if (filters) {
      if (filters.status) {
        jobs = jobs.filter(job => job.status === filters.status);
      }
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
      .filter(job => job.featured && job.status === 'approved')
      .sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));
  }

  async getPendingJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.status === 'pending')
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
      contactEmail: insertJob.contactEmail || null,
      contactPhone: insertJob.contactPhone || null,
      featured: false,
      status: 'pending', // All new jobs start as pending
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

  async updateJobStatus(id: string, status: string): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, status };
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
