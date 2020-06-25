<template>
  <client-only>
    <apexchart
      :height="$vuetify.breakpoint.smAndDown ? '300px' : 'auto'"
      type="bar"
      :options="options"
      :series="series"
    />
  </client-only>
</template>

<script>
export default {
  name: 'BarChart',
  components: {
    apexchart: () => process.client ? import('vue-apexcharts') : Promise.resolve({ render: h => h('div') })
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    max: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      options: {
        legend: {
          show: true
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
            distributed: false
          }
        }
      },
      series: this.data[0].scores.map(({ title: name }, index) => ({
        name,
        data: this.data.map(({ scores }) => scores[index].score)
      }))
    }
  }
}
</script>
