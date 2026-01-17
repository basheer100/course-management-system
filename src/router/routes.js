import CourseListView from '@/views/CourseListView.vue'
import BookingFormView from '@/views/BookingFormView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

export default [
  {
    path: '/',
    name: 'courses',
    component: CourseListView
  },
  {
    path: '/book/:id',
    name: 'book',
    component: BookingFormView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isAdmin') === 'true') {
        next();
      } else {
        next('/login');
      }
    }
  },
  // Redirect old tasks path to courses
  {
    path: '/tasks',
    redirect: '/'
  }
]
