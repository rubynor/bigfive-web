<template>
  <div class="about">
    <h1 class="subheading grey--text">About</h1>
    Under construction.
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6 v-for="person in team" :key="person.name">
          <v-card flat width="400px" class="text-xs-center ma-3">
            <v-img :src="person.avatar" height="400px" color="#eeeeee"></v-img>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
              <a :href="person.github" target="_blank">
                <v-icon>{{ mdiGithubCircle }}</v-icon>
              </a>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mdiGithubCircle } from '@mdi/js'
export default {
  name: 'About',
  head: () => ({
    title: 'About and the big five team',
    meta: [
      { hid: 'description', name: 'description', content: 'BigFive has a very active and engaged team that is constantly striving to push BigFive forward.' }
    ]
  }),
  data () {
    return {
      mdiGithubCircle,
      team: [
        {
          name: 'JONAS MACCYBER ENGE',
          role: 'FOUNDER',
          avatar: require('@/assets/jonas.jpg'),
          github: 'https://github.com/maccyber'
        },
        {
          name: 'GEIR GÅSODDEN',
          role: 'CO FOUNDER',
          avatar: require('@/assets/geir.jpg'),
          github: 'https://github.com/zrrrzzt'
        },
        {
          name: 'OLE MORTEN AMUNDSEN',
          role: 'WEB DEVELOPER',
          avatar: require('@/assets/ole_morten.jpg'),
          github: 'https://github.com/oma'
        },
        {
          name: 'PÅL ANDRÈ SUNDT',
          role: 'ART DIRECTOR',
          avatar: require('@/assets/paal.jpg'),
          github: 'https://github.com/str1fe'
        },
        {
          name: 'MATHIAS MOXNES',
          role: 'WEB DEVELOPER',
          avatar: require('@/assets/mathias.jpg'),
          github: 'https://github.com/moxnes'
        }
      ]
    }
  }
}
</script>
