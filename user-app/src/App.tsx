import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'
import ApiTester from './page/UserForm'
import { useContext } from 'react'
import { AuthContext, appConfig } from 'auth-lib'
import axios from 'axios'
import { AppDiv, AppMenu } from 'ui-lib'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)

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
              <Route path="/user_form" element={<ApiTester />} />
            ) : (
              <Route path="/user_form" element={<p>Log in to see pages</p>} />
            )}
          </Routes>
        </div>
      </Router>
    </AppDiv>
  )
}

export default App
