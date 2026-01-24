import './Block.css';

function VideoBlock({ data }) {
  return (
    <div className="block video-block">
      {data.title && <h3>{data.title}</h3>}
      {data.description && <p className="video-description">{data.description}</p>}
      
      <div className="video-container">
        {data.videoUrl ? (
          data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be') ? (
            <iframe
              src={data.videoUrl.replace('watch?v=', 'embed/')}
              title={data.title || 'Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          ) : (
            <video controls className="video-player">
              <source src={data.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <div className="video-placeholder">
            <div className="placeholder-icon">🎥</div>
            <p>Video: {data.title || 'Instructional Video'}</p>
            <small>Video would be embedded here</small>
          </div>
        )}
      </div>
      
      {data.transcript && (
        <details className="video-transcript">
          <summary>View Transcript</summary>
          <div className="transcript-content">{data.transcript}</div>
        </details>
      )}
    </div>
  );
}

export default VideoBlock;
