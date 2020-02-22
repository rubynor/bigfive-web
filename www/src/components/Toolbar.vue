<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="BigFive logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.svg"
            transition="fade-transition"
            width="40"
          />
        </router-link>
      </div>
      <div class="logo-text">
        bigfive
        <span class="slogan">
          Learn to know your self
        </span>
      </div>
      <v-spacer></v-spacer>
      <LanguageSwitcher />
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
    >

      <v-list-item>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher'
export default {
  components: {
    LanguageSwitcher
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', url: '/', icon: 'mdi-home' },
      { title: 'Articles', url: '/articles', icon: 'mdi-newspaper' },
      { title: 'Privacy', url: '/privacy', icon: 'mdi-shield-half-full' },
      { title: 'About', url: '/about', icon: 'mdi-account-multiple' }
    ]
  })
}

</script>

<style>
.logo-text {
  font-family: 'Julius Sans One', sans-serif;
  letter-spacing: -1px;
  text-transform: uppercase;
  font-size: x-large;
  line-height: 1.1;
}

.slogan {
  font-size: small;
  display: block;
  margin-left: 5px;
}
</style>
