<template>
  <div>
    <v-app-bar
      app
      color="white"
      class="app-bar-shadow"
    >
      <div class="toolbar-wrapper">
        <div class="d-flex align-center">
          <nuxt-link :to="localePath('/')">
            <transition
              appear
              name="rotate"
            >
              <v-img
                alt="BigFive logo"
                class="shrink mr-2"
                contain
                :src="logoSrc"
                transition="fade-transition"
                width="40"
              />
            </transition>
          </nuxt-link>
        </div>
        <v-spacer />
        <v-btn
          text
          :to="localePath('result')"
          class="hidden-sm-and-down text-none font-weight-regular"
        >
          {{ $t('toolbar.see_results') }}
        </v-btn>
        <v-btn
          text
          :to="localePath('compare')"
          class="hidden-sm-and-down text-none font-weight-regular"
        >
          {{ $t('toolbar.compare_with') }}
        </v-btn>

        <v-menu
          v-model="drawer"
          bottom
          offset-y
          min-width="150"
        >
          <template #activator="{ on }">
            <v-btn
              icon
              aria-label="Expand menu"
              v-on="on"
              @click="drawer = !drawer"
            >
              <v-icon>{{ icons.mdiChevronDown }}</v-icon>
            </v-btn>
          </template>
          <v-list nav>
            <v-list-item>
              <v-subheader class="text-uppercase">
                {{ $t('common.pages') }}
              </v-subheader>
            </v-list-item>
            <v-divider />
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="localePath(item.url)"
              link
              class="text-none font-weight-regular pl-5 body-2"
            >
              {{ item.title }}
            </v-list-item>
            <LanguageSwitcher />
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js'
import localizations from '../translations'

export default {
  components: {
    LanguageSwitcher: () => import('./LanguageSwitcher')
  },
  data: function () {
    const icons = { mdiChevronDown }
    return {
      drawer: false,
      logoSrc: require('@/assets/logo.svg'),
      icons,
      items: [
        { title: this.$t('toolbar.result'), url: '/result' },
        { title: this.$t('toolbar.compare'), url: '/compare' },
        { title: this.$t('toolbar.articles'), url: '/articles' },
        { title: this.$t('toolbar.privacy'), url: '/privacy' },
        { title: this.$t('toolbar.about'), url: '/about' }
      ],
      languages: Object.keys(localizations)
    }
  }
}

</script>

<style>
.app-bar-shadow {
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.1) !important;
}

.toolbar-wrapper {
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 960px;
  width: 100%;
  align-items: center;
}

@keyframes spinHorizontal {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
.rotate-enter-active {
  animation: spinHorizontal 1s;
}

.v-menu__content {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.02) !important;
}
</style>
