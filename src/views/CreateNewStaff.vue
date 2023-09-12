<template>
  <div class="flex flex-col items-center justify-center h-100 bg-gray-100">
    <form @submit.prevent="onSubmit" class="grid">
      <div class="flex flex-col mb-4">
        <label for="name">Nombre</label>
        <input
          type="text"
          class="input input-bordered w-full"
          v-model="newStaff.title"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label for="name">Background color</label>
        <input
          type="color"
          class="input input-bordered w-full"
          v-model="newStaff.backgroundColor"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label for="name">Text color</label>
        <input
          type="color"
          class="input input-bordered w-full"
          v-model="newStaff.textColor"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label for="name">Rol</label>
        <select v-model="newStaff.resourceId" class="select w-full max-w-xs">
          <option disabled selected>Selecciona el rol</option>
          <option :value="1">Encargado</option>
          <option :value="2">Caja</option>
          <option :value="3">Bar</option>
          <option :value="4">Venta</option>
          <option :value="5">Runner</option>
        </select>
      </div>
      <div class="flex justify-center">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { postSupaData } from "@/utils/supabaseApiService.js";
import { useRouter } from "vue-router";

const router = useRouter();

const newStaff = ref({
  title: "",
  resourceId: null,
  backgroundColor: "#ffffff",
  textColor: "#ffffff",
});
function onSubmit() {
  postSupaData({ tableName: "staff", newItem: newStaff.value }).then((res) => {
    if (res) {
      resetNewStaff();
      returnToStaffList();
    }
  });
}

function resetNewStaff() {
  newStaff.value = {
    title: "",
    resourceId: null,
    backgroundColor: "#ffffff",
    textColor: "#ffffff",
  };
}

function returnToStaffList() {
  router.push("/staff-list");
}
</script>
