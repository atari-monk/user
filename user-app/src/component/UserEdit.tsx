import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IUser } from '../api/IUser'
import { useParams } from 'react-router-dom'
import { appConfig } from 'auth-lib'

const initialFormData: IUser = {
  _id: '',
  email: '',
  displayName: '',
}

const UserEdit: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<IUser>(initialFormData)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUser((prevUser: IUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const updatedData = {
        email: user?.email,
        displayName: user?.displayName,
      }

      const response = await axios.patch<IUser>(
        `${appConfig.apiUrl}/users/${userId}`,
        updatedData
      )

      if (response.status === 200) {
        console.log('User updated successfully')
      } else {
        console.error('Update failed:', response.data)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `${appConfig.apiUrl}/users/${userId}`
        )
        setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchUser()
  }, [userId])

  return (
    <div>
      <h2>Edit User</h2>
      {user && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Display Name:</label>
            <input
              type="text"
              name="displayName"
              value={user.displayName}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Update</button>
        </form>
      )}
    </div>
  )
}

export default UserEdit
