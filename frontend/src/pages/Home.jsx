import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Welcome to the Messaging App</h2>
      <h3>Start a conversation:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/chat/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
