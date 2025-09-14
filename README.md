# YelpCamp 🏕️

[![Live Site](https://img.shields.io/badge/Live-Demo-Online-brightgreen.svg?style=flat-square)]([https://yelpcamp-3bdc.onrender.com/campgrounds](https://yelpcamp-3bdc.onrender.com/campgrounds))  

---

## 🛠️ About YelpCamp

YelpCamp is a full-stack web application where users can *create*, *browse*, and *review* campgrounds. To submit campsites or reviews, users must register and log in. This project was developed as part of **Colt Steele’s Web Developer Bootcamp** on Udemy.

---

## 🧩 Functionalities

- Anyone can **view** all campgrounds and read reviews without signing up or logging in.  
- Registered users can **create** new campgrounds and add reviews.  
- Users must log in to **edit** or **delete** campgrounds or comments they’ve created.  
- Users cannot modify or delete other users’ content.  
- All data is persistent: campground info, user accounts, reviews are stored in the cloud (AWS + MongoDB), so nothing is lost between sessions.

---

## ✅ Technologies Used

| Layer | Technologies / Tools |
|---|---|
| **Frontend** | HTML5, CSS3, Bootstrap, jQuery, DOM Manipulation |
| **Backend / Server-side** | Node.js, Express.js |
| **Database & Data Handling** | MongoDB (NoSQL), Mongoose, Data associations (linking users with their campgrounds & comments) |
| **Authentication / Authorization** | Passport.js |
| **APIs & Architecture** | RESTful routes, CRUD operations, Middleware for authorization/authentication |
| **Deployment / Hosting** | AWS (MongoDB hosted on EC2 / other services), Render.com for app hosting |

---

## 🚀 Installation & Setup

Follow these steps to run YelpCamp locally:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Ismail-Ai404/YelpCamp.git
   cd YelpCamp
