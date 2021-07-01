<template>
  <v-card>
    <v-card-title v-html="$t('big_five.title')" />
    <v-card-text>
      <p>
        The Big Five are five broad factors (dimensions) of personality traits. They are:
      </p>
      <p>Extraversion</p>
      <p>Agreeableness</p>
      <p>Conscientiousness</p>
      <p>Neuroticism</p>
      <p>Openness to Experience</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BigFive',
  head: () => ({
    title: 'Teste de personalidade - Big Five'
  })
}
</script>

<style>
</style>
