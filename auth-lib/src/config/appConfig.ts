import IAppConfig from '../interfaces/config/IAppConfig'

const local = 'http://localhost:3001/user-api/v1'
const prod = ''
const isProd = false

export const appConfig: IAppConfig = {
  appName: 'Auth App',
  apiUrl: isProd ? prod : local,
}
