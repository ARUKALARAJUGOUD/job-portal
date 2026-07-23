import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../socketServices/socket";
import MessageList from "../components/chats/MessageList";
import { useAuth } from "../Contexts/AuthContext";
import "../cssStyle/chatPage.css";
import API from "../services/api";

const ChatPage = () => {
  const { user } = useAuth();

  const location = useLocation();
  const receiverId = location.state?.receiverId;
  const fullName = location.state?.fullName;
  // const receiverId = data?.recruiter
  // const fullName = "Arukala raju";
  const fileInputRef = useRef(null);

  const senderId = user._id;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const isOnline = onlineUsers.includes(receiverId);
  const typingTimeoutRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("receiverId", receiverId);

      const res = await API.post("/message/upload", formData);

      const savedMessage = res.data.data;

      // Update sender UI immediately
      setMessages((prev) => [...prev, savedMessage]);

      // Send to receiver via Socket.IO
      socket.emit("sendMessage", savedMessage);

      // Clear selected file
      setSelectedFile(null);

      // Clear file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    console.log(file);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);
  }, [user]);

  // typing animation
  useEffect(() => {
    const handleTyping = ({ senderId }) => {
      if (String(senderId) === String(receiverId)) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ senderId }) => {
      if (String(senderId) === String(receiverId)) {
        setIsTyping(false);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [receiverId]);

  // message update delivered  in the ui
  useEffect(() => {
    const handleDelivered = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, delivered: true } : msg,
        ),
      );
    };

    // here we update deliver in the data base

    socket.on("messagesDelivered", handleDelivered);

    return () => {
      socket.off("messagesDelivered", handleDelivered);
    };
  }, []);

  // received and delivered messages
  useEffect(() => {
    const handleReceiveMessage = async (message) => {
      const isCurrentChat =
        (String(message.senderId) === String(receiverId) &&
          String(message.receiverId) === String(senderId)) ||
        (String(message.senderId) === String(senderId) &&
          String(message.receiverId) === String(receiverId));

      if (isCurrentChat) {
        setMessages((prev) => [...prev, message]);
      }

      // update seen feature
      await API.put(`/message/seen/${message.senderId}`);

      socket.emit("seenMessage", {
        senderId: message.senderId,

        receiverId: message.receiverId,
      });

      console.log("message  == " + message.senderId);

      await API.put("/message/delivered", {
        messageId: message.messageId,
      });
      // message deliver
      socket.emit("messageDelivered", {
        senderId: message.senderId,
        receiverId: message.receiverId,
        messageId: message._id,
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [receiverId, senderId]);

  // fetch the messages
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/message/${receiverId}`);

      setMessages(res.data.messages); // or res.data.data depending on your API

      // await API.put(`/message/seen/${receiverId}`);

      // socket.emit("messagesSeenUpdate", {
      //   senderId: receiverId,
      //   receiverId: senderId,
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch messages from the database
  useEffect(() => {
    if (!receiverId) return;

    const loadConversation = async () => {
      setMessages([]);

      await fetchMessages();

      await API.put(`/message/seen/${receiverId}`);

      socket.emit("seenMessage", {
        senderId: receiverId,
        receiverId: senderId,
      });

      socket.emit("messagesSeenUpdate", {
        senderId: receiverId,
        receiverId: senderId,
      });
    };

    loadConversation();
  }, [receiverId]);
  // update seen messages

  // seen feature
  useEffect(() => {
    socket.on("messagesSeen", () => {
      setMessages((prev) =>
        prev.map((msg) =>
          String(msg.senderId) === String(senderId) &&
          String(msg.receiverId) === String(receiverId)
            ? { ...msg, seen: true }
            : msg,
        ),
      );
    });

    return () => {
      socket.off("messagesSeen");
    };
  }, [receiverId]);

  // message send
  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post("/message/send", {
        receiverId,
        text,
      });

      const savedMessage = res.data.data;

      // Update sender UI
      setMessages((prev) => [...prev, savedMessage]);

      socket.emit("sendMessage", savedMessage);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSend = async () => {
  //   try {
  //     // Nothing to send
  //     if (!text.trim() && !selectedFile) return;

  //     let savedMessage;

  //     if (selectedFile) {
  //       const formData = new FormData();

  //       formData.append("file", selectedFile);
  //       formData.append("receiverId", receiverId);

  //       if (text.trim()) {
  //         formData.append("text", text);
  //       }

  //       const res = await API.post(
  //         "/message/upload",
  //         formData
  //       );

  //       savedMessage = res.data.data;

  //       setSelectedFile(null);

  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = "";
  //       }

  //     } else {

  //       const res = await API.post(
  //         "/message/send",
  //         {
  //           receiverId,
  //           text
  //         }
  //       );

  //       savedMessage = res.data.data;
  //     }

  //     setMessages(prev => [...prev, savedMessage]);

  //     socket.emit("sendMessage",{savedMessage});

  //     setText("");

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // used for typing feature
  const handleTyping = (e) => {
    setText(e.target.value);

    socket.emit("typing", {
      senderId,
      receiverId,
    });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId,
        receiverId,
      });
    }, 1000);
  };

  if (loading) {
    return <div className="chat-loading">Loading messages...</div>;
  }

  return (
    <div className="chat-container">
      {/* Header */}

      <div className="chat-header">
        <div className="chat-user-info">
          <div>
            <h2>{fullName}</h2>

            <div className="user-status">
              <span
                className={`chat-status ${isOnline ? "online" : "offline"}`}
              ></span>

              <p>{isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}

      <div className="chat-body">
        <MessageList messages={messages} senderId={senderId} />
        <div ref={messagesEndRef}></div>
      </div>

      {/* Footer */}
      {/* Selected Attachment Preview */}
      {selectedFile && (
        <div className="attachment-preview">
          <div className="attachment-info">
            <span className="attachment-icon">
              {selectedFile.type.startsWith("image")
                ? "🖼️"
                : selectedFile.type === "application/pdf"
                  ? "📄"
                  : selectedFile.type.startsWith("video")
                    ? "🎥"
                    : selectedFile.type.startsWith("audio")
                      ? "🎵"
                      : "📎"}
            </span>

            <div className="attachment-details">
              <p className="attachment-name">{selectedFile.name}</p>
              <small>{(selectedFile.size / 1024).toFixed(1)} KB</small>
            </div>
          </div>

          <div className="attachment-actions">
            <button className="upload-btn" onClick={handleFileUpload}>
              Upload
            </button>

            <button
              className="cancel-upload-btn"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Chat Footer */}
      <div className="chat-footer">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*,.pdf,video/*,audio/*"
          onChange={handleFileChange}
        />

        <button className="file-attachment-btn" onClick={handleAttachmentClick}>
          📎
        </button>

        <input
          value={text}
          onChange={handleTyping}
          placeholder="Type your message..."
        />

        <button disabled={!text.trim()} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
