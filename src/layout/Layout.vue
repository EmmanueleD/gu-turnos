<template>
    <div class="flex flex-col min-h-screen">
        <Header/>
        <router-view class="flex-grow"/>
    </div>
</template>

<script setup>
import Header from './header.vue';
</script>