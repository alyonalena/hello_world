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
    fontSize: '0.7rem',
    background: isActive ? "#B00000" : "#F2F2F2",
    color: isActive ? "white": "#1E1F1F",
    marginRight: "10px",
    textDecoration: 'none',
    padding: '8px 24px 8px 24px',
    border: 'none',
    borderRadius: '2rem',
    boxShadow: '0 5px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.08)'
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
            display: 'flex', 
            position: 'fixed',
            top: 0,
            left: 0,
            minWidth: '500px'
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
