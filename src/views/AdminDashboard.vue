<template>
  <div class="admin-dashboard">
    <header class="page-header">
      <div class="header-left">
        <h1>Admin Dashboard</h1>
      </div>
      <nav class="admin-nav">
        <button @click="view = 'courses'" :class="{ active: view === 'courses' }">Courses</button>
        <button @click="view = 'bookings'" :class="{ active: view === 'bookings' }">Bookings</button>
        <button @click="logout" class="btn-logout">Logout</button>
      </nav>
    </header>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-info">
          <span class="stat-label">Total Courses</span>
          <span class="stat-value">{{ courseStore.courses.length }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-info">
          <span class="stat-label">Total Bookings</span>
          <span class="stat-value">{{ bookingStore.bookings.length }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-info">
          <span class="stat-label">Pending Bookings</span>
          <span class="stat-value">{{ bookingStore.bookings.filter(b => b.status === 'PENDING').length }}</span>
        </div>
      </div>
    </div>

    <div v-if="view === 'courses'" class="management-section">
      <div class="section-header">
        <h2>Course Management</h2>
        <button @click="showCourseForm = !showCourseForm" class="btn-add">
          {{ showCourseForm ? 'Cancel' : '+ Add Course' }}
        </button>
      </div>

      <!-- Course Form -->
      <div v-if="showCourseForm" class="course-form-card">
        <h3>{{ isEditing ? 'Edit Course' : 'Add New Course' }}</h3>
        <form @submit.prevent="handleSaveCourse">
          <div class="form-grid">
            <div class="form-group">
              <label>Title</label>
              <input v-model="courseData.title" type="text" required placeholder="e.g. Web Development">
              <span v-if="courseErrors.title" class="error-message">{{ courseErrors.title }}</span>
            </div>
            <div class="form-group">
              <label>Instructor</label>
              <input v-model="courseData.instructor" type="text" required placeholder="Instructor Name">
              <span v-if="courseErrors.instructor" class="error-message">{{ courseErrors.instructor }}</span>
            </div>
            <div class="form-group">
              <label>Price ($)</label>
              <input v-model="courseData.price" type="number" required placeholder="99">
              <span v-if="courseErrors.price" class="error-message">{{ courseErrors.price }}</span>
            </div>
            <div class="form-group">
              <label>Duration</label>
              <input v-model="courseData.duration" type="text" required placeholder="e.g. 4 weeks">
              <span v-if="courseErrors.duration" class="error-message">{{ courseErrors.duration }}</span>
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="courseData.description" rows="2" placeholder="Course description..."></textarea>
            <span v-if="courseErrors.description" class="error-message">{{ courseErrors.description }}</span>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="courseStore.loading">
              {{ courseStore.loading ? 'Saving...' : (isEditing ? 'Update Course' : 'Save Course') }}
            </button>
            <button type="button" @click="resetForm" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Course Table -->
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courseStore.courses" :key="course.id">
              <td>{{ course.title }}</td>
              <td>{{ course.instructor }}</td>
              <td>${{ course.price }}</td>
              <td class="table-actions">
                <button @click="editCourse(course)" class="btn-icon-edit" title="Edit">✏️</button>
                <button @click="deleteCourse(course)" class="btn-icon-delete" title="Delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="management-section">
      <div class="section-header">
        <h2>Booking Records</h2>
        <button @click="showBookingForm = !showBookingForm" class="btn-add">
          {{ showBookingForm ? 'Cancel' : '+ Edit Booking' }}
        </button>
      </div>

      <!-- Booking Edit Form -->
      <div v-if="showBookingForm" class="course-form-card">
        <h3>Edit Booking</h3>
        <form @submit.prevent="handleSaveBooking">
          <div class="form-grid">
            <div class="form-group">
              <label>Student Name</label>
              <input v-model="bookingData.studentName" type="text" required placeholder="Full Name">
              <span v-if="bookingErrors.studentName" class="error-message">{{ bookingErrors.studentName }}</span>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="bookingData.studentEmail" type="email" required placeholder="student@example.com">
              <span v-if="bookingErrors.studentEmail" class="error-message">{{ bookingErrors.studentEmail }}</span>
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input v-model="bookingData.studentPhone" type="tel" required placeholder="1234567890">
              <span v-if="bookingErrors.studentPhone" class="error-message">{{ bookingErrors.studentPhone }}</span>
            </div>
            <div class="form-group">
              <label>Payment Reference</label>
              <input v-model="bookingData.paymentReference" type="text" required placeholder="PAY123456">
              <span v-if="bookingErrors.paymentReference" class="error-message">{{ bookingErrors.paymentReference }}</span>
            </div>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="bookingData.status" required>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="bookingStore.loading">
              {{ bookingStore.loading ? 'Saving...' : 'Update Booking' }}
            </button>
            <button type="button" @click="resetBookingForm" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Payment Ref</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookingStore.bookings" :key="booking.id">
              <td style="font-weight: 600;">{{ booking.studentName }}</td>
              <td>{{ booking.studentEmail }}</td>
              <td>{{ booking.studentPhone }}</td>
              <td>{{ booking.courseId?.title || 'Unknown' }}</td>
              <td><span class="payment-ref">{{ booking.paymentReference || 'N/A' }}</span></td>
              <td><span :class="'status-' + booking.status.toLowerCase()">{{ booking.status }}</span></td>
              <td class="table-actions">
                <button @click="editBooking(booking)" class="btn-icon-edit" title="Edit">✏️</button>
                <button @click="deleteBooking(booking)" class="btn-icon-delete" title="Delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from '@/stores/courseStore'
import { useBookingStore } from '@/stores/bookingStore'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      view: 'courses',
      showCourseForm: false,
      isEditing: false,
      editId: null,
      courseData: {
        title: '',
        instructor: '',
        price: 0,
        duration: '',
        description: ''
      },
      courseErrors: {
        title: '',
        instructor: '',
        price: '',
        duration: '',
        description: ''
      },
      showBookingForm: false,
      isEditingBooking: false,
      editBookingId: null,
      bookingData: {
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        paymentReference: '',
        status: 'PENDING'
      },
      bookingErrors: {
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        paymentReference: ''
      }
    }
  },
  computed: {
    courseStore() { return useCourseStore() },
    bookingStore() { return useBookingStore() }
  },
  methods: {
    logout() {
      localStorage.removeItem('isAdmin');
      this.$router.push('/login');
    },
    validateCourseForm() {
      let isValid = true;
      this.courseErrors = { title: '', instructor: '', price: '', duration: '', description: '' };

      // Validate title
      if (!this.courseData.title.trim() || this.courseData.title.length < 3) {
        this.courseErrors.title = 'Title must be at least 3 characters';
        isValid = false;
      }

      // Validate instructor
      if (!this.courseData.instructor.trim() || this.courseData.instructor.length < 3) {
        this.courseErrors.instructor = 'Instructor name must be at least 3 characters';
        isValid = false;
      }

      // Validate price
      if (!this.courseData.price || this.courseData.price <= 0) {
        this.courseErrors.price = 'Price must be greater than 0';
        isValid = false;
      }

      // Validate duration
      if (!this.courseData.duration.trim()) {
        this.courseErrors.duration = 'Duration is required (e.g., "4 weeks")';
        isValid = false;
      }

      // Validate description (optional but if provided, min length)
      if (this.courseData.description && this.courseData.description.length < 10) {
        this.courseErrors.description = 'Description must be at least 10 characters if provided';
        isValid = false;
      }

      return isValid;
    },
    async handleSaveCourse() {
      if (!this.validateCourseForm()) {
        return;
      }

      try {
        if (this.isEditing) {
          await this.courseStore.updateCourse(this.editId, { ...this.courseData });
          alert('Course updated successfully!');
        } else {
          await this.courseStore.createCourse({ ...this.courseData });
          alert('Course added successfully!');
        }
        this.resetForm();
        // Auto-refresh data after successful operation
        await this.refreshData();
      } catch (error) {
        const msg = error.response?.data?.error || error.message || 'Unknown error';
        alert('Failed to save course: ' + msg);
      }
    },
    editCourse(course) {
      this.isEditing = true;
      this.editId = course.id;
      this.courseData = { ...course };
      this.showCourseForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    resetForm() {
      this.showCourseForm = false;
      this.isEditing = false;
      this.editId = null;
      this.courseData = { title: '', instructor: '', price: 0, duration: '', description: '' };
      this.courseErrors = { title: '', instructor: '', price: '', duration: '', description: '' };
    },
    async deleteCourse(course) {
        const id = course.id || course._id;
        if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
            try {
              await this.courseStore.deleteCourse(id);
              // Automatic refresh of bookings too just in case
              this.bookingStore.fetchBookings();
              alert('Course deleted successfully!');
            } catch (error) {
              alert('Failed to delete course.');
            }
        }
    },
    async refreshData() {
      await Promise.all([
        this.courseStore.fetchCourses(),
        this.bookingStore.fetchBookings()
      ]);
    },
    validateBookingForm() {
      let isValid = true;
      this.bookingErrors = { studentName: '', studentEmail: '', studentPhone: '', paymentReference: '' };

      // Validate name
      if (!this.bookingData.studentName.trim() || this.bookingData.studentName.length < 3) {
        this.bookingErrors.studentName = 'Name must be at least 3 characters';
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.bookingData.studentEmail)) {
        this.bookingErrors.studentEmail = 'Please enter a valid email address';
        isValid = false;
      }

      // Validate phone
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(this.bookingData.studentPhone.replace(/[\s\-()]/g, ''))) {
        this.bookingErrors.studentPhone = 'Phone must be 10-15 digits';
        isValid = false;
      }

      // Validate payment reference
      if (!this.bookingData.paymentReference.trim() || this.bookingData.paymentReference.length < 6) {
        this.bookingErrors.paymentReference = 'Payment reference must be at least 6 characters';
        isValid = false;
      }

      return isValid;
    },
    editBooking(booking) {
      this.isEditingBooking = true;
      this.editBookingId = booking.id || booking._id;
      this.bookingData = {
        studentName: booking.studentName,
        studentEmail: booking.studentEmail,
        studentPhone: booking.studentPhone,
        paymentReference: booking.paymentReference,
        status: booking.status
      };
      this.showBookingForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async handleSaveBooking() {
      if (!this.validateBookingForm()) {
        return;
      }

      try {
        await this.bookingStore.updateBooking(this.editBookingId, { ...this.bookingData });
        alert('Booking updated successfully!');
        this.resetBookingForm();
        await this.refreshData();
      } catch (error) {
        const msg = error.response?.data?.error || error.message || 'Unknown error';
        alert('Failed to update booking: ' + msg);
      }
    },
    async deleteBooking(booking) {
      const id = booking.id || booking._id;
      if (confirm(`Are you sure you want to delete booking for "${booking.studentName}"?`)) {
        try {
          await this.bookingStore.deleteBooking(id);
          alert('Booking deleted successfully!');
          await this.refreshData();
        } catch (error) {
          alert('Failed to delete booking.');
        }
      }
    },
    resetBookingForm() {
      this.showBookingForm = false;
      this.isEditingBooking = false;
      this.editBookingId = null;
      this.bookingData = { studentName: '', studentEmail: '', studentPhone: '', paymentReference: '', status: 'PENDING' };
      this.bookingErrors = { studentName: '', studentEmail: '', studentPhone: '', paymentReference: '' };
    }
  },
  mounted() {
    this.refreshData();
    // Auto-refresh every 10 seconds
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 10000);
  },
  beforeUnmount() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  background: var(--white);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
}

