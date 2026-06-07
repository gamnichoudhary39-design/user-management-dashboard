<template>
  <div>
    <NavBar />

    <div class="posts-page">
      <div class="top-section">
        <h1>Posts Management</h1>

        <input
          type="text"
          v-model="search"
          placeholder="Search posts..."
          class="search-box"
        />
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="post in filteredPosts"
              :key="post.id"
            >
              <td>{{ post.id }}</td>

              <td class="title">
                {{ post.title }}
              </td>

              <td class="body">
                {{ post.body }}
              </td>

              <td>{{ post.userId }}</td>

              <td class="actions">
                <button class="edit-btn">
                  Edit
                </button>

                <button
                  class="delete-btn"
                  @click="deletePost(post.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'

const posts = ref([])
const search = ref('')

onMounted(async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  const data = await response.json()

  posts.value = data.slice(0, 15)
})

const filteredPosts = computed(() => {
  return posts.value.filter(post =>
    post.title
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

const deletePost = (id) => {
  posts.value = posts.value.filter(
    post => post.id !== id
  )
}
</script>

<style scoped>
.posts-page {
  padding: 30px;
  background: #f4f7fc;
  min-height: 100vh;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

h1 {
  font-size: 36px;
  color: #1e293b;
  margin: 0;
}

.search-box {
  padding: 12px 16px;
  width: 260px;
  border: none;
  border-radius: 10px;
  outline: none;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  font-size: 15px;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #1976d2;
  color: white;
  padding: 18px;
  text-align: left;
  font-size: 15px;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #444;
  vertical-align: top;
}

tr:hover {
  background: #f9fbff;
}

.title {
  font-weight: 600;
  width: 250px;
}

.body {
  color: #666;
  max-width: 450px;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #1976d2;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.edit-btn:hover {
  background: #1259a7;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.delete-btn:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    width: 100%;
  }

  h1 {
    font-size: 28px;
  }
}
</style>