import { ref, onMounted } from 'vue'
import axios from 'axios'

export default function useFetch(url) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    try {
      loading.value = true

      const response = await axios.get(url)

      data.value = response.data.users
    } catch (err) {
      error.value = 'Failed to load data'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return {
    data,
    loading,
    error,
    fetchData,
  }
}