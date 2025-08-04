<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center align-center mt-15">
        <h1>ADD NEW ROCKET</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="addRocket">
          <v-text-field v-model="name" label="Name" required />
          <v-textarea v-model="description" label="Description" required />
          <v-text-field v-model="country" label="Country" required />
          <v-text-field
            v-model="firstFlight"
            label="First Flight"
            placeholder="2025-08-03"
            required
          />
          <v-text-field
            v-model.number="costPerLaunch"
            label="Cost Per Launch"
            required
          />
          <v-file-input
            @update:model-value="handleFileUpload"
            :model-value="imageFile"
            label="Upload image"
            accept="image/*"
            show-size
          />

          <v-img
            v-if="imagePreview"
            :src="imagePreview"
            max-width="300"
            class="mt-5"
          />

          <div class="d-flex mt-5">
            <v-btn color="primary" type="submit" class="me-5">Submit</v-btn>
            <router-link to="/">
              <v-btn color="primary"> back to rocket list </v-btn>
            </router-link>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRocketStore } from "@/stores/rocketStore";

const router = useRouter();
const useRocket = useRocketStore();

const name = ref("");
const description = ref("");
const country = ref("");
const firstFlight = ref("");
const costPerLaunch = ref(0);
const imageFile = ref<File | null>(null);
const imagePreview = ref("");

const handleFileUpload = (files: File | File[] | null | undefined) => {
  if (Array.isArray(files)) {
    // Jika multiple file dipakai, ambil file pertama
    imageFile.value = files[0] || null;
    imagePreview.value = files[0] ? URL.createObjectURL(files[0]) : "";
  } else if (files instanceof File) {
    imageFile.value = files;
    imagePreview.value = URL.createObjectURL(files);
  } else {
    imageFile.value = null;
    imagePreview.value = "";
  }
};

const addRocket = () => {
  if (!imagePreview.value) {
    alert("Please upload a image");
    return;
  }
  useRocket.addNewRocket({
    name: name.value,
    description: description.value,
    country: country.value,
    first_flight: firstFlight.value,
    cost_per_launch: costPerLaunch.value,
    flickr_images: [imagePreview.value],
    id: "",
  });

  router.push("/");
};
</script>
