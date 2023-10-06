# Real Estate Client - Home Production Frontend

Welcome to the Real Estate Client - Home Production repository! This repository contains the frontend code for a feature-rich web-based application tailored for real estate agents. It empowers agents to seamlessly create, manage, and share property listings with potential clients. Our frontend is meticulously crafted using cutting-edge technologies such as React, Vite, Redux, and Redux-Saga, along with several other libraries.

## Project Overview

This frontend application seamlessly integrates with the Real Estate Listings and Management System backend. The backend, built using Spring Boot 3.0, is fortified with AWS S3 bucket storage for images and incorporates robust authentication and authorization features using Spring Security and JSON Web Tokens (JWT). Together, the frontend and backend provide a holistic solution tailored for real estate professionals.

## Features

### Property Management

- **CRUD Operations:** Perform create, read, update, and delete operations for properties through the Agent Controller.
- **Pagination and Search:** Effortlessly navigate through real estate listings using pagination and advanced search functionality.
- **Customized Real Estate DTO:** Leverage a tailored data transfer object (DTO) for presenting property information.
- **Image Storage:** Store, upload and retrieve property images in AWS S3 buckets for efficient management and swift retrieval.

### Real Estate Operations

- **Load Property by ID:** Retrieve detailed property information related to the uploading agent.
- **List Real Estate:** Present a curated list of properties with customized DTOs for an enhanced user experience.
- **Filter by Search:** Find listings based on multiple property's endpoints to search for targeted listing.
- **Location-based Search:** Search properties by province and district, enabling precise location-based queries.

### Enhanced Features

- **Rich Text Editing:** Utilize Quill and react-quill for advanced rich text editing capabilities within property descriptions.
- **Image Uploading:** Allow easy image uploads using quill-image-uploader for visually appealing property listings.
- **Interactive UI Elements:** Implement interactive UI components using Swiper and Framer Motion for engaging user experiences.
- **Dark Mode / Light Mode:** Implement Dark/Light Modes using Tailwind and Custom Hooks.
- **Data Validation:** Ensure data integrity with form validation using Yup and react-hook-form.
- **Real-time Notifications:** Keep users informed with real-time notifications using react-toastify.

### Security and Authentication

- **User Registration and Login:** Enable seamless user registration and login functionality with JWT authentication.
- **Password Encryption:** Ensure secure password storage using BCrypt encryption for enhanced data security.
- **Role-Based Authorization:** Control access with role-based authorization using Spring Security for precise user permissions.
- **Error Handling:** Customize access denied and exception error handling for a seamless and user-friendly experience.
- **Logout and Token Refresh:** Implement a secure logout mechanism and refresh token functionality for enhanced user privacy and experiences.

## Tech Stack

- **React:** A popular JavaScript library for building dynamic user interfaces.
- **Vite:** A fast and modern build tool for frontend development, ensuring rapid development and optimized performance.
- **Redux:** A state management library for efficiently managing the application state.
- **Redux-Saga:** A middleware library for managing asynchronous operations and side effects in Redux applications, ensuring smooth user interactions.
- **Swiper:** Interactive and responsive UI carousel for showcasing property images.
- **Framer Motion:** Animation and motion library for creating interactive UI elements.
- **Yup & react-hook-form:** Form validation for ensuring data integrity and user input validation.
- **react-toastify:** Real-time notifications for keeping users informed of important updates.

## Getting Started

To get started with the Real Estate Client - Home Production Frontend, follow these steps:

1. **Clone the repository:** `git clone [repository_url]`
2. **Install dependencies:** `npm install`
3. **Add env variables:** `COOKIE_DOMAIN="{your_local_domain (localhost)}" and API_URL="{http://localhost:8080 or any designated endpoints from the server}"`
4. **Start the development server:** `npm run dev`

Ensure that you configure the backend server and provide the necessary environment variables for the frontend to communicate effectively with the backend services.

## Contributing

We warmly welcome contributions from the community! If you identify any issues or have valuable suggestions for improvement, please do not hesitate to open an issue or create a pull request.

Thank you for your enthusiasm and interest in the Real Estate Client - Home Production! Happy coding! 🚀
