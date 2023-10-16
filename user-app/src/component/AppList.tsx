import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { App } from './App'

const AppList: React.FC = () => {
  const [apps, setApps] = useState<App[]>([])

  useEffect(() => {
    // Fetch the list of apps from your API
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/apps') // Update the API endpoint
        setApps(response.data)
      } catch (error) {
        console.error('Failed to fetch apps:', error)
      }
    }

    fetchApps()
  }, [])

  return (
    <div>
      <h2>App List</h2>
      <ul>
        {apps.map((app) => (
          <li key={app._id}>
            <strong>Name:</strong> {app.name}
            <br />
            <strong>Description:</strong> {app.desc}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AppList
