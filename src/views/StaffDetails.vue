<template>
  <div class="p-4">
    <h1 class="font-bold text-4xl mb-4">
      {{ currentStaff.title }}
    </h1>
    <div class="flex">
      <div class="w-100 md:w-1/4 card border border-primary p-4 shadow-lg">
        <h2 class="font-bold text-2xl mb-4">Detalles</h2>
        <div class="flex flex-col mb-4 w-100 md:w-2/3 lg:w-1/3">
          <label>Nombre</label>
          <input type="text" class="input input-bordered w-full max-w-xs" v-model="currentStaff.title">
        </div>
        <div class="flex flex-col mb-4">
          <label>Color del fondo</label>
          <input type="color" class="input input-bordered w-full max-w-xs" v-model="currentStaff.backgroundColor">
        </div>
        <div class="flex flex-col mb-4">
          <label>Color del texto y del borde</label>
          <input type="color" class="input input-bordered w-full max-w-xs" v-model="currentStaff.textColor">
        </div>
        <div class="flex flex-col items-end mb-4">
          <button @click="saveCurrentStaff" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/store/dataStore'
import { putSupaData } from '@/utils/supabaseApiService'

const route = useRoute()
const dataStore = useDataStore()
const currentStaff = ref(null)

if(route.params.idStaff){
    currentStaff.value = dataStore.staff.filter(x => x.id == route.params.idStaff)[0]
}

function saveCurrentStaff(){
  putSupaData({tableName:'staff', newItem:currentStaff.value})
    .then(res =>{
      if(res){
        //trig toast
      }
    })
}  

</script>