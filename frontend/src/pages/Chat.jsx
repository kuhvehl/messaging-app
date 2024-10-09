import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage, getUserProfile } from "../services/api"; // Assume getUserProfile fetches user by ID

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatUser, setChatUser] = useState(null); // To store the user we are chatting with

  useEffect(() => {
    // Fetch the messages
    const fetchMessages = async () => {
      try {
        const response = await getMessages(userId);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Fetch the profile of the user we are chatting with
    const fetchChatUser = async () => {
      try {
        const response = await getUserProfile(userId); // Fetch the other user's profile
        setChatUser(response.data);
      } catch (error) {
        console.error("Error fetching chat user profile:", error);
      }
    };

    fetchMessages();
    fetchChatUser();
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await sendMessage(userId, newMessage);
        setMessages([...messages, response.data]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  if (!chatUser) return <div>Loading...</div>; // Wait until the user info is loaded

  return (
    <div>
      {/* Update h2 to include the username */}
      <h2>Chat with {chatUser.username}</h2>

      {/* Display the user's bio under the h2 */}
      <p>
        <strong>Bio: </strong>
        {chatUser?.profile?.bio || "No bio available."}
      </p>

      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.sender.username}: </strong>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
