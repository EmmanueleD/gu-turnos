<template>
    <div v-if="isLoading" class="w-screen h-screen flex flex-col justify-center items-center" >
        <Loading />
        <span v-if="dataStore.storeLoading.staff">Loading staff data...</span>
        <span v-if="dataStore.storeLoading.calendarEvents">Loading events...</span>
        <span v-if="dataStore.storeLoading.calendarRecurrentEvents">Loading recurrent events...</span>
    </div>
    <div v-else-if="hasError" class="w-screen h-screen flex flex-col justify-center items-center">
        <Error class="w-full md:w-2/5 lg:w-1/3" :error="dataStore.storeError" />
    </div>
    <Layout v-else />
</template>

<script setup>
import { computed } from 'vue'
import Layout from '@/layout/Layout.vue'
import Loading from "@/components/Loading.vue"
import Error from '@/components/Error.vue'
import { useDataStore } from '@/store/dataStore'

const dataStore = useDataStore()
const isLoading = computed(() => dataStore.storeLoading.staff || dataStore.storeLoading.calendarEvents)
const hasError = computed(() => dataStore.storeError)
</script>