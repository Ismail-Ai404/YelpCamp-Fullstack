## 🏕️ YelpCamp

![YelpCamp Screenshot](https://github.com/user-attachments/assets/bd2b2f90-b84a-40e9-b2b5-f09591358f8a)

> A full-stack web application built with Node.js, Express, and MongoDB. Discover, review, and share campgrounds around the world — complete with interactive maps, image uploads, user authentication, and responsive UI.

🔗 **Live Demo:** [https://yelpcamp-3bdc.onrender.com/campgrounds](https://yelpcamp-3bdc.onrender.com/campgrounds)

---

## 🖼️ Screenshots

| Feature | Preview |
|---------|---------|
| **Home Page** | ![Home Page](https://via.placeholder.com/800x400?text=YelpCamp+Homepage) |
| **Campground Detail + Reviews** | ![Detail Page](https://via.placeholder.com/800x400?text=Campground+Details+%26+Reviews) |
| **Interactive Map View** | ![Map View](https://via.placeholder.com/800x400?text=Dark+Themed+Map+with+Circle+Markers) |

> 💡 *Replace placeholder URLs above with actual screenshots when available.*

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack & Tools](#-tech-stack--tools)
- [🗺️ Map Customization](#-map-customization)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [📬 Author](#-author)

---

## 🎯 Project Overview

YelpCamp is a robust, real-world application inspired by Yelp — but tailored for adventurers and nature lovers. It’s more than just CRUD: it showcases modern full-stack development with secure sessions, cloud storage, map integration, and elegant UI/UX.

Built from scratch, this project demonstrates mastery in:
- Backend architecture & RESTful routing
- Database modeling with associations
- Frontend templating & interactivity
- Deployment & environment management

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
-   LinkedIn: [Your LinkedIn Profile URL] (You can add this later)

---

✅ Happy coding — and happy camping! 🌲🏕️
  
