# Course Management System - Vue.js 3 Application

A comprehensive course management and booking application built with Vue.js 3, demonstrating advanced patterns for CRUD operations, state management, and component architecture.

## 🎯 Learning Objectives

This project is designed to teach:
- **Course Management**: Managing courses and bookings
- **State Management**: Using Pinia for centralized state (CourseStore, BookingStore)
- **Component Architecture**: Reusable, well-structured components
- **API Integration**: Axios for HTTP requests
- **Vue Router**: Client-side routing with role-based access control
- **Modern UI/UX**: Premium design with glassmorphism and animations

## 📁 Project Structure

```
src/
├── main.js                 # Application entry point
├── App.vue                 # Root component
├── router/
│   ├── index.js           # Router configuration
│   └── routes.js          # Route definitions
├── stores/
│   ├── courseStore.js     # Pinia store for course management
│   └── bookingStore.js    # Pinia store for booking management
├── services/
│   └── api.js             # Axios API configuration
├── views/
│   ├── CourseListView.vue  # Main course catalog
│   ├── BookingFormView.vue # Student booking form
│   ├── AdminDashboard.vue  # Application administration
│   └── LoginView.vue       # Staff authentication
```

## 🏗️ Architecture Explained

### 1. **Entry Point (main.js)**
- Initializes Vue application
- Registers Pinia (state management)
- Registers Vue Router (navigation)
- Mounts app to DOM

### 2. **State Management (stores/)**
- **CourseStore**: Manages course listings, creation, updates, and deletions
- **BookingStore**: Manages student bookings, payment references, and status updates

### 3. **API Service (services/api.js)**
Axios instance with:
- Base URL configuration
- Request interceptor (for auth tokens)
- Response interceptor (for error handling)

## 🔄 Core Features

### Course Management
- **List Courses**: View all available courses
- **Create Course**: Admins can add new courses with validation
- **Update Course**: Edit course details, price, and duration
- **Delete Course**: Remove courses from the catalog

### Student Booking
- **Book Course**: Students can enroll in courses
- **Fake Pay**: Simulated payment reference generation with validation
- **Booking Management**: Admins can view, update, and manage bookings
- **Status Tracking**: Pending, Confirmed, and Cancelled statuses

### Administration
- **Dashboard**: Overview of key metrics
- **Secure Access**: Protected routes for staff
- **Auto-Refresh**: Real-time data updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend API Setup

The app expects a backend API at `http://localhost:3000/api`

**Required Endpoints:**
- `/api/courses` - Course management
- `/api/bookings` - Booking management

## 📚 Code Concepts for Students

### 1. **Reactive State**
Vue automatically updates the UI when data changes. The store's state is reactive.

### 2. **Component Communication**
- **Props**: Parent → Child (data down)
- **Events**: Child → Parent (events up)

### 3. **Async/Await**
All API calls use async/await for cleaner asynchronous code.

### 4. **Error Handling**
Try-catch blocks ensure graceful error handling.

### 5. **Separation of Concerns**
- **Components**: UI and user interaction
- **Store**: Business logic and state
- **Services**: API communication

## 🛠️ Technologies Used

- **Vue.js 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and dev server
- **Pinia**: State management library
- **Vue Router**: Official router for Vue.js
- **Axios**: HTTP client for API requests
- **Outfit Font**: Premium typography

## 📝 Best Practices Demonstrated

1. ✅ Clear file organization
2. ✅ Comprehensive code comments
3. ✅ Consistent naming conventions
4. ✅ Error handling
5. ✅ Loading states
6. ✅ User feedback
7. ✅ Responsive design
8. ✅ Reusable components
9. ✅ Separation of concerns
10. ✅ Clean code principles

## 📖 Further Learning

- [Vue.js Official Docs](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Guide](https://router.vuejs.org/)
- [Axios Documentation](https://axios-http.com/)

---

**Built with ❤️ for educational purposes**
