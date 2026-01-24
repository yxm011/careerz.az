import { useState } from 'react';
import './Block.css';

function FileUploadBlock({ data, value, onChange }) {
  const [fileName, setFileName] = useState(value?.name || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() });
    }
  };

  return (
    <div className="block file-upload-block">
      <label className="block-label">
        {data.label}
        {data.required && <span className="required">*</span>}
      </label>
      <div className="file-upload-area">
        <input
          type="file"
          id="file-input"
          className="file-input"
          accept={data.accept}
          onChange={handleFileChange}
        />
        <label htmlFor="file-input" className="file-upload-label">
          <div className="upload-icon">📁</div>
          <div className="upload-text">
            {fileName ? (
              <>
                <strong>{fileName}</strong>
                <span className="upload-hint">Click to change file</span>
              </>
            ) : (
              <>
                <strong>Click to upload or drag and drop</strong>
                <span className="upload-hint">Accepted: {data.accept}</span>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default FileUploadBlock;
