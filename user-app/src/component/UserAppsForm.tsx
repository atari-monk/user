// UserAppsForm.tsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IUser } from '../api/IUser'
import { IApp } from '../api/IApp'

const UserAppsForm: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [apps, setApps] = useState<IApp[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [selectedApp, setSelectedApp] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const fetchUsersAndApps = async () => {
      try {
        const usersResponse = await axios.get<IUser[]>(
          'http://localhost:3000/api/v1/users'
        )
        const appsResponse = await axios.get<IApp[]>(
          'http://localhost:3000/api/v1/apps'
        )
        setUsers(usersResponse.data)
        setApps(appsResponse.data)
      } catch (error) {
        console.error('Error fetching users and apps:', error)
      }
    }

    fetchUsersAndApps()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await axios.post('http://localhost:3000/api/v1/user-apps', {
        userId: selectedUser,
        appId: selectedApp,
      })

      setSuccessMessage('User App association created successfully')
      setErrorMessage('')
      setSelectedUser('')
      setSelectedApp('')
    } catch (error) {
      setErrorMessage('Error creating user app association. Please try again.')
      setSuccessMessage('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>User Apps</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.displayName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select App:</label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            required
          >
            <option value="">Select App</option>
            {apps.map((app) => (
              <option key={app._id} value={app._id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default UserAppsForm
