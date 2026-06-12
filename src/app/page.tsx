import ResumeForm from "../components/ReusmeForm";



export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">
        AI Resume Analyzer
      </h1>

      <ResumeForm />
    </main>
  );
}