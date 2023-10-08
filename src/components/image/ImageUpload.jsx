import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { propertyAPI } from "../../api/propertyApi";
import { getToken } from "../../utils/auth";
import IconX from "../icon/IconX";

const ImageUpload = ({ onChange = () => {}, propertyId }) => {
  const { access_token } = getToken();
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
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
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imagesArray = Array.from(files);
    setSelectedImages(imagesArray);
    onChange(imagesArray);
  };
  const handleFileInputClick = () => {
    fileInputRef.current?.focus(); // Using optional chaining to access click method
  };

  const handleConfirmUpload = async () => {
    if (selectedImages.length <= 0) {
      toast.error("Please add image(s) to upload.");
      return;
    }
    // console.log(selectedImages);
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
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleFileInputClick}
      >
        <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
          <input
            type="file"
            ref={fileInputRef}
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
      </div>

      {selectedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Selected Images:
          </h2>
          <div className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-start lg:justify-start lg:flex-wrap">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute w-8 h-8 p-1 text-white bg-red-500 rounded-full top-2 right-2"
                >
                  <IconX></IconX>
                </button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="object-cover rounded-lg w-60 h-60"
                />
              </div>
            ))}
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
        onClick={handleConfirmUpload}
        className="w-full px-4 py-2 mt-2 text-white rounded bg-green hover:bg-emerald-400"
      >
        Confirm Upload
      </button>
    </div>
  );
};

export default ImageUpload;
