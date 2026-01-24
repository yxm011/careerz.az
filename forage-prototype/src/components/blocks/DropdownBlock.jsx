import { useState } from 'react';
import './Block.css';

function DropdownBlock({ data, value, onChange }) {
  const [selected, setSelected] = useState(value || '');

  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="block dropdown-block">
      <label className="dropdown-label">
        {data.label}
        {data.required && <span className="required">*</span>}
      </label>
      {data.description && <p className="dropdown-description">{data.description}</p>}
      
      <select
        value={selected}
        onChange={handleChange}
        className="dropdown-select"
        required={data.required}
      >
        <option value="">-- Select an option --</option>
        {data.options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownBlock;
