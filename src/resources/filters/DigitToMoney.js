export const DigitToMoney = (value) => {
    if (value !== null && value !== undefined) {
      let val = new Intl.NumberFormat('fa-IR').format(value)
      return val
    }
  }
  
  export default DigitToMoney
  