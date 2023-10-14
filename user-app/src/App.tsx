import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated import
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'
import ApiTester from './page/ApiTester'
import { useContext, useState } from 'react'
import { AuthContext, LoginGoogle, appConfig } from 'auth-lib'
import axios from 'axios'
import { DarkModeToggle, DefaultContainer } from 'ui-lib'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  return (
    <DefaultContainer className={`App`}>
      <Router>
        <div className="App-header">
          <LoginGoogle
            config={appConfig}
            setMessage={setMessage}
            axiosInstance={axios}
          />
          <DarkModeToggle />
          <Navigation />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            {isLoggedIn ? (
              <Route path="/api-tester" element={<ApiTester />} />
            ) : (
              <Route path="/api-tester" element={<p>Log in to see pages</p>} />
            )}
          </Routes>
          {message && <p>{message}</p>}
        </div>
      </Router>
    </DefaultContainer>
  )
}

export default App
