
// const MessageBubble = ({ message, senderId }) => {
//   const isMine = String(message.senderId) === String(senderId);
//   const formatFileSize = (bytes) => {
//     if (!bytes) return "";

//     if (bytes < 1024) return bytes + " B";

//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";

//     return (bytes / (1024 * 1024)).toFixed(1) + " MB";
//   };
//   return (
//     <div className={`bubble message-row ${isMine ? "sent" : "received"}`}>
//       <div className="message-bubble">
//         {/* Text Message */}
//         {message.messageType === "text" && (
//           <p className="message-text">{message.text}</p>
//         )}

//         {/* Image Message */}
//         {message.messageType === "image" && (
//           <div className="image-message">
//             {/* <img
//               src={message.fileUrl}
//               alt={message.fileName}
//               className="message-image"
//             /> */}

//             <a href={message.fileUrl} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={message.fileUrl}
//                 alt={message.fileName}
//                 className="message-image"
//               />
//             </a>

//             <span className="image-name">{message.fileName}</span>
//           </div>
//         )}

//         {/* PDF */}
//         {message.messageType === "pdf" && (
//           <div className="document-message">
//             <div className="document-icon">📄</div>

//             <div className="document-details">
//               <p className="document-name">{message.fileName}</p>

//               <p className="document-size">
//                 {formatFileSize(message.fileSize)}
//               </p>
//             </div>

//             <a
//               href={message.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="document-button"
//             >
//               Open
//             </a>
//           </div>
//         )}

//         <div className="message-footer">
//           <span className="message-time">
//             {new Date(message.createdAt).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>

//           {isMine && (
//             <span className="message-status">
//               {message.seen ? "✓✓" : message.delivered ? "✓✓" : "✓"}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;



const MessageBubble = ({ message, senderId }) => {
  const isMine = String(message.senderId) === String(senderId);

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) return bytes + " B";

    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={`bubble message-row ${isMine ? "sent" : "received"}`}>
      <div className="message-bubble">

        {/* Text Message */}
        {message.messageType === "text" && (
          <p className="message-text">{message.text}</p>
        )}

        {/* Image Message */}
        {message.messageType === "image" && (
          <div className="image-message">
            <a
              href={message.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={message.fileUrl}
                alt={message.fileName}
                className="message-image"
                loading="lazy"
              />
            </a>

            {message.text && (
              <p className="message-caption">
                {message.text}
              </p>
            )}

            <span className="image-name">
              {message.fileName}
            </span>
          </div>
        )}

        {/* Video Message */}
        {message.messageType === "video" && (
          <div className="video-message">

            <video
              className="message-video"
              controls
              preload="metadata"
            >
              <source
                src={message.fileUrl}
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>

            {message.text && (
              <p className="message-caption">
                {message.text}
              </p>
            )}

            <span className="video-name">
              {message.fileName}
            </span>

            <span className="video-size">
              {formatFileSize(message.fileSize)}
            </span>

          </div>
        )}

        {/* PDF */}
        {message.messageType === "pdf" && (
          <div className="document-message">

            <div className="document-icon">
              📄
            </div>

            <div className="document-details">

              <p className="document-name">
                {message.fileName}
              </p>

              <p className="document-size">
                {formatFileSize(message.fileSize)}
              </p>

              {message.text && (
                <p className="message-caption">
                  {message.text}
                </p>
              )}

            </div>

            <a
              href={message.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="document-button"
            >
              Open
            </a>

          </div>
        )}

        {/* Footer */}
        <div className="message-footer">

          <span className="message-time">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isMine && (
            <span className="message-status">
              {message.seen
                ? "✓✓"
                : message.delivered
                ? "✓✓"
                : "✓"}
            </span>
          )}

        </div>

      </div>
    </div>
  );
};

export default MessageBubble;