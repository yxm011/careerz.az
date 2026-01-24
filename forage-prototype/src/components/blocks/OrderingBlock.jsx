import { useState } from 'react';
import './Block.css';

function OrderingBlock({ data, value, onChange }) {
  const [items, setItems] = useState(value || data.items || []);

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
    onChange(newItems);
  };

  const moveUp = (index) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  return (
    <div className="block ordering-block">
      <h3>{data.question}</h3>
      {data.instructions && <p className="instructions">{data.instructions}</p>}
      
      <div className="ordering-list">
        {items.map((item, idx) => (
          <div key={idx} className="ordering-item">
            <div className="item-number">{idx + 1}</div>
            <div className="item-content">{item}</div>
            <div className="item-controls">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="move-btn"
                title="Move up"
              >
                ⬆️
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === items.length - 1}
                className="move-btn"
                title="Move down"
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <p className="ordering-hint">💡 Use the arrows to reorder the items</p>
    </div>
  );
}

export default OrderingBlock;
