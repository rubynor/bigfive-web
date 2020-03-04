<template>
  <client-only>
    <apexchart :height="$vuetify.breakpoint.smAndDown ? '300px' : 'auto'" type="bar" :options="options" :series="series"></apexchart>
  </client-only>
</template>

<script>
export default {
  name: 'BarChart',
  props: ['data', 'max'],
  components: {
    apexchart: () => process.client ? import('vue-apexcharts') : Promise.resolve({ render: h => h('div') })
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
        yaxis: {
          max: parseInt(this.max) || 20
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
