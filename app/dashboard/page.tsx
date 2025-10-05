import SiteHeader from "@/components/site-header"

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-16">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-primary">Welcome to the Dashboard!</h1>
        <p className="text-lg mt-2">Your AI Learning Path Generator will live here.</p>
      </div>
    </main>
  )
}