import React, { useState, useMemo } from 'react';
import './TimelineDemo.css';

const TimelineDemo = ({ items, onItemClick, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Парсим год в число
  const parseYear = (yearStr) => {
    const cleaned = yearStr
      .replace(/\s*г\.?\s*/, '')
      .replace('до н.э.', '-')
      .replace(/[^0-9-]/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 0 : num;
  };

  // Вычисляем пропорциональные позиции (0% = самая ранняя дата, 100% = самая поздняя)
  const positions = useMemo(() => {
    const years = items.map(item => parseYear(item.year));
    const minYear = Math.min(...years);
    const maxYear = 2026;
    const range = maxYear - minYear || 1;

    return items.map((item) => {
      const year = parseYear(item.year);
      // Инвертируем, чтобы 0 был внизу: (1 - (year - minYear) / range) * 100
      return ((year - minYear) / range) * 100;
    });
  }, [items]);

  // Сортируем события по году (для правильного отображения снизу вверх)
  const sortedItems = useMemo(() => {
    return [...items]
      .map((item, index) => ({ ...item, index, sortYear: parseYear(item.year) }))
      .sort((a, b) => a.sortYear - b.sortYear);
  }, [items]);

  const handleItemClick = (event) => {
    onItemClick(event);
  };

  return (
    <div className="timeline-wrapper">
      <h4>{title}</h4>
      <div className="timeline-container">
        {/* Вертикальная линия */}
        <div className="timeline-line"></div>

        {/* Метки событий */}
        {sortedItems.map((item, idx) => {
          const year = parseYear(item.year);
          const minYear = 0;
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
                <span className="timeline-year"><strong>{item.year}</strong> {item.title || item.shortTitle}</span>
              </div>
             {/*} <div className="timeline-content">
                <span className="timeline-label">{item.shortTitle || item.title}</span>
              </div>*/}
            </div>
          );
        })}



        {/* Метка "0" (наше время) */}
        <div className="timeline-zero">
          <span>0 г.</span>
        </div>
      </div>

    </div>
  );
};

export default TimelineDemo;