<template>
  <div class="course-list">
    <header class="page-header">
      <h1>Available Courses</h1>
      <p>Browse our courses and start your learning journey today!</p>
    </header>

    <div v-if="courseStore.loading" class="loading">Loading courses...</div>
    <div v-else-if="courseStore.error" class="error">{{ courseStore.error }}</div>
    <div v-else class="courses-grid">
      <div v-for="course in courseStore.courses" :key="course.id" class="course-card">
        <h3>{{ course.title }}</h3>
        <p class="instructor">Instructor: {{ course.instructor }}</p>
        <p class="description">{{ course.description }}</p>
        <div class="course-footer">
          <span class="price">${{ course.price }}</span>
          <router-link :to="`/book/${course.id}`" class="btn-book">Book Now</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCourseStore } from '@/stores/courseStore'

export default {
  name: 'CourseListView',
  computed: {
    courseStore() { return useCourseStore() }
  },
  mounted() {
    this.courseStore.fetchCourses()
  }
}
</script>

<style scoped>
.course-list {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 4rem;
  text-align: center;
  animation: fadeInDown 0.8s ease-out;
}

.page-header h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 0.8rem;
  letter-spacing: -1px;
}

.page-header p {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
}

.course-card {
  background: var(--white);
  padding: 2.2rem;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  border: 1px solid rgba(237, 242, 244, 0.5);
  position: relative;
  overflow: hidden;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0;
  transition: var(--transition);
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.course-card:hover::before {
  opacity: 1;
}

.course-card h3 {
  font-size: 1.5rem;
  color: var(--secondary);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.instructor {
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.instructor::before {
  content: '👤';
  font-size: 0.8rem;
}

.description {
  flex: 1;
  margin-bottom: 2rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #edf2f4;
  padding-top: 1.5rem;
}

.price {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary);
}

.btn-book {
  background: var(--secondary);
  color: var(--white);
  padding: 0.7rem 1.4rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  transition: var(--transition);
  font-size: 0.95rem;
}

.btn-book:hover {
  background: var(--primary);
  transform: scale(1.05);
}

.loading, .error {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: var(--text-muted);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
