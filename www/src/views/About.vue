<template>
  <div class="about">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm8 md6 v-for="person in team" :key="person.name">
          <v-card flat width="400px" class="text-xs-center ma-3">
            <v-img :src="person.avatar" height="400px" color="#eeeeee"></v-img>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
              <a :href="person.github" target="_blank">
                <v-icon>mdi-github-circle</v-icon>
              </a>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      team: [
        {
          name: 'JONAS MACCYBER ENGE',
          role: 'FOUNDER',
          avatar: '/img/jonas.png',
          github: 'https://github.com/maccyber'
        },
        {
          name: 'GEIR GÅSODDEN',
          role: 'CO FOUNDER',
          avatar: '/img/geir.png',
          github: 'https://github.com/zrrrzzt'
        },
        {
          name: 'OLE MORTEN AMUNDSEN',
          role: 'WEB DEVELOPER',
          avatar: '/img/ole_morten.png',
          github: 'https://github.com/oma'
        },
        {
          name: 'PÅL ANDRÈ SUNDT',
          role: 'ART DIRECTOR',
          avatar: '/img/pål.png',
          github: 'https://github.com/str1fe'
        },
        {
          name: 'MATHIAS MOXNES',
          role: 'WEB DEVELOPER',
          avatar: '/img/mathias.png',
          github: 'https://github.com/moxnes'
        }
      ]
    }
  }
}
</script>
