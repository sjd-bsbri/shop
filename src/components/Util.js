export default function formatCurrency(num){
    return Number(num.toFixed(3)).toLocaleString() + "\u00A0تومان"
}