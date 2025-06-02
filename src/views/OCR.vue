`
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Tesseract from 'tesseract.js'
import { toPng } from 'html-to-image'
import Transfer from '@/components/receipt/Transfer.vue'
import Topup from '@/components/receipt/Topup.vue'
import { parseSeabank } from '@/lib/parser/seabank'

const vendorList = ['Generic', 'Seabank', 'DANA', 'Superbank', 'Gopay']
const trxTypes = ['Transfer', 'Top Up E-wallet', 'Token', 'Tagihan PLN']

const imageInput = ref()
const generatedOutput = ref()
const downloadLink = ref()

const outletName = ref("")
const outletAddress = ref("")
const adminPrice = ref(5000)
const vendorName = ref("Generic")
const trxType = ref("Transfer")

const sourceImage = ref("")
const outputimage = ref("")

const parsedData = ref()

const imageUploaded = ref(false)
const parsed = ref(false)

const ocr = await Tesseract.createWorker()
ocr.setParameters({ tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK })

const imageUpload = () => {
    const imageFile = imageInput.value.files[0]
    sourceImage.value = URL.createObjectURL(imageFile)
    if(sourceImage.value != "") {
        imageUploaded.value = true
    }
}

const runOCR = () => {
    const imageFile = imageInput.value.files[0]

    ocr.recognize(imageFile).then((result) => {
        parsedData.value = parseSeabank(result.data.text)
        parsed.value = true
    })
}

const download = () => {
    toPng(generatedOutput.value).then(res => {
        outputimage.value = res
        downloadLink.value.click()
    })
}

</script>


<template>
    <div class="grid grid-cols-2 w-full justify-items-center">
        <div class="flex-none">
            <div class="mb-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Gambar struk
                </label>
                <input
                    class=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="image" type="file" placeholder="Upload" @change="imageUpload" ref="imageInput">
            </div>
            <div class="mb-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Penyedia Layanan
                </label>
                <select
                    class=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="vendor" type="text" placeholder="Storia Station" v-model="vendorName">
                    <option v-for="v in vendorList" :value="v">{{ v }}</option>
                </select>
            </div>
            <div class="mb-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Nama outlet
                </label>
                <input
                    class=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="outlet" type="text" placeholder="Storia Station" v-model="outletName">
            </div>
            <div class="mb-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Alamat outlet
                </label>
                <input
                    class=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address" type="text" placeholder="Rambipuji - Jember" v-model="outletAddress">
            </div>

            <hr>
            <div v-if="imageUploaded">
                <div class="mt-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Tipe Transaksi
                </label>
                <select
                    class=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="type" type="text" v-model="trxType">
                    <option v-for="t in trxTypes" :value="t">{{ t }}</option>
                </select>
            </div>

            <div class="my-4 grid grid-cols-3">
                <label class="block text-gray-700 text-sm font-bold my-1 shrink align-middle" for="username">
                    Biaya admin (total)
                </label>
                <input
                    class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="outlet" type="number" placeholder="Storia Station" v-model="adminPrice">
                <div class="grid grid-cols-2 gap-1">
                    <button @click="adminPrice += 1000">+1000</button>
                    <button @click="adminPrice += 5000">+5000</button>
                    <button @click="adminPrice -= 1000">-1000</button>
                    <button @click="adminPrice -= 5000">-5000</button>
                </div>
            </div>
            <div class="w-full flex justify-end">

            <button class="bg-teal-800 p-4 rounded-2xl text-white font-bold" @click="runOCR">Buat struk >> </button>
            </div>

            </div>
            
        </div>
        <div>
            <div class="shadow w-[420px] font-mono">
                <div ref="generatedOutput" class="px-4 pt-4 w-full">
                    <h2 class="text-2xl font-black font-sans">{{ outletName != "" ? outletName.toLocaleUpperCase() :
                        "STORIA STATION" }}</h2>
                    <h3 class="font-bold font-sans pb-2">{{ outletAddress != "" ? outletAddress : "Rambipuji - Jember"
                    }}
                    </h3>
                    <hr>
                    <Transfer v-if="parsed && trxType=='Transfer'" :data="parsedData" :admin="adminPrice.toString()" class="py-2 text-lg" />
                    <Topup v-if="parsed && trxType=='Top Up E-wallet'" :data="parsedData" :admin="adminPrice.toString()" class="py-2 text-lg" />
                </div>
            </div>
            <button class="bg-teal-800 p-4 rounded-2xl text-white font-bold mt-6" @click="download">Download</button>
            <a :href="outputimage" class="hidden" ref="downloadLink"></a>
        </div>
    </div>



</template>`