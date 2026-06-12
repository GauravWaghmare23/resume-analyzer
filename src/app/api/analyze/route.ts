import { extractJson } from "@/src/lib/json";
import { analyze } from "@/src/lib/ollama";
import { prisma } from "@/src/lib/prisma";
import { searchResume } from "@/src/lib/search";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest
) {
  const body = await req.json();

  const {
    resumeText,
    jobDescription,
  } = body;

  const chunks =
    await searchResume(
      jobDescription
    );

  const context =
    chunks
      .map((c) => c.text)
      .join("\n");

  const response =
    await analyze(
      context,
      jobDescription
    );

  const result = extractJson(response);

  await prisma.analysis.create({
    data: {
      resumeText,
      jobDescription,

      atsScore:
        result.atsScore,

      matchScore:
        result.matchScore,

      strengths:
        result.strengths,

      weaknesses:
        result.weaknesses,

      missingSkills:
        result.missingSkills,

      suggestions:
        result.suggestions,

      questions:
        result.questions,
    },
  });

  return Response.json(
    result
  );
}