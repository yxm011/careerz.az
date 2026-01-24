import './Block.css';

function AssetBlock({ data }) {
  return (
    <div className="block asset-block">
      <h3>📎 Resources & Downloads</h3>
      <div className="asset-list">
        {data.files.map((file, index) => (
          <div key={index} className="asset-item">
            <div className="asset-info">
              <span className="asset-icon">📄</span>
              <div>
                <div className="asset-name">{file.name}</div>
                <div className="asset-size">{file.size}</div>
              </div>
            </div>
            <button className="btn-download">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetBlock;
