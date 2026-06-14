"use client";

import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface Props {
  messages: Message[];
  question: string;
  setQuestion: (value: string) => void;
  askQuestion: () => void;
  chatLoading: boolean;
}

export default function ResumeChat({
  messages,
  question,
  setQuestion,
  askQuestion,
  chatLoading,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-4xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="border-b border-slate-200 px-8 py-6 bg-linear-to-r from-blue-600 to-indigo-600">

        <h2 className="text-2xl font-bold text-white">
          Resume Assistant
        </h2>

        <p className="text-blue-100 mt-1">
          Ask questions about projects, skills, experience,
          technologies and interview preparation.
        </p>

      </div>

      {/* Chat Area */}

      <div className="h-162.5 overflow-y-auto bg-slate-50 p-8 space-y-6">

        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">

            <div className="text-center">

              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-4xl">
                🤖
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                Resume AI Assistant
              </h3>

              <p className="text-slate-500 mt-2 max-w-md">
                Ask anything about the uploaded resume,
                projects, skills, technologies, interview
                questions or career guidance.
              </p>

            </div>

          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm ${
                message.role === "user"
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-800"
              }`}
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mb-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold mb-2">
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-6 space-y-1">
                      {children}
                    </ol>
                  ),
                  p: ({ children }) => (
                    <p className="leading-7">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold">
                      {children}
                    </strong>
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

            <div className="bg-white border border-slate-200 rounded-3xl px-5 py-4 shadow-sm">

              <div className="flex gap-2">

                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />

                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />

                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Input Area */}

      <div className="border-t border-slate-200 bg-white p-6">

        <div className="flex gap-3">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
            placeholder="Ask about projects, DSA, backend architecture, skills, achievements..."
            className="flex-1 h-14 px-5 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
          />

          <button
            onClick={askQuestion}
            className="px-8 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}