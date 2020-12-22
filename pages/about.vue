<template>
  <div class="about">
    <h1>Hakkımızda</h1>
    <p>
      Öncelikle merhabalar, biz #KendiniTani projesi olarak insanların kendini tanımasını ve bunun sonucunda kendisiyle barış sağlamasını hedefliyoruz. Ve bu kişisel kazanımın toplumsal uzlaşmaya ve barışa ilk adım olacağına inanıyoruz.
      <br><br>
      Bu amaçla kullandığımız ”Big Five Kişilik Testi” dünyada kişilik testi konusunda güvenilirliği otoritelerce kabul edilmiş popüler bir testtir. Big Five Kişilik Testinde 120 adet soru cevaplanması gerekir ve ortalama 10 dk süren bu testin sonucunda 5 Kişilik Alanı altında puanlamanız yapılacaktır. Unutmayın testi ne kadar özverili çözerseniz cevaplar okadar tutarlı olacaktır.
      <br><br>
      Çözülen testin detaylı sonucunu başkasıyla paylaşmadığınız halde sizin dışınızda kimseyle bizim tarafımızdan paylaşılmayacaktır. Umut ediyoruz ki öğrendiğiniz sonuçlar sosyal hayatta yaşadığınız zorluklarda size yardımcı olacaktır. Unutmayın her kişi kendi doğal yapısından dolayı sahip olduğu özellikler negatif veya pozitif olarak değerlendirilemez. Örnek olarak, sizin ilişkilerinizde daha fedakar olmanız, kalabalık önünde çekinmeniz, insanlarla ilk etapta rahat iletişim kuramamanız, negatif veya pozitif bir özellik değil kişiliğinizin yansımasıdır. Kendinizin doğal yönlerini kabul etmeniz sosyal hayat konforunuzu arttıracaktır.
      <br><br>
      Toplumda ne kadar kendini tanıyan birey olursa toplumsal uzlaşma ve iletişim okadar sağlıklı olacaktır. İnsan elbette sosyal bir varlıktır, lakin toplum onu kınamak veya tektipleştirmek için değil değer katmak için olmalıdır.
      <br><br>
      Biz #KendiTani projesi olarak ülkemizde ne kadar çok bireye bu testi ulaştırabilirsek toplumsal uzlaşmayı okadar arttıracağımıza inanıyoruz.
    </p>
    <!-- <h1>Team</h1>

    <v-container class="my-5">
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="person in team"
          :key="person.name"
          xs12
          sm12
          md6
          lg4
        >
          <v-card
            flat
            class="text-xs-center ma-3"
          >
            <v-img
              :src="person.avatar"
              color="#eeeeee"
            />
            <v-card-text>
              <div class="subheading">
                {{ person.name }}
              </div>
              <div class="grey--text">
                {{ person.role }}
              </div>
              <a
                :href="person.github"
                target="_blank"
              >
                <v-icon>{{ mdiGithub }}</v-icon>
              </a>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->
  </div>
</template>

<script>
import { mdiGithub } from '@mdi/js'
export default {
  name: 'About',
  data () {
    return {
      mdiGithub,
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
  },
  head () {
    return {
      title: this.$t('about.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('about.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('about.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('about.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('about.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('about.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('about.seo.description') }
      ]
    }
  }
}
</script>
