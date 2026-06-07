
    <template>
      <div class="charts-header">
        <h2>Users Statistics overview</h2>
        </div>
  <div class="charts-container">
    <div class="chart-box">
      <Bar :data="barData" :options="chartOptions" />
    </div>

    <div class="chart-box">
      <Line :data="lineData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const barData = {
  labels: ['A+', 'B+', 'AB+', 'O+'],
  datasets: [
    {
      label: 'Blood Groups',
      data: [10, 20, 15, 25],
      backgroundColor: ['#6366f1', '#8b5cf6', '#06b6d4', '#14b8a6'],
      borderRadius: 8,
    },
  ],
}

const lineData = {
  labels: ['20', '30', '40', '50', '60'],
  datasets: [
    {
      label: 'Age Groups',
      data: [10, 15, 25, 18, 12],
      borderColor: '#4f46e5',
      backgroundColor: '#6366f1',
      tension: 0.4,
      fill: false,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<style scoped>
.charts-header{
  background: #f8fafc;
  padding: 15px;
  border-radius: 20px;
  margin-top: 30px;
  box-shadow:0 4px 15px 
  rgba(0,0,0,0.08)
}
.charts-header h2{
  text-align: center;
  font-size: 38px;
  color: #1e293b;
  margin-bottom: 30px;
  font-weight: 600;

}
.charts-header p{
  color:#64748b;
  font-size: 14px;
}

.charts-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.chart-box {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 20px;
  height: 320px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width:100%;
  transition: all 0.3s ease;
}
@media  (max-width: 768px){
.charts-container{
  grid-template-columns: 1fr;
  
}
}
  

</style>