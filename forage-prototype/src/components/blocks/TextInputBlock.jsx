import './Block.css';

function TextInputBlock({ data, value, onChange }) {
  return (
    <div className="block text-input-block">
      <label className="block-label">
        {data.label}
        {data.required && <span className="required">*</span>}
      </label>
      <textarea
        className="text-input"
        placeholder={data.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />
    </div>
  );
}

export default TextInputBlock;