.page-header h1 {
  font-size: 1.8rem;
  color: var(--secondary);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}


.admin-nav {
  display: flex;
  gap: 0.8rem;
}

.admin-nav button {
  padding: 0.6rem 1.2rem;
  border: none;
  background: var(--bg-light);
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  border-radius: 12px;
  transition: var(--transition);
  font-family: 'Outfit', sans-serif;
}

.admin-nav button.active {
  background: var(--secondary);
  color: var(--white);
  box-shadow: 0 4px 12px rgba(29, 53, 87, 0.2);
}

/* Stats Styling */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(0,0,0,0.02);
}

.stat-icon {
  font-size: 2rem;
  background: var(--bg-light);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--secondary);
}

.btn-logout {
  color: var(--primary) !important;
  background: rgba(230, 57, 70, 0.05) !important;
}

.btn-logout:hover {
  background: var(--primary) !important;
  color: var(--white) !important;
}

.management-section {
  animation: fadeIn 0.5s ease-out;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: var(--secondary);
}

.btn-add {
  background: linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: var(--transition);
  font-family: 'Outfit', sans-serif;
  box-shadow: 0 4px 12px rgba(69, 123, 157, 0.2);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(69, 123, 157, 0.3);
}

/* Form Styles */
.course-form-card {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(69, 123, 157, 0.1);
}

