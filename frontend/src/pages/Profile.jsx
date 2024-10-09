import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        setBio(response.data.profile?.bio || "");
        setAvatarUrl(response.data.profile?.avatarUrl || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(bio, avatarUrl);
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="avatarUrl">Avatar URL:</label>
          <input
            type="text"
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
