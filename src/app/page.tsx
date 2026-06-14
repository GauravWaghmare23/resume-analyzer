import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ResumeForm from "../components/ReusmeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <Hero />

        <ResumeForm />

      </div>

    </main>
  );
}