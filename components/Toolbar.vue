<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <nuxt-link :to="localePath('/')">
          <v-img
            alt="BigFive logo"
            class="shrink mr-2"
            contain
            :src="logoSrc"
            transition="fade-transition"
            width="40"
          />
        </nuxt-link>
      </div>
      <div class="logo-text">
        bigfive
        <span class="slogan">
          Learn to know your self
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-btn text :to="localePath('result')" class="hidden-sm-and-down">See your results</v-btn>
      <v-btn text :to="localePath('compare')" class="hidden-sm-and-down">Compare with others</v-btn>
      <v-btn icon @click="drawer = !drawer" aria-label="Expand menu">
        <v-icon>{{ icons.mdiMenu }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      right
    >
      <v-list-item>
      </v-list-item>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="localePath(item.url)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <LanguageSwitcher />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiMenu, mdiHome, mdiChartBar, mdiNewspaper, mdiShieldHalfFull, mdiAccountMultiple } from '@mdi/js'
import localizations from '../translations'

export default {
  components: {
    LanguageSwitcher: () => import('./LanguageSwitcher')
  },
  data: function () {
    const icons = { mdiMenu, mdiHome, mdiChartBar, mdiNewspaper, mdiShieldHalfFull, mdiAccountMultiple }
    return {
      drawer: false,
      logoSrc: require('@/assets/logo.svg'),
      icons,
      items: [
        { title: this.$t('toolbar.home'), url: '/', icon: icons.mdiHome },
        { title: this.$t('toolbar.result'), url: '/result', icon: icons.mdiChartBar },
        { title: this.$t('toolbar.compare'), url: '/compare', icon: icons.mdiChartBar },
        { title: this.$t('toolbar.articles'), url: '/articles', icon: icons.mdiNewspaper },
        { title: this.$t('toolbar.privacy'), url: '/privacy', icon: icons.mdiShieldHalfFull },
        { title: this.$t('toolbar.about'), url: '/about', icon: icons.mdiAccountMultiple }
      ],
      languages: Object.keys(localizations)
    }
  }
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
