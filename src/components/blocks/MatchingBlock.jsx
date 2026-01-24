import { useState } from 'react';
import './Block.css';

function MatchingBlock({ data, value, onChange }) {
  const [matches, setMatches] = useState(value || {});

  const handleMatch = (leftIndex, rightValue) => {
    const newMatches = { ...matches, [leftIndex]: rightValue };
    setMatches(newMatches);
    onChange(newMatches);
  };

  return (
    <div className="block matching-block">
      <h3>{data.question}</h3>
      {data.instructions && <p className="instructions">{data.instructions}</p>}
      
      <div className="matching-container">
        <div className="matching-column">
          <h4>Match these:</h4>
          {data.leftItems.map((item, idx) => (
            <div key={idx} className="matching-item left-item">
              <span className="item-number">{idx + 1}</span>
              <span className="item-text">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="matching-column">
          <h4>With these:</h4>
          {data.leftItems.map((_, idx) => (
            <div key={idx} className="matching-dropdown-wrapper">
              <select
                value={matches[idx] || ''}
                onChange={(e) => handleMatch(idx, e.target.value)}
                className="matching-select"
              >
                <option value="">-- Select --</option>
                {data.rightItems.map((rightItem, rightIdx) => (
                  <option key={rightIdx} value={rightItem}>
                    {rightItem}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
      
      <p className="matching-hint">💡 Select the correct match for each item</p>
    </div>
  );
}

export default MatchingBlock;
