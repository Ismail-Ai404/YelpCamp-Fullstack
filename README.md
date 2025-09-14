## 🏕️ YelpCamp

![YelpCamp Screenshot](https://github.com/user-attachments/assets/bd2b2f90-b84a-40e9-b2b5-f09591358f8a)

> A full-stack web application built with Node.js, Express, and MongoDB. Discover, review, and share campgrounds around the world — complete with interactive maps, image uploads, user authentication, and responsive UI.

🔗 **Live Demo:** [https://yelpcamp-3bdc.onrender.com/campgrounds](https://yelpcamp-3bdc.onrender.com/campgrounds)

---

## 🖼️ Screenshots

| Feature | Preview |
|---------|---------|
| **Home Page** | <img width="712" height="597" alt="image" src="https://github.com/user-attachments/assets/cdc9b804-3526-43e0-adfa-27c3e7c29c3e" />|
| **Campground Detail + Reviews** | <img width="711" height="594" alt="image" src="https://github.com/user-attachments/assets/bf023aaa-e68f-4523-9fc0-9f5f25d502a2" />|


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

### ✅ Why this works:
- GitHub auto-generates heading anchors by:
  - Lowercasing everything
  - Replacing spaces with `-`
  - Removing emojis or encoding them (but sometimes they break — safer to omit them from ToC links if unsure)
- So `## 🎯 Project Overview` → becomes `#project-overview`
- Emojis like `🏕️` can cause inconsistent behavior across platforms — for reliability, we’ve kept them visually in the ToC but linked to the *text-only* version of the ID (`yelpcamp`, not `️-yelpcamp`).

> 💡 **Pro Tip**: If you want 100% reliable anchor links, avoid starting headings with emojis. But since your headings look great with them, we preserved visual style while ensuring links work.

---

## 📋 Table of Contents

- [🏕️ YelpCamp](#️-yelpcamp)
- [🖼️ Screenshots](#️-screenshots)
- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [✅ Technologies Used](#-technologies-used)
- [🗺️ Map Customization](#️-map-customization)
- [🧑🏽‍💻 Installation & Setup](#installation--setup)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [📬 Author](#-author)


---

✅ Now every link in your Table of Contents will jump correctly to its section on GitHub!

Let me know if you’d like me to generate a version without emojis in headings for maximum compatibility — or if you want to add smooth scroll or anchor icons.

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

## 🧑🏽‍💻 Installation & Setup

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
-   LinkedIn: [Ismail](https://www.linkedin.com/in/ismailgetsitdone/) 

---

✅ Happy coding — and happy camping! 🌲🏕️
  
