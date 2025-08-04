import { defineStore } from "pinia";
import axios from "axios";
import type { Rocket } from "@/types/rocket";

function isFromAPI(id: string): boolean {
  return /^[a-f0-9]{24}$/.test(id) && id.startsWith("5e9");
}

export const useRocketStore = defineStore("rocket", {
    state: () => ({
        rockets: [] as Rocket[],
        dataRocket: null as Rocket | null,
        isLoading: false,
        errorMessage: "" as string,
    }),
    actions: {
        async rocketList() {
            this.isLoading = true;
            try {
                const response = await axios.get("https://api.spacexdata.com/v4/rockets");
                this.rockets = response.data;
            } catch (error) {
                console.error(error)
                this.errorMessage = "Failed to load data"
            } finally {
                this.isLoading = false;
            }
        },

        async detailRocket(id: string) {
            this.isLoading = true;
            this.errorMessage = "";
            this.dataRocket = null;

            if (!isFromAPI(id)) {
                const localRocket = this.rockets.find((rocket) => rocket.id === id);
                if (localRocket) {
                    this.dataRocket = localRocket;
                } else {
                    this.errorMessage = "Rocket not found locally.";
                }
                    this.isLoading = false;
                    return;
            }

            try {
                const response = await axios.get(`https://api.spacexdata.com/v4/rockets/${id}`)
                this.dataRocket = response.data
            } catch (error) {
                console.error(error)
                this.errorMessage = "Failed to load data"
            } finally {
                this.isLoading = false;
            }
        },

        addNewRocket(newRocket: Rocket) {
            this.rockets.push({
                ...newRocket,
                id: crypto.randomUUID()
            })
        }
        
    }
})