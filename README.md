# 🏕️ YelpCamp - Modern Progressive Web App

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![YelpCamp Screenshot](https://github.com/user-attachments/assets/bd2b2f90-b84a-40e9-b2b5-f09591358f8a)

> **A comprehensive full-stack Progressive Web Application** built with modern React 19, Node.js, Express, and MongoDB. Discover, review, and share campgrounds worldwide with interactive maps, advanced search, user dashboards, offline functionality, and enterprise-level features.

🔗 **Live Demo:** [https://yelpcamp-3bdc.onrender.com/](https://yelpcamp-3bdc.onrender.com/)
📱 **PWA Installable:** Works offline and can be installed on any device!

---

## 🖼️ Application Showcase

| Feature | Preview |
|---------|----------|
| **🏠 Modern Homepage** | <img width="400" alt="Homepage" src="https://github.com/user-attachments/assets/cdc9b804-3526-43e0-adfa-27c3e7c29c3e" />|
| **🏕️ Campground Details** | <img width="400" alt="Campground Detail" src="https://github.com/user-attachments/assets/bf023aaa-e68f-4523-9fc0-9f5f25d502a2" />|
| **👤 User Dashboard** | <img width="400" alt="Dashboard" src="https://via.placeholder.com/400x300/2e7d32/ffffff?text=User+Dashboard" />|
| **🔍 Advanced Search** | <img width="400" alt="Search" src="https://via.placeholder.com/400x300/1976d2/ffffff?text=Search+%26+Filter" />|

---

## 📋 Table of Contents

- [🇺️ Quick Start](#-quick-start)
- [🚀 Features Overview](#-features-overview)
- [📊 Architecture](#-architecture)
- [⚙️ Installation](#-installation)
- [📁 Project Structure](#-project-structure)
- [🔧 API Documentation](#-api-documentation)
- [📱 PWA Features](#-pwa-features)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🇺️ Quick Start

```bash
# Clone and setup
git clone https://github.com/Ismail-Ai404/YelpCamp-Fullstack.git
cd YelpCamp
npm install && npm run install:client

# Set up environment variables (see Installation section)
# Then start development servers
npm run dev:full
```

👉 **Backend**: `http://localhost:3000` | **Frontend**: `http://localhost:5173`

---

## 🚀 Features Overview

### 🌟 **Core Features**

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | Secure signup/login with Passport.js & session management | ✅ Complete |
| 🏕️ **Campground CRUD** | Full create, read, update, delete with image uploads | ✅ Complete |
| ⭐ **Review System** | Star ratings, text reviews, user permissions | ✅ Complete |
| 🗺️ **Interactive Maps** | Leaflet maps with clustering, popups, and markers | ✅ Complete |
| 🔍 **Advanced Search** | Real-time search, price filtering, sorting options | ✅ Complete |
| 👤 **User Dashboard** | Personal stats, campground management, review history | ✅ Complete |
| 🖼️ **Image Gallery** | Lightbox viewer, keyboard navigation, lazy loading | ✅ Complete |
| 📱 **PWA Support** | Offline functionality, installable, service worker | ✅ Complete |

### 🎆 **Advanced Features**

- 🛡️ **Security**: Helmet, NoSQL injection protection, CORS configuration
- 📱 **Responsive**: Mobile-first design with custom Material-UI components
- ⚡ **Performance**: Lazy loading, image optimization, bundle optimization
- 🌐 **PWA**: Service worker caching, offline support, installable
- 📊 **Analytics**: User statistics, engagement tracking ready

---

## 📊 Architecture

### 💻 **Technology Stack**

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, Vite, Custom Material-UI, React Router, Context API |
| **Backend** | Node.js, Express.js, RESTful API, Middleware |
| **Database** | MongoDB Atlas, Mongoose ODM, Data Relationships |
| **Authentication** | Passport.js, bcrypt, express-session, connect-mongo |
| **File Storage** | Cloudinary (images), Multer (upload handling) |
| **Maps** | Leaflet, React-Leaflet, MapTiler API, Marker Clustering |
| **PWA** | Service Worker, Web App Manifest, Workbox strategies |
| **Security** | Helmet.js, express-mongo-sanitize, CORS, CSP |

### 🏗️ **Application Structure**

```
YelpCamp/
├── 📁 client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # React Components
│   │   │   ├── auth/           # Authentication
│   │   │   ├── campgrounds/    # Campground CRUD
│   │   │   ├── reviews/        # Review System
│   │   │   ├── user/           # User Dashboard
│   │   │   ├── ui/             # UI Components + Map
│   │   │   └── layout/         # Navigation
│   │   ├── context/            # React Context (Auth)
│   │   ├── hooks/              # Custom Hooks
│   │   └── utils/              # API Client
│   └── public/
│       ├── manifest.json       # PWA Manifest
│       └── sw.js              # Service Worker
├── 📁 controllers/           # API Controllers
├── 📁 routes/                # Express Routes
├── 📁 models/                # MongoDB Models
├── 📁 middlewares/           # Authentication & Validation
├── 📝 app.js                  # Express Server
└── 📝 package.json            # Dependencies
```

---

## ⚙️ Installation

### 🛠️ **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image storage)
- MapTiler account (for maps)

### 🚀 **Setup Process**

1. **Clone Repository**
   ```bash
   git clone https://github.com/Ismail-Ai404/YelpCamp-Fullstack.git
   cd YelpCamp
   ```

2. **Install Dependencies**
   ```bash
   # Backend dependencies
   npm install
   
   # Frontend dependencies
   npm run install:client
   ```

3. **Environment Configuration**

   **Create `.env` in root directory:**
   ```env
   # Database Configuration
   DB_URL=mongodb://localhost:27017/yelp-camp
   # For production: mongodb+srv://username:password@cluster.mongodb.net/yelpcamp
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   
   # MapTiler Configuration
   MAPTILER_API_KEY=your_maptiler_api_key
   
   # Security
   SECRET=your_super_secret_session_string_here
   
   # Server Configuration
   PORT=3000
   CLIENT_URL=http://localhost:5173
   ```

   **Create `client/.env`:**
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000
   VITE_MAPTILER_API_KEY=your_maptiler_api_key
   ```

4. **Development Startup**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or individually:
   npm run server    # Backend only (port 3000)
   npm run client    # Frontend only (port 5173)
   ```

5. **Production Build**
   ```bash
   npm run build     # Build React for production
   npm start         # Start production server
   ```

---

## 📁 Project Structure

### 💫 **Key Components**

| Component | Purpose | Features |
|-----------|---------|----------|
| **UserDashboard** | User management interface | Statistics, campground management, review history |
| **CampgroundDetail** | Detailed campground view | Image gallery, reviews, interactive map |
| **CampgroundsList** | Browse all campgrounds | Search, filter, sort, pagination |
| **EditCampground** | Campground editing | Image management, form validation |
| **ReviewForm** | Review submission | Star rating, text input, validation |
| **ImageGallery** | Photo viewer | Lightbox, keyboard navigation, thumbnails |
| **Map** | Interactive mapping | Clustering, popups, custom markers |
| **ErrorBoundary** | Error handling | Graceful error recovery, user-friendly messages |

### 🗺️ **API Routes**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campgrounds` | Get all campgrounds |
| POST | `/api/campgrounds` | Create new campground |
| GET | `/api/campgrounds/:id` | Get campground details |
| PUT | `/api/campgrounds/:id` | Update campground |
| DELETE | `/api/campgrounds/:id` | Delete campground |
| GET | `/api/campgrounds/:id/reviews` | Get reviews for campground |
| POST | `/api/campgrounds/:id/reviews` | Create new review |
| DELETE | `/api/campgrounds/:id/reviews/:reviewId` | Delete review |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |

---

## 🔧 API Documentation

### 🔐 **Authentication**

**Register User**
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Login User**
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

### 🏕️ **Campgrounds**

**Create Campground**
```javascript
POST /api/campgrounds
Content-Type: multipart/form-data

{
  "title": "Amazing Forest Camp",
  "location": "Yellowstone, Wyoming",
  "price": 25.99,
  "description": "Beautiful campground...",
  "image": [File, File] // Multiple files
}
```

### ⭐ **Reviews**

**Create Review**
```javascript
POST /api/campgrounds/:id/reviews
Content-Type: application/json

{
  "rating": 5,
  "body": "Excellent campground with great facilities!"
}
```

---

## 📱 PWA Features

### 🚀 **Progressive Web App Capabilities**

- 📱 **Installable**: Can be installed on any device like a native app
- 🌐 **Offline Support**: Works without internet connection using cached data
- 🔄 **Background Sync**: Queues actions when offline, syncs when online
- 🔔 **Push Notifications**: Infrastructure ready for future implementation
- ⚡ **Fast Loading**: Service worker caching for instant loading
- 📱 **App-like Experience**: Full-screen, splash screen, app icons

### 🔧 **PWA Implementation**

```javascript
// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed'));
}

// Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  // Show custom install prompt
});
```

---

## 🚀 Deployment

### 🌐 **Production Deployment Options**

**Option 1: Render.com (Recommended)**
1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic builds

**Option 2: Railway**
1. Install Railway CLI
2. `railway login`
3. `railway init`
4. `railway up`

**Option 3: Vercel (Frontend) + Railway (Backend)**
- Frontend: Vercel for React app
- Backend: Railway for Express API

### 📊 **Environment Variables for Production**

```env
# Production Database
DB_URL=mongodb+srv://user:pass@cluster.mongodb.net/yelpcamp

# Production URLs
CLIENT_URL=https://your-domain.com

# API Keys (same as development)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
MAPTILER_API_KEY=...
SECRET=...
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add amazing feature with tests"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### 📝 **Development Guidelines**
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Ensure responsive design
- Test offline functionality for PWA features

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **Colt Steele** - [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)
- **React Team** - For the amazing React 19 features
- **MapTiler** - For beautiful map tiles and API
- **Cloudinary** - For reliable image hosting
- **MongoDB Atlas** - For cloud database hosting

---

## 📬 Contact

**Ismail Hossain**
- 👙 GitHub: [@Ismail-Ai404](https://github.com/Ismail-Ai404)
- 💼 LinkedIn: [Ismail Hossain](https://www.linkedin.com/in/ismailgetsitdone/)
- 📫 Email: Contact through GitHub

---

✨ **Made with ❤️ and lots of ☕** ✨

🏕️ Happy camping! 🌲
  
