import React from 'react'

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      

      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
    </div>
  )
}

export default NotFound
