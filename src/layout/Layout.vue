<template>
    <div class="flex flex-col min-h-screen">
        <Header/>
        <router-view class="flex-grow"/>
        <Toast v-if="dataStore.toast.message"></Toast>
    </div>
</template>

<script setup>
import {useDataStore} from '@/store/dataStore.js'
import Header from '@/layout/Header.vue'
import Toast from './Toast.vue';
const dataStore = useDataStore()
</script>