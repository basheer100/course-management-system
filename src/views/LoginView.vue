<template>
  <div class="login-container">
    <div class="login-card">
      <div class="badge">🔒 Staff Only</div>
      <h2>Secure Access</h2>
      <p>Management Control Center</p>
      
      <form @submit.prevent="handleLogin" class="premium-form">
        <div class="form-group">
          <label>Staff Username</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input v-model="username" type="text" required placeholder="admin">
          </div>
        </div>
        
        <div class="form-group">
          <label>Security Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔑</span>
            <input v-model="password" type="password" required placeholder="password">
          </div>
        </div>

        <button type="submit" class="btn-primary login-btn">
          Authorize Access 🛡️
        </button>
      </form>

      <div class="login-footer">
        <router-link to="/" class="btn-back">← Back to Site</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'password') {
        localStorage.setItem('isAdmin', 'true');
        this.$router.push('/admin');
      } else {
        alert('Access Denied. Invalid credentials.');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.login-card {
  background: var(--white);
  padding: 4rem;
  border-radius: 32px;
  box-shadow: 0 40px 100px -20px rgba(29, 53, 87, 0.2);
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid rgba(237, 242, 244, 0.8);
  position: relative;
  overflow: hidden;
}

.badge {
  display: inline-block;
  background: #f8f9fa;
  color: var(--text-muted);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h2 {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 0.8rem;
}

p {
  color: var(--text-muted);
  margin-bottom: 3.5rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 2rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 700;
  color: var(--secondary);
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1.2rem;
  font-size: 1.2rem;
  opacity: 0.6;
}

.input-wrapper input {
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 3.5rem;
  border: 2px solid #edf2f4;
  border-radius: 16px;
  font-size: 1rem;
  transition: var(--transition);
  background: #fdfdfd;
}

.input-wrapper input:focus {
  border-color: var(--accent);
  outline: none;
  background: var(--white);
  box-shadow: 0 8px 16px rgba(69, 123, 157, 0.08);
}

.login-btn {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.15rem;
  margin-top: 1rem;
}

.login-footer {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f3f5;
}

.btn-back {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.btn-back:hover {
  color: var(--secondary);
}
</style>
