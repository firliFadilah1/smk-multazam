import React from 'react'
import Card from './Card'

export default function Gallery({ posts }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(p=> (
        <Card key={p.id} post={p} />
      ))}
    </div>
  )
}
