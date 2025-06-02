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
        <MainField title="Bukti Transaksi Transfer Bank" :content="formatRp(data.value)"/>
        <h5 class="text-center text-sm">status: sukses</h5>
        <p class="pt-4">Detail transaksi :</p>
        <StandardField k="Tanggal" :v="data.date"/>
        <StandardField k="Ref" :v="data.ref"/>
        <StandardField k="Bank Tujuan" :v="data.bank"/>
        <StandardField k="No. Rekening" :v="data.number"/>
        <StandardField k="Nama" :v="data.name"/>
        <StandardField k="Jumlah Transfer" :v="formatRp(data.value)"/>
        <StandardField k="Metode Transfer" :v="data.method"/>
        <StandardField k="Admin Bank" :v="formatRp(2500)"/>
        <StandardField k="Admin Outlet" :v="formatRp(adminPrice-2500)"/>
        <HighlightField k="Jumlah Bayar" :v="formatRp(data.value+adminPrice)"/>
        <div class="w-full text-center pt-4 text-sm">
            Resi ini adalah bukti pembayaran yang sah diterbitkan atas nama outlet
        </div>
    </div>
</template>