<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card
        outlined
        :elevation="24"
      >
        <v-card-title class="justify-center headline mt-4">
          <h2>
            For you
          </h2>
        </v-card-title>

        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ProductTitle
              title="Free"
              subtitle="For the hobby user"
            />

            <v-card-text>
              <FeatureList :items="personalFree" />
            </v-card-text>

            <v-card-actions class="px-6 py-6">
              <v-btn
                x-large
                block
                color="#0070f3"
                :to="localePath('/test')"
                dark
                class="py-6"
              >
                Take the free test
              </v-btn>
            </v-card-actions>
          </v-col>

          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ProductTitle
              title="Pro"
              subtitle="If you like to dig deep"
            />

            <v-card-text>
              <FeatureList :items="personalPro" />
            </v-card-text>

            <v-card-actions class="px-6 py-6">
              <v-btn
                x-large
                block
                color="#FF0080"
                :to="localePath('/test')"
                dark
                class="py-6"
              >
                Buy now $20
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      class="mt-4"
    >
      <v-card
        outlined
        :elevation="24"
      >
        <v-card-title class="justify-center headline mt-4">
          <h2>
            For your business
          </h2>
        </v-card-title>

        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ProductTitle
              title="Pro"
              subtitle="For your team"
            />

            <v-card-text>
              <FeatureList :items="businessPro" />
            </v-card-text>

            <v-card-actions class="px-6 py-6">
              <v-btn
                x-large
                block
                color="#0070f3"
                :to="localePath('/test')"
                dark
                class="py-6"
              >
                Pay as you go
              </v-btn>
            </v-card-actions>
          </v-col>

          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ProductTitle
              title="Enterprise"
              subtitle="Suited to your needs"
            />

            <v-card-text>
              <FeatureList :items="personalPro" />
            </v-card-text>

            <v-card-actions class="px-6 py-6">
              <v-btn
                x-large
                block
                color="#FF0080"
                :to="localePath('/test')"
                dark
                class="py-6"
              >
                Contact the sales team
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProductCard',
  data: () => ({
    personalFree: [
      {
        text: 'Basic test'
      },
      {
        text: 'Basic assessment'
      },
      {
        text: 'Unlimited comparisons'
      }
    ],
    personalPro: [
      {
        text: 'Professional test (neo-pi-3)'
      },
      {
        text: 'Professional assessment'
      },
      {
        text: 'Secure login and store'
      },
      {
        text: 'Get assessment as PDF'
      }
    ],
    businessPro: [
      {
        text: 'Assessing job applicants'
      },
      {
        text: 'Comparing team personalities'
      },
      {
        text: 'Professional test (neo-pi-3)'
      },
      {
        text: 'Professional assessment'
      },
      {
        text: 'Admin dashboard'
      },
      {
        text: 'Secure login and storing'
      },
      {
        text: 'See and compare the survey participants'
      }
    ]
  })
}
</script>
