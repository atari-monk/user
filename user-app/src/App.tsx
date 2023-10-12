import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated import
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'
import ApiTester from './page/ApiTester'
import { useContext, useState } from 'react'
import { AuthContext, LoginGoogle, appConfig } from 'auth-library'
import axios from 'axios'

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  return (
    <Router>
      <div className="App-header">
        <LoginGoogle
          config={appConfig}
          setMessage={setMessage}
          axiosInstance={axios}
        />
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
  )
}

export default App
