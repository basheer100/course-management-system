<template>
  <div id="app">
    <!-- Navigation Header -->
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">🎓 Course Management System</h1>
        <nav class="app-nav">
          <router-link to="/" class="nav-link">Courses</router-link>
          <router-link to="/login" class="nav-link">Staff Login</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="app-main">
      <!-- Router view - pages will appear here -->
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>Built with Vue.js 3 + Vite</p>
    </footer>
  </div>
</template>

<script>
/**
 * App Component - Root component of the application
 * 
 * This is the main wrapper that contains:
 * - Navigation header
 * - Router view for page content
 * - Footer
 */
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --primary: #e63946;
  --primary-dark: #c1121f;
  --secondary: #1d3557;
  --accent: #457b9d;
  --bg-light: #f8f9fa;
  --text-main: #2b2d42;
  --text-muted: #8d99ae;
  --white: #ffffff;
  --glass: rgba(255, 255, 255, 0.82);
  --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.08);
  --radius-lg: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-light);
  color: var(--text-main);
  line-height: 1.6;
}

h1, h2, h3, h4, .app-title, .nav-link {
  font-family: 'Outfit', sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header & Navigation */
.app-header {
  background: var(--glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-sm);
}

.app-header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: -0.5px;
}

.app-nav {
  display: flex;
  gap: 1.2rem;
}

.nav-link {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: var(--transition);
}

.nav-link:hover {
  background: rgba(29, 53, 87, 0.05);
  color: var(--primary);
}

.nav-link.router-link-active {
  background: var(--secondary);
  color: var(--white);
  box-shadow: 0 4px 12px rgba(29, 53, 87, 0.2);
}

/* Main Content */
.app-main {
  flex: 1;
  padding: 3rem 0;
}

/* Footer */
.app-footer {
  background: var(--white);
  border-top: 1px solid #edf2f4;
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Common Components */
.btn {
  font-family: 'Outfit', sans-serif;
  padding: 0.8rem 1.8rem;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 20px rgba(230, 57, 70, 0.25);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(230, 57, 70, 0.35);
}
</style>
