import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socketServices/socket";
import "../cssStyle/RecentChats.css";
import API from "../services/api";

const RecentChats = ({ user }) => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id);
  }, [user]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);
  // All conversations
  const [recentChats, setRecentChats] = useState([]);

  // Search input
  const [search, setSearch] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSeenUpdate = ({ senderId }) => {
      setRecentChats((prevChats) =>
        prevChats.map((chat) => {
          if (String(chat.user._id) !== String(senderId)) {
            return chat;
          }

          return {
            ...chat,
            unreadCount: 0,
            lastMessage: {
              ...chat.lastMessage,
              seen: true,
            },
          };
        }),
      );
    };

    socket.on("messagesSeenUpdate", handleSeenUpdate);

    return () => {
      socket.off("messagesSeenUpdate", handleSeenUpdate);
    };
  }, []);
  // --------------------------------------------------
  // Fetch conversations
  // --------------------------------------------------

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setRecentChats((prevChats) => {
        // Find existing conversation
        const existingChat = prevChats.find((chat) => {
          return (
            String(chat.user._id) === String(message.senderId) ||
            String(chat.user._id) === String(message.receiverId)
          );
        });

        // If conversation doesn't exist
        if (!existingChat) {
          return prevChats;
        }

        // Update last message
        const updatedChat = {
          ...existingChat,

          lastMessage: {
            ...existingChat.lastMessage,

            text: message.text,
            messageType: message.messageType,
            createdAt: message.createdAt || new Date(),

            senderId: message.senderId,
            receiverId: message.receiverId,
          },

          unreadCount:
            String(message.senderId) === String(existingChat.user._id)
              ? existingChat.unreadCount + 1
              : existingChat.unreadCount,
        };

        // Remove old conversation
        const remainingChats = prevChats.filter(
          (chat) => String(chat.user._id) !== String(updatedChat.user._id),
        );

        // Move updated chat to top
        return [updatedChat, ...remainingChats];
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const fetchRecentChats = async () => {
    try {
      setLoading(true);

      const res = await API.get("/message/recent");

      setRecentChats(res.data.recentChats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentChats();
  }, []);

  //--------------------------------------------------
  // Filter conversations
  //--------------------------------------------------

  const filteredChats = useMemo(() => {
    return recentChats.filter((chat) =>
      chat.user.fullName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, recentChats]);

  //--------------------------------------------------
  // Open Chat
  //--------------------------------------------------

  const openChat = (chat) => {
    navigate("/chat", {
      state: {
        receiverId: chat.user._id,
        fullName:chat.user.fullName
      },
    });
  };

  //--------------------------------------------------
  // Message Preview
  //--------------------------------------------------

  const getLastMessage = (message) => {
    switch (message.messageType) {
      case "text":
        return message.text;

      case "image":
        return "📷 Photo";

      case "pdf":
        return "📄 Document";

      case "video":
        return "🎥 Video";

      case "audio":
        return "🎵 Audio";

      default:
        return "Attachment";
    }
  };

  //--------------------------------------------------

  if (loading) {
    return <div className="recent-loading">Loading Conversations...</div>;
  }

  return (
    <div className="recent-chat-container">
      {/* Header */}

      <div className="recent-header">
        <h2>Recent Chats</h2>

        <p>Welcome, {user.fullName}</p>
      </div>

      {/* Search */}

      <div className="recent-search">
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Empty */}

      {filteredChats.length === 0 && (
        <div className="empty-chat">No conversations found.</div>
      )}

      {/* Chat List */}

      <div className="recent-chat-list">
        {filteredChats.map((chat) => (
          <div
            key={chat.user._id}
            className="recent-chat-card"
            onClick={() => openChat(chat)}
          >
            {/* Avatar */}

            <div className="recent-avatar">
              {chat.user.profilePhoto ? (
                <img src={chat.user.profilePhoto} alt={chat.user.fullName} />
              ) : (
                <div className="avatar-placeholder">
                  {chat.user.fullName[0]}
                </div>
              )}
              {onlineUsers.includes(chat.user._id) && (
                <span className="online-dot"></span>
              )}
              {/* We'll connect this later */}
              {/* <span className="online-dot"></span> */}
            </div>

            {/* Middle */}

            <div className="recent-chat-content">
              <div className="recent-chat-top">
                <h4>{chat.user.fullName}</h4>

                <span>
                  {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="recent-chat-bottom">
                <p>{getLastMessage(chat.lastMessage)}</p>

                {chat.unreadCount > 0 && (
                  <div className="unread-count">{chat.unreadCount}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
