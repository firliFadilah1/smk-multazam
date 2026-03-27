import React from 'react'

export default function Card({ post }){
  return (
    <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative">
        <img src={post.image_url} alt={post.caption} className="w-full h-60 object-cover" />
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-700">{post.caption}</p>
      </div>
    </div>
  )
}
