'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600/10 text-red-500 hover:bg-red-600/20 px-4 py-2 rounded font-medium transition-colors"
    >
      Logout
    </button>
  )
}