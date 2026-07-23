import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, senderId }) => {
  return (
    <>
      {messages.map((message) => (
        <div
          className={
            message.senderId.toString() === senderId.toString()
              ? "message sent"
              : "message received"
          }
        >
          <MessageBubble
            key={message._id}
            message={message}
            senderId={senderId}
          />
        </div>
      ))}
    </>
  );
};

export default MessageList;
