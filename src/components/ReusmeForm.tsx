"use client";

import { useState } from "react";

import ScoreCard from "./ScoreCard";
import AnalysisCard from "./AnalysisCard";
import InterviewQuestions from "./InterviewQuestions";
import ResumeChat from "./ResumeChat";

type Question = {
  type: string;
  question: string;
};

type AnalysisResult = {
  atsScore: number;
  matchScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
  atsImprovements: string[];
  questions: Question[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ResumeForm() {
  const [file, setFile] = useState<File | null>(null);

  const [resumeText, setResumeText] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [chatLoading, setChatLoading] = useState(false);

  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function uploadResume() {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResumeText(data.resumeText);

      alert("Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function analyzeResume() {


    if (!resumeText) {
      alert("Upload resume first");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Paste job description");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await res.json();

      console.log("FULL DATA:", data);
      console.log("QUESTIONS:", data.questions);
      console.log("FIRST QUESTION:", data.questions?.[0]);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function askQuestion() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");

    try {
      setChatLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Chat failed");
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="space-y-12">

      {/* Upload Section */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-xl shadow-blue-100/30">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Upload Resume
            </h2>

            <p className="text-slate-500 mt-2">
              Upload your PDF resume for AI analysis.
            </p>
          </div>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
            className="w-full border border-slate-300 rounded-2xl p-4 bg-slate-50"
          />

          <button
            onClick={uploadResume}
            className="mt-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
          >
            {uploading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

        </div>

        <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-xl shadow-blue-100/30">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Job Description
            </h2>

            <p className="text-slate-500 mt-2">
              Paste the target job description.
            </p>
          </div>

          <textarea
            className="w-full h-72 border border-slate-300 rounded-2xl p-5 bg-slate-50 resize-none"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* Analyze Button */}

      <div className="flex justify-center">

        <button
          onClick={analyzeResume}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl"
        >
          {loading
            ? "Analyzing Resume..."
            : "Analyze Resume"}
        </button>

      </div>

      {/* Results */}

      {result && (
        <div className="space-y-10">

          {/* Scores */}

          <div className="grid md:grid-cols-2 gap-8">

            <ScoreCard
              title="ATS Score"
              value={result.atsScore}
              color="text-blue-600"
            />

            <ScoreCard
              title="Job Match"
              value={result.matchScore}
              color="text-emerald-600"
            />

          </div>

          {/* Summary */}

          <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-5">
              AI Summary
            </h2>

            <p className="text-slate-600 leading-8 text-lg">
              {result.summary}
            </p>

          </div>

          {/* Analysis */}

          <div className="grid lg:grid-cols-2 gap-8">

            <AnalysisCard
              title="Strengths"
              items={result.strengths}
            />

            <AnalysisCard
              title="Weaknesses"
              items={result.weaknesses}
            />

            <AnalysisCard
              title="Missing Skills"
              items={result.missingSkills}
            />

            <AnalysisCard
              title="ATS Improvements"
              items={result.atsImprovements}
            />

          </div>

          <AnalysisCard
            title="Recommendations"
            items={result.suggestions}
          />

          <InterviewQuestions
            questions={result.questions}
          />

          <ResumeChat
            messages={messages}
            question={question}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
            chatLoading={chatLoading}
          />

        </div>
      )}

    </div>
  );
}