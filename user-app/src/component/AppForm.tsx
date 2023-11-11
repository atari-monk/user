import React, { useState } from 'react'
import axios from 'axios'
import { appConfig } from 'auth-lib'

const AppForm: React.FC = () => {
  const initialFormData = {
    name: '',
    desc: '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await axios.post(`${appConfig.apiUrl}/apps`, {
        name: formData.name,
        desc: formData.desc,
      })

      setSuccessMessage('App created successfully')
      setErrorMessage('')
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage('Error creating app. Please try again.')
      setSuccessMessage('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>App Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          />
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

export default AppForm
