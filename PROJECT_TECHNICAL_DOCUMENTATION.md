# AI Resume Analyzer & Job Matcher

## Overview

AI Resume Analyzer & Job Matcher is a full-stack AI-powered application that analyzes resumes against job descriptions using Retrieval-Augmented Generation (RAG), Local Large Language Models (LLMs), and semantic search.

The application helps candidates understand:

* ATS Compatibility Score
* Job Match Score
* Resume Strengths
* Resume Weaknesses
* Missing Skills
* ATS Improvements
* Personalized Suggestions
* AI-Generated Interview Questions
* Resume Chat Assistant

The entire AI pipeline runs locally using Ollama, ensuring privacy, zero API costs, and offline functionality.

---

# Project Goals

Traditional resume screening is time-consuming and often inconsistent.

This project automates resume evaluation by:

* Parsing resumes automatically
* Comparing resumes with job descriptions
* Identifying skill gaps
* Generating interview questions
* Providing ATS optimization recommendations
* Allowing conversational interaction with uploaded resumes

---

# Technology Stack

## Frontend

### Next.js

Purpose:

* Full-stack React framework
* API routes
* Routing
* Server-side capabilities

Why Used:

* Simplifies frontend and backend development
* Production-ready architecture
* Excellent TypeScript support

---

### React

Purpose:

* Component-based UI development

Why Used:

* Reusable UI components
* Efficient rendering
* Industry standard

---

### TypeScript

Purpose:

* Static typing

Why Used:

* Better code maintainability
* Fewer runtime errors
* Improved developer experience

---

### Tailwind CSS

Purpose:

* Styling and responsive UI

Why Used:

* Rapid UI development
* Utility-first approach
* No custom CSS complexity

---

# Backend

## Next.js API Routes

Implemented APIs:

```text
/api/upload
/api/analyze
/api/chat
```

Purpose:

* Resume Upload
* Resume Analysis
* Resume Chat

Why Used:

* No separate Express server required
* Easy deployment
* Simplified architecture

---

# Database

## PostgreSQL

Purpose:

* Store analysis results

Stores:

* Resume Text
* Job Description
* ATS Score
* Match Score
* Strengths
* Weaknesses
* Suggestions
* Questions

Why Used:

* Relational database
* Reliable
* Widely used in industry

---

## Prisma ORM

Purpose:

* Database communication

Example:

```typescript
await prisma.analysis.create({
  data: {
    ...
  }
});
```

Why Used:

* Type-safe queries
* Easy migrations
* Faster development

---

# Artificial Intelligence Stack

## Ollama

Purpose:

* Local LLM execution

Installed Models:

```text
llama3
nomic-embed-text
phi3
qwen2.5-coder
```

Why Used:

* Runs completely locally
* No API costs
* Better privacy
* Offline support

---

## Llama 3

Purpose:

* Resume Analysis
* ATS Analysis
* Interview Question Generation
* Resume Chatbot

Why Used:

* Strong reasoning capabilities
* Good structured output generation
* Open-source

---

## Nomic Embed Text

Purpose:

* Generate embeddings

Implementation:

```typescript
import ollama from "ollama";

export async function embed(text: string) {
  const response = await ollama.embed({
    model: "nomic-embed-text",
    input: text,
  });

  return response.embeddings[0];
}
```

Why Used:

* Lightweight
* Fast
* Excellent semantic search performance

---

# What Are Embeddings?

Embeddings convert text into numerical vectors.

Example:

```text
Resume:
"I know React and Next.js"

↓

[0.123, 0.562, 0.331, ...]
```

These vectors allow semantic comparison between texts.

---

# Retrieval Augmented Generation (RAG)

## What Is RAG?

RAG stands for:

```text
Retrieval
Augmented
Generation
```

Instead of sending the entire resume to the LLM every time:

1. Resume is chunked
2. Chunks are embedded
3. Relevant chunks are retrieved
4. Only relevant context is sent to Llama 3

Benefits:

* Better accuracy
* Faster responses
* Lower token usage
* More relevant answers

---

# Resume Processing Flow

## Step 1: Upload Resume

User uploads PDF.

---

## Step 2: PDF Parsing

Library:

```text
pdf2json
```

Purpose:

Convert PDF into raw text.

---

## Step 3: Resume Text Extraction

Example:

```text
Skills:
React
Node.js
TypeScript

Projects:
AI Resume Analyzer
GitHub RAG Chatbot
```

