# Replit.md

## Overview

This is a full-stack job board application built for Prime Trans Group, Canada's workforce solutions provider. The application serves as a platform for connecting job seekers with employers, featuring job listings, applications, blog content, and testimonials. It's designed to handle various job types including transportation, manufacturing, warehouse, and administrative positions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured endpoint organization
- **Storage Interface**: Abstract storage layer (IStorage) with in-memory implementation
- **Development Server**: Integrated Vite development server for SSR support
- **Middleware**: Custom logging, JSON parsing, and error handling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (Neon Database)
- **Schema**: Strongly typed database schema with Zod validation
- **Migrations**: Drizzle Kit for schema migrations
- **Models**: Users, Jobs, Job Applications, Blog Posts, and Testimonials

### Key Features
- **Job Management**: Create, read, update, delete operations for job listings
- **Search & Filtering**: Advanced job search with filters for type, category, location, and keywords
- **Application System**: Job application submission and status tracking
- **Content Management**: Blog posts with publishing capabilities
- **Social Proof**: Client testimonials and company statistics
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Project Structure
- **Monorepo**: Shared schema and types between client and server
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory  
- **Shared**: Common types and schemas in `/shared` directory
- **Components**: Modular UI components with consistent design patterns

## External Dependencies

### Core Runtime
- **@neondatabase/serverless**: Neon Database PostgreSQL client
- **express**: Web application framework
- **drizzle-orm**: TypeScript ORM for database operations

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **@radix-ui/**: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Performant forms with easy validation
- **zod**: TypeScript-first schema validation

### Development Tools
- **vite**: Frontend build tool and development server
- **drizzle-kit**: Database migrations and introspection
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-**: Replit-specific development plugins

### UI Components
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional className utilities
- **date-fns**: Date manipulation library

### Database Configuration
- PostgreSQL database with connection via environment variable `DATABASE_URL`
- Schema migrations managed through Drizzle Kit
- Session storage using connect-pg-simple for PostgreSQL sessions