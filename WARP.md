# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
```bash
# Start the development server
npm start

# The app runs on http://localhost:3000
# Requires MongoDB running on localhost:27017 (default) or DB_URL env var
```

### Database Operations
```bash
# Seed the database with sample data
node seeds/index.js

# Connect to MongoDB shell (if using local MongoDB)
mongosh mongodb://localhost:27017/yelp-camp
```

### Environment Setup
Create a `.env` file in the root directory with:
```env
# MongoDB connection (local or Atlas)
DB_URL=mongodb://localhost:27017/yelp-camp

# Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# MapTiler for geocoding and maps
MAPTILER_API_KEY=your_maptiler_key

# Session secret (use a strong random string)
SECRET=your_secret_string
```

## Architecture Overview

### MVC Pattern Implementation
- **Models**: `/models/` - Mongoose schemas (Campground, Review, User)
- **Views**: `/views/` - EJS templates with partials and layouts
- **Controllers**: `/controllers/` - Business logic separated from routes
- **Routes**: `/routes/` - Express router modules for different resources

### Key Architectural Patterns

**Route-Controller Separation**: Routes in `/routes/` are thin and delegate to controllers in `/controllers/`. For example, campground routes use the `ctlCamps` controller methods.

**Middleware Chain Architecture**: The app uses a robust middleware stack:
- Authentication via Passport.js with `isLoggedIn` middleware
- Authorization via `isAuthor` and `isReviewAuthor` middlewares  
- Validation via Joi schemas in `schemaValidation.js`
- Error handling via `catchAsync` wrapper and global error handler

**Database Relationships**: 
- Campgrounds reference User (author) and array of Reviews
- Reviews reference User (author) and Campground
- Uses Mongoose population to resolve references

**File Upload Architecture**: 
- Multer middleware for multipart form handling
- Cloudinary integration via `multer-storage-cloudinary`
- Image thumbnails generated via Cloudinary URL transforms

**Geocoding Integration**:
- Uses MapTiler client for forward geocoding
- Stores GeoJSON Point geometry in MongoDB
- Coordinates stored as [longitude, latitude] array

### Security Implementation
- **Helmet**: HTTP security headers
- **express-mongo-sanitize**: NoSQL injection prevention  
- **Session Management**: MongoDB session store with secure cookies
- **Authentication**: Passport Local Strategy with bcrypt hashing
- **Authorization**: Route-level middleware checks ownership
- **Input Validation**: Joi schemas for server-side validation

### Frontend Architecture
- **Template Engine**: EJS with ejs-mate for layouts
- **Styling**: Bootstrap 5 responsive framework
- **Maps**: Leaflet with MapTiler tiles and marker clustering
- **Client-side JS**: Vanilla JavaScript for map interactions

## Key Files to Understand

### Core Application
- `app.js` - Main Express application setup, middleware configuration, security
- `package.json` - Dependencies and start script

### Data Layer  
- `models/campground.js` - Main data model with image schema and cleanup hooks
- `database/cloudinary/index.js` - Cloudinary configuration and storage setup

### Route Handlers
- `controllers/campground.js` - CRUD operations, geocoding, image handling
- `middlewares/schemaValidation.js` - Joi validation schemas and middleware
- `middlewares/isAuthor.js` - Authorization middleware for resource ownership

### Database Setup
- `seeds/index.js` - Database seeding script with sample data generation

## Working with Features

### Adding New Campground Fields
1. Update the Mongoose schema in `models/campground.js`
2. Add validation rules in `middlewares/joiSchemas.js`  
3. Update forms in `views/campground/new.ejs` and `views/campground/edit.ejs`
4. Modify controller methods in `controllers/campground.js`

### Modifying Map Behavior
- Map configuration: `/public/js/map.js`
- Change MapTiler style by updating the `styleId` variable
- Marker clustering settings are configured in the Leaflet initialization

### Authentication Flow
- Registration/Login routes: `routes/auths.js` 
- User model extends `passport-local-mongoose`: `models/user.js`
- Session handling configured in `app.js` with MongoDB store

### Image Upload Process
1. Form posts to route with `multer` middleware
2. Multer + Cloudinary storage uploads files  
3. File metadata stored in campground `images` array
4. Thumbnails generated via Cloudinary URL transforms in `ImageSchema.virtual`

## Database Schema Notes

### Campground Model
- Uses GeoJSON Point for location storage (coordinates: [lng, lat])
- Images array with url/filename for Cloudinary integration
- Post-delete middleware cleans up associated reviews and Cloudinary images

### Relationships
- One-to-many: User → Campgrounds (author)
- One-to-many: User → Reviews (author)  
- One-to-many: Campground → Reviews
- Uses ObjectId references with Mongoose population

## Environment Notes
- Development uses local MongoDB by default
- Production expects MongoDB Atlas connection string
- All secrets managed via environment variables
- Cloudinary required for image uploads (no local storage fallback in production)