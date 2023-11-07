import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IApp } from '../api/IApp'

const initialFormData: IApp = {
  _id: '',
  name: '',
  desc: '',
}

const AppEdit: React.FC = () => {
  const { appId } = useParams<{ appId: string }>()
  const [app, setApp] = useState<IApp>(initialFormData)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setApp((prevApp: IApp | null) => ({
      ...prevApp!,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const updatedData = {
        name: app?.name,
        desc: app?.desc,
      }

      const response = await axios.patch<IApp>(
        `http://localhost:3000/api/v1/apps/${appId}`,
        updatedData
      )

      if (response.status === 200) {
        console.log('App updated successfully')
      } else {
        console.error('Update failed:', response.data)
      }
    } catch (error) {
      console.error('Error updating app:', error)
    }
  }

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/apps/${appId}`
        )
        setApp(response.data)
      } catch (error) {
        console.error('Failed to fetch app:', error)
      }
    }

    fetchApp()
  }, [appId])

  return (
    <div>
      <h2>Edit App</h2>
      {app && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={app?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="desc"
              value={app?.desc || ''}
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

export default AppEdit
