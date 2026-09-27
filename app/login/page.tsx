"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("analyst@voxentra.local")
  const [password, setPassword] = useState("Voxentra@2025")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      localStorage.setItem("voxentra_token", data.token)
      localStorage.setItem("voxentra_user", JSON.stringify(data.user))
      document.cookie = `voxentra_token=${data.token}; path=/; max-age=604800`
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
      <Card className="w-full max-w-md relative z-10 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4"><Eye className="w-6 h-6 text-black" /></div>
          <CardTitle className="text-xl">Voxentra Console</CardTitle>
          <CardDescription>NTRO • SIH26152 • Analyst Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:border-white" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:border-white" />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-950/30 border border-red-900 p-2 rounded">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">{loading ? "Authenticating..." : "Enter Console"}</Button>
            <div className="text-[11px] text-zinc-500 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              <p className="font-medium text-zinc-300 flex items-center gap-1"><Shield className="w-3 h-3" /> Demo Credentials</p>
              <p className="mt-1">analyst@voxentra.local / Voxentra@2025</p>
              <p>admin@voxentra.ntro / Voxentra@2025</p>
              <p className="mt-2 text-zinc-600">DB is seeded automatically. If login fails, check /api/auth/register or run prisma seed.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
