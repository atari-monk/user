import axios from 'axios'
import React, { useState } from 'react'

const ApiTesterForm: React.FC = () => {
  const initialFormData = {
    name: '',
    email: '',
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
      await axios.post('http://localhost:3000/api/v1/users', {
        email: formData.email,
        displayName: formData.name,
      })

      setSuccessMessage('User created successfully')
      setErrorMessage('')
      setFormData(initialFormData)
    } catch (error) {
      setErrorMessage('Error creating user. Please try again.')
      setSuccessMessage('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2>User Form</h2>
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
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
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

export default ApiTesterForm
