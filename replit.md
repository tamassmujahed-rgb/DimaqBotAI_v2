# Digital Brain AI Telegram Bot

## Overview

Digital Brain AI is a Telegram bot application powered by OpenAI GPT-5 that provides intelligent AI assistance through various commands. The application consists of a React-based landing page showcasing the bot's capabilities and a Node.js backend that integrates with Telegram's Bot API and OpenAI's language models. Users can interact with the bot via Telegram to get answers to questions, generate video ideas, create scripts, and summarize text content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack React Query for server state management

**UI Framework:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- "New York" style variant for components
- Design philosophy follows tech-forward minimalism inspired by Linear and ChatGPT aesthetics

**Component Organization:**
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Shared components in client/src/components/ui/
- Pages in client/src/pages/
- Utility functions in client/src/lib/
- Custom hooks in client/src/hooks/

**Routing Strategy:**
- Single-page application with minimal routes
- Home page as primary landing page
- 404 not-found page for undefined routes
- No authentication or protected routes currently implemented

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the entire backend
- ESM module system for modern JavaScript features

**Telegram Bot Integration:**
- node-telegram-bot-api library for bot interactions
- Polling mode for receiving updates from Telegram
- Long message handling with automatic chunking (4000 character limit)
- Plain text responses to avoid Markdown parsing errors with AI-generated content

**OpenAI Integration:**
- OpenAI SDK for GPT-5 API calls
- Conversation context management (last 5 messages retained)
- Four main AI capabilities:
  - Question answering with conversational context
  - Video idea generation with structured formatting
  - Script writing for various content types
  - Text summarization with key points extraction

**Bot Commands:**
- /start - Initialize bot interaction
- /help - Display available commands
- /ask [question] - Ask questions with context retention
- /videoidea [topic] - Generate creative video concepts
- /script [topic] - Create professional scripts
- /summarize [text] - Condense long-form content

**Storage Layer:**
- Interface-based storage abstraction (IStorage)
- In-memory storage implementation (MemStorage) for development
- Designed for easy migration to persistent database
- Stores conversation history and bot usage statistics

**API Endpoints:**
- GET /api/health - Health check for monitoring
- GET /api/bot-info - Bot metadata for landing page consumption

**Request Handling:**
- Custom middleware for request logging with duration tracking
- JSON body parsing with raw body preservation for webhook verification
- URL-encoded form data support

### Data Storage Solutions

**Database Schema (Drizzle ORM):**
- PostgreSQL dialect configuration
- Schema defined in shared/schema.ts for cross-environment consistency
- Two primary tables:
  - `conversations`: Stores user conversation context, Telegram user info, and message timestamps
  - `bot_stats`: Tracks command usage and user activity metrics

**Table Structures:**

Conversations table:
- id (UUID primary key, auto-generated)
- telegramUserId (text, required)
- telegramUsername (text, optional)
- context (JSONB array for message history)
- lastMessageAt (timestamp)
- createdAt (timestamp)

Bot Stats table:
- id (UUID primary key, auto-generated)
- command (text, required)
- telegramUserId (text, required)
- executedAt (timestamp)

**Schema Validation:**
- Drizzle-Zod integration for runtime type validation
- TypeScript inference for compile-time type safety

**Database Configuration:**
- Environment variable-based connection (DATABASE_URL)
- Migration files in /migrations directory
- Database push command for schema synchronization

**Current Implementation:**
- In-memory Map-based storage for development/testing
- Production-ready schema prepared for PostgreSQL deployment
- Neon Database serverless driver configured for connection pooling

### External Dependencies

**Telegram Bot API:**
- Official Telegram Bot API via node-telegram-bot-api
- Polling-based message reception
- Requires TELEGRAM_BOT_TOKEN environment variable
- Graceful degradation when token is unavailable

**OpenAI API:**
- GPT-5 model (latest as of August 2025)
- Chat completions API for conversational AI
- Requires OPENAI_API_KEY environment variable
- Configurable max_completion_tokens (2048 default)
- Conversation context window management

**Database Service:**
- Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- Serverless connection pooling for scalability
- WebSocket-based connections supported

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- Comprehensive set of 30+ UI primitives (dialogs, dropdowns, tooltips, etc.)
- Lucide React for consistent iconography
- React Icons for brand icons (Telegram, OpenAI logos)

**State Management:**
- TanStack React Query v5 for server state
- Custom query client configuration with disabled auto-refetch
- Optimistic updates support

**Form Handling:**
- React Hook Form integration via @hookform/resolvers
- Zod schema validation for forms

**Development Tools:**
- Replit-specific plugins for development experience:
  - Runtime error modal overlay
  - Cartographer for code navigation
  - Dev banner for development environment indication
- TypeScript with strict mode enabled
- ESBuild for production bundling

**Build Process:**
- Separate client and server builds
- Client: Vite builds to dist/public
- Server: ESBuild bundles to dist/index.js with external packages
- Production mode uses NODE_ENV environment variable