## 🏕️ YelpCamp

![YelpCamp Screenshot](https://github.com/user-attachments/assets/bd2b2f90-b84a-40e9-b2b5-f09591358f8a)

> A modern full-stack web application built with React.js, Node.js, Express, and MongoDB. Discover, review, and share campgrounds around the world — complete with interactive maps, image uploads, user authentication, and responsive UI.

🔗 **Live Demo:** [https://yelpcamp-3bdc.onrender.com/](https://yelpcamp-3bdc.onrender.com/)

---

## 🖼️ Screenshots

| Feature | Preview |
|---------|---------|
| **Home Page** | <img width="712" height="597" alt="Homepage image" src="https://github.com/user-attachments/assets/cdc9b804-3526-43e0-adfa-27c3e7c29c3e" />|
| **Campground Detail + Reviews** | <img width="711" height="594" alt="Camground Detail image" src="https://github.com/user-attachments/assets/bf023aaa-e68f-4523-9fc0-9f5f25d502a2" />|


> 💡 *Images taken from actual site.*

---

You're right — the **Table of Contents** needs to be fixed so that all anchor links actually match the section IDs in Markdown. GitHub generates anchor IDs automatically based on headings, and they’re usually lowercase with hyphens replacing spaces and special characters removed.

Here’s your **corrected Table of Contents** that will link properly to each section:

---

## 📋 Table of Contents

- [🏕️ YelpCamp](#️-yelpcamp)
- [🖼️ Screenshots](#️-screenshots)
- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [✅ Technologies Used](#-technologies-used)
- [🗺️ Map Customization](#️-map-customization)
- [Installation & Setup](#installation--setup)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [📬 Author](#-author)


---

✅ Now every link in your Table of Contents will jump correctly to its section on GitHub!

Let me know if you’d like me to generate a version without emojis in headings for maximum compatibility — or if you want to add smooth scroll or anchor icons.

---

## 🎯 Project Overview

YelpCamp is a robust, real-world application inspired by Yelp — but tailored for adventurers and nature lovers. It's more than just CRUD: it showcases modern full-stack development with React frontend, Express API backend, secure authentication, cloud storage, map integration, and elegant UI/UX.

Built from scratch, this project demonstrates mastery in:
- **Frontend**: React.js with hooks, context API, and React Router
- **Backend**: Express.js API with RESTful routes
- **Database**: MongoDB with Mongoose ODM and associations
- **Authentication**: Session-based auth with Passport.js
- **Deployment**: Full-stack architecture & environment management

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure signup/login with Passport.js and bcrypt password hashing.
- Session persistence using `express-session` + `connect-mongo`.
- Middleware guards to protect routes (only owners can edit/delete their campgrounds).

### 🗂️ Campground Management (Full CRUD)
- Create, read, update, delete campground listings.
- Each listing includes: title, location, price, description, and multiple images.
- Server-side validation via Joi for data integrity.

### 🌍 Interactive Mapping
- Powered by **Leaflet + MapTiler “Dataviz Dark”** theme — sleek, minimal, high contrast.
- **Marker clustering** for performance and clean UX at scale.
- Click any marker → popup with title & description.
- Double-click any marker → zoom in!

### ⭐ Reviews & Ratings
- Authenticated users can leave star ratings + text reviews.
- Users can only delete their own reviews.
- Campground authors are blocked from reviewing their own listings.

### 🖼️ Image Uploads
- Integrated with **Cloudinary** for scalable, cloud-hosted image storage.
- Multiple image support per campground.

### 🛡️ Security
- Helmet middleware for HTTP header protection.
- `express-mongo-sanitize` to prevent NoSQL injection.
- Environment variables for API keys & secrets.

### 📱 Responsive UI
- Built with **Bootstrap 5** — mobile-first, accessible, polished on all devices.

---

## ✅ Technologies Used

| Layer | Technologies / Tools |
|-------|----------------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, EJS, JavaScript, Leaflet, DOM Manipulation |
| **Backend** | Node.js, Express.js, RESTful Routes, Middleware |
| **Database** | MongoDB (NoSQL), Mongoose ODM, Data Associations |
| **Auth** | Passport.js, bcrypt, express-session, connect-mongo |
| **APIs & Services** | Cloudinary (image hosting), MapTiler (maps), Joi (validation) |
| **Deployment** | Render.com (app), MongoDB Atlas (DB), .env config |

---

## 🗺️ Map Customization

The map uses **MapTiler’s “Dataviz Dark”** theme — perfect for highlighting your glowing blue circle markers against a sleek dark canvas.

Want to switch styles? Just edit `/public/js/map.js`:

```javascript
const styleId = "dataviz-dark"; // Try: "dark-v2", "bright-v2", "outdoor-v2", "streets-v2"
```
---
## Installation & Setup

### 🚀 Full-Stack React + Express Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ismail-Ai404/YelpCamp.git
    cd YelpCamp
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    npm run install:client
    ```

4.  **Set up Environment Variables:**
    
    **Backend (.env in root directory):**
    ```env
    # Database
    DB_URL=mongodb://localhost:27017/yelp-camp
    
    # Cloudinary for image storage
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_KEY=your_api_key
    CLOUDINARY_SECRET=your_api_secret
    
    # MapTiler for maps
    MAPTILER_API_KEY=your_maptiler_key
    
    # Session secret
    SECRET=your_session_secret_string
    
    # Client URL (for CORS)
    CLIENT_URL=http://localhost:5173
    
    # Server port
    PORT=3000
    ```
    
    **Frontend (client/.env):**
    ```env
    # Backend API URL
    VITE_API_URL=http://localhost:3000
    
    # MapTiler API Key (for client-side maps)
    VITE_MAPTILER_API_KEY=your_maptiler_key
    ```

5.  **Development - Run both frontend and backend:**
    ```bash
    npm run dev:full
    ```
    - Backend API: `http://localhost:3000`
    - React frontend: `http://localhost:5173`
    
6.  **Production - Build and serve:**
    ```bash
    npm run build
    npm start
    ```

### 🔧 Individual Commands
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run build` - Build React for production
- `npm run dev` - Run backend with nodemon

---


## 🤝 Contributing
I would ❤️ contributions! Here’s how:

Fork the repo
Create your feature branch:
```bash

git checkout -b feature/AmazingFeature
```
Commit your changes:
```bash

git commit -m 'Add some AmazingFeature'
```
Push to the branch:
```bash

git push origin feature/AmazingFeature
```
Open a Pull Request

---

## 📜 License
- Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
---

## 🙏 Acknowledgements
- Inspired by Colt Steele’s [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/). 
- UI/UX inspiration from real apps like Airbnb, Yelp, and AllTrails.
- Map tiles powered by MapTiler — stunning cartography made easy.
- Structure & tone of readme inspired by [igoswamik/YelpCamp](https://github.com/igoswamik/YelpCamp).
  
---

## 📬 Author
**Ismail Hossain**
-   GitHub: [@Ismail-Ai404](https://github.com/Ismail-Ai404)
-   LinkedIn: [Ismail](https://www.linkedin.com/in/ismailgetsitdone/) 

---

✅ Happy coding — and happy camping! 🌲🏕️
  
