<template>
  <div>
    <NavBar />

    <div class="settings">
      <h1>{{ $t('settings') }}</h1>

      <div class="setting-box">
        <label>Select Language</label>

        <select v-model="$i18n.locale">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <div class="setting-box">
        <label>
          <input type="checkbox" v-model="notifications" />
          Enable Notifications
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import NavBar from '../components/NavBar.vue'

const savedNotifications=
localStorage.getItem('notifications')

const notifications = ref(
  savedNotifications
  ? JSON.parse(savedNotifications)
  :false
)

watch(notifications, (value) => {
  localStorage.setItem('notifications', JSON.stringify(value))
})
</script>

<style scoped>
.settings {
  padding: 40px;
}

.settings h1 {
  color: #4f46e5;
  margin-bottom: 30px;
}

.setting-box {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.setting-box select {
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
}

</style>