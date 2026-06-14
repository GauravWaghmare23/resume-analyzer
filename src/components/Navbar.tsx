export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="font-bold text-xl text-slate-900">
          AI Resume Analyzer
        </h1>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <span>Resume Analysis</span>
          <span>Job Matching</span>
          <span>Interview Prep</span>
          <span>Resume Chat</span>
        </div>

      </div>

    </nav>
  );
}