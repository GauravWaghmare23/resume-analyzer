# AI Resume Analyzer & Job Matcher

AI Resume Analyzer is an intelligent recruitment assistant built using Next.js, PostgreSQL, Prisma, and local AI models powered by Ollama. The application helps job seekers understand how well their resume aligns with a target job description by performing semantic resume analysis, ATS scoring, skill-gap detection, and personalized interview preparation.

Unlike traditional keyword-based resume scanners, this platform uses vector embeddings and retrieval-augmented generation (RAG) to understand the contextual meaning of both resumes and job descriptions. By leveraging the `nomic-embed-text` embedding model and `Llama 3`, the system can identify strengths, weaknesses, missing skills, ATS optimization opportunities, and generate interview questions tailored to the candidate's actual experience.

The platform also includes an AI Resume Assistant that allows users to chat with their uploaded resume. Through semantic retrieval and contextual reasoning, users can ask questions about projects, skills, experience, technologies, achievements, and interview preparation, transforming a static resume into an interactive knowledge source.

## Features

### Resume Analysis

* Resume upload and text extraction
* Resume content preprocessing and chunking
* Semantic embedding generation
* ATS compatibility evaluation
* Resume quality assessment

### Job Matching

* Job description analysis
* Semantic similarity matching
* Match score generation
* Missing skill identification
* Skill gap analysis

### AI Recommendations

* Resume improvement suggestions
* ATS optimization recommendations
* Strength and weakness analysis
* Career development insights

### Interview Preparation

* Personalized technical interview questions
* Project-based interview questions
* Behavioral interview questions
* Skill-specific assessment questions

### Resume Chatbot

* Chat with uploaded resume
* Resume-based question answering
* Retrieval-Augmented Generation (RAG)
* Semantic search using embeddings
* Context-aware responses

## AI Workflow

Resume Upload
↓
Resume Parsing
↓
Text Chunking
↓
Embedding Generation (nomic-embed-text)
↓
Vector Storage
↓
Job Description Embedding
↓
Cosine Similarity Search
↓
Relevant Resume Retrieval
↓
Llama 3 Analysis
↓
ATS Score + Match Score + Suggestions

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL

### Artificial Intelligence

* Ollama
* Llama 3
* Nomic Embed Text
* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Cosine Similarity

### Database

* PostgreSQL
* Prisma

## Learning Outcomes

This project demonstrates practical implementation of:

* Large Language Models (LLMs)
* Retrieval-Augmented Generation (RAG)
* Vector Embeddings
* Semantic Search
* Resume Intelligence Systems
* AI-Powered Recruitment Tools
* Full Stack Development with Next.js
* Local AI Deployment using Ollama

The entire AI pipeline runs locally, providing privacy, reduced operational costs, and full control over the model ecosystem.
