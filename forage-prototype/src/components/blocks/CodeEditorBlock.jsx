import { useState } from 'react';
import './Block.css';

function CodeEditorBlock({ data, value, onChange }) {
  const [code, setCode] = useState(value || data.starterCode || '');

  const handleChange = (e) => {
    setCode(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="block code-editor-block">
      <div className="code-header">
        <h3>{data.label || 'Code Editor'}</h3>
        <span className="code-language">{data.language || 'JavaScript'}</span>
      </div>
      
      {data.instructions && <p className="code-instructions">{data.instructions}</p>}
      
      <div className="code-editor-wrapper">
        <div className="code-line-numbers">
          {code.split('\n').map((_, idx) => (
            <div key={idx} className="line-number">{idx + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={handleChange}
          className="code-textarea"
          placeholder={data.placeholder || '// Write your code here...'}
          spellCheck="false"
          rows={Math.max(10, code.split('\n').length)}
        />
      </div>
      
      {data.hints && data.hints.length > 0 && (
        <details className="code-hints">
          <summary>💡 Hints</summary>
          <ul>
            {data.hints.map((hint, idx) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export default CodeEditorBlock;
