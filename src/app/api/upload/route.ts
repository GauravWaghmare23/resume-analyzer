import { parsePdf } from "@/src/lib/pdf";
import { processResume } from "@/src/lib/search";
import { NextRequest } from "next/server";


export async function POST(
  req: NextRequest
) {
  const formData =
    await req.formData();

  const file = formData.get(
    "resume"
  ) as File;

  if (!file) {
    return Response.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const resumeText =
    await parsePdf(buffer);

  await processResume(resumeText);

  return Response.json({
    success: true,
    resumeText,
  });
}