
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/')
}
</script>

<template>
  <nav class="navbar">

    <div class="logo">
      Admin Panel
    </div>

    <div class="menu-container">

      <button class="toggle-btn" @click="toggleMenu">
        ☰
      </button>

      <div v-if="showMenu" class="dropdown">

        <router-link to="/home">
          Home
        </router-link>

        <router-link to="/users">
          Users
        </router-link>

        <router-link to="/posts">
          Posts
        </router-link>

        <router-link to="/settings">
          Settings
        </router-link>

        <button class="logout-btn" @click="logout">
          Logout
        </button>

      </div>

    </div>

  </nav>
</template>

<style scoped>

.navbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:18px 40px;
  background:white;
  box-shadow:0 2px 10px rgba(0,0,0,0.08);
}

.logo{
  font-size:28px;
  font-weight:bold;
  color:#2563eb;
}

.menu-container{
  position:relative;
}

.toggle-btn{
  background:#2563eb;
  color:white;
  border:none;
  padding:12px 18px;
  border-radius:12px;
  cursor:pointer;
  font-size:22px;
}

.dropdown{
  position:absolute;
  right:0;
  top:60px;
  width:200px;
  background:white;
  border-radius:14px;
  box-shadow:0 5px 20px rgba(0,0,0,0.15);
  overflow:hidden;
  display:flex;
  flex-direction:column;
}

.dropdown a{
  padding:15px;
  text-decoration:none;
  color:#333;
  font-weight:600;
}

.dropdown a:hover{
  background:#f3f4f6;
}

.logout-btn{
  border:none;
  background:#ef4444;
  color:white;
  padding:15px;
  font-weight:bold;
  cursor:pointer;
}

</style>