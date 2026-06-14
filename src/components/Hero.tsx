export default function Hero() {
  return (
    <section className="text-center py-12">

      <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
        Local AI • Ollama • RAG
      </span>

      <h1 className="text-6xl font-extrabold mt-6 text-slate-900">
        AI Resume Analyzer
      </h1>

      <p className="text-xl text-slate-600 mt-6 max-w-4xl mx-auto">
        Analyze resumes, calculate ATS compatibility,
        match candidates against job descriptions,
        generate interview questions and chat with your resume.
      </p>

    </section>
  );
}