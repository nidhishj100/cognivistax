"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react" // Keep curly braces: NextAuth named exports
import SiteHeader from "@/components/site-header" // Assuming default export
import GlowButton from "@/components/glow-button" // Assuming default export

type Form = {
  name: string
  email: string
  phone: string
  password: string
}

// Helper component for form fields (must be in the same file)
function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false // FIX 1: Added required to prop definition
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  required?: boolean // FIX 2: Added required to type definition
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-primary">
        {label} {required && <span className="text-red-500">*</span>} {/* Shows the * if required */}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary focus:shadow-[0_0_12px_theme(colors.primary/60%)]"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function LoginSignupPage() {
  const [tab, setTab] = useState<"login" | "signup">("login") 
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", password: "" })
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // NOTE: Validation logic is simplified for demo
  const validate = (f: Form) => {
    const e: Partial<Form> = {}
    if (tab === "signup" && !f.name.trim()) e.name = "Name is required"
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Valid email required"
    if (tab === "signup" && !/^[0-9]{7,15}$/.test(f.phone)) e.phone = "Valid phone (7-15 digits)"
    if (f.password.length < 6) e.password = "Min 6 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (k: keyof Form, v: string) => {
    const next = { ...form, [k]: v }
    setForm(next)
    validate(next)
  }

  const handleManualSubmit = async () => {
    if (!validate(form)) return
    setLoading(true)
    try {
      if (tab === "signup") {
        // Calls your SendGrid API Route (/api/email)
        await fetch("/api/email", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              senderName: form.name,
              senderEmail: form.email, 
              subject: 'NEW USER SIGNUP (Notify Admin)',
              message: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`,
              type: 'SIGNUP'
          }),
        })
        alert("Signup complete! Admin notified. Use GitHub button to log in.")
      }
      // Redirect to dashboard (for manual login simulation/next step)
      router.push("/dashboard")
    } catch (error) {
      alert("A network error occurred during submission.")
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubSignIn = () => {
    // This function starts the OAuth flow with the GitHub provider
    signIn("github", { callbackUrl: '/dashboard' })
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-md px-4 md:px-6 pt-16">
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
          
          <h1 className="text-xl font-bold mb-4 text-center">
            {tab === "signup" ? "Create Your Account" : "Sign In to Continue"}
          </h1>
          
          {/* Tab Switcher */}
          <div className="mb-6 flex gap-2">
            <GlowButton variant={tab === "login" ? "primary" : "ghost"} onClick={() => setTab("login")}>
              Login
            </GlowButton>
            <GlowButton variant={tab === "signup" ? "primary" : "ghost"} onClick={() => setTab("signup")}>
              Signup
            </GlowButton>
          </div>

          {/* GitHub Sign-In Button (Primary Method) */}
          <GlowButton onClick={handleGitHubSignIn} className="w-full mb-6 !bg-[#24292e] shadow-[0_0_12px_theme(colors.gray.700)] hover:shadow-[0_0_18px_theme(colors.gray.500)]">
              Sign in with GitHub
          </GlowButton>

          {/* Separator */}
          <div className="flex items-center space-x-2 my-4">
             <div className="flex-grow border-t border-border/50" />
             <span className="text-xs text-muted-foreground uppercase">OR USE EMAIL</span>
             <div className="flex-grow border-t border-border/50" />
          </div>


          {/* Credentials Form (Signup/Email Notification) */}
          <div className="space-y-4">
            {tab === "signup" && (
                <Field label="Name" value={form.name} onChange={(v) => handleChange("name", v)} error={errors.name} required/>
            )}
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
              required
            />
            {tab === "signup" && (
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => handleChange("phone", v)} error={errors.phone} required/>
            )}
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={(v) => handleChange("password", v)}
              error={errors.password}
              required
            />
            
            <GlowButton onClick={handleManualSubmit} disabled={loading} className="w-full mt-4" aria-busy={loading}>
              {loading ? "Submitting..." : tab === "signup" ? "Create Account" : "Login"}
            </GlowButton>
            
            <p className="text-xs text-muted-foreground pt-2 text-center">
              *On signup, your details are emailed to the admin for manual verification.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}