---

## Step 4: Chunking

Resume is split into smaller chunks.

Example:

```text
Chunk 1:
Skills Section

Chunk 2:
Projects Section

Chunk 3:
Experience Section
```

Why?

Large documents cannot efficiently be searched as a single block.

---

## Step 5: Embedding Generation

Each chunk becomes a vector.

Example:

```typescript
const embedding =
await embed(chunk);
```

---

## Step 6: Store in Memory

```typescript
export const chunksStore = [];
```

Structure:

```typescript
{
  text: string;
  embedding: number[];
}
```

---

# Semantic Search

## Cosine Similarity

Used to compare vectors.

Implementation:

```typescript
export function cosineSimilarity(
  a: number[],
  b: number[]
)
```

Formula:

```text
A · B
-------------
|A| × |B|
```

Purpose:

Find the most relevant resume chunks.

---

# Resume Analysis Workflow

## Inputs

* Resume
* Job Description

---

## Retrieval Phase

Job description is embedded.

Most relevant resume chunks are retrieved.

---

## Context Construction

```typescript
const context =
chunks.map(c => c.text)
.join("\n");
```

---

## AI Analysis

Context + Job Description

↓

Llama 3

↓

Structured JSON

---

# ATS Analysis

ATS Score evaluates:

* Keyword Match
* Skill Alignment
* Technology Relevance
* Resume Structure

Output:

```json
{
  "atsScore": 87
}
```

---

# Job Match Analysis

Match Score evaluates:

* Technical Skills
* Projects
* Experience
* Technologies

Output:

```json
{
  "matchScore": 82
}
```

---

# Interview Question Generation

Generated using:

* Resume
* Job Description

Categories:

* Technical
* Behavioral
* Project-Based
* Problem Solving

Example:

```text
Explain how you implemented JWT authentication.

Why did you choose Prisma ORM?

Describe challenges faced while building your RAG system.
```

---

# Resume Chat Assistant

Allows users to ask questions such as:

```text
What are my strongest skills?

Explain my projects.

What interview questions can recruiters ask me?

What technologies should I improve?
```

Workflow:

```text
User Question
      ↓
Embedding
      ↓
Similarity Search
      ↓
Relevant Chunks
      ↓
Llama 3
      ↓
Answer
```

---

# Database Schema

Analysis Table

Stores:

```text
resumeText
jobDescription
atsScore
matchScore
strengths
weaknesses
missingSkills
suggestions
questions
```

Purpose:

Persist analysis history.

---

# Project Folder Structure

```text
src
│
├── app
│   ├── api
│   │   ├── upload
│   │   ├── analyze
│   │   └── chat
│
├── components
│   ├── ResumeForm
│   ├── ResumeChat
│   ├── AnalysisCard
│   ├── ScoreCard
│   ├── InterviewQuestions
│
├── lib
│   ├── ollama.ts
│   ├── search.ts
│   ├── embeddings.ts
│   ├── pdf.ts
│   ├── prisma.ts
│   └── json.ts
│
└── prisma
    └── schema.prisma
```

---

# Key Concepts Demonstrated

This project demonstrates:

### Artificial Intelligence

* Local LLMs
* Prompt Engineering
* Structured AI Outputs

### Machine Learning

* Embeddings
* Semantic Search
* Vector Similarity

### RAG

* Chunking
* Retrieval
* Context Augmentation

### Full Stack Development

* Next.js
* React
* TypeScript

### Database Engineering

* PostgreSQL
* Prisma ORM

### AI Product Engineering

* Local AI Systems
* Resume Intelligence
* AI Assistants

---

# Future Enhancements

* Authentication
* Multiple Resume Management
* Resume Version History
* Resume Ranking
* Cover Letter Generation
* Resume Rewriting
* Vector Database Integration (Qdrant/Pinecone)
* Export PDF Reports
* AI Career Roadmaps
* Multi-Model Support

---

# Conclusion

AI Resume Analyzer demonstrates a complete end-to-end AI application using modern AI engineering practices.

The project combines:

* Next.js
* TypeScript
* PostgreSQL
* Prisma ORM
* Ollama
* Llama 3
* Nomic Embeddings
* RAG Architecture

to build a fully local AI-powered resume intelligence platform capable of semantic resume analysis, ATS scoring, job matching, interview preparation, and conversational resume interaction.
