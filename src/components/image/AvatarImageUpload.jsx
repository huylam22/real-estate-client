import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../../utils/auth";
import IconX from "../icon/IconX";
import axios from "axios";
import { useSelector } from "react-redux";

const AvatarImageUpload = ({ reload = () => {} }) => {
  const { access_token } = getToken();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const email = auth.user.email;
  const handleUploadImage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append("file", selectedImage);
    bodyFormData.append("email", email);
    console.log(bodyFormData);
    try {
      // Your upload API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/photos/upload-avatar`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        setUploadProgress(0);
        setSelectedImage(null);
        reload();
      } else {
        toast.error("Error uploading image.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="w-full">
        <label className="w-full h-[200px] border border-secondary dark:border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
          <input
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="hidden"
            accept="image/*"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-secondary dark:text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </label>
      </div>

      {selectedImage && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Selected Image:
          </h2>
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 w-8 h-8 p-1 text-white bg-red-500 rounded-full"
            >
              <IconX />
            </button>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="object-cover mx-auto rounded-full w-60 h-60"
            />
          </div>
          {uploadProgress > 0 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="py-1 text-xs leading-none text-center text-white bg-blue-500 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleUploadImage}
        className="px-4 py-2 mt-2 w-full max-w-[400px] text-white rounded bg-green hover:bg-emerald-400 mb-2"
      >
        Confirm Upload
      </button>
    </div>
  );
};

export default AvatarImageUpload;
