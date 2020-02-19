<template>
  <apexchart type="bar" :options="options" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'BarChart',
  props: ['data'],
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
