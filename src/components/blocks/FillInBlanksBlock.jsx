import { useState } from 'react';
import './Block.css';

function FillInBlanksBlock({ data, value, onChange }) {
  const [answers, setAnswers] = useState(value || {});

  const handleChange = (blankIndex, inputValue) => {
    const newAnswers = { ...answers, [blankIndex]: inputValue };
    setAnswers(newAnswers);
    onChange(newAnswers);
  };

  const renderTextWithBlanks = () => {
    const parts = data.text.split(/\[blank\]/g);
    const elements = [];

    parts.forEach((part, idx) => {
      elements.push(<span key={`text-${idx}`}>{part}</span>);
      
      if (idx < parts.length - 1) {
        elements.push(
          <input
            key={`blank-${idx}`}
            type="text"
            className="blank-input"
            value={answers[idx] || ''}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={`Blank ${idx + 1}`}
          />
        );
      }
    });

    return elements;
  };

  return (
    <div className="block fill-blanks-block">
      <h3>{data.question}</h3>
      {data.instructions && <p className="instructions">{data.instructions}</p>}
      
      <div className="blanks-text">
        {renderTextWithBlanks()}
      </div>
      
      {data.hints && data.hints.length > 0 && (
        <div className="hints-section">
          <strong>Hints:</strong>
          <ul>
            {data.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FillInBlanksBlock;
