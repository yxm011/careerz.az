import { useState } from 'react';
import './Block.css';

function TrueFalseBlock({ data, value, onChange }) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (answer) => {
    setSelected(answer);
    onChange(answer);
  };

  return (
    <div className="block truefalse-block">
      <h3 className="tf-question">{data.question}</h3>
      {data.description && <p className="tf-description">{data.description}</p>}
      
      <div className="tf-options">
        <div
          className={`tf-option ${selected === true ? 'selected' : ''}`}
          onClick={() => handleSelect(true)}
        >
          <div className="tf-icon">✓</div>
          <div className="tf-label">True</div>
        </div>
        <div
          className={`tf-option ${selected === false ? 'selected' : ''}`}
          onClick={() => handleSelect(false)}
        >
          <div className="tf-icon">✕</div>
          <div className="tf-label">False</div>
        </div>
      </div>
    </div>
  );
}

export default TrueFalseBlock;
