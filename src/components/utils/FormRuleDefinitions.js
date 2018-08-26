export const required = (v) => !!v || 'Required'
export const validInteger = (v) => v && !(v - Math.floor(v)) || 'Must be integer'
export const digitEleven = (v) => v && v.length === 11 || 'Must be 11 digits in length'
export const maxHandred = (v) => !v || parseInt(v) < 100 || 'Must be under 100'
