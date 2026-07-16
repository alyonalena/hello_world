import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

/*interface FloatingModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // координаты клика (clientX, clientY)
  anchorX: number;
  anchorY: number;
}*/

export const FloatingModal/*: React.FC<FloatingModalProps>*/ = ({
  visible,
  onClose,
  children,
  anchorX,
  anchorY,
}) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !modalRef.current) return;

    // Получаем размеры модального окна
    const rect = modalRef.current.getBoundingClientRect();
    const modalWidth = rect.width;
    const modalHeight = rect.height;

    // Отступ от курсора (можно настроить)
    const offsetX = 10;
    const offsetY = 10;

    // Вычисляем позицию, чтобы окно не выходило за границы вьюпорта
    let left = anchorX + offsetX;
    let top = anchorY + offsetY;

    if (left + modalWidth > window.innerWidth) {
      left = anchorX - modalWidth - offsetX;
    }
    if (top + modalHeight > window.innerHeight) {
      top = anchorY - modalHeight - offsetY;
    }
    // Дополнительная страховка, если всё равно вылезает
    left = Math.max(0, Math.min(left, window.innerWidth - modalWidth));
    top = Math.max(0, Math.min(top, window.innerHeight - modalHeight));

    setPosition({ left, top });
  }, [visible, anchorX, anchorY]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // фон не перехватывает клики
        zIndex: 9999,
      }}
    >
      {/* Затемнение – если нужно, раскомментируйте и добавьте pointerEvents: 'auto' */}
      {/* <div style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', background: 'rgba(0,0,0,0.5)' }} onClick={onClose} /> */}
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          left: position.left,
          top: position.top,
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          pointerEvents: 'auto', // чтобы можно было кликать по окну
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>,
    document.body
  );
};