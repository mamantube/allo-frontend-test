<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center align-center mt-14">
        <h1>Detail Rocket</h1>
      </v-col>
    </v-row>
    <v-row v-if="useRocket.isLoading">
      <v-col class=" d-flex justify-center align-center mt-5">
        <p>Loading....</p>
        <v-progress-circular indeterminate color="primary" size="50%" />
      </v-col>
    </v-row>
    <v-row v-else-if="useRocket.errorMessage">
      <v-col class="d-flex justify-center align-center">
        <p>{{ useRocket.errorMessage }}</p>
        <v-btn @click="reloadData" color="primary" class="ms-5">Reload</v-btn>
      </v-col>
    </v-row>
    <v-row v-else-if="rocket" class="mt-5">
      <v-col cols="12" md="6" class="pa-10">
        <v-carousel height="400">
          <v-carousel-item
            v-for="(image, index) in rocket.flickr_images"
            :key="index"
            :src="image"
            cover
          />
        </v-carousel>
      </v-col>
      <v-col class="pa-10">
        <p class="text-h6">Name</p>
        <p class="text-subtitle-1">{{ rocket.name }}</p>

        <p class="text-h6 mt-5">Description</p>
        <p class="text-subtitle-1">{{ rocket.description }}</p>

        <p class="text-h6 mt-5">Country</p>
        <p class="text-subtitle-1">{{ rocket.country }}</p>

        <p class="text-h6 mt-5">Fisrt Flight</p>
        <p class="text-subtitle-1">{{ formatDate(rocket.first_flight) }}</p>

        <p class="text-h6 mt-5">Cost per Launch</p>
        <p class="text-subtitle-1">
          {{ formatCurrency(rocket.cost_per_launch) }}
        </p>

        <router-link to="/">
          <v-btn class=" mt-5" color="primary" small
            >Back to rocket data</v-btn
          >
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRocketStore } from "@/stores/rocketStore";
import { formatDate, formatCurrency } from "@/utils/utils";

const route = useRoute();
const useRocket = useRocketStore();

onMounted(() => {
  useRocket.detailRocket(route.params.id as string);
});

const rocket = computed(() => useRocket.dataRocket);

const reloadData = () => {
  console.log("Reloading rocket with ID:", route.params.id);
  useRocket.detailRocket(route.params.id as string);
};
</script>
