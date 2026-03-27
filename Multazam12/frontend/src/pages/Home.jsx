import React, { useEffect, useState } from 'react'
import Gallery from '../components/Gallery'
import UploadForm from '../components/UploadForm'
import { supabase } from '../lib/supabase'

export default function Home(){
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    fetchPosts()
    const subscription = supabase.channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
        // simple approach: re-fetch all posts
        fetchPosts()
      })
      .subscribe()

    return ()=>{
      supabase.removeChannel(subscription)
    }
  }, [])

  async function fetchPosts(){
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if(error) return console.error(error)
    setPosts(data)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <UploadForm onUploaded={fetchPosts} />
      <Gallery posts={posts} />
    </div>
  )
}
