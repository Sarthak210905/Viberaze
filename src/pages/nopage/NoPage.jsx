import React from 'react'
import { Link } from 'react-router-dom'

function NoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">Go to Home</Link>
    </div>
  )
}

export default NoPage