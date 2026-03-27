import React, { useState } from 'react'
import axios from 'axios'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'

export default function UploadForm({ onUploaded }){
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  function validateFile(f){
    const validTypes = ['image/jpeg','image/png']
    const maxSize = 5 * 1024 * 1024
    if(!validTypes.includes(f.type)) return 'Tipe file harus JPG/PNG'
    if(f.size > maxSize) return 'Ukuran maksimal 5MB'
    return null
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!file) return toast.error('Pilih gambar dulu')
    const err = validateFile(file)
    if(err) return toast.error(err)

    setLoading(true)
    try{
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, form)
      const imageUrl = res.data.secure_url

      // save to supabase
      const user = await supabase.auth.getUser()
      const userId = user?.data?.user?.id || null
      const { data, error } = await supabase.from('posts').insert([{ user_id: userId, image_url: imageUrl, caption }])
      if(error) throw error

      toast.success('Upload berhasil')
      setFile(null)
      setCaption('')
      onUploaded && onUploaded()
    }catch(err){
      console.error(err)
      toast.error('Gagal upload')
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <div className="flex gap-4 items-center">
        <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
        <input type="text" placeholder="Caption" value={caption} onChange={(e)=>setCaption(e.target.value)} className="flex-1 border px-2 py-1 rounded" />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </form>
  )
}
