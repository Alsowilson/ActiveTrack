import React, { useState, useEffect } from "react";
import ProfilePicUploader from "../components/ProfilePicUploader";
import { useAuthContext } from "../context/AuthContext";
import Header from "../components/Header"; 

export default function Profile() {
  const { user } = useAuthContext();
  

  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem(`profilePic_${user?.username}`) || null;
  });

  
  useEffect(() => {
    if (user?.username) {
      localStorage.setItem(`profilePic_${user.username}`, profilePic);
    }
  }, [profilePic, user?.username]);

  
  const handlePictureUpdate = (newPicUrl) => {
    setProfilePic(newPicUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          My Profile 👤
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          
          <div className="flex items-center space-x-8 mb-8 border-b pb-8">
            <ProfilePicUploader 
              currentPicUrl={profilePic}
              onUpdate={handlePictureUpdate}
            />
            
            <div>
              <p className="text-xl font-semibold text-gray-800">
                Welcome, {user?.username || "Athlete"}
              </p>
              <p className="text-gray-500">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Account Details</h2>
            <div className="space-y-3">
                <p className="text-gray-600">
                    <span className="font-medium">Username:</span> {user?.username}
                </p>
                
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}