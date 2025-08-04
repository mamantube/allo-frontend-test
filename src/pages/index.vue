<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-center align-center mt-10">
          <h1>Rocket List</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            label="Search rocket by name"
            prepend-icon="mdi-magnify"
            clearable
            class="mt-5"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link to="/rockets/add">
            <v-btn color="primary" small>add new rocket</v-btn>
          </router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="rocketStore.errorMessage && !rocketStore.isLoading"
          class="d-flex justify-center align-center mt-5"
        >
          <p>{{ rocketStore.errorMessage }}</p>
          <v-btn @click="reloadData" color="primary" medium>Reload</v-btn>
        </v-col>

        <v-col
          v-if="rocketStore.isLoading"
          class="d-flex justify-center align-center mt-5"
        >
          <p>Loading...</p>
          <v-progress-circular indeterminate color="primary" size="50%" />
        </v-col>

        <v-col
          v-if="!searchRocket.length"
          class="d-flex justify-center align-center mt-5"
        >
          <p>Data not found</p>
        </v-col>

        <v-col
          v-else
          v-for="rocket in searchRocket"
          :key="rocket.id"
          cols="12"
          md="6"
          lg="6"
          class="mt-5"
        >
          <RocketCard :rocket="rocket" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRocketStore } from "@/stores/rocketStore";
import RocketCard from "@/components/RocketCard.vue";

const rocketStore = useRocketStore();
const search = ref("");

onMounted(() => {
  if (rocketStore.rockets.length === 0) {
    rocketStore.rocketList();
  }
});

const searchRocket = computed(() => {
  return rocketStore.rockets.filter((rocket) =>
    rocket.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  );
});

const reloadData = () => {
  rocketStore.rocketList();
};
</script>
