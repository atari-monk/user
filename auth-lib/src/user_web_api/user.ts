import { appConfig } from '../config/appConfig'
import { IUser } from './IUser'

const createUser = async (axiosInstance: any, user: IUser): Promise<string> => {
  try {
    const response = await axiosInstance.get(
      `${appConfig.apiUrl}/users/email/${user.email}`
    )

    if (response.data.userId) {
      return 'User with this email already exists'
    }

    return 'User created successfully'
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // If the email is not found (404 error), create the user
      await axiosInstance.post(`${appConfig.apiUrl}/users`, {
        email: user.email,
        displayName: user.displayName,
      })

      return 'User created successfully'
    } else {
      // Handle other errors
      return `Error creating user. ${error.message}`
    }
  }
}

export default createUser
