import { BackButton } from "@/components/back-button";

export default function MeditationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <main className="max-w-4xl mx-auto px-4 py-8 relative">
        <BackButton href="/get-started" />
        <h1>Meditation</h1>
      </main>
    </div>
  );
}
