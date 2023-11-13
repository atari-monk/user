import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { IAppLimits } from '../api/IAppLimits'
import { IApp } from '../api/IApp'
import { appConfig } from 'auth-lib'

const AppLimitsForm: React.FC = () => {
  const [formData, setFormData] = useState<IAppLimits>({
    appId: '',
    plan: '',
    limits: [],
  })

  const [apps, setApps] = useState<IApp[]>([])

  useEffect(() => {
    // Fetch apps when the component mounts
    const fetchApps = async () => {
      try {
        const appsResponse = await axios.get<IApp[]>(`${appConfig.apiUrl}/apps`)
        setApps(appsResponse.data)
      } catch (error) {
        console.error('Error fetching apps:', error)
      }
    }

    fetchApps()
  }, [])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleLimitChange = (index: number, field: string, value: string) => {
    setFormData((prevData) => {
      const newLimits = [...prevData.limits]
      newLimits[index] = { ...newLimits[index], [field]: value }
      return { ...prevData, limits: newLimits }
    })
  }

  const handleAddLimit = () => {
    setFormData((prevData) => ({
      ...prevData,
      limits: [...prevData.limits, { modelName: '', maxRecordsNr: 0 }],
    }))
  }

  const handleRemoveLimit = (index: number) => {
    setFormData((prevData) => {
      const newLimits = [...prevData.limits]
      newLimits.splice(index, 1)
      return { ...prevData, limits: newLimits }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      // Post formData to the server
      await axios.post(
        `${appConfig.apiUrl}/app-limits/`,
        formData
      )
      // Handle success, e.g., redirect or show a success message
      console.log('App limits created successfully!')
    } catch (error) {
      console.error('Error creating app limits:', error)
      // Handle error, e.g., show an error message to the user
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select App:
        <select
          name="appId"
          value={formData.appId}
          onChange={handleInputChange}
        >
          <option value="">Select an App</option>
          {apps.map((app) => (
            <option key={app._id} value={app._id}>
              {app.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Plan:
        <input
          type="text"
          name="plan"
          value={formData.plan}
          onChange={handleInputChange}
        />
      </label>

      <h3>Limits:</h3>

      {formData.limits.map((limit, index) => (
        <div key={index}>
          <label>
            Model Name:
            <input
              type="text"
              value={limit.modelName}
              onChange={(e) =>
                handleLimitChange(index, 'modelName', e.target.value)
              }
            />
          </label>

          <label>
            Max Records Number:
            <input
              type="number"
              value={limit.maxRecordsNr}
              onChange={(e) =>
                handleLimitChange(index, 'maxRecordsNr', e.target.value)
              }
            />
          </label>

          <button type="button" onClick={() => handleRemoveLimit(index)}>
            Remove Limit
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddLimit}>
        Add Limit
      </button>

      <button type="submit">Submit</button>
    </form>
  )
}

export default AppLimitsForm
