import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IAppLimits } from '../api/IAppLimits'
import { IApp } from '../api/IApp'
import { appConfig } from 'auth-lib'

const AppsLimitsList: React.FC = () => {
  const [appLimits, setAppLimits] = useState<IAppLimits[]>([])
  const [apps, setApps] = useState<IApp[]>([])

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsResponse = await axios.get<IApp[]>(`${appConfig.apiUrl}/apps`)
        setApps(appsResponse.data)
      } catch (error) {
        console.error('Error fetching apps:', error)
      }
    }

    const fetchAppLimits = async () => {
      try {
        const appLimitsResponse = await axios.get<IAppLimits[]>(
          `${appConfig.apiUrl}/app-limits`
        )
        setAppLimits(appLimitsResponse.data)
      } catch (error) {
        console.error('Error fetching app limits:', error)
      }
    }

    fetchApps()
    fetchAppLimits()
  }, [])

  const getAppName = (appId: string) => {
    const app = apps.find((app) => app._id === appId)
    return app ? app.name : 'Unknown App'
  }

  return (
    <div>
      <h2>App Limits List</h2>
      {appLimits.map((appLimit) => (
        <div key={appLimit.appId}>
          <h3>{getAppName(appLimit.appId)}</h3>
          <p>Plan: {appLimit.plan}</p>
          <ul>
            {appLimit.limits.map((limit, index) => (
              <li key={index}>
                <p>Model Name: {limit.modelName}</p>
                <p>Max Records Number: {limit.maxRecordsNr}</p>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default AppsLimitsList
