import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { IUser } from '../api/IUser'
import { IApp } from '../api/IApp'
import { appConfig } from 'auth-lib'

const UsersAppsList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [userApps, setUserApps] = useState<{ [userId: string]: string[] }>({})
  const [apps, setApps] = useState<IApp[]>([])

  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get<IUser[]>(
        `${appConfig.apiUrl}/users`
      )
      setUsers(usersResponse.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchUserApps = async (userId: string) => {
    try {
      const userAppsResponse = await axios.get<string[]>(
        `${appConfig.apiUrl}/user-apps/getUserApps/${userId}`
      )
      setUserApps((prevUserApps) => ({
        ...prevUserApps,
        [userId]: userAppsResponse.data,
      }))
    } catch (error) {
      console.error(`Error fetching user apps for user ${userId}:`, error)
    }
  }

  const fetchApps = async () => {
    try {
      const appsResponse = await axios.get<IApp[]>(`${appConfig.apiUrl}/apps`)
      setApps(appsResponse.data)
    } catch (error) {
      console.error('Error fetching apps:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchApps()
  }, [])

  useEffect(() => {
    // Log userApps and apps for debugging
    console.log('userApps:', userApps)
    console.log('apps:', apps)
  }, [userApps, apps])

  useEffect(() => {
    // Fetch user apps for each user
    users.forEach((user) => {
      fetchUserApps(user._id)
    })
  }, [users])

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.displayName} :</p>
            <ul>
              {userApps[user._id]?.map((appId) => {
                const app = apps.find((a) => a._id === appId)
                return app ? (
                  <li key={app._id}>
                    <p>{app.name}</p>
                    {/* <p>Description: {app.desc}</p> */}
                  </li>
                ) : null
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersAppsList
