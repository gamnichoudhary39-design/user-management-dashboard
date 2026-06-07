<template>
  <div class="modal-overlay">
    <div class="modal-box">

      <h2>Add New User</h2>

      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="phone" type="text" placeholder="Phone" />

      <div class="checkbox-box">
        <input type="checkbox" v-model="showExtra" />
        <label>Show Extra Fields</label>
      </div>

      <div v-if="showExtra">
        <input type="text" placeholder="Height" />
        <input type="text" placeholder="Weight" />
      </div>

      <div class="modal-actions">
        <button class="save-btn">
          Save
        </button>

        <button class="cancel-btn">
          Cancel
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const showExtra = ref(false)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: white;
  width: 400px;
  padding: 30px;
  border-radius: 20px;
}

.modal-box h2 {
  margin-bottom: 20px;
  color: #4f46e5;
}

.modal-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.checkbox-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.modal-actions {
  display: flex;
  gap: 15px;
}

.save-btn {
  flex: 1;
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
}

.cancel-btn {
  flex: 1;
  background: #ef4444;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
}
</style>