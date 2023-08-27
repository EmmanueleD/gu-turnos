<template>
  <div>
    <h2 class="font-bold text-lg mt-4">{{ title }}</h2>
    <div class="flex w-100 justify-start">
      <div
        @click="addNuovaPersona(people)"
        v-for="people in options"
        :key="people.title"
        class="flex flex-col items-center mr-4 pt-4 cursor-pointer"
      >
        <div class="avatar placeholder">
          <div
            class="bg-neutral-focus text-neutral-content rounded-full w-12"
            :style="{
              backgroundColor: people.backgroundColor,
              color: people.textColor
            }"
          >
            <span>{{ people.title.slice(0, 2) }}</span>
          </div>
        </div>
        {{ people.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  options: Array,
  addNuovaPersona: Function
})

const title = ref(props.title)
const options = ref(props.options)
const addNuovaPersona = ref(props.addNuovaPersona)
</script>