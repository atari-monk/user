import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IApp } from './IApp'

const initialFormData = {
  name: '',
  desc: '',
}

const AppEdit: React.FC = () => {
  const { appId } = useParams<{ appId: string }>() // Get the appId from the URL

  const [app, setApp] = useState<IApp | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // Update the 'app' state with the changes
    setApp((prevApp: IApp | null) => ({
      ...prevApp!,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      // Create an object with the updated data
      const updatedData = {
        name: app?.name, // or formData.name if you prefer
        desc: app?.desc, // or formData.desc if you prefer
      }

      const response = await axios.patch<IApp>(
        `http://localhost:3000/api/v1/apps/${appId}`,
        updatedData
      )

      // Check if the update was successful and handle accordingly
      if (response.status === 200) {
        // Update was successful
        console.log('App updated successfully')
        // You can also reset successMessage and errorMessage state here, if needed
      } else {
        // Handle other status codes or errors as needed
        console.error('Update failed:', response.data)
      }
    } catch (error) {
      console.error('Error updating app:', error)
      // Handle the error, for example, by setting an errorMessage state
    }
  }

  useEffect(() => {
    // Fetch the app data by ID
    const fetchApp = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/apps/${appId}`
        ) // Update the API endpoint
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
          {/* Display the app data and update the form fields */}
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
