import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'
import UserForm from './page/UserForm'
import { useContext } from 'react'
import { AuthContext, appConfig } from 'auth-lib'
import axios from 'axios'
import { AppDiv, AppMenu } from 'ui-lib'
import AppForm from './page/AppForm'
import AppList from './page/AppList'
import AppEdit from './component/AppEdit'
import UserList from './component/UserList'
import UserEdit from './component/UserEdit'
import UserAppsForm from './component/UserAppsForm'
import UsersAppsList from './component/UsersAppsList'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)
  appConfig.appName = 'User App'

  return (
    <AppDiv className={`App`}>
      <Router>
        <div className="App-header">
          <AppMenu config={appConfig} axiosInstance={axios} />
          <Navigation />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            {isLoggedIn ? (
              <>
                <Route path="/user_list" element={<UserList />} />
                <Route path="/user_edit/:userId" element={<UserEdit />} />
                <Route path="/user_form" element={<UserForm />} />
                <Route path="/app_list" element={<AppList />} />
                <Route path="/app_edit/:appId" element={<AppEdit />} />
                <Route path="/app_form" element={<AppForm />} />
                <Route path="/users_apps_list" element={<UsersAppsList />} />
                <Route path="/user_apps_form" element={<UserAppsForm />} />
              </>
            ) : (
              <>
                <Route path="/user_list" element={<p>Log in to see forms</p>} />
                <Route path="/user_form" element={<p>Log in to see forms</p>} />
                <Route path="/app_list" element={<p>Log in to see forms</p>} />
                <Route path="/app_form" element={<p>Log in to see forms</p>} />
                <Route path="/users_apps_list" element={<p>Log in to see forms</p>} />
                <Route path="/user_apps_form" element={<p>Log in to see forms</p>} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </AppDiv>
  )
}

export default App
