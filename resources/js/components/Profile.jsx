import React, { useState } from "react";

const Profile = ({ user, rootUrl }) => {
    const [profileImage, setProfileImage] = useState(user.profileImage || '');
    const [newImage, setNewImage] = useState(null);

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('profileImage', newImage);

        try {
            const response = await axios.post(`${rootUrl}/update-profile-image`, formData);
            setProfileImage(response.data.profileImage);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="profile">
            <h3>My Profile</h3>
            <div>
                <img src={profileImage} alt="Profile" style={{ width: '100px', height: '100px' }} />
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleImageUpload}>Upload Image</button>
            </div>
        </div>
    );
};

export default Profile;
