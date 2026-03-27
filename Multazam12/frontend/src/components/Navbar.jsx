import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar(){
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(()=>{
    check()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return ()=> listener?.subscription?.unsubscribe()
  }, [])

  async function check(){
    const { data } = await supabase.auth.getUser()
    setUser(data?.user ?? null)
  }

  async function handleLogout(){
    await supabase.auth.signOut()
    setUser(null)
    navigate('/auth')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Multazam12</Link>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to={`/profile/${user.id}`}>Profile</Link>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
