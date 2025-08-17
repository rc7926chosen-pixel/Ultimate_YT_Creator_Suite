# replit.md

## Overview

Creator Business OS is a comprehensive web application designed to transform YouTube content creators from individual video editors into strategic business operators. The platform serves as an all-in-one dashboard that combines video editing capabilities with advanced AI-powered features for content management, brand partnerships, IP protection, and creator wellness monitoring. Built as a full-stack web application, it aims to eliminate tab-switching and provide creators with a unified workspace for managing their entire content creation business.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React 18 with TypeScript, leveraging modern React patterns including hooks and functional components. The UI is constructed with shadcn/ui component library built on top of Radix UI primitives, providing accessible and customizable components. Styling is handled through Tailwind CSS with a dark theme design system featuring glassmorphism effects and custom color variables for different feature areas (wellness, oracle, brand, IP management).

The application uses Wouter for lightweight client-side routing and TanStack React Query for server state management, API caching, and synchronization. The build system is powered by Vite, which provides fast development server and optimized production builds.

### Backend Architecture
The server is built with Express.js running on Node.js, following a REST API pattern. The application uses TypeScript throughout for type safety. The server implements middleware for request logging, error handling, and CORS management. API routes are organized in a modular structure with dedicated handlers for different feature areas.

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database interactions. The database connection is handled through Neon's serverless PostgreSQL service (@neondatabase/serverless). The schema is defined using Drizzle's schema definition with proper relationships between entities like users, creators, content, brand deals, IP violations, wellness metrics, and analytics.

Database migrations are managed through Drizzle Kit, with the schema located in a shared directory for use across both client and server code.

### Authentication and Authorization
The application implements a role-based system with user management through a dedicated users table. While the full authentication implementation isn't visible in the current codebase, the structure supports different user roles (creator, brand manager, editor) with the foundation for granular permissions.

### Key Feature Areas
The application is organized around several core modules:

**Living Archive**: AI-enhanced content management system that analyzes and organizes creator's video library, providing insights and optimization suggestions.

**Oracle Predictions**: AI-powered strategic forecasting system that analyzes trends and provides data-driven recommendations for content creation and business decisions.

**Brand Connect**: Automated partnership management portal that handles brand collaborations, deal negotiations, and compliance tracking.

**IP Management**: Content fingerprinting and rights protection system that monitors for unauthorized use of creator content across platforms.

**Wellness Hub**: Creator burnout prevention system that monitors creative energy, productivity patterns, and recommends optimal work schedules.

**Analytics Dashboard**: Comprehensive performance tracking across multiple platforms with advanced metrics and conversion funnel analysis.

## External Dependencies

### Database and Infrastructure
- **Neon PostgreSQL**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **WebSocket Support**: Real-time features through ws library

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Class Variance Authority**: Utility for managing component variants

### State Management and Networking
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Wouter**: Lightweight client-side routing

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment integration with runtime error overlays and cartographer plugin

### Planned Integrations
Based on the project requirements, the application is designed to integrate with:
- YouTube API for content upload and analytics
- Stock media libraries (Epidemic Sound, Artlist, Storyblocks)
- AI transcription and content analysis services
- Social media platform APIs
- Brand partnership platforms
- Content fingerprinting services for IP protection