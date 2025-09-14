# YelpCamp
<img width="1365" height="597" alt="image" src="https://github.com/user-attachments/assets/bd2b2f90-b84a-40e9-b2b5-f09591358f8a" />


A full-stack web application built with Node.js, Express, and MongoDB. YelpCamp is a platform where users can discover, review, and share campground spots around the world. This project demonstrates a complete MERN-like stack (without React) and showcases skills in everything from backend architecture and database management to frontend development and interactive mapping.

**Live Demo:** [**https://yelpcamp-3bdc.onrender.com/campgrounds**](https://yelpcamp-3bdc.onrender.com/campgrounds)

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Key Features](#key-features)
-   [Tech Stack & Tools](#tech-stack--tools)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation & Setup](#installation--setup)
-   [Author](#author)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)

---

## Project Overview

YelpCamp is a robust, real-world application inspired by Yelp, but tailored for campgrounds. It's more than just a simple CRUD application; it incorporates complex features like user authentication, image uploads, map integration with marker clustering, and secure session management. The primary goal of this project was to build a secure, scalable, and feature-rich web application from the ground up.

---

## Key Features

-   **Authentication & Authorization:**
    -   Secure user registration and login with hashed passwords using Passport.js.
    -   Persistent user sessions with `express-session` and `connect-mongo`.
    -   Middleware to protect routes and ensure only authenticated and authorized users can perform actions (e.g., editing their own campgrounds).

-   **Campground Management (Full CRUD):**
    -   Users can create, read, update, and delete their own campground listings.
    -   Campground data includes title, location, price, description, and images.
    -   Server-side data validation using Joi to ensure data integrity.

-   **Interactive Mapping:**
    -   Campgrounds are displayed on an interactive map using **Leaflet** and **MapTiler**.
    -   **Marker Clustering** is implemented to cleanly manage a large number of map points, improving performance and user experience.
    -   Clicking a campground on the map reveals a popup with its details.

-   **Reviews & Ratings:**
    -   Authenticated users can leave reviews and ratings on campgrounds.
    -   Users can only delete their own reviews.
    -   Campground authors cannot review their own listings.

-   **Image Uploads:**
    -   Integration with **Cloudinary** for cloud-based image hosting and management.
    -   Users can upload multiple images for each campground.

-   **Security:**
    -   Protection against common web vulnerabilities like Cross-Site Scripting (XSS) and NoSQL injection using `helmet` and `express-mongo-sanitize`.
    -   Environment variables are used to keep sensitive API keys and secrets secure.

-   **Responsive UI:**
    -   Clean and modern user interface built with Bootstrap 5, ensuring a seamless experience on both desktop and mobile devices.

---

## Tech Stack & Tools

### Backend
-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework for Node.js.
-   **MongoDB:** NoSQL database for storing data.
-   **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
-   **Passport.js:** Authentication middleware for Node.js.
-   **Cloudinary:** Cloud service for image and video management.
-   **Joi:** Schema description language and data validator.

### Frontend
-   **EJS (Embedded JavaScript):** Templating engine for server-side rendering of HTML.
-   **Bootstrap 5:** CSS framework for responsive design.
-   **Leaflet.js:** Open-source JavaScript library for interactive maps.
-   **MapTiler:** Map tile provider for custom map styles.

### Deployment & Services
-   **Render:** Cloud platform for deploying the application.
-   **MongoDB Atlas:** Cloud database service.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
-   [Node.js](https://nodejs.org/en/) (v16 or later)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas account.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ismail-Ai404/YelpCamp.git
    cd YelpCamp
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables. You will need to get your own API keys from the respective services.

    ```env
    # Your MongoDB connection string (local or from Atlas)
    MONGO_URL=mongodb://localhost:27017/yelp-camp

    # Your Cloudinary credentials
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
    CLOUDINARY_KEY=YOUR_API_KEY
    CLOUDINARY_SECRET=YOUR_API_SECRET

    # Your MapTiler API Key
    MAPTILER_API_KEY=YOUR_MAPTILER_KEY

    # A secret string for signing the session ID cookie
    SECRET=thisisasecretstring
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The application should now be running on `http://localhost:3000`.

---

## Author

**Ismail Hossain**
-   GitHub: [@Ismail-Ai404](https://github.com/Ismail-Ai404)
-   LinkedIn: [Your LinkedIn Profile URL] (You can add this later)

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## Acknowledgements

-   This project is based on the "YelpCamp" project from Colt Steele's [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/).
-   Inspiration for this README was drawn from [igoswamik/YelpCamp](https://github.com/igoswamik/YelpCamp).
