import { useState, useEffect } from "react";
import { getProfile } from "../../services/api";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Profile</h3>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Bio:</strong> {profile?.profile?.bio || "No bio available."}
      </p>
    </div>
  );
};

export default ProfileInfo;
