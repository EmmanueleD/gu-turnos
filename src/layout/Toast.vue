<template>
    <div class="toast toast-end">
        <div class="alert" :class="dataStore.toast.severity">
            <span>{{ dataStore.toast.message }}</span>
        </div>
    </div>
</template>

<script setup>
import {useDataStore} from '@/store/dataStore.js'
const dataStore = useDataStore()
</script>