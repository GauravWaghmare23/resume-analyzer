import ollama from "ollama";



export async function analyze(
  resumeContext: string,
  jobDescription: string
) {
  const prompt = `
You are an expert ATS (Applicant Tracking System), Senior Technical Recruiter, and Hiring Manager.

Your task is to evaluate how well a candidate's resume matches the provided job description.

Analyze carefully and objectively.

====================
RESUME
====================

${resumeContext}

====================
JOB DESCRIPTION
====================

${jobDescription}

====================
SCORING RULES
====================

ATS Score (0-100):
- Evaluate resume quality, formatting, keyword optimization, clarity, technical depth, and relevance.

Match Score (0-100):
- Evaluate how closely the candidate's skills, projects, experience, and technologies align with the job description.

====================
ANALYSIS REQUIREMENTS
====================

Identify:

1. Candidate strengths
2. Candidate weaknesses
3. Missing skills required by the job
4. Resume improvement suggestions
5. ATS optimization suggestions
6. Technical interview questions tailored to the candidate and job

Interview Questions Rules:
- Exactly 10 questions
- Questions must be specific to the resume
- Mix:
  - 4 technical questions
  - 2 project-based questions
  - 2 problem-solving questions
  - 2 behavioral questions

====================
OUTPUT FORMAT
====================

Return ONLY valid JSON.

{
  "atsScore": 0,
  "matchScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "atsImprovements": [],
  "questions": []
}

====================
STRICT RULES
====================

- Output ONLY JSON
- No markdown
- No explanations
- No code blocks
- No text before JSON
- No text after JSON
- atsScore must be integer 0-100
- matchScore must be integer 0-100
- summary must be 2-3 sentences
- strengths minimum 5 items
- weaknesses minimum 5 items
- missingSkills minimum 5 items
- suggestions minimum 5 items
- atsImprovements minimum 5 items
- questions exactly 10 items
`;

  const response = await ollama.chat({
    model: "llama3",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    options: {
      temperature: 0.2,
    },
  });

  return response.message.content;
}