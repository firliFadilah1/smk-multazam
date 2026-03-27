import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import ToastProvider from './components/ToastProvider'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <ToastProvider />
    </div>
  )
}
