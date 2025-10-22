import React, { useRef } from 'react';

export default function ProfilePicUploader({ currentPicUrl, onUpdate }) {
  const fileInputRef = useRef(null);

  
  const defaultPic = "https://via.placeholder.com/96x96/505050/FFFFFF?text=User"; 
  const picSrc = currentPicUrl || defaultPic;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        
        onUpdate(reader.result); 
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    
    onUpdate(null);
  };

  return (
    <div className="flex flex-col items-center">
     
      <div 
        className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0"
      >
        <img 
          src={picSrc} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
        
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex space-x-2 mt-3">
      
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
        >
          {currentPicUrl ? "Change Photo" : "Upload Photo"}
        </button>

        
        {currentPicUrl && (
          <button
            onClick={handleRemove}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}
