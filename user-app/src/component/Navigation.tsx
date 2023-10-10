// src/Navigation.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="App-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/api-tester" className="App-link">
            API Tester
          </Link>
        </li>
        <li>
          <Link to="/about" className="App-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
