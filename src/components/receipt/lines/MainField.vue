<script setup>
defineProps(['title','content'])
</script>

<template>
    <h3 class="text-center font-bold">{{ title }}</h3>
        <h3 class="text-center font-bold text-3xl py-2">{{ content }}</h3>
        
</template>