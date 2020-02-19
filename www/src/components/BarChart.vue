<template>
  <apexchart type="bar" :options="options" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'BarChart',
  props: ['data'],
  created () {
    console.log(this.data)
  },
  data () {
    return {
      options: {
        legend: {
          show: false
        },
        chart: {
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: this.data.map(({ title }) => title)
        },
        plotOptions: {
          bar: {
            distributed: true
          }
        },
        fill: {
          colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
        }
      },
      series: [
        {
          name: 'You',
          data: this.data.map(({ score }) => score)
        }
      ]
    }
  }
}
</script>
