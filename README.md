# OKPDF Chatbot

Welcome to the OKPDF Chatbot project! This web application allows users to upload PDF documents and interact with an AI chatbot that can answer questions related to the uploaded content.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **PDF Upload**: Seamlessly upload any PDF document
- **AI-Powered Chatbot**: Interact with an intelligent chatbot that analyzes uploaded PDFs
- **Persistent Chat History**: Review past conversations and insights
- **Secure File Storage**: Safe and scalable storage for uploaded documents
- **User Authentication**: Secure access to personal documents and chat history
- **Payment Integration**: Subscription-based access using Stripe
- **Responsive Design**: Beautiful and accessible UI across devices

## Tech Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Unstyled, accessible components for building high-quality design systems
- **Lucide React**: Beautifully crafted open source icons

### Backend & Database
- **Neon Database**: Serverless Postgres for modern web applications
- **Drizzle ORM**: Lightweight, type-safe ORM for TypeScript
- **AWS S3**: Scalable object storage for secure file management

### AI & Data Processing
- **Vercel AI SDK**: Tools for building AI-powered applications
- **Pinecone DB**: Vector database for efficient similarity search
- **OpenAI**: State-of-the-art language models for natural conversations
- **Pinecone OpenAI Get Context**: Integration for context-aware AI responses
- **Persist Chatlog**: Mechanism for maintaining conversation history

### State Management & Data Fetching
- **React Query**: Powerful data synchronization for React applications

### Payments
- **Stripe**: Secure and flexible payment processing platform

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- AWS account with S3 bucket
- Neon Database account
- OpenAI API key
- Pinecone account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   
   git clone https://github.com/yourusername/pdf-ai-chatbot.git
   cd pdf-ai-chatbot
   
2. Install dependencies:
  ```bash
   npm install
   #or
   yarn install
  ```
## Configuration

1.Create a `.env.local` file in the root of the project and add the following environment variables:

```env
DATABASE_URL=your_neon_database_url
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key
```
2. Configure Stripe webhooks for handling subscription events.
3. Set up your Pinecone index:

- Log in to your Pinecone account
- Create a new index with the desired dimensions (e.g., 1536 for OpenAI embeddings)
- Note down the index name and environment


4.Configure AWS S3:

- Create a new S3 bucket for storing PDF files
- Set up CORS configuration for your bucket to allow uploads from your application's domain


5.Set up the Neon Database:
- Create a new database in your Neon account
- Run the database migrations:
  ```bash
  npm run migrate
  or
  yarn migrat
  ```
### File Structure

```plaintext
okpdf-chatbot/
├── components/
│   ├── Chat.tsx
│   ├── FileUpload.tsx
│   ├── SubscriptionButton.tsx
│   └── ...
├── pages/
│   ├── api/
│   │   ├── chat.ts
│   │   ├── upload.ts
│   │   ├── history.ts
│   │   ├── subscribe.ts
│   │   └── webhook.ts
│   ├── _app.tsx
│   ├── index.tsx
│   └── ...
├── lib/
│   ├── db.ts
│   ├── openai.ts
│   ├── pinecone.ts
│   ├── s3.ts
│   └── stripe.ts
├── styles/
│   └── globals.css
├── public/
├── types/
├── utils/
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```
### Usage
1. Start the development server
   ```bash
   npm run dev
   or
   yarn dev
   ```

### Contributing
We welcome contributions! Please follow these steps:

1.Fork the repository
2.Create a new branch: git checkout -b feature/your-feature-name
3.Make your changes and commit them: git commit -m 'Add some feature'
4.Push to the branch: git push origin feature/your-feature-name
5.Submit a pull request
