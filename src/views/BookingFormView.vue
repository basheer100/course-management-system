<template>
  <div class="booking-view">
    <div class="glass-container">
      <header class="form-header">
        <div class="icon-circle">🎓</div>
        <h1>Course Enrollment</h1>
        <p v-if="course">Enrolling in: <span>{{ course.title }}</span></p>
      </header>

      <form @submit.prevent="handleSubmit" class="premium-form">
        <div class="form-grid">
          <div class="input-group">
            <input v-model="formData.studentName" type="text" required placeholder=" ">
            <label>Full Name</label>
            <div class="bar"></div>
            <span v-if="errors.studentName" class="error-message">{{ errors.studentName }}</span>
          </div>
          
          <div class="input-group">
            <input v-model="formData.studentEmail" type="email" required placeholder=" ">
            <label>Email Address</label>
            <div class="bar"></div>
            <span v-if="errors.studentEmail" class="error-message">{{ errors.studentEmail }}</span>
          </div>

          <div class="input-group">
            <input v-model="formData.studentPhone" type="tel" required placeholder=" ">
            <label>Phone Number</label>
            <div class="bar"></div>
            <span v-if="errors.studentPhone" class="error-message">{{ errors.studentPhone }}</span>
          </div>

          <div class="input-group">
            <input v-model="formData.paymentReference" type="text" required placeholder=" ">
            <label>Payment Reference (Fake Pay)</label>
            <div class="bar"></div>
            <span v-if="errors.paymentReference" class="error-message">{{ errors.paymentReference }}</span>
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-primary main-submit" :disabled="bookingStore.loading">
            <span v-if="bookingStore.loading">🚀 Processing...</span>
            <span v-else>Confirm & Pay ✨</span>
          </button>
          <router-link to="/" class="btn-cancel">Back to Courses</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from '@/stores/courseStore'
import { useBookingStore } from '@/stores/bookingStore'

export default {
  name: 'BookingFormView',
  data() {
    return {
      formData: {
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        paymentReference: ''
      },
      errors: {
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        paymentReference: ''
      }
    }
  },
  computed: {
    courseStore() { return useCourseStore() },
    bookingStore() { return useBookingStore() },
    course() {
      return this.courseStore.courses.find(c => c.id === this.$route.params.id)
    }
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = { studentName: '', studentEmail: '', studentPhone: '', paymentReference: '' };

      // Validate name
      if (!this.formData.studentName.trim() || this.formData.studentName.length < 3) {
        this.errors.studentName = 'Name must be at least 3 characters';
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.studentEmail)) {
        this.errors.studentEmail = 'Please enter a valid email address';
        isValid = false;
      }

      // Validate phone
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(this.formData.studentPhone.replace(/[\s\-()]/g, ''))) {
        this.errors.studentPhone = 'Phone must be 10-15 digits';
        isValid = false;
      }

      // Validate payment reference
      if (!this.formData.paymentReference.trim() || this.formData.paymentReference.length < 6) {
        this.errors.paymentReference = 'Payment reference must be at least 6 characters';
        isValid = false;
      }

      return isValid;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      try {
        await this.bookingStore.createBooking({
          ...this.formData,
          courseId: this.$route.params.id
        })
        alert('Booking successful! We will contact you soon.')
        this.$router.push('/')
      } catch (error) {
        alert('Failed to create booking. Please try again.')
      }
    }
  },
  mounted() {
    if (this.courseStore.courses.length === 0) {
      this.courseStore.fetchCourses()
    }
  }
}
</script>

<style scoped>
.booking-view {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.glass-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 4rem;
  border-radius: 32px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 25px 50px -12px rgba(29, 53, 87, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  animation: slideUp 0.6s ease-out;
}

.form-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.icon-circle {
  font-size: 2.5rem;
  background: var(--bg-light);
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  box-shadow: var(--shadow-sm);
}

.form-header h1 {
  font-size: 2.2rem;
  color: var(--secondary);
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.form-header p {
  color: var(--text-muted);
  font-weight: 500;
}

.form-header p span {
  color: var(--accent);
  font-weight: 700;
}

/* Floating Label Styling */
.input-group {
  position: relative;
  margin-bottom: 2.5rem;
}

.input-group input {
  width: 100%;
  padding: 1rem 0.5rem;
  font-size: 1.1rem;
  border: none;
  border-bottom: 2px solid #edf2f4;
  background: transparent;
  transition: all 0.3s ease;
  color: var(--secondary);
}

.input-group label {
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  color: var(--text-muted);
  font-size: 1.1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  font-family: 'Outfit', sans-serif;
}

.input-group input:focus {
  outline: none;
}

.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
  top: -1.2rem;
  left: 0;
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 700;
}

.bar {
  position: relative;
  display: block;
  width: 100%;
}

.bar:before {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: var(--accent);
  transition: 0.3s ease all;
  left: 50%;
}

.input-group input:focus ~ .bar:before {
  width: 100%;
  left: 0;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.main-submit {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
}

.btn-cancel {
  text-align: center;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.btn-cancel:hover {
  color: var(--primary);
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

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
