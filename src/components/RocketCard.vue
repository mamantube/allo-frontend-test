<template>
  <div>
    <v-card>
      <router-link :to="`/rockets/${rocket.id}`">
        <v-carousel cycle interval="3000" hide-delimiters>
          <template #prev></template>
          <template #next></template>
          <v-carousel-item
            v-for="(image, index) in rocket.flickr_images"
            :key="index"
            :src="image"
            cover
          />
        </v-carousel>
      </router-link>
      <v-card-title>{{ rocket.name }}</v-card-title>
      <v-card-text>{{ rocket.description }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Rocket } from "@/types/rocket";

defineProps<{
  rocket: Rocket;
}>();
</script>
