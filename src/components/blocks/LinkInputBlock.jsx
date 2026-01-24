import './Block.css';

function LinkInputBlock({ data, value, onChange }) {
  return (
    <div className="block link-input-block">
      <label className="block-label">
        {data.label}
        {data.required && <span className="required">*</span>}
      </label>
      <input
        type="url"
        className="link-input"
        placeholder={data.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default LinkInputBlock;
