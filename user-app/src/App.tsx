import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated import
import Navigation from './component/Navigation'
import About from './page/About'
import Home from './page/Home'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App-header">
        <Navigation />
        <Routes>
          {' '}
          {/* Updated to use <Routes> */}
          <Route path="/about" element={<About />} /> {/* Updated syntax */}
          {/* Add more routes for additional pages */}
          <Route path="/" element={<Home />} /> {/* Updated syntax */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
