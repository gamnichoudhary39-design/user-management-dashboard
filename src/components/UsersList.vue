<template>

  <div class="dashboard">

    <!-- TOP HEADER -->
    <div class="top-section">

      <div>
        <h1>{{ $t("usermanagement") }}  </h1>
        <p class="subtitle">
         Manage Users</p>
      </div>
      <div class="language-switcher">
  <button @click="changeLanguage('en')"></button>
  <button @click="changeLanguage('hi')"></button>
</div>

      <div class="top-actions">

        <!-- ADD USER -->
        <button
          class="add-btn"
          @click="openAddModal"
        >
          {{ $t("addUser") }} 
        </button>

        <!-- TOGGLE MENU -->
        

          <div
            v-if="showMenu"
            class="menu-dropdown"
          >

            <p>{{ $t("userSettings") }}</p>

            <button @click="logout">
              {{$t("Logout")}}
            </button>

          </div>

        </div>

      </div>

    </div>

    <!-- FILTER SECTION -->
    <div class="filters">

      <!-- SEARCH -->
      <input
        v-model="search"
        type="text" :placeholder="$t('searchPlaceholder')"
      />

      <!-- GENDER -->
      <select v-model="genderFilter">

        <option value="">
          {{ $t("allGender") }}
        </option>

        <option value="male">
         {{ $t("male") }}
        </option>

        <option value="female">
          {{ $t("female") }}
        </option>

      </select>

      <!-- AGE -->
      <select v-model="ageFilter">

        <option value="">
          {{ $t("allAges") }}
        </option>

        <option value="less">
         {{ $t("lessThan50") }}
        </option>

        <option value="greater">
         {{ $t("greaterThan50") }}
        </option>

      </select>

      <!-- SORT -->
      <button @click="sortAge">
        {{ $t("sortAge") }}
      </button>

      <button @click="sortNumber">
        {{ $t("sortNumber") }}
      </button>

    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="loading"
    >
      {{ $t("loadingUsers") }}
    </div>

    <!-- ERROR -->
    <div
      v-if="error"
      class="error-box"
    >
      {{ error }}
    </div>

    <!-- TABLE -->
     
    <div
      v-if="!loading"
      class="table-container"
    >

      <table>

        <thead>

          <tr>

            <th>{{ $t("ID") }}</th>

            <th>{{ $t("name") }}</th>

            <th>{{ $t("email") }}</th>

            <th>{{ $t("phone") }}</th>

            <th>{{ $t("age") }}</th>

            <th>{{ $t("gender") }}</th>

            <th>{{ $t("bloodGroup") }}</th>

            <th>{{ $t("actions") }}</th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="(user,index) in paginatedUsers"
            :key="user.id"
          >

            <td>
              {{ index + 1 }}
            </td>

            <td>

              <router-link
                :to="`/users/${user.id}`"
                class="user-link"
              >
                {{ user.firstName }}
              </router-link>

            </td>

            <td>
              {{ user.email }}
            </td>

            <td>
              {{ user.phone }}
            </td>

            <td
              :class="
                user.age < 50
                ? 'red-age'
                : 'green-age'
              "
            >
              {{ user.age }}
            </td>

            <td>
              {{ user.gender }}
            </td>

            <td>
              {{ user.bloodGroup }}
            </td>

            <td class="action-buttons">

              <!-- EDIT -->
              <button
                class="edit-btn"
                @click="editUser(user)"
              >
                {{ $t("edit") }}
              </button>

              <!-- DELETE -->
              <button
                class="delete-btn"
                @click="deleteUser(user.id)"
              >
                {{ $t("delete") }}
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- PAGINATION -->
    <div class="pagination">

      <button
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        {{ $t("prev") }}
      </button>

      <span>
        {{ $t("page") }} {{ currentPage }}
      </span>

      <button
        @click="nextPage"
        :disabled="currentPage >= totalPages"
      >
       {{ $t("next") }}
      </button>

    </div>

    <!-- USER CHARTS -->
     <div class="charts">
     <div class="chart-box">
      
    <UserCharts  />
</div>

</div>
    <!-- MODAL -->
    <div
      v-if="showModal"
      class="modal-overlay"
    >

      <div class="modal-box">

        <h2>
          {{ isEditing ? 'Edit User' : 'Add User' }}
        </h2>

        <!-- NAME -->
        <input
          v-model="form.firstName"
          type="text" :placeholder="$t('enterName')"
        />

        <!-- EMAIL -->
        <input
          v-model="form.email"
          type="email" :placeholder= "$t('enteremail')"
        />

        <!-- PHONE -->
        <input
          v-model="form.phone"
          type="text" :placeholder="$t('enterphone')"
        />

        <!-- AGE -->
        <input
          v-model="form.age"
          type="number" :placeholder="$t('enterAge')"
        />

        <!-- GENDER -->
        <select v-model="form.gender">

          <option value="">
            {{ $t("selectGender") }}
          </option>

          <option value="male">
           {{ $t("male") }}
          </option>

          <option value="female">
           {{ $t("female") }}
          </option>

        </select>

        <!-- BLOOD -->
        <input
          v-model="form.bloodGroup"
          type="text" :placeholder="$t('bloodGroup')"
        />

        <!-- EXTRA -->
        <div class="extra-fields">

          <label>

            <input
              type="checkbox"
              v-model="showExtra"
            />

            {{ $t("saveheightWeight") }}

          </label>

        </div>

        <div v-if="showExtra">

          <input
            v-model="form.height"
            type="number" :placeholder="$t('height')"
          />

          <input
            v-model="form.weight"
            type="number" :placeholder="$t('weight')"
          />

        </div>

        <!-- BUTTONS -->
        <div class="modal-actions">

          <button
            class="save-btn"
            @click="saveUser"
          >
            {{ $t("save") }}
          </button>

          <button
            class="cancel-btn"
            @click="closeModal"
          >
            {{ $t("cancel") }}
          </button>

        </div>

      </div>

    </div>

  

</template>

<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue';

import axios from 'axios';
import UserCharts from './UserCharts.vue';


const users = ref([])

const loading = ref(true)

const error = ref('')

const search = ref('')

const genderFilter = ref('')

const ageFilter = ref('')

const currentPage = ref(1)

const usersPerPage = 8

const showMenu = ref(false)

const showModal = ref(false)

const showExtra = ref(false)

const isEditing = ref(false)

const editId = ref(null)

/* FORM */

const form = ref({

  firstName:'',
  email:'',
  phone:'',
  age:'',
  gender:'',
  bloodGroup:'',
  height:'',
  weight:''

})

/* FETCH USERS */

const fetchUsers = async () => {

  try{

    loading.value = true

    const res = await axios.get(
      'http://localhost:3000/users'
    )

    users.value = res.data
  }

  catch(err){

    error.value =
      'Failed to fetch users'
  }

  finally{

    loading.value = false
  }
}

/* MOUNT */

onMounted(() => {

  fetchUsers()
})

/* FILTER */

const filteredUsers = computed(() => {

  return users.value.filter((user) => {

    const matchesSearch =

      user.firstName
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        )

      ||

      user.email
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        )

    const matchesGender =

      genderFilter.value === ''

      ||

      user.gender === genderFilter.value

    const matchesAge =

      ageFilter.value === ''

      ||

      (
        ageFilter.value === 'less'
        && user.age < 50
      )

      ||

      (
        ageFilter.value === 'greater'
        && user.age > 50
      )

    return (
      matchesSearch
      &&
      matchesGender
      &&
      matchesAge
    )

  })

})

/* PAGINATION */

const totalPages = computed(() => {

  return Math.ceil(
    filteredUsers.value.length
    / usersPerPage
  )
})

const paginatedUsers = computed(() => {

  const start =

    (currentPage.value - 1)
    * usersPerPage

  const end =

    start + usersPerPage

  return filteredUsers.value.slice(
    start,
    end
  )

})

/* SORT */

const sortAge = () => {

  users.value.sort(
    (a,b) => a.age - b.age
  )
}

const sortNumber = () => {

  users.value.sort(
    (a,b) =>
      a.phone.localeCompare(
        b.phone
      )
  )
}

/* PAGINATION */

const nextPage = () => {

  if(
    currentPage.value
    <
    totalPages.value
  ){

    currentPage.value++
  }
}

const prevPage = () => {

  if(currentPage.value > 1){

    currentPage.value--
  }
}

/* MODAL */

const openAddModal = () => {

  isEditing.value = false

  showModal.value = true

  resetForm()
}

const closeModal = () => {

  showModal.value = false

  resetForm()
}

/* RESET */

const resetForm = () => {

  form.value = {

    firstName:'',
    email:'',
    phone:'',
    age:'',
    gender:'',
    bloodGroup:'',
    height:'',
    weight:''

  }

  editId.value = null

}
const changeLanguage=(lang) =>{
  console.log(lang)
}
/* SAVE */

const saveUser = async () => {

  if(
    !form.value.firstName
    ||
    !form.value.email
  ){

    alert(
      'Please fill required fields'
    )

    return
  }

  if(isEditing.value){

    await axios.put(

      `http://localhost:3000/users/${editId.value}`,

      form.value
    )
  }

  else{
      const newUser={
        id:users.value.length+1,
        ...form.value
      }
    await axios.post(

      'http://localhost:3000/users',

       newUser
    )
  }

  fetchUsers()

  closeModal()
}

/* EDIT */

const editUser = (user) => {

  isEditing.value = true

  editId.value = user.id

  form.value = {

    ...user
  }

  showModal.value = true
}

/* DELETE */

const deleteUser = async(id) => {

  const confirmDelete = confirm(
    'Delete this user?'
  )

  if(confirmDelete){

    await axios.delete(
      `http://localhost:3000/users/${id}`
    )

    fetchUsers()
  }
}

/* LOGOUT */

const logout = () => {

  localStorage.removeItem(
    'token'
  )

  window.location.reload()
}

</script>
<style scoped>
body{
  background: #eef2f7;
}
.dashboard {
  padding: 20px;
  background: #f4f7fb;
  min-height: auto;
  font-family: Arial, sans-serif;
}

/* TOP SECTION */

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.top-section h1 {
  font-size: 30px;
  color: #1e293b;
  margin-bottom: 5px;
}

.subtitle {
  color: #64748b;
  font-size: 15px;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

/* BUTTONS */

.add-btn,
.edit-btn,
.delete-btn,
.cancel-btn,
.modal-actions button,
.filters button,
.pagination button {
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
}

/* ADD BUTTON */

.add-btn {
  position: relative;
  background: #0ea5e9;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  z-index: 1;
  font-weight: 600;
  font-size: 16px;
}

.add-btn:hover {
  background: #0284c7;
}

/* DROPDOWN */

.menu-dropdown {
  position: absolute;
  top: 70px;
  right: 0;
  background: #fff;
  width: 220px;
  border-radius: 16px;
  padding: 10px 0;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  z-index: 1000;
  overflow: hidden;
}

.menu-dropdown p {
  margin-bottom: 12px;
  color: #334155;
  font-weight: 600;
}

.menu-dropdown button {
  width: 100%;
  padding: 10px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
}

/* FILTERS */

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.filters input,
.filters select {
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  min-width: 180px;
  font-size: 14px;
}

.filters button {
  background: #2563eb;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
}

.filters button:hover {
  background: #1d4ed8;
}

/* LOADING */

.loading {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 600;
}

/* ERROR */

.error-box {
  background: #fee2e2;
  color: #dc2626;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: 600;
}

/* TABLE */

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: linear-gradient(to right, #2563eb, #0ea5e9);
  color: white;
}

th {
  padding: 18px;
  font-size: 15px;
}

td {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
}

tbody tr:hover {
  background: #f8fafc;
}

/* USER LINK */

.user-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.user-link:hover {
  text-decoration: underline;
}

/* AGE COLORS */

.red-age {
  color: #ef4444;
  font-weight: bold;
}

.green-age {
  color: #22c55e;
  font-weight: bold;
}

/* ACTION BUTTONS */

.action-buttons {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #facc15;
  color: #111827;
  padding: 8px 14px;
  border-radius: 8px;
}

.edit-btn:hover {
  background: #eab308;
}

.delete-btn {
  background: #ef4444;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
}

.delete-btn:hover {
  background: #dc2626;
}

/* PAGINATION */

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
}

.pagination button {
  background: #2563eb;
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
}

.pagination button:hover {
  background: #1d4ed8;
}



.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  width: 95%;
  max-width: 500px;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-box h2 {
  margin-bottom: 20px;
  color: #1e293b;
}

.modal-box input,
.modal-box select {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
}

/* EXTRA FIELDS */

.extra-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* MODAL ACTIONS */

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.modal-actions button {
  padding: 12px 20px;
  border-radius: 10px;
}

.modal-actions button:first-child {
  background: #2563eb;
  color: white;
}

.modal-actions button:first-child:hover {
  background: #1d4ed8;
}

.cancel-btn {
  background: #e2e8f0;
  color: #1e293b;
}

.cancel-btn:hover {
  background: #cbd5e1;
}

/* RESPONSIVE */

@media (max-width: 768px) {

  .top-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    flex-direction: column;
  }

  .filters input,
  .filters select,
  .filters button {
    width: 100%;
  }

  .extra-fields {
    grid-template-columns: 1fr;
  }

  th,
  td {
    font-size: 13px;
    padding: 12px;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>