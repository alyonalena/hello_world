import React, { useState, useMemo } from 'react';
import './TimelineDemo.css';

const TimelineDemo = ({ items, onItemClick, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);
console.info('RENDERING '+ title)
  // Парсим год в число
  const parseYear = (yearStr) => {
    const cleaned = yearStr
      .replace(/\s*г\.?\s*/, '')
      .replace('до н.э.', '-')
      .replace(/[^0-9-]/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 0 : num;
  };

  // Сортируем события по году (для правильного отображения снизу вверх)
  const sortedItems = useMemo(() => {
    return [...items]
      .map((item, index) => ({ ...item, index, sortYear: parseYear(item.year) }))
      .sort((a, b) => a.sortYear - b.sortYear);
  }, [items]);

  const handleItemClick = (event) => {
    setActiveIndex(event.index)
    onItemClick(event)
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline-title">{title}</div>
      <div className="timeline-container">
        {/* Вертикальная линия */}
        <div className="timeline-line"></div>

        {/* Метки событий */}
        {sortedItems.map((item, idx) => {
          const year = parseYear(item.year);
          const minYear = -2400;
          const maxYear = 2026;
          const range = maxYear - minYear || 1;
          const position = ((year - minYear) / range) * 100;

          return (
            <div
              key={idx}
              className={`timeline-item ${activeIndex === item.index ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
              style={{ bottom: `${position}%` }}
            >
              <div className="timeline-point">
                <span className="timeline-year"><strong>{Number(item.year) > 0 ? `${item.year} г.`: `${item.year} г. (до Н.Э.)`}</strong> {item.title || item.shortTitle}</span>
              </div>
             {/*} <div className="timeline-content">
                <span className="timeline-label">{item.shortTitle || item.title}</span>
              </div>*/}
            </div>
          );
        })}

        {/* Метка "0" (наше время) 
        <div className="timeline-zero">
          <span>0 г.</span>
        </div>*/}
      </div>

    </div>
  );
};

export default TimelineDemo;