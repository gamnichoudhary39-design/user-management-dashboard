
  <template>
  <div>
    <NavBar />

    <div class="home">
      <h1>Welcome to Admin Dashboard</h1>
      <p>Manage Users & Posts Easily</p>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>

<style scoped>
.home {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f4f7fc;
  text-align: center;
}

.home h1 {
  font-size: 48px;
  color: #2563eb;
  margin-bottom: 10px;
}

.home p {
  font-size: 20px;
  color: #555;
}
</style>


