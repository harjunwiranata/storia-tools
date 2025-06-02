


export const parseSeabank = (text: string) => {
    const array = text.split("\n").filter(i => i != "")

    const bankFieldIndex = (array.findIndex(field => field.includes("Ke "))+1)

    const date = array.find(field => field.includes("Waktu Transaksi "))?.replace("Waktu Transaksi","").trim()
    const ref = array.find(field => field.includes("No. Transaksi "))?.replace("No. Transaksi","").trim()
    const name = array.find(field => field.includes("Ke "))?.replace("Ke ","").replace("Shopeepay","").replace("DNID","").replace("(e)","").trim()
    const bank = array[bankFieldIndex].replace(":","").replace(/[0-9*x]/g,"").trim()
    const number = array[bankFieldIndex].replace(":","").replace(/[A-Za-z]/g,"").trim()
    const value = array.find(field => field.includes("Jumlah "))?.replace(/[A-Za-z.]/g,"").trim()
    const method = array.find(field => field.includes("Metode Transaksi "))?.replace("Metode Transaksi","").trim()
    
    const result = {
        date: date,
        ref: ref,
        bank: bank,
        number: number,
        name: name,
        value: parseFloat(value!),
        method: method
    }
    return result
}