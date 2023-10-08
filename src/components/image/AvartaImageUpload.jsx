import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconX from "../icon/IconX";

const AvatarImageUpload = ({ onChange = () => {}, name = "", propertyId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    e.preventDefault(); // Prevent default behavior of the file input
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleConfirmUpload = async () => {
    if (!selectedImage) {
      toast.error("Please select an image to upload.");
      return;
    }
    console.log(selectedImage);
    // const bodyFormData = new FormData();
    // selectedImages.forEach((file) => {
    //   bodyFormData.append("file", file); // Append each file with key "file"
    // });

    // try {
    //   const response = await axios.post(
    //     propertyAPI.addPropertyPhoto(propertyId),
    //     bodyFormData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         // console.log(progressEvent);
    //         const percentCompleted = Math.round(
    //           (progressEvent.loaded * 100) / progressEvent.total
    //         );
    //         setUploadProgress(percentCompleted);
    //       },
    //     }
    //   );

    //   // Handle the response as needed, e.g., show a success message
    //   // console.log(response);
    //   toast.success("Image(s) uploaded successfully!");
    //   setUploadProgress(0); // Reset upload progress after successful upload
    //   navigate(`/properties/${propertyId}`);
    // } catch (error) {
    //   // Handle errors, e.g., show an error message
    //   console.error(error);
    //   toast.error("Error uploading image(s).");
    //   setUploadProgress(0); // Reset upload progress after error
    // }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileInputChange}
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

      {selectedImage && (
        <div className="relative">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute w-8 h-8 p-1 text-white bg-red-500 rounded-full top-2 right-2"
          >
            <IconX></IconX>
          </button>
          <img
            src={selectedImage}
            className="object-cover rounded-lg w-60 h-60"
          />
        </div>
      )}
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
