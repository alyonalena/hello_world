import React, { useState, useEffect, useRef } from 'react'

import './App.css'

function AppAbout() {
    return (
        <div>
            <div id="App" className="App" style={{ display: 'flex', minHeight: '100vh' }}>
                <div style={{ padding: '1rem' }}>
                    <h4>Миссия:</h4>
                    <p>
                        Сложить в один пазл все важнейшие знания о мире.
                    </p>
                </div>
            </div>           
        </div>
    )
}

export default AppAbout