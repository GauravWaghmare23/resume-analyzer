import { searchResume } from "@/src/lib/search";
import { NextRequest } from "next/server";
import ollama from "ollama";
import ReactMarkdown from "react-markdown";

export async function POST(
  req: NextRequest
) {
  const body = await req.json();

  const { question } = body;

  const chunks =
    await searchResume(question);

  const context =
    chunks
      .map((c) => c.text)
      .join("\n");

  const prompt = `
You are an expert technical interviewer.

You MUST answer using ONLY the resume context provided.

Resume Context:
${context}

User Question:
${question}

Rules:

1. Use information from the resume.
2. Never ask for more information.
3. Never generate generic templates.
4. Never write things like:
   - Project Name
   - Role
   - Duration
   - Team Size
5. Generate specific answers based on the actual resume.
6. Use markdown formatting.
7. Use headings and bullet points.
8. If asked for interview questions, generate realistic recruiter questions based on technologies, projects, skills and achievements found in the resume.
9. Keep answers structured and professional.

Examples:

Bad:
1. Project Name?
2. Team Size?

Good:
1. Explain how you implemented JWT authentication in your LMS project.
2. Why did you choose Prisma ORM instead of writing raw SQL?
3. Explain the architecture of your GitHub RAG chatbot.

Return a well formatted markdown response.
`;

  const response =
    await ollama.chat({
      model: "llama3",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return Response.json({
    answer:
      response.message.content,
  });
}