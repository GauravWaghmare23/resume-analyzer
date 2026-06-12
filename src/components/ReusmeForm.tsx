"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <div className="space-y-8">
      {/* Upload */}

      <div className="space-y-3">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button
          onClick={uploadResume}
          className="bg-black text-white px-5 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>

      {/* Job Description */}

      <textarea
        className="w-full border p-4 h-60 rounded"
        placeholder="Paste Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        onClick={analyzeResume}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Analyze Resume
      </button>

      {loading && <p className="text-lg">Analyzing...</p>}

      {/* Analysis */}

      {result && (
        <div className="space-y-8">
          {/* Scores */}

          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-xl">
                Match Score:
                {result.matchScore}/100
              </h2>

              <div className="w-full bg-gray-200 rounded h-4">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{
                    width: `${result.atsScore}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-xl">
                Match Score: {result.matchScore}/100
              </h2>

              <div className="w-full bg-gray-200 rounded h-4">
                <div
                  className="bg-blue-500 h-4 rounded"
                  style={{
                    width: `${result.matchScore}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Strengths */}

          <div>
            <h2 className="text-2xl font-bold mb-3">Strengths</h2>

            <ul className="list-disc ml-6">
              {result.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}

          <div>
            <h2 className="text-2xl font-bold mb-3">Weaknesses</h2>

            <ul className="list-disc ml-6">
              {result.weaknesses?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Missing Skills */}

          <div>
            <h2 className="text-2xl font-bold mb-3">Missing Skills</h2>

            <ul className="list-disc ml-6">
              {result.missingSkills?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}

          <div>
            <h2 className="text-2xl font-bold mb-3">Suggestions</h2>

            <ul className="list-disc ml-6">
              {result.suggestions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Interview Questions */}

          <div>
            <h2 className="text-2xl font-bold mb-3">Interview Questions</h2>

            <ul className="list-decimal ml-6">
              {result.questions?.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold">[{item.type}]</span>{" "}
                  {item.question}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Chatbot */}

          <div className="border rounded-3xl p-6 bg-zinc-950 border-zinc-800">
            <h2 className="text-3xl font-bold mb-6">Resume Assistant</h2>

            <div className="h-125 overflow-y-auto rounded-2xl border border-zinc-800 p-4 space-y-4 bg-zinc-900">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-800 text-white"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        ul: ({ children }) => (
                          <ul className="list-disc ml-5">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-5">{children}</ol>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 px-4 py-3 rounded-2xl">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
                placeholder="Ask anything about the resume..."
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none"
              />

              <button
                onClick={askQuestion}
                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
