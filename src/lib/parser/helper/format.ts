export const formatRp = (v: number) => Intl.NumberFormat("id-id", { style: "currency", currency: "IDR", maximumFractionDigits: 0, currencyDisplay: "symbol", compactDisplay: "short" }).format(v)
