import React from 'react'
import ReactDOM from 'react-dom'

export const MyModal = ({
  visible,
  positionX, 
  positionY,
  onClose,
  children,
}) => {
  if (!visible) return null;


  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        minWidth: '100%',
        margin: 0,
        padding: 0,
        height: '3098vh',
        backgroundColor: 'rgba(0,0,0,0.5)',        
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          left: `300px`,
          bottom: `${Math.min(positionY, 98)}%`,
          left: `${positionX*250 - 200}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('App') 
  )
}