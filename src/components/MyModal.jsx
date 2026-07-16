import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/*interface CenteredModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}*/

export const MyModal = ({
  visible,
  onClose,
  children,
}) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body // рендерим прямо в body – никаких transform-предков
  );
};