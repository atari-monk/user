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
          <Link to="/user_list" className="App-link">
            User List
          </Link>
        </li>
        <li>
          <Link to="/user_form" className="App-link">
            User Form
          </Link>
        </li>
        <li>
          <Link to="/app_list" className="App-link">
            App List
          </Link>
        </li>
        <li>
          <Link to="/app_form" className="App-link">
            App Form
          </Link>
        </li>
        <li>
          <Link to="/users_apps_list" className="App-link">
            Users Apps List
          </Link>
        </li>
        <li>
          <Link to="/user_apps_form" className="App-link">
            User Apps Form
          </Link>
        </li>
        <li>
          <Link to="/app_limits_form" className="App-link">
            App Limits Form
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
