import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { propertyAPI } from "../../api/propertyApi";
import { getToken } from "../../utils/auth";
import IconX from "../icon/IconX";

const AvatarImageUpload = ({ onChange = () => {}, name = "", propertyId }) => {
  const { access_token } = getToken();
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const handleUploadImage = (e) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to an array and update the state
    const imagesArray = Array.from(files);
    setSelectedImages(imagesArray);

    // Call the external onChange handler if provided
    onChange(imagesArray);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleConfirmUpload = async () => {
    const bodyFormData = new FormData();
    selectedImages.forEach((file) => {
      bodyFormData.append("file", file); // Append each file with key "file"
    });

    try {
      const response = await axios.post(
        propertyAPI.addPropertyPhoto(propertyId),
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      // Handle the response as needed, e.g., show a success message
      // console.log(response);
      toast.success("Image(s) uploaded successfully!");
      setUploadProgress(0); // Reset upload progress after successful upload
      navigate(`/properties/${propertyId}`);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error(error);
      toast.error("Error uploading image(s).");
      setUploadProgress(0); // Reset upload progress after error
    }
  };
  return (
    <div>
      <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
        <input
          type="file"
          onChange={handleUploadImage}
          className="hidden"
          multiple
          accept="image/*"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </label>
      {selectedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Selected Images:
          </h2>
          <div className="flex flex-wrap gap-2">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute w-8 h-8 top-2 right-2 bg-red-500 p-1 rounded-full text-white"
                >
                  <IconX></IconX>
                </button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-60 h-60 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          {uploadProgress > 0 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={handleConfirmUpload}
          className="mt-4 px-4 py-2 w-full max-w-[400px] bg-green text-white rounded hover:bg-emerald-400"
        >
          Confirm Upload
        </button>
      </div>
    </div>
  );
};

export default AvatarImageUpload;
