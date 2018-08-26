export const decodeXml = (v) => {
  if (v) {
    const decodedString = v.replace("_x", "%u").replace("_", "")
    return unescape(decodedString)
  } else {
    return v;
  }
}
export const convertToDollar = (v) => {
  return '$' + parseFloat(v).toFixed(2)
}
export const convertToPercent = (v) => {
  return (parseFloat(v)*100).toFixed(2) + '%'
}
