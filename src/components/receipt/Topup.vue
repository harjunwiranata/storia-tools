<script setup lang="ts">
import { formatRp } from '@/lib/parser/helper/format'
import StandardField from './lines/StandardField.vue'
import HighlightField from './lines/HighlightField.vue'
import MainField from './lines/MainField.vue'
const props = defineProps(['data', 'admin'])

const adminPrice = parseFloat(props.admin)
console.log(props.admin)
</script>

<template>
    <div>
        <MainField :title="`Bukti Transaksi Top Up ${data.bank}`" :content="formatRp(data.value)"/>
        <h5 class="text-center text-sm">status: sukses</h5>
        <p class="pt-4">Detail transaksi :</p>
        <StandardField k="Tanggal" :v="data.date"/>
        <StandardField k="E-wallet" :v="data.bank"/>
        <StandardField k="No. HP" :v="data.number"/>
        <StandardField k="Nama/Inisial" :v="data.name"/>
        <StandardField k="Jumlah Top Up" :v="formatRp(data.value)"/>
        <StandardField k="Biaya Admin" :v="formatRp(adminPrice)"/>
        <HighlightField k="Jumlah Bayar" :v="formatRp(data.value+adminPrice)"/>
        <div class="w-full text-center pt-4 text-sm">
            Resi ini adalah bukti pembayaran yang sah diterbitkan atas nama outlet
        </div>
    </div>
</template>