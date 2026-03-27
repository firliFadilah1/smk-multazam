import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Auth(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    if(isLogin){
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if(error) return toast.error(error.message)
      toast.success('Login sukses')
      navigate('/')
    }else{
      const { error } = await supabase.auth.signUp({ email, password })
      if(error) return toast.error(error.message)
      toast.success('Register berhasil. Cek email untuk verifikasi jika perlu')
      setIsLogin(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{isLogin? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white px-3 py-2 rounded">{isLogin? 'Login' : 'Register'}</button>
        </form>
        <div className="mt-3 text-sm text-center">
          <button onClick={()=>setIsLogin(s=>!s)} className="text-blue-600">{isLogin? 'Buat akun' : 'Sudah punya akun? Login'}</button>
        </div>
      </div>
    </div>
  )
}
