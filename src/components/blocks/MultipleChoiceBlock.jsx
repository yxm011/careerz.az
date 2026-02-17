import { useState } from 'react';
import './Block.css';

function MultipleChoiceBlock({ data, value, onChange }) {
  const [selectedAnswers, setSelectedAnswers] = useState(value || []);

  const handleSelect = (optionIndex) => {
    let newSelection;
    if (data.multiSelect) {
      if (selectedAnswers.includes(optionIndex)) {
        newSelection = selectedAnswers.filter(idx => idx !== optionIndex);
      } else {
        newSelection = [...selectedAnswers, optionIndex];
      }
    } else {
      newSelection = [optionIndex];
    }
    setSelectedAnswers(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="block mcq-block">
      <h3 className="mcq-question">{data.question}</h3>
      {data.description && <p className="mcq-description">{data.description}</p>}
      
      <div className="mcq-options">
        {data.options.map((option, idx) => (
          <div
            key={option.id || idx}
            className={`mcq-option ${selectedAnswers.includes(idx) ? 'selected' : ''}`}
            onClick={() => handleSelect(idx)}
          >
            <div className="mcq-radio">
              {data.multiSelect ? (
                <input
                  type="checkbox"
                  checked={selectedAnswers.includes(idx)}
                  onChange={() => handleSelect(idx)}
                />
              ) : (
                <input
                  type="radio"
                  checked={selectedAnswers.includes(idx)}
                  onChange={() => handleSelect(idx)}
                />
              )}
            </div>
            <div className="mcq-label">{typeof option === 'string' ? option : option.text}</div>
          </div>
        ))}
      </div>
      
      {data.multiSelect && (
        <p className="mcq-hint">Select all that apply</p>
      )}
    </div>
  );
}

export default MultipleChoiceBlock;
