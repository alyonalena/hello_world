import React from "react"
import { 
  BrowserRouter, 
  Routes, 
  Route,
  NavLink,
} from "react-router-dom"
import AppGeneral from "./AppGeneral"
import AppRussian from "./AppRussian"
import AppAbout from "./AppAbout"


export default function App() {
  // Navigation styling logic for active links
  const activeStyle = ({ isActive }) => ({
    fontSize: '0.8rem',
    fontWeight: isActive ? "bold" : "bold",
    color: isActive ? "#f0edff" : "#231D4A",
    background: isActive ? "#231D4A": "#f0edff",
    marginRight: "10px",
    textDecoration: 'none',
    padding: '6px 18px',
    border: 'none',
    borderRadius: '12px',
  });

/*
  color: #f0edff;
  background: #6c5ce7;
  padding: 4px 12px;
  color: white;
  border: none;
  border-radius: 6px;
*/

  return (
    <BrowserRouter>
      <div>
        {/* Navigation Bar */}
        <nav 
          style={{ 
            padding: "10px 60px 10px 30px", 
            backgroundColor: "white", 
            width: '95vw', 
            display: 'flex', 
            justifyContent: 'space-between',
            position: 'fixed',
            top: 0,
            left: 0
          }}
        >
          <div>
            <NavLink to="/" style={activeStyle}>Всеобщая история</NavLink>
            <NavLink to="/russian" style={activeStyle}>История России</NavLink>
            <NavLink to="/about" style={activeStyle}>О проекте</NavLink>
          </div>
          {/*<div>
            <NavLink to="/about" style={activeStyle}>?</NavLink>
          </div>*/}
        </nav>

        {/* Route Definitions */}
        <main style={{ padding: "20px", top: "50px" }}>
          <Routes>
            <Route path="/" element={<AppGeneral />} />
            <Route path="/russian" element={<AppRussian />} />
            <Route path="/about" element={<AppAbout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
