import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated import
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'
import ApiTester from './page/ApiTester'

function App() {
  return (
    <Router>
      <div className="App-header">
        <Navigation />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/api-tester" element={<ApiTester />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
