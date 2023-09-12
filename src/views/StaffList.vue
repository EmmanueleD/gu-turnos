<template>
  <div class="flex flex-col items-center justify-center h-100 bg-gray-100">
    <h1 class="text-4xl font-bold mb-4">Staff</h1>
    <button @click="goToCreateNewStaff" class="btn btn-primary mb-4">
      Crea un nuevo Staff
    </button>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <label
        for="my-drawer-4"
        v-for="item in data"
        :key="item.id"
        class="flex flex-col items-center py-2 cursor-pointer"
        @click="goToStaffDetails(item)"
      >
        <div class="avatar placeholder">
          <div
            :style="{
              backgroundColor: item.backgroundColor,
              color: item.textColor,
            }"
            class="bg-neutral-focus text-neutral-content rounded-full w-12"
          >
            <span>{{ item.title.slice(0, 2) }}</span>
          </div>
        </div>
        <p>{{ item.title }}</p>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useDataStore } from "@/store/dataStore";

const router = useRouter();
const dataStore = useDataStore();

const data = dataStore.staff;

function goToStaffDetails(currentStaff) {
  router.push(`/staff-details/${currentStaff.id}`);
}

function goToCreateNewStaff() {
  router.push(`/crea-nuevo-staff`);
}
</script>
