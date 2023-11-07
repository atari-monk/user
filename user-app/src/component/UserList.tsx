import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IUser } from '../api/IUser'

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>(
          'http://localhost:3000/api/v1/users'
        )
        setUsers(response.data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Email:</strong> {user.email}
            <br />
            <strong>Display Name:</strong> {user.displayName}
            <br />
            <Link to={`/user_edit/${user._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
