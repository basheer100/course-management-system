import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchCourses() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/courses')
                this.courses = response.data
            } catch (error) {
                this.error = 'Failed to load courses'
            } finally {
                this.loading = false
            }
        },
        async createCourse(courseData) {
            this.loading = true
            this.error = null
            console.log('📤 Sending course data to API:', courseData);
            try {
                const response = await api.post('/courses', courseData)
                console.log('📥 API Response:', response.data);
                this.courses.push(response.data)
                return response.data
            } catch (error) {
                const errorMsg = error.response?.data?.error || error.message;
                console.error('❌ Course creation API error:', errorMsg);
                this.error = 'Failed to create course: ' + errorMsg;
                throw error
            } finally {
                this.loading = false
            }
        },
        async updateCourse(id, courseData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.put(`/courses/${id}`, courseData)
                const index = this.courses.findIndex(c => c.id === id)
                if (index !== -1) {
                    this.courses[index] = response.data
                }
                return response.data
            } catch (error) {
                this.error = 'Failed to update course'
                throw error
            } finally {
                this.loading = false
            }
        },
        async deleteCourse(id) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/courses/${id}`)
                this.courses = this.courses.filter(c => c.id !== id)
            } catch (error) {
                this.error = 'Failed to delete course'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})
