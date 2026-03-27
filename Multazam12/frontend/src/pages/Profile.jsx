import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useParams } from 'react-router-dom'

export default function Profile(){
  const { id } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    fetch()
  }, [id])

  async function fetch(){
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', id).order('created_at', { ascending: false })
    if(error) return console.error(error)
    setPosts(data)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Profile {id}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(p=> (
          <div key={p.id} className="bg-white rounded shadow overflow-hidden">
            <img src={p.image_url} className="w-full h-48 object-cover" />
            <div className="p-3">{p.caption}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
