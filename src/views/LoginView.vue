<template>
  <div class="login-container">
    <div class="login-box">
      <h1>User Dashboard</h1>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  if (email.value && password.value) {
    localStorage.setItem('token', 'dummy-jwt-token')
    router.push('/home')
  } else {
    alert('Please enter details')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
}

.login-box {
  background: white;
  width: 350px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.login-box h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #4f46e5;
}

.login-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.login-box button {
  width: 100%;
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>