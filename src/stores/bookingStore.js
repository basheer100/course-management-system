import { defineStore } from 'pinia'
import api from '@/services/api'

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: [],
        loading: false,
        error: null
    }),

    actions: {
        async createBooking(bookingData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post('/bookings', bookingData)
                this.bookings.push(response.data)
                return response.data
            } catch (error) {
                this.error = 'Failed to create booking'
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchBookings() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/bookings')
                this.bookings = response.data
            } catch (error) {
                this.error = 'Failed to load bookings'
            } finally {
                this.loading = false
            }
        },
        async updateBooking(id, bookingData) {
            this.loading = true
            this.error = null
            try {
                const response = await api.put(`/bookings/${id}`, bookingData)
                const index = this.bookings.findIndex(b => (b.id || b._id) === id)
                if (index !== -1) {
                    this.bookings[index] = response.data
                }
                return response.data
            } catch (error) {
                this.error = 'Failed to update booking'
                throw error
            } finally {
                this.loading = false
            }
        },
        async deleteBooking(id) {
            this.loading = true
            this.error = null
            try {
                await api.delete(`/bookings/${id}`)
                this.bookings = this.bookings.filter(b => (b.id || b._id) !== id)
            } catch (error) {
                this.error = 'Failed to delete booking'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})