.course-form-card h3 {
  margin-bottom: 2rem;
  color: var(--secondary);
  font-size: 1.4rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--secondary);
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 0.85rem;
  border: 2px solid #edf2f4;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: var(--transition);
}

.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  border-color: var(--accent);
  outline: none;
  background: #fdfdfd;
}

.form-group select {
  width: 100%;
  padding: 0.85rem;
  border: 2px solid #edf2f4;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: var(--transition);
  background: white;
  cursor: pointer;
}

.btn-primary {
  width: auto;
  min-width: 160px;
}

/* Table Styles */
.admin-table-container {
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid #edf2f4;
  margin-top: 1rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table tr:hover {
  background: #fbfbfc;
}

.admin-table th {
  background: #f8f9fa;
  padding: 1.2rem;
  text-align: left;
  font-weight: 700;
  color: var(--secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-table td {
  padding: 1.2rem;
  border-top: 1px solid #edf2f4;
  color: var(--text-main);
  font-size: 0.95rem;
}

.btn-icon-edit, .btn-icon-delete {
  background: var(--bg-light);
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.3rem;
}

.btn-icon-edit:hover {
  background: var(--accent);
  color: white;
  transform: scale(1.1);
}

.btn-icon-delete:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

.btn-delete:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
}

.status-confirmed {
  background: #d4edda;
  color: #155724;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
}

.payment-ref {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
}

.error-message {
  display: block;
  color: #e63946;
  font-size: 0.8rem;
  margin-top: 0.4rem;
  font-weight: 600;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
