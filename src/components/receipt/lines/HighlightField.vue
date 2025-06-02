<script setup>
defineProps(['k','v'])

</script>


<template>
        <div class="w-full flex gap-2 font-bold pt-4">
            <div class="w-5/12 flex justify-between"><span>{{ k }}</span><span>:</span></div>
            <div class="w-7/12 wrap-anywhere">{{ v }}</div>
        </div>
</template>