//Generic validation rules that could cover majority of use cases
export const validationRules = {
  required: (val) => (val !== null && val !== '' && val !== undefined) || 'This field is required',
  max255: (val) => !val || val.length <= 255 || 'Must be less than 255 characters',
  integer: (val) => Number.isInteger(val) || 'Must be an integer',
  numericOrEmpty: (val) => val === null || val === '' || !isNaN(val) || 'Must be a number',
  min0: (val) => val === null || val >= 0 || 'Must be 0 or greater',
  duration: (val) => {
    if (!val) return true
    return /^(\d{2}):(\d{2}):(\d{2})$/.test(val) || 'Invalid format (HH:MM:SS)'
  },
}
