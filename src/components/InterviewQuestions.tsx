interface Question {
  type: string;
  question: string;
}

export default function InterviewQuestions({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Interview Questions
      </h2>

      <div className="space-y-4">

        {questions.map((q, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              {q.type}
            </span>

            <p className="mt-4 text-lg font-medium text-slate-900">
              {q.question}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}